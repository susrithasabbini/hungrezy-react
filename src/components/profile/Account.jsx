// AccountPage.js
import React, { useState,useRef } from "react";
import bcrypt from "bcryptjs";
import {toast} from 'sonner';
import { useAuth } from "../../AuthContext";

const Account = () => {
  const {user,accessToken,signin,signout} = useAuth()
  const [editing, setEditing] = useState(false);
  const [editedUser, setEditedUser] = useState({ ...user });
  const image = useRef(null);
  

  const handleEditClick = () => {
    setEditing(true);
  };

  const handleImageChange = async(e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('image', e.target.files[0]);
    const url = `${import.meta.env.VITE_HUNGREZY_API}/api/user/${user._id}/upload/image`;
    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${accessToken}`, // Include authorization token if needed
        },
        body: formData, // Set the FormData object as the body
      });
      if (!response.ok) {
        toast.error('Failed to upload image');
        return;
      }
      const result = await response.json()
      const temp = result.data;
      console.log(temp);
      signin(temp.token.user,temp.token.accessToken);
      toast.success('Image uploaded successfully');
      // Handle success
    } catch (error) {
      console.error('Error uploading image:', error);
      toast.error('Please try again later!');
    }
  };

  const handleSaveClick = async () => {
    // Hash the password before sending it to the server
    const hashedPassword = await bcrypt.hash(editedUser.password, 10);

    // Send updated user details to your backend API for saving
    // Replace this with your actual API endpoint
    fetch(`${import.meta.env.VITE_HUNGREZY_API}/user/updateDetails`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        mobileNumber: editedUser.mobileNumber, // Use mobileNumber as a unique identifier
        updates: {
          firstName: editedUser.firstName,
          lastName: editedUser.lastName,
          email: editedUser.email,
          password: hashedPassword, // Send the hashed password
        },
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("User details updated successfully:", data);
        setEditing(false);
      })
      .catch((error) => console.error("Error updating user details:", error));
  };
  const handleInputChange = (e) => {
    setEditedUser({
      ...editedUser,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="container p-8 bg-white border rounded-md mt-8">
      <h1 className="text-3xl font-semibold mb-6">Account Details</h1>
      <div className="grid grid-cols-2 gap-4">
        <div className="mb-4">
          <label className="block text-gray-600 mb-2">First Name</label>
          <input
            type="text"
            name="firstName"
            value={editedUser.firstName}
            onChange={handleInputChange}
            disabled={!editing}
            className="border border-gray-300 px-3 py-2 w-full rounded-md focus:outline-none"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-600 mb-2">Last Name</label>
          <input
            type="text"
            name="lastName"
            value={editedUser.lastName}
            onChange={handleInputChange}
            disabled={!editing}
            className="border border-gray-300 px-3 py-2 w-full rounded-md focus:outline-none"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-600 mb-2">Email</label>
          <input
            type="email"
            name="email"
            value={editedUser.email}
            onChange={handleInputChange}
            disabled={!editing}
            className="border border-gray-300 px-3 py-2 w-full rounded-md focus:outline-none"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-600 mb-2">Mobile Number</label>
          <input
            type="text"
            name="mobileNumber"
            value={editedUser.mobileNumber}
            disabled
            className="border border-gray-300 px-3 py-2 w-full rounded-md focus:outline-none bg-gray-100"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-600 mb-2">Password</label>
          <input
            type="password"
            name="password"
            value={editedUser.password}
            onChange={handleInputChange}
            disabled={!editing}
            className="border border-gray-300 px-3 py-2 w-full rounded-md focus:outline-none"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-600 mb-2">Image</label>
          <input
            type="file"
            name="image"
            accept="image/*"
            className=""
            ref={image}
            onChange={handleImageChange}
          />
        </div>
        <div className="col-span-2">
          {editing ? (
            <button
              onClick={handleSaveClick}
              className="bg-green-500 text-white px-4 py-2 rounded-md mr-2"
            >
              Save
            </button>
          ) : (
            <button
              onClick={handleEditClick}
              className="bg-orange-400 text-white px-4 py-2 rounded-md mr-2"
            >
              Edit
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Account;
