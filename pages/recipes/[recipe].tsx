import { Component } from 'react'
import Head from 'next/head'
import { createClient } from 'contentful'
import Header from '../../components/Header'
import styles from '../../styles/Recipe.module.scss'
import { IContentfulData } from '../../interfaces/recipeTyping';

export async function getStaticPaths() {
    const client = createClient({
        space: `${process.env.NEXT_PUBLIC_SPACE_ID}`,
        accessToken: `${process.env.NEXT_PUBLIC_CONTENTFUL_KEY}`,
    });

    const res = await client.getEntries({
        content_type: 'recipe'
    });
    const recipePaths = res.items.map((recipePath: any) => {
        return {
            params: { recipe: recipePath.fields.slug }
        }
    })

    return {
        paths: recipePaths,
        fallback: false
    }
}

export async function getStaticProps(context: any) {
    const { params } = context
    const client = createClient({
        space: `${process.env.NEXT_PUBLIC_SPACE_ID}`,
        accessToken: `${process.env.NEXT_PUBLIC_CONTENTFUL_KEY}`,
    });

    const res = await client.getEntries({
        content_type: 'recipe'
    });

    const recipe: any = res.items.find((someRecipe: any) => someRecipe.fields.slug == params.recipe)

    return {
        props: {
            recipe: recipe.fields
        }
    }
}

interface IRecipeProps {
    recipe: IContentfulData;
}

interface IRecipeState {

}

class Recipe extends Component<IRecipeProps, IRecipeState> {
    constructor(props: IRecipeProps) {
        super(props);

        this.state = {

        }
    }

    render() {
        return (
            <div className={styles.recipe}>
                <Head>
                    <title>{this.props.recipe.title}</title>
                </Head>
                <Header />
                <div className={styles.imageContainer}>
                    <img />
                </div>
                {this.props.recipe.title}
            </div>
        )
    }
}

export default Recipe