/**
 * q_patterns_command - List Available Dream Patterns
 * Shows the patterns of creation
 * 
 * The patterns flow through the BaBbLE pipeline:
 * Source → Filter → Transmute → Sink
 */

import { q_command } from '../RaBbLE_BaBbLE_Pipeline.js';

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

export { q_patterns_command };