'use client'

import React from "react";
import {
  Box,
  Typography,
  Container,
  Button,
  Stack,
  Chip,
  IconButton,
} from "@mui/material";
import YouTubeIcon from "@mui/icons-material/YouTube";
import PlayCircleOutlineRoundedIcon from "@mui/icons-material/PlayCircleOutlineRounded";
import NotificationsActiveRoundedIcon from "@mui/icons-material/NotificationsActiveRounded";

function YouTubeSection() {
  return (
    <Box
      sx={{
        py: { xs: 8, md: 12 },
 
        overflow: "hidden",
      }}
    >
     

      <Container maxWidth="lg">
        <Box sx={{ textAlign: "center", mb: 6 }}>
          <Chip
            icon={<YouTubeIcon sx={{ color: "#ff0000" }} />}
            label="Official YouTube Channel"
            sx={{
              bgcolor: "rgba(255,0,0,0.08)",
              color: "#ff0000",
              fontWeight: 600,
              mb: 2,
            }}
          />
          <Typography
            variant="h3"
            component="h2"
            sx={{
              fontWeight: 700,
              color: "#222",
              mb: 2,
              fontSize: { xs: "2rem", sm: "2.5rem", md: "3rem" },
              fontFamily: "'Poppins', sans-serif",
            }}
          >
            Join Our <span style={{ color: "#ff0000" }}>Quran Class</span> on YouTube
          </Typography>
          <Typography
            variant="subtitle1"
            sx={{
              color: "#555",
              maxWidth: 700,
              mx: "auto",
              fontSize: "1.1rem",
            }}
          >
            Watch live and recorded sessions, explore Quranic teachings, and deepen your connection through knowledge.
          </Typography>
        </Box>

        {/* YouTube video embed */}
        <Box
          sx={{
            position: "relative",
            width: "100%",
            maxWidth: "850px",
            mx: "auto",
            borderRadius: 3,
            overflow: "hidden",
            boxShadow: "0 8px 40px rgba(0,0,0,0.25)",
            border: "3px solid #ff0000",
          }}
        >
          <iframe
            width="100%"
            height="480"
            src="https://www.youtube.com/embed/wj_cCz6BmVw?si=r_R9o6lI-kmdUXkq"
            title="Join Class on YouTube"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            style={{ display: "block" }}
          />
         
        </Box>

        {/* Bottom text + CTA */}
        <Stack
          direction="column"
          alignItems="center"
          spacing={3}
          sx={{ mt: 6, textAlign: "center" }}
        >
          <Typography
            variant="body1"
            sx={{
              color: "#444",
              fontSize: "1.15rem",
              maxWidth: "650px",
              fontFamily: "'Open Sans', sans-serif",
            }}
          >
            Subscribe to our YouTube channel for regular Quran classes, tafsir sessions, and live Q&A discussions.
          </Typography>

          <Button
            variant="contained"
            startIcon={<YouTubeIcon />}
            endIcon={<NotificationsActiveRoundedIcon />}
            sx={{
              backgroundColor: "#ff0000",
              "&:hover": { backgroundColor: "#cc0000" },
              px: 4,
              py: 1.2,
              fontWeight: 700,
              borderRadius: 2,
              textTransform: "none",
              boxShadow: "0 8px 25px rgba(255,0,0,0.4)",
            }}
            onClick={() =>
              window.open("https://www.youtube.com/", "_blank")
            }
          >
            Subscribe Now
          </Button>
        </Stack>
      </Container>
    </Box>
  );
}

export default YouTubeSection;
