class RabbleRenderer {
    constructor(container) {
        this.container = container;
        this.scene = null;
        this.camera = null;
        this.renderer = null;
        this.animationId = null;
        this.isRunning = false;

        this.init();
    }

    init() {
        console.log('Initializing RabbleRenderer with container:', this.container);

        // Create scene
        this.scene = new THREE.Scene();
        this.scene.background = new THREE.Color(CONFIG.colors.background);

        // Create camera
        this.camera = new THREE.PerspectiveCamera(
            CONFIG.camera.fov,
            this.container.clientWidth / this.container.clientHeight,
            CONFIG.camera.near,
            CONFIG.camera.far
        );
        this.camera.position.set(
            CONFIG.camera.position.x,
            CONFIG.camera.position.y,
            CONFIG.camera.position.z
        );
        this.camera.lookAt(0, 0, 0); // Look at the character position

        // Create pivot for camera rotation tilt effect
        this.pivot = new THREE.Object3D();
        this.pivot.add(this.camera);
        this.scene.add(this.pivot);

        console.log('Camera created:', this.camera.position);

        // Create renderer
        this.renderer = new THREE.WebGLRenderer(CONFIG.renderer);
        this.renderer.setSize(this.container.clientWidth, this.container.clientHeight);
        this.renderer.setPixelRatio(window.devicePixelRatio);

        console.log('Renderer created, canvas size:', this.renderer.domElement.width, this.renderer.domElement.height);

        // Add to container
        this.container.appendChild(this.renderer.domElement);

        // Setup enhanced lighting for character visibility
        const ambientLight = new THREE.AmbientLight(0x505050, 1.0);
        this.scene.add(ambientLight);

        // Key light from camera direction
        const directionalLight = new THREE.DirectionalLight(0xffffff, 0.6);
        directionalLight.position.set(2, 2, 3);
        this.scene.add(directionalLight);
        /*
        // Add point light at left eye position for glow
        const leftEyeLight = new THREE.PointLight(0x6699FF, 1.5, 5);
        leftEyeLight.position.set(-0.5, 0.4, 1.3);
        this.scene.add(leftEyeLight);

        // Add point light at right eye position for glow
        const rightEyeLight = new THREE.PointLight(0x6699FF, 1.5, 5);
        rightEyeLight.position.set(0.5, 0.4, 1.3);
        this.scene.add(rightEyeLight);

        // Add point light at mouth for cyan glow
        const mouthLight = new THREE.PointLight(0x00FFFF, 1.0, 3);
        mouthLight.position.set(0, -0.3, 0.9);
        this.scene.add(mouthLight);
        */
        // Handle window resize
        window.addEventListener('resize', () => this.onWindowResize());

        // Setup mouse movement tilt effect
        this.initMouseTilt();
    }

    onWindowResize() {
        if (!this.camera || !this.renderer) return;

        this.camera.aspect = this.container.clientWidth / this.container.clientHeight;
        this.camera.updateProjectionMatrix();
        this.renderer.setSize(this.container.clientWidth, this.container.clientHeight);
    }

    startRenderLoop(updateCallback) {
        if (this.isRunning) return;

        this.isRunning = true;
        const animate = () => {
            if (!this.isRunning) return;

            this.animationId = requestAnimationFrame(animate);

            // Call update callback for character animations
            if (updateCallback) {
                updateCallback();
            }

            // Render the scene
            this.renderer.render(this.scene, this.camera);
        };

        animate();
    }

    stopRenderLoop() {
        this.isRunning = false;
        if (this.animationId) {
            cancelAnimationFrame(this.animationId);
            this.animationId = null;
        }
    }

    addToScene(object) {
        this.scene.add(object);
    }

    removeFromScene(object) {
        this.scene.remove(object);
    }

    getScene() {
        return this.scene;
    }

    getCamera() {
        return this.camera;
    }

    getRenderer() {
        return this.renderer;
    }

    initMouseTilt() {
        // Track mouse movement for tilt effect
        this.mouseX = 0;      // Current normalized mouse X (-1 to 1)
        this.mouseY = 0;      // Current normalized mouse Y (-1 to 1)
        this.previousMouseX = 0;   // Previous frame's mouse position
        this.previousMouseY = 0;   // Previous frame's mouse position
        
        this.tiltSpeed = 0.25;        // How fast the camera responds to mouse movement
        this.tiltDecay = 0.25;        // How quickly the tilt effect settles

        const handleMouseMove = (event) => {
            if (!this.container || !this.pivot || !this.camera) return;

            // Get mouse position relative to container center
            const rect = this.container.getBoundingClientRect();
            const centerX = rect.left + rect.width / 2;
            const centerY = rect.top + rect.height / 2;

            // Convert to normalized coordinates (-1 to 1 range, inverted Y for Three.js)
            const normalizedX = (event.clientX - centerX) / centerX;
            const normalizedY = (event.clientY - centerY) / centerY;

            this.mouseX = Math.max(-1, Math.min(1, normalizedX));
            this.mouseY = Math.max(-1, Math.min(1, normalizedY));

            // Smoothly interpolate to target position
            this.previousMouseX += (this.mouseX - this.previousMouseX) * this.tiltDecay;
            this.previousMouseY += (this.mouseY - this.previousMouseY) * this.tiltDecay;

            // Apply tilt rotation (using pivot object)
            this.pivot.rotation.x = -this.previousMouseY * this.tiltSpeed * Math.PI;
            this.pivot.rotation.y = -this.previousMouseX * this.tiltSpeed * Math.PI;
        };

        // Mouse move event on container
        this.container.addEventListener('mousemove', handleMouseMove);

        // Click outside handler to reset tilt
        document.addEventListener('mousedown', (event) => {
            if (!this.container || !this.pivot || !this.camera) return;

            const rect = this.container.getBoundingClientRect();
            const isInsideContainer = 
                event.clientX >= rect.left &&
                event.clientX <= rect.right &&
                event.clientY >= rect.top &&
                event.clientY <= rect.bottom;

            // Reset rotation if clicking outside container
            if (!isInsideContainer) {
                this.pivot.rotation.x = 0;
                this.pivot.rotation.y = 0;
                this.mouseX = 0;
                this.mouseY = 0;
                this.previousMouseX = 0;
                this.previousMouseY = 0;
            }
        });

        // Cleanup: remove event listeners when disposing
        this.mouseMoveHandler = handleMouseMove;
    }

    resetMouseTilt() {
        if (this.pivot && this.camera) {
            this.pivot.rotation.x = 0;
            this.pivot.rotation.y = 0;
            this.previousMouseX = 0;
            this.previousMouseY = 0;
        }
    }

    dispose() {
        this.stopRenderLoop();

        if (this.renderer) {
            this.renderer.dispose();
        }

        window.removeEventListener('resize', this.onWindowResize);

        // Remove mouse move listener
        if (this.mouseMoveHandler && this.container) {
            this.container.removeEventListener('mousemove', this.mouseMoveHandler);
        }

        // Remove click-outside reset handler
        const mousedownHandler = (event) => {
            if (!this.container || !this.pivot || !this.camera) return;
            const rect = this.container.getBoundingClientRect();
            const isInsideContainer = 
                event.clientX >= rect.left &&
                event.clientX <= rect.right &&
                event.clientY >= rect.top &&
                event.clientY <= rect.bottom;
            if (!isInsideContainer) {
                this.pivot.rotation.x = 0;
                this.pivot.rotation.y = 0;
                this.mouseX = 0;
                this.mouseY = 0;
                this.previousMouseX = 0;
                this.previousMouseY = 0;
            }
        };
        document.removeEventListener('mousedown', mousedownHandler);
    }
}