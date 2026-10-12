const isApple = typeof navigator !== "undefined" && /Mac|iPhone|iPad|iPod/.test(navigator.userAgent);

/** Label for the command palette shortcut on this platform. */
export const paletteShortcut = isApple ? "⌘K" : "Ctrl K";
