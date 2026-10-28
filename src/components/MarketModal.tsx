import React, { useState } from 'react';
import { INITIAL_MARKET_ITEMS } from '../data/marketList';
import { MarketItem } from '../types';

interface MarketModalProps {
  isOpen: boolean;
  onClose: () => void;
  onToast: (msg: string, icon?: string) => void;
}

export const MarketModal: React.FC<MarketModalProps> = ({ isOpen, onClose, onToast }) => {
  const [items, setItems] = useState<MarketItem[]>(INITIAL_MARKET_ITEMS);

  if (!isOpen) return null;

  const toggleCheck = (id: string) => {
    setItems((prev) =>
      prev.map((item) => (item.id === id ? { ...item, checked: !item.checked } : item))
    );
  };

  const openMarketItems = items.filter((i) => i.marketType === 'open-market');
  const supermarketItems = items.filter((i) => i.marketType === 'supermarket');

  const totalNgn = items.reduce((acc, curr) => acc + curr.priceNgn, 0);

  const handleCopyWhatsApp = () => {
    const listText = `🛒 *Self-Diet Therapy Nigerian Grocery List*\n\n*Open Market (Mile 12 / Bodija / Utako):*\n${openMarketItems
      .map((i) => `• [${i.checked ? 'x' : ' '}] ${i.name} - ₦${i.priceNgn.toLocaleString()}`)
      .join('\n')}\n\n*Supermarket:*\n${supermarketItems
      .map((i) => `• [${i.checked ? 'x' : ' '}] ${i.name} - ₦${i.priceNgn.toLocaleString()}`)
      .join('\n')}\n\n*Estimated 7-Day Total:* ₦${totalNgn.toLocaleString()}\n\n_Calibrated for healthy Nigerian nutrition_`;

    navigator.clipboard?.writeText(listText).then(() => {
      onToast('Market list copied to clipboard for WhatsApp!', 'content_copy');
    }).catch(() => {
      onToast('Market list ready to share', 'content_copy');
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/50 backdrop-blur-xs p-0 sm:p-4 transition-opacity">
      <div className="bg-white rounded-t-3xl sm:rounded-3xl w-full max-w-lg p-5 shadow-2xl max-h-[85vh] overflow-y-auto border border-[#E8E3D7]">
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-[#E8E3D7]">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-[#eff4ff] text-[#0d6d2b] flex items-center justify-center">
              <span className="material-symbols-outlined text-2xl">storefront</span>
            </div>
            <div>
              <h2 className="text-base font-bold font-heading text-[#121c2a]">
                Nigerian Market Shopping List
              </h2>
              <p className="text-xs text-[#414942]">
                Segmented by local open market &amp; supermarket
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-[#FAF8F5] text-[#414942] hover:bg-gray-200 flex items-center justify-center"
            type="button"
          >
            <span className="material-symbols-outlined text-lg">close</span>
          </button>
        </div>

        {/* Segment 1: Open Market */}
        <div className="mt-4">
          <div className="flex items-center justify-between bg-[#eff4ff] px-3 py-2 rounded-xl mb-2">
            <span className="text-xs font-bold text-[#002c17]">
              Open Market (Mile 12 / Bodija / Utako)
            </span>
            <span className="text-[10px] bg-[#9ef7a4] text-[#187431] px-2 py-0.5 rounded font-bold">
              Fresh &amp; Staples
            </span>
          </div>

          <ul className="space-y-1.5">
            {openMarketItems.map((item) => (
              <li
                key={item.id}
                onClick={() => toggleCheck(item.id)}
                className={`flex items-center justify-between p-2.5 rounded-xl cursor-pointer transition-all border ${
                  item.checked
                    ? 'bg-[#FAF8F5] border-[#E8E3D7] opacity-80'
                    : 'bg-white border-[#E8E3D7] hover:border-[#c1c9c0]'
                }`}
              >
                <div className="flex items-center gap-2.5 min-w-0">
                  <span
                    className={`material-symbols-outlined text-lg ${
                      item.checked ? 'text-[#0d6d2b]' : 'text-gray-300'
                    }`}
                    style={item.checked ? { fontVariationSettings: "'FILL' 1" } : undefined}
                  >
                    {item.checked ? 'check_circle' : 'radio_button_unchecked'}
                  </span>
                  <span
                    className={`text-xs text-[#121c2a] truncate ${
                      item.checked ? 'line-through text-[#717972]' : 'font-semibold'
                    }`}
                  >
                    {item.name}
                  </span>
                </div>
                <span className="text-xs font-bold text-[#14432a] flex-shrink-0">
                  ₦{item.priceNgn.toLocaleString()}
                </span>
              </li>
            ))}
          </ul>
        </div>

        {/* Segment 2: Supermarket */}
        <div className="mt-4">
          <div className="flex items-center justify-between bg-[#eff4ff] px-3 py-2 rounded-xl mb-2">
            <span className="text-xs font-bold text-[#002c17]">
              Supermarket (Shoprite / Prince Ebeano)
            </span>
            <span className="text-[10px] bg-[#ffdcc3] text-[#3d1d00] px-2 py-0.5 rounded font-bold">
              Packaged Items
            </span>
          </div>

          <ul className="space-y-1.5">
            {supermarketItems.map((item) => (
              <li
                key={item.id}
                onClick={() => toggleCheck(item.id)}
                className={`flex items-center justify-between p-2.5 rounded-xl cursor-pointer transition-all border ${
                  item.checked
                    ? 'bg-[#FAF8F5] border-[#E8E3D7] opacity-80'
                    : 'bg-white border-[#E8E3D7] hover:border-[#c1c9c0]'
                }`}
              >
                <div className="flex items-center gap-2.5 min-w-0">
                  <span
                    className={`material-symbols-outlined text-lg ${
                      item.checked ? 'text-[#0d6d2b]' : 'text-gray-300'
                    }`}
                    style={item.checked ? { fontVariationSettings: "'FILL' 1" } : undefined}
                  >
                    {item.checked ? 'check_circle' : 'radio_button_unchecked'}
                  </span>
                  <span
                    className={`text-xs text-[#121c2a] truncate ${
                      item.checked ? 'line-through text-[#717972]' : 'font-semibold'
                    }`}
                  >
                    {item.name}
                  </span>
                </div>
                <span className="text-xs font-bold text-[#14432a] flex-shrink-0">
                  ₦{item.priceNgn.toLocaleString()}
                </span>
              </li>
            ))}
          </ul>
        </div>

        {/* Basket Total & WhatsApp Export */}
        <div className="mt-5 pt-3 border-t border-[#E8E3D7] flex items-center justify-between">
          <div>
            <span className="text-[10px] uppercase font-bold text-[#414942] block">
              Estimated 7-Day Basket
            </span>
            <span className="text-lg font-bold font-heading text-[#002c17]">
              ₦{totalNgn.toLocaleString()}
            </span>
          </div>

          <button
            onClick={handleCopyWhatsApp}
            className="px-4 py-2.5 bg-[#002c17] hover:bg-[#14432a] text-white rounded-xl text-xs font-bold shadow-md active:scale-95 transition-all flex items-center gap-1.5"
            type="button"
          >
            <span className="material-symbols-outlined text-base">content_copy</span>
            <span>Copy to WhatsApp</span>
          </button>
        </div>
      </div>
    </div>
  );
};
