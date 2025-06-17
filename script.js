import * as THREE from 'https://unpkg.com/three@0.150.1/build/three.module.js';
import { GLTFLoader } from 'https://unpkg.com/three@0.150.1/examples/jsm/loaders/GLTFLoader.js';

const canvas = document.getElementById('gameCanvas');
const speedDisplay = document.getElementById('speed-display');

let scene, camera, renderer, car;
let mixer; // For animations if your car model has them

// Car movement variables
const keyState = {};
const carSpeed = 0.05;
const rotationSpeed = 0.03;
let currentSpeed = 0;
const acceleration = 0.001;
const braking = 0.002;
const friction = 0.0005;

init();
animate();

function init() {
    // Scene
    scene = new THREE.Scene();
    scene.background = new THREE.Color(0x87CEEB); // Sky blue background

    // Camera
    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.set(0, 5, 10); // Initial camera position (behind and above the car)
    camera.lookAt(0, 0, 0); // Look at the origin for now

    // Renderer
    renderer = new THREE.WebGLRenderer({ canvas: canvas, antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.shadowMap.enabled = true; // Enable shadow maps

    // Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.7); // Soft ambient light
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
    directionalLight.position.set(5, 10, 7.5);
    directionalLight.castShadow = true; // Enable shadow casting for the sun
    directionalLight.shadow.mapSize.width = 1024;
    directionalLight.shadow.mapSize.height = 1024;
    directionalLight.shadow.camera.near = 0.5;
    directionalLight.shadow.camera.far = 50;
    directionalLight.shadow.camera.left = -10;
    directionalLight.shadow.camera.right = 10;
    directionalLight.shadow.camera.top = 10;
    directionalLight.shadow.camera.bottom = -10;
    scene.add(directionalLight);

    // Ground Plane (simple green plane for now)
    const planeGeometry = new THREE.PlaneGeometry(100, 100);
    const planeMaterial = new THREE.MeshStandardMaterial({ color: 0x55AA55 });
    const groundPlane = new THREE.Mesh(planeGeometry, planeMaterial);
    groundPlane.rotation.x = -Math.PI / 2; // Rotate to be flat
    groundPlane.receiveShadow = true; // Allow it to receive shadows
    scene.add(groundPlane);

    // Load Car Model
    const loader = new GLTFLoader();
    // IMPORTANT: Replace 'path/to/your/car.glb' with the actual path to your car model
    loader.load(
        'path/to/your/car.glb', // e.g., 'models/ferrari.glb'
        function (gltf) {
            car = gltf.scene;
            car.scale.set(0.5, 0.5, 0.5); // Adjust scale as needed
            car.position.set(0, 0.5, 0); // Adjust vertical position to sit on the ground
            car.castShadow = true; // Allow the car to cast shadows
            car.receiveShadow = true; // Allow the car to receive shadows
            scene.add(car);

            // If your GLB model has animations, you can set them up here:
            // mixer = new THREE.AnimationMixer(car);
            // gltf.animations.forEach((clip) => {
            //     mixer.clipAction(clip).play();
            // });

            console.log("Car loaded:", car);
        },
        function (xhr) {
            console.log((xhr.loaded / xhr.total * 100) + '% loaded');
        },
        function (error) {
            console.error('An error occurred while loading the car model:', error);
        }
    );

    // Event Listeners for keyboard input
    window.addEventListener('keydown', (event) => {
        keyState[event.code] = true;
    });
    window.addEventListener('keyup', (event) => {
        keyState[event.code] = false;
    });

    // Handle window resizing
    window.addEventListener('resize', onWindowResize);
}

function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}

function animate() {
    requestAnimationFrame(animate);

    const delta = 0.016; // Simulate a fixed time step (approx 60 FPS)

    if (car) {
        // Car Movement Logic
        if (keyState['ArrowUp'] || keyState['KeyW']) {
            currentSpeed = Math.min(currentSpeed + acceleration, carSpeed);
        } else if (keyState['ArrowDown'] || keyState['KeyS']) {
            currentSpeed = Math.max(currentSpeed - braking, -carSpeed / 2); // Allow reverse
        } else {
            // Apply friction if no movement keys are pressed
            if (currentSpeed > 0) {
                currentSpeed = Math.max(0, currentSpeed - friction);
            } else if (currentSpeed < 0) {
                currentSpeed = Math.min(0, currentSpeed + friction);
            }
        }

        // Update car position based on current speed and direction
        car.translateZ(currentSpeed); // Moves along its local Z-axis

        // Rotation
        if (currentSpeed !== 0) { // Only rotate if moving
            if (keyState['ArrowLeft'] || keyState['KeyA']) {
                car.rotation.y += rotationSpeed * (currentSpeed > 0 ? 1 : -1); // Reverse steering for reverse movement
            }
            if (keyState['ArrowRight'] || keyState['KeyD']) {
                car.rotation.y -= rotationSpeed * (currentSpeed > 0 ? 1 : -1); // Reverse steering for reverse movement
            }
        }

        // Camera follow logic
        const cameraOffset = new THREE.Vector3(0, 5, 10); // Offset from the car's position
        cameraOffset.applyQuaternion(car.quaternion); // Apply car's rotation to the offset
        camera.position.copy(car.position).add(cameraOffset);
        camera.lookAt(car.position);

        // Update speed display
        const displaySpeed = Math.abs(currentSpeed * 1000).toFixed(1); // Scale for a more realistic km/h
        speedDisplay.textContent = `Speed: ${displaySpeed} KM/H`;

        // Update animations if any
        if (mixer) {
            mixer.update(delta);
        }
    }

    renderer.render(scene, camera);
}
