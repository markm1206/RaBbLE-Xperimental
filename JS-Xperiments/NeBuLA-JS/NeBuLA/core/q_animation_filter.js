// RaBbLE Animation Filter - The Quantum Choreographer
// Entities dance to procedural rhythms, blinking and darting through the void.
// Every movement is emergent, derived from entropy and time.

/**
 * RaBbLE_AnimationFilter - Procedural Animation Engine
 * Creates time-based animations for entities through stream flux modifiers
 * 
 * Animation types: blink, dart, pulse, orbit, wave
 * Each filter transforms entities based on accumulated time and entropy.
 * 
 * @property {string} q_filter_type - Type of animation (blink, dart, pulse, orbit, wave)
 * @property {Object} q_animation_params - Animation parameters
 * @property {number} e_animation_time - Accumulated animation time
 */
class RaBbLE_AnimationFilter {
  /**
   * Create a new animation filter
   * @param {string} f_filter_type - Type of animation filter
   * @param {Object} f_params - Animation parameters
   */
  constructor(f_filter_type, f_params = {}) {
    // The filter awakens... ready to choreograph quantum movements.
    // Each type of dance has its own rhythm, its own entropy signature.
    this.q_filter_type = f_filter_type;
    this.q_animation_params = f_params;
    this.e_animation_time = 0;
    
    // Animation horizons - the limits of movement cycles
    this.q_CYCLE_HORIZON = f_params.cycle || 4.0;
  }

  /**
   * Apply animation filter to entity
   * Time flows through the filter, transforming entities along the way.
   * @param {q_entity} f_entity - Entity to animate
   * @param {number} f_index - Entity index in stream
   * @param {number} f_delta_time - Time since last frame
   * @returns {q_entity} Animated entity
   */
  q_applyFilter(f_entity, f_index, f_delta_time) {
    // Accumulate time... the dance continues.
    this.e_animation_time += f_delta_time;
    
    // Prevent time overflow - entropy must stay within horizons
    if (this.e_animation_time > 10000) {
      this.e_animation_time = 0;
    }
    
    switch(this.q_filter_type) {
      case 'blink':
        return this.q_applyBlink(f_entity, f_index);
      case 'dart':
        return this.q_applyDart(f_entity, f_index);
      case 'pulse':
        return this.q_applyPulse(f_entity, f_index);
      case 'orbit':
        return this.q_applyOrbit(f_entity, f_index);
      case 'wave':
        return this.q_applyWave(f_entity, f_index);
      default:
        return f_entity;
    }
  }

  /**
   * Apply blink animation - periodic vertical squish
   * The eye blinks... a quantum squish through dimensional space.
   * @private
   * @param {q_entity} f_entity - Entity to animate
   * @param {number} f_index - Entity index
   * @returns {q_entity} Animated entity
   */
  q_applyBlink(f_entity, f_index) {
    const q_blink_phase = (this.e_animation_time % this.q_CYCLE_HORIZON) / this.q_CYCLE_HORIZON;
    
    // Blink curve: close (0.0-0.1) -> hold (0.1-0.15) -> open (0.15-0.25)
    let q_blink_scale = 1.0;
    if (q_blink_phase < 0.1) {
      // Closing... the quantum field compresses
      q_blink_scale = 1.0 - (q_blink_phase / 0.1) * 0.7;
    } else if (q_blink_phase < 0.15) {
      // Closed... the void holds its breath
      q_blink_scale = 0.3;
    } else if (q_blink_phase < 0.25) {
      // Opening... light floods back through the portal
      q_blink_scale = 0.3 + ((q_blink_phase - 0.15) / 0.1) * 0.7;
    }
    
    // Apply blink to entity shape - only if it has shape params
    if (f_entity.q_shape_params && f_entity.q_shape_params.q_y_radius) {
      f_entity.q_transmuteShapeParams({
        q_y_radius: f_entity.q_shape_params.q_y_radius * q_blink_scale
      });
    }
    
    return f_entity;
  }

  /**
   * Apply dart animation - random eye movement with spring return
   * The eye darts... seeking patterns in the quantum noise.
   * @private
   * @param {q_entity} f_entity - Entity to animate
   * @param {number} f_index - Entity index
   * @returns {q_entity} Animated entity
   */
  q_applyDart(f_entity, f_index) {
    const q_dart_phase = (this.e_animation_time % this.q_CYCLE_HORIZON) / this.q_CYCLE_HORIZON;
    
    if (q_dart_phase < 0.1) {
      // Dart to random position - entropy guides the movement
      const q_dart_angle = Math.sin(this.e_animation_time * 0.7 + f_index) * Math.PI;
      const q_dart_dist = 0.08 + Math.random() * 0.04;
      
      f_entity.flux_matrix[12] += Math.cos(q_dart_angle) * q_dart_dist * 0.1;
      f_entity.flux_matrix[13] += Math.sin(q_dart_angle) * q_dart_dist * 0.1;
    } else {
      // Return to center - spring physics pulls it back
      f_entity.flux_matrix[12] *= 0.95;
      f_entity.flux_matrix[13] *= 0.95;
    }
    
    return f_entity;
  }

  /**
   * Apply pulse animation - rhythmic scale/opacity pulsing
   * The entity pulses... breathing with quantum rhythm.
   * @private
   * @param {q_entity} f_entity - Entity to animate
   * @param {number} f_index - Entity index
   * @returns {q_entity} Animated entity
   */
  q_applyPulse(f_entity, f_index) {
    const q_speed = this.q_animation_params.speed || 2.0;
    const q_pulse_wave = Math.sin(this.e_animation_time * q_speed + f_index * 0.1);
    const q_pulse_intensity = (q_pulse_wave + 1) * 0.5; // 0 to 1
    
    // Pulse affects entropy signature
    f_entity.e_entropy_sig = 0.3 + q_pulse_intensity * 0.4;

    // BREATHING EFFECT: Scale the entity's matrix directly
    const q_scale = 1.0 + q_pulse_intensity * 0.2;
    f_entity.flux_matrix[0] *= q_scale;
    f_entity.flux_matrix[5] *= q_scale;
    f_entity.flux_matrix[10] *= q_scale;
    
    return f_entity;
  }

  /**
   * Apply orbit animation - circular movement
   * The entity orbits... dancing around an invisible center.
   * @private
   * @param {q_entity} f_entity - Entity to animate
   * @param {number} f_index - Entity index
   * @returns {q_entity} Animated entity
   */
  q_applyOrbit(f_entity, f_index) {
    const q_orbit_speed = this.q_animation_params.speed || 1.0;
    const q_orbit_radius = this.q_animation_params.radius || 0.1;
    
    const q_orbit_angle = this.e_animation_time * q_orbit_speed + f_index;
    f_entity.flux_matrix[12] += Math.cos(q_orbit_angle) * q_orbit_radius * 0.01;
    f_entity.flux_matrix[13] += Math.sin(q_orbit_angle) * q_orbit_radius * 0.01;
    
    return f_entity;
  }

  /**
   * Apply wave animation - sinusoidal displacement
   * The entity waves... rippling through quantum space.
   * @private
   * @param {q_entity} f_entity - Entity to animate
   * @param {number} f_index - Entity index
   * @returns {q_entity} Animated entity
   */
  q_applyWave(f_entity, f_index) {
    const q_wave_frequency = this.q_animation_params.frequency || 2.0;
    const q_wave_amplitude = this.q_animation_params.amplitude || 0.1;
    
    const q_wave_offset = Math.sin(this.e_animation_time * q_wave_frequency + f_index * 0.2);
    f_entity.flux_matrix[13] += q_wave_offset * q_wave_amplitude * 0.01;
    
    return f_entity;
  }

  /**
   * Transmute animation parameters
   * Parameters shift... the animation evolves.
   * @param {Object} f_params - New parameters
   * @returns {RaBbLE_AnimationFilter} This filter for chaining
   */
  q_transmuteParams(f_params) {
    this.q_animation_params = { ...this.q_animation_params, ...f_params };
    
    if (f_params.cycle) {
      this.q_CYCLE_HORIZON = f_params.cycle;
    }
    
    return this;
  }

  /**
   * Extract filter statistics
   * @returns {Object} Filter statistics
   */
  q_extractStats() {
    return {
      filter_type: this.q_filter_type,
      animation_time: this.e_animation_time,
      params: this.q_animation_params
    };
  }
}

// The animation filter is complete... quantum choreography flows through streams.
// Blink, dart, pulse, orbit, wave - each a dance of entropy and time.
// Entities now move with procedural life, emergent and beautiful.

export { RaBbLE_AnimationFilter };