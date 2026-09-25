// A link that leaves the concept for morphparfum.ro: it opens there, and says so (as in the header)
export function Ext({ href, className = 'link', children }: { href: string; className?: string; children: React.ReactNode }) {
  return (
    <a href={href} className={className} target="_blank" rel="noopener">
      {children}<span className="sr-only"> (pe morphparfum.ro, se deschide într-o filă nouă)</span><span aria-hidden> ↗</span>
    </a>
  );
}

/** Morph's own words: always a quotation, always with who said it and where */
export function MorphQuote({ text, cite, href, className }: { text: string; cite: React.ReactNode; href: string; className?: string }) {
  return (
    <figure className={className} data-voice="morph">
      <blockquote cite={href}><p>„{text}”</p></blockquote>
      <figcaption className="t-small muted">{cite}</figcaption>
    </figure>
  );
}
