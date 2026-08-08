import React, { useEffect, useState, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { useTheme } from "../context/ThemeContext";

export default function ScatterText({ children, delay = 0, speed = 1 }) {
  const { themeId } = useTheme();
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const [animKey, setAnimKey] = useState(0);

  useEffect(() => {
    setAnimKey((prev) => prev + 1);
  }, [themeId]);

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
                  const randomX = (Math.random() - 0.5) * 1000;
                  const randomY = (Math.random() - 0.5) * 700;
                  const randomRotate = (Math.random() - 0.5) * 180;
                  const randomScale = 0.2 + Math.random() * 0.5;
                  const letterDelay =
                    delay + wIdx * 0.025 + lIdx * 0.01 + Math.random() * 0.04;

                  const letterVariants = {
                    scatterHidden: {
                      x: randomX,
                      y: randomY,
                      rotate: randomRotate,
                      scale: randomScale,
                      opacity: 0,
                    },
                    scatterVisible: {
                      x: 0,
                      y: 0,
                      rotate: 0,
                      scale: 1,
                      opacity: 1,
                      transition: {
                        type: "spring",
                        stiffness: 95 * speed,
                        damping: 14,
                        delay: letterDelay,
                      },
                    },
                  };

                  return (
                    <motion.span
                      key={lIdx}
                      style={{
                        display: "inline-block",
                        verticalAlign: "baseline",
                      }}
                      variants={letterVariants}
                      initial="scatterHidden"
                      animate={inView ? "scatterVisible" : "scatterHidden"}
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
      const iconVariants = {
        scatterHidden: {
          x: (Math.random() - 0.5) * 800,
          y: (Math.random() - 0.5) * 500,
          rotate: (Math.random() - 0.5) * 120,
          scale: 0.4,
          opacity: 0,
        },
        scatterVisible: {
          x: 0,
          y: 0,
          rotate: 0,
          scale: 1,
          opacity: 1,
          transition: {
            type: "spring",
            stiffness: 95 * speed,
            damping: 14,
            delay: delay + 0.05,
          },
        },
      };

      return (
        <motion.span
          key={index}
          style={{ display: "inline-block", verticalAlign: "middle" }}
          variants={iconVariants}
          initial="scatterHidden"
          animate={inView ? "scatterVisible" : "scatterHidden"}
        >
          {child}
        </motion.span>
      );
    }

    return child;
  };

  return (
    <span ref={ref} key={`${themeId}-${animKey}`} style={{ display: "inline-block" }}>
      {Array.isArray(children)
        ? children.map((c, i) => renderChild(c, i))
        : renderChild(children, 0)}
    </span>
  );
}
