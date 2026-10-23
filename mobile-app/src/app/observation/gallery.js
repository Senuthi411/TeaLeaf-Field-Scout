import RequireAuth from '../../presentation/state/RequireAuth.js';
import Screen from '../../presentation/screens/CaptureGalleryScreen.js';

export default function Route() {
  return (
    <RequireAuth>
      <Screen />
    </RequireAuth>
  );
}
