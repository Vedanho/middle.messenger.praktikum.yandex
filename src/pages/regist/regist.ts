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

enum ErrorMessages {
  LOGIN_ERROR = 'Недопустимый логин',
  FIRST_NAME_ERROR = 'Недопустимое имя',
  SECOND_NAME_ERROR = 'Недопустимая фамилия',
  PHONE_ERROR = 'Недопустимый номер телефона',
  PASSWORD_ERROR = 'Недопустимый пароль',
  REPEAT_PASSWORD_ERROR = 'Пароли должны совпадать',
  EMAIL_ERROR = 'Недопустимый email',
}

type RegistProps = {
  formState: FormState;
}

export default class Regist extends Block<RegistProps> {
  constructor(props: RegistProps) {
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
      InputEmail: new InputField({
        isNeedLabel: true,
        label: 'Почта',
        inputName: 'email',
        variant: 'underline',
        type: 'text',
        onChange: (event) => {
          const { value } = event.target as HTMLInputElement;
          this.handleChangeInput({
            field: 'email',
            value,
            elementName: 'InputEmail',
          });
        },
        onBlur: (event) => {
          const { value } = event.target as HTMLInputElement;

          if (!isValidEmail(value)) {
            this.setErrorMsg({ elementName: 'InputEmail', errorMessage: ErrorMessages.EMAIL_ERROR });
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
          this.handleChangeInput({
            field: 'first_name',
            value,
            elementName: 'InputFirstName',
          });
        },
        onBlur: (event) => {
          const { value } = event.target as HTMLInputElement;

          if (!isValidName(value)) {
            this.setErrorMsg({ elementName: 'InputFirstName', errorMessage: ErrorMessages.FIRST_NAME_ERROR });
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
          this.handleChangeInput({ field: 'second_name', value, elementName: 'InputSecondName' });
        },
        onBlur: (event) => {
          const { value } = event.target as HTMLInputElement;

          if (!isValidName(value)) {
            this.setErrorMsg({ elementName: 'InputSecondName', errorMessage: ErrorMessages.SECOND_NAME_ERROR });
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

          this.handleChangeInput({ field: 'login', value, elementName: 'InputLogin' });
        },
        onBlur: (event) => {
          const { value } = event.target as HTMLInputElement;

          if (!isValidLogin(value)) {
            this.setErrorMsg({ elementName: 'InputLogin', errorMessage: ErrorMessages.LOGIN_ERROR });
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

          this.handleChangeInput({ field: 'phone', value, elementName: 'InputPhone' });
        },
        onBlur: (event) => {
          const { value } = event.target as HTMLInputElement;

          if (!isValidPhone(value)) {
            this.setErrorMsg({ elementName: 'InputPhone', errorMessage: ErrorMessages.PHONE_ERROR });
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
          this.handleChangeInput({ field: 'password', value, elementName: 'InputPassword' });
        },
        onBlur: (event) => {
          const { value } = event.target as HTMLInputElement;

          if (!isValidPassword(value)) {
            this.setErrorMsg({ elementName: 'InputPassword', errorMessage: ErrorMessages.PASSWORD_ERROR });
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
          this.handleChangeInput({ field: 'repeat_password', value, elementName: 'InputRepeatPassword' });
        },
        onBlur: (event) => {
          const { value } = event.target as HTMLInputElement;

          if (this.props.formState.password !== value) {
            this.setErrorMsg({ elementName: 'InputRepeatPassword', errorMessage: ErrorMessages.REPEAT_PASSWORD_ERROR });
          }
        },
      }),
      ButtonSubmit: new Button({
        label: 'Зарегистрироваться',
        variant: 'primary',
        type: 'submit',
        onClick: (event) => {
          event.preventDefault();
          this.validateAllFields();

          console.log(this.props.formState);
        },
      }),
      ButtonRegist: new Button({ label: 'Войти', variant: 'transparent', type: 'button' }),

    }, {
      className: 'page',
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

  private validateAllFields() {
    if (!isValidEmail(this.props.formState.email)) {
      this.setErrorMsg({ elementName: 'InputEmail', errorMessage: ErrorMessages.EMAIL_ERROR });
    }

    if (!isValidLogin(this.props.formState.login)) {
      this.setErrorMsg({ elementName: 'InputLogin', errorMessage: ErrorMessages.LOGIN_ERROR });
    }

    if (!isValidPassword(this.props.formState.password)) {
      this.setErrorMsg({ elementName: 'InputPassword', errorMessage: ErrorMessages.PASSWORD_ERROR });
    }

    if (!isValidPhone(this.props.formState.phone)) {
      this.setErrorMsg({ elementName: 'InputPhone', errorMessage: ErrorMessages.PHONE_ERROR });
    }

    if (!isValidName(this.props.formState.first_name)) {
      this.setErrorMsg({ elementName: 'InputFirstName', errorMessage: ErrorMessages.FIRST_NAME_ERROR });
    }

    if (!isValidName(this.props.formState.second_name)) {
      this.setErrorMsg({ elementName: 'InputSecondName', errorMessage: ErrorMessages.SECOND_NAME_ERROR });
    }

    if (this.props.formState.password !== this.props.formState.repeat_password) {
      this.setErrorMsg({ elementName: 'InputRepeatPassword', errorMessage: ErrorMessages.REPEAT_PASSWORD_ERROR });
    }
  }

  render(): string {
    return template;
  }
}
