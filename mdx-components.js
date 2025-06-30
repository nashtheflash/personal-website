import Link from "next/link"

export function useMDXComponents(components) {
  return {
    a: (props) => (
        <Link href={props.href} target="_blank">{props.children}</Link>
    ),
    ...components,
  }
}
