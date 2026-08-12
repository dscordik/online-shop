from app.database import SessionLocal
from app.models import Product

products_data = [
    {
        'title':'Apple iPhone 13 Pro Max 256 ГБ серый',
        'price':49999,
        'image_url':'https://avatars.mds.yandex.net/get-goods_pic/13815862/hat4b62e18159314066a49f3f454d69a92b/orig',
        'category':'Смартфоны'
    },
    {
        'title':'Apple Watch Series 9',
        'price':32990,
        'image_url':'https://avatars.mds.yandex.net/get-goods_pic/14303028/hat9394b3b71e976b3aca559329d1f972e9/orig',
        'category':'Умные часы'
    },
    {
        'title':'Sony PlayStation 5 Slim Digital Edition',
        'price':54999,
        'image_url':'https://avatars.mds.yandex.net/get-goods_pic/14767629/hat776ae2da20abbe73a263d0019c0397e8/orig',
        'category':'Игровые консоли'
    },
    {
        'title':'Apple iPad 11 128GB Silver',
        'price':39999,
        'image_url':'https://img.mvideo.ru/product-medias/photos/4253334/94ddcfa6-11d6-4e43-a5b2-893055a500c0.jpg?width=600&fmt=avif',
        'category':'Планшеты'
    },


    # Это что снизу я не добавлял
    {
        'title':'Ноутбук MSI Katana 17 HX',
        'price':132499,
        'image_url':'https://c.dns-shop.ru/thumb/st1/fit/320/250/9c626181dcbc6e8437a724d6b7f0bf59/9a098cfd0f0f5abfe26ca57235055110ead8a62e107c3379fe928dc1096f9a00.jpg.webp',
        'category':'Ноутбуки'
    },
    {
        'title':'наушники ARDOR GAMING Mist',
        'price':3699,
        'image_url':'https://c.dns-shop.ru/thumb/st1/fit/320/250/456393cf8d464bace00a8aace898f529/c5e423ddbc313e180ac163791771f1fac314a7e7df29a3c02e5a3c80ab0e818d.jpg.webp',
        'category':'Наушники'
    },
    {
        'title':'Мышь беспроводная Logitech G502 X',
        'price':8299,
        'image_url':'https://c.dns-shop.ru/thumb/st1/fit/wm/0/0/6473e32e5aeb571ec6d79efe6045fc3f/e00b15fdcaf4c6cdea13124a28ec23e231cae6c149b9325746f573ce3a3b8e9a.jpg.webp',
        'category':'Мыши'
    },
    {
        'title':'Монитор Samsung Odyssey OLED G6',
        'price':59999,
        'image_url':'https://c.dns-shop.ru/thumb/st1/fit/320/250/01297f00af506bb52a75d80c4d868ebd/43cc52250c15a6ca552c9fd9ee36bee9a0a3bd7ea2f18c5c58d8f8c8a865def9.jpg.webp',
        'category':'Мониторы'
    },
]

def seed_db():
    db = SessionLocal()

    try:
        added = 0
        for item in products_data:
            if not db.query(Product).filter(Product.title == item['title']).first():
                product = Product(**item)
                db.add(product)
                added+=1
        db.commit()

        if added:
            print(f'Добавлено {added} новых товаров')
        else:
            print('Новых товаров не найдено, база уже актуальна')
    finally:
        db.close()

if __name__ == '__main__':
    seed_db()