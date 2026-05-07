// RaBbLE Nebula Renderer Demo
// Complete working example showcasing the entire RaBbLE Nebula Renderer system
// Every stream is a pipeline; every pipeline is a renderable

/**
 * RaBbLE_Nebula_Demo - Complete Working Example
 * Demonstrates the full capabilities of the RaBbLE Nebula Renderer
 */
class RaBbLE_Nebula_Demo {
  /**
   * Create a new demo
   * @param {HTMLElement} container - DOM element for rendering
   */
  constructor(container) {
    // The demo is initializing... quantum systems coming online.
    // This is where the RaBbLE Nebula Renderer shows its full potential.
    this.container = container;
    this.runtime = null;
    this.bridge = null;
    this.dreamer = null;
    this.is_running = false;
    
    this.demo_state = {
      current_pattern: 'organic',
      entity_count: 200,
      active_streams: 0,
      fps: 0,
      last_time: 0
    };
    
    console.log('RaBbLE Nebula Demo initialized');
  }

  /**
   * Initialize the complete demo system
   */
  async initialize() {
    console.log('\\n=== Initializing RaBbLE Nebula Demo ===');
    
    try {
      // Phase 1: Initialize Core Systems
      console.log('Phase 1: Initializing core systems...');
      this.runtime = new RaBbLE_Nebula_Runtime();
      this.dreamer = new RaBbLE_Dreamer(12345); // Fixed seed for reproducible demo
      
      // Phase 2: Initialize Three.js Bridge
      console.log('Phase 2: Initializing Three.js bridge...');
      this.bridge = new q_instanced_bridge(this.container);
      this.bridge.q_connectRuntime(this.runtime);
      
      // Phase 3: Generate Demo Content
      console.log('Phase 3: Generating demo content...');
      await this.generateDemoContent();
      
      // Phase 4: Start Systems
      console.log('Phase 4: Starting systems...');
      this.runtime.ignite();
      this.bridge.q_startRenderLoop();
      
      this.is_running = true;
      this.startDemoLoop();
      
      console.log('✅ RaBbLE Nebula Demo ready!');
      this.setupUIControls();
      
    } catch (error) {
      console.error('❌ Demo initialization failed:', error);
      this.showError('Demo initialization failed. Check console for details.');
    }
  }

  /**
   * Generate demo content with various patterns
   */
  async generateDemoContent() {
    // Create multiple streams with different patterns
    const streams = [];
    
    // Organic growth pattern
    const organic_stream = this.dreamer.dream_geometry_flow(50, 'SPHERE', 'organic');
    organic_stream.q_setFluxModifier((entity, index) => {
      const time = Date.now() * 0.001;
      const pulse = Math.sin(time + index * 0.2) * 0.5 + 0.5;
      entity.e_applyEntropy(pulse * 0.3);
      return entity;
    });
    streams.push(organic_stream);
    
    // Geometric lattice pattern
    const lattice_stream = this.dreamer.dream_geometry_flow(30, 'BOX', 'lattice');
    lattice_stream.q_setFluxModifier((entity, index) => {
      entity.e_applyEntropy(0.1); // Minimal entropy for structure
      return entity;
    });
    streams.push(lattice_stream);
    
    // Chaotic swarm pattern
    const swarm_stream = this.dreamer.dream_geometry_flow(70, 'TETRAHEDRON', 'swarm');
    swarm_stream.q_setFluxModifier((entity, index) => {
      const time = Date.now() * 0.001;
      const chaos = Math.sin(time * 2 + index) * Math.cos(time * 1.5 + index * 2);
      entity.e_applyEntropy((chaos + 1) * 0.5 * 0.8);
      return entity;
    });
    streams.push(swarm_stream);
    
    // Spiral galaxy pattern
    const galaxy_stream = this.dreamer.dream_geometry_flow(50, 'SPHERE', 'galaxy');
    galaxy_stream.q_setFluxModifier((entity, index) => {
      const time = Date.now() * 0.001;
      const rotation = Math.sin(time * 0.5 + index * 0.1);
      entity.e_applyEntropy(rotation * 0.3);
      return entity;
    });
    streams.push(galaxy_stream);
    
    // Register all streams with runtime
    streams.forEach(stream => {
      this.runtime.ignite_Stream(stream);
    });
    
    this.demo_state.active_streams = streams.length;
    this.demo_state.entity_count = this.runtime.global_laminar_flow.length;
    
    console.log(`Generated ${streams.length} streams with ${this.demo_state.entity_count} total entities`);
  }

  /**
   * Start the demo loop for animations and UI updates
   */
  startDemoLoop() {
    const loop = () => {
      if (!this.is_running) return;
      
      // Update demo state
      this.updateDemoState();
      
      // Trigger pattern changes periodically
      if (Date.now() % 10000 < 100) { // Every 10 seconds
        this.changeDemoPattern();
      }
      
      requestAnimationFrame(loop);
    };
    
    loop();
  }

  /**
   * Update demo state and statistics
   */
  updateDemoState() {
    if (!this.runtime || !this.bridge) return;
    
    const stats = this.runtime.q_getStats();
    const bridge_stats = this.bridge.q_getStats();
    
    this.demo_state.active_streams = stats.stream_count;
    this.demo_state.entity_count = stats.entity_count;
    
    // Calculate FPS
    const now = performance.now();
    if (this.demo_state.last_time > 0) {
      this.demo_state.fps = 1000 / (now - this.demo_state.last_time);
    }
    this.demo_state.last_time = now;
    
    // Update UI if available
    this.updateUI(stats, bridge_stats);
  }

  /**
   * Change demo pattern to show different behaviors
   */
  changeDemoPattern() {
    const patterns = ['organic', 'lattice', 'swarm', 'galaxy'];
    const current_index = patterns.indexOf(this.demo_state.current_pattern);
    const next_index = (current_index + 1) % patterns.length;
    const new_pattern = patterns[next_index];
    
    console.log(`Changing demo pattern to: ${new_pattern}`);
    
    // Apply new pattern to all streams
    this.runtime.q_registry.forEach((stream, stream_id) => {
      const modifier = this.dreamer._getFluxModifierForPattern(new_pattern);
      stream.q_setFluxModifier(modifier);
    });
    
    this.demo_state.current_pattern = new_pattern;
  }

  /**
   * Setup UI controls for the demo
   */
  setupUIControls() {
    // Create control panel
    const controls = document.createElement('div');
    controls.style.position = 'absolute';
    controls.style.top = '10px';
    controls.style.right = '10px';
    controls.style.background = 'rgba(0, 0, 0, 0.8)';
    controls.style.color = 'white';
    controls.style.padding = '10px';
    controls.style.borderRadius = '5px';
    controls.style.fontFamily = 'monospace';
    controls.style.fontSize = '12px';
    controls.style.pointerEvents = 'auto';
    
    controls.innerHTML = `
      <div style="margin-bottom: 10px; font-weight: bold; color: #00ffff;">RaBbLE Nebula Demo</div>
      <div>Entities: <span id="entity-count">${this.demo_state.entity_count}</span></div>
      <div>Streams: <span id="stream-count">${this.demo_state.active_streams}</span></div>
      <div>FPS: <span id="fps-count">${Math.round(this.demo_state.fps)}</span></div>
      <div>Pattern: <span id="pattern-name" style="color: #ff00ff;">${this.demo_state.current_pattern}</span></div>
      <div style="margin-top: 10px; font-size: 10px; color: #888;">
        Click to add entities<br>
        Scroll to change scale<br>
        Press SPACE to toggle chaos
      </div>
    `;
    
    this.container.appendChild(controls);
    
    // Add event listeners
    this.container.addEventListener('click', (e) => {
      this.addRandomEntity(e);
    });
    
    this.container.addEventListener('wheel', (e) => {
      this.scaleEntities(e.deltaY * 0.01);
    });
    
    window.addEventListener('keydown', (e) => {
      if (e.code === 'Space') {
        this.toggleChaos();
      }
    });
  }

  /**
   * Update UI elements
   */
  updateUI(runtime_stats, bridge_stats) {
    const entity_count = document.getElementById('entity-count');
    const stream_count = document.getElementById('stream-count');
    const fps_count = document.getElementById('fps-count');
    const pattern_name = document.getElementById('pattern-name');
    
    if (entity_count) entity_count.textContent = runtime_stats.entity_count;
    if (stream_count) stream_count.textContent = runtime_stats.stream_count;
    if (fps_count) fps_count.textContent = Math.round(this.demo_state.fps);
    if (pattern_name) pattern_name.textContent = this.demo_state.current_pattern;
  }

  /**
   * Add a random entity on click
   */
  addRandomEntity(event) {
    if (!this.runtime) return;
    
    const rect = this.container.getBoundingClientRect();
    const x = ((event.clientX - rect.left) / rect.width) * 20 - 10;
    const y = ((event.clientY - rect.top) / rect.height) * 20 - 10;
    const z = (Math.random() - 0.5) * 20;
    
    const types = ['BOX', 'SPHERE', 'TETRAHEDRON'];
    const type = types[Math.floor(Math.random() * types.length)];
    
    const entity = new q_entity(type);
    entity.flux_matrix[12] = x;
    entity.flux_matrix[13] = y;
    entity.flux_matrix[14] = z;
    entity.e_entropy_sig = Math.random();
    
    // Find a stream to add to, or create new one
    const streams = Array.from(this.runtime.q_registry.values());
    if (streams.length > 0) {
      const random_stream = streams[Math.floor(Math.random() * streams.length)];
      random_stream.q_addEntity(entity);
    }
    
    console.log(`Added ${type} entity at (${x.toFixed(2)}, ${y.toFixed(2)}, ${z.toFixed(2)})`);
  }

  /**
   * Scale all entities
   */
  scaleEntities(delta) {
    if (!this.runtime) return;
    
    this.runtime.global_laminar_flow.forEach(entity => {
      const scale = 1 + delta * 0.1;
      entity.flux_matrix[12] *= scale;
      entity.flux_matrix[13] *= scale;
      entity.flux_matrix[14] *= scale;
    });
  }

  /**
   * Toggle chaos level
   */
  toggleChaos() {
    if (!this.runtime) return;
    
    let new_entropy = 0.5;
    const current_entropy = this.runtime.global_laminar_flow[0]?.e_entropy_sig || 0.5;
    
    if (current_entropy < 0.3) {
      new_entropy = 0.8; // High chaos
    } else if (current_entropy > 0.7) {
      new_entropy = 0.1; // Low chaos
    } else {
      new_entropy = 0.5; // Medium chaos
    }
    
    this.runtime.global_laminar_flow.forEach(entity => {
      entity.e_setEntropy(new_entropy);
    });
    
    console.log(`Toggled chaos to: ${new_entropy.toFixed(1)}`);
  }

  /**
   * Show error message
   */
  showError(message) {
    const error_div = document.createElement('div');
    error_div.style.position = 'absolute';
    error_div.style.top = '50%';
    error_div.style.left = '50%';
    error_div.style.transform = 'translate(-50%, -50%)';
    error_div.style.background = 'rgba(255, 0, 0, 0.8)';
    error_div.style.color = 'white';
    error_div.style.padding = '20px';
    error_div.style.borderRadius = '5px';
    error_div.style.textAlign = 'center';
    error_div.style.fontFamily = 'monospace';
    error_div.innerHTML = `
      <div style="font-size: 18px; font-weight: bold; margin-bottom: 10px;">Demo Error</div>
      <div>${message}</div>
      <div style="margin-top: 10px; font-size: 12px; color: #ccc;">
        Ensure Three.js is loaded and dependencies are available.
      </div>
    `;
    
    this.container.appendChild(error_div);
  }

  /**
   * Cleanup and destroy demo
   */
  destroy() {
    this.is_running = false;
    
    if (this.bridge) {
      this.bridge.q_dispose();
    }
    
    if (this.runtime) {
      this.runtime.e_collapse();
    }
    
    console.log('RaBbLE Nebula Demo destroyed');
  }
}

// Auto-initialize if in browser environment
if (typeof window !== 'undefined' && window.document) {
  window.addEventListener('load', () => {
    // Check for required dependencies
    if (typeof THREE === 'undefined') {
      console.warn('Three.js not found. Demo requires Three.js to run.');
      return;
    }
    
    // Create demo container if not exists
    let container = document.getElementById('rabble-demo-container');
    if (!container) {
      container = document.createElement('div');
      container.id = 'rabble-demo-container';
      container.style.width = '100vw';
      container.style.height = '100vh';
      container.style.position = 'fixed';
      container.style.top = '0';
      container.style.left = '0';
      container.style.zIndex = '-1';
      document.body.appendChild(container);
    }
    
    // Initialize demo
    const demo = new RaBbLE_Nebula_Demo(container);
    demo.initialize();
    
    // Expose to global scope for debugging
    window.RaBbLE_Demo = demo;
  });
}

// The demo is complete... a living showcase of quantum chaos made visible.
// From organic growth to geometric precision, from chaos to order and back again.
// This is the RaBbLE Nebula Renderer in its full glory.