import React, { Component } from 'react';
import './MainPage.css';

class Border extends Component {
  constructor(props) {
    super(props);
    this.ref = React.createRef();
    this.resize = this.resize.bind(this);
    this.startResize = this.startResize.bind(this);
    this.endResize = this.endResize.bind(this);
    this.state = { width: null };
  }
  componentDidMount() {
    this.setState({ width: this.ref.current.clientWidth });
  }
  startResize(e) {
    if (e.target.contains(this.ref.current)) {
      window.addEventListener('mousemove', this.resize);
      window.addEventListener('mouseup', this.endResize);
    }
  }
  resize(e) {
    this.setState({ width: e.clientX - this.ref.current.offsetLeft });
  }
  endResize(e) {
    window.removeEventListener('mousemove', this.resize);
    window.removeEventListener('mouseup', this.endResize);
  }
  render() {
    return (
      <div
        ref={this.ref}
        className={`border ${this.props.className ? this.props.className : ''}`}
        onMouseDown={this.startResize}
        style={
          this.state.width === null ?
            {} :
            { width: this.state.width + 'px' }
        }
      >
        { this.props.children }
      </div>
    )
  }
}

export default Border;