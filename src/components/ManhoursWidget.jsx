import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'

function ManhoursWidget() {
  const widgetRef = useRef(null)
  const [frameIndex, setFrameIndex] = useState(0)

  // Walking man ASCII art frames
  const walkingFrames = [
    `    .001.^
    u$ON=1
    Z00BAI
    1..=~.
    ;s<'''
    NRX~=-
    z0c^<X^
    "B0s~^
    @@$H~'
    n$0=XN;.
    ¡BBB0vU1=~'
    $000cRr"vul
    FAHZuqr-'
    ZZUFA@FI.
    ;BRHv n$U^-
    ARN1  @si
    'Onv~ 01.'
    c0qr  rs.
    aUU   ul
    RO-   :.
    nn~   -=.
    =1^   ..`,
    `    .001.^
    u$ON=1
    Z00BAI
    1..=~.
    ;s<'''
    NRX~=-
    z0c^<X^
    "B0s~^
    @@$H~'
    n$0=XN;.
    ¡BBB0vU1=~'
    $000cRr"vul
    FAHZuqr-'
    ZZUFA@FI.
    ;BRHv n$U^-
      ARN1  @si
      'Onv~ 01.'
      c0qr  rs.
      aUU   ul
      RO-   :.
      nn~   -=.
      =1^   ..`
  ]

  useEffect(() => {
    if (widgetRef.current) {
      gsap.fromTo(widgetRef.current,
        { opacity: 0, scale: 0.9 },
        {
          opacity: 1,
          scale: 1,
          duration: 0.5,
          ease: 'back.out(1.7)',
          delay: 0.4
        }
      )
    }

    // Animate walking man
    const walkInterval = setInterval(() => {
      setFrameIndex((prev) => (prev + 1) % walkingFrames.length)
    }, 500)

    return () => clearInterval(walkInterval)
  }, [])

  // Walking man ASCII art frames
  const walkingFrames = [
    `    .001.^
    u$ON=1
    Z00BAI
    1..=~.
    ;s<'''
    NRX~=-
    z0c^<X^
    "B0s~^
    @@$H~'
    n$0=XN;.
    ¡BBB0vU1=~'
    $000cRr"vul
    FAHZuqr-'
    ZZUFA@FI.
    ;BRHv n$U^-
    ARN1  @si
    'Onv~ 01.'
    c0qr  rs.
    aUU   ul
    RO-   :.
    nn~   -=.
    =1^   ..`,
    `    .001.^
    u$ON=1
    Z00BAI
    1..=~.
    ;s<'''
    NRX~=-
    z0c^<X^
    "B0s~^
    @@$H~'
    n$0=XN;.
    ¡BBB0vU1=~'
    $000cRr"vul
    FAHZuqr-'
    ZZUFA@FI.
    ;BRHv n$U^-
      ARN1  @si
      'Onv~ 01.'
      c0qr  rs.
      aUU   ul
      RO-   :.
      nn~   -=.
      =1^   ..`
  ]

  return (
    <div className="widget manhours-widget-card" ref={widgetRef}>
      <div className="manhours-ascii-bg">
        <pre className="walking-man">{walkingFrames[frameIndex]}</pre>
      </div>
      <div className="manhours-indicator">●</div>
      <div className="manhours-title">MANHOURS</div>
      <div className="manhours-value-large">1383942.80</div>
      <div className="widget-expand">↗</div>
    </div>
  )
}

export default ManhoursWidget

