"use client";
import { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { useOrders } from "../context/OrderContext";
import { useRouter } from "next/navigation";
import {
  Container,
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  Avatar,
  Button,
  Tabs,
  Tab,
  List,
  Divider,
  Chip,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Switch,
  FormControlLabel,
} from "@mui/material";
import toast from "react-hot-toast";
import {
  Person,
  ShoppingBag,
  Favorite,
  LocationOn,
  Settings,
  Add,
  Delete,
} from "@mui/icons-material";
import { motion } from "framer-motion";

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`profile-tabpanel-${index}`}
      aria-labelledby={`profile-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ py: 3 }}>{children}</Box>}
    </div>
  );
}

export default function ProfilePage() {
  const { user, isAuthenticated, isLoading, updateProfile, addAddress, removeAddress } = useAuth();
  const { getOrdersForCurrentUser } = useOrders();
  const orders = getOrdersForCurrentUser();
  const router = useRouter();
  const [tabValue, setTabValue] = useState(0);
  const [addAddressDialog, setAddAddressDialog] = useState(false);
  const [newAddress, setNewAddress] = useState({
    type: "home" as const,
    firstName: "",
    lastName: "",
    address: "",
    city: "",
    state: "",
    postalCode: "",
    country: "Pakistan",
    phone: "",
    isDefault: false,
  });

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.push("/auth/login");
    }
  }, [isAuthenticated, isLoading, router]);

  if (isLoading) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", minHeight: "60vh" }}>
        <Typography>Loading...</Typography>
      </Box>
    );
  }

  if (!user) {
    return null;
  }

  const handleTabChange = (_: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  const handleAddAddress = async () => {
    try {
      const result = await addAddress(newAddress);
      
      if (result.success) {
        toast.success("Address added successfully!");
        setAddAddressDialog(false);
        setNewAddress({
          type: "home",
          firstName: "",
          lastName: "",
          address: "",
          city: "",
          state: "",
          postalCode: "",
          country: "Pakistan",
          phone: "",
          isDefault: false,
        });
      } else {
        toast.error(result.error || "Failed to add address");
      }
    } catch (error) {
      toast.error("An error occurred while adding address");
    }
  };

  const handleRemoveAddress = async (id: string) => {
    try {
      const result = await removeAddress(id);
      
      if (result.success) {
        toast.success("Address removed successfully!");
      } else {
        toast.error(result.error || "Failed to remove address");
      }
    } catch (error) {
      toast.error("An error occurred while removing address");
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "delivered":
        return "success";
      case "processing":
        return "warning";
      case "cancelled":
        return "error";
      default:
        return "default";
    }
  };

  // Glassmorphism style for main profile card and sticky/floating elements
  const glassCardSx = {
    borderRadius: 4,
    background: 'rgba(255,255,255,0.65)',
    boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.18)',
    backdropFilter: 'blur(12px)',
    WebkitBackdropFilter: 'blur(12px)',
    border: '1px solid rgba(255,255,255,0.25)',
    overflow: 'hidden',
    p: { xs: 2, md: 4 },
  };

  return (
    <Box sx={{ minHeight: '100vh', background: 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)' }}>
      <Container maxWidth="xl" sx={{ py: { xs: 3, md: 4 } }}>
        {/* Page Header */}
        <Box sx={{ mb: { xs: 3, md: 4 } }}>
          <Typography
            variant="h1"
            sx={{
              fontSize: { xs: '2.2rem', md: '3.2rem' },
              fontWeight: 900,
              textAlign: 'center',
              mb: 2,
              background: 'linear-gradient(45deg, #1e293b 30%, #2563eb 90%)',
              backgroundClip: 'text',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              letterSpacing: '-1.5px',
            }}
          >
            My Profile
          </Typography>
          <Typography
            variant="h6"
            sx={{
              textAlign: 'center',
              color: '#64748b',
              mb: 3,
              fontWeight: 500,
              fontSize: { xs: '1.1rem', md: '1.25rem' },
            }}
          >
            Manage your account, orders, and addresses
          </Typography>
        </Box>
        {/* Main Profile Card (Glassmorphism) */}
        <Box sx={glassCardSx}>
          {/* Profile Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Card sx={{ mb: 4, background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)", color: "white" }}>
              <CardContent sx={{ p: 4 }}>
                <Grid container spacing={3} alignItems="center">
                  <Grid item>
                    <Avatar
                      src={user.avatar}
                      sx={{ width: 80, height: 80, border: "3px solid white" }}
                    >
                      {user.firstName[0]}{user.lastName[0]}
                    </Avatar>
                  </Grid>
                  <Grid item xs>
                    <Typography variant="h4" sx={{ fontWeight: 700, mb: 1 }}>
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
                      sx={{ color: "white", borderColor: "white", "&:hover": { borderColor: "white", backgroundColor: "rgba(255,255,255,0.1)" } }}
                    >
                      Edit Profile
                    </Button>
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
          </motion.div>

          {/* Tabs */}
          <Box sx={{ borderBottom: 1, borderColor: "divider", mb: 3 }}>
            <Tabs value={tabValue} onChange={handleTabChange} aria-label="profile tabs">
              <Tab icon={<Person />} label="Profile" />
              <Tab icon={<ShoppingBag />} label="Orders" />
              <Tab icon={<Favorite />} label="Wishlist" />
              <Tab icon={<LocationOn />} label="Addresses" />
              <Tab icon={<Settings />} label="Settings" />
            </Tabs>
          </Box>

          {/* Profile Tab */}
          <TabPanel value={tabValue} index={0}>
            <Grid container spacing={3}>
              <Grid item xs={12} md={6}>
                <Card>
                  <CardContent>
                    <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
                      Personal Information
                    </Typography>
                    <Box sx={{ mb: 2 }}>
                      <Typography variant="body2" color="text.secondary">
                        First Name
                      </Typography>
                      <Typography variant="body1">{user.firstName}</Typography>
                    </Box>
                    <Box sx={{ mb: 2 }}>
                      <Typography variant="body2" color="text.secondary">
                        Last Name
                      </Typography>
                      <Typography variant="body1">{user.lastName}</Typography>
                    </Box>
                    <Box sx={{ mb: 2 }}>
                      <Typography variant="body2" color="text.secondary">
                        Email
                      </Typography>
                      <Typography variant="body1">{user.email}</Typography>
                      {!user.isEmailVerified && (
                        <Chip label="Not Verified" color="warning" size="small" sx={{ ml: 1 }} />
                      )}
                    </Box>
                    {user.phone && (
                      <Box>
                        <Typography variant="body2" color="text.secondary">
                          Phone
                        </Typography>
                        <Typography variant="body1">{user.phone}</Typography>
                      </Box>
                    )}
                  </CardContent>
                </Card>
              </Grid>
              <Grid item xs={12} md={6}>
                <Card>
                  <CardContent>
                    <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
                      Account Statistics
                    </Typography>
                    <Box sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}>
                      <Typography variant="body2" color="text.secondary">
                        Member Since
                      </Typography>
                      <Typography variant="body1">
                        {new Date(user.createdAt).toLocaleDateString()}
                      </Typography>
                    </Box>
                    <Box sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}>
                      <Typography variant="body2" color="text.secondary">
                        Last Login
                      </Typography>
                      <Typography variant="body1">
                        {new Date(user.lastLogin).toLocaleDateString()}
                      </Typography>
                    </Box>
                    <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                      <Typography variant="body2" color="text.secondary">
                        Total Orders
                      </Typography>
                      <Typography variant="body1">{orders.length}</Typography>
                    </Box>
                  </CardContent>
                </Card>
              </Grid>
            </Grid>
          </TabPanel>

          {/* Orders Tab */}
          <TabPanel value={tabValue} index={1}>
            <Typography variant="h6" sx={{ mb: 3, fontWeight: 600 }}>
              Order History
            </Typography>
            {orders.length === 0 ? (
              <Card>
                <CardContent sx={{ textAlign: "center", py: 4 }}>
                  <ShoppingBag sx={{ fontSize: 60, color: "text.secondary", mb: 2 }} />
                  <Typography variant="h6" color="text.secondary" sx={{ mb: 1 }}>
                    No orders yet
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Start shopping to see your order history here
                  </Typography>
                </CardContent>
              </Card>
            ) : (
              <List>
                {orders.map((order) => (
                  <Card key={order.id} sx={{ mb: 2 }}>
                    <CardContent>
                      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 2 }}>
                        <Typography variant="h6" sx={{ fontWeight: 600 }}>
                          {order.id}
                        </Typography>
                        <Chip
                          label={order.status}
                          color={getStatusColor(order.status) as any}
                          size="small"
                        />
                      </Box>
                      <Box sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}>
                        <Typography variant="body2" color="text.secondary">
                          Date: {new Date(order.date).toLocaleDateString()}
                        </Typography>
                        <Typography variant="body1" sx={{ fontWeight: 600 }}>
                          Rs. {order.total.toLocaleString()}
                        </Typography>
                      </Box>
                      <Divider sx={{ my: 1 }} />
                      {order.items.map((item, itemIndex) => (
                        <Box key={itemIndex} sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}>
                          <Typography variant="body2">
                            {item.name} x{item.quantity}
                          </Typography>
                          <Typography variant="body2">
                            Rs. {item.price.toLocaleString()}
                          </Typography>
                        </Box>
                      ))}
                    </CardContent>
                  </Card>
                ))}
              </List>
            )}
          </TabPanel>

          {/* Wishlist Tab */}
          <TabPanel value={tabValue} index={2}>
            <Typography variant="h6" sx={{ mb: 3, fontWeight: 600 }}>
              My Wishlist
            </Typography>
            <Card>
              <CardContent sx={{ textAlign: "center", py: 4 }}>
                <Favorite sx={{ fontSize: 60, color: "text.secondary", mb: 2 }} />
                <Typography variant="h6" color="text.secondary" sx={{ mb: 1 }}>
                  Your wishlist is empty
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                  Start adding products to your wishlist to see them here
                </Typography>
                <Button variant="contained" href="/products">
                  Browse Products
                </Button>
              </CardContent>
            </Card>
          </TabPanel>

          {/* Addresses Tab */}
          <TabPanel value={tabValue} index={3}>
            <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 3 }}>
              <Typography variant="h6" sx={{ fontWeight: 600 }}>
                My Addresses
              </Typography>
              <Button
                variant="contained"
                startIcon={<Add />}
                onClick={() => setAddAddressDialog(true)}
              >
                Add Address
              </Button>
            </Box>
            
            <Grid container spacing={2}>
              {user.addresses.map((address) => (
                <Grid item xs={12} md={6} key={address.id}>
                  <Card>
                    <CardContent>
                      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", mb: 2 }}>
                        <Chip label={address.type} color="primary" size="small" />
                        {address.isDefault && (
                          <Chip label="Default" color="success" size="small" />
                        )}
                      </Box>
                      <Typography variant="body1" sx={{ fontWeight: 600, mb: 1 }}>
                        {address.firstName} {address.lastName}
                      </Typography>
                      <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                        {address.address}
                      </Typography>
                      <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                        {address.city}, {address.state} {address.postalCode}
                      </Typography>
                      <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                        {address.country}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {address.phone}
                      </Typography>
                      <Box sx={{ mt: 2, display: "flex", gap: 1 }}>
                        {/* <IconButton size="small" color="primary">
                          <Edit />
                        </IconButton> */}
                        <IconButton
                          size="small"
                          color="error"
                          onClick={() => handleRemoveAddress(address.id)}
                        >
                          <Delete />
                        </IconButton>
                      </Box>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </TabPanel>

          {/* Settings Tab */}
          <TabPanel value={tabValue} index={4}>
            <Typography variant="h6" sx={{ mb: 3, fontWeight: 600 }}>
              Account Settings
            </Typography>
            <Grid container spacing={3}>
              <Grid item xs={12} md={6}>
                <Card>
                  <CardContent>
                    <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
                      Notifications
                    </Typography>
                    <FormControlLabel
                      control={
                        <Switch
                          checked={user.preferences.notifications}
                          onChange={(e) => updateProfile({ preferences: { ...user.preferences, notifications: e.target.checked } })}
                        />
                      }
                      label="Push Notifications"
                    />
                    <FormControlLabel
                      control={
                        <Switch
                          checked={user.preferences.newsletter}
                          onChange={(e) => updateProfile({ preferences: { ...user.preferences, newsletter: e.target.checked } })}
                        />
                      }
                      label="Newsletter"
                    />
                    <FormControlLabel
                      control={
                        <Switch
                          checked={user.preferences.marketing}
                          onChange={(e) => updateProfile({ preferences: { ...user.preferences, marketing: e.target.checked } })}
                        />
                      }
                      label="Marketing Emails"
                    />
                  </CardContent>
                </Card>
              </Grid>
              <Grid item xs={12} md={6}>
                <Card>
                  <CardContent>
                    <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
                      Security
                    </Typography>
                    <Button
                      variant="outlined"
                      fullWidth
                      sx={{ mb: 2 }}
                      href="/auth/change-password"
                    >
                      Change Password
                    </Button>
                    <Button
                      variant="outlined"
                      fullWidth
                      sx={{ mb: 2 }}
                      href="/auth/verify-email"
                    >
                      Verify Email
                    </Button>
                    <Button
                      variant="outlined"
                      fullWidth
                      color="error"
                      href="/auth/logout"
                    >
                      Logout
                    </Button>
                  </CardContent>
                </Card>
              </Grid>
            </Grid>
          </TabPanel>
        </Box>

        {/* Add Address Dialog */}
        <Dialog open={addAddressDialog} onClose={() => setAddAddressDialog(false)} maxWidth="sm" fullWidth>
          <DialogTitle>Add New Address</DialogTitle>
          <DialogContent>
            <Grid container spacing={2} sx={{ mt: 1 }}>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="First Name"
                  value={newAddress.firstName}
                  onChange={(e) => setNewAddress(prev => ({ ...prev, firstName: e.target.value }))}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Last Name"
                  value={newAddress.lastName}
                  onChange={(e) => setNewAddress(prev => ({ ...prev, lastName: e.target.value }))}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Address"
                  multiline
                  rows={2}
                  value={newAddress.address}
                  onChange={(e) => setNewAddress(prev => ({ ...prev, address: e.target.value }))}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="City"
                  value={newAddress.city}
                  onChange={(e) => setNewAddress(prev => ({ ...prev, city: e.target.value }))}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="State"
                  value={newAddress.state}
                  onChange={(e) => setNewAddress(prev => ({ ...prev, state: e.target.value }))}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Postal Code"
                  value={newAddress.postalCode}
                  onChange={(e) => setNewAddress(prev => ({ ...prev, postalCode: e.target.value }))}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <FormControl fullWidth>
                  <InputLabel>Type</InputLabel>
                  <Select
                    value={newAddress.type}
                    label="Type"
                    onChange={(e) => setNewAddress(prev => ({ ...prev, type: e.target.value as any }))}
                  >
                    <MenuItem value="home">Home</MenuItem>
                    <MenuItem value="work">Work</MenuItem>
                    <MenuItem value="other">Other</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Phone"
                  value={newAddress.phone}
                  onChange={(e) => setNewAddress(prev => ({ ...prev, phone: e.target.value }))}
                />
              </Grid>
              <Grid item xs={12}>
                <FormControlLabel
                  control={
                    <Switch
                      checked={newAddress.isDefault}
                      onChange={(e) => setNewAddress(prev => ({ ...prev, isDefault: e.target.checked }))}
                    />
                  }
                  label="Set as default address"
                />
              </Grid>
            </Grid>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setAddAddressDialog(false)}>Cancel</Button>
            <Button onClick={handleAddAddress} variant="contained">
              Add Address
            </Button>
          </DialogActions>
        </Dialog>
      </Container>
    </Box>
  );
} 