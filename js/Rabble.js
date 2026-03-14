class Rabble {
    constructor(camera) {
        this.group = new THREE.Group();
        this.body = null;
        this.mouth = null;
        this.eyes = null;
        this.particles = null;
        this.animationController = null;
        this.camera = camera;
        this.animations = new Map();

        this.init();
    }

    init() {
        // Create character components using standalone versions
        this.body = new RabbleBody();
        this.mouth = new RabbleMouth();
        this.eyes = new RabbleEyes(this.camera);
        this.particles = new RabbleParticles(CONFIG);

        // Create combined animation controller
        this.animationController = new CombinedAnimationController();

        // Add components to main group
        this.group.add(this.body.getMesh());
        this.group.add(this.mouth.getGroup());
        this.group.add(this.eyes.getGroup());
        this.group.add(this.particles.getMesh());

        // Set up animation controller callbacks
        this.animationController.onBodyUpdate = (deltaTime, driftOffset) => {
            this.body.update(deltaTime, driftOffset);
        };

        this.animationController.onMouthUpdate = (deltaTime, intensity) => {
            this.mouth.update(deltaTime, intensity);
        };

        this.animationController.onEyesUpdate = (deltaTime, position) => {
            this.eyes.update(deltaTime, position);
        };

        this.animationController.onParticlesUpdate = (deltaTime) => {
            this.particles.update(deltaTime);
        };

        // Position the character
        this.group.position.set(
            CONFIG.character.position.x,
            CONFIG.character.position.y,
            CONFIG.character.position.z
        );

        this.group.scale.set(
            CONFIG.character.scale,
            CONFIG.character.scale,
            CONFIG.character.scale
        );
    }

    update(deltaTime) {
        // Update animation controller (handles both state machine and keyframe animations)
        this.animationController.update(deltaTime);
    }

    // Public API methods - state machine
    speak() {
        this.animationController.speak();
    }

    listen() {
        this.animationController.listen();
    }

    stopListening() {
        this.animationController.stopListening();
    }

    react() {
        this.animationController.react();
    }

    lookAt(x, y, z) {
        this.animationController.lookAt(x, y, z);
    }

    // Public API methods - keyframe animation
    loadAnimation(animationData) {
        this.animationController.loadAnimation(animationData);
    }

    playAnimation(name, loop = false) {
        this.animationController.playAnimation(name, loop);
    }

    stopAnimation() {
        this.animationController.stopAnimation();
    }

    // State blending
    blendToState(newState, duration = 0.5) {
        this.animationController.blendToState(newState, duration);
    }

    // Getters for animation system
    getAnimations() {
        return this.animationController.getAnimations();
    }

    getAnimation(name) {
        return this.animationController.getAnimation(name);
    }

    isPlaying() {
        return this.animationController.isPlaying();
    }

    getCurrentState() {
        return this.animationController.getCurrentState();
    }

    getGroup() {
        return this.group;
    }

    dispose() {
        // Dispose of all components
        if (this.body) this.body.dispose();
        if (this.mouth) this.mouth.dispose();
        if (this.eyes) this.eyes.dispose();
        if (this.particles) this.particles.dispose();
    }
}
