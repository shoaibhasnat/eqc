import React from "react";
import { Box, Container, Typography } from "@mui/material";

const MapSection = () => {
  return (
    <Box sx={{ py: { xs: 5, md: 8 }, bgcolor: "#ebebeb" }} px={[1,2,3,5,10]}>
      <Container maxWidth="100%" >
        {/* Heading */}
        {/* <Typography
          variant="h4"
          fontWeight="bold"
          textAlign="center"
          gutterBottom
          sx={{ mb: { xs: 3, md: 5 } }}
          color="var(--color-primary)"
        >
          Visit Our Academy
        </Typography> */}

        {/* Responsive Map Wrapper */}
        <Box
          sx={{
            position: "relative",
            overflow: "hidden",
            borderRadius: 2,
            boxShadow: 3,
            minHeight: {xs:300,sm:380,md:500},
          }}
        >
          <iframe
            title="Quran Academy Location"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3620.0860613067895!2d67.00113667539957!3d24.86073487793633!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3eb33e7b8aeb6f0d%3A0x81a414cfb12d7ff2!2sMazar-e-Quaid!5e0!3m2!1sen!2s!4v1731352949123!5m2!1sen!2s"
            style={{
              border: 0,
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
            }}
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </Box>

   
      </Container>
    </Box>
  );
};

export default MapSection;
