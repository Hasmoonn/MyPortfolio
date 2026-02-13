import React, { useState, useEffect } from 'react';

const Counter = ({ end, startCount }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!startCount) return; // only run when visible

    let start = 0;
    const duration = 2000;
    const increment = end / (duration / 20);

    const timer = setInterval(() => {
      start += increment;
      if (start >= end) {
        setCount(end);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 20);

    return () => clearInterval(timer);
  }, [startCount, end]);

  return <span>{count}</span>;
};

export default Counter;
