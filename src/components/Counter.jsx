import React, { useState, useEffect } from 'react'

const Counter = ({ end, startCount }) => {
  const [count, setCount] = useState(0)
  const [isFinished, setIsFinished] = useState(false)

  useEffect(() => {
    if (!startCount) return

    let start = 0
    const duration = 2000
    const increment = end / (duration / 20)

    const timer = setInterval(() => {
      start += increment
      if (start >= end) {
        setCount(end)
        setIsFinished(true)
        clearInterval(timer)
      } else {
        setCount(Math.floor(start))
      }
    }, 20)

    return () => clearInterval(timer)
  }, [startCount, end])

  return (
    <span className={isFinished ? 'counter--complete' : 'counter--counting'}>
      {count}
    </span>
  )
}

export default React.memo(Counter)
