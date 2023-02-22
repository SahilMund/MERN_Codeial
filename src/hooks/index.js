import { useContext, useState, useEffect } from 'react';
import jwt from 'jwt-decode';

import { AuthContext } from '../providers/AuthProvider';
import { login as userLogin, 
  register,editProfile
,fetchUserFriends
} from '../api';

import {
  setItemInLocalStorage,
  LOCALSTORAGE_TOKEN_KEY,
  removeItemFromLocalStorage,
  getItemFromLocalStorage,
} from '../utils';


export const useAuth = () => {
  // useContext is a React Hook that lets you read and subscribe to context from your component.
  // AuthContext is a context created to keep all the fucntionalities regarding authentication.
  return useContext(AuthContext);
};

export const useProvideAuth = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {

    const getUser = async () => {

      const userToken = getItemFromLocalStorage(LOCALSTORAGE_TOKEN_KEY);
      // decoding the jwt token and getting the user details

      if (userToken) {
        const user = jwt(userToken);
        const response = await fetchUserFriends();

        let friends = [];

        if (response.success) {
          friends = response.data.friends;
        }

        setUser({
          ...user,
          friends,
        });
      }

      setLoading(false);
    };
  

    getUser();
  }, []);


  const updateUser = async (userId, name, password, confirmPassword) => {
    const response = await editProfile(userId, name, password, confirmPassword);

    console.log('response', response);
    if (response.success) {
      setUser(response.data.user);
      setItemInLocalStorage(
        LOCALSTORAGE_TOKEN_KEY,
        response.data.token ? response.data.token : null
      );
      return {
        success: true,
      };
    } else {
      return {
        success: false,
        message: response.message,
      };
    }
  };


  const login = async (email, password) => {
    const response = await userLogin(email, password);

    if (response.success) {
      setUser(response.data.user);
      setItemInLocalStorage(
        LOCALSTORAGE_TOKEN_KEY,
        response.data.token ? response.data.token : null
      );
      return {
        success: true,
      };
    } else {
      return {
        success: false,
        message: response.message,
      };
    }
  };

  const signup = async (name, email, password, confirmPassword) => {
    const response = await register(name, email, password, confirmPassword);

    if (response.success) {
      return {
        success: true,
      };
    } else {
      return {
        success: false,
        message: response.message,
      };
    }
  };

  const logout = () => {
    setUser(null);
    removeItemFromLocalStorage(LOCALSTORAGE_TOKEN_KEY);
  };

  const updateUserFriends = (addFriend, friend) => {
    // for add freind request
    if (addFriend) {
      setUser({
        ...user,
        friends: [...user.friends, friend],
      });
      return;
    }

    //for remove friend request
    const newFriends = user.friends.filter(
      (f) => f.to_user._id !== friend.to_user._id
    );

    setUser({
      ...user,
      friends: newFriends,
    });
  };


  return {
    user,
    login,
    logout,
    loading,
    signup,
    updateUser,
    updateUserFriends
  };
};
