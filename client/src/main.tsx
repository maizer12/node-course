import ReactDOM from 'react-dom/client';
import App from './App';
import CssBaseline from '@mui/material/CssBaseline';
import './assets/style/main.scss';
import { Provider } from 'react-redux';
import { ThemeProvider } from '@mui/material';
import { theme } from './theme';
import store from './store';
import './index.css';

const rootElement = document.getElementById('root');

if (!!rootElement) {
  const root = ReactDOM.createRoot(rootElement);

  root.render(
    <Provider store={store}>
      <CssBaseline />
      <ThemeProvider theme={theme}>
        <App />
      </ThemeProvider>
    </Provider>,
  );
}
