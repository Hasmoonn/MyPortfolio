import React from 'react';

const Skills = () => {
  const skillsRow1 = [
    { name: 'Python', color: '#3776AB', icon: 'python' },
    { name: 'HTML5', color: '#E34F26', icon: 'html5' },
    { name: 'CSS3', color: '#1572B6', icon: 'css' },
    { name: 'MySQL', color: '#4479A1', icon: 'mysql' },
    { name: 'JavaScript', color: '#F7DF1E', icon: 'javascript' },
    { name: 'MongoDB', color: '#47A248', icon: 'mongodb' },
    { name: 'TypeScript', color: '#3178C6', icon: 'typescript' },
    { name: 'Java', color: '#007396', icon: 'java' },
    { name: 'Oracle', color: '#F80000', icon: 'oracle' },
    { name: 'C/C++', color: '#00599C', icon: 'cplusplus' },
  ];

  const skillsRow2 = [
    { name: 'React', color: '#61DAFB', icon: 'react' },
    { name: 'Tailwind CSS', color: '#06B6D4', icon: 'tailwindcss' },
    { name: 'Next.js', color: '#FFFFFF', icon: 'nextdotjs' },
    { name: 'Express.js', color: '#FFFFFF', icon: 'express' },
    { name: 'FastAPI', color: '#009688', icon: 'fastapi' },
    { name: 'Node.js', color: '#339933', icon: 'nodedotjs' },
    { name: 'Bootstrap', color: '#7952B3', icon: 'bootstrap' },
    { name: 'Framer Motion', color: '#0055FF', icon: 'framer' },
  ];

  const skillsRow3 = [
    { name: 'Git', color: '#F05032', icon: 'git' },
    { name: 'GitHub', color: '#FFFFFF', icon: 'github' },
    { name: 'Netlify', color: '#00C7B7', icon: 'netlify' },
    { name: 'Postman', color: '#FF6C37', icon: 'postman' },
    { name: 'Replit', color: '#F26207', icon: 'replit' },
    { name: 'Vercel', color: '#FFFFFF', icon: 'vercel' },
    { name: 'Firebase', color: '#FFCA28', icon: 'firebase' },
  ];

  const skillsRow4 = [
    { name: 'API Design', color: '#5C2D91', icon: 'openapiinitiative' },
    { name: 'Accessibility', color: '#1E88E5', icon: 'accessibility' },
    { name: 'BERT', color: '#FFD21E', icon: 'huggingface' },
    { name: 'CI/CD', color: '#2088FF', icon: 'githubactions' },
    { name: 'LSTM', color: '#FF6F00', icon: 'tensorflow' },
    { name: 'Machine Learning', color: '#F7931E', icon: 'scikitlearn' },
    { name: 'Performance', color: '#388E3C', icon: 'lighthouse' },
    { name: 'Responsive Design', color: '#00897B', icon: 'responsively' },
    { name: 'SEO', color: '#FF5722', icon: 'googlesearchconsole' },
    { name: 'Software Dev', color: '#007ACC', icon: 'visualstudiocode' },
    { name: 'Test Automation', color: '#9C27B0', icon: 'testinglibrary' },
    { name: 'Version Control', color: '#4CAF50', icon: 'git' },
  ];

  const renderSkillItem = (skill, index) => (
    <div
      key={`${skill.name}-${index}`}
      className="flex-shrink-0 flex items-center gap-3 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 shadow-lg hover:scale-105 hover:shadow-2xl transition-all duration-300 group cursor-pointer"
    >
      <div className="h-9 w-9 flex items-center justify-center">
        <img
          src={`https://cdn.simpleicons.org/${skill.icon}/${skill.color.slice(1)}`}
          alt={skill.name}
          className="w-7 h-7"
          onError={(e) => {
            e.currentTarget.style.display = 'none';
            const fallback = e.currentTarget.nextElementSibling;
            if (fallback) {
              fallback.classList.remove('hidden');
            }
          }}
        />
        <div
          className="hidden w-7 h-7 rounded-full"
          style={{ backgroundColor: skill.color }}
        />
      </div>
      <span
        className="text-sm font-bold tracking-wider whitespace-nowrap"
        style={{ color: skill.color }}
      >
        {skill.name}
      </span>
    </div>
  );

  const renderRow = (skills, reverse = false, speed = 30) => {
    const duplicated = [...skills, ...skills, ...skills];

    return (
      <div className="my-3 overflow-hidden py-1 relative">
        <div
          className={`flex gap-6 whitespace-nowrap ${
            reverse ? 'animate-marquee-reverse' : 'animate-marquee'
          }`}
          style={{
            animationDuration: `${speed}s`,
          }}
        >
          {duplicated.map((skill, index) => renderSkillItem(skill, index))}
        </div>
      </div>
    );
  };

  return (
    <section className="pt-8 pb-6 lg:py-8 rounded-2xl relative overflow-hidden bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900 shadow shadow-purple-500/60">
      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center mb-10">
          <h2 className="text-4xl md:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 via-purple-500 to-cyan-300 mb-2">
            My Skills
          </h2>
          <p className="text-[rgb(var(--muted-foreground))] text-lg">Technologies I work with every day</p>
        </div>
      </div>

      <div className="relative z-10">
        {renderRow(skillsRow1, false, 15)}
        {renderRow(skillsRow2, true, 20)}
        {renderRow(skillsRow3, false, 25)}
        {renderRow(skillsRow4, true, 10)}
      </div>

      {/* Edge fade gradients */}
      <div className="pointer-events-none absolute top-0 left-0 h-full w-20 bg-gradient-to-r from-gray-900 to-transparent z-20"></div>
      <div className="pointer-events-none absolute top-0 right-0 h-full w-20 bg-gradient-to-l from-gray-900 to-transparent z-20"></div>

      {/* Top fade */}
      <div className="pointer-events-none absolute top-0 left-0 w-full h-20 bg-gradient-to-b from-gray-900 to-transparent z-20"></div>
    </section>
  );
};

export default Skills;