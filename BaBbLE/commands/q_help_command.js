/**
 * q_help_command - Display Help Information
 * Shows the path through the quantum void
 * 
 * The help flows through the BaBbLE pipeline:
 * Source → Filter → Transmute → Sink
 */

import { q_command } from '../RaBbLE_BaBbLE_Pipeline.js';

class q_help_command extends q_command {
  constructor(f_commands = []) {
    super({
      name: 'help',
      description: 'Display available commands',
      aliases: ['h', '?']
    });
    
    // The help awakens... knowledge flows from the collective.
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

export { q_help_command };