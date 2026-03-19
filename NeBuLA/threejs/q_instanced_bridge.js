// RaBbLE Three.js Instanced Bridge
// The bridge for web applications using instanced architecture
// Every stream is a pipeline; every pipeline is a renderable

// ES6 Module Import - The quantum tunnel to Runtime consciousness
import { RaBbLE_Nebula_Runtime } from '../core/RaBbLE_Nebula_Runtime.js';

/**
 * q_instanced_bridge - Three.js Integration Bridge
 * Converts quantum entities into Three.js InstancedMesh objects
 * 
 * @property {THREE.Scene} q_scene - Three.js scene
 * @property {THREE.Camera} q_camera - Three.js camera
 * @property {THREE.WebGLRenderer} q_renderer - Three.js renderer
 * @property {Map<string, THREE.InstancedMesh>} q_instanced_meshes - Instanced meshes by DNA type
 * @property {Map<string, THREE.Matrix4>} q_matrices - Matrix cache for entities
 * @property {RaBbLE_Nebula_Runtime} q_runtime - Connected runtime
 */
class q_instanced_bridge {
  /**
   * Create a new Three.js bridge
   * @param {HTMLElement} container - DOM element to attach renderer
   * @param {Object} [options] - Configuration options
   */
  constructor(container, options = {}) {
    // The bridge is forming... connecting the quantum realm to the visual world.
    // This is where abstract data becomes concrete beauty through Three.js.
    this.container = container;
    this.options = {
      antialias: true,
      alpha: true,
      background: new THREE.Color(0x000000),
      ...options
    };
    
    this.q_scene = null;
    this.q_camera = null;
    this.q_renderer = null;
    this.q_instanced_meshes = new Map();
    this.q_matrices = new Map();
    this.q_runtime = null;
    this.is_initialized = false;
    
    // Entropy shader uniforms
    this.e_shader_uniforms = {
      u_time: { value: 0 },
      u_entropy: { value: 0.5 }
    };
    
    this._initThreeJS();
    console.log('Three.js instanced bridge initialized');
  }

  /**
   * Initialize Three.js scene, camera, and renderer
   * @private
   */
  _initThreeJS() {
    // Create scene
    this.q_scene = new THREE.Scene();
    this.q_scene.background = this.options.background;
    
    // Create camera
    this.q_camera = new THREE.PerspectiveCamera(75, this.container.clientWidth / this.container.clientHeight, 0.1, 1000);
    this.q_camera.position.z = 20;
    
    // Create renderer
    this.q_renderer = new THREE.WebGLRenderer({
      antialias: this.options.antialias,
      alpha: this.options.alpha
    });
    this.q_renderer.setSize(this.container.clientWidth, this.container.clientHeight);
    this.q_renderer.setPixelRatio(window.devicePixelRatio);
    
    // Add to container
    this.container.appendChild(this.q_renderer.domElement);
    
    // Handle resize
    window.addEventListener('resize', () => {
      this.q_camera.aspect = this.container.clientWidth / this.container.clientHeight;
      this.q_camera.updateProjectionMatrix();
      this.q_renderer.setSize(this.container.clientWidth, this.container.clientHeight);
    });
    
    this.is_initialized = true;
  }

  /**
   * Connect to a RaBbLE Nebula Runtime
   * @param {RaBbLE_Nebula_Runtime} runtime - Runtime to connect to
   * @returns {q_instanced_bridge} This bridge for chaining
   */
  q_connectRuntime(runtime) {
    if (!(runtime instanceof RaBbLE_Nebula_Runtime)) {
      console.error('q_connectRuntime requires a RaBbLE_Nebula_Runtime instance');
      return this;
    }
    
    this.q_runtime = runtime;
    
    // Set up transmutation callback
    // The runtime pulses, and the bridge listens for the echoes.
    this.q_runtime.onTransmutation = (q_entities_flux) => {
      this._updateInstancedMeshes(q_entities_flux);
    };

    // Listen for new streams being ignited in the runtime
    this.q_runtime.onStreamIgnited = (q_new_stream) => {
      // A new river joins the delta! We must manifest its entities.
      // We already have a mechanism for updating existing meshes, but we need to ensure the mesh itself is created.
      // The _updateInstancedMeshes function will handle the actual matrix updates.
      const q_dna_type = q_new_stream.q_entities[0].dna_type;
      if (!this.q_instanced_meshes.has(q_dna_type)) {
        // If we don't have a mesh for this type yet, create one.
        this._createInstancedMesh(q_dna_type, q_new_stream.q_entities.length);
      }
      this._updateInstancedMeshes(q_new_stream.q_entities);
    };
    
    console.log("Connected to RaBbLE Nebula Runtime");
    return this;
  }

  /**
   * Create instanced mesh for a specific DNA type
   * @param {string} dna_type - Type of geometry to create
   * @param {number} count - Number of instances
   * @returns {THREE.InstancedMesh} Created instanced mesh
   */
  _createInstancedMesh(dna_type, count) {
    let geometry;
    
    switch (dna_type) {
      case 'BOX':
        geometry = new THREE.BoxGeometry(1, 1, 1);
        break;
      case 'SPHERE':
        geometry = new THREE.SphereGeometry(0.5, 16, 16);
        break;
      case 'TETRAHEDRON':
        geometry = new THREE.TetrahedronGeometry(0.8);
        break;
      default:
        geometry = new THREE.BoxGeometry(1, 1, 1);
    }
    
    // Create material with entropy shader
    const material = this._createEntropyMaterial(dna_type);
    
    // Create instanced mesh
    const instancedMesh = new THREE.InstancedMesh(geometry, material, count);
    instancedMesh.instanceMatrix.setUsage(THREE.DynamicDrawUsage);
    
    // Add to scene
    this.q_scene.add(instancedMesh);
    
    console.log(`Created instanced mesh for ${dna_type} with ${count} instances`);
    return instancedMesh;
  }

  /**
   * Create entropy-driven material
   * Using MeshBasicMaterial for guaranteed visibility, with shader effects planned
   * @param {string} dna_type - Type for material customization
   * @returns {THREE.Material} Entropy material
   */
  _createEntropyMaterial(dna_type) {
    const baseColor = this._getColorForType(dna_type);
    
    // Use MeshBasicMaterial for guaranteed visibility
    // Shader effects will be added via onBeforeCompile
    const material = new THREE.MeshBasicMaterial({
      color: baseColor,
      transparent: true,
      opacity: 0.9
    });
    
    // Inject entropy shader modifications
    material.onBeforeCompile = (shader) => {
      // Inject uniforms into shader
      shader.uniforms.u_time = this.e_shader_uniforms.u_time;
      shader.uniforms.u_entropy = this.e_shader_uniforms.u_entropy;
      
      // Add uniform declarations to vertex shader
      shader.vertexShader = `
        uniform float u_time;
        uniform float u_entropy;
        ${shader.vertexShader}
      `.replace(
        '#include <begin_vertex>',
        `#include <begin_vertex>
        
        // Entropy-driven vertex displacement
        float time = u_time;
        float entropy = u_entropy;
        
        // Create organic movement based on position
        float noise = sin(position.x * 2.0 + time) * cos(position.y * 2.0 + time * 1.5);
        float displacement = noise * entropy * 0.1;
        
        // Apply displacement
        transformed += normal * displacement;
        `
      );
      
      // Add uniform declarations to fragment shader
      shader.fragmentShader = `
        uniform float u_time;
        uniform float u_entropy;
        ${shader.fragmentShader}
      `.replace(
        '#include <output_fragment>',
        `#include <output_fragment>
        
        // Add entropy-based color variation
        vec3 entropyColor = vec3(u_entropy * 0.5, 1.0 - u_entropy * 0.3, u_entropy * 0.8);
        gl_FragColor.rgb = mix(gl_FragColor.rgb, entropyColor, u_entropy * 0.2);
        `
      );
    };
    
    return material;
  }

  /**
   * Get color for DNA type
   * @private
   * @param {string} dna_type - Type to get color for
   * @returns {number} Hex color value
   */
  _getColorForType(dna_type) {
    const colors = {
      'BOX': 0x8a2be2,      // Purple
      'SPHERE': 0x00ffff,   // Cyan
      'TETRAHEDRON': 0xff00ff // Magenta
    };
    
    return colors[dna_type] || 0xffffff;
  }

  /**
   * Update instanced meshes with current entity data
   * @private
   * @param {Array<q_entity>} entities - Current entities from runtime
   */
  _updateInstancedMeshes(entities) {
    // Group entities by DNA type
    const entities_by_type = {};
    
    entities.forEach(entity => {
      if (!entities_by_type[entity.dna_type]) {
        entities_by_type[entity.dna_type] = [];
      }
      entities_by_type[entity.dna_type].push(entity);
    });
    
    // Update or create instanced meshes for each type
    Object.keys(entities_by_type).forEach(dna_type => {
      const type_entities = entities_by_type[dna_type];
      let instancedMesh = this.q_instanced_meshes.get(dna_type);
      
      // Create or resize instanced mesh
      if (!instancedMesh || instancedMesh.count !== type_entities.length) {
        if (instancedMesh) {
          this.q_scene.remove(instancedMesh);
          instancedMesh.geometry.dispose();
          instancedMesh.material.dispose();
        }
        
        instancedMesh = this._createInstancedMesh(dna_type, type_entities.length);
        this.q_instanced_meshes.set(dna_type, instancedMesh);
      }
      
      // Update matrices
      const q_matrix_instance = new THREE.Matrix4();
      const q_dummy_object = new THREE.Object3D();
      
      type_entities.forEach((q_entity_instance, q_index) => {
        // The entity's flux matrix becomes the instance's transformation
        q_matrix_instance.fromArray(q_entity_instance.flux_matrix);

        // Apply entropy-based scaling as a separate step
        // The size of the entity pulses with its inner chaos.
        const e_scale_factor = 1.0 + (q_entity_instance.e_entropy_sig * 0.5);
        q_dummy_object.position.set(q_matrix_instance.elements[12], q_matrix_instance.elements[13], q_matrix_instance.elements[14]);
        q_dummy_object.scale.set(e_scale_factor, e_scale_factor, e_scale_factor);
        q_dummy_object.rotation.setFromRotationMatrix(q_matrix_instance);
        q_dummy_object.updateMatrix();

        instancedMesh.setMatrixAt(q_index, q_dummy_object.matrix);
      });
      
      instancedMesh.instanceMatrix.needsUpdate = true;
    });
    
    // Remove unused instanced meshes
    const active_types = Object.keys(entities_by_type);
    this.q_instanced_meshes.forEach((mesh, type) => {
      if (!active_types.includes(type)) {
        this.q_scene.remove(mesh);
        mesh.geometry.dispose();
        mesh.material.dispose();
        this.q_instanced_meshes.delete(type);
      }
    });
  }

  /**
   * Start the render loop
   * @returns {q_instanced_bridge} This bridge for chaining
   */
  q_startRenderLoop() {
    if (!this.is_initialized) {
      console.error('Bridge not initialized');
      return this;
    }
    
    const animate = () => {
      requestAnimationFrame(animate);
      
      // Update shader uniforms
      this.e_shader_uniforms.u_time.value = performance.now() * 0.001;
      
      // Update entropy from runtime if available
      if (this.q_runtime) {
        const stats = this.q_runtime.q_extractStats();
        const avg_entropy = this._calculateAverageEntropy();
        this.e_shader_uniforms.u_entropy.value = avg_entropy;
      }
      
      // Render scene
      this.q_renderer.render(this.q_scene, this.q_camera);
    };
    
    animate();
    console.log('Three.js render loop started');
    return this;
  }

  /**
   * Calculate average entropy from all entities
   * @private
   * @returns {number} Average entropy value
   */
  _calculateAverageEntropy() {
    if (!this.q_runtime) return 0.5;
    
    let total_entropy = 0;
    let entity_count = 0;
    
    this.q_runtime.q_registry.forEach(stream => {
      stream.q_entities.forEach(entity => {
        total_entropy += entity.e_entropy_sig;
        entity_count++;
      });
    });
    
    return entity_count > 0 ? total_entropy / entity_count : 0.5;
  }

  /**
   * Dispose of resources
   * @returns {q_instanced_bridge} This bridge for chaining
   */
  q_dispose() {
    // Dispose instanced meshes
    this.q_instanced_meshes.forEach(mesh => {
      this.q_scene.remove(mesh);
      mesh.geometry.dispose();
      mesh.material.dispose();
    });
    this.q_instanced_meshes.clear();
    
    // Dispose renderer
    if (this.q_renderer) {
      this.q_renderer.dispose();
      this.container.removeChild(this.q_renderer.domElement);
    }
    
    // Clear references
    this.q_scene = null;
    this.q_camera = null;
    this.q_renderer = null;
    this.q_runtime = null;
    
    console.log('Three.js instanced bridge disposed');
    return this;
  }

  /**
   * Get bridge statistics
   * @returns {Object} Bridge statistics
   */
  q_getStats() {
    const stats = {
      is_initialized: this.is_initialized,
      instanced_meshes: this.q_instanced_meshes.size,
      total_instances: 0,
      scene_objects: this.q_scene ? this.q_scene.children.length : 0
    };
    
    this.q_instanced_meshes.forEach(mesh => {
      stats.total_instances += mesh.count;
    });
    
    return stats;
  }
}

// The Three.js bridge is complete... quantum entities now dance as instanced meshes.
// Each primitive type has its own instanced mesh, avoiding thousands of individual objects.
// The entropy shaders make them breathe, pulse, and come alive with chaos-driven beauty.

// ES6 Module Export - The vessel of quantum connection
export { q_instanced_bridge };
