/**
 * Copyright IBM Corp. 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
const countrySettings = {
  us: {
    status: 'OPT_IN',
    lang: 'en',
  },
  ag: {
    status: 'OPT_IN',
    lang: 'en',
  },
  ai: {
    status: 'OPT_IN',
    lang: 'en',
  },
  aw: {
    status: 'OPT_IN',
    lang: 'en',
  },
  bb: {
    status: 'OPT_IN',
    lang: 'en',
  },
  bm: {
    status: 'OPT_IN',
    lang: 'en',
  },
  bs: {
    status: 'OPT_IN',
    lang: 'en',
  },
  gd: {
    status: 'OPT_IN',
    lang: 'en',
  },
  gy: {
    status: 'OPT_IN',
    lang: 'en',
  },
  jm: {
    status: 'OPT_IN',
    lang: 'en',
  },
  kn: {
    status: 'OPT_IN',
    lang: 'en',
  },
  ky: {
    status: 'OPT_IN',
    lang: 'en',
  },
  ms: {
    status: 'OPT_IN',
    lang: 'en',
  },
  sr: {
    status: 'OPT_IN',
    lang: 'en',
  },
  tc: {
    status: 'OPT_IN',
    lang: 'en',
  },
  tt: {
    status: 'OPT_IN',
    lang: 'en',
  },
  vc: {
    status: 'OPT_IN',
    lang: 'en',
  },
  vg: {
    status: 'OPT_IN',
    lang: 'en',
  },
  ca: {
    status: 'OPT_IN',
    lang: 'fr',
  },
  at: {
    status: 'OPT_IN',
    lang: 'de',
  },
  ch: {
    status: 'OPT_IN',
    lang: 'fr',
  },
  de: {
    status: 'OPT_IN',
    lang: 'de',
  },
  dk: {
    status: 'OPT_IN',
    lang: 'da',
  },
  fi: {
    status: 'OPT_IN',
    lang: 'fi',
  },
  no: {
    status: 'OPT_IN',
    lang: 'no',
  },
  se: {
    status: 'OPT_IN',
    lang: 'sv',
  },
  uk: {
    status: 'OPT_IN',
    lang: 'en',
  },
  ie: {
    status: 'OPT_IN',
    lang: 'en',
  },
  be: {
    status: 'OPT_IN',
    lang: 'en',
  },
  nl: {
    status: 'OPT_IN',
    lang: 'nl',
  },
  fr: {
    status: 'OPT_IN',
    lang: 'fr',
  },
  it: {
    status: 'OPT_IN',
    lang: 'it',
  },
  cy: {
    status: 'OPT_IN',
    lang: 'en',
  },
  es: {
    status: 'OPT_IN',
    lang: 'es',
  },
  gr: {
    status: 'OPT_IN',
    lang: 'el',
  },
  il: {
    status: 'OPT_IN',
    lang: 'he',
  },
  pt: {
    status: 'OPT_IN',
    lang: 'pt',
  },
  ar: {
    status: 'OPT_IN',
    lang: 'es',
  },
  bo: {
    status: 'OPT_IN',
    lang: 'es',
  },
  br: {
    status: 'OPT_IN',
    lang: 'pt',
  },
  cl: {
    status: 'OPT_IN',
    lang: 'es',
  },
  co: {
    status: 'OPT_IN',
    lang: 'es',
  },
  do: {
    status: 'OPT_IN',
    lang: 'en',
  },
  ec: {
    status: 'OPT_IN',
    lang: 'es',
  },
  mx: {
    status: 'OPT_IN',
    lang: 'es',
  },
  pe: {
    status: 'OPT_IN',
    lang: 'es',
  },
  py: {
    status: 'OPT_IN',
    lang: 'es',
  },
  uy: {
    status: 'OPT_IN',
    lang: 'es',
  },
  ve: {
    status: 'OPT_IN',
    lang: 'es',
  },
  au: {
    status: 'OPT_IN',
    lang: 'en',
  },
  id: {
    status: 'OPT_IN',
    lang: 'en',
  },
  my: {
    status: 'OPT_IN',
    lang: 'en',
  },
  ph: {
    status: 'OPT_IN',
    lang: 'en',
  },
  sg: {
    status: 'OPT_IN',
    lang: 'en',
  },
  th: {
    status: 'OPT_IN',
    lang: 'en',
  },
  cn: {
    status: 'OPT_IN',
    lang: 'zh',
  },
  hk: {
    status: 'OPT_IN',
    lang: 'en',
  },
  tw: {
    status: 'OPT_IN',
    lang: 'zh',
  },
  bd: {
    status: 'OPT_IN',
    lang: 'en',
  },
  in: {
    status: 'OPT_IN',
    lang: 'en',
  },
  lk: {
    status: 'OPT_IN',
    lang: 'en',
  },
  kr: {
    status: 'OPT_IN',
    lang: 'ko',
  },
  bg: {
    status: 'OPT_IN',
    lang: 'bg',
  },
  bh: {
    status: 'OPT_IN',
    lang: 'en',
  },
  cz: {
    status: 'OPT_IN',
    lang: 'cs',
  },
  dz: {
    status: 'OPT_IN',
    lang: 'fr',
  },
  ee: {
    status: 'OPT_IN',
    lang: 'et',
  },
  eg: {
    status: 'OPT_IN',
    lang: 'en',
  },
  hr: {
    status: 'OPT_IN',
    lang: 'hr',
  },
  hu: {
    status: 'OPT_IN',
    lang: 'hu',
  },
  jo: {
    status: 'OPT_IN',
    lang: 'en',
  },
  kw: {
    status: 'OPT_IN',
    lang: 'en',
  },
  lb: {
    status: 'OPT_IN',
    lang: 'en',
  },
  lt: {
    status: 'OPT_IN',
    lang: 'lt',
  },
  lv: {
    status: 'OPT_IN',
    lang: 'lv',
  },
  ma: {
    status: 'OPT_IN',
    lang: 'fr',
  },
  om: {
    status: 'OPT_IN',
    lang: 'en',
  },
  pk: {
    status: 'OPT_IN',
    lang: 'en',
  },
  pl: {
    status: 'OPT_IN',
    lang: 'pl',
  },
  qa: {
    status: 'OPT_IN',
    lang: 'en',
  },
  ro: {
    status: 'OPT_IN',
    lang: 'ro',
  },
  rs: {
    status: 'OPT_IN',
    lang: 'sr',
  },
  me: {
    status: 'OPT_IN',
    lang: 'sr',
  },
  ru: {
    status: 'OPT_IN',
    lang: 'ru',
  },
  sk: {
    status: 'OPT_IN',
    lang: 'sk',
  },
  tn: {
    status: 'OPT_IN',
    lang: 'fr',
  },
  tr: {
    status: 'OPT_IN',
    lang: 'tr',
  },
  ua: {
    status: 'OPT_IN',
    lang: 'uk',
  },
  za: {
    status: 'OPT_IN',
    lang: 'en',
  },
  ad: {
    status: 'OPT_IN',
    lang: 'en',
  },
  af: {
    status: 'OPT_IN',
    lang: 'en',
  },
  al: {
    status: 'OPT_IN',
    lang: 'en',
  },
  am: {
    status: 'OPT_IN',
    lang: 'en',
  },
  an: {
    status: 'OPT_IN',
    lang: 'en',
  },
  ao: {
    status: 'OPT_IN',
    lang: 'pt',
  },
  as: {
    status: 'OPT_IN',
    lang: 'en',
  },
  ax: {
    status: 'OPT_IN',
    lang: 'en',
  },
  az: {
    status: 'OPT_IN',
    lang: 'en',
  },
  ba: {
    status: 'OPT_IN',
    lang: 'en',
  },
  bi: {
    status: 'OPT_IN',
    lang: 'en',
  },
  bj: {
    status: 'OPT_IN',
    lang: 'en',
  },
  bn: {
    status: 'OPT_IN',
    lang: 'en',
  },
  bt: {
    status: 'OPT_IN',
    lang: 'en',
  },
  bv: {
    status: 'OPT_IN',
    lang: 'en',
  },
  by: {
    status: 'OPT_IN',
    lang: 'en',
  },
  bz: {
    status: 'OPT_IN',
    lang: 'en',
  },
  cc: {
    status: 'OPT_IN',
    lang: 'en',
  },
  cf: {
    status: 'OPT_IN',
    lang: 'en',
  },
  ci: {
    status: 'OPT_IN',
    lang: 'en',
  },
  ck: {
    status: 'OPT_IN',
    lang: 'en',
  },
  cu: {
    status: 'OPT_IN',
    lang: 'en',
  },
  cv: {
    status: 'OPT_IN',
    lang: 'en',
  },
  cx: {
    status: 'OPT_IN',
    lang: 'en',
  },
  dj: {
    status: 'OPT_IN',
    lang: 'en',
  },
  eh: {
    status: 'OPT_IN',
    lang: 'en',
  },
  er: {
    status: 'OPT_IN',
    lang: 'en',
  },
  fj: {
    status: 'OPT_IN',
    lang: 'en',
  },
  fk: {
    status: 'OPT_IN',
    lang: 'en',
  },
  fm: {
    status: 'OPT_IN',
    lang: 'en',
  },
  fo: {
    status: 'OPT_IN',
    lang: 'en',
  },
  ge: {
    status: 'OPT_IN',
    lang: 'en',
  },
  gf: {
    status: 'OPT_IN',
    lang: 'en',
  },
  gg: {
    status: 'OPT_IN',
    lang: 'en',
  },
  gi: {
    status: 'OPT_IN',
    lang: 'en',
  },
  gl: {
    status: 'OPT_IN',
    lang: 'en',
  },
  gm: {
    status: 'OPT_IN',
    lang: 'en',
  },
  gn: {
    status: 'OPT_IN',
    lang: 'en',
  },
  gp: {
    status: 'OPT_IN',
    lang: 'en',
  },
  gq: {
    status: 'OPT_IN',
    lang: 'en',
  },
  gs: {
    status: 'OPT_IN',
    lang: 'en',
  },
  gt: {
    status: 'OPT_IN',
    lang: 'en',
  },
  gu: {
    status: 'OPT_IN',
    lang: 'en',
  },
  gw: {
    status: 'OPT_IN',
    lang: 'en',
  },
  hm: {
    status: 'OPT_IN',
    lang: 'en',
  },
  hn: {
    status: 'OPT_IN',
    lang: 'en',
  },
  ht: {
    status: 'OPT_IN',
    lang: 'en',
  },
  im: {
    status: 'OPT_IN',
    lang: 'en',
  },
  io: {
    status: 'OPT_IN',
    lang: 'en',
  },
  iq: {
    status: 'OPT_IN',
    lang: 'en',
  },
  ir: {
    status: 'OPT_IN',
    lang: 'en',
  },
  is: {
    status: 'OPT_IN',
    lang: 'en',
  },
  je: {
    status: 'OPT_IN',
    lang: 'en',
  },
  ke: {
    status: 'OPT_IN',
    lang: 'en',
  },
  kg: {
    status: 'OPT_IN',
    lang: 'en',
  },
  kh: {
    status: 'OPT_IN',
    lang: 'en',
  },
  ki: {
    status: 'OPT_IN',
    lang: 'en',
  },
  km: {
    status: 'OPT_IN',
    lang: 'en',
  },
  kp: {
    status: 'OPT_IN',
    lang: 'en',
  },
  la: {
    status: 'OPT_IN',
    lang: 'en',
  },
  li: {
    status: 'OPT_IN',
    lang: 'en',
  },
  lr: {
    status: 'OPT_IN',
    lang: 'en',
  },
  ls: {
    status: 'OPT_IN',
    lang: 'en',
  },
  lu: {
    status: 'OPT_IN',
    lang: 'en',
  },
  ly: {
    status: 'OPT_IN',
    lang: 'en',
  },
  mc: {
    status: 'OPT_IN',
    lang: 'en',
  },
  md: {
    status: 'OPT_IN',
    lang: 'en',
  },
  mh: {
    status: 'OPT_IN',
    lang: 'en',
  },
  mk: {
    status: 'OPT_IN',
    lang: 'en',
  },
  ml: {
    status: 'OPT_IN',
    lang: 'en',
  },
  mm: {
    status: 'OPT_IN',
    lang: 'en',
  },
  mn: {
    status: 'OPT_IN',
    lang: 'en',
  },
  mo: {
    status: 'OPT_IN',
    lang: 'en',
  },
  mp: {
    status: 'OPT_IN',
    lang: 'en',
  },
  mq: {
    status: 'OPT_IN',
    lang: 'en',
  },
  mr: {
    status: 'OPT_IN',
    lang: 'en',
  },
  mt: {
    status: 'OPT_IN',
    lang: 'en',
  },
  mv: {
    status: 'OPT_IN',
    lang: 'en',
  },
  nc: {
    status: 'OPT_IN',
    lang: 'en',
  },
  nf: {
    status: 'OPT_IN',
    lang: 'en',
  },
  ng: {
    status: 'OPT_IN',
    lang: 'en',
  },
  ni: {
    status: 'OPT_IN',
    lang: 'en',
  },
  np: {
    status: 'OPT_IN',
    lang: 'en',
  },
  nr: {
    status: 'OPT_IN',
    lang: 'en',
  },
  nu: {
    status: 'OPT_IN',
    lang: 'en',
  },
  nz: {
    status: 'OPT_IN',
    lang: 'en',
  },
  pa: {
    status: 'OPT_IN',
    lang: 'en',
  },
  pf: {
    status: 'OPT_IN',
    lang: 'en',
  },
  pg: {
    status: 'OPT_IN',
    lang: 'en',
  },
  pm: {
    status: 'OPT_IN',
    lang: 'en',
  },
  pn: {
    status: 'OPT_IN',
    lang: 'en',
  },
  pr: {
    status: 'OPT_IN',
    lang: 'en',
  },
  ps: {
    status: 'OPT_IN',
    lang: 'en',
  },
  pw: {
    status: 'OPT_IN',
    lang: 'en',
  },
  re: {
    status: 'OPT_IN',
    lang: 'en',
  },
  rw: {
    status: 'OPT_IN',
    lang: 'en',
  },
  sb: {
    status: 'OPT_IN',
    lang: 'en',
  },
  sd: {
    status: 'OPT_IN',
    lang: 'en',
  },
  sh: {
    status: 'OPT_IN',
    lang: 'en',
  },
  sj: {
    status: 'OPT_IN',
    lang: 'en',
  },
  si: {
    status: 'OPT_IN',
    lang: 'sl',
  },
  sm: {
    status: 'OPT_IN',
    lang: 'en',
  },
  so: {
    status: 'OPT_IN',
    lang: 'en',
  },
  sp: {
    status: 'OPT_IN',
    lang: 'en',
  },
  st: {
    status: 'OPT_IN',
    lang: 'en',
  },
  sv: {
    status: 'OPT_IN',
    lang: 'en',
  },
  sy: {
    status: 'OPT_IN',
    lang: 'en',
  },
  sz: {
    status: 'OPT_IN',
    lang: 'en',
  },
  tf: {
    status: 'OPT_IN',
    lang: 'en',
  },
  tg: {
    status: 'OPT_IN',
    lang: 'en',
  },
  tj: {
    status: 'OPT_IN',
    lang: 'en',
  },
  tk: {
    status: 'OPT_IN',
    lang: 'en',
  },
  tl: {
    status: 'OPT_IN',
    lang: 'en',
  },
  tm: {
    status: 'OPT_IN',
    lang: 'en',
  },
  to: {
    status: 'OPT_IN',
    lang: 'en',
  },
  tv: {
    status: 'OPT_IN',
    lang: 'en',
  },
  va: {
    status: 'OPT_IN',
    lang: 'en',
  },
  vi: {
    status: 'OPT_IN',
    lang: 'en',
  },
  vu: {
    status: 'OPT_IN',
    lang: 'en',
  },
  wf: {
    status: 'OPT_IN',
    lang: 'en',
  },
  ws: {
    status: 'OPT_IN',
    lang: 'en',
  },
  ye: {
    status: 'OPT_IN',
    lang: 'en',
  },
  yt: {
    status: 'OPT_IN',
    lang: 'en',
  },
  zm: {
    status: 'OPT_IN',
    lang: 'en',
  },
  zw: {
    status: 'OPT_IN',
    lang: 'en',
  },
  vn: {
    status: 'OPT_IN',
    lang: 'vi',
  },
  cr: {
    status: 'OPT_IN',
    lang: 'es',
  },
  kz: {
    status: 'OPT_IN',
    lang: 'ru',
  },
  uz: {
    status: 'OPT_IN',
    lang: 'ru',
  },
  bw: {
    status: 'OPT_IN',
    lang: 'en',
  },
  gh: {
    status: 'OPT_IN',
    lang: 'en',
  },
  sl: {
    status: 'OPT_IN',
    lang: 'en',
  },
  mw: {
    status: 'OPT_IN',
    lang: 'en',
  },
  tz: {
    status: 'OPT_IN',
    lang: 'en',
  },
  na: {
    status: 'OPT_IN',
    lang: 'en',
  },
  sc: {
    status: 'OPT_IN',
    lang: 'en',
  },
  ug: {
    status: 'OPT_IN',
    lang: 'en',
  },
  et: {
    status: 'OPT_IN',
    lang: 'en',
  },
  bf: {
    status: 'OPT_IN',
    lang: 'fr',
  },
  cm: {
    status: 'OPT_IN',
    lang: 'fr',
  },
  td: {
    status: 'OPT_IN',
    lang: 'fr',
  },
  cg: {
    status: 'OPT_IN',
    lang: 'fr',
  },
  cd: {
    status: 'OPT_IN',
    lang: 'fr',
  },
  ga: {
    status: 'OPT_IN',
    lang: 'fr',
  },
  mg: {
    status: 'OPT_IN',
    lang: 'fr',
  },
  mu: {
    status: 'OPT_IN',
    lang: 'fr',
  },
  ne: {
    status: 'OPT_IN',
    lang: 'fr',
  },
  sn: {
    status: 'OPT_IN',
    lang: 'fr',
  },
  mz: {
    status: 'OPT_IN',
    lang: 'pt',
  },
  jp: {
    status: 'OPT_IN',
    lang: 'ja',
  },
  cw: {
    status: 'OPT_IN',
    lang: 'en',
  },
  dm: {
    status: 'OPT_IN',
    lang: 'en',
  },
  lc: {
    status: 'OPT_IN',
    lang: 'en',
  },
  gb: {
    status: 'OPT_IN',
    lang: 'en',
  },
  aq: {
    status: 'OPT_IN',
    lang: 'en',
  },
  bl: {
    status: 'OPT_IN',
    lang: 'en',
  },
  bq: {
    status: 'OPT_IN',
    lang: 'en',
  },
  mf: {
    status: 'OPT_IN',
    lang: 'en',
  },
  ss: {
    status: 'OPT_IN',
    lang: 'en',
  },
  sx: {
    status: 'OPT_IN',
    lang: 'en',
  },
  um: {
    status: 'OPT_IN',
    lang: 'en',
  },
  sa: {
    status: 'OPT_IN',
    lang: 'ar',
  },
  ae: {
    status: 'OPT_IN',
    lang: 'ar',
  },
};
export default countrySettings;
