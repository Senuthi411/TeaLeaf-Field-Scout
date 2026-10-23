import RequireAuth from '../../presentation/state/RequireAuth.js';
import Screen from '../../presentation/screens/ResumeDraftScreen.js';

export default function Route() {
  return (
    <RequireAuth>
      <Screen />
    </RequireAuth>
  );
}
