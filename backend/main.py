from fastapi import FastAPI

from fastapi.middleware.cors import CORSMiddleware  

from .routers import workouts, seeding

from .db.database import Base, engine

app = FastAPI()

Base.metadata.create_all(bind=engine)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000", "http://192.168.50.136:3000"],  # Allows all origins
    allow_credentials=True,
    allow_methods=["*"],  # Allows all methods
    allow_headers=["*"],  # Allows all headers
)


app.include_router(workouts.router)
app.include_router(seeding.router)