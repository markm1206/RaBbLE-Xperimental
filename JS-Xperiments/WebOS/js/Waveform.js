class Waveform {
    constructor(index, waveCount, isPrimary, tubeRadius, baseXRange) {
        this.index = index;
        this.waveCount = waveCount;
        this.isPrimary = isPrimary;
        this.tubeRadius = tubeRadius;
        this.baseXRange = baseXRange;
        this.phaseOffset = index * Math.PI / this.waveCount;
        this.mesh = this.createMesh();
    }

    createMesh() {
        const { geometry } = this._buildPeriodicWaveTube(this.tubeRadius, this.baseXRange);
        const material = new THREE.MeshBasicMaterial({
            color: 0x00FFFF,
            transparent: true,
            opacity: 0.9,
            fog: false,
            emissive: 0x0088AA,
            emissiveIntensity: this.isPrimary ? 1.5 : 0.8
        });
        const tube = new THREE.Mesh(geometry, material);
        return tube;
    }

    _buildPeriodicWaveTube(tubeRadius, xRange) {
        const samples = 200;
        const points = [];

        for (let i = 0; i <= samples; i++) {
            const t = i / samples;
            const x = -xRange + t * (2 * xRange);
            const normalizedX = (x + xRange) / (2 * xRange);
            const width = 1.8;
            const baseHeight = -0.6;
            const curve = 1 - Math.abs(x) / width;
            let rippleAmplitude = 0;

            if (normalizedX > 0.1 && normalizedX < 0.9) {
                const ripplePositionInMiddle = (normalizedX - 0.1) / 0.8;
                const ripple1 = Math.sin(ripplePositionInMiddle * Math.PI * 8 + ripplePositionInMiddle * 2) * 0.15;
                const ripple2 = Math.sin(ripplePositionInMiddle * Math.PI * 4 - ripplePositionInMiddle * 1.5) * 0.1;
                const ripple3 = Math.sin(ripplePositionInMiddle * Math.PI * 2 + ripplePositionInMiddle * 0.8) * 0.08;
                rippleAmplitude = ripple1 + ripple2 + ripple3;
            }
            const y = (curve * baseHeight) + rippleAmplitude;
            points.push(new THREE.Vector3(x, y, 0));
        }

        const curveObj = new THREE.CatmullRomCurve3(points);
        const geometry = new THREE.TubeGeometry(curveObj, Math.max(16, samples), tubeRadius, 8, false);
        return { geometry, points };
    }

    update(deltaTime, intensity, globalTime) {
        const wavePhase = this.phaseOffset + deltaTime * 8;

        const pulse = Math.sin(wavePhase * 0.3) * 0.25 * intensity;
        const scaleY = 0.9 + pulse;

        const yPos = Math.sin(wavePhase * 0.4) * 0.12 * intensity;
        const rotationZ = Math.sin(wavePhase) * 0.05;
        const xPulse = Math.sin(wavePhase * 0.2) * 0.03 * intensity;

        const samples = 200;
        const newPoints = [];

        for (let i = 0; i <= samples; i++) {
            const t = i / samples;
            const x = -this.baseXRange + t * (2 * this.baseXRange);
            const normalizedX = (x + this.baseXRange) / (2 * this.baseXRange);
            const width = 1.8;
            const baseHeight = -0.6;
            const curve = 1 - Math.abs(x) / width;
            let rippleAmplitude = 0;

            if (normalizedX > 0.1 && normalizedX < 0.9) {
                const ripplePositionInMiddle = (normalizedX - 0.1) / 0.8;
                const phaseShift = Math.sin(globalTime + this.index * Math.PI) * 2;

                const ripple1 = Math.sin(globalTime + ripplePositionInMiddle * Math.PI * 8 + ripplePositionInMiddle * 2 + phaseShift) * 0.15;
                const ripple2 = Math.sin(globalTime + ripplePositionInMiddle * Math.PI * 4 - ripplePositionInMiddle * 1.5 + phaseShift * 0.7) * 0.1;
                const ripple3 = Math.sin(globalTime + ripplePositionInMiddle * Math.PI * 2 + ripplePositionInMiddle * 0.8 + phaseShift * 0.4) * 0.08;
                rippleAmplitude = ripple1 + ripple2 + ripple3;
            }
            const y = (curve * baseHeight) + rippleAmplitude;
            newPoints.push(new THREE.Vector3(x, y, 0));
        }

        // Dispose of the old geometry before creating a new one
        if (this.mesh.geometry) {
            this.mesh.geometry.dispose();
        }

        const curveObj = new THREE.CatmullRomCurve3(newPoints);
        const newGeometry = new THREE.TubeGeometry(curveObj, Math.max(16, samples), this.tubeRadius, 8, false);

        this.mesh.geometry = newGeometry;

        this.mesh.position.y = yPos;
        this.mesh.rotation.z = rotationZ;
        this.mesh.scale.x = 1.0 + xPulse;
        this.mesh.scale.y = scaleY;
    }

    getMesh() {
        return this.mesh;
    }

    dispose() {
        if (this.mesh) {
            this.mesh.geometry.dispose();
            this.mesh.material.dispose();
        }
    }
}
