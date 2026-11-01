from sqlalchemy import String
from sqlalchemy.orm import Mapped, mapped_column
from database import Base

class Master(Base):
    __tablename__ = "masters"

    id: Mapped[int] = mapped_column(primary_key=True)
    name: Mapped[str] = mapped_column(String(50))
    specialization: Mapped[str] = mapped_column(String(20))