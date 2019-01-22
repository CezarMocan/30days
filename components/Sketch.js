import React from 'react'
import Link from 'next/link'
import Style from '../static/styles/main.less'
import Head from '../components/Head'

export default class Index extends React.Component {
  constructor(props) {
    super(props)
    this.WIDTH = 700
    this.HEIGHT = 700
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
      </div>
    )
  }
}
