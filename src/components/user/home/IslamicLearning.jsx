'use client';
import React, { useState } from 'react';
import {
  Box,
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Button,
  Chip,
  Stack,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  LinearProgress,
} from '@mui/material';
import {
  MenuBookRounded,
  HistoryRounded,
  MosqueRounded,
  SchoolRounded,
  QuizRounded,
  StarRounded,
  PlayArrowRounded,
  BookmarkRounded,
  ShareRounded,
  CloseRounded,
  CheckCircleRounded,
  ScheduleRounded,
  PeopleRounded,
} from '@mui/icons-material';

// --- Islamic Learning Modules Data ---
const learningModules = [
  {
    id: 1,
    title: 'Quran Study',
    description: 'Learn Quranic Arabic, Tajweed, and Tafsir with interactive lessons.',
    icon: <MenuBookRounded fontSize="large" />,
    color: '#2E7D32',
    lessons: 24,
    duration: '12 hours',
    level: 'Beginner',
    image: '/images/quran-study.jpg',
    features: ['Tajweed Rules', 'Arabic Grammar', 'Tafsir Studies', 'Memorization Techniques'],
  },
  {
    id: 2,
    title: 'Islamic History',
    description: 'Explore the rich history of Islam from Prophet Muhammad to modern times.',
    icon: <HistoryRounded fontSize="large" />,
    color: '#D84315',
    lessons: 18,
    duration: '15 hours',
    level: 'Intermediate',
    image: '/images/islamic-history.jpg',
    features: ['Prophet’s Life', 'Caliphate Era', 'Islamic Civilization', 'Modern History'],
  },
  {
    id: 3,
    title: 'Prayer Guide',
    description: 'Master Salah with step-by-step guidance and practical instructions.',
    icon: <MosqueRounded fontSize="large" />,
    color: '#1976D2',
    lessons: 12,
    duration: '8 hours',
    level: 'Beginner',
    image: '/images/prayer-guide.jpg',
    features: ['Salah Steps', 'Prayer Times', 'Duas', 'Prayer Positions'],
  },
  {
    id: 4,
    title: 'Islamic Knowledge',
    description: 'Comprehensive Islamic education covering Aqeedah, Fiqh, and Ethics.',
    icon: <SchoolRounded fontSize="large" />,
    color: '#7B1FA2',
    lessons: 30,
    duration: '20 hours',
    level: 'Advanced',
    image: '/images/islamic-knowledge.jpg',
    features: ['Aqeedah', 'Fiqh', 'Islamic Ethics', 'Contemporary Issues'],
  },
];

// --- Featured Courses Data ---
const featuredCourses = [
  {
    id: 1,
    title: 'Complete Tajweed Course',
    instructor: 'Sheikh Ahmad Al-Mansouri',
    rating: 4.9,
    students: 1250,
    price: 'Free',
    duration: '6 weeks',
    image: '/images/tajweed-course.jpg',
    description: 'Master Quranic recitation with proper pronunciation and tajweed rules.',
  },
  {
    id: 2,
    title: 'Islamic Finance Fundamentals',
    instructor: 'Dr. Fatima Al-Zahra',
    rating: 4.8,
    students: 890,
    price: '$49',
    duration: '4 weeks',
    image: '/images/islamic-finance.jpg',
    description: 'Learn the principles of Islamic banking and Sharia-compliant investments.',
  },
  {
    id: 3,
    title: "Prophet's Biography",
    instructor: 'Imam Yusuf Al-Qaradawi',
    rating: 4.9,
    students: 2100,
    price: 'Free',
    duration: '8 weeks',
    image: '/images/prophet-biography.jpg',
    description: "A detailed study of Prophet Muhammad's life and teachings.",
  },
];

// --- Learning Progress Data ---
const learningProgress = [
  { module: 'Quran Study', progress: 75, completed: 18, total: 24 },
  { module: 'Islamic History', progress: 45, completed: 8, total: 18 },
  { module: 'Prayer Guide', progress: 90, completed: 11, total: 12 },
  { module: 'Islamic Knowledge', progress: 30, completed: 9, total: 30 },
];

function IslamicLearning() {
  const [selectedModule, setSelectedModule] = useState(null);
  const [dialogOpen, setDialogOpen] = useState(false);

  const handleModuleClick = (module) => {
    setSelectedModule(module);
    setDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setDialogOpen(false);
    setSelectedModule(null);
  };

  return (
    <Box sx={{ backgroundColor: '#f8f9fa', minHeight: '100vh' }}>
      {/* Hero Section */}
      <Box
        sx={{
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          color: 'white',
          py: 8,
          textAlign: 'center',
        }}
      >
        <Container maxWidth="lg">
          <Typography variant="h2" fontWeight={800} sx={{ mb: 2 }}>
            Islamic Learning Hub
          </Typography>
          <Typography variant="h6" sx={{ mb: 4, opacity: 0.9 }}>
            Discover, Learn, and Grow in Your Islamic Knowledge
          </Typography>
          <Stack direction="row" spacing={2} justifyContent="center" flexWrap="wrap">
            {['24/7 Access', 'Expert Instructors', 'Interactive Learning'].map((label) => (
              <Chip
                key={label}
                label={label}
                sx={{
                  backgroundColor: 'rgba(255,255,255,0.2)',
                  color: 'white',
                  fontWeight: 600,
                }}
              />
            ))}
          </Stack>
        </Container>
      </Box>

      <Container maxWidth="lg" sx={{ py: 6 }}>
        {/* Learning Modules Section */}
        <Box sx={{ mb: 8 }}>
          <Typography variant="h4" fontWeight={700} sx={{ mb: 4, textAlign: 'center' }}>
            Learning Modules
          </Typography>
          <Grid container spacing={4}>
            {learningModules.map((module) => (
              <Grid item xs={12} sm={6} md={3} key={module.id}>
                <Card
                  sx={{
                    height: '100%',
                    cursor: 'pointer',
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      transform: 'translateY(-8px)',
                      boxShadow: '0 12px 24px rgba(0,0,0,0.15)',
                    },
                  }}
                  onClick={() => handleModuleClick(module)}
                >
                  <CardMedia
                    component="div"
                    sx={{
                      height: 200,
                      background: `linear-gradient(135deg, ${module.color}33 0%, ${module.color}66 100%)`,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: module.color,
                    }}
                  >
                    {module.icon}
                  </CardMedia>
                  <CardContent>
                    <Typography variant="h6" fontWeight={600} sx={{ mb: 1 }}>
                      {module.title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                      {module.description}
                    </Typography>
                    <Stack direction="row" spacing={1} sx={{ mb: 2 }}>
                      <Chip
                        label={module.level}
                        size="small"
                        sx={{ backgroundColor: `${module.color}20`, color: module.color }}
                      />
                      <Chip label={`${module.lessons} lessons`} size="small" variant="outlined" />
                    </Stack>
                    <Stack direction="row" justifyContent="space-between" alignItems="center">
                      <Typography variant="body2" color="text.secondary" sx={{ display: 'flex', alignItems: 'center' }}>
                        <ScheduleRounded sx={{ fontSize: 16, mr: 0.5 }} />
                        {module.duration}
                      </Typography>
                      <Button size="small" sx={{ color: module.color }}>
                        Start Learning
                      </Button>
                    </Stack>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Box>

        {/* Learning Progress Section */}
        <Box sx={{ mb: 8 }}>
          <Typography variant="h4" fontWeight={700} sx={{ mb: 4, textAlign: 'center' }}>
            Your Learning Progress
          </Typography>
          <Grid container spacing={3}>
            {learningProgress.map((item, index) => (
              <Grid item xs={12} md={6} key={index}>
                <Card sx={{ p: 3 }}>
                  <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 2 }}>
                    <Typography variant="h6" fontWeight={600}>
                      {item.module}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {item.completed}/{item.total} completed
                    </Typography>
                  </Stack>
                  <LinearProgress
                    variant="determinate"
                    value={item.progress}
                    sx={{
                      height: 8,
                      borderRadius: 4,
                      backgroundColor: 'rgba(0,0,0,0.1)',
                      '& .MuiLinearProgress-bar': {
                        backgroundColor: '#4CAF50',
                      },
                    }}
                  />
                  <Typography variant="body2" sx={{ mt: 1, textAlign: 'right' }}>
                    {item.progress}% Complete
                  </Typography>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Box>

        {/* Featured Courses Section */}
        <Box sx={{ mb: 8 }}>
          <Typography variant="h4" fontWeight={700} sx={{ mb: 4, textAlign: 'center' }}>
            Featured Courses
          </Typography>
          <Grid container spacing={4}>
            {featuredCourses.map((course) => (
              <Grid item xs={12} md={4} key={course.id}>
                <Card
                  sx={{
                    height: '100%',
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      transform: 'translateY(-4px)',
                      boxShadow: '0 8px 16px rgba(0,0,0,0.1)',
                    },
                  }}
                >
                  <CardMedia
                    component="div"
                    sx={{
                      height: 200,
                      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: 'white',
                      fontSize: '3rem',
                    }}
                  >
                    <PlayArrowRounded fontSize="inherit" />
                  </CardMedia>
                  <CardContent>
                    <Typography variant="h6" fontWeight={600} sx={{ mb: 1 }}>
                      {course.title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                      by {course.instructor}
                    </Typography>
                    <Typography variant="body2" sx={{ mb: 2 }}>
                      {course.description}
                    </Typography>
                    <Stack direction="row" spacing={1} sx={{ mb: 2 }}>
                      <Chip
                        icon={<StarRounded />}
                        label={course.rating}
                        size="small"
                        sx={{ backgroundColor: '#FFD700', color: 'black' }}
                      />
                      <Chip
                        icon={<PeopleRounded />}
                        label={`${course.students} students`}
                        size="small"
                        variant="outlined"
                      />
                    </Stack>
                    <Stack direction="row" justifyContent="space-between" alignItems="center">
                      <Typography variant="h6" color="primary" fontWeight={600}>
                        {course.price}
                      </Typography>
                      <Button variant="contained" size="small">
                        Enroll Now
                      </Button>
                    </Stack>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Box>

        {/* Quick Actions Section */}
        <Box sx={{ textAlign: 'center', pb: 6 }}>
          <Typography variant="h4" fontWeight={700} sx={{ mb: 4 }}>
            Quick Actions
          </Typography>
          <Stack direction="row" spacing={2} justifyContent="center" flexWrap="wrap">
            <Button variant="contained" size="large" startIcon={<QuizRounded />} sx={{ px: 4, py: 1.5 }}>
              Take Quiz
            </Button>
            <Button variant="outlined" size="large" startIcon={<BookmarkRounded />} sx={{ px: 4, py: 1.5 }}>
              My Bookmarks
            </Button>
            <Button variant="outlined" size="large" startIcon={<ShareRounded />} sx={{ px: 4, py: 1.5 }}>
              Share Progress
            </Button>
          </Stack>
        </Box>
      </Container>

      {/* Module Detail Dialog */}
      <Dialog
        open={dialogOpen}
        onClose={handleCloseDialog}
        maxWidth="md"
        fullWidth
        sx={{
          '& .MuiDialog-paper': { borderRadius: 3 },
        }}
      >
        {selectedModule && (
          <>
            <DialogTitle sx={{ pb: 1 }}>
              <Stack direction="row" justifyContent="space-between" alignItems="center">
                <Typography variant="h5" fontWeight={600}>
                  {selectedModule.title}
                </Typography>
                <IconButton onClick={handleCloseDialog}>
                  <CloseRounded />
                </IconButton>
              </Stack>
            </DialogTitle>
            <DialogContent>
              <Box sx={{ mb: 3 }}>
                <Box
                  sx={{
                    height: 200,
                    background: `linear-gradient(135deg, ${selectedModule.color}33 0%, ${selectedModule.color}66 100%)`,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: selectedModule.color,
                    borderRadius: 2,
                    mb: 3,
                  }}
                >
                  {selectedModule.icon}
                </Box>
                <Typography variant="body1" sx={{ mb: 3 }}>
                  {selectedModule.description}
                </Typography>
                <Grid container spacing={2} sx={{ mb: 3 }}>
                  <Grid item xs={6}>
                    <Typography variant="body2" color="text.secondary">
                      Lessons: {selectedModule.lessons}
                    </Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <Typography variant="body2" color="text.secondary">
                      Duration: {selectedModule.duration}
                    </Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <Typography variant="body2" color="text.secondary">
                      Level: {selectedModule.level}
                    </Typography>
                  </Grid>
                </Grid>
                <Typography variant="h6" fontWeight={600} sx={{ mb: 2 }}>
                  What You'll Learn:
                </Typography>
                <List dense>
                  {selectedModule.features.map((feature, index) => (
                    <ListItem key={index} sx={{ py: 0.5 }}>
                      <ListItemIcon sx={{ minWidth: 32 }}>
                        <CheckCircleRounded color="primary" fontSize="small" />
                      </ListItemIcon>
                      <ListItemText primary={feature} />
                    </ListItem>
                  ))}
                </List>
              </Box>
            </DialogContent>
            <DialogActions sx={{ p: 3 }}>
              <Button onClick={handleCloseDialog} variant="outlined">
                Close
              </Button>
              <Button variant="contained" sx={{ backgroundColor: selectedModule.color }}>
                Start Learning
              </Button>
            </DialogActions>
          </>
        )}
      </Dialog>
    </Box>
  );
}

export default IslamicLearning;
