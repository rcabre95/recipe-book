import { Component } from 'react'
import Head from 'next/head'
import styles from '../../styles/Recipe.module.scss'
import { IContentfulData } from '../../interfaces/recipeTyping';
import { createClient } from 'contentful'
import { FormGroup, FormControlLabel, Checkbox } from '@mui/material'
import Header from '../../components/Header'
import Footer from '../../components/Footer'

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
                    <img src={`http:${this.props.recipe.featuredImage.fields.file.url}`}/>
                </div>
                <h2 className={styles.recipeTitle}>{this.props.recipe.title}</h2>
                <div className={styles.recipeBody}>
                    <div className={styles.gatheredItems}>
                        <section className={styles.equipment}>
                            <fieldset>
                                <legend>Tools</legend>
                                <FormGroup>
                                    {this.props.recipe.equipment.map((tool, index) => (
                                        <FormControlLabel
                                            key={index}
                                            label={tool}
                                            control={
                                                <Checkbox />
                                            }
                                        />
                                    ))}
                                </FormGroup>
                            </fieldset>
                        </section>
                        <section className={styles.ingredients}>
                            <fieldset>
                                <legend>Ingredients</legend>
                                <FormGroup>
                                    {this.props.recipe.ingredients.map((spice, index) => (
                                        <FormControlLabel
                                        key={index}
                                        label={spice}
                                        control={
                                            <Checkbox />
                                        }
                                        />
                                    ))}
                                </FormGroup>
                            </fieldset>
                        </section>
                    </div>
                    <div className={styles.mainBody}>
                        <section className={styles.instructions}>
                            <h3>Instructions</h3>
                            
                                <ol>
                                    {this.props.recipe.instructions.map((step, index) => (
                                    <li key={index}>{step}</li>
                                    ))}
                                </ol>
                            
                        </section>
                    </div>
                </div>
                <Footer />
            </div>
        )
    }
}

export default Recipe