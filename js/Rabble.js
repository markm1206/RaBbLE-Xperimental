class Rabble {
    constructor(camera) {
        this.group = new THREE.Group();
        this.body = null;
        this.mouth = null;
        this.eyes = null;
        this.animationController = null;
        this.camera = camera;

        this.init();
    }

    init() {
        // Create character components
        this.body = new RabbleBody();
        this.mouth = new RabbleMouth();
        this.eyes = new RabbleEyes(this.camera);
        this.animationController = new AnimationController();

        // Add components to main group
        this.group.add(this.body.getMesh());
        this.group.add(this.mouth.getGroup());
        this.group.add(this.eyes.getGroup());

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
        // Update animation controller
        this.animationController.update(deltaTime);
    }

    // Public API methods
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

    getGroup() {
        return this.group;
    }

    dispose() {
        // Dispose of all components
        if (this.body) this.body.dispose();
        if (this.mouth) this.mouth.dispose();
        if (this.eyes) this.eyes.dispose();
    }
}