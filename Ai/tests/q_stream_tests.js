/**
 * q_stream Unit Tests - The Quantum Stream Proving Grounds
 * Validates the flat array container of quantum entities
 */

import { RaBbLE_TestFramework } from '../TestFramework.js';
import { RaBbLE_MockFactory } from '../RaBbLE_MockFactory.js';
import { RABBLE_CONFIG } from '../RaBbLE_Config.js';

// Create test framework instance
const q_test = new RaBbLE_TestFramework({ verbose: true });

// Create mock factory
const q_factory = new RaBbLE_MockFactory({ recording: true });

// ==========================================
// TEST SUITE: Stream Creation
// ==========================================
q_test.q_startSuite('Stream Creation');

q_test.q_addTest('creates stream with generated ID', () => {
  const q_stream = q_factory.q_createMockStream();
  
  q_test.q_assertNotNull(q_stream);
  q_test.q_assertNotNull(q_stream.q_stream_id);
  q_test.q_assertTrue(q_stream.q_stream_id.startsWith('mock_stream_'));
}, 'Stream Creation');

q_test.q_addTest('creates stream with custom ID', () => {
  const q_stream = q_factory.q_createMockStream('custom_stream_id');
  
  q_test.q_assertEqual(q_stream.q_stream_id, 'custom_stream_id');
}, 'Stream Creation');

q_test.q_addTest('creates stream with specified entity count', () => {
  const q_stream = q_factory.q_createMockStream(null, 15, 'SPHERE');
  
  q_test.q_assertEqual(q_stream.q_length, 15);
  q_test.q_assertLength(q_stream.q_entities, 15);
}, 'Stream Creation');

q_test.q_addTest('creates stream with correct DNA type', () => {
  const q_stream = q_factory.q_createMockStream(null, 5, 'TETRAHEDRON');
  
  q_stream.q_entities.forEach(entity => {
    q_test.q_assertEqual(entity.dna_type, 'TETRAHEDRON');
  });
}, 'Stream Creation');

q_test.q_endSuite();

// ==========================================
// TEST SUITE: Stream Entity Management
// ==========================================
q_test.q_startSuite('Stream Entity Management');

q_test.q_addTest('transmuteEntity adds entity to stream', () => {
  const q_stream = q_factory.q_createMockStream(null, 0);
  const q_entity = q_factory.q_createMockEntity('BOX');
  q_factory.q_resetRecording();
  
  q_stream.q_transmuteEntity(q_entity);
  
  q_test.q_assertEqual(q_stream.q_length, 1);
  q_test.q_assertContains(q_stream.q_entities, q_entity);
  q_test.q_assertTrue(q_factory.q_wasMethodCalled('q_transmuteEntity'));
}, 'Stream Entity Management');

q_test.q_addTest('transmuteEntities adds multiple entities', () => {
  const q_stream = q_factory.q_createMockStream(null, 0);
  const q_entities = [
    q_factory.q_createMockEntity('SPHERE'),
    q_factory.q_createMockEntity('BOX'),
    q_factory.q_createMockEntity('TETRAHEDRON')
  ];
  
  q_stream.q_transmuteEntities(q_entities);
  
  q_test.q_assertEqual(q_stream.q_length, 3);
}, 'Stream Entity Management');

q_test.q_addTest('dissolveEntity removes entity from stream', () => {
  const q_entity = q_factory.q_createMockEntity('SPHERE', { rabble_id: 'test_entity' });
  const q_stream = q_factory.q_createMockStream(null, 0);
  q_stream.q_transmuteEntity(q_entity);
  q_factory.q_resetRecording();
  
  const q_removed = q_stream.q_dissolveEntity('test_entity');
  
  q_test.q_assertEqual(q_stream.q_length, 0);
  q_test.q_assertNotNull(q_removed);
  q_test.q_assertTrue(q_factory.q_wasMethodCalled('q_dissolveEntity'));
}, 'Stream Entity Management');

q_test.q_addTest('dissolveEntity returns null for missing entity', () => {
  const q_stream = q_factory.q_createMockStream(null, 5);
  
  const q_removed = q_stream.q_dissolveEntity('non_existent_id');
  
  q_test.q_assertNull(q_removed);
}, 'Stream Entity Management');

q_test.q_addTest('dissolveAll clears all entities', () => {
  const q_stream = q_factory.q_createMockStream(null, 10);
  q_factory.q_resetRecording();
  
  q_stream.q_dissolveAll();
  
  q_test.q_assertEqual(q_stream.q_length, 0);
  q_test.q_assertLength(q_stream.q_entities, 0);
  q_test.q_assertTrue(q_factory.q_wasMethodCalled('q_dissolveAll'));
}, 'Stream Entity Management');

q_test.q_endSuite();

// ==========================================
// TEST SUITE: Stream Flux Modifier
// ==========================================
q_test.q_startSuite('Stream Flux Modifier');

q_test.q_addTest('igniteFlux applies modifier to all entities', () => {
  const q_stream = q_factory.q_createMockStream(null, 3, 'SPHERE');
  let q_call_count = 0;
  
  q_stream.q_transmuteFluxModifier((entity, index) => {
    q_call_count++;
    return entity;
  });
  
  q_stream.q_igniteFlux();
  
  q_test.q_assertEqual(q_call_count, 3);
}, 'Stream Flux Modifier');

q_test.q_addTest('transmuteFluxModifier updates modifier function', () => {
  const q_stream = q_factory.q_createMockStream(null, 2);
  q_factory.q_resetRecording();
  
  const q_new_modifier = (entity, index) => entity;
  q_stream.q_transmuteFluxModifier(q_new_modifier);
  
  q_test.q_assertTrue(q_factory.q_wasMethodCalled('q_transmuteFluxModifier'));
  q_test.q_assertEqual(q_stream.flux_modifier, q_new_modifier);
}, 'Stream Flux Modifier');

q_test.q_endSuite();

// ==========================================
// TEST SUITE: Stream Entity Extraction
// ==========================================
q_test.q_startSuite('Stream Entity Extraction');

q_test.q_addTest('extractEntitiesByType filters correctly', () => {
  const q_stream = q_factory.q_createMockStream(null, 0);
  q_stream.q_transmuteEntity(q_factory.q_createMockEntity('SPHERE'));
  q_stream.q_transmuteEntity(q_factory.q_createMockEntity('BOX'));
  q_stream.q_transmuteEntity(q_factory.q_createMockEntity('SPHERE'));
  
  const q_spheres = q_stream.q_extractEntitiesByType('SPHERE');
  
  q_test.q_assertLength(q_spheres, 2);
  q_spheres.forEach(entity => {
    q_test.q_assertEqual(entity.dna_type, 'SPHERE');
  });
}, 'Stream Entity Extraction');

q_test.q_addTest('processEntitiesByType processes matching entities', () => {
  const q_stream = q_factory.q_createMockStream(null, 0);
  q_stream.q_transmuteEntity(q_factory.q_createMockEntity('SPHERE'));
  q_stream.q_transmuteEntity(q_factory.q_createMockEntity('BOX'));
  
  let q_processed_count = 0;
  q_stream.q_processEntitiesByType('SPHERE', (entity, index) => {
    q_processed_count++;
  });
  
  q_test.q_assertEqual(q_processed_count, 1);
}, 'Stream Entity Extraction');

q_test.q_endSuite();

// ==========================================
// TEST SUITE: Stream Statistics
// ==========================================
q_test.q_startSuite('Stream Statistics');

q_test.q_addTest('extractStats returns correct entity count', () => {
  const q_stream = q_factory.q_createMockStream(null, 7);
  
  const q_stats = q_stream.q_extractStats();
  
  q_test.q_assertEqual(q_stats.entity_count, 7);
  q_test.q_assertNotNull(q_stats.stream_id);
}, 'Stream Statistics');

q_test.q_addTest('extractStats returns correct entity types', () => {
  const q_stream = q_factory.q_createMockStream(null, 0);
  q_stream.q_transmuteEntity(q_factory.q_createMockEntity('SPHERE'));
  q_stream.q_transmuteEntity(q_factory.q_createMockEntity('SPHERE'));
  q_stream.q_transmuteEntity(q_factory.q_createMockEntity('BOX'));
  
  const q_stats = q_stream.q_extractStats();
  
  q_test.q_assertEqual(q_stats.entity_types['SPHERE'], 2);
  q_test.q_assertEqual(q_stats.entity_types['BOX'], 1);
}, 'Stream Statistics');

q_test.q_addTest('extractStats calculates average entropy', () => {
  const q_stream = q_factory.q_createMockStream(null, 0);
  q_stream.q_transmuteEntity(q_factory.q_createMockEntity('SPHERE', { entropy: 0.2 }));
  q_stream.q_transmuteEntity(q_factory.q_createMockEntity('SPHERE', { entropy: 0.8 }));
  
  const q_stats = q_stream.q_extractStats();
  
  q_test.q_assertCloseTo(q_stats.average_entropy, 0.5, 0.001);
}, 'Stream Statistics');

q_test.q_endSuite();

// ==========================================
// TEST SUITE: Stream Serialization
// ==========================================
q_test.q_startSuite('Stream Serialization');

q_test.q_addTest('transmuteToJSON serializes stream correctly', () => {
  const q_stream = q_factory.q_createMockStream('test_stream', 3, 'SPHERE');
  
  const q_json = q_stream.q_transmuteToJSON();
  
  q_test.q_assertEqual(q_json.q_stream_id, 'test_stream');
  q_test.q_assertEqual(q_json.q_length, 3);
  q_test.q_assertLength(q_json.q_entities, 3);
}, 'Stream Serialization');

q_test.q_endSuite();

// ==========================================
// TEST SUITE: Stream Iterator
// ==========================================
q_test.q_startSuite('Stream Iterator');

q_test.q_addTest('stream is iterable', () => {
  const q_stream = q_factory.q_createMockStream(null, 3, 'SPHERE');
  
  let q_count = 0;
  for (const entity of q_stream) {
    q_count++;
    q_test.q_assertNotNull(entity);
  }
  
  q_test.q_assertEqual(q_count, 3);
}, 'Stream Iterator');

q_test.q_endSuite();

// ==========================================
// RUN ALL TESTS
// ==========================================
const q_results = q_test.q_runAll();

// Export results for test runner integration
export { q_results };