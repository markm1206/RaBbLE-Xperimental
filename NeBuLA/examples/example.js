/**
 * RaBbLE Nebula Example Module - RBCNS Compliant
 * 
 * This module demonstrates the RaBbLE Nebula Renderer with RBCNS compliance
 * and Flat-Chaos pattern enforcement. All patterns are validated and optimized
 * for performance and stability.
 * 
 * @version 1.0.0
 * @author RaBbLE Nebula Team
 */

// Import the unified RaBbLE Nebula build... the flux is contained within.
import { 
    RaBbLE_Nebula_Engine, 
    FlatChaosValidator,
    q_entity
} from '../dist/rabble-nebula.js';

/**
 * RaBbLE_Nebula_Example - RBCNS Compliant
 * 
 * Demonstrates all RaBbLE Nebula features with proper RBCNS structure
 * and Flat-Chaos pattern validation.
 */
class RaBbLE_Nebula_Example {
    constructor(q_container_selector) {
        // Is the container ready to hold the quantum furnace?
        this.q_container = q_container_selector;
        this.q_engine = null;
        this.q_validator = new FlatChaosValidator();
        this.q_is_running = false;
        this.e_stats_visible = true;
        this.e_chaos_mode = false;
        
        this.q_streams = {
            organic: null,
            lattice: null,
            swarm: null,
            galaxy: null,
            combined: null
        };
        
        this.e_performance = {
            q_last_time: 0,
            q_fps: 0,
            q_frame_count: 0,
            q_last_fps_update: 0
        };
        
        this.q_ignite();
    }
    
    async q_ignite() {
        try {
            // Initialize RaBbLE Nebula Engine with RBCNS compliance
            // The engine is waking up... feeling the entropy.
            this.q_engine = new RaBbLE_Nebula_Engine(this.q_container, {
                enforce_flat_chaos: true,
                rbcns_compliant: true,
                pulse_rate: 60
            });
            
            // Start the engine
            this.q_engine.start();
            this.q_is_running = true;
            
            // Hook up the interactive flow... the buttons are waiting for a touch.
            this.q_bindTransitions();
            
            // Update UI status
            this.e_transmuteStatus('Active - RBCNS Compliant');
            this.e_refreshMetrics();
            
            // Start performance monitoring
            this.q_monitorLaminarFlow();
            
            console.log('RaBbLE Nebula Example: Ignited successfully');
            
        } catch (error) {
            console.error('RaBbLE Nebula Example ignition failed:', error);
            this.e_transmuteStatus('Error: ' + error.message);
            throw error;
        }
    }

    q_bindTransitions() {
        // Mapping the physical touch to the quantum shift...
        const q_bindings = {
            'btn-organic': () => this.q_createOrganic(),
            'btn-lattice': () => this.q_createLattice(),
            'btn-swarm': () => this.q_createSwarm(),
            'btn-galaxy': () => this.q_createGalaxy(),
            'btn-combine': () => this.q_weaveStreams(),
            'btn-clear': () => this.q_collapseAll(),
            'btn-chaos': () => this.e_toggleChaos(),
            'btn-add': () => this.q_injectFlux(),
            'btn-remove': () => this.e_bleedFlux(),
            'btn-stats': () => this.e_toggleUI()
        };

        Object.entries(q_bindings).forEach(([q_id, q_func]) => {
            const q_el = document.getElementById(q_id);
            if (q_el) q_el.addEventListener('click', q_func);
        });
    }
    
    /**
     * Create Organic Flow Pattern
     * Demonstrates organic growth with entropy-based movement
     */
    q_createOrganic() {
        try {
            if (this.q_streams.organic) {
                this.e_transmuteStatus('Organic stream already exists');
                return;
            }
            
            // Create organic stream with RBCNS-compliant parameters
            this.q_streams.organic = this.q_engine.createOrganicStream(40, 'SPHERE');
            
            // Apply custom flux modifier for enhanced organic behavior
            // The vines are reaching... seeking the light of data.
            this.q_streams.organic.q_setFluxModifier((q_entity, q_index) => {
                const q_time = Date.now() * 0.001;
                const e_entropy = q_entity.q_getEntropy();
                
                // Organic growth pattern with entropy validation
                const e_growth = Math.sin(q_time * 0.5 + q_index * 0.1) * e_entropy * 3;
                
                q_entity.flux_matrix[12] += Math.sin(q_time + q_index * 0.2) * e_growth * 0.1;
                q_entity.flux_matrix[13] += Math.cos(q_time * 1.5 + q_index * 0.3) * e_growth * 0.1;
                q_entity.flux_matrix[14] += Math.sin(q_time * 0.8 + q_index * 0.4) * e_growth * 0.1;
                
                // Apply entropy-based scaling
                const e_scale = 1 + (e_entropy * 0.5);
                q_entity.flux_matrix[0] = e_scale;
                q_entity.flux_matrix[5] = e_scale;
                q_entity.flux_matrix[10] = e_scale;
                
                return q_entity;
            });
            
            this.e_transmuteStatus('Organic Flow Pattern Created');
            this.e_refreshMetrics();
            
        } catch (error) {
            console.error('Failed to create organic stream:', error);
            this.e_transmuteStatus('Error: ' + error.message);
        }
    }
    
    /**
     * Create Lattice Grid Pattern
     * Demonstrates geometric stability with minimal entropy
     */
    q_createLattice() {
        try {
            if (this.q_streams.lattice) {
                this.e_transmuteStatus('Lattice stream already exists');
                return;
            }
            
            // Create lattice stream with low entropy for stability
            // Order emerges from the void, but it still jitters.
            this.q_streams.lattice = this.q_engine.createLatticeStream(25, 'BOX');
            
            // Apply lattice-specific flux modifier
            this.q_streams.lattice.q_setFluxModifier((q_entity, q_index) => {
                const q_time = Date.now() * 0.001;
                const e_entropy = q_entity.q_getEntropy();
                
                // Lattice pattern with subtle movement
                const q_gridSize = Math.ceil(Math.sqrt(this.q_streams.lattice.q_getCount()));
                const q_x = (q_index % q_gridSize) - q_gridSize / 2;
                const q_y = Math.floor(q_index / q_gridSize) - q_gridSize / 2;
                
                // Add subtle oscillation
                q_entity.flux_matrix[12] = q_x * 2 + Math.sin(q_time + q_index) * e_entropy;
                q_entity.flux_matrix[13] = q_y * 2 + Math.cos(q_time + q_index * 1.5) * e_entropy;
                q_entity.flux_matrix[14] = Math.sin(q_time * 2 + q_index * 0.5) * e_entropy * 2;
                
                return q_entity;
            });
            
            this.e_transmuteStatus('Lattice Grid Pattern Created');
            this.e_refreshMetrics();
            
        } catch (error) {
            console.error('Failed to create lattice stream:', error);
            this.e_transmuteStatus('Error: ' + error.message);
        }
    }
    
    /**
     * Create Swarm Intelligence Pattern
     * Demonstrates chaotic behavior within Flat-Chaos bounds
     */
    q_createSwarm() {
        try {
            if (this.q_streams.swarm) {
                this.e_transmuteStatus('Swarm stream already exists');
                return;
            }
            
            // Create swarm stream with high entropy for chaotic behavior
            // A thousand minds, one heartbeat. Chaos within bounds.
            this.q_streams.swarm = this.q_engine.createSwarmStream(60, 'TETRAHEDRON');
            
            // Apply swarm-specific flux modifier
            this.q_streams.swarm.q_setFluxModifier((q_entity, q_index) => {
                const q_time = Date.now() * 0.001;
                const e_entropy = q_entity.q_getEntropy();
                
                const q_center = { x: 0, y: 0, z: 0 };
                const q_currentPos = {
                    x: q_entity.flux_matrix[12],
                    y: q_entity.flux_matrix[13],
                    z: q_entity.flux_matrix[14]
                };
                
                const e_distance = Math.sqrt(
                    Math.pow(q_currentPos.x - q_center.x, 2) +
                    Math.pow(q_currentPos.y - q_center.y, 2) +
                    Math.pow(q_currentPos.z - q_center.z, 2)
                );
                
                const q_attraction = 0.05;
                const q_chaos = 0.2;
                
                q_entity.flux_matrix[12] += (q_center.x - q_currentPos.x) * q_attraction;
                q_entity.flux_matrix[13] += (q_center.y - q_currentPos.y) * q_attraction;
                q_entity.flux_matrix[14] += (q_center.z - q_currentPos.z) * q_attraction;
                
                q_entity.flux_matrix[12] += (Math.random() - 0.5) * e_entropy * q_chaos;
                q_entity.flux_matrix[13] += (Math.random() - 0.5) * e_entropy * q_chaos;
                q_entity.flux_matrix[14] += (Math.random() - 0.5) * e_entropy * q_chaos;
                
                const q_maxDistance = 15;
                if (e_distance > q_maxDistance) {
                    q_entity.flux_matrix[12] = (q_entity.flux_matrix[12] / e_distance) * q_maxDistance;
                    q_entity.flux_matrix[13] = (q_entity.flux_matrix[13] / e_distance) * q_maxDistance;
                    q_entity.flux_matrix[14] = (q_entity.flux_matrix[14] / e_distance) * q_maxDistance;
                }
                
                return q_entity;
            });
            
            this.e_transmuteStatus('Swarm Intelligence Pattern Created');
            this.e_refreshMetrics();
            
        } catch (error) {
            console.error('Failed to create swarm stream:', error);
            this.e_transmuteStatus('Error: ' + error.message);
        }
    }
    
    /**
     * Create Galaxy Spiral Pattern
     * Demonstrates spiral dynamics with entropy gradients
     */
    q_createGalaxy() {
        try {
            if (this.q_streams.galaxy) {
                this.e_transmuteStatus('Galaxy stream already exists');
                return;
            }
            
            // Create galaxy stream with spiral dynamics
            // The galaxy spins... carrying secrets in its arms.
            this.q_streams.galaxy = this.q_engine.createGalaxyStream(50, 'SPHERE');
            
            // Apply galaxy-specific flux modifier
            this.q_streams.galaxy.q_setFluxModifier((q_entity, q_index) => {
                const q_time = Date.now() * 0.001;
                const e_entropy = q_entity.q_getEntropy();
                
                const q_totalEntities = this.q_streams.galaxy.q_getCount();
                const q_angle = (q_index / q_totalEntities) * Math.PI * 2;
                const q_radius = 8 + (q_index * 0.3);
                const q_spiralSpeed = 0.5;
                
                q_entity.flux_matrix[12] = Math.cos(q_angle + q_time * q_spiralSpeed) * q_radius;
                q_entity.flux_matrix[13] = Math.sin(q_angle + q_time * q_spiralSpeed) * q_radius;
                q_entity.flux_matrix[14] = Math.sin(q_angle * 3 + q_time * 0.2) * e_entropy * 4;
                
                const q_velocity = 0.1 + (e_entropy * 0.2);
                q_entity.flux_matrix[12] += Math.cos(q_angle + q_time * q_spiralSpeed + Math.PI/2) * q_velocity;
                q_entity.flux_matrix[13] += Math.sin(q_angle + q_time * q_spiralSpeed + Math.PI/2) * q_velocity;
                
                return q_entity;
            });
            
            this.e_transmuteStatus('Galaxy Spiral Pattern Created');
            this.e_refreshMetrics();
            
        } catch (error) {
            console.error('Failed to create galaxy stream:', error);
            this.e_transmuteStatus('Error: ' + error.message);
        }
    }
    
    /**
     * Combine Multiple Streams
     * Demonstrates stream combination with pattern validation
     */
    q_weaveStreams() {
        try {
            const q_activeStreams = Object.values(this.q_streams).filter(q_s => q_s !== null);
            
            if (q_activeStreams.length < 2) {
                this.e_transmuteStatus('Need at least 2 active streams to combine');
                return;
            }
            
            // Combine all active streams
            // Weaving the threads of chaos into a single tapestry.
            this.q_streams.combined = this.q_engine.combineStreams(q_activeStreams);
            
            // Apply combined pattern modifier
            this.q_streams.combined.q_setFluxModifier((q_entity, q_index) => {
                const q_time = Date.now() * 0.001;
                const e_entropy = q_entity.q_getEntropy();
                
                const e_baseMovement = Math.sin(q_time + q_index * 0.1) * e_entropy;
                const e_spiralMovement = Math.cos(q_time * 2 + q_index * 0.2) * e_entropy * 0.5;
                
                q_entity.flux_matrix[12] += e_baseMovement + e_spiralMovement;
                q_entity.flux_matrix[13] += e_baseMovement - e_spiralMovement;
                q_entity.flux_matrix[14] += Math.sin(q_time * 1.5 + q_index * 0.3) * e_entropy;
                
                return q_entity;
            });
            
            this.e_transmuteStatus(`Combined ${q_activeStreams.length} Streams`);
            this.e_refreshMetrics();
            
        } catch (error) {
            console.error('Failed to combine streams:', error);
            this.e_transmuteStatus('Error: ' + error.message);
        }
    }
    
    /**
     * Clear All Streams
     * Resets the example to initial state
     */
    q_collapseAll() {
        try {
            // The furnace is cooling... reset the quantum state.
            this.q_engine.stop();
            
            this.q_streams = {
                organic: null,
                lattice: null,
                swarm: null,
                galaxy: null,
                combined: null
            };
            
            this.q_engine.start();
            
            this.e_transmuteStatus('All Streams Collapsed');
            this.e_refreshMetrics();
            
        } catch (error) {
            console.error('Failed to collapse streams:', error);
            this.e_transmuteStatus('Error: ' + error.message);
        }
    }
    
    /**
     * Toggle Chaos Mode
     * Adjusts entropy levels for different visual effects
     */
    e_toggleChaos() {
        try {
            this.e_chaos_mode = !this.e_chaos_mode;
            
            const e_intensity = this.e_chaos_mode ? 0.8 : 0.3;
            
            // Update shader uniforms for chaos effect
            this.q_engine.updateShaders({
                u_base_intensity: e_intensity,
                u_time: Date.now() * 0.001
            });
            
            // Adjust entity entropy levels
            // Let the chaos flow... or pull it back.
            Object.values(this.q_streams).forEach(q_stream => {
                if (q_stream) {
                    q_stream.q_getEntities().forEach(q_entity => {
                        const e_current = q_entity.q_getEntropy();
                        const e_new = this.e_chaos_mode ? 
                            Math.min(e_current + 0.3, 0.9) : 
                            Math.max(e_current - 0.3, 0.1);
                        q_entity.e_applyEntropy(e_new);
                    });
                }
            });
            
            this.e_transmuteStatus(`Chaos Mode: ${this.e_chaos_mode ? 'ON' : 'OFF'}`);
            
        } catch (error) {
            console.error('Failed to toggle chaos:', error);
            this.e_transmuteStatus('Error: ' + error.message);
        }
    }
    
    /**
     * Add Entities to Active Streams
     * Performance testing and dynamic content addition
     */
    q_injectFlux() {
        try {
            let q_addedCount = 0;
            
            // Add entities to each active stream
            Object.keys(this.q_streams).forEach(q_key => {
                const q_stream = this.q_streams[q_key];
                if (q_stream) {
                    for (let i = 0; i < 5; i++) {
                        const q_ent = new q_entity(q_stream.q_getEntities()[0].q_getType());
                        
                        q_ent.flux_matrix[12] = (Math.random() - 0.5) * 20;
                        q_ent.flux_matrix[13] = (Math.random() - 0.5) * 20;
                        q_ent.flux_matrix[14] = (Math.random() - 0.5) * 20;
                        
                        q_ent.e_applyEntropy(Math.random());
                        
                        q_stream.q_addEntity(q_ent);
                        q_addedCount++;
                    }
                }
            });
            
            this.e_transmuteStatus(`Injected ${q_addedCount} Quantum Particles`);
            this.e_refreshMetrics();
            
        } catch (error) {
            console.error('Failed to inject flux:', error);
            this.e_transmuteStatus('Error: ' + error.message);
        }
    }
    
    /**
     * Remove Entities from Active Streams
     */
    e_bleedFlux() {
        try {
            let q_removedCount = 0;
            
            Object.keys(this.q_streams).forEach(q_key => {
                const q_stream = this.q_streams[q_key];
                if (q_stream && q_stream.q_getCount() > 10) {
                    const q_entities = q_stream.q_getEntities();
                    const q_toRemove = Math.min(5, q_entities.length - 5);
                    
                    for (let i = 0; i < q_toRemove; i++) {
                        q_entities.pop();
                        q_removedCount++;
                    }
                }
            });
            
            this.e_transmuteStatus(`Bled ${q_removedCount} Quantum Particles`);
            this.e_refreshMetrics();
            
        } catch (error) {
            console.error('Failed to bleed flux:', error);
            this.e_transmuteStatus('Error: ' + error.message);
        }
    }
    
    e_toggleUI() {
        this.e_stats_visible = !this.e_stats_visible;
        const q_overlay = document.getElementById('ui-overlay');
        if (q_overlay) {
            q_overlay.style.display = this.e_stats_visible ? 'block' : 'none';
        }
    }
    
    e_transmuteStatus(q_message) {
        const q_statusEl = document.getElementById('status');
        if (q_statusEl) {
            q_statusEl.textContent = q_message;
        }
    }
    
    e_refreshMetrics() {
        const q_stats = this.q_engine.getStats();
        
        const q_entityCountEl = document.getElementById('entity-count');
        const q_streamCountEl = document.getElementById('stream-count');
        const q_fpsCountEl = document.getElementById('fps-count');
        
        if (q_entityCountEl) q_entityCountEl.textContent = q_stats.total_entities;
        if (q_streamCountEl) q_streamCountEl.textContent = q_stats.total_meshes;
        if (q_fpsCountEl) q_fpsCountEl.textContent = Math.round(this.e_performance.q_fps);
    }
    
    q_monitorLaminarFlow() {
        const q_pulse = () => {
            if (!this.q_is_running) return;
            
            const q_now = performance.now();
            
            this.e_performance.q_frame_count++;
            if (q_now - this.e_performance.q_last_fps_update >= 1000) {
                this.e_performance.q_fps = this.e_performance.q_frame_count;
                this.e_performance.q_frame_count = 0;
                this.e_performance.q_last_fps_update = q_now;
                
                if (this.e_stats_visible) {
                    this.e_refreshMetrics();
                }
            }
            
            requestAnimationFrame(q_pulse);
        };
        
        requestAnimationFrame(q_pulse);
    }
    
    q_collapse() {
        try {
            if (this.q_engine) {
                this.q_engine.stop();
            }
            
            this.q_is_running = false;
            this.e_transmuteStatus('Collapsed');
            
            console.log('RaBbLE Nebula Example: Collapsed successfully');
            
        } catch (error) {
            console.error('Failed to collapse example:', error);
        }
    }
}

// Ignition of the module... the script is alive!
document.addEventListener('DOMContentLoaded', () => {
    window.q_example = new RaBbLE_Nebula_Example('#container');
});

export { RaBbLE_Nebula_Example };
