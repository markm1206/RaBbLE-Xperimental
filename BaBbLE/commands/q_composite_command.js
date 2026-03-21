// q_composite_command - The Layered Compositor
// Blend two lakes together with weighted averaging.
// Layered composition creates depth and complexity.

import { q_command } from '../RaBbLE_BaBbLE_Pipeline.js';
import { RaBbLE_StreamLake } from '../../NeBuLA/core/q_stream_lake.js';
import { q_stream } from '../../NeBuLA/core/q_stream.js';
import { q_entity } from '../../NeBuLA/core/q_entity.js';

/**
 * q_composite_command - Lake Compositing Command
 * Blends two named lakes together with configurable weights
 * 
 * Syntax: composite [lake1] [weight1] [lake2] [weight2]
 * Example: composite layer1 0.7 layer2 0.3
 * 
 * Parameters:
 * - lake1: Name of first lake
 * - weight1: Weight for first lake (0.0-1.0)
 * - lake2: Name of second lake
 * - weight2: Weight for second lake (0.0-1.0)
 * 
 * @property {Object} q_engine - The NeBuLA engine reference
 * @property {RaBbLE_StreamLake} q_lake_system - The shared lake system
 */
class q_composite_command extends q_command {
  constructor(f_engine, f_lake_system) {
    super({
      name: 'composite',
      description: 'Blend two lakes together with weighted averaging',
      aliases: ['comp', 'layer', 'blend-layers']
    });
    
    // The compositor awakens... lakes prepare to blend.
    this.q_engine = f_engine;
    this.q_lake_system = f_lake_system;
  }

  /**
   * Source stage - parse composite parameters
   * @param {Array<string>} f_args - Command arguments
   * @returns {Object} Parsed parameters
   */
  q_source(f_args) {
    // Parse: composite [lake1] [weight1] [lake2] [weight2]
    const q_lake1 = f_args[0] || '';
    const q_weight1 = parseFloat(f_args[1]) || 0.5;
    const q_lake2 = f_args[2] || '';
    const q_weight2 = parseFloat(f_args[3]) || 0.5;
    
    return { 
      lake1: q_lake1,
      weight1: q_weight1,
      lake2: q_lake2,
      weight2: q_weight2
    };
  }

  /**
   * Filter stage - validate parameters
   * @param {Object} f_params - Parsed parameters
   * @returns {Object} Validated parameters
   */
  q_filter(f_params) {
    // Validate lake1
    if (!f_params.lake1 || f_params.lake1.trim() === '') {
      return { error: 'Composite requires first lake name: composite [lake1] [weight1] [lake2] [weight2]' };
    }
    
    // Validate lake2
    if (!f_params.lake2 || f_params.lake2.trim() === '') {
      return { error: 'Composite requires second lake name: composite [lake1] [weight1] [lake2] [weight2]' };
    }
    
    // Validate weights
    if (f_params.weight1 < 0 || f_params.weight1 > 1) {
      return { error: 'Weight1 must be between 0 and 1' };
    }
    
    if (f_params.weight2 < 0 || f_params.weight2 > 1) {
      return { error: 'Weight2 must be between 0 and 1' };
    }
    
    // Check if lakes exist
    if (!this.q_lake_system.q_hasLake(f_params.lake1)) {
      return { error: `Lake "${f_params.lake1}" not found` };
    }
    
    if (!this.q_lake_system.q_hasLake(f_params.lake2)) {
      return { error: `Lake "${f_params.lake2}" not found` };
    }
    
    return f_params;
  }

  /**
   * Transmute stage - composite lakes together
   * @param {Object} f_params - Validated parameters
   * @returns {Object} Composite result
   */
  q_transmute(f_params) {
    if (f_params.error) return f_params;
    
    // Read entities from both lakes
    const q_entities1 = this.q_lake_system.q_read(f_params.lake1);
    const q_entities2 = this.q_lake_system.q_read(f_params.lake2);
    
    // Create blended entities
    const q_blended_entities = this.q_blendEntities(
      q_entities1, 
      q_entities2, 
      f_params.weight1, 
      f_params.weight2
    );
    
    // Create a new stream from blended entities
    const q_stream = new q_stream(
      `composite_${f_params.lake1}_${f_params.lake2}`,
      q_blended_entities
    );
    
    // Register with engine
    if (this.q_engine && this.q_engine.runtime) {
      this.q_engine.runtime.q_transmuteStream(q_stream);
    }
    
    return {
      success: true,
      lake1: f_params.lake1,
      weight1: f_params.weight1,
      lake2: f_params.lake2,
      weight2: f_params.weight2,
      entities_blended: q_blended_entities.length,
      stream_id: q_stream.q_stream_id,
      message: `Composited ${f_params.lake1} (${f_params.weight1}) with ${f_params.lake2} (${f_params.weight2})`
    };
  }

  /**
   * Sink stage - format output
   * @param {Object} f_result - Composite result
   * @returns {string} Formatted output
   */
  q_sink(f_result) {
    if (f_result.error) {
      return `ERROR: ${f_result.error}`;
    }
    
    // The composite emerges... layers blend in weighted harmony.
    return `[COMPOSITE] ${f_result.message}\n` +
           `  Layer 1: ${f_result.lake1} (weight: ${f_result.weight1})\n` +
           `  Layer 2: ${f_result.lake2} (weight: ${f_result.weight2})\n` +
           `  Entities: ${f_result.entities_blended}\n` +
           `  Stream: ${f_result.stream_id}`;
  }

  /**
   * Blend entities from two lakes
   * The layers merge... weighted chaos flows as one.
   * @param {Array} f_entities1 - Entities from first lake
   * @param {Array} f_entities2 - Entities from second lake
   * @param {number} f_weight1 - Weight for first lake
   * @param {number} f_weight2 - Weight for second lake
   * @returns {Array<q_entity>} Blended entities
   */
  q_blendEntities(f_entities1, f_entities2, f_weight1, f_weight2) {
    const q_total_weight = f_weight1 + f_weight2;
    const q_max_length = Math.max(f_entities1.length, f_entities2.length);
    const q_blended = [];
    
    for (let q_index = 0; q_index < q_max_length; q_index++) {
      const q_snap1 = f_entities1[q_index % f_entities1.length];
      const q_snap2 = f_entities2[q_index % f_entities2.length];
      
      // Create new entity
      const q_entity1 = q_snap1 ? this.q_createEntityFromSnapshot(q_snap1) : null;
      const q_entity2 = q_snap2 ? this.q_createEntityFromSnapshot(q_snap2) : null;
      
      if (q_entity1 && q_entity2) {
        // Blend both entities
        const q_blended_entity = this.q_blendTwoEntities(q_entity1, q_entity2, f_weight1, f_weight2, q_total_weight);
        q_blended.push(q_blended_entity);
      } else if (q_entity1) {
        // Only entity1 exists, scale by weight
        q_entity1.e_entropy_sig *= f_weight1 / q_total_weight;
        q_blended.push(q_entity1);
      } else if (q_entity2) {
        // Only entity2 exists, scale by weight
        q_entity2.e_entropy_sig *= f_weight2 / q_total_weight;
        q_blended.push(q_entity2);
      }
    }
    
    return q_blended;
  }

  /**
   * Blend two entities together
   * @private
   */
  q_blendTwoEntities(f_entity1, f_entity2, f_weight1, f_weight2, f_total_weight) {
    // Blend positions
    f_entity1.flux_matrix[12] = (f_entity1.flux_matrix[12] * f_weight1 + f_entity2.flux_matrix[12] * f_weight2) / f_total_weight;
    f_entity1.flux_matrix[13] = (f_entity1.flux_matrix[13] * f_weight1 + f_entity2.flux_matrix[13] * f_weight2) / f_total_weight;
    f_entity1.flux_matrix[14] = (f_entity1.flux_matrix[14] * f_weight1 + f_entity2.flux_matrix[14] * f_weight2) / f_total_weight;
    
    // Blend entropy
    f_entity1.e_entropy_sig = (f_entity1.e_entropy_sig * f_weight1 + f_entity2.e_entropy_sig * f_weight2) / f_total_weight;
    
    // Blend size
    f_entity1.q_render_size = (f_entity1.q_render_size * f_weight1 + f_entity2.q_render_size * f_weight2) / f_total_weight;
    
    // Blend opacity
    f_entity1.q_render_opacity = (f_entity1.q_render_opacity * f_weight1 + f_entity2.q_render_opacity * f_weight2) / f_total_weight;
    
    return f_entity1;
  }

  /**
   * Create entity from lake snapshot
   * @private
   */
  q_createEntityFromSnapshot(f_snapshot) {
    const q_new_entity = new q_entity(f_snapshot.dna_type);
    
    // Restore state from snapshot
    q_new_entity.flux_matrix = [...f_snapshot.flux_matrix];
    q_new_entity.e_entropy_sig = f_snapshot.e_entropy_sig;
    q_new_entity.q_render_color = f_snapshot.q_render_color;
    q_new_entity.q_render_size = f_snapshot.q_render_size;
    q_new_entity.q_render_opacity = f_snapshot.q_render_opacity;
    
    return q_new_entity;
  }
}

// The composite command is complete... layers blend in weighted harmony.
// Multiple streams become one through the magic of compositing.
// Depth emerges from the fusion of parallel realities.

export { q_composite_command };