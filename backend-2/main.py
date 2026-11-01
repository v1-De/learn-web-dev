from fastapi import FastAPI

categories = [
    { "id": 1, "name": "Стрижки и укладка", "servicesCount": 5 },
    { "id": 2, "name": "Маникюр и педикюр", "servicesCount": 5 },
    { "id": 3, "name": "Брови и ресницы", "servicesCount": 4 },
    { "id": 4, "name": "Спа-процедуры", "servicesCount": 4 },
]

app = FastAPI()

@app.get("/categories")
def getAllCategories():
    return categories

@app.get("/categories/{categorie_id}")
def getCategoriesById (categorie_id: int):
    for categorie in categories:
        if categorie["id"] == categorie_id:
            return categorie
    return null