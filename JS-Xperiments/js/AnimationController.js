class AnimationController {
    constructor() {
        this.currentState = 'idle';
        this.states = {
            idle: {
                name: 'idle',
                enter: () => this.enterIdle(),
                update: (deltaTime) => this.updateIdle(deltaTime),
                exit: () => this.exitIdle()
            },
            speaking: {
                name: 'speaking',
                enter: () => this.enterSpeaking(),
                update: (deltaTime) => this.updateSpeaking(deltaTime),
                exit: () => this.exitSpeaking()
            },
            listening: {
                name: 'listening',
                enter: () => this.enterListening(),
                update: (deltaTime) => this.updateListening(deltaTime),
                exit: () => this.exitListening()
            },
            reacting: {
                name: 'reacting',
                enter: () => this.enterReacting(),
                update: (deltaTime) => this.updateReacting(deltaTime),
                exit: () => this.exitReacting()
            }
        };

        this.time = 0;
        this.transitionTime = 0;
        this.transitionDuration = 0.5; // seconds

        // Animation parameters
        this.bodyDriftOffset = 0;
        this.mouthIntensity = 1.0;
        this.eyeBlinkTimer = 0;
        this.eyeTargetPosition = { x: 0, y: 0, z: 0 };
        this.eyeCurrentPosition = { x: 0, y: 0, z: 0 };

        // Callbacks for different systems
        this.onBodyUpdate = null;
        this.onMouthUpdate = null;
        this.onEyesUpdate = null;
    }

    update(deltaTime) {
        this.time += deltaTime;
        this.transitionTime += deltaTime;

        // Update current state
        if (this.states[this.currentState]) {
            this.states[this.currentState].update(deltaTime);
        }

        // Update animation systems
        this.updateBody(deltaTime);
        this.updateMouth(deltaTime);
        this.updateEyes(deltaTime);
    }

    // State management
    setState(newState) {
        if (this.currentState === newState) return;

        // Exit current state
        if (this.states[this.currentState] && this.states[this.currentState].exit) {
            this.states[this.currentState].exit();
        }

        // Enter new state
        this.currentState = newState;
        this.transitionTime = 0;

        if (this.states[newState] && this.states[newState].enter) {
            this.states[newState].enter();
        }
    }

    // Idle state
    enterIdle() {
        this.mouthIntensity = 1.0;
    }

    updateIdle(deltaTime) {
        // Gentle animations
        this.bodyDriftOffset += deltaTime * CONFIG.animation.idle.bodyDrift;
        this.eyeBlinkTimer += deltaTime;

        // Random blink
        if (this.eyeBlinkTimer > CONFIG.animation.idle.eyeBlink) {
            this.eyeBlinkTimer = 0;
            // Trigger blink animation
        }
    }

    exitIdle() {
        // Reset timers if needed
    }

    // Speaking state
    enterSpeaking() {
        this.mouthIntensity = 2.0;
    }

    updateSpeaking(deltaTime) {
        // More intense mouth animation
        this.mouthIntensity = 2.0 + Math.sin(this.time * 10) * 0.5;
    }

    exitSpeaking() {
        this.mouthIntensity = 1.0;
    }

    // Listening state
    enterListening() {
        this.mouthIntensity = 0.5;
    }

    updateListening(deltaTime) {
        // Subtle listening animation
        this.mouthIntensity = 0.5 + Math.sin(this.time * 2) * 0.2;
    }

    exitListening() {
        this.mouthIntensity = 1.0;
    }

    // Reacting state
    enterReacting() {
        this.mouthIntensity = 1.5;
    }

    updateReacting(deltaTime) {
        // Excited reaction animation
        this.mouthIntensity = 1.5 + Math.sin(this.time * 8) * 0.8;
    }

    exitReacting() {
        this.mouthIntensity = 1.0;
    }

    // System updates
    updateBody(deltaTime) {
        if (this.onBodyUpdate) {
            this.onBodyUpdate(deltaTime, this.bodyDriftOffset);
        }
    }

    updateMouth(deltaTime) {
        if (this.onMouthUpdate) {
            this.onMouthUpdate(deltaTime, this.mouthIntensity);
        }
    }

    updateEyes(deltaTime) {
        // Smooth eye tracking
        const lerpFactor = 1 - Math.exp(-deltaTime * 5); // Smooth interpolation
        this.eyeCurrentPosition.x += (this.eyeTargetPosition.x - this.eyeCurrentPosition.x) * lerpFactor;
        this.eyeCurrentPosition.y += (this.eyeTargetPosition.y - this.eyeCurrentPosition.y) * lerpFactor;
        this.eyeCurrentPosition.z += (this.eyeTargetPosition.z - this.eyeCurrentPosition.z) * lerpFactor;

        if (this.onEyesUpdate) {
            this.onEyesUpdate(deltaTime, this.eyeCurrentPosition);
        }
    }

    // Public API methods
    speak() {
        this.setState('speaking');
        // Auto-return to idle after a delay
        setTimeout(() => {
            if (this.currentState === 'speaking') {
                this.setState('idle');
            }
        }, 2000);
    }

    listen() {
        this.setState('listening');
    }

    react() {
        this.setState('reacting');
        // Auto-return to idle after a delay
        setTimeout(() => {
            if (this.currentState === 'reacting') {
                this.setState('idle');
            }
        }, 1500);
    }

    lookAt(x, y, z) {
        this.eyeTargetPosition = { x, y, z };
    }

    stopListening() {
        if (this.currentState === 'listening') {
            this.setState('idle');
        }
    }
}