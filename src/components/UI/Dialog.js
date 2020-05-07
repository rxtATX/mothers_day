import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';
import { dispatchGetWord } from '../../utility/API';
import { useGameplayContext } from '../../utility/GlobalState'

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%'
    },
    paperFullScreen: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%'
    },
    button: {
        borderRadius: '10px',
        lineHeight: 2,
        background: `radial-gradient(${theme.palette.secondary.light}, ${theme.palette.secondary.main}, ${theme.palette.secondary.dark})`,
        textAlign: 'center',
        color: 'white',
        textShadow: '0px 1px 2px black',
        fontSize: '1.25em',
        fontWeight: '700',
        padding: '.5em 2em'
    },
    spacing: {
        marginBottom: '7em'
    },
    title: {
        marginTop: '10em',
        color: theme.palette.secondary.main
    }
}));

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="down" ref={ref} {...props} />;
});

export default function DialogEl({ title, buttonElement, textContent, children, accept, show = false, outsideClose = () => null }) {
    const classes = useStyles();
    const [, dispatch] = useGameplayContext();
    const [open, setOpen] = React.useState(show);

    useEffect(() => {
        setOpen(show)
    }, [show])

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
        outsideClose();
    };

    return (
        <div>
            {React.cloneElement(buttonElement, { onClick: handleClickOpen })}
            <Dialog
                className={classes.root}
                classes={{ scrollPaper: classes.root, paperFullScreen: classes.paperFullScreen }}
                fullScreen={true}
                open={open}
                TransitionComponent={Transition}
                keepMounted
                onClose={handleClose}
                aria-labelledby="alert-dialog-slide-title"
                aria-describedby="alert-dialog-slide-description"
            >
                <DialogTitle classes={{ root: classes.title }} id="alert-dialog-slide-title">
                    {title}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-slide-description">
                        {textContent}
                    </DialogContentText>
                </DialogContent>
                {children}
                <DialogActions classes={{ spacing: classes.spacing }}>
                    {accept ?
                        <>
                            <Button onClick={handleClose} className={classes.button} >
                                No!
                        </Button>
                            <Button className={classes.button} onClick={() => { handleClose(); accept() }} >
                                Yes!
                        </Button>
                        </>
                        :
                        <Button className={classes.button} onClick={() => { handleClose(); dispatchGetWord(dispatch) }}>
                            New Game
                        </Button>
                    }
                </DialogActions>
            </Dialog>
        </div>
    );
}