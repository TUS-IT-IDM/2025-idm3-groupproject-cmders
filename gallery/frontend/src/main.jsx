import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { FluentProvider, webLightTheme } from '@fluentui/react-components'
import App from './App.jsx'
import './App.css'
import {UserProvider} from "./context/UserContext.jsx";

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <FluentProvider theme={webLightTheme}>
        <UserProvider>
            <App />
        </UserProvider>
    </FluentProvider>
  </StrictMode>
)
