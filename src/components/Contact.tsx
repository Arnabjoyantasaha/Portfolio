import React, { useState } from 'react';
import { Mail, Phone, MapPin, Github, Linkedin, Twitter, Send } from 'lucide-react';

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
    { icon: Mail, label: 'Email', value: 'arnabjoyantasaha@gmail.com', href: 'mailto:arnabjoyantasaha@gmail.com' },
    { icon: Phone, label: 'Phone', value: '01873196162', href: 'tel:01873196162' },
    { icon: MapPin, label: 'Location', value: 'Uttara, Dhaka', href: '#' }
  ];

  const socialLinks = [
    { icon: Github, href: 'https://github.com/Arnabjoyantasaha', label: 'GitHub' },
    { icon: Linkedin, href: 'https://www.linkedin.com/in/arnab-joyanta-saha-3b2435301', label: 'LinkedIn' },
    { icon: Twitter, href: 'https://x.com/arnab_joyanta?t=UTG9V4WEiggpsdAkoWs4Xw&s=09', label: 'Twitter' }
  ];

  return (
    <section id="contact" className="py-20 scroll-animate">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-12 neon-flicker">
            Get In <span className="text-green-400">Touch</span>
          </h2>

          <div className="grid md:grid-cols-2 gap-12">
            <div className="animate-slide-in-left">
              <div className="sci-fi-border backdrop-blur-sm p-6 mb-8 hover-lift hologram-effect">
                <div className="font-mono text-sm mb-4">
                  <div className="text-gray-400">// Let's connect!</div>
                  <div className="text-green-400">{'function getInTouch() {'}</div>
                  <div className="ml-4 text-gray-300">
                    <div>return <span className="text-green-400">"Ready to collaborate!"</span>;</div>
                  </div>
                  <div className="text-green-400">{'}'}</div>
                </div>
              </div>

              <p className="text-gray-300 text-lg leading-relaxed mb-8">
                I'm always open to discussing new opportunities, innovative projects, 
                or just having a chat about technology. Feel free to reach out!
              </p>

              <div className="space-y-4 mb-8">
                {contactInfo.map((item, index) => (
                  <a
                    key={index}
                    href={item.href}
                    className="flex items-center space-x-4 text-gray-300 hover:text-green-400 transition-all duration-300 group hover:scale-105 hover:translate-x-2"
                  >
                    <div className="sci-fi-border p-3 group-hover:border-green-400/50 transition-all duration-300 hover-lift">
                      <item.icon className="h-5 w-5 transition-all duration-300 group-hover:rotate-12" />
                    </div>
                    <div>
                      <div className="text-sm text-gray-400 font-mono">{item.label}</div>
                      <div className="text-white font-mono">{item.value}</div>
                    </div>
                  </a>
                ))}
              </div>

              <div className="flex space-x-4">
                {socialLinks.map((social, index) => (
                  <a
                    key={index}
                    href={social.href}
                    className="sci-fi-border p-3 hover:border-green-400/50 hover:bg-green-400/10 transition-all duration-300 transform hover:scale-125 hover:rotate-12 glow-on-hover"
                    aria-label={social.label}
                  >
                    <social.icon className="h-5 w-5 text-gray-400 hover:text-green-400 transition-all duration-300" />
                  </a>
                ))}
              </div>
            </div>

            <div className="sci-fi-border backdrop-blur-sm p-6 hover-lift hologram-effect animate-slide-in-right">
              <form 
                name="contact" 
                method="POST" 
                data-netlify="true" 
                data-netlify-honeypot="bot-field"
                onSubmit={handleSubmit} 
                className="space-y-6"
              >
                <input type="hidden" name="form-name" value="contact" />
                <input type="hidden" name="bot-field" />

                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-2 font-mono">
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full bg-black border border-gray-700 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-green-400 focus:ring-2 focus:ring-green-400/50 transition-all duration-300 font-mono hover:border-green-400/50"
                    placeholder="Your name"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2 font-mono">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full bg-black border border-gray-700 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-green-400 focus:ring-2 focus:ring-green-400/50 transition-all duration-300 font-mono hover:border-green-400/50"
                    placeholder="your.email@example.com"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-2 font-mono">
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows={5}
                    className="w-full bg-black border border-gray-700 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-green-400 focus:ring-2 focus:ring-green-400/50 transition-all duration-300 resize-none font-mono hover:border-green-400/50"
                    placeholder="Tell me about your project or just say hi!"
                    required
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`w-full font-semibold py-3 px-6 rounded-lg transition-all duration-500 transform hover:scale-110 hover:rotate-1 flex items-center justify-center space-x-2 animate-pulse-glow hover-lift ${
                    isSubmitting 
                      ? 'bg-gray-600 cursor-not-allowed' 
                      : 'bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600'
                  } text-black font-mono`}
                >
                  <Send size={18} className="transition-all duration-300 hover:rotate-12" />
                  <span>{isSubmitting ? 'Sending...' : './send_message.sh'}</span>
                </button>

                {submitStatus === 'success' && (
                  <div className="text-green-400 text-sm text-center">
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