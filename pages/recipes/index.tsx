import { Component } from 'react'
import { createClient } from 'contentful'
import Header from '../../components/Header'
import RecipeCard from '../../components/RecipeCard'
import styles from '../../styles/Recipes.module.scss'

export async function getStaticProps() {

    const client = createClient({
        space: "pt9po23extw1",
        accessToken: `${process.env.NEXT_PUBLIC_CONTENTFUL_KEY}`,
    });

    const res = await client.getEntries({
        content_type: 'recipe'
    });

    return {
        props: {
            recipes: res.items
        }
    }
}

interface IRecipesProps {
    recipes: any
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
                            <RecipeCard recipe={recipe.fields} key={recipe.fields.slug} />
                        ))}
                    </div>
                </div>
            </div>
        )
    }
}

export default Recipes