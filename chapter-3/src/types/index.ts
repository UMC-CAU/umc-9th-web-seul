import { type ReactNode, type ReactElement } from 'react';

export interface LinkProps {
  to: string;
  children: ReactNode;
}

export interface RouteProps {
  path: string;
  component: () => ReactElement;
}

export interface RoutesProps {
  children: ReactNode;
}
