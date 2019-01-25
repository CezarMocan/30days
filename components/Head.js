import React from 'react'
import Head from 'next/head'

export default class HeadComponent extends React.Component {
  render() {
    const { title, withP5 } = this.props
    return (
      <Head>
        <title>{title}</title>
        <meta name="viewport" content="width=device-width, initial-scale=0.8"/>
        <link rel="shortcut icon" href="/static/favicon.ico" type="image/x-icon"/>
        <link rel="icon" href="/static/favicon.ico" type="image/x-icon"/>
        { withP5 && <script src="/static/p5.js"></script> }
      </Head>
    )
  }
}

HeadComponent.defaultProps = {
  title: '30 days of sketching',
  withP5: false
}