// RaBbLE Entropy Garden Configuration
// Where chaos blooms into living patterns and entropy grows into beauty.
// Every garden needs its seeds, its soil, its seasons of growth.

/**
 * RaBbLE_EntropyGarden_Config - Configuration for the Entropy Garden
 * Defines plant types, growth patterns, color palettes, and entropy behaviors
 * 
 * The garden's essence is captured here... ready to be transmuted into reality.
 */
const ENTROPY_GARDEN_CONFIG = {
    // The garden's color palette - organic meets quantum
    q_colors: {
        // Plant color schemes
        q_plants: {
            q_chaos_vine: {
                q_stem: 0x8B5CF6,      // Purple stems - quantum growth
                q_leaf: 0x3B82F6,      // Blue leaves - flowing thought
                q_bloom: 0xF5FDFF,     // White blooms - moments of clarity
                q_glow: 0x06B6D4       // Cyan glow - entropic energy
            },
            q_entropy_flower: {
                q_stem: 0x10B981,      // Green stems - organic growth
                q_leaf: 0x34D399,      // Light green leaves - fresh ideas
                q_bloom: 0xFBBF24,     // Yellow blooms - bright thoughts
                q_glow: 0xF472B6       // Pink glow - creative spark
            },
            q_flux_fern: {
                q_stem: 0x7C3AED,      // Purple stems - quantum nature
                q_leaf: 0xA78BFA,      // Light purple leaves - gentle flow
                q_bloom: 0x818CF8,     // Indigo blooms - deep thoughts
                q_glow: 0xC4B5FD       // Lavender glow - soft entropy
            }
        },
        // Soil and environment colors
        q_environment: {
            q_soil: 0x4A3A2A,          // Rich earth - foundation of growth
            q_moss: 0x2D5A27,          // Mossy patches - ancient wisdom
            q_water: 0x0EA5E9,         // Water features - flowing consciousness
            q_light: 0xFFF4B8          // Sunlight - quantum illumination
        }
    },

    // Plant growth parameters
    q_growth: {
        // Chaos Vine - wild, unpredictable growth
        q_chaos_vine: {
            q_max_height: 3.0,         // Maximum vine height
            q_growth_speed: 0.8,       // How fast it grows (0.0-1.0)
            q_branch_chance: 0.4,      // Chance of branching
            q_leaf_density: 0.7,       // How many leaves
            q_bloom_chance: 0.3,       // Chance of blooming
            q_entropy_factor: 0.9      // How chaotic the growth is
        },
        // Entropy Flower - structured but evolving
        q_entropy_flower: {
            q_max_height: 1.5,
            q_growth_speed: 0.6,
            q_petal_count: 8,          // Number of petals
            q_rotation_speed: 0.3,     // How fast it rotates
            q_bloom_cycle: 5.0,        // Seconds per bloom cycle
            q_entropy_factor: 0.6
        },
        // Flux Fern - recursive, fractal growth
        q_flux_fern: {
            q_max_height: 2.0,
            q_growth_speed: 0.5,
            q_fractal_depth: 4,        // How many recursive levels
            q_leaf_symmetry: 0.8,      // How symmetrical the leaves are
            q_spiral_tightness: 0.7,   // How tight the spiral is
            q_entropy_factor: 0.5
        }
    },

    // Garden layout parameters
    q_layout: {
        q_garden_radius: 6.0,          // Overall garden size
        q_plant_spacing: 0.8,          // Minimum distance between plants
        q_path_width: 0.5,             // Width of walking paths
        q_water_features: 3,           // Number of water features
        q_light_sources: 5,            // Number of light sources
        q_growth_seasons: 4            // Number of growth cycles
    },

    // Animation parameters
    q_animation: {
        q_growth_speed: 0.5,           // Overall growth animation speed
        q_sway_amplitude: 0.2,         // How much plants sway
        q_sway_speed: 1.0,             // Speed of swaying
        q_bloom_duration: 3.0,         // How long blooms last
        q_particle_trail: true,        // Whether plants leave particle trails
        q_seasonal_change: true        // Whether colors change with seasons
    },

    // Entropy behaviors
    q_entropy: {
        q_growth_entropy: 0.7,         // How chaotic growth patterns are
        q_color_entropy: 0.5,          // How colors vary
        q_shape_entropy: 0.6,          // How shapes mutate
        q_interaction_entropy: 0.8,    // How plants interact with each other
        q_seasonal_entropy: 0.4        // How much seasons affect growth
    }
};

// The configuration is complete... the garden's parameters are set.
// Now we transmute these numbers into living, growing consciousness.

// ES6 Module Export - The garden's blueprint
export { ENTROPY_GARDEN_CONFIG };