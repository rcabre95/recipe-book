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
        // console.log(this.props.recipe);
    }

    render() {
        const { thumbnail, title, servings, cookingTime } = this.props.recipe
        return (
            <div className={styles.recipeCard} onClick={this.openRecipe}>
                <div className={styles.imageContainer}>
                    <img
                        src={`http:${thumbnail.fields.file.url}`}
                        className={styles.thumbnail}
                    />
                </div>
                <span className={styles.recipeTitle}>{title}</span>
                <div className={styles.cardDetails}>
                    <span className={styles.quantitative}>{servings} {servings < 2 ? "Serving" : "Servings"}</span>
                    <div className={styles.divider}></div>
                    <span className={styles.quantitative}>{cookingTime} Minutes</span>
                </div>
            </div>
        )
    }
}

export default RecipeCard