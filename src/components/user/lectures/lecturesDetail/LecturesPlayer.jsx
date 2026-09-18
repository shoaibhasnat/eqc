"use client";

import React, { useState, useEffect, useMemo } from "react";
import { useParams } from "next/navigation";
import {
  Box,
  Stack,
  Card,
  CardMedia,
  CardContent,
  Typography,
  IconButton,
  Chip,
  Divider,
  Menu,
  MenuItem,
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  Button,
  InputAdornment,
  Alert,
  Tooltip,
} from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import ShareIcon from "@mui/icons-material/Share";
import YouTubeIcon from "@mui/icons-material/YouTube";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CloseIcon from "@mui/icons-material/Close";
import FilePresentIcon from "@mui/icons-material/FilePresent";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import { motion } from "framer-motion";
import LecturesDataJson from "../LecturesData.json";
import { useLanguage } from "../../../../contexts/LanguageContext";
import PDFDialog from '../../notes/PDFDialog'; 

// Helper function to extract video_id from video_link
const extractVideoId = (video) => {
  if (video.video_id) {
    return video.video_id;
  }
  if (video.video_link) {
    const match = video.video_link.match(/[?&]v=([^&]+)/);
    if (match) return match[1];
  }
  return null;
};

export default function LecturesPlayer() {
  const params = useParams();
  const lectureName = params?.name || "";
  const { lang } = useLanguage();

  // Find the lecture data that matches the name
  const lectureData = useMemo(() => {
    // URLs always use English names, so find the lecture in English version first
    const englishLectures = LecturesDataJson['en']?.lectures || [];
    const lectureIndex = englishLectures.findIndex((l) => l.name === lectureName);
    
    if (lectureIndex === -1) {
      // If not found in English, return null
      return null;
    }
    
    // Get the corresponding lecture from the selected language
    const currentLang = lang === 'ur' ? 'ur' : 'en';
    const lecturesData = LecturesDataJson[currentLang]?.lectures || [];
    const lecture = lecturesData[lectureIndex];
    
    if (!lecture) {
      return null;
    }
    
    // Process videos to ensure video_id is available (don't filter, show all videos)
    const processedVideos = lecture.videos.map((video) => ({
      ...video,
      video_id: extractVideoId(video),
    }));
    
    return {
      ...lecture,
      videos: processedVideos,
    };
  }, [lectureName, lang]);

  const [selectedVideo, setSelectedVideo] = useState(
    lectureData?.videos && lectureData.videos.length > 0 ? lectureData.videos[0] : null
  );
  const [menuAnchorEl, setMenuAnchorEl] = useState(null);
  const [shareDialogOpen, setShareDialogOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const [currentVideoForMenu, setCurrentVideoForMenu] = useState(null);
  const [videoForShare, setVideoForShare] = useState(null);
  const [pdfDialogOpen, setPdfDialogOpen] = useState(false);
  const [comingSoonDialogOpen, setComingSoonDialogOpen] = useState(false);

  // Update selected video when lecture data changes
  useEffect(() => {
    if (lectureData?.videos && lectureData.videos.length > 0) {
      setSelectedVideo(lectureData.videos[0]);
    }
  }, [lectureData]);

  // Menu handlers
  const handleMenuClick = (event, video) => {
    event.stopPropagation(); // Prevent card click
    setMenuAnchorEl(event.currentTarget);
    setCurrentVideoForMenu(video);
  };

  const handleMenuClose = () => {
    setMenuAnchorEl(null);
    setCurrentVideoForMenu(null);
  };

  const handleShareClick = () => {
    // Store the video before closing menu
    if (currentVideoForMenu) {
      setVideoForShare(currentVideoForMenu);
    }
    handleMenuClose();
    setShareDialogOpen(true);
  };

  const handleViewOnYouTube = () => {
    const videoToOpen = currentVideoForMenu;
    handleMenuClose();
    if (videoToOpen) {
      const videoUrl = videoToOpen.video_link || 
                      `https://www.youtube.com/watch?v=${videoToOpen.video_id}`;
      if (videoUrl) {
        window.open(videoUrl, '_blank', 'noopener,noreferrer');
      }
    }
  };

  const handleCloseShareDialog = () => {
    setShareDialogOpen(false);
    setCopied(false);
    setVideoForShare(null);
  };

  const handleCopyLink = async () => {
    const video = videoForShare || currentVideoForMenu;
    if (video) {
      const videoUrl = video.video_link || 
                      `https://www.youtube.com/watch?v=${video.video_id}`;
      if (videoUrl) {
        try {
          await navigator.clipboard.writeText(videoUrl);
          setCopied(true);
          setTimeout(() => setCopied(false), 3000);
        } catch (err) {
          console.error('Failed to copy:', err);
        }
      }
    }
  };

  // Get video URL for sharing
  const getVideoUrl = () => {
    const video = videoForShare || currentVideoForMenu;
    if (video) {
      const videoUrl = video.video_link || 
                      `https://www.youtube.com/watch?v=${video.video_id}`;
      return videoUrl || '';
    }
    return '';
  };

  // Get PDF link from lecture data
  const pdfLink = lectureData?.pdf_link || lectureData?.pdfLink || '';

  const handlePdfClick = () => {
    // Check if PDF link exists, is not empty, and is a valid URL
    const hasValidPdf = pdfLink && 
                       pdfLink.trim() !== '' && 
                       (pdfLink.startsWith('http://') || pdfLink.startsWith('https://'));
    
    if (!hasValidPdf) {
      // Show Coming Soon dialog
      setComingSoonDialogOpen(true);
    } else {
      // Show PDF dialog
      setPdfDialogOpen(true);
    }
  };

  const handleClosePdfDialog = () => {
    setPdfDialogOpen(false);
  };

  const handleCloseComingSoonDialog = () => {
    setComingSoonDialogOpen(false);
  };

  // Show loading or error state if no video data
  if (!lectureData || !selectedVideo || !lectureData.videos || lectureData.videos.length === 0) {
    return (
      <Box sx={{ p: 4, textAlign: "center" }}>
        <Typography variant="h6" color="text.secondary">
          {lectureName ? `No videos available for "${lectureName}".` : "No lecture selected."}
        </Typography>
      </Box>
    );
  }

  return (
    <>

    <Stack 
      py={2}
      px={[1,2,5,10]}
      direction={{ xs: "column", md: "row" }}
      spacing={2}
      mt={12}
      mb={10}
      sx={{ width: "100%"}} 
      height={["auto","auto",700]}
    >
      {/* Left: Video Player */}
      <Box 
        height={"100%"} 
        sx={{
          flex: 3, 
          borderRadius: 4,
          overflow: "hidden",
          display: "flex",
          flexDirection: "column",
          gap: 1,
        }}
      >
        <Box 
          height={"100%"} 
          sx={{ 
            borderRadius: 4,
            flexGrow: 1, 
            overflow: "hidden"
          }} 
        >
          {selectedVideo.video_id ? (
            <iframe
              key={selectedVideo.video_id}
              width="100%"
              height="100%"  style={{
                minHeight: 300,
              }}
              src={`https://www.youtube.com/embed/${selectedVideo.video_id}?rel=0&modestbranding=1`}
              title={selectedVideo.video_title}
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen 
            ></iframe>
          ) : selectedVideo.video_link ? (
            <iframe
              key={selectedVideo.video_link}
              width="100%"
              height="100%"  style={{
                minHeight: 300,
              }}
              src={selectedVideo.video_link.replace('watch?v=', 'embed/').split('&')[0] + '?rel=0&modestbranding=1'}
              title={selectedVideo.video_title}
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen 
            ></iframe>
          ) : (
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%' }}>
              <Typography color="text.secondary">Video not available</Typography>
            </Box>
          )}
        </Box>

        <Divider />

        {/* Meta below player */}
        <Box sx={{ bgcolor: "#fff", p: 2 }}>
          <Stack direction="row" spacing={1} alignItems="center" sx={{ mb: 1 }}>
            <Typography color="black" fontWeight={700} gutterBottom>
              {selectedVideo.video_title}
            </Typography>
            <Chip label="Lecture" size="small" />
            <Button
              variant="outlined"
              size="small"
              startIcon={<FilePresentIcon />}
              onClick={handlePdfClick}
              sx={{
                borderColor: 'var(--color-primary)',
                color: 'var(--color-primary)',
                textTransform: 'none',
                fontWeight: 600,
                '&:hover': {
                  borderColor: 'var(--color-primary-hover)',
                  backgroundColor: 'rgba(184, 112, 47, 0.1)',
                },
              }}
            >
              {lang === 'ur' ? 'PDF پڑھیں' : 'Read PDF'}
            </Button>
          </Stack>
          <Stack direction="row" spacing={2} alignItems="center" justifyContent="space-between">
            <Typography variant="body2" color="text.secondary">
              {lectureData.playlist_title}
            </Typography>
          </Stack>
        </Box>
      </Box>

      {/* Right: Scrollable List */}
      <Box 
        sx={{
          flex: 1.3, 
          bgcolor: "#fff",
          borderRadius: 4,
          height: 565,  
          minHeight: 565,
          maxHeight: 565,
          border: "1px solid #e0e0e0",
          display: "flex",
          flexDirection: "column",
          overflow: "hidden",
        }}
      >
        {/* Playlist Header */}
        <Box
          sx={{
            p: 2,
            borderBottom: "1px solid #e0e0e0",
            bgcolor: "#e9ecef",
            borderRadius: "8px 8px 0 0",
          }}
        >
          <Typography
            variant="h6"
            fontWeight={700}
            sx={{
              mb: 0.5,
              color: "var(--color-primary)",
              fontSize: { xs: "1rem", md: "1.1rem" },
            }}
          >
            {lectureData.playlist_title}
          </Typography>
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{ fontSize: "0.85rem" }}
          >
            {lectureData.videos.length} {lectureData.videos.length === 1 ? "video" : "videos"}
          </Typography>
        </Box>

        {/* Scrollable Video List */}
        <Box
          sx={{
            flex: 1,
            overflowY: "auto",
            p: 1.5,
            scrollbarWidth: "thin",
            scrollbarColor: "var(--color-primary) transparent",
          }}
        >
          <Stack spacing={1.5} pb={1.5}>
            {lectureData.videos.map((video, index) => {
              const isSelected = (selectedVideo.video_id && selectedVideo.video_id === video.video_id) || 
                                 (selectedVideo.video_link && selectedVideo.video_link === video.video_link) ||
                                 (selectedVideo === video);

              return (
                <Card
                  key={video.video_id || index}
                  onClick={() => setSelectedVideo(video)}
                  variant="outlined"
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    borderRadius: 2,
                    border: isSelected ? "3px solid var(--color-primary)" : "1px solid #e0e0e0",
                    boxShadow: isSelected
                      ? "0 0 8px rgba(184, 112, 47, 0.4)"
                      : "0px 1px 2px rgba(0,0,0,0.1)",
                    p: 1,
                    flexShrink: 0,
                    cursor: "pointer",
                    transition: "all 0.25s ease",
                    "&:hover": {
                      transform: "scale(1.02)",
                      boxShadow: "0 0 6px rgba(0,0,0,0.2)",
                    },
                  }}
                >
                  <CardMedia
                    component="img"
                    image={video.image || `https://i.ytimg.com/vi/${video.video_id}/hqdefault.jpg`}
                    alt={video.video_title}
                    sx={{
                      width: 100,
                      height: 70,
                      borderRadius: 1,
                      objectFit: "cover",
                      bgcolor: "#f0f0f0",
                    }}
                  />
                  <CardContent sx={{ flex: 1, pl: 2, py: 0 }}>
                    <Typography
                      variant="subtitle1"
                      fontWeight={600}
                      sx={{
                        fontSize: "0.95rem",
                        color: isSelected ? "var(--color-primary)" : "text.primary",
                      }}
                    >
                      {video.video_title}
                    </Typography>
                    <Typography
                      variant="body2"
                      color="text.secondary"
                      sx={{ fontSize: "0.8rem", mt: 0.3 }}
                    >
                      {video.time || "N/A"}
                    </Typography>
                  </CardContent>
                  <IconButton
                    onClick={(e) => handleMenuClick(e, video)}
                    sx={{
                      '&:hover': {
                        backgroundColor: 'rgba(0, 0, 0, 0.04)',
                      },
                    }}
                  >
                    <MoreVertIcon fontSize="small" />
                  </IconButton>
                </Card>
              );
            })}
          </Stack>
        </Box>
      </Box>
    </Stack>

      {/* Video Menu */}
      <Menu
        anchorEl={menuAnchorEl}
        open={Boolean(menuAnchorEl)}
        onClose={handleMenuClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        PaperProps={{
          sx: {
            mt: 1,
            minWidth: 200,
            boxShadow: '0 4px 20px rgba(0,0,0,0.15)',
            borderRadius: 2,
            border: '1px solid rgba(0,0,0,0.08)',
          },
        }}
      >
        <MenuItem
          onClick={handleShareClick}
          sx={{
            py: 1.5,
            px: 2,
            '&:hover': {
              backgroundColor: 'rgba(184, 112, 47, 0.08)',
            },
          }}
        >
          <ShareIcon sx={{ mr: 1.5, fontSize: 20, color: 'var(--color-primary)' }} />
          <Typography variant="body2" fontWeight={500}>
            {lang === 'ur' ? 'شیئر کریں' : 'Share'}
          </Typography>
        </MenuItem>
        <MenuItem
          onClick={handleViewOnYouTube}
          sx={{
            py: 1.5,
            px: 2,
            '&:hover': {
              backgroundColor: 'rgba(184, 112, 47, 0.08)',
            },
          }}
        >
          <YouTubeIcon sx={{ mr: 1.5, fontSize: 20, color: '#FF0000' }} />
          <Typography variant="body2" fontWeight={500}>
            {lang === 'ur' ? 'یوٹیوب پر دیکھیں' : 'View On YouTube'}
          </Typography>
        </MenuItem>
      </Menu>

      {/* Share Dialog */}
      <Dialog
        open={shareDialogOpen}
        onClose={handleCloseShareDialog}
        maxWidth="sm"
        fullWidth
        PaperProps={{
          sx: {
            borderRadius: 3,
            boxShadow: '0 8px 32px rgba(0,0,0,0.12)',
          },
        }}
      >
        <DialogTitle
          sx={{
            pb: 2,
            borderBottom: '1px solid rgba(0,0,0,0.08)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
            <Box
              sx={{
                width: 40,
                height: 40,
                borderRadius: '50%',
                background: 'linear-gradient(135deg, var(--color-primary) 0%, var(--color-primary-light) 100%)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <ShareIcon sx={{ color: 'white', fontSize: 22 }} />
            </Box>
            <Typography variant="h6" fontWeight={700} sx={{ color: 'var(--color-primary)' }}>
              {lang === 'ur' ? 'ویڈیو لنک شیئر کریں' : 'Share Video Link'}
            </Typography>
          </Box>
          <IconButton
            onClick={handleCloseShareDialog}
            sx={{
              color: 'text.secondary',
              '&:hover': {
                backgroundColor: 'rgba(0, 0, 0, 0.04)',
              },
            }}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent sx={{ p: 3 }}>
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{ mb: 2, fontSize: '0.95rem' }}
          >
            {lang === 'ur' 
              ? 'ویڈیو لنک کاپی کریں اور اپنے دوستوں کے ساتھ شیئر کریں' 
              : 'Copy the video link and share it with your friends'}
          </Typography>
          <TextField
            fullWidth
            value={getVideoUrl()}
            InputProps={{
              readOnly: true,
              endAdornment: (
                <InputAdornment position="end">
                  <Tooltip
                    title={lang === 'ur' ? 'ویڈیو لنک کاپی کریں' : 'Copy the video link'}
                    arrow
                    placement="top"
                  >
                    <IconButton
                      onClick={handleCopyLink}
                      sx={{
                        color: copied ? '#4CAF50' : 'var(--color-primary)',
                        '&:hover': {
                          backgroundColor: copied ? 'rgba(76, 175, 80, 0.1)' : 'rgba(184, 112, 47, 0.1)',
                          color: copied ? '#45a049' : 'var(--color-primary-hover)',
                        },
                        transition: 'all 0.3s ease',
                      }}
                    >
                      {copied ? (
                        <CheckCircleIcon sx={{ fontSize: 24 }} />
                      ) : (
                        <ContentCopyIcon sx={{ fontSize: 24 }} />
                      )}
                    </IconButton>
                  </Tooltip>
                </InputAdornment>
              ),
            }}
            sx={{
              '& .MuiOutlinedInput-root': {
                borderRadius: 2,
                backgroundColor: '#f5f5f5',
                '& fieldset': {
                  borderColor: 'rgba(0, 0, 0, 0.12)',
                },
                '&:hover fieldset': {
                  borderColor: 'var(--color-primary)',
                },
                '&.Mui-focused fieldset': {
                  borderColor: 'var(--color-primary)',
                },
              },
            }}
          />
          {copied && (
            <Alert
              severity="success"
              icon={<CheckCircleIcon />}
              sx={{
                mt: 2,
                borderRadius: 2,
                bgcolor: '#e8f5e9',
                color: '#2e7d32',
                '& .MuiAlert-icon': {
                  color: '#4CAF50',
                },
              }}
            >
              {lang === 'ur' ? 'لنک کلپ بورڈ میں کاپی ہو گیا' : 'Link Copied to Clipboard'}
            </Alert>
          )}
        </DialogContent>
      </Dialog>

      {/* PDF Dialog */}
      {pdfLink && pdfLink.trim() !== '' && (pdfLink.startsWith('http://') || pdfLink.startsWith('https://')) && (
        <PDFDialog
          open={pdfDialogOpen}
          onClose={handleClosePdfDialog}
          pdfUrl={pdfLink}
          title={lectureData.name || lectureData.playlist_title}
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
                {lectureData?.name || lectureData?.playlist_title}
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
      </>
  );
}