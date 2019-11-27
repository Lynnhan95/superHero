import React, {Component} from 'react' 

import { List, Checkbox, Image } from 'semantic-ui-react'
import './style.css'

class SearchLists extends Component{

    render() {
        if (!this.props.isLoaded) {
            // If API isn't loaded (that might due to HTTP request failure or no query params), don't render anything
            return null
        } else {
            if (this.props.error) {
                return (
                        <List.Item>
                            <List.Content>
                            <List.Header>Eh-oh, bad request</List.Header>
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
                            <List.Item key ={`listItems-${i}`}>
                                <Checkbox key = {`checkbox-${i}`}/>
                                <List.Content>
                                <List.Header as='a'> { d.name } </List.Header>
                                <List.Description as='a'> { d.biography.aliases } </List.Description>
                                </List.Content>
                                <Image src={ d.image.url } size="tiny"/>
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
                            <List.Header>Eh-oh, no results</List.Header>
                            </List.Content>
                        </List.Item>
                    )
                       
                }

            }

        }


    }
}

export default SearchLists 

