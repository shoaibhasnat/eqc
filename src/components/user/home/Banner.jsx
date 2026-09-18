import React from 'react';
import {
  Box,
  Container,
  Typography,
  Button,
  useTheme,
  useMediaQuery,
} from '@mui/material';
import NextLink from 'next/link';
import { useLanguage } from '../../../contexts/LanguageContext';
// Replace with your actual hero image
const HERO_IMAGE = '/images/home-banner.jpg';

const Banner = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const { content } = useLanguage();
  
  // Get banner content from JSON
  const bannerContent = content?.home?.banner || {};
  const tagline = bannerContent.tagline || '';
  const title = bannerContent.title || '';
  const description = bannerContent.description || '';
  const ctaBtnText = bannerContent.ctaBtnText || 'Contact Us';

  return (
    <Box
      role="img"
      aria-label="Easy Quran Class online Quran academy banner"
      sx={{
        position: 'relative',
        width: '100%',
        minHeight:"100vh",
        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.6)), url(${HERO_IMAGE})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        display: 'flex',
        alignItems: 'center',
        color: 'white',
      }}
    >
      <Container maxWidth="lg">
        <Box
          sx={{
            maxWidth: { xs: '100%', md: '60%' },
            textAlign: 'center',
            mx: 'auto',
          }}
        >
          {/* Top Tagline */}
          <Typography
            variant="caption"
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: 1,
              fontWeight: 600,
              fontSize: { xs: '0.8rem', sm: '0.9rem' },
              mb: 1,
              justifyContent: 'center',
            }}
          >
            <Box sx={{ width: 4, height: 20, bgcolor: 'var(--color-primary)' }} />
            {tagline}
          </Typography>

          {/* Main Heading */}
          <Typography
            variant={isMobile ? 'h3' : 'h2'}
            component="h1"
            fontWeight="bold"
            sx={{
              fontSize: { xs: '2.2rem', sm: '3rem', md: '3.5rem' },
              lineHeight: 1.2,
              mb: 2,
              textAlign: 'center',
              // ...(lang === 'ur' && {
              //   fontFamily: 'Arial, "Noto Nastaliq Urdu", "Al Qalam Taj Nastaliq", sans-serif',
              //   unicodeBidi: 'bidi-override',
              // }),
            }}
          >
            {title}
          </Typography>

          {/* Description */}
          <Typography
            variant="body1"
            sx={{
              mb: 4,
              opacity: 0.9,
              fontSize: { xs: '1rem', md: '1.1rem' }, 
              mx: 'auto',
              textAlign: 'center',
            }}
          >
            {description}
          </Typography>

          {/* CTA Button */}
          <Box
            sx={{
              display: 'flex',
              gap: 2,
              flexWrap: 'wrap',
              justifyContent: 'center',
            }}
          >
            <Button
              component={NextLink}
              href="/contact"
              variant="contained"
              size="large" 
              sx={{
                bgcolor: 'var(--color-primary)',
                color: 'white',
                px: 4,
                py: 1.5,
                fontWeight: 'bold',
                borderRadius: 1.7,
                '&:hover': { bgcolor: 'var(--color-primary-hover)' },
              }}
            >
              {ctaBtnText}
            </Button>

          
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default Banner;