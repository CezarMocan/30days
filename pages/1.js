import React from 'react'
import Link from 'next/link'
import Style from '../static/styles/main.less'
import Head from '../components/Head'
import Sketch from '../components/Sketch'

export default class Index extends Sketch {
  setup() {
    this.p5.background(128, 128, 128)
    this.factor = 1
    this.stroke = { r: 0, g: 0, b: 0 }
    this.fill = { r: 240, g: 240, b: 240 }
  }
  draw() {
    if (this.p5.mouseIsPressed) {
      this.p5.fill(0);
    } else {
      this.p5.fill(255);
    }
    // this.p5.ellipse(this.p5.mouseX, this.p5.mouseY, 10, 80);
    this.factor *= 0.9999

    // / 10000 & / 5000 work super nicely
    this.p5.stroke(this.stroke.r, this.stroke.g, this.stroke.b)
    this.p5.fill(this.fill.r, this.fill.g, this.fill.b)
    this.p5.ellipse(Math.sin(this.p5.millis() / 5000) * this.WIDTH / 2 * this.factor + this.WIDTH / 2, Math.cos(this.p5.millis() / 5000) * this.HEIGHT / 2 * this.factor + this.HEIGHT / 2, this.factor * 50 * Math.cos(this.p5.millis() / 1000), this.factor * 150 * Math.sin(this.p5.millis() / 1000))

    this.stroke.r = Math.round(160 + 74 * Math.sin(this.p5.millis() / (1340 * this.factor)))
    this.stroke.g = Math.round(130 + 90 * Math.sin(this.p5.millis() / (1240 * this.factor)))
    this.stroke.b = Math.round(180 + 60 * Math.sin(this.p5.millis() / (1140 * this.factor)))

    this.fill.r = this.stroke.r / 2
    this.fill.g = this.stroke.g / 2
    this.fill.b = this.stroke.b / 2
  }
}
