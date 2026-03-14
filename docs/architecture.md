# RabbleOS 3D - System Architecture

## Overview

RabbleOS 3D is a web-based operating system built around a 3D AI character interface. The system provides a tiling window manager with three main applications: a 3D character display, a terminal interface, and an editor for testing the render engine.

## System Components

### Core Architecture

```
RabbleOS_3D/
├── index.html                    # Main HTML interface
├── js/
│   ├── RabbleOS.js              # Main OS logic & window management
│   ├── terminal.js              # Terminal application logic
│   ├── editor.js                # Editor application logic
│   ├── RabbleCanvas.js          # 3D Character Web Component
│   ├── RabbleRenderer.js        # Three.js scene management
│   ├── AnimationController.js   # State machine for animations
│   ├── RabbleBody.js            # Particle system for energy effect
│   ├── RabbleMouth.js           # Animated waveforms
│   ├── RabbleEyes.js            # Camera-facing eyes with portals
│   └── [other components]
├── style/
│   ├── RabbleOS.css             # OS layout and window management styles
│   ├── RabbleTheme.css          # Rabble Energy aesthetic theme
│   └── [other styles]
├── docs/                        # Documentation
│   ├── architecture.md          # This file
│   ├── components.md            # Component documentation
│   ├── terminal.md              # Terminal API documentation
│   ├── editor.md                # Editor functionality
│   └── api.md                   # Complete API reference
└── Extras/                      # Additional tools and examples
    ├── animation-studio.html    # Advanced animation interface
    └── test-system.html         # System testing interface
```

## Window Management

### Layout Structure

The OS uses a CSS Grid-based tiling window manager with the following layout:

```
┌─────────────────┬─────────────┐
│                 │             │
│   Editor App    │  Rabble 3D  │
│   (Largest)     │  (Small,    │
│                 │   Permanent)│
├─────────────────┼─────────────┤
│                               │
│        Terminal App           │
│         (Full width)          │
│                               │
└───────────────────────────────┘
```

### Window Properties

- **Editor App**: Primary workspace for render engine testing and configuration
- **Rabble 3D**: Non-closable 3D character display in top-right corner
- **Terminal App**: Full-width terminal interface for command-line interaction

## Application Architecture

### 1. Rabble 3D Character

**File**: `js/RabbleCanvas.js`
**Purpose**: Main 3D character component with Web Component interface

**Features**:
- Particle-based energy body with purple-to-blue gradient
- Animated waveform mouth responding to speech
- Camera-facing eyes with portal-like effects
- State-based animation system (idle, speaking, listening, reacting)
- Real-time property control (position, scale, animation parameters)

**API Methods**:
- `speak()` - Trigger speaking animation
- `listen()` - Enter listening state
- `react()` - Trigger reaction animation
- `idle()` - Return to idle state
- `lookAt(x, y, z)` - Control eye movement
- `setMouthPolynomial(index, coeffs, degree)` - Control mouth animation
- `setParticleSizeRange(min, max)` - Control particle effects
- `setParticleOpacity(opacity)` - Control particle transparency
- `saveConfiguration(filename)` - Save current state
- `loadConfigurationFromFile(file)` - Load saved state
- `loadConfigurationFromObject(config)` - Load configuration object

### 2. Terminal Application

**File**: `js/terminal.js`
**Purpose**: Command-line interface for interacting with the OS and Rabble

**Features**:
- Real-time command processing with 20+ available commands
- Command history with arrow key navigation
- Integration with Rabble character controls
- System status monitoring
- Configuration save/load functionality

**Command Categories**:
- **Rabble Control**: `rabble speak`, `rabble listen`, `rabble react`, `rabble idle`
- **Interaction**: `rabble lookat x y z`
- **System**: `system status`, `test animation`
- **Configuration**: `save config`, `load config`
- **Testing**: `test speak`, `test listen`, `test react`, `test idle`, `test lookat`, `test save`, `test load`

### 3. Editor Application

**File**: `js/editor.js`
**Purpose**: Visual interface for testing and configuring the Rabble render engine

**Features**:
- Real-time control sliders for all Rabble parameters
- Test buttons for all animation states
- Configuration save/load functionality
- Integration with terminal commands
- Animation studio integration

**Control Categories**:
- **Mouth Controls**: Intensity and wave amplitude sliders
- **Eye Controls**: X and Y position sliders
- **Particle Controls**: Size and opacity sliders
- **Test Actions**: Direct buttons for all Rabble functions

## Communication System

### Inter-Component Communication

The OS uses a broadcast messaging system for communication between components:

```javascript
// RabbleOS.js - Main broadcast system
broadcastMessage(type, data) {
    if (window.rabbleOSTerminal) {
        window.rabbleOSTerminal.handleBroadcast(type, data);
    }
    
    if (window.rabbleOSEditor) {
        window.rabbleOSEditor.handleBroadcast(type, data);
    }
}
```

### Message Types

- **`terminal_command`**: Commands from terminal to other components
- **`system_status`**: System status updates
- **`animation_update`**: Animation state changes
- **`configuration_change`**: Configuration updates

## Styling Architecture

### CSS Organization

```
style/
├── RabbleOS.css         # OS layout, window management, responsive design
├── RabbleTheme.css      # Rabble Energy aesthetic (purple/cyan cyberpunk)
└── [component-specific] # Component-specific styles if needed
```

### Theme System

The OS uses CSS custom properties for theming:

```css
:root {
    --rabble-cyan: #06B6D4;
    --rabble-purple: #8B5CF6;
    --rabble-red: #EF4444;
    --rabble-panel: #151515;
    --rabble-border: #333333;
}
```

## Performance Considerations

### Rendering Optimization

- **Particle Count**: Configurable particle count (default: 800) for performance vs quality balance
- **LOD System**: Ready for Level-of-Detail implementation for lower-end devices
- **WebGL Management**: Efficient Three.js scene management with proper cleanup
- **Animation Loop**: Optimized render loop with delta time calculations

### Memory Management

- **Component Cleanup**: Proper disposal of Three.js objects and event listeners
- **Window Management**: Efficient DOM manipulation for window operations
- **Event Handling**: Proper event listener cleanup to prevent memory leaks

## Development Workflow

### File Organization

1. **Core Logic**: `js/RabbleOS.js` - Main OS functionality
2. **Applications**: `js/terminal.js`, `js/editor.js` - Individual app logic
3. **3D Components**: `js/RabbleCanvas.js` and related files - 3D character system
4. **Styling**: `style/RabbleOS.css` - Layout and OS-specific styles
5. **Documentation**: `docs/` - Comprehensive documentation

### Testing Strategy

1. **Unit Testing**: Individual component testing
2. **Integration Testing**: Inter-component communication testing
3. **Performance Testing**: Rendering and memory usage optimization
4. **Cross-Browser Testing**: Modern browser compatibility

## Future Enhancements

### Planned Features

1. **Additional Applications**: File manager, settings panel, help system
2. **Advanced Window Management**: Tabbed windows, window snapping, virtual desktops
3. **Plugin System**: Extensible architecture for third-party applications
4. **Multi-Character Support**: Multiple AI characters with different personalities
5. **Voice Integration**: Speech recognition and synthesis
6. **Cloud Integration**: Configuration sync and sharing

### Architecture Improvements

1. **State Management**: Centralized state management system
2. **Event System**: More sophisticated event handling and propagation
3. **Error Handling**: Comprehensive error handling and user feedback
4. **Accessibility**: Improved accessibility features for all users