export interface PageTitleProps {
  title: string
}

export default function PageTitle({title}: PageTitleProps) {
  return <h1 className="text-xl font-bold mb-4">{title}</h1>
}