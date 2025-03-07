import Block from '../../core/block';
import { MESSAGES } from '../../constants';
import { ChatMessages, ChatsList } from '../../components';

export default class Chat extends Block {
  constructor(props: unknown) {
    super('main', {
      activeChat: {},
      ChatsList: new ChatsList({
        messages: MESSAGES,
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
     {{{ ChatMessages }}}
      `;
  }
}
