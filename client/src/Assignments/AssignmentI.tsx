import React, { useEffect, Key } from "react";
import MaterialTable, { Column } from "material-table";
import Axios from "axios";
import { makeStyles } from '@material-ui/core/styles';
import TreeView from '@material-ui/lab/TreeView';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import TreeItem from '@material-ui/lab/TreeItem';


interface Book {
  _id: string,
  id: string;
  author: string;
  title: string;
}

interface TableState {
  columns: Array<Column<Book> | {[key: string]: any}>;
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

const API : Api = new RestAPI()

const useStyles = makeStyles({
  root: {
    flexGrow: 1,
    maxWidth: 1000,
  },
  item: {
    marginTop: '5vmin',
  },
});

function Table() {
  const [state, setState] = React.useState<TableState>({
    columns: [
      { title: "BOOK ID", field: "_id", editable: 'never'},
      { title: "BOOK Author", field: "author" },
      { title: "BOOK Title", field: "title"},
    ],
    data: [],
  });

  // axios get
  const getBook = async (id: string) => {
    await API.getBook(id)
      .then((book : Book)=>{
        const data = state.data.map((bk : Book)=> {
          if(bk.id === book.id) {
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
        console.log(books)
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
    console.log(book)
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
      style={{
        marginTop: '5vmin'
      }}
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
            // if ("id" in rowData) {
            //   getBook(rowData.id)
            // }

            // way1
            // if(!Array.isArray(rowData)){
            //   getBook(rowData.id)
            // }

            // way2
            // function checkObjectHasKeyId(object: Book | Book[]): object is Book {
            //   return 'id' in object;
            // }
            // if(checkObjectHasKeyId(rowData)) {
            //   getBook(rowData.id)
            // }
          }
        }
      ]}
      editable={{
        isEditable : ()=> false,
        onRowAdd: (newData: Book) =>
          new Promise((resolve) => {
            resolve();
            setTimeout(() => {
              resolve();
              // const data:Book = { ...newData, id:""}
              addBook(newData);
            }, 100);
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
            }, 100);
          }),
        onRowDelete: (oldData: Book) =>
          new Promise((resolve) => {
            setTimeout(() => {
              resolve();
              deleteBook(oldData);
            }, 100);
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
      defaultExpanded={["1"]}
    >
      <TreeItem nodeId="1" label="GET LIST INSERT DELETE">
        <Table/>
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
