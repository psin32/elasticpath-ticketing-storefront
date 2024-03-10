import {
    StoryblokComponent,
} from "../storyblok/Storyblok";

import { getCategoryContent } from "@/services/storyblok";

interface ICategoryPage {
    categories: string[]
}

export default async function CategoryPage(params: ICategoryPage) {
    const content = await getCategoryContent(params.categories)

    return (
        <>
            {content?.story?.content && <StoryblokComponent blok={content?.story.content} />}
        </>
    )
}
