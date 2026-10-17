interface TrainProps {
  className?: string;
  /** Increments on every trip; its parity restarts the one-shot running sway in CSS. */
  trip: number;
}

const WINDOWS = [16, 28, 40, 52, 64, 76];
const WHEELS = [22, 34, 80, 92];

/**
 * The commuter car that rides the career line: a side view with a sloped nose, cab windscreen,
 * window band, line-colour stripe, pantograph and two bogies. Purely decorative.
 * Colours come from the theme tokens, so it follows light and dark.
 */
export function Train({ className = '', trip }: TrainProps) {
  return (
    <span className={className} data-trip={trip % 2} aria-hidden="true">
      <svg viewBox="0 -4 124 42" focusable="false">
        <defs>
          <linearGradient id="train-body" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0" style={{ stopColor: 'var(--color-accent)' }} />
            <stop offset="1" style={{ stopColor: 'var(--aurora-3)' }} />
          </linearGradient>
          <linearGradient id="train-sheen" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#fff" stopOpacity="0.45" />
            <stop offset="0.5" stopColor="#fff" stopOpacity="0" />
          </linearGradient>
        </defs>

        <g data-part="car">
          {/* Pantograph */}
          <path d="M44 4 L50 -2 L56 4 M47 -2 H53" fill="none" stroke="var(--color-ink-muted)" strokeWidth="1.2" strokeLinecap="round" />

          {/* Bogies and wheels */}
          <rect x="16" y="27" width="24" height="4" rx="2" fill="var(--color-ink)" />
          <rect x="74" y="27" width="24" height="4" rx="2" fill="var(--color-ink)" />
          {WHEELS.map((cx) => (
            <g key={cx}>
              <circle cx={cx} cy="32" r="3.6" fill="var(--color-ink)" />
              <circle cx={cx} cy="32" r="1.2" fill="var(--color-ink-muted)" />
            </g>
          ))}

          {/* Body: square tail, long roof, sloped nose to the right */}
          <path
            d="M6 9 Q6 4 11 4 H88 C101 4 113 13 118 22 Q120 28 114 28 H9 Q6 28 6 25 Z"
            fill="url(#train-body)"
          />
          <path d="M6 9 Q6 4 11 4 H88 C101 4 113 13 118 22 Q120 28 114 28 H9 Q6 28 6 25 Z" fill="url(#train-sheen)" />

          {/* Line-colour stripe along the skirt */}
          <path d="M6 22 H117 Q119 25 117 26 H6 Z" fill="var(--aurora-4)" opacity="0.9" />

          {/* Passenger windows and cab windscreen */}
          {WINDOWS.map((x) => (
            <rect key={x} x={x} y="9" width="9" height="8" rx="2" fill="#fff" opacity="0.9" />
          ))}
          <path d="M92 9 H99 C105 10 110 14 112 18 H92 Z" fill="#fff" opacity="0.9" />

          {/* Headlight */}
          <circle cx="114.5" cy="23.5" r="1.6" fill="#fef3c7" data-part="lamp" />
        </g>
      </svg>
    </span>
  );
}
