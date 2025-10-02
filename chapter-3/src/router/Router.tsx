import { type FC, Children, cloneElement, useMemo, type ReactElement, isValidElement, } from 'react';
import { type RoutesProps, type RouteProps } from '../types';
import { useCurrentPath } from '../utils';

export const Routes: FC<RoutesProps> = ({ children }) => {
  const currentPath = useCurrentPath();

  const activeRoute = useMemo(() => {
    const routes = Children.toArray(children).filter(
      isRouteElement
    ) as ReactElement<RouteProps>[];
    return routes.find((route) => route.props.path === currentPath);
  }, [children, currentPath]);

  if (!activeRoute) return null;
  return cloneElement(activeRoute);
};

export const isRouteElement = (
  element: unknown
): element is ReactElement<RouteProps> => {
  return isValidElement(element) && (element.type as any).name === 'Route';
};
