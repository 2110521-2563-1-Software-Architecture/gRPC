import React, { useEffect } from "react";
import MaterialTable, { Column } from "material-table";
import Axios, { AxiosResponse } from "axios";
import { makeStyles } from '@material-ui/core/styles';
import TreeView from '@material-ui/lab/TreeView';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import TreeItem from '@material-ui/lab/TreeItem';


const useStyles = makeStyles({
  root: {
    height: 150,
    flexGrow: 1,
    maxWidth: 1000,
  },
});

interface Book {
  _id: string;
  author: string;
  title: string;
}

interface TableState {
  columns: Array<Column<Book>>;
  data: Book[];
}

const api = Axios.create({
  baseURL: "http://localhost:3000/book",
});

export default function AssignmentI() {
  const classes = useStyles();

  return (
    <TreeView
      className={classes.root}
      defaultCollapseIcon={<ExpandMoreIcon />}
      defaultExpandIcon={<ChevronRightIcon />}
    >
      <TreeItem nodeId="2" label="LIST INSERT DELETE">
        <Table / >
      </TreeItem>
      <TreeItem nodeId="5" label="Documents">
        <TreeItem nodeId="10" label="OSS" />
        <TreeItem nodeId="6" label="Material-UI">
          <TreeItem nodeId="7" label="src">
            <TreeItem nodeId="8" label="index.js" />
            <TreeItem nodeId="9" label="tree-view.js" />
          </TreeItem>
        </TreeItem>
      </TreeItem>
    </TreeView>
  );
}

  function Table() {
  const [state, setState] = React.useState<TableState>({
    columns: [
      { title: "BOOK ID", field: "_id" },
      { title: "BOOK Author", field: "author" },
      { title: "BOOK Title", field: "title" },
    ],
    data: [],
  });

  // axios get
  const getBook = async (id: string) => {
    await api
      .get(`/${id}`)
      .then((response : AxiosResponse)=>{
        const book = response.data
        const ind = state.data.findIndex((bk : Book)=> bk._id === book._id)
        setState((prevState: TableState)=> {
          prevState.data[ind] = book
          return { ...prevState };
        })
      })
      .catch((err) => {
        alert(err);
      });
  }

  // axios list
  const getBooks = async () => {
    await api
      .get("/")
      .then((response) => {
        setState((prevState) => {
          let data = response.data;
          return { ...prevState, data };
        });
      })
      .catch((err) => {
        alert(err);
      });
  };

  // axios delete
  const deleteBook = async (book: Book) => {
    await api
      .delete(`/${book._id}`)
      .then((response: AxiosResponse) => {
        if(! response.status) {
          alert("error " + response.status)
          return 
        }
        setState((prevState) => {
          const data = [...prevState.data];
          data.splice(data.indexOf(book), 1);
          return { ...prevState, data };
        });
      })
      .catch((err) => {
        alert(err);
      });
  };

  // axios add
  const addBook = async (book: Book) => {
    await api
      .post("/", book)
      .then((response) => {
        setState((prevState) => {
          const data = [...prevState.data];
          data.push(response.data);
          return { ...prevState, data };
        });
      })
      .catch((err) => {
        alert(err);
      });
  };
  useEffect(() => {
    getBooks();
  }, []);

  interface sth {
    [key: string]: string;
  }

  return (
      <MaterialTable
      title="Book List"
      columns={state.columns}
      data={state.data}
      options={{ actionsColumnIndex: -1 }}
      actions={[
        {
          icon: 'update',
          tooltip: 'Update Info',
          onClick: (event, rowData) => {
            getBook((rowData as Book)._id)
            // way 0
            // if ("_id" in rowData) {
            //   getBook(rowData._id)
            // }

            // way1
            // if(!Array.isArray(rowData)){
            //   getBook(rowData._id)
            // }

            // way2
            // function checkObjectHasKeyId(object: Book | Book[]): object is Book {
            //   return '_id' in object;
            // }
            // if(checkObjectHasKeyId(rowData)) {
            //   getBook(rowData._id)
            // }
          }
        }
      ]}
      editable={{
        onRowAdd: (newData: Book) =>
          new Promise((resolve) => {
            resolve();
            setTimeout(() => {
              resolve();
              addBook(newData);
            }, 600);
          }),
        onRowUpdate: (newData, oldData) =>
          new Promise((resolve) => {
            setTimeout(() => {
              resolve();
              if (oldData) {
                setState((prevState) => {
                  const data = [...prevState.data];
                  data[data.indexOf(oldData)] = newData;
                  return { ...prevState, data };
                });
              }
            }, 600);
          }),
        onRowDelete: (oldData: Book) =>
          new Promise((resolve) => {
            setTimeout(() => {
              resolve();
              deleteBook(oldData);
            }, 600);
          }),
      }}
    />
    
  );
}
