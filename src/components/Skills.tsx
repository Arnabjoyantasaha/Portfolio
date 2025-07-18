import React from 'react';

const Skills = () => {
  const skillCategories = [
    {
      title: 'Programming Languages',
      skills: [
        { name: 'JavaScript', level: 90 },
        { name: 'Python', level: 85 },
        { name: 'Java', level: 80 },
        { name: 'C++', level: 75 },
        { name: 'TypeScript', level: 85 }
      ]
    },
    {
      title: 'Web Technologies',
      skills: [
        { name: 'React', level: 90 },
        { name: 'Node.js', level: 85 },
        { name: 'HTML/CSS', level: 95 },
        { name: 'Express.js', level: 80 },
        { name: 'MongoDB', level: 75 }
      ]
    },
    {
      title: 'Tools & Frameworks',
      skills: [
        { name: 'Git', level: 90 },
        { name: 'Docker', level: 70 },
        { name: 'Linux', level: 80 },
        { name: 'AWS', level: 65 },
        { name: 'Firebase', level: 85 }
      ]
    }
  ];

  return (
    <section id="skills" className="py-20 scroll-animate">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-12">
            <span className="text-green-400">Skills</span> & Technologies
          </h2>

          <div className="grid md:grid-cols-3 gap-8 animate-slide-in-up">
            {skillCategories.map((category, categoryIndex) => (
              <div
                key={categoryIndex}
                className="sci-fi-border-pulse backdrop-blur-sm p-6 hover:border-green-400/50 transition-all duration-300 hover-lift"
                style={{ animationDelay: `${categoryIndex * 0.3}s` }}
              >
                <h3 className="text-xl font-semibold text-white mb-6 text-center transition-all duration-300 hover:text-green-400">
                  {category.title}
                </h3>
                <div className="space-y-4">
                  {category.skills.map((skill, skillIndex) => (
                    <div key={skillIndex} className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="text-gray-300 font-medium font-mono">{skill.name}</span>
                        <span className="text-green-400 text-sm font-mono">{skill.level}%</span>
                      </div>
                      <div className="w-full bg-gray-800 rounded-full h-2">
                        <div
                          className="bg-gradient-to-r from-green-500 to-emerald-500 h-2 rounded-full transition-all duration-1000 ease-out"
                          style={{ width: `${skill.level}%` }}
                        ></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <div className="mt-12 text-center">
            <div className="inline-block sci-fi-border-enhanced backdrop-blur-sm p-4 font-mono text-sm hover-lift animate-fade-in">
              <div className="text-gray-400 mb-2">// Currently Learning</div>
              <div className="text-green-400">
                const learning = [<span className="text-green-400">"GraphQL"</span>, <span className="text-green-400">"Kubernetes"</span>, <span className="text-green-400">"Machine Learning"</span>];
              </div>
              <div className="text-gray-400 mt-2">// Next.js, Docker, AWS coming soon...</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Skills;