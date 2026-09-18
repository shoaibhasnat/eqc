import React from "react";
import {
  Box,
  Container,
  Grid,
  Typography,
} from "@mui/material";
import SchoolIcon from "@mui/icons-material/School";
import PeopleIcon from "@mui/icons-material/People";
import PublicIcon from "@mui/icons-material/Public";
import StarIcon from "@mui/icons-material/Star";
import CountUp from "react-countup";
import { useInView } from "react-intersection-observer";
import { useLanguage } from '../../../contexts/LanguageContext';

const BACKGROUND_IMAGE = "/images/statImg.jpg";

// Icon mapping
const iconMap = {
  SchoolIcon: SchoolIcon,
  PeopleIcon: PeopleIcon,
  PublicIcon: PublicIcon,
  StarIcon: StarIcon,
};

const StatsSection = () => {
  const { content } = useLanguage();
  const statsData = content?.about?.statsSection || {};
  const statsArray = statsData.stats || [];

  // Map stats from JSON and add icon components
  const stats = statsArray.map((stat) => {
    const IconComponent = iconMap[stat.icon] || SchoolIcon;
    return {
      icon: <IconComponent />,
      end: stat.end,
      suffix: stat.suffix || "",
      label: stat.label,
    };
  });

  const { ref: sectionRef, inView } = useInView({
    triggerOnce: true,
    threshold: 0.6,
  });

  return (
    <Box
      ref={sectionRef}
      sx={{
        backgroundImage: `linear-gradient(rgba(180, 140, 7, 0.55), rgba(230, 196, 49, 0.61)), url(${BACKGROUND_IMAGE})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        py: { xs: 6, md: 10 },
        color: "#fff",
        textAlign: "center",
      }}
    >
      <Container maxWidth="lg">
        <Grid
          container
          spacing={{ xs: 3, md: 5 }}
          justifyContent="space-evenly"
          alignItems="center"
        >
          {stats.map((stat, idx) => (
            <Grid size={{ xs: 6, sm: 3 }} key={idx}>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  textAlign: "center",
                }}
              >
                {/* Icon */}
                <Box
                  sx={{
                    bgcolor: "var(--color-primary-light)",
                    width: { xs: 56, sm: 64, md: 72 },
                    height: { xs: 56, sm: 64, md: 72 },
                    borderRadius: "50%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    mb: 2,
                    transition: "0.3s",
                    "&:hover": { bgcolor: "var(--color-primary-hover)" },
                  }}
                >
                  {React.cloneElement(stat.icon, {
                    sx: { fontSize: { xs: 28, sm: 32, md: 36 }, color: "white" },
                  })}
                </Box>

                {/* Animated Number */}
                <Typography
                  variant="h4"
                  fontWeight="bold"
                  sx={{
                    fontSize: { xs: "1.8rem", sm: "2.2rem", md: "2.5rem" },
                    lineHeight: 1.2,
                  }}
                >
                  {inView ? (
                    <CountUp
                      start={0}
                      end={stat.end}
                      duration={2.5}
                      suffix={stat.suffix || ""}
                    />
                  ) : (
                    "0"
                  )}
                </Typography>

                {/* Label */}
                <Typography
                  variant="body1"
                  sx={{
                    mt: 1,
                    fontSize: { xs: "0.85rem", sm: "1rem" },
                    opacity: 0.9,
                    fontWeight: 500,
                  }}
                >
                  {stat.label}
                </Typography>
              </Box>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
};

export default StatsSection;
