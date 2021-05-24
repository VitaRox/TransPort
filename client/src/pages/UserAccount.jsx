import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

// Page components
import UsersList from './components/UsersList';
import ErrorModal from '../shared/components/UIElements/ErrorModal';
import LoadingSpinner from '../shared/components/UIElements/LoadingSpinner';

// Styles
import { useHttpClient } from '../shared/hooks/http-hook';

// This is responsible for creating the "Your Account" page, which displays UserItem
const UserAccount = () => {
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const [loadedUsers, setLoadedUsers] = useState();

  useEffect(() => {
    // use useParams to get userId then getUserById
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
