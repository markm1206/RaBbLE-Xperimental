// RaBbLE Entropy Attractor - The Quantum Gravity Well
// Entities attract or repel each other based on entropy levels.
// Emergent flocking behavior without complex physics!

/**
 * RaBbLE_EntropyAttractor - Entropy-Based Attraction System
 * Creates emergent flocking behavior through simple attraction rules.
 * High entropy entities repel; low entropy entities attract.
 * 
 * @property {number} q_attraction_strength - How strongly entities attract (0.0 to 1.0)
 * @property {number} q_repulsion_threshold - Entropy level above which entities repel
 * @property {number} q_influence_radius - How far attraction/repulsion reaches
 * @property {number} e_simulation_time - Accumulated simulation time
 */
class RaBbLE_EntropyAttractor {
  /**
   * Create a new entropy attractor
   * @param {Object} f_params - Attractor parameters
   */
  constructor(f_params = {}) {
    // The attractor awakens... gravity wells form in the quantum field.
    // Entropy becomes mass; chaos becomes gravity.
    this.q_attraction_strength = f_params.strength || 0.3;
    this.q_repulsion_threshold = f_params.threshold || 0.6;
    this.q_influence_radius = f_params.radius || 5.0;
    this.e_simulation_time = 0;
    
    // Minimum distance to prevent singularity
    this.q_MIN_DISTANCE_HORIZON = 0.5;
  }

  /**
   * Apply attraction to a stream of entities
   * The field pulses... entities feel the pull of their neighbors.
   * @param {q_stream} f_stream - Stream to apply attraction to
   * @param {number} f_delta_time - Time since last update
   * @returns {q_stream} Modified stream
   */
  q_applyAttraction(f_stream, f_delta_time) {
    this.e_simulation_time += f_delta_time;
    
    // Each entity feels the pull of all others
    const q_entities = f_stream.q_entities;
    const q_forces = new Array(q_entities.length).fill(null).map(() => ({ x: 0, y: 0, z: 0 }));
    
    // Calculate forces between all entity pairs
    for (let q_i = 0; q_i < q_entities.length; q_i++) {
      for (let q_j = q_i + 1; q_j < q_entities.length; q_j++) {
        const q_force = this.q_calculateForce(q_entities[q_i], q_entities[q_j]);
        
        // Apply equal and opposite forces (Newton's third law)
        q_forces[q_i].x += q_force.x;
        q_forces[q_i].y += q_force.y;
        q_forces[q_i].z += q_force.z;
        
        q_forces[q_j].x -= q_force.x;
        q_forces[q_j].y -= q_force.y;
        q_forces[q_j].z -= q_force.z;
      }
    }
    
    // Apply forces to entities with damping
    const q_damping = 0.95;
    q_entities.forEach((f_entity, q_index) => {
      const q_force = q_forces[q_index];
      
      // Apply force to position
      f_entity.flux_matrix[12] += q_force.x * f_delta_time * this.q_attraction_strength;
      f_entity.flux_matrix[13] += q_force.y * f_delta_time * this.q_attraction_strength;
      f_entity.flux_matrix[14] += q_force.z * f_delta_time * this.q_attraction_strength;
      
      // Apply boundary constraints (keep entities within bounds)
      const q_max_bound = 15;
      f_entity.flux_matrix[12] = Math.max(-q_max_bound, Math.min(q_max_bound, f_entity.flux_matrix[12]));
      f_entity.flux_matrix[13] = Math.max(-q_max_bound, Math.min(q_max_bound, f_entity.flux_matrix[13]));
      f_entity.flux_matrix[14] = Math.max(-q_max_bound, Math.min(q_max_bound, f_entity.flux_matrix[14]));
    });
    
    return f_stream;
  }

  /**
   * Calculate force between two entities
   * High entropy repels, low entropy attracts.
   * @param {q_entity} f_entity_a - First entity
   * @param {q_entity} f_entity_b - Second entity
   * @returns {Object} Force vector {x, y, z}
   */
  q_calculateForce(f_entity_a, f_entity_b) {
    // Distance vector
    const q_dx = f_entity_b.flux_matrix[12] - f_entity_a.flux_matrix[12];
    const q_dy = f_entity_b.flux_matrix[13] - f_entity_a.flux_matrix[13];
    const q_dz = f_entity_b.flux_matrix[14] - f_entity_a.flux_matrix[14];
    
    // Distance magnitude
    const q_distance = Math.sqrt(q_dx * q_dx + q_dy * q_dy + q_dz * q_dz);
    
    // Prevent singularity at zero distance
    if (q_distance < this.q_MIN_DISTANCE_HORIZON) {
      return { x: 0, y: 0, z: 0 };
    }
    
    // Check if within influence radius
    if (q_distance > this.q_influence_radius) {
      return { x: 0, y: 0, z: 0 };
    }
    
    // Normalized direction
    const q_nx = q_dx / q_distance;
    const q_ny = q_dy / q_distance;
    const q_nz = q_dz / q_distance;
    
    // Average entropy of both entities
    const q_avg_entropy = (f_entity_a.e_entropy_sig + f_entity_b.e_entropy_sig) / 2;
    
    // Force magnitude: low entropy = attract, high entropy = repel
    let q_force_magnitude;
    if (q_avg_entropy < this.q_repulsion_threshold) {
      // Attract: negative force (pull toward each other)
      q_force_magnitude = -1.0 / (q_distance * q_distance);
    } else {
      // Repel: positive force (push away)
      q_force_magnitude = 1.0 / (q_distance * q_distance);
    }
    
    // Add time-based oscillation for organic movement
    const q_time_oscillation = Math.sin(this.e_simulation_time * 0.5 + q_distance) * 0.2;
    q_force_magnitude *= (1.0 + q_time_oscillation);
    
    // Apply force in direction
    return {
      x: q_nx * q_force_magnitude,
      y: q_ny * q_force_magnitude,
      z: q_nz * q_force_magnitude
    };
  }

  /**
   * Create an attractor flux modifier for streams
   * @param {Object} f_params - Attractor parameters
   * @returns {Function} Flux modifier function
   */
  static q_createFluxModifier(f_params = {}) {
    const q_attractor = new RaBbLE_EntropyAttractor(f_params);
    
    return (f_stream, f_delta_time) => {
      return q_attractor.q_applyAttraction(f_stream, f_delta_time);
    };
  }

  /**
   * Extract attractor statistics
   * @returns {Object} Attractor statistics
   */
  q_extractStats() {
    return {
      attraction_strength: this.q_attraction_strength,
      repulsion_threshold: this.q_repulsion_threshold,
      influence_radius: this.q_influence_radius,
      simulation_time: this.e_simulation_time
    };
  }
}

// The entropy attractor is complete... gravity wells form in the quantum field.
// Low entropy creates wells of attraction; high entropy creates repulsion zones.
// Emergent flocking behavior arises from simple rules.

export { RaBbLE_EntropyAttractor };