import * as THREE from 'three';
import { MovementState, ControlsConfig } from './types';
import { calculateMovement } from './movement';
import { setupCollisionBoundaries, checkCollision } from './collision';
import { PointerLockManager } from './pointerLock';

export class FirstPersonControls {
  private camera: THREE.Camera;
  private state: MovementState = {
    moveForward: false,
    moveBackward: false,
    moveLeft: false,
    moveRight: false,
    sprint: false
  };
  private rotation: THREE.Euler;
  private config: ControlsConfig = {
    mouseSensitivity: 0.002,
    speed: 3.0,
    sprintMultiplier: 1.6
  };
  private collisionBoundaries: THREE.Box3[];
  private pointerLock: PointerLockManager;
  private cleanup: (() => void)[] = [];
  private isLocked: boolean = false;

  constructor(camera: THREE.Camera, domElement: HTMLElement) {
    this.camera = camera;
    this.rotation = new THREE.Euler(0, 0, 0, 'YXZ');
    this.collisionBoundaries = setupCollisionBoundaries();

    this.pointerLock = new PointerLockManager(domElement, this.handleLockChange.bind(this));
    this.setupEventListeners();
  }

  private handleLockChange(locked: boolean) {
    this.isLocked = locked;
  }

  private setupEventListeners() {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (!this.isLocked) return;
      switch (event.code) {
        case 'KeyW': this.state.moveForward = true; break;
        case 'KeyS': this.state.moveBackward = true; break;
        case 'KeyA': this.state.moveLeft = true; break;
        case 'KeyD': this.state.moveRight = true; break;
        case 'ShiftLeft': this.state.sprint = true; break;
      }
    };

    const handleKeyUp = (event: KeyboardEvent) => {
      if (!this.isLocked) return;
      switch (event.code) {
        case 'KeyW': this.state.moveForward = false; break;
        case 'KeyS': this.state.moveBackward = false; break;
        case 'KeyA': this.state.moveLeft = false; break;
        case 'KeyD': this.state.moveRight = false; break;
        case 'ShiftLeft': this.state.sprint = false; break;
      }
    };

    const handleMouseMove = (event: MouseEvent) => {
      if (!this.isLocked) return;
      this.rotation.y -= event.movementX * this.config.mouseSensitivity;
      this.rotation.x -= event.movementY * this.config.mouseSensitivity;
      this.rotation.x = Math.max(-Math.PI / 2, Math.min(Math.PI / 2, this.rotation.x));
      this.camera.rotation.copy(this.rotation);
    };

    document.addEventListener('keydown', handleKeyDown);
    document.addEventListener('keyup', handleKeyUp);
    document.addEventListener('mousemove', handleMouseMove);

    this.cleanup.push(() => {
      document.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('keyup', handleKeyUp);
      document.removeEventListener('mousemove', handleMouseMove);
    });
  }

  update() {
    if (!this.isLocked) return;

    const movement = calculateMovement(
      this.state,
      this.rotation,
      this.config.speed,
      this.config.sprintMultiplier
    );

    const newPosition = this.camera.position.clone().add(movement);

    if (checkCollision(newPosition, this.collisionBoundaries)) {
      this.camera.position.copy(newPosition);
    }
  }

  dispose() {
    this.cleanup.forEach(cleanup => cleanup());
    this.pointerLock.dispose();
  }
}

export function initializeControls(camera: THREE.Camera, domElement: HTMLElement) {
  return new FirstPersonControls(camera, domElement);
}