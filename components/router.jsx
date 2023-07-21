import { Route, Routes, RouterProvider } from 'react-router-dom'
// Pages
import Login from '../pages/login'
import Signup from '../pages/signup'
import RestorePassword from '../pages/restore-password'
import PageNotFound from '../pages/404'
import Home from '../pages/home'
import Article from '../pages/article'


/**
 * Component renders the current active page using `react-router-dom`. The component shold be renderen directly from `App.js`.
 */
function AppRouter() {
    return (
        <main>
            <Routes>
                <Route path='home' element={<Home/>} />
                <Route path='article/:id' element={<Article/>} />
                <Route path='login' element={<Login/>} />
                <Route path='signup' element={<Signup/>} />
                <Route path='restore-password' element={<RestorePassword/>} />
                <Route path='*' element={<PageNotFound/>} />
            </Routes>
        </main>
    )
}

export default AppRouter