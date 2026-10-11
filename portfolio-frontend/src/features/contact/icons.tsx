/** Inline 24×24 stroke icons for the contact section (decorative; labels carry the meaning). */

const base = {
  viewBox: '0 0 24 24',
  width: 20,
  height: 20,
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.8,
  'aria-hidden': true,
  focusable: false,
} as const;

export function MailIcon() {
  return (
    <svg {...base}>
      <path d="M3 6.5h18v11H3z M3 7l9 6.5L21 7" strokeLinejoin="round" />
    </svg>
  );
}

export function LinkedInIcon() {
  return (
    <svg {...base}>
      <rect x="3" y="3" width="18" height="18" rx="3" />
      <path
        d="M8 10.5V16M8 7.8v.2M11.5 16v-5.5M11.5 13c0-1.6 1-2.6 2.3-2.6s2.2.9 2.2 2.6V16"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function PinIcon() {
  return (
    <svg {...base}>
      <path d="M12 21s-6.5-6.1-6.5-11a6.5 6.5 0 0 1 13 0c0 4.9-6.5 11-6.5 11z" />
      <circle cx="12" cy="10" r="2.2" fill="currentColor" stroke="none" />
    </svg>
  );
}

export function CopyIcon() {
  return (
    <svg {...base}>
      <rect x="8.5" y="8.5" width="12" height="12" rx="2" />
      <path d="M15.5 8.5V5a1.5 1.5 0 0 0-1.5-1.5H5A1.5 1.5 0 0 0 3.5 5v9A1.5 1.5 0 0 0 5 15.5h3.5" />
    </svg>
  );
}

export function CheckIcon() {
  return (
    <svg {...base}>
      <path d="M4.5 12.5l5 5 10-11" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function ArrowIcon() {
  return (
    <svg {...base}>
      <path d="M5 12h14M13 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
