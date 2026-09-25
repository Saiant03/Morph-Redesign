// A link that leaves the concept for a Morph site: it opens there, and says so (as in the header)
export function Ext({ href, className = 'link', children }: { href: string; className?: string; children: React.ReactNode }) {
  const site = new URL(href).hostname.replace(/^www\./, '');
  return (
    <a href={href} className={className} target="_blank" rel="noopener">
      {children}<span className="sr-only"> (pe {site}, se deschide într-o filă nouă)</span><span aria-hidden> ↗</span>
    </a>
  );
}

/** Morph's own words: always a quotation, always with who said it and where. `lang` when Morph wrote them in another language. */
export function MorphQuote({ text, cite, href, className, lang }: { text: string; cite: React.ReactNode; href: string; className?: string; lang?: string }) {
  return (
    <figure className={className} data-voice="morph">
      <blockquote cite={href} lang={lang}><p>{lang === 'en' ? `“${text}”` : `„${text}”`}</p></blockquote>
      <figcaption className="t-small muted">{cite}</figcaption>
    </figure>
  );
}
