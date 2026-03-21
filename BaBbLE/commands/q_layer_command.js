// q_layer_command - Dream Layer Management
// Where dreams exist at different depths, overlapping and interacting.
// Every layer is a dimension of consciousness.

import { q_command } from '../RaBbLE_BaBbLE_Pipeline.js';

/**
 * q_layer_command - Dream Layer Manager
 * Create and manage dream layers for organizing temporary content
 * 
 * Syntax: layer [action] [parameters]
 * Examples:
 *   layer create background -2.0
 *   layer create foreground 2.0
 *   layer list
 *   layer remove background
 *   layer stats
 * 
 * @property {Object} q_engine - The NeBuLA engine reference
 */
class q_layer_command extends q_command {
  constructor(f_engine) {
    super({
      name: 'layer',
      description: 'Manage dream layers - organize temporary content by depth',
      aliases: ['l', 'depth', 'z-order']
    });
    
    // The layer command awakens... ready to organize dreams.
    this.q_engine = f_engine;
  }

  /**
   * Source stage - parse layer parameters from arguments
   * @param {Array<string>} f_args - Command arguments
   * @returns {Object} Parsed parameters
   */
  q_source(f_args) {
    // Parse: layer [action] [parameters]
    const q_action = f_args[0] || 'list';
    const q_params = f_args.slice(1);
    
    return { action: q_action, params: q_params };
  }

  /**
   * Filter stage - validate layer parameters
   * @param {Object} f_params - Parsed parameters
   * @returns {Object} Validated parameters
   */
  q_filter(f_params) {
    const q_valid_actions = ['create', 'remove', 'list', 'stats', 'help'];
    
    if (!q_valid_actions.includes(f_params.action)) {
      return { 
        error: `Invalid action: ${f_params.action}. Use: ${q_valid_actions.join(', ')}` 
      };
    }
    
    return f_params;
  }

  /**
   * Transmute stage - execute layer action
   * @param {Object} f_params - Validated parameters
   * @returns {Object} Action result
   */
  q_transmute(f_params) {
    if (f_params.error) return f_params;
    
    // The layer materializes... organization begins.
    switch (f_params.action) {
      case 'create':
        return this._transmuteCreate(f_params.params);
      case 'remove':
        return this._transmuteRemove(f_params.params);
      case 'list':
        return this._transmuteList();
      case 'stats':
        return this._transmuteStats();
      case 'help':
        return this._transmuteHelp();
      default:
        return { error: 'Unknown action' };
    }
  }

  /**
   * Sink stage - format layer output
   * @param {Object} f_result - Action result
   * @returns {string} Formatted layer output
   */
  q_sink(f_result) {
    if (f_result.error) {
      return `ERROR: ${f_result.error}`;
    }
    
    // The layer emerges... organization flows from the quantum void.
    let q_output = `[LAYER] ${f_result.message}\n`;
    
    if (f_result.layers) {
      q_output += `\nDream Layers:\n`;
      f_result.layers.forEach(layer => {
        q_output += `  • ${layer.name} (depth: ${layer.depth}, streams: ${layer.stream_count}, opacity: ${layer.opacity.toFixed(2)})\n`;
      });
    }
    
    if (f_result.stats) {
      q_output += `\nStatistics:\n`;
      q_output += `  Total layers: ${f_result.stats.layer_count}\n`;
      q_output += `  Temporary dreams: ${f_result.stats.temporary_dream_count}\n`;
      q_output += `  Dream canvas active: ${f_result.stats.dream_canvas_active ? 'Yes' : 'No'}\n`;
      q_output += `  Cosmic canvas active: ${f_result.stats.cosmic_canvas_active ? 'Yes' : 'No'}\n`;
    }
    
    return q_output;
  }

  /**
   * Transmute create action
   * @private
   * @param {Array<string>} f_params - Parameters
   * @returns {Object} Create result
   */
  _transmuteCreate(f_params) {
    if (f_params.length < 2) {
      return { error: 'Insufficient parameters. Use: layer create <name> <depth>' };
    }
    
    const q_layer_name = f_params[0];
    const q_depth = parseFloat(f_params[1]) || 0;
    
    // Check if canvas manager exists
    if (!this.q_engine || !this.q_engine.canvas_manager) {
      return { error: 'Canvas manager not available. Engine not initialized properly.' };
    }
    
    // Create layer
    const q_layer_id = this.q_engine.canvas_manager.q_createDreamLayer(q_layer_name, q_depth, {
      opacity: 0.8 + Math.random() * 0.2,
      pulse_effect: Math.random() > 0.5
    });
    
    return {
      success: true,
      message: `Dream layer created: ${q_layer_name} at depth ${q_depth}`,
      layer_id: q_layer_id
    };
  }

  /**
   * Transmute remove action
   * @private
   * @param {Array<string>} f_params - Parameters
   * @returns {Object} Remove result
   */
  _transmuteRemove(f_params) {
    if (f_params.length < 1) {
      return { error: 'No layer name specified. Use: layer remove <name>' };
    }
    
    const q_layer_name = f_params[0];
    
    // Check if canvas manager exists
    if (!this.q_engine || !this.q_engine.canvas_manager) {
      return { error: 'Canvas manager not available. Engine not initialized properly.' };
    }
    
    // Find layer by name
    const q_layer_id = this._findLayerByName(q_layer_name);
    if (!q_layer_id) {
      return { error: `Layer not found: ${q_layer_name}` };
    }
    
    // Remove layer
    this.q_engine.canvas_manager.q_removeDreamLayer(q_layer_id);
    
    return {
      success: true,
      message: `Dream layer removed: ${q_layer_name}`
    };
  }

  /**
   * Transmute list action
   * @private
   * @returns {Object} List result
   */
  _transmuteList() {
    // Check if canvas manager exists
    if (!this.q_engine || !this.q_engine.canvas_manager) {
      return { error: 'Canvas manager not available. Engine not initialized properly.' };
    }
    
    const q_stats = this.q_engine.canvas_manager.q_extractStats();
    const q_layers = [];
    
    for (const [q_layer_id, q_layer] of Object.entries(q_stats.layers)) {
      q_layers.push({
        id: q_layer_id,
        name: q_layer.name,
        depth: q_layer.depth,
        stream_count: q_layer.stream_count,
        opacity: q_layer.opacity
      });
    }
    
    return {
      success: true,
      message: `Found ${q_layers.length} dream layers`,
      layers: q_layers
    };
  }

  /**
   * Transmute stats action
   * @private
   * @returns {Object} Stats result
   */
  _transmuteStats() {
    // Check if canvas manager exists
    if (!this.q_engine || !this.q_engine.canvas_manager) {
      return { error: 'Canvas manager not available. Engine not initialized properly.' };
    }
    
    const q_stats = this.q_engine.canvas_manager.q_extractStats();
    
    return {
      success: true,
      message: 'Dream layer statistics',
      stats: q_stats
    };
  }

  /**
   * Transmute help action
   * @private
   * @returns {Object} Help result
   */
  _transmuteHelp() {
    // The layer whispers its secrets... help emerges.
    return {
      success: true,
      message: 'Layer Commands:\n' +
        '  layer create <name> <depth>  - Create a new dream layer\n' +
        '  layer remove <name>          - Remove a dream layer\n' +
        '  layer list                   - List all dream layers\n' +
        '  layer stats                  - Show layer statistics\n' +
        '  layer help                   - Show this help\n\n' +
        'Examples:\n' +
        '  layer create background -2.0\n' +
        '  layer create midground 0.0\n' +
        '  layer create foreground 2.0\n' +
        '  layer remove background\n\n' +
        'Depth Values:\n' +
        '  Negative: Background (farther from viewer)\n' +
        '  Zero: Midground (default)\n' +
        '  Positive: Foreground (closer to viewer)\n\n' +
        'Note: Dreams routed to layers will inherit the layer\'s depth and opacity.'
    };
  }

  /**
   * Find layer by name
   * @private
   * @param {string} f_name - Layer name to find
   * @returns {string|null} Layer ID or null if not found
   */
  _findLayerByName(f_name) {
    if (!this.q_engine || !this.q_engine.canvas_manager) {
      return null;
    }
    
    const q_stats = this.q_engine.canvas_manager.q_extractStats();
    
    for (const [q_layer_id, q_layer] of Object.entries(q_stats.layers)) {
      if (q_layer.name.toLowerCase() === f_name.toLowerCase()) {
        return q_layer_id;
      }
    }
    
    return null;
  }
}

// The layer command is complete... ready to organize dreams.
// Every layer is a dimension, every depth a perspective.

export { q_layer_command };