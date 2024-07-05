import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { BooksList, Details, Home } from '@screens/index'
import theme from '@theme/index'
import { StyleSheet } from 'react-native'

const { Navigator, Screen } = createNativeStackNavigator()

export function AppRoutes() {
  return (
    <Navigator
      screenOptions={{
        headerShown: false,
        contentStyle: styles.contentStyle,
      }}
    >
      <Screen
        name="home"
        component={Home}
        options={{ animation: 'fade', animationDuration: 100 }}
      />
      <Screen
        name="booksList"
        component={BooksList}
        options={{ animation: 'fade', animationDuration: 100 }}
      />
      <Screen
        name="details"
        component={Details}
        options={{ animation: 'fade', animationDuration: 500 }}
      />
    </Navigator>
  )
}

const styles = StyleSheet.create({
  contentStyle: {
    backgroundColor: theme.COLORS.APP_BG,
    padding: theme.PADDING.p4,
  },
})
