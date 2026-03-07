import React from 'react';
import { motion } from 'framer-motion';

const SectionWrapper = ({ children, className = "" }) => {
    return (
        <motion.section
            initial={{ opacity: 0, y: 50, scale: 0.95 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true, margin: "-10%" }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className={className}
        >
            {children}
        </motion.section>
    );
};

export default SectionWrapper;
