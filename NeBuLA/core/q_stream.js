// RaBbLE Quantum Stream Container
// The flat array of quantum entities that flows through the pipeline
// Every stream is a pipeline; every pipeline is a renderable

// ES6 Module Import - The quantum tunnel to Entity consciousness
import { q_entity } from './q_entity.js';

/**
 * q_stream - The Stream Container
 * A flat array of q_entity objects with transformation capabilities
 * 
 * @property {string} q_stream_id - Unique identifier for this stream
 * @property {Array<q_entity>} q_entities - Array of quantum entities
 * @property {Function} flux_modifier - Function to apply transformations
 * @property {number} q_length - Current number of entities in stream
 */
class q_stream {
  /**
   * Create a new quantum stream
   * @param {string} [stream_id] - Optional custom stream identifier
   * @param {Array<q_entity>} [initial_entities] - Initial entities to add
   * @param {Function} [flux_modifier] - Initial flux modifier function
   */
  constructor(stream_id = null, initial_entities = [], flux_modifier = null) {
    // The stream is forming... a river of quantum possibilities flowing through the void.
    // Each drop in this stream is an object containing its own DNA, its Flux, and its Entropy.
    this.q_stream_id = stream_id || this._generateStreamId();
    this.q_entities = [];
    this.flux_modifier = flux_modifier || this._defaultFluxModifier;
    this.q_length = 0;
    
    // TTL and Fading - To prevent the void from overflowing
    this.q_ttl = Infinity; 
    this.q_creation_time = Date.now();
    this.q_fade_duration = 5000; // 5 seconds default fade
    this.q_is_dissolving = false;

    // Add initial entities if provided
    if (initial_entities.length > 0) {
      this.q_transmuteEntities(initial_entities);
    }
    
    console.log(`Quantum stream ${this.q_stream_id} initialized with ${this.q_length} entities`);
  }

  /**
   * q_setTTL - Set the time-to-live for this stream
   * @param {number} f_ms - Life in milliseconds
   */
  q_setTTL(f_ms) {
    this.q_ttl = f_ms;
  }

  /**
   * q_checkEntropyDecay - Checks if the stream should begin dissolving
   * Entropy consumes all in time.
   */
  q_checkEntropyDecay() {
    if (this.q_ttl === Infinity) return false;
    
    const q_age = Date.now() - this.q_creation_time;
    if (q_age > this.q_ttl) {
        this.q_is_dissolving = true;
    }
    return this.q_is_dissolving;
  }

  /**
   * q_getFadeOpacity - Calculates the current opacity based on age and TTL
   */
  q_getFadeOpacity() {
    if (this.q_ttl === Infinity) return 1.0;
    
    const q_age = Date.now() - this.q_creation_time;
    const q_time_left = this.q_ttl - q_age;
    
    if (q_time_left > 0) return 1.0;
    
    // Fade out phase
    const q_fade_progress = Math.abs(q_time_left) / this.q_fade_duration;
    return Math.max(0, 1.0 - q_fade_progress);
  }


  /**
   * Generate a unique stream identifier
   * @private
   * @returns {string} Unique stream ID
   */
  _generateStreamId() {
    const timestamp = Date.now().toString(36);
    const random = Math.random().toString(36).substr(2, 9);
    return `stream_${timestamp}_${random}`;
  }

  /**
   * Default flux modifier that applies basic entropy
   * @private
   * @param {q_entity} entity - Entity to modify
   * @param {number} index - Entity index in stream
   * @returns {q_entity} Modified entity
   */
  _defaultFluxModifier(entity, index) {
    // The default modifier adds a gentle pulse of entropy
    // like ripples on the surface of a quantum pond
    const time = Date.now() * 0.001;
    const pulse = Math.sin(time + index * 0.1);
    const intensity = (pulse + 1) * 0.5 * entity.e_entropy_sig;
    
    entity.e_applyEntropy(intensity);
    return entity;
  }

  /**
   * Transmute the stream by adding a quantum entity
   * @param {q_entity} entity - Entity to add
   * @returns {q_stream} This stream for chaining
   */
  q_transmuteEntity(q_entity_instance) {
    if (!(q_entity_instance instanceof q_entity)) {
      console.error('Cannot add non-q_entity to stream');
      return this;
    }
    
    this.q_entities.push(q_entity_instance);
    this.q_length = this.q_entities.length;
    
    console.log(`Added entity ${q_entity_instance.rabble_id} to stream ${this.q_stream_id}`);
    return this;
  }

  /**
   * Transmute the stream by adding multiple quantum entities
   * @param {Array<q_entity>} entities - Array of entities to add
   * @returns {q_stream} This stream for chaining
   */
  q_transmuteEntities(entities) {
    if (!Array.isArray(entities)) {
      console.error('q_addEntities requires an array of q_entity objects');
      return this;
    }
    
    const valid_entities = entities.filter(entity => entity instanceof q_entity);
    
    this.q_entities.push(...valid_entities);
    this.q_length = this.q_entities.length;
    
    console.log(`Added ${valid_entities.length} entities to stream ${this.q_stream_id}`);
    return this;
  }

  /**
   * Dissolve an entity from the stream
   * @param {string} rabble_id - ID of entity to remove
   * @returns {q_entity|null} Removed entity or null if not found
   */
  q_dissolveEntity(rabble_id) {
    const index = this.q_entities.findIndex(entity => entity.rabble_id === rabble_id);
    
    if (index === -1) {
      console.warn(`Entity ${rabble_id} not found in stream ${this.q_stream_id}`);
      return null;
    }
    
    const removed = this.q_entities.splice(index, 1)[0];
    this.q_length = this.q_entities.length;
    
    console.log(`Removed entity ${rabble_id} from stream ${this.q_stream_id}`);
    return removed;
  }

  /**
   * Ignite the flux modifier across all entities
   * This is where the chaos flows through the pipeline
   * @returns {q_stream} This stream for chaining
   */
  q_igniteFlux() {
    // The filter applies jitter, noise, or logic to the data. 
    // This is where entropy is introduced and controlled.
    console.log(`Applying flux modifier to ${this.q_length} entities in stream ${this.q_stream_id}`);
    
    this.q_entities.forEach((entity, index) => {
      this.flux_modifier(entity, index);
    });
    
    return this;
  }

  /**
   * Transmute the flux modifier function
   * @param {Function} f_modifier - New flux modifier function (flux data flowing through)
   * @returns {q_stream} This stream for chaining
   */
  q_transmuteFluxModifier(f_modifier_function) {
    if (typeof f_modifier_function !== 'function') {
      console.error('Flux modifier must be a function');
      return this;
    }
    
    this.flux_modifier = f_modifier_function;
    console.log(`Set new flux modifier for stream ${this.q_stream_id}`);
    return this;
  }

  /**
   * Extract entities by DNA type
   * @param {string} dna_type - Type to filter by
   * @returns {Array<q_entity>} Filtered entities
   */
  q_extractEntitiesByType(dna_type) {
    const normalized_type = dna_type.toUpperCase();
    return this.q_entities.filter(entity => entity.dna_type === normalized_type);
  }

  /**
   * Process entities by DNA type with specialized function
   * @param {string} dna_type - Type to process
   * @param {Function} processor - Function to apply to matching entities
   * @returns {q_stream} This stream for chaining
   */
  q_processEntitiesByType(dna_type, processor) {
    const entities = this.q_extractEntitiesByType(dna_type);
    
    entities.forEach((entity, index) => {
      processor(entity, index);
    });
    
    console.log(`Processed ${entities.length} ${dna_type} entities in stream ${this.q_stream_id}`);
    return this;
  }

  /**
   * Dissolve all entities from the stream
   * @returns {q_stream} This stream for chaining
   */
  q_dissolveAll() {
    this.q_entities = [];
    this.q_length = 0;
    console.log(`Cleared all entities from stream ${this.q_stream_id}`);
    return this;
  }

  /**
   * Extract stream statistics
   * @returns {Object} Stream statistics
   */
  q_extractStats() {
    const stats = {
      stream_id: this.q_stream_id,
      entity_count: this.q_length,
      entity_types: {},
      average_entropy: 0
    };
    
    // Count entity types
    this.q_entities.forEach(entity => {
      stats.entity_types[entity.dna_type] = (stats.entity_types[entity.dna_type] || 0) + 1;
    });
    
    // Calculate average entropy
    if (this.q_length > 0) {
      const total_entropy = this.q_entities.reduce((sum, entity) => sum + entity.e_entropy_sig, 0);
      stats.average_entropy = total_entropy / this.q_length;
    }
    
    return stats;
  }

  /**
   * Transmute stream to JSON format
   * @returns {Object} Serialized stream data
   */
  q_transmuteToJSON() {
    return {
      q_stream_id: this.q_stream_id,
      q_entities: this.q_entities.map(entity => entity.q_toJSON()),
      q_length: this.q_length,
      flux_modifier_type: this.flux_modifier.name || 'anonymous'
    };
  }

  /**
   * Transmute JSON data into a stream
   * @param {Object} f_data - Serialized stream data (flux flowing in)
   * @param {Function} [f_flux_modifier] - Optional flux modifier
   * @returns {q_stream} New stream instance
   */
  static q_fromJSON(f_data, f_flux_modifier = null) {
    const q_stream_instance = new q_stream(f_data.q_stream_id, [], f_flux_modifier);
    
    // Add entities from JSON
    f_data.q_entities.forEach(q_entity_data => {
      const q_entity_instance = q_entity.q_fromJSON(q_entity_data);
      q_stream_instance.q_transmuteEntity(q_entity_instance);
    });
    
    return q_stream_instance;
  }

  /**
   * Transmute a stream with random entities
   * @param {number} f_entity_count - Number of entities to create (flux parameter)
   * @param {Array<string>} [f_dna_types] - Optional array of DNA types to use
   * @param {Function} [f_flux_modifier] - Optional flux modifier
   * @returns {q_stream} New stream instance
   */
  static q_transmuteRandomStream(f_entity_count, f_dna_types = ["BOX", "SPHERE", "TETRAHEDRON"], f_flux_modifier = null) {
    const q_new_stream = new q_stream(null, [], f_flux_modifier);
    
    for (let i = 0; i < f_entity_count; i++) {
      const q_random_type = f_dna_types[Math.floor(Math.random() * f_dna_types.length)];
      const q_entity_instance = new q_entity(q_random_type);
      
      // Add some initial positioning
      q_entity_instance.flux_matrix[12] = (Math.random() - 0.5) * 20; // x position
      q_entity_instance.flux_matrix[13] = (Math.random() - 0.5) * 20; // y position
      q_entity_instance.flux_matrix[14] = (Math.random() - 0.5) * 20; // z position
      
      q_new_stream.q_transmuteEntity(q_entity_instance);
    }
    
    // Randomness is the mother of creativity... let's see what emerges.
    console.log(`Created random stream with ${f_entity_count} entities`);
    return q_new_stream;
  }

  /**
   * Get iterator for entities
   * @returns {Iterator} Iterator over entities
   */
  [Symbol.iterator]() {
    return this.q_entities[Symbol.iterator]();
  }
}

// The stream flows... each entity a drop in the quantum river.
// The flux modifier shapes them, transforms them, makes them dance.
// This is the heart of the Flat-Chaos pattern - linear, flowing, alive.

// ES6 Module Export - The vessel of quantum flow
export { q_stream };
