import { useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { AnimatePresence } from "framer-motion";
import PropTypes from "prop-types";

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
        style={{ display: "flex", flexDirection: "column", flex: "1 0 auto" }} // для нормальной высоты страницы
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}

AnimatedRoutes.propTypes = {
  children: PropTypes.node.isRequired, // Дочерние элементы, которые будут анимироваться
};
