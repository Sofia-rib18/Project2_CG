import * as THREE from './libs/three.module.js'

let camera, scene, renderer
let baymax, head, shoulder1, elbow1, shoulder2, elbow2, bottom1, bottom2, knee1, knee2

window.onload = function init() {
    //criação da cena vazia que vai ter os elementos
    scene = new THREE.Scene()
    //criação da camera que vai definir para onde estamos a olhar
    // const aspect = window.innerWidth / window.innerHeight
    camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 1, 1000);
    // position the camera
    camera.position.x = 0;
    camera.position.z = 140;
    camera.position.y = 100;


    camera.lookAt(1, 1, 0) //aponta a camera para o centro da cena
    //criação do render: se um canvasnão tiver criado, vai criar um novo
    renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);


    // configure renderer clear color
    renderer.setClearColor("#e4e0ba");
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 600))

    document.body.appendChild(renderer.domElement)
    // listen to the screen: if the user resizes it we have to update the camera and the renderer size
    window.addEventListener('resize', handleWindowResize, false);

    //add objects
    createBaymax()


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
    head.rotation.y = 5
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

    // show axes for the SHOULDER CS
    let axesElbow = new THREE.AxesHelper(4);
    elbow1.add(axesElbow);


    /* FOREARM */
    let forearm1 = new THREE.Mesh(geometry, materialWhite);
    forearm1.position.x = 20
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


    baymax.scale.set(0.25, 0.25, 0.25);
    baymax.position.y = 40;

    console.log("Baymax created")
    scene.add(baymax);
}

function render() {

    renderer.render(scene, camera)
}