/*
 * <JsonLd /> — renders a schema.org structured-data block as a
 * <script type="application/ld+json"> tag.
 *
 * Pair it with generateJsonLd() from @/lib/seo, e.g.
 *   <JsonLd schema={generateJsonLd({ ...postMetadata, url: '/blog/articles/alcan-spring' })} />
 *
 * Next.js has no auto-convention for JSON-LD (unlike the `metadata` export), so the
 * <script> has to be rendered in the tree yourself — that's what this component is for.
 */
export function JsonLd({ schema }) {
    if (!schema) return null;

    return (
        <script
            type="application/ld+json"
            // schema is built server-side from our own metadata, so this is safe.
            dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
    );
}
