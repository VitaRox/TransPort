import React from 'react';
import { Link } from 'react-router-dom';

import Card from '../../shared/components/UIElements/Card';
import './UserItem.css';

// This represents the current logged-in User
const UserItem = props => {
  return (
    <li className="user-item">
      <Card className="user-item__content">
        <Link to={`/${props.id}/reports`}>
          <div className="user-item__info">
            <h2>{props.name}</h2>
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
