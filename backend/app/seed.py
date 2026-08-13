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
    {
        'title':'Компьютерное кресло ARDOR GAMING Chaos Guard 400M',
        'price':9199,
        'image_url':'https://c.dns-shop.ru/thumb/st1/fit/wm/0/0/af72f3939f21e0bb43f0d5c0215c5a18/5faf7f13be668a272a1f224ba4e6c2a9c3f57fc14a6434649abc493bba80cdff.jpg.webp',
        'category':'Кресла'
    },
    {
        'title':'Видеокарта MSI GeForce RTX 5080 GAMING TRIO',
        'price':179999,
        'image_url':'https://c.dns-shop.ru/thumb/st1/fit/wm/0/0/6044a4d1f6422cebcf6a4e488555545b/813136ae74c9db3e0cbb88a1304281764b0d1b040cd590c3b74e91f4b54e3e2b.jpg.webp',
        'category':'Видеокарты'
    },
    {
        'title': 'Ноутбук HONOR MagicBook X16 AMD 2025',
        'price': 64999,
        'image_url': 'https://c.dns-shop.ru/thumb/st1/fit/wm/0/0/0df24b35b682ecc3afa431eee2fb66e7/a4698552223b040056e94bc7e0831abe155b70a9cd7cb72717cb2d0e394b878b.jpg.webp',
        'category': 'Ноутбуки'
    },
    {
        'title': 'Телевизор Samsung UE50U8000FUXRU',
        'price': 43499,
        'image_url': 'https://c.dns-shop.ru/thumb/st1/fit/0/0/cef8edf9ac179ad529dabd718fb581df/8dda5cbdad7f20f448b351b812e4187ae4ede24b6973fb2d1012f6fca7db74ab.jpg.webp',
        'category': 'Телевизоры'
    },
    {
        'title':' Samsung Galaxy S25 FE 512 ГБ',
        'price':58299,
        'image_url':'https://c.dns-shop.ru/thumb/st1/fit/0/0/eeca890cdb2e040307a60bd2ef48a984/6c581baa45e073d1776c781eb859012169504723c2872d922b2e1d51706318c1.png.webp',
        'category':'Смартфоны'
    },
    {
        'title':'Apple iPhone 17 Pro 256 ГБ серебристый',
        'price':126999,
        'image_url':'https://c.dns-shop.ru/thumb/st1/fit/0/0/25d8e5049f089e018d4d966dca7515df/3f07b1ffa9193a775d83d5a74fa818307037b9e0cf34e51a18ac31304fceefb9.jpg.webp',
        'category':'Смартфоны'
    },
    {
        'title': 'Apple iPhone 15 128 ГБ голубой',
        'price': 57999,
        'image_url': 'https://c.dns-shop.ru/thumb/st1/fit/0/0/5988aa036fd0ebd34e2e947c753b543c/ff16ad29271ef2de28e421c8bb6eaa7cc2a8414377acc218457018f78c4cc4a4.jpg.webp',
        'category': 'Смартфоны'
    },
    {
        'title': 'Телевизор Xiaomi TV A Pro 32 ',
        'price': 17199,
        'image_url': 'https://c.dns-shop.ru/thumb/st1/fit/0/0/996d035512110e62f1702553b5e6db6f/02156f614b858ed01fb49713a4f6135e82e0e9392147eb6caad6a744a8e05e57.png.webp',
        'category': 'Телевизоры'
    },
    {
        'title': 'ПК ARDOR GAMING NEO M267',
        'price': 97999,
        'image_url': 'https://c.dns-shop.ru/thumb/st1/fit/wm/0/0/fd9fc91adbe14dad7e19eacd1f795dae/f658fd8374ac0657aac229347f09a8ac01367b8e8617897ddf46ccb1ab68c6de.jpg.webp',
        'category': 'Компьютеры'
    },
    {
        'title': 'Коврик ARDOR GAMING XL Patron Red',
        'price': 850,
        'image_url': 'https://c.dns-shop.ru/thumb/st1/fit/wm/0/0/62911c1342f9328b6dd3c4fe32124657/b5ad21dc95e57aaa2e6529884f1ae0c53557a33c99fe688ec5d16650e5ad4b32.jpg.webp',
        'category': 'Коврики'
    },
    {
        'title': 'Планшет Samsung Galaxy Tab A9+ 5G 128 ГБ',
        'price': 25299,
        'image_url': 'https://c.dns-shop.ru/thumb/st1/fit/wm/0/0/3f0172a3785de14df543f53eb518f6cb/962ec3bdd7023bee5ef3210ace60abb98029f1259e81876a499277cd6a015d00.jpg.webp',
        'category': 'Планшеты'
    },
    {
        'title': 'Ноутбук Apple MacBook Air M5 ',
        'price': 129999,
        'image_url': 'https://c.dns-shop.ru/thumb/st1/fit/0/0/26862d637d790729ff4fc4d6e9962959/3d8aa1fc5ab13fc33026235a46f8b322c3ba8c14e5884eb2c758f72216422f3e.png.webp',
        'category': 'Ноутбуки'
    },
    {
        'title': 'Монитор Xiaomi Curved Gaming Monitor G34WQi',
        'price': 29199,
        'image_url': 'https://c.dns-shop.ru/thumb/st1/fit/wm/0/0/210503d5cf54daffc8e5e6e995859154/b38eac32fde4dc0f1e9eed52810ee312b95b2bdedaa9787b5b681ed73dc65b9d.jpg.webp',
        'category': 'Мониторы'
    },
    {
        'title': 'Робот-пылесос Xiaomi Robot Vacuum X20 Max',
        'price': 48999,
        'image_url': 'https://c.dns-shop.ru/thumb/st1/fit/wm/0/0/c53f9091e6ab476715225cde1c9e4529/d5cc83a6d6a9f4bf9ed5615a19a9d27ad40c3e14f81bffb66774e63b2eb179f5.jpg.webp',
        'category': 'Роботы-пылесосы'
    },
    {
        'title': 'ПК MSI MPG Infinite Z3 X3D 9NVVR7',
        'price': 452999,
        'image_url': 'https://c.dns-shop.ru/thumb/st1/fit/wm/0/0/3da2692fc0064a799118a4d299253e9f/3d46055da56a19c46a693659c06e4a08f2560750ef07342509b0258db800d3f2.png.webp',
        'category': 'Компьютеры'
    },
    {
        'title': 'Ноутбук Gigabyte Gaming A18 PRO DXJ',
        'price': 224999,
        'image_url': 'https://c.dns-shop.ru/thumb/st1/fit/wm/0/0/638bf17881dd6a76431b8a0b64fca095/692692fd70c7de67d4a4c0b7e05369c9af371330dcbf7c6c1e422a9b7a074449.jpg.webp',
        'category': 'Ноутбуки'
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