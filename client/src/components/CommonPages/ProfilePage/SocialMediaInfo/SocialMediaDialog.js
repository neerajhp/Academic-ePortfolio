import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import EditIcon from '@material-ui/icons/Edit';
import {
  IconButton,
  Typography,
  Dialog,
  DialogContent,
  DialogTitle,
  Button
} from '@material-ui/core';
import API from '../../../../api/API';
import SocialMediaForm from './SocialMediaForm';
import AddIcon from '@material-ui/icons/Add';



const useStyles = makeStyles((theme) => ({
    container: {
      width: '100%',
      display: 'flex',
      justifyContent: 'flex-end',
      position: 'relative',
    },
    paper: {
      position: 'absolute',
      width: '40%',
      backgroundColor: theme.palette.neutral.main,
      border: '2px solid #000',
      boxShadow: theme.shadows[5],
      padding: theme.spacing(2, 4, 3),
    },
  }));

  const SocialMediaDialog = ({ records, setRecords, empty, getRecords }) => {
    const classes = useStyles();
    // getModalStyle is not a pure function, we roll the style only on the first render
    const [open, setOpen] = React.useState(false);
  

    const handleOpen = () => {
      console.log(records);
      setOpen(true);
    };
  
    const handleClose = () => {
      setOpen(false);
      // API.getBio().then(({ data }) => {
      //   console.log(data);
      //   setRecords(data);
      //   console.log(records);
      //   setOpen(false);
      // });
    };

  
    const openButton = empty ? (
      <Button onClick={handleOpen} className={classes.newButton}>
        <Typography variant='h2'>
          <AddIcon /> Add Social Media Links
        </Typography>
      </Button>
    ) : (
      <IconButton onClick={handleOpen}>
        <EditIcon />
      </IconButton>
    );

        return (
        <React.Fragment>
      <div className={classes.container}>
        {openButton}
        <Dialog
          fullWidth={true}
          maxWidth={'md'}
          open={open}
          onClose={handleClose}
          aria-labelledby='form-dialog-title'
        >
          <DialogTitle disableTypography>
            <Typography variant='h2'>Edit Social Media Links</Typography>
          </DialogTitle>
          <DialogContent>
            <SocialMediaForm records={records} handleClose={handleClose} />
          </DialogContent>
        </Dialog>
      </div>
       </React.Fragment>

    );
  };
  
  
  export default SocialMediaDialog;
  