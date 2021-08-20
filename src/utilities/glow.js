import * as THREE from 'three';

import glowVertexShader from '../shaders/glow/vertexShader.glsl'
import glowFragmentShader from '../shaders/glow/fragmentShader.glsl'

export default class Glow extends THREE.Object3D {
    constructor() {
       
        super();

        this.geometry = new THREE.SphereGeometry(60, 8, 8);
        this.material = new THREE.ShaderMaterial({
            vertexShader: glowVertexShader,
            fragmentShader: glowFragmentShader,
            //blending: THREE.AdditiveBlending,
            //side: THREE.BackSide    
            side: THREE.FrontSide    
        });

        this.mesh = new THREE.Mesh(this.geometry, this.material);
        
        // translations
        this.mesh.translateY(10);
        this.mesh.translateZ(-3);
        this.mesh.scale.set(1, 1, 0.01);
        this.mesh.rotateX(Math.PI);

        this.add(this.mesh);
    }
}