import React from 'react'
import Link from 'next/link'
import Style from '../static/styles/main.less'
import Head from '../components/Head'
import Sketch from '../components/Sketch'

export default class Index extends Sketch {
  setup() {
    // this.p5.blendMode(this.p5.DIFFERENCE)
    this.p5.noStroke()
    this.p5.fill(250, 250, 250)
    this.b1 = [
      { x: 50, y: 50 },
      { x: 50, y: 350 },
      { x: 650, y: 50 },
      { x: 600, y: 600 }
    ]

    this.NO_BEZIERS = 500
    this.beziers = []
    for (let i = 0; i < this.NO_BEZIERS; i++) {
      this.beziers.push({
        a: [ { x: 50, y: 50 },
        { x: 50 + Math.random() * 100 - 50, y: 350 + Math.random() * 100 - 50},
        { x: 650 + Math.random() * 100 - 50, y: 50 + Math.random() * 100 - 50 },
        { x: 900, y: 900 }],
        div: 1.9
      })
    }

    this.NO_BEZIERS = 20
    for (let i = 0; i < this.NO_BEZIERS; i++) {
      this.beziers.push({
        a: [{ x: 150, y: 35 },
        { x: 50 + Math.random() * 100 - 50, y: 350 + Math.random() * 100 - 50},
        { x: 650 + Math.random() * 100 - 50, y: 50 + Math.random() * 100 - 50 },
        // { x: 600 + Math.random() * 100 - 50, y: 600 + Math.random() * 100 - 50 }]
        { x: 900, y: 900 }],
        div: 1.6
      })
    }

    this.NO_BEZIERS = 20
    for (let i = 0; i < this.NO_BEZIERS; i++) {
      this.beziers.push({
        a: [
          { x: 50, y: 175 },
          { x: 250 + Math.random() * 100 - 50, y: 350 + Math.random() * 100 - 50},
          { x: 650 + Math.random() * 100 - 50, y: 50 + Math.random() * 100 - 50 },
          // { x: 600 + Math.random() * 100 - 50, y: 600 + Math.random() * 100 - 50 }]
          { x: 900, y: 900 }
        ],
        div: 6,
        alpha: 16
      })
    }

    this.NO_BEZIERS = 0
    for (let i = 0; i < this.NO_BEZIERS; i++) {
      this.beziers.push({
        a: [
          { x: 155, y: 240 },
          { x: 50 + Math.random() * 100 - 50, y: 350 + Math.random() * 100 - 50},
          { x: 650 + Math.random() * 100 - 50, y: 50 + Math.random() * 100 - 50 },
          // { x: 600 + Math.random() * 100 - 50, y: 600 + Math.random() * 100 - 50 }]
          { x: 900, y: 900 }
        ],
        div: 1.55,
        alpha: 32
      })
    }

    this.NO_BEZIERS = 20
    for (let i = 0; i < this.NO_BEZIERS; i++) {
      this.beziers.push({
        a: [
          { x: 100, y: 255 },
          { x: 200 + Math.random() * 100 - 50, y: 350 + Math.random() * 100 - 50},
          { x: 650 + Math.random() * 100 - 50, y: 50 + Math.random() * 100 - 50 },
          // { x: 600 + Math.random() * 100 - 50, y: 600 + Math.random() * 100 - 50 }]
          { x: 900, y: 900 }
        ],
        div: 6,
        alpha: 64
      })
    }

    this.NO_BEZIERS = 50
    for (let i = 0; i < this.NO_BEZIERS; i++) {
      this.beziers.push({
        a: [{ x: 50, y: 450 },
        { x: 50 + Math.random() * 100 - 50, y: 350 + Math.random() * 100 - 50},
        { x: 650 + Math.random() * 100 - 50, y: 50 + Math.random() * 100 - 50 },
        { x: 900, y: 900 }],
        div: 1.8
      })
    }

    this.NO_BEZIERS = 20
    for (let i = 0; i < this.NO_BEZIERS; i++) {
      this.beziers.push({
        a: [{ x: 150, y: 500 },
        { x: 50 + Math.random() * 100 - 50, y: 350 + Math.random() * 100 - 50},
        { x: 650 + Math.random() * 100 - 50, y: 50 + Math.random() * 100 - 50 },
        { x: 900, y: 900 }],
        div: 1,
        alpha: 16
      })
    }

    this.NO_BEZIERS = 20
    for (let i = 0; i < this.NO_BEZIERS; i++) {
      this.beziers.push({
        a: [{ x: 450, y: 500 },
        { x: 50 + Math.random() * 100 - 50, y: 350 + Math.random() * 100 - 50},
        { x: 650 + Math.random() * 100 - 50, y: 50 + Math.random() * 100 - 50 },
        { x: 900, y: 900 }],
        div: 1,
        alpha: 16
      })
    }

// ***************************************** \\

    this.NO_BEZIERS = 0
    for (let i = 0; i < this.NO_BEZIERS; i++) {
      this.beziers.push({
        a: [
          { x: 750 - 175 - 500, y: 250 },
          { x: 750 - 650 - 300 + Math.random() * 100 - 50, y: 350 + Math.random() * 100 - 50},
          { x: 750 - 650 - 500 + Math.random() * 100 - 50, y: 50 + Math.random() * 100 - 50 },
          // { x: 600 + Math.random() * 100 - 50, y: 600 + Math.random() * 100 - 50 }]
          { x: -900, y: 900 }
        ],
        div: 1.5,
        alpha: 8
      })
    }

    this.index = 0

    // this.p5.translate(600, 0)
  }

  draw() {
    const time = (this.p5.millis() / 1000)
    this.p5.clear()
    this.p5.background(40)
    this.p5.noFill()
    this.p5.stroke(230, 230, 230, 64)
    this.p5.strokeWeight(1)

    // this.index = (this.index + 1) % this.beziers.length
    // const b = this.beziers[this.index]
    // const i = this.index
    this.beziers.forEach((bFull, i) => {
      const b = bFull.a
      const div = bFull.div
      const alpha = bFull.alpha
      this.p5.stroke(230, 230, 230, alpha || 32)
      this.p5.bezier(b[0].x, b[0].y, b[1].x, b[1].y, b[2].x, b[2].y, b[3].x, b[3].y)

      // this.p5.circle(b[1].x, b[1].y, 5)
      // this.p5.circle(b[2].x, b[2].y, 5)

      b[0].x = Math.min(Math.cos(time + i * 2) * Math.cos(time / 10) * i * 3, 750)
      b[0].y = Math.sin(time + i * 3) * Math.sin(time / 7) * i / 2

      b[1].x += Math.cos(time * 1.3 + i) / div
      b[1].y += Math.sin(time * 0.8 + i + 1) / div

      b[2].x += Math.cos(time * 1.1 + i * 2) / div
      b[2].y += Math.sin(time * 1.2 + i / 2) / div

      b[3].x = Math.cos(time + i * 2) * 125 * Math.sin(time) * Math.cos(time) + 350
      b[3].y = Math.sin(time + i) * 105 * Math.sin(time / 2.2) * Math.cos(2 * time) + 450

      // console.log(i, div)

      // b[3].x ++//-= Math.cos(time * 1.4)
      // b[3].y ++//+= Math.sin(time * 1.35)      
    })

  }
}