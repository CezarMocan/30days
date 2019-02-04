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
      arr: [{ x: 350, y: 350 }],
      params: {
        xMult: 60,
        yMult: 48,
        next: [(time) => 0],
        sizeLimit: 4,
      }
    }

    const curve2 = {
      arr: [{ x: 350, y: 0 }],
      params: {
        xMult: 8,
        yMult: 20,
        next: [time => parseInt(Math.sin(time) * 2 + 2), time => parseInt(Math.cos(time) * 2 + 2)],
        sizeLimit: 5,
        target: { x: 350, y: 350, sgn: 1 }
      }
    }

    for (let i = 0; i < 19; i++) {
      this.curves.push({
        arr: [{ x: 40 * i, y: 0 }],
        params: {
          xMult: 8,
          yMult: 20,
          next: [time => parseInt(Math.sin(time) * 2 + 2), time => parseInt(Math.cos(time) * 2 + 2)],
          sizeLimit: 5,
          target: { x: 40 * i, y: 350, sgn: 1 }
        }        
      })
    }

    for (let i = 0; i < 19; i++) {
      this.curves.push({
        arr: [{ x: 40 * i, y: 750 }],
        params: {
          xMult: 8,
          yMult: 20,
          next: [time => parseInt(Math.sin(time) * 2 + 2), time => parseInt(Math.cos(time) * 2 + 2)],
          sizeLimit: 5,
          target: { x: 40 * i, y: 450, sgn: 1 }
        }        
      })
    }

    for (let i = 0; i < 19; i++) {
      this.curves.push({
        arr: [{ y: 40 * i, x: 0 }],
        params: {
          xMult: 20,
          yMult: 8,
          next: [time => parseInt(Math.sin(time) * 2 + 2), time => parseInt(Math.cos(time) * 2 + 2)],
          sizeLimit: 5,
          target: { y: 40 * i, x: 700, sgn: 1 }
        }        
      })
    }


    // this.curves.push(curve2)

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
      x: 0,
      y: 0,
      sgn: 1
    }

    this.lastTimeAdded = -1

    this.p5.noFill()
  }

  draw() {
    const time = (this.p5.millis() / 1000)
    if (time < 2) return
    if (Math.random() < 0.1) {
      this.p5.clear()
      this.p5.background(20)
    }

    if (parseInt(time) % 4 == 0 && parseInt(this.lastTimeAdded) != parseInt(time)) {
      console.log('adding: ', time, parseInt(time), this.lastTimeAdded, parseInt(this.lastTimeAdded))
      this.lastTimeAdded = time
      for (let i = 0; i < 19; i++) {
        this.curves.shift()
        this.curves.push({
          arr: [{ y: 40 * i, x: 0 }],
          params: {
            xMult: 20,
            yMult: 8,
            next: [time => parseInt(Math.sin(time) * 2 + 2), time => parseInt(Math.cos(time) * 2 + 2)],
            sizeLimit: 5,
            target: { y: 40 * i, x: 700, sgn: 1 }
          }        
        })
      }

      for (let i = 0; i < 19; i++) {
        this.curves.shift()
        this.curves.push({
          arr: [{ x: 40 * i, y: 0 }],
          params: {
            xMult: 8,
            yMult: 20,
            next: [time => parseInt(Math.sin(time) * 2 + 2), time => parseInt(Math.cos(time) * 2 + 2)],
            sizeLimit: 5,
            target: { x: 40 * i, y: 450, sgn: 1 }
          }        
        })
      }
    }

    this.curves.forEach((c, index) => {
      let last = c.arr[c.arr.length - 1]      
      let newCurve = Object.assign({}, last)
      // newCurve.x = newCurve.x + Math.sin(time) * time / 15
      // newCurve.y = newCurve.y + Math.cos(time) * time / 15
      const dX = c.params.target.x - newCurve.x + 0.001
      const dY = c.params.target.y - newCurve.y + 0.001

      // console.log(dX, dY, this.target, newCurve)

      if (Math.abs(dX) < 20 && Math.abs(dY) < 20) {
        c.params.target.y += 2 * Math.sin(time) + 1
        c.params.target.x -= 2 * Math.cos(time) + 1
      }

      newCurve.x += dX / Math.abs(dX) * 15 * Math.random()
      newCurve.y += dY / Math.abs(dY) * 5 * Math.random()
      newCurve.start = time

      c.arr.push(newCurve)

      // this.p5.stroke(parseInt(100 * Math.sin(time) + 100), parseInt(100 * Math.cos(time) + 100), parseInt(100 * Math.sin(time) * Math.cos(time) + 100), 20)
      // this.p5.stroke(parseInt(100 * Math.sin(time) + 100), parseInt(100 * Math.cos(time) + 100), parseInt(100 * Math.sin(time) * Math.cos(time) + 100), 200)
      this.p5.stroke(250, 250, 250, 128)
      this.p5.beginShape()
      c.arr.forEach(curve => {
        this.p5.curveVertex(curve.x, curve.y)
        if (!curve.start) curve.start = time
        if (time - curve.start > Math.PI) return
        // curve.x += 0.4 * Math.random() * Math.sin(time)
        // curve.y += 0.2 * Math.cos(time)
      })
      this.p5.endShape()
      if (c.arr.length > 80) c.arr.shift()
      // if (c.arr.length > c.params.sizeLimit) c.arr = c.params.next.map(fn => c.arr[fn(time)])      
    })

    this.p5.push()
    this.p5.stroke(10, 10, 10, 255)
    this.p5.strokeWeight(5)
    for (let i = 0; i < 0; i++) {
      this.p5.line(0, Math.random() * 700, 700, Math.random() * 700)
    }
    this.p5.pop()
  }
}
