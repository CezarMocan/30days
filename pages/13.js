import React from 'react'
import Link from 'next/link'
import Style from '../static/styles/main.less'
import Head from '../components/Head'
import Sketch from '../components/Sketch'

export default class Index extends Sketch {
  setup() {
    this.x = 350
    this.y = 700
    this.currentangle = -90; // which way the turtle is pointing
    this.step = 5; // how much the turtle moves with each 'F'
    this.angle = 25; // how much the turtle turns with a '-' or '+'

    // LINDENMAYER STUFF (L-SYSTEMS)
    this.thestring = '[[A][B]]'; // "axiom" or start of the string
    this.numloops = 7; // how many iterations to pre-compute
    this.therules = []; // array for rules
    // this.therules[0] = ['A', '-BF+[[FF-A-F]+AFA+FB]-FFF+B'];
    this.therules[0] = ['A', 'F+[[A]-A]-F[-[F]A][+B]'];
    this.therules[1] = ['B', 'F-[[B]+B]+F[+[F]B]-A'];
    this.therules[2] = ['F', 'FF'];
    // this.therules[1] = ['B', 'BB'];

    this.whereinstring = 0; // where in the L-system are we?
    this.stack = []
    this.consecutiveF = 0

    for (let i = 0; i < this.numloops; i++) {
      this.thestring = this.lindenmayer(this.thestring);
    }
    this.p5.background(250, 250, 245)
    this.p5.fill(240, 235, 240, 150)

    this.drawBg()
    // this.p5.stroke(240)
  }

  drawBg() {
    this.p5.push()
    this.p5.stroke(20, 20, 20, 250)
    for (let i = 50; i < 100; i += 50) {
      this.p5.line(0, i, 700, i)
    }

    for (let i = 50; i < 100; i += 50) {
      this.p5.line(i, 0, i - 100 - 10 * Math.random(), 700)
    }

    this.p5.noStroke()
    this.p5.fill(20, 20, 20, 255)
    this.p5.circle(520, 550, 100)
    this.p5.pop()
  }

  makeStep() {
    if (this.whereinstring > this.thestring.length) {
      this.whereinstring = 0
    }
    this.drawIt(this.thestring[this.whereinstring]);
    this.whereinstring = (this.whereinstring + 1)
  }

  draw() {
    if (this.p5.millis() < 2000) return
    this.p5.push()
    this.p5.scale(0.66)
    this.p5.rotate(0.3)
    this.p5.translate(160, 300)
    this.p5.strokeWeight(1)
    // this.p5.stroke(0, 128, 0)
    // this.p5.fill(0, 255, 0)
    const rrr = Math.random() < 0.05
    if (rrr) {
      this.p5.push()
      this.p5.fill(240, 240, 235, 250)
    }

    this.p5.beginShape()
    for (let i = 0; i < 1000; i++) {
      this.makeStep()
    }
    // this.p5.noFill()
    if (rrr) this.p5.pop()
    this.p5.endShape()

    this.p5.pop()
    // this.p5.fill(255)
  }

  drawIt(k) {
    // give me some this.p5.random color values:
    let r = this.p5.random(128, 255);
    let g = this.p5.random(128, 200);
    let b = this.p5.random(0, 50);
    let a = this.p5.random(50, 100);

    this.p5.stroke(0, 0, 0, a)

    // pick a gaussian (D&D) distribution for the radius:
    let radius = 0;
    radius += this.p5.random(0, 15);
    radius += this.p5.random(0, 15);
    radius += this.p5.random(0, 15);
    radius = radius / 3;

    if (k=='F') { // draw forward
      // polar to cartesian based on step and currentangle:
      let x1 = this.x + this.step * Math.cos(this.p5.radians(this.currentangle)) * Math.pow(0.96, this.consecutiveF) * radius / 11;
      let y1 = this.y + this.step * Math.sin(this.p5.radians(this.currentangle)) * Math.pow(0.93, this.consecutiveF) * radius / 4;
      let rrr = Math.random() < 0.2

      if (rrr) this.p5.endShape()
      // this.p5.line(this.x, this.y, x1, y1); // connect the old and the new
      this.p5.curveVertex(this.x, this.y)
      this.p5.curveVertex(x1, y1)
      if (rrr) this.p5.beginShape()


      // update the turtle's position:
      this.x = x1;
      this.y = y1;
      this.consecutiveF++
    } else if (k == '+') {
      this.currentangle += this.angle; // turn left
      this.consecutiveF = 0
    } else if (k == '-') {
      this.currentangle -= this.angle; // turn right
      this.consecutiveF = 0
    } else if (k == '[') {
      this.stack.push({ x: this.x, y: this.y, angle: this.currentangle })
      this.consecutiveF = 0
    } else if (k == ']') {
      let last = this.stack.pop()
      // this.p5.endShape()
      this.consecutiveF = 0

      this.x = last.x
      this.y = last.y
      this.currentangle = last.angle
    } else {
      this.consecutiveF = 0
    }

  }

  lindenmayer(s) {
    let outputstring = ''; // start a blank output string

    // iterate through 'therules' looking for symbol matches:
    for (let i = 0; i < s.length; i++) {
      let ismatch = 0; // by default, no match
      for (let j = 0; j < this.therules.length; j++) {
        if (s[i] == this.therules[j][0])  {
          outputstring += this.therules[j][1]; // write substitution
          ismatch = 1; // we have a match, so don't copy over symbol
          break; // get outta this for() loop
        }
      }
      // if nothing matches, just copy the symbol over.
      if (ismatch == 0) outputstring+= s[i];
    }

    return outputstring; // send out the modified string
  }
}
