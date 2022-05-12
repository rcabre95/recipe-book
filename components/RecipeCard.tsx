import { Component } from 'react'
import Image from 'next/image'
import styles from '../styles/RecipeCard.module.scss'

interface IRecipeCardProps {
    recipe: any;
}

interface IRecipeCardState {

}

class RecipeCard extends Component<IRecipeCardProps, IRecipeCardState> {
    constructor(props: IRecipeCardProps) {
        super(props);

        this.state = {

        }
        this.openRecipe = this.openRecipe.bind(this);
    }

    openRecipe() {
        window.open(`/recipes/${this.props.recipe.slug}`, '_blank')
    }

    componentDidMount() {
        // console.log(this.props.recipe.slug)
    }

    render() {
        return (
            <div className={styles.recipeCard} onClick={this.openRecipe}>
                <div className={styles.imageContainer}>
                    <img
                        src={`http:${this.props.recipe.thumbnail.fields.file.url}`}
                        className={styles.thumbnail}
                    />
                </div>
                {this.props.recipe.title}
            </div>
        )
    }
}

export default RecipeCard