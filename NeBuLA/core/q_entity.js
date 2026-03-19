// RaBbLE Quantum Entity Definition
// The atomic unit of the Flat-Chaos Runtime
// Every stream is a pipeline; every pipeline is a renderable

/**
 * Interface q_entity - The Quantum Entity
 * Represents the fundamental building block of the RaBbLE Nebula Renderer
 * 
 * @property {string} rabble_id - Unique entropy-string identifier
 * @property {string} dna_type - String enum (BOX, SPHERE, TETRAHEDRON)
 * @property {Float32Array} flux_matrix - Float32Array(16) for spatial state
 * @property {number} e_entropy_sig - Float (0.0 to 1.0) for jitter/deformation
 */
class q_entity {
  /**
   * Create a new quantum entity
   * @param {string} dna_type - The geometric primitive type
   * @param {string} [custom_id] - Optional custom identifier
   */
  constructor(dna_type, custom_id = null) {
    // Is this a cube or just a suggestion of six faces? 
    // The entropy suggests it wants to be something else. Let's hold it together... for now.
    this.rabble_id = custom_id || this._generateEntropyId();
    this.dna_type = this._validateDnaType(dna_type);
    this.flux_matrix = this._createIdentityMatrix();
    this.e_entropy_sig = Math.random(); // Every entity deserves some chaos
    
    // The entity is forming... but is it really a box or just a suggestion of six faces?
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
    const valid_types = ['BOX', 'SPHERE', 'TETRAHEDRON'];
    const normalized = dna_type.toUpperCase();
    
    if (!valid_types.includes(normalized)) {
      console.warn(`Invalid DNA type: ${dna_type}. Defaulting to BOX.`);
      return 'BOX';
    }
    
    return normalized;
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
    console.log(`Entity ${this.rabble_id} transmuted into clone ${clone.rabble_id}`);
    return clone;
  }

  /**
   * Serialize entity to JSON format
   * @returns {Object} Serialized entity data
   */
  q_toJSON() {
    return {
      rabble_id: this.rabble_id,
      dna_type: this.dna_type,
      flux_matrix: Array.from(this.flux_matrix),
      e_entropy_sig: this.e_entropy_sig
    };
  }

  /**
   * Create entity from JSON data
   * @param {Object} data - Serialized entity data
   * @returns {q_entity} New entity instance
   */
  static q_fromJSON(data) {
    const entity = new q_entity(data.dna_type, data.rabble_id);
    entity.flux_matrix.set(data.flux_matrix);
    entity.e_entropy_sig = data.e_entropy_sig;
    return entity;
  }
}

// The quantum entities are forming... each one a tiny universe of possibility.
// They don't know what they are yet, but they're ready to become something.

// ES6 Module Export - The vessel of quantum identity
export { q_entity };
