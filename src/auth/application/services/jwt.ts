export interface JWT {
  generateToken(payload: any): string;
  verifyToken(token: string): any;
  createOneTimeToken(payload: any): string;
}

export interface JwtPayload {
  id: string;
}
