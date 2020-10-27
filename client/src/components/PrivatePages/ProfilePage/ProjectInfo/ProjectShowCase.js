import API from '../../../../api/API';
import ProjectDialog from "./ProjectDialog";
import axios from "axios";
import AssignmentIcon from "@material-ui/icons/Assignment";
import Switch from "@material-ui/core/Switch";
import Collapse from "@material-ui/core/Collapse";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import {makeStyles} from "@material-ui/core/styles";
import React, {useRef, useState} from "react";
import {Paper, Typography} from "@material-ui/core";
import Background from '../../../../assets/Background/bkg-private.svg';

/* ================ Styling ================ */
const useStyles = makeStyles((theme) => ({
bkgContainer: {
    width: '100vw',
    height: '100vh',
    zIndex: -1,
    position: 'fixed',
    backgroundImage: `url(${Background})`,
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    backgroundAttachment: 'fixed',
    overflowY: 'auto',
    overflowX: 'hidden',
},
title: {
    width: '100%',
        color: "#345719",
},
feature: {
    marginTop: theme.spacing(2),
        width: '100%',
        flexGrow: 1,
        display: 'flex',
        alignItems: 'flex-start',
},
editDialogContainer: {
    width: '100%',
        display: 'flex',
        justifyContent: 'flex-end',
        position: 'relative',
},
fileTitle: {
    cursor: "pointer",
        color: "#345719",
},
fileList: {
    display: "flex",
        paddingTop: "10px",
},
fileItem: {
    textAlign: "center",
        margin: "0 10px",
        fontWeight: "bolder",
        fontSize: "1em",
},
fileLink: {
    color: "#345719",
        fontWeight: "bolder",
        marginTop: "15px",
        paddingTop: "15px",
},
upload: {
    position: "absolute",
        bottom: 40,
        right: 20,
},
hidden: {
    display: "none",
},

}));


const ProjectShowcase = () => {
    const classes = useStyles();
    const inputEl = useRef(null);
    const [records, setRecords] = useState('');
    const [open, setOpen] = React.useState(false);
    const [allFiles, setAllFiles] = useState([]);
    const [allId, setAllId] = useState([]);
    const [checked, setChecked] = React.useState(false);


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


    return (
     <div className={classes.bkgContainer}>
        <div style={{marginTop: 70}}>
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
                        <AssignmentIcon style={{fontSize: 30}}/>
                        <div>
                            {item.s3_key.replace(`user-${item.user_id}/`, "")}
                        </div>
                    </div>
                ))}
            </div>
        </div>

        <div style={{marginTop: 50}}>
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
                        {item.s3_key}
                    </a>
                </div>
            ))}
        </div>
        </div>
);
};

    export default ProjectShowcase;


