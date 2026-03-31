/**
 * chevron-right アイコン（サイズは親要素の CSS で制御）
 *
 * アスペクト比が正方形でないため、親要素の CSS に
 * サイズ制御を委譲する方式を採用している。
 */
export const ChevronRightIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="100%"
    height="100%"
    viewBox="0 0 6 11"
    fill="none"
  >
    <path
      d="M1.03583 11L0 10.0925L4.02417 5.5L0 0.9075L1.03583 0L5.8575 5.5L1.03583 11Z"
      fill="currentColor"
    />
  </svg>
);
