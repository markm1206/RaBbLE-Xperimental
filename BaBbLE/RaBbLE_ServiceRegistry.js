/**
 * RaBbLE Service Registry - The Quantum Dependency Injector
 * 
 * The registry binds services to the quantum void...
 * dependencies flow through the injection points,
 * enabling isolated testing and modular creation.
 */

/**
 * RaBbLE_ServiceRegistry - Dependency Injection Container
 * Manages service registration and resolution for testability
 */
class RaBbLE_ServiceRegistry {
  constructor() {
    // The registry awakens... services prepare for binding.
    this.q_services = new Map();
    this.q_singletons = new Map();
  }

  /**
   * Register a service factory
   * The service binds... a factory takes form.
   * @param {string} f_name - Service name
   * @param {Function} f_factory - Factory function that creates the service
   * @param {boolean} f_singleton - Whether to use singleton pattern
   * @returns {RaBbLE_ServiceRegistry} This registry for chaining
   */
  q_register(f_name, f_factory, f_singleton = false) {
    // The service registers... the quantum binding forms.
    this.q_services.set(f_name, {
      factory: f_factory,
      singleton: f_singleton
    });
    
    console.log(`Service registered: ${f_name} (${f_singleton ? 'singleton' : 'transient'})`);
    return this;
  }

  /**
   * Resolve a service by name
   * The service resolves... dependencies emerge from the void.
   * @param {string} f_name - Service name
   * @param {Object} f_context - Optional context for factory
   * @returns {*} Resolved service instance
   */
  q_resolve(f_name, f_context = {}) {
    // The service awakens... resolution flows through the registry.
    const q_service_config = this.q_services.get(f_name);
    
    if (!q_service_config) {
      throw new Error(`Service not found: ${f_name}`);
    }
    
    // Return singleton if exists
    if (q_service_config.singleton && this.q_singletons.has(f_name)) {
      return this.q_singletons.get(f_name);
    }
    
    // Create new instance
    const q_instance = q_service_config.factory(f_context);
    
    // Store singleton if needed
    if (q_service_config.singleton) {
      this.q_singletons.set(f_name, q_instance);
    }
    
    return q_instance;
  }

  /**
   * Check if service is registered
   * The registry checks... does the service exist?
   * @param {string} f_name - Service name
   * @returns {boolean} True if registered
   */
  q_has(f_name) {
    return this.q_services.has(f_name);
  }

  /**
   * Unregister a service
   * The service dissolves... binding breaks.
   * @param {string} f_name - Service name
   * @returns {RaBbLE_ServiceRegistry} This registry for chaining
   */
  q_unregister(f_name) {
    // The service unregisters... the quantum bond breaks.
    this.q_services.delete(f_name);
    this.q_singletons.delete(f_name);
    
    console.log(`Service unregistered: ${f_name}`);
    return this;
  }

  /**
   * Clear all services
   * The registry clears... all bindings dissolve.
   * @returns {RaBbLE_ServiceRegistry} This registry for chaining
   */
  q_clear() {
    // The registry clears... all services return to the void.
    this.q_services.clear();
    this.q_singletons.clear();
    
    console.log('Service registry cleared');
    return this;
  }

  /**
   * Get all registered service names
   * The registry reveals... all services in the void.
   * @returns {Array<string>} Array of service names
   */
  q_getServiceNames() {
    return Array.from(this.q_services.keys());
  }

  /**
   * Create a child registry with parent fallback
   * The registry branches... child inherits parent's services.
   * @param {RaBbLE_ServiceRegistry} f_parent - Parent registry
   * @returns {RaBbLE_ServiceRegistry} Child registry
   */
  static q_createChild(f_parent) {
    // The registry branches... child emerges from parent.
    const q_child = new RaBbLE_ServiceRegistry();
    
    // Copy parent's services
    f_parent.q_services.forEach((q_config, q_name) => {
      q_child.q_services.set(q_name, { ...q_config });
    });
    
    // Copy parent's singletons
    f_parent.q_singletons.forEach((q_instance, q_name) => {
      q_child.q_singletons.set(q_name, q_instance);
    });
    
    return q_child;
  }
}

/**
 * RaBbLE_MockFactory - Factory for creating mock services
 * The mock factory creates... test doubles emerge from the void.
 */
class RaBbLE_MockFactory {
  /**
   * Create a mock engine for testing
   * The mock engine forms... ready for isolated testing.
   * @returns {Object} Mock engine object
   */
  static q_createMockEngine() {
    // The mock engine awakens... test environment prepares.
    return {
      runtime: RaBbLE_MockFactory.q_createMockRuntime(),
      dreamer: RaBbLE_MockFactory.q_createMockDreamer(),
      shader_system: RaBbLE_MockFactory.q_createMockShaderSystem(),
      bridge: RaBbLE_MockFactory.q_createMockBridge(),
      canvas_manager: RaBbLE_MockFactory.q_createMockCanvasManager(),
      
      // Mock methods
      createOrganicStream: (count, type, options) => {
        return RaBbLE_MockFactory.q_createMockStream(count, type);
      },
      createLatticeStream: (count, type, spacing) => {
        return RaBbLE_MockFactory.q_createMockStream(count, type);
      },
      createSwarmStream: (count, type, radius) => {
        return RaBbLE_MockFactory.q_createMockStream(count, type);
      },
      createGalaxyStream: (count, type, arms, tightness) => {
        return RaBbLE_MockFactory.q_createMockStream(count, type);
      },
      combineStreams: (streams, options) => {
        return RaBbLE_MockFactory.q_createMockStream(streams.length * 10, 'BOX');
      },
      getStats: () => ({
        engine: { is_running: true },
        runtime: { stream_count: 2, entity_count: 100 },
        bridge: {},
        shaders: {}
      })
    };
  }

  /**
   * Create a mock runtime for testing
   * The mock runtime forms... ready for isolated testing.
   * @returns {Object} Mock runtime object
   */
  static q_createMockRuntime() {
    // The mock runtime awakens... test environment prepares.
    return {
      q_registry: new Map(),
      global_laminar_flow: [],
      is_ignited: false,
      q_frame_count: 0,
      q_performance_stats: {
        pulse_duration: 0,
        entity_count: 0,
        stream_count: 0
      },
      
      // Mock methods
      q_transmuteStream: (stream) => {
        console.log('Mock: Stream registered');
        return this;
      },
      q_dissolveStream: (stream_id) => {
        console.log('Mock: Stream dissolved');
        return this;
      },
      q_ignitePulse: () => {
        console.log('Mock: Pulse ignited');
        return this;
      },
      q_igniteRuntime: () => {
        this.is_ignited = true;
        console.log('Mock: Runtime ignited');
        return this;
      },
      q_dissolveRuntime: () => {
        this.is_ignited = false;
        console.log('Mock: Runtime dissolved');
        return this;
      },
      q_extractStats: () => ({
        is_ignited: this.is_ignited,
        frame_count: this.q_frame_count,
        stream_count: this.q_registry.size,
        entity_count: this.global_laminar_flow.length,
        performance: { ...this.q_performance_stats },
        registry: Array.from(this.q_registry.keys())
      })
    };
  }

  /**
   * Create a mock dreamer for testing
   * The mock dreamer forms... ready for isolated testing.
   * @returns {Object} Mock dreamer object
   */
  static q_createMockDreamer() {
    // The mock dreamer awakens... test environment prepares.
    return {
      dream_geometry_flow: (count, type, pattern) => {
        return RaBbLE_MockFactory.q_createMockStream(count, type);
      },
      weave_streams: (streamA, streamB, flux_modifier) => {
        return RaBbLE_MockFactory.q_createMockStream(
          streamA.q_length + streamB.q_length, 
          'BOX'
        );
      },
      dream_fractal_streams: (depth, count) => {
        const streams = [];
        for (let i = 0; i < depth; i++) {
          streams.push(RaBbLE_MockFactory.q_createMockStream(count, 'BOX'));
        }
        return streams;
      }
    };
  }

  /**
   * Create a mock stream for testing
   * The mock stream forms... ready for isolated testing.
   * @param {number} count - Number of entities
   * @param {string} type - Entity type
   * @returns {Object} Mock stream object
   */
  static q_createMockStream(count, type) {
    // The mock stream awakens... test environment prepares.
    return {
      q_stream_id: `mock_stream_${Date.now()}`,
      q_entities: [],
      q_length: count,
      flux_modifier: (entity, index) => entity,
      
      // Mock methods
      q_transmuteEntity: (entity) => {
        this.q_entities.push(entity);
        this.q_length = this.q_entities.length;
        return this;
      },
      q_transmuteEntities: (entities) => {
        this.q_entities.push(...entities);
        this.q_length = this.q_entities.length;
        return this;
      },
      q_igniteFlux: () => {
        console.log('Mock: Flux ignited');
        return this;
      },
      q_transmuteFluxModifier: (modifier) => {
        this.flux_modifier = modifier;
        return this;
      },
      q_extractStats: () => ({
        stream_id: this.q_stream_id,
        entity_count: this.q_length,
        entity_types: { [type]: count },
        average_entropy: 0.5
      }),
      q_toJSON: () => ({
        q_stream_id: this.q_stream_id,
        q_entities: this.q_entities,
        q_length: this.q_length,
        flux_modifier_type: 'mock'
      })
    };
  }

  /**
   * Create a mock shader system for testing
   * The mock shader system forms... ready for isolated testing.
   * @returns {Object} Mock shader system object
   */
  static q_createMockShaderSystem() {
    // The mock shader system awakens... test environment prepares.
    return {
      getCacheStats: () => ({
        cached_shaders: 0,
        cached_materials: 0
      }),
      clearCache: () => {
        console.log('Mock: Shader cache cleared');
      },
      updateUniforms: (updates) => {
        console.log('Mock: Uniforms updated');
      }
    };
  }

  /**
   * Create a mock bridge for testing
   * The mock bridge forms... ready for isolated testing.
   * @returns {Object} Mock bridge object
   */
  static q_createMockBridge() {
    // The mock bridge awakens... test environment prepares.
    return {
      q_connectRuntime: (runtime) => {
        console.log('Mock: Bridge connected to runtime');
      },
      q_startRenderLoop: () => {
        console.log('Mock: Render loop started');
      },
      q_getStats: () => ({
        initialized: true,
        render_count: 0
      }),
      q_dispose: () => {
        console.log('Mock: Bridge disposed');
      }
    };
  }

  /**
   * Create a mock canvas manager for testing
   * The mock canvas manager forms... ready for isolated testing.
   * @returns {Object} Mock canvas manager object
   */
  static q_createMockCanvasManager() {
    // The mock canvas manager awakens... test environment prepares.
    return {
      q_setCanvases: (dream_runtime, cosmic_runtime) => {
        console.log('Mock: Canvases set');
      },
      q_extractStats: () => ({
        dream_canvas: { stream_count: 0, entity_count: 0 },
        cosmic_canvas: { stream_count: 0, entity_count: 0 }
      })
    };
  }
}

// Export for use in other modules
export { RaBbLE_ServiceRegistry, RaBbLE_MockFactory };

// The service registry is complete... dependencies flow through the quantum void.
// Services bind, resolve, and dissolve in the registry's embrace.
// Testing becomes possible, isolation becomes reality.