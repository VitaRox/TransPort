import React from 'react';

// Page components
import UserItem from './UserItem';
import Card from '../../shared/components/UIElements/Card';

// Styles
import './UsersList.css';

// List of Users
const UsersList = props => {
  if (props.items.length === 0) {
    return (
      <div className="center">
        <Card>
          <h2>No users found.</h2>
        </Card>
      </div>
    );
  }

  return (
    <ul className="users-list">
      {props.items.map(user => (
        <UserItem
          key={user.id}
          id={user.id}
          image={user.image}
          username={user.username}
          email={user.email}
          reportCount={user.reports.length}
        />
      ))}
    </ul>
  );
};

export default UsersList;
