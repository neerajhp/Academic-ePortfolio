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
import EducationDialog from './EducationDialog';

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
  title: { width: '100%' },
  tableContainer: {
    width: '90%',
    paddingLeft: theme.spacing(1),
    paddingRight: theme.spacing(3),
  },
  table: {
    '& .MuiTableCell-body': {
      // color: theme.palette.text.secondary,
    },
  },
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

  const [records, setRecords] = useState(education);

  const getRecord = (education) => {
    if (!(Array.isArray(education) && education.length)) {
      return <Typography> Add your education!</Typography>;
    } else {
      return (
        <Table className={classes.table}>
          <TableBody>
            {education.map((edu, i) => (
              <TableRow key={i} className={classes.table}>
                <TableCell className={classes.period}>
                  <Typography>
                    {MONTHS[edu.monthStart]}, {edu.yearStart} -
                    {MONTHS[edu.monthEnd]}, {edu.yearEnd}
                  </Typography>
                </TableCell>
                <TableCell className={classes.education}>
                  <Typography variant='h4'>{edu.schoolName}</Typography>
                  {edu.edu_type === 'University' ? (
                    <Typography>
                      {edu.unicourseName} {edu.unimajorName}
                    </Typography>
                  ) : (
                    ''
                  )}
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
        Education{' '}
      </Typography>
      <div className={classes.tableContainer}>{getRecord(records)}</div>
      <EducationDialog records={records} setRecords={setRecords} />
    </Paper>
  );
};

export default EducationCard;
