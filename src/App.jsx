import React from 'react';
import { ThemeProvider } from '@material-ui/core/styles';
import Theme from './theme';
import ChildrenDemo from './pages/TextFieldDemo/ChildrenDemo';

function App() {
  return (
    <div>
      <ThemeProvider theme={Theme}>
        <ChildrenDemo />
      </ThemeProvider>
    </div>
  );
}

export default App;
