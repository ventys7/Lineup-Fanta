import { useEffect, useRef } from "react";

export function useDialogBehavior(onClose: () => void) {
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const scrollY = window.scrollY;
    const mobileLock = window.matchMedia("(max-width: 767px)").matches;
    const previousFocus = document.activeElement instanceof HTMLElement
      ? document.activeElement
      : null;
    const previous = {
      overflow: document.body.style.overflow,
      position: document.body.style.position,
      top: document.body.style.top,
      width: document.body.style.width
    };

    document.body.style.overflow = "hidden";
    if (mobileLock) {
      document.body.style.position = "fixed";
      document.body.style.top = `-${scrollY}px`;
      document.body.style.width = "100%";
    }

    closeButtonRef.current?.focus({ preventScroll: true });

    const handleKeydown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };

    window.addEventListener("keydown", handleKeydown);

    return () => {
      document.body.style.overflow = previous.overflow;
      document.body.style.position = previous.position;
      document.body.style.top = previous.top;
      document.body.style.width = previous.width;
      if (mobileLock) window.scrollTo(0, scrollY);
      window.removeEventListener("keydown", handleKeydown);
      previousFocus?.focus({ preventScroll: true });
    };
  }, [onClose]);

  return closeButtonRef;
}
