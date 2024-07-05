import { Image } from 'expo-image'
import { StyleSheet } from 'react-native'

const blurhash =
  '|rF?hV%2WCj[ayj[a|j[az_NaeWBj@ayfRayfQfQM{M|azj[azf6fQfQfQIpWXofj[ayj[j[fQayWCoeoeaya}j[ayfQa{oLj?j[WVj[ayayj[fQoff7azayj[ayj[j[ayofayayayj[fQj[ayayj[ayfjj[j[ayjuayj['

type ImageProps = {
  url: string
  alt: string
}
export function CustomImage({ url, alt }: ImageProps) {
  return (
    <Image
      style={styles.image}
      source={url}
      placeholder={{ blurhash }}
      contentFit="cover"
      cachePolicy={'disk'}
      alt={alt}
    />
  )
}

const styles = StyleSheet.create({
  image: { flex: 1, width: '100%' },
})
