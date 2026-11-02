import type { ReactNode } from "react";

/** Small outline drawings of gemstone shapes for the Shape filter. */
const paths: Record<string, ReactNode> = {
  oval: <ellipse cx="12" cy="12" rx="6.5" ry="9" />,
  round: <circle cx="12" cy="12" r="8.5" />,
  cushion: <rect x="4" y="4" width="16" height="16" rx="5" />,
  pear: <path d="M12 3c3 4.5 6.5 8.2 6.5 12a6.5 6.5 0 0 1-13 0C5.5 11.2 9 7.5 12 3Z" />,
  emerald: <path d="M9 3h6l3 3v12l-3 3H9l-3-3V6Z M9 6.5h6v11H9Z" />,
  marquise: <path d="M12 2.5C17 7 17 17 12 21.5 7 17 7 7 12 2.5Z" />,
  radiant: <path d="M8 4h8l3 3v10l-3 3H8l-3-3V7Z M8 4l4 8 4-8 M8 20l4-8 4 8" />,
  princess: <path d="M4 4h16v16H4Z M4 4l16 16 M20 4 4 20" />,
  other: <path d="M12 3 20 8v8l-8 5-8-5V8Z" />,
};

export function ShapeIcon({ shape, className = "" }: { shape: string; className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.2"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
      className={className}
    >
      {paths[shape] ?? paths.other}
    </svg>
  );
}
