// RaBbLE Three.js Instanced Bridge
// The bridge for web applications using instanced architecture
// Every stream is a pipeline; every pipeline is a renderable

// ES6 Module Import - The quantum tunnel to Runtime consciousness
import { RaBbLE_Nebula_Runtime } from '../core/RaBbLE_Nebula_Runtime.js';

// Shader sources - loaded from shader files
import { VERTEX_SHADER_INSTANCED } from '../shaders/vertex/q_instanced_vertex.glsl.js';
import { FRAGMENT_SHADER_FLAT } from '../shaders/fragment/q_flat_fragment.glsl.js';
import { FRAGMENT_SHADER_EMISSIVE } from '../shaders/fragment/q_emissive_fragment.glsl.js';

/**
 * q_instanced_bridge - Three.js Integration Bridge
 * Converts quantum entities into Three.js InstancedMesh objects
 * 
 * Uses multi-shader system:
 * - 1 shared vertex shader for all instanced meshes
 * - 2 fragment shaders: flat (no glow) and emissive (with glow)
 * - Entities grouped by material_type for batch rendering
 * 
 * @property {THREE.Scene} q_scene - Three.js scene
 * @property {THREE.Camera} q_camera - Three.js camera
 * @property {THREE.WebGLRenderer} q_renderer - Three.js renderer
 * @property {Map<string, THREE.InstancedMesh>} q_instanced_meshes - Instanced meshes by material key
 * @property {RaBbLE_Nebula_Runtime} q_runtime - Connected runtime
 * @property {Object} q_flat_material - Flat shader material template
 * @property {Object} q_emissive_material - Emissive shader material template
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
    this.q_runtime = null;
    this.is_initialized = false;
    
    // Per-instance attribute storage
    this.q_instance_attributes = new Map();
    
    // Shader material templates
    this.q_flat_material = null;
    this.q_emissive_material = null;
    
    // Entropy shader uniforms
    this.e_shader_uniforms = {
      u_time: { value: 0 },
      u_entropy: { value: 0.5 }
    };
    
    // Auto-rotation and zoom settings
    this.q_auto_rotation_speed = 0.00005; // Very slow rotation speed
    this.q_auto_zoom_speed = 0.001; // Gradual zoom speed
    this.q_zoom_target = 6; // Target zoom distance (close to vessel)
    this.q_rotation_direction = 1; // 1 for cosmic, -1 for dream
    
    this._initThreeJS();
    this._initShaderMaterials();
    console.log('Three.js instanced bridge initialized with multi-shader system');
  }

  /**
   * Initialize Three.js scene, camera, and renderer
   * @private
   */
  _initThreeJS() {
    // The quantum void awakens... but first check if the container exists.
    if (!this.container) {
      console.error('Container element is null or undefined');
      return;
    }
    
    // Get container dimensions with fallbacks for hidden/zero-size containers
    const q_width = this.container.clientWidth || 400;
    const q_height = this.container.clientHeight || 300;
    
    // Create scene
    this.q_scene = new THREE.Scene();
    this.q_scene.background = this.options.background;
    
    // Create camera - positioned in plane with eyes, looking at vessel center
    this.q_camera = new THREE.PerspectiveCamera(75, q_width / q_height, 0.1, 1000);
    this.q_camera.position.z = 0; // In plane with ellipses (eyes at z=0)
    
    // Camera orbit state - the quantum eye explores the void
    // Default: look at vessel center, rotated 90 degrees to face eyes
    this.q_camera_state = {
      theta: Math.PI / 2, // Horizontal orbit angle (90 degrees - facing eyes)
      phi: Math.PI / 2, // Vertical orbit angle (equator - straight on)
      radius: 6, // Distance from origin (zoomed in on vessel)
      target: new THREE.Vector3(0, 0.3, 0), // Look-at target (vessel center, slightly below eyes)
      is_dragging: false,
      last_mouse_x: 0,
      last_mouse_y: 0,
      pan_speed: 0.1,
      orbit_speed: 0.005,
      zoom_speed: 0.5
    };
    
    // Create renderer
    this.q_renderer = new THREE.WebGLRenderer({
      antialias: this.options.antialias,
      alpha: this.options.alpha
    });
    this.q_renderer.setSize(q_width, q_height);
    this.q_renderer.setPixelRatio(window.devicePixelRatio);
    
    // Add to container
    this.container.appendChild(this.q_renderer.domElement);
    
    // Initialize camera controls
    this._initCameraControls();
    
    // Handle resize
    const q_resize_handler = () => {
      const q_new_width = this.container.clientWidth || 400;
      const q_new_height = this.container.clientHeight || 300;
      this.q_camera.aspect = q_new_width / q_new_height;
      this.q_camera.updateProjectionMatrix();
      this.q_renderer.setSize(q_new_width, q_new_height);
    };
    
    window.addEventListener('resize', q_resize_handler);
    
    // Also observe container size changes (for when windows become visible)
    if (typeof ResizeObserver !== 'undefined') {
      this.q_resize_observer = new ResizeObserver(q_resize_handler);
      this.q_resize_observer.observe(this.container);
    }
    
    this.is_initialized = true;
    console.log('Three.js initialized with dimensions:', q_width, 'x', q_height);
  }

  /**
   * Initialize camera orbit controls
   * The quantum eye explores the void through mouse and keyboard
   * @private
   */
  _initCameraControls() {
    // The camera controls emerge... mouse and keyboard guide the quantum eye.
    const q_canvas = this.q_renderer.domElement;
    
    // Mouse drag for orbit rotation
    q_canvas.addEventListener('mousedown', (e) => {
      this.q_camera_state.is_dragging = true;
      this.q_camera_state.last_mouse_x = e.clientX;
      this.q_camera_state.last_mouse_y = e.clientY;
      q_canvas.style.cursor = 'grabbing';
    });
    
    document.addEventListener('mousemove', (e) => {
      if (!this.q_camera_state.is_dragging) return;
      
      const q_delta_x = e.clientX - this.q_camera_state.last_mouse_x;
      const q_delta_y = e.clientY - this.q_camera_state.last_mouse_y;
      
      // Orbit: horizontal drag rotates theta, vertical drag rotates phi
      this.q_camera_state.theta -= q_delta_x * this.q_camera_state.orbit_speed;
      this.q_camera_state.phi -= q_delta_y * this.q_camera_state.orbit_speed;
      
      // Clamp phi to prevent flipping
      this.q_camera_state.phi = Math.max(0.1, Math.min(Math.PI - 0.1, this.q_camera_state.phi));
      
      this.q_camera_state.last_mouse_x = e.clientX;
      this.q_camera_state.last_mouse_y = e.clientY;
      
      this._updateCameraPosition();
    });
    
    document.addEventListener('mouseup', () => {
      this.q_camera_state.is_dragging = false;
      q_canvas.style.cursor = 'grab';
    });
    
    // Scroll wheel for zoom
    q_canvas.addEventListener('wheel', (e) => {
      e.preventDefault();
      const q_zoom_delta = e.deltaY > 0 ? 1.1 : 0.9;
      this.q_camera_state.radius *= q_zoom_delta;
      
      // Clamp radius to reasonable bounds
      this.q_camera_state.radius = Math.max(5, Math.min(100, this.q_camera_state.radius));
      
      this._updateCameraPosition();
    });
    
    // Keyboard controls for pan and zoom
    const q_keys_pressed = new Set();
    
    document.addEventListener('keydown', (e) => {
      // Only respond if this canvas's container is visible
      if (this.container.offsetParent === null) return;
      
      q_keys_pressed.add(e.key.toLowerCase());
      
      // WASD for pan, QE for up/down, +/- for zoom
      const q_pan_step = this.q_camera_state.pan_speed * this.q_camera_state.radius;
      
      if (e.key === 'w' || e.key === 'W') {
        this.q_camera_state.target.y += q_pan_step;
      } else if (e.key === 's' || e.key === 'S') {
        this.q_camera_state.target.y -= q_pan_step;
      } else if (e.key === 'a' || e.key === 'A') {
        this.q_camera_state.target.x -= q_pan_step;
      } else if (e.key === 'd' || e.key === 'D') {
        this.q_camera_state.target.x += q_pan_step;
      } else if (e.key === 'q' || e.key === 'Q') {
        this.q_camera_state.target.z -= q_pan_step;
      } else if (e.key === 'e' || e.key === 'E') {
        this.q_camera_state.target.z += q_pan_step;
      } else if (e.key === '+' || e.key === '=') {
        this.q_camera_state.radius *= 0.9;
        this.q_camera_state.radius = Math.max(5, this.q_camera_state.radius);
      } else if (e.key === '-' || e.key === '_') {
        this.q_camera_state.radius *= 1.1;
        this.q_camera_state.radius = Math.min(100, this.q_camera_state.radius);
      } else if (e.key === 'r' || e.key === 'R') {
        // Reset camera to default position
        this.q_camera_state.theta = 0;
        this.q_camera_state.phi = Math.PI / 2;
        this.q_camera_state.radius = 20;
        this.q_camera_state.target.set(0, 0, 0);
      }
      
      this._updateCameraPosition();
    });
    
    document.addEventListener('keyup', (e) => {
      q_keys_pressed.delete(e.key.toLowerCase());
    });
    
    // Set initial cursor style
    q_canvas.style.cursor = 'grab';
    
    // Initial camera position update
    this._updateCameraPosition();
    
    console.log('Camera controls initialized: Drag to orbit, Scroll to zoom, WASD to pan, QE for depth, R to reset');
  }

  /**
   * Update camera position based on orbit state
   * The quantum eye moves through the void
   * @private
   */
  _updateCameraPosition() {
    // Convert spherical coordinates to Cartesian position
    const q_x = this.q_camera_state.radius * Math.sin(this.q_camera_state.phi) * Math.cos(this.q_camera_state.theta);
    const q_y = this.q_camera_state.radius * Math.cos(this.q_camera_state.phi);
    const q_z = this.q_camera_state.radius * Math.sin(this.q_camera_state.phi) * Math.sin(this.q_camera_state.theta);
    
    // Set camera position relative to target
    this.q_camera.position.set(
      this.q_camera_state.target.x + q_x,
      this.q_camera_state.target.y + q_y,
      this.q_camera_state.target.z + q_z
    );
    
    // Look at target
    this.q_camera.lookAt(this.q_camera_state.target);
  }

  /**
   * Initialize shader material templates
   * @private
   */
  _initShaderMaterials() {
    // The shaders awaken... flat and emissive, two paths through the quantum void.
    // Flat uses custom GLSL; emissive uses Three.js properties for true glow.
    
    // Flat material - no glow, just color and opacity via custom shader
    this.q_flat_material = {
      vertexShader: VERTEX_SHADER_INSTANCED,
      fragmentShader: FRAGMENT_SHADER_FLAT,
      transparent: true,
      side: THREE.DoubleSide,
      depthWrite: false
    };
    
    // Emissive material template - Three.js handles the glow
    // We store config, not the material itself (created per-mesh with proper uniforms)
    this.q_emissive_material = {
      type: 'emissive',
      transparent: true,
      side: THREE.DoubleSide,
      depthWrite: false
    };
    
    console.log('Shader material templates initialized');
  }

  /**
   * Transmute emissive material with Three.js glow properties
   * The emissive burns with quantum light - Three.js handles the radiance.
   * @param {number} f_emissive_color - Hex color for emission
   * @param {number} f_emissive_intensity - Intensity of emission (0.0 to 2.0)
   * @returns {THREE.MeshStandardMaterial} Emissive material with glow
   */
  q_transmuteEmissiveMaterial(f_emissive_color = 0xffffff, f_emissive_intensity = 1.0) {
    // The material awakens... emissive properties pulse with quantum glow.
    // No custom shader needed - Three.js radiates the light.
    return new THREE.MeshStandardMaterial({
      color: new THREE.Color(f_emissive_color),
      emissive: new THREE.Color(f_emissive_color),
      emissiveIntensity: f_emissive_intensity,
      transparent: true,
      opacity: 1.0,
      roughness: 0.5,
      metalness: 0.0,
      side: THREE.DoubleSide,
      depthWrite: false
    });
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
   * Create instanced mesh for a specific DNA type and material type
   * @param {string} dna_type - Type of geometry to create
   * @param {string} material_type - 'flat' or 'emissive'
   * @param {number} count - Number of instances
   * @returns {THREE.InstancedMesh} Created instanced mesh
   */
  _createInstancedMesh(dna_type, material_type, count) {
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
      case 'ELLIPSE':
        // The ellipse forms... a 2D portal of perception.
        const q_ellipse_shape = new THREE.Shape();
        q_ellipse_shape.absellipse(0, 0, 1, 1, 0, Math.PI * 2, false, 0);
        geometry = new THREE.ShapeGeometry(q_ellipse_shape, 32);
        break;
      case 'RING':
        // The ring emerges... a circle of quantum energy.
        const q_ring_shape = new THREE.Shape();
        q_ring_shape.absarc(0, 0, 1, 0, Math.PI * 2, false);
        const q_ring_hole = new THREE.Path();
        q_ring_hole.absarc(0, 0, 0.67, 0, Math.PI * 2, true);
        q_ring_shape.holes.push(q_ring_hole);
        geometry = new THREE.ShapeGeometry(q_ring_shape, 32);
        break;
      case 'LINE':
        // The line stretches... a path through the void.
        geometry = new THREE.PlaneGeometry(1, 0.06);
        break;
      default:
        geometry = new THREE.BoxGeometry(1, 1, 1);
    }
    
    // Select material based on type - flat uses custom shader, emissive uses Three.js glow
    // The emissive burns with quantum light through Three.js properties.
    let material;
    if (material_type === 'emissive') {
      // Emissive material - Three.js handles the radiance via MeshStandardMaterial
      material = this.q_transmuteEmissiveMaterial(0xffffff, 1.0);
    } else {
      // Flat material - custom shader for controlled opacity and color
      material = new THREE.ShaderMaterial({
        ...this.q_flat_material,
        uniforms: {
          u_time: this.e_shader_uniforms.u_time,
          u_entropy: this.e_shader_uniforms.u_entropy
        }
      });
    }
    
    // Create instanced mesh
    const instancedMesh = new THREE.InstancedMesh(geometry, material, count);
    instancedMesh.instanceMatrix.setUsage(THREE.DynamicDrawUsage);
    
    // Create per-instance attribute buffers
    const q_sizes = new Float32Array(count);
    const q_opacities = new Float32Array(count);
    const q_emissives = new Float32Array(count);
    const q_colors = new Float32Array(count * 3); // RGB color per instance
    
    for (let i = 0; i < count; i++) {
      q_sizes[i] = 1.0;
      q_opacities[i] = 1.0;
      q_emissives[i] = 0.0;
      q_colors[i * 3] = 1.0;     // R
      q_colors[i * 3 + 1] = 1.0; // G
      q_colors[i * 3 + 2] = 1.0; // B
    }
    
    geometry.setAttribute('instanceSize', new THREE.InstancedBufferAttribute(q_sizes, 1));
    geometry.setAttribute('instanceOpacity', new THREE.InstancedBufferAttribute(q_opacities, 1));
    geometry.setAttribute('instanceEmissive', new THREE.InstancedBufferAttribute(q_emissives, 1));
    geometry.setAttribute('instanceColor', new THREE.InstancedBufferAttribute(q_colors, 3));
    
    const q_key = `${dna_type}_${material_type}`;
    this.q_instance_attributes.set(q_key, {
      sizes: q_sizes,
      opacities: q_opacities,
      emissives: q_emissives,
      colors: q_colors
    });
    
    // Add to scene
    this.q_scene.add(instancedMesh);
    
    console.log(`Created instanced mesh for ${q_key} with ${count} instances`);
    return instancedMesh;
  }

  /**
   * Get color for DNA type
   * @private
   * @param {string} dna_type - Type to get color for
   * @returns {number} Hex color value
   */
  _getColorForType(dna_type) {
    // The colors of the quantum spectrum... each DNA type has its wavelength.
    const colors = {
      'BOX': 0x8a2be2,        // Purple
      'SPHERE': 0x00ffff,     // Cyan
      'TETRAHEDRON': 0xff00ff, // Magenta
      'ELLIPSE': 0xffffff,    // White - portals of perception
      'RING': 0x00ffff,       // Cyan - rings of energy
      'LINE': 0x06b6d4        // Cyan - waveforms of expression
    };
    
    return colors[dna_type] || 0xffffff;
  }

  /**
   * Update instanced meshes with current entity data
   * Groups by (DNA_TYPE, material_type) for batch rendering
   * @private
   * @param {Array<q_entity>} entities - Current entities from runtime
   */
  _updateInstancedMeshes(entities) {
    // Group entities by (DNA_TYPE, material_type)
    // This allows batch rendering with minimal shader switches
    const entities_by_material = {};
    
    entities.forEach(entity => {
      const q_material_type = entity.q_material_type || 'flat';
      const q_key = `${entity.dna_type}_${q_material_type}`;
      
      if (!entities_by_material[q_key]) {
        entities_by_material[q_key] = [];
      }
      entities_by_material[q_key].push(entity);
    });
    
    // Update or create instanced meshes for each material group
    Object.keys(entities_by_material).forEach(q_key => {
      const type_entities = entities_by_material[q_key];
      let instancedMesh = this.q_instanced_meshes.get(q_key);
      
      // Create or resize instanced mesh
      if (!instancedMesh || instancedMesh.count !== type_entities.length) {
        if (instancedMesh) {
          this.q_scene.remove(instancedMesh);
          instancedMesh.geometry.dispose();
          instancedMesh.material.dispose();
        }
        
        const [dna_type, material_type] = q_key.split('_');
        instancedMesh = this._createInstancedMesh(dna_type, material_type, type_entities.length);
        this.q_instanced_meshes.set(q_key, instancedMesh);
      }
      
      // Update matrices, colors, and per-instance attributes
      const q_matrix_instance = new THREE.Matrix4();
      const q_dummy_object = new THREE.Object3D();
      const q_color = new THREE.Color();
      const [dna_type] = q_key.split('_');
      const q_is_2d = ['ELLIPSE', 'RING', 'LINE'].includes(dna_type);
      
      // Get per-instance attribute arrays
      const q_attrs = this.q_instance_attributes.get(q_key);
      
      type_entities.forEach((q_entity_instance, q_index) => {
        q_matrix_instance.fromArray(q_entity_instance.flux_matrix);

        const q_entity_size = q_entity_instance.q_render_size || 1.0;
        const e_scale_factor = q_entity_size * (1.0 + (q_entity_instance.e_entropy_sig * 0.5));
        
        let q_scale_x = e_scale_factor;
        let q_scale_y = e_scale_factor;
        let q_scale_z = e_scale_factor;
        
        // Always check shape params to support dynamic animations (blinking, darting, etc.)
        if (q_entity_instance.q_shape_params) {
          if (dna_type === 'ELLIPSE') {
            q_scale_x = (q_entity_instance.q_shape_params.q_x_radius || 0.25) * e_scale_factor;
            q_scale_y = (q_entity_instance.q_shape_params.q_y_radius || 0.45) * e_scale_factor;
            q_scale_z = 1;
          } else if (dna_type === 'RING') {
            const q_outer = q_entity_instance.q_shape_params.q_outer_radius || 0.3;
            q_scale_x = q_outer * e_scale_factor;
            q_scale_y = q_outer * e_scale_factor;
            q_scale_z = 1;
          } else if (dna_type === 'LINE') {
            q_scale_x = (q_entity_instance.q_shape_params.q_length || 1.0) * e_scale_factor;
            q_scale_y = e_scale_factor;
            q_scale_z = 1;
          }
        }
        
        q_dummy_object.position.set(q_matrix_instance.elements[12], q_matrix_instance.elements[13], q_matrix_instance.elements[14]);
        q_dummy_object.scale.set(q_scale_x, q_scale_y, q_scale_z);
        q_dummy_object.rotation.setFromRotationMatrix(q_matrix_instance);
        q_dummy_object.updateMatrix();

        instancedMesh.setMatrixAt(q_index, q_dummy_object.matrix);
        
        // Set color in custom instanceColor buffer
        q_color.setHex(q_entity_instance.q_render_color !== undefined ? q_entity_instance.q_render_color : 0xFFFFFF);
        if (q_attrs && q_attrs.colors) {
          q_attrs.colors[q_index * 3] = q_color.r;
          q_attrs.colors[q_index * 3 + 1] = q_color.g;
          q_attrs.colors[q_index * 3 + 2] = q_color.b;
        }
        
        if (q_attrs) {
          q_attrs.sizes[q_index] = q_entity_instance.q_render_size || 1.0;
          q_attrs.opacities[q_index] = q_entity_instance.q_render_opacity || 1.0;
          q_attrs.emissives[q_index] = q_entity_instance.q_render_emissive || 0.0;
        }
      });
      
      if (q_attrs) {
        const q_mesh = this.q_instanced_meshes.get(q_key);
        if (q_mesh && q_mesh.geometry) {
          const q_size_attr = q_mesh.geometry.getAttribute('instanceSize');
          const q_opacity_attr = q_mesh.geometry.getAttribute('instanceOpacity');
          const q_emissive_attr = q_mesh.geometry.getAttribute('instanceEmissive');
          const q_color_attr = q_mesh.geometry.getAttribute('instanceColor');
          
          if (q_size_attr) q_size_attr.needsUpdate = true;
          if (q_opacity_attr) q_opacity_attr.needsUpdate = true;
          if (q_emissive_attr) q_emissive_attr.needsUpdate = true;
          if (q_color_attr) q_color_attr.needsUpdate = true;
        }
      }
      
      instancedMesh.instanceMatrix.needsUpdate = true;
    });
    
    // Remove unused instanced meshes
    const active_keys = Object.keys(entities_by_material);
    this.q_instanced_meshes.forEach((mesh, key) => {
      if (!active_keys.includes(key)) {
        this.q_scene.remove(mesh);
        mesh.geometry.dispose();
        mesh.material.dispose();
        this.q_instanced_meshes.delete(key);
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
      
      // Auto-rotation: slowly rotate camera around the scene
      if (!this.q_camera_state.is_dragging) {
        this.q_camera_state.theta += this.q_auto_rotation_speed * this.q_rotation_direction;
        
        // Auto-zoom: gradually move toward target zoom distance
        const q_zoom_diff = this.q_zoom_target - this.q_camera_state.radius;
        if (Math.abs(q_zoom_diff) > 0.1) {
          this.q_camera_state.radius += q_zoom_diff * this.q_auto_zoom_speed;
        }
        
        this._updateCameraPosition();
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
