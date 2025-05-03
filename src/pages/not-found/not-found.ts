import { Button, ErrorContent } from '../../components';
import Block from '../../core/block';
import template from './not-found.hbs?raw';

class Error extends Block {
  constructor() {
    super('main', {
      ErrorContent: new ErrorContent({
        title: '404',
        description: 'Не туда попали',
      }),
    }, {
      className: 'page',
    });
  }

  render() {
    return template;
  }
}

export default Error;
