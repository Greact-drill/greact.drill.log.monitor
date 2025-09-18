import React, { useState, useEffect, useRef } from 'react';
import useSse from './hooks/useSse';
import LogList from './components/LogList';
import './App.css';

// Устанавливаем лимит логов
const LOG_LIMIT = 500;

function App() {
  const [logs, setLogs] = useState([]);
  const [isClearing, setIsClearing] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [isPaused, setIsPaused] = useState(false);
  const logListRef = useRef(null);
  
  const newLog = useSse();

  useEffect(() => {
    if (newLog && !isPaused) {
      setLogs(prevLogs => {
        const updatedLogs = [...prevLogs, newLog];
        return updatedLogs.slice(-LOG_LIMIT);
      });
    }
  }, [newLog, isPaused]);

  useEffect(() => {
    if (logListRef.current && !isPaused) {
      logListRef.current.scrollTop = logListRef.current.scrollHeight;
    }
  }, [logs, isPaused]);

  const clearLogs = () => {
    setIsClearing(true);
    setTimeout(() => {
      setLogs([]);
      setIsClearing(false);
    }, 500);
  };
  
  const togglePause = () => {
    setIsPaused(prevIsPaused => !prevIsPaused);
  };

  const filteredLogs = logs.filter(log => {
    const logString = JSON.stringify(log).toLowerCase();
    return logString.includes(searchTerm.toLowerCase());
  });

  const exportLogs = () => {
    if (filteredLogs.length === 0) {
      alert("Нет логов для экспорта.");
      return;
    }
    
    // Преобразование отфильтрованных логов в JSON
    const dataStr = JSON.stringify(filteredLogs, null, 2);
    const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);
    
    const exportFileDefaultName = `Drill-Log-Monitor_${new Date().toISOString()}.json`;
    
    const linkElement = document.createElement('a');
    linkElement.setAttribute('href', dataUri);
    linkElement.setAttribute('download', exportFileDefaultName);
    linkElement.click();
    linkElement.remove();
  };

  return (
    <div className="app-container">
      <header>
        <h1>Drill Log Monitor</h1>
        <p>Монитор для анализа сообщений сервиса BUS</p>
        <div className="log-count-container">
          <p className="log-count">
            Отображается: {filteredLogs.length} / Всего: {logs.length}
          </p>
        </div>
      </header>
      
      <div className="sidebar-menu">
        <div className="menu-handle">
          <span className="menu-text">Меню</span>
        </div>
        <div className="menu-content-wrapper">
          <div className="menu-header">
            <h2>Настройки</h2>
          </div>
          <div className="menu-item">
            <button onClick={togglePause} className="pause-button">
              {isPaused ? 'Возобновить' : 'Пауза'}
            </button>
          </div>
          <div className="menu-item">
            <button onClick={clearLogs} className="clear-button">
              Очистить логи
            </button>
          </div>
          <div className="menu-item">
            <button onClick={exportLogs} className="export-button">
              Экспорт логов
            </button>
          </div>
          <div className="menu-item">
            <input
              type="text"
              placeholder="Поиск по логам..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="search-input"
            />
          </div>
        </div>
      </div>
      
      <main>
        <div ref={logListRef} className={`log-list-container ${isClearing ? 'clearing-logs' : ''}`}>
          <LogList logs={filteredLogs} />
        </div>
      </main>
    </div>
  );
}

export default App;