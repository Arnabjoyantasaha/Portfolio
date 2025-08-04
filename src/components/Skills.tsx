import React from 'react';

const Skills = () => {
  const skillCategories = [
    {
      title: 'Programming Languages',
      skills: [
        { name: 'JavaScript', level: 92, color: 'from-yellow-400 to-yellow-600' },
        { name: 'TypeScript', level: 88, color: 'from-blue-400 to-blue-600' },
        { name: 'Python', level: 85, color: 'from-green-400 to-green-600' },
        { name: 'Java', level: 82, color: 'from-red-400 to-red-600' },
        { name: 'C++', level: 78, color: 'from-purple-400 to-purple-600' }
      ]
    },
    {
      title: 'Frameworks & Libraries',
      skills: [
        { name: 'React', level: 90, color: 'from-cyan-400 to-cyan-600' },
        { name: 'Node.js', level: 87, color: 'from-green-400 to-green-600' },
        { name: 'Next.js', level: 83, color: 'from-gray-400 to-gray-600' },
        { name: 'Express.js', level: 85, color: 'from-yellow-400 to-yellow-600' },
        { name: 'Tailwind CSS', level: 95, color: 'from-teal-400 to-teal-600' }
      ]
    },
    {
      title: 'Tools & Technologies',
      skills: [
        { name: 'MongoDB', level: 86, color: 'from-green-400 to-green-600' },
        { name: 'PostgreSQL', level: 81, color: 'from-blue-400 to-blue-600' },
        { name: 'Git', level: 93, color: 'from-orange-400 to-orange-600' },
        { name: 'Docker', level: 75, color: 'from-blue-400 to-blue-600' },
        { name: 'AWS', level: 78, color: 'from-yellow-400 to-yellow-600' }
      ]
    }
  ];

  return (
    <section id="skills" className="py-24 bg-gradient-to-b from-slate-800 to-slate-900 scroll-animate">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-5xl md:text-6xl font-bold text-center mb-16">
            <span className="text-white">Technical</span> <span className="tech-gradient">Expertise</span>
          </h2>

          <div className="grid lg:grid-cols-3 gap-10 animate-professional-slide-up">
            {skillCategories.map((category, categoryIndex) => (
              <div
                key={categoryIndex}
                className="tech-border-animated p-8 tech-card-hover"
                style={{ animationDelay: `${categoryIndex * 0.3}s` }}
              >
                <h3 className="text-2xl font-bold text-white mb-8 text-center">
                  {category.title}
                </h3>
                <div className="space-y-6">
                  {category.skills.map((skill, skillIndex) => (
                    <div key={skillIndex} className="space-y-3">
                      <div className="flex justify-between items-center">
                        <span className="text-gray-200 font-semibold">{skill.name}</span>
                        <span className="text-indigo-400 font-bold font-mono">{skill.level}%</span>
                      </div>
                      <div className="w-full bg-gray-700 rounded-full h-3 overflow-hidden">
                        <div
                          className={`bg-gradient-to-r ${skill.color} h-3 rounded-full animate-skill-progress`}
                          style={{ 
                            width: `${skill.level}%`,
                            animationDelay: `${(categoryIndex * 0.3) + (skillIndex * 0.1)}s`
                          }}
                        ></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <div className="mt-16 text-center">
            <div className="inline-block tech-border-animated p-8 professional-hover animate-professional-fade-in">
              <div className="text-gray-400 font-mono mb-3 syntax-comment">// Currently Expanding Skills</div>
              <div className="font-mono text-lg">
                <span className="syntax-keyword">const</span> <span className="syntax-variable">learning</span> <span className="syntax-operator">=</span> <span className="syntax-operator">[</span>
                <span className="syntax-string">"GraphQL"</span><span className="syntax-operator">,</span> 
                <span className="syntax-string">"Kubernetes"</span><span className="syntax-operator">,</span> 
                <span className="syntax-string">"Machine Learning"</span><span className="syntax-operator">];</span>
              </div>
              <div className="text-gray-400 font-mono mt-3 text-sm syntax-comment">// Always learning, always growing</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Skills;