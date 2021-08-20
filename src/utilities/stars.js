import * as THREE from 'three';
import Cross from '../texture/cross.png';

export default class Stars extends THREE.Object3D {
    constructor(starNumber) {
        
        super();

        var loader = new THREE.TextureLoader();
        var cross = loader.load(Cross);

        this.geometry = new THREE.BufferGeometry();
        this.material = new THREE.PointsMaterial({
            size: 0.05,
            map: cross,
            transparent: true,
        })

        this.posArray = new Float32Array(starNumber * 3);

        for(let i = 0 ; i < starNumber * 3 ; i++) {
            this.posArray[i] = (Math.random() - 0.5) * (Math.random() * 5) * 19;
        }

        this.geometry.setAttribute('position', new THREE.BufferAttribute(this.posArray, 3));

        this.stars = new THREE.Points(this.geometry, this.material);
    }
}