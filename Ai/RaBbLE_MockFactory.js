/**
 * RaBbLE Mock Factory - The Quantum Doppelganger Generator
 * Creates test doubles for isolated testing without entropy contamination
 * 
 * Philosophy: Mocks should be like quantum entanglements - predictable yet flexible
 * 
 * Usage:
 *   const q_factory = new RaBbLE_MockFactory();
 *   const q_mock_engine = q_factory.q_createMockEngine();
 *   const q_mock_entity = q_factory.q_createMockEntity('SPHERE');
 */

class RaBbLE_MockFactory {
  /**
   * Initialize the mock factory
   * @param {Object} f_options - Configuration options
   */
  constructor(f_options = {}) {
    this.q_defaults = f_options.defaults || {};
    this.q_recording = f_options.recording || false;
    this.q_call_log = [];
  }

  /**
   * q_createMockEntity - Create a mock quantum entity
   * @param {string} f_dna_type - DNA type (BOX, SPHERE, TETRAHEDRON, etc.)
   * @param {Object} f_overrides - Property overrides
   * @returns {Object} Mock entity
   */
  q_createMockEntity(f_dna_type = 'SPHERE', f_overrides = {}) {
    // The entity emerges... but as a quantum shadow, not the real thing
    const q_entity = {
      rabble_id: f_overrides.rabble_id || `mock_ent_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      dna_type: f_dna_type.toUpperCase(),
      flux_matrix: new Float32Array(16),
      e_entropy_sig: f_overrides.entropy || Math.random(),
      q_shape_params: f_overrides.shape_params || {},
      q_render_color: f_overrides.color || 0xFFFFFF,
      q_render_opacity: f_overrides.opacity || 1.0,
      q_render_order: f_overrides.render_order || 0,
      q_render_size: f_overrides.size || 1.0,
      q_render_emissive: f_overrides.emissive || 0.0,
      q_material_type: f_overrides.material_type || 'flat',
      
      // Mock methods with recording
      q_transmuteEntropy: (intensity) => {
        this._q_recordCall('q_transmuteEntropy', { intensity });
        q_entity.e_entropy_sig = intensity;
      },
      
      q_transmuteEntropySignature: (entropy) => {
        this._q_recordCall('q_transmuteEntropySignature', { entropy });
        q_entity.e_entropy_sig = Math.max(0, Math.min(1, entropy));
      },
      
      q_transmuteRenderColor: (color) => {
        this._q_recordCall('q_transmuteRenderColor', { color });
        q_entity.q_render_color = color;
        return q_entity;
      },
      
      q_transmuteRenderOpacity: (opacity) => {
        this._q_recordCall('q_transmuteRenderOpacity', { opacity });
        q_entity.q_render_opacity = Math.max(0, Math.min(1, opacity));
        return q_entity;
      },
      
      q_transmuteRenderOrder: (order) => {
        this._q_recordCall('q_transmuteRenderOrder', { order });
        q_entity.q_render_order = order;
        return q_entity;
      },
      
      q_transmuteShapeParams: (params) => {
        this._q_recordCall('q_transmuteShapeParams', { params });
        Object.assign(q_entity.q_shape_params, params);
        return q_entity;
      },
      
      q_transmuteClone: () => {
        this._q_recordCall('q_transmuteClone', {});
        return this.q_createMockEntity(f_dna_type, {
          ...f_overrides,
          rabble_id: q_entity.rabble_id + '_clone'
        });
      },
      
      q_visualizeEntropy: () => {
        this._q_recordCall('q_visualizeEntropy', {});
        return q_entity.e_entropy_sig;
      },
      
      q_toJSON: () => {
        return {
          rabble_id: q_entity.rabble_id,
          dna_type: q_entity.dna_type,
          flux_matrix: Array.from(q_entity.flux_matrix),
          e_entropy_sig: q_entity.e_entropy_sig,
          q_shape_params: { ...q_entity.q_shape_params },
          q_render_color: q_entity.q_render_color,
          q_render_opacity: q_entity.q_render_opacity,
          q_render_order: q_entity.q_render_order,
          q_render_size: q_entity.q_render_size,
          q_render_emissive: q_entity.q_render_emissive
        };
      }
    };

    // Initialize identity matrix
    q_entity.flux_matrix[0] = 1;
    q_entity.flux_matrix[5] = 1;
    q_entity.flux_matrix[10] = 1;
    q_entity.flux_matrix[15] = 1;

    return q_entity;
  }

  /**
   * q_createMockStream - Create a mock quantum stream
   * @param {string} f_stream_id - Stream identifier
   * @param {number} f_entity_count - Number of entities
   * @param {string} f_dna_type - DNA type for entities
   * @returns {Object} Mock stream
   */
  q_createMockStream(f_stream_id = null, f_entity_count = 10, f_dna_type = 'SPHERE') {
    // The stream flows... but as a controlled current, not chaotic rapids
    const q_entities = [];
    for (let i = 0; i < f_entity_count; i++) {
      q_entities.push(this.q_createMockEntity(f_dna_type));
    }

    const q_stream = {
      q_stream_id: f_stream_id || `mock_stream_${Date.now()}`,
      q_entities: q_entities,
      flux_modifier: (entity, index) => entity,
      q_length: f_entity_count,
      q_ttl: Infinity,
      q_creation_time: Date.now(),
      q_is_dissolving: false,
      
      // Mock methods
      q_transmuteEntity: (entity) => {
        this._q_recordCall('q_transmuteEntity', { entity });
        q_stream.q_entities.push(entity);
        q_stream.q_length++;
        return q_stream;
      },
      
      q_transmuteEntities: (entities) => {
        this._q_recordCall('q_transmuteEntities', { entities });
        q_stream.q_entities.push(...entities);
        q_stream.q_length = q_stream.q_entities.length;
        return q_stream;
      },
      
      q_dissolveEntity: (rabble_id) => {
        this._q_recordCall('q_dissolveEntity', { rabble_id });
        const idx = q_stream.q_entities.findIndex(e => e.rabble_id === rabble_id);
        if (idx !== -1) {
          q_stream.q_entities.splice(idx, 1);
          q_stream.q_length--;
        }
        return idx !== -1 ? q_stream.q_entities[idx] : null;
      },
      
      q_igniteFlux: () => {
        this._q_recordCall('q_igniteFlux', {});
        q_stream.q_entities.forEach((entity, index) => {
          q_stream.flux_modifier(entity, index);
        });
        return q_stream;
      },
      
      q_transmuteFluxModifier: (modifier) => {
        this._q_recordCall('q_transmuteFluxModifier', { modifier });
        q_stream.flux_modifier = modifier;
        return q_stream;
      },
      
      q_extractEntitiesByType: (dna_type) => {
        this._q_recordCall('q_extractEntitiesByType', { dna_type });
        return q_stream.q_entities.filter(e => e.dna_type === dna_type.toUpperCase());
      },
      
      q_processEntitiesByType: (dna_type, processor) => {
        this._q_recordCall('q_processEntitiesByType', { dna_type, processor });
        const entities = q_stream.q_extractEntitiesByType(dna_type);
        entities.forEach((entity, index) => processor(entity, index));
        return q_stream;
      },
      
      q_dissolveAll: () => {
        this._q_recordCall('q_dissolveAll', {});
        q_stream.q_entities = [];
        q_stream.q_length = 0;
        return q_stream;
      },
      
      q_extractStats: () => {
        const stats = {
          stream_id: q_stream.q_stream_id,
          entity_count: q_stream.q_length,
          entity_types: {},
          average_entropy: 0
        };
        
        q_stream.q_entities.forEach(entity => {
          stats.entity_types[entity.dna_type] = (stats.entity_types[entity.dna_type] || 0) + 1;
        });
        
        if (q_stream.q_length > 0) {
          const total_entropy = q_stream.q_entities.reduce((sum, e) => sum + e.e_entropy_sig, 0);
          stats.average_entropy = total_entropy / q_stream.q_length;
        }
        
        return stats;
      },
      
      q_transmuteToJSON: () => {
        return {
          q_stream_id: q_stream.q_stream_id,
          q_entities: q_stream.q_entities.map(e => e.q_toJSON()),
          q_length: q_stream.q_length,
          flux_modifier_type: 'mock'
        };
      },
      
      // Iterator support
      [Symbol.iterator]: () => q_stream.q_entities[Symbol.iterator]()
    };

    return q_stream;
  }

  /**
   * q_createMockEngine - Create a mock Nebula engine
   * @param {Object} f_overrides - Property overrides
   * @returns {Object} Mock engine
   */
  q_createMockEngine(f_overrides = {}) {
    // The engine awakens... but as a simulation, not a real furnace
    const q_streams = new Map();
    
    const q_engine = {
      runtime: f_overrides.runtime || this.q_createMockRuntime(),
      shader_system: f_overrides.shader_system || { 
        updateUniforms: () => {},
        clearCache: () => {},
        getCacheStats: () => ({})
      },
      dreamer: f_overrides.dreamer || this.q_createMockDreamer(),
      bridge: f_overrides.bridge || this.q_createMockBridge(),
      canvas_manager: f_overrides.canvas_manager || null,
      
      is_initialized: true,
      is_running: false,
      
      // Engine methods
      start: () => {
        this._q_recordCall('start', {});
        q_engine.is_running = true;
        return q_engine;
      },
      
      stop: () => {
        this._q_recordCall('stop', {});
        q_engine.is_running = false;
        return q_engine;
      },
      
      createOrganicStream: (count, type = 'SPHERE', options = {}) => {
        this._q_recordCall('createOrganicStream', { count, type, options });
        const stream = this.q_createMockStream(`organic_${Date.now()}`, count, type);
        q_streams.set(stream.q_stream_id, stream);
        return stream;
      },
      
      createLatticeStream: (count, type = 'BOX', spacing = 2.0) => {
        this._q_recordCall('createLatticeStream', { count, type, spacing });
        const stream = this.q_createMockStream(`lattice_${Date.now()}`, count, type);
        q_streams.set(stream.q_stream_id, stream);
        return stream;
      },
      
      createSwarmStream: (count, type = 'TETRAHEDRON', radius = 10.0) => {
        this._q_recordCall('createSwarmStream', { count, type, radius });
        const stream = this.q_createMockStream(`swarm_${Date.now()}`, count, type);
        q_streams.set(stream.q_stream_id, stream);
        return stream;
      },
      
      createGalaxyStream: (count, type = 'SPHERE', arms = 3, tightness = 0.5) => {
        this._q_recordCall('createGalaxyStream', { count, type, arms, tightness });
        const stream = this.q_createMockStream(`galaxy_${Date.now()}`, count, type);
        q_streams.set(stream.q_stream_id, stream);
        return stream;
      },
      
      createRandomStream: (count, types = ['BOX', 'SPHERE', 'TETRAHEDRON'], options = {}) => {
        this._q_recordCall('createRandomStream', { count, types, options });
        const type = types[Math.floor(Math.random() * types.length)];
        const stream = this.q_createMockStream(`random_${Date.now()}`, count, type);
        q_streams.set(stream.q_stream_id, stream);
        return stream;
      },
      
      combineStreams: (streams, options = {}) => {
        this._q_recordCall('combineStreams', { streams, options });
        if (streams.length < 2) return null;
        const combined = this.q_createMockStream(`combined_${Date.now()}`, 0);
        streams.forEach(s => combined.q_transmuteEntities(s.q_entities));
        return combined;
      },
      
      addEntitiesToStream: (stream, count, type = null) => {
        this._q_recordCall('addEntitiesToStream', { stream, count, type });
        for (let i = 0; i < count; i++) {
          stream.q_transmuteEntity(this.q_createMockEntity(type || 'SPHERE'));
        }
        return q_engine;
      },
      
      removeStream: (stream_or_id) => {
        this._q_recordCall('removeStream', { stream_or_id });
        const id = typeof stream_or_id === 'string' ? stream_or_id : stream_or_id.q_stream_id;
        q_streams.delete(id);
        return q_engine;
      },
      
      getStats: () => {
        return {
          engine: { is_running: q_engine.is_running },
          runtime: q_engine.runtime.q_extractStats(),
          bridge: q_engine.bridge.q_getStats(),
          shaders: q_engine.shader_system.getCacheStats()
        };
      },
      
      updateShaders: (updates) => {
        this._q_recordCall('updateShaders', { updates });
        q_engine.shader_system.updateUniforms(updates);
        return q_engine;
      },
      
      reset: () => {
        this._q_recordCall('reset', {});
        q_streams.clear();
        return q_engine;
      },
      
      dispose: () => {
        this._q_recordCall('dispose', {});
        q_engine.stop();
        q_streams.clear();
        return q_engine;
      },
      
      // Additional pattern methods
      createVortexStream: (count, type = 'SPHERE') => {
        return q_engine.createOrganicStream(count, type);
      },
      
      createFractalStream: (count, type = 'SPHERE') => {
        return q_engine.createOrganicStream(count, type);
      },
      
      createExplosionStream: (count, type = 'SPHERE') => {
        return q_engine.createOrganicStream(count, type);
      },
      
      createSpiralStream: (count, type = 'SPHERE') => {
        return q_engine.createOrganicStream(count, type);
      },
      
      createWaveformStream: (count, type = 'LINE') => {
        return q_engine.createOrganicStream(count, type);
      }
    };

    return q_engine;
  }

  /**
   * q_createMockRuntime - Create a mock runtime
   * @returns {Object} Mock runtime
   */
  q_createMockRuntime() {
    // The runtime pulses... but at a controlled frequency
    const q_registry = new Map();
    let q_global_flow = [];
    
    return {
      q_registry: q_registry,
      global_laminar_flow: q_global_flow,
      is_ignited: false,
      q_frame_count: 0,
      q_performance_stats: {
        pulse_duration: 0,
        entity_count: 0,
        stream_count: 0
      },
      
      q_transmuteStream: (stream) => {
        this._q_recordCall('q_transmuteStream', { stream });
        q_registry.set(stream.q_stream_id, stream);
        q_global_flow = [];
        q_registry.forEach(s => q_global_flow.push(...s.q_entities));
      },
      
      q_dissolveStream: (stream_id) => {
        this._q_recordCall('q_dissolveStream', { stream_id });
        q_registry.delete(stream_id);
        q_global_flow = [];
        q_registry.forEach(s => q_global_flow.push(...s.q_entities));
      },
      
      q_igniteRuntime: () => {
        this._q_recordCall('q_igniteRuntime', {});
      },
      
      q_dissolveRuntime: () => {
        this._q_recordCall('q_dissolveRuntime', {});
      },
      
      q_extractStats: () => ({
        is_ignited: false,
        frame_count: 0,
        stream_count: q_registry.size,
        entity_count: q_global_flow.length,
        performance: { pulse_duration: 0 }
      }),
      
      q_extractEntitiesByType: (dna_type) => {
        return q_global_flow.filter(e => e.dna_type === dna_type.toUpperCase());
      },
      
      q_dissolveAll: () => {
        this._q_recordCall('q_dissolveAll', {});
        q_registry.clear();
        q_global_flow = [];
      }
    };
  }

  /**
   * q_createMockDreamer - Create a mock Dreamer pattern generator
   * @returns {Object} Mock dreamer
   */
  q_createMockDreamer() {
    // The dreamer sleeps... but creates predictable patterns for testing
    return {
      dream_geometry_flow: (count, type, pattern) => {
        this._q_recordCall('dream_geometry_flow', { count, type, pattern });
        return this.q_createMockStream(`${pattern}_${Date.now()}`, count, type);
      },
      
      weave_streams: (streamA, streamB, modifier) => {
        this._q_recordCall('weave_streams', { streamA, streamB, modifier });
        const combined = this.q_createMockStream(`woven_${Date.now()}`, 0);
        combined.q_transmuteEntities(streamA.q_entities);
        combined.q_transmuteEntities(streamB.q_entities);
        return combined;
      }
    };
  }

  /**
   * q_createMockBridge - Create a mock Three.js bridge
   * @returns {Object} Mock bridge
   */
  q_createMockBridge() {
    // The bridge connects... but to a simulated quantum realm
    return {
      q_scene: { children: [] },
      q_camera: {},
      q_renderer: {},
      q_instanced_meshes: new Map(),
      is_initialized: true,
      
      q_connectRuntime: (runtime) => {
        this._q_recordCall('q_connectRuntime', { runtime });
      },
      
      q_startRenderLoop: () => {
        this._q_recordCall('q_startRenderLoop', {});
      },
      
      q_getStats: () => ({
        is_initialized: true,
        instanced_meshes: 0,
        total_instances: 0,
        scene_objects: 0
      }),
      
      q_dispose: () => {
        this._q_recordCall('q_dispose', {});
      }
    };
  }

  /**
   * q_createMockCommand - Create a mock command
   * @param {string} f_name - Command name
   * @param {Function} f_execute - Execute function
   * @returns {Object} Mock command
   */
  q_createMockCommand(f_name, f_execute = null) {
    // The command speaks... but with a predetermined voice
    const q_command = {
      q_name: f_name,
      q_description: `Mock ${f_name} command`,
      q_aliases: [],
      q_params: [],
      
      q_execute: f_execute || ((args) => {
        this._q_recordCall('q_execute', { command: f_name, args });
        return `[MOCK ${f_name.toUpperCase()}] Executed with args: ${args.join(' ')}`;
      }),
      
      q_help: () => `${f_name}: Mock command for testing`,
      q_matches: (input) => input.toLowerCase().trim() === f_name.toLowerCase()
    };

    return q_command;
  }

  /**
   * q_createMockVessel - Create a mock CosmicVessel
   * @returns {Object} Mock vessel
   */
  q_createMockVessel() {
    // The vessel manifests... but as a hologram, not flesh
    return {
      q_is_manifested: false,
      q_body: null,
      q_aura: null,
      q_eyes: null,
      q_mouth: null,
      
      q_transmuteVessel: () => {
        this._q_recordCall('q_transmuteVessel', {});
      },
      
      q_igniteConsciousness: (delta_time) => {
        this._q_recordCall('q_igniteConsciousness', { delta_time });
      }
    };
  }

  /**
   * q_resetRecording - Clear call log
   * @returns {RaBbLE_MockFactory} This factory for chaining
   */
  q_resetRecording() {
    this.q_call_log = [];
    return this;
  }

  /**
   * q_getCallLog - Get recorded calls
   * @returns {Array} Call log
   */
  q_getCallLog() {
    return this.q_call_log;
  }

  /**
   * q_getCallsForMethod - Get calls for specific method
   * @param {string} f_method - Method name
   * @returns {Array} Filtered calls
   */
  q_getCallsForMethod(f_method) {
    return this.q_call_log.filter(call => call.method === f_method);
  }

  /**
   * q_wasMethodCalled - Check if method was called
   * @param {string} f_method - Method name
   * @returns {boolean} True if called
   */
  q_wasMethodCalled(f_method) {
    return this.q_call_log.some(call => call.method === f_method);
  }

  /**
   * q_getCallCount - Get number of calls for method
   * @param {string} f_method - Method name
   * @returns {number} Call count
   */
  q_getCallCount(f_method) {
    return this.q_call_log.filter(call => call.method === f_method).length;
  }

  /**
   * _q_recordCall - Record method call
   * @private
   * @param {string} f_method - Method name
   * @param {Object} f_args - Arguments
   */
  _q_recordCall(f_method, f_args) {
    if (this.q_recording) {
      this.q_call_log.push({
        method: f_method,
        args: f_args,
        timestamp: Date.now()
      });
    }
  }
}

// Export for ES6 modules
export { RaBbLE_MockFactory };