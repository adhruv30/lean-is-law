import './App.css';
import { useState, useEffect } from 'react';

function App() {
  const [foodQuery, setFoodQuery] = useState('');
  const [result, setResult] = useState(null);
  const [history, setHistory] = useState([]);

  useEffect(() => {
    fetch('/food-log')
      .then(res => res.json())
      .then(data => setHistory(data));
  }, []);

  const handleSubmit = async () => {
    const response = await fetch('/log-food', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ food: foodQuery })
    });
    const data = await response.json();
    if (data.error) {
      alert('Food not found. Try a more specific search.');
      return;
    }
    setResult(data);
    fetch('/food-log')
      .then(res => res.json())
      .then(data => setHistory(data));
  };

  const formatDate = (dateStr) => {
    return new Date(dateStr).toLocaleDateString('en-US', { weekday: 'short', year: 'numeric', month: 'short', day: 'numeric' });
  };

  return (
    <div style={{ maxWidth: '600px', margin: '40px auto', fontFamily: 'sans-serif', padding: '0 20px' }}>
      <h1 style={{ fontSize: '24px', marginBottom: '20px' }}>lean-is-law</h1>

      <div style={{ display: 'flex', gap: '10px', marginBottom: '30px' }}>
        <input
          type="text"
          value={foodQuery}
          onChange={(e) => setFoodQuery(e.target.value)}
          placeholder="What did you eat?"
          style={{ flex: 1, padding: '10px', fontSize: '16px', border: '1px solid #ddd', borderRadius: '4px' }}
        />
        <button
          onClick={handleSubmit}
          style={{ padding: '10px 20px', fontSize: '16px', backgroundColor: '#000', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
        >
          Log
        </button>
      </div>

      {result && result.length > 0 && (
        <div style={{ border: '1px solid #eee', borderRadius: '8px', padding: '20px', marginBottom: '30px' }}>
          <h2 style={{ fontSize: '18px', marginBottom: '15px' }}>Just logged</h2>
          {result.map((item, index) => (
            <div key={index} style={{ marginBottom: '15px' }}>
              <p style={{ fontWeight: 'bold', marginBottom: '8px' }}>{item.food}</p>
              <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                <tbody>
                  {[['Protein', item.protein, 'g'], ['Carbs', item.carbs, 'g'], ['Fat', item.fat, 'g'], ['Calories', item.calories, 'kcal']].map(([label, value, unit]) => (
                    <tr key={label} style={{ borderBottom: '1px solid #f0f0f0' }}>
                      <td style={{ padding: '6px 0', color: '#666' }}>{label}</td>
                      <td style={{ padding: '6px 0', textAlign: 'right', fontWeight: 'bold' }}>{value} {unit}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ))}
        </div>
      )}

      {history.length > 0 && (
        <div style={{ marginTop: '20px' }}>
          <h2 style={{ fontSize: '18px', marginBottom: '20px' }}>Food Log</h2>
          {Object.entries(
            history.reduce((groups, entry) => {
              const date = entry.date;
              if (!groups[date]) groups[date] = [];
              groups[date].push(entry);
              return groups;
            }, {})
          ).map(([date, entries]) => {
            const totalProtein = entries.reduce((sum, e) => sum + parseFloat(e.protein), 0).toFixed(1);
            const totalCarbs = entries.reduce((sum, e) => sum + parseFloat(e.carbs), 0).toFixed(1);
            const totalFat = entries.reduce((sum, e) => sum + parseFloat(e.fat), 0).toFixed(1);
            const totalCalories = entries.reduce((sum, e) => sum + parseFloat(e.calories), 0).toFixed(0);
            return (
              <div key={date} style={{ marginBottom: '30px', border: '1px solid #eee', borderRadius: '8px', padding: '20px' }}>
                <h3 style={{ fontSize: '16px', marginBottom: '15px', color: '#666' }}>{formatDate(date)}</h3>
                {entries.map(entry => (
                  <div key={entry.id} style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 0', borderBottom: '1px solid #f0f0f0' }}>
                    <span>{entry.food_name}</span>
                    <span style={{ color: '#666', fontSize: '14px' }}>{entry.protein}g P · {entry.carbs}g C · {entry.fat}g F · {entry.calories} kcal</span>
                  </div>
                ))}
                <div style={{ marginTop: '15px', display: 'flex', justifyContent: 'space-between', fontWeight: 'bold' }}>
                  <span>Daily Total</span>
                  <span style={{ fontSize: '14px' }}>{totalProtein}g P · {totalCarbs}g C · {totalFat}g F · {totalCalories} kcal</span>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default App;