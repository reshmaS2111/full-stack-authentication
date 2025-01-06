from fastapi import FastAPI, HTTPException, Depends
from typing import Annotated, List
from sqlalchemy.orm import Session
from pydantic import BaseModel
from database import SessionLocal, engine
import models
from database import engine


app = FastAPI()

# install fastapi-cors, import and add CORS middleware

@app.get('/')
async def check():
    return 'hello'

class ItemBase(BaseModel):
    name: str
    description: str
    price: float

class ItemModel(ItemBase):
    id: int
    
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


db_dependency = Annotated[Session, Depends(get_db)]

models.Base.metadata.create_all(bind=engine)


@app.post("/items/", response_model=ItemModel)
async def create_items(item: ItemBase, db: db_dependency):
    # print('he')
    db_item = models.Item(**item.model_dump())
    db.add(db_item)
    db.commit()
    db.refresh(db_item)
    return db_item


@app.get("/items/", response_model=List[ItemModel])
async def read_items(db: db_dependency, skip: int=0, limit: int=100):
    items = db.query(models.Item).offset(skip).limit(limit).all()
    return items
