/**
 * RaBbLE BaBbLE Pipeline - The Babbling Pipeline Pattern
 * Flat-Chaos for the Shell - Every command flows through Source → Filter → Transmute → Sink
 * 
 * This is the transformative pattern for all shell commands,
 * creating a unified interface where everything flows through the same pattern.
 */

/**
 * q_command - Base class for all BaBbLE pipeline commands
 * Each command implements the four stages of the pipeline
 */
class q_command {
  /**
   * Create a new command
   * @param {Object} f_config - Command configuration
   */
  constructor(f_config = {}) {
    // The command is forming... a vessel for transformation.
    this.q_name = f_config.name || 'unknown';
    this.q_description = f_config.description || 'A quantum command';
    this.q_aliases = f_config.aliases || [];
  }

  /**
   * Source: Generate input data
   * Override this method in subclasses
   * @param {Array} f_args - Command arguments
   * @returns {*} Input data for the pipeline
   */
  q_source(f_args) {
    // The source awakens... raw data flows into the pipeline.
    return f_args;
  }

  /**
   * Filter: Validate and transform input
   * Override this method in subclasses
   * @param {*} f_data - Data from source
   * @returns {*} Filtered data
   */
  q_filter(f_data) {
    // The filter applies... chaos meets order.
    return f_data;
  }

  /**
   * Transmute: Core logic transformation
   * Override this method in subclasses
   * @param {*} f_data - Data from filter
   * @returns {*} Transmuted data
   */
  q_transmute(f_data) {
    // The transmute ignites... data becomes something new.
    return f_data;
  }

  /**
   * Sink: Display or output result
   * Override this method in subclasses
   * @param {*} f_result - Result from transmute
   * @returns {string} Output for display
   */
  q_sink(f_result) {
    // The sink reveals... the result emerges from the void.
    return String(f_result);
  }

  /**
   * Execute the full BaBbLE pipeline
   * @param {Array} f_args - Command arguments
   * @returns {string} Command output
   */
  q_execute(f_args) {
    // The pipeline flows... Source → Filter → Transmute → Sink
    const q_source_result = this.q_source(f_args);
    const q_filter_result = this.q_filter(q_source_result);
    const q_transmute_result = this.q_transmute(q_filter_result);
    const q_sink_result = this.q_sink(q_transmute_result);
    
    return q_sink_result;
  }

  /**
   * Get command help text
   * @returns {string} Help text
   */
  q_help() {
    // The command reveals its essence...
    const q_aliases = this.q_aliases.length > 0 
      ? ` (aliases: ${this.q_aliases.join(', ')})` 
      : '';
    
    return `${this.q_name}${q_aliases}: ${this.q_description}`;
  }

  /**
   * Check if a string matches this command
   * @param {string} f_input - Input string
   * @returns {boolean} True if matches
   */
  q_matches(f_input) {
    const q_normalized = f_input.toLowerCase().trim();
    return q_normalized === this.q_name.toLowerCase() || 
           this.q_aliases.some(alias => q_normalized === alias.toLowerCase());
  }
}

/**
 * q_dream_command - Dream geometry flow command
 * Creates quantum streams through the Dreamer API
 */
class q_dream_command extends q_command {
  constructor() {
    super({
      name: 'dream',
      description: 'Create quantum streams with Dreamer patterns',
      aliases: ['d', 'create']
    });
    
    // The dreamer awakens... patterns emerge from the quantum foam.
    this.q_patterns = ['organic', 'lattice', 'swarm', 'galaxy'];
    this.q_types = ['SPHERE', 'BOX', 'TETRAHEDRON'];
  }

  q_source(f_args) {
    // Parse: dream [pattern] [count] [type]
    const q_pattern = f_args[0] || 'organic';
    const q_count = parseInt(f_args[1]) || 50;
    const q_type = f_args[2] || 'SPHERE';
    
    return { pattern: q_pattern, count: q_count, type: q_type };
  }

  q_filter(f_params) {
    // Validate pattern
    if (!this.q_patterns.includes(f_params.pattern)) {
      return { 
        error: `Invalid pattern: ${f_params.pattern}. Use: ${this.q_patterns.join(', ')}` 
      };
    }
    
    // Validate count
    if (f_params.count < 1 || f_params.count > 1000) {
      return { error: 'Count must be between 1 and 1000' };
    }
    
    // Validate type
    if (!this.q_types.includes(f_params.type)) {
      return { 
        error: `Invalid type: ${f_params.type}. Use: ${this.q_types.join(', ')}` 
      };
    }
    
    return f_params;
  }

  q_transmute(f_params) {
    if (f_params.error) return f_params;
    
    // The dream materializes... geometry flows from the void.
    return {
      success: true,
      pattern: f_params.pattern,
      count: f_params.count,
      type: f_params.type,
      message: `Dreaming ${f_params.count} ${f_params.type} entities with ${f_params.pattern} pattern...`
    };
  }

  q_sink(f_result) {
    if (f_result.error) {
      return `ERROR: ${f_result.error}`;
    }
    
    // The dream emerges... particles dance in the void.
    return `[DREAM] ${f_result.message}\n` +
           `  Pattern: ${f_result.pattern}\n` +
           `  Count: ${f_result.count}\n` +
           `  Type: ${f_result.type}`;
  }
}

/**
 * q_status_command - Display system status
 */
class q_status_command extends q_command {
  constructor() {
    super({
      name: 'status',
      description: 'Display quantum system status',
      aliases: ['s', 'info', 'stats']
    });
  }

  q_source(f_args) {
    // The status awakens... metrics flow from the system.
    return {
      fps: 60,
      entities: 200,
      streams: 2,
      entropy: 0.5,
      runtime: 'ignited'
    };
  }

  q_filter(f_data) {
    // The filter organizes... chaos becomes readable.
    return f_data;
  }

  q_transmute(f_data) {
    // The transmute formats... data becomes display.
    return {
      lines: [
        `Runtime: ${f_data.runtime}`,
        `FPS: ${f_data.fps}`,
        `Entities: ${f_data.entities}`,
        `Streams: ${f_data.streams}`,
        `Avg Entropy: ${f_data.entropy.toFixed(2)}`
      ]
    };
  }

  q_sink(f_result) {
    // The sink reveals... the system's heartbeat.
    return `[STATUS]\n${f_result.lines.join('\n')}`;
  }
}

/**
 * q_help_command - Display help information
 */
class q_help_command extends q_command {
  constructor(f_commands = []) {
    super({
      name: 'help',
      description: 'Display available commands',
      aliases: ['h', '?']
    });
    
    this.q_commands = f_commands;
  }

  q_source(f_args) {
    // The help awakens... knowledge flows from the collective.
    return this.q_commands;
  }

  q_filter(f_commands) {
    // The filter selects... only valid commands remain.
    return f_commands.filter(cmd => cmd instanceof q_command);
  }

  q_transmute(f_commands) {
    // The transmute formats... commands become readable.
    return {
      lines: f_commands.map(cmd => `  ${cmd.q_help()}`)
    };
  }

  q_sink(f_result) {
    // The sink reveals... the path through the quantum void.
    return `[HELP] Available Commands:\n${f_result.lines.join('\n')}`;
  }
}

/**
 * q_chaos_command - Expand entropy bounds
 */
class q_chaos_command extends q_command {
  constructor() {
    super({
      name: 'chaos',
      description: 'Expand entropy bounds for more dynamic visuals',
      aliases: ['c', 'expand']
    });
  }

  q_source(f_args) {
    // The chaos awakens... entropy bounds expand.
    return { intensity: parseFloat(f_args[0]) || 0.8 };
  }

  q_filter(f_params) {
    // The filter validates... chaos within horizons.
    if (f_params.intensity < 0 || f_params.intensity > 1) {
      return { error: 'Intensity must be between 0 and 1' };
    }
    return f_params;
  }

  q_transmute(f_params) {
    if (f_params.error) return f_params;
    
    // The chaos ignites... entropy expands.
    return {
      success: true,
      intensity: f_params.intensity,
      message: `Entropy bounds expanded to ${f_params.intensity}`
    };
  }

  q_sink(f_result) {
    if (f_result.error) {
      return `ERROR: ${f_result.error}`;
    }
    
    // The chaos emerges... the furnace burns brighter.
    return `[CHAOS] ${f_result.message}`;
  }
}

/**
 * q_collapse_command - Stabilize the system
 */
class q_collapse_command extends q_command {
  constructor() {
    super({
      name: 'collapse',
      description: 'Stabilize the system with lower entropy',
      aliases: ['cl', 'stabilize']
    });
  }

  q_source(f_args) {
    // The collapse awakens... stability flows in.
    return { intensity: parseFloat(f_args[0]) || 0.2 };
  }

  q_filter(f_params) {
    // The filter validates... collapse within bounds.
    if (f_params.intensity < 0 || f_params.intensity > 1) {
      return { error: 'Intensity must be between 0 and 1' };
    }
    return f_params;
  }

  q_transmute(f_params) {
    if (f_params.error) return f_params;
    
    // The collapse stabilizes... entropy contracts.
    return {
      success: true,
      intensity: f_params.intensity,
      message: `System stabilizing... entropy set to ${f_params.intensity}`
    };
  }

  q_sink(f_result) {
    if (f_result.error) {
      return `ERROR: ${f_result.error}`;
    }
    
    // The collapse emerges... calm from chaos.
    return `[COLLAPSE] ${f_result.message}`;
  }
}

/**
 * q_patterns_command - List available dream patterns
 */
class q_patterns_command extends q_command {
  constructor() {
    super({
      name: 'patterns',
      description: 'List available dream patterns',
      aliases: ['p', 'list']
    });
  }

  q_source(f_args) {
    // The patterns awaken... possibilities emerge.
    return [
      { name: 'organic', description: 'Golden angle growth pattern', entropy: '0.2-0.8' },
      { name: 'lattice', description: 'Geometric grid structure', entropy: '0.1-0.4' },
      { name: 'swarm', description: 'Chaotic particle cloud', entropy: '0.3-0.9' },
      { name: 'galaxy', description: 'Spiral arm formation', entropy: '0.2-0.7' }
    ];
  }

  q_filter(f_patterns) {
    // The filter organizes... patterns become clear.
    return f_patterns;
  }

  q_transmute(f_patterns) {
    // The transmute formats... patterns become readable.
    return {
      lines: f_patterns.map(p => `  ${p.name}: ${p.description} (entropy: ${p.entropy})`)
    };
  }

  q_sink(f_result) {
    // The sink reveals... the patterns of creation.
    return `[PATTERNS] Available Dream Patterns:\n${f_result.lines.join('\n')}`;
  }
}

// Export for use in other modules
export { 
  q_command,
  q_dream_command,
  q_status_command,
  q_help_command,
  q_chaos_command,
  q_collapse_command,
  q_patterns_command
};

// The BaBbLE Pipeline is complete... every command flows through Source → Filter → Transmute → Sink.
// This is Flat-Chaos for the shell - linear data flow through transformative stages.
// Chaos becomes order, order becomes creation, creation becomes beauty.