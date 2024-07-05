import LottieView from 'lottie-react-native'
import { useEffect, useRef } from 'react'

export default function AnimationWithImperativeApi() {
//   const animationRef = useRef<LottieView>(null)

//   useEffect(() => {
//     animationRef.current?.play()

//     // Or set a specific startFrame and endFrame with:
//     animationRef.current?.play(30, 120)
//   }, [])

  return (
    <LottieView
    //   ref={animationRef}
      source={require('@assets/Animations/BooksLoading.json')}
      style={{ width: '100%', height: '100%'}}
      autoPlay
      loop
    />
  )
}
