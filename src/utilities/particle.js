import Vec2 from 'vec2';

export default class Particle{
    constructor(args) {
        // initialize postion
        this.pos = new Vec2();
        this.pos.x = args.x || 0;
        this.pos.y = args.y || 0;

        // initialize velocity with gravity
        //this.gravity = -0.5 - Math.random()/4
        //this.velocity = new Vec2(0, this.gravity);
        this.velocity = 0.01;
        this.radians = 0;
        this.multiplier = 2;
    }

    updateVelocity() {
        this.radians += this.velocity;
    }

    updatePosition() {
        this.pos.x = this.pos.x + Math.cos(this.radians) * this.multiplier;
        this.pos.y = this.pos.y + Math.sin(this.radians) * this.multiplier;

        if(this.pos.y <- window.innerHeight/2) {
            this.pos.y = window.innerHeight /2;
        }
    }
}