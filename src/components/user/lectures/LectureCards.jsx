import React, { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { 
  Box, 
  Typography, 
  Grid, 
  Avatar, 
  Card, 
  CardContent, 
  Container,
  Button,
  Stack,
  Dialog,
  DialogContent,
  IconButton,
  Chip,
} from "@mui/material";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import ImportContactsIcon from "@mui/icons-material/ImportContacts";
import LibraryBooksIcon from "@mui/icons-material/LibraryBooks";
import PersonIcon from "@mui/icons-material/Person";
import PlaylistPlayIcon from "@mui/icons-material/PlaylistPlay";
import FilePresentIcon from "@mui/icons-material/FilePresent";
import CloseIcon from "@mui/icons-material/Close";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import { motion } from "framer-motion";
import { useLanguage } from '../../../contexts/LanguageContext';
import PDFDialog from '../notes/PDFDialog';
import LecturesDataJson from './LecturesData.json';

// Icon mapping
const iconMap = {
  MenuBookIcon: MenuBookIcon,
  ImportContactsIcon: ImportContactsIcon,
  LibraryBooksIcon: LibraryBooksIcon,
  PersonIcon: PersonIcon,
};

// Get icon component from icon name
const getIcon = (iconName) => {
  return iconMap[iconName] || MenuBookIcon;
};

const isValidPdfLink = (link) =>
  Boolean(link?.trim() && (link.startsWith('http://') || link.startsWith('https://')));

const LectureCards = () => {
  const router = useRouter();
  const navigate = (path) => router.push(path);
  const { content, lang } = useLanguage();
  const lecturesData = content?.home?.ourLectures || {};
  const urlMapping = content?.navbar?.lecturesDropdown?.lecturesOptions?.urlMapping || {};
  
  const [selectedLecture, setSelectedLecture] = useState(null);
  const [pdfDialogOpen, setPdfDialogOpen] = useState(false);
  const [comingSoonDialogOpen, setComingSoonDialogOpen] = useState(false);
  
  // Get PDF link from LecturesData.json
  const getLecturePdfLink = (lectureName) => {
    const englishLectures = LecturesDataJson['en']?.lectures || [];
    const lecture = englishLectures.find((l) => l.name === lectureName);
    return lecture?.pdf_link || lecture?.pdfLink || '';
  };
  
  // Map lectures from JSON to services format with additional styling
  // Display all cards
  const services = lecturesData.lectures?.map((lecture) => {
    const lectureName = urlMapping[lecture.title] || lecture.title.toLowerCase().replace(/\s+/g, '-');
    return {
      name: lectureName,
      title: lecture.title,
      desc: lecture.description,
      icon: getIcon(lecture.icon),
      gradient: "linear-gradient(135deg, #b8702f 0%, #a25e26 100%)",
      color: "#b8702f",
      pdfLink: getLecturePdfLink(lectureName),
    };
  }) || [];

  // Generate random stars with different properties (memoized to prevent regeneration)
  const stars = useMemo(() => {
    const starCount = 15;
    return Array.from({ length: starCount }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      delay: Math.random() * 5,
      duration: 3 + Math.random() * 4, // 3-7 seconds
      size: 4 + Math.random() * 4, // 4-8px
      opacity: 0.5 + Math.random() * 0.4, // 0.5-0.9
    }));
  }, []);

  // Generate twinkling stars positions (memoized)
  const twinklingStars = useMemo(() => {
    return Array.from({ length: 20 }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      top: Math.random() * 100,
      size: 2 + Math.random() * 3, // 2-5px
      delay: Math.random() * 2,
    }));
  }, []);

  const handleCardClick = (lectureName) => {
    navigate(`/lectures/${lectureName}`);
  };

  const handleViewPlaylist = (e, lectureName) => {
    e.stopPropagation(); // Prevent card click
    navigate(`/lectures/${lectureName}`);
  };

  const handleOpenPdf = (e, service) => {
    e.stopPropagation(); // Prevent card click
    setSelectedLecture(service);
    
    // Check if PDF link exists and is valid
    const hasValidPdf = service.pdfLink && 
                       service.pdfLink.trim() !== '' && 
                       (service.pdfLink.startsWith('http://') || service.pdfLink.startsWith('https://'));
    
    if (hasValidPdf) {
      setPdfDialogOpen(true);
    } else {
      setComingSoonDialogOpen(true);
    }
  };

  const handleClosePdfDialog = () => {
    setPdfDialogOpen(false);
    setSelectedLecture(null);
  };

  const handleCloseComingSoonDialog = () => {
    setComingSoonDialogOpen(false);
    setSelectedLecture(null);
  };

  return (
    <Box
    mt={5}
      sx={{
        py: { xs: 6, md: 10 },
        background: "linear-gradient(135deg, #faf6f2 0%, #ffffff 50%, #faf6f2 100%)",
        position: "relative",
        overflow: "hidden",
        minHeight: "100vh",
        "@keyframes fall": {
          "0%": {
            transform: "translateY(-100vh) rotate(0deg)",
            opacity: 0,
          },
          "10%": {
            opacity: 1,
          },
          "90%": {
            opacity: 1,
          },
          "100%": {
            transform: "translateY(100vh) rotate(360deg)",
            opacity: 0,
          },
        },
        "@keyframes twinkle": {
          "0%, 100%": {
            opacity: 0.5,
            transform: "scale(1)",
          },
          "50%": {
            opacity: 1,
            transform: "scale(1.3)",
          },
        },
        "&::before": {
          content: '""',
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: "radial-gradient(circle at 20% 50%, rgba(184, 112, 47, 0.05) 0%, transparent 50%), radial-gradient(circle at 80% 80%, rgba(184, 112, 47, 0.05) 0%, transparent 50%)",
          pointerEvents: "none",
          zIndex: 0,
        },
      }}
    >
      {/* Falling Stars Background */}
      {stars.map((star) => {
        // Theme colors using --color-primary variations
        const themeColors = [
          `rgba(184, 112, 47, ${star.opacity})`, // --color-primary
          `rgba(162, 94, 38, ${star.opacity * 0.9})`, // --color-primary-hover
          `rgba(230, 174, 35, ${star.opacity * 0.8})`, // --color-primary-light
          `rgba(184, 112, 47, ${star.opacity * 0.7})`, // --color-primary darker
        ];
        const color1 = themeColors[Math.floor(Math.random() * themeColors.length)];
        const color2 = themeColors[Math.floor(Math.random() * themeColors.length)];
        
        return (
          <Box
            key={star.id}
            sx={{
              position: "absolute",
              left: `${star.left}%`,
              top: "-20px",
              width: `${star.size}px`,
              height: `${star.size}px`,
              background: `linear-gradient(45deg, ${color1} 0%, ${color2} 50%, ${color1} 100%)`,
              clipPath: "polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%)",
              animation: `fall ${star.duration}s linear infinite`,
              animationDelay: `${star.delay}s`,
              zIndex: 0,
              pointerEvents: "none",
              filter: "drop-shadow(0 0 4px rgba(184, 112, 47, 0.7)) drop-shadow(0 0 8px rgba(230, 174, 35, 0.5))",
            }}
          />
        );
      })}
      
      {/* Additional twinkling stars */}
      {twinklingStars.map((star) => {
        const twinkleColors = [
          "rgba(184, 112, 47, 0.7)", // --color-primary
          "rgba(162, 94, 38, 0.6)", // --color-primary-hover
          "rgba(230, 174, 35, 0.5)", // --color-primary-light
          "rgba(184, 112, 47, 0.5)", // --color-primary darker
        ];
        return (
          <Box
            key={`twinkle-${star.id}`}
            sx={{
              position: "absolute",
              left: `${star.left}%`,
              top: `${star.top}%`,
              width: `${star.size}px`,
              height: `${star.size}px`,
              bgcolor: twinkleColors[star.id % twinkleColors.length],
              borderRadius: "50%",
              animation: "twinkle 2s ease-in-out infinite",
              animationDelay: `${star.delay}s`,
              zIndex: 0,
              pointerEvents: "none",
              boxShadow: "0 0 5px rgba(184, 112, 47, 0.5), 0 0 10px rgba(230, 174, 35, 0.3)",
            }}
          />
        );
      })}
      <Container maxWidth="xlg" sx={{ position: "relative", zIndex: 1 }}>
        {/* Header */}
        <Box
          sx={{
            textAlign: "center",
            mb: { xs: 5, md: 8 },
            animation: "fadeInDown 0.8s ease-out",
            "@keyframes fadeInDown": {
              from: {
                opacity: 0,
                transform: "translateY(-30px)",
              },
              to: {
                opacity: 1,
                transform: "translateY(0)",
              },
            },
          }}
        >
          <Typography
            variant="h3"
            fontWeight={800}
            sx={{
              mb: 2,
              fontSize: { xs: "1.75rem", sm: "2.25rem", md: "2.75rem" },
              color: "var(--color-primary)",
              background: "linear-gradient(135deg, #b8702f 0%, #a25e26 100%)",
              backgroundClip: "text",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
           {lecturesData.title}
          </Typography>
          <Typography
            variant="body1"
            color="text.secondary"
            sx={{
              maxWidth: 700,
              mx: "auto",
              fontSize: { xs: "0.95rem", md: "1.05rem" },
              lineHeight: 1.7,
            }}
          >
            {lecturesData.subtitle}
          </Typography>
        </Box>

        {/* Services Grid */}
        <Grid container spacing={4} justifyContent="center" mx={[1,2,3,5,10]}>
          {services.map((service, index) => {
            const IconComponent = service.icon;
            return (
              <Grid
              size={{ xs: 12, sm: 6, md: 3 }}
                key={service.name}
                sx={{
                  animation: `fadeInUp 0.6s ease-out ${index * 0.1}s both`,
                  "@keyframes fadeInUp": {
                    from: {
                      opacity: 0,
                      transform: "translateY(30px)",
                    },
                    to: {
                      opacity: 1,
                      transform: "translateY(0)",
                    },
                  },
                }}
              >
                <Card
                  onClick={() => handleCardClick(service.name)}
                  sx={{
                    height: "100%",
                    borderRadius: 4,
                    border: "1px solid #e0e0e0",
                    background: "white",
                    position: "relative",
                    overflow: "hidden",
                    transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
                    boxShadow: "0 4px 20px rgba(0, 0, 0, 0.08)",
                    cursor: "pointer",
                    "&::before": {
                      content: '""',
                      position: "absolute",
                      top: 0,
                      left: 0,
                      right: 0,
                      height: "4px",
                      background: service.gradient,
                      opacity: 0,
                      transition: "opacity 0.4s ease",
                    },
                    "&::after": {
                      content: '""',
                      position: "absolute",
                      top: 0,
                      right: 0,
                      width: "60px",
                      height: "60px",
                      background: service.gradient,
                      borderRadius: "0 0 0 100%",
                      opacity: 0.1,
                      transition: "opacity 0.4s ease",
                    },
                    "&:hover": {
                      transform: "translateY(-12px) scale(1.02)",
                      boxShadow: `0 20px 40px ${service.color}30`,
                      borderColor: service.color,
                      "&::before": {
                        opacity: 1,
                      },
                      "&::after": {
                        opacity: 0.15,
                      },
                      "& .service-icon": {
                        transform: "scale(1.15) rotate(5deg)",
                        bgcolor: service.color,
                        color: "white",
                        boxShadow: `0 8px 25px ${service.color}40`,
                      },
                    },
                  }}
                >
                  <CardContent
                    sx={{
                      p: { xs: 3, md: 4 },
                      textAlign: "center",
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      minHeight: { xs: 240, md: 280 },
                    }}
                  >
                    <Avatar
                      className="service-icon"
                      sx={{
                        width: { xs: 70, md: 80 },
                        height: { xs: 70, md: 80 },
                        mb: 3,
                        bgcolor: `${service.color}15`,
                        color: service.color,
                        transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
                        boxShadow: `0 4px 15px ${service.color}25`,
                        position: "relative",
                        "&::before": {
                          content: '""',
                          position: "absolute",
                          inset: "-8px",
                          borderRadius: "50%",
                          background: `radial-gradient(circle, ${service.color}20 0%, transparent 70%)`,
                          opacity: 0,
                          transition: "opacity 0.4s ease",
                        },
                      }}
                    >
                      <IconComponent sx={{ fontSize: { xs: 32, md: 36 } }} />
                    </Avatar>
                    <Typography
                      variant="h6"
                      fontWeight={700}
                      sx={{
                        mb: 2,
                        color: "#2c3e50",
                        fontSize: { xs: "1.1rem", md: "1.25rem" },
                        lineHeight: 1.3,
                      }}
                    >
                      {service.title}
                    </Typography>
                    <Typography
                      variant="body2"
                      color="text.secondary"
                      sx={{
                        lineHeight: 1.7,
                        fontSize: { xs: "0.875rem", md: "0.95rem" },
                        mb: 3,
                        flex: 1,
                      }}
                    >
                      {service.desc}
                    </Typography>

                    {/* Action Buttons */}
                    <Stack direction="row" spacing={1} sx={{ width: '100%' }}>
                      <Button
                        variant="contained"
                        size="small"
                        startIcon={<PlaylistPlayIcon />}
                        onClick={(e) => handleViewPlaylist(e, service.name)}
                        sx={{
                          flex: 1,
                          bgcolor: 'var(--color-primary)',
                          color: 'white',
                          textTransform: 'none',
                          fontWeight: 600,
                          fontSize: { xs: '0.8rem', md: '0.7rem' },
                          // py: 1,
                          '&:hover': {
                            bgcolor: 'var(--color-primary-hover)',
                          },
                        }}
                      >
                        {lang === 'ur' ? 'پلے لسٹ دیکھیں' : 'View Playlist'}
                      </Button>
                      {isValidPdfLink(service.pdfLink) && (
                      <Button
                        variant="outlined"
                        size="small"
                        startIcon={<FilePresentIcon />}
                        onClick={(e) => handleOpenPdf(e, service)}
                        sx={{
                          flex: 1,
                          borderColor: 'var(--color-primary)',
                          color: 'var(--color-primary)',
                          textTransform: 'none',
                          fontWeight: 600,
                          fontSize: { xs: '0.8rem', md: '0.7rem' },
                          // py: 1,
                          '&:hover': {
                            borderColor: 'var(--color-primary-hover)',
                            backgroundColor: 'rgba(184, 112, 47, 0.1)',
                          },
                        }}
                      >
                        {lang === 'ur' ? 'PDF کھولیں' : 'Open PDF'}
                      </Button>
                      )}
                    </Stack>
                  </CardContent>
                </Card>
              </Grid>
            );
          })}
        </Grid>
      </Container>

      {/* PDF Dialog */}
      {selectedLecture && selectedLecture.pdfLink && 
       selectedLecture.pdfLink.trim() !== '' && 
       (selectedLecture.pdfLink.startsWith('http://') || selectedLecture.pdfLink.startsWith('https://')) && (
        <PDFDialog
          open={pdfDialogOpen}
          onClose={handleClosePdfDialog}
          pdfUrl={selectedLecture.pdfLink}
          title={selectedLecture.title}
        />
      )}

      {/* Coming Soon Dialog */}
      <Dialog
        open={comingSoonDialogOpen}
        onClose={handleCloseComingSoonDialog}
        maxWidth="md"
        fullWidth
        sx={{
          '& .MuiDialog-paper': {
            borderRadius: 4,
            overflow: 'hidden',
          },
        }}
      >
        <DialogContent sx={{ p: 0, position: 'relative' }}>
          <IconButton
            onClick={handleCloseComingSoonDialog}
            sx={{
              position: 'absolute',
              top: 16,
              right: 16,
              zIndex: 1000,
              backgroundColor: 'rgba(0, 0, 0, 0.7)',
              color: 'white',
              '&:hover': {
                backgroundColor: 'rgba(0, 0, 0, 0.9)',
              },
            }}
          >
            <CloseIcon />
          </IconButton>

          <Card
            sx={{
              borderRadius: 0,
              overflow: 'hidden',
              boxShadow: 'none',
              background: 'linear-gradient(135deg, #ffffff 0%, #faf6f2 100%)',
              border: '1px solid rgba(184, 112, 47, 0.2)',
              position: 'relative',
              '&::before': {
                content: '""',
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                height: '4px',
                background: 'linear-gradient(90deg, var(--color-primary) 0%, var(--color-primary-light) 100%)',
              },
            }}
          >
            <CardContent sx={{ p: { xs: 4, md: 6 }, textAlign: 'center' }}>
              <motion.div
                animate={{
                  scale: [1, 1.1, 1],
                  rotate: [0, 5, -5, 0],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  repeatDelay: 1,
                }}
              >
                <Box
                  sx={{
                    width: 120,
                    height: 120,
                    mx: 'auto',
                    mb: 3,
                    borderRadius: '50%',
                    background: 'linear-gradient(135deg, var(--color-primary) 0%, var(--color-primary-light) 100%)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    boxShadow: '0 8px 24px rgba(184, 112, 47, 0.3)',
                  }}
                >
                  <AccessTimeIcon sx={{ fontSize: 60, color: 'white' }} />
                </Box>
              </motion.div>

              <Typography
                variant="h4"
                fontWeight={800}
                sx={{
                  mb: 1,
                  color: 'var(--color-primary)',
                  fontSize: { xs: '1.75rem', md: '2.5rem' },
                }}
              >
                {selectedLecture?.title}
              </Typography>

              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.3, type: 'spring', stiffness: 200 }}
              >
                <Chip
                  label={lang === 'ur' ? 'جلد آرہا ہے' : 'Coming Soon'}
                  sx={{
                    bgcolor: 'var(--color-primary)',
                    color: 'white',
                    fontSize: '1rem',
                    fontWeight: 700,
                    px: 3,
                    py: 2,
                    height: 'auto',
                    mb: 4,
                    boxShadow: '0 4px 12px rgba(184, 112, 47, 0.4)',
                    '& .MuiChip-label': {
                      px: 2,
                    },
                  }}
                />
              </motion.div>

              <Typography
                variant="body1"
                sx={{
                  color: 'text.secondary',
                  fontSize: { xs: '1rem', md: '1.1rem' },
                  lineHeight: 1.8,
                  maxWidth: 600,
                  mx: 'auto',
                  mb: 4,
                }}
              >
                {lang === 'ur'
                  ? 'ہم اس لیکچر کے لیے مکمل PDF دستاویزات لانے کے لیے محنت کر رہے ہیں۔ براہ کرم اپ ڈیٹس کے لیے جلد واپس چیک کریں!'
                  : 'We are working hard to bring you the complete PDF document for this lecture. Please check back soon for updates!'}
              </Typography>

              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'center',
                  gap: 2,
                  mt: 4,
                }}
              >
                {[1, 2, 3].map((i) => (
                  <motion.div
                    key={i}
                    animate={{
                      y: [0, -10, 0],
                      opacity: [0.5, 1, 0.5],
                    }}
                    transition={{
                      duration: 1.5,
                      repeat: Infinity,
                      delay: i * 0.2,
                    }}
                  >
                    <Box
                      sx={{
                        width: 12,
                        height: 12,
                        borderRadius: '50%',
                        bgcolor: 'var(--color-primary)',
                        opacity: 0.6,
                      }}
                    />
                  </motion.div>
                ))}
              </Box>
            </CardContent>
          </Card>
        </DialogContent>
      </Dialog>
    </Box>
  );
};

export default LectureCards;