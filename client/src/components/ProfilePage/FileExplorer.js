import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import { Paper, AppBar, Tabs, Tab, Box } from '@material-ui/core';

//Styling
const useStyles = makeStyles(() => ({
  root: {
    flexGrow: 1,
    width: '100%',
    color: '#FFFFFF !important',
    backgroundColor: '#333B55 !important',
  },
  tabPanel: {
    backgroundColor: '#333B55 !important',
    '& .MuiTab-textColorPrimary': {
      color: '#FFFFFF !important',
    },
  },
}));

function TabPanel(props) {
  const { children, value, index, ...other } = props;
  return (
    <div
      role='tabpanel'
      hidden={value !== index}
      id={`scrollable-auto-tabpanel-${index}`}
      aria-labelledby={`scrollable-auto-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <p>{children}</p>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `scrollable-auto-tab-${index}`,
    'aria-controls': `scrollable-auto-tabpanel-${index}`,
  };
}

export default function ScrollableTabsButtonAuto() {
  const styles = useStyles();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Paper variant='outlined' className={styles.root}>
      <AppBar className={styles.tabPanel} position='static'>
        <Tabs
          value={value}
          onChange={handleChange}
          indicatorColor='primary'
          textColor='primary'
          variant='scrollable'
          scrollButtons='auto'
          aria-label='scrollable auto tabs example'
        >
          <Tab label='Item One' {...a11yProps(0)} />
          <Tab label='Item Two' {...a11yProps(1)} />
          <Tab label='Item Three' {...a11yProps(2)} />
        </Tabs>
      </AppBar>
      <TabPanel value={value} index={0}>
        Item One
      </TabPanel>
      <TabPanel value={value} index={1}>
        Item Two
      </TabPanel>
      <TabPanel value={value} index={2}>
        Item Three
      </TabPanel>
    </Paper>
  );
}
