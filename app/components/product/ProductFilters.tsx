"use client";

import React from 'react';
import {
  Box,
  Typography,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Slider,
  Button,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  List,
  ListItemButton,
  ListItemText,
  Divider,
} from "@mui/material";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { categoryData } from '../../data/categories';

interface ProductFiltersProps {
  search: string;
  setSearch: (value: string) => void;
  selectedGroup: string;
  setSelectedGroup: (value: string) => void;
  selectedCategory: string;
  setSelectedCategory: (value: string) => void;
  priceRange: number[];
  setPriceRange: (value: number[]) => void;
  sortOption: string;
  setSortOption: (value: string) => void;
  handleResetFilters: () => void;
  availableCategories: { name: string; description: string }[];
}

export default function ProductFilters({
  search,
  setSearch,
  selectedGroup,
  setSelectedGroup,
  selectedCategory,
  setSelectedCategory,
  priceRange,
  setPriceRange,
  sortOption,
  setSortOption,
  handleResetFilters,
  availableCategories
}: ProductFiltersProps) {

  return (
    <Box component="aside">
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
        <Typography variant="h6" component="h2">Filters</Typography>
        <Button onClick={handleResetFilters} size="small">Reset</Button>
      </Box>
      
      <TextField fullWidth label="Search products..." value={search} onChange={e => setSearch(e.target.value)} size="small" sx={{ mb: 2 }}/>

      <Accordion defaultExpanded>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography>Category</Typography>
        </AccordionSummary>
        <AccordionDetails sx={{ p: 0 }}>
          <List disablePadding>
            <ListItemButton selected={selectedGroup === 'All'} onClick={() => { setSelectedGroup('All'); setSelectedCategory('All'); }}>
              <ListItemText primary="All Products" />
            </ListItemButton>
            {categoryData.map(group => (
              <Box key={group.name}>
                <Divider />
                <ListItemButton selected={selectedGroup === group.name && selectedCategory === 'All'} onClick={() => { setSelectedGroup(group.name); setSelectedCategory('All'); }}>
                  <ListItemText primary={group.name} sx={{ fontWeight: 'bold' }} />
                </ListItemButton>
                {selectedGroup === group.name && (
                  <List disablePadding sx={{ pl: 2 }}>
                    {availableCategories.map(category => (
                      <ListItemButton key={category.name} selected={selectedCategory === category.name} onClick={() => setSelectedCategory(category.name)}>
                        <ListItemText primary={category.name} />
                      </ListItemButton>
                    ))}
                  </List>
                )}
              </Box>
            ))}
          </List>
        </AccordionDetails>
      </Accordion>

      <Accordion defaultExpanded>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography>Price</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Slider 
            value={priceRange} 
            onChange={(_, val) => setPriceRange(val as number[])} 
            valueLabelDisplay="auto" 
            min={0} 
            max={5000} 
            step={100} 
          />
          <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 1 }}>
             <Typography variant="body2">Rs{priceRange[0]}</Typography>
             <Typography variant="body2">Rs{priceRange[1]}</Typography>
          </Box>
        </AccordionDetails>
      </Accordion>

      <FormControl fullWidth size="small" sx={{ mt: 2 }}>
        <InputLabel>Sort By</InputLabel>
        <Select value={sortOption} label="Sort By" onChange={e => setSortOption(e.target.value)}>
          <MenuItem value="newest">Newest</MenuItem>
          <MenuItem value="price-asc">Price: Low to High</MenuItem>
          <MenuItem value="price-desc">Price: High to Low</MenuItem>
          <MenuItem value="rating">Top Rated</MenuItem>
        </Select>
      </FormControl>
    </Box>
  );
}
