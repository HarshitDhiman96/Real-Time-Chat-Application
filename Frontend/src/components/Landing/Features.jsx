import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const features = [
  {
    image: '/feature_realtime_sync.png',
    eyebrow: 'Realtime sync',
    heading: 'Messages stay current.',
    description: 'New messages are shared with everyone in the room as they arrive, without refreshing the page.',
  },
  {
    image: '/feature_typing_indicator.png',
    eyebrow: 'Typing status',
    heading: 'Replies feel present.',
    description: 'A typing indicator shows when someone is preparing a reply, giving conversations a clear rhythm.',
  },
  {
    image: '/feature_online_status.png',
    eyebrow: 'Online users',
    heading: 'See who is available.',
    description: 'The room list updates as people join and leave, with a simple status indicator for active users.',
  },
];

const FeatureImage = ({ image, heading }) => {
  const targetRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ['end end', 'end start'],
  });
  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.88]);
  const opacity = useTransform(scrollYProgress, [0, 1], [1, 0]);

  return (
    <motion.div
      ref={targetRef}
      style={{ scale }}
      className="sticky top-3 h-[calc(100vh-24px)] overflow-hidden rounded-[20px] border border-black bg-[#f7f1ff] shadow-sm"
    >
      <img src={image} alt={heading} className="w-full h-full object-cover" />
      <motion.div style={{ opacity }} className="absolute inset-0 bg-[#f8f3ff]/30" />
    </motion.div>
  );
};

const FeatureCopy = ({ eyebrow, heading }) => {
  const targetRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ['start end', 'end start'],
  });
  const y = useTransform(scrollYProgress, [0, 1], [180, -180]);
  const opacity = useTransform(scrollYProgress, [0.2, 0.45, 0.75], [0, 1, 0]);

  return (
    <motion.div
      ref={targetRef}
      style={{ y, opacity }}
      className="absolute inset-0 flex h-screen flex-col items-center justify-center px-6 text-center"
    >
      <p className="mb-3 rounded-[20px] border border-black bg-white/65 px-4 py-2 text-sm font-headline font-bold text-black">
        {eyebrow}
      </p>
      <h3 className="max-w-3xl text-4xl font-extrabold font-headline text-black md:text-7xl">
        {heading}
      </h3>
    </motion.div>
  );
};

const FeatureSection = ({ feature }) => (
  <div className="px-3 sm:px-5">
    <div className="relative h-[135vh] md:h-[150vh]">
      <FeatureImage image={feature.image} heading={feature.heading} />
      <FeatureCopy eyebrow={feature.eyebrow} heading={feature.heading} />
    </div>
    <div className="mx-auto grid max-w-6xl grid-cols-1 gap-6 px-3 pb-20 pt-12 md:grid-cols-12 md:gap-10">
      <h3 className="text-2xl font-bold font-headline text-black md:col-span-4 md:text-3xl">
        {feature.eyebrow}
      </h3>
      <p className="text-lg leading-relaxed text-[#5e5b68] md:col-span-8 md:text-xl">
        {feature.description}
      </p>
    </div>
  </div>
);

const Features = () => (
  <section id="features" className="scroll-mt-24 bg-[#f8f3ff] py-16">
    <div className="mx-auto max-w-6xl px-6 pb-10 text-center">
      <p className="mb-4 text-sm font-headline font-bold uppercase tracking-[0.2em] text-[#5d4da4]">Features</p>
      <h2 className="text-4xl font-extrabold font-headline text-black md:text-5xl">The essentials for a shared chat room.</h2>
    </div>
    {features.map((feature) => <FeatureSection key={feature.eyebrow} feature={feature} />)}
  </section>
);

export default Features;
