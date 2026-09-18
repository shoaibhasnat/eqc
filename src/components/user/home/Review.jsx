import React from "react";
import {
  Box,
  Container,
  Grid,
  Typography,
  Card,
  CardContent,
  Avatar,
  Stack,
} from "@mui/material";
import StarIcon from "@mui/icons-material/Star";
import FormatQuoteIcon from "@mui/icons-material/FormatQuote";

const cardData = [
  {
    id: 1,
    name: "Ali",
    role: "Father",
    img: "/images/student1.jpg",
    feedback:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam.",
  },
  {
    id: 2,
    name: "Saqib Nadeem",
    role: "Brother",
    img: "/images/student2.jpg",
    feedback:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam.",
  },
  {
    id: 3,
    name: "Fatima Raza",
    role: "Mother",
    img: "/images/student3.jpg",
    feedback:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam.",
  },
];

const Review = () => {
  return (
    <Box sx={{ py: { xs: 6, md: 10 }, bgcolor: "white" }}>
      <Container maxWidth="lg">
        {/* Heading */}
        <Box textAlign="center" mb={6}>
          <Typography
            variant="subtitle1"
            sx={{
              color: "var(--color-primary)",
              fontWeight: "bold",
              letterSpacing: 1,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 1,
            }}
          >
            <Box sx={{ width: 4, height: 20, bgcolor: "var(--color-primary)" }} />
            WHAT CLIENT SAY?
          </Typography>

          <Typography
            variant="h4"
            fontWeight="bold"
            sx={{ mt: 1, mb: 2 }}
            color="var(--color-primary)"
          >
            Satisfied Students
          </Typography>

          <Typography
            variant="body1"
            color="var(--text-dark)"
            sx={{ maxWidth: 700, mx: "auto" }}
          >
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud.
          </Typography>
        </Box>

        {/* Review Grid */}
        <Stack  direction={['column','row']} justifyContent={'center'} flexWrap={'wrap'} gap={3}>
          {cardData.map((item) => (
            <Grid item xs={12} sm={6} md={4} key={item.id}>
              <Card
                sx={{
                  position: "relative",
                  p: 3,
                  textAlign: "center",
                  borderRadius: 2,
                  boxShadow: 3,
                  maxWidth: 350,
                  mx: "auto",
                  transition: "all 0.3s ease",
                  "&:hover": { transform: "translateY(-5px)", boxShadow: 6 },
                }}
              >
                {/* Top Quote Badge */}
                <Box
                  sx={{
                    position: "absolute",
                    top: 0,
                    right: 0,
                    bgcolor: "var(--color-primary)",
                    color: "white",
                    width: 80,
                    height: 80,
                    borderBottomLeftRadius: "100%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <FormatQuoteIcon sx={{ fontSize: 32 }} />
                </Box>

                <Avatar
                  src={item.img}
                  alt={item.name}
                  sx={{
                    width: 70,
                    height: 70,
                    mx: "auto",
                    mb: 2,
                    boxShadow: "0 4px 15px var(--color-primary)",
                    bgcolor:"var(--icon-bg)",
                    color:"var(--color-primary)",
                    "&:hover": { transform: "scale(1.05)",color:"white",bgcolor:"var(--color-primary)",transition:"0.5s",cursor:"pointer" },
                  }}
                />

                <Typography variant="h6" fontWeight="bold" color="var(--color-primary-light)">
                  {item.name}
                </Typography>

                <Typography variant="body2" color="var(--text-dark)" mb={1}>
                  {item.role}
                </Typography>

                {/* Star Rating */}
                <Box mb={2}>
                  {Array(5)
                    .fill()
                    .map((_, i) => (
                      <StarIcon
                        key={i}
                        sx={{ color: "gold", fontSize: 20 }}
                      />
                    ))}
                </Box>

                <CardContent sx={{ p: 0 }}>
                  <Typography variant="body2" color="var(--text-dark)">
                    {item.feedback}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Stack>
      </Container>
    </Box>
  );
};

export default Review;
