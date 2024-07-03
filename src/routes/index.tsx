import { NavigationContainer } from '@react-navigation/native'
import { SafeAreaProvider } from 'react-native-safe-area-context'

import { AppRoutes } from './app.routes'

export function Routes() {
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <AppRoutes />
      </NavigationContainer>
    </SafeAreaProvider>
  )
}
