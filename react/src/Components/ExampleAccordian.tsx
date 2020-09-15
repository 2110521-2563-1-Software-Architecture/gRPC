import React, { useEffect } from "react";

import MuiAccordion from '@material-ui/core/Accordion';
import MuiAccordionSummary from '@material-ui/core/AccordionSummary';
import MuiAccordionDetails from '@material-ui/core/AccordionDetails';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import Axios, { AxiosResponse } from "axios";

const api = Axios.create({
    baseURL: "http://localhost:3000/book",
  });

const Accordion = withStyles({
    root: {
      border: '1px solid rgba(0, 0, 0, .125)',
      boxShadow: 'none',
      '&:not(:last-child)': {
        borderBottom: 0,
      },
      '&:before': {
        display: 'none',
      },
      '&$expanded': {
        margin: 'auto',
      },
    },
    expanded: {},
  })(MuiAccordion);
  
  const AccordionSummary = withStyles({
    root: {
      backgroundColor: 'rgba(0, 0, 0, .03)',
      borderBottom: '1px solid rgba(0, 0, 0, .125)',
      marginBottom: -1,
      minHeight: 56,
      '&$expanded': {
        minHeight: 56,
      },
    },
    content: {
      '&$expanded': {
        margin: '12px 0',
      },
    },
    expanded: {},
  })(MuiAccordionSummary);
  
  const AccordionDetails = withStyles((theme) => ({
    root: {
      padding: theme.spacing(2),
    },
  }))(MuiAccordionDetails);
  
  interface Book {
    _id: string;
    author: string;
    title: string;
}

  function CustomizedAccordions() {
    const [expanded, setExpanded] = React.useState<string | false>('panel1');
    
    const [books, setBooks] = React.useState<Array<Book>>([]);
    // const [accordList, setAccords] = React.useState([]);
  
    const getBook = (bookID: string) => {
      // axiso get
      // {}
    };
    const getBooks = async () => {
      // axios list
      await api
        .get("/")
        .then((response :AxiosResponse) => {
          // console.log(response.data)
          setBooks(response.data);
          // const accordionList : Array<any> = response.data.map(book=> 
          //   <li key={book._id}>
          //         <Accordion square expanded={expanded === 'panel1'} onChange={handleChange('panel1')}>
          //       <AccordionSummary aria-controls="panel1d-content" id="panel1d-header">
          //         <Typography>Book ID : {book._id}</Typography>
          //       </AccordionSummary>
          //       <AccordionDetails>
          //         <Typography>
          //           Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex,
          //           sit amet blandit leo lobortis eget. Lorem ipsum dolor sit amet, consectetur adipiscing
          //           elit. Suspendisse malesuada lacus ex, sit amet blandit leo lobortis eget.
          //         </Typography>
          //       </AccordionDetails>
          //     </Accordion>
          //   </li>
          // );
          // setAccords(accordionList)
        })
        .catch((err) => {
          alert(err);
        });
      
    };
    let accordionList;
    useEffect(() => {
      getBooks()
        console.log(books)
      
    }, []);
  
    const handleChange = (panel: string) => (event: React.ChangeEvent<{}>, newExpanded: boolean) => {
      setExpanded(newExpanded ? panel : false);
    };
    // const accordionList = books.map(book=> 
    //   <li key={book._id}>
    //         <Accordion square expanded={expanded === 'panel1'} onChange={handleChange('panel1')}>
    //       <AccordionSummary aria-controls="panel1d-content" id="panel1d-header">
    //         <Typography>Book ID : {book._id}</Typography>
    //       </AccordionSummary>
    //       <AccordionDetails>
    //         <Typography>
    //           Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex,
    //           sit amet blandit leo lobortis eget. Lorem ipsum dolor sit amet, consectetur adipiscing
    //           elit. Suspendisse malesuada lacus ex, sit amet blandit leo lobortis eget.
    //         </Typography>
    //       </AccordionDetails>
    //     </Accordion>
    //   </li>
    // );
    return (
      <ul>
        {
          books && books.map( (book: Book)=> 
             (<dt key={book._id}>
                   <Accordion square expanded={expanded === book._id} onChange={handleChange(book._id)}>
                 <AccordionSummary aria-controls="panel1d-content" id={book._id}>
                   <Typography>Book ID : {book._id}</Typography>
                </AccordionSummary>
                 <AccordionDetails>
                  <Typography>
                     {book.author} + {book.title}
                   </Typography>
                 </AccordionDetails>
               </Accordion>
            </dt>)
          )}
      </ul>
    );
    }