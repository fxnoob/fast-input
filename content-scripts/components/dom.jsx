import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import FileCopy from '@material-ui/icons/FileCopy';
import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';

import { Client_message } from "../../src/util/client_message";

const styles = theme => ({
  close: {
    padding: theme.spacing.unit / 2,
  },
});
const clientMessage = new Client_message();

class Dom extends React.Component {
  queue = [];
  state = {
    open: false,
    messageInfo: {},
  };
  componentDidMount () {
    /** Listening to message sentfrom popup page, option page or background script on content script */
    chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
      if (request.method === 'speech_recognition_text') {
        this.speechToTextListener(request.text)
      }
    })
  }

  speechToTextListener (text) {
    const ele = document.activeElement
    console.log(ele.tagName);
    if (ele.type == 'text' || ele.type == 'textarea' || ele.type == 'password' || ele.type == 'email') {
      ele.value += ' ' + text
      ele.focus()
      // setTimeout(() => {
      //   ele.addEventListener('keydown')
      //   ele.addEventListener('keyup')
      //   ele.addEventListener('keypress')
      //   let event = new KeyboardEvent('keydown', { bubbles: true, cancelable: true, shiftKey: false, code: 13 })
      //   ele.dispatchEvent(event)
      //   event = new KeyboardEvent('keyup', { bubbles: true, cancelable: true, shiftKey: false, code: 13 })
      //   ele.dispatchEvent(event)
      //   event = new KeyboardEvent('keypress', { bubbles: true, cancelable: true, shiftKey: false, code: 13 })
      //   ele.dispatchEvent(event)
      // }, 250)
    } else if (ele.tagName === 'yt-formatted-string') {
      ele.innerHTML += ' ' + text
    } else {
      console.log("this.handleClick(text);");
     /** open snackbar with recognised text */
      this.handleClick(text)();
    }
  }

  handleClick = message => () => {
    console.log(message);
    this.queue.push({
      message,
      key: new Date().getTime(),
    });

    if (this.state.open) {
      // immediately begin dismissing current message
      // to start showing new one
      this.setState({ open: false });
    } else {
      this.processQueue();
    }
  };

  processQueue = () => {
    if (this.queue.length > 0) {
      this.setState({
        messageInfo: this.queue.shift(),
        open: true,
      });
    }
  };

  handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    this.setState({ open: false });
  };
  handleCopy(message){
    clientMessage.setSelectedText(message);
    this.setState({ open: false });
  }
  handleExited = () => {
    this.processQueue();
  };

  render() {
    const { classes } = this.props;
    const { messageInfo } = this.state;

    return (
      <div>
        <Snackbar
          key={messageInfo.key}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'left',
          }}
          style={{zIndex: 4444444444444444444}}
          open={this.state.open}
          autoHideDuration={6000}
          onClose={this.handleClose}
          onExited={this.handleExited}
          ContentProps={{
            'aria-describedby': 'message-id',
          }}
          message={<span id="message-id">{messageInfo.message}</span>}
          action={[
            <IconButton
              key="close"
              aria-label="Close"
              color="inherit"
              className={classes.close}
              onClick={()=>{this.handleCopy(messageInfo.message)}}
            >
              <FileCopy />
            </IconButton>,
            <IconButton
              key="close"
              aria-label="Close"
              color="inherit"
              className={classes.close}
              onClick={this.handleClose}
            >
              <CloseIcon />
            </IconButton>,
          ]}
        />
      </div>
    );
  }
}
export default withStyles(styles)(Dom);