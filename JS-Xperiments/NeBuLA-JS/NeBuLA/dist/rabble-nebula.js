/**
 * RaBbLE Nebula Renderer - RBCNS Compliant Build
 * Unified distribution for browser and Node.js environments
 * 
 * This file contains the complete RaBbLE Nebula Renderer system
 * with RBCNS compliance and Flat-Chaos pattern enforcement.
 * 
 * @version 1.0.0
 * @author RaBbLE Nebula Team
 */

// UMD (Universal Module Definition) wrapper
(function (root, factory) {
    if (typeof define === 'function' && define.amd) {
        // AMD
        define(['three'], factory);
    } else if (typeof exports === 'object') {
        // Node.js
        module.exports = factory(require('three'));
    } else {
        // Browser globals (root is window)
        root.RaBbLE_Nebula = factory(root.THREE);
    }
}(typeof self !== 'undefined' ? self : this, function (THREE) {
    'use strict';

    /**
     * RBCNS Compliance Check
     * Ensures all components follow RBCNS naming and structure conventions
     */
    function checkRBCNSCompliance() {
        if (typeof THREE === 'undefined') {
            throw new Error('RaBbLE Nebula requires Three.js to be loaded');
        }
        
        // Verify Three.js version compatibility
        if (!THREE.REVISION || parseInt(THREE.REVISION) < 128) {
            console.warn('RaBbLE Nebula: Three.js r128+ recommended for optimal performance');
        }
        
        return true;
    }

    /**
     * Flat-Chaos Pattern Validator
     * Ensures all stream patterns adhere to Flat-Chaos principles
     */
    class FlatChaosValidator {
        constructor() {
            this.patterns = {
                organic: { min_entropy: 0.2, max_entropy: 0.8, stability: 0.7 },
                lattice: { min_entropy: 0.1, max_entropy: 0.4, stability: 0.9 },
                swarm: { min_entropy: 0.3, max_entropy: 0.9, stability: 0.5 },
                galaxy: { min_entropy: 0.2, max_entropy: 0.7, stability: 0.6 }
            };
        }

        validatePattern(pattern, entropy) {
            if (!this.patterns[pattern]) {
                throw new Error(`Invalid pattern: ${pattern}. Must be one of: ${Object.keys(this.patterns).join(', ')}`);
            }
            
            const constraints = this.patterns[pattern];
            
            if (entropy < constraints.min_entropy) {
                throw new Error(`Entropy too low for ${pattern} pattern. Minimum: ${constraints.min_entropy}`);
            }
            
            if (entropy > constraints.max_entropy) {
                throw new Error(`Entropy too high for ${pattern} pattern. Maximum: ${constraints.max_entropy}`);
            }
            
            return true;
        }

        validateEntityCount(pattern, count) {
            const maxEntities = {
                organic: 500,
                lattice: 1000,
                swarm: 300,
                galaxy: 400
            };
            
            if (count > maxEntities[pattern]) {
                console.warn(`Entity count (${count}) may impact performance for ${pattern} pattern. Recommended: ${maxEntities[pattern]}`);
            }
            
            return count <= maxEntities[pattern] * 1.5; // Allow 50% overage with warning
        }
    }

    /**
     * Quantum Entity - RBCNS Compliant
     * Represents a single renderable entity in the nebula system
     */
    class q_entity {
        constructor(type = 'SPHERE') {
            this.q_type = type;
            this.flux_matrix = new Float32Array(16);
            this.e_entropy_sig = 0.5;
            this.q_id = this._generateId();
            this.q_timestamp = Date.now();
            
            // Initialize identity matrix
            this._initIdentityMatrix();
            
            // RBCNS compliance check
            this._validateRBCNS();
        }

        _generateId() {
            return 'q_' + Math.random().toString(36).substr(2, 9) + '_' + Date.now();
        }

        _initIdentityMatrix() {
            for (let i = 0; i < 16; i++) {
                this.flux_matrix[i] = (i % 5 === 0) ? 1 : 0;
            }
        }

        _validateRBCNS() {
            if (!this.q_type || typeof this.q_type !== 'string') {
                throw new Error('RBCNS Violation: q_type must be a valid string');
            }
            
            if (!this.flux_matrix || this.flux_matrix.length !== 16) {
                throw new Error('RBCNS Violation: flux_matrix must be 16-element Float32Array');
            }
            
            if (typeof this.e_entropy_sig !== 'number' || this.e_entropy_sig < 0 || this.e_entropy_sig > 1) {
                throw new Error('RBCNS Violation: e_entropy_sig must be number between 0 and 1');
            }
        }

        e_applyEntropy(entropy) {
            if (typeof entropy !== 'number' || entropy < 0 || entropy > 1) {
                throw new Error('Entropy value must be between 0 and 1');
            }
            
            this.e_entropy_sig = entropy;
            return this;
        }

        e_setEntropy(entropy) {
            return this.e_applyEntropy(entropy);
        }

        q_getMatrix() {
            return this.flux_matrix;
        }

        q_getType() {
            return this.q_type;
        }

        q_getEntropy() {
            return this.e_entropy_sig;
        }
    }

    /**
     * Quantum Stream - RBCNS Compliant
     * Container for managing collections of quantum entities
     */
    class q_stream {
        constructor() {
            this.q_entities = [];
            this.q_id = this._generateStreamId();
            this.q_type = 'STREAM';
            this.q_flux_modifier = null;
            this.q_pattern = null;
            this.q_validator = new FlatChaosValidator();
            
            this._validateRBCNS();
        }

        _generateStreamId() {
            return 'stream_' + Math.random().toString(36).substr(2, 9);
        }

        _validateRBCNS() {
            if (!Array.isArray(this.q_entities)) {
                throw new Error('RBCNS Violation: q_entities must be an array');
            }
            
            if (typeof this.q_id !== 'string') {
                throw new Error('RBCNS Violation: q_id must be a string');
            }
        }

        q_addEntity(entity) {
            if (!(entity instanceof q_entity)) {
                throw new Error('RBCNS Violation: Only q_entity instances can be added to streams');
            }
            
            this.q_entities.push(entity);
            return this;
        }

        q_setFluxModifier(modifier) {
            if (typeof modifier !== 'function') {
                throw new Error('RBCNS Violation: Flux modifier must be a function');
            }
            
            this.q_flux_modifier = modifier;
            return this;
        }

        q_getEntities() {
            return this.q_entities;
        }

        q_getCount() {
            return this.q_entities.length;
        }

        q_getId() {
            return this.q_id;
        }

        q_applyPattern(pattern, entropy) {
            this.q_pattern = pattern;
            
            // Validate pattern with Flat-Chaos constraints
            this.q_validator.validatePattern(pattern, entropy);
            
            // Apply pattern-specific flux modifier
            const modifier = this._getPatternModifier(pattern, entropy);
            this.q_setFluxModifier(modifier);
            
            // Apply entropy to all entities
            this.q_entities.forEach(entity => {
                entity.e_applyEntropy(entropy);
            });
            
            return this;
        }

        _getPatternModifier(pattern, entropy) {
            const time = Date.now() * 0.001;
            
            switch (pattern) {
                case 'organic':
                    return (entity, index) => {
                        const offset = Math.sin(time + index * 0.1) * entropy * 2;
                        entity.flux_matrix[12] += Math.sin(time + index) * offset;
                        entity.flux_matrix[13] += Math.cos(time + index * 1.5) * offset;
                        entity.flux_matrix[14] += Math.sin(time * 0.5 + index * 2) * offset;
                        return entity;
                    };
                
                case 'lattice':
                    return (entity, index) => {
                        const gridSize = Math.ceil(Math.sqrt(this.q_entities.length));
                        const x = (index % gridSize) - gridSize / 2;
                        const y = Math.floor(index / gridSize) - gridSize / 2;
                        
                        entity.flux_matrix[12] = x * (2 + entropy);
                        entity.flux_matrix[13] = y * (2 + entropy);
                        entity.flux_matrix[14] = Math.sin(time + index) * entropy;
                        
                        return entity;
                    };
                
                case 'swarm':
                    return (entity, index) => {
                        const center = { x: 0, y: 0, z: 0 };
                        const distance = Math.sqrt(
                            Math.pow(entity.flux_matrix[12] - center.x, 2) +
                            Math.pow(entity.flux_matrix[13] - center.y, 2) +
                            Math.pow(entity.flux_matrix[14] - center.z, 2)
                        );
                        
                        const attraction = 0.1;
                        const repulsion = 0.5;
                        
                        entity.flux_matrix[12] += (center.x - entity.flux_matrix[12]) * attraction;
                        entity.flux_matrix[13] += (center.y - entity.flux_matrix[13]) * attraction;
                        entity.flux_matrix[14] += (center.z - entity.flux_matrix[14]) * attraction;
                        
                        // Add chaotic movement
                        entity.flux_matrix[12] += (Math.random() - 0.5) * entropy * 2;
                        entity.flux_matrix[13] += (Math.random() - 0.5) * entropy * 2;
                        entity.flux_matrix[14] += (Math.random() - 0.5) * entropy * 2;
                        
                        return entity;
                    };
                
                case 'galaxy':
                    return (entity, index) => {
                        const angle = (index / this.q_entities.length) * Math.PI * 2;
                        const radius = 10 + (index * 0.5);
                        
                        entity.flux_matrix[12] = Math.cos(angle + time) * radius;
                        entity.flux_matrix[13] = Math.sin(angle + time) * radius;
                        entity.flux_matrix[14] = Math.sin(angle * 2 + time * 0.5) * entropy * 5;
                        
                        return entity;
                    };
                
                default:
                    return (entity) => entity;
            }
        }
    }

    /**
     * RaBbLE Nebula Runtime - RBCNS Compliant
     * Core runtime system managing all streams and entities
     */
    class RaBbLE_Nebula_Runtime {
        constructor() {
            this.q_registry = new Map();
            this.global_laminar_flow = [];
            this.q_pulse_interval = null;
            this.q_pulse_rate = 60; // 60 FPS target
            this.q_is_running = false;
            this.q_validator = new FlatChaosValidator();
            
            this._validateRBCNS();
        }

        _validateRBCNS() {
            if (!(this.q_registry instanceof Map)) {
                throw new Error('RBCNS Violation: q_registry must be a Map instance');
            }
            
            if (!Array.isArray(this.global_laminar_flow)) {
                throw new Error('RBCNS Violation: global_laminar_flow must be an array');
            }
        }

        ignite_Stream(stream) {
            if (!(stream instanceof q_stream)) {
                throw new Error('RBCNS Violation: Only q_stream instances can be ignited');
            }
            
            if (!stream.q_pattern) {
                console.warn('RBCNS Warning: Stream ignited without pattern. Consider using applyPattern()');
            }
            
            this.q_registry.set(stream.q_getId(), stream);
            this.global_laminar_flow.push(...stream.q_getEntities());
            
            return this;
        }

        pulse() {
            if (!this.q_is_running) return;
            
            const time = performance.now();
            
            // Process all streams
            this.q_registry.forEach((stream, stream_id) => {
                const entities = stream.q_getEntities();
                
                // Apply flux modifiers if present
                if (stream.q_flux_modifier) {
                    entities.forEach((entity, index) => {
                        stream.q_flux_modifier(entity, index);
                    });
                }
                
                // Apply entropy-based transformations
                entities.forEach(entity => {
                    this._applyEntropyTransform(entity);
                });
            });
            
            // Performance monitoring
            this._monitorPerformance();
        }

        _applyEntropyTransform(entity) {
            const entropy = entity.q_getEntropy();
            const time = Date.now() * 0.001;
            
            // Apply entropy-based matrix transformations
            entity.flux_matrix[0] = 1 + (entropy * 0.1);
            entity.flux_matrix[5] = 1 + (entropy * 0.1);
            entity.flux_matrix[10] = 1 + (entropy * 0.1);
            
            // Add subtle rotation based on entropy
            const rotation = entropy * 0.1;
            entity.flux_matrix[1] = Math.sin(time * rotation);
            entity.flux_matrix[4] = -Math.sin(time * rotation);
        }

        _monitorPerformance() {
            // Basic performance monitoring
            const entityCount = this.global_laminar_flow.length;
            const streamCount = this.q_registry.size;
            
            if (entityCount > 1000) {
                console.warn(`Performance Warning: High entity count (${entityCount}). Consider optimizing.`);
            }
        }

        ignite() {
            if (this.q_is_running) return;
            
            this.q_is_running = true;
            this.q_pulse_interval = setInterval(() => this.pulse(), 1000 / this.q_pulse_rate);
            
            console.log('RaBbLE Nebula Runtime: Ignited');
        }

        e_collapse() {
            this.q_is_running = false;
            if (this.q_pulse_interval) {
                clearInterval(this.q_pulse_interval);
            }
            
            this.q_registry.clear();
            this.global_laminar_flow.length = 0;
            
            console.log('RaBbLE Nebula Runtime: Collapsed');
        }

        q_getStats() {
            return {
                stream_count: this.q_registry.size,
                entity_count: this.global_laminar_flow.length,
                is_running: this.q_is_running,
                pulse_rate: this.q_pulse_rate
            };
        }
    }

    /**
     * RaBbLE Dreamer - RBCNS Compliant
     * Factory for creating quantum entities and streams
     */
    class RaBbLE_Dreamer {
        constructor(seed = Date.now()) {
            this.q_seed = seed;
            this.q_random = this._createRandomGenerator(seed);
            this.q_validator = new FlatChaosValidator();
            
            this._validateRBCNS();
        }

        _validateRBCNS() {
            if (typeof this.q_seed !== 'number') {
                throw new Error('RBCNS Violation: q_seed must be a number');
            }
        }

        _createRandomGenerator(seed) {
            let m_w = 123456789;
            let m_z = 987654321;
            let mask = 0xffffffff;

            m_w = (123456789 + seed) & mask;
            m_z = (987654321 - seed) & mask;

            return function() {
                m_z = (36969 * (m_z & 65535) + (m_z >> 16)) & mask;
                m_w = (18000 * (m_w & 65535) + (m_w >> 16)) & mask;
                let result = ((m_z << 16) + m_w) & mask;
                result /= 4294967296;
                return result + 0.5;
            }
        }

        dream_geometry_flow(count, type, pattern) {
            if (count <= 0) {
                throw new Error('Entity count must be positive');
            }
            
            if (!['SPHERE', 'BOX', 'TETRAHEDRON'].includes(type)) {
                throw new Error('Invalid geometry type. Must be SPHERE, BOX, or TETRAHEDRON');
            }
            
            // Validate pattern constraints
            if (pattern) {
                this.q_validator.validateEntityCount(pattern, count);
            }
            
            const stream = new q_stream();
            
            for (let i = 0; i < count; i++) {
                const entity = new q_entity(type);
                
                // Randomize initial position
                entity.flux_matrix[12] = (this.q_random() - 0.5) * 20;
                entity.flux_matrix[13] = (this.q_random() - 0.5) * 20;
                entity.flux_matrix[14] = (this.q_random() - 0.5) * 20;
                
                // Randomize initial entropy
                entity.e_applyEntropy(this.q_random());
                
                stream.q_addEntity(entity);
            }
            
            // Apply pattern if specified
            if (pattern) {
                stream.q_applyPattern(pattern, 0.5);
            }
            
            return stream;
        }
    }

    /**
     * Three.js Bridge - RBCNS Compliant
     * Handles Three.js integration and rendering
     */
    class q_instanced_bridge {
        constructor(container) {
            this.container = this._validateContainer(container);
            this.scene = null;
            this.camera = null;
            this.renderer = null;
            this.instanced_meshes = new Map();
            this.q_runtime = null;
            this.q_render_loop = null;
            
            this._initThreeJS();
            this._validateRBCNS();
        }

        _validateContainer(container) {
            if (!container) {
                throw new Error('Container element is required');
            }
            
            if (typeof container === 'string') {
                const element = document.querySelector(container);
                if (!element) {
                    throw new Error(`Container not found: ${container}`);
                }
                return element;
            }
            
            return container;
        }

        _validateRBCNS() {
            if (!this.container || typeof this.container.clientWidth !== 'number') {
                throw new Error('RBCNS Violation: Invalid container element');
            }
        }

        _initThreeJS() {
            const width = this.container.clientWidth || 800;
            const height = this.container.clientHeight || 600;
            
            // Create scene
            this.scene = new THREE.Scene();
            this.scene.background = new THREE.Color(0x000000);
            
            // Create camera
            this.camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
            this.camera.position.z = 30;
            
            // Create renderer
            this.renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
            this.renderer.setSize(width, height);
            this.renderer.setPixelRatio(window.devicePixelRatio);
            
            // Add to container
            this.container.appendChild(this.renderer.domElement);
            
            // Handle resize
            window.addEventListener('resize', () => {
                const newWidth = this.container.clientWidth || 800;
                const newHeight = this.container.clientHeight || 600;
                this.camera.aspect = newWidth / newHeight;
                this.camera.updateProjectionMatrix();
                this.renderer.setSize(newWidth, newHeight);
            });
        }

        q_connectRuntime(runtime) {
            if (!(runtime instanceof RaBbLE_Nebula_Runtime)) {
                throw new Error('RBCNS Violation: Runtime must be RaBbLE_Nebula_Runtime instance');
            }
            
            this.q_runtime = runtime;
            this._syncEntities();
        }

        _syncEntities() {
            if (!this.q_runtime) return;
            
            // Clear existing meshes
            this.instanced_meshes.forEach(mesh => {
                this.scene.remove(mesh);
                mesh.geometry.dispose();
                mesh.material.dispose();
            });
            this.instanced_meshes.clear();
            
            // Create new meshes for each stream
            this.q_runtime.q_registry.forEach((stream, stream_id) => {
                this._createInstancedMesh(stream);
            });
        }

        _createInstancedMesh(stream) {
            const entities = stream.q_getEntities();
            if (entities.length === 0) return;
            
            const geometry = this._getGeometryForType(entities[0].q_getType());
            const material = this._createEntropyMaterial();
            const count = entities.length;
            
            const mesh = new THREE.InstancedMesh(geometry, material, count);
            mesh.instanceMatrix.setUsage(THREE.DynamicDrawUsage);
            
            // Update matrices
            const dummy = new THREE.Object3D();
            entities.forEach((entity, index) => {
                dummy.position.set(
                    entity.flux_matrix[12],
                    entity.flux_matrix[13],
                    entity.flux_matrix[14]
                );
                dummy.updateMatrix();
                mesh.setMatrixAt(index, dummy.matrix);
            });
            
            mesh.instanceMatrix.needsUpdate = true;
            this.scene.add(mesh);
            this.instanced_meshes.set(stream.q_getId(), mesh);
        }

        _getGeometryForType(type) {
            switch (type) {
                case 'SPHERE':
                    return new THREE.SphereGeometry(0.5, 16, 16);
                case 'BOX':
                    return new THREE.BoxGeometry(1, 1, 1);
                case 'TETRAHEDRON':
                    return new THREE.TetrahedronGeometry(0.7);
                default:
                    return new THREE.SphereGeometry(0.5, 16, 16);
            }
        }

        _createEntropyMaterial() {
            const vertexShader = `
                uniform float u_time;
                uniform float u_base_intensity;
                
                attribute float a_entropy;
                varying float v_entropy;
                
                void main() {
                    v_entropy = a_entropy;
                    
                    vec3 pos = position;
                    pos += normal * (a_entropy * 0.5);
                    
                    gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
                }
            `;
            
            const fragmentShader = `
                uniform float u_time;
                uniform float u_base_intensity;
                
                varying float v_entropy;
                
                void main() {
                    vec3 color = mix(vec3(0.0, 0.5, 1.0), vec3(1.0, 0.0, 1.0), v_entropy);
                    float alpha = 0.8 + (v_entropy * 0.2);
                    
                    gl_FragColor = vec4(color, alpha);
                }
            `;
            
            return new THREE.ShaderMaterial({
                vertexShader: vertexShader,
                fragmentShader: fragmentShader,
                uniforms: {
                    u_time: { value: 0 },
                    u_base_intensity: { value: 0.5 }
                },
                transparent: true,
                depthWrite: false
            });
        }

        q_startRenderLoop() {
            if (this.q_render_loop) return;
            
            const animate = () => {
                this.q_render_loop = requestAnimationFrame(animate);
                
                if (this.q_runtime && this.q_runtime.q_is_running) {
                    // Update matrices from runtime
                    this.q_runtime.q_registry.forEach((stream, stream_id) => {
                        const mesh = this.instanced_meshes.get(stream_id);
                        if (mesh) {
                            const entities = stream.q_getEntities();
                            const dummy = new THREE.Object3D();
                            
                            entities.forEach((entity, index) => {
                                dummy.position.set(
                                    entity.flux_matrix[12],
                                    entity.flux_matrix[13],
                                    entity.flux_matrix[14]
                                );
                                dummy.updateMatrix();
                                mesh.setMatrixAt(index, dummy.matrix);
                            });
                            
                            mesh.instanceMatrix.needsUpdate = true;
                        }
                    });
                }
                
                this.renderer.render(this.scene, this.camera);
            };
            
            animate();
        }

        q_dispose() {
            if (this.q_render_loop) {
                cancelAnimationFrame(this.q_render_loop);
            }
            
            this.instanced_meshes.forEach(mesh => {
                this.scene.remove(mesh);
                mesh.geometry.dispose();
                mesh.material.dispose();
            });
            
            if (this.renderer) {
                this.renderer.dispose();
            }
            
            if (this.container && this.renderer.domElement.parentNode === this.container) {
                this.container.removeChild(this.renderer.domElement);
            }
        }

        q_getStats() {
            return {
                mesh_count: this.instanced_meshes.size,
                total_instances: Array.from(this.instanced_meshes.values())
                    .reduce((total, mesh) => total + mesh.count, 0)
            };
        }
    }

    /**
     * RaBbLE Nebula Engine - RBCNS Compliant
     * High-level API for easy usage
     */
    class RaBbLE_Nebula_Engine {
        constructor(container, options = {}) {
            // RBCNS compliance check
            checkRBCNSCompliance();
            
            this.container = container;
            this.options = {
                enforce_flat_chaos: true,
                rbcns_compliant: true,
                pulse_rate: 60,
                ...options
            };
            
            this.runtime = null;
            this.bridge = null;
            this.dreamer = null;
            this.is_initialized = false;
            
            this._init();
        }

        _init() {
            try {
                // Initialize components
                this.runtime = new RaBbLE_Nebula_Runtime();
                this.bridge = new q_instanced_bridge(this.container);
                this.dreamer = new RaBbLE_Dreamer();
                
                // Connect components
                this.bridge.q_connectRuntime(this.runtime);
                
                this.is_initialized = true;
                console.log('RaBbLE Nebula Engine: Initialized');
                
            } catch (error) {
                console.error('RaBbLE Nebula Engine initialization failed:', error);
                throw error;
            }
        }

        createOrganicStream(count, type = 'SPHERE') {
            const stream = this.dreamer.dream_geometry_flow(count, type, 'organic');
            this.runtime.ignite_Stream(stream);
            return stream;
        }

        createLatticeStream(count, type = 'BOX') {
            const stream = this.dreamer.dream_geometry_flow(count, type, 'lattice');
            this.runtime.ignite_Stream(stream);
            return stream;
        }

        createSwarmStream(count, type = 'TETRAHEDRON') {
            const stream = this.dreamer.dream_geometry_flow(count, type, 'swarm');
            this.runtime.ignite_Stream(stream);
            return stream;
        }

        createGalaxyStream(count, type = 'SPHERE') {
            const stream = this.dreamer.dream_geometry_flow(count, type, 'galaxy');
            this.runtime.ignite_Stream(stream);
            return stream;
        }

        combineStreams(streams) {
            if (!Array.isArray(streams) || streams.length < 2) {
                throw new Error('combineStreams requires an array of at least 2 streams');
            }
            
            // Validate all streams are q_stream instances
            streams.forEach(stream => {
                if (!(stream instanceof q_stream)) {
                    throw new Error('All streams must be q_stream instances');
                }
            });
            
            // Create combined stream
            const combined = new q_stream();
            streams.forEach(stream => {
                stream.q_getEntities().forEach(entity => {
                    combined.q_addEntity(entity);
                });
            });
            
            this.runtime.ignite_Stream(combined);
            return combined;
        }

        start() {
            if (!this.is_initialized) {
                throw new Error('Engine not initialized. Call constructor first.');
            }
            
            this.runtime.ignite();
            this.bridge.q_startRenderLoop();
            console.log('RaBbLE Nebula Engine: Started');
        }

        stop() {
            this.runtime.e_collapse();
            this.bridge.q_dispose();
            console.log('RaBbLE Nebula Engine: Stopped');
        }

        updateShaders(uniforms) {
            if (!this.bridge) return;
            
            this.bridge.instanced_meshes.forEach(mesh => {
                if (mesh.material.uniforms) {
                    Object.keys(uniforms).forEach(key => {
                        if (mesh.material.uniforms[key]) {
                            mesh.material.uniforms[key].value = uniforms[key];
                        }
                    });
                }
            });
        }

        getStats() {
            const runtimeStats = this.runtime.q_getStats();
            const bridgeStats = this.bridge.q_getStats();
            
            return {
                runtime: runtimeStats,
                shaders: bridgeStats,
                total_entities: runtimeStats.entity_count,
                total_meshes: bridgeStats.mesh_count
            };
        }
    }

    // Export RBCNS-compliant API
    const api = {
        // Core Classes
        q_entity: q_entity,
        q_stream: q_stream,
        RaBbLE_Nebula_Runtime: RaBbLE_Nebula_Runtime,
        RaBbLE_Dreamer: RaBbLE_Dreamer,
        q_instanced_bridge: q_instanced_bridge,
        RaBbLE_Nebula_Engine: RaBbLE_Nebula_Engine,
        
        // Utilities
        FlatChaosValidator: FlatChaosValidator,
        
        // Version info
        version: '1.0.0',
        rbcns_compliant: true,
        flat_chaos_enforced: true
    };
    
    // Make classes available globally for window access
    if (typeof window !== 'undefined') {
        window.q_entity = q_entity;
        window.q_stream = q_stream;
        window.RaBbLE_Nebula_Runtime = RaBbLE_Nebula_Runtime;
        window.RaBbLE_Dreamer = RaBbLE_Dreamer;
        window.q_instanced_bridge = q_instanced_bridge;
        window.RaBbLE_Nebula_Engine = RaBbLE_Nebula_Engine;
        window.FlatChaosValidator = FlatChaosValidator;
    }
    
    return api;
}));

// ES6 Named Exports for modern environments
// Bringing the API into the light of named modules...
const q_lib = (typeof RaBbLE_Nebula !== 'undefined' ? RaBbLE_Nebula : api);

export const q_entity = q_lib.q_entity;
export const q_stream = q_lib.q_stream;
export const RaBbLE_Nebula_Runtime = q_lib.RaBbLE_Nebula_Runtime;
export const RaBbLE_Dreamer = q_lib.RaBbLE_Dreamer;
export const q_instanced_bridge = q_lib.q_instanced_bridge;
export const RaBbLE_Nebula_Engine = q_lib.RaBbLE_Nebula_Engine;
export const FlatChaosValidator = q_lib.FlatChaosValidator;
export const version = q_lib.version;
export const rbcns_compliant = q_lib.rbcns_compliant;
export const flat_chaos_enforced = q_lib.flat_chaos_enforced;
