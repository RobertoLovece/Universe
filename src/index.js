import * as THREE from 'three';
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js';
import { AfterimagePass } from 'three/examples/jsm/postprocessing/AfterimagePass.js';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

import DistortedSphere from './utilities/DistortedSphere.js';
import ParticleManager from './utilities/particleManager.js'

require('normalize.css/normalize.css');
require("./index.css");

let scene, camera, renderer, container, start = Date.now(), particleManager, sphere, composer, controls;

window.onload = function () {

    initScene();

    initOrbitControls();
    // this had no effect i think
    initClearPlane();
    
    initPostProcessing();
    
    initObjects();

    addEventListeners();

    animate();
}

function initScene() {

    scene = new THREE.Scene();
    //scene.fog = new THREE.Fog( 0x000000, 1, 1000 );

    container = document.getElementById('canvas');

    var width = container.offsetWidth;
    var height = container.offsetHeight;

    camera = new THREE.PerspectiveCamera(
        75,
        width / height,
        0.1,
        1000
    );

    camera.position.z = 8;
    camera.position.y = -30;
    camera.position.x = 1;
    camera.lookAt(new THREE.Vector3(0, 0, 0));


    renderer = new THREE.WebGLRenderer({
        //preserveDrawingBuffer: true, 
        alpha: true,
        antialias: true
    });

    //renderer.autoClear = false;
    renderer.setSize(width, height);
    container.appendChild(renderer.domElement);

}

function initOrbitControls() {
    controls = new OrbitControls( camera, renderer.domElement );

    controls.enabled = false;
    //controls.autoRotate = true;
    //controls.autoRotateSpeed = 0.1;
}

function initClearPlane() {

    var clearPlane = new THREE.Mesh(
        new THREE.PlaneGeometry(2700, 2700),
        new THREE.MeshBasicMaterial({
            transparent: true,
            color: 0x000000,
            opacity: 0.1,
        })
    );

    clearPlane.position.z = 0;

    scene.add(clearPlane);
}

function initPostProcessing() {

    // post-processing

    composer = new EffectComposer(renderer);
    composer.addPass(new RenderPass(scene, camera));

    var afterimagePass = new AfterimagePass();
    afterimagePass.uniforms['damp'].value = 0.95;
    composer.addPass(afterimagePass);

}

function initObjects() {

    // inits disorted sphere
    // radius, speed, color, density, strength, frequency, amplitude, offset
    sphere = new DistortedSphere(5, 0.1, 0, 10, 0.4, 2, 0.5, 0);
    scene.add(sphere);

    // inits particles
    particleManager = new ParticleManager(3000);
    scene.add(particleManager.points);

}

function animate() {
    requestAnimationFrame(animate);

    // animates distorted sphere
    // updates the shaders time allowing for animation
    sphere.material.uniforms.uTime.value = 0.001 * (Date.now() - start)

    // animate orbiting particles
    particleManager.particles.forEach((particle, i) => {
        particle.updateVelocity();
        particle.updatePosition();

        particleManager.positions.set([particle.pos.x, particle.pos.y, 0], i * 3);
    });

    particleManager.geometry.attributes.position.needsUpdate = true;

    //renderer.render(scene, camera);
    controls.update();
    composer.render();
}

// below here contains event listeners init
function addEventListeners() {
    window.addEventListener('resize', onWindowResize, false);
}

function onWindowResize() {
    container = document.getElementById('canvas');

    var width = container.offsetWidth;
    var height = container.offsetHeight;

    camera.aspect = width / height;
    camera.updateProjectionMatrix();

    renderer.setSize(width, height);
}