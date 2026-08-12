export interface Product{
    id: number,
    title: string,
    image_url: string,
    price: number,
    category: string
}
export interface HeaderProps{
    total_price: number,
    total_count: number,
    clearCorzina: () => void,
    onOpenCart: () => void
}
export interface ProductCardProps{
    product:Product,
    addCart:(product:Product) => void
}