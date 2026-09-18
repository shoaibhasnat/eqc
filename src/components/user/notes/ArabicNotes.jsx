import React, { useState } from 'react';
import { Typography, Button, Box } from '@mui/material';
import PDFDialog from './PDFDialog';

function ArabicNotes() {
    const [dialogOpen, setDialogOpen] = useState(false);
    
    const pdfUrl = "https://drive.google.com/file/d/1JbbvXB25250eLp0LfJ81R02ssR1JceVx/preview";
    
    const handleOpenDialog = () => {
        setDialogOpen(true);
    };
    
    const handleCloseDialog = () => {
        setDialogOpen(false);
    };

    return (
        <> 
            <Box sx={{ p: 4, textAlign: 'center' }}>
                <Typography variant="h4" sx={{ mb: 3 }}>
                    Arabic Notes
                </Typography>
                <Button
                    variant="contained"
                    size="large"
                    onClick={handleOpenDialog}
                    sx={{
                        backgroundColor: 'var(--color-primary)',
                        '&:hover': { backgroundColor: '#a25e26' },
                        px: 4,
                        py: 1.5,
                        borderRadius: 2,
                        textTransform: 'none',
                        fontWeight: 700,
                    }}
                >
                    View Arabic Notes PDF
                </Button>
            </Box>
            
            <PDFDialog
                open={dialogOpen}
                onClose={handleCloseDialog}
                pdfUrl={pdfUrl}
                title="Arabic Notes"
            />
        </>
    );
}

export default ArabicNotes;
