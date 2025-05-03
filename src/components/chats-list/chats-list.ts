import template from './chats-list.hbs?raw';
import Block from '../../core/block';
import ChatComponent from '../chat-component/chat-component';
import InputFiled from '../input/inputField';
import Chat from '../../pages/chat/chat';
import { connect } from '../../utils/connect';
import { Button } from '../button';
import ChatCreateModal from '../chat-create-modal/chat-create-modal';

type ChatsListProps = {
  chats: Chat[];
}
class ChatsList extends Block<ChatsListProps> {
  constructor(props: ChatsListProps) {
    super('div', {
      ...props,
      SearchInput: new InputFiled({
        type: 'text',
        variant: 'search',
        icon: '../../../search-icon.svg',
        placeholder: 'Поиск',
      }),
      activeChat: {},
      CreateNewChatButton: new Button({
        label: 'Create chat',
        variant: 'primary',
        buttonClassName: 'chat-create-btn',
        onClick: () => {
          this.setProps({ isShowChatModal: true });
        },
      }),
      ChatCreateModal: new ChatCreateModal({
        onClick: () => this.setProps({ isShowChatModal: false }),
      }),
    }, {
      className: 'list-wrapper',
    });
  }

  componentDidUpdate(oldProps: ChatsListProps, newProps: ChatsListProps): boolean {
    console.log(oldProps, newProps);
    // Проверяем, изменился ли список чатов
    if (oldProps.chats !== newProps.chats) {
      // Пересоздаём chatComponents на основе новых чатов
      this.children.chatComponents = newProps.chats.map((chat) => (
        new ChatComponent({
          ...chat,
          onClick: () => window.store.set({ activeChat: chat }),
        })
      ));

      return true;
    }

    if (newProps.isShowChatModal !== oldProps.isShowChatModal) {
      return true;
    }

    if (oldProps.activeChat?.id !== newProps.activeChat.id) {
      return true;
    }
    return false;
  }

  render(): string {
    const chatComponents = this.children.chatComponents as unknown as Block[];
    chatComponents?.forEach((chat) => {
      if (chat?.props.id === window.store.state?.activeChat?.id) {
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

const mapStateToProps = (state: Record<string, unknown>) => ({
  chats: state.chats,
  activeChat: state.activeChat,
});

export default connect(mapStateToProps)(ChatsList);
