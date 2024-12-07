import * as THREE from 'three';
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer';
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass';
import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass';

/**
 * Sets up post-processing effects for the scene
 * Currently implements:
 * - Bloom effect for realistic light glow
 */
export function setupPostProcessing(
  scene: THREE.Scene,
  camera: THREE.Camera,
  renderer: THREE.WebGLRenderer
) {
  // Initialize the effect composer
  const composer = new EffectComposer(renderer);
  
  // Add the basic scene render pass
  const renderPass = new RenderPass(scene, camera);
  composer.addPass(renderPass);

  // Add bloom effect for light glow
  // Parameters tuned for subtle, realistic effect:
  // - strength: 0.3 (subtle bloom)
  // - radius: 0.5 (medium spread)
  // - threshold: 0.9 (only bright areas bloom)
  const bloomPass = new UnrealBloomPass(
    new THREE.Vector2(window.innerWidth, window.innerHeight),
    0.3,    // Bloom strength
    0.5,    // Bloom radius
    0.9     // Bloom threshold
  );
  composer.addPass(bloomPass);

  return composer;
}