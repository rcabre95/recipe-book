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
                HEADER
            </div>
        )
    }
}

export default Header