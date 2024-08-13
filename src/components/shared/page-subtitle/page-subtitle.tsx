export interface PageSubtitleProps {
  subtitle: string;
}

export default function PageSubtitle({ subtitle }: PageSubtitleProps) {
  return <p className="my-2">{subtitle}</p>;
}
