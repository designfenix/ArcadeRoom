import * as THREE from 'https://unpkg.com/three@0.165.0/build/three.module.js';
import Gameboy from 'https://cdn.skypack.dev/gameboy';

const app = document.getElementById('app');
const romInput = document.getElementById('romInput');
const startBtn = document.getElementById('startBtn');

const emuCanvas = document.createElement('canvas');
emuCanvas.width = 160;
emuCanvas.height = 144;
const emu = Gameboy({
  canvas: emuCanvas,
  scale: 1,
  gbBootRom: false,
  smoothScaling: false,
});

const scene = new THREE.Scene();
scene.background = new THREE.Color(0x0f1220);
const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 100);
camera.position.set(0, 0, 3.5);
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
app.appendChild(renderer.domElement);

const texture = new THREE.CanvasTexture(emuCanvas);
texture.minFilter = THREE.NearestFilter;
texture.magFilter = THREE.NearestFilter;

const screenMesh = new THREE.Mesh(
  new THREE.PlaneGeometry(2.8, 2.52),
  new THREE.MeshBasicMaterial({ map: texture }),
);
scene.add(screenMesh);

const frameMesh = new THREE.Mesh(
  new THREE.BoxGeometry(3.1, 2.8, 0.15),
  new THREE.MeshStandardMaterial({ color: 0x2f365e, metalness: 0.2, roughness: 0.7 }),
);
frameMesh.position.z = -0.1;
scene.add(frameMesh);
scene.add(new THREE.DirectionalLight(0xffffff, 1.2).position.set(1, 1, 2).clone());
scene.add(new THREE.AmbientLight(0xffffff, 0.4));

let running = false;
startBtn.addEventListener('click', async () => {
  const file = romInput.files?.[0];
  if (!file) return;

  const url = URL.createObjectURL(file);
  emu.stop();
  emu.loadRomFromFile(url, (err) => {
    if (err) {
      console.error(err);
      return;
    }
    emu.start();
    running = true;
  });
});

function animate() {
  requestAnimationFrame(animate);
  if (running) {
    texture.needsUpdate = true;
    screenMesh.rotation.y = Math.sin(performance.now() * 0.0007) * 0.05;
  }
  renderer.render(scene, camera);
}
animate();

window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});
