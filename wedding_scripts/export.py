import firebase_admin, os
from firebase_admin import firestore
import csv

class MealType:
    NORMAL = ""
    VEGETARIANO = "vegetariano"
    VEGANO = "vegano"

class GuestType:
   ADULT = "adt"
   CHILD = "chd"
   INFANT = "inf"
   
class Columns:
    PRE = 0
    NAME = 1
    LASTNAME = 2
    RELATION = 3
    _invito_da = 4
    CATEGORY = 5
    CONFIRM = 6
    GUEST_TYPE = 7
    INTOLERANCE = 8
    MEAL_TYPE = 9
    TABLE = 10

config_filename = "wedding-20e54-firebase-adminsdk-gn395-7218a08930.json"

cred = firebase_admin.credentials.Certificate(f".{os.path.sep}{config_filename}")

app = firebase_admin.initialize_app(cred)

firestore_client = firestore.client(app)

guests_collection = firestore_client.collection("guests")
guests = guests_collection.stream()
rows = []
row = [None for i in range(11)]
row[Columns.PRE] = "Prefisso"
row[Columns.NAME] = "Nome"
row[Columns.LASTNAME] = "Cognome"
row[Columns.RELATION] = "Nucleo numero"
row[Columns.CONFIRM] = "Invito Confermato"
row[Columns.GUEST_TYPE] = "Tipo"
row[Columns.MEAL_TYPE] = "Tipo Pasto"
row[Columns._invito_da] = "Invito Da"
row[Columns.CATEGORY] = "Categoria"
row[Columns.INTOLERANCE] = "Intolleranze"
row[Columns.TABLE] = "Tavolo"

# "mealType": 0 if row[Columns.MEAL_TYPE].lower() == MealType.NORMAL else 1 if row[Columns.MEAL_TYPE].lower() == MealType.VEGETARIANO else 2 if row[Columns.MEAL_TYPE].lower() == MealType.VEGANO else -1
# "confirmed": row[Columns.CONFIRM] == '2'
# "type": 0 if row[Columns.GUEST_TYPE].lower() == GuestType.INFANT else 1 if row[Columns.GUEST_TYPE].lower() == GuestType.CHILD else 2 if row[Columns.GUEST_TYPE].lower() == GuestType.ADULT else -1,
rows.append(row)
def write_guest(guest, i):
    row = [None for i in range(11)]
    row[Columns.PRE] = guest.get("prefix", None)
    row[Columns.NAME] = guest.get("name", None)
    row[Columns.LASTNAME] = guest.get("lastname", None)
    row[Columns.RELATION] = i
    row[Columns.CONFIRM] = guest.get("confirmed", None)
    row[Columns.GUEST_TYPE] = guest.get("type", None)
    # "mealType": 0 if row[Columns.MEAL_TYPE].lower() == MealType.NORMAL else 1 if row[Columns.MEAL_TYPE].lower() == MealType.VEGETARIANO else 2 if row[Columns.MEAL_TYPE].lower() == MealType.VEGANO else -1
    # "confirmed": row[Columns.CONFIRM] == '2'
    # "type": 0 if row[Columns.GUEST_TYPE].lower() == GuestType.INFANT else 1 if row[Columns.GUEST_TYPE].lower() == GuestType.CHILD else 2 if row[Columns.GUEST_TYPE].lower() == GuestType.ADULT else -1,
    row[Columns.TABLE] = guest.get("table", None) 
    return row
i = 1
for guest in guests:
    guest_json = guest.to_dict()
    main_guest_row = write_guest(guest_json, i)
    rows.append(main_guest_row)
    for companion in guest_json.get("companions", []):
        companion_row = write_guest(companion, i)
        rows.append(companion_row)
    i += 1

with open("./export2.csv", 'w', encoding="utf-8") as file:
  csvwriter = csv.writer(file)
  csvwriter.writerows(rows)
#   i = 0
#   for row in csvreader:
#     if i == 0:
#         i += 1
#         continue
#     data = {
#        "prefix": row[Columns.PRE],
#        "name": row[Columns.NAME],
#        "lastname": row[Columns.LASTNAME],
#        "mealType": 0 if row[Columns.MEAL_TYPE].lower() == MealType.NORMAL else 1 if row[Columns.MEAL_TYPE].lower() == MealType.VEGETARIANO else 2 if row[Columns.MEAL_TYPE].lower() == MealType.VEGANO else -1,
#        "confirmed": row[Columns.CONFIRM] == '2',
#        "type": 0 if row[Columns.GUEST_TYPE].lower() == GuestType.INFANT else 1 if row[Columns.GUEST_TYPE].lower() == GuestType.CHILD else 2 if row[Columns.GUEST_TYPE].lower() == GuestType.ADULT else -1,
#        "table": row[Columns.TABLE]
#     }
#     if row[Columns.RELATION] in guests.keys():
#         guests[row[Columns.RELATION]]["companions"].append(data)
#     else:
#         guests[row[Columns.RELATION]] = { **data, "companions": [] }
       
# example = {
#     'lastname': 'Pippo',
#     'companions': [],
#     'confirmed': False,
#     'name': 'Pluto'
# }
# guests_import = [guest for guest in guests.values()]
# for guest in guests_import:
#     guests_collection.add(guest)

# guests = guests_collection.get()

# for guest in guests:
#     print(f"{guest.id} => {guest.to_dict()}")

