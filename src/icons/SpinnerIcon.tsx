/** ローディングスピナーアイコン（15px 固定。ラッパーでセンタリングして使用） */
export const SpinnerIcon = () => (
  <svg
    style={{ flexShrink: 0 }}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    width="18.33"
    height="18.33"
  >
    <circle
      cx="12"
      cy="12"
      r="10"
      stroke="currentColor"
      strokeWidth="2.5"
      opacity="0.2"
    />
    <circle
      cx="12"
      cy="12"
      r="10"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeDasharray="47.12 15.71"
    >
      <animateTransform
        attributeName="transform"
        type="rotate"
        from="0 12 12"
        to="360 12 12"
        dur="1s"
        repeatCount="indefinite"
      />
    </circle>
  </svg>
);
