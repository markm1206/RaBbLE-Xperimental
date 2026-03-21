/**
 * q_entity Unit Tests - The Quantum Entity Proving Grounds
 * Validates the atomic unit of the Flat-Chaos Runtime
 */

import { RaBbLE_TestFramework } from '../TestFramework.js';
import { RaBbLE_MockFactory } from '../RaBbLE_MockFactory.js';
import { RABBLE_CONFIG } from '../RaBbLE_Config.js';

// Create test framework instance
const q_test = new RaBbLE_TestFramework({ verbose: true });

// Create mock factory
const q_factory = new RaBbLE_MockFactory({ recording: true });

// ==========================================
// TEST SUITE: Entity Creation
// ==========================================
q_test.q_startSuite('Entity Creation');

q_test.q_addTest('creates entity with valid DNA type', () => {
  const q_entity = q_factory.q_createMockEntity('SPHERE');
  
  q_test.q_assertNotNull(q_entity);
  q_test.q_assertEqual(q_entity.dna_type, 'SPHERE');
  q_test.q_assertNotNull(q_entity.rabble_id);
  q_test.q_assertRange(q_entity.e_entropy_sig, 0, 1);
}, 'Entity Creation');

q_test.q_addTest('creates entity with BOX DNA type', () => {
  const q_entity = q_factory.q_createMockEntity('BOX');
  
  q_test.q_assertEqual(q_entity.dna_type, 'BOX');
}, 'Entity Creation');

q_test.q_addTest('creates entity with TETRAHEDRON DNA type', () => {
  const q_entity = q_factory.q_createMockEntity('TETRAHEDRON');
  
  q_test.q_assertEqual(q_entity.dna_type, 'TETRAHEDRON');
}, 'Entity Creation');

q_test.q_addTest('creates entity with custom ID', () => {
  const q_entity = q_factory.q_createMockEntity('SPHERE', {
    rabble_id: 'custom_test_id'
  });
  
  q_test.q_assertEqual(q_entity.rabble_id, 'custom_test_id');
}, 'Entity Creation');

q_test.q_addTest('creates entity with custom entropy', () => {
  const q_entity = q_factory.q_createMockEntity('SPHERE', {
    entropy: 0.75
  });
  
  q_test.q_assertCloseTo(q_entity.e_entropy_sig, 0.75, 0.001);
}, 'Entity Creation');

q_test.q_endSuite();

// ==========================================
// TEST SUITE: Entity Transformations
// ==========================================
q_test.q_startSuite('Entity Transformations');

q_test.q_addTest('transmute entropy updates entropy signature', () => {
  const q_entity = q_factory.q_createMockEntity('SPHERE');
  q_factory.q_resetRecording();
  
  q_entity.q_transmuteEntropy(0.8);
  
  q_test.q_assertCloseTo(q_entity.e_entropy_sig, 0.8, 0.001);
  q_test.q_assertTrue(q_factory.q_wasMethodCalled('q_transmuteEntropy'));
}, 'Entity Transformations');

q_test.q_addTest('transmute entropy signature clamps to valid range', () => {
  const q_entity = q_factory.q_createMockEntity('SPHERE');
  
  q_entity.q_transmuteEntropySignature(1.5);
  q_test.q_assertRange(q_entity.e_entropy_sig, 0, 1);
  
  q_entity.q_transmuteEntropySignature(-0.5);
  q_test.q_assertRange(q_entity.e_entropy_sig, 0, 1);
}, 'Entity Transformations');

q_test.q_addTest('transmute render color updates color', () => {
  const q_entity = q_factory.q_createMockEntity('SPHERE');
  q_factory.q_resetRecording();
  
  const q_result = q_entity.q_transmuteRenderColor(0xFF0000);
  
  q_test.q_assertEqual(q_entity.q_render_color, 0xFF0000);
  q_test.q_assertTrue(q_factory.q_wasMethodCalled('q_transmuteRenderColor'));
  q_test.q_assertEqual(q_result, q_entity); // Returns self for chaining
}, 'Entity Transformations');

q_test.q_addTest('transmute render opacity clamps to valid range', () => {
  const q_entity = q_factory.q_createMockEntity('SPHERE');
  
  q_entity.q_transmuteRenderOpacity(1.5);
  q_test.q_assertRange(q_entity.q_render_opacity, 0, 1);
  
  q_entity.q_transmuteRenderOpacity(-0.5);
  q_test.q_assertRange(q_entity.q_render_opacity, 0, 1);
}, 'Entity Transformations');

q_test.q_addTest('transmute shape params merges parameters', () => {
  const q_entity = q_factory.q_createMockEntity('ELLIPSE', {
    shape_params: { q_x_radius: 0.5 }
  });
  
  q_entity.q_transmuteShapeParams({ q_y_radius: 0.7 });
  
  q_test.q_assertEqual(q_entity.q_shape_params.q_x_radius, 0.5);
  q_test.q_assertEqual(q_entity.q_shape_params.q_y_radius, 0.7);
}, 'Entity Transformations');

q_test.q_endSuite();

// ==========================================
// TEST SUITE: Entity Cloning
// ==========================================
q_test.q_startSuite('Entity Cloning');

q_test.q_addTest('clone creates new entity with same properties', () => {
  const q_entity = q_factory.q_createMockEntity('SPHERE', {
    entropy: 0.6,
    color: 0x00FF00
  });
  
  const q_clone = q_entity.q_transmuteClone();
  
  q_test.q_assertNotEqual(q_entity.rabble_id, q_clone.rabble_id);
  q_test.q_assertEqual(q_entity.dna_type, q_clone.dna_type);
  q_test.q_assertCloseTo(q_entity.e_entropy_sig, q_clone.e_entropy_sig, 0.001);
  q_test.q_assertEqual(q_entity.q_render_color, q_clone.q_render_color);
}, 'Entity Cloning');

q_test.q_addTest('clone has _clone suffix in ID', () => {
  const q_entity = q_factory.q_createMockEntity('SPHERE', {
    rabble_id: 'original_id'
  });
  
  const q_clone = q_entity.q_transmuteClone();
  
  q_test.q_assertTrue(q_clone.rabble_id.includes('_clone'));
}, 'Entity Cloning');

q_test.q_endSuite();

// ==========================================
// TEST SUITE: Entity Serialization
// ==========================================
q_test.q_startSuite('Entity Serialization');

q_test.q_addTest('toJSON serializes entity correctly', () => {
  const q_entity = q_factory.q_createMockEntity('SPHERE', {
    rabble_id: 'test_id',
    entropy: 0.5,
    color: 0xFF00FF
  });
  
  const q_json = q_entity.q_toJSON();
  
  q_test.q_assertEqual(q_json.rabble_id, 'test_id');
  q_test.q_assertEqual(q_json.dna_type, 'SPHERE');
  q_test.q_assertCloseTo(q_json.e_entropy_sig, 0.5, 0.001);
  q_test.q_assertEqual(q_json.q_render_color, 0xFF00FF);
  q_test.q_assertType(q_json.flux_matrix, 'object');
}, 'Entity Serialization');

q_test.q_endSuite();

// ==========================================
// TEST SUITE: Entropy Visualization
// ==========================================
q_test.q_startSuite('Entropy Visualization');

q_test.q_addTest('visualizeEntropy returns current entropy', () => {
  const q_entity = q_factory.q_createMockEntity('SPHERE', {
    entropy: 0.42
  });
  
  const q_entropy = q_entity.q_visualizeEntropy();
  
  q_test.q_assertCloseTo(q_entropy, 0.42, 0.001);
}, 'Entropy Visualization');

q_test.q_endSuite();

// ==========================================
// RUN ALL TESTS
// ==========================================
const q_results = q_test.q_runAll();

// Export results for test runner integration
export { q_results };