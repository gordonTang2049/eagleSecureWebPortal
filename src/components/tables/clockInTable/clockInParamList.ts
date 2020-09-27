
export type Classes = {
    root : object 
    paper : object
    table : object
    visuallyHidden : object
}


export type ClockInTableHeadProps  = {
    
    classes : "visuallyHidden" | any
    numSelected : number
    onRequestSort : (event: any, property: any) => void
    onSelectAllClick : (event: any) => void
    order : "asc" | "desc" | any 
    orderBy : string 
    rowCount : number 
} 



export type ClockInTableToolbarProps = {
    numSelected : number
}

// EnhancedTableHead.propTypes = {
//     classes: PropTypes.object.isRequired,
//     numSelected: PropTypes.number.isRequired,
//     onRequestSort: PropTypes.func.isRequired,
//     onSelectAllClick: PropTypes.func.isRequired,
//     order: PropTypes.oneOf(['asc', 'desc']).isRequired,
//     orderBy: PropTypes.string.isRequired,
//     rowCount: PropTypes.number.isRequired,
// };