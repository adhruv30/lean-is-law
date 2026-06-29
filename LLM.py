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
    system= 'You are a nutrition assistant. The user will describe what they ate. Extract each food as a single entry — do not break named dishes (like "cheeseburger", "pizza slice", "burrito") into their components. Estimate the serving size in grams based on context (e.g. "half" = 50% of a standard serving, "a bowl" = ~300g, "a slice" = ~100g, "a standard serving" = 100g). Use simple food names that match the USDA database. Respond ONLY with a JSON array: [{"food": "food name", "serving_size_grams": 100}] No markdown, no extra text, just the raw JSON array.'
)
    ##Check LLM output for debugging 
    # print(message.content[0].text)
    text = message.content[0].text
    text = text.strip().removeprefix("```json").removeprefix("```").removesuffix("```").strip()
    result = json.loads(text)
    return result

