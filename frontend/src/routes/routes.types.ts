import { RouteProps } from 'react-router-dom';

export type IRouteProps = RouteProps & {subRoutes?:IRouteProps[]}
