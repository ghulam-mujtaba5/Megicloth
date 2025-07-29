import { getLoyaltyHistory } from '@/app/lib/actions/loyalty';
import { 
  Typography, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Chip 
} from '@mui/material';

export default async function LoyaltyHistory() {
  const { success, history, error } = await getLoyaltyHistory();

  if (!success) {
    return (
      <Paper sx={{ p: 3, backgroundColor: 'error.light' }}>
        <Typography color="error.contrastText">{error || 'Could not load loyalty history.'}</Typography>
      </Paper>
    );
  }

  if (!history || history.length === 0) {
    return (
      <Paper sx={{ p: 3 }}>
        <Typography variant="h6" component="h2" sx={{ fontWeight: 'bold', mb: 2 }}>
          Points History
        </Typography>
        <Typography sx={{ color: 'text.secondary' }}>
          You don't have any points history yet. Start shopping to earn points!
        </Typography>
      </Paper>
    );
  }

  return (
    <Paper sx={{ p: { xs: 2, md: 3 } }}>
      <Typography variant="h6" component="h2" sx={{ fontWeight: 'bold', mb: 2 }}>
        Points History
      </Typography>
      <TableContainer>
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell>Date</TableCell>
              <TableCell>Reason</TableCell>
              <TableCell align="right">Points</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {history.map((item) => (
              <TableRow key={item.id}>
                <TableCell>{new Date(item.created_at).toLocaleDateString()}</TableCell>
                <TableCell>{item.reason}</TableCell>
                <TableCell align="right">
                  <Chip 
                    label={`${item.points_change > 0 ? '+' : ''}${item.points_change}`}
                    color={item.points_change > 0 ? 'success' : 'error'}
                    variant="outlined"
                    size="small"
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
}
