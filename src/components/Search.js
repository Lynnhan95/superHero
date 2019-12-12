import React, { Component } from 'react' 
import axios from 'axios'
import SearchLists from './SearchList'
import './style.css'
import {bindActionCreators} from 'redux'
import { connect } from 'react-redux'
import { selectHero } from '../actions'
import { Button } from 'semantic-ui-react'

// Config API
const API_URL = "https://superheroapi.com/api"
const API_token = "212252059775751"

class Search extends Component{
    constructor(props) {
        super(props)
        // Initiate state
        this.state = {
            query: '',
            results:[],
            error: false,
            isLoaded: false 
        }

    }

    // Make API call according to user input and throw error it fail
    getHero = () => {
        axios.get(`${API_URL}/${API_token}/search/${this.state.query}`)
            .then( (data) => {
                this.setState({
                    results: data.data,
                    isLoaded: true
                })
                console.log(data.data)
            })
            .catch(() => this.setState({ error: true }))
    }

    // Handle user input and make API call function
    handleInputChange = () => {
            this.setState({
                query: this.search.value
            }
            , () => {
                if (this.state.query && this.state.query.length > 0) {
                    //show drop down list
                    this.getHero()

                } else {
                    //hide drop down list 
                    this.setState({isLoaded: false})
                }
            }) 
    }
    
    // Enable user to close the search list
    handleClose = () => {
        this.setState({isLoaded: false})
    }

    render() {
        
        // Return search list with API call results
        return (
            <div className = "searchBox">
                <input
                    className = "input"
                    placeholder = "Search for super hero name"
                    ref = {input =>  this.search= input}
                    onChange = {this.handleInputChange}
                    onBlur = {this.handleLoseFocus}
                />
            { this.state.isLoaded ? <Button className="close" onClick = {this.handleClose}> X  Close Search List </Button> : ''}   
            { this.state.isLoaded ? <SearchLists results={this.state.results} isLoaded={this.state.isLoaded} error={this.state.error} /> : '' }
            </div>
        )
    }
}

// Config Redux connection
function mapStateToProps(state) {
    return {
        selectReducer: state.selectReducer
    }
}

function matchDispatchToProps(dispatch) {
    return bindActionCreators({ selectHero: selectHero}, dispatch)
}

export default connect(mapStateToProps, matchDispatchToProps)(Search)