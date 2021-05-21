import React, { useEffect, useState } from 'react';

// import UserItem from '../pages/components/UserItem';
import UsersList from './components/UsersList';

import ErrorModal from '../shared/components/UIElements/ErrorModal';
import LoadingSpinner from '../shared/components/UIElements/LoadingSpinner';
import { useHttpClient } from '../shared/hooks/http-hook';

// DUMMY users
// const Users = [
//   {
//     id: 1,
//     username: "Yamil_Zupper",
//     password: "hAp5%5%5%",
//     reports: []
//   },
//   {
//     id: 2,
//     username: "Beach_Baby",
//     password: "420%haWT",
//     reports: []
//   }

// ]


// This is responsible for creating the "Your Account" page, which displays UserItem
const UserAccount = () => {
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const [loadedUsers, setLoadedUsers] = useState();

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const responseData = await sendRequest(
          'http://localhost:4000/api/users'
        );
        setLoadedUsers(responseData.users);
      } catch (err) {
        console.log(err.message);
      }
    };
    fetchUsers();
  }, [sendRequest]);

  return (
    <React.Fragment>
      <ErrorModal error={error} onClear={clearError} />
      {isLoading && (
        <div className="center">
          <LoadingSpinner />
        </div>
      )}
      {!isLoading && loadedUsers && <UsersList items={loadedUsers}/>}
    </React.Fragment>
  );
};

export default UserAccount;
