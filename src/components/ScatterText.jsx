import React from "react";
import { motion } from "framer-motion";
import { useTheme } from "../context/ThemeContext";

export default function ScatterText({ children, delay = 0, speed = 1 }) {
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
                }}
              >
                {letters.map((letter, lIdx) => {
                  const randomX = (Math.random() - 0.5) * 1000;
                  const randomY = (Math.random() - 0.5) * 700;
                  const randomRotate = (Math.random() - 0.5) * 180;
                  const randomScale = 0.2 + Math.random() * 0.5;
                  const letterDelay =
                    delay + wIdx * 0.025 + lIdx * 0.01 + Math.random() * 0.04;

                  return (
                    <motion.span
                      key={lIdx}
                      style={{
                        display: "inline-block",
                        willChange: "transform, opacity",
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
                      transition={{
                        type: "spring",
                        stiffness: 95 * speed,
                        damping: 14,
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
          <ScatterText delay={delay + 0.05} speed={speed}>
            {child.props.children}
          </ScatterText>
        );
      }
      const randomX = (Math.random() - 0.5) * 800;
      const randomY = (Math.random() - 0.5) * 500;
      const randomRotate = (Math.random() - 0.5) * 120;
      return (
        <motion.span
          key={index}
          style={{ display: "inline-block" }}
          initial={{ x: randomX, y: randomY, rotate: randomRotate, opacity: 0, scale: 0.5 }}
          animate={{ x: 0, y: 0, rotate: 0, opacity: 1, scale: 1 }}
          transition={{
            type: "spring",
            stiffness: 95 * speed,
            damping: 14,
            delay: delay + 0.05,
          }}
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
