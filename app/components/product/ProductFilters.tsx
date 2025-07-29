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
} from "@mui/material";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';


interface ProductFiltersProps {
  search: string;
  setSearch: (value: string) => void;
  selectedCategory: string;
  setSelectedCategory: (value: string) => void;
  priceRange: number[];
  setPriceRange: (value: number[]) => void;
  sortOption: string;
  setSortOption: (value: string) => void;
  handleResetFilters: () => void;
  categories: string[];
}

export default function ProductFilters({
  search,
  setSearch,
  selectedCategory,
  setSelectedCategory,
  priceRange,
  setPriceRange,
  sortOption,
  setSortOption,
  handleResetFilters,
  categories = []
}: ProductFiltersProps) {

  return (
    <Box component="aside">
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
        <Typography variant="h6" component="h2">Filters</Typography>
        <Button onClick={handleResetFilters} size="small">Reset</Button>
      </Box>
      
      <TextField fullWidth label="Search products..." value={search} onChange={e => setSearch(e.target.value)} size="small" sx={{ mb: 2 }}/>

      <FormControl fullWidth size="small" sx={{ mb: 2 }}>
        <InputLabel>Category</InputLabel>
        <Select value={selectedCategory} label="Category" onChange={e => setSelectedCategory(e.target.value)}>
          {categories.map((category) => (
            <MenuItem key={category} value={category}>
              {category === 'All' ? 'All Products' : category}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

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
            max={10000} 
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
