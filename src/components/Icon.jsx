import React from "react";

const paths = {
  search: (
    <>
      <circle cx="11" cy="11" r="7" />
      <path d="m20 20-3.5-3.5" />
    </>
  ),
  sliders: (
    <>
      <path d="M4 6h10" />
      <path d="M18 6h2" />
      <path d="M4 12h2" />
      <path d="M10 12h10" />
      <path d="M4 18h14" />
      <circle cx="16" cy="6" r="2" />
      <circle cx="8" cy="12" r="2" />
      <circle cx="20" cy="18" r="2" />
    </>
  ),
  star: <path d="M12 3.5 14.6 9l6 .6-4.5 4 1.3 6-5.4-3-5.4 3 1.3-6L3.4 9.6 9.4 9z" />,
  starFill: (
    <path
      d="M12 3.5 14.6 9l6 .6-4.5 4 1.3 6-5.4-3-5.4 3 1.3-6L3.4 9.6 9.4 9z"
      fill="currentColor"
    />
  ),
  sun: (
    <>
      <circle cx="12" cy="12" r="4" />
      <path d="M12 3v2M12 19v2M3 12h2M19 12h2M5.6 5.6l1.4 1.4M17 17l1.4 1.4M5.6 18.4 7 17M17 7l1.4-1.4" />
    </>
  ),
  moon: <path d="M20 14.5A8 8 0 1 1 9.5 4a6.5 6.5 0 0 0 10.5 10.5Z" />,
  copy: (
    <>
      <rect x="9" y="9" width="11" height="11" rx="2" />
      <path d="M5 15V6a2 2 0 0 1 2-2h9" />
    </>
  ),
  check: <path d="m5 12 4.5 4.5L19 7" />,
  pencil: (
    <>
      <path d="M4 20h4l10-10-4-4L4 16v4Z" />
      <path d="m13.5 6.5 4 4" />
    </>
  ),
  trash: (
    <>
      <path d="M4 6h16" />
      <path d="M9 6V4h6v2" />
      <path d="M6 6v14a1 1 0 0 0 1 1h10a1 1 0 0 0 1-1V6" />
      <path d="M10 11v5M14 11v5" />
    </>
  ),
  expand: (
    <>
      <path d="M4 9V4h5" />
      <path d="M20 9V4h-5" />
      <path d="M4 15v5h5" />
      <path d="M20 15v5h-5" />
    </>
  ),
  close: <path d="M6 6l12 12M18 6 6 18" />,
  arrowLeft: (
    <>
      <path d="M19 12H5" />
      <path d="m11 6-6 6 6 6" />
    </>
  ),
  minus: <path d="M5 12h14" />,
  plus: (
    <>
      <path d="M12 5v14" />
      <path d="M5 12h14" />
    </>
  ),
  aSmall: (
    <>
      <path d="M5 15 9 5l4 10" strokeWidth="1.6" />
      <path d="M6.5 11h5" strokeWidth="1.6" />
      <path d="M15 15h5" />
    </>
  ),
  aBig: (
    <>
      <path d="M3 18 9 5l6 13" strokeWidth="1.8" />
      <path d="M5 14h8" strokeWidth="1.8" />
      <path d="M18 12v6M15 15h6" />
    </>
  ),
  scroll: (
    <>
      <path d="M12 4v14" />
      <path d="m6 13 6 6 6-6" />
    </>
  ),
  alert: (
    <>
      <path d="M12 4 2 20h20L12 4Z" />
      <path d="M12 10v5" />
      <circle cx="12" cy="18" r="0.6" fill="currentColor" stroke="none" />
    </>
  ),
  notes: (
    <>
      <path d="M9 18V5l11-2v13" />
      <circle cx="6" cy="18" r="3" />
      <circle cx="17" cy="16" r="3" />
    </>
  ),
  bookmark: <path d="M6 3h12v19l-6-4-6 4V3Z" />,
  retry: (
    <>
      <path d="M20 12a8 8 0 1 1-2.5-5.8" />
      <path d="M20 4v5h-5" />
    </>
  ),
};

const Icon = ({ name, size = 20, strokeWidth = 1.5, style, ...rest }) => {
  const d = paths[name];
  if (!d) return null;
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      style={{ display: "block", flexShrink: 0, ...style }}
      {...rest}
    >
      {d}
    </svg>
  );
};

export default Icon;
