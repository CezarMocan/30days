import React from 'react'
import Link from 'next/link'
import Style from '../static/styles/main.less'
import Head from '../components/Head'

export default class Index extends React.Component {
  constructor(props) {
    super(props)
    this.WIDTH = 700
    this.HEIGHT = 700


    this.state = {
      recording: false
    }
    this.record = this.record.bind(this)
  }
  record() {
    const { recording } = this.state
    if (!recording) {
      this.setState({ recording: true })
      this.chunks = []
      this.chunks.length = 0;
      let stream = document.querySelector('canvas').captureStream(30)
      this.recorder = new MediaRecorder(stream);
      this.recorder.ondataavailable = e => {
        if (e.data.size) this.chunks.push(e.data)
      }
      this.recorder.onstop = this.exportVideo.bind(this);
      this.recorder.start()

    } else {
      this.recorder.stop()
    }
  }

  exportVideo() {
    var blob = new Blob(this.chunks);
    var vid = document.createElement('video');
    vid.id = 'recorded'
    vid.controls = true;
    const src = URL.createObjectURL(blob);
    var a = document.createElement('a');
    document.body.appendChild(a);
    a.style = 'display: none';
    a.href = src;
    a.download = 'test.webm';
    a.click();
    window.URL.revokeObjectURL(src);
  }

  _setup() {
    this.p5.createCanvas(this.WIDTH, this.HEIGHT)
    this.p5.background(255)
    this.setup()
  }
  setup() { }
  _draw() {
    this.draw()
  }
  draw() { }
  componentDidMount() {
    new p5((s) => {
      this.p5 = s
      this.p5.setup = this._setup.bind(this)
      this.p5.draw = this._draw.bind(this)
    }, 'p5-canvas')
  }
  render() {
    const { recording } = this.state
    return (
      <div>
        <Head withP5={true}/>
        <div id='p5-canvas' style={{
          position: 'absolute',
          left: '0',
          right: '0',
          top: '0',
          bottom: '0',
          marginLeft: 'auto',
          marginRight: 'auto',
          marginTop: 'auto',
          marginBottom: 'auto',
          width: this.WIDTH,
          height: this.HEIGHT
        }}></div>
        <button onClick={this.record}>{!recording ? 'Start Recording' : 'Stop Recording'}</button>
      </div>
    )
  }
}
