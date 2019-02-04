import React from 'react'
import Link from 'next/link'
import Style from '../static/styles/main.less'
import Head from '../components/Head'
import Sketch from '../components/Sketch'

export default class Index extends Sketch {
  setup() {
    let GRID_SIZE = this.GRID_SIZE = 20
    let mat = []
    let row = []

    this.grid = this.createMatrix(this.GRID_SIZE)
    this.originalGrid = this.createMatrix(this.GRID_SIZE)

    for (let i = 0; i < GRID_SIZE; i++) {
      for (let j = 0; j < GRID_SIZE; j++) {
        this.grid[i][j].x = i / GRID_SIZE * this.HEIGHT + Math.random() * 8 - 4 
        this.grid[i][j].y = j / GRID_SIZE * this.WIDTH + Math.random() * 8 - 4

        this.originalGrid[i][j].x = this.grid[i][j].x
        this.originalGrid[i][j].y = this.grid[i][j].y
      }
    }

    // console.log(this.grid)
  }

  createMatrix(GRID_SIZE) {
    let mat = []
    for (let i = 0; i < GRID_SIZE; i++) {
      mat.push([])
      for (let j = 0; j < GRID_SIZE; j++) {
        mat[i].push({ x: 0, y: 0 })
      }
    }
    return mat
  }

  draw() {
    const time = (this.p5.millis() / 1000)
    this.p5.clear()
    this.p5.background(205, 205, 205)
    this.p5.stroke(20, 20, 20, 128)
    this.p5.noFill()

    for (let i = 0; i < this.GRID_SIZE; i++) {
      for (let j = 0; j < this.GRID_SIZE; j++) {
        this.grid[i][j].x = this.originalGrid[i][j].x + Math.sin(time + Math.sqrt(j) * 6) * 6 * Math.log(time * (j + 1))// * Math.sin(Math.sqrt(time))
        this.grid[i][j].y = this.originalGrid[i][j].y + Math.cos(time + i) * 10 * Math.log(time * (i + 1))// * Math.sin(Math.sqrt(time))//60

        let midPoint, points
        if (i > 0 && j > 0) {
          midPoint = {
            x: (this.grid[i][j].x + this.grid[i - 1][j - 1].x + this.grid[i - 1][j].x + this.grid[i][j - 1].x) / 4,
            y: (this.grid[i][j].y + this.grid[i - 1][j - 1].y + this.grid[i - 1][j].y + this.grid[i][j - 1].y) / 4
          }

          this.p5.push()
          this.p5.stroke(128, 128, 128, Math.cos(j * i + time) * 64 + 32)
          this.p5.circle(this.grid[i][j].x, this.grid[i][j].y, 2)
          points = [
            {
              x: midPoint.x + (this.grid[i][j].x - midPoint.x) * 0.3,
              y: midPoint.y + (this.grid[i][j].y - midPoint.y) * 0.3,
            },
            {
              x: midPoint.x + (this.grid[i - 1][j].x - midPoint.x) * 0.3,
              y: midPoint.y + (this.grid[i - 1][j].y - midPoint.y) * 0.3,
            },
            {
              x: midPoint.x + (this.grid[i][j - 1].x - midPoint.x) * 0.3,
              y: midPoint.y + (this.grid[i][j - 1].y - midPoint.y) * 0.3,
            },
            {
              x: midPoint.x + (this.grid[i - 1][j - 1].x - midPoint.x) * 0.3,
              y: midPoint.y + (this.grid[i - 1][j - 1].y - midPoint.y) * 0.3,
            }
          ]

          if (j > 4 && j < this.GRID_SIZE - 3 && i > 4 && i < this.GRID_SIZE - 3) {
            this.p5.push()
            this.p5.fill(parseInt(184 - Math.cos(j * i + time) * 64 + 32), parseInt(196 - Math.cos(j * i + time) * 64 + 32), parseInt(64 + Math.cos(j * i + time) * 64 + 64), Math.cos(j * i + time) * 64 + 32)
            this.p5.quad(points[0].x, points[0].y, points[1].x, points[1].y, points[3].x, points[3].y, points[2].x, points[2].y)
            this.p5.pop()
          } else {
            this.p5.quad(points[0].x, points[0].y, points[1].x, points[1].y, points[3].x, points[3].y, points[2].x, points[2].y)
          }
          
          this.p5.pop()
        }

        if (j > 3 && j < this.GRID_SIZE - 3 && i > 3 && i < this.GRID_SIZE - 3) {
          if (j < this.GRID_SIZE - 4) {
            this.p5.push()
            this.p5.fill(128, 255, 128, 255)
            this.p5.beginShape()
            this.p5.curveVertex(this.grid[i + 1][j].x, this.grid[i + 1][j].y)
            this.p5.curveVertex(this.grid[i][j].x, this.grid[i][j].y)
            this.p5.curveVertex(this.grid[i][j + 1].x, this.grid[i][j + 1].y)
            this.p5.curveVertex(this.grid[i - 1][j + 1].x, this.grid[i + 3][j + 1].y)
            this.p5.endShape()
            this.p5.pop()
          }

          if (i < this.GRID_SIZE - 4) {
            this.p5.push()
            const r = parseInt(256 - (Math.sin(time + j) * 128 + 128))
            this.p5.fill(r + 10, r + 40, r + 20, 255 - 2 * j)
            this.p5.beginShape()
            this.p5.curveVertex(this.grid[i - 2][j].x, this.grid[i - 1][j].y)
            this.p5.curveVertex(this.grid[i][j].x + Math.sin(time + j) * 3, this.grid[i][j].y)
            this.p5.curveVertex(this.grid[i + 1][j].x, this.grid[i + 1][j].y)
            this.p5.curveVertex(this.grid[i - 1][j + 1].x, this.grid[i - 4][j + 1].y)
            this.p5.endShape()
            this.p5.pop()
          }
        } else if (i > 0 && j > 0) {
          this.p5.push()
          this.p5.stroke(128, 128, 128, Math.cos(j * i + time) * 64 + 32)
          this.p5.line(midPoint.x, midPoint.y + 10 * Math.sin(i + time), this.grid[i][j].x, this.grid[i][j].y)
          this.p5.line(midPoint.x, midPoint.y + 10 * Math.sin(i + time), this.grid[i - 1][j].x, this.grid[i - 1][j].y)
          this.p5.line(midPoint.x, midPoint.y + 10 * Math.sin(i + time), this.grid[i][j - 1].x, this.grid[i][j - 1].y)
          this.p5.line(midPoint.x, midPoint.y + 10 * Math.sin(i + time), this.grid[i - 1][j - 1].x, this.grid[i - 1][j - 1].y)
          this.p5.pop()
        }
      }
    }
  }
}
