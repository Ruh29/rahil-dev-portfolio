import React from "react";
import { motion } from "framer-motion";

export default function ScatterText({ children, delay = 0, speed = 1 }) {
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
                  const randomX = (Math.random() - 0.5) * 800;
                  const randomY = (Math.random() - 0.5) * 600;
                  const randomRotate = (Math.random() - 0.5) * 120;
                  const randomScale = 0.3 + Math.random() * 0.4;
                  const letterDelay = delay + (wIdx * 0.03) + (lIdx * 0.01) + (Math.random() * 0.05);

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
                      animate={{
                        x: 0,
                        y: 0,
                        rotate: 0,
                        scale: 1,
                        opacity: 1,
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
        const randomX = (Math.random() - 0.5) * 600;
        const randomY = (Math.random() - 0.5) * 600;
        const randomRotate = (Math.random() - 0.5) * 90;
        return (
          <motion.span
            key={index}
            style={{ display: "inline-block" }}
            initial={{ x: randomX, y: randomY, rotate: randomRotate, opacity: 0, scale: 0.8 }}
            animate={{ x: 0, y: 0, rotate: 0, opacity: 1, scale: 1 }}
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

  if (Array.isArray(children)) {
    return <>{children.map((child, idx) => renderChild(child, idx))}</>;
  }

  return <>{renderChild(children, 0)}</>;
}
