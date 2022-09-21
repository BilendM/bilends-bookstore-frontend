import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { Book } from "./interfaces";

const Update = () => {
  const id = useParams<{ id: string }>().id;
  const navigate = useNavigate();

  const [book, setBook] = useState<Book>({
    title: "",
    desc: "",
    price: null,
    cover: "",
  });

  useEffect(() => {
    getBook();
  }, [id]);

  const getBook = async () => {
    console.log("Get Boook");

    try {
      const res = await axios.get(
        `https://bilends-bookstore-backend-production.up.railway.app/books/${id}`
      );
      const { data } = res;
      console.log("data", data);
      setBook((prev) => ({ ...prev, ...data }));
    } catch (error) {
      console.log("error", error);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setBook((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await axios.put(
        `https://bilends-bookstore-backend-production.up.railway.app/books/${id}`,
        book
      );
      console.log("res", res);
      navigate("/");
    } catch (error) {
      console.log("error :>> ", error);
    }
  };

  return (
    <div className="form">
      <h1>Update Book</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Book Title"
          value={book.title}
          onChange={handleChange}
          required
          name="title"
        />
        <input
          type="text"
          placeholder="Description"
          value={book.desc}
          onChange={handleChange}
          required
          name="desc"
        />
        <input
          type="number"
          value={book.price === null ? 0 : Number(book.price)}
          step="any"
          placeholder="price"
          onChange={handleChange}
          required
          name="price"
        />
        <input
          type="text"
          placeholder="Cover URL"
          value={book.cover}
          onChange={handleChange}
          name="cover"
        />
        <button type="submit">Update Book</button>
      </form>
    </div>
  );
};

export default Update;
