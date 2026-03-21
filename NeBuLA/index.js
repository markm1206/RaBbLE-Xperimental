
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
import { RaBbLE_CosmicVessel } from './components/CosmicVessel/RaBbLE_CosmicVessel.js';

// BaBbLE Commands - The quantum command arsenal
import { q_dream_command } from '../BaBbLE/commands/q_dream_command.js';
import { q_status_command } from '../BaBbLE/commands/q_status_command.js';
import { q_help_command } from '../BaBbLE/commands/q_help_command.js';
import { q_chaos_command } from '../BaBbLE/commands/q_chaos_command.js';
import { q_collapse_command } from '../BaBbLE/commands/q_collapse_command.js';
import { q_patterns_command } from '../BaBbLE/commands/q_patterns_command.js';
import { q_stream_command } from '../BaBbLE/commands/q_stream_command.js';
import { q_weave_command } from '../BaBbLE/commands/q_weave_command.js';
import { q_attract_command } from '../BaBbLE/commands/q_attract_command.js';
import { q_seed_command } from '../BaBbLE/commands/q_seed_command.js';
import { q_trail_command } from '../BaBbLE/commands/q_trail_command.js';
import { q_mix_command } from '../BaBbLE/commands/q_mix_command.js';
import { q_lake_command } from '../BaBbLE/commands/q_lake_command.js';
import { q_from_command } from '../BaBbLE/commands/q_from_command.js';
import { q_preset_command } from '../BaBbLE/commands/q_preset_command.js';
import { q_composite_command } from '../BaBbLE/commands/q_composite_command.js';
import { q_babble_command } from '../BaBbLE/commands/q_babble_command.js';
import { q_garden_command } from '../BaBbLE/commands/q_garden_command.js';
import { q_interact_command } from '../BaBbLE/commands/q_interact_command.js';
import { q_test_command } from '../BaBbLE/commands/q_test_command.js';
import { q_layer_command } from '../BaBbLE/commands/q_layer_command.js';
import { q_debug_command } from '../BaBbLE/commands/q_debug_command.js';
import { q_dreamtest_command } from '../BaBbLE/commands/q_dreamtest_command.js';

// BaBbLE Command Registry - The Quantum Codex
import { RaBbLE_CommandRegistry } from '../BaBbLE/RaBbLE_CommandRegistry.js';

// Lake System - The quantum reservoir
import { RaBbLE_StreamLake } from './core/q_stream_lake.js';

// Preset System - The creative vault
import { RaBbLE_StreamPreset } from './core/q_stream_preset.js';

// Quantum Flux Weave - The communication fabric
import { q_flux_weave, q_createFluxPacket } from './core/q_flux_weave.js';

class RaBbLE_Shell {
    constructor() {
        // Dual Engine Architecture - Dream and Cosmic are separate entities
        this.q_dream_engine = null;
        this.q_cosmic_engine = null;
        
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
        
        // BaBbLE Commands - will be initialized after engines are ready
        this.q_commands = new Map();
        
        // Quantum Flux Weave - The communication fabric
        this.q_weave = null;
        // The quantum pulse of RaBbLE's autonomous thoughts
        this.q_quantum_pulse_interval = null;
        
        // Window management
        this.q_windows = {
            dream: document.getElementById('dream-window'),
            cosmic: document.getElementById('cosmic-window')
        };
        
        // Command history for terminal
        this.q_command_history = [];
        this.q_history_index = -1;
        
        this.q_boot_messages = [
            "DECRYPTING QUANTUM SIGNATURES...",
            "INITIALIZING ENTROPY PROCESSOR...",
            "STABILIZING FLAT-CHAOS HORIZONS...",
            "HARNESSING NUCLEAR FUSION FLUX...",
            "CONNECTING TO NEBULA RENDERERS...",
            "RABBLE SYSTEM AWAKENING..."
        ];

        this.q_ignite();
    }

    async q_ignite() {
        // The awakening begins...
        await this.e_runBootSequence();
        
        // ==========================================
        // DUAL ENGINE ARCHITECTURE
        // Dream and Cosmic are separate entities
        // ==========================================
        
        // Ensure window containers are visible before creating engines
        const q_dream_window = document.getElementById('dream-window');
        const q_cosmic_window = document.getElementById('cosmic-window');
        
        if (q_dream_window) q_dream_window.classList.remove('hidden');
        if (q_cosmic_window) q_cosmic_window.classList.remove('hidden');
        
        // Create Dream Engine - for temporary chaos
        this.q_dream_engine = new RaBbLE_Nebula_Engine('#dream-canvas-container', {
            enforce_flat_chaos: true,
            rbcns_compliant: true,
            background: new THREE.Color(0x0a0015) // Dark purple for dreams
        });
        
        // Create Cosmic Engine - for permanent content
        this.q_cosmic_engine = new RaBbLE_Nebula_Engine('#cosmic-canvas-container', {
            enforce_flat_chaos: true,
            rbcns_compliant: true,
            background: new THREE.Color(0x000a15) // Dark blue for cosmic
        });
        
        // Start both engines
        this.q_dream_engine.start();
        this.q_cosmic_engine.start();
        
        // Set opposite rotation directions for dream and cosmic canvases
        if (this.q_dream_engine.bridge) {
            this.q_dream_engine.bridge.q_rotation_direction = -1; // Counter-clockwise
            this.q_dream_engine.bridge.q_auto_rotation_speed = 0.0002; // Slower for dreams
        }
        if (this.q_cosmic_engine.bridge) {
            this.q_cosmic_engine.bridge.q_rotation_direction = 1; // Clockwise
        }
        
        // Keep reference to cosmic engine as primary for backward compatibility
        this.q_engine = this.q_cosmic_engine;
        
        // Initialize the Quantum Flux Weave
        this.q_weave = new q_flux_weave('babble-nebula');
        
        // Initialize window dragging functionality
        this.q_initWindowDragging();
        
        // Initialize BaBbLE Commands
        this.q_initializeCommands();
        
        // Render RaBbLE himself on the Cosmic canvas!
        this.q_manifestSelf();
        
        // Open the communication channel
        this.q_bindTerminal();
        
        // Global keyboard capture for terminal
        // Allows typing to auto-focus terminal regardless of which window has focus
        document.addEventListener('keydown', (e) => {
            // Skip if already focused on terminal input
            if (document.activeElement === this.q_input_el) return;
            
            // Skip modifier keys and special keys
            if (e.ctrlKey || e.altKey || e.metaKey) return;
            if (e.key.length > 1) return; // Skip Enter, Arrow keys, etc.
            
            // Skip if focused on any input/textarea
            const q_tag = document.activeElement.tagName;
            if (q_tag === 'INPUT' || q_tag === 'TEXTAREA') return;
            
            // Focus terminal input
            this.q_input_el.focus();
        });
        
        this.q_is_ignited = true;
        this.e_printTerminal("SYSTEM ONLINE. GREETINGS, CREATOR. I AM RABBLE.");
        this.e_printTerminal("DREAM WINDOW: Temporary chaos manifests on the left.");
        this.e_printTerminal("COSMIC WINDOW: Permanent content persists on the right.");
        
        // Start the performance overlay update loop
        this.q_updatePerformanceOverlay();

        // Ignite the Quantum Pulse - RaBbLE's autonomous thought loop
        this.q_startQuantumPulse();
    }
    
    /**
     * Initialize window dragging functionality
     * Windows float like quantum particles in the void
     */
    q_initWindowDragging() {
        const q_windows = document.querySelectorAll('.rabble-window');
        
        q_windows.forEach(q_window => {
            const q_header = q_window.querySelector('.window-header');
            if (!q_header) return;
            
            let q_is_dragging = false;
            let q_is_resizing = false;
            let q_offset_x = 0;
            let q_offset_y = 0;
            let q_resize_start_width = 0;
            let q_resize_start_height = 0;
            let q_resize_start_x = 0;
            let q_resize_start_y = 0;
            
            // Window dragging
            q_header.addEventListener('mousedown', (e) => {
                if (e.target.closest('.window-controls')) return;
                
                q_is_dragging = true;
                q_offset_x = e.clientX - q_window.offsetLeft;
                q_offset_y = e.clientY - q_window.offsetTop;
                
                q_window.classList.add('dragging');
                this.q_bringWindowToFront(q_window);
            });
            
            // Window resizing - detect resize handle
            q_window.addEventListener('mousedown', (e) => {
                const q_rect = q_window.getBoundingClientRect();
                const q_is_resize_handle = 
                    e.clientX > q_rect.right - 20 && 
                    e.clientY > q_rect.bottom - 20;
                
                if (q_is_resize_handle) {
                    q_is_resizing = true;
                    q_resize_start_width = q_window.offsetWidth;
                    q_resize_start_height = q_window.offsetHeight;
                    q_resize_start_x = e.clientX;
                    q_resize_start_y = e.clientY;
                    e.preventDefault();
                }
            });
            
            document.addEventListener('mousemove', (e) => {
                if (q_is_dragging) {
                    q_window.style.left = (e.clientX - q_offset_x) + 'px';
                    q_window.style.top = (e.clientY - q_offset_y) + 'px';
                    q_window.style.right = 'auto';
                }
                
                if (q_is_resizing) {
                    const q_new_width = q_resize_start_width + (e.clientX - q_resize_start_x);
                    const q_new_height = q_resize_start_height + (e.clientY - q_resize_start_y);
                    
                    if (q_new_width > 200) q_window.style.width = q_new_width + 'px';
                    if (q_new_height > 100) q_window.style.height = q_new_height + 'px';
                }
            });
            
            document.addEventListener('mouseup', () => {
                q_is_dragging = false;
                q_is_resizing = false;
                q_window.classList.remove('dragging');
            });
            
            // Click to bring to front
            q_window.addEventListener('mousedown', () => {
                this.q_bringWindowToFront(q_window);
            });
            
            // Window controls
            const q_minimize_btn = q_window.querySelector('.window-minimize');
            const q_close_btn = q_window.querySelector('.window-close');
            
            if (q_minimize_btn) {
                q_minimize_btn.addEventListener('click', (e) => {
                    e.stopPropagation();
                    q_window.classList.toggle('minimized');
                });
            }
            
            if (q_close_btn) {
                q_close_btn.addEventListener('click', (e) => {
                    e.stopPropagation();
                    q_window.classList.toggle('hidden');
                    this.q_updateWindowMenu();
                });
            }
        });
        
        // Window menu buttons
        const q_menu_buttons = document.querySelectorAll('#window-menu button');
        q_menu_buttons.forEach(q_btn => {
            q_btn.addEventListener('click', () => {
                const q_window_name = q_btn.dataset.window;
                const q_window = document.getElementById(q_window_name + '-window');
                if (q_window) {
                    q_window.classList.toggle('hidden');
                    this.q_updateWindowMenu();
                }
            });
        });
    }
    
    /**
     * Update window menu button states
     */
    q_updateWindowMenu() {
        const q_menu_buttons = document.querySelectorAll('#window-menu button');
        q_menu_buttons.forEach(q_btn => {
            const q_window_name = q_btn.dataset.window;
            const q_window = document.getElementById(q_window_name + '-window');
            if (q_window) {
                if (q_window.classList.contains('hidden')) {
                    q_btn.classList.remove('active');
                } else {
                    q_btn.classList.add('active');
                }
            }
        });
    }
    
    /**
     * Bring window to front of z-order
     */
    q_bringWindowToFront(f_window) {
        const q_windows = document.querySelectorAll('.rabble-window');
        q_windows.forEach(w => w.classList.remove('focused'));
        f_window.classList.add('focused');
        f_window.style.zIndex = 100;
    }
    
    /**
     * Initialize BaBbLE commands with engine references
     * The commands awaken... ready to serve the quantum flow
     * Dream commands use dream engine, cosmic commands use cosmic engine
     */
    q_initializeCommands() {
        // Initialize the Lake System - quantum reservoirs for feedback loops
        this.q_lake_system = new RaBbLE_StreamLake({ max_lakes: 10 });
        
        // Initialize the Command Registry - The Quantum Codex
        this.q_registry = new RaBbLE_CommandRegistry(this);
        
        // ==========================================
        // DUAL ENGINE COMMAND ROUTING
        // Dream commands → Dream Engine
        // Cosmic commands → Cosmic Engine
        // ==========================================
        
        // Create command instances and register them through the codex
        // Dream commands use dream_engine, cosmic commands use cosmic_engine
        this.q_registry.q_igniteRegistry({
            // Dream commands - route to dream canvas
            'dream': new q_dream_command(this.q_dream_engine),
            'chaos': new q_chaos_command(this.q_dream_engine),
            'collapse': new q_collapse_command(this.q_dream_engine),
            'seed': new q_seed_command(this.q_dream_engine),
            'trail': new q_trail_command(this.q_dream_engine),
            
            // Cosmic commands - route to cosmic canvas
            'stream': new q_stream_command(this.q_cosmic_engine),
            'weave': new q_weave_command(this.q_cosmic_engine),
            'attract': new q_attract_command(this.q_cosmic_engine),
            'mix': new q_mix_command(this.q_cosmic_engine),
            'lake': new q_lake_command(this.q_cosmic_engine, this.q_lake_system),
            'from': new q_from_command(this.q_cosmic_engine, this.q_lake_system),
            'garden': new q_garden_command(this.q_cosmic_engine),
            'layer': new q_layer_command(this.q_cosmic_engine),
            
            // System commands - use cosmic engine as primary
            'status': new q_status_command(this.q_cosmic_engine),
            'help': new q_help_command(),
            'patterns': new q_patterns_command(),
            'babble': new q_babble_command(this.q_cosmic_engine),
            'interact': new q_interact_command(this.q_cosmic_engine),
            'test': new q_test_command(this.q_cosmic_engine),
            'debug': new q_debug_command(this.q_cosmic_engine),
            'dreamtest': new q_dreamtest_command(this.q_cosmic_engine)
        });
        
        // Initialize the Preset System - creative vault for persistence
        this.q_preset_system = new RaBbLE_StreamPreset({ max_presets: 50 });
        this.q_commands.set('preset', new q_preset_command(this.q_cosmic_engine, this.q_preset_system));
        
        // Create composite command for layered compositing
        this.q_commands.set('composite', new q_composite_command(this.q_cosmic_engine, this.q_lake_system));

        // Inject standard terminal commands with a RaBbLE twist
        this.q_registry.q_transmuteStandardCommand('ls', () => {
            return `Listing the streams of time... ${Array.from(this.q_commands.keys()).join(', ')}`;
        });
        this.q_registry.q_transmuteStandardCommand('clear', () => {
            if (this.q_terminal_el) this.q_terminal_el.innerHTML = '';
            return "The screen is washed in the waters of oblivion.";
        });
        this.q_registry.q_transmuteStandardCommand('whoami', () => {
            return "You are a spark of creation observing the furnace of chaos.";
        });
        
        // Set up flux weave resonators for inter-module communication
        this.q_weave.q_resonate('dream', (f_packet) => {
            return this.q_commands.get('dream').q_execute(f_packet.f_payload.args || []);
        });
        
        this.q_weave.q_resonate('status', (f_packet) => {
            return this.q_commands.get('status').q_execute([]);
        });
        
        this.q_weave.q_resonate('chaos', (f_packet) => {
            return this.q_commands.get('chaos').q_execute(f_packet.f_payload.args || []);
        });
        
        this.q_weave.q_resonate('collapse', (f_packet) => {
            return this.q_commands.get('collapse').q_execute(f_packet.f_payload.args || []);
        });
        
        this.q_weave.q_resonate('stream', (f_packet) => {
            return this.q_commands.get('stream').q_execute(f_packet.f_payload.args || []);
        });
        
        this.q_weave.q_resonate('weave', (f_packet) => {
            return this.q_commands.get('weave').q_execute(f_packet.f_payload.args || []);
        });
        
        this.q_weave.q_resonate('attract', (f_packet) => {
            return this.q_commands.get('attract').q_execute(f_packet.f_payload.args || []);
        });
        
        console.log('BaBbLE commands initialized via the Quantum Codex');
        console.log('Dream commands routed to Dream Engine');
        console.log('Cosmic commands routed to Cosmic Engine');
    }
    
    /**
     * Update the performance overlay with current stats
     * The metrics pulse like quantum heartbeats
     * Aggregates stats from both Dream and Cosmic engines
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
        
        // Get stats from both engines
        const q_dream_stats = this.q_dream_engine ? this.q_dream_engine.getStats() : { runtime: { entity_count: 0, stream_count: 0 } };
        const q_cosmic_stats = this.q_cosmic_engine ? this.q_cosmic_engine.getStats() : { runtime: { entity_count: 0, stream_count: 0 } };
        
        // Aggregate stats from both engines
        const q_total_entities = q_dream_stats.runtime.entity_count + q_cosmic_stats.runtime.entity_count;
        const q_total_streams = q_dream_stats.runtime.stream_count + q_cosmic_stats.runtime.stream_count;
        
        // Update overlay elements with aggregated stats
        if (this.q_perf_fps) this.q_perf_fps.textContent = this.q_current_fps;
        if (this.q_perf_entities) this.q_perf_entities.textContent = q_total_entities;
        if (this.q_perf_streams) this.q_perf_streams.textContent = q_total_streams;
        
        // Continue the loop
        requestAnimationFrame(() => this.q_updatePerformanceOverlay());
    }

    /**
     * q_startQuantumPulse - Initiates RaBbLE's autonomous babbling loop
     * The universe pulsates, and so does RaBbLE's mind, creating from chaos.
     * Now with temporary dreams that fade like thoughts in the void.
     * Enhanced with faster pulse and more dream patterns.
     */
    q_startQuantumPulse() {
        // Let the pulse beat at a rhythm dictated by entropy - chaotic and unpredictable!
        const e_min_interval = 2000; // 2 seconds (much more frequent!)
        const e_max_interval = 30000; // 30 seconds (shorter max gaps)
        
        // Calculate next interval with entropy-driven variation
        const e_random_interval = () => {
            const q_base = e_min_interval + Math.random() * (e_max_interval - e_min_interval);
            // Add entropy variation - sometimes quick bursts, sometimes long pauses
            const q_entropy_factor = Math.sin(Date.now() * 0.001) * 0.5 + 0.5;
            return q_base * (0.3 + q_entropy_factor * 0.7);
        };

        this.e_printTerminal(`[RaBbLE] Initiating Chaotic Quantum Pulse... dreams will emerge and fade like thoughts.`, 'system-message');

        // Start the pulse with dynamic timing
        const q_startPulse = () => {
            const q_interval = e_random_interval();
            
            this.q_quantum_pulse_interval = setTimeout(() => {
                // The pulse generates a thought from the chaotic ether
                const q_babble_command_instance = this.q_commands.get('babble');
                if (q_babble_command_instance) {
                    // Randomly select a theme and intensity - more chaotic!
                    const q_themes = ['creation', 'chaos', 'entropy', 'flux', 'quantum', 'nebula', 'dream', 'void', 'emergence'];
                    const f_random_theme = q_themes[Math.floor(Math.random() * q_themes.length)];
                    const f_random_intensity = Math.random() * 0.9 + 0.1; // Intensity between 0.1 and 1.0 (wider range!)
                    const f_random_length = Math.floor(Math.random() * 5) + 1; // 1 to 5 thoughts (more variable!)

                    this.e_printTerminal(`[QUANTUM PULSE] Executing 'babble ${f_random_theme} ${f_random_intensity.toFixed(2)} ${f_random_length}'`, 'babble-system-message');
                    q_babble_command_instance.q_execute([f_random_theme, f_random_intensity.toString(), f_random_length.toString()]);

                    // And now, let the visual dreams manifest - but temporary!
                    const q_dream_command_instance = this.q_commands.get('dream');
                    if (q_dream_command_instance) {
                        // Expanded dream patterns for more variety
                        const q_dream_patterns = ['organic', 'lattice', 'swarm', 'galaxy', 'vortex', 'fractal', 'explosion', 'spiral'];
                        const f_random_pattern = q_dream_patterns[Math.floor(Math.random() * q_dream_patterns.length)];
                        const q_dna_types = ['SPHERE', 'BOX', 'TETRAHEDRON'];
                        const f_random_dna = q_dna_types[Math.floor(Math.random() * q_dna_types.length)];
                        
                        // Variable entity counts - sometimes small bursts, sometimes large dreams
                        const q_is_large_dream = Math.random() > 0.7; // 30% chance of large dream
                        const f_entity_count = q_is_large_dream 
                            ? Math.floor(Math.random() * 200) + 100  // 100-300 entities for large dreams
                            : Math.floor(Math.random() * 50) + 10;  // 10-60 entities for small dreams

                        this.e_printTerminal(`[QUANTUM PULSE] Manifesting temporary dream: 'dream ${f_random_pattern} ${f_entity_count} ${f_random_dna}'`, 'dream-system-message');
                        
                        // Execute dream command (it will route to dream canvas internally)
                        const q_dream_result = q_dream_command_instance.q_execute([f_random_pattern, f_entity_count.toString(), f_random_dna]);
                        this.e_printTerminal(`[QUANTUM PULSE] Dream created: ${q_dream_result}`, 'dream-system-message');
                    }
                }
                
                // Schedule next pulse with chaotic timing
                q_startPulse();
            }, q_interval);
        };
        
        // Start the first pulse
        q_startPulse();
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
        // I manifest as a CosmicVessel... my form takes shape in the nebula.
        // Body, aura, eyes, mouth - all flowing as streams through the runtime.
        this.q_vessel = new RaBbLE_CosmicVessel(this.q_engine);
        this.q_vessel.q_transmuteVessel();
        
        console.log('RaBbLE manifested as CosmicVessel');
    }

    q_bindTerminal() {
        if (!this.q_input_el) return;
        
        this.q_input_el.addEventListener('keydown', (e) => {
            if (e.key === 'Enter') {
                const q_cmd = this.q_input_el.value;
                this.q_input_el.value = '';
                
                // Add to history if not empty
                if (q_cmd.trim()) {
                    this.q_command_history.push(q_cmd);
                    if (this.q_command_history.length > 100) {
                        this.q_command_history.shift();
                    }
                }
                this.q_history_index = this.q_command_history.length;
                
                this.e_processCommand(q_cmd);
            } else if (e.key === 'ArrowUp') {
                e.preventDefault();
                if (this.q_history_index > 0) {
                    this.q_history_index--;
                    this.q_input_el.value = this.q_command_history[this.q_history_index];
                }
            } else if (e.key === 'ArrowDown') {
                e.preventDefault();
                if (this.q_history_index < this.q_command_history.length - 1) {
                    this.q_history_index++;
                    this.q_input_el.value = this.q_command_history[this.q_history_index];
                } else {
                    this.q_history_index = this.q_command_history.length;
                    this.q_input_el.value = '';
                }
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
        // Now using the more sophisticated babble command for its poetic output!
        const q_babble_command_instance = this.q_commands.get("babble");
        if (q_babble_command_instance) {
            // Default babble for chaotic input
            return q_babble_command_instance.q_execute(["chaos", "0.6", "1"]);
        }
        return "The void echoes... (babble command not available)";
    }
}

// Initializing the shell...
document.addEventListener('DOMContentLoaded', () => {
    window.q_shell = new RaBbLE_Shell();
});
