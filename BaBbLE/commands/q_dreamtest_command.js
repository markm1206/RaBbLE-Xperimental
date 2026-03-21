/**
 * q_dreamtest_command - Dream Test Suite
 * Tests all dream patterns on both Dream and Cosmic windows
 * 
 * The test flows through the BaBbLE pipeline:
 * Source → Filter → Transmute → Sink
 */

import { q_command } from '../RaBbLE_BaBbLE_Pipeline.js';

class q_dreamtest_command extends q_command {
  constructor(f_engine) {
    super({
      name: 'dreamtest',
      description: 'Test all dream patterns on both windows',
      aliases: ['dt', 'testdreams']
    });
    
    // The test suite awakens... dreams prepare for validation.
    this.q_engine = f_engine;
    this.q_test_patterns = ['organic', 'lattice', 'swarm', 'galaxy', 'vortex', 'fractal', 'explosion', 'spiral'];
    this.q_test_types = ['SPHERE', 'BOX', 'TETRAHEDRON'];
  }

  q_source(f_args) {
    // Parse: dreamtest [window] [pattern] [count] [type]
    // If no args, run full test suite
    const q_window = f_args[0] || 'both';
    const q_pattern = f_args[1] || 'all';
    const q_count = parseInt(f_args[2]) || 20;
    const q_type = f_args[3] || 'SPHERE';
    
    return { window: q_window, pattern: q_pattern, count: q_count, type: q_type };
  }

  q_filter(f_params) {
    // Validate window
    const q_valid_windows = ['both', 'dream', 'cosmic'];
    if (!q_valid_windows.includes(f_params.window)) {
      return { 
        error: `Invalid window: ${f_params.window}. Use: ${q_valid_windows.join(', ')}` 
      };
    }
    
    // Validate pattern
    if (f_params.pattern !== 'all' && !this.q_test_patterns.includes(f_params.pattern)) {
      return { 
        error: `Invalid pattern: ${f_params.pattern}. Use: all, ${this.q_test_patterns.join(', ')}` 
      };
    }
    
    // Validate count
    if (f_params.count < 1 || f_params.count > 100) {
      return { error: 'Count must be between 1 and 100' };
    }
    
    // Validate type
    if (!this.q_test_types.includes(f_params.type)) {
      return { 
        error: `Invalid type: ${f_params.type}. Use: ${this.q_test_types.join(', ')}` 
      };
    }
    
    return f_params;
  }

  q_transmute(f_params) {
    if (f_params.error) return f_params;
    
    // The test materializes... dreams prepare for validation.
    const q_results = {
      timestamp: Date.now(),
      tests_run: 0,
      tests_passed: 0,
      tests_failed: 0,
      details: []
    };
    
    // Determine which patterns to test
    const q_patterns_to_test = f_params.pattern === 'all' 
      ? this.q_test_patterns 
      : [f_params.pattern];
    
    // Determine which windows to test
    const q_windows_to_test = f_params.window === 'both'
      ? ['dream', 'cosmic']
      : [f_params.window];
    
    // Run tests for each window and pattern combination
    q_windows_to_test.forEach(q_window => {
      q_patterns_to_test.forEach(q_pattern => {
        q_results.tests_run++;
        
        try {
          // Create dream on specified window
          const q_dream_result = this._createTestDream(q_window, q_pattern, f_params.count, f_params.type);
          
          if (q_dream_result.success) {
            q_results.tests_passed++;
            q_results.details.push({
              window: q_window,
              pattern: q_pattern,
              status: 'PASSED',
              stream_id: q_dream_result.stream_id,
              entity_count: q_dream_result.entity_count,
              message: q_dream_result.message
            });
          } else {
            q_results.tests_failed++;
            q_results.details.push({
              window: q_window,
              pattern: q_pattern,
              status: 'FAILED',
              error: q_dream_result.error
            });
          }
        } catch (q_error) {
          q_results.tests_failed++;
          q_results.details.push({
            window: q_window,
            pattern: q_pattern,
            status: 'FAILED',
            error: q_error.message
          });
        }
      });
    });
    
    // Schedule cleanup after test (dreams are temporary)
    setTimeout(() => {
      this._cleanupTestDreams(q_results);
    }, 5000); // Cleanup after 5 seconds
    
    return {
      success: true,
      results: q_results,
      message: `Dream test suite completed: ${q_results.tests_passed}/${q_results.tests_run} passed`
    };
  }

  /**
   * Create a test dream on specified window
   * @private
   */
  _createTestDream(f_window, f_pattern, f_count, f_type) {
    // The test dream materializes... particles form for validation.
    let q_engine;
    
    // Select engine based on window
    if (f_window === 'dream') {
      q_engine = window.q_shell ? window.q_shell.q_dream_engine : null;
    } else {
      q_engine = window.q_shell ? window.q_shell.q_cosmic_engine : null;
    }
    
    if (!q_engine) {
      return { success: false, error: `Engine not found for window: ${f_window}` };
    }
    
    // Create stream based on pattern
    let q_stream;
    
    switch (f_pattern) {
      case 'organic':
        q_stream = q_engine.createOrganicStream(f_count, f_type);
        break;
      case 'lattice':
        q_stream = q_engine.createLatticeStream(f_count, f_type);
        break;
      case 'swarm':
        q_stream = q_engine.createSwarmStream(f_count, f_type);
        break;
      case 'galaxy':
        q_stream = q_engine.createGalaxyStream(f_count, f_type);
        break;
      case 'vortex':
        q_stream = q_engine.createVortexStream(f_count, f_type);
        break;
      case 'fractal':
        q_stream = q_engine.createFractalStream(f_count, f_type);
        break;
      case 'explosion':
        q_stream = q_engine.createExplosionStream(f_count, f_type);
        break;
      case 'spiral':
        q_stream = q_engine.createSpiralStream(f_count, f_type);
        break;
      default:
        q_stream = q_engine.createOrganicStream(f_count, f_type);
    }
    
    if (!q_stream) {
      return { success: false, error: `Failed to create stream for pattern: ${f_pattern}` };
    }
    
    // Register stream with runtime
    q_engine.runtime.q_transmuteStream(q_stream);
    
    return {
      success: true,
      stream_id: q_stream.q_stream_id,
      entity_count: q_stream.q_length,
      message: `Created ${f_pattern} stream with ${f_count} ${f_type} entities on ${f_window} window`
    };
  }

  /**
   * Clean up test dreams after validation
   * @private
   */
  _cleanupTestDreams(f_results) {
    // The test dreams dissolve... particles return to the void.
    console.log('[DREAMTEST] Cleaning up test dreams...');
    
    f_results.details.forEach(q_detail => {
      if (q_detail.status === 'PASSED' && q_detail.stream_id) {
        try {
          // Get engine for this window
          const q_engine = q_detail.window === 'dream'
            ? (window.q_shell ? window.q_shell.q_dream_engine : null)
            : (window.q_shell ? window.q_shell.q_cosmic_engine : null);
          
          if (q_engine && q_engine.runtime) {
            q_engine.runtime.q_dissolveStream(q_detail.stream_id);
            console.log(`[DREAMTEST] Dissolved stream: ${q_detail.stream_id}`);
          }
        } catch (q_error) {
          console.warn(`[DREAMTEST] Failed to dissolve stream ${q_detail.stream_id}:`, q_error);
        }
      }
    });
    
    console.log('[DREAMTEST] Cleanup complete');
  }

  q_sink(f_result) {
    if (f_result.error) {
      return `ERROR: ${f_result.error}`;
    }
    
    // The test results emerge... validation complete.
    const q_results = f_result.results;
    
    let q_output = `[DREAMTEST] Test Suite Complete\n`;
    q_output += `  Tests Run: ${q_results.tests_run}\n`;
    q_output += `  Passed: ${q_results.tests_passed}\n`;
    q_output += `  Failed: ${q_results.tests_failed}\n`;
    q_output += `  Success Rate: ${((q_results.tests_passed / q_results.tests_run) * 100).toFixed(1)}%\n\n`;
    
    q_output += `Test Details:\n`;
    q_results.details.forEach(q_detail => {
      const q_status_icon = q_detail.status === 'PASSED' ? '✓' : '✗';
      q_output += `  ${q_status_icon} ${q_detail.window}/${q_detail.pattern}: ${q_detail.status}\n`;
      
      if (q_detail.status === 'PASSED') {
        q_output += `    Stream: ${q_detail.stream_id}\n`;
        q_output += `    Entities: ${q_detail.entity_count}\n`;
      } else {
        q_output += `    Error: ${q_detail.error}\n`;
      }
    });
    
    q_output += `\nNote: Test dreams will be automatically cleaned up in 5 seconds.`;
    
    return q_output;
  }
}

export { q_dreamtest_command };