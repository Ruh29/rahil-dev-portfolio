import React from "react";
import { motion } from "framer-motion";
import { useTheme } from "../context/ThemeContext";

export default function ScatterText({ children, delay = 0, speed = 1, isGradient = false }) {
  const { themeId } = useTheme();

  const renderChild = (child, index) => {
    if (typeof child === "string") {
      const normalized = child.replace(/\s+/g, " ");
      if (normalized === "" || normalized === " ") {
        return <span key={index} style={{ marginRight: "0.28em" }} />;
      }
      const words = normalized.split(" ").filter((w) => w !== "");
      return (
        <span key={index} style={{ display: "inline" }}>
          {words.map((word, wIdx) => {
            const letters = word.split("");
            return (
              <span
                key={wIdx}
                style={{
                  display: "inline-block",
                  marginRight: "0.28em",
                  whiteSpace: "nowrap",
                  verticalAlign: "baseline",
                }}
              >
                {letters.map((letter, lIdx) => {
                  const randomX = (Math.random() - 0.5) * 600;
                  const randomY = (Math.random() - 0.5) * 400;
                  const randomRotate = (Math.random() - 0.5) * 100;
                  const randomScale = 0.3 + Math.random() * 0.4;
                  const letterDelay =
                    delay + wIdx * 0.02 + lIdx * 0.008 + Math.random() * 0.03;

                  const isMobile = typeof window !== "undefined" && window.innerWidth <= 768;
                  const transitionConfig = isMobile
                    ? { type: "tween", ease: "easeOut", duration: 0.35, delay: letterDelay }
                    : { type: "spring", stiffness: 100 * speed, damping: 15, delay: letterDelay };

                  return (
                    <motion.span
                      key={lIdx}
                      className={isGradient ? "gradient-text" : ""}
                      style={{
                        display: "inline-block",
                        verticalAlign: "baseline",
                      }}
                      initial={{
                        x: randomX,
                        y: randomY,
                        rotate: randomRotate,
                        scale: randomScale,
                        opacity: 0,
                      }}
                      animate={{
                        x: 0,
                        y: 0,
                        rotate: 0,
                        scale: 1,
                        opacity: 1,
                      }}
                      transition={transitionConfig}
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
      const isGrad =
        isGradient ||
        (child.props &&
          (child.props.className === "gradient-text" ||
            child.props.style?.WebkitBackgroundClip === "text" ||
            child.props.style?.webkitBackgroundClip === "text"));

      if (child.props && child.props.children) {
        return (
          <ScatterText
            key={index}
            delay={delay + 0.04}
            speed={speed}
            isGradient={isGrad}
          >
            {child.props.children}
          </ScatterText>
        );
      }
      return (
        <motion.span
          key={index}
          style={{ display: "inline-block", verticalAlign: "middle" }}
          initial={{ opacity: 0, scale: 0.6 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.25, delay: delay }}
        >
          {child}
        </motion.span>
      );
    }

    return child;
  };

  return (
    <span key={themeId} style={{ display: "inline-block" }}>
      {Array.isArray(children)
        ? children.map((c, i) => renderChild(c, i))
        : renderChild(children, 0)}
    </span>
  );
}
