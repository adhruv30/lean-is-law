import './App.css';
import { useState, useEffect } from 'react';

const colors = {
  bg: '#0A0F1E',
  card: '#111827',
  accent: '#B6FF6A',
  accentBlue: '#60A5FA',
  text: '#F0EDE8',
  muted: '#8892A4',
  border: '#1E2D40',
};

function MacroBar({ protein, carbs, fat }) {
  const total = parseFloat(protein) * 4 + parseFloat(carbs) * 4 + parseFloat(fat) * 9;
  const pPct = total > 0 ? (parseFloat(protein) * 4 / total) * 100 : 33;
  const cPct = total > 0 ? (parseFloat(carbs) * 4 / total) * 100 : 33;
  const fPct = total > 0 ? (parseFloat(fat) * 9 / total) * 100 : 34;

  return (
    <div style={{ marginTop: '10px' }}>
      <div style={{ display: 'flex', height: '3px', borderRadius: '2px', overflow: 'hidden', gap: '2px' }}>
        <div style={{ width: `${pPct}%`, backgroundColor: '#B6FF6A' }} />
        <div style={{ width: `${cPct}%`, backgroundColor: '#60A5FA' }} />
        <div style={{ width: `${fPct}%`, backgroundColor: '#F97316' }} />
      </div>
      <div style={{ display: 'flex', gap: '12px', marginTop: '6px' }}>
        <span style={{ fontSize: '11px', color: colors.muted }}><span style={{ color: '#B6FF6A' }}>●</span> {protein}g P</span>
        <span style={{ fontSize: '11px', color: colors.muted }}><span style={{ color: '#60A5FA' }}>●</span> {carbs}g C</span>
        <span style={{ fontSize: '11px', color: colors.muted }}><span style={{ color: '#F97316' }}>●</span> {fat}g F</span>
      </div>
    </div>
  );
}

function EntryRow({ entry }) {
  const [expanded, setExpanded] = useState(false);

  return (
    <div style={{ borderBottom: `1px solid ${colors.border}` }}>
      <div
        onClick={() => setExpanded(!expanded)}
        style={{ padding: '12px 16px', cursor: 'pointer' }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
          <span style={{ fontSize: '14px', color: colors.text, textTransform: 'capitalize' }}>{entry.food_name}</span>
          <span style={{ fontSize: '14px', fontWeight: '600', color: colors.accent, fontFamily: 'Space Grotesk, sans-serif' }}>{entry.calories} kcal</span>
        </div>
        <MacroBar protein={entry.protein} carbs={entry.carbs} fat={entry.fat} />
      </div>
      {expanded && entry.user_input && (
        <div style={{ padding: '10px 16px 14px', borderTop: `1px solid ${colors.border}`, background: colors.card }}>
          <span style={{ fontSize: '11px', fontWeight: '600', color: colors.muted, textTransform: 'uppercase', letterSpacing: '0.06em' }}>Your prompt</span>
          <p style={{ fontSize: '13px', color: colors.muted, marginTop: '6px', fontStyle: 'italic', lineHeight: '1.5' }}>"{entry.user_input}"</p>
        </div>
      )}
    </div>
  );
}

function DayCard({ date, entries }) {
  const [open, setOpen] = useState(false);
  const totalProtein = entries.reduce((s, e) => s + parseFloat(e.protein), 0).toFixed(1);
  const totalCarbs = entries.reduce((s, e) => s + parseFloat(e.carbs), 0).toFixed(1);
  const totalFat = entries.reduce((s, e) => s + parseFloat(e.fat), 0).toFixed(1);
  const totalCalories = entries.reduce((s, e) => s + parseFloat(e.calories), 0).toFixed(0);

  const formatted = new Date(date).toLocaleDateString('en-US', {
    weekday: 'short', month: 'short', day: 'numeric'
  });

  return (
    <div style={{ border: `1px solid ${colors.border}`, borderRadius: '10px', marginBottom: '10px', overflow: 'hidden' }}>
      <button
        onClick={() => setOpen(!open)}
        style={{
          width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center',
          padding: '14px 16px', background: colors.card, border: 'none', cursor: 'pointer', color: colors.text
        }}
      >
        <div style={{ textAlign: 'left' }}>
          <div style={{ fontSize: '11px', color: colors.muted, marginBottom: '4px', fontFamily: 'Inter, sans-serif' }}>{formatted}</div>
          <div style={{ display: 'flex', gap: '12px', alignItems: 'baseline' }}>
            <span style={{ fontSize: '20px', fontWeight: '700', color: colors.accent, fontFamily: 'Space Grotesk, sans-serif' }}>
              {totalCalories}<span style={{ fontSize: '11px', color: colors.muted, fontWeight: '400' }}> kcal</span>
            </span>
            <span style={{ fontSize: '16px', fontWeight: '600', color: colors.accentBlue, fontFamily: 'Space Grotesk, sans-serif' }}>
              {totalProtein}<span style={{ fontSize: '11px', color: colors.muted, fontWeight: '400' }}> g protein</span>
            </span>
          </div>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <span style={{ fontSize: '11px', color: colors.muted }}>{entries.length} {entries.length === 1 ? 'item' : 'items'}</span>
          <span style={{ color: colors.muted, fontSize: '16px', display: 'inline-block', transform: open ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s' }}>▾</span>
        </div>
      </button>

      {open && (
        <div style={{ background: colors.bg, borderTop: `1px solid ${colors.border}` }}>
          {entries.map(entry => (
            <EntryRow key={entry.id} entry={entry} />
          ))}
          <div style={{ padding: '12px 16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontSize: '12px', fontWeight: '600', color: colors.muted, textTransform: 'uppercase', letterSpacing: '0.06em' }}>Total</span>
            <div style={{ textAlign: 'right' }}>
              <span style={{ fontSize: '18px', fontWeight: '700', color: colors.accent, fontFamily: 'Space Grotesk, sans-serif' }}>{totalCalories} kcal</span>
              <span style={{ fontSize: '13px', color: colors.muted, marginLeft: '10px' }}>{totalProtein}g P · {totalCarbs}g C · {totalFat}g F</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default function App() {
  const [foodQuery, setFoodQuery] = useState('');
  const [result, setResult] = useState(null);
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetch('/food-log').then(r => r.json()).then(setHistory);
  }, []);

  const handleSubmit = async () => {
    if (!foodQuery.trim()) return;
    setLoading(true);
    const response = await fetch('/log-food', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ food: foodQuery })
    });
    const data = await response.json();
    setLoading(false);
    if (data.error) { alert('Food not found. Try a more specific search.'); return; }
    setResult(data);
    setFoodQuery('');
    fetch('/food-log').then(r => r.json()).then(setHistory);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  const grouped = history.reduce((groups, entry) => {
    const d = entry.date;
    if (!groups[d]) groups[d] = [];
    groups[d].push(entry);
    return groups;
  }, {});

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&family=Space+Grotesk:wght@500;700&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        body { background: #0A0F1E; overflow: hidden; }
        textarea::placeholder { color: #8892A4; }
        textarea:focus { outline: none; border-color: #B6FF6A !important; }
        ::-webkit-scrollbar { width: 4px; }
        ::-webkit-scrollbar-track { background: #0A0F1E; }
        ::-webkit-scrollbar-thumb { background: #1E2D40; border-radius: 2px; }
      `}</style>

      <div style={{ height: '100vh', background: colors.bg, color: colors.text, fontFamily: 'Inter, sans-serif', display: 'flex' }}>

        {/* Left Panel — 35% */}
        <div style={{
          width: '35%', height: '100vh', padding: '48px 40px',
          borderRight: `1px solid ${colors.border}`,
          display: 'flex', flexDirection: 'column', justifyContent: 'center'
        }}>
          <div>
            <h1 style={{ fontFamily: 'Space Grotesk, sans-serif', fontSize: '34px', fontWeight: '700', letterSpacing: '-0.5px', marginBottom: '8px', color: colors.text }}>
              Lean is <span style={{ color: colors.accent }}>Law</span>
            </h1>
            <p style={{ color: colors.muted, fontSize: '14px', marginBottom: '40px', lineHeight: '1.5' }}>
              You handle the diet. I handle the numbers.
            </p>

            <label style={{ fontSize: '12px', fontWeight: '600', color: colors.muted, textTransform: 'uppercase', letterSpacing: '0.08em', display: 'block', marginBottom: '10px' }}>
              What did you eat?
            </label>
            <textarea
              value={foodQuery}
              onChange={e => setFoodQuery(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder={"e.g. two scrambled eggs and toast\nPress Enter to log"}
              rows={3}
              style={{
                width: '100%', padding: '14px 16px', fontSize: '14px',
                background: colors.card, border: `1px solid ${colors.border}`,
                borderRadius: '10px', color: colors.text, resize: 'none',
                fontFamily: 'Inter, sans-serif', lineHeight: '1.5', marginBottom: '12px',
                transition: 'border-color 0.2s'
              }}
            />
            <button
              onClick={handleSubmit}
              disabled={loading}
              style={{
                width: '100%', padding: '14px', fontSize: '15px', fontWeight: '700',
                backgroundColor: loading ? colors.border : colors.accent,
                color: loading ? colors.muted : '#0A0F1E',
                border: 'none', borderRadius: '10px', cursor: loading ? 'default' : 'pointer',
                fontFamily: 'Space Grotesk, sans-serif', transition: 'background 0.2s', letterSpacing: '0.02em'
              }}
            >
              {loading ? 'Logging...' : 'Log'}
            </button>

            {result && result.length > 0 && (
              <div style={{ marginTop: '28px', border: `1px solid ${colors.border}`, borderRadius: '10px', overflow: 'hidden' }}>
                <div style={{ padding: '10px 16px', background: colors.card, borderBottom: `1px solid ${colors.border}` }}>
                  <span style={{ fontSize: '11px', fontWeight: '600', color: colors.accent, textTransform: 'uppercase', letterSpacing: '0.08em' }}>Just logged</span>
                </div>
                {result.map((item, i) => (
                  <div key={i} style={{ padding: '12px 16px', borderBottom: i < result.length - 1 ? `1px solid ${colors.border}` : 'none', background: colors.bg }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                      <span style={{ fontSize: '14px', color: colors.text, textTransform: 'capitalize' }}>{item.food}</span>
                      <span style={{ fontSize: '14px', fontWeight: '700', color: colors.accent, fontFamily: 'Space Grotesk, sans-serif' }}>{item.calories} kcal</span>
                    </div>
                    <MacroBar protein={item.protein} carbs={item.carbs} fat={item.fat} />
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Right Panel — 65% */}
        <div style={{ width: '65%', height: '100vh', padding: '48px 48px', overflowY: 'auto' }}>
          <h2 style={{ fontSize: '13px', fontWeight: '600', color: colors.muted, textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '20px' }}>
            History
          </h2>

          {Object.keys(grouped).length === 0 ? (
            <div style={{ textAlign: 'center', marginTop: '80px' }}>
              <p style={{ color: colors.muted, fontSize: '14px' }}>No entries yet. Log your first meal.</p>
            </div>
          ) : (
            Object.entries(grouped).reverse().map(([date, entries]) => (
              <DayCard key={date} date={date} entries={entries} />
            ))
          )}
        </div>

      </div>
    </>
  );
}