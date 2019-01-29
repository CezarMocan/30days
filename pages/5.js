import React from 'react'
import Link from 'next/link'
import Style from '../static/styles/main.less'
import Head from '../components/Head'
import Sketch from '../components/Sketch'

export default class Index extends Sketch {
  setup() {
    this.NO_POINTS = 1
    this.p5.background(22)
    this.points = []
    for (let i = 0; i < this.NO_POINTS; i++)
      this.points.push({ x: Math.random() * this.HEIGHT, y: Math.random() * this.WIDTH})
      // this.points.push({ x: 350 + 200 * Math.cos(i / this.NO_POINTS * 2 * Math.PI), y: 350 + 200 * Math.sin(i / this.NO_POINTS * 2 * Math.PI)})

    // this.p5.blendMode(this.p5.ADD)
    this.colors = {
      r: 185,
      g: 185,
      b: 185,
      a: 5
    }
  }

  getNearestIndex(p, excludeList) {
    let index = 0
    let dist = 1000000000

    for (let i = 0; i < this.points.length; i++) {
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
    if (time < 2) return
    // this.p5.background(22)

    this.p5.noStroke()
    this.p5.fill(this.colors.r, this.colors.g, this.colors.b, this.colors.a)

    const triangles = []

    for (let i = 0; i < this.points.length; i++) {
      this.p5.circle(this.points[i].x, this.points[i].y, 2)

      let n1 = this.getNearestIndex(this.points[i], [i])
      let n2 = this.getNearestIndex(this.points[i], [i, n1])
      let n3 = this.getNearestIndex(this.points[i], [i, n1, n2])

      triangles.push({ p1: this.points[i], p2: this.points[n1], p3: this.points[n2] })
      triangles.push({ p1: this.points[i], p2: this.points[n2], p3: this.points[n3] })
    }

    this.p5.noFill()
    this.p5.stroke(this.colors.r, this.colors.g, this.colors.b, this.colors.a)
    for (let i = 0; i < triangles.length; i++) {
      const t = triangles[i]
      this.p5.triangle(t.p1.x, t.p1.y, t.p2.x, t.p2.y, t.p3.x, t.p3.y)
    }

    this.points.forEach((p, index) => {
      p.x += Math.sin(time + index * 2) * 1//* Math.sin(p.x / 100 * index) * 10 //* Math.random() * 2
      p.y += Math.cos(time + index) * 1
    })

    this.colors.g = (this.colors.g + Math.sin(time) + 1) % 256
    this.colors.b = (this.colors.b + 1) % 256
    // this.colors.r = (this.colors.r + Math.cos(time) + 0.5) % 256

    if (this.points.length < 100)
      // this.points.push({x: Math.random() * 750, y: Math.random() * 750})
      this.points.push({ x: 350 + 200 * Math.cos(Math.random() * 2 * Math.PI), y: 350 + 200 * Math.sin(Math.random() * 2 * Math.PI)})
    else {
      this.points = this.points.slice(50)
      // this.triangles = 
    }
  }
}
