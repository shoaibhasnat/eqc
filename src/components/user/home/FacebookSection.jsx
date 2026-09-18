// src/components/user/home/FacebookSection.jsx
'use client'
import React from "react";
import {
  Box,
  Typography,
  Container,
  Button,
  Stack,
  Chip,
  Avatar,
  Card,
  CardContent,
} from "@mui/material";
import FacebookRoundedIcon from "@mui/icons-material/FacebookRounded";
import VerifiedRoundedIcon from "@mui/icons-material/VerifiedRounded";
import LiveTvRoundedIcon from "@mui/icons-material/LiveTvRounded";

function FacebookSection({
  pageName = "Easy Quran Class",
  followers = "30K followers",
  pageUrl = "https://www.facebook.com/EasyQuranClass/",
  embedUrl = "https://www.facebook.com/plugins/post.php?href=https%3A%2F%2Fwww.facebook.com%2FEasyQuranClass%2Fposts%2Fpfbid0JZPGoTZrE634M6EAAHNKn1rwHVMf6rtygzyiwnJG7vSE6qmPnvX5uZzmrmuuR6pAl&show_text=true&width=500",
}) {
  return (
    <Box
      sx={{
        py: { xs: 8, md: 12 },
      
        overflow: "hidden",
      }}
    >
    

      <Container maxWidth="lg">
        {/* Header */}
        <Box sx={{ textAlign: "center", mb: 6 }}>
          <Chip
            icon={<FacebookRoundedIcon sx={{ color: "#1877f2" }} />}
            label="Official Facebook Page"
            sx={{
              bgcolor: "rgba(24,119,242,0.08)",
              color: "#1877f2",
              fontWeight: 700,
              mb: 2,
            }}
          />
          <Typography
            variant="h3"
            component="h2"
            sx={{
              fontWeight: 800,
              color: "#0f172a",
              mb: 1.5,
              fontSize: { xs: "2rem", sm: "2.5rem", md: "3rem" },
              letterSpacing: "-0.5px",
            }}
          >
            Join Class on <span style={{ color: "#1877f2" }}>Facebook</span>
          </Typography>
          <Typography
            variant="subtitle1"
            sx={{
              color: "#475569",
              maxWidth: 760,
              mx: "auto",
              fontSize: "1.05rem",
            }}
          >
            Watch live sessions, get reminders, and connect with the community.
          </Typography>
        </Box>

        {/* Facebook Card */}
        <Card
          elevation={0}
          sx={{
            maxWidth: 600,
            mx: "auto",
            borderRadius: 3,
            overflow: "hidden",
            border: "1px solid",
            borderColor: "divider",
            boxShadow:
              "0 10px 30px rgba(0,0,0,0.08), inset 0 1px 0 rgba(255,255,255,0.6)",
            bgcolor: "#fff",
          }}
        >
          {/* Facebook Page Header */}
          <Box
            sx={{
              background: "linear-gradient(135deg, #1877f2 0%, #4ea2ff 100%)",
              p: 3,
              color: "#fff",
            }}
          >
            <Stack direction="row" alignItems="center" spacing={1.5}>
              <Avatar
                sx={{
                  bgcolor: "#fff",
                  color: "#1877f2",
                  width: 48,
                  height: 48,
                  fontWeight: 800,
                  fontSize: "1.2rem",
                }}
              >
                E
              </Avatar>
              <Box sx={{ flex: 1 }}>
                <Stack direction="row" alignItems="center" spacing={1}>
                  <Typography variant="h6" sx={{ fontWeight: 800 }}>
                    {pageName}
                  </Typography>
                  <VerifiedRoundedIcon fontSize="small" />
                </Stack>
                <Typography variant="body2" sx={{ opacity: 0.95 }}>
                  {followers} • القرآن
                </Typography>
              </Box>
            </Stack>

            <Stack
              direction={{ xs: "column", sm: "row" }}
              spacing={1.5}
              sx={{ mt: 2 }}
            >
              <Button
                fullWidth
                variant="contained"
                startIcon={<FacebookRoundedIcon />}
                onClick={() => window.open(pageUrl, "_blank")}
                sx={{
                  backgroundColor: "#fff",
                  color: "#1877f2",
                  fontWeight: 800,
                  textTransform: "none",
                  borderRadius: 2,
                  "&:hover": { backgroundColor: "#f1f5ff" },
                }}
              >
                Follow Page
              </Button>
              <Button
                fullWidth
                variant="outlined"
                startIcon={<LiveTvRoundedIcon />}
                onClick={() => window.open(pageUrl, "_blank")}
                sx={{
                  borderColor: "#ffffffaa",
                  color: "#fff",
                  fontWeight: 700,
                  textTransform: "none",
                  borderRadius: 2,
                  "&:hover": { borderColor: "#fff", backgroundColor: "#ffffff14" },
                }}
              >
                Watch Live
              </Button>
            </Stack>
          </Box>

          {/* Embedded Facebook Post */}
          <CardContent
            sx={{
              p: 0,
              backgroundColor: "#fff",
            }}
          >
            <Box
              sx={{
                width: "100%",
                display: "flex",
                justifyContent: "center",
                p: 2,
                backgroundColor: "#fff",
              }}
            >
              <iframe
                src={embedUrl}
                width="500"
                height="500"
                style={{
                  border: "none",
                  overflow: "hidden",
                  maxWidth: "100%",
                }}
                scrolling="no"
                frameBorder="0"
                allowFullScreen={true}
                allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
                title="Easy Quran Class Facebook Post"
              ></iframe>
            </Box>
          </CardContent>
        </Card>

        {/* Footer message */}
        <Stack alignItems="center" sx={{ mt: 6 }}>
          <Stack
            direction="row"
            spacing={1}
            alignItems="center"
            sx={{
              px: 2,
              py: 0.75,
              borderRadius: 999,
              bgcolor: "rgba(24,119,242,0.08)",
              border: "1px solid rgba(24,119,242,0.18)",
            }}
          >
            <FacebookRoundedIcon sx={{ color: "#1877f2" }} />
            <Typography variant="body2" sx={{ color: "#0f172a", fontWeight: 600 }}>
              Get notified when we go live — follow the page!
            </Typography>
          </Stack>
        </Stack>
      </Container>
    </Box>
  );
}

export default FacebookSection;
