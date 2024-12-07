import * as THREE from 'three';

export function createCastleEntrance(height: number) {
  const entrance = new THREE.Group();

  // Create stone-like material
  const stoneMaterial = new THREE.MeshStandardMaterial({
    color: 0x808080,
    roughness: 1,
    metalness: 0.1,
    bumpScale: 0.5
  });

  // Archway
  const archGeometry = new THREE.CylinderGeometry(2, 2, height, 32, 1, true, 0, Math.PI);
  const arch = new THREE.Mesh(archGeometry, stoneMaterial);
  arch.rotation.z = Math.PI / 2;
  arch.position.set(0, height/2, 0);

  // Side pillars
  const pillarGeometry = new THREE.BoxGeometry(1, height, 1);
  const leftPillar = new THREE.Mesh(pillarGeometry, stoneMaterial);
  leftPillar.position.set(0, height/2, -2);
  
  const rightPillar = leftPillar.clone();
  rightPillar.position.z = 2;

  // Torch lights
  const torchLight1 = new THREE.PointLight(0xffa95c, 10);
  torchLight1.position.set(0, height * 0.8, -1.8);
  torchLight1.castShadow = true;
  torchLight1.decay = 2;

  const torchLight2 = torchLight1.clone();
  torchLight2.position.z = 1.8;

  entrance.add(arch, leftPillar, rightPillar, torchLight1, torchLight2);
  return entrance;
}