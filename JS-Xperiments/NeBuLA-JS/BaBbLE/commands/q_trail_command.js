// q_trail_command - The Ghost of Movement Past
// Entities leave trails of ghost copies at previous positions.
// Motion blur without shaders - pure Flat-Chaos!

import { q_command } from '../RaBbLE_BaBbLE_Pipeline.js';
import { RaBbLE_StreamTrail } from '../../NeBuLA/core/q_stream_trail.js';

/**
 * q_trail_command - Stream Trail Command
 * Applies trail effect to create motion blur
 * 
 * Syntax: trail [length] [fade_rate]
 * Example: trail 5 0.8
 * 
 * Parameters:
 * - length: Number of ghost copies to maintain (default: 5)
 * - fade_rate: How quickly ghosts fade, 0.0-1.0 (default: 0.8)
 * 
 * @property {Object} q_engine - The NeBuLA engine reference
 */
class q_trail_command extends q_command {
  constructor(f_engine) {
    super({
      name: 'trail',
      description: 'Apply trail effect for motion blur',
      aliases: ['t', 'blur', 'ghost']
    });
    
    // The trail weaver awakens... ghosts form in the quantum wake.
    this.q_engine = f_engine;
    this.q_trail_system = null;
  }

  /**
   * Source stage - parse trail parameters
   * @param {Array<string>} f_args - Command arguments
   * @returns {Object} Parsed parameters
   */
  q_source(f_args) {
    // Parse: trail [length] [fade_rate]
    const q_length = parseInt(f_args[0]) || 5;
    const q_fade = parseFloat(f_args[1]) || 0.8;
    
    return { 
      length: q_length, 
      fade: q_fade 
    };
  }

  /**
   * Filter stage - validate parameters
   * @param {Object} f_params - Parsed parameters
   * @returns {Object} Validated parameters
   */
  q_filter(f_params) {
    // Validate length
    if (f_params.length < 1 || f_params.length > 20) {
      return { error: 'Trail length must be between 1 and 20' };
    }
    
    // Validate fade rate
    if (f_params.fade < 0 || f_params.fade > 1) {
      return { error: 'Fade rate must be between 0 and 1' };
    }
    
    return f_params;
  }

  /**
   * Transmute stage - apply trail to all streams
   * @param {Object} f_params - Validated parameters
   * @returns {Object} Trail result
   */
  q_transmute(f_params) {
    if (f_params.error) return f_params;
    
    // Create trail system
    this.q_trail_system = new RaBbLE_StreamTrail({
      length: f_params.length,
      fade: f_params.fade
    });
    
    // Apply trail to all streams in the engine
    let q_total_entities = 0;
    if (this.q_engine && this.q_engine.runtime) {
      this.q_engine.runtime.q_registry.forEach(q_stream => {
        this.q_trail_system.q_applyTrail(q_stream);
        q_total_entities += q_stream.q_length;
      });
    }
    
    return {
      success: true,
      length: f_params.length,
      fade: f_params.fade,
      entities_affected: q_total_entities,
      message: `Trail effect applied: ${f_params.length} ghosts fading at ${f_params.fade}`
    };
  }

  /**
   * Sink stage - format output
   * @param {Object} f_result - Trail result
   * @returns {string} Formatted output
   */
  q_sink(f_result) {
    if (f_result.error) {
      return `ERROR: ${f_result.error}`;
    }
    
    // The trail emerges... ghosts linger in the quantum wake.
    return `[TRAIL] ${f_result.message}\n` +
           `  Length: ${f_result.length} ghosts\n` +
           `  Fade: ${f_result.fade}\n` +
           `  Entities: ${f_result.entities_affected}`;
  }
}

// The trail command is complete... motion blur from pure Flat-Chaos.
// No shaders needed - just position history and fading opacity.
// The foundation of Lakes - render targets that remember.

export { q_trail_command };