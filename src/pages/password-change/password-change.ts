import template from './password-change.hbs?raw';
import {
  Button, InputField, NavBack, ProfileAvatar,
} from '../../components';
import Block from '../../core/block';

enum ErrorMessages {
  PASSWORD_ERROR = 'Недопустимый пароль',
  REPEAT_PASSWORD_ERROR = 'Пароли должны совпадать',
}

interface FormState {
  old_password: string;
  new_password: string;
  confirm_password: string;
}

type PasswordChangePageProps = {
  formState: FormState;
  NavBack: NavBack;
  ProfileAvatar: ProfileAvatar;
  InputPassword: InputField;
  InputNewPassword: InputField;
  InputRepeatPassword: InputField;
  SubmitButton: Button;
}

export default class PasswordChangePage extends Block<PasswordChangePageProps> {
  constructor(props: PasswordChangePageProps) {
    super('main', {
      ...props,
      formState: {
        old_password: '',
        new_password: '',
        confirm_password: '',
      },
      NavBack: new NavBack(),
      ProfileAvatar: new ProfileAvatar({}),
      InputPassword: new InputField({
        inputName: 'old_password',
        type: 'password',
        onChange: (event) => {
          const { value } = event.target as HTMLInputElement;
          this.handleChangeInput({ field: 'password', value, elementName: 'InputPassword' });
        },
      }),
      InputNewPassword: new InputField({
        inputName: 'new_password',
        type: 'password',
        onChange: (event) => {
          const { value } = event.target as HTMLInputElement;
          this.handleChangeInput({ field: 'new_password', value, elementName: 'InputRepeatPassword' });
        },
        onBlur: (event) => {
          const { value } = event.target as HTMLInputElement;

          if (this.props.formState.new_password !== value) {
            this.setErrorMsg({ elementName: 'InputNewPassword', errorMessage: ErrorMessages.PASSWORD_ERROR });
          }
        },
      }),
      InputRepeatPassword: new InputField({
        inputName: 'confirm_password',
        type: 'password',
        onChange: (event) => {
          const { value } = event.target as HTMLInputElement;
          this.handleChangeInput({ field: 'confirm_password', value, elementName: 'InputRepeatPassword' });
        },
        onBlur: (event) => {
          const { value } = event.target as HTMLInputElement;

          if (this.props.formState.new_password !== value) {
            this.setErrorMsg({ elementName: 'InputRepeatPassword', errorMessage: ErrorMessages.REPEAT_PASSWORD_ERROR });
          }
        },
      }),
      SubmitButton: new Button({
        label: 'Сохранить',
        buttonClassName: 'profile-actions__save-password',
        variant: 'primary',
      }),
    }, {
      className: 'profile-page',
    });
  }

  private handleChangeInput({ field, value, elementName }: { field: string, value: string, elementName: string }) {
    this.children[elementName].setProps({
      error: '',
    });
    this.setProps({ formState: { ...this.props.formState, [field]: value } });
  }

  private setErrorMsg({ elementName, errorMessage }: { elementName: string, errorMessage: string }) {
    this.children[elementName].setProps({
      error: errorMessage,
    });
  }

  render(): string {
    return template;
  }
}
