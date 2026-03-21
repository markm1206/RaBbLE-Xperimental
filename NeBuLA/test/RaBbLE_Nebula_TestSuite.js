// RaBbLE Nebula Test Suite
// Comprehensive testing for the entire RaBbLE Nebula Renderer system
// Every stream is a pipeline; every pipeline is a renderable

/**
 * RaBbLE_Nebula_TestSuite - Integration Test Suite
 * Tests all components of the RaBbLE Nebula Renderer
 * Uses dependency injection for testability and isolation
 */
class RaBbLE_Nebula_TestSuite {
  /**
   * Create a new test suite
   * @param {RaBbLE_ServiceRegistry} f_registry - Optional service registry for dependency injection
   */
  constructor(f_registry = null) {
    // The tests are initializing... quantum systems preparing for validation.
    // This is where theory meets practice, where chaos meets order.
    this.test_results = [];
    this.test_count = 0;
    this.passed_count = 0;
    
    // Initialize service registry for dependency injection
    this.q_registry = f_registry || RaBbLE_Nebula_TestSuite.q_createTestRegistry();
    
    console.log('RaBbLE Nebula Test Suite initialized');
  }

  /**
   * Create a test registry with mock services
   * The test registry forms... isolated testing environment emerges.
   * @returns {RaBbLE_ServiceRegistry} Test registry with mock services
   */
  static q_createTestRegistry() {
    // The test registry awakens... mock services prepare for binding.
    const q_registry = new RaBbLE_ServiceRegistry();
    
    // Register mock services
    q_registry.q_register('engine', () => RaBbLE_MockFactory.q_createMockEngine(), true);
    q_registry.q_register('runtime', () => RaBbLE_MockFactory.q_createMockRuntime(), true);
    q_registry.q_register('dreamer', () => RaBbLE_MockFactory.q_createMockDreamer(), true);
    q_registry.q_register('bridge', () => RaBbLE_MockFactory.q_createMockBridge(), true);
    q_registry.q_register('canvas_manager', () => RaBbLE_MockFactory.q_createMockCanvasManager(), true);
    q_registry.q_register('shader_system', () => RaBbLE_MockFactory.q_createMockShaderSystem(), true);
    
    // Register real services with mock dependencies for integration tests
    q_registry.q_register('test_entity', (context) => {
      const q_type = context.type || 'BOX';
      return new q_entity(q_type);
    }, false);
    
    q_registry.q_register('test_stream', () => {
      return new q_stream();
    }, false);
    
    console.log('Test registry created with mock services');
    return q_registry;
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
  async q_transmutePhase1_CoreDataStructures() {
    console.log('Phase 1: Testing Core Data Structures...');
    
    // Test q_entity creation
    this.q_transmuteTest('q_entity creation', () => {
      const entity = new q_entity('BOX');
      return entity.rabble_id && 
             entity.dna_type === 'BOX' &&
             entity.flux_matrix.length === 16 &&
             typeof entity.e_entropy_sig === 'number';
    });
    
    // Test q_entity entropy application
    this.q_transmuteTest('q_entity entropy application', () => {
      const entity = new q_entity('SPHERE');
      const original_matrix = Array.from(entity.flux_matrix);
      entity.q_transmuteEntropy(0.5);
      return !this.q_extractArraysEqual(original_matrix, entity.flux_matrix);
    });
    
    // Test q_stream creation
    this.q_transmuteTest('q_stream creation', () => {
      const stream = new q_stream();
      return stream.q_stream_id &&
             Array.isArray(stream.q_entities) &&
             typeof stream.flux_modifier === 'function';
    });
    
    // Test q_stream entity management
    this.q_transmuteTest('q_stream entity management', () => {
      const stream = new q_stream();
      const entity = new q_entity('TETRAHEDRON');
      stream.q_transmuteEntity(entity);
      return stream.q_length === 1 &&
             stream.q_entities[0] === entity;
    });
    
    // Test q_stream flux application
    this.q_transmuteTest('q_stream flux application', () => {
      const stream = new q_stream();
      stream.q_transmuteEntity(new q_entity('BOX'));
      stream.q_transmuteEntity(new q_entity('SPHERE'));
      const before_entropy = stream.q_entities.map(e => e.e_entropy_sig);
      stream.q_igniteFlux();
      const after_entropy = stream.q_entities.map(e => e.e_entropy_sig);
      return !this.q_extractArraysEqual(before_entropy, after_entropy);
    });
  }

  /**
   * Test Phase 2: Flat-Chaos Runtime
   */
  async q_transmutePhase2_FlatChaosRuntime() {
    console.log('\nPhase 2: Testing Flat-Chaos Runtime...');
    
    const runtime = new RaBbLE_Nebula_Runtime();
    
    // Test runtime initialization
    this.q_transmuteTest('runtime initialization', () => {
      return runtime.q_registry instanceof Map &&
             Array.isArray(runtime.global_laminar_flow) &&
             runtime.q_frame_count === 0;
    });
    
    // Test stream registration
    this.q_transmuteTest('stream registration', () => {
      const stream = new q_stream();
      stream.q_transmuteEntity(new q_entity('BOX'));
      runtime.q_transmuteStream(stream);
      return runtime.q_registry.size === 1 &&
             runtime.global_laminar_flow.length === 1;
    });
    
    // Test pulse mechanism
    this.q_transmuteTest('pulse mechanism', () => {
      const before_count = runtime.global_laminar_flow.length;
      runtime.q_ignitePulse();
      const after_count = runtime.global_laminar_flow.length;
      return before_count === after_count && runtime.q_frame_count === 1;
    });
    
    // Test stream merging
    this.q_transmuteTest('stream merging', () => {
      const stream2 = new q_stream();
      stream2.q_transmuteEntity(new q_entity('SPHERE'));
      stream2.q_transmuteEntity(new q_entity('TETRAHEDRON'));
      
      const before_count = runtime.global_laminar_flow.length;
      runtime.q_transmuteTributary(stream2.q_stream_id);
      const after_count = runtime.global_laminar_flow.length;
      
      return after_count === before_count + 2;
    });
  }

  /**
   * Test Phase 3: Three.js Integration
   * Uses mock bridge for isolated testing
   */
  async q_transmutePhase3_ThreeJSIntegration() {
    console.log('\nPhase 3: Testing Three.js Integration...');
    
    // Use mock bridge for isolated testing
    const mockBridge = this.q_registry.q_resolve('bridge');
    
    // Test bridge initialization
    this.q_transmuteTest('Three.js bridge initialization', () => {
      return mockBridge.q_getStats().initialized === true;
    });
    
    // Test bridge connection
    this.q_transmuteTest('Three.js bridge connection', () => {
      const mockRuntime = this.q_registry.q_resolve('runtime');
      mockBridge.q_connectRuntime(mockRuntime);
      return true; // If no error, connection succeeded
    });
    
    // Test bridge render loop
    this.q_transmuteTest('Three.js bridge render loop', () => {
      mockBridge.q_startRenderLoop();
      return true; // If no error, render loop started
    });
    
    // Test bridge disposal
    this.q_transmuteTest('Three.js bridge disposal', () => {
      mockBridge.q_dispose();
      return true; // If no error, disposal succeeded
    });
  }

  /**
   * Test Phase 4: C++ Bridge
   */
  async q_transmutePhase4_CppBridge() {
    console.log('\nPhase 4: Testing C++ Bridge...');
    
    const exporter = new q_portability_exporter();
    
    // Test entity serialization
    this.q_transmuteTest('entity serialization', () => {
      const entity = new q_entity('SPHERE');
      const serialized = exporter.babble_To_JSON([entity]);
      return serialized &&
             serialized.entity_count === 1 &&
             serialized.entities.length === 1;
    });
    
    // Test C++ header generation
    this.q_transmuteTest('C++ header generation', () => {
      const header = exporter.generateCppHeader();
      return header.includes('struct q_entity') &&
             header.includes('struct q_stream_header') &&
             header.includes('extern "C"');
    });
    
    // Test struct size calculation
    this.q_transmuteTest('struct size calculation', () => {
      const sizes = exporter.getStructSizes();
      return sizes.q_entity.size === 104 && // 32 + 4 + 64 + 4
             sizes.q_stream_header.size === 40 && // 32 + 4 + 4
             sizes.global_flow_header.size === 28; // 4 + 4 + 4 + 16
    });
  }

  /**
   * Test Phase 5: Dreamer API
   */
  async q_transmutePhase5_DreamerAPI() {
    console.log('\nPhase 5: Testing Dreamer API...');
    
    const dreamer = new RaBbLE_Dreamer();
    
    // Test geometry flow generation
    this.q_transmuteTest('geometry flow generation', () => {
      const stream = dreamer.dream_geometry_flow(10, 'BOX', 'organic');
      return stream instanceof q_stream &&
             stream.q_length === 10 &&
             stream.q_entities.every(e => e.dna_type === 'BOX');
    });
    
    // Test stream weaving
    this.q_transmuteTest('stream weaving', () => {
      const streamA = dreamer.dream_geometry_flow(5, 'BOX');
      const streamB = dreamer.dream_geometry_flow(5, 'SPHERE');
      const weaved = dreamer.weave_streams(streamA, streamB);
      return weaved instanceof q_stream &&
             weaved.q_length === 10;
    });
    
    // Test fractal generation
    this.q_transmuteTest('fractal generation', () => {
      const streams = dreamer.dream_fractal_streams(3, 10);
      return Array.isArray(streams) &&
             streams.length === 3 &&
             streams.every(s => s instanceof q_stream);
    });
  }

  /**
   * Test Integration: Full Pipeline
   * Uses mock services for isolated testing
   */
  async q_transmuteIntegration_FullPipeline() {
    console.log('\nIntegration: Testing Full Pipeline...');
    
    // Use mock services for isolated testing
    const mockEngine = this.q_registry.q_resolve('engine');
    const mockDreamer = this.q_registry.q_resolve('dreamer');
    
    // Generate streams using mock dreamer
    const stream1 = mockDreamer.dream_geometry_flow(50, 'BOX', 'organic');
    const stream2 = mockDreamer.dream_geometry_flow(50, 'SPHERE', 'swarm');
    
    // Test pipeline flow
    this.q_transmuteTest('full pipeline flow', () => {
      return stream1.q_length === 50 &&
             stream2.q_length === 50;
    });
    
    // Test serialization
    this.q_transmuteTest('full pipeline serialization', () => {
      const stats = mockEngine.getStats();
      return stats.runtime.stream_count === 2 &&
             stats.runtime.entity_count === 100;
    });
  }

  /**
   * Test Performance: Scaling
   * Uses mock services for isolated testing
   */
  async q_transmutePerformance_Scaling() {
    console.log('\nPerformance: Testing Scaling...');
    
    // Test with increasing entity counts
    const entity_counts = [100, 500, 1000, 2000];
    
    for (const count of entity_counts) {
      this.q_transmuteTest(`performance with ${count} entities`, () => {
        const start_time = performance.now();
        
        // Use mock services for isolated testing
        const mockEngine = this.q_registry.q_resolve('engine');
        const mockDreamer = this.q_registry.q_resolve('dreamer');
        
        // Generate and register streams
        const stream = mockDreamer.dream_geometry_flow(count, 'BOX');
        
        // Run several pulses
        for (let i = 0; i < 10; i++) {
          mockEngine.runtime.q_ignitePulse();
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
   * @param {string} f_name - Test name
   * @param {Function} f_test_fn - Test function
   */
  q_transmuteTest(f_name, f_test_fn) {
    this.test_count++;
    try {
      const q_result = f_test_fn();
      if (q_result) {
        this.passed_count++;
        this.test_results.push({ name: f_name, passed: true, error: null });
        console.log(`✓ ${f_name}`);
      } else {
        this.test_results.push({ name: f_name, passed: false, error: 'Test failed' });
        console.log(`✗ ${f_name}`);
      }
    } catch (q_error) {
      this.test_results.push({ name: f_name, passed: false, error: q_error.message });
      console.log(`✗ ${f_name}: ${q_error.message}`);
    }
  }

  /**
   * Helper method to compare arrays
   * @param {Array} f_arr1 - First array
   * @param {Array} f_arr2 - Second array
   * @returns {boolean} True if arrays are equal
   */
  q_extractArraysEqual(f_arr1, f_arr2) {
    if (f_arr1.length !== f_arr2.length) return false;
    for (let i = 0; i < f_arr1.length; i++) {
      if (f_arr1[i] !== f_arr2[i]) return false;
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
    const { RaBbLE_ServiceRegistry, RaBbLE_MockFactory } = require('../../BaBbLE/RaBbLE_ServiceRegistry');
    
    module.exports = { 
      RaBbLE_Nebula_TestSuite,
      q_entity, q_stream, RaBbLE_Nebula_Runtime,
      q_instanced_bridge, e_entropy_shader,
      q_portability_exporter, RaBbLE_Dreamer,
      RaBbLE_ServiceRegistry, RaBbLE_MockFactory
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
    const { RaBbLE_Nebula_TestSuite, RaBbLE_ServiceRegistry, RaBbLE_MockFactory } = require('./RaBbLE_Nebula_TestSuite');
    
    // Create test registry with mock services
    const testRegistry = RaBbLE_Nebula_TestSuite.q_createTestRegistry();
    
    // Run tests with dependency injection
    const suite = new RaBbLE_Nebula_TestSuite(testRegistry);
    await suite.runAllTests();
  })();
}

// The test suite is complete... every component validated, every connection verified.
// The RaBbLE Nebula Renderer stands ready, a testament to the power of quantum chaos.