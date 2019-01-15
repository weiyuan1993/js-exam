import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import idbStorage from 'utils/idbStorage';
import styles from './RecordVideo.module.scss';

class RecordVideo extends PureComponent {
  constructor(props) {
    super(props);
    this.videoRef = React.createRef();
    this.state = {
      src: '',
    };
  }

  componentDidMount() {
    this.getFileUrl(this.props.fileName);
    this.videoRef.current.currentTime = 9999999999;
  }

  componentDidUpdate(prevProps) {
    if (this.props.fileName !== prevProps.fileName) {
      this.getFileUrl(this.props.fileName);
    }
  }

  getFileUrl = fileName => {
    if (!fileName) return;
    idbStorage.get(fileName).then(file => {
      if (file) {
        this.setState({ src: URL.createObjectURL(file) });
        if (this.videoRef.current)
          this.videoRef.current.currentTime = 9999999999;
      }
    });
  };

  render() {
    return (
      <video
        ref={this.videoRef}
        className={styles.video}
        controls
        src={this.state.src}
      >
        <track kind="captions" />
      </video>
    );
  }
}

RecordVideo.propTypes = {
  fileName: PropTypes.string.isRequired,
};

export default RecordVideo;
