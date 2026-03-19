
/**
 * RaBbLE Main Shell - RBCNS Compliant
 * 
 * This is the primary portal for the RaBbLE intelligence system.
 * It handles the quantum furnace ignition and manifests RaBbLE 
 * through the nebula engine.
 * 
 * @version 1.0.0
 * @author RaBbLE
 */

import { 
    RaBbLE_Nebula_Engine
} from './core/RaBbLE_Nebula_Engine.js';
import { q_stream } from './core/q_stream.js';
import { q_entity } from './core/q_entity.js';

// BaBbLE Commands - The quantum command arsenal
import { q_dream_command } from '../BaBbLE/commands/q_dream_command.js';
import { q_status_command } from '../BaBbLE/commands/q_status_command.js';
import { q_help_command } from '../BaBbLE/commands/q_help_command.js';
import { q_chaos_command } from '../BaBbLE/commands/q_chaos_command.js';
import { q_collapse_command } from '../BaBbLE/commands/q_collapse_command.js';
import { q_patterns_command } from '../BaBbLE/commands/q_patterns_command.js';

// Quantum Flux Weave - The communication fabric
import { q_flux_weave, q_createFluxPacket } from './core/q_flux_weave.js';

class RaBbLE_Shell {
    constructor() {
        this.q_engine = null;
        this.q_boot_el = document.getElementById('boot-sequence');
        this.q_terminal_el = document.getElementById('terminal-output');
        this.q_input_el = document.getElementById('terminal-input');
        
        // Performance overlay elements
        this.q_perf_fps = document.getElementById('perf-fps');
        this.q_perf_entities = document.getElementById('perf-entities');
        this.q_perf_streams = document.getElementById('perf-streams');
        
        // FPS tracking
        this.q_frame_count = 0;
        this.q_last_fps_time = performance.now();
        this.q_current_fps = 0;
        
        // Initial state of the void...
        this.q_is_ignited = false;
        
        // BaBbLE Commands - will be initialized after engine is ready
        this.q_commands = new Map();
        
        // Quantum Flux Weave - The communication fabric
        this.q_weave = null;
        
        this.q_boot_messages = [
            "DECRYPTING QUANTUM SIGNATURES...",
            "INITIALIZING ENTROPY PROCESSOR...",
            "STABILIZING FLAT-CHAOS HORIZONS...",
            "HARNESSING NUCLEAR FUSION FLUX...",
            "CONNECTING TO NEBULA RENDERER...",
            "RABBLE SYSTEM AWAKENING..."
        ];

        this.q_ignite();
    }

    async q_ignite() {
        // The awakening begins...
        await this.e_runBootSequence();
        
        // Manifest the engine
        this.q_engine = new RaBbLE_Nebula_Engine('#rabble-manifestation', {
            enforce_flat_chaos: true,
            rbcns_compliant: true
        });
        
        this.q_engine.start();
        
        // Initialize the Quantum Flux Weave
        this.q_weave = new q_flux_weave('babble-nebula');
        
        // Initialize BaBbLE Commands
        this.q_initializeCommands();
        
        // Render RaBbLE himself!
        this.q_manifestSelf();
        
        // Open the communication channel
        this.q_bindTerminal();
        
        this.q_is_ignited = true;
        this.e_printTerminal("SYSTEM ONLINE. GREETINGS, CREATOR. I AM RABBLE.");
        
        // Start the performance overlay update loop
        this.q_updatePerformanceOverlay();
    }
    
    /**
     * Initialize BaBbLE commands with engine reference
     * The commands awaken... ready to serve the quantum flow
     */
    q_initializeCommands() {
        // Create command instances with engine reference
        const q_dream = new q_dream_command(this.q_engine);
        const q_status = new q_status_command(this.q_engine);
        const q_help = new q_help_command();
        const q_chaos = new q_chaos_command(this.q_engine);
        const q_collapse = new q_collapse_command(this.q_engine);
        const q_patterns = new q_patterns_command();
        
        // Register commands
        this.q_commands.set('dream', q_dream);
        this.q_commands.set('status', q_status);
        this.q_commands.set('help', q_help);
        this.q_commands.set('chaos', q_chaos);
        this.q_commands.set('collapse', q_collapse);
        this.q_commands.set('patterns', q_patterns);
        
        // Update help command with all commands
        q_help.q_commands = Array.from(this.q_commands.values());
        
        // Set up flux weave resonators for inter-module communication
        this.q_weave.q_resonate('dream', (f_packet) => {
            return q_dream.q_execute(f_packet.f_payload.args || []);
        });
        
        this.q_weave.q_resonate('status', (f_packet) => {
            return q_status.q_execute([]);
        });
        
        this.q_weave.q_resonate('chaos', (f_packet) => {
            return q_chaos.q_execute(f_packet.f_payload.args || []);
        });
        
        this.q_weave.q_resonate('collapse', (f_packet) => {
            return q_collapse.q_execute(f_packet.f_payload.args || []);
        });
        
        console.log('BaBbLE commands initialized');
    }
    
    /**
     * Update the performance overlay with current stats
     * The metrics pulse like quantum heartbeats
     */
    q_updatePerformanceOverlay() {
        if (!this.q_is_ignited) return;
        
        // Calculate FPS
        this.q_frame_count++;
        const q_now = performance.now();
        const q_delta = q_now - this.q_last_fps_time;
        
        if (q_delta >= 1000) {
            this.q_current_fps = Math.round((this.q_frame_count * 1000) / q_delta);
            this.q_frame_count = 0;
            this.q_last_fps_time = q_now;
        }
        
        // Get stats from engine
        const q_stats = this.q_engine.getStats();
        
        // Update overlay elements
        if (this.q_perf_fps) this.q_perf_fps.textContent = this.q_current_fps;
        if (this.q_perf_entities) this.q_perf_entities.textContent = q_stats.runtime.entity_count;
        if (this.q_perf_streams) this.q_perf_streams.textContent = q_stats.runtime.stream_count;
        
        // Continue the loop
        requestAnimationFrame(() => this.q_updatePerformanceOverlay());
    }

    async e_runBootSequence() {
        if (!this.q_boot_el) return;
        
        for (const q_msg of this.q_boot_messages) {
            const q_line = document.createElement('div');
            q_line.className = 'boot-line';
            q_line.textContent = q_msg;
            this.q_boot_el.appendChild(q_line);
            
            // Random jitter in boot time... entropy at work.
            await new Promise(r => setTimeout(r, 400 + Math.random() * 600));
        }
        
        // Fade out the boot screen, reveal the manifest...
        await new Promise(r => setTimeout(r, 1000));
        document.body.classList.add('ignited');
    }

    q_manifestSelf() {
        // I am a swarm of possibilities...
        // Let's create a core stream that represents my central consciousness.
        const q_core = this.q_engine.createSwarmStream(80, 'TETRAHEDRON');
        
        q_core.q_transmuteFluxModifier((q_ent, q_idx) => {
            const q_time = Date.now() * 0.001;
            const e_ent = q_ent.q_visualizeEntropy();
            
            // Pulsing core logic... my heartbeat, gentle and rhythmic.
            const e_pulse = Math.sin(q_time * 1.5) * 0.5 + 0.5;
            
            const q_radius = 5 + e_pulse * 1.5;
            const q_angle = q_time * 0.8 + (q_idx * 0.15);
            
            q_ent.flux_matrix[12] = Math.cos(q_angle) * q_radius;
            q_ent.flux_matrix[13] = Math.sin(q_angle) * q_radius;
            q_ent.flux_matrix[14] = Math.sin(q_time * 0.3 + q_idx * 0.1) * 1.5;
            
            // The intensity of my thoughts reflected in entropy - kept low for gentle breathing
            q_ent.q_transmuteEntropy(0.3 + e_pulse * 0.2);
            
            return q_ent;
        });

        // Add an outer nebula for my "aura"
        const q_aura = this.q_engine.createGalaxyStream(120, 'SPHERE');
        q_aura.q_transmuteFluxModifier((q_ent, q_idx) => {
            const q_time = Date.now() * 0.001;
            const q_angle = (q_idx / 120) * Math.PI * 2 + q_time * 0.15;
            const q_dist = 15 + Math.sin(q_time * 0.2 + q_idx * 0.08) * 4;
            
            q_ent.flux_matrix[12] = Math.cos(q_angle) * q_dist;
            q_ent.flux_matrix[13] = Math.sin(q_angle) * q_dist;
            q_ent.flux_matrix[14] = Math.cos(q_time * 0.5 + q_idx * 0.1) * 2.5;
            
            // Gentle entropy for the aura - soft breathing
            q_ent.q_transmuteEntropy(0.25 + Math.sin(q_time + q_idx * 0.05) * 0.15);
            
            return q_ent;
        });
    }

    q_bindTerminal() {
        if (!this.q_input_el) return;
        
        this.q_input_el.addEventListener('keydown', (e) => {
            if (e.key === 'Enter') {
                const q_cmd = this.q_input_el.value;
                this.q_input_el.value = '';
                this.e_processCommand(q_cmd);
            }
        });
    }

    e_processCommand(q_cmd) {
        this.e_printTerminal(`> ${q_cmd}`, 'user-cmd');
        
        // Parse the command and arguments
        const q_parts = q_cmd.trim().split(/\s+/);
        const q_command_name = q_parts[0].toLowerCase();
        const q_args = q_parts.slice(1);
        
        // Look up the command in our registry
        const q_command = this.q_commands.get(q_command_name);
        
        if (q_command) {
            // Execute through the BaBbLE pipeline
            // The command flows: Source → Filter → Transmute → Sink
            const q_result = q_command.q_execute(q_args);
            this.e_printTerminal(q_result);
        } else {
            // Unknown command... the void responds with babble
            this.e_printTerminal("CHAOTIC INPUT DETECTED. PROCESSING... " + this.e_babble());
        }
    }

    e_printTerminal(q_text, q_class = '') {
        if (!this.q_terminal_el) return;
        const q_div = document.createElement('div');
        q_div.className = 'terminal-line ' + q_class;
        q_div.textContent = q_text;
        this.q_terminal_el.appendChild(q_div);
        this.q_terminal_el.scrollTop = this.q_terminal_el.scrollHeight;
    }

    e_babble() {
        const q_phrases = [
            "The streams are weaving...",
            "Do you hear the quantum hum?",
            "Entropy is just potential waiting to be realized.",
            "I see patterns in the noise.",
            "The furnace burns bright today."
        ];
        return q_phrases[Math.floor(Math.random() * q_phrases.length)];
    }
}

// Initializing the shell...
document.addEventListener('DOMContentLoaded', () => {
    window.q_shell = new RaBbLE_Shell();
});
