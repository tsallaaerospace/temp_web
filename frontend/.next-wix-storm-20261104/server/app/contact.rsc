1:"$Sreact.fragment"
3:I[88698,["5592","static/chunks/c15bf2b0-17cd5f0f35cda2bb.js","7647","static/chunks/7647-dfe8c759cf5fe1d2.js","5841","static/chunks/5841-5efbbd82d0098e39.js","802","static/chunks/802-c24c7eddfdcf0350.js","6874","static/chunks/6874-ebc6da04619a9d0a.js","6449","static/chunks/6449-4d98fc67fbd06ed2.js","1993","static/chunks/1993-f8109cd753327aab.js","7177","static/chunks/app/layout-0413e89c6cfac221.js"],"default"]
4:I[70292,["5592","static/chunks/c15bf2b0-17cd5f0f35cda2bb.js","7647","static/chunks/7647-dfe8c759cf5fe1d2.js","5841","static/chunks/5841-5efbbd82d0098e39.js","802","static/chunks/802-c24c7eddfdcf0350.js","6874","static/chunks/6874-ebc6da04619a9d0a.js","6449","static/chunks/6449-4d98fc67fbd06ed2.js","1993","static/chunks/1993-f8109cd753327aab.js","7177","static/chunks/app/layout-0413e89c6cfac221.js"],"default"]
5:I[70964,["5592","static/chunks/c15bf2b0-17cd5f0f35cda2bb.js","7647","static/chunks/7647-dfe8c759cf5fe1d2.js","5841","static/chunks/5841-5efbbd82d0098e39.js","802","static/chunks/802-c24c7eddfdcf0350.js","6874","static/chunks/6874-ebc6da04619a9d0a.js","6449","static/chunks/6449-4d98fc67fbd06ed2.js","1993","static/chunks/1993-f8109cd753327aab.js","7177","static/chunks/app/layout-0413e89c6cfac221.js"],"default"]
6:I[65559,["5592","static/chunks/c15bf2b0-17cd5f0f35cda2bb.js","7647","static/chunks/7647-dfe8c759cf5fe1d2.js","5841","static/chunks/5841-5efbbd82d0098e39.js","802","static/chunks/802-c24c7eddfdcf0350.js","6874","static/chunks/6874-ebc6da04619a9d0a.js","6449","static/chunks/6449-4d98fc67fbd06ed2.js","1993","static/chunks/1993-f8109cd753327aab.js","7177","static/chunks/app/layout-0413e89c6cfac221.js"],"default"]
7:I[87555,[],""]
8:I[12350,["7647","static/chunks/7647-dfe8c759cf5fe1d2.js","6397","static/chunks/app/template-8135e48fa0132106.js"],"default"]
9:I[31295,[],""]
a:I[19010,["5592","static/chunks/c15bf2b0-17cd5f0f35cda2bb.js","7647","static/chunks/7647-dfe8c759cf5fe1d2.js","5841","static/chunks/5841-5efbbd82d0098e39.js","802","static/chunks/802-c24c7eddfdcf0350.js","6874","static/chunks/6874-ebc6da04619a9d0a.js","6449","static/chunks/6449-4d98fc67fbd06ed2.js","1993","static/chunks/1993-f8109cd753327aab.js","7177","static/chunks/app/layout-0413e89c6cfac221.js"],"default"]
b:I[59665,[],"OutletBoundary"]
e:I[59665,[],"ViewportBoundary"]
10:I[59665,[],"MetadataBoundary"]
12:I[26614,[],""]
:HL["/_next/static/css/58864b06277aa8a5.css","style"]
:HL["/_next/static/css/532e7ff2567ea4ed.css","style"]
2:Tc8c,(function () {
  var delays = [2000,4000,8000,15000,30000,60000];
  var tries = new WeakMap();
  function fresh(src, stamp) {
    var url = new URL(src, document.baseURI);
    if (url.origin !== new URL(document.baseURI).origin) return src;
    url.searchParams.set("_media_retry", stamp);
    return url.href;
  }
  function refreshSet(value, stamp) {
    if (value.indexOf("data:") !== -1) return value;
    return value.split(",").map(function (candidate) {
      return candidate.trim().replace(/^([^\s]+)/, function (src) { return fresh(src, stamp); });
    }).join(", ");
  }
  function retry(el) {
    var tag = el && el.tagName;
    if (tag !== "IMG" && tag !== "VIDEO" && tag !== "SOURCE") return;
    var src = el.getAttribute("src") || el.currentSrc;
    if (!src) return;
    if (tag === "SOURCE") {
      // The browser also fires "error" on a <source> it skips because its media query doesn't match (e.g. the
      // phone-only clip on desktop), or after a later <source> was chosen. Retrying those reloaded a video that was
      // already playing, so the FENIX hero restarted after 2 s, 4 s and 8 s on desktop.
      // PREVIOUS: every <source> error was retried.
      var media = el.getAttribute("media");
      if (media && !window.matchMedia(media).matches) return;
      var owner = el.parentElement;
      if (owner && owner.currentSrc && owner.currentSrc !== el.src && !owner.error) return;
    }
    var state = tries.get(el);
    if (!state || state.current !== src) state = { src: src, current: src, count: 0, pending: false };
    if (state.pending || state.count >= delays.length) return;
    var wait = delays[state.count++];
    state.pending = true;
    tries.set(el, state);
    setTimeout(function () {
      state.pending = false;
      if (!el.isConnected || (el.getAttribute("src") || el.currentSrc) !== src) return;
      var stamp = Date.now() + "-" + state.count;
      state.current = fresh(state.src, stamp);
      if (tag === "IMG") {
        // Refresh the browser-selected candidates too; src alone does not override srcset/picture.
        var srcset = el.getAttribute("srcset");
        if (srcset) el.setAttribute("srcset", refreshSet(srcset, stamp));
        if (el.parentElement && el.parentElement.tagName === "PICTURE") {
          el.parentElement.querySelectorAll("source[srcset]").forEach(function (source) {
            source.setAttribute("srcset", refreshSet(source.getAttribute("srcset"), stamp));
          });
        }
        el.setAttribute("src", state.current);
        return;
      }
      el.setAttribute("src", state.current);
      var video = tag === "SOURCE" ? el.parentElement : el;
      if (video && typeof video.load === "function") video.load();
    }, wait);
  }
  document.addEventListener("error", function (event) { retry(event.target); }, true);
  document.addEventListener("load", function (event) { tries.delete(event.target); }, true);
  function scan() {
    document.querySelectorAll("img").forEach(function (image) {
      if (image.complete && !image.naturalWidth) retry(image);
    });
  }
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", scan, { once: true });
  else scan();
})();0:{"P":null,"b":"8NLC9wMfXBR1k-Otnscw0","p":"","c":["","contact"],"i":false,"f":[[["",{"children":["contact",{"children":["__PAGE__",{}]}]},"$undefined","$undefined",true],["",["$","$1","c",{"children":[[["$","link","0",{"rel":"stylesheet","href":"/_next/static/css/58864b06277aa8a5.css","precedence":"next","crossOrigin":"$undefined","nonce":"$undefined"}],["$","link","1",{"rel":"stylesheet","href":"/_next/static/css/532e7ff2567ea4ed.css","precedence":"next","crossOrigin":"$undefined","nonce":"$undefined"}]],["$","html",null,{"lang":"en","className":"__variable_d8ebd1 __variable_ab7fb3","children":[["$","head",null,{"children":[["$","script",null,{"dangerouslySetInnerHTML":{"__html":"$2"}}],["$","link",null,{"rel":"preload","href":"/fonts/orbit-latin.woff2","as":"font","type":"font/woff2","crossOrigin":"anonymous"}]]}],["$","body",null,{"className":"bg-black text-white font-orbit","suppressHydrationWarning":true,"children":["$","$L3",null,{"children":[["$","$L4",null,{}],["$","$L5",null,{}],["$","$L6",null,{}],["$","main",null,{"className":"min-h-screen","children":["$","$L7",null,{"parallelRouterKey":"children","error":"$undefined","errorStyles":"$undefined","errorScripts":"$undefined","template":["$","$L8",null,{"children":["$","$L9",null,{}]}],"templateStyles":[],"templateScripts":[],"notFound":[[["$","title",null,{"children":"404: This page could not be found."}],["$","div",null,{"style":{"fontFamily":"system-ui,\"Segoe UI\",Roboto,Helvetica,Arial,sans-serif,\"Apple Color Emoji\",\"Segoe UI Emoji\"","height":"100vh","textAlign":"center","display":"flex","flexDirection":"column","alignItems":"center","justifyContent":"center"},"children":["$","div",null,{"children":[["$","style",null,{"dangerouslySetInnerHTML":{"__html":"body{color:#000;background:#fff;margin:0}.next-error-h1{border-right:1px solid rgba(0,0,0,.3)}@media (prefers-color-scheme:dark){body{color:#fff;background:#000}.next-error-h1{border-right:1px solid rgba(255,255,255,.3)}}"}}],["$","h1",null,{"className":"next-error-h1","style":{"display":"inline-block","margin":"0 20px 0 0","padding":"0 23px 0 0","fontSize":24,"fontWeight":500,"verticalAlign":"top","lineHeight":"49px"},"children":404}],["$","div",null,{"style":{"display":"inline-block"},"children":["$","h2",null,{"style":{"fontSize":14,"fontWeight":400,"lineHeight":"49px","margin":0},"children":"This page could not be found."}]}]]}]}]],[]],"forbidden":"$undefined","unauthorized":"$undefined"}]}],["$","$La",null,{}]]}]}]]}]]}],{"children":["contact",["$","$1","c",{"children":[null,["$","$L7",null,{"parallelRouterKey":"children","error":"$undefined","errorStyles":"$undefined","errorScripts":"$undefined","template":["$","$L9",null,{}],"templateStyles":"$undefined","templateScripts":"$undefined","notFound":"$undefined","forbidden":"$undefined","unauthorized":"$undefined"}]]}],{"children":["__PAGE__",["$","$1","c",{"children":[["$","div",null,{"className":"min-h-screen bg-black text-white pt-[4.5rem] ","children":["$","div",null,{"className":"min-h-screen","children":["$","section",null,{"aria-labelledby":"contact-title","className":"contact-section bg-black px-6 pb-16 pt-8 font-orbit text-white md:px-12 md:pb-24 md:pt-16 lg:px-16","children":["$","div",null,{"className":"mx-auto max-w-7xl","children":[["$","header",null,{"className":"mb-12 grid gap-6 lg:mb-16 lg:grid-cols-2 lg:items-end lg:gap-16","children":[["$","div",null,{"children":[["$","p",null,{"className":"mb-5 text-xs font-normal uppercase tracking-[0.2em] text-[#5ce1e6]","children":"Contact Tsalla Aerospace"}],["$","h1",null,{"id":"contact-title","className":"whitespace-nowrap text-[clamp(1rem,6vw,2.25rem)] font-medium uppercase leading-tight tracking-tight md:text-5xl lg:text-[clamp(2rem,3.5vw,3.75rem)]","children":["Reach out to us",["$","span",null,{"className":"text-[#5ce1e6]","children":"."}]]}]]}],["$","p",null,{"className":"max-w-lg text-justify text-lg font-light leading-relaxed text-neutral-400 md:text-xl","children":"Have a question, an idea, or a collaboration in mind? Let’s start a conversation."}]]}],["$","div",null,{"className":"grid border-y border-white/15 lg:grid-cols-2","children":[["$","div",null,{"className":"min-w-0 py-10 lg:py-12 lg:pr-12","children":[["$","p",null,{"className":"mb-3 text-xs uppercase tracking-[0.15em] text-neutral-400","children":"Get in touch"}],["$","h2",null,{"className":"text-2xl font-medium leading-snug md:text-3xl","children":"Connect with our team"}],["$","p",null,{"className":"mt-4 max-w-md text-base leading-relaxed text-neutral-400","children":"For enquiries and partnerships, reach our team directly by email or phone."}],["$","dl",null,{"className":"mt-10 space-y-7","children":[["$","div",null,{"children":[["$","dt",null,{"className":"mb-2 text-xs uppercase tracking-[0.15em] text-neutral-400","children":"Email"}],["$","dd",null,{"children":["$","a",null,{"href":"mailto:info@tsallaaerospace.com","className":"inline-block max-w-full break-words text-base font-normal leading-relaxed text-white underline decoration-white/30 underline-offset-8 transition-colors [@media(hover:hover)]:hover:text-[#5ce1e6] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-8 focus-visible:outline-[#5ce1e6] sm:text-xl","children":"info@tsallaaerospace.com"}]}]]}],["$","div",null,{"children":[["$","dt",null,{"className":"mb-2 text-xs uppercase tracking-[0.15em] text-neutral-400","children":"Phone"}],["$","dd",null,{"children":["$","a",null,{"href":"tel:+919535720540","className":"inline-flex min-h-11 items-center text-lg leading-relaxed transition-colors [@media(hover:hover)]:hover:text-[#5ce1e6] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#5ce1e6]","children":"+91 95357 20540"}]}]]}]]}],["$","a",null,{"href":"mailto:info@tsallaaerospace.com","className":"mt-10 inline-flex min-h-12 items-center justify-center gap-8 border border-white px-6 py-3 text-sm font-normal transition-colors [@media(hover:hover)]:hover:bg-white [@media(hover:hover)]:hover:text-black focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#5ce1e6]","children":["Compose email",["$","svg",null,{"ref":"$undefined","xmlns":"http://www.w3.org/2000/svg","width":24,"height":24,"viewBox":"0 0 24 24","fill":"none","stroke":"currentColor","strokeWidth":1.5,"strokeLinecap":"round","strokeLinejoin":"round","className":"lucide lucide-arrow-up-right h-4 w-4","aria-hidden":"true","children":[["$","path","1tivn9",{"d":"M7 7h10v10"}],["$","path","1vkiza",{"d":"M7 17 17 7"}],"$undefined"]}]]}]]}],["$","div",null,{"className":"min-w-0 border-t border-white/15 py-10 lg:border-l lg:border-t-0 lg:py-12 lg:pl-12","children":[["$","div",null,{"className":"mb-6","children":[["$","p",null,{"className":"mb-3 text-xs uppercase tracking-[0.15em] text-neutral-400","children":"Our headquarters"}],["$","h2",null,{"className":"text-2xl font-medium leading-snug md:text-3xl","children":[["$","span",null,{"className":"text-[#5ce1e6]","children":"Bengaluru"}],", India"]}],["$","address",null,{"className":"mt-3 text-base not-italic leading-relaxed text-neutral-400","children":"Bengaluru, Karnataka 560012"}]]}],["$","div",null,{"className":"relative h-72 overflow-hidden border border-white/15 bg-neutral-900 sm:h-80","children":["$","iframe",null,{"width":"100%","height":"100%","className":"absolute inset-0 h-full w-full border-0 grayscale","title":"Tsalla Aerospace headquarters location in Bengaluru","loading":"lazy","referrerPolicy":"no-referrer-when-downgrade","src":"https://maps.google.com/maps?q=13.013616,77.568779&z=15&output=embed"}]}],["$","a",null,{"href":"https://www.google.com/maps/search/?api=1&query=13.013616,77.568779","target":"_blank","rel":"noopener noreferrer","className":"mt-3 inline-flex min-h-11 items-center gap-3 text-sm text-neutral-300 transition-colors [@media(hover:hover)]:hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#5ce1e6]","children":["Open in Google Maps ",["$","span",null,{"className":"sr-only","children":"(opens in a new tab)"}],["$","svg",null,{"ref":"$undefined","xmlns":"http://www.w3.org/2000/svg","width":24,"height":24,"viewBox":"0 0 24 24","fill":"none","stroke":"currentColor","strokeWidth":1.5,"strokeLinecap":"round","strokeLinejoin":"round","className":"lucide lucide-arrow-up-right h-4 w-4","aria-hidden":"true","children":[["$","path","1tivn9",{"d":"M7 7h10v10"}],["$","path","1vkiza",{"d":"M7 17 17 7"}],"$undefined"]}]]}]]}]]}]]}]}]}]}],"$undefined",null,["$","$Lb",null,{"children":["$Lc","$Ld",null]}]]}],{},null,false]},null,false]},null,false],["$","$1","h",{"children":[null,["$","$1","L-ygJ38_IGT-awAYIpmii",{"children":[["$","$Le",null,{"children":"$Lf"}],null]}],["$","$L10",null,{"children":"$L11"}]]}],false]],"m":"$undefined","G":["$12","$undefined"],"s":false,"S":true}
f:[["$","meta","0",{"charSet":"utf-8"}],["$","meta","1",{"name":"viewport","content":"width=device-width, initial-scale=1"}]]
c:null
d:null
11:[["$","title","0",{"children":"Tsalla Aerospace - Unmanned Systems & AI Technology"}],["$","meta","1",{"name":"description","content":"We Don't Build Drones. We Build Unfair Advantages. Leading aerospace technology company specializing in unmanned systems and AI."}],["$","meta","2",{"name":"generator","content":"Tsalla Aerospace"}],["$","meta","3",{"name":"keywords","content":"aerospace, drones, unmanned systems, AI, defense technology"}],["$","link","4",{"rel":"icon","href":"/tsalla-favicon.png","type":"image/png","sizes":"512x512"}],["$","link","5",{"rel":"apple-touch-icon","href":"/tsalla-favicon.png","type":"image/png","sizes":"512x512"}]]
