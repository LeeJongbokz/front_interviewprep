// import { useState } from 'react';
import * as React from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

const CATEGORIES = ['java', 'os', 'spring'];

export default function BasicSelect({onSelect, searchType}) {
  return (
    <Box sx={{ mt: 1, mb: 1, width: 250, backgroundColor: 'white' }}>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">category</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={searchType}
          label="category"
          onChange={onSelect}
        >
          <MenuItem value="">전체</MenuItem>
          {CATEGORIES.map((item, index) => {
            return (
              <MenuItem key={index} value={item}>
                {item}
              </MenuItem>
            );
          })}
        </Select>
      </FormControl>
    </Box>
  );
}
