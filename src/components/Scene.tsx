import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { createRoom } from '../world/room';
import { setupLights } from '../world/lights';
import { initializeControls } from '../controls/firstPersonControls';
import { setupPostProcessing } from '../effects/postProcessing';

export function Scene() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x1a1a1a);

    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    camera.position.set(0, 1.7, 0);

    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    containerRef.current.appendChild(renderer.domElement);

    const room = createRoom();
    scene.add(room);
    
    const lights = setupLights();
    lights.forEach(light => scene.add(light));

    const controls = initializeControls(camera, renderer.domElement);
    const composer = setupPostProcessing(scene, camera, renderer);

    const animate = () => {
      requestAnimationFrame(animate);
      controls.update();
      composer.render();
    };

    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
      composer.setSize(window.innerWidth, window.innerHeight);
    };

    window.addEventListener('resize', handleResize);
    animate();

    return () => {
      window.removeEventListener('resize', handleResize);
      controls.dispose();
      containerRef.current?.removeChild(renderer.domElement);
      renderer.dispose();
    };
  }, []);

  return <div ref={containerRef} className="w-full h-screen" />;
}