import Link from 'next/link';

export function LinkNewTab({link, text}) {
  return <Link href={link} target='_blank' rel="noopener">{text}</Link>
}
