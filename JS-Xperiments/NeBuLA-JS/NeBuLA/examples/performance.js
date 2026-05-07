/**
 * RaBbLE Nebula Performance Testing Framework - RBCNS Compliant
 * 
 * Comprehensive performance testing and benchmarking system for the
 * RaBbLE Nebula Renderer. Tests entity count limits, pattern stability,
 * memory usage, and rendering performance under various conditions.
 * 
 * @version 1.0.0
 * @author RaBbLE Nebula Team
 */

// Import the unified RaBbLE Nebula build
import { RaBbLE_Nebula_Engine, FlatChaosValidator } from '../dist/rabble-nebula.js';

/**
 * RaBbLE Nebula Performance Test Suite - RBCNS Compliant
 * 
 * Systematic testing framework for performance optimization and validation.
 * All tests enforce Flat-Chaos patterns and RBCNS compliance.
 */
class RaBbLE_Nebula_Performance_Test {
    constructor(container) {
        this.container = container;
        this.engine = null;
        this.validator = new FlatChaosValidator();
        this.is_running = false;
        
        this.test_results = {
            entity_count_test: null,
            pattern_stability_test: null,
            memory_usage_test: null,
            fps_performance_test: null,
            chaos_bounds_test: null
        };
        
        this.benchmark_data = {
            max_entities: 0,
            optimal_fps: 0,
            memory_peak: 0,
            pattern_stability_score: 0
        };
        
        this._init();
    }
    
    async _init() {
        try {
            // Initialize RaBbLE Nebula Engine for testing
            this.engine = new RaBbLE_Nebula_Engine(this.container, {
                enforce_flat_chaos: true,
                rbcns_compliant: true,
                pulse_rate: 60
            });
            
            this.engine.start();
            this.is_running = true;
            
            console.log('RaBbLE Nebula Performance Test: Initialized');
            
        } catch (error) {
            console.error('Performance test initialization failed:', error);
            throw error;
        }
    }
    
    /**
     * Entity Count Performance Test
     * Tests maximum entity capacity and performance degradation
     */
    async runEntityCountTest(maxEntities = 2000) {
        console.log('Starting Entity Count Performance Test...');
        
        const results = {
            max_stable_entities: 0,
            performance_threshold: 30, // Minimum acceptable FPS
            entity_counts: [],
            fps_measurements: [],
            memory_usage: [],
            test_duration: 0
        };
        
        const startTime = performance.now();
        let currentCount = 50;
        let lastFPS = 60;
        
        try {
            while (currentCount <= maxEntities && lastFPS >= results.performance_threshold) {
                // Create test stream
                const testStream = this.engine.createOrganicStream(currentCount, 'SPHERE');
                
                // Wait for stabilization
                await this._waitForStabilization(1000);
                
                // Measure performance
                const fps = await this._measureFPS(2000);
                const memory = this._measureMemoryUsage();
                
                results.entity_counts.push(currentCount);
                results.fps_measurements.push(fps);
                results.memory_usage.push(memory);
                
                console.log(`Entities: ${currentCount}, FPS: ${fps.toFixed(1)}, Memory: ${memory.toFixed(2)}MB`);
                
                // Check if performance is acceptable
                if (fps >= results.performance_threshold) {
                    results.max_stable_entities = currentCount;
                }
                
                lastFPS = fps;
                currentCount += 50;
                
                // Clean up for next iteration
                this._clearAllStreams();
            }
            
            results.test_duration = performance.now() - startTime;
            results.optimal_entity_count = results.max_stable_entities;
            
            this.test_results.entity_count_test = results;
            this.benchmark_data.max_entities = results.max_stable_entities;
            
            console.log(`Entity Count Test Complete: Max stable entities = ${results.max_stable_entities}`);
            
        } catch (error) {
            console.error('Entity count test failed:', error);
        }
        
        return results;
    }
    
    /**
     * Pattern Stability Test
     * Tests pattern stability over time and entropy bounds
     */
    async runPatternStabilityTest(duration = 30000) { // 30 seconds
        console.log('Starting Pattern Stability Test...');
        
        const results = {
            patterns: ['organic', 'lattice', 'swarm', 'galaxy'],
            stability_scores: {},
            entropy_drift: {},
            pattern_coherence: {},
            test_duration: duration
        };
        
        try {
            for (const pattern of results.patterns) {
                // Create pattern stream
                const stream = this._createPatternStream(pattern, 100);
                
                // Measure initial state
                const initialEntropy = this._calculateAverageEntropy(stream);
                const initialCoherence = this._calculatePatternCoherence(stream, pattern);
                
                // Wait for test duration
                await this._waitForStabilization(duration);
                
                // Measure final state
                const finalEntropy = this._calculateAverageEntropy(stream);
                const finalCoherence = this._calculatePatternCoherence(stream, pattern);
                
                // Calculate stability metrics
                const entropyDrift = Math.abs(finalEntropy - initialEntropy);
                const coherenceChange = Math.abs(finalCoherence - initialCoherence);
                const stabilityScore = Math.max(0, 100 - (entropyDrift * 50) - (coherenceChange * 20));
                
                results.stability_scores[pattern] = stabilityScore;
                results.entropy_drift[pattern] = entropyDrift;
                results.pattern_coherence[pattern] = finalCoherence;
                
                console.log(`${pattern} pattern: Stability = ${stabilityScore.toFixed(1)}, Entropy drift = ${entropyDrift.toFixed(3)}`);
                
                // Clean up
                this._clearAllStreams();
            }
            
            // Calculate overall stability score
            const totalStability = Object.values(results.stability_scores).reduce((sum, score) => sum + score, 0);
            results.overall_stability_score = totalStability / results.patterns.length;
            
            this.test_results.pattern_stability_test = results;
            this.benchmark_data.pattern_stability_score = results.overall_stability_score;
            
            console.log(`Pattern Stability Test Complete: Overall score = ${results.overall_stability_score.toFixed(1)}`);
            
        } catch (error) {
            console.error('Pattern stability test failed:', error);
        }
        
        return results;
    }
    
    /**
     * Memory Usage Test
     * Tests memory consumption and potential leaks
     */
    async runMemoryUsageTest(duration = 60000) { // 1 minute
        console.log('Starting Memory Usage Test...');
        
        const results = {
            memory_samples: [],
            memory_growth_rate: 0,
            peak_memory: 0,
            memory_leak_detected: false,
            test_duration: duration
        };
        
        try {
            // Create initial load
            const initialStream = this.engine.createOrganicStream(500, 'SPHERE');
            
            const startTime = performance.now();
            let lastMemory = this._measureMemoryUsage();
            let memoryGrowth = 0;
            
            // Sample memory usage over time
            const sampleInterval = setInterval(() => {
                const currentMemory = this._measureMemoryUsage();
                const timeElapsed = performance.now() - startTime;
                
                results.memory_samples.push({
                    time: timeElapsed,
                    memory: currentMemory
                });
                
                if (currentMemory > results.peak_memory) {
                    results.peak_memory = currentMemory;
                }
                
                // Check for memory growth
                if (currentMemory > lastMemory) {
                    memoryGrowth += (currentMemory - lastMemory);
                }
                
                lastMemory = currentMemory;
                
            }, 1000);
            
            // Wait for test duration
            await this._waitForStabilization(duration);
            
            clearInterval(sampleInterval);
            
            // Calculate memory growth rate
            results.memory_growth_rate = memoryGrowth / (duration / 1000);
            results.memory_leak_detected = results.memory_growth_rate > 0.1; // 0.1MB/s threshold
            
            this.test_results.memory_usage_test = results;
            this.benchmark_data.memory_peak = results.peak_memory;
            
            console.log(`Memory Usage Test Complete: Peak = ${results.peak_memory.toFixed(2)}MB, Growth = ${results.memory_growth_rate.toFixed(3)}MB/s`);
            
        } catch (error) {
            console.error('Memory usage test failed:', error);
        }
        
        return results;
    }
    
    /**
     * FPS Performance Test
     * Tests frame rate under various load conditions
     */
    async runFPSPerformanceTest() {
        console.log('Starting FPS Performance Test...');
        
        const results = {
            baseline_fps: 0,
            load_test_fps: [],
            stress_test_fps: 0,
            recovery_time: 0
        };
        
        try {
            // Baseline measurement
            results.baseline_fps = await this._measureFPS(5000);
            console.log(`Baseline FPS: ${results.baseline_fps.toFixed(1)}`);
            
            // Load testing with increasing entity counts
            const loadLevels = [100, 200, 500, 1000, 1500];
            
            for (const count of loadLevels) {
                // Create load
                const stream = this.engine.createOrganicStream(count, 'SPHERE');
                
                // Measure FPS under load
                const fps = await this._measureFPS(3000);
                results.load_test_fps.push({ entities: count, fps: fps });
                
                console.log(`Load test (${count} entities): ${fps.toFixed(1)} FPS`);
                
                // Clean up
                this._clearAllStreams();
            }
            
            // Stress test
            const stressStream = this.engine.createOrganicStream(2000, 'SPHERE');
            results.stress_test_fps = await this._measureFPS(5000);
            
            console.log(`Stress test (2000 entities): ${results.stress_test_fps.toFixed(1)} FPS`);
            
            // Recovery test
            this._clearAllStreams();
            const recoveryStart = performance.now();
            const recoveryFPS = await this._measureFPS(5000);
            results.recovery_time = performance.now() - recoveryStart;
            
            console.log(`Recovery test: ${recoveryFPS.toFixed(1)} FPS in ${results.recovery_time.toFixed(0)}ms`);
            
            this.test_results.fps_performance_test = results;
            this.benchmark_data.optimal_fps = results.baseline_fps;
            
        } catch (error) {
            console.error('FPS performance test failed:', error);
        }
        
        return results;
    }
    
    /**
     * Chaos Bounds Test
     * Tests entropy bounds and Flat-Chaos pattern enforcement
     */
    async runChaosBoundsTest() {
        console.log('Starting Chaos Bounds Test...');
        
        const results = {
            entropy_bounds_respected: true,
            pattern_drift_detected: false,
            chaos_stability_score: 0,
            violations: []
        };
        
        try {
            // Test each pattern with varying entropy levels
            const patterns = ['organic', 'lattice', 'swarm', 'galaxy'];
            const entropyLevels = [0.1, 0.3, 0.5, 0.7, 0.9];
            
            for (const pattern of patterns) {
                for (const entropy of entropyLevels) {
                    try {
                        // Create stream with specific entropy
                        const stream = this._createPatternStream(pattern, 50);
                        
                        // Apply entropy constraint
                        stream.q_getEntities().forEach(entity => {
                            entity.e_applyEntropy(entropy);
                        });
                        
                        // Validate pattern constraints
                        const isValid = this.validator.validatePattern(pattern, entropy);
                        
                        if (!isValid) {
                            results.violations.push({
                                pattern: pattern,
                                entropy: entropy,
                                type: 'entropy_bounds_violation'
                            });
                            results.entropy_bounds_respected = false;
                        }
                        
                        // Test pattern stability over time
                        await this._waitForStabilization(2000);
                        
                        const currentEntropy = this._calculateAverageEntropy(stream);
                        const entropyDrift = Math.abs(currentEntropy - entropy);
                        
                        if (entropyDrift > 0.1) {
                            results.violations.push({
                                pattern: pattern,
                                entropy: entropy,
                                drift: entropyDrift,
                                type: 'pattern_drift'
                            });
                            results.pattern_drift_detected = true;
                        }
                        
                        // Clean up
                        this._clearAllStreams();
                        
                    } catch (validationError) {
                        results.violations.push({
                            pattern: pattern,
                            entropy: entropy,
                            error: validationError.message,
                            type: 'validation_error'
                        });
                    }
                }
            }
            
            // Calculate chaos stability score
            const violationCount = results.violations.length;
            results.chaos_stability_score = Math.max(0, 100 - (violationCount * 10));
            
            this.test_results.chaos_bounds_test = results;
            
            console.log(`Chaos Bounds Test Complete: Stability score = ${results.chaos_stability_score.toFixed(1)}, Violations = ${violationCount}`);
            
        } catch (error) {
            console.error('Chaos bounds test failed:', error);
        }
        
        return results;
    }
    
    /**
     * Run All Performance Tests
     */
    async runAllTests() {
        console.log('=== RaBbLE Nebula Performance Test Suite ===');
        
        const startTime = performance.now();
        
        // Run all tests
        await this.runEntityCountTest(1500);
        await this.runPatternStabilityTest(15000); // 15 seconds per pattern
        await this.runMemoryUsageTest(30000); // 30 seconds
        await this.runFPSPerformanceTest();
        await this.runChaosBoundsTest();
        
        const totalTime = performance.now() - startTime;
        
        // Generate performance report
        const report = this._generatePerformanceReport(totalTime);
        
        console.log('=== Performance Test Complete ===');
        console.log('Benchmark Summary:');
        console.log(`- Max Stable Entities: ${this.benchmark_data.max_entities}`);
        console.log(`- Optimal FPS: ${this.benchmark_data.optimal_fps.toFixed(1)}`);
        console.log(`- Peak Memory: ${this.benchmark_data.memory_peak.toFixed(2)}MB`);
        console.log(`- Pattern Stability: ${this.benchmark_data.pattern_stability_score.toFixed(1)}`);
        
        return report;
    }
    
    /**
     * Helper Methods
     */
    _createPatternStream(pattern, count) {
        switch (pattern) {
            case 'organic':
                return this.engine.createOrganicStream(count, 'SPHERE');
            case 'lattice':
                return this.engine.createLatticeStream(count, 'BOX');
            case 'swarm':
                return this.engine.createSwarmStream(count, 'TETRAHEDRON');
            case 'galaxy':
                return this.engine.createGalaxyStream(count, 'SPHERE');
            default:
                return this.engine.createOrganicStream(count, 'SPHERE');
        }
    }
    
    async _waitForStabilization(duration) {
        return new Promise(resolve => setTimeout(resolve, duration));
    }
    
    async _measureFPS(duration) {
        return new Promise(resolve => {
            let frameCount = 0;
            let startTime = performance.now();
            let endTime = startTime + duration;
            
            const measure = () => {
                frameCount++;
                if (performance.now() >= endTime) {
                    const fps = frameCount / (duration / 1000);
                    resolve(fps);
                } else {
                    requestAnimationFrame(measure);
                }
            };
            
            requestAnimationFrame(measure);
        });
    }
    
    _measureMemoryUsage() {
        if (performance.memory) {
            return performance.memory.usedJSHeapSize / (1024 * 1024); // Convert to MB
        }
        return 0;
    }
    
    _calculateAverageEntropy(stream) {
        const entities = stream.q_getEntities();
        if (entities.length === 0) return 0;
        
        const totalEntropy = entities.reduce((sum, entity) => sum + entity.q_getEntropy(), 0);
        return totalEntropy / entities.length;
    }
    
    _calculatePatternCoherence(stream, pattern) {
        // Simple coherence calculation based on pattern type
        const entities = stream.q_getEntities();
        if (entities.length === 0) return 0;
        
        let coherence = 0;
        
        switch (pattern) {
            case 'lattice':
                // Lattice should have geometric coherence
                coherence = this._calculateGeometricCoherence(entities);
                break;
            case 'swarm':
                // Swarm should have clustering coherence
                coherence = this._calculateClusteringCoherence(entities);
                break;
            case 'galaxy':
                // Galaxy should have spiral coherence
                coherence = this._calculateSpiralCoherence(entities);
                break;
            case 'organic':
                // Organic should have growth coherence
                coherence = this._calculateGrowthCoherence(entities);
                break;
        }
        
        return coherence;
    }
    
    _calculateGeometricCoherence(entities) {
        // Calculate how well entities maintain geometric patterns
        let coherence = 0;
        const gridSize = Math.ceil(Math.sqrt(entities.length));
        
        entities.forEach((entity, index) => {
            const expectedX = (index % gridSize) - gridSize / 2;
            const expectedY = Math.floor(index / gridSize) - gridSize / 2;
            const actualX = entity.flux_matrix[12];
            const actualY = entity.flux_matrix[13];
            
            const distance = Math.sqrt(Math.pow(actualX - expectedX, 2) + Math.pow(actualY - expectedY, 2));
            coherence += Math.max(0, 1 - distance / 10); // Normalize to 0-1
        });
        
        return coherence / entities.length;
    }
    
    _calculateClusteringCoherence(entities) {
        // Calculate how well entities maintain swarm clustering
        let coherence = 0;
        const center = { x: 0, y: 0, z: 0 };
        
        entities.forEach(entity => {
            const distance = Math.sqrt(
                Math.pow(entity.flux_matrix[12] - center.x, 2) +
                Math.pow(entity.flux_matrix[13] - center.y, 2) +
                Math.pow(entity.flux_matrix[14] - center.z, 2)
            );
            
            // Closer to center = higher coherence
            coherence += Math.max(0, 1 - distance / 20);
        });
        
        return coherence / entities.length;
    }
    
    _calculateSpiralCoherence(entities) {
        // Calculate how well entities maintain spiral patterns
        let coherence = 0;
        const totalEntities = entities.length;
        
        entities.forEach((entity, index) => {
            const expectedAngle = (index / totalEntities) * Math.PI * 2;
            const expectedRadius = 8 + (index * 0.3);
            
            const actualX = entity.flux_matrix[12];
            const actualY = entity.flux_matrix[13];
            const actualRadius = Math.sqrt(actualX * actualX + actualY * actualY);
            const actualAngle = Math.atan2(actualY, actualX);
            
            const radiusDiff = Math.abs(actualRadius - expectedRadius);
            const angleDiff = Math.abs(actualAngle - expectedAngle);
            
            const patternScore = Math.max(0, 1 - (radiusDiff / 10) - (angleDiff / Math.PI));
            coherence += patternScore;
        });
        
        return coherence / entities.length;
    }
    
    _calculateGrowthCoherence(entities) {
        // Calculate how well entities maintain organic growth patterns
        let coherence = 0;
        
        entities.forEach(entity => {
            const entropy = entity.q_getEntropy();
            const scale = entity.flux_matrix[0]; // Scale factor
            
            // Higher entropy should correlate with larger scale
            const expectedScale = 1 + (entropy * 0.5);
            const scaleDiff = Math.abs(scale - expectedScale);
            
            coherence += Math.max(0, 1 - scaleDiff);
        });
        
        return coherence / entities.length;
    }
    
    _clearAllStreams() {
        // Clear all streams by stopping and restarting engine
        this.engine.stop();
        this.engine.start();
    }
    
    _generatePerformanceReport(totalTime) {
        return {
            test_duration: totalTime,
            benchmark_data: this.benchmark_data,
            test_results: this.test_results,
            overall_score: this._calculateOverallScore(),
            recommendations: this._generateRecommendations()
        };
    }
    
    _calculateOverallScore() {
        const scores = [
            this.benchmark_data.optimal_fps / 60 * 25, // FPS score (25%)
            this.benchmark_data.max_entities / 1000 * 25, // Entity score (25%)
            this.benchmark_data.pattern_stability_score / 100 * 25, // Stability score (25%)
            this.test_results.chaos_bounds_test?.chaos_stability_score / 100 * 25 || 0 // Chaos score (25%)
        ];
        
        return scores.reduce((sum, score) => sum + score, 0);
    }
    
    _generateRecommendations() {
        const recommendations = [];
        
        if (this.benchmark_data.max_entities < 500) {
            recommendations.push('Consider optimizing entity rendering for higher counts');
        }
        
        if (this.benchmark_data.optimal_fps < 30) {
            recommendations.push('Performance optimization needed for better frame rates');
        }
        
        if (this.benchmark_data.pattern_stability_score < 80) {
            recommendations.push('Pattern stability needs improvement');
        }
        
        if (this.test_results.memory_usage_test?.memory_leak_detected) {
            recommendations.push('Memory leak detected - investigate entity cleanup');
        }
        
        if (this.test_results.chaos_bounds_test?.violations.length > 0) {
            recommendations.push('Flat-Chaos pattern violations detected - review entropy bounds');
        }
        
        return recommendations;
    }
    
    /**
     * Cleanup and Destroy
     */
    destroy() {
        try {
            if (this.engine) {
                this.engine.stop();
            }
            
            this.is_running = false;
            console.log('RaBbLE Nebula Performance Test: Destroyed');
            
        } catch (error) {
            console.error('Failed to destroy performance test:', error);
        }
    }
}

// Export for module usage
export { RaBbLE_Nebula_Performance_Test };

// Auto-initialize if in browser environment and not imported as module
if (typeof window !== 'undefined' && !window.RaBbLE_Nebula_Performance_Test) {
    window.RaBbLE_Nebula_Performance_Test = RaBbLE_Nebula_Performance_Test;
}