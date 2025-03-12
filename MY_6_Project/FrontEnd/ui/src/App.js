import React, { useEffect, useState } from "react";

const App = () => {
  const [apires, SetApiRes] = useState('no response');
  const [rejisterData, SetRejisterData] = useState({
    username: "",
    email: "",
    password: '',
    gender: '',
    age: ''
  })

  const [LoginData, SetLoginData] = useState({
    email: "",
    password: ''
  })

  const [userData, setUserData] = useState('No User Data');

  const checkApi = () => {
    fetch('http://localhost:8000', {
      method: 'GET'
    })
      .then(res => res.json())
      .then(data => {
        // console.log(data.message)
        SetApiRes(data.message)
      })
      .catch(err => console.log(err));
  }

  // when the page is reload this Api will call automatically
  useEffect(() => {
    checkApi()
  }, [])

  // btn function, handle the user
  const handleRejister = async () => {

    fetch("http://localhost:8000/rejister", {
      method: "POST",
      headers: {
        "Content-Type": "application/json", // Ensure JSON is being sent
      },
      body: JSON.stringify(rejisterData), // Convert data to JSON format
    })

      .then(res => res.json())
      .then(data => {
        alert(data.message)
        
      })
      .catch(err => console.log(err))
  }

  const handleLogin = async () => {

    fetch("http://localhost:8000/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json", // Ensure JSON is being sent
      },
      body: JSON.stringify(LoginData), // Convert data to JSON format
    })

      .then(res => res.json())
      .then(data => {
        alert(data.message)
        console.log(data.token);
        localStorage.setItem('token',data.token)
      })
      .catch(err => console.log(err))
  }

  const getToken = () =>{
    const token = localStorage.getItem('token')
      console.log(token);
  }

  const getUserData = () => {
    const token = localStorage.getItem('token');  
    fetch('http://localhost:8000/getProfile', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': ` ${token}`
      },
    })
    .then(res => res.json())
    .then(data => {
      console.log('User Data:', data); // Debugging line
      setUserData(data);
    })
    .catch(err => console.log('Error fetching user data:', err));
  };
  
  return (
    // <div className="App">
    //   {/* <div className="bg-white p-6 rounded-2xl shadow-lg max-w-sm">
    //     <h2 className="text-2xl font-bold text-gray-800">Welcome</h2>
    //     <p className="text-gray-600 mt-2">

    //     {apires} 
    //     apires was variable 

    //     </p>
    //     <button className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600">
    //       Click Me
    //     </button>
    //   </div> */}

    //   {/* Rejister Api */}
    //   <h1>Rejister Form </h1> <br/>
    //     <input type="text" placeholder="Enter your Name"></input><br/>
    //     <input type="email" placeholder="Enter your Email"></input><br/>
    //     <input type="password" placeholder="Enter your Password"></input><br/>
    //     <input type="age" placeholder="Enter your Age"></input><br/>
    //     <select>
    //       <option value="Male"> Male</option>
    //       <option value="Female">Female</option>
    //       <option value="Other">Other</option>
    //     </select>
    // </div>
    <>
      <div className="flex justify-center items-center min-h-screen bg-gray-100">
        <div className="bg-white p-6 md:p-8 rounded-lg shadow-lg w-80 md:w-96">
          <h1 className="text-2xl font-bold text-center mb-4">Register Form</h1>
          <input
            type="text"
            placeholder="Enter your Name"
            className="w-full p-2 mb-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            onChange={(e) => {
              SetRejisterData({ ...rejisterData, username: e.target.value })
            }}
          />

          <input
            type="text"
            placeholder="Enter your Email"
            className="w-full p-2 mb-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            onChange={(e) => {
              SetRejisterData({ ...rejisterData, email: e.target.value })
            }}
          />

          <input
            type="text"
            placeholder="Enter your Password"
            className="w-full p-2 mb-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            onChange={(e) => {
              SetRejisterData({ ...rejisterData, password: e.target.value })
            }}
          />

          <input
            type="number"
            placeholder="Enter your Age"
            className="w-full p-2 mb-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            onChange={(e) => {
              SetRejisterData({ ...rejisterData, age: e.target.value })
            }}
          />
          <input
            type="text"
            placeholder="Enter your Gender"
            className="w-full p-2 mb-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            onChange={(e) => {
              SetRejisterData({ ...rejisterData, gender: e.target.value })
            }}
          />

          {/* <select
            className="w-full p-2 mb-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            onChange={(e) => {
              SetRejisterData({ ...rejisterData, gender: e.target.value });
            }}
          >
            <option value="">Select Gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
          </select> */}

          <button className="w-full bg-blue-500 text-white p-2 rounded-lg hover:bg-blue-600 transition"
            onClick={handleRejister}>
            Register
          </button>
        </div>
      </div>

      <br />
      <div className="flex justify-center items-center min-h-screen bg-gray-100">
        <div className="bg-white p-6 md:p-8 rounded-lg shadow-lg w-80 md:w-96">
          <h1 className="text-2xl font-bold text-center mb-4">Login</h1>

          {/* Email Input */}
          <input
            type="email"
            placeholder="Enter your Email"
            className="w-full p-2 mb-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            onChange={(e) => SetLoginData({ ...LoginData, email: e.target.value })}
          />

          {/* Password Input */}
          <input
            type="password"
            placeholder="Enter your Password"
            className="w-full p-2 mb-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            onChange={(e) => SetLoginData({ ...LoginData, password: e.target.value })}
          />

          {/* Login Button */}
          <button
            className="w-full bg-blue-500 text-white p-2 rounded-lg hover:bg-blue-600 transition"
            onClick={handleLogin}
          >
            Login
          </button>
          <br/>
          <br/>
         <h1 className="text-center mb-2">  Get Saved Token  </h1>
          <button
            className="w-full bg-blue-500 text-white p-2 rounded-lg hover:bg-blue-600 transition"
            onClick={getToken}
          >
            Get Token   
          </button>

          <h1 className="text-center mt-4 mb-2">  Get User Data  </h1>
         
          <button 
           className="w-full bg-blue-500 text-white p-2 rounded-lg hover:bg-blue-600 transition"

           onClick={getUserData}>
            Get Data 
          </button>
          <h1 className="text-center mt-4 mb-2"> User Data </h1>
          <p>Name : {userData?.username || "No data"}</p>
          <p>Email : {userData?.email || "No data"}</p>
          <p>Password : {userData?.password ? "•".repeat(10) : "No data"}</p>
          <p>Age :{userData?.age || "No data"}</p>
          <p>Gender : {userData?.gender || "No data"}</p>

        </div>
      </div>
    </>
  );
};

export default App;







// import { useState, useEffect } from "react";
// import axios from "axios";

// function App() {
//   const [users, setUsers] = useState([]);
//   const [view, setView] = useState("login");

//   // Fetch Users API
//   useEffect(() => {
//     axios.get("http://localhost:8000/users")
//       .then(res => setUsers(res.data))
//       .catch(err => console.error(err));
//   }, []);

//   return (
//     <div className="flex items-center justify-center min-h-screen bg-gray-100">
//       {view === "login" ? <Login setView={setView} /> : <Signup setView={setView} />}
//     </div>
//   );
// }

// export default App;

// // Login Component
// function Login({ setView }) {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");

//   const handleLogin = async (e) => {
//     e.preventDefault();
//     try {
//       const res = await axios.post("http://localhost:8000/login", { email, password });
//       alert(res.data.message);

//       // Navigate to the URL after successful login
//       window.location.href = "https://fuuast-bms.web.app/";
//     } catch (err) {
//       alert("Invalid Credentials");
//     }
//   };

//   return (
//     <div className="w-96 p-6 bg-white shadow-lg rounded-lg">
//       <h2 className="text-2xl font-bold mb-4 text-center">Login</h2>
//       <form onSubmit={handleLogin} className="space-y-4">
//         <input 
//           type="email" placeholder="Email" value={email}
//           onChange={(e) => setEmail(e.target.value)}
//           className="w-full p-2 border rounded"
//         />
//         <input 
//           type="password" placeholder="Password" value={password}
//           onChange={(e) => setPassword(e.target.value)}
//           className="w-full p-2 border rounded"
//         />
//         <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded">
//           Login
//         </button>
//       </form>
//       <p className="mt-4 text-center">
//         Don't have an account?{" "}
//         <button className="text-blue-600" onClick={() => setView("signup")}>Sign up</button>
//       </p>
//     </div>
//   );
// }

// // Signup Component
// function Signup({ setView }) {
//   const [username, setUsername] = useState("");
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");

//   const handleSignup = async (e) => {
//     e.preventDefault();
//     try {
//       const res = await axios.post("http://localhost:8000/rejister", { username, email, password });
//       alert(res.data.message);
//       setView("login");
//     } catch (err) {
//       alert("Signup Failed");
//     }
//   };

//   return (
//     <div className="w-96 p-6 bg-white shadow-lg rounded-lg">
//       <h2 className="text-2xl font-bold mb-4 text-center">Sign Up</h2>
//       <form onSubmit={handleSignup} className="space-y-4">
//         <input 
//           type="text" placeholder="Username" value={username}
//           onChange={(e) => setUsername(e.target.value)}
//           className="w-full p-2 border rounded"
//         />
//         <input 
//           type="email" placeholder="Email" value={email}
//           onChange={(e) => setEmail(e.target.value)}
//           className="w-full p-2 border rounded"
//         />
//         <input 
//           type="password" placeholder="Password" value={password}
//           onChange={(e) => setPassword(e.target.value)}
//           className="w-full p-2 border rounded"
//         />
//         <button type="submit" className="w-full bg-green-500 text-white py-2 rounded">
//           Sign Up
//         </button>
//       </form>
//       <p className="mt-4 text-center">
//         Already have an account?{" "}
//         <button className="text-blue-600" onClick={() => setView("login")}>Login</button>
//       </p>
//     </div>
//   );
// }
