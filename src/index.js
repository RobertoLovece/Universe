import * as THREE from 'three';
import DistortedSphere from './utilities/DistortedSphere.js';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

require('normalize.css/normalize.css');
require("./index.css");

let scene, camera, renderer, controls, container, sphere, start = Date.now();

window.onload = function() {
    init();
    animate();
}

function init() {

    scene = new THREE.Scene();

    container = document.getElementById('canvas');
   
    var width = container.offsetWidth;
    var height = container.offsetHeight;

    camera = new THREE.PerspectiveCamera(
        75,
        width / height,
        0.1,
        1000
    );

    camera.position.z = 15;

    renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(width, height);
    container.appendChild(renderer.domElement);

    // radius, speed, color, density, strength, frequency, amplitude, offset
    sphere = new DistortedSphere(5, 0.35, 0.1, 10, 0.2, 10, 0.5, 0);   
    scene.add(sphere);

    controlsInit();
}

function animate() {
    requestAnimationFrame(animate);

    // updates the shaders time allowing for animation
    scene.children.forEach(mesh => {
        mesh.material.uniforms.uTime.value = 0.001 * ( Date.now() - start )
    });

    controls.update();

    renderer.render(scene, camera);
}

function controlsInit() {

    controls = new OrbitControls(camera, renderer.domElement);

    controls.enablePan = false;
    controls.enableZoom = false;
    controls.enableRotate = true;

}

function onWindowResize() {
    container = document.getElementById('canvas');

    var width = container.offsetWidth;
    var height = container.offsetHeight;

    camera.aspect = width/ height;
    camera.updateProjectionMatrix();

    renderer.setSize(width, height);
}

window.addEventListener('resize', onWindowResize, false);