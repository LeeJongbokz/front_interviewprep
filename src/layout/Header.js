import { useState, useContext } from 'react';
import AuthContext from '../store/auth-context';
import { Link } from 'react-router-dom';

import Box from '@mui/material/Box';
import Tabs from '@mui/material/Tabs';
// import Tab from '@mui/material/Tab';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import companyLogo from '../img/logo_1.png';

import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';

import Avatar from '@mui/material/Avatar';

function stringToColor(string) {
  let hash = 0;
  let i;

  /* eslint-disable no-bitwise */
  for (i = 0; i < string.length; i += 1) {
    hash = string.charCodeAt(i) + ((hash << 5) - hash);
  }

  let color = '#';

  for (i = 0; i < 3; i += 1) {
    const value = (hash >> (i * 8)) & 0xff;
    color += `00${value.toString(16)}`.slice(-2);
  }
  /* eslint-enable no-bitwise */

  return color;
}

function stringAvatar(name) {
  return {
    sx: {
      bgcolor: stringToColor(name),
      cursor: 'pointer',
    },
    children: `${name.split(' ')[0][0]}`,
    // children: `${name.split(' ')[0][0]}${name.split(' ')[1][0]}`,
  };
}

const Header = () => {
  const [value, setValue] = useState(0);
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleClose = () => {
    setAnchorEl(null);
  };
  const authCtx = useContext(AuthContext);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const logoutHandler = () => {
    authCtx.logout();
  };

  const menuClickHandler = event => {
    setAnchorEl(event.currentTarget);
  };

  const headerButtons = authCtx.isLoggedIn ? (
    <>
      <Avatar {...stringAvatar('Test')} onClick={menuClickHandler} />
      <Menu anchorEl={anchorEl} open={open} onClose={handleClose}>
        <MenuItem>
          <Button
            component={Link}
            onClick={handleClose}
            to="/RecentProblem"
            sx={{ color: '#3A3A3A', fontWeight: 'bold', fontSize: '14px' }}
          >
            마이페이지
          </Button>
        </MenuItem>
        <MenuItem>
          <Button
            color="inherit"
            onClick={() => {
              handleClose();
              logoutHandler();
            }}
            sx={{ color: '#3A3A3A', fontWeight: 'bold', fontSize: '14px' }}
          >
            로그아웃
          </Button>
        </MenuItem>
      </Menu>
    </>
  ) : (
    <Button
      component={Link}
      to="/login"
      sx={{ color: '#3A3A3A', fontWeight: 'bold', fontSize: '14px' }}
    >
      로그인
    </Button>
  );

  const categoryButtons = (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        margin: 1,
      }}
    >
      <Tabs value={value}  onChange={handleChange} centered>
        {/* <Tab label="문제" component={Link} to="/test" /> */}
        {/* <Tab label="실력테스트" component={Link} to="/exam" /> */}
      </Tabs>
    </Box>
  );

  return (
    <Box sx={{ flwxGrow: 1 }}>
      <AppBar position="static" variant="outLine" sx={{ boxShadow: 'none' }}>
        <Toolbar
          sx={{
            justifyContent: "space-between",
            backgroundColor: 'white',
            borderBottom: 'solid 1px #f4f4f4',
          }}
        >
          <Typography
            noWrap
            variant="h6"
            component={Link}
            to="/"
            sx={{
              fontWeight: 700,
              textDecoration: 'none',
            }}
          >
            <img src={companyLogo} alt="logo" style={{ height: '40px', overflow: 'hidden' }} />
          </Typography>
          {categoryButtons}
          {headerButtons}
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default Header;
