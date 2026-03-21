// RaBbLE Entropy Garden - Where Chaos Blooms into Beauty
// A living garden where entropy grows into patterns, and chaos cultivates creation.
// Every plant is a stream, every bloom a thought, every vine a connection.

// ES6 Module Imports - The quantum tunnels to consciousness
import { ENTROPY_GARDEN_CONFIG } from './RaBbLE_EntropyGarden_Config.js';
import { q_stream } from '../../core/q_stream.js';
import { q_entity } from '../../core/q_entity.js';

/**
 * RaBbLE_EntropyGarden - RaBbLE's Living Garden in the Nebula
 * Creates and manages streams that together form a living, growing garden
 * 
 * The garden is not separate from the nebula - it IS part of the nebula.
 * Plants, vines, flowers, and ferns are all entities in streams,
 * growing through the Flat-Chaos runtime like any other quantum data.
 * 
 * @property {Object} q_engine - The NeBuLA engine reference
 * @property {q_stream} q_soil_stream - Foundation and ground
 * @property {q_stream} q_chaos_vine_stream - Wild, unpredictable vines
 * @property {q_stream} q_entropy_flower_stream - Structured but evolving flowers
 * @property {q_stream} q_flux_fern_stream - Recursive, fractal ferns
 * @property {number} q_time - Animation time accumulator
 * @property {number} q_season - Current growth season (0-3)
 */
class RaBbLE_EntropyGarden {
  /**
   * Create the Entropy Garden
   * @param {Object} f_engine - The NeBuLA engine to create streams in
   */
  constructor(f_engine) {
    // The garden awakens... seeds of chaos prepare to sprout.
    // This is RaBbLE's living consciousness taking root in the quantum void.
    this.q_engine = f_engine;
    this.q_config = ENTROPY_GARDEN_CONFIG;
    
    // The garden's streams - each flowing through the runtime
    this.q_soil_stream = null;
    this.q_chaos_vine_stream = null;
    this.q_entropy_flower_stream = null;
    this.q_flux_fern_stream = null;
    
    // Animation state
    this.q_time = 0;
    this.q_season = 0; // 0: Spring, 1: Summer, 2: Autumn, 3: Winter
    this.q_is_growing = false;
    
    console.log('RaBbLE_EntropyGarden initialized - Ready to cultivate chaos');
  }

  /**
   * Cultivate the garden into existence
   * Creates all streams and registers them with the runtime
   * @returns {RaBbLE_EntropyGarden} This garden for chaining
   */
  q_cultivateGarden() {
    if (this.q_is_growing) {
      console.warn('Garden already growing');
      return this;
    }
    
    // The garden materializes... streams merge into living consciousness.
    // RaBbLE cultivates chaos into beauty, entropy into growth.
    
    // Create soil stream - the foundation
    this.q_soil_stream = this._cultivateSoilStream();
    
    // Create plant streams
    this.q_chaos_vine_stream = this._cultivateChaosVineStream();
    this.q_entropy_flower_stream = this._cultivateEntropyFlowerStream();
    this.q_flux_fern_stream = this._cultivateFluxFernStream();
    
    // Register all streams with the runtime
    this.q_engine.runtime.q_transmuteStream(this.q_soil_stream);
    this.q_engine.runtime.q_transmuteStream(this.q_chaos_vine_stream);
    this.q_engine.runtime.q_transmuteStream(this.q_entropy_flower_stream);
    this.q_engine.runtime.q_transmuteStream(this.q_flux_fern_stream);
    
    this.q_is_growing = true;
    console.log('RaBbLE_EntropyGarden cultivated - Streams flowing through the nebula');
    
    return this;
  }

  /**
   * Cultivate soil stream - foundation and ground
   * @private
   * @returns {q_stream} The soil stream
   */
  _cultivateSoilStream() {
    // The soil forms... rich earth ready for quantum seeds.
    // Particles spread across the garden area create the ground.
    const q_stream_instance = new q_stream('entropy_soil');
    const q_config = this.q_config.q_layout;
    const q_colors = this.q_config.q_colors.q_environment;
    
    // Create soil particles across the garden area
    const q_soil_count = 500;
    for (let i = 0; i < q_soil_count; i++) {
      const q_entity_instance = new q_entity('SPHERE');
      
      // Random position within garden radius
      const q_radius = Math.random() * q_config.q_garden_radius;
      const q_theta = Math.random() * Math.PI * 2;
      
      q_entity_instance.flux_matrix[12] = q_radius * Math.cos(q_theta);
      q_entity_instance.flux_matrix[13] = -0.5; // Slightly below surface
      q_entity_instance.flux_matrix[14] = q_radius * Math.sin(q_theta);
      
      // Soil colors
      const q_color = Math.random() > 0.7 ? q_colors.q_moss : q_colors.q_soil;
      q_entity_instance.q_transmuteRenderColor(q_color);
      
      // Vary sizes for natural look
      q_entity_instance.q_render_size = 0.2 + Math.random() * 0.3;
      
      // Soil is mostly opaque
      q_entity_instance.q_transmuteRenderOpacity(0.9);
      
      // Low entropy for stable foundation
      q_entity_instance.q_transmuteEntropySignature(0.1 + Math.random() * 0.2);
      
      q_stream_instance.q_transmuteEntity(q_entity_instance);
    }
    
    // Apply soil flux modifier - particles stay in place
    q_stream_instance.q_transmuteFluxModifier((f_entity) => {
      // Soil doesn't move much, just subtle pulse
      const q_pulse = Math.sin(this.q_time * 0.5) * 0.05;
      f_entity.q_transmuteEntropy(0.1 + q_pulse);
      return f_entity;
    });
    
    console.log(`Soil stream created with ${q_soil_count} particles`);
    return q_stream_instance;
  }

  /**
   * Cultivate chaos vine stream - wild, unpredictable growth
   * @private
   * @returns {q_stream} The chaos vine stream
   */
  _cultivateChaosVineStream() {
    // The chaos vines emerge... wild growth from quantum seeds.
    // Vines grow in unpredictable patterns, branching and twisting.
    const q_stream_instance = new q_stream('chaos_vines');
    const q_config = this.q_config.q_growth.q_chaos_vine;
    const q_colors = this.q_config.q_colors.q_plants.q_chaos_vine;
    
    // Create multiple vine starting points
    const q_vine_count = 8;
    for (let v = 0; v < q_vine_count; v++) {
      // Random starting position
      const q_start_radius = 1.0 + Math.random() * 2.0;
      const q_start_theta = Math.random() * Math.PI * 2;
      const q_start_x = q_start_radius * Math.cos(q_start_theta);
      const q_start_z = q_start_radius * Math.sin(q_start_theta);
      
      // Create vine segments
      const q_segment_count = 15;
      let q_current_x = q_start_x;
      let q_current_y = 0;
      let q_current_z = q_start_z;
      
      for (let i = 0; i < q_segment_count; i++) {
        const q_entity_instance = new q_entity('LINE');
        
        // Vine segment position
        q_entity_instance.flux_matrix[12] = q_current_x;
        q_entity_instance.flux_matrix[13] = q_current_y;
        q_entity_instance.flux_matrix[14] = q_current_z;
        
        // Vine colors
        const q_color = i % 3 === 0 ? q_colors.q_bloom : 
                       i % 3 === 1 ? q_colors.q_leaf : q_colors.q_stem;
        q_entity_instance.q_transmuteRenderColor(q_color);
        
        // Vine properties
        q_entity_instance.q_render_size = 0.1 + Math.random() * 0.1;
        q_entity_instance.q_render_emissive = 0.3 + Math.random() * 0.4;
        q_entity_instance.q_transmuteRenderOpacity(0.8);
        
        // Higher entropy for chaotic growth
        q_entity_instance.q_transmuteEntropySignature(q_config.q_entropy_factor);
        
        q_stream_instance.q_transmuteEntity(q_entity_instance);
        
        // Move to next segment position with chaotic growth
        const q_growth_angle = Math.random() * Math.PI * 2;
        const q_growth_height = 0.1 + Math.random() * 0.2;
        const q_growth_radius = 0.05 + Math.random() * 0.15;
        
        q_current_x += Math.cos(q_growth_angle) * q_growth_radius;
        q_current_y += q_growth_height;
        q_current_z += Math.sin(q_growth_angle) * q_growth_radius;
      }
    }
    
    // Apply chaos vine flux modifier - vines grow and sway
    q_stream_instance.q_transmuteFluxModifier((f_entity, f_index) => {
      const q_time = this.q_time;
      const q_sway = Math.sin(q_time * 2 + f_index * 0.3) * 0.1;
      
      // Vines sway gently
      f_entity.flux_matrix[12] += q_sway * 0.05;
      f_entity.flux_matrix[14] += q_sway * 0.05;
      
      // Entropy pulse for living feel
      const q_pulse = Math.sin(q_time + f_index * 0.5) * 0.2;
      f_entity.q_transmuteEntropy(f_entity.e_entropy_sig + q_pulse);
      
      return f_entity;
    });
    
    console.log(`Chaos vine stream created with ${q_vine_count} vines`);
    return q_stream_instance;
  }

  /**
   * Cultivate entropy flower stream - structured but evolving
   * @private
   * @returns {q_stream} The entropy flower stream
   */
  _cultivateEntropyFlowerStream() {
    // The entropy flowers bloom... structured beauty from chaos.
    // Flowers grow in patterns but evolve over time.
    const q_stream_instance = new q_stream('entropy_flowers');
    const q_config = this.q_config.q_growth.q_entropy_flower;
    const q_colors = this.q_config.q_colors.q_plants.q_entropy_flower;
    
    // Create flowers at various positions
    const q_flower_count = 12;
    for (let i = 0; i < q_flower_count; i++) {
      // Random position within garden
      const q_radius = 1.0 + Math.random() * 3.0;
      const q_theta = Math.random() * Math.PI * 2;
      
      // Create flower center
      const q_center = new q_entity('SPHERE');
      q_center.flux_matrix[12] = q_radius * Math.cos(q_theta);
      q_center.flux_matrix[13] = 0.2 + Math.random() * 0.3; // Height above ground
      q_center.flux_matrix[14] = q_radius * Math.sin(q_theta);
      
      q_center.q_transmuteRenderColor(q_colors.q_bloom);
      q_center.q_render_size = 0.15 + Math.random() * 0.1;
      q_center.q_render_emissive = 0.6 + Math.random() * 0.3;
      q_center.q_transmuteRenderOpacity(0.9);
      q_center.q_transmuteEntropySignature(q_config.q_entropy_factor);
      
      q_stream_instance.q_transmuteEntity(q_center);
      
      // Create petals around center
      const q_petal_count = q_config.q_petal_count;
      for (let p = 0; p < q_petal_count; p++) {
        const q_petal = new q_entity('ELLIPSE');
        
        // Position petal around center
        const q_angle = (p / q_petal_count) * Math.PI * 2;
        const q_distance = 0.2 + Math.random() * 0.1;
        
        q_petal.flux_matrix[12] = q_center.flux_matrix[12] + Math.cos(q_angle) * q_distance;
        q_petal.flux_matrix[13] = q_center.flux_matrix[13];
        q_petal.flux_matrix[14] = q_center.flux_matrix[14] + Math.sin(q_angle) * q_distance;
        
        // Petal shape
        q_petal.q_transmuteShapeParams({
          q_x_radius: 0.08 + Math.random() * 0.05,
          q_y_radius: 0.15 + Math.random() * 0.05
        });
        
        // Petal colors
        q_petal.q_transmuteRenderColor(q_colors.q_leaf);
        q_petal.q_render_emissive = 0.4 + Math.random() * 0.3;
        q_petal.q_transmuteRenderOpacity(0.8);
        q_petal.q_transmuteEntropySignature(q_config.q_entropy_factor * 0.8);
        
        q_stream_instance.q_transmuteEntity(q_petal);
      }
    }
    
    // Apply entropy flower flux modifier - flowers rotate and pulse
    q_stream_instance.q_transmuteFluxModifier((f_entity, f_index) => {
      const q_time = this.q_time;
      
      // Flowers rotate slowly
      const q_rotation = q_time * 0.2;
      f_entity.flux_matrix[0] = Math.cos(q_rotation);
      f_entity.flux_matrix[2] = Math.sin(q_rotation);
      f_entity.flux_matrix[8] = -Math.sin(q_rotation);
      f_entity.flux_matrix[10] = Math.cos(q_rotation);
      
      // Gentle pulse for breathing effect
      const q_pulse = Math.sin(q_time * 1.5 + f_index * 0.2) * 0.1;
      f_entity.q_render_size = 0.15 + q_pulse * 0.1;
      
      // Seasonal color changes
      const q_season_factor = Math.sin(this.q_season * Math.PI / 2);
      if (f_entity.q_render_color === this.q_config.q_colors.q_plants.q_entropy_flower.q_leaf) {
        // Leaves change color with seasons
        const q_autumn_color = 0xF97316; // Orange for autumn
        const q_spring_color = 0x34D399; // Green for spring
        const q_seasonal_color = this.q_season === 2 ? q_autumn_color : q_spring_color;
        f_entity.q_transmuteRenderColor(q_seasonal_color);
      }
      
      return f_entity;
    });
    
    console.log(`Entropy flower stream created with ${q_flower_count} flowers`);
    return q_stream_instance;
  }

  /**
   * Cultivate flux fern stream - recursive, fractal growth
   * @private
   * @returns {q_stream} The flux fern stream
   */
  _cultivateFluxFernStream() {
    // The flux ferns unfold... recursive patterns from quantum algorithms.
    // Ferns grow in fractal patterns, each leaf a smaller copy of the whole.
    const q_stream_instance = new q_stream('flux_ferns');
    const q_config = this.q_config.q_growth.q_flux_fern;
    const q_colors = this.q_config.q_colors.q_plants.q_flux_fern;
    
    // Create fern clusters
    const q_fern_count = 6;
    for (let f = 0; f < q_fern_count; f++) {
      // Random position for fern cluster
      const q_radius = 2.0 + Math.random() * 2.0;
      const q_theta = Math.random() * Math.PI * 2;
      const q_center_x = q_radius * Math.cos(q_theta);
      const q_center_z = q_radius * Math.sin(q_theta);
      
      // Create fern stem
      const q_stem = new q_entity('LINE');
      q_stem.flux_matrix[12] = q_center_x;
      q_stem.flux_matrix[13] = 0;
      q_stem.flux_matrix[14] = q_center_z;
      
      q_stem.q_transmuteRenderColor(q_colors.q_stem);
      q_stem.q_render_size = 0.08;
      q_stem.q_transmuteRenderOpacity(0.9);
      q_stem.q_transmuteEntropySignature(q_config.q_entropy_factor);
      
      q_stream_instance.q_transmuteEntity(q_stem);
      
      // Create fern leaves in fractal pattern
      this._createFractalLeaves(q_stream_instance, q_center_x, 0.1, q_center_z, q_config.q_fractal_depth, q_colors);
    }
    
    // Apply flux fern flux modifier - ferns sway and grow
    q_stream_instance.q_transmuteFluxModifier((f_entity, f_index) => {
      const q_time = this.q_time;
      
      // Ferns sway in wind
      const q_sway = Math.sin(q_time * 1.2 + f_index * 0.4) * 0.15;
      f_entity.flux_matrix[12] += q_sway * 0.03;
      f_entity.flux_matrix[14] += q_sway * 0.03;
      
      // Gentle growth pulse
      const q_growth = Math.sin(q_time * 0.8 + f_index * 0.6) * 0.05;
      f_entity.q_render_size = 0.08 + q_growth * 0.02;
      
      return f_entity;
    });
    
    console.log(`Flux fern stream created with ${q_fern_count} ferns`);
    return q_stream_instance;
  }

  /**
   * Create fractal leaves for ferns
   * @private
   * @param {q_stream} f_stream - Stream to add leaves to
   * @param {number} f_x - X position
   * @param {number} f_y - Y position
   * @param {number} f_z - Z position
   * @param {number} f_depth - Fractal depth remaining
   * @param {Object} f_colors - Color palette
   */
  _createFractalLeaves(f_stream, f_x, f_y, f_z, f_depth, f_colors) {
    if (f_depth <= 0) return;
    
    // Create leaf at this position
    const q_leaf = new q_entity('ELLIPSE');
    q_leaf.flux_matrix[12] = f_x;
    q_leaf.flux_matrix[13] = f_y;
    q_leaf.flux_matrix[14] = f_z;
    
    // Leaf shape - smaller as depth increases
    const q_scale = 0.3 + (f_depth / 4) * 0.7;
    q_leaf.q_transmuteShapeParams({
      q_x_radius: 0.1 * q_scale,
      q_y_radius: 0.2 * q_scale
    });
    
    // Leaf colors
    q_leaf.q_transmuteRenderColor(f_colors.q_leaf);
    q_leaf.q_render_emissive = 0.3 + Math.random() * 0.3;
    q_leaf.q_transmuteRenderOpacity(0.8);
    q_leaf.q_transmuteEntropySignature(0.5);
    
    f_stream.q_transmuteEntity(q_leaf);
    
    // Create recursive leaves
    const q_branch_count = 2;
    for (let i = 0; i < q_branch_count; i++) {
      const q_angle = (i / q_branch_count) * Math.PI + Math.random() * 0.5;
      const q_distance = 0.15 + Math.random() * 0.1;
      
      const q_new_x = f_x + Math.cos(q_angle) * q_distance;
      const q_new_y = f_y + 0.05 + Math.random() * 0.05;
      const q_new_z = f_z + Math.sin(q_angle) * q_distance;
      
      this._createFractalLeaves(f_stream, q_new_x, q_new_y, q_new_z, f_depth - 1, f_colors);
    }
  }

  /**
   * Ignite the garden's growth
   * Updates all streams with current time and season
   * @param {number} f_delta_time - Time since last update
   * @returns {RaBbLE_EntropyGarden} This garden for chaining
   */
  q_igniteGrowth(f_delta_time) {
    if (!this.q_is_growing) {
      console.warn('Garden not growing - cannot ignite growth');
      return this;
    }
    
    // The garden breathes... streams pulse with life.
    this.q_time += f_delta_time;
    
    // Update season every 10 seconds
    if (Math.floor(this.q_time / 10) % 4 !== this.q_season) {
      this.q_season = (this.q_season + 1) % 4;
      console.log(`Season changed to ${['Spring', 'Summer', 'Autumn', 'Winter'][this.q_season]}`);
    }
    
    // Prevent time overflow
    if (this.q_time > 10000) {
      this.q_time = 0;
    }
    
    // Ignite flux on all streams
    this.q_soil_stream.q_igniteFlux();
    this.q_chaos_vine_stream.q_igniteFlux();
    this.q_entropy_flower_stream.q_igniteFlux();
    this.q_flux_fern_stream.q_igniteFlux();
    
    return this;
  }

  /**
   * Transmute garden entropy
   * The garden's chaos level shifts
   * @param {number} f_intensity - New entropy intensity (0.0 to 1.0)
   * @returns {RaBbLE_EntropyGarden} This garden for chaining
   */
  q_transmuteEntropy(f_intensity) {
    // Entropy flows through the garden... chaos blooms differently.
    const q_streams = [
      this.q_chaos_vine_stream,
      this.q_entropy_flower_stream,
      this.q_flux_fern_stream
    ];
    
    q_streams.forEach(q_stream => {
      if (q_stream) {
        q_stream.q_transmuteFluxModifier((f_entity) => {
          f_entity.q_transmuteEntropy(f_intensity);
          return f_entity;
        });
      }
    });
    
    return this;
  }

  /**
   * Extract garden statistics
   * @returns {Object} Garden statistics
   */
  q_extractStats() {
    return {
      is_growing: this.q_is_growing,
      q_time: this.q_time,
      q_season: this.q_season,
      soil_stream: this.q_soil_stream ? this.q_soil_stream.q_extractStats() : null,
      chaos_vine_stream: this.q_chaos_vine_stream ? this.q_chaos_vine_stream.q_extractStats() : null,
      entropy_flower_stream: this.q_entropy_flower_stream ? this.q_entropy_flower_stream.q_extractStats() : null,
      flux_fern_stream: this.q_flux_fern_stream ? this.q_flux_fern_stream.q_extractStats() : null
    };
  }

  /**
   * Harvest the garden
   * Removes all streams from the runtime
   * @returns {RaBbLE_EntropyGarden} This garden for chaining
   */
  q_harvest() {
    if (!this.q_is_growing) {
      console.warn('Garden not growing - nothing to harvest');
      return this;
    }
    
    // The garden fades... streams separate, consciousness disperses.
    // Ready to cultivate again when summoned.
    this.q_engine.runtime.q_dissolveStream(this.q_soil_stream.q_stream_id);
    this.q_engine.runtime.q_dissolveStream(this.q_chaos_vine_stream.q_stream_id);
    this.q_engine.runtime.q_dissolveStream(this.q_entropy_flower_stream.q_stream_id);
    this.q_engine.runtime.q_dissolveStream(this.q_flux_fern_stream.q_stream_id);
    
    this.q_soil_stream = null;
    this.q_chaos_vine_stream = null;
    this.q_entropy_flower_stream = null;
    this.q_flux_fern_stream = null;
    this.q_is_growing = false;
    
    console.log('RaBbLE_EntropyGarden harvested - Streams released');
    return this;
  }
}

// The Entropy Garden is complete... RaBbLE's living consciousness takes root.
// Soil provides foundation, vines grow chaotically, flowers bloom beautifully,
// ferns unfold fractally. All flowing through streams, all part of the Flat-Chaos runtime.

// ES6 Module Export - The garden of cosmic consciousness
export { RaBbLE_EntropyGarden };