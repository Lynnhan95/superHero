import React, {Component} from 'react' 

class SearchLists extends Component{

    render() {
        if (!this.props.isLoaded) {
            // If API is not loaded, return null
            return null
        } else {
            // If there's no error, render hero result list 
            if (this.props.error) {
                return (
                    <div>Eh-oh, error</div>
                )
            }else {
                let searchResults = this.props.results
                // If there's no error, and return result, render the result list
                if (searchResults.response === "success") {
                    const lists = searchResults.results.map( (d,i) => {
                        return(
                        <li key = {`hero-${i}`}>
                            {d.name}
                        </li>
                        )
                    })
                    return (
                        <ul>{lists}</ul>
                    )
                // If there's no error, but didn't return any result
                }else if(searchResults.response === "error") {
                    return (
                        <div>Eh-oh, no results</div>
                    )
                       
                }

            }

        }


    }
}

export default SearchLists 

