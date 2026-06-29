import psycopg2

from dotenv import load_dotenv
import os
load_dotenv()
name = os.getenv("DB_NAME")
host = os.getenv("DB_HOST")
user = os.getenv("DB_USER")

def insert_food_log (date, food_name, protein, carbs, fat, calories, serving_size):
    connection = psycopg2.connect(dbname=name, host=host, user=user)
    cursor = connection.cursor()
    sql = "INSERT INTO food_log (date, food_name, protein, carbs, fat, calories, serving_size) VALUES (%s, %s, %s, %s, %s, %s, %s)"
    cursor.execute(sql, (date, food_name, protein, carbs, fat, calories, serving_size))
    connection.commit()

def get_food_log():
    connection = psycopg2.connect(dbname=name, host=host, user=user)
    cursor = connection.cursor()
    sql = "SELECT * FROM food_log"
    cursor.execute(sql)
    rows = cursor.fetchall()
    result = []
    for row in rows:
        result.append({
            "id": row[0],
            "date": row[1],
            "food_name": row[2],
            "protein": row[3], 
            "carbs": row[4],
            "fat": row[5],
            "calories": row[6],
            "serving_size": row[7]
        })
    return result

