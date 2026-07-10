import type { SVGProps } from "react";

type IconProps = SVGProps<SVGSVGElement> & { size?: number };

const common = (size: number) => ({
  width: size,
  height: size,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 2,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  "aria-hidden": true
});

export function UsersIcon({ size = 24, ...props }: IconProps) {
  return <svg {...common(size)} {...props}><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>;
}

export function SearchIcon({ size = 20, ...props }: IconProps) {
  return <svg {...common(size)} {...props}><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>;
}

export function UserMinusIcon({ size = 20, ...props }: IconProps) {
  return <svg {...common(size)} {...props}><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 11h-6"/></svg>;
}

export function UserXIcon({ size = 20, ...props }: IconProps) {
  return <svg {...common(size)} {...props}><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="m17 8 5 5"/><path d="m22 8-5 5"/></svg>;
}

export function XIcon({ size = 20, ...props }: IconProps) {
  return <svg {...common(size)} {...props}><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>;
}

export function ChevronDownIcon({ size = 18, ...props }: IconProps) {
  return <svg {...common(size)} {...props}><path d="m6 9 6 6 6-6"/></svg>;
}

export function ChevronUpIcon({ size = 16, ...props }: IconProps) {
  return <svg {...common(size)} {...props}><path d="m18 15-6-6-6 6"/></svg>;
}

export function ShieldIcon({ size = 24, ...props }: IconProps) {
  return <svg {...common(size)} {...props}><path d="M20 13c0 5-3.5 7.5-8 9-4.5-1.5-8-4-8-9V5l8-3 8 3v8Z"/></svg>;
}

export function CoinsIcon({ size = 18, ...props }: IconProps) {
  return <svg {...common(size)} {...props}><circle cx="8" cy="8" r="6"/><path d="M18.1 8.4A6 6 0 1 1 8.4 18.1"/><path d="M6 8h4M8 6v4"/></svg>;
}

export function AlertCircleIcon({ size = 18, ...props }: IconProps) {
  return <svg {...common(size)} {...props}><circle cx="12" cy="12" r="10"/><path d="M12 8v4"/><path d="M12 16h.01"/></svg>;
}
