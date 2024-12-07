import * as THREE from 'three';
import { MovementState } from './types';

export function calculateMovement(
  state: MovementState,
  rotation: THREE.Euler,
  speed: number,
  sprintMultiplier: number
): THREE.Vector3 {
  const currentSpeed = state.sprint ? speed * sprintMultiplier : speed;
  const delta = 1 / 60;

  const direction = new THREE.Vector3();
  direction.z = Number(state.moveForward) - Number(state.moveBackward);
  direction.x = Number(state.moveLeft) - Number(state.moveRight);
  direction.normalize();

  const velocity = new THREE.Vector3();
  if (state.moveForward || state.moveBackward) {
    velocity.z -= direction.z * currentSpeed * delta;
  }
  if (state.moveLeft || state.moveRight) {
    velocity.x -= direction.x * currentSpeed * delta;
  }

  // Transform movement direction based on camera rotation
  const moveX = velocity.x * Math.cos(rotation.y) + velocity.z * Math.sin(rotation.y);
  const moveZ = velocity.z * Math.cos(rotation.y) - velocity.x * Math.sin(rotation.y);

  return new THREE.Vector3(moveX, 0, moveZ);
}