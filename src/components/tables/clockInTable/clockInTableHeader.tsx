import React from 'react';



import TableSortLabel from '@material-ui/core/TableSortLabel';
import TableCell from '@material-ui/core/TableCell';
import Checkbox from '@material-ui/core/Checkbox';
import TableRow from '@material-ui/core/TableRow';
import TableHead from '@material-ui/core/TableHead';

import {ClockInTableHeadProps} from './clockInParamList'


const headCells = [

    { id: 'id', numeric: false, disablePadding: true, label: 'Unique Id' },
    { id: 'PhoneInfor', numeric: false, disablePadding: false, label: 'Phone Information' },
    { id: 'staffId', numeric: false, disablePadding: false, label: 'Tag Id' },
    { id: 'serverTime', numeric: true, disablePadding: false, label: 'Server Time' },
    { id: 'phoneTime', numeric: true, disablePadding: false, label: 'Phone Time' }

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

export const ClockInTableHead = ( props : ClockInTableHeadProps ) => {

    const createSortHandler = (property : any) => (event : any) => {
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

/*
export  function EnhancedTableHead(props: { classes: any; onSelectAllClick: any; order: any; orderBy: any; numSelected: any; rowCount: any; onRequestSort: any; }) {

    const { classes, onSelectAllClick, order, orderBy, numSelected, rowCount, onRequestSort } = props;

    const createSortHandler = (property: string) => (event: any) => {
        onRequestSort(event, property);
    };

    return (
        <TableHead style={{ backgroundColor: '#f6f6fa' }}>
            <TableRow>
                <TableCell padding="checkbox">

                    <Checkbox
                        indeterminate={numSelected > 0 && numSelected < rowCount}
                        checked={rowCount > 0 && numSelected === rowCount}
                        onChange={onSelectAllClick}
                        inputProps={{ 'aria-label': 'select all desserts' }}
                    />
                </TableCell>

                {headCells.map((headCell) => (

                    <TableCell
                        key={headCell.id}
                        align={headCell.numeric ? 'right' : 'left'}
                        padding={headCell.disablePadding ? 'none' : 'default'}
                        sortDirection={orderBy === headCell.id ? order : false}
                        style={{ fontSize: 18 }}
                    >

                        <TableSortLabel
                            active={orderBy === headCell.id}
                            direction={orderBy === headCell.id ? order : 'asc'}
                            onClick={createSortHandler(headCell.id)}
                        >
                            {headCell.label}
                            {orderBy === headCell.id ? (
                                <span className={classes.visuallyHidden}>
                                    {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                                </span>
                            ) : null}
                        </TableSortLabel>
                    </TableCell>

                ))}
            </TableRow>
        </TableHead>
    );
}
*/

