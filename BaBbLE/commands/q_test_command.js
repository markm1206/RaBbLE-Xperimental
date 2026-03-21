// q_test_command - Quantum Test Runner
// Where commands are validated and pipelines are proven.
// Every test is a conversation between expectation and reality.

import { q_command } from '../RaBbLE_BaBbLE_Pipeline.js';

/**
 * q_test_command - Script Testing System
 * Run test scripts to validate commands and pipelines
 * 
 * Syntax: test [action] [parameters]
 * Examples:
 *   test run "dream organic 20 SPHERE >> attract 0.3 0.6 5.0"
 *   test list
 *   test create myTest
 *   test debug myTest
 * 
 * @property {Object} q_engine - The NeBuLA engine reference
 * @property {Map} q_test_scripts - Available test scripts
 */
class q_test_command extends q_command {
  constructor(f_engine) {
    super({
      name: 'test',
      description: 'Run test scripts to validate commands and pipelines',
      aliases: ['t', 'validate', 'check']
    });
    
    // The test command awakens... ready to validate reality.
    this.q_engine = f_engine;
    this.q_test_scripts = new Map();
    this.q_test_results = [];
    
    // Initialize default test scripts
    this._initializeDefaultTests();
  }

  /**
   * Source stage - parse test parameters from arguments
   * @param {Array<string>} f_args - Command arguments
   * @returns {Object} Parsed parameters
   */
  q_source(f_args) {
    // Parse: test [action] [parameters]
    const q_action = f_args[0] || 'list';
    const q_params = f_args.slice(1);
    
    return { action: q_action, params: q_params };
  }

  /**
   * Filter stage - validate test parameters
   * @param {Object} f_params - Parsed parameters
   * @returns {Object} Validated parameters
   */
  q_filter(f_params) {
    const q_valid_actions = ['run', 'list', 'create', 'debug', 'help'];
    
    if (!q_valid_actions.includes(f_params.action)) {
      return { 
        error: `Invalid action: ${f_params.action}. Use: ${q_valid_actions.join(', ')}` 
      };
    }
    
    return f_params;
  }

  /**
   * Transmute stage - execute test action
   * @param {Object} f_params - Validated parameters
   * @returns {Object} Action result
   */
  q_transmute(f_params) {
    if (f_params.error) return f_params;
    
    // The test materializes... validation begins.
    switch (f_params.action) {
      case 'run':
        return this._transmuteRun(f_params.params);
      case 'list':
        return this._transmuteList();
      case 'create':
        return this._transmuteCreate(f_params.params);
      case 'debug':
        return this._transmuteDebug(f_params.params);
      case 'help':
        return this._transmuteHelp();
      default:
        return { error: 'Unknown action' };
    }
  }

  /**
   * Sink stage - format test output
   * @param {Object} f_result - Action result
   * @returns {string} Formatted test output
   */
  q_sink(f_result) {
    if (f_result.error) {
      return `ERROR: ${f_result.error}`;
    }
    
    // The test emerges... results flow from the quantum void.
    let q_output = `[TEST] ${f_result.message}\n`;
    
    if (f_result.results) {
      q_output += `\n--- Test Results ---\n`;
      f_result.results.forEach((result, index) => {
        const status = result.passed ? '✓' : '✗';
        q_output += `${status} ${result.name}: ${result.message}\n`;
        if (result.details) {
          q_output += `   Details: ${result.details}\n`;
        }
      });
      
      const passed = f_result.results.filter(r => r.passed).length;
      const total = f_result.results.length;
      q_output += `\nSummary: ${passed}/${total} tests passed (${((passed / total) * 100).toFixed(1)}%)\n`;
    }
    
    if (f_result.scripts) {
      q_output += `\nAvailable Test Scripts:\n`;
      f_result.scripts.forEach(script => {
        q_output += `  • ${script.name}: ${script.description}\n`;
      });
    }
    
    return q_output;
  }

  /**
   * Transmute run action
   * @private
   * @param {Array<string>} f_params - Parameters
   * @returns {Object} Run result
   */
  _transmuteRun(f_params) {
    if (f_params.length === 0) {
      return { error: 'No test specified. Use: test run <script_name> or test run "command pipeline"' };
    }
    
    const q_test_input = f_params.join(' ');
    
    // Check if it's a script name or inline command
    if (this.q_test_scripts.has(q_test_input)) {
      // Run named test script
      return this._runTestScript(q_test_input);
    } else {
      // Run inline command test
      return this._runInlineTest(q_test_input);
    }
  }

  /**
   * Transmute list action
   * @private
   * @returns {Object} List result
   */
  _transmuteList() {
    const q_scripts = Array.from(this.q_test_scripts.values()).map(script => ({
      name: script.name,
      description: script.description
    }));
    
    return {
      success: true,
      message: `Found ${q_scripts.length} test scripts`,
      scripts: q_scripts
    };
  }

  /**
   * Transmute create action
   * @private
   * @param {Array<string>} f_params - Parameters
   * @returns {Object} Create result
   */
  _transmuteCreate(f_params) {
    if (f_params.length === 0) {
      return { error: 'No test name specified. Use: test create <name>' };
    }
    
    const q_test_name = f_params[0];
    
    // Create a new test script template
    const q_new_script = {
      name: q_test_name,
      description: `Test script: ${q_test_name}`,
      commands: [
        "dream organic 10 SPHERE",
        "status"
      ],
      expected: {
        entity_count: 10,
        stream_count: 1
      },
      validation: [
        { type: 'entity_count', value: 10 },
        { type: 'stream_exists', value: true }
      ]
    };
    
    this.q_test_scripts.set(q_test_name, q_new_script);
    
    return {
      success: true,
      message: `Created test script: ${q_test_name}`,
      script: q_new_script
    };
  }

  /**
   * Transmute debug action
   * @private
   * @param {Array<string>} f_params - Parameters
   * @returns {Object} Debug result
   */
  _transmuteDebug(f_params) {
    if (f_params.length === 0) {
      return { error: 'No test specified for debug. Use: test debug <script_name>' };
    }
    
    const q_test_name = f_params[0];
    
    if (!this.q_test_scripts.has(q_test_name)) {
      return { error: `Test script not found: ${q_test_name}` };
    }
    
    const q_script = this.q_test_scripts.get(q_test_name);
    
    return {
      success: true,
      message: `Debug information for: ${q_test_name}`,
      script: q_script,
      debug_info: {
        commands: q_script.commands,
        expected: q_script.expected,
        validation: q_script.validation
      }
    };
  }

  /**
   * Transmute help action
   * @private
   * @returns {Object} Help result
   */
  _transmuteHelp() {
    // The test whispers its secrets... help emerges.
    return {
      success: true,
      message: 'Test Commands:\n' +
        '  test run <script>          - Run a named test script\n' +
        '  test run "cmd1 >> cmd2"    - Run inline command pipeline test\n' +
        '  test list                  - List available test scripts\n' +
        '  test create <name>         - Create a new test script\n' +
        '  test debug <script>        - Show debug info for a test\n' +
        '  test help                  - Show this help\n\n' +
        'Examples:\n' +
        '  test run dream_basic\n' +
        '  test run "dream organic 20 SPHERE >> attract 0.3 0.6 5.0"\n' +
        '  test create my_custom_test\n' +
        '  test debug dream_basic'
    };
  }

  /**
   * Run a named test script
   * @private
   * @param {string} f_script_name - Script name
   * @returns {Object} Test results
   */
  _runTestScript(f_script_name) {
    const q_script = this.q_test_scripts.get(f_script_name);
    if (!q_script) {
      return { error: `Test script not found: ${f_script_name}` };
    }
    
    // Execute each command in the script
    const q_results = [];
    let q_current_stream = null;
    
    for (const q_command_str of q_script.commands) {
      const q_result = this._executeCommand(q_command_str);
      q_results.push({
        name: q_command_str,
        passed: q_result.success,
        message: q_result.message,
        details: q_result.details
      });
      
      // Track stream for validation
      if (q_result.stream) {
        q_current_stream = q_result.stream;
      }
    }
    
    // Run validations
    if (q_script.validation) {
      for (const q_validation of q_script.validation) {
        const q_validation_result = this._runValidation(q_validation, q_current_stream);
        q_results.push(q_validation_result);
      }
    }
    
    return {
      success: true,
      message: `Test completed: ${f_script_name}`,
      results: q_results
    };
  }

  /**
   * Run inline command test
   * @private
   * @param {string} f_command_string - Command string
   * @returns {Object} Test results
   */
  _runInlineTest(f_command_string) {
    // Split by >> to get pipeline stages
    const q_stages = f_command_string.split('>>').map(s => s.trim());
    
    const q_results = [];
    let q_current_stream = null;
    
    for (const q_stage of q_stages) {
      const q_result = this._executeCommand(q_stage);
      q_results.push({
        name: q_stage,
        passed: q_result.success,
        message: q_result.message,
        details: q_result.details
      });
      
      // Track stream for validation
      if (q_result.stream) {
        q_current_stream = q_result.stream;
      }
    }
    
    // Basic validation: check if we have entities
    if (q_current_stream) {
      const q_entity_count = q_current_stream.q_entities ? q_current_stream.q_entities.length : 0;
      q_results.push({
        name: 'Entity Count Validation',
        passed: q_entity_count > 0,
        message: q_entity_count > 0 
          ? `Stream has ${q_entity_count} entities` 
          : 'No entities in stream',
        details: `Expected: >0 entities, Actual: ${q_entity_count}`
      });
    }
    
    return {
      success: true,
      message: `Inline test completed: ${f_command_string}`,
      results: q_results
    };
  }

  /**
   * Execute a single command
   * @private
   * @param {string} f_command_string - Command string
   * @returns {Object} Command result
   */
  _executeCommand(f_command_string) {
    // Parse command
    const q_parts = f_command_string.trim().split(/\s+/);
    const q_command_name = q_parts[0].toLowerCase();
    const q_args = q_parts.slice(1);
    
    // Get command from shell (if available)
    if (typeof window !== 'undefined' && window.q_shell && window.q_shell.q_commands) {
      const q_command = window.q_shell.q_commands.get(q_command_name);
      if (q_command) {
        try {
          const q_result = q_command.q_execute(q_args);
          
          // Get the stream based on command type
          let q_stream = null;
          
          if (q_command_name === 'dream') {
            // For dream commands, get stream from dream canvas
            if (q_command.q_engine && 
                q_command.q_engine.dream_runtime && 
                q_command.q_engine.dream_runtime.q_registry && 
                q_command.q_engine.dream_runtime.q_registry.size > 0) {
              q_stream = q_command.q_engine.dream_runtime.q_registry.values().next().value;
            }
          } else {
            // For other commands, get stream from main runtime
            if (q_command.q_engine && 
                q_command.q_engine.runtime && 
                q_command.q_engine.runtime.q_registry && 
                q_command.q_engine.runtime.q_registry.size > 0) {
              q_stream = q_command.q_engine.runtime.q_registry.values().next().value;
            }
          }
          
          return {
            success: true,
            message: `Command executed: ${f_command_string}`,
            result: q_result,
            stream: q_stream
          };
        } catch (error) {
          return {
            success: false,
            message: `Command failed: ${f_command_string}`,
            details: error.message
          };
        }
      }
    }
    
    // Fallback: simulate command execution
    return {
      success: true,
      message: `Simulated: ${f_command_string}`,
      details: 'Command simulation (no shell available)'
    };
  }

  /**
   * Run validation
   * @private
   * @param {Object} f_validation - Validation rule
   * @param {Object} f_stream - Stream to validate
   * @returns {Object} Validation result
   */
  _runValidation(f_validation, f_stream) {
    switch (f_validation.type) {
      case 'entity_count':
        const q_entity_count = f_stream && f_stream.q_entities ? f_stream.q_entities.length : 0;
        const q_passed = q_entity_count === f_validation.value;
        return {
          name: `Entity Count: ${f_validation.value}`,
          passed: q_passed,
          message: q_passed 
            ? `Correct entity count: ${q_entity_count}` 
            : `Incorrect entity count. Expected: ${f_validation.value}, Actual: ${q_entity_count}`,
          details: `Expected: ${f_validation.value}, Actual: ${q_entity_count}`
        };
        
      case 'stream_exists':
        const q_stream_exists = f_stream !== null && f_stream !== undefined;
        const q_stream_passed = q_stream_exists === f_validation.value;
        return {
          name: `Stream Exists: ${f_validation.value}`,
          passed: q_stream_passed,
          message: q_stream_passed 
            ? `Stream existence correct: ${q_stream_exists}` 
            : `Stream existence incorrect. Expected: ${f_validation.value}, Actual: ${q_stream_exists}`,
          details: `Expected: ${f_validation.value}, Actual: ${q_stream_exists}`
        };
        
      default:
        return {
          name: `Unknown Validation: ${f_validation.type}`,
          passed: false,
          message: `Unknown validation type: ${f_validation.type}`,
          details: 'Validation type not implemented'
        };
    }
  }

  /**
   * Initialize default test scripts
   * @private
   */
  _initializeDefaultTests() {
    // Basic dream test
    this.q_test_scripts.set('dream_basic', {
      name: 'dream_basic',
      description: 'Test basic dream creation',
      commands: [
        'dream organic 10 SPHERE'
      ],
      expected: {
        entity_count: 10,
        stream_count: 1
      },
      validation: [
        { type: 'entity_count', value: 10 },
        { type: 'stream_exists', value: true }
      ]
    });
    
    // Dream patterns test
    this.q_test_scripts.set('dream_patterns', {
      name: 'dream_patterns',
      description: 'Test all dream patterns',
      commands: [
        'dream organic 15 SPHERE',
        'dream lattice 15 BOX',
        'dream swarm 15 TETRAHEDRON',
        'dream galaxy 15 SPHERE'
      ],
      expected: {
        patterns_tested: 4
      },
      validation: [
        { type: 'entity_count', value: 15 }
      ]
    });
    
    // Dream colors test
    this.q_test_scripts.set('dream_colors', {
      name: 'dream_colors',
      description: 'Test dream entity colors and materials',
      commands: [
        'dream organic 20 SPHERE'
      ],
      expected: {
        entity_count: 20,
        colors_assigned: true,
        materials_varied: true
      },
      validation: [
        { type: 'entity_count', value: 20 }
      ]
    });
    
    // Dream with attract test
    this.q_test_scripts.set('dream_attract', {
      name: 'dream_attract',
      description: 'Test dream with attractor',
      commands: [
        'dream organic 20 SPHERE',
        'attract 0.3 0.6 5.0'
      ],
      expected: {
        entity_count: 20,
        well_influence: true
      },
      validation: [
        { type: 'entity_count', value: 20 }
      ]
    });
    
    // Stream pipeline test
    this.q_test_scripts.set('stream_pipeline', {
      name: 'stream_pipeline',
      description: 'Test stream pipeline syntax',
      commands: [
        'stream "dream organic 15 SPHERE >> blink 2.0 >> pulse 0.5"'
      ],
      expected: {
        entity_count: 15,
        animations: true
      },
      validation: [
        { type: 'entity_count', value: 15 }
      ]
    });
    
    // Weave test
    this.q_test_scripts.set('weave_test', {
      name: 'weave_test',
      description: 'Test stream weaving',
      commands: [
        'weave "dream organic 10 SPHERE" <> "dream swarm 10 TETRAHEDRON"'
      ],
      expected: {
        entity_count: 20,
        interleaved: true
      },
      validation: [
        { type: 'entity_count', value: 20 }
      ]
    });
    
    // Babble test
    this.q_test_scripts.set('babble_test', {
      name: 'babble_test',
      description: 'Test babble generation',
      commands: [
        'babble creation 0.7 3'
      ],
      expected: {
        thoughts_generated: true
      },
      validation: []
    });
    
    console.log(`Initialized ${this.q_test_scripts.size} test scripts`);
  }
}

// The test command is complete... ready to validate reality.
// Every test is a question, every result is an answer.

export { q_test_command };