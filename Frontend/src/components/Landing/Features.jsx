import { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(useGSAP, ScrollTrigger);

const features = [
  {
    image: '/feature_realtime_sync.png',
    title: 'Real-time sync',
    description: 'Messages arrive instantly, keeping every active conversation current without refreshing the room.',
    tone: 'primary',
  },
  {
    image: '/feature_typing_indicator.png',
    title: 'Typing indicator',
    description: 'See when someone is replying, so conversations feel present, responsive, and easy to follow.',
    tone: 'tertiary',
  },
  {
    image: '/feature_online_status.png',
    title: 'Online status',
    description: "Know who's around with gentle active indicators that keep the room clear without adding noise.",
    tone: 'secondary',
  },
];

const toneStyles = {
  primary: {
    icon: 'text-primary',
    soft: 'bg-primary/10',
    line: 'bg-primary',
    bubble: 'bg-primary text-on-primary',
  },
  tertiary: {
    icon: 'text-tertiary',
    soft: 'bg-tertiary-container/40',
    line: 'bg-tertiary',
    bubble: 'bg-tertiary text-on-tertiary',
  },
  secondary: {
    icon: 'text-secondary',
    soft: 'bg-secondary-container/45',
    line: 'bg-secondary',
    bubble: 'bg-secondary text-on-secondary',
  },
};

const FeatureVisual = ({ feature }) => {
  const tone = toneStyles[feature.tone];

  return (
    <div className={`mb-8 rounded-[16px] border border-outline-variant/30 ${tone.soft} p-2 shadow-inner overflow-hidden relative group-hover:scale-[1.02] transition-transform duration-500`}>
      <img src={feature.image} alt={feature.title} className="w-full h-48 object-cover rounded-[12px] mix-blend-luminosity group-hover:mix-blend-normal transition-all duration-500 opacity-90 group-hover:opacity-100" />
      <div className={`absolute inset-0 bg-gradient-to-t from-surface-container-low to-transparent opacity-60`}></div>
    </div>
  );
};

const Features = () => {
  const container = useRef();

  useGSAP(() => {
    gsap.from('.feature-card', {
      scrollTrigger: {
        trigger: container.current,
        start: 'top 80%',
      },
      y: 40,
      opacity: 0,
      duration: 0.8,
      stagger: 0.15,
      ease: 'power2.out',
    });
  }, { scope: container });

  return (
    <section id="features" ref={container} className="scroll-mt-24 py-24 bg-surface">
      <div className="max-w-7xl mx-auto px-6">
        <div className="mb-12 max-w-2xl">
          <p className="text-sm font-headline font-bold text-primary uppercase tracking-[0.2em] mb-4">Features</p>
          <h2 className="text-4xl md:text-5xl font-extrabold font-headline tracking-tight text-on-background">
            Built for natural, real-time conversations.
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {features.map((feature) => (
            <div key={feature.title} className="feature-card bg-surface-container-low p-6 rounded-[8px] border border-outline-variant/20 hover:bg-surface-container transition-colors group">
              <FeatureVisual feature={feature} />
              <h3 className="text-2xl font-bold font-headline text-on-background mb-4 tracking-tight">
                {feature.title}
              </h3>
              <p className="text-on-surface-variant leading-relaxed text-[15px]">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
