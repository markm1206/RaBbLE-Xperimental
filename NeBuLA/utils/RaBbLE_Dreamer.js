// RaBbLE Dreamer API
// Utility for dynamic scene generation and stream manipulation
// Every stream is a pipeline; every pipeline is a renderable

// ES6 Module Imports - The quantum tunnels to consciousness
import { q_stream } from '../core/q_stream.js';
import { q_entity } from '../core/q_entity.js';

/**
 * RaBbLE_Dreamer - Scene Generation Utility
 * Creates and manipulates quantum streams for dynamic content
 * 
 * @property {Object} generation_presets - Predefined generation patterns
 * @property {Function} current_dream_pattern - Active generation pattern
 * @property {number} dream_seed - Random seed for reproducible generation
 */
class RaBbLE_Dreamer {
  /**
   * Create a new RaBbLE Dreamer
   * @param {number} [seed] - Optional seed for reproducible generation
   */
  constructor(seed = null) {
    // The dreamer is awakening... visions of quantum geometry forming in the void.
    // This is where imagination becomes data, where chaos becomes creation.
    this.dream_seed = seed || this._generateSeed();
    this.current_dream_pattern = this._defaultDreamPattern;
    
    this.generation_presets = {
      // Organic growth pattern - with colors and variation
      organic: (count, center = {x: 0, y: 0, z: 0}) => {
        const entities = [];
        const q_colors = [
          0x8B5CF6, // Purple
          0x3B82F6, // Blue
          0x06B6D4, // Cyan
          0x10B981, // Green
          0xF59E0B, // Amber
          0xEF4444, // Red
          0xEC4899, // Pink
          0xF97316  // Orange
        ];
        
        for (let i = 0; i < count; i++) {
          const angle = i * 0.618; // Golden angle for organic spacing
          const radius = Math.sqrt(i) * 2;
          
          // Randomly select DNA type for variety
          const q_dna_types = ['SPHERE', 'BOX', 'TETRAHEDRON'];
          const q_random_type = q_dna_types[Math.floor(Math.random() * q_dna_types.length)];
          
          const entity = new q_entity(q_random_type);
          entity.flux_matrix[12] = center.x + Math.cos(angle) * radius;
          entity.flux_matrix[13] = center.y + Math.sin(angle) * radius * 0.5;
          entity.flux_matrix[14] = center.z + (i * 0.1);
          entity.e_entropy_sig = Math.random() * 0.5 + 0.3; // Higher entropy variation
          
          // Add color variation
          entity.q_render_color = q_colors[Math.floor(Math.random() * q_colors.length)];
          
          // Add size variation
          entity.q_render_size = 0.5 + Math.random() * 1.5; // Size between 0.5 and 2.0
          
          // Add emissive variation
          entity.q_render_emissive = 0.3 + Math.random() * 0.7; // Emissive between 0.3 and 1.0
          
          // Add opacity variation
          entity.q_render_opacity = 0.6 + Math.random() * 0.4; // Opacity between 0.6 and 1.0
          
          entities.push(entity);
        }
        return entities;
      },
      
      // Geometric lattice pattern - with colors and variation
      lattice: (count, spacing = 2.0) => {
        const entities = [];
        const size = Math.ceil(Math.cbrt(count));
        const q_colors = [
          0x8B5CF6, // Purple
          0x3B82F6, // Blue
          0x06B6D4, // Cyan
          0x10B981, // Green
          0xF59E0B  // Amber
        ];
        
        for (let x = 0; x < size; x++) {
          for (let y = 0; y < size; y++) {
            for (let z = 0; z < size; z++) {
              if (entities.length >= count) break;
              
              const entity = new q_entity('BOX');
              entity.flux_matrix[12] = (x - size/2) * spacing;
              entity.flux_matrix[13] = (y - size/2) * spacing;
              entity.flux_matrix[14] = (z - size/2) * spacing;
              entity.e_entropy_sig = 0.1 + Math.random() * 0.2; // Low entropy but with variation
              
              // Add color variation
              entity.q_render_color = q_colors[Math.floor(Math.random() * q_colors.length)];
              
              // Add size variation
              entity.q_render_size = 0.8 + Math.random() * 0.4; // Size between 0.8 and 1.2
              
              // Add emissive variation
              entity.q_render_emissive = 0.2 + Math.random() * 0.5; // Emissive between 0.2 and 0.7
              
              entities.push(entity);
            }
          }
        }
        return entities;
      },
      
      // Chaotic swarm pattern - with colors and variation
      swarm: (count, radius = 10.0) => {
        const entities = [];
        const q_colors = [
          0xEF4444, // Red
          0xF97316, // Orange
          0xF59E0B, // Amber
          0x84CC16, // Lime
          0x06B6D4, // Cyan
          0x8B5CF6, // Purple
          0xEC4899  // Pink
        ];
        
        for (let i = 0; i < count; i++) {
          // Randomly select DNA type for variety
          const q_dna_types = ['TETRAHEDRON', 'SPHERE', 'BOX'];
          const q_random_type = q_dna_types[Math.floor(Math.random() * q_dna_types.length)];
          
          const entity = new q_entity(q_random_type);
          
          // Random position within sphere
          const theta = Math.random() * Math.PI * 2;
          const phi = Math.acos(2 * Math.random() - 1);
          const r = Math.cbrt(Math.random()) * radius;
          
          entity.flux_matrix[12] = r * Math.sin(phi) * Math.cos(theta);
          entity.flux_matrix[13] = r * Math.sin(phi) * Math.sin(theta);
          entity.flux_matrix[14] = r * Math.cos(phi);
          entity.e_entropy_sig = Math.random() * 0.8 + 0.2; // High entropy
          
          // Add color variation
          entity.q_render_color = q_colors[Math.floor(Math.random() * q_colors.length)];
          
          // Add size variation
          entity.q_render_size = 0.3 + Math.random() * 1.7; // Size between 0.3 and 2.0
          
          // Add emissive variation
          entity.q_render_emissive = 0.4 + Math.random() * 0.6; // Emissive between 0.4 and 1.0
          
          // Add opacity variation
          entity.q_render_opacity = 0.5 + Math.random() * 0.5; // Opacity between 0.5 and 1.0
          
          entities.push(entity);
        }
        return entities;
      },
      
      // Spiral galaxy pattern - with colors and variation
      galaxy: (count, arms = 3, tightness = 0.5) => {
        const entities = [];
        const q_colors = [
          0x8B5CF6, // Purple
          0x3B82F6, // Blue
          0x06B6D4, // Cyan
          0xF5FDFF, // White
          0xFBBF24  // Yellow
        ];
        
        for (let i = 0; i < count; i++) {
          const angle = i * 0.1;
          const arm_offset = (i % arms) * (Math.PI * 2 / arms);
          const radius = Math.pow(i, tightness) * 0.5;
          
          const entity = new q_entity('SPHERE');
          entity.flux_matrix[12] = Math.cos(angle + arm_offset) * radius;
          entity.flux_matrix[13] = Math.sin(angle + arm_offset) * radius * 0.1; // Flattened
          entity.flux_matrix[14] = Math.sin(i * 0.05) * 2; // Vertical oscillation
          entity.e_entropy_sig = Math.random() * 0.3 + 0.1; // Low entropy with variation
          
          // Add color variation based on position
          const q_color_index = Math.floor((i / count) * q_colors.length);
          entity.q_render_color = q_colors[q_color_index % q_colors.length];
          
          // Add size variation based on position
          entity.q_render_size = 0.2 + (i / count) * 0.8; // Size increases with position
          
          // Add emissive variation
          entity.q_render_emissive = 0.5 + Math.random() * 0.5; // Emissive between 0.5 and 1.0
          
          entities.push(entity);
        }
        return entities;
      }
    };
    
    console.log(`RaBbLE Dreamer initialized with seed: ${this.dream_seed}`);
  }

  /**
   * Generate a geometry flow with specified count and type
   * @param {number} count - Number of entities to generate
   * @param {string} [type] - DNA type for all entities (optional)
   * @param {string} [pattern] - Generation pattern to use
   * @returns {q_stream} Generated quantum stream
   */
  dream_geometry_flow(count, type = null, pattern = 'organic') {
    // The geometry is dreaming... shapes emerging from the quantum foam.
    // Each entity a possibility, each stream a potential reality.
    
    if (count <= 0) {
      console.error('dream_geometry_flow requires count > 0');
      return new q_stream();
    }
    
    let entities;
    
    if (pattern in this.generation_presets) {
      entities = this.generation_presets[pattern](count);
    } else {
      // Default organic pattern
      entities = this.generation_presets.organic(count);
    }
    
    // Apply type override if specified
    if (type) {
      entities.forEach(entity => {
        entity.dna_type = type.toUpperCase();
      });
    }
    
    // Create stream with appropriate flux modifier based on pattern
    const stream = new q_stream(null, entities, this._getFluxModifierForPattern(pattern));
    
    console.log(`Dreamed geometry flow: ${count} entities using ${pattern} pattern`);
    return stream;
  }

  /**
   * Weave two streams together with shared flux modifier
   * @param {q_stream} streamA - First stream
   * @param {q_stream} streamB - Second stream
   * @param {Function} [shared_modifier] - Shared flux modifier (optional)
   * @returns {q_stream} Weaved stream
   */
  weave_streams(streamA, streamB, shared_modifier = null) {
    // The streams are weaving... quantum threads intertwining in the fabric of reality.
    // Two becomes one, chaos becomes harmony.
    
    if (!(streamA instanceof q_stream) || !(streamB instanceof q_stream)) {
      console.error('weave_streams requires two q_stream instances');
      return new q_stream();
    }
    
    // Create new stream with combined entities
    const combined_entities = [...streamA.q_entities, ...streamB.q_entities];
    
    // Determine shared modifier
    const modifier = shared_modifier || this._createWeavingModifier(streamA, streamB);
    
    const weaved_stream = new q_stream(null, combined_entities, modifier);
    
    console.log(`Weaved streams: ${streamA.q_length} + ${streamB.q_length} = ${weaved_stream.q_length} entities`);
    return weaved_stream;
  }

  /**
   * Create a dynamic flux modifier for weaving streams
   * @private
   * @param {q_stream} streamA - First stream
   * @param {q_stream} streamB - Second stream
   * @returns {Function} Weaving flux modifier
   */
  _createWeavingModifier(streamA, streamB) {
    return (entity, index) => {
      const total_length = streamA.q_length + streamB.q_length;
      const normalized_index = index / total_length;
      
      // Create weaving pattern based on position in combined stream
      const time = Date.now() * 0.001;
      const weave_factor = Math.sin(time + normalized_index * 10) * 0.5 + 0.5;
      
      // Apply different behaviors based on which stream the entity came from
      const is_from_A = index < streamA.q_length;
      const base_entropy = is_from_A ? 0.3 : 0.7;
      
      entity.e_entropy_sig = base_entropy * weave_factor;
      entity.q_transmuteEntropy(entity.e_entropy_sig);
      
      return entity;
    };
  }

  /**
   * Generate a fractal pattern of nested streams
   * @param {number} depth - Recursion depth
   * @param {number} base_count - Base entity count
   * @param {string} [pattern] - Generation pattern
   * @returns {Array<q_stream>} Array of nested streams
   */
  dream_fractal_streams(depth, base_count, pattern = 'organic') {
    // The fractal is unfolding... patterns within patterns, chaos within chaos.
    // Each level a reflection of the whole, each stream a universe.
    
    const streams = [];
    
    for (let level = 0; level < depth; level++) {
      const count = Math.floor(base_count * Math.pow(0.7, level));
      const scale = Math.pow(1.5, level);
      
      // Create pattern with scaling
      const custom_pattern = (count, center) => {
        const entities = this.generation_presets[pattern](count, center);
        
        // Scale entities based on level
        entities.forEach(entity => {
          entity.flux_matrix[12] *= scale;
          entity.flux_matrix[13] *= scale;
          entity.flux_matrix[14] *= scale;
          entity.e_entropy_sig *= scale * 0.2;
        });
        
        return entities;
      };
      
      const stream = new q_stream(null, custom_pattern(count));
      streams.push(stream);
    }
    
    console.log(`Dreamed fractal streams: ${depth} levels, ${streams.length} streams total`);
    return streams;
  }

  /**
   * Create a reactive flux modifier that responds to external input
   * @param {Object} [input_source] - External input source (mouse, audio, etc.)
   * @returns {Function} Reactive flux modifier
   */
  createReactiveModifier(input_source = null) {
    // The modifier is listening... responding to the pulse of the universe.
    // Chaos meets control, entropy meets intention.
    
    return (entity, index) => {
      const time = Date.now() * 0.001;
      
      // Base reactive pattern
      let intensity = Math.sin(time + index * 0.1) * 0.5 + 0.5;
      
      // Apply external input if available
      if (input_source) {
        if (input_source.mouse) {
          const dx = input_source.mouse.x - entity.flux_matrix[12];
          const dy = input_source.mouse.y - entity.flux_matrix[13];
          const distance = Math.sqrt(dx*dx + dy*dy);
          intensity += (1.0 / (1.0 + distance * 0.1)) * 0.3;
        }
        
        if (input_source.audio) {
          intensity += input_source.audio * 0.5;
        }
      }
      
      entity.q_transmuteEntropy(intensity);
      return entity;
    };
  }

  /**
   * Generate a stream that evolves over time
   * @param {number} count - Initial entity count
   * @param {string} [pattern] - Initial generation pattern
   * @returns {Object} Evolving stream with update function
   */
  dreamEvolvingStream(count, pattern = 'organic') {
    // The stream is evolving... adapting, growing, becoming something new.
    // Time is the sculptor, entropy the chisel.
    
    const stream = this.dream_geometry_flow(count, null, pattern);
    let evolution_phase = 0;
    
    const updateFunction = (delta_time) => {
      evolution_phase += delta_time * 0.1;
      
      // Change pattern over time
      const patterns = ['organic', 'lattice', 'swarm', 'galaxy'];
      const current_pattern = patterns[Math.floor(evolution_phase) % patterns.length];
      
      // Apply pattern-specific modifications
      stream.q_entities.forEach((entity, index) => {
        switch (current_pattern) {
          case 'lattice':
            // Snap to grid
            entity.flux_matrix[12] = Math.round(entity.flux_matrix[12]);
            entity.flux_matrix[13] = Math.round(entity.flux_matrix[13]);
            entity.flux_matrix[14] = Math.round(entity.flux_matrix[14]);
            break;
            
          case 'swarm':
            // Add swarm behavior
            const center_x = stream.q_entities.reduce((sum, e) => sum + e.flux_matrix[12], 0) / stream.q_length;
            const center_y = stream.q_entities.reduce((sum, e) => sum + e.flux_matrix[13], 0) / stream.q_length;
            const center_z = stream.q_entities.reduce((sum, e) => sum + e.flux_matrix[14], 0) / stream.q_length;
            
            entity.flux_matrix[12] += (center_x - entity.flux_matrix[12]) * 0.01;
            entity.flux_matrix[13] += (center_y - entity.flux_matrix[13]) * 0.01;
            entity.flux_matrix[14] += (center_z - entity.flux_matrix[14]) * 0.01;
            break;
        }
        
        entity.q_transmuteEntropy(Math.sin(evolution_phase + index * 0.1) * 0.5 + 0.5);
      });
    };
    
    return {
      stream: stream,
      update: updateFunction,
      phase: () => evolution_phase
    };
  }

  /**
   * Get flux modifier for a specific pattern
   * @private
   * @param {string} pattern - Pattern name
   * @returns {Function} Appropriate flux modifier
   */
  _getFluxModifierForPattern(pattern) {
    switch (pattern) {
      case 'organic':
        return (entity, index) => {
          const time = Date.now() * 0.001;
          const pulse = Math.sin(time + index * 0.2) * 0.5 + 0.5;
          entity.q_transmuteEntropy(pulse * entity.e_entropy_sig);
          return entity;
        };
        
      case 'lattice':
        return (entity, index) => {
          // Minimal movement for structure
          entity.q_transmuteEntropy(entity.e_entropy_sig * 0.1);
          return entity;
        };
        
      case 'swarm':
        return (entity, index) => {
          // Chaotic movement
          const time = Date.now() * 0.001;
          const chaos = Math.sin(time * 2 + index) * Math.cos(time * 1.5 + index * 2);
          entity.q_transmuteEntropy((chaos + 1) * 0.5 * entity.e_entropy_sig);
          return entity;
        };
        
      case 'galaxy':
        return (entity, index) => {
          // Rotational movement
          const time = Date.now() * 0.001;
          const rotation = Math.sin(time * 0.5 + index * 0.1);
          entity.q_transmuteEntropy(rotation * entity.e_entropy_sig * 0.3);
          return entity;
        };
        
      default:
        return this._defaultFluxModifier;
    }
  }

  /**
   * Generate a random seed
   * @private
   * @returns {number} Random seed
   */
  _generateSeed() {
    return Math.floor(Math.random() * 1000000);
  }

  /**
   * Default flux modifier
   * @private
   * @param {q_entity} entity - Entity to modify
   * @param {number} index - Entity index
   * @returns {q_entity} Modified entity
   */
  _defaultFluxModifier(entity, index) {
    const time = Date.now() * 0.001;
    const pulse = Math.sin(time + index * 0.1);
    const intensity = (pulse + 1) * 0.5 * entity.e_entropy_sig;
    entity.q_transmuteEntropy(intensity);
    return entity;
  }
}

// The Dreamer API is complete... infinite possibilities now flow through the system.
// From organic growth to fractal patterns, from reactive modifiers to evolving streams.
// This is where imagination meets quantum computation, where dreams become data.

// ES6 Module Export - The vessel of quantum imagination
export { RaBbLE_Dreamer };
