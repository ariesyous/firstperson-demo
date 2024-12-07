import * as THREE from 'three';

export function createDiningRoom() {
  const furniture = new THREE.Group();

  // Dining table
  const table = new THREE.Mesh(
    new THREE.BoxGeometry(1.5, 0.8, 1),
    new THREE.MeshStandardMaterial({ color: 0x4a2810, roughness: 1 })
  );
  table.position.set(0, 0.4, 0);

  // Chairs
  const chairGeometry = new THREE.BoxGeometry(0.4, 0.9, 0.4);
  const chairMaterial = new THREE.MeshStandardMaterial({ color: 0x4a2810, roughness: 1 });

  const positions = [
    [-0.8, 0, 0], // Left
    [0.8, 0, 0],  // Right
    [0, 0, -0.7], // Front
    [0, 0, 0.7],  // Back
  ];

  positions.forEach(([x, y, z]) => {
    const chair = new THREE.Mesh(chairGeometry, chairMaterial);
    chair.position.set(x, 0.45, z);
    furniture.add(chair);
  });

  furniture.add(table);
  return furniture;
}