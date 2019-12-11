import React, { Component } from 'react' 
import axios from 'axios'
import SearchLists from './SearchList'
import './style.css'
import {bindActionCreators} from 'redux'
import { connect } from 'react-redux'
import { selectHero } from '../actions'
import { Button } from 'semantic-ui-react'


const API_URL = "https://superheroapi.com/api"
const API_token = "212252059775751"
function mapStateToProps(state) {
    return {
        selectReducer: state.selectReducer
    }
}

function matchDispatchToProps(dispatch) {
    return bindActionCreators({ selectHero: selectHero}, dispatch)
}

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
            .catch(() => this.setState({ error: true }))
    }

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

    handleClose = () => {
        this.setState({isLoaded: false})
    }

    // handleLoseFocus = () => {
    //     this.setState({isLoaded: false})
    // }

    render() {
        console.log(this.state.query)

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

export default connect(mapStateToProps, matchDispatchToProps)(Search)