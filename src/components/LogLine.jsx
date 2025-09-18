import React, { useEffect, useRef } from 'react';
import ReactJson from 'react-json-view';

function LogLine({ log, isNew }) {

  const logEntryRef = useRef(null);

  useEffect(() => {
    if (isNew && logEntryRef.current) {
      // Add the animation class when the component mounts and `isNew` is true
      logEntryRef.current.classList.add('log-entry-new');
      
      // Optional: remove the class after the animation finishes
      // to allow future re-animations if the same log is updated
      const animationTimeout = setTimeout(() => {
        if (logEntryRef.current) {
          logEntryRef.current.classList.remove('log-entry-new');
        }
      }, 500); // 500ms matches your animation duration
      
      return () => clearTimeout(animationTimeout);
    }
  }, [isNew]);

  const isJson = typeof log === 'object' && log !== null;
  const logTime = isJson && log.at ? new Date(log.at).toLocaleTimeString() : null;
  const logStatus = isJson && log.status ? log.status : 'default';

  return (
    <div ref={logEntryRef} className={`log-entry status-${logStatus}`}>
      <div className="log-header">
        {logTime && <span className="log-timestamp">{logTime}</span>}
        <div className="log-divider"></div>
      </div>
      {isJson ? (
        <ReactJson 
          src={log}
          theme="monokai"
          collapsed={1}
          displayDataTypes={false}
          displayObjectSize={false}
          name={false}
        />
      ) : (
        log
      )}
    </div>
  );
}

export default LogLine;