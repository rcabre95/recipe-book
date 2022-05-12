import { Component } from 'react'
import styles from '../styles/Header.module.scss'

interface IHeaderProps {

}

interface IHeaderState {

}

class Header extends Component<IHeaderProps, IHeaderState> {
    constructor(props: IHeaderProps) {
        super(props);

        this.state = {

        }
    }

    render() {
        return (
            <div className={styles.header}>
                <div className={styles.titleBox}>
                    <h1 className={styles.title}>GAINED IT MEALS</h1>
                    <h3 className={styles.subtitle}>Meal Preps for Heavy Reps</h3>
                </div>
            </div>
        )
    }
}

export default Header