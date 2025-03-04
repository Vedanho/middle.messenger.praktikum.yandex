import template from './login.hbs?raw';
import { Button, InputField } from '../../components';
import Block from '../../core/block';
import { isValidLogin, isValidPassword } from '../../utils/validation';

interface FormState {
  login: string;
  password: string;
}

interface FormErrors {
  login: string;
  password: string;
}

export default class Login extends Block {
  constructor(props) {
    super('main', {
      ...props,
      formState: {
        login: '',
        password: '',
      } as FormState,
      errors: {
        login: '',
        password: '',
      } as FormErrors,
      InputLogin: new InputField({
        isNeedLabel: true,
        label: 'Логин',
        inputName: 'login',
        variant: 'underline',
        type: 'text',
        onChange: (event) => {
          const { value } = event.target as HTMLInputElement;

          this.setProps({ errors: { ...this.props.errors, login: '' } });
          this.children.InputLogin.setProps({
            error: this.props.errors.login,
          });
          this.setProps({ formState: { ...this.props.formState, login: value } });
        },
        onBlur: (event) => {
          const { value } = event.target as HTMLInputElement;

          if (!isValidLogin(value)) {
            this.setProps({ errors: { ...this.props.errors, login: 'Неправильный логин' } });
            this.children.InputLogin.setProps({
              error: this.props.errors.login,
            });
          }
        },
      }),
      InputPassword: new InputField({
        isNeedLabel: true,
        label: 'Пароль',
        inputName: 'password',
        variant: 'underline',
        type: 'password',
        onChange: (event) => {
          const { value } = event.target as HTMLInputElement;
          this.setProps({
            errors: { ...this.props.errors, password: '' },
            formState: { ...this.props.formState, password: value },
          });
          this.children.InputPassword.setProps({
            error: this.props.errors.password,
          });
        },
        onBlur: (event) => {
          const { value } = event.target as HTMLInputElement;

          if (!isValidPassword(value)) {
            this.setProps({ errors: { ...this.props.errors, password: 'Неправильный пароль' } });
            this.children.InputPassword.setProps({
              error: this.props.errors.password,
            });
          }
        },
      }),
      ButtonSubmit: new Button({
        label: 'Вход',
        variant: 'primary',
        type: 'submit',
        onClick: (event) => {
          event.preventDefault();

          if (!isValidLogin(this.props.formState.login)) {
            this.setProps({ errors: { ...this.props.errors, login: 'Неправильный логин' } });
            this.children.InputLogin.setProps({
              error: this.props.errors.login,
            });
          }

          if (!isValidPassword(this.props.formState.password)) {
            this.setProps({ errors: { ...this.props.errors, password: 'Неправильный пароль' } });
            this.children.InputPassword.setProps({
              error: this.props.errors.password,
            });
          }

          console.log(this.props.formState);
        },
      }),
      ButtonRegist: new Button({ label: 'Нет аккаунта', variant: 'transparent', type: 'button' }),
    }, {
      className: 'page',
    });
  }

  public render(): string {
    return (
      template
    );
  }
}
