import React from 'react'
import Link from 'next/link'
import Style from '../static/styles/main.less'
import Head from '../components/Head'
import Sketch from '../components/Sketch'

export default class Index extends Sketch {
  setup() {
    // this.p5.background(205, 205, 205)
    this.p5.background(86, 128, 181)
    this.p5.blendMode(this.p5.LIGHTEST)

    //218, 170, 95--yellow
    //86, 128, 181--blue
    //205, 205, 205--white

    this.step = -0.02
    this.angle = 0
    this.width = 50

    // this.p5.blendMode(this.p5.DIFFERENCE)
    this.sixTop = {
      step: -0.02,
      angle: 0,
      stopAngle: -Math.PI,
      o: { x: 250 - this.width / 4, y: 300 },
      angles: [0, 0, 0, -0.46, -0.75, -0.88, -0.99, -1.06, -1.12, -1.16, -1.2, -1.3, -1.3],
      stopAngles: [0, -Math.PI, -Math.PI, -Math.PI, -Math.PI, -Math.PI, -Math.PI, -Math.PI, -Math.PI, -Math.PI, -Math.PI, -Math.PI, -Math.PI],
      colors: {
        0: this.p5.color(218, 170, 95),
        // 1: this.p5.color(0, 0, 0, 0),
        2: this.p5.color(205, 205, 205),
      }
    }

    this.eightTop = {
      step: -0.02,
      angle: 0.8,
      stopAngle: -Math.PI - 0.8,
      o: { x: 450 + this.width / 4, y: 300 },
      angles: [0.8, 0.7, 0.5, 0.4, 0.32, 0.28, 0.25, 0.22, 0.15, 0.15, 0.15, 0.15, 0.15],
      stopAngles: [-2 * Math.PI - 0.8, -Math.PI - 0.71, -Math.PI - 0.5, -Math.PI + 0.46, -Math.PI + 0.71, -Math.PI + 0.88, -Math.PI + 0.97, -Math.PI + 1.05, -Math.PI + 1.1, -Math.PI + 1.15, -Math.PI + 1.19, -Math.PI + 1.3, -Math.PI + 1.3],
      colors: {
        0: this.p5.color(218, 170, 95),
        // 1: this.p5.color(0, 0, 0, 0),
        2: this.p5.color(205, 205, 205),
      }
    }

    this.sixBottom = {
      step: 0.02,
      angle: 0,
      stopAngle: 2 * Math.PI,
      o: { x: 250 - this.width / 4, y: 400 },
      angles: [0, 0, 0, 0.45, 0.75, 0.88, 0.99, 1.06, 1.12, 1.16, 1.2, 1.3, 1.3],
      stopAngles: [2 * Math.PI, 2 * Math.PI, 2 * Math.PI, Math.PI, Math.PI, Math.PI, Math.PI, Math.PI, Math.PI, Math.PI, Math.PI, Math.PI, Math.PI],
      colors: {
        0: this.p5.color(218, 170, 95),
        // 1: this.p5.color(0, 0, 0, 0),
        2: this.p5.color(205, 205, 205),
      }
    }

    this.eightBottom = {
      step: 0.02,
      angle: -0.8,
      stopAngle: Math.PI + 0.8,
      o: { x: 450 + this.width / 4, y: 400 },
      angles: [-0.8, -0.7, -0.5, -0.4, -0.32, -0.28, -0.25, -0.22, -0.15, -0.15, -0.15, -0.15, -0.15],
      stopAngles: [2 * Math.PI + 0.8, Math.PI + 0.71, Math.PI + 0.5, Math.PI - 0.46, Math.PI - 0.71, Math.PI - 0.88, Math.PI - 0.97, Math.PI - 1.05, Math.PI - 1.1, Math.PI - 1.15, Math.PI - 1.19, Math.PI - 1.3, Math.PI - 1.3],
      colors: {
        0: this.p5.color(218, 170, 95),
        // 1: this.p5.color(0, 0, 0, 0),
        2: this.p5.color(205, 205, 205),
      }
    }

    this.sixTopLine = {
      stepX: 0,
      stepY: 0.8,
      pos: [{x: this.sixTop.o.x - 2.5 * this.width, y: 300}, {x: this.sixTop.o.x - 2 * this.width, y: 300}, {x: this.sixTop.o.x - 1.5 * this.width, y: 300}, {x: this.sixTop.o.x - 3 * this.width, y: 300}, {x: this.sixTop.o.x - 3.5 * this.width, y: 300}, {x: this.sixTop.o.x - 4 * this.width, y: 300}, {x: this.sixTop.o.x - 4.5 * this.width, y: 300}],
      endPos: [{x: this.sixTop.o.x - 2.5 * this.width, y: 400}, {x: this.sixTop.o.x - 2 * this.width, y: 400}, {x: this.sixTop.o.x - 1.5 * this.width, y: 330}, {x: this.sixTop.o.x - 3 * this.width, y: 400}, {x: this.sixTop.o.x - 3.5 * this.width, y: 400}, {x: this.sixTop.o.x - 4 * this.width, y: 400}, {x: this.sixTop.o.x - 4.5 * this.width, y: 400}],
      colors: {
        // 2: this.p5.color(218, 170, 95),
        1: this.p5.color(205, 205, 205)
      }
    }
  }

  arc(x, y, r1, r2, a1, a2) {
    this.p5.arc(x, y, r1, r2, Math.min(a1, a2), Math.max(a1, a2))
  }

  multiArc(x, y, r1, r2, stripes, width, angles, stopAngles, step, colors) {
    let done = true
    const sgnStep = step / Math.abs(step)
    for (let i = 0; i < stripes; i++)
      if (sgnStep * angles[i] < sgnStep * stopAngles[i]) {
        if (colors[i]) {
          this.p5.push()
          this.p5.stroke(colors[i])
        }
        this.arc(x, y, r1 + i * width, r2 + i * width, angles[i] - 1.5 * step, angles[i])
        if (colors[i]) {
          this.p5.pop()
        }
        done = false
      }

    return done
  }

  drawCircles(conf) {
    let o = conf.o
    conf.angle += conf.step
    const sgnStep = conf.step / Math.abs(conf.step)
    for (let i = 0; i < conf.angles.length; i++) {
      conf.angles[i] += conf.step
    }
    return this.multiArc(o.x, o.y, 100, 100, 13, this.width, conf.angles, conf.stopAngles, conf.step, conf.colors)
  }

  drawCirclesSixTop(conf) {
    let done = this.drawCircles(conf)
    if (!done) return
    for (let i = 0; i < this.sixTopLine.pos.length; i++) {
      const pos = this.sixTopLine.pos[i]
      const endPos = this.sixTopLine.endPos[i]
      const stepX = this.sixTopLine.stepX
      const stepY = this.sixTopLine.stepY
      if (pos.x < endPos.x || pos.y < endPos.y) {

        if (this.sixTopLine.colors[i]) {
          this.p5.push()
          this.p5.stroke(this.sixTopLine.colors[i])
        }

        this.p5.line(pos.x - stepX * 2, pos.y - stepY * 2, pos.x, pos.y)
        pos.x += stepX
        pos.y += stepY

        if (this.sixTopLine.colors[i]) this.p5.pop()
      }
    }
  }

  noise(n) {
    this.p5.push()
    this.p5.blendMode(this.p5.DIFFERENCE)
    this.p5.stroke(250, 25, 250)
    this.p5.strokeWeight(1)
    for (let i = 0; i < n; i++) {
      let x = parseInt(Math.random() * 700)
      let y = parseInt(Math.random() * 700)
      this.p5.point(x, y)
    }
    this.p5.pop()
  }

  drawOne() {
    this.p5.noStroke()
    this.p5.fill(205, 50, 50)
    this.p5.circle(this.eightTop.o.x, this.eightTop.o.y, this.width - this.width * 0.125)
    this.p5.circle(this.eightBottom.o.x, this.eightBottom.o.y, this.width - this.width * 0.125)
    this.p5.circle(this.sixBottom.o.x, this.sixBottom.o.y, this.width - this.width * 0.125)


    this.p5.noFill()
    this.p5.strokeWeight(this.width / 4)
    this.p5.strokeCap(this.p5.ROUND)

    this.p5.stroke(205, 50, 50, 150)
    this.drawCircles(this.eightTop)
    this.drawCircles(this.eightBottom)

    this.drawCirclesSixTop(this.sixTop)
    this.drawCircles(this.sixBottom)    
  }

  draw() {
    const time = (this.p5.millis() / 500)
    if (time > 6) this.drawOne()
    this.noise(500 / time)
  }
}
