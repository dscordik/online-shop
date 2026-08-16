import {User} from "../../user/model/types";

export interface Product{
    id: number,
    title: string,
    image_url: string,
    price: number,
    category: string
}
export interface HeaderProps{
    total_count: number,
    onOpenCart: () => void,
    searchProducts: string,
    setSearchProducts: (searchProducts: string) => void,
    selectCategory: string,
    setSelectCategory:(selectCategory: string) => void,
    uniqCategory: string[],
    user: User | null,
    onIsAuthModalOpen:() => void,
    handleLogout: () => void
}
export interface ProductCardProps{
    product:Product,
    addCart:(product:Product) => void
}

export interface CartItem extends Product{
    count:number
}

