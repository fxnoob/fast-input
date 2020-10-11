const stringSimilarity = require("string-similarity");
const ar = require("./emoji_files/ar.json");
const am = require("./emoji_files/am.json");
const bg = require("./emoji_files/bg.json");
const bn = require("./emoji_files/bn.json");
const ca = require("./emoji_files/ca.json");
const cs = require("./emoji_files/cs.json");
const da = require("./emoji_files/da.json");
const de = require("./emoji_files/de.json");
const el = require("./emoji_files/el.json");
const en = require("./emoji_files/en.json");
const es = require("./emoji_files/es.json");
const et = require("./emoji_files/et.json");
const fa = require("./emoji_files/fa.json");
const fi = require("./emoji_files/fi.json");
const fil = require("./emoji_files/fil.json");
const fr = require("./emoji_files/fr.json");
const gu = require("./emoji_files/gu.json");
const he = require("./emoji_files/he.json");
const hi = require("./emoji_files/hi.json");
const hr = require("./emoji_files/hr.json");
const hu = require("./emoji_files/hu.json");
const id = require("./emoji_files/id.json");
const it = require("./emoji_files/it.json");
const ja = require("./emoji_files/ja.json");
const kn = require("./emoji_files/kn.json");
const ko = require("./emoji_files/ko.json");
const lt = require("./emoji_files/lt.json");
const lv = require("./emoji_files/lv.json");
const ml = require("./emoji_files/ml.json");
const mr = require("./emoji_files/mr.json");
const ms = require("./emoji_files/ms.json");
const nl = require("./emoji_files/nl.json");
const no = require("./emoji_files/no.json");
const pl = require("./emoji_files/pl.json");
const pt = require("./emoji_files/pt.json");
const ro = require("./emoji_files/ro.json");
const ru = require("./emoji_files/ru.json");
const sk = require("./emoji_files/sk.json");
const sl = require("./emoji_files/sl.json");
const sr = require("./emoji_files/sr.json");
const sv = require("./emoji_files/sv.json");
const sw = require("./emoji_files/sw.json");
const ta = require("./emoji_files/ta.json");
const te = require("./emoji_files/te.json");
const th = require("./emoji_files/th.json");
const tr = require("./emoji_files/tr.json");
const uk = require("./emoji_files/uk.json");
const vi = require("./emoji_files/vi.json");
const zh = require("./emoji_files/zh.json");

class Emoji {
  constructor() {
    this.languages = {};
    this.languages["ar"] = ar;
    this.languages["am"] = am;
    this.languages["bg"] = bg;
    this.languages["bn"] = bn;
    this.languages["ca"] = ca;
    this.languages["cs"] = cs;
    this.languages["da"] = da;
    this.languages["de"] = de;
    this.languages["el"] = el;
    this.languages["en"] = en;
    this.languages["es"] = es;
    this.languages["et"] = et;
    this.languages["fa"] = fa;
    this.languages["fi"] = fi;
    this.languages["fil"] = fil;
    this.languages["fr"] = fr;
    this.languages["gu"] = gu;
    this.languages["he"] = he;
    this.languages["hi"] = hi;
    this.languages["hr"] = hr;
    this.languages["hu"] = hu;
    this.languages["id"] = id;
    this.languages["it"] = it;
    this.languages["ja"] = ja;
    this.languages["kn"] = kn;
    this.languages["ko"] = ko;
    this.languages["lt"] = lt;
    this.languages["lv"] = lv;
    this.languages["ml"] = ml;
    this.languages["mr"] = mr;
    this.languages["ms"] = ms;
    this.languages["nl"] = nl;
    this.languages["no"] = no;
    this.languages["pl"] = pl;
    this.languages["pt"] = pt;
    this.languages["ro"] = ro;
    this.languages["ru"] = ru;
    this.languages["sk"] = sk;
    this.languages["sl"] = sl;
    this.languages["sr"] = sr;
    this.languages["sv"] = sv;
    this.languages["sw"] = sw;
    this.languages["ta"] = ta;
    this.languages["te"] = te;
    this.languages["th"] = th;
    this.languages["tr"] = tr;
    this.languages["uk"] = uk;
    this.languages["vi"] = vi;
    this.languages["zh"] = zh;
  }
  getEmoji(langId, emojiName) {
    const locale = langId.split("-");
    return this.languages[locale[0]][emojiName];
  }
  getEmojiList(langId) {
    const locale = langId.split("-");
    return this.languages[locale[0]];
  }
  getSomeWhatSimilarEmoji(langId, emojiName) {
    const locale = langId.split("-")[0];
    let emojiRes = null;
    const res = this.languages[locale][emojiName];
    if (res) {
      emojiRes = res;
    } else {
      const matches = stringSimilarity.findBestMatch(
        emojiName,
        Object.keys(this.languages[locale])
      );
      emojiRes = this.languages[locale][matches.bestMatch.target];
    }
    return emojiRes;
  }
}
const emoji = new Emoji();
export default emoji;