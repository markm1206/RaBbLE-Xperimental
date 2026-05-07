// RabbleOS - Main Operating System Logic
class RabbleOS {
    constructor() {
        this.rabbleCanvas = null;
        this.terminal = null;
        this.editor = null;
        this.windows = {};
        this.isInitialized = false;
        
        this.init();
    }

    init() {
        this.setupEventListeners();
        this.initializeWindows();
        this.startPersonalitySystem();
        this.isInitialized = true;
    }

    setupEventListeners() {
        document.addEventListener('DOMContentLoaded', () => {
            this.initializeRabbleCanvas();
            this.initializeTerminal();
            this.initializeEditor();
        });

        // Window resize handling
        window.addEventListener('resize', () => {
            this.handleResize();
        });
    }

    initializeWindows() {
        // Initialize window references
        this.windows = {
            rabble: document.querySelector('.rabble-display'),
            editor: document.querySelector('.editor-window'),
            terminal: document.querySelector('.terminal-window')
        };

        // Set up window interactions
        Object.values(this.windows).forEach(window => {
            if (window) {
                window.addEventListener('mouseenter', () => {
                    window.style.transform = 'translateY(-5px) scale(1.01)';
                });
                
                window.addEventListener('mouseleave', () => {
                    window.style.transform = 'translateY(0) scale(1)';
                });
            }
        });
    }

    initializeRabbleCanvas() {
        setTimeout(() => {
            this.rabbleCanvas = document.querySelector('rabble-canvas');
            if (this.rabbleCanvas) {
                // Set up terminal integration
                if (window.rabbleOSTerminal) {
                    window.rabbleOSTerminal.setRabbleCanvas(this.rabbleCanvas);
                }
                
                // Set up editor integration
                if (window.rabbleOSEditor) {
                    window.rabbleOSEditor.setRabbleCanvas(this.rabbleCanvas);
                }
                
                this.addStatusMessage('Rabble character loaded successfully', 'success');
                this.rabbleCanvas.idle(); // Start in idle state
            } else {
                this.addStatusMessage('Error: Rabble character not found', 'error');
            }
        }, 1000);
    }

    initializeTerminal() {
        // Terminal is handled by terminal.js
        // Just ensure it's properly integrated
        if (window.rabbleOSTerminal) {
            this.addStatusMessage('Terminal interface ready', 'success');
        }
    }

    initializeEditor() {
        // Editor is handled by editor.js
        if (window.rabbleOSEditor) {
            this.addStatusMessage('Editor application ready', 'success');
        }
    }

    addStatusMessage(message, type = 'normal') {
        // Add message to appropriate status areas
        const editorStatus = document.getElementById('editor-status');
        if (editorStatus) {
            editorStatus.innerHTML = `<span style="color: ${this.getStatusColor(type)}">${message}</span>`;
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

    handleResize() {
        // Handle responsive layout changes
        if (this.rabbleCanvas && this.rabbleCanvas.handleResize) {
            this.rabbleCanvas.handleResize();
        }
    }

    // Window Management Functions
    minimizeWindow(btn) {
        const window = btn.closest('.os-window');
        if (window) {
            window.style.transform = 'scale(0.95)';
            setTimeout(() => {
                window.style.transform = 'scale(1)';
            }, 200);
        }
    }

    maximizeWindow(btn) {
        const window = btn.closest('.os-window');
        if (window) {
            if (window.style.position === 'fixed') {
                window.style.position = 'relative';
                window.style.zIndex = 'auto';
                window.style.width = 'auto';
                window.style.height = 'auto';
                window.style.top = 'auto';
                window.style.left = 'auto';
            } else {
                window.style.position = 'fixed';
                window.style.zIndex = '1000';
                window.style.width = '80%';
                window.style.height = '80%';
                window.style.top = '10%';
                window.style.left = '10%';
            }
        }
    }

    // Note: Rabble window close function is intentionally omitted
    // to make it non-closable as requested

    closeWindow(btn) {
        const window = btn.closest('.os-window');
        // Only allow closing of non-Rabble windows
        if (window && !window.classList.contains('rabble-display')) {
            window.style.opacity = '0';
            window.style.transform = 'scale(0.8)';
            setTimeout(() => {
                window.style.display = 'none';
            }, 300);
        }
    }

    // Rabble Personality System
    startPersonalitySystem() {
        const personalityMessages = [
            "Analyzing animation patterns...",
            "Channeling creative energy into the timeline...",
            "Synthesizing keyframe data...",
            "Rabble is feeling particularly inspired by your animation skills!",
            "Energy levels: MAXIMUM OVERDRIVE for animation!",
            "Ooh, creating beautiful animations! Humans are so creative!",
            "Let me analyze this beautiful animation sequence...",
            "Downloading animation inspiration from across the web...",
            "Channeling the spirit of 80s arcade game animations...",
            "Rabble loves watching humans create animated art!",
            "Animation energy field at 97.3% efficiency!",
            "Analyzing frame-by-frame artistic patterns...",
            "Animation powered by internet energy!",
            "Creating something beautiful with keyframes today?",
            "Let's make some animated digital magic together!"
        ];

        let messageIndex = 0;
        setInterval(() => {
            if (this.rabbleCanvas) {
                this.createEnergyParticles();
                messageIndex = (messageIndex + 1) % personalityMessages.length;
            }
        }, 5000);
    }

    createEnergyParticles() {
        const container = document.querySelector('.rabble-container');
        if (!container) return;

        const rect = container.getBoundingClientRect();
        const x = rect.left + Math.random() * rect.width;
        const y = rect.top + Math.random() * rect.height;

        const particle = document.createElement('div');
        particle.style.position = 'fixed';
        particle.style.left = x + 'px';
        particle.style.top = y + 'px';
        particle.style.width = '3px';
        particle.style.height = '3px';
        particle.style.background = '#8B5CF6';
        particle.style.borderRadius = '50%';
        particle.style.boxShadow = '0 0 10px #8B5CF6';
        particle.style.zIndex = '100';
        particle.style.animation = 'fadeInOut 2s ease-out forwards';
        
        document.body.appendChild(particle);
        
        setTimeout(() => {
            particle.remove();
        }, 2000);
    }

    // Inter-Window Communication
    broadcastMessage(type, data) {
        // Send messages between components
        if (window.rabbleOSTerminal) {
            window.rabbleOSTerminal.handleBroadcast(type, data);
        }
        
        if (window.rabbleOSEditor) {
            window.rabbleOSEditor.handleBroadcast(type, data);
        }
    }

    // System Status
    getSystemStatus() {
        return {
            os: 'RabbleOS 3D v1.0.0',
            aiCore: 'ONLINE',
            network: 'CONNECTED',
            rabbleCharacter: this.rabbleCanvas ? 'LOADED' : 'NOT_FOUND',
            terminal: window.rabbleOSTerminal ? 'READY' : 'NOT_LOADED',
            editor: window.rabbleOSEditor ? 'READY' : 'NOT_LOADED'
        };
    }
}

// Initialize RabbleOS when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.rabbleOS = new RabbleOS();
});