import { Story, Meta } from '@storybook/angular/types-6-0';
import { moduleMetadata } from '@storybook/angular';
import { CommonModule } from '@angular/common';
import { SpinComponent } from './spin.component';

export default {
  title: 'Component/Spin',
  component: SpinComponent,
  decorators: [
    moduleMetadata({
      imports: [CommonModule],
    }),
  ],
  argTypes: {
    loading: {
      name: 'Loading',
      description: '',
    },
    text: {
      name: 'Text',
      description: '',
    },
  },
} as Meta;

const Template: Story<SpinComponent> = (args: SpinComponent) => ({
  props: args,
  template: `<g-spin [loading]="loading" [text]="text">
    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus vel dapibus nibh. Proin gravida volutpat ex non porttitor. Suspendisse rhoncus finibus diam et mattis. Donec nec purus tortor. Suspendisse potenti. Sed mollis, ipsum sodales dapibus vestibulum, nisi libero varius neque, sit amet porta mauris mi id neque. Cras gravida arcu in tincidunt pulvinar. In varius euismod tellus, at posuere nisl pharetra sit amet. Vestibulum enim magna, blandit ut venenatis vitae, finibus ut lectus. Suspendisse tempor turpis urna, sed ultricies purus consectetur a. Vivamus semper libero at est maximus sodales. Mauris egestas elit nec velit dapibus molestie. Morbi nec magna velit. Nulla quis ipsum non mi cursus accumsan a et sapien. Sed aliquam laoreet quam a iaculis.</p>
    <p>Sed magna eros, consectetur quis ex efficitur, semper fermentum nunc. In eu fringilla ipsum. Nulla tincidunt, urna vitae elementum fermentum, arcu augue accumsan mi, mollis scelerisque augue felis non felis. In porttitor imperdiet suscipit. Pellentesque dignissim rhoncus porta. Pellentesque efficitur bibendum nibh, nec cursus erat feugiat sed. Sed ut ultricies urna. Curabitur euismod, augue tincidunt ultricies porttitor, libero massa dictum ex, non tristique enim eros a orci. Nunc interdum tortor sollicitudin eros condimentum, et accumsan turpis lobortis. Suspendisse libero velit, semper a dignissim eu, porta at urna. Sed sollicitudin congue ex, nec bibendum neque scelerisque eu. Nullam consequat elementum odio. Aliquam nulla magna, venenatis ac dolor sit amet, commodo interdum mauris. Phasellus non nunc mauris. Morbi et mattis risus. Morbi dapibus, orci et viverra dictum, mauris purus rhoncus lectus, ut vehicula nulla enim vitae mi.</p>
  </g-spin>`,
});
export const Loading = Template.bind({});
Loading.args = {
  loading: true,
};
export const Text = Template.bind({});
Text.args = {
  loading: true,
  text: 'Customs Text',
};
