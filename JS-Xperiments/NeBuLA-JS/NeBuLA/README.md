# NeBuLA - Nebula Rendering Engine

## Overview

NeBuLA (Nebula Behavioral Learning Architecture) is the quantum rendering engine for RaBbLE. It transforms abstract data streams into visual manifestations using the Flat-Chaos pattern and Three.js integration.

## Recent Enhancements (v2.0)

### Dual Canvas Window System
NeBuLA now features a sophisticated window management system with two primary canvases:

- **Dream Canvas**: The creative visualization space for quantum stream generation
- **Cosmic Canvas**: The system monitoring and diagnostic canvas

Each canvas runs in its own resizable, draggable window with minimize/close controls.

### Terminal Window
A full-featured terminal window provides:
- **Command History**: Navigate with Arrow Up/Down keys
- **Global Keyboard Capture**: Press any key to focus terminal input
- **Real-time Command Execution**: Full access to all BaBbLE commands
- **Window Management**: Drag, resize, minimize, and close

### Window Management Features
- **Draggable Windows**: Click and drag title bars to reposition
- **Resizable Windows**: Drag bottom-right corner to resize
- **Minimize/Close Controls**: Standard window controls on title bars
- **Window Menu**: Restore closed windows from the menu bar
- **Performance Overlay**: Real-time FPS and entity statistics

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

## Dependency Injection & Testing

NeBuLA implements a robust dependency injection system for testability:

### RaBbLE_ServiceRegistry
The quantum dependency injector manages service registration and resolution:

```javascript
const registry = new RaBbLE_ServiceRegistry();
registry.q_register('engine', () => createEngine(), true);
const engine = registry.q_resolve('engine');
```

### RaBbLE_MockFactory
Factory for creating mock services for isolated testing:

```javascript
const mockEngine = RaBbLE_MockFactory.q_createMockEngine();
const mockRuntime = RaBbLE_MockFactory.q_createMockRuntime();
```

### Test Suite
The `RaBbLE_Nebula_TestSuite` uses dependency injection for isolated testing:

```javascript
const testRegistry = RaBbLE_Nebula_TestSuite.q_createTestRegistry();
const suite = new RaBbLE_Nebula_TestSuite(testRegistry);
await suite.runAllTests();
```

## Window System Architecture

The shell initialization in `NeBuLA/index.js` creates the dual canvas system:

1. **Dream Engine**: Primary visualization engine with full runtime
2. **Cosmic Engine**: Secondary engine for system monitoring
3. **Terminal Window**: Command execution and history management
4. **Window Manager**: Handles dragging, resizing, and window lifecycle

Each window is a separate DOM container with its own Three.js canvas, enabling independent rendering and user interaction.

## Performance Considerations

- Uses Three.js InstancedMesh for efficient rendering
- Shader caching to avoid recompilation
- Dynamic draw usage for animated entities
- Entropy-based LOD (Level of Detail) possible

## User Interface

### Window Controls
- **Drag**: Click and hold title bar to move window
- **Resize**: Drag bottom-right corner to resize
- **Minimize**: Click minimize button to hide window
- **Close**: Click close button to remove window
- **Restore**: Use Window menu to restore closed windows

### Terminal Features
- **Command Input**: Type commands in the terminal input field
- **Command History**: Press Arrow Up/Down to navigate command history
- **Global Focus**: Press any key to focus the terminal input
- **Command Execution**: Press Enter to execute commands

### Performance Monitoring
- **FPS Counter**: Real-time frames per second display
- **Entity Count**: Current number of active entities
- **Stream Count**: Number of registered streams
- **Render Statistics**: Three.js render performance metrics

## Future Enhancements

- WebGPU backend support
- Advanced shader effects
- Physics integration
- Audio-reactive visuals
- VR/AR support
- Additional window layouts
- Window snapping and docking
- Multi-monitor support
