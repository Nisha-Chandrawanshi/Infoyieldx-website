// Hero Section 3D Animation
function initHero3D() {
    const container = document.getElementById('hero3d');
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, container.clientWidth / container.clientHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    
    renderer.setSize(container.clientWidth, container.clientHeight);
    container.appendChild(renderer.domElement);

    // Create a modern geometric shape
    const geometry = new THREE.TorusKnotGeometry(1, 0.3, 200, 32);
    const material = new THREE.MeshPhongMaterial({
        color: '#2563eb',
        wireframe: true,
        transparent: true,
        opacity: 0.8,
        shininess: 100
    });

    const mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);

    // Add lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
    scene.add(ambientLight);

    const pointLight1 = new THREE.PointLight(0xffffff, 1);
    pointLight1.position.set(2, 2, 2);
    scene.add(pointLight1);

    const pointLight2 = new THREE.PointLight(0x3b82f6, 0.8);
    pointLight2.position.set(-2, -2, -2);
    scene.add(pointLight2);

    camera.position.z = 3;

    // Animation
    function animate() {
        requestAnimationFrame(animate);
        mesh.rotation.x += 0.003;
        mesh.rotation.y += 0.003;
        renderer.render(scene, camera);
    }

    animate();

    // Handle resize
    window.addEventListener('resize', () => {
        camera.aspect = container.clientWidth / container.clientHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(container.clientWidth, container.clientHeight);
    });
}

// Service Cards 3D Animations
function initService3D() {
    const serviceCards = document.querySelectorAll('.service-3d');
    
    serviceCards.forEach(card => {
        const canvas = card.querySelector('canvas');
        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(75, canvas.clientWidth / canvas.clientHeight, 0.1, 1000);
        const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
        
        renderer.setSize(canvas.clientWidth, canvas.clientHeight);

        // Create modern geometric shapes for each service
        let geometry;
        switch(card.dataset.service) {
            case 'web':
                geometry = new THREE.TorusKnotGeometry(0.3, 0.1, 100, 16);
                break;
            case 'app':
                geometry = new THREE.DodecahedronGeometry(0.3, 1);
                break;
            case 'design':
                geometry = new THREE.OctahedronGeometry(0.3, 2);
                break;
            case 'database':
                geometry = new THREE.TorusGeometry(0.3, 0.1, 32, 100);
                break;
            case 'accounting':
                geometry = new THREE.IcosahedronGeometry(0.3, 1);
                break;
            case 'ai':
                geometry = new THREE.TetrahedronGeometry(0.3, 2);
                break;
        }

        const material = new THREE.MeshPhongMaterial({
            color: '#2563eb',
            wireframe: true,
            transparent: true,
            opacity: 0.8,
            shininess: 100
        });

        const mesh = new THREE.Mesh(geometry, material);
        scene.add(mesh);

        // Add lights
        const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
        scene.add(ambientLight);

        const pointLight1 = new THREE.PointLight(0xffffff, 1);
        pointLight1.position.set(1, 1, 1);
        scene.add(pointLight1);

        const pointLight2 = new THREE.PointLight(0x3b82f6, 0.8);
        pointLight2.position.set(-1, -1, -1);
        scene.add(pointLight2);

        camera.position.z = 1.5;

        // Animation
        function animate() {
            requestAnimationFrame(animate);
            mesh.rotation.x += 0.008;
            mesh.rotation.y += 0.008;
            renderer.render(scene, camera);
        }

        animate();

        // Handle resize
        window.addEventListener('resize', () => {
            camera.aspect = canvas.clientWidth / canvas.clientHeight;
            camera.updateProjectionMatrix();
            renderer.setSize(canvas.clientWidth, canvas.clientHeight);
        });
    });
}

// Timeline 3D Animations
function initTimeline3D() {
    const timelineItems = document.querySelectorAll('.timeline-3d');
    
    timelineItems.forEach(item => {
        const canvas = item.querySelector('canvas');
        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(75, canvas.clientWidth / canvas.clientHeight, 0.1, 1000);
        const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
        
        renderer.setSize(canvas.clientWidth, canvas.clientHeight);

        // Create a modern geometric shape for each year
        const geometry = new THREE.DodecahedronGeometry(0.3, 1);
        const material = new THREE.MeshPhongMaterial({
            color: '#2563eb',
            wireframe: true,
            transparent: true,
            opacity: 0.8,
            shininess: 100
        });

        const mesh = new THREE.Mesh(geometry, material);
        scene.add(mesh);

        // Add lights
        const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
        scene.add(ambientLight);

        const pointLight1 = new THREE.PointLight(0xffffff, 1);
        pointLight1.position.set(1, 1, 1);
        scene.add(pointLight1);

        const pointLight2 = new THREE.PointLight(0x3b82f6, 0.8);
        pointLight2.position.set(-1, -1, -1);
        scene.add(pointLight2);

        camera.position.z = 1.5;

        // Animation
        function animate() {
            requestAnimationFrame(animate);
            mesh.rotation.x += 0.008;
            mesh.rotation.y += 0.008;
            renderer.render(scene, camera);
        }

        animate();

        // Handle resize
        window.addEventListener('resize', () => {
            camera.aspect = canvas.clientWidth / canvas.clientHeight;
            camera.updateProjectionMatrix();
            renderer.setSize(canvas.clientWidth, canvas.clientHeight);
        });
    });
}

// Initialize all 3D animations when the page loads
document.addEventListener('DOMContentLoaded', () => {
    initHero3D();
    initService3D();
    initTimeline3D();
}); 