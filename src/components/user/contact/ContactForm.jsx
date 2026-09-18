import React from 'react';
import { useState } from 'react';
import {
  Box,
  Container,
  Grid,
  Typography,
  TextField,
  Button,
  Avatar,
  Stack,
  Card,
  CardContent,
  Chip,
  Alert,
  CircularProgress,
  Snackbar,
} from '@mui/material'; 
import SendRoundedIcon from '@mui/icons-material/SendRounded';
import CheckCircleRoundedIcon from '@mui/icons-material/CheckCircleRounded';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import { useLanguage } from '../../../contexts/LanguageContext';

const ContactForm = () => {
  const { content } = useLanguage();
  const contactFormData = content?.contact?.contactForm || {};
  const {
    sectionTitle,
    sectionSubtitle ,
    contactTitle ,
    contactSubtitle  ,
    chipTexts ,
    formTitle ,
    formFields ,
    validationMessages ,
    successMessage ,
  } = contactFormData;

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState({ open: false, message: '', severity: 'success' });

  // Validation logic
  const validate = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = validationMessages.nameRequired || "Full name is required";
    }

    if (!formData.email.trim()) {
      newErrors.email = validationMessages.emailRequired || "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = validationMessages.emailInvalid || "Enter a valid email address";
    }

    if (!formData.message.trim()) {
      newErrors.message = validationMessages.messageRequired || "Message cannot be empty";
    } else if (formData.message.length < 10) {
      newErrors.message = validationMessages.messageTooShort || "Message should be at least 10 characters";
    }

    return newErrors;
  };

  // Handle input change
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Handle form submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate();
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      setLoading(true);
      setSubmitted(false);
      
      try {
        const response = await fetch('/api/contact', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            name: formData.name,
            email: formData.email,
            message: formData.message,
          }),
        });

        const result = await response.json();

        if (!response.ok || !result.ok) {
          throw new Error(result.message || 'Failed to send message');
        }

        setAlert({
          open: true,
          message: successMessage || "Your message has been sent successfully! We'll get back to you soon.",
          severity: 'success'
        });
        setFormData({ name: "", email: "", message: "" });
        setErrors({});
        setSubmitted(true);
      } catch (error) {
        console.error('Contact form error:', error);
        setAlert({
          open: true,
          message: 'Failed to send message. Please try again later or contact us directly.',
          severity: 'error'
        });
      } finally {
        setLoading(false);
      }
    } else {
      setSubmitted(false);
    }
  };

  // Handle alert close
  const handleCloseAlert = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setAlert({ ...alert, open: false });
  };
  return (
    <Box id="contact-form"
      sx={{ 
        py: { xs: 6, md: 10 },
        background: 'linear-gradient(135deg, #f8f9fa 0%, #ffffff 50%, #f8f9fa 100%)',
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
      <Container maxWidth="lg">
  

        {/* Form Section */}
        <Box sx={{ maxWidth: 1200, mx: 'auto' }}>
          <Box sx={{ textAlign: 'center', mb: 5 }}>
            <Typography 
              variant="h3" 
              fontWeight={800} 
              sx={{ 
                mb: 2,
                color: 'var(--color-primary)',
                fontSize: { xs: '2rem', md: '2.5rem' },
              }}
            >
              {sectionTitle}
            </Typography>
            <Typography 
              variant="h6" 
              color="text.secondary"
              sx={{
                maxWidth: '600px',
                mx: 'auto',
                fontSize: { xs: '1rem', md: '1.1rem' },
                lineHeight: 1.7,
              }}
            >
              {sectionSubtitle}
            </Typography>
          </Box>

          <Card
            sx={{
              borderRadius: 4,
              border: '1px solid #e0e0e0',
              boxShadow: '0 10px 40px rgba(0,0,0,0.08)',
              background: 'white',
              overflow: 'hidden',
            }}
          >
            <Grid container spacing={4} justifyContent="center" alignItems="center">
              {/* Left Side - Image */}
              <Grid  size={{ xs: 12, sm: 6, md: 6, lg: 6 }}>
                <Box
                  sx={{
                    height: { xs: 300, md: '100%' },
                    minHeight: { md: 600 },
                    backgroundImage: 'url(/images/home-banner.jpg)',
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    position: 'relative',
                    '&::before': {
                      content: '""',
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      right: 0,
                      bottom: 0,
                      background: 'linear-gradient(135deg, rgba(184, 111, 47, 0.42) 0%, rgba(184, 111, 47, 0.28) 100%)',
                    },
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    p: 4,
                  }}
                >
                  <Box sx={{ position: 'relative', zIndex: 1, textAlign: 'center', color: 'white' }}>
                    <Typography
                      variant="h4"
                      fontWeight={800}
                      sx={{ mb: 2, fontSize: { xs: '1.8rem', md: '2.5rem' } }}
                    >
                      {contactTitle}
                    </Typography>
                    <Typography
                      variant="h6"
                      sx={{
                        mb: 3,
                        opacity: 0.95,
                        fontSize: { xs: '1rem', md: '1.2rem' },
                        lineHeight: 1.7,
                      }}
                    >
                      {contactSubtitle}
                    </Typography>
                    <Stack direction="row" spacing={2} justifyContent="center" flexWrap="wrap">
                      {chipTexts.map((chip) => (
                        <Chip
                          key={chip}
                          label={chip}
                          sx={{
                            bgcolor: 'rgba(255,255,255,0.2)',
                            color: 'white',
                            fontWeight: 600,
                            backdropFilter: 'blur(10px)',
                          }}
                        />
                      ))}
                    </Stack>
                  </Box>
                </Box>
              </Grid>

              {/* Right Side - Form */}
              <Grid  size={{ xs: 12, sm: 6, md: 6, lg: 6 }}>
                <CardContent sx={{ p: { xs: 3, md: 5 } }}>
                  <Typography
                    variant="h5"
                    fontWeight={700}
                    sx={{
                      mb: 3,
                      color: 'var(--color-primary)',
                      fontSize: { xs: '1.5rem', md: '1.8rem' },
                    }}
                  >
                    {formTitle}
                  </Typography>
                    <Box
                      component="form"
                      id="contact-form"
                      noValidate
                      autoComplete="on"
                      onSubmit={handleSubmit}
                  >
                    <Stack spacing={3}>
                      <TextField
                        fullWidth
                        required
                        size="small"
                        id="contact-name"
                        name="name"
                        autoComplete="name"
                        label={formFields.name || "Full Name"}
                        variant="outlined"
                        value={formData.name}
                        onChange={handleChange}
                        error={!!errors.name}
                        helperText={errors.name}
                        disabled={loading}
                        sx={{
                          '& .MuiOutlinedInput-root': {
                            borderRadius: 2,
                            bgcolor: '#f8f9fa',
                            transition: 'all 0.3s ease',
                            '&:hover': {
                              bgcolor: '#f0f0f0',
                            },
                            '&.Mui-focused': {
                              bgcolor: 'white',
                              boxShadow: '0 0 0 3px var(--color-primary)15',
                            },
                          },
                        }}
                      />

                      <TextField
                        fullWidth
                        required
                        size="small"
                        id="contact-email"
                        name="email"
                        autoComplete="email"
                        label={formFields.email || "Email Address"}
                        variant="outlined"
                        type="email"
                        value={formData.email}
                        onChange={handleChange}
                        error={!!errors.email}
                        helperText={errors.email}
                        disabled={loading}
                        sx={{
                          '& .MuiOutlinedInput-root': {
                            borderRadius: 2,
                            bgcolor: '#f8f9fa',
                            transition: 'all 0.3s ease',
                            '&:hover': {
                              bgcolor: '#f0f0f0',
                            },
                            '&.Mui-focused': {
                              bgcolor: 'white',
                              boxShadow: '0 0 0 3px var(--color-primary)15',
                            },
                          },
                        }}
                      />

                      <TextField
                        fullWidth
                        required
                        size="small"
                        id="contact-message"
                        name="message"
                        label={formFields.message || "Your Message"}
                        variant="outlined"
                        multiline
                        rows={6}
                        value={formData.message}
                        onChange={handleChange}
                        error={!!errors.message}
                        helperText={errors.message}
                        disabled={loading}
                        sx={{
                          '& .MuiOutlinedInput-root': {
                            borderRadius: 2,
                            bgcolor: '#f8f9fa',
                            transition: 'all 0.3s ease',
                            '&:hover': {
                              bgcolor: '#f0f0f0',
                            },
                            '&.Mui-focused': {
                              bgcolor: 'white',
                              boxShadow: '0 0 0 3px var(--color-primary)15',
                            },
                          },
                        }}
                      />

                      <Button
                        type="submit"
                        variant="contained"
                        size="small"
                        endIcon={loading ? <CircularProgress size={20} color="inherit" /> : <SendRoundedIcon />}
                        fullWidth
                        disabled={loading}
                        sx={{
                          bgcolor: 'var(--color-primary)',
                          color: 'white',
                          fontWeight: 700,
                          py: 1,
                          borderRadius: 2,
                          textTransform: 'none',
                          fontSize: '1rem',
                          boxShadow: 'none',
                          transition: 'all 0.3s ease',
                          '&:hover': {
                            bgcolor: '#a25e26',
                            transform: loading ? 'none' : 'translateY(-2px)',
                            boxShadow: loading ? 'none' : '0 8px 20px var(--color-primary)40',
                          },
                          '&:disabled': {
                            bgcolor: 'var(--color-primary)',
                            opacity: 0.7,
                          },
                        }}
                      >
                        {loading ? 'Sending...' : (formFields.submit || "Send Message")}
                      </Button>
                    </Stack>

                  </Box>
                </CardContent>
              </Grid>
            </Grid>
          </Card>
        </Box>
      </Container>

      {/* Beautiful Snackbar Alert */}
      <Snackbar
        open={alert.open}
        autoHideDuration={6000}
        onClose={handleCloseAlert}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        sx={{
          mt: 8,
        }}
      >
        <Alert
          onClose={handleCloseAlert}
          severity={alert.severity}
          variant="filled"
          icon={alert.severity === 'success' ? <CheckCircleRoundedIcon /> : <ErrorOutlineIcon />}
          sx={{
            width: '100%',
            fontSize: '1rem',
            fontWeight: 600,
            borderRadius: 2,
            boxShadow: '0 8px 24px rgba(0,0,0,0.15)',
            '& .MuiAlert-icon': {
              fontSize: '1.5rem',
            },
            ...(alert.severity === 'success' && {
              bgcolor: '#4CAF50',
              '&:hover': {
                bgcolor: '#45a049',
              },
            }),
            ...(alert.severity === 'error' && {
              bgcolor: '#f44336',
              '&:hover': {
                bgcolor: '#da190b',
              },
            }),
          }}
        >
          {alert.message}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default ContactForm;