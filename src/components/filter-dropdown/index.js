import React, { useState } from 'react';
import { Button, Menu, MenuItem } from '@mui/material';
import FilterListIcon from '@mui/icons-material/FilterList';

function FilterDropdown({ options, selectedOption, onFilterChange }) {
  const [anchorEl, setAnchorEl] = useState(null);

  const handleOpenMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setAnchorEl(null);
  };

  const handleFilterSelect = (option) => {
    onFilterChange(option);
    handleCloseMenu();
  };

  return (
    <div>
      <Button
        aria-controls="filter-menu"
        aria-haspopup="true"
        onClick={handleOpenMenu}
        startIcon={<FilterListIcon />}
      >
        Filter
      </Button>
      <Menu
        id="filter-menu"
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleCloseMenu}
      >
        {options.map((option) => (
          <MenuItem
            key={option}
            onClick={() => handleFilterSelect(option)}
            selected={option === selectedOption}
          >
            {option}
          </MenuItem>
        ))}
      </Menu>
    </div>
  );
}

export default FilterDropdown;
