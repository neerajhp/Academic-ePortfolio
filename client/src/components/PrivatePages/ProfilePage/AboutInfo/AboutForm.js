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

const AboutForm = ({ handleClose, records }) => {
  const classes = useStyles();

  return (
    <Form
      initialValues={{
        ...records,
      }}
      onFinish={(values) => {
        console.log(values);
        API.editAboutMe(values).then(({ data }) => {
          handleClose();
        });
      }}
    >
      <Form.Item name="aboutMe">
        <Input.TextArea rows={4} column={16} />
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

export default AboutForm;
