import * as React from 'react';
import PropTypes from 'prop-types';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { Button} from '@mui/material';
import {
   
    Switch,
    Route,
    Link,
  
    useRouteMatch,
    NavLink
  } from "react-router-dom";
import DashBoardHome from '../DashBoardHome/DashBoardHome';
import useAuth from '../../../hooks/useAuth';
import AddProduct from '../AddProduct/AddProduct';
import MyOrders from '../MyOrders/MyOrders';
import Payment from '../Payment/Payment';
import MakeAdmin from '../MakeAdmin/MakeAdmin'
import MangeOrders from '../ManageOrders/MangeOrders';
import ManageProducts from '../ManageProducts/ManageProducts';
import Review from '../Review/Review';


const drawerWidth = 150;

function DashBoard(props) {
  let { path, url } = useRouteMatch();
  const { window } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const {admin,logOut} = useAuth()
  
  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const drawer = (
  
    
    <div>
      <Toolbar />
      

     
       
      
     
      {admin ? <>
        <Link to={`${url}/makeAdmin`}><Button color='inherit'>Make Admin</Button></Link>
        <NavLink to={`${url}/addProduct`}><Button color='inherit'>Add Product</Button></NavLink>
        <Link to={`${url}/manageOrders`}><Button color='inherit'>Manage Orders</Button></Link>
        <Link to={`${url}/manageProduts`}><Button color='inherit'>Manage Products</Button></Link>
        <Button onClick={logOut} color='inherit'>Logout</Button>
        </>
        :
        <>
        
        <Link to={`${url}`}><Button color='inherit'>DashBoard</Button></Link>
        <Link to={`${url}/myOrders`}><Button color='inherit'>My Orders</Button></Link>
        <Link to={`${url}/payment`}><Button color='inherit'>Make Payment</Button></Link>
        <Link to={`${url}/review`}><Button color='inherit'>Give Review</Button></Link>
        <Button onClick={logOut} color='inherit'>Logout</Button>
        </>
    }
      {/* <List>
        {['Inbox', 'Starred', 'Send email', 'Drafts'].map((text, index) => (
          <ListItem button key={text}>
            <ListItemIcon>
              {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
            </ListItemIcon>
            <ListItemText primary={text} />
          </ListItem>
        ))}
      </List> */}
    </div>
  );

  const container = window !== undefined ? () => window().document.body : undefined;

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      
      <AppBar
        position="fixed"
        sx={{
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          ml: { sm: `${drawerWidth}px` },
        }}
      >
          
        <Toolbar>
        
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: 'none' } }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div" style={{textAlign:'center'}}>
            Dashboard
          </Typography>
        </Toolbar>
      </AppBar>
      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
        aria-label="mailbox folders"
      >
        {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: 'block', sm: 'none' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
          }}
        >
          {drawer}
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: 'none', sm: 'block' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>
      <Box
        component="main"
        sx={{ flexGrow: 1, p: 3, width: { sm: `calc(100% - ${drawerWidth}px)` } }}
      >
        <Toolbar />
        <Switch>
        <Route exact path={path}>
          <DashBoardHome></DashBoardHome>
        </Route>
        <Route path={`${path}/makeAdmin`}>
          <MakeAdmin></MakeAdmin>
        </Route>
        <Route path={`${path}/addProduct`}>
          <AddProduct></AddProduct>
        </Route>
        <Route path={`${path}/myOrders`}>
          <MyOrders></MyOrders>
        </Route>
        <Route path={`${path}/payment`}>
          <Payment></Payment>
        </Route>
        <Route path={`${url}/manageOrders`}>
          <MangeOrders></MangeOrders>
        </Route>
    
        <Route path={`${url}/manageProduts`}>
          <ManageProducts></ManageProducts>
        </Route>
    
        <Route path={`${url}/review`}>
          <Review></Review>
        </Route>
      </Switch>
        <Typography paragraph>
        
        </Typography>
      </Box>
    </Box>
  );
}

DashBoard.propTypes = {
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window: PropTypes.func,
};

export default DashBoard;