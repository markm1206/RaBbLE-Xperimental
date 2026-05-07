class CombinedAnimationController {
    constructor() {
        // State machine states
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

        // Keyframe animation system
        this.animations = new Map();
        this.currentAnimation = null;
        this.animationTime = 0;
        this.isPlaying = false;
        this.loop = false;

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
        this.onParticlesUpdate = null;

        // State blending
        this.blendFactor = 0;
        this.blendTarget = 0;
        this.blendDuration = 0.5; // seconds
        this.blendTime = 0;
    }

    // State machine methods
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
        this.updateParticles(deltaTime);

        // Update keyframe animation if playing
        if (this.isPlaying && this.currentAnimation) {
            this.updateKeyframeAnimation(deltaTime);
        }

        // Update state blending
        if (this.blendTime > 0) {
            this.updateBlend(deltaTime);
        }
    }

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

    // Keyframe animation methods
    loadAnimation(animationData) {
        this.animations.set(animationData.name, animationData);
    }

    playAnimation(name, loop = false) {
        const animation = this.animations.get(name);
        if (!animation) {
            console.warn(`Animation '${name}' not found`);
            return;
        }

        this.currentAnimation = animation;
        this.animationTime = 0;
        this.isPlaying = true;
        this.loop = loop;
    }

    stopAnimation() {
        this.isPlaying = false;
        this.currentAnimation = null;
        this.animationTime = 0;
    }

    updateKeyframeAnimation(deltaTime) {
        this.animationTime += deltaTime;

        // Check if animation is complete
        if (this.animationTime >= this.currentAnimation.duration) {
            if (this.loop) {
                this.animationTime = 0;
            } else {
                this.isPlaying = false;
                this.animationTime = this.currentAnimation.duration;
            }
        }

        const animationData = this.interpolateKeyframes(this.currentAnimation, this.animationTime);
        this.applyAnimationData(animationData);
    }

    interpolateKeyframes(animation, time) {
        const result = {};

        Object.keys(animation.tracks).forEach(trackName => {
            result[trackName] = this.interpolateTrack(animation.tracks[trackName], time);
        });

        return result;
    }

    interpolateTrack(track, time) {
        const keyframes = track.keyframes;
        if (!keyframes || keyframes.length === 0) return {};

        let startFrame = keyframes[0];
        let endFrame = keyframes[keyframes.length - 1];

        for (let i = 0; i < keyframes.length - 1; i++) {
            if (time >= keyframes[i].time && time <= keyframes[i + 1].time) {
                startFrame = keyframes[i];
                endFrame = keyframes[i + 1];
                break;
            }
        }

        // If time is beyond the last keyframe, use the last keyframe
        if (time >= endFrame.time) {
            return { ...endFrame };
        }

        // If time is before the first keyframe, use the first keyframe
        if (time <= startFrame.time) {
            return { ...startFrame };
        }

        // Calculate interpolation factor
        const t = (time - startFrame.time) / (endFrame.time - startFrame.time);

        // Interpolate numeric properties
        const result = {};
        Object.keys(startFrame).forEach(key => {
            if (key === 'time') return;

            const startValue = startFrame[key];
            const endValue = endFrame[key];

            if (typeof startValue === 'number' && typeof endValue === 'number') {
                result[key] = startValue + (endValue - startValue) * t;
            } else {
                result[key] = endValue; // For non-numeric properties, use end value
            }
        });

        return result;
    }

    applyAnimationData(animationData) {
        // Apply animation data to components
        if (animationData.mouth) {
            this.mouthIntensity = animationData.mouth.intensity || this.mouthIntensity;
        }
        if (animationData.eyes) {
            this.eyeTargetPosition.x = animationData.eyes.x || this.eyeTargetPosition.x;
            this.eyeTargetPosition.y = animationData.eyes.y || this.eyeTargetPosition.y;
            this.eyeTargetPosition.z = animationData.eyes.z || this.eyeTargetPosition.z;
            this.eyeBlinkTimer = animationData.eyes.blink ? 0 : this.eyeBlinkTimer;
        }
        if (animationData.particles) {
            // Apply particle animation data
        }
        if (animationData.body) {
            this.bodyDriftOffset = animationData.body.driftOffset || this.bodyDriftOffset;
        }
    }

    // State blending methods
    blendToState(newState, duration = 0.5) {
        this.blendTarget = newState;
        this.blendDuration = duration;
        this.blendTime = 0;
        this.blendFactor = 0;
    }

    updateBlend(deltaTime) {
        this.blendTime += deltaTime;
        this.blendFactor = Math.min(this.blendTime / this.blendDuration, 1);

        if (this.blendFactor >= 1) {
            this.setState(this.blendTarget);
            this.blendTime = 0;
        }
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

    updateParticles(deltaTime) {
        if (this.onParticlesUpdate) {
            this.onParticlesUpdate(deltaTime);
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

    stopListening() {
        if (this.currentState === 'listening') {
            this.setState('idle');
        }
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

    // Getters and setters for animation systems
    getAnimations() {
        return Array.from(this.animations.keys());
    }

    getAnimation(name) {
        return this.animations.get(name);
    }

    isPlaying() {
        return this.isPlaying;
    }

    getCurrentState() {
        return this.currentState;
    }

    // State definitions
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
}
