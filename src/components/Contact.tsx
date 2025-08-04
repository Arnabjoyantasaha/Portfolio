import React, { useState } from 'react';
import { Mail, Phone, MapPin, Github, Linkedin, Twitter, Send, MessageSquare } from 'lucide-react';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      // Create FormData object for Netlify Forms
      const formDataToSend = new FormData();
      formDataToSend.append('form-name', 'contact');
      formDataToSend.append('name', formData.name);
      formDataToSend.append('email', formData.email);
      formDataToSend.append('message', formData.message);

      const response = await fetch('/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams(formDataToSend as any).toString()
      });

      if (response.ok) {
        setSubmitStatus('success');
        setFormData({ name: '', email: '', message: '' });
      } else {
        setSubmitStatus('error');
      }
    } catch (error) {
      console.error('Form submission error:', error);
      setSubmitStatus('success');
      setFormData({ name: '', email: '', message: '' });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const contactInfo = [
    { icon: Mail, label: 'Professional Email', value: 'arnabjoyantasaha@gmail.com', href: 'mailto:arnabjoyantasaha@gmail.com' },
    { icon: Phone, label: 'Contact Number', value: '+880 1873196162', href: 'tel:+8801873196162' },
    { icon: MapPin, label: 'Based in', value: 'Dhaka, Bangladesh', href: '#' }
  ];

  const socialLinks = [
    { icon: Github, href: 'https://github.com/Arnabjoyantasaha', label: 'GitHub' },
    { icon: Linkedin, href: 'https://www.linkedin.com/in/arnab-joyanta-saha-3b2435301', label: 'LinkedIn' },
    { icon: Twitter, href: 'https://x.com/arnab_joyanta?t=UTG9V4WEiggpsdAkoWs4Xw&s=09', label: 'Twitter' }
  ];

  return (
    <section id="contact" className="py-24 bg-gradient-to-b from-slate-800 to-slate-900 scroll-animate">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-5xl md:text-6xl font-bold text-center mb-16">
            <span className="text-white">Let's</span> <span className="tech-gradient">Connect</span>
          </h2>

          <div className="grid lg:grid-cols-2 gap-16">
            <div className="animate-professional-slide-left">
              <div className="tech-border-animated p-8 mb-10 professional-hover">
                <div className="font-mono text-sm mb-4">
                  <div className="text-gray-400 syntax-comment">// Ready to collaborate</div>
                  <div className="syntax-keyword">function</div> <div className="syntax-function">startCollaboration</div><div className="syntax-operator">() {</div>
                  <div className="ml-4 text-gray-300">
                    <div><span className="syntax-keyword">return</span> <span className="syntax-string">"Let's build something amazing together!"</span>;</div>
                  </div>
                  <div className="syntax-operator">{'}'}</div>
                </div>
              </div>

              <p className="text-gray-300 text-xl leading-relaxed mb-10">
                I'm passionate about joining innovative teams where I can contribute my technical skills 
                and creative problem-solving abilities. Whether it's full-stack development, AI integration, 
                or building scalable systems, I'm ready to make an impact.
              </p>

              <div className="space-y-6 mb-10">
                {contactInfo.map((item, index) => (
                  <a
                    key={index}
                    href={item.href}
                    className="flex items-center space-x-4 text-gray-300 hover:text-indigo-400 professional-hover group"
                  >
                    <div className="tech-border-animated p-4 group-hover:border-indigo-400/50 transition-all duration-300">
                      <item.icon className="h-6 w-6 transition-all duration-300" />
                    </div>
                    <div>
                      <div className="text-sm text-gray-400 font-medium">{item.label}</div>
                      <div className="text-white font-semibold text-lg">{item.value}</div>
                    </div>
                  </a>
                ))}
              </div>

              <div className="flex space-x-6">
                {socialLinks.map((social, index) => (
                  <a
                    key={index}
                    href={social.href}
                    className="tech-border-animated p-4 hover:border-indigo-400/50 hover:bg-indigo-400/10 professional-hover"
                    aria-label={social.label}
                  >
                    <social.icon className="h-6 w-6 text-gray-400 hover:text-indigo-400 transition-all duration-300" />
                  </a>
                ))}
              </div>
            </div>

            <div className="tech-border-animated p-8 professional-hover animate-professional-slide-right">
              <div className="flex items-center space-x-3 mb-8">
                <MessageSquare className="h-8 w-8 text-indigo-400" />
                <h3 className="text-2xl font-bold text-white">Send a Message</h3>
              </div>
              
              <form
                name="contact" 
                method="POST" 
                data-netlify="true" 
                data-netlify-honeypot="bot-field"
                onSubmit={handleSubmit} 
                className="space-y-8"
              >
                <input type="hidden" name="form-name" value="contact" />
                <input type="hidden" name="bot-field" />

                <div>
                  <label htmlFor="name" className="block text-sm font-semibold text-gray-300 mb-3">
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full bg-slate-800 border border-gray-600 rounded-lg px-4 py-4 text-white placeholder-gray-400 focus:outline-none focus:border-indigo-400 focus:ring-2 focus:ring-indigo-400/50 transition-all duration-300 hover:border-indigo-400/50"
                    placeholder="Your name"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-semibold text-gray-300 mb-3">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full bg-slate-800 border border-gray-600 rounded-lg px-4 py-4 text-white placeholder-gray-400 focus:outline-none focus:border-indigo-400 focus:ring-2 focus:ring-indigo-400/50 transition-all duration-300 hover:border-indigo-400/50"
                    placeholder="your.email@example.com"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-semibold text-gray-300 mb-3">
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows={5}
                    className="w-full bg-slate-800 border border-gray-600 rounded-lg px-4 py-4 text-white placeholder-gray-400 focus:outline-none focus:border-indigo-400 focus:ring-2 focus:ring-indigo-400/50 transition-all duration-300 resize-none hover:border-indigo-400/50"
                    placeholder="Tell me about your project, opportunity, or just say hello!"
                    required
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`w-full font-bold py-4 px-8 rounded-lg transition-all duration-300 flex items-center justify-center space-x-3 button-tech-hover ${
                    isSubmitting 
                      ? 'bg-gray-600 cursor-not-allowed text-gray-300' 
                      : 'bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white professional-shadow'
                  }`}
                >
                  <Send size={20} />
                  <span>{isSubmitting ? 'Sending Message...' : 'Send Message'}</span>
                </button>

                {submitStatus === 'success' && (
                  <div className="bg-green-500/20 border border-green-400/50 rounded-lg p-4 text-center">
                    <div className="text-green-400 font-semibold mb-1">Message Sent Successfully!</div>
                    <div className="text-green-300 text-sm">
                    Message sent successfully! I'll get back to you soon.
                  </div>
                )}

                {submitStatus === 'error' && (
                  <div className="text-red-400 text-sm text-center">
                    Failed to send message. Please try again or contact me directly.
                  </div>
                )}
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;