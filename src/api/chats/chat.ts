import { HTTPTransport } from '../fetch';

const chatsApi = new HTTPTransport('/chats');

export default class ChatsApi {
  async getChats() {
    return chatsApi.get();
  }
}
