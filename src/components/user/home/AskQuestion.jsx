import React from "react";
import {
  Box,
  Grid,
  Typography,
  Button,
  Stack,
} from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import LockIcon from "@mui/icons-material/Lock";
import { useLanguage } from "../../../contexts/LanguageContext";

/* =======================
   COLOR SCHEME (SAME AS DESIGN)
======================= */
const colors = {
  bg: "#F7F2EC",
  cardBg: "#FFFFFF",
  primary: "#C47A3D",
  primaryDark: "#B06A32",
  textPrimary: "#1C1C1C",
  textSecondary: "#6F6F6F",
};

/* =======================
   ICON MAPPING
======================= */
const iconMap = {
  CheckCircleIcon: CheckCircleIcon,
  LockIcon: LockIcon,
};

/* =======================
   COMPONENT
======================= */
export default function AskQuestion() {
  const { content } = useLanguage();
  
  // Get askQuestion content from JSON
  const askQuestionContent = content?.home?.askQuestion || {};
  const title = askQuestionContent.title || "Have a Question?";
  const description = askQuestionContent.description || "";
  const features = askQuestionContent.features || [];
  const buttonText = askQuestionContent.buttonText || "Ask a Question";

  return (
    <Box sx={{ backgroundColor: colors.bg, py: { xs: 6, md: 10 }, px: 2 }}>

      <Grid container spacing={4} justifyContent={['center','center','space-between']} maxWidth="lg" mx="auto" px={[1,2,3,5,10]}>
        {/* LEFT SECTION */}
        <Grid size={{ xs: 12, md: 6 }}>
          <Box>
            <Box
              sx={{
                width: 60,
                height: 4,
                backgroundColor: colors.primary,
                mb: 2,
              }}
            />

            <Typography
              variant="h4"
              fontWeight={700}
              color={colors.textPrimary}
              mb={2}
            >
              {title}
            </Typography>

            <Typography
              color={colors.textSecondary}
              maxWidth={420}
              mb={4}
            >
              {description}
            </Typography>

            <Stack spacing={3}>
              {features.map((item, index) => {
                const IconComponent = iconMap[item.icon] || CheckCircleIcon;
                return (
                  <Stack direction="row" spacing={2} key={index} alignItems="flex-start">
                    <Box
                      sx={{
                        backgroundColor: colors.primary,
                        color: "#fff",
                        borderRadius: "50%",
                        width: 36,
                        height: 36,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <IconComponent fontSize="small" />
                    </Box>
                    <Box>
                      <Typography fontWeight={600} color="var(--color-primary)">
                        {item.title}
                      </Typography>
                      <Typography fontSize={14} color={colors.textSecondary}>
                        {item.subtitle}
                      </Typography>
                    </Box>
                  </Stack>
                );
              })}
            </Stack>
          </Box>
          <Button href="#contact-form" sx={{
            backgroundColor:"var(--color-primary)",
            color:"white",
            p:2,
            mt:3,
            borderRadius:2.5,
            "&:hover":{backgroundColor:"var(--color-primary-hover)",transition:"0.5s all"}
          }}>{buttonText}</Button>
        </Grid>
          <img src="/images/question.jpeg" alt="ask a question" style={{height:400,width:440, borderRadius:"20px"}}/>
       
      </Grid>
    </Box>
  );
}
