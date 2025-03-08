import Block from '../../core/block';
import { Dialog } from '../dialog';
import { InputField } from '../input';

interface DialogProps {
  onClick: () => void;
}

class DialogBody extends Block {
  constructor() {
    super('div', {
      FileChangeInput: new InputField({
        type: 'file',
        inputName: 'file',
      }),
    }, {
      className: 'upload-file',
    });
  }

  render(): string {
    return `{{{FileChangeInput}}}
            <label for="file" class="upload-file__text">Выбрать файл на компьютере</label>`;
  }
}

export default class AvatarDownloadModal extends Block {
  constructor(props: DialogProps) {
    super('div', {
      ...props,
      Dialog: new Dialog({
        title: 'Загрузить файл',
        buttonLabel: 'Поменять',
        submitOnClick: props.onClick,
        Body: new DialogBody(),
      }),
    });
  }

  render(): string {
    return '{{{ Dialog }}}';
  }
}
