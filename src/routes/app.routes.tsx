import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { Details, Home, BooksList } from '@screens/index'
import theme from '@theme/index'

const { Navigator, Screen } = createNativeStackNavigator()

export function AppRoutes() {
  return (
    <Navigator
      screenOptions={{
        headerShown: false,
        contentStyle: { backgroundColor: theme.COLORS.APP_BG, padding: 20 },
      }}
    >
      <Screen name="home" component={Home} />
      <Screen
        name="booksList"
        component={BooksList}
        options={{ animation: 'fade', animationDuration: 500 }}
      />
      <Screen
        name="details"
        component={Details}
        options={{ animation: 'fade', animationDuration: 500 }}
      />
    </Navigator>
  )
}
