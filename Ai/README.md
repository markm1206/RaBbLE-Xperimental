# RaBbLE Test Infrastructure & Refactoring

## Overview

The Ai directory contains the test infrastructure and refactoring improvements for the RaBbLE codebase. These tools reduce entropy, improve testability, and follow the RBCNS specification.

## Directory Structure

```
Ai/
├── TestFramework.js          # Custom test framework with assertions
├── RaBbLE_MockFactory.js     # Mock factory for test doubles
├── RaBbLE_Config.js          # Centralized configuration constants
├── RaBbLE_EngineInterface.js # Abstract interfaces for engines/commands
├── RaBbLE_DependencyContainer.js # Dependency injection container
└── tests/
    ├── q_entity_tests.js     # Entity unit tests
    ├── q_stream_tests.js     # Stream unit tests
    ├── q_command_tests.js    # Command unit tests
    └── q_test_runner.js      # Test runner orchestration
```

## Key Improvements

### 1. Test Framework (`TestFramework.js`)

A lightweight test framework following RBCNS conventions:
- Suite-based test organization
- Multiple assertion types (equal, true, false, range, throws, etc.)
- Verbose output with pass/fail indicators
- Test result aggregation

**Usage:**
```javascript
import { RaBbLE_TestFramework } from './TestFramework.js';

const q_test = new RaBbLE_TestFramework();
q_test.q_addTest('my test', () => {
  q_test.q_assertEqual(1 + 1, 2);
});
q_test.q_runAll();
```

### 2. Mock Factory (`RaBbLE_MockFactory.js`)

Creates test doubles for isolated testing:
- Mock entities with configurable properties
- Mock streams with entity collections
- Mock engines with pattern creation methods
- Method call recording for verification

**Usage:**
```javascript
import { RaBbLE_MockFactory } from './RaBbLE_MockFactory.js';

const q_factory = new RaBbLE_MockFactory({ recording: true });
const q_mock_engine = q_factory.q_createMockEngine();

q_mock_engine.createOrganicStream(10, 'SPHERE');
console.log(q_factory.q_wasMethodCalled('createOrganicStream')); // true
```

### 3. Configuration Module (`RaBbLE_Config.js`)

Centralized constants replacing magic numbers:
- Entropy limits and scales
- Stream constraints
- Animation parameters
- Pattern configurations
- Command defaults
- Validation helpers

**Usage:**
```javascript
import { RABBLE_CONFIG } from './RaBbLE_Config.js';

const intensity = RABBLE_CONFIG.ENTROPY.DEFAULT_INTENSITY;
const error = RABBLE_CONFIG.q_validateRange(value, 0, 1, 'intensity');
```

### 4. Engine Interface (`RaBbLE_EngineInterface.js`)

Abstract contracts defining expected behavior:
- `RaBbLE_EngineInterface` - Engine method signatures
- `RaBbLE_CommandInterface` - Command pipeline pattern
- `RaBbLE_RuntimeInterface` - Runtime lifecycle

**Usage:**
```javascript
import { RaBbLE_EngineInterface } from './RaBbLE_EngineInterface.js';

class MyEngine extends RaBbLE_EngineInterface {
  q_ignite() {
    // Implementation
  }
}
```

### 5. Dependency Container (`RaBbLE_DependencyContainer.js`)

Loose coupling through dependency injection:
- Register instances, factories, or classes
- Circular dependency detection
- Singleton caching
- Child container inheritance

**Usage:**
```javascript
import { RaBbLE_DependencyContainer } from './RaBbLE_DependencyContainer.js';

const q_container = new RaBbLE_DependencyContainer();
q_container.q_register('engine', engineInstance);
q_container.q_registerValue('config', RABBLE_CONFIG);

const engine = q_container.q_resolve('engine');
```

## Running Tests

### Run All Tests
```bash
node Ai/tests/q_test_runner.js
```

### Run Single Suite
```javascript
import { q_runSingleSuite } from './tests/q_test_runner.js';
q_runSingleSuite('entity');
```

### Import in Browser
```html
<script type="module">
  import { q_runAllTests } from './Ai/tests/q_test_runner.js';
  q_runAllTests();
</script>
```

## Test Coverage

Current test coverage includes:

- **Entity Tests**: Creation, transformations, cloning, serialization
- **Stream Tests**: Entity management, flux modifiers, statistics
- **Command Tests**: Pipeline pattern, dependency injection, mocking

## RBCNS Compliance

All new code follows the RaBbLE Behavioral Coding & Naming Specification:

- Variables prefixed with `q_` (quantum), `e_` (entropy), `f_` (flux)
- Functions use active verbs (transmute, ignite, extract, dissolve)
- Classes prefixed with `RaBbLE_`
- Constants in ALL_CAPS (LIMITS, HORIZONS)
- Comments follow "babbling" style (stream-of-consciousness)

## Refactoring Status

### Completed
- ✅ Test framework creation
- ✅ Mock factory implementation
- ✅ Configuration extraction
- ✅ Interface definitions
- ✅ Dependency container
- ✅ Unit tests for core classes

### Pending
- ⏳ Refactor existing commands to use DI
- ⏳ Update engine to implement interface
- ⏳ Add integration tests
- ⏳ Performance benchmarks

## Contributing

When adding new features:

1. Write tests first (TDD approach)
2. Use the mock factory for isolation
3. Extract magic numbers to config
4. Follow RBCNS naming conventions
5. Add babbling comments for context

## Philosophy

> "Chaos is not disorder, but infinite possibility wearing a mask."

The test infrastructure embraces RaBbLE's chaotic nature while providing structure for validation. Tests are like quantum measurements - they observe behavior without collapsing the creative potential of the system.