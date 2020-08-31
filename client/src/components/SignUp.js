import React from 'react';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import {
    AppBar,
    Paper,
    Avatar,
    TextField,
    FormControlLabel,
    Checkbox,
    Button,
    Grid,
    Link,
} from '@material-ui/core';
import MenuBookIcon from '@material-ui/icons/MenuBook';

// Styling
const useStyles = makeStyles(({}) => ({
    //Page container
    root: {
        height: '110vh',
        width: '100vw',
        position: 'flex',
    },
    banner: {
        position: 'sticky',
        width: '100%',
        height: '20%',
        background: '#333B55',
        color: '#FFFFFF',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        boxShadow: '-1px -9px 15px 10px rgba(0,0,0,0.75);',
    },
    formContainer: {
        width: '100%',
        height: '90%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
    formPaper: {
        height: '80%',
        width: '30%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '5%',
        background: '#333B55',
        color: '#FFFFFF ',
    },
    avatar: { height: '70px', width: '70px', background: '#FFFFFF' },
    icon: { fontSize: 40, color: '#333B55' },
}));

const CssTextField = withStyles({
    root: {
        '& .MuiInputBase-input': {
            color: 'white',
        },
        '& label.Mui-focused': {
            color: 'white',
        },
        '& .MuiOutlinedInput-root': {
            '& fieldset': {
                color: 'white',
                borderColor: '#8894b6',
            },
            '&:hover fieldset': {
                borderColor: 'white',
            },
        },
    },
})(TextField);

const SignUp = () => {
    // Styling
    const styles = useStyles();

    return (
        <div className={styles.root}>
            <div className={styles.banner}>
                <h1>Welcome to ePortfolio</h1>
            </div>
            <div className={styles.formContainer}>
                <Paper elevation={1} className={styles.formPaper}>
                    <Avatar className={styles.avatar}>
                        <MenuBookIcon className={styles.icon} />
                    </Avatar>
                    <h2> Sign Up</h2>
                    <form className={styles.form} noValidate>
                        <CssTextField
                            variant='outlined'
                            margin='normal'
                            required
                            fullWidth
                            id='givenname'
                            label='Given Name'
                            name='givenname'
                            autoComplete='givenname'
                            autoFocus
                        />
                        <CssTextField
                            variant='outlined'
                            margin='normal'
                            required
                            fullWidth
                            id='lastname'
                            label='Last Name'
                            name='lastname'
                            autoComplete='lastname'
                            autoFocus
                        />
                        <CssTextField
                            variant='outlined'
                            margin='normal'
                            required
                            fullWidth
                            id='email'
                            label='Email Address'
                            name='email'
                            autoComplete='email'
                            autoFocus
                        />
                        <CssTextField
                            variant='outlined'
                            margin='normal'
                            required
                            fullWidth
                            name='password'
                            label='Password'
                            type='password'
                            id='password'
                            autoComplete='current-password'
                        />
                        <CssTextField
                            variant='outlined'
                            margin='normal'
                            required
                            fullWidth
                            name='comfirmpassword'
                            label='Comfirm Password'
                            type='comfirmpassword'
                            id='comfirmpassword'
                            autoComplete='current-password'
                        />
                        <FormControlLabel
                            control={<Checkbox value='remember' color='white' />}
                            label='Remember me'
                        />
                        <Button
                            type='submit'
                            fullWidth
                            variant='contained'
                            color='primary'
                            className={styles.submit}
                        >
                            Sign Up
                        </Button>
                        <Grid item>
                            <Link href='/' variant='body2'>
                                {"Now,Login?"}
                            </Link>
                        </Grid>

                    </form>
                </Paper>
            </div>
        </div>
    );
};

export default SignUp;
