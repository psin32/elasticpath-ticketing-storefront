import Link from "next/link"
import { cookies } from "next/headers";
import { getLogo } from "@/services/storyblok";
import { StoryblokComponent } from "@storyblok/react";
import Content from "@/components/common/Content";

export default async function Logo() {

    const cookieStore = cookies();
    const locale = cookieStore.get("locale")?.value || "en";
    const content = await getLogo(locale)

    return (
        <div className="ml-4 flex lg:ml-0 text-white">
            <Link href="/">
                <Content content={content}></Content>
            </Link>
        </div>
    )
}
