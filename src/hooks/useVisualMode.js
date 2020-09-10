import {useState} from 'react';

export default function useVisualMode(initial) {
  const [history, setHistory] = useState([initial]);
  
  function transition(mode, replace = false) {
    setHistory(prev => {
      if (replace) {
        // replace the last item with this
        return [...prev.slice(0, prev.length - 1), mode];
      } else {
        // add mode to end
        return [...prev, mode];
      }
    });
  };

  function back() {
    if (history.length < 2) return;
    
    //Remove the last element in the array and return the array
    setHistory(prev => [...prev.slice(0, history.length - 1)]);
  };

  return { mode: history[history.length - 1], transition, back };
}
