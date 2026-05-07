# RabbleOS 3D - API Documentation

## Overview

This document provides comprehensive API documentation for all components in the RabbleOS 3D system, including method signatures, parameters, return values, and usage examples.

## Core API Reference

### RabbleOS (Main Operating System)

**File**: `js/RabbleOS.js`
**Type**: Class

#### Constructor
```javascript
new RabbleOS()
```
**Description**: Initialize the main operating system
**Returns**: RabbleOS instance

#### Methods

##### `init()`
**Description**: Setup event listeners and initialize windows
**Returns**: `void`

##### `setupEventListeners()`
**Description**: Setup DOM event handlers for window management
**Returns**: `void`

##### `initializeWindows()`
**Description**: Initialize window references and interactions
**Returns**: `void`

##### `initializeRabbleCanvas()`
**Description**: Setup Rabble character integration
**Returns**: `void`

##### `initializeTerminal()`
**Description**: Setup terminal integration
**Returns**: `void`

##### `initializeEditor()`
**Description**: Setup editor integration
**Returns**: `void`

##### `addStatusMessage(message, type)`
**Parameters**:
- `message` (string): The message to display
- `type` (string): Message type ('normal', 'error', 'success', 'info')
**Returns**: `void`
**Description**: Add status message to appropriate areas

##### `handleResize()`
**Description**: Handle window resize events
**Returns**: `void`

##### `minimizeWindow(btn)`
**Parameters**:
- `btn` (HTMLElement): Minimize button element
**Returns**: `void`
**Description**: Minimize the window containing the button

##### `maximizeWindow(btn)`
**Parameters**:
- `btn` (HTMLElement): Maximize button element
**Returns**: `void`
**Description**: Maximize the window containing the button

##### `closeWindow(btn)`
**Parameters**:
- `btn` (HTMLElement): Close button element
**Returns**: `void`
**Description**: Close the window (except Rabble window)

##### `startPersonalitySystem()`
**Description**: Start the personality message system
**Returns**: `void`

##### `createEnergyParticles()`
**Description**: Create visual energy particle effects
**Returns**: `void`

##### `broadcastMessage(type, data)`
**Parameters**:
- `type` (string): Message type
- `data` (any): Message data
**Returns**: `void`
**Description**: Send broadcast messages to other components

##### `getSystemStatus()`
**Returns**: `Object` - System status information
**Description**: Get current system status

**Example**:
```javascript
const status = rabbleOS.getSystemStatus();
console.log(status.os); // "RabbleOS 3D v1.0.0"
console.log(status.aiCore); // "ONLINE"
```

### RabbleCanvas (3D Character Component)

**File**: `js/RabbleCanvas.js`
**Type**: Web Component

#### Animation Control Methods

##### `speak()`
**Description**: Trigger speaking animation
**Returns**: `void`
**Example**: `rabbleCanvas.speak();`

##### `listen()`
**Description**: Enter listening state
**Returns**: `void`
**Example**: `rabbleCanvas.listen();`

##### `stopListening()`
**Description**: Exit listening state
**Returns**: `void`
**Example**: `rabbleCanvas.stopListening();`

##### `react()`
**Description**: Trigger reaction animation
**Returns**: `void`
**Example**: `rabbleCanvas.react();`

##### `idle()`
**Description**: Return to idle state
**Returns**: `void`
**Example**: `rabbleCanvas.idle();`

#### Interaction Control Methods

##### `lookAt(x, y, z)`
**Parameters**:
- `x` (number): Horizontal position
- `y` (number): Vertical position
- `z` (number): Depth position
**Returns**: `void`
**Description**: Make eyes look at 3D coordinates
**Example**: `rabbleCanvas.lookAt(1, 0, 0);`

#### Configuration Methods

##### `setMouthPolynomial(index, coeffs, degree)`
**Parameters**:
- `index` (number): Waveform index
- `coeffs` (Array): Polynomial coefficients
- `degree` (number): Polynomial degree
**Returns**: `void`
**Description**: Set mouth animation polynomial
**Example**: `rabbleCanvas.setMouthPolynomial(0, [1, 0.5, 0.2], 3);`

##### `setParticleSizeRange(min, max)`
**Parameters**:
- `min` (number): Minimum particle size
- `max` (number): Maximum particle size
**Returns**: `void`
**Description**: Set particle size range
**Example**: `rabbleCanvas.setParticleSizeRange(0.05, 0.3);`

##### `setParticleOpacity(opacity)`
**Parameters**:
- `opacity` (number): Particle opacity (0.0 to 1.0)
**Returns**: `void`
**Description**: Set particle transparency
**Example**: `rabbleCanvas.setParticleOpacity(0.8);`

#### Save/Load Methods

##### `saveConfiguration(filename)`
**Parameters**:
- `filename` (string): Output filename
**Returns**: `void`
**Description**: Save current configuration to file
**Example**: `rabbleCanvas.saveConfiguration('my_config.json');`

##### `loadConfigurationFromFile(file)`
**Parameters**:
- `file` (File): JSON configuration file
**Returns**: `void`
**Description**: Load configuration from file
**Example**: `rabbleCanvas.loadConfigurationFromFile(file);`

##### `loadConfigurationFromObject(config)`
**Parameters**:
- `config` (Object): Configuration object
**Returns**: `void`
**Description**: Load configuration from object
**Example**: `rabbleCanvas.loadConfigurationFromObject(config);`

#### Access Methods

##### `getRabble()`
**Returns**: `Object` - Rabble instance
**Description**: Get direct access to Rabble instance

##### `getRenderer()`
**Returns**: `Object` - Three.js renderer
**Description**: Get Three.js renderer instance

##### `getScene()`
**Returns**: `Object` - Three.js scene
**Description**: Get Three.js scene instance

##### `getCamera()`
**Returns**: `Object` - Three.js camera
**Description**: Get Three.js camera instance

### RabbleOSTerminal (Terminal Application)

**File**: `js/terminal.js`
**Type**: Class

#### Constructor
```javascript
new RabbleOSTerminal()
```
**Description**: Initialize terminal interface
**Returns**: RabbleOSTerminal instance

#### Methods

##### `init()`
**Description**: Setup input and output elements
**Returns**: `void`

##### `setupInputEvents()`
**Description**: Setup keyboard event handlers
**Returns**: `void`

##### `setupCursorBlink()`
**Description**: Setup blinking cursor animation
**Returns**: `void`

##### `navigateHistory(direction)`
**Parameters**:
- `direction` (number): -1 for up, 1 for down
**Returns**: `void`
**Description**: Navigate command history

##### `processCommand(command)`
**Parameters**:
- `command` (string): User input command
**Returns**: `void`
**Description**: Process and execute command

##### `addMessage(message, type)`
**Parameters**:
- `message` (string): Message text
- `type` (string): Message type
**Returns**: `void`
**Description**: Add message to terminal output

##### `clearTerminal()`
**Description**: Clear terminal output
**Returns**: `void`

##### `addWelcomeMessage()`
**Description**: Display welcome message
**Returns**: `void`

##### `setRabbleCanvas(canvas)`
**Parameters**:
- `canvas` (RabbleCanvas): Rabble character reference
**Returns**: `void`
**Description**: Set Rabble character for control

### RabbleOSEditor (Editor Application)

**File**: `js/editor.js`
**Type**: Class

#### Constructor
```javascript
new RabbleOSEditor()
```
**Description**: Initialize editor interface
**Returns**: RabbleOSEditor instance

#### Methods

##### `init()`
**Description**: Setup event listeners and controls
**Returns**: `void`

##### `setupEventListeners()`
**Description**: Setup DOM event handlers
**Returns**: `void`

##### `initializeControls()`
**Description**: Setup control event handlers
**Returns**: `void`

##### `setRabbleCanvas(canvas)`
**Parameters**:
- `canvas` (RabbleCanvas): Rabble character reference
**Returns**: `void`
**Description**: Set Rabble character for control

##### `updateMouthIntensity(value)`
**Parameters**:
- `value` (number): Mouth intensity (0.0 to 3.0)
**Returns**: `void`
**Description**: Update mouth intensity parameter

##### `updateWaveAmplitude(value)`
**Parameters**:
- `value` (number): Wave amplitude (0.0 to 2.0)
**Returns**: `void`
**Description**: Update wave amplitude parameter

##### `updateEyePosition(x, y)`
**Parameters**:
- `x` (number): X position (-2.0 to 2.0)
- `y` (number): Y position (-2.0 to 2.0)
**Returns**: `void`
**Description**: Update eye position

##### `updateParticleSize(value)`
**Parameters**:
- `value` (number): Particle size (0.05 to 1.0)
**Returns**: `void`
**Description**: Update particle size parameter

##### `updateParticleOpacity(value)`
**Parameters**:
- `value` (number): Particle opacity (0.0 to 1.0)
**Returns**: `void`
**Description**: Update particle opacity parameter

##### `executeTestAction(action)`
**Parameters**:
- `action` (string): Test action name
**Returns**: `void`
**Description**: Execute test function

##### `saveConfiguration()`
**Description**: Save current configuration
**Returns**: `void`

##### `loadConfiguration()`
**Description**: Load configuration from file
**Returns**: `void`

##### `addStatusMessage(message, type)`
**Parameters**:
- `message` (string): Status message
- `type` (string): Message type
**Returns**: `void`
**Description**: Add status message to editor

##### `handleBroadcast(type, data)`
**Parameters**:
- `type` (string): Broadcast message type
- `data` (any): Message data
**Returns**: `void`
**Description**: Handle broadcast messages

## Supporting Component APIs

### RabbleRenderer (Three.js Scene Management)

**File**: `js/RabbleRenderer.js`
**Type**: Class

#### Constructor
```javascript
new RabbleRenderer(container)
```
**Parameters**:
- `container` (HTMLElement): Container element for renderer
**Returns**: RabbleRenderer instance

#### Methods

##### `init()`
**Description**: Setup Three.js scene, camera, and renderer
**Returns**: `void`

##### `addToScene(object)`
**Parameters**:
- `object` (THREE.Object3D): Object to add to scene
**Returns**: `void`

##### `startRenderLoop(callback)`
**Parameters**:
- `callback` (Function): Animation loop callback
**Returns**: `void`

##### `onWindowResize()`
**Description**: Handle window resize events
**Returns**: `void`

##### `getScene()`
**Returns**: `THREE.Scene` - Three.js scene instance

##### `getCamera()`
**Returns**: `THREE.Camera` - Three.js camera instance

##### `getRenderer()`
**Returns**: `THREE.WebGLRenderer` - Three.js renderer instance

##### `dispose()`
**Description**: Cleanup resources
**Returns**: `void`

### AnimationController (State Machine)

**File**: `js/AnimationController.js`
**Type**: Class

#### Constructor
```javascript
new AnimationController(rabble)
```
**Parameters**:
- `rabble` (Object): Rabble character reference
**Returns**: AnimationController instance

#### Methods

##### `setState(state)`
**Parameters**:
- `state` (string): Animation state name
**Returns**: `void`

##### `update(deltaTime)`
**Parameters**:
- `deltaTime` (number): Time delta in seconds
**Returns**: `void`

##### `getState()`
**Returns**: `string` - Current animation state

##### `isAnimating()`
**Returns**: `boolean` - Whether currently animating

### RabbleBody (Particle System)

**File**: `js/RabbleBody.js`
**Type**: Class

#### Constructor
```javascript
new RabbleBody(renderer)
```
**Parameters**:
- `renderer` (RabbleRenderer): Renderer reference
**Returns**: RabbleBody instance

#### Methods

##### `createParticles()`
**Description**: Create particle system
**Returns**: `void`

##### `update(deltaTime)`
**Parameters**:
- `deltaTime` (number): Time delta in seconds
**Returns**: `void`

##### `setParticleOpacity(opacity)`
**Parameters**:
- `opacity` (number): Particle opacity
**Returns**: `void`

##### `updateParticleSizes(min, max)`
**Parameters**:
- `min` (number): Minimum particle size
- `max` (number): Maximum particle size
**Returns**: `void`

##### `dispose()`
**Description**: Cleanup resources
**Returns**: `void`

### RabbleMouth (Waveform Animation)

**File**: `js/RabbleMouth.js`
**Type**: Class

#### Constructor
```javascript
new RabbleMouth(renderer)
```
**Parameters**:
- `renderer` (RabbleRenderer): Renderer reference
**Returns**: RabbleMouth instance

#### Methods

##### `createWaveforms()`
**Description**: Create waveform objects
**Returns**: `void`

##### `update(deltaTime)`
**Parameters**:
- `deltaTime` (number): Time delta in seconds
**Returns**: `void`

##### `setPolynomialCoeffs(index, coeffs, degree)`
**Parameters**:
- `index` (number): Waveform index
- `coeffs` (Array): Polynomial coefficients
- `degree` (number): Polynomial degree
**Returns**: `void`

##### `dispose()`
**Description**: Cleanup resources
**Returns**: `void`

### RabbleEyes (Eye System)

**File**: `js/RabbleEyes.js`
**Type**: Class

#### Constructor
```javascript
new RabbleEyes(renderer)
```
**Parameters**:
- `renderer` (RabbleRenderer): Renderer reference
**Returns**: RabbleEyes instance

#### Methods

##### `createEyes()`
**Description**: Create eye objects
**Returns**: `void`

##### `update(deltaTime)`
**Parameters**:
- `deltaTime` (number): Time delta in seconds
**Returns**: `void`

##### `lookAt(x, y, z)`
**Parameters**:
- `x` (number): X coordinate
- `y` (number): Y coordinate
- `z` (number): Z coordinate
**Returns**: `void`

##### `dispose()`
**Description**: Cleanup resources
**Returns**: `void`

## Configuration File Format

### JSON Schema
```json
{
    "type": "object",
    "properties": {
        "eyes": {
            "type": "object",
            "properties": {
                "position": {
                    "type": "array",
                    "items": { "type": "number" },
                    "minItems": 3,
                    "maxItems": 3
                },
                "scale": {
                    "type": "array",
                    "items": { "type": "number" },
                    "minItems": 3,
                    "maxItems": 3
                }
            }
        },
        "mouth": {
            "type": "object",
            "properties": {
                "position": {
                    "type": "array",
                    "items": { "type": "number" },
                    "minItems": 3,
                    "maxItems": 3
                },
                "scale": {
                    "type": "array",
                    "items": { "type": "number" },
                    "minItems": 3,
                    "maxItems": 3
                },
                "waves": {
                    "type": "array",
                    "items": {
                        "type": "object",
                        "properties": {
                            "coeffs": {
                                "type": "array",
                                "items": { "type": "number" }
                            },
                            "degree": { "type": "number" }
                        }
                    }
                }
            }
        },
        "particles": {
            "type": "object",
            "properties": {
                "minSize": { "type": "number" },
                "maxSize": { "type": "number" },
                "opacity": { "type": "number" }
            }
        }
    }
}
```

## Error Handling

### Error Types

#### Initialization Errors
- **Component Setup Failure**: Component initialization failed
- **Missing Dependencies**: Required components not available
- **Invalid Configuration**: Configuration parameters invalid

#### Runtime Errors
- **Animation Failure**: Animation execution failed
- **Interaction Failure**: User interaction processing failed
- **Resource Failure**: WebGL context or memory issues

#### Communication Errors
- **Broadcast Failure**: Message passing failed
- **API Call Failure**: Component API call failed
- **Integration Failure**: Component integration failed

### Error Recovery

#### Graceful Degradation
```javascript
try {
    // Component operation
} catch (error) {
    console.error('Component error:', error);
    // Continue with reduced functionality
}
```

#### User Feedback
```javascript
addStatusMessage('Error: Operation failed', 'error');
```

#### Manual Recovery
```javascript
// Reset to defaults
resetToDefaults();
```

## Performance Guidelines

### Best Practices

#### Memory Management
- Always call `dispose()` methods when cleaning up
- Remove event listeners properly
- Limit configuration file sizes

#### Performance Optimization
- Use debouncing for frequent updates
- Batch multiple parameter changes
- Limit particle counts on low-end devices

#### API Usage
- Cache component references when possible
- Use appropriate update frequencies
- Handle errors gracefully

### Performance Monitoring

#### Frame Rate Monitoring
```javascript
// Monitor animation loop performance
const startTime = performance.now();
update(deltaTime);
const endTime = performance.now();
const frameTime = endTime - startTime;
```

#### Memory Usage
```javascript
// Monitor memory usage
if (performance.memory) {
    console.log('Memory usage:', performance.memory.usedJSHeapSize);
}