import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
  Paper,
  Table,
  TableRow,
  TableCell,
  Typography,
  TableBody,
} from '@material-ui/core';
import ExperienceDialog from './ExperienceDialog.js';

/* ================ Styling ================ */
const useStyles = makeStyles((theme) => ({
  card: {
    margin: '0 0 1% 1%',
    width: '100%',
    // background: theme.palette.secondary.light,
    // color: theme.palette.text.secondary,
    padding: theme.spacing(5),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  workSection: {
    margin: theme.spacing(2),
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-end',
  },
  title: {
    width: '100%',
    marginBottom: theme.spacing(3),
    display: 'flex',
    flexDirection: 'row',
  },
  subTitle: {
    width: '100%',
    marginBottom: theme.spacing(3),
    display: 'flex',
    flexDirection: 'row',
    '&::after': {
      content: '""',
      flex: '1 1',
      borderColor: '#D9D7D7',
      borderBottom: '1px solid',
      margin: 'auto',
    },
  },
  tableContainer: {
    width: '90%',
    paddingLeft: theme.spacing(1),
    paddingRight: theme.spacing(3),
  },
  table: {
    '& .MuiTable-root': {
      // color: theme.palette.text.secondary,
      borderBottom: `1px solid ${theme.palette.primary.light}`,
    },
  },
  addExperience: {
    display: 'flex',
    justifyContent: 'center',
    background: theme.palette.neutral.light,
    borderRadius: theme.spacing(2),
  },
  period: {
    width: '30%',
    verticalAlign: 'top',
  },
  experience: {
    verticalAlign: 'top',
  },
  organisation: {
    width: '100%',
  },
  role: {
    color: theme.palette.primary.light,
  },
  description: {
    marginTop: theme.spacing(1),
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
const ExperienceCard = ({ experience }) => {
  const classes = useStyles();

  const [records, setRecords] = useState(experience);

  const getRecord = (experience) => {
    if (!(Array.isArray(experience) && experience.length)) {
      return (
        <Typography variant='h3' className={classes.addExperience}>
          {' '}
          Display Your Experience here!
        </Typography>
      );
    } else {
      return (
        <Table className={classes.table}>
          <TableBody>
            {experience.map((exp, i) => (
              <TableRow key={i} className={classes.table}>
                <TableCell className={classes.period}>
                  <Typography>
                    {MONTHS[exp.monthStart]}, {exp.yearStart} -
                    {MONTHS[exp.monthEnd]}, {exp.yearEnd}
                  </Typography>
                </TableCell>
                <TableCell className={classes.experience}>
                  <Typography className={classes.organisation} variant='h3'>
                    {exp.organization}
                  </Typography>

                  <Typography className={classes.role}>
                    {exp.role} {`, ${exp.employeeStatus}`}
                  </Typography>

                  <Typography className={classes.description}>
                    {exp.description}
                  </Typography>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      );
    }
  };

  return (
    <Paper className={classes.card}>
      <Typography className={classes.title} variant='h2'>
        Experience{' '}
      </Typography>
      <div className={classes.workSection}>
        <Typography className={classes.subTitle} variant='h3'>
          Professional Work
        </Typography>
        <div className={classes.tableContainer}>
          {getRecord(records.employment)}
        </div>
        <ExperienceDialog
          type={'employment'}
          records={records.employment}
          setRecords={setRecords}
        />
      </div>
      <div className={classes.workSection}>
        <Typography className={classes.subTitle} variant='h3'>
          Volunteer Work
        </Typography>
        <div className={classes.tableContainer}>
          {getRecord(records.volunteering)}
        </div>
        <ExperienceDialog
          type={'volunteering'}
          records={records.volunteering}
          setRecords={setRecords}

        />
      </div>
      <div className={classes.workSection}>
        <Typography className={classes.subTitle} variant='h3'>
          Extracurricular Work
        </Typography>
        <div className={classes.tableContainer}>
          {getRecord(records.extracurricular)}
        </div>
        <ExperienceDialog
          type={'extracurricular'}
          records={records.extracurricular}
          setRecords={setRecords}
        />
      </div>
    </Paper>
  );
};

export default ExperienceCard;
