import Block from '../../core/block';
import Input from './input';
import template from './input.hbs?raw';

interface InputFiledProps {
  label: string;
  isNeedLabel: boolean;
  inputName?: string;
  onChange?: (event: InputEvent) => void;
  onBlur?: (event: FocusEvent) => void;
  variant?: string,
  type?: string
}

export default class InputFiled extends Block {
  constructor(props: InputFiledProps) {
    const {
      label,
      variant,
      type,
      inputName,
      onChange,
      onBlur,
    } = props;

    super('div', {
      ...props,
      label,
      Input: new Input({
        variant,
        onChange,
        type,
        inputName,
        onBlur,
      }),
    }, {
      className: 'input-wrapper',
    });
  }

  public render(): string {
    return template;
  }
}
