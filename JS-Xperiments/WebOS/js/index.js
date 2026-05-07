// Rabble 3D Character Module
// Entry point for the Rabble character system

// Export main classes for direct use (optional)
window.RabbleCanvas = RabbleCanvas;
window.Rabble = Rabble;
window.RabbleRenderer = RabbleRenderer;
window.AnimationController = AnimationController;

// Export config for customization
window.RabbleConfig = CONFIG;

// Register Web Component immediately
if (typeof customElements !== 'undefined') {
    customElements.define('rabble-canvas', RabbleCanvas);
    console.log('RabbleCanvas Web Component registered immediately');
}

// Initialize when DOM is ready (for standalone usage)
document.addEventListener('DOMContentLoaded', function() {
    // Auto-initialize any rabble-canvas elements on the page
    const canvases = document.querySelectorAll('rabble-canvas');
    canvases.forEach(canvas => {
        if (!canvas.isInitialized) {
            console.log('Auto-initializing rabble-canvas element');
            canvas.connectedCallback();
        }
    });
});