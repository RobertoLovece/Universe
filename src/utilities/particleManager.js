import * as THREE from 'three';
import Particle from './particle.js'

import vertex from '../shaders/particles/vertexShader.glsl'
import fragment from '../shaders/particles/fragmentShader.glsl'

var colors = require("nice-color-palettes");

export default class ParticleManager {
    constructor(number) {
        
        this.positions;
        this.rands;
        this.particles = [];
        this.geometry;
        this.points;

        this.initParticles(number);
        this.removedShaderInit();
    }

    initParticles(numberOfParticles) {

        this.positions = new Float32Array(numberOfParticles * 3);
        this.rands = new Float32Array(numberOfParticles);
    
        for (let i = 0; i < numberOfParticles; i++) {
            this.rands.set([Math.random()], i);
            this.particles.push(
                new Particle(6, 30)
            );
        }
    
    }

    initParticleGeometry() {

        this.geometry = new THREE.BufferGeometry().setAttribute(
            "position",
            new THREE.BufferAttribute(this.positions, 3)
        );
        
        this.geometry.setAttribute(
            "rands",
            new THREE.BufferAttribute(this.rands, 1)
        );

    
        // var palette = colors[4];
        var palette = colors[5];
        palette = palette.map((c) => new THREE.Color(c));
    
        var material = new THREE.ShaderMaterial({
            vertexShader: vertex,
            fragmentShader: fragment,
            side: THREE.DoubleSide,
            uniforms: {
                time: { value: 0 },
                palette: { value: palette },
                size: { value: 0.7 },
                resolution: { value: new THREE.Vector4() },
            },
            // determines how the colours stack
            //blending: THREE.AdditiveBlending,
            //blending: THREE.NoBlending,
            //depthTest: false,
            //depthWrite: false,
        });
    
        this.points = new THREE.Points(this.geometry, material);
    
    }

    removedShaderInit() {

        this.geometry = new THREE.BufferGeometry().setAttribute(
            "position",
            new THREE.BufferAttribute(this.positions, 3)
        );

        this.geometry.setAttribute(
            "rands",
            new THREE.BufferAttribute(this.rands, 1)
        );
    
        var material = new THREE.PointsMaterial({
            size: 0.05,
        })

        this.points = new THREE.Points(this.geometry, material);
    }
}