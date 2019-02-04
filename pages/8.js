import React from 'react'
import Link from 'next/link'
import Style from '../static/styles/main.less'
import Head from '../components/Head'
import Sketch from '../components/Sketch'

let UID = 0

class Shape {
  constructor(p5, x, y, r, noShapes) {
    this.p5 = p5
    this.x = x
    this.y = y
    this.r = r
    this.noShapes = noShapes
    this.uid = ++UID

    this.circles = []
    this.shapes = []

    const rg = Math.random() * 5 + 15
    // const rg = 20

    for (let i = 0; i <= noShapes; i++) {
      this.circles.push({
        x: this.x,
        y: this.y,
        r: Math.random() * this.r / 2 + this.r / 2,//(i + 1) / noShapes * this.r
        rg: rg
      })
    }

    this.p5.shuffle(this.circles, true)

    for (let i = 0; i < noShapes; i++) {
      this.shapes.push({
        x: this.circles[i].x,
        y: this.circles[i].y,
        r1: this.circles[i].r,
        r2: this.circles[i].r + this.circles[i].rg,
        angle: i * 2 * Math.PI / this.noShapes,
        radialWidth: Math.PI / this.noShapes / 16
      })
    }
  }
  generateShape({ x, y, r1, r2, angle, radialWidth }) {
    return [
      {
        x: x,
        y: y
      },
      {
        x: x + Math.cos(angle - radialWidth / 2) * r1,
        y: y + Math.sin(angle - radialWidth / 2) * r1
      },
      {
        x: x + Math.cos(angle) * r2,
        y: y + Math.sin(angle) * r2
      },
      {
        x: x + Math.cos(angle + radialWidth / 2) * r1,
        y: y + Math.sin(angle + radialWidth / 2) * r1
      }
    ]
  }
  updateCircles(time) {
    // this.circles.forEach((c, i) => {
      // c.x = this.x + Math.sin(time + i) * 5
      // c.y = this.y + Math.cos(time + i + 0.1) * 5
      // c.r += Math.sin(time + i * 3) * 0.1//Math.sin(time * i) * Math.cos(i - time) * 1
    // })
  }
  updateShapes(time) {
    this.shapes.forEach((s, i) => {
      // this.circles[i].rg += Math.tan(Math.random() - 0.5) * 2
      s.x = this.circles[i].x
      s.y = this.circles[i].y
      s.r1 = this.circles[i].r
      s.r2 = this.circles[i].r + this.circles[i].rg
      // s.angle += Math.abs(0.01 * Math.sin(time + i))
      s.radialWidth = Math.sin(time + i) / 2
    })
  }
  update(time) {
    this.updateCircles(time)
    this.updateShapes(time)
  }
  draw(time) {

    for (let i = 0; i < this.noShapes; i++) {
      let points = this.generateShape(this.shapes[i])
      this.shapes[i].points = points
      // const g = 185 + this.circles[i].r / this.r * 50
      const g = 190 + 20 * Math.sin(time + Math.random() / 10 + this.uid) + Math.abs(this.shapes[i].radialWidth / (1/2)) * 25 + this.circles[i].r / this.r * 25 + this.uid

      this.p5.noStroke()
      this.p5.fill(g - 10, g, 160 + 81)
      this.p5.beginShape()
      points.forEach(p => this.p5.vertex(p.x, p.y))
      this.p5.endShape(this.p5.CLOSE)
    }

    this.p5.push()
    this.p5.fill(250, 250, 120, 40)
    // this.p5.blendMode(this.p5.SCREEN)
    this.p5.circle(this.x, this.y, 5)
    this.p5.circle(this.x, this.y, 4)
    this.p5.circle(this.x, this.y, 3)
    this.p5.circle(this.x, this.y, 2)
    this.p5.circle(this.x, this.y, 1)
    this.p5.circle(this.x, this.y, 1)
    this.p5.circle(this.x, this.y, 1)
    // this.p5.circle(this.x, this.y, 1)
    // this.p5.circle(this.x, this.y, 1)
    // this.p5.circle(this.x, this.y, 1)
    this.p5.pop()

    this.p5.noFill()
    this.p5.stroke(255)
    for (let i = 0; i < this.noShapes; i++) {
      // let p = this.shapes[i].points
      // let q = this.shapes[(i + 1) % this.noShapes].points
      // this.p5.line(p[1].x, p[1].y, q[1].x, q[1].y)
      // this.p5.line(p[3].x, p[3].y, q[3].x, q[3].y)
      // this.p5.line(p[2].x, p[2].y, q[2].x, q[2].y)
    }

  }
}

export default class Index extends Sketch {
  setup() {
    // this.p5.blendMode(this.p5.DIFFERENCE)
    this.RADIUS = 60
    this.shapes = []
    for (let i = this.RADIUS + 20; i < this.WIDTH + this.RADIUS; i += 3 * this.RADIUS) {
      for (let j = this.RADIUS + 20; j < this.HEIGHT + this.RADIUS; j += 3 * this.RADIUS) {
        this.shapes.push(new Shape(this.p5, i, j, this.RADIUS, 64))
      }
    }
    // this.shapes = [new Shape(this.p5, 350, 350, 25, 32)]
    this.p5.fill(250)
    this.p5.noStroke()
    // this.p5.background(250, 220, 230)
    this.p5.background(10, 20, 30)
  }

  draw() {
    const time = (this.p5.millis() / 1000)
    this.p5.clear()
    this.p5.background(240, 240, 240)
    this.p5.noStroke()

    this.shapes.forEach(s => {
      s.update(time)
      s.draw(time)
    })

    // if (time < 3) return

    this.p5.push()
    this.p5.blendMode(this.p5.DIFFERENCE)
    this.p5.fill(35, 35, 0)
    this.p5.rect(0, 0, 700, 700)
    // this.p5.rect(Math.sin(time) * 350 + 350 + Math.random() * 8, Math.cos(time) * 350 + 350 + Math.random() * 10, 250 + Math.random() * 10, 250 + Math.random() * 10)

    // this.p5.fill(255, 255, 0)
    // this.p5.rect(Math.cos(time + 1) * 350 + 350 + Math.random() * time, Math.sin(time - 1) * 350 + 350 + Math.random() * 10, 350 + Math.random() * 10, 350 + Math.random() * 10)

    // this.p5.fill(255, 255, 255)
    // this.p5.rect(Math.sin(time + 2) * 250 + 350 + Math.random() * time * 2, Math.sin(time + 3) * 350 + 350 + Math.random() * 20, 350 + Math.random() * 15, 350 + Math.random() * 6)

    this.p5.pop()
  }
}
