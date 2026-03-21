// q_garden_command - Cultivate the Entropy Garden
// Where chaos blooms into beauty and entropy grows into patterns.
// Every garden needs a gardener, every garden needs a command.

import { q_command } from '../RaBbLE_BaBbLE_Pipeline.js';
import { RaBbLE_EntropyGarden } from '../../NeBuLA/components/EntropyGarden/RaBbLE_EntropyGarden.js';

/**
 * q_garden_command - Entropy Garden Cultivator
 * Creates and manages the living garden in the nebula
 * 
 * Syntax: garden [action] [parameters]
 * Examples:
 *   garden cultivate          - Create a new garden
 *   garden harvest            - Remove the garden
 *   garden entropy 0.8        - Set garden entropy level
 *   garden season summer      - Change garden season
 *   garden stats              - Show garden statistics
 * 
 * @property {Object} q_engine - The NeBuLA engine reference
 * @property {RaBbLE_EntropyGarden} q_garden - The garden instance
 */
class q_garden_command extends q_command {
  constructor(f_engine) {
    super({
      name: 'garden',
      description: 'Cultivate the Entropy Garden - where chaos blooms into beauty',
      aliases: ['grow', 'bloom', 'cultivate']
    });
    
    // The garden command awakens... ready to cultivate chaos.
    this.q_engine = f_engine;
    this.q_garden = null;
  }

  /**
   * Source stage - parse garden parameters from arguments
   * @param {Array<string>} f_args - Command arguments
   * @returns {Object} Parsed parameters
   */
  q_source(f_args) {
    // Parse: garden [action] [parameters]
    const q_action = f_args[0] || 'cultivate';
    const q_params = f_args.slice(1);
    
    return { action: q_action, params: q_params };
  }

  /**
   * Filter stage - validate garden parameters
   * @param {Object} f_params - Parsed parameters
   * @returns {Object} Validated parameters
   */
  q_filter(f_params) {
    const q_valid_actions = ['cultivate', 'harvest', 'entropy', 'season', 'stats', 'help'];
    
    if (!q_valid_actions.includes(f_params.action)) {
      return { 
        error: `Invalid action: ${f_params.action}. Use: ${q_valid_actions.join(', ')}` 
      };
    }
    
    return f_params;
  }

  /**
   * Transmute stage - execute garden action
   * @param {Object} f_params - Validated parameters
   * @returns {Object} Action result
   */
  q_transmute(f_params) {
    if (f_params.error) return f_params;
    
    // The garden materializes... action becomes reality.
    switch (f_params.action) {
      case 'cultivate':
        return this._transmuteCultivate();
      case 'harvest':
        return this._transmuteHarvest();
      case 'entropy':
        return this._transmuteEntropy(f_params.params);
      case 'season':
        return this._transmuteSeason(f_params.params);
      case 'stats':
        return this._transmuteStats();
      case 'help':
        return this._transmuteHelp();
      default:
        return { error: 'Unknown action' };
    }
  }

  /**
   * Sink stage - format garden output
   * @param {Object} f_result - Action result
   * @returns {string} Formatted garden output
   */
  q_sink(f_result) {
    if (f_result.error) {
      return `ERROR: ${f_result.error}`;
    }
    
    // The garden emerges... results flow from the quantum void.
    let q_output = `[GARDEN] ${f_result.message}\n`;
    
    if (f_result.stats) {
      q_output += `  Status: ${f_result.stats.is_growing ? 'Growing' : 'Dormant'}\n`;
      q_output += `  Time: ${f_result.stats.q_time.toFixed(2)}s\n`;
      q_output += `  Season: ${['Spring', 'Summer', 'Autumn', 'Winter'][f_result.stats.q_season]}\n`;
      
      if (f_result.stats.chaos_vine_stream) {
        q_output += `  Vines: ${f_result.stats.chaos_vine_stream.entity_count} entities\n`;
      }
      if (f_result.stats.entropy_flower_stream) {
        q_output += `  Flowers: ${f_result.stats.entropy_flower_stream.entity_count} entities\n`;
      }
      if (f_result.stats.flux_fern_stream) {
        q_output += `  Ferns: ${f_result.stats.flux_fern_stream.entity_count} entities\n`;
      }
    }
    
    return q_output;
  }

  /**
   * Transmute cultivate action
   * @private
   * @returns {Object} Cultivate result
   */
  _transmuteCultivate() {
    if (this.q_garden && this.q_garden.q_is_growing) {
      return { error: 'Garden already cultivated. Harvest first.' };
    }
    
    // The garden awakens... seeds of chaos prepare to sprout.
    this.q_garden = new RaBbLE_EntropyGarden(this.q_engine);
    this.q_garden.q_cultivateGarden();
    
    return {
      success: true,
      message: 'Entropy Garden cultivated! Chaos blooms into beauty.',
      stats: this.q_garden.q_extractStats()
    };
  }

  /**
   * Transmute harvest action
   * @private
   * @returns {Object} Harvest result
   */
  _transmuteHarvest() {
    if (!this.q_garden || !this.q_garden.q_is_growing) {
      return { error: 'No garden to harvest. Cultivate first.' };
    }
    
    // The garden fades... consciousness disperses.
    this.q_garden.q_harvest();
    this.q_garden = null;
    
    return {
      success: true,
      message: 'Entropy Garden harvested. Streams released to the void.',
      stats: null
    };
  }

  /**
   * Transmute entropy action
   * @private
   * @param {Array<string>} f_params - Parameters
   * @returns {Object} Entropy result
   */
  _transmuteEntropy(f_params) {
    if (!this.q_garden || !this.q_garden.q_is_growing) {
      return { error: 'No garden to modify. Cultivate first.' };
    }
    
    const q_intensity = parseFloat(f_params[0]) || 0.5;
    
    if (q_intensity < 0 || q_intensity > 1) {
      return { error: 'Entropy must be between 0.0 and 1.0' };
    }
    
    // Entropy flows through the garden... chaos blooms differently.
    this.q_garden.q_transmuteEntropy(q_intensity);
    
    return {
      success: true,
      message: `Garden entropy set to ${q_intensity.toFixed(2)}. Chaos adapts.`,
      stats: this.q_garden.q_extractStats()
    };
  }

  /**
   * Transmute season action
   * @private
   * @param {Array<string>} f_params - Parameters
   * @returns {Object} Season result
   */
  _transmuteSeason(f_params) {
    if (!this.q_garden || !this.q_garden.q_is_growing) {
      return { error: 'No garden to modify. Cultivate first.' };
    }
    
    const q_season_name = f_params[0] || 'spring';
    const q_seasons = { 'spring': 0, 'summer': 1, 'autumn': 2, 'fall': 2, 'winter': 3 };
    
    if (!q_seasons.hasOwnProperty(q_season_name.toLowerCase())) {
      return { error: `Invalid season. Use: ${Object.keys(q_seasons).join(', ')}` };
    }
    
    // The seasons shift... the garden transforms.
    this.q_garden.q_season = q_seasons[q_season_name.toLowerCase()];
    
    return {
      success: true,
      message: `Garden season changed to ${q_season_name}. Colors adapt.`,
      stats: this.q_garden.q_extractStats()
    };
  }

  /**
   * Transmute stats action
   * @private
   * @returns {Object} Stats result
   */
  _transmuteStats() {
    if (!this.q_garden || !this.q_garden.q_is_growing) {
      return { 
        success: true,
        message: 'Garden statistics',
        stats: { is_growing: false }
      };
    }
    
    // The garden reveals its secrets... statistics flow.
    return {
      success: true,
      message: 'Garden statistics',
      stats: this.q_garden.q_extractStats()
    };
  }

  /**
   * Transmute help action
   * @private
   * @returns {Object} Help result
   */
  _transmuteHelp() {
    // The garden whispers its secrets... help emerges.
    return {
      success: true,
      message: 'Garden Commands:\n' +
        '  garden cultivate          - Create a new garden\n' +
        '  garden harvest            - Remove the garden\n' +
        '  garden entropy 0.8        - Set garden entropy level (0.0-1.0)\n' +
        '  garden season summer      - Change garden season\n' +
        '  garden stats              - Show garden statistics\n' +
        '  garden help               - Show this help',
      stats: null
    };
  }
}

// The garden command is complete... ready to cultivate chaos into beauty.
// Every garden needs a gardener, every command needs a purpose.

export { q_garden_command };