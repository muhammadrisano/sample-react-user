import logo from "./logo.svg";
import "./App.css";
import { useEffect, useState } from "react";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { increment, fetchUsers } from "./features/users/usersSlice";

function App() {
  const { count, users, isError, message, isLoading } = useSelector((state) => state.users);
  const dispatch = useDispatch();
  // const [users, setUsers] = useState([]);
  const [table, setTable] = useState({
    page: 1,
    search: "",
    filter: "",
    limit: 12,
  });
  useEffect(() => {
    // axios.get('https://randomuser.me/api', {
    //   params:{
    //     results: table.limit,
    //     ...( table.search ? {keyword: table.search}: {}),
    //     ...(table.filter ? {gender: table.filter}: {})
    //   }
    // })
    // .then((res)=>{
    //   setUsers(res.data.results)
    // })
    dispatch(
      fetchUsers({
        results: table.limit,
        ...(table.search ? { keyword: table.search } : {}),
        ...(table.filter ? { gender: table.filter } : {}),
      })
    );
  }, [table, dispatch]);
  const handleNext = () => {
    setTable((current) => ({
      ...current,
      page: current.page + 1,
    }));
  };

  const handlePrev = () => {
    setTable((current) => ({
      ...current,
      page: current.page - 1,
    }));
  };

  const handleIncrement = () => {
    dispatch(increment());
  };

  return (
    <div className="container">
      <div className="d-flex mt-5" style={{ gap: "20px" }}>
        {isError && <h2>{message}</h2>}
        <div>
          <label htmlFor="search">Search</label>
          <input
            name="search"
            type="text"
            value={table.search}
            placeholder="search"
            id="search"
            onChange={(e) => setTable({ ...table, search: e.target.value })}
          />
        </div>
        <div>
          <label htmlFor="gender">Gender</label>
          <select
            name="gender"
            id="gender"
            value={table.filter}
            onChange={(e) => setTable({ ...table, filter: e.target.value })}
          >
            <option value="">ALL</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select>
        </div>
      </div>
      <table class="table">
        <thead>
          <tr>
            <th scope="col">Username</th>
            <th scope="col">name</th>
            <th scope="col">Email</th>
            <th scope="col">Gender</th>
            <th scope="col">Tgl Registrasi</th>
          </tr>
        </thead>
        {isLoading ? (<h1>Loadingg........</h1>) : (
          <tbody>
          {users.map((item, index) => (
            <tr key={index}>
              <th scope="row">{item.login.username}</th>
              <td>
                {item.name.first} {item.name.last}
              </td>
              <td>{item.email}</td>
              <td>{item.gender}</td>
              <td>{item.registered.date}</td>
            </tr>
          ))}
        </tbody>
        )}
        
      </table>
      <button onClick={handlePrev}>prev</button>
      <span>page : {table.page}</span>
      <button onClick={handleNext}>next</button>
      <hr />

      <p>nilai count : {count}</p>
      <button onClick={handleIncrement}>increment</button>
    </div>
  );
}

export default App;
