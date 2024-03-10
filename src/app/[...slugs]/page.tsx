import CategoryPage from "@/components/category/CategoryPage";
import Header from "@/components/header/Header";

type IContent = {
  params: { slugs: string[] }
}

export default function Content({ params }: IContent) {
  return (
    <main className="flex flex-col justify-between">
      <Header />
      <CategoryPage categories={params.slugs} />
    </main>
  )
}
