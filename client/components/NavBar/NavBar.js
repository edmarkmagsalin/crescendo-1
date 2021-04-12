// Tools
import { useState } from 'react'

// UI
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import { Menu } from '@/components'

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
}));

export function NavBar() {
    const classes = useStyles();

    const [isMenuOpen, setIsMenuOpen] = useState(false)

    return (
        <div className={classes.root}>
            <Menu isOpen={isMenuOpen} onClose={() => setIsMenuOpen(!isMenuOpen)} />
            <AppBar position="static">
                <Toolbar>
                    <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu" onClick={() => setIsMenuOpen(true)}>
                    <MenuIcon />
                    </IconButton>
                    <Typography variant="h6" className={classes.title}>
                        Crescendo Recipes
                    </Typography>
                </Toolbar>
            </AppBar>
        </div>
    );
}