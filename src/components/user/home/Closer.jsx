import React from 'react';
import {
  Box,
  Container,
  Typography,
  Button,
  IconButton,
  useTheme,
  useMediaQuery,
} from '@mui/material';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';

// Replace with your actual image and YouTube video ID
const BACKGROUND_IMAGE = '/images/closerImg.png';
const YOUTUBE_VIDEO_ID = 'GVK7vmoZIA4'; // Replace with real video ID

const Closer = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const handlePlayClick = (e) => {
    e.stopPropagation();
    window.open(`https://www.youtube.com/watch?v=${YOUTUBE_VIDEO_ID}`, '_blank');
  };

  return (
    <Box
      sx={{
        position: 'relative',
        width: '100%',
        minHeight: { xs: '40vh', md: '50vh' },
        backgroundImage: `url(${BACKGROUND_IMAGE})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        display: 'flex',
        alignItems: 'center',
        '&::before': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
        },
      }}
    >
      <Container
        maxWidth="lg"
        sx={{
          position: 'relative',
          zIndex: 2,
          display: 'flex',
          flexDirection: { xs: 'column', md: 'row' },
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: { xs: 3, md: 4 },
          py: { xs: 6, md: 8 },
        }}
      >
        {/* Left: Text + Button */}
        <Box
          sx={{
            textAlign: { xs: 'center', md: 'left' },
            color: 'white',
            maxWidth: { md: '50%' },
          }}
        >
          <Typography
            variant={isMobile ? 'h4' : 'h3'}
            component="h2"
            fontWeight="bold"
            sx={{
              fontSize: { xs: '2rem', sm: '2.8rem', md: '3.2rem' },
              lineHeight: 1.2,
              mb: 3,
            }}
            color='white'
          >
            Lets Start Online
            <br />
            Quran Learning
          </Typography>

          <Button
            variant="contained"
            size="large"
            href="#trial"
            sx={{
              bgcolor: 'var(--color-primary)',
              color: 'white',
              px: { xs: 4, md: 5 },
              py: 1.5,
              fontWeight: 'bold',
              borderRadius: 1,
              fontSize: '1.1rem',
              '&:hover': {
                bgcolor: 'var(--color-primary-hover)',
                transition:"0.5s"
              },
            }}
          >
            Get Started Now
          </Button>
        </Box>

        {/* Right: Play Button */}
        <IconButton
          onClick={handlePlayClick}
          sx={{
            bgcolor: 'var(--color-primary)',
            color: 'white',
            width: { xs: 70, sm: 80, md: 90 },
            height: { xs: 70, sm: 80, md: 90 },
            borderRadius: '50%',
            boxShadow: 3,
            transition: 'all 0.3s ease',
            '&:hover': {
              bgcolor: 'var(--color-primary-hover)',
              transform: 'scale(1.1)',
              boxShadow: 6,
            },
            '& .MuiSvgIcon-root': {
              fontSize: { xs: 36, sm: 44, md: 50 },
            },
          }}
        >
          <PlayArrowIcon fontSize="inherit" />
        </IconButton>
      </Container>
    </Box>
  );
};

export default Closer;