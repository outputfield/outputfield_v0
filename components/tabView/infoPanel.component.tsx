import React, { useState } from 'react'
import { ArtistWithUser, Inviter } from '../../pages/api/artists/[name]'
import { Button } from '../Button'
import Contact from '../artists/contact'
import Image from 'next/image'

interface Props {
  artist: ArtistWithUser;
  inviter: Inviter,
  className?: string;
  includeContact?: boolean;
}

const InfoPanel: React.FC<Props> = ({
  artist,
  inviter,
  className,
  includeContact = true,
}) => {
  const [contactOpen, setContactOpen] = useState(false)
  const closeContact = () => setContactOpen(false)

  return (
    <div className='relative flex justify-center h-fit'>
      <div id="shadowBlur" className='glow-red-outer mx-auto z-0 absolute w-full top-0 bottom-0 left-0 right-0'/>
      <div
        className={`${className} z-50 top-0 w-11/12 min-h->184 grid text-base p-3 my-3 glow-red-inner`}
        id="infoPanel">
        {contactOpen ? <Contact artistData={artist} onClose={closeContact}/> : (
          <>
            <div
              id="bio"
              className="mt-5 ml-4 mr-3 mb-8 border-box whitespace-pre-wrap uppercase">
              {artist?.bio}
            </div>

            <div
              id="mediums"
              className="relative uppercase inline-block h-36 w-9/12 mb-16 mx-auto content-box ">
              <Image src="/dashedCircle.svg" alt="" width="160" height="160" className="absolute ml-4" />
              <div className="flex flex-col justify-between mt-4 h-full">
                {artist?.mediums.length !== 0 && (
                  <div className="relative">
                    <b>Mediums:</b>
                    <br />
                    {artist?.mediums.map(({ mediumName }) => mediumName).join(', ')}
                  </div>
                )}
                {artist?.mediumsOfInterest.length !== 0 && (
                  <div className="relative self-end">
                    <b>Mediums Of Interest:</b>
                    <br />
                    {artist?.mediumsOfInterest.map(({ mediumName }) => mediumName).join(', ')}
                  </div>
                )}
              </div>
            </div>

            <div id="artistLinks" className="relative mb-24 h-32">
              <Image src="/dashedEllipses4.svg" alt="" width="78" height="209" className="absolute" />
              <div className="absolute flex flex-col space-y-4 mt-4 ml-4">
                {artist?.links.filter(({ type }) => type !== 'WORK').map(({ title, url }) => (
                  <a
                    key={url}
                    href={url}
                    target="_blank"
                    rel="noreferrer"
                    className="uppercase flex space-x-2 items-center">
                    <span>{title}</span>
                    <Image src="/externalLinkIcon.svg" alt="external link" width="26" height="26" />
                  </a>
                ))}
              </div>
            </div>
            {
              inviter && Object.keys(inviter).length !== 0 && (
                <div id="artistReference" className={'flex justify-end relative w-full h-20 mb-20'}>
                  <Image src="/dashedEllipses2.svg" alt="" width="111" height="111" className="absolute" />
                  <div className="absolute uppercase mt-2 mr-8">
                  Referred By:
                    <br />
                    <a
                      className="underline glow-highlight"
                      href={'/artists/'+inviter.handle}
                    >
                      {inviter.user.name}
                    </a>
                  </div>
                </div>
              )
            }
            {includeContact && (
              <Button onClick={() => setContactOpen(true)}>contact</Button>
            )}
          </>
        )}
      </div>
    </div>

  )
}

export default InfoPanel
