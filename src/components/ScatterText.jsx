import React from "react";
import { motion } from "framer-motion";
import { useTheme } from "../context/ThemeContext";

export default function ScatterText({ children, delay = 0, speed = 1 }) {
  const { themeId } = useTheme();

  const renderChild = (child, index) => {
    if (typeof child === "string") {
      const normalized = child.replace(/\s+/g, " ");
      if (normalized === "" || normalized === " ") {
        return <span key={index} style={{ marginRight: "0.25em" }} />;
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
                  marginRight: "0.25em",
                  whiteSpace: "nowrap",
                }}
              >
                {letters.map((letter, lIdx) => {
                  const randomX = (Math.random() - 0.5) * 400;
                  const randomY = (Math.random() - 0.5) * 300;
                  const randomRotate = (Math.random() - 0.5) * 90;
                  const randomScale = 0.4 + Math.random() * 0.4;
                  const letterDelay =
                    delay + wIdx * 0.02 + lIdx * 0.008 + Math.random() * 0.03;

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
                        stiffness: 110 * speed,
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
      return React.cloneElement(child, { key: index });
    }

    return child;
  };

  return (
    <span key={themeId} style={{ display: "inline" }}>
      {Array.isArray(children)
        ? children.map((c, i) => renderChild(c, i))
        : renderChild(children, 0)}
    </span>
  );
}
