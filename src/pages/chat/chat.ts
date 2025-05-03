import Block from '../../core/block';
import { ChatMessages, ChatsList } from '../../components';
import { Chat as ChatType } from '../../types.ts';
import { getChats } from '../../services/chats.ts';
import { connect } from '../../utils/connect.ts';

type ChatProps = {
  activeChat: ChatType;
}

class Chat extends Block<ChatProps> {
  constructor(props: ChatProps) {
    super('main', {
      activeChat: {},
      ChatsList: new ChatsList({ chats: [] }),
      ChatMessages: new ChatMessages({ ...props }),

    }, {
      className: 'chat-page',
    });
  }

  render() {
    getChats();

    return `
     {{{ ChatsList}}}
     {{{ ChatMessages }}}
            `;
  }
}

const mapStateToProps = (state: Record<string, unknown>) => ({
});

export default connect(mapStateToProps)(Chat);
