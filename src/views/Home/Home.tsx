import React from 'react'
import { Box } from '@material-ui/core'
import { useTheme } from '@material-ui/core/styles'
import Layout from '../../components/Layout/Layout'
import HeroBanner from './HeroBanner'
import HomeBrandingGrid from './HomeBrandingGrid'
import HomeSplitBanner from './HomeSplitBanner'
import FooterBanner from './FooterBanner'
import { DEFAULT_HORIZ_PADDING, GIFT_BOX_BANNER, VISIT_US_BANNER, OUR_FLAVOURS_BANNER } from './constants'

const Home: React.FC = () => {
  const theme = useTheme()
  return (
    <Layout title="Home">
      <HeroBanner />
      <Box px={DEFAULT_HORIZ_PADDING} bgcolor={theme.palette.background.light}>
        <HomeBrandingGrid />
        <HomeSplitBanner
          image={GIFT_BOX_BANNER.image}
          overline={GIFT_BOX_BANNER.overline}
          title={GIFT_BOX_BANNER.title}
          body={GIFT_BOX_BANNER.body}
          button={GIFT_BOX_BANNER.button}
          backgroundColor={GIFT_BOX_BANNER.backgroundColor}
        />
        <HomeSplitBanner
          reverse
          image={VISIT_US_BANNER.image}
          overline={VISIT_US_BANNER.overline}
          title={VISIT_US_BANNER.title}
          body={VISIT_US_BANNER.body}
          button={VISIT_US_BANNER.button}
        />
        <FooterBanner
          image={OUR_FLAVOURS_BANNER.image}
          overline={OUR_FLAVOURS_BANNER.overline}
          title={OUR_FLAVOURS_BANNER.title}
          body={OUR_FLAVOURS_BANNER.body}
          buttons={OUR_FLAVOURS_BANNER.buttons}
        />
      </Box>
    </Layout>
  )
}

export default Home
