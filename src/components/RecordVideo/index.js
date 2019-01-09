import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
// import diskStorage from 'utils/DiskStorage';
import { loadIndexedDB } from 'utils/indexedDbStorage';
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
  }

  componentDidUpdate(prevProps) {
    if (this.props.fileName !== prevProps.fileName) {
      this.getFileUrl(this.props.fileName);
    }
  }

  getFileUrl = fileName => {
    loadIndexedDB(fileName, file => {
      console.log(file);
      if (file) {
        this.videoRef.current.currentTime = 9999999999;
        this.setState({ src: URL.createObjectURL(file) });
      }
    });

    // diskStorage.Fetch(fileName, file => {
    //   console.log(file);
    //   if (file) {
    //     this.videoRef.current.currentTime = 9999999999;
    //     this.setState({ src: URL.createObjectURL(file) });
    //   }
    // });
  };

  render() {
    console.log(this.state.src);
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
