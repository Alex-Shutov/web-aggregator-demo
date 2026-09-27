import React from 'react';
import { Route, RouteProps, Routes } from 'react-router-dom';
import { IRouteProps } from './routes.types';
import { routes } from './routes';



const renderRoutes = (routes:IRouteProps[],parentPath:string ='') => {
    return routes.map((route, index) => {
    const fullPath = `${parentPath}${route.path}`;

    return <Route
      key={fullPath}
      path={fullPath}
      element={route.element}
    >
      {route.subRoutes && (
        <Route>{renderRoutes(route.subRoutes,fullPath)}</Route>
      )}
    </Route>
  }
);
};

export const AppRender = () => {
  return <Routes>
    {renderRoutes(routes)}
  </Routes>
}