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


