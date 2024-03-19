import { create } from "zustand";

const useQRScannerStore = create((set) => ({
  scannedCodeStudent: null,
  scannedCodeBook: null,
  setScannedCodeStudent: (scannedCodeStudent) => set({ scannedCodeStudent }),
  setScannedCodeBook: (scannedCodeBook) => set({ scannedCodeBook }),
}));

export default useQRScannerStore;
