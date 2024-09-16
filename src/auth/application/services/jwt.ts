export interface JWT {
  generateToken(payload: any, options?: any): string;
  verifyToken(token: string): any;
  createOneTimeToken(payload: any): string;
}

export interface JwtPayload {
  id: string;
}
