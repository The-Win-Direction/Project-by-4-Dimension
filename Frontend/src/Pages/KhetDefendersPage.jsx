import React, { useState, useEffect, useRef } from 'react';
import './GameStyles.css';
import Header from '../Components/Header'
const SPRAY_MAX = 100;
const REFILL_RATE = 0.5;
const SPRAY_DRAIN = 2;
const ENEMY_TYPES = {
  caterpillar: { emoji: '🐛', speed: 0.3, hp: 100 },
  fly: { emoji: '🪰', speed: 0.7, hp: 40 },
  beetle: { emoji: '🐞', speed: 0.5, hp: 60, multiply: true },
};

export default function KhetDefendersPage() {
  const [crops, setCrops] = useState(
    Array.from({ length: 5 }, (_, i) => ({ id: i, hp: 100, alive: true, x: 200 + i * 100, y: 400 }))
  );
  const [insects, setInsects] = useState([]);
  const [sprayAmount, setSprayAmount] = useState(SPRAY_MAX);
  const [isSpraying, setIsSpraying] = useState(false);
  const [score, setScore] = useState(0);
  const [wave, setWave] = useState(1);
  const svgRef = useRef(null);
  const [cursorPos, setCursorPos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const interval = setInterval(() => {
      setInsects(prev =>
        prev
          .map(ins => {
            const crop = crops[ins.targetCrop];
            if (!crop || !crop.alive) return ins;
            const dx = crop.x - ins.x;
            const dy = crop.y - ins.y;
            const dist = Math.sqrt(dx * dx + dy * dy);
            const nx = dx / dist;
            const ny = dy / dist;
            return {
              ...ins,
              x: ins.x + nx * ins.speed * 5,
              y: ins.y + ny * ins.speed * 5,
            };
          })
          .filter(ins => {
            const crop = crops[ins.targetCrop];
            if (!crop || !crop.alive) return true;
            if (Math.abs(ins.x - crop.x) < 20 && Math.abs(ins.y - crop.y) < 20) {
              crop.hp -= 5;
              if (crop.hp <= 0) crop.alive = false;
              return false;
            }
            return true;
          })
      );
    }, 100);
    return () => clearInterval(interval);
  }, [crops]);

  useEffect(() => {
    const spawn = setInterval(() => {
      const newEnemies = [];
      for (let i = 0; i < wave + 2; i++) {
        const types = Object.keys(ENEMY_TYPES);
        const type = types[Math.floor(Math.random() * types.length)];
        const cropIndex = Math.floor(Math.random() * crops.length);
        const { emoji, speed, hp } = ENEMY_TYPES[type];
        newEnemies.push({
          id: Date.now() + Math.random(),
          type,
          x: Math.random() * 700,
          y: 20,
          speed,
          hp,
          emoji,
          targetCrop: cropIndex,
        });
      }
      setInsects(prev => [...prev, ...newEnemies]);
    }, 4000);
    return () => clearInterval(spawn);
  }, [wave, crops]);

  useEffect(() => {
    const gameLoop = setInterval(() => {
      if (isSpraying && sprayAmount > 0) {
        setSprayAmount(prev => Math.max(0, prev - SPRAY_DRAIN));
        setInsects(prev =>
          prev
            .map(ins => {
              const dx = cursorPos.x - ins.x;
              const dy = cursorPos.y - ins.y;
              if (dx * dx + dy * dy < 900) {
                ins.hp -= 5;
                if (ins.hp <= 0) setScore(s => s + 10);
              }
              return ins;
            })
            .filter(ins => ins.hp > 0)
        );
      } else {
        setSprayAmount(prev => Math.min(SPRAY_MAX, prev + REFILL_RATE));
      }
    }, 50);
    return () => clearInterval(gameLoop);
  }, [isSpraying, cursorPos]);

  const handleMouseMove = e => {
    const svg = svgRef.current;
    if (svg) {
      const rect = svg.getBoundingClientRect();
      setCursorPos({ x: e.clientX - rect.left, y: e.clientY - rect.top });
    }
  };

  const handleMouseDown = () => setIsSpraying(true);
  const handleMouseUp = () => setIsSpraying(false);

  return (
    <div><Header />
      <div className="defender-container">
        <h1>🌾 Crop Defender: Insect Siege</h1>
        <div className="stats">
          🌿 Spray: {Math.floor(sprayAmount)} | 🐜 Insects: {insects.length} | 🧠 Score: {score} | 🌊 Wave: {wave}
          <button onClick={() => setWave(w => w + 1)}>🚀 Next Wave</button>
        </div>
        <svg
          ref={svgRef}
          className="field"
          width="800"
          height="600"
          onMouseMove={handleMouseMove}
          onMouseDown={handleMouseDown}
          onMouseUp={handleMouseUp}
        >
          {crops.map(crop =>
            crop.alive ? (
              <g key={crop.id}>
                <text x={crop.x} y={crop.y + 20} fontSize="24">🌽</text>
                <text x={crop.x} y={crop.y - 10} className="health">{crop.hp}</text>
              </g>
            ) : null
          )}
          {insects.map(ins => (
            <g key={ins.id}>
              <text x={ins.x} y={ins.y} fontSize="24">{ins.emoji}</text>
              <text x={ins.x} y={ins.y - 10} className="health">{ins.hp}</text>
            </g>
          ))}
          {isSpraying && (
            <circle
              cx={cursorPos.x}
              cy={cursorPos.y}
              r="20"
              fill="rgba(100, 200, 255, 0.4)"
              className="spray"
            />
          )}
        </svg>
      </div></div>
  );
}
