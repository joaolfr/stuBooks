import { createNativeStackNavigator } from '@react-navigation/native-stack'
import {
  BookDetails,
  BooksList,
  Favorites,
  Home,
  ReadingList,
} from '@screens/index'
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
        options={{ animation: 'fade', animationDuration: 500 }}
      />
      <Screen
        name="booksList"
        component={BooksList}
        options={{ animation: 'fade', animationDuration: 500 }}
      />
      <Screen
        name="bookDetails"
        component={BookDetails}
        options={{ animation: 'fade', animationDuration: 500 }}
      />
      <Screen
        name="favorites"
        component={Favorites}
        options={{
          animation: 'fade',
          animationDuration: 500,
          headerShown: true,
          headerTitle: 'Favorites',
        }}
      />
      <Screen
        name="readingList"
        component={ReadingList}
        options={{
          animation: 'fade',
          animationDuration: 500,
          headerShown: true,
          headerTitle: 'Reading List',
        }}
      />
    </Navigator>
  )
}

const styles = StyleSheet.create({
  contentStyle: {
    backgroundColor: theme.COLORS.APP_BG,
    paddingHorizontal: theme.PADDING.p2,
    paddingVertical: theme.PADDING.p4,
  },
})
