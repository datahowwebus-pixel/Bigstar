import React, { useCallback, useEffect, useRef, useState } from 'react';

export const ContentProtectionGuard: React.FC = () => {
  const [shieldActive, setShieldActive] = useState(false);
  const timerRef = useRef<number | null>(null);

  const activateShield = useCallback((durationMs?: number) => {
    if (timerRef.current) {
      window.clearTimeout(timerRef.current);
      timerRef.current = null;
    }
    document.documentElement.classList.add('bs-privacy-shield');
    setShieldActive(true);

    if (durationMs && durationMs > 0) {
      timerRef.current = window.setTimeout(() => {
        if (!document.hidden && document.hasFocus()) {
          document.documentElement.classList.remove('bs-privacy-shield');
          setShieldActive(false);
        }
        timerRef.current = null;
      }, durationMs);
    }
  }, []);

  const deactivateShield = useCallback(() => {
    if (timerRef.current) {
      window.clearTimeout(timerRef.current);
      timerRef.current = null;
    }
    if (!document.hidden) {
      document.documentElement.classList.remove('bs-privacy-shield');
      setShieldActive(false);
    }
  }, []);

  useEffect(() => {
    const clearSelectionAndClipboard = () => {
      try {
        window.getSelection()?.removeAllRanges();
      } catch {
        // Ignore selection errors
      }
      try {
        if (navigator.clipboard && typeof navigator.clipboard.writeText === 'function') {
          navigator.clipboard.writeText('').catch(() => {});
        }
      } catch {
        // Ignore clipboard permission errors
      }
    };

    const handleContextMenu = (e: MouseEvent) => {
      e.preventDefault();
      e.stopPropagation();
      return false;
    };

    const handleDragStart = (e: DragEvent) => {
      e.preventDefault();
      e.stopPropagation();
      return false;
    };

    const handleClipboardBlock = (e: ClipboardEvent) => {
      e.preventDefault();
      e.stopPropagation();
      clearSelectionAndClipboard();
      return false;
    };

    const handleSelectStart = (e: Event) => {
      const target = e.target as HTMLElement | null;
      const tag = target?.tagName;
      if (tag === 'INPUT' || tag === 'TEXTAREA') return;
      e.preventDefault();
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      const key = (e.key || '').toLowerCase();
      const mod = e.ctrlKey || e.metaKey;

      // PrintScreen / Snipping / Screen Capture keys
      if (
        e.key === 'PrintScreen' ||
        e.code === 'PrintScreen' ||
        (e.metaKey && e.shiftKey && (key === 's' || key === '3' || key === '4' || key === '5')) ||
        (e.ctrlKey && e.shiftKey && key === 's')
      ) {
        e.preventDefault();
        e.stopPropagation();
        clearSelectionAndClipboard();
        activateShield(1800);
        return;
      }

      // DevTools & View Source & Save Page / Print
      if (
        e.key === 'F12' ||
        (mod && e.shiftKey && (key === 'i' || key === 'j' || key === 'c' || key === 'k')) ||
        (mod && (key === 's' || key === 'p' || key === 'u'))
      ) {
        e.preventDefault();
        e.stopPropagation();
        activateShield(1400);
        return;
      }

      // Copy / Cut / Paste / Select-All lock
      if (mod && (key === 'c' || key === 'x' || key === 'v' || key === 'a')) {
        e.preventDefault();
        e.stopPropagation();
        clearSelectionAndClipboard();
      }
    };

    const handleKeyUp = (e: KeyboardEvent) => {
      if (e.key === 'PrintScreen' || e.code === 'PrintScreen') {
        clearSelectionAndClipboard();
        activateShield(1800);
      }
    };

    const handleVisibilityChange = () => {
      if (document.hidden) {
        activateShield();
      } else {
        deactivateShield();
      }
    };

    const handleWindowBlur = () => {
      activateShield();
    };

    const handleWindowFocus = () => {
      deactivateShield();
    };

    const handleMouseEnter = () => {
      if (!document.hidden && !timerRef.current) {
        deactivateShield();
      }
    };

    document.addEventListener('contextmenu', handleContextMenu, true);
    document.addEventListener('dragstart', handleDragStart, true);
    document.addEventListener('drop', handleDragStart, true);
    document.addEventListener('copy', handleClipboardBlock, true);
    document.addEventListener('cut', handleClipboardBlock, true);
    document.addEventListener('paste', handleClipboardBlock, true);
    document.addEventListener('selectstart', handleSelectStart, true);
    window.addEventListener('keydown', handleKeyDown, true);
    window.addEventListener('keyup', handleKeyUp, true);
    document.addEventListener('visibilitychange', handleVisibilityChange);
    window.addEventListener('blur', handleWindowBlur);
    window.addEventListener('focus', handleWindowFocus);
    document.addEventListener('mouseenter', handleMouseEnter);
    document.addEventListener('pointerdown', handleMouseEnter);

    return () => {
      if (timerRef.current) window.clearTimeout(timerRef.current);
      document.documentElement.classList.remove('bs-privacy-shield');
      document.removeEventListener('contextmenu', handleContextMenu, true);
      document.removeEventListener('dragstart', handleDragStart, true);
      document.removeEventListener('drop', handleDragStart, true);
      document.removeEventListener('copy', handleClipboardBlock, true);
      document.removeEventListener('cut', handleClipboardBlock, true);
      document.removeEventListener('paste', handleClipboardBlock, true);
      document.removeEventListener('selectstart', handleSelectStart, true);
      window.removeEventListener('keydown', handleKeyDown, true);
      window.removeEventListener('keyup', handleKeyUp, true);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      window.removeEventListener('blur', handleWindowBlur);
      window.removeEventListener('focus', handleWindowFocus);
      document.removeEventListener('mouseenter', handleMouseEnter);
      document.removeEventListener('pointerdown', handleMouseEnter);
    };
  }, [activateShield, deactivateShield]);

  if (!shieldActive) return null;

  return (
    <div
      aria-hidden="true"
      className="fixed inset-0 z-[9999] bg-[#0A1628] pointer-events-none select-none"
    />
  );
};
