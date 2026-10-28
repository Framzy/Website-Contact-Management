import { useState, useRef, useEffect, useCallback } from "react";

/**
 * Hook untuk meng-handle animasi toggle (expand / collapse)
 * @param {number} duration - Durasi animasi dalam ms (default: 300)
 * @returns {object} - { isOpen, toggle, contentRef, iconRef }
 */

export default function useToggleAnimation(duration = 300) {
  const [isOpen, setIsOpen] = useState(false); // default tertutup
  const contentRef = useRef(null);
  const iconRef = useRef(null);

  const toggle = useCallback(() => {
    setIsOpen((prev) => !prev);
  }, []);

  useEffect(() => {
    const content = contentRef.current;
    const icon = iconRef.current;
    if (!content || !icon) return;

    content.style.transition = `max-height ${duration}ms ease, opacity ${duration}ms ease`;
    content.style.overflow = "hidden";

    if (isOpen) {
      // Expand
      content.style.maxHeight = content.scrollHeight + "px";
      content.style.opacity = "1";
      content.style.marginTop = "1rem";
      icon.classList.remove("fa-chevron-down");
      icon.classList.add("fa-chevron-up");
    } else {
      // Collapse
      content.style.maxHeight = "0";
      content.style.opacity = "0";
      content.style.marginTop = "0";
      icon.classList.remove("fa-chevron-up");
      icon.classList.add("fa-chevron-down");
    }
  }, [isOpen, duration]);

  return {
    isOpen,
    toggle,
    contentRef,
    iconRef,
  };
}
