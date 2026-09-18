import React, { useState, useMemo } from 'react'
import { useSearchParams } from 'next/navigation'
import { 
  Box, 
  Typography, 
  Grid, 
  Card, 
  CardContent, 
  TextField, 
  InputAdornment,
  Chip,
  Container,
  Paper,
  Stack,
  Link,
  Button,
  Dialog,
  DialogContent,
  IconButton
} from '@mui/material'
import { Search, MenuBook, Visibility, PlayCircleFilledWhite, FilePresent, Close, AccessTime } from '@mui/icons-material'
import { motion } from 'framer-motion'
import NextLink from 'next/link'
import { useLanguage } from '../../../contexts/LanguageContext'
import surahDataEng from "./SurahsInEng.json"
import surahDataUrdu from "./SurahsInUrdu.json"
import PDFDialog from '../notes/PDFDialog'

function SurahList() {
  const { lang } = useLanguage()
  const searchParams = useSearchParams()
  const [searchTerm, setSearchTerm] = useState(searchParams.get('q') || '')
  const [filterRevelation, setFilterRevelation] = useState('All')
  const [selectedSurah, setSelectedSurah] = useState(null)
  const [pdfDialogOpen, setPdfDialogOpen] = useState(false)
  const [comingSoonDialogOpen, setComingSoonDialogOpen] = useState(false)

  // Translations
  const translations = {
    en: {
      title: 'The Holy Quran',
      subtitle: 'All 114 Surahs of the Quran',
      searchPlaceholder: 'Search surahs...',
      all: 'All',
      meccan: 'Meccan',
      medinan: 'Medinan',
      showing: 'Showing',
      of: 'of',
      surahs: 'surahs',
      verses: 'verses',
      read: 'Read PDF',
      youtube: 'View Playlist'
    },
    ur: {
      title: 'قرآن پاک',
      subtitle: 'قرآن مجید کی تمام 114 سورتیں۔',
      searchPlaceholder: 'سورتیں تلاش کریں...',
      all: 'تمام',
      meccan: 'مکہ',
      medinan: 'مدینہ',
      showing: 'دکھا رہے ہیں',
      of: 'کا',
      surahs: 'سورتیں',
      verses: 'آیات',
      read: 'PDF پڑھیں',
      youtube: 'پلے لسٹ دیکھیں'
    }
  }

  const t = translations[lang] || translations.en

  // Select the appropriate JSON data based on language
  const surahData = lang === 'ur' ? surahDataUrdu : surahDataEng

  // Map JSON data to component format and normalize revelation values
  const surahsData = useMemo(() => {
    return surahData.surahs.map(surah => {
      // Normalize revelation values: convert Urdu to English for consistent filtering
      let normalizedRevelation = surah.revelation
      if (surah.revelation === 'مکہ') {
        normalizedRevelation = 'Meccan'
      } else if (surah.revelation === 'مدینہ') {
        normalizedRevelation = 'Medinan'
      }
      
      return {
        number: surah.id,
        name: surah.name,
        englishName: surah.englishName,
        verses: surah.verseCount,
        revelation: surah.revelation, // Keep original for display
        normalizedRevelation: normalizedRevelation, // Use for filtering
        pdfLink: surah.pdf_link || surah.pdfLink || '' // Include PDF link (handle both key variations)
      }
    })
  }, [surahData])

  // Filter options with translations
  const filterOptions = [
    { value: 'All', label: t.all },
    { value: 'Meccan', label: t.meccan },
    { value: 'Medinan', label: t.medinan }
  ]

  const filteredSurahs = useMemo(() => {
    return surahsData.filter(surah => {
      const matchesSearch = surah.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           surah.englishName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           surah.number.toString().includes(searchTerm)
      const matchesRevelation = filterRevelation === 'All' || surah.normalizedRevelation === filterRevelation
      return matchesSearch && matchesRevelation
    })
  }, [searchTerm, filterRevelation, surahsData])

  const handlePdfClick = (e, surah) => {
    e.preventDefault()
    e.stopPropagation()
    
    // Check if PDF link exists, is not empty, and is a valid URL
    const hasValidPdf = surah.pdfLink && 
                       surah.pdfLink.trim() !== '' && 
                       (surah.pdfLink.startsWith('http://') || surah.pdfLink.startsWith('https://'))
    
    if (!hasValidPdf) {
      // Show Coming Soon dialog
      setSelectedSurah(surah)
      setComingSoonDialogOpen(true)
    } else {
      // Show PDF dialog
      setSelectedSurah(surah)
      setPdfDialogOpen(true)
    }
  }

  const handleClosePdfDialog = () => {
    setPdfDialogOpen(false)
    setSelectedSurah(null)
  }

  const handleCloseComingSoonDialog = () => {
    setComingSoonDialogOpen(false)
    setSelectedSurah(null)
  }

  return (
    <Box sx={{ minHeight: '100vh', backgroundColor: '#f8f9fa', pt: 8 }}>
      <Container maxWidth="xl">
        {/* Header Section */}
        <Box sx={{ textAlign: 'center', mb: 6, pt: 4 }}>
          <Typography 
            variant="h3" 
            component="h1" 
            sx={{ 
              fontWeight: 700, 
              color: '#2c3e50',
              mb: 2,
              fontSize: { xs: '2rem', sm: '2.5rem', md: '3rem' }
            }}
          >
            {t.title}
          </Typography>
          <Typography 
            variant="h6" 
            sx={{ 
              color: '#7f8c8d', 
              mb: 4,
              fontSize: { xs: '1rem', sm: '1.1rem', md: '1.25rem' }
            }}
          >
            {t.subtitle}
          </Typography>
          
          {/* Search and Filter Section */}
          <Stack 
            direction={{ xs: 'column', sm: 'row' }} 
            spacing={2} 
            justifyContent="center" 
            alignItems="center"
            sx={{ mb: 4 }}
          >
            <TextField
              placeholder={t.searchPlaceholder}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              sx={{
                minWidth: { xs: '100%', sm: '300px' },
                '& .MuiOutlinedInput-root': {
                  borderRadius: 3,
                  backgroundColor: 'white',
                  boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
                }
              }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Search sx={{ color: '#7f8c8d' }} />
                  </InputAdornment>
                ),
              }}
            />
            
            <Stack direction="row" spacing={1}>
              {filterOptions.map((option) => (
                <Chip
                  key={option.value}
                  label={option.label}
                  onClick={() => setFilterRevelation(option.value)}
                  variant={filterRevelation === option.value ? 'filled' : 'outlined'}
                  sx={{
                    backgroundColor: filterRevelation === option.value ? '#cc813b' : 'white',
                    color: filterRevelation === option.value ? 'white' : '#7f8c8d',
                    borderColor: '#cc813b',
                    '&:hover': {
                      backgroundColor: filterRevelation === option.value ? '#b8702f' : '#ecf0f1',
                    }
                  }}
                />
              ))}
            </Stack>
          </Stack>
        </Box>

        {/* Surahs Grid */}
        <Grid container spacing={3} sx={{ pb: 6, justifyContent: 'center' }}>
          {filteredSurahs.map((surah) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={surah.number} sx={{ display: 'flex', justifyContent: 'center' }}>
              <Link component={NextLink} href={`/surah/${surah.number}`} underline="none" sx={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
                <Card
                  sx={{
                    height: '100%',
                    width: '300px',
                  //   maxWidth: { xs: '100%', sm: '300px', md: '350px', lg: '300px' },
                    minWidth: { xs: '100%', sm: '280px', md: '350px', lg: '300px' },
                    display: 'flex',
                    flexDirection: 'column',
                    borderRadius: 3,
                    boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                    transition: 'all 0.3s ease',
                    cursor: 'pointer',
                    '&:hover': {
                      transform: 'translateY(-4px)',
                      boxShadow: '0 8px 24px rgba(0,0,0,0.15)',
                    }
                  }}
                >
                <CardContent sx={{ flexGrow: 1, p: 3 }}>
                  {/* Surah Number */}
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                    <Typography 
                      variant="h4" 
                      sx={{ 
                        fontWeight: 700, 
                        color: '#2c3e50',
                        fontSize: { xs: '1.5rem', sm: '1.75rem' }
                      }}
                    >
                      {surah.number}
                    </Typography>
                    <Chip
                      label={surah.normalizedRevelation === 'Meccan' ? t.meccan : surah.normalizedRevelation === 'Medinan' ? t.medinan : surah.revelation}
                      size="small"
                      sx={{
                        backgroundColor: surah.normalizedRevelation === 'Meccan' ? '#e8f5e8' : '#e3f2fd',
                        color: surah.normalizedRevelation === 'Meccan' ? '#2e7d32' : '#1976d2',
                        fontWeight: 600,
                        fontSize: '0.75rem'
                      }}
                    />
                  </Box>

                  {/* Surah Name */}
                  <Typography 
                    variant="h6" 
                    sx={{ 
                      fontWeight: 600, 
                      color: '#2c3e50',
                      mb: 1,
                      fontSize: { xs: '1rem', sm: '1.1rem' },
                      lineHeight: 1.3
                    }}
                  >
                    {surah.name}
                  </Typography>
                  
                  {/* English Name */}
                  <Typography 
                    variant="body2" 
                    sx={{ 
                      color: '#7f8c8d', 
                      mb: 1,
                      fontSize: { xs: '0.85rem', sm: '0.9rem' },
                      lineHeight: 1.4
                    }}
                  >
                    {surah.englishName}
                  </Typography>

                      {/* Verses Count */}
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 , mb:2}}>
                      <MenuBook sx={{ fontSize: '1rem', color: '#7f8c8d' }} />
                      <Typography 
                        variant="body2" 
                        sx={{ 
                          color: '#7f8c8d',
                          fontSize: '0.85rem',
                          fontWeight: 500
                        }}
                      >
                        {surah.verses} {t.verses}
                      </Typography>
                    </Box>
                    
                  <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    
                    {/* Youtube Playlist Button */}
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                      <Button variant='contained' size='small'
                      sx={{
                        bgcolor: 'var(--color-primary)',
                        color: 'white',
                        fontSize: '0.7rem',
                        fontWeight: 600
                      }}
                      >
                      <PlayCircleFilledWhite sx={{ fontSize: '1.2rem', color: 'white', mr:1 }} />
                        {t.youtube}
                      </Button>
                    </Box>


{/* PDF Read Button */}
                    <Box 
                      sx={{ 
                        display: 'flex', 
                        alignItems: 'center', 
                        gap: 0.5,
                        cursor: 'pointer',
                        '&:hover': {
                          '& .pdf-text': {
                            color: 'var(--color-primary)',
                            textDecoration: 'underline',
                          },
                          '& .pdf-icon': {
                            color: 'var(--color-primary)',
                          }
                        }
                      }}
                      onClick={(e) => handlePdfClick(e, surah)}
                    >
                        <FilePresent className="pdf-icon" sx={{ fontSize: '0.9rem', color: '#cc813b', transition: 'color 0.3s ease' }} />
                      <Typography 
                        variant="body2" 
                        className="pdf-text"
                        sx={{ 
                          color: '#cc813b',
                          fontSize: '0.8rem',
                          fontWeight: 600,
                          transition: 'color 0.3s ease'
                        }}
                      >
                        {t.read}
                      </Typography>
                    </Box>
                  </Box>
                </CardContent>
                </Card>
              </Link>
            </Grid>
          ))}
        </Grid>

        {/* Results Count */}
        <Box sx={{ textAlign: 'center', pb: 4 }}>
          <Typography variant="body1" sx={{ color: '#7f8c8d' }}>
            {t.showing} {filteredSurahs?.length} {t.of} {surahsData?.length} {t.surahs}
          </Typography>
        </Box>
      </Container>

      {/* PDF Dialog */}
      {selectedSurah && selectedSurah.pdfLink && selectedSurah.pdfLink.trim() !== '' && (
        <PDFDialog
          open={pdfDialogOpen}
          onClose={handleClosePdfDialog}
          pdfUrl={selectedSurah.pdfLink}
          title={selectedSurah.name}
        />
      )}

      {/* Coming Soon Dialog */}
      {selectedSurah && (
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
            {/* Close Button */}
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
              <Close />
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
                {/* Icon */}
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
                    <AccessTime sx={{ fontSize: 60, color: 'white' }} />
                  </Box>
                </motion.div>

                {/* Surah Info */}
                <Typography
                  variant="h4"
                  fontWeight={800}
                  sx={{
                    mb: 1,
                    color: 'var(--color-primary)',
                    fontSize: { xs: '1.75rem', md: '2.5rem' },
                  }}
                >
                  {selectedSurah.name}
                </Typography>
                <Typography
                  variant="h6"
                  sx={{
                    mb: 1,
                    color: 'text.secondary',
                    fontSize: { xs: '1rem', md: '1.25rem' },
                  }}
                >
                  {selectedSurah.englishName}
                </Typography>

                {/* Coming Soon Badge */}
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

                {/* Message */}
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
                    ? 'ہم اس سورہ کے لیے مکمل PDF دستاویزات لانے کے لیے محنت کر رہے ہیں۔ براہ کرم اپ ڈیٹس کے لیے جلد واپس چیک کریں!'
                    : 'We are working hard to bring you the complete PDF document for this surah. Please check back soon for updates!'}
                </Typography>

                {/* Decorative Elements */}
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
      )}
    </Box>
  )
}

export default SurahList
