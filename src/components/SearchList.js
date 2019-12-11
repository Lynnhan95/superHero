import React, {Component} from 'react' 
import { connect } from 'react-redux'
import './style.css'
import { List, Image, Button, Grid } from 'semantic-ui-react'

class SearchList extends Component{
    //dispatch action to reducer, to get new state and make it accessible to other components
    handleButtonClick = (e, d) => {
        this.props.dispatch({
            type: "SELECT_HERO",
            payload: d.data
        })
    }

    render() {
        if (!this.props.isLoaded) {
            // If API isn't loaded (that might due to HTTP request failure or no query params), don't render anything
            return null
        } else {
            if (this.props.error) {
                return (
                        <List.Item>
                            <List.Content>
                            <List.Header className = "error">Eh-oh, bad request</List.Header>
                            </List.Content>
                        </List.Item>
                )
             // If there's no error, render hero result list 
            }else {
                let searchResults = this.props.results
                // If there's no error, and return result, render the result list
                if (searchResults.response === "success") {
                    const lists = searchResults.results.map( (d,i) => {
                        return(
                            <List.Item className="searchItem" key ={`listItems-${i}`}>
                            <Grid verticalAlign='middle' divided='vertically'>
                                <Grid.Row columns={2}>
                                <Grid.Column width={5}>
                                    <Button onClick = {this.handleButtonClick} data = {d}>Select</Button>
                                    <Image className="profile" src={ d.image.url } size="small"/>
                                </Grid.Column>
                                <Grid.Column width={9}>
                                    <List.Header className="listHeader" as='a'> { d.name } </List.Header>
                                    <Grid divided='vertically'>
                                        <List.Description as='a'> "{ d.biography.aliases }" </List.Description>

                                    </Grid>
                                </Grid.Column>
                                </Grid.Row>
                            </Grid>
                            </List.Item>
                        
                        )
                    })
                    return (
                        <List divided relaxed className = "searchLists">
                        {lists}
                        
                        </List>
                    )
                // If there's no error, but didn't return any result
                }else if(searchResults.response === "error") {
                    return (
                        <List.Item>
                            <List.Content>
                            <List.Header className = "error">Eh-oh, no results</List.Header>
                            </List.Content>
                        </List.Item>
                    )  
                }
            }
        }
    }

}

function mapStateToProps(state) {
    return {
        heros: state.heros
    }
}


export default connect(mapStateToProps) (SearchList)

