export interface JWT {
  generateToken(payload: any): string;
  verifyToken(token: string): any;
}

export interface JwtPayload {
  id: string;
}
