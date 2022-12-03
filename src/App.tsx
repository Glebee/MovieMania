import React from 'react';
import User from './interfaces/User';
import { MainPage } from './components/MainPage/MainPage';


function App() {

  const [currentUser, setCurrentUser] = React.useState<User | null>(null);
  return (
    <div>
      <MainPage user={currentUser} setCurrentUser = {setCurrentUser} />
    </div>
  );
}

export default App;
