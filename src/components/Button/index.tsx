import { Text } from '@components/Text'
import theme from '@theme/index'
import { ActivityIndicator, StyleSheet, TouchableOpacity } from 'react-native'

interface CustomButtonProps {
  children: React.ReactNode
  onPress: () => void
  type?: 'primary' | 'secondary' | 'clear'
  fetching: boolean
}

export const Button = ({
  children,
  onPress,
  type = 'primary',
  fetching,
}: CustomButtonProps) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[styles.button, styles[type]]}
      disabled={fetching}
    >
      {fetching ? (
        <ActivityIndicator size={30} color={'#fff'} />
      ) : (
        <Text
          size="MD"
          style={[
            styles.text,
            type === 'clear' ? styles.clearButtonText : styles.buttonText,
          ]}
        >
          {children}
        </Text>
      )}
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  button: {
    padding: 10,
    borderRadius: 27,
    width: '100%',
    height: 54,
    justifyContent: 'center',
  },
  primary: {
    backgroundColor: theme.COLORS.ACTIVE,
  },
  secondary: {
    backgroundColor: 'red',
  },
  clear: {
    backgroundColor: 'transparent',
    borderWidth: 2,
    borderColor: 'black',
    borderRadius: 20,
  },
  text: {
    fontSize: 20,
    textAlign: 'center',
  },
  buttonText: {
    color: 'white',
  },
  clearButtonText: {
    color: 'black',
  },
})
