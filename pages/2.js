import React from 'react'
import Link from 'next/link'
import Style from '../static/styles/main.less'
import Head from '../components/Head'
import Sketch from '../components/Sketch'

export default class Index extends Sketch {
  setup() {
    this.tree = [
      {
        p: {
          x: this.WIDTH / 2,
          y: this.HEIGHT / 2
        },
        direction: {
          x: -1,
          y: -1
        },
        steps: 0
      }
    ]

    this.p5.background(25, 25, 25)
    this.p5.stroke(this.p5.color(205, 205, 205, 32))

    this.SPLIT_STEPS = 12
    this.MAX_ARRAY_LEN = 1024
    this.RANDOMIZE_REGENERATION = false
    this.scale = 1
  }

  inBounds(p) {
    return true
    if (p.x < 0) return false
    if (p.x >= this.HEIGHT) return false
    if (p.y < 0) return false
    if (p.y >= this.WIDTH) return false
    return true
  }

  rotate(d, a) {
    return {
      x: d.x * Math.cos(a) - d.y * Math.sin(a),
      y: d.y * Math.cos(a) + d.x * Math.sin(a)
    }
  }

  rotateLeft(d) {
    return this.rotate(d, Math.PI / 6)
  }

  rotateRight(d) {
    return this.rotate(d, -Math.PI / -9)
  }

  step(time) {
    let b = this.p5.map(Math.abs(Math.sin(time) * Math.cos(time)), -1, 1, 5, 145) + time * 10
    let newTree = []
    this.SPLIT_STEPS += 2 / 60
    if (Math.random() < 0.5) 
      this.p5.stroke(this.p5.color(215, 5, b + 15, 32))
    else 
      this.p5.stroke(this.p5.color(b + 55, b + 45, 10, 16))

    for (let i = 0; i < this.tree.length; i++) {
      const curr = this.tree[i]

      this.p5.point(curr.p.x, curr.p.y)
      curr.steps++

      if (curr.steps > this.SPLIT_STEPS) {
        const new1 = JSON.parse(JSON.stringify(curr))
        const new2 = JSON.parse(JSON.stringify(curr))

        new1.direction = this.rotateLeft(curr.direction)
        new2.direction = this.rotateRight(curr.direction)
        new1.steps = 0
        new2.steps = 0

        newTree.push(new1)
        newTree.push(new2)
      } else {
        curr.p.x += curr.direction.x
        curr.p.y += curr.direction.y
        if (this.inBounds(curr.p)) newTree.push(curr)
      }
    }

    if (newTree.length > this.MAX_ARRAY_LEN) {
      const buf = this.RANDOMIZE_REGENERATION ? parseInt(Math.random() * (newTree.length - this.MAX_ARRAY_LEN)) : 0
      const slStart = newTree.length - this.MAX_ARRAY_LEN - buf
      newTree = newTree.slice(slStart, newTree.length - buf - 1)
    }
    this.tree = newTree
  }

  draw() {
    this.scale = 0.5
    const time = (this.p5.millis() / 1000)
    this.p5.scale(this.scale)
    this.p5.translate(this.WIDTH / 2, this.HEIGHT / 2)
    let b = this.p5.map(Math.abs(Math.sin(time) * Math.cos(time)), 0, 1, 5, 45) + time * 10
    let r = 225
    this.p5.noFill()
    this.step(time)
    this.step(time)
    this.step(time)
    this.step(time)
  }
}
