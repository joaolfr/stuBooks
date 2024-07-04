import { Text } from '@components/Text'
import theme from '@theme/index'
import { ActivityIndicator, StyleSheet, TouchableOpacity } from 'react-native'

type CustomButtonProps = {
  children: React.ReactNode
  onPress: () => void
  type: 'primary' | 'secondary' | 'clear'
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
    padding: theme.PADDING.p1,
    borderRadius: theme.PADDING.p6,
    width: '100%',
    height: theme.PADDING.p6 * 2,
    justifyContent: 'center',
  },
  primary: {
    backgroundColor: theme.COLORS.PRIMARY,
  },
  secondary: {
    backgroundColor: theme.COLORS.PRIMARY,
  },
  text: {
    textAlign: 'center',
  },
  buttonText: {
    color: theme.COLORS.WHITE,
  },
  clearButtonText: {
    color: theme.COLORS.GRAY_700,
  },
})
