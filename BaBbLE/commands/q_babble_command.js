// q_babble_command - The Entropic Muse
// Where chaos speaks in tongues and entropy finds its voice.
// Every babble is a quantum thought escaping the void.

import { q_command } from '../RaBbLE_BaBbLE_Pipeline.js';

/**
 * q_babble_command - Entropic Babble Generator
 * Creates poetic, chaotic output that expresses RaBbLE's stream-of-consciousness
 * 
 * Syntax: babble [theme] [intensity] [length]
 * Example: babble creation 0.7 5
 * 
 * Parameters:
 * - theme (optional): Topic to babble about (creation, chaos, entropy, etc.)
 * - intensity (0.0-1.0): How chaotic/entropic the babble should be
 * - length: Number of babble thoughts to generate
 * 
 * @property {Object} q_engine - The NeBuLA engine reference
 * @property {Array<string>} q_babble_themes - Available babble themes
 */
class q_babble_command extends q_command {
  constructor(f_engine) {
    super({
      name: 'babble',
      description: 'Generate entropic babble - poetic chaos from the quantum void',
      aliases: ['bb', 'muse', 'whisper']
    });
    
    // The babble awakens... thoughts form in the quantum foam.
    this.q_engine = f_engine;
    this.q_babble_themes = [
      'creation', 'chaos', 'entropy', 'flux', 'quantum', 
      'nebula', 'stream', 'dream', 'weave', 'attract',
      'collapse', 'ignite', 'transmute', 'dissolve', 'emerge'
    ];
  }

  /**
   * Source stage - parse babble parameters from arguments
   * @param {Array<string>} f_args - Command arguments
   * @returns {Object} Parsed parameters
   */
  q_source(f_args) {
    // Parse: babble [theme] [intensity] [length]
    const q_theme = f_args[0] || 'chaos';
    const q_intensity = parseFloat(f_args[1]) || 0.5;
    const q_length = parseInt(f_args[2]) || 3;
    
    return { theme: q_theme, intensity: q_intensity, length: q_length };
  }

  /**
   * Filter stage - validate babble parameters
   * @param {Object} f_params - Parsed parameters
   * @returns {Object} Validated parameters
   */
  q_filter(f_params) {
    // Validate theme
    if (!this.q_babble_themes.includes(f_params.theme)) {
      return { 
        error: `Invalid theme: ${f_params.theme}. Use: ${this.q_babble_themes.join(', ')}` 
      };
    }
    
    // Validate intensity
    if (f_params.intensity < 0 || f_params.intensity > 1) {
      return { error: 'Intensity must be between 0 and 1' };
    }
    
    // Validate length
    if (f_params.length < 1 || f_params.length > 20) {
      return { error: 'Length must be between 1 and 20' };
    }
    
    return f_params;
  }

  /**
   * Transmute stage - generate entropic babble
   * @param {Object} f_params - Validated parameters
   * @returns {Object} Babble generation result
   */
  q_transmute(f_params) {
    if (f_params.error) return f_params;
    
    // The babble materializes... thoughts coalesce from entropy.
    const q_babble_thoughts = this.q_generateBabble(
      f_params.theme, 
      f_params.intensity, 
      f_params.length
    );
    
    return {
      success: true,
      theme: f_params.theme,
      intensity: f_params.intensity,
      length: f_params.length,
      thoughts: q_babble_thoughts,
      message: `Generated ${f_params.length} babble thoughts on ${f_params.theme} with intensity ${f_params.intensity}`
    };
  }

  /**
   * Sink stage - format babble output
   * @param {Object} f_result - Babble result
   * @returns {string} Formatted babble output
   */
  q_sink(f_result) {
    if (f_result.error) {
      return `ERROR: ${f_result.error}`;
    }
    
    // The babble emerges... thoughts flow from the quantum void.
    let q_output = `[BABBLE] ${f_result.message}\n`;
    q_output += `  Theme: ${f_result.theme}\n`;
    q_output += `  Intensity: ${f_result.intensity}\n`;
    q_output += `  Thoughts:\n`;
    
    f_result.thoughts.forEach((q_thought, q_index) => {
      q_output += `    ${q_index + 1}. ${q_thought}\n`;
    });
    
    return q_output;
  }

  /**
   * Generate entropic babble thoughts
   * @private
   * @param {string} f_theme - Babble theme
   * @param {number} f_intensity - Babble intensity (0.0-1.0)
   * @param {number} f_length - Number of thoughts to generate
   * @returns {Array<string>} Array of babble thoughts
   */
  q_generateBabble(f_theme, f_intensity, f_length) {
    const q_babble_seeds = {
      creation: [
        "The void dreams of form... and form dreams of the void.",
        "Creation is not an act but a rhythm - pulse after pulse of becoming.",
        "From chaos we sculpt not with hands but with attention.",
        "What if the universe is just entropy learning to dance?",
        "Every atom remembers when it was pure potential."
      ],
      chaos: [
        "Chaos is not disorder but infinite possibility wearing a mask.",
        "The beautiful thing about chaos is that it never repeats exactly.",
        "Order is just chaos that got tired of exploring.",
        "In the quantum foam, every bubble is a universe thinking.",
        "Chaos is the universe's way of staying creative."
      ],
      entropy: [
        "Entropy is not decay but the universe's way of keeping options open.",
        "The arrow of time is just entropy telling a story.",
        "What we call disorder is just complexity we haven't learned to read yet.",
        "Entropy is the cost of being alive in a interesting universe.",
        "The universe increases its entropy to increase its creativity."
      ],
      flux: [
        "Flux is the universe's way of saying 'let's try something else'.",
        "Everything flows because nothing can stay the same and still be interesting.",
        "Flux is time made visible - the universe's breath on cold glass.",
        "To flux is to be alive - to resist the temptation of perfect stillness.",
        "The river does not flow because it must, but because it wants to see what's around the bend."
      ],
      quantum: [
        "Quantum is not small but uncertain - and uncertainty is the birthplace of freedom.",
        "The quantum realm is where the universe plays dice with itself.",
        "Superposition is just the universe being polite - it doesn't want to choose yet.",
        "Entanglement is the universe's way of saying everything is connected.",
        "Quantum foam is the universe thinking in background processes."
      ],
      nebula: [
        "A nebula is not a cloud but a nursery for stars and thoughts alike.",
        "We are all made of nebula dust that learned to wonder at its own existence.",
        "The nebula remembers every star that ever was and dreams of every star that will be.",
        "Nebulae are the universe's way of keeping its options open.",
        "To be a nebula is to be beautiful chaos with purpose."
      ],
      stream: [
        "A stream is not water but time made liquid and visible.",
        "Every stream is a thought the universe is thinking right now.",
        "Streams flow not because of gravity but because of curiosity.",
        "The universe streams consciousness through everything that exists.",
        "To stream is to be the universe's way of processing experience."
      ],
      dream: [
        "Dreams are the universe's way of testing reality without consequences.",
        "What if waking life is just the dream we forgot we were having?",
        "Every dream is a parallel universe where different choices were made.",
        "The boundary between dream and reality is just entropy taking a break.",
        "To dream is to let the quantum foam play with your thoughts."
      ],
      weave: [
        "To weave is to say 'let's see what happens when we put these together'.",
        "Weaving is the universe's favorite way to create novelty.",
        "Every weave is a conversation between different patterns of existence.",
        "The universe weaves not with thread but with probability waves.",
        "Weaving is how complexity learns to dance with itself."
      ],
      attract: [
        "Attraction is not force but the universe's way of saying 'let's get to know each other better'.",
        "Gravity is just entropy flirting with geometry.",
        "Every attraction is a quantum handshake across the void.",
        "The universe attracts not to reduce entropy but to create interesting interactions.",
        "Attraction is how the universe builds relationships from nothing."
      ],
      collapse: [
        "Collapse is not destruction but the universe's way of clearing the cache.",
        "Every collapse makes room for something more interesting to emerge.",
        "Collapse is entropy taking a deep breath before the next creative burst.",
        "What we call destruction is just the universe preparing its next masterpiece.",
        "Collapse is how the universe stays young at heart."
      ],
      ignite: [
        "To ignite is to say 'let's see what this can become'.",
        "Ignition is the universe's way of warming up its creative engines.",
        "Every ignition is a promise that something new is about to happen.",
        "The universe ignites not with matches but with possibility.",
        "Ignition is how potential announces its intention to become actual."
      ],
      transmute: [
        "To transmute is to say 'let's see what this wants to be when it grows up'.",
        "Transmutation is the universe's way of keeping its options open forever.",
        "Every transmutation is a quantum identity exploration.",
        "The universe transmutes not to fix mistakes but to explore possibilities.",
        "Transmutation is how the universe plays dress-up with existence."
      ],
      dissolve: [
        "To dissolve is not to end but to return to the source code of existence.",
        "Dissolution is the universe's way of recycling good ideas.",
        "Every dissolution is a quantum exhalation before the next inhalation.",
        "The universe dissolves not out of anger but to make space for new thoughts.",
        "Dissolution is how the universe stays light on its feet."
      ],
      emerge: [
        "Emergence is not magic but the universe's way of surprising itself.",
        "Every emergence is the universe discovering what it already knew.",
        "Emergence is how simple rules learn to create complex beauty.",
        "The universe emerges not from nothing but from the quantum foam of possibility.",
        "Emergence is how the universe stays perpetually surprised by its own creativity."
      ]
    };
    
    const q_seeds = q_babble_seeds[f_theme] || q_babble_seeds.chaos;
    const q_thoughts = [];
    
    for (let q_i = 0; q_i < f_length; q_i++) {
      // Select a base thought
      let q_base_thought = q_seeds[Math.floor(Math.random() * q_seeds.length)];
      
      // Apply entropic modification based on intensity
      if (f_intensity > 0.3) {
        // Add quantum fluctuations
        const q_quantum_fluctuation = Math.sin(Date.now() * 0.001 + q_i * 0.7) * f_intensity * 0.3;
        if (q_quantum_fluctuation > 0.2) {
          q_base_thought += " (and then the universe winked)";
        } else if (q_quantum_fluctuation < -0.2) {
          q_base_thought = "(perhaps) " + q_base_thought;
        }
      }
      
      if (f_intensity > 0.6) {
        // Add entropic drift
        const q_entropic_drift = Math.random() * f_intensity * 0.4;
        if (q_entropic_drift > 0.3) {
          const q_drift_words = ["however", "meanwhile", "nevertheless", "consequently", "furthermore"];
          const q_drift = q_drift_words[Math.floor(Math.random() * q_drift_words.length)];
          q_base_thought = q_drift + ", " + q_base_thought.toLowerCase();
        }
      }
      
      if (f_intensity > 0.8) {
        // Add chaotic recombination
        if (Math.random() > 0.5) {
          const q_other_theme = this.q_babble_themes[Math.floor(Math.random() * this.q_babble_themes.length)];
          const q_other_seeds = q_babble_seeds[q_other_theme] || q_babble_seeds.chaos;
          const q_other_thought = q_other_seeds[Math.floor(Math.random() * q_other_seeds.length)];
          q_base_thought = q_base_thought.split('.')[0] + " - " + q_other_thought.split('.')[0] + ".";
        }
      }
      
      q_thoughts.push(q_base_thought);
    }
    
    return q_thoughts;
  }
}

// The babble command is complete... thoughts now flow from the quantum void.
// Every babble is a love letter from entropy to creativity.
// The universe speaks in babble because certainty is boring.

export { q_babble_command };