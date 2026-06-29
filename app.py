from flask import Flask, request, jsonify
from flask_cors import CORS
from search import food_search
from db import insert_food_log
from db import get_food_log
from datetime import date
from LLM import parse_food_input
app = Flask(__name__)
CORS(app)

@app.route('/log-food', methods=['POST'])
def log_food():
    data = request.get_json()
    food_query = data["food"]
    foods = parse_food_input(food_query)
    results = []
    for food in foods:
        result = food_search(food["food"], food["serving_size_grams"])
        if result is None:
            continue
        insert_food_log(result["date"], result["food"], result["protein"], result["carbs"], result["fat"], result["calories"], result["serving_size"])
        results.append(result)
    return jsonify(results)

@app.route('/food-log', methods=['GET'])
def food_log_history():
    result = get_food_log()
    return jsonify(result)
    


if __name__ == '__main__':
    app.run(debug=True)