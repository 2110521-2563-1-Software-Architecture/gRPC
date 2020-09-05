import React, { useEffect } from "react";
import MaterialTable, { Column } from "material-table";
import Axios, { AxiosResponse } from "axios";
import { makeStyles } from '@material-ui/core/styles';
import TreeView from '@material-ui/lab/TreeView';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import TreeItem from '@material-ui/lab/TreeItem';


interface Book {
  _id: string;
  author: string;
  title: string;
}

interface TableState {
  columns: Array<Column<Book>>;
  data: Book[];
}


interface Api {
  listBook() : Promise<Book[]>  
  getBook(id: string) : Promise<Book>
  insertBook(book: Book) : Promise<Book>,
  deleteBook(id: string) : Promise<Book> 
}

const api = Axios.create({
  baseURL: "http://localhost:3000/book",
});

class RestAPI implements Api {
  async listBook() {
    return (await api.get<Book[]>("/")).data
  }

  async getBook(id : string) {
    return (await api.get<Book>(`/${id}`)).data
  }
  async insertBook(book: Book) {
    return (await api.post("/",book)).data
  }

  async deleteBook(id: string) {
    return (await api.delete(`/${id}`)).data
  }

}

const API : Api = new RestAPI

const useStyles = makeStyles({
  root: {
    height: 150,
    flexGrow: 1,
    maxWidth: 1000,
  },
});

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
    await API.getBook(id)
      .then((book : Book)=>{
        const data = state.data.map((bk : Book)=> {
          if(bk._id == book._id) {
            return book
          } else {
            return bk
          }
        })
        setState((prevState)=> {
          return { ...prevState, data };
        })
      })
      .catch((err) => {
        alert(err);
      });
  }

  // axios list
  const getBooks = async () => {
    await API
      .listBook()
      .then((books : Book[]) => {
        setState((prevState) => {
          let data = books;
          return { ...prevState, data };
        });
      })
      .catch((err) => {
        alert(err);
      });
  };

  // axios delete
  const deleteBook = async (book: Book) => {
    await API
      .deleteBook(book._id)
      .then((deletedBook: Book) => {
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

  // axios insert
  const addBook = async (book: Book) => {
    await API.insertBook(book)
      .then((addedBook: Book) => {
        setState((prevState) => {
          const data = [...prevState.data];
          data.push(addedBook);
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

export default function AssignmentI() {
  const classes = useStyles();

  return (
    <TreeView
      className={classes.root}
      defaultCollapseIcon={<ExpandMoreIcon />}
      defaultExpandIcon={<ChevronRightIcon />}
    >
      <TreeItem nodeId="2" label="GET LIST INSERT DELETE">
        <Table / >
      </TreeItem>
      {/* <TreeItem nodeId="5" label="Documents">
        <TreeItem nodeId="10" label="OSS" />
        <TreeItem nodeId="6" label="Material-UI">
          <TreeItem nodeId="7" label="src">
            <TreeItem nodeId="8" label="index.js" />
            <TreeItem nodeId="9" label="tree-view.js" />
          </TreeItem>
        </TreeItem>
      </TreeItem> */}
    </TreeView>
  );
}
