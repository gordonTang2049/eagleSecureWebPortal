import React from 'react';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import TableCell from '@material-ui/core/TableCell';
import Checkbox from '@material-ui/core/Checkbox';
import TableRow from '@material-ui/core/TableRow';
import TableHead from '@material-ui/core/TableHead';

import { RegistersTagsHeadProps } from './registerTagsParamList'


const headCells = [

    // { id: 'CreateAt', numeric: false, disablePadding: true, label: 'Date of Creation' },
    { id: 'tagIds', numeric: false, disablePadding: false, label: 'Tag ID' },
    // { id: 'WorkSiteName', numeric: false, disablePadding: false, label: 'WorkSite Name' },
    { id: 'TagLocation', numeric: true, disablePadding: false, label: 'Tag Location or Tag Name ' },
    { id: 'TagNum', numeric: true, disablePadding: false, label: 'Tag Number' }

];

/*
const PrivateRoute = ({ component, ...rest }: any) => {
    const currentUser = useContext(AuthContext)
    const routeComponent = (props: any) => (
        //******* Need to fix  *******
        Object.values(currentUser)[0]
            ? React.createElement(component, props)
            : <Redirect to="/signin" />
    );
    return <Route {...rest} render={routeComponent} />;
};
(event: any, property: any) => void
*/

export const RegisterTagsTableHead = (props: RegistersTagsHeadProps) => {

    const createSortHandler = (property: any) => (event: any) => {
        props.onRequestSort(event, property);
    };

    return (
        <TableHead style={{ backgroundColor: '#f6f6fa' }}>
            <TableRow>
                <TableCell padding="checkbox">

                    <Checkbox
                        indeterminate={props.numSelected > 0 && props.numSelected < props.rowCount}
                        checked={props.rowCount > 0 && props.numSelected === props.rowCount}
                        onChange={props.onSelectAllClick}
                        inputProps={{ 'aria-label': 'select all desserts' }}
                    />
                </TableCell>

                {headCells.map((headCell) => (

                    <TableCell
                        key={headCell.id}
                        align={headCell.numeric ? 'right' : 'left'}
                        padding={headCell.disablePadding ? 'none' : 'default'}
                        sortDirection={props.orderBy === headCell.id ? props.order : false}
                        style={{ fontSize: 18 }}
                    >

                        <TableSortLabel
                            active={props.orderBy === headCell.id}
                            direction={props.orderBy === headCell.id ? props.order : 'asc'}
                            onClick={createSortHandler(headCell.id)}
                        >
                            {headCell.label}
                            {props.orderBy === headCell.id ? (
                                <span className={props.classes.visuallyHidden}>
                                    {props.order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                                </span>
                            ) : null}
                        </TableSortLabel>
                    </TableCell>

                ))}
            </TableRow>
        </TableHead>
    );

}
