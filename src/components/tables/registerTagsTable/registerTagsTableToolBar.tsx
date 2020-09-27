import React, {
    useContext,
    useRef
} from 'react';

// import PropTypes from 'prop-types';

import clsx from 'clsx';

import { lighten, makeStyles } from '@material-ui/core/styles';

import { Button } from '@material-ui/core';
import Toolbar from '@material-ui/core/Toolbar';

import Typography from '@material-ui/core/Typography';

import IconButton from '@material-ui/core/IconButton';

import Tooltip from '@material-ui/core/Tooltip';
import FilterListIcon from '@material-ui/icons/FilterList';

import DescriptionIcon from '@material-ui/icons/Description';

import { auth } from '../../../api/firebase/configApi'
import { AuthContext } from '../../../auth/authProvider'

//   import Firebase from '../../../../api/firebase/configKey'
//   import { AuthContext} from '../../../auth/authprovider'

import {
    Redirect,
    useHistory
} from "react-router-dom";

import { RegistersTagsToolbarProps } from './registerTagsParamList';


const useToolbarStyles = makeStyles((theme) => ({
    root: {
        paddingLeft: theme.spacing(2),
        paddingRight: theme.spacing(1),
    },
    highlight:
        theme.palette.type === 'light'
            ? {

                color: theme.palette.secondary.main,
                backgroundColor: lighten(theme.palette.secondary.light, 0.85),

            }
            : {
                color: theme.palette.text.primary,
                backgroundColor: theme.palette.secondary.dark,
            },
    nfcTitle: {
        flex: '1 1 100%',
        textDecorationLine: 'underLine'
    },
    title: {
        flex: '1 1 100%',
    },
}));

// export const ClockInTableToolbar

export const RegisterTagsTableToolbar = (props: RegistersTagsToolbarProps) => {

    const classes = useToolbarStyles();
    const currentUser = useContext(AuthContext)
    


    return (
        <>
            {/*====Sign Out==========================================================================================================  */}
            {Object.values(currentUser)[0] ? (<Button
                color="primary"
                variant="contained"
                onClick={() => auth.signOut()}
            >
                Signout
            </Button>) : (<>
                <Redirect to="/" />
            </>)}

            {/* <Button
            color="primary"
            variant="contained"
          >
            Import CSV for Mutiple Tag scanning 
          </Button> */}


            <Toolbar
                className={clsx(classes.root, {
                    [classes.highlight]: props.numSelected > 0,
                })}
            >
                {props.numSelected > 0 ? (
                    <Typography className={classes.title} color="inherit" variant="subtitle1" component="div">
                        {props.numSelected} selected
                    </Typography>
                ) : (
                        <Typography className={classes.nfcTitle} variant="h6" id="tableTitle" component="div">
                            Register Tags Table
                        </Typography>
                    )}

                {props.numSelected > 0 ? (
                    <Tooltip title="Download Excel CSV">



                        <IconButton aria-label="Download_Excel_CSV">
                            {/* propsType =============================================================== */}
                            {/* onClick={()=> console.log('123')} if I place onCLick function in it, I should place a type */}
                            <DescriptionIcon />
                        </IconButton>
                    </Tooltip>
                ) : (
                        <Tooltip title="Filter list">
                            <IconButton aria-label="filter list">

                                <FilterListIcon />

                            </IconButton>
                        </Tooltip>
                    )}
            </Toolbar>

        </>
    );

}

