// q_interact_command - Touch the Chaos
// Where users reach into the void and chaos reaches back.
// Every interaction is a conversation between creator and creation.

import { q_command } from '../RaBbLE_BaBbLE_Pipeline.js';
import { RaBbLE_EntropyCanvas } from '../../NeBuLA/components/EntropyCanvas/RaBbLE_EntropyCanvas.js';

/**
 * q_interact_command - Entropy Canvas Interaction
 * Activates and controls the interactive chaos canvas
 * 
 * Syntax: interact [action] [parameters]
 * Examples:
 *   interact activate          - Start interactive mode
 *   interact deactivate        - Stop interactive mode
 *   interact mode attract      - Set interaction mode
 *   interact stats             - Show interaction statistics
 *   interact help              - Show help
 * 
 * @property {Object} q_engine - The NeBuLA engine reference
 * @property {RaBbLE_EntropyCanvas} q_canvas - The canvas instance
 */
class q_interact_command extends q_command {
  constructor(f_engine) {
    super({
      name: 'interact',
      description: 'Touch the chaos - interactive entropy manipulation',
      aliases: ['touch', 'play', 'canvas']
    });
    
    // The interact command awakens... ready to bridge user and chaos.
    this.q_engine = f_engine;
    this.q_canvas = null;
  }

  /**
   * Source stage - parse interaction parameters from arguments
   * @param {Array<string>} f_args - Command arguments
   * @returns {Object} Parsed parameters
   */
  q_source(f_args) {
    // Parse: interact [action] [parameters]
    const q_action = f_args[0] || 'activate';
    const q_params = f_args.slice(1);
    
    return { action: q_action, params: q_params };
  }

  /**
   * Filter stage - validate interaction parameters
   * @param {Object} f_params - Parsed parameters
   * @returns {Object} Validated parameters
   */
  q_filter(f_params) {
    const q_valid_actions = ['activate', 'deactivate', 'mode', 'stats', 'help'];
    
    if (!q_valid_actions.includes(f_params.action)) {
      return { 
        error: `Invalid action: ${f_params.action}. Use: ${q_valid_actions.join(', ')}` 
      };
    }
    
    return f_params;
  }

  /**
   * Transmute stage - execute interaction action
   * @param {Object} f_params - Validated parameters
   * @returns {Object} Action result
   */
  q_transmute(f_params) {
    if (f_params.error) return f_params;
    
    // The interaction materializes... action becomes reality.
    switch (f_params.action) {
      case 'activate':
        return this._transmuteActivate();
      case 'deactivate':
        return this._transmuteDeactivate();
      case 'mode':
        return this._transmuteMode(f_params.params);
      case 'stats':
        return this._transmuteStats();
      case 'help':
        return this._transmuteHelp();
      default:
        return { error: 'Unknown action' };
    }
  }

  /**
   * Sink stage - format interaction output
   * @param {Object} f_result - Action result
   * @returns {string} Formatted interaction output
   */
  q_sink(f_result) {
    if (f_result.error) {
      return `ERROR: ${f_result.error}`;
    }
    
    // The interaction emerges... results flow from the quantum void.
    let q_output = `[INTERACT] ${f_result.message}\n`;
    
    if (f_result.stats) {
      q_output += `  Status: ${f_result.stats.is_active ? 'Active' : 'Inactive'}\n`;
      q_output += `  Mode: ${f_result.stats.current_mode}\n`;
      q_output += `  Wells: ${f_result.stats.well_count}\n`;
      q_output += `  Trails: ${f_result.stats.trail_count}\n`;
    }
    
    return q_output;
  }

  /**
   * Transmute activate action
   * @private
   * @returns {Object} Activate result
   */
  _transmuteActivate() {
    if (this.q_canvas && this.q_canvas.q_is_active) {
      return { error: 'Canvas already active. Deactivate first.' };
    }
    
    // The canvas awakens... ready to listen.
    this.q_canvas = new RaBbLE_EntropyCanvas(this.q_engine);
    this.q_canvas.q_activate();
    
    return {
      success: true,
      message: 'Entropy Canvas activated! Touch the chaos.',
      stats: this.q_canvas.q_extractStats()
    };
  }

  /**
   * Transmute deactivate action
   * @private
   * @returns {Object} Deactivate result
   */
  _transmuteDeactivate() {
    if (!this.q_canvas || !this.q_canvas.q_is_active) {
      return { error: 'No active canvas to deactivate. Activate first.' };
    }
    
    // The canvas rests... chaos at peace.
    this.q_canvas.q_deactivate();
    this.q_canvas = null;
    
    return {
      success: true,
      message: 'Entropy Canvas deactivated. Chaos rests.',
      stats: null
    };
  }

  /**
   * Transmute mode action
   * @private
   * @param {Array<string>} f_params - Parameters
   * @returns {Object} Mode result
   */
  _transmuteMode(f_params) {
    if (!this.q_canvas || !this.q_canvas.q_is_active) {
      return { error: 'No active canvas. Activate first.' };
    }
    
    const q_mode = f_params[0] || 'attract';
    const q_valid_modes = ['attract', 'repel', 'trail', 'split'];
    
    if (!q_valid_modes.includes(q_mode)) {
      return { error: `Invalid mode: ${q_mode}. Use: ${q_valid_modes.join(', ')}` };
    }
    
    // Mode shifts... interaction changes.
    this.q_canvas.q_setMode(q_mode);
    
    return {
      success: true,
      message: `Interaction mode set to: ${q_mode}`,
      stats: this.q_canvas.q_extractStats()
    };
  }

  /**
   * Transmute stats action
   * @private
   * @returns {Object} Stats result
   */
  _transmuteStats() {
    if (!this.q_canvas || !this.q_canvas.q_is_active) {
      return { 
        success: true,
        message: 'Canvas statistics',
        stats: { is_active: false, current_mode: 'none', well_count: 0, trail_count: 0 }
      };
    }
    
    // The canvas reveals its secrets... statistics flow.
    return {
      success: true,
      message: 'Canvas statistics',
      stats: this.q_canvas.q_extractStats()
    };
  }

  /**
   * Transmute help action
   * @private
   * @returns {Object} Help result
   */
  _transmuteHelp() {
    // The canvas whispers its secrets... help emerges.
    return {
      success: true,
      message: 'Interaction Commands:\n' +
        '  interact activate          - Start interactive mode\n' +
        '  interact deactivate        - Stop interactive mode\n' +
        '  interact mode attract      - Set mode (attract, repel, trail, split)\n' +
        '  interact stats             - Show interaction statistics\n' +
        '  interact help              - Show this help\n\n' +
        'Modes:\n' +
        '  attract: Click to create gravity wells that pull particles\n' +
        '  repel: Click to create repulsion wells that push particles\n' +
        '  trail: Draw paths that particles follow\n' +
        '  split: (Coming soon) Split streams with gestures',
      stats: null
    };
  }
}

// The interact command is complete... ready to bridge user and chaos.
// Every touch creates a conversation, every gesture shapes the void.

export { q_interact_command };