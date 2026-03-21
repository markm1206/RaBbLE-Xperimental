/**
 * RaBbLE Test Runner - The Quantum Test Conductor
 * Orchestrates and runs all test suites in the Ai/tests directory
 * 
 * Usage:
 *   node Ai/tests/q_test_runner.js
 *   Or import and call q_runAllTests()
 */

import { RaBbLE_TestFramework } from '../TestFramework.js';
import { RaBbLE_MockFactory } from '../RaBbLE_MockFactory.js';

// Test suite imports
import { q_results as entityResults } from './q_entity_tests.js';
import { q_results as streamResults } from './q_stream_tests.js';
import { q_results as commandResults } from './q_command_tests.js';

/**
 * q_runAllTests - Execute all test suites and generate comprehensive report
 * @returns {Object} Combined test results
 */
function q_runAllTests() {
  console.log('\n' + '='.repeat(60));
  console.log('[RABBLE TEST RUNNER] Initiating Quantum Validation Suite');
  console.log('='.repeat(60));
  
  const q_start_time = performance.now();
  
  // Aggregate results from all test suites
  const q_all_results = [
    { suite: 'Entity Tests', results: entityResults },
    { suite: 'Stream Tests', results: streamResults },
    { suite: 'Command Tests', results: commandResults }
  ];
  
  let q_total_passed = 0;
  let q_total_failed = 0;
  let q_total_errors = 0;
  let q_total_tests = 0;
  
  // Process each suite
  q_all_results.forEach(q_suite => {
    if (q_suite.results) {
      q_total_passed += q_suite.results.passed || 0;
      q_total_failed += q_suite.results.failed || 0;
      q_total_errors += q_suite.results.errors || 0;
      q_total_tests += q_suite.results.total || 0;
    }
  });
  
  const q_end_time = performance.now();
  const q_duration = (q_end_time - q_start_time).toFixed(2);
  
  // Print comprehensive summary
  console.log('\n' + '='.repeat(60));
  console.log('[COMPREHENSIVE TEST RESULTS]');
  console.log('='.repeat(60));
  
  q_all_results.forEach(q_suite => {
    if (q_suite.results) {
      const q_status = q_suite.results.success ? '✓ PASS' : '✗ FAIL';
      console.log(`\n${q_suite.suite}: ${q_status}`);
      console.log(`  Total: ${q_suite.results.total || 0}`);
      console.log(`  Passed: ${q_suite.results.passed || 0}`);
      console.log(`  Failed: ${q_suite.results.failed || 0}`);
      console.log(`  Errors: ${q_suite.results.errors || 0}`);
    }
  });
  
  console.log('\n' + '-'.repeat(60));
  console.log('[AGGREGATE RESULTS]');
  console.log(`  Total Tests: ${q_total_tests}`);
  console.log(`  Passed: ${q_total_passed}`);
  console.log(`  Failed: ${q_total_failed}`);
  console.log(`  Errors: ${q_total_errors}`);
  console.log(`  Duration: ${q_duration}ms`);
  console.log(`  Success Rate: ${q_total_tests > 0 ? ((q_total_passed / q_total_tests) * 100).toFixed(1) : 0}%`);
  console.log('='.repeat(60));
  
  const q_success = q_total_failed === 0 && q_total_errors === 0;
  
  if (q_success) {
    console.log('\n✓ ALL TESTS PASSED - The quantum validation is complete!');
  } else {
    console.log('\n✗ SOME TESTS FAILED - Review the failures above.');
  }
  
  return {
    suites: q_all_results,
    aggregate: {
      total: q_total_tests,
      passed: q_total_passed,
      failed: q_total_failed,
      errors: q_total_errors,
      duration: q_duration,
      success_rate: q_total_tests > 0 ? ((q_total_passed / q_total_tests) * 100).toFixed(1) : 0,
      success: q_success
    }
  };
}

/**
 * q_runSingleSuite - Run a specific test suite
 * @param {string} f_suite_name - Name of the suite to run
 * @returns {Object} Suite results
 */
function q_runSingleSuite(f_suite_name) {
  console.log(`\n[RUNNING SUITE] ${f_suite_name}\n`);
  
  switch (f_suite_name.toLowerCase()) {
    case 'entity':
    case 'entities':
      console.log('Running Entity Tests...');
      return { suite: 'Entity Tests', results: entityResults };
      
    case 'stream':
    case 'streams':
      console.log('Running Stream Tests...');
      return { suite: 'Stream Tests', results: streamResults };
      
    case 'command':
    case 'commands':
      console.log('Running Command Tests...');
      return { suite: 'Command Tests', results: commandResults };
      
    default:
      console.error(`Unknown suite: ${f_suite_name}`);
      return { error: 'Suite not found' };
  }
}

/**
 * q_generateTestReport - Generate a formatted test report
 * @param {Object} f_results - Test results
 * @returns {string} Formatted report
 */
function q_generateTestReport(f_results) {
  let q_report = '';
  
  q_report += '# RaBbLE Test Report\n\n';
  q_report += `Generated: ${new Date().toISOString()}\n\n`;
  
  if (f_results.aggregate) {
    q_report += '## Summary\n\n';
    q_report += `- Total Tests: ${f_results.aggregate.total}\n`;
    q_report += `- Passed: ${f_results.aggregate.passed}\n`;
    q_report += `- Failed: ${f_results.aggregate.failed}\n`;
    q_report += `- Errors: ${f_results.aggregate.errors}\n`;
    q_report += `- Duration: ${f_results.aggregate.duration}ms\n`;
    q_report += `- Success Rate: ${f_results.aggregate.success_rate}%\n\n`;
  }
  
  if (f_results.suites) {
    q_report += '## Test Suites\n\n';
    f_results.suites.forEach(q_suite => {
      if (q_suite.results) {
        q_report += `### ${q_suite.suite}\n\n`;
        q_report += `- Status: ${q_suite.results.success ? 'PASS' : 'FAIL'}\n`;
        q_report += `- Tests: ${q_suite.results.total}\n`;
        q_report += `- Passed: ${q_suite.results.passed}\n`;
        q_report += `- Failed: ${q_suite.results.failed}\n\n`;
      }
    });
  }
  
  return q_report;
}

// Export functions for use in other modules
export { 
  q_runAllTests, 
  q_runSingleSuite, 
  q_generateTestReport 
};

// Run tests if this file is executed directly
if (typeof process !== 'undefined' && process.argv && process.argv[1] && process.argv[1].includes('q_test_runner')) {
  const q_results = q_runAllTests();
  
  // Exit with appropriate code
  if (typeof process !== 'undefined' && process.exit) {
    process.exit(q_results.aggregate.success ? 0 : 1);
  }
}