import { Component } from 'react'
import styles from '../../styles/Recipes.module.scss'

interface IRecipesProps {

}

interface IRecipesState {

}

class Recipes extends Component<IRecipesProps, IRecipesState> {
    constructor(props: IRecipesProps) {
        super(props);

        this.state = {

        }
    }

    render() {
        return (
            <div className={styles.recipes}>

            </div>
        )
    }
}

export default Recipes