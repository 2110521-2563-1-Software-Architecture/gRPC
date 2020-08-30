import React from "react";
import axios from "axios";
export default class BookList extends React.Component {
  state = {
    books: [],
  };

  componentDidMount() {
    axios.get("https://jsonplaceholder.typicode.com/users").then((res) => {
      console.log(res);
      this.setState({ books: res.data });
    });
  }

  render() {
    return (
      <ul>
        {this.state.books.map((book) => (
          <li>{book.name}</li>
        ))}
      </ul>
    );
  }
}
