import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Form, Input, Button } from "antd";
import API from "../../../../api/API";

/* ================ Styling ================ */
// Form Styles
const useStyles = makeStyles((theme) => ({
  buttonContainer: {
    textAlign: "right",
  },
  button: {
    marginLeft: 8,
  },
}));

const SkillsForm = ({ handleClose, skills }) => {
  const classes = useStyles();

  return (
    <Form
      onFinish={(values) => {
        API.addSkills({
          skills: [...skills, values.skill],
        })
          .then(() => {
            handleClose();
          })
          .catch();
      }}
    >
      <Form.Item name="skill">
        <Input placeholder="please input skill" />
      </Form.Item>
      <div className={classes.buttonContainer}>
        <Button onClick={() => handleClose()}>Cancel</Button>
        <Button htmlType="submit" className={classes.button}>
          Update
        </Button>
      </div>
    </Form>
  );
};

export default SkillsForm;
