CREATE TABLE workout_log (
    id SERIAL PRIMARY KEY,
    date DATE NOT NULL,
    muscle_group TEXT NOT NULL,
    exercise TEXT NOT NULL,
    sets INTEGER NOT NULL,
    reps INTEGER NOT NULL,
    weight INTEGER NOT NULL
);

CREATE TABLE food_log(
    id SERIAL PRIMARY KEY,
    date DATE NOT NULL,
    food_name TEXT NOT NULL,
    protein NUMERIC NOT NULL,
    carbs NUMERIC NOT NULL,
    fat NUMERIC NOT NULL,
    calories NUMERIC NOT NULL,
    serving_size NUMERIC NOT NULL
);