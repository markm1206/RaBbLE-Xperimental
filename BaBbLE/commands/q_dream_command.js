/**
 * q_dream_command - Dream Pattern Generator
 * Creates quantum streams through the Dreamer API
 * 
 * The dream flows through the BaBbLE pipeline:
 * Source → Filter → Transmute → Sink
 */

import { q_command } from '../RaBbLE_BaBbLE_Pipeline.js';

class q_dream_command extends q_command {
  constructor(f_engine) {
    super({
      name: 'dream',
      description: 'Create quantum streams with Dreamer patterns',
      aliases: ['d', 'create']
    });
    
    // The dreamer awakens... patterns emerge from the quantum foam.
    this.q_engine = f_engine;
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
    // Create the stream through the engine
    let q_stream;
    
    switch (f_params.pattern) {
      case 'organic':
        q_stream = this.q_engine.createOrganicStream(f_params.count, f_params.type);
        break;
      case 'lattice':
        q_stream = this.q_engine.createLatticeStream(f_params.count, f_params.type);
        break;
      case 'swarm':
        q_stream = this.q_engine.createSwarmStream(f_params.count, f_params.type);
        break;
      case 'galaxy':
        q_stream = this.q_engine.createGalaxyStream(f_params.count, f_params.type);
        break;
      default:
        q_stream = this.q_engine.createOrganicStream(f_params.count, f_params.type);
    }
    
    // Route to dream canvas for temporary display
    let q_dream_id = null;
    if (this.q_engine && this.q_engine.canvas_manager && q_stream) {
      q_dream_id = this.q_engine.canvas_manager.q_routeStream(q_stream, 'dream', {
        lifetime: 10 + Math.random() * 20, // 10-30 seconds lifetime
        opacity: 0.7 + Math.random() * 0.3
      });
      console.log(`Dream ${q_dream_id} routed to dream canvas`);
    }
    
    return {
      success: true,
      pattern: f_params.pattern,
      count: f_params.count,
      type: f_params.type,
      stream_id: q_stream ? q_stream.q_stream_id : 'unknown',
      dream_id: q_dream_id,
      message: `Dreamed ${f_params.count} ${f_params.type} entities with ${f_params.pattern} pattern`
    };
  }

  q_sink(f_result) {
    if (f_result.error) {
      return `ERROR: ${f_result.error}`;
    }
    
    // The dream emerges... particles dance in the void.
    let q_output = `[DREAM] ${f_result.message}\n` +
           `  Pattern: ${f_result.pattern}\n` +
           `  Count: ${f_result.count}\n` +
           `  Type: ${f_result.type}\n` +
           `  Stream: ${f_result.stream_id}`;
    
    if (f_result.dream_id) {
      q_output += `\n  Dream ID: ${f_result.dream_id} (temporary, will fade)`;
    }
    
    return q_output;
  }
}

export { q_dream_command };