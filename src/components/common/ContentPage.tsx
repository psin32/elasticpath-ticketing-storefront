
import { getContentByFolder } from "@/services/storyblok";
import Content from "./Content";

interface IContentPage {
    type: string;
    page: string[];
}

export default async function ContentPage(params: IContentPage) {
    const content = await getContentByFolder(params.type, params.page)

    return (
        <Content content={content}></Content>
    )
}
