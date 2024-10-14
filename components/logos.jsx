"use client"
import './globals.css'
import { useState, useEffect } from 'react'

import HackCambridgeFoundationLogo from './HCF_banner'
import { HackCambridge2016LogoSmall, HackCambridge2016LogoLarge } from './HC_2016'
import { HackCambridge2017LogoSmall, HackCambridge2017LogoLarge } from './HC_2017'
import { HackCambridge2018LogoSmall, HackCambridge2018LogoLarge } from './HC_2018'
import { HackCambridge2019LogoSmall, HackCambridge2019LogoLarge } from './HC_2019'
import { HackCambridge2020LogoSmall, HackCambridge2020LogoLarge } from './HC_2020'
import { HackCambridge2021LogoSmall, HackCambridge2021LogoLarge } from './HC_2021'
import { HackCambridge2022LogoSmall, HackCambridge2022LogoLarge } from './HC_2022'
import { HackCambridge2023LogoSmall, HackCambridge2023LogoLarge } from './HC_2023'

export default function HackCambridgeLogos() {
  const hackathonTime = 1000 // Time for each hackathon logo (must match CSS animation time 'tailwind.config.ts')
  const foundationTime = 3000 // Time for foundation logo
  const hackathonCount = 8 // Total number of hackathons
  const [currentLogo, setLogo] = useState(0)
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    const hackathonLogos = setInterval(() => {
      setLogo(currentLogo + 1)
    }, hackathonTime)

    if (currentLogo === hackathonCount) {
      clearInterval(hackathonLogos)
      setTimeout(() => {
        setLoaded(true)
      }, foundationTime)
    }
  }, [currentLogo])

  if (loaded) {
    return null
  }

  switch (currentLogo) {
    case 0:
      return (
        <div className="flex flex-col items-center justify-center min-h-screen">
          <span>
            <HackCambridge2016LogoSmall loaded={loaded} />
            <HackCambridge2016LogoLarge loaded={loaded} />
          </span>
        </div>
      )
    case 1:
      return (
        <div className="flex flex-col items-center justify-center min-h-screen">
          <span>
            <HackCambridge2017LogoSmall loaded={loaded} />
            <HackCambridge2017LogoLarge loaded={loaded} />
          </span>
        </div>
      )
    case 2:
      return (
        <div className="flex flex-col items-center justify-center min-h-screen">
          <span>
            <HackCambridge2018LogoSmall loaded={loaded} />
            <HackCambridge2018LogoLarge loaded={loaded} />
          </span>
        </div>
      )
    case 3:
      return (
        <div className="flex flex-col items-center justify-center min-h-screen">
          <span>
            <HackCambridge2019LogoSmall loaded={loaded} />
            <HackCambridge2019LogoLarge loaded={loaded} />
          </span>
        </div>
      )
    case 4:
      return (
        <div className="flex flex-col items-center justify-center min-h-screen">
          <span>
            <HackCambridge2020LogoSmall loaded={loaded} />
            <HackCambridge2020LogoLarge loaded={loaded} />
          </span>
        </div>
      )
    case 5:
      return (
        <div className="flex flex-col items-center justify-center min-h-screen">
          <span>
            <HackCambridge2021LogoSmall loaded={loaded} />
            <HackCambridge2021LogoLarge loaded={loaded} />
          </span>
        </div>
      )
    case 6:
      return (
        <div className="flex flex-col items-center justify-center min-h-screen">
          <span>
            <HackCambridge2022LogoSmall loaded={loaded} />
            <HackCambridge2022LogoLarge loaded={loaded} />
          </span>
        </div>
      )
    case 7:
      return (
        <div className="flex flex-col items-center justify-center min-h-screen">
          <span>
            <HackCambridge2023LogoSmall loaded={loaded} />
            <HackCambridge2023LogoLarge loaded={loaded} />
          </span>
        </div>
      )
    case 8: // Foundation logo
      return (
        <div className="flex flex-col items-center justify-center min-h-screen">
          <span>
            <HackCambridgeFoundationLogo loaded={loaded} />
          </span>
        </div>
      )
  }
}
