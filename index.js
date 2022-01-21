import * as THREE from './libs/three.module.js'

let camera, scene, renderer
let baymax, head, shoulder1, elbow1, shoulder2, elbow2, bottom1, bottom2, knee1, knee2
let cat, face, neck, eye1, eye2, ear1, ear2, nose, body, tail, paw1, paw2, paw3, paw4, leg1, leg2
let floor, sideWalk
let dir = 1
let dir2 = 1
let elbowRotation = false

window.onload = function init() {
    //criação da cena vazia que vai ter os elementos
    scene = new THREE.Scene()
    //criação da camera que vai definir para onde estamos a olhar
    // const aspect = window.innerWidth / window.innerHeight
    camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 1, 1000);
    // position the camera
    camera.position.x = 0;
    camera.position.z = 140;
    camera.position.y = 0;


    camera.lookAt(1, 1, 0) //aponta a camera para o centro da cena
    //criação do render: se um canvasnão tiver criado, vai criar um novo
    renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);


    // configure renderer clear color
    renderer.setClearColor("#F2E5BD");
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 600))

    document.body.appendChild(renderer.domElement)
    // listen to the screen: if the user resizes it we have to update the camera and the renderer size
    window.addEventListener('resize', handleWindowResize, false);

    //add objects
    createBaymax()
    createCat()
    createFloor()
    createSidewalk()

    // show axes for the WORLD CS
    // let axes = new THREE.AxesHelper(6);
    // scene.add(axes);

    renderer.setAnimationLoop(render)
}

function handleWindowResize() {
    // update height and width of the renderer and the camera
    const HEIGHT = window.innerHeight;
    const WIDTH = window.innerWidth;
    renderer.setSize(WIDTH, HEIGHT);
    camera.aspect = WIDTH / HEIGHT;
    camera.updateProjectionMatrix();
}

function createFloor() {
    let geometry = new THREE.BoxGeometry(1800, 1000, 750)
    // let geometry = new THREE.CylinderGeometry(600, 600, 800, 40, 10);
    // rotate the geometry on the x axis (local transformation)
    geometry.rotateX(-Math.PI / 2);

    // create the material
    let material = new THREE.MeshBasicMaterial({
        color: 0x267355,
        transparent: true,
        // opacity: .6
    });

    // create the mesh: geometry + material
    floor = new THREE.Mesh(geometry, material);

    // push it a little bit at the bottom of the scene
    floor.position.y = -600;

    console.log("Floor created")
    scene.add(floor);
}

function createSidewalk() {
    let geometry = new THREE.BoxGeometry(250, 860, 800);
    // rotate the geometry on the x axis (local transformation)
    geometry.rotateX(-Math.PI / 2);

    // create the material
    let material = new THREE.MeshBasicMaterial({
        color: 0xD9D9D9,
        transparent: true,
    });

    // create the mesh: geometry + material
    sideWalk = new THREE.Mesh(geometry, material);

    // push it a little bit at the bottom of the scene
    sideWalk.position.y = -600;

    console.log("Sidewalk created")
    scene.add(sideWalk);
}

function createBaymax() {
    baymax = new THREE.Group();

    const materialRed = new THREE.MeshBasicMaterial({ color: 0xf25346 });
    const materialWhite = new THREE.MeshBasicMaterial({ color: 0xffffff });
    const materialDarkBrown = new THREE.MeshBasicMaterial({ color: 0x23190f });

    // Create the head
    let geomBody = new THREE.CylinderGeometry(20, 60, 90);
    let body = new THREE.Mesh(geomBody, materialRed);
    baymax.add(body);

    // Create the head
    let geomHead = new THREE.SphereGeometry(30)
    head = new THREE.Mesh(geomHead, materialWhite);
    head.position.y = 70;

    // eye
    let geomEye = new THREE.SphereGeometry(5);
    let eye = new THREE.Mesh(geomEye, materialDarkBrown);
    eye.position.set(28, 5, -2);

    //SECOND eye
    let eye2 = eye.clone();
    eye2.position.set(22, 5, 19);

    head.add(eye);
    head.add(eye2);

    head.position.set(0, 70, 0);
    head.rotation.y = 4
    baymax.add(head);

    /* Braço Esquerdo */
    // shoulder
    shoulder1 = new THREE.Object3D()
    body.add(shoulder1)
    let axesShoulder = new THREE.AxesHelper(4);
    shoulder1.add(axesShoulder);

    /* ARM */
    let geometry = new THREE.BoxGeometry(60, 15, 15)
    // let material = new THREE.MeshNormalMaterial({ wireframe: false });
    let arm1 = new THREE.Mesh(geometry, materialWhite);
    arm1.position.x = 20
    arm1.position.y = 20
    // add the ARM to the SHOULDER
    shoulder1.add(arm1);

    // show axes for the ARM CS
    let axesArm = new THREE.AxesHelper(2);
    arm1.add(axesArm);

    /* ELBOW */
    elbow1 = new THREE.Object3D();
    arm1.add(elbow1); // add the ELBOW to the ARM
    elbow1.position.x = 30
    elbow1.rotation.z = 0

    // show axes for the SHOULDER CS
    let axesElbow = new THREE.AxesHelper(4);
    elbow1.add(axesElbow);


    /* FOREARM */
    let forearm1 = new THREE.Mesh(geometry, materialWhite);
    forearm1.position.x = 30
    // add the FOREARM to the ELBOW
    elbow1.add(forearm1);

    // show axes for the FOREARM CS
    let axesForearm = new THREE.AxesHelper(2);
    forearm1.add(axesForearm);

    /* Braço Direito */
    // shoulder2
    shoulder2 = new THREE.Object3D()
    body.add(shoulder2)
    let axesShoulder2 = new THREE.AxesHelper(4);
    shoulder2.add(axesShoulder2);

    /* ARM2 */
    // let material = new THREE.MeshNormalMaterial({ wireframe: false });
    let arm2 = new THREE.Mesh(geometry, materialWhite);
    arm2.position.x = -70
    arm2.position.y = 20
    // add the ARM to the SHOULDER
    shoulder2.add(arm2);

    // show axes for the ARM CS
    let axesArm2 = new THREE.AxesHelper(2);
    arm2.add(axesArm2);

    /* ELBOW2 */
    elbow2 = new THREE.Object3D();
    arm2.add(elbow2); // add the ELBOW to the ARM
    elbow2.position.x = 20
    elbow2.rotation.z = 0

    // show axes for the SHOULDER CS
    let axesElbow2 = new THREE.AxesHelper(4);
    elbow2.add(axesElbow2);

    /* FOREARM2 */
    let forearm2 = new THREE.Mesh(geometry, materialWhite);
    forearm2.position.x = 20
    // add the FOREARM to the ELBOW
    elbow2.add(forearm2);

    // show axes for the FOREARM CS
    let axesForearm2 = new THREE.AxesHelper(2);
    forearm2.add(axesForearm2);


    /* Perna Esquerdo */
    // bottom
    bottom1 = new THREE.Object3D()
    body.add(bottom1)
    let axesBottom = new THREE.AxesHelper(4);
    bottom1.add(axesBottom);

    /* Leg */
    let leg1 = new THREE.Mesh(geometry, materialWhite);
    leg1.position.x = 20
    leg1.position.y = -50
    leg1.rotation.z = 30
    // add the leg to the bottom
    bottom1.add(leg1);

    // show axes for the leg CS
    let axesLeg = new THREE.AxesHelper(2);
    leg1.add(axesLeg);

    /* Kneew */
    knee1 = new THREE.Object3D();
    leg1.add(knee1); // add the knee to the leg
    knee1.position.x = 20

    // show axes for the knee CS
    let axesKnee = new THREE.AxesHelper(4);
    knee1.add(axesKnee);


    /* Calf */
    let calf1 = new THREE.Mesh(geometry, materialWhite);
    calf1.position.x = 20
    // add the calf to the knee
    knee1.add(calf1);

    // show axes for the calf CS
    let axesCalf = new THREE.AxesHelper(2);
    calf1.add(axesCalf);

    /* Perna Direita */
    // bottom
    bottom2 = new THREE.Object3D()
    body.add(bottom2)
    let axesBottom2 = new THREE.AxesHelper(4);
    bottom2.add(axesBottom2);

    /* Leg */
    let leg2 = new THREE.Mesh(geometry, materialWhite);
    leg2.position.x = -20
    leg2.position.y = -90
    leg2.rotation.z = -30
    // add the leg to the bottom
    bottom2.add(leg2);

    // show axes for the leg CS
    let axesLeg2 = new THREE.AxesHelper(2);
    leg2.add(axesLeg2);

    /* Kneew */
    knee2 = new THREE.Object3D();
    leg2.add(knee2); // add the knee to the leg
    knee2.position.x = 20

    // show axes for the knee CS
    let axesKnee2 = new THREE.AxesHelper(4);
    knee2.add(axesKnee2);


    /* Calf */
    let calf2 = new THREE.Mesh(geometry, materialWhite);
    calf2.position.x = 20
    // add the calf to the knee
    knee2.add(calf2);

    // show axes for the calf CS
    let axesCalf2 = new THREE.AxesHelper(2);
    calf2.add(axesCalf2);


    baymax.scale.set(0.35, 0.35, 0.35);
    baymax.position.y = -10;
    baymax.position.x = 40;

    console.log("Plane created")
    scene.add(baymax);
}

function createCat() {
    const materialOrange = new THREE.MeshBasicMaterial({ color: 0xe6934d });
    const materialBlue = new THREE.MeshBasicMaterial({ color: 0x374b70 });
    const materialWhite2 = new THREE.MeshBasicMaterial({ color: 0xf3f5f5 });
    const materialOrange2 = new THREE.MeshBasicMaterial({ color: 0x491b04 })

    //cabeça do gato
    let geometryFace = new THREE.SphereGeometry(0.5);
    let material1 = new THREE.MeshNormalMaterial();
    face = new THREE.Mesh(geometryFace, materialOrange);
    face.rotation.y = 0.2
    face.position.y = -2.1
    face.position.z = 130
    face.position.x = -2.2
    scene.add(face)

    //Corpo do gato
    let geometryBody = new THREE.SphereGeometry(0.7);
    body = new THREE.Mesh(geometryBody, materialOrange2);
    body.position.set(-2.5, -3.25, 130)
    scene.add(body)

    //Pescoço do gato
    let geometryNeck = new THREE.CylinderGeometry(0.15, 0.15, 0.15, 20);
    neck = new THREE.Mesh(geometryNeck, materialWhite2);
    neck.position.set(0.3, 0.6, 0)
    body.add(neck);

    //Olho1 do gato
    let geometryEye1 = new THREE.SphereGeometry(0.1);
    let material2 = new THREE.MeshBasicMaterial({ color: 0x049ef4 })
    eye1 = new THREE.Mesh(geometryEye1, materialBlue);
    eye1.position.set(0.10, 0.20, 0.35);
    face.add(eye1)

    //Olho2 do gato
    eye2 = new THREE.Mesh(geometryEye1, materialBlue);
    eye2.position.set(0.30, 0.20, 0.21);
    face.add(eye2)

    //Orelha1 do gato
    let geometryEar1 = new THREE.ConeGeometry(0.15, 0.25, 3);
    ear1 = new THREE.Mesh(geometryEar1, materialBlue);
    ear1.position.set(-0.1, 0.5, 0.25)
    face.add(ear1);

    //Orelha2 do gato
    ear2 = new THREE.Mesh(geometryEar1, materialWhite2);
    ear2.position.set(0.2, 0.5, 0)
    face.add(ear2);

    //Nariz do gato
    let geometryNose = new THREE.SphereGeometry(0.1);
    nose = new THREE.Mesh(geometryNose, materialBlue);
    nose.position.set(0.3, 0.05, 0.4)
    face.add(nose)

    //Cauda do gato
    class CustomSinCurve extends THREE.Curve {

        constructor(scale = 1) {
            super();
            this.scale = scale;
        }

        getPoint(t, optionalTarget = new THREE.Vector3()) {
            let tx = t * 3 - 1.5;
            let ty = Math.sin(2 * Math.PI * t);
            let tz = 0;
            return optionalTarget.set(tx, ty, tz).multiplyScalar(this.scale);
        }
    }

    let path = new CustomSinCurve(0.5);
    let geometryTail = new THREE.TubeGeometry(path, 45, 0.1, 8, false);
    tail = new THREE.Mesh(geometryTail, materialOrange);
    //alterar posição e rotação da cauda
    tail.position.set(-0.8, 0, -0.4)
    tail.rotation.z = 3
    tail.rotation.x = -0.4
    body.add(tail);

    //Perna1 do gato
    let geometryLeg1 = new THREE.CylinderGeometry(0.13, 0.13, 0.7, 20);
    leg1 = new THREE.Mesh(geometryLeg1, materialOrange);
    leg1.position.set(0.5, 0, 0.5)
    leg1.rotation.z = -6
    leg1.rotation.x = -0.3
    body.add(leg1);

    //Perna1 do gato
    leg2 = new THREE.Mesh(geometryLeg1, materialOrange);
    leg2.position.set(0.7, 0, 0.2)
    leg2.rotation.z = -5.9
    leg2.rotation.x = -0.2
    body.add(leg2);

    //Pata1 do gato
    let geometryPaw1 = new THREE.SphereGeometry(0.2);
    paw1 = new THREE.Mesh(geometryPaw1, materialOrange);
    paw1.position.set(0, -0.6, 0.6)
    body.add(paw1)

    //Pata2 do gato
    paw2 = new THREE.Mesh(geometryPaw1, materialOrange);
    paw2.position.set(0.4, -0.6, -0.2)
    body.add(paw2)

    //Pata3 do gato
    paw3 = new THREE.Mesh(geometryPaw1, materialOrange);
    paw3.position.set(0.1, -0.4, 0.1)
    leg2.add(paw3)

    //Pata4 do gato
    paw4 = new THREE.Mesh(geometryPaw1, materialOrange);
    paw4.position.set(0.1, -0.4, 0.1)
    leg1.add(paw4)
}

function render() {
    // render
    renderer.render(scene, camera);

    //animação do boneco
    head.rotation.y += dir * 0.01
    if (head.rotation.y == 4) {
        dir = 1
    } else if (head.rotation.y >= 6) {
        dir = -1
    }

    //interação com o boneco carregando na tecla w
    if (elbowRotation) {
        elbow1.rotation.z += dir * 0.01
        if (elbow1.rotation.z == 0) {
            dir = 1
        } else if (elbow1.rotation.z >= 1.5) {
            dir = -1
        }
    }


    catAnimation()


}
function catAnimation() {
    //animação gato
    face.rotation.y += dir2 * 0.01
    if (face.rotation.y == 0.2) {
        dir2 = 1
    } else if (face.rotation.y >= 0.49) {
        dir2 = -1
    }

    tail.rotation.x += dir2 * 0.01
    if (face.rotation.x == 0.2) {
        dir2 = 1
    } else if (face.rotation.x >= 0.49) {
        dir2 = -1
    }
}

document.addEventListener('keydown', event => {
    if (event.key == 'w') {
        elbowRotation = true
    }
})

document.addEventListener("keyup", event => {
    if (event.key == 'w') {
        elbowRotation = false;
    }
})