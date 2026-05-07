// RabbleOS Terminal Interface
class RabbleOSTerminal {
    constructor() {
        this.input = document.getElementById('terminal-input');
        this.output = document.getElementById('terminal-output');
        this.history = [];
        this.historyIndex = 0;
        this.rabbleCanvas = null;
        
        this.init();
    }

    init() {
        this.setupInputEvents();
        this.setupCursorBlink();
        this.addWelcomeMessage();
    }

    setupInputEvents() {
        this.input.addEventListener('keydown', (e) => {
            if (e.key === 'Enter') {
                const command = this.input.value.trim();
                if (command) {
                    this.processCommand(command);
                    this.history.push(command);
                    this.historyIndex = this.history.length;
                }
                this.input.value = '';
            } else if (e.key === 'ArrowUp') {
                this.navigateHistory(-1);
            } else if (e.key === 'ArrowDown') {
                this.navigateHistory(1);
            }
        });
    }

    setupCursorBlink() {
        setInterval(() => {
            const cursor = document.getElementById('terminal-cursor');
            if (cursor) {
                cursor.style.opacity = cursor.style.opacity === '0' ? '1' : '0';
            }
        }, 500);
    }

    navigateHistory(direction) {
        if (direction === -1 && this.historyIndex > 0) {
            this.historyIndex--;
            this.input.value = this.history[this.historyIndex];
        } else if (direction === 1 && this.historyIndex < this.history.length - 1) {
            this.historyIndex++;
            this.input.value = this.history[this.historyIndex];
        } else if (direction === 1 && this.historyIndex === this.history.length - 1) {
            this.historyIndex = this.history.length;
            this.input.value = '';
        }
    }

    processCommand(command) {
        this.addMessage(`user@rabbleos:~$ ${command}`, 'command');
        
        const cmd = command.toLowerCase();
        
        if (cmd === 'help') {
            this.showHelp();
        } else if (cmd === 'clear') {
            this.clearTerminal();
        } else if (cmd === 'rabble speak') {
            this.executeRabbleCommand('speak');
        } else if (cmd === 'rabble listen') {
            this.executeRabbleCommand('listen');
        } else if (cmd === 'rabble react') {
            this.executeRabbleCommand('react');
        } else if (cmd === 'rabble idle') {
            this.executeRabbleCommand('idle');
        } else if (cmd.startsWith('rabble lookat')) {
            this.executeLookAtCommand(cmd);
        } else if (cmd === 'test animation') {
            this.openAnimationStudio();
        } else if (cmd === 'system status') {
            this.showSystemStatus();
        } else if (cmd === 'save config') {
            this.saveConfiguration();
        } else if (cmd === 'load config') {
            this.loadConfiguration();
        } else if (cmd === 'test speak') {
            this.testSpeak();
        } else if (cmd === 'test listen') {
            this.testListen();
        } else if (cmd === 'test react') {
            this.testReact();
        } else if (cmd === 'test idle') {
            this.testIdle();
        } else if (cmd === 'test lookat') {
            this.testLookAt();
        } else if (cmd === 'test save') {
            this.testSave();
        } else if (cmd === 'test load') {
            this.testLoad();
        } else {
            this.addMessage(`Command not found: ${command}`, 'error');
            this.addMessage("Type 'help' for available commands", 'info');
        }
    }

    executeRabbleCommand(action) {
        if (this.rabbleCanvas) {
            this.rabbleCanvas[action]();
            this.addMessage(`Command executed: Rabble ${action}`, 'success');
        } else {
            this.addMessage('Error: No Rabble character available', 'error');
        }
    }

    executeLookAtCommand(cmd) {
        const coords = cmd.split(' ').slice(2).map(Number);
        if (coords.length === 3 && coords.every(n => !isNaN(n))) {
            if (this.rabbleCanvas) {
                this.rabbleCanvas.lookAt(coords[0], coords[1], coords[2]);
                this.addMessage(`Command executed: Rabble looking at (${coords[0]}, ${coords[1]}, ${coords[2]})`, 'success');
            } else {
                this.addMessage('Error: No Rabble character available', 'error');
            }
        } else {
            this.addMessage('Error: Usage - rabble lookat x y z', 'error');
        }
    }

    openAnimationStudio() {
        window.open('Extras/animation-studio.html', '_blank');
        this.addMessage('Command executed: Opening animation studio', 'success');
    }

    showSystemStatus() {
        this.addMessage('System Status:', 'info');
        this.addMessage('  OS: RabbleOS 3D v1.0.0', 'info');
        this.addMessage('  AI Core: ONLINE', 'success');
        this.addMessage('  Network: CONNECTED', 'success');
        this.addMessage('  Rabble Character: ' + (this.rabbleCanvas ? 'LOADED' : 'NOT FOUND'), this.rabbleCanvas ? 'success' : 'error');
    }

    saveConfiguration() {
        if (this.rabbleCanvas) {
            this.rabbleCanvas.saveConfiguration('rabbleos_config.json');
            this.addMessage('Configuration saved successfully', 'success');
        } else {
            this.addMessage('Error: No Rabble character to save', 'error');
        }
    }

    loadConfiguration() {
        const input = document.createElement('input');
        input.type = 'file';
        input.accept = 'application/json';
        input.onchange = (e) => {
            const file = e.target.files[0];
            if (file) {
                this.rabbleCanvas.loadConfigurationFromFile(file);
                this.addMessage('Configuration loaded successfully', 'success');
            }
        };
        input.click();
    }

    testSpeak() {
        if (this.rabbleCanvas) {
            this.rabbleCanvas.speak();
            this.addMessage('Test: Rabble speaking', 'success');
        }
    }

    testListen() {
        if (this.rabbleCanvas) {
            this.rabbleCanvas.listen();
            this.addMessage('Test: Rabble listening', 'success');
        }
    }

    testReact() {
        if (this.rabbleCanvas) {
            this.rabbleCanvas.react();
            this.addMessage('Test: Rabble reacting', 'success');
        }
    }

    testIdle() {
        if (this.rabbleCanvas) {
            this.rabbleCanvas.idle();
            this.addMessage('Test: Rabble idling', 'success');
        }
    }

    testLookAt() {
        if (this.rabbleCanvas) {
            const x = Math.random() * 2 - 1;
            const y = Math.random() * 2 - 1;
            const z = Math.random() * 2 - 1;
            this.rabbleCanvas.lookAt(x, y, z);
            this.addMessage(`Test: Rabble looking at (${x.toFixed(2)}, ${y.toFixed(2)}, ${z.toFixed(2)})`, 'success');
        }
    }

    testSave() {
        if (this.rabbleCanvas) {
            this.rabbleCanvas.saveConfiguration('test_config.json');
            this.addMessage('Test: Configuration saved', 'success');
        }
    }

    testLoad() {
        // Create test configuration
        const testConfig = {
            eyes: {
                position: [0, 0, 0],
                scale: [1, 1, 1]
            },
            mouth: {
                position: [0, 0, 0],
                scale: [1, 1, 1],
                waves: [
                    { coeffs: [1, 0.5, 0.2], degree: 3 },
                    { coeffs: [0.8, 0.3, 0.1], degree: 3 }
                ]
            },
            particles: {
                minSize: 0.05,
                maxSize: 0.3,
                opacity: 0.8
            }
        };
        
        this.rabbleCanvas.loadConfigurationFromObject(testConfig);
        this.addMessage('Test: Configuration loaded', 'success');
    }

    showHelp() {
        this.addMessage('Available commands:', 'info');
        this.addMessage('  help                    - Show this help message', 'info');
        this.addMessage('  clear                   - Clear terminal output', 'info');
        this.addMessage('  rabble speak            - Make Rabble speak', 'info');
        this.addMessage('  rabble listen           - Put Rabble in listening mode', 'info');
        this.addMessage('  rabble react            - Trigger Rabble reaction', 'info');
        this.addMessage('  rabble idle             - Put Rabble in idle state', 'info');
        this.addMessage('  rabble lookat x y z     - Make Rabble look at coordinates', 'info');
        this.addMessage('  test animation          - Open animation studio', 'info');
        this.addMessage('  system status           - Show system status', 'info');
        this.addMessage('  save config             - Save current configuration', 'info');
        this.addMessage('  load config             - Load configuration from file', 'info');
        this.addMessage('  test speak              - Test speak function', 'info');
        this.addMessage('  test listen             - Test listen function', 'info');
        this.addMessage('  test react              - Test react function', 'info');
        this.addMessage('  test idle               - Test idle function', 'info');
        this.addMessage('  test lookat             - Test random lookat', 'info');
        this.addMessage('  test save               - Test save function', 'info');
        this.addMessage('  test load               - Test load function', 'info');
    }

    clearTerminal() {
        this.output.innerHTML = '';
        this.addWelcomeMessage();
    }

    addWelcomeMessage() {
        this.addMessage('RabbleOS 3D v1.0.0 initialized', 'success');
        this.addMessage('AI Core Status: ONLINE', 'success');
        this.addMessage('Type \'help\' for available commands', 'info');
        this.addMessage('', 'normal');
        this.addMessage('user@rabbleos:~$ |', 'normal');
    }

    addMessage(message, type = 'normal') {
        const line = document.createElement('div');
        line.className = 'terminal-line';
        
        let color = '#fff';
        if (type === 'error') color = 'var(--rabble-red)';
        else if (type === 'success') color = 'var(--rabble-cyan)';
        else if (type === 'info') color = 'var(--rabble-purple)';
        else if (type === 'command') color = '#888';
        
        line.innerHTML = `<span style="color: ${color}">${message}</span>`;
        this.output.appendChild(line);
        this.output.scrollTop = this.output.scrollHeight;
    }

    setRabbleCanvas(canvas) {
        this.rabbleCanvas = canvas;
    }
}

// Initialize terminal when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.rabbleOSTerminal = new RabbleOSTerminal();
});