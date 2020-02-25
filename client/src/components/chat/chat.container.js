/* eslint-disable react/prop-types */
/* eslint-disable react/no-unused-state */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Divider from '@material-ui/core/Divider';
import Drawer from '@material-ui/core/Drawer';
import Hidden from '@material-ui/core/Hidden';
import IconButton from '@material-ui/core/IconButton';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import MailIcon from '@material-ui/icons/Mail';
import MenuIcon from '@material-ui/icons/Menu';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { withStyles, withTheme } from '@material-ui/core/styles';
import ChatApp from '../../redux-containers/chat';
import jobAction from '../../redux/addJob/jobActions';

const drawerWidth = 240;

const styles = (theme) => ({
  root: {
    display: 'flex'
  },
  drawer: {
    [theme.breakpoints.up('sm')]: {
      width: drawerWidth,
      flexShrink: 0
    }
  },
  appBar: {
    [theme.breakpoints.up('sm')]: {
      width: `calc(100% - ${drawerWidth}px)`,
      marginLeft: drawerWidth
    }
  },
  menuButton: {
    marginRight: theme.spacing(2),
    [theme.breakpoints.up('sm')]: {
      display: 'none'
    }
  },
  toolbar: theme.mixins.toolbar,
  drawerPaper: {
    width: drawerWidth,
    top: '51px',
    height: '85%'
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3)
  },
  appBarFixed: {
    top: '51px',
  }
});

class ChatContainer extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      appliedjobs: [],
      currentUser: '',
      active: false,
      mobileOpen: false
    };
  }

  static getDerivedStateFromProps(props, state) {
    if (props.appliedjobs !== state.appliedjobs) {
      return {
        appliedjobs: props.appliedjobs,
        currentUser: props.currentUser
      };
    }
    return null;
  }

  componentDidMount() {
    const { dispatch } = this.props;
    const { currentUser } = this.state;
    dispatch(jobAction.getAppliedJob(currentUser.name));
  }

  renderUserList = (props) => {
    console.log(props.data);
    let usersArray = [];
    const { currentUser } = this.state;
    console.log(currentUser);
    const { name } = currentUser;
    props.data.forEach((job) => {
      console.log(job.userDetails.name === name);
      if (job.userDetails.name === name) {
        usersArray.push(job.jobDetails.company);
      } else if (job.jobDetails.company === name) {
        usersArray.push(job.userDetails.name);
      }
    });
    usersArray = [...new Set(usersArray)];
    console.log(usersArray);
    return usersArray.map((user, index) => {
      return (
        <li
          className="list-group-item"
          key={user}
          id={user}
          title={user}
          onClick={this.openChat}
          onKeyPress={this.onKeyPress}
        >
          {user}
          <span className="messages-count"></span>
        </li>
      );
    });
  };

  handleDrawerToggle = () => {
    this.setState((state) => {
      return {
        mobileOpen: !state.mobileOpen
      };
    });
  };

  openChat = (e) => {
    e.preventDefault();
    const username = e.target.id;
    this.setState({
      active: true,
      username
    });
  };

  handleTypingData = (message, data) => {
    // if (message === false && data === false) {
    //   this.setState({
    //     message: false
    //   });
    // } else {
    //   this.setState({
    //     message,
    //     userTyping: data
    //   });
    // }
  };

  render() {
    const { classes, container, theme } = this.props;
    console.log(classes);
    const { appliedjobs, active, mobileOpen } = this.state;
    const drawer = (
      <div>
        <div className={classes.toolbar} />
        <Divider />
        <List>
          {['Inbox', 'Starred', 'Send email', 'Drafts'].map((text, index) => (
            <ListItem button key={text}>
              <ListItemIcon>
                {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItem>
          ))}
        </List>
        <Divider />
        <List>
          {['All mail', 'Trash', 'Spam'].map((text, index) => (
            <ListItem button key={text}>
              <ListItemIcon>
                {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItem>
          ))}
        </List>
      </div>
    );

    return (
      <div className={classes.root}>
        <AppBar
          position="fixed"
          classes={{ positionFixed: classes.appBarFixed }}
          className={classes.appBar}
        >
          <Toolbar>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="start"
              onClick={this.handleDrawerToggle}
              className={classes.menuButton}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h3" noWrap>
              Chat
            </Typography>
          </Toolbar>
        </AppBar>
        <nav className={classes.drawer} aria-label="mailbox folders">
          {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
          <Hidden smUp implementation="css">
            <Drawer
              container={container}
              variant="temporary"
              anchor={theme.direction === 'rtl' ? 'right' : 'left'}
              open={mobileOpen}
              onClose={this.handleDrawerToggle}
              classes={{
                paper: classes.drawerPaper
              }}
              ModalProps={{
                keepMounted: true // Better open performance on mobile.
              }}
            >
              {appliedjobs && <this.renderUserList data={appliedjobs} />}
            </Drawer>
          </Hidden>
          <Hidden xsDown implementation="css">
            <Drawer
              classes={{
                paper: classes.drawerPaper
              }}
              variant="permanent"
              open
            >
              {appliedjobs && <this.renderUserList data={appliedjobs} />}
            </Drawer>
          </Hidden>
        </nav>
        <main className={classes.content}>
          <div className={classes.toolbar} />
          <Typography div>
            {active ? (
              <ChatApp
                handleTyping={this.handleTypingData}
                username={this.state.username}
                key={this.state.username}
              />
            ) : (
              ''
            )}
          </Typography>
        </main>
      </div>
    );
  }
}

ChatContainer.propTypes = {
  appliedjobs: PropTypes.oneOfType([PropTypes.object]).isRequired,
  currentUser: PropTypes.oneOfType([PropTypes.object]).isRequired,
  dispatch: PropTypes.func.isRequired
};

export default withStyles(styles, { withTheme: true })(ChatContainer);
