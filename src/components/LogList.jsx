import React from 'react';
import LogLine from './LogLine';

function LogList({ logs }) {
  return (
    <>
      {logs.map((log, index) => (
        <LogLine 
          key={log.id || index}
          log={log} 
          isNew={index === logs.length - 1}
        />
      ))}
    </>
  );
}

export default LogList;