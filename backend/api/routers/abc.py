from api.models import AbcedarisAbc, AbecedarisAbcLletres
from fastapi import APIRouter
from api.deps import (
    db_dependency,
    user_dependency
    
)

router = APIRouter(prefix="/abc", tags=["abc"])

@router.get("/abcedaris")
async def get_abc(user: user_dependency, db: db_dependency):
    # AbecedarisAbcLletres, AbcedarisAbc
    return db.query(AbcedarisAbc).all()

@router.post("/abcedaris/{abecedaris_id}")
async def get_abc_lletres(user: user_dependency, db: db_dependency, abecedaris_id: int):
    return db.query(AbecedarisAbcLletres).filter(AbecedarisAbcLletres.abecedaris_id == abecedaris_id).all()