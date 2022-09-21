import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Book } from "./interfaces";

const Books = () => {
  const [books, setBooks] = useState<Book[] | null>([]);
  useEffect(() => {
    getBooks();
  }, []);

  const getBooks = async () => {
    try {
      const res = await axios.get(
        "https://bilends-bookstore-backend-production.up.railway.app/books"
      );
      const { data } = res;
      setBooks(data);
    } catch (error) {
      console.log("error", error);
    }
  };

  const handleDelete = async (id: number) => {
    try {
      await axios.delete(
        `https://bilends-bookstore-backend-production.up.railway.app/books/${id}`
      );
      getBooks();
    } catch (error) {
      console.log("error :>> ", error);
    }
  };

  return (
    <>
      <h1 className="title">Bilend's Bookshop</h1>
      <div className="books">
        {books?.map((book) => {
          console.log("book :>> ", book);
          return (
            <div className="book" key={book.id}>
              {book.cover && <img src={book.cover} alt={book.title} />}
              <h2>{book.title}</h2>
              <p>{book.desc}</p>
              <span>{book.price}</span>
              <div className="buttons">
                <button
                  className="delete"
                  onClick={() => !!book.id && handleDelete(book.id)}
                >
                  Delete
                </button>
                <Link to={`/update/${book.id}`}>
                  <button className="update">Update</button>
                </Link>
              </div>
            </div>
          );
        })}
      </div>
      <Link to="/add">
        <button style={{ marginTop: "20px" }}>Add New Book</button>
      </Link>
    </>
  );
};

export default Books;
