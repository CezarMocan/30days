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
    this.charCounter = 0
    this.chars = ['9', '8', '7', '6', '5', '4', '3', '2', '1', '*']
    this.p5.textFont(this.fontLydian)
    this.p5.background(22)
    this.p5.blendMode(this.p5.SCREEN)

    this.yPosition = 350
    this.refreshPoints(this.yPosition)
  }

  refreshPoints(startY) {
    if (this.targetPoints) {
      // this.points = this.targetPoints.slice(0)
    }
    else {
      this.points = this.fontLydian.textToPoints(this.chars[this.charCounter], 175, 650, 850, { sampleFactor: 0.25, simplifyThreshold: 0 })
      this.p5.shuffle(this.points, true)
    }
    this.targetPoints = this.fontLydian.textToPoints(this.chars[this.charCounter + 1], 175, 650, 850, { sampleFactor: 0.25, simplifyThreshold: 0 })
    this.p5.shuffle(this.targetPoints, true)

    this.NO_POINTS = this.targetPoints.length
    this.colors = { r: 185, g: 185, b: 185, a: 25 }

    for (let i = 0; i < this.points.length; i++) {
      // this.points[i] = { x: 350, y: 350}
      this.points[i].distance = {
        x: this.targetPoints[i % this.NO_POINTS].x - this.points[i].x,
        y: this.targetPoints[i % this.NO_POINTS].y - this.points[i].y
      }
    }
  }

  getNearestIndex(p, excludeList, start, limit) {
    let index = -1
    let dist = 1000000000

    limit = limit || this.points.length

    for (let i = start + 1; i < this.points.length && i < start + limit; i++) {
      if (excludeList.indexOf(i) > -1) continue
      const cD = this.p5.dist(this.points[i].x, this.points[i].y, p.x, p.y)
      if (cD < dist) {
        dist = cD
        index = i
      }
    }

    return index
  }

  inInterval(x, i) {
    if (i.x1 < i.x2) return x >= i.x1 && x <= i.x2
    return x >= i.x1 || x <= i.x2 - i.size
  }

  draw() {
    const time = (this.p5.millis() / 1000)
    this.p5.noStroke()
    this.p5.fill(this.colors.r, this.colors.g, this.colors.b, this.colors.a)
    this.p5.clear()
    this.p5.background(22)

    if (this.done) {
      if (this.charCounter + 2 < this.chars.length) {
        this.charCounter = (this.charCounter + 1)
        this.refreshPoints(this.charCounter)
        this.done = false
      }
    }

    const triangles = []

    for (let i = 0; i < this.points.length; i++) {
      this.p5.circle(this.points[i].x, this.points[i].y, 1)

      let n1 = this.getNearestIndex(this.points[i], [i], i, 30)
      let n2 = this.getNearestIndex(this.points[i], [i, n1], i, 30)
      let n3 = this.getNearestIndex(this.points[i], [i, n1, n2], i, 10)

      triangles.push({ p1: this.points[i], p2: this.points[n1 == -1 ? i : n1], p3: this.points[n2 == -1 ? i : n2] })
      triangles.push({ p1: this.points[i], p2: this.points[n2 == -1 ? i : n2], p3: this.points[n3 == -1 ? i : n3] })
    }

    this.p5.noFill()
    this.p5.stroke(this.colors.r, this.colors.g, this.colors.b, this.colors.a)
    for (let i = 0; i < triangles.length; i++) {
      const t = triangles[i]
      this.p5.triangle(t.p1.x, t.p1.y, t.p2.x, t.p2.y, t.p3.x, t.p3.y)
    }

    if (time < 2) return
    let done = true
    this.points.forEach((p, index) => {
      const interval = { size: 450, offset: -100, width: 450 }
      interval.x1 = Math.cos(time * 5) * interval.size / 2 + interval.size / 2 + interval.offset
      interval.x2 = (interval.x1 + interval.width)

      if (Math.abs(p.x - this.targetPoints[index % this.NO_POINTS].x) > 5 && this.inInterval(p.x, interval)) {
        done = false    
        p.x += p.distance.x / 10
      }
      if (Math.abs(p.y - this.targetPoints[index % this.NO_POINTS].y) > 5 && this.inInterval(p.x, interval)) {
        done = false
        p.y += p.distance.y / 10
      }
    })

    this.done = done
  }
}
