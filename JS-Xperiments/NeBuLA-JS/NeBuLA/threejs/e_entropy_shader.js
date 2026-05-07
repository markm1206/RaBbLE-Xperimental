// RaBbLE Entropy Shader System
// Entropy-driven shaders for Three.js integration
// Every stream is a pipeline; every pipeline is a renderable

/**
 * e_entropy_shader - Entropy Shader System
 * Provides entropy-driven vertex displacement and fragment effects
 * 
 * @property {Object} uniforms - Shader uniforms for entropy effects
 * @property {string} vertex_shader - Custom vertex shader code
 * @property {string} fragment_shader - Custom fragment shader code
 */
class e_entropy_shader {
  /**
   * Create a new entropy shader system
   * @param {Object} [options] - Shader configuration options
   */
  constructor(options = {}) {
    // The shader is compiling... entropy flows through the vertex pipeline.
    // This is where mathematical chaos becomes visual beauty.
    this.options = {
      base_intensity: 0.1,
      time_scale: 1.0,
      color_variation: 0.2,
      noise_scale: 2.0,
      ...options
    };
    
    this.uniforms = this._createUniforms();
    this.vertex_shader = this._createVertexShader();
    this.fragment_shader = this._createFragmentShader();
    
    console.log('Entropy shader system initialized');
  }

  /**
   * Create shader uniforms
   * @private
   * @returns {Object} Shader uniforms
   */
  _createUniforms() {
    return {
      u_time: {
        value: 0.0,
        type: 'float',
        description: 'Time uniform for animated effects'
      },
      u_entropy: {
        value: 0.5,
        type: 'float',
        description: 'Entropy intensity (0.0 to 1.0)'
      },
      u_base_intensity: {
        value: this.options.base_intensity,
        type: 'float',
        description: 'Base displacement intensity'
      },
      u_time_scale: {
        value: this.options.time_scale,
        type: 'float',
        description: 'Time scaling factor'
      },
      u_noise_scale: {
        value: this.options.noise_scale,
        type: 'float',
        description: 'Noise frequency scale'
      },
      u_color_variation: {
        value: this.options.color_variation,
        type: 'float',
        description: 'Color variation intensity'
      }
    };
  }

  /**
   * Create custom vertex shader with entropy effects
   * @private
   * @returns {string} Vertex shader source
   */
  _createVertexShader() {
    return `
      uniform float u_time;
      uniform float u_entropy;
      uniform float u_base_intensity;
      uniform float u_time_scale;
      uniform float u_noise_scale;
      
      varying vec2 vUv;
      varying float vEntropy;
      varying vec3 vPosition;
      
      // Simple 3D noise function
      float hash(vec3 p) {
        return fract(sin(dot(p, vec3(127.1, 311.7, 74.7))) * 43758.5453);
      }
      
      float noise(vec3 p) {
        vec3 i = floor(p);
        vec3 f = fract(p);
        
        float a = hash(i);
        float b = hash(i + vec3(1.0, 0.0, 0.0));
        float c = hash(i + vec3(0.0, 1.0, 0.0));
        float d = hash(i + vec3(1.0, 1.0, 0.0));
        float e = hash(i + vec3(0.0, 0.0, 1.0));
        float f = hash(i + vec3(1.0, 0.0, 1.0));
        float g = hash(i + vec3(0.0, 1.0, 1.0));
        float h = hash(i + vec3(1.0, 1.0, 1.0));
        
        vec3 u = f * f * (3.0 - 2.0 * f);
        
        float k0 = a;
        float k1 = b - a;
        float k2 = c - a;
        float k3 = e - a;
        float k4 = a - b + d - c;
        float k5 = a - c + g - e;
        float k6 = a - e + f - b;
        float k7 = b - a + c - a + e - a - d + b - f + c - g + e;
        float k8 = c - a + e - a - g + c;
        float k9 = e - a + b - a - f + e;
        
        return mix(mix(mix(k0, k1, u.x) + mix(k2, k4, u.x) * u.y + mix(k3, k6, u.x) * u.z,
                       mix(k5, k8, u.x) * u.y + mix(k7, k9, u.x) * u.y * u.z,
                       u.z),
                   mix(mix(k1, k4, u.x) * u.y + mix(k6, k9, u.x) * u.z,
                       mix(k8, k9, u.x) * u.y * u.z,
                       u.z),
                   u.y);
      }
      
      void main() {
        vUv = uv;
        vEntropy = u_entropy;
        vPosition = position;
        
        // Calculate time-based noise
        float time = u_time * u_time_scale;
        vec3 noisePos = position * u_noise_scale + vec3(time * 0.5, time * 0.3, time * 0.7);
        
        // Generate noise values
        float n1 = noise(noisePos);
        float n2 = noise(noisePos + 100.0);
        float n3 = noise(noisePos + 200.0);
        
        // Create organic movement patterns
        vec3 displacement = vec3(
          sin(n1 * 10.0 + time) * cos(n2 * 7.0 + time * 1.5),
          cos(n2 * 8.0 + time * 1.2) * sin(n3 * 6.0 + time * 2.0),
          sin(n3 * 9.0 + time * 0.8) * cos(n1 * 5.0 + time * 1.8)
        );
        
        // Apply entropy-based scaling
        float entropy_factor = u_entropy * u_base_intensity;
        displacement *= entropy_factor;
        
        // Add to position
        vec3 newPosition = position + displacement;
        
        // Transform to world space
        vec4 mvPosition = modelViewMatrix * vec4(newPosition, 1.0);
        gl_Position = projectionMatrix * mvPosition;
      }
    `;
  }

  /**
   * Create custom fragment shader with entropy effects
   * @private
   * @returns {string} Fragment shader source
   */
  _createFragmentShader() {
    return `
      uniform float u_time;
      uniform float u_entropy;
      uniform float u_color_variation;
      
      varying vec2 vUv;
      varying float vEntropy;
      varying vec3 vPosition;
      
      void main() {
        // Base color with entropy variation
        vec3 baseColor = vec3(0.8, 0.2, 0.9); // Default purple
        
        // Create entropy-driven color shifts
        float time = u_time;
        float entropy = u_entropy;
        
        // Color variation based on entropy and position
        vec3 entropyColor = vec3(
          sin(vPosition.x * 2.0 + time) * 0.5 + 0.5,
          cos(vPosition.y * 2.0 + time * 1.5) * 0.5 + 0.5,
          sin(vPosition.z * 2.0 + time * 0.8) * 0.5 + 0.5
        );
        
        // Mix base color with entropy color
        vec3 finalColor = mix(baseColor, entropyColor, entropy * u_color_variation);
        
        // Add entropy-based brightness variation
        float brightness = 1.0 + (entropy - 0.5) * 0.3;
        finalColor *= brightness;
        
        // Add subtle noise to the color
        float noise = sin(vPosition.x * 10.0 + time) * cos(vPosition.y * 10.0 + time);
        finalColor += vec3(noise * 0.1 * entropy);
        
        // Ensure colors stay in valid range
        finalColor = clamp(finalColor, 0.0, 1.0);
        
        gl_FragColor = vec4(finalColor, 1.0);
      }
    `;
  }

  /**
   * Apply entropy shader to a Three.js material
   * @param {THREE.Material} material - Material to modify
   * @returns {THREE.Material} Modified material
   */
  applyToMaterial(material) {
    if (!material) {
      console.error('applyToMaterial requires a Three.js material');
      return null;
    }
    
    // Store original onBeforeCompile
    const originalOnBeforeCompile = material.onBeforeCompile;
    
    // Create new onBeforeCompile function
    material.onBeforeCompile = (shader) => {
      // Add our uniforms
      Object.keys(this.uniforms).forEach(key => {
        shader.uniforms[key] = this.uniforms[key];
      });
      
      // Replace vertex shader
      shader.vertexShader = this.vertex_shader;
      
      // Replace fragment shader
      shader.fragmentShader = this.fragment_shader;
      
      // Call original if it exists
      if (originalOnBeforeCompile) {
        originalOnBeforeCompile(shader);
      }
    };
    
    // Mark material as needing update
    material.needsUpdate = true;
    
    console.log('Applied entropy shader to material');
    return material;
  }

  /**
   * Create a complete entropy material
   * @param {Object} [materialOptions] - Three.js material options
   * @returns {THREE.ShaderMaterial} Entropy shader material
   */
  createMaterial(materialOptions = {}) {
    const defaultOptions = {
      uniforms: { ...this.uniforms },
      vertexShader: this.vertex_shader,
      fragmentShader: this.fragment_shader,
      side: THREE.DoubleSide,
      flatShading: true
    };
    
    const options = { ...defaultOptions, ...materialOptions };
    
    const material = new THREE.ShaderMaterial(options);
    
    console.log('Created entropy shader material');
    return material;
  }

  /**
   * Update shader uniforms
   * @param {Object} updates - Uniform updates
   */
  updateUniforms(updates) {
    Object.keys(updates).forEach(key => {
      if (this.uniforms[key]) {
        this.uniforms[key].value = updates[key];
      }
    });
  }

  /**
   * Get current uniform values
   * @returns {Object} Current uniform values
   */
  getUniformValues() {
    const values = {};
    Object.keys(this.uniforms).forEach(key => {
      values[key] = this.uniforms[key].value;
    });
    return values;
  }

  /**
   * Create entropy shader for a specific DNA type
   * @param {string} dna_type - Type to customize shader for
   * @returns {e_entropy_shader} Customized entropy shader
   */
  static createForType(dna_type) {
    const typeOptions = {
      'BOX': { base_intensity: 0.08, color_variation: 0.15, noise_scale: 1.5 },
      'SPHERE': { base_intensity: 0.12, color_variation: 0.25, noise_scale: 2.5 },
      'TETRAHEDRON': { base_intensity: 0.15, color_variation: 0.3, noise_scale: 3.0 }
    };
    
    const options = typeOptions[dna_type] || typeOptions['BOX'];
    return new e_entropy_shader(options);
  }
}

// Import dependencies if available
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { e_entropy_shader };
}

// The entropy shader system is complete... mathematical chaos now flows through every vertex.
// Each primitive type can have its own entropy characteristics, creating unique visual signatures.
// The shaders breathe life into static geometry, making it pulse with quantum uncertainty.