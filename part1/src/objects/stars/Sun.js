import * as THREE from 'three';

export class Sun {
    constructor(scene, loader) {
        // Load the texture for the sun
        const texture = loader.load('/part1/src/assets/planets/Sun-0.jpg');

        // Create the sun geometry and material
        const geometry = new THREE.SphereGeometry();
        const material = new THREE.MeshBasicMaterial({ map: texture });

        // Create the sun mesh
        this.sun = new THREE.Mesh(geometry, material);
        scene.add(this.sun);

        // Add a PointLight at the same position as the sun
        this.sunLight = new THREE.PointLight(0xffffff, 1.5, 1000);
        this.sunLight.position.copy(this.sun.position);
        scene.add(this.sunLight);
    }

    // Update the sun's rotation and light position
    update() {
        this.sun.rotation.x += 0.001;
        this.sunLight.position.copy(this.sun.position);
    }
}
