import React, { useContext } from 'react';
import { Link } from 'react-router-dom'
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import AuthService from '../actions/AuthActions'
import { AuthContext } from '../Context/AuthContext'
import HomeIcon from '@material-ui/icons/Home';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';



const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    title: {
        flexGrow: 1,
    },
    bar: {
        backgroundColor: 'rgb(230, 221, 221)'
    }
}));

export default function ButtonAppBar() {
    const classes = useStyles();
    const logoutFunc = () => {
        AuthService.logout()
            .then(data => {
                if (data.success) {
                    setUser(data.user)
                    setIsAuthenticated(false)
                }
            })
        window.location = '/'
    }
    const { user, setUser, isAuthenticated, setIsAuthenticated } = useContext(AuthContext)
    const unauthenticatedNavbar = () => {
        return (
            <>
                <Link to='/'>
                    <IconButton>
                        <HomeIcon />
                    </IconButton>
                </Link>
                <Link to='/login'>
                    <Button color="inherit">Login</Button>
                </Link>
                <Link to='/register'>
                    <Button color="inherit">Sign Up</Button>
                </Link>
            </>
        )
    }


    const authenticatedNavbar = () => {
        return (
            <>
                <Link to='/'>
                    <IconButton>
                        <HomeIcon />
                    </IconButton>
                </Link>
                <Link to='/todos'>
                    <Button color="inherit">Todos</Button>
                </Link>
                {
                    user.role === "admin" ?
                        <Link to='/admin'>
                            <Button color="inherit">Ad</Button>
                        </Link> : null
                }

                <IconButton onClick={logoutFunc}>
                    <ExitToAppIcon />
                </IconButton>

            </>
        )
    }
    return (
        <div>
            <AppBar position="static" >
                <Toolbar>
                    <IconButton edge="start" className={classes.menuButton} aria-label="menu">
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h6" className={classes.title}>
                        You | DO
          </Typography>
                    {!isAuthenticated ? unauthenticatedNavbar() : authenticatedNavbar()}
                </Toolbar>
            </AppBar>
        </div>
    );
}
