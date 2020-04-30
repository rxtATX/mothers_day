import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Switch from './UI/Switch';


const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    margin: '2em 3em'
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
}));

export default function ConfigClues({
    dispatchGetWord, category, hint
}) {
  const classes = useStyles();
  const [showHint, setShowHint] = useState(false);
  const [showCategory, setShowCategory] = useState(true);

  return (
    <div className={classes.root}>
      <Grid container justify="center" spacing={3}>
        {/* <Grid item xs={12} /*md={3} /> */}
        <Grid item xs={12} /*md={2}*/>
          <Button 
            onClick={dispatchGetWord} 
            variant="contained" 
            color="primary" 
            disableElevation
          >
            New Word
          </Button>
        </Grid>
        <Grid item xs={6} /*md={2}*/>
          <Switch onChange={(val)=>setShowHint(val)} name="Hint" checked={false} />
        </Grid>
        <Grid item xs={6} /*md={2}*/>
          <Switch onChange={(val)=>setShowCategory(val)} name="Category" checked={true} />
        </Grid>
        {/* <Grid item xs={12} /*md={3} /> */}
        {/* <Grid item xs={12} /*md={3} /> */}
        <Grid item xs={12} /*md={6}*/>
          {showCategory ? <Paper className={classes.paper}>{category}</Paper> : null}
        </Grid>
        {/* <Grid item xs={12} /*md={3} /> */}
        <Grid item xs={12} /*md={12}*/>
          {showHint ? <Paper className={classes.paper}>{hint}</Paper> : null}
        </Grid>
      </Grid>
    </div>
  );
}