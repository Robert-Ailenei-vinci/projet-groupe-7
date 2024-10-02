/* eslint-disable no-unused-vars */
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.jsx';
import { Sun } from './objects/stars/Sun';
import { Planet } from './objects/planets/Planets.jsx';
import { planetData } from './objects/planets/PlanetsList.jsx'
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

const loader = new THREE.TextureLoader();
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(100, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer();

const ambientLight = new THREE.AmbientLight(0x404040, 0.5);
scene.add(ambientLight);

renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Controls setup
const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.dampingFactor = 0.25;

// Offset the initial camera position
camera.position.set(100, 150, 300);
camera.lookAt(0, 0, 0);

// Create the Sun
const sun = new Sun(scene, loader);



// Create the planets
const planets = planetData.map(data => new Planet(scene, loader, data));

// Animation loop
renderer.setAnimationLoop(() => {
    sun.update();

    planets.forEach(planet => planet.update(sun.sun.position));

    controls.update();
    renderer.render(scene, camera);
});
