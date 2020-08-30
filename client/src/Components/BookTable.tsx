import React, { useEffect } from "react";
import MaterialTable, { Column } from "material-table";
import Axios from "axios";

interface Book {
  id: string;
  title: string;
  author: string;
}
interface Book {
  id: string;
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

export default function BookTable() {
  const [state, setState] = React.useState<TableState>({
    columns: [
      { title: "BOOK ID", field: "id" },
      { title: "BOOK Author", field: "author" },
      { title: "BOOK Title", field: "title" },
    ],
    data: [],
  });
  const res = [
    { id: "ASN10002", author: "Baran", title: "Place around smsdw asdkk2" },
    {
      id: "ASN10003",
      author: "Baran",
      title: "rmfs kasima ssomo tidy",
    },
  ];

  const getBook = (bookID: string) => {
    // axiso get
    // {}
  };
  const getBooks = async () => {
    // axios list
    await api
      .get("/all")
      .then((respone) => {
        setState((prevState) => {
          let data = res;
          return { ...prevState, data };
        });
      })
      .catch((err) => {
        alert(err);
        setState((prevState) => {
          let data = res;
          return { ...prevState, data };
        });
      });
  };
  const deleteBook = async (book: Book) => {
    await api
      .delete(`/${book.id}`)
      .then((respone) => {
        setState((prevState) => {
          const data = [...prevState.data];
          data.splice(data.indexOf(book), 1);
          return { ...prevState, data };
        });
      })
      .catch((err) => {
        alert(err);
        setState((prevState) => {
          const data = [...prevState.data];
          data.splice(data.indexOf(book), 1);
          return { ...prevState, data };
        });
      });
  };
  const addBook = async (book: Book) => {
    // axios
    await api
      .post("/", { data: book })
      .then((respone) => {
        setState((prevState) => {
          const data = [...prevState.data];
          data.push(book);
          return { ...prevState, data };
        });
      })
      .catch((err) => {
        alert(err);
        setState((prevState) => {
          const data = [...prevState.data];
          data.push(book);
          return { ...prevState, data };
        });
      });
  };
  useEffect(() => {
    getBooks();
  }, []);

  return (
    <MaterialTable
      title="Book List"
      columns={state.columns}
      data={state.data}
      options={{ actionsColumnIndex: -1 }}
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
