import React from 'react';
import {
  Box,
  Container,
  Grid,
  Typography,
  Button,
  IconButton,
  useTheme,
  useMediaQuery,
  Stack,
} from '@mui/material';
import PlayCircleIcon from '@mui/icons-material/PlayCircle';
import NextLink from 'next/link';
import { useLanguage } from '../../../contexts/LanguageContext';

const YOUTUBE_VIDEO_ID = 'GVK7vmoZIA4'; // Replace with your actual video ID

const AboutQuranAcademy = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const { content, lang } = useLanguage();
  
  // Get aboutUsSection content from JSON
  const aboutUsData = content?.about?.aboutUsSection || {};
  const tagline = aboutUsData.tagline || 'About Us';
  const title = aboutUsData.title || 'Best Online Quran Academy';
  const description = aboutUsData.description || '';
  const ctaBtnText = aboutUsData.ctaBtnText || 'Contact Us';
  
  // Determine layout direction based on language
  const isUrdu = lang === 'ur';

  const handlePlayClick = () => {
    window.open(`https://www.youtube.com/watch?v=${YOUTUBE_VIDEO_ID}`, '_blank');
  };

  return (
    <Box sx={{ py: { xs: 6, md: 10 }, bgcolor: 'white' }}>
      <Container maxWidth="lg">
        <Stack
          direction={['column','column', isUrdu ? 'row-reverse' : 'row']}
          spacing={6}
          alignItems="center"
          justifyContent="space-evenly"
          gap={5}
        >
          {/* TEXT CONTENT */}
          <Grid item xs={12} md={6} maxWidth={['100%','100%','60%']}>
            <Box sx={{ textAlign: { xs: 'center', md: isUrdu ? 'right' : 'left' } }}>
              <Typography
                variant="subtitle1"
                sx={{
                  color: 'var(--color-primary)',
                  fontWeight: 'bold',
                  letterSpacing: 1,
                  mb: 1,
                  display: 'flex',
                  alignItems: 'center',
                  gap: 1,
                  justifyContent: { xs: 'center', md: isUrdu ? 'flex-end' : 'flex-start' },
                }}
              >
                <Box sx={{ width: 4, height: 20, bgcolor: 'var(--color-primary)' }} />
                {tagline.toUpperCase()}
              </Typography>

              <Typography
                variant={isMobile ? 'h4' : 'h3'}
                component="h2"
                fontWeight="bold"
                color='var(--color-primary)'
                mb={1}
                sx={{
                  textAlign: { xs: 'center', md: isUrdu ? 'right' : 'left' },
                }}
              >
                {title}
              </Typography>

              <Typography 
                variant="body1" 
                color="var(--text-dark)" 
                paragraph
                sx={{
                  whiteSpace: 'pre-line',
                  textAlign: { xs: 'center', md: isUrdu ? 'right' : 'left' },
                }}
              >
                {description}
              </Typography>

              <Box sx={{ display: 'flex', justifyContent: { xs: 'center', md: isUrdu ? 'flex-end' : 'flex-start' } }}>
                <Button
                  component={NextLink}
                  href="/contact"
                  variant="contained"
                  sx={{
                    bgcolor: 'var(--color-primary)',
                    mt: 2,
                    px: 3,
                    py: 1.2,
                    borderRadius: '6px',
                    fontWeight: 'bold',
                    textTransform: 'none',
                    boxShadow: 3,
                    '&:hover': { bgcolor: 'var(--color-primary-hover)' },
                  }}
                >
                  {ctaBtnText.toUpperCase()}
                </Button>
              </Box>
            </Box>
          </Grid>

          {/* IMAGES + PLAY BUTTON */}
          <Grid item xs={12} md={6} maxWidth={['100%','100%','38%']}>
            <Box
              sx={{
                position: 'relative',
                display: 'inline-block',
                width: '100%',
                maxWidth: 480,
                mx: 'auto',
              }}
            >
              {/* Large Image */}
              <Box
                component="img"
                src="/images/about1.jpg"
                alt="Quran Learning"
                sx={{
                  width: '100%',
                  height: 'auto',
                  borderRadius: 2,
                  display: 'block',
                  boxShadow: 3,
                  maxHeight: { md: 350, lg: 400}
                }}
              />

              {/* Small Overlapping Image - CENTERED VERTICALLY */}
              <Box
                component="img"
                src="/images/about2.jpg"
                alt="Quran Detail"
                sx={{
                  position: 'absolute',
                  top: '50%',
                  [isUrdu ? 'left' : 'right']: -40,
                  transform: 'translateY(-50%)',
                  width: { xs: 130, sm: 160 },
                  height: 'auto',
                  borderRadius: 2,
                  boxShadow: 3,
                }}
              />

              {/* Play Button - Centered relative to small image */}
              <IconButton
                onClick={handlePlayClick}
                sx={{
                  position: 'absolute',
                  top: '50%',
                  [isUrdu ? 'left' : 'right']: { xs: 60, sm: 85 },
                  transform: 'translateY(-50%)',
                  bgcolor: 'var(--color-primary)',
                  color: 'white',
                  width: { xs: 70, sm: 85 },
                  height: { xs: 70, sm: 85 },
                  borderRadius: '50%',
                  boxShadow: '0 0 25px rgba(0, 0, 0, 0.25)',
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    transform: 'translateY(-50%) scale(1.1)',
                    bgcolor: 'var(--color-primary-hover)',
                  },
                }}
              >
                <PlayCircleIcon sx={{ fontSize: { xs: 45, sm: 55 } }} />
              </IconButton>
            </Box>
          </Grid>
        </Stack>
      </Container>
    </Box>
  );
};

export default AboutQuranAcademy;
