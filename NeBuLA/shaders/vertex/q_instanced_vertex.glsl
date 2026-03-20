// RaBbLE Instanced Vertex Shader
// Shared vertex shader for all instanced meshes
// Handles position, size, entropy displacement, and instanced rendering

// Per-instance attributes (from Three.js InstancedMesh)
attribute float instanceSize;
attribute float instanceOpacity;
attribute float instanceEmissive;
attribute vec3 instanceColor;  // Per-instance RGB color

// Uniforms
uniform float u_time;
uniform float u_entropy;

// Varyings passed to fragment shader
varying float v_instanceOpacity;
varying float v_instanceEmissive;
varying vec3 v_instanceColor;
varying vec3 v_position;
varying vec3 v_normal;

void main() {
  // Pass per-instance values to fragment shader
  v_instanceOpacity = instanceOpacity;
  v_instanceEmissive = instanceEmissive;
  v_instanceColor = instanceColor;  // Pass color from Three.js to fragment
  v_position = position;
  v_normal = normal;
  
  // Entropy-driven vertex displacement
  float noise = sin(position.x * 2.0 + u_time) * cos(position.y * 2.0 + u_time * 1.5);
  float displacement = noise * u_entropy * 0.1;
  
  // Apply per-instance size scaling and displacement
  vec3 transformed = position * instanceSize + normal * displacement;
  
  // Standard instanced rendering transformation
  gl_Position = projectionMatrix * modelViewMatrix * instanceMatrix * vec4(transformed, 1.0);
}