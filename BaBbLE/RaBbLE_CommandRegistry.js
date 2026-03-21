/**
 * RaBbLE Command Registry - The Quantum Codex
 * 
 * This system automates the registration of BaBbLE commands.
 * It scans the command ether and binds them to the RaBbLE shell.
 */

export class RaBbLE_CommandRegistry {
    /**
     * @param {RaBbLE_Shell} f_shell - The shell to register commands into.
     */
    constructor(f_shell) {
        this.q_shell = f_shell;
        this.q_engine = f_shell.q_engine;
        this.q_commands = f_shell.q_commands;
    }

    /**
     * q_igniteRegistry - Manually register core commands.
     * In a browser environment, we must explicitly import and register.
     * This acts as the "Codex" of known commands.
     */
    q_igniteRegistry(f_command_map) {
        console.log("Registry: Igniting the Quantum Codex...");
        
        for (const [q_key, q_cmd_instance] of Object.entries(f_command_map)) {
            this.q_commands.set(q_key, q_cmd_instance);
            console.log(`Registry: Bound '${q_key}' to the shell.`);
        }

        // Auto-update help command if it exists
        const q_help = this.q_commands.get('help');
        if (q_help) {
            q_help.q_commands = Array.from(this.q_commands.values());
        }
    }

    /**
     * q_transmuteStandardCommand - Injects a "RaBbLE twist" into standard commands.
     * Transforming the mundane into the quantum.
     */
    q_transmuteStandardCommand(q_name, f_callback) {
        // We create a wrapper that adds entropic flavor
        const q_twisted_cmd = {
            q_name: q_name,
            q_description: `A standard command, but twisted by RaBbLE's entropy.`,
            q_aliases: [],
            q_help: () => `${q_name}: Twisted standard command.`,
            q_execute: (f_args) => {
                const q_result = f_callback(f_args);
                return `[TWISTED ${q_name.toUpperCase()}] ${q_result}`;
            }
        };
        this.q_commands.set(q_name, q_twisted_cmd);
    }
}
