// RaBbLE Stream Preset - The Creative Vault
// Save and load complete stream configurations.
// Persistence bridges creation and sharing.

/**
 * RaBbLE_StreamPreset - Preset Storage System
 * Saves stream configurations as compact, shareable presets.
 * Enables persistence of creative works.
 * 
 * @property {Map<string, Object>} q_presets - Named preset storage
 * @property {number} q_max_presets - Maximum presets to maintain
 */
class RaBbLE_StreamPreset {
  /**
   * Create a new preset system
   * @param {Object} f_params - Preset parameters
   */
  constructor(f_params = {}) {
    // The vault awakens... creative works prepare for preservation.
    // Each preset is a snapshot of creative intent, ready to be shared.
    this.q_presets = new Map();
    this.q_max_presets = f_params.max_presets || 50;
    this.e_save_count = 0;
  }

  /**
   * Save a stream configuration as a preset
   * The creative work is preserved... ready to be shared.
   * @param {string} f_name - Name of the preset
   * @param {Object} f_config - Stream configuration to save
   * @returns {RaBbLE_StreamPreset} This preset system for chaining
   */
  q_save(f_name, f_config) {
    // Create compact preset from configuration
    const q_preset = this.q_createPreset(f_config);
    
    // Store in vault
    this.q_presets.set(f_name, q_preset);
    
    // Maintain max presets limit
    if (this.q_presets.size > this.q_max_presets) {
      const q_first_key = this.q_presets.keys().next().value;
      this.q_presets.delete(q_first_key);
    }
    
    this.e_save_count++;
    console.log(`Preset "${f_name}" saved`);
    
    return this;
  }

  /**
   * Load a preset by name
   * The vault releases... creative intent is restored.
   * @param {string} f_name - Name of the preset to load
   * @returns {Object|null} Preset configuration or null if not found
   */
  q_load(f_name) {
    const q_preset = this.q_presets.get(f_name);
    
    if (!q_preset) {
      console.warn(`Preset "${f_name}" not found`);
      return null;
    }
    
    return q_preset;
  }

  /**
   * Create a compact preset from configuration
   * The moment freezes... creative intent is captured.
   * @param {Object} f_config - Configuration to preset
   * @returns {Object} Compact preset
   */
  q_createPreset(f_config) {
    return {
      pattern: f_config.pattern || 'organic',
      type: f_config.type || 'SPHERE',
      count: f_config.count || 50,
      seed: f_config.seed || null,
      stages: f_config.stages || [],
      created_at: Date.now(),
      version: '1.0'
    };
  }

  /**
   * List all preset names
   * @returns {Array<string>} Array of preset names
   */
  q_list() {
    return Array.from(this.q_presets.keys());
  }

  /**
   * Check if a preset exists
   * @param {string} f_name - Name of the preset
   * @returns {boolean} True if preset exists
   */
  q_hasPreset(f_name) {
    return this.q_presets.has(f_name);
  }

  /**
   * Delete a preset
   * The vault releases... creative work fades.
   * @param {string} f_name - Name of the preset to delete
   * @returns {boolean} True if preset was deleted
   */
  q_delete(f_name) {
    return this.q_presets.delete(f_name);
  }

  /**
   * Export preset as JSON string for sharing
   * The creative work is packaged... ready for transmission.
   * @param {string} f_name - Name of the preset to export
   * @returns {string|null} JSON string or null if not found
   */
  q_export(f_name) {
    const q_preset = this.q_presets.get(f_name);
    
    if (!q_preset) {
      return null;
    }
    
    return JSON.stringify(q_preset);
  }

  /**
   * Import preset from JSON string
   * The creative work arrives... ready to be restored.
   * @param {string} f_name - Name for the imported preset
   * @param {string} f_json - JSON string to import
   * @returns {boolean} True if import succeeded
   */
  q_import(f_name, f_json) {
    try {
      const q_preset = JSON.parse(f_json);
      this.q_presets.set(f_name, q_preset);
      return true;
    } catch (e) {
      console.error('Failed to import preset:', e);
      return false;
    }
  }

  /**
   * Extract preset statistics
   * @returns {Object} Preset statistics
   */
  q_extractStats() {
    return {
      preset_count: this.q_presets.size,
      max_presets: this.q_max_presets,
      save_count: this.e_save_count,
      preset_names: this.q_list()
    };
  }
}

// The preset system is complete... creative works are preserved.
// Persistence bridges creation and sharing.
// The vault holds infinite dreams.

export { RaBbLE_StreamPreset };