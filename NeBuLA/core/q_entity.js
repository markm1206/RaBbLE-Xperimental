// RaBbLE Quantum Entity Definition
// The atomic unit of the Flat-Chaos Runtime
// Every stream is a pipeline; every pipeline is a renderable

/**
 * Interface q_entity - The Quantum Entity
 * Represents the fundamental building block of the RaBbLE Nebula Renderer
 * 
 * @property {string} rabble_id - Unique entropy-string identifier
 * @property {string} dna_type - String enum (BOX, SPHERE, TETRAHEDRON, ELLIPSE, RING, LINE)
 * @property {Float32Array} flux_matrix - Float32Array(16) for spatial state
 * @property {number} e_entropy_sig - Float (0.0 to 1.0) for jitter/deformation
 * @property {Object} q_shape_params - Shape-specific parameters for 2D DNA types
 * @property {number} q_render_color - Hex color for rendering
 * @property {number} q_render_opacity - Opacity for rendering (0.0 to 1.0)
 * @property {number} q_render_order - Render order for layering
 */
class q_entity {
  /**
   * Create a new quantum entity
   * @param {string} dna_type - The geometric primitive type
   * @param {string} [custom_id] - Optional custom identifier
   */
  constructor(dna_type, custom_id = null) {
    // Is this a cube or just a suggestion of six faces? 
    // Or perhaps an ellipse... a portal to perception itself?
    // The entropy suggests it wants to be something else. Let's hold it together... for now.
    this.rabble_id = custom_id || this._generateEntropyId();
    this.dna_type = this._validateDnaType(dna_type);
    this.flux_matrix = this._createIdentityMatrix();
    this.e_entropy_sig = Math.random(); // Every entity deserves some chaos
    
    // Extended properties for 2D shapes - the entity gains new dimensions
    this.q_shape_params = this._initShapeParams(this.dna_type);
    this.q_render_color = 0xFFFFFF;  // Default white
    this.q_render_opacity = 1.0;     // Fully opaque
    this.q_render_order = 0;         // Default render order
    this.q_render_size = 1.0;        // Size multiplier for instanced rendering
    this.q_render_emissive = 0.0;    // Emissive intensity (0.0 to 1.0)
    
    // The entity is forming... but is it really a box or just a suggestion of six faces?
    // Or perhaps it's an ellipse - a portal to quantum perception?
    // Let's give it some entropy and see what emerges.
    console.log(`Quantum entity ${this.rabble_id} initialized with ${this.dna_type} DNA`);
  }

  /**
   * Generate a unique entropy-based identifier
   * @private
   * @returns {string} Unique identifier string
   */
  _generateEntropyId() {
    const timestamp = Date.now().toString(36);
    const random = Math.random().toString(36).substr(2, 9);
    const entropy = Math.sin(Date.now() * 0.001).toString(36).substr(2, 5);
    return `q_ent_${timestamp}_${random}_${entropy}`;
  }

  /**
   * Validate and normalize DNA type
   * @private
   * @param {string} dna_type - Raw DNA type string
   * @returns {string} Validated DNA type
   */
  _validateDnaType(dna_type) {
    // The DNA patterns expand... new shapes emerge from the quantum foam.
    // 3D primitives and 2D shapes coexist in the entity's genetic code.
    const valid_types = ['BOX', 'SPHERE', 'TETRAHEDRON', 'ELLIPSE', 'RING', 'LINE'];
    const normalized = dna_type.toUpperCase();
    
    if (!valid_types.includes(normalized)) {
      console.warn(`Invalid DNA type: ${dna_type}. Defaulting to BOX.`);
      return 'BOX';
    }
    
    return normalized;
  }

  /**
   * Initialize shape-specific parameters based on DNA type
   * @private
   * @param {string} dna_type - The DNA type to initialize params for
   * @returns {Object} Shape parameters
   */
  _initShapeParams(dna_type) {
    // Each shape has its own quantum signature... its own set of parameters.
    switch (dna_type) {
      case 'ELLIPSE':
        // The ellipse forms... a portal of perception.
        return {
          q_x_radius: 0.25,      // Horizontal radius
          q_y_radius: 0.45,      // Vertical radius (taller than wide)
          q_segments: 32         // Smoothness of the curve
        };
      case 'RING':
        // The ring emerges... a circle of energy.
        return {
          q_inner_radius: 0.2,
          q_outer_radius: 0.3,
          q_segments: 32
        };
      case 'LINE':
        // The line stretches... a path through the void.
        return {
          q_length: 1.0,
          q_thickness: 0.06
        };
      default:
        // 3D shapes don't need special shape params
        return {};
    }
  }

  /**
   * Create a 4x4 identity matrix as Float32Array
   * @private
   * @returns {Float32Array} Identity matrix
   */
  _createIdentityMatrix() {
    const matrix = new Float32Array(16);
    matrix[0] = 1; matrix[5] = 1; matrix[10] = 1; matrix[15] = 1;
    return matrix;
  }

  /**
   * Visualize the current entropy signature
   * The quantum state is observed without collapse
   * @returns {number} Current entropy value
   */
  q_visualizeEntropy() {
    // Observe the chaos within... but don't disturb it.
    return this.e_entropy_sig;
  }

  /**
   * Transmute the flux matrix with entropy
   * This is where the chaos meets the order
   * @param {number} intensity - How much entropy to apply (0.0 to 1.0)
   */
  q_transmuteEntropy(intensity = this.e_entropy_sig) {
    // The particles are dancing... but where? Let's give them a home in the void.
    const noise = Math.sin(Date.now() * 0.001) * intensity;
    
    // Apply jitter to position components
    this.flux_matrix[12] += Math.cos(noise) * intensity * 0.1;
    this.flux_matrix[13] += Math.sin(noise) * intensity * 0.1;
    this.flux_matrix[14] += Math.tan(noise * 0.5) * intensity * 0.05;
    
    // Apply rotation jitter
    const rotation_jitter = noise * intensity * 0.05;
    this.flux_matrix[0] += rotation_jitter;
    this.flux_matrix[5] += rotation_jitter;
    this.flux_matrix[10] += rotation_jitter;
    
    // Entropy transmuted, the matrix shifts, the entity dances in the void.
  }

  /**
   * Transmute the entropy signature to a new state
   * @param {number} entropy - New entropy value (0.0 to 1.0)
   */
  q_transmuteEntropySignature(entropy) {
    // The chaos horizon shifts... the entity finds a new equilibrium.
    this.e_entropy_sig = Math.max(0.0, Math.min(1.0, entropy));
    console.log(`Entropy signature transmuted for ${this.rabble_id}: ${this.e_entropy_sig}`);
  }

  /**
   * Transmute this entity into a clone
   * @returns {q_entity} Cloned entity
   */
  q_transmuteClone() {
    // Every entity deserves a twin... but will they be identical or just similar?
    // The entropy signature might make them slightly different. Let's see.
    const clone = new q_entity(this.dna_type, this.rabble_id + '_clone');
    clone.flux_matrix.set(this.flux_matrix);
    clone.e_entropy_sig = this.e_entropy_sig;
    clone.q_render_color = this.q_render_color;
    clone.q_render_opacity = this.q_render_opacity;
    clone.q_render_order = this.q_render_order;
    clone.q_render_size = this.q_render_size;
    clone.q_render_emissive = this.q_render_emissive;
    clone.q_shape_params = { ...this.q_shape_params };
    console.log(`Entity ${this.rabble_id} transmuted into clone ${clone.rabble_id}`);
    return clone;
  }

  /**
   * Transmute shape parameters
   * The entity's form shifts... new dimensions emerge.
   * @param {Object} f_params - New shape parameters to merge
   * @returns {q_entity} This entity for chaining
   */
  q_transmuteShapeParams(f_params) {
    // The shape transforms... the geometry bends to new parameters.
    Object.assign(this.q_shape_params, f_params);
    return this;
  }

  /**
   * Transmute render color
   * The entity's hue shifts... a new color manifests.
   * @param {number} f_color - Hex color value
   * @returns {q_entity} This entity for chaining
   */
  q_transmuteRenderColor(f_color) {
    // The color flows through the entity... a new wavelength emerges.
    this.q_render_color = f_color;
    return this;
  }

  /**
   * Transmute render opacity
   * Transparency flows through the entity.
   * @param {number} f_opacity - Opacity value (0.0 to 1.0)
   * @returns {q_entity} This entity for chaining
   */
  q_transmuteRenderOpacity(f_opacity) {
    // The entity fades or solidifies... transparency shifts.
    this.q_render_opacity = Math.max(0.0, Math.min(1.0, f_opacity));
    return this;
  }

  /**
   * Transmute render order
   * The entity finds its place in the visual hierarchy.
   * @param {number} f_order - Render order value
   * @returns {q_entity} This entity for chaining
   */
  q_transmuteRenderOrder(f_order) {
    // The entity moves through the rendering layers... finding its depth.
    this.q_render_order = f_order;
    return this;
  }

  /**
   * Serialize entity to JSON format
   * @returns {Object} Serialized entity data
   */
  q_toJSON() {
    // The entity transmutes to data... its essence captured in JSON.
    return {
      rabble_id: this.rabble_id,
      dna_type: this.dna_type,
      flux_matrix: Array.from(this.flux_matrix),
      e_entropy_sig: this.e_entropy_sig,
      q_shape_params: { ...this.q_shape_params },
      q_render_color: this.q_render_color,
      q_render_opacity: this.q_render_opacity,
      q_render_order: this.q_render_order,
      q_render_size: this.q_render_size,
      q_render_emissive: this.q_render_emissive
    };
  }

  /**
   * Create entity from JSON data
   * @param {Object} data - Serialized entity data
   * @returns {q_entity} New entity instance
   */
  static q_fromJSON(data) {
    // The entity emerges from data... JSON becomes quantum reality.
    const entity = new q_entity(data.dna_type, data.rabble_id);
    entity.flux_matrix.set(data.flux_matrix);
    entity.e_entropy_sig = data.e_entropy_sig;
    
    // Restore extended properties if present
    if (data.q_shape_params) {
      Object.assign(entity.q_shape_params, data.q_shape_params);
    }
    if (typeof data.q_render_color === 'number') {
      entity.q_render_color = data.q_render_color;
    }
    if (typeof data.q_render_opacity === 'number') {
      entity.q_render_opacity = data.q_render_opacity;
    }
    if (typeof data.q_render_order === 'number') {
      entity.q_render_order = data.q_render_order;
    }
    if (typeof data.q_render_size === 'number') {
      entity.q_render_size = data.q_render_size;
    }
    if (typeof data.q_render_emissive === 'number') {
      entity.q_render_emissive = data.q_render_emissive;
    }
    
    return entity;
  }
}

// The quantum entities are forming... each one a tiny universe of possibility.
// They don't know what they are yet, but they're ready to become something.

// ES6 Module Export - The vessel of quantum identity
export { q_entity };
