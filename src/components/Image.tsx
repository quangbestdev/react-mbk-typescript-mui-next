import React, { ImgHTMLAttributes } from 'react'
import { styled } from '@material-ui/core/styles'
import { compose, sizing, SizingProps, spacing, SpacingProps, positions, PositionsProps } from '@material-ui/system'

const Img = styled('img')(compose(positions, spacing, sizing))

interface ImageStyleProps extends PositionsProps, SpacingProps, SizingProps {
  height?: number
}

interface ImageProps extends Omit<ImgHTMLAttributes<any>, 'height' | 'width'>, ImageStyleProps {}

const Image: React.FC<ImageProps> = (props) => {
  // eslint-disable-next-line jsx-a11y/alt-text
  return <Img maxWidth="100%" {...props} />
}

export default Image
