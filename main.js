import * as THREE from 'three';

// --- Sound System (Web Audio API - procedural, no files needed) ---
const audioCtx = new (window.AudioContext || window.webkitAudioContext)();

function playSound(type) {
    if (audioCtx.state === 'suspended') audioCtx.resume();
    const now = audioCtx.currentTime;
    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();
    osc.connect(gain);
    gain.connect(audioCtx.destination);

    switch (type) {
        case 'place':
            osc.type = 'square';
            osc.frequency.setValueAtTime(440, now);
            osc.frequency.exponentialRampToValueAtTime(880, now + 0.05);
            gain.gain.setValueAtTime(0.15, now);
            gain.gain.exponentialRampToValueAtTime(0.001, now + 0.1);
            osc.start(now); osc.stop(now + 0.1);
            break;
        case 'archer':
            osc.type = 'sawtooth';
            osc.frequency.setValueAtTime(800, now);
            osc.frequency.exponentialRampToValueAtTime(200, now + 0.08);
            gain.gain.setValueAtTime(0.08, now);
            gain.gain.exponentialRampToValueAtTime(0.001, now + 0.08);
            osc.start(now); osc.stop(now + 0.08);
            break;
        case 'crossbow':
            osc.type = 'square';
            osc.frequency.setValueAtTime(600, now);
            osc.frequency.exponentialRampToValueAtTime(100, now + 0.12);
            gain.gain.setValueAtTime(0.1, now);
            gain.gain.exponentialRampToValueAtTime(0.001, now + 0.12);
            osc.start(now); osc.stop(now + 0.12);
            break;
        case 'ballista':
            osc.type = 'sawtooth';
            osc.frequency.setValueAtTime(200, now);
            osc.frequency.exponentialRampToValueAtTime(50, now + 0.2);
            gain.gain.setValueAtTime(0.12, now);
            gain.gain.exponentialRampToValueAtTime(0.001, now + 0.2);
            osc.start(now); osc.stop(now + 0.2);
            break;
        case 'mage':
            osc.type = 'sine';
            osc.frequency.setValueAtTime(1200, now);
            osc.frequency.exponentialRampToValueAtTime(400, now + 0.15);
            gain.gain.setValueAtTime(0.1, now);
            gain.gain.exponentialRampToValueAtTime(0.001, now + 0.15);
            osc.start(now); osc.stop(now + 0.15);
            break;
        case 'skycannon':
            osc.type = 'square';
            osc.frequency.setValueAtTime(300, now);
            osc.frequency.exponentialRampToValueAtTime(100, now + 0.25);
            gain.gain.setValueAtTime(0.12, now);
            gain.gain.exponentialRampToValueAtTime(0.001, now + 0.25);
            osc.start(now); osc.stop(now + 0.25);
            break;
        case 'hit':
            osc.type = 'square';
            osc.frequency.setValueAtTime(150, now);
            osc.frequency.exponentialRampToValueAtTime(50, now + 0.1);
            gain.gain.setValueAtTime(0.1, now);
            gain.gain.exponentialRampToValueAtTime(0.001, now + 0.1);
            osc.start(now); osc.stop(now + 0.1);
            break;
        case 'enemyDeath':
            osc.type = 'sawtooth';
            osc.frequency.setValueAtTime(400, now);
            osc.frequency.exponentialRampToValueAtTime(80, now + 0.2);
            gain.gain.setValueAtTime(0.12, now);
            gain.gain.exponentialRampToValueAtTime(0.001, now + 0.2);
            osc.start(now); osc.stop(now + 0.2);
            break;
        case 'dragonFire':
            osc.type = 'sawtooth';
            osc.frequency.setValueAtTime(100, now);
            osc.frequency.exponentialRampToValueAtTime(30, now + 0.4);
            gain.gain.setValueAtTime(0.15, now);
            gain.gain.exponentialRampToValueAtTime(0.001, now + 0.4);
            osc.start(now); osc.stop(now + 0.4);
            break;
        case 'dragonHit':
            osc.type = 'square';
            osc.frequency.setValueAtTime(80, now);
            osc.frequency.exponentialRampToValueAtTime(20, now + 0.3);
            gain.gain.setValueAtTime(0.15, now);
            gain.gain.exponentialRampToValueAtTime(0.001, now + 0.3);
            osc.start(now); osc.stop(now + 0.3);
            break;
        case 'waveStart':
            osc.type = 'sine';
            osc.frequency.setValueAtTime(440, now);
            osc.frequency.setValueAtTime(554, now + 0.1);
            osc.frequency.setValueAtTime(659, now + 0.2);
            gain.gain.setValueAtTime(0.12, now);
            gain.gain.exponentialRampToValueAtTime(0.001, now + 0.4);
            osc.start(now); osc.stop(now + 0.4);
            break;
        case 'gameOver':
            osc.type = 'sawtooth';
            osc.frequency.setValueAtTime(440, now);
            osc.frequency.exponentialRampToValueAtTime(110, now + 0.5);
            gain.gain.setValueAtTime(0.15, now);
            gain.gain.exponentialRampToValueAtTime(0.001, now + 0.6);
            osc.start(now); osc.stop(now + 0.6);
            break;
        case 'click':
            osc.type = 'sine';
            osc.frequency.setValueAtTime(800, now);
            gain.gain.setValueAtTime(0.08, now);
            gain.gain.exponentialRampToValueAtTime(0.001, now + 0.03);
            osc.start(now); osc.stop(now + 0.03);
            break;
        case 'gold':
            osc.type = 'sine';
            osc.frequency.setValueAtTime(1200, now);
            osc.frequency.setValueAtTime(1500, now + 0.05);
            gain.gain.setValueAtTime(0.08, now);
            gain.gain.exponentialRampToValueAtTime(0.001, now + 0.1);
            osc.start(now); osc.stop(now + 0.1);
            break;
        case 'castleHit':
            osc.type = 'square';
            osc.frequency.setValueAtTime(60, now);
            osc.frequency.exponentialRampToValueAtTime(20, now + 0.5);
            gain.gain.setValueAtTime(0.2, now);
            gain.gain.exponentialRampToValueAtTime(0.001, now + 0.5);
            osc.start(now); osc.stop(now + 0.5);
            break;
        case 'skeletonArrow':
            osc.type = 'triangle';
            osc.frequency.setValueAtTime(1000, now);
            osc.frequency.exponentialRampToValueAtTime(500, now + 0.06);
            gain.gain.setValueAtTime(0.06, now);
            gain.gain.exponentialRampToValueAtTime(0.001, now + 0.06);
            osc.start(now); osc.stop(now + 0.06);
            break;
        case 'wizardSpell':
            osc.type = 'sine';
            osc.frequency.setValueAtTime(600, now);
            osc.frequency.exponentialRampToValueAtTime(200, now + 0.3);
            gain.gain.setValueAtTime(0.1, now);
            gain.gain.exponentialRampToValueAtTime(0.001, now + 0.3);
            osc.start(now); osc.stop(now + 0.3);
            break;
    }
}

// --- Wave Start Musical Sting ---
function playWaveSting() {
    if (audioCtx.state === 'suspended') audioCtx.resume();
    const now = audioCtx.currentTime;
    const notes = [261.63, 329.63, 392.00, 523.25];
    notes.forEach((freq, i) => {
        const osc = audioCtx.createOscillator();
        const gain = audioCtx.createGain();
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(freq, now + i * 0.1);
        gain.gain.setValueAtTime(0.06, now + i * 0.1);
        gain.gain.exponentialRampToValueAtTime(0.001, now + i * 0.1 + 0.25);
        osc.connect(gain);
        gain.connect(audioCtx.destination);
        osc.start(now + i * 0.1);
        osc.stop(now + i * 0.1 + 0.25);
    });
}

// --- Game Constants ---
const GRID_SIZE = 80;
const CELL_SIZE = 1;

// --- Game State ---
const gameState = {
    gold: 100,
    lives: 20,
    wave: 1,
    isWaveActive: false,
    enemiesRemainingToSpawn: 0,
    spawnTimer: 0,
    spawnInterval: 1.0,
    isStarted: false,
    isPaused: false,
    castleHP: 1000,
    castleMaxHP: 1000
};

// Camera control state
const cameraState = {
    target: new THREE.Vector3(40, 0, 40),
    radius: 80,
    yaw: 0,
    pitch: Math.PI / 3.5,
    speed: 30,
    rotSpeed: 1.5,
    tiltSpeed: 1.0
};

// Extended winding path
const waypoints = [
    new THREE.Vector3(0, 0, 50),
    new THREE.Vector3(10, 0, 50),
    new THREE.Vector3(10, 0, 30),
    new THREE.Vector3(25, 0, 30),
    new THREE.Vector3(25, 0, 55),
    new THREE.Vector3(40, 0, 55),
    new THREE.Vector3(40, 0, 20),
    new THREE.Vector3(55, 0, 20),
    new THREE.Vector3(55, 0, 60),
    new THREE.Vector3(65, 0, 60),
    new THREE.Vector3(65, 0, 35),
    new THREE.Vector3(72, 0, 35),
    new THREE.Vector3(72, 0, 50),
    new THREE.Vector3(79, 0, 50)
];

// --- Materials ---
const materials = {
    grass: new THREE.MeshLambertMaterial({ color: 0x567d46 }),
    path: new THREE.MeshLambertMaterial({ color: 0x8d6e63 }),
    water: new THREE.MeshLambertMaterial({ color: 0x2196f3, transparent: true, opacity: 0.75 }),
    wood: new THREE.MeshLambertMaterial({ color: 0x4e342e }),
    stone: new THREE.MeshLambertMaterial({ color: 0x757575 }),
    castle: new THREE.MeshLambertMaterial({ color: 0x9e9e9e }),
    planks: new THREE.MeshLambertMaterial({ color: 0x8d6e63 }),
    roof: new THREE.MeshLambertMaterial({ color: 0x8b0000 }),
    leaves: new THREE.MeshLambertMaterial({ color: 0x2e7d32 }),
    red: new THREE.MeshLambertMaterial({ color: 0xd32f2f }),
    white: new THREE.MeshLambertMaterial({ color: 0xf5f5f5 }),
    green: new THREE.MeshLambertMaterial({ color: 0x4caf50 }),
    purple: new THREE.MeshLambertMaterial({ color: 0x9c27b0 }),
    black: new THREE.MeshLambertMaterial({ color: 0x212121 }),
    skin: new THREE.MeshLambertMaterial({ color: 0xffcc80 }),
    blue: new THREE.MeshLambertMaterial({ color: 0x1976d2 }),
    yellow: new THREE.MeshLambertMaterial({ color: 0xfdd835 }),
    orange: new THREE.MeshLambertMaterial({ color: 0xff9800 })
};

// --- Scene Setup ---
const scene = new THREE.Scene();
scene.background = new THREE.Color(0x87CEEB);
scene.fog = new THREE.Fog(0x87CEEB, 80, 200);

const camera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 0.1, 500);
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;
document.body.appendChild(renderer.domElement);

function updateCamera() {
    const r = cameraState.radius;
    const cosPitch = Math.cos(cameraState.pitch);
    const sinPitch = Math.sin(cameraState.pitch);
    const cosYaw = Math.cos(cameraState.yaw);
    const sinYaw = Math.sin(cameraState.yaw);
    camera.position.x = cameraState.target.x + r * cosPitch * sinYaw;
    camera.position.y = cameraState.target.y + r * sinPitch;
    camera.position.z = cameraState.target.z + r * cosPitch * cosYaw;
    camera.lookAt(cameraState.target);
}
updateCamera();

// --- Lighting ---
const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
scene.add(ambientLight);
const dirLight = new THREE.DirectionalLight(0xfff5e6, 0.9);
dirLight.position.set(50, 100, 50);
dirLight.castShadow = true;
dirLight.shadow.mapSize.set(2048, 2048);
dirLight.shadow.camera.left = -80;
dirLight.shadow.camera.right = 80;
dirLight.shadow.camera.top = 80;
dirLight.shadow.camera.bottom = -80;
scene.add(dirLight);

// --- Grid & World Generation ---
const gridData = new Uint8Array(GRID_SIZE * GRID_SIZE);
const geometry = new THREE.BoxGeometry(CELL_SIZE, CELL_SIZE, CELL_SIZE);
geometry.translate(0, 0.5, 0);

const grassMesh = new THREE.InstancedMesh(geometry, materials.grass, GRID_SIZE * GRID_SIZE);
grassMesh.count = 0; grassMesh.receiveShadow = true; scene.add(grassMesh);
const pathMesh = new THREE.InstancedMesh(geometry, materials.path, GRID_SIZE * GRID_SIZE);
pathMesh.count = 0; pathMesh.receiveShadow = true; scene.add(pathMesh);
const waterMesh = new THREE.InstancedMesh(geometry, materials.water, GRID_SIZE * GRID_SIZE);
waterMesh.count = 0; scene.add(waterMesh);
const dummy = new THREE.Object3D();

function isPath(x, z) {
    for (let i = 0; i < waypoints.length - 1; i++) {
        const p1 = waypoints[i], p2 = waypoints[i + 1];
        if (x >= Math.min(p1.x, p2.x) - 0.5 && x <= Math.max(p1.x, p2.x) + 0.5 &&
            z >= Math.min(p1.z, p2.z) - 0.5 && z <= Math.max(p1.z, p2.z) + 0.5) return true;
    }
    return false;
}

function isRiver(x, z) {
    const riverZ = 15 + Math.sin(x * 0.06) * 4;
    return Math.abs(z - riverZ) < 1.5;
}

for (let x = 0; x < GRID_SIZE; x++) {
    for (let z = 0; z < GRID_SIZE; z++) {
        dummy.position.set(x, 0, z);
        dummy.scale.set(1, 1, 1);
        dummy.updateMatrix();
        if (isPath(x, z)) {
            if (isRiver(x, z)) {
                gridData[x + z * GRID_SIZE] = 3;
                dummy.position.y = 0;
                dummy.updateMatrix();
                pathMesh.setMatrixAt(pathMesh.count++, dummy.matrix);
            } else {
                gridData[x + z * GRID_SIZE] = 1;
                pathMesh.setMatrixAt(pathMesh.count++, dummy.matrix);
            }
        } else if (isRiver(x, z)) {
            gridData[x + z * GRID_SIZE] = 2;
            dummy.scale.set(1, 0.6, 1);
            dummy.position.y = -0.2;
            dummy.updateMatrix();
            waterMesh.setMatrixAt(waterMesh.count++, dummy.matrix);
        } else {
            grassMesh.setMatrixAt(grassMesh.count++, dummy.matrix);
        }
    }
}
[grassMesh, pathMesh, waterMesh].forEach(m => m.instanceMatrix.needsUpdate = true);

// --- Scenery: Castle ---
const castleGroup = new THREE.Group();
function addBlockToGroup(group, x, y, z, type) {
    const mesh = new THREE.Mesh(new THREE.BoxGeometry(1, 1, 1), materials[type]);
    mesh.position.set(x, y, z);
    mesh.castShadow = true;
    mesh.receiveShadow = true;
    group.add(mesh);
}
function addBlock(x, y, z, type) {
    const mesh = new THREE.Mesh(new THREE.BoxGeometry(1, 1, 1), materials[type]);
    mesh.position.set(x, y, z);
    mesh.castShadow = true;
    mesh.receiveShadow = true;
    scene.add(mesh);
}

for(let x = 72; x <= 79; x++) {
    for(let z = 44; z <= 56; z++) {
        addBlockToGroup(castleGroup, x, 1, z, 'castle');
    }
}
for (let y = 2; y <= 5; y++) {
    for(let x = 72; x <= 79; x++) {
        addBlockToGroup(castleGroup, x, y, 44, 'castle');
        addBlockToGroup(castleGroup, x, y, 56, 'castle');
    }
    for(let z = 44; z <= 56; z++) {
        addBlockToGroup(castleGroup, 72, y, z, 'castle');
        addBlockToGroup(castleGroup, 79, y, z, 'castle');
    }
}
for(let y = 6; y <= 8; y++) {
    addBlockToGroup(castleGroup, 72, y, 44, 'castle'); addBlockToGroup(castleGroup, 79, y, 44, 'castle');
    addBlockToGroup(castleGroup, 72, y, 56, 'castle'); addBlockToGroup(castleGroup, 79, y, 56, 'castle');
}
for(let x = 74; x <= 77; x++) {
    for(let z = 48; z <= 52; z++) {
        for(let y = 2; y <= 6; y++) {
            if(x === 74 || x === 77 || z === 48 || z === 52 || y === 6) {
                addBlockToGroup(castleGroup, x, y, z, 'castle');
            }
        }
    }
}
addBlockToGroup(castleGroup, 75, 9, 50, 'wood');
addBlockToGroup(castleGroup, 75, 10, 50, 'red');
scene.add(castleGroup);

// Castle health bar
const castleHpBg = new THREE.Mesh(
    new THREE.PlaneGeometry(8, 0.4),
    new THREE.MeshBasicMaterial({ color: 0x222222, side: THREE.DoubleSide, depthTest: false })
);
castleHpBg.position.set(75.5, 12, 50); castleHpBg.renderOrder = 999; scene.add(castleHpBg);
const castleHpBar = new THREE.Mesh(
    new THREE.PlaneGeometry(7.6, 0.3),
    new THREE.MeshBasicMaterial({ color: 0x4caf50, side: THREE.DoubleSide, depthTest: false })
);
castleHpBar.position.set(75.5, 12, 50.01); castleHpBar.renderOrder = 1000; scene.add(castleHpBar);

// --- Scenery: Town Houses ---
function buildHouse(hx, hz) {
    for(let y = 1; y <= 3; y++) {
        for(let x = 0; x <= 2; x++) {
            for(let z = 0; z <= 2; z++) {
                if(x === 0 || x === 2 || z === 0 || z === 2 || y === 3) {
                    addBlock(hx + x, y, hz + z, 'planks');
                }
            }
        }
    }
    addBlock(hx + 1, 1, hz, 'wood');
    addBlock(hx, 4, hz, 'roof');
    addBlock(hx + 2, 4, hz, 'roof');
    addBlock(hx, 4, hz + 2, 'roof');
    addBlock(hx + 2, 4, hz + 2, 'roof');
    addBlock(hx + 1, 4, hz + 1, 'roof');
    addBlock(hx + 1, 5, hz + 1, 'roof');
}
buildHouse(4, 62);
buildHouse(8, 65);
buildHouse(5, 68);
buildHouse(9, 70);

// --- Scenery: Trees ---
for (let i = 0; i < 120; i++) {
    const tx = Math.floor(Math.random() * GRID_SIZE);
    const tz = Math.floor(Math.random() * GRID_SIZE);
    if (gridData[tx + tz * GRID_SIZE] !== 0) continue;
    let blocked = false;
    for (let wp of waypoints) {
        if (Math.abs(tx - wp.x) < 4 && Math.abs(tz - wp.z) < 4) { blocked = true; break; }
    }
    if (tx >= 70 && tx <= 80 && tz >= 42 && tz <= 58) blocked = true;
    if (tx >= 2 && tx <= 12 && tz >= 60 && tz <= 74) blocked = true;
    if (!blocked) {
        for(let y = 0; y < 2; y++) addBlock(tx, y + 0.5, tz, 'wood');
        for(let x = -1; x <= 1; x++) {
            for(let z = -1; z <= 1; z++) {
                for(let y = 2; y <= 3; y++) {
                    if (Math.abs(x) + Math.abs(z) + Math.abs(y - 2) <= 2) {
                        addBlock(tx + x, y + 0.5, tz + z, 'leaves');
                    }
                }
            }
        }
        addBlock(tx, 4.5, tz, 'leaves');
    }
}

// --- Tower Definitions ---
const towerTypes = [
    { name: 'Archer', cost: 25, range: 15, damage: 8, fireRate: 0.8, color: 0x8d6e63, projectileSpeed: 30, health: 50, antiDragon: false },
    { name: 'Crossbow', cost: 100, range: 18, damage: 30, fireRate: 2.0, color: 0x757575, projectileSpeed: 35, splash: false, health: 80, antiDragon: false },
    { name: 'Ballista', cost: 300, range: 25, damage: 80, fireRate: 2.5, color: 0x4e342e, projectileSpeed: 50, health: 100, antiDragon: false },
    { name: 'Mage', cost: 500, range: 20, damage: 15, fireRate: 0.5, color: 0x9c27b0, projectileSpeed: 20, slow: true, health: 60, antiDragon: false },
    { name: 'Sky Cannon', cost: 1500, range: 30, damage: 25, fireRate: 1.5, color: 0x00bcd4, projectileSpeed: 40, health: 70, antiDragon: true, level: 1 },
    { name: 'Sky Cannon+', cost: 3000, range: 35, damage: 50, fireRate: 1.2, color: 0x0097a7, projectileSpeed: 45, health: 100, antiDragon: true, level: 2 }
];
let selectedTowerIndex = 0;

// --- Entities ---
const towers = [];
const enemies = [];
const projectiles = [];

// --- Keyboard ---
const keys = {};
window.addEventListener('keydown', (e) => {
    keys[e.code] = true;
    if (e.code === 'Digit1') { selectedTowerIndex = 0; updateUI(); }
    if (e.code === 'Digit2') { selectedTowerIndex = 1; updateUI(); }
    if (e.code === 'Digit3') { selectedTowerIndex = 2; updateUI(); }
    if (e.code === 'Digit4') { selectedTowerIndex = 3; updateUI(); }
    if (e.code === 'Digit5') { selectedTowerIndex = 4; updateUI(); }
    if (e.code === 'Digit6') { selectedTowerIndex = 5; updateUI(); }
});
window.addEventListener('keyup', (e) => { keys[e.code] = false; });

function handleCameraMovement(delta) {
    const moveSpeed = cameraState.speed * delta;
    const rotSpeed = cameraState.rotSpeed * delta;
    const tiltSpeed = cameraState.tiltSpeed * delta;
    const forwardX = -Math.sin(cameraState.yaw);
    const forwardZ = -Math.cos(cameraState.yaw);
    const rightX = Math.cos(cameraState.yaw);
    const rightZ = -Math.sin(cameraState.yaw);
    if (keys['KeyW']) { cameraState.target.x += forwardX * moveSpeed; cameraState.target.z += forwardZ * moveSpeed; }
    if (keys['KeyS']) { cameraState.target.x -= forwardX * moveSpeed; cameraState.target.z -= forwardZ * moveSpeed; }
    if (keys['KeyA']) { cameraState.target.x -= rightX * moveSpeed; cameraState.target.z -= rightZ * moveSpeed; }
    if (keys['KeyD']) { cameraState.target.x += rightX * moveSpeed; cameraState.target.z += rightZ * moveSpeed; }
    if (keys['KeyQ']) cameraState.yaw -= rotSpeed;
    if (keys['KeyE']) cameraState.yaw += rotSpeed;
    if (keys['KeyR']) cameraState.pitch = Math.min(Math.PI / 2 - 0.05, cameraState.pitch + tiltSpeed);
    if (keys['KeyF']) cameraState.pitch = Math.max(0.1, cameraState.pitch - tiltSpeed);
    cameraState.target.x = Math.max(2, Math.min(GRID_SIZE - 2, cameraState.target.x));
    cameraState.target.z = Math.max(2, Math.min(GRID_SIZE - 2, cameraState.target.z));
    updateCamera();
}

// --- UI ---
const uiContainer = document.createElement('div');
uiContainer.style.cssText = 'position:absolute; top:10px; left:10px; color:white; background:rgba(0,0,0,0.7); padding:15px; border-radius:8px; font-family:sans-serif; font-size:14px; pointer-events:none; line-height:1.6; display:none; z-index:101;';
document.body.appendChild(uiContainer);
const towerBar = document.createElement('div');
towerBar.style.cssText = 'position:absolute; bottom:20px; left:50%; transform:translateX(-50%); display:none; gap:8px; pointer-events:auto; z-index:101;';
document.body.appendChild(towerBar);
const splashScreen = document.getElementById('splash-screen');
const pauseScreen = document.getElementById('pause-screen');

function resetGame() {
    for (const enemy of enemies) scene.remove(enemy.mesh);
    enemies.length = 0;
    for (const tower of towers) scene.remove(tower.mesh);
    towers.length = 0;
    for (const p of projectiles) scene.remove(p.mesh);
    projectiles.length = 0;
    gameState.gold = 100;
    gameState.lives = 20;
    gameState.wave = 1;
    gameState.isWaveActive = false;
    gameState.enemiesRemainingToSpawn = 0;
    gameState.spawnTimer = 0;
    gameState.isStarted = true;
    gameState.isPaused = false;
    gameState.castleHP = gameState.castleMaxHP;
    updateUI();
}

splashScreen.addEventListener('click', () => {
    resetGame();
    splashScreen.style.display = 'none';
    uiContainer.style.display = 'block';
    towerBar.style.display = 'flex';
    playSound('click');
});
window.addEventListener('blur', () => {
    if (gameState.isStarted && !gameState.isPaused) { gameState.isPaused = true; pauseScreen.style.display = 'flex'; }
});
pauseScreen.addEventListener('click', () => { gameState.isPaused = false; pauseScreen.style.display = 'none'; playSound('click'); });

function updateUI() {
    uiContainer.innerHTML = `<strong>Voxel Defender</strong><br>❤️ Lives: <span style="color:#ff5252">${gameState.lives}</span> | 💰 Gold: <span style="color:#ffd700">${gameState.gold}</span> |  Wave: ${gameState.wave}<br> Castle: <span style="color:#4caf50">${Math.ceil(gameState.castleHP)}</span>/${gameState.castleMaxHP}<br><small>WASD:Move Q/E:Rotate R/F:Tilt Scroll:Zoom Click:Place 1-6:Select</small>`;
    towerBar.innerHTML = '';
    towerTypes.forEach((t, i) => {
        const btn = document.createElement('div');
        const isSelected = i === selectedTowerIndex;
        const canAfford = gameState.gold >= t.cost;
        const isAntiDragon = t.antiDragon;
        btn.style.cssText = `width:80px; height:80px; border:3px solid ${isSelected ? '#ffffff' : (canAfford ? '#888888' : '#ff0000')}; background:${canAfford ? '#'+t.color.toString(16).padStart(6,'0') : '#333333'}; border-radius:8px; display:flex; flex-direction:column; align-items:center; justify-content:center; cursor:${canAfford ? 'pointer' : 'not-allowed'}; color:white; font-weight:bold; font-family:sans-serif; font-size:10px; text-shadow: 1px 1px 2px black; ${isAntiDragon ? 'border-style: dashed;' : ''}`;
        btn.innerHTML = `<span>${t.name}</span><span style="font-size:9px; margin-top:2px;">${t.cost}g</span>${isAntiDragon ? '<span style="font-size:8px; color:#ffeb3b;"></span>' : ''}`;
        btn.onclick = () => { if (canAfford) { selectedTowerIndex = i; updateUI(); playSound('click'); } };
        towerBar.appendChild(btn);
    });
}
updateUI();

// --- Interaction ---
const raycaster = new THREE.Raycaster();
const mouse = new THREE.Vector2();
const previewMesh = new THREE.Mesh(
    new THREE.BoxGeometry(CELL_SIZE, 2, CELL_SIZE),
    new THREE.MeshBasicMaterial({ color: 0xffffff, transparent: true, opacity: 0.5 })
);
scene.add(previewMesh);
previewMesh.visible = false;

function isAdjacentToPath(gx, gz) {
    for (let dx = -1; dx <= 1; dx++) {
        for (let dz = -1; dz <= 1; dz++) {
            if (dx === 0 && dz === 0) continue;
            const nx = gx + dx, nz = gz + dz;
            if (nx >= 0 && nx < GRID_SIZE && nz >= 0 && nz < GRID_SIZE) {
                if (gridData[nx + nz * GRID_SIZE] === 1 || gridData[nx + nz * GRID_SIZE] === 3) return true;
            }
        }
    }
    return false;
}

window.addEventListener('mousemove', (e) => {
    mouse.x = (e.clientX / window.innerWidth) * 2 - 1;
    mouse.y = -(e.clientY / window.innerHeight) * 2 + 1;
    raycaster.setFromCamera(mouse, camera);
    const intersects = raycaster.intersectObjects([grassMesh, pathMesh]);
    if (intersects.length > 0) {
        const pt = intersects[0].point;
        const gx = Math.round(pt.x);
        const gz = Math.round(pt.z);
        if (gx >= 0 && gx < GRID_SIZE && gz >= 0 && gz < GRID_SIZE) {
            previewMesh.position.set(gx, 1, gz);
            const isPathCell = gridData[gx + gz * GRID_SIZE] === 1 || gridData[gx + gz * GRID_SIZE] === 2 || gridData[gx + gz * GRID_SIZE] === 3;
            const occupied = towers.some(t => Math.round(t.mesh.position.x) === gx && Math.round(t.mesh.position.z) === gz);
            const isCastle = (gx >= 70 && gx <= 80 && gz >= 42 && gz <= 58);
            const isTown = (gx >= 2 && gx <= 12 && gz >= 60 && gz <= 74);
            const towerType = towerTypes[selectedTowerIndex];
            let canBuild = !isPathCell && !occupied && !isCastle && !isTown && gameState.gold >= towerType.cost;
            if (canBuild && !towerType.antiDragon) {
                canBuild = isAdjacentToPath(gx, gz);
            }
            previewMesh.material.color.setHex(canBuild ? 0x00ff00 : 0xff0000);
            previewMesh.visible = true;
            return;
        }
    }
    previewMesh.visible = false;
});

window.addEventListener('mousedown', (e) => {
    if (!gameState.isStarted || gameState.isPaused) return;
    if (e.button === 0 && previewMesh.visible && previewMesh.material.color.getHex() === 0x00ff00) {
        const gx = Math.round(previewMesh.position.x);
        const gz = Math.round(previewMesh.position.z);
        const type = towerTypes[selectedTowerIndex];
        gameState.gold -= type.cost;
        updateUI();
        const towerGroup = new THREE.Group();
        towerGroup.position.set(gx, 0, gz);

        if (selectedTowerIndex === 0) {
            const base = new THREE.Mesh(new THREE.BoxGeometry(0.9, 0.3, 0.9), new THREE.MeshLambertMaterial({ color: 0x9e9e9e }));
            base.position.y = 1.15; base.castShadow = true; towerGroup.add(base);
            const postGeo = new THREE.BoxGeometry(0.12, 1.2, 0.12);
            const postMat = new THREE.MeshLambertMaterial({ color: 0x5d4037 });
            [[-0.35, 1.75, -0.35], [0.35, 1.75, -0.35], [-0.35, 1.75, 0.35], [0.35, 1.75, 0.35]].forEach(pos => {
                const post = new THREE.Mesh(postGeo, postMat); post.position.set(pos[0], pos[1], pos[2]); post.castShadow = true; towerGroup.add(post);
            });
            const floor = new THREE.Mesh(new THREE.BoxGeometry(0.85, 0.08, 0.85), new THREE.MeshLambertMaterial({ color: 0x8d6e63 }));
            floor.position.y = 2.35; towerGroup.add(floor);
            const roof = new THREE.Mesh(new THREE.BoxGeometry(1.0, 0.08, 1.0), new THREE.MeshLambertMaterial({ color: 0x8b0000 }));
            roof.position.y = 2.85; roof.castShadow = true; towerGroup.add(roof);
            const vBody = new THREE.Mesh(new THREE.BoxGeometry(0.25, 0.35, 0.2), new THREE.MeshLambertMaterial({ color: 0x1976d2 }));
            vBody.position.set(0, 2.6, 0.1); towerGroup.add(vBody);
            const vHead = new THREE.Mesh(new THREE.BoxGeometry(0.2, 0.2, 0.2), new THREE.MeshLambertMaterial({ color: 0xffcc80 }));
            vHead.position.set(0, 2.85, 0.1); towerGroup.add(vHead);
        } else if (selectedTowerIndex === 1) {
            const base = new THREE.Mesh(new THREE.BoxGeometry(1.2, 0.6, 1.2), new THREE.MeshStandardMaterial({ color: 0x8d6e63 }));
            base.position.y = 1.3; base.castShadow = true; towerGroup.add(base);
            const pillarGeo = new THREE.BoxGeometry(0.2, 1.2, 0.2);
            const pillarMat = new THREE.MeshStandardMaterial({ color: 0x5d4037 });
            [[-0.45, 1.6, -0.45], [0.45, 1.6, -0.45], [-0.45, 1.6, 0.45], [0.45, 1.6, 0.45]].forEach(pos => {
                const pillar = new THREE.Mesh(pillarGeo, pillarMat); pillar.position.set(pos[0], pos[1], pos[2]); pillar.castShadow = true; towerGroup.add(pillar);
            });
            const floor = new THREE.Mesh(new THREE.BoxGeometry(1.1, 0.15, 1.1), new THREE.MeshStandardMaterial({ color: 0x795548 }));
            floor.position.y = 2.25; floor.castShadow = true; towerGroup.add(floor);
            const roof = new THREE.Mesh(new THREE.BoxGeometry(1.3, 0.1, 1.3), new THREE.MeshStandardMaterial({ color: 0xb71c1c }));
            roof.position.y = 2.9; roof.castShadow = true; towerGroup.add(roof);
            const flag = new THREE.Mesh(new THREE.BoxGeometry(0.4, 0.3, 0.05), new THREE.MeshStandardMaterial({ color: 0xffeb3b, emissive: 0xffeb3b, emissiveIntensity: 0.5 }));
            flag.position.set(0.7, 3.35, -0.5); towerGroup.add(flag);
        } else if (selectedTowerIndex === 2) {
            const base = new THREE.Mesh(new THREE.BoxGeometry(0.9, 0.2, 0.9), new THREE.MeshLambertMaterial({ color: 0x5d4037 }));
            base.position.y = 1.1; base.castShadow = true; towerGroup.add(base);
            const frameGeo = new THREE.BoxGeometry(0.1, 1.8, 0.1);
            const frameMat = new THREE.MeshLambertMaterial({ color: 0x4e342e });
            [[-0.35, 2.0, -0.35], [0.35, 2.0, -0.35], [-0.35, 2.0, 0.35], [0.35, 2.0, 0.35]].forEach(pos => {
                const post = new THREE.Mesh(frameGeo, frameMat); post.position.set(pos[0], pos[1], pos[2]); post.castShadow = true; towerGroup.add(post);
            });
            const bolt = new THREE.Mesh(new THREE.BoxGeometry(0.06, 0.06, 0.8), new THREE.MeshLambertMaterial({ color: 0x8d6e63 }));
            bolt.position.set(0, 2.3, 0.6); bolt.rotation.x = 0.1; towerGroup.add(bolt);
        } else if (selectedTowerIndex === 3) {
            const baseGeo = new THREE.CylinderGeometry(0.45, 0.5, 1.5, 8);
            const base = new THREE.Mesh(baseGeo, new THREE.MeshLambertMaterial({ color: 0x616161 }));
            base.position.y = 1.75; base.castShadow = true; towerGroup.add(base);
            const top = new THREE.Mesh(new THREE.CylinderGeometry(0.5, 0.45, 0.15, 8), new THREE.MeshLambertMaterial({ color: 0x757575 }));
            top.position.y = 2.55; top.castShadow = true; towerGroup.add(top);
            const orb = new THREE.Mesh(new THREE.OctahedronGeometry(0.2, 0), new THREE.MeshBasicMaterial({ color: 0xcc00ff }));
            orb.position.y = 3.0; towerGroup.add(orb);
        } else if (selectedTowerIndex === 4 || selectedTowerIndex === 5) {
            const isUpgraded = selectedTowerIndex === 5;
            const baseSize = isUpgraded ? 1.0 : 0.8;
            const base = new THREE.Mesh(new THREE.BoxGeometry(baseSize, 0.4, baseSize), new THREE.MeshStandardMaterial({ color: 0x37474f, metalness: 0.7 }));
            base.position.y = 1.2; base.castShadow = true; towerGroup.add(base);
            const barrelH = isUpgraded ? 2.5 : 2.0;
            const barrel = new THREE.Mesh(new THREE.CylinderGeometry(0.15, 0.2, barrelH, 8), new THREE.MeshStandardMaterial({ color: 0x00bcd4, metalness: 0.8, emissive: 0x004d56, emissiveIntensity: 0.3 }));
            barrel.position.y = 1.2 + barrelH / 2; barrel.castShadow = true; towerGroup.add(barrel);
            const tipGeo = new THREE.SphereGeometry(0.2, 8, 8);
            const tipMat = new THREE.MeshBasicMaterial({ color: isUpgraded ? 0xff5722 : 0x00e5ff });
            const tip = new THREE.Mesh(tipGeo, tipMat);
            tip.position.y = 1.2 + barrelH + 0.1; towerGroup.add(tip);
            const ring = new THREE.Mesh(new THREE.TorusGeometry(0.35, 0.05, 6, 12), new THREE.MeshStandardMaterial({ color: 0x546e7a }));
            ring.position.y = 1.2; ring.rotation.x = Math.PI / 2; towerGroup.add(ring);
            if (isUpgraded) {
                const ring2 = new THREE.Mesh(new THREE.TorusGeometry(0.4, 0.04, 6, 12), new THREE.MeshStandardMaterial({ color: 0xff9800, emissive: 0xff5722, emissiveIntensity: 0.3 }));
                ring2.position.y = 2.0; ring2.rotation.x = Math.PI / 2; towerGroup.add(ring2);
            }
        }

        scene.add(towerGroup);
        const tHpBg = new THREE.Mesh(new THREE.PlaneGeometry(0.8, 0.1), new THREE.MeshBasicMaterial({ color: 0x222222, side: THREE.DoubleSide, depthTest: false }));
        tHpBg.position.y = 2.2; tHpBg.renderOrder = 999; towerGroup.add(tHpBg);
        const tHpBar = new THREE.Mesh(new THREE.PlaneGeometry(0.76, 0.07), new THREE.MeshBasicMaterial({ color: 0x4caf50, side: THREE.DoubleSide, depthTest: false }));
        tHpBar.position.y = 2.2; tHpBar.position.z = 0.01; tHpBar.renderOrder = 1000; towerGroup.add(tHpBar);
        towers.push({ mesh: towerGroup, type: type, cooldown: 0, gx: gx, gz: gz, health: type.health, maxHealth: type.health, hpBar: tHpBar, hpBg: tHpBg });
        playSound('place');
    }
});

// --- Dragon color/level based on wave ---
function getDragonLevel(wave) {
    if (wave <= 3) return { color: materials.green, hp: 200 + wave * 50, damage: 20, name: 'green' };
    if (wave <= 6) return { color: materials.blue, hp: 400 + wave * 50, damage: 40, name: 'blue' };
    if (wave <= 9) return { color: materials.yellow, hp: 600 + wave * 50, damage: 60, name: 'yellow' };
    if (wave <= 12) return { color: materials.orange, hp: 800 + wave * 50, damage: 80, name: 'orange' };
    return { color: materials.red, hp: 1200 + wave * 50, damage: Math.ceil(gameState.castleMaxHP / 3), name: 'red' };
}

// --- Enemy Spawning ---
function spawnEnemy() {
    const wave = gameState.wave;
    let type = 'orc';
    let hp = 40 + wave * 8;
    let speed = 3.2 + wave * 0.12;
    let reward = 10;
    let color = materials.green;

    if (wave >= 2 && Math.random() < 0.5) { type = 'skeleton'; hp = 60 + wave * 10; speed = 4.0; reward = 15; color = materials.white; }
    if (wave >= 4 && Math.random() < 0.35) { type = 'wizard'; hp = 120 + wave * 18; speed = 2.8; reward = 30; color = materials.purple; }
    if (wave >= 6 && gameState.enemiesRemainingToSpawn === 1) { type = 'dragon'; const dl = getDragonLevel(wave); hp = dl.hp; speed = 2.5 + wave * 0.08; reward = 100; color = dl.color; }

    const enemyGroup = new THREE.Group();
    const size = type === 'dragon' ? 1.8 : 1;
    const s = size;

    if (type === 'orc') {
        const body = new THREE.Mesh(new THREE.BoxGeometry(0.7*s, 0.8*s, 0.6*s), color); body.position.y = 0.8*s; body.castShadow = true; enemyGroup.add(body);
        const head = new THREE.Mesh(new THREE.BoxGeometry(0.5*s, 0.45*s, 0.5*s), color); head.position.y = 1.45*s; head.castShadow = true; enemyGroup.add(head);
    } else if (type === 'skeleton') {
        const ribcage = new THREE.Mesh(new THREE.BoxGeometry(0.55*s, 0.6*s, 0.35*s), materials.white); ribcage.position.y = 0.9*s; ribcage.castShadow = true; enemyGroup.add(ribcage);
        const skull = new THREE.Mesh(new THREE.BoxGeometry(0.4*s, 0.4*s, 0.4*s), materials.white); skull.position.y = 1.4*s; skull.castShadow = true; enemyGroup.add(skull);
    } else if (type === 'wizard') {
        const robe = new THREE.Mesh(new THREE.BoxGeometry(0.6*s, 1.0*s, 0.6*s), color); robe.position.y = 0.65*s; robe.castShadow = true; enemyGroup.add(robe);
        const head = new THREE.Mesh(new THREE.BoxGeometry(0.35*s, 0.35*s, 0.35*s), materials.skin); head.position.y = 1.32*s; head.castShadow = true; enemyGroup.add(head);
    } else if (type === 'dragon') {
        const body = new THREE.Mesh(new THREE.BoxGeometry(1.2*s, 1.0*s, 2.0*s), color); body.position.y = 1.5*s; body.castShadow = true; enemyGroup.add(body);
        const neck = new THREE.Mesh(new THREE.BoxGeometry(0.6*s, 0.5*s, 0.8*s), color); neck.position.set(0, 1.8*s, 1.2*s); neck.rotation.x = -0.3; enemyGroup.add(neck);
        const head = new THREE.Mesh(new THREE.BoxGeometry(0.7*s, 0.6*s, 0.9*s), color); head.position.set(0, 2.2*s, 1.7*s); head.castShadow = true; enemyGroup.add(head);
        const snout = new THREE.Mesh(new THREE.BoxGeometry(0.5*s, 0.35*s, 0.5*s), color); snout.position.set(0, 2.1*s, 2.2*s); enemyGroup.add(snout);
        const eyeGeo = new THREE.BoxGeometry(0.15*s, 0.15*s, 0.08*s);
        const eyeMat = new THREE.MeshBasicMaterial({ color: 0xffaa00 });
        const eyeL = new THREE.Mesh(eyeGeo, eyeMat); eyeL.position.set(0.22*s, 2.3*s, 1.8*s); enemyGroup.add(eyeL);
        const eyeR = new THREE.Mesh(eyeGeo, eyeMat); eyeR.position.set(-0.22*s, 2.3*s, 1.8*s); enemyGroup.add(eyeR);
        const hornGeo = new THREE.BoxGeometry(0.15*s, 0.4*s, 0.15*s);
        const hornL = new THREE.Mesh(hornGeo, new THREE.MeshLambertMaterial({ color: 0x424242 })); hornL.position.set(0.25*s, 2.6*s, 1.6*s); hornL.rotation.z = 0.2; enemyGroup.add(hornL);
        const hornR = new THREE.Mesh(hornGeo, new THREE.MeshLambertMaterial({ color: 0x424242 })); hornR.position.set(-0.25*s, 2.6*s, 1.6*s); hornR.rotation.z = -0.2; enemyGroup.add(hornR);
        const wingGeo = new THREE.BoxGeometry(1.5*s, 0.1*s, 1.2*s);
        const wingMat = new THREE.MeshLambertMaterial({ color: color.color.clone().multiplyScalar(0.7) });
        const wingL = new THREE.Mesh(wingGeo, wingMat); wingL.position.set(-1.4*s, 2.0*s, 0); wingL.rotation.z = 0.15; wingL.castShadow = true; wingL.name = 'wingL'; enemyGroup.add(wingL);
        const wingR = new THREE.Mesh(wingGeo, wingMat); wingR.position.set(1.4*s, 2.0*s, 0); wingR.rotation.z = -0.15; wingR.castShadow = true; wingR.name = 'wingR'; enemyGroup.add(wingR);
        const tailBase = new THREE.Mesh(new THREE.BoxGeometry(0.5*s, 0.5*s, 1.5*s), color); tailBase.position.set(0, 1.3*s, -1.5*s); enemyGroup.add(tailBase);
        const tailMid = new THREE.Mesh(new THREE.BoxGeometry(0.35*s, 0.35*s, 1.2*s), color); tailMid.position.set(0, 1.0*s, -2.5*s); enemyGroup.add(tailMid);
        const tailTip = new THREE.Mesh(new THREE.BoxGeometry(0.2*s, 0.2*s, 0.8*s), color); tailTip.position.set(0, 0.8*s, -3.3*s); enemyGroup.add(tailTip);
        const legGeo = new THREE.BoxGeometry(0.35*s, 0.6*s, 0.35*s);
        const legMat = new THREE.MeshLambertMaterial({ color: color.color.clone().multiplyScalar(0.8) });
        [[-0.45, 0.3, 0.7], [0.45, 0.3, 0.7], [-0.45, 0.3, -0.7], [0.45, 0.3, -0.7]].forEach(pos => {
            const leg = new THREE.Mesh(legGeo, legMat); leg.position.set(pos[0]*s, pos[1]*s, pos[2]*s); leg.castShadow = true; enemyGroup.add(leg);
        });
    }

    const hpBg = new THREE.Mesh(new THREE.PlaneGeometry(size*1.2, 0.15), new THREE.MeshBasicMaterial({ color: 0x222222, side: THREE.DoubleSide, depthTest: false }));
    hpBg.position.y = size*3.2; hpBg.renderOrder = 999; enemyGroup.add(hpBg);
    const hpBar = new THREE.Mesh(new THREE.PlaneGeometry(size*1.16, 0.11), new THREE.MeshBasicMaterial({ color: 0xff3333, side: THREE.DoubleSide, depthTest: false }));
    hpBar.position.y = size*3.2; hpBar.position.z = 0.01; hpBar.renderOrder = 1000; enemyGroup.add(hpBar);

    enemyGroup.position.copy(waypoints[0]);
    enemyGroup.position.y = type === 'dragon' ? 12 : 0;
    scene.add(enemyGroup);

    let attackRange = 0, attackDamage = 0, attackCooldown = 0, attackType = 'none';
    if (type === 'orc') { attackRange = 1.5; attackDamage = 10 + Math.floor(wave * 2.5); attackCooldown = 1.0; attackType = 'melee'; }
    else if (type === 'skeleton') { attackRange = 14; attackDamage = 8 + Math.floor(wave * 1.5); attackCooldown = 1.5; attackType = 'ranged'; }
    else if (type === 'wizard') { attackRange = 12; attackDamage = 18 + Math.floor(wave * 2.5); attackCooldown = 2.0; attackType = 'spell'; }
    else if (type === 'dragon') {
        const dl = getDragonLevel(wave);
        attackRange = 25; attackDamage = dl.damage; attackCooldown = Math.max(1.0, 3.0 - wave*0.15); attackType = 'dragon_fire';
    }

    let dragonFlightTarget = null;
    let dragonFlightTimer = 0;

    enemies.push({
        mesh: enemyGroup, hpBar: hpBar, hp: hp, maxHp: hp, speed: speed, baseSpeed: speed,
        reward: reward, waypointIndex: 0, slowTimer: 0, size: size, type: type,
        attackRange: attackRange, attackDamage: attackDamage, attackCooldown: attackCooldown,
        attackTimer: 0, attackType: attackType,
        dragonFlightTarget: dragonFlightTarget, dragonFlightTimer: dragonFlightTimer,
        wingPhase: Math.random() * Math.PI * 2
    });
}

function shootProjectile(tower, target) {
    const type = tower.type;
    const isArrow = (type.name === 'Crossbow' || type.name === 'Archer' || type.name === 'Ballista');
    const isSkyCannon = type.antiDragon;
    let mesh;
    if (isSkyCannon) {
        const boltGroup = new THREE.Group();
        const core = new THREE.Mesh(new THREE.SphereGeometry(0.2, 8, 8), new THREE.MeshBasicMaterial({ color: type.level === 2 ? 0xff5722 : 0x00e5ff }));
        boltGroup.add(core);
        const glow = new THREE.Mesh(new THREE.SphereGeometry(0.35, 8, 8), new THREE.MeshBasicMaterial({ color: type.level === 2 ? 0xff9800 : 0x00bcd4, transparent: true, opacity: 0.4 }));
        boltGroup.add(glow);
        mesh = boltGroup;
    } else if (isArrow) {
        const arrowGroup = new THREE.Group();
        const shaft = new THREE.Mesh(new THREE.CylinderGeometry(0.04, 0.04, 0.6, 6), new THREE.MeshLambertMaterial({ color: 0x8d6e63 }));
        shaft.rotation.x = Math.PI/2; arrowGroup.add(shaft);
        const tip = new THREE.Mesh(new THREE.ConeGeometry(0.08, 0.15, 6), new THREE.MeshLambertMaterial({ color: 0x9e9e9e }));
        tip.position.z = 0.35; tip.rotation.x = Math.PI/2; arrowGroup.add(tip);
        mesh = arrowGroup;
    } else if (type.splash) {
        mesh = new THREE.Mesh(new THREE.SphereGeometry(0.25, 8, 8), new THREE.MeshLambertMaterial({ color: 0x212121 }));
    } else {
        mesh = new THREE.Mesh(new THREE.SphereGeometry(0.2, 8, 8), new THREE.MeshBasicMaterial({ color: 0xcc00ff }));
    }
    mesh.position.copy(tower.mesh.position);
    mesh.position.y += type.antiDragon ? 3.0 : 1.5;
    scene.add(mesh);
    projectiles.push({ mesh: mesh, target: target, damage: type.damage, speed: type.projectileSpeed, splash: type.splash || false, slow: type.slow || false, isHoming: true, isArrow: isArrow, isSkyCannon: isSkyCannon });
}

// --- Animation Loop ---
const clock = new THREE.Clock();

function animate() {
    requestAnimationFrame(animate);
    const delta = Math.min(clock.getDelta(), 0.1);
    const time = clock.getElapsedTime();

    if (gameState.isPaused) { renderer.render(scene, camera); return; }
    handleCameraMovement(delta);

    // Wave management
    if (!gameState.isWaveActive && gameState.enemiesRemainingToSpawn === 0 && enemies.length === 0) {
        if (time % 5 < 0.02 || gameState.wave === 1) {
            gameState.isWaveActive = true;
            gameState.enemiesRemainingToSpawn = 8 + Math.floor(gameState.wave * 3);
            playSound('waveStart');
            playWaveSting();
        }
    }
    if (gameState.isWaveActive && gameState.enemiesRemainingToSpawn > 0) {
        gameState.spawnTimer -= delta;
        if (gameState.spawnTimer <= 0) { spawnEnemy(); gameState.enemiesRemainingToSpawn--; gameState.spawnTimer = gameState.spawnInterval; }
    } else if (gameState.isWaveActive && gameState.enemiesRemainingToSpawn === 0 && enemies.length === 0) {
        gameState.isWaveActive = false;
        gameState.wave++;
        gameState.gold += 30;
        updateUI();
    }

    // Update enemies
    for (let i = enemies.length - 1; i >= 0; i--) {
        const enemy = enemies[i];
        if (enemy.slowTimer > 0) { enemy.slowTimer -= delta; enemy.speed = enemy.baseSpeed * 0.5; }
        else { enemy.speed = enemy.baseSpeed; }

        if (enemy.type === 'dragon') {
            enemy.wingPhase += delta * 8;
            const wingL = enemy.mesh.getObjectByName('wingL');
            const wingR = enemy.mesh.getObjectByName('wingR');
            if (wingL) wingL.rotation.z = 0.15 + Math.sin(enemy.wingPhase) * 0.5;
            if (wingR) wingR.rotation.z = -0.15 - Math.sin(enemy.wingPhase) * 0.5;

            enemy.dragonFlightTimer -= delta;
            if (!enemy.dragonFlightTarget || enemy.dragonFlightTimer <= 0) {
                if (Math.random() < 0.4) {
                    enemy.dragonFlightTarget = new THREE.Vector3(75.5, 12, 50);
                } else {
                    enemy.dragonFlightTarget = new THREE.Vector3(
                        5 + Math.random() * 70,
                        10 + Math.random() * 8,
                        5 + Math.random() * 70
                    );
                }
                enemy.dragonFlightTimer = 3 + Math.random() * 4;
            }

            const dir = new THREE.Vector3().subVectors(enemy.dragonFlightTarget, enemy.mesh.position);
            const dist = dir.length();
            dir.normalize();
            const moveDist = enemy.speed * delta;
            if (dist < moveDist + 1) {
                enemy.mesh.position.copy(enemy.dragonFlightTarget);
            } else {
                enemy.mesh.position.add(dir.multiplyScalar(moveDist));
            }
            enemy.mesh.position.x = Math.max(2, Math.min(GRID_SIZE - 2, enemy.mesh.position.x));
            enemy.mesh.position.z = Math.max(2, Math.min(GRID_SIZE - 2, enemy.mesh.position.z));
            enemy.mesh.position.y = Math.max(8, Math.min(20, enemy.mesh.position.y));
            const lookTarget = enemy.mesh.position.clone().add(dir);
            enemy.mesh.lookAt(lookTarget.x, enemy.mesh.position.y, lookTarget.z);
        } else {
            const targetWp = waypoints[enemy.waypointIndex + 1];
            if (!targetWp) {
                gameState.lives--;
                updateUI();
                scene.remove(enemy.mesh);
                enemies.splice(i, 1);
                if (gameState.lives <= 0) {
                    if (gameState.isStarted) { playSound('gameOver'); alert('Game Over! Refresh to restart.'); location.reload(); }
                    else { gameState.lives = 20; }
                }
                continue;
            }
            const dir = new THREE.Vector3().subVectors(targetWp, enemy.mesh.position);
            dir.y = 0;
            const dist = dir.length();
            dir.normalize();
            if (dist < enemy.speed * delta) { enemy.mesh.position.copy(targetWp); enemy.waypointIndex++; }
            else { enemy.mesh.position.add(dir.multiplyScalar(enemy.speed * delta)); enemy.mesh.lookAt(new THREE.Vector3(targetWp.x, enemy.mesh.position.y, targetWp.z)); }
        }

        if (enemy.hpBar) enemy.hpBar.scale.x = Math.max(0, enemy.hp / enemy.maxHp);
    }

    // Tower shooting
    towers.forEach(tower => {
        tower.cooldown -= delta;
        if (tower.cooldown <= 0) {
            let closest = null, minDst = Infinity;
            for (const enemy of enemies) {
                const dst = enemy.mesh.position.distanceTo(tower.mesh.position);
                if (tower.type.antiDragon && enemy.type !== 'dragon') continue;
                if (!tower.type.antiDragon && enemy.type === 'dragon') continue;
                if (dst <= tower.type.range && dst < minDst) { minDst = dst; closest = enemy; }
            }
            if (closest) {
                shootProjectile(tower, closest);
                tower.cooldown = tower.type.fireRate;
                if (tower.type.name === 'Archer') playSound('archer');
                else if (tower.type.name === 'Crossbow') playSound('crossbow');
                else if (tower.type.name === 'Ballista') playSound('ballista');
                else if (tower.type.name === 'Mage') playSound('mage');
                else if (tower.type.antiDragon) playSound('skycannon');
            }
        }
    });

    // Enemy attacks
    for (const enemy of enemies) {
        enemy.attackTimer -= delta;
        if (enemy.attackTimer > 0) continue;

        if (enemy.type === 'dragon') {
            enemy.attackTimer = enemy.attackCooldown;
            const mouthPos = new THREE.Vector3(0, 2.1 * enemy.size, 2.2 * enemy.size);
            mouthPos.applyMatrix4(enemy.mesh.matrixWorld);
            const forward = new THREE.Vector3();
            enemy.mesh.getWorldDirection(forward);
            const fireballMesh = new THREE.Mesh(
                new THREE.SphereGeometry(0.3, 8, 8),
                new THREE.MeshBasicMaterial({ color: 0xff6600 })
            );
            fireballMesh.position.copy(mouthPos);
            scene.add(fireballMesh);
            projectiles.push({
                mesh: fireballMesh,
                velocity: forward.multiplyScalar(25),
                damage: enemy.attackDamage,
                life: 4.0,
                isDragonFireball: true
            });
            playSound('dragonFire');
        } else if (enemy.attackType === 'melee') {
            for (const tower of towers) {
                const dist = enemy.mesh.position.distanceTo(tower.mesh.position);
                if (dist < enemy.attackRange + 0.5) {
                    tower.health -= enemy.attackDamage;
                    enemy.attackTimer = enemy.attackCooldown;
                    playSound('hit');
                    break;
                }
            }
        } else if (enemy.attackType === 'ranged') {
            let nearestTower = null, nearestDist = enemy.attackRange;
            for (const tower of towers) {
                const dist = enemy.mesh.position.distanceTo(tower.mesh.position);
                if (dist < nearestDist) { nearestDist = dist; nearestTower = tower; }
            }
            if (nearestTower) {
                enemy.attackTimer = enemy.attackCooldown;
                const arrowGroup = new THREE.Group();
                const shaft = new THREE.Mesh(new THREE.CylinderGeometry(0.03, 0.03, 0.4, 6), new THREE.MeshLambertMaterial({ color: 0x8d6e63 }));
                shaft.rotation.x = Math.PI/2; arrowGroup.add(shaft);
                arrowGroup.position.copy(enemy.mesh.position); arrowGroup.position.y += 1.0;
                scene.add(arrowGroup);
                projectiles.push({ mesh: arrowGroup, target: nearestTower, damage: enemy.attackDamage, speed: 20, splash: false, slow: false, isHoming: true, isArrow: true, isEnemyProjectile: true });
                playSound('skeletonArrow');
            }
        } else if (enemy.attackType === 'spell') {
            enemy.attackTimer = enemy.attackCooldown;
            const spellOrigin = enemy.mesh.position.clone(); spellOrigin.y += 1.5;
            const ringGeo = new THREE.TorusGeometry(0.3, 0.05, 6, 16);
            const ringMat = new THREE.MeshBasicMaterial({ color: 0xaa00ff, transparent: true, opacity: 0.8 });
            const spellRing = new THREE.Mesh(ringGeo, ringMat);
            spellRing.position.copy(spellOrigin); spellRing.rotation.x = Math.PI/2;
            scene.add(spellRing);
            projectiles.push({ mesh: spellRing, target: null, damage: enemy.attackDamage, speed: 8, splash: true, slow: false, isHoming: false, isArrow: false, isEnemyProjectile: true, isSpell: true, origin: spellOrigin.clone(), maxRange: enemy.attackRange, towers: [...towers] });
            playSound('wizardSpell');
        }
    }

    // Update projectiles
    for (let i = projectiles.length - 1; i >= 0; i--) {
        const p = projectiles[i];

        if (p.isDragonFireball) {
            p.life -= delta;
            if (p.life <= 0) {
                scene.remove(p.mesh);
                projectiles.splice(i, 1);
                continue;
            }
            p.velocity.y -= 15 * delta;
            p.mesh.position.add(p.velocity.clone().multiplyScalar(delta));

            const castlePos = new THREE.Vector3(75.5, 1.5, 50);
            if (p.mesh.position.distanceTo(castlePos) < 8) {
                gameState.castleHP -= p.damage;
                playSound('castleHit');
                if (gameState.castleHP <= 0) {
                    gameState.castleHP = 0;
                    playSound('gameOver');
                    alert('The Castle has fallen! Game Over! Refresh to restart.');
                    location.reload();
                }
                updateUI();
                scene.remove(p.mesh);
                projectiles.splice(i, 1);
                continue;
            }

            let hitTower = false;
            for (const tower of towers) {
                if (p.mesh.position.distanceTo(tower.mesh.position) < 1.5) {
                    tower.health -= p.damage;
                    hitTower = true;
                    playSound('hit');
                    break;
                }
            }
            if (hitTower) {
                scene.remove(p.mesh);
                projectiles.splice(i, 1);
                for (let j = towers.length - 1; j >= 0; j--) {
                    if (towers[j].health <= 0) { scene.remove(towers[j].mesh); towers.splice(j, 1); }
                }
                continue;
            }

            if (p.mesh.position.x < -5 || p.mesh.position.x > GRID_SIZE + 5 || p.mesh.position.z < -5 || p.mesh.position.z > GRID_SIZE + 5 || p.mesh.position.y < 0) {
                scene.remove(p.mesh);
                projectiles.splice(i, 1);
            }
            continue;
        }

        if (p.isSpell) {
            const currentRadius = p.mesh.geometry.parameters?.radius || 0.3;
            const newRadius = currentRadius + p.speed * delta;
            p.mesh.geometry.dispose();
            p.mesh.geometry = new THREE.TorusGeometry(newRadius, 0.05, 6, 16);
            p.mesh.material.opacity = Math.max(0, 0.8 * (1 - newRadius / p.maxRange));
            const damageAtRange = p.damage * Math.max(0, 1 - newRadius / p.maxRange);
            if (damageAtRange > 0.5) {
                for (const tower of p.towers) {
                    if (!towers.includes(tower)) continue;
                    const dist = tower.mesh.position.distanceTo(p.origin);
                    if (Math.abs(dist - newRadius) < 1.0) tower.health -= damageAtRange * delta * 3;
                }
            }
            if (newRadius >= p.maxRange || p.mesh.material.opacity <= 0) { scene.remove(p.mesh); projectiles.splice(i, 1); }
            continue;
        }

        let targetPos;
        if (p.isEnemyProjectile && p.target && towers.includes(p.target)) {
            targetPos = p.target.mesh.position.clone(); targetPos.y += 1.0;
        } else if (p.isHoming && enemies.includes(p.target)) {
            targetPos = p.target.mesh.position.clone(); targetPos.y += p.target.size * 0.8;
        } else if (p.target) {
            targetPos = p.target.mesh.position.clone(); targetPos.y += p.target.size * 0.8;
        } else { scene.remove(p.mesh); projectiles.splice(i, 1); continue; }

        const dir = new THREE.Vector3().subVectors(targetPos, p.mesh.position);
        const dist = dir.length();
        const moveDist = p.speed * delta;

        if (dist < moveDist + 0.3) {
            if (p.isEnemyProjectile) {
                if (p.target && towers.includes(p.target)) { p.target.health -= p.damage; playSound('hit'); }
            } else {
                if (enemies.includes(p.target)) {
                    p.target.hp -= p.damage;
                    if (p.slow) p.target.slowTimer = 2;
                    playSound('hit');
                }
            }
            scene.remove(p.mesh); projectiles.splice(i, 1);
            for (let j = enemies.length - 1; j >= 0; j--) {
                if (enemies[j].hp <= 0) { gameState.gold += enemies[j].reward; updateUI(); scene.remove(enemies[j].mesh); enemies.splice(j, 1); playSound('enemyDeath'); playSound('gold'); }
            }
            for (let j = towers.length - 1; j >= 0; j--) {
                if (towers[j].health <= 0) { scene.remove(towers[j].mesh); towers.splice(j, 1); playSound('hit'); }
            }
        } else {
            dir.normalize();
            p.mesh.position.add(dir.multiplyScalar(moveDist));
            if (p.isArrow) p.mesh.lookAt(targetPos);
        }
    }

    // Update tower health bars
    for (const tower of towers) {
        const hpRatio = Math.max(0, tower.health / tower.maxHealth);
        tower.hpBar.scale.x = hpRatio;
        tower.hpBar.material.color.setHex(hpRatio > 0.5 ? 0x4caf50 : (hpRatio > 0.25 ? 0xff9800 : 0xf44336));
    }

    // Update castle health bar
    const castleHpRatio = Math.max(0, gameState.castleHP / gameState.castleMaxHP);
    castleHpBar.scale.x = castleHpRatio;
    castleHpBar.material.color.setHex(castleHpRatio > 0.5 ? 0x4caf50 : (castleHpRatio > 0.25 ? 0xff9800 : 0xf44336));

    // Update fire particles
    for (let i = fireParticles.length - 1; i >= 0; i--) {
        const fp = fireParticles[i];
        fp.life -= delta;
        if (fp.life <= 0) {
            scene.remove(fp.mesh);
            fp.mesh.geometry.dispose();
            fp.mesh.material.dispose();
            fireParticles.splice(i, 1);
            continue;
        }
        fp.mesh.position.add(fp.velocity.clone().multiplyScalar(delta));
        fp.velocity.y -= 2 * delta;
        const ratio = fp.life / fp.maxLife;
        fp.mesh.material.opacity = ratio * 0.9;
        const scale = ratio;
        fp.mesh.scale.set(scale, scale, scale);
    }

    renderer.render(scene, camera);
}

window.addEventListener('wheel', (e) => {
    e.preventDefault();
    cameraState.radius += e.deltaY * 0.1;
    cameraState.radius = Math.max(20, Math.min(150, cameraState.radius));
    updateCamera();
}, { passive: false });

window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});

// --- Demo Spawning ---
const fireParticles = [];

function spawnDemoEnemy(type) {
    const enemyGroup = new THREE.Group();
    const s = type === 'dragon' ? 1.8 : 1;
    let color = materials.green;
    if (type === 'skeleton') color = materials.white;
    if (type === 'wizard') color = materials.purple;
    if (type === 'dragon') color = materials.red;

    if (type === 'orc') {
        const body = new THREE.Mesh(new THREE.BoxGeometry(0.7*s, 0.8*s, 0.6*s), color); body.position.y = 0.8*s; enemyGroup.add(body);
        const head = new THREE.Mesh(new THREE.BoxGeometry(0.5*s, 0.45*s, 0.5*s), color); head.position.y = 1.45*s; enemyGroup.add(head);
    } else if (type === 'skeleton') {
        const ribcage = new THREE.Mesh(new THREE.BoxGeometry(0.55*s, 0.6*s, 0.35*s), materials.white); ribcage.position.y = 0.9*s; enemyGroup.add(ribcage);
        const skull = new THREE.Mesh(new THREE.BoxGeometry(0.4*s, 0.4*s, 0.4*s), materials.white); skull.position.y = 1.4*s; enemyGroup.add(skull);
    } else if (type === 'wizard') {
        const robe = new THREE.Mesh(new THREE.BoxGeometry(0.6*s, 1.0*s, 0.6*s), color); robe.position.y = 0.65*s; enemyGroup.add(robe);
        const head = new THREE.Mesh(new THREE.BoxGeometry(0.35*s, 0.35*s, 0.35*s), materials.skin); head.position.y = 1.32*s; enemyGroup.add(head);
    } else if (type === 'dragon') {
        const body = new THREE.Mesh(new THREE.BoxGeometry(1.2*s, 1.0*s, 2.0*s), color); body.position.y = 1.5*s; enemyGroup.add(body);
        const head = new THREE.Mesh(new THREE.BoxGeometry(0.7*s, 0.6*s, 0.9*s), color); head.position.set(0, 2.2*s, 1.7*s); enemyGroup.add(head);
        const wingGeo = new THREE.BoxGeometry(1.5*s, 0.1*s, 1.2*s);
        const wingMat = new THREE.MeshLambertMaterial({ color: 0xb71c1c });
        const wingL = new THREE.Mesh(wingGeo, wingMat); wingL.position.set(-1.4*s, 2.0*s, 0); wingL.rotation.z = 0.15; wingL.name = 'wingL'; enemyGroup.add(wingL);
        const wingR = new THREE.Mesh(wingGeo, wingMat); wingR.position.set(1.4*s, 2.0*s, 0); wingR.rotation.z = -0.15; wingR.name = 'wingR'; enemyGroup.add(wingR);
    }

    enemyGroup.position.copy(waypoints[0]);
    enemyGroup.position.y = type === 'dragon' ? 12 : 0;
    scene.add(enemyGroup);
    enemies.push({
        mesh: enemyGroup, hpBar: null, hp: 100, maxHp: 100, speed: 2, baseSpeed: 2,
        reward: 0, waypointIndex: 0, slowTimer: 0, size: s, type: type,
        attackRange: 0, attackDamage: 0, attackCooldown: 3, attackTimer: 3, attackType: 'none',
        dragonFlightTarget: null, dragonFlightTimer: 0, wingPhase: Math.random() * Math.PI * 2,
        isDemo: true
    });
}

spawnDemoEnemy('orc');
spawnDemoEnemy('skeleton');
spawnDemoEnemy('wizard');
spawnDemoEnemy('dragon');

animate();