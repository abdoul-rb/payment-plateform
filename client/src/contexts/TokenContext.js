import { Component, createContext } from "react";

const TokenContext = createContext()

/**
 * Création d'un composant
 * pour permettre aux composants enfants
 * de pouvoir accéder et modifier le state du context
 */

class TokenProvider extends Component {

    state = {
        token: ''
    }

    setToken = (token) => {
        this.setState({token})
        localStorage.setItem('token', token)
    }

    render(){
        return <TokenContext.Provider value={{token: this.state.token, setToken: this.setToken}}>
            {this.props.children}
        </TokenContext.Provider>
    }
}


export { TokenProvider } // équivalent à export const TokenProvider = TokenProvider
export const TokenConsumer = TokenContext.Consumer

export default TokenContext
