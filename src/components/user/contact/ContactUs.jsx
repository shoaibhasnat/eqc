'use client';

// src/components/user/ContactUs.jsx
import React from "react";
import {
  Box,
  Container,
  Typography,
  Stack,
  Card,
  CardContent,
  Grid,
  Link,
  Chip,
  Avatar,
} from "@mui/material";
import PhoneRoundedIcon from "@mui/icons-material/PhoneRounded";
import EmailRoundedIcon from "@mui/icons-material/EmailRounded";
import LanguageRoundedIcon from "@mui/icons-material/LanguageRounded";
import YouTubeIcon from "@mui/icons-material/YouTube";
import LocationOnRoundedIcon from "@mui/icons-material/LocationOnRounded"; 
import LocationOnIcon from '@mui/icons-material/LocationOn';
import PhoneIcon from '@mui/icons-material/Phone';
import EmailIcon from '@mui/icons-material/Email'; 
import ContactForm from "./ContactForm";
import MapSection from "./MapSection";
import { useLanguage } from '../../../contexts/LanguageContext';
import PageFaq from '@/components/seo/PageFaq';
import { CONTACT_FAQS } from '@/lib/faqs';

// Icon mapping
const iconMap = {
  LocationOnRoundedIcon: LocationOnRoundedIcon,
  LocationOnIcon: LocationOnIcon,
  PhoneRoundedIcon: PhoneRoundedIcon,
  PhoneIcon: PhoneIcon,
  EmailRoundedIcon: EmailRoundedIcon,
  EmailIcon: EmailIcon,
  YouTubeIcon: YouTubeIcon,
  LanguageRoundedIcon: LanguageRoundedIcon,
};

function ContactUs() {
  const { content } = useLanguage();
  const contactInfoData = content?.contact?.contactInfo || {};
  const heading = contactInfoData.heading || 'Easy Quran Class';
  const description = contactInfoData.description || '';
  const contactItemsData = contactInfoData.contactItems || [];

  // Map contact items from JSON and add icon components
  const contactItems = contactItemsData.map((item) => {
    const IconComponent = iconMap[item.icon] || LocationOnIcon;
    return {
      icon: <IconComponent />,
      title: item.title,
      line1: item.line1,
      color: item.color,
      gradient: item.gradient,
      link: item.link,
    };
  });
 
  return (
    <> 
      
      {/* Introduction Section */}
      <Box mt={[15]}
        sx={{
          
          // py: { xs: 6, md: 8 },
          background: "linear-gradient(135deg, #f8f9fa 0%, #ffffff 100%)",
        }}
      > 
      <Container maxWidth="5xlg">
        {/* Section Header */}
        <Box sx={{ textAlign: 'center', mb: 6 }}>
      
          <Typography
            variant="h3"
            component="h1"
            sx={{
              fontWeight: 800,
              mb: 2,
              color: "var(--color-primary)",
              fontSize: { xs: "2rem", md: "3rem" },
            }}
          >
            {heading}
          </Typography>
          <Typography
            variant="h6"
            color="text.secondary"
            sx={{
              maxWidth: "700px",
              mx: "auto",
              fontSize: { xs: "1rem", md: "1.2rem" },
              lineHeight: 1.7,
              fontStyle: "italic",
            }}
          >
            {description}
          </Typography>
        </Box>

        {/* Contact Info Cards */}
        <Grid justifyContent={'center'} container spacing={4}  sx={{ mb: { xs: 6, md: 8 } }}>
          {contactItems.map((item, index) => (
            <Grid size={{ xs: 12, sm: 6, md: 4, lg: 2 }} key={index}>
              <Card
                component={item.link ? Link : 'div'}
                href={item.link}
                target={item.link?.startsWith('http') ? '_blank' : undefined}
                sx={{
                  height: '100%',
                  borderRadius: 4,
                  border: '1px solid #e0e0e0',
                  background: 'white',
                  transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                  position: 'relative',
                  overflow: 'hidden',
                  textDecoration: 'none',
                  cursor: item.link ? 'pointer' : 'default',
                  '&:hover': {
                    transform: 'translateY(-10px)',
                    boxShadow: `0 20px 40px ${item.color}25`,
                    borderColor: item.color,
                    '& .contact-icon': {
                      transform: 'scale(1.1) rotate(5deg)',
                      bgcolor: item.color,
                      color: 'white',
                    },
                  },
                  '&::before': {
                    content: '""',
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    height: '4px',
                    background: item.gradient,
                    opacity: 0,
                    transition: 'opacity 0.4s ease',
                  },
                  '&:hover::before': {
                    opacity: 1,
                  },
                }}
              >
                <CardContent sx={{ p: 4, textAlign: 'center' }}>
                  <Avatar
                    className="contact-icon"
                    sx={{
                      width: 80,
                      height: 80,
                      mx: 'auto',
                      mb: 2,
                      bgcolor: `${item.color}15`,
                      color: item.color,
                      transition: 'all 0.4s ease',
                    }}
                  >
                    {item.icon}
                  </Avatar>
                  <Typography 
                    variant="h6" 
                    fontWeight={700} 
                    sx={{ 
                      mb: 2,
                      color: 'var(--color-primary)',
                      fontSize: { xs: '1.1rem', md: '1.25rem' },
                    }}
                  >
                    {item.title}
                  </Typography>
                  <Stack spacing={0.5}>
                    <Typography 
                      variant="body1" 
                      sx={{ 
                        color: 'text.primary',
                        fontWeight: 500,
                      }}
                    >
                      {item.line1}
                    </Typography>
                    <Typography 
                      variant="body2" 
                      sx={{ 
                        color: 'text.secondary',
                      }}
                    >
                      {item.line2}
                    </Typography>
                  </Stack>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>

      </Box>



      <ContactForm />
      <PageFaq
        title="Enrollment Questions"
        subtitle="How to contact Easy Quran Class and start online Quran classes."
        faqs={CONTACT_FAQS}
      />
      <MapSection /> 
    </>
  );
}

export default ContactUs;
