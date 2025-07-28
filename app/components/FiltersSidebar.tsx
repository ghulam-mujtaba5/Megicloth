"use client";

import { Accordion, AccordionSummary, AccordionDetails, Typography, Box, FormGroup, FormControlLabel, Checkbox, Slider, RadioGroup, Radio } from "@mui/material";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

interface FiltersSidebarProps {
  filters: {
    categories: string[];
    fabricTypes: string[];
    priceRange: [number, number];
    availability: string;
  };
  setFilters: (filters: any) => void;
}

const categories = ["Men's Collection", "Women's Collection", "New Arrivals", "Sale"];
const fabricTypes = ["Cotton", "Silk", "Lawn", "Chiffon", "Velvet"];

const FiltersSidebar = ({ filters, setFilters }: FiltersSidebarProps) => {
  const handleCategoryChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = event.target;
    setFilters((prevFilters: any) => ({
      ...prevFilters,
      categories: checked
        ? [...prevFilters.categories, name]
        : prevFilters.categories.filter((c: string) => c !== name),
    }));
  };

  const handleFabricChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = event.target;
    setFilters((prevFilters: any) => ({
      ...prevFilters,
      fabricTypes: checked
        ? [...prevFilters.fabricTypes, name]
        : prevFilters.fabricTypes.filter((f: string) => f !== name),
    }));
  };

  const handlePriceChange = (_event: Event, newValue: number | number[]) => {
    setFilters((prevFilters: any) => ({
      ...prevFilters,
      priceRange: newValue as [number, number],
    }));
  };

  const handleAvailabilityChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFilters((prevFilters: any) => ({
      ...prevFilters,
      availability: event.target.value,
    }));
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

      {/* Fabric Type Filter */}
      <Accordion>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography>Fabric Type</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <FormGroup>
            {fabricTypes.map(fabric => (
              <FormControlLabel
                key={fabric}
                control={<Checkbox checked={filters.fabricTypes.includes(fabric)} onChange={handleFabricChange} name={fabric} />}
                label={fabric}
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
