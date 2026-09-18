import React, { useState } from 'react';
import {
  Box,
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  CardActionArea,
  Stack,
  Chip,
} from '@mui/material';
import DescriptionIcon from '@mui/icons-material/Description'; 
import { useLanguage } from '../../../contexts/LanguageContext';
import PDFDialog from './PDFDialog';

const NotesSection = () => {
  const { content, lang } = useLanguage();
  const notesSectionData = content?.notes?.notesSection || {};
  
  // Get notes data from WebsiteContent.json
  const currentNotes = notesSectionData.notes || [];
  const [selectedNote, setSelectedNote] = useState(null);
  const [dialogOpen, setDialogOpen] = useState(false);

  const handleNoteClick = (note) => {
    setSelectedNote(note);
    setDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setDialogOpen(false);
    setSelectedNote(null);
  };

  return (
    <Box
      sx={{
        py: { xs: 6, md: 10 },
        background: 'linear-gradient(135deg, #f8f9fa 0%, #ffffff 50%, #f8f9fa 100%)',
        position: 'relative',
        overflow: 'hidden',
        minHeight: '80vh',
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
      <Container maxWidth="xlg">
        {/* Header Section */}
        <Box mt={[5,12,12,6]} sx={{ textAlign: 'center', mb: 6 }}>
          <Typography
            variant="h3"
            fontWeight={800}
            sx={{
              mb: 2,
              color: 'var(--color-primary)',
              fontSize: { xs: '2rem', md: '2.5rem' },
            }}
          >
            {notesSectionData.title || 'Notes'}
          </Typography>
          <Typography
            variant="h6"
            color="text.secondary"
            sx={{
              maxWidth: '700px',
              mx: 'auto',
              fontSize: { xs: '1rem', md: '1.1rem' },
              lineHeight: 1.7,
            }}
          >
            {notesSectionData.subtitle || (lang === 'ur'
              ? 'قرآن سیکھنے کے لیے مفید نوٹس اور رہنمائی دستاویزات تک رسائی حاصل کریں۔'
              : 'Access helpful notes and guidance documents for learning the Quran.')}
          </Typography>
        </Box>

        {/* Notes Grid */}
        <Grid container spacing={4} justifyContent="center">
          {currentNotes.map((note) => {
            return (
              <Grid size={[12,6,4,3]} key={note.id}>
                <Card
                  sx={{
                    maxWidth: 400,
                    height: '100%',
                    borderRadius: 4,
                    border: '1px solid var(--grey-border)',
                    boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
                    transition: 'all 0.3s ease',
                    overflow: 'hidden',
                    position: 'relative',
                    bgcolor: 'white',
                    '@keyframes gradient-shimmer': {
                      '0%': {
                        backgroundPosition: '-200% 0',
                      },
                      '100%': {
                        backgroundPosition: '200% 0',
                      },
                    },
                    '&:hover': {
                      transform: 'translateY(-8px)',
                      boxShadow: '0 12px 40px rgba(184, 112, 47, 0.2)',
                      borderColor: 'var(--color-primary)',
                      '& .note-icon': {
                        transform: 'scale(1.1) rotate(5deg)',
                      },
                      '& .note-gradient': {
                        opacity: 1,
                      },
                      '& .note-gradient-animated': {
                        opacity: 1,
                        animation: 'gradient-shimmer 2s ease-in-out infinite',
                      },
                    },
                  }}
                >
                  <CardActionArea
                    onClick={() => handleNoteClick(note)}
                    sx={{
                      height: '100%',
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'stretch',
                    }}
                  >
                    {/* Icon Section with shared gradient for all cards */}
                    <Box
                      sx={{
                        position: 'relative',
                        height: 140,
                        background: 'linear-gradient(135deg, var(--color-primary) 0%, var(--color-primary-hover) 60%, var(--color-primary-light) 100%)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        overflow: 'hidden',
                      }}
                    >
                      <Box
                        className="note-gradient"
                        sx={{
                          position: 'absolute',
                          top: 0,
                          left: 0,
                          right: 0,
                          bottom: 0,
                          background: 'linear-gradient(135deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0) 100%)',
                          opacity: 0,
                          transition: 'opacity 0.3s ease',
                        }}
                      />
                      <Box
                        className="note-gradient-animated"
                        sx={{
                          position: 'absolute',
                          top: 0,
                          left: 0,
                          right: 0,
                          bottom: 0,
                          background: 'linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.3) 50%, transparent 100%)',
                          backgroundSize: '200% 100%',
                          opacity: 0,
                          transition: 'opacity 0.3s ease',
                          pointerEvents: 'none',
                        }}
                      />
                      <DescriptionIcon
                        className="note-icon"
                        sx={{
                          fontSize: 80,
                          color: 'white',
                          transition: 'all 0.3s ease',
                          filter: 'drop-shadow(0 4px 8px rgba(0,0,0,0.2))',
                          position: 'relative',
                          zIndex: 1,
                        }}
                      />
                    </Box>

                    {/* Content Section */}
                    <CardContent
                      sx={{
                        flex: 1,
                        p: 3,
                        display: 'flex',
                        flexDirection: 'column',
                        bgcolor: 'white',
                      }}
                    >
                      <Typography
                        variant="h5"
                        fontWeight={700}
                        sx={{
                          mb: 2,
                          color: 'text.primary',
                          fontSize: { xs: '1.3rem', md: '1.5rem' },
                        }}
                      >
                        {note.title}
                      </Typography>
                      <Typography
                        variant="body1"
                        color="text.secondary"
                        sx={{
                          mb: 3,
                          lineHeight: 1.7,
                          fontSize: { xs: '0.95rem', md: '1rem' },
                          flex: 1,
                        }}
                      >
                        {note.description}
                      </Typography>

                      {/* Action Chip */}
                      <Stack direction="row" spacing={1} alignItems="center">
                        <Chip
                          label={lang === 'ur' ? 'دیکھیں' : 'View PDF'}
                          sx={{
                            bgcolor: 'var(--color-primary)',
                            color: 'white',
                            fontWeight: 600,
                            fontSize: '0.9rem',
                            px: 1,
                            transition: 'all 0.3s ease',
                            '&:hover': {
                              bgcolor: 'var(--color-primary-hover)',
                            },
                          }}
                        />
                        <Typography
                          variant="body2"
                          sx={{
                            color: 'var(--color-primary)',
                            fontWeight: 600,
                            fontSize: '0.85rem',
                          }}
                        >
                          {lang === 'ur' ? '→' : '→'}
                        </Typography>
                      </Stack>
                    </CardContent>
                  </CardActionArea>
                </Card>
              </Grid>
            );
          })}
        </Grid>

        {/* Info Message */}
        <Box sx={{ textAlign: 'center', mt: 2 }}>
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{
              fontStyle: 'italic',
              fontSize: { xs: '0.9rem', md: '1rem' },
            }}
          >
            {lang === 'ur'
              ? 'نوٹ: PDF فائل کو دیکھنے کے لیے کسی بھی نوٹ کارڈ پر کلک کریں۔'
              : 'Note: Click on any note card to view the PDF file.'}
          </Typography>
        </Box>
      </Container>

      {/* PDF Dialog */}
      {selectedNote && (
        <PDFDialog
          open={dialogOpen}
          onClose={handleCloseDialog}
          pdfUrl={selectedNote.pdfUrl}
          title={selectedNote.title}
        />
      )}
    </Box>
  );
};

export default NotesSection;
