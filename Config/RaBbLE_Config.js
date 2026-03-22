/**
 * RaBbLE Configuration - The Quantum Constants
 * Centralized configuration for all magic numbers and tunable parameters
 * 
 * Philosophy: Constants are anchors in the chaos - named horizons of possibility
 * 
 * Usage:
 *   import { RABBLE_CONFIG } from './RaBbLE_Config.js';
 *   const entropy = RABBLE_CONFIG.ENTROPY.DEFAULT_INTENSITY;
 */

const RABBLE_CONFIG = {
  // ==========================================
  // ENTROPY CONSTANTS (The Chaos Horizons)
  // ==========================================
  ENTROPY: {
    DEFAULT_INTENSITY: 0.5,
    MIN_INTENSITY: 0.0,
    MAX_INTENSITY: 1.0,
    JITTER_SCALE: 0.00002,
    ROTATION_JITTER_SCALE: 0.001,
    PULSE_FREQUENCY: 2.0,
    BALANCED_OSCILLATION: true
  },

  // ==========================================
  // STREAM CONSTANTS (The Flow Limits)
  // ==========================================
  STREAM: {
    MAX_ENTITIES: 500,
    MIN_ENTITIES: 1,
    DEFAULT_ENTITIES: 50,
    TTL_INFINITY: Infinity,
    FADE_DURATION_MS: 5000,
    CREATION_COOLDOWN_MS: 100
  },

  // ==========================================
  // ANIMATION CONSTANTS (The Rhythm Horizons)
  // ==========================================
  ANIMATION: {
    BLINK: {
      CYCLE_HORIZON: 4.0,
      CLOSE_PHASE: 0.1,
      HOLD_PHASE: 0.15,
      OPEN_PHASE: 0.25,
      SCALE_MIN: 0.3,
      SCALE_MAX: 1.0
    },
    DART: {
      CYCLE_HORIZON: 3.5,
      DART_PHASE: 0.1,
      DISTANCE_MIN: 0.08,
      DISTANCE_MAX: 0.12,
      SPRING_DAMPING: 0.95
    },
    PULSE: {
      SPEED: 2.0,
      INTENSITY: 0.5,
      SCALE_VARIATION: 0.2
    },
    ORBIT: {
      SPEED: 1.0,
      RADIUS: 0.1,
      SCALE_FACTOR: 0.01
    },
    WAVE: {
      FREQUENCY: 2.0,
      AMPLITUDE: 0.1,
      SCALE_FACTOR: 0.01
    }
  },

  // ==========================================
  // RENDERING CONSTANTS (The Visual Horizons)
  // ==========================================
  RENDER: {
    DEFAULT_COLOR: 0xFFFFFF,
    DEFAULT_OPACITY: 1.0,
    DEFAULT_SIZE: 1.0,
    DEFAULT_EMISSIVE: 0.0,
    DEFAULT_RENDER_ORDER: 0,
    ENTROPY_SIZE_FACTOR: 0.5,
    MAX_DRAW_DISTANCE: 1000,
    MIN_DRAW_DISTANCE: 0.1
  },

  // ==========================================
  // SHADER CONSTANTS (The Quantum Frequencies)
  // ==========================================
  SHADERS: {
    TIME_SCALE: 0.001,
    ENTROPY_DEFAULT: 0.5,
    UPDATE_INTERVAL_MS: 16
  },

  // ==========================================
  // CAMERA CONSTANTS (The Quantum Eye)
  // ==========================================
  CAMERA: {
    FOV: 75,
    NEAR: 0.1,
    FAR: 1000,
    DEFAULT_RADIUS: 20,
    MIN_RADIUS: 5,
    MAX_RADIUS: 100,
    ORBIT_SPEED: 0.005,
    ZOOM_SPEED: 0.5,
    PAN_SPEED: 0.1,
    AUTO_ROTATION_SPEED: 0.0003,
    AUTO_ZOOM_SPEED: 0.001,
    DEFAULT_ZOOM_TARGET: 15
  },

  // ==========================================
  // PATTERN CONSTANTS (The Emergence Parameters)
  // ==========================================
  PATTERNS: {
    ORGANIC: {
      GOLDEN_ANGLE: Math.PI * (3 - Math.sqrt(5)),
      RADIUS_SCALE: 0.8,
      Z_SPREAD: 10
    },
    LATTICE: {
      SPACING: 2.0,
      ENTROPY_FACTOR: 0.1
    },
    SWARM: {
      RADIUS: 10.0,
      CHAOS_FACTOR: 0.5
    },
    GALAXY: {
      ARMS: 3,
      TIGHTNESS: 0.5,
      ROTATION_FACTOR: 0.3
    },
    VORTEX: {
      ROTATIONS: 8,
      RADIUS_VARIATION: 3,
      Z_SPREAD: 20
    },
    FRACTAL: {
      BRANCHES: 3,
      BRANCH_SCALE: 0.7,
      Z_OFFSET: 3
    },
    EXPLOSION: {
      RADIUS_MIN: 3,
      RADIUS_MAX: 10,
      HOT_COLORS: [0, 60] // Hue range
    },
    SPIRAL: {
      Z_SPREAD: 10,
      SIZE_DECAY: 0.35
    },
    WAVEFORM: {
      LINES: 5,
      X_SPREAD: 20,
      Z_SPACING: 0.3,
      AMPLITUDE_MIN: 0.3,
      AMPLITUDE_MAX: 0.5,
      FREQUENCY_MIN: 2,
      FREQUENCY_MAX: 5
    }
  },

  // ==========================================
  // COMMAND CONSTANTS (The BaBbLE Limits)
  // ==========================================
  COMMANDS: {
    DREAM: {
      MAX_ENTITIES: 500,
      MIN_ENTITIES: 1,
      DEFAULT_PATTERN: 'organic',
      DEFAULT_TYPE: 'SPHERE',
      LIFETIME_MIN: 15,
      LIFETIME_MAX: 40,
      OPACITY_MIN: 0.7,
      OPACITY_MAX: 1.0
    },
    CHAOS: {
      DEFAULT_INTENSITY: 0.8,
      MIN_INTENSITY: 0,
      MAX_INTENSITY: 1
    },
    COLLAPSE: {
      DEFAULT_INTENSITY: 0.2,
      MIN_INTENSITY: 0,
      MAX_INTENSITY: 1
    },
    STREAM: {
      STAGES: ['dream', 'blink', 'dart', 'pulse', 'orbit', 'wave', 'sink']
    },
    WEAVE: {
      SEPARATOR: '<>'
    },
    ATTRACT: {
      DEFAULT_STRENGTH: 0.3,
      DEFAULT_THRESHOLD: 0.6,
      DEFAULT_RADIUS: 5.0
    },
    BABBLE: {
      THEMES: [
        'creation', 'chaos', 'entropy', 'flux', 'quantum', 
        'nebula', 'stream', 'dream', 'weave', 'attract', 
        'collapse', 'ignite', 'transmute', 'dissolve', 'emerge'
      ],
      DEFAULT_INTENSITY: 0.7,
      DEFAULT_LENGTH: 3,
      MIN_LENGTH: 1,
      MAX_LENGTH: 20
    },
    SEED: {
      ENTROPY_MIN: 0.1,
      ENTROPY_MAX: 0.9
    },
    TRAIL: {
      DEFAULT_LENGTH: 5,
      MAX_LENGTH: 20
    },
    MIX: {
      DEFAULT_RATIO: 0.5,
      MIN_RATIO: 0,
      MAX_RATIO: 1
    },
    LAKE: {
      MAX_LAKES: 10
    },
    PRESET: {
      MAX_PRESETS: 50
    },
    TEST: {
      SCRIPTS: ['dream_basic', 'stream_pipeline', 'weave_combine']
    }
  },

  // ==========================================
  // PERFORMANCE CONSTANTS (The Efficiency Horizons)
  // ==========================================
  PERFORMANCE: {
    FPS_UPDATE_INTERVAL_MS: 1000,
    MAX_CONSOLE_LOGS: 100,
    THROTTLE_RENDER_MS: 16,
    BATCH_SIZE: 100
  },

  // ==========================================
  // UI CONSTANTS (The Interface Horizons)
  // ==========================================
  UI: {
    TERMINAL_MAX_HISTORY: 100,
    BOOT_MESSAGE_DELAY_MIN: 400,
    BOOT_MESSAGE_DELAY_MAX: 1000,
    WINDOW_MIN_WIDTH: 200,
    WINDOW_MIN_HEIGHT: 100,
    DRAG_HANDLE_SIZE: 20
  },

  // ==========================================
  // QUANTUM PULSE CONSTANTS (The Autonomous Thought Rhythm)
  // ==========================================
  QUANTUM_PULSE: {
    MIN_INTERVAL_MS: 2000,
    MAX_INTERVAL_MS: 30000,
    LARGE_DREAM_CHANCE: 0.3,
    LARGE_DREAM_MIN: 100,
    LARGE_DREAM_MAX: 300,
    SMALL_DREAM_MIN: 10,
    SMALL_DREAM_MAX: 60
  },

  // ==========================================
  // DNA TYPES (The Geometric Signatures)
  // ==========================================
  DNA_TYPES: {
    BOX: 'BOX',
    SPHERE: 'SPHERE',
    TETRAHEDRON: 'TETRAHEDRON',
    ELLIPSE: 'ELLIPSE',
    RING: 'RING',
    LINE: 'LINE'
  },

  // ==========================================
  // COLOR PALETTES (The Quantum Spectrum)
  // ==========================================
  COLORS: {
    DNA_TYPES: {
      BOX: 0x8a2be2,        // Purple
      SPHERE: 0x00ffff,     // Cyan
      TETRAHEDRON: 0xff00ff, // Magenta
      ELLIPSE: 0xffffff,    // White
      RING: 0x00ffff,       // Cyan
      LINE: 0x06b6d4        // Cyan
    },
    BACKGROUNDS: {
      DREAM: 0x0a0015,      // Dark purple
      COSMIC: 0x000a15      // Dark blue
    }
  },

  // ==========================================
  // VALIDATION HELPERS
  // ==========================================
  q_validateRange: (f_value, f_min, f_max, f_name) => {
    if (isNaN(f_value)) {
      return `${f_name} must be a number`;
    }
    if (f_value < f_min || f_value > f_max) {
      return `${f_name} must be between ${f_min} and ${f_max}`;
    }
    return null;
  },

  q_validateEnum: (f_value, f_enum, f_name) => {
    if (!f_enum.includes(f_value)) {
      return `Invalid ${f_name}: ${f_value}. Use: ${f_enum.join(', ')}`;
    }
    return null;
  },

  q_validateRequired: (f_value, f_name) => {
    if (f_value === undefined || f_value === null || f_value === '') {
      return `${f_name} is required`;
    }
    return null;
  }
};

// Export for ES6 modules
export { RABBLE_CONFIG };