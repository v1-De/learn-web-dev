from fastapi import FastAPI, HTTPException, Depends
from sqlalchemy import select
from sqlalchemy.orm import Session
from database import get_db
import models

app = FastAPI()

@app.get("/masters")
def getAllCategories(specialization: str = "", db: Session = Depends(get_db)):
    
    if specialization == "":
        stmt = select(models.Master)
    else:
        stmt = select(models.Master).where(models.Master.specialization == specialization)

    masters = db.scalars(stmt).all()

    return masters

@app.get("/masters/{master_id}")
def getCategoriesById (master_id: int, db: Session = Depends(get_db)):
    stmt = select(models.Master).where(models.Master.id == master_id)
    master = db.scalar(stmt)
    if master is None:
        raise HTTPException (404, detail="Master not found")
    
    return master