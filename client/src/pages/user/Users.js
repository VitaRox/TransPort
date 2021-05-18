import React from 'react';
import UsersList from '../components/UsersList';



// Goal: output a list of users, viewable by anyone;
function Users() {
  // Array of objects (dummy data);
  const USERS = [
    {
      id: 'u1',
      name: 'Vita',
      image: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/15/Pictograms-nps-water-fish_ladder-2.svg/512px-Pictograms-nps-water-fish_ladder-2.svg.png",
      places: 3
    }
  ];

  return <UsersList items={USERS}/>;
}

export default Users;
