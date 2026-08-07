const Logo = ({ className = '', size = 40, color = '#1E6B93', svgRef = null, pathClassName = '' }) => {
  return (
    <svg
      ref={svgRef}
      width={size}
      height={size * 1.15}
      viewBox="0 0 200 230"
      fill="none"
      className={`select-none ${className}`}
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Globe Main Outer Circle */}
      <circle className={pathClassName} cx="100" cy="85" r="50" stroke={color} strokeWidth="3" fill="none" />

      {/* Horizontal Grid Ellipses */}
      <ellipse className={pathClassName} cx="100" cy="85" rx="50" ry="15" stroke={color} strokeWidth="1.5" fill="none" opacity="0.7" />
      <ellipse className={pathClassName} cx="100" cy="85" rx="50" ry="30" stroke={color} strokeWidth="1.5" fill="none" opacity="0.7" />
      <ellipse className={pathClassName} cx="100" cy="85" rx="50" ry="42" stroke={color} strokeWidth="1.5" fill="none" opacity="0.7" />

      {/* Vertical Grid Lines */}
      <line className={pathClassName} x1="100" y1="35" x2="100" y2="135" stroke={color} strokeWidth="1.5" opacity="0.7" />
      <line className={pathClassName} x1="70" y1="48" x2="70" y2="122" stroke={color} strokeWidth="1.5" opacity="0.7" />
      <line className={pathClassName} x1="130" y1="48" x2="130" y2="122" stroke={color} strokeWidth="1.5" opacity="0.7" />
      <line className={pathClassName} x1="50" y1="68" x2="50" y2="102" stroke={color} strokeWidth="1" opacity="0.5" />
      <line className={pathClassName} x1="150" y1="68" x2="150" y2="102" stroke={color} strokeWidth="1" opacity="0.5" />

      {/* Orbit Ellipse */}
      <ellipse
        className={`orbit-ellipse ${pathClassName}`}
        cx="100"
        cy="85"
        rx="64"
        ry="19"
        stroke="#32C5E8"
        strokeWidth="2.5"
        fill="none"
        transform="rotate(-12 100 85)"
      />

      {/* Top Circuit Squares */}
      <rect x="92" y="22" width="8" height="8" rx="1.5" fill={color} />
      <rect x="108" y="18" width="10" height="10" rx="1.5" fill={color} />
      <rect x="124" y="24" width="6" height="6" rx="1" fill="#32C5E8" />

      {/* Circuit Traces from Globe */}
      <path className={pathClassName} d="M75 135 L70 155 L55 155 L55 175" stroke={color} strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
      <path className={pathClassName} d="M90 135 L90 160 L75 160 L75 185" stroke={color} strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
      <path className={pathClassName} d="M110 135 L110 155 L125 155 L125 175" stroke={color} strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
      <path className={pathClassName} d="M125 135 L130 160 L145 160 L145 185" stroke={color} strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
      <path className={pathClassName} d="M100 135 L100 165" stroke={color} strokeWidth="2.5" fill="none" strokeLinecap="round" />

      {/* Circuit Nodes (Outer Squares) */}
      <rect className={pathClassName} x="48" y="173" width="14" height="14" rx="2.5" stroke={color} strokeWidth="2" fill="none" />
      <rect className={pathClassName} x="68" y="183" width="14" height="14" rx="2.5" stroke={color} strokeWidth="2" fill="none" />
      <rect className={pathClassName} x="92" y="168" width="16" height="16" rx="2.5" stroke={color} strokeWidth="2" fill="none" />
      <rect className={pathClassName} x="118" y="183" width="14" height="14" rx="2.5" stroke={color} strokeWidth="2" fill="none" />
      <rect className={pathClassName} x="138" y="173" width="14" height="14" rx="2.5" stroke={color} strokeWidth="2" fill="none" />

      {/* Inner Squares in Nodes */}
      <rect x="53" y="178" width="4" height="4" rx="1" fill={color} />
      <rect x="73" y="188" width="4" height="4" rx="1" fill={color} />
      <rect x="98" y="174" width="4" height="4" rx="1" fill={color} />
      <rect x="123" y="188" width="4" height="4" rx="1" fill={color} />
      <rect x="143" y="178" width="4" height="4" rx="1" fill={color} />
    </svg>
  )
}

export default Logo
