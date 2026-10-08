/**
 * routes/pinterest-posting-guide.js
 * Owns: Admin page at /admin/pinterest-posting-guide — a ready-to-use manual
 *       posting package for Allen: pin images, copy, schedule, board setup guide.
 * Does NOT own: pin generation, R2 uploads, or the pinterest-pins admin dashboard.
 */
const express = require('express');
const router = express.Router();
const { getAllPins } = require('../db/pinterest-pins');

// ─── 2-week posting schedule ─────────────────────────────────────────────────
// Strategy: 2–3 pins/day, start Collecting-heavy (deepest content), mix pillars.
// Optimal times: 8–11pm, 2–4pm, 8–11am ET.
const POSTING_SCHEDULE = [
  // Day 1 — May 17
  { day: 1, date: '2026-05-17', dayLabel: 'Sat May 17', pins: [1, 2],     times: ['8:00pm','10:00pm'] },
  // Day 2 — May 18
  { day: 2, date: '2026-05-18', dayLabel: 'Sun May 18', pins: [3, 7],     times: ['9:00am','8:00pm'] },
  // Day 3 — May 19
  { day: 3, date: '2026-05-19', dayLabel: 'Mon May 19', pins: [4, 13],    times: ['2:00pm','9:00pm'] },
  // Day 4 — May 20
  { day: 4, date: '2026-05-20', dayLabel: 'Tue May 20', pins: [5, 8, 19], times: ['8:00am','3:00pm','10:00pm'] },
  // Day 5 — May 21
  { day: 5, date: '2026-05-21', dayLabel: 'Wed May 21', pins: [6, 14],    times: ['9:00am','8:30pm'] },
  // Day 6 — May 22
  { day: 6, date: '2026-05-22', dayLabel: 'Thu May 22', pins: [9, 20, 25],times: ['2:00pm','8:00pm','10:30pm'] },
  // Day 7 — May 23
  { day: 7, date: '2026-05-23', dayLabel: 'Fri May 23', pins: [10, 15],   times: ['9:00am','9:00pm'] },
  // Day 8 — May 24
  { day: 8, date: '2026-05-24', dayLabel: 'Sat May 24', pins: [11, 21, 26],times: ['10:00am','3:00pm','9:30pm'] },
  // Day 9 — May 25
  { day: 9, date: '2026-05-25', dayLabel: 'Sun May 25', pins: [12, 16],   times: ['9:00am','8:00pm'] },
  // Day 10 — May 26
  { day: 10, date: '2026-05-26', dayLabel: 'Mon May 26', pins: [17, 22, 27],times: ['8:00am','2:30pm','9:00pm'] },
  // Day 11 — May 27
  { day: 11, date: '2026-05-27', dayLabel: 'Tue May 27', pins: [18, 23],  times: ['9:00am','10:00pm'] },
  // Day 12 — May 28
  { day: 12, date: '2026-05-28', dayLabel: 'Wed May 28', pins: [24, 28, 29],times: ['2:00pm','8:30pm','11:00pm'] },
  // Day 13 — May 29
  { day: 13, date: '2026-05-29', dayLabel: 'Thu May 29', pins: [30],      times: ['9:00pm'] },
  // Day 14 — May 30 — use for resharing best performers or first repeat
  { day: 14, date: '2026-05-30', dayLabel: 'Fri May 30', pins: [],        times: [] },
];

// ─── Board setup guide ───────────────────────────────────────────────────────
const BOARD_GUIDE = [
  {
    name: 'Sports Card Grading & Authentication',
    pillar: 'Collecting',
    description: 'Everything about PSA, BGS, CGC — grading scales, submission tips, what grades mean for value.',
    secret: false,
    coverPin: 1,
  },
  {
    name: 'Sports Card Collecting Systems',
    pillar: 'Collecting',
    description: 'Portfolio strategy, flipping workflow, storage tips, and collector habits for serious operators.',
    secret: false,
    coverPin: 5,
  },
  {
    name: "Drummer's Practice Blueprint",
    pillar: 'Drums',
    description: 'Structured practice plans, rudiment guides, stick control, and flow-state drumming frameworks.',
    secret: false,
    coverPin: 9,
  },
  {
    name: 'Morning Routines That Stick',
    pillar: 'Routines',
    description: 'Systems-based morning routines, daily resets, consistency frameworks, and creator OS guides.',
    secret: false,
    coverPin: 16,
  },
  {
    name: 'Hidden Gems Worth Knowing',
    pillar: 'Hidden Gems',
    description: 'Under-the-radar insights across collecting, drums, productivity — the things most people miss.',
    secret: false,
    coverPin: 19,
  },
  {
    name: "Operator's Side Hustle Blueprint",
    pillar: 'Operator',
    description: 'Side hustle frameworks, operator mindset, solopreneur systems, and 30-day launchpad guides.',
    secret: false,
    coverPin: 26,
  },
];

// ─── Route ────────────────────────────────────────────────────────────────────
router.get('/admin/pinterest-posting-guide', async (req, res) => {
  try {
    const pins = await getAllPins();

    // Index pins by number for fast lookup
    const pinMap = {};
    pins.forEach(p => { pinMap[p.pin_number] = p; });

    // Group pins by pillar for the gallery section
    const PILLAR_ORDER = ['COLLECTING', 'DRUMS', 'ROUTINES', 'DISCOVERY', 'OPERATOR'];
    const PILLAR_LABELS = {
      COLLECTING: 'Collecting',
      DRUMS:      'Drums',
      ROUTINES:   'Routines',
      DISCOVERY:  'Hidden Gems',
      OPERATOR:   'Operator / Side Hustle',
    };
    const grouped = {};
    PILLAR_ORDER.forEach(p => { grouped[p] = []; });
    pins.forEach(pin => { if (grouped[pin.pillar]) grouped[pin.pillar].push(pin); });

    res.render('admin/pinterest-posting-guide', {
      title: 'Pinterest Posting Guide',
      noindex: true,
      pins,
      pinMap,
      grouped,
      PILLAR_ORDER,
      PILLAR_LABELS,
      POSTING_SCHEDULE,
      BOARD_GUIDE,
    });
  } catch (err) {
    console.error('[pinterest-posting-guide] error:', err.message);
    res.status(500).render('error', { message: 'Pinterest posting guide error.' });
  }
});

module.exports = router;
