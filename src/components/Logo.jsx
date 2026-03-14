/**
 * Cabrera AI Logo — brain split (organic blue / circuit silver) + metallic orbit ring
 * Matches brand logo: deep navy bg, electric blue left, silver-blue right, silver ring
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
        {/* Blue gradient — left/organic side */}
        <linearGradient id="blueGrad" x1="0" y1="0" x2="20" y2="40" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#38bdf8" />
          <stop offset="100%" stopColor="#2563eb" />
        </linearGradient>
        {/* Silver gradient — orbit ring + circuit side */}
        <linearGradient id="silverGrad" x1="0" y1="0" x2="40" y2="0" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#64748b" />
          <stop offset="50%" stopColor="#e2e8f0" />
          <stop offset="100%" stopColor="#94a3b8" />
        </linearGradient>
        {/* Full gradient for subtle elements */}
        <linearGradient id="fullGrad" x1="0" y1="0" x2="40" y2="40" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#38bdf8" />
          <stop offset="100%" stopColor="#3b82f6" />
        </linearGradient>
        <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="1.2" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
        <filter id="softglow" x="-30%" y="-30%" width="160%" height="160%">
          <feGaussianBlur stdDeviation="0.7" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      {/* ── Orbit ring — metallic silver ellipse ── */}
      <ellipse
        cx="20" cy="21"
        rx="17" ry="7"
        stroke="url(#silverGrad)"
        strokeWidth="1.2"
        fill="none"
        opacity="0.75"
        transform="rotate(-20 20 21)"
      />

      {/* ── Brain left hemisphere — electric blue organic ── */}
      {/* Outer curve */}
      <path
        d="M20 11 C15 11 11 14 11 18.5 C11 22 13 25 16 26 L20 27"
        stroke="url(#blueGrad)"
        strokeWidth="1.8"
        strokeLinecap="round"
        fill="none"
        filter="url(#glow)"
      />
      {/* Inner fold 1 */}
      <path
        d="M13 17 C13 15.5 14.5 14.5 16 15"
        stroke="#38bdf8"
        strokeWidth="1.3"
        strokeLinecap="round"
        fill="none"
        opacity="0.8"
        filter="url(#softglow)"
      />
      {/* Inner fold 2 */}
      <path
        d="M12 20.5 C12.5 19 14 18.5 15.5 19.5"
        stroke="#38bdf8"
        strokeWidth="1.3"
        strokeLinecap="round"
        fill="none"
        opacity="0.7"
        filter="url(#softglow)"
      />
      {/* Inner fold 3 */}
      <path
        d="M13.5 23 C14 21.5 15.5 21.5 16.5 22.5"
        stroke="#60a5fa"
        strokeWidth="1.1"
        strokeLinecap="round"
        fill="none"
        opacity="0.65"
      />

      {/* ── Centre divider ── */}
      <line x1="20" y1="11" x2="20" y2="27" stroke="rgba(148,163,184,0.35)" strokeWidth="0.8" />

      {/* ── Brain right hemisphere — circuit silver/blue ── */}
      {/* Outer curve */}
      <path
        d="M20 11 C25 11 29 14 29 18.5 C29 22 27 25 24 26 L20 27"
        stroke="url(#silverGrad)"
        strokeWidth="1.8"
        strokeLinecap="round"
        fill="none"
        opacity="0.85"
      />
      {/* Circuit line vertical */}
      <line x1="24" y1="13.5" x2="24" y2="19" stroke="#94a3b8" strokeWidth="1" opacity="0.8" />
      {/* Circuit horizontal */}
      <line x1="24" y1="16" x2="27" y2="16" stroke="#94a3b8" strokeWidth="1" opacity="0.8" />
      {/* Circuit node dots */}
      <circle cx="27" cy="16" r="1" fill="#e2e8f0" opacity="0.9" />
      <circle cx="24" cy="19" r="0.9" fill="#94a3b8" opacity="0.9" />
      <circle cx="24" cy="13.5" r="0.9" fill="#94a3b8" opacity="0.8" />
      {/* Lower circuit branch */}
      <line x1="22" y1="22" x2="26" y2="22" stroke="#64748b" strokeWidth="0.9" opacity="0.7" />
      <circle cx="22" cy="22" r="0.8" fill="#94a3b8" opacity="0.75" />

      {/* ── Bottom stem ── */}
      <line x1="20" y1="27" x2="20" y2="29.5" stroke="url(#fullGrad)" strokeWidth="1" opacity="0.6" />
      <circle cx="20" cy="30" r="1.3" fill="url(#blueGrad)" filter="url(#glow)" />
    </svg>
  );
}
