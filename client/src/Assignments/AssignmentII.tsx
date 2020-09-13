import React from "react";
import Axios from "axios";
import { makeStyles } from '@material-ui/core/styles';
import TreeView from '@material-ui/lab/TreeView';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import TreeItem from '@material-ui/lab/TreeItem';
import Button from '@material-ui/core/Button';


interface Book {
  _id: string,
  id: string;
  author: string;
  title: string;
}

interface BenchmarkState {
  benchmarkNumber: number;
  responseTime: number;
  isLoadingRest: boolean;
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

function Benchmark() {
  const [state, setState] = React.useState<BenchmarkState>({
    benchmarkNumber: 100,
    responseTime: 0,
    isLoadingRest: false
  });
  const getBookList = async () => {
    setState((prevState)=> {
      return { ...prevState, isLoadingRest: true };
    })
    try {
      let sendDate = (new Date()).getTime();

      const pendingPromises = []
      for (let i = 0; i < state.benchmarkNumber; i++) {
        pendingPromises.push(new Promise((res, err) => {
          return res(API.listBook());
        }));
      }
      await Promise.all(pendingPromises);

      let receive = (new Date()).getTime();
        let responseTimeMs = receive - sendDate;
        setState((prevState) => {
          return {...prevState, responseTime: responseTimeMs }
        });
    } catch(err) {
      alert(err);
    }
    setState((prevState)=> {
      return { ...prevState, isLoadingRest: false };
    })
  };
  return (
    <span
    style={{
      marginTop: '5vmin',
      display: 'flex',
    }}>
      <Button variant="contained" onClick={getBookList} disabled={state.isLoadingRest}>getBook</Button>
      <p style={{ marginLeft: '5vmin'}}>{`${state.responseTime} ms`}</p>
    </span>
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
        <Benchmark/>
      </TreeItem>
    </TreeView>
  );
}
