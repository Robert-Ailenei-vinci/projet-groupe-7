// Planet data
export const planetData = [
    {
        name: 'Mercury',
        radius: 2,
        distanceFromSun: 60,
        textureUrl: '/part1/src/assets/planets/2k_mercury.jpg',
        rotationSpeed: 0.002,
        orbitSpeed: 0.01,
        moons: []
    },
    {
        name: 'Venus',
        radius: 4,
        distanceFromSun: 100,
        textureUrl: '/part1/src/assets/planets/2k_venus_surface.jpg',
        rotationSpeed: 0.002,
        orbitSpeed: 0.008,
        moons: []
    },
    {
        name: 'Mars',
        radius: 3,
        distanceFromSun: 230,
        textureUrl: '/part1/src/assets/planets/2k_mars.jpg',
        rotationSpeed: 0.002,
        orbitSpeed: 0.006
		//
        //moons: [
        //    { name: 'Phobos', radius: 0.5, distanceFromPlanet: 7, textureUrl: '/textures/phobos.jpg' },
        //    { name: 'Deimos', radius: 0.3, distanceFromPlanet: 12, textureUrl: '/textures/deimos.jpg' }
        //]
    },
	{
        name: 'Earth',
        radius: 5,
        distanceFromSun: 150,
        textureUrl: '/part1/src/assets/planets/2k_earth_daymap.jpg',
        rotationSpeed: 0.001,
        orbitSpeed: 0.007,
        moons: [
            { name: 'Moon', radius: 1, distanceFromPlanet: 10, textureUrl: '/part1/src/assets/moons/2k_moon.jpg' }
        ]
    },

];
