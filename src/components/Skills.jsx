import React from 'react'
import '../styles/skills.css'

const SKILLS_ROW1 = [
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
]

const SKILLS_ROW2 = [
  { name: 'React', color: '#61DAFB', icon: 'react' },
  { name: 'Tailwind CSS', color: '#06B6D4', icon: 'tailwindcss' },
  { name: 'Next.js', color: '#FFFFFF', icon: 'nextdotjs' },
  { name: 'Express.js', color: '#FFFFFF', icon: 'express' },
  { name: 'FastAPI', color: '#009688', icon: 'fastapi' },
  { name: 'Node.js', color: '#339933', icon: 'nodedotjs' },
  { name: 'Bootstrap', color: '#7952B3', icon: 'bootstrap' },
  { name: 'Framer Motion', color: '#0055FF', icon: 'framer' },
]

const SKILLS_ROW3 = [
  { name: 'Git', color: '#F05032', icon: 'git' },
  { name: 'GitHub', color: '#FFFFFF', icon: 'github' },
  { name: 'Netlify', color: '#00C7B7', icon: 'netlify' },
  { name: 'Postman', color: '#FF6C37', icon: 'postman' },
  { name: 'Replit', color: '#F26207', icon: 'replit' },
  { name: 'Vercel', color: '#FFFFFF', icon: 'vercel' },
  { name: 'Firebase', color: '#FFCA28', icon: 'firebase' },
]

const SKILLS_ROW4 = [
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
]

const renderSkillItem = (skill, index) => (
  <div key={`${skill.name}-${index}`} className="skills__pill">
    <div className="skills__icon-wrapper">
      <img
        src={`https://cdn.simpleicons.org/${skill.icon}/${skill.color.slice(1)}`}
        alt={skill.name}
        className="skills__icon"
        loading="lazy"
        decoding="async"
        width={20}
        height={20}
        onError={(e) => {
          e.currentTarget.style.display = 'none'
          const fallback = e.currentTarget.nextElementSibling
          if (fallback) {
            fallback.classList.remove('hidden')
          }
        }}
      />
      <div
        className="skills__icon-fallback hidden"
        style={{ backgroundColor: skill.color }}
      />
    </div>
    <span className="skills__name">{skill.name}</span>
  </div>
)

const renderRow = (skills, reverse = false, speed = 30) => {
  const duplicated = [...skills, ...skills, ...skills]

  return (
    <div className="skills__row">
      <div
        className={`skills__marquee ${reverse ? 'skills__marquee--reverse' : ''}`}
        style={{ animationDuration: `${speed}s` }}
      >
        {duplicated.map((skill, index) => renderSkillItem(skill, index))}
      </div>
    </div>
  )
}

const Skills = ({ isFullWidth = false }) => (
  <div className={`skills ${isFullWidth ? 'skills--full-width' : ''}`}>
    {renderRow(SKILLS_ROW1, false, 15)}
    {renderRow(SKILLS_ROW2, true, 20)}
    {renderRow(SKILLS_ROW3, false, 25)}
    {renderRow(SKILLS_ROW4, true, 10)}
    <div className="skills__fade skills__fade--left" />
    <div className="skills__fade skills__fade--right" />
  </div>
)

export default React.memo(Skills)
