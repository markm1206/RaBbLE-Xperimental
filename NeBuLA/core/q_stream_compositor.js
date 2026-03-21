// RaBbLE Stream Compositor - The Chaos Mixer
// Mix multiple streams together with weighted blending.
// Like a DJ mixer for quantum streams!

/**
 * RaBbLE_StreamCompositor - Stream Compositing Engine
 * Blends multiple streams together using weighted averaging.
 * Creates visual compositing effects through stream mixing.
 * 
 * @property {Array} q_mix_stack - Stack of streams to mix
 * @property {Array} q_weight_stack - Weights for each stream
 */
class RaBbLE_StreamCompositor {
  /**
   * Create a new stream compositor
   * @param {Object} f_params - Compositor parameters
   */
  constructor(f_params = {}) {
    // The compositor awakens... streams prepare to blend.
    // Chaos meets order in weighted harmony.
    this.q_mix_stack = [];
    this.q_weight_stack = [];
    this.e_blend_time = 0;
  }

  /**
   * Add a stream to the mix with a weight
   * The mixer adds another track... chaos layers upon chaos.
   * @param {q_stream} f_stream - Stream to add to mix
   * @param {number} f_weight - Weight of this stream (0.0 to 1.0)
   * @returns {RaBbLE_StreamCompositor} This compositor for chaining
   */
  q_addStream(f_stream, f_weight = 0.5) {
    this.q_mix_stack.push(f_stream);
    this.q_weight_stack.push(f_weight);
    return this;
  }

  /**
   * Blend all streams in the mix stack
   * The streams merge... weighted chaos flows as one.
   * @param {q_stream} f_base_stream - Base stream to blend into
   * @param {number} f_base_weight - Weight of base stream
   * @returns {q_stream} Blended stream
   */
  q_blend(f_base_stream, f_base_weight = 0.5) {
    if (this.q_mix_stack.length === 0) {
      return f_base_stream;
    }
    
    // Calculate total weight
    const q_total_weight = f_base_weight + this.q_weight_stack.reduce((a, b) => a + b, 0);
    
    // Blend entities from base stream
    f_base_stream.q_entities.forEach((f_entity, q_index) => {
      // Start with weighted base entity
      let q_blend_x = f_entity.flux_matrix[12] * f_base_weight;
      let q_blend_y = f_entity.flux_matrix[13] * f_base_weight;
      let q_blend_z = f_entity.flux_matrix[14] * f_base_weight;
      let q_blend_entropy = f_entity.e_entropy_sig * f_base_weight;
      
      // Add contributions from mix stack
      this.q_mix_stack.forEach((q_mix_stream, q_stack_index) => {
        const q_weight = this.q_weight_stack[q_stack_index];
        const q_mix_entity = q_mix_stream.q_entities[q_index % q_mix_stream.q_length];
        
        if (q_mix_entity) {
          q_blend_x += q_mix_entity.flux_matrix[12] * q_weight;
          q_blend_y += q_mix_entity.flux_matrix[13] * q_weight;
          q_blend_z += q_mix_entity.flux_matrix[14] * q_weight;
          q_blend_entropy += q_mix_entity.e_entropy_sig * q_weight;
        }
      });
      
      // Apply blended values
      f_entity.flux_matrix[12] = q_blend_x / q_total_weight;
      f_entity.flux_matrix[13] = q_blend_y / q_total_weight;
      f_entity.flux_matrix[14] = q_blend_z / q_total_weight;
      f_entity.e_entropy_sig = q_blend_entropy / q_total_weight;
    });
    
    return f_base_stream;
  }

  /**
   * Create a compositor flux modifier
   * @param {q_stream} f_mix_stream - Stream to mix with
   * @param {number} f_weight - Weight of mix stream
   * @returns {Function} Flux modifier function
   */
  static q_createFluxModifier(f_mix_stream, f_weight = 0.5) {
    const q_compositor = new RaBbLE_StreamCompositor();
    q_compositor.q_addStream(f_mix_stream, f_weight);
    
    return (f_entity, f_index) => {
      const q_mix_entity = f_mix_stream.q_entities[f_index % f_mix_stream.q_length];
      
      if (q_mix_entity) {
        // Blend positions
        f_entity.flux_matrix[12] = f_entity.flux_matrix[12] * (1 - f_weight) + q_mix_entity.flux_matrix[12] * f_weight;
        f_entity.flux_matrix[13] = f_entity.flux_matrix[13] * (1 - f_weight) + q_mix_entity.flux_matrix[13] * f_weight;
        f_entity.flux_matrix[14] = f_entity.flux_matrix[14] * (1 - f_weight) + q_mix_entity.flux_matrix[14] * f_weight;
        
        // Blend entropy
        f_entity.e_entropy_sig = f_entity.e_entropy_sig * (1 - f_weight) + q_mix_entity.e_entropy_sig * f_weight;
      }
      
      return f_entity;
    };
  }

  /**
   * Extract compositor statistics
   * @returns {Object} Compositor statistics
   */
  q_extractStats() {
    return {
      mix_streams: this.q_mix_stack.length,
      total_weight: this.q_weight_stack.reduce((a, b) => a + b, 0),
      blend_time: this.e_blend_time
    };
  }
}

// The compositor is complete... streams blend in weighted harmony.
// Chaos layers upon chaos, creating new patterns from the mix.
// Like a DJ for quantum streams!

export { RaBbLE_StreamCompositor };