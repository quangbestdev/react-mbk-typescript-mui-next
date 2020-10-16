import { createMuiTheme, responsiveFontSizes } from '@material-ui/core/styles'
import palette from './palette'
import typography from './typography'
import overrides from './overrides'

const baseTheme = {
  palette,
  typography,
  overrides,
}

export const theme = responsiveFontSizes(createMuiTheme(baseTheme))
export const themeWithRtl = createMuiTheme({ ...baseTheme, direction: 'rtl' })
