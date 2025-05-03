import { User } from '../../types';

export interface LastMessage {
  user: User;
  time: string;
  content: string;
}

export interface Chat {
  unread_count: number;
  created_by: number;
  last_message: LastMessage;
}
