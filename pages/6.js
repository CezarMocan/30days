import React from 'react'
import Link from 'next/link'
import Style from '../static/styles/main.less'
import Head from '../components/Head'
import Sketch from '../components/Sketch'

export default class Index extends Sketch {
  preload() {
    this.fontLydian = this.p5.loadFont('static/fonts/Lydian.ttf');
  }
  setup() {
    this.TEXT = 'Tilda'
    this.p5.textFont(this.fontLydian)
    this.targetPoints = this.fontLydian.textToPoints(this.TEXT, 100, 300, 300, { sampleFactor: 0.075, simplifyThreshold: 0 })
    // this.p5.shuffle(this.targetPoints, true)

    this.NO_POINTS = this.targetPoints.length
    this.p5.background(22)
    this.colors = { r: 185, g: 185, b: 185, a: 5 }

    this.points = []
    for (let i = 0; i < this.NO_POINTS; i++) {
      // this.points.push({ x: Math.random() * this.HEIGHT, y: Math.random() * this.WIDTH})
      this.points.push({ x: 450 + 200 * Math.cos(i / this.NO_POINTS * 2 * Math.PI), y: 650 + 10 * Math.sin(i / this.NO_POINTS * 2 * Math.PI)})
      this.targetPoints[i] = { x: 350, y: 100}
      this.points[i].distance = {
        x: this.targetPoints[i].x - this.points[i].x,
        y: this.targetPoints[i].y - this.points[i].y
      }
    }
  }

  // draw() {
  //   this.p5.noStroke()
  //   this.p5.fill(0)
  //   this.points.forEach(p => this.p5.circle(p.x, p.y, 1))
  // }
  getNearestIndex(p, excludeList, start) {
    let index = -1
    let dist = 1000000000

    for (let i = start + 1; i < this.points.length; i++) {
      if (excludeList.indexOf(i) > -1) continue
      const cD = this.p5.dist(this.points[i].x, this.points[i].y, p.x, p.y)
      if (cD < dist) {
        dist = cD
        index = i
      }
    }

    return index
  }

  draw() {
    const time = (this.p5.millis() / 1000)
    // if (time < 2) return
    // this.p5.background(22)

    this.p5.noStroke()
    this.p5.fill(this.colors.r, this.colors.g, this.colors.b, this.colors.a)

    const triangles = []

    for (let i = 0; i < this.points.length; i++) {
      this.p5.circle(this.points[i].x, this.points[i].y, 2)

      let n1 = this.getNearestIndex(this.points[i], [i], i)
      let n2 = this.getNearestIndex(this.points[i], [i, n1], i)
      let n3 = this.getNearestIndex(this.points[i], [i, n1, n2], i)

      triangles.push({ p1: this.points[i], p2: this.points[n1 == -1 ? i : n1], p3: this.points[n2 == -1 ? i : n2] })
      triangles.push({ p1: this.points[i], p2: this.points[n2 == -1 ? i : n2], p3: this.points[n3 == -1 ? i : n3] })
    }

    this.p5.noFill()
    this.p5.stroke(this.colors.r, this.colors.g, this.colors.b, this.colors.a)
    for (let i = 0; i < triangles.length; i++) {
      const t = triangles[i]
      this.p5.triangle(t.p1.x, t.p1.y, t.p2.x, t.p2.y, t.p3.x, t.p3.y)
    }

    this.points.forEach((p, index) => {
      // p.x += time / 11//Math.cos(time + index) / 0.3
      // p.y += time / 10//Math.sin(time + index) / 0.3

      if (Math.abs(p.x - this.targetPoints[index].x) > 5 && p.x > 50) p.x += p.distance.x / 240
      if (Math.abs(p.y - this.targetPoints[index].y) > 5 && p.x > 50) p.y += p.distance.y / 440


      this.targetPoints[index].x += Math.sin(time + 5) * Math.cos(time + 5.1) * 30
      this.targetPoints[index].y += Math.sin(time + 5.1) * Math.cos(time + 5.1) * 3
      this.targetPoints[index].y -= 0.5

      p.distance = {
        x: this.targetPoints[index].x - p.x,
        y: this.targetPoints[index].y - p.y
      }

    })

    // this.p5.translate(0, -1)

    // this.colors.g = (this.colors.g + Math.sin(time) + 1) % 256
    // this.colors.b = (this.colors.b + 1) % 256
    // this.colors.r = (this.colors.r + Math.cos(time) + 0.5) % 256

    // if (this.points.length < 100)
    //   this.points.push({ x: 350 + 200 * Math.cos(Math.random() * 2 * Math.PI), y: 350 + 200 * Math.sin(Math.random() * 2 * Math.PI)})
    // else {
    //   this.points = this.points.slice(50)
    // }
  }
}
