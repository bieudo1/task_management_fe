import React, { useEffect,useState } from "react";
import { styled, useTheme } from "@mui/material/styles";
import {Box,List} from "@mui/material";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import MuiDrawer from "@mui/material/Drawer";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import { Avatar, Divider } from "@mui/material";
import useAuth from "../hooks/useAuth";
import { useNavigate, Link as RouterLink } from "react-router-dom";
import { useDispatch,useSelector } from 'react-redux';
import { openDrawer } from '../app/menu';
import { drawerWidth} from "../app/config";
import BarChartIcon from '@mui/icons-material/BarChart';
import TaskIcon from '@mui/icons-material/Task';
import PersonAddAltIcon from '@mui/icons-material/PersonAddAlt';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import AccountTreeIcon from '@mui/icons-material/AccountTree';


const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen
  }),
  overflowX: "hidden"
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen
  }),
  overflowX: "hidden",
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up("sm")]: {
    width: `calc(${theme.spacing(8)} + 1px)`
  }
});

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar
}));

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open"
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen
    })
  })
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open"
})(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  ...(open && {
    ...openedMixin(theme),
    "& .MuiDrawer-paper": openedMixin(theme)
  }),
  ...(!open && {
    ...closedMixin(theme),
    "& .MuiDrawer-paper": closedMixin(theme)
  })
}));

function MainHeader() {
  const theme = useTheme();
  const {drawerOpen} = useSelector((state) => state.menu);
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const [anchorEl, setAnchorEl] = useState(null);
  const [Admin, setAdmin] = useState([]);


  const isMenuOpen = Boolean(anchorEl);

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = async () => {
    try {
      handleMenuClose();
      await logout(() => {
        navigate("/login");
      });
    } catch (error) {
      console.error(error);
    }
  };

  const menuId = "primary-search-account-menu";
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "right",
      }}
      id={menuId}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <Box sx={{ my: 1.5, px: 2.5 }}>
        <Typography variant="subtitle2" noWrap>
          {user?.name}
        </Typography>
        <Typography variant="body2" sx={{ color: "text.secondary" }} noWrap>
          {user?.email}
        </Typography>
      </Box>

      <Divider sx={{ borderStyle: "dashed" }} />

      <MenuItem
        onClick={handleMenuClose}
        to="/"
        component={RouterLink}
        sx={{ mx: 1 }}
      >
        My Profile
      </MenuItem>

      <MenuItem
        onClick={handleMenuClose}
        to="/account"
        component={RouterLink}
        sx={{ mx: 1 }}
      >
        Account Settings
      </MenuItem>

      <Divider sx={{ borderStyle: "dashed" }} />

      <MenuItem onClick={handleLogout} sx={{ m: 1 }}>
        Logout
      </MenuItem>
    </Menu>
  );

  const dispatch = useDispatch();
  const handleDrawerOpen = () => {
    dispatch(openDrawer(true))
  };

  const handleDrawerClose = () => {
    dispatch(openDrawer(false))
  }

  const handleListItemClick =(event, tap) =>{
    navigate(`/${tap}`)
  };
  const PROFILE_TABS_Staff = [
    {
      value: "Task",
      icon: <TaskIcon sx={{ fontSize: 24 }} />,
    },
    {
      value: "Projects",
      icon: <AccountTreeIcon sx={{ fontSize: 24 }} />,
    },
    {
      value: "TaskTeam",
      icon: <FormatListBulletedIcon sx={{ fontSize: 24 }} />,
    },
  ];

  const Personnel = [
    {
      value: "Personnel",
      icon: <PersonAddAltIcon sx={{ fontSize: 24 }} />,
    },
  ];

  const CEO = [{
    value: "Admin",
    icon: <BarChartIcon sx={{ fontSize: 24 }} />,
  },]

  useEffect(() => {
    if (user.position ==="Ceo" ){
        setAdmin(Personnel.concat(CEO))
      }
    if(user.team?.name === "Personnel"){
      setAdmin(Personnel)
    }
  },[])

  //
  // console.log(Admin)
  return (
    <Box sx={{ display: "flex" ,mb: 3}}>
      <AppBar position="fixed" open={drawerOpen} sx = {{backgroundImage: "linear-gradient(90deg, #fd7e14, #d63384)" }}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{
              marginRight: 5,
              ...(drawerOpen && { display: "none" })
            }}
          >
            <MenuIcon />
          </IconButton>
          <Box sx={{ flexGrow: 1 }} />
          <Box>
            <Avatar
              onClick={handleProfileMenuOpen}
              src={user.avatarUrl}
              alt={user.name}
              sx={{ width: 32, height: 32 }}
            />
          </Box>
        </Toolbar>
      </AppBar>
      {renderMenu}
      <Drawer variant="permanent" open={drawerOpen}>
        <DrawerHeader>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === "rtl" ? (
              <ChevronRightIcon />
            ) : (
              <ChevronLeftIcon />
            )}
          </IconButton>
        </DrawerHeader>
        <Divider />
        <List>
        {PROFILE_TABS_Staff.map((tap) => (
           <ListItem key={tap.value} disablePadding sx={{ display: 'block' }}>
              <ListItemButton
              onClick={(event) => handleListItemClick(event, tap.value)}
                sx={{
                  minHeight: 48,
                  justifyContent: drawerOpen ? 'initial' : 'center',
                  px: 2.5,
                }}
              >
                
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: drawerOpen ? 3 : 'auto',
                    justifyContent: 'center',
                  }}
                >
                  {tap.icon}
                </ListItemIcon>
                <ListItemText primary={tap.value} sx={{ opacity: drawerOpen ? 1 : 0 }} />
              </ListItemButton>
          </ListItem>
        ))}
        </List>
        <Divider />
        <List>
          {Admin.map((tap) => (
            <ListItem key={tap.value} disablePadding sx={{ display: 'block' }}>
            <ListItemButton
            onClick={(event) => handleListItemClick(event, tap.value)}
              sx={{
                minHeight: 48,
                justifyContent: drawerOpen ? 'initial' : 'center',
                px: 2.5,
              }}
            >
              <ListItemIcon
                sx={{
                  minWidth: 0,
                  mr: drawerOpen ? 3 : 'auto',
                  justifyContent: 'center',
                }}
              >
                {tap.icon}
              </ListItemIcon>
              <ListItemText primary={tap.value} sx={{ opacity: drawerOpen ? 1 : 0 }} />
            </ListItemButton>
          </ListItem>
          ))}
        </List>
      </Drawer>
    </Box>
  );
}
export default  MainHeader