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
import CharacterForm from './CharacterForm';
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

  const CharacterDialog = ({ records, setRecords, empty }) => {
    const classes = useStyles();
    // getModalStyle is not a pure function, we roll the style only on the first render
    const [open, setOpen] = React.useState(false);
  
    const handleOpen = () => {
      setOpen(true);
    };
  
    const handleClose = () => {
      API.getBio().then(({ data }) => {
        console.log(data);
        setRecords(data);
        console.log(records);
        setOpen(false);
      });
    };
  
    const openButton = empty ? (
      <Button onClick={handleOpen} className={classes.newButton}>
        <Typography variant='h2'>
          <AddIcon /> Add a little paragraph about yourself
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
            <Typography variant='h2'>Edit Bio</Typography>
          </DialogTitle>
          <DialogContent>
            <CharacterForm records={records} handleClose={handleClose} />
          </DialogContent>
        </Dialog>
      </div>
       </React.Fragment>

    );
  };
  
  //   return (
  //     <React.Fragment>
  //       {openButton}
  //       <Dialog
  //         fullWidth={true}
  //         maxWidth={'md'}
  //         open={open}
  //         onClose={handleClose}
  //         aria-labelledby='form-dialog-title'
  //         // className={classes.dialog}
  //       >
  //         <DialogTitle disableTypography>
  //           <Typography variant='h2'>Edit Bio</Typography>
  //         </DialogTitle>
  
  //         <CharacterForm records={records} handleClose={handleClose} />
  //       </Dialog>
  //     </React.Fragment>
  //   );
  // };
  
  // export default CharacterDialog;
  

  // const CharacterDialog = ({ records, setRecords }) => {
  //   const classes = useStyles();
  //   // getModalStyle is not a pure function, we roll the style only on the first render
  //   const [open, setOpen] = React.useState(false);
  
  //   const handleOpen = () => {
  //     setOpen(true);
  //   };
  
  //   const handleClose = () => {
  //     API.getBio().then(({ data }) => {
  //       setRecords(data);
  //       setOpen(false);
  //     });

  //   };
  
  //   return (
  //     <div className={classes.container}>
  //       <IconButton onClick={handleOpen} data-testid = "bio">
  //         <EditIcon />
  //       </IconButton>
  //       <Dialog
  //         fullWidth={true}
  //         maxWidth={'md'}
  //         open={open}
  //         onClose={handleClose}
  //         aria-labelledby='form-dialog-title'
  //       >
  //         <DialogTitle disableTypography>
  //           <Typography variant='h2'>Edit Bio</Typography>
  //         </DialogTitle>
  //         <DialogContent>
  //           <CharacterForm records={records} handleClose={handleClose} />
  //         </DialogContent>
  //       </Dialog>
  //     </div>
  //   );
  // };
  
  export default CharacterDialog;
  