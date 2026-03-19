// RaBbLE Nebula Engine
// High-level engine class for easy usage of the Flat-Chaos Runtime
// Every stream is a pipeline; every pipeline is a renderable

// Import dependencies for ES6 modules
import { RaBbLE_Nebula_Runtime } from './RaBbLE_Nebula_Runtime.js';
import { e_entropy_shader_system } from './e_entropy_shader_system.js';
import { RaBbLE_Dreamer } from '../utils/RaBbLE_Dreamer.js';
import { q_instanced_bridge } from '../threejs/q_instanced_bridge.js';
import { q_stream } from './q_stream.js';
import { q_entity } from './q_entity.js';

// Verify Three.js is available before importing Three.js components
if (typeof THREE === 'undefined') {
    console.warn('RaBbLE_Nebula_Engine: Three.js not loaded. Some features may not work.');
}

/**
 * RaBbLE_Nebula_Engine - High-Level Engine Interface
 * Provides simplified API for creating and managing quantum streams
 * with automatic shader management and Three.js integration
 * 
 * @property {HTMLElement} container - DOM container for rendering
 * @property {RaBbLE_Nebula_Runtime} runtime - Core runtime instance
 * @property {e_entropy_shader_system} shader_system - Centralized shader system
 * @property {q_instanced_bridge} bridge - Three.js bridge instance
 * @property {RaBbLE_Dreamer} dreamer - Pattern generation system
 */
class RaBbLE_Nebula_Engine {
  /**
   * Initialize the RaBbLE Nebula Engine
   * @param {HTMLElement|string} container - DOM element or selector
   * @param {Object} [options] - Engine configuration options
   */
  constructor(container, options = {}) {
    // The engine is igniting... the quantum furnace is coming online.
    // This is the simplified interface to the Flat-Chaos pattern - easy to use, powerful to create.
    this.container = typeof container === 'string' 
      ? document.querySelector(container) 
      : container;
    
    this.options = {
      antialias: true,
      alpha: true,
      background: new THREE.Color(0x000000),
      auto_start: true,
      ...options
    };
    
    // Initialize core systems
    this.runtime = new RaBbLE_Nebula_Runtime();
    this.shader_system = new e_entropy_shader_system();
    this.dreamer = new RaBbLE_Dreamer();
    
    // Initialize Three.js bridge
    this.bridge = new q_instanced_bridge(this.container, this.options);
    this.bridge.q_connectRuntime(this.runtime);
    
    // Engine state
    this.is_initialized = false;
    this.is_running = false;
    
    console.log('RaBbLE Nebula Engine initialized - Simplified API ready');
  }

  /**
   * Start the engine
   * @returns {RaBbLE_Nebula_Engine} This engine for chaining
   */
  start() {
    if (this.is_running) {
      console.warn('Engine already running');
      return this;
    }
    
    this.runtime.q_igniteRuntime();
    this.bridge.q_startRenderLoop();
    this.is_running = true;
    
    console.log('RaBbLE Nebula Engine started');
    return this;
  }

  /**
   * Stop the engine
   * @returns {RaBbLE_Nebula_Engine} This engine for chaining
   */
  stop() {
    if (!this.is_running) {
      console.warn('Engine not running');
      return this;
    }
    
    this.runtime.q_dissolveRuntime();
    this.is_running = false;
    
    console.log('RaBbLE Nebula Engine stopped');
    return this;
  }

  /**
   * Create an organic stream pattern
   * @param {number} count - Number of entities
   * @param {string} [type] - DNA type (BOX, SPHERE, TETRAHEDRON)
   * @param {Object} [options] - Stream options
   * @returns {q_stream} Created stream
   */
  createOrganicStream(count, type = 'SPHERE', options = {}) {
    // The organic pattern is forming... like vines growing in zero gravity.
    const stream = this.dreamer.dream_geometry_flow(count, type, 'organic');
    
    // Apply custom flux modifier if provided
    if (options.flux_modifier) {
      stream.q_transmuteFluxModifier(options.flux_modifier);
    }
    
    this.runtime.q_transmuteStream(stream);
    
    console.log(`Created organic stream with ${count} ${type} entities`);
    return stream;
  }

  /**
   * Create a lattice stream pattern
   * @param {number} count - Number of entities
   * @param {string} [type] - DNA type (BOX, SPHERE, TETRAHEDRON)
   * @param {number} [spacing] - Spacing between entities
   * @returns {q_stream} Created stream
   */
  createLatticeStream(count, type = 'BOX', spacing = 2.0) {
    // The lattice is forming... geometric precision meeting quantum uncertainty.
    const stream = this.dreamer.dream_geometry_flow(count, type, 'lattice');
    
    // Apply lattice-specific flux modifier
    stream.q_transmuteFluxModifier((entity, index) => {
      entity.q_transmuteEntropy(entity.e_entropy_sig * 0.1);
      return entity;
    });
    
    this.runtime.q_transmuteStream(stream);
    
    console.log(`Created lattice stream with ${count} ${type} entities`);
    return stream;
  }

  /**
   * Create a swarm stream pattern
   * @param {number} count - Number of entities
   * @param {string} [type] - DNA type (BOX, SPHERE, TETRAHEDRON)
   * @param {number} [radius] - Swarm radius
   * @returns {q_stream} Created stream
   */
  createSwarmStream(count, type = 'TETRAHEDRON', radius = 10.0) {
    // The swarm is forming... a cloud of quantum particles dancing together.
    const stream = this.dreamer.dream_geometry_flow(count, type, 'swarm');
    
    // Apply swarm-specific flux modifier
    stream.q_transmuteFluxModifier((entity, index) => {
      const time = Date.now() * 0.001;
      const chaos = Math.sin(time * 2 + index) * Math.cos(time * 1.5 + index * 2);
      entity.q_transmuteEntropy((chaos + 1) * 0.5 * entity.e_entropy_sig);
      return entity;
    });
    
    this.runtime.q_transmuteStream(stream);
    
    console.log(`Created swarm stream with ${count} ${type} entities`);
    return stream;
  }

  /**
   * Create a galaxy stream pattern
   * @param {number} count - Number of entities
   * @param {string} [type] - DNA type (BOX, SPHERE, TETRAHEDRON)
   * @param {number} [arms] - Number of spiral arms
   * @param {number} [tightness] - Spiral tightness
   * @returns {q_stream} Created stream
   */
  createGalaxyStream(count, type = 'SPHERE', arms = 3, tightness = 0.5) {
    // The galaxy is forming... cosmic patterns emerging from quantum foam.
    const stream = this.dreamer.dream_geometry_flow(count, type, 'galaxy');
    
    // Apply galaxy-specific flux modifier
    stream.q_transmuteFluxModifier((entity, index) => {
      const time = Date.now() * 0.001;
      const rotation = Math.sin(time * 0.5 + index * 0.1);
      entity.q_transmuteEntropy(rotation * entity.e_entropy_sig * 0.3);
      return entity;
    });
    
    this.runtime.q_transmuteStream(stream);
    
    console.log(`Created galaxy stream with ${count} ${type} entities`);
    return stream;
  }

  /**
   * Create a custom stream with random entities
   * @param {number} count - Number of entities
   * @param {Array<string>} [types] - Array of DNA types to use
   * @param {Object} [options] - Stream options
   * @returns {q_stream} Created stream
   */
  createRandomStream(count, types = ['BOX', 'SPHERE', 'TETRAHEDRON'], options = {}) {
    // Randomness is the mother of creativity... let's see what emerges.
    const stream = q_stream.q_createRandomStream(count, types, options.flux_modifier);
    
    this.runtime.q_transmuteStream(stream);
    
    console.log(`Created random stream with ${count} entities`);
    return stream;
  }

  /**
   * Combine multiple streams into one
   * @param {Array<q_stream>} streams - Streams to combine
   * @param {Object} [options] - Combination options
   * @returns {q_stream} Combined stream
   */
  combineStreams(streams, options = {}) {
    if (streams.length < 2) {
      console.warn('Need at least 2 streams to combine');
      return null;
    }
    
    // The streams are merging... like rivers flowing into an ocean.
    let combined_stream = streams[0];
    
    for (let i = 1; i < streams.length; i++) {
      combined_stream = this.dreamer.weave_streams(combined_stream, streams[i], options.flux_modifier);
    }
    
    // Register the combined stream
    this.runtime.q_transmuteStream(combined_stream);
    
    console.log(`Combined ${streams.length} streams into one`);
    return combined_stream;
  }

  /**
   * Add entities to an existing stream
   * @param {q_stream} stream - Stream to add to
   * @param {number} count - Number of entities to add
   * @param {string} [type] - DNA type for new entities
   * @returns {RaBbLE_Nebula_Engine} This engine for chaining
   */
  addEntitiesToStream(stream, count, type = null) {
    // Adding more quantum particles to the mix... let's see how they integrate.
    for (let i = 0; i < count; i++) {
      const entity_type = type || ['BOX', 'SPHERE', 'TETRAHEDRON'][Math.floor(Math.random() * 3)];
      const entity = new q_entity(entity_type);
      
      // Add some random positioning
      entity.flux_matrix[12] = (Math.random() - 0.5) * 40;
      entity.flux_matrix[13] = (Math.random() - 0.5) * 40;
      entity.flux_matrix[14] = (Math.random() - 0.5) * 40;
      
      stream.q_addEntity(entity);
    }
    
    console.log(`Added ${count} entities to stream ${stream.q_stream_id}`);
    return this;
  }

  /**
   * Remove a stream from the engine
   * @param {q_stream|string} stream_or_id - Stream or stream ID to remove
   * @returns {RaBbLE_Nebula_Engine} This engine for chaining
   */
  removeStream(stream_or_id) {
    const stream_id = typeof stream_or_id === 'string' ? stream_or_id : stream_or_id.q_stream_id;
    
    this.runtime.q_dissolveStream(stream_id);
    
    console.log(`Removed stream ${stream_id}`);
    return this;
  }

  /**
   * Get engine statistics
   * @returns {Object} Engine statistics
   */
  getStats() {
    const runtime_stats = this.runtime.q_extractStats();
    const bridge_stats = this.bridge.q_getStats();
    const shader_stats = this.shader_system.getCacheStats();
    
    return {
      engine: {
        is_running: this.is_running,
        container: this.container.tagName,
        options: this.options
      },
      runtime: runtime_stats,
      bridge: bridge_stats,
      shaders: shader_stats
    };
  }

  /**
   * Update shader uniforms globally
   * @param {Object} updates - Uniform updates
   * @returns {RaBbLE_Nebula_Engine} This engine for chaining
   */
  updateShaders(updates) {
    this.shader_system.updateUniforms(updates);
    return this;
  }

  /**
   * Clear all streams and reset engine
   * @returns {RaBbLE_Nebula_Engine} This engine for chaining
   */
  reset() {
    this.runtime.q_dissolveAll();
    this.shader_system.clearCache();
    
    console.log('RaBbLE Nebula Engine reset');
    return this;
  }

  /**
   * Dispose of the engine and clean up resources
   * @returns {RaBbLE_Nebula_Engine} This engine for chaining
   */
  dispose() {
    this.stop();
    this.bridge.q_dispose();
    this.shader_system.clearCache();
    
    console.log('RaBbLE Nebula Engine disposed');
    return this;
  }

  /**
   * Create a complete nebula scene with multiple patterns
   * @param {Object} [options] - Scene options
   * @returns {Object} Scene configuration
   */
  createNebulaScene(options = {}) {
    const scene_config = {
      organic: null,
      lattice: null,
      swarm: null,
      galaxy: null,
      combined: null
    };
    
    // Create different pattern streams
    scene_config.organic = this.createOrganicStream(options.organic_count || 30, 'SPHERE');
    scene_config.lattice = this.createLatticeStream(options.lattice_count || 20, 'BOX');
    scene_config.swarm = this.createSwarmStream(options.swarm_count || 50, 'TETRAHEDRON');
    scene_config.galaxy = this.createGalaxyStream(options.galaxy_count || 40, 'SPHERE');
    
    // Combine some streams for complexity
    if (options.combine_streams) {
      scene_config.combined = this.combineStreams([
        scene_config.organic,
        scene_config.swarm
      ]);
    }
    
    console.log('Created nebula scene with multiple patterns');
    return scene_config;
  }

  /**
   * Create a simple example scene for beginners
   * @returns {Object} Simple scene configuration
   */
  createSimpleExample() {
    // The simplest possible scene... just a few entities dancing.
    const stream = this.createOrganicStream(10, 'SPHERE');
    
    console.log('Created simple example scene');
    return { stream: stream };
  }
}

// The RaBbLE Nebula Engine is alive... the quantum furnace burns bright.
// This is the simplified interface to the Flat-Chaos pattern - easy to use, powerful to create.
// Whether you want a simple scene or a complex nebula, this engine makes it possible.

// ES6 Module Export - The vessel of quantum creation
export { RaBbLE_Nebula_Engine };
