import React, { useEffect, useRef, useState } from 'react'

export default function ArtworkCard(props) {
  const { data, setTargetElement, index, pages } = props
  const { image_id } = data
  const lastPageElementRef = useRef()
  const imageLink = (image_id) =>
    `https://www.artic.edu/iiif/2/${image_id}/full/300,/0/default.jpg`

  const getRef = (index) => {
    if (pages === index + 1) return lastPageElementRef
    return null
  }

  useEffect(() => {
    setTargetElement(lastPageElementRef.current)
  }, [pages, lastPageElementRef])

  return (
    <div className="artwork-card" ref={getRef(index)}>
      <img
        style={{
          height: '17rem',
          width: '17rem',
          objectFit: 'cover',
        }}
        src={imageLink(image_id)}
      />
    </div>
  )
}
