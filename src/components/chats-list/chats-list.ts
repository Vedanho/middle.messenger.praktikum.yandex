import template from './chats-list.hbs?raw';
import Block from '../../core/block';
import ChatComponent from '../chat-component/chat-component';
import InputFiled from '../input/inputField';

interface ChatsListProps {
  messages: unknown[];
  setActiveChat: (chat: unknown) => void;
}

export default class ChatsList extends Block {
  constructor(props: ChatsListProps) {
    super('div', {
      ...props,
      SearchInput: new InputFiled({
        type: 'text',
        variant: 'search',
        icon: '../../../search-icon.svg',
        placeholder: 'Поиск',
      }),
      chatComponents: props.messages.map((chat) => (
        new ChatComponent({
          ...chat,
          onClick: () => {
            this.setProps({ setActiveChat: chat });
            props.setActiveChat(chat);
          },
        })
      )),
    }, {
      className: 'list-wrapper',
    });
  }

  render(): string {
    const { chatComponents } = this.children;

    chatComponents.forEach((chat) => {
      if (chat?.props.id === this.props.activeChat?.id) {
        chat.setProps({ active: true });
        return;
      }

      if (chat.props.active) {
        chat.setProps({ active: false });
      }
    });
    return template;
  }
}
