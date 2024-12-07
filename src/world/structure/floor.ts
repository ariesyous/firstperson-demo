import * as THREE from 'three';
import { floorMaterial } from '../materials/roomMaterials';

export function createFloorAndCeiling(width: number, height: number, depth: number) {
  const group = new THREE.Group();

  // Create floor
  const floorGeometry = new THREE.PlaneGeometry(width, depth);
  const floor = new THREE.Mesh(floorGeometry, floorMaterial);
  floor.rotation.x = -Math.PI / 2;
  floor.receiveShadow = true;

  // Create ceiling
  const ceiling = floor.clone();
  ceiling.position.y = height;
  ceiling.rotation.x = Math.PI / 2;

  group.add(floor, ceiling);
  return group;
}