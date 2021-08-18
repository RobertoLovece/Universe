import * as THREE from 'three';
import vertex from '../shaders/distortedSphere/vertexShader.glsl'
import fragment from '../shaders/distortedSphere/fragmentShader.glsl'

export default class DistortedSphere extends THREE.Object3D {
    constructor(radius, speed, color, density, strength, frequency, amplitude, offset) {
       
        super();

        this.geometry = new THREE.IcosahedronGeometry(radius, 64);
        this.material = new THREE.ShaderMaterial({
            vertexShader: vertex,
            fragmentShader: fragment,
            uniforms: {
                // time variable which controls animations
                uTime: { value: 0 },
                // speed of the animations (0 - 1)
                uSpeed: { value: speed },
                // Noise density (1 - 10)
                uNoiseDensity: { value: density },
                // Noise strength (1 - 2)
                uNoiseStrength: { value: strength },
                // frequency of the rotation (1 - 10+ 30?)
                uFreq: { value: frequency },
                // aplification of the rotation (1 - 10)
                uAmp: { value: amplitude },
                // intensity of the color (0 - 1)
                uHue: { value: color },
                // makes the sphere pulse, offset 0 = no pulse (0 - 1)
                uOffset: { value: Math.PI * offset },
                // transparency (0 - 1)
                uAlpha: {value: 1.0},
            },
            defines: { 
                PI: Math.PI
            },
            transparent: true,
        });

        this.mesh = new THREE.Mesh(this.geometry, this.material);

        this.add(this.mesh);
    }
}
