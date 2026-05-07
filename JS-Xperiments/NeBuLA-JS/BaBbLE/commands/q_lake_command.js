// q_lake_command - The Quantum Reservoir
// Capture stream state into named lakes for feedback loops.
// Streams flow in, the lake remembers.

import { q_command } from '../RaBbLE_BaBbLE_Pipeline.js';
import { RaBbLE_StreamLake } from '../../NeBuLA/core/q_stream_lake.js';

/**
 * q_lake_command - Lake Capture Command
 * Captures current stream state into a named lake
 * 
 * Syntax: lake [name]
 * Example: dream organic 50 SPHERE >> lake myLake
 * 
 * Parameters:
 * - name: Name of the lake to capture into
 * 
 * @property {Object} q_engine - The NeBuLA engine reference
 * @property {RaBbLE_StreamLake} q_lake_system - The shared lake system
 */
class q_lake_command extends q_command {
  constructor(f_engine, f_lake_system) {
    super({
      name: 'lake',
      description: 'Capture stream state into a named lake',
      aliases: ['l', 'capture', 'save']
    });
    
    // The lake weaver awakens... reservoirs prepare to receive.
    this.q_engine = f_engine;
    this.q_lake_system = f_lake_system;
  }

  /**
   * Source stage - parse lake name
   * @param {Array<string>} f_args - Command arguments
   * @returns {Object} Parsed parameters
   */
  q_source(f_args) {
    // Parse: lake [name]
    const q_name = f_args[0] || 'default';
    
    return { name: q_name };
  }

  /**
   * Filter stage - validate parameters
   * @param {Object} f_params - Parsed parameters
   * @returns {Object} Validated parameters
   */
  q_filter(f_params) {
    // Validate name
    if (!f_params.name || f_params.name.trim() === '') {
      return { error: 'Lake requires a name: lake [name]' };
    }
    
    return f_params;
  }

  /**
   * Transmute stage - capture streams to lake
   * @param {Object} f_params - Validated parameters
   * @returns {Object} Capture result
   */
  q_transmute(f_params) {
    if (f_params.error) return f_params;
    
    // Capture all streams in the engine to the named lake
    let q_total_entities = 0;
    let q_streams_captured = 0;
    
    if (this.q_engine && this.q_engine.runtime) {
      this.q_engine.runtime.q_registry.forEach(q_stream => {
        this.q_lake_system.q_capture(f_params.name, q_stream);
        q_total_entities += q_stream.q_length;
        q_streams_captured++;
      });
    }
    
    return {
      success: true,
      name: f_params.name,
      entities_captured: q_total_entities,
      streams_captured: q_streams_captured,
      message: `Captured ${q_streams_captured} streams (${q_total_entities} entities) to lake "${f_params.name}"`
    };
  }

  /**
   * Sink stage - format output
   * @param {Object} f_result - Capture result
   * @returns {string} Formatted output
   */
  q_sink(f_result) {
    if (f_result.error) {
      return `ERROR: ${f_result.error}`;
    }
    
    // The lake fills... memories are preserved.
    return `[LAKE] ${f_result.message}\n` +
           `  Lake: ${f_result.name}\n` +
           `  Entities: ${f_result.entities_captured}\n` +
           `  Streams: ${f_result.streams_captured}`;
  }
}

// The lake command is complete... streams flow into reservoirs.
// The quantum void now has memory, preserved in named lakes.

export { q_lake_command };