from api.models import (
    AbcedarisAbc, 
    AbecedarisAbcLletres,
    AbcBar
)

from fastapi import APIRouter
from api.deps import (
    db_dependency,
    user_dependency
    
)
from api.workouts.auths import CreateUserCoursesId

router = APIRouter(prefix="/abc", tags=["abc"])

'''
/abc/abcedaris
 '''

@router.get("/abcedaris", tags=["abc"])
async def get_abc(user: user_dependency, db: db_dependency):
    # AbecedarisAbcLletres, AbcedarisAbc
    n = CreateUserCoursesId(user, db)
    data = n.data()
    
    abc = db.query(AbcedarisAbc) \
            .filter(AbcedarisAbc.courses==data['courses']) \
            .all()

    return {"abecedari" : abc}

@router.get("/abc_abcedaris/{abecedaris_id}", tags=["abc"])
async def get_abc_lletres(user: user_dependency, db: db_dependency, abecedaris_id: int):
    ## todo: 

    n = CreateUserCoursesId(user, db)
    data = n.data()

    abc = db.query(AbecedarisAbcLletres) \
            .filter(AbecedarisAbcLletres.abecedaris_id == abecedaris_id) \
            .filter(AbecedarisAbcLletres.courses==data['courses']) \
            .all()

    return { "get_abc_lletres" : abc }

#########################################################################

@router.get("/abc_bar", tags=["bar"])
async def get_abc_bar(user: user_dependency, db: db_dependency):
    return { "abc_bar" : db.query(AbcBar).all()}