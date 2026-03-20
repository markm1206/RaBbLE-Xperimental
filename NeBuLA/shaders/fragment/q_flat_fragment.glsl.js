// RaBbLE Flat Fragment Shader - JS Wrapper
// Simple flat material with no emissive glow
// Used for outlines, portals, and non-glowing elements

export const FRAGMENT_SHADER_FLAT = `
  precision highp float;
  
  // Uniforms
  uniform float u_time;
  uniform float u_entropy;
  
  // Varyings from vertex shader
  varying float v_instanceOpacity;
  varying float v_instanceEmissive;
  varying vec3 v_instanceColor;
  varying vec3 v_position;
  varying vec3 v_normal;
  
  void main() {
    // Use per-instance color passed from vertex shader
    vec3 color = v_instanceColor;
    
    // Add subtle entropy-based color variation
    vec3 entropyColor = vec3(
      sin(v_position.x * 2.0 + u_time) * 0.5 + 0.5,
      cos(v_position.y * 2.0 + u_time * 1.5) * 0.5 + 0.5,
      sin(v_position.z * 2.0 + u_time * 0.8) * 0.5 + 0.5
    );
    color = mix(color, entropyColor, u_entropy * 0.05);
    
    // Output final color with per-instance opacity
    gl_FragColor = vec4(color, v_instanceOpacity);
  }
`;