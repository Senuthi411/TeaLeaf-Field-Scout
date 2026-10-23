import { config } from '../container.js';
import RequireAuth from '../presentation/state/RequireAuth.js';
import Real from '../presentation/screens/ParcelsScreen.js';
import ComingSoon from '../presentation/screens/ComingSoonScreen.js';

// Presentation mode: this page is intentionally blank (see src/constants/config.js).
export default function Route() {
  return (
    <RequireAuth>
      {config.presentationMode ? <ComingSoon title="Parcels" tab="parcels" /> : <Real />}
    </RequireAuth>
  );
}
