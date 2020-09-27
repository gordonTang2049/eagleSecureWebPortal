// explaination of Material UI table 

// Row => array contains objects
//  row.potein => the object attribute
// must give a unique key for it
//  <TableRow key={}>
//  <TableCell> is what you want the cell to be  
//  <Table size={small/medimum}  small is dense table,  medimum is loose table

// Like pipeLine processing the data
// Table pagination => 
// it is first sort the rows
// stableSort(row, getComparator(order, orderBy))
//  and then cut and copy the right number of rows, 
//  the right start of row, 
//  and the right end of row to the display
// e.g.           starts at 20,   end at 20 + 10  = 30
// .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
// and then map throught 
// map

// if Don't have that it will automatically shrink
// When It goes to the end, 
// and not enough rows to map throught the table
// e.g. render 10 per page, at the end only has 3 rows

// {emptyRows > 0 &&  (
// <TableRow style={{height: (dense ? 33 : 53) * emptyRows  }}> 
//  <TableCell> colSpan={6} />
//  </TableRow>
// )}


import React, {
    useState,
    useEffect
} from 'react';

import PropTypes from 'prop-types';

import clsx from 'clsx';

import { lighten, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';

import TableRow from '@material-ui/core/TableRow';

import TableSortLabel from '@material-ui/core/TableSortLabel';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Checkbox from '@material-ui/core/Checkbox';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import DeleteIcon from '@material-ui/icons/Delete';

import FilterListIcon from '@material-ui/icons/FilterList';

import { ClockInTableHead } from './clockInTableHeader'
import { ClockInTableToolbar } from './clockInTableToolBar'
import { firestore } from '../../../api/firebase/configApi'
import { generate } from 'shortid'

// import EnhancedTableHead from './dataTableHead/dataTableheader'
// import EnhancedTableToolbar from './toolbar/enhancedtabletoolbar'

// import FirebaseApp from '../../../api/firebase/configKey'


// function createData(name, calories, fat, carbs, protein) {
//     return { name, calories, fat, carbs, protein };
// }

// const fetchData = [
//     createData('Cupcake', 305, 3.7, 67, 4.3),
//     createData('Donut', 452, 25.0, 51, 4.9),
//     createData('Eclair', 262, 16.0, 24, 6.0),
//     createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
//     createData('Gingerbread', 356, 16.0, 49, 3.9),
//     createData('Honeycomb', 408, 3.2, 87, 6.5),
//     createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
//     createData('Jelly Bean', 375, 0.0, 94, 0.0),
//     createData('KitKat', 518, 26.0, 65, 7.0),
//     createData('Lollipop', 392, 0.2, 98, 0.0),
//     createData('Marshmallow', 318, 0, 81, 2.0),
//     createData('Nougat', 360, 19.0, 9, 37.0),
//     createData('Oreo', 437, 18.0, 63, 4.0),
// ];

function descendingComparator(a: string | number | any, b: string | number | any, orderBy: string | number | any) {
    if (b[orderBy] < a[orderBy]) {
        return -1;
    }
    if (b[orderBy] > a[orderBy]) {
        return 1;
    }
    return 0;
}

function getComparator(order: any, orderBy: any) {
    return order === 'desc'
        ? (a: any, b: any) => descendingComparator(a, b, orderBy)
        : (a: any, b: any) => -descendingComparator(a, b, orderBy);
}

// export const getKeyValue = <T extends {}, U extends keyof T>(key: U) => (obj: T) => obj[key] 


function stableSort(array: any[], comparator: (a: any, b: any) => {}) {

    const stabilizedThis = array.map((el, index) => [el, index]);

    stabilizedThis.sort((a, b): any => {

        const order = comparator(a[0], b[0]);
        if (order !== 0) return order;
        return a[1] - b[1];

    });

    return stabilizedThis.map((el) => el[0]);
}



// ==============================================================================

// ==================================================

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
    },
    paper: {
        width: '100%',
        marginBottom: theme.spacing(2),
    },
    table: {
        minWidth: 750,
    },
    visuallyHidden: {
        border: 0,
        clip: 'rect(0 0 0 0)',
        height: 1,
        margin: -1,
        overflow: 'hidden',
        padding: 0,
        position: 'absolute',
        top: 20,
        width: 1,
    },
}));


// ============================================================
export default function ClockInCombineTable() {
    const classes = useStyles();

    const [order, setOrder] = React.useState('asc');

    // ===========================================================
    // According to which data to order => order by (calories)
    const [orderBy, setOrderBy] = React.useState('calories');
    // ============================== =============================

    const [selected, setSelected] = React.useState([]);
    const [page, setPage] = React.useState(0);
    const [dense, setDense] = React.useState(false);

    // ====================================
    const [rowsPerPage, setRowsPerPage] = React.useState(10);
    // ====================================
    const [fetchData, setFetchData] = useState([])



    useEffect(() => {
        // firestore
        const data = async () => {

            const resp = await firestore
                .collection("clockInDb")
                .doc("2020")
                .collection("kowloon")
                .get()
                .then(documentSnapshot => {
                    // documentSnapshot.docs.
                    // "04535ACA536580"

                    const dataset: any[] =
                        documentSnapshot.docs.map(doc => {


                            const tagId = doc.id
                            const clockInRecords = doc.data()
                            const recordKeys: string[] = Object.keys(clockInRecords)

                            const rearrangeDataSet =
                                recordKeys.map(recordId => {
                                    
                                     
                                    const recordDetails = clockInRecords[recordId]
                                    const phoneInfor = recordId.split("_")[0]
                                    const serverTime = new Date((recordDetails.serverTime_createdAt.seconds + recordDetails.serverTime_createdAt.nanoseconds * 10 ** -9) * 1000)
                                    const phoneTime = new Date(recordDetails.phoneTime_createdAt)
                                    const staffId = recordDetails.staffId

                                    const dataObj = Object.fromEntries([
                                        ["id", recordId],
                                        ["PhoneInfor", phoneInfor],
                                        ["staffId", tagId],
                                        ["serverTime", serverTime.toString()],
                                        ["phoneTime", phoneTime.toString()]

                                    ])

                                    return dataObj
                                })

                            return rearrangeDataSet
                        });

                    return dataset

                })

            const flatten = (dataArr: any[]): object[] => {
                const flattenDataArr =
                    dataArr.reduce(
                        (accumulator, currentValue) => accumulator.concat(currentValue),
                        []
                    )
                return flattenDataArr
            }
            
            setFetchData(flatten(resp))

        }

        data()

    }, [])


    const handleRequestSort = (event: any, property: any) => {
        const isAsc = orderBy === property && order === 'asc';
        setOrder(isAsc ? 'desc' : 'asc');
        setOrderBy(property);
    };

    const handleSelectAllClick = (event: any) => {

        if (event.target.checked) {
            const newSelecteds = fetchData.map((n) => n.id);
            setSelected(newSelecteds);
            return;
        }

        setSelected([]);
    };

    // ===OnCLick event Listener prop type======================================================
    const handleClick = (event: any, id: any) => {

        const selectedIndex = selected.indexOf(id);
        let newSelected: any[] = [];

        if (selectedIndex === -1) {
            newSelected = newSelected.concat(selected, id);
        } else if (selectedIndex === 0) {
            newSelected = newSelected.concat(selected.slice(1));
        } else if (selectedIndex === selected.length - 1) {
            newSelected = newSelected.concat(selected.slice(0, -1));
        } else if (selectedIndex > 0) {

            newSelected = newSelected.concat(
                selected.slice(0, selectedIndex),
                selected.slice(selectedIndex + 1),
            );
        }


        setSelected(newSelected);
    };
    // =========================================================

    const handleChangePage = (event: any, newPage: any) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event: any) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const handleChangeDense = (event: any) => {
        setDense(event.target.checked);
    };

    const isSelected = (id: any) => selected.indexOf(id) !== -1;

    const emptyRows = rowsPerPage - Math.min(rowsPerPage, fetchData.length - page * rowsPerPage);

    return (
        <div className={classes.root}>
            <Paper className={classes.paper}>

                <ClockInTableToolbar numSelected={selected.length} />
                <TableContainer>

                    <Table
                        className={classes.table}
                        aria-labelledby="tableTitle"
                        size={dense ? 'small' : 'medium'}
                        aria-label="enhanced table"
                    >


                        <ClockInTableHead
                            classes={classes}
                            numSelected={selected.length}
                            order={order}
                            orderBy={orderBy}
                            onSelectAllClick={handleSelectAllClick}
                            onRequestSort={handleRequestSort}
                            // ===ROW============================
                            rowCount={fetchData.length}
                        // ===ROW==========================
                        />

                        <TableBody>
                            {/* ===ROW============================ */}

                            {stableSort(fetchData, getComparator(order, orderBy))
                                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                .map((row, index) => {
                                    // console.log(row.id)
                                    const isItemSelected = isSelected(row.id);
                                    const labelId = `enhanced-table-checkbox-${index}`;

                                    return (
                                        <TableRow
                                            hover
                                            onClick={(event) => handleClick(event, row.id)}
                                            role="checkbox"
                                            aria-checked={isItemSelected}
                                            tabIndex={-1}
                                            key={row.id}
                                            selected={isItemSelected}
                                        >
                                            {/* Check box ============================ */}
                                            <TableCell padding="checkbox">

                                                <Checkbox
                                                    checked={isItemSelected}
                                                    inputProps={{ 'aria-labelledby': labelId }}
                                                />

                                            </TableCell>
                                            {/* Check box ============================ */}

                                            <TableCell component="th" id={labelId} scope="row" padding="none">
                                                {/* ====================================================== */}
                                                {row.id}
                                                {/* ======================================================== */}
                                            </TableCell>

                                            <TableCell align="center">{row.PhoneInfor}</TableCell>
                                            <TableCell align="center">{row.staffId}</TableCell>
                                            <TableCell align="center">{row.serverTime}</TableCell>
                                            <TableCell align="right">{row.phoneTime}</TableCell>
                                        </TableRow>
                                    );
                                })}
                            {emptyRows > 0 && (
                                <TableRow style={{ height: (dense ? 33 : 53) * emptyRows }}>
                                    <TableCell colSpan={6} />
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </TableContainer>

                <TablePagination
                    rowsPerPageOptions={[5, 10, 25]}
                    component="div"

                    count={fetchData.length}

                    rowsPerPage={rowsPerPage}
                    page={page}
                    onChangePage={handleChangePage}
                    onChangeRowsPerPage={handleChangeRowsPerPage}
                />
            </Paper>
            <FormControlLabel
                control={<Switch checked={dense} onChange={handleChangeDense} />}
                label="Dense padding"
            />
        </div>
    );
}
