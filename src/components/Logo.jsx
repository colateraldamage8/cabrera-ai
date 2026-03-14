/**
 * Cabrera AI Logo — brain + circuit with orbit ring
 * Electric blue / cyan on deep navy
 */
export default function Logo({ size = 36 }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 40 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient id="logoGrad" x1="0" y1="0" x2="40" y2="40" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#22d3ee" />
          <stop offset="100%" stopColor="#3b82f6" />
        </linearGradient>
        <filter id="glow">
          <feGaussianBlur stdDeviation="1" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      {/* Outer orbit ring */}
      <circle cx="20" cy="20" r="18" stroke="url(#logoGrad)" strokeWidth="1" strokeDasharray="4 3" opacity="0.5" />

      {/* Inner background circle */}
      <circle cx="20" cy="20" r="13" fill="#0a1628" />
      <circle cx="20" cy="20" r="13" fill="url(#logoGrad)" fillOpacity="0.08" />

      {/* Brain / circuit node — stylised */}
      {/* Left hemisphere arc */}
      <path
        d="M14 17.5 C14 14 16.5 12 19.5 12.5"
        stroke="url(#logoGrad)"
        strokeWidth="1.6"
        strokeLinecap="round"
        fill="none"
        filter="url(#glow)"
      />
      {/* Right hemisphere arc */}
      <path
        d="M26 17.5 C26 14 23.5 12 20.5 12.5"
        stroke="url(#logoGrad)"
        strokeWidth="1.6"
        strokeLinecap="round"
        fill="none"
        filter="url(#glow)"
      />
      {/* Bottom brain curve */}
      <path
        d="M14 17.5 C13 20 14 23 16 24 L20 25 L24 24 C26 23 27 20 26 17.5"
        stroke="url(#logoGrad)"
        strokeWidth="1.6"
        strokeLinecap="round"
        fill="none"
        filter="url(#glow)"
      />
      {/* Centre divider */}
      <line x1="20" y1="13" x2="20" y2="25" stroke="url(#logoGrad)" strokeWidth="1" opacity="0.5" />
      {/* Circuit nodes */}
      <circle cx="20" cy="27.5" r="1.5" fill="url(#logoGrad)" filter="url(#glow)" />
      <line x1="20" y1="25" x2="20" y2="27.5" stroke="url(#logoGrad)" strokeWidth="1" />
      {/* Left node */}
      <circle cx="14.5" cy="20" r="1.2" fill="#22d3ee" opacity="0.8" filter="url(#glow)" />
      {/* Right node */}
      <circle cx="25.5" cy="20" r="1.2" fill="#60a5fa" opacity="0.8" filter="url(#glow)" />
      {/* Orbit dot (top right) */}
      <circle cx="33.3" cy="11" r="2" fill="#22d3ee" opacity="0.9" filter="url(#glow)" />
    </svg>
  );
}
