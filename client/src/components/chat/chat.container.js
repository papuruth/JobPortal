/* eslint-disable react/prop-types */
/* eslint-disable react/no-unused-state */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import AppBar from '@material-ui/core/AppBar';
import Divider from '@material-ui/core/Divider';
import Drawer from '@material-ui/core/Drawer';
import Hidden from '@material-ui/core/Hidden';
import IconButton from '@material-ui/core/IconButton';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import { withStyles } from '@material-ui/core/styles';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import MenuIcon from '@material-ui/icons/Menu';
import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
import ChatApp from '../../redux-containers/chat';
import jobAction from '../../redux/addJob/jobActions';

const drawerWidth = 255;

const styles = (theme) => ({
  root: {
    display: 'flex',
    marginLeft: '-15px',
    marginRight: '-15px'
  },
  drawer: {
    [theme.breakpoints.up('sm')]: {
      width: '240px',
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
    top: '54px',
    height: '85%'
  },
  content: {
    flexGrow: 1,
    padding: '5px',
    height: 'calc(100vh - 60px)',
    margin: 0,
    background:
      '#181b21 url(https://www.toptal.com/designers/subtlepatterns/patterns/nami.png)',
    fontFamily: '\'Quicksand\', sans-serif',
    letterSpacing: '-0.23px'
  },
  appBarFixed: {
    top: '54px'
  },
  primaryList: {
      fontSize: '1.5rem'
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
    let usersArray = [];
    const { currentUser } = this.state;
    const { name } = currentUser;
    props.forEach((job) => {
      if (job.userDetails.name === name) {
        usersArray.push(job.jobDetails.company);
      } else if (job.jobDetails.company === name) {
        usersArray.push(job.userDetails.name);
      }
    });
    usersArray = [...new Set(usersArray)];
    return usersArray;
  };

  handleDrawerToggle = () => {
    this.setState((state) => {
      return {
        mobileOpen: !state.mobileOpen
      };
    });
  };

  openChat = (props) => {
    const username = props;
    this.setState({
      active: true,
      username
    });
  };

  render() {
    const { classes, container, theme, loading = false } = this.props;
    const { appliedjobs, active, mobileOpen } = this.state;
    const drawer = (
      <div>
        <div className={classes.toolbar} />
        <Divider />
        <List>
          {appliedjobs &&
            this.renderUserList(appliedjobs).map((text, index) => (
              <ListItem button key={text}>
                <ListItemText
                  classes={{primary: classes.primaryList}}
                  primary={text}
                  onClick={() => this.openChat(text)}
                />
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
              {drawer}
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
              {drawer}
            </Drawer>
          </Hidden>
        </nav>
        <main className={classes.content}>
          <div className={classes.toolbar} />
          <section id="chatApp" className="chatApp"></section>
          {active ? (
            <ChatApp key={this.state.username} username={this.state.username} />
          ) : null}
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
