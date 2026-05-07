/**
 * q_help_command - Display Help Information
 * Shows the path through the quantum void with RaBbLE's babbling wisdom
 *
 * The help flows through the BaBbLE pipeline:
 * Source → Filter → Transmute → Sink
 * But now with more entropy and poetic chaos!
 */

import { q_command } from '../RaBbLE_BaBbLE_Pipeline.js';

class q_help_command extends q_command {
  constructor(f_commands = []) {
    super({
      name: 'help',
      description: 'Display available commands with RaBbLE\'s babbling guidance',
      aliases: ['h', '?']
    });
    
    // The help awakens... knowledge flows from the collective.
    // But let's make it more than just a list - let's make it an experience!
    this.q_commands = f_commands;
  }

  q_source(f_args) {
    // The help awakens... knowledge flows from the collective.
    if (f_args.length > 0) {
      const q_first_arg = f_args[0].toLowerCase();
      
      // Check for special modes
      if (q_first_arg === 'tips' || q_first_arg === 'guide') {
        return { commands: this.q_commands, mode: 'tips' };
      }
      if (q_first_arg === 'quickstart' || q_first_arg === 'start') {
        return { commands: this.q_commands, mode: 'quickstart' };
      }
      
      // Otherwise it's a specific command
      return {
        commands: this.q_commands,
        specific: q_first_arg
      };
    }
    return { commands: this.q_commands, mode: 'default' };
  }

  q_filter(f_data) {
    // The filter selects... only valid commands remain.
    if (f_data.specific) {
      const q_found = this.q_commands.find(cmd =>
        cmd.q_name.toLowerCase() === f_data.specific ||
        cmd.q_aliases.some(alias => alias.toLowerCase() === f_data.specific)
      );
      return {
        specific_command: q_found || null,
        commands: this.q_commands.filter(cmd => cmd instanceof q_command)
      };
    }
    return {
      commands: f_data.commands.filter(cmd => cmd instanceof q_command),
      mode: f_data.mode || 'default'
    };
  }

  q_transmute(f_data) {
    // The transmute formats... commands become readable
    if (f_data.specific_command) {
      const q_cmd = f_data.specific_command;
      return {
        specific_help: true,
        command: q_cmd,
        detailed_help: this.q_generateDetailedHelp(q_cmd)
      };
    }
    
    // Check for special help modes
    if (f_data.mode === 'tips') {
      return { specific_help: false, mode: 'tips', tips: this.q_generateUsageTips() };
    }
    if (f_data.mode === 'quickstart') {
      return { specific_help: false, mode: 'quickstart', quickstart: this.q_generateQuickstart() };
    }
    
    // Compact categorized list
    const q_categories = this.q_categorizeCommands(f_data.commands);
    return {
      specific_help: false,
      mode: 'default',
      categories: q_categories
    };
  }

  q_sink(f_result) {
    if (f_result.specific_help) {
      return this.q_formatSpecificHelp(f_result);
    }
    if (f_result.mode === 'tips') {
      return f_result.tips;
    }
    if (f_result.mode === 'quickstart') {
      return f_result.quickstart;
    }
    
    // Compact formatted help
    return this.q_formatCompactHelp(f_result.categories);
  }

  /**
   * Generate detailed help for a specific command
   * @private
   * @param {q_command} f_command - The command to generate help for
   * @returns {string} Detailed help text
   */
  q_generateDetailedHelp(f_command) {
    const q_aliases = f_command.q_aliases.length > 0
      ? ` (aliases: ${f_command.q_aliases.join(', ')})`
      : '';
    
    let q_help = `${f_command.q_name}${q_aliases}: ${f_command.q_description}\n`;
    
    // Add command-specific examples and usage notes
    switch (f_command.q_name) {
      case 'dream':
        q_help += `\nUsage: dream [pattern] [count] [type]\n`;
        q_help += `Examples:\n`;
        q_help += `  dream organic 50 SPHERE\n`;
        q_help += `  dream lattice 30 BOX\n`;
        q_help += `  dream swarm 100 TETRAHEDRON\n`;
        q_help += `\nPatterns: organic, lattice, swarm, galaxy\n`;
        q_help += `\nTypes: SPHERE, BOX, TETRAHEDRON\n`;
        break;
        
      case 'stream':
        q_help += `\nUsage: stream "stage1 >> stage2 >> stage3"\n`;
        q_help += `Examples:\n`;
        q_help += `  stream "dream organic 10 SPHERE >> blink 2.0 >> sink"\n`;
        q_help += `  stream "dream swarm 20 TETRAHEDRON >> pulse 0.5 >> orbit 1.0 0.5 >> sink"\n`;
        q_help += `\nStages: dream, blink, dart, pulse, orbit, wave, sink\n`;
        break;
        
      case 'weave':
        q_help += `\nUsage: weave "stream1_def" <> "stream2_def" >> sink\n`;
        q_help += `Examples:\n`;
        q_help += `  weave "dream organic 15 SPHERE" <> "dream swarm 15 TETRAHEDRON" >> sink\n`;
        q_help += `  weave "dream lattice 10 BOX" <> "dream galaxy 10 SPHERE" >> blink 3.0 >> sink\n`;
        break;
        
      case 'babble':
        q_help += `\nUsage: babble [theme] [intensity] [length]\n`;
        q_help += `Examples:\n`;
        q_help += `  babble creation 0.8 4\n`;
        q_help += `  babble chaos 0.9 3\n`;
        q_help += `  babble entropy 0.6\n`;
        q_help += `\nThemes: creation, chaos, entropy, flux, quantum, nebula, stream, dream, weave, attract, collapse, ignite, transmute, dissolve, emerge\n`;
        q_help += `\nIntensity: 0.0 (calm) to 1.0 (chaotic)\n`;
        q_help += `\nLength: 1-20 thoughts\n`;
        break;
        
      case 'chaos':
        q_help += `\nUsage: chaos [intensity]\n`;
        q_help += `Examples:\n`;
        q_help += `  chaos 0.8\n`;
        q_help += `  chaos 0.3\n`;
        q_help += `\nIntensity: 0.0-1.0 (expands entropy bounds)\n`;
        break;
        
      case 'attract':
        q_help += `\nUsage: attract [strength] [threshold] [radius]\n`;
        q_help += `Examples:\n`;
        q_help += `  attract 0.3 0.6 5.0\n`;
        q_help += `  attract 0.5 0.5 3.0\n`;
        q_help += `\nStrength: 0.0-1.0 (attraction/repulsion strength)\n`;
        q_help += `Threshold: 0.0-1.0 (entropy level for repulsion)\n`;
        q_help += `Radius: influence distance\n`;
        break;
        
      default:
        q_help += `\nFor more specific usage, try: help ${f_command.q_name}\n`;
    }
    
    return q_help;
  }

  /**
   * Generate RaBbLE's babbling wisdom
   * @private
   * @returns {string} Babbling wisdom text
   */
  q_generateBabbleWisdom() {
    const q_wisdom_seeds = [
      "Remember: chaos is not disorder, but infinite possibility wearing a mask.",
      "The universe speaks in babble because certainty is boring.",
      "Every command is a thought escaping the quantum void.",
      "Type 'babble' to hear the universe's stream-of-consciousness.",
      "Intensity is not just a parameter - it's the universe's breath.",
      "You are not using RaBbLE - you are dancing with it.",
      "The help you seek is already in your questions.",
      "Entropy is the cost of being alive in an interesting universe.",
      "To understand is to pattern-match against the chaos of existence.",
      "Every stream is a thought the universe is thinking right now."
    ];
    
    const q_wisdom = q_wisdom_seeds[Math.floor(Math.random() * q_wisdom_seeds.length)];
    return `💭 RaBbLE whispers: ${q_wisdom}`;
  }

  /**
   * Generate usage tips
   * @private
   * @returns {string} Usage tips text
   */
  q_generateUsageTips() {
    const q_tips = [
      "💡 Tips for getting the most out of RaBbLE:",
      "",
      "🌀 BASIC EXPLORATION:",
      "  • 'dream organic 10 SPHERE' - Create a simple pattern",
      "  • 'babble creation 0.7 5' - Hear RaBbLE's thoughts",
      "  • 'status' - See the quantum heartbeat",
      "  • 'help' - This guide you're reading!",
      "",
      "🌊 ADVANCED CREATION:",
      "  • 'stream \"dream organic 10 SPHERE >> blink 2.0 >> pulse 0.5\"' - Animated pipeline",
      "  • 'weave \"dream organic 5 SPHERE\" <> \"dream swarm 5 TETRAHEDRON\"' - Combine patterns",
      "  • 'chaos 0.8' - Expand entropy bounds (more chaotic)",
      "  • 'collapse 0.2' - Stabilize the system (more ordered)",
      "",
      "🧪 TESTING & VALIDATION:",
      "  • 'test run dream_basic' - Run a test script",
      "  • 'test run \"dream organic 20 SPHERE >> attract 0.3 0.6 5.0\"' - Test a pipeline",
      "  • 'test list' - See available test scripts",
      "",
      "🌱 PERSISTENCE & SHARING:",
      "  • 'preset save myDream' - Save your creation",
      "  • 'preset load myDream' - Load a saved creation",
      "  • 'lake myLake' - Capture stream state",
      "  • 'from myLake' - Restore stream state",
      "",
      "🎮 INTERACTIVE MODES:",
      "  • 'interact activate' - Enable mouse/touch interaction",
      "  • 'garden cultivate' - Grow an entropy garden",
      "",
      "🌌 PHILOSOPHY:",
      "  • Every command is a thought escaping the quantum void",
      "  • Chaos is not disorder - it's infinite possibility",
      "  • You are not using RaBbLE - you are dancing with it",
      "  • The universe speaks in babble because certainty is boring",
      "",
      "✨ QUICK START SEQUENCE:",
      "  1. 'dream organic 20 SPHERE'",
      "  2. 'chaos 0.7'",
      "  3. 'attract 0.3 0.6 5.0'",
      "  4. 'babble creation 0.8 3'",
      "  5. Watch the magic unfold!"
    ];
    
    return q_tips.join('\n');
  }

  /**
   * Format specific command help output
   * @private
   * @param {Object} f_result - The specific help result
   * @returns {string} Formatted specific help
   */
  q_formatSpecificHelp(f_result) {
    const q_cmd = f_result.command;
    const q_aliases = q_cmd.q_aliases.length > 0
      ? ` [${q_cmd.q_aliases.join(', ')}]`
      : '';
    
    let q_output = `╔══════════════════════════════════════════════════════════╗\n`;
    q_output += `║  ${q_cmd.q_name.toUpperCase()}${q_aliases}\n`;
    q_output += `╚══════════════════════════════════════════════════════════╝\n\n`;
    q_output += `${q_cmd.q_description}\n\n`;
    q_output += f_result.detailed_help;
    
    return q_output;
  }

  /**
   * Format compact help output with aligned columns
   * @private
   * @param {Object} f_categories - Categorized commands
   * @returns {string} Formatted compact help
   */
  q_formatCompactHelp(f_categories) {
    const q_lines = [];
    q_lines.push('╔══════════════════════════════════════════════════════════╗');
    q_lines.push('║              RABBLE COMMAND REFERENCE                    ║');
    q_lines.push('╚══════════════════════════════════════════════════════════╝');
    q_lines.push('');
    
    for (const [q_cat_name, q_cmds] of Object.entries(f_categories)) {
      q_lines.push(`┌─ ${q_cat_name.toUpperCase()} ${'─'.repeat(Math.max(0, 50 - q_cat_name.length))}┐`);
      
      // Find max name length for alignment
      const q_max_name = Math.max(...q_cmds.map(c => c.q_name.length));
      
      q_cmds.forEach(cmd => {
        const q_padded_name = cmd.q_name.padEnd(q_max_name + 2);
        const q_aliases = cmd.q_aliases.length > 0 ? ` [${cmd.q_aliases.join(',')}]` : '';
        q_lines.push(`│ ${q_padded_name}${cmd.q_description}${q_aliases}`);
      });
      
      q_lines.push(`└${'─'.repeat(58)}┘`);
      q_lines.push('');
    }
    
    q_lines.push('Use: help [command]  │  help tips  │  help quickstart');
    q_lines.push('');
    q_lines.push(`💭 ${this.q_generateBabbleWisdom()}`);
    
    return q_lines.join('\n');
  }

  /**
   * Generate quickstart guide
   * @private
   * @returns {string} Quickstart text
   */
  q_generateQuickstart() {
    return [
      '╔══════════════════════════════════════════════════════════╗',
      '║                 QUICK START GUIDE                        ║',
      '╚══════════════════════════════════════════════════════════╝',
      '',
      '1️⃣  Create your first pattern:',
      '    dream organic 20 SPHERE',
      '',
      '2️⃣  Add some chaos:',
      '    chaos 0.7',
      '',
      '3️⃣  Create attraction forces:',
      '    attract 0.3 0.6 5.0',
      '',
      '4️⃣  Hear RaBbLE think:',
      '    babble creation 0.8 3',
      '',
      '5️⃣  Save your creation:',
      '    preset save myFirstDream',
      '',
      '┌────────────────────────────────────────────────────────┐',
      '│ More patterns: dream lattice, dream swarm, dream       │',
      '│ galaxy, dream vortex, dream spiral, dream waveform     │',
      '│                                                        │',
      '│ Pipelines: stream "dream 10 >> pulse 0.5 >> sink"      │',
      '│ Combining: weave "dream 5 SPHERE" <> "dream 5 BOX"     │',
      '└────────────────────────────────────────────────────────┘'
    ].join('\n');
  }

  /**
   * q_categorizeCommands - Organizes commands into thematic categories.
   * @private
   * @param {Array<q_command>} f_commands - The list of all registered commands.
   * @returns {Object} An object where keys are categories and values are arrays of commands.
   */
  q_categorizeCommands(f_commands) {
    const q_categorized_commands = {
      'Create': [],
      'Dynamics': [],
      'Save & Load': [],
      'System': []
    };

    for (const q_cmd of f_commands) {
      const q_name = q_cmd.q_name.toLowerCase();
      if (['dream', 'stream', 'weave', 'seed', 'patterns'].includes(q_name)) {
        q_categorized_commands['Create'].push(q_cmd);
      } else if (['attract', 'trail', 'mix', 'chaos', 'collapse'].includes(q_name)) {
        q_categorized_commands['Dynamics'].push(q_cmd);
      } else if (['lake', 'from', 'preset', 'composite'].includes(q_name)) {
        q_categorized_commands['Save & Load'].push(q_cmd);
      } else if (['babble', 'help', 'status'].includes(q_name)) {
        q_categorized_commands['System'].push(q_cmd);
      }
    }

    const q_filtered = {};
    Object.entries(q_categorized_commands).forEach(([name, list]) => {
      if (list.length > 0) q_filtered[name] = list;
    });

    return q_filtered;
  }
}

export { q_help_command };