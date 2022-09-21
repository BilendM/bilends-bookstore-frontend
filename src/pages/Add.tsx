import React, { useState } from "react";
import { Book } from "./interfaces";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Add = () => {
  const [book, setBook] = useState<Book>({
    title: "",
    desc: "",
    price: null,
    cover: "",
  });

  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setBook((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        "https://bilends-bookstore-backend-production.up.railway.app//books",
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
      <h1>Add New Book</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Book Title"
          onChange={handleChange}
          required
          name="title"
        />
        <input
          type="text"
          placeholder="Description"
          onChange={handleChange}
          required
          name="desc"
        />
        <input
          type="number"
          step="any"
          placeholder="price"
          onChange={handleChange}
          required
          name="price"
        />
        <input
          type="text"
          placeholder="Cover URL"
          onChange={handleChange}
          name="cover"
        />
        <button type="submit">Add Book</button>
      </form>
    </div>
  );
};

export default Add;
