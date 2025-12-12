import { TokenPayload } from './jwt.types';

declare global {
  namespace Express {
    interface Request {
      user?: TokenPayload;
    }
  }
}

// This export is needed to make this file a module (not a script)
export {};
