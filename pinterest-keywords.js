/**
 * Pinterest keyword clusters by category pillar.
 * Organized by search volume potential: primary (highest), secondary, long-tail.
 * Used to inform pin descriptions, SEO copy, and board naming.
 * Does NOT own: pin image generation, DB writes, route logic.
 */

const PINTEREST_KEYWORDS = {
  collecting: {
    primary: [
      'PSA grading',
      'sports card collecting',
      'card grading guide',
      'BGS vs PSA',
      'card flipping',
    ],
    secondary: [
      'sports card investing',
      'eBay selling tips for cards',
      'PC building sports cards',
      'SGC grading',
      'CGC grading',
      'sports card value tracking',
      'collector inventory system',
    ],
    longTail: [
      'how to prepare cards for PSA submission',
      'sports card collector tools under 50',
      'personal collection strategy sports cards',
      'collector weekly routine workflow',
      'eBay sports card listing optimization',
      'PSA vs BGS vs SGC vs CGC comparison',
      'sports card flipping workflow for beginners',
      'how to start a vinyl record collection',
      'grading service turnaround times',
      'sports card pop report strategy',
    ],
  },
  drums: {
    primary: [
      'drum practice routine',
      'beginner drummer tips',
      'drumming exercises',
      'drum rudiments',
      'how to practice drums',
    ],
    secondary: [
      'paradiddle exercises',
      'practice pad drumming',
      'drum technique drills',
      'flow state drumming',
      'drum gear under 50',
    ],
    longTail: [
      'how to build a drum practice routine that sticks',
      'minimum viable drum practice session',
      'best drum practice pads for home',
      'hidden gem drum gear affordable',
      'drum metronome practice tips',
      'Evans EQ pad review',
      'two-day rule drumming consistency',
      'warm-up exercises for drummers',
      'how to track drumming progress',
      'drum sticks for practice pad',
    ],
  },
  routines: {
    primary: [
      'morning routine',
      'daily routine for productivity',
      'morning habits creators',
      'consistency habits',
      'daily systems',
    ],
    secondary: [
      'night owl morning routine',
      'morning routine for creatives',
      'habit stacking guide',
      'creator morning ritual',
      'morning routine alternatives',
    ],
    longTail: [
      'how to build a morning routine as a night owl',
      'systems-based morning routine for collectors',
      'morning routine that protects creative work',
      'productivity routine for side hustlers',
      'how to stay consistent without 5AM wake-up',
      'morning block for deep creative work',
      'habit recovery when routine breaks',
      'flexible morning routine for irregular schedules',
      'minimum viable morning routine',
      'protect creative hours morning',
    ],
  },
  'hidden-gems': {
    primary: [
      'underrated sports cards',
      'hidden gem finds',
      'undervalued collectibles',
      'overlooked cards worth buying',
      'Discogs buying tips',
    ],
    secondary: [
      'underground card plays',
      'pre-rookie card investing',
      'junk wax PSA 10',
      'Discogs hidden gems',
      'underrated drum gear',
    ],
    longTail: [
      'underrated sports cards flying under the radar',
      'how to find hidden gem cards before the market',
      'pre-call-up refractor card strategy',
      'junk wax era PSA 10 value thesis',
      'Discogs strategies to find cheap gems',
      'how to sort Discogs by pressing country',
      'error card collecting strategy',
      'pre-war Hall of Famer cards value',
      'regional sports card variants collecting',
      'overlooked vinyl records worth collecting',
    ],
  },
  'side-hustles': {
    primary: [
      'side hustle ideas',
      'card collection side hustle',
      'turn hobby into income',
      'digital products for creators',
      'building momentum side hustle',
    ],
    secondary: [
      'creator side hustle workflows',
      'eBay card flipping income',
      'monetize your passion',
      'side income from collecting',
      'graded card arbitrage',
    ],
    longTail: [
      'how to turn sports card collection into side hustle',
      'raw to graded card arbitrage strategy',
      'how to monetize a hobby without ruining it',
      'card flipping for beginners step by step',
      'build digital products from collector knowledge',
      'eBay card selling workflow for side income',
      'how to set rates to filter bad clients',
      'side hustle math for card flippers',
      'scale eBay card selling without chaos',
      'passion to income framework for collectors',
    ],
  },
};

module.exports = { PINTEREST_KEYWORDS };
