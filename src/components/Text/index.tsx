import theme from '@theme/index'
import type { StyleProp, TextStyle } from 'react-native'
import { StyleSheet, Text as RNText } from 'react-native'

type TextProps = {
  children: React.ReactNode
  style?: StyleProp<TextStyle>
  size?: 'SM' | 'MD' | 'LG' | 'XL'
  weight?: 'bold' | 'regular'
  color?: string
}

export const Text = ({
  children,
  style,
  weight = 'regular',
  size = 'SM',
  color = theme.COLORS.WHITE,
}: TextProps) => {
  return (
    <RNText
      style={[
        style,
        styles[weight],
        { color, fontSize: theme.FONT_SIZE[size], flexWrap: 'wrap' },
      ]}
    >
      {children}
    </RNText>
  )
}

const styles = StyleSheet.create({
  bold: {
    fontFamily: theme.FONT_FAMILY.BOLD,
  },
  regular: {
    fontFamily: theme.FONT_FAMILY.REGULAR,
  },
})
