import { useEffect, useRef, useState } from 'react'

export default function useIntersect(setPage) {
  const [targetElement, setTargetElement] = useState(null)

  const observer = useRef(null)

  useEffect(() => {
    if (observer.current) observer.current.disconnect()

    observer.current = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        setPage((prev) => prev + 1)
      }
    })

    const { current: currentObserver } = observer

    if (targetElement) currentObserver.observe(targetElement)

    return () => currentObserver.disconnect()
  }, [targetElement])

  return { setTargetElement }
}
