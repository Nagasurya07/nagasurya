export default function LeetCodeIcon({ size = 24, className = "" }) {
  const s = size;
  return (
    <svg
      width={s}
      height={s}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
      focusable="false"
    >
      {/* Simple, non-branded monogram-style icon: rounded square with L and C */}
      <rect x="1.5" y="1.5" width="21" height="21" rx="6" className="stroke-current" strokeWidth="1.5" />
      <path d="M7.5 7.5v9h4" className="stroke-current" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M16.5 9.25a3.75 3.75 0 1 0 0 5.5" className="stroke-current" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
