import React from 'react'
import Link from 'next/link'
import Style from '../static/styles/main.less'
import Head from '../components/Head'

export default class Index extends React.Component {
  render() {
    return (
      <div>
        <Head/>
        <h1> 30 daily sketches </h1>
      </div>
    )
  }
}
