import ContentPage from "@/components/common/ContentPage";
import Header from "@/components/header/Header";

type IContent = {
  params: { slugs: string[] }
}

export default function Content({ params }: IContent) {
  return (
    <main className="flex flex-col justify-between">
      <Header />
      <ContentPage type="info" page={params.slugs} />
    </main>
  )
}
