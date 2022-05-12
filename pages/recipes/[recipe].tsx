import { Component } from 'react'
import { createClient } from 'contentful'
import styles from '../../styles/Recipe.module.scss'

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
    recipe: any;
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
                {this.props.recipe.title}
            </div>
        )
    }
}

export default Recipe