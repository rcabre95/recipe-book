import { Component } from 'react'
import { createClient } from 'contentful'
import Head from 'next/head'
import Link from 'next/link'
import Footer from '../components/Footer'
import styles from '../styles/Home.module.scss'
import Header from '../components/Header'
import { IContentfulData } from '../interfaces/recipeTyping'

export async function getStaticProps() {

    const client = createClient({
        space: `${process.env.NEXT_PUBLIC_SPACE_ID}`,
        accessToken: `${process.env.NEXT_PUBLIC_CONTENTFUL_KEY}`,
    });

    const res = await client.getEntries({
        content_type: 'recipe'
    });

    const recipeFields = res.items.map((item) => {
        return item.fields
    })

    const urlFields = recipeFields.map((urlField: any) => {
      return `http:${urlField.featuredImage.fields.file.url}`
    })

    return {
        props: {
            recipeURLs: urlFields
        }
    }
}

interface IHomeProps {
  recipeURLs: string[];
}

interface IHomeState {
  recipeURLs: string[];
  urlIndex: number;
}

class Home extends Component<IHomeProps, IHomeState> {
  constructor(props: IHomeProps) {
    super(props);

    this.state = {
      urlIndex: 0,
      recipeURLs: this.props.recipeURLs
    }
  }

  componentDidMount() {
    console.log(` array length: ${this.state.recipeURLs.length}`)
    setInterval(() => {
      let imgIndex = this.state.urlIndex === this.state.recipeURLs.length - 1 ? 0 : this.state.urlIndex + 1
      this.setState({
        urlIndex: imgIndex
      }, () => { console.log(this.state.urlIndex) });
    }, 5000)
  }

  render() {
    return (
      <div className={styles.home} >
        <Head>
          <title>Gained-It Meals</title>
        </Head>
        <Header />

        <div className={styles.homeBody} style={{backgroundImage: `url(${this.state.recipeURLs[this.state.urlIndex]})`}}>
          <div className={styles.mainCard}>
            <h5>Choose from a number of healthy, delicious, and calorie-dense meals, to help you reach your goals!</h5>
          <Link href="/recipes"><a className={styles.recipeLink}>
            See Recipes!
            </a></Link>
          </div>
        </div>
        <Footer />
      </div>
    )
  }
}

export default Home
