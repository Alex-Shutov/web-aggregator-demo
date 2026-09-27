import { IRouteProps } from './routes.types';
import Main from '@components/Main/components';
import Home from '@pages/Home';
import Play from '@components/Project/components/Play';
// import Project from '@components/Project';
import Login from '@components/Auth/components/Login';
import Auth  from '@shared/Layouts/AuthLayout';
import Register from '@components/Auth/components/Register';
import Profile from '@pages/Profile';
import Information from '@components/User/components/Proifle/components/Information';
import MyProjects from '@components/User/components/Proifle/components/MyProjects';
import ProjectEdit from '@pages/Project/edit';
import ProjectView from '@pages/Project/view';

export const routes : IRouteProps[] =[
  {
    path: '/',
    element: <Main/>,
    subRoutes: [
      { path: '', element: <Home/>, },
      { path: 'project/:projId', element: <ProjectView/>, },
      { path: 'project/:projId/play', element: <Play/>, },
      { path: 'project/:projId/edit', element: <ProjectEdit/>, },
      {
        path: 'profile/',
        element: <Profile/>,
        subRoutes: [
          { path: 'my-projects/', element: <MyProjects/>, },
          { path: 'information/', element: <Information/>, },
          // { path: 'security/', element: <div/>, },
        ],
      },
    ],
  },
  {
    path:'/auth',
    element:<Auth/>,
    subRoutes:[
      {
        path:'/',
        element: <Login/>
      },
      {
        path:'/register',
        element: <Register/>
      }
    ]
  }
  ]