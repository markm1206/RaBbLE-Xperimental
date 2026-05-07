# RabbleOS 3D - Component Documentation

## Overview

This document provides detailed documentation for all components in the RabbleOS 3D system, including their responsibilities, interfaces, and integration points.

## Core Components

### 1. RabbleOS (Main Operating System)

**File**: `js/RabbleOS.js`
**Type**: Class
**Purpose**: Main operating system logic and window management

#### Responsibilities
- Initialize and manage all OS components
- Handle window management and interactions
- Coordinate communication between applications
- Manage Rabble personality system
- Handle system-wide events and status

#### Key Methods
```javascript
class RabbleOS {
    constructor()                    // Initialize OS
    init()                          // Setup event listeners and windows
    setupEventListeners()           // Setup DOM event handlers
    initializeWindows()             // Initialize window references
    initializeRabbleCanvas()        // Setup Rabble character integration
    initializeTerminal()            // Setup terminal integration
    initializeEditor()              // Setup editor integration
    addStatusMessage(message, type) // Add status messages
    handleResize()                  // Handle window resize events
    minimizeWindow(btn)             // Minimize window
    maximizeWindow(btn)             // Maximize window
    closeWindow(btn)                // Close window (except Rabble)
    startPersonalitySystem()        // Start personality messages
    createEnergyParticles()         // Create visual effects
    broadcastMessage(type, data)    // Send messages between components
    getSystemStatus()               // Get system status information
}
```

#### Integration Points
- **RabbleCanvas**: Direct integration for character control
- **Terminal**: Broadcast message handling
- **Editor**: Broadcast message handling
- **DOM**: Window management and event handling

### 2. RabbleCanvas (3D Character Component)

**File**: `js/RabbleCanvas.js`
**Type**: Web Component
**Purpose**: 3D character display and interaction

#### Responsibilities
- Render 3D character using Three.js
- Handle character animations and states
- Provide API for external control
- Manage particle effects and visual feedback
- Handle user interactions (click, drag, etc.)

#### Key Methods
```javascript
class RabbleCanvas extends HTMLElement {
    // Animation Control
    speak()                         // Trigger speaking animation
    listen()                        // Enter listening state
    stopListening()                 // Exit listening state
    react()                         // Trigger reaction animation
    idle()                          // Return to idle state
    
    // Interaction Control
    lookAt(x, y, z)                 // Control eye movement
    
    // Configuration
    setMouthPolynomial(index, coeffs, degree)  // Control mouth animation
    setParticleSizeRange(min, max)             // Control particle effects
    setParticleOpacity(opacity)                // Control particle transparency
    
    // Save/Load
    saveConfiguration(filename)                // Save current state
    loadConfigurationFromFile(file)            // Load from file
    loadConfigurationFromObject(config)        // Load from object
    
    // Access Methods
    getRabble()                     // Get Rabble instance
    getRenderer()                   // Get Three.js renderer
    getScene()                      // Get Three.js scene
    getCamera()                     // Get Three.js camera
}
```

#### Properties
- **`isInitialized`**: Boolean indicating initialization status
- **`renderer`**: Three.js renderer instance
- **`rabble`**: Main Rabble character instance
- **`animationId`**: Animation loop ID
- **`lastTime`**: Last frame time for delta calculations

#### Integration Points
- **RabbleOS**: Main integration point for OS control
- **Terminal**: Receives commands via RabbleOS
- **Editor**: Receives control updates via RabbleOS

### 3. RabbleOSTerminal (Terminal Application)

**File**: `js/terminal.js`
**Type**: Class
**Purpose**: Command-line interface for OS interaction

#### Responsibilities
- Process user commands
- Display system messages and responses
- Handle command history and navigation
- Integrate with Rabble character controls
- Provide system status information

#### Key Methods
```javascript
class RabbleOSTerminal {
    constructor()                  // Initialize terminal
    init()                         // Setup input and output
    setupInputEvents()             // Setup keyboard event handlers
    setupCursorBlink()             // Setup blinking cursor
    navigateHistory(direction)     // Navigate command history
    processCommand(command)        // Process user input
    addMessage(message, type)      // Add message to output
    clearTerminal()                // Clear terminal output
    addWelcomeMessage()            // Display welcome message
    setRabbleCanvas(canvas)        // Set Rabble character reference
}
```

#### Command Processing
The terminal supports the following command categories:

**Rabble Control Commands:**
- `rabble speak` - Make Rabble speak
- `rabble listen` - Put Rabble in listening mode
- `rabble react` - Trigger Rabble reaction
- `rabble idle` - Put Rabble in idle state

**Interaction Commands:**
- `rabble lookat x y z` - Make Rabble look at coordinates

**System Commands:**
- `system status` - Show system status
- `test animation` - Open animation studio

**Configuration Commands:**
- `save config` - Save current configuration
- `load config` - Load configuration from file

**Testing Commands:**
- `test speak/listen/react/idle/lookat/save/load` - Test individual functions

#### Integration Points
- **RabbleOS**: Receives RabbleCanvas reference and broadcasts messages
- **RabbleCanvas**: Direct control via API methods
- **Editor**: Can receive commands via broadcast system

### 4. RabbleOSEditor (Editor Application)

**File**: `js/editor.js`
**Type**: Class
**Purpose**: Visual interface for render engine testing and configuration

#### Responsibilities
- Provide visual controls for Rabble parameters
- Handle real-time parameter updates
- Execute test functions
- Manage configuration save/load
- Integrate with terminal commands

#### Key Methods
```javascript
class RabbleOSEditor {
    constructor()                  // Initialize editor
    init()                         // Setup event listeners
    setupEventListeners()          // Setup DOM event handlers
    initializeControls()           // Setup control event handlers
    setRabbleCanvas(canvas)        // Set Rabble character reference
    
    // Parameter Updates
    updateMouthIntensity(value)    // Update mouth intensity
    updateWaveAmplitude(value)     // Update wave amplitude
    updateEyePosition(x, y)        // Update eye position
    updateParticleSize(value)      // Update particle size
    updateParticleOpacity(value)   // Update particle opacity
    
    // Test Actions
    executeTestAction(action)      // Execute test function
    saveConfiguration()            // Save current configuration
    loadConfiguration()            // Load configuration from file
    
    // Status Management
    addStatusMessage(message, type) // Add status message
    handleBroadcast(type, data)     // Handle broadcast messages
}
```

#### Control Categories
- **Mouth Controls**: Intensity and wave amplitude sliders
- **Eye Controls**: X and Y position sliders
- **Particle Controls**: Size and opacity sliders
- **Test Actions**: Direct buttons for all Rabble functions

#### Integration Points
- **RabbleOS**: Receives RabbleCanvas reference and broadcasts messages
- **RabbleCanvas**: Direct control via API methods
- **Terminal**: Can receive commands via broadcast system

## Supporting Components

### 5. RabbleRenderer (Three.js Scene Management)

**File**: `js/RabbleRenderer.js`
**Type**: Class
**Purpose**: Three.js scene and renderer management

#### Responsibilities
- Initialize Three.js renderer and scene
- Handle camera setup and controls
- Manage render loop
- Handle window resize events
- Provide access to Three.js objects

#### Key Methods
```javascript
class RabbleRenderer {
    constructor(container)         // Initialize renderer
    init()                         // Setup scene, camera, renderer
    addToScene(object)             // Add object to scene
    startRenderLoop(callback)      // Start animation loop
    onWindowResize()               // Handle window resize
    getScene()                     // Get Three.js scene
    getCamera()                    // Get Three.js camera
    getRenderer()                  // Get Three.js renderer
    dispose()                      // Cleanup resources
}
```

### 6. AnimationController (State Machine)

**File**: `js/AnimationController.js`
**Type**: Class
**Purpose**: Manage character animation states and transitions

#### Responsibilities
- Manage animation states (idle, speaking, listening, reacting)
- Handle state transitions and timing
- Coordinate with individual component controllers
- Provide animation timing and interpolation

#### Key Methods
```javascript
class AnimationController {
    constructor(rabble)            // Initialize with Rabble reference
    setState(state)                // Set animation state
    update(deltaTime)              // Update animations
    getState()                     // Get current state
    isAnimating()                  // Check if animating
}
```

### 7. RabbleBody (Particle System)

**File**: `js/RabbleBody.js`
**Type**: Class
**Purpose**: Manage the particle-based energy body

#### Responsibilities
- Create and manage particle system
- Handle particle animations and effects
- Manage particle colors and gradients
- Handle particle interactions

#### Key Methods
```javascript
class RabbleBody {
    constructor(renderer)          // Initialize with renderer
    createParticles()              // Create particle system
    update(deltaTime)              // Update particle animations
    setParticleOpacity(opacity)    // Set particle transparency
    updateParticleSizes(min, max)  // Update particle size range
    dispose()                      // Cleanup resources
}
```

### 8. RabbleMouth (Waveform Animation)

**File**: `js/RabbleMouth.js`
**Type**: Class
**Purpose**: Manage animated waveforms for mouth

#### Responsibilities
- Create and animate waveforms
- Handle mouth intensity and amplitude
- Manage polynomial coefficients for wave shapes
- Coordinate with animation controller

#### Key Methods
```javascript
class RabbleMouth {
    constructor(renderer)          // Initialize with renderer
    createWaveforms()              // Create waveform objects
    update(deltaTime)              // Update waveform animations
    setPolynomialCoeffs(index, coeffs, degree) // Set wave coefficients
    dispose()                      // Cleanup resources
}
```

### 9. RabbleEyes (Eye System)

**File**: `js/RabbleEyes.js`
**Type**: Class
**Purpose**: Manage camera-facing eyes with portal effects

#### Responsibilities
- Create and position eyes
- Handle eye tracking and movement
- Manage portal-like eyebrow effects
- Coordinate with lookAt commands

#### Key Methods
```javascript
class RabbleEyes {
    constructor(renderer)          // Initialize with renderer
    createEyes()                   // Create eye objects
    update(deltaTime)              // Update eye animations
    lookAt(x, y, z)                // Move eyes to look at coordinates
    dispose()                      // Cleanup resources
}
```

## Component Relationships

### Data Flow
```
User Input → Terminal/Editor → RabbleOS → RabbleCanvas → Individual Components
```

### Communication Patterns
1. **Direct API Calls**: Terminal/Editor → RabbleCanvas
2. **Broadcast Messages**: RabbleOS → Terminal/Editor
3. **Event-Driven**: DOM Events → Component Event Handlers
4. **State Synchronization**: RabbleCanvas → All Components

### Initialization Order
1. **RabbleOS**: Main OS initialization
2. **RabbleCanvas**: 3D character setup
3. **Terminal**: Command interface setup
4. **Editor**: Visual controls setup
5. **Supporting Components**: Individual component initialization

## Error Handling

### Error Categories
1. **Initialization Errors**: Component setup failures
2. **Runtime Errors**: Animation or interaction failures
3. **Communication Errors**: Message passing failures
4. **Resource Errors**: Memory or WebGL context issues

### Error Recovery
- **Graceful Degradation**: Continue operation with reduced functionality
- **User Feedback**: Clear error messages and guidance
- **Automatic Recovery**: Retry mechanisms for transient failures
- **Manual Recovery**: User-initiated reset and restart options