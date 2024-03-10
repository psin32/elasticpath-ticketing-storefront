
import CartModal from "@/components/cart/CartModal"
import LoginModal from "./LoginModal"
import Logo from "./Logo";
import SearchBar from "./SearchBar";
import CurrencySelector from "./CurrencySelector";
import Content from "@/components/common/Content";

interface INavBar {
    content: any;
}

export default function NavBar({ content }: INavBar): JSX.Element {

    return (
        <nav aria-label="Top" className="mx-auto container px-4 sm:px-6 lg:px-8">
            <div className="flex h-16 items-center">
                <Logo />
                <Content content={content}></Content>
                <div className="ml-auto flex items-center">
                    <CurrencySelector />
                    <LoginModal />
                    <SearchBar />
                    <CartModal />
                </div>
            </div>
        </nav>
    )
}
