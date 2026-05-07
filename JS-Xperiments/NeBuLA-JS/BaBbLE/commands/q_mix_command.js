// q_mix_command - The Chaos Mixer
// Mix multiple streams together with weighted blending.
// Like a DJ mixer for quantum streams!

import { q_command } from '../RaBbLE_BaBbLE_Pipeline.js';
import { RaBbLE_StreamCompositor } from '../../NeBuLA/core/q_stream_compositor.js';

/**
 * q_mix_command - Stream Mixing Command
 * Mixes the current stream with another stream using weighted blending
 * 
 * Syntax: mix [weight] [stream_definition]
 * Example: dream organic 50 SPHERE >> mix 0.7 "dream swarm 30 TETRAHEDRON"
 * 
 * Parameters:
 * - weight (0.0-1.0): How much of the mix stream to blend in
 * - stream_definition: The stream to mix with (quoted if contains spaces)
 * 
 * @property {Object} q_engine - The NeBuLA engine reference
 */
class q_mix_command extends q_command {
  constructor(f_engine) {
    super({
      name: 'mix',
      description: 'Mix streams together with weighted blending',
      aliases: ['m', 'blend', 'composite']
    });
    
    // The mixer awakens... streams prepare to blend.
    this.q_engine = f_engine;
  }

  /**
   * Source stage - parse mix parameters
   * @param {Array<string>} f_args - Command arguments
   * @returns {Object} Parsed parameters
   */
  q_source(f_args) {
    // Parse: mix [weight] [stream_definition]
    const q_weight = parseFloat(f_args[0]) || 0.5;
    const q_stream_def = f_args.slice(1).join(' ');
    
    return { 
      weight: q_weight,
      stream_def: q_stream_def
    };
  }

  /**
   * Filter stage - validate parameters
   * @param {Object} f_params - Parsed parameters
   * @returns {Object} Validated parameters
   */
  q_filter(f_params) {
    // Validate weight
    if (f_params.weight < 0 || f_params.weight > 1) {
      return { error: 'Weight must be between 0 and 1' };
    }
    
    // Validate stream definition
    if (!f_params.stream_def || f_params.stream_def.trim() === '') {
      return { error: 'Mix requires a stream definition: mix [weight] dream [pattern] [count] [type]' };
    }
    
    return f_params;
  }

  /**
   * Transmute stage - apply mix to all streams
   * @param {Object} f_params - Validated parameters
   * @returns {Object} Mix result
   */
  q_transmute(f_params) {
    if (f_params.error) return f_params;
    
    // Parse the stream definition
    const q_stream_parts = f_params.stream_def.split(' ');
    const q_command = q_stream_parts[0];
    const q_args = q_stream_parts.slice(1);
    
    // Create the mix stream
    let q_mix_stream = null;
    if (q_command === 'dream') {
      const q_pattern = q_args[0] || 'organic';
      const q_count = parseInt(q_args[1]) || 30;
      const q_type = q_args[2] || 'SPHERE';
      
      if (this.q_engine && this.q_engine.dream_geometry_flow) {
        q_mix_stream = this.q_engine.dream_geometry_flow(q_count, q_type, q_pattern);
      }
    }
    
    if (!q_mix_stream) {
      return { error: `Failed to create mix stream from: ${f_params.stream_def}` };
    }
    
    // Apply mix to all streams in the engine
    let q_total_entities = 0;
    const q_compositor = new RaBbLE_StreamCompositor();
    q_compositor.q_addStream(q_mix_stream, f_params.weight);
    
    if (this.q_engine && this.q_engine.runtime) {
      this.q_engine.runtime.q_registry.forEach(q_stream => {
        q_compositor.q_blend(q_stream, 0.5);
        q_total_entities += q_stream.q_length;
      });
    }
    
    return {
      success: true,
      weight: f_params.weight,
      mix_stream_id: q_mix_stream.q_stream_id,
      entities_affected: q_total_entities,
      message: `Mixed streams with weight ${f_params.weight}`
    };
  }

  /**
   * Sink stage - format output
   * @param {Object} f_result - Mix result
   * @returns {string} Formatted output
   */
  q_sink(f_result) {
    if (f_result.error) {
      return `ERROR: ${f_result.error}`;
    }
    
    // The mix emerges... streams blend in weighted harmony.
    return `[MIX] ${f_result.message}\n` +
           `  Weight: ${f_result.weight}\n` +
           `  Mix Stream: ${f_result.mix_stream_id}\n` +
           `  Entities: ${f_result.entities_affected}`;
  }
}

// The mix command is complete... chaos layers upon chaos.
// Streams blend in weighted harmony, creating new patterns.
// Like a DJ for quantum streams!

export { q_mix_command };