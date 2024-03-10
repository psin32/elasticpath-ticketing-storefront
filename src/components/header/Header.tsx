
import { getTopNavigationContent } from "@/services/storyblok";
import NavBar from "./navigation/NavBar";
import dynamic from "next/dynamic";
import { cookies } from "next/headers";

const TopBar = dynamic(
  () => import('./navigation/TopBar'),
  { ssr: false }
)

export default async function Header() {
  const cookieStore = cookies()
  const locale = cookieStore.get("locale")?.value || "en";
  const catalog = cookieStore.get("catalog")?.value || "ontario";

  const content = await getTopNavigationContent(locale, catalog)

  return (
    <>
      <header className="relative bg-[#00549a] text-white">
        <TopBar />
        <NavBar content={content}></NavBar>
      </header>
    </>
  )
}
