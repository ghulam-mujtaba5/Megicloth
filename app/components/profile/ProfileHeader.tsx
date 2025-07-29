'use client';

import { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { Avatar, Button, Card, CardContent, Grid, Typography } from '@mui/material';
import { motion } from 'framer-motion';
import EditProfileDialog from './EditProfileDialog';

export default function ProfileHeader() {
  const { user } = useAuth();
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);

  if (!user) {
    return null;
  }

  const handleOpenEditDialog = () => {
    setIsEditDialogOpen(true);
  };

  const handleCloseEditDialog = () => {
    setIsEditDialogOpen(false);
  };

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <Card sx={{ mb: 4, background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', color: 'white', borderRadius: 4 }}>
          <CardContent sx={{ p: { xs: 2, md: 4 } }}>
            <Grid container spacing={3} alignItems="center">
              <Grid item>
                <Avatar
                  src={user.avatarUrl}
                  sx={{ width: { xs: 60, md: 80 }, height: { xs: 60, md: 80 }, border: '3px solid white' }}
                >
                  {user.firstName?.[0] || ''}{user.lastName?.[0] || ''}
                </Avatar>
              </Grid>
              <Grid item xs>
                <Typography variant="h4" sx={{ fontWeight: 700, mb: 1, fontSize: { xs: '1.5rem', md: '2.125rem' } }}>
                  {user.firstName} {user.lastName}
                </Typography>
                <Typography variant="body1" sx={{ opacity: 0.9, mb: 1 }}>
                  {user.email}
                </Typography>
                {user.phone && (
                  <Typography variant="body2" sx={{ opacity: 0.8 }}>
                    {user.phone}
                  </Typography>
                )}
              </Grid>
              <Grid item>
                <Button
                  variant="outlined"
                  onClick={handleOpenEditDialog}
                  sx={{ color: 'white', borderColor: 'white', '&:hover': { borderColor: 'white', backgroundColor: 'rgba(255,255,255,0.1)' } }}
                >
                  Edit Profile
                </Button>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      </motion.div>
      <EditProfileDialog
        open={isEditDialogOpen}
        onClose={handleCloseEditDialog}
        user={user}
      />
    </>
  );
}
