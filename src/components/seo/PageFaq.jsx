'use client';

import { Accordion, AccordionDetails, AccordionSummary, Box, Container, Typography } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

export default function PageFaq({
  title = 'Frequently Asked Questions',
  subtitle = 'Direct answers about online Quran classes, Tajweed, and Easy Quran Class.',
  faqs = [],
  pageTop = false,
}) {
  return (
    <Box
      component="section"
      aria-labelledby="faq-heading"
      sx={{
        py: { xs: 6, md: 10 },
        pt: pageTop ? { xs: 14, md: 16 } : { xs: 6, md: 10 },
        backgroundColor: '#faf6f2',
      }}
    >
      <Container maxWidth="md">
        <Typography
          id="faq-heading"
          variant="h4"
          component={pageTop ? 'h1' : 'h2'}
          sx={{
            fontWeight: 800,
            textAlign: 'center',
            color: 'var(--color-primary)',
            mb: 1.5,
          }}
        >
          {title}
        </Typography>
        {subtitle ? (
          <Typography
            sx={{
              textAlign: 'center',
              color: '#515151',
              mb: 5,
              maxWidth: 640,
              mx: 'auto',
            }}
          >
            {subtitle}
          </Typography>
        ) : null}
        {faqs.map((faq) => (
          <Accordion
            key={faq.question}
            disableGutters
            sx={{
              mb: 1.5,
              borderRadius: '12px !important',
              boxShadow: '0 8px 24px rgba(184,112,47,0.08)',
              '&:before': { display: 'none' },
              overflow: 'hidden',
            }}
          >
            <AccordionSummary
              expandIcon={<ExpandMoreIcon sx={{ color: 'var(--color-primary)' }} />}
              sx={{
                px: 2.5,
                '& .MuiAccordionSummary-content': { my: 1.5 },
              }}
            >
              <Typography component="h3" sx={{ fontWeight: 700, color: '#20110A' }}>
                {faq.question}
              </Typography>
            </AccordionSummary>
            <AccordionDetails sx={{ px: 2.5, pb: 2.5 }}>
              <Typography sx={{ color: '#515151', lineHeight: 1.8 }}>{faq.answer}</Typography>
            </AccordionDetails>
          </Accordion>
        ))}
      </Container>
    </Box>
  );
}
