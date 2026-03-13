class RabbleEyes {
    constructor(camera) {
        this.leftEye = null;
        this.rightEye = null;
        this.group = new THREE.Group();
        this.camera = camera;

        this.init();
    }

    init() {
        // Create left eye (pure white oval with black outline and portal ellipses)
        this.leftEye = this.createLeftEye();
        // Position within center of particle orb body
        this.leftEye.position.set(-0.4, 0, 0);
        this.group.add(this.leftEye);

        // Create right eye (pure white oval with black outline and portal ellipses)
        this.rightEye = this.createRightEye();
        // Position within center of particle orb body
        this.rightEye.position.set(0.4, 0, 0);
        this.group.add(this.rightEye);

        // Position the eyes group at center
        this.group.position.set(0, .6, 0);
        
        // Ensure eyes render on top of particles
        this.group.renderOrder = 10;
    }

    createLeftEye() {
        // Create elliptical eye with portal ellipse below for depth effect
        const xRadius = 0.25; // horizontal radius
        const yRadius = 0.45; // vertical radius - taller than wide like in reference image

        const shape = new THREE.Shape();
        shape.absellipse(0, 0, xRadius, yRadius, 0, Math.PI * 2, false, 0);

        const geometry = new THREE.ShapeGeometry(shape, 32);
        
        // Create portal ellipse below for depth effect (eye appears in front of portal)
        const portalShape = new THREE.Shape();
        portalShape.absellipse(0, 0, xRadius * 1.8, yRadius * 0.35, 0, Math.PI * 2, false, 0); // Wider than tall for portal
        const portalGeo = new THREE.ShapeGeometry(portalShape, 32);
        const portalMat = new THREE.MeshBasicMaterial({
            color: 0x000000, // Black color for the ellipse
            transparent: true,
            opacity: 1.0
        });

        const bottomPortal = new THREE.Mesh(portalGeo, portalMat); // Only bottom portal for left eye

        // Create black outline mesh
        const outlineShape = new THREE.Shape();
        outlineShape.absellipse(0, 0, xRadius * 1.05, yRadius * 1.05, 0, Math.PI * 2, false, 0); // Thin outline for the eye
        const outlineGeo = new THREE.ShapeGeometry(outlineShape, 32);
        const outlineMat = new THREE.MeshBasicMaterial({
            color: 0x000000,
            transparent: true,
            opacity: 1.0
        });
        const outline = new THREE.Mesh(outlineGeo, outlineMat);

        // Create white eye mesh
        const material = new THREE.MeshBasicMaterial({
            color: 0xFFFFFF,
            transparent: true,
            opacity: 1.0
        });

        const eye = new THREE.Mesh(geometry, material);
        eye.userData.type = 'eye';

        // Position portal and outline relative to the main eye
        bottomPortal.position.set(0, -yRadius * 0.9, -0.1); // Position slightly overlapping bottom of eye
        outline.position.set(0, 0, -0.01); // Position outline directly behind the eye

        // Add meshes to eye (farthest back first)
        eye.add(bottomPortal);
        eye.add(outline);
        // The main 'eye' mesh itself is the parent, so it's implicitly rendered on top
        
        return eye;
    }

    createRightEye() {
        // Create elliptical eye with portal ellipse above for depth effect
        const xRadius = 0.25; // horizontal radius
        const yRadius = 0.45; // vertical radius - taller than wide like in reference image

        const shape = new THREE.Shape();
        shape.absellipse(0, 0, xRadius, yRadius, 0, Math.PI * 2, false, 0);

        const geometry = new THREE.ShapeGeometry(shape, 32);
        
        // Create portal ellipse above for depth effect (eye appears in front of portal)
        const portalShape = new THREE.Shape();
        portalShape.absellipse(0, 0, xRadius * 1.8, yRadius * 0.35, 0, Math.PI * 2, false, 0); // Wider than tall for portal
        const portalGeo = new THREE.ShapeGeometry(portalShape, 32);
        const portalMat = new THREE.MeshBasicMaterial({
            color: 0x000000, // Black color for the ellipse
            transparent: true,
            opacity: 1.0
        });

        const topPortal = new THREE.Mesh(portalGeo, portalMat); // Only top portal for right eye

        // Create black outline mesh
        const outlineShape = new THREE.Shape();
        outlineShape.absellipse(0, 0, xRadius * 1.05, yRadius * 1.05, 0, Math.PI * 2, false, 0); // Thin outline for the eye
        const outlineGeo = new THREE.ShapeGeometry(outlineShape, 32);
        const outlineMat = new THREE.MeshBasicMaterial({
            color: 0x000000,
            transparent: true,
            opacity: 1.0
        });
        const outline = new THREE.Mesh(outlineGeo, outlineMat);

        // Create white eye mesh
        const material = new THREE.MeshBasicMaterial({
            color: 0xFFFFFF,
            transparent: true,
            opacity: 1.0
        });

        const eye = new THREE.Mesh(geometry, material);
        eye.userData.type = 'eye';

        // Position portal and outline relative to the main eye
        topPortal.position.set(0, yRadius * 0.9, -0.1); // Position slightly overlapping top of eye
        outline.position.set(0, 0, -0.01); // Position outline directly behind the eye

        // Add meshes to eye (farthest back first)
        eye.add(topPortal);
        eye.add(outline);
        // The main 'eye' mesh itself is the parent, so it's implicitly rendered on top
        
        return eye;
    }
    
    update(deltaTime) {
    }

    getGroup() {
        return this.group;
    }

    dispose() {
        // Dispose of geometries and materials
        [this.leftEye, this.rightEye].forEach(obj => {
            if (obj) {
                obj.geometry?.dispose();
                obj.material?.dispose();
            }
        });
    }
}