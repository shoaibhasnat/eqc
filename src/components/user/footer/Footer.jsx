
import React, { useMemo } from 'react';
import { Box, Typography, Container, Grid, Link, IconButton, Stack, Avatar, Divider } from '@mui/material';
import { 
  Facebook, 
  Instagram, 
  YouTube, 
  Email, 
  Phone, 
  LocationOn,
  Favorite,
  WhatsApp,
} from '@mui/icons-material';
import { motion } from 'framer-motion';
import NextLink from 'next/link';
import Image from 'next/image';
import { useLanguage } from '../../../contexts/LanguageContext';
import { SITE_EMAIL, SITE_FACEBOOK, SITE_WHATSAPP, SITE_YOUTUBE } from '@/lib/seo';

function Footer() {
  const { content } = useLanguage();
  const footerData = content?.footer || {};
  
  // Get footer content from JSON
  const footerTitle = footerData.footerTitle || 'Easy Quran Class';
  const footerSubtitle = footerData.footerSubtitle || '';
  const quickLinks = footerData.quickLinks || [];
  const contactInfoData = footerData.contactInfo || [];
  const additionalInfo = footerData.additionalInfo || {};
  const sectionTitles = footerData.sectionTitles || {};

  const socialLinks = [
    { Icon: WhatsApp, href: SITE_WHATSAPP, label: 'WhatsApp' },
    { Icon: Facebook, href: SITE_FACEBOOK, label: 'Facebook' },
    { Icon: Instagram, href: SITE_FACEBOOK, label: 'Instagram' },
    { Icon: YouTube, href: SITE_YOUTUBE, label: 'YouTube' },
    { Icon: Email, href: `mailto:${SITE_EMAIL}`, label: 'Email' },
  ];

  // Map contact info with icons
  const iconMap = {
    'Phone': Phone,
    'فون': Phone,
    'Email': Email,
    'ای میل': Email,
    'Address': LocationOn,
    'پتہ': LocationOn,
  };

  const contactInfo = contactInfoData.map((contact) => {
    const IconComponent = iconMap[contact.name] || Phone;
    return {
      icon: <IconComponent />,
      label: contact.name,
      value: contact.value,
      href: contact.link,
      color: contact.name === 'Phone' || contact.name === 'فون' ? '#25D366' : 
             contact.name === 'Email' || contact.name === 'ای میل' ? '#1877F2' : '#E91E63',
    };
  });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
      },
    },
  };

  // Generate random stars with different properties (memoized to prevent regeneration)
  const stars = useMemo(() => {
    const starCount = 15;
    return Array.from({ length: starCount }, (_, i) => ({
      id: i,
      left: (i * 17 + 8) % 100,
      delay: (i * 0.37) % 5,
      duration: 3 + (i % 5) * 0.8,
      size: 4 + (i % 4),
      opacity: 0.5 + ((i % 5) * 0.08),
      colorIndex: i % 4,
      colorIndex2: (i + 2) % 4,
    }));
  }, []);

  const twinklingStars = useMemo(() => {
    return Array.from({ length: 20 }, (_, i) => ({
      id: i,
      left: (i * 13 + 5) % 100,
      top: (i * 19 + 11) % 100,
      size: 2 + (i % 3),
      delay: (i * 0.11) % 2,
    }));
  }, []);

  return (
    <Box
      component="footer"
      sx={{
        position: 'relative',
        py: 4,
        bgcolor: 'var(--color-primary)',
        overflow: 'hidden',
        '@keyframes fall': {
          '0%': {
            transform: 'translateY(-100vh) rotate(0deg)',
            opacity: 0,
          },
          '10%': {
            opacity: 1,
          },
          '90%': {
            opacity: 1,
          },
          '100%': {
            transform: 'translateY(100vh) rotate(360deg)',
            opacity: 0,
          },
        },
        '@keyframes twinkle': {
          '0%, 100%': {
            opacity: 0.5,
            transform: 'scale(1)',
          },
          '50%': {
            opacity: 1,
            transform: 'scale(1.3)',
          },
        },
      }}
    >
      {/* Falling Stars Background */}
      {stars.map((star) => {
        const themeColors = [
          `rgba(255, 255, 255, ${star.opacity})`,
          `rgba(255, 215, 0, ${star.opacity * 0.9})`,
          `rgba(230, 174, 35, ${star.opacity * 0.7})`, // --color-primary-light
          `rgba(184, 112, 47, ${star.opacity * 0.6})`, // --color-primary
        ];
        const color1 = themeColors[star.colorIndex];
        const color2 = themeColors[star.colorIndex2];
        
        return (
          <Box
            key={star.id}
            sx={{
              position: 'absolute',
              left: `${star.left}%`,
              top: '-20px',
              width: `${star.size}px`,
              height: `${star.size}px`,
              background: `linear-gradient(45deg, ${color1} 0%, ${color2} 50%, ${color1} 100%)`,
              clipPath: 'polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%)',
              animation: `fall ${star.duration}s linear infinite`,
              animationDelay: `${star.delay}s`,
              zIndex: 0,
              pointerEvents: 'none',
              filter: 'drop-shadow(0 0 4px rgba(255, 255, 255, 0.7)) drop-shadow(0 0 8px rgba(255, 215, 0, 0.5))',
            }}
          />
        );
      })}
      
      {/* Additional twinkling stars */}
      {twinklingStars.map((star) => {
        const twinkleColors = [
          'rgba(255, 255, 255, 0.7)',
          'rgba(255, 215, 0, 0.6)',
          'rgba(230, 174, 35, 0.5)',
          'rgba(184, 112, 47, 0.5)',
        ];
        return (
          <Box
            key={`twinkle-${star.id}`}
            sx={{
              position: 'absolute',
              left: `${star.left}%`,
              top: `${star.top}%`,
              width: `${star.size}px`,
              height: `${star.size}px`,
              bgcolor: twinkleColors[star.id % twinkleColors.length],
              borderRadius: '50%',
              animation: 'twinkle 2s ease-in-out infinite',
              animationDelay: `${star.delay}s`,
              zIndex: 0,
              pointerEvents: 'none',
              boxShadow: '0 0 5px rgba(255, 255, 255, 0.5), 0 0 10px rgba(255, 215, 0, 0.3)',
            }}
          />
        );
      })}
      <Container maxWidth="100%" sx={{ position: 'relative', zIndex: 1  }}>
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
        >
          <Grid px={[2,3,5,10]} container gap={2} justifyContent={{ xs: 'center', sm: 'center', md: 'space-between' }} alignItems="flex-start">
            {/* About Section */}
            <Grid  size={{ xs: 12, sm: 12, md: 3, lg: 4 }}  maxWidth={350}>
              <motion.div variants={itemVariants}>
                <Stack 
                  direction="row" 
                  alignItems="center" 
                  justifyContent={{ xs: 'center', md: 'flex-start' }}
                  spacing={1.25} 
                  mb={2}
                >
                  <Box
                    sx={{
                      width: 48,
                      height: 48,
                      borderRadius: '12px',
                      overflow: 'hidden',
                      flexShrink: 0,
                      boxShadow: '0 4px 14px rgba(0,0,0,0.25)',
                      bgcolor: 'rgba(255,255,255,0.12)',
                    }}
                  >
                    <Image
                      src="/logo.jpg"
                      alt={footerTitle}
                      width={48}
                      height={48}
                      style={{ display: 'block', width: '100%', height: '100%', objectFit: 'cover' }}
                    />
                  </Box>
                  <Typography
                    variant="h6"
                    sx={{
                      fontWeight: 700,
                      color: 'white',
                      fontFamily: 'Poppins, sans-serif',
                    }}
                  >
                    {footerTitle}
                  </Typography>
                </Stack>
                <Typography
                  variant="body2"
                  sx={{
                    color: 'rgba(255, 255, 255, 0.9)',
                    lineHeight: 1.7,
                    mb: 3,
                    textAlign: { xs: 'center', md: 'left' },
                  }}
                >
                  {footerSubtitle}
                </Typography>
                <Box sx={{ display: 'flex', gap: 1, justifyContent: { xs: 'center', md: 'flex-start' } }}>
                  {socialLinks.map((social, index) => (
                    <motion.div
                      key={social.label}
                      whileHover={{ scale: 1.1, rotate: 5 }}
                      whileTap={{ scale: 0.9 }}
                      initial={{ opacity: 0, scale: 0 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <IconButton
                        href={social.href}
                        target={social.href.startsWith('mailto:') ? undefined : '_blank'}
                        rel={social.href.startsWith('mailto:') ? undefined : 'noopener noreferrer'}
                        aria-label={social.label}
                        sx={{
                          color: 'white',
                          bgcolor: 'rgba(255, 255, 255, 0.1)',
                          '&:hover': {
                            bgcolor: 'rgba(255, 255, 255, 0.25)',
                            transform: 'translateY(-2px)',
                          },
                          transition: 'all 0.3s ease',
                        }}
                      >
                        <social.Icon />
                      </IconButton>
                    </motion.div>
                  ))}
                </Box>
              </motion.div>
            </Grid>

            {/* Quick Links */}
            <Grid  size={{ xs: 12, sm: 12, md: 3, lg: 2 }}>
              <motion.div variants={itemVariants}>
                <Typography
                  variant="h6"
                  sx={{
                    fontWeight: 600,
                    mb: 2,
                    color: 'white',
                    textAlign: { xs: 'center', md: 'left' },
                  }}
                >
                  {sectionTitles.quickLinks || 'Quick Links'}
                </Typography>
                <Stack spacing={1.5} alignItems={{ xs: 'center', md: 'flex-start' }}>
                  {quickLinks.map((link) => (
                    <Box
                      key={link.name}
                      sx={{
                        position: 'relative',
                        display: 'inline-block',
                      }}
                    >
                      <Link
                        component={link.path?.startsWith('/') ? NextLink : 'a'}
                        href={link.path}
                        underline="none"
                        sx={{
                          color: 'rgba(255, 255, 255, 0.9)',
                          fontSize: '0.95rem',
                          position: 'relative',
                          display: 'inline-block',
                          transition: 'color 0.3s ease',
                          '&:hover': {
                            color: 'white',
                          },
                          '&::after': {
                            content: '""',
                            position: 'absolute',
                            bottom: -4,
                            left: 0,
                            width: 0,
                            height: 2,
                            bgcolor: 'white',
                            transition: 'width 0.3s ease',
                          },
                          '&:hover::after': {
                            width: '100%',
                          },
                        }}
                      >
                        {link.name}
                      </Link>
                    </Box>
                  ))}
                </Stack>
              </motion.div>
            </Grid>

            {/* Contact Us Section */}
            <Grid  size={{ xs: 12, sm: 12, md: 3, lg: 3 }}>
              <motion.div variants={itemVariants}>
                <Typography
                  variant="h6"
                  sx={{
                    fontWeight: 600,
                    mb: 2,
                    color: 'white',
                    textAlign: { xs: 'center', md: 'left' },
                  }}
                >
                  {sectionTitles.contactUs || 'Contact Us'}
                </Typography>
                <Stack spacing={2.5} alignItems={{ xs: 'center', md: 'flex-start' }}>
                  {contactInfo.map((contact, index) => (
                    <motion.div
                      key={contact.label}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <Link
                        href={contact.href}
                        target={contact.href.startsWith('http') ? '_blank' : undefined}
                        underline="none"
                        sx={{
                          display: 'flex',
                          alignItems: 'flex-start',
                          gap: 1.5,
                          color: 'rgba(255, 255, 255, 0.9)',
                          transition: 'all 0.3s ease',
                          justifyContent: { xs: 'center', md: 'flex-start' },
                          '&:hover': {
                            color: 'white',
                            transform: { xs: 'none', md: 'translateX(5px)' },
                          },
                        }}
                      >
                        <Avatar
                          sx={{
                            bgcolor: 'rgba(255, 255, 255, 0.1)',
                            color: 'white',
                            width: 36,
                            height: 36,
                            flexShrink: 0,
                            transition: 'all 0.3s ease',
                          }}
                        >
                          {contact.icon}
                        </Avatar>
                        <Box>
                          <Typography
                            variant="caption"
                            sx={{
                              color: 'rgba(255, 255, 255, 0.7)',
                              fontSize: '0.75rem',
                              display: 'block',
                              mb: 0.5,
                            }}
                          >
                            {contact.label}
                          </Typography>
                          <Typography
                            variant="body2"
                            sx={{
                              color: 'inherit',
                              fontSize: '0.9rem',
                              fontWeight: 500,
                            }}
                          >
                            {contact.value}
                          </Typography>
                        </Box>
                      </Link>
                    </motion.div>
                  ))}
                </Stack>
              </motion.div>
            </Grid>

            {/* Quote Section */}
            {/* <Grid  size={{ xs: 12, sm: 6, md: 3, lg: 3 }}>
              <motion.div variants={itemVariants}>
                <Box
                  sx={{
                    bgcolor: 'rgba(210, 180, 140, 0.3)',
                    p: 3,
                    borderRadius: 2,
                    border: '1px solid rgba(255, 255, 255, 0.2)',
                    backdropFilter: 'blur(10px)',
                    textAlign: 'center',
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                  }}
                >
                  <Typography
                    variant="body2"
                    sx={{
                      color: 'white',
                      fontStyle: 'italic',
                      fontSize: '0.95rem',
                      mb: 1,
                      fontWeight: 500,
                      lineHeight: 1.6,
                    }}
                  >
                    "The best among you are those who learn the Quran and teach it."
                  </Typography>
                  <Typography
                    variant="caption"
                    sx={{
                      color: 'rgba(255, 255, 255, 0.85)',
                      fontSize: '0.8rem',
                    }}
                  >
                    — Prophet Muhammad ﷺ (Sahih Bukhari)
                  </Typography>
                </Box>
              </motion.div>
            </Grid> */}
          </Grid>

          {/* Divider */}
<Divider sx={{
  bgcolor: 'rgba(255, 255, 255, 0.3)',
  my:2
}}/>

          {/* Bottom Section */}
          <Grid 
            container 
            spacing={2} 
            alignItems="center" 
            justifyContent={{ xs: 'center', md: 'space-between' }}
            mx={[1,2,3,5,10]}
          >
            <Grid  size={{ xs: 12, sm: 12, md: 6, lg: 6 }}>
              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
              >
                <Typography
                  variant="body2"
                  sx={{
                    color: 'rgba(255, 255, 255, 0.9)',
                    fontSize: '0.9rem',
                    textAlign: { xs: 'center', md: 'left' },
                  }}
                >
                  {additionalInfo.copyrightText ? (
                    additionalInfo.copyrightText.replace('2025', new Date().getFullYear().toString())
                  ) : (
                    <>
                      Easy Quran Class © {new Date().getFullYear()} Quran For All Academy. Made with{' '}
                      <Favorite
                        sx={{
                          fontSize: 16,
                          color: '#ff0000',
                          verticalAlign: 'middle',
                          mx: 0.5,
                        }}
                      />
                      {' '}for the Ummah
                    </>
                  )}
                </Typography>
              </motion.div>
            </Grid>

            <Grid  size={{ xs: 12, sm: 12, md: 6, lg: 6 }}>
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
              >
                <Box
                  sx={{
                    bgcolor: 'rgba(255, 255, 255, 0.1)',
                    p: 2,
                    borderRadius: 1,
                    display: 'inline-block',
                    textAlign: 'center',
                    width: { xs: '100%', md: 'auto' },
                  }}
                >
                  <Typography
                    variant="body2"
                    sx={{
                      color: 'white',
                      fontStyle: 'italic',
                      fontSize: '0.85rem',
                    }}
                  >
                    "{additionalInfo.quoteText || 'Seek knowledge from the cradle to the grave'}"
                  </Typography>
                </Box>
              </motion.div>
            </Grid>
 
          </Grid>
        </motion.div>
      </Container>
    </Box>
  );
}

export default Footer;
