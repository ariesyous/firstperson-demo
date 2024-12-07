import * as THREE from 'three';

export const wallMaterial = new THREE.MeshStandardMaterial({
  color: 0x808080,
  roughness: 0.9,
  metalness: 0.1,
});

export const floorMaterial = new THREE.MeshStandardMaterial({
  color: 0x303030,
  roughness: 0.8,
  metalness: 0.05,
});