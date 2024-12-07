import * as THREE from 'three';

export function setupLights() {
  const lights = [];

  // Base ambient light for overall illumination
  // Color: warm gray, Intensity: low (0.2)
  const ambientLight = new THREE.AmbientLight(0x404040, 0.2);
  lights.push(ambientLight);

  // Living room main light
  // Color: warm white (0xffd1b3), Intensity: high (25)
  const livingRoomLight = new THREE.PointLight(0xffd1b3, 25);
  livingRoomLight.position.set(-2, 2.5, -2); // Positioned above living area
  livingRoomLight.castShadow = true;
  // High-quality shadow settings
  livingRoomLight.shadow.mapSize.width = 1024;
  livingRoomLight.shadow.mapSize.height = 1024;
  livingRoomLight.shadow.camera.near = 0.1;
  livingRoomLight.shadow.camera.far = 10;
  livingRoomLight.decay = 2; // Realistic light decay
  lights.push(livingRoomLight);

  // Dining room main light
  // Similar settings to living room light
  const diningRoomLight = new THREE.PointLight(0xffd1b3, 25);
  diningRoomLight.position.set(2, 2.5, 2);
  diningRoomLight.castShadow = true;
  diningRoomLight.shadow.mapSize.width = 1024;
  diningRoomLight.shadow.mapSize.height = 1024;
  diningRoomLight.shadow.camera.near = 0.1;
  diningRoomLight.shadow.camera.far = 10;
  diningRoomLight.decay = 2;
  lights.push(diningRoomLight);

  // Hallway accent light
  // Lower intensity (15) for ambient lighting
  const hallwayLight = new THREE.PointLight(0xffd1b3, 15);
  hallwayLight.position.set(0, 2.5, 0);
  hallwayLight.castShadow = true;
  // Lower resolution shadows for performance
  hallwayLight.shadow.mapSize.width = 512;
  hallwayLight.shadow.mapSize.height = 512;
  hallwayLight.decay = 2;
  lights.push(hallwayLight);

  return lights;
}