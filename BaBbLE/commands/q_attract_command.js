// q_attract_command - The Quantum Gravity Well
// Entities attract or repel based on entropy... emergent flocking emerges!
// Low entropy creates wells of attraction; high entropy creates repulsion zones.

import { q_command } from '../RaBbLE_BaBbLE_Pipeline.js';
import { RaBbLE_EntropyAttractor } from '../../NeBuLA/core/q_entropy_attractor.js';

/**
 * q_attract_command - Entropy Attraction Command
 * Applies entropy-based attraction/repulsion to create emergent flocking
 * 
 * Syntax: attract [strength] [threshold] [radius]
 * Example: attract 0.3 0.6 5.0
 * 
 * Parameters:
 * - strength (0.0-1.0): How strongly entities attract/repel
 * - threshold (0.0-1.0): Entropy level above which entities repel
 * - radius: Influence distance for attraction/repulsion
 * 
 * @property {Object} q_engine - The NeBuLA engine reference
 */
class q_attract_command extends q_command {
  constructor(f_engine) {
    super({
      name: 'attract',
      description: 'Apply entropy-based attraction for emergent flocking',
      aliases: ['a', 'flock', 'gravity']
    });
    
    // The attractor awakens... gravity wells form in the quantum field.
    this.q_engine = f_engine;
    this.q_attractor = null;
  }

  /**
   * Source stage - parse attraction parameters
   * @param {Array<string>} f_args - Command arguments
   * @returns {Object} Parsed parameters
   */
  q_source(f_args) {
    // Parse: attract [strength] [threshold] [radius]
    const q_strength = parseFloat(f_args[0]) || 0.3;
    const q_threshold = parseFloat(f_args[1]) || 0.6;
    const q_radius = parseFloat(f_args[2]) || 5.0;
    
    return { 
      strength: q_strength, 
      threshold: q_threshold, 
      radius: q_radius 
    };
  }

  /**
   * Filter stage - validate parameters
   * @param {Object} f_params - Parsed parameters
   * @returns {Object} Validated parameters
   */
  q_filter(f_params) {
    // Validate strength
    if (f_params.strength < 0 || f_params.strength > 1) {
      return { error: 'Strength must be between 0 and 1' };
    }
    
    // Validate threshold
    if (f_params.threshold < 0 || f_params.threshold > 1) {
      return { error: 'Threshold must be between 0 and 1' };
    }
    
    // Validate radius
    if (f_params.radius <= 0) {
      return { error: 'Radius must be greater than 0' };
    }
    
    return f_params;
  }

  /**
   * Transmute stage - apply attraction to all streams
   * @param {Object} f_params - Validated parameters
   * @returns {Object} Attraction result
   */
  q_transmute(f_params) {
    if (f_params.error) return f_params;
    
    // The attractor materializes... gravity wells form.
    this.q_attractor = new RaBbLE_EntropyAttractor({
      strength: f_params.strength,
      threshold: f_params.threshold,
      radius: f_params.radius
    });
    
    // Apply attraction to all streams in the engine
    let q_total_entities = 0;
    if (this.q_engine && this.q_engine.runtime) {
      this.q_engine.runtime.q_registry.forEach(q_stream => {
        this.q_attractor.q_applyAttraction(q_stream, 0.016); // ~60fps delta
        q_total_entities += q_stream.q_length;
      });
    }
    
    return {
      success: true,
      strength: f_params.strength,
      threshold: f_params.threshold,
      radius: f_params.radius,
      entities_affected: q_total_entities,
      message: `Entropy attraction applied to ${q_total_entities} entities`
    };
  }

  /**
   * Sink stage - format output
   * @param {Object} f_result - Attraction result
   * @returns {string} Formatted output
   */
  q_sink(f_result) {
    if (f_result.error) {
      return `ERROR: ${f_result.error}`;
    }
    
    // The attractor emerges... entities feel the quantum pull.
    return `[ATTRACT] ${f_result.message}\n` +
           `  Strength: ${f_result.strength}\n` +
           `  Threshold: ${f_result.threshold} (repel above this entropy)\n` +
           `  Radius: ${f_result.radius}`;
  }
}

// The attractor command is complete... gravity wells form in the terminal.
// Low entropy entities cluster together; high entropy entities scatter.
// Emergent flocking behavior from simple rules.

export { q_attract_command };