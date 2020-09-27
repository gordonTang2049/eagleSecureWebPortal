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

import { RegisterTagsTableHead } from './registerTagsTableHead'
import { RegisterTagsTableToolbar } from './registerTagsTableToolBar'
import { firestore } from '../../../api/firebase/configApi'


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
export default function RegistersTagsCombineTable() {
    const classes = useStyles();

    const [order, setOrder] = React.useState('asc');

    // ===========================================================
    // According to which data to order => order by (calories)
    const [orderBy, setOrderBy] = React.useState('id');
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
                .collection("worksite")
                .doc("kowloon")
                .get()
                .then(documentSnapshot => {
                    return documentSnapshot.data()
                })

            
            const tagIds: string[] = Object.keys(resp)
            //  : object[] = Object.values(resp)


            const displayDataset = (tagIdSet: string[], tagInforSet: any) => {

                const rearrangeDataSet =
                    tagIdSet.map((tagId: any) => {

                        const tagDetails = tagInforSet[tagId]

                        const dataObj = Object.fromEntries([
                            ["id", tagId],
                            ["tagLocation", tagDetails.tagLocation],
                            ["tagNum", tagDetails.tagNum.toString()]
                        ])

                        return dataObj
                    })

                setFetchData(rearrangeDataSet)

            }

            displayDataset(tagIds, resp)
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

                <RegisterTagsTableToolbar numSelected={selected.length} />
                <TableContainer>

                    <Table
                        className={classes.table}
                        aria-labelledby="tableTitle"
                        size={dense ? 'small' : 'medium'}
                        aria-label="enhanced table"
                    >


                        <RegisterTagsTableHead
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
                                            <TableCell padding="checkbox">

                                                <Checkbox
                                                    checked={isItemSelected}
                                                    inputProps={{ 'aria-labelledby': labelId }}
                                                />
                                            </TableCell>

                                            <TableCell component="th" id={labelId} scope="row" padding="none">
                                                {/* ====================================================== */}
                                                {row.id}
                                                {/* ======================================================== */}
                                            </TableCell>

                                            <TableCell align="center">{row.tagLocation}</TableCell>
                                            <TableCell align="center">{row.tagNum}</TableCell>
                                            {/* <TableCell align="center">{row.CheckpointNumber}</TableCell>
                                            <TableCell align="right">{row.Description}</TableCell> */}
                                        </TableRow>
                                    );
                                })
                            }
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
