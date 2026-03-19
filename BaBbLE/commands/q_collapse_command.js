/**
 * q_collapse_command - Stabilize the System
 * Brings calm from chaos with lower entropy
 * 
 * The collapse flows through the BaBbLE pipeline:
 * Source → Filter → Transmute → Sink
 */

import { q_command } from '../RaBbLE_BaBbLE_Pipeline.js';

class q_collapse_command extends q_command {
  constructor(f_engine) {
    super({
      name: 'collapse',
      description: 'Stabilize the system with lower entropy',
      aliases: ['cl', 'stabilize']
    });
    
    // The collapse awakens... stability flows in.
    this.q_engine = f_engine;
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
    this.q_engine.updateShaders({ u_base_intensity: f_params.intensity });
    
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

export { q_collapse_command };