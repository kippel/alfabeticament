import typer
from api.seed.dev import seed

app = typer.Typer()

@app.command()
def run():
    """Executa el seed de la base de dades"""
    seed()


@app.command()
def create_user(
    username: str = typer.Option(..., "--username", "-u", help="Nom d'usuari"),
    password: str = typer.Option(..., "--password", "-p", help="Contrasenya"),
):
    """Crea un usuari manualment"""
    from api.database import SessionLocal
    from api.models import User
    from api.deps import bcrypt_context

    db = SessionLocal()
    try:
        user = User(username=username, hashed_password=bcrypt_context.hash(password))
        db.add(user)
        db.commit()
        print(f"Usuari {username} creat correctament ✅")
    finally:
        db.close()

''' 
@app.command()
def create_user(username: str, password: str):
    """Crea un usuari manualment"""
    from api.database import SessionLocal
    from api.models import User
    from api.deps import bcrypt_context

    db = SessionLocal()
    try:
        user = User(username=username, hashed_password=bcrypt_context.hash(password))
        db.add(user)
        db.commit()
        print(f"Usuari {username} creat correctament ✅")
    finally:
        db.close()
'''

if __name__ == "__main__":
    app()
