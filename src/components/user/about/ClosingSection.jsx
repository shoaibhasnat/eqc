import React from 'react'
import { Box, Container, Typography, Button } from "@mui/material";
import { useRouter } from 'next/navigation';
function ClosingSection() {
  const router = useRouter();
  const navigate = (path) => router.push(path);
  return (
    <>
      {/* Closing Section */}
      <Box
        sx={{
          py: { xs: 8, md: 10 },
          background: "linear-gradient(135deg, #fff 0%, #f5ece3 100%)",
          textAlign: "center",
        }}
      >
        <Container maxWidth="sm">
          <Typography
            variant="h4"
            sx={{
              fontWeight: 800,
              mb: 2,
              color: "var(--color-primary)",
            }}
          >
            Start Your Journey Today
          </Typography>
          <Typography
            variant="body1"
            color="text.secondary"
            sx={{ mb: 4, lineHeight: 1.6 }}
          >
            Join thousands of learners and make your connection with the Quran
            stronger — one verse at a time.
          </Typography>
          <Button
            variant="contained"
            size="large"
            sx={{
              backgroundColor: "var(--color-primary)",
              "&:hover": { backgroundColor: "var(--color-primary-hover)" },
              px: 4,
              py: 1.5,
              borderRadius: 2,
              textTransform: "none",
              fontWeight: 700,
              color: "#fff",
            }}
            onClick={() => navigate("/contact")}
          >
            Enroll Now
          </Button>
        </Container>
      </Box>
    </>
  )
}

export default ClosingSection
