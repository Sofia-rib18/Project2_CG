import * as THREE from './libs/three.module.js'

let camera, scene, renderer
let face, neck, eye1, eye2, ear1, ear2, nose, body, tail, paw1, paw2, paw3, paw4, leg1, leg2
let dir = 1

window.onload = function init() {
    //criação da cena vazia que vai ter os elementos
    scene = new THREE.Scene()
    //Criação da camera que vai definir para onde estamos a olhar
    const aspect = window.innerWidth / window.innerHeight
    camera = new THREE.PerspectiveCamera(75, aspect, 0.1, 1000) //perspetiva da camera
    //posição da camera
    camera.position.x = 2 //linha azul
    camera.position.y = 1 //linha verde
    camera.position.z = 5 //linha vermelha
    
    camera.lookAt(1, 1, 0) //aponta a camera para o centro da cena
    //criação do render: se um canvas não tiver criado, vai criar um novo elemento canvas
    renderer = new THREE.WebGLRenderer()
    renderer.setSize(window.innerWidth, window.innerHeight)
    renderer.setClearColor('#000000') //Cor de fundo da cena

    document.body.appendChild(renderer.domElement);

    //cabeça do gato
    let geometryFace = new THREE.SphereGeometry(0.5);
    let material1 = new THREE.MeshNormalMaterial();
    face = new THREE.Mesh(geometryFace, material1);
    face.rotation.y = 0.2
    scene.add(face)

    //Pescoço do gato
    let geometryNeck = new THREE.CylinderGeometry(0.15, 0.15, 0.15, 20);
    neck = new THREE.Mesh( geometryNeck, material1);
    neck.position.set(0, -0.45, 0)
    scene.add(neck);

    //Olho1 do gato
    let geometryEye1 = new THREE.SphereGeometry(0.1);
    let material2 = new THREE.MeshBasicMaterial({color: 0x049ef4})
    eye1 = new THREE.Mesh(geometryEye1, material2);
    eye1.position.set(0.10, 0.20, 0.35);
    face.add(eye1)

    //Olho2 do gato
    eye2 = new THREE.Mesh(geometryEye1, material2);
    eye2.position.set(0.30, 0.20, 0.21);
    face.add(eye2)

    //Orelha1 do gato
    let geometryEar1 = new THREE.ConeGeometry(0.15, 0.25, 3);
    ear1 = new THREE.Mesh( geometryEar1, material2 );
    ear1.position.set(-0.1, 0.5, 0.25)
    face.add(ear1);

    //Orelha2 do gato
    ear2 = new THREE.Mesh( geometryEar1, material2 );
    ear2.position.set(0.2, 0.5, 0)
    face.add(ear2);

    //Nariz do gato
    let geometryNose = new THREE.SphereGeometry(0.1);
    nose = new THREE.Mesh(geometryNose, material2);
    nose.position.set(0.3, 0.05, 0.4)
    face.add(nose)

    //Corpo do gato
    let geometryBody = new THREE.SphereGeometry(0.7);
    body = new THREE.Mesh(geometryBody, material1);
    body.position.set(-0.3, -0.7, 0)
    neck.add(body)
    
    //Cauda do gato
    class CustomSinCurve extends THREE.Curve{

        constructor(scale=1) {
            super();
            this.scale = scale;
        }
    
        getPoint(t, optionalTarget = new THREE.Vector3()){
            let tx = t * 3 - 1.5;
            let ty = Math.sin( 2 * Math.PI * t );
            let tz = 0;
            return optionalTarget.set(tx, ty, tz).multiplyScalar(this.scale);
        }
    }
    
    let path = new CustomSinCurve(0.5);
    let geometryTail = new THREE.TubeGeometry(path, 45, 0.1, 8, false);
    tail = new THREE.Mesh(geometryTail, material1);
    //alterar posição e rotação da cauda
    tail.position.set(-0.8, 0, -0.4)
    tail.rotation.z = 3
    tail.rotation.x = -0.4
    body.add(tail);

    //Perna1 do gato
    let geometryLeg1 = new THREE.CylinderGeometry(0.13, 0.13, 0.7, 20);
    leg1 = new THREE.Mesh(geometryLeg1, material1);
    leg1.position.set(0.5, 0, 0.5)
    leg1.rotation.z = -6
    leg1.rotation.x = -0.3
    body.add(leg1);

    //Perna1 do gato
    leg2 = new THREE.Mesh(geometryLeg1, material1);
    leg2.position.set(0.7, 0, 0.2)
    leg2.rotation.z = -5.9
    leg2.rotation.x = -0.2
    body.add(leg2);

    //Pata1 do gato
    let geometryPaw1 = new THREE.SphereGeometry(0.2);
    paw1 = new THREE.Mesh(geometryPaw1, material1);
    paw1.position.set(0, -0.6, 0.6)
    body.add(paw1)

    //Pata2 do gato
    paw2 = new THREE.Mesh(geometryPaw1, material1);
    paw2.position.set(0.4, -0.6, -0.2)
    body.add(paw2)

    //Pata3 do gato
    paw3 = new THREE.Mesh(geometryPaw1, material1);
    paw3.position.set(0.1, -0.4, 0.1)
    leg2.add(paw3)

    //Pata4 do gato
    paw4 = new THREE.Mesh(geometryPaw1, material1);
    paw4.position.set(0.1, -0.4, 0.1)
    leg1.add(paw4)

    let axes = new THREE.AxesHelper(4);
    scene.add(axes);


    renderer.setAnimationLoop(render)
}

function render() {

    renderer.render(scene, camera)

    // tail.rotation.x += 0.01
    face.rotation.y += dir * 0.01
    if (face.rotation.y == 0.2) {
        dir = 1
    } else if (face.rotation.y >= 0.49) {
        dir = -1
    }

    tail.rotation.x += dir * 0.01
    if (face.rotation.x == 0.2) {
        dir = 1
    } else if (face.rotation.x >= 0.49) {
        dir = -1
    }
}