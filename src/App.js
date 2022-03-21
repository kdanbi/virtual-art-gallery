import React, { useCallback, useState, useRef } from 'react'
import useGallerySearch from './useGallerySearch'

export default function App() {
  const [query, setQuery] = useState('')
  const [page, setPage] = useState(1)
  const { error, loading, artworks } = useGallerySearch(query, 15, page)

  // Infinite Scroll
  const observer = useRef()
  const lastArtworkElementRef = useCallback((element) => {
    if (loading) return
    if (observer.current) observer.current.disconnect()
    observer.current = new IntersectionObserver(
      (entries) => {
        console.log(entries)
        if (entries[0].isIntersecting) {
          setPage((prev) => prev + 1)
        }
      },
      [loading]
    )
    if (element) observer.current.observe(element)
  })

  const isLastItem = (index) => {
    if (artworks.length === index + 1) return true
    return false
  }

  function handleInputChange(e) {
    setQuery(e.target.value)
  }

  return (
    <div>
      <input type="text" value={query} onChange={handleInputChange}></input>
      <div style={{ display: 'flex', flexWrap: 'wrap' }}>
        {artworks.map((art, index) => (
          <div {...(isLastItem ? { ref: lastArtworkElementRef } : {})}>
            <img
              src={`https://www.artic.edu/iiif/2/${art.image_id}/full/300,/0/default.jpg`}
            />
            <p style={{ fontSize: '10px', width: '100%' }}>{art.title}</p>
          </div>
        ))}
      </div>
      {loading && <div>Loading...</div>}
      {error && <div>Error...</div>}
    </div>
  )
}
