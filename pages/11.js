import React from 'react'
import Link from 'next/link'
import Style from '../static/styles/main.less'
import Head from '../components/Head'
import Sketch from '../components/Sketch'

export default class Index extends Sketch {
  setup() {
    this.curves = []

    this.curve = []
    this.curve.push({ x: 350, y: 150 })

    this.curve2 = []
    this.curve2.push({ x: 0, y: 0 })

    this.p5.background(10, 10, 10)

    const curve1 = {
      arr: [{ x: 0, y: 0 }],
      params: {
        xMult: 60,
        yMult: 48,
        next: [(time) => 0],
        sizeLimit: 4,
      }
    }

    const curve2 = {
      arr: [{ x: 0, y: 0 }],
      params: {
        xMult: 2,
        yMult: 2,
        next: [time => parseInt(Math.sin(time) * 2 + 2), time => parseInt(Math.cos(time) * 2 + 2)],
        sizeLimit: 5
      }
    }

    this.curves.push(curve2, curve1, curve2, curve1)

    this.TOTAL = 0
    for (let i = 0; i < this.TOTAL; i++) {
      this.curves.push({
        arr: [{ x: Math.cos(i / this.TOTAL * 2 * Math.PI) * 300, y: Math.sin(i / this.TOTAL * 2 * Math.PI) * 300}],
        params: {
          xMult: Math.random() * 30 + 10,
          yMult: Math.random() * 30 + 10,
          sizeLimit: parseInt(Math.random() * 3) + 4,
          next: [time => 2, time => 3, time => 4]
        }
      })
    }

    this.target = {
      x: 700,
      y: 700,
      sgn: 1
    }

    this.p5.noFill()
  }

  draw() {
    const time = (this.p5.millis() / 2000)

    this.curves.forEach(c => {
      let last = c.arr[c.arr.length - 1]      
      let newCurve = Object.assign({}, last)
      // newCurve.x = newCurve.x + Math.sin(time) * time / 15
      // newCurve.y = newCurve.y + Math.cos(time) * time / 15
      const dX = this.target.x - newCurve.x
      const dY = this.target.y - newCurve.y

      // console.log(dX, dY, this.target, newCurve)

      if (Math.abs(dX) < 20 && Math.abs(dY) < 20) {
        const angle = time / 10 * 2 * Math.PI
        this.target = {
          x: Math.cos(angle) * 50 * Math.sqrt(time) + 350,
          y: Math.sin(angle) * 50 * Math.sqrt(time) + 350,
          sgn: this.target.sgn
        }

        if (this.target.x > 700 || this.target.x < 0) {
          let ppp = Math.random() < 0.5
          this.target = {
            x: this.target.sgn == 1 ? 700 : 0,
            y: this.target.y + 100,
            sgn: -this.target.sgn
          }
        }

        this.p5.circle(this.target.x, this.target.y, 10)

        // console.log(this.target)
      }

      newCurve.x += dX / Math.abs(dX) * (Math.random() + 1) //* Math.abs(Math.sin(time)) //+ Math.cos(time) * 5 + 5
      newCurve.y += dY / Math.abs(dY) * (Math.random() + 1) //* Math.abs(Math.cos(time)) //+ Math.sin(time) * 5 + 5
      newCurve.start = time

      c.arr.push(newCurve)

      // this.p5.stroke(parseInt(100 * Math.sin(time) + 100), parseInt(100 * Math.cos(time) + 100), parseInt(100 * Math.sin(time) * Math.cos(time) + 100), 20)
      this.p5.stroke(parseInt(100 * Math.sin(time) + 100), parseInt(100 * Math.cos(time) + 100), parseInt(100 * Math.sin(time) * Math.cos(time) + 100), 20)
      this.p5.beginShape()
      c.arr.forEach(curve => {
        this.p5.curveVertex(curve.x, curve.y)
        if (!curve.start) curve.start = time
        if (time - curve.start > Math.PI) return
        curve.x += 0.4 * Math.random() * Math.sin(time)
        curve.y += 0.2 * Math.cos(time)
      })
      this.p5.endShape()
      // if (c.arr.length > c.params.sizeLimit) c.arr = c.params.next.map(fn => c.arr[fn(time)])      
    })

    this.p5.push()
    this.p5.stroke(10, 10, 10, 16)
    for (let i = 0; i < 10; i++) {
      this.p5.line(0, Math.random() * 700, 700, Math.random() * 700)
    }
    this.p5.pop()
  }
}
