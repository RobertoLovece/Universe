import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

require('normalize.css/normalize.css');
require("./index.css");

let scene, camera, renderer, cube, controls, container;

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

    renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    
    renderer.setSize(width, height);
    
    container.appendChild(renderer.domElement);

    const geometry = new THREE.BoxGeometry(2, 2, 2);
    const material = new THREE.MeshBasicMaterial({ color: 0x0000ff });

    cube = new THREE.Mesh(geometry, material);
    scene.add(cube);

    camera.position.z = 5;

    controlsInit();
}

function animate() {
    requestAnimationFrame(animate);

    controls.update();
    cube.rotation.x += 0.01;
    cube.rotation.y += 0.01;

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