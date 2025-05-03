import ChatsApi from '../api/chats/chat';

const chatsApi = new ChatsApi();

export const getChats = async () => {
  try {
    const xhr = await chatsApi.getChats();
    const response = JSON.parse(xhr.response);

    if (xhr.status === 200) {
      window.store.set({ chats: response });
    }
  } catch (error) {
    console.log(error);
  }
};
