import React, { useEffect, useState } from 'react';

import UserItem from '../pages/components/UserItem';
import ErrorModal from '../shared/components/UIElements/ErrorModal';
import LoadingSpinner from '../shared/components/UIElements/LoadingSpinner';
import { useHttpClient } from '../shared/hooks/http-hook';

// This is responsible for creating the UserItem/"Your Account" page
const UserAccount = () => {
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const [loadedUser, setLoadedUser] = useState();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const responseData = await sendRequest(
          'http://localhost:5000/api/users/:userId'
        );
        setLoadedUser(responseData.user);
      } catch (err) {}
    };
    fetchUser();
  }, [sendRequest]);

  return (
    <React.Fragment>
      <ErrorModal error={error} onClear={clearError} />
      {isLoading && (
        <div className="center">
          <LoadingSpinner />
        </div>
      )}
      {!isLoading && loadedUser &&
        <UserItem
          key={loadedUser.id}
          id={loadedUser.id}
          username={loadedUser.username}
          email={loadedUser.email}
        />}
    </React.Fragment>
  );
};

export default UserAccount;
