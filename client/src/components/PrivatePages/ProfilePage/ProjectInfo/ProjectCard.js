import React, { useRef, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Paper, Typography } from "@material-ui/core";
import axios from "axios";
import API from "../../../../api/API";
import ProjectDialog from "./ProjectDialog";
import FormatListBulletedIcon from "@material-ui/icons/List";
import BackupIcon from "@material-ui/icons/Backup";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import GetAppIcon from "@material-ui/icons/GetApp";
import AssignmentIcon from "@material-ui/icons/Assignment";
import { ButtonGroup, Button } from "@material-ui/core";
import { flexbox } from "@material-ui/system";

/* ================ Styling ================ */

const useStyles = makeStyles((theme) => ({
  card: {
    margin: "0 0 1% 1%",
    background: theme.palette.primary.light,
    color: theme.palette.text.secondary,
    padding: "5%",
    display: "flex",
    //alignItems: "center",
    justifyContent: "flex-start",
    position: "relative",
  },
  description: {
    marginLeft: "5%",
    color: "white !important ",
  },
  large: {
    background: theme.palette.secondary.light,
    width: "100%",
    height: "40%",
  },
  medium: {
    alignItems: "center",
    width: "100%",
    height: "30%",
  },
  small: {
    alignItems: "center",
    width: "49%",
    height: "30%",
  },
  upload: {
    position: "absolute",
    bottom: 40,
    right: 20,
  },
  hidden: {
    display: "none",
  },
  titleLarge:{
    marginTop:"0px",
  },
  title: {
    marginBottom: "50px",
  },
  fileTitle: {
    cursor: "pointer",
  },
  fileList: {
    display: "flex",
    paddingTop: "10px",
  },
  fileItem: {
    textAlign: "center",
    margin: "0 20px",
    fontWeight: "bolder",
    fontSize:"1em",
  },
  fileLink: {
    color: "#fff",
    fontWeight: "bolder",
    marginTop: "15px",
    paddingTop:"15px",
  },
}));
/* ================ Component ================ */
const ProjectCard = ({ type, project }) => {
  const classes = useStyles();
  const inputEl = useRef(null);
  const [allFiles, setAllFiles] = useState([]);
  const [allId, setAllId] = useState([]);
  //Default  card size is large
  var cardSize;

  switch (type) {
    case "large":
      cardSize = classes.large;
      break;
    case "medium":
      cardSize = classes.medium;
      break;
    case "small":
      cardSize = classes.small;
      break;
    default:
      cardSize = classes.large;
  }

  const handleChoseFile = (e) => {
    e.preventDefault();
    const file = e.target.files;
    if (!file.length) {
      return false;
    }
    if (file.length < 6) {
      let param = new FormData();
      for (const key in file) {
        if (file.hasOwnProperty(key)) {
          const item = file[key];
          param.append("document", item);
        }
      }
      axios({
        method: "post",
        url: "/api/upload/files",
        data: param,
        headers: {
          Authorization: "Bearer: " + JSON.parse(localStorage.getItem("token")),
        },
        responseType: "blob",
      }).then((result) => {});
    } else {
      alert("the max number is 5");
    }
  };

  const onFinish = () => {
    API.getAllFiles().then((result) => {
      if (result.status === 200) {
        setAllFiles(result.data);
      }
    });
  };

  const onIdFinish = () => {
    // test data
    // ['url1','url2','url3','url4']
    API.getAllFiles().then((result) => {
      if (result.status === 200) {
        setAllId(result.data);
        console.log(123, allFiles);
      }
    });
  };

  const handleDel = (recordID) => {
    API.removeFeaturedWork(recordID).then((result) => {
      if (result.status === 200) {
        console.log(123);
      }
    });
  };

  const getRecord = () => {
    return <Typography> Add your project!</Typography>;
  };

  const [records, setRecords] = useState(project);

  return (
    <Paper className={`${classes.card}  ${cardSize}`}>
      <div className={classes.bio}>
        {type === "small" && (
          <>
            <Typography className={classes.title} variant="h3">
              This is a small Project Card
            </Typography>
            <Typography>This is the project description</Typography>
            <input
              className={classes.hidden}
              type="file"
              ref={inputEl}
              accept=".PDF,.png,.jpeg.JPEG,.pdf,.mp4,.MP4,.DOCX,.docx"
              multiple
              onChange={handleChoseFile}
            />
            {getRecord(records)}
            {/* <div className={classes.tableContainer}>{getRecord(records)}</div> */}
            {/* <ProjectDialog records={records} setRecords={setRecords} /> */}
            <div className={classes.upload}>
              <ButtonGroup color="#fff">
                <Button>
                  <ProjectDialog records={records} setRecords={setRecords} />
                </Button>
                <Button onClick={() => inputEl.current.click()}>
                  <BackupIcon />
                </Button>
                <Button onClick={() => handleDel(records?.recordID)}>
                  <DeleteIcon />
                </Button>
              </ButtonGroup>
            </div>
          </>
        )}
        {type === "medium" && (
          <>
            <Typography className={classes.title} variant="h2">
              This is a medium Project Card
            </Typography>
            <Typography>This is the project description</Typography>
            <input
              className={classes.hidden}
              type="file"
              ref={inputEl}
              accept=".PDF,.png,.jpeg.JPEG,.pdf,.mp4,.MP4,.DOCX,.docx"
              multiple
              onChange={handleChoseFile}
            />
            {getRecord(records)}
            {/* <div className={classes.tableContainer}>{getRecord(records)}</div> */}
            {/* <ProjectDialog records={records} setRecords={setRecords} /> */}
            <div className={classes.upload}>
              <ButtonGroup color="#fff">
                <Button>
                  <ProjectDialog records={records} setRecords={setRecords} />
                </Button>
                <Button onClick={() => inputEl.current.click()}>
                  <BackupIcon />
                </Button>
                <Button onClick={() => handleDel(records?.recordID)}>
                  <DeleteIcon />
                </Button>
              </ButtonGroup>
            </div>
          </>
        )}
        {type === "large" && (
            <>
            <Typography className={classes.titleLarge} variant="h1">
              Showcase
            </Typography>

            <div style={{ marginTop: 70 }}>
              <Typography
                onClick={() => onFinish()}
                className={classes.fileTitle}
                variant="h4"
              >
                Click here to see Uploaded Files
              </Typography>
              <div className={classes.fileList}>
                {allFiles.map((item) => (
                  <div className={classes.fileItem} key={item.id}>
                    <AssignmentIcon style={{ fontSize: 60 }}/>
                    <div>{item.fieldName}</div>
                  </div>
                ))}
              </div>
            </div>
            <div style={{ marginTop: 50 }}>
              <Typography
                onClick={() => onIdFinish()}
                className={classes.fileTitle}
                variant="h4"
              >
                Click here and Choose to Download Uploaded Files
              </Typography>
              {allId &&
                allId.map((item) => (
                  <div key={item._id}>
                    <a className={classes.fileLink} href={item.fileLink}>
                      {item.fieldName}
                    </a>
                  </div>
                ))}
            </div>
          </>
        )}
      </div>
    </Paper>
  );
};

export default ProjectCard;
