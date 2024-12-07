import * as THREE from 'three';

export function createLivingRoom() {
  const furniture = new THREE.Group();

  // Sofa
  const sofaBase = new THREE.Mesh(
    new THREE.BoxGeometry(2, 0.5, 0.8),
    new THREE.MeshStandardMaterial({ color: 0x505050, roughness: 1 })
  );
  const sofaBack = new THREE.Mesh(
    new THREE.BoxGeometry(2, 0.6, 0.1),
    new THREE.MeshStandardMaterial({ color: 0x505050, roughness: 1 })
  );
  sofaBack.position.set(0, 0.5, -0.35);
  
  // Coffee table
  const coffeeTable = new THREE.Mesh(
    new THREE.BoxGeometry(1, 0.4, 0.6),
    new THREE.MeshStandardMaterial({ color: 0x4a2810, roughness: 1 })
  );
  coffeeTable.position.set(0, 0.2, 0.8);

  furniture.add(sofaBase, sofaBack, coffeeTable);
  return furniture;
}