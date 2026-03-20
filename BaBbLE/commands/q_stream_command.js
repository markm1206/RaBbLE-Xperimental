// q_stream_command - The Pipeline Weaver
// Dreams become streams, streams become pipelines, pipelines become reality.
// The >> operator flows like quantum data through a fusion reactor.

import { q_command } from '../RaBbLE_BaBbLE_Pipeline.js';
import { RaBbLE_AnimationFilter } from '../../NeBuLA/core/q_animation_filter.js';

/**
 * q_stream_command - Pipeline DSL Command
 * Creates quantum streams with pipeline syntax using >> connectors
 * 
 * Syntax: stream "dream organic 50 SPHERE >> blink 4.0 >> dart 3.5 >> sink"
 * 
 * Supported stages:
 * - dream [pattern] [count] [type] - Create initial stream
 * - blink [cycle] - Apply blink animation filter
 * - dart [cycle] - Apply dart animation filter
 * - pulse [intensity] - Apply pulse animation filter
 * - orbit [speed] [radius] - Apply orbit animation filter
 * - wave [frequency] [amplitude] - Apply wave animation filter
 * - sink - Output to display
 * 
 * @property {Object} q_engine - The NeBuLA engine reference
 * @property {Map<string, RaBbLE_AnimationFilter>} q_animation_filters - Active animation filters
 */
class q_stream_command extends q_command {
  constructor(f_engine) {
    super({
      name: 'stream',
      description: 'Create quantum streams with pipeline syntax using >> connectors',
      aliases: ['pipe', 'flow']
    });
    
    // The pipeline weaver awakens... ready to parse quantum syntax.
    this.q_engine = f_engine;
    this.q_animation_filters = new Map();
  }

  /**
   * Source stage - parse pipeline string from arguments
   * @param {Array<string>} f_args - Command arguments
   * @returns {Object} Parsed parameters
   */
  q_source(f_args) {
    // Parse: stream "dream organic 50 SPHERE >> blink 4.0 >> sink"
    const q_pipeline_string = f_args.join(' ');
    return { pipeline: q_pipeline_string };
  }

  /**
   * Filter stage - validate pipeline syntax
   * @param {Object} f_params - Parsed parameters
   * @returns {Object} Validated parameters
   */
  q_filter(f_params) {
    // Validate pipeline syntax
    if (!f_params.pipeline || f_params.pipeline.trim() === '') {
      return { error: 'Pipeline string is empty' };
    }
    
    // Check for >> connectors
    if (!f_params.pipeline.includes('>>')) {
      return { error: 'Pipeline must contain >> connectors' };
    }
    
    return f_params;
  }

  /**
   * Transmute stage - execute pipeline stages
   * @param {Object} f_params - Validated parameters
   * @returns {Object} Pipeline execution result
   */
  q_transmute(f_params) {
    if (f_params.error) return f_params;
    
    // The pipeline materializes... stages flow through the quantum void.
    const q_stages = this.q_parsePipeline(f_params.pipeline);
    const q_result = this.q_executePipeline(q_stages);
    
    return q_result;
  }

  /**
   * Sink stage - format output
   * @param {Object} f_result - Pipeline result
   * @returns {string} Formatted output
   */
  q_sink(f_result) {
    if (f_result.error) {
      return `ERROR: ${f_result.error}`;
    }
    
    // The pipeline emerges... streams flow with animated life.
    return `[STREAM] ${f_result.message}\n` +
           `  Stages: ${f_result.stages}\n` +
           `  Stream: ${f_result.final_stream}`;
  }

  /**
   * Parse pipeline string into stages
   * The syntax unfolds... >> separates stages like quantum membranes.
   * @param {string} f_pipeline_string - Pipeline syntax string
   * @returns {Array<Object>} Array of pipeline stages
   */
  q_parsePipeline(f_pipeline_string) {
    const q_stage_strings = f_pipeline_string.split('>>').map(s => s.trim());
    
    return q_stage_strings.map(q_stage_str => {
      const q_parts = q_stage_str.split(' ');
      const q_command = q_parts[0];
      const q_args = q_parts.slice(1);
      
      return { command: q_command, args: q_args };
    });
  }

  /**
   * Execute pipeline stages sequentially
   * The pipeline executes... each stage transforms the quantum stream.
   * @param {Array<Object>} f_stages - Parsed pipeline stages
   * @returns {Object} Pipeline execution result
   */
  q_executePipeline(f_stages) {
    let q_current_stream = null;
    const q_results = [];
    
    for (const q_stage of f_stages) {
      const q_stage_result = this.q_executeStage(q_stage, q_current_stream);
      
      if (q_stage_result.error) {
        return { error: q_stage_result.error };
      }
      
      if (q_stage_result.stream) {
        q_current_stream = q_stage_result.stream;
      }
      
      q_results.push(q_stage_result);
    }
    
    return {
      success: true,
      stages: q_results.length,
      final_stream: q_current_stream ? q_current_stream.q_stream_id : null,
      message: `Pipeline executed: ${f_stages.length} stages`
    };
  }

  /**
   * Execute a single pipeline stage
   * A stage ignites... transformation flows through the pipeline.
   * @param {Object} f_stage - Stage to execute
   * @param {q_stream} f_current_stream - Current stream in pipeline
   * @returns {Object} Stage execution result
   */
  q_executeStage(f_stage, f_current_stream) {
    switch(f_stage.command) {
      case 'dream':
        return this.q_executeDream(f_stage.args);
      case 'blink':
        return this.q_executeBlink(f_stage.args, f_current_stream);
      case 'dart':
        return this.q_executeDart(f_stage.args, f_current_stream);
      case 'pulse':
        return this.q_executePulse(f_stage.args, f_current_stream);
      case 'orbit':
        return this.q_executeOrbit(f_stage.args, f_current_stream);
      case 'wave':
        return this.q_executeWave(f_stage.args, f_current_stream);
      case 'sink':
        return this.q_executeSink(f_stage.args, f_current_stream);
      default:
        return { error: `Unknown pipeline stage: ${f_stage.command}` };
    }
  }

  /**
   * Execute dream stage - create initial stream
   * @private
   * @param {Array<string>} f_args - Stage arguments
   * @returns {Object} Stage result with stream
   */
  q_executeDream(f_args) {
    // Dream stage: organic 50 SPHERE
    const q_pattern = f_args[0] || 'organic';
    const q_count = parseInt(f_args[1]) || 50;
    const q_type = f_args[2] || 'SPHERE';
    
    const q_stream = this.q_engine.dream_geometry_flow(q_count, q_type, q_pattern);
    
    return {
      success: true,
      stream: q_stream,
      message: `Dreamed ${q_count} ${q_type} with ${q_pattern} pattern`
    };
  }

  /**
   * Execute blink stage - add blink animation filter
   * @private
   * @param {Array<string>} f_args - Stage arguments
   * @param {q_stream} f_stream - Current stream
   * @returns {Object} Stage result
   */
  q_executeBlink(f_args, f_stream) {
    // Blink stage: blink 4.0
    const q_cycle = parseFloat(f_args[0]) || 4.0;
    
    if (!f_stream) {
      return { error: 'No stream to apply blink to' };
    }
    
    // Create blink filter with RBCNS-compliant naming
    const q_blink_filter = new RaBbLE_AnimationFilter('blink', { cycle: q_cycle });
    this.q_animation_filters.set('blink', q_blink_filter);
    
    // Apply filter to stream's flux modifier
    const q_original_modifier = f_stream.flux_modifier;
    f_stream.q_transmuteFluxModifier((f_entity, f_index) => {
      // Apply original modifier first
      let q_entity = q_original_modifier ? q_original_modifier(f_entity, f_index) : f_entity;
      
      // Then apply blink filter
      q_entity = q_blink_filter.q_applyFilter(q_entity, f_index, 0.016);
      
      return q_entity;
    });
    
    return {
      success: true,
      stream: f_stream,
      message: `Applied blink filter with ${q_cycle}s cycle`
    };
  }

  /**
   * Execute dart stage - add dart animation filter
   * @private
   * @param {Array<string>} f_args - Stage arguments
   * @param {q_stream} f_stream - Current stream
   * @returns {Object} Stage result
   */
  q_executeDart(f_args, f_stream) {
    // Dart stage: dart 3.5
    const q_cycle = parseFloat(f_args[0]) || 3.5;
    
    if (!f_stream) {
      return { error: 'No stream to apply dart to' };
    }
    
    // Create dart filter
    const q_dart_filter = new RaBbLE_AnimationFilter('dart', { cycle: q_cycle });
    this.q_animation_filters.set('dart', q_dart_filter);
    
    // Apply filter to stream
    const q_original_modifier = f_stream.flux_modifier;
    f_stream.q_transmuteFluxModifier((f_entity, f_index) => {
      let q_entity = q_original_modifier ? q_original_modifier(f_entity, f_index) : f_entity;
      q_entity = q_dart_filter.q_applyFilter(q_entity, f_index, 0.016);
      return q_entity;
    });
    
    return {
      success: true,
      stream: f_stream,
      message: `Applied dart filter with ${q_cycle}s cycle`
    };
  }

  /**
   * Execute pulse stage - add pulse animation filter
   * @private
   * @param {Array<string>} f_args - Stage arguments
   * @param {q_stream} f_stream - Current stream
   * @returns {Object} Stage result
   */
  q_executePulse(f_args, f_stream) {
    // Pulse stage: pulse 0.5
    const q_intensity = parseFloat(f_args[0]) || 0.5;
    
    if (!f_stream) {
      return { error: 'No stream to apply pulse to' };
    }
    
    const q_pulse_filter = new RaBbLE_AnimationFilter('pulse', { intensity: q_intensity });
    this.q_animation_filters.set('pulse', q_pulse_filter);
    
    const q_original_modifier = f_stream.flux_modifier;
    f_stream.q_transmuteFluxModifier((f_entity, f_index) => {
      let q_entity = q_original_modifier ? q_original_modifier(f_entity, f_index) : f_entity;
      q_entity = q_pulse_filter.q_applyFilter(q_entity, f_index, 0.016);
      return q_entity;
    });
    
    return {
      success: true,
      stream: f_stream,
      message: `Applied pulse filter with intensity ${q_intensity}`
    };
  }

  /**
   * Execute orbit stage - add orbit animation filter
   * @private
   * @param {Array<string>} f_args - Stage arguments
   * @param {q_stream} f_stream - Current stream
   * @returns {Object} Stage result
   */
  q_executeOrbit(f_args, f_stream) {
    // Orbit stage: orbit 1.0 0.1
    const q_speed = parseFloat(f_args[0]) || 1.0;
    const q_radius = parseFloat(f_args[1]) || 0.1;
    
    if (!f_stream) {
      return { error: 'No stream to apply orbit to' };
    }
    
    const q_orbit_filter = new RaBbLE_AnimationFilter('orbit', { speed: q_speed, radius: q_radius });
    this.q_animation_filters.set('orbit', q_orbit_filter);
    
    const q_original_modifier = f_stream.flux_modifier;
    f_stream.q_transmuteFluxModifier((f_entity, f_index) => {
      let q_entity = q_original_modifier ? q_original_modifier(f_entity, f_index) : f_entity;
      q_entity = q_orbit_filter.q_applyFilter(q_entity, f_index, 0.016);
      return q_entity;
    });
    
    return {
      success: true,
      stream: f_stream,
      message: `Applied orbit filter (speed: ${q_speed}, radius: ${q_radius})`
    };
  }

  /**
   * Execute wave stage - add wave animation filter
   * @private
   * @param {Array<string>} f_args - Stage arguments
   * @param {q_stream} f_stream - Current stream
   * @returns {Object} Stage result
   */
  q_executeWave(f_args, f_stream) {
    // Wave stage: wave 2.0 0.1
    const q_frequency = parseFloat(f_args[0]) || 2.0;
    const q_amplitude = parseFloat(f_args[1]) || 0.1;
    
    if (!f_stream) {
      return { error: 'No stream to apply wave to' };
    }
    
    const q_wave_filter = new RaBbLE_AnimationFilter('wave', { frequency: q_frequency, amplitude: q_amplitude });
    this.q_animation_filters.set('wave', q_wave_filter);
    
    const q_original_modifier = f_stream.flux_modifier;
    f_stream.q_transmuteFluxModifier((f_entity, f_index) => {
      let q_entity = q_original_modifier ? q_original_modifier(f_entity, f_index) : f_entity;
      q_entity = q_wave_filter.q_applyFilter(q_entity, f_index, 0.016);
      return q_entity;
    });
    
    return {
      success: true,
      stream: f_stream,
      message: `Applied wave filter (frequency: ${q_frequency}, amplitude: ${q_amplitude})`
    };
  }

  /**
   * Execute sink stage - output to display
   * @private
   * @param {Array<string>} f_args - Stage arguments
   * @param {q_stream} f_stream - Current stream
   * @returns {Object} Stage result
   */
  q_executeSink(f_args, f_stream) {
    // Sink stage: final output
    if (!f_stream) {
      return { error: 'No stream to sink' };
    }
    
    return {
      success: true,
      stream: f_stream,
      message: `Stream ${f_stream.q_stream_id} ready for display`
    };
  }
}

// The pipeline command is complete... DSL syntax flows through BaBbLE.
// Dream >> Blink >> Dart >> Sink - a quantum waterfall of creation.
// Streams now dance with procedural life, defined by simple syntax.

export { q_stream_command };