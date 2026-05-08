const scene = new THREE.Scene();
scene.fog = new THREE.Fog(0x050816, 500, 4000);

const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  10000
);

const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.shadowMap.enabled = true;
document.body.appendChild(renderer.domElement);

const ambient = new THREE.AmbientLight(0xffffff, 0.7);
scene.add(ambient);

const light = new THREE.DirectionalLight(0xffffff, 1);
light.position.set(100, 200, 100);
scene.add(light);

const floorGeo = new THREE.PlaneGeometry(5000, 5000, 100, 100);
const floorMat = new THREE.MeshStandardMaterial({
  color: 0x101820,
  wireframe: true
});

const floor = new THREE.Mesh(floorGeo, floorMat);
floor.rotation.x = -Math.PI / 2;
scene.add(floor);

let snakes = {};

function createSnake(id, color) {

  const group = new THREE.Group();

  const headGeo = new THREE.SphereGeometry(12, 16, 16);
  const headMat = new THREE.MeshStandardMaterial({ color });

  const head = new THREE.Mesh(headGeo, headMat);

  group.add(head);

  scene.add(group);

  snakes[id] = group;
}

function updateSnakes() {

  for (let id in serverPlayers) {

    const player = serverPlayers[id];

    if (!snakes[id]) {
      createSnake(id, player.color);
    }

    snakes[id].position.x = player.x;
    snakes[id].position.z = player.z;
animate();
