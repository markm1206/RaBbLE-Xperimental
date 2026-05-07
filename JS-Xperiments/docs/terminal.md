# RabbleOS 3D - Terminal Application Documentation

## Overview

The RabbleOS Terminal is a command-line interface that provides text-based interaction with the operating system and Rabble character. It supports a comprehensive command set for controlling animations, checking system status, and managing configurations.

## Features

### Core Functionality
- **Command Processing**: Real-time processing of 20+ commands
- **Command History**: Arrow key navigation through command history
- **Status Display**: System messages and command responses
- **Integration**: Full integration with Rabble character controls
- **Configuration Management**: Save and load system configurations

### User Interface
- **Cyberpunk Aesthetic**: Purple/cyan color scheme matching Rabble Energy theme
- **Blinking Cursor**: Animated text cursor for terminal feel
- **Status Messages**: Color-coded messages (success, error, info)
- **Command Prompt**: `user@rabbleos:~$` prompt with command history

## Command Reference

### Rabble Control Commands

#### `rabble speak`
**Description**: Trigger speaking animation
**Usage**: `rabble speak`
**Effect**: Makes Rabble's mouth animate with intense waveforms
**Response**: "Command executed: Rabble speaking"

#### `rabble listen`
**Description**: Put Rabble in listening state
**Usage**: `rabble listen`
**Effect**: Subtle listening animation with gentle particle effects
**Response**: "Command executed: Rabble listening"

#### `rabble react`
**Description**: Trigger reaction animation
**Usage**: `rabble react`
**Effect**: Excited reaction with rapid particle movement
**Response**: "Command executed: Rabble reacting"

#### `rabble idle`
**Description**: Return Rabble to idle state
**Usage**: `rabble idle`
**Effect**: Calm, neutral animation state
**Response**: "Command executed: Rabble idling"

### Interaction Commands

#### `rabble lookat x y z`
**Description**: Make Rabble look at specific coordinates
**Usage**: `rabble lookat 1.0 0.5 -0.5`
**Parameters**:
- `x`: Horizontal position (-2 to 2)
- `y`: Vertical position (-2 to 2)
- `z`: Depth position (-2 to 2)
**Effect**: Eyes move to look at the specified 3D coordinates
**Response**: "Command executed: Rabble looking at (1.0, 0.5, -0.5)"

### System Commands

#### `system status`
**Description**: Display system status information
**Usage**: `system status`
**Output**:
```
System Status:
  OS: RabbleOS 3D v1.0.0
  AI Core: ONLINE
  Network: CONNECTED
  Rabble Character: LOADED
```

#### `test animation`
**Description**: Open the animation studio interface
**Usage**: `test animation`
**Effect**: Opens `Extras/animation-studio.html` in a new tab
**Response**: "Command executed: Opening animation studio"

### Configuration Commands

#### `save config`
**Description**: Save current Rabble configuration
**Usage**: `save config`
**Effect**: Downloads current state as `rabbleos_config.json`
**Response**: "Configuration saved successfully"

#### `load config`
**Description**: Load configuration from file
**Usage**: `load config`
**Effect**: Opens file picker to select JSON configuration file
**Response**: "Configuration loaded successfully"

### Testing Commands

#### `test speak`
**Description**: Test speaking function directly
**Usage**: `test speak`
**Effect**: Same as `rabble speak` but for testing purposes
**Response**: "Test: Rabble speaking"

#### `test listen`
**Description**: Test listening function directly
**Usage**: `test listen`
**Effect**: Same as `rabble listen` but for testing purposes
**Response**: "Test: Rabble listening"

#### `test react`
**Description**: Test reaction function directly
**Usage**: `test react`
**Effect**: Same as `rabble react` but for testing purposes
**Response**: "Test: Rabble reacting"

#### `test idle`
**Description**: Test idle function directly
**Usage**: `test idle`
**Effect**: Same as `rabble idle` but for testing purposes
**Response**: "Test: Rabble idling"

#### `test lookat`
**Description**: Test random lookat function
**Usage**: `test lookat`
**Effect**: Randomly moves eyes to random coordinates
**Response**: "Test: Rabble looking at (x, y, z)"

#### `test save`
**Description**: Test save function directly
**Usage**: `test save`
**Effect**: Saves configuration as `test_config.json`
**Response**: "Test: Configuration saved"

#### `test load`
**Description**: Test load function with predefined configuration
**Usage**: `test load`
**Effect**: Loads a predefined test configuration
**Response**: "Test: Configuration loaded"

### Utility Commands

#### `help`
**Description**: Display help information
**Usage**: `help`
**Output**: Complete list of available commands with descriptions

#### `clear`
**Description**: Clear terminal output
**Usage**: `clear`
**Effect**: Clears all text from terminal, shows welcome message

## Technical Implementation

### Class Structure

```javascript
class RabbleOSTerminal {
    constructor() {
        this.input = document.getElementById('terminal-input');
        this.output = document.getElementById('terminal-output');
        this.history = [];
        this.historyIndex = 0;
        this.rabbleCanvas = null;
    }
}
```

### Key Methods

#### `processCommand(command)`
Processes user input and executes appropriate actions based on command parsing.

#### `addMessage(message, type)`
Adds formatted messages to terminal output with color coding:
- `normal`: White text
- `command`: Gray text (user input)
- `error`: Red text
- `success`: Cyan text
- `info`: Purple text

#### `navigateHistory(direction)`
Handles command history navigation with arrow keys.

#### `setupInputEvents()`
Sets up keyboard event handlers for input processing.

### Integration Points

#### With RabbleOS
```javascript
// Terminal receives RabbleCanvas reference from RabbleOS
setRabbleCanvas(canvas) {
    this.rabbleCanvas = canvas;
}
```

#### With RabbleCanvas
```javascript
// Direct method calls to Rabble character
executeRabbleCommand(action) {
    if (this.rabbleCanvas) {
        this.rabbleCanvas[action]();
        this.addMessage(`Command executed: Rabble ${action}`, 'success');
    }
}
```

### Error Handling

#### Command Not Found
```javascript
addMessage(`Command not found: ${command}`, 'error');
addMessage("Type 'help' for available commands", 'info');
```

#### Missing Rabble Character
```javascript
addMessage('Error: No Rabble character available', 'error');
```

#### Invalid Parameters
```javascript
addMessage('Error: Usage - rabble lookat x y z', 'error');
```

## Configuration File Format

### Save Format
The terminal saves configurations in JSON format:

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
The same JSON format is used for loading configurations, allowing users to save and restore complete Rabble states.

## Performance Considerations

### Input Handling
- **Debouncing**: Input processing is optimized to prevent excessive updates
- **History Management**: Command history is limited to prevent memory issues
- **DOM Updates**: Terminal output updates are batched for performance

### Memory Management
- **Event Cleanup**: Proper cleanup of event listeners
- **History Limits**: Command history is capped to prevent memory leaks
- **DOM References**: Proper disposal of DOM references

## Accessibility Features

### Keyboard Navigation
- **Arrow Keys**: Navigate command history
- **Enter**: Execute commands
- **Tab**: Could be extended for command completion

### Screen Reader Support
- **Semantic HTML**: Proper use of semantic elements
- **ARIA Labels**: Screen reader friendly labels
- **High Contrast**: Color scheme supports high contrast modes

## Future Enhancements

### Planned Features
1. **Command Completion**: Tab completion for commands
2. **Aliases**: Custom command aliases
3. **Scripts**: Batch command execution
4. **Themes**: Multiple terminal color schemes
5. **Logging**: Command execution logging
6. **Remote Control**: WebSocket integration for remote control

### API Extensions
1. **Plugin System**: Extensible command system
2. **Event System**: Custom event handling
3. **State Management**: Centralized state management
4. **Undo/Redo**: Command history with undo functionality