import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  Paper,
  Table,
  TableRow,
  TableCell,
  Typography,
  TableBody,
  Divider,
} from "@material-ui/core";
import ExperienceDialog from "./ExperienceDialog.js";

/* ================ Styling ================ */
const useStyles = makeStyles((theme) => ({
  card: {
    margin: "0 0 1% 1%",
    width: "100%",
    padding: theme.spacing(5),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },
  workSection: {
    margin: theme.spacing(2),
    width: "100%",
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-end",
  },
  emptySection: {
    margin: theme.spacing(2),
    width: "100%",
    display: "flex",
    justifyContent: "center",
    order: 3,
  },
  title: {
    width: "100%",
    marginBottom: theme.spacing(3),
    display: "flex",
    flexDirection: "row",
  },
  tableTitle: {
    display: "flex",
    width: "100%",
    alignItems: "center",
  },
  subTitle: {
    width: "95%",
    display: "flex",
    flexDirection: "row",
    "&::after": {
      content: '""',
      flex: "1 1",
      borderColor: "#D9D7D7",
      borderBottom: "1px solid",
      margin: "auto",
    },
  },
  tableContainer: {
    width: "90%",
    paddingLeft: theme.spacing(1),
    paddingRight: theme.spacing(3),
  },
  table: {
    "&.MuiTable-root": {
      width: "90%",
    },
    "& .MuiTableCell-root": {
      borderBottom: "0px ",
    },
  },

  period: {
    width: "30%",
    verticalAlign: "top",
  },
  experience: {
    verticalAlign: "top",
  },
  organisation: {
    width: "100%",
  },
  role: {
    color: theme.palette.primary.light,
  },
  description: {
    marginTop: theme.spacing(1),
  },
  workDivider: {
    width: "100%",
  },
  editDialogContainer: {
    width: "5%",
    display: "flex",
    justifyContent: "flex-end",
    position: "relative",
  },
}));

/* ================ Constants ================ */

const MONTHS = {
  1: "Jan",
  2: "Feb",
  3: "Mar",
  4: "Apr",
  5: "May",
  6: "Jun",
  7: "Jul",
  8: "Aug",
  9: "Sep",
  10: "Oct",
  11: "Nov",
  12: "Dec",
};

/* ================ Component ================ */
const ExperienceCard = ({ experience, editable }) => {
  const classes = useStyles();

  const [records, setRecords] = useState(experience);

  function capitaliseFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  const getRecord = (experience, type) => {
    if (!(Array.isArray(experience) && experience.length)) {
      return (
        <div className={classes.emptySection}>
          {editable && (
            <ExperienceDialog
              type={type}
              records={experience}
              setRecords={setRecords}
              empty={true}
            />
          )}
        </div>
      );
    } else {
      return (
        <div className={classes.workSection}>
          <div className={classes.tableTitle}>
            <Typography className={classes.subTitle} variant="h3">
              {capitaliseFirstLetter(type)}
            </Typography>{" "}
            {editable && (
              <div className={classes.editDialogContainer}>
                <ExperienceDialog
                  type={type}
                  records={experience}
                  setRecords={setRecords}
                  empty={false}
                />
              </div>
            )}
          </div>
          <div className={classes.tableContainer}>
            <Table className={classes.table}>
              <TableBody>
                {experience.map((exp, i) => (
                  <React.Fragment key={i}>
                    <TableRow className={classes.table}>
                      <TableCell className={classes.period}>
                        <Typography>
                          {MONTHS[exp.monthStart]}, {exp.yearStart} -
                          {MONTHS[exp.monthEnd]}, {exp.yearEnd}
                        </Typography>
                      </TableCell>
                      <TableCell className={classes.experience}>
                        <Typography
                          className={classes.organisation}
                          variant="h3"
                        >
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
                    <tr>
                      <td colSpan="2">
                        {experience[i + 1] && (
                          <Divider className={classes.workDivider} />
                        )}
                      </td>
                    </tr>
                  </React.Fragment>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>
      );
    }
  };

  return (
    <Paper className={classes.card}>
      <Typography className={classes.title} variant="h2">
        Experience{" "}
      </Typography>

      {getRecord(records.employment, "employment")}
      {getRecord(records.volunteering, "volunteering")}
      {getRecord(records.extracurricular, "extracurricular")}
    </Paper>
  );
};

export default ExperienceCard;
