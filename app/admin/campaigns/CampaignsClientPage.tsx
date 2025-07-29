"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { 
  Box, Typography, Button, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, 
  IconButton, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Chip
} from '@mui/material';

import { Add, Edit, Delete } from '@mui/icons-material';
import { deleteCampaign } from '@/app/lib/actions/campaigns';
import type { Campaign } from '@/app/types';


interface CampaignsClientPageProps {
  initialCampaigns: Campaign[];
}

export default function CampaignsClientPage({ initialCampaigns }: CampaignsClientPageProps) {
  const [campaigns, setCampaigns] = useState<Campaign[]>(initialCampaigns);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [selectedCampaignId, setSelectedCampaignId] = useState<string | null>(null);
  const router = useRouter();

  const handleAdd = () => {
    router.push('/admin/campaigns/edit/new');
  };

  const handleEdit = (campaignId: string) => {
    router.push(`/admin/campaigns/edit/${campaignId}`);
  };

  const handleDeleteClick = (campaignId: string) => {
    setSelectedCampaignId(campaignId);
    setOpenDeleteDialog(true);
  };

  const handleConfirmDelete = async () => {
    if (!selectedCampaignId) return;
    const result = await deleteCampaign(selectedCampaignId);
    if (result.success) {
      setCampaigns(prev => prev.filter(c => c.id !== selectedCampaignId));
    } else {
      // TODO: Replace with a more robust notification system (e.g., Snackbar)
      alert(result.error || 'Failed to delete campaign.');
    }
    setOpenDeleteDialog(false);
    setSelectedCampaignId(null);
  };

  return (
    <Box sx={{ p: 3 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h4" component="h1" sx={{ fontWeight: 'bold' }}>
          Manage Campaigns
        </Typography>
        <Button variant="contained" startIcon={<Add />} onClick={handleAdd}>
          Add New Campaign
        </Button>
      </Box>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Title</TableCell>
              <TableCell>Slug</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Start Date</TableCell>
              <TableCell>End Date</TableCell>
              <TableCell align="right">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {campaigns.map((campaign) => (
              <TableRow key={campaign.id}>
                <TableCell>{campaign.title}</TableCell>
                <TableCell>{campaign.slug}</TableCell>
                <TableCell>
                  <Chip 
                    label={campaign.is_published ? 'Published' : 'Draft'}
                    color={campaign.is_published ? 'success' : 'default'}
                    size="small"
                  />
                </TableCell>
                <TableCell>{new Date(campaign.start_date).toLocaleDateString()}</TableCell>
                <TableCell>{new Date(campaign.end_date).toLocaleDateString()}</TableCell>
                <TableCell align="right">
                  <IconButton size="small" onClick={() => handleEdit(campaign.id)}>
                    <Edit />
                  </IconButton>
                  <IconButton size="small" onClick={() => handleDeleteClick(campaign.id)}>
                    <Delete />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Dialog
        open={openDeleteDialog}
        onClose={() => setOpenDeleteDialog(false)}
      >
        <DialogTitle>Confirm Deletion</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete this campaign? This action cannot be undone.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDeleteDialog(false)}>Cancel</Button>
          <Button onClick={handleConfirmDelete} color="error">Delete</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
