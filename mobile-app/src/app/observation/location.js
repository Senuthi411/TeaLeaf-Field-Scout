import RequireAuth from '../../presentation/state/RequireAuth.js';
import Screen from '../../presentation/screens/LocationSelectionScreen.js';

export default function Route() {
  return (
    <RequireAuth>
      <Screen />
    </RequireAuth>
  );
}
