import { ButtonProps } from '@material-ui/core'
import palette from '../../theme/palette'

export const DEFAULT_HORIZ_PADDING = 10
export const HOME_BLOCK_VERT_SPACING_MD = 17.5
export const HOME_BLOCK_VERT_SPACING_SM = 8

export const DEFAULT_BODY =
  'Mr. Bucket has been a true Asian family-run chocolatier for about 120 years. Immerse yourself in the olden days and discover how we’re taking on the future.'

export const HOME_DEFAULT_CONTENT = {
  overline: 'Welcome to Mr. Bucket',
  title: 'Delightful Chocolate Treats For You',
  body: DEFAULT_BODY,
}

export const GIFT_BOX_BANNER = {
  image: '/home/assorted-chocs.jpg',
  overline: 'Welcome to Mr. Bucket',
  title: 'Build a Customised Chocolate Gift Box',
  body:
    'The perfect gift for any occasion. Dazzle your recipient with thoughtful chocolate bon bon flavours that you put together in a special gift box.',
  button: {
    color: 'primary' as ButtonProps['color'],
    label: 'Coming Soon',
    href: '/shop',
  },
  backgroundColor: palette.background.contrast,
}

export const VISIT_US_BANNER = {
  image: '/home/chocolate-ingredients.jpg',
  overline: 'Our New Space',
  title: 'Visit our Chocolaterie',
  body: DEFAULT_BODY,
  button: {
    color: 'secondary' as ButtonProps['color'],
    label: 'Visit Us',
    href: '/visit',
  },
}

export const OUR_FLAVOURS_BANNER = {
  image: '/home/bon-bon-circle.png',
  overline: 'Our Flavours',
  title: 'Delightful Chocolate Treats For You',
  body: DEFAULT_BODY,
  buttons: [
    {
      color: 'primary' as ButtonProps['color'],
      label: 'Learn More',
      href: '/about',
    },
    {
      color: 'secondary' as ButtonProps['color'],
      label: 'Shop Chocolates',
      href: '/shop',
    },
  ],
}
