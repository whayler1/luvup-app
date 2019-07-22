import { Linking } from 'expo';

Linking.addEventListener('url', (...args) => {
  console.log('\n\n linking thing called', args);
});
