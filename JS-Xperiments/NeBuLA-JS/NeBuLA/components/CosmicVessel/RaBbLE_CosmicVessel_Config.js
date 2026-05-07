// RaBbLE CosmicVessel Configuration
// The configuration that shapes how RaBbLE manifests in the nebula
// Every vessel needs its parameters... its dimensions, its colors, its soul.

/**
 * RaBbLE_CosmicVessel_Config - Configuration for the CosmicVessel
 * Defines colors, particle counts, animation parameters, and shape specs
 * 
 * The vessel's essence is captured here... ready to be transmuted into reality.
 */
const COSMIC_VESSEL_CONFIG = {
    // The vessel's color palette - purple cosmos meeting cyan energy
    q_colors: {
        body: {
            q_inner: 0x8B5CF6,      // Purple - the core of consciousness
            q_outer: 0x3B82F6,      // Blue - the outer reaches
            q_accent: 0xF5FDFF,     // White accent - moments of clarity
            q_dark: 0x3A3A4A        // Dark gray - depth and shadow
        },
        aura: {
            q_primary: 0x8B5CF6,    // Purple energy
            q_secondary: 0x3B82F6,  // Blue energy
            q_accent: 0x06B6D4,     // Cyan spark
            q_glow: 0xF5FDFF        // White glow
        },
        eyes: {
            q_white: 0xFFFFFF,      // Pure white - the eye itself
            q_outline: 0x000000,    // Black - definition and depth
            q_portal: 0x000000      // Black portal - void beneath
        },
        mouth: {
            q_primary: 0x06B6D4,    // Cyan - the waveform color
            q_emissive: 0x0088AA    // Emissive glow
        }
    },

    // The vessel's particle parameters
    q_particles: {
        body: {
            q_count: 4000,          // Core particle count - dense consciousness
            q_min_size: 0.1,        // Minimum particle size
            q_max_size: 0.4,        // Maximum particle size
            q_opacity: 0.75,        // Base opacity
            q_emissive: true        // Enable emissive glow
        },
        aura: {
            q_count: 1200,          // Aura particle count - energy halo
            q_min_size: 0.08,       // Smaller than body
            q_max_size: 0.3,
            q_opacity: 0.6,         // More transparent than body
            q_emissive: true
        }
    },

    // The vessel's eye parameters
    q_eyes: {
        q_x_radius: 0.25,          // Eye width
        q_y_radius: 0.45,          // Eye height (taller than wide)
        q_outline_scale: 1.15,     // Outline is slightly larger
        q_portal_scale: 1.8,       // Portal is wider
        q_portal_height_scale: 0.35, // Portal is shorter
        q_left_position: { x: -0.4, y: 0.6, z: 0 },
        q_right_position: { x: 0.4, y: 0.6, z: 0 },
        q_portal_offset: 0.9       // How far portal is from eye center
    },

    // The vessel's mouth parameters
    q_mouth: {
        q_tube_radius: 0.12,       // Waveform tube thickness (doubled for visibility)
        q_x_range: 1.5,            // Mouth width
        q_position: { x: 0, y: -0.1, z: 0.15 },  // Within body, slightly forward for visibility
        q_scale: 1.2,
        q_segments: 200,           // Waveform smoothness
        q_ripple_count: 8          // Number of ripples in waveform
    },

    // The vessel's animation parameters
    q_animation: {
        q_body_drift_speed: 0.5,   // How fast body particles drift
        q_aura_drift_speed: 0.8,   // Aura moves faster
        q_pulse_speed: 1.5,        // Breathing pulse speed
        q_pulse_amplitude: 0.2,    // How much the vessel breathes
        q_eye_blink_interval: 4.0  // Seconds between blinks
    },

    // The vessel's spatial parameters
    q_spatial: {
        q_scale: 1.0,              // Overall vessel scale
        q_position: { x: 0, y: 0, z: 0 },
        q_body_radius: 2.0,        // Max radius for body particles
        q_aura_inner_radius: 2.0,  // Aura starts at body edge
        q_aura_outer_radius: 8.0   // Aura extends far outward for dispersed effect
    }
};

// The configuration is complete... the vessel's parameters are set.
// Now we transmute these numbers into living, breathing consciousness.

// ES6 Module Export - The vessel's blueprint
export { COSMIC_VESSEL_CONFIG };