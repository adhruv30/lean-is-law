import requests

#Calling API
url = "https://api.nal.usda.gov/fdc/v1/foods/search"
from dotenv import load_dotenv
import os
load_dotenv()
api = os.getenv("USDA_API_KEY")

response = requests.get(url, params={"query": "chicken breast", "api_key": api})
if response.status_code == 200:
    data = response.json()
else:
    print(f"failed, with error code {response.status_code}")

##debug that the numbers were actually formatted as strings
# print(data["foods"][0]["foodNutrients"][0])

for nutrients in data["foods"][0]["foodNutrients"]:
    if (nutrients["nutrientNumber"] in ["203", "204", "205"]):
        print(f"The number is {nutrients['nutrientNumber']} and the name of the macro is {nutrients['nutrientName']}.")
        print (f"The actual value for this item is {nutrients['value']} {nutrients['unitName']}")