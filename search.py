import requests
from datetime import date
from dotenv import load_dotenv
import os
load_dotenv()

##debug that the numbers were actually formatted as strings
# print(data["foods"][0]["foodNutrients"][0])
def food_search(food_query):
    #Calling API
    url = "https://api.nal.usda.gov/fdc/v1/foods/search"
    api = os.getenv("USDA_API_KEY")

    #food_query = input("What did you eat? ")

    response = requests.get(url, params={"query": food_query, "api_key": api})
    if response.status_code == 200:
        data = response.json()
    else:
        print(f"failed, with error code {response.status_code}")
    ##debug that the numbers were actually formatted as strings
    # print(data["foods"][0]["foodNutrients"][0])

    protein = None
    carbs = None
    fat = None
    for nutrients in data["foods"][0]["foodNutrients"]:
        if (nutrients["nutrientNumber"] in ["203", "204", "205"]):
            if nutrients['nutrientNumber'] == "203":
                protein = nutrients['value']
            elif nutrients['nutrientNumber'] == "204":
                fat = nutrients['value']
            elif nutrients['nutrientNumber'] == "205":
                carbs = nutrients['value']
    dictResult = {"date": date.today(), "food": food_query, "protein": protein, "carbs": carbs, "fat": fat, "calories": round(4*protein+4*carbs+9*fat), "serving_size": 3}
    return (dictResult)
    #insert_food_log(date.today(), food_query, protein, carbs, fat, round(4*protein+4*carbs+9*fat), 3)

#print(f"The number is {nutrients['nutrientNumber']} and the name of the macro is {nutrients['nutrientName']}.")
#print (f"The actual value for this item is {nutrients['value']} {nutrients['unitName']}")

