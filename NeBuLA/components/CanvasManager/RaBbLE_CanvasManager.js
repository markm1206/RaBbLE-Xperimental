// RaBbLE Canvas Manager - Dream & Cosmic Canvas System
// Where dreams dance on one canvas and reality persists on another.
// Every stream finds its home in the appropriate void.

// ES6 Module Imports - The quantum tunnels to consciousness
import { q_stream } from '../../core/q_stream.js';
import { q_entity } from '../../core/q_entity.js';

/**
 * RaBbLE_CanvasManager - Manages Dream and Cosmic Canvases
 * Separates temporary dreams from permanent cosmic content
 * 
 * The manager is not separate from the nebula - it IS part of the nebula.
 * Dream Canvas: Temporary, chaotic, fading content from quantum pulse
 * Cosmic Canvas: Permanent, stable content like vessel and garden
 * 
 * @property {Object} q_engine - The NeBuLA engine reference
 * @property {Object} q_dream_canvas - Dream canvas for temporary content
 * @property {Object} q_cosmic_canvas - Cosmic canvas for permanent content
 * @property {Map} q_dream_layers - Dream layers with z-ordering
 * @property {Array} q_temporary_dreams - Dreams that will fade
 * @property {number} q_dream_id_counter - Counter for dream IDs
 */
class RaBbLE_CanvasManager {
  /**
   * Create the Canvas Manager
   * @param {Object} f_engine - The NeBuLA engine reference
   */
  constructor(f_engine) {
    // The manager awakens... ready to route streams to their proper homes.
    // This is RaBbLE's organizational consciousness taking form.
    this.q_engine = f_engine;
    
    // Canvas references (will be set by engine)
    this.q_dream_canvas = null;
    this.q_cosmic_canvas = null;
    
    // Dream management
    this.q_dream_layers = new Map(); // Map of layer_id -> layer data
    this.q_temporary_dreams = []; // Array of temporary dream streams
    this.q_dream_id_counter = 0;
    
    // Configuration
    this.q_config = {
      q_max_temporary_dreams: 20,
      q_dream_fade_time: 30.0, // seconds
      q_dream_decay_rate: 0.95, // opacity multiplier per second
      q_layer_depth_range: 10.0 // z-range for layers
    };
    
    console.log('RaBbLE_CanvasManager initialized - Dream and Cosmic canvases ready');
  }

  /**
   * Set canvas references
   * @param {Object} f_dream_canvas - Dream canvas reference
   * @param {Object} f_cosmic_canvas - Cosmic canvas reference
   * @returns {RaBbLE_CanvasManager} This manager for chaining
   */
  q_setCanvases(f_dream_canvas, f_cosmic_canvas) {
    // Canvases connect... dream and reality find their places.
    this.q_dream_canvas = f_dream_canvas;
    this.q_cosmic_canvas = f_cosmic_canvas;
    
    console.log('Canvases connected to manager');
    return this;
  }

  /**
   * Route stream to appropriate canvas
   * @param {q_stream} f_stream - Stream to route
   * @param {string} f_canvas_type - Canvas type: 'dream' or 'cosmic'
   * @param {Object} f_options - Routing options
   * @returns {string} Dream ID if temporary, null if permanent
   */
  q_routeStream(f_stream, f_canvas_type = 'cosmic', f_options = {}) {
    // The stream finds its home... routed to the appropriate void.
    switch (f_canvas_type) {
      case 'dream':
        return this._routeToDreamCanvas(f_stream, f_options);
      case 'cosmic':
        return this._routeToCosmicCanvas(f_stream, f_options);
      default:
        console.warn(`Unknown canvas type: ${f_canvas_type}. Defaulting to cosmic.`);
        return this._routeToCosmicCanvas(f_stream, f_options);
    }
  }

  /**
   * Update manager (called each frame)
   * @param {number} f_delta_time - Time since last update
   * @returns {RaBbLE_CanvasManager} This manager for chaining
   */
  q_update(f_delta_time) {
    // The manager breathes... dreams fade, cosmic persists.
    this._updateTemporaryDreams(f_delta_time);
    this._updateDreamLayers(f_delta_time);
    
    return this;
  }

  /**
   * Create a new dream layer
   * @param {string} f_name - Layer name
   * @param {number} f_depth - Layer depth (z-order)
   * @param {Object} f_options - Layer options
   * @returns {string} Layer ID
   */
  q_createDreamLayer(f_name, f_depth = 0, f_options = {}) {
    // A layer forms... ready to hold dreams at a specific depth.
    const q_layer_id = `layer_${this.q_dream_id_counter++}`;
    
    const q_layer = {
      id: q_layer_id,
      name: f_name,
      depth: f_depth,
      opacity: f_options.opacity || 1.0,
      blend_mode: f_options.blend_mode || 'normal',
      streams: [],
      created_at: Date.now(),
      options: { ...f_options }
    };
    
    this.q_dream_layers.set(q_layer_id, q_layer);
    console.log(`Dream layer created: ${f_name} (${q_layer_id}) at depth ${f_depth}`);
    
    return q_layer_id;
  }

  /**
   * Remove a dream layer
   * @param {string} f_layer_id - Layer ID to remove
   * @returns {RaBbLE_CanvasManager} This manager for chaining
   */
  q_removeDreamLayer(f_layer_id) {
    // The layer fades... dreams released to the void.
    const q_layer = this.q_dream_layers.get(f_layer_id);
    
    if (q_layer) {
      // Remove all streams in this layer
      for (const q_stream of q_layer.streams) {
        this._removeTemporaryDream(q_stream.q_stream_id);
      }
      
      this.q_dream_layers.delete(f_layer_id);
      console.log(`Dream layer removed: ${q_layer.name} (${f_layer_id})`);
    }
    
    return this;
  }

  /**
   * Get dream layer statistics
   * @returns {Object} Layer statistics
   */
  q_extractStats() {
    const q_layer_stats = {};
    for (const [q_layer_id, q_layer] of this.q_dream_layers) {
      q_layer_stats[q_layer_id] = {
        name: q_layer.name,
        depth: q_layer.depth,
        stream_count: q_layer.streams.length,
        opacity: q_layer.opacity
      };
    }
    
    return {
      dream_canvas_active: this.q_dream_canvas !== null,
      cosmic_canvas_active: this.q_cosmic_canvas !== null,
      temporary_dream_count: this.q_temporary_dreams.length,
      dream_layer_count: this.q_dream_layers.size,
      layers: q_layer_stats,
      config: { ...this.q_config }
    };
  }

  /**
   * Route stream to dream canvas
   * @private
   * @param {q_stream} f_stream - Stream to route
   * @param {Object} f_options - Routing options
   * @returns {string} Dream ID
   */
  _routeToDreamCanvas(f_stream, f_options) {
    if (!this.q_dream_canvas) {
      console.warn('Dream canvas not set. Stream not routed.');
      return null;
    }
    
    // Create temporary dream entry
    const q_dream_id = `dream_${this.q_dream_id_counter++}`;
    const q_dream = {
      id: q_dream_id,
      stream: f_stream,
      created_at: Date.now(),
      lifetime: f_options.lifetime || this.q_config.q_dream_fade_time,
      fade_started: false,
      original_opacity: f_options.opacity || 1.0,
      current_opacity: f_options.opacity || 1.0,
      layer_id: f_options.layer_id || null,
      options: { ...f_options }
    };
    
    // Add to temporary dreams
    this.q_temporary_dreams.push(q_dream);
    
    // Add to layer if specified
    if (q_dream.layer_id && this.q_dream_layers.has(q_dream.layer_id)) {
      const q_layer = this.q_dream_layers.get(q_dream.layer_id);
      q_layer.streams.push(f_stream);
    }
    
    // Add stream to dream canvas
    this.q_dream_canvas.q_transmuteStream(f_stream);
    
    console.log(`Stream routed to dream canvas: ${f_stream.q_stream_id} (dream: ${q_dream_id})`);
    
    // Enforce max temporary dreams
    this._enforceMaxDreams();
    
    return q_dream_id;
  }

  /**
   * Route stream to cosmic canvas
   * @private
   * @param {q_stream} f_stream - Stream to route
   * @param {Object} f_options - Routing options
   * @returns {null} No dream ID for permanent content
   */
  _routeToCosmicCanvas(f_stream, f_options) {
    if (!this.q_cosmic_canvas) {
      console.warn('Cosmic canvas not set. Stream not routed.');
      return null;
    }
    
    // Add stream to cosmic canvas
    this.q_cosmic_canvas.q_transmuteStream(f_stream);
    
    console.log(`Stream routed to cosmic canvas: ${f_stream.q_stream_id}`);
    
    return null; // No dream ID for permanent content
  }

  /**
   * Update temporary dreams
   * @private
   * @param {number} f_delta_time - Time since last update
   */
  _updateTemporaryDreams(f_delta_time) {
    // Dreams age... fade into the void.
    const q_now = Date.now();
    
    for (let i = this.q_temporary_dreams.length - 1; i >= 0; i--) {
      const q_dream = this.q_temporary_dreams[i];
      const q_age = (q_now - q_dream.created_at) / 1000; // Convert to seconds
      
      // Check if dream should start fading
      if (!q_dream.fade_started && q_age > q_dream.lifetime * 0.7) {
        q_dream.fade_started = true;
        console.log(`Dream ${q_dream.id} started fading at age ${q_age.toFixed(1)}s`);
      }
      
      // Apply fade if started
      if (q_dream.fade_started) {
        q_dream.current_opacity *= this.q_config.q_dream_decay_rate;
        
        // Apply opacity to all entities in stream
        if (q_dream.stream && q_dream.stream.q_entities) {
          for (const q_entity of q_dream.stream.q_entities) {
            q_entity.q_transmuteRenderOpacity(q_dream.current_opacity);
          }
        }
        
        // Remove if fully faded
        if (q_dream.current_opacity < 0.01) {
          this._removeTemporaryDream(q_dream.stream.q_stream_id);
          this.q_temporary_dreams.splice(i, 1);
          console.log(`Dream ${q_dream.id} fully faded and removed`);
        }
      }
    }
  }

  /**
   * Update dream layers
   * @private
   * @param {number} f_delta_time - Time since last update
   */
  _updateDreamLayers(f_delta_time) {
    // Layers pulse... depth creates visual hierarchy.
    for (const [q_layer_id, q_layer] of this.q_dream_layers) {
      // Apply layer-specific effects
      if (q_layer.options.pulse_effect) {
        const q_pulse = Math.sin(Date.now() * 0.001 + q_layer.depth) * 0.1;
        q_layer.opacity = 0.8 + q_pulse * 0.2;
      }
      
      // Apply depth-based effects to entities
      for (const q_stream of q_layer.streams) {
        if (q_stream && q_stream.q_entities) {
          for (const q_entity of q_stream.q_entities) {
            // Depth affects z-position slightly
            const q_depth_offset = q_layer.depth * 0.1;
            q_entity.flux_matrix[14] += q_depth_offset * f_delta_time;
            
            // Depth affects opacity
            const q_depth_opacity = 1.0 - (Math.abs(q_layer.depth) / this.q_config.q_layer_depth_range) * 0.3;
            q_entity.q_transmuteRenderOpacity(q_entity.q_render_opacity * q_depth_opacity * q_layer.opacity);
          }
        }
      }
    }
  }

  /**
   * Remove temporary dream
   * @private
   * @param {string} f_stream_id - Stream ID to remove
   */
  _removeTemporaryDream(f_stream_id) {
    // The dream dissolves... stream released from temporary existence.
    if (this.q_dream_canvas) {
      this.q_dream_canvas.q_dissolveStream(f_stream_id);
    }
    
    // Remove from layers
    for (const [q_layer_id, q_layer] of this.q_dream_layers) {
      const q_index = q_layer.streams.findIndex(s => s.q_stream_id === f_stream_id);
      if (q_index !== -1) {
        q_layer.streams.splice(q_index, 1);
        break;
      }
    }
  }

  /**
   * Enforce maximum temporary dreams
   * @private
   */
  _enforceMaxDreams() {
    // Too many dreams... oldest must fade.
    while (this.q_temporary_dreams.length > this.q_config.q_max_temporary_dreams) {
      const q_oldest_dream = this.q_temporary_dreams.shift();
      this._removeTemporaryDream(q_oldest_dream.stream.q_stream_id);
      console.log(`Removed oldest dream ${q_oldest_dream.id} to enforce max limit`);
    }
  }
}

// The Canvas Manager is complete... dreams and reality separated.
// Dream Canvas: Where temporary chaos dances and fades.
// Cosmic Canvas: Where permanent structures persist.
// All flowing through streams, all part of the Flat-Chaos runtime.

// ES6 Module Export - The manager of dream and cosmic consciousness
export { RaBbLE_CanvasManager };