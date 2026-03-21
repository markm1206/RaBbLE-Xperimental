// q_weave_command - The Stream Weaver
// Two streams become one... chaos merges with order in parallel flow.
// The <> operator weaves streams together like quantum threads.

import { q_command } from '../RaBbLE_BaBbLE_Pipeline.js';
import { q_stream } from '../../NeBuLA/core/q_stream.js';
import { q_entity } from '../../NeBuLA/core/q_entity.js';

/**
 * q_weave_command - Stream Weaving Command
 * Weaves two stream definitions together with <> connectors for parallel execution
 * 
 * Syntax: weave "dream organic 30 SPHERE" <> "dream swarm 30 TETRAHEDRON" >> sink
 * 
 * The streams flow in parallel, their entities interleaved in the final output.
 * 
 * @property {Object} q_engine - The NeBuLA engine reference
 */
class q_weave_command extends q_command {
  constructor(f_engine) {
    super({
      name: 'weave',
      description: 'Weave two streams together with <> for parallel flow',
      aliases: ['w', 'merge', 'combine']
    });
    
    // The weaver awakens... two streams prepare to merge.
    this.q_engine = f_engine;
  }

  /**
   * Source stage - parse weave syntax from arguments
   * @param {Array<string>} f_args - Command arguments
   * @returns {Object} Parsed parameters
   */
  q_source(f_args) {
    // Parse: weave "dream organic 30 SPHERE" <> "dream swarm 30 TETRAHEDRON" >> sink
    const q_full_string = f_args.join(' ');
    return { weave_string: q_full_string };
  }

  /**
   * Filter stage - validate weave syntax
   * @param {Object} f_params - Parsed parameters
   * @returns {Object} Validated parameters
   */
  q_filter(f_params) {
    // Validate weave syntax
    if (!f_params.weave_string || f_params.weave_string.trim() === '') {
      return { error: 'Weave string is empty' };
    }
    
    // Check for <> connectors
    if (!f_params.weave_string.includes('<>')) {
      return { error: 'Weave must contain <> connectors' };
    }
    
    return f_params;
  }

  /**
   * Transmute stage - execute the weave
   * @param {Object} f_params - Validated parameters
   * @returns {Object} Weave execution result
   */
  q_transmute(f_params) {
    if (f_params.error) return f_params;
    
    // The weave materializes... streams merge in parallel.
    const q_weave_parts = this.q_parseWeave(f_params.weave_string);
    const q_result = this.q_executeWeave(q_weave_parts);
    
    return q_result;
  }

  /**
   * Sink stage - format output
   * @param {Object} f_result - Weave result
   * @returns {string} Formatted output
   */
  q_sink(f_result) {
    if (f_result.error) {
      return `ERROR: ${f_result.error}`;
    }
    
    // The weave emerges... two streams flow as one.
    return `[WEAVE] ${f_result.message}\n` +
           `  Stream A: ${f_result.stream_a_count} entities\n` +
           `  Stream B: ${f_result.stream_b_count} entities\n` +
           `  Combined: ${f_result.total_count} entities`;
  }

  /**
   * Parse weave string into component streams
   * The syntax unfolds... <> separates parallel streams.
   * @param {string} f_weave_string - Weave syntax string
   * @returns {Object} Parsed weave parts
   */
  q_parseWeave(f_weave_string) {
    // Split by <> to get the two stream definitions
    const q_parts = f_weave_string.split('<>').map(s => s.trim());
    
    // Check for additional >> stages after the weave
    let q_stream_a_def = q_parts[0] || '';
    let q_stream_b_def = q_parts[1] || '';
    let q_post_stages = [];
    
    // If stream B contains >>, extract post-stages
    if (q_stream_b_def.includes('>>')) {
      const q_split = q_stream_b_def.split('>>');
      q_stream_b_def = q_split[0].trim();
      q_post_stages = q_split.slice(1).map(s => s.trim());
    }
    
    return {
      stream_a: q_stream_a_def,
      stream_b: q_stream_b_def,
      post_stages: q_post_stages
    };
  }

  /**
   * Execute the weave - create both streams and combine them
   * The parallel flows merge... entities interleave in quantum harmony.
   * @param {Object} f_weave_parts - Parsed weave parts
   * @returns {Object} Weave execution result
   */
  q_executeWeave(f_weave_parts) {
    // Parse stream A definition
    const q_stream_a = this.q_createStreamFromDef(f_weave_parts.stream_a);
    if (!q_stream_a) {
      return { error: `Failed to create stream A from: ${f_weave_parts.stream_a}` };
    }
    
    // Parse stream B definition
    const q_stream_b = this.q_createStreamFromDef(f_weave_parts.stream_b);
    if (!q_stream_b) {
      return { error: `Failed to create stream B from: ${f_weave_parts.stream_b}` };
    }
    
    // Weave the streams together - interleave entities
    const q_woven_stream = this.q_weaveStreams(q_stream_a, q_stream_b);
    
    // Apply any post-weave stages
    let q_final_stream = q_woven_stream;
    for (const q_stage of f_weave_parts.post_stages) {
      q_final_stream = this.q_applyPostStage(q_final_stream, q_stage);
    }
    
    // Register the woven stream with the engine
    if (this.q_engine && this.q_engine.runtime) {
      this.q_engine.runtime.q_transmuteStream(q_final_stream);
    }
    
    return {
      success: true,
      stream_a_count: q_stream_a.q_length,
      stream_b_count: q_stream_b.q_length,
      total_count: q_final_stream.q_length,
      stream_id: q_final_stream.q_stream_id,
      message: `Wove ${q_stream_a.q_length} + ${q_stream_b.q_length} = ${q_final_stream.q_length} entities`
    };
  }

  /**
   * Create a stream from a definition string
   * The definition unfolds... dream organic 30 SPHERE
   * @param {string} f_def - Stream definition string
   * @returns {q_stream|null} Created stream or null
   */
  q_createStreamFromDef(f_def) {
    if (!f_def || f_def.trim() === '') return null;
    
    const q_parts = f_def.split(' ');
    const q_command = q_parts[0];
    const q_args = q_parts.slice(1);
    
    // Handle dream command
    if (q_command === 'dream') {
      const q_pattern = q_args[0] || 'organic';
      const q_count = parseInt(q_args[1]) || 30;
      const q_type = q_args[2] || 'SPHERE';
      
      if (this.q_engine && this.q_engine.dream_geometry_flow) {
        return this.q_engine.dream_geometry_flow(q_count, q_type, q_pattern);
      }
    }
    
    // Handle direct count/type
    const q_count = parseInt(q_args[0]) || 30;
    const q_type = q_args[1] || 'SPHERE';
    
    if (this.q_engine && this.q_engine.dream_geometry_flow) {
      return this.q_engine.dream_geometry_flow(q_count, q_type, 'organic');
    }
    
    return null;
  }

  /**
   * Weave two streams together by interleaving entities
   * The threads intertwine... A, B, A, B, like a quantum braid.
   * @param {q_stream} f_stream_a - First stream
   * @param {q_stream} f_stream_b - Second stream
   * @returns {q_stream} Woven stream
   */
  q_weaveStreams(f_stream_a, f_stream_b) {
    const q_woven_entities = [];
    const q_max_length = Math.max(f_stream_a.q_length, f_stream_b.q_length);
    
    for (let q_index = 0; q_index < q_max_length; q_index++) {
      // Add from stream A if available
      if (q_index < f_stream_a.q_length) {
        q_woven_entities.push(f_stream_a.q_entities[q_index]);
      }
      
      // Add from stream B if available
      if (q_index < f_stream_b.q_length) {
        q_woven_entities.push(f_stream_b.q_entities[q_index]);
      }
    }
    
    // Create the woven stream with combined flux modifier
    const q_woven_stream = new q_stream(
      `woven_${f_stream_a.q_stream_id}_${f_stream_b.q_stream_id}`,
      q_woven_entities,
      this.q_createWovenFluxModifier(f_stream_a, f_stream_b)
    );
    
    return q_woven_stream;
  }

  /**
   * Create a flux modifier that combines both streams' modifiers
   * The modifiers weave together... chaos from A meets order from B.
   * @param {q_stream} f_stream_a - First stream
   * @param {q_stream} f_stream_b - Second stream
   * @returns {Function} Combined flux modifier
   */
  q_createWovenFluxModifier(f_stream_a, f_stream_b) {
    const q_modifier_a = f_stream_a.flux_modifier;
    const q_modifier_b = f_stream_b.flux_modifier;
    const q_length_a = f_stream_a.q_length;
    
    return (f_entity, f_index) => {
      // Determine which stream this entity came from
      // Entities alternate: A, B, A, B...
      const q_is_from_a = (f_index % 2 === 0);
      
      // Apply the appropriate modifier
      if (q_is_from_a && q_modifier_a) {
        return q_modifier_a(f_entity, Math.floor(f_index / 2));
      } else if (!q_is_from_a && q_modifier_b) {
        return q_modifier_b(f_entity, Math.floor(f_index / 2));
      }
      
      return f_entity;
    };
  }

  /**
   * Apply a post-weave stage to the woven stream
   * The stage transforms... the woven stream evolves.
   * @param {q_stream} f_stream - Stream to transform
   * @param {string} f_stage - Stage definition
   * @returns {q_stream} Transformed stream
   */
  q_applyPostStage(f_stream, f_stage) {
    const q_parts = f_stage.trim().split(' ');
    const q_command = q_parts[0];
    const q_args = q_parts.slice(1);
    
    // Handle animation filters
    const q_animation_types = ['blink', 'dart', 'pulse', 'orbit', 'wave'];
    if (q_animation_types.includes(q_command)) {
      // Import animation filter dynamically
      const q_cycle = parseFloat(q_args[0]) || 4.0;
      const q_original_modifier = f_stream.flux_modifier;
      
      f_stream.q_transmuteFluxModifier((f_entity, f_index) => {
        let q_entity = q_original_modifier ? q_original_modifier(f_entity, f_index) : f_entity;
        
        // Apply simple animation based on type
        const q_time = Date.now() * 0.001;
        switch(q_command) {
          case 'blink':
            const q_blink_phase = (q_time % q_cycle) / q_cycle;
            if (q_blink_phase < 0.1) {
              q_entity.e_entropy_sig *= 0.3;
            }
            break;
          case 'pulse':
            const q_pulse = Math.sin(q_time * 2 + f_index * 0.1);
            q_entity.e_entropy_sig = 0.3 + (q_pulse + 1) * 0.2;
            break;
          case 'orbit':
            const q_orbit_angle = q_time + f_index;
            q_entity.flux_matrix[12] += Math.cos(q_orbit_angle) * 0.01;
            q_entity.flux_matrix[13] += Math.sin(q_orbit_angle) * 0.01;
            break;
        }
        
        return q_entity;
      });
    }
    
    return f_stream;
  }
}

// The weave command is complete... streams now braid together in parallel.
// Two rivers merge into one, chaos and order flowing side by side.
// The <> operator unlocks a new dimension of stream composition.

export { q_weave_command };