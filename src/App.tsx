import React from 'react';
import { AuthProvider } from './auth';
import SignIn from './components/SignIn';
import SignUp from './components/SignUp';

const App: React.FC = () => {
  return (
    <AuthProvider>
      <div>
        <SignIn />
        <SignUp />
      </div>
    </AuthProvider>
  );
};

export default App;
