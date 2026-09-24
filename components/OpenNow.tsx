'use client';
import { useEffect, useState } from 'react';
import { BOUTIQUE } from '@/lib/catalog';

/** "Open now" line computed from the published hours, in Bucharest time. Rendered after mount (it depends on the clock). */
export function OpenNow() {
  const [text, setText] = useState<string | null>(null);
  useEffect(() => {
    const parts = new Intl.DateTimeFormat('en-GB', { timeZone: 'Europe/Bucharest', weekday: 'short', hour: 'numeric', minute: 'numeric', hourCycle: 'h23' }).formatToParts(new Date());
    const day = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].indexOf(parts.find(p => p.type === 'weekday')!.value);
    const h = Number(parts.find(p => p.type === 'hour')!.value) + Number(parts.find(p => p.type === 'minute')!.value) / 60;
    const [o, c] = BOUTIQUE.open[day];
    const next = BOUTIQUE.open[(day + 1) % 7][0];
    setText(h >= o && h < c ? `Deschis acum, până la ${c}:00.` : h < o ? `Închis acum. Deschide azi la ${o}:00.` : `Închis acum. Deschide mâine la ${next}:00.`);
  }, []);
  return <p className="t-lede" aria-live="polite">{text ?? ' '}</p>;
}
