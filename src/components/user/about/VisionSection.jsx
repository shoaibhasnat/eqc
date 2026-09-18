import React, { useMemo, useState } from 'react'
import { Box, Container, Typography, Grid, Avatar, Stack } from "@mui/material";
import FlagRoundedIcon from "@mui/icons-material/FlagRounded";
import VisibilityRoundedIcon from "@mui/icons-material/VisibilityRounded";
import FavoriteRoundedIcon from "@mui/icons-material/FavoriteRounded";
import { motion } from "framer-motion";
import { useLanguage } from '../../../contexts/LanguageContext';

// Icon mapping
const iconMap = {
    FlagRoundedIcon: FlagRoundedIcon,
    VisibilityRoundedIcon: VisibilityRoundedIcon,
    FavoriteRoundedIcon: FavoriteRoundedIcon,
};

// Common styles for all cards (same gradient, iconBg, pattern)
const commonGradient = "linear-gradient(135deg, rgba(184, 112, 47, 0.15) 0%, rgba(230, 174, 35, 0.1) 100%)";
const commonIconBg = "linear-gradient(135deg, var(--color-primary) 0%, var(--color-primary-light) 100%)";
const commonPattern = "radial-gradient(circle at 20% 50%, rgba(184, 112, 47, 0.1) 0%, transparent 50%)";

function VisionSection() {
    const { content } = useLanguage();
    const visionData = content?.about?.visionSection || {};
    const cardsData = visionData.cards || [];

    // Map cards from JSON and add common styles
    const cardData = cardsData.map((card, index) => {
        const IconComponent = iconMap[card.icon] || FlagRoundedIcon;
        return {
            title: card.title,
            desc: card.desc,
            icon: IconComponent,
            gradient: commonGradient,
            iconBg: commonIconBg,
            pattern: commonPattern,
        };
    });

    // Generate floating particles for background animation
    const particles = useMemo(() => {
    return Array.from({ length: 12 }, (_, i) => ({
            id: i,
            left: (i * 23 + 7) % 100,
            top: (i * 17 + 13) % 100,
            delay: (i * 0.27) % 3,
            duration: 4 + (i % 4) * 0.7,
        }));
    }, []);

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.2,
            },
        },
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 30 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.6,
                ease: "easeOut",
            },
        },
    };

  return (
    <>
        {/* Mission & Vision Section */}
      <Box
        sx={{ 
            py: { xs: 8, md: 12 }, 
            backgroundColor: "#faf6f2",
            position: "relative",
            overflow: "hidden",
            width: "100%",
            "&::before": {
                content: '""',
                position: "absolute",
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                background: "radial-gradient(circle at 10% 20%, rgba(184, 112, 47, 0.05) 0%, transparent 50%), radial-gradient(circle at 90% 80%, rgba(230, 174, 35, 0.05) 0%, transparent 50%)",
                pointerEvents: "none",
                zIndex: 0,
            },
            "@keyframes float": {
                "0%, 100%": {
                    transform: "translateY(0px) translateX(0px)",
                },
                "33%": {
                    transform: "translateY(-20px) translateX(10px)",
                },
                "66%": {
                    transform: "translateY(10px) translateX(-10px)",
                },
            },
        }}
      >
        {/* Floating Particles Background */}
        {particles.map((particle) => (
            <Box
                key={particle.id}
                sx={{
                    position: "absolute",
                    left: `${particle.left}%`,
                    top: `${particle.top}%`,
                    width: 8,
                    height: 8,
                    borderRadius: "50%",
                    bgcolor: "rgba(184, 112, 47, 0.2)",
                    animation: `float ${particle.duration}s ease-in-out infinite`,
                    animationDelay: `${particle.delay}s`,
                    zIndex: 0,
                    pointerEvents: "none",
                }}
            />
        ))}
 
        <Container maxWidth="2xl" sx={{ position: "relative", zIndex: 1, mt:5 }}>
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
          >
            <Stack
              sx={{ mb: { xs: 5, md: 7 }, textAlign: 'center' }}
            >
              <Typography
                variant="h3"
                component="h1"
                sx={{
                  fontWeight: 800,
                  color: 'var(--color-primary)',
                  fontSize: { xs: '2rem', md: '2.75rem' },
                  mb: 1.5,
                }}
              >
                {visionData.heading || 'About Easy Quran Class'}
              </Typography>
              <Typography
                sx={{
                  color: '#515151',
                  maxWidth: 720,
                  mx: 'auto',
                  fontSize: { xs: '1rem', md: '1.15rem' },
                  lineHeight: 1.7,
                }}
              >
                {visionData.intro ||
                  'Easy Quran Class is an online Quran academy teaching Quran recitation, Tajweed, Tafsir, and namaz to students worldwide.'}
              </Typography>
            </Stack>
            <Stack 
              direction={{ xs: "column", md: "row" }} 
              spacing={4} 
              justifyContent="center"
              alignItems="stretch"
              sx={{ width: "100%" }}
            >
              {cardData.map((item, index) => {
                const IconComponent = item.icon;
                const [isHovered, setIsHovered] = useState(false);
                return (
                  <Box 
                    key={index} 
                    sx={{ 
                      flex: { xs: "1 1 100%", md: "0 1 400px" },
                      maxWidth: { xs: "100%", md: "400px" },
                      width: { xs: "100%", md: "auto" },
                    }}
                  >
                    <motion.div variants={itemVariants}>
                      <motion.div
                        onHoverStart={() => setIsHovered(true)}
                        onHoverEnd={() => setIsHovered(false)}
                        whileHover={{ 
                          y: -8,
                        }}
                        style={{
                          position: "relative",
                          minHeight:400,
                          padding: "2rem",
                          width: "100%",
                          borderRadius: "16px",
                          background: item.gradient,
                          height: "100%",
                          boxShadow: isHovered ? "0 12px 40px rgba(184, 112, 47, 0.2)" : "0 4px 20px rgba(0,0,0,0.08)",
                          transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
                        }}
                      >
                        <Box
                          sx={{
                            position: "absolute",
                            top: 0,
                            left: 0,
                            right: 0,
                            bottom: 0,
                            background: item.pattern,
                            borderRadius: 4,
                            opacity: 0.6,
                            pointerEvents: "none",
                            zIndex: 0,
                          }}
                        />
                        {/* Icon Section */}
                        <motion.div
                          className="icon-wrapper"
                          animate={isHovered ? { scale: 1.1, rotate: 5 } : { scale: 1, rotate: 0 }}
                          transition={{ type: "spring", stiffness: 300 }}
                        >
                          <Avatar
                            sx={{
                              width: { xs: 70, md: 80 },
                              height: { xs: 70, md: 80 },
                              mb: 3,
                              background: "linear-gradient(135deg, var(--color-primary) 0%, var(--color-primary-light) 100%)",
                              boxShadow: "0 8px 24px rgba(184, 112, 47, 0.3)",
                              position: "relative",
                              zIndex: 1,
                            }}
                          >
                            <IconComponent sx={{ fontSize: { xs: 35, md: 40 }, color: "white" }} />
                          </Avatar>
                        </motion.div>

                        {/* Content */}
                        <Box sx={{ position: "relative", zIndex: 1 }}>
                          <Typography
                            variant="h4"
                            sx={{
                              fontWeight: 800,
                              mb: 2.5,
                              color: "var(--color-primary)",
                              fontSize: { xs: "1.75rem", md: "2rem" },
                              textAlign: "left",
                            }}
                          >
                            {item.title}
                          </Typography>
                          <Typography
                            variant="body1"
                            sx={{
                              color: "#555",
                              lineHeight: 1.8,
                              fontSize: { xs: "0.95rem", md: "1rem" },
                              textAlign: "left",
                            }}
                          >
                            {item.desc}
                          </Typography>
                        </Box>

                        {/* Decorative Pattern Overlay */}
                        <Box
                          className="pattern-overlay"
                          sx={{
                            position: "absolute",
                            bottom: 0,
                            right: 0,
                            width: "60%",
                            height: "60%",
                            background: `radial-gradient(circle, rgba(184, 112, 47, 0.08) 0%, transparent 70%)`,
                            borderRadius: "50% 0 0 0",
                            opacity: isHovered ? 0.8 : 0.4,
                            transition: "opacity 0.4s ease",
                            pointerEvents: "none",
                            zIndex: 0,
                          }}
                        />
                      </motion.div>
                    </motion.div>
                  </Box>
                );
              })}
            </Stack>
          </motion.div>
        </Container>
      </Box>
    </>
  )
}

export default VisionSection
