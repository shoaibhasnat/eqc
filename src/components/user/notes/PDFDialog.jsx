import React from 'react';
import {
  Dialog,
  DialogContent,
  IconButton,
  Box,
  Typography,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

const PDFDialog = ({ open, onClose, pdfUrl, title = "PDF Document" }) => {
  return (
    <Dialog
      open={open}
      onClose={onClose}
      fullScreen
      sx={{
        '& .MuiDialog-paper': {
          margin: 0,
          maxHeight: '100vh',
          maxWidth: '100vw',
        },
      }}
    >
      <DialogContent
        sx={{
          padding: 0,
          position: 'relative',
          height: '100vh',
          width: '100vw',
          backgroundColor: '#f5f5f5',
        }}
      >
        {/* Close Button */}
        <IconButton
          onClick={onClose}
          sx={{
            position: 'absolute',
            top: 16,
            right: 16,
            zIndex: 1000,
            backgroundColor: 'rgba(0, 0, 0, 0.7)',
            color: 'white',
            '&:hover': {
              backgroundColor: 'rgba(0, 0, 0, 0.9)',
            },
          }}
        >
          <CloseIcon />
        </IconButton>

        {/* PDF Viewer */}
        <Box
          sx={{
            height: '100%',
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          {/* Title Bar */}
          <Box
            sx={{
              backgroundColor: '#fff',
              padding: 2,
              borderBottom: '1px solid #e0e0e0',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Typography variant="h6" fontWeight={600}>
              {title}
            </Typography>
          </Box>

          {/* PDF Content */}
          <Box
            sx={{
              flex: 1,
              overflow: 'hidden',
            }}
          >
            <iframe
              src={pdfUrl}
              width="100%"
              height="100%"
              style={{
                border: 'none',
                backgroundColor: '#fff',
              }}
              title={title}
            />
          </Box>
        </Box>
      </DialogContent>
    </Dialog>
  );
};

export default PDFDialog;
