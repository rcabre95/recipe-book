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
    checkedBoxes: string[];
}

class Recipe extends Component<IRecipeProps, IRecipeState> {
    constructor(props: IRecipeProps) {
        super(props);

        this.state = {
            checkedBoxes: []
        }

        this.handleCheckbox = this.handleCheckbox.bind(this);
    }

    handleCheckbox(e: any) {
        const targetID: string = JSON.parse(JSON.stringify(e.target.id));
        let boxesArray: string[] = JSON.parse(JSON.stringify(this.state.checkedBoxes));
        const index: number = boxesArray.indexOf(targetID)

        if (index > -1) {
            boxesArray.splice(index, 1);
        } else {
            boxesArray.push(targetID)
        }
        this.setState({
            checkedBoxes: boxesArray
        }, () => { console.log(this.state.checkedBoxes) })
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
                                            label={
                                                <span
                                                className={`${styles.tool}
                                                ${this.state.checkedBoxes.indexOf(`tool${index}`) > -1 ?
                                                styles.strike : null}`}>
                                                    {tool}
                                                </span>
                                            }
                                            control={
                                                <Checkbox
                                                    id={`tool${index}`}
                                                    onChange={this.handleCheckbox}
                                                />
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
                                            label={<span className={`${styles.spice} ${this.state.checkedBoxes.indexOf(`ingr${index}`) > -1 ? styles.strike : null}`}>{spice}</span>}
                                            control={
                                                <Checkbox
                                                    id={`ingr${index}`}
                                                    onChange={this.handleCheckbox}
                                                />
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