import React, { useState } from 'react';

interface ChatMessage {
  id: string;
  sender: 'ada' | 'user';
  text: string;
  time: string;
  clinicalBulletPoints?: string[];
}

export const ConsultDietitian: React.FC = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: '1',
      sender: 'ada',
      text: "Ẹ káàbọ̀! I'm Dr. Ada, your Registered Dietitian Nutritionist. I specialize in West African metabolic health, diabetic stabilization, and sustainable weight management using authentic local ingredients.",
      time: '09:00 AM',
      clinicalBulletPoints: [
        'Ask about Nigerian swallow glycemic comparisons (Amala vs Eba vs Fufu)',
        'Healthy oil reduction techniques for Efo Riro and Banga',
        'Natural umami seasoning (Iru / Dawadawa / Crayfish) instead of high-sodium cubes',
      ],
    },
    {
      id: '2',
      sender: 'user',
      text: 'Dr. Ada, is Àmàlà safe if I am managing pre-diabetes or weight loss?',
      time: '09:02 AM',
    },
    {
      id: '3',
      sender: 'ada',
      text: 'Yes! High quality yam flour (Elubo) Àmàlà has a lower glycemic index (around 52-54) compared to white Garri/Eba or Pounded Yam. Furthermore, when paired with Ewédú (jute leaf soup) and Gbẹ̀gìrì (cowpea soup), the soluble fibers create a gel-like matrix that slows down carbohydrate absorption.',
      time: '09:03 AM',
      clinicalBulletPoints: [
        'Keep portion to 1 standard wrap (~120g dry flour).',
        'Pair with green Ewedu mucilage and lean goat meat or grilled croaker fish.',
        'Drink 500ml water 30 minutes before dining to enhance satiety.',
      ],
    },
  ]);

  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  const quickQuestions = [
    'How can I lower palm oil in Efo Riro without losing flavor?',
    'What are low-sodium seasonings instead of bouillon cubes?',
    'Which Nigerian swallow is best for acid reflux & ulcers?',
    'Is garri and groundnut safe on a weight loss deficit?',
  ];

  const handleSend = (textToSend?: string) => {
    const text = textToSend || inputText;
    if (!text.trim()) return;

    const userMsg: ChatMessage = {
      id: Date.now().toString(),
      sender: 'user',
      text: text.trim(),
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMsg]);
    if (!textToSend) setInputText('');
    setIsTyping(true);

    setTimeout(() => {
      let reply = "That's a vital dietary question for your metabolic plan. Let's optimize it using authentic Nigerian food therapy.";
      let bullets: string[] = [];

      const lower = text.toLowerCase();
      if (lower.includes('oil') || lower.includes('efo') || lower.includes('palm')) {
        reply = "To reduce palm oil in Efo Riro: Sauté your blended pepper base with just 1 tablespoon of unbleached virgin palm oil. Use rich aromatic crayfish broth and locust beans (Iru Woro) to provide deep umami and mouthfeel. You can also finish by folding in lots of chopped fresh spinach (Shoko) which releases natural moisture and coats the proteins beautifully.";
        bullets = [
          'Unbleached palm oil retains beta-carotene and tocotrienols.',
          'Double the ground crayfish to create rich emulsification without extra oil.',
          'Steam greens for under 4 minutes to preserve folate and potassium.',
        ];
      } else if (lower.includes('sodium') || lower.includes('cube') || lower.includes('salt')) {
        reply = "Commercial seasoning cubes can pack over 1,000mg sodium in a single cube! In Nigerian clinical dietetics, we replace excess cubes with fermented locust beans (Iru / Dawadawa), sun-dried ground crayfish, toasted dried onions, and aromatic scent leaf (Efirin / Nchanwu).";
        bullets = [
          'Locust beans deliver natural glutamates for deep savory taste.',
          'Smoked dried catfish and crayfish head powder add intense depth.',
          'Efirin (scent leaf) adds antibacterial and blood-pressure lowering terpenes.',
        ];
      } else if (lower.includes('ulcer') || lower.includes('reflux')) {
        reply = "For acid reflux or gastric ulcers, avoid rough roughage and harsh fried habanero/ata rodo peppers. The top therapeutic swallows are soft fermented Tuwo Shinkafa (rice swallow) and fine Oatmeal swallow, paired with gentle Okra soup or light Ofe Nsala (white soup) without hot pepper.";
        bullets = [
          'Okra and Ewedu mucilage coats and protects inflamed stomach lining.',
          'Ogi/Akamu (fermented pap) with unsweetened milk provides comforting probiotic lactic acid.',
          'Avoid carbonated soft drinks and deep-fried puff-puff or plantain chips.',
        ];
      } else if (lower.includes('garri') || lower.includes('groundnut')) {
        reply = "Drinking Garri with groundnuts is a cultural favorite, but dry Garri has a rapid glycemic spike (GI > 75) and groundnuts are calorie-dense. If you crave it on a deficit, limit Garri to 3 tablespoons, use cold water with ice, and measure exactly 12-15 roasted groundnuts.";
        bullets = [
          'Substitute regular garri drinking with chilled pawpaw or sliced garden eggs.',
          'Always pair with water and protein to blunt insulin spikes.',
        ];
      } else {
        reply = `Regarding "${text}": In our Nigerian clinical protocol, balance is achieved through ancestral preparation: prioritizing high-fiber indigenous greens (Ugu, Utazi, Bitter leaf), selecting unpolished grains like Ofada rice, and balancing healthy protein with controlled red palm oil.`;
        bullets = [
          'Keep your caloric deficit moderate (250-350 kcal) to protect thyroid function.',
          'Stay hydrated with 2.5 - 3.0 Litres of clean water daily.',
          'Log your meals in the planner to review weekly macronutrient shifts.',
        ];
      }

      const adaMsg: ChatMessage = {
        id: (Date.now() + 1).toString(),
        sender: 'ada',
        text: reply,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        clinicalBulletPoints: bullets,
      };

      setMessages((prev) => [...prev, adaMsg]);
      setIsTyping(false);
    }, 700);
  };

  return (
    <div className="flex flex-col w-full max-w-2xl mx-auto px-4 py-4 pb-24 text-[#121c2a] space-y-4">
      {/* Dr. Ada Profile Banner */}
      <div className="bg-[#14432a] text-white rounded-2xl p-4 shadow-md flex items-start gap-3">
        <div className="relative">
          <div className="w-14 h-14 rounded-full overflow-hidden border-2 border-[#9ef7a4] flex-shrink-0 bg-[#002c17]">
            <img
              alt="Dr. Ada RDN"
              className="w-full h-full object-cover"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuDsGaYe-9W2NjH4opNR4XENznXQGXlRNz7QyvRtWgelK6_ASZCKoSKEcChsPpD3hHpK5Ie67D0XXTueVFPcIXo0m5cN6FotLfyRbYWQNaYhsRGpWj2Y4OjSWlnJdDZ5MJQqKLqV4TqwUN3hdF-l5UWkTAEnORMDyRNuBKa6qy8HZGe2m14BgAbuMiiqABu7tAetFzgvtqjf7qGvU2NWX0qJEIOZrqqKRm10Ip9pCdQ"
            />
          </div>
          <span className="absolute bottom-0 right-0 w-3.5 h-3.5 bg-[#9ef7a4] rounded-full border-2 border-[#14432a]"></span>
        </div>

        <div className="flex flex-col min-w-0">
          <div className="flex items-center gap-2">
            <h2 className="text-base font-bold font-heading text-white">Dr. Ada, RDN</h2>
            <span className="text-[10px] bg-[#9ef7a4] text-[#187431] font-bold px-2 py-0.5 rounded-full">
              ONLINE
            </span>
          </div>
          <p className="text-xs text-[#80b08f] font-medium">
            Registered Dietitian Nutritionist • African Metabolic Health
          </p>
          <p className="text-[11px] text-white/80 mt-1">
            Lagos University Teaching Hospital (LUTH) Clinical Dietetics Fellow
          </p>
        </div>
      </div>

      {/* Quick Prompts */}
      <div className="flex flex-col gap-1.5">
        <span className="text-xs font-bold text-[#414942]">Quick Clinical Prompts</span>
        <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
          {quickQuestions.map((q, idx) => (
            <button
              key={idx}
              onClick={() => handleSend(q)}
              className="px-3 py-1.5 rounded-full bg-white text-[#121c2a] text-xs font-medium border border-[#E8E3D7] hover:bg-[#eff4ff] hover:border-[#14432a] whitespace-nowrap transition-all active:scale-95 shadow-xs"
            >
              {q}
            </button>
          ))}
        </div>
      </div>

      {/* Chat Messages Log */}
      <div className="bg-white rounded-2xl p-4 shadow-sm border border-[#E8E3D7] flex flex-col gap-3 min-h-[380px] max-h-[500px] overflow-y-auto">
        {messages.map((m) => (
          <div
            key={m.id}
            className={`flex flex-col ${
              m.sender === 'user' ? 'items-end' : 'items-start'
            }`}
          >
            <div
              className={`max-w-[85%] rounded-2xl p-3.5 text-xs md:text-sm leading-relaxed ${
                m.sender === 'user'
                  ? 'bg-[#14432a] text-white rounded-br-none shadow-xs'
                  : 'bg-[#FAF8F5] text-[#121c2a] rounded-bl-none border border-[#E8E3D7]'
              }`}
            >
              <p>{m.text}</p>

              {m.clinicalBulletPoints && m.clinicalBulletPoints.length > 0 && (
                <ul className="mt-2.5 pt-2 border-t border-[#E8E3D7] space-y-1.5 text-xs text-[#414942]">
                  {m.clinicalBulletPoints.map((b, i) => (
                    <li key={i} className="flex items-start gap-1.5">
                      <span className="material-symbols-outlined text-[#0d6d2b] text-sm mt-0.5 flex-shrink-0">
                        check_circle
                      </span>
                      <span>{b}</span>
                    </li>
                  ))}
                </ul>
              )}

              <span
                className={`block text-[10px] mt-1.5 ${
                  m.sender === 'user' ? 'text-white/70 text-right' : 'text-[#717972]'
                }`}
              >
                {m.time}
              </span>
            </div>
          </div>
        ))}

        {isTyping && (
          <div className="flex items-center gap-1.5 text-xs text-[#0d6d2b] font-semibold bg-[#eff4ff] p-2.5 rounded-xl w-fit">
            <span className="material-symbols-outlined animate-spin text-sm">progress_activity</span>
            <span>Dr. Ada is analyzing Nigerian clinical dietetics reference...</span>
          </div>
        )}
      </div>

      {/* Input Box */}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSend();
        }}
        className="flex gap-2"
      >
        <input
          type="text"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          placeholder="Ask Dr. Ada about Nigerian foods, portion control, or medical goals..."
          className="flex-1 px-4 py-3 bg-white text-xs md:text-sm text-[#121c2a] rounded-2xl border border-[#E8E3D7] focus:outline-none focus:ring-2 focus:ring-[#0d6d2b]/20"
        />
        <button
          type="submit"
          disabled={!inputText.trim() || isTyping}
          className="px-5 py-3 bg-[#14432a] hover:bg-[#002c17] disabled:opacity-50 text-white rounded-2xl font-bold text-xs flex items-center justify-center gap-1 shadow-md transition-all active:scale-95"
        >
          <span className="material-symbols-outlined text-base">send</span>
          <span className="hidden sm:inline">Ask</span>
        </button>
      </form>
    </div>
  );
};
