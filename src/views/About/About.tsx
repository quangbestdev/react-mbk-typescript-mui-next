import React from 'react'
import { Grid, Typography, Box } from '@material-ui/core'
import Layout from '../../components/Layout/Layout'
import HeroBanner from './HeroBanner'
import Block from '../../components/Block'
import Image from '../../components/Image'

const About: React.FC = () => {
  return (
    <Layout title="About" dark>
      <HeroBanner title="MTJ by Marilyn Tan" />

      <Block container py={10}>
        <Grid container spacing={10}>
          <Grid item xs={12} md={4}>
            <Box maxWidth={400}>
              <Typography variant="overline" color="textSecondary">
                The Artist
              </Typography>
              <Typography variant="h4" gutterBottom>
                Established in 1995
              </Typography>
              <Typography variant="body1" color="textSecondary" gutterBottom>
                Marilyn Tan Jewellery is a Singapore-based eponymous label, born out of a passionate pursuit for
                jewellery design. Starting out with making bespoke jewellery, Marilyn has been crafting individualistic
                pieces of a timeless quality for more than 20 years.
              </Typography>

              <Box position="relative">
                <Image src="/textures/gray_sand.webp" height={250} mt={5} />
                <Image
                  src="/mood/rock_earrings.jpg"
                  style={{ opacity: 0.95 }}
                  height={300}
                  position="absolute"
                  top="75%"
                  left="60%"
                />
              </Box>
            </Box>
          </Grid>

          <Grid item xs={12} md={4}>
            <Box position="relative">
              <Image
                src="/about/mtj_artist_black.jpg"
                style={{ opacity: 0.95 }}
                height={320}
                ml={3}
                position="relative"
                zIndex={1}
              />
              <Image src="/mtj_logo.png" height={50} position="absolute" top="56%" right={20} />
            </Box>
            <Image src="/textures/black_sand.webp" height={300} mt={-20} />
          </Grid>

          <Grid item xs={12} md={4}>
            <Box maxWidth={400} marginX="auto" position="relative">
              <Image src="/mood/ring_fist.jpg" height={300} />

              <Typography variant="overline" color="textSecondary">
                The Craft
              </Typography>
              <Typography variant="h4" gutterBottom>
                Exquisite Gems
              </Typography>
              <Typography variant="body1" color="textSecondary" gutterBottom>
                Her passion for design soon prompted her to branch out with a diffusion line, MTJ. She creates every
                design with patience, precision and great attention to detail and her designs are inspired by everything
                from nature to fine art as well as her travels.
              </Typography>
            </Box>

            <Image src="/about/mtj_artist_warm.jpg" height={280} mt={7} maxWidth="initial" ml={-14} />
          </Grid>
        </Grid>
      </Block>
    </Layout>
  )
}

export default About
