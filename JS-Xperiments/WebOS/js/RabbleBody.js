class RabbleBody {
    constructor() {
        this.particleCount = CONFIG.particles.count;
        this.particles = null;
        this.geometry = null;
        this.material = null;
        this.mesh = null;
        this.minSize = CONFIG.particles.minSize;  // Store for later use (0.1)
        this.maxSize = CONFIG.particles.maxSize;  // Store for later use (0.4)

        this.init();
    }

    init() {
        // Create geometry for particles
        this.geometry = new THREE.BufferGeometry();

        // Create positions array
        const positions = new Float32Array(this.particleCount * 3);
        const colors = new Float32Array(this.particleCount * 3);
        const sizes = new Float32Array(this.particleCount);

        // Initialize particles in a roughly spherical distribution
        for (let i = 0; i < this.particleCount; i++) {
            const i3 = i * 3;

            // Random spherical distribution with some clustering toward center
            const radius = Math.random() * 1.5 + 0.5; // 0.5 to 2.0 radius
            const theta = Math.random() * Math.PI * 2;
            const phi = Math.acos(2 * Math.random() - 1);

            positions[i3] = radius * Math.sin(phi) * Math.cos(theta);
            positions[i3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
            positions[i3 + 2] = radius * Math.cos(phi);

            // Color gradient with multiple palette: purple -> blue -> dark gray/green
            const distanceFromCenter = radius / 2.0;
            let color;

            // Create a more complex color distribution
            if (Math.random() < 0.15) {
                // 15% green accent particles (brightness variations)
                const greenColor = new THREE.Color(CONFIG.colors.body.accent);
                color = greenColor.clone();
            } else if (Math.random() < 0.25) {
                // 25% dark gray particles for depth
                const darkColor = new THREE.Color(CONFIG.colors.body.dark);
                color = darkColor.clone();
            } else {
                // 60% standard purple to blue gradient
                const innerColor = new THREE.Color(CONFIG.colors.body.inner);
                const outerColor = new THREE.Color(CONFIG.colors.body.outer);
                color = innerColor.clone().lerp(outerColor, distanceFromCenter);
            }

            colors[i3] = color.r;
            colors[i3 + 1] = color.g;
            colors[i3 + 2] = color.b;

            // Random sizes using configured min/max (0.1 to 0.4 range)
            sizes[i] = this.minSize + Math.random() * (this.maxSize - this.minSize);
        }

        this.geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
        this.geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));
        this.geometry.setAttribute('size', new THREE.BufferAttribute(sizes, 1));

        // Create particle system (no scale override, use config count)
        const particleCount = CONFIG.particles.count;
        this.particleCount = particleCount;

        // Create material with emissive properties
        this.material = new THREE.PointsMaterial({
            size: Math.max(this.minSize, this.maxSize * 0.5),  // Base size for additive blending
            vertexColors: true,
            transparent: true,
            opacity: (typeof CONFIG.particles.opacity === 'number') ? CONFIG.particles.opacity : 0.75,
            sizeAttenuation: true,
            blending: THREE.AdditiveBlending,
            depthTest: true,
            depthWrite: false,  // Don't write depth to allow emissive glow
            alphaTest: 0.5,
            emissive: (CONFIG.particles.emissive === true) ? 0x335577 : 0x000000,
            emissiveMap: null,
            transparent: CONFIG.particles.opacity < 1.0,
            // Calculate per-vertex emissive intensity based on distance from center (less intense farther out)
            color: new THREE.Color().setHex((CONFIG.particles.emissive === true) ? 0x335577 : 0x000000)
        });

        // Apply per-vertex emissive intensity based on distance from center
        if (CONFIG.particles.emissive === true) {
            const emissiveColor = new THREE.Color(0x335577);
            const positions = this.geometry.attributes.position.array;
            const colors = this.geometry.attributes.color.array;
            
            for (let i = 0; i < this.particleCount; i++) {
                const i3 = i * 3;
                const x = positions[i3];
                const y = positions[i3 + 1];
                const z = positions[i3 + 2];
                
                // Calculate distance from center (normalized by max radius)
                const currentRadius = Math.sqrt(x * x + y * y + z * z);
                const normalizedDistance = currentRadius / 2.5; // Normalize by max radius
                
                // Emissive intensity: 1.0 at center, decreasing to minimum of 0.1 at edges
                // Using a linear falloff from center (radius ~1.0) to edge (radius ~2.5)
                const emissiveIntensity = Math.max(0.1, 1.0 - normalizedDistance * 0.8);
                
                // Apply emissive intensity to the color
                const emissiveColorWithAlpha = emissiveColor.clone().multiplyScalar(emissiveIntensity);
                
                // Update the vertex color with the adjusted emissive intensity
                colors[i3] = emissiveColorWithAlpha.r;
                colors[i3 + 1] = emissiveColorWithAlpha.g;
                colors[i3 + 2] = emissiveColorWithAlpha.b;
            }
            
            this.geometry.attributes.color.needsUpdate = true;
        }

        // Create particle system
        this.particles = new THREE.Points(this.geometry, this.material);
        this.particles.renderOrder = 1; // Base rendering order
        this.particles.scale.set(CONFIG.character.scale, CONFIG.character.scale, CONFIG.character.scale);
        this.particles.position.set(
            CONFIG.character.position.x,
            CONFIG.character.position.y,
            CONFIG.character.position.z - 0.2  // Push particles back slightly
        );

        console.log('RabbleBody initialized with', this.particleCount, 'particles');
    }

    // Set particle material opacity at runtime
    setParticleOpacity(opacity) {
        if (!this.material) return;
        const val = Math.max(0, Math.min(1, opacity));
        this.material.opacity = val;
        this.material.transparent = val < 1.0;
        this.material.needsUpdate = true;
        // Update config
        CONFIG.particles.opacity = val;
    }

    update(deltaTime, driftOffset) {
        if (!this.geometry) return;

        const positions = this.geometry.attributes.position.array;
        const sizes = this.geometry.attributes.size.array;

        // Animate particles with gentle drift
        for (let i = 0; i < this.particleCount; i++) {
            const i3 = i * 3;

            // Get original position (stored in a way we can reference)
            // For simplicity, we'll use sine waves for drift animation
            const time = driftOffset + i * 0.1;

            // Gentle floating motion
            positions[i3] += Math.sin(time * 0.5) * 0.001;
            positions[i3 + 1] += Math.cos(time * 0.3) * 0.001;
            positions[i3 + 2] += Math.sin(time * 0.7) * 0.001;

            // Keep particles within bounds (simple containment)
            const maxRadius = 2.5;
            const currentRadius = Math.sqrt(
                positions[i3] * positions[i3] +
                positions[i3 + 1] * positions[i3 + 1] +
                positions[i3 + 2] * positions[i3 + 2]
            );

            if (currentRadius > maxRadius) {
                // Pull back toward center
                const factor = maxRadius / currentRadius;
                positions[i3] *= factor;
                positions[i3 + 1] *= factor;
                positions[i3 + 2] *= factor;
            }

            // Subtle size pulsing with clamping to avoid oversized particles
            const pulseFactor = 0.15; // 15% pulse amplitude (gentler)
            const pulsed = sizes[i] * (1 + Math.sin(time) * pulseFactor);
            // Clamp pulsed size within configured range (0.1 to 0.4)
            sizes[i] = Math.max(this.minSize, Math.min(pulsed, this.maxSize));
        }

        // Mark attributes as needing update
        this.geometry.attributes.position.needsUpdate = true;
        this.geometry.attributes.size.needsUpdate = true;
    }

    // Recalculate base particle sizes and upload to GPU
    updateParticleSizes(minSize, maxSize) {
        if (!this.geometry) return;
        const sizes = this.geometry.attributes.size.array;
        const count = this.particleCount;
        const minS = (typeof minSize === 'number') ? minSize : CONFIG.particles.minSize;
        const maxS = (typeof maxSize === 'number') ? maxSize : CONFIG.particles.maxSize;

        for (let i = 0; i < count; i++) {
            sizes[i] = minS + Math.random() * (maxS - minS);
        }

        this.geometry.attributes.size.needsUpdate = true;
    }

    getMesh() {
        return this.particles;
    }

    dispose() {
        if (this.geometry) {
            this.geometry.dispose();
        }
        if (this.material) {
            this.material.dispose();
        }
    }
}