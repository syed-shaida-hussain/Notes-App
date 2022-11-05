import {useReducer , createContext , useContext} from "react"

function filterReducer(state, action) {
    switch (action.type) {
      case "SORT":
        return {
          ...state,
          sortBy: action.payload
        };
      case "CLEAR":
        return {
          ...state , sortBy : null
        }
      default:
        return state;
    }
  }


const FilterContext = createContext()

const FilterProvider = ({children}) => {
    const [ {  sortBy  }, dispatchFilter ] = useReducer(filterReducer, {sortBy: null});
    return (
        <FilterContext.Provider value = {{ sortBy , dispatchFilter}}>
            {children}
        </FilterContext.Provider>
    )
}

const useFilters = () => useContext(FilterContext)

export { FilterProvider , useFilters}