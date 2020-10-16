import { TypographyOptions } from '@material-ui/core/styles/createTypography'

export const headerFontFamily = 'Playfair Display'
export const overlineFontFamily = 'Oswald'
export const bodyFontFamily = 'Roboto'

export const bold = 700

const typography: TypographyOptions = {
  fontFamily: bodyFontFamily,
  h1: {
    fontFamily: headerFontFamily,
    fontWeight: bold,
  },
  h2: {
    fontFamily: headerFontFamily,
    fontWeight: bold,
  },
  h3: {
    fontFamily: headerFontFamily,
    fontWeight: bold,
  },
  h4: {
    fontFamily: headerFontFamily,
    fontWeight: bold,
  },
  h5: {
    fontFamily: headerFontFamily,
    fontWeight: bold,
  },
  h6: {
    fontFamily: headerFontFamily,
    fontWeight: bold,
  },
  subtitle2: {
    fontFamily: overlineFontFamily,
  },
  overline: {
    fontFamily: overlineFontFamily,
    letterSpacing: 3,
    lineHeight: 1.58,
  },
}

export default typography
