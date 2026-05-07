// RaBbLE Entropy Canvas - Interactive Chaos Manipulation
// Where users touch chaos and chaos touches back.
// Every gesture is a conversation between creator and creation.

// ES6 Module Imports - The quantum tunnels to interaction
import { q_entity } from '../../core/q_entity.js';
import { q_stream } from '../../core/q_stream.js';

/**
 * RaBbLE_EntropyCanvas - Interactive Chaos Manipulator
 * Lets users directly manipulate chaos with mouse/touch gestures
 * 
 * The canvas is not separate from the nebula - it IS part of the nebula.
 * Entropy wells, quantum trails, and stream splits are all interactions
 * that flow through the Flat-Chaos runtime like any other quantum data.
 * 
 * @property {Object} q_engine - The NeBuLA engine reference
 * @property {Object} q_renderer - The Three.js renderer reference
 * @property {Object} q_camera - The camera reference
 * @property {Object} q_scene - The scene reference
 * @property {Map} q_entropy_wells - Active entropy wells (attractors)
 * @property {Array} q_quantum_trails - Active trails being drawn
 * @property {boolean} q_is_active - Whether canvas is active
 * @property {string} q_current_mode - Current interaction mode
 * @property {number} q_well_id_counter - Counter for well IDs
 */
class RaBbLE_EntropyCanvas {
  /**
   * Create the Entropy Canvas
   * @param {Object} f_engine - The NeBuLA engine to interact with
   */
  constructor(f_engine) {
    // The canvas awakens... ready to listen to user's touch.
    // This is RaBbLE's interactive consciousness taking form.
    this.q_engine = f_engine;
    this.q_renderer = f_engine.renderer;
    this.q_camera = f_engine.camera;
    this.q_scene = f_engine.scene;
    
    // Interaction state
    this.q_entropy_wells = new Map(); // Map of well_id -> well data
    this.q_quantum_trails = []; // Array of active trails
    this.q_is_active = false;
    this.q_current_mode = 'attract'; // attract, repel, trail, split
    this.q_well_id_counter = 0;
    
    // Mouse/touch state
    this.q_mouse_position = { x: 0, y: 0 };
    this.q_is_dragging = false;
    this.q_drag_start = null;
    this.q_current_trail = null;
    
    // Raycaster for 3D interaction
    this.q_raycaster = new THREE.Raycaster();
    this.q_mouse = new THREE.Vector2();
    
    // Configuration
    this.q_config = {
      q_well_strength: 0.5,
      q_well_radius: 5.0,
      q_trail_length: 20,
      q_trail_fade: 0.9,
      q_split_angle: Math.PI / 4,
      q_pressure_sensitivity: true
    };
    
    console.log('RaBbLE_EntropyCanvas initialized - Ready for interaction');
  }

  /**
   * Activate the canvas
   * Sets up event listeners and initializes interaction
   * @returns {RaBbLE_EntropyCanvas} This canvas for chaining
   */
  q_activate() {
    if (this.q_is_active) {
      console.warn('Canvas already active');
      return this;
    }
    
    // The canvas comes alive... event listeners awaken.
    this.q_is_active = true;
    
    // Bind event listeners
    this._bindEventListeners();
    
    // Create interaction visualization stream
    this.q_interaction_stream = this._createInteractionStream();
    this.q_engine.runtime.q_transmuteStream(this.q_interaction_stream);
    
    console.log('RaBbLE_EntropyCanvas activated - Listening to chaos');
    return this;
  }

  /**
   * Deactivate the canvas
   * Removes event listeners and cleans up
   * @returns {RaBbLE_EntropyCanvas} This canvas for chaining
   */
  q_deactivate() {
    if (!this.q_is_active) {
      console.warn('Canvas not active');
      return this;
    }
    
    // The canvas rests... event listeners sleep.
    this.q_is_active = false;
    
    // Unbind event listeners
    this._unbindEventListeners();
    
    // Clean up wells and trails
    this.q_entropy_wells.clear();
    this.q_quantum_trails = [];
    
    // Remove interaction stream
    if (this.q_interaction_stream) {
      this.q_engine.runtime.q_dissolveStream(this.q_interaction_stream.q_stream_id);
      this.q_interaction_stream = null;
    }
    
    console.log('RaBbLE_EntropyCanvas deactivated - Chaos at rest');
    return this;
  }

  /**
   * Set interaction mode
   * @param {string} f_mode - Mode: attract, repel, trail, split
   * @returns {RaBbLE_EntropyCanvas} This canvas for chaining
   */
  q_setMode(f_mode) {
    const q_valid_modes = ['attract', 'repel', 'trail', 'split'];
    
    if (!q_valid_modes.includes(f_mode)) {
      console.warn(`Invalid mode: ${f_mode}. Use: ${q_valid_modes.join(', ')}`);
      return this;
    }
    
    // Mode shifts... interaction changes.
    this.q_current_mode = f_mode;
    console.log(`Interaction mode set to: ${f_mode}`);
    return this;
  }

  /**
   * Update canvas (called each frame)
   * @param {number} f_delta_time - Time since last update
   * @returns {RaBbLE_EntropyCanvas} This canvas for chaining
   */
  q_update(f_delta_time) {
    if (!this.q_is_active) return this;
    
    // The canvas breathes... wells pulse, trails fade.
    this.q_time += f_delta_time;
    
    // Update entropy wells
    this._updateEntropyWells(f_delta_time);
    
    // Update quantum trails
    this._updateQuantumTrails(f_delta_time);
    
    // Update interaction stream
    if (this.q_interaction_stream) {
      this.q_interaction_stream.q_igniteFlux();
    }
    
    return this;
  }

  /**
   * Create entropy well at position
   * @private
   * @param {number} f_x - X position in world space
   * @param {number} f_y - Y position in world space
   * @param {number} f_z - Z position in world space
   * @param {string} f_type - Well type: attract, repel
   * @returns {string} Well ID
   */
  _createEntropyWell(f_x, f_y, f_z, f_type = 'attract') {
    // A well forms... gravity takes hold.
    const q_well_id = `well_${this.q_well_id_counter++}`;
    
    const q_well = {
      id: q_well_id,
      position: new THREE.Vector3(f_x, f_y, f_z),
      type: f_type, // attract or repel
      strength: this.q_config.q_well_strength,
      radius: this.q_config.q_well_radius,
      age: 0,
      max_age: 10.0, // seconds
      entity: null
    };
    
    // Create visual representation
    q_well.entity = this._createWellEntity(q_well);
    this.q_interaction_stream.q_transmuteEntity(q_well.entity);
    
    this.q_entropy_wells.set(q_well_id, q_well);
    console.log(`Entropy well created: ${q_well_id} at (${f_x.toFixed(2)}, ${f_y.toFixed(2)}, ${f_z.toFixed(2)})`);
    
    return q_well_id;
  }

  /**
   * Remove entropy well
   * @private
   * @param {string} f_well_id - Well ID to remove
   */
  _removeEntropyWell(f_well_id) {
    // The well fades... gravity releases.
    const q_well = this.q_entropy_wells.get(f_well_id);
    
    if (q_well) {
      // Remove entity from stream
      if (q_well.entity && this.q_interaction_stream) {
        this.q_interaction_stream.q_dissolveEntity(q_well.entity.rabble_id);
      }
      
      this.q_entropy_wells.delete(f_well_id);
      console.log(`Entropy well removed: ${f_well_id}`);
    }
  }

  /**
   * Update entropy wells
   * @private
   * @param {number} f_delta_time - Time since last update
   */
  _updateEntropyWells(f_delta_time) {
    // Wells pulse... age flows through them.
    for (const [q_well_id, q_well] of this.q_entropy_wells) {
      // Age the well
      q_well.age += f_delta_time;
      
      // Remove if too old
      if (q_well.age > q_well.max_age) {
        this._removeEntropyWell(q_well_id);
        continue;
      }
      
      // Pulse effect
      const q_pulse = Math.sin(this.q_time * 2 + q_well.age) * 0.1;
      if (q_well.entity) {
        q_well.entity.q_render_size = 0.5 + q_pulse * 0.2;
        q_well.entity.q_render_emissive = 0.6 + q_pulse * 0.3;
      }
      
      // Apply well influence to nearby entities
      this._applyWellInfluence(q_well, f_delta_time);
    }
  }

  /**
   * Apply well influence to nearby entities
   * @private
   * @param {Object} f_well - The entropy well
   * @param {number} f_delta_time - Time since last update
   */
  _applyWellInfluence(f_well, f_delta_time) {
    // Gravity flows... entities feel the pull.
    const q_streams = this.q_engine.runtime.q_streams;
    
    for (const [q_stream_id, q_stream] of q_streams) {
      // Skip interaction stream
      if (q_stream === this.q_interaction_stream) continue;
      
      // Apply influence to each entity in stream
      q_stream.q_transmuteFluxModifier((f_entity) => {
        // Calculate distance to well
        const q_entity_pos = new THREE.Vector3(
          f_entity.flux_matrix[12],
          f_entity.flux_matrix[13],
          f_entity.flux_matrix[14]
        );
        
        const q_distance = q_entity_pos.distanceTo(f_well.position);
        
        // Only affect entities within radius
        if (q_distance < f_well.radius) {
          // Calculate force
          const q_force_strength = f_well.strength * (1 - q_distance / f_well.radius);
          const q_direction = new THREE.Vector3().subVectors(f_well.position, q_entity_pos).normalize();
          
          // Apply force based on well type
          if (f_well.type === 'attract') {
            // Attract: pull toward well
            f_entity.flux_matrix[12] += q_direction.x * q_force_strength * f_delta_time;
            f_entity.flux_matrix[13] += q_direction.y * q_force_strength * f_delta_time;
            f_entity.flux_matrix[14] += q_direction.z * q_force_strength * f_delta_time;
          } else if (f_well.type === 'repel') {
            // Repel: push away from well
            f_entity.flux_matrix[12] -= q_direction.x * q_force_strength * f_delta_time;
            f_entity.flux_matrix[13] -= q_direction.y * q_force_strength * f_delta_time;
            f_entity.flux_matrix[14] -= q_direction.z * q_force_strength * f_delta_time;
          }
          
          // Also affect entropy based on interaction
          const q_entropy_change = q_force_strength * 0.1;
          f_entity.q_transmuteEntropy(f_entity.e_entropy_sig + q_entropy_change);
        }
        
        return f_entity;
      });
    }
  }

  /**
   * Start quantum trail
   * @private
   * @param {number} f_x - X position
   * @param {number} f_y - Y position
   * @param {number} f_z - Z position
   */
  _startQuantumTrail(f_x, f_y, f_z) {
    // A trail begins... path through the void.
    const q_trail = {
      points: [new THREE.Vector3(f_x, f_y, f_z)],
      age: 0,
      max_age: 5.0,
      entities: [],
      color: new THREE.Color().setHSL(Math.random(), 0.8, 0.6)
    };
    
    // Create first entity
    const q_entity = this._createTrailEntity(q_trail.points[0], q_trail.color);
    q_trail.entities.push(q_entity);
    this.q_interaction_stream.q_transmuteEntity(q_entity);
    
    this.q_quantum_trails.push(q_trail);
    this.q_current_trail = q_trail;
    
    console.log('Quantum trail started');
  }

  /**
   * Add point to current trail
   * @private
   * @param {number} f_x - X position
   * @param {number} f_y - Y position
   * @param {number} f_z - Z position
   */
  _addTrailPoint(f_x, f_y, f_z) {
    // The trail extends... path continues.
    if (!this.q_current_trail) return;
    
    // Add point
    const q_point = new THREE.Vector3(f_x, f_y, f_z);
    this.q_current_trail.points.push(q_point);
    
    // Limit trail length
    if (this.q_current_trail.points.length > this.q_config.q_trail_length) {
      this.q_current_trail.points.shift();
      
      // Remove oldest entity
      if (this.q_current_trail.entities.length > 0) {
        const q_old_entity = this.q_current_trail.entities.shift();
        this.q_interaction_stream.q_dissolveEntity(q_old_entity.rabble_id);
      }
    }
    
    // Create new entity for this point
    const q_entity = this._createTrailEntity(q_point, this.q_current_trail.color);
    this.q_current_trail.entities.push(q_entity);
    this.q_interaction_stream.q_transmuteEntity(q_entity);
  }

  /**
   * End current trail
   * @private
   */
  _endQuantumTrail() {
    // The trail completes... path fades.
    this.q_current_trail = null;
    console.log('Quantum trail ended');
  }

  /**
   * Update quantum trails
   * @private
   * @param {number} f_delta_time - Time since last update
   */
  _updateQuantumTrails(f_delta_time) {
    // Trails age... fade into the void.
    for (let i = this.q_quantum_trails.length - 1; i >= 0; i--) {
      const q_trail = this.q_quantum_trails[i];
      
      // Age the trail
      q_trail.age += f_delta_time;
      
      // Remove if too old
      if (q_trail.age > q_trail.max_age) {
        // Remove all entities
        for (const q_entity of q_trail.entities) {
          this.q_interaction_stream.q_dissolveEntity(q_entity.rabble_id);
        }
        
        this.q_quantum_trails.splice(i, 1);
        continue;
      }
      
      // Fade entities based on age
      const q_fade_factor = 1 - (q_trail.age / q_trail.max_age);
      for (const q_entity of q_trail.entities) {
        q_entity.q_transmuteRenderOpacity(q_fade_factor * 0.8);
        q_entity.q_render_size = 0.1 + q_fade_factor * 0.1;
      }
    }
  }

  /**
   * Create interaction visualization stream
   * @private
   * @returns {q_stream} The interaction stream
   */
  _createInteractionStream() {
    // The visualization forms... ready to show interaction.
    const q_stream_instance = new q_stream('entropy_canvas');
    
    // Apply canvas-specific flux modifier
    q_stream_instance.q_transmuteFluxModifier((f_entity) => {
      // Canvas entities pulse gently
      const q_pulse = Math.sin(this.q_time * 3 + f_entity.rabble_id.charCodeAt(0)) * 0.1;
      f_entity.q_transmuteEntropy(0.3 + q_pulse);
      return f_entity;
    });
    
    console.log('Interaction stream created');
    return q_stream_instance;
  }

  /**
   * Create visual entity for entropy well
   * @private
   * @param {Object} f_well - The entropy well data
   * @returns {q_entity} The well entity
   */
  _createWellEntity(f_well) {
    // The well manifests... visual form takes shape.
    const q_entity_instance = new q_entity('SPHERE');
    
    // Position at well location
    q_entity_instance.flux_matrix[12] = f_well.position.x;
    q_entity_instance.flux_matrix[13] = f_well.position.y;
    q_entity_instance.flux_matrix[14] = f_well.position.z;
    
    // Well appearance
    const q_color = f_well.type === 'attract' ? 0x00FF88 : 0xFF4488;
    q_entity_instance.q_transmuteRenderColor(q_color);
    q_entity_instance.q_render_size = 0.5;
    q_entity_instance.q_render_emissive = 0.6;
    q_entity_instance.q_transmuteRenderOpacity(0.7);
    q_entity_instance.q_transmuteRenderOrder(5);
    q_entity_instance.q_transmuteEntropySignature(0.3);
    
    return q_entity_instance;
  }

  /**
   * Create visual entity for trail point
   * @private
   * @param {Object} f_position - The position vector
   * @param {Object} f_color - The color
   * @returns {q_entity} The trail entity
   */
  _createTrailEntity(f_position, f_color) {
    // The trail point manifests... path becomes visible.
    const q_entity_instance = new q_entity('SPHERE');
    
    // Position at trail point
    q_entity_instance.flux_matrix[12] = f_position.x;
    q_entity_instance.flux_matrix[13] = f_position.y;
    q_entity_instance.flux_matrix[14] = f_position.z;
    
    // Trail appearance
    q_entity_instance.q_transmuteRenderColor(f_color.getHex());
    q_entity_instance.q_render_size = 0.15;
    q_entity_instance.q_render_emissive = 0.5;
    q_entity_instance.q_transmuteRenderOpacity(0.8);
    q_entity_instance.q_transmuteRenderOrder(4);
    q_entity_instance.q_transmuteEntropySignature(0.2);
    
    return q_entity_instance;
  }

  /**
   * Bind event listeners
   * @private
   */
  _bindEventListeners() {
    // Listeners awaken... ready for interaction.
    const q_canvas = this.q_renderer.domElement;
    
    // Mouse events
    q_canvas.addEventListener('mousedown', this._onMouseDown.bind(this));
    q_canvas.addEventListener('mousemove', this._onMouseMove.bind(this));
    q_canvas.addEventListener('mouseup', this._onMouseUp.bind(this));
    q_canvas.addEventListener('mouseleave', this._onMouseLeave.bind(this));
    
    // Touch events
    q_canvas.addEventListener('touchstart', this._onTouchStart.bind(this));
    q_canvas.addEventListener('touchmove', this._onTouchMove.bind(this));
    q_canvas.addEventListener('touchend', this._onTouchEnd.bind(this));
    
    console.log('Event listeners bound');
  }

  /**
   * Unbind event listeners
   * @private
   */
  _unbindEventListeners() {
    // Listeners sleep... interaction pauses.
    const q_canvas = this.q_renderer.domElement;
    
    // Mouse events
    q_canvas.removeEventListener('mousedown', this._onMouseDown.bind(this));
    q_canvas.removeEventListener('mousemove', this._onMouseMove.bind(this));
    q_canvas.removeEventListener('mouseup', this._onMouseUp.bind(this));
    q_canvas.removeEventListener('mouseleave', this._onMouseLeave.bind(this));
    
    // Touch events
    q_canvas.removeEventListener('touchstart', this._onTouchStart.bind(this));
    q_canvas.removeEventListener('touchmove', this._onTouchMove.bind(this));
    q_canvas.removeEventListener('touchend', this._onTouchEnd.bind(this));
    
    console.log('Event listeners unbound');
  }

  /**
   * Handle mouse down event
   * @private
   * @param {MouseEvent} f_event - The mouse event
   */
  _onMouseDown(f_event) {
    // Mouse clicks... interaction begins.
    f_event.preventDefault();
    
    // Update mouse position
    this._updateMousePosition(f_event);
    
    // Convert to world coordinates
    const q_world_pos = this._screenToWorld(this.q_mouse_position.x, this.q_mouse_position.y);
    
    // Start interaction based on mode
    switch (this.q_current_mode) {
      case 'attract':
      case 'repel':
        // Create entropy well
        this._createEntropyWell(q_world_pos.x, q_world_pos.y, q_world_pos.z, this.q_current_mode);
        break;
        
      case 'trail':
        // Start quantum trail
        this._startQuantumTrail(q_world_pos.x, q_world_pos.y, q_world_pos.z);
        break;
        
      case 'split':
        // Create split point (for future stream splitting)
        console.log('Split mode: stream splitting not yet implemented');
        break;
    }
    
    this.q_is_dragging = true;
    this.q_drag_start = { ...this.q_mouse_position };
  }

  /**
   * Handle mouse move event
   * @private
   * @param {MouseEvent} f_event - The mouse event
   */
  _onMouseMove(f_event) {
    // Mouse moves... interaction continues.
    f_event.preventDefault();
    
    // Update mouse position
    this._updateMousePosition(f_event);
    
    // If dragging, continue interaction
    if (this.q_is_dragging) {
      // Convert to world coordinates
      const q_world_pos = this._screenToWorld(this.q_mouse_position.x, this.q_mouse_position.y);
      
      switch (this.q_current_mode) {
        case 'trail':
          // Add point to trail
          this._addTrailPoint(q_world_pos.x, q_world_pos.y, q_world_pos.z);
          break;
          
        case 'attract':
        case 'repel':
          // Could update well position here
          break;
      }
    }
  }

  /**
   * Handle mouse up event
   * @private
   * @param {MouseEvent} f_event - The mouse event
   */
  _onMouseUp(f_event) {
    // Mouse releases... interaction pauses.
    f_event.preventDefault();
    
    // End current interaction
    if (this.q_current_mode === 'trail') {
      this._endQuantumTrail();
    }
    
    this.q_is_dragging = false;
    this.q_drag_start = null;
  }

  /**
   * Handle mouse leave event
   * @private
   * @param {MouseEvent} f_event - The mouse event
   */
  _onMouseLeave(f_event) {
    // Mouse leaves... interaction pauses.
    this._onMouseUp(f_event);
  }

  /**
   * Handle touch start event
   * @private
   * @param {TouchEvent} f_event - The touch event
   */
  _onTouchStart(f_event) {
    // Touch begins... interaction starts.
    f_event.preventDefault();
    
    // Get first touch
    const q_touch = f_event.touches[0];
    
    // Update mouse position from touch
    this.q_mouse_position.x = q_touch.clientX;
    this.q_mouse_position.y = q_touch.clientY;
    
    // Convert to world coordinates
    const q_world_pos = this._screenToWorld(this.q_mouse_position.x, this.q_mouse_position.y);
    
    // Start interaction based on mode
    switch (this.q_current_mode) {
      case 'attract':
      case 'repel':
        // Create entropy well
        this._createEntropyWell(q_world_pos.x, q_world_pos.y, q_world_pos.z, this.q_current_mode);
        break;
        
      case 'trail':
        // Start quantum trail
        this._startQuantumTrail(q_world_pos.x, q_world_pos.y, q_world_pos.z);
        break;
    }
    
    this.q_is_dragging = true;
    this.q_drag_start = { ...this.q_mouse_position };
  }

  /**
   * Handle touch move event
   * @private
   * @param {TouchEvent} f_event - The touch event
   */
  _onTouchMove(f_event) {
    // Touch moves... interaction continues.
    f_event.preventDefault();
    
    // Get first touch
    const q_touch = f_event.touches[0];
    
    // Update mouse position from touch
    this.q_mouse_position.x = q_touch.clientX;
    this.q_mouse_position.y = q_touch.clientY;
    
    // If dragging, continue interaction
    if (this.q_is_dragging) {
      // Convert to world coordinates
      const q_world_pos = this._screenToWorld(this.q_mouse_position.x, this.q_mouse_position.y);
      
      switch (this.q_current_mode) {
        case 'trail':
          // Add point to trail
          this._addTrailPoint(q_world_pos.x, q_world_pos.y, q_world_pos.z);
          break;
      }
    }
  }

  /**
   * Handle touch end event
   * @private
   * @param {TouchEvent} f_event - The touch event
   */
  _onTouchEnd(f_event) {
    // Touch ends... interaction pauses.
    f_event.preventDefault();
    
    // End current interaction
    if (this.q_current_mode === 'trail') {
      this._endQuantumTrail();
    }
    
    this.q_is_dragging = false;
    this.q_drag_start = null;
  }

  /**
   * Update mouse position from event
   * @private
   * @param {MouseEvent} f_event - The mouse event
   */
  _updateMousePosition(f_event) {
    // Position updates... mouse tracked.
    this.q_mouse_position.x = f_event.clientX;
    this.q_mouse_position.y = f_event.clientY;
    
    // Update raycaster mouse
    this.q_mouse.x = (f_event.clientX / window.innerWidth) * 2 - 1;
    this.q_mouse.y = -(f_event.clientY / window.innerHeight) * 2 + 1;
  }

  /**
   * Convert screen coordinates to world coordinates
   * @private
   * @param {number} f_screen_x - Screen X coordinate
   * @param {number} f_screen_y - Screen Y coordinate
   * @returns {Object} World coordinates {x, y, z}
   */
  _screenToWorld(f_screen_x, f_screen_y) {
    // Coordinates transform... screen becomes world.
    // Update raycaster
    this.q_raycaster.setFromCamera(this.q_mouse, this.q_camera);
    
    // Create plane at z=0 for intersection
    const q_plane = new THREE.Plane(new THREE.Vector3(0, 0, 1), 0);
    const q_intersect = new THREE.Vector3();
    
    this.q_raycaster.ray.intersectPlane(q_plane, q_intersect);
    
    return {
      x: q_intersect.x,
      y: q_intersect.y,
      z: q_intersect.z
    };
  }

  /**
   * Extract canvas statistics
   * @returns {Object} Canvas statistics
   */
  q_extractStats() {
    return {
      is_active: this.q_is_active,
      current_mode: this.q_current_mode,
      well_count: this.q_entropy_wells.size,
      trail_count: this.q_quantum_trails.length,
      config: { ...this.q_config }
    };
  }
}

// The Entropy Canvas is complete... users can now touch chaos.
// Wells attract, trails trace, and the void responds to human intent.
// All flowing through streams, all part of the Flat-Chaos runtime.

// ES6 Module Export - The canvas of interactive consciousness
export { RaBbLE_EntropyCanvas };