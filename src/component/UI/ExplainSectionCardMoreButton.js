import { useState } from 'react';

import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';

const ExplainSectionCardMoreButton = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const menuClickHandler = event => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <MoreHorizIcon sx={{ cursor: 'pointer', marginLeft: 'auto' }} onClick={menuClickHandler} />
      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        sx={{ paddintTop: 0, paddingBottom: 0 }}
      >
        <MenuItem
          onClick={() => {
            console.log('delete');
            handleClose();
          }}
          sx={{ fontSize: '13px', color: 'red' }}
        >
          삭제
        </MenuItem>
      </Menu>
    </>
  );
};

export default ExplainSectionCardMoreButton;
