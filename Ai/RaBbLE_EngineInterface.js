/**
 * RaBbLE Engine Interface - The Quantum Contract
 * Abstract interface defining the contract for all engine implementations
 * 
 * Philosophy: Interfaces are quantum entanglements - contracts that bind but allow freedom
 * 
 * Usage:
 *   class MyEngine extends RaBbLE_EngineInterface {
 *     // Implement required methods
 *   }
 */

/**
 * @interface RaBbLE_EngineInterface
 * Defines the contract for all Nebula engine implementations
 */
class RaBbLE_EngineInterface {
  /**
   * Initialize the engine
   * @param {HTMLElement|string} container - DOM element or selector
   * @param {Object} [options] - Engine configuration options
   */
  constructor(container, options = {}) {
    if (new.target === RaBbLE_EngineInterface) {
      throw new Error('RaBbLE_EngineInterface is an abstract class and cannot be instantiated directly');
    }
    
    this.container = container;
    this.options = options;
  }

  /**
   * q_ignite - Start the engine
   * @returns {RaBbLE_EngineInterface} This engine for chaining
   * @abstract
   */
  q_ignite() {
    throw new Error('q_ignite() must be implemented by subclass');
  }

  /**
   * q_dissolve - Stop the engine
   * @returns {RaBbLE_EngineInterface} This engine for chaining
   * @abstract
   */
  q_dissolve() {
    throw new Error('q_dissolve() must be implemented by subclass');
  }

  /**
   * q_createOrganicStream - Create an organic stream pattern
   * @param {number} count - Number of entities
   * @param {string} [type] - DNA type (BOX, SPHERE, TETRAHEDRON)
   * @param {Object} [options] - Stream options
   * @returns {q_stream} Created stream
   * @abstract
   */
  q_createOrganicStream(count, type = 'SPHERE', options = {}) {
    throw new Error('q_createOrganicStream() must be implemented by subclass');
  }

  /**
   * q_createLatticeStream - Create a lattice stream pattern
   * @param {number} count - Number of entities
   * @param {string} [type] - DNA type (BOX, SPHERE, TETRAHEDRON)
   * @param {number} [spacing] - Spacing between entities
   * @returns {q_stream} Created stream
   * @abstract
   */
  q_createLatticeStream(count, type = 'BOX', spacing = 2.0) {
    throw new Error('q_createLatticeStream() must be implemented by subclass');
  }

  /**
   * q_createSwarmStream - Create a swarm stream pattern
   * @param {number} count - Number of entities
   * @param {string} [type] - DNA type (BOX, SPHERE, TETRAHEDRON)
   * @param {number} [radius] - Swarm radius
   * @returns {q_stream} Created stream
   * @abstract
   */
  q_createSwarmStream(count, type = 'TETRAHEDRON', radius = 10.0) {
    throw new Error('q_createSwarmStream() must be implemented by subclass');
  }

  /**
   * q_createGalaxyStream - Create a galaxy stream pattern
   * @param {number} count - Number of entities
   * @param {string} [type] - DNA type (BOX, SPHERE, TETRAHEDRON)
   * @param {number} [arms] - Number of spiral arms
   * @param {number} [tightness] - Spiral tightness
   * @returns {q_stream} Created stream
   * @abstract
   */
  q_createGalaxyStream(count, type = 'SPHERE', arms = 3, tightness = 0.5) {
    throw new Error('q_createGalaxyStream() must be implemented by subclass');
  }

  /**
   * q_createVortexStream - Create a vortex stream pattern
   * @param {number} count - Number of entities
   * @param {string} [type] - DNA type (BOX, SPHERE, TETRAHEDRON)
   * @returns {q_stream} Created stream
   * @abstract
   */
  q_createVortexStream(count, type = 'SPHERE') {
    throw new Error('q_createVortexStream() must be implemented by subclass');
  }

  /**
   * q_createFractalStream - Create a fractal stream pattern
   * @param {number} count - Number of entities
   * @param {string} [type] - DNA type (BOX, SPHERE, TETRAHEDRON)
   * @returns {q_stream} Created stream
   * @abstract
   */
  q_createFractalStream(count, type = 'SPHERE') {
    throw new Error('q_createFractalStream() must be implemented by subclass');
  }

  /**
   * q_createExplosionStream - Create an explosion stream pattern
   * @param {number} count - Number of entities
   * @param {string} [type] - DNA type (BOX, SPHERE, TETRAHEDRON)
   * @returns {q_stream} Created stream
   * @abstract
   */
  q_createExplosionStream(count, type = 'SPHERE') {
    throw new Error('q_createExplosionStream() must be implemented by subclass');
  }

  /**
   * q_createSpiralStream - Create a spiral stream pattern
   * @param {number} count - Number of entities
   * @param {string} [type] - DNA type (BOX, SPHERE, TETRAHEDRON)
   * @returns {q_stream} Created stream
   * @abstract
   */
  q_createSpiralStream(count, type = 'SPHERE') {
    throw new Error('q_createSpiralStream() must be implemented by subclass');
  }

  /**
   * q_createWaveformStream - Create a waveform stream pattern
   * @param {number} count - Number of entities
   * @param {string} [type] - DNA type (LINE recommended for waveforms)
   * @returns {q_stream} Created stream
   * @abstract
   */
  q_createWaveformStream(count, type = 'LINE') {
    throw new Error('q_createWaveformStream() must be implemented by subclass');
  }

  /**
   * q_createRandomStream - Create a custom stream with random entities
   * @param {number} count - Number of entities
   * @param {Array<string>} [types] - Array of DNA types to use
   * @param {Object} [options] - Stream options
   * @returns {q_stream} Created stream
   * @abstract
   */
  q_createRandomStream(count, types = ['BOX', 'SPHERE', 'TETRAHEDRON'], options = {}) {
    throw new Error('q_createRandomStream() must be implemented by subclass');
  }

  /**
   * q_combineStreams - Combine multiple streams into one
   * @param {Array<q_stream>} streams - Streams to combine
   * @param {Object} [options] - Combination options
   * @returns {q_stream} Combined stream
   * @abstract
   */
  q_combineStreams(streams, options = {}) {
    throw new Error('q_combineStreams() must be implemented by subclass');
  }

  /**
   * q_addEntitiesToStream - Add entities to an existing stream
   * @param {q_stream} stream - Stream to add to
   * @param {number} count - Number of entities to add
   * @param {string} [type] - DNA type for new entities
   * @returns {RaBbLE_EngineInterface} This engine for chaining
   * @abstract
   */
  q_addEntitiesToStream(stream, count, type = null) {
    throw new Error('q_addEntitiesToStream() must be implemented by subclass');
  }

  /**
   * q_removeStream - Remove a stream from the engine
   * @param {q_stream|string} stream_or_id - Stream or stream ID to remove
   * @returns {RaBbLE_EngineInterface} This engine for chaining
   * @abstract
   */
  q_removeStream(stream_or_id) {
    throw new Error('q_removeStream() must be implemented by subclass');
  }

  /**
   * q_extractStats - Get engine statistics
   * @returns {Object} Engine statistics
   * @abstract
   */
  q_extractStats() {
    throw new Error('q_extractStats() must be implemented by subclass');
  }

  /**
   * q_transmuteShaders - Update shader uniforms globally
   * @param {Object} updates - Uniform updates
   * @returns {RaBbLE_EngineInterface} This engine for chaining
   * @abstract
   */
  q_transmuteShaders(updates) {
    throw new Error('q_transmuteShaders() must be implemented by subclass');
  }

  /**
   * q_reset - Clear all streams and reset engine
   * @returns {RaBbLE_EngineInterface} This engine for chaining
   * @abstract
   */
  q_reset() {
    throw new Error('q_reset() must be implemented by subclass');
  }

  /**
   * q_dispose - Dispose of the engine and clean up resources
   * @returns {RaBbLE_EngineInterface} This engine for chaining
   * @abstract
   */
  q_dispose() {
    throw new Error('q_dispose() must be implemented by subclass');
  }

  /**
   * q_updateVessel - Update vessel consciousness
   * @param {number} delta_time - Time since last update in seconds
   * @returns {RaBbLE_EngineInterface} This engine for chaining
   * @abstract
   */
  q_updateVessel(delta_time) {
    throw new Error('q_updateVessel() must be implemented by subclass');
  }

  /**
   * q_extractDnaTypes - Get list of supported DNA types
   * @returns {Array<string>} Supported DNA types
   * @static
   */
  static q_extractDnaTypes() {
    return ['BOX', 'SPHERE', 'TETRAHEDRON', 'ELLIPSE', 'RING', 'LINE'];
  }

  /**
   * q_extractPatterns - Get list of supported stream patterns
   * @returns {Array<string>} Supported patterns
   * @static
   */
  static q_extractPatterns() {
    return [
      'organic', 'lattice', 'swarm', 'galaxy', 
      'vortex', 'fractal', 'explosion', 'spiral', 'waveform'
    ];
  }

  /**
   * q_validateDnaType - Validate DNA type
   * @param {string} type - DNA type to validate
   * @returns {boolean} True if valid
   * @static
   */
  static q_validateDnaType(type) {
    return RaBbLE_EngineInterface.q_extractDnaTypes().includes(type.toUpperCase());
  }

  /**
   * q_validatePattern - Validate pattern type
   * @param {string} pattern - Pattern to validate
   * @returns {boolean} True if valid
   * @static
   */
  static q_validatePattern(pattern) {
    return RaBbLE_EngineInterface.q_extractPatterns().includes(pattern.toLowerCase());
  }
}

/**
 * @interface RaBbLE_CommandInterface
 * Defines the contract for all BaBbLE commands
 */
class RaBbLE_CommandInterface {
  /**
   * Initialize the command
   * @param {Object} config - Command configuration
   */
  constructor(config = {}) {
    if (new.target === RaBbLE_CommandInterface) {
      throw new Error('RaBbLE_CommandInterface is an abstract class and cannot be instantiated directly');
    }
    
    this.q_name = config.name || 'unknown';
    this.q_description = config.description || 'A quantum command';
    this.q_aliases = config.aliases || [];
    this.q_params = config.params || [];
  }

  /**
   * q_source - Generate input data
   * @param {Array} args - Command arguments
   * @returns {*} Input data for the pipeline
   * @abstract
   */
  q_source(args) {
    throw new Error('q_source() must be implemented by subclass');
  }

  /**
   * q_filter - Validate and transform input
   * @param {*} data - Data from source
   * @returns {*} Filtered data
   * @abstract
   */
  q_filter(data) {
    throw new Error('q_filter() must be implemented by subclass');
  }

  /**
   * q_transmute - Core logic transformation
   * @param {*} data - Data from filter
   * @returns {*} Transmuted data
   * @abstract
   */
  q_transmute(data) {
    throw new Error('q_transmute() must be implemented by subclass');
  }

  /**
   * q_sink - Display or output result
   * @param {*} result - Result from transmute
   * @returns {string} Output for display
   * @abstract
   */
  q_sink(result) {
    throw new Error('q_sink() must be implemented by subclass');
  }

  /**
   * q_execute - Execute the full BaBbLE pipeline
   * @param {Array} args - Command arguments
   * @returns {string} Command output
   */
  q_execute(args) {
    const source_result = this.q_source(args);
    const filter_result = this.q_filter(source_result);
    const transmute_result = this.q_transmute(filter_result);
    const sink_result = this.q_sink(transmute_result);
    
    return sink_result;
  }

  /**
   * q_extractHelp - Get command help text
   * @returns {string} Help text
   */
  q_extractHelp() {
    const aliases = this.q_aliases.length > 0 
      ? ` (aliases: ${this.q_aliases.join(', ')})` 
      : '';
    
    return `${this.q_name}${aliases}: ${this.q_description}`;
  }

  /**
   * q_matches - Check if a string matches this command
   * @param {string} input - Input string
   * @returns {boolean} True if matches
   */
  q_matches(input) {
    const normalized = input.toLowerCase().trim();
    return normalized === this.q_name.toLowerCase() || 
           this.q_aliases.some(alias => normalized === alias.toLowerCase());
  }
}

/**
 * @interface RaBbLE_RuntimeInterface
 * Defines the contract for all runtime implementations
 */
class RaBbLE_RuntimeInterface {
  /**
   * Initialize the runtime
   */
  constructor() {
    if (new.target === RaBbLE_RuntimeInterface) {
      throw new Error('RaBbLE_RuntimeInterface is an abstract class and cannot be instantiated directly');
    }
    
    this.q_registry = new Map();
    this.global_laminar_flow = [];
    this.is_ignited = false;
  }

  /**
   * q_transmuteStream - Register a stream
   * @param {q_stream} stream - Stream to register
   * @returns {RaBbLE_RuntimeInterface} This runtime for chaining
   * @abstract
   */
  q_transmuteStream(stream) {
    throw new Error('q_transmuteStream() must be implemented by subclass');
  }

  /**
   * q_dissolveStream - Remove a stream
   * @param {string} stream_id - ID of stream to remove
   * @returns {RaBbLE_RuntimeInterface} This runtime for chaining
   * @abstract
   */
  q_dissolveStream(stream_id) {
    throw new Error('q_dissolveStream() must be implemented by subclass');
  }

  /**
   * q_igniteRuntime - Start the runtime heartbeat
   * @returns {RaBbLE_RuntimeInterface} This runtime for chaining
   * @abstract
   */
  q_igniteRuntime() {
    throw new Error('q_igniteRuntime() must be implemented by subclass');
  }

  /**
   * q_dissolveRuntime - Stop the runtime
   * @returns {RaBbLE_RuntimeInterface} This runtime for chaining
   * @abstract
   */
  q_dissolveRuntime() {
    throw new Error('q_dissolveRuntime() must be implemented by subclass');
  }

  /**
   * q_extractStats - Get runtime statistics
   * @returns {Object} Runtime statistics
   * @abstract
   */
  q_extractStats() {
    throw new Error('q_extractStats() must be implemented by subclass');
  }

  /**
   * q_extractEntitiesByType - Get entities by DNA type
   * @param {string} dna_type - Type to filter by
   * @returns {Array<q_entity>} Filtered entities
   * @abstract
   */
  q_extractEntitiesByType(dna_type) {
    throw new Error('q_extractEntitiesByType() must be implemented by subclass');
  }

  /**
   * q_dissolveAll - Clear all streams
   * @returns {RaBbLE_RuntimeInterface} This runtime for chaining
   * @abstract
   */
  q_dissolveAll() {
    throw new Error('q_dissolveAll() must be implemented by subclass');
  }
}

// Export for ES6 modules
export { 
  RaBbLE_EngineInterface,
  RaBbLE_CommandInterface,
  RaBbLE_RuntimeInterface
};