import { Component } from 'react'
import { createClient } from 'contentful'
import Head from 'next/head'
import Header from '../../components/Header'
import RecipeCard from '../../components/RecipeCard'
import Footer from '../../components/Footer'
import styles from '../../styles/Recipes.module.scss'
import { IContentfulData } from '../../interfaces/recipeTyping'

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

    return {
        props: {
            recipes: recipeFields
        }
    }
}

interface IRecipesProps {
    recipes: IContentfulData[]
}

interface IRecipesState {

}

class Recipes extends Component<IRecipesProps, IRecipesState> {
    constructor(props: IRecipesProps) {
        super(props);

        this.state = {

        }
        
    }

    componentDidMount() {
        console.log(this.props.recipes)
    }

    render() {
        return (
            <div className={styles.recipes}>
                <Head>
                    <title>Recipes</title>
                </Head>
                <Header />
                <div className={styles.recipesBody}>
                    <div className={styles.filters}>
                        <fieldset>
                            <legend>Filters</legend>
                            FILTERS
                        </fieldset>
                    </div>
                    <div className={styles.items}>
                        {this.props.recipes.map((recipe: any) => (
                            <RecipeCard recipe={recipe} key={recipe.slug} />
                            
                        ))}
                        
                    </div>
                </div>
                {/* <Footer /> */}
            </div>
        )
    }
}

export default Recipes