import './App.css';
import { useState } from 'react';

function App() {
  const [foodQuery, setFoodQuery] = useState('');
  const [result, setResult] = useState(null);
  const handleSubmit = async () => {
  const response = await fetch('/log-food', {    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ food: foodQuery })
  });
  const data = await response.json();
  setResult(data);
};
  return (
    <div>
      <h1>Fitness and Nutrition Tracker</h1>
      <input 
      type = "text"
      value={foodQuery}
      onChange={(e) => setFoodQuery(e.target.value)}
      />
      <button onClick={handleSubmit}>Log Food</button>
      {result && (
      <div>
        <p>Food: {result.food}</p>
        <p>Protein: {result.protein}</p>
        <p>Carbs: {result.carbs}</p>
        <p>Fat: {result.fat}</p>
        <p>Calories: {result.calories}</p>
      </div>
    )}
    </div>
    
  );
}

export default App;
