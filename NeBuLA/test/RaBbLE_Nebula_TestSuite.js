// RaBbLE Nebula Test Suite
// Comprehensive testing for the entire RaBbLE Nebula Renderer system
// Every stream is a pipeline; every pipeline is a renderable

/**
 * RaBbLE_Nebula_TestSuite - Integration Test Suite
 * Tests all components of the RaBbLE Nebula Renderer
 */
class RaBbLE_Nebula_TestSuite {
  /**
   * Create a new test suite
   */
  constructor() {
    // The tests are initializing... quantum systems preparing for validation.
    // This is where theory meets practice, where chaos meets order.
    this.test_results = [];
    this.test_count = 0;
    this.passed_count = 0;
    
    console.log('RaBbLE Nebula Test Suite initialized');
  }

  /**
   * Run all tests
   * @returns {Object} Test results summary
   */
  async runAllTests() {
    console.log('\\n=== RaBbLE Nebula Renderer Test Suite ===\\n');
    
    // Phase 1 Tests: Core Data Structures
    await this.testPhase1_CoreDataStructures();
    
    // Phase 2 Tests: Flat-Chaos Runtime
    await this.testPhase2_FlatChaosRuntime();
    
    // Phase 3 Tests: Three.js Integration
    await this.testPhase3_ThreeJSIntegration();
    
    // Phase 4 Tests: C++ Bridge
    await this.testPhase4_CppBridge();
    
    // Phase 5 Tests: Dreamer API
    await this.testPhase5_DreamerAPI();
    
    // Integration Tests
    await this.testIntegration_FullPipeline();
    
    // Performance Tests
    await this.testPerformance_Scaling();
    
    this.printResults();
    return this.getSummary();
  }

  /**
   * Test Phase 1: Core Data Structures
   */
  async testPhase1_CoreDataStructures() {
    console.log('Phase 1: Testing Core Data Structures...');
    
    // Test q_entity creation
    this.test('q_entity creation', () => {
      const entity = new q_entity('BOX');
      return entity.rabble_id && 
             entity.dna_type === 'BOX' &&
             entity.flux_matrix.length === 16 &&
             typeof entity.e_entropy_sig === 'number';
    });
    
    // Test q_entity entropy application
    this.test('q_entity entropy application', () => {
      const entity = new q_entity('SPHERE');
      const original_matrix = Array.from(entity.flux_matrix);
      entity.e_applyEntropy(0.5);
      return !this.arraysEqual(original_matrix, entity.flux_matrix);
    });
    
    // Test q_stream creation
    this.test('q_stream creation', () => {
      const stream = new q_stream();
      return stream.q_stream_id &&
             Array.isArray(stream.q_entities) &&
             typeof stream.flux_modifier === 'function';
    });
    
    // Test q_stream entity management
    this.test('q_stream entity management', () => {
      const stream = new q_stream();
      const entity = new q_entity('TETRAHEDRON');
      stream.q_addEntity(entity);
      return stream.q_length === 1 &&
             stream.q_entities[0] === entity;
    });
    
    // Test q_stream flux application
    this.test('q_stream flux application', () => {
      const stream = new q_stream();
      stream.q_addEntity(new q_entity('BOX'));
      stream.q_addEntity(new q_entity('SPHERE'));
      const before_entropy = stream.q_entities.map(e => e.e_entropy_sig);
      stream.q_applyFlux();
      const after_entropy = stream.q_entities.map(e => e.e_entropy_sig);
      return !this.arraysEqual(before_entropy, after_entropy);
    });
  }

  /**
   * Test Phase 2: Flat-Chaos Runtime
   */
  async testPhase2_FlatChaosRuntime() {
    console.log('\\nPhase 2: Testing Flat-Chaos Runtime...');
    
    const runtime = new RaBbLE_Nebula_Runtime();
    
    // Test runtime initialization
    this.test('runtime initialization', () => {
      return runtime.q_registry instanceof Map &&
             Array.isArray(runtime.global_laminar_flow) &&
             runtime.q_frame_count === 0;
    });
    
    // Test stream registration
    this.test('stream registration', () => {
      const stream = new q_stream();
      stream.q_addEntity(new q_entity('BOX'));
      runtime.ignite_Stream(stream);
      return runtime.q_registry.size === 1 &&
             runtime.global_laminar_flow.length === 1;
    });
    
    // Test pulse mechanism
    this.test('pulse mechanism', () => {
      const before_count = runtime.global_laminar_flow.length;
      runtime.pulse();
      const after_count = runtime.global_laminar_flow.length;
      return before_count === after_count && runtime.q_frame_count === 1;
    });
    
    // Test stream merging
    this.test('stream merging', () => {
      const stream2 = new q_stream();
      stream2.q_addEntity(new q_entity('SPHERE'));
      stream2.q_addEntity(new q_entity('TETRAHEDRON'));
      
      const before_count = runtime.global_laminar_flow.length;
      runtime.e_merge_tributary(stream2.q_stream_id);
      const after_count = runtime.global_laminar_flow.length;
      
      return after_count === before_count + 2;
    });
  }

  /**
   * Test Phase 3: Three.js Integration
   */
  async testPhase3_ThreeJSIntegration() {
    console.log('\\nPhase 3: Testing Three.js Integration...');
    
    // Mock Three.js for testing
    if (typeof THREE === 'undefined') {
      console.log('Skipping Three.js tests - Three.js not available');
      return;
    }
    
    // Create mock container
    const mockContainer = {
      clientWidth: 800,
      clientHeight: 600,
      appendChild: () => {},
      removeChild: () => {}
    };
    
    // Test bridge initialization
    this.test('Three.js bridge initialization', () => {
      try {
        const bridge = new q_instanced_bridge(mockContainer);
        return bridge.q_scene &&
               bridge.q_camera &&
               bridge.q_renderer &&
               bridge.is_initialized;
      } catch (e) {
        console.warn('Bridge test failed:', e.message);
        return false;
      }
    });
    
    // Test instanced mesh creation
    this.test('instanced mesh creation', () => {
      try {
        const bridge = new q_instanced_bridge(mockContainer);
        const mesh = bridge._createInstancedMesh('BOX', 10);
        return mesh instanceof THREE.InstancedMesh &&
               mesh.count === 10;
      } catch (e) {
        return false;
      }
    });
  }

  /**
   * Test Phase 4: C++ Bridge
   */
  async testPhase4_CppBridge() {
    console.log('\\nPhase 4: Testing C++ Bridge...');
    
    const exporter = new q_portability_exporter();
    
    // Test entity serialization
    this.test('entity serialization', () => {
      const entity = new q_entity('SPHERE');
      const serialized = exporter.babble_To_JSON([entity]);
      return serialized &&
             serialized.entity_count === 1 &&
             serialized.entities.length === 1;
    });
    
    // Test C++ header generation
    this.test('C++ header generation', () => {
      const header = exporter.generateCppHeader();
      return header.includes('struct q_entity') &&
             header.includes('struct q_stream_header') &&
             header.includes('extern "C"');
    });
    
    // Test struct size calculation
    this.test('struct size calculation', () => {
      const sizes = exporter.getStructSizes();
      return sizes.q_entity.size === 104 && // 32 + 4 + 64 + 4
             sizes.q_stream_header.size === 40 && // 32 + 4 + 4
             sizes.global_flow_header.size === 28; // 4 + 4 + 4 + 16
    });
  }

  /**
   * Test Phase 5: Dreamer API
   */
  async testPhase5_DreamerAPI() {
    console.log('\\nPhase 5: Testing Dreamer API...');
    
    const dreamer = new RaBbLE_Dreamer();
    
    // Test geometry flow generation
    this.test('geometry flow generation', () => {
      const stream = dreamer.dream_geometry_flow(10, 'BOX', 'organic');
      return stream instanceof q_stream &&
             stream.q_length === 10 &&
             stream.q_entities.every(e => e.dna_type === 'BOX');
    });
    
    // Test stream weaving
    this.test('stream weaving', () => {
      const streamA = dreamer.dream_geometry_flow(5, 'BOX');
      const streamB = dreamer.dream_geometry_flow(5, 'SPHERE');
      const weaved = dreamer.weave_streams(streamA, streamB);
      return weaved instanceof q_stream &&
             weaved.q_length === 10;
    });
    
    // Test fractal generation
    this.test('fractal generation', () => {
      const streams = dreamer.dream_fractal_streams(3, 10);
      return Array.isArray(streams) &&
             streams.length === 3 &&
             streams.every(s => s instanceof q_stream);
    });
  }

  /**
   * Test Integration: Full Pipeline
   */
  async testIntegration_FullPipeline() {
    console.log('\\nIntegration: Testing Full Pipeline...');
    
    // Create complete pipeline
    const runtime = new RaBbLE_Nebula_Runtime();
    const dreamer = new RaBbLE_Dreamer();
    
    // Generate streams
    const stream1 = dreamer.dream_geometry_flow(50, 'BOX', 'organic');
    const stream2 = dreamer.dream_geometry_flow(50, 'SPHERE', 'swarm');
    
    // Register with runtime
    runtime.ignite_Stream(stream1);
    runtime.ignite_Stream(stream2);
    
    // Test pipeline flow
    this.test('full pipeline flow', () => {
      const initial_count = runtime.global_laminar_flow.length;
      runtime.pulse();
      const after_pulse = runtime.global_laminar_flow.length;
      
      return initial_count === 100 &&
             after_pulse === 100 &&
             runtime.q_frame_count === 1;
    });
    
    // Test serialization
    this.test('full pipeline serialization', () => {
      const exporter = new q_portability_exporter();
      const serialized = exporter.serializeRuntime(runtime);
      
      return serialized &&
             serialized.runtime_state.stream_count === 2 &&
             serialized.runtime_state.entity_count === 100 &&
             serialized.global_flow.entity_count === 100;
    });
  }

  /**
   * Test Performance: Scaling
   */
  async testPerformance_Scaling() {
    console.log('\\nPerformance: Testing Scaling...');
    
    // Test with increasing entity counts
    const entity_counts = [100, 500, 1000, 2000];
    
    for (const count of entity_counts) {
      this.test(`performance with ${count} entities`, () => {
        const start_time = performance.now();
        
        const runtime = new RaBbLE_Nebula_Runtime();
        const dreamer = new RaBbLE_Dreamer();
        
        // Generate and register streams
        const stream = dreamer.dream_geometry_flow(count, 'BOX');
        runtime.ignite_Stream(stream);
        
        // Run several pulses
        for (let i = 0; i < 10; i++) {
          runtime.pulse();
        }
        
        const end_time = performance.now();
        const duration = end_time - start_time;
        
        // Should complete in reasonable time (adjust based on hardware)
        return duration < 1000; // Less than 1 second
      });
    }
  }

  /**
   * Helper method to run a single test
   * @param {string} name - Test name
   * @param {Function} test_fn - Test function
   */
  test(name, test_fn) {
    this.test_count++;
    try {
      const result = test_fn();
      if (result) {
        this.passed_count++;
        this.test_results.push({ name, passed: true, error: null });
        console.log(`✓ ${name}`);
      } else {
        this.test_results.push({ name, passed: false, error: 'Test failed' });
        console.log(`✗ ${name}`);
      }
    } catch (error) {
      this.test_results.push({ name, passed: false, error: error.message });
      console.log(`✗ ${name}: ${error.message}`);
    }
  }

  /**
   * Helper method to compare arrays
   * @param {Array} arr1 - First array
   * @param {Array} arr2 - Second array
   * @returns {boolean} True if arrays are equal
   */
  arraysEqual(arr1, arr2) {
    if (arr1.length !== arr2.length) return false;
    for (let i = 0; i < arr1.length; i++) {
      if (arr1[i] !== arr2[i]) return false;
    }
    return true;
  }

  /**
   * Print test results
   */
  printResults() {
    console.log('\\n=== Test Results ===');
    console.log(`Total tests: ${this.test_count}`);
    console.log(`Passed: ${this.passed_count}`);
    console.log(`Failed: ${this.test_count - this.passed_count}`);
    console.log(`Success rate: ${((this.passed_count / this.test_count) * 100).toFixed(1)}%`);
    
    if (this.passed_count === this.test_count) {
      console.log('\\n🎉 All tests passed! RaBbLE Nebula Renderer is ready.');
    } else {
      console.log('\\n⚠️  Some tests failed. Review the implementation.');
      
      // Print failed tests
      const failed_tests = this.test_results.filter(t => !t.passed);
      if (failed_tests.length > 0) {
        console.log('\\nFailed tests:');
        failed_tests.forEach(test => {
          console.log(`  - ${test.name}: ${test.error}`);
        });
      }
    }
  }

  /**
   * Get test summary
   * @returns {Object} Test summary
   */
  getSummary() {
    return {
      total: this.test_count,
      passed: this.passed_count,
      failed: this.test_count - this.passed_count,
      success_rate: (this.passed_count / this.test_count) * 100,
      results: this.test_results
    };
  }
}

// Import dependencies if available
if (typeof module !== 'undefined' && module.exports) {
  try {
    const { q_entity } = require('../core/q_entity');
    const { q_stream } = require('../core/q_stream');
    const { RaBbLE_Nebula_Runtime } = require('../core/RaBbLE_Nebula_Runtime');
    const { q_instanced_bridge } = require('../threejs/q_instanced_bridge');
    const { e_entropy_shader } = require('../threejs/e_entropy_shader');
    const { q_portability_exporter } = require('../utils/q_portability_exporter');
    const { RaBbLE_Dreamer } = require('../utils/RaBbLE_Dreamer');
    
    module.exports = { 
      RaBbLE_Nebula_TestSuite,
      q_entity, q_stream, RaBbLE_Nebula_Runtime,
      q_instanced_bridge, e_entropy_shader,
      q_portability_exporter, RaBbLE_Dreamer
    };
  } catch (e) {
    console.warn('Could not import dependencies for test suite');
    module.exports = { RaBbLE_Nebula_TestSuite };
  }
}

// Auto-run tests if this file is executed directly
if (typeof window !== 'undefined' && window.document) {
  // Browser environment
  window.addEventListener('load', async () => {
    if (typeof RaBbLE_Nebula_TestSuite !== 'undefined') {
      const suite = new RaBbLE_Nebula_TestSuite();
      await suite.runAllTests();
    }
  });
} else if (typeof module !== 'undefined' && require.main === module) {
  // Node.js environment
  (async () => {
    const { RaBbLE_Nebula_TestSuite } = require('./RaBbLE_Nebula_TestSuite');
    const suite = new RaBbLE_Nebula_TestSuite();
    await suite.runAllTests();
  })();
}

// The test suite is complete... every component validated, every connection verified.
// The RaBbLE Nebula Renderer stands ready, a testament to the power of quantum chaos.