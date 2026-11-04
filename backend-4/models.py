from decimal import Decimal
from sqlalchemy import String, Numeric
from sqlalchemy.orm import Mapped, mapped_column
from database import Base

class Master(Base):
    __tablename__ = "masters"

    id: Mapped[int] = mapped_column(primary_key=True)
    name: Mapped[str] = mapped_column(String(50))
    specialization: Mapped[str] = mapped_column(String(20))


class Service (Base):
    __tablename__ = "services"

    id: Mapped[int] = mapped_column(primary_key=True)
    category_id: Mapped[int]
    title: Mapped[str] = mapped_column(String(100))
    desc: Mapped[str] = mapped_column(String(100))
    duration: Mapped[int]
    price: Mapped[Decimal] = mapped_column(Numeric(precision=9, scale=2))