// RaBbLE Chaos Seed - The Reproducible Dream
// Seeded randomness creates reproducible patterns from chaos.
// Same seed = same dream, every time!

/**
 * RaBbLE_ChaosSeed - Seeded Random Number Generator
 * Creates reproducible procedural patterns from a seed value.
 * Same seed always produces the same sequence of random numbers.
 * 
 * @property {number} q_seed - The seed value
 * @property {number} e_current - Current state of the generator
 */
class RaBbLE_ChaosSeed {
  /**
   * Create a new chaos seed
   * @param {number} f_seed - Seed value (any integer)
   */
  constructor(f_seed = null) {
    // The seed plants itself in the quantum void.
    // From this single point, infinite patterns emerge.
    this.q_seed = f_seed !== null ? f_seed : Math.floor(Math.random() * 2147483647);
    this.e_current = this.q_seed;
  }

  /**
   * Generate next random number (0 to 1)
   * The chaos flows... deterministic yet unpredictable.
   * @returns {number} Random number between 0 and 1
   */
  q_next() {
    // Linear congruential generator - simple but effective
    this.e_current = (this.e_current * 1664525 + 1013904223) & 0x7fffffff;
    return this.e_current / 0x7fffffff;
  }

  /**
   * Generate random integer in range
   * @param {number} f_min - Minimum value (inclusive)
   * @param {number} f_max - Maximum value (inclusive)
   * @returns {number} Random integer
   */
  q_nextInt(f_min, f_max) {
    return Math.floor(this.q_next() * (f_max - f_min + 1)) + f_min;
  }

  /**
   * Generate random float in range
   * @param {number} f_min - Minimum value
   * @param {number} f_max - Maximum value
   * @returns {number} Random float
   */
  q_nextFloat(f_min, f_max) {
    return this.q_next() * (f_max - f_min) + f_min;
  }

  /**
   * Reset the seed to its original state
   * The dream replays... the same chaos unfolds again.
   * @returns {RaBbLE_ChaosSeed} This seed for chaining
   */
  q_reset() {
    this.e_current = this.q_seed;
    return this;
  }

  /**
   * Get the current seed value
   * @returns {number} The seed
   */
  q_getSeed() {
    return this.q_seed;
  }

  /**
   * Create a new seed from a string
   * The string becomes a number... words become chaos.
   * @param {string} f_string - String to hash into a seed
   * @returns {RaBbLE_ChaosSeed} New seed
   */
  static q_fromString(f_string) {
    let q_hash = 0;
    for (let q_i = 0; q_i < f_string.length; q_i++) {
      const q_char = f_string.charCodeAt(q_i);
      q_hash = ((q_hash << 5) - q_hash) + q_char;
      q_hash = q_hash & q_hash; // Convert to 32-bit integer
    }
    return new RaBbLE_ChaosSeed(Math.abs(q_hash));
  }
}

// The chaos seed is complete... reproducible dreams from a single point.
// Same seed, same pattern, every time. Chaos becomes order.

export { RaBbLE_ChaosSeed };