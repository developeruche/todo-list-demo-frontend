import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';

const useStyles = makeStyles((theme) => ({
    page: {
        width: '100vw',
        height: '100vh'
    },
    root: {
        marginTop: '30%',
        marginLeft: '50%',
        display: 'flex',
        '& > * + *': {
            marginLeft: theme.spacing(1),
        },
    },
}));

export default function CircularIndeterminate() {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <CircularProgress />
        </div>

    );
}