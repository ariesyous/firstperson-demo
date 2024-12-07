import * as THREE from 'three';

export interface MovementState {
  moveForward: boolean;
  moveBackward: boolean;
  moveLeft: boolean;
  moveRight: boolean;
  sprint: boolean;
}

export interface ControlsConfig {
  mouseSensitivity: number;
  speed: number;
  sprintMultiplier: number;
}

export interface CollisionBoundary {
  min: THREE.Vector3;
  max: THREE.Vector3;
}