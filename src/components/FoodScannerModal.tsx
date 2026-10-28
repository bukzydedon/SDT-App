import React, { useState } from 'react';

interface FoodScannerModalProps {
  isOpen: boolean;
  onClose: () => void;
  onToast: (msg: string, icon?: string) => void;
}

interface ScanResult {
  name: string;
  category: string;
  status: 'safe' | 'caution' | 'alert';
  badge: string;
  sodiumRating: string;
  glycemicImpact: string;
  caloricDensity: string;
  clinicalVerdict: string;
  healthyNaijaSwap: string;
}

export const FoodScannerModal: React.FC<FoodScannerModalProps> = ({
  isOpen,
  onClose,
  onToast,
}) => {
  const [activeScanItem, setActiveScanItem] = useState<ScanResult | null>(null);
  const [isScanning, setIsScanning] = useState(false);

  if (!isOpen) return null;

  const mockScanDatabase: { [key: string]: ScanResult } = {
    'noodles': {
      name: 'Instant Noodles (70g Single Pack)',
      category: 'Ultra-Processed Packaged Grain',
      status: 'alert',
      badge: 'High Sodium & Refined Palm Fat',
      sodiumRating: '1,420mg (78% of daily limit)',
      glycemicImpact: 'High GI (Fast sugar spike)',
      caloricDensity: '360 kcal per small pack',
      clinicalVerdict:
        'Contains deep-fried refined wheat and high MSG/sodium seasoning sachets. Promotes fluid retention and arterial stiffness in hypertension.',
      healthyNaijaSwap:
        'Swap for Unpolished Ofada Brown Rice with boiled egg, or homemade spaghetti stir-fry with shredded ugu leaves and ground crayfish.',
    },
    'puffpuff': {
      name: 'Street-Side Puff-Puff (3 balls)',
      category: 'Deep-Fried Street Confection',
      status: 'caution',
      badge: 'Refined Sugar & Oil Saturated',
      sodiumRating: '240mg (Low)',
      glycemicImpact: 'High GI',
      caloricDensity: '410 kcal (24g oxidized oil)',
      clinicalVerdict:
        'High thermal degradation of repeated frying oil and fast glucose absorption. Increases visceral abdominal adiposity.',
      healthyNaijaSwap:
        'Swap for 2-3 pieces of oil-drained Akara (bean fritters) or roasted plantain (Boli) with a small handful of groundnuts.',
    },
    'semovita': {
      name: 'Commercial Semovita Swallow (1 wrap)',
      category: 'Refined Wheat Swallow',
      status: 'caution',
      badge: 'Stripped Cereal Endosperm',
      sodiumRating: '15mg (Low)',
      glycemicImpact: 'High GI (GI ~ 76)',
      caloricDensity: '390 kcal per 120g wrap',
      clinicalVerdict:
        'Lacks whole bran and germ. Absorbs rapidly into the bloodstream, triggering insulin peaks.',
      healthyNaijaSwap:
        'Swap for high-fiber Oatmeal Swallow or Àmàlà (yam peel flour) with viscous Ewedu soup.',
    },
    'ugu': {
      name: 'Fresh Ugu (Fluted Pumpkin) Leaves',
      category: 'Indigenous Botanical Leafy Green',
      status: 'safe',
      badge: 'Clinical Superfood Verified',
      sodiumRating: '18mg (Naturally negligible)',
      glycemicImpact: 'Zero Glycemic Burden',
      caloricDensity: '32 kcal per 100g (Extremely low)',
      clinicalVerdict:
        'Packed with bioavailable non-heme iron, potassium, folate, and polyphenolic flavonoids that protect blood vessel elasticity.',
      healthyNaijaSwap: 'Pair freely with any Nigerian soup, stew, or morning egg scramble!',
    },
  };

  const triggerScan = (key: string) => {
    setIsScanning(true);
    setActiveScanItem(null);
    setTimeout(() => {
      setIsScanning(false);
      setActiveScanItem(mockScanDatabase[key]);
      onToast('Barcode scanned & clinically analyzed!', 'qr_code_scanner');
    }, 700);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4">
      <div className="bg-white rounded-3xl w-full max-w-md p-5 shadow-2xl border border-[#E8E3D7] flex flex-col gap-4 max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-[#E8E3D7] pb-3">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[#0d6d2b] text-2xl">
              qr_code_scanner
            </span>
            <div>
              <h2 className="text-base font-bold font-heading text-[#121c2a]">
                Naija Food Scanner
              </h2>
              <p className="text-[11px] text-[#414942]">Instant Nigerian dietary &amp; barcode audit</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-[#FAF8F5] text-[#414942] hover:bg-gray-200 flex items-center justify-center"
          >
            <span className="material-symbols-outlined text-lg">close</span>
          </button>
        </div>

        {/* Viewfinder simulation */}
        <div className="relative w-full h-44 rounded-2xl bg-[#121c2a] flex items-center justify-center overflow-hidden border-2 border-dashed border-[#0d6d2b]">
          <div className="absolute inset-0 opacity-20 bg-[radial-gradient(#9ef7a4_1px,transparent_1px)] [background-size:16px_16px]"></div>

          {isScanning ? (
            <div className="flex flex-col items-center gap-2 text-white z-10">
              <span className="material-symbols-outlined animate-spin text-3xl text-[#9ef7a4]">
                progress_activity
              </span>
              <span className="text-xs font-semibold text-[#9ef7a4]">
                Scanning Nigerian food database...
              </span>
            </div>
          ) : (
            <div className="flex flex-col items-center gap-2 text-white/80 z-10 p-4 text-center">
              <span className="material-symbols-outlined text-4xl text-[#9ef7a4]">
                center_focus_strong
              </span>
              <span className="text-xs font-medium">
                Point camera at barcode or tap a sample staple below
              </span>
            </div>
          )}

          {/* Animated scan line */}
          <div className="absolute top-0 left-0 right-0 h-1 bg-[#9ef7a4] shadow-[0_0_8px_#9ef7a4] animate-bounce"></div>
        </div>

        {/* Sample Items To Scan */}
        <div className="flex flex-col gap-1.5">
          <span className="text-xs font-bold text-[#414942]">Select Sample To Scan:</span>
          <div className="grid grid-cols-2 gap-2">
            <button
              onClick={() => triggerScan('noodles')}
              className="p-2.5 rounded-xl bg-[#FAF8F5] hover:bg-[#eff4ff] border border-[#E8E3D7] text-left text-xs font-semibold flex items-center gap-2"
            >
              <span className="material-symbols-outlined text-sm text-[#ba1a1a]">warning</span>
              <span className="truncate">Instant Noodles</span>
            </button>
            <button
              onClick={() => triggerScan('puffpuff')}
              className="p-2.5 rounded-xl bg-[#FAF8F5] hover:bg-[#eff4ff] border border-[#E8E3D7] text-left text-xs font-semibold flex items-center gap-2"
            >
              <span className="material-symbols-outlined text-sm text-[#f28b23]">bakery_dining</span>
              <span className="truncate">Street Puff-Puff</span>
            </button>
            <button
              onClick={() => triggerScan('semovita')}
              className="p-2.5 rounded-xl bg-[#FAF8F5] hover:bg-[#eff4ff] border border-[#E8E3D7] text-left text-xs font-semibold flex items-center gap-2"
            >
              <span className="material-symbols-outlined text-sm text-[#f28b23]">grain</span>
              <span className="truncate">Semovita Pack</span>
            </button>
            <button
              onClick={() => triggerScan('ugu')}
              className="p-2.5 rounded-xl bg-[#FAF8F5] hover:bg-[#eff4ff] border border-[#E8E3D7] text-left text-xs font-semibold flex items-center gap-2"
            >
              <span className="material-symbols-outlined text-sm text-[#0d6d2b]">eco</span>
              <span className="truncate">Fresh Ugu Greens</span>
            </button>
          </div>
        </div>

        {/* Scan Result Card */}
        {activeScanItem && (
          <div className="bg-[#FAF8F5] rounded-2xl p-4 border border-[#E8E3D7] flex flex-col gap-2.5 animate-fadeIn">
            <div className="flex items-start justify-between">
              <div>
                <h3 className="text-sm font-bold font-heading text-[#121c2a]">
                  {activeScanItem.name}
                </h3>
                <span className="text-[11px] text-[#414942]">{activeScanItem.category}</span>
              </div>
              <span
                className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                  activeScanItem.status === 'safe'
                    ? 'bg-[#9ef7a4] text-[#187431]'
                    : activeScanItem.status === 'alert'
                    ? 'bg-[#ffdad6] text-[#93000a]'
                    : 'bg-[#ffdcc3] text-[#3d1d00]'
                }`}
              >
                {activeScanItem.badge}
              </span>
            </div>

            <div className="grid grid-cols-2 gap-2 text-[11px] bg-white p-2.5 rounded-xl border border-[#E8E3D7]">
              <div>
                <span className="text-[#414942] block">Sodium Load:</span>
                <strong className="text-[#121c2a]">{activeScanItem.sodiumRating}</strong>
              </div>
              <div>
                <span className="text-[#414942] block">Glycemic Spike:</span>
                <strong className="text-[#121c2a]">{activeScanItem.glycemicImpact}</strong>
              </div>
            </div>

            <p className="text-xs text-[#414942] leading-relaxed">
              <strong className="text-[#121c2a]">Clinical Verdict:</strong> {activeScanItem.clinicalVerdict}
            </p>

            <div className="bg-[#eff4ff] p-3 rounded-xl border border-[#dee9fc] text-xs">
              <span className="font-bold text-[#002c17] block">Therapeutic Nigerian Swap:</span>
              <span className="text-[#414942]">{activeScanItem.healthyNaijaSwap}</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
