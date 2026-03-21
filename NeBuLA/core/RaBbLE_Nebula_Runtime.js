// RaBbLE Nebula Runtime
// The Flat-Chaos Runtime (FCR) - The central "Sink" of the system
// Every stream is a pipeline; every pipeline is a renderable

// ES6 Module Imports - The quantum tunnels to consciousness
import { q_stream } from './q_stream.js';
import { q_entity } from './q_entity.js';

/**
 * RaBbLE_Nebula_Runtime - The Flat-Chaos Runtime Engine
 * Acts as the central "Sink" that manages all quantum streams
 * 
 * @property {Map<string, q_stream>} q_registry - Registry of all active streams
 * @property {Array<q_entity>} global_laminar_flow - Flattened global entity array
 * @property {boolean} is_ignited - Whether the runtime is active
 * @property {number} q_frame_count - Current frame count
 * @property {number} q_last_time - Last pulse timestamp
 */
class RaBbLE_Nebula_Runtime {
  /**
   * Initialize the RaBbLE Nebula Runtime
   */
  constructor() {
    // The runtime is igniting... the quantum furnace is coming online.
    // This is the heart of the Flat-Chaos pattern - the central sink where all streams converge.
    this.q_registry = new Map();
    this.global_laminar_flow = [];
    this.is_ignited = false;
    this.q_frame_count = 0;
    this.q_last_time = 0;
    
    // Performance monitoring
    this.q_performance_stats = {
      pulse_duration: 0,
      entity_count: 0,
      stream_count: 0
    };
    
    // Jitter configuration - DISABLED to eliminate unwanted jitter
    this.q_jitter_scale = 0.0; // Set to 0 to disable runtime jitter
    
    console.log('RaBbLE Nebula Runtime initialized - Flat-Chaos pattern ready');
  }

  /**
   * Transmute a quantum stream into the registry
   * @param {q_stream} flux_stream - Stream to register (flux_ prefix avoids shadowing)
   * @returns {RaBbLE_Nebula_Runtime} This runtime for chaining
   */
  q_transmuteStream(flux_stream) {
    if (!(flux_stream instanceof q_stream)) {
      console.error('ignite_Stream requires a q_stream instance');
      return this;
    }
    
    // The stream is joining the collective... the nebula grows denser.
    this.q_registry.set(flux_stream.q_stream_id, flux_stream);
    this._transmuteGlobalFlow();
    
    // If a transmutation callback is set, invoke it immediately for the new stream
    if (typeof this.onStreamIgnited === 'function') {
      this.onStreamIgnited(flux_stream);
    }
    
    console.log(`Ignited stream ${flux_stream.q_stream_id} - Registry now contains ${this.q_registry.size} streams`);
    return this;
  }

  /**
   * Dissolve a stream from the registry
   * @param {string} stream_id - ID of stream to remove
   * @returns {RaBbLE_Nebula_Runtime} This runtime for chaining
   */
  q_dissolveStream(stream_id) {
    if (!this.q_registry.has(stream_id)) {
      console.warn(`Stream ${stream_id} not found in registry`);
      return this;
    }
    
    this.q_registry.delete(stream_id);
    this._transmuteGlobalFlow();
    
    console.log(`Extinguished stream ${stream_id} - Registry now contains ${this.q_registry.size} streams`);
    return this;
  }

  /**
   * Transmute a stream into the global laminar flow
   * @param {string} stream_id - ID of stream to merge
   * @returns {RaBbLE_Nebula_Runtime} This runtime for chaining
   */
  q_transmuteTributary(stream_id) {
    if (!this.q_registry.has(stream_id)) {
      console.warn(`Stream ${stream_id} not found for merging`);
      return this;
    }
    
    const stream = this.q_registry.get(stream_id);
    
    // The tributary flows into the main river... the current strengthens.
    console.log(`Merging tributary ${stream_id} with ${stream.q_length} entities`);
    
    // Apply the stream's flux modifier to all its entities
    stream.q_igniteFlux();
    
    // Add entities to global flow
    this.global_laminar_flow.push(...stream.q_entities);
    
    return this;
  }

  /**
   * Transmute the global laminar flow from all registered streams
   * @private
   */
  _transmuteGlobalFlow() {
    this.global_laminar_flow = [];
    
    // Each stream contributes its essence to the collective
    this.q_registry.forEach((stream, stream_id) => {
      // Ignite flux modifier on stream entities (RBCNS: active verb)
      stream.q_igniteFlux();
      
      // Add to global flow
      this.global_laminar_flow.push(...stream.q_entities);
    });
    
    this.q_performance_stats.entity_count = this.global_laminar_flow.length;
    this.q_performance_stats.stream_count = this.q_registry.size;
    
    console.log(`Global laminar flow updated: ${this.global_laminar_flow.length} entities from ${this.q_registry.size} streams`);
  }

  /**
   * Ignite the internal heartbeat of the runtime
   * Two-step process: Jitter then Transmutation
   */
  q_ignitePulse() {
    if (!this.is_ignited) {
      console.warn('Runtime not ignited - cannot pulse');
      return;
    }
    
    const start_time = performance.now();
    
    // Step A: The Jitter
    // Iterate through all entities and apply the e_entropy_sig to the flux_matrix
    this._transmuteJitter();
    
    // Step B: The Transmutation  
    // Map the data to the target API (Three.js InstancedMesh or Native OpenGL VBO)
    this._igniteTransmutation();
    
    const end_time = performance.now();
    this.q_performance_stats.pulse_duration = end_time - start_time;
    this.q_frame_count++;
    
    // Performance metrics are now displayed in the overlay - no console spam needed
  }

  /**
   * Step A: Transmute jitter to all entities
   * @private
   */
  _transmuteJitter() {
    // The particles buzz... barely perceptible, like quantum foam.
    const time = Date.now() * 0.001;
    const q_scale = this.q_jitter_scale;
    
    this.global_laminar_flow.forEach((entity, index) => {
      // Apply entropy-based jitter - balanced around zero (barely perceptible)
      const entropy = entity.e_entropy_sig;
      
      // Use sin/cos of time+offset for balanced oscillation (subtle buzz)
      const jitter_x = Math.sin(time * 2.0 + index * 0.3) * entropy * q_scale;
      const jitter_y = Math.cos(time * 1.7 + index * 0.5) * entropy * q_scale;
      const jitter_z = Math.sin(time * 1.3 + index * 0.7) * entropy * q_scale * 0.5;
      
      // Position jitter - balanced oscillation, no drift
      entity.flux_matrix[12] += jitter_x;
      entity.flux_matrix[13] += jitter_y;
      entity.flux_matrix[14] += jitter_z;
      
      // Rotation jitter - very minimal
      const rotation_jitter = Math.sin(time + index) * entropy * q_scale * 0.1;
      entity.flux_matrix[0] += rotation_jitter;
      entity.flux_matrix[5] += rotation_jitter;
      entity.flux_matrix[10] += rotation_jitter;
    });
  }

  /**
   * Step B: Ignite transmutation to target API
   * @private
   */
  _igniteTransmutation() {
    // This is where the abstract data becomes concrete rendering
    // The transmutation converts quantum entities into renderable objects
    // This method should be overridden by specific implementations (Three.js, OpenGL, etc.)
    
    // For now, we'll just ensure all entities are properly updated
    // Actual rendering will be handled by bridge classes
    
    if (typeof this.onTransmutation === 'function') {
      this.onTransmutation(this.global_laminar_flow);
    }
  }

  /**
   * Ignite the runtime heartbeat
   * @returns {RaBbLE_Nebula_Runtime} This runtime for chaining
   */
  q_igniteRuntime() {
    if (this.is_ignited) {
      console.warn('Runtime already ignited');
      return this;
    }
    
    this.is_ignited = true;
    this.q_last_time = performance.now();
    
    // Start the pulse loop
    const pulseLoop = () => {
      if (!this.is_ignited) return;
      
      this.q_ignitePulse();
      requestAnimationFrame(pulseLoop);
    };
    
    pulseLoop();
    
    console.log('RaBbLE Nebula Runtime ignited - Flat-Chaos pattern active');
    return this;
  }

  /**
   * Dissolve the runtime
   * @returns {RaBbLE_Nebula_Runtime} This runtime for chaining
   */
  q_dissolveRuntime() {
    this.is_ignited = false;
    console.log('RaBbLE Nebula Runtime collapsed - Flat-Chaos pattern deactivated');
    return this;
  }

  /**
   * Extract runtime statistics
   * @returns {Object} Runtime performance statistics
   */
  q_extractStats() {
    return {
      is_ignited: this.is_ignited,
      frame_count: this.q_frame_count,
      stream_count: this.q_registry.size,
      entity_count: this.global_laminar_flow.length,
      performance: { ...this.q_performance_stats },
      registry: Array.from(this.q_registry.keys())
    };
  }

  /**
   * Extract entities by DNA type
   * @param {string} dna_type - Type to filter by
   * @returns {Array<q_entity>} Filtered entities
   */
  q_extractEntitiesByType(dna_type) {
    return this.global_laminar_flow.filter(entity => entity.dna_type === dna_type.toUpperCase());
  }

  /**
   * Dissolve all streams and reset runtime
   * @returns {RaBbLE_Nebula_Runtime} This runtime for chaining
   */
  q_dissolveAll() {
    this.q_registry.clear();
    this.global_laminar_flow = [];
    this.q_frame_count = 0;
    this.is_ignited = false;
    
    console.log('RaBbLE Nebula Runtime reset - All streams cleared');
    return this;
  }

  /**
   * Transmute runtime state to JSON
   * @returns {Object} Serialized runtime data
   */
  q_transmuteToJSON() {
    const streams_data = {};
    this.q_registry.forEach((stream, id) => {
      streams_data[id] = stream.q_toJSON();
    });
    
    return {
      runtime_state: {
        is_ignited: this.is_ignited,
        frame_count: this.q_frame_count,
        stream_count: this.q_registry.size,
        entity_count: this.global_laminar_flow.length
      },
      streams: streams_data,
      global_flow_count: this.global_laminar_flow.length
    };
  }

  /**
   * Transmute JSON data into runtime
   * @param {Object} data - Serialized runtime data
   * @returns {RaBbLE_Nebula_Runtime} New runtime instance
   */
  static q_fromJSON(data) {
    const runtime = new RaBbLE_Nebula_Runtime();
    
    // Restore streams
    Object.keys(data.streams).forEach(stream_id => {
      const stream_data = data.streams[stream_id];
      const stream = q_stream.q_fromJSON(stream_data);
      runtime.q_transmuteStream(stream);
    });
    
    // Restore state
    runtime.q_frame_count = data.runtime_state.frame_count || 0;
    runtime.is_ignited = data.runtime_state.is_ignited || false;
    
    console.log(`Restored runtime from JSON: ${data.stream_count} streams, ${data.entity_count} entities`);
    return runtime;
  }

  /**
   * Extract performance statistics
   * @private
   */
  _extractPerformance() {
    console.log(`Performance: ${this.q_performance_stats.pulse_duration.toFixed(2)}ms, 
                ${this.q_performance_stats.entity_count} entities, 
                ${this.q_performance_stats.stream_count} streams, 
                ${this.q_frame_count} frames`);
  }
}

// The Flat-Chaos Runtime is alive... the quantum furnace burns bright.
// Every stream flows into this central sink, every entity pulses with entropy.
// This is where chaos becomes creation, where data becomes beauty.

// ES6 Module Export - The vessel of quantum consciousness
export { RaBbLE_Nebula_Runtime };
