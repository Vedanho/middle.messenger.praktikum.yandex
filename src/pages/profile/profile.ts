import template from './profile.hbs?raw';
import Block from '../../core/block';
import {
  AvatarDownloadModal, NavBack, ProfileAvatar, ProfileInfo,
} from '../../components';

type ProfilePageProps = {
  isShowModal?: boolean;
}

export default class ProfilePage extends Block<ProfilePageProps> {
  constructor(props: ProfilePageProps) {
    super('main', {
      ...props,
      NavBack: new NavBack(),
      ProfileInfo: new ProfileInfo(),
      ProfileAvatar: new ProfileAvatar({
        onClick: () => this.setProps({ isShowModal: true }),
        name: 'badrudi',
      }),
      AvatarModal: new AvatarDownloadModal({
        onClick: () => {
          this.setProps({ isShowModal: false });
        },
      }),
    }, {
      className: 'profile-page',
    });
  }

  public render(): string {
    return template;
  }
}
