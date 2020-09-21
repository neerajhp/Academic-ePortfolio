import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
  Paper,
  Table,
  TableRow,
  TableCell,
  Typography,
  TableBody,
} from '@material-ui/core';

/* ================ Styling ================ */
const useStyles = makeStyles((theme) => ({
  card: {
    margin: '0.5%',
    flexGrow: 1,
    height: '20%',
    background: theme.palette.secondary.light,
    padding: '5%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: { width: '100%' },

  period: {
    width: '30%',
    verticalAlign: 'top',
  },
  education: {
    verticalAlign: 'top',
  },
}));

/* ================ Constants ================ */

const MONTHS = {
  1: 'Jan',
  2: 'Feb',
  3: 'Mar',
  4: 'Apr',
  5: 'May',
  6: 'Jun',
  7: 'Jul',
  8: 'Aug',
  9: 'Sep',
  10: 'Oct',
  11: 'Nov',
  12: 'Dec',
};

/* ================ Component ================ */
const EducationCard = ({ education }) => {
  const classes = useStyles();

  const checkRecord = (education) => {
    if (!(Array.isArray(education) && education.length)) {
      return <Typography> Add your education!</Typography>;
    } else {
      return (
        <Table>
          <TableBody>{education.map((edu) => getSchool(edu))}</TableBody>
        </Table>
      );
    }
  };

  const getSchool = (edu) => {
    if (edu.edu_type === 'Highschool') {
      return (
        <TableRow key={edu.uniName}>
          <TableCell className={classes.period}>
            <Typography>
              {MONTHS[edu.monthStart]}, {edu.yearStart} -{MONTHS[edu.monthEnd]},{' '}
              {edu.yearEnd}
            </Typography>
          </TableCell>
          <TableCell className={classes.education}>
            <Typography variant='h4'>{edu.highName}</Typography>
          </TableCell>
        </TableRow>
      );
    } else {
      return (
        <TableRow key={edu.uniName}>
          <TableCell className={classes.period}>
            <Typography>
              {MONTHS[edu.monthStart]}, {edu.yearStart} -{MONTHS[edu.monthEnd]},{' '}
              {edu.yearEnd}
            </Typography>
          </TableCell>
          <TableCell className={classes.education}>
            <Typography variant='h4'>{edu.uniName}</Typography>
            <Typography>
              {edu.unicourseName},{edu.unimajorName}{' '}
            </Typography>
          </TableCell>
        </TableRow>
      );
    }
  };

  return (
    <Paper className={classes.card}>
      <Typography className={classes.title} variant='h2'>
        Education{' '}
      </Typography>
      {checkRecord(education)}
    </Paper>
  );
};

export default EducationCard;
