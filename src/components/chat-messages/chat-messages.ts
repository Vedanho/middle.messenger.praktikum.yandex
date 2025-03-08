import Block from '../../core/block';
import { Chat } from '../../types';
import { Button } from '../button';
import { InputField } from '../input';
import { UserAddModal } from '../user-add-modal';
import template from './chat-messages.hbs?raw';

interface ChatMessagesProps {
  activeChat: Chat
}

export default class ChatMessages extends Block {
  constructor(props: ChatMessagesProps) {
    const { author } = props?.activeChat || {};

    super('section', {
      ...props,
      author,
      message: '',
      ActionsButton: new Button({
        variant: 'rounded',
        label: '⋮',
        onClick: () => this.setProps({ isShowActions: true }),
      }),
      AttachmentsButton: new Button({
        buttonClassName: 'chat-form__attach-button',
        isIcon: true,
        iconSrc: '../../../attachment-icon.svg',
        iconWidth: '32',
        iconHeight: '32',
        onClick: () => this.setProps({ isShowAttach: true }),
        type: 'button',
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
          // eslint-disable-next-line no-console
          console.log(this.props.message);
        },
      }),
      UserAddModal: new UserAddModal({
        onClick: () => this.setProps({ isShowModal: false }),
      }),
      ModalTriggerButton: new Button({
        isIcon: true,
        iconSrc: '../../../add-icon.svg',
        label: 'Добавить пользователя',
        onClick: () => this.setProps({ isShowModal: true }),
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
    return template;
  }
}
