// Tools
import { useRouter } from 'next/router'

// UI
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ListIcon from '@material-ui/icons/List';
import InfoIcon from '@material-ui/icons/Info';

const useStyles = makeStyles({
    list: {
        width: 250,
    },
    fullList: {
        width: 'auto',
    },
});

export function Menu({ isOpen, onClose, onOpen }) {
    const classes = useStyles();
    const router = useRouter();

    const list = () => (
        <div
            className={clsx(classes.list)}
            role="presentation"
            onClick={() => onClose()}
            onKeyDown={() => onClose()}
        >
            <List>
                {['Recipes'].map((text) => (
                <ListItem button key={text} onClick={() => router.push('/')}>
                    <ListItemIcon><ListIcon /></ListItemIcon>
                    <ListItemText primary={text} />
                </ListItem>
                ))}
            </List>
            <Divider />
            <List>
                {['About'].map((text) => (
                <ListItem button key={text} onClick={() => router.push('/about')}>
                    <ListItemIcon><InfoIcon /></ListItemIcon>
                    <ListItemText primary={text} />
                </ListItem>
                ))}
            </List>
        </div>
    );

    return (
        <div>
            <SwipeableDrawer
                anchor='left'
                open={isOpen}
                onOpen={() => onOpen()}
                onClose={() => onClose()}
            >
                {list()}
            </SwipeableDrawer>
        </div>
    );
}
