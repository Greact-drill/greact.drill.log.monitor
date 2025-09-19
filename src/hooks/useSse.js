// frontend/src/hooks/useSse.js
import { useState, useEffect, useRef } from 'react';

const logApiUrl = import.meta.env.VITE_APP_LOG_API_URL;

const useSse = () => {
  const [message, setMessage] = useState(null);
  const eventSourceRef = useRef(null);

  useEffect(() => {
    if (!window.EventSource) {
      console.error('EventSource is not supported in this browser.');
      return;
    }

    eventSourceRef.current = new EventSource(logApiUrl);

    eventSourceRef.current.onmessage = (event) => {
      try {
        const parsedData = JSON.parse(event.data);
        setMessage(parsedData);
      } catch (e) {
        console.error('Failed to parse JSON:', e);
        setMessage({ error: "Failed to parse JSON data", raw: event.data });
      }
    };

    eventSourceRef.current.onopen = () => {
      console.log('SSE connection opened!');
    };

    eventSourceRef.current.onerror = (error) => {
      console.error('SSE error:', error);
    };

    return () => {
      if (eventSourceRef.current) {
        eventSourceRef.current.close();
      }
    };
  }, [logApiUrl]);

  return message;
};

export default useSse;