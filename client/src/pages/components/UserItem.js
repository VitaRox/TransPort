import React from 'react';
import { Link } from 'react-router-dom';
import Avatar from '../../shared/components/UIElements/Avatar';
import Card from '../../shared/components/UIElements/Card';
import './UserItem.css';

// This represents the current logged-in User
const UserItem = props => {
  return (
    <li className="user-item">
      <Card className="user-item__content">
        <Link to={`/users/${props.id}/reports`}>
          <div className="user-item__image">
            <Avatar image={`http://localhost:4000/${props.image}`} alt={props.username} />
          </div>
          <div className="user-item__info">
            <h2>Username: {props.username} <br/>Email: {props.email}</h2>
            <h3>
              {props.reportCount} {props.reportCount === 1 ? 'Report' : 'Reports'}
            </h3>
          </div>
        </Link>
      </Card>
    </li>
  );
};

export default UserItem;
