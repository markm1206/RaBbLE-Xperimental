class RabbleMouth {
    constructor() {
        this.waveCount = 1;  // Single line mouth
        this.waves = [];
        this.group = new THREE.Group();
        this.time = 0; // hacky way to increment elapsed time for animation. TODO FIX this hack
        this.init();
    }
    
    init() {
        const isPrimary = true; // For the single mouth wave
        const tubeRadius = isPrimary ? 0.06 : 0.04;
        const baseXRange = 1.5;
        const waveform = new Waveform(0, this.waveCount, isPrimary, tubeRadius, baseXRange);
        this.waves.push(waveform);
        this.group.add(waveform.getMesh());
        
        // Position the mouth group at the center of the character - flipped for smile
        this.group.position.set(0, -0.1, 0);
        this.group.scale.set(1.2, 1.2, 1.2);
        
        // Ensure mouth renders on top of particles
        this.group.renderOrder = 10;
    }
    
    // Update the wave animation with pulsing energy effect and oscillating ripples
    update(deltaTime, intensity) {
        this.time += deltaTime;
        if(this.time > 10000) this.time = 0; // Reset time to prevent overflow (hacky)
        this.waves.forEach(waveform => {
            waveform.update(deltaTime, intensity, this.time);
        });
    }
    
    getGroup() {
        return this.group;
    }
    
    dispose() {
        this.waves.forEach(waveform => {
            waveform.dispose();
        });
    }
}
