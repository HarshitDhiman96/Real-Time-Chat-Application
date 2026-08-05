import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { motion } from 'framer-motion';
import { BatteryCharging, Paperclip, Send, Wifi } from 'lucide-react';

gsap.registerPlugin(useGSAP);

const rotatingWords = ['everywhere', 'every time'];

const RotatingWord = () => {
  const [wordIndex, setWordIndex] = useState(0);
  const [visibleWord, setVisibleWord] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const currentWord = rotatingWords[wordIndex];
    const isComplete = visibleWord === currentWord;
    const isEmpty = visibleWord.length === 0;
    const delay = isComplete && !isDeleting ? 1500 : isDeleting ? 55 : 105;

    const timeout = window.setTimeout(() => {
      if (isComplete && !isDeleting) {
        setIsDeleting(true);
      } else if (isDeleting && isEmpty) {
        setWordIndex((index) => (index + 1) % rotatingWords.length);
        setIsDeleting(false);
      } else {
        setVisibleWord((word) => (
          isDeleting ? word.slice(0, -1) : currentWord.slice(0, word.length + 1)
        ));
      }
    }, delay);

    return () => window.clearTimeout(timeout);
  }, [isDeleting, visibleWord, wordIndex]);

  return (
    <span className="inline-block min-w-[11ch] text-left" aria-live="polite">
      {visibleWord}
      <span className="inline-block h-[0.85em] ml-1 border-r-2 border-current align-[-0.05em] animate-pulse" aria-hidden="true" />
    </span>
  );
};

const FloatingPhone = () => (
  <div
    className="mx-auto w-fit [transform-style:preserve-3d]"
    style={{ transform: 'rotateY(-18deg) rotateX(7deg)' }}
  >
    <motion.div
      animate={{ y: [-4, -15, -4] }}
      transition={{ repeat: Infinity, duration: 3, ease: 'easeInOut' }}
      className="relative h-[396px] w-[226px] rounded-[28px] border-2 border-black bg-[#17131f] p-1.5 shadow-[18px_22px_0_rgba(29,22,42,0.16)]"
    >
      <div className="absolute left-1/2 top-3 z-20 h-3 w-16 -translate-x-1/2 rounded-full bg-[#17131f]" />
      <div className="absolute right-4 top-3 z-20 flex items-center gap-1.5 text-[#77717f]">
        <Wifi className="h-3 w-3" />
        <BatteryCharging className="h-3 w-3" />
      </div>

      <div className="relative h-full overflow-hidden rounded-[22px] bg-[#f7f1ff] pt-9">
        <div className="flex items-center gap-2 border-b border-black/15 px-3 pb-3">
          <img src="/fluxchat_logo.png" alt="" className="h-6 w-6 rounded-[7px]" />
          <div className="min-w-0">
            <p className="truncate text-[10px] font-bold text-black">Main room</p>
            <p className="text-[8px] text-[#5e5b68]">3 online</p>
          </div>
          <span className="ml-auto h-2 w-2 rounded-full border border-black bg-[#00c65a]" />
        </div>

        <div className="space-y-3 px-3 py-4">
          <div className="flex items-end gap-1.5">
            <span className="grid h-5 w-5 place-items-center rounded-full border border-black bg-[#e9e0ff] text-[8px] font-bold">A</span>
            <div className="max-w-[130px] rounded-[12px] rounded-bl-sm border border-black bg-white px-2.5 py-2 text-[8px] leading-relaxed text-black">
              Ready to share the update?
            </div>
          </div>
          <div className="ml-auto max-w-[128px] rounded-[12px] rounded-br-sm border border-black bg-[#e7f5fa] px-2.5 py-2 text-[8px] leading-relaxed text-black">
            Sending it now.
          </div>
          <div className="flex items-end gap-1.5">
            <span className="grid h-5 w-5 place-items-center rounded-full border border-black bg-[#f4e9ff] text-[8px] font-bold">M</span>
            <div className="rounded-[12px] rounded-bl-sm border border-black bg-white px-2.5 py-2">
              <span className="inline-flex gap-1">
                <span className="h-1 w-1 rounded-full bg-[#746c80] animate-bounce" />
                <span className="h-1 w-1 rounded-full bg-[#746c80] animate-bounce [animation-delay:150ms]" />
                <span className="h-1 w-1 rounded-full bg-[#746c80] animate-bounce [animation-delay:300ms]" />
              </span>
            </div>
          </div>
        </div>

        <div className="absolute bottom-3 left-3 right-3 flex items-center gap-2 rounded-[14px] border border-black bg-white/80 px-2 py-2">
          <Paperclip className="h-3.5 w-3.5 text-[#5e5b68]" />
          <span className="flex-1 text-[8px] text-[#77717f]">Message</span>
          <Send className="h-3.5 w-3.5 text-black" />
        </div>
      </div>
    </motion.div>
  </div>
);

const Hero = () => {
  const container = useRef();

  useGSAP(() => {
    gsap.from('.hero-content > *', {
      y: 30,
      opacity: 0,
      duration: 0.8,
      stagger: 0.15,
      ease: 'power2.out',
      delay: 0.2,
    });

    gsap.from('.hero-mockup', {
      y: 24,
      opacity: 0,
      scale: 0.98,
      duration: 0.8,
      ease: 'power2.out',
      delay: 0.4,
    });
  }, { scope: container });

  return (
    <section ref={container} className="pt-32 pb-20 px-6 relative overflow-hidden bg-background">
      <div className="max-w-7xl mx-auto hero-content">
        <div className="grid items-center gap-12 lg:grid-cols-[minmax(0,1fr)_290px] lg:gap-16">
          <div className="text-center lg:text-left">
            <div className="inline-flex items-center gap-2 bg-surface-container-low px-4 py-2 rounded-full mb-8">
              <span className="w-2 h-2 rounded-full bg-tertiary animate-pulse"></span>
              <span className="text-xs font-bold text-on-surface-variant font-headline tracking-wider uppercase">Live Real-Time Messaging</span>
            </div>

            <h1 className="text-5xl md:text-7xl font-extrabold font-headline tracking-tighter text-on-background mb-6 max-w-4xl leading-[1.1]">
              Connect <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary via-indigo-600 to-purple-600 font-black">instantly</span>, <RotatingWord />
            </h1>

            <p className="text-lg md:text-xl text-on-surface-variant max-w-2xl mx-auto lg:mx-0 mb-10 leading-relaxed">
              A real-time chat room for focused conversations, active users, and instant replies.
            </p>

            <div className="flex flex-col sm:flex-row justify-center lg:justify-start gap-4">
              <Link to="/register" className="bg-gradient-to-r from-primary to-primary-dim text-on-primary px-10 py-4 rounded-[8px] font-headline font-bold text-lg shadow-xl shadow-primary/20 hover:scale-[1.02] transition-transform">
                Start Chatting for Free
              </Link>
              <Link to="/login" className="bg-surface-container-highest text-on-surface px-10 py-4 rounded-[8px] font-headline font-bold text-lg hover:bg-surface-variant transition-colors">
                View Demo
              </Link>
            </div>
          </div>

          <FloatingPhone />
        </div>

        <div className="flex items-center justify-center gap-4 mt-16 mb-16">
          <div className="flex -space-x-3">
            <img className="w-12 h-12 rounded-full border-2 border-surface object-cover shadow-sm" alt="User 1" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDKttQ0zT2TOVrjc8oF5HWJMxGYkaOIewmIun2SgIxTRgo1uc1NQdMimXikLa4Hxt9oDZ412zd7Kj8a7tmQMrL0DKmNLZ9TU15_Ulcpm_b1eWwOJd6MoCP9KubSr5Vf5f3_1nJpPSgnLNpHRd_ftJM9PBzxixQ5YVXQkzAU4yV9uryWzK-iGt6Lsj9ZRlSW_JcWhb--GFWMQLM6u5uEk0bs7le-EIw1QliBUtftsyM0AoHJu9RzZXi66NJwaA-5G3DRN0QmLMrRKjQ" />
            <img className="w-12 h-12 rounded-full border-2 border-surface object-cover shadow-sm" alt="User 2" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDdo3J1GexqeCYOh-32Z9HjPOZtHwH8E2nElweF9WVODFHSjJWlzygT7ICFYbwo7qWFoqzKZGdtS4BOzwoWNnSEK8jcY2ivo0vbJFg3DO4O8e6IKoRadEx8j4xSMCE566sLEpju3vW40pbMPC9V6AELV5U7WTRuJTKcGWDP_lLlVq25cEK0CflWwBKeU8NKVGPzUHo15SGE4V0Bf3RTQOqrTzbU4aj-Jt3_52k9TTr7uNTtaEP27rcpbGGQ3QJ22Nk5Pg5h6XJXFgs" />
            <img className="w-12 h-12 rounded-full border-2 border-surface object-cover shadow-sm" alt="User 3" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDXGWobZ0u7uK8FYYNTzFqiZXQpaQNZaxQwvdSs9F0NqCABxjCC-9BPh6wKihIUF10pkgcqvNRl-IRvXPtL9y_5iEYXubqpJGC6ZRtcAeQoJ-h8ip2QttNYGdaTKZW7KPLhaSDTyVzgnDFqykDZctqkxDwns0B6bn75UqTHzbNeBT1WiYGeLjI-dBrNI2b6elaOOF4_NHKEKIaGaZiXMtN4V6Kh5HFt7-w3LQItkG9oU76ZiAXiOzDH6RITLVXl43UK4jF6Q3nDReM" />
          </div>
          <span className="text-on-surface-variant font-label text-sm font-semibold tracking-wide">Joined by 10k+ professionals</span>
        </div>

        <div className="relative flex justify-center w-full mt-24">
          <div className="relative z-10 w-full max-w-5xl rounded-3xl p-3 bg-surface-container-low border border-outline-variant/20 shadow-2xl shadow-primary/20 backdrop-blur-xl">
            {/* Window controls */}
            <div className="flex items-center gap-2 px-4 pb-3 pt-1 border-b border-outline-variant/10">
              <div className="w-3 h-3 rounded-full bg-red-400"></div>
              <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
              <div className="w-3 h-3 rounded-full bg-green-400"></div>
              <div className="ml-4 text-xs font-medium text-on-surface-variant font-headline tracking-widest flex items-center gap-2"><img src="/fluxchat_logo.png" className="w-4 h-4 rounded" /> FLUXCHAT WORKSPACE</div>
            </div>
            
            {/* The Real Replica Layout */}
            <div className="flex bg-surface rounded-2xl overflow-hidden h-[500px] border border-outline-variant/20 mt-2">
              {/* Sidebar Repo */}
              <div className="hidden md:flex flex-col w-64 bg-surface-container border-r border-outline-variant/20 p-4">
                <div className="mb-6 px-2">
                  <h3 className="text-xl font-extrabold font-headline mb-4">Connections</h3>
                  <div className="flex items-center justify-between mb-4 bg-surface-container-low rounded-xl px-3 py-2 border border-outline-variant/10">
                    <span className="text-sm font-semibold tracking-tight text-on-surface truncate">Project Alpha</span>
                    <span className="material-symbols-outlined text-sm text-tertiary">chevron_right</span>
                  </div>
                  
                  <div className="space-y-3 mt-6">
                    <p className="text-xs font-bold text-on-surface-variant uppercase tracking-wider px-2 mb-2">Online - 3</p>
                    {['Elena R.', 'Marcus V.', 'Sarah J.'].map((name, i) => (
                      <div key={name} className={`flex items-center gap-3 px-3 py-2 rounded-xl transition-all ${i===0?'bg-primary/20 border border-primary/30':'hover:bg-surface-container-high border border-transparent'}`}>
                        <div className="relative">
                          <img src={`https://api.dicebear.com/7.x/notionists/svg?seed=${name}&backgroundColor=transparent`} className="w-8 h-8 rounded-full border border-surface" />
                          <div className={`absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full border-2 border-surface ${i===0?'bg-green-400':'bg-outline'}`}></div>
                        </div>
                        <span className={`text-sm font-semibold truncate ${i===0?'text-primary':'text-on-surface-variant'}`}>{name}</span>
                        {i === 0 && <span className="ml-auto w-1.5 h-1.5 rounded-full bg-primary relative animate-pulse shadow-[0_0_8px_var(--color-primary)]"></span>}
                      </div>
                    ))}
                  </div>
                </div>
                
                <div className="mt-auto px-2 pt-4 border-t border-outline-variant/10">
                  <div className="flex items-center gap-3 w-full p-2 rounded-xl bg-surface-container-low hover:bg-surface-container-high transition-colors">
                    <img src={`https://api.dicebear.com/7.x/notionists/svg?seed=You&backgroundColor=transparent`} className="w-9 h-9 rounded-full bg-surface" />
                    <div className="flex flex-col justify-center flex-1">
                      <span className="text-sm font-bold text-on-surface leading-none mb-1 truncate">You</span>
                      <span className="text-xs text-on-surface-variant leading-none truncate opacity-80 font-medium">Design Lead</span>
                    </div>
                    <span className="material-symbols-outlined text-on-surface-variant hover:text-on-surface transition-colors">settings</span>
                  </div>
                </div>
              </div>

              {/* Chat Area Repo */}
              <div className="flex-1 flex flex-col bg-surface relative">
                {/* Header */}
                <div className="h-16 flex items-center justify-between px-6 border-b border-outline-variant/10 bg-surface/80 backdrop-blur-md">
                  <div className="flex flex-col">
                    <h2 className="font-extrabold font-headline tracking-tighter text-lg flex items-center gap-2">Project Alpha <span className="px-2 py-0.5 rounded text-[10px] uppercase font-bold bg-primary/20 text-primary border border-primary/30">Official</span></h2>
                    <p className="text-xs text-on-surface-variant font-medium">3 members online</p>
                  </div>
                  <div className="flex gap-4 text-on-surface-variant">
                    <span className="material-symbols-outlined">search</span>
                    <span className="material-symbols-outlined">more_vert</span>
                  </div>
                </div>

                {/* Messages */}
                <div className="flex-1 p-6 space-y-6 overflow-hidden flex flex-col justify-end bg-gradient-to-b from-surface/50 to-surface pb-32">
                  <div className="flex flex-col gap-1 items-start max-w-[80%]">
                    <div className="flex items-baseline gap-2 ml-12 mb-1">
                      <span className="font-bold text-sm text-on-surface">Elena R.</span>
                      <span className="text-[11px] text-on-surface-variant font-medium">10:41 AM</span>
                    </div>
                    <div className="flex gap-3">
                      <img src="https://api.dicebear.com/7.x/notionists/svg?seed=Elena R.&backgroundColor=transparent" className="w-9 h-9 rounded-full border border-outline-variant/20 flex-shrink-0" />
                      <div className="bg-surface-container-high text-on-surface px-4 py-3 rounded-2xl rounded-tl-sm text-[15px] font-medium leading-relaxed border border-outline-variant/10 shadow-sm">
                        Just pushed the latest design updates. Have you checked the new hero layout?
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex flex-col gap-1 items-end self-end max-w-[80%]">
                    <div className="flex items-baseline gap-2 mr-2 mb-1">
                      <span className="text-[11px] text-on-surface-variant font-medium">10:43 AM</span>
                      <span className="font-bold text-sm text-on-surface">You</span>
                    </div>
                    <div className="bg-gradient-to-br from-primary to-primary-dim text-on-primary px-4 py-3 rounded-2xl rounded-tr-sm text-[15px] font-semibold leading-relaxed shadow-md shadow-primary/20">
                      Yes! It looks perfectly aligned with the FluxChat aesthetic. Exactly what we wanted! ✨
                    </div>
                  </div>
                  
                  {/* Typing Indicator */}
                  <div className="flex items-center gap-3">
                    <img src="https://api.dicebear.com/7.x/notionists/svg?seed=Elena R.&backgroundColor=transparent" className="w-8 h-8 rounded-full opacity-70" />
                    <div className="bg-surface-container text-on-surface-variant px-4 py-2 rounded-2xl rounded-tl-sm flex items-center gap-1.5 h-10 w-16">
                      <div className="w-1.5 h-1.5 bg-current rounded-full animate-bounce"></div>
                      <div className="w-1.5 h-1.5 bg-current rounded-full animate-bounce" style={{animationDelay: '150ms'}}></div>
                      <div className="w-1.5 h-1.5 bg-current rounded-full animate-bounce" style={{animationDelay: '300ms'}}></div>
                    </div>
                  </div>
                </div>

                {/* Input */}
                <div className="absolute bottom-6 left-6 right-6">
                  <div className="bg-surface-container-high/80 backdrop-blur-xl border border-outline-variant/20 rounded-2xl p-2 flex items-center gap-3 shadow-lg group focus-within:border-primary/50 focus-within:ring-1 focus-within:ring-primary/20 transition-all">
                    <button className="w-10 h-10 rounded-xl bg-surface-container hover:bg-surface-container-low text-on-surface-variant flex flex-shrink-0 items-center justify-center transition-colors">
                      <span className="material-symbols-outlined">add</span>
                    </button>
                    <div className="flex-1 bg-transparent px-2 text-[15px] font-medium text-on-surface-variant">Type a message...</div>
                    <button className="w-10 h-10 rounded-xl bg-primary text-on-primary hover:bg-primary-dim flex flex-shrink-0 items-center justify-center transition-colors shadow-md shadow-primary/20">
                      <span className="material-symbols-outlined text-sm">send</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Glow underlayer */}
            <div className="absolute -inset-2 bg-gradient-to-r from-primary/20 via-tertiary/20 to-secondary/20 rounded-[40px] blur-3xl -z-10 mix-blend-screen opacity-50"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
