import * as THREE from 'three';

// --- Game Constants ---
const GRID_SIZE = 80;
const CELL_SIZE = 1;

// --- Game State ---
const gameState = {
    gold: 150,
    lives: 20,
    wave: 1,
    isWaveActive: false,
    enemiesRemainingToSpawn: 0,
    spawnTimer: 0,
    spawnInterval: 1.5,
    isStarted: false,
    isPaused: false
};

// Camera control state (spherical coordinates)
const cameraState = {
    target: new THREE.Vector3(10, 0, 40),
    radius: 70,
    yaw: 0,
    pitch: Math.PI / 4,
    speed: 30,
    rotSpeed: 1.5,
    tiltSpeed: 1.0
};

const waypoints = [
    new THREE.Vector3(0, 0, 40),
    new THREE.Vector3(20, 0, 40),
    new THREE.Vector3(20, 0, 15),
    new THREE.Vector3(60, 0, 15),
    new THREE.Vector3(60, 0, 55),
    new THREE.Vector3(40, 0, 55),
    new THREE.Vector3(40, 0, 70),
    new THREE.Vector3(75, 0, 70),
    new THREE.Vector3(79, 0, 70)
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
    projectile: new THREE.MeshBasicMaterial({ color: 0xffff00 })
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
    const riverZ = 28 + Math.sin(x * 0.08) * 5;
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
function addBlock(x, y, z, type) {
    const mesh = new THREE.Mesh(new THREE.BoxGeometry(1, 1, 1), materials[type]);
    mesh.position.set(x, y, z);
    mesh.castShadow = true;
    mesh.receiveShadow = true;
    scene.add(mesh);
}

for(let x = 72; x <= 79; x++) {
    for(let z = 64; z <= 76; z++) {
        addBlock(x, 1, z, 'castle');
    }
}
for (let y = 2; y <= 5; y++) {
    for(let x = 72; x <= 79; x++) {
        addBlock(x, y, 64, 'castle');
        addBlock(x, y, 76, 'castle');
    }
    for(let z = 64; z <= 76; z++) {
        addBlock(72, y, z, 'castle');
        addBlock(79, y, z, 'castle');
    }
}
for(let y = 6; y <= 8; y++) {
    addBlock(72, y, 64, 'castle'); addBlock(79, y, 64, 'castle');
    addBlock(72, y, 76, 'castle'); addBlock(79, y, 76, 'castle');
}
for(let x = 74; x <= 77; x++) {
    for(let z = 68; z <= 72; z++) {
        for(let y = 2; y <= 6; y++) {
            if(x === 74 || x === 77 || z === 68 || z === 72 || y === 6) {
                addBlock(x, y, z, 'castle');
            }
        }
    }
}
addBlock(75, 9, 70, 'wood');
addBlock(75, 10, 70, 'red');

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
buildHouse(4, 56);
buildHouse(8, 59);
buildHouse(5, 62);
buildHouse(9, 64);

// --- Scenery: Trees ---
for (let i = 0; i < 120; i++) {
    const tx = Math.floor(Math.random() * GRID_SIZE);
    const tz = Math.floor(Math.random() * GRID_SIZE);
    
    if (gridData[tx + tz * GRID_SIZE] !== 0) continue;
    
    let blocked = false;
    for (let wp of waypoints) {
        if (Math.abs(tx - wp.x) < 5 && Math.abs(tz - wp.z) < 5) { blocked = true; break; }
    }
    if (tx >= 70 && tx <= 80 && tz >= 62 && tz <= 78) blocked = true;
    if (tx >= 2 && tx <= 12 && tz >= 54 && tz <= 68) blocked = true;
    
    if (!blocked) {
        for(let y = 0; y < 2; y++) {
            addBlock(tx, y + 0.5, tz, 'wood');
        }
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
    { name: 'Archer', cost: 50, range: 15, damage: 10, fireRate: 0.8, color: 0x8d6e63, projectileSpeed: 30, health: 50 },
    { name: 'Crossbow', cost: 120, range: 18, damage: 30, fireRate: 2.0, color: 0x757575, projectileSpeed: 35, splash: false, health: 80 },
    { name: 'Ballista', cost: 200, range: 25, damage: 80, fireRate: 2.5, color: 0x4e342e, projectileSpeed: 50, health: 100 },
    { name: 'Mage', cost: 350, range: 20, damage: 15, fireRate: 0.5, color: 0x9c27b0, projectileSpeed: 20, slow: true, health: 60 }
];
let selectedTowerIndex = 0;

// --- Entities ---
const towers = [];
const enemies = [];
const projectiles = [];

// --- Keyboard Movement ---
const keys = {};
window.addEventListener('keydown', (e) => {
    keys[e.code] = true;
    if (e.code === 'Digit1') { selectedTowerIndex = 0; updateUI(); }
    if (e.code === 'Digit2') { selectedTowerIndex = 1; updateUI(); }
    if (e.code === 'Digit3') { selectedTowerIndex = 2; updateUI(); }
    if (e.code === 'Digit4') { selectedTowerIndex = 3; updateUI(); }
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
    
    if (keys['KeyW']) {
        cameraState.target.x += forwardX * moveSpeed;
        cameraState.target.z += forwardZ * moveSpeed;
    }
    if (keys['KeyS']) {
        cameraState.target.x -= forwardX * moveSpeed;
        cameraState.target.z -= forwardZ * moveSpeed;
    }
    if (keys['KeyA']) {
        cameraState.target.x -= rightX * moveSpeed;
        cameraState.target.z -= rightZ * moveSpeed;
    }
    if (keys['KeyD']) {
        cameraState.target.x += rightX * moveSpeed;
        cameraState.target.z += rightZ * moveSpeed;
    }
    
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
uiContainer.style.cssText = 'position:absolute; top:10px; left:10px; color:white; background:rgba(0,0,0,0.7); padding:15px; border-radius:8px; font-family:sans-serif; font-size:14px; pointer-events:none; line-height:1.6; display:none;';
document.body.appendChild(uiContainer);

const towerBar = document.createElement('div');
towerBar.style.cssText = 'position:absolute; bottom:20px; left:50%; transform:translateX(-50%); display:none; gap:8px; pointer-events:auto;';
document.body.appendChild(towerBar);

const splashScreen = document.getElementById('splash-screen');
const pauseScreen = document.getElementById('pause-screen');

splashScreen.addEventListener('click', () => {
    gameState.isStarted = true;
    splashScreen.style.display = 'none';
    uiContainer.style.display = 'block';
    towerBar.style.display = 'flex';
    updateUI();
});

window.addEventListener('blur', () => {
    if (gameState.isStarted && !gameState.isPaused) {
        gameState.isPaused = true;
        pauseScreen.style.display = 'flex';
    }
});

pauseScreen.addEventListener('click', () => {
    gameState.isPaused = false;
    pauseScreen.style.display = 'none';
});

function updateUI() {
    uiContainer.innerHTML = `<strong>Voxel Defender</strong><br>❤️ Lives: <span style="color:#ff5252">${gameState.lives}</span> | 💰 Gold: <span style="color:#ffd700">${gameState.gold}</span> | 🌊 Wave: ${gameState.wave}<br><small>WASD: Move | Q/E: Rotate | R/F: Tilt | Scroll: Zoom | Click: Place Tower | 1-4: Select</small>`;
    towerBar.innerHTML = '';
    towerTypes.forEach((t, i) => {
        const btn = document.createElement('div');
        const isSelected = i === selectedTowerIndex;
        const canAfford = gameState.gold >= t.cost;
        btn.style.cssText = `width:80px; height:80px; border:3px solid ${isSelected ? '#ffffff' : (canAfford ? '#888888' : '#ff0000')}; background:${canAfford ? '#'+t.color.toString(16).padStart(6,'0') : '#333333'}; border-radius:8px; display:flex; flex-direction:column; align-items:center; justify-content:center; cursor:${canAfford ? 'pointer' : 'not-allowed'}; color:white; font-weight:bold; font-family:sans-serif; font-size:11px; text-shadow: 1px 1px 2px black;`;
        btn.innerHTML = `<span>${t.name}</span><span style="font-size:10px; margin-top:4px;">${t.cost}g</span>`;
        btn.onclick = () => { if (canAfford) selectedTowerIndex = i; updateUI(); };
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
            const isCastle = (gx >= 70 && gx <= 80 && gz >= 62 && gz <= 78);
            const isTown = (gx >= 2 && gx <= 12 && gz >= 54 && gz <= 68);
            const canBuild = !isPathCell && !occupied && !isCastle && !isTown && gameState.gold >= towerTypes[selectedTowerIndex].cost;
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
                const post = new THREE.Mesh(postGeo, postMat);
                post.position.set(pos[0], pos[1], pos[2]); post.castShadow = true; towerGroup.add(post);
            });
            const floor = new THREE.Mesh(new THREE.BoxGeometry(0.85, 0.08, 0.85), new THREE.MeshLambertMaterial({ color: 0x8d6e63 }));
            floor.position.y = 2.35; towerGroup.add(floor);
            const railGeo = new THREE.BoxGeometry(0.85, 0.25, 0.06);
            const railMat = new THREE.MeshLambertMaterial({ color: 0x6d4c41 });
            const railBack = new THREE.Mesh(railGeo, railMat);
            railBack.position.set(0, 2.6, -0.4); towerGroup.add(railBack);
            const railSideGeo = new THREE.BoxGeometry(0.06, 0.25, 0.85);
            const railL = new THREE.Mesh(railSideGeo, railMat); railL.position.set(-0.4, 2.6, 0); towerGroup.add(railL);
            const railR = new THREE.Mesh(railSideGeo, railMat); railR.position.set(0.4, 2.6, 0); towerGroup.add(railR);
            const roofGeo = new THREE.BoxGeometry(1.0, 0.08, 1.0);
            const roof = new THREE.Mesh(roofGeo, new THREE.MeshLambertMaterial({ color: 0x8b0000 }));
            roof.position.y = 2.85; roof.castShadow = true; towerGroup.add(roof);
            const vBody = new THREE.Mesh(new THREE.BoxGeometry(0.25, 0.35, 0.2), new THREE.MeshLambertMaterial({ color: 0x1976d2 }));
            vBody.position.set(0, 2.6, 0.1); towerGroup.add(vBody);
            const vHead = new THREE.Mesh(new THREE.BoxGeometry(0.2, 0.2, 0.2), new THREE.MeshLambertMaterial({ color: 0xffcc80 }));
            vHead.position.set(0, 2.85, 0.1); towerGroup.add(vHead);
            const bowGeo = new THREE.BoxGeometry(0.04, 0.4, 0.04);
            const bow = new THREE.Mesh(bowGeo, new THREE.MeshLambertMaterial({ color: 0x4e342e }));
            bow.position.set(0.2, 2.65, 0.25); bow.rotation.x = 0.3; towerGroup.add(bow);
            const arrowGeo = new THREE.BoxGeometry(0.02, 0.3, 0.02);
            const arrow = new THREE.Mesh(arrowGeo, new THREE.MeshLambertMaterial({ color: 0x8d6e63 }));
            arrow.position.set(0.2, 2.7, 0.35); arrow.rotation.x = 0.3; towerGroup.add(arrow);
        } else if (selectedTowerIndex === 1) {
            const baseMat = new THREE.MeshStandardMaterial({ color: 0x8d6e63, roughness: 0.8 });
            const base = new THREE.Mesh(new THREE.BoxGeometry(1.2, 0.6, 1.2), baseMat);
            base.position.y = 1.3; base.castShadow = true; towerGroup.add(base);
            const pillarGeo = new THREE.BoxGeometry(0.2, 1.2, 0.2);
            const pillarMat = new THREE.MeshStandardMaterial({ color: 0x5d4037, roughness: 0.9 });
            [[-0.45, 1.6, -0.45], [0.45, 1.6, -0.45], [-0.45, 1.6, 0.45], [0.45, 1.6, 0.45]].forEach(pos => {
                const pillar = new THREE.Mesh(pillarGeo, pillarMat);
                pillar.position.set(pos[0], pos[1], pos[2]); pillar.castShadow = true; towerGroup.add(pillar);
            });
            const floor = new THREE.Mesh(new THREE.BoxGeometry(1.1, 0.15, 1.1), new THREE.MeshStandardMaterial({ color: 0x795548 }));
            floor.position.y = 2.25; floor.castShadow = true; towerGroup.add(floor);
            const wallMat = new THREE.MeshStandardMaterial({ color: 0x616161 });
            const wallL = new THREE.Mesh(new THREE.BoxGeometry(0.15, 0.4, 1.0), wallMat); 
            wallL.position.set(-0.48, 2.55, 0); wallL.castShadow = true; towerGroup.add(wallL);
            const wallR = new THREE.Mesh(new THREE.BoxGeometry(0.15, 0.4, 1.0), wallMat); 
            wallR.position.set(0.48, 2.55, 0); wallR.castShadow = true; towerGroup.add(wallR);
            const wallBack = new THREE.Mesh(new THREE.BoxGeometry(1.0, 0.4, 0.15), wallMat); 
            wallBack.position.set(0, 2.55, -0.48); wallBack.castShadow = true; towerGroup.add(wallBack);
            const stock = new THREE.Mesh(new THREE.BoxGeometry(0.2, 0.15, 0.8), new THREE.MeshStandardMaterial({ color: 0x4e342e }));
            stock.position.set(0, 2.45, 0.15); stock.castShadow = true; towerGroup.add(stock);
            const bowArmMat = new THREE.MeshStandardMaterial({ color: 0x37474f, metalness: 0.6, roughness: 0.4 });
            const bowArmL = new THREE.Mesh(new THREE.BoxGeometry(0.1, 0.1, 0.6), bowArmMat);
            bowArmL.position.set(-0.15, 2.55, 0.0); bowArmL.rotation.z = 0.7; bowArmL.castShadow = true; towerGroup.add(bowArmL);
            const bowArmR = new THREE.Mesh(new THREE.BoxGeometry(0.1, 0.1, 0.6), bowArmMat);
            bowArmR.position.set(0.15, 2.55, 0.0); bowArmR.rotation.z = -0.7; bowArmR.castShadow = true; towerGroup.add(bowArmR);
            const string = new THREE.Mesh(new THREE.BoxGeometry(0.35, 0.03, 0.03), new THREE.MeshStandardMaterial({ color: 0xffffff }));
            string.position.set(0, 2.6, -0.15); towerGroup.add(string);
            const boltMat = new THREE.MeshStandardMaterial({ color: 0x8d6e63 });
            const bolt = new THREE.Mesh(new THREE.BoxGeometry(0.08, 0.08, 0.7), boltMat);
            bolt.position.set(0, 2.5, 0.25); bolt.castShadow = true; towerGroup.add(bolt);
            const tip = new THREE.Mesh(new THREE.ConeGeometry(0.1, 0.2, 4), new THREE.MeshStandardMaterial({ color: 0xb0bec5, metalness: 0.8 }));
            tip.position.set(0, 2.5, 0.65); tip.rotation.x = Math.PI / 2; towerGroup.add(tip);
            const fletch = new THREE.Mesh(new THREE.BoxGeometry(0.15, 0.1, 0.15), new THREE.MeshStandardMaterial({ color: 0xf44336 }));
            fletch.position.set(0, 2.5, -0.05); towerGroup.add(fletch);
            const rack = new THREE.Mesh(new THREE.BoxGeometry(0.3, 0.1, 0.25), new THREE.MeshStandardMaterial({ color: 0x3e2723 }));
            rack.position.set(-0.4, 2.4, -0.35); towerGroup.add(rack);
            for (let i = 0; i < 3; i++) {
                const extraBolt = new THREE.Mesh(new THREE.BoxGeometry(0.06, 0.06, 0.5), boltMat);
                extraBolt.position.set(-0.45 + i * 0.12, 2.48, -0.35); towerGroup.add(extraBolt);
            }
            const roof = new THREE.Mesh(new THREE.BoxGeometry(1.3, 0.1, 1.3), new THREE.MeshStandardMaterial({ color: 0xb71c1c }));
            roof.position.y = 2.9; roof.castShadow = true; towerGroup.add(roof);
            const flagPole = new THREE.Mesh(new THREE.BoxGeometry(0.05, 0.6, 0.05), new THREE.MeshStandardMaterial({ color: 0xffffff }));
            flagPole.position.set(0.5, 3.2, -0.5); towerGroup.add(flagPole);
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
            const crossGeo = new THREE.BoxGeometry(0.8, 0.08, 0.08);
            const cross1 = new THREE.Mesh(crossGeo, frameMat); cross1.position.set(0, 2.5, -0.35); towerGroup.add(cross1);
            const cross2 = new THREE.Mesh(crossGeo, frameMat); cross2.position.set(0, 2.5, 0.35); towerGroup.add(cross2);
            const crossSideGeo = new THREE.BoxGeometry(0.08, 0.08, 0.8);
            const cross3 = new THREE.Mesh(crossSideGeo, frameMat); cross3.position.set(-0.35, 2.5, 0); towerGroup.add(cross3);
            const cross4 = new THREE.Mesh(crossSideGeo, frameMat); cross4.position.set(0.35, 2.5, 0); towerGroup.add(cross4);
            const armGeo = new THREE.BoxGeometry(0.08, 0.08, 0.6);
            const armMat = new THREE.MeshLambertMaterial({ color: 0x3e2723 });
            const armL = new THREE.Mesh(armGeo, armMat); armL.position.set(-0.15, 2.3, 0.5); armL.rotation.x = 0.4; towerGroup.add(armL);
            const armR = new THREE.Mesh(armGeo, armMat); armR.position.set(0.15, 2.3, 0.5); armR.rotation.x = 0.4; towerGroup.add(armR);
            const boltGeo = new THREE.BoxGeometry(0.06, 0.06, 0.8);
            const bolt = new THREE.Mesh(boltGeo, new THREE.MeshLambertMaterial({ color: 0x8d6e63 }));
            bolt.position.set(0, 2.3, 0.6); bolt.rotation.x = 0.1; towerGroup.add(bolt);
            const tipGeo = new THREE.ConeGeometry(0.06, 0.15, 4);
            const tip = new THREE.Mesh(tipGeo, new THREE.MeshLambertMaterial({ color: 0x757575 }));
            tip.position.set(0, 2.35, 1.0); tip.rotation.x = Math.PI / 2 + 0.1; towerGroup.add(tip);
            const ropeGeo = new THREE.BoxGeometry(0.35, 0.03, 0.03);
            const rope = new THREE.Mesh(ropeGeo, new THREE.MeshLambertMaterial({ color: 0xd7ccc8 }));
            rope.position.set(0, 2.25, 0.35); towerGroup.add(rope);
        } else if (selectedTowerIndex === 3) {
            const baseGeo = new THREE.CylinderGeometry(0.45, 0.5, 1.5, 8);
            const baseMat = new THREE.MeshLambertMaterial({ color: 0x616161 });
            const base = new THREE.Mesh(baseGeo, baseMat);
            base.position.y = 1.75; base.castShadow = true; towerGroup.add(base);
            const ringGeo = new THREE.TorusGeometry(0.48, 0.04, 6, 12);
            const ringMat = new THREE.MeshLambertMaterial({ color: 0x424242 });
            const ring1 = new THREE.Mesh(ringGeo, ringMat); ring1.position.y = 1.3; ring1.rotation.x = Math.PI / 2; towerGroup.add(ring1);
            const ring2 = new THREE.Mesh(ringGeo, ringMat); ring2.position.y = 2.2; ring2.rotation.x = Math.PI / 2; towerGroup.add(ring2);
            const topGeo = new THREE.CylinderGeometry(0.5, 0.45, 0.15, 8);
            const top = new THREE.Mesh(topGeo, new THREE.MeshLambertMaterial({ color: 0x757575 }));
            top.position.y = 2.55; top.castShadow = true; towerGroup.add(top);
            const runeGeo = new THREE.BoxGeometry(0.08, 0.15, 0.02);
            const runeMat = new THREE.MeshBasicMaterial({ color: 0xaa00ff });
            for (let i = 0; i < 4; i++) {
                const angle = (i / 4) * Math.PI * 2;
                const rune = new THREE.Mesh(runeGeo, runeMat);
                rune.position.set(Math.sin(angle) * 0.47, 1.75, Math.cos(angle) * 0.47);
                rune.rotation.y = angle;
                towerGroup.add(rune);
            }
            const orbGeo = new THREE.OctahedronGeometry(0.2, 0);
            const orbMat = new THREE.MeshBasicMaterial({ color: 0xcc00ff });
            const orb = new THREE.Mesh(orbGeo, orbMat);
            orb.position.y = 3.0; towerGroup.add(orb);
            const glowRingGeo = new THREE.TorusGeometry(0.25, 0.03, 6, 16);
            const glowRingMat = new THREE.MeshBasicMaterial({ color: 0x9c27b0, transparent: true, opacity: 0.6 });
            const glowRing = new THREE.Mesh(glowRingGeo, glowRingMat);
            glowRing.position.y = 3.0; glowRing.rotation.x = Math.PI / 2; towerGroup.add(glowRing);
            const particleGeo = new THREE.BoxGeometry(0.06, 0.06, 0.06);
            const particleMat = new THREE.MeshBasicMaterial({ color: 0xe040fb });
            [[0.3, 2.7, 0.2], [-0.25, 2.8, -0.3], [0.15, 3.0, -0.2], [-0.3, 2.6, 0.25]].forEach(pos => {
                const p = new THREE.Mesh(particleGeo, particleMat);
                p.position.set(pos[0], pos[1], pos[2]); towerGroup.add(p);
            });
        }
        
        scene.add(towerGroup);
        
        const tHpBg = new THREE.Mesh(
            new THREE.PlaneGeometry(0.8, 0.1),
            new THREE.MeshBasicMaterial({ color: 0x222222, side: THREE.DoubleSide, depthTest: false })
        );
        tHpBg.position.y = 2.2; tHpBg.renderOrder = 999; towerGroup.add(tHpBg);
        const tHpBar = new THREE.Mesh(
            new THREE.PlaneGeometry(0.76, 0.07),
            new THREE.MeshBasicMaterial({ color: 0x4caf50, side: THREE.DoubleSide, depthTest: false })
        );
        tHpBar.position.y = 2.2; tHpBar.position.z = 0.01; tHpBar.renderOrder = 1000; towerGroup.add(tHpBar);

        towers.push({
            mesh: towerGroup,
            type: type,
            cooldown: 0,
            gx: gx, gz: gz,
            health: type.health,
            maxHealth: type.health,
            hpBar: tHpBar,
            hpBg: tHpBg
        });
    }
});

// --- Enemy Spawning ---
function spawnEnemy() {
    const wave = gameState.wave;
    let type = 'orc';
    let hp = 30 + wave * 5;
    let speed = 3 + wave * 0.1;
    let reward = 5;
    let color = materials.green;

    if (wave >= 3 && Math.random() < 0.4) { type = 'skeleton'; hp = 50 + wave * 8; speed = 4; reward = 10; color = materials.white; }
    if (wave >= 5 && Math.random() < 0.2) { type = 'wizard'; hp = 120 + wave * 15; speed = 2.5; reward = 25; color = materials.purple; }
    if (wave >= 8 && wave % 5 === 0 && gameState.enemiesRemainingToSpawn === 1) { type = 'dragon'; hp = 500 + wave * 50; speed = 1.5; reward = 100; color = materials.red; }

    const enemyGroup = new THREE.Group();
    const size = type === 'dragon' ? 1.8 : 1;
    const s = size;

    if (type === 'orc') {
        const body = new THREE.Mesh(new THREE.BoxGeometry(0.7 * s, 0.8 * s, 0.6 * s), color);
        body.position.y = 0.8 * s; body.castShadow = true; enemyGroup.add(body);
        const head = new THREE.Mesh(new THREE.BoxGeometry(0.5 * s, 0.45 * s, 0.5 * s), color);
        head.position.y = 1.45 * s; head.castShadow = true; enemyGroup.add(head);
        const tuskGeo = new THREE.BoxGeometry(0.06 * s, 0.15 * s, 0.06 * s);
        const tuskL = new THREE.Mesh(tuskGeo, materials.white); tuskL.position.set(0.15 * s, 1.3 * s, 0.25 * s); enemyGroup.add(tuskL);
        const tuskR = new THREE.Mesh(tuskGeo, materials.white); tuskR.position.set(-0.15 * s, 1.3 * s, 0.25 * s); enemyGroup.add(tuskR);
        const eyeGeo = new THREE.BoxGeometry(0.08 * s, 0.08 * s, 0.05 * s);
        const eyeMat = new THREE.MeshBasicMaterial({ color: 0xff4444 });
        const eyeL = new THREE.Mesh(eyeGeo, eyeMat); eyeL.position.set(0.15 * s, 1.5 * s, 0.25 * s); enemyGroup.add(eyeL);
        const eyeR = new THREE.Mesh(eyeGeo, eyeMat); eyeR.position.set(-0.15 * s, 1.5 * s, 0.25 * s); enemyGroup.add(eyeR);
        const legGeo = new THREE.BoxGeometry(0.2 * s, 0.4 * s, 0.22 * s);
        const legMat = new THREE.MeshLambertMaterial({ color: 0x2e7d32 });
        [[-0.2, 0.2, 0.1], [0.2, 0.2, 0.1], [-0.2, 0.2, -0.1], [0.2, 0.2, -0.1]].forEach(pos => {
            const leg = new THREE.Mesh(legGeo, legMat); leg.position.set(pos[0] * s, pos[1] * s, pos[2] * s); leg.castShadow = true; enemyGroup.add(leg);
        });
        const armGeo = new THREE.BoxGeometry(0.18 * s, 0.6 * s, 0.2 * s);
        const armMat = new THREE.MeshLambertMaterial({ color: 0x388e3c });
        const armL = new THREE.Mesh(armGeo, armMat); armL.position.set(-0.45 * s, 0.85 * s, 0); armL.castShadow = true; enemyGroup.add(armL);
        const armR = new THREE.Mesh(armGeo, armMat); armR.position.set(0.45 * s, 0.85 * s, 0); armR.castShadow = true; enemyGroup.add(armR);
        const axeHandle = new THREE.Mesh(new THREE.BoxGeometry(0.06 * s, 0.8 * s, 0.06 * s), materials.wood);
        axeHandle.position.set(0.45 * s, 1.0 * s, 0.2 * s); axeHandle.rotation.x = 0.2; enemyGroup.add(axeHandle);
        const axeBlade = new THREE.Mesh(new THREE.BoxGeometry(0.3 * s, 0.25 * s, 0.04 * s), materials.stone);
        axeBlade.position.set(0.45 * s, 1.4 * s, 0.25 * s); axeBlade.rotation.x = 0.2; enemyGroup.add(axeBlade);
    } else if (type === 'skeleton') {
        const ribcage = new THREE.Mesh(new THREE.BoxGeometry(0.55 * s, 0.6 * s, 0.35 * s), materials.white);
        ribcage.position.y = 0.9 * s; ribcage.castShadow = true; enemyGroup.add(ribcage);
        const skull = new THREE.Mesh(new THREE.BoxGeometry(0.4 * s, 0.4 * s, 0.4 * s), materials.white);
        skull.position.y = 1.4 * s; skull.castShadow = true; enemyGroup.add(skull);
        const socketGeo = new THREE.BoxGeometry(0.1 * s, 0.1 * s, 0.1 * s);
        const socketL = new THREE.Mesh(socketGeo, materials.black); socketL.position.set(0.12 * s, 1.45 * s, 0.18 * s); enemyGroup.add(socketL);
        const socketR = new THREE.Mesh(socketGeo, materials.black); socketR.position.set(-0.12 * s, 1.45 * s, 0.18 * s); enemyGroup.add(socketR);
        const jaw = new THREE.Mesh(new THREE.BoxGeometry(0.3 * s, 0.12 * s, 0.2 * s), materials.white);
        jaw.position.set(0, 1.2 * s, 0.15 * s); enemyGroup.add(jaw);
        const spine = new THREE.Mesh(new THREE.BoxGeometry(0.1 * s, 0.5 * s, 0.1 * s), materials.white);
        spine.position.y = 0.85 * s; enemyGroup.add(spine);
        const boneLegGeo = new THREE.BoxGeometry(0.12 * s, 0.5 * s, 0.12 * s);
        [[-0.18, 0.25, 0.1], [0.18, 0.25, 0.1], [-0.18, 0.25, -0.1], [0.18, 0.25, -0.1]].forEach(pos => {
            const bone = new THREE.Mesh(boneLegGeo, materials.white); bone.position.set(pos[0] * s, pos[1] * s, pos[2] * s); bone.castShadow = true; enemyGroup.add(bone);
        });
        const boneArmGeo = new THREE.BoxGeometry(0.1 * s, 0.5 * s, 0.1 * s);
        const boneArmL = new THREE.Mesh(boneArmGeo, materials.white); boneArmL.position.set(-0.35 * s, 0.9 * s, 0); boneArmL.rotation.z = 0.15; enemyGroup.add(boneArmL);
        const boneArmR = new THREE.Mesh(boneArmGeo, materials.white); boneArmR.position.set(0.35 * s, 0.9 * s, 0); boneArmR.rotation.z = -0.15; enemyGroup.add(boneArmR);
    } else if (type === 'wizard') {
        const robeBottom = new THREE.Mesh(new THREE.BoxGeometry(0.6 * s, 0.5 * s, 0.6 * s), color);
        robeBottom.position.y = 0.4 * s; robeBottom.castShadow = true; enemyGroup.add(robeBottom);
        const robeTop = new THREE.Mesh(new THREE.BoxGeometry(0.45 * s, 0.5 * s, 0.45 * s), color);
        robeTop.position.y = 0.9 * s; robeTop.castShadow = true; enemyGroup.add(robeTop);
        const head = new THREE.Mesh(new THREE.BoxGeometry(0.35 * s, 0.35 * s, 0.35 * s), materials.skin);
        head.position.y = 1.32 * s; head.castShadow = true; enemyGroup.add(head);
        const hatBase = new THREE.Mesh(new THREE.BoxGeometry(0.4 * s, 0.08 * s, 0.4 * s), new THREE.MeshLambertMaterial({ color: 0x6a1b9a }));
        hatBase.position.y = 1.52 * s; enemyGroup.add(hatBase);
        const hatMid = new THREE.Mesh(new THREE.BoxGeometry(0.28 * s, 0.15 * s, 0.28 * s), new THREE.MeshLambertMaterial({ color: 0x7b1fa2 }));
        hatMid.position.y = 1.64 * s; enemyGroup.add(hatMid);
        const hatTop = new THREE.Mesh(new THREE.BoxGeometry(0.12 * s, 0.2 * s, 0.12 * s), new THREE.MeshLambertMaterial({ color: 0x8e24aa }));
        hatTop.position.y = 1.82 * s; enemyGroup.add(hatTop);
        const eyeGeo = new THREE.BoxGeometry(0.06 * s, 0.06 * s, 0.05 * s);
        const eyeMat = new THREE.MeshBasicMaterial({ color: 0x00ffff });
        const eyeL = new THREE.Mesh(eyeGeo, eyeMat); eyeL.position.set(0.1 * s, 1.35 * s, 0.17 * s); enemyGroup.add(eyeL);
        const eyeR = new THREE.Mesh(eyeGeo, eyeMat); eyeR.position.set(-0.1 * s, 1.35 * s, 0.17 * s); enemyGroup.add(eyeR);
        const staffBase = new THREE.Mesh(new THREE.BoxGeometry(0.07 * s, 1.3 * s, 0.07 * s), materials.wood);
        staffBase.position.set(0.3 * s, 0.75 * s, 0.1 * s); staffBase.castShadow = true; enemyGroup.add(staffBase);
        const orb = new THREE.Mesh(new THREE.SphereGeometry(0.12 * s, 8, 8), new THREE.MeshBasicMaterial({ color: 0xaa00ff }));
        orb.position.set(0.3 * s, 1.45 * s, 0.1 * s); enemyGroup.add(orb);
    } else if (type === 'dragon') {
        const body = new THREE.Mesh(new THREE.BoxGeometry(1.2 * s, 1.0 * s, 2.0 * s), color);
        body.position.y = 1.5 * s; body.castShadow = true; enemyGroup.add(body);
        const neck = new THREE.Mesh(new THREE.BoxGeometry(0.6 * s, 0.5 * s, 0.8 * s), color);
        neck.position.set(0, 1.8 * s, 1.2 * s); neck.rotation.x = -0.3; enemyGroup.add(neck);
        const head = new THREE.Mesh(new THREE.BoxGeometry(0.7 * s, 0.6 * s, 0.9 * s), color);
        head.position.set(0, 2.2 * s, 1.7 * s); head.castShadow = true; enemyGroup.add(head);
        const snout = new THREE.Mesh(new THREE.BoxGeometry(0.5 * s, 0.35 * s, 0.5 * s), color);
        snout.position.set(0, 2.1 * s, 2.2 * s); enemyGroup.add(snout);
        const eyeGeo = new THREE.BoxGeometry(0.15 * s, 0.15 * s, 0.08 * s);
        const eyeMat = new THREE.MeshBasicMaterial({ color: 0xffaa00 });
        const eyeL = new THREE.Mesh(eyeGeo, eyeMat); eyeL.position.set(0.22 * s, 2.3 * s, 1.8 * s); enemyGroup.add(eyeL);
        const eyeR = new THREE.Mesh(eyeGeo, eyeMat); eyeR.position.set(-0.22 * s, 2.3 * s, 1.8 * s); enemyGroup.add(eyeR);
        const hornGeo = new THREE.BoxGeometry(0.15 * s, 0.4 * s, 0.15 * s);
        const hornL = new THREE.Mesh(hornGeo, new THREE.MeshLambertMaterial({ color: 0x424242 }));
        hornL.position.set(0.25 * s, 2.6 * s, 1.6 * s); hornL.rotation.z = 0.2; enemyGroup.add(hornL);
        const hornR = new THREE.Mesh(hornGeo, new THREE.MeshLambertMaterial({ color: 0x424242 }));
        hornR.position.set(-0.25 * s, 2.6 * s, 1.6 * s); hornR.rotation.z = -0.2; enemyGroup.add(hornR);
        const wingGeo = new THREE.BoxGeometry(1.5 * s, 0.1 * s, 1.2 * s);
        const wingMat = new THREE.MeshLambertMaterial({ color: 0xb71c1c });
        const wingL = new THREE.Mesh(wingGeo, wingMat); wingL.position.set(-1.4 * s, 2.0 * s, 0); wingL.rotation.z = 0.15; wingL.castShadow = true; enemyGroup.add(wingL);
        const wingR = new THREE.Mesh(wingGeo, wingMat); wingR.position.set(1.4 * s, 2.0 * s, 0); wingR.rotation.z = -0.15; wingR.castShadow = true; enemyGroup.add(wingR);
        const tailBase = new THREE.Mesh(new THREE.BoxGeometry(0.5 * s, 0.5 * s, 1.5 * s), color);
        tailBase.position.set(0, 1.3 * s, -1.5 * s); enemyGroup.add(tailBase);
        const tailMid = new THREE.Mesh(new THREE.BoxGeometry(0.35 * s, 0.35 * s, 1.2 * s), color);
        tailMid.position.set(0, 1.0 * s, -2.5 * s); enemyGroup.add(tailMid);
        const tailTip = new THREE.Mesh(new THREE.BoxGeometry(0.2 * s, 0.2 * s, 0.8 * s), color);
        tailTip.position.set(0, 0.8 * s, -3.3 * s); enemyGroup.add(tailTip);
        const legGeo = new THREE.BoxGeometry(0.35 * s, 0.6 * s, 0.35 * s);
        const legMat = new THREE.MeshLambertMaterial({ color: 0xb71c1c });
        [[-0.45, 0.3, 0.7], [0.45, 0.3, 0.7], [-0.45, 0.3, -0.7], [0.45, 0.3, -0.7]].forEach(pos => {
            const leg = new THREE.Mesh(legGeo, legMat); leg.position.set(pos[0] * s, pos[1] * s, pos[2] * s); leg.castShadow = true; enemyGroup.add(leg);
        });
    }

    const hpBg = new THREE.Mesh(
        new THREE.PlaneGeometry(size * 1.2, 0.15),
        new THREE.MeshBasicMaterial({ color: 0x222222, side: THREE.DoubleSide, depthTest: false })
    );
    hpBg.position.y = size * 3.2; hpBg.renderOrder = 999; enemyGroup.add(hpBg);

    const hpBar = new THREE.Mesh(
        new THREE.PlaneGeometry(size * 1.16, 0.11),
        new THREE.MeshBasicMaterial({ color: 0xff3333, side: THREE.DoubleSide, depthTest: false })
    );
    hpBar.position.y = size * 3.2; hpBar.position.z = 0.01; hpBar.renderOrder = 1000; enemyGroup.add(hpBar);

    enemyGroup.position.copy(waypoints[0]);
    enemyGroup.position.y = type === 'dragon' ? 12 : 0;
    scene.add(enemyGroup);

    let attackRange = 0;
    let attackDamage = 0;
    let attackCooldown = 0;
    let attackType = 'none';

    if (type === 'orc') {
        attackRange = 1.5; attackDamage = 8 + wave * 2; attackCooldown = 1.5; attackType = 'melee';
    } else if (type === 'skeleton') {
        attackRange = 12; attackDamage = 5 + wave; attackCooldown = 2.0; attackType = 'ranged';
    } else if (type === 'wizard') {
        attackRange = 10; attackDamage = 12 + wave * 2; attackCooldown = 3.0; attackType = 'spell';
    } else if (type === 'dragon') {
        attackRange = 20; attackDamage = 25 + wave * 5; attackCooldown = Math.max(2.0, 5.0 - wave * 0.3); attackType = 'dragon_fire';
    }

    enemies.push({
        mesh: enemyGroup, hpBar: hpBar,
        hp: hp, maxHp: hp,
        speed: speed, baseSpeed: speed,
        reward: reward,
        waypointIndex: 0,
        slowTimer: 0,
        size: size, type: type,
        attackRange: attackRange,
        attackDamage: attackDamage,
        attackCooldown: attackCooldown,
        attackTimer: 0,
        attackType: attackType
    });
}

function shootProjectile(tower, target) {
    const type = tower.type;
    const isArrow = (tower.type.name === 'Crossbow' || tower.type.name === 'Archer' || tower.type.name === 'Ballista');
    let mesh;
    
    if (isArrow) {
        const arrowGroup = new THREE.Group();
        const shaftGeo = new THREE.CylinderGeometry(0.04, 0.04, 0.6, 6);
        const shaftMat = new THREE.MeshLambertMaterial({ color: 0x8d6e63 });
        const shaft = new THREE.Mesh(shaftGeo, shaftMat);
        shaft.rotation.x = Math.PI / 2;
        arrowGroup.add(shaft);
        const tipGeo = new THREE.ConeGeometry(0.08, 0.15, 6);
        const tipMat = new THREE.MeshLambertMaterial({ color: 0x9e9e9e });
        const tip = new THREE.Mesh(tipGeo, tipMat);
        tip.position.z = 0.35;
        tip.rotation.x = Math.PI / 2;
        arrowGroup.add(tip);
        const fletchGeo = new THREE.BoxGeometry(0.12, 0.02, 0.12);
        const fletchMat = new THREE.MeshLambertMaterial({ color: 0xd32f2f });
        const fletch = new THREE.Mesh(fletchGeo, fletchMat);
        fletch.position.z = -0.25;
        arrowGroup.add(fletch);
        mesh = arrowGroup;
    } else if (type.splash) {
        mesh = new THREE.Mesh(new THREE.SphereGeometry(0.25, 8, 8), new THREE.MeshLambertMaterial({ color: 0x212121 }));
    } else {
        mesh = new THREE.Mesh(new THREE.SphereGeometry(0.2, 8, 8), new THREE.MeshBasicMaterial({ color: 0xcc00ff }));
    }
    
    mesh.position.copy(tower.mesh.position);
    mesh.position.y += 1.5;
    scene.add(mesh);
    
    projectiles.push({
        mesh: mesh, target: target,
        damage: type.damage, speed: type.projectileSpeed,
        splash: type.splash || false, slow: type.slow || false,
        isHoming: true,
        isArrow: isArrow
    });
}

// --- Animation Loop ---
const clock = new THREE.Clock();

function animate() {
    requestAnimationFrame(animate);
    const delta = Math.min(clock.getDelta(), 0.1);
    const time = clock.getElapsedTime();

    if (gameState.isPaused) {
        renderer.render(scene, camera);
        return;
    }

    handleCameraMovement(delta);

    if (!gameState.isWaveActive && gameState.enemiesRemainingToSpawn === 0 && enemies.length === 0) {
        if (time % 5 < 0.02 || gameState.wave === 1) {
            gameState.isWaveActive = true;
            gameState.enemiesRemainingToSpawn = 5 + Math.floor(gameState.wave * 1.5);
        }
    }

    if (gameState.isWaveActive && gameState.enemiesRemainingToSpawn > 0) {
        gameState.spawnTimer -= delta;
        if (gameState.spawnTimer <= 0) {
            spawnEnemy();
            gameState.enemiesRemainingToSpawn--;
            gameState.spawnTimer = gameState.spawnInterval;
        }
    } else if (gameState.isWaveActive && gameState.enemiesRemainingToSpawn === 0 && enemies.length === 0) {
        gameState.isWaveActive = false;
        gameState.wave++;
        gameState.gold += 50;
        updateUI();
    }

    for (let i = enemies.length - 1; i >= 0; i--) {
        const enemy = enemies[i];
        if (enemy.slowTimer > 0) { enemy.slowTimer -= delta; enemy.speed = enemy.baseSpeed * 0.5; }
        else { enemy.speed = enemy.baseSpeed; }

        const targetWp = waypoints[enemy.waypointIndex + 1];
        if (!targetWp) {
            gameState.lives--;
            updateUI();
            scene.remove(enemy.mesh);
            enemies.splice(i, 1);
            if (gameState.lives <= 0) {
                if (gameState.isStarted) {
                    alert('Game Over! Refresh to restart.');
                    location.reload();
                } else {
                    gameState.lives = 20; // Reset for splash screen demo
                }
            }
            continue;
        }

        const dir = new THREE.Vector3().subVectors(targetWp, enemy.mesh.position);
        dir.y = 0;
        const dist = dir.length();
        dir.normalize();

        if (dist < enemy.speed * delta) {
            enemy.mesh.position.copy(targetWp);
            enemy.waypointIndex++;
        } else {
            enemy.mesh.position.add(dir.multiplyScalar(enemy.speed * delta));
            if (enemy.type === 'dragon') {
                enemy.mesh.position.y = 12;
            }
            enemy.mesh.lookAt(new THREE.Vector3(targetWp.x, enemy.mesh.position.y, targetWp.z));
        }

        enemy.hpBar.scale.x = Math.max(0, enemy.hp / enemy.maxHp);
    }

    towers.forEach(tower => {
        tower.cooldown -= delta;
        if (tower.cooldown <= 0) {
            let closest = null;
            let minDst = Infinity;
            for (const enemy of enemies) {
                const dst = enemy.mesh.position.distanceTo(tower.mesh.position);
                if (dst <= tower.type.range && dst < minDst) { minDst = dst; closest = enemy; }
            }
            if (closest) {
                shootProjectile(tower, closest);
                tower.cooldown = tower.type.fireRate;
            }
        }
    });

    for (const enemy of enemies) {
        enemy.attackTimer -= delta;
        if (enemy.attackTimer > 0) continue;

        if (enemy.attackType === 'melee') {
            for (const tower of towers) {
                const dist = enemy.mesh.position.distanceTo(tower.mesh.position);
                if (dist < enemy.attackRange + 0.5) {
                    tower.health -= enemy.attackDamage;
                    enemy.attackTimer = enemy.attackCooldown;
                    tower.mesh.children.forEach(c => {
                        if (c.material && c.material.emissive) {
                            c.material.emissive.setHex(0xff0000);
                            setTimeout(() => { if (c.material) c.material.emissive.setHex(0x000000); }, 100);
                        }
                    });
                    break;
                }
            }
        } else if (enemy.attackType === 'ranged') {
            let nearestTower = null;
            let nearestDist = enemy.attackRange;
            for (const tower of towers) {
                const dist = enemy.mesh.position.distanceTo(tower.mesh.position);
                if (dist < nearestDist) { nearestDist = dist; nearestTower = tower; }
            }
            if (nearestTower) {
                enemy.attackTimer = enemy.attackCooldown;
                const arrowGroup = new THREE.Group();
                const shaft = new THREE.Mesh(new THREE.CylinderGeometry(0.03, 0.03, 0.4, 6), new THREE.MeshLambertMaterial({ color: 0x8d6e63 }));
                shaft.rotation.x = Math.PI / 2; arrowGroup.add(shaft);
                const tip = new THREE.Mesh(new THREE.ConeGeometry(0.05, 0.1, 4), new THREE.MeshLambertMaterial({ color: 0x9e9e9e }));
                tip.position.z = 0.22; tip.rotation.x = Math.PI / 2; arrowGroup.add(tip);
                arrowGroup.position.copy(enemy.mesh.position);
                arrowGroup.position.y += 1.0;
                scene.add(arrowGroup);
                projectiles.push({
                    mesh: arrowGroup, target: nearestTower,
                    damage: enemy.attackDamage, speed: 20,
                    splash: false, slow: false,
                    isHoming: true, isArrow: true,
                    isEnemyProjectile: true
                });
            }
        } else if (enemy.attackType === 'spell') {
            enemy.attackTimer = enemy.attackCooldown;
            const spellOrigin = enemy.mesh.position.clone();
            spellOrigin.y += 1.5;
            const ringGeo = new THREE.TorusGeometry(0.3, 0.05, 6, 16);
            const ringMat = new THREE.MeshBasicMaterial({ color: 0xaa00ff, transparent: true, opacity: 0.8 });
            const spellRing = new THREE.Mesh(ringGeo, ringMat);
            spellRing.position.copy(spellOrigin);
            spellRing.rotation.x = Math.PI / 2;
            scene.add(spellRing);
            projectiles.push({
                mesh: spellRing, target: null,
                damage: enemy.attackDamage, speed: 8,
                splash: true, slow: false,
                isHoming: false, isArrow: false,
                isEnemyProjectile: true, isSpell: true,
                origin: spellOrigin.clone(), maxRange: enemy.attackRange,
                towers: [...towers]
            });
        } else if (enemy.attackType === 'dragon_fire') {
            let nearestTower = null;
            let nearestDist = enemy.attackRange;
            for (const tower of towers) {
                const dist = enemy.mesh.position.distanceTo(tower.mesh.position);
                if (dist < nearestDist) { nearestDist = dist; nearestTower = tower; }
            }
            if (nearestTower) {
                enemy.attackTimer = enemy.attackCooldown;
                const fireball = new THREE.Mesh(
                    new THREE.SphereGeometry(0.3, 8, 8),
                    new THREE.MeshBasicMaterial({ color: 0xff4400 })
                );
                fireball.position.copy(enemy.mesh.position);
                fireball.position.y += 2.0;
                scene.add(fireball);
                const trail = new THREE.Mesh(
                    new THREE.SphereGeometry(0.15, 6, 6),
                    new THREE.MeshBasicMaterial({ color: 0xffaa00, transparent: true, opacity: 0.6 })
                );
                fireball.add(trail);
                projectiles.push({
                    mesh: fireball, target: nearestTower,
                    damage: enemy.attackDamage, speed: 12,
                    splash: true, slow: false,
                    isHoming: true, isArrow: false,
                    isEnemyProjectile: true, splashRadius: 3
                });
            }
        }
    }

    for (let i = projectiles.length - 1; i >= 0; i--) {
        const p = projectiles[i];

        if (p.isSpell) {
            const currentRadius = p.mesh.geometry.parameters?.radius || 0.3;
            const newRadius = currentRadius + p.speed * delta;
            p.mesh.geometry.dispose();
            p.mesh.geometry = new THREE.TorusGeometry(newRadius, 0.05, 6, 16);
            p.mesh.material.opacity = Math.max(0, 0.8 * (1 - newRadius / p.maxRange));

            const distFromOrigin = newRadius;
            const damageAtRange = p.damage * Math.max(0, 1 - distFromOrigin / p.maxRange);
            if (damageAtRange > 0.5) {
                for (const tower of p.towers) {
                    if (!towers.includes(tower)) continue;
                    const dist = tower.mesh.position.distanceTo(p.origin);
                    if (Math.abs(dist - newRadius) < 1.0) {
                        tower.health -= damageAtRange * delta * 3;
                    }
                }
            }

            if (newRadius >= p.maxRange || p.mesh.material.opacity <= 0) {
                scene.remove(p.mesh); projectiles.splice(i, 1);
            }
            continue;
        }

        let targetPos;
        if (p.isEnemyProjectile && p.target && towers.includes(p.target)) {
            targetPos = p.target.mesh.position.clone();
            targetPos.y += 1.0;
        } else if (p.isHoming && enemies.includes(p.target)) {
            targetPos = p.target.mesh.position.clone();
            targetPos.y += p.target.size * 0.8;
        } else if (p.target) {
            targetPos = p.target.mesh.position.clone();
            targetPos.y += p.target.size * 0.8;
        } else {
            scene.remove(p.mesh); projectiles.splice(i, 1); continue;
        }

        const dir = new THREE.Vector3().subVectors(targetPos, p.mesh.position);
        const dist = dir.length();
        const moveDist = p.speed * delta;
        
        if (dist < moveDist + 0.3) {
            if (p.isEnemyProjectile) {
                if (p.target && towers.includes(p.target)) {
                    if (p.splash && p.splashRadius) {
                        for (const tower of towers) {
                            const tDist = tower.mesh.position.distanceTo(targetPos);
                            if (tDist < p.splashRadius) {
                                tower.health -= p.damage * (1 - tDist / p.splashRadius);
                            }
                        }
                    } else {
                        p.target.health -= p.damage;
                    }
                }
            } else {
                if (p.splash) {
                    enemies.forEach(e => {
                        if (e.mesh.position.distanceTo(targetPos) < 4) e.hp -= p.damage;
                    });
                } else {
                    if (enemies.includes(p.target)) {
                        p.target.hp -= p.damage;
                        if (p.slow) p.target.slowTimer = 2;
                    }
                }
            }

            scene.remove(p.mesh); projectiles.splice(i, 1);

            for (let j = enemies.length - 1; j >= 0; j--) {
                if (enemies[j].hp <= 0) {
                    gameState.gold += enemies[j].reward;
                    updateUI();
                    scene.remove(enemies[j].mesh);
                    enemies.splice(j, 1);
                }
            }

            for (let j = towers.length - 1; j >= 0; j--) {
                if (towers[j].health <= 0) {
                    scene.remove(towers[j].mesh);
                    towers.splice(j, 1);
                }
            }
        } else {
            dir.normalize();
            p.mesh.position.add(dir.multiplyScalar(moveDist));
            if (p.isArrow) {
                p.mesh.lookAt(targetPos);
            }
            if (p.isEnemyProjectile && p.splashRadius) {
                p.mesh.material.color.setHex(Math.random() > 0.5 ? 0xff4400 : 0xffaa00);
            }
        }
    }

    for (const tower of towers) {
        const hpRatio = Math.max(0, tower.health / tower.maxHealth);
        tower.hpBar.scale.x = hpRatio;
        tower.hpBar.material.color.setHex(hpRatio > 0.5 ? 0x4caf50 : (hpRatio > 0.25 ? 0xff9800 : 0xf44336));
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

animate();