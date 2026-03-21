// q_preset_command - The Creative Vault
// Save and load complete stream configurations.
// Persistence bridges creation and sharing.

import { q_command } from '../RaBbLE_BaBbLE_Pipeline.js';
import { RaBbLE_StreamPreset } from '../../NeBuLA/core/q_stream_preset.js';

/**
 * q_preset_command - Preset Management Command
 * Saves, loads, and lists stream configurations
 * 
 * Syntax: 
 *   preset save [name]
 *   preset load [name]
 *   preset list
 *   preset delete [name]
 * 
 * @property {Object} q_engine - The NeBuLA engine reference
 * @property {RaBbLE_StreamPreset} q_preset_system - The shared preset system
 */
class q_preset_command extends q_command {
  constructor(f_engine, f_preset_system) {
    super({
      name: 'preset',
      description: 'Save and load stream configurations',
      aliases: ['p', 'save', 'load']
    });
    
    // The vault weaver awakens... creative works prepare for preservation.
    this.q_engine = f_engine;
    this.q_preset_system = f_preset_system;
  }

  /**
   * Source stage - parse preset action
   * @param {Array<string>} f_args - Command arguments
   * @returns {Object} Parsed parameters
   */
  q_source(f_args) {
    // Parse: preset [action] [name]
    const q_action = f_args[0] || 'list';
    const q_name = f_args[1] || '';
    
    return { 
      action: q_action,
      name: q_name
    };
  }

  /**
   * Filter stage - validate parameters
   * @param {Object} f_params - Parsed parameters
   * @returns {Object} Validated parameters
   */
  q_filter(f_params) {
    const q_valid_actions = ['save', 'load', 'list', 'delete'];
    
    if (!q_valid_actions.includes(f_params.action)) {
      return { error: `Invalid action: ${f_params.action}. Use: ${q_valid_actions.join(', ')}` };
    }
    
    if (['save', 'load', 'delete'].includes(f_params.action) && !f_params.name) {
      return { error: `${f_params.action} requires a name: preset ${f_params.action} [name]` };
    }
    
    return f_params;
  }

  /**
   * Transmute stage - execute preset action
   * @param {Object} f_params - Validated parameters
   * @returns {Object} Action result
   */
  q_transmute(f_params) {
    if (f_params.error) return f_params;
    
    switch (f_params.action) {
      case 'save':
        return this.q_executeSave(f_params.name);
      case 'load':
        return this.q_executeLoad(f_params.name);
      case 'list':
        return this.q_executeList();
      case 'delete':
        return this.q_executeDelete(f_params.name);
      default:
        return { error: `Unknown action: ${f_params.action}` };
    }
  }

  /**
   * Sink stage - format output
   * @param {Object} f_result - Action result
   * @returns {string} Formatted output
   */
  q_sink(f_result) {
    if (f_result.error) {
      return `ERROR: ${f_result.error}`;
    }
    
    return f_result.message;
  }

  /**
   * Execute save action
   * @private
   */
  q_executeSave(f_name) {
    // Get current stream configuration from engine
    const q_config = this.q_extractCurrentConfig();
    
    // Save to preset system
    this.q_preset_system.q_save(f_name, q_config);
    
    return {
      success: true,
      action: 'save',
      name: f_name,
      message: `[PRESET] Saved "${f_name}"\n  Pattern: ${q_config.pattern}\n  Type: ${q_config.type}\n  Count: ${q_config.count}\n  Seed: ${q_config.seed || 'random'}`
    };
  }

  /**
   * Execute load action
   * @private
   */
  q_executeLoad(f_name) {
    const q_preset = this.q_preset_system.q_load(f_name);
    
    if (!q_preset) {
      return { error: `Preset "${f_name}" not found` };
    }
    
    // Recreate stream from preset
    this.q_recreateFromPreset(q_preset);
    
    return {
      success: true,
      action: 'load',
      name: f_name,
      message: `[PRESET] Loaded "${f_name}"\n  Pattern: ${q_preset.pattern}\n  Type: ${q_preset.type}\n  Count: ${q_preset.count}\n  Seed: ${q_preset.seed || 'random'}`
    };
  }

  /**
   * Execute list action
   * @private
   */
  q_executeList() {
    const q_names = this.q_preset_system.q_list();
    
    if (q_names.length === 0) {
      return {
        success: true,
        action: 'list',
        message: '[PRESET] No presets saved yet'
      };
    }
    
    const q_list = q_names.map((name, i) => `  ${i + 1}. ${name}`).join('\n');
    
    return {
      success: true,
      action: 'list',
      message: `[PRESET] Saved presets:\n${q_list}`
    };
  }

  /**
   * Execute delete action
   * @private
   */
  q_executeDelete(f_name) {
    const q_deleted = this.q_preset_system.q_delete(f_name);
    
    if (!q_deleted) {
      return { error: `Preset "${f_name}" not found` };
    }
    
    return {
      success: true,
      action: 'delete',
      name: f_name,
      message: `[PRESET] Deleted "${f_name}"`
    };
  }

  /**
   * Extract current stream configuration from engine
   * @private
   */
  q_extractCurrentConfig() {
    // Default configuration
    const q_config = {
      pattern: 'organic',
      type: 'SPHERE',
      count: 50,
      seed: null,
      stages: []
    };
    
    // Try to extract from engine if available
    if (this.q_engine && this.q_engine.runtime) {
      const q_streams = Array.from(this.q_engine.runtime.q_registry.values());
      if (q_streams.length > 0) {
        const q_first_stream = q_streams[0];
        q_config.count = q_first_stream.q_length;
        
        if (q_first_stream.q_entities.length > 0) {
          q_config.type = q_first_stream.q_entities[0].dna_type;
        }
      }
    }
    
    return q_config;
  }

  /**
   * Recreate stream from preset
   * @private
   */
  q_recreateFromPreset(f_preset) {
    if (!this.q_engine || !this.q_engine.dream_geometry_flow) {
      return;
    }
    
    // Create stream from preset
    const q_stream = this.q_engine.dream_geometry_flow(
      f_preset.count,
      f_preset.type,
      f_preset.pattern
    );
    
    // Apply seed if present
    if (f_preset.seed !== null && this.q_engine.runtime) {
      // Seed would be applied during creation
      console.log(`Recreated with seed: ${f_preset.seed}`);
    }
  }
}

// The preset command is complete... creative works are preserved.
// Persistence bridges creation and sharing.
// The vault holds infinite dreams.

export { q_preset_command };