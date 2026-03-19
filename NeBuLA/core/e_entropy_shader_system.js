// RaBbLE Entropy Shader System
// Centralized shader management for the Flat-Chaos Runtime
// Every stream is a pipeline; every pipeline is a renderable

/**
 * e_entropy_shader_system - Centralized Shader Management
 * Provides entropy-driven vertex displacement and fragment effects
 * with centralized caching and management
 * 
 * @property {Map<string, THREE.ShaderMaterial>} shader_cache - Cached shader materials
 * @property {Object} default_uniforms - Default shader uniform values
 * @property {Object} shader_templates - Pre-compiled shader templates
 */
class e_entropy_shader_system {
  /**
   * Initialize the centralized entropy shader system
   * @param {Object} [options] - Shader system configuration options
   */
  constructor(options = {}) {
    // The shader system is compiling... entropy flows through the vertex pipeline.
    // This is where mathematical chaos becomes visual beauty, centralized and cached.
    this.options = {
      base_intensity: 0.05,  // Low entropy for gentle breathing
      time_scale: 0.5,       // Slower time for calmer movement
      color_variation: 0.15, // Subtle color shifts
      noise_scale: 1.5,      // Gentler noise patterns
      cache_size: 100,
      ...options
    };
    
    this.shader_cache = new Map();
    this.default_uniforms = this._createDefaultUniforms();
    this.shader_templates = this._createShaderTemplates();
    this.active_materials = new Set();
    
    console.log('Entropy shader system initialized - Centralized and cached');
  }

  /**
   * Create default shader uniforms
   * @private
   * @returns {Object} Default uniform values
   */
  _createDefaultUniforms() {
    return {
      u_time: { value: 0.0, type: 'float' },
      u_entropy: { value: 0.5, type: 'float' },
      u_base_intensity: { value: this.options.base_intensity, type: 'float' },
      u_time_scale: { value: this.options.time_scale, type: 'float' },
      u_noise_scale: { value: this.options.noise_scale, type: 'float' },
      u_color_variation: { value: this.options.color_variation, type: 'float' }
    };
  }

  /**
   * Create shader templates for different DNA types
   * @private
   * @returns {Object} Shader templates
   */
  _createShaderTemplates() {
    const templates = {};
    
    // Base vertex shader template
    const baseVertexShader = `
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
    
    // Base fragment shader template
    const baseFragmentShader = `
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
    
    // DNA type specific templates
    templates['BOX'] = {
      vertex: baseVertexShader,
      fragment: baseFragmentShader,
      options: {
        base_intensity: 0.04,  // Very gentle for boxes
        color_variation: 0.1,
        noise_scale: 1.2
      }
    };
    
    templates['SPHERE'] = {
      vertex: baseVertexShader,
      fragment: baseFragmentShader,
      options: {
        base_intensity: 0.06,  // Soft breathing for spheres
        color_variation: 0.15,
        noise_scale: 1.5
      }
    };
    
    templates['TETRAHEDRON'] = {
      vertex: baseVertexShader,
      fragment: baseFragmentShader,
      options: {
        base_intensity: 0.08,  // Slightly more for tetrahedrons
        color_variation: 0.2,
        noise_scale: 1.8
      }
    };
    
    return templates;
  }

  /**
   * Get or create a shader material for a specific DNA type
   * @param {string} dna_type - DNA type to get shader for
   * @param {Object} [custom_options] - Custom options to override defaults
   * @returns {THREE.ShaderMaterial} Shader material
   */
  getShaderMaterial(dna_type, custom_options = {}) {
    const normalized_type = dna_type.toUpperCase();
    const cache_key = `${normalized_type}_${JSON.stringify(custom_options)}`;
    
    // Check cache first
    if (this.shader_cache.has(cache_key)) {
      const material = this.shader_cache.get(cache_key);
      this.active_materials.add(material);
      console.log(`Retrieved cached shader material for ${normalized_type}`);
      return material;
    }
    
    // Create new material
    const material = this._createShaderMaterial(normalized_type, custom_options);
    this.active_materials.add(material);
    
    // Cache the material (with size limit)
    if (this.shader_cache.size >= this.options.cache_size) {
      const oldest_key = this.shader_cache.keys().next().value;
      this.shader_cache.delete(oldest_key);
    }
    this.shader_cache.set(cache_key, material);
    
    console.log(`Created new shader material for ${normalized_type}`);
    return material;
  }

  /**
   * Create a new shader material
   * @private
   * @param {string} dna_type - DNA type
   * @param {Object} custom_options - Custom options
   * @returns {THREE.ShaderMaterial} New shader material
   */
  _createShaderMaterial(dna_type, custom_options) {
    const template = this.shader_templates[dna_type] || this.shader_templates['BOX'];
    const options = { ...template.options, ...custom_options };
    
    const uniforms = {
      ...this.default_uniforms,
      u_base_intensity: { value: options.base_intensity },
      u_color_variation: { value: options.color_variation },
      u_noise_scale: { value: options.noise_scale }
    };
    
    const material = new THREE.ShaderMaterial({
      uniforms: uniforms,
      vertexShader: template.vertex,
      fragmentShader: template.fragment,
      side: THREE.DoubleSide,
      flatShading: true
    });
    
    // Store metadata for debugging
    material.userData = {
      dna_type: dna_type,
      creation_time: Date.now(),
      options: options
    };
    
    return material;
  }

  /**
   * Update shader uniforms for all active materials
   * @param {Object} updates - Uniform updates
   */
  updateUniforms(updates) {
    this.active_materials.forEach(material => {
      Object.keys(updates).forEach(key => {
        if (material.uniforms[key]) {
          material.uniforms[key].value = updates[key];
        }
      });
    });
  }

  /**
   * Get current uniform values from first active material
   * @returns {Object} Current uniform values
   */
  getUniformValues() {
    const first_material = this.active_materials.values().next().value;
    if (!first_material) return {};
    
    const values = {};
    Object.keys(first_material.uniforms).forEach(key => {
      values[key] = first_material.uniforms[key].value;
    });
    return values;
  }

  /**
   * Dispose of a shader material and remove from cache
   * @param {THREE.ShaderMaterial} material - Material to dispose
   */
  disposeMaterial(material) {
    if (material && material.dispose) {
      material.dispose();
    }
    this.active_materials.delete(material);
  }

  /**
   * Clear the shader cache
   */
  clearCache() {
    this.shader_cache.forEach(material => {
      if (material && material.dispose) {
        material.dispose();
      }
    });
    this.shader_cache.clear();
    console.log('Shader cache cleared');
  }

  /**
   * Get cache statistics
   * @returns {Object} Cache statistics
   */
  getCacheStats() {
    return {
      cache_size: this.shader_cache.size,
      active_materials: this.active_materials.size,
      cache_limit: this.options.cache_size,
      cache_usage: (this.shader_cache.size / this.options.cache_size) * 100
    };
  }

  /**
   * Create a complete entropy shader system for a specific DNA type
   * @param {string} dna_type - Type to customize shader for
   * @param {Object} [options] - Additional options
   * @returns {e_entropy_shader_system} Customized entropy shader system
   */
  static createForType(dna_type, options = {}) {
    const typeOptions = {
      'BOX': { base_intensity: 0.08, color_variation: 0.15, noise_scale: 1.5 },
      'SPHERE': { base_intensity: 0.12, color_variation: 0.25, noise_scale: 2.5 },
      'TETRAHEDRON': { base_intensity: 0.15, color_variation: 0.3, noise_scale: 3.0 }
    };
    
    const defaultOptions = typeOptions[dna_type] || typeOptions['BOX'];
    const mergedOptions = { ...defaultOptions, ...options };
    return new e_entropy_shader_system(mergedOptions);
  }
}

// The centralized shader system is complete... mathematical chaos now flows through every vertex.
// Each primitive type can have its own entropy characteristics, creating unique visual signatures.
// The shaders breathe life into static geometry, making it pulse with quantum uncertainty.
// And now, they're cached, managed, and ready for reuse across the entire system.

// ES6 Module Export - The vessel of quantum shaders
export { e_entropy_shader_system };
