import type { SVGProps } from "react"

function Icon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 14 14"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
      {...props}
    />
  )
}

export function UserIcon() {
  return (
    <Icon>
      <circle cx="7" cy="4.6" r="2.6" />
      <path d="M2.2 12.8c.6-2.6 2.4-4 4.8-4s4.2 1.4 4.8 4" />
    </Icon>
  )
}

export function MailIcon() {
  return (
    <Icon>
      <rect x="1.1" y="2.6" width="11.8" height="8.8" rx="1.6" />
      <path d="M1.1 4.4l4.84 2.9c.66.42 1.5.42 2.15 0l4.82-2.9" />
    </Icon>
  )
}

export function ArrowLeftIcon() {
  return (
    <Icon>
      <path d="M9 11.24L4.76 7 9 2.76" />
    </Icon>
  )
}

export function ExternalIcon() {
  return (
    <Icon>
      <path d="M11.5 7.8v3.2a1.5 1.5 0 0 1-1.5 1.5H3a1.5 1.5 0 0 1-1.5-1.5V4A1.5 1.5 0 0 1 3 2.5h3.2" />
      <path d="M8.6 1.5h3.9v3.9M12.5 1.5L6.6 7.4" />
    </Icon>
  )
}

export function DownloadIcon() {
  return (
    <Icon>
      <path d="M7 1.6v7.6M3.9 6.3L7 9.4l3.1-3.1M1.8 12.4h10.4" />
    </Icon>
  )
}

export function LinkedInIcon() {
  return (
    <svg viewBox="0 0 14 14" fill="currentColor" aria-hidden>
      <path d="M1.6 0h10.8C13.3 0 14 .7 14 1.6v10.8c0 .9-.7 1.6-1.6 1.6H1.6C.7 14 0 13.3 0 12.4V1.6C0 .7.7 0 1.6 0Zm.6 5.3v6.5h2.1V5.3H2.2Zm1-3.3a1.2 1.2 0 1 0 0 2.4 1.2 1.2 0 0 0 0-2.4Zm2.6 3.3v6.5h2V8.6c0-.9.2-1.7 1.3-1.7s1.1 1 1.1 1.7v3.2h2V8.2c0-1.8-.4-3.1-2.5-3.1-1 0-1.7.5-2 1.1V5.3H5.2Z" />
    </svg>
  )
}

export function GitHubIcon() {
  return (
    <svg viewBox="0 0 16 16" fill="currentColor" aria-hidden>
      <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.01 8.01 0 0 0 16 8c0-4.42-3.58-8-8-8Z" />
    </svg>
  )
}
