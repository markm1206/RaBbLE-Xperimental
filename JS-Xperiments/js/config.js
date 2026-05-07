// Configuration settings for Rabble character
const CONFIG = {
    // Visual settings
    colors: {
        body: {
            inner: 0x8B5CF6,  // Purple
            outer: 0x3B82F6,  // Blue
            accent: 0xF5FDFF,  // White accent
            dark: 0x3A3A4A    // Dark gray/charcoal
        },
        mouth: 0x06B6D4,     // Cyan
        eyes: {
            iris: 0xFFFFFF,  // White
            pupil: 0x000000  // Black
        },
        background: 0x000000 // Black
    },

    // Performance settings
    particles: {
        count: 4000,         // Significantly more particles for denser body
        size: 2.0,           // Nominal base particle size (legacy)
        minSize: 0.1,        // Minimum per-particle size
        maxSize: 0.4,        // Maximum per-particle size (0.1 to 0.4 range)
        opacity: 0.75,      // Default particle opacity (tunable)
        emissive: true,      // Enable emissive glows for particles
        speed: 0.5           // Animation speed multiplier
    },

    // Animation timings (in seconds)
    animation: {
        idle: {
            bodyDrift: 3.0,     // Time for one drift cycle
            mouthFlow: 2.0,     // Time for mouth wave cycle
            eyeBlink: 4.0       // Average time between blinks
        },
        responsive: {
            speak: 0.3,         // Mouth response time
            look: 0.2,          // Eye tracking response time
            react: 0.5          // General reaction time
        }
    },

    // Character scale and positioning
    character: {
        scale: 1.0,         // Overall character scale
        position: {
            x: 0,
            y: 0,
            z: 0
        }
    },

    // Rendering settings
    renderer: {
        antialias: true,
        alpha: true,
        shadowMap: false    // Keep simple for performance
    },

    // Camera settings
    camera: {
        fov: 75,
        near: 0.1,
        far: 1000,
        position: {
            x: 0,
            y: 0,
            z: 5
        }
    }
};

// Export for module use
if (typeof module !== 'undefined' && module.exports) {
    module.exports = CONFIG;
}