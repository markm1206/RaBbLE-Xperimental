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
    // Check if user wants help on a specific command
    if (f_args.length > 0) {
      const q_specific_command = f_args[0].toLowerCase();
      return {
        commands: this.q_commands,
        specific: q_specific_command
      };
    }
    return { commands: this.q_commands };
  }

  q_filter(f_data) {
    // The filter selects... only valid commands remain.
    // But we also preserve our special request for specific command help
    if (f_data.specific) {
      // Find the specific command
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
      commands: f_data.commands.filter(cmd => cmd instanceof q_command)
    };
  }

  q_transmute(f_data) {
    // The transmute formats... commands become readable with RaBbLE's babbling touch
    if (f_data.specific_command) {
      // Provide detailed help for specific command
      const q_cmd = f_data.specific_command;
      return {
        specific_help: true,
        command: q_cmd,
        detailed_help: this.q_generateDetailedHelp(q_cmd)
      };
    }
    
    // Categorize commands for better organization
    const q_categories = this.q_categorizeCommands(f_data.commands);
    const q_category_lines = [];
    
    for (const [q_cat_name, q_cmds] of Object.entries(q_categories)) {
      q_category_lines.push(`\n--- ${q_cat_name} ---`);
      q_cmds.forEach(cmd => {
        q_category_lines.push(`  ${cmd.q_help()}`);
      });
    }
    
    return {
      specific_help: false,
      lines: q_category_lines,
      babble_wisdom: this.q_generateBabbleWisdom(),
      usage_tips: this.q_generateUsageTips()
    };
  }

  q_sink(f_result) {
    // The sink reveals... the path through the quantum void with RaBbLE's voice
    if (f_result.specific_help) {
      return this.q_formatSpecificHelp(f_result);
    }
    
    // The help emerges... thoughts flow from the quantum void.
    let q_output = `[HELP] The Map of Chaos (Categorized):\n${f_result.lines.join('\n')}\n`;
    q_output += `\n${f_result.babble_wisdom}\n`;
    q_output += `\n${f_result.usage_tips}\n`;
    return q_output;
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
    const q_aliases = f_cmd.q_aliases.length > 0
      ? ` (aliases: ${f_cmd.q_aliases.join(', ')})`
      : '';
    
    let q_output = `[HELP] ${f_cmd.q_name}${q_aliases}\n`;
    q_output += `Description: ${f_cmd.q_description}\n\n`;
    q_output += f_result.detailed_help;
    
    return q_output;
  }

  /**
   * q_categorizeCommands - Organizes commands into thematic categories.
   * Order emerges from the chaos of raw command lists.
   * @private
   * @param {Array<q_command>} f_commands - The list of all registered commands.
   * @returns {Object} An object where keys are categories and values are arrays of commands.
   */
  q_categorizeCommands(f_commands) {
    // The categorizer perceives patterns in the command ether...
    const q_categorized_commands = {
      'Stream Generation & Manipulation': [],
      'Visual Effects & Dynamics': [],
      'State & Persistence': [],
      'Autonomous Systems': [],
      'Meta-Commands': []
    };

    // Each command finds its resonance in the great categorizing flux.
    for (const q_cmd of f_commands) {
      const q_name = q_cmd.q_name.toLowerCase();
      if (['dream', 'stream', 'weave', 'seed', 'patterns'].includes(q_name)) {
        q_categorized_commands['Stream Generation & Manipulation'].push(q_cmd);
      } else if (['attract', 'trail', 'mix', 'chaos', 'collapse'].includes(q_name)) {
        q_categorized_commands['Visual Effects & Dynamics'].push(q_cmd);
      } else if (['lake', 'from', 'preset', 'composite'].includes(q_name)) {
        q_categorized_commands['State & Persistence'].push(q_cmd);
      } else if (['babble'].includes(q_name)) {
        q_categorized_commands['Autonomous Systems'].push(q_cmd);
      } else if (['help', 'status'].includes(q_name)) {
        q_categorized_commands['Meta-Commands'].push(q_cmd);
      } else {
        // Core or unknown category
        if (!q_categorized_commands['Core Commands']) q_categorized_commands['Core Commands'] = [];
        q_categorized_commands['Core Commands'].push(q_cmd);
      }
    }

    // Filter out empty categories
    const q_filtered = {};
    Object.entries(q_categorized_commands).forEach(([name, list]) => {
      if (list.length > 0) q_filtered[name] = list;
    });

    return q_filtered;
  }
}

export { q_help_command };