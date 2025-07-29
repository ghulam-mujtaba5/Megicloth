import { getAllUsers } from '@/app/lib/actions/users';
import UsersClientPage from './UsersClientPage';
import { Box, Typography } from '@mui/material';

export default async function AdminUsersPage() {
  try {
    const users = await getAllUsers();
    return <UsersClientPage initialUsers={users || []} />;
  } catch (error) {
    console.error('Failed to fetch users:', error);
    return (
      <Box sx={{ p: 3 }}>
        <Typography color="error">Failed to load users. Please try again later.</Typography>
      </Box>
    );
  }
}
