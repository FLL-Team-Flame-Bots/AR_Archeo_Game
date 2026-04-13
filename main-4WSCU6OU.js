var Tw=Object.defineProperty,Dw=Object.defineProperties;var Iw=Object.getOwnPropertyDescriptors;var I_=Object.getOwnPropertySymbols;var Aw=Object.prototype.hasOwnProperty,Rw=Object.prototype.propertyIsEnumerable;var A_=(n,e,t)=>e in n?Tw(n,e,{enumerable:!0,configurable:!0,writable:!0,value:t}):n[e]=t,ae=(n,e)=>{for(var t in e||={})Aw.call(e,t)&&A_(n,t,e[t]);if(I_)for(var t of I_(e))Rw.call(e,t)&&A_(n,t,e[t]);return n},et=(n,e)=>Dw(n,Iw(e));var mn=null,Ul=!1,Mp=1,Nw=null,En=Symbol("SIGNAL");function Ve(n){let e=mn;return mn=n,e}function zl(){return mn}var ys={version:0,lastCleanEpoch:0,dirty:!1,producers:void 0,producersTail:void 0,consumers:void 0,consumersTail:void 0,recomputing:!1,consumerAllowSignalWrites:!1,consumerIsAlwaysLive:!1,kind:"unknown",producerMustRecompute:()=>!1,producerRecomputeValue:()=>{},consumerMarkedDirty:()=>{},consumerOnSignalRead:()=>{}};function go(n){if(Ul)throw new Error("");if(mn===null)return;mn.consumerOnSignalRead(n);let e=mn.producersTail;if(e!==void 0&&e.producer===n)return;let t,i=mn.recomputing;if(i&&(t=e!==void 0?e.nextProducer:mn.producers,t!==void 0&&t.producer===n)){mn.producersTail=t,t.lastReadVersion=n.version;return}let r=n.consumersTail;if(r!==void 0&&r.consumer===mn&&(!i||Ow(r,mn)))return;let s=yo(mn),o={producer:n,consumer:mn,nextProducer:t,prevConsumer:r,lastReadVersion:n.version,nextConsumer:void 0};mn.producersTail=o,e!==void 0?e.nextProducer=o:mn.producers=o,s&&O_(n,o)}function R_(){Mp++}function Gl(n){if(!(yo(n)&&!n.dirty)&&!(!n.dirty&&n.lastCleanEpoch===Mp)){if(!n.producerMustRecompute(n)&&!Ga(n)){Hl(n);return}n.producerRecomputeValue(n),Hl(n)}}function bp(n){if(n.consumers===void 0)return;let e=Ul;Ul=!0;try{for(let t=n.consumers;t!==void 0;t=t.nextConsumer){let i=t.consumer;i.dirty||Pw(i)}}finally{Ul=e}}function Sp(){return mn?.consumerAllowSignalWrites!==!1}function Pw(n){n.dirty=!0,bp(n),n.consumerMarkedDirty?.(n)}function Hl(n){n.dirty=!1,n.lastCleanEpoch=Mp}function _s(n){return n&&N_(n),Ve(n)}function N_(n){n.producersTail=void 0,n.recomputing=!0}function vo(n,e){Ve(e),n&&P_(n)}function P_(n){n.recomputing=!1;let e=n.producersTail,t=e!==void 0?e.nextProducer:n.producers;if(t!==void 0){if(yo(n))do t=Ep(t);while(t!==void 0);e!==void 0?e.nextProducer=void 0:n.producers=void 0}}function Ga(n){for(let e=n.producers;e!==void 0;e=e.nextProducer){let t=e.producer,i=e.lastReadVersion;if(i!==t.version||(Gl(t),i!==t.version))return!0}return!1}function xs(n){if(yo(n)){let e=n.producers;for(;e!==void 0;)e=Ep(e)}n.producers=void 0,n.producersTail=void 0,n.consumers=void 0,n.consumersTail=void 0}function O_(n,e){let t=n.consumersTail,i=yo(n);if(t!==void 0?(e.nextConsumer=t.nextConsumer,t.nextConsumer=e):(e.nextConsumer=void 0,n.consumers=e),e.prevConsumer=t,n.consumersTail=e,!i)for(let r=n.producers;r!==void 0;r=r.nextProducer)O_(r.producer,r)}function Ep(n){let e=n.producer,t=n.nextProducer,i=n.nextConsumer,r=n.prevConsumer;if(n.nextConsumer=void 0,n.prevConsumer=void 0,i!==void 0?i.prevConsumer=r:e.consumersTail=r,r!==void 0)r.nextConsumer=i;else if(e.consumers=i,!yo(e)){let s=e.producers;for(;s!==void 0;)s=Ep(s)}return t}function yo(n){return n.consumerIsAlwaysLive||n.consumers!==void 0}function jl(n){Nw?.(n)}function Ow(n,e){let t=e.producersTail;if(t!==void 0){let i=e.producers;do{if(i===n)return!0;if(i===t)break;i=i.nextProducer}while(i!==void 0)}return!1}function Wl(n,e){return Object.is(n,e)}function $l(n,e){let t=Object.create(Lw);t.computation=n,e!==void 0&&(t.equal=e);let i=()=>{if(Gl(t),go(t),t.value===za)throw t.error;return t.value};return i[En]=t,jl(t),i}var Bl=Symbol("UNSET"),Vl=Symbol("COMPUTING"),za=Symbol("ERRORED"),Lw=et(ae({},ys),{value:Bl,dirty:!0,error:null,equal:Wl,kind:"computed",producerMustRecompute(n){return n.value===Bl||n.value===Vl},producerRecomputeValue(n){if(n.value===Vl)throw new Error("");let e=n.value;n.value=Vl;let t=_s(n),i,r=!1;try{i=n.computation(),Ve(null),r=e!==Bl&&e!==za&&i!==za&&n.equal(e,i)}catch(s){i=za,n.error=s}finally{vo(n,t)}if(r){n.value=e;return}n.value=i,n.version++}});function Fw(){throw new Error}var L_=Fw;function F_(n){L_(n)}function wp(n){L_=n}var kw=null;function Cp(n,e){let t=Object.create(ql);t.value=n,e!==void 0&&(t.equal=e);let i=()=>k_(t);return i[En]=t,jl(t),[i,o=>_o(t,o),o=>Tp(t,o)]}function k_(n){return go(n),n.value}function _o(n,e){Sp()||F_(n),n.equal(n.value,e)||(n.value=e,Uw(n))}function Tp(n,e){Sp()||F_(n),_o(n,e(n.value))}var ql=et(ae({},ys),{equal:Wl,value:void 0,kind:"signal"});function Uw(n){n.version++,R_(),bp(n),kw?.(n)}var Dp=et(ae({},ys),{consumerIsAlwaysLive:!0,consumerAllowSignalWrites:!0,dirty:!0,kind:"effect"});function Ip(n){if(n.dirty=!1,n.version>0&&!Ga(n))return;n.version++;let e=_s(n);try{n.cleanup(),n.fn()}finally{vo(n,e)}}function ze(n){return typeof n=="function"}function xo(n){let t=n(i=>{Error.call(i),i.stack=new Error().stack});return t.prototype=Object.create(Error.prototype),t.prototype.constructor=t,t}var Xl=xo(n=>function(t){n(this),this.message=t?`${t.length} errors occurred during unsubscription:
${t.map((i,r)=>`${r+1}) ${i.toString()}`).join(`
  `)}`:"",this.name="UnsubscriptionError",this.errors=t});function ja(n,e){if(n){let t=n.indexOf(e);0<=t&&n.splice(t,1)}}var ln=class n{constructor(e){this.initialTeardown=e,this.closed=!1,this._parentage=null,this._finalizers=null}unsubscribe(){let e;if(!this.closed){this.closed=!0;let{_parentage:t}=this;if(t)if(this._parentage=null,Array.isArray(t))for(let s of t)s.remove(this);else t.remove(this);let{initialTeardown:i}=this;if(ze(i))try{i()}catch(s){e=s instanceof Xl?s.errors:[s]}let{_finalizers:r}=this;if(r){this._finalizers=null;for(let s of r)try{U_(s)}catch(o){e=e??[],o instanceof Xl?e=[...e,...o.errors]:e.push(o)}}if(e)throw new Xl(e)}}add(e){var t;if(e&&e!==this)if(this.closed)U_(e);else{if(e instanceof n){if(e.closed||e._hasParent(this))return;e._addParent(this)}(this._finalizers=(t=this._finalizers)!==null&&t!==void 0?t:[]).push(e)}}_hasParent(e){let{_parentage:t}=this;return t===e||Array.isArray(t)&&t.includes(e)}_addParent(e){let{_parentage:t}=this;this._parentage=Array.isArray(t)?(t.push(e),t):t?[t,e]:e}_removeParent(e){let{_parentage:t}=this;t===e?this._parentage=null:Array.isArray(t)&&ja(t,e)}remove(e){let{_finalizers:t}=this;t&&ja(t,e),e instanceof n&&e._removeParent(this)}};ln.EMPTY=(()=>{let n=new ln;return n.closed=!0,n})();var Ap=ln.EMPTY;function Yl(n){return n instanceof ln||n&&"closed"in n&&ze(n.remove)&&ze(n.add)&&ze(n.unsubscribe)}function U_(n){ze(n)?n():n.unsubscribe()}var mi={onUnhandledError:null,onStoppedNotification:null,Promise:void 0,useDeprecatedSynchronousErrorHandling:!1,useDeprecatedNextContext:!1};var Mo={setTimeout(n,e,...t){let{delegate:i}=Mo;return i?.setTimeout?i.setTimeout(n,e,...t):setTimeout(n,e,...t)},clearTimeout(n){let{delegate:e}=Mo;return(e?.clearTimeout||clearTimeout)(n)},delegate:void 0};function Zl(n){Mo.setTimeout(()=>{let{onUnhandledError:e}=mi;if(e)e(n);else throw n})}function Ms(){}var B_=Rp("C",void 0,void 0);function V_(n){return Rp("E",void 0,n)}function H_(n){return Rp("N",n,void 0)}function Rp(n,e,t){return{kind:n,value:e,error:t}}var bs=null;function bo(n){if(mi.useDeprecatedSynchronousErrorHandling){let e=!bs;if(e&&(bs={errorThrown:!1,error:null}),n(),e){let{errorThrown:t,error:i}=bs;if(bs=null,t)throw i}}else n()}function z_(n){mi.useDeprecatedSynchronousErrorHandling&&bs&&(bs.errorThrown=!0,bs.error=n)}var Ss=class extends ln{constructor(e){super(),this.isStopped=!1,e?(this.destination=e,Yl(e)&&e.add(this)):this.destination=Hw}static create(e,t,i){return new So(e,t,i)}next(e){this.isStopped?Pp(H_(e),this):this._next(e)}error(e){this.isStopped?Pp(V_(e),this):(this.isStopped=!0,this._error(e))}complete(){this.isStopped?Pp(B_,this):(this.isStopped=!0,this._complete())}unsubscribe(){this.closed||(this.isStopped=!0,super.unsubscribe(),this.destination=null)}_next(e){this.destination.next(e)}_error(e){try{this.destination.error(e)}finally{this.unsubscribe()}}_complete(){try{this.destination.complete()}finally{this.unsubscribe()}}},Bw=Function.prototype.bind;function Np(n,e){return Bw.call(n,e)}var Op=class{constructor(e){this.partialObserver=e}next(e){let{partialObserver:t}=this;if(t.next)try{t.next(e)}catch(i){Jl(i)}}error(e){let{partialObserver:t}=this;if(t.error)try{t.error(e)}catch(i){Jl(i)}else Jl(e)}complete(){let{partialObserver:e}=this;if(e.complete)try{e.complete()}catch(t){Jl(t)}}},So=class extends Ss{constructor(e,t,i){super();let r;if(ze(e)||!e)r={next:e??void 0,error:t??void 0,complete:i??void 0};else{let s;this&&mi.useDeprecatedNextContext?(s=Object.create(e),s.unsubscribe=()=>this.unsubscribe(),r={next:e.next&&Np(e.next,s),error:e.error&&Np(e.error,s),complete:e.complete&&Np(e.complete,s)}):r=e}this.destination=new Op(r)}};function Jl(n){mi.useDeprecatedSynchronousErrorHandling?z_(n):Zl(n)}function Vw(n){throw n}function Pp(n,e){let{onStoppedNotification:t}=mi;t&&Mo.setTimeout(()=>t(n,e))}var Hw={closed:!0,next:Ms,error:Vw,complete:Ms};var Eo=typeof Symbol=="function"&&Symbol.observable||"@@observable";function gi(n){return n}function Lp(...n){return Fp(n)}function Fp(n){return n.length===0?gi:n.length===1?n[0]:function(t){return n.reduce((i,r)=>r(i),t)}}var Qe=(()=>{class n{constructor(t){t&&(this._subscribe=t)}lift(t){let i=new n;return i.source=this,i.operator=t,i}subscribe(t,i,r){let s=Gw(t)?t:new So(t,i,r);return bo(()=>{let{operator:o,source:a}=this;s.add(o?o.call(s,a):a?this._subscribe(s):this._trySubscribe(s))}),s}_trySubscribe(t){try{return this._subscribe(t)}catch(i){t.error(i)}}forEach(t,i){return i=G_(i),new i((r,s)=>{let o=new So({next:a=>{try{t(a)}catch(c){s(c),o.unsubscribe()}},error:s,complete:r});this.subscribe(o)})}_subscribe(t){var i;return(i=this.source)===null||i===void 0?void 0:i.subscribe(t)}[Eo](){return this}pipe(...t){return Fp(t)(this)}toPromise(t){return t=G_(t),new t((i,r)=>{let s;this.subscribe(o=>s=o,o=>r(o),()=>i(s))})}}return n.create=e=>new n(e),n})();function G_(n){var e;return(e=n??mi.Promise)!==null&&e!==void 0?e:Promise}function zw(n){return n&&ze(n.next)&&ze(n.error)&&ze(n.complete)}function Gw(n){return n&&n instanceof Ss||zw(n)&&Yl(n)}function jw(n){return ze(n?.lift)}function ht(n){return e=>{if(jw(e))return e.lift(function(t){try{return n(t,this)}catch(i){this.error(i)}});throw new TypeError("Unable to lift unknown Observable type")}}function bt(n,e,t,i,r){return new kp(n,e,t,i,r)}var kp=class extends Ss{constructor(e,t,i,r,s,o){super(e),this.onFinalize=s,this.shouldUnsubscribe=o,this._next=t?function(a){try{t(a)}catch(c){e.error(c)}}:super._next,this._error=r?function(a){try{r(a)}catch(c){e.error(c)}finally{this.unsubscribe()}}:super._error,this._complete=i?function(){try{i()}catch(a){e.error(a)}finally{this.unsubscribe()}}:super._complete}unsubscribe(){var e;if(!this.shouldUnsubscribe||this.shouldUnsubscribe()){let{closed:t}=this;super.unsubscribe(),!t&&((e=this.onFinalize)===null||e===void 0||e.call(this))}}};var j_=xo(n=>function(){n(this),this.name="ObjectUnsubscribedError",this.message="object unsubscribed"});var Ht=(()=>{class n extends Qe{constructor(){super(),this.closed=!1,this.currentObservers=null,this.observers=[],this.isStopped=!1,this.hasError=!1,this.thrownError=null}lift(t){let i=new Kl(this,this);return i.operator=t,i}_throwIfClosed(){if(this.closed)throw new j_}next(t){bo(()=>{if(this._throwIfClosed(),!this.isStopped){this.currentObservers||(this.currentObservers=Array.from(this.observers));for(let i of this.currentObservers)i.next(t)}})}error(t){bo(()=>{if(this._throwIfClosed(),!this.isStopped){this.hasError=this.isStopped=!0,this.thrownError=t;let{observers:i}=this;for(;i.length;)i.shift().error(t)}})}complete(){bo(()=>{if(this._throwIfClosed(),!this.isStopped){this.isStopped=!0;let{observers:t}=this;for(;t.length;)t.shift().complete()}})}unsubscribe(){this.isStopped=this.closed=!0,this.observers=this.currentObservers=null}get observed(){var t;return((t=this.observers)===null||t===void 0?void 0:t.length)>0}_trySubscribe(t){return this._throwIfClosed(),super._trySubscribe(t)}_subscribe(t){return this._throwIfClosed(),this._checkFinalizedStatuses(t),this._innerSubscribe(t)}_innerSubscribe(t){let{hasError:i,isStopped:r,observers:s}=this;return i||r?Ap:(this.currentObservers=null,s.push(t),new ln(()=>{this.currentObservers=null,ja(s,t)}))}_checkFinalizedStatuses(t){let{hasError:i,thrownError:r,isStopped:s}=this;i?t.error(r):s&&t.complete()}asObservable(){let t=new Qe;return t.source=this,t}}return n.create=(e,t)=>new Kl(e,t),n})(),Kl=class extends Ht{constructor(e,t){super(),this.destination=e,this.source=t}next(e){var t,i;(i=(t=this.destination)===null||t===void 0?void 0:t.next)===null||i===void 0||i.call(t,e)}error(e){var t,i;(i=(t=this.destination)===null||t===void 0?void 0:t.error)===null||i===void 0||i.call(t,e)}complete(){var e,t;(t=(e=this.destination)===null||e===void 0?void 0:e.complete)===null||t===void 0||t.call(e)}_subscribe(e){var t,i;return(i=(t=this.source)===null||t===void 0?void 0:t.subscribe(e))!==null&&i!==void 0?i:Ap}};var un=class extends Ht{constructor(e){super(),this._value=e}get value(){return this.getValue()}_subscribe(e){let t=super._subscribe(e);return!t.closed&&e.next(this._value),t}getValue(){let{hasError:e,thrownError:t,_value:i}=this;if(e)throw t;return this._throwIfClosed(),i}next(e){super.next(this._value=e)}};var dn=new Qe(n=>n.complete());function W_(n){return n&&ze(n.schedule)}function $_(n){return n[n.length-1]}function q_(n){return ze($_(n))?n.pop():void 0}function Pr(n){return W_($_(n))?n.pop():void 0}function Y_(n,e,t,i){function r(s){return s instanceof t?s:new t(function(o){o(s)})}return new(t||(t=Promise))(function(s,o){function a(u){try{l(i.next(u))}catch(d){o(d)}}function c(u){try{l(i.throw(u))}catch(d){o(d)}}function l(u){u.done?s(u.value):r(u.value).then(a,c)}l((i=i.apply(n,e||[])).next())})}function X_(n){var e=typeof Symbol=="function"&&Symbol.iterator,t=e&&n[e],i=0;if(t)return t.call(n);if(n&&typeof n.length=="number")return{next:function(){return n&&i>=n.length&&(n=void 0),{value:n&&n[i++],done:!n}}};throw new TypeError(e?"Object is not iterable.":"Symbol.iterator is not defined.")}function Es(n){return this instanceof Es?(this.v=n,this):new Es(n)}function Z_(n,e,t){if(!Symbol.asyncIterator)throw new TypeError("Symbol.asyncIterator is not defined.");var i=t.apply(n,e||[]),r,s=[];return r=Object.create((typeof AsyncIterator=="function"?AsyncIterator:Object).prototype),a("next"),a("throw"),a("return",o),r[Symbol.asyncIterator]=function(){return this},r;function o(h){return function(g){return Promise.resolve(g).then(h,d)}}function a(h,g){i[h]&&(r[h]=function(_){return new Promise(function(m,p){s.push([h,_,m,p])>1||c(h,_)})},g&&(r[h]=g(r[h])))}function c(h,g){try{l(i[h](g))}catch(_){f(s[0][3],_)}}function l(h){h.value instanceof Es?Promise.resolve(h.value.v).then(u,d):f(s[0][2],h)}function u(h){c("next",h)}function d(h){c("throw",h)}function f(h,g){h(g),s.shift(),s.length&&c(s[0][0],s[0][1])}}function J_(n){if(!Symbol.asyncIterator)throw new TypeError("Symbol.asyncIterator is not defined.");var e=n[Symbol.asyncIterator],t;return e?e.call(n):(n=typeof X_=="function"?X_(n):n[Symbol.iterator](),t={},i("next"),i("throw"),i("return"),t[Symbol.asyncIterator]=function(){return this},t);function i(s){t[s]=n[s]&&function(o){return new Promise(function(a,c){o=n[s](o),r(a,c,o.done,o.value)})}}function r(s,o,a,c){Promise.resolve(c).then(function(l){s({value:l,done:a})},o)}}var Ql=n=>n&&typeof n.length=="number"&&typeof n!="function";function eu(n){return ze(n?.then)}function tu(n){return ze(n[Eo])}function nu(n){return Symbol.asyncIterator&&ze(n?.[Symbol.asyncIterator])}function iu(n){return new TypeError(`You provided ${n!==null&&typeof n=="object"?"an invalid object":`'${n}'`} where a stream was expected. You can provide an Observable, Promise, ReadableStream, Array, AsyncIterable, or Iterable.`)}function Ww(){return typeof Symbol!="function"||!Symbol.iterator?"@@iterator":Symbol.iterator}var ru=Ww();function su(n){return ze(n?.[ru])}function ou(n){return Z_(this,arguments,function*(){let t=n.getReader();try{for(;;){let{value:i,done:r}=yield Es(t.read());if(r)return yield Es(void 0);yield yield Es(i)}}finally{t.releaseLock()}})}function au(n){return ze(n?.getReader)}function tn(n){if(n instanceof Qe)return n;if(n!=null){if(tu(n))return $w(n);if(Ql(n))return qw(n);if(eu(n))return Xw(n);if(nu(n))return K_(n);if(su(n))return Yw(n);if(au(n))return Zw(n)}throw iu(n)}function $w(n){return new Qe(e=>{let t=n[Eo]();if(ze(t.subscribe))return t.subscribe(e);throw new TypeError("Provided object does not correctly implement Symbol.observable")})}function qw(n){return new Qe(e=>{for(let t=0;t<n.length&&!e.closed;t++)e.next(n[t]);e.complete()})}function Xw(n){return new Qe(e=>{n.then(t=>{e.closed||(e.next(t),e.complete())},t=>e.error(t)).then(null,Zl)})}function Yw(n){return new Qe(e=>{for(let t of n)if(e.next(t),e.closed)return;e.complete()})}function K_(n){return new Qe(e=>{Jw(n,e).catch(t=>e.error(t))})}function Zw(n){return K_(ou(n))}function Jw(n,e){var t,i,r,s;return Y_(this,void 0,void 0,function*(){try{for(t=J_(n);i=yield t.next(),!i.done;){let o=i.value;if(e.next(o),e.closed)return}}catch(o){r={error:o}}finally{try{i&&!i.done&&(s=t.return)&&(yield s.call(t))}finally{if(r)throw r.error}}e.complete()})}function Pn(n,e,t,i=0,r=!1){let s=e.schedule(function(){t(),r?n.add(this.schedule(null,i)):this.unsubscribe()},i);if(n.add(s),!r)return s}function cu(n,e=0){return ht((t,i)=>{t.subscribe(bt(i,r=>Pn(i,n,()=>i.next(r),e),()=>Pn(i,n,()=>i.complete(),e),r=>Pn(i,n,()=>i.error(r),e)))})}function lu(n,e=0){return ht((t,i)=>{i.add(n.schedule(()=>t.subscribe(i),e))})}function Q_(n,e){return tn(n).pipe(lu(e),cu(e))}function e0(n,e){return tn(n).pipe(lu(e),cu(e))}function t0(n,e){return new Qe(t=>{let i=0;return e.schedule(function(){i===n.length?t.complete():(t.next(n[i++]),t.closed||this.schedule())})})}function n0(n,e){return new Qe(t=>{let i;return Pn(t,e,()=>{i=n[ru](),Pn(t,e,()=>{let r,s;try{({value:r,done:s}=i.next())}catch(o){t.error(o);return}s?t.complete():t.next(r)},0,!0)}),()=>ze(i?.return)&&i.return()})}function uu(n,e){if(!n)throw new Error("Iterable cannot be null");return new Qe(t=>{Pn(t,e,()=>{let i=n[Symbol.asyncIterator]();Pn(t,e,()=>{i.next().then(r=>{r.done?t.complete():t.next(r.value)})},0,!0)})})}function i0(n,e){return uu(ou(n),e)}function r0(n,e){if(n!=null){if(tu(n))return Q_(n,e);if(Ql(n))return t0(n,e);if(eu(n))return e0(n,e);if(nu(n))return uu(n,e);if(su(n))return n0(n,e);if(au(n))return i0(n,e)}throw iu(n)}function Wt(n,e){return e?r0(n,e):tn(n)}function tt(...n){let e=Pr(n);return Wt(n,e)}function Up(n,e){let t=ze(n)?n:()=>n,i=r=>r.error(t());return new Qe(e?r=>e.schedule(i,0,r):i)}function du(n){return!!n&&(n instanceof Qe||ze(n.lift)&&ze(n.subscribe))}var ws=xo(n=>function(){n(this),this.name="EmptyError",this.message="no elements in sequence"});function _t(n,e){return ht((t,i)=>{let r=0;t.subscribe(bt(i,s=>{i.next(n.call(e,s,r++))}))})}var{isArray:Kw}=Array;function Qw(n,e){return Kw(e)?n(...e):n(e)}function s0(n){return _t(e=>Qw(n,e))}var{isArray:eC}=Array,{getPrototypeOf:tC,prototype:nC,keys:iC}=Object;function o0(n){if(n.length===1){let e=n[0];if(eC(e))return{args:e,keys:null};if(rC(e)){let t=iC(e);return{args:t.map(i=>e[i]),keys:t}}}return{args:n,keys:null}}function rC(n){return n&&typeof n=="object"&&tC(n)===nC}function a0(n,e){return n.reduce((t,i,r)=>(t[i]=e[r],t),{})}function Bp(...n){let e=Pr(n),t=q_(n),{args:i,keys:r}=o0(n);if(i.length===0)return Wt([],e);let s=new Qe(sC(i,e,r?o=>a0(r,o):gi));return t?s.pipe(s0(t)):s}function sC(n,e,t=gi){return i=>{c0(e,()=>{let{length:r}=n,s=new Array(r),o=r,a=r;for(let c=0;c<r;c++)c0(e,()=>{let l=Wt(n[c],e),u=!1;l.subscribe(bt(i,d=>{s[c]=d,u||(u=!0,a--),a||i.next(t(s.slice()))},()=>{--o||i.complete()}))},i)},i)}}function c0(n,e,t){n?Pn(t,n,e):e()}function l0(n,e,t,i,r,s,o,a){let c=[],l=0,u=0,d=!1,f=()=>{d&&!c.length&&!l&&e.complete()},h=_=>l<i?g(_):c.push(_),g=_=>{s&&e.next(_),l++;let m=!1;tn(t(_,u++)).subscribe(bt(e,p=>{r?.(p),s?h(p):e.next(p)},()=>{m=!0},void 0,()=>{if(m)try{for(l--;c.length&&l<i;){let p=c.shift();o?Pn(e,o,()=>g(p)):g(p)}f()}catch(p){e.error(p)}}))};return n.subscribe(bt(e,h,()=>{d=!0,f()})),()=>{a?.()}}function wn(n,e,t=1/0){return ze(e)?wn((i,r)=>_t((s,o)=>e(i,s,r,o))(tn(n(i,r))),t):(typeof e=="number"&&(t=e),ht((i,r)=>l0(i,r,n,t)))}function u0(n=1/0){return wn(gi,n)}function d0(){return u0(1)}function wo(...n){return d0()(Wt(n,Pr(n)))}function Wa(n){return new Qe(e=>{tn(n()).subscribe(e)})}var tr=new Qe(Ms);function ti(n,e){return ht((t,i)=>{let r=0;t.subscribe(bt(i,s=>n.call(e,s,r++)&&i.next(s)))})}function $a(n){return ht((e,t)=>{let i=null,r=!1,s;i=e.subscribe(bt(t,void 0,void 0,o=>{s=tn(n(o,$a(n)(e))),i?(i.unsubscribe(),i=null,s.subscribe(t)):r=!0})),r&&(i.unsubscribe(),i=null,s.subscribe(t))})}function fu(n,e){return ze(e)?wn(n,e,1):wn(n,1)}function f0(n){return ht((e,t)=>{let i=!1;e.subscribe(bt(t,r=>{i=!0,t.next(r)},()=>{i||t.next(n),t.complete()}))})}function Cn(n){return n<=0?()=>dn:ht((e,t)=>{let i=0;e.subscribe(bt(t,r=>{++i<=n&&(t.next(r),n<=i&&t.complete())}))})}function h0(n=oC){return ht((e,t)=>{let i=!1;e.subscribe(bt(t,r=>{i=!0,t.next(r)},()=>i?t.complete():t.error(n())))})}function oC(){return new ws}function Vp(n){return ht((e,t)=>{try{e.subscribe(t)}finally{t.add(n)}})}function nr(n,e){let t=arguments.length>=2;return i=>i.pipe(n?ti((r,s)=>n(r,s,i)):gi,Cn(1),t?f0(e):h0(()=>new ws))}function hu(n){return n<=0?()=>dn:ht((e,t)=>{let i=[];e.subscribe(bt(t,r=>{i.push(r),n<i.length&&i.shift()},()=>{for(let r of i)t.next(r);t.complete()},void 0,()=>{i=null}))})}function Hp(...n){let e=Pr(n);return ht((t,i)=>{(e?wo(n,t,e):wo(n,t)).subscribe(i)})}function gn(n,e){return ht((t,i)=>{let r=null,s=0,o=!1,a=()=>o&&!r&&i.complete();t.subscribe(bt(i,c=>{r?.unsubscribe();let l=0,u=s++;tn(n(c,u)).subscribe(r=bt(i,d=>i.next(e?e(c,d,u,l++):d),()=>{r=null,a()}))},()=>{o=!0,a()}))})}function qa(n){return ht((e,t)=>{tn(n).subscribe(bt(t,()=>t.complete(),Ms)),!t.closed&&e.subscribe(t)})}function ni(n,e,t){let i=ze(n)||e||t?{next:n,error:e,complete:t}:n;return i?ht((r,s)=>{var o;(o=i.subscribe)===null||o===void 0||o.call(i);let a=!0;r.subscribe(bt(s,c=>{var l;(l=i.next)===null||l===void 0||l.call(i,c),s.next(c)},()=>{var c;a=!1,(c=i.complete)===null||c===void 0||c.call(i),s.complete()},c=>{var l;a=!1,(l=i.error)===null||l===void 0||l.call(i,c),s.error(c)},()=>{var c,l;a&&((c=i.unsubscribe)===null||c===void 0||c.call(i)),(l=i.finalize)===null||l===void 0||l.call(i)}))}):gi}var zp;function pu(){return zp}function Fi(n){let e=zp;return zp=n,e}var p0=Symbol("NotFound");function Co(n){return n===p0||n?.name==="\u0275NotFound"}function m0(n){let e=Ve(null);try{return n()}finally{Ve(e)}}var tm="https://angular.dev/best-practices/security#preventing-cross-site-scripting-xss",ge=class extends Error{code;constructor(e,t){super(Fr(e,t)),this.code=e}};function aC(n){return`NG0${Math.abs(n)}`}function Fr(n,e){return`${aC(n)}${e?": "+e:""}`}function pt(n){for(let e in n)if(n[e]===pt)return e;throw Error("")}function ec(n){if(typeof n=="string")return n;if(Array.isArray(n))return`[${n.map(ec).join(", ")}]`;if(n==null)return""+n;let e=n.overriddenName||n.name;if(e)return`${e}`;let t=n.toString();if(t==null)return""+t;let i=t.indexOf(`
`);return i>=0?t.slice(0,i):t}function bu(n,e){return n?e?`${n} ${e}`:n:e||""}var cC=pt({__forward_ref__:pt});function Su(n){return n.__forward_ref__=Su,n}function On(n){return nm(n)?n():n}function nm(n){return typeof n=="function"&&n.hasOwnProperty(cC)&&n.__forward_ref__===Su}function Ce(n){return{token:n.token,providedIn:n.providedIn||null,factory:n.factory,value:void 0}}function Rs(n){return{providers:n.providers||[],imports:n.imports||[]}}function tc(n){return lC(n,Eu)}function im(n){return tc(n)!==null}function lC(n,e){return n.hasOwnProperty(e)&&n[e]||null}function uC(n){let e=n?.[Eu]??null;return e||null}function jp(n){return n&&n.hasOwnProperty(gu)?n[gu]:null}var Eu=pt({\u0275prov:pt}),gu=pt({\u0275inj:pt}),Ie=class{_desc;ngMetadataName="InjectionToken";\u0275prov;constructor(e,t){this._desc=e,this.\u0275prov=void 0,typeof t=="number"?this.__NG_ELEMENT_ID__=t:t!==void 0&&(this.\u0275prov=Ce({token:this,providedIn:t.providedIn||"root",factory:t.factory}))}get multi(){return this}toString(){return`InjectionToken ${this._desc}`}};function rm(n){return n&&!!n.\u0275providers}var sm=pt({\u0275cmp:pt}),om=pt({\u0275dir:pt}),am=pt({\u0275pipe:pt}),cm=pt({\u0275mod:pt}),Ya=pt({\u0275fac:pt}),Ns=pt({__NG_ELEMENT_ID__:pt}),g0=pt({__NG_ENV_ID__:pt});function lm(n){return wu(n,"@NgModule"),n[cm]||null}function kr(n){return wu(n,"@Component"),n[sm]||null}function um(n){return wu(n,"@Directive"),n[om]||null}function x0(n){return wu(n,"@Pipe"),n[am]||null}function wu(n,e){if(n==null)throw new ge(-919,!1)}function nc(n){return typeof n=="string"?n:n==null?"":String(n)}var M0=pt({ngErrorCode:pt}),dC=pt({ngErrorMessage:pt}),fC=pt({ngTokenPath:pt});function dm(n,e){return b0("",-200,e)}function Cu(n,e){throw new ge(-201,!1)}function b0(n,e,t){let i=new ge(e,n);return i[M0]=e,i[dC]=n,t&&(i[fC]=t),i}function hC(n){return n[M0]}var Wp;function S0(){return Wp}function zn(n){let e=Wp;return Wp=n,e}function fm(n,e,t){let i=tc(n);if(i&&i.providedIn=="root")return i.value===void 0?i.value=i.factory():i.value;if(t&8)return null;if(e!==void 0)return e;Cu(n,"")}var pC={},Cs=pC,mC="__NG_DI_FLAG__",$p=class{injector;constructor(e){this.injector=e}retrieve(e,t){let i=Ts(t)||0;try{return this.injector.get(e,i&8?null:Cs,i)}catch(r){if(Co(r))return r;throw r}}};function gC(n,e=0){let t=pu();if(t===void 0)throw new ge(-203,!1);if(t===null)return fm(n,void 0,e);{let i=vC(e),r=t.retrieve(n,i);if(Co(r)){if(i.optional)return null;throw r}return r}}function Re(n,e=0){return(S0()||gC)(On(n),e)}function Q(n,e){return Re(n,Ts(e))}function Ts(n){return typeof n>"u"||typeof n=="number"?n:0|(n.optional&&8)|(n.host&&1)|(n.self&&2)|(n.skipSelf&&4)}function vC(n){return{optional:!!(n&8),host:!!(n&1),self:!!(n&2),skipSelf:!!(n&4)}}function qp(n){let e=[];for(let t=0;t<n.length;t++){let i=On(n[t]);if(Array.isArray(i)){if(i.length===0)throw new ge(900,!1);let r,s=0;for(let o=0;o<i.length;o++){let a=i[o],c=yC(a);typeof c=="number"?c===-1?r=a.token:s|=c:r=a}e.push(Re(r,s))}else e.push(Re(i))}return e}function yC(n){return n[mC]}function Ds(n,e){let t=n.hasOwnProperty(Ya);return t?n[Ya]:null}function E0(n,e,t){if(n.length!==e.length)return!1;for(let i=0;i<n.length;i++){let r=n[i],s=e[i];if(t&&(r=t(r),s=t(s)),s!==r)return!1}return!0}function w0(n){return n.flat(Number.POSITIVE_INFINITY)}function Tu(n,e){n.forEach(t=>Array.isArray(t)?Tu(t,e):e(t))}function hm(n,e,t){e>=n.length?n.push(t):n.splice(e,0,t)}function ic(n,e){return e>=n.length-1?n.pop():n.splice(e,1)[0]}function C0(n,e,t,i){let r=n.length;if(r==e)n.push(t,i);else if(r===1)n.push(i,n[0]),n[0]=t;else{for(r--,n.push(n[r-1],n[r]);r>e;){let s=r-2;n[r]=n[s],r--}n[e]=t,n[e+1]=i}}function Du(n,e,t){let i=Do(n,e);return i>=0?n[i|1]=t:(i=~i,C0(n,i,e,t)),i}function Iu(n,e){let t=Do(n,e);if(t>=0)return n[t|1]}function Do(n,e){return _C(n,e,1)}function _C(n,e,t){let i=0,r=n.length>>t;for(;r!==i;){let s=i+(r-i>>1),o=n[s<<t];if(e===o)return s<<t;o>e?r=s:i=s+1}return~(r<<t)}var Ps={},Ln=[],Os=new Ie(""),pm=new Ie("",-1),mm=new Ie(""),Za=class{get(e,t=Cs){if(t===Cs){let r=b0("",-201);throw r.name="\u0275NotFound",r}return t}};function sr(n){return{\u0275providers:n}}function T0(n){return sr([{provide:Os,multi:!0,useValue:n}])}function D0(...n){return{\u0275providers:gm(!0,n),\u0275fromNgModule:!0}}function gm(n,...e){let t=[],i=new Set,r,s=o=>{t.push(o)};return Tu(e,o=>{let a=o;vu(a,s,[],i)&&(r||=[],r.push(a))}),r!==void 0&&I0(r,s),t}function I0(n,e){for(let t=0;t<n.length;t++){let{ngModule:i,providers:r}=n[t];vm(r,s=>{e(s,i)})}}function vu(n,e,t,i){if(n=On(n),!n)return!1;let r=null,s=jp(n),o=!s&&kr(n);if(!s&&!o){let c=n.ngModule;if(s=jp(c),s)r=c;else return!1}else{if(o&&!o.standalone)return!1;r=n}let a=i.has(r);if(o){if(a)return!1;if(i.add(r),o.dependencies){let c=typeof o.dependencies=="function"?o.dependencies():o.dependencies;for(let l of c)vu(l,e,t,i)}}else if(s){if(s.imports!=null&&!a){i.add(r);let l;Tu(s.imports,u=>{vu(u,e,t,i)&&(l||=[],l.push(u))}),l!==void 0&&I0(l,e)}if(!a){let l=Ds(r)||(()=>new r);e({provide:r,useFactory:l,deps:Ln},r),e({provide:mm,useValue:r,multi:!0},r),e({provide:Os,useValue:()=>Re(r),multi:!0},r)}let c=s.providers;if(c!=null&&!a){let l=n;vm(c,u=>{e(u,l)})}}else return!1;return r!==n&&n.providers!==void 0}function vm(n,e){for(let t of n)rm(t)&&(t=t.\u0275providers),Array.isArray(t)?vm(t,e):e(t)}var xC=pt({provide:String,useValue:pt});function A0(n){return n!==null&&typeof n=="object"&&xC in n}function MC(n){return!!(n&&n.useExisting)}function bC(n){return!!(n&&n.useFactory)}function yu(n){return typeof n=="function"}var rc=new Ie(""),mu={},v0={},Gp;function sc(){return Gp===void 0&&(Gp=new Za),Gp}var Xt=class{},Is=class extends Xt{parent;source;scopes;records=new Map;_ngOnDestroyHooks=new Set;_onDestroyHooks=[];get destroyed(){return this._destroyed}_destroyed=!1;injectorDefTypes;constructor(e,t,i,r){super(),this.parent=t,this.source=i,this.scopes=r,Yp(e,o=>this.processProvider(o)),this.records.set(pm,To(void 0,this)),r.has("environment")&&this.records.set(Xt,To(void 0,this));let s=this.records.get(rc);s!=null&&typeof s.value=="string"&&this.scopes.add(s.value),this.injectorDefTypes=new Set(this.get(mm,Ln,{self:!0}))}retrieve(e,t){let i=Ts(t)||0;try{return this.get(e,Cs,i)}catch(r){if(Co(r))return r;throw r}}destroy(){Xa(this),this._destroyed=!0;let e=Ve(null);try{for(let i of this._ngOnDestroyHooks)i.ngOnDestroy();let t=this._onDestroyHooks;this._onDestroyHooks=[];for(let i of t)i()}finally{this.records.clear(),this._ngOnDestroyHooks.clear(),this.injectorDefTypes.clear(),Ve(e)}}onDestroy(e){return Xa(this),this._onDestroyHooks.push(e),()=>this.removeOnDestroy(e)}runInContext(e){Xa(this);let t=Fi(this),i=zn(void 0),r;try{return e()}finally{Fi(t),zn(i)}}get(e,t=Cs,i){if(Xa(this),e.hasOwnProperty(g0))return e[g0](this);let r=Ts(i),s,o=Fi(this),a=zn(void 0);try{if(!(r&4)){let l=this.records.get(e);if(l===void 0){let u=TC(e)&&tc(e);u&&this.injectableDefInScope(u)?l=To(Xp(e),mu):l=null,this.records.set(e,l)}if(l!=null)return this.hydrate(e,l,r)}let c=r&2?sc():this.parent;return t=r&8&&t===Cs?null:t,c.get(e,t)}catch(c){let l=hC(c);throw l===-200||l===-201?new ge(l,null):c}finally{zn(a),Fi(o)}}resolveInjectorInitializers(){let e=Ve(null),t=Fi(this),i=zn(void 0),r;try{let s=this.get(Os,Ln,{self:!0});for(let o of s)o()}finally{Fi(t),zn(i),Ve(e)}}toString(){return"R3Injector[...]"}processProvider(e){e=On(e);let t=yu(e)?e:On(e&&e.provide),i=EC(e);if(!yu(e)&&e.multi===!0){let r=this.records.get(t);r||(r=To(void 0,mu,!0),r.factory=()=>qp(r.multi),this.records.set(t,r)),t=e,r.multi.push(e)}this.records.set(t,i)}hydrate(e,t,i){let r=Ve(null);try{if(t.value===v0)throw dm("");return t.value===mu&&(t.value=v0,t.value=t.factory(void 0,i)),typeof t.value=="object"&&t.value&&CC(t.value)&&this._ngOnDestroyHooks.add(t.value),t.value}finally{Ve(r)}}injectableDefInScope(e){if(!e.providedIn)return!1;let t=On(e.providedIn);return typeof t=="string"?t==="any"||this.scopes.has(t):this.injectorDefTypes.has(t)}removeOnDestroy(e){let t=this._onDestroyHooks.indexOf(e);t!==-1&&this._onDestroyHooks.splice(t,1)}};function Xp(n){let e=tc(n),t=e!==null?e.factory:Ds(n);if(t!==null)return t;if(n instanceof Ie)throw new ge(-204,!1);if(n instanceof Function)return SC(n);throw new ge(-204,!1)}function SC(n){if(n.length>0)throw new ge(-204,!1);let t=uC(n);return t!==null?()=>t.factory(n):()=>new n}function EC(n){if(A0(n))return To(void 0,n.useValue);{let e=R0(n);return To(e,mu)}}function R0(n,e,t){let i;if(yu(n)){let r=On(n);return Ds(r)||Xp(r)}else if(A0(n))i=()=>On(n.useValue);else if(bC(n))i=()=>n.useFactory(...qp(n.deps||[]));else if(MC(n))i=(r,s)=>Re(On(n.useExisting),s!==void 0&&s&8?8:void 0);else{let r=On(n&&(n.useClass||n.provide));if(wC(n))i=()=>new r(...qp(n.deps));else return Ds(r)||Xp(r)}return i}function Xa(n){if(n.destroyed)throw new ge(-205,!1)}function To(n,e,t=!1){return{factory:n,value:e,multi:t?[]:void 0}}function wC(n){return!!n.deps}function CC(n){return n!==null&&typeof n=="object"&&typeof n.ngOnDestroy=="function"}function TC(n){return typeof n=="function"||typeof n=="object"&&n.ngMetadataName==="InjectionToken"}function Yp(n,e){for(let t of n)Array.isArray(t)?Yp(t,e):t&&rm(t)?Yp(t.\u0275providers,e):e(t)}function vn(n,e){let t;n instanceof Is?(Xa(n),t=n):t=new $p(n);let i,r=Fi(t),s=zn(void 0);try{return e()}finally{Fi(r),zn(s)}}function N0(){return S0()!==void 0||pu()!=null}var vi=0,Le=1,Ue=2,nn=3,ii=4,ri=5,oc=6,Io=7,yn=8,Ur=9,ki=10,Lt=11,Ao=12,ym=13,Ls=14,si=15,Br=16,Fs=17,Ui=18,Vr=19,_m=20,ir=21,Au=22,Or=23,Gn=24,Ru=25,Ro=26,Tn=27,P0=1;var Hr=7,ac=8,ks=9,Dn=10;function or(n){return Array.isArray(n)&&typeof n[P0]=="object"}function yi(n){return Array.isArray(n)&&n[P0]===!0}function xm(n){return(n.flags&4)!==0}function ar(n){return n.componentOffset>-1}function No(n){return(n.flags&1)===1}function Us(n){return!!n.template}function Po(n){return(n[Ue]&512)!==0}function Bs(n){return(n[Ue]&256)===256}var Mm="svg",O0="math";function oi(n){for(;Array.isArray(n);)n=n[vi];return n}function bm(n,e){return oi(e[n])}function _i(n,e){return oi(e[n.index])}function Sm(n,e){return n.data[e]}function ai(n,e){let t=e[n];return or(t)?t:t[vi]}function L0(n){return(n[Ue]&4)===4}function Nu(n){return(n[Ue]&128)===128}function F0(n){return yi(n[nn])}function Vs(n,e){return e==null?null:n[e]}function Em(n){n[Fs]=0}function wm(n){n[Ue]&1024||(n[Ue]|=1024,Nu(n)&&Oo(n))}function k0(n,e){for(;n>0;)e=e[Ls],n--;return e}function cc(n){return!!(n[Ue]&9216||n[Gn]?.dirty)}function Pu(n){n[ki].changeDetectionScheduler?.notify(8),n[Ue]&64&&(n[Ue]|=1024),cc(n)&&Oo(n)}function Oo(n){n[ki].changeDetectionScheduler?.notify(0);let e=Lr(n);for(;e!==null&&!(e[Ue]&8192||(e[Ue]|=8192,!Nu(e)));)e=Lr(e)}function Cm(n,e){if(Bs(n))throw new ge(911,!1);n[ir]===null&&(n[ir]=[]),n[ir].push(e)}function U0(n,e){if(n[ir]===null)return;let t=n[ir].indexOf(e);t!==-1&&n[ir].splice(t,1)}function Lr(n){let e=n[nn];return yi(e)?e[nn]:e}function Tm(n){return n[Io]??=[]}function Dm(n){return n.cleanup??=[]}function B0(n,e,t,i){let r=Tm(e);r.push(t),n.firstCreatePass&&Dm(n).push(i,r.length-1)}var Ke={lFrame:K0(null),bindingsEnabled:!0,skipHydrationRootTNode:null};var Zp=!1;function V0(){return Ke.lFrame.elementDepthCount}function H0(){Ke.lFrame.elementDepthCount++}function Im(){Ke.lFrame.elementDepthCount--}function Ou(){return Ke.bindingsEnabled}function z0(){return Ke.skipHydrationRootTNode!==null}function Am(n){return Ke.skipHydrationRootTNode===n}function Rm(){Ke.skipHydrationRootTNode=null}function lt(){return Ke.lFrame.lView}function kn(){return Ke.lFrame.tView}function cr(n){return Ke.lFrame.contextLView=n,n[yn]}function lr(n){return Ke.lFrame.contextLView=null,n}function In(){let n=Nm();for(;n!==null&&n.type===64;)n=n.parent;return n}function Nm(){return Ke.lFrame.currentTNode}function G0(){let n=Ke.lFrame,e=n.currentTNode;return n.isParent?e:e.parent}function Lo(n,e){let t=Ke.lFrame;t.currentTNode=n,t.isParent=e}function Pm(){return Ke.lFrame.isParent}function j0(){Ke.lFrame.isParent=!1}function Om(){return Zp}function Ja(n){let e=Zp;return Zp=n,e}function W0(){return Ke.lFrame.bindingIndex}function $0(n){return Ke.lFrame.bindingIndex=n}function Lu(){return Ke.lFrame.bindingIndex++}function Fu(n){let e=Ke.lFrame,t=e.bindingIndex;return e.bindingIndex=e.bindingIndex+n,t}function q0(){return Ke.lFrame.inI18n}function X0(n,e){let t=Ke.lFrame;t.bindingIndex=t.bindingRootIndex=n,ku(e)}function Y0(){return Ke.lFrame.currentDirectiveIndex}function ku(n){Ke.lFrame.currentDirectiveIndex=n}function Z0(n){let e=Ke.lFrame.currentDirectiveIndex;return e===-1?null:n[e]}function Lm(){return Ke.lFrame.currentQueryIndex}function Uu(n){Ke.lFrame.currentQueryIndex=n}function DC(n){let e=n[Le];return e.type===2?e.declTNode:e.type===1?n[ri]:null}function Fm(n,e,t){if(t&4){let r=e,s=n;for(;r=r.parent,r===null&&!(t&1);)if(r=DC(s),r===null||(s=s[Ls],r.type&10))break;if(r===null)return!1;e=r,n=s}let i=Ke.lFrame=J0();return i.currentTNode=e,i.lView=n,!0}function Bu(n){let e=J0(),t=n[Le];Ke.lFrame=e,e.currentTNode=t.firstChild,e.lView=n,e.tView=t,e.contextLView=n,e.bindingIndex=t.bindingStartIndex,e.inI18n=!1}function J0(){let n=Ke.lFrame,e=n===null?null:n.child;return e===null?K0(n):e}function K0(n){let e={currentTNode:null,isParent:!0,lView:null,tView:null,selectedIndex:-1,contextLView:null,elementDepthCount:0,currentNamespace:null,currentDirectiveIndex:-1,bindingRootIndex:-1,bindingIndex:-1,currentQueryIndex:0,parent:n,child:null,inI18n:!1};return n!==null&&(n.child=e),e}function Q0(){let n=Ke.lFrame;return Ke.lFrame=n.parent,n.currentTNode=null,n.lView=null,n}var km=Q0;function Vu(){let n=Q0();n.isParent=!0,n.tView=null,n.selectedIndex=-1,n.contextLView=null,n.elementDepthCount=0,n.currentDirectiveIndex=-1,n.currentNamespace=null,n.bindingRootIndex=-1,n.bindingIndex=-1,n.currentQueryIndex=0}function ex(n){return(Ke.lFrame.contextLView=k0(n,Ke.lFrame.contextLView))[yn]}function ur(){return Ke.lFrame.selectedIndex}function zr(n){Ke.lFrame.selectedIndex=n}function Um(){let n=Ke.lFrame;return Sm(n.tView,n.selectedIndex)}function lc(){Ke.lFrame.currentNamespace=Mm}function tx(){return Ke.lFrame.currentNamespace}var nx=!0;function Hu(){return nx}function uc(n){nx=n}function Jp(n,e=null,t=null,i){let r=Bm(n,e,t,i);return r.resolveInjectorInitializers(),r}function Bm(n,e=null,t=null,i,r=new Set){let s=[t||Ln,D0(n)],o;return new Is(s,e||sc(),o||null,r)}var Fn=class n{static THROW_IF_NOT_FOUND=Cs;static NULL=new Za;static create(e,t){if(Array.isArray(e))return Jp({name:""},t,e,"");{let i=e.name??"";return Jp({name:i},e.parent,e.providers,i)}}static \u0275prov=Ce({token:n,providedIn:"any",factory:()=>Re(pm)});static __NG_ELEMENT_ID__=-1},Yt=new Ie(""),dr=(()=>{class n{static __NG_ELEMENT_ID__=IC;static __NG_ENV_ID__=t=>t}return n})(),_u=class extends dr{_lView;constructor(e){super(),this._lView=e}get destroyed(){return Bs(this._lView)}onDestroy(e){let t=this._lView;return Cm(t,e),()=>U0(t,e)}};function IC(){return new _u(lt())}var ix=!1,rx=new Ie(""),Gr=(()=>{class n{taskId=0;pendingTasks=new Set;destroyed=!1;pendingTask=new un(!1);debugTaskTracker=Q(rx,{optional:!0});get hasPendingTasks(){return this.destroyed?!1:this.pendingTask.value}get hasPendingTasksObservable(){return this.destroyed?new Qe(t=>{t.next(!1),t.complete()}):this.pendingTask}add(){!this.hasPendingTasks&&!this.destroyed&&this.pendingTask.next(!0);let t=this.taskId++;return this.pendingTasks.add(t),this.debugTaskTracker?.add(t),t}has(t){return this.pendingTasks.has(t)}remove(t){this.pendingTasks.delete(t),this.debugTaskTracker?.remove(t),this.pendingTasks.size===0&&this.hasPendingTasks&&this.pendingTask.next(!1)}ngOnDestroy(){this.pendingTasks.clear(),this.hasPendingTasks&&this.pendingTask.next(!1),this.destroyed=!0,this.pendingTask.unsubscribe()}static \u0275prov=Ce({token:n,providedIn:"root",factory:()=>new n})}return n})(),Kp=class extends Ht{__isAsync;destroyRef=void 0;pendingTasks=void 0;constructor(e=!1){super(),this.__isAsync=e,N0()&&(this.destroyRef=Q(dr,{optional:!0})??void 0,this.pendingTasks=Q(Gr,{optional:!0})??void 0)}emit(e){let t=Ve(null);try{super.next(e)}finally{Ve(t)}}subscribe(e,t,i){let r=e,s=t||(()=>null),o=i;if(e&&typeof e=="object"){let c=e;r=c.next?.bind(c),s=c.error?.bind(c),o=c.complete?.bind(c)}this.__isAsync&&(s=this.wrapInTimeout(s),r&&(r=this.wrapInTimeout(r)),o&&(o=this.wrapInTimeout(o)));let a=super.subscribe({next:r,error:s,complete:o});return e instanceof ln&&e.add(a),a}wrapInTimeout(e){return t=>{let i=this.pendingTasks?.add();setTimeout(()=>{try{e(t)}finally{i!==void 0&&this.pendingTasks?.remove(i)}})}}},Pt=Kp;function xu(...n){}function Vm(n){let e,t;function i(){n=xu;try{t!==void 0&&typeof cancelAnimationFrame=="function"&&cancelAnimationFrame(t),e!==void 0&&clearTimeout(e)}catch{}}return e=setTimeout(()=>{n(),i()}),typeof requestAnimationFrame=="function"&&(t=requestAnimationFrame(()=>{n(),i()})),()=>i()}function sx(n){return queueMicrotask(()=>n()),()=>{n=xu}}var Hm="isAngularZone",Ka=Hm+"_ID",AC=0,Ot=class n{hasPendingMacrotasks=!1;hasPendingMicrotasks=!1;isStable=!0;onUnstable=new Pt(!1);onMicrotaskEmpty=new Pt(!1);onStable=new Pt(!1);onError=new Pt(!1);constructor(e){let{enableLongStackTrace:t=!1,shouldCoalesceEventChangeDetection:i=!1,shouldCoalesceRunChangeDetection:r=!1,scheduleInRootZone:s=ix}=e;if(typeof Zone>"u")throw new ge(908,!1);Zone.assertZonePatched();let o=this;o._nesting=0,o._outer=o._inner=Zone.current,Zone.TaskTrackingZoneSpec&&(o._inner=o._inner.fork(new Zone.TaskTrackingZoneSpec)),t&&Zone.longStackTraceZoneSpec&&(o._inner=o._inner.fork(Zone.longStackTraceZoneSpec)),o.shouldCoalesceEventChangeDetection=!r&&i,o.shouldCoalesceRunChangeDetection=r,o.callbackScheduled=!1,o.scheduleInRootZone=s,PC(o)}static isInAngularZone(){return typeof Zone<"u"&&Zone.current.get(Hm)===!0}static assertInAngularZone(){if(!n.isInAngularZone())throw new ge(909,!1)}static assertNotInAngularZone(){if(n.isInAngularZone())throw new ge(909,!1)}run(e,t,i){return this._inner.run(e,t,i)}runTask(e,t,i,r){let s=this._inner,o=s.scheduleEventTask("NgZoneEvent: "+r,e,RC,xu,xu);try{return s.runTask(o,t,i)}finally{s.cancelTask(o)}}runGuarded(e,t,i){return this._inner.runGuarded(e,t,i)}runOutsideAngular(e){return this._outer.run(e)}},RC={};function zm(n){if(n._nesting==0&&!n.hasPendingMicrotasks&&!n.isStable)try{n._nesting++,n.onMicrotaskEmpty.emit(null)}finally{if(n._nesting--,!n.hasPendingMicrotasks)try{n.runOutsideAngular(()=>n.onStable.emit(null))}finally{n.isStable=!0}}}function NC(n){if(n.isCheckStableRunning||n.callbackScheduled)return;n.callbackScheduled=!0;function e(){Vm(()=>{n.callbackScheduled=!1,Qp(n),n.isCheckStableRunning=!0,zm(n),n.isCheckStableRunning=!1})}n.scheduleInRootZone?Zone.root.run(()=>{e()}):n._outer.run(()=>{e()}),Qp(n)}function PC(n){let e=()=>{NC(n)},t=AC++;n._inner=n._inner.fork({name:"angular",properties:{[Hm]:!0,[Ka]:t,[Ka+t]:!0},onInvokeTask:(i,r,s,o,a,c)=>{if(OC(c))return i.invokeTask(s,o,a,c);try{return y0(n),i.invokeTask(s,o,a,c)}finally{(n.shouldCoalesceEventChangeDetection&&o.type==="eventTask"||n.shouldCoalesceRunChangeDetection)&&e(),_0(n)}},onInvoke:(i,r,s,o,a,c,l)=>{try{return y0(n),i.invoke(s,o,a,c,l)}finally{n.shouldCoalesceRunChangeDetection&&!n.callbackScheduled&&!LC(c)&&e(),_0(n)}},onHasTask:(i,r,s,o)=>{i.hasTask(s,o),r===s&&(o.change=="microTask"?(n._hasPendingMicrotasks=o.microTask,Qp(n),zm(n)):o.change=="macroTask"&&(n.hasPendingMacrotasks=o.macroTask))},onHandleError:(i,r,s,o)=>(i.handleError(s,o),n.runOutsideAngular(()=>n.onError.emit(o)),!1)})}function Qp(n){n._hasPendingMicrotasks||(n.shouldCoalesceEventChangeDetection||n.shouldCoalesceRunChangeDetection)&&n.callbackScheduled===!0?n.hasPendingMicrotasks=!0:n.hasPendingMicrotasks=!1}function y0(n){n._nesting++,n.isStable&&(n.isStable=!1,n.onUnstable.emit(null))}function _0(n){n._nesting--,zm(n)}var Qa=class{hasPendingMicrotasks=!1;hasPendingMacrotasks=!1;isStable=!0;onUnstable=new Pt;onMicrotaskEmpty=new Pt;onStable=new Pt;onError=new Pt;run(e,t,i){return e.apply(t,i)}runGuarded(e,t,i){return e.apply(t,i)}runOutsideAngular(e){return e()}runTask(e,t,i,r){return e.apply(t,i)}};function OC(n){return ox(n,"__ignore_ng_zone__")}function LC(n){return ox(n,"__scheduler_tick__")}function ox(n,e){return!Array.isArray(n)||n.length!==1?!1:n[0]?.data?.[e]===!0}var rr=class{_console=console;handleError(e){this._console.error("ERROR",e)}},xi=new Ie("",{factory:()=>{let n=Q(Ot),e=Q(Xt),t;return i=>{n.runOutsideAngular(()=>{e.destroyed&&!t?setTimeout(()=>{throw i}):(t??=e.get(rr),t.handleError(i))})}}}),ax={provide:Os,useValue:()=>{let n=Q(rr,{optional:!0})},multi:!0},FC=new Ie("",{factory:()=>{let n=Q(Yt).defaultView;if(!n)return;let e=Q(xi),t=s=>{e(s.reason),s.preventDefault()},i=s=>{s.error?e(s.error):e(new Error(s.message,{cause:s})),s.preventDefault()},r=()=>{n.addEventListener("unhandledrejection",t),n.addEventListener("error",i)};typeof Zone<"u"?Zone.root.run(r):r(),Q(dr).onDestroy(()=>{n.removeEventListener("error",i),n.removeEventListener("unhandledrejection",t)})}});function Gm(){return sr([T0(()=>{Q(FC)})])}function zt(n,e){let[t,i,r]=Cp(n,e?.equal),s=t,o=s[En];return s.set=i,s.update=r,s.asReadonly=cx.bind(s),s}function cx(){let n=this[En];if(n.readonlyFn===void 0){let e=()=>this();e[En]=n,n.readonlyFn=e}return n.readonlyFn}var zu=(()=>{class n{view;node;constructor(t,i){this.view=t,this.node=i}static __NG_ELEMENT_ID__=kC}return n})();function kC(){return new zu(lt(),In())}var As=class{},dc=new Ie("",{factory:()=>!0});var jm=new Ie("");var Gu=(()=>{class n{static \u0275prov=Ce({token:n,providedIn:"root",factory:()=>new em})}return n})(),em=class{dirtyEffectCount=0;queues=new Map;add(e){this.enqueue(e),this.schedule(e)}schedule(e){e.dirty&&this.dirtyEffectCount++}remove(e){let t=e.zone,i=this.queues.get(t);i.has(e)&&(i.delete(e),e.dirty&&this.dirtyEffectCount--)}enqueue(e){let t=e.zone;this.queues.has(t)||this.queues.set(t,new Set);let i=this.queues.get(t);i.has(e)||i.add(e)}flush(){for(;this.dirtyEffectCount>0;){let e=!1;for(let[t,i]of this.queues)t===null?e||=this.flushQueue(i):e||=t.run(()=>this.flushQueue(i));e||(this.dirtyEffectCount=0)}}flushQueue(e){let t=!1;for(let i of e)i.dirty&&(this.dirtyEffectCount--,t=!0,i.run());return t}},Mu=class{[En];constructor(e){this[En]=e}destroy(){this[En].destroy()}};function ju(n,e){let t=e?.injector??Q(Fn),i=e?.manualCleanup!==!0?t.get(dr):null,r,s=t.get(zu,null,{optional:!0}),o=t.get(As);return s!==null?(r=VC(s.view,o,n),i instanceof _u&&i._lView===s.view&&(i=null)):r=HC(n,t.get(Gu),o),r.injector=t,i!==null&&(r.onDestroyFns=[i.onDestroy(()=>r.destroy())]),new Mu(r)}var lx=et(ae({},Dp),{cleanupFns:void 0,zone:null,onDestroyFns:null,run(){let n=Ja(!1);try{Ip(this)}finally{Ja(n)}},cleanup(){if(!this.cleanupFns?.length)return;let n=Ve(null);try{for(;this.cleanupFns.length;)this.cleanupFns.pop()()}finally{this.cleanupFns=[],Ve(n)}}}),UC=et(ae({},lx),{consumerMarkedDirty(){this.scheduler.schedule(this),this.notifier.notify(12)},destroy(){if(xs(this),this.onDestroyFns!==null)for(let n of this.onDestroyFns)n();this.cleanup(),this.scheduler.remove(this)}}),BC=et(ae({},lx),{consumerMarkedDirty(){this.view[Ue]|=8192,Oo(this.view),this.notifier.notify(13)},destroy(){if(xs(this),this.onDestroyFns!==null)for(let n of this.onDestroyFns)n();this.cleanup(),this.view[Or]?.delete(this)}});function VC(n,e,t){let i=Object.create(BC);return i.view=n,i.zone=typeof Zone<"u"?Zone.current:null,i.notifier=e,i.fn=ux(i,t),n[Or]??=new Set,n[Or].add(i),i.consumerMarkedDirty(i),i}function HC(n,e,t){let i=Object.create(UC);return i.fn=ux(i,n),i.scheduler=e,i.notifier=t,i.zone=typeof Zone<"u"?Zone.current:null,i.scheduler.add(i),i.notifier.notify(12),i}function ux(n,e){return()=>{e(t=>(n.cleanupFns??=[]).push(t))}}function _c(n){return{toString:n}.toString()}function ZC(n){return typeof n=="function"}function Bx(n,e,t,i){e!==null?e.applyValueToInputSignal(e,i):n[t]=i}var Ju=class{previousValue;currentValue;firstChange;constructor(e,t,i){this.previousValue=e,this.currentValue=t,this.firstChange=i}isFirstChange(){return this.firstChange}},ud=(()=>{let n=()=>Vx;return n.ngInherit=!0,n})();function Vx(n){return n.type.prototype.ngOnChanges&&(n.setInput=KC),JC}function JC(){let n=zx(this),e=n?.current;if(e){let t=n.previous;if(t===Ps)n.previous=e;else for(let i in e)t[i]=e[i];n.current=null,this.ngOnChanges(e)}}function KC(n,e,t,i,r){let s=this.declaredInputs[i],o=zx(n)||QC(n,{previous:Ps,current:null}),a=o.current||(o.current={}),c=o.previous,l=c[s];a[s]=new Ju(l&&l.currentValue,t,c===Ps),Bx(n,e,r,t)}var Hx="__ngSimpleChanges__";function zx(n){return n[Hx]||null}function QC(n,e){return n[Hx]=e}var dx=[];var St=function(n,e=null,t){for(let i=0;i<dx.length;i++){let r=dx[i];r(n,e,t)}},ut=(function(n){return n[n.TemplateCreateStart=0]="TemplateCreateStart",n[n.TemplateCreateEnd=1]="TemplateCreateEnd",n[n.TemplateUpdateStart=2]="TemplateUpdateStart",n[n.TemplateUpdateEnd=3]="TemplateUpdateEnd",n[n.LifecycleHookStart=4]="LifecycleHookStart",n[n.LifecycleHookEnd=5]="LifecycleHookEnd",n[n.OutputStart=6]="OutputStart",n[n.OutputEnd=7]="OutputEnd",n[n.BootstrapApplicationStart=8]="BootstrapApplicationStart",n[n.BootstrapApplicationEnd=9]="BootstrapApplicationEnd",n[n.BootstrapComponentStart=10]="BootstrapComponentStart",n[n.BootstrapComponentEnd=11]="BootstrapComponentEnd",n[n.ChangeDetectionStart=12]="ChangeDetectionStart",n[n.ChangeDetectionEnd=13]="ChangeDetectionEnd",n[n.ChangeDetectionSyncStart=14]="ChangeDetectionSyncStart",n[n.ChangeDetectionSyncEnd=15]="ChangeDetectionSyncEnd",n[n.AfterRenderHooksStart=16]="AfterRenderHooksStart",n[n.AfterRenderHooksEnd=17]="AfterRenderHooksEnd",n[n.ComponentStart=18]="ComponentStart",n[n.ComponentEnd=19]="ComponentEnd",n[n.DeferBlockStateStart=20]="DeferBlockStateStart",n[n.DeferBlockStateEnd=21]="DeferBlockStateEnd",n[n.DynamicComponentStart=22]="DynamicComponentStart",n[n.DynamicComponentEnd=23]="DynamicComponentEnd",n[n.HostBindingsUpdateStart=24]="HostBindingsUpdateStart",n[n.HostBindingsUpdateEnd=25]="HostBindingsUpdateEnd",n})(ut||{});function eT(n,e,t){let{ngOnChanges:i,ngOnInit:r,ngDoCheck:s}=e.type.prototype;if(i){let o=Vx(e);(t.preOrderHooks??=[]).push(n,o),(t.preOrderCheckHooks??=[]).push(n,o)}r&&(t.preOrderHooks??=[]).push(0-n,r),s&&((t.preOrderHooks??=[]).push(n,s),(t.preOrderCheckHooks??=[]).push(n,s))}function Gx(n,e){for(let t=e.directiveStart,i=e.directiveEnd;t<i;t++){let s=n.data[t].type.prototype,{ngAfterContentInit:o,ngAfterContentChecked:a,ngAfterViewInit:c,ngAfterViewChecked:l,ngOnDestroy:u}=s;o&&(n.contentHooks??=[]).push(-t,o),a&&((n.contentHooks??=[]).push(t,a),(n.contentCheckHooks??=[]).push(t,a)),c&&(n.viewHooks??=[]).push(-t,c),l&&((n.viewHooks??=[]).push(t,l),(n.viewCheckHooks??=[]).push(t,l)),u!=null&&(n.destroyHooks??=[]).push(t,u)}}function $u(n,e,t){jx(n,e,3,t)}function qu(n,e,t,i){(n[Ue]&3)===t&&jx(n,e,t,i)}function Wm(n,e){let t=n[Ue];(t&3)===e&&(t&=16383,t+=1,n[Ue]=t)}function jx(n,e,t,i){let r=i!==void 0?n[Fs]&65535:0,s=i??-1,o=e.length-1,a=0;for(let c=r;c<o;c++)if(typeof e[c+1]=="number"){if(a=e[c],i!=null&&a>=i)break}else e[c]<0&&(n[Fs]+=65536),(a<s||s==-1)&&(tT(n,t,e,c),n[Fs]=(n[Fs]&4294901760)+c+2),c++}function fx(n,e){St(ut.LifecycleHookStart,n,e);let t=Ve(null);try{e.call(n)}finally{Ve(t),St(ut.LifecycleHookEnd,n,e)}}function tT(n,e,t,i){let r=t[i]<0,s=t[i+1],o=r?-t[i]:t[i],a=n[o];r?n[Ue]>>14<n[Fs]>>16&&(n[Ue]&3)===e&&(n[Ue]+=16384,fx(a,s)):fx(a,s)}var ko=-1,mc=class{factory;name;injectImpl;resolving=!1;canSeeViewProviders;multi;componentProviders;index;providerFactory;constructor(e,t,i,r){this.factory=e,this.name=r,this.canSeeViewProviders=t,this.injectImpl=i}};function nT(n){return(n.flags&8)!==0}function iT(n){return(n.flags&16)!==0}function rT(n,e,t){let i=0;for(;i<t.length;){let r=t[i];if(typeof r=="number"){if(r!==0)break;i++;let s=t[i++],o=t[i++],a=t[i++];n.setAttribute(e,o,a,s)}else{let s=r,o=t[++i];oT(s)?n.setProperty(e,s,o):n.setAttribute(e,s,o),i++}}return i}function sT(n){return n===3||n===4||n===6}function oT(n){return n.charCodeAt(0)===64}function dd(n,e){if(!(e===null||e.length===0))if(n===null||n.length===0)n=e.slice();else{let t=-1;for(let i=0;i<e.length;i++){let r=e[i];typeof r=="number"?t=r:t===0||(t===-1||t===2?hx(n,t,r,null,e[++i]):hx(n,t,r,null,null))}}return n}function hx(n,e,t,i,r){let s=0,o=n.length;if(e===-1)o=-1;else for(;s<n.length;){let a=n[s++];if(typeof a=="number"){if(a===e){o=-1;break}else if(a>e){o=s-1;break}}}for(;s<n.length;){let a=n[s];if(typeof a=="number")break;if(a===t){r!==null&&(n[s+1]=r);return}s++,r!==null&&s++}o!==-1&&(n.splice(o,0,e),s=o+1),n.splice(s++,0,t),r!==null&&n.splice(s++,0,r)}function Wx(n){return n!==ko}function Ku(n){return n&32767}function aT(n){return n>>16}function Qu(n,e){let t=aT(n),i=e;for(;t>0;)i=i[Ls],t--;return i}var Jm=!0;function px(n){let e=Jm;return Jm=n,e}var cT=256,$x=cT-1,qx=5,lT=0,Bi={};function uT(n,e,t){let i;typeof t=="string"?i=t.charCodeAt(0)||0:t.hasOwnProperty(Ns)&&(i=t[Ns]),i==null&&(i=t[Ns]=lT++);let r=i&$x,s=1<<r;e.data[n+(r>>qx)]|=s}function Xx(n,e){let t=Yx(n,e);if(t!==-1)return t;let i=e[Le];i.firstCreatePass&&(n.injectorIndex=e.length,$m(i.data,n),$m(e,null),$m(i.blueprint,null));let r=xg(n,e),s=n.injectorIndex;if(Wx(r)){let o=Ku(r),a=Qu(r,e),c=a[Le].data;for(let l=0;l<8;l++)e[s+l]=a[o+l]|c[o+l]}return e[s+8]=r,s}function $m(n,e){n.push(0,0,0,0,0,0,0,0,e)}function Yx(n,e){return n.injectorIndex===-1||n.parent&&n.parent.injectorIndex===n.injectorIndex||e[n.injectorIndex+8]===null?-1:n.injectorIndex}function xg(n,e){if(n.parent&&n.parent.injectorIndex!==-1)return n.parent.injectorIndex;let t=0,i=null,r=e;for(;r!==null;){if(i=eM(r),i===null)return ko;if(t++,r=r[Ls],i.injectorIndex!==-1)return i.injectorIndex|t<<16}return ko}function dT(n,e,t){uT(n,e,t)}function Zx(n,e,t){if(t&8||n!==void 0)return n;Cu(e,"NodeInjector")}function Jx(n,e,t,i){if(t&8&&i===void 0&&(i=null),(t&3)===0){let r=n[Ur],s=zn(void 0);try{return r?r.get(e,i,t&8):fm(e,i,t&8)}finally{zn(s)}}return Zx(i,e,t)}function Kx(n,e,t,i=0,r){if(n!==null){if(e[Ue]&2048&&!(i&2)){let o=mT(n,e,t,i,Bi);if(o!==Bi)return o}let s=Qx(n,e,t,i,Bi);if(s!==Bi)return s}return Jx(e,t,i,r)}function Qx(n,e,t,i,r){let s=hT(t);if(typeof s=="function"){if(!Fm(e,n,i))return i&1?Zx(r,t,i):Jx(e,t,i,r);try{let o;if(o=s(i),o==null&&!(i&8))Cu(t);else return o}finally{km()}}else if(typeof s=="number"){let o=null,a=Yx(n,e),c=ko,l=i&1?e[si][ri]:null;for((a===-1||i&4)&&(c=a===-1?xg(n,e):e[a+8],c===ko||!gx(i,!1)?a=-1:(o=e[Le],a=Ku(c),e=Qu(c,e)));a!==-1;){let u=e[Le];if(mx(s,a,u.data)){let d=fT(a,e,t,o,i,l);if(d!==Bi)return d}c=e[a+8],c!==ko&&gx(i,e[Le].data[a+8]===l)&&mx(s,a,e)?(o=u,a=Ku(c),e=Qu(c,e)):a=-1}}return r}function fT(n,e,t,i,r,s){let o=e[Le],a=o.data[n+8],c=i==null?ar(a)&&Jm:i!=o&&(a.type&3)!==0,l=r&1&&s===a,u=Xu(a,o,t,c,l);return u!==null?ed(e,o,u,a,r):Bi}function Xu(n,e,t,i,r){let s=n.providerIndexes,o=e.data,a=s&1048575,c=n.directiveStart,l=n.directiveEnd,u=s>>20,d=i?a:a+u,f=r?a+u:l;for(let h=d;h<f;h++){let g=o[h];if(h<c&&t===g||h>=c&&g.type===t)return h}if(r){let h=o[c];if(h&&Us(h)&&h.type===t)return c}return null}function ed(n,e,t,i,r){let s=n[t],o=e.data;if(s instanceof mc){let a=s;if(a.resolving)throw dm("");let c=px(a.canSeeViewProviders);a.resolving=!0;let l=o[t].type||o[t],u,d=a.injectImpl?zn(a.injectImpl):null,f=Fm(n,i,0);try{s=n[t]=a.factory(void 0,r,o,n,i),e.firstCreatePass&&t>=i.directiveStart&&eT(t,o[t],e)}finally{d!==null&&zn(d),px(c),a.resolving=!1,km()}}return s}function hT(n){if(typeof n=="string")return n.charCodeAt(0)||0;let e=n.hasOwnProperty(Ns)?n[Ns]:void 0;return typeof e=="number"?e>=0?e&$x:pT:e}function mx(n,e,t){let i=1<<n;return!!(t[e+(n>>qx)]&i)}function gx(n,e){return!(n&2)&&!(n&1&&e)}var Hs=class{_tNode;_lView;constructor(e,t){this._tNode=e,this._lView=t}get(e,t,i){return Kx(this._tNode,this._lView,e,Ts(i),t)}};function pT(){return new Hs(In(),lt())}function xc(n){return _c(()=>{let e=n.prototype.constructor,t=e[Ya]||Km(e),i=Object.prototype,r=Object.getPrototypeOf(n.prototype).constructor;for(;r&&r!==i;){let s=r[Ya]||Km(r);if(s&&s!==t)return s;r=Object.getPrototypeOf(r)}return s=>new s})}function Km(n){return nm(n)?()=>{let e=Km(On(n));return e&&e()}:Ds(n)}function mT(n,e,t,i,r){let s=n,o=e;for(;s!==null&&o!==null&&o[Ue]&2048&&!Po(o);){let a=Qx(s,o,t,i|2,Bi);if(a!==Bi)return a;let c=s.parent;if(!c){let l=o[_m];if(l){let u=l.get(t,Bi,i&-5);if(u!==Bi)return u}c=eM(o),o=o[Ls]}s=c}return r}function eM(n){let e=n[Le],t=e.type;return t===2?e.declTNode:t===1?n[ri]:null}function gT(){return zo(In(),lt())}function zo(n,e){return new $s(_i(n,e))}var $s=(()=>{class n{nativeElement;constructor(t){this.nativeElement=t}static __NG_ELEMENT_ID__=gT}return n})();function vT(n){return n instanceof $s?n.nativeElement:n}function yT(){return this._results[Symbol.iterator]()}var td=class{_emitDistinctChangesOnly;dirty=!0;_onDirty=void 0;_results=[];_changesDetected=!1;_changes=void 0;length=0;first=void 0;last=void 0;get changes(){return this._changes??=new Ht}constructor(e=!1){this._emitDistinctChangesOnly=e}get(e){return this._results[e]}map(e){return this._results.map(e)}filter(e){return this._results.filter(e)}find(e){return this._results.find(e)}reduce(e,t){return this._results.reduce(e,t)}forEach(e){this._results.forEach(e)}some(e){return this._results.some(e)}toArray(){return this._results.slice()}toString(){return this._results.toString()}reset(e,t){this.dirty=!1;let i=w0(e);(this._changesDetected=!E0(this._results,i,t))&&(this._results=i,this.length=i.length,this.last=i[this.length-1],this.first=i[0])}notifyOnChanges(){this._changes!==void 0&&(this._changesDetected||!this._emitDistinctChangesOnly)&&this._changes.next(this)}onDirty(e){this._onDirty=e}setDirty(){this.dirty=!0,this._onDirty?.()}destroy(){this._changes!==void 0&&(this._changes.complete(),this._changes.unsubscribe())}[Symbol.iterator]=yT};function tM(n){return(n.flags&128)===128}var Mg=(function(n){return n[n.OnPush=0]="OnPush",n[n.Eager=1]="Eager",n[n.Default=1]="Default",n})(Mg||{}),nM=new Map,_T=0;function xT(){return _T++}function MT(n){nM.set(n[Vr],n)}function Qm(n){nM.delete(n[Vr])}var vx="__ngContext__";function Uo(n,e){or(e)?(n[vx]=e[Vr],MT(e)):n[vx]=e}function iM(n){return sM(n[Ao])}function rM(n){return sM(n[ii])}function sM(n){for(;n!==null&&!yi(n);)n=n[ii];return n}var bT;function bg(n){bT=n}var fd=new Ie("",{factory:()=>ST}),ST="ng";var hd=new Ie(""),Mc=new Ie("",{providedIn:"platform",factory:()=>"unknown"});var pd=new Ie("",{factory:()=>Q(Yt).body?.querySelector("[ngCspNonce]")?.getAttribute("ngCspNonce")||null});var oM=!1,aM=new Ie("",{factory:()=>oM});var ET=(n,e,t,i)=>{};function wT(n,e,t,i){ET(n,e,t,i)}function Sg(n){return(n.flags&32)===32}var CT=()=>null;function cM(n,e,t=!1){return CT(n,e,t)}function lM(n,e){let t=n.contentQueries;if(t!==null){let i=Ve(null);try{for(let r=0;r<t.length;r+=2){let s=t[r],o=t[r+1];if(o!==-1){let a=n.data[o];Uu(s),a.contentQueries(2,e[o],o)}}}finally{Ve(i)}}}function eg(n,e,t){Uu(0);let i=Ve(null);try{e(n,t)}finally{Ve(i)}}function Eg(n,e,t){if(xm(e)){let i=Ve(null);try{let r=e.directiveStart,s=e.directiveEnd;for(let o=r;o<s;o++){let a=n.data[o];if(a.contentQueries){let c=t[o];a.contentQueries(1,c,o)}}}finally{Ve(i)}}}var Si=(function(n){return n[n.Emulated=0]="Emulated",n[n.None=2]="None",n[n.ShadowDom=3]="ShadowDom",n[n.ExperimentalIsolatedShadowDom=4]="ExperimentalIsolatedShadowDom",n})(Si||{});var tg=class{changingThisBreaksApplicationSecurity;constructor(e){this.changingThisBreaksApplicationSecurity=e}toString(){return`SafeValue must use [property]=binding: ${this.changingThisBreaksApplicationSecurity} (see ${tm})`}};function wg(n){return n instanceof tg?n.changingThisBreaksApplicationSecurity:n}var TT=/^>|^->|<!--|-->|--!>|<!-$/g,DT=/(<|>)/g,IT="\u200B$1\u200B";function AT(n){return n.replace(TT,e=>e.replace(DT,IT))}function RT(n,e){return n.createText(e)}function NT(n,e,t){n.setValue(e,t)}function PT(n,e){return n.createComment(AT(e))}function uM(n,e,t){return n.createElement(e,t)}function nd(n,e,t,i,r){n.insertBefore(e,t,i,r)}function dM(n,e,t){n.appendChild(e,t)}function yx(n,e,t,i,r){i!==null?nd(n,e,t,i,r):dM(n,e,t)}function OT(n,e,t,i){n.removeChild(null,e,t,i)}function LT(n,e,t){n.setAttribute(e,"style",t)}function FT(n,e,t){t===""?n.removeAttribute(e,"class"):n.setAttribute(e,"class",t)}function fM(n,e,t){let{mergedAttrs:i,classes:r,styles:s}=t;i!==null&&rT(n,e,i),r!==null&&FT(n,e,r),s!==null&&LT(n,e,s)}function hM(n){return n instanceof Function?n():n}function kT(n,e,t){let i=n.length;for(;;){let r=n.indexOf(e,t);if(r===-1)return r;if(r===0||n.charCodeAt(r-1)<=32){let s=e.length;if(r+s===i||n.charCodeAt(r+s)<=32)return r}t=r+1}}var pM="ng-template";function UT(n,e,t,i){let r=0;if(i){for(;r<e.length&&typeof e[r]=="string";r+=2)if(e[r]==="class"&&kT(e[r+1].toLowerCase(),t,0)!==-1)return!0}else if(Cg(n))return!1;if(r=e.indexOf(1,r),r>-1){let s;for(;++r<e.length&&typeof(s=e[r])=="string";)if(s.toLowerCase()===t)return!0}return!1}function Cg(n){return n.type===4&&n.value!==pM}function BT(n,e,t){let i=n.type===4&&!t?pM:n.value;return e===i}function VT(n,e,t){let i=4,r=n.attrs,s=r!==null?GT(r):0,o=!1;for(let a=0;a<e.length;a++){let c=e[a];if(typeof c=="number"){if(!o&&!Mi(i)&&!Mi(c))return!1;if(o&&Mi(c))continue;o=!1,i=c|i&1;continue}if(!o)if(i&4){if(i=2|i&1,c!==""&&!BT(n,c,t)||c===""&&e.length===1){if(Mi(i))return!1;o=!0}}else if(i&8){if(r===null||!UT(n,r,c,t)){if(Mi(i))return!1;o=!0}}else{let l=e[++a],u=HT(c,r,Cg(n),t);if(u===-1){if(Mi(i))return!1;o=!0;continue}if(l!==""){let d;if(u>s?d="":d=r[u+1].toLowerCase(),i&2&&l!==d){if(Mi(i))return!1;o=!0}}}}return Mi(i)||o}function Mi(n){return(n&1)===0}function HT(n,e,t,i){if(e===null)return-1;let r=0;if(i||!t){let s=!1;for(;r<e.length;){let o=e[r];if(o===n)return r;if(o===3||o===6)s=!0;else if(o===1||o===2){let a=e[++r];for(;typeof a=="string";)a=e[++r];continue}else{if(o===4)break;if(o===0){r+=4;continue}}r+=s?1:2}return-1}else return jT(e,n)}function zT(n,e,t=!1){for(let i=0;i<e.length;i++)if(VT(n,e[i],t))return!0;return!1}function GT(n){for(let e=0;e<n.length;e++){let t=n[e];if(sT(t))return e}return n.length}function jT(n,e){let t=n.indexOf(4);if(t>-1)for(t++;t<n.length;){let i=n[t];if(typeof i=="number")return-1;if(i===e)return t;t++}return-1}function _x(n,e){return n?":not("+e.trim()+")":e}function WT(n){let e=n[0],t=1,i=2,r="",s=!1;for(;t<n.length;){let o=n[t];if(typeof o=="string")if(i&2){let a=n[++t];r+="["+o+(a.length>0?'="'+a+'"':"")+"]"}else i&8?r+="."+o:i&4&&(r+=" "+o);else r!==""&&!Mi(o)&&(e+=_x(s,r),r=""),i=o,s=s||!Mi(i);t++}return r!==""&&(e+=_x(s,r)),e}function $T(n){return n.map(WT).join(",")}function qT(n){let e=[],t=[],i=1,r=2;for(;i<n.length;){let s=n[i];if(typeof s=="string")r===2?s!==""&&e.push(s,n[++i]):r===8&&t.push(s);else{if(!Mi(r))break;r=s}i++}return t.length&&e.push(1,...t),e}var ci={};function Tg(n,e,t,i,r,s,o,a,c,l,u){let d=Tn+i,f=d+r,h=XT(d,f),g=typeof l=="function"?l():l;return h[Le]={type:n,blueprint:h,template:t,queries:null,viewQuery:a,declTNode:e,data:h.slice().fill(null,d),bindingStartIndex:d,expandoStartIndex:f,hostBindingOpCodes:null,firstCreatePass:!0,firstUpdatePass:!0,staticViewQueries:!1,staticContentQueries:!1,preOrderHooks:null,preOrderCheckHooks:null,contentHooks:null,contentCheckHooks:null,viewHooks:null,viewCheckHooks:null,destroyHooks:null,cleanup:null,contentQueries:null,components:null,directiveRegistry:typeof s=="function"?s():s,pipeRegistry:typeof o=="function"?o():o,firstChild:null,schemas:c,consts:g,incompleteFirstPass:!1,ssrId:u}}function XT(n,e){let t=[];for(let i=0;i<e;i++)t.push(i<n?null:ci);return t}function YT(n){let e=n.tView;return e===null||e.incompleteFirstPass?n.tView=Tg(1,null,n.template,n.decls,n.vars,n.directiveDefs,n.pipeDefs,n.viewQuery,n.schemas,n.consts,n.id):e}function Dg(n,e,t,i,r,s,o,a,c,l,u){let d=e.blueprint.slice();return d[vi]=r,d[Ue]=i|4|128|8|64|1024,(l!==null||n&&n[Ue]&2048)&&(d[Ue]|=2048),Em(d),d[nn]=d[Ls]=n,d[yn]=t,d[ki]=o||n&&n[ki],d[Lt]=a||n&&n[Lt],d[Ur]=c||n&&n[Ur]||null,d[ri]=s,d[Vr]=xT(),d[oc]=u,d[_m]=l,d[si]=e.type==2?n[si]:d,d}function ZT(n,e,t){let i=_i(e,n),r=YT(t),s=n[ki].rendererFactory,o=Ig(n,Dg(n,r,null,mM(t),i,e,null,s.createRenderer(i,t),null,null,null));return n[e.index]=o}function mM(n){let e=16;return n.signals?e=4096:n.onPush&&(e=64),e}function gM(n,e,t,i){if(t===0)return-1;let r=e.length;for(let s=0;s<t;s++)e.push(i),n.blueprint.push(i),n.data.push(null);return r}function Ig(n,e){return n[Ao]?n[ym][ii]=e:n[Ao]=e,n[ym]=e,e}function Ge(n=1){vM(kn(),lt(),ur()+n,!1)}function vM(n,e,t,i){if(!i)if((e[Ue]&3)===3){let s=n.preOrderCheckHooks;s!==null&&$u(e,s,t)}else{let s=n.preOrderHooks;s!==null&&qu(e,s,0,t)}zr(t)}var md=(function(n){return n[n.None=0]="None",n[n.SignalBased=1]="SignalBased",n[n.HasDecoratorInputTransform=2]="HasDecoratorInputTransform",n})(md||{});function ng(n,e,t,i){let r=Ve(null);try{let[s,o,a]=n.inputs[t],c=null;(o&md.SignalBased)!==0&&(c=e[s][En]),c!==null&&c.transformFn!==void 0?i=c.transformFn(i):a!==null&&(i=a.call(e,i)),n.setInput!==null?n.setInput(e,c,i,t,s):Bx(e,c,s,i)}finally{Ve(r)}}var Ei=(function(n){return n[n.Important=1]="Important",n[n.DashCase=2]="DashCase",n})(Ei||{}),JT;function Ag(n,e){return JT(n,e)}var Hz=typeof document<"u"&&typeof document?.documentElement?.getAnimations=="function";var ig=new WeakMap,fc=new WeakSet;function KT(n,e){let t=ig.get(n);if(!t||t.length===0)return;let i=e.parentNode,r=e.previousSibling;for(let s=t.length-1;s>=0;s--){let o=t[s],a=o.parentNode;o===e?(t.splice(s,1),fc.add(o),o.dispatchEvent(new CustomEvent("animationend",{detail:{cancel:!0}}))):(r&&o===r||a&&i&&a!==i)&&(t.splice(s,1),o.dispatchEvent(new CustomEvent("animationend",{detail:{cancel:!0}})),o.parentNode?.removeChild(o))}}function QT(n,e){let t=ig.get(n);t?t.includes(e)||t.push(e):ig.set(n,[e])}var Bo=new Set,Rg=(function(n){return n[n.CHANGE_DETECTION=0]="CHANGE_DETECTION",n[n.AFTER_NEXT_RENDER=1]="AFTER_NEXT_RENDER",n})(Rg||{}),Go=new Ie(""),xx=new Set;function Ng(n){xx.has(n)||(xx.add(n),performance?.mark?.("mark_feature_usage",{detail:{feature:n}}))}var yM=(()=>{class n{impl=null;execute(){this.impl?.execute()}static \u0275prov=Ce({token:n,providedIn:"root",factory:()=>new n})}return n})();var eD=new Ie("",{factory:()=>({queue:new Set,isScheduled:!1,scheduler:null,injector:Q(Xt)})});function _M(n,e,t){let i=n.get(eD);if(Array.isArray(e))for(let r of e)i.queue.add(r),t?.detachedLeaveAnimationFns?.push(r);else i.queue.add(e),t?.detachedLeaveAnimationFns?.push(e);i.scheduler&&i.scheduler(n)}function tD(n,e){for(let[t,i]of e)_M(n,i.animateFns)}function Mx(n,e,t,i){let r=n?.[Ro]?.enter;e!==null&&r&&r.has(t.index)&&tD(i,r)}function Fo(n,e,t,i,r,s,o,a){if(r!=null){let c,l=!1;yi(r)?c=r:or(r)&&(l=!0,r=r[vi]);let u=oi(r);n===0&&i!==null?(Mx(a,i,s,t),o==null?dM(e,i,u):nd(e,i,u,o||null,!0)):n===1&&i!==null?(Mx(a,i,s,t),nd(e,i,u,o||null,!0),KT(s,u)):n===2?(a?.[Ro]?.leave?.has(s.index)&&QT(s,u),fc.delete(u),bx(a,s,t,d=>{if(fc.has(u)){fc.delete(u);return}OT(e,u,l,d)})):n===3&&(fc.delete(u),bx(a,s,t,()=>{e.destroyNode(u)})),c!=null&&pD(e,n,t,c,s,i,o)}}function nD(n,e){xM(n,e),e[vi]=null,e[ri]=null}function iD(n,e,t,i,r,s){i[vi]=r,i[ri]=e,gd(n,i,t,1,r,s)}function xM(n,e){e[ki].changeDetectionScheduler?.notify(9),gd(n,e,e[Lt],2,null,null)}function rD(n){let e=n[Ao];if(!e)return qm(n[Le],n);for(;e;){let t=null;if(or(e))t=e[Ao];else{let i=e[Dn];i&&(t=i)}if(!t){for(;e&&!e[ii]&&e!==n;)or(e)&&qm(e[Le],e),e=e[nn];e===null&&(e=n),or(e)&&qm(e[Le],e),t=e&&e[ii]}e=t}}function Pg(n,e){let t=n[ks],i=t.indexOf(e);t.splice(i,1)}function MM(n,e){if(Bs(e))return;let t=e[Lt];t.destroyNode&&gd(n,e,t,3,null,null),rD(e)}function qm(n,e){if(Bs(e))return;let t=Ve(null);try{e[Ue]&=-129,e[Ue]|=256,e[Gn]&&xs(e[Gn]),aD(n,e),oD(n,e),e[Le].type===1&&e[Lt].destroy();let i=e[Br];if(i!==null&&yi(e[nn])){i!==e[nn]&&Pg(i,e);let r=e[Ui];r!==null&&r.detachView(n)}Qm(e)}finally{Ve(t)}}function bx(n,e,t,i){let r=n?.[Ro];if(r==null||r.leave==null||!r.leave.has(e.index))return i(!1);n&&Bo.add(n[Vr]),_M(t,()=>{if(r.leave&&r.leave.has(e.index)){let o=r.leave.get(e.index),a=[];if(o){for(let c=0;c<o.animateFns.length;c++){let l=o.animateFns[c],{promise:u}=l();a.push(u)}r.detachedLeaveAnimationFns=void 0}r.running=Promise.allSettled(a),sD(n,i)}else n&&Bo.delete(n[Vr]),i(!1)},r)}function sD(n,e){let t=n[Ro]?.running;if(t){t.then(()=>{n[Ro].running=void 0,Bo.delete(n[Vr]),e(!0)});return}e(!1)}function oD(n,e){let t=n.cleanup,i=e[Io];if(t!==null)for(let o=0;o<t.length-1;o+=2)if(typeof t[o]=="string"){let a=t[o+3];a>=0?i[a]():i[-a].unsubscribe(),o+=2}else{let a=i[t[o+1]];t[o].call(a)}i!==null&&(e[Io]=null);let r=e[ir];if(r!==null){e[ir]=null;for(let o=0;o<r.length;o++){let a=r[o];a()}}let s=e[Or];if(s!==null){e[Or]=null;for(let o of s)o.destroy()}}function aD(n,e){let t;if(n!=null&&(t=n.destroyHooks)!=null)for(let i=0;i<t.length;i+=2){let r=e[t[i]];if(!(r instanceof mc)){let s=t[i+1];if(Array.isArray(s))for(let o=0;o<s.length;o+=2){let a=r[s[o]],c=s[o+1];St(ut.LifecycleHookStart,a,c);try{c.call(a)}finally{St(ut.LifecycleHookEnd,a,c)}}else{St(ut.LifecycleHookStart,r,s);try{s.call(r)}finally{St(ut.LifecycleHookEnd,r,s)}}}}}function cD(n,e,t){return lD(n,e.parent,t)}function lD(n,e,t){let i=e;for(;i!==null&&i.type&168;)e=i,i=e.parent;if(i===null)return t[vi];if(ar(i)){let{encapsulation:r}=n.data[i.directiveStart+i.componentOffset];if(r===Si.None||r===Si.Emulated)return null}return _i(i,t)}function uD(n,e,t){return fD(n,e,t)}function dD(n,e,t){return n.type&40?_i(n,t):null}var fD=dD,Sx;function Og(n,e,t,i){let r=cD(n,i,e),s=e[Lt],o=i.parent||e[ri],a=uD(o,i,e);if(r!=null)if(Array.isArray(t))for(let c=0;c<t.length;c++)yx(s,r,t[c],a,!1);else yx(s,r,t,a,!1);Sx!==void 0&&Sx(s,i,e,t,r)}function hc(n,e){if(e!==null){let t=e.type;if(t&3)return _i(e,n);if(t&4)return rg(-1,n[e.index]);if(t&8){let i=e.child;if(i!==null)return hc(n,i);{let r=n[e.index];return yi(r)?rg(-1,r):oi(r)}}else{if(t&128)return hc(n,e.next);if(t&32)return Ag(e,n)()||oi(n[e.index]);{let i=bM(n,e);if(i!==null){if(Array.isArray(i))return i[0];let r=Lr(n[si]);return hc(r,i)}else return hc(n,e.next)}}}return null}function bM(n,e){if(e!==null){let i=n[si][ri],r=e.projection;return i.projection[r]}return null}function rg(n,e){let t=Dn+n+1;if(t<e.length){let i=e[t],r=i[Le].firstChild;if(r!==null)return hc(i,r)}return e[Hr]}function Lg(n,e,t,i,r,s,o){for(;t!=null;){let a=i[Ur];if(t.type===128){t=t.next;continue}let c=i[t.index],l=t.type;if(o&&e===0&&(c&&Uo(oi(c),i),t.flags|=2),!Sg(t))if(l&8)Lg(n,e,t.child,i,r,s,!1),Fo(e,n,a,r,c,t,s,i);else if(l&32){let u=Ag(t,i),d;for(;d=u();)Fo(e,n,a,r,d,t,s,i);Fo(e,n,a,r,c,t,s,i)}else l&16?hD(n,e,i,t,r,s):Fo(e,n,a,r,c,t,s,i);t=o?t.projectionNext:t.next}}function gd(n,e,t,i,r,s){Lg(t,i,n.firstChild,e,r,s,!1)}function hD(n,e,t,i,r,s){let o=t[si],c=o[ri].projection[i.projection];if(Array.isArray(c))for(let l=0;l<c.length;l++){let u=c[l];Fo(e,n,t[Ur],r,u,i,s,t)}else{let l=c,u=o[nn];tM(i)&&(l.flags|=128),Lg(n,e,l,u,r,s,!0)}}function pD(n,e,t,i,r,s,o){let a=i[Hr],c=oi(i);a!==c&&Fo(e,n,t,s,a,r,o);for(let l=Dn;l<i.length;l++){let u=i[l];gd(u[Le],u,n,e,s,a)}}function mD(n,e,t,i,r){if(e)r?n.addClass(t,i):n.removeClass(t,i);else{let s=i.indexOf("-")===-1?void 0:Ei.DashCase;r==null?n.removeStyle(t,i,s):(typeof r=="string"&&r.endsWith("!important")&&(r=r.slice(0,-10),s|=Ei.Important),n.setStyle(t,i,r,s))}}function SM(n,e,t,i,r){let s=ur(),o=i&2;try{zr(-1),o&&e.length>Tn&&vM(n,e,Tn,!1);let a=o?ut.TemplateUpdateStart:ut.TemplateCreateStart;St(a,r,t),t(i,r)}finally{zr(s);let a=o?ut.TemplateUpdateEnd:ut.TemplateCreateEnd;St(a,r,t)}}function vd(n,e,t){SD(n,e,t),(t.flags&64)===64&&ED(n,e,t)}function yd(n,e,t=_i){let i=e.localNames;if(i!==null){let r=e.index+1;for(let s=0;s<i.length;s+=2){let o=i[s+1],a=o===-1?t(e,n):n[o];n[r++]=a}}}function gD(n,e,t,i){let s=i.get(aM,oM)||t===Si.ShadowDom||t===Si.ExperimentalIsolatedShadowDom,o=n.selectRootElement(e,s);return vD(o),o}function vD(n){yD(n)}var yD=()=>null;function _D(n){return n==="class"?"className":n==="for"?"htmlFor":n==="formaction"?"formAction":n==="innerHtml"?"innerHTML":n==="readonly"?"readOnly":n==="tabindex"?"tabIndex":n}function xD(n,e,t,i,r,s){let o=e[Le];if(Bg(n,o,e,t,i)){ar(n)&&bD(e,n.index);return}n.type&3&&(t=_D(t)),MD(n,e,t,i,r,s)}function MD(n,e,t,i,r,s){if(n.type&3){let o=_i(n,e);i=s!=null?s(i,n.value||"",t):i,r.setProperty(o,t,i)}else n.type&12}function bD(n,e){let t=ai(e,n);t[Ue]&16||(t[Ue]|=64)}function SD(n,e,t){let i=t.directiveStart,r=t.directiveEnd;ar(t)&&ZT(e,t,n.data[i+t.componentOffset]),n.firstCreatePass||Xx(t,e);let s=t.initialInputs;for(let o=i;o<r;o++){let a=n.data[o],c=ed(e,n,o,t);if(Uo(c,e),s!==null&&DD(e,o-i,c,a,t,s),Us(a)){let l=ai(t.index,e);l[yn]=ed(e,n,o,t)}}}function ED(n,e,t){let i=t.directiveStart,r=t.directiveEnd,s=t.index,o=Y0();try{zr(s);for(let a=i;a<r;a++){let c=n.data[a],l=e[a];ku(a),(c.hostBindings!==null||c.hostVars!==0||c.hostAttrs!==null)&&wD(c,l)}}finally{zr(-1),ku(o)}}function wD(n,e){n.hostBindings!==null&&n.hostBindings(1,e)}function Fg(n,e){let t=n.directiveRegistry,i=null;if(t)for(let r=0;r<t.length;r++){let s=t[r];zT(e,s.selectors,!1)&&(i??=[],Us(s)?i.unshift(s):i.push(s))}return i}function CD(n,e,t,i,r,s){let o=_i(n,e);TD(e[Lt],o,s,n.value,t,i,r)}function TD(n,e,t,i,r,s,o){if(s==null)n.removeAttribute(e,r,t);else{let a=o==null?nc(s):o(s,i||"",r);n.setAttribute(e,r,a,t)}}function DD(n,e,t,i,r,s){let o=s[e];if(o!==null)for(let a=0;a<o.length;a+=2){let c=o[a],l=o[a+1];ng(i,t,c,l)}}function kg(n,e,t,i,r){let s=Tn+t,o=e[Le],a=r(o,e,n,i,t);e[s]=a,Lo(n,!0);let c=n.type===2;return c?(fM(e[Lt],a,n),(V0()===0||No(n))&&Uo(a,e),H0()):Uo(a,e),Hu()&&(!c||!Sg(n))&&Og(o,e,a,n),n}function Ug(n){let e=n;return Pm()?j0():(e=e.parent,Lo(e,!1)),e}function ID(n,e){let t=n[Ur];if(!t)return;let i;try{i=t.get(xi,null)}catch{i=null}i?.(e)}function Bg(n,e,t,i,r){let s=n.inputs?.[i],o=n.hostDirectiveInputs?.[i],a=!1;if(o)for(let c=0;c<o.length;c+=2){let l=o[c],u=o[c+1],d=e.data[l];ng(d,t[l],u,r),a=!0}if(s)for(let c of s){let l=t[c],u=e.data[c];ng(u,l,i,r),a=!0}return a}function AD(n,e){let t=ai(e,n),i=t[Le];RD(i,t);let r=t[vi];r!==null&&t[oc]===null&&(t[oc]=cM(r,t[Ur])),St(ut.ComponentStart);try{Vg(i,t,t[yn])}finally{St(ut.ComponentEnd,t[yn])}}function RD(n,e){for(let t=e.length;t<n.blueprint.length;t++)e.push(n.blueprint[t])}function Vg(n,e,t){Bu(e);try{let i=n.viewQuery;i!==null&&eg(1,i,t);let r=n.template;r!==null&&SM(n,e,r,1,t),n.firstCreatePass&&(n.firstCreatePass=!1),e[Ui]?.finishViewCreation(n),n.staticContentQueries&&lM(n,e),n.staticViewQueries&&eg(2,n.viewQuery,t);let s=n.components;s!==null&&ND(e,s)}catch(i){throw n.firstCreatePass&&(n.incompleteFirstPass=!0,n.firstCreatePass=!1),i}finally{e[Ue]&=-5,Vu()}}function ND(n,e){for(let t=0;t<e.length;t++)AD(n,e[t])}function PD(n,e,t,i){let r=Ve(null);try{let s=e.tView,a=n[Ue]&4096?4096:16,c=Dg(n,s,t,a,null,e,null,null,i?.injector??null,i?.embeddedViewInjector??null,i?.dehydratedView??null),l=n[e.index];c[Br]=l;let u=n[Ui];return u!==null&&(c[Ui]=u.createEmbeddedView(s)),Vg(s,c,t),c}finally{Ve(r)}}function Ex(n,e){return!e||e.firstChild===null||tM(n)}function gc(n,e,t,i,r=!1){for(;t!==null;){if(t.type===128){t=r?t.projectionNext:t.next;continue}let s=e[t.index];s!==null&&i.push(oi(s)),yi(s)&&EM(s,i);let o=t.type;if(o&8)gc(n,e,t.child,i);else if(o&32){let a=Ag(t,e),c;for(;c=a();)i.push(c)}else if(o&16){let a=bM(e,t);if(Array.isArray(a))i.push(...a);else{let c=Lr(e[si]);gc(c[Le],c,a,i,!0)}}t=r?t.projectionNext:t.next}return i}function EM(n,e){for(let t=Dn;t<n.length;t++){let i=n[t],r=i[Le].firstChild;r!==null&&gc(i[Le],i,r,e)}n[Hr]!==n[vi]&&e.push(n[Hr])}function wM(n){if(n[Ru]!==null){for(let e of n[Ru])e.impl.addSequence(e);n[Ru].length=0}}var CM=[];function OD(n){return n[Gn]??LD(n)}function LD(n){let e=CM.pop()??Object.create(kD);return e.lView=n,e}function FD(n){n.lView[Gn]!==n&&(n.lView=null,CM.push(n))}var kD=et(ae({},ys),{consumerIsAlwaysLive:!0,kind:"template",consumerMarkedDirty:n=>{Oo(n.lView)},consumerOnSignalRead(){this.lView[Gn]=this}});function UD(n){let e=n[Gn]??Object.create(BD);return e.lView=n,e}var BD=et(ae({},ys),{consumerIsAlwaysLive:!0,kind:"template",consumerMarkedDirty:n=>{let e=Lr(n.lView);for(;e&&!TM(e[Le]);)e=Lr(e);e&&wm(e)},consumerOnSignalRead(){this.lView[Gn]=this}});function TM(n){return n.type!==2}function DM(n){if(n[Or]===null)return;let e=!0;for(;e;){let t=!1;for(let i of n[Or])i.dirty&&(t=!0,i.zone===null||Zone.current===i.zone?i.run():i.zone.run(()=>i.run()));e=t&&!!(n[Ue]&8192)}}var VD=100;function IM(n,e=0){let i=n[ki].rendererFactory,r=!1;r||i.begin?.();try{HD(n,e)}finally{r||i.end?.()}}function HD(n,e){let t=Om();try{Ja(!0),sg(n,e);let i=0;for(;cc(n);){if(i===VD)throw new ge(103,!1);i++,sg(n,1)}}finally{Ja(t)}}function zD(n,e,t,i){if(Bs(e))return;let r=e[Ue],s=!1,o=!1;Bu(e);let a=!0,c=null,l=null;s||(TM(n)?(l=OD(e),c=_s(l)):zl()===null?(a=!1,l=UD(e),c=_s(l)):e[Gn]&&(xs(e[Gn]),e[Gn]=null));try{Em(e),$0(n.bindingStartIndex),t!==null&&SM(n,e,t,2,i);let u=(r&3)===3;if(!s)if(u){let h=n.preOrderCheckHooks;h!==null&&$u(e,h,null)}else{let h=n.preOrderHooks;h!==null&&qu(e,h,0,null),Wm(e,0)}if(o||GD(e),DM(e),AM(e,0),n.contentQueries!==null&&lM(n,e),!s)if(u){let h=n.contentCheckHooks;h!==null&&$u(e,h)}else{let h=n.contentHooks;h!==null&&qu(e,h,1),Wm(e,1)}WD(n,e);let d=n.components;d!==null&&NM(e,d,0);let f=n.viewQuery;if(f!==null&&eg(2,f,i),!s)if(u){let h=n.viewCheckHooks;h!==null&&$u(e,h)}else{let h=n.viewHooks;h!==null&&qu(e,h,2),Wm(e,2)}if(n.firstUpdatePass===!0&&(n.firstUpdatePass=!1),e[Au]){for(let h of e[Au])h();e[Au]=null}s||(wM(e),e[Ue]&=-73)}catch(u){throw s||Oo(e),u}finally{l!==null&&(vo(l,c),a&&FD(l)),Vu()}}function AM(n,e){for(let t=iM(n);t!==null;t=rM(t))for(let i=Dn;i<t.length;i++){let r=t[i];RM(r,e)}}function GD(n){for(let e=iM(n);e!==null;e=rM(e)){if(!(e[Ue]&2))continue;let t=e[ks];for(let i=0;i<t.length;i++){let r=t[i];wm(r)}}}function jD(n,e,t){St(ut.ComponentStart);let i=ai(e,n);try{RM(i,t)}finally{St(ut.ComponentEnd,i[yn])}}function RM(n,e){Nu(n)&&sg(n,e)}function sg(n,e){let i=n[Le],r=n[Ue],s=n[Gn],o=!!(e===0&&r&16);if(o||=!!(r&64&&e===0),o||=!!(r&1024),o||=!!(s?.dirty&&Ga(s)),o||=!1,s&&(s.dirty=!1),n[Ue]&=-9217,o)zD(i,n,i.template,n[yn]);else if(r&8192){let a=Ve(null);try{DM(n),AM(n,1);let c=i.components;c!==null&&NM(n,c,1),wM(n)}finally{Ve(a)}}}function NM(n,e,t){for(let i=0;i<e.length;i++)jD(n,e[i],t)}function WD(n,e){let t=n.hostBindingOpCodes;if(t!==null)try{for(let i=0;i<t.length;i++){let r=t[i];if(r<0)zr(~r);else{let s=r,o=t[++i],a=t[++i];X0(o,s);let c=e[s];St(ut.HostBindingsUpdateStart,c);try{a(2,c)}finally{St(ut.HostBindingsUpdateEnd,c)}}}}finally{zr(-1)}}function Hg(n,e){let t=Om()?64:1088;for(n[ki].changeDetectionScheduler?.notify(e);n;){n[Ue]|=t;let i=Lr(n);if(Po(n)&&!i)return n;n=i}return null}function PM(n,e,t,i){return[n,!0,0,e,null,i,null,t,null,null]}function $D(n,e,t,i=!0){let r=e[Le];if(qD(r,e,n,t),i){let o=rg(t,n),a=e[Lt],c=a.parentNode(n[Hr]);c!==null&&iD(r,n[ri],a,e,c,o)}let s=e[oc];s!==null&&s.firstChild!==null&&(s.firstChild=null)}function og(n,e){if(n.length<=Dn)return;let t=Dn+e,i=n[t];if(i){let r=i[Br];r!==null&&r!==n&&Pg(r,i),e>0&&(n[t-1][ii]=i[ii]);let s=ic(n,Dn+e);nD(i[Le],i);let o=s[Ui];o!==null&&o.detachView(s[Le]),i[nn]=null,i[ii]=null,i[Ue]&=-129}return i}function qD(n,e,t,i){let r=Dn+i,s=t.length;i>0&&(t[r-1][ii]=e),i<s-Dn?(e[ii]=t[r],hm(t,Dn+i,e)):(t.push(e),e[ii]=null),e[nn]=t;let o=e[Br];o!==null&&t!==o&&OM(o,e);let a=e[Ui];a!==null&&a.insertView(n),Pu(e),e[Ue]|=128}function OM(n,e){let t=n[ks],i=e[nn];if(or(i))n[Ue]|=2;else{let r=i[nn][si];e[si]!==r&&(n[Ue]|=2)}t===null?n[ks]=[e]:t.push(e)}var jr=class{_lView;_cdRefInjectingView;_appRef=null;_attachedToViewContainer=!1;exhaustive;get rootNodes(){let e=this._lView,t=e[Le];return gc(t,e,t.firstChild,[])}constructor(e,t){this._lView=e,this._cdRefInjectingView=t}get context(){return this._lView[yn]}set context(e){this._lView[yn]=e}get destroyed(){return Bs(this._lView)}destroy(){if(this._appRef)this._appRef.detachView(this);else if(this._attachedToViewContainer){let e=this._lView[nn];if(yi(e)){let t=e[ac],i=t?t.indexOf(this):-1;i>-1&&(og(e,i),ic(t,i))}this._attachedToViewContainer=!1}MM(this._lView[Le],this._lView)}onDestroy(e){Cm(this._lView,e)}markForCheck(){Hg(this._cdRefInjectingView||this._lView,4)}detach(){this._lView[Ue]&=-129}reattach(){Pu(this._lView),this._lView[Ue]|=128}detectChanges(){this._lView[Ue]|=1024,IM(this._lView)}checkNoChanges(){}attachToViewContainerRef(){if(this._appRef)throw new ge(902,!1);this._attachedToViewContainer=!0}detachFromAppRef(){this._appRef=null;let e=Po(this._lView),t=this._lView[Br];t!==null&&!e&&Pg(t,this._lView),xM(this._lView[Le],this._lView)}attachToAppRef(e){if(this._attachedToViewContainer)throw new ge(902,!1);this._appRef=e;let t=Po(this._lView),i=this._lView[Br];i!==null&&!t&&OM(i,this._lView),Pu(this._lView)}};var Wr=(()=>{class n{_declarationLView;_declarationTContainer;elementRef;static __NG_ELEMENT_ID__=XD;constructor(t,i,r){this._declarationLView=t,this._declarationTContainer=i,this.elementRef=r}get ssrId(){return this._declarationTContainer.tView?.ssrId||null}createEmbeddedView(t,i){return this.createEmbeddedViewImpl(t,i)}createEmbeddedViewImpl(t,i,r){let s=PD(this._declarationLView,this._declarationTContainer,t,{embeddedViewInjector:i,dehydratedView:r});return new jr(s)}}return n})();function XD(){return zg(In(),lt())}function zg(n,e){return n.type&4?new Wr(e,n,zo(n,e)):null}function _d(n,e,t,i,r){let s=n.data[e];if(s===null)s=YD(n,e,t,i,r),q0()&&(s.flags|=32);else if(s.type&64){s.type=t,s.value=i,s.attrs=r;let o=G0();s.injectorIndex=o===null?-1:o.injectorIndex}return Lo(s,!0),s}function YD(n,e,t,i,r){let s=Nm(),o=Pm(),a=o?s:s&&s.parent,c=n.data[e]=JD(n,a,t,e,i,r);return ZD(n,c,s,o),c}function ZD(n,e,t,i){n.firstChild===null&&(n.firstChild=e),t!==null&&(i?t.child==null&&e.parent!==null&&(t.child=e):t.next===null&&(t.next=e,e.prev=t))}function JD(n,e,t,i,r,s){let o=e?e.injectorIndex:-1,a=0;return z0()&&(a|=128),{type:t,index:i,insertBeforeIndex:null,injectorIndex:o,directiveStart:-1,directiveEnd:-1,directiveStylingLast:-1,componentOffset:-1,controlDirectiveIndex:-1,customControlIndex:-1,propertyBindings:null,flags:a,providerIndexes:0,value:r,attrs:s,mergedAttrs:null,localNames:null,initialInputs:null,inputs:null,hostDirectiveInputs:null,outputs:null,hostDirectiveOutputs:null,directiveToIndex:null,tView:null,next:null,prev:null,projectionNext:null,child:null,parent:e,projection:null,styles:null,stylesWithoutHost:null,residualStyles:void 0,classes:null,classesWithoutHost:null,residualClasses:void 0,classBindings:0,styleBindings:0}}var KD=()=>null;function wx(n,e){return KD(n,e)}var LM=class{},xd=class{},ag=class{resolveComponentFactory(e){throw new ge(917,!1)}},bc=class{static NULL=new ag},zs=class{},Gg=(()=>{class n{destroyNode=null;static __NG_ELEMENT_ID__=()=>QD()}return n})();function QD(){let n=lt(),e=In(),t=ai(e.index,n);return(or(t)?t:n)[Lt]}var FM=(()=>{class n{static \u0275prov=Ce({token:n,providedIn:"root",factory:()=>null})}return n})();var Yu={},cg=class{injector;parentInjector;constructor(e,t){this.injector=e,this.parentInjector=t}get(e,t,i){let r=this.injector.get(e,Yu,i);return r!==Yu||t===Yu?r:this.parentInjector.get(e,t,i)}};function id(n,e,t){let i=t?n.styles:null,r=t?n.classes:null,s=0;if(e!==null)for(let o=0;o<e.length;o++){let a=e[o];if(typeof a=="number")s=a;else if(s==1)r=bu(r,a);else if(s==2){let c=a,l=e[++o];i=bu(i,c+": "+l+";")}}t?n.styles=i:n.stylesWithoutHost=i,t?n.classes=r:n.classesWithoutHost=r}function fn(n,e=0){let t=lt();if(t===null)return Re(n,e);let i=In();return Kx(i,t,On(n),e)}function kM(n,e,t,i,r){let s=i===null?null:{"":-1},o=r(n,t);if(o!==null){let a=o,c=null,l=null;for(let u of o)if(u.resolveHostDirectives!==null){[a,c,l]=u.resolveHostDirectives(o);break}nI(n,e,t,a,s,c,l)}s!==null&&i!==null&&eI(t,i,s)}function eI(n,e,t){let i=n.localNames=[];for(let r=0;r<e.length;r+=2){let s=t[e[r+1]];if(s==null)throw new ge(-301,!1);i.push(e[r],s)}}function tI(n,e,t){e.componentOffset=t,(n.components??=[]).push(e.index)}function nI(n,e,t,i,r,s,o){let a=i.length,c=null;for(let f=0;f<a;f++){let h=i[f];c===null&&Us(h)&&(c=h,tI(n,t,f)),dT(Xx(t,e),n,h.type)}cI(t,n.data.length,a),c?.viewProvidersResolver&&c.viewProvidersResolver(c);for(let f=0;f<a;f++){let h=i[f];h.providersResolver&&h.providersResolver(h)}let l=!1,u=!1,d=gM(n,e,a,null);a>0&&(t.directiveToIndex=new Map);for(let f=0;f<a;f++){let h=i[f];if(t.mergedAttrs=dd(t.mergedAttrs,h.hostAttrs),rI(n,t,e,d,h),aI(d,h,r),o!==null&&o.has(h)){let[_,m]=o.get(h);t.directiveToIndex.set(h.type,[d,_+t.directiveStart,m+t.directiveStart])}else(s===null||!s.has(h))&&t.directiveToIndex.set(h.type,d);h.contentQueries!==null&&(t.flags|=4),(h.hostBindings!==null||h.hostAttrs!==null||h.hostVars!==0)&&(t.flags|=64);let g=h.type.prototype;!l&&(g.ngOnChanges||g.ngOnInit||g.ngDoCheck)&&((n.preOrderHooks??=[]).push(t.index),l=!0),!u&&(g.ngOnChanges||g.ngDoCheck)&&((n.preOrderCheckHooks??=[]).push(t.index),u=!0),d++}iI(n,t,s)}function iI(n,e,t){for(let i=e.directiveStart;i<e.directiveEnd;i++){let r=n.data[i];if(t===null||!t.has(r))Cx(0,e,r,i),Cx(1,e,r,i),Dx(e,i,!1);else{let s=t.get(r);Tx(0,e,s,i),Tx(1,e,s,i),Dx(e,i,!0)}}}function Cx(n,e,t,i){let r=n===0?t.inputs:t.outputs;for(let s in r)if(r.hasOwnProperty(s)){let o;n===0?o=e.inputs??={}:o=e.outputs??={},o[s]??=[],o[s].push(i),UM(e,s)}}function Tx(n,e,t,i){let r=n===0?t.inputs:t.outputs;for(let s in r)if(r.hasOwnProperty(s)){let o=r[s],a;n===0?a=e.hostDirectiveInputs??={}:a=e.hostDirectiveOutputs??={},a[o]??=[],a[o].push(i,s),UM(e,o)}}function UM(n,e){e==="class"?n.flags|=8:e==="style"&&(n.flags|=16)}function Dx(n,e,t){let{attrs:i,inputs:r,hostDirectiveInputs:s}=n;if(i===null||!t&&r===null||t&&s===null||Cg(n)){n.initialInputs??=[],n.initialInputs.push(null);return}let o=null,a=0;for(;a<i.length;){let c=i[a];if(c===0){a+=4;continue}else if(c===5){a+=2;continue}else if(typeof c=="number")break;if(!t&&r.hasOwnProperty(c)){let l=r[c];for(let u of l)if(u===e){o??=[],o.push(c,i[a+1]);break}}else if(t&&s.hasOwnProperty(c)){let l=s[c];for(let u=0;u<l.length;u+=2)if(l[u]===e){o??=[],o.push(l[u+1],i[a+1]);break}}a+=2}n.initialInputs??=[],n.initialInputs.push(o)}function rI(n,e,t,i,r){n.data[i]=r;let s=r.factory||(r.factory=Ds(r.type,!0)),o=new mc(s,Us(r),fn,null);n.blueprint[i]=o,t[i]=o,sI(n,e,i,gM(n,t,r.hostVars,ci),r)}function sI(n,e,t,i,r){let s=r.hostBindings;if(s){let o=n.hostBindingOpCodes;o===null&&(o=n.hostBindingOpCodes=[]);let a=~e.index;oI(o)!=a&&o.push(a),o.push(t,i,s)}}function oI(n){let e=n.length;for(;e>0;){let t=n[--e];if(typeof t=="number"&&t<0)return t}return 0}function aI(n,e,t){if(t){if(e.exportAs)for(let i=0;i<e.exportAs.length;i++)t[e.exportAs[i]]=n;Us(e)&&(t[""]=n)}}function cI(n,e,t){n.flags|=1,n.directiveStart=e,n.directiveEnd=e+t,n.providerIndexes=e}function jg(n,e,t,i,r,s,o,a){let c=e[Le],l=c.consts,u=Vs(l,o),d=_d(c,n,t,i,u);return s&&kM(c,e,d,Vs(l,a),r),d.mergedAttrs=dd(d.mergedAttrs,d.attrs),d.attrs!==null&&id(d,d.attrs,!1),d.mergedAttrs!==null&&id(d,d.mergedAttrs,!0),c.queries!==null&&c.queries.elementStart(c,d),d}function Wg(n,e){Gx(n,e),xm(e)&&n.queries.elementEnd(e)}function lI(n,e,t,i,r,s){let o=e.consts,a=Vs(o,r),c=_d(e,n,t,i,a);if(c.mergedAttrs=dd(c.mergedAttrs,c.attrs),s!=null){let l=Vs(o,s);c.localNames=[];for(let u=0;u<l.length;u+=2)c.localNames.push(l[u],-1)}return c.attrs!==null&&id(c,c.attrs,!1),c.mergedAttrs!==null&&id(c,c.mergedAttrs,!0),e.queries!==null&&e.queries.elementStart(e,c),c}function $g(n){return Md(n)?Array.isArray(n)||!(n instanceof Map)&&Symbol.iterator in n:!1}function BM(n,e){if(Array.isArray(n))for(let t=0;t<n.length;t++)e(n[t]);else{let t=n[Symbol.iterator](),i;for(;!(i=t.next()).done;)e(i.value)}}function Md(n){return n!==null&&(typeof n=="function"||typeof n=="object")}function Gs(n,e,t){if(t===ci)return!1;let i=n[e];return Object.is(i,t)?!1:(n[e]=t,!0)}function uI(n,e,t,i){let r=Gs(n,e,t);return Gs(n,e+1,i)||r}function Zu(n,e,t){return function i(r){let s=ar(n)?ai(n.index,e):e;Hg(s,5);let o=e[yn],a=Ix(e,o,t,r),c=i.__ngNextListenerFn__;for(;c;)a=Ix(e,o,c,r)&&a,c=c.__ngNextListenerFn__;return a}}function Ix(n,e,t,i){let r=Ve(null);try{return St(ut.OutputStart,e,t),t(i)!==!1}catch(s){return ID(n,s),!1}finally{St(ut.OutputEnd,e,t),Ve(r)}}function VM(n,e,t,i,r,s,o,a){let c=No(n),l=!1,u=null;if(!i&&c&&(u=fI(e,t,s,n.index)),u!==null){let d=u.__ngLastListenerFn__||u;d.__ngNextListenerFn__=o,u.__ngLastListenerFn__=o,l=!0}else{let d=_i(n,t),f=i?i(d):d;wT(t,f,s,a);let h=r.listen(f,s,a);if(!dI(s)){let g=i?_=>i(oi(_[n.index])):n.index;HM(g,e,t,s,a,h,!1)}}return l}function dI(n){return n.startsWith("animation")||n.startsWith("transition")}function fI(n,e,t,i){let r=n.cleanup;if(r!=null)for(let s=0;s<r.length-1;s+=2){let o=r[s];if(o===t&&r[s+1]===i){let a=e[Io],c=r[s+2];return a&&a.length>c?a[c]:null}typeof o=="string"&&(s+=2)}return null}function HM(n,e,t,i,r,s,o){let a=e.firstCreatePass?Dm(e):null,c=Tm(t),l=c.length;c.push(r,s),a&&a.push(i,n,l,(l+1)*(o?-1:1))}function Ax(n,e,t,i,r,s){let o=e[t],a=e[Le],l=a.data[t].outputs[i],d=o[l].subscribe(s);HM(n.index,a,e,r,s,d,!0)}var lg=Symbol("BINDING");function zM(n){return n.debugInfo?.className||n.type.name||null}var rd=class extends bc{ngModule;constructor(e){super(),this.ngModule=e}resolveComponentFactory(e){let t=kr(e);return new Vo(t,this.ngModule)}};function hI(n){return Object.keys(n).map(e=>{let[t,i,r]=n[e],s={propName:t,templateName:e,isSignal:(i&md.SignalBased)!==0};return r&&(s.transform=r),s})}function pI(n){return Object.keys(n).map(e=>({propName:n[e],templateName:e}))}function mI(n,e,t){let i=e instanceof Xt?e:e?.injector;return i&&n.getStandaloneInjector!==null&&(i=n.getStandaloneInjector(i)||i),i?new cg(t,i):t}function gI(n){let e=n.get(zs,null);if(e===null)throw new ge(407,!1);let t=n.get(FM,null),i=n.get(As,null),r=n.get(Go,null,{optional:!0});return{rendererFactory:e,sanitizer:t,changeDetectionScheduler:i,ngReflect:!1,tracingService:r}}function vI(n,e){let t=GM(n);return uM(e,t,t==="svg"?Mm:t==="math"?O0:null)}function GM(n){return(n.selectors[0][0]||"div").toLowerCase()}var Vo=class extends xd{componentDef;ngModule;selector;componentType;ngContentSelectors;isBoundToModule;cachedInputs=null;cachedOutputs=null;get inputs(){return this.cachedInputs??=hI(this.componentDef.inputs),this.cachedInputs}get outputs(){return this.cachedOutputs??=pI(this.componentDef.outputs),this.cachedOutputs}constructor(e,t){super(),this.componentDef=e,this.ngModule=t,this.componentType=e.type,this.selector=$T(e.selectors),this.ngContentSelectors=e.ngContentSelectors??[],this.isBoundToModule=!!t}create(e,t,i,r,s,o){St(ut.DynamicComponentStart);let a=Ve(null);try{let c=this.componentDef,l=mI(c,r||this.ngModule,e),u=gI(l),d=u.tracingService;return d&&d.componentCreate?d.componentCreate(zM(c),()=>this.createComponentRef(u,l,t,i,s,o)):this.createComponentRef(u,l,t,i,s,o)}finally{Ve(a)}}createComponentRef(e,t,i,r,s,o){let a=this.componentDef,c=yI(r,a,o,s),l=e.rendererFactory.createRenderer(null,a),u=r?gD(l,r,a.encapsulation,t):vI(a,l),d=o?.some(Rx)||s?.some(g=>typeof g!="function"&&g.bindings.some(Rx)),f=Dg(null,c,null,512|mM(a),null,null,e,l,t,null,cM(u,t,!0));f[Tn]=u,Bu(f);let h=null;try{let g=jg(Tn,f,2,"#host",()=>c.directiveRegistry,!0,0);fM(l,u,g),Uo(u,f),vd(c,f,g),Eg(c,g,f),Wg(c,g),i!==void 0&&xI(g,this.ngContentSelectors,i),h=ai(g.index,f),f[yn]=h[yn],Vg(c,f,null)}catch(g){throw h!==null&&Qm(h),Qm(f),g}finally{St(ut.DynamicComponentEnd),Vu()}return new sd(this.componentType,f,!!d)}};function yI(n,e,t,i){let r=n?["ng-version","21.2.8"]:qT(e.selectors[0]),s=null,o=null,a=0;if(t)for(let u of t)a+=u[lg].requiredVars,u.create&&(u.targetIdx=0,(s??=[]).push(u)),u.update&&(u.targetIdx=0,(o??=[]).push(u));if(i)for(let u=0;u<i.length;u++){let d=i[u];if(typeof d!="function")for(let f of d.bindings){a+=f[lg].requiredVars;let h=u+1;f.create&&(f.targetIdx=h,(s??=[]).push(f)),f.update&&(f.targetIdx=h,(o??=[]).push(f))}}let c=[e];if(i)for(let u of i){let d=typeof u=="function"?u:u.type,f=um(d);c.push(f)}return Tg(0,null,_I(s,o),1,a,c,null,null,null,[r],null)}function _I(n,e){return!n&&!e?null:t=>{if(t&1&&n)for(let i of n)i.create();if(t&2&&e)for(let i of e)i.update()}}function Rx(n){let e=n[lg].kind;return e==="input"||e==="twoWay"}var sd=class extends LM{_rootLView;_hasInputBindings;instance;hostView;changeDetectorRef;componentType;location;previousInputValues=null;_tNode;constructor(e,t,i){super(),this._rootLView=t,this._hasInputBindings=i,this._tNode=Sm(t[Le],Tn),this.location=zo(this._tNode,t),this.instance=ai(this._tNode.index,t)[yn],this.hostView=this.changeDetectorRef=new jr(t,void 0),this.componentType=e}setInput(e,t){this._hasInputBindings;let i=this._tNode;if(this.previousInputValues??=new Map,this.previousInputValues.has(e)&&Object.is(this.previousInputValues.get(e),t))return;let r=this._rootLView,s=Bg(i,r[Le],r,e,t);this.previousInputValues.set(e,t);let o=ai(i.index,r);Hg(o,1)}get injector(){return new Hs(this._tNode,this._rootLView)}destroy(){this.hostView.destroy()}onDestroy(e){this.hostView.onDestroy(e)}};function xI(n,e,t){let i=n.projection=[];for(let r=0;r<e.length;r++){let s=t[r];i.push(s!=null&&s.length?Array.from(s):null)}}var fr=(()=>{class n{static __NG_ELEMENT_ID__=MI}return n})();function MI(){let n=In();return jM(n,lt())}var ug=class n extends fr{_lContainer;_hostTNode;_hostLView;constructor(e,t,i){super(),this._lContainer=e,this._hostTNode=t,this._hostLView=i}get element(){return zo(this._hostTNode,this._hostLView)}get injector(){return new Hs(this._hostTNode,this._hostLView)}get parentInjector(){let e=xg(this._hostTNode,this._hostLView);if(Wx(e)){let t=Qu(e,this._hostLView),i=Ku(e),r=t[Le].data[i+8];return new Hs(r,t)}else return new Hs(null,this._hostLView)}clear(){for(;this.length>0;)this.remove(this.length-1)}get(e){let t=Nx(this._lContainer);return t!==null&&t[e]||null}get length(){return this._lContainer.length-Dn}createEmbeddedView(e,t,i){let r,s;typeof i=="number"?r=i:i!=null&&(r=i.index,s=i.injector);let o=wx(this._lContainer,e.ssrId),a=e.createEmbeddedViewImpl(t||{},s,o);return this.insertImpl(a,r,Ex(this._hostTNode,o)),a}createComponent(e,t,i,r,s,o,a){let c=e&&!ZC(e),l;if(c)l=t;else{let m=t||{};l=m.index,i=m.injector,r=m.projectableNodes,s=m.environmentInjector||m.ngModuleRef,o=m.directives,a=m.bindings}let u=c?e:new Vo(kr(e)),d=i||this.parentInjector;if(!s&&u.ngModule==null){let p=(c?d:this.parentInjector).get(Xt,null);p&&(s=p)}let f=kr(u.componentType??{}),h=wx(this._lContainer,f?.id??null),g=h?.firstChild??null,_=u.create(d,r,g,s,o,a);return this.insertImpl(_.hostView,l,Ex(this._hostTNode,h)),_}insert(e,t){return this.insertImpl(e,t,!0)}insertImpl(e,t,i){let r=e._lView;if(F0(r)){let a=this.indexOf(e);if(a!==-1)this.detach(a);else{let c=r[nn],l=new n(c,c[ri],c[nn]);l.detach(l.indexOf(e))}}let s=this._adjustIndex(t),o=this._lContainer;return $D(o,r,s,i),e.attachToViewContainerRef(),hm(Xm(o),s,e),e}move(e,t){return this.insert(e,t)}indexOf(e){let t=Nx(this._lContainer);return t!==null?t.indexOf(e):-1}remove(e){let t=this._adjustIndex(e,-1),i=og(this._lContainer,t);i&&(ic(Xm(this._lContainer),t),MM(i[Le],i))}detach(e){let t=this._adjustIndex(e,-1),i=og(this._lContainer,t);return i&&ic(Xm(this._lContainer),t)!=null?new jr(i):null}_adjustIndex(e,t=0){return e??this.length+t}};function Nx(n){return n[ac]}function Xm(n){return n[ac]||(n[ac]=[])}function jM(n,e){let t,i=e[n.index];return yi(i)?t=i:(t=PM(i,e,null,n),e[n.index]=t,Ig(e,t)),SI(t,e,n,i),new ug(t,n,e)}function bI(n,e){let t=n[Lt],i=t.createComment(""),r=_i(e,n),s=t.parentNode(r);return nd(t,s,i,t.nextSibling(r),!1),i}var SI=CI,EI=()=>!1;function wI(n,e,t){return EI(n,e,t)}function CI(n,e,t,i){if(n[Hr])return;let r;t.type&8?r=oi(i):r=bI(e,t),n[Hr]=r}var dg=class n{queryList;matches=null;constructor(e){this.queryList=e}clone(){return new n(this.queryList)}setDirty(){this.queryList.setDirty()}},fg=class n{queries;constructor(e=[]){this.queries=e}createEmbeddedView(e){let t=e.queries;if(t!==null){let i=e.contentQueries!==null?e.contentQueries[0]:t.length,r=[];for(let s=0;s<i;s++){let o=t.getByIndex(s),a=this.queries[o.indexInDeclarationView];r.push(a.clone())}return new n(r)}return null}insertView(e){this.dirtyQueriesWithMatches(e)}detachView(e){this.dirtyQueriesWithMatches(e)}finishViewCreation(e){this.dirtyQueriesWithMatches(e)}dirtyQueriesWithMatches(e){for(let t=0;t<this.queries.length;t++)qg(e,t).matches!==null&&this.queries[t].setDirty()}},hg=class{flags;read;predicate;constructor(e,t,i=null){this.flags=t,this.read=i,typeof e=="string"?this.predicate=OI(e):this.predicate=e}},pg=class n{queries;constructor(e=[]){this.queries=e}elementStart(e,t){for(let i=0;i<this.queries.length;i++)this.queries[i].elementStart(e,t)}elementEnd(e){for(let t=0;t<this.queries.length;t++)this.queries[t].elementEnd(e)}embeddedTView(e){let t=null;for(let i=0;i<this.length;i++){let r=t!==null?t.length:0,s=this.getByIndex(i).embeddedTView(e,r);s&&(s.indexInDeclarationView=i,t!==null?t.push(s):t=[s])}return t!==null?new n(t):null}template(e,t){for(let i=0;i<this.queries.length;i++)this.queries[i].template(e,t)}getByIndex(e){return this.queries[e]}get length(){return this.queries.length}track(e){this.queries.push(e)}},mg=class n{metadata;matches=null;indexInDeclarationView=-1;crossesNgTemplate=!1;_declarationNodeIndex;_appliesToNextNode=!0;constructor(e,t=-1){this.metadata=e,this._declarationNodeIndex=t}elementStart(e,t){this.isApplyingToNode(t)&&this.matchTNode(e,t)}elementEnd(e){this._declarationNodeIndex===e.index&&(this._appliesToNextNode=!1)}template(e,t){this.elementStart(e,t)}embeddedTView(e,t){return this.isApplyingToNode(e)?(this.crossesNgTemplate=!0,this.addMatch(-e.index,t),new n(this.metadata)):null}isApplyingToNode(e){if(this._appliesToNextNode&&(this.metadata.flags&1)!==1){let t=this._declarationNodeIndex,i=e.parent;for(;i!==null&&i.type&8&&i.index!==t;)i=i.parent;return t===(i!==null?i.index:-1)}return this._appliesToNextNode}matchTNode(e,t){let i=this.metadata.predicate;if(Array.isArray(i))for(let r=0;r<i.length;r++){let s=i[r];this.matchTNodeWithReadOption(e,t,TI(t,s)),this.matchTNodeWithReadOption(e,t,Xu(t,e,s,!1,!1))}else i===Wr?t.type&4&&this.matchTNodeWithReadOption(e,t,-1):this.matchTNodeWithReadOption(e,t,Xu(t,e,i,!1,!1))}matchTNodeWithReadOption(e,t,i){if(i!==null){let r=this.metadata.read;if(r!==null)if(r===$s||r===fr||r===Wr&&t.type&4)this.addMatch(t.index,-2);else{let s=Xu(t,e,r,!1,!1);s!==null&&this.addMatch(t.index,s)}else this.addMatch(t.index,i)}}addMatch(e,t){this.matches===null?this.matches=[e,t]:this.matches.push(e,t)}};function TI(n,e){let t=n.localNames;if(t!==null){for(let i=0;i<t.length;i+=2)if(t[i]===e)return t[i+1]}return null}function DI(n,e){return n.type&11?zo(n,e):n.type&4?zg(n,e):null}function II(n,e,t,i){return t===-1?DI(e,n):t===-2?AI(n,e,i):ed(n,n[Le],t,e)}function AI(n,e,t){if(t===$s)return zo(e,n);if(t===Wr)return zg(e,n);if(t===fr)return jM(e,n)}function WM(n,e,t,i){let r=e[Ui].queries[i];if(r.matches===null){let s=n.data,o=t.matches,a=[];for(let c=0;o!==null&&c<o.length;c+=2){let l=o[c];if(l<0)a.push(null);else{let u=s[l];a.push(II(e,u,o[c+1],t.metadata.read))}}r.matches=a}return r.matches}function gg(n,e,t,i){let r=n.queries.getByIndex(t),s=r.matches;if(s!==null){let o=WM(n,e,r,t);for(let a=0;a<s.length;a+=2){let c=s[a];if(c>0)i.push(o[a/2]);else{let l=s[a+1],u=e[-c];for(let d=Dn;d<u.length;d++){let f=u[d];f[Br]===f[nn]&&gg(f[Le],f,l,i)}if(u[ks]!==null){let d=u[ks];for(let f=0;f<d.length;f++){let h=d[f];gg(h[Le],h,l,i)}}}}}return i}function RI(n,e){return n[Ui].queries[e].queryList}function NI(n,e,t){let i=new td((t&4)===4);return B0(n,e,i,i.destroy),(e[Ui]??=new fg).queries.push(new dg(i))-1}function PI(n,e,t){let i=kn();return i.firstCreatePass&&(LI(i,new hg(n,e,t),-1),(e&2)===2&&(i.staticViewQueries=!0)),NI(i,lt(),e)}function OI(n){return n.split(",").map(e=>e.trim())}function LI(n,e,t){n.queries===null&&(n.queries=new pg),n.queries.track(new mg(e,t))}function qg(n,e){return n.queries.getByIndex(e)}function FI(n,e){let t=n[Le],i=qg(t,e);return i.crossesNgTemplate?gg(t,n,e,[]):WM(t,n,i,e)}var js=class{},bd=class{};var od=class extends js{ngModuleType;_parent;_bootstrapComponents=[];_r3Injector;instance;destroyCbs=[];componentFactoryResolver=new rd(this);constructor(e,t,i,r=!0){super(),this.ngModuleType=e,this._parent=t;let s=lm(e);this._bootstrapComponents=hM(s.bootstrap),this._r3Injector=Bm(e,t,[{provide:js,useValue:this},{provide:bc,useValue:this.componentFactoryResolver},...i],ec(e),new Set(["environment"])),r&&this.resolveInjectorInitializers()}resolveInjectorInitializers(){this._r3Injector.resolveInjectorInitializers(),this.instance=this._r3Injector.get(this.ngModuleType)}get injector(){return this._r3Injector}destroy(){let e=this._r3Injector;!e.destroyed&&e.destroy(),this.destroyCbs.forEach(t=>t()),this.destroyCbs=null}onDestroy(e){this.destroyCbs.push(e)}},ad=class extends bd{moduleType;constructor(e){super(),this.moduleType=e}create(e){return new od(this.moduleType,e,[])}};var vc=class extends js{injector;componentFactoryResolver=new rd(this);instance=null;constructor(e){super();let t=new Is([...e.providers,{provide:js,useValue:this},{provide:bc,useValue:this.componentFactoryResolver}],e.parent||sc(),e.debugName,new Set(["environment"]));this.injector=t,e.runEnvironmentInitializers&&t.resolveInjectorInitializers()}destroy(){this.injector.destroy()}onDestroy(e){this.injector.onDestroy(e)}};function Sc(n,e,t=null){return new vc({providers:n,parent:e,debugName:t,runEnvironmentInitializers:!0}).injector}var kI=(()=>{class n{_injector;cachedInjectors=new Map;constructor(t){this._injector=t}getOrCreateStandaloneInjector(t){if(!t.standalone)return null;if(!this.cachedInjectors.has(t)){let i=gm(!1,t.type),r=i.length>0?Sc([i],this._injector,""):null;this.cachedInjectors.set(t,r)}return this.cachedInjectors.get(t)}ngOnDestroy(){try{for(let t of this.cachedInjectors.values())t!==null&&t.destroy()}finally{this.cachedInjectors.clear()}}static \u0275prov=Ce({token:n,providedIn:"environment",factory:()=>new n(Re(Xt))})}return n})();function wi(n){return _c(()=>{let e=$M(n),t=et(ae({},e),{decls:n.decls,vars:n.vars,template:n.template,consts:n.consts||null,ngContentSelectors:n.ngContentSelectors,onPush:n.changeDetection===Mg.OnPush,directiveDefs:null,pipeDefs:null,dependencies:e.standalone&&n.dependencies||null,getStandaloneInjector:e.standalone?r=>r.get(kI).getOrCreateStandaloneInjector(t):null,getExternalStyles:null,signals:n.signals??!1,data:n.data||{},encapsulation:n.encapsulation||Si.Emulated,styles:n.styles||Ln,_:null,schemas:n.schemas||null,tView:null,id:""});e.standalone&&Ng("NgStandalone"),qM(t);let i=n.dependencies;return t.directiveDefs=Px(i,UI),t.pipeDefs=Px(i,x0),t.id=HI(t),t})}function UI(n){return kr(n)||um(n)}function jo(n){return _c(()=>({type:n.type,bootstrap:n.bootstrap||Ln,declarations:n.declarations||Ln,imports:n.imports||Ln,exports:n.exports||Ln,transitiveCompileScopes:null,schemas:n.schemas||null,id:n.id||null}))}function BI(n,e){if(n==null)return Ps;let t={};for(let i in n)if(n.hasOwnProperty(i)){let r=n[i],s,o,a,c;Array.isArray(r)?(a=r[0],s=r[1],o=r[2]??s,c=r[3]||null):(s=r,o=r,a=md.None,c=null),t[s]=[i,a,c],e[s]=o}return t}function VI(n){if(n==null)return Ps;let e={};for(let t in n)n.hasOwnProperty(t)&&(e[n[t]]=t);return e}function qs(n){return _c(()=>{let e=$M(n);return qM(e),e})}function $M(n){let e={};return{type:n.type,providersResolver:null,viewProvidersResolver:null,factory:null,hostBindings:n.hostBindings||null,hostVars:n.hostVars||0,hostAttrs:n.hostAttrs||null,contentQueries:n.contentQueries||null,declaredInputs:e,inputConfig:n.inputs||Ps,exportAs:n.exportAs||null,standalone:n.standalone??!0,signals:n.signals===!0,selectors:n.selectors||Ln,viewQuery:n.viewQuery||null,features:n.features||null,setInput:null,resolveHostDirectives:null,hostDirectives:null,controlDef:null,inputs:BI(n.inputs,e),outputs:VI(n.outputs),debugInfo:null}}function qM(n){n.features?.forEach(e=>e(n))}function Px(n,e){return n?()=>{let t=typeof n=="function"?n():n,i=[];for(let r of t){let s=e(r);s!==null&&i.push(s)}return i}:null}function HI(n){let e=0,t=typeof n.consts=="function"?"":n.consts,i=[n.selectors,n.ngContentSelectors,n.hostVars,n.hostAttrs,t,n.vars,n.decls,n.encapsulation,n.standalone,n.signals,n.exportAs,JSON.stringify(n.inputs),JSON.stringify(n.outputs),Object.getOwnPropertyNames(n.type.prototype),!!n.contentQueries,!!n.viewQuery];for(let s of i.join("|"))e=Math.imul(31,e)+s.charCodeAt(0)<<0;return e+=2147483648,"c"+e}function zI(n,e,t,i,r,s,o,a){if(t.firstCreatePass){n.mergedAttrs=dd(n.mergedAttrs,n.attrs);let u=n.tView=Tg(2,n,r,s,o,t.directiveRegistry,t.pipeRegistry,null,t.schemas,t.consts,null);t.queries!==null&&(t.queries.template(t,n),u.queries=t.queries.embeddedTView(n))}a&&(n.flags|=a),Lo(n,!1);let c=jI(t,e,n,i);Hu()&&Og(t,e,c,n),Uo(c,e);let l=PM(c,e,c,n);e[i+Tn]=l,Ig(e,l),wI(l,n,e)}function GI(n,e,t,i,r,s,o,a,c,l,u){let d=t+Tn,f;return e.firstCreatePass?(f=_d(e,d,4,o||null,a||null),Ou()&&kM(e,n,f,Vs(e.consts,l),Fg),Gx(e,f)):f=e.data[d],zI(f,n,e,t,i,r,s,c),No(f)&&vd(e,n,f),l!=null&&yd(n,f,u),f}function Vi(n,e,t,i,r,s,o,a){let c=lt(),l=kn(),u=Vs(l.consts,s);return GI(c,l,n,e,t,i,r,u,void 0,o,a),Vi}var jI=WI;function WI(n,e,t,i){return uc(!0),e[Lt].createComment("")}var Xg=(()=>{class n{log(t){console.log(t)}warn(t){console.warn(t)}static \u0275fac=function(i){return new(i||n)};static \u0275prov=Ce({token:n,factory:n.\u0275fac,providedIn:"platform"})}return n})();var Yg=new Ie("");function Wo(n){return!!n&&typeof n.then=="function"}function Zg(n){return!!n&&typeof n.subscribe=="function"}var Jg=new Ie("");function Sd(n){return sr([{provide:Jg,multi:!0,useValue:n}])}var Kg=(()=>{class n{resolve;reject;initialized=!1;done=!1;donePromise=new Promise((t,i)=>{this.resolve=t,this.reject=i});appInits=Q(Jg,{optional:!0})??[];injector=Q(Fn);constructor(){}runInitializers(){if(this.initialized)return;let t=[];for(let r of this.appInits){let s=vn(this.injector,r);if(Wo(s))t.push(s);else if(Zg(s)){let o=new Promise((a,c)=>{s.subscribe({complete:a,error:c})});t.push(o)}}let i=()=>{this.done=!0,this.resolve()};Promise.all(t).then(()=>{i()}).catch(r=>{this.reject(r)}),t.length===0&&i(),this.initialized=!0}static \u0275fac=function(i){return new(i||n)};static \u0275prov=Ce({token:n,factory:n.\u0275fac,providedIn:"root"})}return n})(),Ed=new Ie("");function XM(){wp(()=>{let n="";throw new ge(600,n)})}function YM(n){return n.isBoundToModule}var $I=10;var hr=(()=>{class n{_runningTick=!1;_destroyed=!1;_destroyListeners=[];_views=[];internalErrorHandler=Q(xi);afterRenderManager=Q(yM);zonelessEnabled=Q(dc);rootEffectScheduler=Q(Gu);dirtyFlags=0;tracingSnapshot=null;allTestViews=new Set;autoDetectTestViews=new Set;includeAllTestViews=!1;afterTick=new Ht;get allViews(){return[...(this.includeAllTestViews?this.allTestViews:this.autoDetectTestViews).keys(),...this._views]}get destroyed(){return this._destroyed}componentTypes=[];components=[];internalPendingTask=Q(Gr);get isStable(){return this.internalPendingTask.hasPendingTasksObservable.pipe(_t(t=>!t))}constructor(){Q(Go,{optional:!0})}whenStable(){let t;return new Promise(i=>{t=this.isStable.subscribe({next:r=>{r&&i()}})}).finally(()=>{t.unsubscribe()})}_injector=Q(Xt);_rendererFactory=null;get injector(){return this._injector}bootstrap(t,i){return this.bootstrapImpl(t,i)}bootstrapImpl(t,i,r=Fn.NULL){return this._injector.get(Ot).run(()=>{St(ut.BootstrapComponentStart);let o=t instanceof xd;if(!this._injector.get(Kg).done){let g="";throw new ge(405,g)}let c;o?c=t:c=this._injector.get(bc).resolveComponentFactory(t),this.componentTypes.push(c.componentType);let l=YM(c)?void 0:this._injector.get(js),u=i||c.selector,d=c.create(r,[],u,l),f=d.location.nativeElement,h=d.injector.get(Yg,null);return h?.registerApplication(f),d.onDestroy(()=>{this.detachView(d.hostView),pc(this.components,d),h?.unregisterApplication(f)}),this._loadComponent(d),St(ut.BootstrapComponentEnd,d),d})}tick(){this.zonelessEnabled||(this.dirtyFlags|=1),this._tick()}_tick(){St(ut.ChangeDetectionStart),this.tracingSnapshot!==null?this.tracingSnapshot.run(Rg.CHANGE_DETECTION,this.tickImpl):this.tickImpl()}tickImpl=()=>{if(this._runningTick)throw St(ut.ChangeDetectionEnd),new ge(101,!1);let t=Ve(null);try{this._runningTick=!0,this.synchronize()}finally{this._runningTick=!1,this.tracingSnapshot?.dispose(),this.tracingSnapshot=null,Ve(t),this.afterTick.next(),St(ut.ChangeDetectionEnd)}};synchronize(){this._rendererFactory===null&&!this._injector.destroyed&&(this._rendererFactory=this._injector.get(zs,null,{optional:!0}));let t=0;for(;this.dirtyFlags!==0&&t++<$I;){St(ut.ChangeDetectionSyncStart);try{this.synchronizeOnce()}finally{St(ut.ChangeDetectionSyncEnd)}}}synchronizeOnce(){this.dirtyFlags&16&&(this.dirtyFlags&=-17,this.rootEffectScheduler.flush());let t=!1;if(this.dirtyFlags&7){let i=!!(this.dirtyFlags&1);this.dirtyFlags&=-8,this.dirtyFlags|=8;for(let{_lView:r}of this.allViews){if(!i&&!cc(r))continue;let s=i&&!this.zonelessEnabled?0:1;IM(r,s),t=!0}if(this.dirtyFlags&=-5,this.syncDirtyFlagsWithViews(),this.dirtyFlags&23)return}t||(this._rendererFactory?.begin?.(),this._rendererFactory?.end?.()),this.dirtyFlags&8&&(this.dirtyFlags&=-9,this.afterRenderManager.execute()),this.syncDirtyFlagsWithViews()}syncDirtyFlagsWithViews(){if(this.allViews.some(({_lView:t})=>cc(t))){this.dirtyFlags|=2;return}else this.dirtyFlags&=-8}attachView(t){let i=t;this._views.push(i),i.attachToAppRef(this)}detachView(t){let i=t;pc(this._views,i),i.detachFromAppRef()}_loadComponent(t){this.attachView(t.hostView);try{this.tick()}catch(r){this.internalErrorHandler(r)}this.components.push(t),this._injector.get(Ed,[]).forEach(r=>r(t))}ngOnDestroy(){if(!this._destroyed)try{this._destroyListeners.forEach(t=>t()),this._views.slice().forEach(t=>t.destroy())}finally{this._destroyed=!0,this._views=[],this._destroyListeners=[]}}onDestroy(t){return this._destroyListeners.push(t),()=>pc(this._destroyListeners,t)}destroy(){if(this._destroyed)throw new ge(406,!1);let t=this._injector;t.destroy&&!t.destroyed&&t.destroy()}get viewCount(){return this._views.length}static \u0275fac=function(i){return new(i||n)};static \u0275prov=Ce({token:n,factory:n.\u0275fac,providedIn:"root"})}return n})();function pc(n,e){let t=n.indexOf(e);t>-1&&n.splice(t,1)}function wd(n,e,t,i){let r=lt(),s=Lu();if(Gs(r,s,e)){let o=kn(),a=Um();CD(a,r,n,e,t,i)}return wd}function Zt(n,e,t){let i=lt(),r=Lu();if(Gs(i,r,e)){let s=kn(),o=Um();xD(o,i,n,e,i[Lt],t)}return Zt}function vg(n,e,t,i,r){Bg(e,n,t,r?"class":"style",i)}function nt(n,e,t,i){let r=lt(),s=r[Le],o=n+Tn,a=s.firstCreatePass?jg(o,r,2,e,Fg,Ou(),t,i):s.data[o];if(ar(a)){let c=r[ki].tracingService;if(c&&c.componentCreate){let l=s.data[a.directiveStart+a.componentOffset];return c.componentCreate(zM(l),()=>(Ox(n,e,r,a,i),nt))}}return Ox(n,e,r,a,i),nt}function Ox(n,e,t,i,r){if(kg(i,t,n,e,ZM),No(i)){let s=t[Le];vd(s,t,i),Eg(s,i,t)}r!=null&&yd(t,i)}function mt(){let n=kn(),e=In(),t=Ug(e);return n.firstCreatePass&&Wg(n,t),Am(t)&&Rm(),Im(),t.classesWithoutHost!=null&&nT(t)&&vg(n,t,lt(),t.classesWithoutHost,!0),t.stylesWithoutHost!=null&&iT(t)&&vg(n,t,lt(),t.stylesWithoutHost,!1),mt}function Un(n,e,t,i){return nt(n,e,t,i),mt(),Un}function It(n,e,t,i){let r=lt(),s=r[Le],o=n+Tn,a=s.firstCreatePass?lI(o,s,2,e,t,i):s.data[o];return kg(a,r,n,e,ZM),i!=null&&yd(r,a),It}function Ct(){let n=In(),e=Ug(n);return Am(e)&&Rm(),Im(),Ct}function Ec(n,e,t,i){return It(n,e,t,i),Ct(),Ec}var ZM=(n,e,t,i,r)=>(uc(!0),uM(e[Lt],i,tx()));function Cd(n,e,t){let i=lt(),r=i[Le],s=n+Tn,o=r.firstCreatePass?jg(s,i,8,"ng-container",Fg,Ou(),e,t):r.data[s];if(kg(o,i,n,"ng-container",qI),No(o)){let a=i[Le];vd(a,i,o),Eg(a,o,i)}return t!=null&&yd(i,o),Cd}function Td(){let n=kn(),e=In(),t=Ug(e);return n.firstCreatePass&&Wg(n,t),Td}var qI=(n,e,t,i,r)=>(uc(!0),PT(e[Lt],""));function $o(){return lt()}var wc="en-US";var XI=wc;function JM(n){typeof n=="string"&&(XI=n.toLowerCase().replace(/_/g,"-"))}function jn(n,e,t){let i=lt(),r=kn(),s=In();return YI(r,i,i[Lt],s,n,e,t),jn}function qo(n,e,t){let i=lt(),r=kn(),s=In();return(s.type&3||t)&&VM(s,r,i,t,i[Lt],n,e,Zu(s,i,e)),qo}function YI(n,e,t,i,r,s,o){let a=!0,c=null;if((i.type&3||o)&&(c??=Zu(i,e,s),VM(i,n,e,o,t,r,s,c)&&(a=!1)),a){let l=i.outputs?.[r],u=i.hostDirectiveOutputs?.[r];if(u&&u.length)for(let d=0;d<u.length;d+=2){let f=u[d],h=u[d+1];c??=Zu(i,e,s),Ax(i,e,f,h,r,c)}if(l&&l.length)for(let d of l)c??=Zu(i,e,s),Ax(i,e,d,r,r,c)}}function An(n=1){return ex(n)}function Xo(n,e,t){return PI(n,e,t),Xo}function Yo(n){let e=lt(),t=kn(),i=Lm();Uu(i+1);let r=qg(t,i);if(n.dirty&&L0(e)===((r.metadata.flags&2)===2)){if(r.matches===null)n.reset([]);else{let s=FI(e,i);n.reset(s,vT),n.notifyOnChanges()}return!0}return!1}function Zo(){return RI(lt(),Lm())}function Wu(n,e){return n<<17|e<<2}function Ws(n){return n>>17&32767}function ZI(n){return(n&2)==2}function JI(n,e){return n&131071|e<<17}function yg(n){return n|2}function Ho(n){return(n&131068)>>2}function Ym(n,e){return n&-131069|e<<2}function KI(n){return(n&1)===1}function _g(n){return n|1}function QI(n,e,t,i,r,s){let o=s?e.classBindings:e.styleBindings,a=Ws(o),c=Ho(o);n[i]=t;let l=!1,u;if(Array.isArray(t)){let d=t;u=d[1],(u===null||Do(d,u)>0)&&(l=!0)}else u=t;if(r)if(c!==0){let f=Ws(n[a+1]);n[i+1]=Wu(f,a),f!==0&&(n[f+1]=Ym(n[f+1],i)),n[a+1]=JI(n[a+1],i)}else n[i+1]=Wu(a,0),a!==0&&(n[a+1]=Ym(n[a+1],i)),a=i;else n[i+1]=Wu(c,0),a===0?a=i:n[c+1]=Ym(n[c+1],i),c=i;l&&(n[i+1]=yg(n[i+1])),Lx(n,u,i,!0),Lx(n,u,i,!1),eA(e,u,n,i,s),o=Wu(a,c),s?e.classBindings=o:e.styleBindings=o}function eA(n,e,t,i,r){let s=r?n.residualClasses:n.residualStyles;s!=null&&typeof e=="string"&&Do(s,e)>=0&&(t[i+1]=_g(t[i+1]))}function Lx(n,e,t,i){let r=n[t+1],s=e===null,o=i?Ws(r):Ho(r),a=!1;for(;o!==0&&(a===!1||s);){let c=n[o],l=n[o+1];tA(c,e)&&(a=!0,n[o+1]=i?_g(l):yg(l)),o=i?Ws(l):Ho(l)}a&&(n[t+1]=i?yg(r):_g(r))}function tA(n,e){return n===null||e==null||(Array.isArray(n)?n[1]:n)===e?!0:Array.isArray(n)&&typeof e=="string"?Do(n,e)>=0:!1}var bi={textEnd:0,key:0,keyEnd:0,value:0,valueEnd:0};function nA(n){return n.substring(bi.key,bi.keyEnd)}function iA(n){return rA(n),KM(n,QM(n,0,bi.textEnd))}function KM(n,e){let t=bi.textEnd;return t===e?-1:(e=bi.keyEnd=sA(n,bi.key=e,t),QM(n,e,t))}function rA(n){bi.key=0,bi.keyEnd=0,bi.value=0,bi.valueEnd=0,bi.textEnd=n.length}function QM(n,e,t){for(;e<t&&n.charCodeAt(e)<=32;)e++;return e}function sA(n,e,t){for(;e<t&&n.charCodeAt(e)>32;)e++;return e}function Jo(n,e,t){return eb(n,e,t,!1),Jo}function pr(n,e){return eb(n,e,null,!0),pr}function Qg(n){aA(hA,oA,n,!0)}function oA(n,e){for(let t=iA(e);t>=0;t=KM(e,t))Du(n,nA(e),!0)}function eb(n,e,t,i){let r=lt(),s=kn(),o=Fu(2);if(s.firstUpdatePass&&nb(s,n,o,i),e!==ci&&Gs(r,o,e)){let a=s.data[ur()];ib(s,a,r,r[Lt],n,r[o+1]=mA(e,t),i,o)}}function aA(n,e,t,i){let r=kn(),s=Fu(2);r.firstUpdatePass&&nb(r,null,s,i);let o=lt();if(t!==ci&&Gs(o,s,t)){let a=r.data[ur()];if(rb(a,i)&&!tb(r,s)){let c=i?a.classesWithoutHost:a.stylesWithoutHost;c!==null&&(t=bu(c,t||"")),vg(r,a,o,t,i)}else pA(r,a,o,o[Lt],o[s+1],o[s+1]=fA(n,e,t),i,s)}}function tb(n,e){return e>=n.expandoStartIndex}function nb(n,e,t,i){let r=n.data;if(r[t+1]===null){let s=r[ur()],o=tb(n,t);rb(s,i)&&e===null&&!o&&(e=!1),e=cA(r,s,e,i),QI(r,s,e,t,o,i)}}function cA(n,e,t,i){let r=Z0(n),s=i?e.residualClasses:e.residualStyles;if(r===null)(i?e.classBindings:e.styleBindings)===0&&(t=Zm(null,n,e,t,i),t=yc(t,e.attrs,i),s=null);else{let o=e.directiveStylingLast;if(o===-1||n[o]!==r)if(t=Zm(r,n,e,t,i),s===null){let c=lA(n,e,i);c!==void 0&&Array.isArray(c)&&(c=Zm(null,n,e,c[1],i),c=yc(c,e.attrs,i),uA(n,e,i,c))}else s=dA(n,e,i)}return s!==void 0&&(i?e.residualClasses=s:e.residualStyles=s),t}function lA(n,e,t){let i=t?e.classBindings:e.styleBindings;if(Ho(i)!==0)return n[Ws(i)]}function uA(n,e,t,i){let r=t?e.classBindings:e.styleBindings;n[Ws(r)]=i}function dA(n,e,t){let i,r=e.directiveEnd;for(let s=1+e.directiveStylingLast;s<r;s++){let o=n[s].hostAttrs;i=yc(i,o,t)}return yc(i,e.attrs,t)}function Zm(n,e,t,i,r){let s=null,o=t.directiveEnd,a=t.directiveStylingLast;for(a===-1?a=t.directiveStart:a++;a<o&&(s=e[a],i=yc(i,s.hostAttrs,r),s!==n);)a++;return n!==null&&(t.directiveStylingLast=a),i}function yc(n,e,t){let i=t?1:2,r=-1;if(e!==null)for(let s=0;s<e.length;s++){let o=e[s];typeof o=="number"?r=o:r===i&&(Array.isArray(n)||(n=n===void 0?[]:["",n]),Du(n,o,t?!0:e[++s]))}return n===void 0?null:n}function fA(n,e,t){if(t==null||t==="")return Ln;let i=[],r=wg(t);if(Array.isArray(r))for(let s=0;s<r.length;s++)n(i,r[s],!0);else if(r instanceof Set)for(let s of r)n(i,s,!0);else if(typeof r=="object")for(let s in r)r.hasOwnProperty(s)&&n(i,s,r[s]);else typeof r=="string"&&e(i,r);return i}function hA(n,e,t){let i=String(e);i!==""&&!i.includes(" ")&&Du(n,i,t)}function pA(n,e,t,i,r,s,o,a){r===ci&&(r=Ln);let c=0,l=0,u=0<r.length?r[0]:null,d=0<s.length?s[0]:null;for(;u!==null||d!==null;){let f=c<r.length?r[c+1]:void 0,h=l<s.length?s[l+1]:void 0,g=null,_;u===d?(c+=2,l+=2,f!==h&&(g=d,_=h)):d===null||u!==null&&u<d?(c+=2,g=u):(l+=2,g=d,_=h),g!==null&&ib(n,e,t,i,g,_,o,a),u=c<r.length?r[c]:null,d=l<s.length?s[l]:null}}function ib(n,e,t,i,r,s,o,a){if(!(e.type&3))return;let c=n.data,l=c[a+1],u=KI(l)?Fx(c,e,t,r,Ho(l),o):void 0;if(!cd(u)){cd(s)||ZI(l)&&(s=Fx(c,null,t,r,a,o));let d=bm(ur(),t);mD(i,o,d,r,s)}}function Fx(n,e,t,i,r,s){let o=e===null,a;for(;r>0;){let c=n[r],l=Array.isArray(c),u=l?c[1]:c,d=u===null,f=t[r+1];f===ci&&(f=d?Ln:void 0);let h=d?Iu(f,i):u===i?f:void 0;if(l&&!cd(h)&&(h=Iu(c,i)),cd(h)&&(a=h,o))return a;let g=n[r+1];r=o?Ws(g):Ho(g)}if(e!==null){let c=s?e.residualClasses:e.residualStyles;c!=null&&(a=Iu(c,i))}return a}function cd(n){return n!==void 0}function mA(n,e){return n==null||n===""||(typeof e=="string"?n=n+e:typeof n=="object"&&(n=ec(wg(n)))),n}function rb(n,e){return(n.flags&(e?8:16))!==0}function Oe(n,e=""){let t=lt(),i=kn(),r=n+Tn,s=i.firstCreatePass?_d(i,r,1,e,null):i.data[r],o=gA(i,t,s,e);t[r]=o,Hu()&&Og(i,t,o,s),Lo(s,!1)}var gA=(n,e,t,i)=>(uc(!0),RT(e[Lt],i));function vA(n,e,t,i=""){return Gs(n,Lu(),t)?e+nc(t)+i:ci}function yA(n,e,t,i,r,s=""){let o=W0(),a=uI(n,o,t,r);return Fu(2),a?e+nc(t)+i+nc(r)+s:ci}function $t(n){return mr("",n),$t}function mr(n,e,t){let i=lt(),r=vA(i,n,e,t);return r!==ci&&sb(i,ur(),r),mr}function Dd(n,e,t,i,r){let s=lt(),o=yA(s,n,e,t,i,r);return o!==ci&&sb(s,ur(),o),Dd}function sb(n,e,t){let i=bm(e,n);NT(n[Lt],i,t)}var ld=class{ngModuleFactory;componentFactories;constructor(e,t){this.ngModuleFactory=e,this.componentFactories=t}},ev=(()=>{class n{compileModuleSync(t){return new ad(t)}compileModuleAsync(t){return Promise.resolve(this.compileModuleSync(t))}compileModuleAndAllComponentsSync(t){let i=this.compileModuleSync(t),r=lm(t),s=hM(r.declarations).reduce((o,a)=>{let c=kr(a);return c&&o.push(new Vo(c)),o},[]);return new ld(i,s)}compileModuleAndAllComponentsAsync(t){return Promise.resolve(this.compileModuleAndAllComponentsSync(t))}clearCache(){}clearCacheFor(t){}getModuleId(t){}static \u0275fac=function(i){return new(i||n)};static \u0275prov=Ce({token:n,factory:n.\u0275fac,providedIn:"root"})}return n})();var ob=(()=>{class n{applicationErrorHandler=Q(xi);appRef=Q(hr);taskService=Q(Gr);ngZone=Q(Ot);zonelessEnabled=Q(dc);tracing=Q(Go,{optional:!0});zoneIsDefined=typeof Zone<"u"&&!!Zone.root.run;schedulerTickApplyArgs=[{data:{__scheduler_tick__:!0}}];subscriptions=new ln;angularZoneId=this.zoneIsDefined?this.ngZone._inner?.get(Ka):null;scheduleInRootZone=!this.zonelessEnabled&&this.zoneIsDefined&&(Q(jm,{optional:!0})??!1);cancelScheduledCallback=null;useMicrotaskScheduler=!1;runningTick=!1;pendingRenderTaskId=null;constructor(){this.subscriptions.add(this.appRef.afterTick.subscribe(()=>{let t=this.taskService.add();if(!this.runningTick&&(this.cleanup(),!this.zonelessEnabled||this.appRef.includeAllTestViews)){this.taskService.remove(t);return}this.switchToMicrotaskScheduler(),this.taskService.remove(t)})),this.subscriptions.add(this.ngZone.onUnstable.subscribe(()=>{this.runningTick||this.cleanup()}))}switchToMicrotaskScheduler(){this.ngZone.runOutsideAngular(()=>{let t=this.taskService.add();this.useMicrotaskScheduler=!0,queueMicrotask(()=>{this.useMicrotaskScheduler=!1,this.taskService.remove(t)})})}notify(t){if(!this.zonelessEnabled&&t===5)return;switch(t){case 0:{this.appRef.dirtyFlags|=2;break}case 3:case 2:case 4:case 5:case 1:{this.appRef.dirtyFlags|=4;break}case 6:{this.appRef.dirtyFlags|=2;break}case 12:{this.appRef.dirtyFlags|=16;break}case 13:{this.appRef.dirtyFlags|=2;break}case 11:break;default:this.appRef.dirtyFlags|=8}if(this.appRef.tracingSnapshot=this.tracing?.snapshot(this.appRef.tracingSnapshot)??null,!this.shouldScheduleTick())return;let i=this.useMicrotaskScheduler?sx:Vm;this.pendingRenderTaskId=this.taskService.add(),this.scheduleInRootZone?this.cancelScheduledCallback=Zone.root.run(()=>i(()=>this.tick())):this.cancelScheduledCallback=this.ngZone.runOutsideAngular(()=>i(()=>this.tick()))}shouldScheduleTick(){return!(this.appRef.destroyed||this.pendingRenderTaskId!==null||this.runningTick||this.appRef._runningTick||!this.zonelessEnabled&&this.zoneIsDefined&&Zone.current.get(Ka+this.angularZoneId))}tick(){if(this.runningTick||this.appRef.destroyed)return;if(this.appRef.dirtyFlags===0){this.cleanup();return}!this.zonelessEnabled&&this.appRef.dirtyFlags&7&&(this.appRef.dirtyFlags|=1);let t=this.taskService.add();try{this.ngZone.run(()=>{this.runningTick=!0,this.appRef._tick()},void 0,this.schedulerTickApplyArgs)}catch(i){this.applicationErrorHandler(i)}finally{this.taskService.remove(t),this.cleanup()}}ngOnDestroy(){this.subscriptions.unsubscribe(),this.cleanup()}cleanup(){if(this.runningTick=!1,this.cancelScheduledCallback?.(),this.cancelScheduledCallback=null,this.pendingRenderTaskId!==null){let t=this.pendingRenderTaskId;this.pendingRenderTaskId=null,this.taskService.remove(t)}}static \u0275fac=function(i){return new(i||n)};static \u0275prov=Ce({token:n,factory:n.\u0275fac,providedIn:"root"})}return n})();function ab(){return[{provide:As,useExisting:ob},{provide:Ot,useClass:Qa},{provide:dc,useValue:!0}]}function _A(){return typeof $localize<"u"&&$localize.locale||wc}var Id=new Ie("",{factory:()=>Q(Id,{optional:!0,skipSelf:!0})||_A()});function Ci(n){return m0(n)}function Cc(n,e){return $l(n,e?.equal)}var hb=Symbol("InputSignalNode#UNSET"),kA=et(ae({},ql),{transformFn:void 0,applyValueToInputSignal(n,e){_o(n,e)}});function pb(n,e){let t=Object.create(kA);t.value=n,t.transformFn=e?.transform;function i(){if(go(t),t.value===hb){let r=null;throw new ge(-950,r)}return t.value}return i[En]=t,i}function cb(n,e){return pb(n,e)}function UA(n){return pb(hb,n)}var mb=(cb.required=UA,cb);var tv=new Ie(""),BA=new Ie("");function Tc(n){return!n.moduleRef}function VA(n){let e=Tc(n)?n.r3Injector:n.moduleRef.injector,t=e.get(Ot);return t.run(()=>{Tc(n)?n.r3Injector.resolveInjectorInitializers():n.moduleRef.resolveInjectorInitializers();let i=e.get(xi),r;if(t.runOutsideAngular(()=>{r=t.onError.subscribe({next:i})}),Tc(n)){let s=()=>e.destroy(),o=n.platformInjector.get(tv);o.add(s),e.onDestroy(()=>{r.unsubscribe(),o.delete(s)})}else{let s=()=>n.moduleRef.destroy(),o=n.platformInjector.get(tv);o.add(s),n.moduleRef.onDestroy(()=>{pc(n.allPlatformModules,n.moduleRef),r.unsubscribe(),o.delete(s)})}return zA(i,t,()=>{let s=e.get(Gr),o=s.add(),a=e.get(Kg);return a.runInitializers(),a.donePromise.then(()=>{let c=e.get(Id,wc);if(JM(c||wc),!e.get(BA,!0))return Tc(n)?e.get(hr):(n.allPlatformModules.push(n.moduleRef),n.moduleRef);if(Tc(n)){let u=e.get(hr);return n.rootComponent!==void 0&&u.bootstrap(n.rootComponent),u}else return HA?.(n.moduleRef,n.allPlatformModules),n.moduleRef}).finally(()=>{s.remove(o)})})})}var HA;function zA(n,e,t){try{let i=t();return Wo(i)?i.catch(r=>{throw e.runOutsideAngular(()=>n(r)),r}):i}catch(i){throw e.runOutsideAngular(()=>n(i)),i}}var Ad=null;function GA(n=[],e){return Fn.create({name:e,providers:[{provide:rc,useValue:"platform"},{provide:tv,useValue:new Set([()=>Ad=null])},...n]})}function jA(n=[]){if(Ad)return Ad;let e=GA(n);return Ad=e,XM(),WA(e),e}function WA(n){let e=n.get(hd,null);vn(n,()=>{e?.forEach(t=>t())})}function gb(){return!1}var $A=1e4;var P$=$A-1e3;var lv=(()=>{class n{static __NG_ELEMENT_ID__=qA}return n})();function qA(n){return XA(In(),lt(),(n&16)===16)}function XA(n,e,t){if(ar(n)&&!t){let i=ai(n.index,e);return new jr(i,i)}else if(n.type&175){let i=e[si];return new jr(i,e)}return null}var nv=class{supports(e){return $g(e)}create(e){return new iv(e)}},YA=(n,e)=>e,iv=class{length=0;collection;_linkedRecords=null;_unlinkedRecords=null;_previousItHead=null;_itHead=null;_itTail=null;_additionsHead=null;_additionsTail=null;_movesHead=null;_movesTail=null;_removalsHead=null;_removalsTail=null;_identityChangesHead=null;_identityChangesTail=null;_trackByFn;constructor(e){this._trackByFn=e||YA}forEachItem(e){let t;for(t=this._itHead;t!==null;t=t._next)e(t)}forEachOperation(e){let t=this._itHead,i=this._removalsHead,r=0,s=null;for(;t||i;){let o=!i||t&&t.currentIndex<lb(i,r,s)?t:i,a=lb(o,r,s),c=o.currentIndex;if(o===i)r--,i=i._nextRemoved;else if(t=t._next,o.previousIndex==null)r++;else{s||(s=[]);let l=a-r,u=c-r;if(l!=u){for(let f=0;f<l;f++){let h=f<s.length?s[f]:s[f]=0,g=h+f;u<=g&&g<l&&(s[f]=h+1)}let d=o.previousIndex;s[d]=u-l}}a!==c&&e(o,a,c)}}forEachPreviousItem(e){let t;for(t=this._previousItHead;t!==null;t=t._nextPrevious)e(t)}forEachAddedItem(e){let t;for(t=this._additionsHead;t!==null;t=t._nextAdded)e(t)}forEachMovedItem(e){let t;for(t=this._movesHead;t!==null;t=t._nextMoved)e(t)}forEachRemovedItem(e){let t;for(t=this._removalsHead;t!==null;t=t._nextRemoved)e(t)}forEachIdentityChange(e){let t;for(t=this._identityChangesHead;t!==null;t=t._nextIdentityChange)e(t)}diff(e){if(e==null&&(e=[]),!$g(e))throw new ge(900,!1);return this.check(e)?this:null}onDestroy(){}check(e){this._reset();let t=this._itHead,i=!1,r,s,o;if(Array.isArray(e)){this.length=e.length;for(let a=0;a<this.length;a++)s=e[a],o=this._trackByFn(a,s),t===null||!Object.is(t.trackById,o)?(t=this._mismatch(t,s,o,a),i=!0):(i&&(t=this._verifyReinsertion(t,s,o,a)),Object.is(t.item,s)||this._addIdentityChange(t,s)),t=t._next}else r=0,BM(e,a=>{o=this._trackByFn(r,a),t===null||!Object.is(t.trackById,o)?(t=this._mismatch(t,a,o,r),i=!0):(i&&(t=this._verifyReinsertion(t,a,o,r)),Object.is(t.item,a)||this._addIdentityChange(t,a)),t=t._next,r++}),this.length=r;return this._truncate(t),this.collection=e,this.isDirty}get isDirty(){return this._additionsHead!==null||this._movesHead!==null||this._removalsHead!==null||this._identityChangesHead!==null}_reset(){if(this.isDirty){let e;for(e=this._previousItHead=this._itHead;e!==null;e=e._next)e._nextPrevious=e._next;for(e=this._additionsHead;e!==null;e=e._nextAdded)e.previousIndex=e.currentIndex;for(this._additionsHead=this._additionsTail=null,e=this._movesHead;e!==null;e=e._nextMoved)e.previousIndex=e.currentIndex;this._movesHead=this._movesTail=null,this._removalsHead=this._removalsTail=null,this._identityChangesHead=this._identityChangesTail=null}}_mismatch(e,t,i,r){let s;return e===null?s=this._itTail:(s=e._prev,this._remove(e)),e=this._unlinkedRecords===null?null:this._unlinkedRecords.get(i,null),e!==null?(Object.is(e.item,t)||this._addIdentityChange(e,t),this._reinsertAfter(e,s,r)):(e=this._linkedRecords===null?null:this._linkedRecords.get(i,r),e!==null?(Object.is(e.item,t)||this._addIdentityChange(e,t),this._moveAfter(e,s,r)):e=this._addAfter(new rv(t,i),s,r)),e}_verifyReinsertion(e,t,i,r){let s=this._unlinkedRecords===null?null:this._unlinkedRecords.get(i,null);return s!==null?e=this._reinsertAfter(s,e._prev,r):e.currentIndex!=r&&(e.currentIndex=r,this._addToMoves(e,r)),e}_truncate(e){for(;e!==null;){let t=e._next;this._addToRemovals(this._unlink(e)),e=t}this._unlinkedRecords!==null&&this._unlinkedRecords.clear(),this._additionsTail!==null&&(this._additionsTail._nextAdded=null),this._movesTail!==null&&(this._movesTail._nextMoved=null),this._itTail!==null&&(this._itTail._next=null),this._removalsTail!==null&&(this._removalsTail._nextRemoved=null),this._identityChangesTail!==null&&(this._identityChangesTail._nextIdentityChange=null)}_reinsertAfter(e,t,i){this._unlinkedRecords!==null&&this._unlinkedRecords.remove(e);let r=e._prevRemoved,s=e._nextRemoved;return r===null?this._removalsHead=s:r._nextRemoved=s,s===null?this._removalsTail=r:s._prevRemoved=r,this._insertAfter(e,t,i),this._addToMoves(e,i),e}_moveAfter(e,t,i){return this._unlink(e),this._insertAfter(e,t,i),this._addToMoves(e,i),e}_addAfter(e,t,i){return this._insertAfter(e,t,i),this._additionsTail===null?this._additionsTail=this._additionsHead=e:this._additionsTail=this._additionsTail._nextAdded=e,e}_insertAfter(e,t,i){let r=t===null?this._itHead:t._next;return e._next=r,e._prev=t,r===null?this._itTail=e:r._prev=e,t===null?this._itHead=e:t._next=e,this._linkedRecords===null&&(this._linkedRecords=new Rd),this._linkedRecords.put(e),e.currentIndex=i,e}_remove(e){return this._addToRemovals(this._unlink(e))}_unlink(e){this._linkedRecords!==null&&this._linkedRecords.remove(e);let t=e._prev,i=e._next;return t===null?this._itHead=i:t._next=i,i===null?this._itTail=t:i._prev=t,e}_addToMoves(e,t){return e.previousIndex===t||(this._movesTail===null?this._movesTail=this._movesHead=e:this._movesTail=this._movesTail._nextMoved=e),e}_addToRemovals(e){return this._unlinkedRecords===null&&(this._unlinkedRecords=new Rd),this._unlinkedRecords.put(e),e.currentIndex=null,e._nextRemoved=null,this._removalsTail===null?(this._removalsTail=this._removalsHead=e,e._prevRemoved=null):(e._prevRemoved=this._removalsTail,this._removalsTail=this._removalsTail._nextRemoved=e),e}_addIdentityChange(e,t){return e.item=t,this._identityChangesTail===null?this._identityChangesTail=this._identityChangesHead=e:this._identityChangesTail=this._identityChangesTail._nextIdentityChange=e,e}},rv=class{item;trackById;currentIndex=null;previousIndex=null;_nextPrevious=null;_prev=null;_next=null;_prevDup=null;_nextDup=null;_prevRemoved=null;_nextRemoved=null;_nextAdded=null;_nextMoved=null;_nextIdentityChange=null;constructor(e,t){this.item=e,this.trackById=t}},sv=class{_head=null;_tail=null;add(e){this._head===null?(this._head=this._tail=e,e._nextDup=null,e._prevDup=null):(this._tail._nextDup=e,e._prevDup=this._tail,e._nextDup=null,this._tail=e)}get(e,t){let i;for(i=this._head;i!==null;i=i._nextDup)if((t===null||t<=i.currentIndex)&&Object.is(i.trackById,e))return i;return null}remove(e){let t=e._prevDup,i=e._nextDup;return t===null?this._head=i:t._nextDup=i,i===null?this._tail=t:i._prevDup=t,this._head===null}},Rd=class{map=new Map;put(e){let t=e.trackById,i=this.map.get(t);i||(i=new sv,this.map.set(t,i)),i.add(e)}get(e,t){let i=e,r=this.map.get(i);return r?r.get(e,t):null}remove(e){let t=e.trackById;return this.map.get(t).remove(e)&&this.map.delete(t),e}get isEmpty(){return this.map.size===0}clear(){this.map.clear()}};function lb(n,e,t){let i=n.previousIndex;if(i===null)return i;let r=0;return t&&i<t.length&&(r=t[i]),i+e+r}var ov=class{supports(e){return e instanceof Map||Md(e)}create(){return new av}},av=class{_records=new Map;_mapHead=null;_appendAfter=null;_previousMapHead=null;_changesHead=null;_changesTail=null;_additionsHead=null;_additionsTail=null;_removalsHead=null;get isDirty(){return this._additionsHead!==null||this._changesHead!==null||this._removalsHead!==null}forEachItem(e){let t;for(t=this._mapHead;t!==null;t=t._next)e(t)}forEachPreviousItem(e){let t;for(t=this._previousMapHead;t!==null;t=t._nextPrevious)e(t)}forEachChangedItem(e){let t;for(t=this._changesHead;t!==null;t=t._nextChanged)e(t)}forEachAddedItem(e){let t;for(t=this._additionsHead;t!==null;t=t._nextAdded)e(t)}forEachRemovedItem(e){let t;for(t=this._removalsHead;t!==null;t=t._nextRemoved)e(t)}diff(e){if(!e)e=new Map;else if(!(e instanceof Map||Md(e)))throw new ge(900,!1);return this.check(e)?this:null}check(e){this._reset();let t=this._mapHead;if(this._appendAfter=null,this._forEach(e,(i,r)=>{if(t&&t.key===r)this._maybeAddToChanges(t,i),this._appendAfter=t,t=t._next;else{let s=this._getOrCreateRecordForKey(r,i);t=this._insertBeforeOrAppend(t,s)}}),t){t._prev&&(t._prev._next=null),this._removalsHead=t;for(let i=t;i!==null;i=i._nextRemoved)i===this._mapHead&&(this._mapHead=null),this._records.delete(i.key),i._nextRemoved=i._next,i.previousValue=i.currentValue,i.currentValue=null,i._prev=null,i._next=null}return this._changesTail&&(this._changesTail._nextChanged=null),this._additionsTail&&(this._additionsTail._nextAdded=null),this.isDirty}_insertBeforeOrAppend(e,t){if(e){let i=e._prev;return t._next=e,t._prev=i,e._prev=t,i&&(i._next=t),e===this._mapHead&&(this._mapHead=t),this._appendAfter=e,e}return this._appendAfter?(this._appendAfter._next=t,t._prev=this._appendAfter):this._mapHead=t,this._appendAfter=t,null}_getOrCreateRecordForKey(e,t){if(this._records.has(e)){let r=this._records.get(e);this._maybeAddToChanges(r,t);let s=r._prev,o=r._next;return s&&(s._next=o),o&&(o._prev=s),r._next=null,r._prev=null,r}let i=new cv(e);return this._records.set(e,i),i.currentValue=t,this._addToAdditions(i),i}_reset(){if(this.isDirty){let e;for(this._previousMapHead=this._mapHead,e=this._previousMapHead;e!==null;e=e._next)e._nextPrevious=e._next;for(e=this._changesHead;e!==null;e=e._nextChanged)e.previousValue=e.currentValue;for(e=this._additionsHead;e!=null;e=e._nextAdded)e.previousValue=e.currentValue;this._changesHead=this._changesTail=null,this._additionsHead=this._additionsTail=null,this._removalsHead=null}}_maybeAddToChanges(e,t){Object.is(t,e.currentValue)||(e.previousValue=e.currentValue,e.currentValue=t,this._addToChanges(e))}_addToAdditions(e){this._additionsHead===null?this._additionsHead=this._additionsTail=e:(this._additionsTail._nextAdded=e,this._additionsTail=e)}_addToChanges(e){this._changesHead===null?this._changesHead=this._changesTail=e:(this._changesTail._nextChanged=e,this._changesTail=e)}_forEach(e,t){e instanceof Map?e.forEach(t):Object.keys(e).forEach(i=>t(e[i],i))}},cv=class{key;previousValue=null;currentValue=null;_nextPrevious=null;_next=null;_prev=null;_nextAdded=null;_nextRemoved=null;_nextChanged=null;constructor(e){this.key=e}};function ub(){return new uv([new nv])}var uv=(()=>{class n{factories;static \u0275prov=Ce({token:n,providedIn:"root",factory:ub});constructor(t){this.factories=t}static create(t,i){if(i!=null){let r=i.factories.slice();t=t.concat(r)}return new n(t)}static extend(t){return{provide:n,useFactory:()=>{let i=Q(n,{optional:!0,skipSelf:!0});return n.create(t,i||ub())}}}find(t){let i=this.factories.find(r=>r.supports(t));if(i!=null)return i;throw new ge(901,!1)}}return n})();function db(){return new dv([new ov])}var dv=(()=>{class n{static \u0275prov=Ce({token:n,providedIn:"root",factory:db});factories;constructor(t){this.factories=t}static create(t,i){if(i){let r=i.factories.slice();t=t.concat(r)}return new n(t)}static extend(t){return{provide:n,useFactory:()=>{let i=Q(n,{optional:!0,skipSelf:!0});return n.create(t,i||db())}}}find(t){let i=this.factories.find(r=>r.supports(t));if(i)return i;throw new ge(901,!1)}}return n})();function vb(n){let{rootComponent:e,appProviders:t,platformProviders:i,platformRef:r}=n;St(ut.BootstrapApplicationStart);try{let s=r?.injector??jA(i),o=[ab(),ax,...t||[]],a=new vc({providers:o,parent:s,debugName:"",runEnvironmentInitializers:!1});return VA({r3Injector:a.injector,platformInjector:s,rootComponent:e})}catch(s){return Promise.reject(s)}finally{St(ut.BootstrapApplicationEnd)}}var yb=null;function gr(){return yb}function fv(n){yb??=n}var Dc=class{},Pd=(()=>{class n{historyGo(t){throw new Error("")}static \u0275fac=function(i){return new(i||n)};static \u0275prov=Ce({token:n,factory:()=>Q(_b),providedIn:"platform"})}return n})();var _b=(()=>{class n extends Pd{_location;_history;_doc=Q(Yt);constructor(){super(),this._location=window.location,this._history=window.history}getBaseHrefFromDOM(){return gr().getBaseHref(this._doc)}onPopState(t){let i=gr().getGlobalEventTarget(this._doc,"window");return i.addEventListener("popstate",t,!1),()=>i.removeEventListener("popstate",t)}onHashChange(t){let i=gr().getGlobalEventTarget(this._doc,"window");return i.addEventListener("hashchange",t,!1),()=>i.removeEventListener("hashchange",t)}get href(){return this._location.href}get protocol(){return this._location.protocol}get hostname(){return this._location.hostname}get port(){return this._location.port}get pathname(){return this._location.pathname}get search(){return this._location.search}get hash(){return this._location.hash}set pathname(t){this._location.pathname=t}pushState(t,i,r){this._history.pushState(t,i,r)}replaceState(t,i,r){this._history.replaceState(t,i,r)}forward(){this._history.forward()}back(){this._history.back()}historyGo(t=0){this._history.go(t)}getState(){return this._history.state}static \u0275fac=function(i){return new(i||n)};static \u0275prov=Ce({token:n,factory:()=>new n,providedIn:"platform"})}return n})();function bb(n,e){return n?e?n.endsWith("/")?e.startsWith("/")?n+e.slice(1):n+e:e.startsWith("/")?n+e:`${n}/${e}`:n:e}function xb(n){let e=n.search(/#|\?|$/);return n[e-1]==="/"?n.slice(0,e-1)+n.slice(e):n}function $r(n){return n&&n[0]!=="?"?`?${n}`:n}var Od=(()=>{class n{historyGo(t){throw new Error("")}static \u0275fac=function(i){return new(i||n)};static \u0275prov=Ce({token:n,factory:()=>Q(JA),providedIn:"root"})}return n})(),ZA=new Ie(""),JA=(()=>{class n extends Od{_platformLocation;_baseHref;_removeListenerFns=[];constructor(t,i){super(),this._platformLocation=t,this._baseHref=i??this._platformLocation.getBaseHrefFromDOM()??Q(Yt).location?.origin??""}ngOnDestroy(){for(;this._removeListenerFns.length;)this._removeListenerFns.pop()()}onPopState(t){this._removeListenerFns.push(this._platformLocation.onPopState(t),this._platformLocation.onHashChange(t))}getBaseHref(){return this._baseHref}prepareExternalUrl(t){return bb(this._baseHref,t)}path(t=!1){let i=this._platformLocation.pathname+$r(this._platformLocation.search),r=this._platformLocation.hash;return r&&t?`${i}${r}`:i}pushState(t,i,r,s){let o=this.prepareExternalUrl(r+$r(s));this._platformLocation.pushState(t,i,o)}replaceState(t,i,r,s){let o=this.prepareExternalUrl(r+$r(s));this._platformLocation.replaceState(t,i,o)}forward(){this._platformLocation.forward()}back(){this._platformLocation.back()}getState(){return this._platformLocation.getState()}historyGo(t=0){this._platformLocation.historyGo?.(t)}static \u0275fac=function(i){return new(i||n)(Re(Pd),Re(ZA,8))};static \u0275prov=Ce({token:n,factory:n.\u0275fac,providedIn:"root"})}return n})();var Ko=(()=>{class n{_subject=new Ht;_basePath;_locationStrategy;_urlChangeListeners=[];_urlChangeSubscription=null;constructor(t){this._locationStrategy=t;let i=this._locationStrategy.getBaseHref();this._basePath=eR(xb(Mb(i))),this._locationStrategy.onPopState(r=>{this._subject.next({url:this.path(!0),pop:!0,state:r.state,type:r.type})})}ngOnDestroy(){this._urlChangeSubscription?.unsubscribe(),this._urlChangeListeners=[]}path(t=!1){return this.normalize(this._locationStrategy.path(t))}getState(){return this._locationStrategy.getState()}isCurrentPathEqualTo(t,i=""){return this.path()==this.normalize(t+$r(i))}normalize(t){return n.stripTrailingSlash(QA(this._basePath,Mb(t)))}prepareExternalUrl(t){return t&&t[0]!=="/"&&(t="/"+t),this._locationStrategy.prepareExternalUrl(t)}go(t,i="",r=null){this._locationStrategy.pushState(r,"",t,i),this._notifyUrlChangeListeners(this.prepareExternalUrl(t+$r(i)),r)}replaceState(t,i="",r=null){this._locationStrategy.replaceState(r,"",t,i),this._notifyUrlChangeListeners(this.prepareExternalUrl(t+$r(i)),r)}forward(){this._locationStrategy.forward()}back(){this._locationStrategy.back()}historyGo(t=0){this._locationStrategy.historyGo?.(t)}onUrlChange(t){return this._urlChangeListeners.push(t),this._urlChangeSubscription??=this.subscribe(i=>{this._notifyUrlChangeListeners(i.url,i.state)}),()=>{let i=this._urlChangeListeners.indexOf(t);this._urlChangeListeners.splice(i,1),this._urlChangeListeners.length===0&&(this._urlChangeSubscription?.unsubscribe(),this._urlChangeSubscription=null)}}_notifyUrlChangeListeners(t="",i){this._urlChangeListeners.forEach(r=>r(t,i))}subscribe(t,i,r){return this._subject.subscribe({next:t,error:i??void 0,complete:r??void 0})}static normalizeQueryParams=$r;static joinWithSlash=bb;static stripTrailingSlash=xb;static \u0275fac=function(i){return new(i||n)(Re(Od))};static \u0275prov=Ce({token:n,factory:()=>KA(),providedIn:"root"})}return n})();function KA(){return new Ko(Re(Od))}function QA(n,e){if(!n||!e.startsWith(n))return e;let t=e.substring(n.length);return t===""||["/",";","?","#"].includes(t[0])?t:e}function Mb(n){return n.replace(/\/index.html$/,"")}function eR(n){if(new RegExp("^(https?:)?//").test(n)){let[,t]=n.split(/\/\/[^\/]+/);return t}return n}var Ld=class{$implicit;ngForOf;index;count;constructor(e,t,i,r){this.$implicit=e,this.ngForOf=t,this.index=i,this.count=r}get first(){return this.index===0}get last(){return this.index===this.count-1}get even(){return this.index%2===0}get odd(){return!this.even}},kd=(()=>{class n{_viewContainer;_template;_differs;set ngForOf(t){this._ngForOf=t,this._ngForOfDirty=!0}set ngForTrackBy(t){this._trackByFn=t}get ngForTrackBy(){return this._trackByFn}_ngForOf=null;_ngForOfDirty=!0;_differ=null;_trackByFn;constructor(t,i,r){this._viewContainer=t,this._template=i,this._differs=r}set ngForTemplate(t){t&&(this._template=t)}ngDoCheck(){if(this._ngForOfDirty){this._ngForOfDirty=!1;let t=this._ngForOf;!this._differ&&t&&(this._differ=this._differs.find(t).create(this.ngForTrackBy))}if(this._differ){let t=this._differ.diff(this._ngForOf);t&&this._applyChanges(t)}}_applyChanges(t){let i=this._viewContainer;t.forEachOperation((r,s,o)=>{if(r.previousIndex==null)i.createEmbeddedView(this._template,new Ld(r.item,this._ngForOf,-1,-1),o===null?void 0:o);else if(o==null)i.remove(s===null?void 0:s);else if(s!==null){let a=i.get(s);i.move(a,o),Sb(a,r)}});for(let r=0,s=i.length;r<s;r++){let a=i.get(r).context;a.index=r,a.count=s,a.ngForOf=this._ngForOf}t.forEachIdentityChange(r=>{let s=i.get(r.currentIndex);Sb(s,r)})}static ngTemplateContextGuard(t,i){return!0}static \u0275fac=function(i){return new(i||n)(fn(fr),fn(Wr),fn(uv))};static \u0275dir=qs({type:n,selectors:[["","ngFor","","ngForOf",""]],inputs:{ngForOf:"ngForOf",ngForTrackBy:"ngForTrackBy",ngForTemplate:"ngForTemplate"}})}return n})();function Sb(n,e){n.context.$implicit=e.item}var Ic=(()=>{class n{_viewContainer;_context=new Fd;_thenTemplateRef=null;_elseTemplateRef=null;_thenViewRef=null;_elseViewRef=null;constructor(t,i){this._viewContainer=t,this._thenTemplateRef=i}set ngIf(t){this._context.$implicit=this._context.ngIf=t,this._updateView()}set ngIfThen(t){Eb(t,!1),this._thenTemplateRef=t,this._thenViewRef=null,this._updateView()}set ngIfElse(t){Eb(t,!1),this._elseTemplateRef=t,this._elseViewRef=null,this._updateView()}_updateView(){this._context.$implicit?this._thenViewRef||(this._viewContainer.clear(),this._elseViewRef=null,this._thenTemplateRef&&(this._thenViewRef=this._viewContainer.createEmbeddedView(this._thenTemplateRef,this._context))):this._elseViewRef||(this._viewContainer.clear(),this._thenViewRef=null,this._elseTemplateRef&&(this._elseViewRef=this._viewContainer.createEmbeddedView(this._elseTemplateRef,this._context)))}static ngIfUseIfTypeGuard;static ngTemplateGuard_ngIf;static ngTemplateContextGuard(t,i){return!0}static \u0275fac=function(i){return new(i||n)(fn(fr),fn(Wr))};static \u0275dir=qs({type:n,selectors:[["","ngIf",""]],inputs:{ngIf:"ngIf",ngIfThen:"ngIfThen",ngIfElse:"ngIfElse"}})}return n})(),Fd=class{$implicit=null;ngIf=null};function Eb(n,e){if(n&&!n.createEmbeddedView)throw new ge(2020,!1)}var hv=(()=>{class n{_ngEl;_differs;_renderer;_ngStyle=null;_differ=null;constructor(t,i,r){this._ngEl=t,this._differs=i,this._renderer=r}set ngStyle(t){this._ngStyle=t,!this._differ&&t&&(this._differ=this._differs.find(t).create())}ngDoCheck(){if(this._differ){let t=this._differ.diff(this._ngStyle);t&&this._applyChanges(t)}}_setStyle(t,i){let[r,s]=t.split("."),o=r.indexOf("-")===-1?void 0:Ei.DashCase;i!=null?this._renderer.setStyle(this._ngEl.nativeElement,r,s?`${i}${s}`:i,o):this._renderer.removeStyle(this._ngEl.nativeElement,r,o)}_applyChanges(t){t.forEachRemovedItem(i=>this._setStyle(i.key,null)),t.forEachAddedItem(i=>this._setStyle(i.key,i.currentValue)),t.forEachChangedItem(i=>this._setStyle(i.key,i.currentValue))}static \u0275fac=function(i){return new(i||n)(fn($s),fn(dv),fn(Gg))};static \u0275dir=qs({type:n,selectors:[["","ngStyle",""]],inputs:{ngStyle:"ngStyle"}})}return n})();var qr=(()=>{class n{static \u0275fac=function(i){return new(i||n)};static \u0275mod=jo({type:n});static \u0275inj=Rs({})}return n})();function pv(n,e){e=encodeURIComponent(e);for(let t of n.split(";")){let i=t.indexOf("="),[r,s]=i==-1?[t,""]:[t.slice(0,i),t.slice(i+1)];if(r.trim()===e)return decodeURIComponent(s)}return null}var Ac=class{};var wb="browser";var Rc=class{_doc;constructor(e){this._doc=e}manager},Ud=(()=>{class n extends Rc{constructor(t){super(t)}supports(t){return!0}addEventListener(t,i,r,s){return t.addEventListener(i,r,s),()=>this.removeEventListener(t,i,r,s)}removeEventListener(t,i,r,s){return t.removeEventListener(i,r,s)}static \u0275fac=function(i){return new(i||n)(Re(Yt))};static \u0275prov=Ce({token:n,factory:n.\u0275fac})}return n})(),Hd=new Ie(""),yv=(()=>{class n{_zone;_plugins;_eventNameToPlugin=new Map;constructor(t,i){this._zone=i,t.forEach(o=>{o.manager=this});let r=t.filter(o=>!(o instanceof Ud));this._plugins=r.slice().reverse();let s=t.find(o=>o instanceof Ud);s&&this._plugins.push(s)}addEventListener(t,i,r,s){return this._findPluginFor(i).addEventListener(t,i,r,s)}getZone(){return this._zone}_findPluginFor(t){let i=this._eventNameToPlugin.get(t);if(i)return i;if(i=this._plugins.find(s=>s.supports(t)),!i)throw new ge(5101,!1);return this._eventNameToPlugin.set(t,i),i}static \u0275fac=function(i){return new(i||n)(Re(Hd),Re(Ot))};static \u0275prov=Ce({token:n,factory:n.\u0275fac})}return n})(),mv="ng-app-id";function Tb(n){for(let e of n)e.remove()}function Db(n,e){let t=e.createElement("style");return t.textContent=n,t}function tR(n,e,t,i){let r=n.head?.querySelectorAll(`style[${mv}="${e}"],link[${mv}="${e}"]`);if(r)for(let s of r)s.removeAttribute(mv),s instanceof HTMLLinkElement?i.set(s.href.slice(s.href.lastIndexOf("/")+1),{usage:0,elements:[s]}):s.textContent&&t.set(s.textContent,{usage:0,elements:[s]})}function vv(n,e){let t=e.createElement("link");return t.setAttribute("rel","stylesheet"),t.setAttribute("href",n),t}var _v=(()=>{class n{doc;appId;nonce;inline=new Map;external=new Map;hosts=new Set;constructor(t,i,r,s={}){this.doc=t,this.appId=i,this.nonce=r,tR(t,i,this.inline,this.external),this.hosts.add(t.head)}addStyles(t,i){for(let r of t)this.addUsage(r,this.inline,Db);i?.forEach(r=>this.addUsage(r,this.external,vv))}removeStyles(t,i){for(let r of t)this.removeUsage(r,this.inline);i?.forEach(r=>this.removeUsage(r,this.external))}addUsage(t,i,r){let s=i.get(t);s?s.usage++:i.set(t,{usage:1,elements:[...this.hosts].map(o=>this.addElement(o,r(t,this.doc)))})}removeUsage(t,i){let r=i.get(t);r&&(r.usage--,r.usage<=0&&(Tb(r.elements),i.delete(t)))}ngOnDestroy(){for(let[,{elements:t}]of[...this.inline,...this.external])Tb(t);this.hosts.clear()}addHost(t){this.hosts.add(t);for(let[i,{elements:r}]of this.inline)r.push(this.addElement(t,Db(i,this.doc)));for(let[i,{elements:r}]of this.external)r.push(this.addElement(t,vv(i,this.doc)))}removeHost(t){this.hosts.delete(t)}addElement(t,i){return this.nonce&&i.setAttribute("nonce",this.nonce),t.appendChild(i)}static \u0275fac=function(i){return new(i||n)(Re(Yt),Re(fd),Re(pd,8),Re(Mc))};static \u0275prov=Ce({token:n,factory:n.\u0275fac})}return n})(),gv={svg:"http://www.w3.org/2000/svg",xhtml:"http://www.w3.org/1999/xhtml",xlink:"http://www.w3.org/1999/xlink",xml:"http://www.w3.org/XML/1998/namespace",xmlns:"http://www.w3.org/2000/xmlns/",math:"http://www.w3.org/1998/Math/MathML"},xv=/%COMP%/g;var Ab="%COMP%",nR=`_nghost-${Ab}`,iR=`_ngcontent-${Ab}`,rR=!0,sR=new Ie("",{factory:()=>rR});function oR(n){return iR.replace(xv,n)}function aR(n){return nR.replace(xv,n)}function Rb(n,e){return e.map(t=>t.replace(xv,n))}var Mv=(()=>{class n{eventManager;sharedStylesHost;appId;removeStylesOnCompDestroy;doc;ngZone;nonce;tracingService;rendererByCompId=new Map;defaultRenderer;constructor(t,i,r,s,o,a,c=null,l=null){this.eventManager=t,this.sharedStylesHost=i,this.appId=r,this.removeStylesOnCompDestroy=s,this.doc=o,this.ngZone=a,this.nonce=c,this.tracingService=l,this.defaultRenderer=new Nc(t,o,a,this.tracingService)}createRenderer(t,i){if(!t||!i)return this.defaultRenderer;let r=this.getOrCreateRenderer(t,i);return r instanceof Vd?r.applyToHost(t):r instanceof Pc&&r.applyStyles(),r}getOrCreateRenderer(t,i){let r=this.rendererByCompId,s=r.get(i.id);if(!s){let o=this.doc,a=this.ngZone,c=this.eventManager,l=this.sharedStylesHost,u=this.removeStylesOnCompDestroy,d=this.tracingService;switch(i.encapsulation){case Si.Emulated:s=new Vd(c,l,i,this.appId,u,o,a,d);break;case Si.ShadowDom:return new Bd(c,t,i,o,a,this.nonce,d,l);case Si.ExperimentalIsolatedShadowDom:return new Bd(c,t,i,o,a,this.nonce,d);default:s=new Pc(c,l,i,u,o,a,d);break}r.set(i.id,s)}return s}ngOnDestroy(){this.rendererByCompId.clear()}componentReplaced(t){this.rendererByCompId.delete(t)}static \u0275fac=function(i){return new(i||n)(Re(yv),Re(_v),Re(fd),Re(sR),Re(Yt),Re(Ot),Re(pd),Re(Go,8))};static \u0275prov=Ce({token:n,factory:n.\u0275fac})}return n})(),Nc=class{eventManager;doc;ngZone;tracingService;data=Object.create(null);throwOnSyntheticProps=!0;constructor(e,t,i,r){this.eventManager=e,this.doc=t,this.ngZone=i,this.tracingService=r}destroy(){}destroyNode=null;createElement(e,t){return t?this.doc.createElementNS(gv[t]||t,e):this.doc.createElement(e)}createComment(e){return this.doc.createComment(e)}createText(e){return this.doc.createTextNode(e)}appendChild(e,t){(Ib(e)?e.content:e).appendChild(t)}insertBefore(e,t,i){e&&(Ib(e)?e.content:e).insertBefore(t,i)}removeChild(e,t){t.remove()}selectRootElement(e,t){let i=typeof e=="string"?this.doc.querySelector(e):e;if(!i)throw new ge(-5104,!1);return t||(i.textContent=""),i}parentNode(e){return e.parentNode}nextSibling(e){return e.nextSibling}setAttribute(e,t,i,r){if(r){t=r+":"+t;let s=gv[r];s?e.setAttributeNS(s,t,i):e.setAttribute(t,i)}else e.setAttribute(t,i)}removeAttribute(e,t,i){if(i){let r=gv[i];r?e.removeAttributeNS(r,t):e.removeAttribute(`${i}:${t}`)}else e.removeAttribute(t)}addClass(e,t){e.classList.add(t)}removeClass(e,t){e.classList.remove(t)}setStyle(e,t,i,r){r&(Ei.DashCase|Ei.Important)?e.style.setProperty(t,i,r&Ei.Important?"important":""):e.style[t]=i}removeStyle(e,t,i){i&Ei.DashCase?e.style.removeProperty(t):e.style[t]=""}setProperty(e,t,i){e!=null&&(e[t]=i)}setValue(e,t){e.nodeValue=t}listen(e,t,i,r){if(typeof e=="string"&&(e=gr().getGlobalEventTarget(this.doc,e),!e))throw new ge(5102,!1);let s=this.decoratePreventDefault(i);return this.tracingService?.wrapEventListener&&(s=this.tracingService.wrapEventListener(e,t,s)),this.eventManager.addEventListener(e,t,s,r)}decoratePreventDefault(e){return t=>{if(t==="__ngUnwrap__")return e;e(t)===!1&&t.preventDefault()}}};function Ib(n){return n.tagName==="TEMPLATE"&&n.content!==void 0}var Bd=class extends Nc{hostEl;sharedStylesHost;shadowRoot;constructor(e,t,i,r,s,o,a,c){super(e,r,s,a),this.hostEl=t,this.sharedStylesHost=c,this.shadowRoot=t.attachShadow({mode:"open"}),this.sharedStylesHost&&this.sharedStylesHost.addHost(this.shadowRoot);let l=i.styles;l=Rb(i.id,l);for(let d of l){let f=document.createElement("style");o&&f.setAttribute("nonce",o),f.textContent=d,this.shadowRoot.appendChild(f)}let u=i.getExternalStyles?.();if(u)for(let d of u){let f=vv(d,r);o&&f.setAttribute("nonce",o),this.shadowRoot.appendChild(f)}}nodeOrShadowRoot(e){return e===this.hostEl?this.shadowRoot:e}appendChild(e,t){return super.appendChild(this.nodeOrShadowRoot(e),t)}insertBefore(e,t,i){return super.insertBefore(this.nodeOrShadowRoot(e),t,i)}removeChild(e,t){return super.removeChild(null,t)}parentNode(e){return this.nodeOrShadowRoot(super.parentNode(this.nodeOrShadowRoot(e)))}destroy(){this.sharedStylesHost&&this.sharedStylesHost.removeHost(this.shadowRoot)}},Pc=class extends Nc{sharedStylesHost;removeStylesOnCompDestroy;styles;styleUrls;constructor(e,t,i,r,s,o,a,c){super(e,s,o,a),this.sharedStylesHost=t,this.removeStylesOnCompDestroy=r;let l=i.styles;this.styles=c?Rb(c,l):l,this.styleUrls=i.getExternalStyles?.(c)}applyStyles(){this.sharedStylesHost.addStyles(this.styles,this.styleUrls)}destroy(){this.removeStylesOnCompDestroy&&Bo.size===0&&this.sharedStylesHost.removeStyles(this.styles,this.styleUrls)}},Vd=class extends Pc{contentAttr;hostAttr;constructor(e,t,i,r,s,o,a,c){let l=r+"-"+i.id;super(e,t,i,s,o,a,c,l),this.contentAttr=oR(l),this.hostAttr=aR(l)}applyToHost(e){this.applyStyles(),this.setAttribute(e,this.hostAttr,"")}createElement(e,t){let i=super.createElement(e,t);return super.setAttribute(i,this.contentAttr,""),i}};var zd=class n extends Dc{supportsDOMEvents=!0;static makeCurrent(){fv(new n)}onAndCancel(e,t,i,r){return e.addEventListener(t,i,r),()=>{e.removeEventListener(t,i,r)}}dispatchEvent(e,t){e.dispatchEvent(t)}remove(e){e.remove()}createElement(e,t){return t=t||this.getDefaultDocument(),t.createElement(e)}createHtmlDocument(){return document.implementation.createHTMLDocument("fakeTitle")}getDefaultDocument(){return document}isElementNode(e){return e.nodeType===Node.ELEMENT_NODE}isShadowRoot(e){return e instanceof DocumentFragment}getGlobalEventTarget(e,t){return t==="window"?window:t==="document"?e:t==="body"?e.body:null}getBaseHref(e){let t=cR();return t==null?null:lR(t)}resetBaseElement(){Oc=null}getUserAgent(){return window.navigator.userAgent}getCookie(e){return pv(document.cookie,e)}},Oc=null;function cR(){return Oc=Oc||document.head.querySelector("base"),Oc?Oc.getAttribute("href"):null}function lR(n){return new URL(n,document.baseURI).pathname}var uR=(()=>{class n{build(){return new XMLHttpRequest}static \u0275fac=function(i){return new(i||n)};static \u0275prov=Ce({token:n,factory:n.\u0275fac})}return n})(),Nb=["alt","control","meta","shift"],dR={"\b":"Backspace","	":"Tab","\x7F":"Delete","\x1B":"Escape",Del:"Delete",Esc:"Escape",Left:"ArrowLeft",Right:"ArrowRight",Up:"ArrowUp",Down:"ArrowDown",Menu:"ContextMenu",Scroll:"ScrollLock",Win:"OS"},fR={alt:n=>n.altKey,control:n=>n.ctrlKey,meta:n=>n.metaKey,shift:n=>n.shiftKey},Pb=(()=>{class n extends Rc{constructor(t){super(t)}supports(t){return n.parseEventName(t)!=null}addEventListener(t,i,r,s){let o=n.parseEventName(i),a=n.eventCallback(o.fullKey,r,this.manager.getZone());return this.manager.getZone().runOutsideAngular(()=>gr().onAndCancel(t,o.domEventName,a,s))}static parseEventName(t){let i=t.toLowerCase().split("."),r=i.shift();if(i.length===0||!(r==="keydown"||r==="keyup"))return null;let s=n._normalizeKey(i.pop()),o="",a=i.indexOf("code");if(a>-1&&(i.splice(a,1),o="code."),Nb.forEach(l=>{let u=i.indexOf(l);u>-1&&(i.splice(u,1),o+=l+".")}),o+=s,i.length!=0||s.length===0)return null;let c={};return c.domEventName=r,c.fullKey=o,c}static matchEventFullKeyCode(t,i){let r=dR[t.key]||t.key,s="";return i.indexOf("code.")>-1&&(r=t.code,s="code."),r==null||!r?!1:(r=r.toLowerCase(),r===" "?r="space":r==="."&&(r="dot"),Nb.forEach(o=>{if(o!==r){let a=fR[o];a(t)&&(s+=o+".")}}),s+=r,s===i)}static eventCallback(t,i,r){return s=>{n.matchEventFullKeyCode(s,t)&&r.runGuarded(()=>i(s))}}static _normalizeKey(t){return t==="esc"?"escape":t}static \u0275fac=function(i){return new(i||n)(Re(Yt))};static \u0275prov=Ce({token:n,factory:n.\u0275fac})}return n})();async function bv(n,e,t){let i=ae({rootComponent:n},hR(e,t));return vb(i)}function hR(n,e){return{platformRef:e?.platformRef,appProviders:[...yR,...n?.providers??[]],platformProviders:vR}}function pR(){zd.makeCurrent()}function mR(){return new rr}function gR(){return bg(document),document}var vR=[{provide:Mc,useValue:wb},{provide:hd,useValue:pR,multi:!0},{provide:Yt,useFactory:gR}];var yR=[{provide:rc,useValue:"root"},{provide:rr,useFactory:mR},{provide:Hd,useClass:Ud,multi:!0},{provide:Hd,useClass:Pb,multi:!0},Mv,_v,yv,{provide:zs,useExisting:Mv},{provide:Ac,useClass:uR},[]];var Ob=(()=>{class n{_doc;constructor(t){this._doc=t}getTitle(){return this._doc.title}setTitle(t){this._doc.title=t||""}static \u0275fac=function(i){return new(i||n)(Re(Yt))};static \u0275prov=Ce({token:n,factory:n.\u0275fac,providedIn:"root"})}return n})();var He="primary",Xc=Symbol("RouteTitle"),Tv=class{params;constructor(e){this.params=e||{}}has(e){return Object.prototype.hasOwnProperty.call(this.params,e)}get(e){if(this.has(e)){let t=this.params[e];return Array.isArray(t)?t[0]:t}return null}getAll(e){if(this.has(e)){let t=this.params[e];return Array.isArray(t)?t:[t]}return[]}get keys(){return Object.keys(this.params)}};function Ys(n){return new Tv(n)}function Sv(n,e,t){for(let i=0;i<n.length;i++){let r=n[i],s=e[i];if(r[0]===":")t[r.substring(1)]=s;else if(r!==s.path)return!1}return!0}function zb(n,e,t){let i=t.path.split("/"),r=i.indexOf("**");if(r===-1){if(i.length>n.length||t.pathMatch==="full"&&(e.hasChildren()||i.length<n.length))return null;let c={},l=n.slice(0,i.length);return Sv(i,l,c)?{consumed:l,posParams:c}:null}if(r!==i.lastIndexOf("**"))return null;let s=i.slice(0,r),o=i.slice(r+1);if(s.length+o.length>n.length||t.pathMatch==="full"&&e.hasChildren()&&t.path!=="**")return null;let a={};return!Sv(s,n.slice(0,s.length),a)||!Sv(o,n.slice(n.length-o.length),a)?null:{consumed:n,posParams:a}}function Xd(n){return new Promise((e,t)=>{n.pipe(nr()).subscribe({next:i=>e(i),error:i=>t(i)})})}function xR(n,e){if(n.length!==e.length)return!1;for(let t=0;t<n.length;++t)if(!Hi(n[t],e[t]))return!1;return!0}function Hi(n,e){let t=n?Dv(n):void 0,i=e?Dv(e):void 0;if(!t||!i||t.length!=i.length)return!1;let r;for(let s=0;s<t.length;s++)if(r=t[s],!Gb(n[r],e[r]))return!1;return!0}function Dv(n){return[...Object.keys(n),...Object.getOwnPropertySymbols(n)]}function Gb(n,e){if(Array.isArray(n)&&Array.isArray(e)){if(n.length!==e.length)return!1;let t=[...n].sort(),i=[...e].sort();return t.every((r,s)=>i[s]===r)}else return n===e}function MR(n){return n.length>0?n[n.length-1]:null}function Ks(n){return du(n)?n:Wo(n)?Wt(Promise.resolve(n)):tt(n)}function jb(n){return du(n)?Xd(n):Promise.resolve(n)}var bR={exact:qb,subset:Xb},Wb={exact:SR,subset:ER,ignored:()=>!0},$b={paths:"exact",fragment:"ignored",matrixParams:"ignored",queryParams:"exact"},Iv={paths:"subset",fragment:"ignored",matrixParams:"ignored",queryParams:"subset"};function Lb(n,e,t){return bR[t.paths](n.root,e.root,t.matrixParams)&&Wb[t.queryParams](n.queryParams,e.queryParams)&&!(t.fragment==="exact"&&n.fragment!==e.fragment)}function SR(n,e){return Hi(n,e)}function qb(n,e,t){if(!Xs(n.segments,e.segments)||!Wd(n.segments,e.segments,t)||n.numberOfChildren!==e.numberOfChildren)return!1;for(let i in e.children)if(!n.children[i]||!qb(n.children[i],e.children[i],t))return!1;return!0}function ER(n,e){return Object.keys(e).length<=Object.keys(n).length&&Object.keys(e).every(t=>Gb(n[t],e[t]))}function Xb(n,e,t){return Yb(n,e,e.segments,t)}function Yb(n,e,t,i){if(n.segments.length>t.length){let r=n.segments.slice(0,t.length);return!(!Xs(r,t)||e.hasChildren()||!Wd(r,t,i))}else if(n.segments.length===t.length){if(!Xs(n.segments,t)||!Wd(n.segments,t,i))return!1;for(let r in e.children)if(!n.children[r]||!Xb(n.children[r],e.children[r],i))return!1;return!0}else{let r=t.slice(0,n.segments.length),s=t.slice(n.segments.length);return!Xs(n.segments,r)||!Wd(n.segments,r,i)||!n.children[He]?!1:Yb(n.children[He],e,s,i)}}function Wd(n,e,t){return e.every((i,r)=>Wb[t](n[r].parameters,i.parameters))}var ui=class{root;queryParams;fragment;_queryParamMap;constructor(e=new dt([],{}),t={},i=null){this.root=e,this.queryParams=t,this.fragment=i}get queryParamMap(){return this._queryParamMap??=Ys(this.queryParams),this._queryParamMap}toString(){return TR.serialize(this)}},dt=class{segments;children;parent=null;constructor(e,t){this.segments=e,this.children=t,Object.values(t).forEach(i=>i.parent=this)}hasChildren(){return this.numberOfChildren>0}get numberOfChildren(){return Object.keys(this.children).length}toString(){return $d(this)}},Xr=class{path;parameters;_parameterMap;constructor(e,t){this.path=e,this.parameters=t}get parameterMap(){return this._parameterMap??=Ys(this.parameters),this._parameterMap}toString(){return Jb(this)}};function wR(n,e){return Xs(n,e)&&n.every((t,i)=>Hi(t.parameters,e[i].parameters))}function Xs(n,e){return n.length!==e.length?!1:n.every((t,i)=>t.path===e[i].path)}function CR(n,e){let t=[];return Object.entries(n.children).forEach(([i,r])=>{i===He&&(t=t.concat(e(r,i)))}),Object.entries(n.children).forEach(([i,r])=>{i!==He&&(t=t.concat(e(r,i)))}),t}var Yc=(()=>{class n{static \u0275fac=function(i){return new(i||n)};static \u0275prov=Ce({token:n,factory:()=>new Yr,providedIn:"root"})}return n})(),Yr=class{parse(e){let t=new Rv(e);return new ui(t.parseRootSegment(),t.parseQueryParams(),t.parseFragment())}serialize(e){let t=`/${Lc(e.root,!0)}`,i=AR(e.queryParams),r=typeof e.fragment=="string"?`#${DR(e.fragment)}`:"";return`${t}${i}${r}`}},TR=new Yr;function $d(n){return n.segments.map(e=>Jb(e)).join("/")}function Lc(n,e){if(!n.hasChildren())return $d(n);if(e){let t=n.children[He]?Lc(n.children[He],!1):"",i=[];return Object.entries(n.children).forEach(([r,s])=>{r!==He&&i.push(`${r}:${Lc(s,!1)}`)}),i.length>0?`${t}(${i.join("//")})`:t}else{let t=CR(n,(i,r)=>r===He?[Lc(n.children[He],!1)]:[`${r}:${Lc(i,!1)}`]);return Object.keys(n.children).length===1&&n.children[He]!=null?`${$d(n)}/${t[0]}`:`${$d(n)}/(${t.join("//")})`}}function Zb(n){return encodeURIComponent(n).replace(/%40/g,"@").replace(/%3A/gi,":").replace(/%24/g,"$").replace(/%2C/gi,",")}function Gd(n){return Zb(n).replace(/%3B/gi,";")}function DR(n){return encodeURI(n)}function Av(n){return Zb(n).replace(/\(/g,"%28").replace(/\)/g,"%29").replace(/%26/gi,"&")}function qd(n){return decodeURIComponent(n)}function Fb(n){return qd(n.replace(/\+/g,"%20"))}function Jb(n){return`${Av(n.path)}${IR(n.parameters)}`}function IR(n){return Object.entries(n).map(([e,t])=>`;${Av(e)}=${Av(t)}`).join("")}function AR(n){let e=Object.entries(n).map(([t,i])=>Array.isArray(i)?i.map(r=>`${Gd(t)}=${Gd(r)}`).join("&"):`${Gd(t)}=${Gd(i)}`).filter(t=>t);return e.length?`?${e.join("&")}`:""}var RR=/^[^\/()?;#]+/;function Ev(n){let e=n.match(RR);return e?e[0]:""}var NR=/^[^\/()?;=#]+/;function PR(n){let e=n.match(NR);return e?e[0]:""}var OR=/^[^=?&#]+/;function LR(n){let e=n.match(OR);return e?e[0]:""}var FR=/^[^&#]+/;function kR(n){let e=n.match(FR);return e?e[0]:""}var Rv=class{url;remaining;constructor(e){this.url=e,this.remaining=e}parseRootSegment(){return this.consumeOptional("/"),this.remaining===""||this.peekStartsWith("?")||this.peekStartsWith("#")?new dt([],{}):new dt([],this.parseChildren())}parseQueryParams(){let e={};if(this.consumeOptional("?"))do this.parseQueryParam(e);while(this.consumeOptional("&"));return e}parseFragment(){return this.consumeOptional("#")?decodeURIComponent(this.remaining):null}parseChildren(e=0){if(e>50)throw new ge(4010,!1);if(this.remaining==="")return{};this.consumeOptional("/");let t=[];for(this.peekStartsWith("(")||t.push(this.parseSegment());this.peekStartsWith("/")&&!this.peekStartsWith("//")&&!this.peekStartsWith("/(");)this.capture("/"),t.push(this.parseSegment());let i={};this.peekStartsWith("/(")&&(this.capture("/"),i=this.parseParens(!0,e));let r={};return this.peekStartsWith("(")&&(r=this.parseParens(!1,e)),(t.length>0||Object.keys(i).length>0)&&(r[He]=new dt(t,i)),r}parseSegment(){let e=Ev(this.remaining);if(e===""&&this.peekStartsWith(";"))throw new ge(4009,!1);return this.capture(e),new Xr(qd(e),this.parseMatrixParams())}parseMatrixParams(){let e={};for(;this.consumeOptional(";");)this.parseParam(e);return e}parseParam(e){let t=PR(this.remaining);if(!t)return;this.capture(t);let i="";if(this.consumeOptional("=")){let r=Ev(this.remaining);r&&(i=r,this.capture(i))}e[qd(t)]=qd(i)}parseQueryParam(e){let t=LR(this.remaining);if(!t)return;this.capture(t);let i="";if(this.consumeOptional("=")){let o=kR(this.remaining);o&&(i=o,this.capture(i))}let r=Fb(t),s=Fb(i);if(e.hasOwnProperty(r)){let o=e[r];Array.isArray(o)||(o=[o],e[r]=o),o.push(s)}else e[r]=s}parseParens(e,t){let i={};for(this.capture("(");!this.consumeOptional(")")&&this.remaining.length>0;){let r=Ev(this.remaining),s=this.remaining[r.length];if(s!=="/"&&s!==")"&&s!==";")throw new ge(4010,!1);let o;r.indexOf(":")>-1?(o=r.slice(0,r.indexOf(":")),this.capture(o),this.capture(":")):e&&(o=He);let a=this.parseChildren(t+1);i[o??He]=Object.keys(a).length===1&&a[He]?a[He]:new dt([],a),this.consumeOptional("//")}return i}peekStartsWith(e){return this.remaining.startsWith(e)}consumeOptional(e){return this.peekStartsWith(e)?(this.remaining=this.remaining.substring(e.length),!0):!1}capture(e){if(!this.consumeOptional(e))throw new ge(4011,!1)}};function Kb(n){return n.segments.length>0?new dt([],{[He]:n}):n}function Qb(n){let e={};for(let[i,r]of Object.entries(n.children)){let s=Qb(r);if(i===He&&s.segments.length===0&&s.hasChildren())for(let[o,a]of Object.entries(s.children))e[o]=a;else(s.segments.length>0||s.hasChildren())&&(e[i]=s)}let t=new dt(n.segments,e);return UR(t)}function UR(n){if(n.numberOfChildren===1&&n.children[He]){let e=n.children[He];return new dt(n.segments.concat(e.segments),e.children)}return n}function na(n){return n instanceof ui}function eS(n,e,t=null,i=null,r=new Yr){let s=tS(n);return nS(s,e,t,i,r)}function tS(n){let e;function t(s){let o={};for(let c of s.children){let l=t(c);o[c.outlet]=l}let a=new dt(s.url,o);return s===n&&(e=a),a}let i=t(n.root),r=Kb(i);return e??r}function nS(n,e,t,i,r){let s=n;for(;s.parent;)s=s.parent;if(e.length===0)return wv(s,s,s,t,i,r);let o=BR(e);if(o.toRoot())return wv(s,s,new dt([],{}),t,i,r);let a=VR(o,s,n),c=a.processChildren?kc(a.segmentGroup,a.index,o.commands):rS(a.segmentGroup,a.index,o.commands);return wv(s,a.segmentGroup,c,t,i,r)}function Yd(n){return typeof n=="object"&&n!=null&&!n.outlets&&!n.segmentPath}function Vc(n){return typeof n=="object"&&n!=null&&n.outlets}function kb(n,e,t){n||="\u0275";let i=new ui;return i.queryParams={[n]:e},t.parse(t.serialize(i)).queryParams[n]}function wv(n,e,t,i,r,s){let o={};for(let[l,u]of Object.entries(i??{}))o[l]=Array.isArray(u)?u.map(d=>kb(l,d,s)):kb(l,u,s);let a;n===e?a=t:a=iS(n,e,t);let c=Kb(Qb(a));return new ui(c,o,r)}function iS(n,e,t){let i={};return Object.entries(n.children).forEach(([r,s])=>{s===e?i[r]=t:i[r]=iS(s,e,t)}),new dt(n.segments,i)}var Zd=class{isAbsolute;numberOfDoubleDots;commands;constructor(e,t,i){if(this.isAbsolute=e,this.numberOfDoubleDots=t,this.commands=i,e&&i.length>0&&Yd(i[0]))throw new ge(4003,!1);let r=i.find(Vc);if(r&&r!==MR(i))throw new ge(4004,!1)}toRoot(){return this.isAbsolute&&this.commands.length===1&&this.commands[0]=="/"}};function BR(n){if(typeof n[0]=="string"&&n.length===1&&n[0]==="/")return new Zd(!0,0,n);let e=0,t=!1,i=n.reduce((r,s,o)=>{if(typeof s=="object"&&s!=null){if(s.outlets){let a={};return Object.entries(s.outlets).forEach(([c,l])=>{a[c]=typeof l=="string"?l.split("/"):l}),[...r,{outlets:a}]}if(s.segmentPath)return[...r,s.segmentPath]}return typeof s!="string"?[...r,s]:o===0?(s.split("/").forEach((a,c)=>{c==0&&a==="."||(c==0&&a===""?t=!0:a===".."?e++:a!=""&&r.push(a))}),r):[...r,s]},[]);return new Zd(t,e,i)}var ea=class{segmentGroup;processChildren;index;constructor(e,t,i){this.segmentGroup=e,this.processChildren=t,this.index=i}};function VR(n,e,t){if(n.isAbsolute)return new ea(e,!0,0);if(!t)return new ea(e,!1,NaN);if(t.parent===null)return new ea(t,!0,0);let i=Yd(n.commands[0])?0:1,r=t.segments.length-1+i;return HR(t,r,n.numberOfDoubleDots)}function HR(n,e,t){let i=n,r=e,s=t;for(;s>r;){if(s-=r,i=i.parent,!i)throw new ge(4005,!1);r=i.segments.length}return new ea(i,!1,r-s)}function zR(n){return Vc(n[0])?n[0].outlets:{[He]:n}}function rS(n,e,t){if(n??=new dt([],{}),n.segments.length===0&&n.hasChildren())return kc(n,e,t);let i=GR(n,e,t),r=t.slice(i.commandIndex);if(i.match&&i.pathIndex<n.segments.length){let s=new dt(n.segments.slice(0,i.pathIndex),{});return s.children[He]=new dt(n.segments.slice(i.pathIndex),n.children),kc(s,0,r)}else return i.match&&r.length===0?new dt(n.segments,{}):i.match&&!n.hasChildren()?Nv(n,e,t):i.match?kc(n,0,r):Nv(n,e,t)}function kc(n,e,t){if(t.length===0)return new dt(n.segments,{});{let i=zR(t),r={};if(Object.keys(i).some(s=>s!==He)&&n.children[He]&&n.numberOfChildren===1&&n.children[He].segments.length===0){let s=kc(n.children[He],e,t);return new dt(n.segments,s.children)}return Object.entries(i).forEach(([s,o])=>{typeof o=="string"&&(o=[o]),o!==null&&(r[s]=rS(n.children[s],e,o))}),Object.entries(n.children).forEach(([s,o])=>{i[s]===void 0&&(r[s]=o)}),new dt(n.segments,r)}}function GR(n,e,t){let i=0,r=e,s={match:!1,pathIndex:0,commandIndex:0};for(;r<n.segments.length;){if(i>=t.length)return s;let o=n.segments[r],a=t[i];if(Vc(a))break;let c=`${a}`,l=i<t.length-1?t[i+1]:null;if(r>0&&c===void 0)break;if(c&&l&&typeof l=="object"&&l.outlets===void 0){if(!Bb(c,l,o))return s;i+=2}else{if(!Bb(c,{},o))return s;i++}r++}return{match:!0,pathIndex:r,commandIndex:i}}function Nv(n,e,t){let i=n.segments.slice(0,e),r=0;for(;r<t.length;){let s=t[r];if(Vc(s)){let c=jR(s.outlets);return new dt(i,c)}if(r===0&&Yd(t[0])){let c=n.segments[e];i.push(new Xr(c.path,Ub(t[0]))),r++;continue}let o=Vc(s)?s.outlets[He]:`${s}`,a=r<t.length-1?t[r+1]:null;o&&a&&Yd(a)?(i.push(new Xr(o,Ub(a))),r+=2):(i.push(new Xr(o,{})),r++)}return new dt(i,{})}function jR(n){let e={};return Object.entries(n).forEach(([t,i])=>{typeof i=="string"&&(i=[i]),i!==null&&(e[t]=Nv(new dt([],{}),0,i))}),e}function Ub(n){let e={};return Object.entries(n).forEach(([t,i])=>e[t]=`${i}`),e}function Bb(n,e,t){return n==t.path&&Hi(e,t.parameters)}var Uc="imperative",rn=(function(n){return n[n.NavigationStart=0]="NavigationStart",n[n.NavigationEnd=1]="NavigationEnd",n[n.NavigationCancel=2]="NavigationCancel",n[n.NavigationError=3]="NavigationError",n[n.RoutesRecognized=4]="RoutesRecognized",n[n.ResolveStart=5]="ResolveStart",n[n.ResolveEnd=6]="ResolveEnd",n[n.GuardsCheckStart=7]="GuardsCheckStart",n[n.GuardsCheckEnd=8]="GuardsCheckEnd",n[n.RouteConfigLoadStart=9]="RouteConfigLoadStart",n[n.RouteConfigLoadEnd=10]="RouteConfigLoadEnd",n[n.ChildActivationStart=11]="ChildActivationStart",n[n.ChildActivationEnd=12]="ChildActivationEnd",n[n.ActivationStart=13]="ActivationStart",n[n.ActivationEnd=14]="ActivationEnd",n[n.Scroll=15]="Scroll",n[n.NavigationSkipped=16]="NavigationSkipped",n})(rn||{}),$n=class{id;url;constructor(e,t){this.id=e,this.url=t}},Zs=class extends $n{type=rn.NavigationStart;navigationTrigger;restoredState;constructor(e,t,i="imperative",r=null){super(e,t),this.navigationTrigger=i,this.restoredState=r}toString(){return`NavigationStart(id: ${this.id}, url: '${this.url}')`}},yr=class extends $n{urlAfterRedirects;type=rn.NavigationEnd;constructor(e,t,i){super(e,t),this.urlAfterRedirects=i}toString(){return`NavigationEnd(id: ${this.id}, url: '${this.url}', urlAfterRedirects: '${this.urlAfterRedirects}')`}},_n=(function(n){return n[n.Redirect=0]="Redirect",n[n.SupersededByNewNavigation=1]="SupersededByNewNavigation",n[n.NoDataFromResolver=2]="NoDataFromResolver",n[n.GuardRejected=3]="GuardRejected",n[n.Aborted=4]="Aborted",n})(_n||{}),Hc=(function(n){return n[n.IgnoredSameUrlNavigation=0]="IgnoredSameUrlNavigation",n[n.IgnoredByUrlHandlingStrategy=1]="IgnoredByUrlHandlingStrategy",n})(Hc||{}),li=class extends $n{reason;code;type=rn.NavigationCancel;constructor(e,t,i,r){super(e,t),this.reason=i,this.code=r}toString(){return`NavigationCancel(id: ${this.id}, url: '${this.url}')`}};function sS(n){return n instanceof li&&(n.code===_n.Redirect||n.code===_n.SupersededByNewNavigation)}var _r=class extends $n{reason;code;type=rn.NavigationSkipped;constructor(e,t,i,r){super(e,t),this.reason=i,this.code=r}},Js=class extends $n{error;target;type=rn.NavigationError;constructor(e,t,i,r){super(e,t),this.error=i,this.target=r}toString(){return`NavigationError(id: ${this.id}, url: '${this.url}', error: ${this.error})`}},zc=class extends $n{urlAfterRedirects;state;type=rn.RoutesRecognized;constructor(e,t,i,r){super(e,t),this.urlAfterRedirects=i,this.state=r}toString(){return`RoutesRecognized(id: ${this.id}, url: '${this.url}', urlAfterRedirects: '${this.urlAfterRedirects}', state: ${this.state})`}},Jd=class extends $n{urlAfterRedirects;state;type=rn.GuardsCheckStart;constructor(e,t,i,r){super(e,t),this.urlAfterRedirects=i,this.state=r}toString(){return`GuardsCheckStart(id: ${this.id}, url: '${this.url}', urlAfterRedirects: '${this.urlAfterRedirects}', state: ${this.state})`}},Kd=class extends $n{urlAfterRedirects;state;shouldActivate;type=rn.GuardsCheckEnd;constructor(e,t,i,r,s){super(e,t),this.urlAfterRedirects=i,this.state=r,this.shouldActivate=s}toString(){return`GuardsCheckEnd(id: ${this.id}, url: '${this.url}', urlAfterRedirects: '${this.urlAfterRedirects}', state: ${this.state}, shouldActivate: ${this.shouldActivate})`}},Qd=class extends $n{urlAfterRedirects;state;type=rn.ResolveStart;constructor(e,t,i,r){super(e,t),this.urlAfterRedirects=i,this.state=r}toString(){return`ResolveStart(id: ${this.id}, url: '${this.url}', urlAfterRedirects: '${this.urlAfterRedirects}', state: ${this.state})`}},ef=class extends $n{urlAfterRedirects;state;type=rn.ResolveEnd;constructor(e,t,i,r){super(e,t),this.urlAfterRedirects=i,this.state=r}toString(){return`ResolveEnd(id: ${this.id}, url: '${this.url}', urlAfterRedirects: '${this.urlAfterRedirects}', state: ${this.state})`}},tf=class{route;type=rn.RouteConfigLoadStart;constructor(e){this.route=e}toString(){return`RouteConfigLoadStart(path: ${this.route.path})`}},nf=class{route;type=rn.RouteConfigLoadEnd;constructor(e){this.route=e}toString(){return`RouteConfigLoadEnd(path: ${this.route.path})`}},rf=class{snapshot;type=rn.ChildActivationStart;constructor(e){this.snapshot=e}toString(){return`ChildActivationStart(path: '${this.snapshot.routeConfig&&this.snapshot.routeConfig.path||""}')`}},sf=class{snapshot;type=rn.ChildActivationEnd;constructor(e){this.snapshot=e}toString(){return`ChildActivationEnd(path: '${this.snapshot.routeConfig&&this.snapshot.routeConfig.path||""}')`}},of=class{snapshot;type=rn.ActivationStart;constructor(e){this.snapshot=e}toString(){return`ActivationStart(path: '${this.snapshot.routeConfig&&this.snapshot.routeConfig.path||""}')`}},af=class{snapshot;type=rn.ActivationEnd;constructor(e){this.snapshot=e}toString(){return`ActivationEnd(path: '${this.snapshot.routeConfig&&this.snapshot.routeConfig.path||""}')`}};var ia=class{},Gc=class{},ra=class{url;navigationBehaviorOptions;constructor(e,t){this.url=e,this.navigationBehaviorOptions=t}};function WR(n){return!(n instanceof ia)&&!(n instanceof ra)&&!(n instanceof Gc)}var cf=class{rootInjector;outlet=null;route=null;children;attachRef=null;get injector(){return this.route?.snapshot._environmentInjector??this.rootInjector}constructor(e){this.rootInjector=e,this.children=new ca(this.rootInjector)}},ca=(()=>{class n{rootInjector;contexts=new Map;constructor(t){this.rootInjector=t}onChildOutletCreated(t,i){let r=this.getOrCreateContext(t);r.outlet=i,this.contexts.set(t,r)}onChildOutletDestroyed(t){let i=this.getContext(t);i&&(i.outlet=null,i.attachRef=null)}onOutletDeactivated(){let t=this.contexts;return this.contexts=new Map,t}onOutletReAttached(t){this.contexts=t}getOrCreateContext(t){let i=this.getContext(t);return i||(i=new cf(this.rootInjector),this.contexts.set(t,i)),i}getContext(t){return this.contexts.get(t)||null}static \u0275fac=function(i){return new(i||n)(Re(Xt))};static \u0275prov=Ce({token:n,factory:n.\u0275fac,providedIn:"root"})}return n})(),lf=class{_root;constructor(e){this._root=e}get root(){return this._root.value}parent(e){let t=this.pathFromRoot(e);return t.length>1?t[t.length-2]:null}children(e){let t=Pv(e,this._root);return t?t.children.map(i=>i.value):[]}firstChild(e){let t=Pv(e,this._root);return t&&t.children.length>0?t.children[0].value:null}siblings(e){let t=Ov(e,this._root);return t.length<2?[]:t[t.length-2].children.map(r=>r.value).filter(r=>r!==e)}pathFromRoot(e){return Ov(e,this._root).map(t=>t.value)}};function Pv(n,e){if(n===e.value)return e;for(let t of e.children){let i=Pv(n,t);if(i)return i}return null}function Ov(n,e){if(n===e.value)return[e];for(let t of e.children){let i=Ov(n,t);if(i.length)return i.unshift(e),i}return[]}var Wn=class{value;children;constructor(e,t){this.value=e,this.children=t}toString(){return`TreeNode(${this.value})`}};function Qo(n){let e={};return n&&n.children.forEach(t=>e[t.value.outlet]=t),e}var jc=class extends lf{snapshot;constructor(e,t){super(e),this.snapshot=t,Gv(this,e)}toString(){return this.snapshot.toString()}};function oS(n,e){let t=$R(n,e),i=new un([new Xr("",{})]),r=new un({}),s=new un({}),o=new un({}),a=new un(""),c=new Zr(i,r,o,a,s,He,n,t.root);return c.snapshot=t.root,new jc(new Wn(c,[]),t)}function $R(n,e){let t={},i={},r={},o=new sa([],t,r,"",i,He,n,null,{},e);return new Wc("",new Wn(o,[]))}var Zr=class{urlSubject;paramsSubject;queryParamsSubject;fragmentSubject;dataSubject;outlet;component;snapshot;_futureSnapshot;_routerState;_paramMap;_queryParamMap;title;url;params;queryParams;fragment;data;constructor(e,t,i,r,s,o,a,c){this.urlSubject=e,this.paramsSubject=t,this.queryParamsSubject=i,this.fragmentSubject=r,this.dataSubject=s,this.outlet=o,this.component=a,this._futureSnapshot=c,this.title=this.dataSubject?.pipe(_t(l=>l[Xc]))??tt(void 0),this.url=e,this.params=t,this.queryParams=i,this.fragment=r,this.data=s}get routeConfig(){return this._futureSnapshot.routeConfig}get root(){return this._routerState.root}get parent(){return this._routerState.parent(this)}get firstChild(){return this._routerState.firstChild(this)}get children(){return this._routerState.children(this)}get pathFromRoot(){return this._routerState.pathFromRoot(this)}get paramMap(){return this._paramMap??=this.params.pipe(_t(e=>Ys(e))),this._paramMap}get queryParamMap(){return this._queryParamMap??=this.queryParams.pipe(_t(e=>Ys(e))),this._queryParamMap}toString(){return this.snapshot?this.snapshot.toString():`Future(${this._futureSnapshot})`}};function zv(n,e,t="emptyOnly"){let i,{routeConfig:r}=n;return e!==null&&(t==="always"||r?.path===""||!e.component&&!e.routeConfig?.loadComponent)?i={params:ae(ae({},e.params),n.params),data:ae(ae({},e.data),n.data),resolve:ae(ae(ae(ae({},n.data),e.data),r?.data),n._resolvedData)}:i={params:ae({},n.params),data:ae({},n.data),resolve:ae(ae({},n.data),n._resolvedData??{})},r&&cS(r)&&(i.resolve[Xc]=r.title),i}var sa=class{url;params;queryParams;fragment;data;outlet;component;routeConfig;_resolve;_resolvedData;_routerState;_paramMap;_queryParamMap;_environmentInjector;get title(){return this.data?.[Xc]}constructor(e,t,i,r,s,o,a,c,l,u){this.url=e,this.params=t,this.queryParams=i,this.fragment=r,this.data=s,this.outlet=o,this.component=a,this.routeConfig=c,this._resolve=l,this._environmentInjector=u}get root(){return this._routerState.root}get parent(){return this._routerState.parent(this)}get firstChild(){return this._routerState.firstChild(this)}get children(){return this._routerState.children(this)}get pathFromRoot(){return this._routerState.pathFromRoot(this)}get paramMap(){return this._paramMap??=Ys(this.params),this._paramMap}get queryParamMap(){return this._queryParamMap??=Ys(this.queryParams),this._queryParamMap}toString(){let e=this.url.map(i=>i.toString()).join("/"),t=this.routeConfig?this.routeConfig.path:"";return`Route(url:'${e}', path:'${t}')`}},Wc=class extends lf{url;constructor(e,t){super(t),this.url=e,Gv(this,t)}toString(){return aS(this._root)}};function Gv(n,e){e.value._routerState=n,e.children.forEach(t=>Gv(n,t))}function aS(n){let e=n.children.length>0?` { ${n.children.map(aS).join(", ")} } `:"";return`${n.value}${e}`}function Cv(n){if(n.snapshot){let e=n.snapshot,t=n._futureSnapshot;n.snapshot=t,Hi(e.queryParams,t.queryParams)||n.queryParamsSubject.next(t.queryParams),e.fragment!==t.fragment&&n.fragmentSubject.next(t.fragment),Hi(e.params,t.params)||n.paramsSubject.next(t.params),xR(e.url,t.url)||n.urlSubject.next(t.url),Hi(e.data,t.data)||n.dataSubject.next(t.data)}else n.snapshot=n._futureSnapshot,n.dataSubject.next(n._futureSnapshot.data)}function Lv(n,e){let t=Hi(n.params,e.params)&&wR(n.url,e.url),i=!n.parent!=!e.parent;return t&&!i&&(!n.parent||Lv(n.parent,e.parent))}function cS(n){return typeof n.title=="string"||n.title===null}var lS=new Ie(""),Zc=(()=>{class n{activated=null;get activatedComponentRef(){return this.activated}_activatedRoute=null;name=He;activateEvents=new Pt;deactivateEvents=new Pt;attachEvents=new Pt;detachEvents=new Pt;routerOutletData=mb();parentContexts=Q(ca);location=Q(fr);changeDetector=Q(lv);inputBinder=Q(hf,{optional:!0});supportsBindingToComponentInputs=!0;ngOnChanges(t){if(t.name){let{firstChange:i,previousValue:r}=t.name;if(i)return;this.isTrackedInParentContexts(r)&&(this.deactivate(),this.parentContexts.onChildOutletDestroyed(r)),this.initializeOutletWithName()}}ngOnDestroy(){this.isTrackedInParentContexts(this.name)&&this.parentContexts.onChildOutletDestroyed(this.name),this.inputBinder?.unsubscribeFromRouteData(this)}isTrackedInParentContexts(t){return this.parentContexts.getContext(t)?.outlet===this}ngOnInit(){this.initializeOutletWithName()}initializeOutletWithName(){if(this.parentContexts.onChildOutletCreated(this.name,this),this.activated)return;let t=this.parentContexts.getContext(this.name);t?.route&&(t.attachRef?this.attach(t.attachRef,t.route):this.activateWith(t.route,t.injector))}get isActivated(){return!!this.activated}get component(){if(!this.activated)throw new ge(4012,!1);return this.activated.instance}get activatedRoute(){if(!this.activated)throw new ge(4012,!1);return this._activatedRoute}get activatedRouteData(){return this._activatedRoute?this._activatedRoute.snapshot.data:{}}detach(){if(!this.activated)throw new ge(4012,!1);this.location.detach();let t=this.activated;return this.activated=null,this._activatedRoute=null,this.detachEvents.emit(t.instance),t}attach(t,i){this.activated=t,this._activatedRoute=i,this.location.insert(t.hostView),this.inputBinder?.bindActivatedRouteToOutletComponent(this),this.attachEvents.emit(t.instance)}deactivate(){if(this.activated){let t=this.component;this.activated.destroy(),this.activated=null,this._activatedRoute=null,this.deactivateEvents.emit(t)}}activateWith(t,i){if(this.isActivated)throw new ge(4013,!1);this._activatedRoute=t;let r=this.location,o=t.snapshot.component,a=this.parentContexts.getOrCreateContext(this.name).children,c=new Fv(t,a,r.injector,this.routerOutletData);this.activated=r.createComponent(o,{index:r.length,injector:c,environmentInjector:i}),this.changeDetector.markForCheck(),this.inputBinder?.bindActivatedRouteToOutletComponent(this),this.activateEvents.emit(this.activated.instance)}static \u0275fac=function(i){return new(i||n)};static \u0275dir=qs({type:n,selectors:[["router-outlet"]],inputs:{name:"name",routerOutletData:[1,"routerOutletData"]},outputs:{activateEvents:"activate",deactivateEvents:"deactivate",attachEvents:"attach",detachEvents:"detach"},exportAs:["outlet"],features:[ud]})}return n})(),Fv=class{route;childContexts;parent;outletData;constructor(e,t,i,r){this.route=e,this.childContexts=t,this.parent=i,this.outletData=r}get(e,t){return e===Zr?this.route:e===ca?this.childContexts:e===lS?this.outletData:this.parent.get(e,t)}},hf=new Ie("");var jv=(()=>{class n{static \u0275fac=function(i){return new(i||n)};static \u0275cmp=wi({type:n,selectors:[["ng-component"]],exportAs:["emptyRouterOutlet"],decls:1,vars:0,template:function(i,r){i&1&&Un(0,"router-outlet")},dependencies:[Zc],encapsulation:2})}return n})();function Wv(n){let e=n.children&&n.children.map(Wv),t=e?et(ae({},n),{children:e}):ae({},n);return!t.component&&!t.loadComponent&&(e||t.loadChildren)&&t.outlet&&t.outlet!==He&&(t.component=jv),t}function qR(n,e,t){let i=$c(n,e._root,t?t._root:void 0);return new jc(i,e)}function $c(n,e,t){if(t&&n.shouldReuseRoute(e.value,t.value.snapshot)){let i=t.value;i._futureSnapshot=e.value;let r=XR(n,e,t);return new Wn(i,r)}else{if(n.shouldAttach(e.value)){let s=n.retrieve(e.value);if(s!==null){let o=s.route;return o.value._futureSnapshot=e.value,o.children=e.children.map(a=>$c(n,a)),o}}let i=YR(e.value),r=e.children.map(s=>$c(n,s));return new Wn(i,r)}}function XR(n,e,t){return e.children.map(i=>{for(let r of t.children)if(n.shouldReuseRoute(i.value,r.value.snapshot))return $c(n,i,r);return $c(n,i)})}function YR(n){return new Zr(new un(n.url),new un(n.params),new un(n.queryParams),new un(n.fragment),new un(n.data),n.outlet,n.component,n)}var oa=class{redirectTo;navigationBehaviorOptions;constructor(e,t){this.redirectTo=e,this.navigationBehaviorOptions=t}},uS="ngNavigationCancelingError";function uf(n,e){let{redirectTo:t,navigationBehaviorOptions:i}=na(e)?{redirectTo:e,navigationBehaviorOptions:void 0}:e,r=dS(!1,_n.Redirect);return r.url=t,r.navigationBehaviorOptions=i,r}function dS(n,e){let t=new Error(`NavigationCancelingError: ${n||""}`);return t[uS]=!0,t.cancellationCode=e,t}function ZR(n){return fS(n)&&na(n.url)}function fS(n){return!!n&&n[uS]}var kv=class{routeReuseStrategy;futureState;currState;forwardEvent;inputBindingEnabled;constructor(e,t,i,r,s){this.routeReuseStrategy=e,this.futureState=t,this.currState=i,this.forwardEvent=r,this.inputBindingEnabled=s}activate(e){let t=this.futureState._root,i=this.currState?this.currState._root:null;this.deactivateChildRoutes(t,i,e),Cv(this.futureState.root),this.activateChildRoutes(t,i,e)}deactivateChildRoutes(e,t,i){let r=Qo(t);e.children.forEach(s=>{let o=s.value.outlet;this.deactivateRoutes(s,r[o],i),delete r[o]}),Object.values(r).forEach(s=>{this.deactivateRouteAndItsChildren(s,i)})}deactivateRoutes(e,t,i){let r=e.value,s=t?t.value:null;if(r===s)if(r.component){let o=i.getContext(r.outlet);o&&this.deactivateChildRoutes(e,t,o.children)}else this.deactivateChildRoutes(e,t,i);else s&&this.deactivateRouteAndItsChildren(t,i)}deactivateRouteAndItsChildren(e,t){e.value.component&&this.routeReuseStrategy.shouldDetach(e.value.snapshot)?this.detachAndStoreRouteSubtree(e,t):this.deactivateRouteAndOutlet(e,t)}detachAndStoreRouteSubtree(e,t){let i=t.getContext(e.value.outlet),r=i&&e.value.component?i.children:t,s=Qo(e);for(let o of Object.values(s))this.deactivateRouteAndItsChildren(o,r);if(i&&i.outlet){let o=i.outlet.detach(),a=i.children.onOutletDeactivated();this.routeReuseStrategy.store(e.value.snapshot,{componentRef:o,route:e,contexts:a})}}deactivateRouteAndOutlet(e,t){let i=t.getContext(e.value.outlet),r=i&&e.value.component?i.children:t,s=Qo(e);for(let o of Object.values(s))this.deactivateRouteAndItsChildren(o,r);i&&(i.outlet&&(i.outlet.deactivate(),i.children.onOutletDeactivated()),i.attachRef=null,i.route=null)}activateChildRoutes(e,t,i){let r=Qo(t);e.children.forEach(s=>{this.activateRoutes(s,r[s.value.outlet],i),this.forwardEvent(new af(s.value.snapshot))}),e.children.length&&this.forwardEvent(new sf(e.value.snapshot))}activateRoutes(e,t,i){let r=e.value,s=t?t.value:null;if(Cv(r),r===s)if(r.component){let o=i.getOrCreateContext(r.outlet);this.activateChildRoutes(e,t,o.children)}else this.activateChildRoutes(e,t,i);else if(r.component){let o=i.getOrCreateContext(r.outlet);if(this.routeReuseStrategy.shouldAttach(r.snapshot)){let a=this.routeReuseStrategy.retrieve(r.snapshot);this.routeReuseStrategy.store(r.snapshot,null),o.children.onOutletReAttached(a.contexts),o.attachRef=a.componentRef,o.route=a.route.value,o.outlet&&o.outlet.attach(a.componentRef,a.route.value),Cv(a.route.value),this.activateChildRoutes(e,null,o.children)}else o.attachRef=null,o.route=r,o.outlet&&o.outlet.activateWith(r,o.injector),this.activateChildRoutes(e,null,o.children)}else this.activateChildRoutes(e,null,i)}},df=class{path;route;constructor(e){this.path=e,this.route=this.path[this.path.length-1]}},ta=class{component;route;constructor(e,t){this.component=e,this.route=t}};function JR(n,e,t){let i=n._root,r=e?e._root:null;return Fc(i,r,t,[i.value])}function KR(n){let e=n.routeConfig?n.routeConfig.canActivateChild:null;return!e||e.length===0?null:{node:n,guards:e}}function la(n,e){let t=Symbol(),i=e.get(n,t);return i===t?typeof n=="function"&&!im(n)?n:e.get(n):i}function Fc(n,e,t,i,r={canDeactivateChecks:[],canActivateChecks:[]}){let s=Qo(e);return n.children.forEach(o=>{QR(o,s[o.value.outlet],t,i.concat([o.value]),r),delete s[o.value.outlet]}),Object.entries(s).forEach(([o,a])=>Bc(a,t.getContext(o),r)),r}function QR(n,e,t,i,r={canDeactivateChecks:[],canActivateChecks:[]}){let s=n.value,o=e?e.value:null,a=t?t.getContext(n.value.outlet):null;if(o&&s.routeConfig===o.routeConfig){let c=e1(o,s,s.routeConfig.runGuardsAndResolvers);c?r.canActivateChecks.push(new df(i)):(s.data=o.data,s._resolvedData=o._resolvedData),s.component?Fc(n,e,a?a.children:null,i,r):Fc(n,e,t,i,r),c&&a&&a.outlet&&a.outlet.isActivated&&r.canDeactivateChecks.push(new ta(a.outlet.component,o))}else o&&Bc(e,a,r),r.canActivateChecks.push(new df(i)),s.component?Fc(n,null,a?a.children:null,i,r):Fc(n,null,t,i,r);return r}function e1(n,e,t){if(typeof t=="function")return vn(e._environmentInjector,()=>t(n,e));switch(t){case"pathParamsChange":return!Xs(n.url,e.url);case"pathParamsOrQueryParamsChange":return!Xs(n.url,e.url)||!Hi(n.queryParams,e.queryParams);case"always":return!0;case"paramsOrQueryParamsChange":return!Lv(n,e)||!Hi(n.queryParams,e.queryParams);default:return!Lv(n,e)}}function Bc(n,e,t){let i=Qo(n),r=n.value;Object.entries(i).forEach(([s,o])=>{r.component?e?Bc(o,e.children.getContext(s),t):Bc(o,null,t):Bc(o,e,t)}),r.component?e&&e.outlet&&e.outlet.isActivated?t.canDeactivateChecks.push(new ta(e.outlet.component,r)):t.canDeactivateChecks.push(new ta(null,r)):t.canDeactivateChecks.push(new ta(null,r))}function Jc(n){return typeof n=="function"}function t1(n){return typeof n=="boolean"}function n1(n){return n&&Jc(n.canLoad)}function i1(n){return n&&Jc(n.canActivate)}function r1(n){return n&&Jc(n.canActivateChild)}function s1(n){return n&&Jc(n.canDeactivate)}function o1(n){return n&&Jc(n.canMatch)}function hS(n){return n instanceof ws||n?.name==="EmptyError"}var jd=Symbol("INITIAL_VALUE");function aa(){return gn(n=>Bp(n.map(e=>e.pipe(Cn(1),Hp(jd)))).pipe(_t(e=>{for(let t of e)if(t!==!0){if(t===jd)return jd;if(t===!1||a1(t))return t}return!0}),ti(e=>e!==jd),Cn(1)))}function a1(n){return na(n)||n instanceof oa}function pS(n){return n.aborted?tt(void 0).pipe(Cn(1)):new Qe(e=>{let t=()=>{e.next(),e.complete()};return n.addEventListener("abort",t),()=>n.removeEventListener("abort",t)})}function mS(n){return qa(pS(n))}function c1(n){return wn(e=>{let{targetSnapshot:t,currentSnapshot:i,guards:{canActivateChecks:r,canDeactivateChecks:s}}=e;return s.length===0&&r.length===0?tt(et(ae({},e),{guardsResult:!0})):l1(s,t,i).pipe(wn(o=>o&&t1(o)?u1(t,r,n):tt(o)),_t(o=>et(ae({},e),{guardsResult:o})))})}function l1(n,e,t){return Wt(n).pipe(wn(i=>m1(i.component,i.route,t,e)),nr(i=>i!==!0,!0))}function u1(n,e,t){return Wt(e).pipe(fu(i=>wo(f1(i.route.parent,t),d1(i.route,t),p1(n,i.path),h1(n,i.route))),nr(i=>i!==!0,!0))}function d1(n,e){return n!==null&&e&&e(new of(n)),tt(!0)}function f1(n,e){return n!==null&&e&&e(new rf(n)),tt(!0)}function h1(n,e){let t=e.routeConfig?e.routeConfig.canActivate:null;if(!t||t.length===0)return tt(!0);let i=t.map(r=>Wa(()=>{let s=e._environmentInjector,o=la(r,s),a=i1(o)?o.canActivate(e,n):vn(s,()=>o(e,n));return Ks(a).pipe(nr())}));return tt(i).pipe(aa())}function p1(n,e){let t=e[e.length-1],r=e.slice(0,e.length-1).reverse().map(s=>KR(s)).filter(s=>s!==null).map(s=>Wa(()=>{let o=s.guards.map(a=>{let c=s.node._environmentInjector,l=la(a,c),u=r1(l)?l.canActivateChild(t,n):vn(c,()=>l(t,n));return Ks(u).pipe(nr())});return tt(o).pipe(aa())}));return tt(r).pipe(aa())}function m1(n,e,t,i){let r=e&&e.routeConfig?e.routeConfig.canDeactivate:null;if(!r||r.length===0)return tt(!0);let s=r.map(o=>{let a=e._environmentInjector,c=la(o,a),l=s1(c)?c.canDeactivate(n,e,t,i):vn(a,()=>c(n,e,t,i));return Ks(l).pipe(nr())});return tt(s).pipe(aa())}function g1(n,e,t,i,r){let s=e.canLoad;if(s===void 0||s.length===0)return tt(!0);let o=s.map(a=>{let c=la(a,n),l=n1(c)?c.canLoad(e,t):vn(n,()=>c(e,t)),u=Ks(l);return r?u.pipe(mS(r)):u});return tt(o).pipe(aa(),gS(i))}function gS(n){return Lp(ni(e=>{if(typeof e!="boolean")throw uf(n,e)}),_t(e=>e===!0))}function v1(n,e,t,i,r,s){let o=e.canMatch;if(!o||o.length===0)return tt(!0);let a=o.map(c=>{let l=la(c,n),u=o1(l)?l.canMatch(e,t,r):vn(n,()=>l(e,t,r));return Ks(u).pipe(mS(s))});return tt(a).pipe(aa(),gS(i))}var vr=class n extends Error{segmentGroup;constructor(e){super(),this.segmentGroup=e||null,Object.setPrototypeOf(this,n.prototype)}},qc=class n extends Error{urlTree;constructor(e){super(),this.urlTree=e,Object.setPrototypeOf(this,n.prototype)}};function y1(n){throw new ge(4e3,!1)}function _1(n){throw dS(!1,_n.GuardRejected)}var Uv=class{urlSerializer;urlTree;constructor(e,t){this.urlSerializer=e,this.urlTree=t}async lineralizeSegments(e,t){let i=[],r=t.root;for(;;){if(i=i.concat(r.segments),r.numberOfChildren===0)return i;if(r.numberOfChildren>1||!r.children[He])throw y1(`${e.redirectTo}`);r=r.children[He]}}async applyRedirectCommands(e,t,i,r,s){let o=await x1(t,r,s);if(o instanceof ui)throw new qc(o);let a=this.applyRedirectCreateUrlTree(o,this.urlSerializer.parse(o),e,i);if(o[0]==="/")throw new qc(a);return a}applyRedirectCreateUrlTree(e,t,i,r){let s=this.createSegmentGroup(e,t.root,i,r);return new ui(s,this.createQueryParams(t.queryParams,this.urlTree.queryParams),t.fragment)}createQueryParams(e,t){let i={};return Object.entries(e).forEach(([r,s])=>{if(typeof s=="string"&&s[0]===":"){let a=s.substring(1);i[r]=t[a]}else i[r]=s}),i}createSegmentGroup(e,t,i,r){let s=this.createSegments(e,t.segments,i,r),o={};return Object.entries(t.children).forEach(([a,c])=>{o[a]=this.createSegmentGroup(e,c,i,r)}),new dt(s,o)}createSegments(e,t,i,r){return t.map(s=>s.path[0]===":"?this.findPosParam(e,s,r):this.findOrReturn(s,i))}findPosParam(e,t,i){let r=i[t.path.substring(1)];if(!r)throw new ge(4001,!1);return r}findOrReturn(e,t){let i=0;for(let r of t){if(r.path===e.path)return t.splice(i),r;i++}return e}};function x1(n,e,t){if(typeof n=="string")return Promise.resolve(n);let i=n;return Xd(Ks(vn(t,()=>i(e))))}function M1(n,e){return n.providers&&!n._injector&&(n._injector=Sc(n.providers,e,`Route: ${n.path}`)),n._injector??e}function Ti(n){return n.outlet||He}function b1(n,e){let t=n.filter(i=>Ti(i)===e);return t.push(...n.filter(i=>Ti(i)!==e)),t}var Bv={matched:!1,consumedSegments:[],remainingSegments:[],parameters:{},positionalParamSegments:{}};function vS(n){return{routeConfig:n.routeConfig,url:n.url,params:n.params,queryParams:n.queryParams,fragment:n.fragment,data:n.data,outlet:n.outlet,title:n.title,paramMap:n.paramMap,queryParamMap:n.queryParamMap}}function S1(n,e,t,i,r,s,o){let a=yS(n,e,t);if(!a.matched)return tt(a);let c=vS(s(a));return i=M1(e,i),v1(i,e,t,r,c,o).pipe(_t(l=>l===!0?a:ae({},Bv)))}function yS(n,e,t){if(e.path==="")return e.pathMatch==="full"&&(n.hasChildren()||t.length>0)?ae({},Bv):{matched:!0,consumedSegments:[],remainingSegments:t,parameters:{},positionalParamSegments:{}};let r=(e.matcher||zb)(t,n,e);if(!r)return ae({},Bv);let s={};Object.entries(r.posParams??{}).forEach(([a,c])=>{s[a]=c.path});let o=r.consumed.length>0?ae(ae({},s),r.consumed[r.consumed.length-1].parameters):s;return{matched:!0,consumedSegments:r.consumed,remainingSegments:t.slice(r.consumed.length),parameters:o,positionalParamSegments:r.posParams??{}}}function Vb(n,e,t,i,r){return t.length>0&&C1(n,t,i,r)?{segmentGroup:new dt(e,w1(i,new dt(t,n.children))),slicedSegments:[]}:t.length===0&&T1(n,t,i)?{segmentGroup:new dt(n.segments,E1(n,t,i,n.children)),slicedSegments:t}:{segmentGroup:new dt(n.segments,n.children),slicedSegments:t}}function E1(n,e,t,i){let r={};for(let s of t)if(pf(n,e,s)&&!i[Ti(s)]){let o=new dt([],{});r[Ti(s)]=o}return ae(ae({},i),r)}function w1(n,e){let t={};t[He]=e;for(let i of n)if(i.path===""&&Ti(i)!==He){let r=new dt([],{});t[Ti(i)]=r}return t}function C1(n,e,t,i){return t.some(r=>!pf(n,e,r)||!(Ti(r)!==He)?!1:!(i!==void 0&&Ti(r)===i))}function T1(n,e,t){return t.some(i=>pf(n,e,i))}function pf(n,e,t){return(n.hasChildren()||e.length>0)&&t.pathMatch==="full"?!1:t.path===""}function D1(n,e,t){return e.length===0&&!n.children[t]}var Vv=class{};async function I1(n,e,t,i,r,s,o="emptyOnly",a){return new Hv(n,e,t,i,r,o,s,a).recognize()}var A1=31,Hv=class{injector;configLoader;rootComponentType;config;urlTree;paramsInheritanceStrategy;urlSerializer;abortSignal;applyRedirects;absoluteRedirectCount=0;allowRedirects=!0;constructor(e,t,i,r,s,o,a,c){this.injector=e,this.configLoader=t,this.rootComponentType=i,this.config=r,this.urlTree=s,this.paramsInheritanceStrategy=o,this.urlSerializer=a,this.abortSignal=c,this.applyRedirects=new Uv(this.urlSerializer,this.urlTree)}noMatchError(e){return new ge(4002,`'${e.segmentGroup}'`)}async recognize(){let e=Vb(this.urlTree.root,[],[],this.config).segmentGroup,{children:t,rootSnapshot:i}=await this.match(e),r=new Wn(i,t),s=new Wc("",r),o=eS(i,[],this.urlTree.queryParams,this.urlTree.fragment);return o.queryParams=this.urlTree.queryParams,s.url=this.urlSerializer.serialize(o),{state:s,tree:o}}async match(e){let t=new sa([],Object.freeze({}),Object.freeze(ae({},this.urlTree.queryParams)),this.urlTree.fragment,Object.freeze({}),He,this.rootComponentType,null,{},this.injector);try{return{children:await this.processSegmentGroup(this.injector,this.config,e,He,t),rootSnapshot:t}}catch(i){if(i instanceof qc)return this.urlTree=i.urlTree,this.match(i.urlTree.root);throw i instanceof vr?this.noMatchError(i):i}}async processSegmentGroup(e,t,i,r,s){if(i.segments.length===0&&i.hasChildren())return this.processChildren(e,t,i,s);let o=await this.processSegment(e,t,i,i.segments,r,!0,s);return o instanceof Wn?[o]:[]}async processChildren(e,t,i,r){let s=[];for(let c of Object.keys(i.children))c==="primary"?s.unshift(c):s.push(c);let o=[];for(let c of s){let l=i.children[c],u=b1(t,c),d=await this.processSegmentGroup(e,u,l,c,r);o.push(...d)}let a=_S(o);return R1(a),a}async processSegment(e,t,i,r,s,o,a){for(let c of t)try{return await this.processSegmentAgainstRoute(c._injector??e,t,c,i,r,s,o,a)}catch(l){if(l instanceof vr||hS(l))continue;throw l}if(D1(i,r,s))return new Vv;throw new vr(i)}async processSegmentAgainstRoute(e,t,i,r,s,o,a,c){if(Ti(i)!==o&&(o===He||!pf(r,s,i)))throw new vr(r);if(i.redirectTo===void 0)return this.matchSegmentAgainstRoute(e,r,i,s,o,c);if(this.allowRedirects&&a)return this.expandSegmentAgainstRouteUsingRedirect(e,r,t,i,s,o,c);throw new vr(r)}async expandSegmentAgainstRouteUsingRedirect(e,t,i,r,s,o,a){let{matched:c,parameters:l,consumedSegments:u,positionalParamSegments:d,remainingSegments:f}=yS(t,r,s);if(!c)throw new vr(t);typeof r.redirectTo=="string"&&r.redirectTo[0]==="/"&&(this.absoluteRedirectCount++,this.absoluteRedirectCount>A1&&(this.allowRedirects=!1));let h=this.createSnapshot(e,r,s,l,a);if(this.abortSignal.aborted)throw new Error(this.abortSignal.reason);let g=await this.applyRedirects.applyRedirectCommands(u,r.redirectTo,d,vS(h),e),_=await this.applyRedirects.lineralizeSegments(r,g);return this.processSegment(e,i,t,_.concat(f),o,!1,a)}createSnapshot(e,t,i,r,s){let o=new sa(i,r,Object.freeze(ae({},this.urlTree.queryParams)),this.urlTree.fragment,P1(t),Ti(t),t.component??t._loadedComponent??null,t,O1(t),e),a=zv(o,s,this.paramsInheritanceStrategy);return o.params=Object.freeze(a.params),o.data=Object.freeze(a.data),o}async matchSegmentAgainstRoute(e,t,i,r,s,o){if(this.abortSignal.aborted)throw new Error(this.abortSignal.reason);let a=w=>this.createSnapshot(e,i,w.consumedSegments,w.parameters,o),c=await Xd(S1(t,i,r,e,this.urlSerializer,a,this.abortSignal));if(i.path==="**"&&(t.children={}),!c?.matched)throw new vr(t);e=i._injector??e;let{routes:l}=await this.getChildConfig(e,i,r),u=i._loadedInjector??e,{parameters:d,consumedSegments:f,remainingSegments:h}=c,g=this.createSnapshot(e,i,f,d,o),{segmentGroup:_,slicedSegments:m}=Vb(t,f,h,l,s);if(m.length===0&&_.hasChildren()){let w=await this.processChildren(u,l,_,g);return new Wn(g,w)}if(l.length===0&&m.length===0)return new Wn(g,[]);let p=Ti(i)===s,M=await this.processSegment(u,l,_,m,p?He:s,!0,g);return new Wn(g,M instanceof Wn?[M]:[])}async getChildConfig(e,t,i){if(t.children)return{routes:t.children,injector:e};if(t.loadChildren){if(t._loadedRoutes!==void 0){let s=t._loadedNgModuleFactory;return s&&!t._loadedInjector&&(t._loadedInjector=s.create(e).injector),{routes:t._loadedRoutes,injector:t._loadedInjector}}if(this.abortSignal.aborted)throw new Error(this.abortSignal.reason);if(await Xd(g1(e,t,i,this.urlSerializer,this.abortSignal))){let s=await this.configLoader.loadChildren(e,t);return t._loadedRoutes=s.routes,t._loadedInjector=s.injector,t._loadedNgModuleFactory=s.factory,s}throw _1(t)}return{routes:[],injector:e}}};function R1(n){n.sort((e,t)=>e.value.outlet===He?-1:t.value.outlet===He?1:e.value.outlet.localeCompare(t.value.outlet))}function N1(n){let e=n.value.routeConfig;return e&&e.path===""}function _S(n){let e=[],t=new Set;for(let i of n){if(!N1(i)){e.push(i);continue}let r=e.find(s=>i.value.routeConfig===s.value.routeConfig);r!==void 0?(r.children.push(...i.children),t.add(r)):e.push(i)}for(let i of t){let r=_S(i.children);e.push(new Wn(i.value,r))}return e.filter(i=>!t.has(i))}function P1(n){return n.data||{}}function O1(n){return n.resolve||{}}function L1(n,e,t,i,r,s,o){return wn(async a=>{let{state:c,tree:l}=await I1(n,e,t,i,a.extractedUrl,r,s,o);return et(ae({},a),{targetSnapshot:c,urlAfterRedirects:l})})}function F1(n){return wn(e=>{let{targetSnapshot:t,guards:{canActivateChecks:i}}=e;if(!i.length)return tt(e);let r=new Set(i.map(a=>a.route)),s=new Set;for(let a of r)if(!s.has(a))for(let c of xS(a))s.add(c);let o=0;return Wt(s).pipe(fu(a=>r.has(a)?k1(a,t,n):(a.data=zv(a,a.parent,n).resolve,tt(void 0))),ni(()=>o++),hu(1),wn(a=>o===s.size?tt(e):dn))})}function xS(n){let e=n.children.map(t=>xS(t)).flat();return[n,...e]}function k1(n,e,t){let i=n.routeConfig,r=n._resolve;return i?.title!==void 0&&!cS(i)&&(r[Xc]=i.title),Wa(()=>(n.data=zv(n,n.parent,t).resolve,U1(r,n,e).pipe(_t(s=>(n._resolvedData=s,n.data=ae(ae({},n.data),s),null)))))}function U1(n,e,t){let i=Dv(n);if(i.length===0)return tt({});let r={};return Wt(i).pipe(wn(s=>B1(n[s],e,t).pipe(nr(),ni(o=>{if(o instanceof oa)throw uf(new Yr,o);r[s]=o}))),hu(1),_t(()=>r),$a(s=>hS(s)?dn:Up(s)))}function B1(n,e,t){let i=e._environmentInjector,r=la(n,i),s=r.resolve?r.resolve(e,t):vn(i,()=>r(e,t));return Ks(s)}function Hb(n){return gn(e=>{let t=n(e);return t?Wt(t).pipe(_t(()=>e)):tt(e)})}var $v=(()=>{class n{buildTitle(t){let i,r=t.root;for(;r!==void 0;)i=this.getResolvedTitleForRoute(r)??i,r=r.children.find(s=>s.outlet===He);return i}getResolvedTitleForRoute(t){return t.data[Xc]}static \u0275fac=function(i){return new(i||n)};static \u0275prov=Ce({token:n,factory:()=>Q(MS),providedIn:"root"})}return n})(),MS=(()=>{class n extends $v{title;constructor(t){super(),this.title=t}updateTitle(t){let i=this.buildTitle(t);i!==void 0&&this.title.setTitle(i)}static \u0275fac=function(i){return new(i||n)(Re(Ob))};static \u0275prov=Ce({token:n,factory:n.\u0275fac,providedIn:"root"})}return n})(),Kc=new Ie("",{factory:()=>({})}),Qc=new Ie(""),bS=(()=>{class n{componentLoaders=new WeakMap;childrenLoaders=new WeakMap;onLoadStartListener;onLoadEndListener;compiler=Q(ev);async loadComponent(t,i){if(this.componentLoaders.get(i))return this.componentLoaders.get(i);if(i._loadedComponent)return Promise.resolve(i._loadedComponent);this.onLoadStartListener&&this.onLoadStartListener(i);let r=(async()=>{try{let s=await jb(vn(t,()=>i.loadComponent())),o=await wS(ES(s));return this.onLoadEndListener&&this.onLoadEndListener(i),i._loadedComponent=o,o}finally{this.componentLoaders.delete(i)}})();return this.componentLoaders.set(i,r),r}loadChildren(t,i){if(this.childrenLoaders.get(i))return this.childrenLoaders.get(i);if(i._loadedRoutes)return Promise.resolve({routes:i._loadedRoutes,injector:i._loadedInjector});this.onLoadStartListener&&this.onLoadStartListener(i);let r=(async()=>{try{let s=await SS(i,this.compiler,t,this.onLoadEndListener);return i._loadedRoutes=s.routes,i._loadedInjector=s.injector,i._loadedNgModuleFactory=s.factory,s}finally{this.childrenLoaders.delete(i)}})();return this.childrenLoaders.set(i,r),r}static \u0275fac=function(i){return new(i||n)};static \u0275prov=Ce({token:n,factory:n.\u0275fac,providedIn:"root"})}return n})();async function SS(n,e,t,i){let r=await jb(vn(t,()=>n.loadChildren())),s=await wS(ES(r)),o;s instanceof bd||Array.isArray(s)?o=s:o=await e.compileModuleAsync(s),i&&i(n);let a,c,l=!1,u;return Array.isArray(o)?(c=o,l=!0):(a=o.create(t).injector,u=o,c=a.get(Qc,[],{optional:!0,self:!0}).flat()),{routes:c.map(Wv),injector:a,factory:u}}function V1(n){return n&&typeof n=="object"&&"default"in n}function ES(n){return V1(n)?n.default:n}async function wS(n){return n}var mf=(()=>{class n{static \u0275fac=function(i){return new(i||n)};static \u0275prov=Ce({token:n,factory:()=>Q(H1),providedIn:"root"})}return n})(),H1=(()=>{class n{shouldProcessUrl(t){return!0}extract(t){return t}merge(t,i){return t}static \u0275fac=function(i){return new(i||n)};static \u0275prov=Ce({token:n,factory:n.\u0275fac,providedIn:"root"})}return n})(),CS=new Ie("");var z1=()=>{},TS=new Ie(""),DS=(()=>{class n{currentNavigation=zt(null,{equal:()=>!1});currentTransition=null;lastSuccessfulNavigation=zt(null);events=new Ht;transitionAbortWithErrorSubject=new Ht;configLoader=Q(bS);environmentInjector=Q(Xt);destroyRef=Q(dr);urlSerializer=Q(Yc);rootContexts=Q(ca);location=Q(Ko);inputBindingEnabled=Q(hf,{optional:!0})!==null;titleStrategy=Q($v);options=Q(Kc,{optional:!0})||{};paramsInheritanceStrategy=this.options.paramsInheritanceStrategy||"emptyOnly";urlHandlingStrategy=Q(mf);createViewTransition=Q(CS,{optional:!0});navigationErrorHandler=Q(TS,{optional:!0});navigationId=0;get hasRequestedNavigation(){return this.navigationId!==0}transitions;afterPreactivation=()=>tt(void 0);rootComponentType=null;destroyed=!1;constructor(){let t=r=>this.events.next(new tf(r)),i=r=>this.events.next(new nf(r));this.configLoader.onLoadEndListener=i,this.configLoader.onLoadStartListener=t,this.destroyRef.onDestroy(()=>{this.destroyed=!0})}complete(){this.transitions?.complete()}handleNavigationRequest(t){let i=++this.navigationId;Ci(()=>{this.transitions?.next(et(ae({},t),{extractedUrl:this.urlHandlingStrategy.extract(t.rawUrl),targetSnapshot:null,targetRouterState:null,guards:{canActivateChecks:[],canDeactivateChecks:[]},guardsResult:null,id:i,routesRecognizeHandler:{},beforeActivateHandler:{}}))})}setupNavigations(t){return this.transitions=new un(null),this.transitions.pipe(ti(i=>i!==null),gn(i=>{let r=!1,s=new AbortController,o=()=>!r&&this.currentTransition?.id===i.id;return tt(i).pipe(gn(a=>{if(this.navigationId>i.id)return this.cancelNavigationTransition(i,"",_n.SupersededByNewNavigation),dn;this.currentTransition=i;let c=this.lastSuccessfulNavigation();this.currentNavigation.set({id:a.id,initialUrl:a.rawUrl,extractedUrl:a.extractedUrl,targetBrowserUrl:typeof a.extras.browserUrl=="string"?this.urlSerializer.parse(a.extras.browserUrl):a.extras.browserUrl,trigger:a.source,extras:a.extras,previousNavigation:c?et(ae({},c),{previousNavigation:null}):null,abort:()=>s.abort(),routesRecognizeHandler:a.routesRecognizeHandler,beforeActivateHandler:a.beforeActivateHandler});let l=!t.navigated||this.isUpdatingInternalState()||this.isUpdatedBrowserUrl(),u=a.extras.onSameUrlNavigation??t.onSameUrlNavigation;if(!l&&u!=="reload")return this.events.next(new _r(a.id,this.urlSerializer.serialize(a.rawUrl),"",Hc.IgnoredSameUrlNavigation)),a.resolve(!1),dn;if(this.urlHandlingStrategy.shouldProcessUrl(a.rawUrl))return tt(a).pipe(gn(d=>(this.events.next(new Zs(d.id,this.urlSerializer.serialize(d.extractedUrl),d.source,d.restoredState)),d.id!==this.navigationId?dn:Promise.resolve(d))),L1(this.environmentInjector,this.configLoader,this.rootComponentType,t.config,this.urlSerializer,this.paramsInheritanceStrategy,s.signal),ni(d=>{i.targetSnapshot=d.targetSnapshot,i.urlAfterRedirects=d.urlAfterRedirects,this.currentNavigation.update(f=>(f.finalUrl=d.urlAfterRedirects,f)),this.events.next(new Gc)}),gn(d=>Wt(i.routesRecognizeHandler.deferredHandle??tt(void 0)).pipe(_t(()=>d))),ni(()=>{let d=new zc(a.id,this.urlSerializer.serialize(a.extractedUrl),this.urlSerializer.serialize(a.urlAfterRedirects),a.targetSnapshot);this.events.next(d)}));if(l&&this.urlHandlingStrategy.shouldProcessUrl(a.currentRawUrl)){let{id:d,extractedUrl:f,source:h,restoredState:g,extras:_}=a,m=new Zs(d,this.urlSerializer.serialize(f),h,g);this.events.next(m);let p=oS(this.rootComponentType,this.environmentInjector).snapshot;return this.currentTransition=i=et(ae({},a),{targetSnapshot:p,urlAfterRedirects:f,extras:et(ae({},_),{skipLocationChange:!1,replaceUrl:!1})}),this.currentNavigation.update(M=>(M.finalUrl=f,M)),tt(i)}else return this.events.next(new _r(a.id,this.urlSerializer.serialize(a.extractedUrl),"",Hc.IgnoredByUrlHandlingStrategy)),a.resolve(!1),dn}),_t(a=>{let c=new Jd(a.id,this.urlSerializer.serialize(a.extractedUrl),this.urlSerializer.serialize(a.urlAfterRedirects),a.targetSnapshot);return this.events.next(c),this.currentTransition=i=et(ae({},a),{guards:JR(a.targetSnapshot,a.currentSnapshot,this.rootContexts)}),i}),c1(a=>this.events.next(a)),gn(a=>{if(i.guardsResult=a.guardsResult,a.guardsResult&&typeof a.guardsResult!="boolean")throw uf(this.urlSerializer,a.guardsResult);let c=new Kd(a.id,this.urlSerializer.serialize(a.extractedUrl),this.urlSerializer.serialize(a.urlAfterRedirects),a.targetSnapshot,!!a.guardsResult);if(this.events.next(c),!o())return dn;if(!a.guardsResult)return this.cancelNavigationTransition(a,"",_n.GuardRejected),dn;if(a.guards.canActivateChecks.length===0)return tt(a);let l=new Qd(a.id,this.urlSerializer.serialize(a.extractedUrl),this.urlSerializer.serialize(a.urlAfterRedirects),a.targetSnapshot);if(this.events.next(l),!o())return dn;let u=!1;return tt(a).pipe(F1(this.paramsInheritanceStrategy),ni({next:()=>{u=!0;let d=new ef(a.id,this.urlSerializer.serialize(a.extractedUrl),this.urlSerializer.serialize(a.urlAfterRedirects),a.targetSnapshot);this.events.next(d)},complete:()=>{u||this.cancelNavigationTransition(a,"",_n.NoDataFromResolver)}}))}),Hb(a=>{let c=u=>{let d=[];if(u.routeConfig?._loadedComponent)u.component=u.routeConfig?._loadedComponent;else if(u.routeConfig?.loadComponent){let f=u._environmentInjector;d.push(this.configLoader.loadComponent(f,u.routeConfig).then(h=>{u.component=h}))}for(let f of u.children)d.push(...c(f));return d},l=c(a.targetSnapshot.root);return l.length===0?tt(a):Wt(Promise.all(l).then(()=>a))}),Hb(()=>this.afterPreactivation()),gn(()=>{let{currentSnapshot:a,targetSnapshot:c}=i,l=this.createViewTransition?.(this.environmentInjector,a.root,c.root);return l?Wt(l).pipe(_t(()=>i)):tt(i)}),Cn(1),gn(a=>{let c=qR(t.routeReuseStrategy,a.targetSnapshot,a.currentRouterState);this.currentTransition=i=a=et(ae({},a),{targetRouterState:c}),this.currentNavigation.update(u=>(u.targetRouterState=c,u)),this.events.next(new ia);let l=i.beforeActivateHandler.deferredHandle;return l?Wt(l.then(()=>a)):tt(a)}),ni(a=>{new kv(t.routeReuseStrategy,i.targetRouterState,i.currentRouterState,c=>this.events.next(c),this.inputBindingEnabled).activate(this.rootContexts),o()&&(r=!0,this.currentNavigation.update(c=>(c.abort=z1,c)),this.lastSuccessfulNavigation.set(Ci(this.currentNavigation)),this.events.next(new yr(a.id,this.urlSerializer.serialize(a.extractedUrl),this.urlSerializer.serialize(a.urlAfterRedirects))),this.titleStrategy?.updateTitle(a.targetRouterState.snapshot),a.resolve(!0))}),qa(pS(s.signal).pipe(ti(()=>!r&&!i.targetRouterState),ni(()=>{this.cancelNavigationTransition(i,s.signal.reason+"",_n.Aborted)}))),ni({complete:()=>{r=!0}}),qa(this.transitionAbortWithErrorSubject.pipe(ni(a=>{throw a}))),Vp(()=>{s.abort(),r||this.cancelNavigationTransition(i,"",_n.SupersededByNewNavigation),this.currentTransition?.id===i.id&&(this.currentNavigation.set(null),this.currentTransition=null)}),$a(a=>{if(r=!0,this.destroyed)return i.resolve(!1),dn;if(fS(a))this.events.next(new li(i.id,this.urlSerializer.serialize(i.extractedUrl),a.message,a.cancellationCode)),ZR(a)?this.events.next(new ra(a.url,a.navigationBehaviorOptions)):i.resolve(!1);else{let c=new Js(i.id,this.urlSerializer.serialize(i.extractedUrl),a,i.targetSnapshot??void 0);try{let l=vn(this.environmentInjector,()=>this.navigationErrorHandler?.(c));if(l instanceof oa){let{message:u,cancellationCode:d}=uf(this.urlSerializer,l);this.events.next(new li(i.id,this.urlSerializer.serialize(i.extractedUrl),u,d)),this.events.next(new ra(l.redirectTo,l.navigationBehaviorOptions))}else throw this.events.next(c),a}catch(l){this.options.resolveNavigationPromiseOnError?i.resolve(!1):i.reject(l)}}return dn}))}))}cancelNavigationTransition(t,i,r){let s=new li(t.id,this.urlSerializer.serialize(t.extractedUrl),i,r);this.events.next(s),t.resolve(!1)}isUpdatingInternalState(){return this.currentTransition?.extractedUrl.toString()!==this.currentTransition?.currentUrlTree.toString()}isUpdatedBrowserUrl(){let t=this.urlHandlingStrategy.extract(this.urlSerializer.parse(this.location.path(!0))),i=Ci(this.currentNavigation),r=i?.targetBrowserUrl??i?.extractedUrl;return t.toString()!==r?.toString()&&!i?.extras.skipLocationChange}static \u0275fac=function(i){return new(i||n)};static \u0275prov=Ce({token:n,factory:n.\u0275fac,providedIn:"root"})}return n})();function G1(n){return n!==Uc}var IS=new Ie("");var AS=(()=>{class n{static \u0275fac=function(i){return new(i||n)};static \u0275prov=Ce({token:n,factory:()=>Q(j1),providedIn:"root"})}return n})(),ff=class{shouldDetach(e){return!1}store(e,t){}shouldAttach(e){return!1}retrieve(e){return null}shouldReuseRoute(e,t){return e.routeConfig===t.routeConfig}shouldDestroyInjector(e){return!0}},j1=(()=>{class n extends ff{static \u0275fac=(()=>{let t;return function(r){return(t||(t=xc(n)))(r||n)}})();static \u0275prov=Ce({token:n,factory:n.\u0275fac,providedIn:"root"})}return n})(),qv=(()=>{class n{urlSerializer=Q(Yc);options=Q(Kc,{optional:!0})||{};canceledNavigationResolution=this.options.canceledNavigationResolution||"replace";location=Q(Ko);urlHandlingStrategy=Q(mf);urlUpdateStrategy=this.options.urlUpdateStrategy||"deferred";currentUrlTree=new ui;getCurrentUrlTree(){return this.currentUrlTree}rawUrlTree=this.currentUrlTree;getRawUrlTree(){return this.rawUrlTree}createBrowserPath({finalUrl:t,initialUrl:i,targetBrowserUrl:r}){let s=t!==void 0?this.urlHandlingStrategy.merge(t,i):i,o=r??s;return o instanceof ui?this.urlSerializer.serialize(o):o}commitTransition({targetRouterState:t,finalUrl:i,initialUrl:r}){i&&t?(this.currentUrlTree=i,this.rawUrlTree=this.urlHandlingStrategy.merge(i,r),this.routerState=t):this.rawUrlTree=r}routerState=oS(null,Q(Xt));getRouterState(){return this.routerState}_stateMemento=this.createStateMemento();get stateMemento(){return this._stateMemento}updateStateMemento(){this._stateMemento=this.createStateMemento()}createStateMemento(){return{rawUrlTree:this.rawUrlTree,currentUrlTree:this.currentUrlTree,routerState:this.routerState}}restoredState(){return this.location.getState()}static \u0275fac=function(i){return new(i||n)};static \u0275prov=Ce({token:n,factory:()=>Q(W1),providedIn:"root"})}return n})(),W1=(()=>{class n extends qv{currentPageId=0;lastSuccessfulId=-1;get browserPageId(){return this.canceledNavigationResolution!=="computed"?this.currentPageId:this.restoredState()?.\u0275routerPageId??this.currentPageId}registerNonRouterCurrentEntryChangeListener(t){return this.location.subscribe(i=>{i.type==="popstate"&&setTimeout(()=>{t(i.url,i.state,"popstate",{replaceUrl:!0})})})}handleRouterEvent(t,i){t instanceof Zs?this.updateStateMemento():t instanceof _r?this.commitTransition(i):t instanceof zc?this.urlUpdateStrategy==="eager"&&(i.extras.skipLocationChange||this.setBrowserUrl(this.createBrowserPath(i),i)):t instanceof ia?(this.commitTransition(i),this.urlUpdateStrategy==="deferred"&&!i.extras.skipLocationChange&&this.setBrowserUrl(this.createBrowserPath(i),i)):t instanceof li&&!sS(t)?this.restoreHistory(i):t instanceof Js?this.restoreHistory(i,!0):t instanceof yr&&(this.lastSuccessfulId=t.id,this.currentPageId=this.browserPageId)}setBrowserUrl(t,{extras:i,id:r}){let{replaceUrl:s,state:o}=i;if(this.location.isCurrentPathEqualTo(t)||s){let a=this.browserPageId,c=ae(ae({},o),this.generateNgRouterState(r,a));this.location.replaceState(t,"",c)}else{let a=ae(ae({},o),this.generateNgRouterState(r,this.browserPageId+1));this.location.go(t,"",a)}}restoreHistory(t,i=!1){if(this.canceledNavigationResolution==="computed"){let r=this.browserPageId,s=this.currentPageId-r;s!==0?this.location.historyGo(s):this.getCurrentUrlTree()===t.finalUrl&&s===0&&(this.resetInternalState(t),this.resetUrlToCurrentUrlTree())}else this.canceledNavigationResolution==="replace"&&(i&&this.resetInternalState(t),this.resetUrlToCurrentUrlTree())}resetInternalState({finalUrl:t}){this.routerState=this.stateMemento.routerState,this.currentUrlTree=this.stateMemento.currentUrlTree,this.rawUrlTree=this.urlHandlingStrategy.merge(this.currentUrlTree,t??this.rawUrlTree)}resetUrlToCurrentUrlTree(){this.location.replaceState(this.urlSerializer.serialize(this.getRawUrlTree()),"",this.generateNgRouterState(this.lastSuccessfulId,this.currentPageId))}generateNgRouterState(t,i){return this.canceledNavigationResolution==="computed"?{navigationId:t,\u0275routerPageId:i}:{navigationId:t}}static \u0275fac=(()=>{let t;return function(r){return(t||(t=xc(n)))(r||n)}})();static \u0275prov=Ce({token:n,factory:n.\u0275fac,providedIn:"root"})}return n})();function Xv(n,e){n.events.pipe(ti(t=>t instanceof yr||t instanceof li||t instanceof Js||t instanceof _r),_t(t=>t instanceof yr||t instanceof _r?0:(t instanceof li?t.code===_n.Redirect||t.code===_n.SupersededByNewNavigation:!1)?2:1),ti(t=>t!==2),Cn(1)).subscribe(()=>{e()})}var gf=(()=>{class n{get currentUrlTree(){return this.stateManager.getCurrentUrlTree()}get rawUrlTree(){return this.stateManager.getRawUrlTree()}disposed=!1;nonRouterCurrentEntryChangeSubscription;console=Q(Xg);stateManager=Q(qv);options=Q(Kc,{optional:!0})||{};pendingTasks=Q(Gr);urlUpdateStrategy=this.options.urlUpdateStrategy||"deferred";navigationTransitions=Q(DS);urlSerializer=Q(Yc);location=Q(Ko);urlHandlingStrategy=Q(mf);injector=Q(Xt);_events=new Ht;get events(){return this._events}get routerState(){return this.stateManager.getRouterState()}navigated=!1;routeReuseStrategy=Q(AS);injectorCleanup=Q(IS,{optional:!0});onSameUrlNavigation=this.options.onSameUrlNavigation||"ignore";config=Q(Qc,{optional:!0})?.flat()??[];componentInputBindingEnabled=!!Q(hf,{optional:!0});currentNavigation=this.navigationTransitions.currentNavigation.asReadonly();constructor(){this.resetConfig(this.config),this.navigationTransitions.setupNavigations(this).subscribe({error:t=>{}}),this.subscribeToNavigationEvents()}eventsSubscription=new ln;subscribeToNavigationEvents(){let t=this.navigationTransitions.events.subscribe(i=>{try{let r=this.navigationTransitions.currentTransition,s=Ci(this.navigationTransitions.currentNavigation);if(r!==null&&s!==null){if(this.stateManager.handleRouterEvent(i,s),i instanceof li&&i.code!==_n.Redirect&&i.code!==_n.SupersededByNewNavigation)this.navigated=!0;else if(i instanceof yr)this.navigated=!0,this.injectorCleanup?.(this.routeReuseStrategy,this.routerState,this.config);else if(i instanceof ra){let o=i.navigationBehaviorOptions,a=this.urlHandlingStrategy.merge(i.url,r.currentRawUrl),c=ae({scroll:r.extras.scroll,browserUrl:r.extras.browserUrl,info:r.extras.info,skipLocationChange:r.extras.skipLocationChange,replaceUrl:r.extras.replaceUrl||this.urlUpdateStrategy==="eager"||G1(r.source)},o);this.scheduleNavigation(a,Uc,null,c,{resolve:r.resolve,reject:r.reject,promise:r.promise})}}WR(i)&&this._events.next(i)}catch(r){this.navigationTransitions.transitionAbortWithErrorSubject.next(r)}});this.eventsSubscription.add(t)}resetRootComponentType(t){this.routerState.root.component=t,this.navigationTransitions.rootComponentType=t}initialNavigation(){this.setUpLocationChangeListener(),this.navigationTransitions.hasRequestedNavigation||this.navigateToSyncWithBrowser(this.location.path(!0),Uc,this.stateManager.restoredState(),{replaceUrl:!0})}setUpLocationChangeListener(){this.nonRouterCurrentEntryChangeSubscription??=this.stateManager.registerNonRouterCurrentEntryChangeListener((t,i,r,s)=>{this.navigateToSyncWithBrowser(t,r,i,s)})}navigateToSyncWithBrowser(t,i,r,s){let o=r?.navigationId?r:null;if(r){let c=ae({},r);delete c.navigationId,delete c.\u0275routerPageId,Object.keys(c).length!==0&&(s.state=c)}let a=this.parseUrl(t);this.scheduleNavigation(a,i,o,s).catch(c=>{this.disposed||this.injector.get(xi)(c)})}get url(){return this.serializeUrl(this.currentUrlTree)}getCurrentNavigation(){return Ci(this.navigationTransitions.currentNavigation)}get lastSuccessfulNavigation(){return this.navigationTransitions.lastSuccessfulNavigation}resetConfig(t){this.config=t.map(Wv),this.navigated=!1}ngOnDestroy(){this.dispose()}dispose(){this._events.unsubscribe(),this.navigationTransitions.complete(),this.nonRouterCurrentEntryChangeSubscription?.unsubscribe(),this.nonRouterCurrentEntryChangeSubscription=void 0,this.disposed=!0,this.eventsSubscription.unsubscribe()}createUrlTree(t,i={}){let{relativeTo:r,queryParams:s,fragment:o,queryParamsHandling:a,preserveFragment:c}=i,l=c?this.currentUrlTree.fragment:o,u=null;switch(a??this.options.defaultQueryParamsHandling){case"merge":u=ae(ae({},this.currentUrlTree.queryParams),s);break;case"preserve":u=this.currentUrlTree.queryParams;break;default:u=s||null}u!==null&&(u=this.removeEmptyProps(u));let d;try{let f=r?r.snapshot:this.routerState.snapshot.root;d=tS(f)}catch{(typeof t[0]!="string"||t[0][0]!=="/")&&(t=[]),d=this.currentUrlTree.root}return nS(d,t,u,l??null,this.urlSerializer)}navigateByUrl(t,i={skipLocationChange:!1}){let r=na(t)?t:this.parseUrl(t),s=this.urlHandlingStrategy.merge(r,this.rawUrlTree);return this.scheduleNavigation(s,Uc,null,i)}navigate(t,i={skipLocationChange:!1}){return $1(t),this.navigateByUrl(this.createUrlTree(t,i),i)}serializeUrl(t){return this.urlSerializer.serialize(t)}parseUrl(t){try{return this.urlSerializer.parse(t)}catch{return this.console.warn(Fr(4018,!1)),this.urlSerializer.parse("/")}}isActive(t,i){let r;if(i===!0?r=ae({},$b):i===!1?r=ae({},Iv):r=ae(ae({},Iv),i),na(t))return Lb(this.currentUrlTree,t,r);let s=this.parseUrl(t);return Lb(this.currentUrlTree,s,r)}removeEmptyProps(t){return Object.entries(t).reduce((i,[r,s])=>(s!=null&&(i[r]=s),i),{})}scheduleNavigation(t,i,r,s,o){if(this.disposed)return Promise.resolve(!1);let a,c,l;o?(a=o.resolve,c=o.reject,l=o.promise):l=new Promise((d,f)=>{a=d,c=f});let u=this.pendingTasks.add();return Xv(this,()=>{queueMicrotask(()=>this.pendingTasks.remove(u))}),this.navigationTransitions.handleNavigationRequest({source:i,restoredState:r,currentUrlTree:this.currentUrlTree,currentRawUrl:this.currentUrlTree,rawUrl:t,extras:s,resolve:a,reject:c,promise:l,currentSnapshot:this.routerState.snapshot,currentRouterState:this.routerState}),l.catch(Promise.reject.bind(Promise))}static \u0275fac=function(i){return new(i||n)};static \u0275prov=Ce({token:n,factory:n.\u0275fac,providedIn:"root"})}return n})();function $1(n){for(let e=0;e<n.length;e++)if(n[e]==null)throw new ge(4008,!1)}var Y1=new Ie("");function Yv(n,...e){return sr([{provide:Qc,multi:!0,useValue:n},[],{provide:Zr,useFactory:Z1},{provide:Ed,multi:!0,useFactory:J1},e.map(t=>t.\u0275providers)])}function Z1(){return Q(gf).routerState.root}function J1(){let n=Q(Fn);return e=>{let t=n.get(hr);if(e!==t.components[0])return;let i=n.get(gf),r=n.get(K1);n.get(Q1)===1&&i.initialNavigation(),n.get(eN,null,{optional:!0})?.setUpPreloading(),n.get(Y1,null,{optional:!0})?.init(),i.resetRootComponentType(t.componentTypes[0]),r.closed||(r.next(),r.complete(),r.unsubscribe())}}var K1=new Ie("",{factory:()=>new Ht}),Q1=new Ie("",{factory:()=>1});var eN=new Ie("");var KS=0,Ry=1,QS=2;var El=1,eE=2,La=3,Tr=0,Nn=1,Xi=2,Yi=0,ro=1,Ny=2,Py=3,Oy=4,tE=5;var rs=100,nE=101,iE=102,rE=103,sE=104,oE=200,aE=201,cE=202,lE=203,Uf=204,Bf=205,uE=206,dE=207,fE=208,hE=209,pE=210,mE=211,gE=212,vE=213,yE=214,Vf=0,Hf=1,zf=2,so=3,Gf=4,jf=5,Wf=6,$f=7,Ly=0,_E=1,xE=2,Ni=0,Fy=1,ky=2,Uy=3,By=4,Vy=5,Hy=6,zy=7;var xy=300,fs=301,ao=302,gh=303,vh=304,wl=306,qf=1e3,ji=1001,Xf=1002,on=1003,ME=1004;var Cl=1005;var hn=1006,yh=1007;var hs=1008;var Vn=1009,Gy=1010,jy=1011,Fa=1012,_h=1013,Pi=1014,Oi=1015,Zi=1016,xh=1017,Mh=1018,ka=1020,Wy=35902,$y=35899,qy=1021,Xy=1022,hi=1023,Wi=1026,ps=1027,Yy=1028,bh=1029,co=1030,Sh=1031;var Eh=1033,Tl=33776,Dl=33777,Il=33778,Al=33779,wh=35840,Ch=35841,Th=35842,Dh=35843,Ih=36196,Ah=37492,Rh=37496,Nh=37488,Ph=37489,Oh=37490,Lh=37491,Fh=37808,kh=37809,Uh=37810,Bh=37811,Vh=37812,Hh=37813,zh=37814,Gh=37815,jh=37816,Wh=37817,$h=37818,qh=37819,Xh=37820,Yh=37821,Zh=36492,Jh=36494,Kh=36495,Qh=36283,ep=36284,tp=36285,np=36286;var sl=2300,Yf=2301,kf=2302,My=2303,by=2400,Sy=2401,Ey=2402;var bE=3200;var Zy=0,SE=1,Ir="",Yn="srgb",oo="srgb-linear",ol="linear",gt="srgb";var io=7680;var wy=519,EE=512,wE=513,CE=514,ip=515,TE=516,DE=517,rp=518,IE=519,Cy=35044;var Jy="300 es",Ri=2e3,Sa=2001;function nN(n){for(let e=n.length-1;e>=0;--e)if(n[e]>=65535)return!0;return!1}function iN(n){return ArrayBuffer.isView(n)&&!(n instanceof DataView)}function al(n){return document.createElementNS("http://www.w3.org/1999/xhtml",n)}function AE(){let n=al("canvas");return n.style.display="block",n}var RS={},Ea=null;function Ky(...n){let e="THREE."+n.shift();Ea?Ea("log",e,...n):console.log(e,...n)}function RE(n){let e=n[0];if(typeof e=="string"&&e.startsWith("TSL:")){let t=n[1];t&&t.isStackTrace?n[0]+=" "+t.getLocation():n[1]='Stack trace not available. Enable "THREE.Node.captureStackTrace" to capture stack traces.'}return n}function Fe(...n){n=RE(n);let e="THREE."+n.shift();if(Ea)Ea("warn",e,...n);else{let t=n[0];t&&t.isStackTrace?console.warn(t.getError(e)):console.warn(e,...n)}}function Ne(...n){n=RE(n);let e="THREE."+n.shift();if(Ea)Ea("error",e,...n);else{let t=n[0];t&&t.isStackTrace?console.error(t.getError(e)):console.error(e,...n)}}function cl(...n){let e=n.join(" ");e in RS||(RS[e]=!0,Fe(...n))}function NE(n,e,t){return new Promise(function(i,r){function s(){switch(n.clientWaitSync(e,n.SYNC_FLUSH_COMMANDS_BIT,0)){case n.WAIT_FAILED:r();break;case n.TIMEOUT_EXPIRED:setTimeout(s,t);break;default:i()}}setTimeout(s,t)})}var PE={[Vf]:Hf,[zf]:Wf,[Gf]:$f,[so]:jf,[Hf]:Vf,[Wf]:zf,[$f]:Gf,[jf]:so},Dr=class{addEventListener(e,t){this._listeners===void 0&&(this._listeners={});let i=this._listeners;i[e]===void 0&&(i[e]=[]),i[e].indexOf(t)===-1&&i[e].push(t)}hasEventListener(e,t){let i=this._listeners;return i===void 0?!1:i[e]!==void 0&&i[e].indexOf(t)!==-1}removeEventListener(e,t){let i=this._listeners;if(i===void 0)return;let r=i[e];if(r!==void 0){let s=r.indexOf(t);s!==-1&&r.splice(s,1)}}dispatchEvent(e){let t=this._listeners;if(t===void 0)return;let i=t[e.type];if(i!==void 0){e.target=this;let r=i.slice(0);for(let s=0,o=r.length;s<o;s++)r[s].call(this,e);e.target=null}}},xn=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"];var Zv=Math.PI/180,Zf=180/Math.PI;function Rl(){let n=Math.random()*4294967295|0,e=Math.random()*4294967295|0,t=Math.random()*4294967295|0,i=Math.random()*4294967295|0;return(xn[n&255]+xn[n>>8&255]+xn[n>>16&255]+xn[n>>24&255]+"-"+xn[e&255]+xn[e>>8&255]+"-"+xn[e>>16&15|64]+xn[e>>24&255]+"-"+xn[t&63|128]+xn[t>>8&255]+"-"+xn[t>>16&255]+xn[t>>24&255]+xn[i&255]+xn[i>>8&255]+xn[i>>16&255]+xn[i>>24&255]).toLowerCase()}function it(n,e,t){return Math.max(e,Math.min(t,n))}function rN(n,e){return(n%e+e)%e}function Jv(n,e,t){return(1-t)*n+t*e}function el(n,e){switch(e.constructor){case Float32Array:return n;case Uint32Array:return n/4294967295;case Uint16Array:return n/65535;case Uint8Array:return n/255;case Int32Array:return Math.max(n/2147483647,-1);case Int16Array:return Math.max(n/32767,-1);case Int8Array:return Math.max(n/127,-1);default:throw new Error("Invalid component type.")}}function Bn(n,e){switch(e.constructor){case Float32Array:return n;case Uint32Array:return Math.round(n*4294967295);case Uint16Array:return Math.round(n*65535);case Uint8Array:return Math.round(n*255);case Int32Array:return Math.round(n*2147483647);case Int16Array:return Math.round(n*32767);case Int8Array:return Math.round(n*127);default:throw new Error("Invalid component type.")}}var rt=class n{constructor(e=0,t=0){n.prototype.isVector2=!0,this.x=e,this.y=t}get width(){return this.x}set width(e){this.x=e}get height(){return this.y}set height(e){this.y=e}set(e,t){return this.x=e,this.y=t,this}setScalar(e){return this.x=e,this.y=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y)}copy(e){return this.x=e.x,this.y=e.y,this}add(e){return this.x+=e.x,this.y+=e.y,this}addScalar(e){return this.x+=e,this.y+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this}subScalar(e){return this.x-=e,this.y-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this}multiply(e){return this.x*=e.x,this.y*=e.y,this}multiplyScalar(e){return this.x*=e,this.y*=e,this}divide(e){return this.x/=e.x,this.y/=e.y,this}divideScalar(e){return this.multiplyScalar(1/e)}applyMatrix3(e){let t=this.x,i=this.y,r=e.elements;return this.x=r[0]*t+r[3]*i+r[6],this.y=r[1]*t+r[4]*i+r[7],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this}clamp(e,t){return this.x=it(this.x,e.x,t.x),this.y=it(this.y,e.y,t.y),this}clampScalar(e,t){return this.x=it(this.x,e,t),this.y=it(this.y,e,t),this}clampLength(e,t){let i=this.length();return this.divideScalar(i||1).multiplyScalar(it(i,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(e){return this.x*e.x+this.y*e.y}cross(e){return this.x*e.y-this.y*e.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(e){let t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;let i=this.dot(e)/t;return Math.acos(it(i,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){let t=this.x-e.x,i=this.y-e.y;return t*t+i*i}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this}lerpVectors(e,t,i){return this.x=e.x+(t.x-e.x)*i,this.y=e.y+(t.y-e.y)*i,this}equals(e){return e.x===this.x&&e.y===this.y}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this}rotateAround(e,t){let i=Math.cos(t),r=Math.sin(t),s=this.x-e.x,o=this.y-e.y;return this.x=s*i-o*r+e.x,this.y=s*r+o*i+e.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}},fi=class{constructor(e=0,t=0,i=0,r=1){this.isQuaternion=!0,this._x=e,this._y=t,this._z=i,this._w=r}static slerpFlat(e,t,i,r,s,o,a){let c=i[r+0],l=i[r+1],u=i[r+2],d=i[r+3],f=s[o+0],h=s[o+1],g=s[o+2],_=s[o+3];if(d!==_||c!==f||l!==h||u!==g){let m=c*f+l*h+u*g+d*_;m<0&&(f=-f,h=-h,g=-g,_=-_,m=-m);let p=1-a;if(m<.9995){let M=Math.acos(m),w=Math.sin(M);p=Math.sin(p*M)/w,a=Math.sin(a*M)/w,c=c*p+f*a,l=l*p+h*a,u=u*p+g*a,d=d*p+_*a}else{c=c*p+f*a,l=l*p+h*a,u=u*p+g*a,d=d*p+_*a;let M=1/Math.sqrt(c*c+l*l+u*u+d*d);c*=M,l*=M,u*=M,d*=M}}e[t]=c,e[t+1]=l,e[t+2]=u,e[t+3]=d}static multiplyQuaternionsFlat(e,t,i,r,s,o){let a=i[r],c=i[r+1],l=i[r+2],u=i[r+3],d=s[o],f=s[o+1],h=s[o+2],g=s[o+3];return e[t]=a*g+u*d+c*h-l*f,e[t+1]=c*g+u*f+l*d-a*h,e[t+2]=l*g+u*h+a*f-c*d,e[t+3]=u*g-a*d-c*f-l*h,e}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get w(){return this._w}set w(e){this._w=e,this._onChangeCallback()}set(e,t,i,r){return this._x=e,this._y=t,this._z=i,this._w=r,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(e){return this._x=e.x,this._y=e.y,this._z=e.z,this._w=e.w,this._onChangeCallback(),this}setFromEuler(e,t=!0){let i=e._x,r=e._y,s=e._z,o=e._order,a=Math.cos,c=Math.sin,l=a(i/2),u=a(r/2),d=a(s/2),f=c(i/2),h=c(r/2),g=c(s/2);switch(o){case"XYZ":this._x=f*u*d+l*h*g,this._y=l*h*d-f*u*g,this._z=l*u*g+f*h*d,this._w=l*u*d-f*h*g;break;case"YXZ":this._x=f*u*d+l*h*g,this._y=l*h*d-f*u*g,this._z=l*u*g-f*h*d,this._w=l*u*d+f*h*g;break;case"ZXY":this._x=f*u*d-l*h*g,this._y=l*h*d+f*u*g,this._z=l*u*g+f*h*d,this._w=l*u*d-f*h*g;break;case"ZYX":this._x=f*u*d-l*h*g,this._y=l*h*d+f*u*g,this._z=l*u*g-f*h*d,this._w=l*u*d+f*h*g;break;case"YZX":this._x=f*u*d+l*h*g,this._y=l*h*d+f*u*g,this._z=l*u*g-f*h*d,this._w=l*u*d-f*h*g;break;case"XZY":this._x=f*u*d-l*h*g,this._y=l*h*d-f*u*g,this._z=l*u*g+f*h*d,this._w=l*u*d+f*h*g;break;default:Fe("Quaternion: .setFromEuler() encountered an unknown order: "+o)}return t===!0&&this._onChangeCallback(),this}setFromAxisAngle(e,t){let i=t/2,r=Math.sin(i);return this._x=e.x*r,this._y=e.y*r,this._z=e.z*r,this._w=Math.cos(i),this._onChangeCallback(),this}setFromRotationMatrix(e){let t=e.elements,i=t[0],r=t[4],s=t[8],o=t[1],a=t[5],c=t[9],l=t[2],u=t[6],d=t[10],f=i+a+d;if(f>0){let h=.5/Math.sqrt(f+1);this._w=.25/h,this._x=(u-c)*h,this._y=(s-l)*h,this._z=(o-r)*h}else if(i>a&&i>d){let h=2*Math.sqrt(1+i-a-d);this._w=(u-c)/h,this._x=.25*h,this._y=(r+o)/h,this._z=(s+l)/h}else if(a>d){let h=2*Math.sqrt(1+a-i-d);this._w=(s-l)/h,this._x=(r+o)/h,this._y=.25*h,this._z=(c+u)/h}else{let h=2*Math.sqrt(1+d-i-a);this._w=(o-r)/h,this._x=(s+l)/h,this._y=(c+u)/h,this._z=.25*h}return this._onChangeCallback(),this}setFromUnitVectors(e,t){let i=e.dot(t)+1;return i<1e-8?(i=0,Math.abs(e.x)>Math.abs(e.z)?(this._x=-e.y,this._y=e.x,this._z=0,this._w=i):(this._x=0,this._y=-e.z,this._z=e.y,this._w=i)):(this._x=e.y*t.z-e.z*t.y,this._y=e.z*t.x-e.x*t.z,this._z=e.x*t.y-e.y*t.x,this._w=i),this.normalize()}angleTo(e){return 2*Math.acos(Math.abs(it(this.dot(e),-1,1)))}rotateTowards(e,t){let i=this.angleTo(e);if(i===0)return this;let r=Math.min(1,t/i);return this.slerp(e,r),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(e){return this._x*e._x+this._y*e._y+this._z*e._z+this._w*e._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let e=this.length();return e===0?(this._x=0,this._y=0,this._z=0,this._w=1):(e=1/e,this._x=this._x*e,this._y=this._y*e,this._z=this._z*e,this._w=this._w*e),this._onChangeCallback(),this}multiply(e){return this.multiplyQuaternions(this,e)}premultiply(e){return this.multiplyQuaternions(e,this)}multiplyQuaternions(e,t){let i=e._x,r=e._y,s=e._z,o=e._w,a=t._x,c=t._y,l=t._z,u=t._w;return this._x=i*u+o*a+r*l-s*c,this._y=r*u+o*c+s*a-i*l,this._z=s*u+o*l+i*c-r*a,this._w=o*u-i*a-r*c-s*l,this._onChangeCallback(),this}slerp(e,t){let i=e._x,r=e._y,s=e._z,o=e._w,a=this.dot(e);a<0&&(i=-i,r=-r,s=-s,o=-o,a=-a);let c=1-t;if(a<.9995){let l=Math.acos(a),u=Math.sin(l);c=Math.sin(c*l)/u,t=Math.sin(t*l)/u,this._x=this._x*c+i*t,this._y=this._y*c+r*t,this._z=this._z*c+s*t,this._w=this._w*c+o*t,this._onChangeCallback()}else this._x=this._x*c+i*t,this._y=this._y*c+r*t,this._z=this._z*c+s*t,this._w=this._w*c+o*t,this.normalize();return this}slerpQuaternions(e,t,i){return this.copy(e).slerp(t,i)}random(){let e=2*Math.PI*Math.random(),t=2*Math.PI*Math.random(),i=Math.random(),r=Math.sqrt(1-i),s=Math.sqrt(i);return this.set(r*Math.sin(e),r*Math.cos(e),s*Math.sin(t),s*Math.cos(t))}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._w===this._w}fromArray(e,t=0){return this._x=e[t],this._y=e[t+1],this._z=e[t+2],this._w=e[t+3],this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._w,e}fromBufferAttribute(e,t){return this._x=e.getX(t),this._y=e.getY(t),this._z=e.getZ(t),this._w=e.getW(t),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}},F=class n{constructor(e=0,t=0,i=0){n.prototype.isVector3=!0,this.x=e,this.y=t,this.z=i}set(e,t,i){return i===void 0&&(i=this.z),this.x=e,this.y=t,this.z=i,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this}multiplyVectors(e,t){return this.x=e.x*t.x,this.y=e.y*t.y,this.z=e.z*t.z,this}applyEuler(e){return this.applyQuaternion(NS.setFromEuler(e))}applyAxisAngle(e,t){return this.applyQuaternion(NS.setFromAxisAngle(e,t))}applyMatrix3(e){let t=this.x,i=this.y,r=this.z,s=e.elements;return this.x=s[0]*t+s[3]*i+s[6]*r,this.y=s[1]*t+s[4]*i+s[7]*r,this.z=s[2]*t+s[5]*i+s[8]*r,this}applyNormalMatrix(e){return this.applyMatrix3(e).normalize()}applyMatrix4(e){let t=this.x,i=this.y,r=this.z,s=e.elements,o=1/(s[3]*t+s[7]*i+s[11]*r+s[15]);return this.x=(s[0]*t+s[4]*i+s[8]*r+s[12])*o,this.y=(s[1]*t+s[5]*i+s[9]*r+s[13])*o,this.z=(s[2]*t+s[6]*i+s[10]*r+s[14])*o,this}applyQuaternion(e){let t=this.x,i=this.y,r=this.z,s=e.x,o=e.y,a=e.z,c=e.w,l=2*(o*r-a*i),u=2*(a*t-s*r),d=2*(s*i-o*t);return this.x=t+c*l+o*d-a*u,this.y=i+c*u+a*l-s*d,this.z=r+c*d+s*u-o*l,this}project(e){return this.applyMatrix4(e.matrixWorldInverse).applyMatrix4(e.projectionMatrix)}unproject(e){return this.applyMatrix4(e.projectionMatrixInverse).applyMatrix4(e.matrixWorld)}transformDirection(e){let t=this.x,i=this.y,r=this.z,s=e.elements;return this.x=s[0]*t+s[4]*i+s[8]*r,this.y=s[1]*t+s[5]*i+s[9]*r,this.z=s[2]*t+s[6]*i+s[10]*r,this.normalize()}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this}divideScalar(e){return this.multiplyScalar(1/e)}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this}clamp(e,t){return this.x=it(this.x,e.x,t.x),this.y=it(this.y,e.y,t.y),this.z=it(this.z,e.z,t.z),this}clampScalar(e,t){return this.x=it(this.x,e,t),this.y=it(this.y,e,t),this.z=it(this.z,e,t),this}clampLength(e,t){let i=this.length();return this.divideScalar(i||1).multiplyScalar(it(i,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this}lerpVectors(e,t,i){return this.x=e.x+(t.x-e.x)*i,this.y=e.y+(t.y-e.y)*i,this.z=e.z+(t.z-e.z)*i,this}cross(e){return this.crossVectors(this,e)}crossVectors(e,t){let i=e.x,r=e.y,s=e.z,o=t.x,a=t.y,c=t.z;return this.x=r*c-s*a,this.y=s*o-i*c,this.z=i*a-r*o,this}projectOnVector(e){let t=e.lengthSq();if(t===0)return this.set(0,0,0);let i=e.dot(this)/t;return this.copy(e).multiplyScalar(i)}projectOnPlane(e){return Kv.copy(this).projectOnVector(e),this.sub(Kv)}reflect(e){return this.sub(Kv.copy(e).multiplyScalar(2*this.dot(e)))}angleTo(e){let t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;let i=this.dot(e)/t;return Math.acos(it(i,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){let t=this.x-e.x,i=this.y-e.y,r=this.z-e.z;return t*t+i*i+r*r}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)+Math.abs(this.z-e.z)}setFromSpherical(e){return this.setFromSphericalCoords(e.radius,e.phi,e.theta)}setFromSphericalCoords(e,t,i){let r=Math.sin(t)*e;return this.x=r*Math.sin(i),this.y=Math.cos(t)*e,this.z=r*Math.cos(i),this}setFromCylindrical(e){return this.setFromCylindricalCoords(e.radius,e.theta,e.y)}setFromCylindricalCoords(e,t,i){return this.x=e*Math.sin(t),this.y=i,this.z=e*Math.cos(t),this}setFromMatrixPosition(e){let t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this}setFromMatrixScale(e){let t=this.setFromMatrixColumn(e,0).length(),i=this.setFromMatrixColumn(e,1).length(),r=this.setFromMatrixColumn(e,2).length();return this.x=t,this.y=i,this.z=r,this}setFromMatrixColumn(e,t){return this.fromArray(e.elements,t*4)}setFromMatrix3Column(e,t){return this.fromArray(e.elements,t*3)}setFromEuler(e){return this.x=e._x,this.y=e._y,this.z=e._z,this}setFromColor(e){return this.x=e.r,this.y=e.g,this.z=e.b,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){let e=Math.random()*Math.PI*2,t=Math.random()*2-1,i=Math.sqrt(1-t*t);return this.x=i*Math.cos(e),this.y=t,this.z=i*Math.sin(e),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}},Kv=new F,NS=new fi,We=class n{constructor(e,t,i,r,s,o,a,c,l){n.prototype.isMatrix3=!0,this.elements=[1,0,0,0,1,0,0,0,1],e!==void 0&&this.set(e,t,i,r,s,o,a,c,l)}set(e,t,i,r,s,o,a,c,l){let u=this.elements;return u[0]=e,u[1]=r,u[2]=a,u[3]=t,u[4]=s,u[5]=c,u[6]=i,u[7]=o,u[8]=l,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(e){let t=this.elements,i=e.elements;return t[0]=i[0],t[1]=i[1],t[2]=i[2],t[3]=i[3],t[4]=i[4],t[5]=i[5],t[6]=i[6],t[7]=i[7],t[8]=i[8],this}extractBasis(e,t,i){return e.setFromMatrix3Column(this,0),t.setFromMatrix3Column(this,1),i.setFromMatrix3Column(this,2),this}setFromMatrix4(e){let t=e.elements;return this.set(t[0],t[4],t[8],t[1],t[5],t[9],t[2],t[6],t[10]),this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){let i=e.elements,r=t.elements,s=this.elements,o=i[0],a=i[3],c=i[6],l=i[1],u=i[4],d=i[7],f=i[2],h=i[5],g=i[8],_=r[0],m=r[3],p=r[6],M=r[1],w=r[4],S=r[7],D=r[2],C=r[5],A=r[8];return s[0]=o*_+a*M+c*D,s[3]=o*m+a*w+c*C,s[6]=o*p+a*S+c*A,s[1]=l*_+u*M+d*D,s[4]=l*m+u*w+d*C,s[7]=l*p+u*S+d*A,s[2]=f*_+h*M+g*D,s[5]=f*m+h*w+g*C,s[8]=f*p+h*S+g*A,this}multiplyScalar(e){let t=this.elements;return t[0]*=e,t[3]*=e,t[6]*=e,t[1]*=e,t[4]*=e,t[7]*=e,t[2]*=e,t[5]*=e,t[8]*=e,this}determinant(){let e=this.elements,t=e[0],i=e[1],r=e[2],s=e[3],o=e[4],a=e[5],c=e[6],l=e[7],u=e[8];return t*o*u-t*a*l-i*s*u+i*a*c+r*s*l-r*o*c}invert(){let e=this.elements,t=e[0],i=e[1],r=e[2],s=e[3],o=e[4],a=e[5],c=e[6],l=e[7],u=e[8],d=u*o-a*l,f=a*c-u*s,h=l*s-o*c,g=t*d+i*f+r*h;if(g===0)return this.set(0,0,0,0,0,0,0,0,0);let _=1/g;return e[0]=d*_,e[1]=(r*l-u*i)*_,e[2]=(a*i-r*o)*_,e[3]=f*_,e[4]=(u*t-r*c)*_,e[5]=(r*s-a*t)*_,e[6]=h*_,e[7]=(i*c-l*t)*_,e[8]=(o*t-i*s)*_,this}transpose(){let e,t=this.elements;return e=t[1],t[1]=t[3],t[3]=e,e=t[2],t[2]=t[6],t[6]=e,e=t[5],t[5]=t[7],t[7]=e,this}getNormalMatrix(e){return this.setFromMatrix4(e).invert().transpose()}transposeIntoArray(e){let t=this.elements;return e[0]=t[0],e[1]=t[3],e[2]=t[6],e[3]=t[1],e[4]=t[4],e[5]=t[7],e[6]=t[2],e[7]=t[5],e[8]=t[8],this}setUvTransform(e,t,i,r,s,o,a){let c=Math.cos(s),l=Math.sin(s);return this.set(i*c,i*l,-i*(c*o+l*a)+o+e,-r*l,r*c,-r*(-l*o+c*a)+a+t,0,0,1),this}scale(e,t){return this.premultiply(Qv.makeScale(e,t)),this}rotate(e){return this.premultiply(Qv.makeRotation(-e)),this}translate(e,t){return this.premultiply(Qv.makeTranslation(e,t)),this}makeTranslation(e,t){return e.isVector2?this.set(1,0,e.x,0,1,e.y,0,0,1):this.set(1,0,e,0,1,t,0,0,1),this}makeRotation(e){let t=Math.cos(e),i=Math.sin(e);return this.set(t,-i,0,i,t,0,0,0,1),this}makeScale(e,t){return this.set(e,0,0,0,t,0,0,0,1),this}equals(e){let t=this.elements,i=e.elements;for(let r=0;r<9;r++)if(t[r]!==i[r])return!1;return!0}fromArray(e,t=0){for(let i=0;i<9;i++)this.elements[i]=e[i+t];return this}toArray(e=[],t=0){let i=this.elements;return e[t]=i[0],e[t+1]=i[1],e[t+2]=i[2],e[t+3]=i[3],e[t+4]=i[4],e[t+5]=i[5],e[t+6]=i[6],e[t+7]=i[7],e[t+8]=i[8],e}clone(){return new this.constructor().fromArray(this.elements)}},Qv=new We,PS=new We().set(.4123908,.3575843,.1804808,.212639,.7151687,.0721923,.0193308,.1191948,.9505322),OS=new We().set(3.2409699,-1.5373832,-.4986108,-.9692436,1.8759675,.0415551,.0556301,-.203977,1.0569715);function sN(){let n={enabled:!0,workingColorSpace:oo,spaces:{},convert:function(r,s,o){return this.enabled===!1||s===o||!s||!o||(this.spaces[s].transfer===gt&&(r.r=Cr(r.r),r.g=Cr(r.g),r.b=Cr(r.b)),this.spaces[s].primaries!==this.spaces[o].primaries&&(r.applyMatrix3(this.spaces[s].toXYZ),r.applyMatrix3(this.spaces[o].fromXYZ)),this.spaces[o].transfer===gt&&(r.r=ba(r.r),r.g=ba(r.g),r.b=ba(r.b))),r},workingToColorSpace:function(r,s){return this.convert(r,this.workingColorSpace,s)},colorSpaceToWorking:function(r,s){return this.convert(r,s,this.workingColorSpace)},getPrimaries:function(r){return this.spaces[r].primaries},getTransfer:function(r){return r===Ir?ol:this.spaces[r].transfer},getToneMappingMode:function(r){return this.spaces[r].outputColorSpaceConfig.toneMappingMode||"standard"},getLuminanceCoefficients:function(r,s=this.workingColorSpace){return r.fromArray(this.spaces[s].luminanceCoefficients)},define:function(r){Object.assign(this.spaces,r)},_getMatrix:function(r,s,o){return r.copy(this.spaces[s].toXYZ).multiply(this.spaces[o].fromXYZ)},_getDrawingBufferColorSpace:function(r){return this.spaces[r].outputColorSpaceConfig.drawingBufferColorSpace},_getUnpackColorSpace:function(r=this.workingColorSpace){return this.spaces[r].workingColorSpaceConfig.unpackColorSpace},fromWorkingColorSpace:function(r,s){return cl("ColorManagement: .fromWorkingColorSpace() has been renamed to .workingToColorSpace()."),n.workingToColorSpace(r,s)},toWorkingColorSpace:function(r,s){return cl("ColorManagement: .toWorkingColorSpace() has been renamed to .colorSpaceToWorking()."),n.colorSpaceToWorking(r,s)}},e=[.64,.33,.3,.6,.15,.06],t=[.2126,.7152,.0722],i=[.3127,.329];return n.define({[oo]:{primaries:e,whitePoint:i,transfer:ol,toXYZ:PS,fromXYZ:OS,luminanceCoefficients:t,workingColorSpaceConfig:{unpackColorSpace:Yn},outputColorSpaceConfig:{drawingBufferColorSpace:Yn}},[Yn]:{primaries:e,whitePoint:i,transfer:gt,toXYZ:PS,fromXYZ:OS,luminanceCoefficients:t,outputColorSpaceConfig:{drawingBufferColorSpace:Yn}}}),n}var st=sN();function Cr(n){return n<.04045?n*.0773993808:Math.pow(n*.9478672986+.0521327014,2.4)}function ba(n){return n<.0031308?n*12.92:1.055*Math.pow(n,.41666)-.055}var ua,Jf=class{static getDataURL(e,t="image/png"){if(/^data:/i.test(e.src)||typeof HTMLCanvasElement>"u")return e.src;let i;if(e instanceof HTMLCanvasElement)i=e;else{ua===void 0&&(ua=al("canvas")),ua.width=e.width,ua.height=e.height;let r=ua.getContext("2d");e instanceof ImageData?r.putImageData(e,0,0):r.drawImage(e,0,0,e.width,e.height),i=ua}return i.toDataURL(t)}static sRGBToLinear(e){if(typeof HTMLImageElement<"u"&&e instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&e instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&e instanceof ImageBitmap){let t=al("canvas");t.width=e.width,t.height=e.height;let i=t.getContext("2d");i.drawImage(e,0,0,e.width,e.height);let r=i.getImageData(0,0,e.width,e.height),s=r.data;for(let o=0;o<s.length;o++)s[o]=Cr(s[o]/255)*255;return i.putImageData(r,0,0),t}else if(e.data){let t=e.data.slice(0);for(let i=0;i<t.length;i++)t instanceof Uint8Array||t instanceof Uint8ClampedArray?t[i]=Math.floor(Cr(t[i]/255)*255):t[i]=Cr(t[i]);return{data:t,width:e.width,height:e.height}}else return Fe("ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),e}},oN=0,wa=class{constructor(e=null){this.isSource=!0,Object.defineProperty(this,"id",{value:oN++}),this.uuid=Rl(),this.data=e,this.dataReady=!0,this.version=0}getSize(e){let t=this.data;return typeof HTMLVideoElement<"u"&&t instanceof HTMLVideoElement?e.set(t.videoWidth,t.videoHeight,0):typeof VideoFrame<"u"&&t instanceof VideoFrame?e.set(t.displayHeight,t.displayWidth,0):t!==null?e.set(t.width,t.height,t.depth||0):e.set(0,0,0),e}set needsUpdate(e){e===!0&&this.version++}toJSON(e){let t=e===void 0||typeof e=="string";if(!t&&e.images[this.uuid]!==void 0)return e.images[this.uuid];let i={uuid:this.uuid,url:""},r=this.data;if(r!==null){let s;if(Array.isArray(r)){s=[];for(let o=0,a=r.length;o<a;o++)r[o].isDataTexture?s.push(ey(r[o].image)):s.push(ey(r[o]))}else s=ey(r);i.url=s}return t||(e.images[this.uuid]=i),i}};function ey(n){return typeof HTMLImageElement<"u"&&n instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&n instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&n instanceof ImageBitmap?Jf.getDataURL(n):n.data?{data:Array.from(n.data),width:n.width,height:n.height,type:n.data.constructor.name}:(Fe("Texture: Unable to serialize Texture."),{})}var aN=0,ty=new F,Ar=(()=>{class n extends Dr{constructor(t=n.DEFAULT_IMAGE,i=n.DEFAULT_MAPPING,r=ji,s=ji,o=hn,a=hs,c=hi,l=Vn,u=n.DEFAULT_ANISOTROPY,d=Ir){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:aN++}),this.uuid=Rl(),this.name="",this.source=new wa(t),this.mipmaps=[],this.mapping=i,this.channel=0,this.wrapS=r,this.wrapT=s,this.magFilter=o,this.minFilter=a,this.anisotropy=u,this.format=c,this.internalFormat=null,this.type=l,this.offset=new rt(0,0),this.repeat=new rt(1,1),this.center=new rt(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new We,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=d,this.userData={},this.updateRanges=[],this.version=0,this.onUpdate=null,this.renderTarget=null,this.isRenderTargetTexture=!1,this.isArrayTexture=!!(t&&t.depth&&t.depth>1),this.pmremVersion=0}get width(){return this.source.getSize(ty).x}get height(){return this.source.getSize(ty).y}get depth(){return this.source.getSize(ty).z}get image(){return this.source.data}set image(t=null){this.source.data=t}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}addUpdateRange(t,i){this.updateRanges.push({start:t,count:i})}clearUpdateRanges(){this.updateRanges.length=0}clone(){return new this.constructor().copy(this)}copy(t){return this.name=t.name,this.source=t.source,this.mipmaps=t.mipmaps.slice(0),this.mapping=t.mapping,this.channel=t.channel,this.wrapS=t.wrapS,this.wrapT=t.wrapT,this.magFilter=t.magFilter,this.minFilter=t.minFilter,this.anisotropy=t.anisotropy,this.format=t.format,this.internalFormat=t.internalFormat,this.type=t.type,this.offset.copy(t.offset),this.repeat.copy(t.repeat),this.center.copy(t.center),this.rotation=t.rotation,this.matrixAutoUpdate=t.matrixAutoUpdate,this.matrix.copy(t.matrix),this.generateMipmaps=t.generateMipmaps,this.premultiplyAlpha=t.premultiplyAlpha,this.flipY=t.flipY,this.unpackAlignment=t.unpackAlignment,this.colorSpace=t.colorSpace,this.renderTarget=t.renderTarget,this.isRenderTargetTexture=t.isRenderTargetTexture,this.isArrayTexture=t.isArrayTexture,this.userData=JSON.parse(JSON.stringify(t.userData)),this.needsUpdate=!0,this}setValues(t){for(let i in t){let r=t[i];if(r===void 0){Fe(`Texture.setValues(): parameter '${i}' has value of undefined.`);continue}let s=this[i];if(s===void 0){Fe(`Texture.setValues(): property '${i}' does not exist.`);continue}s&&r&&s.isVector2&&r.isVector2||s&&r&&s.isVector3&&r.isVector3||s&&r&&s.isMatrix3&&r.isMatrix3?s.copy(r):this[i]=r}}toJSON(t){let i=t===void 0||typeof t=="string";if(!i&&t.textures[this.uuid]!==void 0)return t.textures[this.uuid];let r={metadata:{version:4.7,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(t).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(r.userData=this.userData),i||(t.textures[this.uuid]=r),r}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(t){if(this.mapping!==xy)return t;if(t.applyMatrix3(this.matrix),t.x<0||t.x>1)switch(this.wrapS){case qf:t.x=t.x-Math.floor(t.x);break;case ji:t.x=t.x<0?0:1;break;case Xf:Math.abs(Math.floor(t.x)%2)===1?t.x=Math.ceil(t.x)-t.x:t.x=t.x-Math.floor(t.x);break}if(t.y<0||t.y>1)switch(this.wrapT){case qf:t.y=t.y-Math.floor(t.y);break;case ji:t.y=t.y<0?0:1;break;case Xf:Math.abs(Math.floor(t.y)%2)===1?t.y=Math.ceil(t.y)-t.y:t.y=t.y-Math.floor(t.y);break}return this.flipY&&(t.y=1-t.y),t}set needsUpdate(t){t===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(t){t===!0&&this.pmremVersion++}}return n.DEFAULT_IMAGE=null,n.DEFAULT_MAPPING=xy,n.DEFAULT_ANISOTROPY=1,n})(),Ft=class n{constructor(e=0,t=0,i=0,r=1){n.prototype.isVector4=!0,this.x=e,this.y=t,this.z=i,this.w=r}get width(){return this.z}set width(e){this.z=e}get height(){return this.w}set height(e){this.w=e}set(e,t,i,r){return this.x=e,this.y=t,this.z=i,this.w=r,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this.w=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setW(e){return this.w=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;case 3:this.w=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this.w=e.w!==void 0?e.w:1,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this.w+=e.w,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this.w+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this.w=e.w+t.w,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this.w+=e.w*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this.w-=e.w,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this.w-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this.w=e.w-t.w,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this.w*=e.w,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this.w*=e,this}applyMatrix4(e){let t=this.x,i=this.y,r=this.z,s=this.w,o=e.elements;return this.x=o[0]*t+o[4]*i+o[8]*r+o[12]*s,this.y=o[1]*t+o[5]*i+o[9]*r+o[13]*s,this.z=o[2]*t+o[6]*i+o[10]*r+o[14]*s,this.w=o[3]*t+o[7]*i+o[11]*r+o[15]*s,this}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this.w/=e.w,this}divideScalar(e){return this.multiplyScalar(1/e)}setAxisAngleFromQuaternion(e){this.w=2*Math.acos(e.w);let t=Math.sqrt(1-e.w*e.w);return t<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=e.x/t,this.y=e.y/t,this.z=e.z/t),this}setAxisAngleFromRotationMatrix(e){let t,i,r,s,c=e.elements,l=c[0],u=c[4],d=c[8],f=c[1],h=c[5],g=c[9],_=c[2],m=c[6],p=c[10];if(Math.abs(u-f)<.01&&Math.abs(d-_)<.01&&Math.abs(g-m)<.01){if(Math.abs(u+f)<.1&&Math.abs(d+_)<.1&&Math.abs(g+m)<.1&&Math.abs(l+h+p-3)<.1)return this.set(1,0,0,0),this;t=Math.PI;let w=(l+1)/2,S=(h+1)/2,D=(p+1)/2,C=(u+f)/4,A=(d+_)/4,y=(g+m)/4;return w>S&&w>D?w<.01?(i=0,r=.707106781,s=.707106781):(i=Math.sqrt(w),r=C/i,s=A/i):S>D?S<.01?(i=.707106781,r=0,s=.707106781):(r=Math.sqrt(S),i=C/r,s=y/r):D<.01?(i=.707106781,r=.707106781,s=0):(s=Math.sqrt(D),i=A/s,r=y/s),this.set(i,r,s,t),this}let M=Math.sqrt((m-g)*(m-g)+(d-_)*(d-_)+(f-u)*(f-u));return Math.abs(M)<.001&&(M=1),this.x=(m-g)/M,this.y=(d-_)/M,this.z=(f-u)/M,this.w=Math.acos((l+h+p-1)/2),this}setFromMatrixPosition(e){let t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this.w=t[15],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this.w=Math.min(this.w,e.w),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this.w=Math.max(this.w,e.w),this}clamp(e,t){return this.x=it(this.x,e.x,t.x),this.y=it(this.y,e.y,t.y),this.z=it(this.z,e.z,t.z),this.w=it(this.w,e.w,t.w),this}clampScalar(e,t){return this.x=it(this.x,e,t),this.y=it(this.y,e,t),this.z=it(this.z,e,t),this.w=it(this.w,e,t),this}clampLength(e,t){let i=this.length();return this.divideScalar(i||1).multiplyScalar(it(i,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z+this.w*e.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this.w+=(e.w-this.w)*t,this}lerpVectors(e,t,i){return this.x=e.x+(t.x-e.x)*i,this.y=e.y+(t.y-e.y)*i,this.z=e.z+(t.z-e.z)*i,this.w=e.w+(t.w-e.w)*i,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z&&e.w===this.w}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this.w=e[t+3],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e[t+3]=this.w,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this.w=e.getW(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}},Kf=class extends Dr{constructor(e=1,t=1,i={}){super(),i=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:hn,depthBuffer:!0,stencilBuffer:!1,resolveDepthBuffer:!0,resolveStencilBuffer:!0,depthTexture:null,samples:0,count:1,depth:1,multiview:!1},i),this.isRenderTarget=!0,this.width=e,this.height=t,this.depth=i.depth,this.scissor=new Ft(0,0,e,t),this.scissorTest=!1,this.viewport=new Ft(0,0,e,t),this.textures=[];let r={width:e,height:t,depth:i.depth},s=new Ar(r),o=i.count;for(let a=0;a<o;a++)this.textures[a]=s.clone(),this.textures[a].isRenderTargetTexture=!0,this.textures[a].renderTarget=this;this._setTextureOptions(i),this.depthBuffer=i.depthBuffer,this.stencilBuffer=i.stencilBuffer,this.resolveDepthBuffer=i.resolveDepthBuffer,this.resolveStencilBuffer=i.resolveStencilBuffer,this._depthTexture=null,this.depthTexture=i.depthTexture,this.samples=i.samples,this.multiview=i.multiview}_setTextureOptions(e={}){let t={minFilter:hn,generateMipmaps:!1,flipY:!1,internalFormat:null};e.mapping!==void 0&&(t.mapping=e.mapping),e.wrapS!==void 0&&(t.wrapS=e.wrapS),e.wrapT!==void 0&&(t.wrapT=e.wrapT),e.wrapR!==void 0&&(t.wrapR=e.wrapR),e.magFilter!==void 0&&(t.magFilter=e.magFilter),e.minFilter!==void 0&&(t.minFilter=e.minFilter),e.format!==void 0&&(t.format=e.format),e.type!==void 0&&(t.type=e.type),e.anisotropy!==void 0&&(t.anisotropy=e.anisotropy),e.colorSpace!==void 0&&(t.colorSpace=e.colorSpace),e.flipY!==void 0&&(t.flipY=e.flipY),e.generateMipmaps!==void 0&&(t.generateMipmaps=e.generateMipmaps),e.internalFormat!==void 0&&(t.internalFormat=e.internalFormat);for(let i=0;i<this.textures.length;i++)this.textures[i].setValues(t)}get texture(){return this.textures[0]}set texture(e){this.textures[0]=e}set depthTexture(e){this._depthTexture!==null&&(this._depthTexture.renderTarget=null),e!==null&&(e.renderTarget=this),this._depthTexture=e}get depthTexture(){return this._depthTexture}setSize(e,t,i=1){if(this.width!==e||this.height!==t||this.depth!==i){this.width=e,this.height=t,this.depth=i;for(let r=0,s=this.textures.length;r<s;r++)this.textures[r].image.width=e,this.textures[r].image.height=t,this.textures[r].image.depth=i,this.textures[r].isData3DTexture!==!0&&(this.textures[r].isArrayTexture=this.textures[r].image.depth>1);this.dispose()}this.viewport.set(0,0,e,t),this.scissor.set(0,0,e,t)}clone(){return new this.constructor().copy(this)}copy(e){this.width=e.width,this.height=e.height,this.depth=e.depth,this.scissor.copy(e.scissor),this.scissorTest=e.scissorTest,this.viewport.copy(e.viewport),this.textures.length=0;for(let t=0,i=e.textures.length;t<i;t++){this.textures[t]=e.textures[t].clone(),this.textures[t].isRenderTargetTexture=!0,this.textures[t].renderTarget=this;let r=Object.assign({},e.textures[t].image);this.textures[t].source=new wa(r)}return this.depthBuffer=e.depthBuffer,this.stencilBuffer=e.stencilBuffer,this.resolveDepthBuffer=e.resolveDepthBuffer,this.resolveStencilBuffer=e.resolveStencilBuffer,e.depthTexture!==null&&(this.depthTexture=e.depthTexture.clone()),this.samples=e.samples,this}dispose(){this.dispatchEvent({type:"dispose"})}},Jn=class extends Kf{constructor(e=1,t=1,i={}){super(e,t,i),this.isWebGLRenderTarget=!0}},ll=class extends Ar{constructor(e=null,t=1,i=1,r=1){super(null),this.isDataArrayTexture=!0,this.image={data:e,width:t,height:i,depth:r},this.magFilter=on,this.minFilter=on,this.wrapR=ji,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}addLayerUpdate(e){this.layerUpdates.add(e)}clearLayerUpdates(){this.layerUpdates.clear()}};var Qf=class extends Ar{constructor(e=null,t=1,i=1,r=1){super(null),this.isData3DTexture=!0,this.image={data:e,width:t,height:i,depth:r},this.magFilter=on,this.minFilter=on,this.wrapR=ji,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}};var Rt=class n{constructor(e,t,i,r,s,o,a,c,l,u,d,f,h,g,_,m){n.prototype.isMatrix4=!0,this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],e!==void 0&&this.set(e,t,i,r,s,o,a,c,l,u,d,f,h,g,_,m)}set(e,t,i,r,s,o,a,c,l,u,d,f,h,g,_,m){let p=this.elements;return p[0]=e,p[4]=t,p[8]=i,p[12]=r,p[1]=s,p[5]=o,p[9]=a,p[13]=c,p[2]=l,p[6]=u,p[10]=d,p[14]=f,p[3]=h,p[7]=g,p[11]=_,p[15]=m,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new n().fromArray(this.elements)}copy(e){let t=this.elements,i=e.elements;return t[0]=i[0],t[1]=i[1],t[2]=i[2],t[3]=i[3],t[4]=i[4],t[5]=i[5],t[6]=i[6],t[7]=i[7],t[8]=i[8],t[9]=i[9],t[10]=i[10],t[11]=i[11],t[12]=i[12],t[13]=i[13],t[14]=i[14],t[15]=i[15],this}copyPosition(e){let t=this.elements,i=e.elements;return t[12]=i[12],t[13]=i[13],t[14]=i[14],this}setFromMatrix3(e){let t=e.elements;return this.set(t[0],t[3],t[6],0,t[1],t[4],t[7],0,t[2],t[5],t[8],0,0,0,0,1),this}extractBasis(e,t,i){return this.determinant()===0?(e.set(1,0,0),t.set(0,1,0),i.set(0,0,1),this):(e.setFromMatrixColumn(this,0),t.setFromMatrixColumn(this,1),i.setFromMatrixColumn(this,2),this)}makeBasis(e,t,i){return this.set(e.x,t.x,i.x,0,e.y,t.y,i.y,0,e.z,t.z,i.z,0,0,0,0,1),this}extractRotation(e){if(e.determinant()===0)return this.identity();let t=this.elements,i=e.elements,r=1/da.setFromMatrixColumn(e,0).length(),s=1/da.setFromMatrixColumn(e,1).length(),o=1/da.setFromMatrixColumn(e,2).length();return t[0]=i[0]*r,t[1]=i[1]*r,t[2]=i[2]*r,t[3]=0,t[4]=i[4]*s,t[5]=i[5]*s,t[6]=i[6]*s,t[7]=0,t[8]=i[8]*o,t[9]=i[9]*o,t[10]=i[10]*o,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromEuler(e){let t=this.elements,i=e.x,r=e.y,s=e.z,o=Math.cos(i),a=Math.sin(i),c=Math.cos(r),l=Math.sin(r),u=Math.cos(s),d=Math.sin(s);if(e.order==="XYZ"){let f=o*u,h=o*d,g=a*u,_=a*d;t[0]=c*u,t[4]=-c*d,t[8]=l,t[1]=h+g*l,t[5]=f-_*l,t[9]=-a*c,t[2]=_-f*l,t[6]=g+h*l,t[10]=o*c}else if(e.order==="YXZ"){let f=c*u,h=c*d,g=l*u,_=l*d;t[0]=f+_*a,t[4]=g*a-h,t[8]=o*l,t[1]=o*d,t[5]=o*u,t[9]=-a,t[2]=h*a-g,t[6]=_+f*a,t[10]=o*c}else if(e.order==="ZXY"){let f=c*u,h=c*d,g=l*u,_=l*d;t[0]=f-_*a,t[4]=-o*d,t[8]=g+h*a,t[1]=h+g*a,t[5]=o*u,t[9]=_-f*a,t[2]=-o*l,t[6]=a,t[10]=o*c}else if(e.order==="ZYX"){let f=o*u,h=o*d,g=a*u,_=a*d;t[0]=c*u,t[4]=g*l-h,t[8]=f*l+_,t[1]=c*d,t[5]=_*l+f,t[9]=h*l-g,t[2]=-l,t[6]=a*c,t[10]=o*c}else if(e.order==="YZX"){let f=o*c,h=o*l,g=a*c,_=a*l;t[0]=c*u,t[4]=_-f*d,t[8]=g*d+h,t[1]=d,t[5]=o*u,t[9]=-a*u,t[2]=-l*u,t[6]=h*d+g,t[10]=f-_*d}else if(e.order==="XZY"){let f=o*c,h=o*l,g=a*c,_=a*l;t[0]=c*u,t[4]=-d,t[8]=l*u,t[1]=f*d+_,t[5]=o*u,t[9]=h*d-g,t[2]=g*d-h,t[6]=a*u,t[10]=_*d+f}return t[3]=0,t[7]=0,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromQuaternion(e){return this.compose(cN,e,lN)}lookAt(e,t,i){let r=this.elements;return qn.subVectors(e,t),qn.lengthSq()===0&&(qn.z=1),qn.normalize(),Jr.crossVectors(i,qn),Jr.lengthSq()===0&&(Math.abs(i.z)===1?qn.x+=1e-4:qn.z+=1e-4,qn.normalize(),Jr.crossVectors(i,qn)),Jr.normalize(),vf.crossVectors(qn,Jr),r[0]=Jr.x,r[4]=vf.x,r[8]=qn.x,r[1]=Jr.y,r[5]=vf.y,r[9]=qn.y,r[2]=Jr.z,r[6]=vf.z,r[10]=qn.z,this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){let i=e.elements,r=t.elements,s=this.elements,o=i[0],a=i[4],c=i[8],l=i[12],u=i[1],d=i[5],f=i[9],h=i[13],g=i[2],_=i[6],m=i[10],p=i[14],M=i[3],w=i[7],S=i[11],D=i[15],C=r[0],A=r[4],y=r[8],b=r[12],j=r[1],T=r[5],O=r[9],k=r[13],G=r[2],B=r[6],H=r[10],L=r[14],ee=r[3],Z=r[7],de=r[11],ve=r[15];return s[0]=o*C+a*j+c*G+l*ee,s[4]=o*A+a*T+c*B+l*Z,s[8]=o*y+a*O+c*H+l*de,s[12]=o*b+a*k+c*L+l*ve,s[1]=u*C+d*j+f*G+h*ee,s[5]=u*A+d*T+f*B+h*Z,s[9]=u*y+d*O+f*H+h*de,s[13]=u*b+d*k+f*L+h*ve,s[2]=g*C+_*j+m*G+p*ee,s[6]=g*A+_*T+m*B+p*Z,s[10]=g*y+_*O+m*H+p*de,s[14]=g*b+_*k+m*L+p*ve,s[3]=M*C+w*j+S*G+D*ee,s[7]=M*A+w*T+S*B+D*Z,s[11]=M*y+w*O+S*H+D*de,s[15]=M*b+w*k+S*L+D*ve,this}multiplyScalar(e){let t=this.elements;return t[0]*=e,t[4]*=e,t[8]*=e,t[12]*=e,t[1]*=e,t[5]*=e,t[9]*=e,t[13]*=e,t[2]*=e,t[6]*=e,t[10]*=e,t[14]*=e,t[3]*=e,t[7]*=e,t[11]*=e,t[15]*=e,this}determinant(){let e=this.elements,t=e[0],i=e[4],r=e[8],s=e[12],o=e[1],a=e[5],c=e[9],l=e[13],u=e[2],d=e[6],f=e[10],h=e[14],g=e[3],_=e[7],m=e[11],p=e[15],M=c*h-l*f,w=a*h-l*d,S=a*f-c*d,D=o*h-l*u,C=o*f-c*u,A=o*d-a*u;return t*(_*M-m*w+p*S)-i*(g*M-m*D+p*C)+r*(g*w-_*D+p*A)-s*(g*S-_*C+m*A)}transpose(){let e=this.elements,t;return t=e[1],e[1]=e[4],e[4]=t,t=e[2],e[2]=e[8],e[8]=t,t=e[6],e[6]=e[9],e[9]=t,t=e[3],e[3]=e[12],e[12]=t,t=e[7],e[7]=e[13],e[13]=t,t=e[11],e[11]=e[14],e[14]=t,this}setPosition(e,t,i){let r=this.elements;return e.isVector3?(r[12]=e.x,r[13]=e.y,r[14]=e.z):(r[12]=e,r[13]=t,r[14]=i),this}invert(){let e=this.elements,t=e[0],i=e[1],r=e[2],s=e[3],o=e[4],a=e[5],c=e[6],l=e[7],u=e[8],d=e[9],f=e[10],h=e[11],g=e[12],_=e[13],m=e[14],p=e[15],M=t*a-i*o,w=t*c-r*o,S=t*l-s*o,D=i*c-r*a,C=i*l-s*a,A=r*l-s*c,y=u*_-d*g,b=u*m-f*g,j=u*p-h*g,T=d*m-f*_,O=d*p-h*_,k=f*p-h*m,G=M*k-w*O+S*T+D*j-C*b+A*y;if(G===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);let B=1/G;return e[0]=(a*k-c*O+l*T)*B,e[1]=(r*O-i*k-s*T)*B,e[2]=(_*A-m*C+p*D)*B,e[3]=(f*C-d*A-h*D)*B,e[4]=(c*j-o*k-l*b)*B,e[5]=(t*k-r*j+s*b)*B,e[6]=(m*S-g*A-p*w)*B,e[7]=(u*A-f*S+h*w)*B,e[8]=(o*O-a*j+l*y)*B,e[9]=(i*j-t*O-s*y)*B,e[10]=(g*C-_*S+p*M)*B,e[11]=(d*S-u*C-h*M)*B,e[12]=(a*b-o*T-c*y)*B,e[13]=(t*T-i*b+r*y)*B,e[14]=(_*w-g*D-m*M)*B,e[15]=(u*D-d*w+f*M)*B,this}scale(e){let t=this.elements,i=e.x,r=e.y,s=e.z;return t[0]*=i,t[4]*=r,t[8]*=s,t[1]*=i,t[5]*=r,t[9]*=s,t[2]*=i,t[6]*=r,t[10]*=s,t[3]*=i,t[7]*=r,t[11]*=s,this}getMaxScaleOnAxis(){let e=this.elements,t=e[0]*e[0]+e[1]*e[1]+e[2]*e[2],i=e[4]*e[4]+e[5]*e[5]+e[6]*e[6],r=e[8]*e[8]+e[9]*e[9]+e[10]*e[10];return Math.sqrt(Math.max(t,i,r))}makeTranslation(e,t,i){return e.isVector3?this.set(1,0,0,e.x,0,1,0,e.y,0,0,1,e.z,0,0,0,1):this.set(1,0,0,e,0,1,0,t,0,0,1,i,0,0,0,1),this}makeRotationX(e){let t=Math.cos(e),i=Math.sin(e);return this.set(1,0,0,0,0,t,-i,0,0,i,t,0,0,0,0,1),this}makeRotationY(e){let t=Math.cos(e),i=Math.sin(e);return this.set(t,0,i,0,0,1,0,0,-i,0,t,0,0,0,0,1),this}makeRotationZ(e){let t=Math.cos(e),i=Math.sin(e);return this.set(t,-i,0,0,i,t,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(e,t){let i=Math.cos(t),r=Math.sin(t),s=1-i,o=e.x,a=e.y,c=e.z,l=s*o,u=s*a;return this.set(l*o+i,l*a-r*c,l*c+r*a,0,l*a+r*c,u*a+i,u*c-r*o,0,l*c-r*a,u*c+r*o,s*c*c+i,0,0,0,0,1),this}makeScale(e,t,i){return this.set(e,0,0,0,0,t,0,0,0,0,i,0,0,0,0,1),this}makeShear(e,t,i,r,s,o){return this.set(1,i,s,0,e,1,o,0,t,r,1,0,0,0,0,1),this}compose(e,t,i){let r=this.elements,s=t._x,o=t._y,a=t._z,c=t._w,l=s+s,u=o+o,d=a+a,f=s*l,h=s*u,g=s*d,_=o*u,m=o*d,p=a*d,M=c*l,w=c*u,S=c*d,D=i.x,C=i.y,A=i.z;return r[0]=(1-(_+p))*D,r[1]=(h+S)*D,r[2]=(g-w)*D,r[3]=0,r[4]=(h-S)*C,r[5]=(1-(f+p))*C,r[6]=(m+M)*C,r[7]=0,r[8]=(g+w)*A,r[9]=(m-M)*A,r[10]=(1-(f+_))*A,r[11]=0,r[12]=e.x,r[13]=e.y,r[14]=e.z,r[15]=1,this}decompose(e,t,i){let r=this.elements;e.x=r[12],e.y=r[13],e.z=r[14];let s=this.determinant();if(s===0)return i.set(1,1,1),t.identity(),this;let o=da.set(r[0],r[1],r[2]).length(),a=da.set(r[4],r[5],r[6]).length(),c=da.set(r[8],r[9],r[10]).length();s<0&&(o=-o),Di.copy(this);let l=1/o,u=1/a,d=1/c;return Di.elements[0]*=l,Di.elements[1]*=l,Di.elements[2]*=l,Di.elements[4]*=u,Di.elements[5]*=u,Di.elements[6]*=u,Di.elements[8]*=d,Di.elements[9]*=d,Di.elements[10]*=d,t.setFromRotationMatrix(Di),i.x=o,i.y=a,i.z=c,this}makePerspective(e,t,i,r,s,o,a=Ri,c=!1){let l=this.elements,u=2*s/(t-e),d=2*s/(i-r),f=(t+e)/(t-e),h=(i+r)/(i-r),g,_;if(c)g=s/(o-s),_=o*s/(o-s);else if(a===Ri)g=-(o+s)/(o-s),_=-2*o*s/(o-s);else if(a===Sa)g=-o/(o-s),_=-o*s/(o-s);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+a);return l[0]=u,l[4]=0,l[8]=f,l[12]=0,l[1]=0,l[5]=d,l[9]=h,l[13]=0,l[2]=0,l[6]=0,l[10]=g,l[14]=_,l[3]=0,l[7]=0,l[11]=-1,l[15]=0,this}makeOrthographic(e,t,i,r,s,o,a=Ri,c=!1){let l=this.elements,u=2/(t-e),d=2/(i-r),f=-(t+e)/(t-e),h=-(i+r)/(i-r),g,_;if(c)g=1/(o-s),_=o/(o-s);else if(a===Ri)g=-2/(o-s),_=-(o+s)/(o-s);else if(a===Sa)g=-1/(o-s),_=-s/(o-s);else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+a);return l[0]=u,l[4]=0,l[8]=0,l[12]=f,l[1]=0,l[5]=d,l[9]=0,l[13]=h,l[2]=0,l[6]=0,l[10]=g,l[14]=_,l[3]=0,l[7]=0,l[11]=0,l[15]=1,this}equals(e){let t=this.elements,i=e.elements;for(let r=0;r<16;r++)if(t[r]!==i[r])return!1;return!0}fromArray(e,t=0){for(let i=0;i<16;i++)this.elements[i]=e[i+t];return this}toArray(e=[],t=0){let i=this.elements;return e[t]=i[0],e[t+1]=i[1],e[t+2]=i[2],e[t+3]=i[3],e[t+4]=i[4],e[t+5]=i[5],e[t+6]=i[6],e[t+7]=i[7],e[t+8]=i[8],e[t+9]=i[9],e[t+10]=i[10],e[t+11]=i[11],e[t+12]=i[12],e[t+13]=i[13],e[t+14]=i[14],e[t+15]=i[15],e}},da=new F,Di=new Rt,cN=new F(0,0,0),lN=new F(1,1,1),Jr=new F,vf=new F,qn=new F,LS=new Rt,FS=new fi,ss=(()=>{class n{constructor(t=0,i=0,r=0,s=n.DEFAULT_ORDER){this.isEuler=!0,this._x=t,this._y=i,this._z=r,this._order=s}get x(){return this._x}set x(t){this._x=t,this._onChangeCallback()}get y(){return this._y}set y(t){this._y=t,this._onChangeCallback()}get z(){return this._z}set z(t){this._z=t,this._onChangeCallback()}get order(){return this._order}set order(t){this._order=t,this._onChangeCallback()}set(t,i,r,s=this._order){return this._x=t,this._y=i,this._z=r,this._order=s,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(t){return this._x=t._x,this._y=t._y,this._z=t._z,this._order=t._order,this._onChangeCallback(),this}setFromRotationMatrix(t,i=this._order,r=!0){let s=t.elements,o=s[0],a=s[4],c=s[8],l=s[1],u=s[5],d=s[9],f=s[2],h=s[6],g=s[10];switch(i){case"XYZ":this._y=Math.asin(it(c,-1,1)),Math.abs(c)<.9999999?(this._x=Math.atan2(-d,g),this._z=Math.atan2(-a,o)):(this._x=Math.atan2(h,u),this._z=0);break;case"YXZ":this._x=Math.asin(-it(d,-1,1)),Math.abs(d)<.9999999?(this._y=Math.atan2(c,g),this._z=Math.atan2(l,u)):(this._y=Math.atan2(-f,o),this._z=0);break;case"ZXY":this._x=Math.asin(it(h,-1,1)),Math.abs(h)<.9999999?(this._y=Math.atan2(-f,g),this._z=Math.atan2(-a,u)):(this._y=0,this._z=Math.atan2(l,o));break;case"ZYX":this._y=Math.asin(-it(f,-1,1)),Math.abs(f)<.9999999?(this._x=Math.atan2(h,g),this._z=Math.atan2(l,o)):(this._x=0,this._z=Math.atan2(-a,u));break;case"YZX":this._z=Math.asin(it(l,-1,1)),Math.abs(l)<.9999999?(this._x=Math.atan2(-d,u),this._y=Math.atan2(-f,o)):(this._x=0,this._y=Math.atan2(c,g));break;case"XZY":this._z=Math.asin(-it(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(h,u),this._y=Math.atan2(c,o)):(this._x=Math.atan2(-d,g),this._y=0);break;default:Fe("Euler: .setFromRotationMatrix() encountered an unknown order: "+i)}return this._order=i,r===!0&&this._onChangeCallback(),this}setFromQuaternion(t,i,r){return LS.makeRotationFromQuaternion(t),this.setFromRotationMatrix(LS,i,r)}setFromVector3(t,i=this._order){return this.set(t.x,t.y,t.z,i)}reorder(t){return FS.setFromEuler(this),this.setFromQuaternion(FS,t)}equals(t){return t._x===this._x&&t._y===this._y&&t._z===this._z&&t._order===this._order}fromArray(t){return this._x=t[0],this._y=t[1],this._z=t[2],t[3]!==void 0&&(this._order=t[3]),this._onChangeCallback(),this}toArray(t=[],i=0){return t[i]=this._x,t[i+1]=this._y,t[i+2]=this._z,t[i+3]=this._order,t}_onChange(t){return this._onChangeCallback=t,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}}return n.DEFAULT_ORDER="XYZ",n})(),Ca=class{constructor(){this.mask=1}set(e){this.mask=(1<<e|0)>>>0}enable(e){this.mask|=1<<e|0}enableAll(){this.mask=-1}toggle(e){this.mask^=1<<e|0}disable(e){this.mask&=~(1<<e|0)}disableAll(){this.mask=0}test(e){return(this.mask&e.mask)!==0}isEnabled(e){return(this.mask&(1<<e|0))!==0}},uN=0,kS=new F,fa=new fi,xr=new Rt,yf=new F,tl=new F,dN=new F,fN=new fi,US=new F(1,0,0),BS=new F(0,1,0),VS=new F(0,0,1),HS={type:"added"},hN={type:"removed"},ha={type:"childadded",child:null},ny={type:"childremoved",child:null},$i=(()=>{class n extends Dr{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:uN++}),this.uuid=Rl(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=n.DEFAULT_UP.clone();let t=new F,i=new ss,r=new fi,s=new F(1,1,1);function o(){r.setFromEuler(i,!1)}function a(){i.setFromQuaternion(r,void 0,!1)}i._onChange(o),r._onChange(a),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:t},rotation:{configurable:!0,enumerable:!0,value:i},quaternion:{configurable:!0,enumerable:!0,value:r},scale:{configurable:!0,enumerable:!0,value:s},modelViewMatrix:{value:new Rt},normalMatrix:{value:new We}}),this.matrix=new Rt,this.matrixWorld=new Rt,this.matrixAutoUpdate=n.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=n.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new Ca,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.customDepthMaterial=void 0,this.customDistanceMaterial=void 0,this.static=!1,this.userData={},this.pivot=null}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(t){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(t),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(t){return this.quaternion.premultiply(t),this}setRotationFromAxisAngle(t,i){this.quaternion.setFromAxisAngle(t,i)}setRotationFromEuler(t){this.quaternion.setFromEuler(t,!0)}setRotationFromMatrix(t){this.quaternion.setFromRotationMatrix(t)}setRotationFromQuaternion(t){this.quaternion.copy(t)}rotateOnAxis(t,i){return fa.setFromAxisAngle(t,i),this.quaternion.multiply(fa),this}rotateOnWorldAxis(t,i){return fa.setFromAxisAngle(t,i),this.quaternion.premultiply(fa),this}rotateX(t){return this.rotateOnAxis(US,t)}rotateY(t){return this.rotateOnAxis(BS,t)}rotateZ(t){return this.rotateOnAxis(VS,t)}translateOnAxis(t,i){return kS.copy(t).applyQuaternion(this.quaternion),this.position.add(kS.multiplyScalar(i)),this}translateX(t){return this.translateOnAxis(US,t)}translateY(t){return this.translateOnAxis(BS,t)}translateZ(t){return this.translateOnAxis(VS,t)}localToWorld(t){return this.updateWorldMatrix(!0,!1),t.applyMatrix4(this.matrixWorld)}worldToLocal(t){return this.updateWorldMatrix(!0,!1),t.applyMatrix4(xr.copy(this.matrixWorld).invert())}lookAt(t,i,r){t.isVector3?yf.copy(t):yf.set(t,i,r);let s=this.parent;this.updateWorldMatrix(!0,!1),tl.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?xr.lookAt(tl,yf,this.up):xr.lookAt(yf,tl,this.up),this.quaternion.setFromRotationMatrix(xr),s&&(xr.extractRotation(s.matrixWorld),fa.setFromRotationMatrix(xr),this.quaternion.premultiply(fa.invert()))}add(t){if(arguments.length>1){for(let i=0;i<arguments.length;i++)this.add(arguments[i]);return this}return t===this?(Ne("Object3D.add: object can't be added as a child of itself.",t),this):(t&&t.isObject3D?(t.removeFromParent(),t.parent=this,this.children.push(t),t.dispatchEvent(HS),ha.child=t,this.dispatchEvent(ha),ha.child=null):Ne("Object3D.add: object not an instance of THREE.Object3D.",t),this)}remove(t){if(arguments.length>1){for(let r=0;r<arguments.length;r++)this.remove(arguments[r]);return this}let i=this.children.indexOf(t);return i!==-1&&(t.parent=null,this.children.splice(i,1),t.dispatchEvent(hN),ny.child=t,this.dispatchEvent(ny),ny.child=null),this}removeFromParent(){let t=this.parent;return t!==null&&t.remove(this),this}clear(){return this.remove(...this.children)}attach(t){return this.updateWorldMatrix(!0,!1),xr.copy(this.matrixWorld).invert(),t.parent!==null&&(t.parent.updateWorldMatrix(!0,!1),xr.multiply(t.parent.matrixWorld)),t.applyMatrix4(xr),t.removeFromParent(),t.parent=this,this.children.push(t),t.updateWorldMatrix(!1,!0),t.dispatchEvent(HS),ha.child=t,this.dispatchEvent(ha),ha.child=null,this}getObjectById(t){return this.getObjectByProperty("id",t)}getObjectByName(t){return this.getObjectByProperty("name",t)}getObjectByProperty(t,i){if(this[t]===i)return this;for(let r=0,s=this.children.length;r<s;r++){let a=this.children[r].getObjectByProperty(t,i);if(a!==void 0)return a}}getObjectsByProperty(t,i,r=[]){this[t]===i&&r.push(this);let s=this.children;for(let o=0,a=s.length;o<a;o++)s[o].getObjectsByProperty(t,i,r);return r}getWorldPosition(t){return this.updateWorldMatrix(!0,!1),t.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(t){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(tl,t,dN),t}getWorldScale(t){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(tl,fN,t),t}getWorldDirection(t){this.updateWorldMatrix(!0,!1);let i=this.matrixWorld.elements;return t.set(i[8],i[9],i[10]).normalize()}raycast(){}traverse(t){t(this);let i=this.children;for(let r=0,s=i.length;r<s;r++)i[r].traverse(t)}traverseVisible(t){if(this.visible===!1)return;t(this);let i=this.children;for(let r=0,s=i.length;r<s;r++)i[r].traverseVisible(t)}traverseAncestors(t){let i=this.parent;i!==null&&(t(i),i.traverseAncestors(t))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale);let t=this.pivot;if(t!==null){let i=t.x,r=t.y,s=t.z,o=this.matrix.elements;o[12]+=i-o[0]*i-o[4]*r-o[8]*s,o[13]+=r-o[1]*i-o[5]*r-o[9]*s,o[14]+=s-o[2]*i-o[6]*r-o[10]*s}this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(t){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||t)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,t=!0);let i=this.children;for(let r=0,s=i.length;r<s;r++)i[r].updateMatrixWorld(t)}updateWorldMatrix(t,i){let r=this.parent;if(t===!0&&r!==null&&r.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),i===!0){let s=this.children;for(let o=0,a=s.length;o<a;o++)s[o].updateWorldMatrix(!1,!0)}}toJSON(t){let i=t===void 0||typeof t=="string",r={};i&&(t={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},r.metadata={version:4.7,type:"Object",generator:"Object3D.toJSON"});let s={};s.uuid=this.uuid,s.type=this.type,this.name!==""&&(s.name=this.name),this.castShadow===!0&&(s.castShadow=!0),this.receiveShadow===!0&&(s.receiveShadow=!0),this.visible===!1&&(s.visible=!1),this.frustumCulled===!1&&(s.frustumCulled=!1),this.renderOrder!==0&&(s.renderOrder=this.renderOrder),this.static!==!1&&(s.static=this.static),Object.keys(this.userData).length>0&&(s.userData=this.userData),s.layers=this.layers.mask,s.matrix=this.matrix.toArray(),s.up=this.up.toArray(),this.pivot!==null&&(s.pivot=this.pivot.toArray()),this.matrixAutoUpdate===!1&&(s.matrixAutoUpdate=!1),this.morphTargetDictionary!==void 0&&(s.morphTargetDictionary=Object.assign({},this.morphTargetDictionary)),this.morphTargetInfluences!==void 0&&(s.morphTargetInfluences=this.morphTargetInfluences.slice()),this.isInstancedMesh&&(s.type="InstancedMesh",s.count=this.count,s.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(s.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(s.type="BatchedMesh",s.perObjectFrustumCulled=this.perObjectFrustumCulled,s.sortObjects=this.sortObjects,s.drawRanges=this._drawRanges,s.reservedRanges=this._reservedRanges,s.geometryInfo=this._geometryInfo.map(c=>et(ae({},c),{boundingBox:c.boundingBox?c.boundingBox.toJSON():void 0,boundingSphere:c.boundingSphere?c.boundingSphere.toJSON():void 0})),s.instanceInfo=this._instanceInfo.map(c=>ae({},c)),s.availableInstanceIds=this._availableInstanceIds.slice(),s.availableGeometryIds=this._availableGeometryIds.slice(),s.nextIndexStart=this._nextIndexStart,s.nextVertexStart=this._nextVertexStart,s.geometryCount=this._geometryCount,s.maxInstanceCount=this._maxInstanceCount,s.maxVertexCount=this._maxVertexCount,s.maxIndexCount=this._maxIndexCount,s.geometryInitialized=this._geometryInitialized,s.matricesTexture=this._matricesTexture.toJSON(t),s.indirectTexture=this._indirectTexture.toJSON(t),this._colorsTexture!==null&&(s.colorsTexture=this._colorsTexture.toJSON(t)),this.boundingSphere!==null&&(s.boundingSphere=this.boundingSphere.toJSON()),this.boundingBox!==null&&(s.boundingBox=this.boundingBox.toJSON()));function o(c,l){return c[l.uuid]===void 0&&(c[l.uuid]=l.toJSON(t)),l.uuid}if(this.isScene)this.background&&(this.background.isColor?s.background=this.background.toJSON():this.background.isTexture&&(s.background=this.background.toJSON(t).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(s.environment=this.environment.toJSON(t).uuid);else if(this.isMesh||this.isLine||this.isPoints){s.geometry=o(t.geometries,this.geometry);let c=this.geometry.parameters;if(c!==void 0&&c.shapes!==void 0){let l=c.shapes;if(Array.isArray(l))for(let u=0,d=l.length;u<d;u++){let f=l[u];o(t.shapes,f)}else o(t.shapes,l)}}if(this.isSkinnedMesh&&(s.bindMode=this.bindMode,s.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(o(t.skeletons,this.skeleton),s.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){let c=[];for(let l=0,u=this.material.length;l<u;l++)c.push(o(t.materials,this.material[l]));s.material=c}else s.material=o(t.materials,this.material);if(this.children.length>0){s.children=[];for(let c=0;c<this.children.length;c++)s.children.push(this.children[c].toJSON(t).object)}if(this.animations.length>0){s.animations=[];for(let c=0;c<this.animations.length;c++){let l=this.animations[c];s.animations.push(o(t.animations,l))}}if(i){let c=a(t.geometries),l=a(t.materials),u=a(t.textures),d=a(t.images),f=a(t.shapes),h=a(t.skeletons),g=a(t.animations),_=a(t.nodes);c.length>0&&(r.geometries=c),l.length>0&&(r.materials=l),u.length>0&&(r.textures=u),d.length>0&&(r.images=d),f.length>0&&(r.shapes=f),h.length>0&&(r.skeletons=h),g.length>0&&(r.animations=g),_.length>0&&(r.nodes=_)}return r.object=s,r;function a(c){let l=[];for(let u in c){let d=c[u];delete d.metadata,l.push(d)}return l}}clone(t){return new this.constructor().copy(this,t)}copy(t,i=!0){if(this.name=t.name,this.up.copy(t.up),this.position.copy(t.position),this.rotation.order=t.rotation.order,this.quaternion.copy(t.quaternion),this.scale.copy(t.scale),t.pivot!==null&&(this.pivot=t.pivot.clone()),this.matrix.copy(t.matrix),this.matrixWorld.copy(t.matrixWorld),this.matrixAutoUpdate=t.matrixAutoUpdate,this.matrixWorldAutoUpdate=t.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=t.matrixWorldNeedsUpdate,this.layers.mask=t.layers.mask,this.visible=t.visible,this.castShadow=t.castShadow,this.receiveShadow=t.receiveShadow,this.frustumCulled=t.frustumCulled,this.renderOrder=t.renderOrder,this.static=t.static,this.animations=t.animations.slice(),this.userData=JSON.parse(JSON.stringify(t.userData)),i===!0)for(let r=0;r<t.children.length;r++){let s=t.children[r];this.add(s.clone())}return this}}return n.DEFAULT_UP=new F(0,1,0),n.DEFAULT_MATRIX_AUTO_UPDATE=!0,n.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0,n})(),wr=class extends $i{constructor(){super(),this.isGroup=!0,this.type="Group"}},pN={type:"move"},Ta=class{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new wr,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new wr,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new F,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new F),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new wr,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new F,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new F),this._grip}dispatchEvent(e){return this._targetRay!==null&&this._targetRay.dispatchEvent(e),this._grip!==null&&this._grip.dispatchEvent(e),this._hand!==null&&this._hand.dispatchEvent(e),this}connect(e){if(e&&e.hand){let t=this._hand;if(t)for(let i of e.hand.values())this._getHandJoint(t,i)}return this.dispatchEvent({type:"connected",data:e}),this}disconnect(e){return this.dispatchEvent({type:"disconnected",data:e}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(e,t,i){let r=null,s=null,o=null,a=this._targetRay,c=this._grip,l=this._hand;if(e&&t.session.visibilityState!=="visible-blurred"){if(l&&e.hand){o=!0;for(let _ of e.hand.values()){let m=t.getJointPose(_,i),p=this._getHandJoint(l,_);m!==null&&(p.matrix.fromArray(m.transform.matrix),p.matrix.decompose(p.position,p.rotation,p.scale),p.matrixWorldNeedsUpdate=!0,p.jointRadius=m.radius),p.visible=m!==null}let u=l.joints["index-finger-tip"],d=l.joints["thumb-tip"],f=u.position.distanceTo(d.position),h=.02,g=.005;l.inputState.pinching&&f>h+g?(l.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:e.handedness,target:this})):!l.inputState.pinching&&f<=h-g&&(l.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:e.handedness,target:this}))}else c!==null&&e.gripSpace&&(s=t.getPose(e.gripSpace,i),s!==null&&(c.matrix.fromArray(s.transform.matrix),c.matrix.decompose(c.position,c.rotation,c.scale),c.matrixWorldNeedsUpdate=!0,s.linearVelocity?(c.hasLinearVelocity=!0,c.linearVelocity.copy(s.linearVelocity)):c.hasLinearVelocity=!1,s.angularVelocity?(c.hasAngularVelocity=!0,c.angularVelocity.copy(s.angularVelocity)):c.hasAngularVelocity=!1));a!==null&&(r=t.getPose(e.targetRaySpace,i),r===null&&s!==null&&(r=s),r!==null&&(a.matrix.fromArray(r.transform.matrix),a.matrix.decompose(a.position,a.rotation,a.scale),a.matrixWorldNeedsUpdate=!0,r.linearVelocity?(a.hasLinearVelocity=!0,a.linearVelocity.copy(r.linearVelocity)):a.hasLinearVelocity=!1,r.angularVelocity?(a.hasAngularVelocity=!0,a.angularVelocity.copy(r.angularVelocity)):a.hasAngularVelocity=!1,this.dispatchEvent(pN)))}return a!==null&&(a.visible=r!==null),c!==null&&(c.visible=s!==null),l!==null&&(l.visible=o!==null),this}_getHandJoint(e,t){if(e.joints[t.jointName]===void 0){let i=new wr;i.matrixAutoUpdate=!1,i.visible=!1,e.joints[t.jointName]=i,e.add(i)}return e.joints[t.jointName]}},OE={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},Kr={h:0,s:0,l:0},_f={h:0,s:0,l:0};function iy(n,e,t){return t<0&&(t+=1),t>1&&(t-=1),t<1/6?n+(e-n)*6*t:t<1/2?e:t<2/3?n+(e-n)*6*(2/3-t):n}var ot=class{constructor(e,t,i){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(e,t,i)}set(e,t,i){if(t===void 0&&i===void 0){let r=e;r&&r.isColor?this.copy(r):typeof r=="number"?this.setHex(r):typeof r=="string"&&this.setStyle(r)}else this.setRGB(e,t,i);return this}setScalar(e){return this.r=e,this.g=e,this.b=e,this}setHex(e,t=Yn){return e=Math.floor(e),this.r=(e>>16&255)/255,this.g=(e>>8&255)/255,this.b=(e&255)/255,st.colorSpaceToWorking(this,t),this}setRGB(e,t,i,r=st.workingColorSpace){return this.r=e,this.g=t,this.b=i,st.colorSpaceToWorking(this,r),this}setHSL(e,t,i,r=st.workingColorSpace){if(e=rN(e,1),t=it(t,0,1),i=it(i,0,1),t===0)this.r=this.g=this.b=i;else{let s=i<=.5?i*(1+t):i+t-i*t,o=2*i-s;this.r=iy(o,s,e+1/3),this.g=iy(o,s,e),this.b=iy(o,s,e-1/3)}return st.colorSpaceToWorking(this,r),this}setStyle(e,t=Yn){function i(s){s!==void 0&&parseFloat(s)<1&&Fe("Color: Alpha component of "+e+" will be ignored.")}let r;if(r=/^(\w+)\(([^\)]*)\)/.exec(e)){let s,o=r[1],a=r[2];switch(o){case"rgb":case"rgba":if(s=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return i(s[4]),this.setRGB(Math.min(255,parseInt(s[1],10))/255,Math.min(255,parseInt(s[2],10))/255,Math.min(255,parseInt(s[3],10))/255,t);if(s=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return i(s[4]),this.setRGB(Math.min(100,parseInt(s[1],10))/100,Math.min(100,parseInt(s[2],10))/100,Math.min(100,parseInt(s[3],10))/100,t);break;case"hsl":case"hsla":if(s=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return i(s[4]),this.setHSL(parseFloat(s[1])/360,parseFloat(s[2])/100,parseFloat(s[3])/100,t);break;default:Fe("Color: Unknown color model "+e)}}else if(r=/^\#([A-Fa-f\d]+)$/.exec(e)){let s=r[1],o=s.length;if(o===3)return this.setRGB(parseInt(s.charAt(0),16)/15,parseInt(s.charAt(1),16)/15,parseInt(s.charAt(2),16)/15,t);if(o===6)return this.setHex(parseInt(s,16),t);Fe("Color: Invalid hex color "+e)}else if(e&&e.length>0)return this.setColorName(e,t);return this}setColorName(e,t=Yn){let i=OE[e.toLowerCase()];return i!==void 0?this.setHex(i,t):Fe("Color: Unknown color "+e),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(e){return this.r=e.r,this.g=e.g,this.b=e.b,this}copySRGBToLinear(e){return this.r=Cr(e.r),this.g=Cr(e.g),this.b=Cr(e.b),this}copyLinearToSRGB(e){return this.r=ba(e.r),this.g=ba(e.g),this.b=ba(e.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(e=Yn){return st.workingToColorSpace(Mn.copy(this),e),Math.round(it(Mn.r*255,0,255))*65536+Math.round(it(Mn.g*255,0,255))*256+Math.round(it(Mn.b*255,0,255))}getHexString(e=Yn){return("000000"+this.getHex(e).toString(16)).slice(-6)}getHSL(e,t=st.workingColorSpace){st.workingToColorSpace(Mn.copy(this),t);let i=Mn.r,r=Mn.g,s=Mn.b,o=Math.max(i,r,s),a=Math.min(i,r,s),c,l,u=(a+o)/2;if(a===o)c=0,l=0;else{let d=o-a;switch(l=u<=.5?d/(o+a):d/(2-o-a),o){case i:c=(r-s)/d+(r<s?6:0);break;case r:c=(s-i)/d+2;break;case s:c=(i-r)/d+4;break}c/=6}return e.h=c,e.s=l,e.l=u,e}getRGB(e,t=st.workingColorSpace){return st.workingToColorSpace(Mn.copy(this),t),e.r=Mn.r,e.g=Mn.g,e.b=Mn.b,e}getStyle(e=Yn){st.workingToColorSpace(Mn.copy(this),e);let t=Mn.r,i=Mn.g,r=Mn.b;return e!==Yn?`color(${e} ${t.toFixed(3)} ${i.toFixed(3)} ${r.toFixed(3)})`:`rgb(${Math.round(t*255)},${Math.round(i*255)},${Math.round(r*255)})`}offsetHSL(e,t,i){return this.getHSL(Kr),this.setHSL(Kr.h+e,Kr.s+t,Kr.l+i)}add(e){return this.r+=e.r,this.g+=e.g,this.b+=e.b,this}addColors(e,t){return this.r=e.r+t.r,this.g=e.g+t.g,this.b=e.b+t.b,this}addScalar(e){return this.r+=e,this.g+=e,this.b+=e,this}sub(e){return this.r=Math.max(0,this.r-e.r),this.g=Math.max(0,this.g-e.g),this.b=Math.max(0,this.b-e.b),this}multiply(e){return this.r*=e.r,this.g*=e.g,this.b*=e.b,this}multiplyScalar(e){return this.r*=e,this.g*=e,this.b*=e,this}lerp(e,t){return this.r+=(e.r-this.r)*t,this.g+=(e.g-this.g)*t,this.b+=(e.b-this.b)*t,this}lerpColors(e,t,i){return this.r=e.r+(t.r-e.r)*i,this.g=e.g+(t.g-e.g)*i,this.b=e.b+(t.b-e.b)*i,this}lerpHSL(e,t){this.getHSL(Kr),e.getHSL(_f);let i=Jv(Kr.h,_f.h,t),r=Jv(Kr.s,_f.s,t),s=Jv(Kr.l,_f.l,t);return this.setHSL(i,r,s),this}setFromVector3(e){return this.r=e.x,this.g=e.y,this.b=e.z,this}applyMatrix3(e){let t=this.r,i=this.g,r=this.b,s=e.elements;return this.r=s[0]*t+s[3]*i+s[6]*r,this.g=s[1]*t+s[4]*i+s[7]*r,this.b=s[2]*t+s[5]*i+s[8]*r,this}equals(e){return e.r===this.r&&e.g===this.g&&e.b===this.b}fromArray(e,t=0){return this.r=e[t],this.g=e[t+1],this.b=e[t+2],this}toArray(e=[],t=0){return e[t]=this.r,e[t+1]=this.g,e[t+2]=this.b,e}fromBufferAttribute(e,t){return this.r=e.getX(t),this.g=e.getY(t),this.b=e.getZ(t),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}},Mn=new ot;ot.NAMES=OE;var ul=class extends $i{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new ss,this.environmentIntensity=1,this.environmentRotation=new ss,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(e,t){return super.copy(e,t),e.background!==null&&(this.background=e.background.clone()),e.environment!==null&&(this.environment=e.environment.clone()),e.fog!==null&&(this.fog=e.fog.clone()),this.backgroundBlurriness=e.backgroundBlurriness,this.backgroundIntensity=e.backgroundIntensity,this.backgroundRotation.copy(e.backgroundRotation),this.environmentIntensity=e.environmentIntensity,this.environmentRotation.copy(e.environmentRotation),e.overrideMaterial!==null&&(this.overrideMaterial=e.overrideMaterial.clone()),this.matrixAutoUpdate=e.matrixAutoUpdate,this}toJSON(e){let t=super.toJSON(e);return this.fog!==null&&(t.object.fog=this.fog.toJSON()),this.backgroundBlurriness>0&&(t.object.backgroundBlurriness=this.backgroundBlurriness),this.backgroundIntensity!==1&&(t.object.backgroundIntensity=this.backgroundIntensity),t.object.backgroundRotation=this.backgroundRotation.toArray(),this.environmentIntensity!==1&&(t.object.environmentIntensity=this.environmentIntensity),t.object.environmentRotation=this.environmentRotation.toArray(),t}},Ii=new F,Mr=new F,ry=new F,br=new F,pa=new F,ma=new F,zS=new F,sy=new F,oy=new F,ay=new F,cy=new Ft,ly=new Ft,uy=new Ft,is=class n{constructor(e=new F,t=new F,i=new F){this.a=e,this.b=t,this.c=i}static getNormal(e,t,i,r){r.subVectors(i,t),Ii.subVectors(e,t),r.cross(Ii);let s=r.lengthSq();return s>0?r.multiplyScalar(1/Math.sqrt(s)):r.set(0,0,0)}static getBarycoord(e,t,i,r,s){Ii.subVectors(r,t),Mr.subVectors(i,t),ry.subVectors(e,t);let o=Ii.dot(Ii),a=Ii.dot(Mr),c=Ii.dot(ry),l=Mr.dot(Mr),u=Mr.dot(ry),d=o*l-a*a;if(d===0)return s.set(0,0,0),null;let f=1/d,h=(l*c-a*u)*f,g=(o*u-a*c)*f;return s.set(1-h-g,g,h)}static containsPoint(e,t,i,r){return this.getBarycoord(e,t,i,r,br)===null?!1:br.x>=0&&br.y>=0&&br.x+br.y<=1}static getInterpolation(e,t,i,r,s,o,a,c){return this.getBarycoord(e,t,i,r,br)===null?(c.x=0,c.y=0,"z"in c&&(c.z=0),"w"in c&&(c.w=0),null):(c.setScalar(0),c.addScaledVector(s,br.x),c.addScaledVector(o,br.y),c.addScaledVector(a,br.z),c)}static getInterpolatedAttribute(e,t,i,r,s,o){return cy.setScalar(0),ly.setScalar(0),uy.setScalar(0),cy.fromBufferAttribute(e,t),ly.fromBufferAttribute(e,i),uy.fromBufferAttribute(e,r),o.setScalar(0),o.addScaledVector(cy,s.x),o.addScaledVector(ly,s.y),o.addScaledVector(uy,s.z),o}static isFrontFacing(e,t,i,r){return Ii.subVectors(i,t),Mr.subVectors(e,t),Ii.cross(Mr).dot(r)<0}set(e,t,i){return this.a.copy(e),this.b.copy(t),this.c.copy(i),this}setFromPointsAndIndices(e,t,i,r){return this.a.copy(e[t]),this.b.copy(e[i]),this.c.copy(e[r]),this}setFromAttributeAndIndices(e,t,i,r){return this.a.fromBufferAttribute(e,t),this.b.fromBufferAttribute(e,i),this.c.fromBufferAttribute(e,r),this}clone(){return new this.constructor().copy(this)}copy(e){return this.a.copy(e.a),this.b.copy(e.b),this.c.copy(e.c),this}getArea(){return Ii.subVectors(this.c,this.b),Mr.subVectors(this.a,this.b),Ii.cross(Mr).length()*.5}getMidpoint(e){return e.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(e){return n.getNormal(this.a,this.b,this.c,e)}getPlane(e){return e.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(e,t){return n.getBarycoord(e,this.a,this.b,this.c,t)}getInterpolation(e,t,i,r,s){return n.getInterpolation(e,this.a,this.b,this.c,t,i,r,s)}containsPoint(e){return n.containsPoint(e,this.a,this.b,this.c)}isFrontFacing(e){return n.isFrontFacing(this.a,this.b,this.c,e)}intersectsBox(e){return e.intersectsTriangle(this)}closestPointToPoint(e,t){let i=this.a,r=this.b,s=this.c,o,a;pa.subVectors(r,i),ma.subVectors(s,i),sy.subVectors(e,i);let c=pa.dot(sy),l=ma.dot(sy);if(c<=0&&l<=0)return t.copy(i);oy.subVectors(e,r);let u=pa.dot(oy),d=ma.dot(oy);if(u>=0&&d<=u)return t.copy(r);let f=c*d-u*l;if(f<=0&&c>=0&&u<=0)return o=c/(c-u),t.copy(i).addScaledVector(pa,o);ay.subVectors(e,s);let h=pa.dot(ay),g=ma.dot(ay);if(g>=0&&h<=g)return t.copy(s);let _=h*l-c*g;if(_<=0&&l>=0&&g<=0)return a=l/(l-g),t.copy(i).addScaledVector(ma,a);let m=u*g-h*d;if(m<=0&&d-u>=0&&h-g>=0)return zS.subVectors(s,r),a=(d-u)/(d-u+(h-g)),t.copy(r).addScaledVector(zS,a);let p=1/(m+_+f);return o=_*p,a=f*p,t.copy(i).addScaledVector(pa,o).addScaledVector(ma,a)}equals(e){return e.a.equals(this.a)&&e.b.equals(this.b)&&e.c.equals(this.c)}},os=class{constructor(e=new F(1/0,1/0,1/0),t=new F(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=e,this.max=t}set(e,t){return this.min.copy(e),this.max.copy(t),this}setFromArray(e){this.makeEmpty();for(let t=0,i=e.length;t<i;t+=3)this.expandByPoint(Ai.fromArray(e,t));return this}setFromBufferAttribute(e){this.makeEmpty();for(let t=0,i=e.count;t<i;t++)this.expandByPoint(Ai.fromBufferAttribute(e,t));return this}setFromPoints(e){this.makeEmpty();for(let t=0,i=e.length;t<i;t++)this.expandByPoint(e[t]);return this}setFromCenterAndSize(e,t){let i=Ai.copy(t).multiplyScalar(.5);return this.min.copy(e).sub(i),this.max.copy(e).add(i),this}setFromObject(e,t=!1){return this.makeEmpty(),this.expandByObject(e,t)}clone(){return new this.constructor().copy(this)}copy(e){return this.min.copy(e.min),this.max.copy(e.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(e){return this.isEmpty()?e.set(0,0,0):e.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(e){return this.isEmpty()?e.set(0,0,0):e.subVectors(this.max,this.min)}expandByPoint(e){return this.min.min(e),this.max.max(e),this}expandByVector(e){return this.min.sub(e),this.max.add(e),this}expandByScalar(e){return this.min.addScalar(-e),this.max.addScalar(e),this}expandByObject(e,t=!1){e.updateWorldMatrix(!1,!1);let i=e.geometry;if(i!==void 0){let s=i.getAttribute("position");if(t===!0&&s!==void 0&&e.isInstancedMesh!==!0)for(let o=0,a=s.count;o<a;o++)e.isMesh===!0?e.getVertexPosition(o,Ai):Ai.fromBufferAttribute(s,o),Ai.applyMatrix4(e.matrixWorld),this.expandByPoint(Ai);else e.boundingBox!==void 0?(e.boundingBox===null&&e.computeBoundingBox(),xf.copy(e.boundingBox)):(i.boundingBox===null&&i.computeBoundingBox(),xf.copy(i.boundingBox)),xf.applyMatrix4(e.matrixWorld),this.union(xf)}let r=e.children;for(let s=0,o=r.length;s<o;s++)this.expandByObject(r[s],t);return this}containsPoint(e){return e.x>=this.min.x&&e.x<=this.max.x&&e.y>=this.min.y&&e.y<=this.max.y&&e.z>=this.min.z&&e.z<=this.max.z}containsBox(e){return this.min.x<=e.min.x&&e.max.x<=this.max.x&&this.min.y<=e.min.y&&e.max.y<=this.max.y&&this.min.z<=e.min.z&&e.max.z<=this.max.z}getParameter(e,t){return t.set((e.x-this.min.x)/(this.max.x-this.min.x),(e.y-this.min.y)/(this.max.y-this.min.y),(e.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(e){return e.max.x>=this.min.x&&e.min.x<=this.max.x&&e.max.y>=this.min.y&&e.min.y<=this.max.y&&e.max.z>=this.min.z&&e.min.z<=this.max.z}intersectsSphere(e){return this.clampPoint(e.center,Ai),Ai.distanceToSquared(e.center)<=e.radius*e.radius}intersectsPlane(e){let t,i;return e.normal.x>0?(t=e.normal.x*this.min.x,i=e.normal.x*this.max.x):(t=e.normal.x*this.max.x,i=e.normal.x*this.min.x),e.normal.y>0?(t+=e.normal.y*this.min.y,i+=e.normal.y*this.max.y):(t+=e.normal.y*this.max.y,i+=e.normal.y*this.min.y),e.normal.z>0?(t+=e.normal.z*this.min.z,i+=e.normal.z*this.max.z):(t+=e.normal.z*this.max.z,i+=e.normal.z*this.min.z),t<=-e.constant&&i>=-e.constant}intersectsTriangle(e){if(this.isEmpty())return!1;this.getCenter(nl),Mf.subVectors(this.max,nl),ga.subVectors(e.a,nl),va.subVectors(e.b,nl),ya.subVectors(e.c,nl),Qr.subVectors(va,ga),es.subVectors(ya,va),Qs.subVectors(ga,ya);let t=[0,-Qr.z,Qr.y,0,-es.z,es.y,0,-Qs.z,Qs.y,Qr.z,0,-Qr.x,es.z,0,-es.x,Qs.z,0,-Qs.x,-Qr.y,Qr.x,0,-es.y,es.x,0,-Qs.y,Qs.x,0];return!dy(t,ga,va,ya,Mf)||(t=[1,0,0,0,1,0,0,0,1],!dy(t,ga,va,ya,Mf))?!1:(bf.crossVectors(Qr,es),t=[bf.x,bf.y,bf.z],dy(t,ga,va,ya,Mf))}clampPoint(e,t){return t.copy(e).clamp(this.min,this.max)}distanceToPoint(e){return this.clampPoint(e,Ai).distanceTo(e)}getBoundingSphere(e){return this.isEmpty()?e.makeEmpty():(this.getCenter(e.center),e.radius=this.getSize(Ai).length()*.5),e}intersect(e){return this.min.max(e.min),this.max.min(e.max),this.isEmpty()&&this.makeEmpty(),this}union(e){return this.min.min(e.min),this.max.max(e.max),this}applyMatrix4(e){return this.isEmpty()?this:(Sr[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(e),Sr[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(e),Sr[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(e),Sr[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(e),Sr[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(e),Sr[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(e),Sr[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(e),Sr[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(e),this.setFromPoints(Sr),this)}translate(e){return this.min.add(e),this.max.add(e),this}equals(e){return e.min.equals(this.min)&&e.max.equals(this.max)}toJSON(){return{min:this.min.toArray(),max:this.max.toArray()}}fromJSON(e){return this.min.fromArray(e.min),this.max.fromArray(e.max),this}},Sr=[new F,new F,new F,new F,new F,new F,new F,new F],Ai=new F,xf=new os,ga=new F,va=new F,ya=new F,Qr=new F,es=new F,Qs=new F,nl=new F,Mf=new F,bf=new F,eo=new F;function dy(n,e,t,i,r){for(let s=0,o=n.length-3;s<=o;s+=3){eo.fromArray(n,s);let a=r.x*Math.abs(eo.x)+r.y*Math.abs(eo.y)+r.z*Math.abs(eo.z),c=e.dot(eo),l=t.dot(eo),u=i.dot(eo);if(Math.max(-Math.max(c,l,u),Math.min(c,l,u))>a)return!1}return!0}var qt=new F,Sf=new rt,mN=0,Zn=class{constructor(e,t,i=!1){if(Array.isArray(e))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,Object.defineProperty(this,"id",{value:mN++}),this.name="",this.array=e,this.itemSize=t,this.count=e!==void 0?e.length/t:0,this.normalized=i,this.usage=Cy,this.updateRanges=[],this.gpuType=Oi,this.version=0}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.name=e.name,this.array=new e.array.constructor(e.array),this.itemSize=e.itemSize,this.count=e.count,this.normalized=e.normalized,this.usage=e.usage,this.gpuType=e.gpuType,this}copyAt(e,t,i){e*=this.itemSize,i*=t.itemSize;for(let r=0,s=this.itemSize;r<s;r++)this.array[e+r]=t.array[i+r];return this}copyArray(e){return this.array.set(e),this}applyMatrix3(e){if(this.itemSize===2)for(let t=0,i=this.count;t<i;t++)Sf.fromBufferAttribute(this,t),Sf.applyMatrix3(e),this.setXY(t,Sf.x,Sf.y);else if(this.itemSize===3)for(let t=0,i=this.count;t<i;t++)qt.fromBufferAttribute(this,t),qt.applyMatrix3(e),this.setXYZ(t,qt.x,qt.y,qt.z);return this}applyMatrix4(e){for(let t=0,i=this.count;t<i;t++)qt.fromBufferAttribute(this,t),qt.applyMatrix4(e),this.setXYZ(t,qt.x,qt.y,qt.z);return this}applyNormalMatrix(e){for(let t=0,i=this.count;t<i;t++)qt.fromBufferAttribute(this,t),qt.applyNormalMatrix(e),this.setXYZ(t,qt.x,qt.y,qt.z);return this}transformDirection(e){for(let t=0,i=this.count;t<i;t++)qt.fromBufferAttribute(this,t),qt.transformDirection(e),this.setXYZ(t,qt.x,qt.y,qt.z);return this}set(e,t=0){return this.array.set(e,t),this}getComponent(e,t){let i=this.array[e*this.itemSize+t];return this.normalized&&(i=el(i,this.array)),i}setComponent(e,t,i){return this.normalized&&(i=Bn(i,this.array)),this.array[e*this.itemSize+t]=i,this}getX(e){let t=this.array[e*this.itemSize];return this.normalized&&(t=el(t,this.array)),t}setX(e,t){return this.normalized&&(t=Bn(t,this.array)),this.array[e*this.itemSize]=t,this}getY(e){let t=this.array[e*this.itemSize+1];return this.normalized&&(t=el(t,this.array)),t}setY(e,t){return this.normalized&&(t=Bn(t,this.array)),this.array[e*this.itemSize+1]=t,this}getZ(e){let t=this.array[e*this.itemSize+2];return this.normalized&&(t=el(t,this.array)),t}setZ(e,t){return this.normalized&&(t=Bn(t,this.array)),this.array[e*this.itemSize+2]=t,this}getW(e){let t=this.array[e*this.itemSize+3];return this.normalized&&(t=el(t,this.array)),t}setW(e,t){return this.normalized&&(t=Bn(t,this.array)),this.array[e*this.itemSize+3]=t,this}setXY(e,t,i){return e*=this.itemSize,this.normalized&&(t=Bn(t,this.array),i=Bn(i,this.array)),this.array[e+0]=t,this.array[e+1]=i,this}setXYZ(e,t,i,r){return e*=this.itemSize,this.normalized&&(t=Bn(t,this.array),i=Bn(i,this.array),r=Bn(r,this.array)),this.array[e+0]=t,this.array[e+1]=i,this.array[e+2]=r,this}setXYZW(e,t,i,r,s){return e*=this.itemSize,this.normalized&&(t=Bn(t,this.array),i=Bn(i,this.array),r=Bn(r,this.array),s=Bn(s,this.array)),this.array[e+0]=t,this.array[e+1]=i,this.array[e+2]=r,this.array[e+3]=s,this}onUpload(e){return this.onUploadCallback=e,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){let e={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return this.name!==""&&(e.name=this.name),this.usage!==Cy&&(e.usage=this.usage),e}};var dl=class extends Zn{constructor(e,t,i){super(new Uint16Array(e),t,i)}};var fl=class extends Zn{constructor(e,t,i){super(new Uint32Array(e),t,i)}};var Gt=class extends Zn{constructor(e,t,i){super(new Float32Array(e),t,i)}},gN=new os,il=new F,fy=new F,Da=class{constructor(e=new F,t=-1){this.isSphere=!0,this.center=e,this.radius=t}set(e,t){return this.center.copy(e),this.radius=t,this}setFromPoints(e,t){let i=this.center;t!==void 0?i.copy(t):gN.setFromPoints(e).getCenter(i);let r=0;for(let s=0,o=e.length;s<o;s++)r=Math.max(r,i.distanceToSquared(e[s]));return this.radius=Math.sqrt(r),this}copy(e){return this.center.copy(e.center),this.radius=e.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(e){return e.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(e){return e.distanceTo(this.center)-this.radius}intersectsSphere(e){let t=this.radius+e.radius;return e.center.distanceToSquared(this.center)<=t*t}intersectsBox(e){return e.intersectsSphere(this)}intersectsPlane(e){return Math.abs(e.distanceToPoint(this.center))<=this.radius}clampPoint(e,t){let i=this.center.distanceToSquared(e);return t.copy(e),i>this.radius*this.radius&&(t.sub(this.center).normalize(),t.multiplyScalar(this.radius).add(this.center)),t}getBoundingBox(e){return this.isEmpty()?(e.makeEmpty(),e):(e.set(this.center,this.center),e.expandByScalar(this.radius),e)}applyMatrix4(e){return this.center.applyMatrix4(e),this.radius=this.radius*e.getMaxScaleOnAxis(),this}translate(e){return this.center.add(e),this}expandByPoint(e){if(this.isEmpty())return this.center.copy(e),this.radius=0,this;il.subVectors(e,this.center);let t=il.lengthSq();if(t>this.radius*this.radius){let i=Math.sqrt(t),r=(i-this.radius)*.5;this.center.addScaledVector(il,r/i),this.radius+=r}return this}union(e){return e.isEmpty()?this:this.isEmpty()?(this.copy(e),this):(this.center.equals(e.center)===!0?this.radius=Math.max(this.radius,e.radius):(fy.subVectors(e.center,this.center).setLength(e.radius),this.expandByPoint(il.copy(e.center).add(fy)),this.expandByPoint(il.copy(e.center).sub(fy))),this)}equals(e){return e.center.equals(this.center)&&e.radius===this.radius}clone(){return new this.constructor().copy(this)}toJSON(){return{radius:this.radius,center:this.center.toArray()}}fromJSON(e){return this.radius=e.radius,this.center.fromArray(e.center),this}},vN=0,di=new Rt,hy=new $i,_a=new F,Xn=new os,rl=new os,sn=new F,Kn=class n extends Dr{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:vN++}),this.uuid=Rl(),this.name="",this.type="BufferGeometry",this.index=null,this.indirect=null,this.indirectOffset=0,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={}}getIndex(){return this.index}setIndex(e){return Array.isArray(e)?this.index=new(nN(e)?fl:dl)(e,1):this.index=e,this}setIndirect(e,t=0){return this.indirect=e,this.indirectOffset=t,this}getIndirect(){return this.indirect}getAttribute(e){return this.attributes[e]}setAttribute(e,t){return this.attributes[e]=t,this}deleteAttribute(e){return delete this.attributes[e],this}hasAttribute(e){return this.attributes[e]!==void 0}addGroup(e,t,i=0){this.groups.push({start:e,count:t,materialIndex:i})}clearGroups(){this.groups=[]}setDrawRange(e,t){this.drawRange.start=e,this.drawRange.count=t}applyMatrix4(e){let t=this.attributes.position;t!==void 0&&(t.applyMatrix4(e),t.needsUpdate=!0);let i=this.attributes.normal;if(i!==void 0){let s=new We().getNormalMatrix(e);i.applyNormalMatrix(s),i.needsUpdate=!0}let r=this.attributes.tangent;return r!==void 0&&(r.transformDirection(e),r.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this}applyQuaternion(e){return di.makeRotationFromQuaternion(e),this.applyMatrix4(di),this}rotateX(e){return di.makeRotationX(e),this.applyMatrix4(di),this}rotateY(e){return di.makeRotationY(e),this.applyMatrix4(di),this}rotateZ(e){return di.makeRotationZ(e),this.applyMatrix4(di),this}translate(e,t,i){return di.makeTranslation(e,t,i),this.applyMatrix4(di),this}scale(e,t,i){return di.makeScale(e,t,i),this.applyMatrix4(di),this}lookAt(e){return hy.lookAt(e),hy.updateMatrix(),this.applyMatrix4(hy.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(_a).negate(),this.translate(_a.x,_a.y,_a.z),this}setFromPoints(e){let t=this.getAttribute("position");if(t===void 0){let i=[];for(let r=0,s=e.length;r<s;r++){let o=e[r];i.push(o.x,o.y,o.z||0)}this.setAttribute("position",new Gt(i,3))}else{let i=Math.min(e.length,t.count);for(let r=0;r<i;r++){let s=e[r];t.setXYZ(r,s.x,s.y,s.z||0)}e.length>t.count&&Fe("BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry."),t.needsUpdate=!0}return this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new os);let e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){Ne("BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),this.boundingBox.set(new F(-1/0,-1/0,-1/0),new F(1/0,1/0,1/0));return}if(e!==void 0){if(this.boundingBox.setFromBufferAttribute(e),t)for(let i=0,r=t.length;i<r;i++){let s=t[i];Xn.setFromBufferAttribute(s),this.morphTargetsRelative?(sn.addVectors(this.boundingBox.min,Xn.min),this.boundingBox.expandByPoint(sn),sn.addVectors(this.boundingBox.max,Xn.max),this.boundingBox.expandByPoint(sn)):(this.boundingBox.expandByPoint(Xn.min),this.boundingBox.expandByPoint(Xn.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&Ne('BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new Da);let e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){Ne("BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),this.boundingSphere.set(new F,1/0);return}if(e){let i=this.boundingSphere.center;if(Xn.setFromBufferAttribute(e),t)for(let s=0,o=t.length;s<o;s++){let a=t[s];rl.setFromBufferAttribute(a),this.morphTargetsRelative?(sn.addVectors(Xn.min,rl.min),Xn.expandByPoint(sn),sn.addVectors(Xn.max,rl.max),Xn.expandByPoint(sn)):(Xn.expandByPoint(rl.min),Xn.expandByPoint(rl.max))}Xn.getCenter(i);let r=0;for(let s=0,o=e.count;s<o;s++)sn.fromBufferAttribute(e,s),r=Math.max(r,i.distanceToSquared(sn));if(t)for(let s=0,o=t.length;s<o;s++){let a=t[s],c=this.morphTargetsRelative;for(let l=0,u=a.count;l<u;l++)sn.fromBufferAttribute(a,l),c&&(_a.fromBufferAttribute(e,l),sn.add(_a)),r=Math.max(r,i.distanceToSquared(sn))}this.boundingSphere.radius=Math.sqrt(r),isNaN(this.boundingSphere.radius)&&Ne('BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){let e=this.index,t=this.attributes;if(e===null||t.position===void 0||t.normal===void 0||t.uv===void 0){Ne("BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}let i=t.position,r=t.normal,s=t.uv;this.hasAttribute("tangent")===!1&&this.setAttribute("tangent",new Zn(new Float32Array(4*i.count),4));let o=this.getAttribute("tangent"),a=[],c=[];for(let y=0;y<i.count;y++)a[y]=new F,c[y]=new F;let l=new F,u=new F,d=new F,f=new rt,h=new rt,g=new rt,_=new F,m=new F;function p(y,b,j){l.fromBufferAttribute(i,y),u.fromBufferAttribute(i,b),d.fromBufferAttribute(i,j),f.fromBufferAttribute(s,y),h.fromBufferAttribute(s,b),g.fromBufferAttribute(s,j),u.sub(l),d.sub(l),h.sub(f),g.sub(f);let T=1/(h.x*g.y-g.x*h.y);isFinite(T)&&(_.copy(u).multiplyScalar(g.y).addScaledVector(d,-h.y).multiplyScalar(T),m.copy(d).multiplyScalar(h.x).addScaledVector(u,-g.x).multiplyScalar(T),a[y].add(_),a[b].add(_),a[j].add(_),c[y].add(m),c[b].add(m),c[j].add(m))}let M=this.groups;M.length===0&&(M=[{start:0,count:e.count}]);for(let y=0,b=M.length;y<b;++y){let j=M[y],T=j.start,O=j.count;for(let k=T,G=T+O;k<G;k+=3)p(e.getX(k+0),e.getX(k+1),e.getX(k+2))}let w=new F,S=new F,D=new F,C=new F;function A(y){D.fromBufferAttribute(r,y),C.copy(D);let b=a[y];w.copy(b),w.sub(D.multiplyScalar(D.dot(b))).normalize(),S.crossVectors(C,b);let T=S.dot(c[y])<0?-1:1;o.setXYZW(y,w.x,w.y,w.z,T)}for(let y=0,b=M.length;y<b;++y){let j=M[y],T=j.start,O=j.count;for(let k=T,G=T+O;k<G;k+=3)A(e.getX(k+0)),A(e.getX(k+1)),A(e.getX(k+2))}}computeVertexNormals(){let e=this.index,t=this.getAttribute("position");if(t!==void 0){let i=this.getAttribute("normal");if(i===void 0)i=new Zn(new Float32Array(t.count*3),3),this.setAttribute("normal",i);else for(let f=0,h=i.count;f<h;f++)i.setXYZ(f,0,0,0);let r=new F,s=new F,o=new F,a=new F,c=new F,l=new F,u=new F,d=new F;if(e)for(let f=0,h=e.count;f<h;f+=3){let g=e.getX(f+0),_=e.getX(f+1),m=e.getX(f+2);r.fromBufferAttribute(t,g),s.fromBufferAttribute(t,_),o.fromBufferAttribute(t,m),u.subVectors(o,s),d.subVectors(r,s),u.cross(d),a.fromBufferAttribute(i,g),c.fromBufferAttribute(i,_),l.fromBufferAttribute(i,m),a.add(u),c.add(u),l.add(u),i.setXYZ(g,a.x,a.y,a.z),i.setXYZ(_,c.x,c.y,c.z),i.setXYZ(m,l.x,l.y,l.z)}else for(let f=0,h=t.count;f<h;f+=3)r.fromBufferAttribute(t,f+0),s.fromBufferAttribute(t,f+1),o.fromBufferAttribute(t,f+2),u.subVectors(o,s),d.subVectors(r,s),u.cross(d),i.setXYZ(f+0,u.x,u.y,u.z),i.setXYZ(f+1,u.x,u.y,u.z),i.setXYZ(f+2,u.x,u.y,u.z);this.normalizeNormals(),i.needsUpdate=!0}}normalizeNormals(){let e=this.attributes.normal;for(let t=0,i=e.count;t<i;t++)sn.fromBufferAttribute(e,t),sn.normalize(),e.setXYZ(t,sn.x,sn.y,sn.z)}toNonIndexed(){function e(a,c){let l=a.array,u=a.itemSize,d=a.normalized,f=new l.constructor(c.length*u),h=0,g=0;for(let _=0,m=c.length;_<m;_++){a.isInterleavedBufferAttribute?h=c[_]*a.data.stride+a.offset:h=c[_]*u;for(let p=0;p<u;p++)f[g++]=l[h++]}return new Zn(f,u,d)}if(this.index===null)return Fe("BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;let t=new n,i=this.index.array,r=this.attributes;for(let a in r){let c=r[a],l=e(c,i);t.setAttribute(a,l)}let s=this.morphAttributes;for(let a in s){let c=[],l=s[a];for(let u=0,d=l.length;u<d;u++){let f=l[u],h=e(f,i);c.push(h)}t.morphAttributes[a]=c}t.morphTargetsRelative=this.morphTargetsRelative;let o=this.groups;for(let a=0,c=o.length;a<c;a++){let l=o[a];t.addGroup(l.start,l.count,l.materialIndex)}return t}toJSON(){let e={metadata:{version:4.7,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(e.uuid=this.uuid,e.type=this.type,this.name!==""&&(e.name=this.name),Object.keys(this.userData).length>0&&(e.userData=this.userData),this.parameters!==void 0){let c=this.parameters;for(let l in c)c[l]!==void 0&&(e[l]=c[l]);return e}e.data={attributes:{}};let t=this.index;t!==null&&(e.data.index={type:t.array.constructor.name,array:Array.prototype.slice.call(t.array)});let i=this.attributes;for(let c in i){let l=i[c];e.data.attributes[c]=l.toJSON(e.data)}let r={},s=!1;for(let c in this.morphAttributes){let l=this.morphAttributes[c],u=[];for(let d=0,f=l.length;d<f;d++){let h=l[d];u.push(h.toJSON(e.data))}u.length>0&&(r[c]=u,s=!0)}s&&(e.data.morphAttributes=r,e.data.morphTargetsRelative=this.morphTargetsRelative);let o=this.groups;o.length>0&&(e.data.groups=JSON.parse(JSON.stringify(o)));let a=this.boundingSphere;return a!==null&&(e.data.boundingSphere=a.toJSON()),e}clone(){return new this.constructor().copy(this)}copy(e){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;let t={};this.name=e.name;let i=e.index;i!==null&&this.setIndex(i.clone());let r=e.attributes;for(let l in r){let u=r[l];this.setAttribute(l,u.clone(t))}let s=e.morphAttributes;for(let l in s){let u=[],d=s[l];for(let f=0,h=d.length;f<h;f++)u.push(d[f].clone(t));this.morphAttributes[l]=u}this.morphTargetsRelative=e.morphTargetsRelative;let o=e.groups;for(let l=0,u=o.length;l<u;l++){let d=o[l];this.addGroup(d.start,d.count,d.materialIndex)}let a=e.boundingBox;a!==null&&(this.boundingBox=a.clone());let c=e.boundingSphere;return c!==null&&(this.boundingSphere=c.clone()),this.drawRange.start=e.drawRange.start,this.drawRange.count=e.drawRange.count,this.userData=e.userData,this}dispose(){this.dispatchEvent({type:"dispose"})}};var yN=0,as=class extends Dr{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:yN++}),this.uuid=Rl(),this.name="",this.type="Material",this.blending=ro,this.side=Tr,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=Uf,this.blendDst=Bf,this.blendEquation=rs,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new ot(0,0,0),this.blendAlpha=0,this.depthFunc=so,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=wy,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=io,this.stencilZFail=io,this.stencilZPass=io,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.allowOverride=!0,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(e){this._alphaTest>0!=e>0&&this.version++,this._alphaTest=e}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(e){if(e!==void 0)for(let t in e){let i=e[t];if(i===void 0){Fe(`Material: parameter '${t}' has value of undefined.`);continue}let r=this[t];if(r===void 0){Fe(`Material: '${t}' is not a property of THREE.${this.type}.`);continue}r&&r.isColor?r.set(i):r&&r.isVector3&&i&&i.isVector3?r.copy(i):this[t]=i}}toJSON(e){let t=e===void 0||typeof e=="string";t&&(e={textures:{},images:{}});let i={metadata:{version:4.7,type:"Material",generator:"Material.toJSON"}};i.uuid=this.uuid,i.type=this.type,this.name!==""&&(i.name=this.name),this.color&&this.color.isColor&&(i.color=this.color.getHex()),this.roughness!==void 0&&(i.roughness=this.roughness),this.metalness!==void 0&&(i.metalness=this.metalness),this.sheen!==void 0&&(i.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(i.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(i.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(i.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&this.emissiveIntensity!==1&&(i.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(i.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(i.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(i.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(i.shininess=this.shininess),this.clearcoat!==void 0&&(i.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(i.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(i.clearcoatMap=this.clearcoatMap.toJSON(e).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(i.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(e).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(i.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(e).uuid,i.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.sheenColorMap&&this.sheenColorMap.isTexture&&(i.sheenColorMap=this.sheenColorMap.toJSON(e).uuid),this.sheenRoughnessMap&&this.sheenRoughnessMap.isTexture&&(i.sheenRoughnessMap=this.sheenRoughnessMap.toJSON(e).uuid),this.dispersion!==void 0&&(i.dispersion=this.dispersion),this.iridescence!==void 0&&(i.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(i.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(i.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(i.iridescenceMap=this.iridescenceMap.toJSON(e).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(i.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(e).uuid),this.anisotropy!==void 0&&(i.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(i.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(i.anisotropyMap=this.anisotropyMap.toJSON(e).uuid),this.map&&this.map.isTexture&&(i.map=this.map.toJSON(e).uuid),this.matcap&&this.matcap.isTexture&&(i.matcap=this.matcap.toJSON(e).uuid),this.alphaMap&&this.alphaMap.isTexture&&(i.alphaMap=this.alphaMap.toJSON(e).uuid),this.lightMap&&this.lightMap.isTexture&&(i.lightMap=this.lightMap.toJSON(e).uuid,i.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(i.aoMap=this.aoMap.toJSON(e).uuid,i.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(i.bumpMap=this.bumpMap.toJSON(e).uuid,i.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(i.normalMap=this.normalMap.toJSON(e).uuid,i.normalMapType=this.normalMapType,i.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(i.displacementMap=this.displacementMap.toJSON(e).uuid,i.displacementScale=this.displacementScale,i.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(i.roughnessMap=this.roughnessMap.toJSON(e).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(i.metalnessMap=this.metalnessMap.toJSON(e).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(i.emissiveMap=this.emissiveMap.toJSON(e).uuid),this.specularMap&&this.specularMap.isTexture&&(i.specularMap=this.specularMap.toJSON(e).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(i.specularIntensityMap=this.specularIntensityMap.toJSON(e).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(i.specularColorMap=this.specularColorMap.toJSON(e).uuid),this.envMap&&this.envMap.isTexture&&(i.envMap=this.envMap.toJSON(e).uuid,this.combine!==void 0&&(i.combine=this.combine)),this.envMapRotation!==void 0&&(i.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(i.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(i.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(i.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(i.gradientMap=this.gradientMap.toJSON(e).uuid),this.transmission!==void 0&&(i.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(i.transmissionMap=this.transmissionMap.toJSON(e).uuid),this.thickness!==void 0&&(i.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(i.thicknessMap=this.thicknessMap.toJSON(e).uuid),this.attenuationDistance!==void 0&&this.attenuationDistance!==1/0&&(i.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(i.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(i.size=this.size),this.shadowSide!==null&&(i.shadowSide=this.shadowSide),this.sizeAttenuation!==void 0&&(i.sizeAttenuation=this.sizeAttenuation),this.blending!==ro&&(i.blending=this.blending),this.side!==Tr&&(i.side=this.side),this.vertexColors===!0&&(i.vertexColors=!0),this.opacity<1&&(i.opacity=this.opacity),this.transparent===!0&&(i.transparent=!0),this.blendSrc!==Uf&&(i.blendSrc=this.blendSrc),this.blendDst!==Bf&&(i.blendDst=this.blendDst),this.blendEquation!==rs&&(i.blendEquation=this.blendEquation),this.blendSrcAlpha!==null&&(i.blendSrcAlpha=this.blendSrcAlpha),this.blendDstAlpha!==null&&(i.blendDstAlpha=this.blendDstAlpha),this.blendEquationAlpha!==null&&(i.blendEquationAlpha=this.blendEquationAlpha),this.blendColor&&this.blendColor.isColor&&(i.blendColor=this.blendColor.getHex()),this.blendAlpha!==0&&(i.blendAlpha=this.blendAlpha),this.depthFunc!==so&&(i.depthFunc=this.depthFunc),this.depthTest===!1&&(i.depthTest=this.depthTest),this.depthWrite===!1&&(i.depthWrite=this.depthWrite),this.colorWrite===!1&&(i.colorWrite=this.colorWrite),this.stencilWriteMask!==255&&(i.stencilWriteMask=this.stencilWriteMask),this.stencilFunc!==wy&&(i.stencilFunc=this.stencilFunc),this.stencilRef!==0&&(i.stencilRef=this.stencilRef),this.stencilFuncMask!==255&&(i.stencilFuncMask=this.stencilFuncMask),this.stencilFail!==io&&(i.stencilFail=this.stencilFail),this.stencilZFail!==io&&(i.stencilZFail=this.stencilZFail),this.stencilZPass!==io&&(i.stencilZPass=this.stencilZPass),this.stencilWrite===!0&&(i.stencilWrite=this.stencilWrite),this.rotation!==void 0&&this.rotation!==0&&(i.rotation=this.rotation),this.polygonOffset===!0&&(i.polygonOffset=!0),this.polygonOffsetFactor!==0&&(i.polygonOffsetFactor=this.polygonOffsetFactor),this.polygonOffsetUnits!==0&&(i.polygonOffsetUnits=this.polygonOffsetUnits),this.linewidth!==void 0&&this.linewidth!==1&&(i.linewidth=this.linewidth),this.dashSize!==void 0&&(i.dashSize=this.dashSize),this.gapSize!==void 0&&(i.gapSize=this.gapSize),this.scale!==void 0&&(i.scale=this.scale),this.dithering===!0&&(i.dithering=!0),this.alphaTest>0&&(i.alphaTest=this.alphaTest),this.alphaHash===!0&&(i.alphaHash=!0),this.alphaToCoverage===!0&&(i.alphaToCoverage=!0),this.premultipliedAlpha===!0&&(i.premultipliedAlpha=!0),this.forceSinglePass===!0&&(i.forceSinglePass=!0),this.allowOverride===!1&&(i.allowOverride=!1),this.wireframe===!0&&(i.wireframe=!0),this.wireframeLinewidth>1&&(i.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!=="round"&&(i.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!=="round"&&(i.wireframeLinejoin=this.wireframeLinejoin),this.flatShading===!0&&(i.flatShading=!0),this.visible===!1&&(i.visible=!1),this.toneMapped===!1&&(i.toneMapped=!1),this.fog===!1&&(i.fog=!1),Object.keys(this.userData).length>0&&(i.userData=this.userData);function r(s){let o=[];for(let a in s){let c=s[a];delete c.metadata,o.push(c)}return o}if(t){let s=r(e.textures),o=r(e.images);s.length>0&&(i.textures=s),o.length>0&&(i.images=o)}return i}clone(){return new this.constructor().copy(this)}copy(e){this.name=e.name,this.blending=e.blending,this.side=e.side,this.vertexColors=e.vertexColors,this.opacity=e.opacity,this.transparent=e.transparent,this.blendSrc=e.blendSrc,this.blendDst=e.blendDst,this.blendEquation=e.blendEquation,this.blendSrcAlpha=e.blendSrcAlpha,this.blendDstAlpha=e.blendDstAlpha,this.blendEquationAlpha=e.blendEquationAlpha,this.blendColor.copy(e.blendColor),this.blendAlpha=e.blendAlpha,this.depthFunc=e.depthFunc,this.depthTest=e.depthTest,this.depthWrite=e.depthWrite,this.stencilWriteMask=e.stencilWriteMask,this.stencilFunc=e.stencilFunc,this.stencilRef=e.stencilRef,this.stencilFuncMask=e.stencilFuncMask,this.stencilFail=e.stencilFail,this.stencilZFail=e.stencilZFail,this.stencilZPass=e.stencilZPass,this.stencilWrite=e.stencilWrite;let t=e.clippingPlanes,i=null;if(t!==null){let r=t.length;i=new Array(r);for(let s=0;s!==r;++s)i[s]=t[s].clone()}return this.clippingPlanes=i,this.clipIntersection=e.clipIntersection,this.clipShadows=e.clipShadows,this.shadowSide=e.shadowSide,this.colorWrite=e.colorWrite,this.precision=e.precision,this.polygonOffset=e.polygonOffset,this.polygonOffsetFactor=e.polygonOffsetFactor,this.polygonOffsetUnits=e.polygonOffsetUnits,this.dithering=e.dithering,this.alphaTest=e.alphaTest,this.alphaHash=e.alphaHash,this.alphaToCoverage=e.alphaToCoverage,this.premultipliedAlpha=e.premultipliedAlpha,this.forceSinglePass=e.forceSinglePass,this.allowOverride=e.allowOverride,this.visible=e.visible,this.toneMapped=e.toneMapped,this.userData=JSON.parse(JSON.stringify(e.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(e){e===!0&&this.version++}};var Er=new F,py=new F,Ef=new F,ts=new F,my=new F,wf=new F,gy=new F,hl=class{constructor(e=new F,t=new F(0,0,-1)){this.origin=e,this.direction=t}set(e,t){return this.origin.copy(e),this.direction.copy(t),this}copy(e){return this.origin.copy(e.origin),this.direction.copy(e.direction),this}at(e,t){return t.copy(this.origin).addScaledVector(this.direction,e)}lookAt(e){return this.direction.copy(e).sub(this.origin).normalize(),this}recast(e){return this.origin.copy(this.at(e,Er)),this}closestPointToPoint(e,t){t.subVectors(e,this.origin);let i=t.dot(this.direction);return i<0?t.copy(this.origin):t.copy(this.origin).addScaledVector(this.direction,i)}distanceToPoint(e){return Math.sqrt(this.distanceSqToPoint(e))}distanceSqToPoint(e){let t=Er.subVectors(e,this.origin).dot(this.direction);return t<0?this.origin.distanceToSquared(e):(Er.copy(this.origin).addScaledVector(this.direction,t),Er.distanceToSquared(e))}distanceSqToSegment(e,t,i,r){py.copy(e).add(t).multiplyScalar(.5),Ef.copy(t).sub(e).normalize(),ts.copy(this.origin).sub(py);let s=e.distanceTo(t)*.5,o=-this.direction.dot(Ef),a=ts.dot(this.direction),c=-ts.dot(Ef),l=ts.lengthSq(),u=Math.abs(1-o*o),d,f,h,g;if(u>0)if(d=o*c-a,f=o*a-c,g=s*u,d>=0)if(f>=-g)if(f<=g){let _=1/u;d*=_,f*=_,h=d*(d+o*f+2*a)+f*(o*d+f+2*c)+l}else f=s,d=Math.max(0,-(o*f+a)),h=-d*d+f*(f+2*c)+l;else f=-s,d=Math.max(0,-(o*f+a)),h=-d*d+f*(f+2*c)+l;else f<=-g?(d=Math.max(0,-(-o*s+a)),f=d>0?-s:Math.min(Math.max(-s,-c),s),h=-d*d+f*(f+2*c)+l):f<=g?(d=0,f=Math.min(Math.max(-s,-c),s),h=f*(f+2*c)+l):(d=Math.max(0,-(o*s+a)),f=d>0?s:Math.min(Math.max(-s,-c),s),h=-d*d+f*(f+2*c)+l);else f=o>0?-s:s,d=Math.max(0,-(o*f+a)),h=-d*d+f*(f+2*c)+l;return i&&i.copy(this.origin).addScaledVector(this.direction,d),r&&r.copy(py).addScaledVector(Ef,f),h}intersectSphere(e,t){Er.subVectors(e.center,this.origin);let i=Er.dot(this.direction),r=Er.dot(Er)-i*i,s=e.radius*e.radius;if(r>s)return null;let o=Math.sqrt(s-r),a=i-o,c=i+o;return c<0?null:a<0?this.at(c,t):this.at(a,t)}intersectsSphere(e){return e.radius<0?!1:this.distanceSqToPoint(e.center)<=e.radius*e.radius}distanceToPlane(e){let t=e.normal.dot(this.direction);if(t===0)return e.distanceToPoint(this.origin)===0?0:null;let i=-(this.origin.dot(e.normal)+e.constant)/t;return i>=0?i:null}intersectPlane(e,t){let i=this.distanceToPlane(e);return i===null?null:this.at(i,t)}intersectsPlane(e){let t=e.distanceToPoint(this.origin);return t===0||e.normal.dot(this.direction)*t<0}intersectBox(e,t){let i,r,s,o,a,c,l=1/this.direction.x,u=1/this.direction.y,d=1/this.direction.z,f=this.origin;return l>=0?(i=(e.min.x-f.x)*l,r=(e.max.x-f.x)*l):(i=(e.max.x-f.x)*l,r=(e.min.x-f.x)*l),u>=0?(s=(e.min.y-f.y)*u,o=(e.max.y-f.y)*u):(s=(e.max.y-f.y)*u,o=(e.min.y-f.y)*u),i>o||s>r||((s>i||isNaN(i))&&(i=s),(o<r||isNaN(r))&&(r=o),d>=0?(a=(e.min.z-f.z)*d,c=(e.max.z-f.z)*d):(a=(e.max.z-f.z)*d,c=(e.min.z-f.z)*d),i>c||a>r)||((a>i||i!==i)&&(i=a),(c<r||r!==r)&&(r=c),r<0)?null:this.at(i>=0?i:r,t)}intersectsBox(e){return this.intersectBox(e,Er)!==null}intersectTriangle(e,t,i,r,s){my.subVectors(t,e),wf.subVectors(i,e),gy.crossVectors(my,wf);let o=this.direction.dot(gy),a;if(o>0){if(r)return null;a=1}else if(o<0)a=-1,o=-o;else return null;ts.subVectors(this.origin,e);let c=a*this.direction.dot(wf.crossVectors(ts,wf));if(c<0)return null;let l=a*this.direction.dot(my.cross(ts));if(l<0||c+l>o)return null;let u=-a*ts.dot(gy);return u<0?null:this.at(u/o,s)}applyMatrix4(e){return this.origin.applyMatrix4(e),this.direction.transformDirection(e),this}equals(e){return e.origin.equals(this.origin)&&e.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}},qi=class extends as{constructor(e){super(),this.isMeshBasicMaterial=!0,this.type="MeshBasicMaterial",this.color=new ot(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new ss,this.combine=Ly,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.combine=e.combine,this.reflectivity=e.reflectivity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.fog=e.fog,this}},GS=new Rt,to=new hl,Cf=new Da,jS=new F,Tf=new F,Df=new F,If=new F,vy=new F,Af=new F,WS=new F,Rf=new F,an=class extends $i{constructor(e=new Kn,t=new qi){super(),this.isMesh=!0,this.type="Mesh",this.geometry=e,this.material=t,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.count=1,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),e.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=e.morphTargetInfluences.slice()),e.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},e.morphTargetDictionary)),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}updateMorphTargets(){let t=this.geometry.morphAttributes,i=Object.keys(t);if(i.length>0){let r=t[i[0]];if(r!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let s=0,o=r.length;s<o;s++){let a=r[s].name||String(s);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=s}}}}getVertexPosition(e,t){let i=this.geometry,r=i.attributes.position,s=i.morphAttributes.position,o=i.morphTargetsRelative;t.fromBufferAttribute(r,e);let a=this.morphTargetInfluences;if(s&&a){Af.set(0,0,0);for(let c=0,l=s.length;c<l;c++){let u=a[c],d=s[c];u!==0&&(vy.fromBufferAttribute(d,e),o?Af.addScaledVector(vy,u):Af.addScaledVector(vy.sub(t),u))}t.add(Af)}return t}raycast(e,t){let i=this.geometry,r=this.material,s=this.matrixWorld;r!==void 0&&(i.boundingSphere===null&&i.computeBoundingSphere(),Cf.copy(i.boundingSphere),Cf.applyMatrix4(s),to.copy(e.ray).recast(e.near),!(Cf.containsPoint(to.origin)===!1&&(to.intersectSphere(Cf,jS)===null||to.origin.distanceToSquared(jS)>(e.far-e.near)**2))&&(GS.copy(s).invert(),to.copy(e.ray).applyMatrix4(GS),!(i.boundingBox!==null&&to.intersectsBox(i.boundingBox)===!1)&&this._computeIntersections(e,t,to)))}_computeIntersections(e,t,i){let r,s=this.geometry,o=this.material,a=s.index,c=s.attributes.position,l=s.attributes.uv,u=s.attributes.uv1,d=s.attributes.normal,f=s.groups,h=s.drawRange;if(a!==null)if(Array.isArray(o))for(let g=0,_=f.length;g<_;g++){let m=f[g],p=o[m.materialIndex],M=Math.max(m.start,h.start),w=Math.min(a.count,Math.min(m.start+m.count,h.start+h.count));for(let S=M,D=w;S<D;S+=3){let C=a.getX(S),A=a.getX(S+1),y=a.getX(S+2);r=Nf(this,p,e,i,l,u,d,C,A,y),r&&(r.faceIndex=Math.floor(S/3),r.face.materialIndex=m.materialIndex,t.push(r))}}else{let g=Math.max(0,h.start),_=Math.min(a.count,h.start+h.count);for(let m=g,p=_;m<p;m+=3){let M=a.getX(m),w=a.getX(m+1),S=a.getX(m+2);r=Nf(this,o,e,i,l,u,d,M,w,S),r&&(r.faceIndex=Math.floor(m/3),t.push(r))}}else if(c!==void 0)if(Array.isArray(o))for(let g=0,_=f.length;g<_;g++){let m=f[g],p=o[m.materialIndex],M=Math.max(m.start,h.start),w=Math.min(c.count,Math.min(m.start+m.count,h.start+h.count));for(let S=M,D=w;S<D;S+=3){let C=S,A=S+1,y=S+2;r=Nf(this,p,e,i,l,u,d,C,A,y),r&&(r.faceIndex=Math.floor(S/3),r.face.materialIndex=m.materialIndex,t.push(r))}}else{let g=Math.max(0,h.start),_=Math.min(c.count,h.start+h.count);for(let m=g,p=_;m<p;m+=3){let M=m,w=m+1,S=m+2;r=Nf(this,o,e,i,l,u,d,M,w,S),r&&(r.faceIndex=Math.floor(m/3),t.push(r))}}}};function _N(n,e,t,i,r,s,o,a){let c;if(e.side===Nn?c=i.intersectTriangle(o,s,r,!0,a):c=i.intersectTriangle(r,s,o,e.side===Tr,a),c===null)return null;Rf.copy(a),Rf.applyMatrix4(n.matrixWorld);let l=t.ray.origin.distanceTo(Rf);return l<t.near||l>t.far?null:{distance:l,point:Rf.clone(),object:n}}function Nf(n,e,t,i,r,s,o,a,c,l){n.getVertexPosition(a,Tf),n.getVertexPosition(c,Df),n.getVertexPosition(l,If);let u=_N(n,e,t,i,Tf,Df,If,WS);if(u){let d=new F;is.getBarycoord(WS,Tf,Df,If,d),r&&(u.uv=is.getInterpolatedAttribute(r,a,c,l,d,new rt)),s&&(u.uv1=is.getInterpolatedAttribute(s,a,c,l,d,new rt)),o&&(u.normal=is.getInterpolatedAttribute(o,a,c,l,d,new F),u.normal.dot(i.direction)>0&&u.normal.multiplyScalar(-1));let f={a,b:c,c:l,normal:new F,materialIndex:0};is.getNormal(Tf,Df,If,f.normal),u.face=f,u.barycoord=d}return u}var eh=class extends Ar{constructor(e=null,t=1,i=1,r,s,o,a,c,l=on,u=on,d,f){super(null,o,a,c,l,u,r,s,d,f),this.isDataTexture=!0,this.image={data:e,width:t,height:i},this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}};var yy=new F,xN=new F,MN=new We,Gi=class{constructor(e=new F(1,0,0),t=0){this.isPlane=!0,this.normal=e,this.constant=t}set(e,t){return this.normal.copy(e),this.constant=t,this}setComponents(e,t,i,r){return this.normal.set(e,t,i),this.constant=r,this}setFromNormalAndCoplanarPoint(e,t){return this.normal.copy(e),this.constant=-t.dot(this.normal),this}setFromCoplanarPoints(e,t,i){let r=yy.subVectors(i,t).cross(xN.subVectors(e,t)).normalize();return this.setFromNormalAndCoplanarPoint(r,e),this}copy(e){return this.normal.copy(e.normal),this.constant=e.constant,this}normalize(){let e=1/this.normal.length();return this.normal.multiplyScalar(e),this.constant*=e,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(e){return this.normal.dot(e)+this.constant}distanceToSphere(e){return this.distanceToPoint(e.center)-e.radius}projectPoint(e,t){return t.copy(e).addScaledVector(this.normal,-this.distanceToPoint(e))}intersectLine(e,t){let i=e.delta(yy),r=this.normal.dot(i);if(r===0)return this.distanceToPoint(e.start)===0?t.copy(e.start):null;let s=-(e.start.dot(this.normal)+this.constant)/r;return s<0||s>1?null:t.copy(e.start).addScaledVector(i,s)}intersectsLine(e){let t=this.distanceToPoint(e.start),i=this.distanceToPoint(e.end);return t<0&&i>0||i<0&&t>0}intersectsBox(e){return e.intersectsPlane(this)}intersectsSphere(e){return e.intersectsPlane(this)}coplanarPoint(e){return e.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(e,t){let i=t||MN.getNormalMatrix(e),r=this.coplanarPoint(yy).applyMatrix4(e),s=this.normal.applyMatrix3(i).normalize();return this.constant=-r.dot(s),this}translate(e){return this.constant-=e.dot(this.normal),this}equals(e){return e.normal.equals(this.normal)&&e.constant===this.constant}clone(){return new this.constructor().copy(this)}},no=new Da,bN=new rt(.5,.5),Pf=new F,Ia=class{constructor(e=new Gi,t=new Gi,i=new Gi,r=new Gi,s=new Gi,o=new Gi){this.planes=[e,t,i,r,s,o]}set(e,t,i,r,s,o){let a=this.planes;return a[0].copy(e),a[1].copy(t),a[2].copy(i),a[3].copy(r),a[4].copy(s),a[5].copy(o),this}copy(e){let t=this.planes;for(let i=0;i<6;i++)t[i].copy(e.planes[i]);return this}setFromProjectionMatrix(e,t=Ri,i=!1){let r=this.planes,s=e.elements,o=s[0],a=s[1],c=s[2],l=s[3],u=s[4],d=s[5],f=s[6],h=s[7],g=s[8],_=s[9],m=s[10],p=s[11],M=s[12],w=s[13],S=s[14],D=s[15];if(r[0].setComponents(l-o,h-u,p-g,D-M).normalize(),r[1].setComponents(l+o,h+u,p+g,D+M).normalize(),r[2].setComponents(l+a,h+d,p+_,D+w).normalize(),r[3].setComponents(l-a,h-d,p-_,D-w).normalize(),i)r[4].setComponents(c,f,m,S).normalize(),r[5].setComponents(l-c,h-f,p-m,D-S).normalize();else if(r[4].setComponents(l-c,h-f,p-m,D-S).normalize(),t===Ri)r[5].setComponents(l+c,h+f,p+m,D+S).normalize();else if(t===Sa)r[5].setComponents(c,f,m,S).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+t);return this}intersectsObject(e){if(e.boundingSphere!==void 0)e.boundingSphere===null&&e.computeBoundingSphere(),no.copy(e.boundingSphere).applyMatrix4(e.matrixWorld);else{let t=e.geometry;t.boundingSphere===null&&t.computeBoundingSphere(),no.copy(t.boundingSphere).applyMatrix4(e.matrixWorld)}return this.intersectsSphere(no)}intersectsSprite(e){no.center.set(0,0,0);let t=bN.distanceTo(e.center);return no.radius=.7071067811865476+t,no.applyMatrix4(e.matrixWorld),this.intersectsSphere(no)}intersectsSphere(e){let t=this.planes,i=e.center,r=-e.radius;for(let s=0;s<6;s++)if(t[s].distanceToPoint(i)<r)return!1;return!0}intersectsBox(e){let t=this.planes;for(let i=0;i<6;i++){let r=t[i];if(Pf.x=r.normal.x>0?e.max.x:e.min.x,Pf.y=r.normal.y>0?e.max.y:e.min.y,Pf.z=r.normal.z>0?e.max.z:e.min.z,r.distanceToPoint(Pf)<0)return!1}return!0}containsPoint(e){let t=this.planes;for(let i=0;i<6;i++)if(t[i].distanceToPoint(e)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}};var pl=class extends Ar{constructor(e=[],t=fs,i,r,s,o,a,c,l,u){super(e,t,i,r,s,o,a,c,l,u),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(e){this.image=e}};var cs=class extends Ar{constructor(e,t,i=Pi,r,s,o,a=on,c=on,l,u=Wi,d=1){if(u!==Wi&&u!==ps)throw new Error("DepthTexture format must be either THREE.DepthFormat or THREE.DepthStencilFormat");let f={width:e,height:t,depth:d};super(f,r,s,o,a,c,u,i,l),this.isDepthTexture=!0,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(e){return super.copy(e),this.source=new wa(Object.assign({},e.image)),this.compareFunction=e.compareFunction,this}toJSON(e){let t=super.toJSON(e);return this.compareFunction!==null&&(t.compareFunction=this.compareFunction),t}},th=class extends cs{constructor(e,t=Pi,i=fs,r,s,o=on,a=on,c,l=Wi){let u={width:e,height:e,depth:1},d=[u,u,u,u,u,u];super(e,e,t,i,r,s,o,a,c,l),this.image=d,this.isCubeDepthTexture=!0,this.isCubeTexture=!0}get images(){return this.image}set images(e){this.image=e}},ml=class extends Ar{constructor(e=null){super(),this.sourceTexture=e,this.isExternalTexture=!0}copy(e){return super.copy(e),this.sourceTexture=e.sourceTexture,this}},Aa=class n extends Kn{constructor(e=1,t=1,i=1,r=1,s=1,o=1){super(),this.type="BoxGeometry",this.parameters={width:e,height:t,depth:i,widthSegments:r,heightSegments:s,depthSegments:o};let a=this;r=Math.floor(r),s=Math.floor(s),o=Math.floor(o);let c=[],l=[],u=[],d=[],f=0,h=0;g("z","y","x",-1,-1,i,t,e,o,s,0),g("z","y","x",1,-1,i,t,-e,o,s,1),g("x","z","y",1,1,e,i,t,r,o,2),g("x","z","y",1,-1,e,i,-t,r,o,3),g("x","y","z",1,-1,e,t,i,r,s,4),g("x","y","z",-1,-1,e,t,-i,r,s,5),this.setIndex(c),this.setAttribute("position",new Gt(l,3)),this.setAttribute("normal",new Gt(u,3)),this.setAttribute("uv",new Gt(d,2));function g(_,m,p,M,w,S,D,C,A,y,b){let j=S/A,T=D/y,O=S/2,k=D/2,G=C/2,B=A+1,H=y+1,L=0,ee=0,Z=new F;for(let de=0;de<H;de++){let ve=de*T-k;for(let he=0;he<B;he++){let qe=he*j-O;Z[_]=qe*M,Z[m]=ve*w,Z[p]=G,l.push(Z.x,Z.y,Z.z),Z[_]=0,Z[m]=0,Z[p]=C>0?1:-1,u.push(Z.x,Z.y,Z.z),d.push(he/A),d.push(1-de/y),L+=1}}for(let de=0;de<y;de++)for(let ve=0;ve<A;ve++){let he=f+ve+B*de,qe=f+ve+B*(de+1),Nt=f+(ve+1)+B*(de+1),At=f+(ve+1)+B*de;c.push(he,qe,At),c.push(qe,Nt,At),ee+=6}a.addGroup(h,ee,b),h+=ee,f+=L}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new n(e.width,e.height,e.depth,e.widthSegments,e.heightSegments,e.depthSegments)}};var nh=class n extends Kn{constructor(e=1,t=1,i=1,r=32,s=1,o=!1,a=0,c=Math.PI*2){super(),this.type="CylinderGeometry",this.parameters={radiusTop:e,radiusBottom:t,height:i,radialSegments:r,heightSegments:s,openEnded:o,thetaStart:a,thetaLength:c};let l=this;r=Math.floor(r),s=Math.floor(s);let u=[],d=[],f=[],h=[],g=0,_=[],m=i/2,p=0;M(),o===!1&&(e>0&&w(!0),t>0&&w(!1)),this.setIndex(u),this.setAttribute("position",new Gt(d,3)),this.setAttribute("normal",new Gt(f,3)),this.setAttribute("uv",new Gt(h,2));function M(){let S=new F,D=new F,C=0,A=(t-e)/i;for(let y=0;y<=s;y++){let b=[],j=y/s,T=j*(t-e)+e;for(let O=0;O<=r;O++){let k=O/r,G=k*c+a,B=Math.sin(G),H=Math.cos(G);D.x=T*B,D.y=-j*i+m,D.z=T*H,d.push(D.x,D.y,D.z),S.set(B,A,H).normalize(),f.push(S.x,S.y,S.z),h.push(k,1-j),b.push(g++)}_.push(b)}for(let y=0;y<r;y++)for(let b=0;b<s;b++){let j=_[b][y],T=_[b+1][y],O=_[b+1][y+1],k=_[b][y+1];(e>0||b!==0)&&(u.push(j,T,k),C+=3),(t>0||b!==s-1)&&(u.push(T,O,k),C+=3)}l.addGroup(p,C,0),p+=C}function w(S){let D=g,C=new rt,A=new F,y=0,b=S===!0?e:t,j=S===!0?1:-1;for(let O=1;O<=r;O++)d.push(0,m*j,0),f.push(0,j,0),h.push(.5,.5),g++;let T=g;for(let O=0;O<=r;O++){let G=O/r*c+a,B=Math.cos(G),H=Math.sin(G);A.x=b*H,A.y=m*j,A.z=b*B,d.push(A.x,A.y,A.z),f.push(0,j,0),C.x=B*.5+.5,C.y=H*.5*j+.5,h.push(C.x,C.y),g++}for(let O=0;O<r;O++){let k=D+O,G=T+O;S===!0?u.push(G,G+1,k):u.push(G+1,G,k),y+=3}l.addGroup(p,y,S===!0?1:2),p+=y}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new n(e.radiusTop,e.radiusBottom,e.height,e.radialSegments,e.heightSegments,e.openEnded,e.thetaStart,e.thetaLength)}},gl=class n extends nh{constructor(e=1,t=1,i=32,r=1,s=!1,o=0,a=Math.PI*2){super(0,e,t,i,r,s,o,a),this.type="ConeGeometry",this.parameters={radius:e,height:t,radialSegments:i,heightSegments:r,openEnded:s,thetaStart:o,thetaLength:a}}static fromJSON(e){return new n(e.radius,e.height,e.radialSegments,e.heightSegments,e.openEnded,e.thetaStart,e.thetaLength)}};var vl=class n extends Kn{constructor(e=1,t=1,i=1,r=1){super(),this.type="PlaneGeometry",this.parameters={width:e,height:t,widthSegments:i,heightSegments:r};let s=e/2,o=t/2,a=Math.floor(i),c=Math.floor(r),l=a+1,u=c+1,d=e/a,f=t/c,h=[],g=[],_=[],m=[];for(let p=0;p<u;p++){let M=p*f-o;for(let w=0;w<l;w++){let S=w*d-s;g.push(S,-M,0),_.push(0,0,1),m.push(w/a),m.push(1-p/c)}}for(let p=0;p<c;p++)for(let M=0;M<a;M++){let w=M+l*p,S=M+l*(p+1),D=M+1+l*(p+1),C=M+1+l*p;h.push(w,S,C),h.push(S,D,C)}this.setIndex(h),this.setAttribute("position",new Gt(g,3)),this.setAttribute("normal",new Gt(_,3)),this.setAttribute("uv",new Gt(m,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new n(e.width,e.height,e.widthSegments,e.heightSegments)}};var Ra=class n extends Kn{constructor(e=1,t=32,i=16,r=0,s=Math.PI*2,o=0,a=Math.PI){super(),this.type="SphereGeometry",this.parameters={radius:e,widthSegments:t,heightSegments:i,phiStart:r,phiLength:s,thetaStart:o,thetaLength:a},t=Math.max(3,Math.floor(t)),i=Math.max(2,Math.floor(i));let c=Math.min(o+a,Math.PI),l=0,u=[],d=new F,f=new F,h=[],g=[],_=[],m=[];for(let p=0;p<=i;p++){let M=[],w=p/i,S=0;p===0&&o===0?S=.5/t:p===i&&c===Math.PI&&(S=-.5/t);for(let D=0;D<=t;D++){let C=D/t;d.x=-e*Math.cos(r+C*s)*Math.sin(o+w*a),d.y=e*Math.cos(o+w*a),d.z=e*Math.sin(r+C*s)*Math.sin(o+w*a),g.push(d.x,d.y,d.z),f.copy(d).normalize(),_.push(f.x,f.y,f.z),m.push(C+S,1-w),M.push(l++)}u.push(M)}for(let p=0;p<i;p++)for(let M=0;M<t;M++){let w=u[p][M+1],S=u[p][M],D=u[p+1][M],C=u[p+1][M+1];(p!==0||o>0)&&h.push(w,S,C),(p!==i-1||c<Math.PI)&&h.push(S,D,C)}this.setIndex(h),this.setAttribute("position",new Gt(g,3)),this.setAttribute("normal",new Gt(_,3)),this.setAttribute("uv",new Gt(m,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new n(e.radius,e.widthSegments,e.heightSegments,e.phiStart,e.phiLength,e.thetaStart,e.thetaLength)}};var Na=class n extends Kn{constructor(e=1,t=.4,i=12,r=48,s=Math.PI*2,o=0,a=Math.PI*2){super(),this.type="TorusGeometry",this.parameters={radius:e,tube:t,radialSegments:i,tubularSegments:r,arc:s,thetaStart:o,thetaLength:a},i=Math.floor(i),r=Math.floor(r);let c=[],l=[],u=[],d=[],f=new F,h=new F,g=new F;for(let _=0;_<=i;_++){let m=o+_/i*a;for(let p=0;p<=r;p++){let M=p/r*s;h.x=(e+t*Math.cos(m))*Math.cos(M),h.y=(e+t*Math.cos(m))*Math.sin(M),h.z=t*Math.sin(m),l.push(h.x,h.y,h.z),f.x=e*Math.cos(M),f.y=e*Math.sin(M),g.subVectors(h,f).normalize(),u.push(g.x,g.y,g.z),d.push(p/r),d.push(_/i)}}for(let _=1;_<=i;_++)for(let m=1;m<=r;m++){let p=(r+1)*_+m-1,M=(r+1)*(_-1)+m-1,w=(r+1)*(_-1)+m,S=(r+1)*_+m;c.push(p,M,S),c.push(M,w,S)}this.setIndex(c),this.setAttribute("position",new Gt(l,3)),this.setAttribute("normal",new Gt(u,3)),this.setAttribute("uv",new Gt(d,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new n(e.radius,e.tube,e.radialSegments,e.tubularSegments,e.arc)}};function lo(n){let e={};for(let t in n){e[t]={};for(let i in n[t]){let r=n[t][i];r&&(r.isColor||r.isMatrix3||r.isMatrix4||r.isVector2||r.isVector3||r.isVector4||r.isTexture||r.isQuaternion)?r.isRenderTargetTexture?(Fe("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),e[t][i]=null):e[t][i]=r.clone():Array.isArray(r)?e[t][i]=r.slice():e[t][i]=r}}return e}function Sn(n){let e={};for(let t=0;t<n.length;t++){let i=lo(n[t]);for(let r in i)e[r]=i[r]}return e}function SN(n){let e=[];for(let t=0;t<n.length;t++)e.push(n[t].clone());return e}function Qy(n){let e=n.getRenderTarget();return e===null?n.outputColorSpace:e.isXRRenderTarget===!0?e.texture.colorSpace:st.workingColorSpace}var LE={clone:lo,merge:Sn},EN=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,wN=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`,Qn=class extends as{constructor(e){super(),this.isShaderMaterial=!0,this.type="ShaderMaterial",this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=EN,this.fragmentShader=wN,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,e!==void 0&&this.setValues(e)}copy(e){return super.copy(e),this.fragmentShader=e.fragmentShader,this.vertexShader=e.vertexShader,this.uniforms=lo(e.uniforms),this.uniformsGroups=SN(e.uniformsGroups),this.defines=Object.assign({},e.defines),this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.fog=e.fog,this.lights=e.lights,this.clipping=e.clipping,this.extensions=Object.assign({},e.extensions),this.glslVersion=e.glslVersion,this.defaultAttributeValues=Object.assign({},e.defaultAttributeValues),this.index0AttributeName=e.index0AttributeName,this.uniformsNeedUpdate=e.uniformsNeedUpdate,this}toJSON(e){let t=super.toJSON(e);t.glslVersion=this.glslVersion,t.uniforms={};for(let r in this.uniforms){let o=this.uniforms[r].value;o&&o.isTexture?t.uniforms[r]={type:"t",value:o.toJSON(e).uuid}:o&&o.isColor?t.uniforms[r]={type:"c",value:o.getHex()}:o&&o.isVector2?t.uniforms[r]={type:"v2",value:o.toArray()}:o&&o.isVector3?t.uniforms[r]={type:"v3",value:o.toArray()}:o&&o.isVector4?t.uniforms[r]={type:"v4",value:o.toArray()}:o&&o.isMatrix3?t.uniforms[r]={type:"m3",value:o.toArray()}:o&&o.isMatrix4?t.uniforms[r]={type:"m4",value:o.toArray()}:t.uniforms[r]={value:o}}Object.keys(this.defines).length>0&&(t.defines=this.defines),t.vertexShader=this.vertexShader,t.fragmentShader=this.fragmentShader,t.lights=this.lights,t.clipping=this.clipping;let i={};for(let r in this.extensions)this.extensions[r]===!0&&(i[r]=!0);return Object.keys(i).length>0&&(t.extensions=i),t}},ih=class extends Qn{constructor(e){super(e),this.isRawShaderMaterial=!0,this.type="RawShaderMaterial"}},yl=class extends as{constructor(e){super(),this.isMeshStandardMaterial=!0,this.type="MeshStandardMaterial",this.defines={STANDARD:""},this.color=new ot(16777215),this.roughness=1,this.metalness=0,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new ot(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=Zy,this.normalScale=new rt(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.roughnessMap=null,this.metalnessMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new ss,this.envMapIntensity=1,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.defines={STANDARD:""},this.color.copy(e.color),this.roughness=e.roughness,this.metalness=e.metalness,this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.emissive.copy(e.emissive),this.emissiveMap=e.emissiveMap,this.emissiveIntensity=e.emissiveIntensity,this.bumpMap=e.bumpMap,this.bumpScale=e.bumpScale,this.normalMap=e.normalMap,this.normalMapType=e.normalMapType,this.normalScale.copy(e.normalScale),this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.roughnessMap=e.roughnessMap,this.metalnessMap=e.metalnessMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.envMapIntensity=e.envMapIntensity,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.flatShading=e.flatShading,this.fog=e.fog,this}};var rh=class extends as{constructor(e){super(),this.isMeshDepthMaterial=!0,this.type="MeshDepthMaterial",this.depthPacking=bE,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(e)}copy(e){return super.copy(e),this.depthPacking=e.depthPacking,this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this}},sh=class extends as{constructor(e){super(),this.isMeshDistanceMaterial=!0,this.type="MeshDistanceMaterial",this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(e)}copy(e){return super.copy(e),this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this}};function Of(n,e){return!n||n.constructor===e?n:typeof e.BYTES_PER_ELEMENT=="number"?new e(n):Array.prototype.slice.call(n)}var ls=class{constructor(e,t,i,r){this.parameterPositions=e,this._cachedIndex=0,this.resultBuffer=r!==void 0?r:new t.constructor(i),this.sampleValues=t,this.valueSize=i,this.settings=null,this.DefaultSettings_={}}evaluate(e){let t=this.parameterPositions,i=this._cachedIndex,r=t[i],s=t[i-1];n:{e:{let o;t:{i:if(!(e<r)){for(let a=i+2;;){if(r===void 0){if(e<s)break i;return i=t.length,this._cachedIndex=i,this.copySampleValue_(i-1)}if(i===a)break;if(s=r,r=t[++i],e<r)break e}o=t.length;break t}if(!(e>=s)){let a=t[1];e<a&&(i=2,s=a);for(let c=i-2;;){if(s===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(i===c)break;if(r=s,s=t[--i-1],e>=s)break e}o=i,i=0;break t}break n}for(;i<o;){let a=i+o>>>1;e<t[a]?o=a:i=a+1}if(r=t[i],s=t[i-1],s===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(r===void 0)return i=t.length,this._cachedIndex=i,this.copySampleValue_(i-1)}this._cachedIndex=i,this.intervalChanged_(i,s,r)}return this.interpolate_(i,s,e,r)}getSettings_(){return this.settings||this.DefaultSettings_}copySampleValue_(e){let t=this.resultBuffer,i=this.sampleValues,r=this.valueSize,s=e*r;for(let o=0;o!==r;++o)t[o]=i[s+o];return t}interpolate_(){throw new Error("call to abstract method")}intervalChanged_(){}},oh=class extends ls{constructor(e,t,i,r){super(e,t,i,r),this._weightPrev=-0,this._offsetPrev=-0,this._weightNext=-0,this._offsetNext=-0,this.DefaultSettings_={endingStart:by,endingEnd:by}}intervalChanged_(e,t,i){let r=this.parameterPositions,s=e-2,o=e+1,a=r[s],c=r[o];if(a===void 0)switch(this.getSettings_().endingStart){case Sy:s=e,a=2*t-i;break;case Ey:s=r.length-2,a=t+r[s]-r[s+1];break;default:s=e,a=i}if(c===void 0)switch(this.getSettings_().endingEnd){case Sy:o=e,c=2*i-t;break;case Ey:o=1,c=i+r[1]-r[0];break;default:o=e-1,c=t}let l=(i-t)*.5,u=this.valueSize;this._weightPrev=l/(t-a),this._weightNext=l/(c-i),this._offsetPrev=s*u,this._offsetNext=o*u}interpolate_(e,t,i,r){let s=this.resultBuffer,o=this.sampleValues,a=this.valueSize,c=e*a,l=c-a,u=this._offsetPrev,d=this._offsetNext,f=this._weightPrev,h=this._weightNext,g=(i-t)/(r-t),_=g*g,m=_*g,p=-f*m+2*f*_-f*g,M=(1+f)*m+(-1.5-2*f)*_+(-.5+f)*g+1,w=(-1-h)*m+(1.5+h)*_+.5*g,S=h*m-h*_;for(let D=0;D!==a;++D)s[D]=p*o[u+D]+M*o[l+D]+w*o[c+D]+S*o[d+D];return s}},ah=class extends ls{constructor(e,t,i,r){super(e,t,i,r)}interpolate_(e,t,i,r){let s=this.resultBuffer,o=this.sampleValues,a=this.valueSize,c=e*a,l=c-a,u=(i-t)/(r-t),d=1-u;for(let f=0;f!==a;++f)s[f]=o[l+f]*d+o[c+f]*u;return s}},ch=class extends ls{constructor(e,t,i,r){super(e,t,i,r)}interpolate_(e){return this.copySampleValue_(e-1)}},lh=class extends ls{interpolate_(e,t,i,r){let s=this.resultBuffer,o=this.sampleValues,a=this.valueSize,c=e*a,l=c-a,u=this.settings||this.DefaultSettings_,d=u.inTangents,f=u.outTangents;if(!d||!f){let _=(i-t)/(r-t),m=1-_;for(let p=0;p!==a;++p)s[p]=o[l+p]*m+o[c+p]*_;return s}let h=a*2,g=e-1;for(let _=0;_!==a;++_){let m=o[l+_],p=o[c+_],M=g*h+_*2,w=f[M],S=f[M+1],D=e*h+_*2,C=d[D],A=d[D+1],y=(i-t)/(r-t),b,j,T,O,k;for(let G=0;G<8;G++){b=y*y,j=b*y,T=1-y,O=T*T,k=O*T;let H=k*t+3*O*y*w+3*T*b*C+j*r-i;if(Math.abs(H)<1e-10)break;let L=3*O*(w-t)+6*T*y*(C-w)+3*b*(r-C);if(Math.abs(L)<1e-10)break;y=y-H/L,y=Math.max(0,Math.min(1,y))}s[_]=k*m+3*O*y*S+3*T*b*A+j*p}return s}},ei=class{constructor(e,t,i,r){if(e===void 0)throw new Error("THREE.KeyframeTrack: track name is undefined");if(t===void 0||t.length===0)throw new Error("THREE.KeyframeTrack: no keyframes in track named "+e);this.name=e,this.times=Of(t,this.TimeBufferType),this.values=Of(i,this.ValueBufferType),this.setInterpolation(r||this.DefaultInterpolation)}static toJSON(e){let t=e.constructor,i;if(t.toJSON!==this.toJSON)i=t.toJSON(e);else{i={name:e.name,times:Of(e.times,Array),values:Of(e.values,Array)};let r=e.getInterpolation();r!==e.DefaultInterpolation&&(i.interpolation=r)}return i.type=e.ValueTypeName,i}InterpolantFactoryMethodDiscrete(e){return new ch(this.times,this.values,this.getValueSize(),e)}InterpolantFactoryMethodLinear(e){return new ah(this.times,this.values,this.getValueSize(),e)}InterpolantFactoryMethodSmooth(e){return new oh(this.times,this.values,this.getValueSize(),e)}InterpolantFactoryMethodBezier(e){let t=new lh(this.times,this.values,this.getValueSize(),e);return this.settings&&(t.settings=this.settings),t}setInterpolation(e){let t;switch(e){case sl:t=this.InterpolantFactoryMethodDiscrete;break;case Yf:t=this.InterpolantFactoryMethodLinear;break;case kf:t=this.InterpolantFactoryMethodSmooth;break;case My:t=this.InterpolantFactoryMethodBezier;break}if(t===void 0){let i="unsupported interpolation for "+this.ValueTypeName+" keyframe track named "+this.name;if(this.createInterpolant===void 0)if(e!==this.DefaultInterpolation)this.setInterpolation(this.DefaultInterpolation);else throw new Error(i);return Fe("KeyframeTrack:",i),this}return this.createInterpolant=t,this}getInterpolation(){switch(this.createInterpolant){case this.InterpolantFactoryMethodDiscrete:return sl;case this.InterpolantFactoryMethodLinear:return Yf;case this.InterpolantFactoryMethodSmooth:return kf;case this.InterpolantFactoryMethodBezier:return My}}getValueSize(){return this.values.length/this.times.length}shift(e){if(e!==0){let t=this.times;for(let i=0,r=t.length;i!==r;++i)t[i]+=e}return this}scale(e){if(e!==1){let t=this.times;for(let i=0,r=t.length;i!==r;++i)t[i]*=e}return this}trim(e,t){let i=this.times,r=i.length,s=0,o=r-1;for(;s!==r&&i[s]<e;)++s;for(;o!==-1&&i[o]>t;)--o;if(++o,s!==0||o!==r){s>=o&&(o=Math.max(o,1),s=o-1);let a=this.getValueSize();this.times=i.slice(s,o),this.values=this.values.slice(s*a,o*a)}return this}validate(){let e=!0,t=this.getValueSize();t-Math.floor(t)!==0&&(Ne("KeyframeTrack: Invalid value size in track.",this),e=!1);let i=this.times,r=this.values,s=i.length;s===0&&(Ne("KeyframeTrack: Track is empty.",this),e=!1);let o=null;for(let a=0;a!==s;a++){let c=i[a];if(typeof c=="number"&&isNaN(c)){Ne("KeyframeTrack: Time is not a valid number.",this,a,c),e=!1;break}if(o!==null&&o>c){Ne("KeyframeTrack: Out of order keys.",this,a,c,o),e=!1;break}o=c}if(r!==void 0&&iN(r))for(let a=0,c=r.length;a!==c;++a){let l=r[a];if(isNaN(l)){Ne("KeyframeTrack: Value is not a valid number.",this,a,l),e=!1;break}}return e}optimize(){let e=this.times.slice(),t=this.values.slice(),i=this.getValueSize(),r=this.getInterpolation()===kf,s=e.length-1,o=1;for(let a=1;a<s;++a){let c=!1,l=e[a],u=e[a+1];if(l!==u&&(a!==1||l!==e[0]))if(r)c=!0;else{let d=a*i,f=d-i,h=d+i;for(let g=0;g!==i;++g){let _=t[d+g];if(_!==t[f+g]||_!==t[h+g]){c=!0;break}}}if(c){if(a!==o){e[o]=e[a];let d=a*i,f=o*i;for(let h=0;h!==i;++h)t[f+h]=t[d+h]}++o}}if(s>0){e[o]=e[s];for(let a=s*i,c=o*i,l=0;l!==i;++l)t[c+l]=t[a+l];++o}return o!==e.length?(this.times=e.slice(0,o),this.values=t.slice(0,o*i)):(this.times=e,this.values=t),this}clone(){let e=this.times.slice(),t=this.values.slice(),i=this.constructor,r=new i(this.name,e,t);return r.createInterpolant=this.createInterpolant,r}};ei.prototype.ValueTypeName="";ei.prototype.TimeBufferType=Float32Array;ei.prototype.ValueBufferType=Float32Array;ei.prototype.DefaultInterpolation=Yf;var us=class extends ei{constructor(e,t,i){super(e,t,i)}};us.prototype.ValueTypeName="bool";us.prototype.ValueBufferType=Array;us.prototype.DefaultInterpolation=sl;us.prototype.InterpolantFactoryMethodLinear=void 0;us.prototype.InterpolantFactoryMethodSmooth=void 0;var uh=class extends ei{constructor(e,t,i,r){super(e,t,i,r)}};uh.prototype.ValueTypeName="color";var dh=class extends ei{constructor(e,t,i,r){super(e,t,i,r)}};dh.prototype.ValueTypeName="number";var fh=class extends ls{constructor(e,t,i,r){super(e,t,i,r)}interpolate_(e,t,i,r){let s=this.resultBuffer,o=this.sampleValues,a=this.valueSize,c=(i-t)/(r-t),l=e*a;for(let u=l+a;l!==u;l+=4)fi.slerpFlat(s,0,o,l-a,o,l,c);return s}},_l=class extends ei{constructor(e,t,i,r){super(e,t,i,r)}InterpolantFactoryMethodLinear(e){return new fh(this.times,this.values,this.getValueSize(),e)}};_l.prototype.ValueTypeName="quaternion";_l.prototype.InterpolantFactoryMethodSmooth=void 0;var ds=class extends ei{constructor(e,t,i){super(e,t,i)}};ds.prototype.ValueTypeName="string";ds.prototype.ValueBufferType=Array;ds.prototype.DefaultInterpolation=sl;ds.prototype.InterpolantFactoryMethodLinear=void 0;ds.prototype.InterpolantFactoryMethodSmooth=void 0;var hh=class extends ei{constructor(e,t,i,r){super(e,t,i,r)}};hh.prototype.ValueTypeName="vector";var xl=class extends $i{constructor(e,t=1){super(),this.isLight=!0,this.type="Light",this.color=new ot(e),this.intensity=t}dispose(){this.dispatchEvent({type:"dispose"})}copy(e,t){return super.copy(e,t),this.color.copy(e.color),this.intensity=e.intensity,this}toJSON(e){let t=super.toJSON(e);return t.object.color=this.color.getHex(),t.object.intensity=this.intensity,t}};var _y=new Rt,$S=new F,qS=new F,Ty=class{constructor(e){this.camera=e,this.intensity=1,this.bias=0,this.biasNode=null,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new rt(512,512),this.mapType=Vn,this.map=null,this.mapPass=null,this.matrix=new Rt,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new Ia,this._frameExtents=new rt(1,1),this._viewportCount=1,this._viewports=[new Ft(0,0,1,1)]}getViewportCount(){return this._viewportCount}getFrustum(){return this._frustum}updateMatrices(e){let t=this.camera,i=this.matrix;$S.setFromMatrixPosition(e.matrixWorld),t.position.copy($S),qS.setFromMatrixPosition(e.target.matrixWorld),t.lookAt(qS),t.updateMatrixWorld(),_y.multiplyMatrices(t.projectionMatrix,t.matrixWorldInverse),this._frustum.setFromProjectionMatrix(_y,t.coordinateSystem,t.reversedDepth),t.coordinateSystem===Sa||t.reversedDepth?i.set(.5,0,0,.5,0,.5,0,.5,0,0,1,0,0,0,0,1):i.set(.5,0,0,.5,0,.5,0,.5,0,0,.5,.5,0,0,0,1),i.multiply(_y)}getViewport(e){return this._viewports[e]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(e){return this.camera=e.camera.clone(),this.intensity=e.intensity,this.bias=e.bias,this.radius=e.radius,this.autoUpdate=e.autoUpdate,this.needsUpdate=e.needsUpdate,this.normalBias=e.normalBias,this.blurSamples=e.blurSamples,this.mapSize.copy(e.mapSize),this.biasNode=e.biasNode,this}clone(){return new this.constructor().copy(this)}toJSON(){let e={};return this.intensity!==1&&(e.intensity=this.intensity),this.bias!==0&&(e.bias=this.bias),this.normalBias!==0&&(e.normalBias=this.normalBias),this.radius!==1&&(e.radius=this.radius),(this.mapSize.x!==512||this.mapSize.y!==512)&&(e.mapSize=this.mapSize.toArray()),e.camera=this.camera.toJSON(!1).object,delete e.camera.matrix,e}},Lf=new F,Ff=new fi,zi=new F,Ml=class extends $i{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new Rt,this.projectionMatrix=new Rt,this.projectionMatrixInverse=new Rt,this.coordinateSystem=Ri,this._reversedDepth=!1}get reversedDepth(){return this._reversedDepth}copy(e,t){return super.copy(e,t),this.matrixWorldInverse.copy(e.matrixWorldInverse),this.projectionMatrix.copy(e.projectionMatrix),this.projectionMatrixInverse.copy(e.projectionMatrixInverse),this.coordinateSystem=e.coordinateSystem,this}getWorldDirection(e){return super.getWorldDirection(e).negate()}updateMatrixWorld(e){super.updateMatrixWorld(e),this.matrixWorld.decompose(Lf,Ff,zi),zi.x===1&&zi.y===1&&zi.z===1?this.matrixWorldInverse.copy(this.matrixWorld).invert():this.matrixWorldInverse.compose(Lf,Ff,zi.set(1,1,1)).invert()}updateWorldMatrix(e,t){super.updateWorldMatrix(e,t),this.matrixWorld.decompose(Lf,Ff,zi),zi.x===1&&zi.y===1&&zi.z===1?this.matrixWorldInverse.copy(this.matrixWorld).invert():this.matrixWorldInverse.compose(Lf,Ff,zi.set(1,1,1)).invert()}clone(){return new this.constructor().copy(this)}},ns=new F,XS=new rt,YS=new rt,bn=class extends Ml{constructor(e=50,t=1,i=.1,r=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=e,this.zoom=1,this.near=i,this.far=r,this.focus=10,this.aspect=t,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.fov=e.fov,this.zoom=e.zoom,this.near=e.near,this.far=e.far,this.focus=e.focus,this.aspect=e.aspect,this.view=e.view===null?null:Object.assign({},e.view),this.filmGauge=e.filmGauge,this.filmOffset=e.filmOffset,this}setFocalLength(e){let t=.5*this.getFilmHeight()/e;this.fov=Zf*2*Math.atan(t),this.updateProjectionMatrix()}getFocalLength(){let e=Math.tan(Zv*.5*this.fov);return .5*this.getFilmHeight()/e}getEffectiveFOV(){return Zf*2*Math.atan(Math.tan(Zv*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(e,t,i){ns.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),t.set(ns.x,ns.y).multiplyScalar(-e/ns.z),ns.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),i.set(ns.x,ns.y).multiplyScalar(-e/ns.z)}getViewSize(e,t){return this.getViewBounds(e,XS,YS),t.subVectors(YS,XS)}setViewOffset(e,t,i,r,s,o){this.aspect=e/t,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=i,this.view.offsetY=r,this.view.width=s,this.view.height=o,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){let e=this.near,t=e*Math.tan(Zv*.5*this.fov)/this.zoom,i=2*t,r=this.aspect*i,s=-.5*r,o=this.view;if(this.view!==null&&this.view.enabled){let c=o.fullWidth,l=o.fullHeight;s+=o.offsetX*r/c,t-=o.offsetY*i/l,r*=o.width/c,i*=o.height/l}let a=this.filmOffset;a!==0&&(s+=e*a/this.getFilmWidth()),this.projectionMatrix.makePerspective(s,s+r,t,t-i,e,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){let t=super.toJSON(e);return t.object.fov=this.fov,t.object.zoom=this.zoom,t.object.near=this.near,t.object.far=this.far,t.object.focus=this.focus,t.object.aspect=this.aspect,this.view!==null&&(t.object.view=Object.assign({},this.view)),t.object.filmGauge=this.filmGauge,t.object.filmOffset=this.filmOffset,t}};var Pa=class extends Ml{constructor(e=-1,t=1,i=1,r=-1,s=.1,o=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=e,this.right=t,this.top=i,this.bottom=r,this.near=s,this.far=o,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.left=e.left,this.right=e.right,this.top=e.top,this.bottom=e.bottom,this.near=e.near,this.far=e.far,this.zoom=e.zoom,this.view=e.view===null?null:Object.assign({},e.view),this}setViewOffset(e,t,i,r,s,o){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=i,this.view.offsetY=r,this.view.width=s,this.view.height=o,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){let e=(this.right-this.left)/(2*this.zoom),t=(this.top-this.bottom)/(2*this.zoom),i=(this.right+this.left)/2,r=(this.top+this.bottom)/2,s=i-e,o=i+e,a=r+t,c=r-t;if(this.view!==null&&this.view.enabled){let l=(this.right-this.left)/this.view.fullWidth/this.zoom,u=(this.top-this.bottom)/this.view.fullHeight/this.zoom;s+=l*this.view.offsetX,o=s+l*this.view.width,a-=u*this.view.offsetY,c=a-u*this.view.height}this.projectionMatrix.makeOrthographic(s,o,a,c,this.near,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){let t=super.toJSON(e);return t.object.zoom=this.zoom,t.object.left=this.left,t.object.right=this.right,t.object.top=this.top,t.object.bottom=this.bottom,t.object.near=this.near,t.object.far=this.far,this.view!==null&&(t.object.view=Object.assign({},this.view)),t}},Dy=class extends Ty{constructor(){super(new Pa(-5,5,5,-5,.5,500)),this.isDirectionalLightShadow=!0}},bl=class extends xl{constructor(e,t){super(e,t),this.isDirectionalLight=!0,this.type="DirectionalLight",this.position.copy($i.DEFAULT_UP),this.updateMatrix(),this.target=new $i,this.shadow=new Dy}dispose(){super.dispose(),this.shadow.dispose()}copy(e){return super.copy(e),this.target=e.target.clone(),this.shadow=e.shadow.clone(),this}toJSON(e){let t=super.toJSON(e);return t.object.shadow=this.shadow.toJSON(),t.object.target=this.target.uuid,t}},Sl=class extends xl{constructor(e,t){super(e,t),this.isAmbientLight=!0,this.type="AmbientLight"}};var xa=-90,Ma=1,ph=class extends $i{constructor(e,t,i){super(),this.type="CubeCamera",this.renderTarget=i,this.coordinateSystem=null,this.activeMipmapLevel=0;let r=new bn(xa,Ma,e,t);r.layers=this.layers,this.add(r);let s=new bn(xa,Ma,e,t);s.layers=this.layers,this.add(s);let o=new bn(xa,Ma,e,t);o.layers=this.layers,this.add(o);let a=new bn(xa,Ma,e,t);a.layers=this.layers,this.add(a);let c=new bn(xa,Ma,e,t);c.layers=this.layers,this.add(c);let l=new bn(xa,Ma,e,t);l.layers=this.layers,this.add(l)}updateCoordinateSystem(){let e=this.coordinateSystem,t=this.children.concat(),[i,r,s,o,a,c]=t;for(let l of t)this.remove(l);if(e===Ri)i.up.set(0,1,0),i.lookAt(1,0,0),r.up.set(0,1,0),r.lookAt(-1,0,0),s.up.set(0,0,-1),s.lookAt(0,1,0),o.up.set(0,0,1),o.lookAt(0,-1,0),a.up.set(0,1,0),a.lookAt(0,0,1),c.up.set(0,1,0),c.lookAt(0,0,-1);else if(e===Sa)i.up.set(0,-1,0),i.lookAt(-1,0,0),r.up.set(0,-1,0),r.lookAt(1,0,0),s.up.set(0,0,1),s.lookAt(0,1,0),o.up.set(0,0,-1),o.lookAt(0,-1,0),a.up.set(0,-1,0),a.lookAt(0,0,1),c.up.set(0,-1,0),c.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+e);for(let l of t)this.add(l),l.updateMatrixWorld()}update(e,t){this.parent===null&&this.updateMatrixWorld();let{renderTarget:i,activeMipmapLevel:r}=this;this.coordinateSystem!==e.coordinateSystem&&(this.coordinateSystem=e.coordinateSystem,this.updateCoordinateSystem());let[s,o,a,c,l,u]=this.children,d=e.getRenderTarget(),f=e.getActiveCubeFace(),h=e.getActiveMipmapLevel(),g=e.xr.enabled;e.xr.enabled=!1;let _=i.texture.generateMipmaps;i.texture.generateMipmaps=!1;let m=!1;e.isWebGLRenderer===!0?m=e.state.buffers.depth.getReversed():m=e.reversedDepthBuffer,e.setRenderTarget(i,0,r),m&&e.autoClear===!1&&e.clearDepth(),e.render(t,s),e.setRenderTarget(i,1,r),m&&e.autoClear===!1&&e.clearDepth(),e.render(t,o),e.setRenderTarget(i,2,r),m&&e.autoClear===!1&&e.clearDepth(),e.render(t,a),e.setRenderTarget(i,3,r),m&&e.autoClear===!1&&e.clearDepth(),e.render(t,c),e.setRenderTarget(i,4,r),m&&e.autoClear===!1&&e.clearDepth(),e.render(t,l),i.texture.generateMipmaps=_,e.setRenderTarget(i,5,r),m&&e.autoClear===!1&&e.clearDepth(),e.render(t,u),e.setRenderTarget(d,f,h),e.xr.enabled=g,i.texture.needsPMREMUpdate=!0}},mh=class extends bn{constructor(e=[]){super(),this.isArrayCamera=!0,this.isMultiViewCamera=!1,this.cameras=e}};var e_="\\[\\]\\.:\\/",CN=new RegExp("["+e_+"]","g"),t_="[^"+e_+"]",TN="[^"+e_.replace("\\.","")+"]",DN=/((?:WC+[\/:])*)/.source.replace("WC",t_),IN=/(WCOD+)?/.source.replace("WCOD",TN),AN=/(?:\.(WC+)(?:\[(.+)\])?)?/.source.replace("WC",t_),RN=/\.(WC+)(?:\[(.+)\])?/.source.replace("WC",t_),NN=new RegExp("^"+DN+IN+AN+RN+"$"),PN=["material","materials","bones","map"],Iy=class{constructor(e,t,i){let r=i||Ut.parseTrackName(t);this._targetGroup=e,this._bindings=e.subscribe_(t,r)}getValue(e,t){this.bind();let i=this._targetGroup.nCachedObjects_,r=this._bindings[i];r!==void 0&&r.getValue(e,t)}setValue(e,t){let i=this._bindings;for(let r=this._targetGroup.nCachedObjects_,s=i.length;r!==s;++r)i[r].setValue(e,t)}bind(){let e=this._bindings;for(let t=this._targetGroup.nCachedObjects_,i=e.length;t!==i;++t)e[t].bind()}unbind(){let e=this._bindings;for(let t=this._targetGroup.nCachedObjects_,i=e.length;t!==i;++t)e[t].unbind()}},Ut=(()=>{class n{constructor(t,i,r){this.path=i,this.parsedPath=r||n.parseTrackName(i),this.node=n.findNode(t,this.parsedPath.nodeName),this.rootNode=t,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}static create(t,i,r){return t&&t.isAnimationObjectGroup?new n.Composite(t,i,r):new n(t,i,r)}static sanitizeNodeName(t){return t.replace(/\s/g,"_").replace(CN,"")}static parseTrackName(t){let i=NN.exec(t);if(i===null)throw new Error("PropertyBinding: Cannot parse trackName: "+t);let r={nodeName:i[2],objectName:i[3],objectIndex:i[4],propertyName:i[5],propertyIndex:i[6]},s=r.nodeName&&r.nodeName.lastIndexOf(".");if(s!==void 0&&s!==-1){let o=r.nodeName.substring(s+1);PN.indexOf(o)!==-1&&(r.nodeName=r.nodeName.substring(0,s),r.objectName=o)}if(r.propertyName===null||r.propertyName.length===0)throw new Error("PropertyBinding: can not parse propertyName from trackName: "+t);return r}static findNode(t,i){if(i===void 0||i===""||i==="."||i===-1||i===t.name||i===t.uuid)return t;if(t.skeleton){let r=t.skeleton.getBoneByName(i);if(r!==void 0)return r}if(t.children){let r=function(o){for(let a=0;a<o.length;a++){let c=o[a];if(c.name===i||c.uuid===i)return c;let l=r(c.children);if(l)return l}return null},s=r(t.children);if(s)return s}return null}_getValue_unavailable(){}_setValue_unavailable(){}_getValue_direct(t,i){t[i]=this.targetObject[this.propertyName]}_getValue_array(t,i){let r=this.resolvedProperty;for(let s=0,o=r.length;s!==o;++s)t[i++]=r[s]}_getValue_arrayElement(t,i){t[i]=this.resolvedProperty[this.propertyIndex]}_getValue_toArray(t,i){this.resolvedProperty.toArray(t,i)}_setValue_direct(t,i){this.targetObject[this.propertyName]=t[i]}_setValue_direct_setNeedsUpdate(t,i){this.targetObject[this.propertyName]=t[i],this.targetObject.needsUpdate=!0}_setValue_direct_setMatrixWorldNeedsUpdate(t,i){this.targetObject[this.propertyName]=t[i],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_array(t,i){let r=this.resolvedProperty;for(let s=0,o=r.length;s!==o;++s)r[s]=t[i++]}_setValue_array_setNeedsUpdate(t,i){let r=this.resolvedProperty;for(let s=0,o=r.length;s!==o;++s)r[s]=t[i++];this.targetObject.needsUpdate=!0}_setValue_array_setMatrixWorldNeedsUpdate(t,i){let r=this.resolvedProperty;for(let s=0,o=r.length;s!==o;++s)r[s]=t[i++];this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_arrayElement(t,i){this.resolvedProperty[this.propertyIndex]=t[i]}_setValue_arrayElement_setNeedsUpdate(t,i){this.resolvedProperty[this.propertyIndex]=t[i],this.targetObject.needsUpdate=!0}_setValue_arrayElement_setMatrixWorldNeedsUpdate(t,i){this.resolvedProperty[this.propertyIndex]=t[i],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_fromArray(t,i){this.resolvedProperty.fromArray(t,i)}_setValue_fromArray_setNeedsUpdate(t,i){this.resolvedProperty.fromArray(t,i),this.targetObject.needsUpdate=!0}_setValue_fromArray_setMatrixWorldNeedsUpdate(t,i){this.resolvedProperty.fromArray(t,i),this.targetObject.matrixWorldNeedsUpdate=!0}_getValue_unbound(t,i){this.bind(),this.getValue(t,i)}_setValue_unbound(t,i){this.bind(),this.setValue(t,i)}bind(){let t=this.node,i=this.parsedPath,r=i.objectName,s=i.propertyName,o=i.propertyIndex;if(t||(t=n.findNode(this.rootNode,i.nodeName),this.node=t),this.getValue=this._getValue_unavailable,this.setValue=this._setValue_unavailable,!t){Fe("PropertyBinding: No target node found for track: "+this.path+".");return}if(r){let u=i.objectIndex;switch(r){case"materials":if(!t.material){Ne("PropertyBinding: Can not bind to material as node does not have a material.",this);return}if(!t.material.materials){Ne("PropertyBinding: Can not bind to material.materials as node.material does not have a materials array.",this);return}t=t.material.materials;break;case"bones":if(!t.skeleton){Ne("PropertyBinding: Can not bind to bones as node does not have a skeleton.",this);return}t=t.skeleton.bones;for(let d=0;d<t.length;d++)if(t[d].name===u){u=d;break}break;case"map":if("map"in t){t=t.map;break}if(!t.material){Ne("PropertyBinding: Can not bind to material as node does not have a material.",this);return}if(!t.material.map){Ne("PropertyBinding: Can not bind to material.map as node.material does not have a map.",this);return}t=t.material.map;break;default:if(t[r]===void 0){Ne("PropertyBinding: Can not bind to objectName of node undefined.",this);return}t=t[r]}if(u!==void 0){if(t[u]===void 0){Ne("PropertyBinding: Trying to bind to objectIndex of objectName, but is undefined.",this,t);return}t=t[u]}}let a=t[s];if(a===void 0){let u=i.nodeName;Ne("PropertyBinding: Trying to update property for track: "+u+"."+s+" but it wasn't found.",t);return}let c=this.Versioning.None;this.targetObject=t,t.isMaterial===!0?c=this.Versioning.NeedsUpdate:t.isObject3D===!0&&(c=this.Versioning.MatrixWorldNeedsUpdate);let l=this.BindingType.Direct;if(o!==void 0){if(s==="morphTargetInfluences"){if(!t.geometry){Ne("PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.",this);return}if(!t.geometry.morphAttributes){Ne("PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.morphAttributes.",this);return}t.morphTargetDictionary[o]!==void 0&&(o=t.morphTargetDictionary[o])}l=this.BindingType.ArrayElement,this.resolvedProperty=a,this.propertyIndex=o}else a.fromArray!==void 0&&a.toArray!==void 0?(l=this.BindingType.HasFromToArray,this.resolvedProperty=a):Array.isArray(a)?(l=this.BindingType.EntireArray,this.resolvedProperty=a):this.propertyName=s;this.getValue=this.GetterByBindingType[l],this.setValue=this.SetterByBindingTypeAndVersioning[l][c]}unbind(){this.node=null,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}}return n.Composite=Iy,n})();Ut.prototype.BindingType={Direct:0,EntireArray:1,ArrayElement:2,HasFromToArray:3};Ut.prototype.Versioning={None:0,NeedsUpdate:1,MatrixWorldNeedsUpdate:2};Ut.prototype.GetterByBindingType=[Ut.prototype._getValue_direct,Ut.prototype._getValue_array,Ut.prototype._getValue_arrayElement,Ut.prototype._getValue_toArray];Ut.prototype.SetterByBindingTypeAndVersioning=[[Ut.prototype._setValue_direct,Ut.prototype._setValue_direct_setNeedsUpdate,Ut.prototype._setValue_direct_setMatrixWorldNeedsUpdate],[Ut.prototype._setValue_array,Ut.prototype._setValue_array_setNeedsUpdate,Ut.prototype._setValue_array_setMatrixWorldNeedsUpdate],[Ut.prototype._setValue_arrayElement,Ut.prototype._setValue_arrayElement_setNeedsUpdate,Ut.prototype._setValue_arrayElement_setMatrixWorldNeedsUpdate],[Ut.prototype._setValue_fromArray,Ut.prototype._setValue_fromArray_setNeedsUpdate,Ut.prototype._setValue_fromArray_setMatrixWorldNeedsUpdate]];var Kq=new Float32Array(1);var ZS=new Rt,Oa=class{constructor(e,t,i=0,r=1/0){this.ray=new hl(e,t),this.near=i,this.far=r,this.camera=null,this.layers=new Ca,this.params={Mesh:{},Line:{threshold:1},LOD:{},Points:{threshold:1},Sprite:{}}}set(e,t){this.ray.set(e,t)}setFromCamera(e,t){t.isPerspectiveCamera?(this.ray.origin.setFromMatrixPosition(t.matrixWorld),this.ray.direction.set(e.x,e.y,.5).unproject(t).sub(this.ray.origin).normalize(),this.camera=t):t.isOrthographicCamera?(this.ray.origin.set(e.x,e.y,(t.near+t.far)/(t.near-t.far)).unproject(t),this.ray.direction.set(0,0,-1).transformDirection(t.matrixWorld),this.camera=t):Ne("Raycaster: Unsupported camera type: "+t.type)}setFromXRController(e){return ZS.identity().extractRotation(e.matrixWorld),this.ray.origin.setFromMatrixPosition(e.matrixWorld),this.ray.direction.set(0,0,-1).applyMatrix4(ZS),this}intersectObject(e,t=!0,i=[]){return Ay(e,this,i,t),i.sort(JS),i}intersectObjects(e,t=!0,i=[]){for(let r=0,s=e.length;r<s;r++)Ay(e[r],this,i,t);return i.sort(JS),i}};function JS(n,e){return n.distance-e.distance}function Ay(n,e,t,i){let r=!0;if(n.layers.test(e.layers)&&n.raycast(e,t)===!1&&(r=!1),r===!0&&i===!0){let s=n.children;for(let o=0,a=s.length;o<a;o++)Ay(s[o],e,t,!0)}}function n_(n,e,t,i){let r=ON(i);switch(t){case qy:return n*e;case Yy:return n*e/r.components*r.byteLength;case bh:return n*e/r.components*r.byteLength;case co:return n*e*2/r.components*r.byteLength;case Sh:return n*e*2/r.components*r.byteLength;case Xy:return n*e*3/r.components*r.byteLength;case hi:return n*e*4/r.components*r.byteLength;case Eh:return n*e*4/r.components*r.byteLength;case Tl:case Dl:return Math.floor((n+3)/4)*Math.floor((e+3)/4)*8;case Il:case Al:return Math.floor((n+3)/4)*Math.floor((e+3)/4)*16;case Ch:case Dh:return Math.max(n,16)*Math.max(e,8)/4;case wh:case Th:return Math.max(n,8)*Math.max(e,8)/2;case Ih:case Ah:case Nh:case Ph:return Math.floor((n+3)/4)*Math.floor((e+3)/4)*8;case Rh:case Oh:case Lh:return Math.floor((n+3)/4)*Math.floor((e+3)/4)*16;case Fh:return Math.floor((n+3)/4)*Math.floor((e+3)/4)*16;case kh:return Math.floor((n+4)/5)*Math.floor((e+3)/4)*16;case Uh:return Math.floor((n+4)/5)*Math.floor((e+4)/5)*16;case Bh:return Math.floor((n+5)/6)*Math.floor((e+4)/5)*16;case Vh:return Math.floor((n+5)/6)*Math.floor((e+5)/6)*16;case Hh:return Math.floor((n+7)/8)*Math.floor((e+4)/5)*16;case zh:return Math.floor((n+7)/8)*Math.floor((e+5)/6)*16;case Gh:return Math.floor((n+7)/8)*Math.floor((e+7)/8)*16;case jh:return Math.floor((n+9)/10)*Math.floor((e+4)/5)*16;case Wh:return Math.floor((n+9)/10)*Math.floor((e+5)/6)*16;case $h:return Math.floor((n+9)/10)*Math.floor((e+7)/8)*16;case qh:return Math.floor((n+9)/10)*Math.floor((e+9)/10)*16;case Xh:return Math.floor((n+11)/12)*Math.floor((e+9)/10)*16;case Yh:return Math.floor((n+11)/12)*Math.floor((e+11)/12)*16;case Zh:case Jh:case Kh:return Math.ceil(n/4)*Math.ceil(e/4)*16;case Qh:case ep:return Math.ceil(n/4)*Math.ceil(e/4)*8;case tp:case np:return Math.ceil(n/4)*Math.ceil(e/4)*16}throw new Error(`Unable to determine texture byte length for ${t} format.`)}function ON(n){switch(n){case Vn:case Gy:return{byteLength:1,components:1};case Fa:case jy:case Zi:return{byteLength:2,components:1};case xh:case Mh:return{byteLength:2,components:4};case Pi:case _h:case Oi:return{byteLength:4,components:1};case Wy:case $y:return{byteLength:4,components:3}}throw new Error(`Unknown texture type ${n}.`)}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:"183"}}));typeof window<"u"&&(window.__THREE__?Fe("WARNING: Multiple instances of Three.js being imported."):window.__THREE__="183");function rw(){let n=null,e=!1,t=null,i=null;function r(s,o){t(s,o),i=n.requestAnimationFrame(r)}return{start:function(){e!==!0&&t!==null&&(i=n.requestAnimationFrame(r),e=!0)},stop:function(){n.cancelAnimationFrame(i),e=!1},setAnimationLoop:function(s){t=s},setContext:function(s){n=s}}}function FN(n){let e=new WeakMap;function t(a,c){let l=a.array,u=a.usage,d=l.byteLength,f=n.createBuffer();n.bindBuffer(c,f),n.bufferData(c,l,u),a.onUploadCallback();let h;if(l instanceof Float32Array)h=n.FLOAT;else if(typeof Float16Array<"u"&&l instanceof Float16Array)h=n.HALF_FLOAT;else if(l instanceof Uint16Array)a.isFloat16BufferAttribute?h=n.HALF_FLOAT:h=n.UNSIGNED_SHORT;else if(l instanceof Int16Array)h=n.SHORT;else if(l instanceof Uint32Array)h=n.UNSIGNED_INT;else if(l instanceof Int32Array)h=n.INT;else if(l instanceof Int8Array)h=n.BYTE;else if(l instanceof Uint8Array)h=n.UNSIGNED_BYTE;else if(l instanceof Uint8ClampedArray)h=n.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+l);return{buffer:f,type:h,bytesPerElement:l.BYTES_PER_ELEMENT,version:a.version,size:d}}function i(a,c,l){let u=c.array,d=c.updateRanges;if(n.bindBuffer(l,a),d.length===0)n.bufferSubData(l,0,u);else{d.sort((h,g)=>h.start-g.start);let f=0;for(let h=1;h<d.length;h++){let g=d[f],_=d[h];_.start<=g.start+g.count+1?g.count=Math.max(g.count,_.start+_.count-g.start):(++f,d[f]=_)}d.length=f+1;for(let h=0,g=d.length;h<g;h++){let _=d[h];n.bufferSubData(l,_.start*u.BYTES_PER_ELEMENT,u,_.start,_.count)}c.clearUpdateRanges()}c.onUploadCallback()}function r(a){return a.isInterleavedBufferAttribute&&(a=a.data),e.get(a)}function s(a){a.isInterleavedBufferAttribute&&(a=a.data);let c=e.get(a);c&&(n.deleteBuffer(c.buffer),e.delete(a))}function o(a,c){if(a.isInterleavedBufferAttribute&&(a=a.data),a.isGLBufferAttribute){let u=e.get(a);(!u||u.version<a.version)&&e.set(a,{buffer:a.buffer,type:a.type,bytesPerElement:a.elementSize,version:a.version});return}let l=e.get(a);if(l===void 0)e.set(a,t(a,c));else if(l.version<a.version){if(l.size!==a.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");i(l.buffer,a,c),l.version=a.version}}return{get:r,remove:s,update:o}}var kN=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,UN=`#ifdef USE_ALPHAHASH
	const float ALPHA_HASH_SCALE = 0.05;
	float hash2D( vec2 value ) {
		return fract( 1.0e4 * sin( 17.0 * value.x + 0.1 * value.y ) * ( 0.1 + abs( sin( 13.0 * value.y + value.x ) ) ) );
	}
	float hash3D( vec3 value ) {
		return hash2D( vec2( hash2D( value.xy ), value.z ) );
	}
	float getAlphaHashThreshold( vec3 position ) {
		float maxDeriv = max(
			length( dFdx( position.xyz ) ),
			length( dFdy( position.xyz ) )
		);
		float pixScale = 1.0 / ( ALPHA_HASH_SCALE * maxDeriv );
		vec2 pixScales = vec2(
			exp2( floor( log2( pixScale ) ) ),
			exp2( ceil( log2( pixScale ) ) )
		);
		vec2 alpha = vec2(
			hash3D( floor( pixScales.x * position.xyz ) ),
			hash3D( floor( pixScales.y * position.xyz ) )
		);
		float lerpFactor = fract( log2( pixScale ) );
		float x = ( 1.0 - lerpFactor ) * alpha.x + lerpFactor * alpha.y;
		float a = min( lerpFactor, 1.0 - lerpFactor );
		vec3 cases = vec3(
			x * x / ( 2.0 * a * ( 1.0 - a ) ),
			( x - 0.5 * a ) / ( 1.0 - a ),
			1.0 - ( ( 1.0 - x ) * ( 1.0 - x ) / ( 2.0 * a * ( 1.0 - a ) ) )
		);
		float threshold = ( x < ( 1.0 - a ) )
			? ( ( x < a ) ? cases.x : cases.y )
			: cases.z;
		return clamp( threshold , 1.0e-6, 1.0 );
	}
#endif`,BN=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,VN=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,HN=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,zN=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,GN=`#ifdef USE_AOMAP
	float ambientOcclusion = ( texture2D( aoMap, vAoMapUv ).r - 1.0 ) * aoMapIntensity + 1.0;
	reflectedLight.indirectDiffuse *= ambientOcclusion;
	#if defined( USE_CLEARCOAT ) 
		clearcoatSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_SHEEN ) 
		sheenSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD )
		float dotNV = saturate( dot( geometryNormal, geometryViewDir ) );
		reflectedLight.indirectSpecular *= computeSpecularOcclusion( dotNV, ambientOcclusion, material.roughness );
	#endif
#endif`,jN=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,WN=`#ifdef USE_BATCHING
	#if ! defined( GL_ANGLE_multi_draw )
	#define gl_DrawID _gl_DrawID
	uniform int _gl_DrawID;
	#endif
	uniform highp sampler2D batchingTexture;
	uniform highp usampler2D batchingIdTexture;
	mat4 getBatchingMatrix( const in float i ) {
		int size = textureSize( batchingTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( batchingTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( batchingTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( batchingTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( batchingTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
	float getIndirectIndex( const in int i ) {
		int size = textureSize( batchingIdTexture, 0 ).x;
		int x = i % size;
		int y = i / size;
		return float( texelFetch( batchingIdTexture, ivec2( x, y ), 0 ).r );
	}
#endif
#ifdef USE_BATCHING_COLOR
	uniform sampler2D batchingColorTexture;
	vec4 getBatchingColor( const in float i ) {
		int size = textureSize( batchingColorTexture, 0 ).x;
		int j = int( i );
		int x = j % size;
		int y = j / size;
		return texelFetch( batchingColorTexture, ivec2( x, y ), 0 );
	}
#endif`,$N=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,qN=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,XN=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,YN=`float G_BlinnPhong_Implicit( ) {
	return 0.25;
}
float D_BlinnPhong( const in float shininess, const in float dotNH ) {
	return RECIPROCAL_PI * ( shininess * 0.5 + 1.0 ) * pow( dotNH, shininess );
}
vec3 BRDF_BlinnPhong( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in vec3 specularColor, const in float shininess ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( specularColor, 1.0, dotVH );
	float G = G_BlinnPhong_Implicit( );
	float D = D_BlinnPhong( shininess, dotNH );
	return F * ( G * D );
} // validated`,ZN=`#ifdef USE_IRIDESCENCE
	const mat3 XYZ_TO_REC709 = mat3(
		 3.2404542, -0.9692660,  0.0556434,
		-1.5371385,  1.8760108, -0.2040259,
		-0.4985314,  0.0415560,  1.0572252
	);
	vec3 Fresnel0ToIor( vec3 fresnel0 ) {
		vec3 sqrtF0 = sqrt( fresnel0 );
		return ( vec3( 1.0 ) + sqrtF0 ) / ( vec3( 1.0 ) - sqrtF0 );
	}
	vec3 IorToFresnel0( vec3 transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - vec3( incidentIor ) ) / ( transmittedIor + vec3( incidentIor ) ) );
	}
	float IorToFresnel0( float transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - incidentIor ) / ( transmittedIor + incidentIor ));
	}
	vec3 evalSensitivity( float OPD, vec3 shift ) {
		float phase = 2.0 * PI * OPD * 1.0e-9;
		vec3 val = vec3( 5.4856e-13, 4.4201e-13, 5.2481e-13 );
		vec3 pos = vec3( 1.6810e+06, 1.7953e+06, 2.2084e+06 );
		vec3 var = vec3( 4.3278e+09, 9.3046e+09, 6.6121e+09 );
		vec3 xyz = val * sqrt( 2.0 * PI * var ) * cos( pos * phase + shift ) * exp( - pow2( phase ) * var );
		xyz.x += 9.7470e-14 * sqrt( 2.0 * PI * 4.5282e+09 ) * cos( 2.2399e+06 * phase + shift[ 0 ] ) * exp( - 4.5282e+09 * pow2( phase ) );
		xyz /= 1.0685e-7;
		vec3 rgb = XYZ_TO_REC709 * xyz;
		return rgb;
	}
	vec3 evalIridescence( float outsideIOR, float eta2, float cosTheta1, float thinFilmThickness, vec3 baseF0 ) {
		vec3 I;
		float iridescenceIOR = mix( outsideIOR, eta2, smoothstep( 0.0, 0.03, thinFilmThickness ) );
		float sinTheta2Sq = pow2( outsideIOR / iridescenceIOR ) * ( 1.0 - pow2( cosTheta1 ) );
		float cosTheta2Sq = 1.0 - sinTheta2Sq;
		if ( cosTheta2Sq < 0.0 ) {
			return vec3( 1.0 );
		}
		float cosTheta2 = sqrt( cosTheta2Sq );
		float R0 = IorToFresnel0( iridescenceIOR, outsideIOR );
		float R12 = F_Schlick( R0, 1.0, cosTheta1 );
		float T121 = 1.0 - R12;
		float phi12 = 0.0;
		if ( iridescenceIOR < outsideIOR ) phi12 = PI;
		float phi21 = PI - phi12;
		vec3 baseIOR = Fresnel0ToIor( clamp( baseF0, 0.0, 0.9999 ) );		vec3 R1 = IorToFresnel0( baseIOR, iridescenceIOR );
		vec3 R23 = F_Schlick( R1, 1.0, cosTheta2 );
		vec3 phi23 = vec3( 0.0 );
		if ( baseIOR[ 0 ] < iridescenceIOR ) phi23[ 0 ] = PI;
		if ( baseIOR[ 1 ] < iridescenceIOR ) phi23[ 1 ] = PI;
		if ( baseIOR[ 2 ] < iridescenceIOR ) phi23[ 2 ] = PI;
		float OPD = 2.0 * iridescenceIOR * thinFilmThickness * cosTheta2;
		vec3 phi = vec3( phi21 ) + phi23;
		vec3 R123 = clamp( R12 * R23, 1e-5, 0.9999 );
		vec3 r123 = sqrt( R123 );
		vec3 Rs = pow2( T121 ) * R23 / ( vec3( 1.0 ) - R123 );
		vec3 C0 = R12 + Rs;
		I = C0;
		vec3 Cm = Rs - T121;
		for ( int m = 1; m <= 2; ++ m ) {
			Cm *= r123;
			vec3 Sm = 2.0 * evalSensitivity( float( m ) * OPD, float( m ) * phi );
			I += Cm * Sm;
		}
		return max( I, vec3( 0.0 ) );
	}
#endif`,JN=`#ifdef USE_BUMPMAP
	uniform sampler2D bumpMap;
	uniform float bumpScale;
	vec2 dHdxy_fwd() {
		vec2 dSTdx = dFdx( vBumpMapUv );
		vec2 dSTdy = dFdy( vBumpMapUv );
		float Hll = bumpScale * texture2D( bumpMap, vBumpMapUv ).x;
		float dBx = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdx ).x - Hll;
		float dBy = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdy ).x - Hll;
		return vec2( dBx, dBy );
	}
	vec3 perturbNormalArb( vec3 surf_pos, vec3 surf_norm, vec2 dHdxy, float faceDirection ) {
		vec3 vSigmaX = normalize( dFdx( surf_pos.xyz ) );
		vec3 vSigmaY = normalize( dFdy( surf_pos.xyz ) );
		vec3 vN = surf_norm;
		vec3 R1 = cross( vSigmaY, vN );
		vec3 R2 = cross( vN, vSigmaX );
		float fDet = dot( vSigmaX, R1 ) * faceDirection;
		vec3 vGrad = sign( fDet ) * ( dHdxy.x * R1 + dHdxy.y * R2 );
		return normalize( abs( fDet ) * surf_norm - vGrad );
	}
#endif`,KN=`#if NUM_CLIPPING_PLANES > 0
	vec4 plane;
	#ifdef ALPHA_TO_COVERAGE
		float distanceToPlane, distanceGradient;
		float clipOpacity = 1.0;
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
			distanceGradient = fwidth( distanceToPlane ) / 2.0;
			clipOpacity *= smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			if ( clipOpacity == 0.0 ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			float unionClipOpacity = 1.0;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
				distanceGradient = fwidth( distanceToPlane ) / 2.0;
				unionClipOpacity *= 1.0 - smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			}
			#pragma unroll_loop_end
			clipOpacity *= 1.0 - unionClipOpacity;
		#endif
		diffuseColor.a *= clipOpacity;
		if ( diffuseColor.a == 0.0 ) discard;
	#else
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			if ( dot( vClipPosition, plane.xyz ) > plane.w ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			bool clipped = true;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				clipped = ( dot( vClipPosition, plane.xyz ) > plane.w ) && clipped;
			}
			#pragma unroll_loop_end
			if ( clipped ) discard;
		#endif
	#endif
#endif`,QN=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,eP=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,tP=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,nP=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#endif`,iP=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#endif`,rP=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec4 vColor;
#endif`,sP=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	vColor = vec4( 1.0 );
#endif
#ifdef USE_COLOR_ALPHA
	vColor *= color;
#elif defined( USE_COLOR )
	vColor.rgb *= color;
#endif
#ifdef USE_INSTANCING_COLOR
	vColor.rgb *= instanceColor.rgb;
#endif
#ifdef USE_BATCHING_COLOR
	vColor *= getBatchingColor( getIndirectIndex( gl_DrawID ) );
#endif`,oP=`#define PI 3.141592653589793
#define PI2 6.283185307179586
#define PI_HALF 1.5707963267948966
#define RECIPROCAL_PI 0.3183098861837907
#define RECIPROCAL_PI2 0.15915494309189535
#define EPSILON 1e-6
#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
#define whiteComplement( a ) ( 1.0 - saturate( a ) )
float pow2( const in float x ) { return x*x; }
vec3 pow2( const in vec3 x ) { return x*x; }
float pow3( const in float x ) { return x*x*x; }
float pow4( const in float x ) { float x2 = x*x; return x2*x2; }
float max3( const in vec3 v ) { return max( max( v.x, v.y ), v.z ); }
float average( const in vec3 v ) { return dot( v, vec3( 0.3333333 ) ); }
highp float rand( const in vec2 uv ) {
	const highp float a = 12.9898, b = 78.233, c = 43758.5453;
	highp float dt = dot( uv.xy, vec2( a,b ) ), sn = mod( dt, PI );
	return fract( sin( sn ) * c );
}
#ifdef HIGH_PRECISION
	float precisionSafeLength( vec3 v ) { return length( v ); }
#else
	float precisionSafeLength( vec3 v ) {
		float maxComponent = max3( abs( v ) );
		return length( v / maxComponent ) * maxComponent;
	}
#endif
struct IncidentLight {
	vec3 color;
	vec3 direction;
	bool visible;
};
struct ReflectedLight {
	vec3 directDiffuse;
	vec3 directSpecular;
	vec3 indirectDiffuse;
	vec3 indirectSpecular;
};
#ifdef USE_ALPHAHASH
	varying vec3 vPosition;
#endif
vec3 transformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );
}
vec3 inverseTransformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( vec4( dir, 0.0 ) * matrix ).xyz );
}
bool isPerspectiveMatrix( mat4 m ) {
	return m[ 2 ][ 3 ] == - 1.0;
}
vec2 equirectUv( in vec3 dir ) {
	float u = atan( dir.z, dir.x ) * RECIPROCAL_PI2 + 0.5;
	float v = asin( clamp( dir.y, - 1.0, 1.0 ) ) * RECIPROCAL_PI + 0.5;
	return vec2( u, v );
}
vec3 BRDF_Lambert( const in vec3 diffuseColor ) {
	return RECIPROCAL_PI * diffuseColor;
}
vec3 F_Schlick( const in vec3 f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
}
float F_Schlick( const in float f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
} // validated`,aP=`#ifdef ENVMAP_TYPE_CUBE_UV
	#define cubeUV_minMipLevel 4.0
	#define cubeUV_minTileSize 16.0
	float getFace( vec3 direction ) {
		vec3 absDirection = abs( direction );
		float face = - 1.0;
		if ( absDirection.x > absDirection.z ) {
			if ( absDirection.x > absDirection.y )
				face = direction.x > 0.0 ? 0.0 : 3.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		} else {
			if ( absDirection.z > absDirection.y )
				face = direction.z > 0.0 ? 2.0 : 5.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		}
		return face;
	}
	vec2 getUV( vec3 direction, float face ) {
		vec2 uv;
		if ( face == 0.0 ) {
			uv = vec2( direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 1.0 ) {
			uv = vec2( - direction.x, - direction.z ) / abs( direction.y );
		} else if ( face == 2.0 ) {
			uv = vec2( - direction.x, direction.y ) / abs( direction.z );
		} else if ( face == 3.0 ) {
			uv = vec2( - direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 4.0 ) {
			uv = vec2( - direction.x, direction.z ) / abs( direction.y );
		} else {
			uv = vec2( direction.x, direction.y ) / abs( direction.z );
		}
		return 0.5 * ( uv + 1.0 );
	}
	vec3 bilinearCubeUV( sampler2D envMap, vec3 direction, float mipInt ) {
		float face = getFace( direction );
		float filterInt = max( cubeUV_minMipLevel - mipInt, 0.0 );
		mipInt = max( mipInt, cubeUV_minMipLevel );
		float faceSize = exp2( mipInt );
		highp vec2 uv = getUV( direction, face ) * ( faceSize - 2.0 ) + 1.0;
		if ( face > 2.0 ) {
			uv.y += faceSize;
			face -= 3.0;
		}
		uv.x += face * faceSize;
		uv.x += filterInt * 3.0 * cubeUV_minTileSize;
		uv.y += 4.0 * ( exp2( CUBEUV_MAX_MIP ) - faceSize );
		uv.x *= CUBEUV_TEXEL_WIDTH;
		uv.y *= CUBEUV_TEXEL_HEIGHT;
		#ifdef texture2DGradEXT
			return texture2DGradEXT( envMap, uv, vec2( 0.0 ), vec2( 0.0 ) ).rgb;
		#else
			return texture2D( envMap, uv ).rgb;
		#endif
	}
	#define cubeUV_r0 1.0
	#define cubeUV_m0 - 2.0
	#define cubeUV_r1 0.8
	#define cubeUV_m1 - 1.0
	#define cubeUV_r4 0.4
	#define cubeUV_m4 2.0
	#define cubeUV_r5 0.305
	#define cubeUV_m5 3.0
	#define cubeUV_r6 0.21
	#define cubeUV_m6 4.0
	float roughnessToMip( float roughness ) {
		float mip = 0.0;
		if ( roughness >= cubeUV_r1 ) {
			mip = ( cubeUV_r0 - roughness ) * ( cubeUV_m1 - cubeUV_m0 ) / ( cubeUV_r0 - cubeUV_r1 ) + cubeUV_m0;
		} else if ( roughness >= cubeUV_r4 ) {
			mip = ( cubeUV_r1 - roughness ) * ( cubeUV_m4 - cubeUV_m1 ) / ( cubeUV_r1 - cubeUV_r4 ) + cubeUV_m1;
		} else if ( roughness >= cubeUV_r5 ) {
			mip = ( cubeUV_r4 - roughness ) * ( cubeUV_m5 - cubeUV_m4 ) / ( cubeUV_r4 - cubeUV_r5 ) + cubeUV_m4;
		} else if ( roughness >= cubeUV_r6 ) {
			mip = ( cubeUV_r5 - roughness ) * ( cubeUV_m6 - cubeUV_m5 ) / ( cubeUV_r5 - cubeUV_r6 ) + cubeUV_m5;
		} else {
			mip = - 2.0 * log2( 1.16 * roughness );		}
		return mip;
	}
	vec4 textureCubeUV( sampler2D envMap, vec3 sampleDir, float roughness ) {
		float mip = clamp( roughnessToMip( roughness ), cubeUV_m0, CUBEUV_MAX_MIP );
		float mipF = fract( mip );
		float mipInt = floor( mip );
		vec3 color0 = bilinearCubeUV( envMap, sampleDir, mipInt );
		if ( mipF == 0.0 ) {
			return vec4( color0, 1.0 );
		} else {
			vec3 color1 = bilinearCubeUV( envMap, sampleDir, mipInt + 1.0 );
			return vec4( mix( color0, color1, mipF ), 1.0 );
		}
	}
#endif`,cP=`vec3 transformedNormal = objectNormal;
#ifdef USE_TANGENT
	vec3 transformedTangent = objectTangent;
#endif
#ifdef USE_BATCHING
	mat3 bm = mat3( batchingMatrix );
	transformedNormal /= vec3( dot( bm[ 0 ], bm[ 0 ] ), dot( bm[ 1 ], bm[ 1 ] ), dot( bm[ 2 ], bm[ 2 ] ) );
	transformedNormal = bm * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = bm * transformedTangent;
	#endif
#endif
#ifdef USE_INSTANCING
	mat3 im = mat3( instanceMatrix );
	transformedNormal /= vec3( dot( im[ 0 ], im[ 0 ] ), dot( im[ 1 ], im[ 1 ] ), dot( im[ 2 ], im[ 2 ] ) );
	transformedNormal = im * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = im * transformedTangent;
	#endif
#endif
transformedNormal = normalMatrix * transformedNormal;
#ifdef FLIP_SIDED
	transformedNormal = - transformedNormal;
#endif
#ifdef USE_TANGENT
	transformedTangent = ( modelViewMatrix * vec4( transformedTangent, 0.0 ) ).xyz;
	#ifdef FLIP_SIDED
		transformedTangent = - transformedTangent;
	#endif
#endif`,lP=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,uP=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,dP=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE
		emissiveColor = sRGBTransferEOTF( emissiveColor );
	#endif
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,fP=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,hP="gl_FragColor = linearToOutputTexel( gl_FragColor );",pP=`vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferEOTF( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,mP=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vec3 cameraToFrag;
		if ( isOrthographic ) {
			cameraToFrag = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToFrag = normalize( vWorldPosition - cameraPosition );
		}
		vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vec3 reflectVec = reflect( cameraToFrag, worldNormal );
		#else
			vec3 reflectVec = refract( cameraToFrag, worldNormal, refractionRatio );
		#endif
	#else
		vec3 reflectVec = vReflect;
	#endif
	#ifdef ENVMAP_TYPE_CUBE
		vec4 envColor = textureCube( envMap, envMapRotation * vec3( flipEnvMap * reflectVec.x, reflectVec.yz ) );
		#ifdef ENVMAP_BLENDING_MULTIPLY
			outgoingLight = mix( outgoingLight, outgoingLight * envColor.xyz, specularStrength * reflectivity );
		#elif defined( ENVMAP_BLENDING_MIX )
			outgoingLight = mix( outgoingLight, envColor.xyz, specularStrength * reflectivity );
		#elif defined( ENVMAP_BLENDING_ADD )
			outgoingLight += envColor.xyz * specularStrength * reflectivity;
		#endif
	#endif
#endif`,gP=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform float flipEnvMap;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
#endif`,vP=`#ifdef USE_ENVMAP
	uniform float reflectivity;
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		varying vec3 vWorldPosition;
		uniform float refractionRatio;
	#else
		varying vec3 vReflect;
	#endif
#endif`,yP=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,_P=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vWorldPosition = worldPosition.xyz;
	#else
		vec3 cameraToVertex;
		if ( isOrthographic ) {
			cameraToVertex = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToVertex = normalize( worldPosition.xyz - cameraPosition );
		}
		vec3 worldNormal = inverseTransformDirection( transformedNormal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vReflect = reflect( cameraToVertex, worldNormal );
		#else
			vReflect = refract( cameraToVertex, worldNormal, refractionRatio );
		#endif
	#endif
#endif`,xP=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,MP=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,bP=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,SP=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,EP=`#ifdef USE_GRADIENTMAP
	uniform sampler2D gradientMap;
#endif
vec3 getGradientIrradiance( vec3 normal, vec3 lightDirection ) {
	float dotNL = dot( normal, lightDirection );
	vec2 coord = vec2( dotNL * 0.5 + 0.5, 0.0 );
	#ifdef USE_GRADIENTMAP
		return vec3( texture2D( gradientMap, coord ).r );
	#else
		vec2 fw = fwidth( coord ) * 0.5;
		return mix( vec3( 0.7 ), vec3( 1.0 ), smoothstep( 0.7 - fw.x, 0.7 + fw.x, coord.x ) );
	#endif
}`,wP=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,CP=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,TP=`varying vec3 vViewPosition;
struct LambertMaterial {
	vec3 diffuseColor;
	float specularStrength;
};
void RE_Direct_Lambert( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Lambert( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Lambert
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,DP=`uniform bool receiveShadow;
uniform vec3 ambientLightColor;
#if defined( USE_LIGHT_PROBES )
	uniform vec3 lightProbe[ 9 ];
#endif
vec3 shGetIrradianceAt( in vec3 normal, in vec3 shCoefficients[ 9 ] ) {
	float x = normal.x, y = normal.y, z = normal.z;
	vec3 result = shCoefficients[ 0 ] * 0.886227;
	result += shCoefficients[ 1 ] * 2.0 * 0.511664 * y;
	result += shCoefficients[ 2 ] * 2.0 * 0.511664 * z;
	result += shCoefficients[ 3 ] * 2.0 * 0.511664 * x;
	result += shCoefficients[ 4 ] * 2.0 * 0.429043 * x * y;
	result += shCoefficients[ 5 ] * 2.0 * 0.429043 * y * z;
	result += shCoefficients[ 6 ] * ( 0.743125 * z * z - 0.247708 );
	result += shCoefficients[ 7 ] * 2.0 * 0.429043 * x * z;
	result += shCoefficients[ 8 ] * 0.429043 * ( x * x - y * y );
	return result;
}
vec3 getLightProbeIrradiance( const in vec3 lightProbe[ 9 ], const in vec3 normal ) {
	vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
	vec3 irradiance = shGetIrradianceAt( worldNormal, lightProbe );
	return irradiance;
}
vec3 getAmbientLightIrradiance( const in vec3 ambientLightColor ) {
	vec3 irradiance = ambientLightColor;
	return irradiance;
}
float getDistanceAttenuation( const in float lightDistance, const in float cutoffDistance, const in float decayExponent ) {
	float distanceFalloff = 1.0 / max( pow( lightDistance, decayExponent ), 0.01 );
	if ( cutoffDistance > 0.0 ) {
		distanceFalloff *= pow2( saturate( 1.0 - pow4( lightDistance / cutoffDistance ) ) );
	}
	return distanceFalloff;
}
float getSpotAttenuation( const in float coneCosine, const in float penumbraCosine, const in float angleCosine ) {
	return smoothstep( coneCosine, penumbraCosine, angleCosine );
}
#if NUM_DIR_LIGHTS > 0
	struct DirectionalLight {
		vec3 direction;
		vec3 color;
	};
	uniform DirectionalLight directionalLights[ NUM_DIR_LIGHTS ];
	void getDirectionalLightInfo( const in DirectionalLight directionalLight, out IncidentLight light ) {
		light.color = directionalLight.color;
		light.direction = directionalLight.direction;
		light.visible = true;
	}
#endif
#if NUM_POINT_LIGHTS > 0
	struct PointLight {
		vec3 position;
		vec3 color;
		float distance;
		float decay;
	};
	uniform PointLight pointLights[ NUM_POINT_LIGHTS ];
	void getPointLightInfo( const in PointLight pointLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = pointLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float lightDistance = length( lVector );
		light.color = pointLight.color;
		light.color *= getDistanceAttenuation( lightDistance, pointLight.distance, pointLight.decay );
		light.visible = ( light.color != vec3( 0.0 ) );
	}
#endif
#if NUM_SPOT_LIGHTS > 0
	struct SpotLight {
		vec3 position;
		vec3 direction;
		vec3 color;
		float distance;
		float decay;
		float coneCos;
		float penumbraCos;
	};
	uniform SpotLight spotLights[ NUM_SPOT_LIGHTS ];
	void getSpotLightInfo( const in SpotLight spotLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = spotLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float angleCos = dot( light.direction, spotLight.direction );
		float spotAttenuation = getSpotAttenuation( spotLight.coneCos, spotLight.penumbraCos, angleCos );
		if ( spotAttenuation > 0.0 ) {
			float lightDistance = length( lVector );
			light.color = spotLight.color * spotAttenuation;
			light.color *= getDistanceAttenuation( lightDistance, spotLight.distance, spotLight.decay );
			light.visible = ( light.color != vec3( 0.0 ) );
		} else {
			light.color = vec3( 0.0 );
			light.visible = false;
		}
	}
#endif
#if NUM_RECT_AREA_LIGHTS > 0
	struct RectAreaLight {
		vec3 color;
		vec3 position;
		vec3 halfWidth;
		vec3 halfHeight;
	};
	uniform sampler2D ltc_1;	uniform sampler2D ltc_2;
	uniform RectAreaLight rectAreaLights[ NUM_RECT_AREA_LIGHTS ];
#endif
#if NUM_HEMI_LIGHTS > 0
	struct HemisphereLight {
		vec3 direction;
		vec3 skyColor;
		vec3 groundColor;
	};
	uniform HemisphereLight hemisphereLights[ NUM_HEMI_LIGHTS ];
	vec3 getHemisphereLightIrradiance( const in HemisphereLight hemiLight, const in vec3 normal ) {
		float dotNL = dot( normal, hemiLight.direction );
		float hemiDiffuseWeight = 0.5 * dotNL + 0.5;
		vec3 irradiance = mix( hemiLight.groundColor, hemiLight.skyColor, hemiDiffuseWeight );
		return irradiance;
	}
#endif`,IP=`#ifdef USE_ENVMAP
	vec3 getIBLIrradiance( const in vec3 normal ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * worldNormal, 1.0 );
			return PI * envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	vec3 getIBLRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 reflectVec = reflect( - viewDir, normal );
			reflectVec = normalize( mix( reflectVec, normal, pow4( roughness ) ) );
			reflectVec = inverseTransformDirection( reflectVec, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * reflectVec, roughness );
			return envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	#ifdef USE_ANISOTROPY
		vec3 getIBLAnisotropyRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness, const in vec3 bitangent, const in float anisotropy ) {
			#ifdef ENVMAP_TYPE_CUBE_UV
				vec3 bentNormal = cross( bitangent, viewDir );
				bentNormal = normalize( cross( bentNormal, bitangent ) );
				bentNormal = normalize( mix( bentNormal, normal, pow2( pow2( 1.0 - anisotropy * ( 1.0 - roughness ) ) ) ) );
				return getIBLRadiance( viewDir, bentNormal, roughness );
			#else
				return vec3( 0.0 );
			#endif
		}
	#endif
#endif`,AP=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,RP=`varying vec3 vViewPosition;
struct ToonMaterial {
	vec3 diffuseColor;
};
void RE_Direct_Toon( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	vec3 irradiance = getGradientIrradiance( geometryNormal, directLight.direction ) * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Toon( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Toon
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,NP=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,PP=`varying vec3 vViewPosition;
struct BlinnPhongMaterial {
	vec3 diffuseColor;
	vec3 specularColor;
	float specularShininess;
	float specularStrength;
};
void RE_Direct_BlinnPhong( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
	reflectedLight.directSpecular += irradiance * BRDF_BlinnPhong( directLight.direction, geometryViewDir, geometryNormal, material.specularColor, material.specularShininess ) * material.specularStrength;
}
void RE_IndirectDiffuse_BlinnPhong( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_BlinnPhong
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,OP=`PhysicalMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.diffuseContribution = diffuseColor.rgb * ( 1.0 - metalnessFactor );
material.metalness = metalnessFactor;
vec3 dxy = max( abs( dFdx( nonPerturbedNormal ) ), abs( dFdy( nonPerturbedNormal ) ) );
float geometryRoughness = max( max( dxy.x, dxy.y ), dxy.z );
material.roughness = max( roughnessFactor, 0.0525 );material.roughness += geometryRoughness;
material.roughness = min( material.roughness, 1.0 );
#ifdef IOR
	material.ior = ior;
	#ifdef USE_SPECULAR
		float specularIntensityFactor = specularIntensity;
		vec3 specularColorFactor = specularColor;
		#ifdef USE_SPECULAR_COLORMAP
			specularColorFactor *= texture2D( specularColorMap, vSpecularColorMapUv ).rgb;
		#endif
		#ifdef USE_SPECULAR_INTENSITYMAP
			specularIntensityFactor *= texture2D( specularIntensityMap, vSpecularIntensityMapUv ).a;
		#endif
		material.specularF90 = mix( specularIntensityFactor, 1.0, metalnessFactor );
	#else
		float specularIntensityFactor = 1.0;
		vec3 specularColorFactor = vec3( 1.0 );
		material.specularF90 = 1.0;
	#endif
	material.specularColor = min( pow2( ( material.ior - 1.0 ) / ( material.ior + 1.0 ) ) * specularColorFactor, vec3( 1.0 ) ) * specularIntensityFactor;
	material.specularColorBlended = mix( material.specularColor, diffuseColor.rgb, metalnessFactor );
#else
	material.specularColor = vec3( 0.04 );
	material.specularColorBlended = mix( material.specularColor, diffuseColor.rgb, metalnessFactor );
	material.specularF90 = 1.0;
#endif
#ifdef USE_CLEARCOAT
	material.clearcoat = clearcoat;
	material.clearcoatRoughness = clearcoatRoughness;
	material.clearcoatF0 = vec3( 0.04 );
	material.clearcoatF90 = 1.0;
	#ifdef USE_CLEARCOATMAP
		material.clearcoat *= texture2D( clearcoatMap, vClearcoatMapUv ).x;
	#endif
	#ifdef USE_CLEARCOAT_ROUGHNESSMAP
		material.clearcoatRoughness *= texture2D( clearcoatRoughnessMap, vClearcoatRoughnessMapUv ).y;
	#endif
	material.clearcoat = saturate( material.clearcoat );	material.clearcoatRoughness = max( material.clearcoatRoughness, 0.0525 );
	material.clearcoatRoughness += geometryRoughness;
	material.clearcoatRoughness = min( material.clearcoatRoughness, 1.0 );
#endif
#ifdef USE_DISPERSION
	material.dispersion = dispersion;
#endif
#ifdef USE_IRIDESCENCE
	material.iridescence = iridescence;
	material.iridescenceIOR = iridescenceIOR;
	#ifdef USE_IRIDESCENCEMAP
		material.iridescence *= texture2D( iridescenceMap, vIridescenceMapUv ).r;
	#endif
	#ifdef USE_IRIDESCENCE_THICKNESSMAP
		material.iridescenceThickness = (iridescenceThicknessMaximum - iridescenceThicknessMinimum) * texture2D( iridescenceThicknessMap, vIridescenceThicknessMapUv ).g + iridescenceThicknessMinimum;
	#else
		material.iridescenceThickness = iridescenceThicknessMaximum;
	#endif
#endif
#ifdef USE_SHEEN
	material.sheenColor = sheenColor;
	#ifdef USE_SHEEN_COLORMAP
		material.sheenColor *= texture2D( sheenColorMap, vSheenColorMapUv ).rgb;
	#endif
	material.sheenRoughness = clamp( sheenRoughness, 0.0001, 1.0 );
	#ifdef USE_SHEEN_ROUGHNESSMAP
		material.sheenRoughness *= texture2D( sheenRoughnessMap, vSheenRoughnessMapUv ).a;
	#endif
#endif
#ifdef USE_ANISOTROPY
	#ifdef USE_ANISOTROPYMAP
		mat2 anisotropyMat = mat2( anisotropyVector.x, anisotropyVector.y, - anisotropyVector.y, anisotropyVector.x );
		vec3 anisotropyPolar = texture2D( anisotropyMap, vAnisotropyMapUv ).rgb;
		vec2 anisotropyV = anisotropyMat * normalize( 2.0 * anisotropyPolar.rg - vec2( 1.0 ) ) * anisotropyPolar.b;
	#else
		vec2 anisotropyV = anisotropyVector;
	#endif
	material.anisotropy = length( anisotropyV );
	if( material.anisotropy == 0.0 ) {
		anisotropyV = vec2( 1.0, 0.0 );
	} else {
		anisotropyV /= material.anisotropy;
		material.anisotropy = saturate( material.anisotropy );
	}
	material.alphaT = mix( pow2( material.roughness ), 1.0, pow2( material.anisotropy ) );
	material.anisotropyT = tbn[ 0 ] * anisotropyV.x + tbn[ 1 ] * anisotropyV.y;
	material.anisotropyB = tbn[ 1 ] * anisotropyV.x - tbn[ 0 ] * anisotropyV.y;
#endif`,LP=`uniform sampler2D dfgLUT;
struct PhysicalMaterial {
	vec3 diffuseColor;
	vec3 diffuseContribution;
	vec3 specularColor;
	vec3 specularColorBlended;
	float roughness;
	float metalness;
	float specularF90;
	float dispersion;
	#ifdef USE_CLEARCOAT
		float clearcoat;
		float clearcoatRoughness;
		vec3 clearcoatF0;
		float clearcoatF90;
	#endif
	#ifdef USE_IRIDESCENCE
		float iridescence;
		float iridescenceIOR;
		float iridescenceThickness;
		vec3 iridescenceFresnel;
		vec3 iridescenceF0;
		vec3 iridescenceFresnelDielectric;
		vec3 iridescenceFresnelMetallic;
	#endif
	#ifdef USE_SHEEN
		vec3 sheenColor;
		float sheenRoughness;
	#endif
	#ifdef IOR
		float ior;
	#endif
	#ifdef USE_TRANSMISSION
		float transmission;
		float transmissionAlpha;
		float thickness;
		float attenuationDistance;
		vec3 attenuationColor;
	#endif
	#ifdef USE_ANISOTROPY
		float anisotropy;
		float alphaT;
		vec3 anisotropyT;
		vec3 anisotropyB;
	#endif
};
vec3 clearcoatSpecularDirect = vec3( 0.0 );
vec3 clearcoatSpecularIndirect = vec3( 0.0 );
vec3 sheenSpecularDirect = vec3( 0.0 );
vec3 sheenSpecularIndirect = vec3(0.0 );
vec3 Schlick_to_F0( const in vec3 f, const in float f90, const in float dotVH ) {
    float x = clamp( 1.0 - dotVH, 0.0, 1.0 );
    float x2 = x * x;
    float x5 = clamp( x * x2 * x2, 0.0, 0.9999 );
    return ( f - vec3( f90 ) * x5 ) / ( 1.0 - x5 );
}
float V_GGX_SmithCorrelated( const in float alpha, const in float dotNL, const in float dotNV ) {
	float a2 = pow2( alpha );
	float gv = dotNL * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNV ) );
	float gl = dotNV * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNL ) );
	return 0.5 / max( gv + gl, EPSILON );
}
float D_GGX( const in float alpha, const in float dotNH ) {
	float a2 = pow2( alpha );
	float denom = pow2( dotNH ) * ( a2 - 1.0 ) + 1.0;
	return RECIPROCAL_PI * a2 / pow2( denom );
}
#ifdef USE_ANISOTROPY
	float V_GGX_SmithCorrelated_Anisotropic( const in float alphaT, const in float alphaB, const in float dotTV, const in float dotBV, const in float dotTL, const in float dotBL, const in float dotNV, const in float dotNL ) {
		float gv = dotNL * length( vec3( alphaT * dotTV, alphaB * dotBV, dotNV ) );
		float gl = dotNV * length( vec3( alphaT * dotTL, alphaB * dotBL, dotNL ) );
		float v = 0.5 / ( gv + gl );
		return v;
	}
	float D_GGX_Anisotropic( const in float alphaT, const in float alphaB, const in float dotNH, const in float dotTH, const in float dotBH ) {
		float a2 = alphaT * alphaB;
		highp vec3 v = vec3( alphaB * dotTH, alphaT * dotBH, a2 * dotNH );
		highp float v2 = dot( v, v );
		float w2 = a2 / v2;
		return RECIPROCAL_PI * a2 * pow2 ( w2 );
	}
#endif
#ifdef USE_CLEARCOAT
	vec3 BRDF_GGX_Clearcoat( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material) {
		vec3 f0 = material.clearcoatF0;
		float f90 = material.clearcoatF90;
		float roughness = material.clearcoatRoughness;
		float alpha = pow2( roughness );
		vec3 halfDir = normalize( lightDir + viewDir );
		float dotNL = saturate( dot( normal, lightDir ) );
		float dotNV = saturate( dot( normal, viewDir ) );
		float dotNH = saturate( dot( normal, halfDir ) );
		float dotVH = saturate( dot( viewDir, halfDir ) );
		vec3 F = F_Schlick( f0, f90, dotVH );
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
		return F * ( V * D );
	}
#endif
vec3 BRDF_GGX( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material ) {
	vec3 f0 = material.specularColorBlended;
	float f90 = material.specularF90;
	float roughness = material.roughness;
	float alpha = pow2( roughness );
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( f0, f90, dotVH );
	#ifdef USE_IRIDESCENCE
		F = mix( F, material.iridescenceFresnel, material.iridescence );
	#endif
	#ifdef USE_ANISOTROPY
		float dotTL = dot( material.anisotropyT, lightDir );
		float dotTV = dot( material.anisotropyT, viewDir );
		float dotTH = dot( material.anisotropyT, halfDir );
		float dotBL = dot( material.anisotropyB, lightDir );
		float dotBV = dot( material.anisotropyB, viewDir );
		float dotBH = dot( material.anisotropyB, halfDir );
		float V = V_GGX_SmithCorrelated_Anisotropic( material.alphaT, alpha, dotTV, dotBV, dotTL, dotBL, dotNV, dotNL );
		float D = D_GGX_Anisotropic( material.alphaT, alpha, dotNH, dotTH, dotBH );
	#else
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
	#endif
	return F * ( V * D );
}
vec2 LTC_Uv( const in vec3 N, const in vec3 V, const in float roughness ) {
	const float LUT_SIZE = 64.0;
	const float LUT_SCALE = ( LUT_SIZE - 1.0 ) / LUT_SIZE;
	const float LUT_BIAS = 0.5 / LUT_SIZE;
	float dotNV = saturate( dot( N, V ) );
	vec2 uv = vec2( roughness, sqrt( 1.0 - dotNV ) );
	uv = uv * LUT_SCALE + LUT_BIAS;
	return uv;
}
float LTC_ClippedSphereFormFactor( const in vec3 f ) {
	float l = length( f );
	return max( ( l * l + f.z ) / ( l + 1.0 ), 0.0 );
}
vec3 LTC_EdgeVectorFormFactor( const in vec3 v1, const in vec3 v2 ) {
	float x = dot( v1, v2 );
	float y = abs( x );
	float a = 0.8543985 + ( 0.4965155 + 0.0145206 * y ) * y;
	float b = 3.4175940 + ( 4.1616724 + y ) * y;
	float v = a / b;
	float theta_sintheta = ( x > 0.0 ) ? v : 0.5 * inversesqrt( max( 1.0 - x * x, 1e-7 ) ) - v;
	return cross( v1, v2 ) * theta_sintheta;
}
vec3 LTC_Evaluate( const in vec3 N, const in vec3 V, const in vec3 P, const in mat3 mInv, const in vec3 rectCoords[ 4 ] ) {
	vec3 v1 = rectCoords[ 1 ] - rectCoords[ 0 ];
	vec3 v2 = rectCoords[ 3 ] - rectCoords[ 0 ];
	vec3 lightNormal = cross( v1, v2 );
	if( dot( lightNormal, P - rectCoords[ 0 ] ) < 0.0 ) return vec3( 0.0 );
	vec3 T1, T2;
	T1 = normalize( V - N * dot( V, N ) );
	T2 = - cross( N, T1 );
	mat3 mat = mInv * transpose( mat3( T1, T2, N ) );
	vec3 coords[ 4 ];
	coords[ 0 ] = mat * ( rectCoords[ 0 ] - P );
	coords[ 1 ] = mat * ( rectCoords[ 1 ] - P );
	coords[ 2 ] = mat * ( rectCoords[ 2 ] - P );
	coords[ 3 ] = mat * ( rectCoords[ 3 ] - P );
	coords[ 0 ] = normalize( coords[ 0 ] );
	coords[ 1 ] = normalize( coords[ 1 ] );
	coords[ 2 ] = normalize( coords[ 2 ] );
	coords[ 3 ] = normalize( coords[ 3 ] );
	vec3 vectorFormFactor = vec3( 0.0 );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 0 ], coords[ 1 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 1 ], coords[ 2 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 2 ], coords[ 3 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 3 ], coords[ 0 ] );
	float result = LTC_ClippedSphereFormFactor( vectorFormFactor );
	return vec3( result );
}
#if defined( USE_SHEEN )
float D_Charlie( float roughness, float dotNH ) {
	float alpha = pow2( roughness );
	float invAlpha = 1.0 / alpha;
	float cos2h = dotNH * dotNH;
	float sin2h = max( 1.0 - cos2h, 0.0078125 );
	return ( 2.0 + invAlpha ) * pow( sin2h, invAlpha * 0.5 ) / ( 2.0 * PI );
}
float V_Neubelt( float dotNV, float dotNL ) {
	return saturate( 1.0 / ( 4.0 * ( dotNL + dotNV - dotNL * dotNV ) ) );
}
vec3 BRDF_Sheen( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, vec3 sheenColor, const in float sheenRoughness ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float D = D_Charlie( sheenRoughness, dotNH );
	float V = V_Neubelt( dotNV, dotNL );
	return sheenColor * ( D * V );
}
#endif
float IBLSheenBRDF( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	float r2 = roughness * roughness;
	float rInv = 1.0 / ( roughness + 0.1 );
	float a = -1.9362 + 1.0678 * roughness + 0.4573 * r2 - 0.8469 * rInv;
	float b = -0.6014 + 0.5538 * roughness - 0.4670 * r2 - 0.1255 * rInv;
	float DG = exp( a * dotNV + b );
	return saturate( DG );
}
vec3 EnvironmentBRDF( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	vec2 fab = texture2D( dfgLUT, vec2( roughness, dotNV ) ).rg;
	return specularColor * fab.x + specularF90 * fab.y;
}
#ifdef USE_IRIDESCENCE
void computeMultiscatteringIridescence( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float iridescence, const in vec3 iridescenceF0, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#else
void computeMultiscattering( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#endif
	float dotNV = saturate( dot( normal, viewDir ) );
	vec2 fab = texture2D( dfgLUT, vec2( roughness, dotNV ) ).rg;
	#ifdef USE_IRIDESCENCE
		vec3 Fr = mix( specularColor, iridescenceF0, iridescence );
	#else
		vec3 Fr = specularColor;
	#endif
	vec3 FssEss = Fr * fab.x + specularF90 * fab.y;
	float Ess = fab.x + fab.y;
	float Ems = 1.0 - Ess;
	vec3 Favg = Fr + ( 1.0 - Fr ) * 0.047619;	vec3 Fms = FssEss * Favg / ( 1.0 - Ems * Favg );
	singleScatter += FssEss;
	multiScatter += Fms * Ems;
}
vec3 BRDF_GGX_Multiscatter( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material ) {
	vec3 singleScatter = BRDF_GGX( lightDir, viewDir, normal, material );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	vec2 dfgV = texture2D( dfgLUT, vec2( material.roughness, dotNV ) ).rg;
	vec2 dfgL = texture2D( dfgLUT, vec2( material.roughness, dotNL ) ).rg;
	vec3 FssEss_V = material.specularColorBlended * dfgV.x + material.specularF90 * dfgV.y;
	vec3 FssEss_L = material.specularColorBlended * dfgL.x + material.specularF90 * dfgL.y;
	float Ess_V = dfgV.x + dfgV.y;
	float Ess_L = dfgL.x + dfgL.y;
	float Ems_V = 1.0 - Ess_V;
	float Ems_L = 1.0 - Ess_L;
	vec3 Favg = material.specularColorBlended + ( 1.0 - material.specularColorBlended ) * 0.047619;
	vec3 Fms = FssEss_V * FssEss_L * Favg / ( 1.0 - Ems_V * Ems_L * Favg + EPSILON );
	float compensationFactor = Ems_V * Ems_L;
	vec3 multiScatter = Fms * compensationFactor;
	return singleScatter + multiScatter;
}
#if NUM_RECT_AREA_LIGHTS > 0
	void RE_Direct_RectArea_Physical( const in RectAreaLight rectAreaLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
		vec3 normal = geometryNormal;
		vec3 viewDir = geometryViewDir;
		vec3 position = geometryPosition;
		vec3 lightPos = rectAreaLight.position;
		vec3 halfWidth = rectAreaLight.halfWidth;
		vec3 halfHeight = rectAreaLight.halfHeight;
		vec3 lightColor = rectAreaLight.color;
		float roughness = material.roughness;
		vec3 rectCoords[ 4 ];
		rectCoords[ 0 ] = lightPos + halfWidth - halfHeight;		rectCoords[ 1 ] = lightPos - halfWidth - halfHeight;
		rectCoords[ 2 ] = lightPos - halfWidth + halfHeight;
		rectCoords[ 3 ] = lightPos + halfWidth + halfHeight;
		vec2 uv = LTC_Uv( normal, viewDir, roughness );
		vec4 t1 = texture2D( ltc_1, uv );
		vec4 t2 = texture2D( ltc_2, uv );
		mat3 mInv = mat3(
			vec3( t1.x, 0, t1.y ),
			vec3(    0, 1,    0 ),
			vec3( t1.z, 0, t1.w )
		);
		vec3 fresnel = ( material.specularColorBlended * t2.x + ( material.specularF90 - material.specularColorBlended ) * t2.y );
		reflectedLight.directSpecular += lightColor * fresnel * LTC_Evaluate( normal, viewDir, position, mInv, rectCoords );
		reflectedLight.directDiffuse += lightColor * material.diffuseContribution * LTC_Evaluate( normal, viewDir, position, mat3( 1.0 ), rectCoords );
		#ifdef USE_CLEARCOAT
			vec3 Ncc = geometryClearcoatNormal;
			vec2 uvClearcoat = LTC_Uv( Ncc, viewDir, material.clearcoatRoughness );
			vec4 t1Clearcoat = texture2D( ltc_1, uvClearcoat );
			vec4 t2Clearcoat = texture2D( ltc_2, uvClearcoat );
			mat3 mInvClearcoat = mat3(
				vec3( t1Clearcoat.x, 0, t1Clearcoat.y ),
				vec3(             0, 1,             0 ),
				vec3( t1Clearcoat.z, 0, t1Clearcoat.w )
			);
			vec3 fresnelClearcoat = material.clearcoatF0 * t2Clearcoat.x + ( material.clearcoatF90 - material.clearcoatF0 ) * t2Clearcoat.y;
			clearcoatSpecularDirect += lightColor * fresnelClearcoat * LTC_Evaluate( Ncc, viewDir, position, mInvClearcoat, rectCoords );
		#endif
	}
#endif
void RE_Direct_Physical( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	#ifdef USE_CLEARCOAT
		float dotNLcc = saturate( dot( geometryClearcoatNormal, directLight.direction ) );
		vec3 ccIrradiance = dotNLcc * directLight.color;
		clearcoatSpecularDirect += ccIrradiance * BRDF_GGX_Clearcoat( directLight.direction, geometryViewDir, geometryClearcoatNormal, material );
	#endif
	#ifdef USE_SHEEN
 
 		sheenSpecularDirect += irradiance * BRDF_Sheen( directLight.direction, geometryViewDir, geometryNormal, material.sheenColor, material.sheenRoughness );
 
 		float sheenAlbedoV = IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
 		float sheenAlbedoL = IBLSheenBRDF( geometryNormal, directLight.direction, material.sheenRoughness );
 
 		float sheenEnergyComp = 1.0 - max3( material.sheenColor ) * max( sheenAlbedoV, sheenAlbedoL );
 
 		irradiance *= sheenEnergyComp;
 
 	#endif
	reflectedLight.directSpecular += irradiance * BRDF_GGX_Multiscatter( directLight.direction, geometryViewDir, geometryNormal, material );
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseContribution );
}
void RE_IndirectDiffuse_Physical( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	vec3 diffuse = irradiance * BRDF_Lambert( material.diffuseContribution );
	#ifdef USE_SHEEN
		float sheenAlbedo = IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
		float sheenEnergyComp = 1.0 - max3( material.sheenColor ) * sheenAlbedo;
		diffuse *= sheenEnergyComp;
	#endif
	reflectedLight.indirectDiffuse += diffuse;
}
void RE_IndirectSpecular_Physical( const in vec3 radiance, const in vec3 irradiance, const in vec3 clearcoatRadiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight) {
	#ifdef USE_CLEARCOAT
		clearcoatSpecularIndirect += clearcoatRadiance * EnvironmentBRDF( geometryClearcoatNormal, geometryViewDir, material.clearcoatF0, material.clearcoatF90, material.clearcoatRoughness );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularIndirect += irradiance * material.sheenColor * IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness ) * RECIPROCAL_PI;
 	#endif
	vec3 singleScatteringDielectric = vec3( 0.0 );
	vec3 multiScatteringDielectric = vec3( 0.0 );
	vec3 singleScatteringMetallic = vec3( 0.0 );
	vec3 multiScatteringMetallic = vec3( 0.0 );
	#ifdef USE_IRIDESCENCE
		computeMultiscatteringIridescence( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.iridescence, material.iridescenceFresnelDielectric, material.roughness, singleScatteringDielectric, multiScatteringDielectric );
		computeMultiscatteringIridescence( geometryNormal, geometryViewDir, material.diffuseColor, material.specularF90, material.iridescence, material.iridescenceFresnelMetallic, material.roughness, singleScatteringMetallic, multiScatteringMetallic );
	#else
		computeMultiscattering( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.roughness, singleScatteringDielectric, multiScatteringDielectric );
		computeMultiscattering( geometryNormal, geometryViewDir, material.diffuseColor, material.specularF90, material.roughness, singleScatteringMetallic, multiScatteringMetallic );
	#endif
	vec3 singleScattering = mix( singleScatteringDielectric, singleScatteringMetallic, material.metalness );
	vec3 multiScattering = mix( multiScatteringDielectric, multiScatteringMetallic, material.metalness );
	vec3 totalScatteringDielectric = singleScatteringDielectric + multiScatteringDielectric;
	vec3 diffuse = material.diffuseContribution * ( 1.0 - totalScatteringDielectric );
	vec3 cosineWeightedIrradiance = irradiance * RECIPROCAL_PI;
	vec3 indirectSpecular = radiance * singleScattering;
	indirectSpecular += multiScattering * cosineWeightedIrradiance;
	vec3 indirectDiffuse = diffuse * cosineWeightedIrradiance;
	#ifdef USE_SHEEN
		float sheenAlbedo = IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
		float sheenEnergyComp = 1.0 - max3( material.sheenColor ) * sheenAlbedo;
		indirectSpecular *= sheenEnergyComp;
		indirectDiffuse *= sheenEnergyComp;
	#endif
	reflectedLight.indirectSpecular += indirectSpecular;
	reflectedLight.indirectDiffuse += indirectDiffuse;
}
#define RE_Direct				RE_Direct_Physical
#define RE_Direct_RectArea		RE_Direct_RectArea_Physical
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Physical
#define RE_IndirectSpecular		RE_IndirectSpecular_Physical
float computeSpecularOcclusion( const in float dotNV, const in float ambientOcclusion, const in float roughness ) {
	return saturate( pow( dotNV + ambientOcclusion, exp2( - 16.0 * roughness - 1.0 ) ) - 1.0 + ambientOcclusion );
}`,FP=`
vec3 geometryPosition = - vViewPosition;
vec3 geometryNormal = normal;
vec3 geometryViewDir = ( isOrthographic ) ? vec3( 0, 0, 1 ) : normalize( vViewPosition );
vec3 geometryClearcoatNormal = vec3( 0.0 );
#ifdef USE_CLEARCOAT
	geometryClearcoatNormal = clearcoatNormal;
#endif
#ifdef USE_IRIDESCENCE
	float dotNVi = saturate( dot( normal, geometryViewDir ) );
	if ( material.iridescenceThickness == 0.0 ) {
		material.iridescence = 0.0;
	} else {
		material.iridescence = saturate( material.iridescence );
	}
	if ( material.iridescence > 0.0 ) {
		material.iridescenceFresnelDielectric = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.specularColor );
		material.iridescenceFresnelMetallic = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.diffuseColor );
		material.iridescenceFresnel = mix( material.iridescenceFresnelDielectric, material.iridescenceFresnelMetallic, material.metalness );
		material.iridescenceF0 = Schlick_to_F0( material.iridescenceFresnel, 1.0, dotNVi );
	}
#endif
IncidentLight directLight;
#if ( NUM_POINT_LIGHTS > 0 ) && defined( RE_Direct )
	PointLight pointLight;
	#if defined( USE_SHADOWMAP ) && NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHTS; i ++ ) {
		pointLight = pointLights[ i ];
		getPointLightInfo( pointLight, geometryPosition, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_POINT_LIGHT_SHADOWS ) && ( defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_BASIC ) )
		pointLightShadow = pointLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getPointShadow( pointShadowMap[ i ], pointLightShadow.shadowMapSize, pointLightShadow.shadowIntensity, pointLightShadow.shadowBias, pointLightShadow.shadowRadius, vPointShadowCoord[ i ], pointLightShadow.shadowCameraNear, pointLightShadow.shadowCameraFar ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_SPOT_LIGHTS > 0 ) && defined( RE_Direct )
	SpotLight spotLight;
	vec4 spotColor;
	vec3 spotLightCoord;
	bool inSpotLightMap;
	#if defined( USE_SHADOWMAP ) && NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHTS; i ++ ) {
		spotLight = spotLights[ i ];
		getSpotLightInfo( spotLight, geometryPosition, directLight );
		#if ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#define SPOT_LIGHT_MAP_INDEX UNROLLED_LOOP_INDEX
		#elif ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		#define SPOT_LIGHT_MAP_INDEX NUM_SPOT_LIGHT_MAPS
		#else
		#define SPOT_LIGHT_MAP_INDEX ( UNROLLED_LOOP_INDEX - NUM_SPOT_LIGHT_SHADOWS + NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#endif
		#if ( SPOT_LIGHT_MAP_INDEX < NUM_SPOT_LIGHT_MAPS )
			spotLightCoord = vSpotLightCoord[ i ].xyz / vSpotLightCoord[ i ].w;
			inSpotLightMap = all( lessThan( abs( spotLightCoord * 2. - 1. ), vec3( 1.0 ) ) );
			spotColor = texture2D( spotLightMap[ SPOT_LIGHT_MAP_INDEX ], spotLightCoord.xy );
			directLight.color = inSpotLightMap ? directLight.color * spotColor.rgb : directLight.color;
		#endif
		#undef SPOT_LIGHT_MAP_INDEX
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		spotLightShadow = spotLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( spotShadowMap[ i ], spotLightShadow.shadowMapSize, spotLightShadow.shadowIntensity, spotLightShadow.shadowBias, spotLightShadow.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_DIR_LIGHTS > 0 ) && defined( RE_Direct )
	DirectionalLight directionalLight;
	#if defined( USE_SHADOWMAP ) && NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHTS; i ++ ) {
		directionalLight = directionalLights[ i ];
		getDirectionalLightInfo( directionalLight, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_DIR_LIGHT_SHADOWS )
		directionalLightShadow = directionalLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( directionalShadowMap[ i ], directionalLightShadow.shadowMapSize, directionalLightShadow.shadowIntensity, directionalLightShadow.shadowBias, directionalLightShadow.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_RECT_AREA_LIGHTS > 0 ) && defined( RE_Direct_RectArea )
	RectAreaLight rectAreaLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_RECT_AREA_LIGHTS; i ++ ) {
		rectAreaLight = rectAreaLights[ i ];
		RE_Direct_RectArea( rectAreaLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if defined( RE_IndirectDiffuse )
	vec3 iblIrradiance = vec3( 0.0 );
	vec3 irradiance = getAmbientLightIrradiance( ambientLightColor );
	#if defined( USE_LIGHT_PROBES )
		irradiance += getLightProbeIrradiance( lightProbe, geometryNormal );
	#endif
	#if ( NUM_HEMI_LIGHTS > 0 )
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_HEMI_LIGHTS; i ++ ) {
			irradiance += getHemisphereLightIrradiance( hemisphereLights[ i ], geometryNormal );
		}
		#pragma unroll_loop_end
	#endif
#endif
#if defined( RE_IndirectSpecular )
	vec3 radiance = vec3( 0.0 );
	vec3 clearcoatRadiance = vec3( 0.0 );
#endif`,kP=`#if defined( RE_IndirectDiffuse )
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		vec3 lightMapIrradiance = lightMapTexel.rgb * lightMapIntensity;
		irradiance += lightMapIrradiance;
	#endif
	#if defined( USE_ENVMAP ) && defined( ENVMAP_TYPE_CUBE_UV )
		#if defined( STANDARD ) || defined( LAMBERT ) || defined( PHONG )
			iblIrradiance += getIBLIrradiance( geometryNormal );
		#endif
	#endif
#endif
#if defined( USE_ENVMAP ) && defined( RE_IndirectSpecular )
	#ifdef USE_ANISOTROPY
		radiance += getIBLAnisotropyRadiance( geometryViewDir, geometryNormal, material.roughness, material.anisotropyB, material.anisotropy );
	#else
		radiance += getIBLRadiance( geometryViewDir, geometryNormal, material.roughness );
	#endif
	#ifdef USE_CLEARCOAT
		clearcoatRadiance += getIBLRadiance( geometryViewDir, geometryClearcoatNormal, material.clearcoatRoughness );
	#endif
#endif`,UP=`#if defined( RE_IndirectDiffuse )
	#if defined( LAMBERT ) || defined( PHONG )
		irradiance += iblIrradiance;
	#endif
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,BP=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,VP=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,HP=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,zP=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,GP=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,jP=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,WP=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
	#if defined( USE_POINTS_UV )
		vec2 uv = vUv;
	#else
		vec2 uv = ( uvTransform * vec3( gl_PointCoord.x, 1.0 - gl_PointCoord.y, 1 ) ).xy;
	#endif
#endif
#ifdef USE_MAP
	diffuseColor *= texture2D( map, uv );
#endif
#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, uv ).g;
#endif`,$P=`#if defined( USE_POINTS_UV )
	varying vec2 vUv;
#else
	#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
		uniform mat3 uvTransform;
	#endif
#endif
#ifdef USE_MAP
	uniform sampler2D map;
#endif
#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,qP=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,XP=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,YP=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,ZP=`#if defined( USE_MORPHCOLORS )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,JP=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,KP=`#ifdef USE_MORPHTARGETS
	#ifndef USE_INSTANCING_MORPH
		uniform float morphTargetBaseInfluence;
		uniform float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	#endif
	uniform sampler2DArray morphTargetsTexture;
	uniform ivec2 morphTargetsTextureSize;
	vec4 getMorph( const in int vertexIndex, const in int morphTargetIndex, const in int offset ) {
		int texelIndex = vertexIndex * MORPHTARGETS_TEXTURE_STRIDE + offset;
		int y = texelIndex / morphTargetsTextureSize.x;
		int x = texelIndex - y * morphTargetsTextureSize.x;
		ivec3 morphUV = ivec3( x, y, morphTargetIndex );
		return texelFetch( morphTargetsTexture, morphUV, 0 );
	}
#endif`,QP=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,eO=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
#ifdef FLAT_SHADED
	vec3 fdx = dFdx( vViewPosition );
	vec3 fdy = dFdy( vViewPosition );
	vec3 normal = normalize( cross( fdx, fdy ) );
#else
	vec3 normal = normalize( vNormal );
	#ifdef DOUBLE_SIDED
		normal *= faceDirection;
	#endif
#endif
#if defined( USE_NORMALMAP_TANGENTSPACE ) || defined( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY )
	#ifdef USE_TANGENT
		mat3 tbn = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn = getTangentFrame( - vViewPosition, normal,
		#if defined( USE_NORMALMAP )
			vNormalMapUv
		#elif defined( USE_CLEARCOAT_NORMALMAP )
			vClearcoatNormalMapUv
		#else
			vUv
		#endif
		);
	#endif
	#if defined( DOUBLE_SIDED ) && ! defined( FLAT_SHADED )
		tbn[0] *= faceDirection;
		tbn[1] *= faceDirection;
	#endif
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	#ifdef USE_TANGENT
		mat3 tbn2 = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn2 = getTangentFrame( - vViewPosition, normal, vClearcoatNormalMapUv );
	#endif
	#if defined( DOUBLE_SIDED ) && ! defined( FLAT_SHADED )
		tbn2[0] *= faceDirection;
		tbn2[1] *= faceDirection;
	#endif
#endif
vec3 nonPerturbedNormal = normal;`,tO=`#ifdef USE_NORMALMAP_OBJECTSPACE
	normal = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	#ifdef FLIP_SIDED
		normal = - normal;
	#endif
	#ifdef DOUBLE_SIDED
		normal = normal * faceDirection;
	#endif
	normal = normalize( normalMatrix * normal );
#elif defined( USE_NORMALMAP_TANGENTSPACE )
	vec3 mapN = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	mapN.xy *= normalScale;
	normal = normalize( tbn * mapN );
#elif defined( USE_BUMPMAP )
	normal = perturbNormalArb( - vViewPosition, normal, dHdxy_fwd(), faceDirection );
#endif`,nO=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,iO=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,rO=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
	#endif
#endif`,sO=`#ifdef USE_NORMALMAP
	uniform sampler2D normalMap;
	uniform vec2 normalScale;
#endif
#ifdef USE_NORMALMAP_OBJECTSPACE
	uniform mat3 normalMatrix;
#endif
#if ! defined ( USE_TANGENT ) && ( defined ( USE_NORMALMAP_TANGENTSPACE ) || defined ( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY ) )
	mat3 getTangentFrame( vec3 eye_pos, vec3 surf_norm, vec2 uv ) {
		vec3 q0 = dFdx( eye_pos.xyz );
		vec3 q1 = dFdy( eye_pos.xyz );
		vec2 st0 = dFdx( uv.st );
		vec2 st1 = dFdy( uv.st );
		vec3 N = surf_norm;
		vec3 q1perp = cross( q1, N );
		vec3 q0perp = cross( N, q0 );
		vec3 T = q1perp * st0.x + q0perp * st1.x;
		vec3 B = q1perp * st0.y + q0perp * st1.y;
		float det = max( dot( T, T ), dot( B, B ) );
		float scale = ( det == 0.0 ) ? 0.0 : inversesqrt( det );
		return mat3( T * scale, B * scale, N );
	}
#endif`,oO=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,aO=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,cO=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,lO=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,uO=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,dO=`vec3 packNormalToRGB( const in vec3 normal ) {
	return normalize( normal ) * 0.5 + 0.5;
}
vec3 unpackRGBToNormal( const in vec3 rgb ) {
	return 2.0 * rgb.xyz - 1.0;
}
const float PackUpscale = 256. / 255.;const float UnpackDownscale = 255. / 256.;const float ShiftRight8 = 1. / 256.;
const float Inv255 = 1. / 255.;
const vec4 PackFactors = vec4( 1.0, 256.0, 256.0 * 256.0, 256.0 * 256.0 * 256.0 );
const vec2 UnpackFactors2 = vec2( UnpackDownscale, 1.0 / PackFactors.g );
const vec3 UnpackFactors3 = vec3( UnpackDownscale / PackFactors.rg, 1.0 / PackFactors.b );
const vec4 UnpackFactors4 = vec4( UnpackDownscale / PackFactors.rgb, 1.0 / PackFactors.a );
vec4 packDepthToRGBA( const in float v ) {
	if( v <= 0.0 )
		return vec4( 0., 0., 0., 0. );
	if( v >= 1.0 )
		return vec4( 1., 1., 1., 1. );
	float vuf;
	float af = modf( v * PackFactors.a, vuf );
	float bf = modf( vuf * ShiftRight8, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec4( vuf * Inv255, gf * PackUpscale, bf * PackUpscale, af );
}
vec3 packDepthToRGB( const in float v ) {
	if( v <= 0.0 )
		return vec3( 0., 0., 0. );
	if( v >= 1.0 )
		return vec3( 1., 1., 1. );
	float vuf;
	float bf = modf( v * PackFactors.b, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec3( vuf * Inv255, gf * PackUpscale, bf );
}
vec2 packDepthToRG( const in float v ) {
	if( v <= 0.0 )
		return vec2( 0., 0. );
	if( v >= 1.0 )
		return vec2( 1., 1. );
	float vuf;
	float gf = modf( v * 256., vuf );
	return vec2( vuf * Inv255, gf );
}
float unpackRGBAToDepth( const in vec4 v ) {
	return dot( v, UnpackFactors4 );
}
float unpackRGBToDepth( const in vec3 v ) {
	return dot( v, UnpackFactors3 );
}
float unpackRGToDepth( const in vec2 v ) {
	return v.r * UnpackFactors2.r + v.g * UnpackFactors2.g;
}
vec4 pack2HalfToRGBA( const in vec2 v ) {
	vec4 r = vec4( v.x, fract( v.x * 255.0 ), v.y, fract( v.y * 255.0 ) );
	return vec4( r.x - r.y / 255.0, r.y, r.z - r.w / 255.0, r.w );
}
vec2 unpackRGBATo2Half( const in vec4 v ) {
	return vec2( v.x + ( v.y / 255.0 ), v.z + ( v.w / 255.0 ) );
}
float viewZToOrthographicDepth( const in float viewZ, const in float near, const in float far ) {
	return ( viewZ + near ) / ( near - far );
}
float orthographicDepthToViewZ( const in float depth, const in float near, const in float far ) {
	#ifdef USE_REVERSED_DEPTH_BUFFER
	
		return depth * ( far - near ) - far;
	#else
		return depth * ( near - far ) - near;
	#endif
}
float viewZToPerspectiveDepth( const in float viewZ, const in float near, const in float far ) {
	return ( ( near + viewZ ) * far ) / ( ( far - near ) * viewZ );
}
float perspectiveDepthToViewZ( const in float depth, const in float near, const in float far ) {
	
	#ifdef USE_REVERSED_DEPTH_BUFFER
		return ( near * far ) / ( ( near - far ) * depth - near );
	#else
		return ( near * far ) / ( ( far - near ) * depth - far );
	#endif
}`,fO=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,hO=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,pO=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,mO=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,gO=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,vO=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,yO=`#if NUM_SPOT_LIGHT_COORDS > 0
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#if NUM_SPOT_LIGHT_MAPS > 0
	uniform sampler2D spotLightMap[ NUM_SPOT_LIGHT_MAPS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform sampler2DShadow directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];
		#else
			uniform sampler2D directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];
		#endif
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform sampler2DShadow spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];
		#else
			uniform sampler2D spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];
		#endif
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform samplerCubeShadow pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];
		#elif defined( SHADOWMAP_TYPE_BASIC )
			uniform samplerCube pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];
		#endif
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
	#if defined( SHADOWMAP_TYPE_PCF )
		float interleavedGradientNoise( vec2 position ) {
			return fract( 52.9829189 * fract( dot( position, vec2( 0.06711056, 0.00583715 ) ) ) );
		}
		vec2 vogelDiskSample( int sampleIndex, int samplesCount, float phi ) {
			const float goldenAngle = 2.399963229728653;
			float r = sqrt( ( float( sampleIndex ) + 0.5 ) / float( samplesCount ) );
			float theta = float( sampleIndex ) * goldenAngle + phi;
			return vec2( cos( theta ), sin( theta ) ) * r;
		}
	#endif
	#if defined( SHADOWMAP_TYPE_PCF )
		float getShadow( sampler2DShadow shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
			float shadow = 1.0;
			shadowCoord.xyz /= shadowCoord.w;
			shadowCoord.z += shadowBias;
			bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
			bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
			if ( frustumTest ) {
				vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
				float radius = shadowRadius * texelSize.x;
				float phi = interleavedGradientNoise( gl_FragCoord.xy ) * PI2;
				shadow = (
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 0, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 1, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 2, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 3, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 4, 5, phi ) * radius, shadowCoord.z ) )
				) * 0.2;
			}
			return mix( 1.0, shadow, shadowIntensity );
		}
	#elif defined( SHADOWMAP_TYPE_VSM )
		float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
			float shadow = 1.0;
			shadowCoord.xyz /= shadowCoord.w;
			#ifdef USE_REVERSED_DEPTH_BUFFER
				shadowCoord.z -= shadowBias;
			#else
				shadowCoord.z += shadowBias;
			#endif
			bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
			bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
			if ( frustumTest ) {
				vec2 distribution = texture2D( shadowMap, shadowCoord.xy ).rg;
				float mean = distribution.x;
				float variance = distribution.y * distribution.y;
				#ifdef USE_REVERSED_DEPTH_BUFFER
					float hard_shadow = step( mean, shadowCoord.z );
				#else
					float hard_shadow = step( shadowCoord.z, mean );
				#endif
				
				if ( hard_shadow == 1.0 ) {
					shadow = 1.0;
				} else {
					variance = max( variance, 0.0000001 );
					float d = shadowCoord.z - mean;
					float p_max = variance / ( variance + d * d );
					p_max = clamp( ( p_max - 0.3 ) / 0.65, 0.0, 1.0 );
					shadow = max( hard_shadow, p_max );
				}
			}
			return mix( 1.0, shadow, shadowIntensity );
		}
	#else
		float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
			float shadow = 1.0;
			shadowCoord.xyz /= shadowCoord.w;
			#ifdef USE_REVERSED_DEPTH_BUFFER
				shadowCoord.z -= shadowBias;
			#else
				shadowCoord.z += shadowBias;
			#endif
			bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
			bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
			if ( frustumTest ) {
				float depth = texture2D( shadowMap, shadowCoord.xy ).r;
				#ifdef USE_REVERSED_DEPTH_BUFFER
					shadow = step( depth, shadowCoord.z );
				#else
					shadow = step( shadowCoord.z, depth );
				#endif
			}
			return mix( 1.0, shadow, shadowIntensity );
		}
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
	#if defined( SHADOWMAP_TYPE_PCF )
	float getPointShadow( samplerCubeShadow shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {
		float shadow = 1.0;
		vec3 lightToPosition = shadowCoord.xyz;
		vec3 bd3D = normalize( lightToPosition );
		vec3 absVec = abs( lightToPosition );
		float viewSpaceZ = max( max( absVec.x, absVec.y ), absVec.z );
		if ( viewSpaceZ - shadowCameraFar <= 0.0 && viewSpaceZ - shadowCameraNear >= 0.0 ) {
			#ifdef USE_REVERSED_DEPTH_BUFFER
				float dp = ( shadowCameraNear * ( shadowCameraFar - viewSpaceZ ) ) / ( viewSpaceZ * ( shadowCameraFar - shadowCameraNear ) );
				dp -= shadowBias;
			#else
				float dp = ( shadowCameraFar * ( viewSpaceZ - shadowCameraNear ) ) / ( viewSpaceZ * ( shadowCameraFar - shadowCameraNear ) );
				dp += shadowBias;
			#endif
			float texelSize = shadowRadius / shadowMapSize.x;
			vec3 absDir = abs( bd3D );
			vec3 tangent = absDir.x > absDir.z ? vec3( 0.0, 1.0, 0.0 ) : vec3( 1.0, 0.0, 0.0 );
			tangent = normalize( cross( bd3D, tangent ) );
			vec3 bitangent = cross( bd3D, tangent );
			float phi = interleavedGradientNoise( gl_FragCoord.xy ) * PI2;
			vec2 sample0 = vogelDiskSample( 0, 5, phi );
			vec2 sample1 = vogelDiskSample( 1, 5, phi );
			vec2 sample2 = vogelDiskSample( 2, 5, phi );
			vec2 sample3 = vogelDiskSample( 3, 5, phi );
			vec2 sample4 = vogelDiskSample( 4, 5, phi );
			shadow = (
				texture( shadowMap, vec4( bd3D + ( tangent * sample0.x + bitangent * sample0.y ) * texelSize, dp ) ) +
				texture( shadowMap, vec4( bd3D + ( tangent * sample1.x + bitangent * sample1.y ) * texelSize, dp ) ) +
				texture( shadowMap, vec4( bd3D + ( tangent * sample2.x + bitangent * sample2.y ) * texelSize, dp ) ) +
				texture( shadowMap, vec4( bd3D + ( tangent * sample3.x + bitangent * sample3.y ) * texelSize, dp ) ) +
				texture( shadowMap, vec4( bd3D + ( tangent * sample4.x + bitangent * sample4.y ) * texelSize, dp ) )
			) * 0.2;
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
	#elif defined( SHADOWMAP_TYPE_BASIC )
	float getPointShadow( samplerCube shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {
		float shadow = 1.0;
		vec3 lightToPosition = shadowCoord.xyz;
		vec3 absVec = abs( lightToPosition );
		float viewSpaceZ = max( max( absVec.x, absVec.y ), absVec.z );
		if ( viewSpaceZ - shadowCameraFar <= 0.0 && viewSpaceZ - shadowCameraNear >= 0.0 ) {
			float dp = ( shadowCameraFar * ( viewSpaceZ - shadowCameraNear ) ) / ( viewSpaceZ * ( shadowCameraFar - shadowCameraNear ) );
			dp += shadowBias;
			vec3 bd3D = normalize( lightToPosition );
			float depth = textureCube( shadowMap, bd3D ).r;
			#ifdef USE_REVERSED_DEPTH_BUFFER
				depth = 1.0 - depth;
			#endif
			shadow = step( dp, depth );
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
	#endif
	#endif
#endif`,_O=`#if NUM_SPOT_LIGHT_COORDS > 0
	uniform mat4 spotLightMatrix[ NUM_SPOT_LIGHT_COORDS ];
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform mat4 directionalShadowMatrix[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform mat4 pointShadowMatrix[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
#endif`,xO=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
	vec3 shadowWorldNormal = inverseTransformDirection( transformedNormal, viewMatrix );
	vec4 shadowWorldPosition;
#endif
#if defined( USE_SHADOWMAP )
	#if NUM_DIR_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * directionalLightShadows[ i ].shadowNormalBias, 0 );
			vDirectionalShadowCoord[ i ] = directionalShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * pointLightShadows[ i ].shadowNormalBias, 0 );
			vPointShadowCoord[ i ] = pointShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
#endif
#if NUM_SPOT_LIGHT_COORDS > 0
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_COORDS; i ++ ) {
		shadowWorldPosition = worldPosition;
		#if ( defined( USE_SHADOWMAP ) && UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
			shadowWorldPosition.xyz += shadowWorldNormal * spotLightShadows[ i ].shadowNormalBias;
		#endif
		vSpotLightCoord[ i ] = spotLightMatrix[ i ] * shadowWorldPosition;
	}
	#pragma unroll_loop_end
#endif`,MO=`float getShadowMask() {
	float shadow = 1.0;
	#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
		directionalLight = directionalLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( directionalShadowMap[ i ], directionalLight.shadowMapSize, directionalLight.shadowIntensity, directionalLight.shadowBias, directionalLight.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_SHADOWS; i ++ ) {
		spotLight = spotLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( spotShadowMap[ i ], spotLight.shadowMapSize, spotLight.shadowIntensity, spotLight.shadowBias, spotLight.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0 && ( defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_BASIC ) )
	PointLightShadow pointLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
		pointLight = pointLightShadows[ i ];
		shadow *= receiveShadow ? getPointShadow( pointShadowMap[ i ], pointLight.shadowMapSize, pointLight.shadowIntensity, pointLight.shadowBias, pointLight.shadowRadius, vPointShadowCoord[ i ], pointLight.shadowCameraNear, pointLight.shadowCameraFar ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#endif
	return shadow;
}`,bO=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,SO=`#ifdef USE_SKINNING
	uniform mat4 bindMatrix;
	uniform mat4 bindMatrixInverse;
	uniform highp sampler2D boneTexture;
	mat4 getBoneMatrix( const in float i ) {
		int size = textureSize( boneTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( boneTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( boneTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( boneTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( boneTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
#endif`,EO=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,wO=`#ifdef USE_SKINNING
	mat4 skinMatrix = mat4( 0.0 );
	skinMatrix += skinWeight.x * boneMatX;
	skinMatrix += skinWeight.y * boneMatY;
	skinMatrix += skinWeight.z * boneMatZ;
	skinMatrix += skinWeight.w * boneMatW;
	skinMatrix = bindMatrixInverse * skinMatrix * bindMatrix;
	objectNormal = vec4( skinMatrix * vec4( objectNormal, 0.0 ) ).xyz;
	#ifdef USE_TANGENT
		objectTangent = vec4( skinMatrix * vec4( objectTangent, 0.0 ) ).xyz;
	#endif
#endif`,CO=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,TO=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,DO=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,IO=`#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
uniform float toneMappingExposure;
vec3 LinearToneMapping( vec3 color ) {
	return saturate( toneMappingExposure * color );
}
vec3 ReinhardToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	return saturate( color / ( vec3( 1.0 ) + color ) );
}
vec3 CineonToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	color = max( vec3( 0.0 ), color - 0.004 );
	return pow( ( color * ( 6.2 * color + 0.5 ) ) / ( color * ( 6.2 * color + 1.7 ) + 0.06 ), vec3( 2.2 ) );
}
vec3 RRTAndODTFit( vec3 v ) {
	vec3 a = v * ( v + 0.0245786 ) - 0.000090537;
	vec3 b = v * ( 0.983729 * v + 0.4329510 ) + 0.238081;
	return a / b;
}
vec3 ACESFilmicToneMapping( vec3 color ) {
	const mat3 ACESInputMat = mat3(
		vec3( 0.59719, 0.07600, 0.02840 ),		vec3( 0.35458, 0.90834, 0.13383 ),
		vec3( 0.04823, 0.01566, 0.83777 )
	);
	const mat3 ACESOutputMat = mat3(
		vec3(  1.60475, -0.10208, -0.00327 ),		vec3( -0.53108,  1.10813, -0.07276 ),
		vec3( -0.07367, -0.00605,  1.07602 )
	);
	color *= toneMappingExposure / 0.6;
	color = ACESInputMat * color;
	color = RRTAndODTFit( color );
	color = ACESOutputMat * color;
	return saturate( color );
}
const mat3 LINEAR_REC2020_TO_LINEAR_SRGB = mat3(
	vec3( 1.6605, - 0.1246, - 0.0182 ),
	vec3( - 0.5876, 1.1329, - 0.1006 ),
	vec3( - 0.0728, - 0.0083, 1.1187 )
);
const mat3 LINEAR_SRGB_TO_LINEAR_REC2020 = mat3(
	vec3( 0.6274, 0.0691, 0.0164 ),
	vec3( 0.3293, 0.9195, 0.0880 ),
	vec3( 0.0433, 0.0113, 0.8956 )
);
vec3 agxDefaultContrastApprox( vec3 x ) {
	vec3 x2 = x * x;
	vec3 x4 = x2 * x2;
	return + 15.5 * x4 * x2
		- 40.14 * x4 * x
		+ 31.96 * x4
		- 6.868 * x2 * x
		+ 0.4298 * x2
		+ 0.1191 * x
		- 0.00232;
}
vec3 AgXToneMapping( vec3 color ) {
	const mat3 AgXInsetMatrix = mat3(
		vec3( 0.856627153315983, 0.137318972929847, 0.11189821299995 ),
		vec3( 0.0951212405381588, 0.761241990602591, 0.0767994186031903 ),
		vec3( 0.0482516061458583, 0.101439036467562, 0.811302368396859 )
	);
	const mat3 AgXOutsetMatrix = mat3(
		vec3( 1.1271005818144368, - 0.1413297634984383, - 0.14132976349843826 ),
		vec3( - 0.11060664309660323, 1.157823702216272, - 0.11060664309660294 ),
		vec3( - 0.016493938717834573, - 0.016493938717834257, 1.2519364065950405 )
	);
	const float AgxMinEv = - 12.47393;	const float AgxMaxEv = 4.026069;
	color *= toneMappingExposure;
	color = LINEAR_SRGB_TO_LINEAR_REC2020 * color;
	color = AgXInsetMatrix * color;
	color = max( color, 1e-10 );	color = log2( color );
	color = ( color - AgxMinEv ) / ( AgxMaxEv - AgxMinEv );
	color = clamp( color, 0.0, 1.0 );
	color = agxDefaultContrastApprox( color );
	color = AgXOutsetMatrix * color;
	color = pow( max( vec3( 0.0 ), color ), vec3( 2.2 ) );
	color = LINEAR_REC2020_TO_LINEAR_SRGB * color;
	color = clamp( color, 0.0, 1.0 );
	return color;
}
vec3 NeutralToneMapping( vec3 color ) {
	const float StartCompression = 0.8 - 0.04;
	const float Desaturation = 0.15;
	color *= toneMappingExposure;
	float x = min( color.r, min( color.g, color.b ) );
	float offset = x < 0.08 ? x - 6.25 * x * x : 0.04;
	color -= offset;
	float peak = max( color.r, max( color.g, color.b ) );
	if ( peak < StartCompression ) return color;
	float d = 1. - StartCompression;
	float newPeak = 1. - d * d / ( peak + d - StartCompression );
	color *= newPeak / peak;
	float g = 1. - 1. / ( Desaturation * ( peak - newPeak ) + 1. );
	return mix( color, vec3( newPeak ), g );
}
vec3 CustomToneMapping( vec3 color ) { return color; }`,AO=`#ifdef USE_TRANSMISSION
	material.transmission = transmission;
	material.transmissionAlpha = 1.0;
	material.thickness = thickness;
	material.attenuationDistance = attenuationDistance;
	material.attenuationColor = attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		material.transmission *= texture2D( transmissionMap, vTransmissionMapUv ).r;
	#endif
	#ifdef USE_THICKNESSMAP
		material.thickness *= texture2D( thicknessMap, vThicknessMapUv ).g;
	#endif
	vec3 pos = vWorldPosition;
	vec3 v = normalize( cameraPosition - pos );
	vec3 n = inverseTransformDirection( normal, viewMatrix );
	vec4 transmitted = getIBLVolumeRefraction(
		n, v, material.roughness, material.diffuseContribution, material.specularColorBlended, material.specularF90,
		pos, modelMatrix, viewMatrix, projectionMatrix, material.dispersion, material.ior, material.thickness,
		material.attenuationColor, material.attenuationDistance );
	material.transmissionAlpha = mix( material.transmissionAlpha, transmitted.a, material.transmission );
	totalDiffuse = mix( totalDiffuse, transmitted.rgb, material.transmission );
#endif`,RO=`#ifdef USE_TRANSMISSION
	uniform float transmission;
	uniform float thickness;
	uniform float attenuationDistance;
	uniform vec3 attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		uniform sampler2D transmissionMap;
	#endif
	#ifdef USE_THICKNESSMAP
		uniform sampler2D thicknessMap;
	#endif
	uniform vec2 transmissionSamplerSize;
	uniform sampler2D transmissionSamplerMap;
	uniform mat4 modelMatrix;
	uniform mat4 projectionMatrix;
	varying vec3 vWorldPosition;
	float w0( float a ) {
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - a + 3.0 ) - 3.0 ) + 1.0 );
	}
	float w1( float a ) {
		return ( 1.0 / 6.0 ) * ( a *  a * ( 3.0 * a - 6.0 ) + 4.0 );
	}
	float w2( float a ){
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - 3.0 * a + 3.0 ) + 3.0 ) + 1.0 );
	}
	float w3( float a ) {
		return ( 1.0 / 6.0 ) * ( a * a * a );
	}
	float g0( float a ) {
		return w0( a ) + w1( a );
	}
	float g1( float a ) {
		return w2( a ) + w3( a );
	}
	float h0( float a ) {
		return - 1.0 + w1( a ) / ( w0( a ) + w1( a ) );
	}
	float h1( float a ) {
		return 1.0 + w3( a ) / ( w2( a ) + w3( a ) );
	}
	vec4 bicubic( sampler2D tex, vec2 uv, vec4 texelSize, float lod ) {
		uv = uv * texelSize.zw + 0.5;
		vec2 iuv = floor( uv );
		vec2 fuv = fract( uv );
		float g0x = g0( fuv.x );
		float g1x = g1( fuv.x );
		float h0x = h0( fuv.x );
		float h1x = h1( fuv.x );
		float h0y = h0( fuv.y );
		float h1y = h1( fuv.y );
		vec2 p0 = ( vec2( iuv.x + h0x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p1 = ( vec2( iuv.x + h1x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p2 = ( vec2( iuv.x + h0x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		vec2 p3 = ( vec2( iuv.x + h1x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		return g0( fuv.y ) * ( g0x * textureLod( tex, p0, lod ) + g1x * textureLod( tex, p1, lod ) ) +
			g1( fuv.y ) * ( g0x * textureLod( tex, p2, lod ) + g1x * textureLod( tex, p3, lod ) );
	}
	vec4 textureBicubic( sampler2D sampler, vec2 uv, float lod ) {
		vec2 fLodSize = vec2( textureSize( sampler, int( lod ) ) );
		vec2 cLodSize = vec2( textureSize( sampler, int( lod + 1.0 ) ) );
		vec2 fLodSizeInv = 1.0 / fLodSize;
		vec2 cLodSizeInv = 1.0 / cLodSize;
		vec4 fSample = bicubic( sampler, uv, vec4( fLodSizeInv, fLodSize ), floor( lod ) );
		vec4 cSample = bicubic( sampler, uv, vec4( cLodSizeInv, cLodSize ), ceil( lod ) );
		return mix( fSample, cSample, fract( lod ) );
	}
	vec3 getVolumeTransmissionRay( const in vec3 n, const in vec3 v, const in float thickness, const in float ior, const in mat4 modelMatrix ) {
		vec3 refractionVector = refract( - v, normalize( n ), 1.0 / ior );
		vec3 modelScale;
		modelScale.x = length( vec3( modelMatrix[ 0 ].xyz ) );
		modelScale.y = length( vec3( modelMatrix[ 1 ].xyz ) );
		modelScale.z = length( vec3( modelMatrix[ 2 ].xyz ) );
		return normalize( refractionVector ) * thickness * modelScale;
	}
	float applyIorToRoughness( const in float roughness, const in float ior ) {
		return roughness * clamp( ior * 2.0 - 2.0, 0.0, 1.0 );
	}
	vec4 getTransmissionSample( const in vec2 fragCoord, const in float roughness, const in float ior ) {
		float lod = log2( transmissionSamplerSize.x ) * applyIorToRoughness( roughness, ior );
		return textureBicubic( transmissionSamplerMap, fragCoord.xy, lod );
	}
	vec3 volumeAttenuation( const in float transmissionDistance, const in vec3 attenuationColor, const in float attenuationDistance ) {
		if ( isinf( attenuationDistance ) ) {
			return vec3( 1.0 );
		} else {
			vec3 attenuationCoefficient = -log( attenuationColor ) / attenuationDistance;
			vec3 transmittance = exp( - attenuationCoefficient * transmissionDistance );			return transmittance;
		}
	}
	vec4 getIBLVolumeRefraction( const in vec3 n, const in vec3 v, const in float roughness, const in vec3 diffuseColor,
		const in vec3 specularColor, const in float specularF90, const in vec3 position, const in mat4 modelMatrix,
		const in mat4 viewMatrix, const in mat4 projMatrix, const in float dispersion, const in float ior, const in float thickness,
		const in vec3 attenuationColor, const in float attenuationDistance ) {
		vec4 transmittedLight;
		vec3 transmittance;
		#ifdef USE_DISPERSION
			float halfSpread = ( ior - 1.0 ) * 0.025 * dispersion;
			vec3 iors = vec3( ior - halfSpread, ior, ior + halfSpread );
			for ( int i = 0; i < 3; i ++ ) {
				vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, iors[ i ], modelMatrix );
				vec3 refractedRayExit = position + transmissionRay;
				vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
				vec2 refractionCoords = ndcPos.xy / ndcPos.w;
				refractionCoords += 1.0;
				refractionCoords /= 2.0;
				vec4 transmissionSample = getTransmissionSample( refractionCoords, roughness, iors[ i ] );
				transmittedLight[ i ] = transmissionSample[ i ];
				transmittedLight.a += transmissionSample.a;
				transmittance[ i ] = diffuseColor[ i ] * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance )[ i ];
			}
			transmittedLight.a /= 3.0;
		#else
			vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, ior, modelMatrix );
			vec3 refractedRayExit = position + transmissionRay;
			vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
			vec2 refractionCoords = ndcPos.xy / ndcPos.w;
			refractionCoords += 1.0;
			refractionCoords /= 2.0;
			transmittedLight = getTransmissionSample( refractionCoords, roughness, ior );
			transmittance = diffuseColor * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance );
		#endif
		vec3 attenuatedColor = transmittance * transmittedLight.rgb;
		vec3 F = EnvironmentBRDF( n, v, specularColor, specularF90, roughness );
		float transmittanceFactor = ( transmittance.r + transmittance.g + transmittance.b ) / 3.0;
		return vec4( ( 1.0 - F ) * attenuatedColor, 1.0 - ( 1.0 - transmittedLight.a ) * transmittanceFactor );
	}
#endif`,NO=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_SPECULARMAP
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,PO=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	uniform mat3 mapTransform;
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	uniform mat3 alphaMapTransform;
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	uniform mat3 lightMapTransform;
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	uniform mat3 aoMapTransform;
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	uniform mat3 bumpMapTransform;
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	uniform mat3 normalMapTransform;
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_DISPLACEMENTMAP
	uniform mat3 displacementMapTransform;
	varying vec2 vDisplacementMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	uniform mat3 emissiveMapTransform;
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	uniform mat3 metalnessMapTransform;
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	uniform mat3 roughnessMapTransform;
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	uniform mat3 anisotropyMapTransform;
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	uniform mat3 clearcoatMapTransform;
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform mat3 clearcoatNormalMapTransform;
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform mat3 clearcoatRoughnessMapTransform;
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	uniform mat3 sheenColorMapTransform;
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	uniform mat3 sheenRoughnessMapTransform;
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	uniform mat3 iridescenceMapTransform;
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform mat3 iridescenceThicknessMapTransform;
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SPECULARMAP
	uniform mat3 specularMapTransform;
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	uniform mat3 specularColorMapTransform;
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	uniform mat3 specularIntensityMapTransform;
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,OO=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	vUv = vec3( uv, 1 ).xy;
#endif
#ifdef USE_MAP
	vMapUv = ( mapTransform * vec3( MAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ALPHAMAP
	vAlphaMapUv = ( alphaMapTransform * vec3( ALPHAMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_LIGHTMAP
	vLightMapUv = ( lightMapTransform * vec3( LIGHTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_AOMAP
	vAoMapUv = ( aoMapTransform * vec3( AOMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_BUMPMAP
	vBumpMapUv = ( bumpMapTransform * vec3( BUMPMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_NORMALMAP
	vNormalMapUv = ( normalMapTransform * vec3( NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_DISPLACEMENTMAP
	vDisplacementMapUv = ( displacementMapTransform * vec3( DISPLACEMENTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_EMISSIVEMAP
	vEmissiveMapUv = ( emissiveMapTransform * vec3( EMISSIVEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_METALNESSMAP
	vMetalnessMapUv = ( metalnessMapTransform * vec3( METALNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ROUGHNESSMAP
	vRoughnessMapUv = ( roughnessMapTransform * vec3( ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ANISOTROPYMAP
	vAnisotropyMapUv = ( anisotropyMapTransform * vec3( ANISOTROPYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOATMAP
	vClearcoatMapUv = ( clearcoatMapTransform * vec3( CLEARCOATMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	vClearcoatNormalMapUv = ( clearcoatNormalMapTransform * vec3( CLEARCOAT_NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	vClearcoatRoughnessMapUv = ( clearcoatRoughnessMapTransform * vec3( CLEARCOAT_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCEMAP
	vIridescenceMapUv = ( iridescenceMapTransform * vec3( IRIDESCENCEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	vIridescenceThicknessMapUv = ( iridescenceThicknessMapTransform * vec3( IRIDESCENCE_THICKNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_COLORMAP
	vSheenColorMapUv = ( sheenColorMapTransform * vec3( SHEEN_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	vSheenRoughnessMapUv = ( sheenRoughnessMapTransform * vec3( SHEEN_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULARMAP
	vSpecularMapUv = ( specularMapTransform * vec3( SPECULARMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_COLORMAP
	vSpecularColorMapUv = ( specularColorMapTransform * vec3( SPECULAR_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	vSpecularIntensityMapUv = ( specularIntensityMapTransform * vec3( SPECULAR_INTENSITYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_TRANSMISSIONMAP
	vTransmissionMapUv = ( transmissionMapTransform * vec3( TRANSMISSIONMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_THICKNESSMAP
	vThicknessMapUv = ( thicknessMapTransform * vec3( THICKNESSMAP_UV, 1 ) ).xy;
#endif`,LO=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`,FO=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,kO=`uniform sampler2D t2D;
uniform float backgroundIntensity;
varying vec2 vUv;
void main() {
	vec4 texColor = texture2D( t2D, vUv );
	#ifdef DECODE_VIDEO_TEXTURE
		texColor = vec4( mix( pow( texColor.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), texColor.rgb * 0.0773993808, vec3( lessThanEqual( texColor.rgb, vec3( 0.04045 ) ) ) ), texColor.w );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,UO=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,BO=`#ifdef ENVMAP_TYPE_CUBE
	uniform samplerCube envMap;
#elif defined( ENVMAP_TYPE_CUBE_UV )
	uniform sampler2D envMap;
#endif
uniform float flipEnvMap;
uniform float backgroundBlurriness;
uniform float backgroundIntensity;
uniform mat3 backgroundRotation;
varying vec3 vWorldDirection;
#include <cube_uv_reflection_fragment>
void main() {
	#ifdef ENVMAP_TYPE_CUBE
		vec4 texColor = textureCube( envMap, backgroundRotation * vec3( flipEnvMap * vWorldDirection.x, vWorldDirection.yz ) );
	#elif defined( ENVMAP_TYPE_CUBE_UV )
		vec4 texColor = textureCubeUV( envMap, backgroundRotation * vWorldDirection, backgroundBlurriness );
	#else
		vec4 texColor = vec4( 0.0, 0.0, 0.0, 1.0 );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,VO=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,HO=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,zO=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
varying vec2 vHighPrecisionZW;
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vHighPrecisionZW = gl_Position.zw;
}`,GO=`#if DEPTH_PACKING == 3200
	uniform float opacity;
#endif
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
varying vec2 vHighPrecisionZW;
void main() {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#if DEPTH_PACKING == 3200
		diffuseColor.a = opacity;
	#endif
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <logdepthbuf_fragment>
	#ifdef USE_REVERSED_DEPTH_BUFFER
		float fragCoordZ = vHighPrecisionZW[ 0 ] / vHighPrecisionZW[ 1 ];
	#else
		float fragCoordZ = 0.5 * vHighPrecisionZW[ 0 ] / vHighPrecisionZW[ 1 ] + 0.5;
	#endif
	#if DEPTH_PACKING == 3200
		gl_FragColor = vec4( vec3( 1.0 - fragCoordZ ), opacity );
	#elif DEPTH_PACKING == 3201
		gl_FragColor = packDepthToRGBA( fragCoordZ );
	#elif DEPTH_PACKING == 3202
		gl_FragColor = vec4( packDepthToRGB( fragCoordZ ), 1.0 );
	#elif DEPTH_PACKING == 3203
		gl_FragColor = vec4( packDepthToRG( fragCoordZ ), 0.0, 1.0 );
	#endif
}`,jO=`#define DISTANCE
varying vec3 vWorldPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <worldpos_vertex>
	#include <clipping_planes_vertex>
	vWorldPosition = worldPosition.xyz;
}`,WO=`#define DISTANCE
uniform vec3 referencePosition;
uniform float nearDistance;
uniform float farDistance;
varying vec3 vWorldPosition;
#include <common>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <clipping_planes_pars_fragment>
void main () {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	float dist = length( vWorldPosition - referencePosition );
	dist = ( dist - nearDistance ) / ( farDistance - nearDistance );
	dist = saturate( dist );
	gl_FragColor = vec4( dist, 0.0, 0.0, 1.0 );
}`,$O=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,qO=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,XO=`uniform float scale;
attribute float lineDistance;
varying float vLineDistance;
#include <common>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	vLineDistance = scale * lineDistance;
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,YO=`uniform vec3 diffuse;
uniform float opacity;
uniform float dashSize;
uniform float totalSize;
varying float vLineDistance;
#include <common>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	if ( mod( vLineDistance, totalSize ) > dashSize ) {
		discard;
	}
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,ZO=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#if defined ( USE_ENVMAP ) || defined ( USE_SKINNING )
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinbase_vertex>
		#include <skinnormal_vertex>
		#include <defaultnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <fog_vertex>
}`,JO=`uniform vec3 diffuse;
uniform float opacity;
#ifndef FLAT_SHADED
	varying vec3 vNormal;
#endif
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		reflectedLight.indirectDiffuse += lightMapTexel.rgb * lightMapIntensity * RECIPROCAL_PI;
	#else
		reflectedLight.indirectDiffuse += vec3( 1.0 );
	#endif
	#include <aomap_fragment>
	reflectedLight.indirectDiffuse *= diffuseColor.rgb;
	vec3 outgoingLight = reflectedLight.indirectDiffuse;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,KO=`#define LAMBERT
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,QO=`#define LAMBERT
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_lambert_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_lambert_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,eL=`#define MATCAP
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <displacementmap_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
	vViewPosition = - mvPosition.xyz;
}`,tL=`#define MATCAP
uniform vec3 diffuse;
uniform float opacity;
uniform sampler2D matcap;
varying vec3 vViewPosition;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	vec3 viewDir = normalize( vViewPosition );
	vec3 x = normalize( vec3( viewDir.z, 0.0, - viewDir.x ) );
	vec3 y = cross( viewDir, x );
	vec2 uv = vec2( dot( x, normal ), dot( y, normal ) ) * 0.495 + 0.5;
	#ifdef USE_MATCAP
		vec4 matcapColor = texture2D( matcap, uv );
	#else
		vec4 matcapColor = vec4( vec3( mix( 0.2, 0.8, uv.y ) ), 1.0 );
	#endif
	vec3 outgoingLight = diffuseColor.rgb * matcapColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,nL=`#define NORMAL
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	vViewPosition = - mvPosition.xyz;
#endif
}`,iL=`#define NORMAL
uniform float opacity;
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <uv_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( 0.0, 0.0, 0.0, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	gl_FragColor = vec4( normalize( normal ) * 0.5 + 0.5, diffuseColor.a );
	#ifdef OPAQUE
		gl_FragColor.a = 1.0;
	#endif
}`,rL=`#define PHONG
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,sL=`#define PHONG
uniform vec3 diffuse;
uniform vec3 emissive;
uniform vec3 specular;
uniform float shininess;
uniform float opacity;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_phong_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_phong_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + reflectedLight.directSpecular + reflectedLight.indirectSpecular + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,oL=`#define STANDARD
varying vec3 vViewPosition;
#ifdef USE_TRANSMISSION
	varying vec3 vWorldPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
#ifdef USE_TRANSMISSION
	vWorldPosition = worldPosition.xyz;
#endif
}`,aL=`#define STANDARD
#ifdef PHYSICAL
	#define IOR
	#define USE_SPECULAR
#endif
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float roughness;
uniform float metalness;
uniform float opacity;
#ifdef IOR
	uniform float ior;
#endif
#ifdef USE_SPECULAR
	uniform float specularIntensity;
	uniform vec3 specularColor;
	#ifdef USE_SPECULAR_COLORMAP
		uniform sampler2D specularColorMap;
	#endif
	#ifdef USE_SPECULAR_INTENSITYMAP
		uniform sampler2D specularIntensityMap;
	#endif
#endif
#ifdef USE_CLEARCOAT
	uniform float clearcoat;
	uniform float clearcoatRoughness;
#endif
#ifdef USE_DISPERSION
	uniform float dispersion;
#endif
#ifdef USE_IRIDESCENCE
	uniform float iridescence;
	uniform float iridescenceIOR;
	uniform float iridescenceThicknessMinimum;
	uniform float iridescenceThicknessMaximum;
#endif
#ifdef USE_SHEEN
	uniform vec3 sheenColor;
	uniform float sheenRoughness;
	#ifdef USE_SHEEN_COLORMAP
		uniform sampler2D sheenColorMap;
	#endif
	#ifdef USE_SHEEN_ROUGHNESSMAP
		uniform sampler2D sheenRoughnessMap;
	#endif
#endif
#ifdef USE_ANISOTROPY
	uniform vec2 anisotropyVector;
	#ifdef USE_ANISOTROPYMAP
		uniform sampler2D anisotropyMap;
	#endif
#endif
varying vec3 vViewPosition;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <iridescence_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_physical_pars_fragment>
#include <transmission_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <clearcoat_pars_fragment>
#include <iridescence_pars_fragment>
#include <roughnessmap_pars_fragment>
#include <metalnessmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <roughnessmap_fragment>
	#include <metalnessmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <clearcoat_normal_fragment_begin>
	#include <clearcoat_normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_physical_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 totalDiffuse = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse;
	vec3 totalSpecular = reflectedLight.directSpecular + reflectedLight.indirectSpecular;
	#include <transmission_fragment>
	vec3 outgoingLight = totalDiffuse + totalSpecular + totalEmissiveRadiance;
	#ifdef USE_SHEEN
 
		outgoingLight = outgoingLight + sheenSpecularDirect + sheenSpecularIndirect;
 
 	#endif
	#ifdef USE_CLEARCOAT
		float dotNVcc = saturate( dot( geometryClearcoatNormal, geometryViewDir ) );
		vec3 Fcc = F_Schlick( material.clearcoatF0, material.clearcoatF90, dotNVcc );
		outgoingLight = outgoingLight * ( 1.0 - material.clearcoat * Fcc ) + ( clearcoatSpecularDirect + clearcoatSpecularIndirect ) * material.clearcoat;
	#endif
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,cL=`#define TOON
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,lL=`#define TOON
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <gradientmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_toon_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_toon_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,uL=`uniform float size;
uniform float scale;
#include <common>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
#ifdef USE_POINTS_UV
	varying vec2 vUv;
	uniform mat3 uvTransform;
#endif
void main() {
	#ifdef USE_POINTS_UV
		vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	#endif
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	gl_PointSize = size;
	#ifdef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) gl_PointSize *= ( scale / - mvPosition.z );
	#endif
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <fog_vertex>
}`,dL=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <color_pars_fragment>
#include <map_particle_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_particle_fragment>
	#include <color_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,fL=`#include <common>
#include <batching_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <shadowmap_pars_vertex>
void main() {
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,hL=`uniform vec3 color;
uniform float opacity;
#include <common>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <logdepthbuf_pars_fragment>
#include <shadowmap_pars_fragment>
#include <shadowmask_pars_fragment>
void main() {
	#include <logdepthbuf_fragment>
	gl_FragColor = vec4( color, opacity * ( 1.0 - getShadowMask() ) );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,pL=`uniform float rotation;
uniform vec2 center;
#include <common>
#include <uv_pars_vertex>
#include <fog_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	vec4 mvPosition = modelViewMatrix[ 3 ];
	vec2 scale = vec2( length( modelMatrix[ 0 ].xyz ), length( modelMatrix[ 1 ].xyz ) );
	#ifndef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) scale *= - mvPosition.z;
	#endif
	vec2 alignedPosition = ( position.xy - ( center - vec2( 0.5 ) ) ) * scale;
	vec2 rotatedPosition;
	rotatedPosition.x = cos( rotation ) * alignedPosition.x - sin( rotation ) * alignedPosition.y;
	rotatedPosition.y = sin( rotation ) * alignedPosition.x + cos( rotation ) * alignedPosition.y;
	mvPosition.xy += rotatedPosition;
	gl_Position = projectionMatrix * mvPosition;
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,mL=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`,Xe={alphahash_fragment:kN,alphahash_pars_fragment:UN,alphamap_fragment:BN,alphamap_pars_fragment:VN,alphatest_fragment:HN,alphatest_pars_fragment:zN,aomap_fragment:GN,aomap_pars_fragment:jN,batching_pars_vertex:WN,batching_vertex:$N,begin_vertex:qN,beginnormal_vertex:XN,bsdfs:YN,iridescence_fragment:ZN,bumpmap_pars_fragment:JN,clipping_planes_fragment:KN,clipping_planes_pars_fragment:QN,clipping_planes_pars_vertex:eP,clipping_planes_vertex:tP,color_fragment:nP,color_pars_fragment:iP,color_pars_vertex:rP,color_vertex:sP,common:oP,cube_uv_reflection_fragment:aP,defaultnormal_vertex:cP,displacementmap_pars_vertex:lP,displacementmap_vertex:uP,emissivemap_fragment:dP,emissivemap_pars_fragment:fP,colorspace_fragment:hP,colorspace_pars_fragment:pP,envmap_fragment:mP,envmap_common_pars_fragment:gP,envmap_pars_fragment:vP,envmap_pars_vertex:yP,envmap_physical_pars_fragment:IP,envmap_vertex:_P,fog_vertex:xP,fog_pars_vertex:MP,fog_fragment:bP,fog_pars_fragment:SP,gradientmap_pars_fragment:EP,lightmap_pars_fragment:wP,lights_lambert_fragment:CP,lights_lambert_pars_fragment:TP,lights_pars_begin:DP,lights_toon_fragment:AP,lights_toon_pars_fragment:RP,lights_phong_fragment:NP,lights_phong_pars_fragment:PP,lights_physical_fragment:OP,lights_physical_pars_fragment:LP,lights_fragment_begin:FP,lights_fragment_maps:kP,lights_fragment_end:UP,logdepthbuf_fragment:BP,logdepthbuf_pars_fragment:VP,logdepthbuf_pars_vertex:HP,logdepthbuf_vertex:zP,map_fragment:GP,map_pars_fragment:jP,map_particle_fragment:WP,map_particle_pars_fragment:$P,metalnessmap_fragment:qP,metalnessmap_pars_fragment:XP,morphinstance_vertex:YP,morphcolor_vertex:ZP,morphnormal_vertex:JP,morphtarget_pars_vertex:KP,morphtarget_vertex:QP,normal_fragment_begin:eO,normal_fragment_maps:tO,normal_pars_fragment:nO,normal_pars_vertex:iO,normal_vertex:rO,normalmap_pars_fragment:sO,clearcoat_normal_fragment_begin:oO,clearcoat_normal_fragment_maps:aO,clearcoat_pars_fragment:cO,iridescence_pars_fragment:lO,opaque_fragment:uO,packing:dO,premultiplied_alpha_fragment:fO,project_vertex:hO,dithering_fragment:pO,dithering_pars_fragment:mO,roughnessmap_fragment:gO,roughnessmap_pars_fragment:vO,shadowmap_pars_fragment:yO,shadowmap_pars_vertex:_O,shadowmap_vertex:xO,shadowmask_pars_fragment:MO,skinbase_vertex:bO,skinning_pars_vertex:SO,skinning_vertex:EO,skinnormal_vertex:wO,specularmap_fragment:CO,specularmap_pars_fragment:TO,tonemapping_fragment:DO,tonemapping_pars_fragment:IO,transmission_fragment:AO,transmission_pars_fragment:RO,uv_pars_fragment:NO,uv_pars_vertex:PO,uv_vertex:OO,worldpos_vertex:LO,background_vert:FO,background_frag:kO,backgroundCube_vert:UO,backgroundCube_frag:BO,cube_vert:VO,cube_frag:HO,depth_vert:zO,depth_frag:GO,distance_vert:jO,distance_frag:WO,equirect_vert:$O,equirect_frag:qO,linedashed_vert:XO,linedashed_frag:YO,meshbasic_vert:ZO,meshbasic_frag:JO,meshlambert_vert:KO,meshlambert_frag:QO,meshmatcap_vert:eL,meshmatcap_frag:tL,meshnormal_vert:nL,meshnormal_frag:iL,meshphong_vert:rL,meshphong_frag:sL,meshphysical_vert:oL,meshphysical_frag:aL,meshtoon_vert:cL,meshtoon_frag:lL,points_vert:uL,points_frag:dL,shadow_vert:fL,shadow_frag:hL,sprite_vert:pL,sprite_frag:mL},ce={common:{diffuse:{value:new ot(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new We},alphaMap:{value:null},alphaMapTransform:{value:new We},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new We}},envmap:{envMap:{value:null},envMapRotation:{value:new We},flipEnvMap:{value:-1},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98},dfgLUT:{value:null}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new We}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new We}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new We},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new We},normalScale:{value:new rt(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new We},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new We}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new We}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new We}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new ot(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null}},points:{diffuse:{value:new ot(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new We},alphaTest:{value:0},uvTransform:{value:new We}},sprite:{diffuse:{value:new ot(16777215)},opacity:{value:1},center:{value:new rt(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new We},alphaMap:{value:null},alphaMapTransform:{value:new We},alphaTest:{value:0}}},Ki={basic:{uniforms:Sn([ce.common,ce.specularmap,ce.envmap,ce.aomap,ce.lightmap,ce.fog]),vertexShader:Xe.meshbasic_vert,fragmentShader:Xe.meshbasic_frag},lambert:{uniforms:Sn([ce.common,ce.specularmap,ce.envmap,ce.aomap,ce.lightmap,ce.emissivemap,ce.bumpmap,ce.normalmap,ce.displacementmap,ce.fog,ce.lights,{emissive:{value:new ot(0)},envMapIntensity:{value:1}}]),vertexShader:Xe.meshlambert_vert,fragmentShader:Xe.meshlambert_frag},phong:{uniforms:Sn([ce.common,ce.specularmap,ce.envmap,ce.aomap,ce.lightmap,ce.emissivemap,ce.bumpmap,ce.normalmap,ce.displacementmap,ce.fog,ce.lights,{emissive:{value:new ot(0)},specular:{value:new ot(1118481)},shininess:{value:30},envMapIntensity:{value:1}}]),vertexShader:Xe.meshphong_vert,fragmentShader:Xe.meshphong_frag},standard:{uniforms:Sn([ce.common,ce.envmap,ce.aomap,ce.lightmap,ce.emissivemap,ce.bumpmap,ce.normalmap,ce.displacementmap,ce.roughnessmap,ce.metalnessmap,ce.fog,ce.lights,{emissive:{value:new ot(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:Xe.meshphysical_vert,fragmentShader:Xe.meshphysical_frag},toon:{uniforms:Sn([ce.common,ce.aomap,ce.lightmap,ce.emissivemap,ce.bumpmap,ce.normalmap,ce.displacementmap,ce.gradientmap,ce.fog,ce.lights,{emissive:{value:new ot(0)}}]),vertexShader:Xe.meshtoon_vert,fragmentShader:Xe.meshtoon_frag},matcap:{uniforms:Sn([ce.common,ce.bumpmap,ce.normalmap,ce.displacementmap,ce.fog,{matcap:{value:null}}]),vertexShader:Xe.meshmatcap_vert,fragmentShader:Xe.meshmatcap_frag},points:{uniforms:Sn([ce.points,ce.fog]),vertexShader:Xe.points_vert,fragmentShader:Xe.points_frag},dashed:{uniforms:Sn([ce.common,ce.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:Xe.linedashed_vert,fragmentShader:Xe.linedashed_frag},depth:{uniforms:Sn([ce.common,ce.displacementmap]),vertexShader:Xe.depth_vert,fragmentShader:Xe.depth_frag},normal:{uniforms:Sn([ce.common,ce.bumpmap,ce.normalmap,ce.displacementmap,{opacity:{value:1}}]),vertexShader:Xe.meshnormal_vert,fragmentShader:Xe.meshnormal_frag},sprite:{uniforms:Sn([ce.sprite,ce.fog]),vertexShader:Xe.sprite_vert,fragmentShader:Xe.sprite_frag},background:{uniforms:{uvTransform:{value:new We},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:Xe.background_vert,fragmentShader:Xe.background_frag},backgroundCube:{uniforms:{envMap:{value:null},flipEnvMap:{value:-1},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new We}},vertexShader:Xe.backgroundCube_vert,fragmentShader:Xe.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:Xe.cube_vert,fragmentShader:Xe.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:Xe.equirect_vert,fragmentShader:Xe.equirect_frag},distance:{uniforms:Sn([ce.common,ce.displacementmap,{referencePosition:{value:new F},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:Xe.distance_vert,fragmentShader:Xe.distance_frag},shadow:{uniforms:Sn([ce.lights,ce.fog,{color:{value:new ot(0)},opacity:{value:1}}]),vertexShader:Xe.shadow_vert,fragmentShader:Xe.shadow_frag}};Ki.physical={uniforms:Sn([Ki.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new We},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new We},clearcoatNormalScale:{value:new rt(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new We},dispersion:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new We},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new We},sheen:{value:0},sheenColor:{value:new ot(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new We},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new We},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new We},transmissionSamplerSize:{value:new rt},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new We},attenuationDistance:{value:0},attenuationColor:{value:new ot(0)},specularColor:{value:new ot(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new We},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new We},anisotropyVector:{value:new rt},anisotropyMap:{value:null},anisotropyMapTransform:{value:new We}}]),vertexShader:Xe.meshphysical_vert,fragmentShader:Xe.meshphysical_frag};var sp={r:0,b:0,g:0},uo=new ss,gL=new Rt;function vL(n,e,t,i,r,s){let o=new ot(0),a=r===!0?0:1,c,l,u=null,d=0,f=null;function h(M){let w=M.isScene===!0?M.background:null;if(w&&w.isTexture){let S=M.backgroundBlurriness>0;w=e.get(w,S)}return w}function g(M){let w=!1,S=h(M);S===null?m(o,a):S&&S.isColor&&(m(S,1),w=!0);let D=n.xr.getEnvironmentBlendMode();D==="additive"?t.buffers.color.setClear(0,0,0,1,s):D==="alpha-blend"&&t.buffers.color.setClear(0,0,0,0,s),(n.autoClear||w)&&(t.buffers.depth.setTest(!0),t.buffers.depth.setMask(!0),t.buffers.color.setMask(!0),n.clear(n.autoClearColor,n.autoClearDepth,n.autoClearStencil))}function _(M,w){let S=h(w);S&&(S.isCubeTexture||S.mapping===wl)?(l===void 0&&(l=new an(new Aa(1,1,1),new Qn({name:"BackgroundCubeMaterial",uniforms:lo(Ki.backgroundCube.uniforms),vertexShader:Ki.backgroundCube.vertexShader,fragmentShader:Ki.backgroundCube.fragmentShader,side:Nn,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),l.geometry.deleteAttribute("normal"),l.geometry.deleteAttribute("uv"),l.onBeforeRender=function(D,C,A){this.matrixWorld.copyPosition(A.matrixWorld)},Object.defineProperty(l.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),i.update(l)),uo.copy(w.backgroundRotation),uo.x*=-1,uo.y*=-1,uo.z*=-1,S.isCubeTexture&&S.isRenderTargetTexture===!1&&(uo.y*=-1,uo.z*=-1),l.material.uniforms.envMap.value=S,l.material.uniforms.flipEnvMap.value=S.isCubeTexture&&S.isRenderTargetTexture===!1?-1:1,l.material.uniforms.backgroundBlurriness.value=w.backgroundBlurriness,l.material.uniforms.backgroundIntensity.value=w.backgroundIntensity,l.material.uniforms.backgroundRotation.value.setFromMatrix4(gL.makeRotationFromEuler(uo)),l.material.toneMapped=st.getTransfer(S.colorSpace)!==gt,(u!==S||d!==S.version||f!==n.toneMapping)&&(l.material.needsUpdate=!0,u=S,d=S.version,f=n.toneMapping),l.layers.enableAll(),M.unshift(l,l.geometry,l.material,0,0,null)):S&&S.isTexture&&(c===void 0&&(c=new an(new vl(2,2),new Qn({name:"BackgroundMaterial",uniforms:lo(Ki.background.uniforms),vertexShader:Ki.background.vertexShader,fragmentShader:Ki.background.fragmentShader,side:Tr,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),c.geometry.deleteAttribute("normal"),Object.defineProperty(c.material,"map",{get:function(){return this.uniforms.t2D.value}}),i.update(c)),c.material.uniforms.t2D.value=S,c.material.uniforms.backgroundIntensity.value=w.backgroundIntensity,c.material.toneMapped=st.getTransfer(S.colorSpace)!==gt,S.matrixAutoUpdate===!0&&S.updateMatrix(),c.material.uniforms.uvTransform.value.copy(S.matrix),(u!==S||d!==S.version||f!==n.toneMapping)&&(c.material.needsUpdate=!0,u=S,d=S.version,f=n.toneMapping),c.layers.enableAll(),M.unshift(c,c.geometry,c.material,0,0,null))}function m(M,w){M.getRGB(sp,Qy(n)),t.buffers.color.setClear(sp.r,sp.g,sp.b,w,s)}function p(){l!==void 0&&(l.geometry.dispose(),l.material.dispose(),l=void 0),c!==void 0&&(c.geometry.dispose(),c.material.dispose(),c=void 0)}return{getClearColor:function(){return o},setClearColor:function(M,w=1){o.set(M),a=w,m(o,a)},getClearAlpha:function(){return a},setClearAlpha:function(M){a=M,m(o,a)},render:g,addToRenderList:_,dispose:p}}function yL(n,e){let t=n.getParameter(n.MAX_VERTEX_ATTRIBS),i={},r=f(null),s=r,o=!1;function a(T,O,k,G,B){let H=!1,L=d(T,G,k,O);s!==L&&(s=L,l(s.object)),H=h(T,G,k,B),H&&g(T,G,k,B),B!==null&&e.update(B,n.ELEMENT_ARRAY_BUFFER),(H||o)&&(o=!1,S(T,O,k,G),B!==null&&n.bindBuffer(n.ELEMENT_ARRAY_BUFFER,e.get(B).buffer))}function c(){return n.createVertexArray()}function l(T){return n.bindVertexArray(T)}function u(T){return n.deleteVertexArray(T)}function d(T,O,k,G){let B=G.wireframe===!0,H=i[O.id];H===void 0&&(H={},i[O.id]=H);let L=T.isInstancedMesh===!0?T.id:0,ee=H[L];ee===void 0&&(ee={},H[L]=ee);let Z=ee[k.id];Z===void 0&&(Z={},ee[k.id]=Z);let de=Z[B];return de===void 0&&(de=f(c()),Z[B]=de),de}function f(T){let O=[],k=[],G=[];for(let B=0;B<t;B++)O[B]=0,k[B]=0,G[B]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:O,enabledAttributes:k,attributeDivisors:G,object:T,attributes:{},index:null}}function h(T,O,k,G){let B=s.attributes,H=O.attributes,L=0,ee=k.getAttributes();for(let Z in ee)if(ee[Z].location>=0){let ve=B[Z],he=H[Z];if(he===void 0&&(Z==="instanceMatrix"&&T.instanceMatrix&&(he=T.instanceMatrix),Z==="instanceColor"&&T.instanceColor&&(he=T.instanceColor)),ve===void 0||ve.attribute!==he||he&&ve.data!==he.data)return!0;L++}return s.attributesNum!==L||s.index!==G}function g(T,O,k,G){let B={},H=O.attributes,L=0,ee=k.getAttributes();for(let Z in ee)if(ee[Z].location>=0){let ve=H[Z];ve===void 0&&(Z==="instanceMatrix"&&T.instanceMatrix&&(ve=T.instanceMatrix),Z==="instanceColor"&&T.instanceColor&&(ve=T.instanceColor));let he={};he.attribute=ve,ve&&ve.data&&(he.data=ve.data),B[Z]=he,L++}s.attributes=B,s.attributesNum=L,s.index=G}function _(){let T=s.newAttributes;for(let O=0,k=T.length;O<k;O++)T[O]=0}function m(T){p(T,0)}function p(T,O){let k=s.newAttributes,G=s.enabledAttributes,B=s.attributeDivisors;k[T]=1,G[T]===0&&(n.enableVertexAttribArray(T),G[T]=1),B[T]!==O&&(n.vertexAttribDivisor(T,O),B[T]=O)}function M(){let T=s.newAttributes,O=s.enabledAttributes;for(let k=0,G=O.length;k<G;k++)O[k]!==T[k]&&(n.disableVertexAttribArray(k),O[k]=0)}function w(T,O,k,G,B,H,L){L===!0?n.vertexAttribIPointer(T,O,k,B,H):n.vertexAttribPointer(T,O,k,G,B,H)}function S(T,O,k,G){_();let B=G.attributes,H=k.getAttributes(),L=O.defaultAttributeValues;for(let ee in H){let Z=H[ee];if(Z.location>=0){let de=B[ee];if(de===void 0&&(ee==="instanceMatrix"&&T.instanceMatrix&&(de=T.instanceMatrix),ee==="instanceColor"&&T.instanceColor&&(de=T.instanceColor)),de!==void 0){let ve=de.normalized,he=de.itemSize,qe=e.get(de);if(qe===void 0)continue;let Nt=qe.buffer,At=qe.type,X=qe.bytesPerElement,ie=At===n.INT||At===n.UNSIGNED_INT||de.gpuType===_h;if(de.isInterleavedBufferAttribute){let oe=de.data,$e=oe.stride,Ae=de.offset;if(oe.isInstancedInterleavedBuffer){for(let ke=0;ke<Z.locationSize;ke++)p(Z.location+ke,oe.meshPerAttribute);T.isInstancedMesh!==!0&&G._maxInstanceCount===void 0&&(G._maxInstanceCount=oe.meshPerAttribute*oe.count)}else for(let ke=0;ke<Z.locationSize;ke++)m(Z.location+ke);n.bindBuffer(n.ARRAY_BUFFER,Nt);for(let ke=0;ke<Z.locationSize;ke++)w(Z.location+ke,he/Z.locationSize,At,ve,$e*X,(Ae+he/Z.locationSize*ke)*X,ie)}else{if(de.isInstancedBufferAttribute){for(let oe=0;oe<Z.locationSize;oe++)p(Z.location+oe,de.meshPerAttribute);T.isInstancedMesh!==!0&&G._maxInstanceCount===void 0&&(G._maxInstanceCount=de.meshPerAttribute*de.count)}else for(let oe=0;oe<Z.locationSize;oe++)m(Z.location+oe);n.bindBuffer(n.ARRAY_BUFFER,Nt);for(let oe=0;oe<Z.locationSize;oe++)w(Z.location+oe,he/Z.locationSize,At,ve,he*X,he/Z.locationSize*oe*X,ie)}}else if(L!==void 0){let ve=L[ee];if(ve!==void 0)switch(ve.length){case 2:n.vertexAttrib2fv(Z.location,ve);break;case 3:n.vertexAttrib3fv(Z.location,ve);break;case 4:n.vertexAttrib4fv(Z.location,ve);break;default:n.vertexAttrib1fv(Z.location,ve)}}}}M()}function D(){b();for(let T in i){let O=i[T];for(let k in O){let G=O[k];for(let B in G){let H=G[B];for(let L in H)u(H[L].object),delete H[L];delete G[B]}}delete i[T]}}function C(T){if(i[T.id]===void 0)return;let O=i[T.id];for(let k in O){let G=O[k];for(let B in G){let H=G[B];for(let L in H)u(H[L].object),delete H[L];delete G[B]}}delete i[T.id]}function A(T){for(let O in i){let k=i[O];for(let G in k){let B=k[G];if(B[T.id]===void 0)continue;let H=B[T.id];for(let L in H)u(H[L].object),delete H[L];delete B[T.id]}}}function y(T){for(let O in i){let k=i[O],G=T.isInstancedMesh===!0?T.id:0,B=k[G];if(B!==void 0){for(let H in B){let L=B[H];for(let ee in L)u(L[ee].object),delete L[ee];delete B[H]}delete k[G],Object.keys(k).length===0&&delete i[O]}}}function b(){j(),o=!0,s!==r&&(s=r,l(s.object))}function j(){r.geometry=null,r.program=null,r.wireframe=!1}return{setup:a,reset:b,resetDefaultState:j,dispose:D,releaseStatesOfGeometry:C,releaseStatesOfObject:y,releaseStatesOfProgram:A,initAttributes:_,enableAttribute:m,disableUnusedAttributes:M}}function _L(n,e,t){let i;function r(l){i=l}function s(l,u){n.drawArrays(i,l,u),t.update(u,i,1)}function o(l,u,d){d!==0&&(n.drawArraysInstanced(i,l,u,d),t.update(u,i,d))}function a(l,u,d){if(d===0)return;e.get("WEBGL_multi_draw").multiDrawArraysWEBGL(i,l,0,u,0,d);let h=0;for(let g=0;g<d;g++)h+=u[g];t.update(h,i,1)}function c(l,u,d,f){if(d===0)return;let h=e.get("WEBGL_multi_draw");if(h===null)for(let g=0;g<l.length;g++)o(l[g],u[g],f[g]);else{h.multiDrawArraysInstancedWEBGL(i,l,0,u,0,f,0,d);let g=0;for(let _=0;_<d;_++)g+=u[_]*f[_];t.update(g,i,1)}}this.setMode=r,this.render=s,this.renderInstances=o,this.renderMultiDraw=a,this.renderMultiDrawInstances=c}function xL(n,e,t,i){let r;function s(){if(r!==void 0)return r;if(e.has("EXT_texture_filter_anisotropic")===!0){let A=e.get("EXT_texture_filter_anisotropic");r=n.getParameter(A.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else r=0;return r}function o(A){return!(A!==hi&&i.convert(A)!==n.getParameter(n.IMPLEMENTATION_COLOR_READ_FORMAT))}function a(A){let y=A===Zi&&(e.has("EXT_color_buffer_half_float")||e.has("EXT_color_buffer_float"));return!(A!==Vn&&i.convert(A)!==n.getParameter(n.IMPLEMENTATION_COLOR_READ_TYPE)&&A!==Oi&&!y)}function c(A){if(A==="highp"){if(n.getShaderPrecisionFormat(n.VERTEX_SHADER,n.HIGH_FLOAT).precision>0&&n.getShaderPrecisionFormat(n.FRAGMENT_SHADER,n.HIGH_FLOAT).precision>0)return"highp";A="mediump"}return A==="mediump"&&n.getShaderPrecisionFormat(n.VERTEX_SHADER,n.MEDIUM_FLOAT).precision>0&&n.getShaderPrecisionFormat(n.FRAGMENT_SHADER,n.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let l=t.precision!==void 0?t.precision:"highp",u=c(l);u!==l&&(Fe("WebGLRenderer:",l,"not supported, using",u,"instead."),l=u);let d=t.logarithmicDepthBuffer===!0,f=t.reversedDepthBuffer===!0&&e.has("EXT_clip_control"),h=n.getParameter(n.MAX_TEXTURE_IMAGE_UNITS),g=n.getParameter(n.MAX_VERTEX_TEXTURE_IMAGE_UNITS),_=n.getParameter(n.MAX_TEXTURE_SIZE),m=n.getParameter(n.MAX_CUBE_MAP_TEXTURE_SIZE),p=n.getParameter(n.MAX_VERTEX_ATTRIBS),M=n.getParameter(n.MAX_VERTEX_UNIFORM_VECTORS),w=n.getParameter(n.MAX_VARYING_VECTORS),S=n.getParameter(n.MAX_FRAGMENT_UNIFORM_VECTORS),D=n.getParameter(n.MAX_SAMPLES),C=n.getParameter(n.SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:s,getMaxPrecision:c,textureFormatReadable:o,textureTypeReadable:a,precision:l,logarithmicDepthBuffer:d,reversedDepthBuffer:f,maxTextures:h,maxVertexTextures:g,maxTextureSize:_,maxCubemapSize:m,maxAttributes:p,maxVertexUniforms:M,maxVaryings:w,maxFragmentUniforms:S,maxSamples:D,samples:C}}function ML(n){let e=this,t=null,i=0,r=!1,s=!1,o=new Gi,a=new We,c={value:null,needsUpdate:!1};this.uniform=c,this.numPlanes=0,this.numIntersection=0,this.init=function(d,f){let h=d.length!==0||f||i!==0||r;return r=f,i=d.length,h},this.beginShadows=function(){s=!0,u(null)},this.endShadows=function(){s=!1},this.setGlobalState=function(d,f){t=u(d,f,0)},this.setState=function(d,f,h){let g=d.clippingPlanes,_=d.clipIntersection,m=d.clipShadows,p=n.get(d);if(!r||g===null||g.length===0||s&&!m)s?u(null):l();else{let M=s?0:i,w=M*4,S=p.clippingState||null;c.value=S,S=u(g,f,w,h);for(let D=0;D!==w;++D)S[D]=t[D];p.clippingState=S,this.numIntersection=_?this.numPlanes:0,this.numPlanes+=M}};function l(){c.value!==t&&(c.value=t,c.needsUpdate=i>0),e.numPlanes=i,e.numIntersection=0}function u(d,f,h,g){let _=d!==null?d.length:0,m=null;if(_!==0){if(m=c.value,g!==!0||m===null){let p=h+_*4,M=f.matrixWorldInverse;a.getNormalMatrix(M),(m===null||m.length<p)&&(m=new Float32Array(p));for(let w=0,S=h;w!==_;++w,S+=4)o.copy(d[w]).applyMatrix4(M,a),o.normal.toArray(m,S),m[S+3]=o.constant}c.value=m,c.needsUpdate=!0}return e.numPlanes=_,e.numIntersection=0,m}}var ms=4,FE=[.125,.215,.35,.446,.526,.582],ho=20,bL=256,Nl=new Pa,kE=new ot,i_=null,r_=0,s_=0,o_=!1,SL=new F,ap=class{constructor(e){this._renderer=e,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._sizeLods=[],this._sigmas=[],this._lodMeshes=[],this._backgroundBox=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._blurMaterial=null,this._ggxMaterial=null}fromScene(e,t=0,i=.1,r=100,s={}){let{size:o=256,position:a=SL}=s;i_=this._renderer.getRenderTarget(),r_=this._renderer.getActiveCubeFace(),s_=this._renderer.getActiveMipmapLevel(),o_=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(o);let c=this._allocateTargets();return c.depthBuffer=!0,this._sceneToCubeUV(e,i,r,c,a),t>0&&this._blur(c,0,0,t),this._applyPMREM(c),this._cleanup(c),c}fromEquirectangular(e,t=null){return this._fromTexture(e,t)}fromCubemap(e,t=null){return this._fromTexture(e,t)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=VE(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=BE(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose(),this._backgroundBox!==null&&(this._backgroundBox.geometry.dispose(),this._backgroundBox.material.dispose())}_setSize(e){this._lodMax=Math.floor(Math.log2(e)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._ggxMaterial!==null&&this._ggxMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let e=0;e<this._lodMeshes.length;e++)this._lodMeshes[e].geometry.dispose()}_cleanup(e){this._renderer.setRenderTarget(i_,r_,s_),this._renderer.xr.enabled=o_,e.scissorTest=!1,Ua(e,0,0,e.width,e.height)}_fromTexture(e,t){e.mapping===fs||e.mapping===ao?this._setSize(e.image.length===0?16:e.image[0].width||e.image[0].image.width):this._setSize(e.image.width/4),i_=this._renderer.getRenderTarget(),r_=this._renderer.getActiveCubeFace(),s_=this._renderer.getActiveMipmapLevel(),o_=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;let i=t||this._allocateTargets();return this._textureToCubeUV(e,i),this._applyPMREM(i),this._cleanup(i),i}_allocateTargets(){let e=3*Math.max(this._cubeSize,112),t=4*this._cubeSize,i={magFilter:hn,minFilter:hn,generateMipmaps:!1,type:Zi,format:hi,colorSpace:oo,depthBuffer:!1},r=UE(e,t,i);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==e||this._pingPongRenderTarget.height!==t){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=UE(e,t,i);let{_lodMax:s}=this;({lodMeshes:this._lodMeshes,sizeLods:this._sizeLods,sigmas:this._sigmas}=EL(s)),this._blurMaterial=CL(s,e,t),this._ggxMaterial=wL(s,e,t)}return r}_compileMaterial(e){let t=new an(new Kn,e);this._renderer.compile(t,Nl)}_sceneToCubeUV(e,t,i,r,s){let c=new bn(90,1,t,i),l=[1,-1,1,1,1,1],u=[1,1,1,-1,-1,-1],d=this._renderer,f=d.autoClear,h=d.toneMapping;d.getClearColor(kE),d.toneMapping=Ni,d.autoClear=!1,d.state.buffers.depth.getReversed()&&(d.setRenderTarget(r),d.clearDepth(),d.setRenderTarget(null)),this._backgroundBox===null&&(this._backgroundBox=new an(new Aa,new qi({name:"PMREM.Background",side:Nn,depthWrite:!1,depthTest:!1})));let _=this._backgroundBox,m=_.material,p=!1,M=e.background;M?M.isColor&&(m.color.copy(M),e.background=null,p=!0):(m.color.copy(kE),p=!0);for(let w=0;w<6;w++){let S=w%3;S===0?(c.up.set(0,l[w],0),c.position.set(s.x,s.y,s.z),c.lookAt(s.x+u[w],s.y,s.z)):S===1?(c.up.set(0,0,l[w]),c.position.set(s.x,s.y,s.z),c.lookAt(s.x,s.y+u[w],s.z)):(c.up.set(0,l[w],0),c.position.set(s.x,s.y,s.z),c.lookAt(s.x,s.y,s.z+u[w]));let D=this._cubeSize;Ua(r,S*D,w>2?D:0,D,D),d.setRenderTarget(r),p&&d.render(_,c),d.render(e,c)}d.toneMapping=h,d.autoClear=f,e.background=M}_textureToCubeUV(e,t){let i=this._renderer,r=e.mapping===fs||e.mapping===ao;r?(this._cubemapMaterial===null&&(this._cubemapMaterial=VE()),this._cubemapMaterial.uniforms.flipEnvMap.value=e.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=BE());let s=r?this._cubemapMaterial:this._equirectMaterial,o=this._lodMeshes[0];o.material=s;let a=s.uniforms;a.envMap.value=e;let c=this._cubeSize;Ua(t,0,0,3*c,2*c),i.setRenderTarget(t),i.render(o,Nl)}_applyPMREM(e){let t=this._renderer,i=t.autoClear;t.autoClear=!1;let r=this._lodMeshes.length;for(let s=1;s<r;s++)this._applyGGXFilter(e,s-1,s);t.autoClear=i}_applyGGXFilter(e,t,i){let r=this._renderer,s=this._pingPongRenderTarget,o=this._ggxMaterial,a=this._lodMeshes[i];a.material=o;let c=o.uniforms,l=i/(this._lodMeshes.length-1),u=t/(this._lodMeshes.length-1),d=Math.sqrt(l*l-u*u),f=0+l*1.25,h=d*f,{_lodMax:g}=this,_=this._sizeLods[i],m=3*_*(i>g-ms?i-g+ms:0),p=4*(this._cubeSize-_);c.envMap.value=e.texture,c.roughness.value=h,c.mipInt.value=g-t,Ua(s,m,p,3*_,2*_),r.setRenderTarget(s),r.render(a,Nl),c.envMap.value=s.texture,c.roughness.value=0,c.mipInt.value=g-i,Ua(e,m,p,3*_,2*_),r.setRenderTarget(e),r.render(a,Nl)}_blur(e,t,i,r,s){let o=this._pingPongRenderTarget;this._halfBlur(e,o,t,i,r,"latitudinal",s),this._halfBlur(o,e,i,i,r,"longitudinal",s)}_halfBlur(e,t,i,r,s,o,a){let c=this._renderer,l=this._blurMaterial;o!=="latitudinal"&&o!=="longitudinal"&&Ne("blur direction must be either latitudinal or longitudinal!");let u=3,d=this._lodMeshes[r];d.material=l;let f=l.uniforms,h=this._sizeLods[i]-1,g=isFinite(s)?Math.PI/(2*h):2*Math.PI/(2*ho-1),_=s/g,m=isFinite(s)?1+Math.floor(u*_):ho;m>ho&&Fe(`sigmaRadians, ${s}, is too large and will clip, as it requested ${m} samples when the maximum is set to ${ho}`);let p=[],M=0;for(let A=0;A<ho;++A){let y=A/_,b=Math.exp(-y*y/2);p.push(b),A===0?M+=b:A<m&&(M+=2*b)}for(let A=0;A<p.length;A++)p[A]=p[A]/M;f.envMap.value=e.texture,f.samples.value=m,f.weights.value=p,f.latitudinal.value=o==="latitudinal",a&&(f.poleAxis.value=a);let{_lodMax:w}=this;f.dTheta.value=g,f.mipInt.value=w-i;let S=this._sizeLods[r],D=3*S*(r>w-ms?r-w+ms:0),C=4*(this._cubeSize-S);Ua(t,D,C,3*S,2*S),c.setRenderTarget(t),c.render(d,Nl)}};function EL(n){let e=[],t=[],i=[],r=n,s=n-ms+1+FE.length;for(let o=0;o<s;o++){let a=Math.pow(2,r);e.push(a);let c=1/a;o>n-ms?c=FE[o-n+ms-1]:o===0&&(c=0),t.push(c);let l=1/(a-2),u=-l,d=1+l,f=[u,u,d,u,d,d,u,u,d,d,u,d],h=6,g=6,_=3,m=2,p=1,M=new Float32Array(_*g*h),w=new Float32Array(m*g*h),S=new Float32Array(p*g*h);for(let C=0;C<h;C++){let A=C%3*2/3-1,y=C>2?0:-1,b=[A,y,0,A+2/3,y,0,A+2/3,y+1,0,A,y,0,A+2/3,y+1,0,A,y+1,0];M.set(b,_*g*C),w.set(f,m*g*C);let j=[C,C,C,C,C,C];S.set(j,p*g*C)}let D=new Kn;D.setAttribute("position",new Zn(M,_)),D.setAttribute("uv",new Zn(w,m)),D.setAttribute("faceIndex",new Zn(S,p)),i.push(new an(D,null)),r>ms&&r--}return{lodMeshes:i,sizeLods:e,sigmas:t}}function UE(n,e,t){let i=new Jn(n,e,t);return i.texture.mapping=wl,i.texture.name="PMREM.cubeUv",i.scissorTest=!0,i}function Ua(n,e,t,i,r){n.viewport.set(e,t,i,r),n.scissor.set(e,t,i,r)}function wL(n,e,t){return new Qn({name:"PMREMGGXConvolution",defines:{GGX_SAMPLES:bL,CUBEUV_TEXEL_WIDTH:1/e,CUBEUV_TEXEL_HEIGHT:1/t,CUBEUV_MAX_MIP:`${n}.0`},uniforms:{envMap:{value:null},roughness:{value:0},mipInt:{value:0}},vertexShader:up(),fragmentShader:`

			precision highp float;
			precision highp int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;
			uniform float roughness;
			uniform float mipInt;

			#define ENVMAP_TYPE_CUBE_UV
			#include <cube_uv_reflection_fragment>

			#define PI 3.14159265359

			// Van der Corput radical inverse
			float radicalInverse_VdC(uint bits) {
				bits = (bits << 16u) | (bits >> 16u);
				bits = ((bits & 0x55555555u) << 1u) | ((bits & 0xAAAAAAAAu) >> 1u);
				bits = ((bits & 0x33333333u) << 2u) | ((bits & 0xCCCCCCCCu) >> 2u);
				bits = ((bits & 0x0F0F0F0Fu) << 4u) | ((bits & 0xF0F0F0F0u) >> 4u);
				bits = ((bits & 0x00FF00FFu) << 8u) | ((bits & 0xFF00FF00u) >> 8u);
				return float(bits) * 2.3283064365386963e-10; // / 0x100000000
			}

			// Hammersley sequence
			vec2 hammersley(uint i, uint N) {
				return vec2(float(i) / float(N), radicalInverse_VdC(i));
			}

			// GGX VNDF importance sampling (Eric Heitz 2018)
			// "Sampling the GGX Distribution of Visible Normals"
			// https://jcgt.org/published/0007/04/01/
			vec3 importanceSampleGGX_VNDF(vec2 Xi, vec3 V, float roughness) {
				float alpha = roughness * roughness;

				// Section 4.1: Orthonormal basis
				vec3 T1 = vec3(1.0, 0.0, 0.0);
				vec3 T2 = cross(V, T1);

				// Section 4.2: Parameterization of projected area
				float r = sqrt(Xi.x);
				float phi = 2.0 * PI * Xi.y;
				float t1 = r * cos(phi);
				float t2 = r * sin(phi);
				float s = 0.5 * (1.0 + V.z);
				t2 = (1.0 - s) * sqrt(1.0 - t1 * t1) + s * t2;

				// Section 4.3: Reprojection onto hemisphere
				vec3 Nh = t1 * T1 + t2 * T2 + sqrt(max(0.0, 1.0 - t1 * t1 - t2 * t2)) * V;

				// Section 3.4: Transform back to ellipsoid configuration
				return normalize(vec3(alpha * Nh.x, alpha * Nh.y, max(0.0, Nh.z)));
			}

			void main() {
				vec3 N = normalize(vOutputDirection);
				vec3 V = N; // Assume view direction equals normal for pre-filtering

				vec3 prefilteredColor = vec3(0.0);
				float totalWeight = 0.0;

				// For very low roughness, just sample the environment directly
				if (roughness < 0.001) {
					gl_FragColor = vec4(bilinearCubeUV(envMap, N, mipInt), 1.0);
					return;
				}

				// Tangent space basis for VNDF sampling
				vec3 up = abs(N.z) < 0.999 ? vec3(0.0, 0.0, 1.0) : vec3(1.0, 0.0, 0.0);
				vec3 tangent = normalize(cross(up, N));
				vec3 bitangent = cross(N, tangent);

				for(uint i = 0u; i < uint(GGX_SAMPLES); i++) {
					vec2 Xi = hammersley(i, uint(GGX_SAMPLES));

					// For PMREM, V = N, so in tangent space V is always (0, 0, 1)
					vec3 H_tangent = importanceSampleGGX_VNDF(Xi, vec3(0.0, 0.0, 1.0), roughness);

					// Transform H back to world space
					vec3 H = normalize(tangent * H_tangent.x + bitangent * H_tangent.y + N * H_tangent.z);
					vec3 L = normalize(2.0 * dot(V, H) * H - V);

					float NdotL = max(dot(N, L), 0.0);

					if(NdotL > 0.0) {
						// Sample environment at fixed mip level
						// VNDF importance sampling handles the distribution filtering
						vec3 sampleColor = bilinearCubeUV(envMap, L, mipInt);

						// Weight by NdotL for the split-sum approximation
						// VNDF PDF naturally accounts for the visible microfacet distribution
						prefilteredColor += sampleColor * NdotL;
						totalWeight += NdotL;
					}
				}

				if (totalWeight > 0.0) {
					prefilteredColor = prefilteredColor / totalWeight;
				}

				gl_FragColor = vec4(prefilteredColor, 1.0);
			}
		`,blending:Yi,depthTest:!1,depthWrite:!1})}function CL(n,e,t){let i=new Float32Array(ho),r=new F(0,1,0);return new Qn({name:"SphericalGaussianBlur",defines:{n:ho,CUBEUV_TEXEL_WIDTH:1/e,CUBEUV_TEXEL_HEIGHT:1/t,CUBEUV_MAX_MIP:`${n}.0`},uniforms:{envMap:{value:null},samples:{value:1},weights:{value:i},latitudinal:{value:!1},dTheta:{value:0},mipInt:{value:0},poleAxis:{value:r}},vertexShader:up(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;
			uniform int samples;
			uniform float weights[ n ];
			uniform bool latitudinal;
			uniform float dTheta;
			uniform float mipInt;
			uniform vec3 poleAxis;

			#define ENVMAP_TYPE_CUBE_UV
			#include <cube_uv_reflection_fragment>

			vec3 getSample( float theta, vec3 axis ) {

				float cosTheta = cos( theta );
				// Rodrigues' axis-angle rotation
				vec3 sampleDirection = vOutputDirection * cosTheta
					+ cross( axis, vOutputDirection ) * sin( theta )
					+ axis * dot( axis, vOutputDirection ) * ( 1.0 - cosTheta );

				return bilinearCubeUV( envMap, sampleDirection, mipInt );

			}

			void main() {

				vec3 axis = latitudinal ? poleAxis : cross( poleAxis, vOutputDirection );

				if ( all( equal( axis, vec3( 0.0 ) ) ) ) {

					axis = vec3( vOutputDirection.z, 0.0, - vOutputDirection.x );

				}

				axis = normalize( axis );

				gl_FragColor = vec4( 0.0, 0.0, 0.0, 1.0 );
				gl_FragColor.rgb += weights[ 0 ] * getSample( 0.0, axis );

				for ( int i = 1; i < n; i++ ) {

					if ( i >= samples ) {

						break;

					}

					float theta = dTheta * float( i );
					gl_FragColor.rgb += weights[ i ] * getSample( -1.0 * theta, axis );
					gl_FragColor.rgb += weights[ i ] * getSample( theta, axis );

				}

			}
		`,blending:Yi,depthTest:!1,depthWrite:!1})}function BE(){return new Qn({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:up(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;

			#include <common>

			void main() {

				vec3 outputDirection = normalize( vOutputDirection );
				vec2 uv = equirectUv( outputDirection );

				gl_FragColor = vec4( texture2D ( envMap, uv ).rgb, 1.0 );

			}
		`,blending:Yi,depthTest:!1,depthWrite:!1})}function VE(){return new Qn({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:up(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:Yi,depthTest:!1,depthWrite:!1})}function up(){return`

		precision mediump float;
		precision mediump int;

		attribute float faceIndex;

		varying vec3 vOutputDirection;

		// RH coordinate system; PMREM face-indexing convention
		vec3 getDirection( vec2 uv, float face ) {

			uv = 2.0 * uv - 1.0;

			vec3 direction = vec3( uv, 1.0 );

			if ( face == 0.0 ) {

				direction = direction.zyx; // ( 1, v, u ) pos x

			} else if ( face == 1.0 ) {

				direction = direction.xzy;
				direction.xz *= -1.0; // ( -u, 1, -v ) pos y

			} else if ( face == 2.0 ) {

				direction.x *= -1.0; // ( -u, v, 1 ) pos z

			} else if ( face == 3.0 ) {

				direction = direction.zyx;
				direction.xz *= -1.0; // ( -1, v, -u ) neg x

			} else if ( face == 4.0 ) {

				direction = direction.xzy;
				direction.xy *= -1.0; // ( -u, -1, v ) neg y

			} else if ( face == 5.0 ) {

				direction.z *= -1.0; // ( u, v, -1 ) neg z

			}

			return direction;

		}

		void main() {

			vOutputDirection = getDirection( uv, faceIndex );
			gl_Position = vec4( position, 1.0 );

		}
	`}var cp=class extends Jn{constructor(e=1,t={}){super(e,e,t),this.isWebGLCubeRenderTarget=!0;let i={width:e,height:e,depth:1},r=[i,i,i,i,i,i];this.texture=new pl(r),this._setTextureOptions(t),this.texture.isRenderTargetTexture=!0}fromEquirectangularTexture(e,t){this.texture.type=t.type,this.texture.colorSpace=t.colorSpace,this.texture.generateMipmaps=t.generateMipmaps,this.texture.minFilter=t.minFilter,this.texture.magFilter=t.magFilter;let i={uniforms:{tEquirect:{value:null}},vertexShader:`

				varying vec3 vWorldDirection;

				vec3 transformDirection( in vec3 dir, in mat4 matrix ) {

					return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );

				}

				void main() {

					vWorldDirection = transformDirection( position, modelMatrix );

					#include <begin_vertex>
					#include <project_vertex>

				}
			`,fragmentShader:`

				uniform sampler2D tEquirect;

				varying vec3 vWorldDirection;

				#include <common>

				void main() {

					vec3 direction = normalize( vWorldDirection );

					vec2 sampleUV = equirectUv( direction );

					gl_FragColor = texture2D( tEquirect, sampleUV );

				}
			`},r=new Aa(5,5,5),s=new Qn({name:"CubemapFromEquirect",uniforms:lo(i.uniforms),vertexShader:i.vertexShader,fragmentShader:i.fragmentShader,side:Nn,blending:Yi});s.uniforms.tEquirect.value=t;let o=new an(r,s),a=t.minFilter;return t.minFilter===hs&&(t.minFilter=hn),new ph(1,10,this).update(e,o),t.minFilter=a,o.geometry.dispose(),o.material.dispose(),this}clear(e,t=!0,i=!0,r=!0){let s=e.getRenderTarget();for(let o=0;o<6;o++)e.setRenderTarget(this,o),e.clear(t,i,r);e.setRenderTarget(s)}};function TL(n){let e=new WeakMap,t=new WeakMap,i=null;function r(f,h=!1){return f==null?null:h?o(f):s(f)}function s(f){if(f&&f.isTexture){let h=f.mapping;if(h===gh||h===vh)if(e.has(f)){let g=e.get(f).texture;return a(g,f.mapping)}else{let g=f.image;if(g&&g.height>0){let _=new cp(g.height);return _.fromEquirectangularTexture(n,f),e.set(f,_),f.addEventListener("dispose",l),a(_.texture,f.mapping)}else return null}}return f}function o(f){if(f&&f.isTexture){let h=f.mapping,g=h===gh||h===vh,_=h===fs||h===ao;if(g||_){let m=t.get(f),p=m!==void 0?m.texture.pmremVersion:0;if(f.isRenderTargetTexture&&f.pmremVersion!==p)return i===null&&(i=new ap(n)),m=g?i.fromEquirectangular(f,m):i.fromCubemap(f,m),m.texture.pmremVersion=f.pmremVersion,t.set(f,m),m.texture;if(m!==void 0)return m.texture;{let M=f.image;return g&&M&&M.height>0||_&&M&&c(M)?(i===null&&(i=new ap(n)),m=g?i.fromEquirectangular(f):i.fromCubemap(f),m.texture.pmremVersion=f.pmremVersion,t.set(f,m),f.addEventListener("dispose",u),m.texture):null}}}return f}function a(f,h){return h===gh?f.mapping=fs:h===vh&&(f.mapping=ao),f}function c(f){let h=0,g=6;for(let _=0;_<g;_++)f[_]!==void 0&&h++;return h===g}function l(f){let h=f.target;h.removeEventListener("dispose",l);let g=e.get(h);g!==void 0&&(e.delete(h),g.dispose())}function u(f){let h=f.target;h.removeEventListener("dispose",u);let g=t.get(h);g!==void 0&&(t.delete(h),g.dispose())}function d(){e=new WeakMap,t=new WeakMap,i!==null&&(i.dispose(),i=null)}return{get:r,dispose:d}}function DL(n){let e={};function t(i){if(e[i]!==void 0)return e[i];let r=n.getExtension(i);return e[i]=r,r}return{has:function(i){return t(i)!==null},init:function(){t("EXT_color_buffer_float"),t("WEBGL_clip_cull_distance"),t("OES_texture_float_linear"),t("EXT_color_buffer_half_float"),t("WEBGL_multisampled_render_to_texture"),t("WEBGL_render_shared_exponent")},get:function(i){let r=t(i);return r===null&&cl("WebGLRenderer: "+i+" extension not supported."),r}}}function IL(n,e,t,i){let r={},s=new WeakMap;function o(d){let f=d.target;f.index!==null&&e.remove(f.index);for(let g in f.attributes)e.remove(f.attributes[g]);f.removeEventListener("dispose",o),delete r[f.id];let h=s.get(f);h&&(e.remove(h),s.delete(f)),i.releaseStatesOfGeometry(f),f.isInstancedBufferGeometry===!0&&delete f._maxInstanceCount,t.memory.geometries--}function a(d,f){return r[f.id]===!0||(f.addEventListener("dispose",o),r[f.id]=!0,t.memory.geometries++),f}function c(d){let f=d.attributes;for(let h in f)e.update(f[h],n.ARRAY_BUFFER)}function l(d){let f=[],h=d.index,g=d.attributes.position,_=0;if(g===void 0)return;if(h!==null){let M=h.array;_=h.version;for(let w=0,S=M.length;w<S;w+=3){let D=M[w+0],C=M[w+1],A=M[w+2];f.push(D,C,C,A,A,D)}}else{let M=g.array;_=g.version;for(let w=0,S=M.length/3-1;w<S;w+=3){let D=w+0,C=w+1,A=w+2;f.push(D,C,C,A,A,D)}}let m=new(g.count>=65535?fl:dl)(f,1);m.version=_;let p=s.get(d);p&&e.remove(p),s.set(d,m)}function u(d){let f=s.get(d);if(f){let h=d.index;h!==null&&f.version<h.version&&l(d)}else l(d);return s.get(d)}return{get:a,update:c,getWireframeAttribute:u}}function AL(n,e,t){let i;function r(f){i=f}let s,o;function a(f){s=f.type,o=f.bytesPerElement}function c(f,h){n.drawElements(i,h,s,f*o),t.update(h,i,1)}function l(f,h,g){g!==0&&(n.drawElementsInstanced(i,h,s,f*o,g),t.update(h,i,g))}function u(f,h,g){if(g===0)return;e.get("WEBGL_multi_draw").multiDrawElementsWEBGL(i,h,0,s,f,0,g);let m=0;for(let p=0;p<g;p++)m+=h[p];t.update(m,i,1)}function d(f,h,g,_){if(g===0)return;let m=e.get("WEBGL_multi_draw");if(m===null)for(let p=0;p<f.length;p++)l(f[p]/o,h[p],_[p]);else{m.multiDrawElementsInstancedWEBGL(i,h,0,s,f,0,_,0,g);let p=0;for(let M=0;M<g;M++)p+=h[M]*_[M];t.update(p,i,1)}}this.setMode=r,this.setIndex=a,this.render=c,this.renderInstances=l,this.renderMultiDraw=u,this.renderMultiDrawInstances=d}function RL(n){let e={geometries:0,textures:0},t={frame:0,calls:0,triangles:0,points:0,lines:0};function i(s,o,a){switch(t.calls++,o){case n.TRIANGLES:t.triangles+=a*(s/3);break;case n.LINES:t.lines+=a*(s/2);break;case n.LINE_STRIP:t.lines+=a*(s-1);break;case n.LINE_LOOP:t.lines+=a*s;break;case n.POINTS:t.points+=a*s;break;default:Ne("WebGLInfo: Unknown draw mode:",o);break}}function r(){t.calls=0,t.triangles=0,t.points=0,t.lines=0}return{memory:e,render:t,programs:null,autoReset:!0,reset:r,update:i}}function NL(n,e,t){let i=new WeakMap,r=new Ft;function s(o,a,c){let l=o.morphTargetInfluences,u=a.morphAttributes.position||a.morphAttributes.normal||a.morphAttributes.color,d=u!==void 0?u.length:0,f=i.get(a);if(f===void 0||f.count!==d){let j=function(){y.dispose(),i.delete(a),a.removeEventListener("dispose",j)};var h=j;f!==void 0&&f.texture.dispose();let g=a.morphAttributes.position!==void 0,_=a.morphAttributes.normal!==void 0,m=a.morphAttributes.color!==void 0,p=a.morphAttributes.position||[],M=a.morphAttributes.normal||[],w=a.morphAttributes.color||[],S=0;g===!0&&(S=1),_===!0&&(S=2),m===!0&&(S=3);let D=a.attributes.position.count*S,C=1;D>e.maxTextureSize&&(C=Math.ceil(D/e.maxTextureSize),D=e.maxTextureSize);let A=new Float32Array(D*C*4*d),y=new ll(A,D,C,d);y.type=Oi,y.needsUpdate=!0;let b=S*4;for(let T=0;T<d;T++){let O=p[T],k=M[T],G=w[T],B=D*C*4*T;for(let H=0;H<O.count;H++){let L=H*b;g===!0&&(r.fromBufferAttribute(O,H),A[B+L+0]=r.x,A[B+L+1]=r.y,A[B+L+2]=r.z,A[B+L+3]=0),_===!0&&(r.fromBufferAttribute(k,H),A[B+L+4]=r.x,A[B+L+5]=r.y,A[B+L+6]=r.z,A[B+L+7]=0),m===!0&&(r.fromBufferAttribute(G,H),A[B+L+8]=r.x,A[B+L+9]=r.y,A[B+L+10]=r.z,A[B+L+11]=G.itemSize===4?r.w:1)}}f={count:d,texture:y,size:new rt(D,C)},i.set(a,f),a.addEventListener("dispose",j)}if(o.isInstancedMesh===!0&&o.morphTexture!==null)c.getUniforms().setValue(n,"morphTexture",o.morphTexture,t);else{let g=0;for(let m=0;m<l.length;m++)g+=l[m];let _=a.morphTargetsRelative?1:1-g;c.getUniforms().setValue(n,"morphTargetBaseInfluence",_),c.getUniforms().setValue(n,"morphTargetInfluences",l)}c.getUniforms().setValue(n,"morphTargetsTexture",f.texture,t),c.getUniforms().setValue(n,"morphTargetsTextureSize",f.size)}return{update:s}}function PL(n,e,t,i,r){let s=new WeakMap;function o(l){let u=r.render.frame,d=l.geometry,f=e.get(l,d);if(s.get(f)!==u&&(e.update(f),s.set(f,u)),l.isInstancedMesh&&(l.hasEventListener("dispose",c)===!1&&l.addEventListener("dispose",c),s.get(l)!==u&&(t.update(l.instanceMatrix,n.ARRAY_BUFFER),l.instanceColor!==null&&t.update(l.instanceColor,n.ARRAY_BUFFER),s.set(l,u))),l.isSkinnedMesh){let h=l.skeleton;s.get(h)!==u&&(h.update(),s.set(h,u))}return f}function a(){s=new WeakMap}function c(l){let u=l.target;u.removeEventListener("dispose",c),i.releaseStatesOfObject(u),t.remove(u.instanceMatrix),u.instanceColor!==null&&t.remove(u.instanceColor)}return{update:o,dispose:a}}var OL={[Fy]:"LINEAR_TONE_MAPPING",[ky]:"REINHARD_TONE_MAPPING",[Uy]:"CINEON_TONE_MAPPING",[By]:"ACES_FILMIC_TONE_MAPPING",[Hy]:"AGX_TONE_MAPPING",[zy]:"NEUTRAL_TONE_MAPPING",[Vy]:"CUSTOM_TONE_MAPPING"};function LL(n,e,t,i,r){let s=new Jn(e,t,{type:n,depthBuffer:i,stencilBuffer:r}),o=new Jn(e,t,{type:Zi,depthBuffer:!1,stencilBuffer:!1}),a=new Kn;a.setAttribute("position",new Gt([-1,3,0,-1,-1,0,3,-1,0],3)),a.setAttribute("uv",new Gt([0,2,0,0,2,0],2));let c=new ih({uniforms:{tDiffuse:{value:null}},vertexShader:`
			precision highp float;

			uniform mat4 modelViewMatrix;
			uniform mat4 projectionMatrix;

			attribute vec3 position;
			attribute vec2 uv;

			varying vec2 vUv;

			void main() {
				vUv = uv;
				gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
			}`,fragmentShader:`
			precision highp float;

			uniform sampler2D tDiffuse;

			varying vec2 vUv;

			#include <tonemapping_pars_fragment>
			#include <colorspace_pars_fragment>

			void main() {
				gl_FragColor = texture2D( tDiffuse, vUv );

				#ifdef LINEAR_TONE_MAPPING
					gl_FragColor.rgb = LinearToneMapping( gl_FragColor.rgb );
				#elif defined( REINHARD_TONE_MAPPING )
					gl_FragColor.rgb = ReinhardToneMapping( gl_FragColor.rgb );
				#elif defined( CINEON_TONE_MAPPING )
					gl_FragColor.rgb = CineonToneMapping( gl_FragColor.rgb );
				#elif defined( ACES_FILMIC_TONE_MAPPING )
					gl_FragColor.rgb = ACESFilmicToneMapping( gl_FragColor.rgb );
				#elif defined( AGX_TONE_MAPPING )
					gl_FragColor.rgb = AgXToneMapping( gl_FragColor.rgb );
				#elif defined( NEUTRAL_TONE_MAPPING )
					gl_FragColor.rgb = NeutralToneMapping( gl_FragColor.rgb );
				#elif defined( CUSTOM_TONE_MAPPING )
					gl_FragColor.rgb = CustomToneMapping( gl_FragColor.rgb );
				#endif

				#ifdef SRGB_TRANSFER
					gl_FragColor = sRGBTransferOETF( gl_FragColor );
				#endif
			}`,depthTest:!1,depthWrite:!1}),l=new an(a,c),u=new Pa(-1,1,1,-1,0,1),d=null,f=null,h=!1,g,_=null,m=[],p=!1;this.setSize=function(M,w){s.setSize(M,w),o.setSize(M,w);for(let S=0;S<m.length;S++){let D=m[S];D.setSize&&D.setSize(M,w)}},this.setEffects=function(M){m=M,p=m.length>0&&m[0].isRenderPass===!0;let w=s.width,S=s.height;for(let D=0;D<m.length;D++){let C=m[D];C.setSize&&C.setSize(w,S)}},this.begin=function(M,w){if(h||M.toneMapping===Ni&&m.length===0)return!1;if(_=w,w!==null){let S=w.width,D=w.height;(s.width!==S||s.height!==D)&&this.setSize(S,D)}return p===!1&&M.setRenderTarget(s),g=M.toneMapping,M.toneMapping=Ni,!0},this.hasRenderPass=function(){return p},this.end=function(M,w){M.toneMapping=g,h=!0;let S=s,D=o;for(let C=0;C<m.length;C++){let A=m[C];if(A.enabled!==!1&&(A.render(M,D,S,w),A.needsSwap!==!1)){let y=S;S=D,D=y}}if(d!==M.outputColorSpace||f!==M.toneMapping){d=M.outputColorSpace,f=M.toneMapping,c.defines={},st.getTransfer(d)===gt&&(c.defines.SRGB_TRANSFER="");let C=OL[f];C&&(c.defines[C]=""),c.needsUpdate=!0}c.uniforms.tDiffuse.value=S.texture,M.setRenderTarget(_),M.render(l,u),_=null,h=!1},this.isCompositing=function(){return h},this.dispose=function(){s.dispose(),o.dispose(),a.dispose(),c.dispose()}}var sw=new Ar,l_=new cs(1,1),ow=new ll,aw=new Qf,cw=new pl,HE=[],zE=[],GE=new Float32Array(16),jE=new Float32Array(9),WE=new Float32Array(4);function Va(n,e,t){let i=n[0];if(i<=0||i>0)return n;let r=e*t,s=HE[r];if(s===void 0&&(s=new Float32Array(r),HE[r]=s),e!==0){i.toArray(s,0);for(let o=1,a=0;o!==e;++o)a+=t,n[o].toArray(s,a)}return s}function Jt(n,e){if(n.length!==e.length)return!1;for(let t=0,i=n.length;t<i;t++)if(n[t]!==e[t])return!1;return!0}function Kt(n,e){for(let t=0,i=e.length;t<i;t++)n[t]=e[t]}function dp(n,e){let t=zE[e];t===void 0&&(t=new Int32Array(e),zE[e]=t);for(let i=0;i!==e;++i)t[i]=n.allocateTextureUnit();return t}function FL(n,e){let t=this.cache;t[0]!==e&&(n.uniform1f(this.addr,e),t[0]=e)}function kL(n,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(n.uniform2f(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(Jt(t,e))return;n.uniform2fv(this.addr,e),Kt(t,e)}}function UL(n,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(n.uniform3f(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else if(e.r!==void 0)(t[0]!==e.r||t[1]!==e.g||t[2]!==e.b)&&(n.uniform3f(this.addr,e.r,e.g,e.b),t[0]=e.r,t[1]=e.g,t[2]=e.b);else{if(Jt(t,e))return;n.uniform3fv(this.addr,e),Kt(t,e)}}function BL(n,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(n.uniform4f(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(Jt(t,e))return;n.uniform4fv(this.addr,e),Kt(t,e)}}function VL(n,e){let t=this.cache,i=e.elements;if(i===void 0){if(Jt(t,e))return;n.uniformMatrix2fv(this.addr,!1,e),Kt(t,e)}else{if(Jt(t,i))return;WE.set(i),n.uniformMatrix2fv(this.addr,!1,WE),Kt(t,i)}}function HL(n,e){let t=this.cache,i=e.elements;if(i===void 0){if(Jt(t,e))return;n.uniformMatrix3fv(this.addr,!1,e),Kt(t,e)}else{if(Jt(t,i))return;jE.set(i),n.uniformMatrix3fv(this.addr,!1,jE),Kt(t,i)}}function zL(n,e){let t=this.cache,i=e.elements;if(i===void 0){if(Jt(t,e))return;n.uniformMatrix4fv(this.addr,!1,e),Kt(t,e)}else{if(Jt(t,i))return;GE.set(i),n.uniformMatrix4fv(this.addr,!1,GE),Kt(t,i)}}function GL(n,e){let t=this.cache;t[0]!==e&&(n.uniform1i(this.addr,e),t[0]=e)}function jL(n,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(n.uniform2i(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(Jt(t,e))return;n.uniform2iv(this.addr,e),Kt(t,e)}}function WL(n,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(n.uniform3i(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(Jt(t,e))return;n.uniform3iv(this.addr,e),Kt(t,e)}}function $L(n,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(n.uniform4i(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(Jt(t,e))return;n.uniform4iv(this.addr,e),Kt(t,e)}}function qL(n,e){let t=this.cache;t[0]!==e&&(n.uniform1ui(this.addr,e),t[0]=e)}function XL(n,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(n.uniform2ui(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(Jt(t,e))return;n.uniform2uiv(this.addr,e),Kt(t,e)}}function YL(n,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(n.uniform3ui(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(Jt(t,e))return;n.uniform3uiv(this.addr,e),Kt(t,e)}}function ZL(n,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(n.uniform4ui(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(Jt(t,e))return;n.uniform4uiv(this.addr,e),Kt(t,e)}}function JL(n,e,t){let i=this.cache,r=t.allocateTextureUnit();i[0]!==r&&(n.uniform1i(this.addr,r),i[0]=r);let s;this.type===n.SAMPLER_2D_SHADOW?(l_.compareFunction=t.isReversedDepthBuffer()?rp:ip,s=l_):s=sw,t.setTexture2D(e||s,r)}function KL(n,e,t){let i=this.cache,r=t.allocateTextureUnit();i[0]!==r&&(n.uniform1i(this.addr,r),i[0]=r),t.setTexture3D(e||aw,r)}function QL(n,e,t){let i=this.cache,r=t.allocateTextureUnit();i[0]!==r&&(n.uniform1i(this.addr,r),i[0]=r),t.setTextureCube(e||cw,r)}function eF(n,e,t){let i=this.cache,r=t.allocateTextureUnit();i[0]!==r&&(n.uniform1i(this.addr,r),i[0]=r),t.setTexture2DArray(e||ow,r)}function tF(n){switch(n){case 5126:return FL;case 35664:return kL;case 35665:return UL;case 35666:return BL;case 35674:return VL;case 35675:return HL;case 35676:return zL;case 5124:case 35670:return GL;case 35667:case 35671:return jL;case 35668:case 35672:return WL;case 35669:case 35673:return $L;case 5125:return qL;case 36294:return XL;case 36295:return YL;case 36296:return ZL;case 35678:case 36198:case 36298:case 36306:case 35682:return JL;case 35679:case 36299:case 36307:return KL;case 35680:case 36300:case 36308:case 36293:return QL;case 36289:case 36303:case 36311:case 36292:return eF}}function nF(n,e){n.uniform1fv(this.addr,e)}function iF(n,e){let t=Va(e,this.size,2);n.uniform2fv(this.addr,t)}function rF(n,e){let t=Va(e,this.size,3);n.uniform3fv(this.addr,t)}function sF(n,e){let t=Va(e,this.size,4);n.uniform4fv(this.addr,t)}function oF(n,e){let t=Va(e,this.size,4);n.uniformMatrix2fv(this.addr,!1,t)}function aF(n,e){let t=Va(e,this.size,9);n.uniformMatrix3fv(this.addr,!1,t)}function cF(n,e){let t=Va(e,this.size,16);n.uniformMatrix4fv(this.addr,!1,t)}function lF(n,e){n.uniform1iv(this.addr,e)}function uF(n,e){n.uniform2iv(this.addr,e)}function dF(n,e){n.uniform3iv(this.addr,e)}function fF(n,e){n.uniform4iv(this.addr,e)}function hF(n,e){n.uniform1uiv(this.addr,e)}function pF(n,e){n.uniform2uiv(this.addr,e)}function mF(n,e){n.uniform3uiv(this.addr,e)}function gF(n,e){n.uniform4uiv(this.addr,e)}function vF(n,e,t){let i=this.cache,r=e.length,s=dp(t,r);Jt(i,s)||(n.uniform1iv(this.addr,s),Kt(i,s));let o;this.type===n.SAMPLER_2D_SHADOW?o=l_:o=sw;for(let a=0;a!==r;++a)t.setTexture2D(e[a]||o,s[a])}function yF(n,e,t){let i=this.cache,r=e.length,s=dp(t,r);Jt(i,s)||(n.uniform1iv(this.addr,s),Kt(i,s));for(let o=0;o!==r;++o)t.setTexture3D(e[o]||aw,s[o])}function _F(n,e,t){let i=this.cache,r=e.length,s=dp(t,r);Jt(i,s)||(n.uniform1iv(this.addr,s),Kt(i,s));for(let o=0;o!==r;++o)t.setTextureCube(e[o]||cw,s[o])}function xF(n,e,t){let i=this.cache,r=e.length,s=dp(t,r);Jt(i,s)||(n.uniform1iv(this.addr,s),Kt(i,s));for(let o=0;o!==r;++o)t.setTexture2DArray(e[o]||ow,s[o])}function MF(n){switch(n){case 5126:return nF;case 35664:return iF;case 35665:return rF;case 35666:return sF;case 35674:return oF;case 35675:return aF;case 35676:return cF;case 5124:case 35670:return lF;case 35667:case 35671:return uF;case 35668:case 35672:return dF;case 35669:case 35673:return fF;case 5125:return hF;case 36294:return pF;case 36295:return mF;case 36296:return gF;case 35678:case 36198:case 36298:case 36306:case 35682:return vF;case 35679:case 36299:case 36307:return yF;case 35680:case 36300:case 36308:case 36293:return _F;case 36289:case 36303:case 36311:case 36292:return xF}}var u_=class{constructor(e,t,i){this.id=e,this.addr=i,this.cache=[],this.type=t.type,this.setValue=tF(t.type)}},d_=class{constructor(e,t,i){this.id=e,this.addr=i,this.cache=[],this.type=t.type,this.size=t.size,this.setValue=MF(t.type)}},f_=class{constructor(e){this.id=e,this.seq=[],this.map={}}setValue(e,t,i){let r=this.seq;for(let s=0,o=r.length;s!==o;++s){let a=r[s];a.setValue(e,t[a.id],i)}}},a_=/(\w+)(\])?(\[|\.)?/g;function $E(n,e){n.seq.push(e),n.map[e.id]=e}function bF(n,e,t){let i=n.name,r=i.length;for(a_.lastIndex=0;;){let s=a_.exec(i),o=a_.lastIndex,a=s[1],c=s[2]==="]",l=s[3];if(c&&(a=a|0),l===void 0||l==="["&&o+2===r){$E(t,l===void 0?new u_(a,n,e):new d_(a,n,e));break}else{let d=t.map[a];d===void 0&&(d=new f_(a),$E(t,d)),t=d}}}var Ba=class{constructor(e,t){this.seq=[],this.map={};let i=e.getProgramParameter(t,e.ACTIVE_UNIFORMS);for(let o=0;o<i;++o){let a=e.getActiveUniform(t,o),c=e.getUniformLocation(t,a.name);bF(a,c,this)}let r=[],s=[];for(let o of this.seq)o.type===e.SAMPLER_2D_SHADOW||o.type===e.SAMPLER_CUBE_SHADOW||o.type===e.SAMPLER_2D_ARRAY_SHADOW?r.push(o):s.push(o);r.length>0&&(this.seq=r.concat(s))}setValue(e,t,i,r){let s=this.map[t];s!==void 0&&s.setValue(e,i,r)}setOptional(e,t,i){let r=t[i];r!==void 0&&this.setValue(e,i,r)}static upload(e,t,i,r){for(let s=0,o=t.length;s!==o;++s){let a=t[s],c=i[a.id];c.needsUpdate!==!1&&a.setValue(e,c.value,r)}}static seqWithValue(e,t){let i=[];for(let r=0,s=e.length;r!==s;++r){let o=e[r];o.id in t&&i.push(o)}return i}};function qE(n,e,t){let i=n.createShader(e);return n.shaderSource(i,t),n.compileShader(i),i}var SF=37297,EF=0;function wF(n,e){let t=n.split(`
`),i=[],r=Math.max(e-6,0),s=Math.min(e+6,t.length);for(let o=r;o<s;o++){let a=o+1;i.push(`${a===e?">":" "} ${a}: ${t[o]}`)}return i.join(`
`)}var XE=new We;function CF(n){st._getMatrix(XE,st.workingColorSpace,n);let e=`mat3( ${XE.elements.map(t=>t.toFixed(4))} )`;switch(st.getTransfer(n)){case ol:return[e,"LinearTransferOETF"];case gt:return[e,"sRGBTransferOETF"];default:return Fe("WebGLProgram: Unsupported color space: ",n),[e,"LinearTransferOETF"]}}function YE(n,e,t){let i=n.getShaderParameter(e,n.COMPILE_STATUS),s=(n.getShaderInfoLog(e)||"").trim();if(i&&s==="")return"";let o=/ERROR: 0:(\d+)/.exec(s);if(o){let a=parseInt(o[1]);return t.toUpperCase()+`

`+s+`

`+wF(n.getShaderSource(e),a)}else return s}function TF(n,e){let t=CF(e);return[`vec4 ${n}( vec4 value ) {`,`	return ${t[1]}( vec4( value.rgb * ${t[0]}, value.a ) );`,"}"].join(`
`)}var DF={[Fy]:"Linear",[ky]:"Reinhard",[Uy]:"Cineon",[By]:"ACESFilmic",[Hy]:"AgX",[zy]:"Neutral",[Vy]:"Custom"};function IF(n,e){let t=DF[e];return t===void 0?(Fe("WebGLProgram: Unsupported toneMapping:",e),"vec3 "+n+"( vec3 color ) { return LinearToneMapping( color ); }"):"vec3 "+n+"( vec3 color ) { return "+t+"ToneMapping( color ); }"}var op=new F;function AF(){st.getLuminanceCoefficients(op);let n=op.x.toFixed(4),e=op.y.toFixed(4),t=op.z.toFixed(4);return["float luminance( const in vec3 rgb ) {",`	const vec3 weights = vec3( ${n}, ${e}, ${t} );`,"	return dot( weights, rgb );","}"].join(`
`)}function RF(n){return[n.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",n.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(Ol).join(`
`)}function NF(n){let e=[];for(let t in n){let i=n[t];i!==!1&&e.push("#define "+t+" "+i)}return e.join(`
`)}function PF(n,e){let t={},i=n.getProgramParameter(e,n.ACTIVE_ATTRIBUTES);for(let r=0;r<i;r++){let s=n.getActiveAttrib(e,r),o=s.name,a=1;s.type===n.FLOAT_MAT2&&(a=2),s.type===n.FLOAT_MAT3&&(a=3),s.type===n.FLOAT_MAT4&&(a=4),t[o]={type:s.type,location:n.getAttribLocation(e,o),locationSize:a}}return t}function Ol(n){return n!==""}function ZE(n,e){let t=e.numSpotLightShadows+e.numSpotLightMaps-e.numSpotLightShadowsWithMaps;return n.replace(/NUM_DIR_LIGHTS/g,e.numDirLights).replace(/NUM_SPOT_LIGHTS/g,e.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,e.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,t).replace(/NUM_RECT_AREA_LIGHTS/g,e.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,e.numPointLights).replace(/NUM_HEMI_LIGHTS/g,e.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g,e.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,e.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,e.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,e.numPointLightShadows)}function JE(n,e){return n.replace(/NUM_CLIPPING_PLANES/g,e.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,e.numClippingPlanes-e.numClipIntersection)}var OF=/^[ \t]*#include +<([\w\d./]+)>/gm;function h_(n){return n.replace(OF,FF)}var LF=new Map;function FF(n,e){let t=Xe[e];if(t===void 0){let i=LF.get(e);if(i!==void 0)t=Xe[i],Fe('WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',e,i);else throw new Error("Can not resolve #include <"+e+">")}return h_(t)}var kF=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function KE(n){return n.replace(kF,UF)}function UF(n,e,t,i){let r="";for(let s=parseInt(e);s<parseInt(t);s++)r+=i.replace(/\[\s*i\s*\]/g,"[ "+s+" ]").replace(/UNROLLED_LOOP_INDEX/g,s);return r}function QE(n){let e=`precision ${n.precision} float;
	precision ${n.precision} int;
	precision ${n.precision} sampler2D;
	precision ${n.precision} samplerCube;
	precision ${n.precision} sampler3D;
	precision ${n.precision} sampler2DArray;
	precision ${n.precision} sampler2DShadow;
	precision ${n.precision} samplerCubeShadow;
	precision ${n.precision} sampler2DArrayShadow;
	precision ${n.precision} isampler2D;
	precision ${n.precision} isampler3D;
	precision ${n.precision} isamplerCube;
	precision ${n.precision} isampler2DArray;
	precision ${n.precision} usampler2D;
	precision ${n.precision} usampler3D;
	precision ${n.precision} usamplerCube;
	precision ${n.precision} usampler2DArray;
	`;return n.precision==="highp"?e+=`
#define HIGH_PRECISION`:n.precision==="mediump"?e+=`
#define MEDIUM_PRECISION`:n.precision==="lowp"&&(e+=`
#define LOW_PRECISION`),e}var BF={[El]:"SHADOWMAP_TYPE_PCF",[La]:"SHADOWMAP_TYPE_VSM"};function VF(n){return BF[n.shadowMapType]||"SHADOWMAP_TYPE_BASIC"}var HF={[fs]:"ENVMAP_TYPE_CUBE",[ao]:"ENVMAP_TYPE_CUBE",[wl]:"ENVMAP_TYPE_CUBE_UV"};function zF(n){return n.envMap===!1?"ENVMAP_TYPE_CUBE":HF[n.envMapMode]||"ENVMAP_TYPE_CUBE"}var GF={[ao]:"ENVMAP_MODE_REFRACTION"};function jF(n){return n.envMap===!1?"ENVMAP_MODE_REFLECTION":GF[n.envMapMode]||"ENVMAP_MODE_REFLECTION"}var WF={[Ly]:"ENVMAP_BLENDING_MULTIPLY",[_E]:"ENVMAP_BLENDING_MIX",[xE]:"ENVMAP_BLENDING_ADD"};function $F(n){return n.envMap===!1?"ENVMAP_BLENDING_NONE":WF[n.combine]||"ENVMAP_BLENDING_NONE"}function qF(n){let e=n.envMapCubeUVHeight;if(e===null)return null;let t=Math.log2(e)-2,i=1/e;return{texelWidth:1/(3*Math.max(Math.pow(2,t),112)),texelHeight:i,maxMip:t}}function XF(n,e,t,i){let r=n.getContext(),s=t.defines,o=t.vertexShader,a=t.fragmentShader,c=VF(t),l=zF(t),u=jF(t),d=$F(t),f=qF(t),h=RF(t),g=NF(s),_=r.createProgram(),m,p,M=t.glslVersion?"#version "+t.glslVersion+`
`:"";t.isRawShaderMaterial?(m=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,g].filter(Ol).join(`
`),m.length>0&&(m+=`
`),p=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,g].filter(Ol).join(`
`),p.length>0&&(p+=`
`)):(m=[QE(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,g,t.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",t.batching?"#define USE_BATCHING":"",t.batchingColor?"#define USE_BATCHING_COLOR":"",t.instancing?"#define USE_INSTANCING":"",t.instancingColor?"#define USE_INSTANCING_COLOR":"",t.instancingMorph?"#define USE_INSTANCING_MORPH":"",t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.map?"#define USE_MAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+u:"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.displacementMap?"#define USE_DISPLACEMENTMAP":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.mapUv?"#define MAP_UV "+t.mapUv:"",t.alphaMapUv?"#define ALPHAMAP_UV "+t.alphaMapUv:"",t.lightMapUv?"#define LIGHTMAP_UV "+t.lightMapUv:"",t.aoMapUv?"#define AOMAP_UV "+t.aoMapUv:"",t.emissiveMapUv?"#define EMISSIVEMAP_UV "+t.emissiveMapUv:"",t.bumpMapUv?"#define BUMPMAP_UV "+t.bumpMapUv:"",t.normalMapUv?"#define NORMALMAP_UV "+t.normalMapUv:"",t.displacementMapUv?"#define DISPLACEMENTMAP_UV "+t.displacementMapUv:"",t.metalnessMapUv?"#define METALNESSMAP_UV "+t.metalnessMapUv:"",t.roughnessMapUv?"#define ROUGHNESSMAP_UV "+t.roughnessMapUv:"",t.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+t.anisotropyMapUv:"",t.clearcoatMapUv?"#define CLEARCOATMAP_UV "+t.clearcoatMapUv:"",t.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+t.clearcoatNormalMapUv:"",t.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+t.clearcoatRoughnessMapUv:"",t.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+t.iridescenceMapUv:"",t.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+t.iridescenceThicknessMapUv:"",t.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+t.sheenColorMapUv:"",t.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+t.sheenRoughnessMapUv:"",t.specularMapUv?"#define SPECULARMAP_UV "+t.specularMapUv:"",t.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+t.specularColorMapUv:"",t.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+t.specularIntensityMapUv:"",t.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+t.transmissionMapUv:"",t.thicknessMapUv?"#define THICKNESSMAP_UV "+t.thicknessMapUv:"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.flatShading?"#define FLAT_SHADED":"",t.skinning?"#define USE_SKINNING":"",t.morphTargets?"#define USE_MORPHTARGETS":"",t.morphNormals&&t.flatShading===!1?"#define USE_MORPHNORMALS":"",t.morphColors?"#define USE_MORPHCOLORS":"",t.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+t.morphTextureStride:"",t.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+t.morphTargetsCount:"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+c:"",t.sizeAttenuation?"#define USE_SIZEATTENUATION":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",t.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(Ol).join(`
`),p=[QE(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,g,t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",t.map?"#define USE_MAP":"",t.matcap?"#define USE_MATCAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+l:"",t.envMap?"#define "+u:"",t.envMap?"#define "+d:"",f?"#define CUBEUV_TEXEL_WIDTH "+f.texelWidth:"",f?"#define CUBEUV_TEXEL_HEIGHT "+f.texelHeight:"",f?"#define CUBEUV_MAX_MIP "+f.maxMip+".0":"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoat?"#define USE_CLEARCOAT":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.dispersion?"#define USE_DISPERSION":"",t.iridescence?"#define USE_IRIDESCENCE":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaTest?"#define USE_ALPHATEST":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.sheen?"#define USE_SHEEN":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors||t.instancingColor?"#define USE_COLOR":"",t.vertexAlphas||t.batchingColor?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.gradientMap?"#define USE_GRADIENTMAP":"",t.flatShading?"#define FLAT_SHADED":"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+c:"",t.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",t.decodeVideoTextureEmissive?"#define DECODE_VIDEO_TEXTURE_EMISSIVE":"",t.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",t.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",t.toneMapping!==Ni?"#define TONE_MAPPING":"",t.toneMapping!==Ni?Xe.tonemapping_pars_fragment:"",t.toneMapping!==Ni?IF("toneMapping",t.toneMapping):"",t.dithering?"#define DITHERING":"",t.opaque?"#define OPAQUE":"",Xe.colorspace_pars_fragment,TF("linearToOutputTexel",t.outputColorSpace),AF(),t.useDepthPacking?"#define DEPTH_PACKING "+t.depthPacking:"",`
`].filter(Ol).join(`
`)),o=h_(o),o=ZE(o,t),o=JE(o,t),a=h_(a),a=ZE(a,t),a=JE(a,t),o=KE(o),a=KE(a),t.isRawShaderMaterial!==!0&&(M=`#version 300 es
`,m=[h,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+m,p=["#define varying in",t.glslVersion===Jy?"":"layout(location = 0) out highp vec4 pc_fragColor;",t.glslVersion===Jy?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+p);let w=M+m+o,S=M+p+a,D=qE(r,r.VERTEX_SHADER,w),C=qE(r,r.FRAGMENT_SHADER,S);r.attachShader(_,D),r.attachShader(_,C),t.index0AttributeName!==void 0?r.bindAttribLocation(_,0,t.index0AttributeName):t.morphTargets===!0&&r.bindAttribLocation(_,0,"position"),r.linkProgram(_);function A(T){if(n.debug.checkShaderErrors){let O=r.getProgramInfoLog(_)||"",k=r.getShaderInfoLog(D)||"",G=r.getShaderInfoLog(C)||"",B=O.trim(),H=k.trim(),L=G.trim(),ee=!0,Z=!0;if(r.getProgramParameter(_,r.LINK_STATUS)===!1)if(ee=!1,typeof n.debug.onShaderError=="function")n.debug.onShaderError(r,_,D,C);else{let de=YE(r,D,"vertex"),ve=YE(r,C,"fragment");Ne("THREE.WebGLProgram: Shader Error "+r.getError()+" - VALIDATE_STATUS "+r.getProgramParameter(_,r.VALIDATE_STATUS)+`

Material Name: `+T.name+`
Material Type: `+T.type+`

Program Info Log: `+B+`
`+de+`
`+ve)}else B!==""?Fe("WebGLProgram: Program Info Log:",B):(H===""||L==="")&&(Z=!1);Z&&(T.diagnostics={runnable:ee,programLog:B,vertexShader:{log:H,prefix:m},fragmentShader:{log:L,prefix:p}})}r.deleteShader(D),r.deleteShader(C),y=new Ba(r,_),b=PF(r,_)}let y;this.getUniforms=function(){return y===void 0&&A(this),y};let b;this.getAttributes=function(){return b===void 0&&A(this),b};let j=t.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return j===!1&&(j=r.getProgramParameter(_,SF)),j},this.destroy=function(){i.releaseStatesOfProgram(this),r.deleteProgram(_),this.program=void 0},this.type=t.shaderType,this.name=t.shaderName,this.id=EF++,this.cacheKey=e,this.usedTimes=1,this.program=_,this.vertexShader=D,this.fragmentShader=C,this}var YF=0,p_=class{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(e){let t=e.vertexShader,i=e.fragmentShader,r=this._getShaderStage(t),s=this._getShaderStage(i),o=this._getShaderCacheForMaterial(e);return o.has(r)===!1&&(o.add(r),r.usedTimes++),o.has(s)===!1&&(o.add(s),s.usedTimes++),this}remove(e){let t=this.materialCache.get(e);for(let i of t)i.usedTimes--,i.usedTimes===0&&this.shaderCache.delete(i.code);return this.materialCache.delete(e),this}getVertexShaderID(e){return this._getShaderStage(e.vertexShader).id}getFragmentShaderID(e){return this._getShaderStage(e.fragmentShader).id}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(e){let t=this.materialCache,i=t.get(e);return i===void 0&&(i=new Set,t.set(e,i)),i}_getShaderStage(e){let t=this.shaderCache,i=t.get(e);return i===void 0&&(i=new m_(e),t.set(e,i)),i}},m_=class{constructor(e){this.id=YF++,this.code=e,this.usedTimes=0}};function ZF(n,e,t,i,r,s){let o=new Ca,a=new p_,c=new Set,l=[],u=new Map,d=i.logarithmicDepthBuffer,f=i.precision,h={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distance",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function g(y){return c.add(y),y===0?"uv":`uv${y}`}function _(y,b,j,T,O){let k=T.fog,G=O.geometry,B=y.isMeshStandardMaterial||y.isMeshLambertMaterial||y.isMeshPhongMaterial?T.environment:null,H=y.isMeshStandardMaterial||y.isMeshLambertMaterial&&!y.envMap||y.isMeshPhongMaterial&&!y.envMap,L=e.get(y.envMap||B,H),ee=L&&L.mapping===wl?L.image.height:null,Z=h[y.type];y.precision!==null&&(f=i.getMaxPrecision(y.precision),f!==y.precision&&Fe("WebGLProgram.getParameters:",y.precision,"not supported, using",f,"instead."));let de=G.morphAttributes.position||G.morphAttributes.normal||G.morphAttributes.color,ve=de!==void 0?de.length:0,he=0;G.morphAttributes.position!==void 0&&(he=1),G.morphAttributes.normal!==void 0&&(he=2),G.morphAttributes.color!==void 0&&(he=3);let qe,Nt,At,X;if(Z){let yt=Ki[Z];qe=yt.vertexShader,Nt=yt.fragmentShader}else qe=y.vertexShader,Nt=y.fragmentShader,a.update(y),At=a.getVertexShaderID(y),X=a.getFragmentShaderID(y);let ie=n.getRenderTarget(),oe=n.state.buffers.depth.getReversed(),$e=O.isInstancedMesh===!0,Ae=O.isBatchedMesh===!0,ke=!!y.map,Qt=!!y.matcap,at=!!L,vt=!!y.aoMap,Et=!!y.lightMap,Ye=!!y.bumpMap,Bt=!!y.normalMap,I=!!y.displacementMap,jt=!!y.emissiveMap,ft=!!y.metalnessMap,Tt=!!y.roughnessMap,Se=y.anisotropy>0,E=y.clearcoat>0,v=y.dispersion>0,N=y.iridescence>0,q=y.sheen>0,Y=y.transmission>0,$=Se&&!!y.anisotropyMap,ye=E&&!!y.clearcoatMap,re=E&&!!y.clearcoatNormalMap,De=E&&!!y.clearcoatRoughnessMap,Pe=N&&!!y.iridescenceMap,J=N&&!!y.iridescenceThicknessMap,te=q&&!!y.sheenColorMap,_e=q&&!!y.sheenRoughnessMap,Me=!!y.specularMap,fe=!!y.specularColorMap,Ze=!!y.specularIntensityMap,R=Y&&!!y.transmissionMap,se=Y&&!!y.thicknessMap,ne=!!y.gradientMap,me=!!y.alphaMap,K=y.alphaTest>0,W=!!y.alphaHash,xe=!!y.extensions,Be=Ni;y.toneMapped&&(ie===null||ie.isXRRenderTarget===!0)&&(Be=n.toneMapping);let Dt={shaderID:Z,shaderType:y.type,shaderName:y.name,vertexShader:qe,fragmentShader:Nt,defines:y.defines,customVertexShaderID:At,customFragmentShaderID:X,isRawShaderMaterial:y.isRawShaderMaterial===!0,glslVersion:y.glslVersion,precision:f,batching:Ae,batchingColor:Ae&&O._colorsTexture!==null,instancing:$e,instancingColor:$e&&O.instanceColor!==null,instancingMorph:$e&&O.morphTexture!==null,outputColorSpace:ie===null?n.outputColorSpace:ie.isXRRenderTarget===!0?ie.texture.colorSpace:oo,alphaToCoverage:!!y.alphaToCoverage,map:ke,matcap:Qt,envMap:at,envMapMode:at&&L.mapping,envMapCubeUVHeight:ee,aoMap:vt,lightMap:Et,bumpMap:Ye,normalMap:Bt,displacementMap:I,emissiveMap:jt,normalMapObjectSpace:Bt&&y.normalMapType===SE,normalMapTangentSpace:Bt&&y.normalMapType===Zy,metalnessMap:ft,roughnessMap:Tt,anisotropy:Se,anisotropyMap:$,clearcoat:E,clearcoatMap:ye,clearcoatNormalMap:re,clearcoatRoughnessMap:De,dispersion:v,iridescence:N,iridescenceMap:Pe,iridescenceThicknessMap:J,sheen:q,sheenColorMap:te,sheenRoughnessMap:_e,specularMap:Me,specularColorMap:fe,specularIntensityMap:Ze,transmission:Y,transmissionMap:R,thicknessMap:se,gradientMap:ne,opaque:y.transparent===!1&&y.blending===ro&&y.alphaToCoverage===!1,alphaMap:me,alphaTest:K,alphaHash:W,combine:y.combine,mapUv:ke&&g(y.map.channel),aoMapUv:vt&&g(y.aoMap.channel),lightMapUv:Et&&g(y.lightMap.channel),bumpMapUv:Ye&&g(y.bumpMap.channel),normalMapUv:Bt&&g(y.normalMap.channel),displacementMapUv:I&&g(y.displacementMap.channel),emissiveMapUv:jt&&g(y.emissiveMap.channel),metalnessMapUv:ft&&g(y.metalnessMap.channel),roughnessMapUv:Tt&&g(y.roughnessMap.channel),anisotropyMapUv:$&&g(y.anisotropyMap.channel),clearcoatMapUv:ye&&g(y.clearcoatMap.channel),clearcoatNormalMapUv:re&&g(y.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:De&&g(y.clearcoatRoughnessMap.channel),iridescenceMapUv:Pe&&g(y.iridescenceMap.channel),iridescenceThicknessMapUv:J&&g(y.iridescenceThicknessMap.channel),sheenColorMapUv:te&&g(y.sheenColorMap.channel),sheenRoughnessMapUv:_e&&g(y.sheenRoughnessMap.channel),specularMapUv:Me&&g(y.specularMap.channel),specularColorMapUv:fe&&g(y.specularColorMap.channel),specularIntensityMapUv:Ze&&g(y.specularIntensityMap.channel),transmissionMapUv:R&&g(y.transmissionMap.channel),thicknessMapUv:se&&g(y.thicknessMap.channel),alphaMapUv:me&&g(y.alphaMap.channel),vertexTangents:!!G.attributes.tangent&&(Bt||Se),vertexColors:y.vertexColors,vertexAlphas:y.vertexColors===!0&&!!G.attributes.color&&G.attributes.color.itemSize===4,pointsUvs:O.isPoints===!0&&!!G.attributes.uv&&(ke||me),fog:!!k,useFog:y.fog===!0,fogExp2:!!k&&k.isFogExp2,flatShading:y.wireframe===!1&&(y.flatShading===!0||G.attributes.normal===void 0&&Bt===!1&&(y.isMeshLambertMaterial||y.isMeshPhongMaterial||y.isMeshStandardMaterial||y.isMeshPhysicalMaterial)),sizeAttenuation:y.sizeAttenuation===!0,logarithmicDepthBuffer:d,reversedDepthBuffer:oe,skinning:O.isSkinnedMesh===!0,morphTargets:G.morphAttributes.position!==void 0,morphNormals:G.morphAttributes.normal!==void 0,morphColors:G.morphAttributes.color!==void 0,morphTargetsCount:ve,morphTextureStride:he,numDirLights:b.directional.length,numPointLights:b.point.length,numSpotLights:b.spot.length,numSpotLightMaps:b.spotLightMap.length,numRectAreaLights:b.rectArea.length,numHemiLights:b.hemi.length,numDirLightShadows:b.directionalShadowMap.length,numPointLightShadows:b.pointShadowMap.length,numSpotLightShadows:b.spotShadowMap.length,numSpotLightShadowsWithMaps:b.numSpotLightShadowsWithMaps,numLightProbes:b.numLightProbes,numClippingPlanes:s.numPlanes,numClipIntersection:s.numIntersection,dithering:y.dithering,shadowMapEnabled:n.shadowMap.enabled&&j.length>0,shadowMapType:n.shadowMap.type,toneMapping:Be,decodeVideoTexture:ke&&y.map.isVideoTexture===!0&&st.getTransfer(y.map.colorSpace)===gt,decodeVideoTextureEmissive:jt&&y.emissiveMap.isVideoTexture===!0&&st.getTransfer(y.emissiveMap.colorSpace)===gt,premultipliedAlpha:y.premultipliedAlpha,doubleSided:y.side===Xi,flipSided:y.side===Nn,useDepthPacking:y.depthPacking>=0,depthPacking:y.depthPacking||0,index0AttributeName:y.index0AttributeName,extensionClipCullDistance:xe&&y.extensions.clipCullDistance===!0&&t.has("WEBGL_clip_cull_distance"),extensionMultiDraw:(xe&&y.extensions.multiDraw===!0||Ae)&&t.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:t.has("KHR_parallel_shader_compile"),customProgramCacheKey:y.customProgramCacheKey()};return Dt.vertexUv1s=c.has(1),Dt.vertexUv2s=c.has(2),Dt.vertexUv3s=c.has(3),c.clear(),Dt}function m(y){let b=[];if(y.shaderID?b.push(y.shaderID):(b.push(y.customVertexShaderID),b.push(y.customFragmentShaderID)),y.defines!==void 0)for(let j in y.defines)b.push(j),b.push(y.defines[j]);return y.isRawShaderMaterial===!1&&(p(b,y),M(b,y),b.push(n.outputColorSpace)),b.push(y.customProgramCacheKey),b.join()}function p(y,b){y.push(b.precision),y.push(b.outputColorSpace),y.push(b.envMapMode),y.push(b.envMapCubeUVHeight),y.push(b.mapUv),y.push(b.alphaMapUv),y.push(b.lightMapUv),y.push(b.aoMapUv),y.push(b.bumpMapUv),y.push(b.normalMapUv),y.push(b.displacementMapUv),y.push(b.emissiveMapUv),y.push(b.metalnessMapUv),y.push(b.roughnessMapUv),y.push(b.anisotropyMapUv),y.push(b.clearcoatMapUv),y.push(b.clearcoatNormalMapUv),y.push(b.clearcoatRoughnessMapUv),y.push(b.iridescenceMapUv),y.push(b.iridescenceThicknessMapUv),y.push(b.sheenColorMapUv),y.push(b.sheenRoughnessMapUv),y.push(b.specularMapUv),y.push(b.specularColorMapUv),y.push(b.specularIntensityMapUv),y.push(b.transmissionMapUv),y.push(b.thicknessMapUv),y.push(b.combine),y.push(b.fogExp2),y.push(b.sizeAttenuation),y.push(b.morphTargetsCount),y.push(b.morphAttributeCount),y.push(b.numDirLights),y.push(b.numPointLights),y.push(b.numSpotLights),y.push(b.numSpotLightMaps),y.push(b.numHemiLights),y.push(b.numRectAreaLights),y.push(b.numDirLightShadows),y.push(b.numPointLightShadows),y.push(b.numSpotLightShadows),y.push(b.numSpotLightShadowsWithMaps),y.push(b.numLightProbes),y.push(b.shadowMapType),y.push(b.toneMapping),y.push(b.numClippingPlanes),y.push(b.numClipIntersection),y.push(b.depthPacking)}function M(y,b){o.disableAll(),b.instancing&&o.enable(0),b.instancingColor&&o.enable(1),b.instancingMorph&&o.enable(2),b.matcap&&o.enable(3),b.envMap&&o.enable(4),b.normalMapObjectSpace&&o.enable(5),b.normalMapTangentSpace&&o.enable(6),b.clearcoat&&o.enable(7),b.iridescence&&o.enable(8),b.alphaTest&&o.enable(9),b.vertexColors&&o.enable(10),b.vertexAlphas&&o.enable(11),b.vertexUv1s&&o.enable(12),b.vertexUv2s&&o.enable(13),b.vertexUv3s&&o.enable(14),b.vertexTangents&&o.enable(15),b.anisotropy&&o.enable(16),b.alphaHash&&o.enable(17),b.batching&&o.enable(18),b.dispersion&&o.enable(19),b.batchingColor&&o.enable(20),b.gradientMap&&o.enable(21),y.push(o.mask),o.disableAll(),b.fog&&o.enable(0),b.useFog&&o.enable(1),b.flatShading&&o.enable(2),b.logarithmicDepthBuffer&&o.enable(3),b.reversedDepthBuffer&&o.enable(4),b.skinning&&o.enable(5),b.morphTargets&&o.enable(6),b.morphNormals&&o.enable(7),b.morphColors&&o.enable(8),b.premultipliedAlpha&&o.enable(9),b.shadowMapEnabled&&o.enable(10),b.doubleSided&&o.enable(11),b.flipSided&&o.enable(12),b.useDepthPacking&&o.enable(13),b.dithering&&o.enable(14),b.transmission&&o.enable(15),b.sheen&&o.enable(16),b.opaque&&o.enable(17),b.pointsUvs&&o.enable(18),b.decodeVideoTexture&&o.enable(19),b.decodeVideoTextureEmissive&&o.enable(20),b.alphaToCoverage&&o.enable(21),y.push(o.mask)}function w(y){let b=h[y.type],j;if(b){let T=Ki[b];j=LE.clone(T.uniforms)}else j=y.uniforms;return j}function S(y,b){let j=u.get(b);return j!==void 0?++j.usedTimes:(j=new XF(n,b,y,r),l.push(j),u.set(b,j)),j}function D(y){if(--y.usedTimes===0){let b=l.indexOf(y);l[b]=l[l.length-1],l.pop(),u.delete(y.cacheKey),y.destroy()}}function C(y){a.remove(y)}function A(){a.dispose()}return{getParameters:_,getProgramCacheKey:m,getUniforms:w,acquireProgram:S,releaseProgram:D,releaseShaderCache:C,programs:l,dispose:A}}function JF(){let n=new WeakMap;function e(o){return n.has(o)}function t(o){let a=n.get(o);return a===void 0&&(a={},n.set(o,a)),a}function i(o){n.delete(o)}function r(o,a,c){n.get(o)[a]=c}function s(){n=new WeakMap}return{has:e,get:t,remove:i,update:r,dispose:s}}function KF(n,e){return n.groupOrder!==e.groupOrder?n.groupOrder-e.groupOrder:n.renderOrder!==e.renderOrder?n.renderOrder-e.renderOrder:n.material.id!==e.material.id?n.material.id-e.material.id:n.materialVariant!==e.materialVariant?n.materialVariant-e.materialVariant:n.z!==e.z?n.z-e.z:n.id-e.id}function ew(n,e){return n.groupOrder!==e.groupOrder?n.groupOrder-e.groupOrder:n.renderOrder!==e.renderOrder?n.renderOrder-e.renderOrder:n.z!==e.z?e.z-n.z:n.id-e.id}function tw(){let n=[],e=0,t=[],i=[],r=[];function s(){e=0,t.length=0,i.length=0,r.length=0}function o(f){let h=0;return f.isInstancedMesh&&(h+=2),f.isSkinnedMesh&&(h+=1),h}function a(f,h,g,_,m,p){let M=n[e];return M===void 0?(M={id:f.id,object:f,geometry:h,material:g,materialVariant:o(f),groupOrder:_,renderOrder:f.renderOrder,z:m,group:p},n[e]=M):(M.id=f.id,M.object=f,M.geometry=h,M.material=g,M.materialVariant=o(f),M.groupOrder=_,M.renderOrder=f.renderOrder,M.z=m,M.group=p),e++,M}function c(f,h,g,_,m,p){let M=a(f,h,g,_,m,p);g.transmission>0?i.push(M):g.transparent===!0?r.push(M):t.push(M)}function l(f,h,g,_,m,p){let M=a(f,h,g,_,m,p);g.transmission>0?i.unshift(M):g.transparent===!0?r.unshift(M):t.unshift(M)}function u(f,h){t.length>1&&t.sort(f||KF),i.length>1&&i.sort(h||ew),r.length>1&&r.sort(h||ew)}function d(){for(let f=e,h=n.length;f<h;f++){let g=n[f];if(g.id===null)break;g.id=null,g.object=null,g.geometry=null,g.material=null,g.group=null}}return{opaque:t,transmissive:i,transparent:r,init:s,push:c,unshift:l,finish:d,sort:u}}function QF(){let n=new WeakMap;function e(i,r){let s=n.get(i),o;return s===void 0?(o=new tw,n.set(i,[o])):r>=s.length?(o=new tw,s.push(o)):o=s[r],o}function t(){n=new WeakMap}return{get:e,dispose:t}}function e2(){let n={};return{get:function(e){if(n[e.id]!==void 0)return n[e.id];let t;switch(e.type){case"DirectionalLight":t={direction:new F,color:new ot};break;case"SpotLight":t={position:new F,direction:new F,color:new ot,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":t={position:new F,color:new ot,distance:0,decay:0};break;case"HemisphereLight":t={direction:new F,skyColor:new ot,groundColor:new ot};break;case"RectAreaLight":t={color:new ot,position:new F,halfWidth:new F,halfHeight:new F};break}return n[e.id]=t,t}}}function t2(){let n={};return{get:function(e){if(n[e.id]!==void 0)return n[e.id];let t;switch(e.type){case"DirectionalLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new rt};break;case"SpotLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new rt};break;case"PointLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new rt,shadowCameraNear:1,shadowCameraFar:1e3};break}return n[e.id]=t,t}}}var n2=0;function i2(n,e){return(e.castShadow?2:0)-(n.castShadow?2:0)+(e.map?1:0)-(n.map?1:0)}function r2(n){let e=new e2,t=t2(),i={version:0,hash:{directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let l=0;l<9;l++)i.probe.push(new F);let r=new F,s=new Rt,o=new Rt;function a(l){let u=0,d=0,f=0;for(let b=0;b<9;b++)i.probe[b].set(0,0,0);let h=0,g=0,_=0,m=0,p=0,M=0,w=0,S=0,D=0,C=0,A=0;l.sort(i2);for(let b=0,j=l.length;b<j;b++){let T=l[b],O=T.color,k=T.intensity,G=T.distance,B=null;if(T.shadow&&T.shadow.map&&(T.shadow.map.texture.format===co?B=T.shadow.map.texture:B=T.shadow.map.depthTexture||T.shadow.map.texture),T.isAmbientLight)u+=O.r*k,d+=O.g*k,f+=O.b*k;else if(T.isLightProbe){for(let H=0;H<9;H++)i.probe[H].addScaledVector(T.sh.coefficients[H],k);A++}else if(T.isDirectionalLight){let H=e.get(T);if(H.color.copy(T.color).multiplyScalar(T.intensity),T.castShadow){let L=T.shadow,ee=t.get(T);ee.shadowIntensity=L.intensity,ee.shadowBias=L.bias,ee.shadowNormalBias=L.normalBias,ee.shadowRadius=L.radius,ee.shadowMapSize=L.mapSize,i.directionalShadow[h]=ee,i.directionalShadowMap[h]=B,i.directionalShadowMatrix[h]=T.shadow.matrix,M++}i.directional[h]=H,h++}else if(T.isSpotLight){let H=e.get(T);H.position.setFromMatrixPosition(T.matrixWorld),H.color.copy(O).multiplyScalar(k),H.distance=G,H.coneCos=Math.cos(T.angle),H.penumbraCos=Math.cos(T.angle*(1-T.penumbra)),H.decay=T.decay,i.spot[_]=H;let L=T.shadow;if(T.map&&(i.spotLightMap[D]=T.map,D++,L.updateMatrices(T),T.castShadow&&C++),i.spotLightMatrix[_]=L.matrix,T.castShadow){let ee=t.get(T);ee.shadowIntensity=L.intensity,ee.shadowBias=L.bias,ee.shadowNormalBias=L.normalBias,ee.shadowRadius=L.radius,ee.shadowMapSize=L.mapSize,i.spotShadow[_]=ee,i.spotShadowMap[_]=B,S++}_++}else if(T.isRectAreaLight){let H=e.get(T);H.color.copy(O).multiplyScalar(k),H.halfWidth.set(T.width*.5,0,0),H.halfHeight.set(0,T.height*.5,0),i.rectArea[m]=H,m++}else if(T.isPointLight){let H=e.get(T);if(H.color.copy(T.color).multiplyScalar(T.intensity),H.distance=T.distance,H.decay=T.decay,T.castShadow){let L=T.shadow,ee=t.get(T);ee.shadowIntensity=L.intensity,ee.shadowBias=L.bias,ee.shadowNormalBias=L.normalBias,ee.shadowRadius=L.radius,ee.shadowMapSize=L.mapSize,ee.shadowCameraNear=L.camera.near,ee.shadowCameraFar=L.camera.far,i.pointShadow[g]=ee,i.pointShadowMap[g]=B,i.pointShadowMatrix[g]=T.shadow.matrix,w++}i.point[g]=H,g++}else if(T.isHemisphereLight){let H=e.get(T);H.skyColor.copy(T.color).multiplyScalar(k),H.groundColor.copy(T.groundColor).multiplyScalar(k),i.hemi[p]=H,p++}}m>0&&(n.has("OES_texture_float_linear")===!0?(i.rectAreaLTC1=ce.LTC_FLOAT_1,i.rectAreaLTC2=ce.LTC_FLOAT_2):(i.rectAreaLTC1=ce.LTC_HALF_1,i.rectAreaLTC2=ce.LTC_HALF_2)),i.ambient[0]=u,i.ambient[1]=d,i.ambient[2]=f;let y=i.hash;(y.directionalLength!==h||y.pointLength!==g||y.spotLength!==_||y.rectAreaLength!==m||y.hemiLength!==p||y.numDirectionalShadows!==M||y.numPointShadows!==w||y.numSpotShadows!==S||y.numSpotMaps!==D||y.numLightProbes!==A)&&(i.directional.length=h,i.spot.length=_,i.rectArea.length=m,i.point.length=g,i.hemi.length=p,i.directionalShadow.length=M,i.directionalShadowMap.length=M,i.pointShadow.length=w,i.pointShadowMap.length=w,i.spotShadow.length=S,i.spotShadowMap.length=S,i.directionalShadowMatrix.length=M,i.pointShadowMatrix.length=w,i.spotLightMatrix.length=S+D-C,i.spotLightMap.length=D,i.numSpotLightShadowsWithMaps=C,i.numLightProbes=A,y.directionalLength=h,y.pointLength=g,y.spotLength=_,y.rectAreaLength=m,y.hemiLength=p,y.numDirectionalShadows=M,y.numPointShadows=w,y.numSpotShadows=S,y.numSpotMaps=D,y.numLightProbes=A,i.version=n2++)}function c(l,u){let d=0,f=0,h=0,g=0,_=0,m=u.matrixWorldInverse;for(let p=0,M=l.length;p<M;p++){let w=l[p];if(w.isDirectionalLight){let S=i.directional[d];S.direction.setFromMatrixPosition(w.matrixWorld),r.setFromMatrixPosition(w.target.matrixWorld),S.direction.sub(r),S.direction.transformDirection(m),d++}else if(w.isSpotLight){let S=i.spot[h];S.position.setFromMatrixPosition(w.matrixWorld),S.position.applyMatrix4(m),S.direction.setFromMatrixPosition(w.matrixWorld),r.setFromMatrixPosition(w.target.matrixWorld),S.direction.sub(r),S.direction.transformDirection(m),h++}else if(w.isRectAreaLight){let S=i.rectArea[g];S.position.setFromMatrixPosition(w.matrixWorld),S.position.applyMatrix4(m),o.identity(),s.copy(w.matrixWorld),s.premultiply(m),o.extractRotation(s),S.halfWidth.set(w.width*.5,0,0),S.halfHeight.set(0,w.height*.5,0),S.halfWidth.applyMatrix4(o),S.halfHeight.applyMatrix4(o),g++}else if(w.isPointLight){let S=i.point[f];S.position.setFromMatrixPosition(w.matrixWorld),S.position.applyMatrix4(m),f++}else if(w.isHemisphereLight){let S=i.hemi[_];S.direction.setFromMatrixPosition(w.matrixWorld),S.direction.transformDirection(m),_++}}}return{setup:a,setupView:c,state:i}}function nw(n){let e=new r2(n),t=[],i=[];function r(u){l.camera=u,t.length=0,i.length=0}function s(u){t.push(u)}function o(u){i.push(u)}function a(){e.setup(t)}function c(u){e.setupView(t,u)}let l={lightsArray:t,shadowsArray:i,camera:null,lights:e,transmissionRenderTarget:{}};return{init:r,state:l,setupLights:a,setupLightsView:c,pushLight:s,pushShadow:o}}function s2(n){let e=new WeakMap;function t(r,s=0){let o=e.get(r),a;return o===void 0?(a=new nw(n),e.set(r,[a])):s>=o.length?(a=new nw(n),o.push(a)):a=o[s],a}function i(){e=new WeakMap}return{get:t,dispose:i}}var o2=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,a2=`uniform sampler2D shadow_pass;
uniform vec2 resolution;
uniform float radius;
void main() {
	const float samples = float( VSM_SAMPLES );
	float mean = 0.0;
	float squared_mean = 0.0;
	float uvStride = samples <= 1.0 ? 0.0 : 2.0 / ( samples - 1.0 );
	float uvStart = samples <= 1.0 ? 0.0 : - 1.0;
	for ( float i = 0.0; i < samples; i ++ ) {
		float uvOffset = uvStart + i * uvStride;
		#ifdef HORIZONTAL_PASS
			vec2 distribution = texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( uvOffset, 0.0 ) * radius ) / resolution ).rg;
			mean += distribution.x;
			squared_mean += distribution.y * distribution.y + distribution.x * distribution.x;
		#else
			float depth = texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( 0.0, uvOffset ) * radius ) / resolution ).r;
			mean += depth;
			squared_mean += depth * depth;
		#endif
	}
	mean = mean / samples;
	squared_mean = squared_mean / samples;
	float std_dev = sqrt( max( 0.0, squared_mean - mean * mean ) );
	gl_FragColor = vec4( mean, std_dev, 0.0, 1.0 );
}`,c2=[new F(1,0,0),new F(-1,0,0),new F(0,1,0),new F(0,-1,0),new F(0,0,1),new F(0,0,-1)],l2=[new F(0,-1,0),new F(0,-1,0),new F(0,0,1),new F(0,0,-1),new F(0,-1,0),new F(0,-1,0)],iw=new Rt,Pl=new F,c_=new F;function u2(n,e,t){let i=new Ia,r=new rt,s=new rt,o=new Ft,a=new rh,c=new sh,l={},u=t.maxTextureSize,d={[Tr]:Nn,[Nn]:Tr,[Xi]:Xi},f=new Qn({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new rt},radius:{value:4}},vertexShader:o2,fragmentShader:a2}),h=f.clone();h.defines.HORIZONTAL_PASS=1;let g=new Kn;g.setAttribute("position",new Zn(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));let _=new an(g,f),m=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=El;let p=this.type;this.render=function(C,A,y){if(m.enabled===!1||m.autoUpdate===!1&&m.needsUpdate===!1||C.length===0)return;this.type===eE&&(Fe("WebGLShadowMap: PCFSoftShadowMap has been deprecated. Using PCFShadowMap instead."),this.type=El);let b=n.getRenderTarget(),j=n.getActiveCubeFace(),T=n.getActiveMipmapLevel(),O=n.state;O.setBlending(Yi),O.buffers.depth.getReversed()===!0?O.buffers.color.setClear(0,0,0,0):O.buffers.color.setClear(1,1,1,1),O.buffers.depth.setTest(!0),O.setScissorTest(!1);let k=p!==this.type;k&&A.traverse(function(G){G.material&&(Array.isArray(G.material)?G.material.forEach(B=>B.needsUpdate=!0):G.material.needsUpdate=!0)});for(let G=0,B=C.length;G<B;G++){let H=C[G],L=H.shadow;if(L===void 0){Fe("WebGLShadowMap:",H,"has no shadow.");continue}if(L.autoUpdate===!1&&L.needsUpdate===!1)continue;r.copy(L.mapSize);let ee=L.getFrameExtents();r.multiply(ee),s.copy(L.mapSize),(r.x>u||r.y>u)&&(r.x>u&&(s.x=Math.floor(u/ee.x),r.x=s.x*ee.x,L.mapSize.x=s.x),r.y>u&&(s.y=Math.floor(u/ee.y),r.y=s.y*ee.y,L.mapSize.y=s.y));let Z=n.state.buffers.depth.getReversed();if(L.camera._reversedDepth=Z,L.map===null||k===!0){if(L.map!==null&&(L.map.depthTexture!==null&&(L.map.depthTexture.dispose(),L.map.depthTexture=null),L.map.dispose()),this.type===La){if(H.isPointLight){Fe("WebGLShadowMap: VSM shadow maps are not supported for PointLights. Use PCF or BasicShadowMap instead.");continue}L.map=new Jn(r.x,r.y,{format:co,type:Zi,minFilter:hn,magFilter:hn,generateMipmaps:!1}),L.map.texture.name=H.name+".shadowMap",L.map.depthTexture=new cs(r.x,r.y,Oi),L.map.depthTexture.name=H.name+".shadowMapDepth",L.map.depthTexture.format=Wi,L.map.depthTexture.compareFunction=null,L.map.depthTexture.minFilter=on,L.map.depthTexture.magFilter=on}else H.isPointLight?(L.map=new cp(r.x),L.map.depthTexture=new th(r.x,Pi)):(L.map=new Jn(r.x,r.y),L.map.depthTexture=new cs(r.x,r.y,Pi)),L.map.depthTexture.name=H.name+".shadowMap",L.map.depthTexture.format=Wi,this.type===El?(L.map.depthTexture.compareFunction=Z?rp:ip,L.map.depthTexture.minFilter=hn,L.map.depthTexture.magFilter=hn):(L.map.depthTexture.compareFunction=null,L.map.depthTexture.minFilter=on,L.map.depthTexture.magFilter=on);L.camera.updateProjectionMatrix()}let de=L.map.isWebGLCubeRenderTarget?6:1;for(let ve=0;ve<de;ve++){if(L.map.isWebGLCubeRenderTarget)n.setRenderTarget(L.map,ve),n.clear();else{ve===0&&(n.setRenderTarget(L.map),n.clear());let he=L.getViewport(ve);o.set(s.x*he.x,s.y*he.y,s.x*he.z,s.y*he.w),O.viewport(o)}if(H.isPointLight){let he=L.camera,qe=L.matrix,Nt=H.distance||he.far;Nt!==he.far&&(he.far=Nt,he.updateProjectionMatrix()),Pl.setFromMatrixPosition(H.matrixWorld),he.position.copy(Pl),c_.copy(he.position),c_.add(c2[ve]),he.up.copy(l2[ve]),he.lookAt(c_),he.updateMatrixWorld(),qe.makeTranslation(-Pl.x,-Pl.y,-Pl.z),iw.multiplyMatrices(he.projectionMatrix,he.matrixWorldInverse),L._frustum.setFromProjectionMatrix(iw,he.coordinateSystem,he.reversedDepth)}else L.updateMatrices(H);i=L.getFrustum(),S(A,y,L.camera,H,this.type)}L.isPointLightShadow!==!0&&this.type===La&&M(L,y),L.needsUpdate=!1}p=this.type,m.needsUpdate=!1,n.setRenderTarget(b,j,T)};function M(C,A){let y=e.update(_);f.defines.VSM_SAMPLES!==C.blurSamples&&(f.defines.VSM_SAMPLES=C.blurSamples,h.defines.VSM_SAMPLES=C.blurSamples,f.needsUpdate=!0,h.needsUpdate=!0),C.mapPass===null&&(C.mapPass=new Jn(r.x,r.y,{format:co,type:Zi})),f.uniforms.shadow_pass.value=C.map.depthTexture,f.uniforms.resolution.value=C.mapSize,f.uniforms.radius.value=C.radius,n.setRenderTarget(C.mapPass),n.clear(),n.renderBufferDirect(A,null,y,f,_,null),h.uniforms.shadow_pass.value=C.mapPass.texture,h.uniforms.resolution.value=C.mapSize,h.uniforms.radius.value=C.radius,n.setRenderTarget(C.map),n.clear(),n.renderBufferDirect(A,null,y,h,_,null)}function w(C,A,y,b){let j=null,T=y.isPointLight===!0?C.customDistanceMaterial:C.customDepthMaterial;if(T!==void 0)j=T;else if(j=y.isPointLight===!0?c:a,n.localClippingEnabled&&A.clipShadows===!0&&Array.isArray(A.clippingPlanes)&&A.clippingPlanes.length!==0||A.displacementMap&&A.displacementScale!==0||A.alphaMap&&A.alphaTest>0||A.map&&A.alphaTest>0||A.alphaToCoverage===!0){let O=j.uuid,k=A.uuid,G=l[O];G===void 0&&(G={},l[O]=G);let B=G[k];B===void 0&&(B=j.clone(),G[k]=B,A.addEventListener("dispose",D)),j=B}if(j.visible=A.visible,j.wireframe=A.wireframe,b===La?j.side=A.shadowSide!==null?A.shadowSide:A.side:j.side=A.shadowSide!==null?A.shadowSide:d[A.side],j.alphaMap=A.alphaMap,j.alphaTest=A.alphaToCoverage===!0?.5:A.alphaTest,j.map=A.map,j.clipShadows=A.clipShadows,j.clippingPlanes=A.clippingPlanes,j.clipIntersection=A.clipIntersection,j.displacementMap=A.displacementMap,j.displacementScale=A.displacementScale,j.displacementBias=A.displacementBias,j.wireframeLinewidth=A.wireframeLinewidth,j.linewidth=A.linewidth,y.isPointLight===!0&&j.isMeshDistanceMaterial===!0){let O=n.properties.get(j);O.light=y}return j}function S(C,A,y,b,j){if(C.visible===!1)return;if(C.layers.test(A.layers)&&(C.isMesh||C.isLine||C.isPoints)&&(C.castShadow||C.receiveShadow&&j===La)&&(!C.frustumCulled||i.intersectsObject(C))){C.modelViewMatrix.multiplyMatrices(y.matrixWorldInverse,C.matrixWorld);let k=e.update(C),G=C.material;if(Array.isArray(G)){let B=k.groups;for(let H=0,L=B.length;H<L;H++){let ee=B[H],Z=G[ee.materialIndex];if(Z&&Z.visible){let de=w(C,Z,b,j);C.onBeforeShadow(n,C,A,y,k,de,ee),n.renderBufferDirect(y,null,k,de,C,ee),C.onAfterShadow(n,C,A,y,k,de,ee)}}}else if(G.visible){let B=w(C,G,b,j);C.onBeforeShadow(n,C,A,y,k,B,null),n.renderBufferDirect(y,null,k,B,C,null),C.onAfterShadow(n,C,A,y,k,B,null)}}let O=C.children;for(let k=0,G=O.length;k<G;k++)S(O[k],A,y,b,j)}function D(C){C.target.removeEventListener("dispose",D);for(let y in l){let b=l[y],j=C.target.uuid;j in b&&(b[j].dispose(),delete b[j])}}}function d2(n,e){function t(){let R=!1,se=new Ft,ne=null,me=new Ft(0,0,0,0);return{setMask:function(K){ne!==K&&!R&&(n.colorMask(K,K,K,K),ne=K)},setLocked:function(K){R=K},setClear:function(K,W,xe,Be,Dt){Dt===!0&&(K*=Be,W*=Be,xe*=Be),se.set(K,W,xe,Be),me.equals(se)===!1&&(n.clearColor(K,W,xe,Be),me.copy(se))},reset:function(){R=!1,ne=null,me.set(-1,0,0,0)}}}function i(){let R=!1,se=!1,ne=null,me=null,K=null;return{setReversed:function(W){if(se!==W){let xe=e.get("EXT_clip_control");W?xe.clipControlEXT(xe.LOWER_LEFT_EXT,xe.ZERO_TO_ONE_EXT):xe.clipControlEXT(xe.LOWER_LEFT_EXT,xe.NEGATIVE_ONE_TO_ONE_EXT),se=W;let Be=K;K=null,this.setClear(Be)}},getReversed:function(){return se},setTest:function(W){W?ie(n.DEPTH_TEST):oe(n.DEPTH_TEST)},setMask:function(W){ne!==W&&!R&&(n.depthMask(W),ne=W)},setFunc:function(W){if(se&&(W=PE[W]),me!==W){switch(W){case Vf:n.depthFunc(n.NEVER);break;case Hf:n.depthFunc(n.ALWAYS);break;case zf:n.depthFunc(n.LESS);break;case so:n.depthFunc(n.LEQUAL);break;case Gf:n.depthFunc(n.EQUAL);break;case jf:n.depthFunc(n.GEQUAL);break;case Wf:n.depthFunc(n.GREATER);break;case $f:n.depthFunc(n.NOTEQUAL);break;default:n.depthFunc(n.LEQUAL)}me=W}},setLocked:function(W){R=W},setClear:function(W){K!==W&&(K=W,se&&(W=1-W),n.clearDepth(W))},reset:function(){R=!1,ne=null,me=null,K=null,se=!1}}}function r(){let R=!1,se=null,ne=null,me=null,K=null,W=null,xe=null,Be=null,Dt=null;return{setTest:function(yt){R||(yt?ie(n.STENCIL_TEST):oe(n.STENCIL_TEST))},setMask:function(yt){se!==yt&&!R&&(n.stencilMask(yt),se=yt)},setFunc:function(yt,Qi,er){(ne!==yt||me!==Qi||K!==er)&&(n.stencilFunc(yt,Qi,er),ne=yt,me=Qi,K=er)},setOp:function(yt,Qi,er){(W!==yt||xe!==Qi||Be!==er)&&(n.stencilOp(yt,Qi,er),W=yt,xe=Qi,Be=er)},setLocked:function(yt){R=yt},setClear:function(yt){Dt!==yt&&(n.clearStencil(yt),Dt=yt)},reset:function(){R=!1,se=null,ne=null,me=null,K=null,W=null,xe=null,Be=null,Dt=null}}}let s=new t,o=new i,a=new r,c=new WeakMap,l=new WeakMap,u={},d={},f=new WeakMap,h=[],g=null,_=!1,m=null,p=null,M=null,w=null,S=null,D=null,C=null,A=new ot(0,0,0),y=0,b=!1,j=null,T=null,O=null,k=null,G=null,B=n.getParameter(n.MAX_COMBINED_TEXTURE_IMAGE_UNITS),H=!1,L=0,ee=n.getParameter(n.VERSION);ee.indexOf("WebGL")!==-1?(L=parseFloat(/^WebGL (\d)/.exec(ee)[1]),H=L>=1):ee.indexOf("OpenGL ES")!==-1&&(L=parseFloat(/^OpenGL ES (\d)/.exec(ee)[1]),H=L>=2);let Z=null,de={},ve=n.getParameter(n.SCISSOR_BOX),he=n.getParameter(n.VIEWPORT),qe=new Ft().fromArray(ve),Nt=new Ft().fromArray(he);function At(R,se,ne,me){let K=new Uint8Array(4),W=n.createTexture();n.bindTexture(R,W),n.texParameteri(R,n.TEXTURE_MIN_FILTER,n.NEAREST),n.texParameteri(R,n.TEXTURE_MAG_FILTER,n.NEAREST);for(let xe=0;xe<ne;xe++)R===n.TEXTURE_3D||R===n.TEXTURE_2D_ARRAY?n.texImage3D(se,0,n.RGBA,1,1,me,0,n.RGBA,n.UNSIGNED_BYTE,K):n.texImage2D(se+xe,0,n.RGBA,1,1,0,n.RGBA,n.UNSIGNED_BYTE,K);return W}let X={};X[n.TEXTURE_2D]=At(n.TEXTURE_2D,n.TEXTURE_2D,1),X[n.TEXTURE_CUBE_MAP]=At(n.TEXTURE_CUBE_MAP,n.TEXTURE_CUBE_MAP_POSITIVE_X,6),X[n.TEXTURE_2D_ARRAY]=At(n.TEXTURE_2D_ARRAY,n.TEXTURE_2D_ARRAY,1,1),X[n.TEXTURE_3D]=At(n.TEXTURE_3D,n.TEXTURE_3D,1,1),s.setClear(0,0,0,1),o.setClear(1),a.setClear(0),ie(n.DEPTH_TEST),o.setFunc(so),Ye(!1),Bt(Ry),ie(n.CULL_FACE),vt(Yi);function ie(R){u[R]!==!0&&(n.enable(R),u[R]=!0)}function oe(R){u[R]!==!1&&(n.disable(R),u[R]=!1)}function $e(R,se){return d[R]!==se?(n.bindFramebuffer(R,se),d[R]=se,R===n.DRAW_FRAMEBUFFER&&(d[n.FRAMEBUFFER]=se),R===n.FRAMEBUFFER&&(d[n.DRAW_FRAMEBUFFER]=se),!0):!1}function Ae(R,se){let ne=h,me=!1;if(R){ne=f.get(se),ne===void 0&&(ne=[],f.set(se,ne));let K=R.textures;if(ne.length!==K.length||ne[0]!==n.COLOR_ATTACHMENT0){for(let W=0,xe=K.length;W<xe;W++)ne[W]=n.COLOR_ATTACHMENT0+W;ne.length=K.length,me=!0}}else ne[0]!==n.BACK&&(ne[0]=n.BACK,me=!0);me&&n.drawBuffers(ne)}function ke(R){return g!==R?(n.useProgram(R),g=R,!0):!1}let Qt={[rs]:n.FUNC_ADD,[nE]:n.FUNC_SUBTRACT,[iE]:n.FUNC_REVERSE_SUBTRACT};Qt[rE]=n.MIN,Qt[sE]=n.MAX;let at={[oE]:n.ZERO,[aE]:n.ONE,[cE]:n.SRC_COLOR,[Uf]:n.SRC_ALPHA,[pE]:n.SRC_ALPHA_SATURATE,[fE]:n.DST_COLOR,[uE]:n.DST_ALPHA,[lE]:n.ONE_MINUS_SRC_COLOR,[Bf]:n.ONE_MINUS_SRC_ALPHA,[hE]:n.ONE_MINUS_DST_COLOR,[dE]:n.ONE_MINUS_DST_ALPHA,[mE]:n.CONSTANT_COLOR,[gE]:n.ONE_MINUS_CONSTANT_COLOR,[vE]:n.CONSTANT_ALPHA,[yE]:n.ONE_MINUS_CONSTANT_ALPHA};function vt(R,se,ne,me,K,W,xe,Be,Dt,yt){if(R===Yi){_===!0&&(oe(n.BLEND),_=!1);return}if(_===!1&&(ie(n.BLEND),_=!0),R!==tE){if(R!==m||yt!==b){if((p!==rs||S!==rs)&&(n.blendEquation(n.FUNC_ADD),p=rs,S=rs),yt)switch(R){case ro:n.blendFuncSeparate(n.ONE,n.ONE_MINUS_SRC_ALPHA,n.ONE,n.ONE_MINUS_SRC_ALPHA);break;case Ny:n.blendFunc(n.ONE,n.ONE);break;case Py:n.blendFuncSeparate(n.ZERO,n.ONE_MINUS_SRC_COLOR,n.ZERO,n.ONE);break;case Oy:n.blendFuncSeparate(n.DST_COLOR,n.ONE_MINUS_SRC_ALPHA,n.ZERO,n.ONE);break;default:Ne("WebGLState: Invalid blending: ",R);break}else switch(R){case ro:n.blendFuncSeparate(n.SRC_ALPHA,n.ONE_MINUS_SRC_ALPHA,n.ONE,n.ONE_MINUS_SRC_ALPHA);break;case Ny:n.blendFuncSeparate(n.SRC_ALPHA,n.ONE,n.ONE,n.ONE);break;case Py:Ne("WebGLState: SubtractiveBlending requires material.premultipliedAlpha = true");break;case Oy:Ne("WebGLState: MultiplyBlending requires material.premultipliedAlpha = true");break;default:Ne("WebGLState: Invalid blending: ",R);break}M=null,w=null,D=null,C=null,A.set(0,0,0),y=0,m=R,b=yt}return}K=K||se,W=W||ne,xe=xe||me,(se!==p||K!==S)&&(n.blendEquationSeparate(Qt[se],Qt[K]),p=se,S=K),(ne!==M||me!==w||W!==D||xe!==C)&&(n.blendFuncSeparate(at[ne],at[me],at[W],at[xe]),M=ne,w=me,D=W,C=xe),(Be.equals(A)===!1||Dt!==y)&&(n.blendColor(Be.r,Be.g,Be.b,Dt),A.copy(Be),y=Dt),m=R,b=!1}function Et(R,se){R.side===Xi?oe(n.CULL_FACE):ie(n.CULL_FACE);let ne=R.side===Nn;se&&(ne=!ne),Ye(ne),R.blending===ro&&R.transparent===!1?vt(Yi):vt(R.blending,R.blendEquation,R.blendSrc,R.blendDst,R.blendEquationAlpha,R.blendSrcAlpha,R.blendDstAlpha,R.blendColor,R.blendAlpha,R.premultipliedAlpha),o.setFunc(R.depthFunc),o.setTest(R.depthTest),o.setMask(R.depthWrite),s.setMask(R.colorWrite);let me=R.stencilWrite;a.setTest(me),me&&(a.setMask(R.stencilWriteMask),a.setFunc(R.stencilFunc,R.stencilRef,R.stencilFuncMask),a.setOp(R.stencilFail,R.stencilZFail,R.stencilZPass)),jt(R.polygonOffset,R.polygonOffsetFactor,R.polygonOffsetUnits),R.alphaToCoverage===!0?ie(n.SAMPLE_ALPHA_TO_COVERAGE):oe(n.SAMPLE_ALPHA_TO_COVERAGE)}function Ye(R){j!==R&&(R?n.frontFace(n.CW):n.frontFace(n.CCW),j=R)}function Bt(R){R!==KS?(ie(n.CULL_FACE),R!==T&&(R===Ry?n.cullFace(n.BACK):R===QS?n.cullFace(n.FRONT):n.cullFace(n.FRONT_AND_BACK))):oe(n.CULL_FACE),T=R}function I(R){R!==O&&(H&&n.lineWidth(R),O=R)}function jt(R,se,ne){R?(ie(n.POLYGON_OFFSET_FILL),(k!==se||G!==ne)&&(k=se,G=ne,o.getReversed()&&(se=-se),n.polygonOffset(se,ne))):oe(n.POLYGON_OFFSET_FILL)}function ft(R){R?ie(n.SCISSOR_TEST):oe(n.SCISSOR_TEST)}function Tt(R){R===void 0&&(R=n.TEXTURE0+B-1),Z!==R&&(n.activeTexture(R),Z=R)}function Se(R,se,ne){ne===void 0&&(Z===null?ne=n.TEXTURE0+B-1:ne=Z);let me=de[ne];me===void 0&&(me={type:void 0,texture:void 0},de[ne]=me),(me.type!==R||me.texture!==se)&&(Z!==ne&&(n.activeTexture(ne),Z=ne),n.bindTexture(R,se||X[R]),me.type=R,me.texture=se)}function E(){let R=de[Z];R!==void 0&&R.type!==void 0&&(n.bindTexture(R.type,null),R.type=void 0,R.texture=void 0)}function v(){try{n.compressedTexImage2D(...arguments)}catch(R){Ne("WebGLState:",R)}}function N(){try{n.compressedTexImage3D(...arguments)}catch(R){Ne("WebGLState:",R)}}function q(){try{n.texSubImage2D(...arguments)}catch(R){Ne("WebGLState:",R)}}function Y(){try{n.texSubImage3D(...arguments)}catch(R){Ne("WebGLState:",R)}}function $(){try{n.compressedTexSubImage2D(...arguments)}catch(R){Ne("WebGLState:",R)}}function ye(){try{n.compressedTexSubImage3D(...arguments)}catch(R){Ne("WebGLState:",R)}}function re(){try{n.texStorage2D(...arguments)}catch(R){Ne("WebGLState:",R)}}function De(){try{n.texStorage3D(...arguments)}catch(R){Ne("WebGLState:",R)}}function Pe(){try{n.texImage2D(...arguments)}catch(R){Ne("WebGLState:",R)}}function J(){try{n.texImage3D(...arguments)}catch(R){Ne("WebGLState:",R)}}function te(R){qe.equals(R)===!1&&(n.scissor(R.x,R.y,R.z,R.w),qe.copy(R))}function _e(R){Nt.equals(R)===!1&&(n.viewport(R.x,R.y,R.z,R.w),Nt.copy(R))}function Me(R,se){let ne=l.get(se);ne===void 0&&(ne=new WeakMap,l.set(se,ne));let me=ne.get(R);me===void 0&&(me=n.getUniformBlockIndex(se,R.name),ne.set(R,me))}function fe(R,se){let me=l.get(se).get(R);c.get(se)!==me&&(n.uniformBlockBinding(se,me,R.__bindingPointIndex),c.set(se,me))}function Ze(){n.disable(n.BLEND),n.disable(n.CULL_FACE),n.disable(n.DEPTH_TEST),n.disable(n.POLYGON_OFFSET_FILL),n.disable(n.SCISSOR_TEST),n.disable(n.STENCIL_TEST),n.disable(n.SAMPLE_ALPHA_TO_COVERAGE),n.blendEquation(n.FUNC_ADD),n.blendFunc(n.ONE,n.ZERO),n.blendFuncSeparate(n.ONE,n.ZERO,n.ONE,n.ZERO),n.blendColor(0,0,0,0),n.colorMask(!0,!0,!0,!0),n.clearColor(0,0,0,0),n.depthMask(!0),n.depthFunc(n.LESS),o.setReversed(!1),n.clearDepth(1),n.stencilMask(4294967295),n.stencilFunc(n.ALWAYS,0,4294967295),n.stencilOp(n.KEEP,n.KEEP,n.KEEP),n.clearStencil(0),n.cullFace(n.BACK),n.frontFace(n.CCW),n.polygonOffset(0,0),n.activeTexture(n.TEXTURE0),n.bindFramebuffer(n.FRAMEBUFFER,null),n.bindFramebuffer(n.DRAW_FRAMEBUFFER,null),n.bindFramebuffer(n.READ_FRAMEBUFFER,null),n.useProgram(null),n.lineWidth(1),n.scissor(0,0,n.canvas.width,n.canvas.height),n.viewport(0,0,n.canvas.width,n.canvas.height),u={},Z=null,de={},d={},f=new WeakMap,h=[],g=null,_=!1,m=null,p=null,M=null,w=null,S=null,D=null,C=null,A=new ot(0,0,0),y=0,b=!1,j=null,T=null,O=null,k=null,G=null,qe.set(0,0,n.canvas.width,n.canvas.height),Nt.set(0,0,n.canvas.width,n.canvas.height),s.reset(),o.reset(),a.reset()}return{buffers:{color:s,depth:o,stencil:a},enable:ie,disable:oe,bindFramebuffer:$e,drawBuffers:Ae,useProgram:ke,setBlending:vt,setMaterial:Et,setFlipSided:Ye,setCullFace:Bt,setLineWidth:I,setPolygonOffset:jt,setScissorTest:ft,activeTexture:Tt,bindTexture:Se,unbindTexture:E,compressedTexImage2D:v,compressedTexImage3D:N,texImage2D:Pe,texImage3D:J,updateUBOMapping:Me,uniformBlockBinding:fe,texStorage2D:re,texStorage3D:De,texSubImage2D:q,texSubImage3D:Y,compressedTexSubImage2D:$,compressedTexSubImage3D:ye,scissor:te,viewport:_e,reset:Ze}}function f2(n,e,t,i,r,s,o){let a=e.has("WEBGL_multisampled_render_to_texture")?e.get("WEBGL_multisampled_render_to_texture"):null,c=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),l=new rt,u=new WeakMap,d,f=new WeakMap,h=!1;try{h=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function g(E,v){return h?new OffscreenCanvas(E,v):al("canvas")}function _(E,v,N){let q=1,Y=Se(E);if((Y.width>N||Y.height>N)&&(q=N/Math.max(Y.width,Y.height)),q<1)if(typeof HTMLImageElement<"u"&&E instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&E instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&E instanceof ImageBitmap||typeof VideoFrame<"u"&&E instanceof VideoFrame){let $=Math.floor(q*Y.width),ye=Math.floor(q*Y.height);d===void 0&&(d=g($,ye));let re=v?g($,ye):d;return re.width=$,re.height=ye,re.getContext("2d").drawImage(E,0,0,$,ye),Fe("WebGLRenderer: Texture has been resized from ("+Y.width+"x"+Y.height+") to ("+$+"x"+ye+")."),re}else return"data"in E&&Fe("WebGLRenderer: Image in DataTexture is too big ("+Y.width+"x"+Y.height+")."),E;return E}function m(E){return E.generateMipmaps}function p(E){n.generateMipmap(E)}function M(E){return E.isWebGLCubeRenderTarget?n.TEXTURE_CUBE_MAP:E.isWebGL3DRenderTarget?n.TEXTURE_3D:E.isWebGLArrayRenderTarget||E.isCompressedArrayTexture?n.TEXTURE_2D_ARRAY:n.TEXTURE_2D}function w(E,v,N,q,Y=!1){if(E!==null){if(n[E]!==void 0)return n[E];Fe("WebGLRenderer: Attempt to use non-existing WebGL internal format '"+E+"'")}let $=v;if(v===n.RED&&(N===n.FLOAT&&($=n.R32F),N===n.HALF_FLOAT&&($=n.R16F),N===n.UNSIGNED_BYTE&&($=n.R8)),v===n.RED_INTEGER&&(N===n.UNSIGNED_BYTE&&($=n.R8UI),N===n.UNSIGNED_SHORT&&($=n.R16UI),N===n.UNSIGNED_INT&&($=n.R32UI),N===n.BYTE&&($=n.R8I),N===n.SHORT&&($=n.R16I),N===n.INT&&($=n.R32I)),v===n.RG&&(N===n.FLOAT&&($=n.RG32F),N===n.HALF_FLOAT&&($=n.RG16F),N===n.UNSIGNED_BYTE&&($=n.RG8)),v===n.RG_INTEGER&&(N===n.UNSIGNED_BYTE&&($=n.RG8UI),N===n.UNSIGNED_SHORT&&($=n.RG16UI),N===n.UNSIGNED_INT&&($=n.RG32UI),N===n.BYTE&&($=n.RG8I),N===n.SHORT&&($=n.RG16I),N===n.INT&&($=n.RG32I)),v===n.RGB_INTEGER&&(N===n.UNSIGNED_BYTE&&($=n.RGB8UI),N===n.UNSIGNED_SHORT&&($=n.RGB16UI),N===n.UNSIGNED_INT&&($=n.RGB32UI),N===n.BYTE&&($=n.RGB8I),N===n.SHORT&&($=n.RGB16I),N===n.INT&&($=n.RGB32I)),v===n.RGBA_INTEGER&&(N===n.UNSIGNED_BYTE&&($=n.RGBA8UI),N===n.UNSIGNED_SHORT&&($=n.RGBA16UI),N===n.UNSIGNED_INT&&($=n.RGBA32UI),N===n.BYTE&&($=n.RGBA8I),N===n.SHORT&&($=n.RGBA16I),N===n.INT&&($=n.RGBA32I)),v===n.RGB&&(N===n.UNSIGNED_INT_5_9_9_9_REV&&($=n.RGB9_E5),N===n.UNSIGNED_INT_10F_11F_11F_REV&&($=n.R11F_G11F_B10F)),v===n.RGBA){let ye=Y?ol:st.getTransfer(q);N===n.FLOAT&&($=n.RGBA32F),N===n.HALF_FLOAT&&($=n.RGBA16F),N===n.UNSIGNED_BYTE&&($=ye===gt?n.SRGB8_ALPHA8:n.RGBA8),N===n.UNSIGNED_SHORT_4_4_4_4&&($=n.RGBA4),N===n.UNSIGNED_SHORT_5_5_5_1&&($=n.RGB5_A1)}return($===n.R16F||$===n.R32F||$===n.RG16F||$===n.RG32F||$===n.RGBA16F||$===n.RGBA32F)&&e.get("EXT_color_buffer_float"),$}function S(E,v){let N;return E?v===null||v===Pi||v===ka?N=n.DEPTH24_STENCIL8:v===Oi?N=n.DEPTH32F_STENCIL8:v===Fa&&(N=n.DEPTH24_STENCIL8,Fe("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")):v===null||v===Pi||v===ka?N=n.DEPTH_COMPONENT24:v===Oi?N=n.DEPTH_COMPONENT32F:v===Fa&&(N=n.DEPTH_COMPONENT16),N}function D(E,v){return m(E)===!0||E.isFramebufferTexture&&E.minFilter!==on&&E.minFilter!==hn?Math.log2(Math.max(v.width,v.height))+1:E.mipmaps!==void 0&&E.mipmaps.length>0?E.mipmaps.length:E.isCompressedTexture&&Array.isArray(E.image)?v.mipmaps.length:1}function C(E){let v=E.target;v.removeEventListener("dispose",C),y(v),v.isVideoTexture&&u.delete(v)}function A(E){let v=E.target;v.removeEventListener("dispose",A),j(v)}function y(E){let v=i.get(E);if(v.__webglInit===void 0)return;let N=E.source,q=f.get(N);if(q){let Y=q[v.__cacheKey];Y.usedTimes--,Y.usedTimes===0&&b(E),Object.keys(q).length===0&&f.delete(N)}i.remove(E)}function b(E){let v=i.get(E);n.deleteTexture(v.__webglTexture);let N=E.source,q=f.get(N);delete q[v.__cacheKey],o.memory.textures--}function j(E){let v=i.get(E);if(E.depthTexture&&(E.depthTexture.dispose(),i.remove(E.depthTexture)),E.isWebGLCubeRenderTarget)for(let q=0;q<6;q++){if(Array.isArray(v.__webglFramebuffer[q]))for(let Y=0;Y<v.__webglFramebuffer[q].length;Y++)n.deleteFramebuffer(v.__webglFramebuffer[q][Y]);else n.deleteFramebuffer(v.__webglFramebuffer[q]);v.__webglDepthbuffer&&n.deleteRenderbuffer(v.__webglDepthbuffer[q])}else{if(Array.isArray(v.__webglFramebuffer))for(let q=0;q<v.__webglFramebuffer.length;q++)n.deleteFramebuffer(v.__webglFramebuffer[q]);else n.deleteFramebuffer(v.__webglFramebuffer);if(v.__webglDepthbuffer&&n.deleteRenderbuffer(v.__webglDepthbuffer),v.__webglMultisampledFramebuffer&&n.deleteFramebuffer(v.__webglMultisampledFramebuffer),v.__webglColorRenderbuffer)for(let q=0;q<v.__webglColorRenderbuffer.length;q++)v.__webglColorRenderbuffer[q]&&n.deleteRenderbuffer(v.__webglColorRenderbuffer[q]);v.__webglDepthRenderbuffer&&n.deleteRenderbuffer(v.__webglDepthRenderbuffer)}let N=E.textures;for(let q=0,Y=N.length;q<Y;q++){let $=i.get(N[q]);$.__webglTexture&&(n.deleteTexture($.__webglTexture),o.memory.textures--),i.remove(N[q])}i.remove(E)}let T=0;function O(){T=0}function k(){let E=T;return E>=r.maxTextures&&Fe("WebGLTextures: Trying to use "+E+" texture units while this GPU supports only "+r.maxTextures),T+=1,E}function G(E){let v=[];return v.push(E.wrapS),v.push(E.wrapT),v.push(E.wrapR||0),v.push(E.magFilter),v.push(E.minFilter),v.push(E.anisotropy),v.push(E.internalFormat),v.push(E.format),v.push(E.type),v.push(E.generateMipmaps),v.push(E.premultiplyAlpha),v.push(E.flipY),v.push(E.unpackAlignment),v.push(E.colorSpace),v.join()}function B(E,v){let N=i.get(E);if(E.isVideoTexture&&ft(E),E.isRenderTargetTexture===!1&&E.isExternalTexture!==!0&&E.version>0&&N.__version!==E.version){let q=E.image;if(q===null)Fe("WebGLRenderer: Texture marked for update but no image data found.");else if(q.complete===!1)Fe("WebGLRenderer: Texture marked for update but image is incomplete");else{X(N,E,v);return}}else E.isExternalTexture&&(N.__webglTexture=E.sourceTexture?E.sourceTexture:null);t.bindTexture(n.TEXTURE_2D,N.__webglTexture,n.TEXTURE0+v)}function H(E,v){let N=i.get(E);if(E.isRenderTargetTexture===!1&&E.version>0&&N.__version!==E.version){X(N,E,v);return}else E.isExternalTexture&&(N.__webglTexture=E.sourceTexture?E.sourceTexture:null);t.bindTexture(n.TEXTURE_2D_ARRAY,N.__webglTexture,n.TEXTURE0+v)}function L(E,v){let N=i.get(E);if(E.isRenderTargetTexture===!1&&E.version>0&&N.__version!==E.version){X(N,E,v);return}t.bindTexture(n.TEXTURE_3D,N.__webglTexture,n.TEXTURE0+v)}function ee(E,v){let N=i.get(E);if(E.isCubeDepthTexture!==!0&&E.version>0&&N.__version!==E.version){ie(N,E,v);return}t.bindTexture(n.TEXTURE_CUBE_MAP,N.__webglTexture,n.TEXTURE0+v)}let Z={[qf]:n.REPEAT,[ji]:n.CLAMP_TO_EDGE,[Xf]:n.MIRRORED_REPEAT},de={[on]:n.NEAREST,[ME]:n.NEAREST_MIPMAP_NEAREST,[Cl]:n.NEAREST_MIPMAP_LINEAR,[hn]:n.LINEAR,[yh]:n.LINEAR_MIPMAP_NEAREST,[hs]:n.LINEAR_MIPMAP_LINEAR},ve={[EE]:n.NEVER,[IE]:n.ALWAYS,[wE]:n.LESS,[ip]:n.LEQUAL,[CE]:n.EQUAL,[rp]:n.GEQUAL,[TE]:n.GREATER,[DE]:n.NOTEQUAL};function he(E,v){if(v.type===Oi&&e.has("OES_texture_float_linear")===!1&&(v.magFilter===hn||v.magFilter===yh||v.magFilter===Cl||v.magFilter===hs||v.minFilter===hn||v.minFilter===yh||v.minFilter===Cl||v.minFilter===hs)&&Fe("WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),n.texParameteri(E,n.TEXTURE_WRAP_S,Z[v.wrapS]),n.texParameteri(E,n.TEXTURE_WRAP_T,Z[v.wrapT]),(E===n.TEXTURE_3D||E===n.TEXTURE_2D_ARRAY)&&n.texParameteri(E,n.TEXTURE_WRAP_R,Z[v.wrapR]),n.texParameteri(E,n.TEXTURE_MAG_FILTER,de[v.magFilter]),n.texParameteri(E,n.TEXTURE_MIN_FILTER,de[v.minFilter]),v.compareFunction&&(n.texParameteri(E,n.TEXTURE_COMPARE_MODE,n.COMPARE_REF_TO_TEXTURE),n.texParameteri(E,n.TEXTURE_COMPARE_FUNC,ve[v.compareFunction])),e.has("EXT_texture_filter_anisotropic")===!0){if(v.magFilter===on||v.minFilter!==Cl&&v.minFilter!==hs||v.type===Oi&&e.has("OES_texture_float_linear")===!1)return;if(v.anisotropy>1||i.get(v).__currentAnisotropy){let N=e.get("EXT_texture_filter_anisotropic");n.texParameterf(E,N.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(v.anisotropy,r.getMaxAnisotropy())),i.get(v).__currentAnisotropy=v.anisotropy}}}function qe(E,v){let N=!1;E.__webglInit===void 0&&(E.__webglInit=!0,v.addEventListener("dispose",C));let q=v.source,Y=f.get(q);Y===void 0&&(Y={},f.set(q,Y));let $=G(v);if($!==E.__cacheKey){Y[$]===void 0&&(Y[$]={texture:n.createTexture(),usedTimes:0},o.memory.textures++,N=!0),Y[$].usedTimes++;let ye=Y[E.__cacheKey];ye!==void 0&&(Y[E.__cacheKey].usedTimes--,ye.usedTimes===0&&b(v)),E.__cacheKey=$,E.__webglTexture=Y[$].texture}return N}function Nt(E,v,N){return Math.floor(Math.floor(E/N)/v)}function At(E,v,N,q){let $=E.updateRanges;if($.length===0)t.texSubImage2D(n.TEXTURE_2D,0,0,0,v.width,v.height,N,q,v.data);else{$.sort((J,te)=>J.start-te.start);let ye=0;for(let J=1;J<$.length;J++){let te=$[ye],_e=$[J],Me=te.start+te.count,fe=Nt(_e.start,v.width,4),Ze=Nt(te.start,v.width,4);_e.start<=Me+1&&fe===Ze&&Nt(_e.start+_e.count-1,v.width,4)===fe?te.count=Math.max(te.count,_e.start+_e.count-te.start):(++ye,$[ye]=_e)}$.length=ye+1;let re=n.getParameter(n.UNPACK_ROW_LENGTH),De=n.getParameter(n.UNPACK_SKIP_PIXELS),Pe=n.getParameter(n.UNPACK_SKIP_ROWS);n.pixelStorei(n.UNPACK_ROW_LENGTH,v.width);for(let J=0,te=$.length;J<te;J++){let _e=$[J],Me=Math.floor(_e.start/4),fe=Math.ceil(_e.count/4),Ze=Me%v.width,R=Math.floor(Me/v.width),se=fe,ne=1;n.pixelStorei(n.UNPACK_SKIP_PIXELS,Ze),n.pixelStorei(n.UNPACK_SKIP_ROWS,R),t.texSubImage2D(n.TEXTURE_2D,0,Ze,R,se,ne,N,q,v.data)}E.clearUpdateRanges(),n.pixelStorei(n.UNPACK_ROW_LENGTH,re),n.pixelStorei(n.UNPACK_SKIP_PIXELS,De),n.pixelStorei(n.UNPACK_SKIP_ROWS,Pe)}}function X(E,v,N){let q=n.TEXTURE_2D;(v.isDataArrayTexture||v.isCompressedArrayTexture)&&(q=n.TEXTURE_2D_ARRAY),v.isData3DTexture&&(q=n.TEXTURE_3D);let Y=qe(E,v),$=v.source;t.bindTexture(q,E.__webglTexture,n.TEXTURE0+N);let ye=i.get($);if($.version!==ye.__version||Y===!0){t.activeTexture(n.TEXTURE0+N);let re=st.getPrimaries(st.workingColorSpace),De=v.colorSpace===Ir?null:st.getPrimaries(v.colorSpace),Pe=v.colorSpace===Ir||re===De?n.NONE:n.BROWSER_DEFAULT_WEBGL;n.pixelStorei(n.UNPACK_FLIP_Y_WEBGL,v.flipY),n.pixelStorei(n.UNPACK_PREMULTIPLY_ALPHA_WEBGL,v.premultiplyAlpha),n.pixelStorei(n.UNPACK_ALIGNMENT,v.unpackAlignment),n.pixelStorei(n.UNPACK_COLORSPACE_CONVERSION_WEBGL,Pe);let J=_(v.image,!1,r.maxTextureSize);J=Tt(v,J);let te=s.convert(v.format,v.colorSpace),_e=s.convert(v.type),Me=w(v.internalFormat,te,_e,v.colorSpace,v.isVideoTexture);he(q,v);let fe,Ze=v.mipmaps,R=v.isVideoTexture!==!0,se=ye.__version===void 0||Y===!0,ne=$.dataReady,me=D(v,J);if(v.isDepthTexture)Me=S(v.format===ps,v.type),se&&(R?t.texStorage2D(n.TEXTURE_2D,1,Me,J.width,J.height):t.texImage2D(n.TEXTURE_2D,0,Me,J.width,J.height,0,te,_e,null));else if(v.isDataTexture)if(Ze.length>0){R&&se&&t.texStorage2D(n.TEXTURE_2D,me,Me,Ze[0].width,Ze[0].height);for(let K=0,W=Ze.length;K<W;K++)fe=Ze[K],R?ne&&t.texSubImage2D(n.TEXTURE_2D,K,0,0,fe.width,fe.height,te,_e,fe.data):t.texImage2D(n.TEXTURE_2D,K,Me,fe.width,fe.height,0,te,_e,fe.data);v.generateMipmaps=!1}else R?(se&&t.texStorage2D(n.TEXTURE_2D,me,Me,J.width,J.height),ne&&At(v,J,te,_e)):t.texImage2D(n.TEXTURE_2D,0,Me,J.width,J.height,0,te,_e,J.data);else if(v.isCompressedTexture)if(v.isCompressedArrayTexture){R&&se&&t.texStorage3D(n.TEXTURE_2D_ARRAY,me,Me,Ze[0].width,Ze[0].height,J.depth);for(let K=0,W=Ze.length;K<W;K++)if(fe=Ze[K],v.format!==hi)if(te!==null)if(R){if(ne)if(v.layerUpdates.size>0){let xe=n_(fe.width,fe.height,v.format,v.type);for(let Be of v.layerUpdates){let Dt=fe.data.subarray(Be*xe/fe.data.BYTES_PER_ELEMENT,(Be+1)*xe/fe.data.BYTES_PER_ELEMENT);t.compressedTexSubImage3D(n.TEXTURE_2D_ARRAY,K,0,0,Be,fe.width,fe.height,1,te,Dt)}v.clearLayerUpdates()}else t.compressedTexSubImage3D(n.TEXTURE_2D_ARRAY,K,0,0,0,fe.width,fe.height,J.depth,te,fe.data)}else t.compressedTexImage3D(n.TEXTURE_2D_ARRAY,K,Me,fe.width,fe.height,J.depth,0,fe.data,0,0);else Fe("WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else R?ne&&t.texSubImage3D(n.TEXTURE_2D_ARRAY,K,0,0,0,fe.width,fe.height,J.depth,te,_e,fe.data):t.texImage3D(n.TEXTURE_2D_ARRAY,K,Me,fe.width,fe.height,J.depth,0,te,_e,fe.data)}else{R&&se&&t.texStorage2D(n.TEXTURE_2D,me,Me,Ze[0].width,Ze[0].height);for(let K=0,W=Ze.length;K<W;K++)fe=Ze[K],v.format!==hi?te!==null?R?ne&&t.compressedTexSubImage2D(n.TEXTURE_2D,K,0,0,fe.width,fe.height,te,fe.data):t.compressedTexImage2D(n.TEXTURE_2D,K,Me,fe.width,fe.height,0,fe.data):Fe("WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):R?ne&&t.texSubImage2D(n.TEXTURE_2D,K,0,0,fe.width,fe.height,te,_e,fe.data):t.texImage2D(n.TEXTURE_2D,K,Me,fe.width,fe.height,0,te,_e,fe.data)}else if(v.isDataArrayTexture)if(R){if(se&&t.texStorage3D(n.TEXTURE_2D_ARRAY,me,Me,J.width,J.height,J.depth),ne)if(v.layerUpdates.size>0){let K=n_(J.width,J.height,v.format,v.type);for(let W of v.layerUpdates){let xe=J.data.subarray(W*K/J.data.BYTES_PER_ELEMENT,(W+1)*K/J.data.BYTES_PER_ELEMENT);t.texSubImage3D(n.TEXTURE_2D_ARRAY,0,0,0,W,J.width,J.height,1,te,_e,xe)}v.clearLayerUpdates()}else t.texSubImage3D(n.TEXTURE_2D_ARRAY,0,0,0,0,J.width,J.height,J.depth,te,_e,J.data)}else t.texImage3D(n.TEXTURE_2D_ARRAY,0,Me,J.width,J.height,J.depth,0,te,_e,J.data);else if(v.isData3DTexture)R?(se&&t.texStorage3D(n.TEXTURE_3D,me,Me,J.width,J.height,J.depth),ne&&t.texSubImage3D(n.TEXTURE_3D,0,0,0,0,J.width,J.height,J.depth,te,_e,J.data)):t.texImage3D(n.TEXTURE_3D,0,Me,J.width,J.height,J.depth,0,te,_e,J.data);else if(v.isFramebufferTexture){if(se)if(R)t.texStorage2D(n.TEXTURE_2D,me,Me,J.width,J.height);else{let K=J.width,W=J.height;for(let xe=0;xe<me;xe++)t.texImage2D(n.TEXTURE_2D,xe,Me,K,W,0,te,_e,null),K>>=1,W>>=1}}else if(Ze.length>0){if(R&&se){let K=Se(Ze[0]);t.texStorage2D(n.TEXTURE_2D,me,Me,K.width,K.height)}for(let K=0,W=Ze.length;K<W;K++)fe=Ze[K],R?ne&&t.texSubImage2D(n.TEXTURE_2D,K,0,0,te,_e,fe):t.texImage2D(n.TEXTURE_2D,K,Me,te,_e,fe);v.generateMipmaps=!1}else if(R){if(se){let K=Se(J);t.texStorage2D(n.TEXTURE_2D,me,Me,K.width,K.height)}ne&&t.texSubImage2D(n.TEXTURE_2D,0,0,0,te,_e,J)}else t.texImage2D(n.TEXTURE_2D,0,Me,te,_e,J);m(v)&&p(q),ye.__version=$.version,v.onUpdate&&v.onUpdate(v)}E.__version=v.version}function ie(E,v,N){if(v.image.length!==6)return;let q=qe(E,v),Y=v.source;t.bindTexture(n.TEXTURE_CUBE_MAP,E.__webglTexture,n.TEXTURE0+N);let $=i.get(Y);if(Y.version!==$.__version||q===!0){t.activeTexture(n.TEXTURE0+N);let ye=st.getPrimaries(st.workingColorSpace),re=v.colorSpace===Ir?null:st.getPrimaries(v.colorSpace),De=v.colorSpace===Ir||ye===re?n.NONE:n.BROWSER_DEFAULT_WEBGL;n.pixelStorei(n.UNPACK_FLIP_Y_WEBGL,v.flipY),n.pixelStorei(n.UNPACK_PREMULTIPLY_ALPHA_WEBGL,v.premultiplyAlpha),n.pixelStorei(n.UNPACK_ALIGNMENT,v.unpackAlignment),n.pixelStorei(n.UNPACK_COLORSPACE_CONVERSION_WEBGL,De);let Pe=v.isCompressedTexture||v.image[0].isCompressedTexture,J=v.image[0]&&v.image[0].isDataTexture,te=[];for(let W=0;W<6;W++)!Pe&&!J?te[W]=_(v.image[W],!0,r.maxCubemapSize):te[W]=J?v.image[W].image:v.image[W],te[W]=Tt(v,te[W]);let _e=te[0],Me=s.convert(v.format,v.colorSpace),fe=s.convert(v.type),Ze=w(v.internalFormat,Me,fe,v.colorSpace),R=v.isVideoTexture!==!0,se=$.__version===void 0||q===!0,ne=Y.dataReady,me=D(v,_e);he(n.TEXTURE_CUBE_MAP,v);let K;if(Pe){R&&se&&t.texStorage2D(n.TEXTURE_CUBE_MAP,me,Ze,_e.width,_e.height);for(let W=0;W<6;W++){K=te[W].mipmaps;for(let xe=0;xe<K.length;xe++){let Be=K[xe];v.format!==hi?Me!==null?R?ne&&t.compressedTexSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+W,xe,0,0,Be.width,Be.height,Me,Be.data):t.compressedTexImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+W,xe,Ze,Be.width,Be.height,0,Be.data):Fe("WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):R?ne&&t.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+W,xe,0,0,Be.width,Be.height,Me,fe,Be.data):t.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+W,xe,Ze,Be.width,Be.height,0,Me,fe,Be.data)}}}else{if(K=v.mipmaps,R&&se){K.length>0&&me++;let W=Se(te[0]);t.texStorage2D(n.TEXTURE_CUBE_MAP,me,Ze,W.width,W.height)}for(let W=0;W<6;W++)if(J){R?ne&&t.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+W,0,0,0,te[W].width,te[W].height,Me,fe,te[W].data):t.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+W,0,Ze,te[W].width,te[W].height,0,Me,fe,te[W].data);for(let xe=0;xe<K.length;xe++){let Dt=K[xe].image[W].image;R?ne&&t.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+W,xe+1,0,0,Dt.width,Dt.height,Me,fe,Dt.data):t.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+W,xe+1,Ze,Dt.width,Dt.height,0,Me,fe,Dt.data)}}else{R?ne&&t.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+W,0,0,0,Me,fe,te[W]):t.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+W,0,Ze,Me,fe,te[W]);for(let xe=0;xe<K.length;xe++){let Be=K[xe];R?ne&&t.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+W,xe+1,0,0,Me,fe,Be.image[W]):t.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+W,xe+1,Ze,Me,fe,Be.image[W])}}}m(v)&&p(n.TEXTURE_CUBE_MAP),$.__version=Y.version,v.onUpdate&&v.onUpdate(v)}E.__version=v.version}function oe(E,v,N,q,Y,$){let ye=s.convert(N.format,N.colorSpace),re=s.convert(N.type),De=w(N.internalFormat,ye,re,N.colorSpace),Pe=i.get(v),J=i.get(N);if(J.__renderTarget=v,!Pe.__hasExternalTextures){let te=Math.max(1,v.width>>$),_e=Math.max(1,v.height>>$);Y===n.TEXTURE_3D||Y===n.TEXTURE_2D_ARRAY?t.texImage3D(Y,$,De,te,_e,v.depth,0,ye,re,null):t.texImage2D(Y,$,De,te,_e,0,ye,re,null)}t.bindFramebuffer(n.FRAMEBUFFER,E),jt(v)?a.framebufferTexture2DMultisampleEXT(n.FRAMEBUFFER,q,Y,J.__webglTexture,0,I(v)):(Y===n.TEXTURE_2D||Y>=n.TEXTURE_CUBE_MAP_POSITIVE_X&&Y<=n.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&n.framebufferTexture2D(n.FRAMEBUFFER,q,Y,J.__webglTexture,$),t.bindFramebuffer(n.FRAMEBUFFER,null)}function $e(E,v,N){if(n.bindRenderbuffer(n.RENDERBUFFER,E),v.depthBuffer){let q=v.depthTexture,Y=q&&q.isDepthTexture?q.type:null,$=S(v.stencilBuffer,Y),ye=v.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT;jt(v)?a.renderbufferStorageMultisampleEXT(n.RENDERBUFFER,I(v),$,v.width,v.height):N?n.renderbufferStorageMultisample(n.RENDERBUFFER,I(v),$,v.width,v.height):n.renderbufferStorage(n.RENDERBUFFER,$,v.width,v.height),n.framebufferRenderbuffer(n.FRAMEBUFFER,ye,n.RENDERBUFFER,E)}else{let q=v.textures;for(let Y=0;Y<q.length;Y++){let $=q[Y],ye=s.convert($.format,$.colorSpace),re=s.convert($.type),De=w($.internalFormat,ye,re,$.colorSpace);jt(v)?a.renderbufferStorageMultisampleEXT(n.RENDERBUFFER,I(v),De,v.width,v.height):N?n.renderbufferStorageMultisample(n.RENDERBUFFER,I(v),De,v.width,v.height):n.renderbufferStorage(n.RENDERBUFFER,De,v.width,v.height)}}n.bindRenderbuffer(n.RENDERBUFFER,null)}function Ae(E,v,N){let q=v.isWebGLCubeRenderTarget===!0;if(t.bindFramebuffer(n.FRAMEBUFFER,E),!(v.depthTexture&&v.depthTexture.isDepthTexture))throw new Error("renderTarget.depthTexture must be an instance of THREE.DepthTexture");let Y=i.get(v.depthTexture);if(Y.__renderTarget=v,(!Y.__webglTexture||v.depthTexture.image.width!==v.width||v.depthTexture.image.height!==v.height)&&(v.depthTexture.image.width=v.width,v.depthTexture.image.height=v.height,v.depthTexture.needsUpdate=!0),q){if(Y.__webglInit===void 0&&(Y.__webglInit=!0,v.depthTexture.addEventListener("dispose",C)),Y.__webglTexture===void 0){Y.__webglTexture=n.createTexture(),t.bindTexture(n.TEXTURE_CUBE_MAP,Y.__webglTexture),he(n.TEXTURE_CUBE_MAP,v.depthTexture);let Pe=s.convert(v.depthTexture.format),J=s.convert(v.depthTexture.type),te;v.depthTexture.format===Wi?te=n.DEPTH_COMPONENT24:v.depthTexture.format===ps&&(te=n.DEPTH24_STENCIL8);for(let _e=0;_e<6;_e++)n.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+_e,0,te,v.width,v.height,0,Pe,J,null)}}else B(v.depthTexture,0);let $=Y.__webglTexture,ye=I(v),re=q?n.TEXTURE_CUBE_MAP_POSITIVE_X+N:n.TEXTURE_2D,De=v.depthTexture.format===ps?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT;if(v.depthTexture.format===Wi)jt(v)?a.framebufferTexture2DMultisampleEXT(n.FRAMEBUFFER,De,re,$,0,ye):n.framebufferTexture2D(n.FRAMEBUFFER,De,re,$,0);else if(v.depthTexture.format===ps)jt(v)?a.framebufferTexture2DMultisampleEXT(n.FRAMEBUFFER,De,re,$,0,ye):n.framebufferTexture2D(n.FRAMEBUFFER,De,re,$,0);else throw new Error("Unknown depthTexture format")}function ke(E){let v=i.get(E),N=E.isWebGLCubeRenderTarget===!0;if(v.__boundDepthTexture!==E.depthTexture){let q=E.depthTexture;if(v.__depthDisposeCallback&&v.__depthDisposeCallback(),q){let Y=()=>{delete v.__boundDepthTexture,delete v.__depthDisposeCallback,q.removeEventListener("dispose",Y)};q.addEventListener("dispose",Y),v.__depthDisposeCallback=Y}v.__boundDepthTexture=q}if(E.depthTexture&&!v.__autoAllocateDepthBuffer)if(N)for(let q=0;q<6;q++)Ae(v.__webglFramebuffer[q],E,q);else{let q=E.texture.mipmaps;q&&q.length>0?Ae(v.__webglFramebuffer[0],E,0):Ae(v.__webglFramebuffer,E,0)}else if(N){v.__webglDepthbuffer=[];for(let q=0;q<6;q++)if(t.bindFramebuffer(n.FRAMEBUFFER,v.__webglFramebuffer[q]),v.__webglDepthbuffer[q]===void 0)v.__webglDepthbuffer[q]=n.createRenderbuffer(),$e(v.__webglDepthbuffer[q],E,!1);else{let Y=E.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT,$=v.__webglDepthbuffer[q];n.bindRenderbuffer(n.RENDERBUFFER,$),n.framebufferRenderbuffer(n.FRAMEBUFFER,Y,n.RENDERBUFFER,$)}}else{let q=E.texture.mipmaps;if(q&&q.length>0?t.bindFramebuffer(n.FRAMEBUFFER,v.__webglFramebuffer[0]):t.bindFramebuffer(n.FRAMEBUFFER,v.__webglFramebuffer),v.__webglDepthbuffer===void 0)v.__webglDepthbuffer=n.createRenderbuffer(),$e(v.__webglDepthbuffer,E,!1);else{let Y=E.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT,$=v.__webglDepthbuffer;n.bindRenderbuffer(n.RENDERBUFFER,$),n.framebufferRenderbuffer(n.FRAMEBUFFER,Y,n.RENDERBUFFER,$)}}t.bindFramebuffer(n.FRAMEBUFFER,null)}function Qt(E,v,N){let q=i.get(E);v!==void 0&&oe(q.__webglFramebuffer,E,E.texture,n.COLOR_ATTACHMENT0,n.TEXTURE_2D,0),N!==void 0&&ke(E)}function at(E){let v=E.texture,N=i.get(E),q=i.get(v);E.addEventListener("dispose",A);let Y=E.textures,$=E.isWebGLCubeRenderTarget===!0,ye=Y.length>1;if(ye||(q.__webglTexture===void 0&&(q.__webglTexture=n.createTexture()),q.__version=v.version,o.memory.textures++),$){N.__webglFramebuffer=[];for(let re=0;re<6;re++)if(v.mipmaps&&v.mipmaps.length>0){N.__webglFramebuffer[re]=[];for(let De=0;De<v.mipmaps.length;De++)N.__webglFramebuffer[re][De]=n.createFramebuffer()}else N.__webglFramebuffer[re]=n.createFramebuffer()}else{if(v.mipmaps&&v.mipmaps.length>0){N.__webglFramebuffer=[];for(let re=0;re<v.mipmaps.length;re++)N.__webglFramebuffer[re]=n.createFramebuffer()}else N.__webglFramebuffer=n.createFramebuffer();if(ye)for(let re=0,De=Y.length;re<De;re++){let Pe=i.get(Y[re]);Pe.__webglTexture===void 0&&(Pe.__webglTexture=n.createTexture(),o.memory.textures++)}if(E.samples>0&&jt(E)===!1){N.__webglMultisampledFramebuffer=n.createFramebuffer(),N.__webglColorRenderbuffer=[],t.bindFramebuffer(n.FRAMEBUFFER,N.__webglMultisampledFramebuffer);for(let re=0;re<Y.length;re++){let De=Y[re];N.__webglColorRenderbuffer[re]=n.createRenderbuffer(),n.bindRenderbuffer(n.RENDERBUFFER,N.__webglColorRenderbuffer[re]);let Pe=s.convert(De.format,De.colorSpace),J=s.convert(De.type),te=w(De.internalFormat,Pe,J,De.colorSpace,E.isXRRenderTarget===!0),_e=I(E);n.renderbufferStorageMultisample(n.RENDERBUFFER,_e,te,E.width,E.height),n.framebufferRenderbuffer(n.FRAMEBUFFER,n.COLOR_ATTACHMENT0+re,n.RENDERBUFFER,N.__webglColorRenderbuffer[re])}n.bindRenderbuffer(n.RENDERBUFFER,null),E.depthBuffer&&(N.__webglDepthRenderbuffer=n.createRenderbuffer(),$e(N.__webglDepthRenderbuffer,E,!0)),t.bindFramebuffer(n.FRAMEBUFFER,null)}}if($){t.bindTexture(n.TEXTURE_CUBE_MAP,q.__webglTexture),he(n.TEXTURE_CUBE_MAP,v);for(let re=0;re<6;re++)if(v.mipmaps&&v.mipmaps.length>0)for(let De=0;De<v.mipmaps.length;De++)oe(N.__webglFramebuffer[re][De],E,v,n.COLOR_ATTACHMENT0,n.TEXTURE_CUBE_MAP_POSITIVE_X+re,De);else oe(N.__webglFramebuffer[re],E,v,n.COLOR_ATTACHMENT0,n.TEXTURE_CUBE_MAP_POSITIVE_X+re,0);m(v)&&p(n.TEXTURE_CUBE_MAP),t.unbindTexture()}else if(ye){for(let re=0,De=Y.length;re<De;re++){let Pe=Y[re],J=i.get(Pe),te=n.TEXTURE_2D;(E.isWebGL3DRenderTarget||E.isWebGLArrayRenderTarget)&&(te=E.isWebGL3DRenderTarget?n.TEXTURE_3D:n.TEXTURE_2D_ARRAY),t.bindTexture(te,J.__webglTexture),he(te,Pe),oe(N.__webglFramebuffer,E,Pe,n.COLOR_ATTACHMENT0+re,te,0),m(Pe)&&p(te)}t.unbindTexture()}else{let re=n.TEXTURE_2D;if((E.isWebGL3DRenderTarget||E.isWebGLArrayRenderTarget)&&(re=E.isWebGL3DRenderTarget?n.TEXTURE_3D:n.TEXTURE_2D_ARRAY),t.bindTexture(re,q.__webglTexture),he(re,v),v.mipmaps&&v.mipmaps.length>0)for(let De=0;De<v.mipmaps.length;De++)oe(N.__webglFramebuffer[De],E,v,n.COLOR_ATTACHMENT0,re,De);else oe(N.__webglFramebuffer,E,v,n.COLOR_ATTACHMENT0,re,0);m(v)&&p(re),t.unbindTexture()}E.depthBuffer&&ke(E)}function vt(E){let v=E.textures;for(let N=0,q=v.length;N<q;N++){let Y=v[N];if(m(Y)){let $=M(E),ye=i.get(Y).__webglTexture;t.bindTexture($,ye),p($),t.unbindTexture()}}}let Et=[],Ye=[];function Bt(E){if(E.samples>0){if(jt(E)===!1){let v=E.textures,N=E.width,q=E.height,Y=n.COLOR_BUFFER_BIT,$=E.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT,ye=i.get(E),re=v.length>1;if(re)for(let Pe=0;Pe<v.length;Pe++)t.bindFramebuffer(n.FRAMEBUFFER,ye.__webglMultisampledFramebuffer),n.framebufferRenderbuffer(n.FRAMEBUFFER,n.COLOR_ATTACHMENT0+Pe,n.RENDERBUFFER,null),t.bindFramebuffer(n.FRAMEBUFFER,ye.__webglFramebuffer),n.framebufferTexture2D(n.DRAW_FRAMEBUFFER,n.COLOR_ATTACHMENT0+Pe,n.TEXTURE_2D,null,0);t.bindFramebuffer(n.READ_FRAMEBUFFER,ye.__webglMultisampledFramebuffer);let De=E.texture.mipmaps;De&&De.length>0?t.bindFramebuffer(n.DRAW_FRAMEBUFFER,ye.__webglFramebuffer[0]):t.bindFramebuffer(n.DRAW_FRAMEBUFFER,ye.__webglFramebuffer);for(let Pe=0;Pe<v.length;Pe++){if(E.resolveDepthBuffer&&(E.depthBuffer&&(Y|=n.DEPTH_BUFFER_BIT),E.stencilBuffer&&E.resolveStencilBuffer&&(Y|=n.STENCIL_BUFFER_BIT)),re){n.framebufferRenderbuffer(n.READ_FRAMEBUFFER,n.COLOR_ATTACHMENT0,n.RENDERBUFFER,ye.__webglColorRenderbuffer[Pe]);let J=i.get(v[Pe]).__webglTexture;n.framebufferTexture2D(n.DRAW_FRAMEBUFFER,n.COLOR_ATTACHMENT0,n.TEXTURE_2D,J,0)}n.blitFramebuffer(0,0,N,q,0,0,N,q,Y,n.NEAREST),c===!0&&(Et.length=0,Ye.length=0,Et.push(n.COLOR_ATTACHMENT0+Pe),E.depthBuffer&&E.resolveDepthBuffer===!1&&(Et.push($),Ye.push($),n.invalidateFramebuffer(n.DRAW_FRAMEBUFFER,Ye)),n.invalidateFramebuffer(n.READ_FRAMEBUFFER,Et))}if(t.bindFramebuffer(n.READ_FRAMEBUFFER,null),t.bindFramebuffer(n.DRAW_FRAMEBUFFER,null),re)for(let Pe=0;Pe<v.length;Pe++){t.bindFramebuffer(n.FRAMEBUFFER,ye.__webglMultisampledFramebuffer),n.framebufferRenderbuffer(n.FRAMEBUFFER,n.COLOR_ATTACHMENT0+Pe,n.RENDERBUFFER,ye.__webglColorRenderbuffer[Pe]);let J=i.get(v[Pe]).__webglTexture;t.bindFramebuffer(n.FRAMEBUFFER,ye.__webglFramebuffer),n.framebufferTexture2D(n.DRAW_FRAMEBUFFER,n.COLOR_ATTACHMENT0+Pe,n.TEXTURE_2D,J,0)}t.bindFramebuffer(n.DRAW_FRAMEBUFFER,ye.__webglMultisampledFramebuffer)}else if(E.depthBuffer&&E.resolveDepthBuffer===!1&&c){let v=E.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT;n.invalidateFramebuffer(n.DRAW_FRAMEBUFFER,[v])}}}function I(E){return Math.min(r.maxSamples,E.samples)}function jt(E){let v=i.get(E);return E.samples>0&&e.has("WEBGL_multisampled_render_to_texture")===!0&&v.__useRenderToTexture!==!1}function ft(E){let v=o.render.frame;u.get(E)!==v&&(u.set(E,v),E.update())}function Tt(E,v){let N=E.colorSpace,q=E.format,Y=E.type;return E.isCompressedTexture===!0||E.isVideoTexture===!0||N!==oo&&N!==Ir&&(st.getTransfer(N)===gt?(q!==hi||Y!==Vn)&&Fe("WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):Ne("WebGLTextures: Unsupported texture color space:",N)),v}function Se(E){return typeof HTMLImageElement<"u"&&E instanceof HTMLImageElement?(l.width=E.naturalWidth||E.width,l.height=E.naturalHeight||E.height):typeof VideoFrame<"u"&&E instanceof VideoFrame?(l.width=E.displayWidth,l.height=E.displayHeight):(l.width=E.width,l.height=E.height),l}this.allocateTextureUnit=k,this.resetTextureUnits=O,this.setTexture2D=B,this.setTexture2DArray=H,this.setTexture3D=L,this.setTextureCube=ee,this.rebindTextures=Qt,this.setupRenderTarget=at,this.updateRenderTargetMipmap=vt,this.updateMultisampleRenderTarget=Bt,this.setupDepthRenderbuffer=ke,this.setupFrameBufferTexture=oe,this.useMultisampledRTT=jt,this.isReversedDepthBuffer=function(){return t.buffers.depth.getReversed()}}function h2(n,e){function t(i,r=Ir){let s,o=st.getTransfer(r);if(i===Vn)return n.UNSIGNED_BYTE;if(i===xh)return n.UNSIGNED_SHORT_4_4_4_4;if(i===Mh)return n.UNSIGNED_SHORT_5_5_5_1;if(i===Wy)return n.UNSIGNED_INT_5_9_9_9_REV;if(i===$y)return n.UNSIGNED_INT_10F_11F_11F_REV;if(i===Gy)return n.BYTE;if(i===jy)return n.SHORT;if(i===Fa)return n.UNSIGNED_SHORT;if(i===_h)return n.INT;if(i===Pi)return n.UNSIGNED_INT;if(i===Oi)return n.FLOAT;if(i===Zi)return n.HALF_FLOAT;if(i===qy)return n.ALPHA;if(i===Xy)return n.RGB;if(i===hi)return n.RGBA;if(i===Wi)return n.DEPTH_COMPONENT;if(i===ps)return n.DEPTH_STENCIL;if(i===Yy)return n.RED;if(i===bh)return n.RED_INTEGER;if(i===co)return n.RG;if(i===Sh)return n.RG_INTEGER;if(i===Eh)return n.RGBA_INTEGER;if(i===Tl||i===Dl||i===Il||i===Al)if(o===gt)if(s=e.get("WEBGL_compressed_texture_s3tc_srgb"),s!==null){if(i===Tl)return s.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(i===Dl)return s.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(i===Il)return s.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(i===Al)return s.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(s=e.get("WEBGL_compressed_texture_s3tc"),s!==null){if(i===Tl)return s.COMPRESSED_RGB_S3TC_DXT1_EXT;if(i===Dl)return s.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(i===Il)return s.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(i===Al)return s.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(i===wh||i===Ch||i===Th||i===Dh)if(s=e.get("WEBGL_compressed_texture_pvrtc"),s!==null){if(i===wh)return s.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(i===Ch)return s.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(i===Th)return s.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(i===Dh)return s.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(i===Ih||i===Ah||i===Rh||i===Nh||i===Ph||i===Oh||i===Lh)if(s=e.get("WEBGL_compressed_texture_etc"),s!==null){if(i===Ih||i===Ah)return o===gt?s.COMPRESSED_SRGB8_ETC2:s.COMPRESSED_RGB8_ETC2;if(i===Rh)return o===gt?s.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:s.COMPRESSED_RGBA8_ETC2_EAC;if(i===Nh)return s.COMPRESSED_R11_EAC;if(i===Ph)return s.COMPRESSED_SIGNED_R11_EAC;if(i===Oh)return s.COMPRESSED_RG11_EAC;if(i===Lh)return s.COMPRESSED_SIGNED_RG11_EAC}else return null;if(i===Fh||i===kh||i===Uh||i===Bh||i===Vh||i===Hh||i===zh||i===Gh||i===jh||i===Wh||i===$h||i===qh||i===Xh||i===Yh)if(s=e.get("WEBGL_compressed_texture_astc"),s!==null){if(i===Fh)return o===gt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:s.COMPRESSED_RGBA_ASTC_4x4_KHR;if(i===kh)return o===gt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:s.COMPRESSED_RGBA_ASTC_5x4_KHR;if(i===Uh)return o===gt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:s.COMPRESSED_RGBA_ASTC_5x5_KHR;if(i===Bh)return o===gt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:s.COMPRESSED_RGBA_ASTC_6x5_KHR;if(i===Vh)return o===gt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:s.COMPRESSED_RGBA_ASTC_6x6_KHR;if(i===Hh)return o===gt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:s.COMPRESSED_RGBA_ASTC_8x5_KHR;if(i===zh)return o===gt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:s.COMPRESSED_RGBA_ASTC_8x6_KHR;if(i===Gh)return o===gt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:s.COMPRESSED_RGBA_ASTC_8x8_KHR;if(i===jh)return o===gt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:s.COMPRESSED_RGBA_ASTC_10x5_KHR;if(i===Wh)return o===gt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:s.COMPRESSED_RGBA_ASTC_10x6_KHR;if(i===$h)return o===gt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:s.COMPRESSED_RGBA_ASTC_10x8_KHR;if(i===qh)return o===gt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:s.COMPRESSED_RGBA_ASTC_10x10_KHR;if(i===Xh)return o===gt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:s.COMPRESSED_RGBA_ASTC_12x10_KHR;if(i===Yh)return o===gt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:s.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(i===Zh||i===Jh||i===Kh)if(s=e.get("EXT_texture_compression_bptc"),s!==null){if(i===Zh)return o===gt?s.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:s.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(i===Jh)return s.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(i===Kh)return s.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(i===Qh||i===ep||i===tp||i===np)if(s=e.get("EXT_texture_compression_rgtc"),s!==null){if(i===Qh)return s.COMPRESSED_RED_RGTC1_EXT;if(i===ep)return s.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(i===tp)return s.COMPRESSED_RED_GREEN_RGTC2_EXT;if(i===np)return s.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return i===ka?n.UNSIGNED_INT_24_8:n[i]!==void 0?n[i]:null}return{convert:t}}var p2=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,m2=`
uniform sampler2DArray depthColor;
uniform float depthWidth;
uniform float depthHeight;

void main() {

	vec2 coord = vec2( gl_FragCoord.x / depthWidth, gl_FragCoord.y / depthHeight );

	if ( coord.x >= 1.0 ) {

		gl_FragDepth = texture( depthColor, vec3( coord.x - 1.0, coord.y, 1 ) ).r;

	} else {

		gl_FragDepth = texture( depthColor, vec3( coord.x, coord.y, 0 ) ).r;

	}

}`,g_=class{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(e,t){if(this.texture===null){let i=new ml(e.texture);(e.depthNear!==t.depthNear||e.depthFar!==t.depthFar)&&(this.depthNear=e.depthNear,this.depthFar=e.depthFar),this.texture=i}}getMesh(e){if(this.texture!==null&&this.mesh===null){let t=e.cameras[0].viewport,i=new Qn({vertexShader:p2,fragmentShader:m2,uniforms:{depthColor:{value:this.texture},depthWidth:{value:t.z},depthHeight:{value:t.w}}});this.mesh=new an(new vl(20,20),i)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}},v_=class extends Dr{constructor(e,t){super();let i=this,r=null,s=1,o=null,a="local-floor",c=1,l=null,u=null,d=null,f=null,h=null,g=null,_=typeof XRWebGLBinding<"u",m=new g_,p={},M=t.getContextAttributes(),w=null,S=null,D=[],C=[],A=new rt,y=null,b=new bn;b.viewport=new Ft;let j=new bn;j.viewport=new Ft;let T=[b,j],O=new mh,k=null,G=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(X){let ie=D[X];return ie===void 0&&(ie=new Ta,D[X]=ie),ie.getTargetRaySpace()},this.getControllerGrip=function(X){let ie=D[X];return ie===void 0&&(ie=new Ta,D[X]=ie),ie.getGripSpace()},this.getHand=function(X){let ie=D[X];return ie===void 0&&(ie=new Ta,D[X]=ie),ie.getHandSpace()};function B(X){let ie=C.indexOf(X.inputSource);if(ie===-1)return;let oe=D[ie];oe!==void 0&&(oe.update(X.inputSource,X.frame,l||o),oe.dispatchEvent({type:X.type,data:X.inputSource}))}function H(){r.removeEventListener("select",B),r.removeEventListener("selectstart",B),r.removeEventListener("selectend",B),r.removeEventListener("squeeze",B),r.removeEventListener("squeezestart",B),r.removeEventListener("squeezeend",B),r.removeEventListener("end",H),r.removeEventListener("inputsourceschange",L);for(let X=0;X<D.length;X++){let ie=C[X];ie!==null&&(C[X]=null,D[X].disconnect(ie))}k=null,G=null,m.reset();for(let X in p)delete p[X];e.setRenderTarget(w),h=null,f=null,d=null,r=null,S=null,At.stop(),i.isPresenting=!1,e.setPixelRatio(y),e.setSize(A.width,A.height,!1),i.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(X){s=X,i.isPresenting===!0&&Fe("WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(X){a=X,i.isPresenting===!0&&Fe("WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return l||o},this.setReferenceSpace=function(X){l=X},this.getBaseLayer=function(){return f!==null?f:h},this.getBinding=function(){return d===null&&_&&(d=new XRWebGLBinding(r,t)),d},this.getFrame=function(){return g},this.getSession=function(){return r},this.setSession=async function(X){if(r=X,r!==null){if(w=e.getRenderTarget(),r.addEventListener("select",B),r.addEventListener("selectstart",B),r.addEventListener("selectend",B),r.addEventListener("squeeze",B),r.addEventListener("squeezestart",B),r.addEventListener("squeezeend",B),r.addEventListener("end",H),r.addEventListener("inputsourceschange",L),M.xrCompatible!==!0&&await t.makeXRCompatible(),y=e.getPixelRatio(),e.getSize(A),_&&"createProjectionLayer"in XRWebGLBinding.prototype){let oe=null,$e=null,Ae=null;M.depth&&(Ae=M.stencil?t.DEPTH24_STENCIL8:t.DEPTH_COMPONENT24,oe=M.stencil?ps:Wi,$e=M.stencil?ka:Pi);let ke={colorFormat:t.RGBA8,depthFormat:Ae,scaleFactor:s};d=this.getBinding(),f=d.createProjectionLayer(ke),r.updateRenderState({layers:[f]}),e.setPixelRatio(1),e.setSize(f.textureWidth,f.textureHeight,!1),S=new Jn(f.textureWidth,f.textureHeight,{format:hi,type:Vn,depthTexture:new cs(f.textureWidth,f.textureHeight,$e,void 0,void 0,void 0,void 0,void 0,void 0,oe),stencilBuffer:M.stencil,colorSpace:e.outputColorSpace,samples:M.antialias?4:0,resolveDepthBuffer:f.ignoreDepthValues===!1,resolveStencilBuffer:f.ignoreDepthValues===!1})}else{let oe={antialias:M.antialias,alpha:!0,depth:M.depth,stencil:M.stencil,framebufferScaleFactor:s};h=new XRWebGLLayer(r,t,oe),r.updateRenderState({baseLayer:h}),e.setPixelRatio(1),e.setSize(h.framebufferWidth,h.framebufferHeight,!1),S=new Jn(h.framebufferWidth,h.framebufferHeight,{format:hi,type:Vn,colorSpace:e.outputColorSpace,stencilBuffer:M.stencil,resolveDepthBuffer:h.ignoreDepthValues===!1,resolveStencilBuffer:h.ignoreDepthValues===!1})}S.isXRRenderTarget=!0,this.setFoveation(c),l=null,o=await r.requestReferenceSpace(a),At.setContext(r),At.start(),i.isPresenting=!0,i.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(r!==null)return r.environmentBlendMode},this.getDepthTexture=function(){return m.getDepthTexture()};function L(X){for(let ie=0;ie<X.removed.length;ie++){let oe=X.removed[ie],$e=C.indexOf(oe);$e>=0&&(C[$e]=null,D[$e].disconnect(oe))}for(let ie=0;ie<X.added.length;ie++){let oe=X.added[ie],$e=C.indexOf(oe);if($e===-1){for(let ke=0;ke<D.length;ke++)if(ke>=C.length){C.push(oe),$e=ke;break}else if(C[ke]===null){C[ke]=oe,$e=ke;break}if($e===-1)break}let Ae=D[$e];Ae&&Ae.connect(oe)}}let ee=new F,Z=new F;function de(X,ie,oe){ee.setFromMatrixPosition(ie.matrixWorld),Z.setFromMatrixPosition(oe.matrixWorld);let $e=ee.distanceTo(Z),Ae=ie.projectionMatrix.elements,ke=oe.projectionMatrix.elements,Qt=Ae[14]/(Ae[10]-1),at=Ae[14]/(Ae[10]+1),vt=(Ae[9]+1)/Ae[5],Et=(Ae[9]-1)/Ae[5],Ye=(Ae[8]-1)/Ae[0],Bt=(ke[8]+1)/ke[0],I=Qt*Ye,jt=Qt*Bt,ft=$e/(-Ye+Bt),Tt=ft*-Ye;if(ie.matrixWorld.decompose(X.position,X.quaternion,X.scale),X.translateX(Tt),X.translateZ(ft),X.matrixWorld.compose(X.position,X.quaternion,X.scale),X.matrixWorldInverse.copy(X.matrixWorld).invert(),Ae[10]===-1)X.projectionMatrix.copy(ie.projectionMatrix),X.projectionMatrixInverse.copy(ie.projectionMatrixInverse);else{let Se=Qt+ft,E=at+ft,v=I-Tt,N=jt+($e-Tt),q=vt*at/E*Se,Y=Et*at/E*Se;X.projectionMatrix.makePerspective(v,N,q,Y,Se,E),X.projectionMatrixInverse.copy(X.projectionMatrix).invert()}}function ve(X,ie){ie===null?X.matrixWorld.copy(X.matrix):X.matrixWorld.multiplyMatrices(ie.matrixWorld,X.matrix),X.matrixWorldInverse.copy(X.matrixWorld).invert()}this.updateCamera=function(X){if(r===null)return;let ie=X.near,oe=X.far;m.texture!==null&&(m.depthNear>0&&(ie=m.depthNear),m.depthFar>0&&(oe=m.depthFar)),O.near=j.near=b.near=ie,O.far=j.far=b.far=oe,(k!==O.near||G!==O.far)&&(r.updateRenderState({depthNear:O.near,depthFar:O.far}),k=O.near,G=O.far),O.layers.mask=X.layers.mask|6,b.layers.mask=O.layers.mask&-5,j.layers.mask=O.layers.mask&-3;let $e=X.parent,Ae=O.cameras;ve(O,$e);for(let ke=0;ke<Ae.length;ke++)ve(Ae[ke],$e);Ae.length===2?de(O,b,j):O.projectionMatrix.copy(b.projectionMatrix),he(X,O,$e)};function he(X,ie,oe){oe===null?X.matrix.copy(ie.matrixWorld):(X.matrix.copy(oe.matrixWorld),X.matrix.invert(),X.matrix.multiply(ie.matrixWorld)),X.matrix.decompose(X.position,X.quaternion,X.scale),X.updateMatrixWorld(!0),X.projectionMatrix.copy(ie.projectionMatrix),X.projectionMatrixInverse.copy(ie.projectionMatrixInverse),X.isPerspectiveCamera&&(X.fov=Zf*2*Math.atan(1/X.projectionMatrix.elements[5]),X.zoom=1)}this.getCamera=function(){return O},this.getFoveation=function(){if(!(f===null&&h===null))return c},this.setFoveation=function(X){c=X,f!==null&&(f.fixedFoveation=X),h!==null&&h.fixedFoveation!==void 0&&(h.fixedFoveation=X)},this.hasDepthSensing=function(){return m.texture!==null},this.getDepthSensingMesh=function(){return m.getMesh(O)},this.getCameraTexture=function(X){return p[X]};let qe=null;function Nt(X,ie){if(u=ie.getViewerPose(l||o),g=ie,u!==null){let oe=u.views;h!==null&&(e.setRenderTargetFramebuffer(S,h.framebuffer),e.setRenderTarget(S));let $e=!1;oe.length!==O.cameras.length&&(O.cameras.length=0,$e=!0);for(let at=0;at<oe.length;at++){let vt=oe[at],Et=null;if(h!==null)Et=h.getViewport(vt);else{let Bt=d.getViewSubImage(f,vt);Et=Bt.viewport,at===0&&(e.setRenderTargetTextures(S,Bt.colorTexture,Bt.depthStencilTexture),e.setRenderTarget(S))}let Ye=T[at];Ye===void 0&&(Ye=new bn,Ye.layers.enable(at),Ye.viewport=new Ft,T[at]=Ye),Ye.matrix.fromArray(vt.transform.matrix),Ye.matrix.decompose(Ye.position,Ye.quaternion,Ye.scale),Ye.projectionMatrix.fromArray(vt.projectionMatrix),Ye.projectionMatrixInverse.copy(Ye.projectionMatrix).invert(),Ye.viewport.set(Et.x,Et.y,Et.width,Et.height),at===0&&(O.matrix.copy(Ye.matrix),O.matrix.decompose(O.position,O.quaternion,O.scale)),$e===!0&&O.cameras.push(Ye)}let Ae=r.enabledFeatures;if(Ae&&Ae.includes("depth-sensing")&&r.depthUsage=="gpu-optimized"&&_){d=i.getBinding();let at=d.getDepthInformation(oe[0]);at&&at.isValid&&at.texture&&m.init(at,r.renderState)}if(Ae&&Ae.includes("camera-access")&&_){e.state.unbindTexture(),d=i.getBinding();for(let at=0;at<oe.length;at++){let vt=oe[at].camera;if(vt){let Et=p[vt];Et||(Et=new ml,p[vt]=Et);let Ye=d.getCameraImage(vt);Et.sourceTexture=Ye}}}}for(let oe=0;oe<D.length;oe++){let $e=C[oe],Ae=D[oe];$e!==null&&Ae!==void 0&&Ae.update($e,ie,l||o)}qe&&qe(X,ie),ie.detectedPlanes&&i.dispatchEvent({type:"planesdetected",data:ie}),g=null}let At=new rw;At.setAnimationLoop(Nt),this.setAnimationLoop=function(X){qe=X},this.dispose=function(){}}},fo=new ss,g2=new Rt;function v2(n,e){function t(m,p){m.matrixAutoUpdate===!0&&m.updateMatrix(),p.value.copy(m.matrix)}function i(m,p){p.color.getRGB(m.fogColor.value,Qy(n)),p.isFog?(m.fogNear.value=p.near,m.fogFar.value=p.far):p.isFogExp2&&(m.fogDensity.value=p.density)}function r(m,p,M,w,S){p.isMeshBasicMaterial?s(m,p):p.isMeshLambertMaterial?(s(m,p),p.envMap&&(m.envMapIntensity.value=p.envMapIntensity)):p.isMeshToonMaterial?(s(m,p),d(m,p)):p.isMeshPhongMaterial?(s(m,p),u(m,p),p.envMap&&(m.envMapIntensity.value=p.envMapIntensity)):p.isMeshStandardMaterial?(s(m,p),f(m,p),p.isMeshPhysicalMaterial&&h(m,p,S)):p.isMeshMatcapMaterial?(s(m,p),g(m,p)):p.isMeshDepthMaterial?s(m,p):p.isMeshDistanceMaterial?(s(m,p),_(m,p)):p.isMeshNormalMaterial?s(m,p):p.isLineBasicMaterial?(o(m,p),p.isLineDashedMaterial&&a(m,p)):p.isPointsMaterial?c(m,p,M,w):p.isSpriteMaterial?l(m,p):p.isShadowMaterial?(m.color.value.copy(p.color),m.opacity.value=p.opacity):p.isShaderMaterial&&(p.uniformsNeedUpdate=!1)}function s(m,p){m.opacity.value=p.opacity,p.color&&m.diffuse.value.copy(p.color),p.emissive&&m.emissive.value.copy(p.emissive).multiplyScalar(p.emissiveIntensity),p.map&&(m.map.value=p.map,t(p.map,m.mapTransform)),p.alphaMap&&(m.alphaMap.value=p.alphaMap,t(p.alphaMap,m.alphaMapTransform)),p.bumpMap&&(m.bumpMap.value=p.bumpMap,t(p.bumpMap,m.bumpMapTransform),m.bumpScale.value=p.bumpScale,p.side===Nn&&(m.bumpScale.value*=-1)),p.normalMap&&(m.normalMap.value=p.normalMap,t(p.normalMap,m.normalMapTransform),m.normalScale.value.copy(p.normalScale),p.side===Nn&&m.normalScale.value.negate()),p.displacementMap&&(m.displacementMap.value=p.displacementMap,t(p.displacementMap,m.displacementMapTransform),m.displacementScale.value=p.displacementScale,m.displacementBias.value=p.displacementBias),p.emissiveMap&&(m.emissiveMap.value=p.emissiveMap,t(p.emissiveMap,m.emissiveMapTransform)),p.specularMap&&(m.specularMap.value=p.specularMap,t(p.specularMap,m.specularMapTransform)),p.alphaTest>0&&(m.alphaTest.value=p.alphaTest);let M=e.get(p),w=M.envMap,S=M.envMapRotation;w&&(m.envMap.value=w,fo.copy(S),fo.x*=-1,fo.y*=-1,fo.z*=-1,w.isCubeTexture&&w.isRenderTargetTexture===!1&&(fo.y*=-1,fo.z*=-1),m.envMapRotation.value.setFromMatrix4(g2.makeRotationFromEuler(fo)),m.flipEnvMap.value=w.isCubeTexture&&w.isRenderTargetTexture===!1?-1:1,m.reflectivity.value=p.reflectivity,m.ior.value=p.ior,m.refractionRatio.value=p.refractionRatio),p.lightMap&&(m.lightMap.value=p.lightMap,m.lightMapIntensity.value=p.lightMapIntensity,t(p.lightMap,m.lightMapTransform)),p.aoMap&&(m.aoMap.value=p.aoMap,m.aoMapIntensity.value=p.aoMapIntensity,t(p.aoMap,m.aoMapTransform))}function o(m,p){m.diffuse.value.copy(p.color),m.opacity.value=p.opacity,p.map&&(m.map.value=p.map,t(p.map,m.mapTransform))}function a(m,p){m.dashSize.value=p.dashSize,m.totalSize.value=p.dashSize+p.gapSize,m.scale.value=p.scale}function c(m,p,M,w){m.diffuse.value.copy(p.color),m.opacity.value=p.opacity,m.size.value=p.size*M,m.scale.value=w*.5,p.map&&(m.map.value=p.map,t(p.map,m.uvTransform)),p.alphaMap&&(m.alphaMap.value=p.alphaMap,t(p.alphaMap,m.alphaMapTransform)),p.alphaTest>0&&(m.alphaTest.value=p.alphaTest)}function l(m,p){m.diffuse.value.copy(p.color),m.opacity.value=p.opacity,m.rotation.value=p.rotation,p.map&&(m.map.value=p.map,t(p.map,m.mapTransform)),p.alphaMap&&(m.alphaMap.value=p.alphaMap,t(p.alphaMap,m.alphaMapTransform)),p.alphaTest>0&&(m.alphaTest.value=p.alphaTest)}function u(m,p){m.specular.value.copy(p.specular),m.shininess.value=Math.max(p.shininess,1e-4)}function d(m,p){p.gradientMap&&(m.gradientMap.value=p.gradientMap)}function f(m,p){m.metalness.value=p.metalness,p.metalnessMap&&(m.metalnessMap.value=p.metalnessMap,t(p.metalnessMap,m.metalnessMapTransform)),m.roughness.value=p.roughness,p.roughnessMap&&(m.roughnessMap.value=p.roughnessMap,t(p.roughnessMap,m.roughnessMapTransform)),p.envMap&&(m.envMapIntensity.value=p.envMapIntensity)}function h(m,p,M){m.ior.value=p.ior,p.sheen>0&&(m.sheenColor.value.copy(p.sheenColor).multiplyScalar(p.sheen),m.sheenRoughness.value=p.sheenRoughness,p.sheenColorMap&&(m.sheenColorMap.value=p.sheenColorMap,t(p.sheenColorMap,m.sheenColorMapTransform)),p.sheenRoughnessMap&&(m.sheenRoughnessMap.value=p.sheenRoughnessMap,t(p.sheenRoughnessMap,m.sheenRoughnessMapTransform))),p.clearcoat>0&&(m.clearcoat.value=p.clearcoat,m.clearcoatRoughness.value=p.clearcoatRoughness,p.clearcoatMap&&(m.clearcoatMap.value=p.clearcoatMap,t(p.clearcoatMap,m.clearcoatMapTransform)),p.clearcoatRoughnessMap&&(m.clearcoatRoughnessMap.value=p.clearcoatRoughnessMap,t(p.clearcoatRoughnessMap,m.clearcoatRoughnessMapTransform)),p.clearcoatNormalMap&&(m.clearcoatNormalMap.value=p.clearcoatNormalMap,t(p.clearcoatNormalMap,m.clearcoatNormalMapTransform),m.clearcoatNormalScale.value.copy(p.clearcoatNormalScale),p.side===Nn&&m.clearcoatNormalScale.value.negate())),p.dispersion>0&&(m.dispersion.value=p.dispersion),p.iridescence>0&&(m.iridescence.value=p.iridescence,m.iridescenceIOR.value=p.iridescenceIOR,m.iridescenceThicknessMinimum.value=p.iridescenceThicknessRange[0],m.iridescenceThicknessMaximum.value=p.iridescenceThicknessRange[1],p.iridescenceMap&&(m.iridescenceMap.value=p.iridescenceMap,t(p.iridescenceMap,m.iridescenceMapTransform)),p.iridescenceThicknessMap&&(m.iridescenceThicknessMap.value=p.iridescenceThicknessMap,t(p.iridescenceThicknessMap,m.iridescenceThicknessMapTransform))),p.transmission>0&&(m.transmission.value=p.transmission,m.transmissionSamplerMap.value=M.texture,m.transmissionSamplerSize.value.set(M.width,M.height),p.transmissionMap&&(m.transmissionMap.value=p.transmissionMap,t(p.transmissionMap,m.transmissionMapTransform)),m.thickness.value=p.thickness,p.thicknessMap&&(m.thicknessMap.value=p.thicknessMap,t(p.thicknessMap,m.thicknessMapTransform)),m.attenuationDistance.value=p.attenuationDistance,m.attenuationColor.value.copy(p.attenuationColor)),p.anisotropy>0&&(m.anisotropyVector.value.set(p.anisotropy*Math.cos(p.anisotropyRotation),p.anisotropy*Math.sin(p.anisotropyRotation)),p.anisotropyMap&&(m.anisotropyMap.value=p.anisotropyMap,t(p.anisotropyMap,m.anisotropyMapTransform))),m.specularIntensity.value=p.specularIntensity,m.specularColor.value.copy(p.specularColor),p.specularColorMap&&(m.specularColorMap.value=p.specularColorMap,t(p.specularColorMap,m.specularColorMapTransform)),p.specularIntensityMap&&(m.specularIntensityMap.value=p.specularIntensityMap,t(p.specularIntensityMap,m.specularIntensityMapTransform))}function g(m,p){p.matcap&&(m.matcap.value=p.matcap)}function _(m,p){let M=e.get(p).light;m.referencePosition.value.setFromMatrixPosition(M.matrixWorld),m.nearDistance.value=M.shadow.camera.near,m.farDistance.value=M.shadow.camera.far}return{refreshFogUniforms:i,refreshMaterialUniforms:r}}function y2(n,e,t,i){let r={},s={},o=[],a=n.getParameter(n.MAX_UNIFORM_BUFFER_BINDINGS);function c(M,w){let S=w.program;i.uniformBlockBinding(M,S)}function l(M,w){let S=r[M.id];S===void 0&&(g(M),S=u(M),r[M.id]=S,M.addEventListener("dispose",m));let D=w.program;i.updateUBOMapping(M,D);let C=e.render.frame;s[M.id]!==C&&(f(M),s[M.id]=C)}function u(M){let w=d();M.__bindingPointIndex=w;let S=n.createBuffer(),D=M.__size,C=M.usage;return n.bindBuffer(n.UNIFORM_BUFFER,S),n.bufferData(n.UNIFORM_BUFFER,D,C),n.bindBuffer(n.UNIFORM_BUFFER,null),n.bindBufferBase(n.UNIFORM_BUFFER,w,S),S}function d(){for(let M=0;M<a;M++)if(o.indexOf(M)===-1)return o.push(M),M;return Ne("WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function f(M){let w=r[M.id],S=M.uniforms,D=M.__cache;n.bindBuffer(n.UNIFORM_BUFFER,w);for(let C=0,A=S.length;C<A;C++){let y=Array.isArray(S[C])?S[C]:[S[C]];for(let b=0,j=y.length;b<j;b++){let T=y[b];if(h(T,C,b,D)===!0){let O=T.__offset,k=Array.isArray(T.value)?T.value:[T.value],G=0;for(let B=0;B<k.length;B++){let H=k[B],L=_(H);typeof H=="number"||typeof H=="boolean"?(T.__data[0]=H,n.bufferSubData(n.UNIFORM_BUFFER,O+G,T.__data)):H.isMatrix3?(T.__data[0]=H.elements[0],T.__data[1]=H.elements[1],T.__data[2]=H.elements[2],T.__data[3]=0,T.__data[4]=H.elements[3],T.__data[5]=H.elements[4],T.__data[6]=H.elements[5],T.__data[7]=0,T.__data[8]=H.elements[6],T.__data[9]=H.elements[7],T.__data[10]=H.elements[8],T.__data[11]=0):(H.toArray(T.__data,G),G+=L.storage/Float32Array.BYTES_PER_ELEMENT)}n.bufferSubData(n.UNIFORM_BUFFER,O,T.__data)}}}n.bindBuffer(n.UNIFORM_BUFFER,null)}function h(M,w,S,D){let C=M.value,A=w+"_"+S;if(D[A]===void 0)return typeof C=="number"||typeof C=="boolean"?D[A]=C:D[A]=C.clone(),!0;{let y=D[A];if(typeof C=="number"||typeof C=="boolean"){if(y!==C)return D[A]=C,!0}else if(y.equals(C)===!1)return y.copy(C),!0}return!1}function g(M){let w=M.uniforms,S=0,D=16;for(let A=0,y=w.length;A<y;A++){let b=Array.isArray(w[A])?w[A]:[w[A]];for(let j=0,T=b.length;j<T;j++){let O=b[j],k=Array.isArray(O.value)?O.value:[O.value];for(let G=0,B=k.length;G<B;G++){let H=k[G],L=_(H),ee=S%D,Z=ee%L.boundary,de=ee+Z;S+=Z,de!==0&&D-de<L.storage&&(S+=D-de),O.__data=new Float32Array(L.storage/Float32Array.BYTES_PER_ELEMENT),O.__offset=S,S+=L.storage}}}let C=S%D;return C>0&&(S+=D-C),M.__size=S,M.__cache={},this}function _(M){let w={boundary:0,storage:0};return typeof M=="number"||typeof M=="boolean"?(w.boundary=4,w.storage=4):M.isVector2?(w.boundary=8,w.storage=8):M.isVector3||M.isColor?(w.boundary=16,w.storage=12):M.isVector4?(w.boundary=16,w.storage=16):M.isMatrix3?(w.boundary=48,w.storage=48):M.isMatrix4?(w.boundary=64,w.storage=64):M.isTexture?Fe("WebGLRenderer: Texture samplers can not be part of an uniforms group."):Fe("WebGLRenderer: Unsupported uniform value type.",M),w}function m(M){let w=M.target;w.removeEventListener("dispose",m);let S=o.indexOf(w.__bindingPointIndex);o.splice(S,1),n.deleteBuffer(r[w.id]),delete r[w.id],delete s[w.id]}function p(){for(let M in r)n.deleteBuffer(r[M]);o=[],r={},s={}}return{bind:c,update:l,dispose:p}}var _2=new Uint16Array([12469,15057,12620,14925,13266,14620,13807,14376,14323,13990,14545,13625,14713,13328,14840,12882,14931,12528,14996,12233,15039,11829,15066,11525,15080,11295,15085,10976,15082,10705,15073,10495,13880,14564,13898,14542,13977,14430,14158,14124,14393,13732,14556,13410,14702,12996,14814,12596,14891,12291,14937,11834,14957,11489,14958,11194,14943,10803,14921,10506,14893,10278,14858,9960,14484,14039,14487,14025,14499,13941,14524,13740,14574,13468,14654,13106,14743,12678,14818,12344,14867,11893,14889,11509,14893,11180,14881,10751,14852,10428,14812,10128,14765,9754,14712,9466,14764,13480,14764,13475,14766,13440,14766,13347,14769,13070,14786,12713,14816,12387,14844,11957,14860,11549,14868,11215,14855,10751,14825,10403,14782,10044,14729,9651,14666,9352,14599,9029,14967,12835,14966,12831,14963,12804,14954,12723,14936,12564,14917,12347,14900,11958,14886,11569,14878,11247,14859,10765,14828,10401,14784,10011,14727,9600,14660,9289,14586,8893,14508,8533,15111,12234,15110,12234,15104,12216,15092,12156,15067,12010,15028,11776,14981,11500,14942,11205,14902,10752,14861,10393,14812,9991,14752,9570,14682,9252,14603,8808,14519,8445,14431,8145,15209,11449,15208,11451,15202,11451,15190,11438,15163,11384,15117,11274,15055,10979,14994,10648,14932,10343,14871,9936,14803,9532,14729,9218,14645,8742,14556,8381,14461,8020,14365,7603,15273,10603,15272,10607,15267,10619,15256,10631,15231,10614,15182,10535,15118,10389,15042,10167,14963,9787,14883,9447,14800,9115,14710,8665,14615,8318,14514,7911,14411,7507,14279,7198,15314,9675,15313,9683,15309,9712,15298,9759,15277,9797,15229,9773,15166,9668,15084,9487,14995,9274,14898,8910,14800,8539,14697,8234,14590,7790,14479,7409,14367,7067,14178,6621,15337,8619,15337,8631,15333,8677,15325,8769,15305,8871,15264,8940,15202,8909,15119,8775,15022,8565,14916,8328,14804,8009,14688,7614,14569,7287,14448,6888,14321,6483,14088,6171,15350,7402,15350,7419,15347,7480,15340,7613,15322,7804,15287,7973,15229,8057,15148,8012,15046,7846,14933,7611,14810,7357,14682,7069,14552,6656,14421,6316,14251,5948,14007,5528,15356,5942,15356,5977,15353,6119,15348,6294,15332,6551,15302,6824,15249,7044,15171,7122,15070,7050,14949,6861,14818,6611,14679,6349,14538,6067,14398,5651,14189,5311,13935,4958,15359,4123,15359,4153,15356,4296,15353,4646,15338,5160,15311,5508,15263,5829,15188,6042,15088,6094,14966,6001,14826,5796,14678,5543,14527,5287,14377,4985,14133,4586,13869,4257,15360,1563,15360,1642,15358,2076,15354,2636,15341,3350,15317,4019,15273,4429,15203,4732,15105,4911,14981,4932,14836,4818,14679,4621,14517,4386,14359,4156,14083,3795,13808,3437,15360,122,15360,137,15358,285,15355,636,15344,1274,15322,2177,15281,2765,15215,3223,15120,3451,14995,3569,14846,3567,14681,3466,14511,3305,14344,3121,14037,2800,13753,2467,15360,0,15360,1,15359,21,15355,89,15346,253,15325,479,15287,796,15225,1148,15133,1492,15008,1749,14856,1882,14685,1886,14506,1783,14324,1608,13996,1398,13702,1183]),Ji=null;function x2(){return Ji===null&&(Ji=new eh(_2,16,16,co,Zi),Ji.name="DFG_LUT",Ji.minFilter=hn,Ji.magFilter=hn,Ji.wrapS=ji,Ji.wrapT=ji,Ji.generateMipmaps=!1,Ji.needsUpdate=!0),Ji}var lp=class{constructor(e={}){let{canvas:t=AE(),context:i=null,depth:r=!0,stencil:s=!1,alpha:o=!1,antialias:a=!1,premultipliedAlpha:c=!0,preserveDrawingBuffer:l=!1,powerPreference:u="default",failIfMajorPerformanceCaveat:d=!1,reversedDepthBuffer:f=!1,outputBufferType:h=Vn}=e;this.isWebGLRenderer=!0;let g;if(i!==null){if(typeof WebGLRenderingContext<"u"&&i instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");g=i.getContextAttributes().alpha}else g=o;let _=h,m=new Set([Eh,Sh,bh]),p=new Set([Vn,Pi,Fa,ka,xh,Mh]),M=new Uint32Array(4),w=new Int32Array(4),S=null,D=null,C=[],A=[],y=null;this.domElement=t,this.debug={checkShaderErrors:!0,onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this.toneMapping=Ni,this.toneMappingExposure=1,this.transmissionResolutionScale=1;let b=this,j=!1;this._outputColorSpace=Yn;let T=0,O=0,k=null,G=-1,B=null,H=new Ft,L=new Ft,ee=null,Z=new ot(0),de=0,ve=t.width,he=t.height,qe=1,Nt=null,At=null,X=new Ft(0,0,ve,he),ie=new Ft(0,0,ve,he),oe=!1,$e=new Ia,Ae=!1,ke=!1,Qt=new Rt,at=new F,vt=new Ft,Et={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0},Ye=!1;function Bt(){return k===null?qe:1}let I=i;function jt(x,P){return t.getContext(x,P)}try{let x={alpha:!0,depth:r,stencil:s,antialias:a,premultipliedAlpha:c,preserveDrawingBuffer:l,powerPreference:u,failIfMajorPerformanceCaveat:d};if("setAttribute"in t&&t.setAttribute("data-engine",`three.js r${"183"}`),t.addEventListener("webglcontextlost",xe,!1),t.addEventListener("webglcontextrestored",Be,!1),t.addEventListener("webglcontextcreationerror",Dt,!1),I===null){let P="webgl2";if(I=jt(P,x),I===null)throw jt(P)?new Error("Error creating WebGL context with your selected attributes."):new Error("Error creating WebGL context.")}}catch(x){throw Ne("WebGLRenderer: "+x.message),x}let ft,Tt,Se,E,v,N,q,Y,$,ye,re,De,Pe,J,te,_e,Me,fe,Ze,R,se,ne,me;function K(){ft=new DL(I),ft.init(),se=new h2(I,ft),Tt=new xL(I,ft,e,se),Se=new d2(I,ft),Tt.reversedDepthBuffer&&f&&Se.buffers.depth.setReversed(!0),E=new RL(I),v=new JF,N=new f2(I,ft,Se,v,Tt,se,E),q=new TL(b),Y=new FN(I),ne=new yL(I,Y),$=new IL(I,Y,E,ne),ye=new PL(I,$,Y,ne,E),fe=new NL(I,Tt,N),te=new ML(v),re=new ZF(b,q,ft,Tt,ne,te),De=new v2(b,v),Pe=new QF,J=new s2(ft),Me=new vL(b,q,Se,ye,g,c),_e=new u2(b,ye,Tt),me=new y2(I,E,Tt,Se),Ze=new _L(I,ft,E),R=new AL(I,ft,E),E.programs=re.programs,b.capabilities=Tt,b.extensions=ft,b.properties=v,b.renderLists=Pe,b.shadowMap=_e,b.state=Se,b.info=E}K(),_!==Vn&&(y=new LL(_,t.width,t.height,r,s));let W=new v_(b,I);this.xr=W,this.getContext=function(){return I},this.getContextAttributes=function(){return I.getContextAttributes()},this.forceContextLoss=function(){let x=ft.get("WEBGL_lose_context");x&&x.loseContext()},this.forceContextRestore=function(){let x=ft.get("WEBGL_lose_context");x&&x.restoreContext()},this.getPixelRatio=function(){return qe},this.setPixelRatio=function(x){x!==void 0&&(qe=x,this.setSize(ve,he,!1))},this.getSize=function(x){return x.set(ve,he)},this.setSize=function(x,P,z=!0){if(W.isPresenting){Fe("WebGLRenderer: Can't change size while VR device is presenting.");return}ve=x,he=P,t.width=Math.floor(x*qe),t.height=Math.floor(P*qe),z===!0&&(t.style.width=x+"px",t.style.height=P+"px"),y!==null&&y.setSize(t.width,t.height),this.setViewport(0,0,x,P)},this.getDrawingBufferSize=function(x){return x.set(ve*qe,he*qe).floor()},this.setDrawingBufferSize=function(x,P,z){ve=x,he=P,qe=z,t.width=Math.floor(x*z),t.height=Math.floor(P*z),this.setViewport(0,0,x,P)},this.setEffects=function(x){if(_===Vn){console.error("THREE.WebGLRenderer: setEffects() requires outputBufferType set to HalfFloatType or FloatType.");return}if(x){for(let P=0;P<x.length;P++)if(x[P].isOutputPass===!0){console.warn("THREE.WebGLRenderer: OutputPass is not needed in setEffects(). Tone mapping and color space conversion are applied automatically.");break}}y.setEffects(x||[])},this.getCurrentViewport=function(x){return x.copy(H)},this.getViewport=function(x){return x.copy(X)},this.setViewport=function(x,P,z,V){x.isVector4?X.set(x.x,x.y,x.z,x.w):X.set(x,P,z,V),Se.viewport(H.copy(X).multiplyScalar(qe).round())},this.getScissor=function(x){return x.copy(ie)},this.setScissor=function(x,P,z,V){x.isVector4?ie.set(x.x,x.y,x.z,x.w):ie.set(x,P,z,V),Se.scissor(L.copy(ie).multiplyScalar(qe).round())},this.getScissorTest=function(){return oe},this.setScissorTest=function(x){Se.setScissorTest(oe=x)},this.setOpaqueSort=function(x){Nt=x},this.setTransparentSort=function(x){At=x},this.getClearColor=function(x){return x.copy(Me.getClearColor())},this.setClearColor=function(){Me.setClearColor(...arguments)},this.getClearAlpha=function(){return Me.getClearAlpha()},this.setClearAlpha=function(){Me.setClearAlpha(...arguments)},this.clear=function(x=!0,P=!0,z=!0){let V=0;if(x){let U=!1;if(k!==null){let le=k.texture.format;U=m.has(le)}if(U){let le=k.texture.type,pe=p.has(le),ue=Me.getClearColor(),be=Me.getClearAlpha(),we=ue.r,je=ue.g,Je=ue.b;pe?(M[0]=we,M[1]=je,M[2]=Je,M[3]=be,I.clearBufferuiv(I.COLOR,0,M)):(w[0]=we,w[1]=je,w[2]=Je,w[3]=be,I.clearBufferiv(I.COLOR,0,w))}else V|=I.COLOR_BUFFER_BIT}P&&(V|=I.DEPTH_BUFFER_BIT),z&&(V|=I.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),V!==0&&I.clear(V)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.dispose=function(){t.removeEventListener("webglcontextlost",xe,!1),t.removeEventListener("webglcontextrestored",Be,!1),t.removeEventListener("webglcontextcreationerror",Dt,!1),Me.dispose(),Pe.dispose(),J.dispose(),v.dispose(),q.dispose(),ye.dispose(),ne.dispose(),me.dispose(),re.dispose(),W.dispose(),W.removeEventListener("sessionstart",M_),W.removeEventListener("sessionend",b_),gs.stop()};function xe(x){x.preventDefault(),Ky("WebGLRenderer: Context Lost."),j=!0}function Be(){Ky("WebGLRenderer: Context Restored."),j=!1;let x=E.autoReset,P=_e.enabled,z=_e.autoUpdate,V=_e.needsUpdate,U=_e.type;K(),E.autoReset=x,_e.enabled=P,_e.autoUpdate=z,_e.needsUpdate=V,_e.type=U}function Dt(x){Ne("WebGLRenderer: A WebGL context could not be created. Reason: ",x.statusMessage)}function yt(x){let P=x.target;P.removeEventListener("dispose",yt),Qi(P)}function Qi(x){er(x),v.remove(x)}function er(x){let P=v.get(x).programs;P!==void 0&&(P.forEach(function(z){re.releaseProgram(z)}),x.isShaderMaterial&&re.releaseShaderCache(x))}this.renderBufferDirect=function(x,P,z,V,U,le){P===null&&(P=Et);let pe=U.isMesh&&U.matrixWorld.determinant()<0,ue=Mw(x,P,z,V,U);Se.setMaterial(V,pe);let be=z.index,we=1;if(V.wireframe===!0){if(be=$.getWireframeAttribute(z),be===void 0)return;we=2}let je=z.drawRange,Je=z.attributes.position,Te=je.start*we,xt=(je.start+je.count)*we;le!==null&&(Te=Math.max(Te,le.start*we),xt=Math.min(xt,(le.start+le.count)*we)),be!==null?(Te=Math.max(Te,0),xt=Math.min(xt,be.count)):Je!=null&&(Te=Math.max(Te,0),xt=Math.min(xt,Je.count));let Vt=xt-Te;if(Vt<0||Vt===1/0)return;ne.setup(U,V,ue,z,be);let kt,Mt=Ze;if(be!==null&&(kt=Y.get(be),Mt=R,Mt.setIndex(kt)),U.isMesh)V.wireframe===!0?(Se.setLineWidth(V.wireframeLinewidth*Bt()),Mt.setMode(I.LINES)):Mt.setMode(I.TRIANGLES);else if(U.isLine){let pn=V.linewidth;pn===void 0&&(pn=1),Se.setLineWidth(pn*Bt()),U.isLineSegments?Mt.setMode(I.LINES):U.isLineLoop?Mt.setMode(I.LINE_LOOP):Mt.setMode(I.LINE_STRIP)}else U.isPoints?Mt.setMode(I.POINTS):U.isSprite&&Mt.setMode(I.TRIANGLES);if(U.isBatchedMesh)if(U._multiDrawInstances!==null)cl("WebGLRenderer: renderMultiDrawInstances has been deprecated and will be removed in r184. Append to renderMultiDraw arguments and use indirection."),Mt.renderMultiDrawInstances(U._multiDrawStarts,U._multiDrawCounts,U._multiDrawCount,U._multiDrawInstances);else if(ft.get("WEBGL_multi_draw"))Mt.renderMultiDraw(U._multiDrawStarts,U._multiDrawCounts,U._multiDrawCount);else{let pn=U._multiDrawStarts,Ee=U._multiDrawCounts,Hn=U._multiDrawCount,ct=be?Y.get(be).bytesPerElement:1,pi=v.get(V).currentProgram.getUniforms();for(let Li=0;Li<Hn;Li++)pi.setValue(I,"_gl_DrawID",Li),Mt.render(pn[Li]/ct,Ee[Li])}else if(U.isInstancedMesh)Mt.renderInstances(Te,Vt,U.count);else if(z.isInstancedBufferGeometry){let pn=z._maxInstanceCount!==void 0?z._maxInstanceCount:1/0,Ee=Math.min(z.instanceCount,pn);Mt.renderInstances(Te,Vt,Ee)}else Mt.render(Te,Vt)};function x_(x,P,z){x.transparent===!0&&x.side===Xi&&x.forceSinglePass===!1?(x.side=Nn,x.needsUpdate=!0,kl(x,P,z),x.side=Tr,x.needsUpdate=!0,kl(x,P,z),x.side=Xi):kl(x,P,z)}this.compile=function(x,P,z=null){z===null&&(z=x),D=J.get(z),D.init(P),A.push(D),z.traverseVisible(function(U){U.isLight&&U.layers.test(P.layers)&&(D.pushLight(U),U.castShadow&&D.pushShadow(U))}),x!==z&&x.traverseVisible(function(U){U.isLight&&U.layers.test(P.layers)&&(D.pushLight(U),U.castShadow&&D.pushShadow(U))}),D.setupLights();let V=new Set;return x.traverse(function(U){if(!(U.isMesh||U.isPoints||U.isLine||U.isSprite))return;let le=U.material;if(le)if(Array.isArray(le))for(let pe=0;pe<le.length;pe++){let ue=le[pe];x_(ue,z,U),V.add(ue)}else x_(le,z,U),V.add(le)}),D=A.pop(),V},this.compileAsync=function(x,P,z=null){let V=this.compile(x,P,z);return new Promise(U=>{function le(){if(V.forEach(function(pe){v.get(pe).currentProgram.isReady()&&V.delete(pe)}),V.size===0){U(x);return}setTimeout(le,10)}ft.get("KHR_parallel_shader_compile")!==null?le():setTimeout(le,10)})};let _p=null;function xw(x){_p&&_p(x)}function M_(){gs.stop()}function b_(){gs.start()}let gs=new rw;gs.setAnimationLoop(xw),typeof self<"u"&&gs.setContext(self),this.setAnimationLoop=function(x){_p=x,W.setAnimationLoop(x),x===null?gs.stop():gs.start()},W.addEventListener("sessionstart",M_),W.addEventListener("sessionend",b_),this.render=function(x,P){if(P!==void 0&&P.isCamera!==!0){Ne("WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(j===!0)return;let z=W.enabled===!0&&W.isPresenting===!0,V=y!==null&&(k===null||z)&&y.begin(b,k);if(x.matrixWorldAutoUpdate===!0&&x.updateMatrixWorld(),P.parent===null&&P.matrixWorldAutoUpdate===!0&&P.updateMatrixWorld(),W.enabled===!0&&W.isPresenting===!0&&(y===null||y.isCompositing()===!1)&&(W.cameraAutoUpdate===!0&&W.updateCamera(P),P=W.getCamera()),x.isScene===!0&&x.onBeforeRender(b,x,P,k),D=J.get(x,A.length),D.init(P),A.push(D),Qt.multiplyMatrices(P.projectionMatrix,P.matrixWorldInverse),$e.setFromProjectionMatrix(Qt,Ri,P.reversedDepth),ke=this.localClippingEnabled,Ae=te.init(this.clippingPlanes,ke),S=Pe.get(x,C.length),S.init(),C.push(S),W.enabled===!0&&W.isPresenting===!0){let pe=b.xr.getDepthSensingMesh();pe!==null&&xp(pe,P,-1/0,b.sortObjects)}xp(x,P,0,b.sortObjects),S.finish(),b.sortObjects===!0&&S.sort(Nt,At),Ye=W.enabled===!1||W.isPresenting===!1||W.hasDepthSensing()===!1,Ye&&Me.addToRenderList(S,x),this.info.render.frame++,Ae===!0&&te.beginShadows();let U=D.state.shadowsArray;if(_e.render(U,x,P),Ae===!0&&te.endShadows(),this.info.autoReset===!0&&this.info.reset(),(V&&y.hasRenderPass())===!1){let pe=S.opaque,ue=S.transmissive;if(D.setupLights(),P.isArrayCamera){let be=P.cameras;if(ue.length>0)for(let we=0,je=be.length;we<je;we++){let Je=be[we];E_(pe,ue,x,Je)}Ye&&Me.render(x);for(let we=0,je=be.length;we<je;we++){let Je=be[we];S_(S,x,Je,Je.viewport)}}else ue.length>0&&E_(pe,ue,x,P),Ye&&Me.render(x),S_(S,x,P)}k!==null&&O===0&&(N.updateMultisampleRenderTarget(k),N.updateRenderTargetMipmap(k)),V&&y.end(b),x.isScene===!0&&x.onAfterRender(b,x,P),ne.resetDefaultState(),G=-1,B=null,A.pop(),A.length>0?(D=A[A.length-1],Ae===!0&&te.setGlobalState(b.clippingPlanes,D.state.camera)):D=null,C.pop(),C.length>0?S=C[C.length-1]:S=null};function xp(x,P,z,V){if(x.visible===!1)return;if(x.layers.test(P.layers)){if(x.isGroup)z=x.renderOrder;else if(x.isLOD)x.autoUpdate===!0&&x.update(P);else if(x.isLight)D.pushLight(x),x.castShadow&&D.pushShadow(x);else if(x.isSprite){if(!x.frustumCulled||$e.intersectsSprite(x)){V&&vt.setFromMatrixPosition(x.matrixWorld).applyMatrix4(Qt);let pe=ye.update(x),ue=x.material;ue.visible&&S.push(x,pe,ue,z,vt.z,null)}}else if((x.isMesh||x.isLine||x.isPoints)&&(!x.frustumCulled||$e.intersectsObject(x))){let pe=ye.update(x),ue=x.material;if(V&&(x.boundingSphere!==void 0?(x.boundingSphere===null&&x.computeBoundingSphere(),vt.copy(x.boundingSphere.center)):(pe.boundingSphere===null&&pe.computeBoundingSphere(),vt.copy(pe.boundingSphere.center)),vt.applyMatrix4(x.matrixWorld).applyMatrix4(Qt)),Array.isArray(ue)){let be=pe.groups;for(let we=0,je=be.length;we<je;we++){let Je=be[we],Te=ue[Je.materialIndex];Te&&Te.visible&&S.push(x,pe,Te,z,vt.z,Je)}}else ue.visible&&S.push(x,pe,ue,z,vt.z,null)}}let le=x.children;for(let pe=0,ue=le.length;pe<ue;pe++)xp(le[pe],P,z,V)}function S_(x,P,z,V){let{opaque:U,transmissive:le,transparent:pe}=x;D.setupLightsView(z),Ae===!0&&te.setGlobalState(b.clippingPlanes,z),V&&Se.viewport(H.copy(V)),U.length>0&&Fl(U,P,z),le.length>0&&Fl(le,P,z),pe.length>0&&Fl(pe,P,z),Se.buffers.depth.setTest(!0),Se.buffers.depth.setMask(!0),Se.buffers.color.setMask(!0),Se.setPolygonOffset(!1)}function E_(x,P,z,V){if((z.isScene===!0?z.overrideMaterial:null)!==null)return;if(D.state.transmissionRenderTarget[V.id]===void 0){let Te=ft.has("EXT_color_buffer_half_float")||ft.has("EXT_color_buffer_float");D.state.transmissionRenderTarget[V.id]=new Jn(1,1,{generateMipmaps:!0,type:Te?Zi:Vn,minFilter:hs,samples:Math.max(4,Tt.samples),stencilBuffer:s,resolveDepthBuffer:!1,resolveStencilBuffer:!1,colorSpace:st.workingColorSpace})}let le=D.state.transmissionRenderTarget[V.id],pe=V.viewport||H;le.setSize(pe.z*b.transmissionResolutionScale,pe.w*b.transmissionResolutionScale);let ue=b.getRenderTarget(),be=b.getActiveCubeFace(),we=b.getActiveMipmapLevel();b.setRenderTarget(le),b.getClearColor(Z),de=b.getClearAlpha(),de<1&&b.setClearColor(16777215,.5),b.clear(),Ye&&Me.render(z);let je=b.toneMapping;b.toneMapping=Ni;let Je=V.viewport;if(V.viewport!==void 0&&(V.viewport=void 0),D.setupLightsView(V),Ae===!0&&te.setGlobalState(b.clippingPlanes,V),Fl(x,z,V),N.updateMultisampleRenderTarget(le),N.updateRenderTargetMipmap(le),ft.has("WEBGL_multisampled_render_to_texture")===!1){let Te=!1;for(let xt=0,Vt=P.length;xt<Vt;xt++){let kt=P[xt],{object:Mt,geometry:pn,material:Ee,group:Hn}=kt;if(Ee.side===Xi&&Mt.layers.test(V.layers)){let ct=Ee.side;Ee.side=Nn,Ee.needsUpdate=!0,w_(Mt,z,V,pn,Ee,Hn),Ee.side=ct,Ee.needsUpdate=!0,Te=!0}}Te===!0&&(N.updateMultisampleRenderTarget(le),N.updateRenderTargetMipmap(le))}b.setRenderTarget(ue,be,we),b.setClearColor(Z,de),Je!==void 0&&(V.viewport=Je),b.toneMapping=je}function Fl(x,P,z){let V=P.isScene===!0?P.overrideMaterial:null;for(let U=0,le=x.length;U<le;U++){let pe=x[U],{object:ue,geometry:be,group:we}=pe,je=pe.material;je.allowOverride===!0&&V!==null&&(je=V),ue.layers.test(z.layers)&&w_(ue,P,z,be,je,we)}}function w_(x,P,z,V,U,le){x.onBeforeRender(b,P,z,V,U,le),x.modelViewMatrix.multiplyMatrices(z.matrixWorldInverse,x.matrixWorld),x.normalMatrix.getNormalMatrix(x.modelViewMatrix),U.onBeforeRender(b,P,z,V,x,le),U.transparent===!0&&U.side===Xi&&U.forceSinglePass===!1?(U.side=Nn,U.needsUpdate=!0,b.renderBufferDirect(z,P,V,U,x,le),U.side=Tr,U.needsUpdate=!0,b.renderBufferDirect(z,P,V,U,x,le),U.side=Xi):b.renderBufferDirect(z,P,V,U,x,le),x.onAfterRender(b,P,z,V,U,le)}function kl(x,P,z){P.isScene!==!0&&(P=Et);let V=v.get(x),U=D.state.lights,le=D.state.shadowsArray,pe=U.state.version,ue=re.getParameters(x,U.state,le,P,z),be=re.getProgramCacheKey(ue),we=V.programs;V.environment=x.isMeshStandardMaterial||x.isMeshLambertMaterial||x.isMeshPhongMaterial?P.environment:null,V.fog=P.fog;let je=x.isMeshStandardMaterial||x.isMeshLambertMaterial&&!x.envMap||x.isMeshPhongMaterial&&!x.envMap;V.envMap=q.get(x.envMap||V.environment,je),V.envMapRotation=V.environment!==null&&x.envMap===null?P.environmentRotation:x.envMapRotation,we===void 0&&(x.addEventListener("dispose",yt),we=new Map,V.programs=we);let Je=we.get(be);if(Je!==void 0){if(V.currentProgram===Je&&V.lightsStateVersion===pe)return T_(x,ue),Je}else ue.uniforms=re.getUniforms(x),x.onBeforeCompile(ue,b),Je=re.acquireProgram(ue,be),we.set(be,Je),V.uniforms=ue.uniforms;let Te=V.uniforms;return(!x.isShaderMaterial&&!x.isRawShaderMaterial||x.clipping===!0)&&(Te.clippingPlanes=te.uniform),T_(x,ue),V.needsLights=Sw(x),V.lightsStateVersion=pe,V.needsLights&&(Te.ambientLightColor.value=U.state.ambient,Te.lightProbe.value=U.state.probe,Te.directionalLights.value=U.state.directional,Te.directionalLightShadows.value=U.state.directionalShadow,Te.spotLights.value=U.state.spot,Te.spotLightShadows.value=U.state.spotShadow,Te.rectAreaLights.value=U.state.rectArea,Te.ltc_1.value=U.state.rectAreaLTC1,Te.ltc_2.value=U.state.rectAreaLTC2,Te.pointLights.value=U.state.point,Te.pointLightShadows.value=U.state.pointShadow,Te.hemisphereLights.value=U.state.hemi,Te.directionalShadowMatrix.value=U.state.directionalShadowMatrix,Te.spotLightMatrix.value=U.state.spotLightMatrix,Te.spotLightMap.value=U.state.spotLightMap,Te.pointShadowMatrix.value=U.state.pointShadowMatrix),V.currentProgram=Je,V.uniformsList=null,Je}function C_(x){if(x.uniformsList===null){let P=x.currentProgram.getUniforms();x.uniformsList=Ba.seqWithValue(P.seq,x.uniforms)}return x.uniformsList}function T_(x,P){let z=v.get(x);z.outputColorSpace=P.outputColorSpace,z.batching=P.batching,z.batchingColor=P.batchingColor,z.instancing=P.instancing,z.instancingColor=P.instancingColor,z.instancingMorph=P.instancingMorph,z.skinning=P.skinning,z.morphTargets=P.morphTargets,z.morphNormals=P.morphNormals,z.morphColors=P.morphColors,z.morphTargetsCount=P.morphTargetsCount,z.numClippingPlanes=P.numClippingPlanes,z.numIntersection=P.numClipIntersection,z.vertexAlphas=P.vertexAlphas,z.vertexTangents=P.vertexTangents,z.toneMapping=P.toneMapping}function Mw(x,P,z,V,U){P.isScene!==!0&&(P=Et),N.resetTextureUnits();let le=P.fog,pe=V.isMeshStandardMaterial||V.isMeshLambertMaterial||V.isMeshPhongMaterial?P.environment:null,ue=k===null?b.outputColorSpace:k.isXRRenderTarget===!0?k.texture.colorSpace:oo,be=V.isMeshStandardMaterial||V.isMeshLambertMaterial&&!V.envMap||V.isMeshPhongMaterial&&!V.envMap,we=q.get(V.envMap||pe,be),je=V.vertexColors===!0&&!!z.attributes.color&&z.attributes.color.itemSize===4,Je=!!z.attributes.tangent&&(!!V.normalMap||V.anisotropy>0),Te=!!z.morphAttributes.position,xt=!!z.morphAttributes.normal,Vt=!!z.morphAttributes.color,kt=Ni;V.toneMapped&&(k===null||k.isXRRenderTarget===!0)&&(kt=b.toneMapping);let Mt=z.morphAttributes.position||z.morphAttributes.normal||z.morphAttributes.color,pn=Mt!==void 0?Mt.length:0,Ee=v.get(V),Hn=D.state.lights;if(Ae===!0&&(ke===!0||x!==B)){let en=x===B&&V.id===G;te.setState(V,x,en)}let ct=!1;V.version===Ee.__version?(Ee.needsLights&&Ee.lightsStateVersion!==Hn.state.version||Ee.outputColorSpace!==ue||U.isBatchedMesh&&Ee.batching===!1||!U.isBatchedMesh&&Ee.batching===!0||U.isBatchedMesh&&Ee.batchingColor===!0&&U.colorTexture===null||U.isBatchedMesh&&Ee.batchingColor===!1&&U.colorTexture!==null||U.isInstancedMesh&&Ee.instancing===!1||!U.isInstancedMesh&&Ee.instancing===!0||U.isSkinnedMesh&&Ee.skinning===!1||!U.isSkinnedMesh&&Ee.skinning===!0||U.isInstancedMesh&&Ee.instancingColor===!0&&U.instanceColor===null||U.isInstancedMesh&&Ee.instancingColor===!1&&U.instanceColor!==null||U.isInstancedMesh&&Ee.instancingMorph===!0&&U.morphTexture===null||U.isInstancedMesh&&Ee.instancingMorph===!1&&U.morphTexture!==null||Ee.envMap!==we||V.fog===!0&&Ee.fog!==le||Ee.numClippingPlanes!==void 0&&(Ee.numClippingPlanes!==te.numPlanes||Ee.numIntersection!==te.numIntersection)||Ee.vertexAlphas!==je||Ee.vertexTangents!==Je||Ee.morphTargets!==Te||Ee.morphNormals!==xt||Ee.morphColors!==Vt||Ee.toneMapping!==kt||Ee.morphTargetsCount!==pn)&&(ct=!0):(ct=!0,Ee.__version=V.version);let pi=Ee.currentProgram;ct===!0&&(pi=kl(V,P,U));let Li=!1,vs=!1,po=!1,wt=pi.getUniforms(),cn=Ee.uniforms;if(Se.useProgram(pi.program)&&(Li=!0,vs=!0,po=!0),V.id!==G&&(G=V.id,vs=!0),Li||B!==x){Se.buffers.depth.getReversed()&&x.reversedDepth!==!0&&(x._reversedDepth=!0,x.updateProjectionMatrix()),wt.setValue(I,"projectionMatrix",x.projectionMatrix),wt.setValue(I,"viewMatrix",x.matrixWorldInverse);let Nr=wt.map.cameraPosition;Nr!==void 0&&Nr.setValue(I,at.setFromMatrixPosition(x.matrixWorld)),Tt.logarithmicDepthBuffer&&wt.setValue(I,"logDepthBufFC",2/(Math.log(x.far+1)/Math.LN2)),(V.isMeshPhongMaterial||V.isMeshToonMaterial||V.isMeshLambertMaterial||V.isMeshBasicMaterial||V.isMeshStandardMaterial||V.isShaderMaterial)&&wt.setValue(I,"isOrthographic",x.isOrthographicCamera===!0),B!==x&&(B=x,vs=!0,po=!0)}if(Ee.needsLights&&(Hn.state.directionalShadowMap.length>0&&wt.setValue(I,"directionalShadowMap",Hn.state.directionalShadowMap,N),Hn.state.spotShadowMap.length>0&&wt.setValue(I,"spotShadowMap",Hn.state.spotShadowMap,N),Hn.state.pointShadowMap.length>0&&wt.setValue(I,"pointShadowMap",Hn.state.pointShadowMap,N)),U.isSkinnedMesh){wt.setOptional(I,U,"bindMatrix"),wt.setOptional(I,U,"bindMatrixInverse");let en=U.skeleton;en&&(en.boneTexture===null&&en.computeBoneTexture(),wt.setValue(I,"boneTexture",en.boneTexture,N))}U.isBatchedMesh&&(wt.setOptional(I,U,"batchingTexture"),wt.setValue(I,"batchingTexture",U._matricesTexture,N),wt.setOptional(I,U,"batchingIdTexture"),wt.setValue(I,"batchingIdTexture",U._indirectTexture,N),wt.setOptional(I,U,"batchingColorTexture"),U._colorsTexture!==null&&wt.setValue(I,"batchingColorTexture",U._colorsTexture,N));let Rr=z.morphAttributes;if((Rr.position!==void 0||Rr.normal!==void 0||Rr.color!==void 0)&&fe.update(U,z,pi),(vs||Ee.receiveShadow!==U.receiveShadow)&&(Ee.receiveShadow=U.receiveShadow,wt.setValue(I,"receiveShadow",U.receiveShadow)),(V.isMeshStandardMaterial||V.isMeshLambertMaterial||V.isMeshPhongMaterial)&&V.envMap===null&&P.environment!==null&&(cn.envMapIntensity.value=P.environmentIntensity),cn.dfgLUT!==void 0&&(cn.dfgLUT.value=x2()),vs&&(wt.setValue(I,"toneMappingExposure",b.toneMappingExposure),Ee.needsLights&&bw(cn,po),le&&V.fog===!0&&De.refreshFogUniforms(cn,le),De.refreshMaterialUniforms(cn,V,qe,he,D.state.transmissionRenderTarget[x.id]),Ba.upload(I,C_(Ee),cn,N)),V.isShaderMaterial&&V.uniformsNeedUpdate===!0&&(Ba.upload(I,C_(Ee),cn,N),V.uniformsNeedUpdate=!1),V.isSpriteMaterial&&wt.setValue(I,"center",U.center),wt.setValue(I,"modelViewMatrix",U.modelViewMatrix),wt.setValue(I,"normalMatrix",U.normalMatrix),wt.setValue(I,"modelMatrix",U.matrixWorld),V.isShaderMaterial||V.isRawShaderMaterial){let en=V.uniformsGroups;for(let Nr=0,mo=en.length;Nr<mo;Nr++){let D_=en[Nr];me.update(D_,pi),me.bind(D_,pi)}}return pi}function bw(x,P){x.ambientLightColor.needsUpdate=P,x.lightProbe.needsUpdate=P,x.directionalLights.needsUpdate=P,x.directionalLightShadows.needsUpdate=P,x.pointLights.needsUpdate=P,x.pointLightShadows.needsUpdate=P,x.spotLights.needsUpdate=P,x.spotLightShadows.needsUpdate=P,x.rectAreaLights.needsUpdate=P,x.hemisphereLights.needsUpdate=P}function Sw(x){return x.isMeshLambertMaterial||x.isMeshToonMaterial||x.isMeshPhongMaterial||x.isMeshStandardMaterial||x.isShadowMaterial||x.isShaderMaterial&&x.lights===!0}this.getActiveCubeFace=function(){return T},this.getActiveMipmapLevel=function(){return O},this.getRenderTarget=function(){return k},this.setRenderTargetTextures=function(x,P,z){let V=v.get(x);V.__autoAllocateDepthBuffer=x.resolveDepthBuffer===!1,V.__autoAllocateDepthBuffer===!1&&(V.__useRenderToTexture=!1),v.get(x.texture).__webglTexture=P,v.get(x.depthTexture).__webglTexture=V.__autoAllocateDepthBuffer?void 0:z,V.__hasExternalTextures=!0},this.setRenderTargetFramebuffer=function(x,P){let z=v.get(x);z.__webglFramebuffer=P,z.__useDefaultFramebuffer=P===void 0};let Ew=I.createFramebuffer();this.setRenderTarget=function(x,P=0,z=0){k=x,T=P,O=z;let V=null,U=!1,le=!1;if(x){let ue=v.get(x);if(ue.__useDefaultFramebuffer!==void 0){Se.bindFramebuffer(I.FRAMEBUFFER,ue.__webglFramebuffer),H.copy(x.viewport),L.copy(x.scissor),ee=x.scissorTest,Se.viewport(H),Se.scissor(L),Se.setScissorTest(ee),G=-1;return}else if(ue.__webglFramebuffer===void 0)N.setupRenderTarget(x);else if(ue.__hasExternalTextures)N.rebindTextures(x,v.get(x.texture).__webglTexture,v.get(x.depthTexture).__webglTexture);else if(x.depthBuffer){let je=x.depthTexture;if(ue.__boundDepthTexture!==je){if(je!==null&&v.has(je)&&(x.width!==je.image.width||x.height!==je.image.height))throw new Error("WebGLRenderTarget: Attached DepthTexture is initialized to the incorrect size.");N.setupDepthRenderbuffer(x)}}let be=x.texture;(be.isData3DTexture||be.isDataArrayTexture||be.isCompressedArrayTexture)&&(le=!0);let we=v.get(x).__webglFramebuffer;x.isWebGLCubeRenderTarget?(Array.isArray(we[P])?V=we[P][z]:V=we[P],U=!0):x.samples>0&&N.useMultisampledRTT(x)===!1?V=v.get(x).__webglMultisampledFramebuffer:Array.isArray(we)?V=we[z]:V=we,H.copy(x.viewport),L.copy(x.scissor),ee=x.scissorTest}else H.copy(X).multiplyScalar(qe).floor(),L.copy(ie).multiplyScalar(qe).floor(),ee=oe;if(z!==0&&(V=Ew),Se.bindFramebuffer(I.FRAMEBUFFER,V)&&Se.drawBuffers(x,V),Se.viewport(H),Se.scissor(L),Se.setScissorTest(ee),U){let ue=v.get(x.texture);I.framebufferTexture2D(I.FRAMEBUFFER,I.COLOR_ATTACHMENT0,I.TEXTURE_CUBE_MAP_POSITIVE_X+P,ue.__webglTexture,z)}else if(le){let ue=P;for(let be=0;be<x.textures.length;be++){let we=v.get(x.textures[be]);I.framebufferTextureLayer(I.FRAMEBUFFER,I.COLOR_ATTACHMENT0+be,we.__webglTexture,z,ue)}}else if(x!==null&&z!==0){let ue=v.get(x.texture);I.framebufferTexture2D(I.FRAMEBUFFER,I.COLOR_ATTACHMENT0,I.TEXTURE_2D,ue.__webglTexture,z)}G=-1},this.readRenderTargetPixels=function(x,P,z,V,U,le,pe,ue=0){if(!(x&&x.isWebGLRenderTarget)){Ne("WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let be=v.get(x).__webglFramebuffer;if(x.isWebGLCubeRenderTarget&&pe!==void 0&&(be=be[pe]),be){Se.bindFramebuffer(I.FRAMEBUFFER,be);try{let we=x.textures[ue],je=we.format,Je=we.type;if(x.textures.length>1&&I.readBuffer(I.COLOR_ATTACHMENT0+ue),!Tt.textureFormatReadable(je)){Ne("WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}if(!Tt.textureTypeReadable(Je)){Ne("WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}P>=0&&P<=x.width-V&&z>=0&&z<=x.height-U&&I.readPixels(P,z,V,U,se.convert(je),se.convert(Je),le)}finally{let we=k!==null?v.get(k).__webglFramebuffer:null;Se.bindFramebuffer(I.FRAMEBUFFER,we)}}},this.readRenderTargetPixelsAsync=async function(x,P,z,V,U,le,pe,ue=0){if(!(x&&x.isWebGLRenderTarget))throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let be=v.get(x).__webglFramebuffer;if(x.isWebGLCubeRenderTarget&&pe!==void 0&&(be=be[pe]),be)if(P>=0&&P<=x.width-V&&z>=0&&z<=x.height-U){Se.bindFramebuffer(I.FRAMEBUFFER,be);let we=x.textures[ue],je=we.format,Je=we.type;if(x.textures.length>1&&I.readBuffer(I.COLOR_ATTACHMENT0+ue),!Tt.textureFormatReadable(je))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(!Tt.textureTypeReadable(Je))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");let Te=I.createBuffer();I.bindBuffer(I.PIXEL_PACK_BUFFER,Te),I.bufferData(I.PIXEL_PACK_BUFFER,le.byteLength,I.STREAM_READ),I.readPixels(P,z,V,U,se.convert(je),se.convert(Je),0);let xt=k!==null?v.get(k).__webglFramebuffer:null;Se.bindFramebuffer(I.FRAMEBUFFER,xt);let Vt=I.fenceSync(I.SYNC_GPU_COMMANDS_COMPLETE,0);return I.flush(),await NE(I,Vt,4),I.bindBuffer(I.PIXEL_PACK_BUFFER,Te),I.getBufferSubData(I.PIXEL_PACK_BUFFER,0,le),I.deleteBuffer(Te),I.deleteSync(Vt),le}else throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.")},this.copyFramebufferToTexture=function(x,P=null,z=0){let V=Math.pow(2,-z),U=Math.floor(x.image.width*V),le=Math.floor(x.image.height*V),pe=P!==null?P.x:0,ue=P!==null?P.y:0;N.setTexture2D(x,0),I.copyTexSubImage2D(I.TEXTURE_2D,z,0,0,pe,ue,U,le),Se.unbindTexture()};let ww=I.createFramebuffer(),Cw=I.createFramebuffer();this.copyTextureToTexture=function(x,P,z=null,V=null,U=0,le=0){let pe,ue,be,we,je,Je,Te,xt,Vt,kt=x.isCompressedTexture?x.mipmaps[le]:x.image;if(z!==null)pe=z.max.x-z.min.x,ue=z.max.y-z.min.y,be=z.isBox3?z.max.z-z.min.z:1,we=z.min.x,je=z.min.y,Je=z.isBox3?z.min.z:0;else{let cn=Math.pow(2,-U);pe=Math.floor(kt.width*cn),ue=Math.floor(kt.height*cn),x.isDataArrayTexture?be=kt.depth:x.isData3DTexture?be=Math.floor(kt.depth*cn):be=1,we=0,je=0,Je=0}V!==null?(Te=V.x,xt=V.y,Vt=V.z):(Te=0,xt=0,Vt=0);let Mt=se.convert(P.format),pn=se.convert(P.type),Ee;P.isData3DTexture?(N.setTexture3D(P,0),Ee=I.TEXTURE_3D):P.isDataArrayTexture||P.isCompressedArrayTexture?(N.setTexture2DArray(P,0),Ee=I.TEXTURE_2D_ARRAY):(N.setTexture2D(P,0),Ee=I.TEXTURE_2D),I.pixelStorei(I.UNPACK_FLIP_Y_WEBGL,P.flipY),I.pixelStorei(I.UNPACK_PREMULTIPLY_ALPHA_WEBGL,P.premultiplyAlpha),I.pixelStorei(I.UNPACK_ALIGNMENT,P.unpackAlignment);let Hn=I.getParameter(I.UNPACK_ROW_LENGTH),ct=I.getParameter(I.UNPACK_IMAGE_HEIGHT),pi=I.getParameter(I.UNPACK_SKIP_PIXELS),Li=I.getParameter(I.UNPACK_SKIP_ROWS),vs=I.getParameter(I.UNPACK_SKIP_IMAGES);I.pixelStorei(I.UNPACK_ROW_LENGTH,kt.width),I.pixelStorei(I.UNPACK_IMAGE_HEIGHT,kt.height),I.pixelStorei(I.UNPACK_SKIP_PIXELS,we),I.pixelStorei(I.UNPACK_SKIP_ROWS,je),I.pixelStorei(I.UNPACK_SKIP_IMAGES,Je);let po=x.isDataArrayTexture||x.isData3DTexture,wt=P.isDataArrayTexture||P.isData3DTexture;if(x.isDepthTexture){let cn=v.get(x),Rr=v.get(P),en=v.get(cn.__renderTarget),Nr=v.get(Rr.__renderTarget);Se.bindFramebuffer(I.READ_FRAMEBUFFER,en.__webglFramebuffer),Se.bindFramebuffer(I.DRAW_FRAMEBUFFER,Nr.__webglFramebuffer);for(let mo=0;mo<be;mo++)po&&(I.framebufferTextureLayer(I.READ_FRAMEBUFFER,I.COLOR_ATTACHMENT0,v.get(x).__webglTexture,U,Je+mo),I.framebufferTextureLayer(I.DRAW_FRAMEBUFFER,I.COLOR_ATTACHMENT0,v.get(P).__webglTexture,le,Vt+mo)),I.blitFramebuffer(we,je,pe,ue,Te,xt,pe,ue,I.DEPTH_BUFFER_BIT,I.NEAREST);Se.bindFramebuffer(I.READ_FRAMEBUFFER,null),Se.bindFramebuffer(I.DRAW_FRAMEBUFFER,null)}else if(U!==0||x.isRenderTargetTexture||v.has(x)){let cn=v.get(x),Rr=v.get(P);Se.bindFramebuffer(I.READ_FRAMEBUFFER,ww),Se.bindFramebuffer(I.DRAW_FRAMEBUFFER,Cw);for(let en=0;en<be;en++)po?I.framebufferTextureLayer(I.READ_FRAMEBUFFER,I.COLOR_ATTACHMENT0,cn.__webglTexture,U,Je+en):I.framebufferTexture2D(I.READ_FRAMEBUFFER,I.COLOR_ATTACHMENT0,I.TEXTURE_2D,cn.__webglTexture,U),wt?I.framebufferTextureLayer(I.DRAW_FRAMEBUFFER,I.COLOR_ATTACHMENT0,Rr.__webglTexture,le,Vt+en):I.framebufferTexture2D(I.DRAW_FRAMEBUFFER,I.COLOR_ATTACHMENT0,I.TEXTURE_2D,Rr.__webglTexture,le),U!==0?I.blitFramebuffer(we,je,pe,ue,Te,xt,pe,ue,I.COLOR_BUFFER_BIT,I.NEAREST):wt?I.copyTexSubImage3D(Ee,le,Te,xt,Vt+en,we,je,pe,ue):I.copyTexSubImage2D(Ee,le,Te,xt,we,je,pe,ue);Se.bindFramebuffer(I.READ_FRAMEBUFFER,null),Se.bindFramebuffer(I.DRAW_FRAMEBUFFER,null)}else wt?x.isDataTexture||x.isData3DTexture?I.texSubImage3D(Ee,le,Te,xt,Vt,pe,ue,be,Mt,pn,kt.data):P.isCompressedArrayTexture?I.compressedTexSubImage3D(Ee,le,Te,xt,Vt,pe,ue,be,Mt,kt.data):I.texSubImage3D(Ee,le,Te,xt,Vt,pe,ue,be,Mt,pn,kt):x.isDataTexture?I.texSubImage2D(I.TEXTURE_2D,le,Te,xt,pe,ue,Mt,pn,kt.data):x.isCompressedTexture?I.compressedTexSubImage2D(I.TEXTURE_2D,le,Te,xt,kt.width,kt.height,Mt,kt.data):I.texSubImage2D(I.TEXTURE_2D,le,Te,xt,pe,ue,Mt,pn,kt);I.pixelStorei(I.UNPACK_ROW_LENGTH,Hn),I.pixelStorei(I.UNPACK_IMAGE_HEIGHT,ct),I.pixelStorei(I.UNPACK_SKIP_PIXELS,pi),I.pixelStorei(I.UNPACK_SKIP_ROWS,Li),I.pixelStorei(I.UNPACK_SKIP_IMAGES,vs),le===0&&P.generateMipmaps&&I.generateMipmap(Ee),Se.unbindTexture()},this.initRenderTarget=function(x){v.get(x).__webglFramebuffer===void 0&&N.setupRenderTarget(x)},this.initTexture=function(x){x.isCubeTexture?N.setTextureCube(x,0):x.isData3DTexture?N.setTexture3D(x,0):x.isDataArrayTexture||x.isCompressedArrayTexture?N.setTexture2DArray(x,0):N.setTexture2D(x,0),Se.unbindTexture()},this.resetState=function(){T=0,O=0,k=null,Se.reset(),ne.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return Ri}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(e){this._outputColorSpace=e;let t=this.getContext();t.drawingBufferColorSpace=st._getDrawingBufferColorSpace(e),t.unpackColorSpace=st._getUnpackColorSpace()}};var M2=["brushCanvas"],fp=class n{constructor(e){this.ngZone=e}fossil;close=new Pt;collect=new Pt;brushCanvasRef;phase="brushing";brushProgress=0;ctx;isDrawing=!1;strokeCount=0;ngAfterViewInit(){setTimeout(()=>this.initCanvas(),60)}initCanvas(){let e=this.brushCanvasRef.nativeElement;e.width=e.offsetWidth||320,e.height=e.offsetHeight||180,this.ctx=e.getContext("2d"),this.drawSediment(),this.ngZone.runOutsideAngular(()=>{e.addEventListener("pointerdown",t=>this.onDown(t),{passive:!1}),e.addEventListener("pointermove",t=>this.onMove(t),{passive:!1}),e.addEventListener("pointerup",()=>this.isDrawing=!1),e.addEventListener("pointerleave",()=>this.isDrawing=!1)})}drawSediment(){let{width:e,height:t}=this.ctx.canvas,i=this.ctx.createLinearGradient(0,0,0,t);i.addColorStop(0,"#b07830"),i.addColorStop(.5,"#8B5e14"),i.addColorStop(1,"#5c3a08"),this.ctx.fillStyle=i,this.ctx.fillRect(0,0,e,t);for(let r=0;r<220;r++){let s=130+Math.random()*70|0,o=65+Math.random()*55|0,a=8+Math.random()*35|0,c=(.2+Math.random()*.5).toFixed(2);this.ctx.fillStyle=`rgba(${s},${o},${a},${c})`,this.ctx.beginPath(),this.ctx.arc(Math.random()*e,Math.random()*t,2+Math.random()*14,0,Math.PI*2),this.ctx.fill()}this.ctx.strokeStyle="rgba(35,15,0,0.4)";for(let r=0;r<14;r++)this.ctx.lineWidth=.5+Math.random()*1.5,this.ctx.beginPath(),this.ctx.moveTo(Math.random()*e,Math.random()*t),this.ctx.bezierCurveTo(Math.random()*e,Math.random()*t,Math.random()*e,Math.random()*t,Math.random()*e,Math.random()*t),this.ctx.stroke()}onDown(e){this.isDrawing=!0,e.target.setPointerCapture(e.pointerId),this.brush(e)}onMove(e){this.isDrawing&&this.brush(e)}brush(e){let t=this.brushCanvasRef.nativeElement,i=t.getBoundingClientRect(),r=(e.clientX-i.left)*(t.width/i.width),s=(e.clientY-i.top)*(t.height/i.height),o=34,a=this.ctx.createRadialGradient(r,s,0,r,s,o);a.addColorStop(0,"rgba(0,0,0,1)"),a.addColorStop(.5,"rgba(0,0,0,0.85)"),a.addColorStop(1,"rgba(0,0,0,0)"),this.ctx.globalCompositeOperation="destination-out",this.ctx.fillStyle=a,this.ctx.beginPath(),this.ctx.arc(r,s,o,0,Math.PI*2),this.ctx.fill(),++this.strokeCount%8===0&&this.checkProgress()}checkProgress(){let{width:e,height:t}=this.ctx.canvas,i=this.ctx.getImageData(0,0,e,t).data,r=0,s=Math.floor(i.length/16);for(let a=3;a<i.length;a+=16)i[a]<128&&r++;let o=Math.min(100,Math.round(r/s*100));this.ngZone.run(()=>{this.brushProgress=o,o>=65&&(this.phase="revealed")})}get rarityLabel(){return{common:"Common",rare:"Rare",legendary:"Legendary"}[this.fossil.rarity]??this.fossil.rarity}get fossilEmoji(){let e=this.fossil.id.split("_")[0];return{"trex-skull-01":"\u{1F9B4}","triceratops-horn-01":"\u{1F995}","ammonite-01":"\u{1F41A}","mammoth-tusk-01":"\u{1F9A3}","shark-tooth-01":"\u{1F988}"}[e]??"\u{1FAA8}"}static \u0275fac=function(t){return new(t||n)(fn(Ot))};static \u0275cmp=wi({type:n,selectors:[["app-fossil-card"]],viewQuery:function(t,i){if(t&1&&Xo(M2,5),t&2){let r;Yo(r=Zo())&&(i.brushCanvasRef=r.first)}},inputs:{fossil:"fossil"},outputs:{close:"close",collect:"collect"},decls:58,vars:20,consts:[["brushCanvas",""],[1,"fossil-card"],[1,"brush-phase"],[1,"card-header"],[1,"rarity-badge"],[1,"close-btn",3,"click"],[1,"sediment-preview"],[1,"preview-emoji"],[1,"preview-name"],[1,"preview-sub"],[1,"brush-canvas"],[1,"brush-progress-wrap"],[1,"brush-progress-bar"],[1,"brush-hint"],[1,"reveal-phase"],[1,"fossil-icon"],[1,"fossil-name"],[1,"fossil-species"],[1,"info-grid"],[1,"info-item"],[1,"label"],[1,"value"],[1,"description"],[1,"fun-fact"],[1,"fun-fact-label"],[1,"collect-btn",3,"click"]],template:function(t,i){t&1&&(It(0,"div",1)(1,"div",2)(2,"div",3)(3,"span",4),Oe(4),Ct(),It(5,"button",5),qo("click",function(){return i.close.emit()}),Oe(6,"\u2715"),Ct()(),It(7,"div",6)(8,"div",7),Oe(9),Ct(),It(10,"p",8),Oe(11),Ct(),It(12,"p",9),Oe(13,"Brush to reveal"),Ct(),Ec(14,"canvas",10,0),Ct(),It(16,"div",11),Ec(17,"div",12),Ct(),It(18,"p",13),Oe(19,"Swipe to brush away the sediment"),Ct()(),It(20,"div",14)(21,"div",3)(22,"span",4),Oe(23),Ct(),It(24,"button",5),qo("click",function(){return i.close.emit()}),Oe(25,"\u2715"),Ct()(),It(26,"div",15),Oe(27),Ct(),It(28,"h2",16),Oe(29),Ct(),It(30,"p",17)(31,"em"),Oe(32),Ct()(),It(33,"div",18)(34,"div",19)(35,"span",20),Oe(36,"Era"),Ct(),It(37,"span",21),Oe(38),Ct()(),It(39,"div",19)(40,"span",20),Oe(41,"Period"),Ct(),It(42,"span",21),Oe(43),Ct()(),It(44,"div",19)(45,"span",20),Oe(46,"Discovered"),Ct(),It(47,"span",21),Oe(48),Ct()()(),It(49,"p",22),Oe(50),Ct(),It(51,"div",23)(52,"span",24),Oe(53,"Fun Fact"),Ct(),It(54,"p"),Oe(55),Ct()(),It(56,"button",25),qo("click",function(){return i.collect.emit(i.fossil)}),Oe(57," Collect Fossil "),Ct()()()),t&2&&(Qg("rarity-"+i.fossil.rarity),Ge(),pr("hidden-phase",i.phase!=="brushing"),Ge(3),$t(i.rarityLabel),Ge(5),$t(i.fossilEmoji),Ge(2),$t(i.fossil.name),Ge(6),Jo("width",i.brushProgress,"%"),Ge(3),pr("hidden-phase",i.phase!=="revealed"),Ge(3),$t(i.rarityLabel),Ge(4),$t(i.fossilEmoji),Ge(2),$t(i.fossil.name),Ge(3),$t(i.fossil.species),Ge(6),$t(i.fossil.era),Ge(5),$t(i.fossil.period),Ge(5),$t(i.fossil.yearDiscovered),Ge(2),$t(i.fossil.description),Ge(5),$t(i.fossil.funFact))},dependencies:[qr],styles:['@charset "UTF-8";.fossil-card[_ngcontent-%COMP%]{background:linear-gradient(145deg,#2a1a00,#3d2a00);border:2px solid #8B6914;border-radius:16px;overflow:hidden;color:#f5e6c8;max-width:360px;width:90vw;box-shadow:0 8px 32px #0009}.hidden-phase[_ngcontent-%COMP%]{display:none!important}.brush-phase[_ngcontent-%COMP%]{padding:16px 20px 20px}.sediment-preview[_ngcontent-%COMP%]{position:relative;height:180px;border-radius:12px;overflow:hidden;display:flex;flex-direction:column;align-items:center;justify-content:center;background:radial-gradient(ellipse at center,#5c3d11,#3d2200 70%)}.preview-emoji[_ngcontent-%COMP%]{font-size:64px;filter:brightness(.55) sepia(.4);-webkit-user-select:none;user-select:none}.preview-name[_ngcontent-%COMP%]{font-size:16px;font-weight:700;color:#c8a86b;margin:6px 0 2px}.preview-sub[_ngcontent-%COMP%]{font-size:11px;color:#c8a86b80}.brush-canvas[_ngcontent-%COMP%]{position:absolute;inset:0;width:100%;height:100%;cursor:crosshair;touch-action:none}.brush-progress-wrap[_ngcontent-%COMP%]{margin-top:10px;height:5px;background:#0006;border-radius:20px;overflow:hidden}.brush-progress-bar[_ngcontent-%COMP%]{height:100%;background:linear-gradient(90deg,#8b6914,gold);border-radius:20px;transition:width .15s ease}.brush-hint[_ngcontent-%COMP%]{text-align:center;font-size:11px;color:#c8a86b99;margin:8px 0 0}.reveal-phase[_ngcontent-%COMP%]{padding:20px;animation:_ngcontent-%COMP%_fadeReveal .4s ease}@keyframes _ngcontent-%COMP%_fadeReveal{0%{opacity:0;transform:scale(.97)}to{opacity:1;transform:scale(1)}}.card-header[_ngcontent-%COMP%]{display:flex;justify-content:space-between;align-items:center;margin-bottom:12px}.rarity-badge[_ngcontent-%COMP%]{font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:1px;padding:3px 8px;border-radius:4px;background:#ffffff1a}.close-btn[_ngcontent-%COMP%]{background:none;border:none;color:#f5e6c8;font-size:18px;cursor:pointer;padding:4px;line-height:1}.rarity-legendary[_ngcontent-%COMP%]{border-color:gold;box-shadow:0 0 20px #ffd7004d}.rarity-rare[_ngcontent-%COMP%]{border-color:#a855f7;box-shadow:0 0 20px #a855f74d}.rarity-common[_ngcontent-%COMP%]{border-color:#6b7280}.fossil-icon[_ngcontent-%COMP%]{font-size:48px;text-align:center;margin:8px 0}.fossil-name[_ngcontent-%COMP%]{font-size:20px;font-weight:700;text-align:center;margin:0 0 4px}.fossil-species[_ngcontent-%COMP%]{font-size:13px;color:#c8a86b;text-align:center;margin:0 0 16px}.info-grid[_ngcontent-%COMP%]{display:grid;grid-template-columns:repeat(3,1fr);gap:8px;margin-bottom:16px}.info-item[_ngcontent-%COMP%]{text-align:center;background:#0003;border-radius:8px;padding:8px 4px}.label[_ngcontent-%COMP%]{display:block;font-size:10px;text-transform:uppercase;color:#c8a86b;margin-bottom:4px}.value[_ngcontent-%COMP%]{display:block;font-size:13px;font-weight:600}.description[_ngcontent-%COMP%]{font-size:13px;line-height:1.5;color:#e0cca8;margin-bottom:16px}.fun-fact[_ngcontent-%COMP%]{background:#ffd70014;border-left:3px solid #ffd700;padding:10px 12px;border-radius:0 8px 8px 0;margin-bottom:16px}.fun-fact-label[_ngcontent-%COMP%]{font-size:10px;text-transform:uppercase;color:gold;font-weight:700}.fun-fact[_ngcontent-%COMP%]   p[_ngcontent-%COMP%]{font-size:13px;color:#f5e6c8;margin:4px 0 0;line-height:1.4}.collect-btn[_ngcontent-%COMP%]{width:100%;padding:12px;background:linear-gradient(135deg,#8b6914,#c8a020);border:none;border-radius:10px;color:#fff;font-size:16px;font-weight:700;cursor:pointer;letter-spacing:.5px}.collect-btn[_ngcontent-%COMP%]:active{transform:scale(.97)}']})};function b2(n,e){if(n&1&&(nt(0,"div",13),Un(1,"span",14),Oe(2),mt()),n&2){let t=An();Ge(2),Dd(" ",t.nearbyCount," fossil",t.nearbyCount>1?"s":""," nearby \u2014 tap screen to collect! ")}}function S2(n,e){if(n&1){let t=$o();nt(0,"div",15)(1,"div",16)(2,"p"),Oe(3,"Tap to enter AR mode"),mt(),nt(4,"button",17),jn("click",function(){cr(t);let r=An();return lr(r.startAR.emit())}),Oe(5,"Start AR"),mt()()()}}function E2(n,e){if(n&1&&Un(0,"div",20),n&2){let t=e.$implicit;Jo("width",t.size,"px")("height",t.size,"px"),Zt("ngStyle",t.style)}}function w2(n,e){if(n&1&&(lc(),Un(0,"circle",32)),n&2){let t=e.$implicit;wd("cx",t.x)("cy",t.y)("r",t.r)}}function C2(n,e){if(n&1&&(nt(0,"div",21)(1,"div",22),Oe(2,"RADAR"),mt(),lc(),nt(3,"svg",23),Un(4,"circle",24)(5,"circle",25)(6,"circle",26)(7,"line",27)(8,"line",28)(9,"polygon",29),Vi(10,w2,1,3,"circle",30),Un(11,"circle",31),mt()()),n&2){let t=An(2);Ge(10),Zt("ngForOf",t.radarDots)("ngForTrackBy",t.trackById)}}function T2(n,e){if(n&1&&(Cd(0),Vi(1,E2,1,5,"div",18)(2,C2,12,2,"div",19),Td()),n&2){let t=An();Ge(),Zt("ngForOf",t.offScreenFossils)("ngForTrackBy",t.trackById),Ge(),Zt("ngIf",t.fossilDirections.length>0)}}var hp=class n{collected=0;total=0;nearbyCount=0;gpsActive=!1;showARPrompt=!1;arActive=!1;fossilDirections=[];startAR=new Pt;openMap=new Pt;openCollection=new Pt;openLearn=new Pt;trackById(e,t){return t.id}get radarDots(){return this.fossilDirections.filter(i=>i.distance<=50).map(i=>{let r=Math.min(i.distance,50),s=r/50*44,o=i.relAngle*Math.PI/180,a=1+(1-r/50)*2.5;return{id:i.id,x:+(s*Math.sin(o)).toFixed(2),y:+(-s*Math.cos(o)).toFixed(2),r:+a.toFixed(2)}})}get offScreenFossils(){return this.fossilDirections.filter(e=>e.distance<=50).map(e=>{let t=e.relAngle>180?e.relAngle-360:e.relAngle;if(Math.abs(t)<=50)return null;let i=Math.round(12+(1-Math.min(e.distance,200)/200)*22),r=e.relAngle*Math.PI/180,s=Math.sin(r),o=-Math.cos(r),a=Math.abs(s),c=Math.abs(o),l;if(a*1.8>c){let u=Math.max(12,Math.min(88,50+o/a*30))+"%";l=s>0?{right:"14px",top:u}:{left:"14px",top:u}}else{let u=Math.max(12,Math.min(88,50+s/c*38))+"%";l=o>0?{bottom:"85px",left:u}:{top:"70px",left:u}}return{id:e.id,size:i,style:l}}).filter(e=>e!==null)}static \u0275fac=function(t){return new(t||n)};static \u0275cmp=wi({type:n,selectors:[["app-hud"]],inputs:{collected:"collected",total:"total",nearbyCount:"nearbyCount",gpsActive:"gpsActive",showARPrompt:"showARPrompt",arActive:"arActive",fossilDirections:"fossilDirections"},outputs:{startAR:"startAR",openMap:"openMap",openCollection:"openCollection",openLearn:"openLearn"},decls:29,vars:9,consts:[[1,"hud"],[1,"top-bar"],[1,"score-badge"],[1,"score-label"],[1,"score-value"],[1,"title"],[1,"gps-badge"],["class","nearby-panel",4,"ngIf"],["class","center-prompt",4,"ngIf"],[4,"ngIf"],[1,"version-stamp"],[1,"bottom-bar"],[1,"icon-btn",3,"click"],[1,"nearby-panel"],[1,"pulse-dot"],[1,"center-prompt"],[1,"prompt-box"],[1,"ar-btn",3,"click"],["class","edge-dot",3,"ngStyle","width","height",4,"ngFor","ngForOf","ngForTrackBy"],["class","radar-wrap",4,"ngIf"],[1,"edge-dot",3,"ngStyle"],[1,"radar-wrap"],[1,"radar-title"],["viewBox","-50 -50 100 100",1,"radar-svg"],["cx","0","cy","0","r","49","fill","rgba(0,0,0,0.6)","stroke","rgba(255,215,0,0.35)","stroke-width","1"],["cx","0","cy","0","r","13","fill","none","stroke","rgba(74,222,128,0.35)","stroke-width","0.8","stroke-dasharray","2,2"],["cx","0","cy","0","r","32","fill","none","stroke","rgba(255,255,255,0.1)","stroke-width","0.5"],["x1","0","y1","-48","x2","0","y2","48","stroke","rgba(255,255,255,0.07)","stroke-width","0.5"],["x1","-48","y1","0","x2","48","y2","0","stroke","rgba(255,255,255,0.07)","stroke-width","0.5"],["points","0,-45 2.5,-37 -2.5,-37","fill","#4ade80","opacity","0.85"],["class","fossil-dot","fill","#ffd700",4,"ngFor","ngForOf","ngForTrackBy"],["cx","0","cy","0","r","2.5","fill","white"],["fill","#ffd700",1,"fossil-dot"]],template:function(t,i){t&1&&(nt(0,"div",0)(1,"div",1)(2,"div",2)(3,"span",3),Oe(4,"Collected"),mt(),nt(5,"span",4),Oe(6),mt()(),nt(7,"div",5),Oe(8,"AR Archaeology"),mt(),nt(9,"div",6),Oe(10),mt()(),Vi(11,b2,3,2,"div",7)(12,S2,6,0,"div",8)(13,T2,3,3,"ng-container",9),nt(14,"div",10),Oe(15,"v2.1.0"),mt(),nt(16,"div",11)(17,"button",12),jn("click",function(){return i.openMap.emit()}),Oe(18,"\u{1F5FA}\uFE0F"),nt(19,"span"),Oe(20,"Map"),mt()(),nt(21,"button",12),jn("click",function(){return i.openCollection.emit()}),Oe(22,"\u{1F9B4}"),nt(23,"span"),Oe(24,"Collection"),mt()(),nt(25,"button",12),jn("click",function(){return i.openLearn.emit()}),Oe(26,"\u{1F4DA}"),nt(27,"span"),Oe(28,"Learn"),mt()()()()),t&2&&(Ge(6),$t(i.collected),Ge(3),pr("gps-ok",i.gpsActive)("gps-error",!i.gpsActive),Ge(),mr(" ",i.gpsActive?"\u{1F4CD} GPS":"\u26A0\uFE0F No GPS"," "),Ge(),Zt("ngIf",i.nearbyCount>0),Ge(),Zt("ngIf",i.showARPrompt),Ge(),Zt("ngIf",i.arActive))},dependencies:[qr,kd,Ic,hv],styles:['@charset "UTF-8";.hud[_ngcontent-%COMP%]{position:fixed;inset:0;pointer-events:none;display:flex;flex-direction:column;z-index:20}.top-bar[_ngcontent-%COMP%]{display:flex;justify-content:space-between;align-items:center;padding:12px 16px;background:linear-gradient(180deg,rgba(0,0,0,.7) 0%,transparent 100%);pointer-events:all}.score-badge[_ngcontent-%COMP%], .gps-badge[_ngcontent-%COMP%]{background:#00000080;border-radius:20px;padding:4px 10px;font-size:12px;color:#f5e6c8;font-weight:600}.score-label[_ngcontent-%COMP%]{display:block;font-size:9px;text-transform:uppercase;color:#c8a86b}.score-value[_ngcontent-%COMP%]{display:block;font-size:16px;font-weight:700}.gps-ok[_ngcontent-%COMP%]{color:#4ade80}.gps-error[_ngcontent-%COMP%]{color:#f87171}.title[_ngcontent-%COMP%]{font-size:16px;font-weight:700;color:#f5e6c8;text-shadow:0 1px 4px rgba(0,0,0,.8)}.nearby-panel[_ngcontent-%COMP%]{margin:8px 16px 0;background:#8b6914d9;color:#fff;padding:6px 12px;border-radius:20px;font-size:12px;font-weight:600;display:flex;align-items:center;gap:8px;pointer-events:all;align-self:flex-start}.pulse-dot[_ngcontent-%COMP%]{width:7px;height:7px;border-radius:50%;background:gold;animation:_ngcontent-%COMP%_pulse 1.2s infinite}@keyframes _ngcontent-%COMP%_pulse{0%,to{transform:scale(1);opacity:1}50%{transform:scale(1.4);opacity:.6}}.center-prompt[_ngcontent-%COMP%]{flex:1;display:flex;align-items:center;justify-content:center;pointer-events:all}.prompt-box[_ngcontent-%COMP%]{background:#000000b3;border:1px solid #8B6914;border-radius:12px;padding:20px 28px;text-align:center;color:#f5e6c8}.prompt-box[_ngcontent-%COMP%]   p[_ngcontent-%COMP%]{margin-bottom:12px;font-size:16px}.ar-btn[_ngcontent-%COMP%]{background:linear-gradient(135deg,#8b6914,#c8a020);border:none;color:#fff;font-size:16px;font-weight:700;padding:10px 28px;border-radius:8px;cursor:pointer}.edge-dot[_ngcontent-%COMP%]{position:fixed;border-radius:50%;background:radial-gradient(circle at 35% 35%,#ffe066,#e67e00);box-shadow:0 0 10px #ffc8008c;transform:translate(-50%,-50%);pointer-events:none;animation:_ngcontent-%COMP%_edgePulse 1.8s ease-in-out infinite;transition:top .45s ease,left .45s ease,right .45s ease,bottom .45s ease,width .45s ease,height .45s ease}@keyframes _ngcontent-%COMP%_edgePulse{0%,to{opacity:.85;transform:translate(-50%,-50%) scale(1)}50%{opacity:1;transform:translate(-50%,-50%) scale(1.18)}}.radar-wrap[_ngcontent-%COMP%]{position:fixed;bottom:90px;right:12px;display:flex;flex-direction:column;align-items:center;gap:2px;pointer-events:none}.radar-title[_ngcontent-%COMP%]{font-size:9px;color:#ffd70099;letter-spacing:2px;font-weight:700}.radar-svg[_ngcontent-%COMP%]{width:90px;height:90px}.fossil-dot[_ngcontent-%COMP%]{opacity:.9;transition:cx .4s ease,cy .4s ease,r .35s ease}.bottom-bar[_ngcontent-%COMP%]{position:fixed;bottom:0;left:0;right:0;display:flex;justify-content:space-around;padding:8px 0 20px;background:linear-gradient(0deg,rgba(0,0,0,.8) 0%,transparent 100%);pointer-events:all}.icon-btn[_ngcontent-%COMP%]{background:none;border:none;color:#f5e6c8;font-size:22px;cursor:pointer;display:flex;flex-direction:column;align-items:center;gap:2px}.icon-btn[_ngcontent-%COMP%]   span[_ngcontent-%COMP%]{font-size:10px}.version-stamp[_ngcontent-%COMP%]{position:fixed;bottom:72px;right:8px;font-size:10px;color:#ffffff4d;pointer-events:none;letter-spacing:.5px}']})};function y_(n,e,t=3,i=30){let r=t+Math.random()*(i-t),s=Math.random()*2*Math.PI,o=uw(n),a=uw(e),c=r/6371e3,l=Math.asin(Math.sin(o)*Math.cos(c)+Math.cos(o)*Math.sin(c)*Math.cos(s)),u=a+Math.atan2(Math.sin(s)*Math.sin(c)*Math.cos(o),Math.cos(c)-Math.sin(o)*Math.sin(l));return{lat:dw(l),lng:dw(u)}}function fw(n,e,t,i){return Array.from({length:e},(r,s)=>{let o=n[s%n.length],{lat:a,lng:c}=y_(t,i);return et(ae({},o),{id:`${o.id}_${Date.now()}_${s}`,lat:a,lng:c,discovered:!1})})}function uw(n){return n*Math.PI/180}function dw(n){return n*180/Math.PI}var hw=[{id:"trex-skull-01",name:"T-Rex Skull Fragment",species:"Tyrannosaurus rex",era:"Mesozoic",period:"Late Cretaceous",yearDiscovered:1902,description:"A fossilized fragment of a Tyrannosaurus rex skull. T-Rex had one of the most powerful bites of any land predator, capable of crushing bone.",funFact:"T-Rex had tiny arms but enormous legs \u2014 it could run up to 12 mph!",lat:0,lng:0,discovered:!1,rarity:"legendary"},{id:"triceratops-horn-01",name:"Triceratops Horn",species:"Triceratops horridus",era:"Mesozoic",period:"Late Cretaceous",yearDiscovered:1889,description:"One of the three distinctive horns from a Triceratops. These horns could grow up to 1 meter long and were used for defense and display.",funFact:"Triceratops lived right at the end of the dinosaur era \u2014 some individuals may have seen the asteroid impact!",lat:0,lng:0,discovered:!1,rarity:"rare"},{id:"ammonite-01",name:"Ammonite Shell",species:"Ammonoidea",era:"Paleozoic/Mesozoic",period:"Devonian to Cretaceous",yearDiscovered:1800,description:"A spiral-shelled cephalopod that lived in ancient seas. Ammonites are excellent index fossils \u2014 their presence tells geologists the exact age of the rock layer.",funFact:"Ammonites survived three mass extinctions but were wiped out in the same event that killed the dinosaurs.",lat:0,lng:0,discovered:!1,rarity:"common"},{id:"mammoth-tusk-01",name:"Woolly Mammoth Tusk",species:"Mammuthus primigenius",era:"Cenozoic",period:"Pleistocene",yearDiscovered:1799,description:"A curved tusk from a woolly mammoth. Mammoths used their tusks to sweep snow away from food and to fight rivals.",funFact:"Woolly mammoths are so well-preserved in permafrost that scientists have recovered intact DNA \u2014 a revival project is underway!",lat:0,lng:0,discovered:!1,rarity:"rare"},{id:"shark-tooth-01",name:"Megalodon Tooth",species:"Otodus megalodon",era:"Cenozoic",period:"Miocene to Pliocene",yearDiscovered:1667,description:"A massive tooth from Megalodon, the largest shark to ever live. A single tooth could be over 18 cm long \u2014 bigger than your hand.",funFact:"Megalodon is estimated to have been 15-20 meters long. A great white shark could fit in its mouth.",lat:0,lng:0,discovered:!1,rarity:"legendary"}];var pp=class n{constructor(e){this.ngZone=e}renderer;scene;camera;xrSession=null;fossilMeshes=new Map;animationId=0;tapHandler;supported=zt(!1);active=zt(!1);loading=zt(!1);error=zt(null);async checkSupport(){if(!navigator.xr)return this.error.set("WebXR not available in this browser"),!1;let e=await navigator.xr.isSessionSupported("immersive-ar");return this.supported.set(e),e||this.error.set("AR not supported on this device"),e}async init(e){this.renderer=new lp({canvas:e,alpha:!0,antialias:!0}),this.renderer.setPixelRatio(window.devicePixelRatio),this.renderer.setSize(window.innerWidth,window.innerHeight),this.renderer.xr.enabled=!0,this.renderer.xr.setReferenceSpaceType("local"),e.addEventListener("touchend",r=>{if(this.xrSession)return;let s=r.changedTouches[0];if(!s)return;let o=e.getBoundingClientRect(),a=new rt((s.clientX-o.left)/o.width*2-1,-((s.clientY-o.top)/o.height)*2+1),c=new Oa;c.setFromCamera(a,this.camera),this.checkFossilHit(c.ray.origin,c.ray.direction)},{passive:!0}),this.scene=new ul,this.camera=new bn(70,window.innerWidth/window.innerHeight,.01,20);let t=new Sl(16777215,1.2);this.scene.add(t);let i=new bl(16765565,1.5);i.position.set(1,2,1),this.scene.add(i)}async startAR(e){if(!navigator.xr){this.error.set("WebXR not available in this browser");return}this.error.set(null),this.loading.set(!0);try{let t={requiredFeatures:[],optionalFeatures:["hit-test","dom-overlay"]};e&&(t.domOverlay={root:e}),this.xrSession=await navigator.xr.requestSession("immersive-ar",t),await this.renderer.xr.setSession(this.xrSession),this.active.set(!0),this.xrSession.addEventListener("select",i=>{let r=i,s=this.renderer.xr.getReferenceSpace();if(!s||!r.frame||!r.inputSource)return;let o=r.frame.getPose(r.inputSource.targetRaySpace,s);if(!o)return;let a=new Rt().fromArray(o.transform.matrix),c=new F().setFromMatrixPosition(a),l=new fi().setFromRotationMatrix(a),u=new F(0,0,-1).applyQuaternion(l).normalize();this.checkFossilHit(c,u)}),this.xrSession.addEventListener("end",()=>{this.ngZone.run(()=>{this.active.set(!1),this.loading.set(!1),this.xrSession=null})}),this.ngZone.runOutsideAngular(()=>{this.renderer.setAnimationLoop((i,r)=>{this.tick(r)})})}catch(t){let i=t instanceof Error?t.message:String(t);this.error.set(`AR failed: ${i}`),this.xrSession&&(await this.xrSession.end().catch(()=>{}),this.xrSession=null)}finally{this.loading.set(!1)}}async stopAR(){this.xrSession&&await this.xrSession.end(),this.renderer.setAnimationLoop(null)}placeFossil(e,t){if(this.fossilMeshes.has(e))return;let i=new wr,r=new Ra(.08,10,10),s=new yl({color:13150315,roughness:.6,metalness:.2}),o=new an(r,s);i.add(o);let a=new Na(.13,.008,8,32),c=new qi({color:16766720,transparent:!0,opacity:.7}),l=new an(a,c);l.rotation.x=Math.PI/2,i.add(l);let u=new Na(.18,.004,8,32),d=new qi({color:16766720,transparent:!0,opacity:.3}),f=new an(u,d);f.rotation.x=Math.PI/2,i.add(f);let h=new gl(.03,.09,6),g=new qi({color:16766720}),_=new an(h,g);_.rotation.z=Math.PI,_.position.y=.24,i.add(_);let m=new Ra(.28,6,6),p=new qi({visible:!1}),M=new an(m,p);i.add(M),i.position.copy(t),this.scene.add(i),this.fossilMeshes.set(e,i)}setTapHandler(e){this.tapHandler=e}removeFossil(e){let t=this.fossilMeshes.get(e);t&&(this.scene.remove(t),this.fossilMeshes.delete(e))}checkFossilHit(e,t){let i=new Oa(e.clone(),t.clone().normalize(),.01,20),r=new Map;this.fossilMeshes.forEach((a,c)=>{a.traverse(l=>r.set(l,c)),r.set(a,c)});let s=Array.from(r.keys()),o=i.intersectObjects(s,!1);if(o.length>0){let a=r.get(o[0].object);a&&this.ngZone.run(()=>this.tapHandler?.(a))}}tick(e){let t=performance.now()/1e3;this.fossilMeshes.forEach(i=>{if(i.children[1]&&(i.children[1].rotation.z+=.015),i.children[2]){i.children[2].rotation.z-=.008;let r=i.children[2].material;r.opacity=.15+Math.abs(Math.sin(t*1.5))*.25}i.children[3]&&(i.children[3].position.y=.24+Math.sin(t*2.5)*.03)}),this.renderer.render(this.scene,this.camera)}static \u0275fac=function(t){return new(t||n)(Re(Ot))};static \u0275prov=Ce({token:n,factory:n.\u0275fac,providedIn:"root"})};var A2=15,mp=class n{constructor(e){this.ngZone=e}playerPosition=zt(null);nearbyFossils=zt([]);error=zt(null);watchId=null;fossils=[];loadFossils(e){this.fossils=e}startTracking(){if(!navigator.geolocation){this.error.set("Geolocation is not supported by your browser");return}this.watchId=navigator.geolocation.watchPosition(e=>{this.ngZone.run(()=>{let t={lat:e.coords.latitude,lng:e.coords.longitude,accuracy:e.coords.accuracy};this.playerPosition.set(t),this.updateNearby(t),this.error.set(null)})},e=>{this.ngZone.run(()=>{this.error.set(`GPS error: ${e.message}`)})},{enableHighAccuracy:!0,maximumAge:5e3,timeout:1e4})}stopTracking(){this.watchId!==null&&(navigator.geolocation.clearWatch(this.watchId),this.watchId=null)}updateNearby(e){let t=this.fossils.filter(i=>this.haversineMeters(e.lat,e.lng,i.lat,i.lng)<=A2);this.nearbyFossils.set(t)}distanceTo(e){let t=this.playerPosition();return t?this.haversineMeters(t.lat,t.lng,e.lat,e.lng):1/0}bearingTo(e){let t=this.playerPosition();if(!t)return 0;let i=this.toRad(t.lat),r=this.toRad(e.lat),s=this.toRad(e.lng-t.lng),o=Math.sin(s)*Math.cos(r),a=Math.cos(i)*Math.sin(r)-Math.sin(i)*Math.cos(r)*Math.cos(s);return(Math.atan2(o,a)*180/Math.PI+360)%360}haversineMeters(e,t,i,r){let o=this.toRad(i-e),a=this.toRad(r-t),c=Math.sin(o/2)**2+Math.cos(this.toRad(e))*Math.cos(this.toRad(i))*Math.sin(a/2)**2;return 6371e3*2*Math.atan2(Math.sqrt(c),Math.sqrt(1-c))}toRad(e){return e*Math.PI/180}static \u0275fac=function(t){return new(t||n)(Re(Ot))};static \u0275prov=Ce({token:n,factory:n.\u0275fac,providedIn:"root"})};var pw=1.0668,gp=class n{constructor(e){this.ngZone=e}orientation=zt(null);permissionDenied=zt(!1);bound;async requestPermission(){let e=DeviceOrientationEvent;return typeof e.requestPermission=="function"&&await e.requestPermission()!=="granted"?(this.permissionDenied.set(!0),!1):!0}start(){this.bound=e=>{this.ngZone.run(()=>{if(e.alpha==null)return;let t=(e.beta??0)-90;this.orientation.set({heading:e.alpha??0,pitch:t,roll:e.gamma??0})})},window.addEventListener("deviceorientation",this.bound,!0)}stop(){this.bound&&window.removeEventListener("deviceorientation",this.bound,!0)}groundLookDistance(e=pw){let t=this.orientation();if(!t)return 2;let i=Math.abs(t.pitch)*Math.PI/180;return i<.05?10:Math.min(10,Math.max(.3,e/Math.tan(i)))}fossilOffset(e,t,i=pw){let s=this.orientation()?.heading??0,a=(e-s)*Math.PI/180;return{x:t*Math.sin(a),y:-i,z:-t*Math.cos(a)}}static \u0275fac=function(t){return new(t||n)(Re(Ot))};static \u0275prov=Ce({token:n,factory:n.\u0275fac,providedIn:"root"})};var P2=["arCanvas"],O2=["arOverlay"];function L2(n,e){n&1&&(nt(0,"p",17),Oe(1," \u26A0\uFE0F AR not detected \u2014 needs Chrome on Android with ARCore "),mt())}function F2(n,e){if(n&1&&(nt(0,"p",18),Oe(1),mt()),n&2){let t=An(2);Ge(),$t(t.arService.error())}}function k2(n,e){if(n&1){let t=$o();nt(0,"div",9)(1,"div",10)(2,"div",11),Oe(3,"\u{1F9B4}"),mt(),nt(4,"h1"),Oe(5,"ARArcheoGame"),mt(),nt(6,"div",12)(7,"span"),Oe(8),mt()(),nt(9,"div",13),Oe(10),mt(),nt(11,"button",14),jn("click",function(){cr(t);let r=An();return lr(r.onStartAR())}),Oe(12),mt(),Vi(13,L2,2,0,"p",15)(14,F2,2,1,"p",16),mt()()}if(n&2){let t=An();Ge(7),pr("ok",!!t.gps.playerPosition())("waiting",!t.gps.playerPosition()),Ge(),mr(" ",t.gps.playerPosition()?"\u{1F4CD} GPS active":"\u23F3 Waiting for GPS..."," "),Ge(2),mr("",t.allFossils().length," fossils hidden nearby"),Ge(),Zt("disabled",t.arService.loading()),Ge(),mr(" ",t.arService.loading()?"\u23F3 Starting...":"\u{1F4F7} Start AR"," "),Ge(),Zt("ngIf",!t.arService.supported()),Ge(),Zt("ngIf",t.arService.error())}}function U2(n,e){if(n&1){let t=$o();nt(0,"div",19),jn("click",function(){cr(t);let r=An();return lr(r.selectedFossil.set(null))}),nt(1,"div",20),jn("click",function(r){return r.stopPropagation()}),nt(2,"app-fossil-card",21),jn("close",function(){cr(t);let r=An();return lr(r.selectedFossil.set(null))})("collect",function(r){cr(t);let s=An();return lr(s.onCollect(r))}),mt()()()}if(n&2){let t=An();Ge(2),Zt("fossil",t.selectedFossil())}}function B2(n,e){if(n&1&&(nt(0,"div",22),Oe(1),mt()),n&2){let t=An();Ge(),$t(t.gps.error())}}var V2=6,H2=30,z2=60,G2=100,vp=class n{constructor(e,t,i){this.arService=e;this.gps=t;this.orientation=i;ju(()=>{let r=this.gps.playerPosition();r&&Ci(()=>this.replenishFossils(r))}),ju(()=>{let r=this.gps.nearbyFossils();this.syncARMarkers(r)})}canvasRef;overlayRef;fossilTemplates=hw;allFossils=zt([]);collectedIds=new Set;selectedFossil=zt(null);showMap=!1;showCollection=!1;showLearn=!1;fossilDirections=Cc(()=>{let e=this.allFossils(),t=this.orientation.orientation()?.heading??0;return this.gps.playerPosition()?e.filter(i=>!this.collectedIds.has(i.id)&&!i.discovered).map(i=>{let s=((this.gps.bearingTo(i)-t)%360+360)%360;return{id:i.id,name:i.name,relAngle:s,distance:Math.round(this.gps.distanceTo(i))}}).sort((i,r)=>i.distance-r.distance):[]});async ngOnInit(){await this.arService.checkSupport(),await this.arService.init(this.canvasRef.nativeElement),this.orientation.start(),this.gps.startTracking(),this.arService.setTapHandler(e=>{if(this.selectedFossil())return;let t=this.allFossils().find(i=>i.id===e&&!this.collectedIds.has(i.id)&&!i.discovered);t&&this.selectedFossil.set(t)})}async onStartAR(){await this.orientation.requestPermission(),await this.arService.startAR(this.overlayRef.nativeElement)}onCollect(e){this.collectedIds.add(e.id),this.arService.removeFossil(e.id),this.selectedFossil.set(null),this.allFossils.update(t=>t.filter(i=>i.id!==e.id)),this.gps.loadFossils(this.allFossils())}replenishFossils(e){let t=this.allFossils(),i=t.filter(a=>this.gps.distanceTo(a)>G2?(this.arService.removeFossil(a.id),!1):!0),r=i.filter(a=>this.gps.distanceTo(a)<=H2).length,s=i.length<z2?Math.max(0,V2-r):0,o=s>0?fw(this.fossilTemplates,s,e.lat,e.lng):[];if(t.length===0&&o.length>0){let{lat:a,lng:c}=y_(e.lat,e.lng,1,2);o=[et(ae({},o[0]),{lat:a,lng:c}),...o.slice(1)]}if(i.length!==t.length||o.length>0){let a=[...i,...o];this.allFossils.set(a),this.gps.loadFossils(a)}}syncARMarkers(e){e.forEach(i=>{if(this.collectedIds.has(i.id))return;let r=this.gps.distanceTo(i),s=this.gps.bearingTo(i),o=Math.min(3,r*.1),{x:a,y:c,z:l}=this.orientation.fossilOffset(s,o);this.arService.placeFossil(i.id,new F(a,c,l))});let t=new Set(e.map(i=>i.id));this.allFossils().forEach(i=>{!t.has(i.id)&&!this.collectedIds.has(i.id)&&this.arService.removeFossil(i.id)})}ngOnDestroy(){this.gps.stopTracking(),this.orientation.stop(),this.arService.stopAR()}static \u0275fac=function(t){return new(t||n)(fn(pp),fn(mp),fn(gp))};static \u0275cmp=wi({type:n,selectors:[["app-ar-view"]],viewQuery:function(t,i){if(t&1&&Xo(P2,7)(O2,7),t&2){let r;Yo(r=Zo())&&(i.canvasRef=r.first),Yo(r=Zo())&&(i.overlayRef=r.first)}},decls:9,vars:10,consts:[["arCanvas",""],["arOverlay",""],[1,"ar-container"],["class","no-ar-bg",4,"ngIf"],[1,"ar-canvas"],[1,"ar-overlay"],[3,"startAR","openMap","openCollection","openLearn","collected","total","nearbyCount","gpsActive","showARPrompt","arActive","fossilDirections"],["class","overlay-backdrop",3,"click",4,"ngIf"],["class","gps-error-toast",4,"ngIf"],[1,"no-ar-bg"],[1,"no-ar-content"],[1,"logo"],[1,"status-row"],[1,"fossil-count"],[1,"start-ar-btn",3,"click","disabled"],["class","hint",4,"ngIf"],["class","hint error",4,"ngIf"],[1,"hint"],[1,"hint","error"],[1,"overlay-backdrop",3,"click"],[1,"overlay-center",3,"click"],[3,"close","collect","fossil"],[1,"gps-error-toast"]],template:function(t,i){t&1&&(nt(0,"div",2),Vi(1,k2,15,10,"div",3),Un(2,"canvas",4,0),nt(4,"div",5,1)(6,"app-hud",6),jn("startAR",function(){return i.onStartAR()})("openMap",function(){return i.showMap=!0})("openCollection",function(){return i.showCollection=!0})("openLearn",function(){return i.showLearn=!0}),mt(),Vi(7,U2,3,1,"div",7)(8,B2,2,1,"div",8),mt()()),t&2&&(Ge(),Zt("ngIf",!i.arService.active()),Ge(5),Zt("collected",i.collectedIds.size)("total",i.fossilTemplates.length)("nearbyCount",i.gps.nearbyFossils().length)("gpsActive",!!i.gps.playerPosition())("showARPrompt",!i.arService.active()&&i.arService.supported())("arActive",i.arService.active())("fossilDirections",i.fossilDirections()),Ge(),Zt("ngIf",i.selectedFossil()),Ge(),Zt("ngIf",i.gps.error()))},dependencies:[qr,Ic,fp,hp],styles:[".ar-container[_ngcontent-%COMP%]{position:fixed;inset:0;background:#1a0f00}.ar-canvas[_ngcontent-%COMP%]{position:fixed;inset:0;width:100%;height:100%;display:block}.ar-overlay[_ngcontent-%COMP%]{position:fixed;inset:0;pointer-events:none}.no-ar-bg[_ngcontent-%COMP%]{position:fixed;inset:0;z-index:10;background:radial-gradient(ellipse at center,#3d2a00,#1a0f00 70%);display:flex;align-items:center;justify-content:center}.no-ar-content[_ngcontent-%COMP%]{text-align:center;color:#f5e6c8;padding:24px}.logo[_ngcontent-%COMP%]{font-size:64px;margin-bottom:12px}h1[_ngcontent-%COMP%]{font-size:28px;font-weight:800;letter-spacing:1px;margin-bottom:8px;color:gold}.status-row[_ngcontent-%COMP%]{margin-bottom:12px}.status-row[_ngcontent-%COMP%]   .ok[_ngcontent-%COMP%]{color:#4ade80;font-weight:600}.status-row[_ngcontent-%COMP%]   .waiting[_ngcontent-%COMP%]{color:#facc15;font-weight:600}.fossil-count[_ngcontent-%COMP%]{display:inline-block;background:#8b69144d;border:1px solid #8B6914;border-radius:20px;padding:6px 16px;font-size:13px;color:#f5e6c8;margin-bottom:24px}.start-ar-btn[_ngcontent-%COMP%]{display:block;width:200px;margin:0 auto 16px;padding:14px;background:linear-gradient(135deg,#8b6914,#c8a020);border:none;border-radius:12px;color:#fff;font-size:18px;font-weight:700;cursor:pointer;box-shadow:0 4px 20px #8b691480}.start-ar-btn[_ngcontent-%COMP%]:active{transform:scale(.96)}.start-ar-btn[_ngcontent-%COMP%]:disabled{opacity:.6;cursor:not-allowed;transform:none}.hint[_ngcontent-%COMP%]{font-size:12px;color:#facc15;margin-top:8px;padding:0 20px}.hint.error[_ngcontent-%COMP%]{color:#f87171;background:#c8000033;border-radius:8px;padding:8px 16px}.overlay-backdrop[_ngcontent-%COMP%]{position:fixed;inset:0;background:#0009;display:flex;align-items:center;justify-content:center;z-index:100;pointer-events:all}.gps-error-toast[_ngcontent-%COMP%]{position:fixed;top:80px;left:50%;transform:translate(-50%);background:#c85000e6;color:#fff;padding:8px 16px;border-radius:20px;font-size:12px;pointer-events:none}"]})};var mw=[{path:"",component:vp},{path:"**",redirectTo:""}];var __="Service workers are disabled or not supported by this browser",Ha=class{serviceWorker;worker;registration;events;constructor(e,t){if(this.serviceWorker=e,!e)this.worker=this.events=this.registration=new Qe(i=>i.error(new ge(5601,!1)));else{let i=null,r=new Ht;this.worker=new Qe(l=>(i!==null&&l.next(i),r.subscribe(u=>l.next(u))));let s=()=>{let{controller:l}=e;l!==null&&(i=l,r.next(i))};e.addEventListener("controllerchange",s),s(),this.registration=this.worker.pipe(gn(()=>e.getRegistration().then(l=>{if(!l)throw new ge(5601,!1);return l})));let o=new Ht;this.events=o.asObservable();let a=l=>{let{data:u}=l;u?.type&&o.next(u)};e.addEventListener("message",a),t?.get(hr,null,{optional:!0})?.onDestroy(()=>{e.removeEventListener("controllerchange",s),e.removeEventListener("message",a)})}}postMessage(e,t){return new Promise(i=>{this.worker.pipe(Cn(1)).subscribe(r=>{r.postMessage(ae({action:e},t)),i()})})}postMessageWithOperation(e,t,i){let r=this.waitForOperationCompleted(i),s=this.postMessage(e,t);return Promise.all([s,r]).then(([,o])=>o)}generateNonce(){return Math.round(Math.random()*1e7)}eventsOfType(e){let t;return typeof e=="string"?t=i=>i.type===e:t=i=>e.includes(i.type),this.events.pipe(ti(t))}nextEventOfType(e){return this.eventsOfType(e).pipe(Cn(1))}waitForOperationCompleted(e){return new Promise((t,i)=>{this.eventsOfType("OPERATION_COMPLETED").pipe(ti(r=>r.nonce===e),Cn(1),_t(r=>{if(r.result!==void 0)return r.result;throw new Error(r.error)})).subscribe({next:t,error:i})})}get isEnabled(){return!!this.serviceWorker}},j2=(()=>{class n{sw;messages;notificationClicks;notificationCloses;pushSubscriptionChanges;subscription;get isEnabled(){return this.sw.isEnabled}pushManager=null;subscriptionChanges=new Ht;constructor(t){if(this.sw=t,!t.isEnabled){this.messages=tr,this.notificationClicks=tr,this.notificationCloses=tr,this.pushSubscriptionChanges=tr,this.subscription=tr;return}this.messages=this.sw.eventsOfType("PUSH").pipe(_t(r=>r.data)),this.notificationClicks=this.sw.eventsOfType("NOTIFICATION_CLICK").pipe(_t(r=>r.data)),this.notificationCloses=this.sw.eventsOfType("NOTIFICATION_CLOSE").pipe(_t(r=>r.data)),this.pushSubscriptionChanges=this.sw.eventsOfType("PUSH_SUBSCRIPTION_CHANGE").pipe(_t(r=>r.data)),this.pushManager=this.sw.registration.pipe(_t(r=>r.pushManager));let i=this.pushManager.pipe(gn(r=>r.getSubscription()));this.subscription=new Qe(r=>{let s=i.subscribe(r),o=this.subscriptionChanges.subscribe(r);return()=>{s.unsubscribe(),o.unsubscribe()}})}requestSubscription(t){if(!this.sw.isEnabled||this.pushManager===null)return Promise.reject(new Error(__));let i={userVisibleOnly:!0},r=this.decodeBase64(t.serverPublicKey.replace(/_/g,"/").replace(/-/g,"+")),s=new Uint8Array(new ArrayBuffer(r.length));for(let o=0;o<r.length;o++)s[o]=r.charCodeAt(o);return i.applicationServerKey=s,new Promise((o,a)=>{this.pushManager.pipe(gn(c=>c.subscribe(i)),Cn(1)).subscribe({next:c=>{this.subscriptionChanges.next(c),o(c)},error:a})})}unsubscribe(){if(!this.sw.isEnabled)return Promise.reject(new Error(__));let t=i=>{if(i===null)throw new ge(5602,!1);return i.unsubscribe().then(r=>{if(!r)throw new ge(5603,!1);this.subscriptionChanges.next(null)})};return new Promise((i,r)=>{this.subscription.pipe(Cn(1),gn(t)).subscribe({next:i,error:r})})}decodeBase64(t){return atob(t)}static \u0275fac=function(i){return new(i||n)(Re(Ha))};static \u0275prov=Ce({token:n,factory:n.\u0275fac})}return n})(),W2=(()=>{class n{sw;versionUpdates;unrecoverable;get isEnabled(){return this.sw.isEnabled}ongoingCheckForUpdate=null;constructor(t){if(this.sw=t,!t.isEnabled){this.versionUpdates=tr,this.unrecoverable=tr;return}this.versionUpdates=this.sw.eventsOfType(["VERSION_DETECTED","VERSION_INSTALLATION_FAILED","VERSION_READY","NO_NEW_VERSION_DETECTED"]),this.unrecoverable=this.sw.eventsOfType("UNRECOVERABLE_STATE")}checkForUpdate(){if(!this.sw.isEnabled)return Promise.reject(new Error(__));if(this.ongoingCheckForUpdate)return this.ongoingCheckForUpdate;let t=this.sw.generateNonce();return this.ongoingCheckForUpdate=this.sw.postMessageWithOperation("CHECK_FOR_UPDATES",{nonce:t},t).finally(()=>{this.ongoingCheckForUpdate=null}),this.ongoingCheckForUpdate}activateUpdate(){if(!this.sw.isEnabled)return Promise.reject(new ge(5601,!1));let t=this.sw.generateNonce();return this.sw.postMessageWithOperation("ACTIVATE_UPDATE",{nonce:t},t)}static \u0275fac=function(i){return new(i||n)(Re(Ha))};static \u0275prov=Ce({token:n,factory:n.\u0275fac})}return n})(),vw=new Ie("");function $2(){let n=Q(Ll);if(!("serviceWorker"in navigator&&n.enabled!==!1))return;let e=Q(vw),t=Q(Ot),i=Q(hr);t.runOutsideAngular(()=>{let r=navigator.serviceWorker,s=()=>r.controller?.postMessage({action:"INITIALIZE"});r.addEventListener("controllerchange",s),i.onDestroy(()=>{r.removeEventListener("controllerchange",s)})}),t.runOutsideAngular(()=>{let r,{registrationStrategy:s}=n;if(typeof s=="function")r=new Promise(o=>s().subscribe(()=>o()));else{let[o,...a]=(s||"registerWhenStable:30000").split(":");switch(o){case"registerImmediately":r=Promise.resolve();break;case"registerWithDelay":r=gw(+a[0]||0);break;case"registerWhenStable":r=Promise.race([i.whenStable(),gw(+a[0])]);break;default:throw new ge(5600,!1)}}r.then(()=>{i.destroyed||navigator.serviceWorker.register(e,{scope:n.scope,updateViaCache:n.updateViaCache,type:n.type}).catch(o=>console.error(Fr(5604,!1)))})})}function gw(n){return new Promise(e=>setTimeout(e,n))}function q2(){let n=Q(Ll),e=Q(Fn),t=!0;return new Ha(t&&n.enabled!==!1?navigator.serviceWorker:void 0,e)}var Ll=class{enabled;updateViaCache;type;scope;registrationStrategy};function yw(n,e={}){return sr([j2,W2,{provide:vw,useValue:n},{provide:Ll,useValue:e},{provide:Ha,useFactory:q2},Sd($2)])}var _w={providers:[Gm(),Yv(mw),yw("ngsw-worker.js",{enabled:!gb(),registrationStrategy:"registerWhenStable:30000"})]};var yp=class n{static \u0275fac=function(t){return new(t||n)};static \u0275cmp=wi({type:n,selectors:[["app-root"]],decls:1,vars:0,template:function(t,i){t&1&&Un(0,"router-outlet")},dependencies:[Zc],encapsulation:2})};bv(yp,_w).catch(n=>console.error(n));
