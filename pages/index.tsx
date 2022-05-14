import { Component } from 'react'
import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.scss'
import Header from '../components/Header'

interface IHomeProps {

}

interface IHomeState {

}

class Home extends Component<IHomeProps, IHomeState> {
  constructor(props: IHomeProps) {
    super(props);

    this.state = {

    }
  }

  render() {
    return (
      <div className={styles.home}>
        <Head>
          <title>Gained-It Meals</title>
        </Head>
        <Header />
        
      </div>
    )
  }
}

export default Home
