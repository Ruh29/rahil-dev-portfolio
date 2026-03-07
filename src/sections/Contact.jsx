import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import emailjs from '@emailjs/browser';
import Magnetic from '../components/Magnetic';
import AlertModal from '../components/AlertModal';

const Contact = () => {
  const formRef = useRef();
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    name: '',
    email: '',
    message: '',
  });

  const [alertModal, setAlertModal] = useState({
    isOpen: false,
    title: '',
    message: '',
    type: 'info'
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!form.name || !form.email || !form.message) {
      setAlertModal({
        isOpen: true,
        title: 'Missing Information',
        message: 'Please fill in all fields before sending.',
        type: 'info'
      });
      return;
    }

    setLoading(true);

    const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID;
    const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
    const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

    // Debugging: Logging to check if env variables are loaded (User will see this in console)
    console.log('EmailJS Config:', { serviceId, templateId, hasPublicKey: !!publicKey });

    if (!serviceId || !templateId || !publicKey || serviceId.includes('your_')) {
      setLoading(false);
      setAlertModal({
        isOpen: true,
        title: 'Configuration Error',
        message: 'EmailJS keys are missing. Ensure your .env file is correct and you have restarted the dev server.',
        type: 'error'
      });
      return;
    }

    emailjs
      .sendForm(
        serviceId,
        templateId,
        formRef.current,
        { publicKey }
      )
      .then(
        () => {
          setLoading(false);
          setAlertModal({
            isOpen: true,
            title: 'Message Sent!',
            message: 'Thank you. I will get back to you as soon as possible.',
            type: 'success'
          });
          setForm({
            name: '',
            email: '',
            message: '',
          });
        },
        (error) => {
          setLoading(false);
          console.error('EmailJS Error:', error);
          setAlertModal({
            isOpen: true,
            title: 'Send Failed',
            message: error?.text || 'Check your "To Email" setting in EmailJS Dashboard.',
            type: 'error'
          });
        }
      );
  };

  return (
    <>
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
                  className="w-full py-3 bg-gradient-to-r from-[var(--accent-color)] to-[var(--accent-color)] brightness-110 text-[var(--accent-contrast)] rounded-xl font-bold text-xs hover:shadow-[0_0_20px_var(--accent-glow)] transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
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

      <AlertModal
        isOpen={alertModal.isOpen}
        title={alertModal.title}
        message={alertModal.message}
        type={alertModal.type}
        onClose={() => setAlertModal({ ...alertModal, isOpen: false })}
      />
    </>
  );
};

export default Contact;
