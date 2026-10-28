import React, { useState } from 'react';

export const ClinicalTools: React.FC = () => {
  const [activeTool, setActiveTool] = useState<'swallow-gi' | 'anthropometry' | 'oil-guard'>('swallow-gi');

  // Anthropometry state
  const [waistCm, setWaistCm] = useState(82);
  const [hipCm, setHipCm] = useState(100);
  const [muacCm, setMuacCm] = useState(28);

  const whr = (waistCm / hipCm).toFixed(2);
  const whrRisk = Number(whr) > 0.85 ? 'Elevated cardiovascular visceral fat' : 'Optimal cardiovascular ratio';

  // Palm oil & Seasoning guard state
  const [palmOilSpoons, setPalmOilSpoons] = useState(1);
  const [stockCubes, setStockCubes] = useState(1);

  const swallowsData = [
    {
      name: 'Oatmeal Swallow',
      localName: 'Oats Dumpling',
      gi: 48,
      rating: 'Low GI (Best)',
      fiber: 'High (Beta-glucan)',
      verdict: 'Top clinical recommendation for diabetic glycemic stability and LDL cholesterol lowering.',
      bestPairing: 'Okra Soup (Ila) or Ewedu',
      color: 'bg-[#9ef7a4] text-[#187431]',
    },
    {
      name: 'Àmàlà (Elubo)',
      localName: 'Yam Peel Flour',
      gi: 52,
      rating: 'Low-Medium GI',
      fiber: 'Medium-High (Resistant starch)',
      verdict: 'Excellent traditional option. Slower digestion rate compared to cassava starches.',
      bestPairing: 'Gbẹ̀gìrì & Ewédú (Abula)',
      color: 'bg-[#9ef7a4] text-[#187431]',
    },
    {
      name: 'Plantain Flour',
      localName: 'Unripe Plantain Amala',
      gi: 50,
      rating: 'Low-Medium GI',
      fiber: 'High Resistant Starch',
      verdict: 'Unripe green plantain flour prevents sharp postprandial glucose peaks.',
      bestPairing: 'Efo Riro with spinach',
      color: 'bg-[#bceecb] text-[#002110]',
    },
    {
      name: 'Tuwo Shinkafa',
      localName: 'Northern Rice Swallow',
      gi: 62,
      rating: 'Medium GI',
      fiber: 'Low-Medium',
      verdict: 'Gentle on stomach ulcers. Must be paired with high-fiber baobab leaf soup (Miyan Kuka).',
      bestPairing: 'Miyan Kuka / Miyan Kubewa',
      color: 'bg-[#ffdcc3] text-[#3d1d00]',
    },
    {
      name: 'Ẹ̀bà (Garri)',
      localName: 'Cassava Granules',
      gi: 74,
      rating: 'High GI',
      fiber: 'Low',
      verdict: 'Rapidly hydrolyzes into glucose. Limit to small portion and consume with twice the amount of greens.',
      bestPairing: 'Efo Elegusi loaded with Ugu',
      color: 'bg-[#ffdcc3] text-[#3d1d00]',
    },
    {
      name: 'Pounded Yam (Iyán)',
      localName: 'Boiled Yam Swallow',
      gi: 82,
      rating: 'Very High GI',
      fiber: 'Low-Medium',
      verdict: 'Causes steep insulin spikes. Recommended only for heavy manual exertion or celebratory moderation.',
      bestPairing: 'Egusi with bitterleaf',
      color: 'bg-[#ffdad6] text-[#93000a]',
    },
  ];

  return (
    <div className="flex flex-col w-full max-w-2xl mx-auto px-4 py-4 pb-24 text-[#121c2a] space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg font-bold font-heading text-[#121c2a]">
            Clinical Dietetics &amp; Anthropometrics
          </h2>
          <p className="text-xs text-[#414942]">
            Diagnostic tools formulated for Nigerian &amp; African physiology
          </p>
        </div>
      </div>

      {/* Segmented Control Tabs */}
      <div className="flex bg-[#eff4ff] p-1 rounded-2xl border border-[#dee9fc]">
        <button
          onClick={() => setActiveTool('swallow-gi')}
          className={`flex-1 py-2 text-xs font-bold rounded-xl transition-all ${
            activeTool === 'swallow-gi'
              ? 'bg-[#14432a] text-white shadow-sm'
              : 'text-[#414942] hover:text-[#121c2a]'
          }`}
        >
          Swallows GI
        </button>
        <button
          onClick={() => setActiveTool('anthropometry')}
          className={`flex-1 py-2 text-xs font-bold rounded-xl transition-all ${
            activeTool === 'anthropometry'
              ? 'bg-[#14432a] text-white shadow-sm'
              : 'text-[#414942] hover:text-[#121c2a]'
          }`}
        >
          MUAC &amp; Waist
        </button>
        <button
          onClick={() => setActiveTool('oil-guard')}
          className={`flex-1 py-2 text-xs font-bold rounded-xl transition-all ${
            activeTool === 'oil-guard'
              ? 'bg-[#14432a] text-white shadow-sm'
              : 'text-[#414942] hover:text-[#121c2a]'
          }`}
        >
          Oil &amp; Salt Guard
        </button>
      </div>

      {/* Tool 1: Swallow GI Comparison */}
      {activeTool === 'swallow-gi' && (
        <div className="flex flex-col gap-3">
          <div className="bg-[#eff4ff] p-3.5 rounded-2xl border border-[#dee9fc] text-xs">
            <span className="font-bold text-[#002c17]">Clinical Principle:</span> Nigerian swallows differ dramatically in glycemic response. Choosing low-GI varieties paired with viscous soups (Ewedu, Okra) flattens post-meal glucose spikes by up to 40%.
          </div>

          <div className="flex flex-col gap-2.5">
            {swallowsData.map((s) => (
              <div
                key={s.name}
                className="bg-white rounded-2xl p-4 shadow-sm border border-[#E8E3D7] flex flex-col gap-2 hover:border-[#c1c9c0] transition-all"
              >
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="text-sm font-bold font-heading text-[#121c2a]">{s.name}</h3>
                    <span className="text-[11px] text-[#414942]">{s.localName}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-[#121c2a]">GI: {s.gi}</span>
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${s.color}`}>
                      {s.rating}
                    </span>
                  </div>
                </div>

                <p className="text-xs text-[#414942] leading-relaxed">{s.verdict}</p>

                <div className="flex items-center justify-between pt-1 border-t border-[#E8E3D7] text-[11px]">
                  <span className="text-[#414942]">
                    Fiber: <strong className="text-[#121c2a]">{s.fiber}</strong>
                  </span>
                  <span className="text-[#0d6d2b] font-semibold">
                    Optimal Soup: {s.bestPairing}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tool 2: Anthropometry & Stature */}
      {activeTool === 'anthropometry' && (
        <div className="flex flex-col gap-4">
          <div className="bg-white rounded-2xl p-4 shadow-sm border border-[#E8E3D7] flex flex-col gap-4">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-bold font-heading text-[#121c2a]">
                Waist-to-Hip Ratio (WHR)
              </h3>
              <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-[#9ef7a4] text-[#187431]">
                Ratio: {whr}
              </span>
            </div>

            <p className="text-xs text-[#414942]">
              Assesses visceral fat distribution around central vital organs.
            </p>

            <div className="flex flex-col gap-3">
              <div>
                <div className="flex justify-between text-xs font-semibold mb-1">
                  <span>Waist Circumference</span>
                  <span className="font-bold text-[#121c2a]">{waistCm} cm</span>
                </div>
                <input
                  type="range"
                  min={60}
                  max={130}
                  value={waistCm}
                  onChange={(e) => setWaistCm(parseInt(e.target.value, 10))}
                  className="w-full h-2 bg-[#eff4ff] rounded-lg appearance-none cursor-pointer accent-[#14432a]"
                />
              </div>

              <div>
                <div className="flex justify-between text-xs font-semibold mb-1">
                  <span>Hip Circumference</span>
                  <span className="font-bold text-[#121c2a]">{hipCm} cm</span>
                </div>
                <input
                  type="range"
                  min={70}
                  max={140}
                  value={hipCm}
                  onChange={(e) => setHipCm(parseInt(e.target.value, 10))}
                  className="w-full h-2 bg-[#eff4ff] rounded-lg appearance-none cursor-pointer accent-[#14432a]"
                />
              </div>
            </div>

            <div className="bg-[#FAF8F5] p-3 rounded-xl border border-[#E8E3D7] text-xs flex items-center gap-2">
              <span className="material-symbols-outlined text-[#0d6d2b] text-base">info</span>
              <span>{whrRisk}</span>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-4 shadow-sm border border-[#E8E3D7] flex flex-col gap-3">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-bold font-heading text-[#121c2a]">
                Mid-Upper Arm Circumference (MUAC)
              </h3>
              <span className="text-xs font-bold text-[#002c17]">{muacCm} cm</span>
            </div>

            <p className="text-xs text-[#414942]">
              Gold standard indicator to guarantee fat loss without skeletal muscle degradation during caloric deficits.
            </p>

            <input
              type="range"
              min={20}
              max={45}
              value={muacCm}
              onChange={(e) => setMuacCm(parseInt(e.target.value, 10))}
              className="w-full h-2 bg-[#eff4ff] rounded-lg appearance-none cursor-pointer accent-[#14432a]"
            />

            <span className="text-xs text-[#0d6d2b] font-semibold">
              Status: Healthy adult lean mass preserved (Standard: &gt; 24.5 cm)
            </span>
          </div>
        </div>
      )}

      {/* Tool 3: Palm Oil & Seasoning Guard */}
      {activeTool === 'oil-guard' && (
        <div className="flex flex-col gap-4">
          <div className="bg-white rounded-2xl p-4 shadow-sm border border-[#E8E3D7] flex flex-col gap-4">
            <h3 className="text-sm font-bold font-heading text-[#121c2a]">
              Daily Red Palm Oil &amp; Sodium Guard
            </h3>

            {/* Palm Oil */}
            <div className="flex items-center justify-between bg-[#FAF8F5] p-3 rounded-xl border border-[#E8E3D7]">
              <div>
                <span className="text-xs font-bold text-[#121c2a] block">Red Palm Oil Spoons</span>
                <span className="text-[11px] text-[#414942]">~120 kcal per tablespoon</span>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setPalmOilSpoons(Math.max(0, palmOilSpoons - 1))}
                  className="w-7 h-7 bg-white rounded-lg border border-[#E8E3D7] font-bold text-xs"
                >
                  -
                </button>
                <span className="text-sm font-bold w-6 text-center">{palmOilSpoons} tbsp</span>
                <button
                  onClick={() => setPalmOilSpoons(palmOilSpoons + 1)}
                  className="w-7 h-7 bg-white rounded-lg border border-[#E8E3D7] font-bold text-xs"
                >
                  +
                </button>
              </div>
            </div>

            {/* Stock Cubes */}
            <div className="flex items-center justify-between bg-[#FAF8F5] p-3 rounded-xl border border-[#E8E3D7]">
              <div>
                <span className="text-xs font-bold text-[#121c2a] block">Seasoning Cubes Used</span>
                <span className="text-[11px] text-[#414942]">~950mg sodium per cube</span>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setStockCubes(Math.max(0, stockCubes - 1))}
                  className="w-7 h-7 bg-white rounded-lg border border-[#E8E3D7] font-bold text-xs"
                >
                  -
                </button>
                <span className="text-sm font-bold w-6 text-center">{stockCubes}</span>
                <button
                  onClick={() => setStockCubes(stockCubes + 1)}
                  className="w-7 h-7 bg-white rounded-lg border border-[#E8E3D7] font-bold text-xs"
                >
                  +
                </button>
              </div>
            </div>

            {/* Clinical Alternative Recommendations */}
            <div className="bg-[#eff4ff] p-3.5 rounded-xl border border-[#dee9fc] text-xs space-y-2">
              <span className="font-bold text-[#002c17]">Recommended Clinical Swaps:</span>
              <ul className="space-y-1.5 text-[#414942]">
                <li className="flex items-start gap-1.5">
                  <span className="material-symbols-outlined text-[#0d6d2b] text-sm mt-0.5">check</span>
                  <span><strong>Locust Beans (Iru / Dawadawa):</strong> Replaces 2 seasoning cubes with natural fermented umami and zero added sodium.</span>
                </li>
                <li className="flex items-start gap-1.5">
                  <span className="material-symbols-outlined text-[#0d6d2b] text-sm mt-0.5">check</span>
                  <span><strong>Smoked Crayfish Powder:</strong> Provides rich body to soups, allowing you to drop palm oil to just 1 tablespoon.</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
