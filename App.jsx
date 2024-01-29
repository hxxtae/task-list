import { RecoilRoot } from 'recoil';

import MainNavigator from './navigation/MainNavigator';

export default function App() {

  return (
    <RecoilRoot>
      <MainNavigator />
    </RecoilRoot>
  );
}
