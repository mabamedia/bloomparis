import Nav from '@/components/Nav'
import Footer from './Footer'
import Header from './Header'
import gsap from 'gsap'
import CustomEase from 'gsap/CustomEase'
import { useEffect } from 'react'

gsap.registerPlugin(CustomEase)

export default function Hero() {
  useEffect(() => {
    const customEase = CustomEase.create('custom', '.87,0,.13,1')
    const counter = document.getElementById('counter')

    gsap.set('#video-container', {
      scale: 0,
      rotation: -20,
    })

    gsap.to('#hero', {
      clipPath: 'polygon(0% 45%, 25% 45%, 25% 55%, 0% 55%)',
      duration: 1.5,
      ease: customEase,
      delay: 1,
    })

    gsap.to('#hero', {
      clipPath: 'polygon(0% 45%, 100% 45%, 100% 55%, 0% 55%)',
      duration: 2,
      ease: customEase,
      delay: 3,

      onStart: () => {
        gsap.to('#progress-bar', {
          width: '100vw',
          duration: 2,
          ease: customEase,
        })

        gsap.to(counter, {
          innerHTML: 100,
          duration: 2,
          ease: customEase,
          snap: { innerHTML: 1 },
        })
      },
    })

    gsap.to('#hero', {
      clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)',
      duration: 1,
      ease: customEase,
      delay: 5,
      onStart: () => {
        gsap.to('#video-container', {
          scale: 1,
          rotation: 0,
          clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)',
          duration: 1.25,
          ease: customEase,
        })

        gsap.to('#progress-bar', {
          opacity: 0,
          duration: 0.3,
        })

        gsap.to('#logo', {
          left: '0%',
          transform: 'translateX(0%)',
          duration: 1.25,
          delay: 0.5,
          ease: customEase,
          onStart: () => {
            gsap.to('#char #anim-out h1', {
              y: '100%',
              duration: 1,
              stagger: -0.075,
              ease: customEase,
            })
          },
        })
      },
    })

    gsap.to(['#header span', '#coordinates span'], {
      y: '0%',
      duration: 1,
      stagger: 0.125,
      ease: 'power3.out',
      delay: 5.75,
    })
  }, [])

  return (
    <div
      id='hero'
      className='z-[9997] relative flex flex-col justify-between bg-[#15161b] [clip-path:polygon(0%_45%,0%_45%,0%_55%,0%_55%)] w-screen h-[100svh] will-change-[clip-path]'
    >
      <div
        id='progress-bar'
        className='top-1/2 left-0 z-[9998] absolute flex justify-between items-center p-[2em] w-[25vw] text-[#ffbb00] -translate-y-1/2'
      >
        <p>loading</p>
        <p>
          / <span id='counter'>0</span>
        </p>
      </div>

      <div
        id='video-container'
        className='top-1/2 left-1/2 absolute bg-black [clip-path:polygon(20%_20%,80%_20%,80%_80%,20%_80%)] [will-change:transform,clip-path] w-screen h-[100svh] overflow-hidden -translate-x-1/2 -translate-y-1/2'
      >
        <video
          autoPlay
          muted
          playsinline
          className='top-1/2 left-1/2 absolute opacity-[0.85] w-auto min-w-full h-auto min-h-full object-cover -translate-x-1/2 -translate-y-1/2'
        >
          <source src='/assets/videos/woman-2.mp4' type='video/mp4' />
        </video>
      </div>

      <Nav />
      <Footer />
      <Header />
    </div>
  )
}
