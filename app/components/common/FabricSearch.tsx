'use client';

import { useState, useCallback } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';
import ClearIcon from '@mui/icons-material/Clear';
import Container from '@mui/material/Container';
import styles from './FabricSearch.module.css';

interface FabricSearchProps {
  onSearchChange: (query: string) => void;
}

const FabricSearch = ({ onSearchChange }: FabricSearchProps) => {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearchChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const query = event.target.value;
    setSearchQuery(query);
    onSearchChange(query);
  }, [onSearchChange]);

  const clearSearch = useCallback(() => {
    setSearchQuery('');
    onSearchChange('');
  }, [onSearchChange]);

  return (
    <section aria-label="Product Search" className={styles.section}>
      <Container maxWidth="lg">
        <Typography variant="h4" component="h2" className={styles.title}>
          Find Your Perfect Fabric
        </Typography>
        <Box className={styles.searchContainer}>
          <TextField
            fullWidth
            variant="outlined"
            placeholder="Search for fabrics, colors, brands..."
            value={searchQuery}
            onChange={handleSearchChange}
            className={styles.searchInput}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              ),
              endAdornment: searchQuery && (
                <InputAdornment position="end">
                  <IconButton onClick={clearSearch} edge="end">
                    <ClearIcon />
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
        </Box>
      </Container>
    </section>
  );
};

export default FabricSearch;
