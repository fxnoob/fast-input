const ar = require("../app/_locales/ar/messages.json");
const am = require("../app/_locales/am/messages.json");
const bg = require("../app/_locales/bg/messages.json");
const bn = require("../app/_locales/bn/messages.json");
const ca = require("../app/_locales/ca/messages.json");
const cs = require("../app/_locales/cs/messages.json");
const da = require("../app/_locales/da/messages.json");
const de = require("../app/_locales/de/messages.json");
const el = require("../app/_locales/el/messages.json");
const en = require("../app/_locales/en/messages.json");
const es = require("../app/_locales/es/messages.json");
const et = require("../app/_locales/et/messages.json");
const fa = require("../app/_locales/fa/messages.json");
const fi = require("../app/_locales/fi/messages.json");
const fil = require("../app/_locales/fil/messages.json");
const fr = require("../app/_locales/fr/messages.json");
const gu = require("../app/_locales/gu/messages.json");
const he = require("../app/_locales/he/messages.json");
const hi = require("../app/_locales/hi/messages.json");
const hr = require("../app/_locales/hr/messages.json");
const hu = require("../app/_locales/hu/messages.json");
const id = require("../app/_locales/id/messages.json");
const it = require("../app/_locales/it/messages.json");
const ja = require("../app/_locales/ja/messages.json");
const kn = require("../app/_locales/kn/messages.json");
const ko = require("../app/_locales/ko/messages.json");
const lt = require("../app/_locales/lt/messages.json");
const lv = require("../app/_locales/lv/messages.json");
const ml = require("../app/_locales/ml/messages.json");
const mr = require("../app/_locales/mr/messages.json");
const ms = require("../app/_locales/ms/messages.json");
const nl = require("../app/_locales/nl/messages.json");
const no = require("../app/_locales/no/messages.json");
const pl = require("../app/_locales/pl/messages.json");
const pt = require("../app/_locales/pt/messages.json");
const ro = require("../app/_locales/ro/messages.json");
const ru = require("../app/_locales/ru/messages.json");
const sk = require("../app/_locales/sk/messages.json");
const sl = require("../app/_locales/sl/messages.json");
const sr = require("../app/_locales/sr/messages.json");
const sv = require("../app/_locales/sv/messages.json");
const sw = require("../app/_locales/sw/messages.json");
const ta = require("../app/_locales/ta/messages.json");
const te = require("../app/_locales/te/messages.json");
const th = require("../app/_locales/th/messages.json");
const tr = require("../app/_locales/tr/messages.json");
const uk = require("../app/_locales/uk/messages.json");
const vi = require("../app/_locales/vi/messages.json");
const zh = require("../app/_locales/zh/messages.json");
const languages = {};
languages["ar"] = ar;
languages["am"] = am;
languages["bg"] = bg;
languages["bn"] = bn;
languages["ca"] = ca;
languages["cs"] = cs;
languages["da"] = da;
languages["de"] = de;
languages["el"] = el;
languages["en"] = en;
languages["es"] = es;
languages["et"] = et;
languages["fa"] = fa;
languages["fi"] = fi;
languages["fil"] = fil;
languages["fr"] = fr;
languages["gu"] = gu;
languages["he"] = he;
languages["hi"] = hi;
languages["hr"] = hr;
languages["hu"] = hu;
languages["id"] = id;
languages["it"] = it;
languages["ja"] = ja;
languages["kn"] = kn;
languages["ko"] = ko;
languages["lt"] = lt;
languages["lv"] = lv;
languages["ml"] = ml;
languages["mr"] = mr;
languages["ms"] = ms;
languages["nl"] = nl;
languages["no"] = no;
languages["pl"] = pl;
languages["pt"] = pt;
languages["ro"] = ro;
languages["ru"] = ru;
languages["sk"] = sk;
languages["sl"] = sl;
languages["sr"] = sr;
languages["sv"] = sv;
languages["sw"] = sw;
languages["ta"] = ta;
languages["te"] = te;
languages["th"] = th;
languages["tr"] = tr;
languages["uk"] = uk;
languages["vi"] = vi;
languages["zh"] = zh;

function getMessage(langId, key) {
  const locale = langId.split("-");
  const lang = languages[locale[0]];
  return lang ? lang[key] : languages["en"][key];
}
if (typeof self != 'undefined') {
// listens for command from translation service
  self.addEventListener(
    "message",
    evt => {
      const { langId, key, uid, action } = evt.data;
      if (action == "getMessage") {
        const message = getMessage(langId, key);
        self.postMessage({ langId, key, uid, action, message });
      }
    },
    false
  );
}
