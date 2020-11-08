import './App.css';
import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  NavLink,
  Link,
  useParams,
  useRouteMatch,
  useLocation,
  Prompt,
  useHistory,
} from "react-router-dom";

function App({ bookFacade }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  let history = useHistory();

  const setLoginStatus = status => {
    setIsLoggedIn(status);
    history.push("/");
  };
  return (
    <div>
      <Header
        loginMsg={isLoggedIn ? "Logout" : "Login"}
        isLoggedIn={isLoggedIn}
      />
      <Switch>
        <Route exact path="/">
          <Home />
        </Route>
        <Route path="/products">
          <Products bookFacade={bookFacade} />
        </Route>
        <Route path="/add-book">
          <AddBook bookFacade={bookFacade} />
        </Route>
        <Route path="/find-book">
          <FindBook bookFacade={bookFacade} />
        </Route>
        <Route path="/company">
          <Company />
        </Route>
        <Route path="/login-out">
          <Login
            loginMsg={isLoggedIn ? "Logout" : "Login"}
            isLoggedIn={isLoggedIn}
            setLoginStatus={setLoginStatus}
          />
        </Route>
        <Route>
          <NoMatch />
        </Route>
      </Switch>
    </div>

  );
}

function Header({ isLoggedIn, loginMsg }) {
  return (
    <ul className="header">
      <li>
        <NavLink exact activeClassName="active" to="/">
          Home
          </NavLink>
      </li>
      <li>
        <NavLink activeClassName="active" to="/products">
          Products
          </NavLink>
      </li>
      {isLoggedIn && (
        <>
          <li>
            <NavLink activeClassName="active" to="/add-book">
              Add Book
          </NavLink>
          </li>
          <li>
            <NavLink activeClassName="active" to="/find-book">
              Find Book
          </NavLink>
          </li>
        </>
      )}
      <li>
        <NavLink activeClassName="active" to="/company">
          Company
          </NavLink>
      </li>
      <li>
        <NavLink activeClassName="active" to="/login-out">
          {loginMsg}
        </NavLink>
      </li>
    </ul>

  )
}

function Home() {
  return (
    <h2>Home</h2>
  )
};

function Products({ bookFacade }) {
  let { path, url } = useRouteMatch();

  const books = bookFacade.getBooks().map((book) => (
    <li key={book.id}>
      {book.title} <Link to={`${url}/${book.id}`}>details</Link>
    </li>
  ));

  return (
    <div>
      <h2>Products</h2>
      <h3>Books in library: {bookFacade.getBooks().length}</h3>
      <ul>
        {books}
      </ul>

      <Switch>
        <Route exact path={path}>
          <h3>Book Details</h3>
        </Route>
        <Route path={`${path}/:id`}>
          <Details bookFacade={bookFacade} />
        </Route>
      </Switch>
    </div>
  )

  function Details({ bookFacade }) {
    let { id } = useParams();

    const book = bookFacade.findBook(id);

    return (
      <div style={{ border: "2px solid black" }}>
        <p>Title: {book.title}</p>
        <p>Id: {book.id}</p>
        <p>Info: {book.info}</p>
      </div>
    )
  };
};

function AddBook({ bookFacade }) {
  const initialValue = {
    id: 0,
    title: "",
    info: ""
  };

  const [book, setBook] = useState(initialValue);

  let [isBlocking, setIsBlocking] = useState(false);

  const handleChange = event => {
    const target = event.target;
    const value = target.value;
    const name = target.name;
    setBook({ ...book, [name]: value });
    setIsBlocking(value.length > 0);
  };

  const handleSubmit = event => {
    event.preventDefault();
    bookFacade.addBook(book);
    setBook(initialValue);
    setIsBlocking(false);
  };

  return (
    <div>
      <h2>Add book</h2>
      <form onSubmit={handleSubmit}>
        <Prompt
          when={isBlocking}
          message={location =>
            `Are you sure you want to go to ${location.pathname}?`
          }
        />
        <p>
          {isBlocking ? "Remember to save before leaving the page" : "Feel free to add whichever book you like"}
        </p>
        <input
          name="title"
          value={book.title}
          onChange={handleChange}
          placeholder="Add title"
        />
        <br />
        <input
          name="info"
          value={book.info}
          onChange={handleChange}
          placeholder="Add info"
        />
        <br />
        <button type="submit" value="Submit">Save</button>
      </form>
    </div>
  )
};

function FindBook({ bookFacade }) {
  const [bookId, setBookId] = useState("");
  const [book, setBook] = useState(null);

  const handleFind = event => {
    const target = event.target;
    const value = target.value;
    setBookId(value);
  };

  const handleSubmit = event => {
    event.preventDefault();
    setBook(bookFacade.findBook(bookId));
  };

  const handleDelete = id => {
    bookFacade.deleteBook(id);
    setBook(null);
    setBookId("");
  }

  return (
    <div>
      <h2>Find book</h2>
      <form onSubmit={handleSubmit}>
        <input
          name="bookId"
          type="number"
          value={bookId}
          onChange={handleFind}
          placeholder="Enter book id"
        />
        <button type="submit">Find book</button>
      </form>
      <div>
        {book && (
          <div>
            <p>Id: {book.id}</p>
            <p>Title: {book.title}</p>
            <p>Info: {book.info}</p>
            <div>
              <button type="submit" onClick={() => handleDelete(book.id)}>Delete book</button>
            </div>
            <div>
              <EditBook bookFacade={bookFacade} book={book} findSubmit={handleSubmit} />
            </div>
          </div>
        )}
        {!book && <p>No book</p>}
      </div>
    </div>
  )

  function EditBook({ bookFacade, book, findSubmit }) {
    const [editedBook, setEditedBook] = useState(book);

    const handleChange = event => {
      const target = event.target;
      const value = target.value;
      const name = target.name;
      setEditedBook({ ...editedBook, [name]: value });
    };

    const handleSubmit = event => {
      event.preventDefault();
      bookFacade.editBook(editedBook);
      findSubmit(event);
    };

    return (
      <div>
        <h2>Edit Book</h2>
        <form onSubmit={handleSubmit}>

          <input
            name="title"
            value={editedBook.title}
            onChange={handleChange}
            placeholder="Add new title"
          />
          <br />
          <input
            name="info"
            value={editedBook.info}
            onChange={handleChange}
            placeholder="Add new info"
          />
          <br />
          <button type="submit" value="Submit">Edit</button>
        </form>
      </div>
    )
  };
};

function Company() {
  return (
    <h2>Company</h2>
  )
};

function Login({ isLoggedIn, loginMsg, setLoginStatus }) {
  const handleBtnClick = () => {
    setLoginStatus(!isLoggedIn);
  };

  return (
    <div>
      <h2>{loginMsg}</h2>
      <em>This simulates a real login page. Here you just need to press the button. </em>
      <em>In a real application you obviously will need to add your credentials, and login via the server</em>
      <br />
      <button onClick={handleBtnClick}>{loginMsg}</button>
    </div>
  )
}

function NoMatch() {
  let location = useLocation();

  return (
    <h2>No match for {location.pathname}</h2>
  )
};



export default App;
