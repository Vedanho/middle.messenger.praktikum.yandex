import Block from '../../core/block';

interface InputProps {
  onChange?: (event: InputEvent) => void;
  onBlur?: (event: FocusEvent) => void;
  variant?: string;
  inputName?: string;
  placeholder?: string;
  type?: string;
}

export default class Input extends Block {
  constructor(props: InputProps) {
    const {
      variant,
      onChange,
      onBlur,
      inputName,
      placeholder,
      type,
    } = props;
    super('input', {
      events: {
        change: onChange,
        blur: onBlur,
      },
    }, {
      className: `input${variant ? ` input_${variant}` : ''}`,
      attrs: {
        placeholder: placeholder || '',
        name: inputName || '',
        type: type || '',
        id: inputName || '',
      },
    });
  }
}
