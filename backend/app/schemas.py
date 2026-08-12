from pydantic import BaseModel, ConfigDict

class ProductSchema(BaseModel):
    id: int
    title: str
    price: int
    image_url: str
    category: str

    model_config = ConfigDict(from_attributes=True)