import React from 'react';
import {
  Box,
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  Button,
  Stack,
  IconButton,
} from '@mui/material';
import {
  WhatsApp,
  Facebook,
  YouTube,
  Instagram,
  Chat,
  FollowTheSigns,
  Subscriptions,
} from '@mui/icons-material';
import { useLanguage } from '../../../contexts/LanguageContext';

// Icon mapping for platform icons
const platformIconMap = {
  WhatsApp: WhatsApp,
  Facebook: Facebook,
  YouTube: YouTube,
  Instagram: Instagram,
};

// Icon mapping for button icons
const buttonIconMap = {
  Chat: Chat,
  FollowTheSigns: FollowTheSigns,
  Subscriptions: Subscriptions,
};

// Color and gradient mapping for each platform
const platformStyles = {
  WhatsApp: {
    color: '#25D366',
    gradient: 'linear-gradient(135deg, #25D366 0%, #128C7E 100%)',
  },
  Facebook: {
    color: '#1877F2',
    gradient: 'linear-gradient(135deg, #1877F2 0%, #0C5A9E 100%)',
  },
  YouTube: {
    color: '#FF0000',
    gradient: 'linear-gradient(135deg, #FF0000 0%, #CC0000 100%)',
  },
  Instagram: {
    color: '#E4405F',
    gradient: 'linear-gradient(135deg, #E4405F 0%, #C13584 50%, #833AB4 100%)',
  },
};

// Get icon component from icon name
const getPlatformIcon = (iconName) => {
  const IconComponent = platformIconMap[iconName] || WhatsApp;
  return <IconComponent sx={{ fontSize: 48 }} />;
};

// Get button icon component from icon name
const getButtonIcon = (iconName) => {
  const IconComponent = buttonIconMap[iconName] || Chat;
  return <IconComponent fontSize="small" />;
};

function SocialPlatforms() {
  const { content } = useLanguage();
  const socialData = content?.home?.SocialPlatforms || {};
  
  // Map platforms from JSON to component format
  const socialPlatforms = socialData.socialPlatforms.map((platform, index) => {
    const styles = platformStyles[platform.name] || platformStyles.WhatsApp;
    return {
      id: index + 1,
      name: platform.name,
      description: platform.description,
      icon: getPlatformIcon(platform.icon),
      color: styles.color,
      buttonText: platform.buttonText,
      buttonIcon: getButtonIcon(platform.buttonIcon),
      link: platform.link,
      gradient: styles.gradient,
    };
  });

  const handlePlatformClick = (link) => {
    window.open(link, '_blank', 'noopener,noreferrer');
  };

  return (
    <Box
      sx={{
        py: { xs: 6, md: 6 },
        px: { xs: 2, md: 5, lg: 10 },
        backgroundColor: '#f8f9fa',
        position: 'relative',
        overflow: 'hidden',
        '&::before': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: '4px',
          background: 'linear-gradient(90deg, var(--color-primary) 0%, transparent 100%)',
        },
      }}
    > 
        {/* Section Header */}
        <Box sx={{ textAlign: 'center', mb: 6 }}>
          <Typography
            variant="h4"
            fontWeight={800}
            sx={{
              mb: 2,
              color: 'var(--color-primary)',
              fontSize: { xs: '1.8rem', md: '2.5rem' },
            }}
          >
            {socialData.title}
          </Typography>
          <Typography
            variant="body1"
            color="text.secondary"
            sx={{
              maxWidth: '600px',
              mx: 'auto',
              fontSize: { xs: '0.95rem', md: '1.1rem' },
              lineHeight: 1.7,
            }}
          >
            {socialData.subtitle}
          </Typography>
        </Box>

        {/* Social Platform Cards */}
        <Grid container spacing={4}    
        justifyContent="center"
        alignItems="flex-start">
          {socialPlatforms.map((platform) => (
            <Grid size={[12,6,4,3]} key={platform.id}>
              <Card
                sx={{
                  height: '100%', 
                  position: 'relative',
                  borderRadius: 4,
                  overflow: 'hidden',
                  border: '1px solid #e0e0e0',
                  transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                  cursor: 'pointer',
                  '&:hover': {
                    transform: 'translateY(-12px)',
                    boxShadow: `0 20px 40px rgba(0,0,0,0.15), 0 0 0 1px ${platform.color}20`,
                    '& .platform-icon': {
                      transform: 'scale(1.15) rotate(20deg)',
                      color: platform.color,
                    },
                    '& .platform-button': {
                      backgroundColor: platform.color,
                      transform: 'scale(1.05)',
                      boxShadow: `0 8px 16px ${platform.color}40`,
                    },
                  },
                }}
                onClick={() => handlePlatformClick(platform.link)}
              >
                {/* Gradient Background Overlay */}
                <Box
                  sx={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    height: '130px',
                    background: platform.gradient,
                    opacity: 0.05,
                    transition: 'opacity 0.4s ease',
                    '&:hover': {
                      opacity: 0.1,
                    },
                  }}
                />

                <CardContent
                  sx={{
                    p: 2,
                    position: 'relative',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    textAlign: 'center',
                    minHeight: '310px',
                  }}
                >
                  {/* Platform Icon */}
                  <Box
                    className="platform-icon"
                    sx={{
                      mb: 2,
                      p: 2,
                      borderRadius: '50%',
                      backgroundColor: `${platform.color}10`,
                      color: platform.color,
                      transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      width: 100,
                      height: 100,
                    }}
                  >
                    {platform.icon}
                  </Box>

                  {/* Platform Name */}
                  <Typography
                    variant="h6"
                    fontWeight={700}
                    sx={{
                      mb: 1,
                      color: 'text.primary',
                      fontSize: { xs: '1.1rem', md: '1.25rem' },
                    }}
                  >
                    {platform.name}
                  </Typography>

                  {/* Description */}
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{
                      mb: 3,
                      fontSize: '0.9rem',
                      lineHeight: 1.6,
                      flexGrow: 1,
                    }}
                  >
                    {platform.description}
                  </Typography>

                  {/* Action Button */}
                  <Button 
                    variant="contained"
                    startIcon={platform.buttonIcon}
                    size='small'
                    fullWidth
                    sx={{
                      backgroundColor: `${platform.color}15`,
                      color: platform.color,
                      fontWeight: 600,
                      py: 1,
                      borderRadius: 2,
                      boxShadow: 'none',
                      fontSize: '0.95rem',
                      transition: 'all 0.3s ease',
                      border: `2px solid ${platform.color}30`,
                      '&:hover': {
                        backgroundColor: platform.color,
                        color: 'white',
                        borderColor: platform.color, boxShadow: 'none',
                      },
                    }}
                  >
                    {platform.buttonText}
                  </Button>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>

        {/* Additional Info */}
        <Box sx={{ textAlign: 'center', mt: 6 }}>
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{
              fontSize: '0.9rem',
              fontStyle: 'italic',
            }}
          >
            {socialData.AdditionalInfo}
          </Typography>
        </Box> 
    </Box>
  );
}

export default SocialPlatforms;
