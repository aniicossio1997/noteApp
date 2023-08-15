
import { extendTheme, type ThemeConfig } from '@chakra-ui/react'

const breakpoints = {
  sm: '320px',
  md: '610px',
  lg: '960px',
  xl: '1200px',
  '2xl': '1536px',
}
const config: ThemeConfig = {
    initialColorMode: 'dark', // 'dark' | 'light'
    useSystemColorMode: true,
  }
// 3. extend the theme
const theme = extendTheme({ config, breakpoints,
  Button: {
    baseStyle: {
      fontSize: ["10px", "14px","16"],
    },
  },
  textStyles: {
    textBtn: {
      // you can also use responsive styles
      fontSize: ['10px', '12px', '14px'],
    },
  },
})

export default theme