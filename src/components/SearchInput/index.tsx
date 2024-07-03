import EvilIcons from '@expo/vector-icons/EvilIcons'
import theme from '@theme/index'
import { useState } from 'react'
import { StyleProp, StyleSheet, TextInput, ViewStyle } from 'react-native'
import Animated from 'react-native-reanimated'
// TODO: create a reusable icon component?

type InputProps = {
  value: string
  onChange: (value: string) => void
  customStyle?: StyleProp<ViewStyle>
  submit: () => void
  handleClose?: () => void
}

export const SearchInput = ({
  value,
  onChange,
  customStyle,
  submit,
  handleClose = () => {},
}: InputProps) => {
  const [isFocused, setIsFocused] = useState(false)

  return (
    <Animated.View
      style={[styles.container, isFocused && styles.focused, customStyle]}
    >
      <TextInput
        style={styles.input}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        placeholder="search for the book"
        value={value}
        onChangeText={onChange}
        returnKeyType="search"
        onSubmitEditing={submit}
      />
      {value ? (
        <EvilIcons
          name="close"
          size={32}
          color={theme.COLORS.GRAY_200}
          onPress={() => {
            onChange('')
            handleClose()
          }}
        />
      ) : (
        <EvilIcons name="search" size={32} color={theme.COLORS.GRAY_200} />
      )}
    </Animated.View>
  )
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: 59,
    backgroundColor: '#fff',
    borderRadius: 30,
    paddingVertical: 10,
    paddingHorizontal: 30,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.27,
    shadowRadius: 4.65,

    elevation: 6,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 30,
  },
  focused: {
    borderColor: theme.COLORS.ACTIVE,
    borderWidth: 1.5,
  },
  input: { flex: 1, height: '100%' },
})
