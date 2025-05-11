import React from "react";
export default function Logo({ type, accent }) {
  switch (type) {
    case "code":
      return (
        <svg width="48" height="48" style={{ marginBottom: 8 }}>
          <polyline points="10,38 24,10 38,38" stroke={accent} strokeWidth="4" fill="none" strokeLinejoin="round" />
          <circle cx="24" cy="10" r="3" fill={accent} />
        </svg>
      );
    case "linux":
      return (
        <svg width="48" height="48" style={{ marginBottom: 8 }}>
          <ellipse cx="24" cy="28" rx="14" ry="10" stroke={accent} strokeWidth="4" fill="none"/>
          <circle cx="24" cy="18" r="7" fill={accent} opacity="0.7"/>
          <ellipse cx="24" cy="28" rx="6" ry="4" fill="#fff" opacity="0.7"/>
        </svg>
      );
    case "os":
      return (
        <svg width="48" height="48" style={{ marginBottom: 8 }}>
          <rect x="10" y="10" width="28" height="28" rx="7" stroke={accent} strokeWidth="4" fill="none"/>
          <circle cx="24" cy="24" r="7" fill={accent} opacity="0.7"/>
        </svg>
      );
    default:
      return null;
  }
}
