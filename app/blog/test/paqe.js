// import { readFile } from 'node:fs/promises'
//
// import { compile } from '@mdx-js/mdx'
// import remarkFrontmatter from 'remark-frontmatter'
// import remarkMdxFrontmatter from 'remark-mdx-frontmatter'
//
// const { value } = await compile(await readFile('example.mdx'), {
//   jsx: true,
//   remarkPlugins: [remarkFrontmatter, remarkMdxFrontmatter]
// })
// console.log(value)
//
//
// export const frontmatter = {
//   hello: 'frontmatter'
// }

export default function MDXContent() {
    return (
        <p>Rest of document</p>
    )
}
