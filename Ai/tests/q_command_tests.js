/**
 * BaBbLE Command Unit Tests - The Quantum Command Proving Grounds
 * Validates the pipeline pattern with dependency injection
 */

import { RaBbLE_TestFramework } from '../TestFramework.js';
import { RaBbLE_MockFactory } from '../RaBbLE_MockFactory.js';
import { RABBLE_CONFIG } from '../RaBbLE_Config.js';
import { RaBbLE_DependencyContainer } from '../RaBbLE_DependencyContainer.js';

// Create test framework instance
const q_test = new RaBbLE_TestFramework({ verbose: true });

// Create mock factory
const q_factory = new RaBbLE_MockFactory({ recording: true });

// ==========================================
// TEST SUITE: Command Pipeline Pattern
// ==========================================
q_test.q_startSuite('Command Pipeline Pattern');

q_test.q_addTest('mock command executes pipeline stages', () => {
  const q_command = q_factory.q_createMockCommand('test', (args) => {
    return `[TEST] Executed with: ${args.join(' ')}`;
  });
  
  const q_result = q_command.q_execute(['arg1', 'arg2']);
  
  q_test.q_assertTrue(q_result.includes('[TEST]'));
  q_test.q_assertTrue(q_result.includes('arg1'));
}, 'Command Pipeline Pattern');

q_test.q_addTest('command matches by name', () => {
  const q_command = q_factory.q_createMockCommand('dream');
  
  q_test.q_assertTrue(q_command.q_matches('dream'));
  q_test.q_assertTrue(q_command.q_matches('DREAM'));
  q_test.q_assertFalse(q_command.q_matches('stream'));
}, 'Command Pipeline Pattern');

q_test.q_addTest('command help returns formatted string', () => {
  const q_command = q_factory.q_createMockCommand('test');
  
  const q_help = q_command.q_extractHelp();
  
  q_test.q_assertTrue(q_help.includes('test'));
}, 'Command Pipeline Pattern');

q_test.q_endSuite();

// ==========================================
// TEST SUITE: Dependency Container
// ==========================================
q_test.q_startSuite('Dependency Container');

q_test.q_addTest('container registers and resolves dependencies', () => {
  const q_container = new RaBbLE_DependencyContainer();
  const q_mock_engine = q_factory.q_createMockEngine();
  
  q_container.q_register('engine', q_mock_engine);
  const q_resolved = q_container.q_resolve('engine');
  
  q_test.q_assertEqual(q_resolved, q_mock_engine);
}, 'Dependency Container');

q_test.q_addTest('container detects circular dependencies', () => {
  const q_container = new RaBbLE_DependencyContainer();
  
  q_container.q_registerFactory('a', () => q_container.q_resolve('b'));
  q_container.q_registerFactory('b', () => q_container.q_resolve('a'));
  
  q_test.q_assertThrows(() => {
    q_container.q_resolve('a');
  }, 'Circular dependency detected: b');
}, 'Dependency Container');

q_test.q_addTest('container caches singletons', () => {
  const q_container = new RaBbLE_DependencyContainer();
  let q_call_count = 0;
  
  q_container.q_registerFactory('service', () => {
    q_call_count++;
    return { id: q_call_count };
  });
  
  const q_first = q_container.q_resolve('service');
  const q_second = q_container.q_resolve('service');
  
  q_test.q_assertEqual(q_first, q_second);
  q_test.q_assertEqual(q_call_count, 1);
}, 'Dependency Container');

q_test.q_addTest('container creates child containers', () => {
  const q_parent = new RaBbLE_DependencyContainer();
  q_parent.q_registerValue('config', { theme: 'dark' });
  
  const q_child = q_parent.q_createChild();
  q_child.q_registerValue('extra', { mode: 'advanced' });
  
  q_test.q_assertTrue(q_child.q_has('config'));
  q_test.q_assertTrue(q_child.q_has('extra'));
  q_test.q_assertFalse(q_parent.q_has('extra'));
}, 'Dependency Container');

q_test.q_addTest('container extracts statistics', () => {
  const q_container = new RaBbLE_DependencyContainer();
  q_container.q_registerValue('a', 1);
  q_container.q_registerValue('b', 2);
  q_container.q_registerFactory('c', () => 3);
  
  const q_stats = q_container.q_extractStats();
  
  q_test.q_assertEqual(q_stats.total, 3);
}, 'Dependency Container');

q_test.q_endSuite();

// ==========================================
// TEST SUITE: Configuration Constants
// ==========================================
q_test.q_startSuite('Configuration Constants');

q_test.q_addTest('config has entropy constants', () => {
  q_test.q_assertNotNull(RABBLE_CONFIG.ENTROPY);
  q_test.q_assertRange(RABBLE_CONFIG.ENTROPY.DEFAULT_INTENSITY, 0, 1);
  q_test.q_assertRange(RABBLE_CONFIG.ENTROPY.MIN_INTENSITY, 0, 1);
}, 'Configuration Constants');

q_test.q_addTest('config has stream constants', () => {
  q_test.q_assertNotNull(RABBLE_CONFIG.STREAM);
  q_test.q_assertTrue(RABBLE_CONFIG.STREAM.MAX_ENTITIES > 0);
  q_test.q_assertTrue(RABBLE_CONFIG.STREAM.MIN_ENTITIES >= 0);
}, 'Configuration Constants');

q_test.q_addTest('config has animation constants', () => {
  q_test.q_assertNotNull(RABBLE_CONFIG.ANIMATION);
  q_test.q_assertNotNull(RABBLE_CONFIG.ANIMATION.BLINK);
  q_test.q_assertRange(RABBLE_CONFIG.ANIMATION.BLINK.CYCLE_HORIZON, 0, 10);
}, 'Configuration Constants');

q_test.q_addTest('config has command constants', () => {
  q_test.q_assertNotNull(RABBLE_CONFIG.COMMANDS);
  q_test.q_assertNotNull(RABBLE_CONFIG.COMMANDS.DREAM);
  q_test.q_assertTrue(RABBLE_CONFIG.COMMANDS.DREAM.MAX_ENTITIES > 0);
}, 'Configuration Constants');

q_test.q_addTest('config validation helpers work', () => {
  const q_range_error = RABBLE_CONFIG.q_validateRange(1.5, 0, 1, 'test');
  q_test.q_assertNotNull(q_range_error);
  
  const q_valid = RABBLE_CONFIG.q_validateRange(0.5, 0, 1, 'test');
  q_test.q_assertNull(q_valid);
}, 'Configuration Constants');

q_test.q_endSuite();

// ==========================================
// TEST SUITE: Mock Factory Recording
// ==========================================
q_test.q_startSuite('Mock Factory Recording');

q_test.q_addTest('factory records method calls', () => {
  const q_mock = q_factory.q_createMockEngine();
  q_factory.q_resetRecording();
  
  q_mock.createOrganicStream(10, 'SPHERE');
  
  q_test.q_assertTrue(q_factory.q_wasMethodCalled('createOrganicStream'));
  q_test.q_assertEqual(q_factory.q_getCallCount('createOrganicStream'), 1);
}, 'Mock Factory Recording');

q_test.q_addTest('factory records multiple calls', () => {
  const q_mock = q_factory.q_createMockEngine();
  q_factory.q_resetRecording();
  
  q_mock.createOrganicStream(10, 'SPHERE');
  q_mock.createOrganicStream(20, 'BOX');
  q_mock.createOrganicStream(30, 'TETRAHEDRON');
  
  q_test.q_assertEqual(q_factory.q_getCallCount('createOrganicStream'), 3);
}, 'Mock Factory Recording');

q_test.q_addTest('factory gets calls for specific method', () => {
  const q_mock = q_factory.q_createMockEngine();
  q_factory.q_resetRecording();
  
  q_mock.createOrganicStream(10, 'SPHERE');
  q_mock.start();
  q_mock.createOrganicStream(20, 'BOX');
  
  const q_calls = q_factory.q_getCallsForMethod('createOrganicStream');
  
  q_test.q_assertLength(q_calls, 2);
}, 'Mock Factory Recording');

q_test.q_endSuite();

// ==========================================
// TEST SUITE: Command with DI
// ==========================================
q_test.q_startSuite('Command with DI');

q_test.q_addTest('command receives engine via injection', () => {
  const q_container = new RaBbLE_DependencyContainer();
  const q_mock_engine = q_factory.q_createMockEngine();
  q_container.q_register('engine', q_mock_engine);
  
  // Simulate a command that uses injected engine
  class TestCommand {
    constructor(engine) {
      this.q_engine = engine;
    }
    
    q_execute(args) {
      const stream = this.q_engine.createOrganicStream(parseInt(args[0]) || 10);
      return `Created stream with ${stream.q_length} entities`;
    }
  }
  
  const q_command = new TestCommand(q_container.q_resolve('engine'));
  const q_result = q_command.q_execute(['5']);
  
  q_test.q_assertTrue(q_result.includes('5'));
}, 'Command with DI');

q_test.q_addTest('command can use mock engine for testing', () => {
  const q_mock_engine = q_factory.q_createMockEngine({ recording: true });
  q_factory.q_resetRecording();
  
  // Simulate command execution
  q_mock_engine.createOrganicStream(25, 'SPHERE');
  
  q_test.q_assertTrue(q_factory.q_wasMethodCalled('createOrganicStream'));
  
  const q_calls = q_factory.q_getCallsForMethod('createOrganicStream');
  q_test.q_assertEqual(q_calls[0].args.count, 25);
}, 'Command with DI');

q_test.q_endSuite();

// ==========================================
// RUN ALL TESTS
// ==========================================
const q_results = q_test.q_runAll();

// Export results for test runner integration
export { q_results };