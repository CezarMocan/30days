import React from 'react'
import Link from 'next/link'
import Style from '../static/styles/main.less'
import Position from '../components/Position'
import Logo from '../components/Logo'
import Head from '../components/Head'
import Footer from '../components/Footer'
import EmailCapture from '../components/EmailCapture'
import Particles from '../components/Particles'

export default class Index extends React.Component {
  render() {
    return (
      <div>
        <Head/>
        <Logo theme="light" className="main-section-logo"/>

        <section className="c12 df xdc xac xjc top-section">
          <Particles visible={true} animating={true}/>
          <div className="df xdc xac xjc title-container">
            <div className="tac title">
              <h1>A Storytelling <br className='mobile-only'/>Studio for Kids</h1>
            </div>
            <div className="tac subtitle">
              <h2>Interactive stories by artists and authors around the world to capture the wonder of storytelling.</h2>
            </div>
          </div>

          <EmailCapture/>

        </section>

        <section className="mid-section mobile-padded-section">
          <div className="df flex-row-column">

            <div className="grid-18-c9 grid-18-pl1">
              <div className="join-text grid-18-c6">
                <h3>Join Our Mission</h3>
                <p className="large light">We’re a team of artists and engineers making technology meaningful for families, and storytelling more accessible for creators.</p>
                <p className="large light">Join our team or become a Fable creator.</p>
              </div>
            </div>

            <div className="grid-18-c9 grid-18-pl2">
              <div className="open-positions-container grid-18-c6">
                <h4>Open Positions</h4>
                <div className="positions-container">
                  <Position title="Artist/Illustrator" type="Contract" location="Anywhere" link="mailto:hello@fablestudios.com"/>
                  <Position title="Author/Scriptwriter" type="Contract" location="Anywhere" link="mailto:hello@fablestudios.com"/>
                  <Position title="Narrator" type="Contract" location="NYC" link="mailto:hello@fablestudios.com"/>
                  <Position title="Senior Product Designer" type="Full time" location="NYC" link="https://angel.co/fablestudios/jobs/486658-senior-product-designer"/>
                  <Position title="Senior Software Engineer (React)" type="Full time" location="NYC" link="https://angel.co/fablestudios/jobs/487139-senior-software-engineer-react"/>
                  <Position title="Senior Software Engineer (iOS)" type="Full time" location="NYC" link="https://angel.co/fablestudios/jobs/487140-senior-software-engineer-ios"/>
                  <Position title="Content Producer" type="Full time" location="NYC" link="https://angel.co/fablestudios/jobs/487136-content-producer"/>
                </div>
              </div>
            </div>
          </div>
        </section>

        <Footer/>
      </div>
    )
  }
}
