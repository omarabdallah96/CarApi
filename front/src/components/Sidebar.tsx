import { Link } from 'react-router-dom';
import { Drawer, List, ListItem, ListItemIcon, ListItemText } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';

import { ExitToApp, PlusOne } from '@mui/icons-material';
import { logout, selectIsAuthenticated } from '../features/authSlice';
import { useDispatch, useSelector } from 'react-redux';

const drawerItems = [
    { text: 'Home', icon: <HomeIcon />, link: '/home' },
    { text: 'Add Car', icon:<PlusOne />, link: '/add-car' },



];

const App = () => {
    const dispatch = useDispatch();
    //if authenticated
    const isAuthenticated = useSelector(selectIsAuthenticated);
    return (
        
    
        isAuthenticated ?
            (
                <>
                    <Drawer variant="permanent" anchor="left">
                        <List>
                            {drawerItems.map((item, index) => (
                                <ListItem button key={index} component={Link} to={item.link}>
                                    <ListItemIcon>{item.icon}</ListItemIcon>
                                    <ListItemText primary={item.text} />
                                </ListItem>
                            ))}
                            {/* /logout  */}
                            <ListItem button onClick={() => dispatch(logout())}>
                                <ListItemIcon>
                                    <ExitToApp />
                                </ListItemIcon>
                                <ListItemText primary="Logout" />
                            </ListItem>
                        </List>

                    </Drawer>
                </>


            )
            : null
    );
};

export default App;
