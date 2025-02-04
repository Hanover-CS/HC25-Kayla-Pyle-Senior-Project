"use client";

import React, { use, useState } from "react";
import { useRouter } from "next/navigation";

export default function LogInForm({ isHidden, closeModal }) {
  if (isHidden) {
    return null;
  }
  const [hidden, setHidden] = useState(false);
  const toggleHidden = () => {
    setHidden(!hidden);
  };
  return (
    <div>
      <LogIn
        isHidden={hidden}
        closeModal={closeModal}
        switchToSignUp={toggleHidden}
      />
      <SignUp
        isHidden={!hidden}
        closeModal={closeModal}
        switchToLogIn={toggleHidden}
      />
    </div>
  );
}

const LogIn = ({ isHidden, closeModal, switchToSignUp }) => {
  if (isHidden) {
    return null;
  }
  const [user, setUser] = useState(null);
  const [password, setPassword] = useState(null);
  const router = useRouter();

  const handleUserChange = (event) => {
    setUser(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleClick = async () => {
    const profileResponse = await fetch(`/api/profile?user=${user}`);
    const profileData = await profileResponse.json();
    if (!profileData.username || profileData.password != password) {
      alert("Username or Password is incorrect");
      return;
    } else {
      router.push(`/dashboard/${user}`);
    }
  };

  return (
    <div>
      <div
        className="fixed inset-0 bg-gray-800 bg-opacity-50 z-50"
        onClick={closeModal}
      ></div>
      <div className="fixed inset-0 flex justify-center items-center z-50">
        <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full space-y-4">
          <h1 className="text-3xl text-center underline">Log In</h1>
          <p className="text-xl">Username:</p>
          <input
            type="text"
            className="w-full py-1 px-1 border rounded"
            onChange={handleUserChange}
          />
          <p className="text-xl">Password:</p>
          <input
            type="password"
            className="w-full py-1 px-1 border rounded"
            onChange={handlePasswordChange}
          />
          <button
            className="bottom-0 right-0 text-gray-600 border rounded px-2"
            onClick={handleClick}
          >
            Log In
          </button>
          <p>
            Don't have an account?{" "}
            <button
              className="text-blue-600 underline"
              onClick={switchToSignUp}
            >
              Sign Up!
            </button>{" "}
          </p>
        </div>
      </div>
    </div>
  );
};

const SignUp = ({ isHidden, closeModal, switchToLogIn }) => {
  if (isHidden) {
    return null;
  }
  const [user, setUser] = useState(null);
  const [password, setPassword] = useState(null);
  const router = useRouter();

  const handleUserChange = (event) => {
    setUser(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleClick = async () => {
    const profileResponse = await fetch(`/api/profile?user=${user}`);
    const profileData = await profileResponse.json();
    if (profileData.username) {
      alert("Username is already in use");
      return;
    }
    if (!user || /\s/.test(user) || user == "") {
      alert("Please input a username without spaces.");
      return;
    }
    if (!password) {
      alert("Please input password.");
      return;
    }
    await fetch("/api/profile", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ user: user, password: password }),
    });
    router.push(`/dashboard/${user}`);
  };

  return (
    <div>
      <div
        className="fixed inset-0 bg-gray-800 bg-opacity-50 z-50"
        onClick={closeModal}
      ></div>
      <div className="fixed inset-0 flex justify-center items-center z-50">
        <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full space-y-4">
          <h1 className="text-3xl text-center underline">Sign Up</h1>
          <p className="text-xl">Username:</p>
          <input
            type="text"
            className="w-full py-1 px-1 border rounded"
            onChange={handleUserChange}
          />
          <p className="text-xl">Password:</p>
          <input
            type="text"
            className="w-full py-1 px-1 border rounded"
            onChange={handlePasswordChange}
          />
          <button
            className="bottom-0 right-0 text-gray-600 border rounded px-2"
            onClick={handleClick}
          >
            Sign Up
          </button>
          <p>
            Already have an account?{" "}
            <button className="text-blue-600 underline" onClick={switchToLogIn}>
              Log In!
            </button>{" "}
          </p>
        </div>
      </div>
    </div>
  );
};
