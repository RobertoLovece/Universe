import * as THREE from 'three';
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js';
import { AfterimagePass } from 'three/examples/jsm/postprocessing/AfterimagePass.js';
import { FilmPass } from 'three/examples/jsm/postprocessing/FilmPass.js';

import DistortedSphere from './utilities/DistortedSphere.js';
import ParticleManager from './utilities/particleManager.js';
import Glow from './utilities/glow.js';
import Stars from './utilities/stars.js';
import {cssInit} from './index_css.js';

require('normalize.css/normalize.css');
require("./index.css");

__webpack_public_path__ = window.myDynamicPublicPath;

let scene, camera, renderer, container, start = Date.now(), particleManager, sphere, glow, stars, composer;

window.onload = function () {

    console.log("hello!");

    cssInit();
    initScene();

    // this is really important stops obects rendering on top of each other
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

    camera.position.set(0, -30, 8);  
    camera.lookAt(new THREE.Vector3(0, 0, 0));

    renderer = new THREE.WebGLRenderer({
        //preserveDrawingBuffer: true, 
        alpha: true,
        //antialias: true,

    });

    //renderer.autoClear = false;
    //renderer.outputEncoding = THREE.sRGBEncoding;
    renderer.setSize(width, height);
    container.appendChild(renderer.domElement);

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
    
    const filmPass = new FilmPass(
        0.35,   // noise intensity
        0.025,  // scanline intensity
        648,    // scanline count
        false,  // grayscale
    );
    filmPass.renderToScreen = true;
    composer.addPass(filmPass);

}

function initObjects() {

    // inits disorted sphere
    // radius, speed, color, density, strength, frequency, amplitude, offset
    sphere = new DistortedSphere(5, 0.1, 0, 10, 0.4, 2, 1, 0);
    scene.add(sphere);

    // inits particles
    particleManager = new ParticleManager(3000);
    scene.add(particleManager.points);

    // glow under effect
    glow = new Glow();
    scene.add(glow);

    stars = new Stars(3000).stars;
    scene.add(stars);
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
    
    //animate stars
    stars.rotation.y += -0.0002;

    //renderer.render(scene, camera);
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

    renderer.setSize(width,height);
    composer.setSize(width, height);
}