/* eslint-disable no-unused-vars */
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'

import * as THREE from 'three';
const loader = new THREE.TextureLoader();
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 100, window.innerWidth / window.innerHeight, 0.1, 1000 );
const texture = loader.load( '/part1/src/assets/Sun-0.jpg' );


const renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
renderer.setAnimationLoop( animate );
document.body.appendChild( renderer.domElement );


//sun
const geometry = new THREE.SphereGeometry();
const material = new THREE.MeshBasicMaterial( { map:texture } );
const sun = new THREE.Mesh( geometry, material );
scene.add( sun );

// Add a PointLight at the same position as the sun
const sunLight = new THREE.PointLight( 0xffffff, 1, 100 );
sunLight.position.copy(sun.position);
scene.add( sunLight );

camera.position.z = 5;

function animate() {

	sun.rotation.x += 0.001;
	sunLight.position.copy(sun.position); // Ensure the light follows the sun
	renderer.render( scene, camera );

}
