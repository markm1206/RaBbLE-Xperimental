// RabbleOS Editor Application
class RabbleOSEditor {
    constructor() {
        this.rabbleCanvas = null;
        this.isInitialized = false;
        
        this.init();
    }

    init() {
        this.setupEventListeners();
        this.initializeControls();
        this.isInitialized = true;
    }

    setupEventListeners() {
        document.addEventListener('DOMContentLoaded', () => {
            this.initializeControls();
        });
    }

    initializeControls() {
        // Set up event listeners for editor controls
        const controls = {
            mouthIntensity: document.getElementById('editor-mouth-intensity'),
            waveAmp: document.getElementById('editor-wave-amp'),
            eyeX: document.getElementById('editor-eye-x'),
            eyeY: document.getElementById('editor-eye-y'),
            particleSize: document.getElementById('editor-particle-size'),
            particleOpacity: document.getElementById('editor-particle-opacity')
        };

        // Mouth controls
        if (controls.mouthIntensity) {
            controls.mouthIntensity.addEventListener('input', (e) => {
                this.updateMouthIntensity(parseFloat(e.target.value));
            });
        }

        if (controls.waveAmp) {
            controls.waveAmp.addEventListener('input', (e) => {
                this.updateWaveAmplitude(parseFloat(e.target.value));
            });
        }

        // Eye controls
        if (controls.eyeX) {
            controls.eyeX.addEventListener('input', (e) => {
                this.updateEyePosition(parseFloat(e.target.value), null);
            });
        }

        if (controls.eyeY) {
            controls.eyeY.addEventListener('input', (e) => {
                this.updateEyePosition(null, parseFloat(e.target.value));
            });
        }

        // Particle controls
        if (controls.particleSize) {
            controls.particleSize.addEventListener('input', (e) => {
                this.updateParticleSize(parseFloat(e.target.value));
            });
        }

        if (controls.particleOpacity) {
            controls.particleOpacity.addEventListener('input', (e) => {
                this.updateParticleOpacity(parseFloat(e.target.value));
            });
        }

        // Test buttons
        const testButtons = {
            speak: document.getElementById('editor-test-speak'),
            listen: document.getElementById('editor-test-listen'),
            react: document.getElementById('editor-test-react'),
            idle: document.getElementById('editor-test-idle'),
            save: document.getElementById('editor-test-save'),
            load: document.getElementById('editor-test-load')
        };

        Object.entries(testButtons).forEach(([action, button]) => {
            if (button) {
                button.addEventListener('click', () => {
                    this.executeTestAction(action);
                });
            }
        });
    }

    setRabbleCanvas(canvas) {
        this.rabbleCanvas = canvas;
        if (this.rabbleCanvas) {
            this.addStatusMessage('Editor connected to Rabble character', 'success');
        }
    }

    updateMouthIntensity(value) {
        if (this.rabbleCanvas) {
            this.rabbleCanvas.setMouthPolynomial(0, [value], 1);
            this.addStatusMessage(`Mouth intensity: ${value}`, 'info');
        }
    }

    updateWaveAmplitude(value) {
        if (this.rabbleCanvas) {
            this.rabbleCanvas.setParticleSizeRange(0.05, value);
            this.addStatusMessage(`Wave amplitude: ${value}`, 'info');
        }
    }

    updateEyePosition(x, y) {
        if (this.rabbleCanvas) {
            // Get current values if not provided
            const currentX = x !== null ? x : parseFloat(document.getElementById('editor-eye-x')?.value || 0);
            const currentY = y !== null ? y : parseFloat(document.getElementById('editor-eye-y')?.value || 0);
            
            this.rabbleCanvas.lookAt(currentX, currentY, 0);
            this.addStatusMessage(`Eye position: (${currentX.toFixed(2)}, ${currentY.toFixed(2)})`, 'info');
        }
    }

    updateParticleSize(value) {
        if (this.rabbleCanvas) {
            this.rabbleCanvas.setParticleSizeRange(0.05, value);
            this.addStatusMessage(`Particle size: ${value}`, 'info');
        }
    }

    updateParticleOpacity(value) {
        if (this.rabbleCanvas) {
            this.rabbleCanvas.setParticleOpacity(value);
            this.addStatusMessage(`Particle opacity: ${value}`, 'info');
        }
    }

    executeTestAction(action) {
        if (!this.rabbleCanvas) {
            this.addStatusMessage('Error: No Rabble character available', 'error');
            return;
        }

        switch (action) {
            case 'speak':
                this.rabbleCanvas.speak();
                this.addStatusMessage('Test: Rabble speaking', 'success');
                break;
            case 'listen':
                this.rabbleCanvas.listen();
                this.addStatusMessage('Test: Rabble listening', 'success');
                break;
            case 'react':
                this.rabbleCanvas.react();
                this.addStatusMessage('Test: Rabble reacting', 'success');
                break;
            case 'idle':
                this.rabbleCanvas.idle();
                this.addStatusMessage('Test: Rabble idling', 'success');
                break;
            case 'save':
                this.saveConfiguration();
                break;
            case 'load':
                this.loadConfiguration();
                break;
            default:
                this.addStatusMessage(`Unknown test action: ${action}`, 'error');
        }
    }

    saveConfiguration() {
        if (this.rabbleCanvas) {
            this.rabbleCanvas.saveConfiguration('rabbleos_editor_config.json');
            this.addStatusMessage('Configuration saved successfully', 'success');
        } else {
            this.addStatusMessage('Error: No Rabble character to save', 'error');
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
                this.addStatusMessage('Configuration loaded successfully', 'success');
            }
        };
        input.click();
    }

    addStatusMessage(message, type = 'normal') {
        const status = document.getElementById('editor-status');
        if (status) {
            status.innerHTML = `<span style="color: ${this.getStatusColor(type)}">${message}</span>`;
        }
    }

    getStatusColor(type) {
        switch (type) {
            case 'error': return 'var(--rabble-red)';
            case 'success': return 'var(--rabble-cyan)';
            case 'info': return 'var(--rabble-purple)';
            default: return '#888';
        }
    }

    // Inter-Window Communication Handler
    handleBroadcast(type, data) {
        switch (type) {
            case 'terminal_command':
                this.handleTerminalCommand(data);
                break;
            case 'system_status':
                this.updateSystemStatus(data);
                break;
            default:
                // Ignore other broadcast types
                break;
        }
    }

    handleTerminalCommand(command) {
        // Handle terminal commands that affect the editor
        if (command.startsWith('editor ')) {
            const action = command.substring(7); // Remove 'editor ' prefix
            this.executeTestAction(action);
        }
    }

    updateSystemStatus(status) {
        // Update editor UI with system status if needed
        const statusElement = document.getElementById('editor-system-status');
        if (statusElement) {
            statusElement.innerHTML = `
                <div>OS: ${status.os}</div>
                <div>AI Core: ${status.aiCore}</div>
                <div>Rabble: ${status.rabbleCharacter}</div>
            `;
        }
    }

    // Animation Studio Integration
    openAnimationStudio() {
        window.open('Extras/animation-studio.html', '_blank');
        this.addStatusMessage('Opening animation studio', 'success');
    }

    // Advanced Editor Features
    createTestConfiguration() {
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
        
        if (this.rabbleCanvas) {
            this.rabbleCanvas.loadConfigurationFromObject(testConfig);
            this.addStatusMessage('Test configuration loaded', 'success');
        }
    }

    resetToDefaults() {
        if (this.rabbleCanvas) {
            // Reset all controls to default values
            const controls = {
                mouthIntensity: document.getElementById('editor-mouth-intensity'),
                waveAmp: document.getElementById('editor-wave-amp'),
                eyeX: document.getElementById('editor-eye-x'),
                eyeY: document.getElementById('editor-eye-y'),
                particleSize: document.getElementById('editor-particle-size'),
                particleOpacity: document.getElementById('editor-particle-opacity')
            };

            if (controls.mouthIntensity) controls.mouthIntensity.value = '1.0';
            if (controls.waveAmp) controls.waveAmp.value = '0.5';
            if (controls.eyeX) controls.eyeX.value = '0';
            if (controls.eyeY) controls.eyeY.value = '0';
            if (controls.particleSize) controls.particleSize.value = '0.1';
            if (controls.particleOpacity) controls.particleOpacity.value = '0.5';

            // Reset Rabble to idle state
            this.rabbleCanvas.idle();
            this.addStatusMessage('Editor reset to defaults', 'success');
        }
    }
}

// Initialize Editor when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.rabbleOSEditor = new RabbleOSEditor();
});