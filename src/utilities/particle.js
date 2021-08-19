import * as THREE from 'three';

import Vec2 from 'vec2';

export default class Particle extends THREE.Object3D{
    constructor(minRadius, maxRadius) {

        super();

        // radius of orbit
        this.radius = this.getRandomBetween(minRadius, maxRadius);

        // x and y coordinates of orbit center point
        this.orbitX = 0;
        this.orbitY = 0;

        // determines start pos in circle (0π - 2π)
        this.radians = this.getRandomBetween(0, Math.PI * 2);

        // with multiplier determines speed of rotation
        this.velocity = this.getRandomBetween(0.005, 0.015);
        this.multiplier = 1;

        // keeps track of current pos of particle
        this.pos = new Vec2();
        this.pos.x = 0;
        this.pos.y = 0;


    }

    updateVelocity() {
        this.radians += this.velocity;
    }

    updatePosition() {
        this.pos.x = this.radius*Math.cos(this.radians * this.multiplier) + this.orbitX;
        this.pos.y = this.radius*Math.sin(this.radians * this.multiplier) + this.orbitY;

        if(this.pos.y <- window.innerHeight/2) {
            this.pos.y = window.innerHeight /2;
        }
    }

    getRandomBetween(min, max) {
        return Math.random() * (max - min) + min;
    }
}