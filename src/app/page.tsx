import LandingPage from "@/components/common/LandingPage";
import Header from "@/components/header/Header";
import Script from "next/script";

export default async function Home() {

  return (
    <main className="flex flex-col justify-between">
      <Script src="https://cdnjs.cloudflare.com/ajax/libs/flowbite/1.8.1/flowbite.min.js" strategy="beforeInteractive"></Script>
      <Header />
      <LandingPage />
    </main>
  )
}
