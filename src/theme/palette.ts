import * as colors from '@material-ui/core/colors'
import { Palette } from '@material-ui/core/styles/createPalette'

const white = '#fff'
const black = '#000'

export interface AdditionalPaletteOptions {
  icon: string
  border: {
    main: string
    secondary: string
  }
}

const palette: Partial<Palette> = {
  primary: {
    contrastText: white,
    dark: black,
    main: '#d87e4b',
    light: '#f3ac48',
  },
  secondary: {
    contrastText: white,
    dark: black,
    main: '#7d2f45',
    light: '#d2c3b7',
  },
  success: {
    contrastText: white,
    dark: '#4caf50',
    main: '#3dc47e',
    light: '#4caf50',
  },
  error: {
    contrastText: white,
    dark: colors.red[900],
    main: colors.red[600],
    light: colors.red[400],
  },
  text: {
    primary: colors.grey[900],
    secondary: '#9b8d61',
    tertiary: '#262d33',
    disabled: '#939393',
    contrast: '#611a15',
    light: colors.grey[600],
    hint: '#939699',
    description: '#999291',
  },
  icon: '#d2c3b7',
  background: {
    default: '#f9f5f0',
    primary: '#f9f9ed',
    secondary: '#f9f1e7',
    tertiary: '#fcf6f8',
    paper: white,
    light: '#f9f5f0',
    dark: '#f5f5f5',
    contrast: '#f8f9f0',
  },
  border: {
    main: '#d9dadb',
    secondary: '#f0f0f0',
  },
  divider: '#d9dadb',
}

export default palette
