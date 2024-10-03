import { motion } from "framer-motion";
import { useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";

export function AnimatedRoutes({ children }) {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      {/* Важно для анимации выхода */}
      <motion.div
        key={location.key}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.4 }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}
