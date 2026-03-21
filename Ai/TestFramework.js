/**
 * RaBbLE Test Framework - The Quantum Proving Grounds
 * Simple test harness for validating behavior without entropy chaos
 * 
 * Philosophy: Test like you babble - rapid, iterative, and full of insights
 * 
 * Usage:
 *   const q_test = new RaBbLE_TestFramework();
 *   q_test.q_addTest('entity creation', () => {
 *     const e = new q_entity('SPHERE');
 *     q_test.q_assertEqual(e.dna_type, 'SPHERE');
 *   });
 *   q_test.q_runAll();
 */

class RaBbLE_TestFramework {
  /**
   * Initialize the test framework
   * @param {Object} f_options - Configuration options
   */
  constructor(f_options = {}) {
    this.q_tests = new Map();
    this.q_suites = new Map();
    this.q_results = [];
    this.q_verbose = f_options.verbose !== false;
    this.q_fail_fast = f_options.failFast || false;
    this.q_current_suite = null;
  }

  /**
   * q_addTest - Register a test case
   * @param {string} f_name - Test name
   * @param {Function} f_callback - Test function
   * @param {string} [f_suite] - Optional suite name
   * @returns {RaBbLE_TestFramework} This framework for chaining
   */
  q_addTest(f_name, f_callback, f_suite = null) {
    const q_test_id = f_suite ? `${f_suite}::${f_name}` : f_name;
    this.q_tests.set(q_test_id, {
      name: f_name,
      callback: f_callback,
      suite: f_suite,
      status: 'pending'
    });

    // Track suites
    if (f_suite) {
      if (!this.q_suites.has(f_suite)) {
        this.q_suites.set(f_suite, []);
      }
      this.q_suites.get(f_suite).push(q_test_id);
    }

    return this;
  }

  /**
   * q_startSuite - Begin a test suite
   * @param {string} f_name - Suite name
   * @returns {RaBbLE_TestFramework} This framework for chaining
   */
  q_startSuite(f_name) {
    this.q_current_suite = f_name;
    if (this.q_verbose) {
      console.log(`\n[TEST SUITE] ${f_name}`);
    }
    return this;
  }

  /**
   * q_endSuite - Close current suite
   * @returns {RaBbLE_TestFramework} This framework for chaining
   */
  q_endSuite() {
    this.q_current_suite = null;
    return this;
  }

  /**
   * q_runAll - Execute all registered tests
   * @returns {Object} Test results summary
   */
  q_runAll() {
    const q_start_time = performance.now();
    let q_passed = 0;
    let q_failed = 0;
    let q_errors = 0;

    console.log('\n[RABBLE TEST RUNNER] Starting quantum validation...\n');

    // Run tests by suite for organized output
    const q_suites_run = new Set();

    this.q_tests.forEach((q_test, q_test_id) => {
      // Skip if already run as part of suite
      if (q_test.suite && q_suites_run.has(q_test.suite)) return;

      if (q_test.suite && !q_suites_run.has(q_test.suite)) {
        q_suites_run.add(q_test.suite);
        const q_suite_tests = this.q_suites.get(q_test.suite) || [];
        q_suite_tests.forEach(q_id => {
          const q_suite_test = this.q_tests.get(q_id);
          const q_result = this.q_executeTest(q_id, q_suite_test);
          if (q_result.passed) q_passed++;
          else if (q_result.error) q_errors++;
          else q_failed++;
        });
      } else if (!q_test.suite) {
        const q_result = this.q_executeTest(q_test_id, q_test);
        if (q_result.passed) q_passed++;
        else if (q_result.error) q_errors++;
        else q_failed++;
      }
    });

    const q_end_time = performance.now();
    const q_duration = (q_end_time - q_start_time).toFixed(2);

    // Print summary
    console.log('\n[TEST RESULTS]');
    console.log(`  Total: ${q_passed + q_failed + q_errors}`);
    console.log(`  Passed: ${q_passed}`);
    console.log(`  Failed: ${q_failed}`);
    console.log(`  Errors: ${q_errors}`);
    console.log(`  Duration: ${q_duration}ms`);

    return {
      total: q_passed + q_failed + q_errors,
      passed: q_passed,
      failed: q_failed,
      errors: q_errors,
      duration: q_duration,
      success: q_failed === 0 && q_errors === 0
    };
  }

  /**
   * q_runSuite - Execute tests in a specific suite
   * @param {string} f_suite_name - Suite name
   * @returns {Object} Suite results
   */
  q_runSuite(f_suite_name) {
    const q_suite_tests = this.q_suites.get(f_suite_name);
    if (!q_suite_tests) {
      console.error(`Suite not found: ${f_suite_name}`);
      return { error: 'Suite not found' };
    }

    console.log(`\n[RUNNING SUITE] ${f_suite_name}\n`);

    let q_passed = 0;
    let q_failed = 0;
    let q_errors = 0;

    q_suite_tests.forEach(q_test_id => {
      const q_test = this.q_tests.get(q_test_id);
      const q_result = this.q_executeTest(q_test_id, q_test);
      if (q_result.passed) q_passed++;
      else if (q_result.error) q_errors++;
      else q_failed++;
    });

    return {
      suite: f_suite_name,
      total: q_passed + q_failed + q_errors,
      passed: q_passed,
      failed: q_failed,
      errors: q_errors,
      success: q_failed === 0 && q_errors === 0
    };
  }

  /**
   * q_executeTest - Run a single test
   * @private
   * @param {string} f_id - Test ID
   * @param {Object} f_test - Test configuration
   * @returns {Object} Test result
   */
  q_executeTest(f_id, f_test) {
    const q_result = {
      id: f_id,
      name: f_test.name,
      passed: false,
      error: null,
      assertions: 0
    };

    try {
      // Execute test callback
      f_test.callback();
      q_result.passed = true;
      f_test.status = 'passed';
      
      if (this.q_verbose) {
        console.log(`  ✓ ${f_test.name}`);
      }
    } catch (e) {
      q_result.passed = false;
      f_test.status = 'failed';
      
      if (e.message && e.message.startsWith('Assertion failed')) {
        q_result.error = e.message;
        console.log(`  ✗ ${f_test.name}: ${e.message}`);
      } else {
        q_result.error = e.toString();
        console.error(`  ✗ ${f_test.name}: ERROR - ${e.message}`);
        console.error(e.stack);
      }

      if (this.q_fail_fast) {
        throw e;
      }
    }

    this.q_results.push(q_result);
    return q_result;
  }

  /**
   * q_assertEqual - Assert two values are equal
   * @param {*} f_actual - Actual value
   * @param {*} f_expected - Expected value
   * @param {string} [f_message] - Error message
   */
  q_assertEqual(f_actual, f_expected, f_message = null) {
    if (f_actual !== f_expected) {
      const q_msg = f_message || `Expected ${JSON.stringify(f_expected)}, got ${JSON.stringify(f_actual)}`;
      throw new Error(`Assertion failed: ${q_msg}`);
    }
  }

  /**
   * q_assertNotEqual - Assert two values are not equal
   * @param {*} f_actual - Actual value
   * @param {*} f_unexpected - Unexpected value
   * @param {string} [f_message] - Error message
   */
  q_assertNotEqual(f_actual, f_unexpected, f_message = null) {
    if (f_actual === f_unexpected) {
      const q_msg = f_message || `Expected value to not equal ${JSON.stringify(f_unexpected)}`;
      throw new Error(`Assertion failed: ${q_msg}`);
    }
  }

  /**
   * q_assertTrue - Assert value is truthy
   * @param {*} f_value - Value to check
   * @param {string} [f_message] - Error message
   */
  q_assertTrue(f_value, f_message = null) {
    if (!f_value) {
      const q_msg = f_message || `Expected truthy value, got ${JSON.stringify(f_value)}`;
      throw new Error(`Assertion failed: ${q_msg}`);
    }
  }

  /**
   * q_assertFalse - Assert value is falsy
   * @param {*} f_value - Value to check
   * @param {string} [f_message] - Error message
   */
  q_assertFalse(f_value, f_message = null) {
    if (f_value) {
      const q_msg = f_message || `Expected falsy value, got ${JSON.stringify(f_value)}`;
      throw new Error(`Assertion failed: ${q_msg}`);
    }
  }

  /**
   * q_assertNull - Assert value is null
   * @param {*} f_value - Value to check
   * @param {string} [f_message] - Error message
   */
  q_assertNull(f_value, f_message = null) {
    if (f_value !== null) {
      const q_msg = f_message || `Expected null, got ${JSON.stringify(f_value)}`;
      throw new Error(`Assertion failed: ${q_msg}`);
    }
  }

  /**
   * q_assertNotNull - Assert value is not null
   * @param {*} f_value - Value to check
   * @param {string} [f_message] - Error message
   */
  q_assertNotNull(f_value, f_message = null) {
    if (f_value === null) {
      const q_msg = f_message || `Expected non-null value`;
      throw new Error(`Assertion failed: ${q_msg}`);
    }
  }

  /**
   * q_assertThrows - Assert function throws an error
   * @param {Function} f_callback - Function to test
   * @param {string} [f_expected_message] - Expected error message
   */
  q_assertThrows(f_callback, f_expected_message = null) {
    let q_threw = false;
    let q_error = null;

    try {
      f_callback();
    } catch (e) {
      q_threw = true;
      q_error = e;
    }

    if (!q_threw) {
      throw new Error(`Assertion failed: Expected function to throw`);
    }

    if (f_expected_message && q_error.message !== f_expected_message) {
      throw new Error(`Assertion failed: Expected error message "${f_expected_message}", got "${q_error.message}"`);
    }
  }

  /**
   * q_assertRange - Assert value is within range
   * @param {number} f_value - Value to check
   * @param {number} f_min - Minimum value
   * @param {number} f_max - Maximum value
   * @param {string} [f_message] - Error message
   */
  q_assertRange(f_value, f_min, f_max, f_message = null) {
    if (f_value < f_min || f_value > f_max) {
      const q_msg = f_message || `Expected value between ${f_min} and ${f_max}, got ${f_value}`;
      throw new Error(`Assertion failed: ${q_msg}`);
    }
  }

  /**
   * q_assertType - Assert value is of expected type
   * @param {*} f_value - Value to check
   * @param {string} f_type - Expected type
   * @param {string} [f_message] - Error message
   */
  q_assertType(f_value, f_type, f_message = null) {
    const q_actual_type = typeof f_value;
    if (q_actual_type !== f_type) {
      const q_msg = f_message || `Expected type ${f_type}, got ${q_actual_type}`;
      throw new Error(`Assertion failed: ${q_msg}`);
    }
  }

  /**
   * q_assertInstanceOf - Assert value is instance of class
   * @param {*} f_value - Value to check
   * @param {Function} f_class - Expected class
   * @param {string} [f_message] - Error message
   */
  q_assertInstanceOf(f_value, f_class, f_message = null) {
    if (!(f_value instanceof f_class)) {
      const q_msg = f_message || `Expected instance of ${f_class.name}`;
      throw new Error(`Assertion failed: ${q_msg}`);
    }
  }

  /**
   * q_assertLength - Assert array/string has expected length
   * @param {Array|string} f_value - Value to check
   * @param {number} f_length - Expected length
   * @param {string} [f_message] - Error message
   */
  q_assertLength(f_value, f_length, f_message = null) {
    const q_actual_length = f_value.length;
    if (q_actual_length !== f_length) {
      const q_msg = f_message || `Expected length ${f_length}, got ${q_actual_length}`;
      throw new Error(`Assertion failed: ${q_msg}`);
    }
  }

  /**
   * q_assertContains - Assert array contains value
   * @param {Array} f_array - Array to check
   * @param {*} f_value - Value to find
   * @param {string} [f_message] - Error message
   */
  q_assertContains(f_array, f_value, f_message = null) {
    if (!f_array.includes(f_value)) {
      const q_msg = f_message || `Expected array to contain ${JSON.stringify(f_value)}`;
      throw new Error(`Assertion failed: ${q_msg}`);
    }
  }

  /**
   * q_assertCloseTo - Assert number is close to expected (within delta)
   * @param {number} f_actual - Actual value
   * @param {number} f_expected - Expected value
   * @param {number} f_delta - Allowed difference
   * @param {string} [f_message] - Error message
   */
  q_assertCloseTo(f_actual, f_expected, f_delta = 0.001, f_message = null) {
    const q_diff = Math.abs(f_actual - f_expected);
    if (q_diff > f_delta) {
      const q_msg = f_message || `Expected ${f_actual} to be within ${f_delta} of ${f_expected}`;
      throw new Error(`Assertion failed: ${q_msg}`);
    }
  }

  /**
   * q_skip - Skip a test
   * @param {string} f_reason - Reason for skipping
   */
  q_skip(f_reason = 'No reason provided') {
    console.log(`  ⊘ Test skipped: ${f_reason}`);
    throw new Error('SKIP');
  }

  /**
   * q_getResults - Get all test results
   * @returns {Array} Test results
   */
  q_getResults() {
    return this.q_results;
  }

  /**
   * q_clear - Clear all tests
   * @returns {RaBbLE_TestFramework} This framework for chaining
   */
  q_clear() {
    this.q_tests.clear();
    this.q_suites.clear();
    this.q_results = [];
    this.q_current_suite = null;
    return this;
  }
}

// Export for ES6 modules
export { RaBbLE_TestFramework };