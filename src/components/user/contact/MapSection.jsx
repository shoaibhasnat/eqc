import React from "react";
import { Box, Container } from "@mui/material";
import { SITE_MAPS_EMBED_URL } from "@/lib/seo";

const MapSection = () => {
  return (
    <Box sx={{ py: { xs: 5, md: 8 }, bgcolor: "#ebebeb" }} px={[1,2,3,5,10]}>
      <Container maxWidth="100%" >
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
            title="Easy Quran Class Location"
            src={SITE_MAPS_EMBED_URL}
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
