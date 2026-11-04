from decimal import Decimal
from pydantic import BaseModel, Field, ConfigDict, StringConstraints
from typing import Annotated

class ServiceCreate (BaseModel):
    category_id: int = Field(..., alias="categoryId", gt = 0)
    title: Annotated [str, StringConstraints(strip_whitespace=True, min_length=1, max_length=100)]
    desc: Annotated [str, StringConstraints(strip_whitespace=True, min_length=1, max_length=100)]
    duration: int = Field (..., ge = 30, le = 180)
    price: Decimal = Field (..., gt = 0)
    
    model_config = ConfigDict(from_attributes=True)