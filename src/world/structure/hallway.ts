import * as THREE from 'three';
import { wallMaterial } from '../materials/roomMaterials';

export function createHallway(height: number) {
  const hallway = new THREE.Group();

  // Hallway dimensions
  const length = 8;
  const width = 2.5;

  // Walls
  const leftWall = new THREE.Mesh(
    new THREE.BoxGeometry(length, height, 0.1),
    wallMaterial
  );
  leftWall.position.set(length/2, height/2, -width/2);
  leftWall.castShadow = true;
  leftWall.receiveShadow = true;

  const rightWall = leftWall.clone();
  rightWall.position.z = width/2;

  // Floor and ceiling
  const floor = new THREE.Mesh(
    new THREE.PlaneGeometry(length, width),
    new THREE.MeshStandardMaterial({ 
      color: 0x202020,
      roughness: 0.8,
      metalness: 0.1
    })
  );
  floor.rotation.x = -Math.PI / 2;
  floor.receiveShadow = true;

  const ceiling = floor.clone();
  ceiling.position.y = height;
  ceiling.rotation.x = Math.PI / 2;

  // Add torch-like lights
  const torchLight1 = new THREE.PointLight(0xffa95c, 8);
  torchLight1.position.set(2, height * 0.8, 0);
  torchLight1.castShadow = true;
  torchLight1.decay = 2;

  const torchLight2 = torchLight1.clone();
  torchLight2.position.x = 6;

  hallway.add(leftWall, rightWall, floor, ceiling, torchLight1, torchLight2);
  return hallway;
}