"use client";

import { Accordion, AccordionSummary, AccordionDetails, Typography, Box, FormGroup, FormControlLabel, Checkbox, Slider, RadioGroup, Radio } from "@mui/material";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

interface FiltersSidebarProps {
  filters: {
    categories: string[];
    priceRange: [number, number];
    availability: string;
  };
  onFilterChange: (newFilters: any) => void;
}

const categories = ["Men's Collection", "Women's Collection", "New Arrivals", "Sale"];

const FiltersSidebar = ({ filters, onFilterChange }: FiltersSidebarProps) => {
  const handleCategoryChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = event.target;
    const newCategories = checked
      ? [...filters.categories, name]
      : filters.categories.filter((c) => c !== name);
    onFilterChange({ ...filters, categories: newCategories });
  };



  const handlePriceChange = (_event: Event, newValue: number | number[]) => {
    onFilterChange({ ...filters, priceRange: newValue as [number, number] });
  };

  const handleAvailabilityChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onFilterChange({ ...filters, availability: event.target.value });
  };
  return (
    <Box component="aside">
      <Typography variant="h6" component="h3" gutterBottom>
        Filters
      </Typography>

      {/* Category Filter */}
      <Accordion defaultExpanded>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography>Category</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <FormGroup>
            {categories.map(category => (
              <FormControlLabel
                key={category}
                control={<Checkbox checked={filters.categories.includes(category)} onChange={handleCategoryChange} name={category} />}
                label={category}
              />
            ))}
          </FormGroup>
        </AccordionDetails>
      </Accordion>



      {/* Price Range Filter */}
      <Accordion>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography>Price Range</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Slider
            value={filters.priceRange}
            onChange={handlePriceChange}
            valueLabelDisplay="auto"
            min={500}
            max={15000}
            step={500}
            marks
            disableSwap
          />
        </AccordionDetails>
      </Accordion>

      {/* Availability Filter */}
      <Accordion>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography>Availability</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <RadioGroup value={filters.availability} onChange={handleAvailabilityChange}>
            <FormControlLabel value="in-stock" control={<Radio />} label="In Stock" />
            <FormControlLabel value="out-of-stock" control={<Radio />} label="Out of Stock" />
          </RadioGroup>
        </AccordionDetails>
      </Accordion>
    </Box>
  );
};

export default FiltersSidebar;
