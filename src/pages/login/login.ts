import template from './login.hbs?raw';
import { Button, InputField } from '../../components';
import Block from '../../core/block';
import { isValidLogin, isValidPassword } from '../../utils/validation';

interface FormState {
  login: string;
  password: string;
}

enum ErrorMessages {
  LOGIN_ERROR = 'Неправильный логин',
  PASSWORD_ERROR = 'Неправильный пароль',
}

type LoginProps = {
  formState: FormState;
}

export default class Login extends Block<LoginProps> {
  constructor(props: LoginProps) {
    super('main', {
      ...props,
      formState: {
        login: '',
        password: '',
      } as FormState,
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
      ButtonSubmit: new Button({
        label: 'Вход',
        variant: 'primary',
        type: 'submit',
        onClick: (event) => {
          event.preventDefault();

          if (!isValidLogin(this.props.formState.login)) {
            this.setErrorMsg({ elementName: 'InputLogin', errorMessage: ErrorMessages.LOGIN_ERROR });
          }

          if (!isValidPassword(this.props.formState.password)) {
            this.setErrorMsg({ elementName: 'InputPassword', errorMessage: ErrorMessages.PASSWORD_ERROR });
          }
          // eslint-disable-next-line no-console
          console.log(this.props.formState);
        },
      }),
      ButtonRegist: new Button({ label: 'Нет аккаунта', variant: 'transparent', type: 'button' }),
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

  public render(): string {
    return (
      template
    );
  }
}
