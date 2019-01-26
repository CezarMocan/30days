import React from 'react'
import Link from 'next/link'
import Style from '../static/styles/main.less'
import Head from '../components/Head'
import Sketch from '../components/Sketch'

export default class Index extends Sketch {
  setup() {
    this.p5.background(0, 0, 0)
    this.p5.fill(250, 250, 250)

    // this.circles = this.generateCircles(10)
    this.circles = this.generateCirclesGrid(1, 500)
  }

  generateCircles(cnt) {
    const circles = []
    for (let i = 0; i < cnt; i++) {
      circles.push({
        x: this.HEIGHT * Math.random(),
        y: this.WIDTH * Math.random(),
        r: 100 * Math.random()
      })
    }

    return circles
  }

  generateCirclesGrid(cnt, r) {
    const circles = []
    for (let i = 0; i <= cnt; i++) 
      for (let j = 0; j <= cnt; j++) {
        circles.push({
          x: this.HEIGHT * i / cnt,
          y: this.WIDTH * j / cnt,
          r: r
        })
      }

    return circles
  }

  pointOnCircle(ox, oy, r, a) {
    return {
      x: ox + r * Math.cos(a),
      y: oy + r * Math.sin(a)
    }
  }

  draw() {
    // this.p5.clear()
    // if (this.p5.frameCount % 100 == 0) {
    //   this.p5.clear()
    //   this.p5.background(0)
    //   this.circles = this.generateCirclesGrid(this.p5.frameCount / 100 + 1, 500) 
    // }

    if (this.p5.frameCount % 100 == 0) {
      this.p5.clear()
      this.p5.background(0)
      this.circles = this.generateCirclesGrid((this.p5.frameCount % 400) / 100 + 1, 500) 
    }


    const fc = this.p5.frameCount / 4
    const r = 100
    this.p5.noFill()

    let index = 0
    for (let circle of this.circles) {
      index++
      this.p5.stroke(Math.sin(fc * circle.r / 1000) * 128 + 128, Math.sin(fc * circle.r / 100) * 128 + 128, Math.cos(fc * circle.r / 1000) * 128 + 128)
      const p = this.pointOnCircle(circle.x, circle.y, circle.r, 2 * Math.PI * ((fc + index) % 360) / 360)      
      circle.p = p
    }

    for (let i = 0; i < this.circles.length; i++) {
      const circle = this.circles[i]
      const p = this.circles[i].p
      // this.p5.circle(p.x, p.y, fc * 2)
      this.p5.ellipse(p.x, p.y, (0.05 * fc + i) * Math.sin(fc / 2), (fc + i) * Math.cos(fc / 100))
      // this.p5.ellipse(p.x, p.y, (40 + i) * Math.sin(fc / 2), (fc + i) * Math.cos(fc / 100))
      this.p5.line(circle.x, circle.y, p.x, p.y)
    }
  }
}
