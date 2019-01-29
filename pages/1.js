import React from 'react'
import Link from 'next/link'
import Style from '../static/styles/main.less'
import Head from '../components/Head'
import Sketch from '../components/Sketch'

export default class Index extends Sketch {
  setup() {
    this.p5.background(128, 128, 128)
    this.p5.blendMode(this.p5.DIFFERENCE)
    this.p5.noStroke()

    this.p5.fill(250, 250, 250)
    this.p5.background(0, 0, 0)
  }

  draw() {
    const time = (this.p5.millis() / 1500 + 6.5)
    this.p5.clear()
    this.p5.background(205, 205, 205)
    this.p5.fill(250, 250, 250)
    this.p5.noStroke()
    let circles = []

    for (let i = 0; i < 20; i++) {
      const x = Math.cos(time / 3 + i) * this.WIDTH / 2 + this.WIDTH / 2
      const y = Math.sin(time / 2 + i) * this.HEIGHT / 2 + this.HEIGHT / 2
      const r = Math.abs(Math.cos(time / 4 + i) / Math.cos(time / 10 + i)) * 300
      this.p5.circle(x, y, r)
      circles.push({ x: x, y: y, r: r })
    }

    this.p5.stroke(255)
    for (let i = 0; i < 10; i++) {
      for (let j = i + 1; j < 10; j++) {
        this.p5.strokeWeight(circles[i].r / 2 + 5)
        this.p5.line(circles[i].x, circles[i].y, circles[j].x, circles[j].y)
      }
    }
  }
}
