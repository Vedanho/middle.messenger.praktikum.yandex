import Block from '../../core/block';
import { Button } from '../button';
import { InputField } from '../input';
import { UserAddModal } from '../user-add-modal';

interface ChatsListProps {
  messages: unknown[];
  activeChat: any,
  setActiveChat: (chat: unknown) => void;
}
export default class ChatMessages extends Block {
  constructor(props: ChatsListProps) {
    const { author } = props?.activeChat || {};

    super('section', {
      ...props,
      author,
      message: '',
      ActionsButton: new Button({
        variant: 'rounded',
        label: '⋮',
        onClick: () => this.setProps({ isShowActions: true })
      }),
      AttachmentsButton: new Button({
        buttonClassName: 'chat-form__attach-button',
        isIcon: true,
        iconSrc: '../../../attachment-icon.svg',
        iconWidth: '32',
        iconHeight: '32',
        onClick: () => this.setProps({ isShowAttach: true }),
        type: 'button'
      }),
      MessageInput: new InputField({
        type: 'text',
        placeholder: 'Сообщение',
        variant: 'grey',
        onChange: (event) => {
          const { value } = event.target as HTMLInputElement;
          this.children.MessageInput.setProps({
            error: '',
          });
          this.setProps({ message: value });
        },
      }),
      SubmitButton: new Button({
        buttonClassName: 'arrow-button',
        variant: 'rounded',
        isIcon: true,
        iconWidth: '28',
        iconHeight: '28',
        iconSrc: '../../../arrow.svg',
        type: 'submit',
        onClick: (event) => {
          event.preventDefault();

          if (!this.props.message) {
            this.children.MessageInput.setProps({
              error: 'Введите сообщение',
            });
            return;
          }

          console.log(this.props.message);
        }
      }),
      UserAddModal: new UserAddModal({
        onClick: () => this.setProps({ isShowModal: false })
      }),
      ModalTriggerButton: new Button({
        isIcon: true,
        iconSrc: '../../../add-icon.svg',
        label: 'Добавить пользователя',
        onClick: () => this.setProps({ isShowModal: true })
      }),
      UserDeleteButton: new Button({
        buttonClassName: 'clear-button',
        isIcon: true,
        iconSrc: '../../../add-icon.svg',
        label: 'Удалить пользователя',
      }),
      PhotoButton: new Button({
        isIcon: true,
        iconSrc: '../../../photo-icon.svg',
        label: 'Фото или Видео',
      }),
      FileButton: new Button({
        isIcon: true,
        iconSrc: '../../../file-icon.svg',
        label: 'Файл',
      }),
      LocationButton: new Button({
        isIcon: true,
        iconSrc: '../../../location-icon.svg',
        label: 'Локация',
      }),
    }, {
      className: 'chat',
    });
  }

  render(): string {
    return `
     {{#if isShowModal}}
      {{{UserAddModal}}}
    {{/if}}

  <div class="chat__container">
    <div class="chat-header">
      <div class="chat-header__avatar"></div>
      <h1 class="chat-header__author">{{author}}</h1>

      <div class="chat-header__button-wrapper">
        {{{ActionsButton}}}
        {{#if isShowActions}}
       {{#> ActionsModal}}
         {{{ModalTriggerButton}}}
          {{{UserDeleteButton}}}
        {{/ActionsModal}}
      {{/if}}
      </div>
    </div>

    <div class="chat-messages">
      <div class="chat-messages__correspondence">
        <div class="chat-messages__date">{{date}}</div>

        <div class="chat-messages__message-wrapper">
          <div class="chat-messages__message-content">
            <div class="chat-messages__message-text">
              <span>
              {{firstUserMessage}}
              </span>
              <span class="chat-messages__time">11:56</span>
            </div>
          </div>
        </div>

        <div class="chat-messages__message-wrapper chat-messages__message-wrapper_user">
          <div class="chat-messages__message-content">
            <div class="chat-messages__message-text chat-messages__message-text_user">
              <span>{{secondUserMessage}}</span>
              <img src="../../../checked-icon.svg" alt="checked" />
              <span class="chat-messages__time chat-messages__time_user">11:56</span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="chat-form-wrapper">
      <form class="chat-form">
        <div class="chat-form__attach-wrapper">
          {{{AttachmentsButton}}}
          {{#if isShowAttach}}
          {{#> ActionsModal}}
            {{{PhotoButton}}}
            {{{FileButton}}}
            {{{LocationButton}}}
          {{/ActionsModal}} 
          {{/if}}
        </div>
        {{{MessageInput}}}
        {{{SubmitButton}}}
      </form>
    </div>
  </div>
`;
  }
}
