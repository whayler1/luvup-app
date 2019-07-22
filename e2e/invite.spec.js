import { reloadApp } from 'detox-expo-helpers';
// import { elementById, elementByText, generateUser } from './helpers';

describe('invite', () => {
  beforeEach(async () => {
    await reloadApp({
      permissions: { location: 'always', notifications: 'YES' },
      // newInstance: true,
      // url: 'https://luvup.io/user-invite/abc123',
      //   sourceApp: 'com.apple.mobilesafari'
    });
  });

  it('foo', async () => {
    console.log('\n\n device', device, '\n\n openUrk', device.openURL);
    const idk = await device.openURL({
      url: 'exp://127.0.0.1:19000/--/https://luvup.io/user-invite/abc12345',
      sourceApp: 'com.apple.mobilesafari',
    });
    console.log('idk', idk);
  });
});
