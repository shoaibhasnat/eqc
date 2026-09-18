import React from 'react'
import SchoolRoundedIcon from "@mui/icons-material/SchoolRounded";
import FavoriteRoundedIcon from "@mui/icons-material/FavoriteRounded";
import StarRoundedIcon from "@mui/icons-material/StarRounded";
import SelfImprovementRoundedIcon from "@mui/icons-material/SelfImprovementRounded";
import PersonRoundedIcon from "@mui/icons-material/PersonRounded";
import { Box, Container, Typography, Grid } from "@mui/material";
import { useLanguage } from '../../../contexts/LanguageContext';

// Icon mapping
const iconMap = {
    SchoolRoundedIcon: SchoolRoundedIcon,
    FavoriteRoundedIcon: FavoriteRoundedIcon,
    StarRoundedIcon: StarRoundedIcon,
    SelfImprovementRoundedIcon: SelfImprovementRoundedIcon,
    PersonRoundedIcon: PersonRoundedIcon,
};

function WhyChooseUs() {
  const { content } = useLanguage();
  const whyChooseUsData = content?.about?.whyChooseUsSection || {};
  const heading = whyChooseUsData.heading || 'Why Choose Easy Quran Class?';
  const cardsData = whyChooseUsData.cards || [];

  // Map cards from JSON and add icon components
  const cards = cardsData.map((card) => {
    const IconComponent = iconMap[card.icon] || SchoolRoundedIcon;
    return {
      icon: <IconComponent fontSize="large" />,
      title: card.title,
      desc: card.desc,
    };
  });

  return (
    <>
    
      {/* Why Choose Us / Instructor Section */}
      <Box
        sx={{
          py: { xs: 8, md: 12 },
          backgroundColor: "#faf6f2",
        }}
      > 
      {/* Heading  */}
          <Typography
            variant="h4"
            component="h2"
            sx={{
              fontWeight: 800,
              textAlign: "center",
              color: "var(--color-primary)",
              mb: 6,
            }}
          >
            {heading}
          </Typography>

          <Grid px={[1,2,5,10]} container spacing={3} justifyContent="center">
            {cards.map((item, index) => (
              <Grid size={[12,6,4,3]} key={index}  >
                <Box 
                  sx={{ 
                    textAlign: "center",minHeight:280,
                    p: 3,
                    borderRadius: 6,
                    bgcolor: "#fff",
                    transition: "all 0.3s ease",
                    position: "relative",
                    overflow: "hidden",
                    "&:hover": {
                      transform: "translateY(-6px)",
                      boxShadow: "0 8px 24px rgba(0,0,0,0.1)",
                    },
                    "&::before": {
                      content: '""',
                      position: "absolute",
                      top: 0,
                      left: 0,
                      width: "40%",
                      height: "30%",
                      borderTop: "4px solid var(--color-primary)",
                      borderLeft: "4px solid var(--color-primary)",
                      borderRadius: "24px 0 0 0",
                      pointerEvents: "none",
                    },
                    "&::after": {
                      content: '""',
                      position: "absolute",
                      bottom: 0,
                      right: 0,
                      width: "40%",
                      height: "30%",
                      borderBottom: "4px solid var(--color-primary)",
                      borderRight: "4px solid var(--color-primary)",
                      borderRadius: "0 0 24px 0",
                      pointerEvents: "none",
                    },
                  }}
                >
                  <Box
                    sx={{
                      width: 70,
                      height: 70,
                      mx: "auto",
                      mb: 2,
                      borderRadius: "50%",
                      bgcolor: "var(--icon-bg)",
                      color: "var(--color-primary)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    {item.icon}
                  </Box>
                  <Typography
                    variant="h6"
                    sx={{
                      fontWeight: 700,
                      mb: 1,
                      color: "var(--color-primary)",
                    }}
                  >
                    {item.title}
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{ color: "#555", lineHeight: 1.6 }}
                  >
                    {item.desc}
                  </Typography>
                </Box>
              </Grid>
            ))}
          </Grid> 
      </Box>
      
    </>
  )
}

export default WhyChooseUs
