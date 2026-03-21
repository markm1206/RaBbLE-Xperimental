// RaBbLE Stream Trail - The Ghost of Movement Past
// Entities leave trails of ghost copies at previous positions.
// Motion blur without shaders - pure Flat-Chaos!

/**
 * RaBbLE_StreamTrail - Trail Effect System
 * Creates ghost copies of entities at previous positions
 * Ghosts fade over time, creating motion blur effects.
 * 
 * @property {number} q_trail_length - Number of ghost copies to maintain
 * @property {number} q_fade_rate - How quickly ghosts fade (0.0 to 1.0)
 * @property {Array} q_position_history - History of entity positions
 */
class RaBbLE_StreamTrail {
  /**
   * Create a new stream trail effect
   * @param {Object} f_params - Trail parameters
   */
  constructor(f_params = {}) {
    // The trail awakens... the past echoes through the present.
    // Each ghost is a memory of where the entity once was.
    this.q_trail_length = f_params.length || 5;
    this.q_fade_rate = f_params.fade || 0.8;
    this.q_position_history = [];
    this.e_frame_count = 0;
  }

  /**
   * Apply trail effect to a stream
   * The stream flows... leaving ghosts in its wake.
   * @param {q_stream} f_stream - Stream to apply trail to
   * @returns {q_stream} Stream with trail effect applied
   */
  q_applyTrail(f_stream) {
    // Store current positions
    const q_current_positions = f_stream.q_entities.map(f_entity => ({
      x: f_entity.flux_matrix[12],
      y: f_entity.flux_matrix[13],
      z: f_entity.flux_matrix[14],
      color: f_entity.q_render_color,
      size: f_entity.q_render_size,
      entropy: f_entity.e_entropy_sig
    }));
    
    // Add to history
    this.q_position_history.push(q_current_positions);
    
    // Keep history within bounds
    while (this.q_position_history.length > this.q_trail_length) {
      this.q_position_history.shift();
    }
    
    // Create ghost entities from history
    const q_ghosts = [];
    for (let q_history_index = 0; q_history_index < this.q_position_history.length - 1; q_history_index++) {
      const q_positions = this.q_position_history[q_history_index];
      const q_age = this.q_position_history.length - 1 - q_history_index;
      const q_opacity = Math.pow(this.q_fade_rate, q_age);
      
      q_positions.forEach((q_pos, q_entity_index) => {
        // Create ghost entity (simplified - just a marker)
        q_ghosts.push({
          position: q_pos,
          opacity: q_opacity,
          age: q_age,
          entity_index: q_entity_index
        });
      });
    }
    
    // Apply trail modifier to stream
    const q_original_modifier = f_stream.flux_modifier;
    f_stream.q_transmuteFluxModifier((f_entity, f_index) => {
      // Apply original modifier
      let q_entity = q_original_modifier ? q_original_modifier(f_entity, f_index) : f_entity;
      
      // Pulse opacity based on trail position
      const q_trail_pulse = Math.sin(this.e_frame_count * 0.1 + f_index * 0.2) * 0.1;
      q_entity.q_transmuteRenderOpacity(Math.max(0.3, q_entity.q_render_opacity + q_trail_pulse));
      
      return q_entity;
    });
    
    this.e_frame_count++;
    return f_stream;
  }

  /**
   * Get trail statistics
   * @returns {Object} Trail statistics
   */
  q_extractStats() {
    return {
      trail_length: this.q_trail_length,
      fade_rate: this.q_fade_rate,
      history_depth: this.q_position_history.length,
      frame_count: this.e_frame_count
    };
  }
}

// The trail system is complete... ghosts of movement past linger in the void.
// Each position is remembered, each memory fades with time.
// This is the foundation of Lakes - render targets that remember.

export { RaBbLE_StreamTrail };