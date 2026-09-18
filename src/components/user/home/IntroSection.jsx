'use client'
 
import React from "react";
import {
  Box,
  Container,
  Typography,
  Chip,
  Stack, 
  useTheme,
} from "@mui/material";

import PlayCircleRoundedIcon from "@mui/icons-material/PlayCircleRounded";
import AutoStoriesRoundedIcon from "@mui/icons-material/AutoStoriesRounded";
import LanguageRoundedIcon from "@mui/icons-material/LanguageRounded"; 
import ShieldRoundedIcon from "@mui/icons-material/ShieldRounded"; 
import OndemandVideoRoundedIcon from "@mui/icons-material/OndemandVideoRounded";
import { useLanguage } from '../../../contexts/LanguageContext'; 

 
/* ------------------------------- UI helpers ------------------------------ */

const FeatureChip = ({ icon, label }) => (
  <Chip
    icon={icon}
    label={label}
    variant="outlined"
    sx={{
      borderColor: "divider",
      bgcolor: (t) =>
        t.palette.mode === "dark" ? "rgba(255,255,255,0.04)" : "rgba(0,0,0,0.02)",
      backdropFilter: "blur(6px)",
      fontWeight: 600,
      borderRadius: 2,
    }}
  />
);

 

const AnimatedDivider = () => (
  <Box
    sx={{
      height: 3,
      width: 140,
      borderRadius: 2,
      mx: "auto",
      background:
        "linear-gradient(90deg, #22c1c3 0%, #3a7bd5 50%, #22c1c3 100%)",
      position: "relative",
      overflow: "hidden",
      "&::after": {
        content: '""',
        position: "absolute",
        inset: 0,
        background:
          "linear-gradient(90deg, transparent, rgba(255,255,255,0.6), transparent)",
        width: "40%",
        animation: "shine 2.2s infinite",
      },
      "@keyframes shine": {
        "0%": { left: "-40%" },
        "60%": { left: "100%" },
        "100%": { left: "100%" },
      },
    }}
  />
);

const ResponsiveYouTube = ({ iframeLink, title }) => (
  <Box
    sx={{
      position: "relative",
      width: "100%",
      maxWidth: 980,
      aspectRatio: { xs: "16 / 9", md: "16 / 9" },
      borderRadius: 3,
      overflow: "hidden",
      boxShadow: "0 20px 60px rgba(0,0,0,0.18)",
      border: "1px solid",
      borderColor: "divider",
      background:
        "radial-gradient(1200px 1200px at 10% -10%, rgba(230, 156, 53, 0.3), transparent), radial-gradient(1200px 1200px at 110% 110%, rgba(195, 133, 34, 0.48), transparent)",
    }}
  >
    <iframe
      width="100%"
      height="100%"
      src={iframeLink}
      title={title}
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
      allowFullScreen
      style={{ border: "none", display: "block" }}
      loading="lazy"
    />
    <Box
      sx={{
        position: "absolute",
        left: 12,
        top: 12,
        display: "flex",
        gap: 1,
      }}
    >
      <Chip
        size="small"
        icon={<OndemandVideoRoundedIcon />}
        label="Intro Lecture"
        sx={{ bgcolor: "background.paper", border: "1px solid", borderColor: "divider" }}
      />
      <Chip
        size="small"
        icon={<PlayCircleRoundedIcon />}
        label="Watch Now"
        sx={{ bgcolor: "background.paper", border: "1px solid", borderColor: "divider" }}
      />
    </Box>
  </Box>
);

 
 

/* ------------------------------ Main Section ----------------------------- */

// Icon mapping
const iconMap = {
  AutoStoriesRounded: AutoStoriesRoundedIcon,
  LanguageRounded: LanguageRoundedIcon,
  ShieldRounded: ShieldRoundedIcon,
};

function IntroSection() {
  const theme = useTheme();
  const { content } = useLanguage();
  const introData = content?.home?.introSection || {};
  
  // Get icon component from icon name
  const getIcon = (iconName) => {
    return iconMap[iconName] || AutoStoriesRoundedIcon;
  };

  return (
    <Box
      sx={{
        py: { xs: 8, md: 12 },
        position: "relative",
        overflow: "hidden",
        background: `linear-gradient(180deg, ${
          theme.palette.mode === "dark" ? "rgb(30, 25, 16)" : "rgba(245, 248, 251, 1)"
        } 0%, transparent 60%),
          radial-gradient(1200px 600px at 0% -20%, rgba(58,123,213,0.12), transparent),
          radial-gradient(1200px 600px at 100% 120%, rgba(34,193,195,0.12), transparent)`,
      }}
    >
      {/* Decorative accent */}
      <Box
        aria-hidden
        sx={{
          position: "absolute",
          right: -120,
          top: -120,
          width: 320,
          height: 320,
          borderRadius: "50%",
          background:
            "conic-gradient(from 180deg at 50% 50%, rgba(213, 159, 58, 0.37), rgba(195, 133, 34, 0.41), transparent 70%)",
          filter: "blur(20px)",
        }}
      />
      <Box
        aria-hidden
        sx={{
          position: "absolute",
          left: 120,
          top: 220,
          width: 620,
          height: 520,
          borderRadius: "50%",
          background:
            "conic-gradient(from 180deg at 50% 50%, rgba(213, 159, 58, 0.37), rgba(195, 133, 34, 0.41), transparent 70%)",
          filter: "blur(20px)",
        }}
      />
      <Box
        aria-hidden
        sx={{
          position: "absolute",
          right: 520,
          bottom: 20,
          width: 500,
          height: 320,
          borderRadius: "50%",
          background:
            "conic-gradient(from 180deg at 50% 50%, rgba(213, 159, 58, 0.37), rgba(195, 133, 34, 0.41), transparent 70%)",
          filter: "blur(20px)",
        }}
      />

      <Container maxWidth="lg">
        {/* Header */}
        <Box sx={{ textAlign: "center", mb: 5 }}>
          <Stack direction="row" spacing={1} justifyContent="center" flexWrap="wrap" gap={1} sx={{ mb: 2 }}>
            {introData.featureChips.map((chip, index) => {
              const IconComponent = getIcon(chip.icon);
              return (
                <FeatureChip key={index} icon={<IconComponent />} label={chip.label} />
              );
            })}
          </Stack>

          <Typography
            variant="h3"
            component="h2"
            sx={{
              fontWeight: 800,
              letterSpacing: "-0.5px",
              mb: 1,
              fontSize: { xs: "2rem", sm: "2.6rem", md: "3rem" },
              color: 'var(--color-primary)  ',
            }}
          >
            {introData.title}
          </Typography>
          <Typography variant="subtitle1" color="text.secondary" sx={{ maxWidth: 760, mx: "auto" }}>
            {introData.subtitle}
          </Typography>
          {introData.description ? (
            <Typography
              sx={{
                maxWidth: 760,
                mx: "auto",
                mt: 2,
                color: "text.secondary",
                fontSize: { xs: "0.98rem", md: "1.05rem" },
                lineHeight: 1.8,
              }}
            >
              {introData.description}
            </Typography>
          ) : null}

          <Box sx={{ mt: 3 }}>
            <AnimatedDivider />
          </Box>
        </Box>

        {/* Video */}
        <Box sx={{ display: "flex", justifyContent: "center", mb: 6 }}>
          <ResponsiveYouTube iframeLink={introData.youtubeIframeLink} title={introData.title} />
        </Box>
 
      </Container>
    </Box>
  );
}

export default IntroSection;
