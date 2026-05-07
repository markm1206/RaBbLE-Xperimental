// q_debug_command - Quantum Debugging System
// Where we peer into the quantum void and diagnose reality.
// Every bug is a pattern waiting to be understood.

import { q_command } from '../RaBbLE_BaBbLE_Pipeline.js';

/**
 * q_debug_command - System Debugging Tools
 * Diagnose issues, inspect streams, and monitor system health
 * 
 * Syntax: debug [action] [parameters]
 * Examples:
 *   debug status - Show system health
 *   debug streams - List all streams
 *   debug canvas - Show canvas routing
 *   debug dream [id] - Inspect specific dream
 *   debug runtime - Show runtime statistics
 *   debug memory - Show memory usage
 * 
 * @property {Object} q_engine - The NeBuLA engine reference
 */
class q_debug_command extends q_command {
  constructor(f_engine) {
    super({
      name: 'debug',
      description: 'Debugging tools for system diagnostics',
      aliases: ['diag', 'inspect', 'd']
    });
    
    // The debugger awakens... ready to illuminate the quantum shadows.
    this.q_engine = f_engine;
  }

  /**
   * Source stage - parse debug parameters from arguments
   * @param {Array<string>} f_args - Command arguments
   * @returns {Object} Parsed parameters
   */
  q_source(f_args) {
    // Parse: debug [action] [parameters]
    const q_action = f_args[0] || 'status';
    const q_params = f_args.slice(1);
    
    return { action: q_action, params: q_params };
  }

  /**
   * Filter stage - validate debug parameters
   * @param {Object} f_params - Parsed parameters
   * @returns {Object} Validated parameters
   */
  q_filter(f_params) {
    const q_valid_actions = ['status', 'streams', 'canvas', 'dream', 'runtime', 'memory', 'help', 'clear'];
    
    if (!q_valid_actions.includes(f_params.action)) {
      return { 
        error: `Invalid action: ${f_params.action}. Use: ${q_valid_actions.join(', ')}` 
      };
    }
    
    return f_params;
  }

  /**
   * Transmute stage - execute debug action
   * @param {Object} f_params - Validated parameters
   * @returns {Object} Action result
   */
  q_transmute(f_params) {
    if (f_params.error) return f_params;
    
    // The debugger materializes... diagnostics begin.
    switch (f_params.action) {
      case 'status':
        return this._transmuteStatus();
      case 'streams':
        return this._transmuteStreams();
      case 'canvas':
        return this._transmuteCanvas();
      case 'dream':
        return this._transmuteDream(f_params.params);
      case 'runtime':
        return this._transmuteRuntime();
      case 'memory':
        return this._transmuteMemory();
      case 'help':
        return this._transmuteHelp();
      case 'clear':
        return this._transmuteClear();
      default:
        return { error: 'Unknown action' };
    }
  }

  /**
   * Sink stage - format debug output
   * @param {Object} f_result - Action result
   * @returns {string} Formatted debug output
   */
  q_sink(f_result) {
    if (f_result.error) {
      return `ERROR: ${f_result.error}`;
    }
    
    // The debug emerges... insights flow from the quantum void.
    let q_output = `[DEBUG] ${f_result.message}\n`;
    
    if (f_result.data) {
      q_output += `\n--- Diagnostic Data ---\n`;
      q_output += this._formatData(f_result.data);
    }
    
    if (f_result.recommendations) {
      q_output += `\n--- Recommendations ---\n`;
      f_result.recommendations.forEach(rec => {
        q_output += `  • ${rec}\n`;
      });
    }
    
    return q_output;
  }

  /**
   * Transmute status action
   * @private
   * @returns {Object} Status result
   */
  _transmuteStatus() {
    if (!this.q_engine) {
      return { error: 'Engine not available for debugging' };
    }
    
    const q_engine_stats = this.q_engine.getStats();
    const q_runtime_stats = this.q_engine.runtime.q_extractStats();
    const q_dream_stats = this.q_engine.dream_runtime ? this.q_engine.dream_runtime.q_extractStats() : null;
    const q_cosmic_stats = this.q_engine.cosmic_runtime ? this.q_engine.cosmic_runtime.q_extractStats() : null;
    
    const q_status = {
      engine_running: q_engine_stats.engine.is_running,
      main_runtime: {
        streams: q_runtime_stats.stream_count,
        entities: q_runtime_stats.entity_count,
        frame: q_runtime_stats.frame_count
      },
      dream_canvas: q_dream_stats ? {
        streams: q_dream_stats.stream_count,
        entities: q_dream_stats.entity_count
      } : 'Not initialized',
      cosmic_canvas: q_cosmic_stats ? {
        streams: q_cosmic_stats.stream_count,
        entities: q_cosmic_stats.entity_count
      } : 'Not initialized',
      performance: q_engine_stats.runtime.performance
    };
    
    return {
      success: true,
      message: 'System Status Report',
      data: q_status,
      recommendations: this._generateStatusRecommendations(q_status)
    };
  }

  /**
   * Transmute streams action
   * @private
   * @returns {Object} Streams result
   */
  _transmuteStreams() {
    if (!this.q_engine) {
      return { error: 'Engine not available for debugging' };
    }
    
    const q_main_streams = Array.from(this.q_engine.runtime.q_registry.keys());
    const q_dream_streams = this.q_engine.dream_runtime 
      ? Array.from(this.q_engine.dream_runtime.q_registry.keys())
      : [];
    const q_cosmic_streams = this.q_engine.cosmic_runtime
      ? Array.from(this.q_engine.cosmic_runtime.q_registry.keys())
      : [];
    
    return {
      success: true,
      message: 'Stream Registry Analysis',
      data: {
        main_runtime: q_main_streams,
        dream_canvas: q_dream_streams,
        cosmic_canvas: q_cosmic_streams,
        total_streams: q_main_streams.length + q_dream_streams.length + q_cosmic_streams.length
      }
    };
  }

  /**
   * Transmute canvas action
   * @private
   * @returns {Object} Canvas result
   */
  _transmuteCanvas() {
    if (!this.q_engine) {
      return { error: 'Engine not available for debugging' };
    }
    
    const q_canvas_manager = this.q_engine.canvas_manager;
    if (!q_canvas_manager) {
      return { error: 'Canvas Manager not initialized' };
    }
    
    const q_stats = q_canvas_manager.q_extractStats();
    
    return {
      success: true,
      message: 'Canvas Routing Analysis',
      data: q_stats
    };
  }

  /**
   * Transmute dream action
   * @private
   * @param {Array<string>} f_params - Parameters
   * @returns {Object} Dream result
   */
  _transmuteDream(f_params) {
    if (!this.q_engine) {
      return { error: 'Engine not available for debugging' };
    }
    
    if (!this.q_engine.dream_runtime) {
      return { error: 'Dream Canvas not initialized' };
    }
    
    const q_dream_id = f_params[0];
    if (!q_dream_id) {
      // List all dreams
      const q_dreams = Array.from(this.q_engine.dream_runtime.q_registry.entries()).map(([id, stream]) => ({
        id: id,
        entity_count: stream.q_entities ? stream.q_entities.length : 0,
        stream_id: stream.q_stream_id
      }));
      
      return {
        success: true,
        message: 'Dream Canvas Analysis',
        data: {
          dream_count: q_dreams.length,
          dreams: q_dreams
        }
      };
    } else {
      // Find specific dream
      const q_dream = this.q_engine.dream_runtime.q_registry.get(q_dream_id);
      if (!q_dream) {
        return { error: `Dream not found: ${q_dream_id}` };
      }
      
      return {
        success: true,
        message: `Dream Analysis: ${q_dream_id}`,
        data: {
          dream_id: q_dream_id,
          stream_id: q_dream.q_stream_id,
          entity_count: q_dream.q_entities ? q_dream.q_entities.length : 0,
          entities: q_dream.q_entities ? q_dream.q_entities.slice(0, 5).map(e => ({
            type: e.dna_type,
            entropy: e.e_entropy_sig,
            position: {
              x: e.flux_matrix[12],
              y: e.flux_matrix[13],
              z: e.flux_matrix[14]
            }
          })) : []
        }
      };
    }
  }

  /**
   * Transmute runtime action
   * @private
   * @returns {Object} Runtime result
   */
  _transmuteRuntime() {
    if (!this.q_engine) {
      return { error: 'Engine not available for debugging' };
    }
    
    const q_runtime_stats = this.q_engine.runtime.q_extractStats();
    const q_dream_stats = this.q_engine.dream_runtime ? this.q_engine.dream_runtime.q_extractStats() : null;
    const q_cosmic_stats = this.q_engine.cosmic_runtime ? this.q_engine.cosmic_runtime.q_extractStats() : null;
    
    return {
      success: true,
      message: 'Runtime Analysis',
      data: {
        main_runtime: q_runtime_stats,
        dream_runtime: q_dream_stats,
        cosmic_runtime: q_cosmic_stats
      }
    };
  }

  /**
   * Transmute memory action
   * @private
   * @returns {Object} Memory result
   */
  _transmuteMemory() {
    if (!this.q_engine) {
      return { error: 'Engine not available for debugging' };
    }
    
    // Estimate memory usage
    const q_main_entities = this.q_engine.runtime.global_laminar_flow.length;
    const q_dream_entities = this.q_engine.dream_runtime 
      ? this.q_engine.dream_runtime.global_laminar_flow.length
      : 0;
    const q_cosmic_entities = this.q_engine.cosmic_runtime
      ? this.q_engine.cosmic_runtime.global_laminar_flow.length
      : 0;
    
    const q_total_entities = q_main_entities + q_dream_entities + q_cosmic_entities;
    const q_estimated_memory = q_total_entities * 0.5; // ~0.5KB per entity estimate
    
    return {
      success: true,
      message: 'Memory Usage Estimate',
      data: {
        main_entities: q_main_entities,
        dream_entities: q_dream_entities,
        cosmic_entities: q_cosmic_entities,
        total_entities: q_total_entities,
        estimated_memory_kb: q_estimated_memory,
        estimated_memory_mb: (q_estimated_memory / 1024).toFixed(2)
      }
    };
  }

  /**
   * Transmute help action
   * @private
   * @returns {Object} Help result
   */
  _transmuteHelp() {
    return {
      success: true,
      message: 'Debug Commands:\n' +
        '  debug status          - Show system health\n' +
        '  debug streams         - List all streams\n' +
        '  debug canvas          - Show canvas routing\n' +
        '  debug dream [id]      - Inspect specific dream\n' +
        '  debug runtime         - Show runtime statistics\n' +
        '  debug memory          - Show memory usage\n' +
        '  debug clear           - Clear debug console\n' +
        '  debug help            - Show this help\n\n' +
        'Examples:\n' +
        '  debug status\n' +
        '  debug streams\n' +
        '  debug dream\n' +
        '  debug memory'
    };
  }

  /**
   * Transmute clear action
   * @private
   * @returns {Object} Clear result
   */
  _transmuteClear() {
    if (typeof window !== 'undefined' && window.q_shell && window.q_shell.q_terminal_el) {
      window.q_shell.q_terminal_el.innerHTML = '';
    }
    
    return {
      success: true,
      message: 'Debug console cleared'
    };
  }

  /**
   * Format data for display
   * @private
   * @param {Object} f_data - Data to format
   * @returns {string} Formatted data
   */
  _formatData(f_data, f_indent = 0) {
    let q_output = '';
    const q_indent = '  '.repeat(f_indent);
    
    for (const [key, value] of Object.entries(f_data)) {
      if (typeof value === 'object' && value !== null && !Array.isArray(value)) {
        q_output += `${q_indent}${key}:\n`;
        q_output += this._formatData(value, f_indent + 1);
      } else if (Array.isArray(value)) {
        q_output += `${q_indent}${key}: [${value.length} items]\n`;
        if (value.length > 0 && typeof value[0] === 'object') {
          q_output += this._formatData(value[0], f_indent + 1);
        }
      } else {
        q_output += `${q_indent}${key}: ${value}\n`;
      }
    }
    
    return q_output;
  }

  /**
   * Generate status recommendations
   * @private
   * @param {Object} f_status - Status data
   * @returns {Array<string>} Recommendations
   */
  _generateStatusRecommendations(f_status) {
    const q_recommendations = [];
    
    if (!f_status.engine_running) {
      q_recommendations.push('Engine is not running. Consider restarting the system.');
    }
    
    if (f_status.main_runtime.entities > 1000) {
      q_recommendations.push('High entity count detected. Consider using "collapse" to reduce complexity.');
    }
    
    if (f_status.dream_canvas === 'Not initialized') {
      q_recommendations.push('Dream canvas not initialized. Dreams will go to main runtime.');
    }
    
    if (f_status.performance.pulse_duration > 16) {
      q_recommendations.push('High pulse duration detected. Consider reducing entity count or complexity.');
    }
    
    if (q_recommendations.length === 0) {
      q_recommendations.push('System operating within normal parameters.');
    }
    
    return q_recommendations;
  }
}

// The debug command is complete... ready to illuminate the quantum shadows.
// Every bug is a pattern, every error is a clue.

export { q_debug_command };