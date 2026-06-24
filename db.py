import psycopg2

from dotenv import load_dotenv
import os
load_dotenv()
name = os.getenv("DB_NAME")
host = os.getenv("DB_HOST")
user = os.getenv("DB_USER")
connection = psycopg2.connect(dbname=name, host=host, user=user)
##print("connected successfully")
cursor = connection.cursor()
sql = "INSERT INTO food_log (date, food_name, protein, carbs, fat, calories, serving_size) VALUES ('2026-06-22', 'chicken breast', 20.4, 6.7, 3.2, 130, 4.1)"
cursor.execute(sql)
connection.commit()
cursor.execute("SELECT * FROM food_log")
rows = cursor.fetchall()
print(rows)