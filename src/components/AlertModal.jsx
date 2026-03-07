import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, CheckCircle, AlertCircle, Info } from 'lucide-react';

const AlertModal = ({ isOpen, onClose, title, message, type = 'info' }) => {
    const getIcon = () => {
        switch (type) {
            case 'success': return <CheckCircle className="text-green-400" size={24} />;
            case 'error': return <AlertCircle className="text-red-400" size={24} />;
            default: return <Info className="text-[var(--accent-color)]" size={24} />;
        }
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-[10000] flex items-center justify-center p-4">
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="absolute inset-0 bg-black/60 backdrop-blur-md"
                        onClick={onClose}
                    />
                    <motion.div
                        initial={{ scale: 0.9, opacity: 0, y: 20 }}
                        animate={{ scale: 1, opacity: 1, y: 0 }}
                        exit={{ scale: 0.9, opacity: 0, y: 20 }}
                        className="glass-card-premium max-w-sm w-full p-8 relative border-[var(--accent-color)]/30 overflow-hidden"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <div className="relative z-10 flex flex-col items-center text-center">
                            <div className="mb-4 p-3 rounded-full bg-white/5 border border-white/10 shadow-[0_0_15px_var(--accent-glow)]">
                                {getIcon()}
                            </div>
                            <h3 className="text-lg font-bold text-white mb-2">{title}</h3>
                            <p className="text-gray-400 text-sm mb-8 leading-relaxed">
                                {message}
                            </p>
                            <button
                                onClick={onClose}
                                className="w-full py-3 bg-[var(--accent-color)] text-[var(--accent-contrast)] rounded-xl font-bold text-xs hover:shadow-[0_0_20px_var(--accent-glow)] transition-all active:scale-95"
                            >
                                Got it
                            </button>
                        </div>

                        <div className="absolute top-4 right-4 group">
                            <button onClick={onClose} className="text-gray-500 hover:text-white transition-colors">
                                <X size={20} />
                            </button>
                        </div>

                        <div className="neon-strip-blue !via-[var(--accent-color)]"></div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
};

export default AlertModal;
