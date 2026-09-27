export interface JwtPayload {
  id: string;
  email: string;
  surname?: string;
  name?: string;
  isDemo?: boolean;
}
