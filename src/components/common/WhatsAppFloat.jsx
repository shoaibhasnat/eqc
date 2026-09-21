'use client';

import { Fab } from '@mui/material';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import { SITE_WHATSAPP } from '@/lib/seo';

export default function WhatsAppFloat() {
  return (
    <Fab
      component="a"
      href={SITE_WHATSAPP}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat on WhatsApp"
      sx={{
        position: 'fixed',
        right: { xs: 16, md: 24 },
        bottom: { xs: 20, md: 28 },
        zIndex: 1300,
        bgcolor: '#25D366',
        color: '#fff',
        width: 56,
        height: 56,
        boxShadow: '0 8px 24px rgba(37, 211, 102, 0.45)',
        '&:hover': {
          bgcolor: '#1ebe5d',
        },
      }}
    >
      <WhatsAppIcon sx={{ fontSize: 30 }} />
    </Fab>
  );
}
