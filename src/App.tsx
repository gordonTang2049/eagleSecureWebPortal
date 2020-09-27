import React from 'react';
import { AuthProvider } from './auth/authProvider';
import { MainRouting } from './MainRouting';

interface Props {

}


const App: React.FC<Props> = () =>{

  return (
    <>
      <AuthProvider>
        <MainRouting />
      </AuthProvider>
    </>
  );
}


export default App;
