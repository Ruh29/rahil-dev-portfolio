import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { useTheme } from "../context/ThemeContext";

export default function ScatterText({ children, delay = 0, speed = 1 }) {
  const { themeId } = useTheme();
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-30px" });

  const renderChild = (child, index) => {
    if (typeof child === "string") {
      const normalized = child.replace(/\s+/g, " ");
      if (normalized === "" || normalized === " ") {
        return <span key={index} style={{ marginRight: "0.25em" }} />;
      }
      const words = normalized.split(" ").filter(w => w !== "");
      return (
        <span key={index} style={{ display: "inline" }}>
          {words.map((word, wIdx) => {
            const letters = word.split("");
            return (
              <span key={wIdx} style={{ display: "inline-block", marginRight: "0.25em", whiteSpace: "nowrap" }}>
                {letters.map((letter, lIdx) => {
                  const randomX = (Math.random() - 0.5) * 600;
                  const randomY = (Math.random() - 0.5) * 400;
                  const randomRotate = (Math.random() - 0.5) * 90;
                  const randomScale = 0.4 + Math.random() * 0.4;
                  const letterDelay = delay + (wIdx * 0.03) + (lIdx * 0.01) + (Math.random() * 0.04);

                  return (
                    <motion.span
                      key={lIdx}
                      style={{ display: "inline-block" }}
                      initial={{
                        x: randomX,
                        y: randomY,
                        rotate: randomRotate,
                        scale: randomScale,
                        opacity: 0,
                      }}
                      animate={inView ? {
                        x: 0,
                        y: 0,
                        rotate: 0,
                        scale: 1,
                        opacity: 1,
                      } : {
                        x: randomX,
                        y: randomY,
                        rotate: randomRotate,
                        scale: randomScale,
                        opacity: 0,
                      }}
                      transition={{
                        type: "spring",
                        stiffness: 90 * speed,
                        damping: 15,
                        delay: letterDelay,
                      }}
                    >
                      {letter}
                    </motion.span>
                  );
                })}
              </span>
            );
          })}
        </span>
      );
    }

    if (React.isValidElement(child)) {
      if (child.props && child.props.children) {
        return React.cloneElement(
          child,
          { key: index },
          <ScatterText delay={delay + 0.1} speed={speed}>{child.props.children}</ScatterText>
        );
      } else {
        const randomX = (Math.random() - 0.5) * 400;
        const randomY = (Math.random() - 0.5) * 400;
        const randomRotate = (Math.random() - 0.5) * 60;
        return (
          <motion.span
            key={index}
            style={{ display: "inline-block" }}
            initial={{ x: randomX, y: randomY, rotate: randomRotate, opacity: 0, scale: 0.8 }}
            animate={inView ? { x: 0, y: 0, rotate: 0, opacity: 1, scale: 1 } : { x: randomX, y: randomY, rotate: randomRotate, opacity: 0, scale: 0.8 }}
            transition={{
              type: "spring",
              stiffness: 90 * speed,
              damping: 15,
              delay: delay + 0.1,
            }}
          >
            {child}
          </motion.span>
        );
      }
    }

    return child;
  };

  const content = Array.isArray(children)
    ? children.map((child, idx) => renderChild(child, idx))
    : renderChild(children, 0);

  return (
    <span ref={ref} key={themeId} style={{ display: "inline-block" }}>
      {content}
    </span>
  );
}
