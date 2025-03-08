import Block from '../../core/block';
import { Chats } from '../../constants';
import { ChatMessages, ChatsList } from '../../components';
import { Chat as ChatType } from '../../types.ts';

type ChatProps = {
  activeChat: ChatType;
}

export default class Chat extends Block<ChatProps> {
  constructor(props: ChatProps) {
    super('main', {
      activeChat: {},
      ChatsList: new ChatsList({
        chats: Chats,
        setActiveChat: (chat) => {
          this.setProps({ activeChat: chat });
        },
      }),
      ChatMessages: new ChatMessages({ ...props }),

    }, {
      className: 'chat-page',
    });
  }

  render() {
    const { ChatsList, ChatMessages } = this.children;
    const {
      author, firstUserMessage, secondUserMessage, date,
    } = this.props.activeChat;

    if (this.props.activeChat) {
      ChatsList.setProps({ activeChat: this.props.activeChat });
      ChatMessages.setProps({
        activeChat: this.props.activeChat,
        author,
        firstUserMessage,
        secondUserMessage,
        date,
      });
    }

    return `
     {{{ ChatsList}}}
      {{#if ${this.props.activeChat?.id} }}
      {{{ ChatMessages }}}
       {{/if}}
        {{#if ${!this.props.activeChat?.id} }}
          <div class="no-chat">Выберите чат чтобы отправить сообщение</div>
        {{/if}}
      `;
  }
}
