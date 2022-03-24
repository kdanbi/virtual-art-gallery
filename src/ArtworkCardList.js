import React, { useEffect, useState } from 'react'
import ArtworkCard from './ArtworkCard'

export default function ArtworkCardList(props) {
  const { data, setTargetElement } = props

  const [artworks, setArtworks] = useState([])

  useEffect(() => {
    if (artworks) {
      setArtworks([...data])
    }
  }, [data])

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        flexWrap: 'wrap',
      }}
    >
      {artworks.map((art, index) => {
        const props = {
          data: art,
          key: art.image_id,
          setTargetElement,
          index,
          pages: data.length
        }
        return <ArtworkCard {...props} />
      })}
    </div>
  )
}
