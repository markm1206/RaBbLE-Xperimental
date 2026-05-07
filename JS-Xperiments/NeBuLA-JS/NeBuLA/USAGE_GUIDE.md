# RaBbLE Nebula Engine - Usage Guide

Welcome to the RaBbLE Nebula Engine! This guide will help you get started with creating quantum visualizations using the Flat-Chaos Runtime pattern.

## Table of Contents

1. [Quick Start](#quick-start)
2. [Core Concepts](#core-concepts)
3. [Basic Usage](#basic-usage)
4. [Advanced Patterns](#advanced-patterns)
5. [API Reference](#api-reference)
6. [Performance Tips](#performance-tips)
7. [Troubleshooting](#troubleshooting)

## Quick Start

### 1. Setup

Include the RaBbLE Engine in your project:

```html
<script type="importmap">
{
    "imports": {
        "three": "https://unpkg.com/three@0.128.0/build/three.module.js",
        "./core/RaBbLE_Nebula_Engine.js": "./NeBuLA/core/RaBbLE_Nebula_Engine.js"
    }
}
</script>

<script type="module">
    import { RaBbLE_Nebula_Engine } from './core/RaBbLE_Nebula_Engine.js';
</script>
```

### 2. Create Your First Scene

```javascript
// Create engine instance
const engine = new RaBbLE_Nebula_Engine('#container');

// Create a simple scene
engine.createSimpleExample();

// Start the engine
engine.start();
```

That's it! You now have a working quantum visualization.

## Core Concepts

### The Flat-Chaos Pattern

RaBbLE uses the **Flat-Chaos Runtime (FCR)** pattern:

- **Streams**: Collections of quantum entities flowing through the system
- **Entities**: Individual particles with position, rotation, and entropy
- **Runtime**: The central "Sink" that manages all streams
- **Entropy**: Mathematical chaos that drives visual movement

### Key Components

1. **q_entity**: Individual quantum particle with a 4x4 transformation matrix
2. **q_stream**: Container for entities with a flux modifier function
3. **RaBbLE_Nebula_Runtime**: Central system managing all streams
4. **e_entropy_shader_system**: Centralized shader management
5. **RaBbLE_Nebula_Engine**: High-level API for easy usage

## Basic Usage

### Creating Different Patterns

```javascript
// Organic flow pattern
const organic = engine.createOrganicStream(30, 'SPHERE');

// Geometric lattice pattern
const lattice = engine.createLatticeStream(20, 'BOX');

// Quantum swarm pattern
const swarm = engine.createSwarmStream(50, 'TETRAHEDRON');

// Spiral galaxy pattern
const galaxy = engine.createGalaxyStream(40, 'SPHERE');
```

### Stream Management

```javascript
// Add entities to existing stream
engine.addEntitiesToStream(organic, 10);

// Remove a stream
engine.removeStream(organic.q_stream_id);

// Reset all streams
engine.reset();
```

### Shader Controls

```javascript
// Update shader uniforms
engine.updateShaders({
    u_entropy: 0.8,
    u_base_intensity: 0.3,
    u_time_scale: 1.5
});

// Get current uniform values
const values = engine.shader_system.getUniformValues();
```

## Advanced Patterns

### Combining Streams

```javascript
// Create multiple streams
const stream1 = engine.createOrganicStream(20, 'SPHERE');
const stream2 = engine.createSwarmStream(30, 'TETRAHEDRON');

// Combine them into one
const combined = engine.combineStreams([stream1, stream2]);
```

### Custom Stream Creation

```javascript
// Create a custom stream with random entities
const custom = engine.createRandomStream(100, ['BOX', 'SPHERE']);

// Apply custom flux modifier
custom.q_setFluxModifier((entity, index) => {
    // Custom logic for each entity
    entity.e_applyEntropy(Math.sin(index * 0.1) * 0.5);
    return entity;
});
```

### Complex Scene Creation

```javascript
// Create a complete nebula scene
const scene = engine.createNebulaScene({
    organic_count: 25,
    lattice_count: 20,
    swarm_count: 40,
    galaxy_count: 30,
    combine_streams: true
});
```

## API Reference

### RaBbLE_Nebula_Engine

#### Constructor
```javascript
new RaBbLE_Nebula_Engine(container, options)
```

**Parameters:**
- `container`: HTMLElement or CSS selector for the container
- `options`: Configuration object with Three.js renderer options

#### Methods

##### Stream Creation
- `createOrganicStream(count, type, options)` - Create organic flow pattern
- `createLatticeStream(count, type, spacing)` - Create geometric lattice
- `createSwarmStream(count, type, radius)` - Create quantum swarm
- `createGalaxyStream(count, type, arms, tightness)` - Create spiral galaxy
- `createRandomStream(count, types, options)` - Create random pattern

##### Stream Management
- `combineStreams(streams, options)` - Combine multiple streams
- `addEntitiesToStream(stream, count, type)` - Add entities to stream
- `removeStream(stream_or_id)` - Remove stream from engine
- `reset()` - Clear all streams

##### Engine Control
- `start()` - Start the engine
- `stop()` - Stop the engine
- `dispose()` - Clean up resources

##### Shader Control
- `updateShaders(updates)` - Update shader uniforms
- `getStats()` - Get engine statistics

### Pattern Types

#### Organic
- **Description**: Flowing, vine-like patterns
- **Best for**: Natural, flowing visualizations
- **DNA Types**: All types work well

#### Lattice
- **Description**: Geometric grid patterns
- **Best for**: Architectural, structured visuals
- **DNA Types**: BOX works best

#### Swarm
- **Description**: Cloud-like particle swarms
- **Best for**: Organic, cloud-like effects
- **DNA Types**: TETRAHEDRON works best

#### Galaxy
- **Description**: Spiral galaxy patterns
- **Best for**: Cosmic, celestial visuals
- **DNA Types**: SPHERE works best

## Performance Tips

### 1. Entity Count
- **Optimal range**: 100-500 entities per stream
- **Maximum recommended**: 1000 entities per stream
- **For complex scenes**: Use multiple smaller streams instead of one large stream

### 2. Shader Optimization
- Use `u_base_intensity` to control visual complexity
- Lower `u_time_scale` for less CPU usage
- Use shader caching for better performance

### 3. Stream Management
- Remove unused streams with `removeStream()`
- Use `reset()` to clear all streams when needed
- Combine streams only when necessary

### 4. Three.js Settings
```javascript
const engine = new RaBbLE_Nebula_Engine('#container', {
    antialias: true,    // Better visuals, more GPU usage
    alpha: true,        // Transparent background
    powerPreference: 'high-performance'  // Use dedicated GPU
});
```

## Troubleshooting

### Common Issues

#### 1. "Container not found"
```javascript
// Wrong
const engine = new RaBbLE_Nebula_Engine('#nonexistent');

// Right
const container = document.getElementById('my-container');
const engine = new RaBbLE_Nebula_Engine(container);
```

#### 2. "Import failed"
Make sure you're serving files from a local server, not opening HTML files directly in the browser.

#### 3. "Shader compilation failed"
Check that you're using Three.js r128 or compatible version.

#### 4. "Performance issues"
- Reduce entity count
- Lower shader intensity
- Use simpler patterns
- Close other browser tabs

### Debug Mode

Enable debug logging:
```javascript
const engine = new RaBbLE_Nebula_Engine('#container', {
    debug: true  // Enable debug logging
});

// Get detailed statistics
const stats = engine.getStats();
console.log(stats);
```

### Error Handling

```javascript
try {
    const engine = new RaBbLE_Nebula_Engine('#container');
    engine.createSimpleExample();
    engine.start();
} catch (error) {
    console.error('Failed to initialize RaBbLE Engine:', error);
    // Handle error gracefully
}
```

## Next Steps

1. **Try the examples**: Check out the example files in the `/examples` directory
2. **Experiment**: Modify the patterns and see what happens
3. **Combine**: Mix different pattern types for unique effects
4. **Customize**: Create your own flux modifiers and patterns
5. **Optimize**: Use the performance tips for production applications

## Support

If you need help:
1. Check this guide first
2. Look at the example files
3. Check the console for error messages
4. Review the API documentation

Happy quantum visualizing! 🚀✨