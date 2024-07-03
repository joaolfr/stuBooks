/* eslint-disable camelcase */
import {
  Inter_400Regular,
  Inter_700Bold,
  useFonts,
} from '@expo-google-fonts/inter'
import { Routes } from '@routes/index'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ActivityIndicator, StatusBar } from 'react-native'

const queryClient = new QueryClient()

export default function App() {
  const [fontsLoaded] = useFonts({ Inter_400Regular, Inter_700Bold })

  return (
    <QueryClientProvider client={queryClient}>
      <StatusBar
        barStyle={'dark-content'}
        backgroundColor={'transparent'}
        translucent
      />
      {fontsLoaded ? <Routes /> : <ActivityIndicator />}
    </QueryClientProvider>
  )
}
