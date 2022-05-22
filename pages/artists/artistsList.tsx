import React, { useState, useRef } from 'react'

import { ArtistRow } from '../../components/artists/artistRow.component'
import { ArtistsWithWorksAndLinks } from '../api/artists'

interface Props {
  artists: ArtistsWithWorksAndLinks;
  fetchMore: () => any;
  isLoadingMore: boolean;
  isReachingEnd: boolean;
}

const ArtistsList: React.FC<Props> = ({
  artists,
  fetchMore, 
  isLoadingMore,
  isReachingEnd
}) => {
  const [lockScroll, setLockScroll] = useState(false)
  const listInnerRef = useRef<HTMLDivElement>(null)

  const onScroll = () => {
    if (listInnerRef.current) {
      console.log(listInnerRef.current)
      const { scrollTop, scrollHeight, clientHeight } = listInnerRef.current
      const isBottom = Math.floor(scrollTop + clientHeight) === scrollHeight
      const isTop = scrollTop === 0
      if (isBottom && !isReachingEnd) {
        fetchMore()
      }
      if (isTop) {
        setLockScroll(!lockScroll)
      }
    }
  }
  return (
    <div onScroll={onScroll} ref={listInnerRef} className={`max-h-screen ${lockScroll ? 'max-h-max' : 'overflow-auto'}`}>
      {artists?.map((artist) => (
        <ArtistRow
          key={artist.handle}
          artist={artist}
          type="list"
          className="group"
        />
      )
      )}
      <button
        disabled={isLoadingMore || isReachingEnd}
        onClick={fetchMore} className="w-full text-center border-t border-dashed uppercase py-2">
        {isLoadingMore
          ? 'Loading...'
          : isReachingEnd
            ? 'End'
            : ''}
      </button>
    </div>
  )
}

export default ArtistsList