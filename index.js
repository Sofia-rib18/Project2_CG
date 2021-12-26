import * as THREE from './libs/three.module.js'

let camera, scene, renderer

window.onload = function init() {
    //criação the scene, camera, renderer
    scene = new THREE.Scene()
    const aspect = window.innerWidth / window.innerHeight
    camera = new THREE.PerspectiveCamera(75, aspect, 0.1, 1000)
    camera.position.x = camera.position.y = 2
    camera.position.z = 5
    camera.lookAt(scene.position)
    renderer = new THREE.WebGLRenderer()
    renderer.setSize(window.innerWidth, window.innerHeight)
    renderer.setClearColor('#000000')

    document.body.appendChild(renderer.domElement);



    renderer.setAnimationLoop(render)
}

function render() {

    renderer.render(scene, camera)
}