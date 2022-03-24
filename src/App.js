import React, { useCallback, useState, useRef, useEffect } from 'react'
import useGallerySearch from './useGallerySearch'
import './App.css'
import ArtworkCardList from './ArtworkCardList'
import useIntersect from './useIntersect'

export default function App() {
  const [query, setQuery] = useState('')
  const [page, setPage] = useState(1)
  const { error, loading, artworks } = useGallerySearch(query, 15, page)
  const { setTargetElement } = useIntersect(setPage)

  function handleInputChange(e) {
    setQuery(e.target.value)
  }

  const props = {
    data: artworks,
    setTargetElement,
  }

  return (
    <React.Profiler id={'gallery-photos'} onRender={() => null}>
      <div>
        <input
          placeholder={'Enter the name of your artwork here'}
          type="text"
          value={query}
          onChange={handleInputChange}
          style={{ height: '2rem', width: '20rem' }}
        ></input>
        <ArtworkCardList {...props} />
        {loading && <div>Loading...</div>}
        {error && <div>Error...</div>}
      </div>
    </React.Profiler>
  )
}
