import './App.css'
import MoviePage from './pages/MoviePage';
import HomePage from './pages/HomePage';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import NotFoundPage from './pages/NotFoundPage';
import MovieDetailPage from './pages/MovieDetailPage';

const router = createBrowserRouter([
  {
    path:'/',
    element: <HomePage />,
    errorElement: <NotFoundPage />,
    children: [
      {
      path: "movies/:category",
      element: <MoviePage />,
      children: [
        {
            index: true, // 기본(인덱스) 라우트 추가
            element: <div></div>, // 혹은 간단한 placeholder 컴포넌트
        },
        {
          path: ":movieId",
          element: <MovieDetailPage />,
        },
      ],
      }
    ]
  }
])

function App() {
  return <RouterProvider router={router} />;
}

export default App