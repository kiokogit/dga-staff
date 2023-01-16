
import './search_input.css'
import { Button, TextField } from "@mui/material"

export const SearchInput = () => {
    // TODO: enter search function
    
    return (
        <div  id="search_elements" className="search_complete">
            <TextField placeholder="Search"/>
            <Button>Search</Button>
            {/* <div className={`search_results_card float_card ${searchValue!==''? '':'hidden'}`}>
                Search results 
                <hr />
                {search_results.length < 1 ? <i>No related search results</i>:
                <div>
                    {search_results.map(value=>
                        <div className="column_grids_partition_equal_2">
                            <li key={value.id}>{value.title}</li> 
                            <Link id="more_link" to={PACKAGES_ROUTE + '/'+value.id}>
                                View Package 
                            </Link>
                        </div>
                        )}
                     </div>
                }
            </div> */}
        </div>
    )
}