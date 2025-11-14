import RecentBlog from '@/conponents/recentBlog';
import CoursesSection from '@/conponents/courses';
import FeaturesSection from '@/conponents/featuersGrid';
import HeroSlider from '@/conponents/heroSlider';
import Intro from '@/conponents/intro';
import WhatWeOffer from '@/conponents/offer';
import Trainers from '@/conponents/trainers';
import CoursesWithFeedback from '@/conponents/testimonial';
import FAQSection from '@/conponents/faqSection';
 
export default function HomePage() {
  return (
    <>
      <HeroSlider/>
      <FeaturesSection/>
      <WhatWeOffer/>
      <FAQSection/>
      <Intro/>
      <CoursesSection/>
      <Trainers/>
      <RecentBlog/>
      <CoursesWithFeedback/>
    </>
  );
}