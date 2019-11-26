import React, { Component } from 'react' 

import axios from 'axios'
import SearchLists from '../components/SearchLists'

const API_URL = "https://superheroapi.com/api"
const API_token = "212252059775751"

class Search extends Component{
    constructor(props) {
        super(props)
        this.state = {
            query: '',
            results:[],
            error: false,
            isLoaded: false 
        }
    }

    getHero = () => {
        axios.get(`${API_URL}/${API_token}/search/${this.state.query}`)
            .then( (data) => {
                this.setState({
                    results: data.data,
                    isLoaded: true
                })
                console.log(data.data)
            })
            .catch(() => this.setState({ error: true}))
    }

    handleInputChange = () => {
        this.setState({
            query: this.search.value
        }, () => {
            if (this.state.query && this.state.query.length > 0) {
                //show drop down list
                this.getHero()
            } else {
                //hide drop down list 
            }
        })
    }

    render() {
        console.log(this.state.query)

        return (
            <form>
                <input
                    placeholder = "Search for super heros' name"
                    ref = {input =>  this.search= input}
                    onChange = {this.handleInputChange}
                />
                <SearchLists results={this.state.results} isLoaded={this.state.isLoaded} error={this.state.error}/> 
            </form>
        )
    }
}

export default Search