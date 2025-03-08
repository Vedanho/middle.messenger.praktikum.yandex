import template from './profile-change.hbs?raw';
import Block from '../../core/block';
import {
  Button,
  InputField,
  NavBack,
  ProfileAvatar,
} from '../../components';

interface FormState {
  email: string;
  login: string;
  first_name: string;
  second_name: string;
  display_name: string;
  phone: string;
}

type ProfileChangePageProps = {
  formState: FormState;
}

export default class ProfileChangePage extends Block<ProfileChangePageProps> {
  constructor(props: ProfileChangePageProps) {
    super('main', {
      ...props,
      formState: {
        email: '',
        login: '',
        first_name: '',
        second_name: '',
        display_name: '',
        phone: '',
      },
      NavBack: new NavBack(),
      ProfileAvatar: new ProfileAvatar({}),
      SubmitButton: new Button({
        buttonClassName: 'profile-actions__save-changes-btn',
        label: 'Сохранить',
        variant: 'primary',
        type: 'submit',
        onClick: (event) => {
          event.preventDefault();
          // eslint-disable-next-line no-console
          console.log(this.props.formState);
        },
      }),
      InputEmail: new InputField({
        type: 'text',
        onChange: (event) => {
          const { value } = event.target as HTMLInputElement;
          this.handleChangeInput({
            field: 'email',
            value,
            elementName: 'InputEmail',
          });
        },
      }),
      InputLogin: new InputField({
        type: 'text',
        onChange: (event) => {
          const { value } = event.target as HTMLInputElement;
          this.handleChangeInput({
            field: 'login',
            value,
            elementName: 'InputLogin',
          });
        },
      }),
      InputName: new InputField({
        type: 'text',
        onChange: (event) => {
          const { value } = event.target as HTMLInputElement;
          this.handleChangeInput({
            field: 'first_name',
            value,
            elementName: 'InputName',
          });
        },
      }),
      InputSecondName: new InputField({
        type: 'text',
        onChange: (event) => {
          const { value } = event.target as HTMLInputElement;
          this.handleChangeInput({
            field: 'second_name',
            value,
            elementName: 'InputSecondName',
          });
        },
      }),
      InputDisplayName: new InputField({
        type: 'text',
        onChange: (event) => {
          const { value } = event.target as HTMLInputElement;
          this.handleChangeInput({
            field: 'display_name',
            value,
            elementName: 'InputDisplayName',
          });
        },
      }),
      InputPhone: new InputField({
        type: 'number',
        onChange: (event) => {
          const { value } = event.target as HTMLInputElement;
          this.handleChangeInput({
            field: 'phone',
            value,
            elementName: 'InputPhone',
          });
        },
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

  public render(): string {
    return template;
  }
}
