
import Axios from "axios";
import React, { useEffect } from "react";
import MaterialTable, { Column } from "material-table";
import Axios, { AxiosInstance } from "axios";
import { makeStyles } from '@material-ui/core/styles';
import TreeView from '@material-ui/lab/TreeView';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import TreeItem from '@material-ui/lab/TreeItem';


// import Api from './AssignmentI'
import api from '../utils/API'
const API  = new RestAPI(api)
const useStyles = makeStyles({
    root: {
      height: 150,
      flexGrow: 1,
      maxWidth: 1000,
    },
});

export default function AssignmentII() {
    const classes = useStyles();
  
    return (
      <TreeView
        className={classes.root}
        defaultCollapseIcon={<ExpandMoreIcon />}
        defaultExpandIcon={<ChevronRightIcon />}
      >
        <TreeItem nodeId="2" label="SCENARIO I : ">
            Hi Scenario I
            <Table />
        </TreeItem>
        <TreeItem nodeId="3" label="SCENARIO II : ">
            Hi Scenario II
        </TreeItem>
        <TreeItem nodeId="4" label="SCENARIO III : ">
            Hi Scenario III
        </TreeItem>
        <TreeItem nodeId="5" label="SCENARIO IV : ">
            Hi Scenario IV
        </TreeItem>
      </TreeView>
    );
  }
  
