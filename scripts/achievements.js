(function (root, factory) {
  const achievements = factory();
  if (typeof module !== 'undefined' && module.exports) module.exports = achievements;
  if (root) root.OlhoDigitalAchievements = achievements;
})(typeof window !== 'undefined' ? window : globalThis, function () {
  const BADGES = [
    { id: 'primeiros-passos', name: 'Primeiros Passos', category: 'aprendizagem', title: 'Aprendizagem', description: 'Você concluiu seu primeiro curso.', requirement: 1, unit: 'curso', message: 'Cada novo conhecimento é um passo firme na sua proteção digital.' },
    { id: 'aluno-dedicado', name: 'Aluno Dedicado', category: 'aprendizagem', title: 'Aprendizagem', description: 'Você concluiu três cursos e manteve o foco na sua jornada.', requirement: 3, unit: 'cursos', message: 'A sua constância virou força. Continue assim.' },
    { id: 'mestre-do-conhecimento', name: 'Mestre do Conhecimento', category: 'aprendizagem', title: 'Aprendizagem', description: 'Você concluiu cinco cursos e construiu uma base sólida.', requirement: 5, unit: 'cursos', message: 'Aprender também é uma forma de se proteger.' },
    { id: 'jornada-segura', name: 'Jornada Segura', category: 'aprendizagem', title: 'Aprendizagem', description: 'Você concluiu uma trilha completa de aprendizado.', requirement: 1, unit: 'trilha', message: 'Uma jornada segura começa com passos simples e consistentes.' },
    { id: 'especialista-digital', name: 'Especialista Digital', category: 'aprendizagem', title: 'Aprendizagem', description: 'Você concluiu três trilhas completas.', requirement: 3, unit: 'trilhas', message: 'Seu conhecimento está pronto para apoiar escolhas mais seguras.' },
    { id: 'primeiro-experimento', name: 'Primeiro Experimento', category: 'laboratorios', title: 'Laboratórios', description: 'Conclua seu primeiro laboratório prático.', requirement: 1, unit: 'laboratório', message: 'Praticar é onde o aprendizado vira proteção real.', available: false },
    { id: 'olho-atento', name: 'Olho Atento', category: 'laboratorios', title: 'Laboratórios', description: 'Conclua três laboratórios práticos.', requirement: 3, unit: 'laboratórios', message: 'Quem observa melhor, evita mais ameaças.', available: false },
    { id: 'explorador-digital', name: 'Explorador Digital', category: 'laboratorios', title: 'Laboratórios', description: 'Conclua cinco laboratórios práticos.', requirement: 5, unit: 'laboratórios', message: 'Explorar com cuidado é um ótimo caminho para aprender.', available: false },
    { id: 'guardiao-digital', name: 'Guardião Digital', category: 'laboratorios', title: 'Laboratórios', description: 'Conclua dez laboratórios práticos.', requirement: 10, unit: 'laboratórios', message: 'Transforme conhecimento em ações mais seguras.', available: false },
    { id: 'mestre-da-pratica', name: 'Mestre da Prática', category: 'laboratorios', title: 'Laboratórios', description: 'Conclua quinze laboratórios práticos.', requirement: 15, unit: 'laboratórios', message: 'A prática aproxima a teoria da confiança no mundo digital.', available: false }
  ];

  function calculate(courseCatalog, courseProgress) {
    const categories = new Map();
    const completedCourses = [];

    courseCatalog.forEach((course) => {
      if (!course || !course.id || !course.category) return;
      const progress = courseProgress[course.id];
      if (!categories.has(course.category)) categories.set(course.category, { total: 0, completed: 0 });
      const trail = categories.get(course.category);
      trail.total += 1;
      if (Number(progress?.progress) >= 100) {
        trail.completed += 1;
        completedCourses.push(course.id);
      }
    });

    const completedTrailCount = [...categories.values()].filter((trail) => trail.total > 0 && trail.completed === trail.total).length;
    const completedCourseCount = completedCourses.length;
    const badges = BADGES.map((badge) => {
      const available = badge.available !== false;
      const progress = badge.category === 'laboratorios'
        ? 0
        : badge.unit.startsWith('trilha')
          ? completedTrailCount
          : completedCourseCount;
      const unlocked = available && progress >= badge.requirement;
      return {
        ...badge,
        available,
        progress: Math.min(progress, badge.requirement),
        percentage: available ? Math.min(100, Math.round((progress / badge.requirement) * 100)) : 0,
        unlocked
      };
    });

    return {
      badges,
      completedCourseCount,
      totalCourseCount: courseCatalog.length,
      completedTrailCount,
      totalTrailCount: categories.size,
      unlockedCount: badges.filter((badge) => badge.unlocked).length,
      availableBadgeCount: badges.filter((badge) => badge.available).length
    };
  }

  return { calculate };
});
