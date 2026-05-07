/**
 * q_chaos_command - Expand Entropy Bounds
 * Ignites the furnace for more dynamic visuals
 * 
 * The chaos flows through the BaBbLE pipeline:
 * Source → Filter → Transmute → Sink
 */

import { q_command } from '../RaBbLE_BaBbLE_Pipeline.js';

class q_chaos_command extends q_command {
  constructor(f_engine) {
    super({
      name: 'chaos',
      description: 'Expand entropy bounds for more dynamic visuals',
      aliases: ['c', 'expand']
    });
    
    // The chaos awakens... entropy bounds expand.
    this.q_engine = f_engine;
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
    this.q_engine.updateShaders({ u_base_intensity: f_params.intensity });
    
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

export { q_chaos_command };