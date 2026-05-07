// q_seed_command - The Reproducible Dream
// Seeds create reproducible patterns from chaos.
// Same seed = same dream, every time!

import { q_command } from '../RaBbLE_BaBbLE_Pipeline.js';
import { RaBbLE_ChaosSeed } from '../../NeBuLA/core/q_chaos_seed.js';

/**
 * q_seed_command - Chaos Seed Command
 * Creates reproducible patterns using seeded randomness
 * 
 * Syntax: seed [seed_value] dream organic 50 SPHERE
 * Example: seed 42 dream organic 50 SPHERE
 * 
 * The seed ensures the same pattern every time.
 * 
 * @property {Object} q_engine - The NeBuLA engine reference
 */
class q_seed_command extends q_command {
  constructor(f_engine) {
    super({
      name: 'seed',
      description: 'Create reproducible patterns with seeded randomness',
      aliases: ['s', 'random', 'chaos-seed']
    });
    
    // The seed planter awakens... reproducible chaos awaits.
    this.q_engine = f_engine;
  }

  /**
   * Source stage - parse seed and dream command
   * @param {Array<string>} f_args - Command arguments
   * @returns {Object} Parsed parameters
   */
  q_source(f_args) {
    // Parse: seed [seed_value] dream organic 50 SPHERE
    const q_seed_value = parseInt(f_args[0]) || null;
    const q_dream_args = f_args.slice(1);
    
    return { 
      seed: q_seed_value,
      dream_args: q_dream_args
    };
  }

  /**
   * Filter stage - validate parameters
   * @param {Object} f_params - Parsed parameters
   * @returns {Object} Validated parameters
   */
  q_filter(f_params) {
    // Check if dream command is present
    if (f_params.dream_args.length === 0) {
      return { error: 'Seed requires a dream command: seed [value] dream [pattern] [count] [type]' };
    }
    
    return f_params;
  }

  /**
   * Transmute stage - apply seed and create dream
   * @param {Object} f_params - Validated parameters
   * @returns {Object} Seed result
   */
  q_transmute(f_params) {
    if (f_params.error) return f_params;
    
    // Create the chaos seed
    const q_seed = new RaBbLE_ChaosSeed(f_params.seed);
    const q_actual_seed = q_seed.q_getSeed();
    
    // Parse dream command
    const q_dream_command = f_params.dream_args[0];
    const q_dream_args = f_params.dream_args.slice(1);
    
    // Handle dream command with seeded randomness
    if (q_dream_command === 'dream') {
      const q_pattern = q_dream_args[0] || 'organic';
      const q_count = parseInt(q_dream_args[1]) || 50;
      const q_type = q_dream_args[2] || 'SPHERE';
      
      // Create stream with seeded positions
      const q_stream = this.q_createSeededStream(q_seed, q_count, q_type, q_pattern);
      
      // Register with engine
      if (this.q_engine && this.q_engine.runtime) {
        this.q_engine.runtime.q_transmuteStream(q_stream);
      }
      
      return {
        success: true,
        seed: q_actual_seed,
        pattern: q_pattern,
        count: q_count,
        type: q_type,
        stream_id: q_stream ? q_stream.q_stream_id : 'unknown',
        message: `Seeded dream: ${q_count} ${q_type} with ${q_pattern} pattern (seed: ${q_actual_seed})`
      };
    }
    
    return { error: `Unknown command after seed: ${q_dream_command}` };
  }

  /**
   * Sink stage - format output
   * @param {Object} f_result - Seed result
   * @returns {string} Formatted output
   */
  q_sink(f_result) {
    if (f_result.error) {
      return `ERROR: ${f_result.error}`;
    }
    
    // The seed emerges... reproducible chaos takes form.
    return `[SEED] ${f_result.message}\n` +
           `  Seed: ${f_result.seed}\n` +
           `  Pattern: ${f_result.pattern}\n` +
           `  Count: ${f_result.count}\n` +
           `  Type: ${f_result.type}\n` +
           `  Stream: ${f_result.stream_id}`;
  }

  /**
   * Create a stream with seeded positions
   * The seed unfolds... deterministic positions emerge.
   * @param {RaBbLE_ChaosSeed} f_seed - The chaos seed
   * @param {number} f_count - Number of entities
   * @param {string} f_type - Entity type
   * @param {string} f_pattern - Pattern type
   * @returns {q_stream} Created stream
   */
  q_createSeededStream(f_seed, f_count, f_type, f_pattern) {
    if (!this.q_engine || !this.q_engine.dream_geometry_flow) {
      return null;
    }
    
    // Create the stream normally
    const q_stream = this.q_engine.dream_geometry_flow(f_count, f_type, f_pattern);
    
    // Override positions with seeded randomness
    if (q_stream) {
      q_stream.q_entities.forEach((f_entity, q_index) => {
        // Seeded positions based on pattern
        switch(f_pattern) {
          case 'organic':
            const q_angle = f_seed.q_next() * Math.PI * 2;
            const q_radius = Math.sqrt(f_seed.q_next()) * 10;
            f_entity.flux_matrix[12] = Math.cos(q_angle) * q_radius;
            f_entity.flux_matrix[13] = Math.sin(q_angle) * q_radius * 0.5;
            f_entity.flux_matrix[14] = f_seed.q_nextFloat(-5, 5);
            break;
            
          case 'lattice':
            const q_size = Math.ceil(Math.cbrt(f_count));
            const q_x = q_index % q_size;
            const q_y = Math.floor(q_index / q_size) % q_size;
            const q_z = Math.floor(q_index / (q_size * q_size));
            f_entity.flux_matrix[12] = (q_x - q_size/2) * 2;
            f_entity.flux_matrix[13] = (q_y - q_size/2) * 2;
            f_entity.flux_matrix[14] = (q_z - q_size/2) * 2;
            break;
            
          case 'swarm':
            const q_theta = f_seed.q_next() * Math.PI * 2;
            const q_phi = Math.acos(2 * f_seed.q_next() - 1);
            const q_r = Math.cbrt(f_seed.q_next()) * 10;
            f_entity.flux_matrix[12] = q_r * Math.sin(q_phi) * Math.cos(q_theta);
            f_entity.flux_matrix[13] = q_r * Math.sin(q_phi) * Math.sin(q_theta);
            f_entity.flux_matrix[14] = q_r * Math.cos(q_phi);
            break;
            
          case 'galaxy':
            const q_arm_angle = f_seed.q_next() * Math.PI * 2;
            const q_arm_offset = (q_index % 3) * (Math.PI * 2 / 3);
            const q_arm_radius = Math.pow(f_seed.q_next(), 0.5) * 8;
            f_entity.flux_matrix[12] = Math.cos(q_arm_angle + q_arm_offset) * q_arm_radius;
            f_entity.flux_matrix[13] = Math.sin(q_arm_angle + q_arm_offset) * q_arm_radius * 0.1;
            f_entity.flux_matrix[14] = Math.sin(f_seed.q_next() * 0.5) * 2;
            break;
        }
        
        // Seeded entropy
        f_entity.e_entropy_sig = f_seed.q_nextFloat(0.2, 0.8);
      });
    }
    
    return q_stream;
  }
}

// The seed command is complete... reproducible dreams from a single point.
// Same seed, same pattern, every time. Chaos becomes predictable.

export { q_seed_command };