import React, { useState } from 'react';
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from './firebase';

interface LoginProps {
  setRegister: (register:boolean)=>void;
}

const Login: React.FC<LoginProps> = ( {setRegister} ) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      console.log("User logged in successfully");
    } catch (error) {
      alert(`Error logging in: ${error}`);
    }
  };

  return (
    <div>
        <form onSubmit={handleLogin}>
        <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            required
            style={inputStyle}
        />
        <br/>
        <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            required
            style={inputStyle}
        />
        <br/>
        <button type="submit">Login</button>
        </form>
        <button onClick={()=>setRegister(true)}>Don't have an account?</button>

    </div>
  );
};

export const inputStyle = {
  border: '1px solid black',
  margin: '5px'
}

export default Login;