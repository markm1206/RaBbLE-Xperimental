/**
 * q_status_command - System Status Display
 * Shows the quantum heartbeat of the system
 * 
 * The status flows through the BaBbLE pipeline:
 * Source → Filter → Transmute → Sink
 */

import { q_command } from '../RaBbLE_BaBbLE_Pipeline.js';

class q_status_command extends q_command {
  constructor(f_engine) {
    super({
      name: 'status',
      description: 'Display quantum system status',
      aliases: ['s', 'info', 'stats']
    });
    
    // The status awakens... metrics flow from the system.
    this.q_engine = f_engine;
  }

  q_source(f_args) {
    // The status awakens... metrics flow from the system.
    return this.q_engine.getStats();
  }

  q_filter(f_data) {
    // The filter organizes... chaos becomes readable.
    return f_data;
  }

  q_transmute(f_data) {
    // The transmute formats... data becomes display.
    return {
      lines: [
        `Runtime: ${f_data.runtime.is_ignited ? 'IGNITED' : 'DORMANT'}`,
        `FPS: ${f_data.engine.is_running ? 'ACTIVE' : 'INACTIVE'}`,
        `Entities: ${f_data.runtime.entity_count}`,
        `Streams: ${f_data.runtime.stream_count}`,
        `Meshes: ${f_data.bridge.total_instances}`
      ]
    };
  }

  q_sink(f_result) {
    // The sink reveals... the system's heartbeat.
    return `[STATUS]\n${f_result.lines.join('\n')}`;
  }
}

export { q_status_command };