const test = require('node:test');
const assert = require('node:assert/strict');
const { calculate } = require('../scripts/achievements.js');

const catalog = [
  { id: 'course-a', category: 'Contas' },
  { id: 'course-b', category: 'Contas' },
  { id: 'course-c', category: 'Golpes' },
  { id: 'course-d', category: 'Golpes' },
  { id: 'course-e', category: 'Técnico' }
];

test('desbloqueia marcos de cursos usando apenas o progresso da conta', () => {
  const result = calculate(catalog, {
    'course-a': { progress: 100 },
    'course-b': { progress: 100 },
    'course-c': { progress: 99 },
    'unlisted-course': { progress: 100 }
  });

  assert.equal(result.completedCourseCount, 2);
  assert.equal(result.badges[0].unlocked, true);
  assert.equal(result.badges[1].unlocked, false);
  assert.equal(result.badges[1].progress, 2);
});

test('só conta uma trilha quando todos os cursos dela foram concluídos', () => {
  const result = calculate(catalog, {
    'course-a': { progress: 100 },
    'course-b': { progress: 100 },
    'course-c': { progress: 100 },
    'course-d': { progress: 100 }
  });

  assert.equal(result.completedTrailCount, 2);
  assert.equal(result.badges[3].unlocked, true);
  assert.equal(result.badges[4].progress, 2);
  assert.equal(result.badges[4].unlocked, false);
});

test('mantém medalhas de laboratórios indisponíveis enquanto não há laboratórios ativos', () => {
  const result = calculate(catalog, {});
  const labBadges = result.badges.filter((badge) => badge.category === 'laboratorios');

  assert.equal(labBadges.length, 5);
  assert.equal(labBadges.every((badge) => !badge.available && !badge.unlocked), true);
  assert.equal(result.availableBadgeCount, 5);
});
