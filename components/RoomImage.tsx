import { getImageProps } from 'next/image';
import { ViewTransition } from 'react';

/**
 * The environment of a room (a Morph campaign), art-directed: the desktop frame above 900 px, Morph's own portrait
 * crop below. Named `room-image`, so moving between collections changes the photograph in place under a band of
 * light instead of reloading it (globals.css, .room).
 */
export function RoomImage({ src, mobile, alt, pos, className = '' }: { src: string; mobile?: string; alt: string; pos?: string; className?: string }) {
  const common = { alt, sizes: '100vw', priority: true };
  const { props: { srcSet: wide } } = getImageProps({ ...common, src, width: 1920, height: 1000 });
  const { props: img } = getImageProps({ ...common, src: mobile ?? src, width: mobile ? 745 : 1920, height: mobile ? 1000 : 1000 });
  return (
    <ViewTransition name="room-image" share="room" default="none">
      <picture className={className}>
        <source media="(min-width: 900px)" srcSet={wide} />
        <img {...img} alt={alt} style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: pos }} />
      </picture>
    </ViewTransition>
  );
}
