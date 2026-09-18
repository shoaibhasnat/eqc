import React from 'react';
import { Box, CircularProgress, Typography } from '@mui/material';

const Loader = () => {
  return (
    <Box
      sx={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        bgcolor: 'rgba(73, 44, 0, 0.86)',
        backdropFilter: 'blur(10px)',
        zIndex: 9999,
      }}
    >
      <CircularProgress
        size={60}
        thickness={4}
        sx={{
          color: 'var(--color-primary)',
          mb: 3,
          '& .MuiCircularProgress-circle': {
            strokeLinecap: 'round',
          },
        }}
      />
      <Typography
        variant="body1"
        sx={{
          color: 'white',
          fontWeight: 500,
          fontFamily: "'Quicksand', sans-serif",
        }}
      >
        Loading...
      </Typography>
    </Box>
  );
};

export default Loader;

