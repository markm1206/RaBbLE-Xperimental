# RabbleOS 3D - Editor Application Documentation

## Overview

The RabbleOS Editor is a visual interface for testing and configuring the Rabble render engine. It provides real-time controls for all Rabble parameters, test functions, and configuration management. The editor serves as the primary workspace for fine-tuning the 3D character's appearance and behavior.

## Features

### Core Functionality
- **Real-time Controls**: Live parameter adjustment with immediate visual feedback
- **Test Functions**: Direct access to all Rabble animation states
- **Configuration Management**: Save and load complete system configurations
- **Integration**: Seamless integration with terminal commands and broadcast system
- **Animation Studio Access**: Direct access to advanced animation tools

### User Interface
- **Control Grid**: Organized layout of sliders and buttons
- **Status Display**: Real-time feedback on parameter changes
- **Cyberpunk Aesthetic**: Purple/cyan theme matching Rabble Energy style
- **Responsive Design**: Adapts to different screen sizes

## Control Categories

### Mouth Controls

#### Mouth Intensity Slider
- **Range**: 0.0 to 3.0
- **Default**: 1.0
- **Effect**: Controls the intensity of mouth waveforms
- **Real-time**: Updates immediately as slider moves
- **Visual Feedback**: Waveform amplitude changes in real-time

#### Wave Amplitude Slider
- **Range**: 0.0 to 2.0
- **Default**: 0.5
- **Effect**: Controls the amplitude of wave animations
- **Real-time**: Updates immediately as slider moves
- **Visual Feedback**: Wave height and movement intensity changes

### Eye Controls

#### Eye X Position Slider
- **Range**: -2.0 to 2.0
- **Default**: 0.0
- **Effect**: Controls horizontal eye movement
- **Real-time**: Updates immediately as slider moves
- **Visual Feedback**: Eyes move left/right in 3D space

#### Eye Y Position Slider
- **Range**: -2.0 to 2.0
- **Default**: 0.0
- **Effect**: Controls vertical eye movement
- **Real-time**: Updates immediately as slider moves
- **Visual Feedback**: Eyes move up/down in 3D space

### Particle Controls

#### Particle Size Slider
- **Range**: 0.05 to 1.0
- **Default**: 0.1
- **Effect**: Controls the size of energy particles
- **Real-time**: Updates immediately as slider moves
- **Visual Feedback**: Particle size changes in the energy body

#### Particle Opacity Slider
- **Range**: 0.0 to 1.0
- **Default**: 0.5
- **Effect**: Controls particle transparency
- **Real-time**: Updates immediately as slider moves
- **Visual Feedback**: Energy body transparency changes

### Test Actions

#### Test Speak Button
- **Function**: Triggers speaking animation
- **Effect**: Same as `rabble speak` command
- **Visual Feedback**: Intense mouth waveforms and particle movement
- **Status**: Shows "Test: Rabble speaking"

#### Test Listen Button
- **Function**: Triggers listening animation
- **Effect**: Same as `rabble listen` command
- **Visual Feedback**: Subtle particle effects and gentle animations
- **Status**: Shows "Test: Rabble listening"

#### Test React Button
- **Function**: Triggers reaction animation
- **Effect**: Same as `rabble react` command
- **Visual Feedback**: Rapid particle movement and excited animation
- **Status**: Shows "Test: Rabble reacting"

#### Test Idle Button
- **Function**: Returns to idle state
- **Effect**: Same as `rabble idle` command
- **Visual Feedback**: Calm, neutral animation state
- **Status**: Shows "Test: Rabble idling"

#### Save Configuration Button
- **Function**: Saves current configuration
- **File**: `rabbleos_editor_config.json`
- **Format**: JSON with all current parameter values
- **Status**: Shows "Configuration saved successfully"

#### Load Configuration Button
- **Function**: Loads configuration from file
- **Process**: Opens file picker for JSON files
- **Format**: JSON with parameter values
- **Status**: Shows "Configuration loaded successfully"

## Technical Implementation

### Class Structure

```javascript
class RabbleOSEditor {
    constructor() {
        this.rabbleCanvas = null;
        this.isInitialized = false;
    }
}
```

### Key Methods

#### `initializeControls()`
Sets up event listeners for all editor controls and test buttons.

#### `setRabbleCanvas(canvas)`
Connects the editor to the Rabble character for control.

#### Parameter Update Methods
```javascript
updateMouthIntensity(value)    // Updates mouth intensity
updateWaveAmplitude(value)     // Updates wave amplitude
updateEyePosition(x, y)        // Updates eye position
updateParticleSize(value)      // Updates particle size
updateParticleOpacity(value)   // Updates particle opacity
```

#### Test Action Methods
```javascript
executeTestAction(action)      // Executes test functions
saveConfiguration()            // Saves current state
loadConfiguration()            // Loads saved state
```

### Integration Points

#### With RabbleCanvas
```javascript
// Direct API calls to Rabble character
updateMouthIntensity(value) {
    if (this.rabbleCanvas) {
        this.rabbleCanvas.setMouthPolynomial(0, [value], 1);
        this.addStatusMessage(`Mouth intensity: ${value}`, 'info');
    }
}
```

#### With RabbleOS
```javascript
// Broadcast message handling
handleBroadcast(type, data) {
    switch (type) {
        case 'terminal_command':
            this.handleTerminalCommand(data);
            break;
        case 'system_status':
            this.updateSystemStatus(data);
            break;
    }
}
```

#### With Terminal
```javascript
// Terminal command handling
handleTerminalCommand(command) {
    if (command.startsWith('editor ')) {
        const action = command.substring(7);
        this.executeTestAction(action);
    }
}
```

## Configuration Management

### Save Format
The editor saves configurations in JSON format:

```json
{
    "eyes": {
        "position": [0, 0, 0],
        "scale": [1, 1, 1]
    },
    "mouth": {
        "position": [0, 0, 0],
        "scale": [1, 1, 1],
        "waves": [
            {
                "coeffs": [1, 0.5, 0.2],
                "degree": 3
            }
        ]
    },
    "particles": {
        "minSize": 0.05,
        "maxSize": 0.3,
        "opacity": 0.8
    }
}
```

### Load Format
The same JSON format is used for loading, allowing complete state restoration.

### Configuration Examples

#### Default Configuration
```json
{
    "eyes": {
        "position": [0, 0, 0],
        "scale": [1, 1, 1]
    },
    "mouth": {
        "position": [0, 0, 0],
        "scale": [1, 1, 1],
        "waves": [
            {
                "coeffs": [1, 0.5, 0.2],
                "degree": 3
            }
        ]
    },
    "particles": {
        "minSize": 0.05,
        "maxSize": 0.3,
        "opacity": 0.5
    }
}
```

#### Intense Animation Configuration
```json
{
    "eyes": {
        "position": [1, 0.5, 0],
        "scale": [1.2, 1.2, 1.2]
    },
    "mouth": {
        "position": [0, 0, 0],
        "scale": [1.5, 1.5, 1.5],
        "waves": [
            {
                "coeffs": [2.5, 1.0, 0.5],
                "degree": 3
            }
        ]
    },
    "particles": {
        "minSize": 0.1,
        "maxSize": 0.6,
        "opacity": 0.9
    }
}
```

## Advanced Features

### Animation Studio Integration
```javascript
openAnimationStudio() {
    window.open('Extras/animation-studio.html', '_blank');
    this.addStatusMessage('Opening animation studio', 'success');
}
```

### Test Configuration
```javascript
createTestConfiguration() {
    const testConfig = {
        // Predefined test configuration
    };
    this.rabbleCanvas.loadConfigurationFromObject(testConfig);
}
```

### Reset to Defaults
```javascript
resetToDefaults() {
    // Reset all controls to default values
    // Return Rabble to idle state
}
```

## Performance Considerations

### Real-time Updates
- **Debouncing**: Slider updates are optimized to prevent excessive API calls
- **Batch Updates**: Multiple parameter changes are batched when possible
- **DOM Optimization**: Minimal DOM manipulation for better performance

### Memory Management
- **Event Cleanup**: Proper cleanup of event listeners
- **Reference Management**: Proper disposal of component references
- **Configuration Limits**: File size limits for configuration files

## User Experience

### Visual Feedback
- **Immediate Updates**: All changes are reflected instantly in the 3D character
- **Status Messages**: Clear feedback on all actions and changes
- **Color Coding**: Status messages use color coding for quick identification

### Accessibility
- **Keyboard Navigation**: All controls accessible via keyboard
- **Screen Reader Support**: Proper ARIA labels and semantic HTML
- **High Contrast**: Color scheme supports accessibility needs

## Integration with Other Components

### Terminal Integration
The editor can receive commands from the terminal:
- `editor speak` - Triggers test speak
- `editor listen` - Triggers test listen
- `editor react` - Triggers test react
- `editor idle` - Triggers test idle

### RabbleOS Integration
The editor receives system status updates and can broadcast messages to other components.

### Animation Studio Integration
Direct access to the advanced animation studio for more complex animation creation.

## Future Enhancements

### Planned Features
1. **Animation Timeline**: Visual timeline for creating complex animations
2. **Keyframe Editor**: Precise control over animation keyframes
3. **Presets**: Save and load animation presets
4. **Export Options**: Export animations in various formats
5. **Collaboration**: Share configurations and animations with others

### Technical Improvements
1. **Performance Optimization**: Further optimization of real-time updates
2. **Mobile Support**: Enhanced mobile interface and touch controls
3. **Offline Support**: Full offline functionality with local storage
4. **Plugin System**: Extensible plugin architecture for custom controls