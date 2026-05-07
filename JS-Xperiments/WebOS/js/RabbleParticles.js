/**
 * RabbleParticles - Additional particle effects component
 * Creates supplementary particle effects for enhanced visual impact
 */

class RabbleParticles {
    constructor(config) {
        this.config = config;
        this.particleCount = Math.floor(config.particles.count * 0.3); // 30% of main body particles
        this.geometry = null;
        this.material = null;
        this.mesh = null;
        this.state = {
            size: config.particles.minSize,
            opacity: config.particles.opacity
        };

        this.init();
    }

    init() {
        // Create geometry for supplementary particles
        this.geometry = new THREE.BufferGeometry();
        const positions = new Float32Array(this.particleCount * 3);
        const colors = new Float32Array(this.particleCount * 3);
        const sizes = new Float32Array(this.particleCount);

        // Initialize particles in a halo around the main body
        for (let i = 0; i < this.particleCount; i++) {
            const i3 = i * 3;

            // Create halo effect around the main body
            const radius = Math.random() * 3.0 + 1.5; // 1.5 to 4.5 radius (outer halo)
            const theta = Math.random() * Math.PI * 2;
            const phi = Math.acos(2 * Math.random() - 1);

            positions[i3] = radius * Math.sin(phi) * Math.cos(theta);
            positions[i3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
            positions[i3 + 2] = radius * Math.cos(phi);

            // Color variations for halo particles
            const colorVariations = [
                new THREE.Color(0x8B5CF6), // Purple
                new THREE.Color(0x3B82F6), // Blue
                new THREE.Color(0xF5FDFF), // White accent
                new THREE.Color(0x06B6D4)  // Cyan
            ];
            
            const randomColor = colorVariations[Math.floor(Math.random() * colorVariations.length)];
            colors[i3] = randomColor.r;
            colors[i3 + 1] = randomColor.g;
            colors[i3 + 2] = randomColor.b;

            // Random sizes for halo particles
            sizes[i] = this.config.particles.minSize + Math.random() * (this.config.particles.maxSize - this.config.particles.minSize);
        }

        this.geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
        this.geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));
        this.geometry.setAttribute('size', new THREE.BufferAttribute(sizes, 1));

        // Create material with enhanced emissive properties for halo effect
        this.material = new THREE.PointsMaterial({
            size: this.config.particles.maxSize * 0.8,
            vertexColors: true,
            transparent: true,
            opacity: this.config.particles.opacity * 0.8, // Slightly more transparent than main body
            sizeAttenuation: true,
            blending: THREE.AdditiveBlending,
            depthTest: true,
            depthWrite: false,
            alphaTest: 0.1,
            emissive: 0x6699FF,
            emissiveIntensity: 0.8
        });

        // Create particle system
        this.mesh = new THREE.Points(this.geometry, this.material);
        this.mesh.renderOrder = 2; // Render after main body
        this.mesh.scale.set(
            this.config.character.scale,
            this.config.character.scale,
            this.config.character.scale
        );
        this.mesh.position.set(
            this.config.character.position.x,
            this.config.character.position.y,
            this.config.character.position.z - 0.5 // Further back than main body
        );
    }

    update(deltaTime, animationData) {
        if (!this.geometry) return;

        const positions = this.geometry.attributes.position.array;
        const sizes = this.geometry.attributes.size.array;

        // Update state from animation data
        if (animationData) {
            if (typeof animationData.size === 'number') {
                this.state.size = animationData.size;
            }
            if (typeof animationData.opacity === 'number') {
                this.state.opacity = animationData.opacity;
            }
        }

        // Animate halo particles with different patterns than main body
        for (let i = 0; i < this.particleCount; i++) {
            const i3 = i * 3;
            const time = performance.now() * 0.001 + i * 0.05;

            // Different animation pattern for halo particles
            positions[i3] += Math.sin(time * 0.8) * 0.002;
            positions[i3 + 1] += Math.cos(time * 0.5) * 0.002;
            positions[i3 + 2] += Math.sin(time * 1.2) * 0.002;

            // Keep particles within bounds
            const maxRadius = 4.5;
            const currentRadius = Math.sqrt(
                positions[i3] * positions[i3] +
                positions[i3 + 1] * positions[i3 + 1] +
                positions[i3 + 2] * positions[i3 + 2]
            );

            if (currentRadius > maxRadius) {
                const factor = maxRadius / currentRadius;
                positions[i3] *= factor;
                positions[i3 + 1] *= factor;
                positions[i3 + 2] *= factor;
            }

            // Size pulsing for halo effect
            const pulseFactor = 0.2;
            const pulsed = sizes[i] * (1 + Math.sin(time * 2) * pulseFactor);
            sizes[i] = Math.max(this.config.particles.minSize, Math.min(pulsed, this.config.particles.maxSize));
        }

        this.geometry.attributes.position.needsUpdate = true;
        this.geometry.attributes.size.needsUpdate = true;

        // Update material properties
        this.material.opacity = this.state.opacity;
        this.material.size = this.state.size;
    }

    getState() {
        return {
            size: this.state.size,
            opacity: this.state.opacity
        };
    }

    getMesh() {
        return this.mesh;
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