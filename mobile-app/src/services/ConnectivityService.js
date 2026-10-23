// Adapter around NetInfo. "Online" only means the phone has a network, NOT that a TeaLeaf
// server exists or is reachable (there is no backend yet).
import NetInfo from '@react-native-community/netinfo';

export const ConnectivityService = {
  subscribe(listener) {
    return NetInfo.addEventListener((state) => {
      listener(state.isConnected === true && state.isInternetReachable !== false);
    });
  },
};
