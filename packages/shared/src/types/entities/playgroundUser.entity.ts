import { PlaygroundRole } from '../enums';

export interface PlaygroundUser {
  playground_id: string;
  user_id: string;
  role: PlaygroundRole;
  last_viewed_at: Date;
}

export type PlaygroundUserSeed = PlaygroundUser;
