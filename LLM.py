import anthropic
from dotenv import load_dotenv 
import os
import json
load_dotenv()
def parse_food_input (user_input):
    client = anthropic.Anthropic(api_key=os.getenv("ANTHROPIC_API_KEY"))
    message = client.messages.create(
    model="claude-haiku-4-5",
    max_tokens=500,
    messages=[
        {"role": "user", "content": user_input}
    ],
    system= 'You are a nutrition assistant. The user will describe what they ate in a day. Extract the foods so each one matches closest with a food from the USDA database and estimate the serving size in grams based on the users description. Respond ONLY with JSON in this format: [{"food": "food name", "serving_size_grams": 100}, {"food": "food name", "serving_size_grams": 200}, etc.] No other text, just the JSON.'
)
    result = json.loads(message.content[0].text)
    return result

