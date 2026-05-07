# RaBbLE Nebula Renderer - Examples

This directory contains RBCNS-compliant examples and performance testing tools for the RaBbLE Nebula Renderer.

## 🚀 Quick Start

### Basic Usage

```html
<!DOCTYPE html>
<html>
<head>
    <title>RaBbLE Nebula Example</title>
    <link rel="stylesheet" href="../dist/rabble-nebula.css">
</head>
<body>
    <div id="container"></div>
    
    <script type="module">
        import { RaBbLE_Nebula_Engine } from '../dist/rabble-nebula.js';
        
        const engine = new RaBbLE_Nebula_Engine('#container');
        engine.createOrganicStream(50, 'SPHERE');
        engine.start();
    </script>
</body>
</html>
```

## 📁 File Structure

```
examples/
├── index.html              # Main interactive example
├── example.js             # Example module with all patterns
├── performance.html       # Performance testing suite
├── performance.js         # Performance testing framework
├── README.md             # This file
└── patterns.js           # Pattern demonstration module
```

## 🎨 Interactive Example (`index.html`)

The main example demonstrates all RaBbLE Nebula patterns with interactive controls:

### Features
- **Pattern Streams**: Organic, Lattice, Swarm, Galaxy
- **Stream Management**: Combine, clear, toggle chaos
- **Performance Controls**: Add/remove entities, toggle stats
- **Real-time Monitoring**: FPS, entity count, stream count

### Controls
- **Pattern Buttons**: Create different stream types
- **Stream Management**: Combine multiple streams
- **Performance**: Add/remove entities dynamically
- **Chaos Toggle**: Adjust entropy levels

## 🧪 Performance Testing (`performance.html`)

Comprehensive performance testing and benchmarking suite:

### Test Types
1. **Entity Count Test**: Maximum entity capacity
2. **Pattern Stability Test**: Long-term pattern coherence
3. **Memory Usage Test**: Memory consumption and leak detection
4. **FPS Performance Test**: Frame rate under various loads
5. **Chaos Bounds Test**: Entropy bounds and Flat-Chaos validation

### Usage
```javascript
import { RaBbLE_Nebula_Performance_Test } from './performance.js';

const performanceTest = new RaBbLE_Nebula_Performance_Test('#container');
const report = await performanceTest.runAllTests();
```

## 📊 Pattern Examples

### Organic Flow Pattern
```javascript
const organic = engine.createOrganicStream(40, 'SPHERE');
// Demonstrates organic growth with entropy-based movement
```

### Lattice Grid Pattern
```javascript
const lattice = engine.createLatticeStream(25, 'BOX');
// Shows geometric stability with minimal entropy
```

### Swarm Intelligence Pattern
```javascript
const swarm = engine.createSwarmStream(60, 'TETRAHEDRON');
// Demonstrates chaotic behavior within Flat-Chaos bounds
```

### Galaxy Spiral Pattern
```javascript
const galaxy = engine.createGalaxyStream(50, 'SPHERE');
// Shows spiral dynamics with entropy gradients
```

## 🔧 API Reference

### RaBbLE_Nebula_Engine

#### Constructor
```javascript
const engine = new RaBbLE_Nebula_Engine(container, options);
```

**Options:**
- `enforce_flat_chaos: true` - Enable Flat-Chaos pattern validation
- `rbcns_compliant: true` - Ensure RBCNS compliance
- `pulse_rate: 60` - Target frame rate

#### Methods

##### Stream Creation
```javascript
engine.createOrganicStream(count, type)  // Organic growth pattern
engine.createLatticeStream(count, type)  // Geometric grid pattern
engine.createSwarmStream(count, type)    // Chaotic swarm pattern
engine.createGalaxyStream(count, type)   // Spiral galaxy pattern
```

##### Stream Management
```javascript
engine.combineStreams([stream1, stream2])  // Combine multiple streams
engine.start()                             // Start rendering
engine.stop()                              // Stop rendering
engine.updateShaders(uniforms)             // Update shader uniforms
```

##### Statistics
```javascript
const stats = engine.getStats();
// Returns: { runtime, shaders, total_entities, total_meshes }
```

### RaBbLE_Nebula_Example

#### Constructor
```javascript
const example = new RaBbLE_Nebula_Example(container);
```

#### Methods
```javascript
example.createOrganic()     // Create organic pattern
example.createLattice()     // Create lattice pattern
example.createSwarm()       // Create swarm pattern
example.createGalaxy()      // Create galaxy pattern
example.combineStreams()    // Combine all active streams
example.clearStreams()      // Clear all streams
example.toggleChaos()       // Toggle chaos mode
example.addEntities()       // Add entities dynamically
example.removeEntities()    // Remove entities
example.toggleStats()       // Toggle statistics display
```

### RaBbLE_Nebula_Performance_Test

#### Constructor
```javascript
const test = new RaBbLE_Nebula_Performance_Test(container);
```

#### Test Methods
```javascript
await test.runEntityCountTest(maxEntities)    // Entity capacity test
await test.runPatternStabilityTest(duration)  // Pattern stability test
await test.runMemoryUsageTest(duration)       // Memory usage test
await test.runFPSPerformanceTest()            // FPS performance test
await test.runChaosBoundsTest()               // Chaos bounds test
await test.runAllTests()                      // Run all tests
```

## 🎯 RBCNS Compliance

All examples follow RBCNS (RaBbLE Nebula Coding Standards):

### Naming Conventions
- Classes: `PascalCase` (e.g., `RaBbLE_Nebula_Engine`)
- Methods: `camelCase` (e.g., `createOrganicStream`)
- Variables: `camelCase` (e.g., `container`)
- Constants: `UPPER_SNAKE_CASE` (e.g., `MAX_ENTITIES`)

### File Structure
- **Distribution**: `dist/` contains compiled, production-ready files
- **Examples**: `examples/` contains RBCNS-compliant example code
- **Documentation**: `docs/` contains RBCNS specifications and patterns

### Code Style
- Consistent indentation (4 spaces)
- Proper JSDoc documentation
- RBCNS-compliant comments and structure
- Flat-Chaos pattern enforcement

## 🔒 Flat-Chaos Pattern Enforcement

All examples enforce Flat-Chaos patterns:

### Pattern Validation
- **Entropy Bounds**: Each pattern has specific entropy constraints
- **Stability Monitoring**: Continuous pattern coherence checking
- **Automatic Correction**: Pattern drift correction mechanisms

### Supported Patterns
1. **Organic**: Growth-based patterns with moderate entropy
2. **Lattice**: Geometric patterns with low entropy
3. **Swarm**: Chaotic patterns with high entropy
4. **Galaxy**: Spiral patterns with entropy gradients

## 📈 Performance Guidelines

### Entity Limits
- **Organic**: Up to 500 entities recommended
- **Lattice**: Up to 1000 entities recommended
- **Swarm**: Up to 300 entities recommended
- **Galaxy**: Up to 400 entities recommended

### Memory Management
- Entities are automatically cleaned up
- Stream combination optimizes memory usage
- Performance monitoring prevents memory leaks

### Frame Rate Optimization
- Target 60 FPS for optimal experience
- Dynamic entity management for performance
- Shader optimization for rendering efficiency

## 🐛 Troubleshooting

### Common Issues

#### Three.js Dependency
```html
<!-- Ensure Three.js is loaded first -->
<script src="https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js"></script>
```

#### Container Issues
```javascript
// Ensure container exists and has dimensions
const container = document.getElementById('container');
if (!container) throw new Error('Container not found');
```

#### Performance Problems
```javascript
// Monitor performance and adjust entity counts
const stats = engine.getStats();
if (stats.total_entities > 1000) {
    console.warn('High entity count may impact performance');
}
```

### Debug Mode
```javascript
// Enable debug mode for development
const engine = new RaBbLE_Nebula_Engine('#container', {
    debug: true,
    enforce_flat_chaos: true
});
```

## 🤝 Contributing

When contributing to examples:

1. **Follow RBCNS**: Ensure all code follows RBCNS standards
2. **Flat-Chaos Compliance**: Validate all patterns with Flat-Chaos constraints
3. **Performance Testing**: Include performance benchmarks for new features
4. **Documentation**: Add comprehensive JSDoc comments
5. **Testing**: Include test cases for new functionality

## 📄 License

This project follows the RaBbLE Nebula Renderer license. See the main repository for details.

## 🔗 Related Documentation

- [RBCNS Specification](../docs/RBCNS_Specification.md)
- [Flat-Chaos Pattern Guide](../docs/FlatChaos_Pattern.md)
- [RaBbLE Architecture](../docs/RABL_Specification.md)
- [Performance Guidelines](../USAGE_GUIDE.md)