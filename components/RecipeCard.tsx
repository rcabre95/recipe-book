import { Component } from 'react'
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
    }

    render() {
        return (
            <div className={styles.recipeCard}>
                {this.props.recipe.title}
            </div>
        )
    }
}

export default RecipeCard