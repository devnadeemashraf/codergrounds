import { MessageType } from '../enums';

import { BaseEntity } from './base';

export interface Message extends BaseEntity {
  playground_id: string;
  user_id: string;
  content: string;
  type: MessageType;
}

export type MessageSeed = Omit<Message, 'id' | 'created_at' | 'updated_at' | 'deleted_at'>;
