// Professional Hero Section Animation
function initHeroAnimation() {
    const container = document.getElementById('hero-animation');
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, container.clientWidth / container.clientHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    
    renderer.setSize(container.clientWidth, container.clientHeight);
    container.appendChild(renderer.domElement);

    // Create professional particle system
    const particlesGeometry = new THREE.BufferGeometry();
    const particlesCount = 2000;
    const posArray = new Float32Array(particlesCount * 3);
    const colorArray = new Float32Array(particlesCount * 3);

    for(let i = 0; i < particlesCount * 3; i++) {
        posArray[i] = (Math.random() - 0.5) * 4;
        colorArray[i] = Math.random() * 0.5 + 0.5; // Brighter colors
    }

    particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));
    particlesGeometry.setAttribute('color', new THREE.BufferAttribute(colorArray, 3));

    const particlesMaterial = new THREE.PointsMaterial({
        size: 0.003,
        vertexColors: true,
        transparent: true,
        opacity: 0.6
    });

    const particlesMesh = new THREE.Points(particlesGeometry, particlesMaterial);
    scene.add(particlesMesh);

    // Professional lighting setup
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.3);
    scene.add(ambientLight);

    const pointLight = new THREE.PointLight(0x4a90e2, 1, 100);
    pointLight.position.set(0, 0, 2);
    scene.add(pointLight);

    camera.position.z = 2;

    // Smooth mouse interaction
    let mouseX = 0;
    let mouseY = 0;
    let targetX = 0;
    let targetY = 0;

    document.addEventListener('mousemove', (event) => {
        mouseX = (event.clientX / window.innerWidth) * 2 - 1;
        mouseY = -(event.clientY / window.innerHeight) * 2 + 1;
    });

    function animate() {
        requestAnimationFrame(animate);
        
        // Smooth mouse following with easing
        targetX = mouseX * 0.0005;
        targetY = mouseY * 0.0005;
        
        particlesMesh.rotation.y += 0.0005;
        particlesMesh.rotation.x += 0.0002;
        
        // Subtle wave effect
        const positions = particlesGeometry.attributes.position.array;
        for(let i = 0; i < positions.length; i += 3) {
            positions[i + 1] += Math.sin(Date.now() * 0.0005 + positions[i]) * 0.00005;
        }
        particlesGeometry.attributes.position.needsUpdate = true;
        
        renderer.render(scene, camera);
    }

    animate();

    // Optimized window resize handling
    let resizeTimeout;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(() => {
            camera.aspect = container.clientWidth / container.clientHeight;
            camera.updateProjectionMatrix();
            renderer.setSize(container.clientWidth, container.clientHeight);
        }, 250);
    });
}

// Professional Timeline Animation
function initTimelineAnimation() {
    const container = document.getElementById('timeline-animation');
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, container.clientWidth / container.clientHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    
    renderer.setSize(container.clientWidth, container.clientHeight);
    container.appendChild(renderer.domElement);

    // Create professional timeline nodes
    const nodes = [];
    const nodeGeometry = new THREE.SphereGeometry(0.08, 32, 32);
    const nodeMaterial = new THREE.MeshPhongMaterial({ 
        color: '#4a90e2',
        shininess: 50,
        specular: 0x222222
    });

    // Professional connecting lines
    const lineMaterial = new THREE.LineBasicMaterial({ 
        color: '#4a90e2',
        transparent: true,
        opacity: 0.3
    });

    for(let i = 0; i < 5; i++) {
        const node = new THREE.Mesh(nodeGeometry, nodeMaterial);
        node.position.x = (i - 2) * 0.4;
        node.position.y = Math.sin(i) * 0.2;
        scene.add(node);
        nodes.push(node);

        if (i > 0) {
            const points = [];
            points.push(new THREE.Vector3(nodes[i-1].position.x, nodes[i-1].position.y, 0));
            points.push(new THREE.Vector3(node.position.x, node.position.y, 0));
            const lineGeometry = new THREE.BufferGeometry().setFromPoints(points);
            const line = new THREE.Line(lineGeometry, lineMaterial);
            scene.add(line);
        }
    }

    // Professional lighting setup
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.3);
    scene.add(ambientLight);

    const pointLight = new THREE.PointLight(0x4a90e2, 1, 100);
    pointLight.position.set(0, 0, 2);
    scene.add(pointLight);

    camera.position.z = 2;

    // Professional animation
    function animate() {
        requestAnimationFrame(animate);
        
        nodes.forEach((node, index) => {
            node.position.y = Math.sin(Date.now() * 0.0005 + index) * 0.2;
            node.rotation.y += 0.005;
            node.rotation.x += 0.002;
        });
        
        renderer.render(scene, camera);
    }

    animate();

    // Optimized window resize handling
    let resizeTimeout;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(() => {
            camera.aspect = container.clientWidth / container.clientHeight;
            camera.updateProjectionMatrix();
            renderer.setSize(container.clientWidth, container.clientHeight);
        }, 250);
    });
}

// Professional Contact Form Animation
function initContactAnimation() {
    const container = document.getElementById('contact-animation');
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, container.clientWidth / container.clientHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    
    renderer.setSize(container.clientWidth, container.clientHeight);
    container.appendChild(renderer.domElement);

    // Create professional form background
    const geometry = new THREE.PlaneGeometry(2, 2, 32, 32);
    const material = new THREE.MeshPhongMaterial({
        color: '#4a90e2',
        wireframe: true,
        transparent: true,
        opacity: 0.3
    });
    const plane = new THREE.Mesh(geometry, material);
    scene.add(plane);

    // Professional lighting setup
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.3);
    scene.add(ambientLight);

    const pointLight = new THREE.PointLight(0x4a90e2, 1, 100);
    pointLight.position.set(0, 0, 2);
    scene.add(pointLight);

    camera.position.z = 2;

    // Professional animation
    function animate() {
        requestAnimationFrame(animate);
        
        plane.rotation.x = Math.sin(Date.now() * 0.0003) * 0.1;
        plane.rotation.y = Math.cos(Date.now() * 0.0003) * 0.1;
        
        renderer.render(scene, camera);
    }

    animate();

    // Optimized window resize handling
    let resizeTimeout;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(() => {
            camera.aspect = container.clientWidth / container.clientHeight;
            camera.updateProjectionMatrix();
            renderer.setSize(container.clientWidth, container.clientHeight);
        }, 250);
    });
}

// Initialize all animations when the page loads
document.addEventListener('DOMContentLoaded', () => {
    initHeroAnimation();
    initTimelineAnimation();
    initContactAnimation();

    // Professional scroll animation observer
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });

    document.querySelectorAll('.animate-on-scroll').forEach((element) => {
        observer.observe(element);
    });
});

// Professional 3D card effect
document.querySelectorAll('.service-card').forEach(card => {
    let isHovered = false;
    
    card.addEventListener('mouseenter', () => {
        isHovered = true;
    });
    
    card.addEventListener('mouseleave', () => {
        isHovered = false;
        card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0)';
    });
    
    card.addEventListener('mousemove', (e) => {
        if (!isHovered) return;
        
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        const rotateX = (y - centerY) / 30;
        const rotateY = (centerX - x) / 30;
        
        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
    });
}); 