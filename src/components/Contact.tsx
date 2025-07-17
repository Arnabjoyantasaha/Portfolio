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
    <section id="contact" className="py-20">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-12">
            Get In <span className="text-cyan-400">Touch</span>
          </h2>

          <div className="grid md:grid-cols-2 gap-12">
            <div>
              <div className="bg-gray-900/90 backdrop-blur-sm border border-gray-800 rounded-lg p-6 mb-8">
                <div className="font-mono text-sm mb-4">
                  <div className="text-slate-400">// Let's connect!</div>
                  <div className="text-cyan-400">{'function getInTouch() {'}</div>
                  <div className="ml-4 text-slate-300">
                    <div>return <span className="text-green-400">"Ready to collaborate!"</span>;</div>
                  </div>
                  <div className="text-cyan-400">{'}'}</div>
                </div>
              </div>

              <p className="text-slate-300 text-lg leading-relaxed mb-8">
                I'm always open to discussing new opportunities, innovative projects, 
                or just having a chat about technology. Feel free to reach out!
              </p>

              <div className="space-y-4 mb-8">
                {contactInfo.map((item, index) => (
                  <a
                    key={index}
                    href={item.href}
                    className="flex items-center space-x-4 text-slate-300 hover:text-cyan-400 transition-colors duration-200 group"
                  >
                    <div className="bg-gray-900/80 border border-gray-800 rounded-lg p-3 group-hover:border-cyan-400/50 transition-all duration-300">
                      <item.icon className="h-5 w-5" />
                    </div>
                    <div>
                      <div className="text-sm text-slate-400">{item.label}</div>
                      <div className="text-white">{item.value}</div>
                    </div>
                  </a>
                ))}
              </div>

              <div className="flex space-x-4">
                {socialLinks.map((social, index) => (
                  <a
                    key={index}
                    href={social.href}
                    className="bg-gray-900/80 border border-gray-800 rounded-lg p-3 hover:border-cyan-400/50 hover:bg-cyan-400/10 transition-all duration-300 transform hover:scale-110"
                    aria-label={social.label}
                  >
                    <social.icon className="h-5 w-5 text-slate-400 hover:text-cyan-400 transition-colors duration-200" />
                  </a>
                ))}
              </div>
            </div>

            <div className="bg-gray-900/90 backdrop-blur-sm border border-gray-800 rounded-lg p-6">
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
                  <label htmlFor="name" className="block text-sm font-medium text-slate-300 mb-2">
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full bg-black border border-gray-700 rounded-lg px-4 py-3 text-white placeholder-slate-400 focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 transition-all duration-200"
                    placeholder="Your name"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-slate-300 mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full bg-black border border-gray-700 rounded-lg px-4 py-3 text-white placeholder-slate-400 focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 transition-all duration-200"
                    placeholder="your.email@example.com"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-slate-300 mb-2">
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows={5}
                    className="w-full bg-black border border-gray-700 rounded-lg px-4 py-3 text-white placeholder-slate-400 focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 transition-all duration-200 resize-none"
                    placeholder="Tell me about your project or just say hi!"
                    required
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`w-full font-semibold py-3 px-6 rounded-lg transition-all duration-300 transform hover:scale-105 flex items-center justify-center space-x-2 ${
                    isSubmitting 
                      ? 'bg-gray-600 cursor-not-allowed' 
                      : 'bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600'
                  } text-white`}
                >
                  <Send size={18} />
                  <span>{isSubmitting ? 'Sending...' : 'Send Message'}</span>
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