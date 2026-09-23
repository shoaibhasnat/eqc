'use client';

import { AppBar, Toolbar, Typography, Box, Button, Menu, MenuItem, Stack, Drawer, IconButton, List, ListItem, Divider, Collapse, ToggleButton, ToggleButtonGroup } from '@mui/material'
import { KeyboardArrowDown, Menu as MenuIcon, Close as CloseIcon, ExpandLess, ExpandMore, GetApp as GetAppIcon, OpenInNew as OpenInNewIcon } from '@mui/icons-material'
import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { useRouter, usePathname } from 'next/navigation'
import NextLink from 'next/link'
import Image from 'next/image'
import PDFDialog from '../notes/PDFDialog'
import { useLanguage } from '../../../contexts/LanguageContext'
import usePwaMenuActions from '@/components/pwa/usePwaMenuActions'
import { openInstallPrompt, openInstalledApp } from '@/components/pwa/pwaUtils'

function UserNavbar() {
  const router = useRouter()
  const pathname = usePathname()
  const navigate = (path) => router.push(path)
  const location = { pathname }
  const { lang, changeLanguage, content } = useLanguage()
  const [lecturesAnchorEl, setLecturesAnchorEl] = useState(null)
  const [grammarPdfDialogOpen, setGrammarPdfDialogOpen] = useState(false)
  const [imanPdfDialogOpen, setImanPdfDialogOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [mobileLecturesOpen, setMobileLecturesOpen] = useState(false)
  const { showInstall: showInstallAppButton, showOpen: showOpenAppButton } = usePwaMenuActions()

  // Get navbar content from context
  const navbarData = content?.navbar || {};
  const navItems = navbarData.navItems || [];
  const navbarTitle = navbarData.navbarTitle || 'Easy Quran Class';
  const lecturesDropdown = navbarData.lecturesDropdown || {};
  
  // Get lecture options from lecturesDropdown
  const lectureOptions = (lecturesDropdown.lecturesOptions?.title || []).map(title => ({ title }));

  // Handle scroll event
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY
      setIsScrolled(scrollPosition > 50) // Change color after scrolling 50px
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Check if a nav item is active based on current location
  const isActive = (path) => {
    const currentPath = location.pathname
    const target = path === '/home' ? '/' : path
    if ((target === '/' || path === '/home') && (currentPath === '/' || currentPath === '/home')) {
      return true
    }
    return currentPath === target || currentPath.startsWith(target + '/')
  }

  const hrefFor = (path) => (path === '/home' ? '/' : path)

  const handleLecturesClick = (event) => {
    if (lecturesAnchorEl) {
      setLecturesAnchorEl(null)
    } else {
      setLecturesAnchorEl(event.currentTarget)
    }
  }

  const handleClose = () => {
    setLecturesAnchorEl(null)
  }

  // Map lecture titles to URL-friendly names from JSON
  const getLectureUrlName = (title) => {
    const urlMapping = lecturesDropdown.lecturesOptions?.urlMapping || {};
    return urlMapping[title] || title.toLowerCase().replace(/\s+/g, '-');
  };

  const handleLectureClick = (lectureTitle) => {
    const urlName = getLectureUrlName(lectureTitle);
    navigate(`/lectures/${urlName}`)
    handleClose()
  }

  const handleSeeAllClick = () => {
    navigate('/lectures')
    handleClose()
  }

  const handleGrammarLecturesClick = () => {
    setGrammarPdfDialogOpen(true)
    handleClose()
  }

  const handleImanLecturesClick = () => {
    setImanPdfDialogOpen(true)
    handleClose()
  }

  const handleCloseGrammarPdfDialog = () => {
    setGrammarPdfDialogOpen(false)
  }

  const handleCloseImanPdfDialog = () => {
    setImanPdfDialogOpen(false)
  }

  const lecturesOpen = Boolean(lecturesAnchorEl)
  
  // Check if Lectures is active
  const isLecturesActive = location.pathname === '/lectures' || location.pathname.startsWith('/lectures/')

  return (
    <>
      <AppBar 
        position="fixed" 
        sx={{ 
          background:  ' rgba(32, 17, 10, 0.66)',
             
          backdropFilter:  'blur(20px) saturate(180%)' ,
          boxShadow: '0 4px 20px rgba(0, 0, 0, 0.3), 0 0 40px rgba(184, 112, 47, 0.3)'
            ,
          borderBottom: '1px solid rgba(255, 255, 255, 0.1)' ,
          zIndex: 1000,
          transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
          '&::before': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            height: '2px',
            background: 'linear-gradient(90deg, transparent, var(--color-primary), transparent)',
            opacity: isScrolled ? 1 : 0.6,
            transition: 'opacity 0.3s ease',
          },
        }}
      >
      <Toolbar 
        sx={{ 
          justifyContent: 'space-between',
          alignItems: 'center',
          px: { xs: 1, sm: 2, md: 4, lg: 6 },
          py: { xs: 1, sm: 0.5 },
          // minHeight: { xs: '64px', sm: '72px', md: '80px' },
          flexWrap: 'wrap',
          position: 'relative',
        }}
      >
        <Stack direction={["row"]}  sx={{ display: { xs: 'flex', sm: 'none' } }} alignItems="center" gap={1} justifyContent="flex-start" width="100%"> 
        {/* Mobile Menu Button */}
        <IconButton
          color="inherit"
          aria-label="open drawer"
          edge="start"
          onClick={() => setMobileOpen(true)}
          sx={{ 
          
            ml:0.5, 
          }}
        >
          <MenuIcon /> 
        </IconButton>
          <Box
            component={NextLink}
            href="/"
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: 1,
              textDecoration: 'none',
              color: 'inherit',
              minWidth: 0,
            }}
          >
            <Box
              sx={{
                width: 36,
                height: 36,
                borderRadius: '8px',
                overflow: 'hidden',
                flexShrink: 0,
                boxShadow: '0 2px 8px rgba(0,0,0,0.25)',
              }}
            >
              <Image src="/logo.jpg" alt={navbarTitle} width={36} height={36} style={{ display: 'block', objectFit: 'cover' }} />
            </Box>
            <Typography variant="h6" sx={{ color: 'white', fontWeight: 700, fontSize: '1rem', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
              {navbarTitle}
            </Typography>
          </Box>
        </Stack>


        {/* Desktop Navigation */}
        <Box 
          sx={{ 
            display: { xs: 'none', sm: 'flex' },
            justifyContent:'space-between',
            alignItems:"center",
            gap: { xs: 0.5, sm: 1, md: 2, lg: 3 }, 
            flexWrap: 'wrap', 
            flex: 1,
            // maxWidth: '100%' ,
            mx: 'auto',
          }}  
        >
          <Box
            component={NextLink}
            href="/"
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: 1.25,
              textDecoration: 'none',
              color: 'inherit',
            }}
          >
            <Box
              sx={{
                width: { sm: 40, md: 44 },
                height: { sm: 40, md: 44 },
                borderRadius: '10px',
                overflow: 'hidden',
                flexShrink: 0,
                boxShadow: '0 2px 10px rgba(0,0,0,0.3)',
              }}
            >
              <Image src="/logo.jpg" alt={navbarTitle} width={44} height={44} style={{ display: 'block', width: '100%', height: '100%', objectFit: 'cover' }} />
            </Box>
            <Typography
              variant="h6"
              sx={{
                color: 'white',
                fontWeight: 700,
                textDecoration: 'none',
              }}
            >
              {navbarTitle}
            </Typography>
          </Box>

          <Stack direction="row" alignItems="center" gap={1} justifyContent="flex-end" > 

          {navItems.map((item, index) => {
            const active = isActive(item.path)
            return (
              <motion.div
                key={item.name}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.4 }}
              >
                <Button
                  component={NextLink}
                  href={hrefFor(item.path)}
                  aria-current={active ? 'page' : undefined}
                  sx={{
                    color: active ? 'white' : 'rgba(255, 255, 255, 0.95)',
                    textTransform: 'none',
                    fontWeight: 500,
                    fontSize: { xs: '0.85rem', sm: '0.9rem', md: '1rem', lg: '1.1rem' },
                    px: { xs: 1, sm: 1.5, md: 2 },
                    py: { xs: 1, sm: 1, md: 1 },
                    borderRadius: 2,
                    minWidth: 'auto',
                    whiteSpace: 'nowrap',
                    position: 'relative',
                    overflow: 'hidden',
                    backgroundColor: active ? 'rgba(75, 35, 0, 0.6)' : 'transparent',
                    transform: active ? 'translateY(-2px)' : 'none',
                    '&::before': {
                      content: '""',
                      position: 'absolute',
                      bottom: 0,
                      left: '50%',
                      width: active ? '80%' : 0,
                      height: '2px',
                      background: 'linear-gradient(90deg, transparent, var(--color-primary), transparent)',
                      transform: 'translateX(-50%)',
                      transition: 'width 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                    },
                    '&:hover': {
                      color: 'white',
                      backgroundColor: 'rgba(75, 35, 0, 0.6)',
                      transform: 'translateY(-2px)',
                      '&::before': {
                        width: '80%',
                      },
                    },
                    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                  }}
                >
                  {item.name}
                </Button>
              </motion.div>
            )
          })}
      
          {/* Lectures Dropdown */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: navItems.length * 0.1, duration: 0.4 }}
          >
            <Button
              id="lectures-button"
              aria-controls={lecturesOpen ? 'lectures-menu' : undefined}
              aria-haspopup="true"
              aria-expanded={lecturesOpen ? 'true' : undefined}
              onClick={handleLecturesClick}
              sx={{
                color: isLecturesActive ? 'white' : 'rgba(255, 255, 255, 0.95)',
                textTransform: 'none',
                fontWeight: 500,
                fontSize: { xs: '0.85rem', sm: '0.9rem', md: '1rem', lg: '1.1rem' },
                px: { xs: 1, sm: 1.5, md: 2 },
                py: { xs: 1, sm: 1, md: 1 },
                borderRadius: 2,
                display: 'flex',
                alignItems: 'center',
                gap: 0.75,
                minWidth: 'auto',
                whiteSpace: 'nowrap',
                position: 'relative',
                overflow: 'hidden',
                backgroundColor: isLecturesActive ? 'rgba(75, 35, 0, 0.6)' : 'transparent',
                transform: isLecturesActive ? 'translateY(-2px)' : 'none',
                '&::before': {
                  content: '""',
                  position: 'absolute',
                  bottom: 0,
                  left: '50%',
                  width: isLecturesActive ? '80%' : 0,
                  height: '2px',
                  background: 'linear-gradient(90deg, transparent, var(--color-primary), transparent)',
                  transform: 'translateX(-50%)',
                  transition: 'width 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                },
                '&:hover': {
                  color: 'white',
                  backgroundColor: 'rgba(75, 35, 0, 0.6)',
                  transform: 'translateY(-2px)',
                  '&::before': {
                    width: '80%',
                  },
                },
                transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
              }}
            >
              {lecturesDropdown.title || 'Lectures'}
              <KeyboardArrowDown 
                sx={{ 
                  fontSize: { xs: '0.9rem', sm: '1rem', md: '1.1rem' },
                  transform: lecturesOpen ? 'rotate(180deg)' : 'rotate(0deg)',
                  transition: 'transform 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                  color: lecturesOpen || isLecturesActive ? 'var(--color-primary)' : 'inherit',
                }} 
              />
            </Button>
          </motion.div>

                {/* Lectures Dropdown Menu */}
      <Menu
        id="lectures-menu"
        anchorEl={lecturesAnchorEl}
        open={lecturesOpen}
        onClose={handleClose}
        slotProps={{
          list: {
            'aria-labelledby': 'lectures-button',
          },
        }}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
        PaperProps={{
          sx: {
            background: 'linear-gradient(135deg, rgba(0, 0, 0, 0.95) 0%, rgba(20, 20, 20, 0.98) 100%)',
            backdropFilter: 'blur(20px) saturate(180%)',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            borderRadius: 3,
            mt: 1.5,
            boxShadow: '0 8px 32px rgba(0, 0, 0, 0.4), 0 0 20px rgba(184, 112, 47, 0.2)',
            overflow: 'hidden',
            '&::before': {
              content: '""',
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              height: '1px',
              background: 'linear-gradient(90deg, transparent, var(--color-primary), transparent)',
            },
          },
        }}
        TransitionProps={{
          timeout: 200,
        }}
      >
        {lectureOptions.map((lecture) => (
          <MenuItem 
            key={lecture.title}
            component={NextLink}
            href={`/lectures/${getLectureUrlName(lecture.title)}`}
            onClick={handleClose}
            sx={{
              color: 'rgba(255, 255, 255, 0.9)',
              py: 1.5,
              px: 2.5,
              fontSize: '0.95rem',
              fontWeight: 500,
              transition: 'all 0.3s ease',
              position: 'relative',
              '&::before': {
                content: '""',
                position: 'absolute',
                left: 0,
                top: 0,
                bottom: 0,
                width: '3px',
                background: 'var(--color-primary)',
                transform: 'scaleY(0)',
                transition: 'transform 0.3s ease',
              },
              '&:hover': {
                backgroundColor: 'rgba(184, 112, 47, 0.2)',
                color: 'white',
                paddingLeft: 3,
                '&::before': {
                  transform: 'scaleY(1)',
                },
              },
            }}
          >
            {lecture.title}
          </MenuItem>
        ))}
        <Box
          sx={{
            borderTop: '1px solid rgba(255, 255, 255, 0.1)',
            mt: 0.5,
          }}
        />
        <MenuItem 
          component={NextLink}
          href="/lectures"
          onClick={handleSeeAllClick}
          sx={{
            color: 'var(--color-primary)',
            py: 1.5,
            px: 2.5,
            fontSize: '0.95rem',
            fontWeight: 600,
            transition: 'all 0.3s ease',
            position: 'relative',
            '&::before': {
              content: '""',
              position: 'absolute',
              left: 0,
              top: 0,
              bottom: 0,
              width: '3px',
              background: 'var(--color-primary)',
              transform: 'scaleY(0)',
              transition: 'transform 0.3s ease',
            },
            '&:hover': {
              backgroundColor: 'rgba(184, 112, 47, 0.2)',
              color: 'var(--color-primary)',
              paddingLeft: 3,
              '&::before': {
                transform: 'scaleY(1)',
              },
            },
          }}
        >
          {lecturesDropdown.seeAll || 'See All'}
        </MenuItem>
      </Menu>

          {/* Language Toggle */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: (navItems.length + 1) * 0.1, duration: 0.4 }}
          >
            <ToggleButtonGroup
              value={lang}
              exclusive
              onChange={(event, newLang) => {
                if (newLang !== null) {
                  changeLanguage(newLang);
                }
              }}
              aria-label="language selection"
              size="small"
              sx={{
                backgroundColor: 'rgba(255, 255, 255, 0.1)',
                backdropFilter: 'blur(10px)',
                border: '1px solid rgba(255, 255, 255, 0.2)',
                borderRadius: 2,
                '& .MuiToggleButton-root': {
                  color: 'rgba(255, 255, 255, 0.9)',
                  border: 'none',
                  px: 2,
                  py: 0.75,
                  fontSize: { xs: '0.75rem', sm: '0.85rem' },
                  fontWeight: 600,
                  '&.Mui-selected': {
                    backgroundColor: 'var(--color-primary)',
                    color: 'white',
                    '&:hover': {
                      backgroundColor: 'var(--color-primary)',
                    },
                  },
                  '&:hover': {
                    backgroundColor: 'rgba(255, 255, 255, 0.15)',
                  },
                },
              }}
            >
              <ToggleButton value="en" aria-label="english">
                EN
              </ToggleButton>
              <ToggleButton value="ur" aria-label="urdu">
                اردو
              </ToggleButton>
            </ToggleButtonGroup>
          </motion.div>
      </Stack>
      
        </Box> 
      </Toolbar>
      


      </AppBar>
      
      {/* PDF Dialogs */}
      <PDFDialog
        open={grammarPdfDialogOpen}
        onClose={handleCloseGrammarPdfDialog}
        pdfUrl="https://drive.google.com/file/d/1JbbvXB25250eLp0LfJ81R02ssR1JceVx/preview"
        title="Grammar Lectures"
      />

      <PDFDialog
        open={imanPdfDialogOpen}
        onClose={handleCloseImanPdfDialog}
        pdfUrl="https://drive.google.com/file/d/1JbbvXB25250eLp0LfJ81R02ssR1JceVx/preview"
        title="Iman Lectures"
      />

      {/* Mobile Drawer */}
      <Drawer
        anchor="right"
        open={mobileOpen}
        onClose={() => setMobileOpen(false)}
        PaperProps={{
          sx: {
            width: 280,
            background: 'linear-gradient(135deg, rgba(0, 0, 0, 0.95) 0%, rgba(20, 20, 20, 0.98) 100%)',
            backdropFilter: 'blur(20px) saturate(180%)',
          },
        }}
      >
        <Box sx={{ p: 2 }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, minWidth: 0, pr: 1 }}>
              <Box
                sx={{
                  width: 36,
                  height: 36,
                  borderRadius: '8px',
                  overflow: 'hidden',
                  flexShrink: 0,
                }}
              >
                <Image src="/logo.jpg" alt={navbarTitle} width={36} height={36} style={{ display: 'block', objectFit: 'cover' }} />
              </Box>
              <Typography variant="h6" sx={{ color: 'white', fontWeight: 700, fontSize: '1rem' }}>
                {navbarTitle}
              </Typography>
            </Box>
            <IconButton
              onClick={() => setMobileOpen(false)}
              sx={{ color: 'white' }}
            >
              <CloseIcon />
            </IconButton>
          </Box>
          <Divider sx={{ bgcolor: 'rgba(255, 255, 255, 0.1)', mb: 2 }} />
          
          <List sx={{ p: 0 }}>
            {navItems.map((item) => {
              const active = isActive(item.path)
              return (
                <ListItem
                  key={item.name}
                  component={NextLink}
                  href={hrefFor(item.path)}
                  onClick={() => {
                    setMobileOpen(false)
                  }}
                  sx={{
                    py: 1.5,
                    px: 2,
                    mb: 0.5,
                    borderRadius: 2,
                    cursor: 'pointer',
                    backgroundColor: active ? 'rgba(184, 112, 47, 0.3)' : 'transparent',
                    color: active ? 'var(--color-primary)' : 'rgba(255, 255, 255, 0.9)',
                    fontWeight: active ? 600 : 500,
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      backgroundColor: 'rgba(184, 112, 47, 0.2)',
                      color: 'white',
                    },
                  }}
                >
                  {item.name}
                </ListItem>
              )
            })}

            {/* Mobile Lectures Section */}
            <ListItem
              onClick={() => setMobileLecturesOpen(!mobileLecturesOpen)}
              sx={{
                py: 1.5,
                px: 2,
                mb: 0.5,
                borderRadius: 2,
                cursor: 'pointer',
                backgroundColor: isLecturesActive ? 'rgba(184, 112, 47, 0.3)' : 'transparent',
                color: isLecturesActive ? 'var(--color-primary)' : 'rgba(255, 255, 255, 0.9)',
                fontWeight: isLecturesActive ? 600 : 500,
                transition: 'all 0.3s ease',
                '&:hover': {
                  backgroundColor: 'rgba(184, 112, 47, 0.2)',
                  color: 'white',
                },
              }}
            >
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%' }}>
                <Typography>{lecturesDropdown.title || 'Lectures'}</Typography>
                {mobileLecturesOpen ? <ExpandLess /> : <ExpandMore />}
              </Box>
            </ListItem>
            <Collapse in={mobileLecturesOpen} timeout="auto" unmountOnExit>
              <List component="div" disablePadding>
                {lectureOptions.map((lecture) => (
                  <ListItem
                    key={lecture.title}
                    component={NextLink}
                    href={`/lectures/${getLectureUrlName(lecture.title)}`}
                    onClick={() => {
                      setMobileOpen(false)
                    }}
                    sx={{
                      py: 1.5,
                      px: 4,
                      mb: 0.5,
                      borderRadius: 2,
                      cursor: 'pointer',
                      color: 'rgba(255, 255, 255, 0.8)',
                      transition: 'all 0.3s ease',
                      '&:hover': {
                        backgroundColor: 'rgba(184, 112, 47, 0.15)',
                        color: 'white',
                      },
                    }}
                  >
                    {lecture.title}
                  </ListItem>
                ))}
                <ListItem
                  component={NextLink}
                  href="/lectures"
                  onClick={() => {
                    setMobileOpen(false)
                  }}
                  sx={{
                    py: 1.5,
                    px: 4,
                    mb: 0.5,
                    borderRadius: 2,
                    cursor: 'pointer',
                    color: 'var(--color-primary)',
                    fontWeight: 600,
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      backgroundColor: 'rgba(184, 112, 47, 0.15)',
                    },
                  }}
                >
                  {lecturesDropdown.seeAll || 'See All'}
                </ListItem>
              </List>
            </Collapse>

            {showInstallAppButton && (
              <>
                <Divider sx={{ bgcolor: 'rgba(255, 255, 255, 0.1)', my: 2 }} />
                <ListItem
                  onClick={() => {
                    setMobileOpen(false)
                    openInstallPrompt()
                  }}
                  sx={{
                    py: 1.5,
                    px: 2,
                    mb: 0.5,
                    borderRadius: 2,
                    cursor: 'pointer',
                    backgroundColor: 'rgba(184, 112, 47, 0.25)',
                    color: 'white',
                    fontWeight: 600,
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      backgroundColor: 'rgba(184, 112, 47, 0.4)',
                    },
                  }}
                >
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.25, width: '100%' }}>
                    <GetAppIcon sx={{ fontSize: 22, color: 'var(--color-primary)' }} />
                    <Typography sx={{ fontWeight: 600, fontSize: '0.95rem' }}>
                      {lang === 'ur' ? 'ایپ انسٹال کریں' : 'Install as App'}
                    </Typography>
                  </Box>
                </ListItem>
              </>
            )}

            {showOpenAppButton && (
              <>
                <Divider sx={{ bgcolor: 'rgba(255, 255, 255, 0.1)', my: 2 }} />
                <ListItem
                  onClick={() => {
                    setMobileOpen(false)
                    openInstalledApp()
                  }}
                  sx={{
                    py: 1.5,
                    px: 2,
                    mb: 0.5,
                    borderRadius: 2,
                    cursor: 'pointer',
                    backgroundColor: 'rgba(184, 112, 47, 0.25)',
                    color: 'white',
                    fontWeight: 600,
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      backgroundColor: 'rgba(184, 112, 47, 0.4)',
                    },
                  }}
                >
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.25, width: '100%' }}>
                    <OpenInNewIcon sx={{ fontSize: 22, color: 'var(--color-primary)' }} />
                    <Typography sx={{ fontWeight: 600, fontSize: '0.95rem' }}>
                      {lang === 'ur' ? 'ایپ میں کھولیں' : 'Open in App'}
                    </Typography>
                  </Box>
                </ListItem>
              </>
            )}

            {/* Mobile Language Toggle */}
            <Divider sx={{ bgcolor: 'rgba(255, 255, 255, 0.1)', my: 2 }} />
            <Box sx={{ px: 2, pb: 2 }}>
              <Typography
                variant="body2"
                sx={{
                  color: 'rgba(255, 255, 255, 0.7)',
                  mb: 1.5,
                  fontSize: '0.85rem',
                }}
              >
                Language
              </Typography>
              <ToggleButtonGroup
                value={lang}
                exclusive
                onChange={(event, newLang) => {
                  if (newLang !== null) {
                    changeLanguage(newLang);
                  }
                }}
                aria-label="language selection"
                size="small"
                fullWidth
                sx={{
                  backgroundColor: 'rgba(255, 255, 255, 0.1)',
                  border: '1px solid rgba(255, 255, 255, 0.2)',
                  borderRadius: 2,
                  '& .MuiToggleButton-root': {
                    color: 'rgba(255, 255, 255, 0.9)',
                    border: 'none',
                    py: 1,
                    fontSize: '0.9rem',
                    fontWeight: 600,
                    flex: 1,
                    '&.Mui-selected': {
                      backgroundColor: 'var(--color-primary)',
                      color: 'white',
                      '&:hover': {
                        backgroundColor: 'var(--color-primary)',
                      },
                    },
                    '&:hover': {
                      backgroundColor: 'rgba(255, 255, 255, 0.15)',
                    },
                  },
                }}
              >
                <ToggleButton value="en" aria-label="english">
                  EN
                </ToggleButton>
                <ToggleButton value="ur" aria-label="urdu">
                  اردو
                </ToggleButton>
              </ToggleButtonGroup>
            </Box>
          </List>
        </Box>
      </Drawer>
    </>
  )
}

export default UserNavbar