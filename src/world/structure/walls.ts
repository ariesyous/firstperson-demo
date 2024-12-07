import * as THREE from 'three';
import { wallMaterial } from '../materials/roomMaterials';

export function createWalls(width: number, height: number, depth: number) {
  const walls = new THREE.Group();

  // Create main room walls
  const wallGeometry = new THREE.BoxGeometry(0.1, height, depth);
  const wall1 = new THREE.Mesh(wallGeometry, wallMaterial);
  wall1.position.x = -width / 2;
  wall1.castShadow = true;
  wall1.receiveShadow = true;

  // Right wall with opening for hallway
  const upperWallHeight = 1;
  const upperWall = new THREE.Mesh(
    new THREE.BoxGeometry(0.1, upperWallHeight, depth),
    wallMaterial
  );
  upperWall.position.set(width / 2, height - upperWallHeight/2, 0);
  upperWall.castShadow = true;
  upperWall.receiveShadow = true;

  const lowerWall = new THREE.Mesh(
    new THREE.BoxGeometry(0.1, height - upperWallHeight, (depth - 2.5) / 2),
    wallMaterial
  );
  lowerWall.position.set(width / 2, (height - upperWallHeight) / 2, (depth + 2.5) / 4);
  lowerWall.castShadow = true;
  lowerWall.receiveShadow = true;

  const lowerWall2 = lowerWall.clone();
  lowerWall2.position.z = -(depth + 2.5) / 4;

  const wallGeometry2 = new THREE.BoxGeometry(width, height, 0.1);
  const wall3 = new THREE.Mesh(wallGeometry2, wallMaterial);
  wall3.position.z = -depth / 2;
  wall3.castShadow = true;
  wall3.receiveShadow = true;

  const wall4 = wall3.clone();
  wall4.position.z = depth / 2;

  // Create interior walls (removed the wall blocking the hallway)
  const interiorWall1 = new THREE.Mesh(
    new THREE.BoxGeometry(4, height, 0.1),
    wallMaterial
  );
  interiorWall1.position.set(-1, height / 2, -1);
  interiorWall1.castShadow = true;
  interiorWall1.receiveShadow = true;

  walls.add(wall1, upperWall, lowerWall, lowerWall2, wall3, wall4, interiorWall1);
  return walls;
}