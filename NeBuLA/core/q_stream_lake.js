// RaBbLE Stream Lake - The Quantum Reservoir
// Named buffers that capture stream state for feedback loops.
// Streams flow IN, streams flow OUT, the lake remembers.

/**
 * RaBbLE_StreamLake - Named Stream Buffer System
 * Captures stream state into named buffers for later retrieval.
 * Enables feedback loops and temporal composition.
 * 
 * @property {Map<string, q_stream>} q_lakes - Named lake buffers
 * @property {number} q_max_lakes - Maximum number of lakes to maintain
 */
class RaBbLE_StreamLake {
  /**
   * Create a new stream lake system
   * @param {Object} f_params - Lake parameters
   */
  constructor(f_params = {}) {
    // The lake system awakens... reservoirs form in the quantum void.
    // Each lake is a memory, a snapshot of stream state in time.
    this.q_lakes = new Map();
    this.q_max_lakes = f_params.max_lakes || 10;
    this.e_capture_count = 0;
  }

  /**
   * Capture a stream into a named lake
   * The stream flows into the reservoir... state is preserved.
   * @param {string} f_name - Name of the lake
   * @param {q_stream} f_stream - Stream to capture
   * @returns {RaBbLE_StreamLake} This lake system for chaining
   */
  q_capture(f_name, f_stream) {
    // Create a snapshot of the stream
    const q_snapshot = this.q_createSnapshot(f_stream);
    
    // Store in lake
    this.q_lakes.set(f_name, q_snapshot);
    
    // Maintain max lakes limit
    if (this.q_lakes.size > this.q_max_lakes) {
      const q_first_key = this.q_lakes.keys().next().value;
      this.q_lakes.delete(q_first_key);
    }
    
    this.e_capture_count++;
    console.log(`Lake "${f_name}" captured: ${f_stream.q_length} entities`);
    
    return this;
  }

  /**
   * Read entities from a named lake
   * The lake releases its memories... entities flow out.
   * @param {string} f_name - Name of the lake to read from
   * @returns {Array<Object>} Array of entity snapshots
   */
  q_read(f_name) {
    const q_snapshot = this.q_lakes.get(f_name);
    
    if (!q_snapshot) {
      console.warn(`Lake "${f_name}" not found`);
      return [];
    }
    
    return q_snapshot.entities;
  }

  /**
   * Create a snapshot of a stream
   * The moment freezes... stream state is captured.
   * @param {q_stream} f_stream - Stream to snapshot
   * @returns {Object} Stream snapshot
   */
  q_createSnapshot(f_stream) {
    return {
      stream_id: f_stream.q_stream_id,
      entity_count: f_stream.q_length,
      entities: f_stream.q_entities.map(f_entity => ({
        flux_matrix: [...f_entity.flux_matrix],
        e_entropy_sig: f_entity.e_entropy_sig,
        q_render_color: f_entity.q_render_color,
        q_render_size: f_entity.q_render_size,
        q_render_opacity: f_entity.q_render_opacity,
        dna_type: f_entity.dna_type
      })),
      captured_at: Date.now()
    };
  }

  /**
   * Check if a lake exists
   * @param {string} f_name - Name of the lake
   * @returns {boolean} True if lake exists
   */
  q_hasLake(f_name) {
    return this.q_lakes.has(f_name);
  }

  /**
   * Get list of lake names
   * @returns {Array<string>} Array of lake names
   */
  q_getLakeNames() {
    return Array.from(this.q_lakes.keys());
  }

  /**
   * Dissolve a named lake
   * The lake drains... memories fade.
   * @param {string} f_name - Name of the lake to dissolve
   * @returns {boolean} True if lake was dissolved
   */
  q_dissolve(f_name) {
    return this.q_lakes.delete(f_name);
  }

  /**
   * Extract lake statistics
   * @returns {Object} Lake statistics
   */
  q_extractStats() {
    const q_total_entities = Array.from(this.q_lakes.values())
      .reduce((sum, snapshot) => sum + snapshot.entity_count, 0);
    
    return {
      lake_count: this.q_lakes.size,
      max_lakes: this.q_max_lakes,
      total_entities_stored: q_total_entities,
      capture_count: this.e_capture_count,
      lake_names: this.q_getLakeNames()
    };
  }
}

// The lake system is complete... reservoirs of memory in the quantum void.
// Streams flow in, streams flow out, the lake remembers everything.
// This is the foundation of feedback loops and temporal composition.

export { RaBbLE_StreamLake };