from fastapi import FastAPI, HTTPException, Depends
from sqlalchemy import select
from sqlalchemy.orm import Session
from database import get_db
from schemas import ServiceCreate
import models

app = FastAPI()

@app.post("/services", status_code=201)
def createService (payload: ServiceCreate, db: Session = Depends(get_db)):
    db_service = models.Service(**payload.model_dump())

    db.add(db_service)
    db.commit()
    db.refresh(db_service)

    return db_service

@app.get("/services", status_code=200)
def getAllServices (db: Session = Depends(get_db)):
    stmt = select(models.Service)
    services = db.scalars(stmt).all()

    return services

@app.get("/services/{service_id}", status_code=200)
def getAllServices (service_id: int, db: Session = Depends(get_db)):
    stmt = select(models.Service).where(models.Service.id == service_id)
    service = db.scalar(stmt)

    return service


@app.get("/masters", status_code=200)
def getAllMasters(specialization: str = "", db: Session = Depends(get_db)):
    
    if specialization == "":
        stmt = select(models.Master)
    else:
        stmt = select(models.Master).where(models.Master.specialization == specialization)

    masters = db.scalars(stmt).all()

    return masters

@app.get("/masters/{master_id}", status_code=200)
def getMasterById (master_id: int, db: Session = Depends(get_db)):
    stmt = select(models.Master).where(models.Master.id == master_id)
    master = db.scalar(stmt)
    if master is None:
        raise HTTPException (404, detail="Master not found")
    
    return master