import * as THREE from 'three';
export default class Particle extends THREE.Object3D{
    constructor(minRadius, maxRadius) {

        super();

        // radius of orbit
        this.radius = this.randomFavourMax(minRadius, maxRadius);

        // x and y coordinates of orbit center point
        this.orbitX = 0;
        this.orbitY = 0;

        // determines start pos in circle (0π - 2π)
        this.radians = this.getRandomBetween(0, Math.PI * 2);

        // with multiplier determines speed of rotation
        this.velocity = this.getRandomBetween(0.005, 0.015);
        this.multiplier = 1;

        // keeps track of current pos of particle
        this.pos = new THREE.Vector2();
        this.pos.x = 0;
        this.pos.y = 0;


    }

    updateVelocity() {
        this.radians += this.velocity;
    }

    updatePosition() {
        this.pos.x = this.radius*Math.cos(this.radians * this.multiplier) + this.orbitX;
        this.pos.y = this.radius*Math.sin(this.radians * this.multiplier) + this.orbitY;
    }

    getRandomBetween(min, max) {
        return Math.random() * (max - min) + min;
    }

    randomFavourMax(min, max) {
        return min + (max - min) * Math.pow(Math.random(), 0.85)
    }
}