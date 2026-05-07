class RabbleCanvas extends HTMLElement {
    constructor() {
        super();
        this.renderer = null;
        this.rabble = null;
        this.animationId = null;
        this.lastTime = 0;
        this.isInitialized = false;
    }

    connectedCallback() {
        if (this.isInitialized) return;
        this.isInitialized = true;

        this.init();
    }

    disconnectedCallback() {
        this.dispose();
    }

    init() {
        // Ensure the Web Component itself has dimensions
        if (this.clientWidth === 0 || this.clientHeight === 0) {
            console.warn('Web Component has zero dimensions, setting defaults');
            this.style.width = '400px';
            this.style.height = '300px';
            this.style.display = 'block';
        }

        // Create container div (no shadow DOM for now)
        this.container = document.createElement('div');
        this.container.style.width = '100%';
        this.container.style.height = '100%';
        this.container.style.position = 'relative';

        this.appendChild(this.container);

        console.log('Container dimensions:', {
            clientWidth: this.container.clientWidth,
            clientHeight: this.container.clientHeight,
            offsetWidth: this.container.offsetWidth,
            offsetHeight: this.container.offsetHeight
        });

        // Initialize Three.js renderer
        this.renderer = new RabbleRenderer(this.container);

        // Create Rabble character with camera reference
        this.rabble = new Rabble(this.renderer.getCamera());

        // Add Rabble to scene
        this.renderer.addToScene(this.rabble.getGroup());

        console.log('RabbleCanvas initialized');

        // Start render loop with the renderer
        this.renderer.startRenderLoop(() => {
            if (this.rabble) {
                const deltaTime = 0.016; // ~60fps, 16.67ms per frame
                this.rabble.update(deltaTime);
            }
        });

        // Handle resize
        this.resizeObserver = new ResizeObserver(() => {
            this.handleResize();
        });
        this.resizeObserver.observe(this);

        // Interaction helpers
        this._raycaster = new THREE.Raycaster();
        this._dragState = null; // { targetGroup, startPoint, startPos, startScale, plane }

        // Attach pointer listeners to the renderer's canvas
        const canvasEl = this.renderer.getRenderer().domElement;
        canvasEl.addEventListener('pointerdown', (e) => this._onPointerDown(e));
        window.addEventListener('pointermove', (e) => this._onPointerMove(e));
        window.addEventListener('pointerup', (e) => this._onPointerUp(e));
    }

    startAnimation() {
        // Animation is now handled by renderer.startRenderLoop()
        // This method is kept for backward compatibility
    }

    handleResize() {
        if (this.renderer) {
            // Force renderer to update size
            setTimeout(() => {
                this.renderer.onWindowResize();
            }, 0);
        }
    }

    // Public API methods exposed to users
    speak() {
        if (this.rabble) {
            this.rabble.speak();
        }
    }

    listen() {
        if (this.rabble) {
            this.rabble.listen();
        }
    }

    stopListening() {
        if (this.rabble) {
            this.rabble.stopListening();
        }
    }

    idle() {
        if (this.rabble) {
            this.rabble.stopListening();
            // Reset eyes to center
            this.rabble.lookAt(0, 0, 0);
            // Force idle state in animation controller
            if (this.rabble.animationController) {
                this.rabble.animationController.setState('idle');
            }
        }
    }

    react() {
        if (this.rabble) {
            this.rabble.react();
        }
    }

    lookAt(x, y, z) {
        if (this.rabble) {
            this.rabble.lookAt(x, y, z);
        }
    }

    // Tuning APIs for external UI
    setMouthPolynomial(index, coeffsArray, degree) {
        if (this.rabble && this.rabble.mouth && typeof this.rabble.mouth.setPolynomialCoeffs === 'function') {
            this.rabble.mouth.setPolynomialCoeffs(index, coeffsArray, degree);
        }
    }

    setParticleSizeRange(minSize, maxSize) {
        // Update CONFIG and notify body to recalc sizes
        if (typeof minSize === 'number') CONFIG.particles.minSize = minSize;
        if (typeof maxSize === 'number') CONFIG.particles.maxSize = maxSize;
        if (this.rabble && this.rabble.body && typeof this.rabble.body.updateParticleSizes === 'function') {
            this.rabble.body.updateParticleSizes(CONFIG.particles.minSize, CONFIG.particles.maxSize);
            // Also update material base size to be conservative
            if (this.rabble.body.material) this.rabble.body.material.size = (CONFIG.particles.maxSize + CONFIG.particles.minSize) * 0.5;
        }
    }

    setParticleOpacity(opacity) {
        if (typeof opacity === 'number') {
            CONFIG.particles.opacity = opacity;
            if (this.rabble && this.rabble.body && typeof this.rabble.body.setParticleOpacity === 'function') {
                this.rabble.body.setParticleOpacity(opacity);
            }
        }
    }

    // Pointer interaction: dragging for translate (Ctrl) or scale (Alt)
    _onPointerDown(e) {
        if (!this.renderer || !this.rabble) return;
        const canvas = this.renderer.getRenderer().domElement;
        const rect = canvas.getBoundingClientRect();
        const x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
        const y = -((e.clientY - rect.top) / rect.height) * 2 + 1;

        this._raycaster.setFromCamera({ x, y }, this.renderer.getCamera());

        // Check intersects against mouth and eyes groups
        const candidates = [];
        if (this.rabble.mouth) candidates.push(this.rabble.mouth.getGroup());
        if (this.rabble.eyes) candidates.push(this.rabble.eyes.getGroup());

        const intersects = this._raycaster.intersectObjects(candidates, true);
        if (intersects.length === 0) return;

        const hit = intersects[0];
        // Find which top-level group was hit
        let targetGroup = null;
        for (const g of candidates) {
            if (g && g.id && hit.object && (hit.object === g || g.children.includes(hit.object) || g === hit.object.parent || hit.object.parent?.parent === g)) {
                targetGroup = g;
                break;
            }
        }
        if (!targetGroup) return;

        // Only start drag if Ctrl (translate) or Alt (scale) pressed
        const isTranslate = e.ctrlKey;
        const isScale = e.altKey;
        if (!isTranslate && !isScale) return;

        // Define drag plane perpendicular to camera at target position
        const targetWorldPos = new THREE.Vector3();
        targetGroup.getWorldPosition(targetWorldPos);
        const camDir = new THREE.Vector3();
        this.renderer.getCamera().getWorldDirection(camDir).negate();
        const plane = new THREE.Plane().setFromNormalAndCoplanarPoint(camDir, targetWorldPos);

        const startPoint = new THREE.Vector3();
        this._raycaster.ray.intersectPlane(plane, startPoint);

        const startPos = targetGroup.position.clone();
        const startScale = targetGroup.scale.clone();

        this._dragState = {
            targetGroup,
            startPoint,
            startPos,
            startScale,
            plane,
            mode: isTranslate ? 'translate' : 'scale'
        };
    }

    _onPointerMove(e) {
        if (!this._dragState || !this.renderer) return;
        const canvas = this.renderer.getRenderer().domElement;
        const rect = canvas.getBoundingClientRect();
        const x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
        const y = -((e.clientY - rect.top) / rect.height) * 2 + 1;
        this._raycaster.setFromCamera({ x, y }, this.renderer.getCamera());

        const newPoint = new THREE.Vector3();
        this._raycaster.ray.intersectPlane(this._dragState.plane, newPoint);
        if (!newPoint) return;

        if (this._dragState.mode === 'translate') {
            const delta = newPoint.clone().sub(this._dragState.startPoint);
            const newPos = this._dragState.startPos.clone().add(delta);
            this._dragState.targetGroup.position.copy(newPos);
        } else if (this._dragState.mode === 'scale') {
            // Use change in Y coordinate as scale factor
            const dy = newPoint.y - this._dragState.startPoint.y;
            const scaleFactor = Math.max(0.05, 1 + dy);
            this._dragState.targetGroup.scale.set(
                this._dragState.startScale.x * scaleFactor,
                this._dragState.startScale.y * scaleFactor,
                this._dragState.startScale.z * scaleFactor
            );
        }
    }

    _onPointerUp(e) {
        this._dragState = null;
    }

    // Save current transform & mouth coefficients & particle settings to JSON and download
    saveConfiguration(filename = 'rabble_config.json') {
        if (!this.rabble) return;
        const data = {};
        // Eyes
        if (this.rabble.eyes) {
            const g = this.rabble.eyes.getGroup();
            data.eyes = {
                position: g.position.toArray(),
                scale: g.scale.toArray()
            };
        }
        // Mouth
        if (this.rabble.mouth) {
            const g = this.rabble.mouth.getGroup();
            data.mouth = {
                position: g.position.toArray(),
                scale: g.scale.toArray(),
                waves: this.rabble.mouth.waves.map(w => ({ coeffs: (w.userData.coeffs || []).slice(), degree: w.userData.degree || 5 }))
            };
        }
        // Particles
        data.particles = {
            minSize: CONFIG.particles.minSize,
            maxSize: CONFIG.particles.maxSize,
            opacity: CONFIG.particles.opacity
        };

        const json = JSON.stringify(data, null, 2);
        const blob = new Blob([json], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = filename;
        a.click();
        URL.revokeObjectURL(url);
    }

    loadConfigurationFromObject(obj) {
        if (!this.rabble) return;
        if (obj.eyes && this.rabble.eyes) {
            const g = this.rabble.eyes.getGroup();
            if (Array.isArray(obj.eyes.position)) g.position.fromArray(obj.eyes.position);
            if (Array.isArray(obj.eyes.scale)) g.scale.fromArray(obj.eyes.scale);
        }
        if (obj.mouth && this.rabble.mouth) {
            const g = this.rabble.mouth.getGroup();
            if (Array.isArray(obj.mouth.position)) g.position.fromArray(obj.mouth.position);
            if (Array.isArray(obj.mouth.scale)) g.scale.fromArray(obj.mouth.scale);
            if (Array.isArray(obj.mouth.waves)) {
                obj.mouth.waves.forEach((w, i) => {
                    if (w && Array.isArray(w.coeffs)) {
                        this.rabble.mouth.setPolynomialCoeffs(i, w.coeffs, w.degree || 5);
                    }
                });
            }
        }
        if (obj.particles) {
            if (typeof obj.particles.minSize === 'number' && typeof obj.particles.maxSize === 'number') {
                this.setParticleSizeRange(obj.particles.minSize, obj.particles.maxSize);
            }
            if (typeof obj.particles.opacity === 'number') {
                this.setParticleOpacity(obj.particles.opacity);
            }
        }
    }

    // Load configuration from a File object (from input[type=file])
    loadConfigurationFromFile(file) {
        const reader = new FileReader();
        reader.onload = (e) => {
            try {
                const obj = JSON.parse(e.target.result);
                this.loadConfigurationFromObject(obj);
            } catch (err) {
                console.error('Failed to load configuration JSON', err);
            }
        };
        reader.readAsText(file);
    }

    // Get access to underlying objects for advanced usage
    getRabble() {
        return this.rabble;
    }

    getRenderer() {
        return this.renderer;
    }

    getScene() {
        return this.renderer ? this.renderer.getScene() : null;
    }

    getCamera() {
        return this.renderer ? this.renderer.getCamera() : null;
    }

    dispose() {
        if (this.resizeObserver) {
            this.resizeObserver.disconnect();
        }

        if (this.animationId) {
            cancelAnimationFrame(this.animationId);
        }

        if (this.rabble) {
            this.rabble.dispose();
        }

        if (this.renderer) {
            this.renderer.dispose();
        }
    }
}

// Web Component is now registered in index.js