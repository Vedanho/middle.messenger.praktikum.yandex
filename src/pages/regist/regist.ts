import { Button, InputField } from '../../components';
import Block from '../../core/block';
import {
  isValidLogin,
  isValidPassword,
  isValidName,
  isValidEmail,
  isValidPhone,
} from '../../utils/validation';
import template from './regist.hbs?raw';

interface FormState {
  email: string;
  login: string;
  first_name: string;
  second_name: string;
  phone: string;
  password: string;
  repeat_password: string;
}

interface FormErrors {
  email: string;
  login: string;
  first_name: string;
  second_name: string;
  phone: string;
  password: string;
  repeat_password: string;
}

enum ErrorMessages {
  LOGIN_ERROR = 'Неправильный логин',
  FIRST_NAME_ERROR = 'Неправильное имя',
  SECOND_NAME_ERROR = 'Неправильная фамилия',
  PHONE_ERROR = 'Неправильный номер телефона',
  PASSWORD_ERROR = 'Неправильный пароль',
  REPEAT_PASSWORD_ERROR = 'Пароли не совпадают',
  EMAIL_ERROR = 'Неправильный email',
}

export default class Regist extends Block {
  constructor(props) {
    super('main', {
      ...props,
      formState: {
        email: '',
        login: '',
        first_name: '',
        second_name: '',
        phone: '',
        password: '',
        repeat_password: '',
      } as FormState,
      errors: {
        login: '',
        first_name: '',
        second_name: '',
        phone: '',
        password: '',
        repeat_password: '',
      } as FormErrors,
      InputEmail: new InputField({
        isNeedLabel: true,
        label: 'Почта',
        inputName: 'email',
        variant: 'underline',
        type: 'text',
        onChange: (event) => {
          const { value } = event.target as HTMLInputElement;
          this.handleChangeInput(value, 'email', 'InputEmail');
          // this.setProps({ errors: { ...this.props.errors, email: '' } });
          // this.children.InputEmail.setProps({
          //   error: this.props.errors.email,
          // });
          // this.setProps({ formState: { ...this.props.formState, email: value } });
        },
        onBlur: (event) => {
          const { value } = event.target as HTMLInputElement;

          if (!isValidEmail(value)) {
            this.setProps({ errors: { ...this.props.errors, email: 'Недопустимый email' } });
            this.children.InputEmail.setProps({
              error: this.props.errors.email,
            });
          }
        },
      }),
      InputFirstName: new InputField({
        isNeedLabel: true,
        label: 'Имя',
        inputName: 'first_name',
        variant: 'underline',
        type: 'text',
        onChange: (event) => {
          const { value } = event.target as HTMLInputElement;

          this.setProps({ errors: { ...this.props.errors, first_name: '' } });
          this.children.InputFirstName.setProps({
            error: this.props.errors.first_name,
          });
          this.setProps({ formState: { ...this.props.formState, first_name: value } });
        },
        onBlur: (event) => {
          const { value } = event.target as HTMLInputElement;

          if (!isValidName(value)) {
            this.setProps({ errors: { ...this.props.errors, first_name: 'Недопустимое имя' } });
            this.children.InputFirstName.setProps({
              error: this.props.errors.first_name,
            });
          }
        },
      }),
      InputSecondName: new InputField({
        isNeedLabel: true,
        label: 'Фамилия',
        inputName: 'second_name',
        variant: 'underline',
        type: 'text',
        onChange: (event) => {
          const { value } = event.target as HTMLInputElement;

          this.setProps({ errors: { ...this.props.errors, second_name: '' } });
          this.children.InputSecondName.setProps({
            error: this.props.errors.second_name,
          });
          this.setProps({ formState: { ...this.props.formState, second_name: value } });
        },
        onBlur: (event) => {
          const { value } = event.target as HTMLInputElement;

          if (!isValidName(value)) {
            this.setProps({
              errors: {
                ...this.props.errors,
                second_name: 'Недопустимая фамилия',
              },
            });
            this.children.InputSecondName.setProps({
              error: this.props.errors.second_name,
            });
          }
        },
      }),
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
            this.setProps({ errors: { ...this.props.errors, login: 'Недопустимый логин' } });
            this.children.InputLogin.setProps({
              error: this.props.errors.login,
            });
          }
        },
      }),
      InputPhone: new InputField({
        isNeedLabel: true,
        label: 'Телефон',
        inputName: 'phone',
        variant: 'underline',
        type: 'number',
        onChange: (event) => {
          const { value } = event.target as HTMLInputElement;

          this.setProps({ errors: { ...this.props.errors, phone: '' } });
          this.children.InputPhone.setProps({
            error: this.props.errors.phone,
          });
          this.setProps({ formState: { ...this.props.formState, phone: value } });
        },
        onBlur: (event) => {
          const { value } = event.target as HTMLInputElement;

          if (!isValidPhone(value)) {
            this.setProps({ errors: { ...this.props.errors, phone: 'Недопустимый телефон' } });
            this.children.InputPhone.setProps({
              error: this.props.errors.phone,
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
            this.setProps({ errors: { ...this.props.errors, password: 'Недопустимый пароль' } });
            this.children.InputPassword.setProps({
              error: this.props.errors.password,
            });
          }
        },
      }),
      InputRepeatPassword: new InputField({
        isNeedLabel: true,
        label: 'Пароль (ещё раз)',
        inputName: 'repeat_password',
        variant: 'underline',
        type: 'password',
        onChange: (event) => {
          const { value } = event.target as HTMLInputElement;
          this.setProps({
            errors: { ...this.props.errors, repeat_password: '' },
            formState: { ...this.props.formState, repeat_password: value },
          });
          this.children.InputRepeatPassword.setProps({
            error: this.props.errors.repeat_password,
          });
        },
        onBlur: (event) => {
          const { value } = event.target as HTMLInputElement;

          if (this.props.formState.password !== value) {
            this.setProps({
              errors: {
                ...this.props.errors,
                repeat_password: 'Пароли должны совпадать',
              },
            });
            this.children.InputRepeatPassword.setProps({
              error: this.props.errors.repeat_password,
            });
          }
        },
      }),
      ButtonSubmit: new Button({
        label: 'Зарегистрироваться',
        variant: 'primary',
        type: 'submit',
        onClick: (event) => {
          event.preventDefault();

          if (!isValidLogin(this.props.formState.login)) {
            this.setProps({ errors: { ...this.props.errors, login: 'Недопустимый логин' } });
            this.children.InputLogin.setProps({
              error: this.props.errors.login,
            });
          }

          if (!isValidPassword(this.props.formState.password)) {
            this.setProps({ errors: { ...this.props.errors, password: 'Недопустимый пароль' } });
            this.children.InputPassword.setProps({
              error: this.props.errors.password,
            });
          }

          if (!isValidEmail(this.props.formState.email)) {
            this.setProps({ errors: { ...this.props.errors, email: 'Недопустимый email' } });
            this.children.InputEmail.setProps({
              error: this.props.errors.email,
            });
          }

          if (!isValidPhone(this.props.formState.phone)) {
            this.setProps({ errors: { ...this.props.errors, phone: 'Недопустимый телефон' } });
            this.children.InputPhone.setProps({
              error: this.props.errors.phone,
            });
          }

          if (!isValidName(this.props.formState.first_name)) {
            this.setProps({ errors: { ...this.props.errors, first_name: 'Недопустимое имя' } });
            this.children.InputFirstName.setProps({
              error: this.props.errors.first_name,
            });
          }

          if (!isValidName(this.props.formState.second_name)) {
            this.setProps({ errors: { ...this.props.errors, second_name: 'Недопустимое имя' } });
            this.children.InputSecondName.setProps({
              error: this.props.errors.second_name,
            });
          }

          if (this.props.formState.password !== this.props.formState.repeat_password) {
            this.setProps({ errors: { ...this.props.errors, repeat_password: 'Пароли должны совпадать' } });
            this.children.InputRepeatPassword.setProps({
              error: this.props.errors.repeat_password,
            });
          }

          console.log(this.props.formState);
        },
      }),
      ButtonRegist: new Button({ label: 'Войти', variant: 'transparent', type: 'button' }),

    }, {
      className: 'page',
    });
  }

  private handleChangeInput(name: string, value: string, elementName: string) {
    this.setProps({ errors: { ...this.props.errors, name: '' } });
    this.children[elementName].setProps({
      error: this.props.errors.name,
    });
    this.setProps({ formState: { ...this.props.formState, [name]: value } });
  }

  render(): string {
    return template;
  }
}
