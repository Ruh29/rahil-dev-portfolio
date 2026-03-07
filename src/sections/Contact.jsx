import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import emailjs from '@emailjs/browser';
import Magnetic from '../components/Magnetic';

const Contact = () => {
  const formRef = useRef();
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    name: '',
    email: '',
    message: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!form.name || !form.email || !form.message) {
      alert('Please fill in all fields.');
      return;
    }

    setLoading(true);

    const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID;
    const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
    const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

    if (!serviceId || !templateId || !publicKey || serviceId === 'service_id') {
      setLoading(false);
      alert('EmailJS keys are not configured. Please follow the instructions in the walkthrough to connect your email!');
      return;
    }

    emailjs
      .send(
        serviceId,
        templateId,
        {
          from_name: form.name,
          to_name: "Rahil",
          from_email: form.email,
          to_email: "rahilsheikh73308@gmail.com",
          message: form.message,
        },
        publicKey
      )
      .then(
        () => {
          setLoading(false);
          alert('Thank you. I will get back to you as soon as possible.');
          setForm({
            name: '',
            email: '',
            message: '',
          });
        },
        (error) => {
          setLoading(false);
          console.error(error);
          alert('Ahh, something went wrong. Please try again.');
        }
      );
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="glass-card-premium p-1 px-8 py-8 relative overflow-hidden group border-none"
    >
      <div className="absolute inset-0 bg-gradient-to-r from-[var(--accent-glow)]/10 via-transparent to-[var(--accent-glow)]/10 pointer-events-none transition-all duration-[var(--transition-speed)]"></div>

      <div className="relative z-10">
        <h3 className="text-[10px] font-stats font-bold uppercase tracking-[0.4em] text-[#8E91B3]/80 mb-6 px-2 flex items-center gap-2">
          Get In Touch
          <div className="w-1.5 h-1.5 rounded-full bg-[var(--accent-color)] shadow-[0_0_8px_var(--accent-glow)] transition-all duration-[var(--transition-speed)]"></div>
        </h3>

        <form
          ref={formRef}
          onSubmit={handleSubmit}
          className="flex flex-col lg:flex-row gap-6"
        >
          <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="Your Name"
              className="bg-[#030014]/60 border border-white/5 rounded-xl px-4 py-3 text-xs font-medium focus:outline-none focus:border-[var(--accent-color)]/50 focus:bg-[#030014] transition-all placeholder:text-[#8E91B3]/30 text-white"
            />
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              placeholder="Email"
              className="bg-[#030014]/60 border border-white/5 rounded-xl px-4 py-3 text-xs font-medium focus:outline-none focus:border-[var(--accent-color)]/50 focus:bg-[#030014] transition-all placeholder:text-[#8E91B3]/30 text-white"
            />
            <textarea
              name="message"
              value={form.message}
              onChange={handleChange}
              placeholder="Message"
              rows="1"
              className="md:col-span-2 bg-[#030014]/60 border border-white/5 rounded-xl px-4 py-3 text-xs font-medium focus:outline-none focus:border-[var(--accent-color)]/50 focus:bg-[#030014] transition-all resize-none placeholder:text-[#8E91B3]/30 text-white"
            />
          </div>

          <div className="lg:w-[150px] flex items-end pb-0.5">
            <Magnetic strength={0.3}>
              <button
                type="submit"
                disabled={loading}
                className="w-full h-11 bg-gradient-to-r from-[var(--accent-color)] to-[var(--accent-color)] brightness-110 text-white rounded-xl font-bold text-xs hover:shadow-[0_0_20px_var(--accent-glow)] transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? 'Sending...' : 'Send Message'}
              </button>
            </Magnetic>
          </div>
        </form>
      </div>
      <div className="glass-shine"></div>
      <div className="neon-strip-magenta transition-all duration-[var(--transition-speed)]"></div>
    </motion.div>
  );
};

export default Contact;
