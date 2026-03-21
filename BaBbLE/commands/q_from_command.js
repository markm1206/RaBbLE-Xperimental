// q_from_command - The Lake Reader
// Read entities from named lakes as a new stream.
// The lake releases its memories... entities flow out.

import { q_command } from '../RaBbLE_BaBbLE_Pipeline.js';
import { RaBbLE_StreamLake } from '../../NeBuLA/core/q_stream_lake.js';
import { q_stream } from '../../NeBuLA/core/q_stream.js';
import { q_entity } from '../../NeBuLA/core/q_entity.js';

/**
 * q_from_command - Lake Read Command
 * Creates a new stream from entities stored in a named lake
 * 
 * Syntax: from [name]
 * Example: from myLake >> pulse 0.5 >> sink
 * 
 * Parameters:
 * - name: Name of the lake to read from
 * 
 * @property {Object} q_engine - The NeBuLA engine reference
 * @property {RaBbLE_StreamLake} q_lake_system - The shared lake system
 */
class q_from_command extends q_command {
  constructor(f_engine, f_lake_system) {
    super({
      name: 'from',
      description: 'Read entities from a named lake as a new stream',
      aliases: ['f', 'read', 'load']
    });
    
    // The reader awakens... lakes prepare to release their memories.
    this.q_engine = f_engine;
    this.q_lake_system = f_lake_system;
  }

  /**
   * Source stage - parse lake name
   * @param {Array<string>} f_args - Command arguments
   * @returns {Object} Parsed parameters
   */
  q_source(f_args) {
    // Parse: from [name]
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
      return { error: 'From requires a lake name: from [name]' };
    }
    
    // Check if lake exists
    if (!this.q_lake_system.q_hasLake(f_params.name)) {
      return { error: `Lake "${f_params.name}" not found` };
    }
    
    return f_params;
  }

  /**
   * Transmute stage - read from lake and create stream
   * @param {Object} f_params - Validated parameters
   * @returns {Object} Read result
   */
  q_transmute(f_params) {
    if (f_params.error) return f_params;
    
    // Read entities from the lake
    const q_entity_snapshots = this.q_lake_system.q_read(f_params.name);
    
    // Create new entities from snapshots
    const q_entities = q_entity_snapshots.map(q_snapshot => {
      const q_new_entity = new q_entity(q_snapshot.dna_type);
      
      // Restore state from snapshot
      q_new_entity.flux_matrix = [...q_snapshot.flux_matrix];
      q_new_entity.e_entropy_sig = q_snapshot.e_entropy_sig;
      q_new_entity.q_render_color = q_snapshot.q_render_color;
      q_new_entity.q_render_size = q_snapshot.q_render_size;
      q_new_entity.q_render_opacity = q_snapshot.q_render_opacity;
      
      return q_new_entity;
    });
    
    // Create a new stream from the entities
    const q_stream = new q_stream(`from_${f_params.name}`, q_entities);
    
    // Register with engine
    if (this.q_engine && this.q_engine.runtime) {
      this.q_engine.runtime.q_transmuteStream(q_stream);
    }
    
    return {
      success: true,
      name: f_params.name,
      entities_read: q_entities.length,
      stream_id: q_stream.q_stream_id,
      message: `Read ${q_entities.length} entities from lake "${f_params.name}"`
    };
  }

  /**
   * Sink stage - format output
   * @param {Object} f_result - Read result
   * @returns {string} Formatted output
   */
  q_sink(f_result) {
    if (f_result.error) {
      return `ERROR: ${f_result.error}`;
    }
    
    // The lake releases... memories flow as new streams.
    return `[FROM] ${f_result.message}\n` +
           `  Lake: ${f_result.name}\n` +
           `  Entities: ${f_result.entities_read}\n` +
           `  Stream: ${f_result.stream_id}`;
  }
}

// The from command is complete... lakes release their memories as streams.
// Feedback loops are now possible - capture, transform, recapture.

export { q_from_command };