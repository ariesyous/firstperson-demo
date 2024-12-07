import * as THREE from 'three';
import { CollisionBoundary } from './types';

export function setupCollisionBoundaries(): THREE.Box3[] {
  return [
    // Main room boundaries
    new THREE.Box3(
      new THREE.Vector3(-7.4, 0, -6),
      new THREE.Vector3(7.4, 4, 6)
    ),
    // Hallway boundaries
    new THREE.Box3(
      new THREE.Vector3(7.4, 0, -1.25),
      new THREE.Vector3(15, 4, 1.25)
    )
  ];
}

export function checkCollision(
  position: THREE.Vector3,
  boundaries: THREE.Box3[]
): boolean {
  const playerBox = new THREE.Box3();
  const playerSize = new THREE.Vector3(0.5, 1.8, 0.5);
  playerBox.setFromCenterAndSize(position, playerSize);

  return boundaries.some(boundary => boundary.containsBox(playerBox));
}