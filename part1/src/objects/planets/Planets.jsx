import * as THREE from 'three';

export class Planet {
    constructor(scene, loader, {
        name,
        radius,
        distanceFromSun,
        textureUrl,
        rotationSpeed,
        orbitSpeed,
        moons = []
    }) {
        this.name = name;
        this.radius = radius;
        this.distanceFromSun = distanceFromSun;
        this.rotationSpeed = rotationSpeed;
        this.orbitSpeed = orbitSpeed;
        this.moons = moons;
        this.orbitAngle = 0;

        // Create the planet geometry and material
        const geometry = new THREE.SphereGeometry(this.radius, 32, 32);
        const texture = loader.load(textureUrl);
        const material = new THREE.MeshStandardMaterial({ map: texture });

        // Create the planet mesh
        this.planet = new THREE.Mesh(geometry, material);
        this.planet.position.x = this.distanceFromSun;
        scene.add(this.planet);

        // Create moons if there are any
        this.moonMeshes = [];
        this.createMoons(scene, loader);

        // Create the orbit path
        this.createOrbitPath(scene);
    }

    createOrbitPath(scene) {
        // Create circular geometry for the orbit path
        const orbitRadius = this.distanceFromSun;
        const orbitSegments = 64; // Higher number makes a smoother circle

        const orbitGeometry = new THREE.RingGeometry(orbitRadius - 0.1, orbitRadius + 0.1, orbitSegments);
        const orbitMaterial = new THREE.MeshBasicMaterial({
            color: 0xffffff,
            side: THREE.DoubleSide,
            transparent: true,
            opacity: 0.5
        });

        const orbit = new THREE.Mesh(orbitGeometry, orbitMaterial);
        orbit.rotation.x = Math.PI / 2; // Rotate the ring to be horizontal (flat on the ground)
        scene.add(orbit);
    }

    createMoons(scene, loader) {
        this.moons.forEach(moon => {
            const geometry = new THREE.SphereGeometry(moon.radius, 32, 32);
            const texture = loader.load(moon.textureUrl);
            const material = new THREE.MeshStandardMaterial({ map: texture });

            const moonMesh = new THREE.Mesh(geometry, material);
            moonMesh.position.set(this.planet.position.x + moon.distanceFromPlanet, 0, 0);
            scene.add(moonMesh);
            this.moonMeshes.push(moonMesh);
        });
    }

    update(sunPosition) {
        // Planet rotation
        this.planet.rotation.y += this.rotationSpeed;

        // Orbit around the sun
        this.orbitAngle += this.orbitSpeed;
        this.planet.position.x = sunPosition.x + Math.cos(this.orbitAngle) * this.distanceFromSun;
        this.planet.position.z = sunPosition.z + Math.sin(this.orbitAngle) * this.distanceFromSun;

        // Update moon positions around the planet
        this.moonMeshes.forEach((moonMesh, index) => {
            const moon = this.moons[index];
            moonMesh.position.x = this.planet.position.x + Math.cos(this.orbitAngle) * moon.distanceFromPlanet;
            moonMesh.position.z = this.planet.position.z + Math.sin(this.orbitAngle) * moon.distanceFromPlanet;
        });
    }
}
