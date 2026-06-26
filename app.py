from flask import Flask, request, jsonify
from search import food_search
from db import insert_food_log
from datetime import date
app = Flask(__name__)

@app.route('/log-food', methods=['POST'])
def log_food():
    data = request.get_json()
    food_query = data["food"]
    result = food_search(food_query)
    insert_food_log(result["date"], result["food"], result["protein"], result["carbs"], result["fat"], result["calories"], result["serving_size"] )
    return jsonify(result)

if __name__ == '__main__':
    app.run(debug=True)