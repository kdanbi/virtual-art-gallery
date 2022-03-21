import axios from 'axios'
import React, { useEffect, useState } from 'react'

export default function useGallerySearch(query, pageLimit, pageNum) {
  const [artworks, setArtworks] = useState([])
  const [error, setError] = useState(false)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    setArtworks([])
  }, [query])

  useEffect(() => {
    let cancel
    setLoading(true)
    axios({
      method: 'GET',
      url: 'https://api.artic.edu/api/v1/artworks/search?&fields=id,title,image_id',
      params: {
        q: query,
        limit: pageLimit,
        page: pageNum,
      },
      cancelToken: new axios.CancelToken((token) => (cancel = token)),
    })
      .then((response) => {
        setArtworks((prev) => [
          ...prev,
          ...response.data.data
            .map((art) => {
              const { image_id, title } = art
              return { image_id, title }
            })
            .filter((art) => art.image_id !== null),
        ])
        setLoading(false)
      })
      .catch((error) => {
        if (axios.isCancel(error)) return
        setError(error)
      })

    return () => cancel()
  }, [query, pageLimit, pageNum])
  return { loading, error, artworks }
}
