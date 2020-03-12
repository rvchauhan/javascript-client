import React from 'react';
import { ThemeProvider, Typography } from '@material-ui/core';
import Theme from './theme';
import ChildrenDemo from './pages/TextFieldDemo/ChildrenDemo';

function App() {
  return (
    <div>
      <ThemeProvider theme={Theme}>
        <Typography>
          <ChildrenDemo />
        </Typography>
      </ThemeProvider>
    </div>
  );
}

export default App;
