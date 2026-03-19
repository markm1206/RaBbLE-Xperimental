# NeBuLA - Nebula Rendering Engine

## Overview

NeBuLA (Nebula Behavioral Learning Architecture) is the quantum rendering engine for RaBbLE. It transforms abstract data streams into visual manifestations using the Flat-Chaos pattern and Three.js integration.

## Architecture

NeBuLA follows the **Flat-Chaos** pattern - a revolutionary approach that replaces hierarchical scene graphs with linear data streams:

```
Stream → Entity → Flux Matrix → Instanced Mesh → Render
  ↓        ↓          ↓              ↓            ↓
 Data   Geometry   Transform     Three.js     Display
```

### Core Components

#### RaBbLE_Nebula_Engine (`RaBbLE_Nebula_Engine.js`)
High-level API for creating and managing quantum streams with automatic shader management.

**Key Methods:**
- `createOrganicStream()` - Golden angle growth pattern
- `createLatticeStream()` - Geometric grid structure
- `createSwarmStream()` - Chaotic particle cloud
- `createGalaxyStream()` - Spiral arm formation
- `combineStreams()` - Merge multiple streams

#### RaBbLE_Nebula_Runtime (`RaBbLE_Nebula_Runtime.js`)
The Flat-Chaos Runtime - central sink that manages all quantum streams.

**Responsibilities:**
- Stream registry management
- Global laminar flow maintenance
- Pulse loop for continuous updates
- Performance monitoring

#### q_entity (`q_entity.js`)
The atomic unit of the Flat-Chaos Runtime.

**Properties:**
- `rabble_id` - Unique entropy-string identifier
- `dna_type` - Geometry type (BOX, SPHERE, TETRAHEDRON)
- `flux_matrix` - 4x4 transformation matrix (Float32Array)
- `e_entropy_sig` - Entropy value (0.0 to 1.0)

#### q_stream (`q_stream.js`)
Container for managing collections of quantum entities.

**Features:**
- Flat array of q_entity objects
- Flux modifier functions for transformations
- Pattern-based entity generation
- Stream combination and merging

#### q_instanced_bridge (`threejs/q_instanced_bridge.js`)
Three.js integration bridge using instanced rendering for performance.

**Capabilities:**
- Converts quantum entities to Three.js InstancedMesh
- Automatic material creation with entropy shaders
- Real-time matrix updates
- Performance-optimized rendering

#### e_entropy_shader_system (`e_entropy_shader_system.js`)
Centralized shader management for entropy-driven effects.

**Features:**
- Vertex displacement based on entropy
- Color variation shaders
- Shader caching and management
- Uniform updates

#### RaBbLE_Dreamer (`utils/RaBbLE_Dreamer.js`)
Scene generation utility for creating quantum streams.

**Patterns:**
- `organic` - Golden angle growth
- `lattice` - Geometric grid
- `swarm` - Chaotic cloud
- `galaxy` - Spiral formation

## Usage

### Creating Streams

```javascript
import { RaBbLE_Nebula_Engine } from './core/RaBbLE_Nebula_Engine.js';

const engine = new RaBbLE_Nebula_Engine('#container');
engine.start();

// Create organic stream
const organic = engine.createOrganicStream(50, 'SPHERE');

// Create galaxy stream
const galaxy = engine.createGalaxyStream(100, 'SPHERE', 3, 0.5);

// Combine streams
const combined = engine.combineStreams([organic, galaxy]);
```

### Custom Flux Modifiers

```javascript
stream.q_transmuteFluxModifier((entity, index) => {
    const time = Date.now() * 0.001;
    const pulse = Math.sin(time + index * 0.1);
    entity.q_transmuteEntropy(pulse * 0.5);
    return entity;
});
```

## CSS Styling

NeBuLA uses CSS variables for theming:

```css
:root {
    --rabble-primary: #00ffff;
    --rabble-secondary: #ff00ff;
    --rabble-accent: #00ffcc;
    --rabble-background: #000000;
    --rabble-surface: #1a1a1a;
}
```

## Integration with BaBbLE

NeBuLA receives commands from BaBbLE through the `RaBbLE_Nebula_Engine` class. The shell can:

- Create new streams
- Modify shader parameters
- Control entropy levels
- Query system statistics

## RBCNS Compliance

All NeBuLA code follows the RaBbLE Behavioral Coding & Naming Specification:

- Variables prefixed with `q_` (quantum) or `e_` (entropy)
- Functions use active verbs (transmute, ignite, dissolve)
- Classes prefixed with `RaBbLE_`
- Comments follow "stream-of-consciousness" style
- Flat-Chaos patterns with shallow nesting

## Performance Considerations

- Uses Three.js InstancedMesh for efficient rendering
- Shader caching to avoid recompilation
- Dynamic draw usage for animated entities
- Entropy-based LOD (Level of Detail) possible

## Future Enhancements

- WebGPU backend support
- Advanced shader effects
- Physics integration
- Audio-reactive visuals
- VR/AR support