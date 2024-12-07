import * as THREE from 'three';
import { createLivingRoom } from './furniture/livingRoom';
import { createDiningRoom } from './furniture/diningRoom';
import { createWalls } from './structure/walls';
import { createFloorAndCeiling } from './structure/floor';
import { createHallway } from './structure/hallway';
import { createCastleEntrance } from './structure/castleEntrance';

export function createRoom() {
  const room = new THREE.Group();

  // Expanded room dimensions (in meters)
  const width = 15;
  const height = 4;
  const depth = 12;

  // Add structural elements
  const walls = createWalls(width, height, depth);
  const floorAndCeiling = createFloorAndCeiling(width, height, depth);
  const hallway = createHallway(height);
  const castleEntrance = createCastleEntrance(height);

  // Position the hallway and castle entrance
  hallway.position.set(7, 0, 0);
  castleEntrance.position.set(15, 0, 0);

  // Add furniture
  const livingRoom = createLivingRoom();
  const diningRoom = createDiningRoom();
  
  livingRoom.position.set(-4, 0, -3);
  diningRoom.position.set(2, 0, 3);

  // Add everything to the room group
  room.add(walls, floorAndCeiling, livingRoom, diningRoom, hallway, castleEntrance);

  return room;
}