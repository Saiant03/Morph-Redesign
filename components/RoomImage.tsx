import { getImageProps } from 'next/image';
import { ViewTransition } from 'react';

type Props = { src: string; mobile?: string; alt: string; pos?: string; posM?: string; className?: string; priority?: boolean };

/**
 * A Morph campaign, art-directed: the landscape frame from 600 px, Morph's own portrait crop on phones, each with
 * its own focal point (lib/campaign.ts). Tablets get the landscape frame so no subject is cut by a portrait crop.
 */
export function CampaignPicture({ src, mobile, alt, pos, posM, className = '', priority = true }: Props) {
  const common = { alt, sizes: '100vw', priority };
  const { props: { srcSet: wide } } = getImageProps({ ...common, src, width: 1920, height: 1000 });
  const { props: img } = getImageProps({ ...common, src: mobile ?? src, width: mobile ? 745 : 1920, height: 1000 });
  return (
    <picture className={className} style={{ '--pos': pos, '--pos-m': mobile ? posM ?? pos : pos } as React.CSSProperties}>
      <source media="(min-width: 600px)" srcSet={wide} />
      <img {...img} alt={alt} className="campaign-img" />
    </picture>
  );
}

/**
 * The environment of a room. Named `room-image`, so moving between collections changes the photograph in place
 * under a band of light (globals.css, .room), and entering from the home worlds carries the same photograph in
 * (.room-enter).
 */
export function RoomImage(props: Props) {
  return (
    <ViewTransition name="room-image" share={{ 'enter-room': 'room-enter', default: 'room' }} default="none">
      <CampaignPicture {...props} />
    </ViewTransition>
  );
}
