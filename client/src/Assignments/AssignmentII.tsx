import React from "react";
import Axios from "axios";
import { makeStyles } from '@material-ui/core/styles';
import TreeView from '@material-ui/lab/TreeView';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import TreeItem from '@material-ui/lab/TreeItem';
import Button from '@material-ui/core/Button';
import BenchmarkChart from '../Components/BenchmarkChart';


interface Book {
  _id: string,
  id: string;
  author: string;
  title: string;
}

interface NewBook {
  id: string;
  author: string;
  title: string;
}

interface BenchmarkState {
  benchmarkNumbers: Array<number>;
  responseTimes: Array<object>;
  isLoadingRest: boolean;
}


interface Api {
  listBook() : Promise<Book[]>  
  getBook(id: string) : Promise<Book>
  insertBook(book: NewBook) : Promise<NewBook>,
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
  async insertBook(book: NewBook) {
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
  chart: {
    marginTop: '5vmin',
  },
});

function Benchmark() {
  const benchmarkPoints = [];
  for (let i = 1; i <= 4096; i = i + 45) {
    benchmarkPoints.push(i);
  }
  const [state, setState] = React.useState<BenchmarkState>({
    benchmarkNumbers: benchmarkPoints,
    responseTimes: [],
    isLoadingRest: false
  });
  const responseTimes: { x: number; y: number; }[] = [];
  const getBookLists = async () => {
    setState((prevState)=> {
      return { ...prevState, isLoadingRest: true };
    })
    for(let i = 0; i < state.benchmarkNumbers.length; i++) {
      const interval = state.benchmarkNumbers[i];
      try {
        const pendingPromises = []
        for (let i = 0; i < interval; i++) {
          pendingPromises.push(new Promise((res, err) => {
            return res(API.listBook());
          }));
        }
        const sendDate = (new Date()).getTime();
        await Promise.all(pendingPromises);
        const receiveDate = (new Date()).getTime();
        const timeMs = receiveDate - sendDate;
        responseTimes.push({x: interval, y: timeMs/interval});
      } catch(err) {
        alert(err);
        return;
      }
    }
    setState((prevState)=> {
      return { ...prevState, isLoadingRest: false, responseTimes};
    })
  };
  return (
    <div>
      <div>
        <Button variant="contained" onClick={getBookLists} disabled={state.isLoadingRest}>getBook</Button>
      </div>
      {/* <div>
function SingleInsertCall() {
  const [state, setState] = React.useState<BenchmarkState>({
    benchmarkNumbers: [1, 5, 10, 15, 20],
    responseTimes: [],
    isLoadingRest: false
  });

  //  The test is running on books having id more than 10000
  const clearBookData = async () => {
    console.log("clearBookData");
    try {
      let books: Book[] = await API.listBook();
      books = books.filter((book) => parseInt(book.id) > 10000);
      for (const book of books) {
        await API.deleteBook(book._id);
      }
    } catch(err) {
      alert(err);
    }
  };

  const addBook = async (book: NewBook) => {
    console.log("addBook");
    try {
      await API.insertBook(book);
    } catch(err) {
      alert(err);
    }
  };

  const runTest = async() => {
    setState((prevState) => {
      return { ...prevState, isLoadRest: true };
    });
    const responseTimes: { x: number; y: number; }[] = [];
    try {
      for(let j = 0; j < state.benchmarkNumbers.length; j++) {
        const interval = state.benchmarkNumbers[j];
        await clearBookData();
        const sendDate = (new Date()).getTime();
        for(let i = 10001;i <= 10000+interval; i++) {
          const newData: NewBook = {
            id: i.toString(),
            author: 'SingleInsertCall',
            title: 'SingleInsertCall'
          };
          await addBook(newData);
        }
        const receiveDate = (new Date()).getTime();
        const timeMs = receiveDate - sendDate;
        responseTimes.push({x: interval, y: timeMs});
      }
    } catch(err) {
      alert(err);
    }
    try {
      await clearBookData();
    } catch(err) {
      alert(err);
    }

    setState((prevState) => {
      return { ...prevState, isLoadRest: false, responseTimes };
    });
  };
  return (
    <div>
      <div>
        <Button variant="contained" onClick={runTest} disabled={state.isLoadingRest}>Single Insert Call</Button>
      </div>
      <div>
      <pre>{`intervals\ttime(ms)`}</pre>
      {
        state.responseTimes.map((sample: any) => {
        return (<pre>{`${sample.x}\t${sample.y}`}</pre>)
        })
      }
      </div>
      <BenchmarkChart data={state.responseTimes}/>
    </div>
  );
}

export default function AssignmentII() {
  const classes = useStyles();

  return (
    <TreeView
      className={classes.root}
      defaultCollapseIcon={<ExpandMoreIcon />}
      defaultExpandIcon={<ChevronRightIcon />}
      defaultExpanded={["1"]}
    >
      <TreeItem nodeId="1" label="REST API">
        <SingleInsertCall/>
        <Benchmark/>
      </TreeItem>
    </TreeView>
  );
}
