
export type RegistersTagsHeadProps  = {
    
    classes : "visuallyHidden" | any
    numSelected : number
    onRequestSort : (event: any, property: any) => void
    onSelectAllClick : (event: any) => void
    order : "asc" | "desc" | any 
    orderBy : string 
    rowCount : number 
} 



export type RegistersTagsToolbarProps = {
    numSelected : number
}
