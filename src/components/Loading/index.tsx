import LottieView from 'lottie-react-native'

export default function AnimationWithImperativeApi() {
  return (
    <LottieView
      source={require('@assets/Animations/BooksLoading.json')}
      style={{ width: '100%', height: '100%' }}
      autoPlay
      loop
    />
  )
}
