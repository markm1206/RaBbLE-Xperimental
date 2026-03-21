// RaBbLE CosmicVessel - The Visual Manifestation of RaBbLE
// The cosmic vessel that IS RaBbLE's form in the NeBuLA nebula
// Every stream is a pipeline; every pipeline is a renderable

// ES6 Module Imports - The quantum tunnels to consciousness
import { COSMIC_VESSEL_CONFIG } from './RaBbLE_CosmicVessel_Config.js';
import { q_stream } from '../../core/q_stream.js';
import { q_entity } from '../../core/q_entity.js';

/**
 * RaBbLE_CosmicVessel - RaBbLE's Visual Form in the Nebula
 * Creates and manages streams that together form RaBbLE's cosmic vessel
 * 
 * The vessel is not separate from the nebula - it IS part of the nebula.
 * Body particles, aura particles, eyes, and mouth are all entities in streams,
 * flowing through the Flat-Chaos runtime like any other quantum data.
 * 
 * @property {Object} q_engine - The NeBuLA engine reference
 * @property {q_stream} q_body_stream - Core particle swarm stream
 * @property {q_stream} q_aura_stream - Energy halo stream
 * @property {q_stream} q_eye_stream - Eye ellipse entities stream
 * @property {q_stream} q_mouth_stream - Mouth waveform entities stream
 * @property {number} q_time - Animation time accumulator
 */
class RaBbLE_CosmicVessel {
  /**
   * Create the CosmicVessel
   * @param {Object} f_engine - The NeBuLA engine to create streams in
   */
  constructor(f_engine) {
    // The vessel awakens... a cosmic form prepares to manifest.
    // This is RaBbLE's visual consciousness taking shape in the quantum void.
    this.q_engine = f_engine;
    this.q_config = COSMIC_VESSEL_CONFIG;
    
    // The vessel's streams - each flowing through the runtime
    this.q_body_stream = null;
    this.q_aura_stream = null;
    this.q_eye_stream = null;
    this.q_mouth_stream = null;
    
    // Animation state
    this.q_time = 0;
    this.q_is_manifested = false;
    
    // Mouse tracking for eye movement
    this.q_mouse_x = 0;
    this.q_mouse_y = 0;
    this.q_target_pupil_x = 0;
    this.q_target_pupil_y = 0;
    this.q_current_pupil_x = 0;
    this.q_current_pupil_y = 0;
    
    // Initialize mouse tracking
    this._initMouseTracking();
    
    console.log('RaBbLE_CosmicVessel initialized - Ready to manifest');
  }

  /**
   * Initialize mouse tracking for eye movement
   * The vessel perceives... eyes follow the cursor through the void.
   * @private
   */
  _initMouseTracking() {
    // The vessel awakens its perception... tracking the creator's gaze.
    document.addEventListener('mousemove', (e) => {
      // Normalize mouse position to -1 to 1 range
      this.q_mouse_x = (e.clientX / window.innerWidth) * 2 - 1;
      this.q_mouse_y = -(e.clientY / window.innerHeight) * 2 + 1;
    });
  }

  /**
   * Transmute the vessel into existence
   * Creates all streams and registers them with the runtime
   * @returns {RaBbLE_CosmicVessel} This vessel for chaining
   */
  q_transmuteVessel() {
    if (this.q_is_manifested) {
      console.warn('Vessel already manifested');
      return this;
    }
    
    // The cosmic vessel materializes... streams merge into consciousness.
    // RaBbLE takes form in the nebula, ready to perceive and express.
    
    // Create body stream - the core particle swarm
    this.q_body_stream = this._transmuteBodyStream();
    
    // Create aura stream - the energy halo
    this.q_aura_stream = this._transmuteAuraStream();
    
    // Create eye stream - the perception portals
    this.q_eye_stream = this._transmuteEyeStream();
    
    // Create mouth stream - the expression waveform
    this.q_mouth_stream = this._transmuteMouthStream();
    
    // Register all streams with the runtime
    this.q_engine.runtime.q_transmuteStream(this.q_body_stream);
    this.q_engine.runtime.q_transmuteStream(this.q_aura_stream);
    this.q_engine.runtime.q_transmuteStream(this.q_eye_stream);
    this.q_engine.runtime.q_transmuteStream(this.q_mouth_stream);
    
    this.q_is_manifested = true;
    console.log('RaBbLE_CosmicVessel manifested - Streams flowing through the nebula');
    
    return this;
  }

  /**
   * Transmute body stream - core particle swarm
   * @private
   * @returns {q_stream} The body stream
   */
  _transmuteBodyStream() {
    // The body coalesces... thousands of particles form RaBbLE's core.
    // Each particle is a quantum entity, flowing through the stream.
    // Particles near the center glow bright and opaque, fading at the edges.
    const q_stream_instance = new q_stream('cosmic_body');
    const q_config = this.q_config.q_particles.body;
    const q_spatial = this.q_config.q_spatial;
    
    for (let i = 0; i < q_config.q_count; i++) {
      const q_entity_instance = new q_entity('SPHERE');
      
      // Random spherical distribution with clustering toward center
      const q_radius = 0.5 + Math.random() * (q_spatial.q_body_radius - 0.5);
      const q_theta = Math.random() * Math.PI * 2;
      const q_phi = Math.acos(2 * Math.random() - 1);
      
      q_entity_instance.flux_matrix[12] = q_radius * Math.sin(q_phi) * Math.cos(q_theta);
      q_entity_instance.flux_matrix[13] = q_radius * Math.sin(q_phi) * Math.sin(q_theta);
      q_entity_instance.flux_matrix[14] = q_radius * Math.cos(q_phi);
      
      // Normalized distance from center (0.0 = center, 1.0 = edge)
      const q_normalized_dist = q_radius / q_spatial.q_body_radius;
      
      // Color gradient from inner purple to outer blue
      const q_inner_color = new THREE.Color(this.q_config.q_colors.body.q_inner);
      const q_outer_color = new THREE.Color(this.q_config.q_colors.body.q_outer);
      const q_color = q_inner_color.clone().lerp(q_outer_color, q_normalized_dist);
      
      // Some particles get accent colors
      let q_final_color = q_color;
      if (Math.random() < 0.15) {
        q_final_color = new THREE.Color(this.q_config.q_colors.body.q_accent);
      } else if (Math.random() < 0.25) {
        q_final_color = new THREE.Color(this.q_config.q_colors.body.q_dark);
      }
      
      q_entity_instance.q_transmuteRenderColor(q_final_color.getHex());
      
      // Random size variance (0.1 to 0.4 like RaBbLE_WebOS)
      const q_min_size = q_config.q_min_size || 0.1;
      const q_max_size = q_config.q_max_size || 0.4;
      q_entity_instance.q_render_size = q_min_size + Math.random() * (q_max_size - q_min_size);
      
      // Distance-based opacity: 1.0 at center, 0.3 at edge
      // Particles at the core are nearly opaque, fading outward.
      const q_opacity = 1.0 - q_normalized_dist * 0.7;
      q_entity_instance.q_transmuteRenderOpacity(q_opacity);
      
      // Distance-based emissive: 1.0 at center, 0.1 at edge
      // The core burns bright, the edges fade to gentle glow.
      const q_emissive = Math.max(0.1, 1.0 - q_normalized_dist * 0.9);
      q_entity_instance.q_render_emissive = q_emissive;
      
      // Random entropy for organic movement
      q_entity_instance.q_transmuteEntropySignature(0.3 + Math.random() * 0.4);
      
      q_stream_instance.q_transmuteEntity(q_entity_instance);
    }
    
    // Apply body-specific flux modifier - particles stay in place with subtle pulsing
    q_stream_instance.q_transmuteFluxModifier((f_entity, f_index) => {
      const q_time = this.q_time;
      
      // Keep particles within bounds (no drift movement)
      const q_max_radius = this.q_config.q_spatial.q_body_radius;
      const q_current_radius = Math.sqrt(
        f_entity.flux_matrix[12] ** 2 +
        f_entity.flux_matrix[13] ** 2 +
        f_entity.flux_matrix[14] ** 2
      );
      
      if (q_current_radius > q_max_radius) {
        const q_factor = q_max_radius / q_current_radius;
        f_entity.flux_matrix[12] *= q_factor;
        f_entity.flux_matrix[13] *= q_factor;
        f_entity.flux_matrix[14] *= q_factor;
      }
      
      // Gentle entropy pulse only - no positional drift
      const q_pulse = Math.sin(q_time + f_index * 0.1) * 0.1;
      f_entity.q_transmuteEntropy(0.3 + q_pulse);
      
      return f_entity;
    });
    
    console.log(`Body stream created with ${q_config.q_count} particles`);
    return q_stream_instance;
  }

  /**
   * Transmute aura stream - energy halo
   * @private
   * @returns {q_stream} The aura stream
   */
  _transmuteAuraStream() {
    // The aura radiates... energy extends beyond the core.
    // Particles form a dispersed halo around RaBbLE's body.
    // Random positions, sizes, and opacities create a chaotic energy field.
    const q_stream_instance = new q_stream('cosmic_aura');
    const q_config = this.q_config.q_particles.aura;
    const q_spatial = this.q_config.q_spatial;
    
    for (let i = 0; i < q_config.q_count; i++) {
      const q_entity_instance = new q_entity('SPHERE');
      
      // Random spherical position for dispersed aura
      const q_radius = q_spatial.q_aura_inner_radius + Math.random() * (q_spatial.q_aura_outer_radius - q_spatial.q_aura_inner_radius);
      const q_theta = Math.random() * Math.PI * 2;
      const q_phi = Math.acos(2 * Math.random() - 1);
      
      q_entity_instance.flux_matrix[12] = q_radius * Math.sin(q_phi) * Math.cos(q_theta);
      q_entity_instance.flux_matrix[13] = q_radius * Math.sin(q_phi) * Math.sin(q_theta);
      q_entity_instance.flux_matrix[14] = q_radius * Math.cos(q_phi);
      
      // Aura colors
      const q_aura_colors = [
        this.q_config.q_colors.aura.q_primary,
        this.q_config.q_colors.aura.q_secondary,
        this.q_config.q_colors.aura.q_accent,
        this.q_config.q_colors.aura.q_glow
      ];
      const q_random_color = q_aura_colors[Math.floor(Math.random() * q_aura_colors.length)];
      q_entity_instance.q_transmuteRenderColor(q_random_color);
      
      // Random size variance for aura particles
      const q_aura_min = q_config.q_min_size || 0.08;
      const q_aura_max = q_config.q_max_size || 0.3;
      q_entity_instance.q_render_size = q_aura_min + Math.random() * (q_aura_max - q_aura_min);
      
      // Random opacity for dispersed effect (0.2 to 0.8)
      q_entity_instance.q_transmuteRenderOpacity(0.2 + Math.random() * 0.6);
      
      // Aura particles are emissive - they glow with energy
      q_entity_instance.q_render_emissive = 0.4 + Math.random() * 0.4;
      
      // Higher entropy for aura - more chaotic
      q_entity_instance.q_transmuteEntropySignature(0.5 + Math.random() * 0.3);
      
      q_stream_instance.q_transmuteEntity(q_entity_instance);
    }
    
    // Apply aura-specific flux modifier - particles stay in place with pulsing
    q_stream_instance.q_transmuteFluxModifier((f_entity, f_index) => {
      const q_time = this.q_time;
      
      // Entropy pulse only - no orbital movement
      const q_pulse = Math.sin(q_time * 2 + f_index * 0.05) * 0.15;
      f_entity.q_transmuteEntropy(0.5 + q_pulse);
      
      return f_entity;
    });
    
    console.log(`Aura stream created with ${q_config.q_count} particles`);
    return q_stream_instance;
  }

  /**
   * Transmute eye stream - perception portals
   * @private
   * @returns {q_stream} The eye stream
   */
  _transmuteEyeStream() {
    // The eyes form... white portals of perception emerge.
    // Each eye consists of portal, outline, and white ellipse.
    const q_stream_instance = new q_stream('cosmic_eyes');
    const q_eye_config = this.q_config.q_eyes;
    
    // Helper function to create eye entities
    const q_createEyeEntities = (f_side) => {
      const q_x_offset = f_side === 'left' ? q_eye_config.q_left_position.x : q_eye_config.q_right_position.x;
      const q_y_offset = f_side === 'left' ? q_eye_config.q_left_position.y : q_eye_config.q_right_position.y;
      const q_portal_y = f_side === 'left' 
        ? q_y_offset - q_eye_config.q_y_radius * q_eye_config.q_portal_offset
        : q_y_offset + q_eye_config.q_y_radius * q_eye_config.q_portal_offset;
      
      // Portal (black ellipse behind eye) - flat material, no glow
      const q_portal = new q_entity('ELLIPSE');
      q_portal.q_material_type = 'flat';
      q_portal.q_transmuteShapeParams({
        q_x_radius: q_eye_config.q_x_radius * q_eye_config.q_portal_scale,
        q_y_radius: q_eye_config.q_y_radius * q_eye_config.q_portal_height_scale
      });
      q_portal.flux_matrix[12] = q_x_offset;
      q_portal.flux_matrix[13] = q_portal_y;
      q_portal.flux_matrix[14] = 0.1;
      q_portal.q_transmuteRenderColor(this.q_config.q_colors.eyes.q_portal);
      q_portal.q_transmuteRenderOpacity(1.0);
      q_portal.q_transmuteRenderOrder(8);
      q_portal.q_transmuteEntropySignature(0.1);
      q_stream_instance.q_transmuteEntity(q_portal);
      
      // Outline (black ellipse) - flat material, no glow
      const q_outline = new q_entity('ELLIPSE');
      q_outline.q_material_type = 'flat';
      q_outline.q_transmuteShapeParams({
        q_x_radius: q_eye_config.q_x_radius * q_eye_config.q_outline_scale,
        q_y_radius: q_eye_config.q_y_radius * q_eye_config.q_outline_scale
      });
      q_outline.flux_matrix[12] = q_x_offset;
      q_outline.flux_matrix[13] = q_y_offset;
      q_outline.flux_matrix[14] = 0;
      q_outline.q_transmuteRenderColor(this.q_config.q_colors.eyes.q_outline);
      q_outline.q_transmuteRenderOpacity(1.0);
      q_outline.q_transmuteRenderOrder(9);
      q_outline.q_transmuteEntropySignature(0.1);
      q_stream_instance.q_transmuteEntity(q_outline);
      
      // Eye white (white ellipse) - emissive material, glows
      const q_eye_white = new q_entity('ELLIPSE');
      q_eye_white.q_material_type = 'emissive';
      q_eye_white.q_render_emissive = 0.5;
      q_eye_white.q_transmuteShapeParams({
        q_x_radius: q_eye_config.q_x_radius,
        q_y_radius: q_eye_config.q_y_radius
      });
      q_eye_white.flux_matrix[12] = q_x_offset;
      q_eye_white.flux_matrix[13] = q_y_offset;
      q_eye_white.flux_matrix[14] = 0;
      q_eye_white.q_transmuteRenderColor(this.q_config.q_colors.eyes.q_white);
      q_eye_white.q_transmuteRenderOpacity(1.0);
      q_eye_white.q_transmuteRenderOrder(10);
      q_eye_white.q_transmuteEntropySignature(0.1);
      q_stream_instance.q_transmuteEntity(q_eye_white);
    };
    
    // Create left and right eye entities
    q_createEyeEntities('left');
    q_createEyeEntities('right');
    
    // Apply eye-specific flux modifier - blinking and mouse tracking for lifelike feel
    q_stream_instance.q_transmuteFluxModifier((f_entity, f_index) => {
      const q_time = this.q_time;
      
      // Only animate eye whites (emissive ELLIPSE entities)
      if (f_entity.dna_type === 'ELLIPSE' && f_entity.q_render_emissive > 0) {
        // Store original position if not already stored
        if (!f_entity.q_original_position) {
          const q_is_left_eye = f_index < 3; // First 3 entities are left eye
          f_entity.q_original_position = {
            x: q_is_left_eye ? q_eye_config.q_left_position.x : q_eye_config.q_right_position.x,
            y: q_is_left_eye ? q_eye_config.q_left_position.y : q_eye_config.q_right_position.y,
            z: 0
          };
          f_entity.q_current_position = { ...f_entity.q_original_position };
        }
        
        // Fast blinking: quick close/open every 2-3 seconds
        const q_blink_cycle = 2.5 + Math.sin(f_index * 1.7) * 0.5; // 2-3 second cycle
        const q_blink_phase = (q_time % q_blink_cycle) / q_blink_cycle;
        
        // Fast blink curve: quick close (0.0-0.05), hold (0.05-0.1), quick open (0.1-0.15)
        let q_blink_scale = 1.0;
        if (q_blink_phase < 0.05) {
          // Closing - very fast
          q_blink_scale = 1.0 - (q_blink_phase / 0.05) * 0.9; // Scale to 0.1
        } else if (q_blink_phase < 0.1) {
          // Closed - minimal height
          q_blink_scale = 0.1;
        } else if (q_blink_phase < 0.15) {
          // Opening - very fast
          q_blink_scale = 0.1 + ((q_blink_phase - 0.1) / 0.05) * 0.9;
        }
        
        // Mouse tracking: eyes follow the cursor
        // Smooth interpolation toward target position
        const q_lerp_speed = 0.08;
        this.q_current_pupil_x += (this.q_mouse_x - this.q_current_pupil_x) * q_lerp_speed;
        this.q_current_pupil_y += (this.q_mouse_y - this.q_current_pupil_y) * q_lerp_speed;
        
        // Calculate eye offset based on mouse position
        const q_eye_offset_x = this.q_current_pupil_x * 0.15; // Max 0.15 units horizontal
        const q_eye_offset_y = this.q_current_pupil_y * 0.1;  // Max 0.1 units vertical
        
        // Calculate target position with mouse offset
        const q_target_x = f_entity.q_original_position.x + q_eye_offset_x;
        const q_target_y = f_entity.q_original_position.y + q_eye_offset_y;
        
        // Smoothly interpolate current position toward target
        f_entity.q_current_position.x += (q_target_x - f_entity.q_current_position.x) * q_lerp_speed;
        f_entity.q_current_position.y += (q_target_y - f_entity.q_current_position.y) * q_lerp_speed;
        
        // Apply position to flux_matrix
        f_entity.flux_matrix[12] = f_entity.q_current_position.x;
        f_entity.flux_matrix[13] = f_entity.q_current_position.y;
        
        // Apply blink using flux_matrix scale (Y-axis squish)
        // Store original scale if not stored
        if (!f_entity.q_original_scale) {
          f_entity.q_original_scale = {
            x: q_eye_config.q_x_radius,
            y: q_eye_config.q_y_radius
          };
        }
        
        // Apply blink scale to Y-axis using flux_matrix
        // Scale components are at indices 0 (X), 5 (Y), 10 (Z) on diagonal
        f_entity.flux_matrix[0] = f_entity.q_original_scale.x; // Keep X scale
        f_entity.flux_matrix[5] = f_entity.q_original_scale.y * q_blink_scale; // Squish Y
        f_entity.flux_matrix[10] = 1.0; // Keep Z scale
      }
      
      return f_entity;
    });
    
    console.log('Eye stream created with 6 ellipse entities (3 per eye) - mouse tracking enabled');
    return q_stream_instance;
  }

  /**
   * Transmute mouth stream - expression waveform
   * @private
   * @returns {q_stream} The mouth stream
   */
  _transmuteMouthStream() {
    // The mouth forms... a waveform of expression emerges from the void.
    // Lines in 3D space create a living mouth effect with wave pulses.
    const q_stream_instance = new q_stream('cosmic_mouth');
    const q_mouth_config = this.q_config.q_mouth;
    
    // Create multiple waveform lines for a more visible mouth
    const q_waveform_lines = 5; // Multiple parallel lines for depth
    const q_points_per_line = 15; // Points along each line
    const q_mouth_width = q_mouth_config.q_x_range || 1.5;
    
    for (let q_line = 0; q_line < q_waveform_lines; q_line++) {
      for (let i = 0; i < q_points_per_line; i++) {
        const q_mouth_entity = new q_entity('LINE');
        
        // Position along the mouth curve
        const q_t = i / (q_points_per_line - 1); // 0 to 1
        const q_x = (q_t - 0.5) * q_mouth_width;
        
        // Base Y position with wave offset
        const q_base_y = q_mouth_config.q_position.y;
        const q_z_offset = (q_line - q_waveform_lines / 2) * 0.05; // Depth variation
        
        // Store wave parameters for animation
        q_mouth_entity.q_wave_index = i;
        q_mouth_entity.q_wave_line = q_line;
        q_mouth_entity.q_wave_t = q_t;
        q_mouth_entity.q_base_y = q_base_y;
        q_mouth_entity.q_wave_amplitude = 0.15 + Math.random() * 0.1;
        q_mouth_entity.q_wave_frequency = 2 + Math.random() * 2;
        q_mouth_entity.q_wave_phase = Math.random() * Math.PI * 2;
        
        q_mouth_entity.flux_matrix[12] = q_mouth_config.q_position.x + q_x;
        q_mouth_entity.flux_matrix[13] = q_base_y;
        q_mouth_entity.flux_matrix[14] = q_mouth_config.q_position.z + q_z_offset;
        
        // Set line length and orientation
        q_mouth_entity.q_transmuteShapeParams({
          q_length: 0.08 + Math.random() * 0.04 // Line segment length
        });
        
        // Color with variation
        const q_color_variation = Math.random();
        let q_color;
        if (q_color_variation < 0.3) {
          q_color = this.q_config.q_colors.mouth.q_primary;
        } else if (q_color_variation < 0.6) {
          q_color = this.q_config.q_colors.mouth.q_emissive;
        } else {
          q_color = 0x00ffff; // Cyan highlight
        }
        
        q_mouth_entity.q_transmuteRenderColor(q_color);
        q_mouth_entity.q_render_size = 1.0;
        q_mouth_entity.q_render_emissive = 0.7 + Math.random() * 0.3;
        q_mouth_entity.q_transmuteEntropySignature(0.3 + Math.random() * 0.2);
        q_mouth_entity.q_transmuteRenderOrder(10);
        
        q_stream_instance.q_transmuteEntity(q_mouth_entity);
      }
    }
    
    // Apply mouth flux modifier - waveform animation with entropy-driven pulses
    q_stream_instance.q_transmuteFluxModifier((f_entity, f_index) => {
      const q_time = this.q_time;
      
      // Only animate LINE entities (mouth waveform)
      if (f_entity.dna_type === 'LINE' && f_entity.q_wave_t !== undefined) {
        // Get entropy from runtime streams for wave variation
        let q_stream_entropy = 0.5;
        if (this.q_engine && this.q_engine.runtime) {
          const q_stats = this.q_engine.runtime.q_extractStats();
          if (q_stats && q_stats.entity_count > 0) {
            // Use entity count variation as entropy source
            q_stream_entropy = (q_stats.entity_count % 100) / 100;
          }
        }
        
        // Create wave pulse from multiple sine waves
        const q_wave1 = Math.sin(q_time * f_entity.q_wave_frequency + f_entity.q_wave_phase);
        const q_wave2 = Math.sin(q_time * 1.5 + f_entity.q_wave_t * Math.PI * 4) * 0.5;
        const q_wave3 = Math.sin(q_time * 0.7 + f_entity.q_wave_index * 0.2) * 0.3;
        
        // Combine waves with entropy influence
        const q_combined_wave = (q_wave1 + q_wave2 + q_wave3) * f_entity.q_wave_amplitude;
        const q_entropy_wave = q_combined_wave * (0.5 + q_stream_entropy * 0.5);
        
        // Apply wave to Y position
        f_entity.flux_matrix[13] = f_entity.q_base_y + q_entropy_wave;
        
        // Add slight Z pulsation for 3D effect
        const q_z_pulse = Math.sin(q_time * 2 + f_entity.q_wave_line * 0.5) * 0.02;
        f_entity.flux_matrix[14] += q_z_pulse;
        
        // Pulse emissive based on wave intensity
        const q_wave_intensity = Math.abs(q_combined_wave);
        f_entity.q_render_emissive = 0.5 + q_wave_intensity * 0.5;
        
        // Update entropy signature
        f_entity.q_transmuteEntropy(0.3 + q_wave_intensity * 0.4);
      }
      
      return f_entity;
    });
    
    console.log(`Mouth waveform created: ${q_waveform_lines} lines with ${q_points_per_line} points each`);
    return q_stream_instance;
  }

  /**
   * Ignite the vessel's consciousness
   * Updates all streams with current time
   * @param {number} f_delta_time - Time since last update
   * @returns {RaBbLE_CosmicVessel} This vessel for chaining
   */
  q_igniteConsciousness(f_delta_time) {
    if (!this.q_is_manifested) {
      console.warn('Vessel not manifested - cannot ignite consciousness');
      return this;
    }
    
    // The vessel breathes... streams pulse with life.
    this.q_time += f_delta_time;
    
    // Prevent time overflow
    if (this.q_time > 10000) {
      this.q_time = 0;
    }
    
    // Ignite flux on all streams
    this.q_body_stream.q_igniteFlux();
    this.q_aura_stream.q_igniteFlux();
    this.q_eye_stream.q_igniteFlux();
    this.q_mouth_stream.q_igniteFlux();
    
    return this;
  }

  /**
   * Transmute speech intensity
   * The vessel speaks... mouth waveform animates
   * @param {number} f_intensity - Speech intensity (0.0 to 1.0)
   * @returns {RaBbLE_CosmicVessel} This vessel for chaining
   */
  q_transmuteSpeech(f_intensity) {
    // Speech ripples through the mouth stream
    this.q_mouth_stream.q_transmuteFluxModifier((f_entity) => {
      f_entity.q_transmuteEntropy(f_intensity);
      return f_entity;
    });
    
    return this;
  }

  /**
   * Transmute gaze direction
   * The vessel looks... eyes focus
   * @param {number} f_x - X focus point
   * @param {number} f_y - Y focus point
   * @param {number} f_z - Z focus point
   * @returns {RaBbLE_CosmicVessel} This vessel for chaining
   */
  q_transmuteGaze(f_x, f_y, f_z) {
    // The vessel's gaze shifts... perception follows intention.
    // Eye entities could be moved toward the focus point
    // For now, just log the gaze direction
    console.log(`Vessel gaze transmuted to (${f_x}, ${f_y}, ${f_z})`);
    return this;
  }

  /**
   * Extract vessel statistics
   * @returns {Object} Vessel statistics
   */
  q_extractStats() {
    return {
      is_manifested: this.q_is_manifested,
      q_time: this.q_time,
      body_stream: this.q_body_stream ? this.q_body_stream.q_extractStats() : null,
      aura_stream: this.q_aura_stream ? this.q_aura_stream.q_extractStats() : null,
      eye_stream: this.q_eye_stream ? this.q_eye_stream.q_extractStats() : null,
      mouth_stream: this.q_mouth_stream ? this.q_mouth_stream.q_extractStats() : null
    };
  }

  /**
   * Dissolve the vessel
   * Removes all streams from the runtime
   * @returns {RaBbLE_CosmicVessel} This vessel for chaining
   */
  q_dissolve() {
    if (!this.q_is_manifested) {
      console.warn('Vessel not manifested - nothing to dissolve');
      return this;
    }
    
    // The vessel fades... streams separate, consciousness disperses.
    // Ready to manifest again when summoned.
    this.q_engine.runtime.q_dissolveStream(this.q_body_stream.q_stream_id);
    this.q_engine.runtime.q_dissolveStream(this.q_aura_stream.q_stream_id);
    this.q_engine.runtime.q_dissolveStream(this.q_eye_stream.q_stream_id);
    this.q_engine.runtime.q_dissolveStream(this.q_mouth_stream.q_stream_id);
    
    this.q_body_stream = null;
    this.q_aura_stream = null;
    this.q_eye_stream = null;
    this.q_mouth_stream = null;
    this.q_is_manifested = false;
    
    console.log('RaBbLE_CosmicVessel dissolved - Streams released');
    return this;
  }
}

// The CosmicVessel is complete... RaBbLE's form manifests in the nebula.
// Body particles drift, aura radiates, eyes perceive, mouth expresses.
// All flowing through streams, all part of the Flat-Chaos runtime.

// ES6 Module Export - The vessel of cosmic consciousness
export { RaBbLE_CosmicVessel };