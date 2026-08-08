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
                  verticalAlign: "baseline",
                }}
              >
                {letters.map((letter, lIdx) => {
                  const randomX = (Math.random() - 0.5) * 140;
                  const randomY = (Math.random() - 0.5) * 90;
                  const randomRotate = (Math.random() - 0.5) * 50;
                  const randomScale = 0.5 + Math.random() * 0.4;
                  const letterDelay =
                    delay + wIdx * 0.018 + lIdx * 0.007 + Math.random() * 0.025;

                  return (
                    <motion.span
                      key={lIdx}
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
                      transition={{
                        type: "spring",
                        stiffness: 130 * speed,
                        damping: 17,
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
          <ScatterText delay={delay + 0.04} speed={speed}>
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
