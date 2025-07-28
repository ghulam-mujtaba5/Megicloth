import React from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
} from '@mui/material';

interface SizeGuideDialogProps {
  open: boolean;
  onClose: () => void;
}

const sizeData = {
  S: { chest: '38', length: '27', sleeve: '24' },
  M: { chest: '40', length: '28', sleeve: '25' },
  L: { chest: '42', length: '29', sleeve: '26' },
  XL: { chest: '44', length: '30', sleeve: '27' },
};

const SizeGuideDialog: React.FC<SizeGuideDialogProps> = ({ open, onClose }) => {
  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle>Size Guide</DialogTitle>
      <DialogContent>
        <Typography variant="body2" sx={{ mb: 2 }}>
          All measurements are in inches.
        </Typography>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Size</TableCell>
                <TableCell align="right">Chest</TableCell>
                <TableCell align="right">Length</TableCell>
                <TableCell align="right">Sleeve</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {Object.entries(sizeData).map(([size, measurements]) => (
                <TableRow key={size}>
                  <TableCell component="th" scope="row">
                    {size}
                  </TableCell>
                  <TableCell align="right">{measurements.chest}</TableCell>
                  <TableCell align="right">{measurements.length}</TableCell>
                  <TableCell align="right">{measurements.sleeve}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default SizeGuideDialog;
