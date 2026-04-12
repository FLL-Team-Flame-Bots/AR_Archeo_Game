var ww=Object.defineProperty,Cw=Object.defineProperties;var Tw=Object.getOwnPropertyDescriptors;var T_=Object.getOwnPropertySymbols;var Dw=Object.prototype.hasOwnProperty,Iw=Object.prototype.propertyIsEnumerable;var D_=(n,e,t)=>e in n?ww(n,e,{enumerable:!0,configurable:!0,writable:!0,value:t}):n[e]=t,ae=(n,e)=>{for(var t in e||={})Dw.call(e,t)&&D_(n,t,e[t]);if(T_)for(var t of T_(e))Iw.call(e,t)&&D_(n,t,e[t]);return n},rt=(n,e)=>Cw(n,Tw(e));var pn=null,Pl=!1,xp=1,Aw=null,bn=Symbol("SIGNAL");function Be(n){let e=pn;return pn=n,e}function kl(){return pn}var vs={version:0,lastCleanEpoch:0,dirty:!1,producers:void 0,producersTail:void 0,consumers:void 0,consumersTail:void 0,recomputing:!1,consumerAllowSignalWrites:!1,consumerIsAlwaysLive:!1,kind:"unknown",producerMustRecompute:()=>!1,producerRecomputeValue:()=>{},consumerMarkedDirty:()=>{},consumerOnSignalRead:()=>{}};function mo(n){if(Pl)throw new Error("");if(pn===null)return;pn.consumerOnSignalRead(n);let e=pn.producersTail;if(e!==void 0&&e.producer===n)return;let t,i=pn.recomputing;if(i&&(t=e!==void 0?e.nextProducer:pn.producers,t!==void 0&&t.producer===n)){pn.producersTail=t,t.lastReadVersion=n.version;return}let r=n.consumersTail;if(r!==void 0&&r.consumer===pn&&(!i||Nw(r,pn)))return;let s=vo(pn),o={producer:n,consumer:pn,nextProducer:t,prevConsumer:r,lastReadVersion:n.version,nextConsumer:void 0};pn.producersTail=o,e!==void 0?e.nextProducer=o:pn.producers=o,s&&N_(n,o)}function I_(){xp++}function Ul(n){if(!(vo(n)&&!n.dirty)&&!(!n.dirty&&n.lastCleanEpoch===xp)){if(!n.producerMustRecompute(n)&&!Ua(n)){Fl(n);return}n.producerRecomputeValue(n),Fl(n)}}function Mp(n){if(n.consumers===void 0)return;let e=Pl;Pl=!0;try{for(let t=n.consumers;t!==void 0;t=t.nextConsumer){let i=t.consumer;i.dirty||Rw(i)}}finally{Pl=e}}function Sp(){return pn?.consumerAllowSignalWrites!==!1}function Rw(n){n.dirty=!0,Mp(n),n.consumerMarkedDirty?.(n)}function Fl(n){n.dirty=!1,n.lastCleanEpoch=xp}function ys(n){return n&&A_(n),Be(n)}function A_(n){n.producersTail=void 0,n.recomputing=!0}function go(n,e){Be(e),n&&R_(n)}function R_(n){n.recomputing=!1;let e=n.producersTail,t=e!==void 0?e.nextProducer:n.producers;if(t!==void 0){if(vo(n))do t=bp(t);while(t!==void 0);e!==void 0?e.nextProducer=void 0:n.producers=void 0}}function Ua(n){for(let e=n.producers;e!==void 0;e=e.nextProducer){let t=e.producer,i=e.lastReadVersion;if(i!==t.version||(Ul(t),i!==t.version))return!0}return!1}function _s(n){if(vo(n)){let e=n.producers;for(;e!==void 0;)e=bp(e)}n.producers=void 0,n.producersTail=void 0,n.consumers=void 0,n.consumersTail=void 0}function N_(n,e){let t=n.consumersTail,i=vo(n);if(t!==void 0?(e.nextConsumer=t.nextConsumer,t.nextConsumer=e):(e.nextConsumer=void 0,n.consumers=e),e.prevConsumer=t,n.consumersTail=e,!i)for(let r=n.producers;r!==void 0;r=r.nextProducer)N_(r.producer,r)}function bp(n){let e=n.producer,t=n.nextProducer,i=n.nextConsumer,r=n.prevConsumer;if(n.nextConsumer=void 0,n.prevConsumer=void 0,i!==void 0?i.prevConsumer=r:e.consumersTail=r,r!==void 0)r.nextConsumer=i;else if(e.consumers=i,!vo(e)){let s=e.producers;for(;s!==void 0;)s=bp(s)}return t}function vo(n){return n.consumerIsAlwaysLive||n.consumers!==void 0}function Bl(n){Aw?.(n)}function Nw(n,e){let t=e.producersTail;if(t!==void 0){let i=e.producers;do{if(i===n)return!0;if(i===t)break;i=i.nextProducer}while(i!==void 0)}return!1}function Vl(n,e){return Object.is(n,e)}function Hl(n,e){let t=Object.create(Pw);t.computation=n,e!==void 0&&(t.equal=e);let i=()=>{if(Ul(t),mo(t),t.value===ka)throw t.error;return t.value};return i[bn]=t,Bl(t),i}var Ol=Symbol("UNSET"),Ll=Symbol("COMPUTING"),ka=Symbol("ERRORED"),Pw=rt(ae({},vs),{value:Ol,dirty:!0,error:null,equal:Vl,kind:"computed",producerMustRecompute(n){return n.value===Ol||n.value===Ll},producerRecomputeValue(n){if(n.value===Ll)throw new Error("");let e=n.value;n.value=Ll;let t=ys(n),i,r=!1;try{i=n.computation(),Be(null),r=e!==Ol&&e!==ka&&i!==ka&&n.equal(e,i)}catch(s){i=ka,n.error=s}finally{go(n,t)}if(r){n.value=e;return}n.value=i,n.version++}});function Ow(){throw new Error}var P_=Ow;function O_(n){P_(n)}function Ep(n){P_=n}var Lw=null;function wp(n,e){let t=Object.create(zl);t.value=n,e!==void 0&&(t.equal=e);let i=()=>L_(t);return i[bn]=t,Bl(t),[i,o=>yo(t,o),o=>Cp(t,o)]}function L_(n){return mo(n),n.value}function yo(n,e){Sp()||O_(n),n.equal(n.value,e)||(n.value=e,Fw(n))}function Cp(n,e){Sp()||O_(n),yo(n,e(n.value))}var zl=rt(ae({},vs),{equal:Vl,value:void 0,kind:"signal"});function Fw(n){n.version++,I_(),Mp(n),Lw?.(n)}var Tp=rt(ae({},vs),{consumerIsAlwaysLive:!0,consumerAllowSignalWrites:!0,dirty:!0,kind:"effect"});function Dp(n){if(n.dirty=!1,n.version>0&&!Ua(n))return;n.version++;let e=ys(n);try{n.cleanup(),n.fn()}finally{go(n,e)}}function He(n){return typeof n=="function"}function _o(n){let t=n(i=>{Error.call(i),i.stack=new Error().stack});return t.prototype=Object.create(Error.prototype),t.prototype.constructor=t,t}var Gl=_o(n=>function(t){n(this),this.message=t?`${t.length} errors occurred during unsubscription:
${t.map((i,r)=>`${r+1}) ${i.toString()}`).join(`
  `)}`:"",this.name="UnsubscriptionError",this.errors=t});function Ba(n,e){if(n){let t=n.indexOf(e);0<=t&&n.splice(t,1)}}var cn=class n{constructor(e){this.initialTeardown=e,this.closed=!1,this._parentage=null,this._finalizers=null}unsubscribe(){let e;if(!this.closed){this.closed=!0;let{_parentage:t}=this;if(t)if(this._parentage=null,Array.isArray(t))for(let s of t)s.remove(this);else t.remove(this);let{initialTeardown:i}=this;if(He(i))try{i()}catch(s){e=s instanceof Gl?s.errors:[s]}let{_finalizers:r}=this;if(r){this._finalizers=null;for(let s of r)try{F_(s)}catch(o){e=e??[],o instanceof Gl?e=[...e,...o.errors]:e.push(o)}}if(e)throw new Gl(e)}}add(e){var t;if(e&&e!==this)if(this.closed)F_(e);else{if(e instanceof n){if(e.closed||e._hasParent(this))return;e._addParent(this)}(this._finalizers=(t=this._finalizers)!==null&&t!==void 0?t:[]).push(e)}}_hasParent(e){let{_parentage:t}=this;return t===e||Array.isArray(t)&&t.includes(e)}_addParent(e){let{_parentage:t}=this;this._parentage=Array.isArray(t)?(t.push(e),t):t?[t,e]:e}_removeParent(e){let{_parentage:t}=this;t===e?this._parentage=null:Array.isArray(t)&&Ba(t,e)}remove(e){let{_finalizers:t}=this;t&&Ba(t,e),e instanceof n&&e._removeParent(this)}};cn.EMPTY=(()=>{let n=new cn;return n.closed=!0,n})();var Ip=cn.EMPTY;function jl(n){return n instanceof cn||n&&"closed"in n&&He(n.remove)&&He(n.add)&&He(n.unsubscribe)}function F_(n){He(n)?n():n.unsubscribe()}var mi={onUnhandledError:null,onStoppedNotification:null,Promise:void 0,useDeprecatedSynchronousErrorHandling:!1,useDeprecatedNextContext:!1};var xo={setTimeout(n,e,...t){let{delegate:i}=xo;return i?.setTimeout?i.setTimeout(n,e,...t):setTimeout(n,e,...t)},clearTimeout(n){let{delegate:e}=xo;return(e?.clearTimeout||clearTimeout)(n)},delegate:void 0};function Wl(n){xo.setTimeout(()=>{let{onUnhandledError:e}=mi;if(e)e(n);else throw n})}function xs(){}var k_=Ap("C",void 0,void 0);function U_(n){return Ap("E",void 0,n)}function B_(n){return Ap("N",n,void 0)}function Ap(n,e,t){return{kind:n,value:e,error:t}}var Ms=null;function Mo(n){if(mi.useDeprecatedSynchronousErrorHandling){let e=!Ms;if(e&&(Ms={errorThrown:!1,error:null}),n(),e){let{errorThrown:t,error:i}=Ms;if(Ms=null,t)throw i}}else n()}function V_(n){mi.useDeprecatedSynchronousErrorHandling&&Ms&&(Ms.errorThrown=!0,Ms.error=n)}var Ss=class extends cn{constructor(e){super(),this.isStopped=!1,e?(this.destination=e,jl(e)&&e.add(this)):this.destination=Bw}static create(e,t,i){return new So(e,t,i)}next(e){this.isStopped?Np(B_(e),this):this._next(e)}error(e){this.isStopped?Np(U_(e),this):(this.isStopped=!0,this._error(e))}complete(){this.isStopped?Np(k_,this):(this.isStopped=!0,this._complete())}unsubscribe(){this.closed||(this.isStopped=!0,super.unsubscribe(),this.destination=null)}_next(e){this.destination.next(e)}_error(e){try{this.destination.error(e)}finally{this.unsubscribe()}}_complete(){try{this.destination.complete()}finally{this.unsubscribe()}}},kw=Function.prototype.bind;function Rp(n,e){return kw.call(n,e)}var Pp=class{constructor(e){this.partialObserver=e}next(e){let{partialObserver:t}=this;if(t.next)try{t.next(e)}catch(i){$l(i)}}error(e){let{partialObserver:t}=this;if(t.error)try{t.error(e)}catch(i){$l(i)}else $l(e)}complete(){let{partialObserver:e}=this;if(e.complete)try{e.complete()}catch(t){$l(t)}}},So=class extends Ss{constructor(e,t,i){super();let r;if(He(e)||!e)r={next:e??void 0,error:t??void 0,complete:i??void 0};else{let s;this&&mi.useDeprecatedNextContext?(s=Object.create(e),s.unsubscribe=()=>this.unsubscribe(),r={next:e.next&&Rp(e.next,s),error:e.error&&Rp(e.error,s),complete:e.complete&&Rp(e.complete,s)}):r=e}this.destination=new Pp(r)}};function $l(n){mi.useDeprecatedSynchronousErrorHandling?V_(n):Wl(n)}function Uw(n){throw n}function Np(n,e){let{onStoppedNotification:t}=mi;t&&xo.setTimeout(()=>t(n,e))}var Bw={closed:!0,next:xs,error:Uw,complete:xs};var bo=typeof Symbol=="function"&&Symbol.observable||"@@observable";function gi(n){return n}function Op(...n){return Lp(n)}function Lp(n){return n.length===0?gi:n.length===1?n[0]:function(t){return n.reduce((i,r)=>r(i),t)}}var Ke=(()=>{class n{constructor(t){t&&(this._subscribe=t)}lift(t){let i=new n;return i.source=this,i.operator=t,i}subscribe(t,i,r){let s=Hw(t)?t:new So(t,i,r);return Mo(()=>{let{operator:o,source:a}=this;s.add(o?o.call(s,a):a?this._subscribe(s):this._trySubscribe(s))}),s}_trySubscribe(t){try{return this._subscribe(t)}catch(i){t.error(i)}}forEach(t,i){return i=H_(i),new i((r,s)=>{let o=new So({next:a=>{try{t(a)}catch(c){s(c),o.unsubscribe()}},error:s,complete:r});this.subscribe(o)})}_subscribe(t){var i;return(i=this.source)===null||i===void 0?void 0:i.subscribe(t)}[bo](){return this}pipe(...t){return Lp(t)(this)}toPromise(t){return t=H_(t),new t((i,r)=>{let s;this.subscribe(o=>s=o,o=>r(o),()=>i(s))})}}return n.create=e=>new n(e),n})();function H_(n){var e;return(e=n??mi.Promise)!==null&&e!==void 0?e:Promise}function Vw(n){return n&&He(n.next)&&He(n.error)&&He(n.complete)}function Hw(n){return n&&n instanceof Ss||Vw(n)&&jl(n)}function zw(n){return He(n?.lift)}function ht(n){return e=>{if(zw(e))return e.lift(function(t){try{return n(t,this)}catch(i){this.error(i)}});throw new TypeError("Unable to lift unknown Observable type")}}function St(n,e,t,i,r){return new Fp(n,e,t,i,r)}var Fp=class extends Ss{constructor(e,t,i,r,s,o){super(e),this.onFinalize=s,this.shouldUnsubscribe=o,this._next=t?function(a){try{t(a)}catch(c){e.error(c)}}:super._next,this._error=r?function(a){try{r(a)}catch(c){e.error(c)}finally{this.unsubscribe()}}:super._error,this._complete=i?function(){try{i()}catch(a){e.error(a)}finally{this.unsubscribe()}}:super._complete}unsubscribe(){var e;if(!this.shouldUnsubscribe||this.shouldUnsubscribe()){let{closed:t}=this;super.unsubscribe(),!t&&((e=this.onFinalize)===null||e===void 0||e.call(this))}}};var z_=_o(n=>function(){n(this),this.name="ObjectUnsubscribedError",this.message="object unsubscribed"});var Ut=(()=>{class n extends Ke{constructor(){super(),this.closed=!1,this.currentObservers=null,this.observers=[],this.isStopped=!1,this.hasError=!1,this.thrownError=null}lift(t){let i=new ql(this,this);return i.operator=t,i}_throwIfClosed(){if(this.closed)throw new z_}next(t){Mo(()=>{if(this._throwIfClosed(),!this.isStopped){this.currentObservers||(this.currentObservers=Array.from(this.observers));for(let i of this.currentObservers)i.next(t)}})}error(t){Mo(()=>{if(this._throwIfClosed(),!this.isStopped){this.hasError=this.isStopped=!0,this.thrownError=t;let{observers:i}=this;for(;i.length;)i.shift().error(t)}})}complete(){Mo(()=>{if(this._throwIfClosed(),!this.isStopped){this.isStopped=!0;let{observers:t}=this;for(;t.length;)t.shift().complete()}})}unsubscribe(){this.isStopped=this.closed=!0,this.observers=this.currentObservers=null}get observed(){var t;return((t=this.observers)===null||t===void 0?void 0:t.length)>0}_trySubscribe(t){return this._throwIfClosed(),super._trySubscribe(t)}_subscribe(t){return this._throwIfClosed(),this._checkFinalizedStatuses(t),this._innerSubscribe(t)}_innerSubscribe(t){let{hasError:i,isStopped:r,observers:s}=this;return i||r?Ip:(this.currentObservers=null,s.push(t),new cn(()=>{this.currentObservers=null,Ba(s,t)}))}_checkFinalizedStatuses(t){let{hasError:i,thrownError:r,isStopped:s}=this;i?t.error(r):s&&t.complete()}asObservable(){let t=new Ke;return t.source=this,t}}return n.create=(e,t)=>new ql(e,t),n})(),ql=class extends Ut{constructor(e,t){super(),this.destination=e,this.source=t}next(e){var t,i;(i=(t=this.destination)===null||t===void 0?void 0:t.next)===null||i===void 0||i.call(t,e)}error(e){var t,i;(i=(t=this.destination)===null||t===void 0?void 0:t.error)===null||i===void 0||i.call(t,e)}complete(){var e,t;(t=(e=this.destination)===null||e===void 0?void 0:e.complete)===null||t===void 0||t.call(e)}_subscribe(e){var t,i;return(i=(t=this.source)===null||t===void 0?void 0:t.subscribe(e))!==null&&i!==void 0?i:Ip}};var ln=class extends Ut{constructor(e){super(),this._value=e}get value(){return this.getValue()}_subscribe(e){let t=super._subscribe(e);return!t.closed&&e.next(this._value),t}getValue(){let{hasError:e,thrownError:t,_value:i}=this;if(e)throw t;return this._throwIfClosed(),i}next(e){super.next(this._value=e)}};var un=new Ke(n=>n.complete());function G_(n){return n&&He(n.schedule)}function j_(n){return n[n.length-1]}function W_(n){return He(j_(n))?n.pop():void 0}function Nr(n){return G_(j_(n))?n.pop():void 0}function q_(n,e,t,i){function r(s){return s instanceof t?s:new t(function(o){o(s)})}return new(t||(t=Promise))(function(s,o){function a(u){try{l(i.next(u))}catch(d){o(d)}}function c(u){try{l(i.throw(u))}catch(d){o(d)}}function l(u){u.done?s(u.value):r(u.value).then(a,c)}l((i=i.apply(n,e||[])).next())})}function $_(n){var e=typeof Symbol=="function"&&Symbol.iterator,t=e&&n[e],i=0;if(t)return t.call(n);if(n&&typeof n.length=="number")return{next:function(){return n&&i>=n.length&&(n=void 0),{value:n&&n[i++],done:!n}}};throw new TypeError(e?"Object is not iterable.":"Symbol.iterator is not defined.")}function bs(n){return this instanceof bs?(this.v=n,this):new bs(n)}function X_(n,e,t){if(!Symbol.asyncIterator)throw new TypeError("Symbol.asyncIterator is not defined.");var i=t.apply(n,e||[]),r,s=[];return r=Object.create((typeof AsyncIterator=="function"?AsyncIterator:Object).prototype),a("next"),a("throw"),a("return",o),r[Symbol.asyncIterator]=function(){return this},r;function o(h){return function(g){return Promise.resolve(g).then(h,d)}}function a(h,g){i[h]&&(r[h]=function(_){return new Promise(function(m,p){s.push([h,_,m,p])>1||c(h,_)})},g&&(r[h]=g(r[h])))}function c(h,g){try{l(i[h](g))}catch(_){f(s[0][3],_)}}function l(h){h.value instanceof bs?Promise.resolve(h.value.v).then(u,d):f(s[0][2],h)}function u(h){c("next",h)}function d(h){c("throw",h)}function f(h,g){h(g),s.shift(),s.length&&c(s[0][0],s[0][1])}}function Y_(n){if(!Symbol.asyncIterator)throw new TypeError("Symbol.asyncIterator is not defined.");var e=n[Symbol.asyncIterator],t;return e?e.call(n):(n=typeof $_=="function"?$_(n):n[Symbol.iterator](),t={},i("next"),i("throw"),i("return"),t[Symbol.asyncIterator]=function(){return this},t);function i(s){t[s]=n[s]&&function(o){return new Promise(function(a,c){o=n[s](o),r(a,c,o.done,o.value)})}}function r(s,o,a,c){Promise.resolve(c).then(function(l){s({value:l,done:a})},o)}}var Xl=n=>n&&typeof n.length=="number"&&typeof n!="function";function Yl(n){return He(n?.then)}function Zl(n){return He(n[bo])}function Jl(n){return Symbol.asyncIterator&&He(n?.[Symbol.asyncIterator])}function Kl(n){return new TypeError(`You provided ${n!==null&&typeof n=="object"?"an invalid object":`'${n}'`} where a stream was expected. You can provide an Observable, Promise, ReadableStream, Array, AsyncIterable, or Iterable.`)}function Gw(){return typeof Symbol!="function"||!Symbol.iterator?"@@iterator":Symbol.iterator}var Ql=Gw();function eu(n){return He(n?.[Ql])}function tu(n){return X_(this,arguments,function*(){let t=n.getReader();try{for(;;){let{value:i,done:r}=yield bs(t.read());if(r)return yield bs(void 0);yield yield bs(i)}}finally{t.releaseLock()}})}function nu(n){return He(n?.getReader)}function Kt(n){if(n instanceof Ke)return n;if(n!=null){if(Zl(n))return jw(n);if(Xl(n))return Ww(n);if(Yl(n))return $w(n);if(Jl(n))return Z_(n);if(eu(n))return qw(n);if(nu(n))return Xw(n)}throw Kl(n)}function jw(n){return new Ke(e=>{let t=n[bo]();if(He(t.subscribe))return t.subscribe(e);throw new TypeError("Provided object does not correctly implement Symbol.observable")})}function Ww(n){return new Ke(e=>{for(let t=0;t<n.length&&!e.closed;t++)e.next(n[t]);e.complete()})}function $w(n){return new Ke(e=>{n.then(t=>{e.closed||(e.next(t),e.complete())},t=>e.error(t)).then(null,Wl)})}function qw(n){return new Ke(e=>{for(let t of n)if(e.next(t),e.closed)return;e.complete()})}function Z_(n){return new Ke(e=>{Yw(n,e).catch(t=>e.error(t))})}function Xw(n){return Z_(tu(n))}function Yw(n,e){var t,i,r,s;return q_(this,void 0,void 0,function*(){try{for(t=Y_(n);i=yield t.next(),!i.done;){let o=i.value;if(e.next(o),e.closed)return}}catch(o){r={error:o}}finally{try{i&&!i.done&&(s=t.return)&&(yield s.call(t))}finally{if(r)throw r.error}}e.complete()})}function Pn(n,e,t,i=0,r=!1){let s=e.schedule(function(){t(),r?n.add(this.schedule(null,i)):this.unsubscribe()},i);if(n.add(s),!r)return s}function iu(n,e=0){return ht((t,i)=>{t.subscribe(St(i,r=>Pn(i,n,()=>i.next(r),e),()=>Pn(i,n,()=>i.complete(),e),r=>Pn(i,n,()=>i.error(r),e)))})}function ru(n,e=0){return ht((t,i)=>{i.add(n.schedule(()=>t.subscribe(i),e))})}function J_(n,e){return Kt(n).pipe(ru(e),iu(e))}function K_(n,e){return Kt(n).pipe(ru(e),iu(e))}function Q_(n,e){return new Ke(t=>{let i=0;return e.schedule(function(){i===n.length?t.complete():(t.next(n[i++]),t.closed||this.schedule())})})}function e0(n,e){return new Ke(t=>{let i;return Pn(t,e,()=>{i=n[Ql](),Pn(t,e,()=>{let r,s;try{({value:r,done:s}=i.next())}catch(o){t.error(o);return}s?t.complete():t.next(r)},0,!0)}),()=>He(i?.return)&&i.return()})}function su(n,e){if(!n)throw new Error("Iterable cannot be null");return new Ke(t=>{Pn(t,e,()=>{let i=n[Symbol.asyncIterator]();Pn(t,e,()=>{i.next().then(r=>{r.done?t.complete():t.next(r.value)})},0,!0)})})}function t0(n,e){return su(tu(n),e)}function n0(n,e){if(n!=null){if(Zl(n))return J_(n,e);if(Xl(n))return Q_(n,e);if(Yl(n))return K_(n,e);if(Jl(n))return su(n,e);if(eu(n))return e0(n,e);if(nu(n))return t0(n,e)}throw Kl(n)}function Gt(n,e){return e?n0(n,e):Kt(n)}function et(...n){let e=Nr(n);return Gt(n,e)}function kp(n,e){let t=He(n)?n:()=>n,i=r=>r.error(t());return new Ke(e?r=>e.schedule(i,0,r):i)}function ou(n){return!!n&&(n instanceof Ke||He(n.lift)&&He(n.subscribe))}var Es=_o(n=>function(){n(this),this.name="EmptyError",this.message="no elements in sequence"});function _t(n,e){return ht((t,i)=>{let r=0;t.subscribe(St(i,s=>{i.next(n.call(e,s,r++))}))})}var{isArray:Zw}=Array;function Jw(n,e){return Zw(e)?n(...e):n(e)}function i0(n){return _t(e=>Jw(n,e))}var{isArray:Kw}=Array,{getPrototypeOf:Qw,prototype:eC,keys:tC}=Object;function r0(n){if(n.length===1){let e=n[0];if(Kw(e))return{args:e,keys:null};if(nC(e)){let t=tC(e);return{args:t.map(i=>e[i]),keys:t}}}return{args:n,keys:null}}function nC(n){return n&&typeof n=="object"&&Qw(n)===eC}function s0(n,e){return n.reduce((t,i,r)=>(t[i]=e[r],t),{})}function Up(...n){let e=Nr(n),t=W_(n),{args:i,keys:r}=r0(n);if(i.length===0)return Gt([],e);let s=new Ke(iC(i,e,r?o=>s0(r,o):gi));return t?s.pipe(i0(t)):s}function iC(n,e,t=gi){return i=>{o0(e,()=>{let{length:r}=n,s=new Array(r),o=r,a=r;for(let c=0;c<r;c++)o0(e,()=>{let l=Gt(n[c],e),u=!1;l.subscribe(St(i,d=>{s[c]=d,u||(u=!0,a--),a||i.next(t(s.slice()))},()=>{--o||i.complete()}))},i)},i)}}function o0(n,e,t){n?Pn(t,n,e):e()}function a0(n,e,t,i,r,s,o,a){let c=[],l=0,u=0,d=!1,f=()=>{d&&!c.length&&!l&&e.complete()},h=_=>l<i?g(_):c.push(_),g=_=>{s&&e.next(_),l++;let m=!1;Kt(t(_,u++)).subscribe(St(e,p=>{r?.(p),s?h(p):e.next(p)},()=>{m=!0},void 0,()=>{if(m)try{for(l--;c.length&&l<i;){let p=c.shift();o?Pn(e,o,()=>g(p)):g(p)}f()}catch(p){e.error(p)}}))};return n.subscribe(St(e,h,()=>{d=!0,f()})),()=>{a?.()}}function En(n,e,t=1/0){return He(e)?En((i,r)=>_t((s,o)=>e(i,s,r,o))(Kt(n(i,r))),t):(typeof e=="number"&&(t=e),ht((i,r)=>a0(i,r,n,t)))}function c0(n=1/0){return En(gi,n)}function l0(){return c0(1)}function Eo(...n){return l0()(Gt(n,Nr(n)))}function Va(n){return new Ke(e=>{Kt(n()).subscribe(e)})}var tr=new Ke(xs);function ti(n,e){return ht((t,i)=>{let r=0;t.subscribe(St(i,s=>n.call(e,s,r++)&&i.next(s)))})}function Ha(n){return ht((e,t)=>{let i=null,r=!1,s;i=e.subscribe(St(t,void 0,void 0,o=>{s=Kt(n(o,Ha(n)(e))),i?(i.unsubscribe(),i=null,s.subscribe(t)):r=!0})),r&&(i.unsubscribe(),i=null,s.subscribe(t))})}function au(n,e){return He(e)?En(n,e,1):En(n,1)}function u0(n){return ht((e,t)=>{let i=!1;e.subscribe(St(t,r=>{i=!0,t.next(r)},()=>{i||t.next(n),t.complete()}))})}function wn(n){return n<=0?()=>un:ht((e,t)=>{let i=0;e.subscribe(St(t,r=>{++i<=n&&(t.next(r),n<=i&&t.complete())}))})}function d0(n=rC){return ht((e,t)=>{let i=!1;e.subscribe(St(t,r=>{i=!0,t.next(r)},()=>i?t.complete():t.error(n())))})}function rC(){return new Es}function Bp(n){return ht((e,t)=>{try{e.subscribe(t)}finally{t.add(n)}})}function nr(n,e){let t=arguments.length>=2;return i=>i.pipe(n?ti((r,s)=>n(r,s,i)):gi,wn(1),t?u0(e):d0(()=>new Es))}function cu(n){return n<=0?()=>un:ht((e,t)=>{let i=[];e.subscribe(St(t,r=>{i.push(r),n<i.length&&i.shift()},()=>{for(let r of i)t.next(r);t.complete()},void 0,()=>{i=null}))})}function Vp(...n){let e=Nr(n);return ht((t,i)=>{(e?Eo(n,t,e):Eo(n,t)).subscribe(i)})}function mn(n,e){return ht((t,i)=>{let r=null,s=0,o=!1,a=()=>o&&!r&&i.complete();t.subscribe(St(i,c=>{r?.unsubscribe();let l=0,u=s++;Kt(n(c,u)).subscribe(r=St(i,d=>i.next(e?e(c,d,u,l++):d),()=>{r=null,a()}))},()=>{o=!0,a()}))})}function za(n){return ht((e,t)=>{Kt(n).subscribe(St(t,()=>t.complete(),xs)),!t.closed&&e.subscribe(t)})}function ni(n,e,t){let i=He(n)||e||t?{next:n,error:e,complete:t}:n;return i?ht((r,s)=>{var o;(o=i.subscribe)===null||o===void 0||o.call(i);let a=!0;r.subscribe(St(s,c=>{var l;(l=i.next)===null||l===void 0||l.call(i,c),s.next(c)},()=>{var c;a=!1,(c=i.complete)===null||c===void 0||c.call(i),s.complete()},c=>{var l;a=!1,(l=i.error)===null||l===void 0||l.call(i,c),s.error(c)},()=>{var c,l;a&&((c=i.unsubscribe)===null||c===void 0||c.call(i)),(l=i.finalize)===null||l===void 0||l.call(i)}))}):gi}var Hp;function lu(){return Hp}function Fi(n){let e=Hp;return Hp=n,e}var f0=Symbol("NotFound");function wo(n){return n===f0||n?.name==="\u0275NotFound"}function h0(n){let e=Be(null);try{return n()}finally{Be(e)}}var em="https://angular.dev/best-practices/security#preventing-cross-site-scripting-xss",ge=class extends Error{code;constructor(e,t){super(Lr(e,t)),this.code=e}};function sC(n){return`NG0${Math.abs(n)}`}function Lr(n,e){return`${sC(n)}${e?": "+e:""}`}function pt(n){for(let e in n)if(n[e]===pt)return e;throw Error("")}function Ya(n){if(typeof n=="string")return n;if(Array.isArray(n))return`[${n.map(Ya).join(", ")}]`;if(n==null)return""+n;let e=n.overriddenName||n.name;if(e)return`${e}`;let t=n.toString();if(t==null)return""+t;let i=t.indexOf(`
`);return i>=0?t.slice(0,i):t}function vu(n,e){return n?e?`${n} ${e}`:n:e||""}var oC=pt({__forward_ref__:pt});function yu(n){return n.__forward_ref__=yu,n}function On(n){return tm(n)?n():n}function tm(n){return typeof n=="function"&&n.hasOwnProperty(oC)&&n.__forward_ref__===yu}function Ce(n){return{token:n.token,providedIn:n.providedIn||null,factory:n.factory,value:void 0}}function As(n){return{providers:n.providers||[],imports:n.imports||[]}}function Za(n){return aC(n,_u)}function nm(n){return Za(n)!==null}function aC(n,e){return n.hasOwnProperty(e)&&n[e]||null}function cC(n){let e=n?.[_u]??null;return e||null}function Gp(n){return n&&n.hasOwnProperty(du)?n[du]:null}var _u=pt({\u0275prov:pt}),du=pt({\u0275inj:pt}),Ie=class{_desc;ngMetadataName="InjectionToken";\u0275prov;constructor(e,t){this._desc=e,this.\u0275prov=void 0,typeof t=="number"?this.__NG_ELEMENT_ID__=t:t!==void 0&&(this.\u0275prov=Ce({token:this,providedIn:t.providedIn||"root",factory:t.factory}))}get multi(){return this}toString(){return`InjectionToken ${this._desc}`}};function im(n){return n&&!!n.\u0275providers}var rm=pt({\u0275cmp:pt}),sm=pt({\u0275dir:pt}),om=pt({\u0275pipe:pt}),am=pt({\u0275mod:pt}),ja=pt({\u0275fac:pt}),Rs=pt({__NG_ELEMENT_ID__:pt}),p0=pt({__NG_ENV_ID__:pt});function cm(n){return xu(n,"@NgModule"),n[am]||null}function Fr(n){return xu(n,"@Component"),n[rm]||null}function lm(n){return xu(n,"@Directive"),n[sm]||null}function y0(n){return xu(n,"@Pipe"),n[om]||null}function xu(n,e){if(n==null)throw new ge(-919,!1)}function Ja(n){return typeof n=="string"?n:n==null?"":String(n)}var _0=pt({ngErrorCode:pt}),lC=pt({ngErrorMessage:pt}),uC=pt({ngTokenPath:pt});function um(n,e){return x0("",-200,e)}function Mu(n,e){throw new ge(-201,!1)}function x0(n,e,t){let i=new ge(e,n);return i[_0]=e,i[lC]=n,t&&(i[uC]=t),i}function dC(n){return n[_0]}var jp;function M0(){return jp}function zn(n){let e=jp;return jp=n,e}function dm(n,e,t){let i=Za(n);if(i&&i.providedIn=="root")return i.value===void 0?i.value=i.factory():i.value;if(t&8)return null;if(e!==void 0)return e;Mu(n,"")}var fC={},ws=fC,hC="__NG_DI_FLAG__",Wp=class{injector;constructor(e){this.injector=e}retrieve(e,t){let i=Cs(t)||0;try{return this.injector.get(e,i&8?null:ws,i)}catch(r){if(wo(r))return r;throw r}}};function pC(n,e=0){let t=lu();if(t===void 0)throw new ge(-203,!1);if(t===null)return dm(n,void 0,e);{let i=mC(e),r=t.retrieve(n,i);if(wo(r)){if(i.optional)return null;throw r}return r}}function Re(n,e=0){return(M0()||pC)(On(n),e)}function Q(n,e){return Re(n,Cs(e))}function Cs(n){return typeof n>"u"||typeof n=="number"?n:0|(n.optional&&8)|(n.host&&1)|(n.self&&2)|(n.skipSelf&&4)}function mC(n){return{optional:!!(n&8),host:!!(n&1),self:!!(n&2),skipSelf:!!(n&4)}}function $p(n){let e=[];for(let t=0;t<n.length;t++){let i=On(n[t]);if(Array.isArray(i)){if(i.length===0)throw new ge(900,!1);let r,s=0;for(let o=0;o<i.length;o++){let a=i[o],c=gC(a);typeof c=="number"?c===-1?r=a.token:s|=c:r=a}e.push(Re(r,s))}else e.push(Re(i))}return e}function gC(n){return n[hC]}function Ts(n,e){let t=n.hasOwnProperty(ja);return t?n[ja]:null}function S0(n,e,t){if(n.length!==e.length)return!1;for(let i=0;i<n.length;i++){let r=n[i],s=e[i];if(t&&(r=t(r),s=t(s)),s!==r)return!1}return!0}function b0(n){return n.flat(Number.POSITIVE_INFINITY)}function Su(n,e){n.forEach(t=>Array.isArray(t)?Su(t,e):e(t))}function fm(n,e,t){e>=n.length?n.push(t):n.splice(e,0,t)}function Ka(n,e){return e>=n.length-1?n.pop():n.splice(e,1)[0]}function E0(n,e,t,i){let r=n.length;if(r==e)n.push(t,i);else if(r===1)n.push(i,n[0]),n[0]=t;else{for(r--,n.push(n[r-1],n[r]);r>e;){let s=r-2;n[r]=n[s],r--}n[e]=t,n[e+1]=i}}function bu(n,e,t){let i=To(n,e);return i>=0?n[i|1]=t:(i=~i,E0(n,i,e,t)),i}function Eu(n,e){let t=To(n,e);if(t>=0)return n[t|1]}function To(n,e){return vC(n,e,1)}function vC(n,e,t){let i=0,r=n.length>>t;for(;r!==i;){let s=i+(r-i>>1),o=n[s<<t];if(e===o)return s<<t;o>e?r=s:i=s+1}return~(r<<t)}var Ns={},Ln=[],Ps=new Ie(""),hm=new Ie("",-1),pm=new Ie(""),Wa=class{get(e,t=ws){if(t===ws){let r=x0("",-201);throw r.name="\u0275NotFound",r}return t}};function sr(n){return{\u0275providers:n}}function w0(n){return sr([{provide:Ps,multi:!0,useValue:n}])}function C0(...n){return{\u0275providers:mm(!0,n),\u0275fromNgModule:!0}}function mm(n,...e){let t=[],i=new Set,r,s=o=>{t.push(o)};return Su(e,o=>{let a=o;fu(a,s,[],i)&&(r||=[],r.push(a))}),r!==void 0&&T0(r,s),t}function T0(n,e){for(let t=0;t<n.length;t++){let{ngModule:i,providers:r}=n[t];gm(r,s=>{e(s,i)})}}function fu(n,e,t,i){if(n=On(n),!n)return!1;let r=null,s=Gp(n),o=!s&&Fr(n);if(!s&&!o){let c=n.ngModule;if(s=Gp(c),s)r=c;else return!1}else{if(o&&!o.standalone)return!1;r=n}let a=i.has(r);if(o){if(a)return!1;if(i.add(r),o.dependencies){let c=typeof o.dependencies=="function"?o.dependencies():o.dependencies;for(let l of c)fu(l,e,t,i)}}else if(s){if(s.imports!=null&&!a){i.add(r);let l;Su(s.imports,u=>{fu(u,e,t,i)&&(l||=[],l.push(u))}),l!==void 0&&T0(l,e)}if(!a){let l=Ts(r)||(()=>new r);e({provide:r,useFactory:l,deps:Ln},r),e({provide:pm,useValue:r,multi:!0},r),e({provide:Ps,useValue:()=>Re(r),multi:!0},r)}let c=s.providers;if(c!=null&&!a){let l=n;gm(c,u=>{e(u,l)})}}else return!1;return r!==n&&n.providers!==void 0}function gm(n,e){for(let t of n)im(t)&&(t=t.\u0275providers),Array.isArray(t)?gm(t,e):e(t)}var yC=pt({provide:String,useValue:pt});function D0(n){return n!==null&&typeof n=="object"&&yC in n}function _C(n){return!!(n&&n.useExisting)}function xC(n){return!!(n&&n.useFactory)}function hu(n){return typeof n=="function"}var Qa=new Ie(""),uu={},m0={},zp;function ec(){return zp===void 0&&(zp=new Wa),zp}var Wt=class{},Ds=class extends Wt{parent;source;scopes;records=new Map;_ngOnDestroyHooks=new Set;_onDestroyHooks=[];get destroyed(){return this._destroyed}_destroyed=!1;injectorDefTypes;constructor(e,t,i,r){super(),this.parent=t,this.source=i,this.scopes=r,Xp(e,o=>this.processProvider(o)),this.records.set(hm,Co(void 0,this)),r.has("environment")&&this.records.set(Wt,Co(void 0,this));let s=this.records.get(Qa);s!=null&&typeof s.value=="string"&&this.scopes.add(s.value),this.injectorDefTypes=new Set(this.get(pm,Ln,{self:!0}))}retrieve(e,t){let i=Cs(t)||0;try{return this.get(e,ws,i)}catch(r){if(wo(r))return r;throw r}}destroy(){Ga(this),this._destroyed=!0;let e=Be(null);try{for(let i of this._ngOnDestroyHooks)i.ngOnDestroy();let t=this._onDestroyHooks;this._onDestroyHooks=[];for(let i of t)i()}finally{this.records.clear(),this._ngOnDestroyHooks.clear(),this.injectorDefTypes.clear(),Be(e)}}onDestroy(e){return Ga(this),this._onDestroyHooks.push(e),()=>this.removeOnDestroy(e)}runInContext(e){Ga(this);let t=Fi(this),i=zn(void 0),r;try{return e()}finally{Fi(t),zn(i)}}get(e,t=ws,i){if(Ga(this),e.hasOwnProperty(p0))return e[p0](this);let r=Cs(i),s,o=Fi(this),a=zn(void 0);try{if(!(r&4)){let l=this.records.get(e);if(l===void 0){let u=wC(e)&&Za(e);u&&this.injectableDefInScope(u)?l=Co(qp(e),uu):l=null,this.records.set(e,l)}if(l!=null)return this.hydrate(e,l,r)}let c=r&2?ec():this.parent;return t=r&8&&t===ws?null:t,c.get(e,t)}catch(c){let l=dC(c);throw l===-200||l===-201?new ge(l,null):c}finally{zn(a),Fi(o)}}resolveInjectorInitializers(){let e=Be(null),t=Fi(this),i=zn(void 0),r;try{let s=this.get(Ps,Ln,{self:!0});for(let o of s)o()}finally{Fi(t),zn(i),Be(e)}}toString(){return"R3Injector[...]"}processProvider(e){e=On(e);let t=hu(e)?e:On(e&&e.provide),i=SC(e);if(!hu(e)&&e.multi===!0){let r=this.records.get(t);r||(r=Co(void 0,uu,!0),r.factory=()=>$p(r.multi),this.records.set(t,r)),t=e,r.multi.push(e)}this.records.set(t,i)}hydrate(e,t,i){let r=Be(null);try{if(t.value===m0)throw um("");return t.value===uu&&(t.value=m0,t.value=t.factory(void 0,i)),typeof t.value=="object"&&t.value&&EC(t.value)&&this._ngOnDestroyHooks.add(t.value),t.value}finally{Be(r)}}injectableDefInScope(e){if(!e.providedIn)return!1;let t=On(e.providedIn);return typeof t=="string"?t==="any"||this.scopes.has(t):this.injectorDefTypes.has(t)}removeOnDestroy(e){let t=this._onDestroyHooks.indexOf(e);t!==-1&&this._onDestroyHooks.splice(t,1)}};function qp(n){let e=Za(n),t=e!==null?e.factory:Ts(n);if(t!==null)return t;if(n instanceof Ie)throw new ge(-204,!1);if(n instanceof Function)return MC(n);throw new ge(-204,!1)}function MC(n){if(n.length>0)throw new ge(-204,!1);let t=cC(n);return t!==null?()=>t.factory(n):()=>new n}function SC(n){if(D0(n))return Co(void 0,n.useValue);{let e=I0(n);return Co(e,uu)}}function I0(n,e,t){let i;if(hu(n)){let r=On(n);return Ts(r)||qp(r)}else if(D0(n))i=()=>On(n.useValue);else if(xC(n))i=()=>n.useFactory(...$p(n.deps||[]));else if(_C(n))i=(r,s)=>Re(On(n.useExisting),s!==void 0&&s&8?8:void 0);else{let r=On(n&&(n.useClass||n.provide));if(bC(n))i=()=>new r(...$p(n.deps));else return Ts(r)||qp(r)}return i}function Ga(n){if(n.destroyed)throw new ge(-205,!1)}function Co(n,e,t=!1){return{factory:n,value:e,multi:t?[]:void 0}}function bC(n){return!!n.deps}function EC(n){return n!==null&&typeof n=="object"&&typeof n.ngOnDestroy=="function"}function wC(n){return typeof n=="function"||typeof n=="object"&&n.ngMetadataName==="InjectionToken"}function Xp(n,e){for(let t of n)Array.isArray(t)?Xp(t,e):t&&im(t)?Xp(t.\u0275providers,e):e(t)}function gn(n,e){let t;n instanceof Ds?(Ga(n),t=n):t=new Wp(n);let i,r=Fi(t),s=zn(void 0);try{return e()}finally{Fi(r),zn(s)}}function A0(){return M0()!==void 0||lu()!=null}var vi=0,Oe=1,ke=2,Qt=3,ii=4,ri=5,tc=6,Do=7,vn=8,kr=9,ki=10,Nt=11,Io=12,vm=13,Os=14,si=15,Ur=16,Ls=17,Ui=18,Br=19,ym=20,ir=21,wu=22,Pr=23,Gn=24,Cu=25,Ao=26,Cn=27,R0=1;var Vr=7,nc=8,Fs=9,Tn=10;function or(n){return Array.isArray(n)&&typeof n[R0]=="object"}function yi(n){return Array.isArray(n)&&n[R0]===!0}function _m(n){return(n.flags&4)!==0}function ar(n){return n.componentOffset>-1}function Ro(n){return(n.flags&1)===1}function ks(n){return!!n.template}function No(n){return(n[ke]&512)!==0}function Us(n){return(n[ke]&256)===256}var xm="svg",N0="math";function oi(n){for(;Array.isArray(n);)n=n[vi];return n}function Mm(n,e){return oi(e[n])}function _i(n,e){return oi(e[n.index])}function Sm(n,e){return n.data[e]}function ai(n,e){let t=e[n];return or(t)?t:t[vi]}function P0(n){return(n[ke]&4)===4}function Tu(n){return(n[ke]&128)===128}function O0(n){return yi(n[Qt])}function Bs(n,e){return e==null?null:n[e]}function bm(n){n[Ls]=0}function Em(n){n[ke]&1024||(n[ke]|=1024,Tu(n)&&Po(n))}function L0(n,e){for(;n>0;)e=e[Os],n--;return e}function ic(n){return!!(n[ke]&9216||n[Gn]?.dirty)}function Du(n){n[ki].changeDetectionScheduler?.notify(8),n[ke]&64&&(n[ke]|=1024),ic(n)&&Po(n)}function Po(n){n[ki].changeDetectionScheduler?.notify(0);let e=Or(n);for(;e!==null&&!(e[ke]&8192||(e[ke]|=8192,!Tu(e)));)e=Or(e)}function wm(n,e){if(Us(n))throw new ge(911,!1);n[ir]===null&&(n[ir]=[]),n[ir].push(e)}function F0(n,e){if(n[ir]===null)return;let t=n[ir].indexOf(e);t!==-1&&n[ir].splice(t,1)}function Or(n){let e=n[Qt];return yi(e)?e[Qt]:e}function Cm(n){return n[Do]??=[]}function Tm(n){return n.cleanup??=[]}function k0(n,e,t,i){let r=Cm(e);r.push(t),n.firstCreatePass&&Tm(n).push(i,r.length-1)}var Je={lFrame:Z0(null),bindingsEnabled:!0,skipHydrationRootTNode:null};var Yp=!1;function U0(){return Je.lFrame.elementDepthCount}function B0(){Je.lFrame.elementDepthCount++}function Dm(){Je.lFrame.elementDepthCount--}function Iu(){return Je.bindingsEnabled}function V0(){return Je.skipHydrationRootTNode!==null}function Im(n){return Je.skipHydrationRootTNode===n}function Am(){Je.skipHydrationRootTNode=null}function lt(){return Je.lFrame.lView}function kn(){return Je.lFrame.tView}function cr(n){return Je.lFrame.contextLView=n,n[vn]}function lr(n){return Je.lFrame.contextLView=null,n}function Dn(){let n=Rm();for(;n!==null&&n.type===64;)n=n.parent;return n}function Rm(){return Je.lFrame.currentTNode}function H0(){let n=Je.lFrame,e=n.currentTNode;return n.isParent?e:e.parent}function Oo(n,e){let t=Je.lFrame;t.currentTNode=n,t.isParent=e}function Nm(){return Je.lFrame.isParent}function z0(){Je.lFrame.isParent=!1}function Pm(){return Yp}function $a(n){let e=Yp;return Yp=n,e}function G0(){return Je.lFrame.bindingIndex}function j0(n){return Je.lFrame.bindingIndex=n}function Au(){return Je.lFrame.bindingIndex++}function Ru(n){let e=Je.lFrame,t=e.bindingIndex;return e.bindingIndex=e.bindingIndex+n,t}function W0(){return Je.lFrame.inI18n}function $0(n,e){let t=Je.lFrame;t.bindingIndex=t.bindingRootIndex=n,Nu(e)}function q0(){return Je.lFrame.currentDirectiveIndex}function Nu(n){Je.lFrame.currentDirectiveIndex=n}function X0(n){let e=Je.lFrame.currentDirectiveIndex;return e===-1?null:n[e]}function Om(){return Je.lFrame.currentQueryIndex}function Pu(n){Je.lFrame.currentQueryIndex=n}function CC(n){let e=n[Oe];return e.type===2?e.declTNode:e.type===1?n[ri]:null}function Lm(n,e,t){if(t&4){let r=e,s=n;for(;r=r.parent,r===null&&!(t&1);)if(r=CC(s),r===null||(s=s[Os],r.type&10))break;if(r===null)return!1;e=r,n=s}let i=Je.lFrame=Y0();return i.currentTNode=e,i.lView=n,!0}function Ou(n){let e=Y0(),t=n[Oe];Je.lFrame=e,e.currentTNode=t.firstChild,e.lView=n,e.tView=t,e.contextLView=n,e.bindingIndex=t.bindingStartIndex,e.inI18n=!1}function Y0(){let n=Je.lFrame,e=n===null?null:n.child;return e===null?Z0(n):e}function Z0(n){let e={currentTNode:null,isParent:!0,lView:null,tView:null,selectedIndex:-1,contextLView:null,elementDepthCount:0,currentNamespace:null,currentDirectiveIndex:-1,bindingRootIndex:-1,bindingIndex:-1,currentQueryIndex:0,parent:n,child:null,inI18n:!1};return n!==null&&(n.child=e),e}function J0(){let n=Je.lFrame;return Je.lFrame=n.parent,n.currentTNode=null,n.lView=null,n}var Fm=J0;function Lu(){let n=J0();n.isParent=!0,n.tView=null,n.selectedIndex=-1,n.contextLView=null,n.elementDepthCount=0,n.currentDirectiveIndex=-1,n.currentNamespace=null,n.bindingRootIndex=-1,n.bindingIndex=-1,n.currentQueryIndex=0}function K0(n){return(Je.lFrame.contextLView=L0(n,Je.lFrame.contextLView))[vn]}function ur(){return Je.lFrame.selectedIndex}function Hr(n){Je.lFrame.selectedIndex=n}function km(){let n=Je.lFrame;return Sm(n.tView,n.selectedIndex)}function rc(){Je.lFrame.currentNamespace=xm}function Q0(){return Je.lFrame.currentNamespace}var ex=!0;function Fu(){return ex}function sc(n){ex=n}function Zp(n,e=null,t=null,i){let r=Um(n,e,t,i);return r.resolveInjectorInitializers(),r}function Um(n,e=null,t=null,i,r=new Set){let s=[t||Ln,C0(n)],o;return new Ds(s,e||ec(),o||null,r)}var Fn=class n{static THROW_IF_NOT_FOUND=ws;static NULL=new Wa;static create(e,t){if(Array.isArray(e))return Zp({name:""},t,e,"");{let i=e.name??"";return Zp({name:i},e.parent,e.providers,i)}}static \u0275prov=Ce({token:n,providedIn:"any",factory:()=>Re(hm)});static __NG_ELEMENT_ID__=-1},$t=new Ie(""),dr=(()=>{class n{static __NG_ELEMENT_ID__=TC;static __NG_ENV_ID__=t=>t}return n})(),pu=class extends dr{_lView;constructor(e){super(),this._lView=e}get destroyed(){return Us(this._lView)}onDestroy(e){let t=this._lView;return wm(t,e),()=>F0(t,e)}};function TC(){return new pu(lt())}var tx=!1,nx=new Ie(""),zr=(()=>{class n{taskId=0;pendingTasks=new Set;destroyed=!1;pendingTask=new ln(!1);debugTaskTracker=Q(nx,{optional:!0});get hasPendingTasks(){return this.destroyed?!1:this.pendingTask.value}get hasPendingTasksObservable(){return this.destroyed?new Ke(t=>{t.next(!1),t.complete()}):this.pendingTask}add(){!this.hasPendingTasks&&!this.destroyed&&this.pendingTask.next(!0);let t=this.taskId++;return this.pendingTasks.add(t),this.debugTaskTracker?.add(t),t}has(t){return this.pendingTasks.has(t)}remove(t){this.pendingTasks.delete(t),this.debugTaskTracker?.remove(t),this.pendingTasks.size===0&&this.hasPendingTasks&&this.pendingTask.next(!1)}ngOnDestroy(){this.pendingTasks.clear(),this.hasPendingTasks&&this.pendingTask.next(!1),this.destroyed=!0,this.pendingTask.unsubscribe()}static \u0275prov=Ce({token:n,providedIn:"root",factory:()=>new n})}return n})(),Jp=class extends Ut{__isAsync;destroyRef=void 0;pendingTasks=void 0;constructor(e=!1){super(),this.__isAsync=e,A0()&&(this.destroyRef=Q(dr,{optional:!0})??void 0,this.pendingTasks=Q(zr,{optional:!0})??void 0)}emit(e){let t=Be(null);try{super.next(e)}finally{Be(t)}}subscribe(e,t,i){let r=e,s=t||(()=>null),o=i;if(e&&typeof e=="object"){let c=e;r=c.next?.bind(c),s=c.error?.bind(c),o=c.complete?.bind(c)}this.__isAsync&&(s=this.wrapInTimeout(s),r&&(r=this.wrapInTimeout(r)),o&&(o=this.wrapInTimeout(o)));let a=super.subscribe({next:r,error:s,complete:o});return e instanceof cn&&e.add(a),a}wrapInTimeout(e){return t=>{let i=this.pendingTasks?.add();setTimeout(()=>{try{e(t)}finally{i!==void 0&&this.pendingTasks?.remove(i)}})}}},Rt=Jp;function mu(...n){}function Bm(n){let e,t;function i(){n=mu;try{t!==void 0&&typeof cancelAnimationFrame=="function"&&cancelAnimationFrame(t),e!==void 0&&clearTimeout(e)}catch{}}return e=setTimeout(()=>{n(),i()}),typeof requestAnimationFrame=="function"&&(t=requestAnimationFrame(()=>{n(),i()})),()=>i()}function ix(n){return queueMicrotask(()=>n()),()=>{n=mu}}var Vm="isAngularZone",qa=Vm+"_ID",DC=0,Bt=class n{hasPendingMacrotasks=!1;hasPendingMicrotasks=!1;isStable=!0;onUnstable=new Rt(!1);onMicrotaskEmpty=new Rt(!1);onStable=new Rt(!1);onError=new Rt(!1);constructor(e){let{enableLongStackTrace:t=!1,shouldCoalesceEventChangeDetection:i=!1,shouldCoalesceRunChangeDetection:r=!1,scheduleInRootZone:s=tx}=e;if(typeof Zone>"u")throw new ge(908,!1);Zone.assertZonePatched();let o=this;o._nesting=0,o._outer=o._inner=Zone.current,Zone.TaskTrackingZoneSpec&&(o._inner=o._inner.fork(new Zone.TaskTrackingZoneSpec)),t&&Zone.longStackTraceZoneSpec&&(o._inner=o._inner.fork(Zone.longStackTraceZoneSpec)),o.shouldCoalesceEventChangeDetection=!r&&i,o.shouldCoalesceRunChangeDetection=r,o.callbackScheduled=!1,o.scheduleInRootZone=s,RC(o)}static isInAngularZone(){return typeof Zone<"u"&&Zone.current.get(Vm)===!0}static assertInAngularZone(){if(!n.isInAngularZone())throw new ge(909,!1)}static assertNotInAngularZone(){if(n.isInAngularZone())throw new ge(909,!1)}run(e,t,i){return this._inner.run(e,t,i)}runTask(e,t,i,r){let s=this._inner,o=s.scheduleEventTask("NgZoneEvent: "+r,e,IC,mu,mu);try{return s.runTask(o,t,i)}finally{s.cancelTask(o)}}runGuarded(e,t,i){return this._inner.runGuarded(e,t,i)}runOutsideAngular(e){return this._outer.run(e)}},IC={};function Hm(n){if(n._nesting==0&&!n.hasPendingMicrotasks&&!n.isStable)try{n._nesting++,n.onMicrotaskEmpty.emit(null)}finally{if(n._nesting--,!n.hasPendingMicrotasks)try{n.runOutsideAngular(()=>n.onStable.emit(null))}finally{n.isStable=!0}}}function AC(n){if(n.isCheckStableRunning||n.callbackScheduled)return;n.callbackScheduled=!0;function e(){Bm(()=>{n.callbackScheduled=!1,Kp(n),n.isCheckStableRunning=!0,Hm(n),n.isCheckStableRunning=!1})}n.scheduleInRootZone?Zone.root.run(()=>{e()}):n._outer.run(()=>{e()}),Kp(n)}function RC(n){let e=()=>{AC(n)},t=DC++;n._inner=n._inner.fork({name:"angular",properties:{[Vm]:!0,[qa]:t,[qa+t]:!0},onInvokeTask:(i,r,s,o,a,c)=>{if(NC(c))return i.invokeTask(s,o,a,c);try{return g0(n),i.invokeTask(s,o,a,c)}finally{(n.shouldCoalesceEventChangeDetection&&o.type==="eventTask"||n.shouldCoalesceRunChangeDetection)&&e(),v0(n)}},onInvoke:(i,r,s,o,a,c,l)=>{try{return g0(n),i.invoke(s,o,a,c,l)}finally{n.shouldCoalesceRunChangeDetection&&!n.callbackScheduled&&!PC(c)&&e(),v0(n)}},onHasTask:(i,r,s,o)=>{i.hasTask(s,o),r===s&&(o.change=="microTask"?(n._hasPendingMicrotasks=o.microTask,Kp(n),Hm(n)):o.change=="macroTask"&&(n.hasPendingMacrotasks=o.macroTask))},onHandleError:(i,r,s,o)=>(i.handleError(s,o),n.runOutsideAngular(()=>n.onError.emit(o)),!1)})}function Kp(n){n._hasPendingMicrotasks||(n.shouldCoalesceEventChangeDetection||n.shouldCoalesceRunChangeDetection)&&n.callbackScheduled===!0?n.hasPendingMicrotasks=!0:n.hasPendingMicrotasks=!1}function g0(n){n._nesting++,n.isStable&&(n.isStable=!1,n.onUnstable.emit(null))}function v0(n){n._nesting--,Hm(n)}var Xa=class{hasPendingMicrotasks=!1;hasPendingMacrotasks=!1;isStable=!0;onUnstable=new Rt;onMicrotaskEmpty=new Rt;onStable=new Rt;onError=new Rt;run(e,t,i){return e.apply(t,i)}runGuarded(e,t,i){return e.apply(t,i)}runOutsideAngular(e){return e()}runTask(e,t,i,r){return e.apply(t,i)}};function NC(n){return rx(n,"__ignore_ng_zone__")}function PC(n){return rx(n,"__scheduler_tick__")}function rx(n,e){return!Array.isArray(n)||n.length!==1?!1:n[0]?.data?.[e]===!0}var rr=class{_console=console;handleError(e){this._console.error("ERROR",e)}},xi=new Ie("",{factory:()=>{let n=Q(Bt),e=Q(Wt),t;return i=>{n.runOutsideAngular(()=>{e.destroyed&&!t?setTimeout(()=>{throw i}):(t??=e.get(rr),t.handleError(i))})}}}),sx={provide:Ps,useValue:()=>{let n=Q(rr,{optional:!0})},multi:!0},OC=new Ie("",{factory:()=>{let n=Q($t).defaultView;if(!n)return;let e=Q(xi),t=s=>{e(s.reason),s.preventDefault()},i=s=>{s.error?e(s.error):e(new Error(s.message,{cause:s})),s.preventDefault()},r=()=>{n.addEventListener("unhandledrejection",t),n.addEventListener("error",i)};typeof Zone<"u"?Zone.root.run(r):r(),Q(dr).onDestroy(()=>{n.removeEventListener("error",i),n.removeEventListener("unhandledrejection",t)})}});function zm(){return sr([w0(()=>{Q(OC)})])}function Vt(n,e){let[t,i,r]=wp(n,e?.equal),s=t,o=s[bn];return s.set=i,s.update=r,s.asReadonly=ox.bind(s),s}function ox(){let n=this[bn];if(n.readonlyFn===void 0){let e=()=>this();e[bn]=n,n.readonlyFn=e}return n.readonlyFn}var ku=(()=>{class n{view;node;constructor(t,i){this.view=t,this.node=i}static __NG_ELEMENT_ID__=LC}return n})();function LC(){return new ku(lt(),Dn())}var Is=class{},oc=new Ie("",{factory:()=>!0});var Gm=new Ie("");var Uu=(()=>{class n{static \u0275prov=Ce({token:n,providedIn:"root",factory:()=>new Qp})}return n})(),Qp=class{dirtyEffectCount=0;queues=new Map;add(e){this.enqueue(e),this.schedule(e)}schedule(e){e.dirty&&this.dirtyEffectCount++}remove(e){let t=e.zone,i=this.queues.get(t);i.has(e)&&(i.delete(e),e.dirty&&this.dirtyEffectCount--)}enqueue(e){let t=e.zone;this.queues.has(t)||this.queues.set(t,new Set);let i=this.queues.get(t);i.has(e)||i.add(e)}flush(){for(;this.dirtyEffectCount>0;){let e=!1;for(let[t,i]of this.queues)t===null?e||=this.flushQueue(i):e||=t.run(()=>this.flushQueue(i));e||(this.dirtyEffectCount=0)}}flushQueue(e){let t=!1;for(let i of e)i.dirty&&(this.dirtyEffectCount--,t=!0,i.run());return t}},gu=class{[bn];constructor(e){this[bn]=e}destroy(){this[bn].destroy()}};function Bu(n,e){let t=e?.injector??Q(Fn),i=e?.manualCleanup!==!0?t.get(dr):null,r,s=t.get(ku,null,{optional:!0}),o=t.get(Is);return s!==null?(r=UC(s.view,o,n),i instanceof pu&&i._lView===s.view&&(i=null)):r=BC(n,t.get(Uu),o),r.injector=t,i!==null&&(r.onDestroyFns=[i.onDestroy(()=>r.destroy())]),new gu(r)}var ax=rt(ae({},Tp),{cleanupFns:void 0,zone:null,onDestroyFns:null,run(){let n=$a(!1);try{Dp(this)}finally{$a(n)}},cleanup(){if(!this.cleanupFns?.length)return;let n=Be(null);try{for(;this.cleanupFns.length;)this.cleanupFns.pop()()}finally{this.cleanupFns=[],Be(n)}}}),FC=rt(ae({},ax),{consumerMarkedDirty(){this.scheduler.schedule(this),this.notifier.notify(12)},destroy(){if(_s(this),this.onDestroyFns!==null)for(let n of this.onDestroyFns)n();this.cleanup(),this.scheduler.remove(this)}}),kC=rt(ae({},ax),{consumerMarkedDirty(){this.view[ke]|=8192,Po(this.view),this.notifier.notify(13)},destroy(){if(_s(this),this.onDestroyFns!==null)for(let n of this.onDestroyFns)n();this.cleanup(),this.view[Pr]?.delete(this)}});function UC(n,e,t){let i=Object.create(kC);return i.view=n,i.zone=typeof Zone<"u"?Zone.current:null,i.notifier=e,i.fn=cx(i,t),n[Pr]??=new Set,n[Pr].add(i),i.consumerMarkedDirty(i),i}function BC(n,e,t){let i=Object.create(FC);return i.fn=cx(i,n),i.scheduler=e,i.notifier=t,i.zone=typeof Zone<"u"?Zone.current:null,i.scheduler.add(i),i.notifier.notify(12),i}function cx(n,e){return()=>{e(t=>(n.cleanupFns??=[]).push(t))}}function pc(n){return{toString:n}.toString()}function XC(n){return typeof n=="function"}function kx(n,e,t,i){e!==null?e.applyValueToInputSignal(e,i):n[t]=i}var $u=class{previousValue;currentValue;firstChange;constructor(e,t,i){this.previousValue=e,this.currentValue=t,this.firstChange=i}isFirstChange(){return this.firstChange}},sd=(()=>{let n=()=>Ux;return n.ngInherit=!0,n})();function Ux(n){return n.type.prototype.ngOnChanges&&(n.setInput=ZC),YC}function YC(){let n=Vx(this),e=n?.current;if(e){let t=n.previous;if(t===Ns)n.previous=e;else for(let i in e)t[i]=e[i];n.current=null,this.ngOnChanges(e)}}function ZC(n,e,t,i,r){let s=this.declaredInputs[i],o=Vx(n)||JC(n,{previous:Ns,current:null}),a=o.current||(o.current={}),c=o.previous,l=c[s];a[s]=new $u(l&&l.currentValue,t,c===Ns),kx(n,e,r,t)}var Bx="__ngSimpleChanges__";function Vx(n){return n[Bx]||null}function JC(n,e){return n[Bx]=e}var lx=[];var bt=function(n,e=null,t){for(let i=0;i<lx.length;i++){let r=lx[i];r(n,e,t)}},ut=(function(n){return n[n.TemplateCreateStart=0]="TemplateCreateStart",n[n.TemplateCreateEnd=1]="TemplateCreateEnd",n[n.TemplateUpdateStart=2]="TemplateUpdateStart",n[n.TemplateUpdateEnd=3]="TemplateUpdateEnd",n[n.LifecycleHookStart=4]="LifecycleHookStart",n[n.LifecycleHookEnd=5]="LifecycleHookEnd",n[n.OutputStart=6]="OutputStart",n[n.OutputEnd=7]="OutputEnd",n[n.BootstrapApplicationStart=8]="BootstrapApplicationStart",n[n.BootstrapApplicationEnd=9]="BootstrapApplicationEnd",n[n.BootstrapComponentStart=10]="BootstrapComponentStart",n[n.BootstrapComponentEnd=11]="BootstrapComponentEnd",n[n.ChangeDetectionStart=12]="ChangeDetectionStart",n[n.ChangeDetectionEnd=13]="ChangeDetectionEnd",n[n.ChangeDetectionSyncStart=14]="ChangeDetectionSyncStart",n[n.ChangeDetectionSyncEnd=15]="ChangeDetectionSyncEnd",n[n.AfterRenderHooksStart=16]="AfterRenderHooksStart",n[n.AfterRenderHooksEnd=17]="AfterRenderHooksEnd",n[n.ComponentStart=18]="ComponentStart",n[n.ComponentEnd=19]="ComponentEnd",n[n.DeferBlockStateStart=20]="DeferBlockStateStart",n[n.DeferBlockStateEnd=21]="DeferBlockStateEnd",n[n.DynamicComponentStart=22]="DynamicComponentStart",n[n.DynamicComponentEnd=23]="DynamicComponentEnd",n[n.HostBindingsUpdateStart=24]="HostBindingsUpdateStart",n[n.HostBindingsUpdateEnd=25]="HostBindingsUpdateEnd",n})(ut||{});function KC(n,e,t){let{ngOnChanges:i,ngOnInit:r,ngDoCheck:s}=e.type.prototype;if(i){let o=Ux(e);(t.preOrderHooks??=[]).push(n,o),(t.preOrderCheckHooks??=[]).push(n,o)}r&&(t.preOrderHooks??=[]).push(0-n,r),s&&((t.preOrderHooks??=[]).push(n,s),(t.preOrderCheckHooks??=[]).push(n,s))}function Hx(n,e){for(let t=e.directiveStart,i=e.directiveEnd;t<i;t++){let s=n.data[t].type.prototype,{ngAfterContentInit:o,ngAfterContentChecked:a,ngAfterViewInit:c,ngAfterViewChecked:l,ngOnDestroy:u}=s;o&&(n.contentHooks??=[]).push(-t,o),a&&((n.contentHooks??=[]).push(t,a),(n.contentCheckHooks??=[]).push(t,a)),c&&(n.viewHooks??=[]).push(-t,c),l&&((n.viewHooks??=[]).push(t,l),(n.viewCheckHooks??=[]).push(t,l)),u!=null&&(n.destroyHooks??=[]).push(t,u)}}function Hu(n,e,t){zx(n,e,3,t)}function zu(n,e,t,i){(n[ke]&3)===t&&zx(n,e,t,i)}function jm(n,e){let t=n[ke];(t&3)===e&&(t&=16383,t+=1,n[ke]=t)}function zx(n,e,t,i){let r=i!==void 0?n[Ls]&65535:0,s=i??-1,o=e.length-1,a=0;for(let c=r;c<o;c++)if(typeof e[c+1]=="number"){if(a=e[c],i!=null&&a>=i)break}else e[c]<0&&(n[Ls]+=65536),(a<s||s==-1)&&(QC(n,t,e,c),n[Ls]=(n[Ls]&4294901760)+c+2),c++}function ux(n,e){bt(ut.LifecycleHookStart,n,e);let t=Be(null);try{e.call(n)}finally{Be(t),bt(ut.LifecycleHookEnd,n,e)}}function QC(n,e,t,i){let r=t[i]<0,s=t[i+1],o=r?-t[i]:t[i],a=n[o];r?n[ke]>>14<n[Ls]>>16&&(n[ke]&3)===e&&(n[ke]+=16384,ux(a,s)):ux(a,s)}var Fo=-1,uc=class{factory;name;injectImpl;resolving=!1;canSeeViewProviders;multi;componentProviders;index;providerFactory;constructor(e,t,i,r){this.factory=e,this.name=r,this.canSeeViewProviders=t,this.injectImpl=i}};function eT(n){return(n.flags&8)!==0}function tT(n){return(n.flags&16)!==0}function nT(n,e,t){let i=0;for(;i<t.length;){let r=t[i];if(typeof r=="number"){if(r!==0)break;i++;let s=t[i++],o=t[i++],a=t[i++];n.setAttribute(e,o,a,s)}else{let s=r,o=t[++i];rT(s)?n.setProperty(e,s,o):n.setAttribute(e,s,o),i++}}return i}function iT(n){return n===3||n===4||n===6}function rT(n){return n.charCodeAt(0)===64}function od(n,e){if(!(e===null||e.length===0))if(n===null||n.length===0)n=e.slice();else{let t=-1;for(let i=0;i<e.length;i++){let r=e[i];typeof r=="number"?t=r:t===0||(t===-1||t===2?dx(n,t,r,null,e[++i]):dx(n,t,r,null,null))}}return n}function dx(n,e,t,i,r){let s=0,o=n.length;if(e===-1)o=-1;else for(;s<n.length;){let a=n[s++];if(typeof a=="number"){if(a===e){o=-1;break}else if(a>e){o=s-1;break}}}for(;s<n.length;){let a=n[s];if(typeof a=="number")break;if(a===t){r!==null&&(n[s+1]=r);return}s++,r!==null&&s++}o!==-1&&(n.splice(o,0,e),s=o+1),n.splice(s++,0,t),r!==null&&n.splice(s++,0,r)}function Gx(n){return n!==Fo}function qu(n){return n&32767}function sT(n){return n>>16}function Xu(n,e){let t=sT(n),i=e;for(;t>0;)i=i[Os],t--;return i}var Zm=!0;function fx(n){let e=Zm;return Zm=n,e}var oT=256,jx=oT-1,Wx=5,aT=0,Bi={};function cT(n,e,t){let i;typeof t=="string"?i=t.charCodeAt(0)||0:t.hasOwnProperty(Rs)&&(i=t[Rs]),i==null&&(i=t[Rs]=aT++);let r=i&jx,s=1<<r;e.data[n+(r>>Wx)]|=s}function $x(n,e){let t=qx(n,e);if(t!==-1)return t;let i=e[Oe];i.firstCreatePass&&(n.injectorIndex=e.length,Wm(i.data,n),Wm(e,null),Wm(i.blueprint,null));let r=_g(n,e),s=n.injectorIndex;if(Gx(r)){let o=qu(r),a=Xu(r,e),c=a[Oe].data;for(let l=0;l<8;l++)e[s+l]=a[o+l]|c[o+l]}return e[s+8]=r,s}function Wm(n,e){n.push(0,0,0,0,0,0,0,0,e)}function qx(n,e){return n.injectorIndex===-1||n.parent&&n.parent.injectorIndex===n.injectorIndex||e[n.injectorIndex+8]===null?-1:n.injectorIndex}function _g(n,e){if(n.parent&&n.parent.injectorIndex!==-1)return n.parent.injectorIndex;let t=0,i=null,r=e;for(;r!==null;){if(i=Kx(r),i===null)return Fo;if(t++,r=r[Os],i.injectorIndex!==-1)return i.injectorIndex|t<<16}return Fo}function lT(n,e,t){cT(n,e,t)}function Xx(n,e,t){if(t&8||n!==void 0)return n;Mu(e,"NodeInjector")}function Yx(n,e,t,i){if(t&8&&i===void 0&&(i=null),(t&3)===0){let r=n[kr],s=zn(void 0);try{return r?r.get(e,i,t&8):dm(e,i,t&8)}finally{zn(s)}}return Xx(i,e,t)}function Zx(n,e,t,i=0,r){if(n!==null){if(e[ke]&2048&&!(i&2)){let o=hT(n,e,t,i,Bi);if(o!==Bi)return o}let s=Jx(n,e,t,i,Bi);if(s!==Bi)return s}return Yx(e,t,i,r)}function Jx(n,e,t,i,r){let s=dT(t);if(typeof s=="function"){if(!Lm(e,n,i))return i&1?Xx(r,t,i):Yx(e,t,i,r);try{let o;if(o=s(i),o==null&&!(i&8))Mu(t);else return o}finally{Fm()}}else if(typeof s=="number"){let o=null,a=qx(n,e),c=Fo,l=i&1?e[si][ri]:null;for((a===-1||i&4)&&(c=a===-1?_g(n,e):e[a+8],c===Fo||!px(i,!1)?a=-1:(o=e[Oe],a=qu(c),e=Xu(c,e)));a!==-1;){let u=e[Oe];if(hx(s,a,u.data)){let d=uT(a,e,t,o,i,l);if(d!==Bi)return d}c=e[a+8],c!==Fo&&px(i,e[Oe].data[a+8]===l)&&hx(s,a,e)?(o=u,a=qu(c),e=Xu(c,e)):a=-1}}return r}function uT(n,e,t,i,r,s){let o=e[Oe],a=o.data[n+8],c=i==null?ar(a)&&Zm:i!=o&&(a.type&3)!==0,l=r&1&&s===a,u=Gu(a,o,t,c,l);return u!==null?Yu(e,o,u,a,r):Bi}function Gu(n,e,t,i,r){let s=n.providerIndexes,o=e.data,a=s&1048575,c=n.directiveStart,l=n.directiveEnd,u=s>>20,d=i?a:a+u,f=r?a+u:l;for(let h=d;h<f;h++){let g=o[h];if(h<c&&t===g||h>=c&&g.type===t)return h}if(r){let h=o[c];if(h&&ks(h)&&h.type===t)return c}return null}function Yu(n,e,t,i,r){let s=n[t],o=e.data;if(s instanceof uc){let a=s;if(a.resolving)throw um("");let c=fx(a.canSeeViewProviders);a.resolving=!0;let l=o[t].type||o[t],u,d=a.injectImpl?zn(a.injectImpl):null,f=Lm(n,i,0);try{s=n[t]=a.factory(void 0,r,o,n,i),e.firstCreatePass&&t>=i.directiveStart&&KC(t,o[t],e)}finally{d!==null&&zn(d),fx(c),a.resolving=!1,Fm()}}return s}function dT(n){if(typeof n=="string")return n.charCodeAt(0)||0;let e=n.hasOwnProperty(Rs)?n[Rs]:void 0;return typeof e=="number"?e>=0?e&jx:fT:e}function hx(n,e,t){let i=1<<n;return!!(t[e+(n>>Wx)]&i)}function px(n,e){return!(n&2)&&!(n&1&&e)}var Vs=class{_tNode;_lView;constructor(e,t){this._tNode=e,this._lView=t}get(e,t,i){return Zx(this._tNode,this._lView,e,Cs(i),t)}};function fT(){return new Vs(Dn(),lt())}function mc(n){return pc(()=>{let e=n.prototype.constructor,t=e[ja]||Jm(e),i=Object.prototype,r=Object.getPrototypeOf(n.prototype).constructor;for(;r&&r!==i;){let s=r[ja]||Jm(r);if(s&&s!==t)return s;r=Object.getPrototypeOf(r)}return s=>new s})}function Jm(n){return tm(n)?()=>{let e=Jm(On(n));return e&&e()}:Ts(n)}function hT(n,e,t,i,r){let s=n,o=e;for(;s!==null&&o!==null&&o[ke]&2048&&!No(o);){let a=Jx(s,o,t,i|2,Bi);if(a!==Bi)return a;let c=s.parent;if(!c){let l=o[ym];if(l){let u=l.get(t,Bi,i&-5);if(u!==Bi)return u}c=Kx(o),o=o[Os]}s=c}return r}function Kx(n){let e=n[Oe],t=e.type;return t===2?e.declTNode:t===1?n[ri]:null}function pT(){return Ho(Dn(),lt())}function Ho(n,e){return new Ws(_i(n,e))}var Ws=(()=>{class n{nativeElement;constructor(t){this.nativeElement=t}static __NG_ELEMENT_ID__=pT}return n})();function mT(n){return n instanceof Ws?n.nativeElement:n}function gT(){return this._results[Symbol.iterator]()}var Zu=class{_emitDistinctChangesOnly;dirty=!0;_onDirty=void 0;_results=[];_changesDetected=!1;_changes=void 0;length=0;first=void 0;last=void 0;get changes(){return this._changes??=new Ut}constructor(e=!1){this._emitDistinctChangesOnly=e}get(e){return this._results[e]}map(e){return this._results.map(e)}filter(e){return this._results.filter(e)}find(e){return this._results.find(e)}reduce(e,t){return this._results.reduce(e,t)}forEach(e){this._results.forEach(e)}some(e){return this._results.some(e)}toArray(){return this._results.slice()}toString(){return this._results.toString()}reset(e,t){this.dirty=!1;let i=b0(e);(this._changesDetected=!S0(this._results,i,t))&&(this._results=i,this.length=i.length,this.last=i[this.length-1],this.first=i[0])}notifyOnChanges(){this._changes!==void 0&&(this._changesDetected||!this._emitDistinctChangesOnly)&&this._changes.next(this)}onDirty(e){this._onDirty=e}setDirty(){this.dirty=!0,this._onDirty?.()}destroy(){this._changes!==void 0&&(this._changes.complete(),this._changes.unsubscribe())}[Symbol.iterator]=gT};function Qx(n){return(n.flags&128)===128}var xg=(function(n){return n[n.OnPush=0]="OnPush",n[n.Eager=1]="Eager",n[n.Default=1]="Default",n})(xg||{}),eM=new Map,vT=0;function yT(){return vT++}function _T(n){eM.set(n[Br],n)}function Km(n){eM.delete(n[Br])}var mx="__ngContext__";function ko(n,e){or(e)?(n[mx]=e[Br],_T(e)):n[mx]=e}function tM(n){return iM(n[Io])}function nM(n){return iM(n[ii])}function iM(n){for(;n!==null&&!yi(n);)n=n[ii];return n}var xT;function Mg(n){xT=n}var ad=new Ie("",{factory:()=>MT}),MT="ng";var cd=new Ie(""),gc=new Ie("",{providedIn:"platform",factory:()=>"unknown"});var ld=new Ie("",{factory:()=>Q($t).body?.querySelector("[ngCspNonce]")?.getAttribute("ngCspNonce")||null});var rM=!1,sM=new Ie("",{factory:()=>rM});var ST=(n,e,t,i)=>{};function bT(n,e,t,i){ST(n,e,t,i)}function Sg(n){return(n.flags&32)===32}var ET=()=>null;function oM(n,e,t=!1){return ET(n,e,t)}function aM(n,e){let t=n.contentQueries;if(t!==null){let i=Be(null);try{for(let r=0;r<t.length;r+=2){let s=t[r],o=t[r+1];if(o!==-1){let a=n.data[o];Pu(s),a.contentQueries(2,e[o],o)}}}finally{Be(i)}}}function Qm(n,e,t){Pu(0);let i=Be(null);try{e(n,t)}finally{Be(i)}}function bg(n,e,t){if(_m(e)){let i=Be(null);try{let r=e.directiveStart,s=e.directiveEnd;for(let o=r;o<s;o++){let a=n.data[o];if(a.contentQueries){let c=t[o];a.contentQueries(1,c,o)}}}finally{Be(i)}}}var bi=(function(n){return n[n.Emulated=0]="Emulated",n[n.None=2]="None",n[n.ShadowDom=3]="ShadowDom",n[n.ExperimentalIsolatedShadowDom=4]="ExperimentalIsolatedShadowDom",n})(bi||{});var eg=class{changingThisBreaksApplicationSecurity;constructor(e){this.changingThisBreaksApplicationSecurity=e}toString(){return`SafeValue must use [property]=binding: ${this.changingThisBreaksApplicationSecurity} (see ${em})`}};function Eg(n){return n instanceof eg?n.changingThisBreaksApplicationSecurity:n}var wT=/^>|^->|<!--|-->|--!>|<!-$/g,CT=/(<|>)/g,TT="\u200B$1\u200B";function DT(n){return n.replace(wT,e=>e.replace(CT,TT))}function IT(n,e){return n.createText(e)}function AT(n,e,t){n.setValue(e,t)}function RT(n,e){return n.createComment(DT(e))}function cM(n,e,t){return n.createElement(e,t)}function Ju(n,e,t,i,r){n.insertBefore(e,t,i,r)}function lM(n,e,t){n.appendChild(e,t)}function gx(n,e,t,i,r){i!==null?Ju(n,e,t,i,r):lM(n,e,t)}function NT(n,e,t,i){n.removeChild(null,e,t,i)}function PT(n,e,t){n.setAttribute(e,"style",t)}function OT(n,e,t){t===""?n.removeAttribute(e,"class"):n.setAttribute(e,"class",t)}function uM(n,e,t){let{mergedAttrs:i,classes:r,styles:s}=t;i!==null&&nT(n,e,i),r!==null&&OT(n,e,r),s!==null&&PT(n,e,s)}function dM(n){return n instanceof Function?n():n}function LT(n,e,t){let i=n.length;for(;;){let r=n.indexOf(e,t);if(r===-1)return r;if(r===0||n.charCodeAt(r-1)<=32){let s=e.length;if(r+s===i||n.charCodeAt(r+s)<=32)return r}t=r+1}}var fM="ng-template";function FT(n,e,t,i){let r=0;if(i){for(;r<e.length&&typeof e[r]=="string";r+=2)if(e[r]==="class"&&LT(e[r+1].toLowerCase(),t,0)!==-1)return!0}else if(wg(n))return!1;if(r=e.indexOf(1,r),r>-1){let s;for(;++r<e.length&&typeof(s=e[r])=="string";)if(s.toLowerCase()===t)return!0}return!1}function wg(n){return n.type===4&&n.value!==fM}function kT(n,e,t){let i=n.type===4&&!t?fM:n.value;return e===i}function UT(n,e,t){let i=4,r=n.attrs,s=r!==null?HT(r):0,o=!1;for(let a=0;a<e.length;a++){let c=e[a];if(typeof c=="number"){if(!o&&!Mi(i)&&!Mi(c))return!1;if(o&&Mi(c))continue;o=!1,i=c|i&1;continue}if(!o)if(i&4){if(i=2|i&1,c!==""&&!kT(n,c,t)||c===""&&e.length===1){if(Mi(i))return!1;o=!0}}else if(i&8){if(r===null||!FT(n,r,c,t)){if(Mi(i))return!1;o=!0}}else{let l=e[++a],u=BT(c,r,wg(n),t);if(u===-1){if(Mi(i))return!1;o=!0;continue}if(l!==""){let d;if(u>s?d="":d=r[u+1].toLowerCase(),i&2&&l!==d){if(Mi(i))return!1;o=!0}}}}return Mi(i)||o}function Mi(n){return(n&1)===0}function BT(n,e,t,i){if(e===null)return-1;let r=0;if(i||!t){let s=!1;for(;r<e.length;){let o=e[r];if(o===n)return r;if(o===3||o===6)s=!0;else if(o===1||o===2){let a=e[++r];for(;typeof a=="string";)a=e[++r];continue}else{if(o===4)break;if(o===0){r+=4;continue}}r+=s?1:2}return-1}else return zT(e,n)}function VT(n,e,t=!1){for(let i=0;i<e.length;i++)if(UT(n,e[i],t))return!0;return!1}function HT(n){for(let e=0;e<n.length;e++){let t=n[e];if(iT(t))return e}return n.length}function zT(n,e){let t=n.indexOf(4);if(t>-1)for(t++;t<n.length;){let i=n[t];if(typeof i=="number")return-1;if(i===e)return t;t++}return-1}function vx(n,e){return n?":not("+e.trim()+")":e}function GT(n){let e=n[0],t=1,i=2,r="",s=!1;for(;t<n.length;){let o=n[t];if(typeof o=="string")if(i&2){let a=n[++t];r+="["+o+(a.length>0?'="'+a+'"':"")+"]"}else i&8?r+="."+o:i&4&&(r+=" "+o);else r!==""&&!Mi(o)&&(e+=vx(s,r),r=""),i=o,s=s||!Mi(i);t++}return r!==""&&(e+=vx(s,r)),e}function jT(n){return n.map(GT).join(",")}function WT(n){let e=[],t=[],i=1,r=2;for(;i<n.length;){let s=n[i];if(typeof s=="string")r===2?s!==""&&e.push(s,n[++i]):r===8&&t.push(s);else{if(!Mi(r))break;r=s}i++}return t.length&&e.push(1,...t),e}var ci={};function Cg(n,e,t,i,r,s,o,a,c,l,u){let d=Cn+i,f=d+r,h=$T(d,f),g=typeof l=="function"?l():l;return h[Oe]={type:n,blueprint:h,template:t,queries:null,viewQuery:a,declTNode:e,data:h.slice().fill(null,d),bindingStartIndex:d,expandoStartIndex:f,hostBindingOpCodes:null,firstCreatePass:!0,firstUpdatePass:!0,staticViewQueries:!1,staticContentQueries:!1,preOrderHooks:null,preOrderCheckHooks:null,contentHooks:null,contentCheckHooks:null,viewHooks:null,viewCheckHooks:null,destroyHooks:null,cleanup:null,contentQueries:null,components:null,directiveRegistry:typeof s=="function"?s():s,pipeRegistry:typeof o=="function"?o():o,firstChild:null,schemas:c,consts:g,incompleteFirstPass:!1,ssrId:u}}function $T(n,e){let t=[];for(let i=0;i<e;i++)t.push(i<n?null:ci);return t}function qT(n){let e=n.tView;return e===null||e.incompleteFirstPass?n.tView=Cg(1,null,n.template,n.decls,n.vars,n.directiveDefs,n.pipeDefs,n.viewQuery,n.schemas,n.consts,n.id):e}function Tg(n,e,t,i,r,s,o,a,c,l,u){let d=e.blueprint.slice();return d[vi]=r,d[ke]=i|4|128|8|64|1024,(l!==null||n&&n[ke]&2048)&&(d[ke]|=2048),bm(d),d[Qt]=d[Os]=n,d[vn]=t,d[ki]=o||n&&n[ki],d[Nt]=a||n&&n[Nt],d[kr]=c||n&&n[kr]||null,d[ri]=s,d[Br]=yT(),d[tc]=u,d[ym]=l,d[si]=e.type==2?n[si]:d,d}function XT(n,e,t){let i=_i(e,n),r=qT(t),s=n[ki].rendererFactory,o=Dg(n,Tg(n,r,null,hM(t),i,e,null,s.createRenderer(i,t),null,null,null));return n[e.index]=o}function hM(n){let e=16;return n.signals?e=4096:n.onPush&&(e=64),e}function pM(n,e,t,i){if(t===0)return-1;let r=e.length;for(let s=0;s<t;s++)e.push(i),n.blueprint.push(i),n.data.push(null);return r}function Dg(n,e){return n[Io]?n[vm][ii]=e:n[Io]=e,n[vm]=e,e}function Qe(n=1){mM(kn(),lt(),ur()+n,!1)}function mM(n,e,t,i){if(!i)if((e[ke]&3)===3){let s=n.preOrderCheckHooks;s!==null&&Hu(e,s,t)}else{let s=n.preOrderHooks;s!==null&&zu(e,s,0,t)}Hr(t)}var ud=(function(n){return n[n.None=0]="None",n[n.SignalBased=1]="SignalBased",n[n.HasDecoratorInputTransform=2]="HasDecoratorInputTransform",n})(ud||{});function tg(n,e,t,i){let r=Be(null);try{let[s,o,a]=n.inputs[t],c=null;(o&ud.SignalBased)!==0&&(c=e[s][bn]),c!==null&&c.transformFn!==void 0?i=c.transformFn(i):a!==null&&(i=a.call(e,i)),n.setInput!==null?n.setInput(e,c,i,t,s):kx(e,c,s,i)}finally{Be(r)}}var Ei=(function(n){return n[n.Important=1]="Important",n[n.DashCase=2]="DashCase",n})(Ei||{}),YT;function Ig(n,e){return YT(n,e)}var kz=typeof document<"u"&&typeof document?.documentElement?.getAnimations=="function";var ng=new WeakMap,ac=new WeakSet;function ZT(n,e){let t=ng.get(n);if(!t||t.length===0)return;let i=e.parentNode,r=e.previousSibling;for(let s=t.length-1;s>=0;s--){let o=t[s],a=o.parentNode;o===e?(t.splice(s,1),ac.add(o),o.dispatchEvent(new CustomEvent("animationend",{detail:{cancel:!0}}))):(r&&o===r||a&&i&&a!==i)&&(t.splice(s,1),o.dispatchEvent(new CustomEvent("animationend",{detail:{cancel:!0}})),o.parentNode?.removeChild(o))}}function JT(n,e){let t=ng.get(n);t?t.includes(e)||t.push(e):ng.set(n,[e])}var Uo=new Set,Ag=(function(n){return n[n.CHANGE_DETECTION=0]="CHANGE_DETECTION",n[n.AFTER_NEXT_RENDER=1]="AFTER_NEXT_RENDER",n})(Ag||{}),zo=new Ie(""),yx=new Set;function Rg(n){yx.has(n)||(yx.add(n),performance?.mark?.("mark_feature_usage",{detail:{feature:n}}))}var gM=(()=>{class n{impl=null;execute(){this.impl?.execute()}static \u0275prov=Ce({token:n,providedIn:"root",factory:()=>new n})}return n})();var KT=new Ie("",{factory:()=>({queue:new Set,isScheduled:!1,scheduler:null,injector:Q(Wt)})});function vM(n,e,t){let i=n.get(KT);if(Array.isArray(e))for(let r of e)i.queue.add(r),t?.detachedLeaveAnimationFns?.push(r);else i.queue.add(e),t?.detachedLeaveAnimationFns?.push(e);i.scheduler&&i.scheduler(n)}function QT(n,e){for(let[t,i]of e)vM(n,i.animateFns)}function _x(n,e,t,i){let r=n?.[Ao]?.enter;e!==null&&r&&r.has(t.index)&&QT(i,r)}function Lo(n,e,t,i,r,s,o,a){if(r!=null){let c,l=!1;yi(r)?c=r:or(r)&&(l=!0,r=r[vi]);let u=oi(r);n===0&&i!==null?(_x(a,i,s,t),o==null?lM(e,i,u):Ju(e,i,u,o||null,!0)):n===1&&i!==null?(_x(a,i,s,t),Ju(e,i,u,o||null,!0),ZT(s,u)):n===2?(a?.[Ao]?.leave?.has(s.index)&&JT(s,u),ac.delete(u),xx(a,s,t,d=>{if(ac.has(u)){ac.delete(u);return}NT(e,u,l,d)})):n===3&&(ac.delete(u),xx(a,s,t,()=>{e.destroyNode(u)})),c!=null&&fD(e,n,t,c,s,i,o)}}function eD(n,e){yM(n,e),e[vi]=null,e[ri]=null}function tD(n,e,t,i,r,s){i[vi]=r,i[ri]=e,dd(n,i,t,1,r,s)}function yM(n,e){e[ki].changeDetectionScheduler?.notify(9),dd(n,e,e[Nt],2,null,null)}function nD(n){let e=n[Io];if(!e)return $m(n[Oe],n);for(;e;){let t=null;if(or(e))t=e[Io];else{let i=e[Tn];i&&(t=i)}if(!t){for(;e&&!e[ii]&&e!==n;)or(e)&&$m(e[Oe],e),e=e[Qt];e===null&&(e=n),or(e)&&$m(e[Oe],e),t=e&&e[ii]}e=t}}function Ng(n,e){let t=n[Fs],i=t.indexOf(e);t.splice(i,1)}function _M(n,e){if(Us(e))return;let t=e[Nt];t.destroyNode&&dd(n,e,t,3,null,null),nD(e)}function $m(n,e){if(Us(e))return;let t=Be(null);try{e[ke]&=-129,e[ke]|=256,e[Gn]&&_s(e[Gn]),sD(n,e),rD(n,e),e[Oe].type===1&&e[Nt].destroy();let i=e[Ur];if(i!==null&&yi(e[Qt])){i!==e[Qt]&&Ng(i,e);let r=e[Ui];r!==null&&r.detachView(n)}Km(e)}finally{Be(t)}}function xx(n,e,t,i){let r=n?.[Ao];if(r==null||r.leave==null||!r.leave.has(e.index))return i(!1);n&&Uo.add(n[Br]),vM(t,()=>{if(r.leave&&r.leave.has(e.index)){let o=r.leave.get(e.index),a=[];if(o){for(let c=0;c<o.animateFns.length;c++){let l=o.animateFns[c],{promise:u}=l();a.push(u)}r.detachedLeaveAnimationFns=void 0}r.running=Promise.allSettled(a),iD(n,i)}else n&&Uo.delete(n[Br]),i(!1)},r)}function iD(n,e){let t=n[Ao]?.running;if(t){t.then(()=>{n[Ao].running=void 0,Uo.delete(n[Br]),e(!0)});return}e(!1)}function rD(n,e){let t=n.cleanup,i=e[Do];if(t!==null)for(let o=0;o<t.length-1;o+=2)if(typeof t[o]=="string"){let a=t[o+3];a>=0?i[a]():i[-a].unsubscribe(),o+=2}else{let a=i[t[o+1]];t[o].call(a)}i!==null&&(e[Do]=null);let r=e[ir];if(r!==null){e[ir]=null;for(let o=0;o<r.length;o++){let a=r[o];a()}}let s=e[Pr];if(s!==null){e[Pr]=null;for(let o of s)o.destroy()}}function sD(n,e){let t;if(n!=null&&(t=n.destroyHooks)!=null)for(let i=0;i<t.length;i+=2){let r=e[t[i]];if(!(r instanceof uc)){let s=t[i+1];if(Array.isArray(s))for(let o=0;o<s.length;o+=2){let a=r[s[o]],c=s[o+1];bt(ut.LifecycleHookStart,a,c);try{c.call(a)}finally{bt(ut.LifecycleHookEnd,a,c)}}else{bt(ut.LifecycleHookStart,r,s);try{s.call(r)}finally{bt(ut.LifecycleHookEnd,r,s)}}}}}function oD(n,e,t){return aD(n,e.parent,t)}function aD(n,e,t){let i=e;for(;i!==null&&i.type&168;)e=i,i=e.parent;if(i===null)return t[vi];if(ar(i)){let{encapsulation:r}=n.data[i.directiveStart+i.componentOffset];if(r===bi.None||r===bi.Emulated)return null}return _i(i,t)}function cD(n,e,t){return uD(n,e,t)}function lD(n,e,t){return n.type&40?_i(n,t):null}var uD=lD,Mx;function Pg(n,e,t,i){let r=oD(n,i,e),s=e[Nt],o=i.parent||e[ri],a=cD(o,i,e);if(r!=null)if(Array.isArray(t))for(let c=0;c<t.length;c++)gx(s,r,t[c],a,!1);else gx(s,r,t,a,!1);Mx!==void 0&&Mx(s,i,e,t,r)}function cc(n,e){if(e!==null){let t=e.type;if(t&3)return _i(e,n);if(t&4)return ig(-1,n[e.index]);if(t&8){let i=e.child;if(i!==null)return cc(n,i);{let r=n[e.index];return yi(r)?ig(-1,r):oi(r)}}else{if(t&128)return cc(n,e.next);if(t&32)return Ig(e,n)()||oi(n[e.index]);{let i=xM(n,e);if(i!==null){if(Array.isArray(i))return i[0];let r=Or(n[si]);return cc(r,i)}else return cc(n,e.next)}}}return null}function xM(n,e){if(e!==null){let i=n[si][ri],r=e.projection;return i.projection[r]}return null}function ig(n,e){let t=Tn+n+1;if(t<e.length){let i=e[t],r=i[Oe].firstChild;if(r!==null)return cc(i,r)}return e[Vr]}function Og(n,e,t,i,r,s,o){for(;t!=null;){let a=i[kr];if(t.type===128){t=t.next;continue}let c=i[t.index],l=t.type;if(o&&e===0&&(c&&ko(oi(c),i),t.flags|=2),!Sg(t))if(l&8)Og(n,e,t.child,i,r,s,!1),Lo(e,n,a,r,c,t,s,i);else if(l&32){let u=Ig(t,i),d;for(;d=u();)Lo(e,n,a,r,d,t,s,i);Lo(e,n,a,r,c,t,s,i)}else l&16?dD(n,e,i,t,r,s):Lo(e,n,a,r,c,t,s,i);t=o?t.projectionNext:t.next}}function dd(n,e,t,i,r,s){Og(t,i,n.firstChild,e,r,s,!1)}function dD(n,e,t,i,r,s){let o=t[si],c=o[ri].projection[i.projection];if(Array.isArray(c))for(let l=0;l<c.length;l++){let u=c[l];Lo(e,n,t[kr],r,u,i,s,t)}else{let l=c,u=o[Qt];Qx(i)&&(l.flags|=128),Og(n,e,l,u,r,s,!0)}}function fD(n,e,t,i,r,s,o){let a=i[Vr],c=oi(i);a!==c&&Lo(e,n,t,s,a,r,o);for(let l=Tn;l<i.length;l++){let u=i[l];dd(u[Oe],u,n,e,s,a)}}function hD(n,e,t,i,r){if(e)r?n.addClass(t,i):n.removeClass(t,i);else{let s=i.indexOf("-")===-1?void 0:Ei.DashCase;r==null?n.removeStyle(t,i,s):(typeof r=="string"&&r.endsWith("!important")&&(r=r.slice(0,-10),s|=Ei.Important),n.setStyle(t,i,r,s))}}function MM(n,e,t,i,r){let s=ur(),o=i&2;try{Hr(-1),o&&e.length>Cn&&mM(n,e,Cn,!1);let a=o?ut.TemplateUpdateStart:ut.TemplateCreateStart;bt(a,r,t),t(i,r)}finally{Hr(s);let a=o?ut.TemplateUpdateEnd:ut.TemplateCreateEnd;bt(a,r,t)}}function fd(n,e,t){MD(n,e,t),(t.flags&64)===64&&SD(n,e,t)}function hd(n,e,t=_i){let i=e.localNames;if(i!==null){let r=e.index+1;for(let s=0;s<i.length;s+=2){let o=i[s+1],a=o===-1?t(e,n):n[o];n[r++]=a}}}function pD(n,e,t,i){let s=i.get(sM,rM)||t===bi.ShadowDom||t===bi.ExperimentalIsolatedShadowDom,o=n.selectRootElement(e,s);return mD(o),o}function mD(n){gD(n)}var gD=()=>null;function vD(n){return n==="class"?"className":n==="for"?"htmlFor":n==="formaction"?"formAction":n==="innerHtml"?"innerHTML":n==="readonly"?"readOnly":n==="tabindex"?"tabIndex":n}function yD(n,e,t,i,r,s){let o=e[Oe];if(Ug(n,o,e,t,i)){ar(n)&&xD(e,n.index);return}n.type&3&&(t=vD(t)),_D(n,e,t,i,r,s)}function _D(n,e,t,i,r,s){if(n.type&3){let o=_i(n,e);i=s!=null?s(i,n.value||"",t):i,r.setProperty(o,t,i)}else n.type&12}function xD(n,e){let t=ai(e,n);t[ke]&16||(t[ke]|=64)}function MD(n,e,t){let i=t.directiveStart,r=t.directiveEnd;ar(t)&&XT(e,t,n.data[i+t.componentOffset]),n.firstCreatePass||$x(t,e);let s=t.initialInputs;for(let o=i;o<r;o++){let a=n.data[o],c=Yu(e,n,o,t);if(ko(c,e),s!==null&&CD(e,o-i,c,a,t,s),ks(a)){let l=ai(t.index,e);l[vn]=Yu(e,n,o,t)}}}function SD(n,e,t){let i=t.directiveStart,r=t.directiveEnd,s=t.index,o=q0();try{Hr(s);for(let a=i;a<r;a++){let c=n.data[a],l=e[a];Nu(a),(c.hostBindings!==null||c.hostVars!==0||c.hostAttrs!==null)&&bD(c,l)}}finally{Hr(-1),Nu(o)}}function bD(n,e){n.hostBindings!==null&&n.hostBindings(1,e)}function Lg(n,e){let t=n.directiveRegistry,i=null;if(t)for(let r=0;r<t.length;r++){let s=t[r];VT(e,s.selectors,!1)&&(i??=[],ks(s)?i.unshift(s):i.push(s))}return i}function ED(n,e,t,i,r,s){let o=_i(n,e);wD(e[Nt],o,s,n.value,t,i,r)}function wD(n,e,t,i,r,s,o){if(s==null)n.removeAttribute(e,r,t);else{let a=o==null?Ja(s):o(s,i||"",r);n.setAttribute(e,r,a,t)}}function CD(n,e,t,i,r,s){let o=s[e];if(o!==null)for(let a=0;a<o.length;a+=2){let c=o[a],l=o[a+1];tg(i,t,c,l)}}function Fg(n,e,t,i,r){let s=Cn+t,o=e[Oe],a=r(o,e,n,i,t);e[s]=a,Oo(n,!0);let c=n.type===2;return c?(uM(e[Nt],a,n),(U0()===0||Ro(n))&&ko(a,e),B0()):ko(a,e),Fu()&&(!c||!Sg(n))&&Pg(o,e,a,n),n}function kg(n){let e=n;return Nm()?z0():(e=e.parent,Oo(e,!1)),e}function TD(n,e){let t=n[kr];if(!t)return;let i;try{i=t.get(xi,null)}catch{i=null}i?.(e)}function Ug(n,e,t,i,r){let s=n.inputs?.[i],o=n.hostDirectiveInputs?.[i],a=!1;if(o)for(let c=0;c<o.length;c+=2){let l=o[c],u=o[c+1],d=e.data[l];tg(d,t[l],u,r),a=!0}if(s)for(let c of s){let l=t[c],u=e.data[c];tg(u,l,i,r),a=!0}return a}function DD(n,e){let t=ai(e,n),i=t[Oe];ID(i,t);let r=t[vi];r!==null&&t[tc]===null&&(t[tc]=oM(r,t[kr])),bt(ut.ComponentStart);try{Bg(i,t,t[vn])}finally{bt(ut.ComponentEnd,t[vn])}}function ID(n,e){for(let t=e.length;t<n.blueprint.length;t++)e.push(n.blueprint[t])}function Bg(n,e,t){Ou(e);try{let i=n.viewQuery;i!==null&&Qm(1,i,t);let r=n.template;r!==null&&MM(n,e,r,1,t),n.firstCreatePass&&(n.firstCreatePass=!1),e[Ui]?.finishViewCreation(n),n.staticContentQueries&&aM(n,e),n.staticViewQueries&&Qm(2,n.viewQuery,t);let s=n.components;s!==null&&AD(e,s)}catch(i){throw n.firstCreatePass&&(n.incompleteFirstPass=!0,n.firstCreatePass=!1),i}finally{e[ke]&=-5,Lu()}}function AD(n,e){for(let t=0;t<e.length;t++)DD(n,e[t])}function RD(n,e,t,i){let r=Be(null);try{let s=e.tView,a=n[ke]&4096?4096:16,c=Tg(n,s,t,a,null,e,null,null,i?.injector??null,i?.embeddedViewInjector??null,i?.dehydratedView??null),l=n[e.index];c[Ur]=l;let u=n[Ui];return u!==null&&(c[Ui]=u.createEmbeddedView(s)),Bg(s,c,t),c}finally{Be(r)}}function Sx(n,e){return!e||e.firstChild===null||Qx(n)}function dc(n,e,t,i,r=!1){for(;t!==null;){if(t.type===128){t=r?t.projectionNext:t.next;continue}let s=e[t.index];s!==null&&i.push(oi(s)),yi(s)&&SM(s,i);let o=t.type;if(o&8)dc(n,e,t.child,i);else if(o&32){let a=Ig(t,e),c;for(;c=a();)i.push(c)}else if(o&16){let a=xM(e,t);if(Array.isArray(a))i.push(...a);else{let c=Or(e[si]);dc(c[Oe],c,a,i,!0)}}t=r?t.projectionNext:t.next}return i}function SM(n,e){for(let t=Tn;t<n.length;t++){let i=n[t],r=i[Oe].firstChild;r!==null&&dc(i[Oe],i,r,e)}n[Vr]!==n[vi]&&e.push(n[Vr])}function bM(n){if(n[Cu]!==null){for(let e of n[Cu])e.impl.addSequence(e);n[Cu].length=0}}var EM=[];function ND(n){return n[Gn]??PD(n)}function PD(n){let e=EM.pop()??Object.create(LD);return e.lView=n,e}function OD(n){n.lView[Gn]!==n&&(n.lView=null,EM.push(n))}var LD=rt(ae({},vs),{consumerIsAlwaysLive:!0,kind:"template",consumerMarkedDirty:n=>{Po(n.lView)},consumerOnSignalRead(){this.lView[Gn]=this}});function FD(n){let e=n[Gn]??Object.create(kD);return e.lView=n,e}var kD=rt(ae({},vs),{consumerIsAlwaysLive:!0,kind:"template",consumerMarkedDirty:n=>{let e=Or(n.lView);for(;e&&!wM(e[Oe]);)e=Or(e);e&&Em(e)},consumerOnSignalRead(){this.lView[Gn]=this}});function wM(n){return n.type!==2}function CM(n){if(n[Pr]===null)return;let e=!0;for(;e;){let t=!1;for(let i of n[Pr])i.dirty&&(t=!0,i.zone===null||Zone.current===i.zone?i.run():i.zone.run(()=>i.run()));e=t&&!!(n[ke]&8192)}}var UD=100;function TM(n,e=0){let i=n[ki].rendererFactory,r=!1;r||i.begin?.();try{BD(n,e)}finally{r||i.end?.()}}function BD(n,e){let t=Pm();try{$a(!0),rg(n,e);let i=0;for(;ic(n);){if(i===UD)throw new ge(103,!1);i++,rg(n,1)}}finally{$a(t)}}function VD(n,e,t,i){if(Us(e))return;let r=e[ke],s=!1,o=!1;Ou(e);let a=!0,c=null,l=null;s||(wM(n)?(l=ND(e),c=ys(l)):kl()===null?(a=!1,l=FD(e),c=ys(l)):e[Gn]&&(_s(e[Gn]),e[Gn]=null));try{bm(e),j0(n.bindingStartIndex),t!==null&&MM(n,e,t,2,i);let u=(r&3)===3;if(!s)if(u){let h=n.preOrderCheckHooks;h!==null&&Hu(e,h,null)}else{let h=n.preOrderHooks;h!==null&&zu(e,h,0,null),jm(e,0)}if(o||HD(e),CM(e),DM(e,0),n.contentQueries!==null&&aM(n,e),!s)if(u){let h=n.contentCheckHooks;h!==null&&Hu(e,h)}else{let h=n.contentHooks;h!==null&&zu(e,h,1),jm(e,1)}GD(n,e);let d=n.components;d!==null&&AM(e,d,0);let f=n.viewQuery;if(f!==null&&Qm(2,f,i),!s)if(u){let h=n.viewCheckHooks;h!==null&&Hu(e,h)}else{let h=n.viewHooks;h!==null&&zu(e,h,2),jm(e,2)}if(n.firstUpdatePass===!0&&(n.firstUpdatePass=!1),e[wu]){for(let h of e[wu])h();e[wu]=null}s||(bM(e),e[ke]&=-73)}catch(u){throw s||Po(e),u}finally{l!==null&&(go(l,c),a&&OD(l)),Lu()}}function DM(n,e){for(let t=tM(n);t!==null;t=nM(t))for(let i=Tn;i<t.length;i++){let r=t[i];IM(r,e)}}function HD(n){for(let e=tM(n);e!==null;e=nM(e)){if(!(e[ke]&2))continue;let t=e[Fs];for(let i=0;i<t.length;i++){let r=t[i];Em(r)}}}function zD(n,e,t){bt(ut.ComponentStart);let i=ai(e,n);try{IM(i,t)}finally{bt(ut.ComponentEnd,i[vn])}}function IM(n,e){Tu(n)&&rg(n,e)}function rg(n,e){let i=n[Oe],r=n[ke],s=n[Gn],o=!!(e===0&&r&16);if(o||=!!(r&64&&e===0),o||=!!(r&1024),o||=!!(s?.dirty&&Ua(s)),o||=!1,s&&(s.dirty=!1),n[ke]&=-9217,o)VD(i,n,i.template,n[vn]);else if(r&8192){let a=Be(null);try{CM(n),DM(n,1);let c=i.components;c!==null&&AM(n,c,1),bM(n)}finally{Be(a)}}}function AM(n,e,t){for(let i=0;i<e.length;i++)zD(n,e[i],t)}function GD(n,e){let t=n.hostBindingOpCodes;if(t!==null)try{for(let i=0;i<t.length;i++){let r=t[i];if(r<0)Hr(~r);else{let s=r,o=t[++i],a=t[++i];$0(o,s);let c=e[s];bt(ut.HostBindingsUpdateStart,c);try{a(2,c)}finally{bt(ut.HostBindingsUpdateEnd,c)}}}}finally{Hr(-1)}}function Vg(n,e){let t=Pm()?64:1088;for(n[ki].changeDetectionScheduler?.notify(e);n;){n[ke]|=t;let i=Or(n);if(No(n)&&!i)return n;n=i}return null}function RM(n,e,t,i){return[n,!0,0,e,null,i,null,t,null,null]}function jD(n,e,t,i=!0){let r=e[Oe];if(WD(r,e,n,t),i){let o=ig(t,n),a=e[Nt],c=a.parentNode(n[Vr]);c!==null&&tD(r,n[ri],a,e,c,o)}let s=e[tc];s!==null&&s.firstChild!==null&&(s.firstChild=null)}function sg(n,e){if(n.length<=Tn)return;let t=Tn+e,i=n[t];if(i){let r=i[Ur];r!==null&&r!==n&&Ng(r,i),e>0&&(n[t-1][ii]=i[ii]);let s=Ka(n,Tn+e);eD(i[Oe],i);let o=s[Ui];o!==null&&o.detachView(s[Oe]),i[Qt]=null,i[ii]=null,i[ke]&=-129}return i}function WD(n,e,t,i){let r=Tn+i,s=t.length;i>0&&(t[r-1][ii]=e),i<s-Tn?(e[ii]=t[r],fm(t,Tn+i,e)):(t.push(e),e[ii]=null),e[Qt]=t;let o=e[Ur];o!==null&&t!==o&&NM(o,e);let a=e[Ui];a!==null&&a.insertView(n),Du(e),e[ke]|=128}function NM(n,e){let t=n[Fs],i=e[Qt];if(or(i))n[ke]|=2;else{let r=i[Qt][si];e[si]!==r&&(n[ke]|=2)}t===null?n[Fs]=[e]:t.push(e)}var Gr=class{_lView;_cdRefInjectingView;_appRef=null;_attachedToViewContainer=!1;exhaustive;get rootNodes(){let e=this._lView,t=e[Oe];return dc(t,e,t.firstChild,[])}constructor(e,t){this._lView=e,this._cdRefInjectingView=t}get context(){return this._lView[vn]}set context(e){this._lView[vn]=e}get destroyed(){return Us(this._lView)}destroy(){if(this._appRef)this._appRef.detachView(this);else if(this._attachedToViewContainer){let e=this._lView[Qt];if(yi(e)){let t=e[nc],i=t?t.indexOf(this):-1;i>-1&&(sg(e,i),Ka(t,i))}this._attachedToViewContainer=!1}_M(this._lView[Oe],this._lView)}onDestroy(e){wm(this._lView,e)}markForCheck(){Vg(this._cdRefInjectingView||this._lView,4)}detach(){this._lView[ke]&=-129}reattach(){Du(this._lView),this._lView[ke]|=128}detectChanges(){this._lView[ke]|=1024,TM(this._lView)}checkNoChanges(){}attachToViewContainerRef(){if(this._appRef)throw new ge(902,!1);this._attachedToViewContainer=!0}detachFromAppRef(){this._appRef=null;let e=No(this._lView),t=this._lView[Ur];t!==null&&!e&&Ng(t,this._lView),yM(this._lView[Oe],this._lView)}attachToAppRef(e){if(this._attachedToViewContainer)throw new ge(902,!1);this._appRef=e;let t=No(this._lView),i=this._lView[Ur];i!==null&&!t&&NM(i,this._lView),Du(this._lView)}};var jr=(()=>{class n{_declarationLView;_declarationTContainer;elementRef;static __NG_ELEMENT_ID__=$D;constructor(t,i,r){this._declarationLView=t,this._declarationTContainer=i,this.elementRef=r}get ssrId(){return this._declarationTContainer.tView?.ssrId||null}createEmbeddedView(t,i){return this.createEmbeddedViewImpl(t,i)}createEmbeddedViewImpl(t,i,r){let s=RD(this._declarationLView,this._declarationTContainer,t,{embeddedViewInjector:i,dehydratedView:r});return new Gr(s)}}return n})();function $D(){return Hg(Dn(),lt())}function Hg(n,e){return n.type&4?new jr(e,n,Ho(n,e)):null}function pd(n,e,t,i,r){let s=n.data[e];if(s===null)s=qD(n,e,t,i,r),W0()&&(s.flags|=32);else if(s.type&64){s.type=t,s.value=i,s.attrs=r;let o=H0();s.injectorIndex=o===null?-1:o.injectorIndex}return Oo(s,!0),s}function qD(n,e,t,i,r){let s=Rm(),o=Nm(),a=o?s:s&&s.parent,c=n.data[e]=YD(n,a,t,e,i,r);return XD(n,c,s,o),c}function XD(n,e,t,i){n.firstChild===null&&(n.firstChild=e),t!==null&&(i?t.child==null&&e.parent!==null&&(t.child=e):t.next===null&&(t.next=e,e.prev=t))}function YD(n,e,t,i,r,s){let o=e?e.injectorIndex:-1,a=0;return V0()&&(a|=128),{type:t,index:i,insertBeforeIndex:null,injectorIndex:o,directiveStart:-1,directiveEnd:-1,directiveStylingLast:-1,componentOffset:-1,controlDirectiveIndex:-1,customControlIndex:-1,propertyBindings:null,flags:a,providerIndexes:0,value:r,attrs:s,mergedAttrs:null,localNames:null,initialInputs:null,inputs:null,hostDirectiveInputs:null,outputs:null,hostDirectiveOutputs:null,directiveToIndex:null,tView:null,next:null,prev:null,projectionNext:null,child:null,parent:e,projection:null,styles:null,stylesWithoutHost:null,residualStyles:void 0,classes:null,classesWithoutHost:null,residualClasses:void 0,classBindings:0,styleBindings:0}}var ZD=()=>null;function bx(n,e){return ZD(n,e)}var PM=class{},md=class{},og=class{resolveComponentFactory(e){throw new ge(917,!1)}},vc=class{static NULL=new og},Hs=class{},zg=(()=>{class n{destroyNode=null;static __NG_ELEMENT_ID__=()=>JD()}return n})();function JD(){let n=lt(),e=Dn(),t=ai(e.index,n);return(or(t)?t:n)[Nt]}var OM=(()=>{class n{static \u0275prov=Ce({token:n,providedIn:"root",factory:()=>null})}return n})();var ju={},ag=class{injector;parentInjector;constructor(e,t){this.injector=e,this.parentInjector=t}get(e,t,i){let r=this.injector.get(e,ju,i);return r!==ju||t===ju?r:this.parentInjector.get(e,t,i)}};function Ku(n,e,t){let i=t?n.styles:null,r=t?n.classes:null,s=0;if(e!==null)for(let o=0;o<e.length;o++){let a=e[o];if(typeof a=="number")s=a;else if(s==1)r=vu(r,a);else if(s==2){let c=a,l=e[++o];i=vu(i,c+": "+l+";")}}t?n.styles=i:n.stylesWithoutHost=i,t?n.classes=r:n.classesWithoutHost=r}function In(n,e=0){let t=lt();if(t===null)return Re(n,e);let i=Dn();return Zx(i,t,On(n),e)}function LM(n,e,t,i,r){let s=i===null?null:{"":-1},o=r(n,t);if(o!==null){let a=o,c=null,l=null;for(let u of o)if(u.resolveHostDirectives!==null){[a,c,l]=u.resolveHostDirectives(o);break}eI(n,e,t,a,s,c,l)}s!==null&&i!==null&&KD(t,i,s)}function KD(n,e,t){let i=n.localNames=[];for(let r=0;r<e.length;r+=2){let s=t[e[r+1]];if(s==null)throw new ge(-301,!1);i.push(e[r],s)}}function QD(n,e,t){e.componentOffset=t,(n.components??=[]).push(e.index)}function eI(n,e,t,i,r,s,o){let a=i.length,c=null;for(let f=0;f<a;f++){let h=i[f];c===null&&ks(h)&&(c=h,QD(n,t,f)),lT($x(t,e),n,h.type)}oI(t,n.data.length,a),c?.viewProvidersResolver&&c.viewProvidersResolver(c);for(let f=0;f<a;f++){let h=i[f];h.providersResolver&&h.providersResolver(h)}let l=!1,u=!1,d=pM(n,e,a,null);a>0&&(t.directiveToIndex=new Map);for(let f=0;f<a;f++){let h=i[f];if(t.mergedAttrs=od(t.mergedAttrs,h.hostAttrs),nI(n,t,e,d,h),sI(d,h,r),o!==null&&o.has(h)){let[_,m]=o.get(h);t.directiveToIndex.set(h.type,[d,_+t.directiveStart,m+t.directiveStart])}else(s===null||!s.has(h))&&t.directiveToIndex.set(h.type,d);h.contentQueries!==null&&(t.flags|=4),(h.hostBindings!==null||h.hostAttrs!==null||h.hostVars!==0)&&(t.flags|=64);let g=h.type.prototype;!l&&(g.ngOnChanges||g.ngOnInit||g.ngDoCheck)&&((n.preOrderHooks??=[]).push(t.index),l=!0),!u&&(g.ngOnChanges||g.ngDoCheck)&&((n.preOrderCheckHooks??=[]).push(t.index),u=!0),d++}tI(n,t,s)}function tI(n,e,t){for(let i=e.directiveStart;i<e.directiveEnd;i++){let r=n.data[i];if(t===null||!t.has(r))Ex(0,e,r,i),Ex(1,e,r,i),Cx(e,i,!1);else{let s=t.get(r);wx(0,e,s,i),wx(1,e,s,i),Cx(e,i,!0)}}}function Ex(n,e,t,i){let r=n===0?t.inputs:t.outputs;for(let s in r)if(r.hasOwnProperty(s)){let o;n===0?o=e.inputs??={}:o=e.outputs??={},o[s]??=[],o[s].push(i),FM(e,s)}}function wx(n,e,t,i){let r=n===0?t.inputs:t.outputs;for(let s in r)if(r.hasOwnProperty(s)){let o=r[s],a;n===0?a=e.hostDirectiveInputs??={}:a=e.hostDirectiveOutputs??={},a[o]??=[],a[o].push(i,s),FM(e,o)}}function FM(n,e){e==="class"?n.flags|=8:e==="style"&&(n.flags|=16)}function Cx(n,e,t){let{attrs:i,inputs:r,hostDirectiveInputs:s}=n;if(i===null||!t&&r===null||t&&s===null||wg(n)){n.initialInputs??=[],n.initialInputs.push(null);return}let o=null,a=0;for(;a<i.length;){let c=i[a];if(c===0){a+=4;continue}else if(c===5){a+=2;continue}else if(typeof c=="number")break;if(!t&&r.hasOwnProperty(c)){let l=r[c];for(let u of l)if(u===e){o??=[],o.push(c,i[a+1]);break}}else if(t&&s.hasOwnProperty(c)){let l=s[c];for(let u=0;u<l.length;u+=2)if(l[u]===e){o??=[],o.push(l[u+1],i[a+1]);break}}a+=2}n.initialInputs??=[],n.initialInputs.push(o)}function nI(n,e,t,i,r){n.data[i]=r;let s=r.factory||(r.factory=Ts(r.type,!0)),o=new uc(s,ks(r),In,null);n.blueprint[i]=o,t[i]=o,iI(n,e,i,pM(n,t,r.hostVars,ci),r)}function iI(n,e,t,i,r){let s=r.hostBindings;if(s){let o=n.hostBindingOpCodes;o===null&&(o=n.hostBindingOpCodes=[]);let a=~e.index;rI(o)!=a&&o.push(a),o.push(t,i,s)}}function rI(n){let e=n.length;for(;e>0;){let t=n[--e];if(typeof t=="number"&&t<0)return t}return 0}function sI(n,e,t){if(t){if(e.exportAs)for(let i=0;i<e.exportAs.length;i++)t[e.exportAs[i]]=n;ks(e)&&(t[""]=n)}}function oI(n,e,t){n.flags|=1,n.directiveStart=e,n.directiveEnd=e+t,n.providerIndexes=e}function Gg(n,e,t,i,r,s,o,a){let c=e[Oe],l=c.consts,u=Bs(l,o),d=pd(c,n,t,i,u);return s&&LM(c,e,d,Bs(l,a),r),d.mergedAttrs=od(d.mergedAttrs,d.attrs),d.attrs!==null&&Ku(d,d.attrs,!1),d.mergedAttrs!==null&&Ku(d,d.mergedAttrs,!0),c.queries!==null&&c.queries.elementStart(c,d),d}function jg(n,e){Hx(n,e),_m(e)&&n.queries.elementEnd(e)}function aI(n,e,t,i,r,s){let o=e.consts,a=Bs(o,r),c=pd(e,n,t,i,a);if(c.mergedAttrs=od(c.mergedAttrs,c.attrs),s!=null){let l=Bs(o,s);c.localNames=[];for(let u=0;u<l.length;u+=2)c.localNames.push(l[u],-1)}return c.attrs!==null&&Ku(c,c.attrs,!1),c.mergedAttrs!==null&&Ku(c,c.mergedAttrs,!0),e.queries!==null&&e.queries.elementStart(e,c),c}function Wg(n){return gd(n)?Array.isArray(n)||!(n instanceof Map)&&Symbol.iterator in n:!1}function kM(n,e){if(Array.isArray(n))for(let t=0;t<n.length;t++)e(n[t]);else{let t=n[Symbol.iterator](),i;for(;!(i=t.next()).done;)e(i.value)}}function gd(n){return n!==null&&(typeof n=="function"||typeof n=="object")}function zs(n,e,t){if(t===ci)return!1;let i=n[e];return Object.is(i,t)?!1:(n[e]=t,!0)}function cI(n,e,t,i){let r=zs(n,e,t);return zs(n,e+1,i)||r}function Wu(n,e,t){return function i(r){let s=ar(n)?ai(n.index,e):e;Vg(s,5);let o=e[vn],a=Tx(e,o,t,r),c=i.__ngNextListenerFn__;for(;c;)a=Tx(e,o,c,r)&&a,c=c.__ngNextListenerFn__;return a}}function Tx(n,e,t,i){let r=Be(null);try{return bt(ut.OutputStart,e,t),t(i)!==!1}catch(s){return TD(n,s),!1}finally{bt(ut.OutputEnd,e,t),Be(r)}}function UM(n,e,t,i,r,s,o,a){let c=Ro(n),l=!1,u=null;if(!i&&c&&(u=uI(e,t,s,n.index)),u!==null){let d=u.__ngLastListenerFn__||u;d.__ngNextListenerFn__=o,u.__ngLastListenerFn__=o,l=!0}else{let d=_i(n,t),f=i?i(d):d;bT(t,f,s,a);let h=r.listen(f,s,a);if(!lI(s)){let g=i?_=>i(oi(_[n.index])):n.index;BM(g,e,t,s,a,h,!1)}}return l}function lI(n){return n.startsWith("animation")||n.startsWith("transition")}function uI(n,e,t,i){let r=n.cleanup;if(r!=null)for(let s=0;s<r.length-1;s+=2){let o=r[s];if(o===t&&r[s+1]===i){let a=e[Do],c=r[s+2];return a&&a.length>c?a[c]:null}typeof o=="string"&&(s+=2)}return null}function BM(n,e,t,i,r,s,o){let a=e.firstCreatePass?Tm(e):null,c=Cm(t),l=c.length;c.push(r,s),a&&a.push(i,n,l,(l+1)*(o?-1:1))}function Dx(n,e,t,i,r,s){let o=e[t],a=e[Oe],l=a.data[t].outputs[i],d=o[l].subscribe(s);BM(n.index,a,e,r,s,d,!0)}var cg=Symbol("BINDING");function VM(n){return n.debugInfo?.className||n.type.name||null}var Qu=class extends vc{ngModule;constructor(e){super(),this.ngModule=e}resolveComponentFactory(e){let t=Fr(e);return new Bo(t,this.ngModule)}};function dI(n){return Object.keys(n).map(e=>{let[t,i,r]=n[e],s={propName:t,templateName:e,isSignal:(i&ud.SignalBased)!==0};return r&&(s.transform=r),s})}function fI(n){return Object.keys(n).map(e=>({propName:n[e],templateName:e}))}function hI(n,e,t){let i=e instanceof Wt?e:e?.injector;return i&&n.getStandaloneInjector!==null&&(i=n.getStandaloneInjector(i)||i),i?new ag(t,i):t}function pI(n){let e=n.get(Hs,null);if(e===null)throw new ge(407,!1);let t=n.get(OM,null),i=n.get(Is,null),r=n.get(zo,null,{optional:!0});return{rendererFactory:e,sanitizer:t,changeDetectionScheduler:i,ngReflect:!1,tracingService:r}}function mI(n,e){let t=HM(n);return cM(e,t,t==="svg"?xm:t==="math"?N0:null)}function HM(n){return(n.selectors[0][0]||"div").toLowerCase()}var Bo=class extends md{componentDef;ngModule;selector;componentType;ngContentSelectors;isBoundToModule;cachedInputs=null;cachedOutputs=null;get inputs(){return this.cachedInputs??=dI(this.componentDef.inputs),this.cachedInputs}get outputs(){return this.cachedOutputs??=fI(this.componentDef.outputs),this.cachedOutputs}constructor(e,t){super(),this.componentDef=e,this.ngModule=t,this.componentType=e.type,this.selector=jT(e.selectors),this.ngContentSelectors=e.ngContentSelectors??[],this.isBoundToModule=!!t}create(e,t,i,r,s,o){bt(ut.DynamicComponentStart);let a=Be(null);try{let c=this.componentDef,l=hI(c,r||this.ngModule,e),u=pI(l),d=u.tracingService;return d&&d.componentCreate?d.componentCreate(VM(c),()=>this.createComponentRef(u,l,t,i,s,o)):this.createComponentRef(u,l,t,i,s,o)}finally{Be(a)}}createComponentRef(e,t,i,r,s,o){let a=this.componentDef,c=gI(r,a,o,s),l=e.rendererFactory.createRenderer(null,a),u=r?pD(l,r,a.encapsulation,t):mI(a,l),d=o?.some(Ix)||s?.some(g=>typeof g!="function"&&g.bindings.some(Ix)),f=Tg(null,c,null,512|hM(a),null,null,e,l,t,null,oM(u,t,!0));f[Cn]=u,Ou(f);let h=null;try{let g=Gg(Cn,f,2,"#host",()=>c.directiveRegistry,!0,0);uM(l,u,g),ko(u,f),fd(c,f,g),bg(c,g,f),jg(c,g),i!==void 0&&yI(g,this.ngContentSelectors,i),h=ai(g.index,f),f[vn]=h[vn],Bg(c,f,null)}catch(g){throw h!==null&&Km(h),Km(f),g}finally{bt(ut.DynamicComponentEnd),Lu()}return new ed(this.componentType,f,!!d)}};function gI(n,e,t,i){let r=n?["ng-version","21.2.8"]:WT(e.selectors[0]),s=null,o=null,a=0;if(t)for(let u of t)a+=u[cg].requiredVars,u.create&&(u.targetIdx=0,(s??=[]).push(u)),u.update&&(u.targetIdx=0,(o??=[]).push(u));if(i)for(let u=0;u<i.length;u++){let d=i[u];if(typeof d!="function")for(let f of d.bindings){a+=f[cg].requiredVars;let h=u+1;f.create&&(f.targetIdx=h,(s??=[]).push(f)),f.update&&(f.targetIdx=h,(o??=[]).push(f))}}let c=[e];if(i)for(let u of i){let d=typeof u=="function"?u:u.type,f=lm(d);c.push(f)}return Cg(0,null,vI(s,o),1,a,c,null,null,null,[r],null)}function vI(n,e){return!n&&!e?null:t=>{if(t&1&&n)for(let i of n)i.create();if(t&2&&e)for(let i of e)i.update()}}function Ix(n){let e=n[cg].kind;return e==="input"||e==="twoWay"}var ed=class extends PM{_rootLView;_hasInputBindings;instance;hostView;changeDetectorRef;componentType;location;previousInputValues=null;_tNode;constructor(e,t,i){super(),this._rootLView=t,this._hasInputBindings=i,this._tNode=Sm(t[Oe],Cn),this.location=Ho(this._tNode,t),this.instance=ai(this._tNode.index,t)[vn],this.hostView=this.changeDetectorRef=new Gr(t,void 0),this.componentType=e}setInput(e,t){this._hasInputBindings;let i=this._tNode;if(this.previousInputValues??=new Map,this.previousInputValues.has(e)&&Object.is(this.previousInputValues.get(e),t))return;let r=this._rootLView,s=Ug(i,r[Oe],r,e,t);this.previousInputValues.set(e,t);let o=ai(i.index,r);Vg(o,1)}get injector(){return new Vs(this._tNode,this._rootLView)}destroy(){this.hostView.destroy()}onDestroy(e){this.hostView.onDestroy(e)}};function yI(n,e,t){let i=n.projection=[];for(let r=0;r<e.length;r++){let s=t[r];i.push(s!=null&&s.length?Array.from(s):null)}}var fr=(()=>{class n{static __NG_ELEMENT_ID__=_I}return n})();function _I(){let n=Dn();return zM(n,lt())}var lg=class n extends fr{_lContainer;_hostTNode;_hostLView;constructor(e,t,i){super(),this._lContainer=e,this._hostTNode=t,this._hostLView=i}get element(){return Ho(this._hostTNode,this._hostLView)}get injector(){return new Vs(this._hostTNode,this._hostLView)}get parentInjector(){let e=_g(this._hostTNode,this._hostLView);if(Gx(e)){let t=Xu(e,this._hostLView),i=qu(e),r=t[Oe].data[i+8];return new Vs(r,t)}else return new Vs(null,this._hostLView)}clear(){for(;this.length>0;)this.remove(this.length-1)}get(e){let t=Ax(this._lContainer);return t!==null&&t[e]||null}get length(){return this._lContainer.length-Tn}createEmbeddedView(e,t,i){let r,s;typeof i=="number"?r=i:i!=null&&(r=i.index,s=i.injector);let o=bx(this._lContainer,e.ssrId),a=e.createEmbeddedViewImpl(t||{},s,o);return this.insertImpl(a,r,Sx(this._hostTNode,o)),a}createComponent(e,t,i,r,s,o,a){let c=e&&!XC(e),l;if(c)l=t;else{let m=t||{};l=m.index,i=m.injector,r=m.projectableNodes,s=m.environmentInjector||m.ngModuleRef,o=m.directives,a=m.bindings}let u=c?e:new Bo(Fr(e)),d=i||this.parentInjector;if(!s&&u.ngModule==null){let p=(c?d:this.parentInjector).get(Wt,null);p&&(s=p)}let f=Fr(u.componentType??{}),h=bx(this._lContainer,f?.id??null),g=h?.firstChild??null,_=u.create(d,r,g,s,o,a);return this.insertImpl(_.hostView,l,Sx(this._hostTNode,h)),_}insert(e,t){return this.insertImpl(e,t,!0)}insertImpl(e,t,i){let r=e._lView;if(O0(r)){let a=this.indexOf(e);if(a!==-1)this.detach(a);else{let c=r[Qt],l=new n(c,c[ri],c[Qt]);l.detach(l.indexOf(e))}}let s=this._adjustIndex(t),o=this._lContainer;return jD(o,r,s,i),e.attachToViewContainerRef(),fm(qm(o),s,e),e}move(e,t){return this.insert(e,t)}indexOf(e){let t=Ax(this._lContainer);return t!==null?t.indexOf(e):-1}remove(e){let t=this._adjustIndex(e,-1),i=sg(this._lContainer,t);i&&(Ka(qm(this._lContainer),t),_M(i[Oe],i))}detach(e){let t=this._adjustIndex(e,-1),i=sg(this._lContainer,t);return i&&Ka(qm(this._lContainer),t)!=null?new Gr(i):null}_adjustIndex(e,t=0){return e??this.length+t}};function Ax(n){return n[nc]}function qm(n){return n[nc]||(n[nc]=[])}function zM(n,e){let t,i=e[n.index];return yi(i)?t=i:(t=RM(i,e,null,n),e[n.index]=t,Dg(e,t)),MI(t,e,n,i),new lg(t,n,e)}function xI(n,e){let t=n[Nt],i=t.createComment(""),r=_i(e,n),s=t.parentNode(r);return Ju(t,s,i,t.nextSibling(r),!1),i}var MI=EI,SI=()=>!1;function bI(n,e,t){return SI(n,e,t)}function EI(n,e,t,i){if(n[Vr])return;let r;t.type&8?r=oi(i):r=xI(e,t),n[Vr]=r}var ug=class n{queryList;matches=null;constructor(e){this.queryList=e}clone(){return new n(this.queryList)}setDirty(){this.queryList.setDirty()}},dg=class n{queries;constructor(e=[]){this.queries=e}createEmbeddedView(e){let t=e.queries;if(t!==null){let i=e.contentQueries!==null?e.contentQueries[0]:t.length,r=[];for(let s=0;s<i;s++){let o=t.getByIndex(s),a=this.queries[o.indexInDeclarationView];r.push(a.clone())}return new n(r)}return null}insertView(e){this.dirtyQueriesWithMatches(e)}detachView(e){this.dirtyQueriesWithMatches(e)}finishViewCreation(e){this.dirtyQueriesWithMatches(e)}dirtyQueriesWithMatches(e){for(let t=0;t<this.queries.length;t++)$g(e,t).matches!==null&&this.queries[t].setDirty()}},fg=class{flags;read;predicate;constructor(e,t,i=null){this.flags=t,this.read=i,typeof e=="string"?this.predicate=NI(e):this.predicate=e}},hg=class n{queries;constructor(e=[]){this.queries=e}elementStart(e,t){for(let i=0;i<this.queries.length;i++)this.queries[i].elementStart(e,t)}elementEnd(e){for(let t=0;t<this.queries.length;t++)this.queries[t].elementEnd(e)}embeddedTView(e){let t=null;for(let i=0;i<this.length;i++){let r=t!==null?t.length:0,s=this.getByIndex(i).embeddedTView(e,r);s&&(s.indexInDeclarationView=i,t!==null?t.push(s):t=[s])}return t!==null?new n(t):null}template(e,t){for(let i=0;i<this.queries.length;i++)this.queries[i].template(e,t)}getByIndex(e){return this.queries[e]}get length(){return this.queries.length}track(e){this.queries.push(e)}},pg=class n{metadata;matches=null;indexInDeclarationView=-1;crossesNgTemplate=!1;_declarationNodeIndex;_appliesToNextNode=!0;constructor(e,t=-1){this.metadata=e,this._declarationNodeIndex=t}elementStart(e,t){this.isApplyingToNode(t)&&this.matchTNode(e,t)}elementEnd(e){this._declarationNodeIndex===e.index&&(this._appliesToNextNode=!1)}template(e,t){this.elementStart(e,t)}embeddedTView(e,t){return this.isApplyingToNode(e)?(this.crossesNgTemplate=!0,this.addMatch(-e.index,t),new n(this.metadata)):null}isApplyingToNode(e){if(this._appliesToNextNode&&(this.metadata.flags&1)!==1){let t=this._declarationNodeIndex,i=e.parent;for(;i!==null&&i.type&8&&i.index!==t;)i=i.parent;return t===(i!==null?i.index:-1)}return this._appliesToNextNode}matchTNode(e,t){let i=this.metadata.predicate;if(Array.isArray(i))for(let r=0;r<i.length;r++){let s=i[r];this.matchTNodeWithReadOption(e,t,wI(t,s)),this.matchTNodeWithReadOption(e,t,Gu(t,e,s,!1,!1))}else i===jr?t.type&4&&this.matchTNodeWithReadOption(e,t,-1):this.matchTNodeWithReadOption(e,t,Gu(t,e,i,!1,!1))}matchTNodeWithReadOption(e,t,i){if(i!==null){let r=this.metadata.read;if(r!==null)if(r===Ws||r===fr||r===jr&&t.type&4)this.addMatch(t.index,-2);else{let s=Gu(t,e,r,!1,!1);s!==null&&this.addMatch(t.index,s)}else this.addMatch(t.index,i)}}addMatch(e,t){this.matches===null?this.matches=[e,t]:this.matches.push(e,t)}};function wI(n,e){let t=n.localNames;if(t!==null){for(let i=0;i<t.length;i+=2)if(t[i]===e)return t[i+1]}return null}function CI(n,e){return n.type&11?Ho(n,e):n.type&4?Hg(n,e):null}function TI(n,e,t,i){return t===-1?CI(e,n):t===-2?DI(n,e,i):Yu(n,n[Oe],t,e)}function DI(n,e,t){if(t===Ws)return Ho(e,n);if(t===jr)return Hg(e,n);if(t===fr)return zM(e,n)}function GM(n,e,t,i){let r=e[Ui].queries[i];if(r.matches===null){let s=n.data,o=t.matches,a=[];for(let c=0;o!==null&&c<o.length;c+=2){let l=o[c];if(l<0)a.push(null);else{let u=s[l];a.push(TI(e,u,o[c+1],t.metadata.read))}}r.matches=a}return r.matches}function mg(n,e,t,i){let r=n.queries.getByIndex(t),s=r.matches;if(s!==null){let o=GM(n,e,r,t);for(let a=0;a<s.length;a+=2){let c=s[a];if(c>0)i.push(o[a/2]);else{let l=s[a+1],u=e[-c];for(let d=Tn;d<u.length;d++){let f=u[d];f[Ur]===f[Qt]&&mg(f[Oe],f,l,i)}if(u[Fs]!==null){let d=u[Fs];for(let f=0;f<d.length;f++){let h=d[f];mg(h[Oe],h,l,i)}}}}}return i}function II(n,e){return n[Ui].queries[e].queryList}function AI(n,e,t){let i=new Zu((t&4)===4);return k0(n,e,i,i.destroy),(e[Ui]??=new dg).queries.push(new ug(i))-1}function RI(n,e,t){let i=kn();return i.firstCreatePass&&(PI(i,new fg(n,e,t),-1),(e&2)===2&&(i.staticViewQueries=!0)),AI(i,lt(),e)}function NI(n){return n.split(",").map(e=>e.trim())}function PI(n,e,t){n.queries===null&&(n.queries=new hg),n.queries.track(new pg(e,t))}function $g(n,e){return n.queries.getByIndex(e)}function OI(n,e){let t=n[Oe],i=$g(t,e);return i.crossesNgTemplate?mg(t,n,e,[]):GM(t,n,i,e)}var Gs=class{},vd=class{};var td=class extends Gs{ngModuleType;_parent;_bootstrapComponents=[];_r3Injector;instance;destroyCbs=[];componentFactoryResolver=new Qu(this);constructor(e,t,i,r=!0){super(),this.ngModuleType=e,this._parent=t;let s=cm(e);this._bootstrapComponents=dM(s.bootstrap),this._r3Injector=Um(e,t,[{provide:Gs,useValue:this},{provide:vc,useValue:this.componentFactoryResolver},...i],Ya(e),new Set(["environment"])),r&&this.resolveInjectorInitializers()}resolveInjectorInitializers(){this._r3Injector.resolveInjectorInitializers(),this.instance=this._r3Injector.get(this.ngModuleType)}get injector(){return this._r3Injector}destroy(){let e=this._r3Injector;!e.destroyed&&e.destroy(),this.destroyCbs.forEach(t=>t()),this.destroyCbs=null}onDestroy(e){this.destroyCbs.push(e)}},nd=class extends vd{moduleType;constructor(e){super(),this.moduleType=e}create(e){return new td(this.moduleType,e,[])}};var fc=class extends Gs{injector;componentFactoryResolver=new Qu(this);instance=null;constructor(e){super();let t=new Ds([...e.providers,{provide:Gs,useValue:this},{provide:vc,useValue:this.componentFactoryResolver}],e.parent||ec(),e.debugName,new Set(["environment"]));this.injector=t,e.runEnvironmentInitializers&&t.resolveInjectorInitializers()}destroy(){this.injector.destroy()}onDestroy(e){this.injector.onDestroy(e)}};function yc(n,e,t=null){return new fc({providers:n,parent:e,debugName:t,runEnvironmentInitializers:!0}).injector}var LI=(()=>{class n{_injector;cachedInjectors=new Map;constructor(t){this._injector=t}getOrCreateStandaloneInjector(t){if(!t.standalone)return null;if(!this.cachedInjectors.has(t)){let i=mm(!1,t.type),r=i.length>0?yc([i],this._injector,""):null;this.cachedInjectors.set(t,r)}return this.cachedInjectors.get(t)}ngOnDestroy(){try{for(let t of this.cachedInjectors.values())t!==null&&t.destroy()}finally{this.cachedInjectors.clear()}}static \u0275prov=Ce({token:n,providedIn:"environment",factory:()=>new n(Re(Wt))})}return n})();function wi(n){return pc(()=>{let e=jM(n),t=rt(ae({},e),{decls:n.decls,vars:n.vars,template:n.template,consts:n.consts||null,ngContentSelectors:n.ngContentSelectors,onPush:n.changeDetection===xg.OnPush,directiveDefs:null,pipeDefs:null,dependencies:e.standalone&&n.dependencies||null,getStandaloneInjector:e.standalone?r=>r.get(LI).getOrCreateStandaloneInjector(t):null,getExternalStyles:null,signals:n.signals??!1,data:n.data||{},encapsulation:n.encapsulation||bi.Emulated,styles:n.styles||Ln,_:null,schemas:n.schemas||null,tView:null,id:""});e.standalone&&Rg("NgStandalone"),WM(t);let i=n.dependencies;return t.directiveDefs=Rx(i,FI),t.pipeDefs=Rx(i,y0),t.id=BI(t),t})}function FI(n){return Fr(n)||lm(n)}function Go(n){return pc(()=>({type:n.type,bootstrap:n.bootstrap||Ln,declarations:n.declarations||Ln,imports:n.imports||Ln,exports:n.exports||Ln,transitiveCompileScopes:null,schemas:n.schemas||null,id:n.id||null}))}function kI(n,e){if(n==null)return Ns;let t={};for(let i in n)if(n.hasOwnProperty(i)){let r=n[i],s,o,a,c;Array.isArray(r)?(a=r[0],s=r[1],o=r[2]??s,c=r[3]||null):(s=r,o=r,a=ud.None,c=null),t[s]=[i,a,c],e[s]=o}return t}function UI(n){if(n==null)return Ns;let e={};for(let t in n)n.hasOwnProperty(t)&&(e[n[t]]=t);return e}function $s(n){return pc(()=>{let e=jM(n);return WM(e),e})}function jM(n){let e={};return{type:n.type,providersResolver:null,viewProvidersResolver:null,factory:null,hostBindings:n.hostBindings||null,hostVars:n.hostVars||0,hostAttrs:n.hostAttrs||null,contentQueries:n.contentQueries||null,declaredInputs:e,inputConfig:n.inputs||Ns,exportAs:n.exportAs||null,standalone:n.standalone??!0,signals:n.signals===!0,selectors:n.selectors||Ln,viewQuery:n.viewQuery||null,features:n.features||null,setInput:null,resolveHostDirectives:null,hostDirectives:null,controlDef:null,inputs:kI(n.inputs,e),outputs:UI(n.outputs),debugInfo:null}}function WM(n){n.features?.forEach(e=>e(n))}function Rx(n,e){return n?()=>{let t=typeof n=="function"?n():n,i=[];for(let r of t){let s=e(r);s!==null&&i.push(s)}return i}:null}function BI(n){let e=0,t=typeof n.consts=="function"?"":n.consts,i=[n.selectors,n.ngContentSelectors,n.hostVars,n.hostAttrs,t,n.vars,n.decls,n.encapsulation,n.standalone,n.signals,n.exportAs,JSON.stringify(n.inputs),JSON.stringify(n.outputs),Object.getOwnPropertyNames(n.type.prototype),!!n.contentQueries,!!n.viewQuery];for(let s of i.join("|"))e=Math.imul(31,e)+s.charCodeAt(0)<<0;return e+=2147483648,"c"+e}function VI(n,e,t,i,r,s,o,a){if(t.firstCreatePass){n.mergedAttrs=od(n.mergedAttrs,n.attrs);let u=n.tView=Cg(2,n,r,s,o,t.directiveRegistry,t.pipeRegistry,null,t.schemas,t.consts,null);t.queries!==null&&(t.queries.template(t,n),u.queries=t.queries.embeddedTView(n))}a&&(n.flags|=a),Oo(n,!1);let c=zI(t,e,n,i);Fu()&&Pg(t,e,c,n),ko(c,e);let l=RM(c,e,c,n);e[i+Cn]=l,Dg(e,l),bI(l,n,e)}function HI(n,e,t,i,r,s,o,a,c,l,u){let d=t+Cn,f;return e.firstCreatePass?(f=pd(e,d,4,o||null,a||null),Iu()&&LM(e,n,f,Bs(e.consts,l),Lg),Hx(e,f)):f=e.data[d],VI(f,n,e,t,i,r,s,c),Ro(f)&&fd(e,n,f),l!=null&&hd(n,f,u),f}function Vi(n,e,t,i,r,s,o,a){let c=lt(),l=kn(),u=Bs(l.consts,s);return HI(c,l,n,e,t,i,r,u,void 0,o,a),Vi}var zI=GI;function GI(n,e,t,i){return sc(!0),e[Nt].createComment("")}var qg=(()=>{class n{log(t){console.log(t)}warn(t){console.warn(t)}static \u0275fac=function(i){return new(i||n)};static \u0275prov=Ce({token:n,factory:n.\u0275fac,providedIn:"platform"})}return n})();var Xg=new Ie("");function jo(n){return!!n&&typeof n.then=="function"}function Yg(n){return!!n&&typeof n.subscribe=="function"}var Zg=new Ie("");function yd(n){return sr([{provide:Zg,multi:!0,useValue:n}])}var Jg=(()=>{class n{resolve;reject;initialized=!1;done=!1;donePromise=new Promise((t,i)=>{this.resolve=t,this.reject=i});appInits=Q(Zg,{optional:!0})??[];injector=Q(Fn);constructor(){}runInitializers(){if(this.initialized)return;let t=[];for(let r of this.appInits){let s=gn(this.injector,r);if(jo(s))t.push(s);else if(Yg(s)){let o=new Promise((a,c)=>{s.subscribe({complete:a,error:c})});t.push(o)}}let i=()=>{this.done=!0,this.resolve()};Promise.all(t).then(()=>{i()}).catch(r=>{this.reject(r)}),t.length===0&&i(),this.initialized=!0}static \u0275fac=function(i){return new(i||n)};static \u0275prov=Ce({token:n,factory:n.\u0275fac,providedIn:"root"})}return n})(),_d=new Ie("");function $M(){Ep(()=>{let n="";throw new ge(600,n)})}function qM(n){return n.isBoundToModule}var jI=10;var hr=(()=>{class n{_runningTick=!1;_destroyed=!1;_destroyListeners=[];_views=[];internalErrorHandler=Q(xi);afterRenderManager=Q(gM);zonelessEnabled=Q(oc);rootEffectScheduler=Q(Uu);dirtyFlags=0;tracingSnapshot=null;allTestViews=new Set;autoDetectTestViews=new Set;includeAllTestViews=!1;afterTick=new Ut;get allViews(){return[...(this.includeAllTestViews?this.allTestViews:this.autoDetectTestViews).keys(),...this._views]}get destroyed(){return this._destroyed}componentTypes=[];components=[];internalPendingTask=Q(zr);get isStable(){return this.internalPendingTask.hasPendingTasksObservable.pipe(_t(t=>!t))}constructor(){Q(zo,{optional:!0})}whenStable(){let t;return new Promise(i=>{t=this.isStable.subscribe({next:r=>{r&&i()}})}).finally(()=>{t.unsubscribe()})}_injector=Q(Wt);_rendererFactory=null;get injector(){return this._injector}bootstrap(t,i){return this.bootstrapImpl(t,i)}bootstrapImpl(t,i,r=Fn.NULL){return this._injector.get(Bt).run(()=>{bt(ut.BootstrapComponentStart);let o=t instanceof md;if(!this._injector.get(Jg).done){let g="";throw new ge(405,g)}let c;o?c=t:c=this._injector.get(vc).resolveComponentFactory(t),this.componentTypes.push(c.componentType);let l=qM(c)?void 0:this._injector.get(Gs),u=i||c.selector,d=c.create(r,[],u,l),f=d.location.nativeElement,h=d.injector.get(Xg,null);return h?.registerApplication(f),d.onDestroy(()=>{this.detachView(d.hostView),lc(this.components,d),h?.unregisterApplication(f)}),this._loadComponent(d),bt(ut.BootstrapComponentEnd,d),d})}tick(){this.zonelessEnabled||(this.dirtyFlags|=1),this._tick()}_tick(){bt(ut.ChangeDetectionStart),this.tracingSnapshot!==null?this.tracingSnapshot.run(Ag.CHANGE_DETECTION,this.tickImpl):this.tickImpl()}tickImpl=()=>{if(this._runningTick)throw bt(ut.ChangeDetectionEnd),new ge(101,!1);let t=Be(null);try{this._runningTick=!0,this.synchronize()}finally{this._runningTick=!1,this.tracingSnapshot?.dispose(),this.tracingSnapshot=null,Be(t),this.afterTick.next(),bt(ut.ChangeDetectionEnd)}};synchronize(){this._rendererFactory===null&&!this._injector.destroyed&&(this._rendererFactory=this._injector.get(Hs,null,{optional:!0}));let t=0;for(;this.dirtyFlags!==0&&t++<jI;){bt(ut.ChangeDetectionSyncStart);try{this.synchronizeOnce()}finally{bt(ut.ChangeDetectionSyncEnd)}}}synchronizeOnce(){this.dirtyFlags&16&&(this.dirtyFlags&=-17,this.rootEffectScheduler.flush());let t=!1;if(this.dirtyFlags&7){let i=!!(this.dirtyFlags&1);this.dirtyFlags&=-8,this.dirtyFlags|=8;for(let{_lView:r}of this.allViews){if(!i&&!ic(r))continue;let s=i&&!this.zonelessEnabled?0:1;TM(r,s),t=!0}if(this.dirtyFlags&=-5,this.syncDirtyFlagsWithViews(),this.dirtyFlags&23)return}t||(this._rendererFactory?.begin?.(),this._rendererFactory?.end?.()),this.dirtyFlags&8&&(this.dirtyFlags&=-9,this.afterRenderManager.execute()),this.syncDirtyFlagsWithViews()}syncDirtyFlagsWithViews(){if(this.allViews.some(({_lView:t})=>ic(t))){this.dirtyFlags|=2;return}else this.dirtyFlags&=-8}attachView(t){let i=t;this._views.push(i),i.attachToAppRef(this)}detachView(t){let i=t;lc(this._views,i),i.detachFromAppRef()}_loadComponent(t){this.attachView(t.hostView);try{this.tick()}catch(r){this.internalErrorHandler(r)}this.components.push(t),this._injector.get(_d,[]).forEach(r=>r(t))}ngOnDestroy(){if(!this._destroyed)try{this._destroyListeners.forEach(t=>t()),this._views.slice().forEach(t=>t.destroy())}finally{this._destroyed=!0,this._views=[],this._destroyListeners=[]}}onDestroy(t){return this._destroyListeners.push(t),()=>lc(this._destroyListeners,t)}destroy(){if(this._destroyed)throw new ge(406,!1);let t=this._injector;t.destroy&&!t.destroyed&&t.destroy()}get viewCount(){return this._views.length}static \u0275fac=function(i){return new(i||n)};static \u0275prov=Ce({token:n,factory:n.\u0275fac,providedIn:"root"})}return n})();function lc(n,e){let t=n.indexOf(e);t>-1&&n.splice(t,1)}function xd(n,e,t,i){let r=lt(),s=Au();if(zs(r,s,e)){let o=kn(),a=km();ED(a,r,n,e,t,i)}return xd}function qt(n,e,t){let i=lt(),r=Au();if(zs(i,r,e)){let s=kn(),o=km();yD(o,i,n,e,i[Nt],t)}return qt}function gg(n,e,t,i,r){Ug(e,n,t,r?"class":"style",i)}function tt(n,e,t,i){let r=lt(),s=r[Oe],o=n+Cn,a=s.firstCreatePass?Gg(o,r,2,e,Lg,Iu(),t,i):s.data[o];if(ar(a)){let c=r[ki].tracingService;if(c&&c.componentCreate){let l=s.data[a.directiveStart+a.componentOffset];return c.componentCreate(VM(l),()=>(Nx(n,e,r,a,i),tt))}}return Nx(n,e,r,a,i),tt}function Nx(n,e,t,i,r){if(Fg(i,t,n,e,XM),Ro(i)){let s=t[Oe];fd(s,t,i),bg(s,i,t)}r!=null&&hd(t,i)}function mt(){let n=kn(),e=Dn(),t=kg(e);return n.firstCreatePass&&jg(n,t),Im(t)&&Am(),Dm(),t.classesWithoutHost!=null&&eT(t)&&gg(n,t,lt(),t.classesWithoutHost,!0),t.stylesWithoutHost!=null&&tT(t)&&gg(n,t,lt(),t.stylesWithoutHost,!1),mt}function Un(n,e,t,i){return tt(n,e,t,i),mt(),Un}function en(n,e,t,i){let r=lt(),s=r[Oe],o=n+Cn,a=s.firstCreatePass?aI(o,s,2,e,t,i):s.data[o];return Fg(a,r,n,e,XM),i!=null&&hd(r,a),en}function tn(){let n=Dn(),e=kg(n);return Im(e)&&Am(),Dm(),tn}var XM=(n,e,t,i,r)=>(sc(!0),cM(e[Nt],i,Q0()));function Md(n,e,t){let i=lt(),r=i[Oe],s=n+Cn,o=r.firstCreatePass?Gg(s,i,8,"ng-container",Lg,Iu(),e,t):r.data[s];if(Fg(o,i,n,"ng-container",WI),Ro(o)){let a=i[Oe];fd(a,i,o),bg(a,o,i)}return t!=null&&hd(i,o),Md}function Sd(){let n=kn(),e=Dn(),t=kg(e);return n.firstCreatePass&&jg(n,t),Sd}var WI=(n,e,t,i,r)=>(sc(!0),RT(e[Nt],""));function Wo(){return lt()}var _c="en-US";var $I=_c;function YM(n){typeof n=="string"&&($I=n.toLowerCase().replace(/_/g,"-"))}function jn(n,e,t){let i=lt(),r=kn(),s=Dn();return qI(r,i,i[Nt],s,n,e,t),jn}function xc(n,e,t){let i=lt(),r=kn(),s=Dn();return(s.type&3||t)&&UM(s,r,i,t,i[Nt],n,e,Wu(s,i,e)),xc}function qI(n,e,t,i,r,s,o){let a=!0,c=null;if((i.type&3||o)&&(c??=Wu(i,e,s),UM(i,n,e,o,t,r,s,c)&&(a=!1)),a){let l=i.outputs?.[r],u=i.hostDirectiveOutputs?.[r];if(u&&u.length)for(let d=0;d<u.length;d+=2){let f=u[d],h=u[d+1];c??=Wu(i,e,s),Dx(i,e,f,h,r,c)}if(l&&l.length)for(let d of l)c??=Wu(i,e,s),Dx(i,e,d,r,r,c)}}function An(n=1){return K0(n)}function bd(n,e,t){return RI(n,e,t),bd}function Ed(n){let e=lt(),t=kn(),i=Om();Pu(i+1);let r=$g(t,i);if(n.dirty&&P0(e)===((r.metadata.flags&2)===2)){if(r.matches===null)n.reset([]);else{let s=OI(e,i);n.reset(s,mT),n.notifyOnChanges()}return!0}return!1}function wd(){return II(lt(),Om())}function Vu(n,e){return n<<17|e<<2}function js(n){return n>>17&32767}function XI(n){return(n&2)==2}function YI(n,e){return n&131071|e<<17}function vg(n){return n|2}function Vo(n){return(n&131068)>>2}function Xm(n,e){return n&-131069|e<<2}function ZI(n){return(n&1)===1}function yg(n){return n|1}function JI(n,e,t,i,r,s){let o=s?e.classBindings:e.styleBindings,a=js(o),c=Vo(o);n[i]=t;let l=!1,u;if(Array.isArray(t)){let d=t;u=d[1],(u===null||To(d,u)>0)&&(l=!0)}else u=t;if(r)if(c!==0){let f=js(n[a+1]);n[i+1]=Vu(f,a),f!==0&&(n[f+1]=Xm(n[f+1],i)),n[a+1]=YI(n[a+1],i)}else n[i+1]=Vu(a,0),a!==0&&(n[a+1]=Xm(n[a+1],i)),a=i;else n[i+1]=Vu(c,0),a===0?a=i:n[c+1]=Xm(n[c+1],i),c=i;l&&(n[i+1]=vg(n[i+1])),Px(n,u,i,!0),Px(n,u,i,!1),KI(e,u,n,i,s),o=Vu(a,c),s?e.classBindings=o:e.styleBindings=o}function KI(n,e,t,i,r){let s=r?n.residualClasses:n.residualStyles;s!=null&&typeof e=="string"&&To(s,e)>=0&&(t[i+1]=yg(t[i+1]))}function Px(n,e,t,i){let r=n[t+1],s=e===null,o=i?js(r):Vo(r),a=!1;for(;o!==0&&(a===!1||s);){let c=n[o],l=n[o+1];QI(c,e)&&(a=!0,n[o+1]=i?yg(l):vg(l)),o=i?js(l):Vo(l)}a&&(n[t+1]=i?vg(r):yg(r))}function QI(n,e){return n===null||e==null||(Array.isArray(n)?n[1]:n)===e?!0:Array.isArray(n)&&typeof e=="string"?To(n,e)>=0:!1}var Si={textEnd:0,key:0,keyEnd:0,value:0,valueEnd:0};function eA(n){return n.substring(Si.key,Si.keyEnd)}function tA(n){return nA(n),ZM(n,JM(n,0,Si.textEnd))}function ZM(n,e){let t=Si.textEnd;return t===e?-1:(e=Si.keyEnd=iA(n,Si.key=e,t),JM(n,e,t))}function nA(n){Si.key=0,Si.keyEnd=0,Si.value=0,Si.valueEnd=0,Si.textEnd=n.length}function JM(n,e,t){for(;e<t&&n.charCodeAt(e)<=32;)e++;return e}function iA(n,e,t){for(;e<t&&n.charCodeAt(e)>32;)e++;return e}function Cd(n,e,t){return KM(n,e,t,!1),Cd}function $o(n,e){return KM(n,e,null,!0),$o}function Kg(n){sA(dA,rA,n,!0)}function rA(n,e){for(let t=tA(e);t>=0;t=ZM(e,t))bu(n,eA(e),!0)}function KM(n,e,t,i){let r=lt(),s=kn(),o=Ru(2);if(s.firstUpdatePass&&eS(s,n,o,i),e!==ci&&zs(r,o,e)){let a=s.data[ur()];tS(s,a,r,r[Nt],n,r[o+1]=hA(e,t),i,o)}}function sA(n,e,t,i){let r=kn(),s=Ru(2);r.firstUpdatePass&&eS(r,null,s,i);let o=lt();if(t!==ci&&zs(o,s,t)){let a=r.data[ur()];if(nS(a,i)&&!QM(r,s)){let c=i?a.classesWithoutHost:a.stylesWithoutHost;c!==null&&(t=vu(c,t||"")),gg(r,a,o,t,i)}else fA(r,a,o,o[Nt],o[s+1],o[s+1]=uA(n,e,t),i,s)}}function QM(n,e){return e>=n.expandoStartIndex}function eS(n,e,t,i){let r=n.data;if(r[t+1]===null){let s=r[ur()],o=QM(n,t);nS(s,i)&&e===null&&!o&&(e=!1),e=oA(r,s,e,i),JI(r,s,e,t,o,i)}}function oA(n,e,t,i){let r=X0(n),s=i?e.residualClasses:e.residualStyles;if(r===null)(i?e.classBindings:e.styleBindings)===0&&(t=Ym(null,n,e,t,i),t=hc(t,e.attrs,i),s=null);else{let o=e.directiveStylingLast;if(o===-1||n[o]!==r)if(t=Ym(r,n,e,t,i),s===null){let c=aA(n,e,i);c!==void 0&&Array.isArray(c)&&(c=Ym(null,n,e,c[1],i),c=hc(c,e.attrs,i),cA(n,e,i,c))}else s=lA(n,e,i)}return s!==void 0&&(i?e.residualClasses=s:e.residualStyles=s),t}function aA(n,e,t){let i=t?e.classBindings:e.styleBindings;if(Vo(i)!==0)return n[js(i)]}function cA(n,e,t,i){let r=t?e.classBindings:e.styleBindings;n[js(r)]=i}function lA(n,e,t){let i,r=e.directiveEnd;for(let s=1+e.directiveStylingLast;s<r;s++){let o=n[s].hostAttrs;i=hc(i,o,t)}return hc(i,e.attrs,t)}function Ym(n,e,t,i,r){let s=null,o=t.directiveEnd,a=t.directiveStylingLast;for(a===-1?a=t.directiveStart:a++;a<o&&(s=e[a],i=hc(i,s.hostAttrs,r),s!==n);)a++;return n!==null&&(t.directiveStylingLast=a),i}function hc(n,e,t){let i=t?1:2,r=-1;if(e!==null)for(let s=0;s<e.length;s++){let o=e[s];typeof o=="number"?r=o:r===i&&(Array.isArray(n)||(n=n===void 0?[]:["",n]),bu(n,o,t?!0:e[++s]))}return n===void 0?null:n}function uA(n,e,t){if(t==null||t==="")return Ln;let i=[],r=Eg(t);if(Array.isArray(r))for(let s=0;s<r.length;s++)n(i,r[s],!0);else if(r instanceof Set)for(let s of r)n(i,s,!0);else if(typeof r=="object")for(let s in r)r.hasOwnProperty(s)&&n(i,s,r[s]);else typeof r=="string"&&e(i,r);return i}function dA(n,e,t){let i=String(e);i!==""&&!i.includes(" ")&&bu(n,i,t)}function fA(n,e,t,i,r,s,o,a){r===ci&&(r=Ln);let c=0,l=0,u=0<r.length?r[0]:null,d=0<s.length?s[0]:null;for(;u!==null||d!==null;){let f=c<r.length?r[c+1]:void 0,h=l<s.length?s[l+1]:void 0,g=null,_;u===d?(c+=2,l+=2,f!==h&&(g=d,_=h)):d===null||u!==null&&u<d?(c+=2,g=u):(l+=2,g=d,_=h),g!==null&&tS(n,e,t,i,g,_,o,a),u=c<r.length?r[c]:null,d=l<s.length?s[l]:null}}function tS(n,e,t,i,r,s,o,a){if(!(e.type&3))return;let c=n.data,l=c[a+1],u=ZI(l)?Ox(c,e,t,r,Vo(l),o):void 0;if(!id(u)){id(s)||XI(l)&&(s=Ox(c,null,t,r,a,o));let d=Mm(ur(),t);hD(i,o,d,r,s)}}function Ox(n,e,t,i,r,s){let o=e===null,a;for(;r>0;){let c=n[r],l=Array.isArray(c),u=l?c[1]:c,d=u===null,f=t[r+1];f===ci&&(f=d?Ln:void 0);let h=d?Eu(f,i):u===i?f:void 0;if(l&&!id(h)&&(h=Eu(c,i)),id(h)&&(a=h,o))return a;let g=n[r+1];r=o?js(g):Vo(g)}if(e!==null){let c=s?e.residualClasses:e.residualStyles;c!=null&&(a=Eu(c,i))}return a}function id(n){return n!==void 0}function hA(n,e){return n==null||n===""||(typeof e=="string"?n=n+e:typeof n=="object"&&(n=Ya(Eg(n)))),n}function nS(n,e){return(n.flags&(e?8:16))!==0}function Ge(n,e=""){let t=lt(),i=kn(),r=n+Cn,s=i.firstCreatePass?pd(i,r,1,e,null):i.data[r],o=pA(i,t,s,e);t[r]=o,Fu()&&Pg(i,t,o,s),Oo(s,!1)}var pA=(n,e,t,i)=>(sc(!0),IT(e[Nt],i));function mA(n,e,t,i=""){return zs(n,Au(),t)?e+Ja(t)+i:ci}function gA(n,e,t,i,r,s=""){let o=G0(),a=cI(n,o,t,r);return Ru(2),a?e+Ja(t)+i+Ja(r)+s:ci}function dn(n){return pr("",n),dn}function pr(n,e,t){let i=lt(),r=mA(i,n,e,t);return r!==ci&&iS(i,ur(),r),pr}function Td(n,e,t,i,r){let s=lt(),o=gA(s,n,e,t,i,r);return o!==ci&&iS(s,ur(),o),Td}function iS(n,e,t){let i=Mm(e,n);AT(n[Nt],i,t)}var rd=class{ngModuleFactory;componentFactories;constructor(e,t){this.ngModuleFactory=e,this.componentFactories=t}},Qg=(()=>{class n{compileModuleSync(t){return new nd(t)}compileModuleAsync(t){return Promise.resolve(this.compileModuleSync(t))}compileModuleAndAllComponentsSync(t){let i=this.compileModuleSync(t),r=cm(t),s=dM(r.declarations).reduce((o,a)=>{let c=Fr(a);return c&&o.push(new Bo(c)),o},[]);return new rd(i,s)}compileModuleAndAllComponentsAsync(t){return Promise.resolve(this.compileModuleAndAllComponentsSync(t))}clearCache(){}clearCacheFor(t){}getModuleId(t){}static \u0275fac=function(i){return new(i||n)};static \u0275prov=Ce({token:n,factory:n.\u0275fac,providedIn:"root"})}return n})();var rS=(()=>{class n{applicationErrorHandler=Q(xi);appRef=Q(hr);taskService=Q(zr);ngZone=Q(Bt);zonelessEnabled=Q(oc);tracing=Q(zo,{optional:!0});zoneIsDefined=typeof Zone<"u"&&!!Zone.root.run;schedulerTickApplyArgs=[{data:{__scheduler_tick__:!0}}];subscriptions=new cn;angularZoneId=this.zoneIsDefined?this.ngZone._inner?.get(qa):null;scheduleInRootZone=!this.zonelessEnabled&&this.zoneIsDefined&&(Q(Gm,{optional:!0})??!1);cancelScheduledCallback=null;useMicrotaskScheduler=!1;runningTick=!1;pendingRenderTaskId=null;constructor(){this.subscriptions.add(this.appRef.afterTick.subscribe(()=>{let t=this.taskService.add();if(!this.runningTick&&(this.cleanup(),!this.zonelessEnabled||this.appRef.includeAllTestViews)){this.taskService.remove(t);return}this.switchToMicrotaskScheduler(),this.taskService.remove(t)})),this.subscriptions.add(this.ngZone.onUnstable.subscribe(()=>{this.runningTick||this.cleanup()}))}switchToMicrotaskScheduler(){this.ngZone.runOutsideAngular(()=>{let t=this.taskService.add();this.useMicrotaskScheduler=!0,queueMicrotask(()=>{this.useMicrotaskScheduler=!1,this.taskService.remove(t)})})}notify(t){if(!this.zonelessEnabled&&t===5)return;switch(t){case 0:{this.appRef.dirtyFlags|=2;break}case 3:case 2:case 4:case 5:case 1:{this.appRef.dirtyFlags|=4;break}case 6:{this.appRef.dirtyFlags|=2;break}case 12:{this.appRef.dirtyFlags|=16;break}case 13:{this.appRef.dirtyFlags|=2;break}case 11:break;default:this.appRef.dirtyFlags|=8}if(this.appRef.tracingSnapshot=this.tracing?.snapshot(this.appRef.tracingSnapshot)??null,!this.shouldScheduleTick())return;let i=this.useMicrotaskScheduler?ix:Bm;this.pendingRenderTaskId=this.taskService.add(),this.scheduleInRootZone?this.cancelScheduledCallback=Zone.root.run(()=>i(()=>this.tick())):this.cancelScheduledCallback=this.ngZone.runOutsideAngular(()=>i(()=>this.tick()))}shouldScheduleTick(){return!(this.appRef.destroyed||this.pendingRenderTaskId!==null||this.runningTick||this.appRef._runningTick||!this.zonelessEnabled&&this.zoneIsDefined&&Zone.current.get(qa+this.angularZoneId))}tick(){if(this.runningTick||this.appRef.destroyed)return;if(this.appRef.dirtyFlags===0){this.cleanup();return}!this.zonelessEnabled&&this.appRef.dirtyFlags&7&&(this.appRef.dirtyFlags|=1);let t=this.taskService.add();try{this.ngZone.run(()=>{this.runningTick=!0,this.appRef._tick()},void 0,this.schedulerTickApplyArgs)}catch(i){this.applicationErrorHandler(i)}finally{this.taskService.remove(t),this.cleanup()}}ngOnDestroy(){this.subscriptions.unsubscribe(),this.cleanup()}cleanup(){if(this.runningTick=!1,this.cancelScheduledCallback?.(),this.cancelScheduledCallback=null,this.pendingRenderTaskId!==null){let t=this.pendingRenderTaskId;this.pendingRenderTaskId=null,this.taskService.remove(t)}}static \u0275fac=function(i){return new(i||n)};static \u0275prov=Ce({token:n,factory:n.\u0275fac,providedIn:"root"})}return n})();function sS(){return[{provide:Is,useExisting:rS},{provide:Bt,useClass:Xa},{provide:oc,useValue:!0}]}function vA(){return typeof $localize<"u"&&$localize.locale||_c}var Dd=new Ie("",{factory:()=>Q(Dd,{optional:!0,skipSelf:!0})||vA()});function Ci(n){return h0(n)}function Mc(n,e){return Hl(n,e?.equal)}var dS=Symbol("InputSignalNode#UNSET"),LA=rt(ae({},zl),{transformFn:void 0,applyValueToInputSignal(n,e){yo(n,e)}});function fS(n,e){let t=Object.create(LA);t.value=n,t.transformFn=e?.transform;function i(){if(mo(t),t.value===dS){let r=null;throw new ge(-950,r)}return t.value}return i[bn]=t,i}function oS(n,e){return fS(n,e)}function FA(n){return fS(dS,n)}var hS=(oS.required=FA,oS);var ev=new Ie(""),kA=new Ie("");function Sc(n){return!n.moduleRef}function UA(n){let e=Sc(n)?n.r3Injector:n.moduleRef.injector,t=e.get(Bt);return t.run(()=>{Sc(n)?n.r3Injector.resolveInjectorInitializers():n.moduleRef.resolveInjectorInitializers();let i=e.get(xi),r;if(t.runOutsideAngular(()=>{r=t.onError.subscribe({next:i})}),Sc(n)){let s=()=>e.destroy(),o=n.platformInjector.get(ev);o.add(s),e.onDestroy(()=>{r.unsubscribe(),o.delete(s)})}else{let s=()=>n.moduleRef.destroy(),o=n.platformInjector.get(ev);o.add(s),n.moduleRef.onDestroy(()=>{lc(n.allPlatformModules,n.moduleRef),r.unsubscribe(),o.delete(s)})}return VA(i,t,()=>{let s=e.get(zr),o=s.add(),a=e.get(Jg);return a.runInitializers(),a.donePromise.then(()=>{let c=e.get(Dd,_c);if(YM(c||_c),!e.get(kA,!0))return Sc(n)?e.get(hr):(n.allPlatformModules.push(n.moduleRef),n.moduleRef);if(Sc(n)){let u=e.get(hr);return n.rootComponent!==void 0&&u.bootstrap(n.rootComponent),u}else return BA?.(n.moduleRef,n.allPlatformModules),n.moduleRef}).finally(()=>{s.remove(o)})})})}var BA;function VA(n,e,t){try{let i=t();return jo(i)?i.catch(r=>{throw e.runOutsideAngular(()=>n(r)),r}):i}catch(i){throw e.runOutsideAngular(()=>n(i)),i}}var Id=null;function HA(n=[],e){return Fn.create({name:e,providers:[{provide:Qa,useValue:"platform"},{provide:ev,useValue:new Set([()=>Id=null])},...n]})}function zA(n=[]){if(Id)return Id;let e=HA(n);return Id=e,$M(),GA(e),e}function GA(n){let e=n.get(cd,null);gn(n,()=>{e?.forEach(t=>t())})}function pS(){return!1}var jA=1e4;var A$=jA-1e3;var cv=(()=>{class n{static __NG_ELEMENT_ID__=WA}return n})();function WA(n){return $A(Dn(),lt(),(n&16)===16)}function $A(n,e,t){if(ar(n)&&!t){let i=ai(n.index,e);return new Gr(i,i)}else if(n.type&175){let i=e[si];return new Gr(i,e)}return null}var tv=class{supports(e){return Wg(e)}create(e){return new nv(e)}},qA=(n,e)=>e,nv=class{length=0;collection;_linkedRecords=null;_unlinkedRecords=null;_previousItHead=null;_itHead=null;_itTail=null;_additionsHead=null;_additionsTail=null;_movesHead=null;_movesTail=null;_removalsHead=null;_removalsTail=null;_identityChangesHead=null;_identityChangesTail=null;_trackByFn;constructor(e){this._trackByFn=e||qA}forEachItem(e){let t;for(t=this._itHead;t!==null;t=t._next)e(t)}forEachOperation(e){let t=this._itHead,i=this._removalsHead,r=0,s=null;for(;t||i;){let o=!i||t&&t.currentIndex<aS(i,r,s)?t:i,a=aS(o,r,s),c=o.currentIndex;if(o===i)r--,i=i._nextRemoved;else if(t=t._next,o.previousIndex==null)r++;else{s||(s=[]);let l=a-r,u=c-r;if(l!=u){for(let f=0;f<l;f++){let h=f<s.length?s[f]:s[f]=0,g=h+f;u<=g&&g<l&&(s[f]=h+1)}let d=o.previousIndex;s[d]=u-l}}a!==c&&e(o,a,c)}}forEachPreviousItem(e){let t;for(t=this._previousItHead;t!==null;t=t._nextPrevious)e(t)}forEachAddedItem(e){let t;for(t=this._additionsHead;t!==null;t=t._nextAdded)e(t)}forEachMovedItem(e){let t;for(t=this._movesHead;t!==null;t=t._nextMoved)e(t)}forEachRemovedItem(e){let t;for(t=this._removalsHead;t!==null;t=t._nextRemoved)e(t)}forEachIdentityChange(e){let t;for(t=this._identityChangesHead;t!==null;t=t._nextIdentityChange)e(t)}diff(e){if(e==null&&(e=[]),!Wg(e))throw new ge(900,!1);return this.check(e)?this:null}onDestroy(){}check(e){this._reset();let t=this._itHead,i=!1,r,s,o;if(Array.isArray(e)){this.length=e.length;for(let a=0;a<this.length;a++)s=e[a],o=this._trackByFn(a,s),t===null||!Object.is(t.trackById,o)?(t=this._mismatch(t,s,o,a),i=!0):(i&&(t=this._verifyReinsertion(t,s,o,a)),Object.is(t.item,s)||this._addIdentityChange(t,s)),t=t._next}else r=0,kM(e,a=>{o=this._trackByFn(r,a),t===null||!Object.is(t.trackById,o)?(t=this._mismatch(t,a,o,r),i=!0):(i&&(t=this._verifyReinsertion(t,a,o,r)),Object.is(t.item,a)||this._addIdentityChange(t,a)),t=t._next,r++}),this.length=r;return this._truncate(t),this.collection=e,this.isDirty}get isDirty(){return this._additionsHead!==null||this._movesHead!==null||this._removalsHead!==null||this._identityChangesHead!==null}_reset(){if(this.isDirty){let e;for(e=this._previousItHead=this._itHead;e!==null;e=e._next)e._nextPrevious=e._next;for(e=this._additionsHead;e!==null;e=e._nextAdded)e.previousIndex=e.currentIndex;for(this._additionsHead=this._additionsTail=null,e=this._movesHead;e!==null;e=e._nextMoved)e.previousIndex=e.currentIndex;this._movesHead=this._movesTail=null,this._removalsHead=this._removalsTail=null,this._identityChangesHead=this._identityChangesTail=null}}_mismatch(e,t,i,r){let s;return e===null?s=this._itTail:(s=e._prev,this._remove(e)),e=this._unlinkedRecords===null?null:this._unlinkedRecords.get(i,null),e!==null?(Object.is(e.item,t)||this._addIdentityChange(e,t),this._reinsertAfter(e,s,r)):(e=this._linkedRecords===null?null:this._linkedRecords.get(i,r),e!==null?(Object.is(e.item,t)||this._addIdentityChange(e,t),this._moveAfter(e,s,r)):e=this._addAfter(new iv(t,i),s,r)),e}_verifyReinsertion(e,t,i,r){let s=this._unlinkedRecords===null?null:this._unlinkedRecords.get(i,null);return s!==null?e=this._reinsertAfter(s,e._prev,r):e.currentIndex!=r&&(e.currentIndex=r,this._addToMoves(e,r)),e}_truncate(e){for(;e!==null;){let t=e._next;this._addToRemovals(this._unlink(e)),e=t}this._unlinkedRecords!==null&&this._unlinkedRecords.clear(),this._additionsTail!==null&&(this._additionsTail._nextAdded=null),this._movesTail!==null&&(this._movesTail._nextMoved=null),this._itTail!==null&&(this._itTail._next=null),this._removalsTail!==null&&(this._removalsTail._nextRemoved=null),this._identityChangesTail!==null&&(this._identityChangesTail._nextIdentityChange=null)}_reinsertAfter(e,t,i){this._unlinkedRecords!==null&&this._unlinkedRecords.remove(e);let r=e._prevRemoved,s=e._nextRemoved;return r===null?this._removalsHead=s:r._nextRemoved=s,s===null?this._removalsTail=r:s._prevRemoved=r,this._insertAfter(e,t,i),this._addToMoves(e,i),e}_moveAfter(e,t,i){return this._unlink(e),this._insertAfter(e,t,i),this._addToMoves(e,i),e}_addAfter(e,t,i){return this._insertAfter(e,t,i),this._additionsTail===null?this._additionsTail=this._additionsHead=e:this._additionsTail=this._additionsTail._nextAdded=e,e}_insertAfter(e,t,i){let r=t===null?this._itHead:t._next;return e._next=r,e._prev=t,r===null?this._itTail=e:r._prev=e,t===null?this._itHead=e:t._next=e,this._linkedRecords===null&&(this._linkedRecords=new Ad),this._linkedRecords.put(e),e.currentIndex=i,e}_remove(e){return this._addToRemovals(this._unlink(e))}_unlink(e){this._linkedRecords!==null&&this._linkedRecords.remove(e);let t=e._prev,i=e._next;return t===null?this._itHead=i:t._next=i,i===null?this._itTail=t:i._prev=t,e}_addToMoves(e,t){return e.previousIndex===t||(this._movesTail===null?this._movesTail=this._movesHead=e:this._movesTail=this._movesTail._nextMoved=e),e}_addToRemovals(e){return this._unlinkedRecords===null&&(this._unlinkedRecords=new Ad),this._unlinkedRecords.put(e),e.currentIndex=null,e._nextRemoved=null,this._removalsTail===null?(this._removalsTail=this._removalsHead=e,e._prevRemoved=null):(e._prevRemoved=this._removalsTail,this._removalsTail=this._removalsTail._nextRemoved=e),e}_addIdentityChange(e,t){return e.item=t,this._identityChangesTail===null?this._identityChangesTail=this._identityChangesHead=e:this._identityChangesTail=this._identityChangesTail._nextIdentityChange=e,e}},iv=class{item;trackById;currentIndex=null;previousIndex=null;_nextPrevious=null;_prev=null;_next=null;_prevDup=null;_nextDup=null;_prevRemoved=null;_nextRemoved=null;_nextAdded=null;_nextMoved=null;_nextIdentityChange=null;constructor(e,t){this.item=e,this.trackById=t}},rv=class{_head=null;_tail=null;add(e){this._head===null?(this._head=this._tail=e,e._nextDup=null,e._prevDup=null):(this._tail._nextDup=e,e._prevDup=this._tail,e._nextDup=null,this._tail=e)}get(e,t){let i;for(i=this._head;i!==null;i=i._nextDup)if((t===null||t<=i.currentIndex)&&Object.is(i.trackById,e))return i;return null}remove(e){let t=e._prevDup,i=e._nextDup;return t===null?this._head=i:t._nextDup=i,i===null?this._tail=t:i._prevDup=t,this._head===null}},Ad=class{map=new Map;put(e){let t=e.trackById,i=this.map.get(t);i||(i=new rv,this.map.set(t,i)),i.add(e)}get(e,t){let i=e,r=this.map.get(i);return r?r.get(e,t):null}remove(e){let t=e.trackById;return this.map.get(t).remove(e)&&this.map.delete(t),e}get isEmpty(){return this.map.size===0}clear(){this.map.clear()}};function aS(n,e,t){let i=n.previousIndex;if(i===null)return i;let r=0;return t&&i<t.length&&(r=t[i]),i+e+r}var sv=class{supports(e){return e instanceof Map||gd(e)}create(){return new ov}},ov=class{_records=new Map;_mapHead=null;_appendAfter=null;_previousMapHead=null;_changesHead=null;_changesTail=null;_additionsHead=null;_additionsTail=null;_removalsHead=null;get isDirty(){return this._additionsHead!==null||this._changesHead!==null||this._removalsHead!==null}forEachItem(e){let t;for(t=this._mapHead;t!==null;t=t._next)e(t)}forEachPreviousItem(e){let t;for(t=this._previousMapHead;t!==null;t=t._nextPrevious)e(t)}forEachChangedItem(e){let t;for(t=this._changesHead;t!==null;t=t._nextChanged)e(t)}forEachAddedItem(e){let t;for(t=this._additionsHead;t!==null;t=t._nextAdded)e(t)}forEachRemovedItem(e){let t;for(t=this._removalsHead;t!==null;t=t._nextRemoved)e(t)}diff(e){if(!e)e=new Map;else if(!(e instanceof Map||gd(e)))throw new ge(900,!1);return this.check(e)?this:null}check(e){this._reset();let t=this._mapHead;if(this._appendAfter=null,this._forEach(e,(i,r)=>{if(t&&t.key===r)this._maybeAddToChanges(t,i),this._appendAfter=t,t=t._next;else{let s=this._getOrCreateRecordForKey(r,i);t=this._insertBeforeOrAppend(t,s)}}),t){t._prev&&(t._prev._next=null),this._removalsHead=t;for(let i=t;i!==null;i=i._nextRemoved)i===this._mapHead&&(this._mapHead=null),this._records.delete(i.key),i._nextRemoved=i._next,i.previousValue=i.currentValue,i.currentValue=null,i._prev=null,i._next=null}return this._changesTail&&(this._changesTail._nextChanged=null),this._additionsTail&&(this._additionsTail._nextAdded=null),this.isDirty}_insertBeforeOrAppend(e,t){if(e){let i=e._prev;return t._next=e,t._prev=i,e._prev=t,i&&(i._next=t),e===this._mapHead&&(this._mapHead=t),this._appendAfter=e,e}return this._appendAfter?(this._appendAfter._next=t,t._prev=this._appendAfter):this._mapHead=t,this._appendAfter=t,null}_getOrCreateRecordForKey(e,t){if(this._records.has(e)){let r=this._records.get(e);this._maybeAddToChanges(r,t);let s=r._prev,o=r._next;return s&&(s._next=o),o&&(o._prev=s),r._next=null,r._prev=null,r}let i=new av(e);return this._records.set(e,i),i.currentValue=t,this._addToAdditions(i),i}_reset(){if(this.isDirty){let e;for(this._previousMapHead=this._mapHead,e=this._previousMapHead;e!==null;e=e._next)e._nextPrevious=e._next;for(e=this._changesHead;e!==null;e=e._nextChanged)e.previousValue=e.currentValue;for(e=this._additionsHead;e!=null;e=e._nextAdded)e.previousValue=e.currentValue;this._changesHead=this._changesTail=null,this._additionsHead=this._additionsTail=null,this._removalsHead=null}}_maybeAddToChanges(e,t){Object.is(t,e.currentValue)||(e.previousValue=e.currentValue,e.currentValue=t,this._addToChanges(e))}_addToAdditions(e){this._additionsHead===null?this._additionsHead=this._additionsTail=e:(this._additionsTail._nextAdded=e,this._additionsTail=e)}_addToChanges(e){this._changesHead===null?this._changesHead=this._changesTail=e:(this._changesTail._nextChanged=e,this._changesTail=e)}_forEach(e,t){e instanceof Map?e.forEach(t):Object.keys(e).forEach(i=>t(e[i],i))}},av=class{key;previousValue=null;currentValue=null;_nextPrevious=null;_next=null;_prev=null;_nextAdded=null;_nextRemoved=null;_nextChanged=null;constructor(e){this.key=e}};function cS(){return new lv([new tv])}var lv=(()=>{class n{factories;static \u0275prov=Ce({token:n,providedIn:"root",factory:cS});constructor(t){this.factories=t}static create(t,i){if(i!=null){let r=i.factories.slice();t=t.concat(r)}return new n(t)}static extend(t){return{provide:n,useFactory:()=>{let i=Q(n,{optional:!0,skipSelf:!0});return n.create(t,i||cS())}}}find(t){let i=this.factories.find(r=>r.supports(t));if(i!=null)return i;throw new ge(901,!1)}}return n})();function lS(){return new uv([new sv])}var uv=(()=>{class n{static \u0275prov=Ce({token:n,providedIn:"root",factory:lS});factories;constructor(t){this.factories=t}static create(t,i){if(i){let r=i.factories.slice();t=t.concat(r)}return new n(t)}static extend(t){return{provide:n,useFactory:()=>{let i=Q(n,{optional:!0,skipSelf:!0});return n.create(t,i||lS())}}}find(t){let i=this.factories.find(r=>r.supports(t));if(i)return i;throw new ge(901,!1)}}return n})();function mS(n){let{rootComponent:e,appProviders:t,platformProviders:i,platformRef:r}=n;bt(ut.BootstrapApplicationStart);try{let s=r?.injector??zA(i),o=[sS(),sx,...t||[]],a=new fc({providers:o,parent:s,debugName:"",runEnvironmentInitializers:!1});return UA({r3Injector:a.injector,platformInjector:s,rootComponent:e})}catch(s){return Promise.reject(s)}finally{bt(ut.BootstrapApplicationEnd)}}var gS=null;function mr(){return gS}function dv(n){gS??=n}var bc=class{},Nd=(()=>{class n{historyGo(t){throw new Error("")}static \u0275fac=function(i){return new(i||n)};static \u0275prov=Ce({token:n,factory:()=>Q(vS),providedIn:"platform"})}return n})();var vS=(()=>{class n extends Nd{_location;_history;_doc=Q($t);constructor(){super(),this._location=window.location,this._history=window.history}getBaseHrefFromDOM(){return mr().getBaseHref(this._doc)}onPopState(t){let i=mr().getGlobalEventTarget(this._doc,"window");return i.addEventListener("popstate",t,!1),()=>i.removeEventListener("popstate",t)}onHashChange(t){let i=mr().getGlobalEventTarget(this._doc,"window");return i.addEventListener("hashchange",t,!1),()=>i.removeEventListener("hashchange",t)}get href(){return this._location.href}get protocol(){return this._location.protocol}get hostname(){return this._location.hostname}get port(){return this._location.port}get pathname(){return this._location.pathname}get search(){return this._location.search}get hash(){return this._location.hash}set pathname(t){this._location.pathname=t}pushState(t,i,r){this._history.pushState(t,i,r)}replaceState(t,i,r){this._history.replaceState(t,i,r)}forward(){this._history.forward()}back(){this._history.back()}historyGo(t=0){this._history.go(t)}getState(){return this._history.state}static \u0275fac=function(i){return new(i||n)};static \u0275prov=Ce({token:n,factory:()=>new n,providedIn:"platform"})}return n})();function xS(n,e){return n?e?n.endsWith("/")?e.startsWith("/")?n+e.slice(1):n+e:e.startsWith("/")?n+e:`${n}/${e}`:n:e}function yS(n){let e=n.search(/#|\?|$/);return n[e-1]==="/"?n.slice(0,e-1)+n.slice(e):n}function Wr(n){return n&&n[0]!=="?"?`?${n}`:n}var Pd=(()=>{class n{historyGo(t){throw new Error("")}static \u0275fac=function(i){return new(i||n)};static \u0275prov=Ce({token:n,factory:()=>Q(YA),providedIn:"root"})}return n})(),XA=new Ie(""),YA=(()=>{class n extends Pd{_platformLocation;_baseHref;_removeListenerFns=[];constructor(t,i){super(),this._platformLocation=t,this._baseHref=i??this._platformLocation.getBaseHrefFromDOM()??Q($t).location?.origin??""}ngOnDestroy(){for(;this._removeListenerFns.length;)this._removeListenerFns.pop()()}onPopState(t){this._removeListenerFns.push(this._platformLocation.onPopState(t),this._platformLocation.onHashChange(t))}getBaseHref(){return this._baseHref}prepareExternalUrl(t){return xS(this._baseHref,t)}path(t=!1){let i=this._platformLocation.pathname+Wr(this._platformLocation.search),r=this._platformLocation.hash;return r&&t?`${i}${r}`:i}pushState(t,i,r,s){let o=this.prepareExternalUrl(r+Wr(s));this._platformLocation.pushState(t,i,o)}replaceState(t,i,r,s){let o=this.prepareExternalUrl(r+Wr(s));this._platformLocation.replaceState(t,i,o)}forward(){this._platformLocation.forward()}back(){this._platformLocation.back()}getState(){return this._platformLocation.getState()}historyGo(t=0){this._platformLocation.historyGo?.(t)}static \u0275fac=function(i){return new(i||n)(Re(Nd),Re(XA,8))};static \u0275prov=Ce({token:n,factory:n.\u0275fac,providedIn:"root"})}return n})();var qo=(()=>{class n{_subject=new Ut;_basePath;_locationStrategy;_urlChangeListeners=[];_urlChangeSubscription=null;constructor(t){this._locationStrategy=t;let i=this._locationStrategy.getBaseHref();this._basePath=KA(yS(_S(i))),this._locationStrategy.onPopState(r=>{this._subject.next({url:this.path(!0),pop:!0,state:r.state,type:r.type})})}ngOnDestroy(){this._urlChangeSubscription?.unsubscribe(),this._urlChangeListeners=[]}path(t=!1){return this.normalize(this._locationStrategy.path(t))}getState(){return this._locationStrategy.getState()}isCurrentPathEqualTo(t,i=""){return this.path()==this.normalize(t+Wr(i))}normalize(t){return n.stripTrailingSlash(JA(this._basePath,_S(t)))}prepareExternalUrl(t){return t&&t[0]!=="/"&&(t="/"+t),this._locationStrategy.prepareExternalUrl(t)}go(t,i="",r=null){this._locationStrategy.pushState(r,"",t,i),this._notifyUrlChangeListeners(this.prepareExternalUrl(t+Wr(i)),r)}replaceState(t,i="",r=null){this._locationStrategy.replaceState(r,"",t,i),this._notifyUrlChangeListeners(this.prepareExternalUrl(t+Wr(i)),r)}forward(){this._locationStrategy.forward()}back(){this._locationStrategy.back()}historyGo(t=0){this._locationStrategy.historyGo?.(t)}onUrlChange(t){return this._urlChangeListeners.push(t),this._urlChangeSubscription??=this.subscribe(i=>{this._notifyUrlChangeListeners(i.url,i.state)}),()=>{let i=this._urlChangeListeners.indexOf(t);this._urlChangeListeners.splice(i,1),this._urlChangeListeners.length===0&&(this._urlChangeSubscription?.unsubscribe(),this._urlChangeSubscription=null)}}_notifyUrlChangeListeners(t="",i){this._urlChangeListeners.forEach(r=>r(t,i))}subscribe(t,i,r){return this._subject.subscribe({next:t,error:i??void 0,complete:r??void 0})}static normalizeQueryParams=Wr;static joinWithSlash=xS;static stripTrailingSlash=yS;static \u0275fac=function(i){return new(i||n)(Re(Pd))};static \u0275prov=Ce({token:n,factory:()=>ZA(),providedIn:"root"})}return n})();function ZA(){return new qo(Re(Pd))}function JA(n,e){if(!n||!e.startsWith(n))return e;let t=e.substring(n.length);return t===""||["/",";","?","#"].includes(t[0])?t:e}function _S(n){return n.replace(/\/index.html$/,"")}function KA(n){if(new RegExp("^(https?:)?//").test(n)){let[,t]=n.split(/\/\/[^\/]+/);return t}return n}var Od=class{$implicit;ngForOf;index;count;constructor(e,t,i,r){this.$implicit=e,this.ngForOf=t,this.index=i,this.count=r}get first(){return this.index===0}get last(){return this.index===this.count-1}get even(){return this.index%2===0}get odd(){return!this.even}},Fd=(()=>{class n{_viewContainer;_template;_differs;set ngForOf(t){this._ngForOf=t,this._ngForOfDirty=!0}set ngForTrackBy(t){this._trackByFn=t}get ngForTrackBy(){return this._trackByFn}_ngForOf=null;_ngForOfDirty=!0;_differ=null;_trackByFn;constructor(t,i,r){this._viewContainer=t,this._template=i,this._differs=r}set ngForTemplate(t){t&&(this._template=t)}ngDoCheck(){if(this._ngForOfDirty){this._ngForOfDirty=!1;let t=this._ngForOf;!this._differ&&t&&(this._differ=this._differs.find(t).create(this.ngForTrackBy))}if(this._differ){let t=this._differ.diff(this._ngForOf);t&&this._applyChanges(t)}}_applyChanges(t){let i=this._viewContainer;t.forEachOperation((r,s,o)=>{if(r.previousIndex==null)i.createEmbeddedView(this._template,new Od(r.item,this._ngForOf,-1,-1),o===null?void 0:o);else if(o==null)i.remove(s===null?void 0:s);else if(s!==null){let a=i.get(s);i.move(a,o),MS(a,r)}});for(let r=0,s=i.length;r<s;r++){let a=i.get(r).context;a.index=r,a.count=s,a.ngForOf=this._ngForOf}t.forEachIdentityChange(r=>{let s=i.get(r.currentIndex);MS(s,r)})}static ngTemplateContextGuard(t,i){return!0}static \u0275fac=function(i){return new(i||n)(In(fr),In(jr),In(lv))};static \u0275dir=$s({type:n,selectors:[["","ngFor","","ngForOf",""]],inputs:{ngForOf:"ngForOf",ngForTrackBy:"ngForTrackBy",ngForTemplate:"ngForTemplate"}})}return n})();function MS(n,e){n.context.$implicit=e.item}var Ec=(()=>{class n{_viewContainer;_context=new Ld;_thenTemplateRef=null;_elseTemplateRef=null;_thenViewRef=null;_elseViewRef=null;constructor(t,i){this._viewContainer=t,this._thenTemplateRef=i}set ngIf(t){this._context.$implicit=this._context.ngIf=t,this._updateView()}set ngIfThen(t){SS(t,!1),this._thenTemplateRef=t,this._thenViewRef=null,this._updateView()}set ngIfElse(t){SS(t,!1),this._elseTemplateRef=t,this._elseViewRef=null,this._updateView()}_updateView(){this._context.$implicit?this._thenViewRef||(this._viewContainer.clear(),this._elseViewRef=null,this._thenTemplateRef&&(this._thenViewRef=this._viewContainer.createEmbeddedView(this._thenTemplateRef,this._context))):this._elseViewRef||(this._viewContainer.clear(),this._thenViewRef=null,this._elseTemplateRef&&(this._elseViewRef=this._viewContainer.createEmbeddedView(this._elseTemplateRef,this._context)))}static ngIfUseIfTypeGuard;static ngTemplateGuard_ngIf;static ngTemplateContextGuard(t,i){return!0}static \u0275fac=function(i){return new(i||n)(In(fr),In(jr))};static \u0275dir=$s({type:n,selectors:[["","ngIf",""]],inputs:{ngIf:"ngIf",ngIfThen:"ngIfThen",ngIfElse:"ngIfElse"}})}return n})(),Ld=class{$implicit=null;ngIf=null};function SS(n,e){if(n&&!n.createEmbeddedView)throw new ge(2020,!1)}var fv=(()=>{class n{_ngEl;_differs;_renderer;_ngStyle=null;_differ=null;constructor(t,i,r){this._ngEl=t,this._differs=i,this._renderer=r}set ngStyle(t){this._ngStyle=t,!this._differ&&t&&(this._differ=this._differs.find(t).create())}ngDoCheck(){if(this._differ){let t=this._differ.diff(this._ngStyle);t&&this._applyChanges(t)}}_setStyle(t,i){let[r,s]=t.split("."),o=r.indexOf("-")===-1?void 0:Ei.DashCase;i!=null?this._renderer.setStyle(this._ngEl.nativeElement,r,s?`${i}${s}`:i,o):this._renderer.removeStyle(this._ngEl.nativeElement,r,o)}_applyChanges(t){t.forEachRemovedItem(i=>this._setStyle(i.key,null)),t.forEachAddedItem(i=>this._setStyle(i.key,i.currentValue)),t.forEachChangedItem(i=>this._setStyle(i.key,i.currentValue))}static \u0275fac=function(i){return new(i||n)(In(Ws),In(uv),In(zg))};static \u0275dir=$s({type:n,selectors:[["","ngStyle",""]],inputs:{ngStyle:"ngStyle"}})}return n})();var $r=(()=>{class n{static \u0275fac=function(i){return new(i||n)};static \u0275mod=Go({type:n});static \u0275inj=As({})}return n})();function hv(n,e){e=encodeURIComponent(e);for(let t of n.split(";")){let i=t.indexOf("="),[r,s]=i==-1?[t,""]:[t.slice(0,i),t.slice(i+1)];if(r.trim()===e)return decodeURIComponent(s)}return null}var wc=class{};var bS="browser";var Cc=class{_doc;constructor(e){this._doc=e}manager},kd=(()=>{class n extends Cc{constructor(t){super(t)}supports(t){return!0}addEventListener(t,i,r,s){return t.addEventListener(i,r,s),()=>this.removeEventListener(t,i,r,s)}removeEventListener(t,i,r,s){return t.removeEventListener(i,r,s)}static \u0275fac=function(i){return new(i||n)(Re($t))};static \u0275prov=Ce({token:n,factory:n.\u0275fac})}return n})(),Vd=new Ie(""),vv=(()=>{class n{_zone;_plugins;_eventNameToPlugin=new Map;constructor(t,i){this._zone=i,t.forEach(o=>{o.manager=this});let r=t.filter(o=>!(o instanceof kd));this._plugins=r.slice().reverse();let s=t.find(o=>o instanceof kd);s&&this._plugins.push(s)}addEventListener(t,i,r,s){return this._findPluginFor(i).addEventListener(t,i,r,s)}getZone(){return this._zone}_findPluginFor(t){let i=this._eventNameToPlugin.get(t);if(i)return i;if(i=this._plugins.find(s=>s.supports(t)),!i)throw new ge(5101,!1);return this._eventNameToPlugin.set(t,i),i}static \u0275fac=function(i){return new(i||n)(Re(Vd),Re(Bt))};static \u0275prov=Ce({token:n,factory:n.\u0275fac})}return n})(),pv="ng-app-id";function wS(n){for(let e of n)e.remove()}function CS(n,e){let t=e.createElement("style");return t.textContent=n,t}function QA(n,e,t,i){let r=n.head?.querySelectorAll(`style[${pv}="${e}"],link[${pv}="${e}"]`);if(r)for(let s of r)s.removeAttribute(pv),s instanceof HTMLLinkElement?i.set(s.href.slice(s.href.lastIndexOf("/")+1),{usage:0,elements:[s]}):s.textContent&&t.set(s.textContent,{usage:0,elements:[s]})}function gv(n,e){let t=e.createElement("link");return t.setAttribute("rel","stylesheet"),t.setAttribute("href",n),t}var yv=(()=>{class n{doc;appId;nonce;inline=new Map;external=new Map;hosts=new Set;constructor(t,i,r,s={}){this.doc=t,this.appId=i,this.nonce=r,QA(t,i,this.inline,this.external),this.hosts.add(t.head)}addStyles(t,i){for(let r of t)this.addUsage(r,this.inline,CS);i?.forEach(r=>this.addUsage(r,this.external,gv))}removeStyles(t,i){for(let r of t)this.removeUsage(r,this.inline);i?.forEach(r=>this.removeUsage(r,this.external))}addUsage(t,i,r){let s=i.get(t);s?s.usage++:i.set(t,{usage:1,elements:[...this.hosts].map(o=>this.addElement(o,r(t,this.doc)))})}removeUsage(t,i){let r=i.get(t);r&&(r.usage--,r.usage<=0&&(wS(r.elements),i.delete(t)))}ngOnDestroy(){for(let[,{elements:t}]of[...this.inline,...this.external])wS(t);this.hosts.clear()}addHost(t){this.hosts.add(t);for(let[i,{elements:r}]of this.inline)r.push(this.addElement(t,CS(i,this.doc)));for(let[i,{elements:r}]of this.external)r.push(this.addElement(t,gv(i,this.doc)))}removeHost(t){this.hosts.delete(t)}addElement(t,i){return this.nonce&&i.setAttribute("nonce",this.nonce),t.appendChild(i)}static \u0275fac=function(i){return new(i||n)(Re($t),Re(ad),Re(ld,8),Re(gc))};static \u0275prov=Ce({token:n,factory:n.\u0275fac})}return n})(),mv={svg:"http://www.w3.org/2000/svg",xhtml:"http://www.w3.org/1999/xhtml",xlink:"http://www.w3.org/1999/xlink",xml:"http://www.w3.org/XML/1998/namespace",xmlns:"http://www.w3.org/2000/xmlns/",math:"http://www.w3.org/1998/Math/MathML"},_v=/%COMP%/g;var DS="%COMP%",eR=`_nghost-${DS}`,tR=`_ngcontent-${DS}`,nR=!0,iR=new Ie("",{factory:()=>nR});function rR(n){return tR.replace(_v,n)}function sR(n){return eR.replace(_v,n)}function IS(n,e){return e.map(t=>t.replace(_v,n))}var xv=(()=>{class n{eventManager;sharedStylesHost;appId;removeStylesOnCompDestroy;doc;ngZone;nonce;tracingService;rendererByCompId=new Map;defaultRenderer;constructor(t,i,r,s,o,a,c=null,l=null){this.eventManager=t,this.sharedStylesHost=i,this.appId=r,this.removeStylesOnCompDestroy=s,this.doc=o,this.ngZone=a,this.nonce=c,this.tracingService=l,this.defaultRenderer=new Tc(t,o,a,this.tracingService)}createRenderer(t,i){if(!t||!i)return this.defaultRenderer;let r=this.getOrCreateRenderer(t,i);return r instanceof Bd?r.applyToHost(t):r instanceof Dc&&r.applyStyles(),r}getOrCreateRenderer(t,i){let r=this.rendererByCompId,s=r.get(i.id);if(!s){let o=this.doc,a=this.ngZone,c=this.eventManager,l=this.sharedStylesHost,u=this.removeStylesOnCompDestroy,d=this.tracingService;switch(i.encapsulation){case bi.Emulated:s=new Bd(c,l,i,this.appId,u,o,a,d);break;case bi.ShadowDom:return new Ud(c,t,i,o,a,this.nonce,d,l);case bi.ExperimentalIsolatedShadowDom:return new Ud(c,t,i,o,a,this.nonce,d);default:s=new Dc(c,l,i,u,o,a,d);break}r.set(i.id,s)}return s}ngOnDestroy(){this.rendererByCompId.clear()}componentReplaced(t){this.rendererByCompId.delete(t)}static \u0275fac=function(i){return new(i||n)(Re(vv),Re(yv),Re(ad),Re(iR),Re($t),Re(Bt),Re(ld),Re(zo,8))};static \u0275prov=Ce({token:n,factory:n.\u0275fac})}return n})(),Tc=class{eventManager;doc;ngZone;tracingService;data=Object.create(null);throwOnSyntheticProps=!0;constructor(e,t,i,r){this.eventManager=e,this.doc=t,this.ngZone=i,this.tracingService=r}destroy(){}destroyNode=null;createElement(e,t){return t?this.doc.createElementNS(mv[t]||t,e):this.doc.createElement(e)}createComment(e){return this.doc.createComment(e)}createText(e){return this.doc.createTextNode(e)}appendChild(e,t){(TS(e)?e.content:e).appendChild(t)}insertBefore(e,t,i){e&&(TS(e)?e.content:e).insertBefore(t,i)}removeChild(e,t){t.remove()}selectRootElement(e,t){let i=typeof e=="string"?this.doc.querySelector(e):e;if(!i)throw new ge(-5104,!1);return t||(i.textContent=""),i}parentNode(e){return e.parentNode}nextSibling(e){return e.nextSibling}setAttribute(e,t,i,r){if(r){t=r+":"+t;let s=mv[r];s?e.setAttributeNS(s,t,i):e.setAttribute(t,i)}else e.setAttribute(t,i)}removeAttribute(e,t,i){if(i){let r=mv[i];r?e.removeAttributeNS(r,t):e.removeAttribute(`${i}:${t}`)}else e.removeAttribute(t)}addClass(e,t){e.classList.add(t)}removeClass(e,t){e.classList.remove(t)}setStyle(e,t,i,r){r&(Ei.DashCase|Ei.Important)?e.style.setProperty(t,i,r&Ei.Important?"important":""):e.style[t]=i}removeStyle(e,t,i){i&Ei.DashCase?e.style.removeProperty(t):e.style[t]=""}setProperty(e,t,i){e!=null&&(e[t]=i)}setValue(e,t){e.nodeValue=t}listen(e,t,i,r){if(typeof e=="string"&&(e=mr().getGlobalEventTarget(this.doc,e),!e))throw new ge(5102,!1);let s=this.decoratePreventDefault(i);return this.tracingService?.wrapEventListener&&(s=this.tracingService.wrapEventListener(e,t,s)),this.eventManager.addEventListener(e,t,s,r)}decoratePreventDefault(e){return t=>{if(t==="__ngUnwrap__")return e;e(t)===!1&&t.preventDefault()}}};function TS(n){return n.tagName==="TEMPLATE"&&n.content!==void 0}var Ud=class extends Tc{hostEl;sharedStylesHost;shadowRoot;constructor(e,t,i,r,s,o,a,c){super(e,r,s,a),this.hostEl=t,this.sharedStylesHost=c,this.shadowRoot=t.attachShadow({mode:"open"}),this.sharedStylesHost&&this.sharedStylesHost.addHost(this.shadowRoot);let l=i.styles;l=IS(i.id,l);for(let d of l){let f=document.createElement("style");o&&f.setAttribute("nonce",o),f.textContent=d,this.shadowRoot.appendChild(f)}let u=i.getExternalStyles?.();if(u)for(let d of u){let f=gv(d,r);o&&f.setAttribute("nonce",o),this.shadowRoot.appendChild(f)}}nodeOrShadowRoot(e){return e===this.hostEl?this.shadowRoot:e}appendChild(e,t){return super.appendChild(this.nodeOrShadowRoot(e),t)}insertBefore(e,t,i){return super.insertBefore(this.nodeOrShadowRoot(e),t,i)}removeChild(e,t){return super.removeChild(null,t)}parentNode(e){return this.nodeOrShadowRoot(super.parentNode(this.nodeOrShadowRoot(e)))}destroy(){this.sharedStylesHost&&this.sharedStylesHost.removeHost(this.shadowRoot)}},Dc=class extends Tc{sharedStylesHost;removeStylesOnCompDestroy;styles;styleUrls;constructor(e,t,i,r,s,o,a,c){super(e,s,o,a),this.sharedStylesHost=t,this.removeStylesOnCompDestroy=r;let l=i.styles;this.styles=c?IS(c,l):l,this.styleUrls=i.getExternalStyles?.(c)}applyStyles(){this.sharedStylesHost.addStyles(this.styles,this.styleUrls)}destroy(){this.removeStylesOnCompDestroy&&Uo.size===0&&this.sharedStylesHost.removeStyles(this.styles,this.styleUrls)}},Bd=class extends Dc{contentAttr;hostAttr;constructor(e,t,i,r,s,o,a,c){let l=r+"-"+i.id;super(e,t,i,s,o,a,c,l),this.contentAttr=rR(l),this.hostAttr=sR(l)}applyToHost(e){this.applyStyles(),this.setAttribute(e,this.hostAttr,"")}createElement(e,t){let i=super.createElement(e,t);return super.setAttribute(i,this.contentAttr,""),i}};var Hd=class n extends bc{supportsDOMEvents=!0;static makeCurrent(){dv(new n)}onAndCancel(e,t,i,r){return e.addEventListener(t,i,r),()=>{e.removeEventListener(t,i,r)}}dispatchEvent(e,t){e.dispatchEvent(t)}remove(e){e.remove()}createElement(e,t){return t=t||this.getDefaultDocument(),t.createElement(e)}createHtmlDocument(){return document.implementation.createHTMLDocument("fakeTitle")}getDefaultDocument(){return document}isElementNode(e){return e.nodeType===Node.ELEMENT_NODE}isShadowRoot(e){return e instanceof DocumentFragment}getGlobalEventTarget(e,t){return t==="window"?window:t==="document"?e:t==="body"?e.body:null}getBaseHref(e){let t=oR();return t==null?null:aR(t)}resetBaseElement(){Ic=null}getUserAgent(){return window.navigator.userAgent}getCookie(e){return hv(document.cookie,e)}},Ic=null;function oR(){return Ic=Ic||document.head.querySelector("base"),Ic?Ic.getAttribute("href"):null}function aR(n){return new URL(n,document.baseURI).pathname}var cR=(()=>{class n{build(){return new XMLHttpRequest}static \u0275fac=function(i){return new(i||n)};static \u0275prov=Ce({token:n,factory:n.\u0275fac})}return n})(),AS=["alt","control","meta","shift"],lR={"\b":"Backspace","	":"Tab","\x7F":"Delete","\x1B":"Escape",Del:"Delete",Esc:"Escape",Left:"ArrowLeft",Right:"ArrowRight",Up:"ArrowUp",Down:"ArrowDown",Menu:"ContextMenu",Scroll:"ScrollLock",Win:"OS"},uR={alt:n=>n.altKey,control:n=>n.ctrlKey,meta:n=>n.metaKey,shift:n=>n.shiftKey},RS=(()=>{class n extends Cc{constructor(t){super(t)}supports(t){return n.parseEventName(t)!=null}addEventListener(t,i,r,s){let o=n.parseEventName(i),a=n.eventCallback(o.fullKey,r,this.manager.getZone());return this.manager.getZone().runOutsideAngular(()=>mr().onAndCancel(t,o.domEventName,a,s))}static parseEventName(t){let i=t.toLowerCase().split("."),r=i.shift();if(i.length===0||!(r==="keydown"||r==="keyup"))return null;let s=n._normalizeKey(i.pop()),o="",a=i.indexOf("code");if(a>-1&&(i.splice(a,1),o="code."),AS.forEach(l=>{let u=i.indexOf(l);u>-1&&(i.splice(u,1),o+=l+".")}),o+=s,i.length!=0||s.length===0)return null;let c={};return c.domEventName=r,c.fullKey=o,c}static matchEventFullKeyCode(t,i){let r=lR[t.key]||t.key,s="";return i.indexOf("code.")>-1&&(r=t.code,s="code."),r==null||!r?!1:(r=r.toLowerCase(),r===" "?r="space":r==="."&&(r="dot"),AS.forEach(o=>{if(o!==r){let a=uR[o];a(t)&&(s+=o+".")}}),s+=r,s===i)}static eventCallback(t,i,r){return s=>{n.matchEventFullKeyCode(s,t)&&r.runGuarded(()=>i(s))}}static _normalizeKey(t){return t==="esc"?"escape":t}static \u0275fac=function(i){return new(i||n)(Re($t))};static \u0275prov=Ce({token:n,factory:n.\u0275fac})}return n})();async function Mv(n,e,t){let i=ae({rootComponent:n},dR(e,t));return mS(i)}function dR(n,e){return{platformRef:e?.platformRef,appProviders:[...gR,...n?.providers??[]],platformProviders:mR}}function fR(){Hd.makeCurrent()}function hR(){return new rr}function pR(){return Mg(document),document}var mR=[{provide:gc,useValue:bS},{provide:cd,useValue:fR,multi:!0},{provide:$t,useFactory:pR}];var gR=[{provide:Qa,useValue:"root"},{provide:rr,useFactory:hR},{provide:Vd,useClass:kd,multi:!0},{provide:Vd,useClass:RS,multi:!0},xv,yv,vv,{provide:Hs,useExisting:xv},{provide:wc,useClass:cR},[]];var NS=(()=>{class n{_doc;constructor(t){this._doc=t}getTitle(){return this._doc.title}setTitle(t){this._doc.title=t||""}static \u0275fac=function(i){return new(i||n)(Re($t))};static \u0275prov=Ce({token:n,factory:n.\u0275fac,providedIn:"root"})}return n})();var Ve="primary",Gc=Symbol("RouteTitle"),Cv=class{params;constructor(e){this.params=e||{}}has(e){return Object.prototype.hasOwnProperty.call(this.params,e)}get(e){if(this.has(e)){let t=this.params[e];return Array.isArray(t)?t[0]:t}return null}getAll(e){if(this.has(e)){let t=this.params[e];return Array.isArray(t)?t:[t]}return[]}get keys(){return Object.keys(this.params)}};function Xs(n){return new Cv(n)}function Sv(n,e,t){for(let i=0;i<n.length;i++){let r=n[i],s=e[i];if(r[0]===":")t[r.substring(1)]=s;else if(r!==s.path)return!1}return!0}function VS(n,e,t){let i=t.path.split("/"),r=i.indexOf("**");if(r===-1){if(i.length>n.length||t.pathMatch==="full"&&(e.hasChildren()||i.length<n.length))return null;let c={},l=n.slice(0,i.length);return Sv(i,l,c)?{consumed:l,posParams:c}:null}if(r!==i.lastIndexOf("**"))return null;let s=i.slice(0,r),o=i.slice(r+1);if(s.length+o.length>n.length||t.pathMatch==="full"&&e.hasChildren()&&t.path!=="**")return null;let a={};return!Sv(s,n.slice(0,s.length),a)||!Sv(o,n.slice(n.length-o.length),a)?null:{consumed:n,posParams:a}}function qd(n){return new Promise((e,t)=>{n.pipe(nr()).subscribe({next:i=>e(i),error:i=>t(i)})})}function yR(n,e){if(n.length!==e.length)return!1;for(let t=0;t<n.length;++t)if(!Hi(n[t],e[t]))return!1;return!0}function Hi(n,e){let t=n?Tv(n):void 0,i=e?Tv(e):void 0;if(!t||!i||t.length!=i.length)return!1;let r;for(let s=0;s<t.length;s++)if(r=t[s],!HS(n[r],e[r]))return!1;return!0}function Tv(n){return[...Object.keys(n),...Object.getOwnPropertySymbols(n)]}function HS(n,e){if(Array.isArray(n)&&Array.isArray(e)){if(n.length!==e.length)return!1;let t=[...n].sort(),i=[...e].sort();return t.every((r,s)=>i[s]===r)}else return n===e}function _R(n){return n.length>0?n[n.length-1]:null}function Js(n){return ou(n)?n:jo(n)?Gt(Promise.resolve(n)):et(n)}function zS(n){return ou(n)?qd(n):Promise.resolve(n)}var xR={exact:WS,subset:$S},GS={exact:MR,subset:SR,ignored:()=>!0},jS={paths:"exact",fragment:"ignored",matrixParams:"ignored",queryParams:"exact"},Dv={paths:"subset",fragment:"ignored",matrixParams:"ignored",queryParams:"subset"};function PS(n,e,t){return xR[t.paths](n.root,e.root,t.matrixParams)&&GS[t.queryParams](n.queryParams,e.queryParams)&&!(t.fragment==="exact"&&n.fragment!==e.fragment)}function MR(n,e){return Hi(n,e)}function WS(n,e,t){if(!qs(n.segments,e.segments)||!jd(n.segments,e.segments,t)||n.numberOfChildren!==e.numberOfChildren)return!1;for(let i in e.children)if(!n.children[i]||!WS(n.children[i],e.children[i],t))return!1;return!0}function SR(n,e){return Object.keys(e).length<=Object.keys(n).length&&Object.keys(e).every(t=>HS(n[t],e[t]))}function $S(n,e,t){return qS(n,e,e.segments,t)}function qS(n,e,t,i){if(n.segments.length>t.length){let r=n.segments.slice(0,t.length);return!(!qs(r,t)||e.hasChildren()||!jd(r,t,i))}else if(n.segments.length===t.length){if(!qs(n.segments,t)||!jd(n.segments,t,i))return!1;for(let r in e.children)if(!n.children[r]||!$S(n.children[r],e.children[r],i))return!1;return!0}else{let r=t.slice(0,n.segments.length),s=t.slice(n.segments.length);return!qs(n.segments,r)||!jd(n.segments,r,i)||!n.children[Ve]?!1:qS(n.children[Ve],e,s,i)}}function jd(n,e,t){return e.every((i,r)=>GS[t](n[r].parameters,i.parameters))}var ui=class{root;queryParams;fragment;_queryParamMap;constructor(e=new dt([],{}),t={},i=null){this.root=e,this.queryParams=t,this.fragment=i}get queryParamMap(){return this._queryParamMap??=Xs(this.queryParams),this._queryParamMap}toString(){return wR.serialize(this)}},dt=class{segments;children;parent=null;constructor(e,t){this.segments=e,this.children=t,Object.values(t).forEach(i=>i.parent=this)}hasChildren(){return this.numberOfChildren>0}get numberOfChildren(){return Object.keys(this.children).length}toString(){return Wd(this)}},qr=class{path;parameters;_parameterMap;constructor(e,t){this.path=e,this.parameters=t}get parameterMap(){return this._parameterMap??=Xs(this.parameters),this._parameterMap}toString(){return YS(this)}};function bR(n,e){return qs(n,e)&&n.every((t,i)=>Hi(t.parameters,e[i].parameters))}function qs(n,e){return n.length!==e.length?!1:n.every((t,i)=>t.path===e[i].path)}function ER(n,e){let t=[];return Object.entries(n.children).forEach(([i,r])=>{i===Ve&&(t=t.concat(e(r,i)))}),Object.entries(n.children).forEach(([i,r])=>{i!==Ve&&(t=t.concat(e(r,i)))}),t}var jc=(()=>{class n{static \u0275fac=function(i){return new(i||n)};static \u0275prov=Ce({token:n,factory:()=>new Xr,providedIn:"root"})}return n})(),Xr=class{parse(e){let t=new Av(e);return new ui(t.parseRootSegment(),t.parseQueryParams(),t.parseFragment())}serialize(e){let t=`/${Ac(e.root,!0)}`,i=DR(e.queryParams),r=typeof e.fragment=="string"?`#${CR(e.fragment)}`:"";return`${t}${i}${r}`}},wR=new Xr;function Wd(n){return n.segments.map(e=>YS(e)).join("/")}function Ac(n,e){if(!n.hasChildren())return Wd(n);if(e){let t=n.children[Ve]?Ac(n.children[Ve],!1):"",i=[];return Object.entries(n.children).forEach(([r,s])=>{r!==Ve&&i.push(`${r}:${Ac(s,!1)}`)}),i.length>0?`${t}(${i.join("//")})`:t}else{let t=ER(n,(i,r)=>r===Ve?[Ac(n.children[Ve],!1)]:[`${r}:${Ac(i,!1)}`]);return Object.keys(n.children).length===1&&n.children[Ve]!=null?`${Wd(n)}/${t[0]}`:`${Wd(n)}/(${t.join("//")})`}}function XS(n){return encodeURIComponent(n).replace(/%40/g,"@").replace(/%3A/gi,":").replace(/%24/g,"$").replace(/%2C/gi,",")}function zd(n){return XS(n).replace(/%3B/gi,";")}function CR(n){return encodeURI(n)}function Iv(n){return XS(n).replace(/\(/g,"%28").replace(/\)/g,"%29").replace(/%26/gi,"&")}function $d(n){return decodeURIComponent(n)}function OS(n){return $d(n.replace(/\+/g,"%20"))}function YS(n){return`${Iv(n.path)}${TR(n.parameters)}`}function TR(n){return Object.entries(n).map(([e,t])=>`;${Iv(e)}=${Iv(t)}`).join("")}function DR(n){let e=Object.entries(n).map(([t,i])=>Array.isArray(i)?i.map(r=>`${zd(t)}=${zd(r)}`).join("&"):`${zd(t)}=${zd(i)}`).filter(t=>t);return e.length?`?${e.join("&")}`:""}var IR=/^[^\/()?;#]+/;function bv(n){let e=n.match(IR);return e?e[0]:""}var AR=/^[^\/()?;=#]+/;function RR(n){let e=n.match(AR);return e?e[0]:""}var NR=/^[^=?&#]+/;function PR(n){let e=n.match(NR);return e?e[0]:""}var OR=/^[^&#]+/;function LR(n){let e=n.match(OR);return e?e[0]:""}var Av=class{url;remaining;constructor(e){this.url=e,this.remaining=e}parseRootSegment(){return this.consumeOptional("/"),this.remaining===""||this.peekStartsWith("?")||this.peekStartsWith("#")?new dt([],{}):new dt([],this.parseChildren())}parseQueryParams(){let e={};if(this.consumeOptional("?"))do this.parseQueryParam(e);while(this.consumeOptional("&"));return e}parseFragment(){return this.consumeOptional("#")?decodeURIComponent(this.remaining):null}parseChildren(e=0){if(e>50)throw new ge(4010,!1);if(this.remaining==="")return{};this.consumeOptional("/");let t=[];for(this.peekStartsWith("(")||t.push(this.parseSegment());this.peekStartsWith("/")&&!this.peekStartsWith("//")&&!this.peekStartsWith("/(");)this.capture("/"),t.push(this.parseSegment());let i={};this.peekStartsWith("/(")&&(this.capture("/"),i=this.parseParens(!0,e));let r={};return this.peekStartsWith("(")&&(r=this.parseParens(!1,e)),(t.length>0||Object.keys(i).length>0)&&(r[Ve]=new dt(t,i)),r}parseSegment(){let e=bv(this.remaining);if(e===""&&this.peekStartsWith(";"))throw new ge(4009,!1);return this.capture(e),new qr($d(e),this.parseMatrixParams())}parseMatrixParams(){let e={};for(;this.consumeOptional(";");)this.parseParam(e);return e}parseParam(e){let t=RR(this.remaining);if(!t)return;this.capture(t);let i="";if(this.consumeOptional("=")){let r=bv(this.remaining);r&&(i=r,this.capture(i))}e[$d(t)]=$d(i)}parseQueryParam(e){let t=PR(this.remaining);if(!t)return;this.capture(t);let i="";if(this.consumeOptional("=")){let o=LR(this.remaining);o&&(i=o,this.capture(i))}let r=OS(t),s=OS(i);if(e.hasOwnProperty(r)){let o=e[r];Array.isArray(o)||(o=[o],e[r]=o),o.push(s)}else e[r]=s}parseParens(e,t){let i={};for(this.capture("(");!this.consumeOptional(")")&&this.remaining.length>0;){let r=bv(this.remaining),s=this.remaining[r.length];if(s!=="/"&&s!==")"&&s!==";")throw new ge(4010,!1);let o;r.indexOf(":")>-1?(o=r.slice(0,r.indexOf(":")),this.capture(o),this.capture(":")):e&&(o=Ve);let a=this.parseChildren(t+1);i[o??Ve]=Object.keys(a).length===1&&a[Ve]?a[Ve]:new dt([],a),this.consumeOptional("//")}return i}peekStartsWith(e){return this.remaining.startsWith(e)}consumeOptional(e){return this.peekStartsWith(e)?(this.remaining=this.remaining.substring(e.length),!0):!1}capture(e){if(!this.consumeOptional(e))throw new ge(4011,!1)}};function ZS(n){return n.segments.length>0?new dt([],{[Ve]:n}):n}function JS(n){let e={};for(let[i,r]of Object.entries(n.children)){let s=JS(r);if(i===Ve&&s.segments.length===0&&s.hasChildren())for(let[o,a]of Object.entries(s.children))e[o]=a;else(s.segments.length>0||s.hasChildren())&&(e[i]=s)}let t=new dt(n.segments,e);return FR(t)}function FR(n){if(n.numberOfChildren===1&&n.children[Ve]){let e=n.children[Ve];return new dt(n.segments.concat(e.segments),e.children)}return n}function Jo(n){return n instanceof ui}function KS(n,e,t=null,i=null,r=new Xr){let s=QS(n);return eb(s,e,t,i,r)}function QS(n){let e;function t(s){let o={};for(let c of s.children){let l=t(c);o[c.outlet]=l}let a=new dt(s.url,o);return s===n&&(e=a),a}let i=t(n.root),r=ZS(i);return e??r}function eb(n,e,t,i,r){let s=n;for(;s.parent;)s=s.parent;if(e.length===0)return Ev(s,s,s,t,i,r);let o=kR(e);if(o.toRoot())return Ev(s,s,new dt([],{}),t,i,r);let a=UR(o,s,n),c=a.processChildren?Nc(a.segmentGroup,a.index,o.commands):nb(a.segmentGroup,a.index,o.commands);return Ev(s,a.segmentGroup,c,t,i,r)}function Xd(n){return typeof n=="object"&&n!=null&&!n.outlets&&!n.segmentPath}function Lc(n){return typeof n=="object"&&n!=null&&n.outlets}function LS(n,e,t){n||="\u0275";let i=new ui;return i.queryParams={[n]:e},t.parse(t.serialize(i)).queryParams[n]}function Ev(n,e,t,i,r,s){let o={};for(let[l,u]of Object.entries(i??{}))o[l]=Array.isArray(u)?u.map(d=>LS(l,d,s)):LS(l,u,s);let a;n===e?a=t:a=tb(n,e,t);let c=ZS(JS(a));return new ui(c,o,r)}function tb(n,e,t){let i={};return Object.entries(n.children).forEach(([r,s])=>{s===e?i[r]=t:i[r]=tb(s,e,t)}),new dt(n.segments,i)}var Yd=class{isAbsolute;numberOfDoubleDots;commands;constructor(e,t,i){if(this.isAbsolute=e,this.numberOfDoubleDots=t,this.commands=i,e&&i.length>0&&Xd(i[0]))throw new ge(4003,!1);let r=i.find(Lc);if(r&&r!==_R(i))throw new ge(4004,!1)}toRoot(){return this.isAbsolute&&this.commands.length===1&&this.commands[0]=="/"}};function kR(n){if(typeof n[0]=="string"&&n.length===1&&n[0]==="/")return new Yd(!0,0,n);let e=0,t=!1,i=n.reduce((r,s,o)=>{if(typeof s=="object"&&s!=null){if(s.outlets){let a={};return Object.entries(s.outlets).forEach(([c,l])=>{a[c]=typeof l=="string"?l.split("/"):l}),[...r,{outlets:a}]}if(s.segmentPath)return[...r,s.segmentPath]}return typeof s!="string"?[...r,s]:o===0?(s.split("/").forEach((a,c)=>{c==0&&a==="."||(c==0&&a===""?t=!0:a===".."?e++:a!=""&&r.push(a))}),r):[...r,s]},[]);return new Yd(t,e,i)}var Yo=class{segmentGroup;processChildren;index;constructor(e,t,i){this.segmentGroup=e,this.processChildren=t,this.index=i}};function UR(n,e,t){if(n.isAbsolute)return new Yo(e,!0,0);if(!t)return new Yo(e,!1,NaN);if(t.parent===null)return new Yo(t,!0,0);let i=Xd(n.commands[0])?0:1,r=t.segments.length-1+i;return BR(t,r,n.numberOfDoubleDots)}function BR(n,e,t){let i=n,r=e,s=t;for(;s>r;){if(s-=r,i=i.parent,!i)throw new ge(4005,!1);r=i.segments.length}return new Yo(i,!1,r-s)}function VR(n){return Lc(n[0])?n[0].outlets:{[Ve]:n}}function nb(n,e,t){if(n??=new dt([],{}),n.segments.length===0&&n.hasChildren())return Nc(n,e,t);let i=HR(n,e,t),r=t.slice(i.commandIndex);if(i.match&&i.pathIndex<n.segments.length){let s=new dt(n.segments.slice(0,i.pathIndex),{});return s.children[Ve]=new dt(n.segments.slice(i.pathIndex),n.children),Nc(s,0,r)}else return i.match&&r.length===0?new dt(n.segments,{}):i.match&&!n.hasChildren()?Rv(n,e,t):i.match?Nc(n,0,r):Rv(n,e,t)}function Nc(n,e,t){if(t.length===0)return new dt(n.segments,{});{let i=VR(t),r={};if(Object.keys(i).some(s=>s!==Ve)&&n.children[Ve]&&n.numberOfChildren===1&&n.children[Ve].segments.length===0){let s=Nc(n.children[Ve],e,t);return new dt(n.segments,s.children)}return Object.entries(i).forEach(([s,o])=>{typeof o=="string"&&(o=[o]),o!==null&&(r[s]=nb(n.children[s],e,o))}),Object.entries(n.children).forEach(([s,o])=>{i[s]===void 0&&(r[s]=o)}),new dt(n.segments,r)}}function HR(n,e,t){let i=0,r=e,s={match:!1,pathIndex:0,commandIndex:0};for(;r<n.segments.length;){if(i>=t.length)return s;let o=n.segments[r],a=t[i];if(Lc(a))break;let c=`${a}`,l=i<t.length-1?t[i+1]:null;if(r>0&&c===void 0)break;if(c&&l&&typeof l=="object"&&l.outlets===void 0){if(!kS(c,l,o))return s;i+=2}else{if(!kS(c,{},o))return s;i++}r++}return{match:!0,pathIndex:r,commandIndex:i}}function Rv(n,e,t){let i=n.segments.slice(0,e),r=0;for(;r<t.length;){let s=t[r];if(Lc(s)){let c=zR(s.outlets);return new dt(i,c)}if(r===0&&Xd(t[0])){let c=n.segments[e];i.push(new qr(c.path,FS(t[0]))),r++;continue}let o=Lc(s)?s.outlets[Ve]:`${s}`,a=r<t.length-1?t[r+1]:null;o&&a&&Xd(a)?(i.push(new qr(o,FS(a))),r+=2):(i.push(new qr(o,{})),r++)}return new dt(i,{})}function zR(n){let e={};return Object.entries(n).forEach(([t,i])=>{typeof i=="string"&&(i=[i]),i!==null&&(e[t]=Rv(new dt([],{}),0,i))}),e}function FS(n){let e={};return Object.entries(n).forEach(([t,i])=>e[t]=`${i}`),e}function kS(n,e,t){return n==t.path&&Hi(e,t.parameters)}var Pc="imperative",nn=(function(n){return n[n.NavigationStart=0]="NavigationStart",n[n.NavigationEnd=1]="NavigationEnd",n[n.NavigationCancel=2]="NavigationCancel",n[n.NavigationError=3]="NavigationError",n[n.RoutesRecognized=4]="RoutesRecognized",n[n.ResolveStart=5]="ResolveStart",n[n.ResolveEnd=6]="ResolveEnd",n[n.GuardsCheckStart=7]="GuardsCheckStart",n[n.GuardsCheckEnd=8]="GuardsCheckEnd",n[n.RouteConfigLoadStart=9]="RouteConfigLoadStart",n[n.RouteConfigLoadEnd=10]="RouteConfigLoadEnd",n[n.ChildActivationStart=11]="ChildActivationStart",n[n.ChildActivationEnd=12]="ChildActivationEnd",n[n.ActivationStart=13]="ActivationStart",n[n.ActivationEnd=14]="ActivationEnd",n[n.Scroll=15]="Scroll",n[n.NavigationSkipped=16]="NavigationSkipped",n})(nn||{}),$n=class{id;url;constructor(e,t){this.id=e,this.url=t}},Ys=class extends $n{type=nn.NavigationStart;navigationTrigger;restoredState;constructor(e,t,i="imperative",r=null){super(e,t),this.navigationTrigger=i,this.restoredState=r}toString(){return`NavigationStart(id: ${this.id}, url: '${this.url}')`}},vr=class extends $n{urlAfterRedirects;type=nn.NavigationEnd;constructor(e,t,i){super(e,t),this.urlAfterRedirects=i}toString(){return`NavigationEnd(id: ${this.id}, url: '${this.url}', urlAfterRedirects: '${this.urlAfterRedirects}')`}},yn=(function(n){return n[n.Redirect=0]="Redirect",n[n.SupersededByNewNavigation=1]="SupersededByNewNavigation",n[n.NoDataFromResolver=2]="NoDataFromResolver",n[n.GuardRejected=3]="GuardRejected",n[n.Aborted=4]="Aborted",n})(yn||{}),Fc=(function(n){return n[n.IgnoredSameUrlNavigation=0]="IgnoredSameUrlNavigation",n[n.IgnoredByUrlHandlingStrategy=1]="IgnoredByUrlHandlingStrategy",n})(Fc||{}),li=class extends $n{reason;code;type=nn.NavigationCancel;constructor(e,t,i,r){super(e,t),this.reason=i,this.code=r}toString(){return`NavigationCancel(id: ${this.id}, url: '${this.url}')`}};function ib(n){return n instanceof li&&(n.code===yn.Redirect||n.code===yn.SupersededByNewNavigation)}var yr=class extends $n{reason;code;type=nn.NavigationSkipped;constructor(e,t,i,r){super(e,t),this.reason=i,this.code=r}},Zs=class extends $n{error;target;type=nn.NavigationError;constructor(e,t,i,r){super(e,t),this.error=i,this.target=r}toString(){return`NavigationError(id: ${this.id}, url: '${this.url}', error: ${this.error})`}},kc=class extends $n{urlAfterRedirects;state;type=nn.RoutesRecognized;constructor(e,t,i,r){super(e,t),this.urlAfterRedirects=i,this.state=r}toString(){return`RoutesRecognized(id: ${this.id}, url: '${this.url}', urlAfterRedirects: '${this.urlAfterRedirects}', state: ${this.state})`}},Zd=class extends $n{urlAfterRedirects;state;type=nn.GuardsCheckStart;constructor(e,t,i,r){super(e,t),this.urlAfterRedirects=i,this.state=r}toString(){return`GuardsCheckStart(id: ${this.id}, url: '${this.url}', urlAfterRedirects: '${this.urlAfterRedirects}', state: ${this.state})`}},Jd=class extends $n{urlAfterRedirects;state;shouldActivate;type=nn.GuardsCheckEnd;constructor(e,t,i,r,s){super(e,t),this.urlAfterRedirects=i,this.state=r,this.shouldActivate=s}toString(){return`GuardsCheckEnd(id: ${this.id}, url: '${this.url}', urlAfterRedirects: '${this.urlAfterRedirects}', state: ${this.state}, shouldActivate: ${this.shouldActivate})`}},Kd=class extends $n{urlAfterRedirects;state;type=nn.ResolveStart;constructor(e,t,i,r){super(e,t),this.urlAfterRedirects=i,this.state=r}toString(){return`ResolveStart(id: ${this.id}, url: '${this.url}', urlAfterRedirects: '${this.urlAfterRedirects}', state: ${this.state})`}},Qd=class extends $n{urlAfterRedirects;state;type=nn.ResolveEnd;constructor(e,t,i,r){super(e,t),this.urlAfterRedirects=i,this.state=r}toString(){return`ResolveEnd(id: ${this.id}, url: '${this.url}', urlAfterRedirects: '${this.urlAfterRedirects}', state: ${this.state})`}},ef=class{route;type=nn.RouteConfigLoadStart;constructor(e){this.route=e}toString(){return`RouteConfigLoadStart(path: ${this.route.path})`}},tf=class{route;type=nn.RouteConfigLoadEnd;constructor(e){this.route=e}toString(){return`RouteConfigLoadEnd(path: ${this.route.path})`}},nf=class{snapshot;type=nn.ChildActivationStart;constructor(e){this.snapshot=e}toString(){return`ChildActivationStart(path: '${this.snapshot.routeConfig&&this.snapshot.routeConfig.path||""}')`}},rf=class{snapshot;type=nn.ChildActivationEnd;constructor(e){this.snapshot=e}toString(){return`ChildActivationEnd(path: '${this.snapshot.routeConfig&&this.snapshot.routeConfig.path||""}')`}},sf=class{snapshot;type=nn.ActivationStart;constructor(e){this.snapshot=e}toString(){return`ActivationStart(path: '${this.snapshot.routeConfig&&this.snapshot.routeConfig.path||""}')`}},of=class{snapshot;type=nn.ActivationEnd;constructor(e){this.snapshot=e}toString(){return`ActivationEnd(path: '${this.snapshot.routeConfig&&this.snapshot.routeConfig.path||""}')`}};var Ko=class{},Uc=class{},Qo=class{url;navigationBehaviorOptions;constructor(e,t){this.url=e,this.navigationBehaviorOptions=t}};function GR(n){return!(n instanceof Ko)&&!(n instanceof Qo)&&!(n instanceof Uc)}var af=class{rootInjector;outlet=null;route=null;children;attachRef=null;get injector(){return this.route?.snapshot._environmentInjector??this.rootInjector}constructor(e){this.rootInjector=e,this.children=new ia(this.rootInjector)}},ia=(()=>{class n{rootInjector;contexts=new Map;constructor(t){this.rootInjector=t}onChildOutletCreated(t,i){let r=this.getOrCreateContext(t);r.outlet=i,this.contexts.set(t,r)}onChildOutletDestroyed(t){let i=this.getContext(t);i&&(i.outlet=null,i.attachRef=null)}onOutletDeactivated(){let t=this.contexts;return this.contexts=new Map,t}onOutletReAttached(t){this.contexts=t}getOrCreateContext(t){let i=this.getContext(t);return i||(i=new af(this.rootInjector),this.contexts.set(t,i)),i}getContext(t){return this.contexts.get(t)||null}static \u0275fac=function(i){return new(i||n)(Re(Wt))};static \u0275prov=Ce({token:n,factory:n.\u0275fac,providedIn:"root"})}return n})(),cf=class{_root;constructor(e){this._root=e}get root(){return this._root.value}parent(e){let t=this.pathFromRoot(e);return t.length>1?t[t.length-2]:null}children(e){let t=Nv(e,this._root);return t?t.children.map(i=>i.value):[]}firstChild(e){let t=Nv(e,this._root);return t&&t.children.length>0?t.children[0].value:null}siblings(e){let t=Pv(e,this._root);return t.length<2?[]:t[t.length-2].children.map(r=>r.value).filter(r=>r!==e)}pathFromRoot(e){return Pv(e,this._root).map(t=>t.value)}};function Nv(n,e){if(n===e.value)return e;for(let t of e.children){let i=Nv(n,t);if(i)return i}return null}function Pv(n,e){if(n===e.value)return[e];for(let t of e.children){let i=Pv(n,t);if(i.length)return i.unshift(e),i}return[]}var Wn=class{value;children;constructor(e,t){this.value=e,this.children=t}toString(){return`TreeNode(${this.value})`}};function Xo(n){let e={};return n&&n.children.forEach(t=>e[t.value.outlet]=t),e}var Bc=class extends cf{snapshot;constructor(e,t){super(e),this.snapshot=t,zv(this,e)}toString(){return this.snapshot.toString()}};function rb(n,e){let t=jR(n,e),i=new ln([new qr("",{})]),r=new ln({}),s=new ln({}),o=new ln({}),a=new ln(""),c=new Yr(i,r,o,a,s,Ve,n,t.root);return c.snapshot=t.root,new Bc(new Wn(c,[]),t)}function jR(n,e){let t={},i={},r={},o=new ea([],t,r,"",i,Ve,n,null,{},e);return new Vc("",new Wn(o,[]))}var Yr=class{urlSubject;paramsSubject;queryParamsSubject;fragmentSubject;dataSubject;outlet;component;snapshot;_futureSnapshot;_routerState;_paramMap;_queryParamMap;title;url;params;queryParams;fragment;data;constructor(e,t,i,r,s,o,a,c){this.urlSubject=e,this.paramsSubject=t,this.queryParamsSubject=i,this.fragmentSubject=r,this.dataSubject=s,this.outlet=o,this.component=a,this._futureSnapshot=c,this.title=this.dataSubject?.pipe(_t(l=>l[Gc]))??et(void 0),this.url=e,this.params=t,this.queryParams=i,this.fragment=r,this.data=s}get routeConfig(){return this._futureSnapshot.routeConfig}get root(){return this._routerState.root}get parent(){return this._routerState.parent(this)}get firstChild(){return this._routerState.firstChild(this)}get children(){return this._routerState.children(this)}get pathFromRoot(){return this._routerState.pathFromRoot(this)}get paramMap(){return this._paramMap??=this.params.pipe(_t(e=>Xs(e))),this._paramMap}get queryParamMap(){return this._queryParamMap??=this.queryParams.pipe(_t(e=>Xs(e))),this._queryParamMap}toString(){return this.snapshot?this.snapshot.toString():`Future(${this._futureSnapshot})`}};function Hv(n,e,t="emptyOnly"){let i,{routeConfig:r}=n;return e!==null&&(t==="always"||r?.path===""||!e.component&&!e.routeConfig?.loadComponent)?i={params:ae(ae({},e.params),n.params),data:ae(ae({},e.data),n.data),resolve:ae(ae(ae(ae({},n.data),e.data),r?.data),n._resolvedData)}:i={params:ae({},n.params),data:ae({},n.data),resolve:ae(ae({},n.data),n._resolvedData??{})},r&&ob(r)&&(i.resolve[Gc]=r.title),i}var ea=class{url;params;queryParams;fragment;data;outlet;component;routeConfig;_resolve;_resolvedData;_routerState;_paramMap;_queryParamMap;_environmentInjector;get title(){return this.data?.[Gc]}constructor(e,t,i,r,s,o,a,c,l,u){this.url=e,this.params=t,this.queryParams=i,this.fragment=r,this.data=s,this.outlet=o,this.component=a,this.routeConfig=c,this._resolve=l,this._environmentInjector=u}get root(){return this._routerState.root}get parent(){return this._routerState.parent(this)}get firstChild(){return this._routerState.firstChild(this)}get children(){return this._routerState.children(this)}get pathFromRoot(){return this._routerState.pathFromRoot(this)}get paramMap(){return this._paramMap??=Xs(this.params),this._paramMap}get queryParamMap(){return this._queryParamMap??=Xs(this.queryParams),this._queryParamMap}toString(){let e=this.url.map(i=>i.toString()).join("/"),t=this.routeConfig?this.routeConfig.path:"";return`Route(url:'${e}', path:'${t}')`}},Vc=class extends cf{url;constructor(e,t){super(t),this.url=e,zv(this,t)}toString(){return sb(this._root)}};function zv(n,e){e.value._routerState=n,e.children.forEach(t=>zv(n,t))}function sb(n){let e=n.children.length>0?` { ${n.children.map(sb).join(", ")} } `:"";return`${n.value}${e}`}function wv(n){if(n.snapshot){let e=n.snapshot,t=n._futureSnapshot;n.snapshot=t,Hi(e.queryParams,t.queryParams)||n.queryParamsSubject.next(t.queryParams),e.fragment!==t.fragment&&n.fragmentSubject.next(t.fragment),Hi(e.params,t.params)||n.paramsSubject.next(t.params),yR(e.url,t.url)||n.urlSubject.next(t.url),Hi(e.data,t.data)||n.dataSubject.next(t.data)}else n.snapshot=n._futureSnapshot,n.dataSubject.next(n._futureSnapshot.data)}function Ov(n,e){let t=Hi(n.params,e.params)&&bR(n.url,e.url),i=!n.parent!=!e.parent;return t&&!i&&(!n.parent||Ov(n.parent,e.parent))}function ob(n){return typeof n.title=="string"||n.title===null}var ab=new Ie(""),Wc=(()=>{class n{activated=null;get activatedComponentRef(){return this.activated}_activatedRoute=null;name=Ve;activateEvents=new Rt;deactivateEvents=new Rt;attachEvents=new Rt;detachEvents=new Rt;routerOutletData=hS();parentContexts=Q(ia);location=Q(fr);changeDetector=Q(cv);inputBinder=Q(ff,{optional:!0});supportsBindingToComponentInputs=!0;ngOnChanges(t){if(t.name){let{firstChange:i,previousValue:r}=t.name;if(i)return;this.isTrackedInParentContexts(r)&&(this.deactivate(),this.parentContexts.onChildOutletDestroyed(r)),this.initializeOutletWithName()}}ngOnDestroy(){this.isTrackedInParentContexts(this.name)&&this.parentContexts.onChildOutletDestroyed(this.name),this.inputBinder?.unsubscribeFromRouteData(this)}isTrackedInParentContexts(t){return this.parentContexts.getContext(t)?.outlet===this}ngOnInit(){this.initializeOutletWithName()}initializeOutletWithName(){if(this.parentContexts.onChildOutletCreated(this.name,this),this.activated)return;let t=this.parentContexts.getContext(this.name);t?.route&&(t.attachRef?this.attach(t.attachRef,t.route):this.activateWith(t.route,t.injector))}get isActivated(){return!!this.activated}get component(){if(!this.activated)throw new ge(4012,!1);return this.activated.instance}get activatedRoute(){if(!this.activated)throw new ge(4012,!1);return this._activatedRoute}get activatedRouteData(){return this._activatedRoute?this._activatedRoute.snapshot.data:{}}detach(){if(!this.activated)throw new ge(4012,!1);this.location.detach();let t=this.activated;return this.activated=null,this._activatedRoute=null,this.detachEvents.emit(t.instance),t}attach(t,i){this.activated=t,this._activatedRoute=i,this.location.insert(t.hostView),this.inputBinder?.bindActivatedRouteToOutletComponent(this),this.attachEvents.emit(t.instance)}deactivate(){if(this.activated){let t=this.component;this.activated.destroy(),this.activated=null,this._activatedRoute=null,this.deactivateEvents.emit(t)}}activateWith(t,i){if(this.isActivated)throw new ge(4013,!1);this._activatedRoute=t;let r=this.location,o=t.snapshot.component,a=this.parentContexts.getOrCreateContext(this.name).children,c=new Lv(t,a,r.injector,this.routerOutletData);this.activated=r.createComponent(o,{index:r.length,injector:c,environmentInjector:i}),this.changeDetector.markForCheck(),this.inputBinder?.bindActivatedRouteToOutletComponent(this),this.activateEvents.emit(this.activated.instance)}static \u0275fac=function(i){return new(i||n)};static \u0275dir=$s({type:n,selectors:[["router-outlet"]],inputs:{name:"name",routerOutletData:[1,"routerOutletData"]},outputs:{activateEvents:"activate",deactivateEvents:"deactivate",attachEvents:"attach",detachEvents:"detach"},exportAs:["outlet"],features:[sd]})}return n})(),Lv=class{route;childContexts;parent;outletData;constructor(e,t,i,r){this.route=e,this.childContexts=t,this.parent=i,this.outletData=r}get(e,t){return e===Yr?this.route:e===ia?this.childContexts:e===ab?this.outletData:this.parent.get(e,t)}},ff=new Ie("");var Gv=(()=>{class n{static \u0275fac=function(i){return new(i||n)};static \u0275cmp=wi({type:n,selectors:[["ng-component"]],exportAs:["emptyRouterOutlet"],decls:1,vars:0,template:function(i,r){i&1&&Un(0,"router-outlet")},dependencies:[Wc],encapsulation:2})}return n})();function jv(n){let e=n.children&&n.children.map(jv),t=e?rt(ae({},n),{children:e}):ae({},n);return!t.component&&!t.loadComponent&&(e||t.loadChildren)&&t.outlet&&t.outlet!==Ve&&(t.component=Gv),t}function WR(n,e,t){let i=Hc(n,e._root,t?t._root:void 0);return new Bc(i,e)}function Hc(n,e,t){if(t&&n.shouldReuseRoute(e.value,t.value.snapshot)){let i=t.value;i._futureSnapshot=e.value;let r=$R(n,e,t);return new Wn(i,r)}else{if(n.shouldAttach(e.value)){let s=n.retrieve(e.value);if(s!==null){let o=s.route;return o.value._futureSnapshot=e.value,o.children=e.children.map(a=>Hc(n,a)),o}}let i=qR(e.value),r=e.children.map(s=>Hc(n,s));return new Wn(i,r)}}function $R(n,e,t){return e.children.map(i=>{for(let r of t.children)if(n.shouldReuseRoute(i.value,r.value.snapshot))return Hc(n,i,r);return Hc(n,i)})}function qR(n){return new Yr(new ln(n.url),new ln(n.params),new ln(n.queryParams),new ln(n.fragment),new ln(n.data),n.outlet,n.component,n)}var ta=class{redirectTo;navigationBehaviorOptions;constructor(e,t){this.redirectTo=e,this.navigationBehaviorOptions=t}},cb="ngNavigationCancelingError";function lf(n,e){let{redirectTo:t,navigationBehaviorOptions:i}=Jo(e)?{redirectTo:e,navigationBehaviorOptions:void 0}:e,r=lb(!1,yn.Redirect);return r.url=t,r.navigationBehaviorOptions=i,r}function lb(n,e){let t=new Error(`NavigationCancelingError: ${n||""}`);return t[cb]=!0,t.cancellationCode=e,t}function XR(n){return ub(n)&&Jo(n.url)}function ub(n){return!!n&&n[cb]}var Fv=class{routeReuseStrategy;futureState;currState;forwardEvent;inputBindingEnabled;constructor(e,t,i,r,s){this.routeReuseStrategy=e,this.futureState=t,this.currState=i,this.forwardEvent=r,this.inputBindingEnabled=s}activate(e){let t=this.futureState._root,i=this.currState?this.currState._root:null;this.deactivateChildRoutes(t,i,e),wv(this.futureState.root),this.activateChildRoutes(t,i,e)}deactivateChildRoutes(e,t,i){let r=Xo(t);e.children.forEach(s=>{let o=s.value.outlet;this.deactivateRoutes(s,r[o],i),delete r[o]}),Object.values(r).forEach(s=>{this.deactivateRouteAndItsChildren(s,i)})}deactivateRoutes(e,t,i){let r=e.value,s=t?t.value:null;if(r===s)if(r.component){let o=i.getContext(r.outlet);o&&this.deactivateChildRoutes(e,t,o.children)}else this.deactivateChildRoutes(e,t,i);else s&&this.deactivateRouteAndItsChildren(t,i)}deactivateRouteAndItsChildren(e,t){e.value.component&&this.routeReuseStrategy.shouldDetach(e.value.snapshot)?this.detachAndStoreRouteSubtree(e,t):this.deactivateRouteAndOutlet(e,t)}detachAndStoreRouteSubtree(e,t){let i=t.getContext(e.value.outlet),r=i&&e.value.component?i.children:t,s=Xo(e);for(let o of Object.values(s))this.deactivateRouteAndItsChildren(o,r);if(i&&i.outlet){let o=i.outlet.detach(),a=i.children.onOutletDeactivated();this.routeReuseStrategy.store(e.value.snapshot,{componentRef:o,route:e,contexts:a})}}deactivateRouteAndOutlet(e,t){let i=t.getContext(e.value.outlet),r=i&&e.value.component?i.children:t,s=Xo(e);for(let o of Object.values(s))this.deactivateRouteAndItsChildren(o,r);i&&(i.outlet&&(i.outlet.deactivate(),i.children.onOutletDeactivated()),i.attachRef=null,i.route=null)}activateChildRoutes(e,t,i){let r=Xo(t);e.children.forEach(s=>{this.activateRoutes(s,r[s.value.outlet],i),this.forwardEvent(new of(s.value.snapshot))}),e.children.length&&this.forwardEvent(new rf(e.value.snapshot))}activateRoutes(e,t,i){let r=e.value,s=t?t.value:null;if(wv(r),r===s)if(r.component){let o=i.getOrCreateContext(r.outlet);this.activateChildRoutes(e,t,o.children)}else this.activateChildRoutes(e,t,i);else if(r.component){let o=i.getOrCreateContext(r.outlet);if(this.routeReuseStrategy.shouldAttach(r.snapshot)){let a=this.routeReuseStrategy.retrieve(r.snapshot);this.routeReuseStrategy.store(r.snapshot,null),o.children.onOutletReAttached(a.contexts),o.attachRef=a.componentRef,o.route=a.route.value,o.outlet&&o.outlet.attach(a.componentRef,a.route.value),wv(a.route.value),this.activateChildRoutes(e,null,o.children)}else o.attachRef=null,o.route=r,o.outlet&&o.outlet.activateWith(r,o.injector),this.activateChildRoutes(e,null,o.children)}else this.activateChildRoutes(e,null,i)}},uf=class{path;route;constructor(e){this.path=e,this.route=this.path[this.path.length-1]}},Zo=class{component;route;constructor(e,t){this.component=e,this.route=t}};function YR(n,e,t){let i=n._root,r=e?e._root:null;return Rc(i,r,t,[i.value])}function ZR(n){let e=n.routeConfig?n.routeConfig.canActivateChild:null;return!e||e.length===0?null:{node:n,guards:e}}function ra(n,e){let t=Symbol(),i=e.get(n,t);return i===t?typeof n=="function"&&!nm(n)?n:e.get(n):i}function Rc(n,e,t,i,r={canDeactivateChecks:[],canActivateChecks:[]}){let s=Xo(e);return n.children.forEach(o=>{JR(o,s[o.value.outlet],t,i.concat([o.value]),r),delete s[o.value.outlet]}),Object.entries(s).forEach(([o,a])=>Oc(a,t.getContext(o),r)),r}function JR(n,e,t,i,r={canDeactivateChecks:[],canActivateChecks:[]}){let s=n.value,o=e?e.value:null,a=t?t.getContext(n.value.outlet):null;if(o&&s.routeConfig===o.routeConfig){let c=KR(o,s,s.routeConfig.runGuardsAndResolvers);c?r.canActivateChecks.push(new uf(i)):(s.data=o.data,s._resolvedData=o._resolvedData),s.component?Rc(n,e,a?a.children:null,i,r):Rc(n,e,t,i,r),c&&a&&a.outlet&&a.outlet.isActivated&&r.canDeactivateChecks.push(new Zo(a.outlet.component,o))}else o&&Oc(e,a,r),r.canActivateChecks.push(new uf(i)),s.component?Rc(n,null,a?a.children:null,i,r):Rc(n,null,t,i,r);return r}function KR(n,e,t){if(typeof t=="function")return gn(e._environmentInjector,()=>t(n,e));switch(t){case"pathParamsChange":return!qs(n.url,e.url);case"pathParamsOrQueryParamsChange":return!qs(n.url,e.url)||!Hi(n.queryParams,e.queryParams);case"always":return!0;case"paramsOrQueryParamsChange":return!Ov(n,e)||!Hi(n.queryParams,e.queryParams);default:return!Ov(n,e)}}function Oc(n,e,t){let i=Xo(n),r=n.value;Object.entries(i).forEach(([s,o])=>{r.component?e?Oc(o,e.children.getContext(s),t):Oc(o,null,t):Oc(o,e,t)}),r.component?e&&e.outlet&&e.outlet.isActivated?t.canDeactivateChecks.push(new Zo(e.outlet.component,r)):t.canDeactivateChecks.push(new Zo(null,r)):t.canDeactivateChecks.push(new Zo(null,r))}function $c(n){return typeof n=="function"}function QR(n){return typeof n=="boolean"}function e1(n){return n&&$c(n.canLoad)}function t1(n){return n&&$c(n.canActivate)}function n1(n){return n&&$c(n.canActivateChild)}function i1(n){return n&&$c(n.canDeactivate)}function r1(n){return n&&$c(n.canMatch)}function db(n){return n instanceof Es||n?.name==="EmptyError"}var Gd=Symbol("INITIAL_VALUE");function na(){return mn(n=>Up(n.map(e=>e.pipe(wn(1),Vp(Gd)))).pipe(_t(e=>{for(let t of e)if(t!==!0){if(t===Gd)return Gd;if(t===!1||s1(t))return t}return!0}),ti(e=>e!==Gd),wn(1)))}function s1(n){return Jo(n)||n instanceof ta}function fb(n){return n.aborted?et(void 0).pipe(wn(1)):new Ke(e=>{let t=()=>{e.next(),e.complete()};return n.addEventListener("abort",t),()=>n.removeEventListener("abort",t)})}function hb(n){return za(fb(n))}function o1(n){return En(e=>{let{targetSnapshot:t,currentSnapshot:i,guards:{canActivateChecks:r,canDeactivateChecks:s}}=e;return s.length===0&&r.length===0?et(rt(ae({},e),{guardsResult:!0})):a1(s,t,i).pipe(En(o=>o&&QR(o)?c1(t,r,n):et(o)),_t(o=>rt(ae({},e),{guardsResult:o})))})}function a1(n,e,t){return Gt(n).pipe(En(i=>h1(i.component,i.route,t,e)),nr(i=>i!==!0,!0))}function c1(n,e,t){return Gt(e).pipe(au(i=>Eo(u1(i.route.parent,t),l1(i.route,t),f1(n,i.path),d1(n,i.route))),nr(i=>i!==!0,!0))}function l1(n,e){return n!==null&&e&&e(new sf(n)),et(!0)}function u1(n,e){return n!==null&&e&&e(new nf(n)),et(!0)}function d1(n,e){let t=e.routeConfig?e.routeConfig.canActivate:null;if(!t||t.length===0)return et(!0);let i=t.map(r=>Va(()=>{let s=e._environmentInjector,o=ra(r,s),a=t1(o)?o.canActivate(e,n):gn(s,()=>o(e,n));return Js(a).pipe(nr())}));return et(i).pipe(na())}function f1(n,e){let t=e[e.length-1],r=e.slice(0,e.length-1).reverse().map(s=>ZR(s)).filter(s=>s!==null).map(s=>Va(()=>{let o=s.guards.map(a=>{let c=s.node._environmentInjector,l=ra(a,c),u=n1(l)?l.canActivateChild(t,n):gn(c,()=>l(t,n));return Js(u).pipe(nr())});return et(o).pipe(na())}));return et(r).pipe(na())}function h1(n,e,t,i){let r=e&&e.routeConfig?e.routeConfig.canDeactivate:null;if(!r||r.length===0)return et(!0);let s=r.map(o=>{let a=e._environmentInjector,c=ra(o,a),l=i1(c)?c.canDeactivate(n,e,t,i):gn(a,()=>c(n,e,t,i));return Js(l).pipe(nr())});return et(s).pipe(na())}function p1(n,e,t,i,r){let s=e.canLoad;if(s===void 0||s.length===0)return et(!0);let o=s.map(a=>{let c=ra(a,n),l=e1(c)?c.canLoad(e,t):gn(n,()=>c(e,t)),u=Js(l);return r?u.pipe(hb(r)):u});return et(o).pipe(na(),pb(i))}function pb(n){return Op(ni(e=>{if(typeof e!="boolean")throw lf(n,e)}),_t(e=>e===!0))}function m1(n,e,t,i,r,s){let o=e.canMatch;if(!o||o.length===0)return et(!0);let a=o.map(c=>{let l=ra(c,n),u=r1(l)?l.canMatch(e,t,r):gn(n,()=>l(e,t,r));return Js(u).pipe(hb(s))});return et(a).pipe(na(),pb(i))}var gr=class n extends Error{segmentGroup;constructor(e){super(),this.segmentGroup=e||null,Object.setPrototypeOf(this,n.prototype)}},zc=class n extends Error{urlTree;constructor(e){super(),this.urlTree=e,Object.setPrototypeOf(this,n.prototype)}};function g1(n){throw new ge(4e3,!1)}function v1(n){throw lb(!1,yn.GuardRejected)}var kv=class{urlSerializer;urlTree;constructor(e,t){this.urlSerializer=e,this.urlTree=t}async lineralizeSegments(e,t){let i=[],r=t.root;for(;;){if(i=i.concat(r.segments),r.numberOfChildren===0)return i;if(r.numberOfChildren>1||!r.children[Ve])throw g1(`${e.redirectTo}`);r=r.children[Ve]}}async applyRedirectCommands(e,t,i,r,s){let o=await y1(t,r,s);if(o instanceof ui)throw new zc(o);let a=this.applyRedirectCreateUrlTree(o,this.urlSerializer.parse(o),e,i);if(o[0]==="/")throw new zc(a);return a}applyRedirectCreateUrlTree(e,t,i,r){let s=this.createSegmentGroup(e,t.root,i,r);return new ui(s,this.createQueryParams(t.queryParams,this.urlTree.queryParams),t.fragment)}createQueryParams(e,t){let i={};return Object.entries(e).forEach(([r,s])=>{if(typeof s=="string"&&s[0]===":"){let a=s.substring(1);i[r]=t[a]}else i[r]=s}),i}createSegmentGroup(e,t,i,r){let s=this.createSegments(e,t.segments,i,r),o={};return Object.entries(t.children).forEach(([a,c])=>{o[a]=this.createSegmentGroup(e,c,i,r)}),new dt(s,o)}createSegments(e,t,i,r){return t.map(s=>s.path[0]===":"?this.findPosParam(e,s,r):this.findOrReturn(s,i))}findPosParam(e,t,i){let r=i[t.path.substring(1)];if(!r)throw new ge(4001,!1);return r}findOrReturn(e,t){let i=0;for(let r of t){if(r.path===e.path)return t.splice(i),r;i++}return e}};function y1(n,e,t){if(typeof n=="string")return Promise.resolve(n);let i=n;return qd(Js(gn(t,()=>i(e))))}function _1(n,e){return n.providers&&!n._injector&&(n._injector=yc(n.providers,e,`Route: ${n.path}`)),n._injector??e}function Ti(n){return n.outlet||Ve}function x1(n,e){let t=n.filter(i=>Ti(i)===e);return t.push(...n.filter(i=>Ti(i)!==e)),t}var Uv={matched:!1,consumedSegments:[],remainingSegments:[],parameters:{},positionalParamSegments:{}};function mb(n){return{routeConfig:n.routeConfig,url:n.url,params:n.params,queryParams:n.queryParams,fragment:n.fragment,data:n.data,outlet:n.outlet,title:n.title,paramMap:n.paramMap,queryParamMap:n.queryParamMap}}function M1(n,e,t,i,r,s,o){let a=gb(n,e,t);if(!a.matched)return et(a);let c=mb(s(a));return i=_1(e,i),m1(i,e,t,r,c,o).pipe(_t(l=>l===!0?a:ae({},Uv)))}function gb(n,e,t){if(e.path==="")return e.pathMatch==="full"&&(n.hasChildren()||t.length>0)?ae({},Uv):{matched:!0,consumedSegments:[],remainingSegments:t,parameters:{},positionalParamSegments:{}};let r=(e.matcher||VS)(t,n,e);if(!r)return ae({},Uv);let s={};Object.entries(r.posParams??{}).forEach(([a,c])=>{s[a]=c.path});let o=r.consumed.length>0?ae(ae({},s),r.consumed[r.consumed.length-1].parameters):s;return{matched:!0,consumedSegments:r.consumed,remainingSegments:t.slice(r.consumed.length),parameters:o,positionalParamSegments:r.posParams??{}}}function US(n,e,t,i,r){return t.length>0&&E1(n,t,i,r)?{segmentGroup:new dt(e,b1(i,new dt(t,n.children))),slicedSegments:[]}:t.length===0&&w1(n,t,i)?{segmentGroup:new dt(n.segments,S1(n,t,i,n.children)),slicedSegments:t}:{segmentGroup:new dt(n.segments,n.children),slicedSegments:t}}function S1(n,e,t,i){let r={};for(let s of t)if(hf(n,e,s)&&!i[Ti(s)]){let o=new dt([],{});r[Ti(s)]=o}return ae(ae({},i),r)}function b1(n,e){let t={};t[Ve]=e;for(let i of n)if(i.path===""&&Ti(i)!==Ve){let r=new dt([],{});t[Ti(i)]=r}return t}function E1(n,e,t,i){return t.some(r=>!hf(n,e,r)||!(Ti(r)!==Ve)?!1:!(i!==void 0&&Ti(r)===i))}function w1(n,e,t){return t.some(i=>hf(n,e,i))}function hf(n,e,t){return(n.hasChildren()||e.length>0)&&t.pathMatch==="full"?!1:t.path===""}function C1(n,e,t){return e.length===0&&!n.children[t]}var Bv=class{};async function T1(n,e,t,i,r,s,o="emptyOnly",a){return new Vv(n,e,t,i,r,o,s,a).recognize()}var D1=31,Vv=class{injector;configLoader;rootComponentType;config;urlTree;paramsInheritanceStrategy;urlSerializer;abortSignal;applyRedirects;absoluteRedirectCount=0;allowRedirects=!0;constructor(e,t,i,r,s,o,a,c){this.injector=e,this.configLoader=t,this.rootComponentType=i,this.config=r,this.urlTree=s,this.paramsInheritanceStrategy=o,this.urlSerializer=a,this.abortSignal=c,this.applyRedirects=new kv(this.urlSerializer,this.urlTree)}noMatchError(e){return new ge(4002,`'${e.segmentGroup}'`)}async recognize(){let e=US(this.urlTree.root,[],[],this.config).segmentGroup,{children:t,rootSnapshot:i}=await this.match(e),r=new Wn(i,t),s=new Vc("",r),o=KS(i,[],this.urlTree.queryParams,this.urlTree.fragment);return o.queryParams=this.urlTree.queryParams,s.url=this.urlSerializer.serialize(o),{state:s,tree:o}}async match(e){let t=new ea([],Object.freeze({}),Object.freeze(ae({},this.urlTree.queryParams)),this.urlTree.fragment,Object.freeze({}),Ve,this.rootComponentType,null,{},this.injector);try{return{children:await this.processSegmentGroup(this.injector,this.config,e,Ve,t),rootSnapshot:t}}catch(i){if(i instanceof zc)return this.urlTree=i.urlTree,this.match(i.urlTree.root);throw i instanceof gr?this.noMatchError(i):i}}async processSegmentGroup(e,t,i,r,s){if(i.segments.length===0&&i.hasChildren())return this.processChildren(e,t,i,s);let o=await this.processSegment(e,t,i,i.segments,r,!0,s);return o instanceof Wn?[o]:[]}async processChildren(e,t,i,r){let s=[];for(let c of Object.keys(i.children))c==="primary"?s.unshift(c):s.push(c);let o=[];for(let c of s){let l=i.children[c],u=x1(t,c),d=await this.processSegmentGroup(e,u,l,c,r);o.push(...d)}let a=vb(o);return I1(a),a}async processSegment(e,t,i,r,s,o,a){for(let c of t)try{return await this.processSegmentAgainstRoute(c._injector??e,t,c,i,r,s,o,a)}catch(l){if(l instanceof gr||db(l))continue;throw l}if(C1(i,r,s))return new Bv;throw new gr(i)}async processSegmentAgainstRoute(e,t,i,r,s,o,a,c){if(Ti(i)!==o&&(o===Ve||!hf(r,s,i)))throw new gr(r);if(i.redirectTo===void 0)return this.matchSegmentAgainstRoute(e,r,i,s,o,c);if(this.allowRedirects&&a)return this.expandSegmentAgainstRouteUsingRedirect(e,r,t,i,s,o,c);throw new gr(r)}async expandSegmentAgainstRouteUsingRedirect(e,t,i,r,s,o,a){let{matched:c,parameters:l,consumedSegments:u,positionalParamSegments:d,remainingSegments:f}=gb(t,r,s);if(!c)throw new gr(t);typeof r.redirectTo=="string"&&r.redirectTo[0]==="/"&&(this.absoluteRedirectCount++,this.absoluteRedirectCount>D1&&(this.allowRedirects=!1));let h=this.createSnapshot(e,r,s,l,a);if(this.abortSignal.aborted)throw new Error(this.abortSignal.reason);let g=await this.applyRedirects.applyRedirectCommands(u,r.redirectTo,d,mb(h),e),_=await this.applyRedirects.lineralizeSegments(r,g);return this.processSegment(e,i,t,_.concat(f),o,!1,a)}createSnapshot(e,t,i,r,s){let o=new ea(i,r,Object.freeze(ae({},this.urlTree.queryParams)),this.urlTree.fragment,R1(t),Ti(t),t.component??t._loadedComponent??null,t,N1(t),e),a=Hv(o,s,this.paramsInheritanceStrategy);return o.params=Object.freeze(a.params),o.data=Object.freeze(a.data),o}async matchSegmentAgainstRoute(e,t,i,r,s,o){if(this.abortSignal.aborted)throw new Error(this.abortSignal.reason);let a=w=>this.createSnapshot(e,i,w.consumedSegments,w.parameters,o),c=await qd(M1(t,i,r,e,this.urlSerializer,a,this.abortSignal));if(i.path==="**"&&(t.children={}),!c?.matched)throw new gr(t);e=i._injector??e;let{routes:l}=await this.getChildConfig(e,i,r),u=i._loadedInjector??e,{parameters:d,consumedSegments:f,remainingSegments:h}=c,g=this.createSnapshot(e,i,f,d,o),{segmentGroup:_,slicedSegments:m}=US(t,f,h,l,s);if(m.length===0&&_.hasChildren()){let w=await this.processChildren(u,l,_,g);return new Wn(g,w)}if(l.length===0&&m.length===0)return new Wn(g,[]);let p=Ti(i)===s,M=await this.processSegment(u,l,_,m,p?Ve:s,!0,g);return new Wn(g,M instanceof Wn?[M]:[])}async getChildConfig(e,t,i){if(t.children)return{routes:t.children,injector:e};if(t.loadChildren){if(t._loadedRoutes!==void 0){let s=t._loadedNgModuleFactory;return s&&!t._loadedInjector&&(t._loadedInjector=s.create(e).injector),{routes:t._loadedRoutes,injector:t._loadedInjector}}if(this.abortSignal.aborted)throw new Error(this.abortSignal.reason);if(await qd(p1(e,t,i,this.urlSerializer,this.abortSignal))){let s=await this.configLoader.loadChildren(e,t);return t._loadedRoutes=s.routes,t._loadedInjector=s.injector,t._loadedNgModuleFactory=s.factory,s}throw v1(t)}return{routes:[],injector:e}}};function I1(n){n.sort((e,t)=>e.value.outlet===Ve?-1:t.value.outlet===Ve?1:e.value.outlet.localeCompare(t.value.outlet))}function A1(n){let e=n.value.routeConfig;return e&&e.path===""}function vb(n){let e=[],t=new Set;for(let i of n){if(!A1(i)){e.push(i);continue}let r=e.find(s=>i.value.routeConfig===s.value.routeConfig);r!==void 0?(r.children.push(...i.children),t.add(r)):e.push(i)}for(let i of t){let r=vb(i.children);e.push(new Wn(i.value,r))}return e.filter(i=>!t.has(i))}function R1(n){return n.data||{}}function N1(n){return n.resolve||{}}function P1(n,e,t,i,r,s,o){return En(async a=>{let{state:c,tree:l}=await T1(n,e,t,i,a.extractedUrl,r,s,o);return rt(ae({},a),{targetSnapshot:c,urlAfterRedirects:l})})}function O1(n){return En(e=>{let{targetSnapshot:t,guards:{canActivateChecks:i}}=e;if(!i.length)return et(e);let r=new Set(i.map(a=>a.route)),s=new Set;for(let a of r)if(!s.has(a))for(let c of yb(a))s.add(c);let o=0;return Gt(s).pipe(au(a=>r.has(a)?L1(a,t,n):(a.data=Hv(a,a.parent,n).resolve,et(void 0))),ni(()=>o++),cu(1),En(a=>o===s.size?et(e):un))})}function yb(n){let e=n.children.map(t=>yb(t)).flat();return[n,...e]}function L1(n,e,t){let i=n.routeConfig,r=n._resolve;return i?.title!==void 0&&!ob(i)&&(r[Gc]=i.title),Va(()=>(n.data=Hv(n,n.parent,t).resolve,F1(r,n,e).pipe(_t(s=>(n._resolvedData=s,n.data=ae(ae({},n.data),s),null)))))}function F1(n,e,t){let i=Tv(n);if(i.length===0)return et({});let r={};return Gt(i).pipe(En(s=>k1(n[s],e,t).pipe(nr(),ni(o=>{if(o instanceof ta)throw lf(new Xr,o);r[s]=o}))),cu(1),_t(()=>r),Ha(s=>db(s)?un:kp(s)))}function k1(n,e,t){let i=e._environmentInjector,r=ra(n,i),s=r.resolve?r.resolve(e,t):gn(i,()=>r(e,t));return Js(s)}function BS(n){return mn(e=>{let t=n(e);return t?Gt(t).pipe(_t(()=>e)):et(e)})}var Wv=(()=>{class n{buildTitle(t){let i,r=t.root;for(;r!==void 0;)i=this.getResolvedTitleForRoute(r)??i,r=r.children.find(s=>s.outlet===Ve);return i}getResolvedTitleForRoute(t){return t.data[Gc]}static \u0275fac=function(i){return new(i||n)};static \u0275prov=Ce({token:n,factory:()=>Q(_b),providedIn:"root"})}return n})(),_b=(()=>{class n extends Wv{title;constructor(t){super(),this.title=t}updateTitle(t){let i=this.buildTitle(t);i!==void 0&&this.title.setTitle(i)}static \u0275fac=function(i){return new(i||n)(Re(NS))};static \u0275prov=Ce({token:n,factory:n.\u0275fac,providedIn:"root"})}return n})(),qc=new Ie("",{factory:()=>({})}),Xc=new Ie(""),xb=(()=>{class n{componentLoaders=new WeakMap;childrenLoaders=new WeakMap;onLoadStartListener;onLoadEndListener;compiler=Q(Qg);async loadComponent(t,i){if(this.componentLoaders.get(i))return this.componentLoaders.get(i);if(i._loadedComponent)return Promise.resolve(i._loadedComponent);this.onLoadStartListener&&this.onLoadStartListener(i);let r=(async()=>{try{let s=await zS(gn(t,()=>i.loadComponent())),o=await bb(Sb(s));return this.onLoadEndListener&&this.onLoadEndListener(i),i._loadedComponent=o,o}finally{this.componentLoaders.delete(i)}})();return this.componentLoaders.set(i,r),r}loadChildren(t,i){if(this.childrenLoaders.get(i))return this.childrenLoaders.get(i);if(i._loadedRoutes)return Promise.resolve({routes:i._loadedRoutes,injector:i._loadedInjector});this.onLoadStartListener&&this.onLoadStartListener(i);let r=(async()=>{try{let s=await Mb(i,this.compiler,t,this.onLoadEndListener);return i._loadedRoutes=s.routes,i._loadedInjector=s.injector,i._loadedNgModuleFactory=s.factory,s}finally{this.childrenLoaders.delete(i)}})();return this.childrenLoaders.set(i,r),r}static \u0275fac=function(i){return new(i||n)};static \u0275prov=Ce({token:n,factory:n.\u0275fac,providedIn:"root"})}return n})();async function Mb(n,e,t,i){let r=await zS(gn(t,()=>n.loadChildren())),s=await bb(Sb(r)),o;s instanceof vd||Array.isArray(s)?o=s:o=await e.compileModuleAsync(s),i&&i(n);let a,c,l=!1,u;return Array.isArray(o)?(c=o,l=!0):(a=o.create(t).injector,u=o,c=a.get(Xc,[],{optional:!0,self:!0}).flat()),{routes:c.map(jv),injector:a,factory:u}}function U1(n){return n&&typeof n=="object"&&"default"in n}function Sb(n){return U1(n)?n.default:n}async function bb(n){return n}var pf=(()=>{class n{static \u0275fac=function(i){return new(i||n)};static \u0275prov=Ce({token:n,factory:()=>Q(B1),providedIn:"root"})}return n})(),B1=(()=>{class n{shouldProcessUrl(t){return!0}extract(t){return t}merge(t,i){return t}static \u0275fac=function(i){return new(i||n)};static \u0275prov=Ce({token:n,factory:n.\u0275fac,providedIn:"root"})}return n})(),Eb=new Ie("");var V1=()=>{},wb=new Ie(""),Cb=(()=>{class n{currentNavigation=Vt(null,{equal:()=>!1});currentTransition=null;lastSuccessfulNavigation=Vt(null);events=new Ut;transitionAbortWithErrorSubject=new Ut;configLoader=Q(xb);environmentInjector=Q(Wt);destroyRef=Q(dr);urlSerializer=Q(jc);rootContexts=Q(ia);location=Q(qo);inputBindingEnabled=Q(ff,{optional:!0})!==null;titleStrategy=Q(Wv);options=Q(qc,{optional:!0})||{};paramsInheritanceStrategy=this.options.paramsInheritanceStrategy||"emptyOnly";urlHandlingStrategy=Q(pf);createViewTransition=Q(Eb,{optional:!0});navigationErrorHandler=Q(wb,{optional:!0});navigationId=0;get hasRequestedNavigation(){return this.navigationId!==0}transitions;afterPreactivation=()=>et(void 0);rootComponentType=null;destroyed=!1;constructor(){let t=r=>this.events.next(new ef(r)),i=r=>this.events.next(new tf(r));this.configLoader.onLoadEndListener=i,this.configLoader.onLoadStartListener=t,this.destroyRef.onDestroy(()=>{this.destroyed=!0})}complete(){this.transitions?.complete()}handleNavigationRequest(t){let i=++this.navigationId;Ci(()=>{this.transitions?.next(rt(ae({},t),{extractedUrl:this.urlHandlingStrategy.extract(t.rawUrl),targetSnapshot:null,targetRouterState:null,guards:{canActivateChecks:[],canDeactivateChecks:[]},guardsResult:null,id:i,routesRecognizeHandler:{},beforeActivateHandler:{}}))})}setupNavigations(t){return this.transitions=new ln(null),this.transitions.pipe(ti(i=>i!==null),mn(i=>{let r=!1,s=new AbortController,o=()=>!r&&this.currentTransition?.id===i.id;return et(i).pipe(mn(a=>{if(this.navigationId>i.id)return this.cancelNavigationTransition(i,"",yn.SupersededByNewNavigation),un;this.currentTransition=i;let c=this.lastSuccessfulNavigation();this.currentNavigation.set({id:a.id,initialUrl:a.rawUrl,extractedUrl:a.extractedUrl,targetBrowserUrl:typeof a.extras.browserUrl=="string"?this.urlSerializer.parse(a.extras.browserUrl):a.extras.browserUrl,trigger:a.source,extras:a.extras,previousNavigation:c?rt(ae({},c),{previousNavigation:null}):null,abort:()=>s.abort(),routesRecognizeHandler:a.routesRecognizeHandler,beforeActivateHandler:a.beforeActivateHandler});let l=!t.navigated||this.isUpdatingInternalState()||this.isUpdatedBrowserUrl(),u=a.extras.onSameUrlNavigation??t.onSameUrlNavigation;if(!l&&u!=="reload")return this.events.next(new yr(a.id,this.urlSerializer.serialize(a.rawUrl),"",Fc.IgnoredSameUrlNavigation)),a.resolve(!1),un;if(this.urlHandlingStrategy.shouldProcessUrl(a.rawUrl))return et(a).pipe(mn(d=>(this.events.next(new Ys(d.id,this.urlSerializer.serialize(d.extractedUrl),d.source,d.restoredState)),d.id!==this.navigationId?un:Promise.resolve(d))),P1(this.environmentInjector,this.configLoader,this.rootComponentType,t.config,this.urlSerializer,this.paramsInheritanceStrategy,s.signal),ni(d=>{i.targetSnapshot=d.targetSnapshot,i.urlAfterRedirects=d.urlAfterRedirects,this.currentNavigation.update(f=>(f.finalUrl=d.urlAfterRedirects,f)),this.events.next(new Uc)}),mn(d=>Gt(i.routesRecognizeHandler.deferredHandle??et(void 0)).pipe(_t(()=>d))),ni(()=>{let d=new kc(a.id,this.urlSerializer.serialize(a.extractedUrl),this.urlSerializer.serialize(a.urlAfterRedirects),a.targetSnapshot);this.events.next(d)}));if(l&&this.urlHandlingStrategy.shouldProcessUrl(a.currentRawUrl)){let{id:d,extractedUrl:f,source:h,restoredState:g,extras:_}=a,m=new Ys(d,this.urlSerializer.serialize(f),h,g);this.events.next(m);let p=rb(this.rootComponentType,this.environmentInjector).snapshot;return this.currentTransition=i=rt(ae({},a),{targetSnapshot:p,urlAfterRedirects:f,extras:rt(ae({},_),{skipLocationChange:!1,replaceUrl:!1})}),this.currentNavigation.update(M=>(M.finalUrl=f,M)),et(i)}else return this.events.next(new yr(a.id,this.urlSerializer.serialize(a.extractedUrl),"",Fc.IgnoredByUrlHandlingStrategy)),a.resolve(!1),un}),_t(a=>{let c=new Zd(a.id,this.urlSerializer.serialize(a.extractedUrl),this.urlSerializer.serialize(a.urlAfterRedirects),a.targetSnapshot);return this.events.next(c),this.currentTransition=i=rt(ae({},a),{guards:YR(a.targetSnapshot,a.currentSnapshot,this.rootContexts)}),i}),o1(a=>this.events.next(a)),mn(a=>{if(i.guardsResult=a.guardsResult,a.guardsResult&&typeof a.guardsResult!="boolean")throw lf(this.urlSerializer,a.guardsResult);let c=new Jd(a.id,this.urlSerializer.serialize(a.extractedUrl),this.urlSerializer.serialize(a.urlAfterRedirects),a.targetSnapshot,!!a.guardsResult);if(this.events.next(c),!o())return un;if(!a.guardsResult)return this.cancelNavigationTransition(a,"",yn.GuardRejected),un;if(a.guards.canActivateChecks.length===0)return et(a);let l=new Kd(a.id,this.urlSerializer.serialize(a.extractedUrl),this.urlSerializer.serialize(a.urlAfterRedirects),a.targetSnapshot);if(this.events.next(l),!o())return un;let u=!1;return et(a).pipe(O1(this.paramsInheritanceStrategy),ni({next:()=>{u=!0;let d=new Qd(a.id,this.urlSerializer.serialize(a.extractedUrl),this.urlSerializer.serialize(a.urlAfterRedirects),a.targetSnapshot);this.events.next(d)},complete:()=>{u||this.cancelNavigationTransition(a,"",yn.NoDataFromResolver)}}))}),BS(a=>{let c=u=>{let d=[];if(u.routeConfig?._loadedComponent)u.component=u.routeConfig?._loadedComponent;else if(u.routeConfig?.loadComponent){let f=u._environmentInjector;d.push(this.configLoader.loadComponent(f,u.routeConfig).then(h=>{u.component=h}))}for(let f of u.children)d.push(...c(f));return d},l=c(a.targetSnapshot.root);return l.length===0?et(a):Gt(Promise.all(l).then(()=>a))}),BS(()=>this.afterPreactivation()),mn(()=>{let{currentSnapshot:a,targetSnapshot:c}=i,l=this.createViewTransition?.(this.environmentInjector,a.root,c.root);return l?Gt(l).pipe(_t(()=>i)):et(i)}),wn(1),mn(a=>{let c=WR(t.routeReuseStrategy,a.targetSnapshot,a.currentRouterState);this.currentTransition=i=a=rt(ae({},a),{targetRouterState:c}),this.currentNavigation.update(u=>(u.targetRouterState=c,u)),this.events.next(new Ko);let l=i.beforeActivateHandler.deferredHandle;return l?Gt(l.then(()=>a)):et(a)}),ni(a=>{new Fv(t.routeReuseStrategy,i.targetRouterState,i.currentRouterState,c=>this.events.next(c),this.inputBindingEnabled).activate(this.rootContexts),o()&&(r=!0,this.currentNavigation.update(c=>(c.abort=V1,c)),this.lastSuccessfulNavigation.set(Ci(this.currentNavigation)),this.events.next(new vr(a.id,this.urlSerializer.serialize(a.extractedUrl),this.urlSerializer.serialize(a.urlAfterRedirects))),this.titleStrategy?.updateTitle(a.targetRouterState.snapshot),a.resolve(!0))}),za(fb(s.signal).pipe(ti(()=>!r&&!i.targetRouterState),ni(()=>{this.cancelNavigationTransition(i,s.signal.reason+"",yn.Aborted)}))),ni({complete:()=>{r=!0}}),za(this.transitionAbortWithErrorSubject.pipe(ni(a=>{throw a}))),Bp(()=>{s.abort(),r||this.cancelNavigationTransition(i,"",yn.SupersededByNewNavigation),this.currentTransition?.id===i.id&&(this.currentNavigation.set(null),this.currentTransition=null)}),Ha(a=>{if(r=!0,this.destroyed)return i.resolve(!1),un;if(ub(a))this.events.next(new li(i.id,this.urlSerializer.serialize(i.extractedUrl),a.message,a.cancellationCode)),XR(a)?this.events.next(new Qo(a.url,a.navigationBehaviorOptions)):i.resolve(!1);else{let c=new Zs(i.id,this.urlSerializer.serialize(i.extractedUrl),a,i.targetSnapshot??void 0);try{let l=gn(this.environmentInjector,()=>this.navigationErrorHandler?.(c));if(l instanceof ta){let{message:u,cancellationCode:d}=lf(this.urlSerializer,l);this.events.next(new li(i.id,this.urlSerializer.serialize(i.extractedUrl),u,d)),this.events.next(new Qo(l.redirectTo,l.navigationBehaviorOptions))}else throw this.events.next(c),a}catch(l){this.options.resolveNavigationPromiseOnError?i.resolve(!1):i.reject(l)}}return un}))}))}cancelNavigationTransition(t,i,r){let s=new li(t.id,this.urlSerializer.serialize(t.extractedUrl),i,r);this.events.next(s),t.resolve(!1)}isUpdatingInternalState(){return this.currentTransition?.extractedUrl.toString()!==this.currentTransition?.currentUrlTree.toString()}isUpdatedBrowserUrl(){let t=this.urlHandlingStrategy.extract(this.urlSerializer.parse(this.location.path(!0))),i=Ci(this.currentNavigation),r=i?.targetBrowserUrl??i?.extractedUrl;return t.toString()!==r?.toString()&&!i?.extras.skipLocationChange}static \u0275fac=function(i){return new(i||n)};static \u0275prov=Ce({token:n,factory:n.\u0275fac,providedIn:"root"})}return n})();function H1(n){return n!==Pc}var Tb=new Ie("");var Db=(()=>{class n{static \u0275fac=function(i){return new(i||n)};static \u0275prov=Ce({token:n,factory:()=>Q(z1),providedIn:"root"})}return n})(),df=class{shouldDetach(e){return!1}store(e,t){}shouldAttach(e){return!1}retrieve(e){return null}shouldReuseRoute(e,t){return e.routeConfig===t.routeConfig}shouldDestroyInjector(e){return!0}},z1=(()=>{class n extends df{static \u0275fac=(()=>{let t;return function(r){return(t||(t=mc(n)))(r||n)}})();static \u0275prov=Ce({token:n,factory:n.\u0275fac,providedIn:"root"})}return n})(),$v=(()=>{class n{urlSerializer=Q(jc);options=Q(qc,{optional:!0})||{};canceledNavigationResolution=this.options.canceledNavigationResolution||"replace";location=Q(qo);urlHandlingStrategy=Q(pf);urlUpdateStrategy=this.options.urlUpdateStrategy||"deferred";currentUrlTree=new ui;getCurrentUrlTree(){return this.currentUrlTree}rawUrlTree=this.currentUrlTree;getRawUrlTree(){return this.rawUrlTree}createBrowserPath({finalUrl:t,initialUrl:i,targetBrowserUrl:r}){let s=t!==void 0?this.urlHandlingStrategy.merge(t,i):i,o=r??s;return o instanceof ui?this.urlSerializer.serialize(o):o}commitTransition({targetRouterState:t,finalUrl:i,initialUrl:r}){i&&t?(this.currentUrlTree=i,this.rawUrlTree=this.urlHandlingStrategy.merge(i,r),this.routerState=t):this.rawUrlTree=r}routerState=rb(null,Q(Wt));getRouterState(){return this.routerState}_stateMemento=this.createStateMemento();get stateMemento(){return this._stateMemento}updateStateMemento(){this._stateMemento=this.createStateMemento()}createStateMemento(){return{rawUrlTree:this.rawUrlTree,currentUrlTree:this.currentUrlTree,routerState:this.routerState}}restoredState(){return this.location.getState()}static \u0275fac=function(i){return new(i||n)};static \u0275prov=Ce({token:n,factory:()=>Q(G1),providedIn:"root"})}return n})(),G1=(()=>{class n extends $v{currentPageId=0;lastSuccessfulId=-1;get browserPageId(){return this.canceledNavigationResolution!=="computed"?this.currentPageId:this.restoredState()?.\u0275routerPageId??this.currentPageId}registerNonRouterCurrentEntryChangeListener(t){return this.location.subscribe(i=>{i.type==="popstate"&&setTimeout(()=>{t(i.url,i.state,"popstate",{replaceUrl:!0})})})}handleRouterEvent(t,i){t instanceof Ys?this.updateStateMemento():t instanceof yr?this.commitTransition(i):t instanceof kc?this.urlUpdateStrategy==="eager"&&(i.extras.skipLocationChange||this.setBrowserUrl(this.createBrowserPath(i),i)):t instanceof Ko?(this.commitTransition(i),this.urlUpdateStrategy==="deferred"&&!i.extras.skipLocationChange&&this.setBrowserUrl(this.createBrowserPath(i),i)):t instanceof li&&!ib(t)?this.restoreHistory(i):t instanceof Zs?this.restoreHistory(i,!0):t instanceof vr&&(this.lastSuccessfulId=t.id,this.currentPageId=this.browserPageId)}setBrowserUrl(t,{extras:i,id:r}){let{replaceUrl:s,state:o}=i;if(this.location.isCurrentPathEqualTo(t)||s){let a=this.browserPageId,c=ae(ae({},o),this.generateNgRouterState(r,a));this.location.replaceState(t,"",c)}else{let a=ae(ae({},o),this.generateNgRouterState(r,this.browserPageId+1));this.location.go(t,"",a)}}restoreHistory(t,i=!1){if(this.canceledNavigationResolution==="computed"){let r=this.browserPageId,s=this.currentPageId-r;s!==0?this.location.historyGo(s):this.getCurrentUrlTree()===t.finalUrl&&s===0&&(this.resetInternalState(t),this.resetUrlToCurrentUrlTree())}else this.canceledNavigationResolution==="replace"&&(i&&this.resetInternalState(t),this.resetUrlToCurrentUrlTree())}resetInternalState({finalUrl:t}){this.routerState=this.stateMemento.routerState,this.currentUrlTree=this.stateMemento.currentUrlTree,this.rawUrlTree=this.urlHandlingStrategy.merge(this.currentUrlTree,t??this.rawUrlTree)}resetUrlToCurrentUrlTree(){this.location.replaceState(this.urlSerializer.serialize(this.getRawUrlTree()),"",this.generateNgRouterState(this.lastSuccessfulId,this.currentPageId))}generateNgRouterState(t,i){return this.canceledNavigationResolution==="computed"?{navigationId:t,\u0275routerPageId:i}:{navigationId:t}}static \u0275fac=(()=>{let t;return function(r){return(t||(t=mc(n)))(r||n)}})();static \u0275prov=Ce({token:n,factory:n.\u0275fac,providedIn:"root"})}return n})();function qv(n,e){n.events.pipe(ti(t=>t instanceof vr||t instanceof li||t instanceof Zs||t instanceof yr),_t(t=>t instanceof vr||t instanceof yr?0:(t instanceof li?t.code===yn.Redirect||t.code===yn.SupersededByNewNavigation:!1)?2:1),ti(t=>t!==2),wn(1)).subscribe(()=>{e()})}var mf=(()=>{class n{get currentUrlTree(){return this.stateManager.getCurrentUrlTree()}get rawUrlTree(){return this.stateManager.getRawUrlTree()}disposed=!1;nonRouterCurrentEntryChangeSubscription;console=Q(qg);stateManager=Q($v);options=Q(qc,{optional:!0})||{};pendingTasks=Q(zr);urlUpdateStrategy=this.options.urlUpdateStrategy||"deferred";navigationTransitions=Q(Cb);urlSerializer=Q(jc);location=Q(qo);urlHandlingStrategy=Q(pf);injector=Q(Wt);_events=new Ut;get events(){return this._events}get routerState(){return this.stateManager.getRouterState()}navigated=!1;routeReuseStrategy=Q(Db);injectorCleanup=Q(Tb,{optional:!0});onSameUrlNavigation=this.options.onSameUrlNavigation||"ignore";config=Q(Xc,{optional:!0})?.flat()??[];componentInputBindingEnabled=!!Q(ff,{optional:!0});currentNavigation=this.navigationTransitions.currentNavigation.asReadonly();constructor(){this.resetConfig(this.config),this.navigationTransitions.setupNavigations(this).subscribe({error:t=>{}}),this.subscribeToNavigationEvents()}eventsSubscription=new cn;subscribeToNavigationEvents(){let t=this.navigationTransitions.events.subscribe(i=>{try{let r=this.navigationTransitions.currentTransition,s=Ci(this.navigationTransitions.currentNavigation);if(r!==null&&s!==null){if(this.stateManager.handleRouterEvent(i,s),i instanceof li&&i.code!==yn.Redirect&&i.code!==yn.SupersededByNewNavigation)this.navigated=!0;else if(i instanceof vr)this.navigated=!0,this.injectorCleanup?.(this.routeReuseStrategy,this.routerState,this.config);else if(i instanceof Qo){let o=i.navigationBehaviorOptions,a=this.urlHandlingStrategy.merge(i.url,r.currentRawUrl),c=ae({scroll:r.extras.scroll,browserUrl:r.extras.browserUrl,info:r.extras.info,skipLocationChange:r.extras.skipLocationChange,replaceUrl:r.extras.replaceUrl||this.urlUpdateStrategy==="eager"||H1(r.source)},o);this.scheduleNavigation(a,Pc,null,c,{resolve:r.resolve,reject:r.reject,promise:r.promise})}}GR(i)&&this._events.next(i)}catch(r){this.navigationTransitions.transitionAbortWithErrorSubject.next(r)}});this.eventsSubscription.add(t)}resetRootComponentType(t){this.routerState.root.component=t,this.navigationTransitions.rootComponentType=t}initialNavigation(){this.setUpLocationChangeListener(),this.navigationTransitions.hasRequestedNavigation||this.navigateToSyncWithBrowser(this.location.path(!0),Pc,this.stateManager.restoredState(),{replaceUrl:!0})}setUpLocationChangeListener(){this.nonRouterCurrentEntryChangeSubscription??=this.stateManager.registerNonRouterCurrentEntryChangeListener((t,i,r,s)=>{this.navigateToSyncWithBrowser(t,r,i,s)})}navigateToSyncWithBrowser(t,i,r,s){let o=r?.navigationId?r:null;if(r){let c=ae({},r);delete c.navigationId,delete c.\u0275routerPageId,Object.keys(c).length!==0&&(s.state=c)}let a=this.parseUrl(t);this.scheduleNavigation(a,i,o,s).catch(c=>{this.disposed||this.injector.get(xi)(c)})}get url(){return this.serializeUrl(this.currentUrlTree)}getCurrentNavigation(){return Ci(this.navigationTransitions.currentNavigation)}get lastSuccessfulNavigation(){return this.navigationTransitions.lastSuccessfulNavigation}resetConfig(t){this.config=t.map(jv),this.navigated=!1}ngOnDestroy(){this.dispose()}dispose(){this._events.unsubscribe(),this.navigationTransitions.complete(),this.nonRouterCurrentEntryChangeSubscription?.unsubscribe(),this.nonRouterCurrentEntryChangeSubscription=void 0,this.disposed=!0,this.eventsSubscription.unsubscribe()}createUrlTree(t,i={}){let{relativeTo:r,queryParams:s,fragment:o,queryParamsHandling:a,preserveFragment:c}=i,l=c?this.currentUrlTree.fragment:o,u=null;switch(a??this.options.defaultQueryParamsHandling){case"merge":u=ae(ae({},this.currentUrlTree.queryParams),s);break;case"preserve":u=this.currentUrlTree.queryParams;break;default:u=s||null}u!==null&&(u=this.removeEmptyProps(u));let d;try{let f=r?r.snapshot:this.routerState.snapshot.root;d=QS(f)}catch{(typeof t[0]!="string"||t[0][0]!=="/")&&(t=[]),d=this.currentUrlTree.root}return eb(d,t,u,l??null,this.urlSerializer)}navigateByUrl(t,i={skipLocationChange:!1}){let r=Jo(t)?t:this.parseUrl(t),s=this.urlHandlingStrategy.merge(r,this.rawUrlTree);return this.scheduleNavigation(s,Pc,null,i)}navigate(t,i={skipLocationChange:!1}){return j1(t),this.navigateByUrl(this.createUrlTree(t,i),i)}serializeUrl(t){return this.urlSerializer.serialize(t)}parseUrl(t){try{return this.urlSerializer.parse(t)}catch{return this.console.warn(Lr(4018,!1)),this.urlSerializer.parse("/")}}isActive(t,i){let r;if(i===!0?r=ae({},jS):i===!1?r=ae({},Dv):r=ae(ae({},Dv),i),Jo(t))return PS(this.currentUrlTree,t,r);let s=this.parseUrl(t);return PS(this.currentUrlTree,s,r)}removeEmptyProps(t){return Object.entries(t).reduce((i,[r,s])=>(s!=null&&(i[r]=s),i),{})}scheduleNavigation(t,i,r,s,o){if(this.disposed)return Promise.resolve(!1);let a,c,l;o?(a=o.resolve,c=o.reject,l=o.promise):l=new Promise((d,f)=>{a=d,c=f});let u=this.pendingTasks.add();return qv(this,()=>{queueMicrotask(()=>this.pendingTasks.remove(u))}),this.navigationTransitions.handleNavigationRequest({source:i,restoredState:r,currentUrlTree:this.currentUrlTree,currentRawUrl:this.currentUrlTree,rawUrl:t,extras:s,resolve:a,reject:c,promise:l,currentSnapshot:this.routerState.snapshot,currentRouterState:this.routerState}),l.catch(Promise.reject.bind(Promise))}static \u0275fac=function(i){return new(i||n)};static \u0275prov=Ce({token:n,factory:n.\u0275fac,providedIn:"root"})}return n})();function j1(n){for(let e=0;e<n.length;e++)if(n[e]==null)throw new ge(4008,!1)}var q1=new Ie("");function Xv(n,...e){return sr([{provide:Xc,multi:!0,useValue:n},[],{provide:Yr,useFactory:X1},{provide:_d,multi:!0,useFactory:Y1},e.map(t=>t.\u0275providers)])}function X1(){return Q(mf).routerState.root}function Y1(){let n=Q(Fn);return e=>{let t=n.get(hr);if(e!==t.components[0])return;let i=n.get(mf),r=n.get(Z1);n.get(J1)===1&&i.initialNavigation(),n.get(K1,null,{optional:!0})?.setUpPreloading(),n.get(q1,null,{optional:!0})?.init(),i.resetRootComponentType(t.componentTypes[0]),r.closed||(r.next(),r.complete(),r.unsubscribe())}}var Z1=new Ie("",{factory:()=>new Ut}),J1=new Ie("",{factory:()=>1});var K1=new Ie("");var Zb=0,Ay=1,Jb=2;var _l=1,Kb=2,Aa=3,Cr=0,Nn=1,Xi=2,Yi=0,io=1,Ry=2,Ny=3,Py=4,Qb=5;var is=100,eE=101,tE=102,nE=103,iE=104,rE=200,sE=201,oE=202,aE=203,kf=204,Uf=205,cE=206,lE=207,uE=208,dE=209,fE=210,hE=211,pE=212,mE=213,gE=214,Bf=0,Vf=1,Hf=2,ro=3,zf=4,Gf=5,jf=6,Wf=7,Oy=0,vE=1,yE=2,Ni=0,Ly=1,Fy=2,ky=3,Uy=4,By=5,Vy=6,Hy=7;var _y=300,ds=301,oo=302,mh=303,gh=304,xl=306,$f=1e3,ji=1001,qf=1002,sn=1003,_E=1004;var Ml=1005;var fn=1006,vh=1007;var fs=1008;var Vn=1009,zy=1010,Gy=1011,Ra=1012,yh=1013,Pi=1014,Oi=1015,Zi=1016,_h=1017,xh=1018,Na=1020,jy=35902,Wy=35899,$y=1021,qy=1022,hi=1023,Wi=1026,hs=1027,Xy=1028,Mh=1029,ao=1030,Sh=1031;var bh=1033,Sl=33776,bl=33777,El=33778,wl=33779,Eh=35840,wh=35841,Ch=35842,Th=35843,Dh=36196,Ih=37492,Ah=37496,Rh=37488,Nh=37489,Ph=37490,Oh=37491,Lh=37808,Fh=37809,kh=37810,Uh=37811,Bh=37812,Vh=37813,Hh=37814,zh=37815,Gh=37816,jh=37817,Wh=37818,$h=37819,qh=37820,Xh=37821,Yh=36492,Zh=36494,Jh=36495,Kh=36283,Qh=36284,ep=36285,tp=36286;var el=2300,Xf=2301,Ff=2302,xy=2303,My=2400,Sy=2401,by=2402;var xE=3200;var Yy=0,ME=1,Dr="",Yn="srgb",so="srgb-linear",tl="linear",gt="srgb";var no=7680;var Ey=519,SE=512,bE=513,EE=514,np=515,wE=516,CE=517,ip=518,TE=519,wy=35044;var Zy="300 es",Ri=2e3,ya=2001;function eN(n){for(let e=n.length-1;e>=0;--e)if(n[e]>=65535)return!0;return!1}function tN(n){return ArrayBuffer.isView(n)&&!(n instanceof DataView)}function nl(n){return document.createElementNS("http://www.w3.org/1999/xhtml",n)}function DE(){let n=nl("canvas");return n.style.display="block",n}var Ib={},_a=null;function Jy(...n){let e="THREE."+n.shift();_a?_a("log",e,...n):console.log(e,...n)}function IE(n){let e=n[0];if(typeof e=="string"&&e.startsWith("TSL:")){let t=n[1];t&&t.isStackTrace?n[0]+=" "+t.getLocation():n[1]='Stack trace not available. Enable "THREE.Node.captureStackTrace" to capture stack traces.'}return n}function Le(...n){n=IE(n);let e="THREE."+n.shift();if(_a)_a("warn",e,...n);else{let t=n[0];t&&t.isStackTrace?console.warn(t.getError(e)):console.warn(e,...n)}}function Ne(...n){n=IE(n);let e="THREE."+n.shift();if(_a)_a("error",e,...n);else{let t=n[0];t&&t.isStackTrace?console.error(t.getError(e)):console.error(e,...n)}}function il(...n){let e=n.join(" ");e in Ib||(Ib[e]=!0,Le(...n))}function AE(n,e,t){return new Promise(function(i,r){function s(){switch(n.clientWaitSync(e,n.SYNC_FLUSH_COMMANDS_BIT,0)){case n.WAIT_FAILED:r();break;case n.TIMEOUT_EXPIRED:setTimeout(s,t);break;default:i()}}setTimeout(s,t)})}var RE={[Bf]:Vf,[Hf]:jf,[zf]:Wf,[ro]:Gf,[Vf]:Bf,[jf]:Hf,[Wf]:zf,[Gf]:ro},Tr=class{addEventListener(e,t){this._listeners===void 0&&(this._listeners={});let i=this._listeners;i[e]===void 0&&(i[e]=[]),i[e].indexOf(t)===-1&&i[e].push(t)}hasEventListener(e,t){let i=this._listeners;return i===void 0?!1:i[e]!==void 0&&i[e].indexOf(t)!==-1}removeEventListener(e,t){let i=this._listeners;if(i===void 0)return;let r=i[e];if(r!==void 0){let s=r.indexOf(t);s!==-1&&r.splice(s,1)}}dispatchEvent(e){let t=this._listeners;if(t===void 0)return;let i=t[e.type];if(i!==void 0){e.target=this;let r=i.slice(0);for(let s=0,o=r.length;s<o;s++)r[s].call(this,e);e.target=null}}},_n=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"];var Yv=Math.PI/180,Yf=180/Math.PI;function Cl(){let n=Math.random()*4294967295|0,e=Math.random()*4294967295|0,t=Math.random()*4294967295|0,i=Math.random()*4294967295|0;return(_n[n&255]+_n[n>>8&255]+_n[n>>16&255]+_n[n>>24&255]+"-"+_n[e&255]+_n[e>>8&255]+"-"+_n[e>>16&15|64]+_n[e>>24&255]+"-"+_n[t&63|128]+_n[t>>8&255]+"-"+_n[t>>16&255]+_n[t>>24&255]+_n[i&255]+_n[i>>8&255]+_n[i>>16&255]+_n[i>>24&255]).toLowerCase()}function nt(n,e,t){return Math.max(e,Math.min(t,n))}function nN(n,e){return(n%e+e)%e}function Zv(n,e,t){return(1-t)*n+t*e}function Yc(n,e){switch(e.constructor){case Float32Array:return n;case Uint32Array:return n/4294967295;case Uint16Array:return n/65535;case Uint8Array:return n/255;case Int32Array:return Math.max(n/2147483647,-1);case Int16Array:return Math.max(n/32767,-1);case Int8Array:return Math.max(n/127,-1);default:throw new Error("Invalid component type.")}}function Bn(n,e){switch(e.constructor){case Float32Array:return n;case Uint32Array:return Math.round(n*4294967295);case Uint16Array:return Math.round(n*65535);case Uint8Array:return Math.round(n*255);case Int32Array:return Math.round(n*2147483647);case Int16Array:return Math.round(n*32767);case Int8Array:return Math.round(n*127);default:throw new Error("Invalid component type.")}}var it=class n{constructor(e=0,t=0){n.prototype.isVector2=!0,this.x=e,this.y=t}get width(){return this.x}set width(e){this.x=e}get height(){return this.y}set height(e){this.y=e}set(e,t){return this.x=e,this.y=t,this}setScalar(e){return this.x=e,this.y=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y)}copy(e){return this.x=e.x,this.y=e.y,this}add(e){return this.x+=e.x,this.y+=e.y,this}addScalar(e){return this.x+=e,this.y+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this}subScalar(e){return this.x-=e,this.y-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this}multiply(e){return this.x*=e.x,this.y*=e.y,this}multiplyScalar(e){return this.x*=e,this.y*=e,this}divide(e){return this.x/=e.x,this.y/=e.y,this}divideScalar(e){return this.multiplyScalar(1/e)}applyMatrix3(e){let t=this.x,i=this.y,r=e.elements;return this.x=r[0]*t+r[3]*i+r[6],this.y=r[1]*t+r[4]*i+r[7],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this}clamp(e,t){return this.x=nt(this.x,e.x,t.x),this.y=nt(this.y,e.y,t.y),this}clampScalar(e,t){return this.x=nt(this.x,e,t),this.y=nt(this.y,e,t),this}clampLength(e,t){let i=this.length();return this.divideScalar(i||1).multiplyScalar(nt(i,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(e){return this.x*e.x+this.y*e.y}cross(e){return this.x*e.y-this.y*e.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(e){let t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;let i=this.dot(e)/t;return Math.acos(nt(i,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){let t=this.x-e.x,i=this.y-e.y;return t*t+i*i}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this}lerpVectors(e,t,i){return this.x=e.x+(t.x-e.x)*i,this.y=e.y+(t.y-e.y)*i,this}equals(e){return e.x===this.x&&e.y===this.y}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this}rotateAround(e,t){let i=Math.cos(t),r=Math.sin(t),s=this.x-e.x,o=this.y-e.y;return this.x=s*i-o*r+e.x,this.y=s*r+o*i+e.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}},fi=class{constructor(e=0,t=0,i=0,r=1){this.isQuaternion=!0,this._x=e,this._y=t,this._z=i,this._w=r}static slerpFlat(e,t,i,r,s,o,a){let c=i[r+0],l=i[r+1],u=i[r+2],d=i[r+3],f=s[o+0],h=s[o+1],g=s[o+2],_=s[o+3];if(d!==_||c!==f||l!==h||u!==g){let m=c*f+l*h+u*g+d*_;m<0&&(f=-f,h=-h,g=-g,_=-_,m=-m);let p=1-a;if(m<.9995){let M=Math.acos(m),w=Math.sin(M);p=Math.sin(p*M)/w,a=Math.sin(a*M)/w,c=c*p+f*a,l=l*p+h*a,u=u*p+g*a,d=d*p+_*a}else{c=c*p+f*a,l=l*p+h*a,u=u*p+g*a,d=d*p+_*a;let M=1/Math.sqrt(c*c+l*l+u*u+d*d);c*=M,l*=M,u*=M,d*=M}}e[t]=c,e[t+1]=l,e[t+2]=u,e[t+3]=d}static multiplyQuaternionsFlat(e,t,i,r,s,o){let a=i[r],c=i[r+1],l=i[r+2],u=i[r+3],d=s[o],f=s[o+1],h=s[o+2],g=s[o+3];return e[t]=a*g+u*d+c*h-l*f,e[t+1]=c*g+u*f+l*d-a*h,e[t+2]=l*g+u*h+a*f-c*d,e[t+3]=u*g-a*d-c*f-l*h,e}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get w(){return this._w}set w(e){this._w=e,this._onChangeCallback()}set(e,t,i,r){return this._x=e,this._y=t,this._z=i,this._w=r,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(e){return this._x=e.x,this._y=e.y,this._z=e.z,this._w=e.w,this._onChangeCallback(),this}setFromEuler(e,t=!0){let i=e._x,r=e._y,s=e._z,o=e._order,a=Math.cos,c=Math.sin,l=a(i/2),u=a(r/2),d=a(s/2),f=c(i/2),h=c(r/2),g=c(s/2);switch(o){case"XYZ":this._x=f*u*d+l*h*g,this._y=l*h*d-f*u*g,this._z=l*u*g+f*h*d,this._w=l*u*d-f*h*g;break;case"YXZ":this._x=f*u*d+l*h*g,this._y=l*h*d-f*u*g,this._z=l*u*g-f*h*d,this._w=l*u*d+f*h*g;break;case"ZXY":this._x=f*u*d-l*h*g,this._y=l*h*d+f*u*g,this._z=l*u*g+f*h*d,this._w=l*u*d-f*h*g;break;case"ZYX":this._x=f*u*d-l*h*g,this._y=l*h*d+f*u*g,this._z=l*u*g-f*h*d,this._w=l*u*d+f*h*g;break;case"YZX":this._x=f*u*d+l*h*g,this._y=l*h*d+f*u*g,this._z=l*u*g-f*h*d,this._w=l*u*d-f*h*g;break;case"XZY":this._x=f*u*d-l*h*g,this._y=l*h*d-f*u*g,this._z=l*u*g+f*h*d,this._w=l*u*d+f*h*g;break;default:Le("Quaternion: .setFromEuler() encountered an unknown order: "+o)}return t===!0&&this._onChangeCallback(),this}setFromAxisAngle(e,t){let i=t/2,r=Math.sin(i);return this._x=e.x*r,this._y=e.y*r,this._z=e.z*r,this._w=Math.cos(i),this._onChangeCallback(),this}setFromRotationMatrix(e){let t=e.elements,i=t[0],r=t[4],s=t[8],o=t[1],a=t[5],c=t[9],l=t[2],u=t[6],d=t[10],f=i+a+d;if(f>0){let h=.5/Math.sqrt(f+1);this._w=.25/h,this._x=(u-c)*h,this._y=(s-l)*h,this._z=(o-r)*h}else if(i>a&&i>d){let h=2*Math.sqrt(1+i-a-d);this._w=(u-c)/h,this._x=.25*h,this._y=(r+o)/h,this._z=(s+l)/h}else if(a>d){let h=2*Math.sqrt(1+a-i-d);this._w=(s-l)/h,this._x=(r+o)/h,this._y=.25*h,this._z=(c+u)/h}else{let h=2*Math.sqrt(1+d-i-a);this._w=(o-r)/h,this._x=(s+l)/h,this._y=(c+u)/h,this._z=.25*h}return this._onChangeCallback(),this}setFromUnitVectors(e,t){let i=e.dot(t)+1;return i<1e-8?(i=0,Math.abs(e.x)>Math.abs(e.z)?(this._x=-e.y,this._y=e.x,this._z=0,this._w=i):(this._x=0,this._y=-e.z,this._z=e.y,this._w=i)):(this._x=e.y*t.z-e.z*t.y,this._y=e.z*t.x-e.x*t.z,this._z=e.x*t.y-e.y*t.x,this._w=i),this.normalize()}angleTo(e){return 2*Math.acos(Math.abs(nt(this.dot(e),-1,1)))}rotateTowards(e,t){let i=this.angleTo(e);if(i===0)return this;let r=Math.min(1,t/i);return this.slerp(e,r),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(e){return this._x*e._x+this._y*e._y+this._z*e._z+this._w*e._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let e=this.length();return e===0?(this._x=0,this._y=0,this._z=0,this._w=1):(e=1/e,this._x=this._x*e,this._y=this._y*e,this._z=this._z*e,this._w=this._w*e),this._onChangeCallback(),this}multiply(e){return this.multiplyQuaternions(this,e)}premultiply(e){return this.multiplyQuaternions(e,this)}multiplyQuaternions(e,t){let i=e._x,r=e._y,s=e._z,o=e._w,a=t._x,c=t._y,l=t._z,u=t._w;return this._x=i*u+o*a+r*l-s*c,this._y=r*u+o*c+s*a-i*l,this._z=s*u+o*l+i*c-r*a,this._w=o*u-i*a-r*c-s*l,this._onChangeCallback(),this}slerp(e,t){let i=e._x,r=e._y,s=e._z,o=e._w,a=this.dot(e);a<0&&(i=-i,r=-r,s=-s,o=-o,a=-a);let c=1-t;if(a<.9995){let l=Math.acos(a),u=Math.sin(l);c=Math.sin(c*l)/u,t=Math.sin(t*l)/u,this._x=this._x*c+i*t,this._y=this._y*c+r*t,this._z=this._z*c+s*t,this._w=this._w*c+o*t,this._onChangeCallback()}else this._x=this._x*c+i*t,this._y=this._y*c+r*t,this._z=this._z*c+s*t,this._w=this._w*c+o*t,this.normalize();return this}slerpQuaternions(e,t,i){return this.copy(e).slerp(t,i)}random(){let e=2*Math.PI*Math.random(),t=2*Math.PI*Math.random(),i=Math.random(),r=Math.sqrt(1-i),s=Math.sqrt(i);return this.set(r*Math.sin(e),r*Math.cos(e),s*Math.sin(t),s*Math.cos(t))}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._w===this._w}fromArray(e,t=0){return this._x=e[t],this._y=e[t+1],this._z=e[t+2],this._w=e[t+3],this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._w,e}fromBufferAttribute(e,t){return this._x=e.getX(t),this._y=e.getY(t),this._z=e.getZ(t),this._w=e.getW(t),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}},F=class n{constructor(e=0,t=0,i=0){n.prototype.isVector3=!0,this.x=e,this.y=t,this.z=i}set(e,t,i){return i===void 0&&(i=this.z),this.x=e,this.y=t,this.z=i,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this}multiplyVectors(e,t){return this.x=e.x*t.x,this.y=e.y*t.y,this.z=e.z*t.z,this}applyEuler(e){return this.applyQuaternion(Ab.setFromEuler(e))}applyAxisAngle(e,t){return this.applyQuaternion(Ab.setFromAxisAngle(e,t))}applyMatrix3(e){let t=this.x,i=this.y,r=this.z,s=e.elements;return this.x=s[0]*t+s[3]*i+s[6]*r,this.y=s[1]*t+s[4]*i+s[7]*r,this.z=s[2]*t+s[5]*i+s[8]*r,this}applyNormalMatrix(e){return this.applyMatrix3(e).normalize()}applyMatrix4(e){let t=this.x,i=this.y,r=this.z,s=e.elements,o=1/(s[3]*t+s[7]*i+s[11]*r+s[15]);return this.x=(s[0]*t+s[4]*i+s[8]*r+s[12])*o,this.y=(s[1]*t+s[5]*i+s[9]*r+s[13])*o,this.z=(s[2]*t+s[6]*i+s[10]*r+s[14])*o,this}applyQuaternion(e){let t=this.x,i=this.y,r=this.z,s=e.x,o=e.y,a=e.z,c=e.w,l=2*(o*r-a*i),u=2*(a*t-s*r),d=2*(s*i-o*t);return this.x=t+c*l+o*d-a*u,this.y=i+c*u+a*l-s*d,this.z=r+c*d+s*u-o*l,this}project(e){return this.applyMatrix4(e.matrixWorldInverse).applyMatrix4(e.projectionMatrix)}unproject(e){return this.applyMatrix4(e.projectionMatrixInverse).applyMatrix4(e.matrixWorld)}transformDirection(e){let t=this.x,i=this.y,r=this.z,s=e.elements;return this.x=s[0]*t+s[4]*i+s[8]*r,this.y=s[1]*t+s[5]*i+s[9]*r,this.z=s[2]*t+s[6]*i+s[10]*r,this.normalize()}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this}divideScalar(e){return this.multiplyScalar(1/e)}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this}clamp(e,t){return this.x=nt(this.x,e.x,t.x),this.y=nt(this.y,e.y,t.y),this.z=nt(this.z,e.z,t.z),this}clampScalar(e,t){return this.x=nt(this.x,e,t),this.y=nt(this.y,e,t),this.z=nt(this.z,e,t),this}clampLength(e,t){let i=this.length();return this.divideScalar(i||1).multiplyScalar(nt(i,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this}lerpVectors(e,t,i){return this.x=e.x+(t.x-e.x)*i,this.y=e.y+(t.y-e.y)*i,this.z=e.z+(t.z-e.z)*i,this}cross(e){return this.crossVectors(this,e)}crossVectors(e,t){let i=e.x,r=e.y,s=e.z,o=t.x,a=t.y,c=t.z;return this.x=r*c-s*a,this.y=s*o-i*c,this.z=i*a-r*o,this}projectOnVector(e){let t=e.lengthSq();if(t===0)return this.set(0,0,0);let i=e.dot(this)/t;return this.copy(e).multiplyScalar(i)}projectOnPlane(e){return Jv.copy(this).projectOnVector(e),this.sub(Jv)}reflect(e){return this.sub(Jv.copy(e).multiplyScalar(2*this.dot(e)))}angleTo(e){let t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;let i=this.dot(e)/t;return Math.acos(nt(i,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){let t=this.x-e.x,i=this.y-e.y,r=this.z-e.z;return t*t+i*i+r*r}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)+Math.abs(this.z-e.z)}setFromSpherical(e){return this.setFromSphericalCoords(e.radius,e.phi,e.theta)}setFromSphericalCoords(e,t,i){let r=Math.sin(t)*e;return this.x=r*Math.sin(i),this.y=Math.cos(t)*e,this.z=r*Math.cos(i),this}setFromCylindrical(e){return this.setFromCylindricalCoords(e.radius,e.theta,e.y)}setFromCylindricalCoords(e,t,i){return this.x=e*Math.sin(t),this.y=i,this.z=e*Math.cos(t),this}setFromMatrixPosition(e){let t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this}setFromMatrixScale(e){let t=this.setFromMatrixColumn(e,0).length(),i=this.setFromMatrixColumn(e,1).length(),r=this.setFromMatrixColumn(e,2).length();return this.x=t,this.y=i,this.z=r,this}setFromMatrixColumn(e,t){return this.fromArray(e.elements,t*4)}setFromMatrix3Column(e,t){return this.fromArray(e.elements,t*3)}setFromEuler(e){return this.x=e._x,this.y=e._y,this.z=e._z,this}setFromColor(e){return this.x=e.r,this.y=e.g,this.z=e.b,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){let e=Math.random()*Math.PI*2,t=Math.random()*2-1,i=Math.sqrt(1-t*t);return this.x=i*Math.cos(e),this.y=t,this.z=i*Math.sin(e),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}},Jv=new F,Ab=new fi,je=class n{constructor(e,t,i,r,s,o,a,c,l){n.prototype.isMatrix3=!0,this.elements=[1,0,0,0,1,0,0,0,1],e!==void 0&&this.set(e,t,i,r,s,o,a,c,l)}set(e,t,i,r,s,o,a,c,l){let u=this.elements;return u[0]=e,u[1]=r,u[2]=a,u[3]=t,u[4]=s,u[5]=c,u[6]=i,u[7]=o,u[8]=l,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(e){let t=this.elements,i=e.elements;return t[0]=i[0],t[1]=i[1],t[2]=i[2],t[3]=i[3],t[4]=i[4],t[5]=i[5],t[6]=i[6],t[7]=i[7],t[8]=i[8],this}extractBasis(e,t,i){return e.setFromMatrix3Column(this,0),t.setFromMatrix3Column(this,1),i.setFromMatrix3Column(this,2),this}setFromMatrix4(e){let t=e.elements;return this.set(t[0],t[4],t[8],t[1],t[5],t[9],t[2],t[6],t[10]),this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){let i=e.elements,r=t.elements,s=this.elements,o=i[0],a=i[3],c=i[6],l=i[1],u=i[4],d=i[7],f=i[2],h=i[5],g=i[8],_=r[0],m=r[3],p=r[6],M=r[1],w=r[4],b=r[7],D=r[2],C=r[5],A=r[8];return s[0]=o*_+a*M+c*D,s[3]=o*m+a*w+c*C,s[6]=o*p+a*b+c*A,s[1]=l*_+u*M+d*D,s[4]=l*m+u*w+d*C,s[7]=l*p+u*b+d*A,s[2]=f*_+h*M+g*D,s[5]=f*m+h*w+g*C,s[8]=f*p+h*b+g*A,this}multiplyScalar(e){let t=this.elements;return t[0]*=e,t[3]*=e,t[6]*=e,t[1]*=e,t[4]*=e,t[7]*=e,t[2]*=e,t[5]*=e,t[8]*=e,this}determinant(){let e=this.elements,t=e[0],i=e[1],r=e[2],s=e[3],o=e[4],a=e[5],c=e[6],l=e[7],u=e[8];return t*o*u-t*a*l-i*s*u+i*a*c+r*s*l-r*o*c}invert(){let e=this.elements,t=e[0],i=e[1],r=e[2],s=e[3],o=e[4],a=e[5],c=e[6],l=e[7],u=e[8],d=u*o-a*l,f=a*c-u*s,h=l*s-o*c,g=t*d+i*f+r*h;if(g===0)return this.set(0,0,0,0,0,0,0,0,0);let _=1/g;return e[0]=d*_,e[1]=(r*l-u*i)*_,e[2]=(a*i-r*o)*_,e[3]=f*_,e[4]=(u*t-r*c)*_,e[5]=(r*s-a*t)*_,e[6]=h*_,e[7]=(i*c-l*t)*_,e[8]=(o*t-i*s)*_,this}transpose(){let e,t=this.elements;return e=t[1],t[1]=t[3],t[3]=e,e=t[2],t[2]=t[6],t[6]=e,e=t[5],t[5]=t[7],t[7]=e,this}getNormalMatrix(e){return this.setFromMatrix4(e).invert().transpose()}transposeIntoArray(e){let t=this.elements;return e[0]=t[0],e[1]=t[3],e[2]=t[6],e[3]=t[1],e[4]=t[4],e[5]=t[7],e[6]=t[2],e[7]=t[5],e[8]=t[8],this}setUvTransform(e,t,i,r,s,o,a){let c=Math.cos(s),l=Math.sin(s);return this.set(i*c,i*l,-i*(c*o+l*a)+o+e,-r*l,r*c,-r*(-l*o+c*a)+a+t,0,0,1),this}scale(e,t){return this.premultiply(Kv.makeScale(e,t)),this}rotate(e){return this.premultiply(Kv.makeRotation(-e)),this}translate(e,t){return this.premultiply(Kv.makeTranslation(e,t)),this}makeTranslation(e,t){return e.isVector2?this.set(1,0,e.x,0,1,e.y,0,0,1):this.set(1,0,e,0,1,t,0,0,1),this}makeRotation(e){let t=Math.cos(e),i=Math.sin(e);return this.set(t,-i,0,i,t,0,0,0,1),this}makeScale(e,t){return this.set(e,0,0,0,t,0,0,0,1),this}equals(e){let t=this.elements,i=e.elements;for(let r=0;r<9;r++)if(t[r]!==i[r])return!1;return!0}fromArray(e,t=0){for(let i=0;i<9;i++)this.elements[i]=e[i+t];return this}toArray(e=[],t=0){let i=this.elements;return e[t]=i[0],e[t+1]=i[1],e[t+2]=i[2],e[t+3]=i[3],e[t+4]=i[4],e[t+5]=i[5],e[t+6]=i[6],e[t+7]=i[7],e[t+8]=i[8],e}clone(){return new this.constructor().fromArray(this.elements)}},Kv=new je,Rb=new je().set(.4123908,.3575843,.1804808,.212639,.7151687,.0721923,.0193308,.1191948,.9505322),Nb=new je().set(3.2409699,-1.5373832,-.4986108,-.9692436,1.8759675,.0415551,.0556301,-.203977,1.0569715);function iN(){let n={enabled:!0,workingColorSpace:so,spaces:{},convert:function(r,s,o){return this.enabled===!1||s===o||!s||!o||(this.spaces[s].transfer===gt&&(r.r=wr(r.r),r.g=wr(r.g),r.b=wr(r.b)),this.spaces[s].primaries!==this.spaces[o].primaries&&(r.applyMatrix3(this.spaces[s].toXYZ),r.applyMatrix3(this.spaces[o].fromXYZ)),this.spaces[o].transfer===gt&&(r.r=va(r.r),r.g=va(r.g),r.b=va(r.b))),r},workingToColorSpace:function(r,s){return this.convert(r,this.workingColorSpace,s)},colorSpaceToWorking:function(r,s){return this.convert(r,s,this.workingColorSpace)},getPrimaries:function(r){return this.spaces[r].primaries},getTransfer:function(r){return r===Dr?tl:this.spaces[r].transfer},getToneMappingMode:function(r){return this.spaces[r].outputColorSpaceConfig.toneMappingMode||"standard"},getLuminanceCoefficients:function(r,s=this.workingColorSpace){return r.fromArray(this.spaces[s].luminanceCoefficients)},define:function(r){Object.assign(this.spaces,r)},_getMatrix:function(r,s,o){return r.copy(this.spaces[s].toXYZ).multiply(this.spaces[o].fromXYZ)},_getDrawingBufferColorSpace:function(r){return this.spaces[r].outputColorSpaceConfig.drawingBufferColorSpace},_getUnpackColorSpace:function(r=this.workingColorSpace){return this.spaces[r].workingColorSpaceConfig.unpackColorSpace},fromWorkingColorSpace:function(r,s){return il("ColorManagement: .fromWorkingColorSpace() has been renamed to .workingToColorSpace()."),n.workingToColorSpace(r,s)},toWorkingColorSpace:function(r,s){return il("ColorManagement: .toWorkingColorSpace() has been renamed to .colorSpaceToWorking()."),n.colorSpaceToWorking(r,s)}},e=[.64,.33,.3,.6,.15,.06],t=[.2126,.7152,.0722],i=[.3127,.329];return n.define({[so]:{primaries:e,whitePoint:i,transfer:tl,toXYZ:Rb,fromXYZ:Nb,luminanceCoefficients:t,workingColorSpaceConfig:{unpackColorSpace:Yn},outputColorSpaceConfig:{drawingBufferColorSpace:Yn}},[Yn]:{primaries:e,whitePoint:i,transfer:gt,toXYZ:Rb,fromXYZ:Nb,luminanceCoefficients:t,outputColorSpaceConfig:{drawingBufferColorSpace:Yn}}}),n}var st=iN();function wr(n){return n<.04045?n*.0773993808:Math.pow(n*.9478672986+.0521327014,2.4)}function va(n){return n<.0031308?n*12.92:1.055*Math.pow(n,.41666)-.055}var sa,Zf=class{static getDataURL(e,t="image/png"){if(/^data:/i.test(e.src)||typeof HTMLCanvasElement>"u")return e.src;let i;if(e instanceof HTMLCanvasElement)i=e;else{sa===void 0&&(sa=nl("canvas")),sa.width=e.width,sa.height=e.height;let r=sa.getContext("2d");e instanceof ImageData?r.putImageData(e,0,0):r.drawImage(e,0,0,e.width,e.height),i=sa}return i.toDataURL(t)}static sRGBToLinear(e){if(typeof HTMLImageElement<"u"&&e instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&e instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&e instanceof ImageBitmap){let t=nl("canvas");t.width=e.width,t.height=e.height;let i=t.getContext("2d");i.drawImage(e,0,0,e.width,e.height);let r=i.getImageData(0,0,e.width,e.height),s=r.data;for(let o=0;o<s.length;o++)s[o]=wr(s[o]/255)*255;return i.putImageData(r,0,0),t}else if(e.data){let t=e.data.slice(0);for(let i=0;i<t.length;i++)t instanceof Uint8Array||t instanceof Uint8ClampedArray?t[i]=Math.floor(wr(t[i]/255)*255):t[i]=wr(t[i]);return{data:t,width:e.width,height:e.height}}else return Le("ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),e}},rN=0,xa=class{constructor(e=null){this.isSource=!0,Object.defineProperty(this,"id",{value:rN++}),this.uuid=Cl(),this.data=e,this.dataReady=!0,this.version=0}getSize(e){let t=this.data;return typeof HTMLVideoElement<"u"&&t instanceof HTMLVideoElement?e.set(t.videoWidth,t.videoHeight,0):typeof VideoFrame<"u"&&t instanceof VideoFrame?e.set(t.displayHeight,t.displayWidth,0):t!==null?e.set(t.width,t.height,t.depth||0):e.set(0,0,0),e}set needsUpdate(e){e===!0&&this.version++}toJSON(e){let t=e===void 0||typeof e=="string";if(!t&&e.images[this.uuid]!==void 0)return e.images[this.uuid];let i={uuid:this.uuid,url:""},r=this.data;if(r!==null){let s;if(Array.isArray(r)){s=[];for(let o=0,a=r.length;o<a;o++)r[o].isDataTexture?s.push(Qv(r[o].image)):s.push(Qv(r[o]))}else s=Qv(r);i.url=s}return t||(e.images[this.uuid]=i),i}};function Qv(n){return typeof HTMLImageElement<"u"&&n instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&n instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&n instanceof ImageBitmap?Zf.getDataURL(n):n.data?{data:Array.from(n.data),width:n.width,height:n.height,type:n.data.constructor.name}:(Le("Texture: Unable to serialize Texture."),{})}var sN=0,ey=new F,Ir=(()=>{class n extends Tr{constructor(t=n.DEFAULT_IMAGE,i=n.DEFAULT_MAPPING,r=ji,s=ji,o=fn,a=fs,c=hi,l=Vn,u=n.DEFAULT_ANISOTROPY,d=Dr){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:sN++}),this.uuid=Cl(),this.name="",this.source=new xa(t),this.mipmaps=[],this.mapping=i,this.channel=0,this.wrapS=r,this.wrapT=s,this.magFilter=o,this.minFilter=a,this.anisotropy=u,this.format=c,this.internalFormat=null,this.type=l,this.offset=new it(0,0),this.repeat=new it(1,1),this.center=new it(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new je,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=d,this.userData={},this.updateRanges=[],this.version=0,this.onUpdate=null,this.renderTarget=null,this.isRenderTargetTexture=!1,this.isArrayTexture=!!(t&&t.depth&&t.depth>1),this.pmremVersion=0}get width(){return this.source.getSize(ey).x}get height(){return this.source.getSize(ey).y}get depth(){return this.source.getSize(ey).z}get image(){return this.source.data}set image(t=null){this.source.data=t}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}addUpdateRange(t,i){this.updateRanges.push({start:t,count:i})}clearUpdateRanges(){this.updateRanges.length=0}clone(){return new this.constructor().copy(this)}copy(t){return this.name=t.name,this.source=t.source,this.mipmaps=t.mipmaps.slice(0),this.mapping=t.mapping,this.channel=t.channel,this.wrapS=t.wrapS,this.wrapT=t.wrapT,this.magFilter=t.magFilter,this.minFilter=t.minFilter,this.anisotropy=t.anisotropy,this.format=t.format,this.internalFormat=t.internalFormat,this.type=t.type,this.offset.copy(t.offset),this.repeat.copy(t.repeat),this.center.copy(t.center),this.rotation=t.rotation,this.matrixAutoUpdate=t.matrixAutoUpdate,this.matrix.copy(t.matrix),this.generateMipmaps=t.generateMipmaps,this.premultiplyAlpha=t.premultiplyAlpha,this.flipY=t.flipY,this.unpackAlignment=t.unpackAlignment,this.colorSpace=t.colorSpace,this.renderTarget=t.renderTarget,this.isRenderTargetTexture=t.isRenderTargetTexture,this.isArrayTexture=t.isArrayTexture,this.userData=JSON.parse(JSON.stringify(t.userData)),this.needsUpdate=!0,this}setValues(t){for(let i in t){let r=t[i];if(r===void 0){Le(`Texture.setValues(): parameter '${i}' has value of undefined.`);continue}let s=this[i];if(s===void 0){Le(`Texture.setValues(): property '${i}' does not exist.`);continue}s&&r&&s.isVector2&&r.isVector2||s&&r&&s.isVector3&&r.isVector3||s&&r&&s.isMatrix3&&r.isMatrix3?s.copy(r):this[i]=r}}toJSON(t){let i=t===void 0||typeof t=="string";if(!i&&t.textures[this.uuid]!==void 0)return t.textures[this.uuid];let r={metadata:{version:4.7,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(t).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(r.userData=this.userData),i||(t.textures[this.uuid]=r),r}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(t){if(this.mapping!==_y)return t;if(t.applyMatrix3(this.matrix),t.x<0||t.x>1)switch(this.wrapS){case $f:t.x=t.x-Math.floor(t.x);break;case ji:t.x=t.x<0?0:1;break;case qf:Math.abs(Math.floor(t.x)%2)===1?t.x=Math.ceil(t.x)-t.x:t.x=t.x-Math.floor(t.x);break}if(t.y<0||t.y>1)switch(this.wrapT){case $f:t.y=t.y-Math.floor(t.y);break;case ji:t.y=t.y<0?0:1;break;case qf:Math.abs(Math.floor(t.y)%2)===1?t.y=Math.ceil(t.y)-t.y:t.y=t.y-Math.floor(t.y);break}return this.flipY&&(t.y=1-t.y),t}set needsUpdate(t){t===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(t){t===!0&&this.pmremVersion++}}return n.DEFAULT_IMAGE=null,n.DEFAULT_MAPPING=_y,n.DEFAULT_ANISOTROPY=1,n})(),Pt=class n{constructor(e=0,t=0,i=0,r=1){n.prototype.isVector4=!0,this.x=e,this.y=t,this.z=i,this.w=r}get width(){return this.z}set width(e){this.z=e}get height(){return this.w}set height(e){this.w=e}set(e,t,i,r){return this.x=e,this.y=t,this.z=i,this.w=r,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this.w=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setW(e){return this.w=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;case 3:this.w=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this.w=e.w!==void 0?e.w:1,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this.w+=e.w,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this.w+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this.w=e.w+t.w,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this.w+=e.w*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this.w-=e.w,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this.w-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this.w=e.w-t.w,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this.w*=e.w,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this.w*=e,this}applyMatrix4(e){let t=this.x,i=this.y,r=this.z,s=this.w,o=e.elements;return this.x=o[0]*t+o[4]*i+o[8]*r+o[12]*s,this.y=o[1]*t+o[5]*i+o[9]*r+o[13]*s,this.z=o[2]*t+o[6]*i+o[10]*r+o[14]*s,this.w=o[3]*t+o[7]*i+o[11]*r+o[15]*s,this}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this.w/=e.w,this}divideScalar(e){return this.multiplyScalar(1/e)}setAxisAngleFromQuaternion(e){this.w=2*Math.acos(e.w);let t=Math.sqrt(1-e.w*e.w);return t<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=e.x/t,this.y=e.y/t,this.z=e.z/t),this}setAxisAngleFromRotationMatrix(e){let t,i,r,s,c=e.elements,l=c[0],u=c[4],d=c[8],f=c[1],h=c[5],g=c[9],_=c[2],m=c[6],p=c[10];if(Math.abs(u-f)<.01&&Math.abs(d-_)<.01&&Math.abs(g-m)<.01){if(Math.abs(u+f)<.1&&Math.abs(d+_)<.1&&Math.abs(g+m)<.1&&Math.abs(l+h+p-3)<.1)return this.set(1,0,0,0),this;t=Math.PI;let w=(l+1)/2,b=(h+1)/2,D=(p+1)/2,C=(u+f)/4,A=(d+_)/4,y=(g+m)/4;return w>b&&w>D?w<.01?(i=0,r=.707106781,s=.707106781):(i=Math.sqrt(w),r=C/i,s=A/i):b>D?b<.01?(i=.707106781,r=0,s=.707106781):(r=Math.sqrt(b),i=C/r,s=y/r):D<.01?(i=.707106781,r=.707106781,s=0):(s=Math.sqrt(D),i=A/s,r=y/s),this.set(i,r,s,t),this}let M=Math.sqrt((m-g)*(m-g)+(d-_)*(d-_)+(f-u)*(f-u));return Math.abs(M)<.001&&(M=1),this.x=(m-g)/M,this.y=(d-_)/M,this.z=(f-u)/M,this.w=Math.acos((l+h+p-1)/2),this}setFromMatrixPosition(e){let t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this.w=t[15],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this.w=Math.min(this.w,e.w),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this.w=Math.max(this.w,e.w),this}clamp(e,t){return this.x=nt(this.x,e.x,t.x),this.y=nt(this.y,e.y,t.y),this.z=nt(this.z,e.z,t.z),this.w=nt(this.w,e.w,t.w),this}clampScalar(e,t){return this.x=nt(this.x,e,t),this.y=nt(this.y,e,t),this.z=nt(this.z,e,t),this.w=nt(this.w,e,t),this}clampLength(e,t){let i=this.length();return this.divideScalar(i||1).multiplyScalar(nt(i,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z+this.w*e.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this.w+=(e.w-this.w)*t,this}lerpVectors(e,t,i){return this.x=e.x+(t.x-e.x)*i,this.y=e.y+(t.y-e.y)*i,this.z=e.z+(t.z-e.z)*i,this.w=e.w+(t.w-e.w)*i,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z&&e.w===this.w}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this.w=e[t+3],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e[t+3]=this.w,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this.w=e.getW(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}},Jf=class extends Tr{constructor(e=1,t=1,i={}){super(),i=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:fn,depthBuffer:!0,stencilBuffer:!1,resolveDepthBuffer:!0,resolveStencilBuffer:!0,depthTexture:null,samples:0,count:1,depth:1,multiview:!1},i),this.isRenderTarget=!0,this.width=e,this.height=t,this.depth=i.depth,this.scissor=new Pt(0,0,e,t),this.scissorTest=!1,this.viewport=new Pt(0,0,e,t),this.textures=[];let r={width:e,height:t,depth:i.depth},s=new Ir(r),o=i.count;for(let a=0;a<o;a++)this.textures[a]=s.clone(),this.textures[a].isRenderTargetTexture=!0,this.textures[a].renderTarget=this;this._setTextureOptions(i),this.depthBuffer=i.depthBuffer,this.stencilBuffer=i.stencilBuffer,this.resolveDepthBuffer=i.resolveDepthBuffer,this.resolveStencilBuffer=i.resolveStencilBuffer,this._depthTexture=null,this.depthTexture=i.depthTexture,this.samples=i.samples,this.multiview=i.multiview}_setTextureOptions(e={}){let t={minFilter:fn,generateMipmaps:!1,flipY:!1,internalFormat:null};e.mapping!==void 0&&(t.mapping=e.mapping),e.wrapS!==void 0&&(t.wrapS=e.wrapS),e.wrapT!==void 0&&(t.wrapT=e.wrapT),e.wrapR!==void 0&&(t.wrapR=e.wrapR),e.magFilter!==void 0&&(t.magFilter=e.magFilter),e.minFilter!==void 0&&(t.minFilter=e.minFilter),e.format!==void 0&&(t.format=e.format),e.type!==void 0&&(t.type=e.type),e.anisotropy!==void 0&&(t.anisotropy=e.anisotropy),e.colorSpace!==void 0&&(t.colorSpace=e.colorSpace),e.flipY!==void 0&&(t.flipY=e.flipY),e.generateMipmaps!==void 0&&(t.generateMipmaps=e.generateMipmaps),e.internalFormat!==void 0&&(t.internalFormat=e.internalFormat);for(let i=0;i<this.textures.length;i++)this.textures[i].setValues(t)}get texture(){return this.textures[0]}set texture(e){this.textures[0]=e}set depthTexture(e){this._depthTexture!==null&&(this._depthTexture.renderTarget=null),e!==null&&(e.renderTarget=this),this._depthTexture=e}get depthTexture(){return this._depthTexture}setSize(e,t,i=1){if(this.width!==e||this.height!==t||this.depth!==i){this.width=e,this.height=t,this.depth=i;for(let r=0,s=this.textures.length;r<s;r++)this.textures[r].image.width=e,this.textures[r].image.height=t,this.textures[r].image.depth=i,this.textures[r].isData3DTexture!==!0&&(this.textures[r].isArrayTexture=this.textures[r].image.depth>1);this.dispose()}this.viewport.set(0,0,e,t),this.scissor.set(0,0,e,t)}clone(){return new this.constructor().copy(this)}copy(e){this.width=e.width,this.height=e.height,this.depth=e.depth,this.scissor.copy(e.scissor),this.scissorTest=e.scissorTest,this.viewport.copy(e.viewport),this.textures.length=0;for(let t=0,i=e.textures.length;t<i;t++){this.textures[t]=e.textures[t].clone(),this.textures[t].isRenderTargetTexture=!0,this.textures[t].renderTarget=this;let r=Object.assign({},e.textures[t].image);this.textures[t].source=new xa(r)}return this.depthBuffer=e.depthBuffer,this.stencilBuffer=e.stencilBuffer,this.resolveDepthBuffer=e.resolveDepthBuffer,this.resolveStencilBuffer=e.resolveStencilBuffer,e.depthTexture!==null&&(this.depthTexture=e.depthTexture.clone()),this.samples=e.samples,this}dispose(){this.dispatchEvent({type:"dispose"})}},Jn=class extends Jf{constructor(e=1,t=1,i={}){super(e,t,i),this.isWebGLRenderTarget=!0}},rl=class extends Ir{constructor(e=null,t=1,i=1,r=1){super(null),this.isDataArrayTexture=!0,this.image={data:e,width:t,height:i,depth:r},this.magFilter=sn,this.minFilter=sn,this.wrapR=ji,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}addLayerUpdate(e){this.layerUpdates.add(e)}clearLayerUpdates(){this.layerUpdates.clear()}};var Kf=class extends Ir{constructor(e=null,t=1,i=1,r=1){super(null),this.isData3DTexture=!0,this.image={data:e,width:t,height:i,depth:r},this.magFilter=sn,this.minFilter=sn,this.wrapR=ji,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}};var It=class n{constructor(e,t,i,r,s,o,a,c,l,u,d,f,h,g,_,m){n.prototype.isMatrix4=!0,this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],e!==void 0&&this.set(e,t,i,r,s,o,a,c,l,u,d,f,h,g,_,m)}set(e,t,i,r,s,o,a,c,l,u,d,f,h,g,_,m){let p=this.elements;return p[0]=e,p[4]=t,p[8]=i,p[12]=r,p[1]=s,p[5]=o,p[9]=a,p[13]=c,p[2]=l,p[6]=u,p[10]=d,p[14]=f,p[3]=h,p[7]=g,p[11]=_,p[15]=m,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new n().fromArray(this.elements)}copy(e){let t=this.elements,i=e.elements;return t[0]=i[0],t[1]=i[1],t[2]=i[2],t[3]=i[3],t[4]=i[4],t[5]=i[5],t[6]=i[6],t[7]=i[7],t[8]=i[8],t[9]=i[9],t[10]=i[10],t[11]=i[11],t[12]=i[12],t[13]=i[13],t[14]=i[14],t[15]=i[15],this}copyPosition(e){let t=this.elements,i=e.elements;return t[12]=i[12],t[13]=i[13],t[14]=i[14],this}setFromMatrix3(e){let t=e.elements;return this.set(t[0],t[3],t[6],0,t[1],t[4],t[7],0,t[2],t[5],t[8],0,0,0,0,1),this}extractBasis(e,t,i){return this.determinant()===0?(e.set(1,0,0),t.set(0,1,0),i.set(0,0,1),this):(e.setFromMatrixColumn(this,0),t.setFromMatrixColumn(this,1),i.setFromMatrixColumn(this,2),this)}makeBasis(e,t,i){return this.set(e.x,t.x,i.x,0,e.y,t.y,i.y,0,e.z,t.z,i.z,0,0,0,0,1),this}extractRotation(e){if(e.determinant()===0)return this.identity();let t=this.elements,i=e.elements,r=1/oa.setFromMatrixColumn(e,0).length(),s=1/oa.setFromMatrixColumn(e,1).length(),o=1/oa.setFromMatrixColumn(e,2).length();return t[0]=i[0]*r,t[1]=i[1]*r,t[2]=i[2]*r,t[3]=0,t[4]=i[4]*s,t[5]=i[5]*s,t[6]=i[6]*s,t[7]=0,t[8]=i[8]*o,t[9]=i[9]*o,t[10]=i[10]*o,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromEuler(e){let t=this.elements,i=e.x,r=e.y,s=e.z,o=Math.cos(i),a=Math.sin(i),c=Math.cos(r),l=Math.sin(r),u=Math.cos(s),d=Math.sin(s);if(e.order==="XYZ"){let f=o*u,h=o*d,g=a*u,_=a*d;t[0]=c*u,t[4]=-c*d,t[8]=l,t[1]=h+g*l,t[5]=f-_*l,t[9]=-a*c,t[2]=_-f*l,t[6]=g+h*l,t[10]=o*c}else if(e.order==="YXZ"){let f=c*u,h=c*d,g=l*u,_=l*d;t[0]=f+_*a,t[4]=g*a-h,t[8]=o*l,t[1]=o*d,t[5]=o*u,t[9]=-a,t[2]=h*a-g,t[6]=_+f*a,t[10]=o*c}else if(e.order==="ZXY"){let f=c*u,h=c*d,g=l*u,_=l*d;t[0]=f-_*a,t[4]=-o*d,t[8]=g+h*a,t[1]=h+g*a,t[5]=o*u,t[9]=_-f*a,t[2]=-o*l,t[6]=a,t[10]=o*c}else if(e.order==="ZYX"){let f=o*u,h=o*d,g=a*u,_=a*d;t[0]=c*u,t[4]=g*l-h,t[8]=f*l+_,t[1]=c*d,t[5]=_*l+f,t[9]=h*l-g,t[2]=-l,t[6]=a*c,t[10]=o*c}else if(e.order==="YZX"){let f=o*c,h=o*l,g=a*c,_=a*l;t[0]=c*u,t[4]=_-f*d,t[8]=g*d+h,t[1]=d,t[5]=o*u,t[9]=-a*u,t[2]=-l*u,t[6]=h*d+g,t[10]=f-_*d}else if(e.order==="XZY"){let f=o*c,h=o*l,g=a*c,_=a*l;t[0]=c*u,t[4]=-d,t[8]=l*u,t[1]=f*d+_,t[5]=o*u,t[9]=h*d-g,t[2]=g*d-h,t[6]=a*u,t[10]=_*d+f}return t[3]=0,t[7]=0,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromQuaternion(e){return this.compose(oN,e,aN)}lookAt(e,t,i){let r=this.elements;return qn.subVectors(e,t),qn.lengthSq()===0&&(qn.z=1),qn.normalize(),Zr.crossVectors(i,qn),Zr.lengthSq()===0&&(Math.abs(i.z)===1?qn.x+=1e-4:qn.z+=1e-4,qn.normalize(),Zr.crossVectors(i,qn)),Zr.normalize(),gf.crossVectors(qn,Zr),r[0]=Zr.x,r[4]=gf.x,r[8]=qn.x,r[1]=Zr.y,r[5]=gf.y,r[9]=qn.y,r[2]=Zr.z,r[6]=gf.z,r[10]=qn.z,this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){let i=e.elements,r=t.elements,s=this.elements,o=i[0],a=i[4],c=i[8],l=i[12],u=i[1],d=i[5],f=i[9],h=i[13],g=i[2],_=i[6],m=i[10],p=i[14],M=i[3],w=i[7],b=i[11],D=i[15],C=r[0],A=r[4],y=r[8],S=r[12],j=r[1],T=r[5],O=r[9],k=r[13],G=r[2],B=r[6],H=r[10],L=r[14],ee=r[3],Z=r[7],de=r[11],ve=r[15];return s[0]=o*C+a*j+c*G+l*ee,s[4]=o*A+a*T+c*B+l*Z,s[8]=o*y+a*O+c*H+l*de,s[12]=o*S+a*k+c*L+l*ve,s[1]=u*C+d*j+f*G+h*ee,s[5]=u*A+d*T+f*B+h*Z,s[9]=u*y+d*O+f*H+h*de,s[13]=u*S+d*k+f*L+h*ve,s[2]=g*C+_*j+m*G+p*ee,s[6]=g*A+_*T+m*B+p*Z,s[10]=g*y+_*O+m*H+p*de,s[14]=g*S+_*k+m*L+p*ve,s[3]=M*C+w*j+b*G+D*ee,s[7]=M*A+w*T+b*B+D*Z,s[11]=M*y+w*O+b*H+D*de,s[15]=M*S+w*k+b*L+D*ve,this}multiplyScalar(e){let t=this.elements;return t[0]*=e,t[4]*=e,t[8]*=e,t[12]*=e,t[1]*=e,t[5]*=e,t[9]*=e,t[13]*=e,t[2]*=e,t[6]*=e,t[10]*=e,t[14]*=e,t[3]*=e,t[7]*=e,t[11]*=e,t[15]*=e,this}determinant(){let e=this.elements,t=e[0],i=e[4],r=e[8],s=e[12],o=e[1],a=e[5],c=e[9],l=e[13],u=e[2],d=e[6],f=e[10],h=e[14],g=e[3],_=e[7],m=e[11],p=e[15],M=c*h-l*f,w=a*h-l*d,b=a*f-c*d,D=o*h-l*u,C=o*f-c*u,A=o*d-a*u;return t*(_*M-m*w+p*b)-i*(g*M-m*D+p*C)+r*(g*w-_*D+p*A)-s*(g*b-_*C+m*A)}transpose(){let e=this.elements,t;return t=e[1],e[1]=e[4],e[4]=t,t=e[2],e[2]=e[8],e[8]=t,t=e[6],e[6]=e[9],e[9]=t,t=e[3],e[3]=e[12],e[12]=t,t=e[7],e[7]=e[13],e[13]=t,t=e[11],e[11]=e[14],e[14]=t,this}setPosition(e,t,i){let r=this.elements;return e.isVector3?(r[12]=e.x,r[13]=e.y,r[14]=e.z):(r[12]=e,r[13]=t,r[14]=i),this}invert(){let e=this.elements,t=e[0],i=e[1],r=e[2],s=e[3],o=e[4],a=e[5],c=e[6],l=e[7],u=e[8],d=e[9],f=e[10],h=e[11],g=e[12],_=e[13],m=e[14],p=e[15],M=t*a-i*o,w=t*c-r*o,b=t*l-s*o,D=i*c-r*a,C=i*l-s*a,A=r*l-s*c,y=u*_-d*g,S=u*m-f*g,j=u*p-h*g,T=d*m-f*_,O=d*p-h*_,k=f*p-h*m,G=M*k-w*O+b*T+D*j-C*S+A*y;if(G===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);let B=1/G;return e[0]=(a*k-c*O+l*T)*B,e[1]=(r*O-i*k-s*T)*B,e[2]=(_*A-m*C+p*D)*B,e[3]=(f*C-d*A-h*D)*B,e[4]=(c*j-o*k-l*S)*B,e[5]=(t*k-r*j+s*S)*B,e[6]=(m*b-g*A-p*w)*B,e[7]=(u*A-f*b+h*w)*B,e[8]=(o*O-a*j+l*y)*B,e[9]=(i*j-t*O-s*y)*B,e[10]=(g*C-_*b+p*M)*B,e[11]=(d*b-u*C-h*M)*B,e[12]=(a*S-o*T-c*y)*B,e[13]=(t*T-i*S+r*y)*B,e[14]=(_*w-g*D-m*M)*B,e[15]=(u*D-d*w+f*M)*B,this}scale(e){let t=this.elements,i=e.x,r=e.y,s=e.z;return t[0]*=i,t[4]*=r,t[8]*=s,t[1]*=i,t[5]*=r,t[9]*=s,t[2]*=i,t[6]*=r,t[10]*=s,t[3]*=i,t[7]*=r,t[11]*=s,this}getMaxScaleOnAxis(){let e=this.elements,t=e[0]*e[0]+e[1]*e[1]+e[2]*e[2],i=e[4]*e[4]+e[5]*e[5]+e[6]*e[6],r=e[8]*e[8]+e[9]*e[9]+e[10]*e[10];return Math.sqrt(Math.max(t,i,r))}makeTranslation(e,t,i){return e.isVector3?this.set(1,0,0,e.x,0,1,0,e.y,0,0,1,e.z,0,0,0,1):this.set(1,0,0,e,0,1,0,t,0,0,1,i,0,0,0,1),this}makeRotationX(e){let t=Math.cos(e),i=Math.sin(e);return this.set(1,0,0,0,0,t,-i,0,0,i,t,0,0,0,0,1),this}makeRotationY(e){let t=Math.cos(e),i=Math.sin(e);return this.set(t,0,i,0,0,1,0,0,-i,0,t,0,0,0,0,1),this}makeRotationZ(e){let t=Math.cos(e),i=Math.sin(e);return this.set(t,-i,0,0,i,t,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(e,t){let i=Math.cos(t),r=Math.sin(t),s=1-i,o=e.x,a=e.y,c=e.z,l=s*o,u=s*a;return this.set(l*o+i,l*a-r*c,l*c+r*a,0,l*a+r*c,u*a+i,u*c-r*o,0,l*c-r*a,u*c+r*o,s*c*c+i,0,0,0,0,1),this}makeScale(e,t,i){return this.set(e,0,0,0,0,t,0,0,0,0,i,0,0,0,0,1),this}makeShear(e,t,i,r,s,o){return this.set(1,i,s,0,e,1,o,0,t,r,1,0,0,0,0,1),this}compose(e,t,i){let r=this.elements,s=t._x,o=t._y,a=t._z,c=t._w,l=s+s,u=o+o,d=a+a,f=s*l,h=s*u,g=s*d,_=o*u,m=o*d,p=a*d,M=c*l,w=c*u,b=c*d,D=i.x,C=i.y,A=i.z;return r[0]=(1-(_+p))*D,r[1]=(h+b)*D,r[2]=(g-w)*D,r[3]=0,r[4]=(h-b)*C,r[5]=(1-(f+p))*C,r[6]=(m+M)*C,r[7]=0,r[8]=(g+w)*A,r[9]=(m-M)*A,r[10]=(1-(f+_))*A,r[11]=0,r[12]=e.x,r[13]=e.y,r[14]=e.z,r[15]=1,this}decompose(e,t,i){let r=this.elements;e.x=r[12],e.y=r[13],e.z=r[14];let s=this.determinant();if(s===0)return i.set(1,1,1),t.identity(),this;let o=oa.set(r[0],r[1],r[2]).length(),a=oa.set(r[4],r[5],r[6]).length(),c=oa.set(r[8],r[9],r[10]).length();s<0&&(o=-o),Di.copy(this);let l=1/o,u=1/a,d=1/c;return Di.elements[0]*=l,Di.elements[1]*=l,Di.elements[2]*=l,Di.elements[4]*=u,Di.elements[5]*=u,Di.elements[6]*=u,Di.elements[8]*=d,Di.elements[9]*=d,Di.elements[10]*=d,t.setFromRotationMatrix(Di),i.x=o,i.y=a,i.z=c,this}makePerspective(e,t,i,r,s,o,a=Ri,c=!1){let l=this.elements,u=2*s/(t-e),d=2*s/(i-r),f=(t+e)/(t-e),h=(i+r)/(i-r),g,_;if(c)g=s/(o-s),_=o*s/(o-s);else if(a===Ri)g=-(o+s)/(o-s),_=-2*o*s/(o-s);else if(a===ya)g=-o/(o-s),_=-o*s/(o-s);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+a);return l[0]=u,l[4]=0,l[8]=f,l[12]=0,l[1]=0,l[5]=d,l[9]=h,l[13]=0,l[2]=0,l[6]=0,l[10]=g,l[14]=_,l[3]=0,l[7]=0,l[11]=-1,l[15]=0,this}makeOrthographic(e,t,i,r,s,o,a=Ri,c=!1){let l=this.elements,u=2/(t-e),d=2/(i-r),f=-(t+e)/(t-e),h=-(i+r)/(i-r),g,_;if(c)g=1/(o-s),_=o/(o-s);else if(a===Ri)g=-2/(o-s),_=-(o+s)/(o-s);else if(a===ya)g=-1/(o-s),_=-s/(o-s);else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+a);return l[0]=u,l[4]=0,l[8]=0,l[12]=f,l[1]=0,l[5]=d,l[9]=0,l[13]=h,l[2]=0,l[6]=0,l[10]=g,l[14]=_,l[3]=0,l[7]=0,l[11]=0,l[15]=1,this}equals(e){let t=this.elements,i=e.elements;for(let r=0;r<16;r++)if(t[r]!==i[r])return!1;return!0}fromArray(e,t=0){for(let i=0;i<16;i++)this.elements[i]=e[i+t];return this}toArray(e=[],t=0){let i=this.elements;return e[t]=i[0],e[t+1]=i[1],e[t+2]=i[2],e[t+3]=i[3],e[t+4]=i[4],e[t+5]=i[5],e[t+6]=i[6],e[t+7]=i[7],e[t+8]=i[8],e[t+9]=i[9],e[t+10]=i[10],e[t+11]=i[11],e[t+12]=i[12],e[t+13]=i[13],e[t+14]=i[14],e[t+15]=i[15],e}},oa=new F,Di=new It,oN=new F(0,0,0),aN=new F(1,1,1),Zr=new F,gf=new F,qn=new F,Pb=new It,Ob=new fi,rs=(()=>{class n{constructor(t=0,i=0,r=0,s=n.DEFAULT_ORDER){this.isEuler=!0,this._x=t,this._y=i,this._z=r,this._order=s}get x(){return this._x}set x(t){this._x=t,this._onChangeCallback()}get y(){return this._y}set y(t){this._y=t,this._onChangeCallback()}get z(){return this._z}set z(t){this._z=t,this._onChangeCallback()}get order(){return this._order}set order(t){this._order=t,this._onChangeCallback()}set(t,i,r,s=this._order){return this._x=t,this._y=i,this._z=r,this._order=s,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(t){return this._x=t._x,this._y=t._y,this._z=t._z,this._order=t._order,this._onChangeCallback(),this}setFromRotationMatrix(t,i=this._order,r=!0){let s=t.elements,o=s[0],a=s[4],c=s[8],l=s[1],u=s[5],d=s[9],f=s[2],h=s[6],g=s[10];switch(i){case"XYZ":this._y=Math.asin(nt(c,-1,1)),Math.abs(c)<.9999999?(this._x=Math.atan2(-d,g),this._z=Math.atan2(-a,o)):(this._x=Math.atan2(h,u),this._z=0);break;case"YXZ":this._x=Math.asin(-nt(d,-1,1)),Math.abs(d)<.9999999?(this._y=Math.atan2(c,g),this._z=Math.atan2(l,u)):(this._y=Math.atan2(-f,o),this._z=0);break;case"ZXY":this._x=Math.asin(nt(h,-1,1)),Math.abs(h)<.9999999?(this._y=Math.atan2(-f,g),this._z=Math.atan2(-a,u)):(this._y=0,this._z=Math.atan2(l,o));break;case"ZYX":this._y=Math.asin(-nt(f,-1,1)),Math.abs(f)<.9999999?(this._x=Math.atan2(h,g),this._z=Math.atan2(l,o)):(this._x=0,this._z=Math.atan2(-a,u));break;case"YZX":this._z=Math.asin(nt(l,-1,1)),Math.abs(l)<.9999999?(this._x=Math.atan2(-d,u),this._y=Math.atan2(-f,o)):(this._x=0,this._y=Math.atan2(c,g));break;case"XZY":this._z=Math.asin(-nt(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(h,u),this._y=Math.atan2(c,o)):(this._x=Math.atan2(-d,g),this._y=0);break;default:Le("Euler: .setFromRotationMatrix() encountered an unknown order: "+i)}return this._order=i,r===!0&&this._onChangeCallback(),this}setFromQuaternion(t,i,r){return Pb.makeRotationFromQuaternion(t),this.setFromRotationMatrix(Pb,i,r)}setFromVector3(t,i=this._order){return this.set(t.x,t.y,t.z,i)}reorder(t){return Ob.setFromEuler(this),this.setFromQuaternion(Ob,t)}equals(t){return t._x===this._x&&t._y===this._y&&t._z===this._z&&t._order===this._order}fromArray(t){return this._x=t[0],this._y=t[1],this._z=t[2],t[3]!==void 0&&(this._order=t[3]),this._onChangeCallback(),this}toArray(t=[],i=0){return t[i]=this._x,t[i+1]=this._y,t[i+2]=this._z,t[i+3]=this._order,t}_onChange(t){return this._onChangeCallback=t,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}}return n.DEFAULT_ORDER="XYZ",n})(),Ma=class{constructor(){this.mask=1}set(e){this.mask=(1<<e|0)>>>0}enable(e){this.mask|=1<<e|0}enableAll(){this.mask=-1}toggle(e){this.mask^=1<<e|0}disable(e){this.mask&=~(1<<e|0)}disableAll(){this.mask=0}test(e){return(this.mask&e.mask)!==0}isEnabled(e){return(this.mask&(1<<e|0))!==0}},cN=0,Lb=new F,aa=new fi,_r=new It,vf=new F,Zc=new F,lN=new F,uN=new fi,Fb=new F(1,0,0),kb=new F(0,1,0),Ub=new F(0,0,1),Bb={type:"added"},dN={type:"removed"},ca={type:"childadded",child:null},ty={type:"childremoved",child:null},$i=(()=>{class n extends Tr{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:cN++}),this.uuid=Cl(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=n.DEFAULT_UP.clone();let t=new F,i=new rs,r=new fi,s=new F(1,1,1);function o(){r.setFromEuler(i,!1)}function a(){i.setFromQuaternion(r,void 0,!1)}i._onChange(o),r._onChange(a),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:t},rotation:{configurable:!0,enumerable:!0,value:i},quaternion:{configurable:!0,enumerable:!0,value:r},scale:{configurable:!0,enumerable:!0,value:s},modelViewMatrix:{value:new It},normalMatrix:{value:new je}}),this.matrix=new It,this.matrixWorld=new It,this.matrixAutoUpdate=n.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=n.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new Ma,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.customDepthMaterial=void 0,this.customDistanceMaterial=void 0,this.static=!1,this.userData={},this.pivot=null}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(t){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(t),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(t){return this.quaternion.premultiply(t),this}setRotationFromAxisAngle(t,i){this.quaternion.setFromAxisAngle(t,i)}setRotationFromEuler(t){this.quaternion.setFromEuler(t,!0)}setRotationFromMatrix(t){this.quaternion.setFromRotationMatrix(t)}setRotationFromQuaternion(t){this.quaternion.copy(t)}rotateOnAxis(t,i){return aa.setFromAxisAngle(t,i),this.quaternion.multiply(aa),this}rotateOnWorldAxis(t,i){return aa.setFromAxisAngle(t,i),this.quaternion.premultiply(aa),this}rotateX(t){return this.rotateOnAxis(Fb,t)}rotateY(t){return this.rotateOnAxis(kb,t)}rotateZ(t){return this.rotateOnAxis(Ub,t)}translateOnAxis(t,i){return Lb.copy(t).applyQuaternion(this.quaternion),this.position.add(Lb.multiplyScalar(i)),this}translateX(t){return this.translateOnAxis(Fb,t)}translateY(t){return this.translateOnAxis(kb,t)}translateZ(t){return this.translateOnAxis(Ub,t)}localToWorld(t){return this.updateWorldMatrix(!0,!1),t.applyMatrix4(this.matrixWorld)}worldToLocal(t){return this.updateWorldMatrix(!0,!1),t.applyMatrix4(_r.copy(this.matrixWorld).invert())}lookAt(t,i,r){t.isVector3?vf.copy(t):vf.set(t,i,r);let s=this.parent;this.updateWorldMatrix(!0,!1),Zc.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?_r.lookAt(Zc,vf,this.up):_r.lookAt(vf,Zc,this.up),this.quaternion.setFromRotationMatrix(_r),s&&(_r.extractRotation(s.matrixWorld),aa.setFromRotationMatrix(_r),this.quaternion.premultiply(aa.invert()))}add(t){if(arguments.length>1){for(let i=0;i<arguments.length;i++)this.add(arguments[i]);return this}return t===this?(Ne("Object3D.add: object can't be added as a child of itself.",t),this):(t&&t.isObject3D?(t.removeFromParent(),t.parent=this,this.children.push(t),t.dispatchEvent(Bb),ca.child=t,this.dispatchEvent(ca),ca.child=null):Ne("Object3D.add: object not an instance of THREE.Object3D.",t),this)}remove(t){if(arguments.length>1){for(let r=0;r<arguments.length;r++)this.remove(arguments[r]);return this}let i=this.children.indexOf(t);return i!==-1&&(t.parent=null,this.children.splice(i,1),t.dispatchEvent(dN),ty.child=t,this.dispatchEvent(ty),ty.child=null),this}removeFromParent(){let t=this.parent;return t!==null&&t.remove(this),this}clear(){return this.remove(...this.children)}attach(t){return this.updateWorldMatrix(!0,!1),_r.copy(this.matrixWorld).invert(),t.parent!==null&&(t.parent.updateWorldMatrix(!0,!1),_r.multiply(t.parent.matrixWorld)),t.applyMatrix4(_r),t.removeFromParent(),t.parent=this,this.children.push(t),t.updateWorldMatrix(!1,!0),t.dispatchEvent(Bb),ca.child=t,this.dispatchEvent(ca),ca.child=null,this}getObjectById(t){return this.getObjectByProperty("id",t)}getObjectByName(t){return this.getObjectByProperty("name",t)}getObjectByProperty(t,i){if(this[t]===i)return this;for(let r=0,s=this.children.length;r<s;r++){let a=this.children[r].getObjectByProperty(t,i);if(a!==void 0)return a}}getObjectsByProperty(t,i,r=[]){this[t]===i&&r.push(this);let s=this.children;for(let o=0,a=s.length;o<a;o++)s[o].getObjectsByProperty(t,i,r);return r}getWorldPosition(t){return this.updateWorldMatrix(!0,!1),t.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(t){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Zc,t,lN),t}getWorldScale(t){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Zc,uN,t),t}getWorldDirection(t){this.updateWorldMatrix(!0,!1);let i=this.matrixWorld.elements;return t.set(i[8],i[9],i[10]).normalize()}raycast(){}traverse(t){t(this);let i=this.children;for(let r=0,s=i.length;r<s;r++)i[r].traverse(t)}traverseVisible(t){if(this.visible===!1)return;t(this);let i=this.children;for(let r=0,s=i.length;r<s;r++)i[r].traverseVisible(t)}traverseAncestors(t){let i=this.parent;i!==null&&(t(i),i.traverseAncestors(t))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale);let t=this.pivot;if(t!==null){let i=t.x,r=t.y,s=t.z,o=this.matrix.elements;o[12]+=i-o[0]*i-o[4]*r-o[8]*s,o[13]+=r-o[1]*i-o[5]*r-o[9]*s,o[14]+=s-o[2]*i-o[6]*r-o[10]*s}this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(t){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||t)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,t=!0);let i=this.children;for(let r=0,s=i.length;r<s;r++)i[r].updateMatrixWorld(t)}updateWorldMatrix(t,i){let r=this.parent;if(t===!0&&r!==null&&r.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),i===!0){let s=this.children;for(let o=0,a=s.length;o<a;o++)s[o].updateWorldMatrix(!1,!0)}}toJSON(t){let i=t===void 0||typeof t=="string",r={};i&&(t={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},r.metadata={version:4.7,type:"Object",generator:"Object3D.toJSON"});let s={};s.uuid=this.uuid,s.type=this.type,this.name!==""&&(s.name=this.name),this.castShadow===!0&&(s.castShadow=!0),this.receiveShadow===!0&&(s.receiveShadow=!0),this.visible===!1&&(s.visible=!1),this.frustumCulled===!1&&(s.frustumCulled=!1),this.renderOrder!==0&&(s.renderOrder=this.renderOrder),this.static!==!1&&(s.static=this.static),Object.keys(this.userData).length>0&&(s.userData=this.userData),s.layers=this.layers.mask,s.matrix=this.matrix.toArray(),s.up=this.up.toArray(),this.pivot!==null&&(s.pivot=this.pivot.toArray()),this.matrixAutoUpdate===!1&&(s.matrixAutoUpdate=!1),this.morphTargetDictionary!==void 0&&(s.morphTargetDictionary=Object.assign({},this.morphTargetDictionary)),this.morphTargetInfluences!==void 0&&(s.morphTargetInfluences=this.morphTargetInfluences.slice()),this.isInstancedMesh&&(s.type="InstancedMesh",s.count=this.count,s.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(s.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(s.type="BatchedMesh",s.perObjectFrustumCulled=this.perObjectFrustumCulled,s.sortObjects=this.sortObjects,s.drawRanges=this._drawRanges,s.reservedRanges=this._reservedRanges,s.geometryInfo=this._geometryInfo.map(c=>rt(ae({},c),{boundingBox:c.boundingBox?c.boundingBox.toJSON():void 0,boundingSphere:c.boundingSphere?c.boundingSphere.toJSON():void 0})),s.instanceInfo=this._instanceInfo.map(c=>ae({},c)),s.availableInstanceIds=this._availableInstanceIds.slice(),s.availableGeometryIds=this._availableGeometryIds.slice(),s.nextIndexStart=this._nextIndexStart,s.nextVertexStart=this._nextVertexStart,s.geometryCount=this._geometryCount,s.maxInstanceCount=this._maxInstanceCount,s.maxVertexCount=this._maxVertexCount,s.maxIndexCount=this._maxIndexCount,s.geometryInitialized=this._geometryInitialized,s.matricesTexture=this._matricesTexture.toJSON(t),s.indirectTexture=this._indirectTexture.toJSON(t),this._colorsTexture!==null&&(s.colorsTexture=this._colorsTexture.toJSON(t)),this.boundingSphere!==null&&(s.boundingSphere=this.boundingSphere.toJSON()),this.boundingBox!==null&&(s.boundingBox=this.boundingBox.toJSON()));function o(c,l){return c[l.uuid]===void 0&&(c[l.uuid]=l.toJSON(t)),l.uuid}if(this.isScene)this.background&&(this.background.isColor?s.background=this.background.toJSON():this.background.isTexture&&(s.background=this.background.toJSON(t).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(s.environment=this.environment.toJSON(t).uuid);else if(this.isMesh||this.isLine||this.isPoints){s.geometry=o(t.geometries,this.geometry);let c=this.geometry.parameters;if(c!==void 0&&c.shapes!==void 0){let l=c.shapes;if(Array.isArray(l))for(let u=0,d=l.length;u<d;u++){let f=l[u];o(t.shapes,f)}else o(t.shapes,l)}}if(this.isSkinnedMesh&&(s.bindMode=this.bindMode,s.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(o(t.skeletons,this.skeleton),s.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){let c=[];for(let l=0,u=this.material.length;l<u;l++)c.push(o(t.materials,this.material[l]));s.material=c}else s.material=o(t.materials,this.material);if(this.children.length>0){s.children=[];for(let c=0;c<this.children.length;c++)s.children.push(this.children[c].toJSON(t).object)}if(this.animations.length>0){s.animations=[];for(let c=0;c<this.animations.length;c++){let l=this.animations[c];s.animations.push(o(t.animations,l))}}if(i){let c=a(t.geometries),l=a(t.materials),u=a(t.textures),d=a(t.images),f=a(t.shapes),h=a(t.skeletons),g=a(t.animations),_=a(t.nodes);c.length>0&&(r.geometries=c),l.length>0&&(r.materials=l),u.length>0&&(r.textures=u),d.length>0&&(r.images=d),f.length>0&&(r.shapes=f),h.length>0&&(r.skeletons=h),g.length>0&&(r.animations=g),_.length>0&&(r.nodes=_)}return r.object=s,r;function a(c){let l=[];for(let u in c){let d=c[u];delete d.metadata,l.push(d)}return l}}clone(t){return new this.constructor().copy(this,t)}copy(t,i=!0){if(this.name=t.name,this.up.copy(t.up),this.position.copy(t.position),this.rotation.order=t.rotation.order,this.quaternion.copy(t.quaternion),this.scale.copy(t.scale),t.pivot!==null&&(this.pivot=t.pivot.clone()),this.matrix.copy(t.matrix),this.matrixWorld.copy(t.matrixWorld),this.matrixAutoUpdate=t.matrixAutoUpdate,this.matrixWorldAutoUpdate=t.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=t.matrixWorldNeedsUpdate,this.layers.mask=t.layers.mask,this.visible=t.visible,this.castShadow=t.castShadow,this.receiveShadow=t.receiveShadow,this.frustumCulled=t.frustumCulled,this.renderOrder=t.renderOrder,this.static=t.static,this.animations=t.animations.slice(),this.userData=JSON.parse(JSON.stringify(t.userData)),i===!0)for(let r=0;r<t.children.length;r++){let s=t.children[r];this.add(s.clone())}return this}}return n.DEFAULT_UP=new F(0,1,0),n.DEFAULT_MATRIX_AUTO_UPDATE=!0,n.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0,n})(),Er=class extends $i{constructor(){super(),this.isGroup=!0,this.type="Group"}},fN={type:"move"},Sa=class{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new Er,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new Er,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new F,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new F),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new Er,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new F,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new F),this._grip}dispatchEvent(e){return this._targetRay!==null&&this._targetRay.dispatchEvent(e),this._grip!==null&&this._grip.dispatchEvent(e),this._hand!==null&&this._hand.dispatchEvent(e),this}connect(e){if(e&&e.hand){let t=this._hand;if(t)for(let i of e.hand.values())this._getHandJoint(t,i)}return this.dispatchEvent({type:"connected",data:e}),this}disconnect(e){return this.dispatchEvent({type:"disconnected",data:e}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(e,t,i){let r=null,s=null,o=null,a=this._targetRay,c=this._grip,l=this._hand;if(e&&t.session.visibilityState!=="visible-blurred"){if(l&&e.hand){o=!0;for(let _ of e.hand.values()){let m=t.getJointPose(_,i),p=this._getHandJoint(l,_);m!==null&&(p.matrix.fromArray(m.transform.matrix),p.matrix.decompose(p.position,p.rotation,p.scale),p.matrixWorldNeedsUpdate=!0,p.jointRadius=m.radius),p.visible=m!==null}let u=l.joints["index-finger-tip"],d=l.joints["thumb-tip"],f=u.position.distanceTo(d.position),h=.02,g=.005;l.inputState.pinching&&f>h+g?(l.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:e.handedness,target:this})):!l.inputState.pinching&&f<=h-g&&(l.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:e.handedness,target:this}))}else c!==null&&e.gripSpace&&(s=t.getPose(e.gripSpace,i),s!==null&&(c.matrix.fromArray(s.transform.matrix),c.matrix.decompose(c.position,c.rotation,c.scale),c.matrixWorldNeedsUpdate=!0,s.linearVelocity?(c.hasLinearVelocity=!0,c.linearVelocity.copy(s.linearVelocity)):c.hasLinearVelocity=!1,s.angularVelocity?(c.hasAngularVelocity=!0,c.angularVelocity.copy(s.angularVelocity)):c.hasAngularVelocity=!1));a!==null&&(r=t.getPose(e.targetRaySpace,i),r===null&&s!==null&&(r=s),r!==null&&(a.matrix.fromArray(r.transform.matrix),a.matrix.decompose(a.position,a.rotation,a.scale),a.matrixWorldNeedsUpdate=!0,r.linearVelocity?(a.hasLinearVelocity=!0,a.linearVelocity.copy(r.linearVelocity)):a.hasLinearVelocity=!1,r.angularVelocity?(a.hasAngularVelocity=!0,a.angularVelocity.copy(r.angularVelocity)):a.hasAngularVelocity=!1,this.dispatchEvent(fN)))}return a!==null&&(a.visible=r!==null),c!==null&&(c.visible=s!==null),l!==null&&(l.visible=o!==null),this}_getHandJoint(e,t){if(e.joints[t.jointName]===void 0){let i=new Er;i.matrixAutoUpdate=!1,i.visible=!1,e.joints[t.jointName]=i,e.add(i)}return e.joints[t.jointName]}},NE={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},Jr={h:0,s:0,l:0},yf={h:0,s:0,l:0};function ny(n,e,t){return t<0&&(t+=1),t>1&&(t-=1),t<1/6?n+(e-n)*6*t:t<1/2?e:t<2/3?n+(e-n)*6*(2/3-t):n}var ot=class{constructor(e,t,i){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(e,t,i)}set(e,t,i){if(t===void 0&&i===void 0){let r=e;r&&r.isColor?this.copy(r):typeof r=="number"?this.setHex(r):typeof r=="string"&&this.setStyle(r)}else this.setRGB(e,t,i);return this}setScalar(e){return this.r=e,this.g=e,this.b=e,this}setHex(e,t=Yn){return e=Math.floor(e),this.r=(e>>16&255)/255,this.g=(e>>8&255)/255,this.b=(e&255)/255,st.colorSpaceToWorking(this,t),this}setRGB(e,t,i,r=st.workingColorSpace){return this.r=e,this.g=t,this.b=i,st.colorSpaceToWorking(this,r),this}setHSL(e,t,i,r=st.workingColorSpace){if(e=nN(e,1),t=nt(t,0,1),i=nt(i,0,1),t===0)this.r=this.g=this.b=i;else{let s=i<=.5?i*(1+t):i+t-i*t,o=2*i-s;this.r=ny(o,s,e+1/3),this.g=ny(o,s,e),this.b=ny(o,s,e-1/3)}return st.colorSpaceToWorking(this,r),this}setStyle(e,t=Yn){function i(s){s!==void 0&&parseFloat(s)<1&&Le("Color: Alpha component of "+e+" will be ignored.")}let r;if(r=/^(\w+)\(([^\)]*)\)/.exec(e)){let s,o=r[1],a=r[2];switch(o){case"rgb":case"rgba":if(s=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return i(s[4]),this.setRGB(Math.min(255,parseInt(s[1],10))/255,Math.min(255,parseInt(s[2],10))/255,Math.min(255,parseInt(s[3],10))/255,t);if(s=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return i(s[4]),this.setRGB(Math.min(100,parseInt(s[1],10))/100,Math.min(100,parseInt(s[2],10))/100,Math.min(100,parseInt(s[3],10))/100,t);break;case"hsl":case"hsla":if(s=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return i(s[4]),this.setHSL(parseFloat(s[1])/360,parseFloat(s[2])/100,parseFloat(s[3])/100,t);break;default:Le("Color: Unknown color model "+e)}}else if(r=/^\#([A-Fa-f\d]+)$/.exec(e)){let s=r[1],o=s.length;if(o===3)return this.setRGB(parseInt(s.charAt(0),16)/15,parseInt(s.charAt(1),16)/15,parseInt(s.charAt(2),16)/15,t);if(o===6)return this.setHex(parseInt(s,16),t);Le("Color: Invalid hex color "+e)}else if(e&&e.length>0)return this.setColorName(e,t);return this}setColorName(e,t=Yn){let i=NE[e.toLowerCase()];return i!==void 0?this.setHex(i,t):Le("Color: Unknown color "+e),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(e){return this.r=e.r,this.g=e.g,this.b=e.b,this}copySRGBToLinear(e){return this.r=wr(e.r),this.g=wr(e.g),this.b=wr(e.b),this}copyLinearToSRGB(e){return this.r=va(e.r),this.g=va(e.g),this.b=va(e.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(e=Yn){return st.workingToColorSpace(xn.copy(this),e),Math.round(nt(xn.r*255,0,255))*65536+Math.round(nt(xn.g*255,0,255))*256+Math.round(nt(xn.b*255,0,255))}getHexString(e=Yn){return("000000"+this.getHex(e).toString(16)).slice(-6)}getHSL(e,t=st.workingColorSpace){st.workingToColorSpace(xn.copy(this),t);let i=xn.r,r=xn.g,s=xn.b,o=Math.max(i,r,s),a=Math.min(i,r,s),c,l,u=(a+o)/2;if(a===o)c=0,l=0;else{let d=o-a;switch(l=u<=.5?d/(o+a):d/(2-o-a),o){case i:c=(r-s)/d+(r<s?6:0);break;case r:c=(s-i)/d+2;break;case s:c=(i-r)/d+4;break}c/=6}return e.h=c,e.s=l,e.l=u,e}getRGB(e,t=st.workingColorSpace){return st.workingToColorSpace(xn.copy(this),t),e.r=xn.r,e.g=xn.g,e.b=xn.b,e}getStyle(e=Yn){st.workingToColorSpace(xn.copy(this),e);let t=xn.r,i=xn.g,r=xn.b;return e!==Yn?`color(${e} ${t.toFixed(3)} ${i.toFixed(3)} ${r.toFixed(3)})`:`rgb(${Math.round(t*255)},${Math.round(i*255)},${Math.round(r*255)})`}offsetHSL(e,t,i){return this.getHSL(Jr),this.setHSL(Jr.h+e,Jr.s+t,Jr.l+i)}add(e){return this.r+=e.r,this.g+=e.g,this.b+=e.b,this}addColors(e,t){return this.r=e.r+t.r,this.g=e.g+t.g,this.b=e.b+t.b,this}addScalar(e){return this.r+=e,this.g+=e,this.b+=e,this}sub(e){return this.r=Math.max(0,this.r-e.r),this.g=Math.max(0,this.g-e.g),this.b=Math.max(0,this.b-e.b),this}multiply(e){return this.r*=e.r,this.g*=e.g,this.b*=e.b,this}multiplyScalar(e){return this.r*=e,this.g*=e,this.b*=e,this}lerp(e,t){return this.r+=(e.r-this.r)*t,this.g+=(e.g-this.g)*t,this.b+=(e.b-this.b)*t,this}lerpColors(e,t,i){return this.r=e.r+(t.r-e.r)*i,this.g=e.g+(t.g-e.g)*i,this.b=e.b+(t.b-e.b)*i,this}lerpHSL(e,t){this.getHSL(Jr),e.getHSL(yf);let i=Zv(Jr.h,yf.h,t),r=Zv(Jr.s,yf.s,t),s=Zv(Jr.l,yf.l,t);return this.setHSL(i,r,s),this}setFromVector3(e){return this.r=e.x,this.g=e.y,this.b=e.z,this}applyMatrix3(e){let t=this.r,i=this.g,r=this.b,s=e.elements;return this.r=s[0]*t+s[3]*i+s[6]*r,this.g=s[1]*t+s[4]*i+s[7]*r,this.b=s[2]*t+s[5]*i+s[8]*r,this}equals(e){return e.r===this.r&&e.g===this.g&&e.b===this.b}fromArray(e,t=0){return this.r=e[t],this.g=e[t+1],this.b=e[t+2],this}toArray(e=[],t=0){return e[t]=this.r,e[t+1]=this.g,e[t+2]=this.b,e}fromBufferAttribute(e,t){return this.r=e.getX(t),this.g=e.getY(t),this.b=e.getZ(t),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}},xn=new ot;ot.NAMES=NE;var sl=class extends $i{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new rs,this.environmentIntensity=1,this.environmentRotation=new rs,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(e,t){return super.copy(e,t),e.background!==null&&(this.background=e.background.clone()),e.environment!==null&&(this.environment=e.environment.clone()),e.fog!==null&&(this.fog=e.fog.clone()),this.backgroundBlurriness=e.backgroundBlurriness,this.backgroundIntensity=e.backgroundIntensity,this.backgroundRotation.copy(e.backgroundRotation),this.environmentIntensity=e.environmentIntensity,this.environmentRotation.copy(e.environmentRotation),e.overrideMaterial!==null&&(this.overrideMaterial=e.overrideMaterial.clone()),this.matrixAutoUpdate=e.matrixAutoUpdate,this}toJSON(e){let t=super.toJSON(e);return this.fog!==null&&(t.object.fog=this.fog.toJSON()),this.backgroundBlurriness>0&&(t.object.backgroundBlurriness=this.backgroundBlurriness),this.backgroundIntensity!==1&&(t.object.backgroundIntensity=this.backgroundIntensity),t.object.backgroundRotation=this.backgroundRotation.toArray(),this.environmentIntensity!==1&&(t.object.environmentIntensity=this.environmentIntensity),t.object.environmentRotation=this.environmentRotation.toArray(),t}},Ii=new F,xr=new F,iy=new F,Mr=new F,la=new F,ua=new F,Vb=new F,ry=new F,sy=new F,oy=new F,ay=new Pt,cy=new Pt,ly=new Pt,ns=class n{constructor(e=new F,t=new F,i=new F){this.a=e,this.b=t,this.c=i}static getNormal(e,t,i,r){r.subVectors(i,t),Ii.subVectors(e,t),r.cross(Ii);let s=r.lengthSq();return s>0?r.multiplyScalar(1/Math.sqrt(s)):r.set(0,0,0)}static getBarycoord(e,t,i,r,s){Ii.subVectors(r,t),xr.subVectors(i,t),iy.subVectors(e,t);let o=Ii.dot(Ii),a=Ii.dot(xr),c=Ii.dot(iy),l=xr.dot(xr),u=xr.dot(iy),d=o*l-a*a;if(d===0)return s.set(0,0,0),null;let f=1/d,h=(l*c-a*u)*f,g=(o*u-a*c)*f;return s.set(1-h-g,g,h)}static containsPoint(e,t,i,r){return this.getBarycoord(e,t,i,r,Mr)===null?!1:Mr.x>=0&&Mr.y>=0&&Mr.x+Mr.y<=1}static getInterpolation(e,t,i,r,s,o,a,c){return this.getBarycoord(e,t,i,r,Mr)===null?(c.x=0,c.y=0,"z"in c&&(c.z=0),"w"in c&&(c.w=0),null):(c.setScalar(0),c.addScaledVector(s,Mr.x),c.addScaledVector(o,Mr.y),c.addScaledVector(a,Mr.z),c)}static getInterpolatedAttribute(e,t,i,r,s,o){return ay.setScalar(0),cy.setScalar(0),ly.setScalar(0),ay.fromBufferAttribute(e,t),cy.fromBufferAttribute(e,i),ly.fromBufferAttribute(e,r),o.setScalar(0),o.addScaledVector(ay,s.x),o.addScaledVector(cy,s.y),o.addScaledVector(ly,s.z),o}static isFrontFacing(e,t,i,r){return Ii.subVectors(i,t),xr.subVectors(e,t),Ii.cross(xr).dot(r)<0}set(e,t,i){return this.a.copy(e),this.b.copy(t),this.c.copy(i),this}setFromPointsAndIndices(e,t,i,r){return this.a.copy(e[t]),this.b.copy(e[i]),this.c.copy(e[r]),this}setFromAttributeAndIndices(e,t,i,r){return this.a.fromBufferAttribute(e,t),this.b.fromBufferAttribute(e,i),this.c.fromBufferAttribute(e,r),this}clone(){return new this.constructor().copy(this)}copy(e){return this.a.copy(e.a),this.b.copy(e.b),this.c.copy(e.c),this}getArea(){return Ii.subVectors(this.c,this.b),xr.subVectors(this.a,this.b),Ii.cross(xr).length()*.5}getMidpoint(e){return e.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(e){return n.getNormal(this.a,this.b,this.c,e)}getPlane(e){return e.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(e,t){return n.getBarycoord(e,this.a,this.b,this.c,t)}getInterpolation(e,t,i,r,s){return n.getInterpolation(e,this.a,this.b,this.c,t,i,r,s)}containsPoint(e){return n.containsPoint(e,this.a,this.b,this.c)}isFrontFacing(e){return n.isFrontFacing(this.a,this.b,this.c,e)}intersectsBox(e){return e.intersectsTriangle(this)}closestPointToPoint(e,t){let i=this.a,r=this.b,s=this.c,o,a;la.subVectors(r,i),ua.subVectors(s,i),ry.subVectors(e,i);let c=la.dot(ry),l=ua.dot(ry);if(c<=0&&l<=0)return t.copy(i);sy.subVectors(e,r);let u=la.dot(sy),d=ua.dot(sy);if(u>=0&&d<=u)return t.copy(r);let f=c*d-u*l;if(f<=0&&c>=0&&u<=0)return o=c/(c-u),t.copy(i).addScaledVector(la,o);oy.subVectors(e,s);let h=la.dot(oy),g=ua.dot(oy);if(g>=0&&h<=g)return t.copy(s);let _=h*l-c*g;if(_<=0&&l>=0&&g<=0)return a=l/(l-g),t.copy(i).addScaledVector(ua,a);let m=u*g-h*d;if(m<=0&&d-u>=0&&h-g>=0)return Vb.subVectors(s,r),a=(d-u)/(d-u+(h-g)),t.copy(r).addScaledVector(Vb,a);let p=1/(m+_+f);return o=_*p,a=f*p,t.copy(i).addScaledVector(la,o).addScaledVector(ua,a)}equals(e){return e.a.equals(this.a)&&e.b.equals(this.b)&&e.c.equals(this.c)}},ss=class{constructor(e=new F(1/0,1/0,1/0),t=new F(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=e,this.max=t}set(e,t){return this.min.copy(e),this.max.copy(t),this}setFromArray(e){this.makeEmpty();for(let t=0,i=e.length;t<i;t+=3)this.expandByPoint(Ai.fromArray(e,t));return this}setFromBufferAttribute(e){this.makeEmpty();for(let t=0,i=e.count;t<i;t++)this.expandByPoint(Ai.fromBufferAttribute(e,t));return this}setFromPoints(e){this.makeEmpty();for(let t=0,i=e.length;t<i;t++)this.expandByPoint(e[t]);return this}setFromCenterAndSize(e,t){let i=Ai.copy(t).multiplyScalar(.5);return this.min.copy(e).sub(i),this.max.copy(e).add(i),this}setFromObject(e,t=!1){return this.makeEmpty(),this.expandByObject(e,t)}clone(){return new this.constructor().copy(this)}copy(e){return this.min.copy(e.min),this.max.copy(e.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(e){return this.isEmpty()?e.set(0,0,0):e.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(e){return this.isEmpty()?e.set(0,0,0):e.subVectors(this.max,this.min)}expandByPoint(e){return this.min.min(e),this.max.max(e),this}expandByVector(e){return this.min.sub(e),this.max.add(e),this}expandByScalar(e){return this.min.addScalar(-e),this.max.addScalar(e),this}expandByObject(e,t=!1){e.updateWorldMatrix(!1,!1);let i=e.geometry;if(i!==void 0){let s=i.getAttribute("position");if(t===!0&&s!==void 0&&e.isInstancedMesh!==!0)for(let o=0,a=s.count;o<a;o++)e.isMesh===!0?e.getVertexPosition(o,Ai):Ai.fromBufferAttribute(s,o),Ai.applyMatrix4(e.matrixWorld),this.expandByPoint(Ai);else e.boundingBox!==void 0?(e.boundingBox===null&&e.computeBoundingBox(),_f.copy(e.boundingBox)):(i.boundingBox===null&&i.computeBoundingBox(),_f.copy(i.boundingBox)),_f.applyMatrix4(e.matrixWorld),this.union(_f)}let r=e.children;for(let s=0,o=r.length;s<o;s++)this.expandByObject(r[s],t);return this}containsPoint(e){return e.x>=this.min.x&&e.x<=this.max.x&&e.y>=this.min.y&&e.y<=this.max.y&&e.z>=this.min.z&&e.z<=this.max.z}containsBox(e){return this.min.x<=e.min.x&&e.max.x<=this.max.x&&this.min.y<=e.min.y&&e.max.y<=this.max.y&&this.min.z<=e.min.z&&e.max.z<=this.max.z}getParameter(e,t){return t.set((e.x-this.min.x)/(this.max.x-this.min.x),(e.y-this.min.y)/(this.max.y-this.min.y),(e.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(e){return e.max.x>=this.min.x&&e.min.x<=this.max.x&&e.max.y>=this.min.y&&e.min.y<=this.max.y&&e.max.z>=this.min.z&&e.min.z<=this.max.z}intersectsSphere(e){return this.clampPoint(e.center,Ai),Ai.distanceToSquared(e.center)<=e.radius*e.radius}intersectsPlane(e){let t,i;return e.normal.x>0?(t=e.normal.x*this.min.x,i=e.normal.x*this.max.x):(t=e.normal.x*this.max.x,i=e.normal.x*this.min.x),e.normal.y>0?(t+=e.normal.y*this.min.y,i+=e.normal.y*this.max.y):(t+=e.normal.y*this.max.y,i+=e.normal.y*this.min.y),e.normal.z>0?(t+=e.normal.z*this.min.z,i+=e.normal.z*this.max.z):(t+=e.normal.z*this.max.z,i+=e.normal.z*this.min.z),t<=-e.constant&&i>=-e.constant}intersectsTriangle(e){if(this.isEmpty())return!1;this.getCenter(Jc),xf.subVectors(this.max,Jc),da.subVectors(e.a,Jc),fa.subVectors(e.b,Jc),ha.subVectors(e.c,Jc),Kr.subVectors(fa,da),Qr.subVectors(ha,fa),Ks.subVectors(da,ha);let t=[0,-Kr.z,Kr.y,0,-Qr.z,Qr.y,0,-Ks.z,Ks.y,Kr.z,0,-Kr.x,Qr.z,0,-Qr.x,Ks.z,0,-Ks.x,-Kr.y,Kr.x,0,-Qr.y,Qr.x,0,-Ks.y,Ks.x,0];return!uy(t,da,fa,ha,xf)||(t=[1,0,0,0,1,0,0,0,1],!uy(t,da,fa,ha,xf))?!1:(Mf.crossVectors(Kr,Qr),t=[Mf.x,Mf.y,Mf.z],uy(t,da,fa,ha,xf))}clampPoint(e,t){return t.copy(e).clamp(this.min,this.max)}distanceToPoint(e){return this.clampPoint(e,Ai).distanceTo(e)}getBoundingSphere(e){return this.isEmpty()?e.makeEmpty():(this.getCenter(e.center),e.radius=this.getSize(Ai).length()*.5),e}intersect(e){return this.min.max(e.min),this.max.min(e.max),this.isEmpty()&&this.makeEmpty(),this}union(e){return this.min.min(e.min),this.max.max(e.max),this}applyMatrix4(e){return this.isEmpty()?this:(Sr[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(e),Sr[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(e),Sr[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(e),Sr[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(e),Sr[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(e),Sr[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(e),Sr[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(e),Sr[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(e),this.setFromPoints(Sr),this)}translate(e){return this.min.add(e),this.max.add(e),this}equals(e){return e.min.equals(this.min)&&e.max.equals(this.max)}toJSON(){return{min:this.min.toArray(),max:this.max.toArray()}}fromJSON(e){return this.min.fromArray(e.min),this.max.fromArray(e.max),this}},Sr=[new F,new F,new F,new F,new F,new F,new F,new F],Ai=new F,_f=new ss,da=new F,fa=new F,ha=new F,Kr=new F,Qr=new F,Ks=new F,Jc=new F,xf=new F,Mf=new F,Qs=new F;function uy(n,e,t,i,r){for(let s=0,o=n.length-3;s<=o;s+=3){Qs.fromArray(n,s);let a=r.x*Math.abs(Qs.x)+r.y*Math.abs(Qs.y)+r.z*Math.abs(Qs.z),c=e.dot(Qs),l=t.dot(Qs),u=i.dot(Qs);if(Math.max(-Math.max(c,l,u),Math.min(c,l,u))>a)return!1}return!0}var jt=new F,Sf=new it,hN=0,Zn=class{constructor(e,t,i=!1){if(Array.isArray(e))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,Object.defineProperty(this,"id",{value:hN++}),this.name="",this.array=e,this.itemSize=t,this.count=e!==void 0?e.length/t:0,this.normalized=i,this.usage=wy,this.updateRanges=[],this.gpuType=Oi,this.version=0}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.name=e.name,this.array=new e.array.constructor(e.array),this.itemSize=e.itemSize,this.count=e.count,this.normalized=e.normalized,this.usage=e.usage,this.gpuType=e.gpuType,this}copyAt(e,t,i){e*=this.itemSize,i*=t.itemSize;for(let r=0,s=this.itemSize;r<s;r++)this.array[e+r]=t.array[i+r];return this}copyArray(e){return this.array.set(e),this}applyMatrix3(e){if(this.itemSize===2)for(let t=0,i=this.count;t<i;t++)Sf.fromBufferAttribute(this,t),Sf.applyMatrix3(e),this.setXY(t,Sf.x,Sf.y);else if(this.itemSize===3)for(let t=0,i=this.count;t<i;t++)jt.fromBufferAttribute(this,t),jt.applyMatrix3(e),this.setXYZ(t,jt.x,jt.y,jt.z);return this}applyMatrix4(e){for(let t=0,i=this.count;t<i;t++)jt.fromBufferAttribute(this,t),jt.applyMatrix4(e),this.setXYZ(t,jt.x,jt.y,jt.z);return this}applyNormalMatrix(e){for(let t=0,i=this.count;t<i;t++)jt.fromBufferAttribute(this,t),jt.applyNormalMatrix(e),this.setXYZ(t,jt.x,jt.y,jt.z);return this}transformDirection(e){for(let t=0,i=this.count;t<i;t++)jt.fromBufferAttribute(this,t),jt.transformDirection(e),this.setXYZ(t,jt.x,jt.y,jt.z);return this}set(e,t=0){return this.array.set(e,t),this}getComponent(e,t){let i=this.array[e*this.itemSize+t];return this.normalized&&(i=Yc(i,this.array)),i}setComponent(e,t,i){return this.normalized&&(i=Bn(i,this.array)),this.array[e*this.itemSize+t]=i,this}getX(e){let t=this.array[e*this.itemSize];return this.normalized&&(t=Yc(t,this.array)),t}setX(e,t){return this.normalized&&(t=Bn(t,this.array)),this.array[e*this.itemSize]=t,this}getY(e){let t=this.array[e*this.itemSize+1];return this.normalized&&(t=Yc(t,this.array)),t}setY(e,t){return this.normalized&&(t=Bn(t,this.array)),this.array[e*this.itemSize+1]=t,this}getZ(e){let t=this.array[e*this.itemSize+2];return this.normalized&&(t=Yc(t,this.array)),t}setZ(e,t){return this.normalized&&(t=Bn(t,this.array)),this.array[e*this.itemSize+2]=t,this}getW(e){let t=this.array[e*this.itemSize+3];return this.normalized&&(t=Yc(t,this.array)),t}setW(e,t){return this.normalized&&(t=Bn(t,this.array)),this.array[e*this.itemSize+3]=t,this}setXY(e,t,i){return e*=this.itemSize,this.normalized&&(t=Bn(t,this.array),i=Bn(i,this.array)),this.array[e+0]=t,this.array[e+1]=i,this}setXYZ(e,t,i,r){return e*=this.itemSize,this.normalized&&(t=Bn(t,this.array),i=Bn(i,this.array),r=Bn(r,this.array)),this.array[e+0]=t,this.array[e+1]=i,this.array[e+2]=r,this}setXYZW(e,t,i,r,s){return e*=this.itemSize,this.normalized&&(t=Bn(t,this.array),i=Bn(i,this.array),r=Bn(r,this.array),s=Bn(s,this.array)),this.array[e+0]=t,this.array[e+1]=i,this.array[e+2]=r,this.array[e+3]=s,this}onUpload(e){return this.onUploadCallback=e,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){let e={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return this.name!==""&&(e.name=this.name),this.usage!==wy&&(e.usage=this.usage),e}};var ol=class extends Zn{constructor(e,t,i){super(new Uint16Array(e),t,i)}};var al=class extends Zn{constructor(e,t,i){super(new Uint32Array(e),t,i)}};var Ht=class extends Zn{constructor(e,t,i){super(new Float32Array(e),t,i)}},pN=new ss,Kc=new F,dy=new F,ba=class{constructor(e=new F,t=-1){this.isSphere=!0,this.center=e,this.radius=t}set(e,t){return this.center.copy(e),this.radius=t,this}setFromPoints(e,t){let i=this.center;t!==void 0?i.copy(t):pN.setFromPoints(e).getCenter(i);let r=0;for(let s=0,o=e.length;s<o;s++)r=Math.max(r,i.distanceToSquared(e[s]));return this.radius=Math.sqrt(r),this}copy(e){return this.center.copy(e.center),this.radius=e.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(e){return e.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(e){return e.distanceTo(this.center)-this.radius}intersectsSphere(e){let t=this.radius+e.radius;return e.center.distanceToSquared(this.center)<=t*t}intersectsBox(e){return e.intersectsSphere(this)}intersectsPlane(e){return Math.abs(e.distanceToPoint(this.center))<=this.radius}clampPoint(e,t){let i=this.center.distanceToSquared(e);return t.copy(e),i>this.radius*this.radius&&(t.sub(this.center).normalize(),t.multiplyScalar(this.radius).add(this.center)),t}getBoundingBox(e){return this.isEmpty()?(e.makeEmpty(),e):(e.set(this.center,this.center),e.expandByScalar(this.radius),e)}applyMatrix4(e){return this.center.applyMatrix4(e),this.radius=this.radius*e.getMaxScaleOnAxis(),this}translate(e){return this.center.add(e),this}expandByPoint(e){if(this.isEmpty())return this.center.copy(e),this.radius=0,this;Kc.subVectors(e,this.center);let t=Kc.lengthSq();if(t>this.radius*this.radius){let i=Math.sqrt(t),r=(i-this.radius)*.5;this.center.addScaledVector(Kc,r/i),this.radius+=r}return this}union(e){return e.isEmpty()?this:this.isEmpty()?(this.copy(e),this):(this.center.equals(e.center)===!0?this.radius=Math.max(this.radius,e.radius):(dy.subVectors(e.center,this.center).setLength(e.radius),this.expandByPoint(Kc.copy(e.center).add(dy)),this.expandByPoint(Kc.copy(e.center).sub(dy))),this)}equals(e){return e.center.equals(this.center)&&e.radius===this.radius}clone(){return new this.constructor().copy(this)}toJSON(){return{radius:this.radius,center:this.center.toArray()}}fromJSON(e){return this.radius=e.radius,this.center.fromArray(e.center),this}},mN=0,di=new It,fy=new $i,pa=new F,Xn=new ss,Qc=new ss,rn=new F,Kn=class n extends Tr{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:mN++}),this.uuid=Cl(),this.name="",this.type="BufferGeometry",this.index=null,this.indirect=null,this.indirectOffset=0,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={}}getIndex(){return this.index}setIndex(e){return Array.isArray(e)?this.index=new(eN(e)?al:ol)(e,1):this.index=e,this}setIndirect(e,t=0){return this.indirect=e,this.indirectOffset=t,this}getIndirect(){return this.indirect}getAttribute(e){return this.attributes[e]}setAttribute(e,t){return this.attributes[e]=t,this}deleteAttribute(e){return delete this.attributes[e],this}hasAttribute(e){return this.attributes[e]!==void 0}addGroup(e,t,i=0){this.groups.push({start:e,count:t,materialIndex:i})}clearGroups(){this.groups=[]}setDrawRange(e,t){this.drawRange.start=e,this.drawRange.count=t}applyMatrix4(e){let t=this.attributes.position;t!==void 0&&(t.applyMatrix4(e),t.needsUpdate=!0);let i=this.attributes.normal;if(i!==void 0){let s=new je().getNormalMatrix(e);i.applyNormalMatrix(s),i.needsUpdate=!0}let r=this.attributes.tangent;return r!==void 0&&(r.transformDirection(e),r.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this}applyQuaternion(e){return di.makeRotationFromQuaternion(e),this.applyMatrix4(di),this}rotateX(e){return di.makeRotationX(e),this.applyMatrix4(di),this}rotateY(e){return di.makeRotationY(e),this.applyMatrix4(di),this}rotateZ(e){return di.makeRotationZ(e),this.applyMatrix4(di),this}translate(e,t,i){return di.makeTranslation(e,t,i),this.applyMatrix4(di),this}scale(e,t,i){return di.makeScale(e,t,i),this.applyMatrix4(di),this}lookAt(e){return fy.lookAt(e),fy.updateMatrix(),this.applyMatrix4(fy.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(pa).negate(),this.translate(pa.x,pa.y,pa.z),this}setFromPoints(e){let t=this.getAttribute("position");if(t===void 0){let i=[];for(let r=0,s=e.length;r<s;r++){let o=e[r];i.push(o.x,o.y,o.z||0)}this.setAttribute("position",new Ht(i,3))}else{let i=Math.min(e.length,t.count);for(let r=0;r<i;r++){let s=e[r];t.setXYZ(r,s.x,s.y,s.z||0)}e.length>t.count&&Le("BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry."),t.needsUpdate=!0}return this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new ss);let e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){Ne("BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),this.boundingBox.set(new F(-1/0,-1/0,-1/0),new F(1/0,1/0,1/0));return}if(e!==void 0){if(this.boundingBox.setFromBufferAttribute(e),t)for(let i=0,r=t.length;i<r;i++){let s=t[i];Xn.setFromBufferAttribute(s),this.morphTargetsRelative?(rn.addVectors(this.boundingBox.min,Xn.min),this.boundingBox.expandByPoint(rn),rn.addVectors(this.boundingBox.max,Xn.max),this.boundingBox.expandByPoint(rn)):(this.boundingBox.expandByPoint(Xn.min),this.boundingBox.expandByPoint(Xn.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&Ne('BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new ba);let e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){Ne("BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),this.boundingSphere.set(new F,1/0);return}if(e){let i=this.boundingSphere.center;if(Xn.setFromBufferAttribute(e),t)for(let s=0,o=t.length;s<o;s++){let a=t[s];Qc.setFromBufferAttribute(a),this.morphTargetsRelative?(rn.addVectors(Xn.min,Qc.min),Xn.expandByPoint(rn),rn.addVectors(Xn.max,Qc.max),Xn.expandByPoint(rn)):(Xn.expandByPoint(Qc.min),Xn.expandByPoint(Qc.max))}Xn.getCenter(i);let r=0;for(let s=0,o=e.count;s<o;s++)rn.fromBufferAttribute(e,s),r=Math.max(r,i.distanceToSquared(rn));if(t)for(let s=0,o=t.length;s<o;s++){let a=t[s],c=this.morphTargetsRelative;for(let l=0,u=a.count;l<u;l++)rn.fromBufferAttribute(a,l),c&&(pa.fromBufferAttribute(e,l),rn.add(pa)),r=Math.max(r,i.distanceToSquared(rn))}this.boundingSphere.radius=Math.sqrt(r),isNaN(this.boundingSphere.radius)&&Ne('BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){let e=this.index,t=this.attributes;if(e===null||t.position===void 0||t.normal===void 0||t.uv===void 0){Ne("BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}let i=t.position,r=t.normal,s=t.uv;this.hasAttribute("tangent")===!1&&this.setAttribute("tangent",new Zn(new Float32Array(4*i.count),4));let o=this.getAttribute("tangent"),a=[],c=[];for(let y=0;y<i.count;y++)a[y]=new F,c[y]=new F;let l=new F,u=new F,d=new F,f=new it,h=new it,g=new it,_=new F,m=new F;function p(y,S,j){l.fromBufferAttribute(i,y),u.fromBufferAttribute(i,S),d.fromBufferAttribute(i,j),f.fromBufferAttribute(s,y),h.fromBufferAttribute(s,S),g.fromBufferAttribute(s,j),u.sub(l),d.sub(l),h.sub(f),g.sub(f);let T=1/(h.x*g.y-g.x*h.y);isFinite(T)&&(_.copy(u).multiplyScalar(g.y).addScaledVector(d,-h.y).multiplyScalar(T),m.copy(d).multiplyScalar(h.x).addScaledVector(u,-g.x).multiplyScalar(T),a[y].add(_),a[S].add(_),a[j].add(_),c[y].add(m),c[S].add(m),c[j].add(m))}let M=this.groups;M.length===0&&(M=[{start:0,count:e.count}]);for(let y=0,S=M.length;y<S;++y){let j=M[y],T=j.start,O=j.count;for(let k=T,G=T+O;k<G;k+=3)p(e.getX(k+0),e.getX(k+1),e.getX(k+2))}let w=new F,b=new F,D=new F,C=new F;function A(y){D.fromBufferAttribute(r,y),C.copy(D);let S=a[y];w.copy(S),w.sub(D.multiplyScalar(D.dot(S))).normalize(),b.crossVectors(C,S);let T=b.dot(c[y])<0?-1:1;o.setXYZW(y,w.x,w.y,w.z,T)}for(let y=0,S=M.length;y<S;++y){let j=M[y],T=j.start,O=j.count;for(let k=T,G=T+O;k<G;k+=3)A(e.getX(k+0)),A(e.getX(k+1)),A(e.getX(k+2))}}computeVertexNormals(){let e=this.index,t=this.getAttribute("position");if(t!==void 0){let i=this.getAttribute("normal");if(i===void 0)i=new Zn(new Float32Array(t.count*3),3),this.setAttribute("normal",i);else for(let f=0,h=i.count;f<h;f++)i.setXYZ(f,0,0,0);let r=new F,s=new F,o=new F,a=new F,c=new F,l=new F,u=new F,d=new F;if(e)for(let f=0,h=e.count;f<h;f+=3){let g=e.getX(f+0),_=e.getX(f+1),m=e.getX(f+2);r.fromBufferAttribute(t,g),s.fromBufferAttribute(t,_),o.fromBufferAttribute(t,m),u.subVectors(o,s),d.subVectors(r,s),u.cross(d),a.fromBufferAttribute(i,g),c.fromBufferAttribute(i,_),l.fromBufferAttribute(i,m),a.add(u),c.add(u),l.add(u),i.setXYZ(g,a.x,a.y,a.z),i.setXYZ(_,c.x,c.y,c.z),i.setXYZ(m,l.x,l.y,l.z)}else for(let f=0,h=t.count;f<h;f+=3)r.fromBufferAttribute(t,f+0),s.fromBufferAttribute(t,f+1),o.fromBufferAttribute(t,f+2),u.subVectors(o,s),d.subVectors(r,s),u.cross(d),i.setXYZ(f+0,u.x,u.y,u.z),i.setXYZ(f+1,u.x,u.y,u.z),i.setXYZ(f+2,u.x,u.y,u.z);this.normalizeNormals(),i.needsUpdate=!0}}normalizeNormals(){let e=this.attributes.normal;for(let t=0,i=e.count;t<i;t++)rn.fromBufferAttribute(e,t),rn.normalize(),e.setXYZ(t,rn.x,rn.y,rn.z)}toNonIndexed(){function e(a,c){let l=a.array,u=a.itemSize,d=a.normalized,f=new l.constructor(c.length*u),h=0,g=0;for(let _=0,m=c.length;_<m;_++){a.isInterleavedBufferAttribute?h=c[_]*a.data.stride+a.offset:h=c[_]*u;for(let p=0;p<u;p++)f[g++]=l[h++]}return new Zn(f,u,d)}if(this.index===null)return Le("BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;let t=new n,i=this.index.array,r=this.attributes;for(let a in r){let c=r[a],l=e(c,i);t.setAttribute(a,l)}let s=this.morphAttributes;for(let a in s){let c=[],l=s[a];for(let u=0,d=l.length;u<d;u++){let f=l[u],h=e(f,i);c.push(h)}t.morphAttributes[a]=c}t.morphTargetsRelative=this.morphTargetsRelative;let o=this.groups;for(let a=0,c=o.length;a<c;a++){let l=o[a];t.addGroup(l.start,l.count,l.materialIndex)}return t}toJSON(){let e={metadata:{version:4.7,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(e.uuid=this.uuid,e.type=this.type,this.name!==""&&(e.name=this.name),Object.keys(this.userData).length>0&&(e.userData=this.userData),this.parameters!==void 0){let c=this.parameters;for(let l in c)c[l]!==void 0&&(e[l]=c[l]);return e}e.data={attributes:{}};let t=this.index;t!==null&&(e.data.index={type:t.array.constructor.name,array:Array.prototype.slice.call(t.array)});let i=this.attributes;for(let c in i){let l=i[c];e.data.attributes[c]=l.toJSON(e.data)}let r={},s=!1;for(let c in this.morphAttributes){let l=this.morphAttributes[c],u=[];for(let d=0,f=l.length;d<f;d++){let h=l[d];u.push(h.toJSON(e.data))}u.length>0&&(r[c]=u,s=!0)}s&&(e.data.morphAttributes=r,e.data.morphTargetsRelative=this.morphTargetsRelative);let o=this.groups;o.length>0&&(e.data.groups=JSON.parse(JSON.stringify(o)));let a=this.boundingSphere;return a!==null&&(e.data.boundingSphere=a.toJSON()),e}clone(){return new this.constructor().copy(this)}copy(e){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;let t={};this.name=e.name;let i=e.index;i!==null&&this.setIndex(i.clone());let r=e.attributes;for(let l in r){let u=r[l];this.setAttribute(l,u.clone(t))}let s=e.morphAttributes;for(let l in s){let u=[],d=s[l];for(let f=0,h=d.length;f<h;f++)u.push(d[f].clone(t));this.morphAttributes[l]=u}this.morphTargetsRelative=e.morphTargetsRelative;let o=e.groups;for(let l=0,u=o.length;l<u;l++){let d=o[l];this.addGroup(d.start,d.count,d.materialIndex)}let a=e.boundingBox;a!==null&&(this.boundingBox=a.clone());let c=e.boundingSphere;return c!==null&&(this.boundingSphere=c.clone()),this.drawRange.start=e.drawRange.start,this.drawRange.count=e.drawRange.count,this.userData=e.userData,this}dispose(){this.dispatchEvent({type:"dispose"})}};var gN=0,os=class extends Tr{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:gN++}),this.uuid=Cl(),this.name="",this.type="Material",this.blending=io,this.side=Cr,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=kf,this.blendDst=Uf,this.blendEquation=is,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new ot(0,0,0),this.blendAlpha=0,this.depthFunc=ro,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=Ey,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=no,this.stencilZFail=no,this.stencilZPass=no,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.allowOverride=!0,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(e){this._alphaTest>0!=e>0&&this.version++,this._alphaTest=e}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(e){if(e!==void 0)for(let t in e){let i=e[t];if(i===void 0){Le(`Material: parameter '${t}' has value of undefined.`);continue}let r=this[t];if(r===void 0){Le(`Material: '${t}' is not a property of THREE.${this.type}.`);continue}r&&r.isColor?r.set(i):r&&r.isVector3&&i&&i.isVector3?r.copy(i):this[t]=i}}toJSON(e){let t=e===void 0||typeof e=="string";t&&(e={textures:{},images:{}});let i={metadata:{version:4.7,type:"Material",generator:"Material.toJSON"}};i.uuid=this.uuid,i.type=this.type,this.name!==""&&(i.name=this.name),this.color&&this.color.isColor&&(i.color=this.color.getHex()),this.roughness!==void 0&&(i.roughness=this.roughness),this.metalness!==void 0&&(i.metalness=this.metalness),this.sheen!==void 0&&(i.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(i.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(i.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(i.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&this.emissiveIntensity!==1&&(i.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(i.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(i.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(i.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(i.shininess=this.shininess),this.clearcoat!==void 0&&(i.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(i.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(i.clearcoatMap=this.clearcoatMap.toJSON(e).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(i.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(e).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(i.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(e).uuid,i.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.sheenColorMap&&this.sheenColorMap.isTexture&&(i.sheenColorMap=this.sheenColorMap.toJSON(e).uuid),this.sheenRoughnessMap&&this.sheenRoughnessMap.isTexture&&(i.sheenRoughnessMap=this.sheenRoughnessMap.toJSON(e).uuid),this.dispersion!==void 0&&(i.dispersion=this.dispersion),this.iridescence!==void 0&&(i.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(i.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(i.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(i.iridescenceMap=this.iridescenceMap.toJSON(e).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(i.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(e).uuid),this.anisotropy!==void 0&&(i.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(i.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(i.anisotropyMap=this.anisotropyMap.toJSON(e).uuid),this.map&&this.map.isTexture&&(i.map=this.map.toJSON(e).uuid),this.matcap&&this.matcap.isTexture&&(i.matcap=this.matcap.toJSON(e).uuid),this.alphaMap&&this.alphaMap.isTexture&&(i.alphaMap=this.alphaMap.toJSON(e).uuid),this.lightMap&&this.lightMap.isTexture&&(i.lightMap=this.lightMap.toJSON(e).uuid,i.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(i.aoMap=this.aoMap.toJSON(e).uuid,i.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(i.bumpMap=this.bumpMap.toJSON(e).uuid,i.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(i.normalMap=this.normalMap.toJSON(e).uuid,i.normalMapType=this.normalMapType,i.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(i.displacementMap=this.displacementMap.toJSON(e).uuid,i.displacementScale=this.displacementScale,i.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(i.roughnessMap=this.roughnessMap.toJSON(e).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(i.metalnessMap=this.metalnessMap.toJSON(e).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(i.emissiveMap=this.emissiveMap.toJSON(e).uuid),this.specularMap&&this.specularMap.isTexture&&(i.specularMap=this.specularMap.toJSON(e).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(i.specularIntensityMap=this.specularIntensityMap.toJSON(e).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(i.specularColorMap=this.specularColorMap.toJSON(e).uuid),this.envMap&&this.envMap.isTexture&&(i.envMap=this.envMap.toJSON(e).uuid,this.combine!==void 0&&(i.combine=this.combine)),this.envMapRotation!==void 0&&(i.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(i.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(i.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(i.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(i.gradientMap=this.gradientMap.toJSON(e).uuid),this.transmission!==void 0&&(i.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(i.transmissionMap=this.transmissionMap.toJSON(e).uuid),this.thickness!==void 0&&(i.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(i.thicknessMap=this.thicknessMap.toJSON(e).uuid),this.attenuationDistance!==void 0&&this.attenuationDistance!==1/0&&(i.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(i.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(i.size=this.size),this.shadowSide!==null&&(i.shadowSide=this.shadowSide),this.sizeAttenuation!==void 0&&(i.sizeAttenuation=this.sizeAttenuation),this.blending!==io&&(i.blending=this.blending),this.side!==Cr&&(i.side=this.side),this.vertexColors===!0&&(i.vertexColors=!0),this.opacity<1&&(i.opacity=this.opacity),this.transparent===!0&&(i.transparent=!0),this.blendSrc!==kf&&(i.blendSrc=this.blendSrc),this.blendDst!==Uf&&(i.blendDst=this.blendDst),this.blendEquation!==is&&(i.blendEquation=this.blendEquation),this.blendSrcAlpha!==null&&(i.blendSrcAlpha=this.blendSrcAlpha),this.blendDstAlpha!==null&&(i.blendDstAlpha=this.blendDstAlpha),this.blendEquationAlpha!==null&&(i.blendEquationAlpha=this.blendEquationAlpha),this.blendColor&&this.blendColor.isColor&&(i.blendColor=this.blendColor.getHex()),this.blendAlpha!==0&&(i.blendAlpha=this.blendAlpha),this.depthFunc!==ro&&(i.depthFunc=this.depthFunc),this.depthTest===!1&&(i.depthTest=this.depthTest),this.depthWrite===!1&&(i.depthWrite=this.depthWrite),this.colorWrite===!1&&(i.colorWrite=this.colorWrite),this.stencilWriteMask!==255&&(i.stencilWriteMask=this.stencilWriteMask),this.stencilFunc!==Ey&&(i.stencilFunc=this.stencilFunc),this.stencilRef!==0&&(i.stencilRef=this.stencilRef),this.stencilFuncMask!==255&&(i.stencilFuncMask=this.stencilFuncMask),this.stencilFail!==no&&(i.stencilFail=this.stencilFail),this.stencilZFail!==no&&(i.stencilZFail=this.stencilZFail),this.stencilZPass!==no&&(i.stencilZPass=this.stencilZPass),this.stencilWrite===!0&&(i.stencilWrite=this.stencilWrite),this.rotation!==void 0&&this.rotation!==0&&(i.rotation=this.rotation),this.polygonOffset===!0&&(i.polygonOffset=!0),this.polygonOffsetFactor!==0&&(i.polygonOffsetFactor=this.polygonOffsetFactor),this.polygonOffsetUnits!==0&&(i.polygonOffsetUnits=this.polygonOffsetUnits),this.linewidth!==void 0&&this.linewidth!==1&&(i.linewidth=this.linewidth),this.dashSize!==void 0&&(i.dashSize=this.dashSize),this.gapSize!==void 0&&(i.gapSize=this.gapSize),this.scale!==void 0&&(i.scale=this.scale),this.dithering===!0&&(i.dithering=!0),this.alphaTest>0&&(i.alphaTest=this.alphaTest),this.alphaHash===!0&&(i.alphaHash=!0),this.alphaToCoverage===!0&&(i.alphaToCoverage=!0),this.premultipliedAlpha===!0&&(i.premultipliedAlpha=!0),this.forceSinglePass===!0&&(i.forceSinglePass=!0),this.allowOverride===!1&&(i.allowOverride=!1),this.wireframe===!0&&(i.wireframe=!0),this.wireframeLinewidth>1&&(i.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!=="round"&&(i.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!=="round"&&(i.wireframeLinejoin=this.wireframeLinejoin),this.flatShading===!0&&(i.flatShading=!0),this.visible===!1&&(i.visible=!1),this.toneMapped===!1&&(i.toneMapped=!1),this.fog===!1&&(i.fog=!1),Object.keys(this.userData).length>0&&(i.userData=this.userData);function r(s){let o=[];for(let a in s){let c=s[a];delete c.metadata,o.push(c)}return o}if(t){let s=r(e.textures),o=r(e.images);s.length>0&&(i.textures=s),o.length>0&&(i.images=o)}return i}clone(){return new this.constructor().copy(this)}copy(e){this.name=e.name,this.blending=e.blending,this.side=e.side,this.vertexColors=e.vertexColors,this.opacity=e.opacity,this.transparent=e.transparent,this.blendSrc=e.blendSrc,this.blendDst=e.blendDst,this.blendEquation=e.blendEquation,this.blendSrcAlpha=e.blendSrcAlpha,this.blendDstAlpha=e.blendDstAlpha,this.blendEquationAlpha=e.blendEquationAlpha,this.blendColor.copy(e.blendColor),this.blendAlpha=e.blendAlpha,this.depthFunc=e.depthFunc,this.depthTest=e.depthTest,this.depthWrite=e.depthWrite,this.stencilWriteMask=e.stencilWriteMask,this.stencilFunc=e.stencilFunc,this.stencilRef=e.stencilRef,this.stencilFuncMask=e.stencilFuncMask,this.stencilFail=e.stencilFail,this.stencilZFail=e.stencilZFail,this.stencilZPass=e.stencilZPass,this.stencilWrite=e.stencilWrite;let t=e.clippingPlanes,i=null;if(t!==null){let r=t.length;i=new Array(r);for(let s=0;s!==r;++s)i[s]=t[s].clone()}return this.clippingPlanes=i,this.clipIntersection=e.clipIntersection,this.clipShadows=e.clipShadows,this.shadowSide=e.shadowSide,this.colorWrite=e.colorWrite,this.precision=e.precision,this.polygonOffset=e.polygonOffset,this.polygonOffsetFactor=e.polygonOffsetFactor,this.polygonOffsetUnits=e.polygonOffsetUnits,this.dithering=e.dithering,this.alphaTest=e.alphaTest,this.alphaHash=e.alphaHash,this.alphaToCoverage=e.alphaToCoverage,this.premultipliedAlpha=e.premultipliedAlpha,this.forceSinglePass=e.forceSinglePass,this.allowOverride=e.allowOverride,this.visible=e.visible,this.toneMapped=e.toneMapped,this.userData=JSON.parse(JSON.stringify(e.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(e){e===!0&&this.version++}};var br=new F,hy=new F,bf=new F,es=new F,py=new F,Ef=new F,my=new F,cl=class{constructor(e=new F,t=new F(0,0,-1)){this.origin=e,this.direction=t}set(e,t){return this.origin.copy(e),this.direction.copy(t),this}copy(e){return this.origin.copy(e.origin),this.direction.copy(e.direction),this}at(e,t){return t.copy(this.origin).addScaledVector(this.direction,e)}lookAt(e){return this.direction.copy(e).sub(this.origin).normalize(),this}recast(e){return this.origin.copy(this.at(e,br)),this}closestPointToPoint(e,t){t.subVectors(e,this.origin);let i=t.dot(this.direction);return i<0?t.copy(this.origin):t.copy(this.origin).addScaledVector(this.direction,i)}distanceToPoint(e){return Math.sqrt(this.distanceSqToPoint(e))}distanceSqToPoint(e){let t=br.subVectors(e,this.origin).dot(this.direction);return t<0?this.origin.distanceToSquared(e):(br.copy(this.origin).addScaledVector(this.direction,t),br.distanceToSquared(e))}distanceSqToSegment(e,t,i,r){hy.copy(e).add(t).multiplyScalar(.5),bf.copy(t).sub(e).normalize(),es.copy(this.origin).sub(hy);let s=e.distanceTo(t)*.5,o=-this.direction.dot(bf),a=es.dot(this.direction),c=-es.dot(bf),l=es.lengthSq(),u=Math.abs(1-o*o),d,f,h,g;if(u>0)if(d=o*c-a,f=o*a-c,g=s*u,d>=0)if(f>=-g)if(f<=g){let _=1/u;d*=_,f*=_,h=d*(d+o*f+2*a)+f*(o*d+f+2*c)+l}else f=s,d=Math.max(0,-(o*f+a)),h=-d*d+f*(f+2*c)+l;else f=-s,d=Math.max(0,-(o*f+a)),h=-d*d+f*(f+2*c)+l;else f<=-g?(d=Math.max(0,-(-o*s+a)),f=d>0?-s:Math.min(Math.max(-s,-c),s),h=-d*d+f*(f+2*c)+l):f<=g?(d=0,f=Math.min(Math.max(-s,-c),s),h=f*(f+2*c)+l):(d=Math.max(0,-(o*s+a)),f=d>0?s:Math.min(Math.max(-s,-c),s),h=-d*d+f*(f+2*c)+l);else f=o>0?-s:s,d=Math.max(0,-(o*f+a)),h=-d*d+f*(f+2*c)+l;return i&&i.copy(this.origin).addScaledVector(this.direction,d),r&&r.copy(hy).addScaledVector(bf,f),h}intersectSphere(e,t){br.subVectors(e.center,this.origin);let i=br.dot(this.direction),r=br.dot(br)-i*i,s=e.radius*e.radius;if(r>s)return null;let o=Math.sqrt(s-r),a=i-o,c=i+o;return c<0?null:a<0?this.at(c,t):this.at(a,t)}intersectsSphere(e){return e.radius<0?!1:this.distanceSqToPoint(e.center)<=e.radius*e.radius}distanceToPlane(e){let t=e.normal.dot(this.direction);if(t===0)return e.distanceToPoint(this.origin)===0?0:null;let i=-(this.origin.dot(e.normal)+e.constant)/t;return i>=0?i:null}intersectPlane(e,t){let i=this.distanceToPlane(e);return i===null?null:this.at(i,t)}intersectsPlane(e){let t=e.distanceToPoint(this.origin);return t===0||e.normal.dot(this.direction)*t<0}intersectBox(e,t){let i,r,s,o,a,c,l=1/this.direction.x,u=1/this.direction.y,d=1/this.direction.z,f=this.origin;return l>=0?(i=(e.min.x-f.x)*l,r=(e.max.x-f.x)*l):(i=(e.max.x-f.x)*l,r=(e.min.x-f.x)*l),u>=0?(s=(e.min.y-f.y)*u,o=(e.max.y-f.y)*u):(s=(e.max.y-f.y)*u,o=(e.min.y-f.y)*u),i>o||s>r||((s>i||isNaN(i))&&(i=s),(o<r||isNaN(r))&&(r=o),d>=0?(a=(e.min.z-f.z)*d,c=(e.max.z-f.z)*d):(a=(e.max.z-f.z)*d,c=(e.min.z-f.z)*d),i>c||a>r)||((a>i||i!==i)&&(i=a),(c<r||r!==r)&&(r=c),r<0)?null:this.at(i>=0?i:r,t)}intersectsBox(e){return this.intersectBox(e,br)!==null}intersectTriangle(e,t,i,r,s){py.subVectors(t,e),Ef.subVectors(i,e),my.crossVectors(py,Ef);let o=this.direction.dot(my),a;if(o>0){if(r)return null;a=1}else if(o<0)a=-1,o=-o;else return null;es.subVectors(this.origin,e);let c=a*this.direction.dot(Ef.crossVectors(es,Ef));if(c<0)return null;let l=a*this.direction.dot(py.cross(es));if(l<0||c+l>o)return null;let u=-a*es.dot(my);return u<0?null:this.at(u/o,s)}applyMatrix4(e){return this.origin.applyMatrix4(e),this.direction.transformDirection(e),this}equals(e){return e.origin.equals(this.origin)&&e.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}},qi=class extends os{constructor(e){super(),this.isMeshBasicMaterial=!0,this.type="MeshBasicMaterial",this.color=new ot(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new rs,this.combine=Oy,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.combine=e.combine,this.reflectivity=e.reflectivity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.fog=e.fog,this}},Hb=new It,eo=new cl,wf=new ba,zb=new F,Cf=new F,Tf=new F,Df=new F,gy=new F,If=new F,Gb=new F,Af=new F,on=class extends $i{constructor(e=new Kn,t=new qi){super(),this.isMesh=!0,this.type="Mesh",this.geometry=e,this.material=t,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.count=1,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),e.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=e.morphTargetInfluences.slice()),e.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},e.morphTargetDictionary)),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}updateMorphTargets(){let t=this.geometry.morphAttributes,i=Object.keys(t);if(i.length>0){let r=t[i[0]];if(r!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let s=0,o=r.length;s<o;s++){let a=r[s].name||String(s);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=s}}}}getVertexPosition(e,t){let i=this.geometry,r=i.attributes.position,s=i.morphAttributes.position,o=i.morphTargetsRelative;t.fromBufferAttribute(r,e);let a=this.morphTargetInfluences;if(s&&a){If.set(0,0,0);for(let c=0,l=s.length;c<l;c++){let u=a[c],d=s[c];u!==0&&(gy.fromBufferAttribute(d,e),o?If.addScaledVector(gy,u):If.addScaledVector(gy.sub(t),u))}t.add(If)}return t}raycast(e,t){let i=this.geometry,r=this.material,s=this.matrixWorld;r!==void 0&&(i.boundingSphere===null&&i.computeBoundingSphere(),wf.copy(i.boundingSphere),wf.applyMatrix4(s),eo.copy(e.ray).recast(e.near),!(wf.containsPoint(eo.origin)===!1&&(eo.intersectSphere(wf,zb)===null||eo.origin.distanceToSquared(zb)>(e.far-e.near)**2))&&(Hb.copy(s).invert(),eo.copy(e.ray).applyMatrix4(Hb),!(i.boundingBox!==null&&eo.intersectsBox(i.boundingBox)===!1)&&this._computeIntersections(e,t,eo)))}_computeIntersections(e,t,i){let r,s=this.geometry,o=this.material,a=s.index,c=s.attributes.position,l=s.attributes.uv,u=s.attributes.uv1,d=s.attributes.normal,f=s.groups,h=s.drawRange;if(a!==null)if(Array.isArray(o))for(let g=0,_=f.length;g<_;g++){let m=f[g],p=o[m.materialIndex],M=Math.max(m.start,h.start),w=Math.min(a.count,Math.min(m.start+m.count,h.start+h.count));for(let b=M,D=w;b<D;b+=3){let C=a.getX(b),A=a.getX(b+1),y=a.getX(b+2);r=Rf(this,p,e,i,l,u,d,C,A,y),r&&(r.faceIndex=Math.floor(b/3),r.face.materialIndex=m.materialIndex,t.push(r))}}else{let g=Math.max(0,h.start),_=Math.min(a.count,h.start+h.count);for(let m=g,p=_;m<p;m+=3){let M=a.getX(m),w=a.getX(m+1),b=a.getX(m+2);r=Rf(this,o,e,i,l,u,d,M,w,b),r&&(r.faceIndex=Math.floor(m/3),t.push(r))}}else if(c!==void 0)if(Array.isArray(o))for(let g=0,_=f.length;g<_;g++){let m=f[g],p=o[m.materialIndex],M=Math.max(m.start,h.start),w=Math.min(c.count,Math.min(m.start+m.count,h.start+h.count));for(let b=M,D=w;b<D;b+=3){let C=b,A=b+1,y=b+2;r=Rf(this,p,e,i,l,u,d,C,A,y),r&&(r.faceIndex=Math.floor(b/3),r.face.materialIndex=m.materialIndex,t.push(r))}}else{let g=Math.max(0,h.start),_=Math.min(c.count,h.start+h.count);for(let m=g,p=_;m<p;m+=3){let M=m,w=m+1,b=m+2;r=Rf(this,o,e,i,l,u,d,M,w,b),r&&(r.faceIndex=Math.floor(m/3),t.push(r))}}}};function vN(n,e,t,i,r,s,o,a){let c;if(e.side===Nn?c=i.intersectTriangle(o,s,r,!0,a):c=i.intersectTriangle(r,s,o,e.side===Cr,a),c===null)return null;Af.copy(a),Af.applyMatrix4(n.matrixWorld);let l=t.ray.origin.distanceTo(Af);return l<t.near||l>t.far?null:{distance:l,point:Af.clone(),object:n}}function Rf(n,e,t,i,r,s,o,a,c,l){n.getVertexPosition(a,Cf),n.getVertexPosition(c,Tf),n.getVertexPosition(l,Df);let u=vN(n,e,t,i,Cf,Tf,Df,Gb);if(u){let d=new F;ns.getBarycoord(Gb,Cf,Tf,Df,d),r&&(u.uv=ns.getInterpolatedAttribute(r,a,c,l,d,new it)),s&&(u.uv1=ns.getInterpolatedAttribute(s,a,c,l,d,new it)),o&&(u.normal=ns.getInterpolatedAttribute(o,a,c,l,d,new F),u.normal.dot(i.direction)>0&&u.normal.multiplyScalar(-1));let f={a,b:c,c:l,normal:new F,materialIndex:0};ns.getNormal(Cf,Tf,Df,f.normal),u.face=f,u.barycoord=d}return u}var Qf=class extends Ir{constructor(e=null,t=1,i=1,r,s,o,a,c,l=sn,u=sn,d,f){super(null,o,a,c,l,u,r,s,d,f),this.isDataTexture=!0,this.image={data:e,width:t,height:i},this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}};var vy=new F,yN=new F,_N=new je,Gi=class{constructor(e=new F(1,0,0),t=0){this.isPlane=!0,this.normal=e,this.constant=t}set(e,t){return this.normal.copy(e),this.constant=t,this}setComponents(e,t,i,r){return this.normal.set(e,t,i),this.constant=r,this}setFromNormalAndCoplanarPoint(e,t){return this.normal.copy(e),this.constant=-t.dot(this.normal),this}setFromCoplanarPoints(e,t,i){let r=vy.subVectors(i,t).cross(yN.subVectors(e,t)).normalize();return this.setFromNormalAndCoplanarPoint(r,e),this}copy(e){return this.normal.copy(e.normal),this.constant=e.constant,this}normalize(){let e=1/this.normal.length();return this.normal.multiplyScalar(e),this.constant*=e,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(e){return this.normal.dot(e)+this.constant}distanceToSphere(e){return this.distanceToPoint(e.center)-e.radius}projectPoint(e,t){return t.copy(e).addScaledVector(this.normal,-this.distanceToPoint(e))}intersectLine(e,t){let i=e.delta(vy),r=this.normal.dot(i);if(r===0)return this.distanceToPoint(e.start)===0?t.copy(e.start):null;let s=-(e.start.dot(this.normal)+this.constant)/r;return s<0||s>1?null:t.copy(e.start).addScaledVector(i,s)}intersectsLine(e){let t=this.distanceToPoint(e.start),i=this.distanceToPoint(e.end);return t<0&&i>0||i<0&&t>0}intersectsBox(e){return e.intersectsPlane(this)}intersectsSphere(e){return e.intersectsPlane(this)}coplanarPoint(e){return e.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(e,t){let i=t||_N.getNormalMatrix(e),r=this.coplanarPoint(vy).applyMatrix4(e),s=this.normal.applyMatrix3(i).normalize();return this.constant=-r.dot(s),this}translate(e){return this.constant-=e.dot(this.normal),this}equals(e){return e.normal.equals(this.normal)&&e.constant===this.constant}clone(){return new this.constructor().copy(this)}},to=new ba,xN=new it(.5,.5),Nf=new F,Ea=class{constructor(e=new Gi,t=new Gi,i=new Gi,r=new Gi,s=new Gi,o=new Gi){this.planes=[e,t,i,r,s,o]}set(e,t,i,r,s,o){let a=this.planes;return a[0].copy(e),a[1].copy(t),a[2].copy(i),a[3].copy(r),a[4].copy(s),a[5].copy(o),this}copy(e){let t=this.planes;for(let i=0;i<6;i++)t[i].copy(e.planes[i]);return this}setFromProjectionMatrix(e,t=Ri,i=!1){let r=this.planes,s=e.elements,o=s[0],a=s[1],c=s[2],l=s[3],u=s[4],d=s[5],f=s[6],h=s[7],g=s[8],_=s[9],m=s[10],p=s[11],M=s[12],w=s[13],b=s[14],D=s[15];if(r[0].setComponents(l-o,h-u,p-g,D-M).normalize(),r[1].setComponents(l+o,h+u,p+g,D+M).normalize(),r[2].setComponents(l+a,h+d,p+_,D+w).normalize(),r[3].setComponents(l-a,h-d,p-_,D-w).normalize(),i)r[4].setComponents(c,f,m,b).normalize(),r[5].setComponents(l-c,h-f,p-m,D-b).normalize();else if(r[4].setComponents(l-c,h-f,p-m,D-b).normalize(),t===Ri)r[5].setComponents(l+c,h+f,p+m,D+b).normalize();else if(t===ya)r[5].setComponents(c,f,m,b).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+t);return this}intersectsObject(e){if(e.boundingSphere!==void 0)e.boundingSphere===null&&e.computeBoundingSphere(),to.copy(e.boundingSphere).applyMatrix4(e.matrixWorld);else{let t=e.geometry;t.boundingSphere===null&&t.computeBoundingSphere(),to.copy(t.boundingSphere).applyMatrix4(e.matrixWorld)}return this.intersectsSphere(to)}intersectsSprite(e){to.center.set(0,0,0);let t=xN.distanceTo(e.center);return to.radius=.7071067811865476+t,to.applyMatrix4(e.matrixWorld),this.intersectsSphere(to)}intersectsSphere(e){let t=this.planes,i=e.center,r=-e.radius;for(let s=0;s<6;s++)if(t[s].distanceToPoint(i)<r)return!1;return!0}intersectsBox(e){let t=this.planes;for(let i=0;i<6;i++){let r=t[i];if(Nf.x=r.normal.x>0?e.max.x:e.min.x,Nf.y=r.normal.y>0?e.max.y:e.min.y,Nf.z=r.normal.z>0?e.max.z:e.min.z,r.distanceToPoint(Nf)<0)return!1}return!0}containsPoint(e){let t=this.planes;for(let i=0;i<6;i++)if(t[i].distanceToPoint(e)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}};var ll=class extends Ir{constructor(e=[],t=ds,i,r,s,o,a,c,l,u){super(e,t,i,r,s,o,a,c,l,u),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(e){this.image=e}};var as=class extends Ir{constructor(e,t,i=Pi,r,s,o,a=sn,c=sn,l,u=Wi,d=1){if(u!==Wi&&u!==hs)throw new Error("DepthTexture format must be either THREE.DepthFormat or THREE.DepthStencilFormat");let f={width:e,height:t,depth:d};super(f,r,s,o,a,c,u,i,l),this.isDepthTexture=!0,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(e){return super.copy(e),this.source=new xa(Object.assign({},e.image)),this.compareFunction=e.compareFunction,this}toJSON(e){let t=super.toJSON(e);return this.compareFunction!==null&&(t.compareFunction=this.compareFunction),t}},eh=class extends as{constructor(e,t=Pi,i=ds,r,s,o=sn,a=sn,c,l=Wi){let u={width:e,height:e,depth:1},d=[u,u,u,u,u,u];super(e,e,t,i,r,s,o,a,c,l),this.image=d,this.isCubeDepthTexture=!0,this.isCubeTexture=!0}get images(){return this.image}set images(e){this.image=e}},ul=class extends Ir{constructor(e=null){super(),this.sourceTexture=e,this.isExternalTexture=!0}copy(e){return super.copy(e),this.sourceTexture=e.sourceTexture,this}},wa=class n extends Kn{constructor(e=1,t=1,i=1,r=1,s=1,o=1){super(),this.type="BoxGeometry",this.parameters={width:e,height:t,depth:i,widthSegments:r,heightSegments:s,depthSegments:o};let a=this;r=Math.floor(r),s=Math.floor(s),o=Math.floor(o);let c=[],l=[],u=[],d=[],f=0,h=0;g("z","y","x",-1,-1,i,t,e,o,s,0),g("z","y","x",1,-1,i,t,-e,o,s,1),g("x","z","y",1,1,e,i,t,r,o,2),g("x","z","y",1,-1,e,i,-t,r,o,3),g("x","y","z",1,-1,e,t,i,r,s,4),g("x","y","z",-1,-1,e,t,-i,r,s,5),this.setIndex(c),this.setAttribute("position",new Ht(l,3)),this.setAttribute("normal",new Ht(u,3)),this.setAttribute("uv",new Ht(d,2));function g(_,m,p,M,w,b,D,C,A,y,S){let j=b/A,T=D/y,O=b/2,k=D/2,G=C/2,B=A+1,H=y+1,L=0,ee=0,Z=new F;for(let de=0;de<H;de++){let ve=de*T-k;for(let he=0;he<B;he++){let $e=he*j-O;Z[_]=$e*M,Z[m]=ve*w,Z[p]=G,l.push(Z.x,Z.y,Z.z),Z[_]=0,Z[m]=0,Z[p]=C>0?1:-1,u.push(Z.x,Z.y,Z.z),d.push(he/A),d.push(1-de/y),L+=1}}for(let de=0;de<y;de++)for(let ve=0;ve<A;ve++){let he=f+ve+B*de,$e=f+ve+B*(de+1),At=f+(ve+1)+B*(de+1),Dt=f+(ve+1)+B*de;c.push(he,$e,Dt),c.push($e,At,Dt),ee+=6}a.addGroup(h,ee,S),h+=ee,f+=L}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new n(e.width,e.height,e.depth,e.widthSegments,e.heightSegments,e.depthSegments)}};var th=class n extends Kn{constructor(e=1,t=1,i=1,r=32,s=1,o=!1,a=0,c=Math.PI*2){super(),this.type="CylinderGeometry",this.parameters={radiusTop:e,radiusBottom:t,height:i,radialSegments:r,heightSegments:s,openEnded:o,thetaStart:a,thetaLength:c};let l=this;r=Math.floor(r),s=Math.floor(s);let u=[],d=[],f=[],h=[],g=0,_=[],m=i/2,p=0;M(),o===!1&&(e>0&&w(!0),t>0&&w(!1)),this.setIndex(u),this.setAttribute("position",new Ht(d,3)),this.setAttribute("normal",new Ht(f,3)),this.setAttribute("uv",new Ht(h,2));function M(){let b=new F,D=new F,C=0,A=(t-e)/i;for(let y=0;y<=s;y++){let S=[],j=y/s,T=j*(t-e)+e;for(let O=0;O<=r;O++){let k=O/r,G=k*c+a,B=Math.sin(G),H=Math.cos(G);D.x=T*B,D.y=-j*i+m,D.z=T*H,d.push(D.x,D.y,D.z),b.set(B,A,H).normalize(),f.push(b.x,b.y,b.z),h.push(k,1-j),S.push(g++)}_.push(S)}for(let y=0;y<r;y++)for(let S=0;S<s;S++){let j=_[S][y],T=_[S+1][y],O=_[S+1][y+1],k=_[S][y+1];(e>0||S!==0)&&(u.push(j,T,k),C+=3),(t>0||S!==s-1)&&(u.push(T,O,k),C+=3)}l.addGroup(p,C,0),p+=C}function w(b){let D=g,C=new it,A=new F,y=0,S=b===!0?e:t,j=b===!0?1:-1;for(let O=1;O<=r;O++)d.push(0,m*j,0),f.push(0,j,0),h.push(.5,.5),g++;let T=g;for(let O=0;O<=r;O++){let G=O/r*c+a,B=Math.cos(G),H=Math.sin(G);A.x=S*H,A.y=m*j,A.z=S*B,d.push(A.x,A.y,A.z),f.push(0,j,0),C.x=B*.5+.5,C.y=H*.5*j+.5,h.push(C.x,C.y),g++}for(let O=0;O<r;O++){let k=D+O,G=T+O;b===!0?u.push(G,G+1,k):u.push(G+1,G,k),y+=3}l.addGroup(p,y,b===!0?1:2),p+=y}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new n(e.radiusTop,e.radiusBottom,e.height,e.radialSegments,e.heightSegments,e.openEnded,e.thetaStart,e.thetaLength)}},dl=class n extends th{constructor(e=1,t=1,i=32,r=1,s=!1,o=0,a=Math.PI*2){super(0,e,t,i,r,s,o,a),this.type="ConeGeometry",this.parameters={radius:e,height:t,radialSegments:i,heightSegments:r,openEnded:s,thetaStart:o,thetaLength:a}}static fromJSON(e){return new n(e.radius,e.height,e.radialSegments,e.heightSegments,e.openEnded,e.thetaStart,e.thetaLength)}};var fl=class n extends Kn{constructor(e=1,t=1,i=1,r=1){super(),this.type="PlaneGeometry",this.parameters={width:e,height:t,widthSegments:i,heightSegments:r};let s=e/2,o=t/2,a=Math.floor(i),c=Math.floor(r),l=a+1,u=c+1,d=e/a,f=t/c,h=[],g=[],_=[],m=[];for(let p=0;p<u;p++){let M=p*f-o;for(let w=0;w<l;w++){let b=w*d-s;g.push(b,-M,0),_.push(0,0,1),m.push(w/a),m.push(1-p/c)}}for(let p=0;p<c;p++)for(let M=0;M<a;M++){let w=M+l*p,b=M+l*(p+1),D=M+1+l*(p+1),C=M+1+l*p;h.push(w,b,C),h.push(b,D,C)}this.setIndex(h),this.setAttribute("position",new Ht(g,3)),this.setAttribute("normal",new Ht(_,3)),this.setAttribute("uv",new Ht(m,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new n(e.width,e.height,e.widthSegments,e.heightSegments)}};var Ca=class n extends Kn{constructor(e=1,t=32,i=16,r=0,s=Math.PI*2,o=0,a=Math.PI){super(),this.type="SphereGeometry",this.parameters={radius:e,widthSegments:t,heightSegments:i,phiStart:r,phiLength:s,thetaStart:o,thetaLength:a},t=Math.max(3,Math.floor(t)),i=Math.max(2,Math.floor(i));let c=Math.min(o+a,Math.PI),l=0,u=[],d=new F,f=new F,h=[],g=[],_=[],m=[];for(let p=0;p<=i;p++){let M=[],w=p/i,b=0;p===0&&o===0?b=.5/t:p===i&&c===Math.PI&&(b=-.5/t);for(let D=0;D<=t;D++){let C=D/t;d.x=-e*Math.cos(r+C*s)*Math.sin(o+w*a),d.y=e*Math.cos(o+w*a),d.z=e*Math.sin(r+C*s)*Math.sin(o+w*a),g.push(d.x,d.y,d.z),f.copy(d).normalize(),_.push(f.x,f.y,f.z),m.push(C+b,1-w),M.push(l++)}u.push(M)}for(let p=0;p<i;p++)for(let M=0;M<t;M++){let w=u[p][M+1],b=u[p][M],D=u[p+1][M],C=u[p+1][M+1];(p!==0||o>0)&&h.push(w,b,C),(p!==i-1||c<Math.PI)&&h.push(b,D,C)}this.setIndex(h),this.setAttribute("position",new Ht(g,3)),this.setAttribute("normal",new Ht(_,3)),this.setAttribute("uv",new Ht(m,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new n(e.radius,e.widthSegments,e.heightSegments,e.phiStart,e.phiLength,e.thetaStart,e.thetaLength)}};var Ta=class n extends Kn{constructor(e=1,t=.4,i=12,r=48,s=Math.PI*2,o=0,a=Math.PI*2){super(),this.type="TorusGeometry",this.parameters={radius:e,tube:t,radialSegments:i,tubularSegments:r,arc:s,thetaStart:o,thetaLength:a},i=Math.floor(i),r=Math.floor(r);let c=[],l=[],u=[],d=[],f=new F,h=new F,g=new F;for(let _=0;_<=i;_++){let m=o+_/i*a;for(let p=0;p<=r;p++){let M=p/r*s;h.x=(e+t*Math.cos(m))*Math.cos(M),h.y=(e+t*Math.cos(m))*Math.sin(M),h.z=t*Math.sin(m),l.push(h.x,h.y,h.z),f.x=e*Math.cos(M),f.y=e*Math.sin(M),g.subVectors(h,f).normalize(),u.push(g.x,g.y,g.z),d.push(p/r),d.push(_/i)}}for(let _=1;_<=i;_++)for(let m=1;m<=r;m++){let p=(r+1)*_+m-1,M=(r+1)*(_-1)+m-1,w=(r+1)*(_-1)+m,b=(r+1)*_+m;c.push(p,M,b),c.push(M,w,b)}this.setIndex(c),this.setAttribute("position",new Ht(l,3)),this.setAttribute("normal",new Ht(u,3)),this.setAttribute("uv",new Ht(d,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new n(e.radius,e.tube,e.radialSegments,e.tubularSegments,e.arc)}};function co(n){let e={};for(let t in n){e[t]={};for(let i in n[t]){let r=n[t][i];r&&(r.isColor||r.isMatrix3||r.isMatrix4||r.isVector2||r.isVector3||r.isVector4||r.isTexture||r.isQuaternion)?r.isRenderTargetTexture?(Le("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),e[t][i]=null):e[t][i]=r.clone():Array.isArray(r)?e[t][i]=r.slice():e[t][i]=r}}return e}function Sn(n){let e={};for(let t=0;t<n.length;t++){let i=co(n[t]);for(let r in i)e[r]=i[r]}return e}function MN(n){let e=[];for(let t=0;t<n.length;t++)e.push(n[t].clone());return e}function Ky(n){let e=n.getRenderTarget();return e===null?n.outputColorSpace:e.isXRRenderTarget===!0?e.texture.colorSpace:st.workingColorSpace}var PE={clone:co,merge:Sn},SN=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,bN=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`,Qn=class extends os{constructor(e){super(),this.isShaderMaterial=!0,this.type="ShaderMaterial",this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=SN,this.fragmentShader=bN,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,e!==void 0&&this.setValues(e)}copy(e){return super.copy(e),this.fragmentShader=e.fragmentShader,this.vertexShader=e.vertexShader,this.uniforms=co(e.uniforms),this.uniformsGroups=MN(e.uniformsGroups),this.defines=Object.assign({},e.defines),this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.fog=e.fog,this.lights=e.lights,this.clipping=e.clipping,this.extensions=Object.assign({},e.extensions),this.glslVersion=e.glslVersion,this.defaultAttributeValues=Object.assign({},e.defaultAttributeValues),this.index0AttributeName=e.index0AttributeName,this.uniformsNeedUpdate=e.uniformsNeedUpdate,this}toJSON(e){let t=super.toJSON(e);t.glslVersion=this.glslVersion,t.uniforms={};for(let r in this.uniforms){let o=this.uniforms[r].value;o&&o.isTexture?t.uniforms[r]={type:"t",value:o.toJSON(e).uuid}:o&&o.isColor?t.uniforms[r]={type:"c",value:o.getHex()}:o&&o.isVector2?t.uniforms[r]={type:"v2",value:o.toArray()}:o&&o.isVector3?t.uniforms[r]={type:"v3",value:o.toArray()}:o&&o.isVector4?t.uniforms[r]={type:"v4",value:o.toArray()}:o&&o.isMatrix3?t.uniforms[r]={type:"m3",value:o.toArray()}:o&&o.isMatrix4?t.uniforms[r]={type:"m4",value:o.toArray()}:t.uniforms[r]={value:o}}Object.keys(this.defines).length>0&&(t.defines=this.defines),t.vertexShader=this.vertexShader,t.fragmentShader=this.fragmentShader,t.lights=this.lights,t.clipping=this.clipping;let i={};for(let r in this.extensions)this.extensions[r]===!0&&(i[r]=!0);return Object.keys(i).length>0&&(t.extensions=i),t}},nh=class extends Qn{constructor(e){super(e),this.isRawShaderMaterial=!0,this.type="RawShaderMaterial"}},hl=class extends os{constructor(e){super(),this.isMeshStandardMaterial=!0,this.type="MeshStandardMaterial",this.defines={STANDARD:""},this.color=new ot(16777215),this.roughness=1,this.metalness=0,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new ot(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=Yy,this.normalScale=new it(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.roughnessMap=null,this.metalnessMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new rs,this.envMapIntensity=1,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.defines={STANDARD:""},this.color.copy(e.color),this.roughness=e.roughness,this.metalness=e.metalness,this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.emissive.copy(e.emissive),this.emissiveMap=e.emissiveMap,this.emissiveIntensity=e.emissiveIntensity,this.bumpMap=e.bumpMap,this.bumpScale=e.bumpScale,this.normalMap=e.normalMap,this.normalMapType=e.normalMapType,this.normalScale.copy(e.normalScale),this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.roughnessMap=e.roughnessMap,this.metalnessMap=e.metalnessMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.envMapIntensity=e.envMapIntensity,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.flatShading=e.flatShading,this.fog=e.fog,this}};var ih=class extends os{constructor(e){super(),this.isMeshDepthMaterial=!0,this.type="MeshDepthMaterial",this.depthPacking=xE,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(e)}copy(e){return super.copy(e),this.depthPacking=e.depthPacking,this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this}},rh=class extends os{constructor(e){super(),this.isMeshDistanceMaterial=!0,this.type="MeshDistanceMaterial",this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(e)}copy(e){return super.copy(e),this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this}};function Pf(n,e){return!n||n.constructor===e?n:typeof e.BYTES_PER_ELEMENT=="number"?new e(n):Array.prototype.slice.call(n)}var cs=class{constructor(e,t,i,r){this.parameterPositions=e,this._cachedIndex=0,this.resultBuffer=r!==void 0?r:new t.constructor(i),this.sampleValues=t,this.valueSize=i,this.settings=null,this.DefaultSettings_={}}evaluate(e){let t=this.parameterPositions,i=this._cachedIndex,r=t[i],s=t[i-1];n:{e:{let o;t:{i:if(!(e<r)){for(let a=i+2;;){if(r===void 0){if(e<s)break i;return i=t.length,this._cachedIndex=i,this.copySampleValue_(i-1)}if(i===a)break;if(s=r,r=t[++i],e<r)break e}o=t.length;break t}if(!(e>=s)){let a=t[1];e<a&&(i=2,s=a);for(let c=i-2;;){if(s===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(i===c)break;if(r=s,s=t[--i-1],e>=s)break e}o=i,i=0;break t}break n}for(;i<o;){let a=i+o>>>1;e<t[a]?o=a:i=a+1}if(r=t[i],s=t[i-1],s===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(r===void 0)return i=t.length,this._cachedIndex=i,this.copySampleValue_(i-1)}this._cachedIndex=i,this.intervalChanged_(i,s,r)}return this.interpolate_(i,s,e,r)}getSettings_(){return this.settings||this.DefaultSettings_}copySampleValue_(e){let t=this.resultBuffer,i=this.sampleValues,r=this.valueSize,s=e*r;for(let o=0;o!==r;++o)t[o]=i[s+o];return t}interpolate_(){throw new Error("call to abstract method")}intervalChanged_(){}},sh=class extends cs{constructor(e,t,i,r){super(e,t,i,r),this._weightPrev=-0,this._offsetPrev=-0,this._weightNext=-0,this._offsetNext=-0,this.DefaultSettings_={endingStart:My,endingEnd:My}}intervalChanged_(e,t,i){let r=this.parameterPositions,s=e-2,o=e+1,a=r[s],c=r[o];if(a===void 0)switch(this.getSettings_().endingStart){case Sy:s=e,a=2*t-i;break;case by:s=r.length-2,a=t+r[s]-r[s+1];break;default:s=e,a=i}if(c===void 0)switch(this.getSettings_().endingEnd){case Sy:o=e,c=2*i-t;break;case by:o=1,c=i+r[1]-r[0];break;default:o=e-1,c=t}let l=(i-t)*.5,u=this.valueSize;this._weightPrev=l/(t-a),this._weightNext=l/(c-i),this._offsetPrev=s*u,this._offsetNext=o*u}interpolate_(e,t,i,r){let s=this.resultBuffer,o=this.sampleValues,a=this.valueSize,c=e*a,l=c-a,u=this._offsetPrev,d=this._offsetNext,f=this._weightPrev,h=this._weightNext,g=(i-t)/(r-t),_=g*g,m=_*g,p=-f*m+2*f*_-f*g,M=(1+f)*m+(-1.5-2*f)*_+(-.5+f)*g+1,w=(-1-h)*m+(1.5+h)*_+.5*g,b=h*m-h*_;for(let D=0;D!==a;++D)s[D]=p*o[u+D]+M*o[l+D]+w*o[c+D]+b*o[d+D];return s}},oh=class extends cs{constructor(e,t,i,r){super(e,t,i,r)}interpolate_(e,t,i,r){let s=this.resultBuffer,o=this.sampleValues,a=this.valueSize,c=e*a,l=c-a,u=(i-t)/(r-t),d=1-u;for(let f=0;f!==a;++f)s[f]=o[l+f]*d+o[c+f]*u;return s}},ah=class extends cs{constructor(e,t,i,r){super(e,t,i,r)}interpolate_(e){return this.copySampleValue_(e-1)}},ch=class extends cs{interpolate_(e,t,i,r){let s=this.resultBuffer,o=this.sampleValues,a=this.valueSize,c=e*a,l=c-a,u=this.settings||this.DefaultSettings_,d=u.inTangents,f=u.outTangents;if(!d||!f){let _=(i-t)/(r-t),m=1-_;for(let p=0;p!==a;++p)s[p]=o[l+p]*m+o[c+p]*_;return s}let h=a*2,g=e-1;for(let _=0;_!==a;++_){let m=o[l+_],p=o[c+_],M=g*h+_*2,w=f[M],b=f[M+1],D=e*h+_*2,C=d[D],A=d[D+1],y=(i-t)/(r-t),S,j,T,O,k;for(let G=0;G<8;G++){S=y*y,j=S*y,T=1-y,O=T*T,k=O*T;let H=k*t+3*O*y*w+3*T*S*C+j*r-i;if(Math.abs(H)<1e-10)break;let L=3*O*(w-t)+6*T*y*(C-w)+3*S*(r-C);if(Math.abs(L)<1e-10)break;y=y-H/L,y=Math.max(0,Math.min(1,y))}s[_]=k*m+3*O*y*b+3*T*S*A+j*p}return s}},ei=class{constructor(e,t,i,r){if(e===void 0)throw new Error("THREE.KeyframeTrack: track name is undefined");if(t===void 0||t.length===0)throw new Error("THREE.KeyframeTrack: no keyframes in track named "+e);this.name=e,this.times=Pf(t,this.TimeBufferType),this.values=Pf(i,this.ValueBufferType),this.setInterpolation(r||this.DefaultInterpolation)}static toJSON(e){let t=e.constructor,i;if(t.toJSON!==this.toJSON)i=t.toJSON(e);else{i={name:e.name,times:Pf(e.times,Array),values:Pf(e.values,Array)};let r=e.getInterpolation();r!==e.DefaultInterpolation&&(i.interpolation=r)}return i.type=e.ValueTypeName,i}InterpolantFactoryMethodDiscrete(e){return new ah(this.times,this.values,this.getValueSize(),e)}InterpolantFactoryMethodLinear(e){return new oh(this.times,this.values,this.getValueSize(),e)}InterpolantFactoryMethodSmooth(e){return new sh(this.times,this.values,this.getValueSize(),e)}InterpolantFactoryMethodBezier(e){let t=new ch(this.times,this.values,this.getValueSize(),e);return this.settings&&(t.settings=this.settings),t}setInterpolation(e){let t;switch(e){case el:t=this.InterpolantFactoryMethodDiscrete;break;case Xf:t=this.InterpolantFactoryMethodLinear;break;case Ff:t=this.InterpolantFactoryMethodSmooth;break;case xy:t=this.InterpolantFactoryMethodBezier;break}if(t===void 0){let i="unsupported interpolation for "+this.ValueTypeName+" keyframe track named "+this.name;if(this.createInterpolant===void 0)if(e!==this.DefaultInterpolation)this.setInterpolation(this.DefaultInterpolation);else throw new Error(i);return Le("KeyframeTrack:",i),this}return this.createInterpolant=t,this}getInterpolation(){switch(this.createInterpolant){case this.InterpolantFactoryMethodDiscrete:return el;case this.InterpolantFactoryMethodLinear:return Xf;case this.InterpolantFactoryMethodSmooth:return Ff;case this.InterpolantFactoryMethodBezier:return xy}}getValueSize(){return this.values.length/this.times.length}shift(e){if(e!==0){let t=this.times;for(let i=0,r=t.length;i!==r;++i)t[i]+=e}return this}scale(e){if(e!==1){let t=this.times;for(let i=0,r=t.length;i!==r;++i)t[i]*=e}return this}trim(e,t){let i=this.times,r=i.length,s=0,o=r-1;for(;s!==r&&i[s]<e;)++s;for(;o!==-1&&i[o]>t;)--o;if(++o,s!==0||o!==r){s>=o&&(o=Math.max(o,1),s=o-1);let a=this.getValueSize();this.times=i.slice(s,o),this.values=this.values.slice(s*a,o*a)}return this}validate(){let e=!0,t=this.getValueSize();t-Math.floor(t)!==0&&(Ne("KeyframeTrack: Invalid value size in track.",this),e=!1);let i=this.times,r=this.values,s=i.length;s===0&&(Ne("KeyframeTrack: Track is empty.",this),e=!1);let o=null;for(let a=0;a!==s;a++){let c=i[a];if(typeof c=="number"&&isNaN(c)){Ne("KeyframeTrack: Time is not a valid number.",this,a,c),e=!1;break}if(o!==null&&o>c){Ne("KeyframeTrack: Out of order keys.",this,a,c,o),e=!1;break}o=c}if(r!==void 0&&tN(r))for(let a=0,c=r.length;a!==c;++a){let l=r[a];if(isNaN(l)){Ne("KeyframeTrack: Value is not a valid number.",this,a,l),e=!1;break}}return e}optimize(){let e=this.times.slice(),t=this.values.slice(),i=this.getValueSize(),r=this.getInterpolation()===Ff,s=e.length-1,o=1;for(let a=1;a<s;++a){let c=!1,l=e[a],u=e[a+1];if(l!==u&&(a!==1||l!==e[0]))if(r)c=!0;else{let d=a*i,f=d-i,h=d+i;for(let g=0;g!==i;++g){let _=t[d+g];if(_!==t[f+g]||_!==t[h+g]){c=!0;break}}}if(c){if(a!==o){e[o]=e[a];let d=a*i,f=o*i;for(let h=0;h!==i;++h)t[f+h]=t[d+h]}++o}}if(s>0){e[o]=e[s];for(let a=s*i,c=o*i,l=0;l!==i;++l)t[c+l]=t[a+l];++o}return o!==e.length?(this.times=e.slice(0,o),this.values=t.slice(0,o*i)):(this.times=e,this.values=t),this}clone(){let e=this.times.slice(),t=this.values.slice(),i=this.constructor,r=new i(this.name,e,t);return r.createInterpolant=this.createInterpolant,r}};ei.prototype.ValueTypeName="";ei.prototype.TimeBufferType=Float32Array;ei.prototype.ValueBufferType=Float32Array;ei.prototype.DefaultInterpolation=Xf;var ls=class extends ei{constructor(e,t,i){super(e,t,i)}};ls.prototype.ValueTypeName="bool";ls.prototype.ValueBufferType=Array;ls.prototype.DefaultInterpolation=el;ls.prototype.InterpolantFactoryMethodLinear=void 0;ls.prototype.InterpolantFactoryMethodSmooth=void 0;var lh=class extends ei{constructor(e,t,i,r){super(e,t,i,r)}};lh.prototype.ValueTypeName="color";var uh=class extends ei{constructor(e,t,i,r){super(e,t,i,r)}};uh.prototype.ValueTypeName="number";var dh=class extends cs{constructor(e,t,i,r){super(e,t,i,r)}interpolate_(e,t,i,r){let s=this.resultBuffer,o=this.sampleValues,a=this.valueSize,c=(i-t)/(r-t),l=e*a;for(let u=l+a;l!==u;l+=4)fi.slerpFlat(s,0,o,l-a,o,l,c);return s}},pl=class extends ei{constructor(e,t,i,r){super(e,t,i,r)}InterpolantFactoryMethodLinear(e){return new dh(this.times,this.values,this.getValueSize(),e)}};pl.prototype.ValueTypeName="quaternion";pl.prototype.InterpolantFactoryMethodSmooth=void 0;var us=class extends ei{constructor(e,t,i){super(e,t,i)}};us.prototype.ValueTypeName="string";us.prototype.ValueBufferType=Array;us.prototype.DefaultInterpolation=el;us.prototype.InterpolantFactoryMethodLinear=void 0;us.prototype.InterpolantFactoryMethodSmooth=void 0;var fh=class extends ei{constructor(e,t,i,r){super(e,t,i,r)}};fh.prototype.ValueTypeName="vector";var ml=class extends $i{constructor(e,t=1){super(),this.isLight=!0,this.type="Light",this.color=new ot(e),this.intensity=t}dispose(){this.dispatchEvent({type:"dispose"})}copy(e,t){return super.copy(e,t),this.color.copy(e.color),this.intensity=e.intensity,this}toJSON(e){let t=super.toJSON(e);return t.object.color=this.color.getHex(),t.object.intensity=this.intensity,t}};var yy=new It,jb=new F,Wb=new F,Cy=class{constructor(e){this.camera=e,this.intensity=1,this.bias=0,this.biasNode=null,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new it(512,512),this.mapType=Vn,this.map=null,this.mapPass=null,this.matrix=new It,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new Ea,this._frameExtents=new it(1,1),this._viewportCount=1,this._viewports=[new Pt(0,0,1,1)]}getViewportCount(){return this._viewportCount}getFrustum(){return this._frustum}updateMatrices(e){let t=this.camera,i=this.matrix;jb.setFromMatrixPosition(e.matrixWorld),t.position.copy(jb),Wb.setFromMatrixPosition(e.target.matrixWorld),t.lookAt(Wb),t.updateMatrixWorld(),yy.multiplyMatrices(t.projectionMatrix,t.matrixWorldInverse),this._frustum.setFromProjectionMatrix(yy,t.coordinateSystem,t.reversedDepth),t.coordinateSystem===ya||t.reversedDepth?i.set(.5,0,0,.5,0,.5,0,.5,0,0,1,0,0,0,0,1):i.set(.5,0,0,.5,0,.5,0,.5,0,0,.5,.5,0,0,0,1),i.multiply(yy)}getViewport(e){return this._viewports[e]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(e){return this.camera=e.camera.clone(),this.intensity=e.intensity,this.bias=e.bias,this.radius=e.radius,this.autoUpdate=e.autoUpdate,this.needsUpdate=e.needsUpdate,this.normalBias=e.normalBias,this.blurSamples=e.blurSamples,this.mapSize.copy(e.mapSize),this.biasNode=e.biasNode,this}clone(){return new this.constructor().copy(this)}toJSON(){let e={};return this.intensity!==1&&(e.intensity=this.intensity),this.bias!==0&&(e.bias=this.bias),this.normalBias!==0&&(e.normalBias=this.normalBias),this.radius!==1&&(e.radius=this.radius),(this.mapSize.x!==512||this.mapSize.y!==512)&&(e.mapSize=this.mapSize.toArray()),e.camera=this.camera.toJSON(!1).object,delete e.camera.matrix,e}},Of=new F,Lf=new fi,zi=new F,gl=class extends $i{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new It,this.projectionMatrix=new It,this.projectionMatrixInverse=new It,this.coordinateSystem=Ri,this._reversedDepth=!1}get reversedDepth(){return this._reversedDepth}copy(e,t){return super.copy(e,t),this.matrixWorldInverse.copy(e.matrixWorldInverse),this.projectionMatrix.copy(e.projectionMatrix),this.projectionMatrixInverse.copy(e.projectionMatrixInverse),this.coordinateSystem=e.coordinateSystem,this}getWorldDirection(e){return super.getWorldDirection(e).negate()}updateMatrixWorld(e){super.updateMatrixWorld(e),this.matrixWorld.decompose(Of,Lf,zi),zi.x===1&&zi.y===1&&zi.z===1?this.matrixWorldInverse.copy(this.matrixWorld).invert():this.matrixWorldInverse.compose(Of,Lf,zi.set(1,1,1)).invert()}updateWorldMatrix(e,t){super.updateWorldMatrix(e,t),this.matrixWorld.decompose(Of,Lf,zi),zi.x===1&&zi.y===1&&zi.z===1?this.matrixWorldInverse.copy(this.matrixWorld).invert():this.matrixWorldInverse.compose(Of,Lf,zi.set(1,1,1)).invert()}clone(){return new this.constructor().copy(this)}},ts=new F,$b=new it,qb=new it,Mn=class extends gl{constructor(e=50,t=1,i=.1,r=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=e,this.zoom=1,this.near=i,this.far=r,this.focus=10,this.aspect=t,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.fov=e.fov,this.zoom=e.zoom,this.near=e.near,this.far=e.far,this.focus=e.focus,this.aspect=e.aspect,this.view=e.view===null?null:Object.assign({},e.view),this.filmGauge=e.filmGauge,this.filmOffset=e.filmOffset,this}setFocalLength(e){let t=.5*this.getFilmHeight()/e;this.fov=Yf*2*Math.atan(t),this.updateProjectionMatrix()}getFocalLength(){let e=Math.tan(Yv*.5*this.fov);return .5*this.getFilmHeight()/e}getEffectiveFOV(){return Yf*2*Math.atan(Math.tan(Yv*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(e,t,i){ts.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),t.set(ts.x,ts.y).multiplyScalar(-e/ts.z),ts.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),i.set(ts.x,ts.y).multiplyScalar(-e/ts.z)}getViewSize(e,t){return this.getViewBounds(e,$b,qb),t.subVectors(qb,$b)}setViewOffset(e,t,i,r,s,o){this.aspect=e/t,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=i,this.view.offsetY=r,this.view.width=s,this.view.height=o,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){let e=this.near,t=e*Math.tan(Yv*.5*this.fov)/this.zoom,i=2*t,r=this.aspect*i,s=-.5*r,o=this.view;if(this.view!==null&&this.view.enabled){let c=o.fullWidth,l=o.fullHeight;s+=o.offsetX*r/c,t-=o.offsetY*i/l,r*=o.width/c,i*=o.height/l}let a=this.filmOffset;a!==0&&(s+=e*a/this.getFilmWidth()),this.projectionMatrix.makePerspective(s,s+r,t,t-i,e,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){let t=super.toJSON(e);return t.object.fov=this.fov,t.object.zoom=this.zoom,t.object.near=this.near,t.object.far=this.far,t.object.focus=this.focus,t.object.aspect=this.aspect,this.view!==null&&(t.object.view=Object.assign({},this.view)),t.object.filmGauge=this.filmGauge,t.object.filmOffset=this.filmOffset,t}};var Da=class extends gl{constructor(e=-1,t=1,i=1,r=-1,s=.1,o=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=e,this.right=t,this.top=i,this.bottom=r,this.near=s,this.far=o,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.left=e.left,this.right=e.right,this.top=e.top,this.bottom=e.bottom,this.near=e.near,this.far=e.far,this.zoom=e.zoom,this.view=e.view===null?null:Object.assign({},e.view),this}setViewOffset(e,t,i,r,s,o){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=i,this.view.offsetY=r,this.view.width=s,this.view.height=o,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){let e=(this.right-this.left)/(2*this.zoom),t=(this.top-this.bottom)/(2*this.zoom),i=(this.right+this.left)/2,r=(this.top+this.bottom)/2,s=i-e,o=i+e,a=r+t,c=r-t;if(this.view!==null&&this.view.enabled){let l=(this.right-this.left)/this.view.fullWidth/this.zoom,u=(this.top-this.bottom)/this.view.fullHeight/this.zoom;s+=l*this.view.offsetX,o=s+l*this.view.width,a-=u*this.view.offsetY,c=a-u*this.view.height}this.projectionMatrix.makeOrthographic(s,o,a,c,this.near,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){let t=super.toJSON(e);return t.object.zoom=this.zoom,t.object.left=this.left,t.object.right=this.right,t.object.top=this.top,t.object.bottom=this.bottom,t.object.near=this.near,t.object.far=this.far,this.view!==null&&(t.object.view=Object.assign({},this.view)),t}},Ty=class extends Cy{constructor(){super(new Da(-5,5,5,-5,.5,500)),this.isDirectionalLightShadow=!0}},vl=class extends ml{constructor(e,t){super(e,t),this.isDirectionalLight=!0,this.type="DirectionalLight",this.position.copy($i.DEFAULT_UP),this.updateMatrix(),this.target=new $i,this.shadow=new Ty}dispose(){super.dispose(),this.shadow.dispose()}copy(e){return super.copy(e),this.target=e.target.clone(),this.shadow=e.shadow.clone(),this}toJSON(e){let t=super.toJSON(e);return t.object.shadow=this.shadow.toJSON(),t.object.target=this.target.uuid,t}},yl=class extends ml{constructor(e,t){super(e,t),this.isAmbientLight=!0,this.type="AmbientLight"}};var ma=-90,ga=1,hh=class extends $i{constructor(e,t,i){super(),this.type="CubeCamera",this.renderTarget=i,this.coordinateSystem=null,this.activeMipmapLevel=0;let r=new Mn(ma,ga,e,t);r.layers=this.layers,this.add(r);let s=new Mn(ma,ga,e,t);s.layers=this.layers,this.add(s);let o=new Mn(ma,ga,e,t);o.layers=this.layers,this.add(o);let a=new Mn(ma,ga,e,t);a.layers=this.layers,this.add(a);let c=new Mn(ma,ga,e,t);c.layers=this.layers,this.add(c);let l=new Mn(ma,ga,e,t);l.layers=this.layers,this.add(l)}updateCoordinateSystem(){let e=this.coordinateSystem,t=this.children.concat(),[i,r,s,o,a,c]=t;for(let l of t)this.remove(l);if(e===Ri)i.up.set(0,1,0),i.lookAt(1,0,0),r.up.set(0,1,0),r.lookAt(-1,0,0),s.up.set(0,0,-1),s.lookAt(0,1,0),o.up.set(0,0,1),o.lookAt(0,-1,0),a.up.set(0,1,0),a.lookAt(0,0,1),c.up.set(0,1,0),c.lookAt(0,0,-1);else if(e===ya)i.up.set(0,-1,0),i.lookAt(-1,0,0),r.up.set(0,-1,0),r.lookAt(1,0,0),s.up.set(0,0,1),s.lookAt(0,1,0),o.up.set(0,0,-1),o.lookAt(0,-1,0),a.up.set(0,-1,0),a.lookAt(0,0,1),c.up.set(0,-1,0),c.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+e);for(let l of t)this.add(l),l.updateMatrixWorld()}update(e,t){this.parent===null&&this.updateMatrixWorld();let{renderTarget:i,activeMipmapLevel:r}=this;this.coordinateSystem!==e.coordinateSystem&&(this.coordinateSystem=e.coordinateSystem,this.updateCoordinateSystem());let[s,o,a,c,l,u]=this.children,d=e.getRenderTarget(),f=e.getActiveCubeFace(),h=e.getActiveMipmapLevel(),g=e.xr.enabled;e.xr.enabled=!1;let _=i.texture.generateMipmaps;i.texture.generateMipmaps=!1;let m=!1;e.isWebGLRenderer===!0?m=e.state.buffers.depth.getReversed():m=e.reversedDepthBuffer,e.setRenderTarget(i,0,r),m&&e.autoClear===!1&&e.clearDepth(),e.render(t,s),e.setRenderTarget(i,1,r),m&&e.autoClear===!1&&e.clearDepth(),e.render(t,o),e.setRenderTarget(i,2,r),m&&e.autoClear===!1&&e.clearDepth(),e.render(t,a),e.setRenderTarget(i,3,r),m&&e.autoClear===!1&&e.clearDepth(),e.render(t,c),e.setRenderTarget(i,4,r),m&&e.autoClear===!1&&e.clearDepth(),e.render(t,l),i.texture.generateMipmaps=_,e.setRenderTarget(i,5,r),m&&e.autoClear===!1&&e.clearDepth(),e.render(t,u),e.setRenderTarget(d,f,h),e.xr.enabled=g,i.texture.needsPMREMUpdate=!0}},ph=class extends Mn{constructor(e=[]){super(),this.isArrayCamera=!0,this.isMultiViewCamera=!1,this.cameras=e}};var Qy="\\[\\]\\.:\\/",EN=new RegExp("["+Qy+"]","g"),e_="[^"+Qy+"]",wN="[^"+Qy.replace("\\.","")+"]",CN=/((?:WC+[\/:])*)/.source.replace("WC",e_),TN=/(WCOD+)?/.source.replace("WCOD",wN),DN=/(?:\.(WC+)(?:\[(.+)\])?)?/.source.replace("WC",e_),IN=/\.(WC+)(?:\[(.+)\])?/.source.replace("WC",e_),AN=new RegExp("^"+CN+TN+DN+IN+"$"),RN=["material","materials","bones","map"],Dy=class{constructor(e,t,i){let r=i||Lt.parseTrackName(t);this._targetGroup=e,this._bindings=e.subscribe_(t,r)}getValue(e,t){this.bind();let i=this._targetGroup.nCachedObjects_,r=this._bindings[i];r!==void 0&&r.getValue(e,t)}setValue(e,t){let i=this._bindings;for(let r=this._targetGroup.nCachedObjects_,s=i.length;r!==s;++r)i[r].setValue(e,t)}bind(){let e=this._bindings;for(let t=this._targetGroup.nCachedObjects_,i=e.length;t!==i;++t)e[t].bind()}unbind(){let e=this._bindings;for(let t=this._targetGroup.nCachedObjects_,i=e.length;t!==i;++t)e[t].unbind()}},Lt=(()=>{class n{constructor(t,i,r){this.path=i,this.parsedPath=r||n.parseTrackName(i),this.node=n.findNode(t,this.parsedPath.nodeName),this.rootNode=t,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}static create(t,i,r){return t&&t.isAnimationObjectGroup?new n.Composite(t,i,r):new n(t,i,r)}static sanitizeNodeName(t){return t.replace(/\s/g,"_").replace(EN,"")}static parseTrackName(t){let i=AN.exec(t);if(i===null)throw new Error("PropertyBinding: Cannot parse trackName: "+t);let r={nodeName:i[2],objectName:i[3],objectIndex:i[4],propertyName:i[5],propertyIndex:i[6]},s=r.nodeName&&r.nodeName.lastIndexOf(".");if(s!==void 0&&s!==-1){let o=r.nodeName.substring(s+1);RN.indexOf(o)!==-1&&(r.nodeName=r.nodeName.substring(0,s),r.objectName=o)}if(r.propertyName===null||r.propertyName.length===0)throw new Error("PropertyBinding: can not parse propertyName from trackName: "+t);return r}static findNode(t,i){if(i===void 0||i===""||i==="."||i===-1||i===t.name||i===t.uuid)return t;if(t.skeleton){let r=t.skeleton.getBoneByName(i);if(r!==void 0)return r}if(t.children){let r=function(o){for(let a=0;a<o.length;a++){let c=o[a];if(c.name===i||c.uuid===i)return c;let l=r(c.children);if(l)return l}return null},s=r(t.children);if(s)return s}return null}_getValue_unavailable(){}_setValue_unavailable(){}_getValue_direct(t,i){t[i]=this.targetObject[this.propertyName]}_getValue_array(t,i){let r=this.resolvedProperty;for(let s=0,o=r.length;s!==o;++s)t[i++]=r[s]}_getValue_arrayElement(t,i){t[i]=this.resolvedProperty[this.propertyIndex]}_getValue_toArray(t,i){this.resolvedProperty.toArray(t,i)}_setValue_direct(t,i){this.targetObject[this.propertyName]=t[i]}_setValue_direct_setNeedsUpdate(t,i){this.targetObject[this.propertyName]=t[i],this.targetObject.needsUpdate=!0}_setValue_direct_setMatrixWorldNeedsUpdate(t,i){this.targetObject[this.propertyName]=t[i],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_array(t,i){let r=this.resolvedProperty;for(let s=0,o=r.length;s!==o;++s)r[s]=t[i++]}_setValue_array_setNeedsUpdate(t,i){let r=this.resolvedProperty;for(let s=0,o=r.length;s!==o;++s)r[s]=t[i++];this.targetObject.needsUpdate=!0}_setValue_array_setMatrixWorldNeedsUpdate(t,i){let r=this.resolvedProperty;for(let s=0,o=r.length;s!==o;++s)r[s]=t[i++];this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_arrayElement(t,i){this.resolvedProperty[this.propertyIndex]=t[i]}_setValue_arrayElement_setNeedsUpdate(t,i){this.resolvedProperty[this.propertyIndex]=t[i],this.targetObject.needsUpdate=!0}_setValue_arrayElement_setMatrixWorldNeedsUpdate(t,i){this.resolvedProperty[this.propertyIndex]=t[i],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_fromArray(t,i){this.resolvedProperty.fromArray(t,i)}_setValue_fromArray_setNeedsUpdate(t,i){this.resolvedProperty.fromArray(t,i),this.targetObject.needsUpdate=!0}_setValue_fromArray_setMatrixWorldNeedsUpdate(t,i){this.resolvedProperty.fromArray(t,i),this.targetObject.matrixWorldNeedsUpdate=!0}_getValue_unbound(t,i){this.bind(),this.getValue(t,i)}_setValue_unbound(t,i){this.bind(),this.setValue(t,i)}bind(){let t=this.node,i=this.parsedPath,r=i.objectName,s=i.propertyName,o=i.propertyIndex;if(t||(t=n.findNode(this.rootNode,i.nodeName),this.node=t),this.getValue=this._getValue_unavailable,this.setValue=this._setValue_unavailable,!t){Le("PropertyBinding: No target node found for track: "+this.path+".");return}if(r){let u=i.objectIndex;switch(r){case"materials":if(!t.material){Ne("PropertyBinding: Can not bind to material as node does not have a material.",this);return}if(!t.material.materials){Ne("PropertyBinding: Can not bind to material.materials as node.material does not have a materials array.",this);return}t=t.material.materials;break;case"bones":if(!t.skeleton){Ne("PropertyBinding: Can not bind to bones as node does not have a skeleton.",this);return}t=t.skeleton.bones;for(let d=0;d<t.length;d++)if(t[d].name===u){u=d;break}break;case"map":if("map"in t){t=t.map;break}if(!t.material){Ne("PropertyBinding: Can not bind to material as node does not have a material.",this);return}if(!t.material.map){Ne("PropertyBinding: Can not bind to material.map as node.material does not have a map.",this);return}t=t.material.map;break;default:if(t[r]===void 0){Ne("PropertyBinding: Can not bind to objectName of node undefined.",this);return}t=t[r]}if(u!==void 0){if(t[u]===void 0){Ne("PropertyBinding: Trying to bind to objectIndex of objectName, but is undefined.",this,t);return}t=t[u]}}let a=t[s];if(a===void 0){let u=i.nodeName;Ne("PropertyBinding: Trying to update property for track: "+u+"."+s+" but it wasn't found.",t);return}let c=this.Versioning.None;this.targetObject=t,t.isMaterial===!0?c=this.Versioning.NeedsUpdate:t.isObject3D===!0&&(c=this.Versioning.MatrixWorldNeedsUpdate);let l=this.BindingType.Direct;if(o!==void 0){if(s==="morphTargetInfluences"){if(!t.geometry){Ne("PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.",this);return}if(!t.geometry.morphAttributes){Ne("PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.morphAttributes.",this);return}t.morphTargetDictionary[o]!==void 0&&(o=t.morphTargetDictionary[o])}l=this.BindingType.ArrayElement,this.resolvedProperty=a,this.propertyIndex=o}else a.fromArray!==void 0&&a.toArray!==void 0?(l=this.BindingType.HasFromToArray,this.resolvedProperty=a):Array.isArray(a)?(l=this.BindingType.EntireArray,this.resolvedProperty=a):this.propertyName=s;this.getValue=this.GetterByBindingType[l],this.setValue=this.SetterByBindingTypeAndVersioning[l][c]}unbind(){this.node=null,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}}return n.Composite=Dy,n})();Lt.prototype.BindingType={Direct:0,EntireArray:1,ArrayElement:2,HasFromToArray:3};Lt.prototype.Versioning={None:0,NeedsUpdate:1,MatrixWorldNeedsUpdate:2};Lt.prototype.GetterByBindingType=[Lt.prototype._getValue_direct,Lt.prototype._getValue_array,Lt.prototype._getValue_arrayElement,Lt.prototype._getValue_toArray];Lt.prototype.SetterByBindingTypeAndVersioning=[[Lt.prototype._setValue_direct,Lt.prototype._setValue_direct_setNeedsUpdate,Lt.prototype._setValue_direct_setMatrixWorldNeedsUpdate],[Lt.prototype._setValue_array,Lt.prototype._setValue_array_setNeedsUpdate,Lt.prototype._setValue_array_setMatrixWorldNeedsUpdate],[Lt.prototype._setValue_arrayElement,Lt.prototype._setValue_arrayElement_setNeedsUpdate,Lt.prototype._setValue_arrayElement_setMatrixWorldNeedsUpdate],[Lt.prototype._setValue_fromArray,Lt.prototype._setValue_fromArray_setNeedsUpdate,Lt.prototype._setValue_fromArray_setMatrixWorldNeedsUpdate]];var Yq=new Float32Array(1);var Xb=new It,Ia=class{constructor(e,t,i=0,r=1/0){this.ray=new cl(e,t),this.near=i,this.far=r,this.camera=null,this.layers=new Ma,this.params={Mesh:{},Line:{threshold:1},LOD:{},Points:{threshold:1},Sprite:{}}}set(e,t){this.ray.set(e,t)}setFromCamera(e,t){t.isPerspectiveCamera?(this.ray.origin.setFromMatrixPosition(t.matrixWorld),this.ray.direction.set(e.x,e.y,.5).unproject(t).sub(this.ray.origin).normalize(),this.camera=t):t.isOrthographicCamera?(this.ray.origin.set(e.x,e.y,(t.near+t.far)/(t.near-t.far)).unproject(t),this.ray.direction.set(0,0,-1).transformDirection(t.matrixWorld),this.camera=t):Ne("Raycaster: Unsupported camera type: "+t.type)}setFromXRController(e){return Xb.identity().extractRotation(e.matrixWorld),this.ray.origin.setFromMatrixPosition(e.matrixWorld),this.ray.direction.set(0,0,-1).applyMatrix4(Xb),this}intersectObject(e,t=!0,i=[]){return Iy(e,this,i,t),i.sort(Yb),i}intersectObjects(e,t=!0,i=[]){for(let r=0,s=e.length;r<s;r++)Iy(e[r],this,i,t);return i.sort(Yb),i}};function Yb(n,e){return n.distance-e.distance}function Iy(n,e,t,i){let r=!0;if(n.layers.test(e.layers)&&n.raycast(e,t)===!1&&(r=!1),r===!0&&i===!0){let s=n.children;for(let o=0,a=s.length;o<a;o++)Iy(s[o],e,t,!0)}}function t_(n,e,t,i){let r=NN(i);switch(t){case $y:return n*e;case Xy:return n*e/r.components*r.byteLength;case Mh:return n*e/r.components*r.byteLength;case ao:return n*e*2/r.components*r.byteLength;case Sh:return n*e*2/r.components*r.byteLength;case qy:return n*e*3/r.components*r.byteLength;case hi:return n*e*4/r.components*r.byteLength;case bh:return n*e*4/r.components*r.byteLength;case Sl:case bl:return Math.floor((n+3)/4)*Math.floor((e+3)/4)*8;case El:case wl:return Math.floor((n+3)/4)*Math.floor((e+3)/4)*16;case wh:case Th:return Math.max(n,16)*Math.max(e,8)/4;case Eh:case Ch:return Math.max(n,8)*Math.max(e,8)/2;case Dh:case Ih:case Rh:case Nh:return Math.floor((n+3)/4)*Math.floor((e+3)/4)*8;case Ah:case Ph:case Oh:return Math.floor((n+3)/4)*Math.floor((e+3)/4)*16;case Lh:return Math.floor((n+3)/4)*Math.floor((e+3)/4)*16;case Fh:return Math.floor((n+4)/5)*Math.floor((e+3)/4)*16;case kh:return Math.floor((n+4)/5)*Math.floor((e+4)/5)*16;case Uh:return Math.floor((n+5)/6)*Math.floor((e+4)/5)*16;case Bh:return Math.floor((n+5)/6)*Math.floor((e+5)/6)*16;case Vh:return Math.floor((n+7)/8)*Math.floor((e+4)/5)*16;case Hh:return Math.floor((n+7)/8)*Math.floor((e+5)/6)*16;case zh:return Math.floor((n+7)/8)*Math.floor((e+7)/8)*16;case Gh:return Math.floor((n+9)/10)*Math.floor((e+4)/5)*16;case jh:return Math.floor((n+9)/10)*Math.floor((e+5)/6)*16;case Wh:return Math.floor((n+9)/10)*Math.floor((e+7)/8)*16;case $h:return Math.floor((n+9)/10)*Math.floor((e+9)/10)*16;case qh:return Math.floor((n+11)/12)*Math.floor((e+9)/10)*16;case Xh:return Math.floor((n+11)/12)*Math.floor((e+11)/12)*16;case Yh:case Zh:case Jh:return Math.ceil(n/4)*Math.ceil(e/4)*16;case Kh:case Qh:return Math.ceil(n/4)*Math.ceil(e/4)*8;case ep:case tp:return Math.ceil(n/4)*Math.ceil(e/4)*16}throw new Error(`Unable to determine texture byte length for ${t} format.`)}function NN(n){switch(n){case Vn:case zy:return{byteLength:1,components:1};case Ra:case Gy:case Zi:return{byteLength:2,components:1};case _h:case xh:return{byteLength:2,components:4};case Pi:case yh:case Oi:return{byteLength:4,components:1};case jy:case Wy:return{byteLength:4,components:3}}throw new Error(`Unknown texture type ${n}.`)}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:"183"}}));typeof window<"u"&&(window.__THREE__?Le("WARNING: Multiple instances of Three.js being imported."):window.__THREE__="183");function nw(){let n=null,e=!1,t=null,i=null;function r(s,o){t(s,o),i=n.requestAnimationFrame(r)}return{start:function(){e!==!0&&t!==null&&(i=n.requestAnimationFrame(r),e=!0)},stop:function(){n.cancelAnimationFrame(i),e=!1},setAnimationLoop:function(s){t=s},setContext:function(s){n=s}}}function ON(n){let e=new WeakMap;function t(a,c){let l=a.array,u=a.usage,d=l.byteLength,f=n.createBuffer();n.bindBuffer(c,f),n.bufferData(c,l,u),a.onUploadCallback();let h;if(l instanceof Float32Array)h=n.FLOAT;else if(typeof Float16Array<"u"&&l instanceof Float16Array)h=n.HALF_FLOAT;else if(l instanceof Uint16Array)a.isFloat16BufferAttribute?h=n.HALF_FLOAT:h=n.UNSIGNED_SHORT;else if(l instanceof Int16Array)h=n.SHORT;else if(l instanceof Uint32Array)h=n.UNSIGNED_INT;else if(l instanceof Int32Array)h=n.INT;else if(l instanceof Int8Array)h=n.BYTE;else if(l instanceof Uint8Array)h=n.UNSIGNED_BYTE;else if(l instanceof Uint8ClampedArray)h=n.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+l);return{buffer:f,type:h,bytesPerElement:l.BYTES_PER_ELEMENT,version:a.version,size:d}}function i(a,c,l){let u=c.array,d=c.updateRanges;if(n.bindBuffer(l,a),d.length===0)n.bufferSubData(l,0,u);else{d.sort((h,g)=>h.start-g.start);let f=0;for(let h=1;h<d.length;h++){let g=d[f],_=d[h];_.start<=g.start+g.count+1?g.count=Math.max(g.count,_.start+_.count-g.start):(++f,d[f]=_)}d.length=f+1;for(let h=0,g=d.length;h<g;h++){let _=d[h];n.bufferSubData(l,_.start*u.BYTES_PER_ELEMENT,u,_.start,_.count)}c.clearUpdateRanges()}c.onUploadCallback()}function r(a){return a.isInterleavedBufferAttribute&&(a=a.data),e.get(a)}function s(a){a.isInterleavedBufferAttribute&&(a=a.data);let c=e.get(a);c&&(n.deleteBuffer(c.buffer),e.delete(a))}function o(a,c){if(a.isInterleavedBufferAttribute&&(a=a.data),a.isGLBufferAttribute){let u=e.get(a);(!u||u.version<a.version)&&e.set(a,{buffer:a.buffer,type:a.type,bytesPerElement:a.elementSize,version:a.version});return}let l=e.get(a);if(l===void 0)e.set(a,t(a,c));else if(l.version<a.version){if(l.size!==a.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");i(l.buffer,a,c),l.version=a.version}}return{get:r,remove:s,update:o}}var LN=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,FN=`#ifdef USE_ALPHAHASH
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
#endif`,kN=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,UN=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,BN=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,VN=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,HN=`#ifdef USE_AOMAP
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
#endif`,zN=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,GN=`#ifdef USE_BATCHING
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
#endif`,jN=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,WN=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,$N=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,qN=`float G_BlinnPhong_Implicit( ) {
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
} // validated`,XN=`#ifdef USE_IRIDESCENCE
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
#endif`,YN=`#ifdef USE_BUMPMAP
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
#endif`,ZN=`#if NUM_CLIPPING_PLANES > 0
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
#endif`,JN=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,KN=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,QN=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,eP=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#endif`,tP=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#endif`,nP=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec4 vColor;
#endif`,iP=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
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
#endif`,rP=`#define PI 3.141592653589793
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
} // validated`,sP=`#ifdef ENVMAP_TYPE_CUBE_UV
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
#endif`,oP=`vec3 transformedNormal = objectNormal;
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
#endif`,aP=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,cP=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,lP=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE
		emissiveColor = sRGBTransferEOTF( emissiveColor );
	#endif
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,uP=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,dP="gl_FragColor = linearToOutputTexel( gl_FragColor );",fP=`vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferEOTF( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,hP=`#ifdef USE_ENVMAP
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
#endif`,pP=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform float flipEnvMap;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
#endif`,mP=`#ifdef USE_ENVMAP
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
#endif`,gP=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,vP=`#ifdef USE_ENVMAP
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
#endif`,yP=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,_P=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,xP=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,MP=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,SP=`#ifdef USE_GRADIENTMAP
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
}`,bP=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,EP=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,wP=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,CP=`uniform bool receiveShadow;
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
#endif`,TP=`#ifdef USE_ENVMAP
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
#endif`,DP=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,IP=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,AP=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,RP=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,NP=`PhysicalMaterial material;
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
#endif`,PP=`uniform sampler2D dfgLUT;
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
}`,OP=`
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
#endif`,LP=`#if defined( RE_IndirectDiffuse )
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
#endif`,FP=`#if defined( RE_IndirectDiffuse )
	#if defined( LAMBERT ) || defined( PHONG )
		irradiance += iblIrradiance;
	#endif
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,kP=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,UP=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,BP=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,VP=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,HP=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,zP=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,GP=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
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
#endif`,jP=`#if defined( USE_POINTS_UV )
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
#endif`,WP=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,$P=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,qP=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,XP=`#if defined( USE_MORPHCOLORS )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,YP=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,ZP=`#ifdef USE_MORPHTARGETS
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
#endif`,JP=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,KP=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
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
vec3 nonPerturbedNormal = normal;`,QP=`#ifdef USE_NORMALMAP_OBJECTSPACE
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
#endif`,eO=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,tO=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,nO=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
	#endif
#endif`,iO=`#ifdef USE_NORMALMAP
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
#endif`,rO=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,sO=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,oO=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,aO=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,cO=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,lO=`vec3 packNormalToRGB( const in vec3 normal ) {
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
}`,uO=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,dO=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,fO=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,hO=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,pO=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,mO=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,gO=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,vO=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,yO=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
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
#endif`,_O=`float getShadowMask() {
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
}`,xO=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,MO=`#ifdef USE_SKINNING
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
#endif`,SO=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,bO=`#ifdef USE_SKINNING
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
#endif`,EO=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,wO=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,CO=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,TO=`#ifndef saturate
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
vec3 CustomToneMapping( vec3 color ) { return color; }`,DO=`#ifdef USE_TRANSMISSION
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
#endif`,IO=`#ifdef USE_TRANSMISSION
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
#endif`,AO=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,RO=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,NO=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,PO=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`,OO=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,LO=`uniform sampler2D t2D;
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
}`,FO=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,kO=`#ifdef ENVMAP_TYPE_CUBE
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
}`,UO=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,BO=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,VO=`#include <common>
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
}`,HO=`#if DEPTH_PACKING == 3200
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
}`,zO=`#define DISTANCE
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
}`,GO=`#define DISTANCE
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
}`,jO=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,WO=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,$O=`uniform float scale;
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
}`,qO=`uniform vec3 diffuse;
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
}`,XO=`#include <common>
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
}`,YO=`uniform vec3 diffuse;
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
}`,ZO=`#define LAMBERT
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
}`,JO=`#define LAMBERT
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
}`,KO=`#define MATCAP
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
}`,QO=`#define MATCAP
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
}`,eL=`#define NORMAL
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
}`,tL=`#define NORMAL
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
}`,nL=`#define PHONG
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
}`,iL=`#define PHONG
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
}`,rL=`#define STANDARD
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
}`,sL=`#define STANDARD
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
}`,oL=`#define TOON
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
}`,aL=`#define TOON
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
}`,cL=`uniform float size;
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
}`,lL=`uniform vec3 diffuse;
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
}`,uL=`#include <common>
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
}`,dL=`uniform vec3 color;
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
}`,fL=`uniform float rotation;
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
}`,hL=`uniform vec3 diffuse;
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
}`,qe={alphahash_fragment:LN,alphahash_pars_fragment:FN,alphamap_fragment:kN,alphamap_pars_fragment:UN,alphatest_fragment:BN,alphatest_pars_fragment:VN,aomap_fragment:HN,aomap_pars_fragment:zN,batching_pars_vertex:GN,batching_vertex:jN,begin_vertex:WN,beginnormal_vertex:$N,bsdfs:qN,iridescence_fragment:XN,bumpmap_pars_fragment:YN,clipping_planes_fragment:ZN,clipping_planes_pars_fragment:JN,clipping_planes_pars_vertex:KN,clipping_planes_vertex:QN,color_fragment:eP,color_pars_fragment:tP,color_pars_vertex:nP,color_vertex:iP,common:rP,cube_uv_reflection_fragment:sP,defaultnormal_vertex:oP,displacementmap_pars_vertex:aP,displacementmap_vertex:cP,emissivemap_fragment:lP,emissivemap_pars_fragment:uP,colorspace_fragment:dP,colorspace_pars_fragment:fP,envmap_fragment:hP,envmap_common_pars_fragment:pP,envmap_pars_fragment:mP,envmap_pars_vertex:gP,envmap_physical_pars_fragment:TP,envmap_vertex:vP,fog_vertex:yP,fog_pars_vertex:_P,fog_fragment:xP,fog_pars_fragment:MP,gradientmap_pars_fragment:SP,lightmap_pars_fragment:bP,lights_lambert_fragment:EP,lights_lambert_pars_fragment:wP,lights_pars_begin:CP,lights_toon_fragment:DP,lights_toon_pars_fragment:IP,lights_phong_fragment:AP,lights_phong_pars_fragment:RP,lights_physical_fragment:NP,lights_physical_pars_fragment:PP,lights_fragment_begin:OP,lights_fragment_maps:LP,lights_fragment_end:FP,logdepthbuf_fragment:kP,logdepthbuf_pars_fragment:UP,logdepthbuf_pars_vertex:BP,logdepthbuf_vertex:VP,map_fragment:HP,map_pars_fragment:zP,map_particle_fragment:GP,map_particle_pars_fragment:jP,metalnessmap_fragment:WP,metalnessmap_pars_fragment:$P,morphinstance_vertex:qP,morphcolor_vertex:XP,morphnormal_vertex:YP,morphtarget_pars_vertex:ZP,morphtarget_vertex:JP,normal_fragment_begin:KP,normal_fragment_maps:QP,normal_pars_fragment:eO,normal_pars_vertex:tO,normal_vertex:nO,normalmap_pars_fragment:iO,clearcoat_normal_fragment_begin:rO,clearcoat_normal_fragment_maps:sO,clearcoat_pars_fragment:oO,iridescence_pars_fragment:aO,opaque_fragment:cO,packing:lO,premultiplied_alpha_fragment:uO,project_vertex:dO,dithering_fragment:fO,dithering_pars_fragment:hO,roughnessmap_fragment:pO,roughnessmap_pars_fragment:mO,shadowmap_pars_fragment:gO,shadowmap_pars_vertex:vO,shadowmap_vertex:yO,shadowmask_pars_fragment:_O,skinbase_vertex:xO,skinning_pars_vertex:MO,skinning_vertex:SO,skinnormal_vertex:bO,specularmap_fragment:EO,specularmap_pars_fragment:wO,tonemapping_fragment:CO,tonemapping_pars_fragment:TO,transmission_fragment:DO,transmission_pars_fragment:IO,uv_pars_fragment:AO,uv_pars_vertex:RO,uv_vertex:NO,worldpos_vertex:PO,background_vert:OO,background_frag:LO,backgroundCube_vert:FO,backgroundCube_frag:kO,cube_vert:UO,cube_frag:BO,depth_vert:VO,depth_frag:HO,distance_vert:zO,distance_frag:GO,equirect_vert:jO,equirect_frag:WO,linedashed_vert:$O,linedashed_frag:qO,meshbasic_vert:XO,meshbasic_frag:YO,meshlambert_vert:ZO,meshlambert_frag:JO,meshmatcap_vert:KO,meshmatcap_frag:QO,meshnormal_vert:eL,meshnormal_frag:tL,meshphong_vert:nL,meshphong_frag:iL,meshphysical_vert:rL,meshphysical_frag:sL,meshtoon_vert:oL,meshtoon_frag:aL,points_vert:cL,points_frag:lL,shadow_vert:uL,shadow_frag:dL,sprite_vert:fL,sprite_frag:hL},ce={common:{diffuse:{value:new ot(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new je},alphaMap:{value:null},alphaMapTransform:{value:new je},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new je}},envmap:{envMap:{value:null},envMapRotation:{value:new je},flipEnvMap:{value:-1},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98},dfgLUT:{value:null}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new je}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new je}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new je},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new je},normalScale:{value:new it(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new je},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new je}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new je}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new je}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new ot(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null}},points:{diffuse:{value:new ot(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new je},alphaTest:{value:0},uvTransform:{value:new je}},sprite:{diffuse:{value:new ot(16777215)},opacity:{value:1},center:{value:new it(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new je},alphaMap:{value:null},alphaMapTransform:{value:new je},alphaTest:{value:0}}},Ki={basic:{uniforms:Sn([ce.common,ce.specularmap,ce.envmap,ce.aomap,ce.lightmap,ce.fog]),vertexShader:qe.meshbasic_vert,fragmentShader:qe.meshbasic_frag},lambert:{uniforms:Sn([ce.common,ce.specularmap,ce.envmap,ce.aomap,ce.lightmap,ce.emissivemap,ce.bumpmap,ce.normalmap,ce.displacementmap,ce.fog,ce.lights,{emissive:{value:new ot(0)},envMapIntensity:{value:1}}]),vertexShader:qe.meshlambert_vert,fragmentShader:qe.meshlambert_frag},phong:{uniforms:Sn([ce.common,ce.specularmap,ce.envmap,ce.aomap,ce.lightmap,ce.emissivemap,ce.bumpmap,ce.normalmap,ce.displacementmap,ce.fog,ce.lights,{emissive:{value:new ot(0)},specular:{value:new ot(1118481)},shininess:{value:30},envMapIntensity:{value:1}}]),vertexShader:qe.meshphong_vert,fragmentShader:qe.meshphong_frag},standard:{uniforms:Sn([ce.common,ce.envmap,ce.aomap,ce.lightmap,ce.emissivemap,ce.bumpmap,ce.normalmap,ce.displacementmap,ce.roughnessmap,ce.metalnessmap,ce.fog,ce.lights,{emissive:{value:new ot(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:qe.meshphysical_vert,fragmentShader:qe.meshphysical_frag},toon:{uniforms:Sn([ce.common,ce.aomap,ce.lightmap,ce.emissivemap,ce.bumpmap,ce.normalmap,ce.displacementmap,ce.gradientmap,ce.fog,ce.lights,{emissive:{value:new ot(0)}}]),vertexShader:qe.meshtoon_vert,fragmentShader:qe.meshtoon_frag},matcap:{uniforms:Sn([ce.common,ce.bumpmap,ce.normalmap,ce.displacementmap,ce.fog,{matcap:{value:null}}]),vertexShader:qe.meshmatcap_vert,fragmentShader:qe.meshmatcap_frag},points:{uniforms:Sn([ce.points,ce.fog]),vertexShader:qe.points_vert,fragmentShader:qe.points_frag},dashed:{uniforms:Sn([ce.common,ce.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:qe.linedashed_vert,fragmentShader:qe.linedashed_frag},depth:{uniforms:Sn([ce.common,ce.displacementmap]),vertexShader:qe.depth_vert,fragmentShader:qe.depth_frag},normal:{uniforms:Sn([ce.common,ce.bumpmap,ce.normalmap,ce.displacementmap,{opacity:{value:1}}]),vertexShader:qe.meshnormal_vert,fragmentShader:qe.meshnormal_frag},sprite:{uniforms:Sn([ce.sprite,ce.fog]),vertexShader:qe.sprite_vert,fragmentShader:qe.sprite_frag},background:{uniforms:{uvTransform:{value:new je},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:qe.background_vert,fragmentShader:qe.background_frag},backgroundCube:{uniforms:{envMap:{value:null},flipEnvMap:{value:-1},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new je}},vertexShader:qe.backgroundCube_vert,fragmentShader:qe.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:qe.cube_vert,fragmentShader:qe.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:qe.equirect_vert,fragmentShader:qe.equirect_frag},distance:{uniforms:Sn([ce.common,ce.displacementmap,{referencePosition:{value:new F},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:qe.distance_vert,fragmentShader:qe.distance_frag},shadow:{uniforms:Sn([ce.lights,ce.fog,{color:{value:new ot(0)},opacity:{value:1}}]),vertexShader:qe.shadow_vert,fragmentShader:qe.shadow_frag}};Ki.physical={uniforms:Sn([Ki.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new je},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new je},clearcoatNormalScale:{value:new it(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new je},dispersion:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new je},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new je},sheen:{value:0},sheenColor:{value:new ot(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new je},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new je},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new je},transmissionSamplerSize:{value:new it},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new je},attenuationDistance:{value:0},attenuationColor:{value:new ot(0)},specularColor:{value:new ot(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new je},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new je},anisotropyVector:{value:new it},anisotropyMap:{value:null},anisotropyMapTransform:{value:new je}}]),vertexShader:qe.meshphysical_vert,fragmentShader:qe.meshphysical_frag};var rp={r:0,b:0,g:0},lo=new rs,pL=new It;function mL(n,e,t,i,r,s){let o=new ot(0),a=r===!0?0:1,c,l,u=null,d=0,f=null;function h(M){let w=M.isScene===!0?M.background:null;if(w&&w.isTexture){let b=M.backgroundBlurriness>0;w=e.get(w,b)}return w}function g(M){let w=!1,b=h(M);b===null?m(o,a):b&&b.isColor&&(m(b,1),w=!0);let D=n.xr.getEnvironmentBlendMode();D==="additive"?t.buffers.color.setClear(0,0,0,1,s):D==="alpha-blend"&&t.buffers.color.setClear(0,0,0,0,s),(n.autoClear||w)&&(t.buffers.depth.setTest(!0),t.buffers.depth.setMask(!0),t.buffers.color.setMask(!0),n.clear(n.autoClearColor,n.autoClearDepth,n.autoClearStencil))}function _(M,w){let b=h(w);b&&(b.isCubeTexture||b.mapping===xl)?(l===void 0&&(l=new on(new wa(1,1,1),new Qn({name:"BackgroundCubeMaterial",uniforms:co(Ki.backgroundCube.uniforms),vertexShader:Ki.backgroundCube.vertexShader,fragmentShader:Ki.backgroundCube.fragmentShader,side:Nn,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),l.geometry.deleteAttribute("normal"),l.geometry.deleteAttribute("uv"),l.onBeforeRender=function(D,C,A){this.matrixWorld.copyPosition(A.matrixWorld)},Object.defineProperty(l.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),i.update(l)),lo.copy(w.backgroundRotation),lo.x*=-1,lo.y*=-1,lo.z*=-1,b.isCubeTexture&&b.isRenderTargetTexture===!1&&(lo.y*=-1,lo.z*=-1),l.material.uniforms.envMap.value=b,l.material.uniforms.flipEnvMap.value=b.isCubeTexture&&b.isRenderTargetTexture===!1?-1:1,l.material.uniforms.backgroundBlurriness.value=w.backgroundBlurriness,l.material.uniforms.backgroundIntensity.value=w.backgroundIntensity,l.material.uniforms.backgroundRotation.value.setFromMatrix4(pL.makeRotationFromEuler(lo)),l.material.toneMapped=st.getTransfer(b.colorSpace)!==gt,(u!==b||d!==b.version||f!==n.toneMapping)&&(l.material.needsUpdate=!0,u=b,d=b.version,f=n.toneMapping),l.layers.enableAll(),M.unshift(l,l.geometry,l.material,0,0,null)):b&&b.isTexture&&(c===void 0&&(c=new on(new fl(2,2),new Qn({name:"BackgroundMaterial",uniforms:co(Ki.background.uniforms),vertexShader:Ki.background.vertexShader,fragmentShader:Ki.background.fragmentShader,side:Cr,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),c.geometry.deleteAttribute("normal"),Object.defineProperty(c.material,"map",{get:function(){return this.uniforms.t2D.value}}),i.update(c)),c.material.uniforms.t2D.value=b,c.material.uniforms.backgroundIntensity.value=w.backgroundIntensity,c.material.toneMapped=st.getTransfer(b.colorSpace)!==gt,b.matrixAutoUpdate===!0&&b.updateMatrix(),c.material.uniforms.uvTransform.value.copy(b.matrix),(u!==b||d!==b.version||f!==n.toneMapping)&&(c.material.needsUpdate=!0,u=b,d=b.version,f=n.toneMapping),c.layers.enableAll(),M.unshift(c,c.geometry,c.material,0,0,null))}function m(M,w){M.getRGB(rp,Ky(n)),t.buffers.color.setClear(rp.r,rp.g,rp.b,w,s)}function p(){l!==void 0&&(l.geometry.dispose(),l.material.dispose(),l=void 0),c!==void 0&&(c.geometry.dispose(),c.material.dispose(),c=void 0)}return{getClearColor:function(){return o},setClearColor:function(M,w=1){o.set(M),a=w,m(o,a)},getClearAlpha:function(){return a},setClearAlpha:function(M){a=M,m(o,a)},render:g,addToRenderList:_,dispose:p}}function gL(n,e){let t=n.getParameter(n.MAX_VERTEX_ATTRIBS),i={},r=f(null),s=r,o=!1;function a(T,O,k,G,B){let H=!1,L=d(T,G,k,O);s!==L&&(s=L,l(s.object)),H=h(T,G,k,B),H&&g(T,G,k,B),B!==null&&e.update(B,n.ELEMENT_ARRAY_BUFFER),(H||o)&&(o=!1,b(T,O,k,G),B!==null&&n.bindBuffer(n.ELEMENT_ARRAY_BUFFER,e.get(B).buffer))}function c(){return n.createVertexArray()}function l(T){return n.bindVertexArray(T)}function u(T){return n.deleteVertexArray(T)}function d(T,O,k,G){let B=G.wireframe===!0,H=i[O.id];H===void 0&&(H={},i[O.id]=H);let L=T.isInstancedMesh===!0?T.id:0,ee=H[L];ee===void 0&&(ee={},H[L]=ee);let Z=ee[k.id];Z===void 0&&(Z={},ee[k.id]=Z);let de=Z[B];return de===void 0&&(de=f(c()),Z[B]=de),de}function f(T){let O=[],k=[],G=[];for(let B=0;B<t;B++)O[B]=0,k[B]=0,G[B]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:O,enabledAttributes:k,attributeDivisors:G,object:T,attributes:{},index:null}}function h(T,O,k,G){let B=s.attributes,H=O.attributes,L=0,ee=k.getAttributes();for(let Z in ee)if(ee[Z].location>=0){let ve=B[Z],he=H[Z];if(he===void 0&&(Z==="instanceMatrix"&&T.instanceMatrix&&(he=T.instanceMatrix),Z==="instanceColor"&&T.instanceColor&&(he=T.instanceColor)),ve===void 0||ve.attribute!==he||he&&ve.data!==he.data)return!0;L++}return s.attributesNum!==L||s.index!==G}function g(T,O,k,G){let B={},H=O.attributes,L=0,ee=k.getAttributes();for(let Z in ee)if(ee[Z].location>=0){let ve=H[Z];ve===void 0&&(Z==="instanceMatrix"&&T.instanceMatrix&&(ve=T.instanceMatrix),Z==="instanceColor"&&T.instanceColor&&(ve=T.instanceColor));let he={};he.attribute=ve,ve&&ve.data&&(he.data=ve.data),B[Z]=he,L++}s.attributes=B,s.attributesNum=L,s.index=G}function _(){let T=s.newAttributes;for(let O=0,k=T.length;O<k;O++)T[O]=0}function m(T){p(T,0)}function p(T,O){let k=s.newAttributes,G=s.enabledAttributes,B=s.attributeDivisors;k[T]=1,G[T]===0&&(n.enableVertexAttribArray(T),G[T]=1),B[T]!==O&&(n.vertexAttribDivisor(T,O),B[T]=O)}function M(){let T=s.newAttributes,O=s.enabledAttributes;for(let k=0,G=O.length;k<G;k++)O[k]!==T[k]&&(n.disableVertexAttribArray(k),O[k]=0)}function w(T,O,k,G,B,H,L){L===!0?n.vertexAttribIPointer(T,O,k,B,H):n.vertexAttribPointer(T,O,k,G,B,H)}function b(T,O,k,G){_();let B=G.attributes,H=k.getAttributes(),L=O.defaultAttributeValues;for(let ee in H){let Z=H[ee];if(Z.location>=0){let de=B[ee];if(de===void 0&&(ee==="instanceMatrix"&&T.instanceMatrix&&(de=T.instanceMatrix),ee==="instanceColor"&&T.instanceColor&&(de=T.instanceColor)),de!==void 0){let ve=de.normalized,he=de.itemSize,$e=e.get(de);if($e===void 0)continue;let At=$e.buffer,Dt=$e.type,X=$e.bytesPerElement,ie=Dt===n.INT||Dt===n.UNSIGNED_INT||de.gpuType===yh;if(de.isInterleavedBufferAttribute){let oe=de.data,We=oe.stride,Ae=de.offset;if(oe.isInstancedInterleavedBuffer){for(let Fe=0;Fe<Z.locationSize;Fe++)p(Z.location+Fe,oe.meshPerAttribute);T.isInstancedMesh!==!0&&G._maxInstanceCount===void 0&&(G._maxInstanceCount=oe.meshPerAttribute*oe.count)}else for(let Fe=0;Fe<Z.locationSize;Fe++)m(Z.location+Fe);n.bindBuffer(n.ARRAY_BUFFER,At);for(let Fe=0;Fe<Z.locationSize;Fe++)w(Z.location+Fe,he/Z.locationSize,Dt,ve,We*X,(Ae+he/Z.locationSize*Fe)*X,ie)}else{if(de.isInstancedBufferAttribute){for(let oe=0;oe<Z.locationSize;oe++)p(Z.location+oe,de.meshPerAttribute);T.isInstancedMesh!==!0&&G._maxInstanceCount===void 0&&(G._maxInstanceCount=de.meshPerAttribute*de.count)}else for(let oe=0;oe<Z.locationSize;oe++)m(Z.location+oe);n.bindBuffer(n.ARRAY_BUFFER,At);for(let oe=0;oe<Z.locationSize;oe++)w(Z.location+oe,he/Z.locationSize,Dt,ve,he*X,he/Z.locationSize*oe*X,ie)}}else if(L!==void 0){let ve=L[ee];if(ve!==void 0)switch(ve.length){case 2:n.vertexAttrib2fv(Z.location,ve);break;case 3:n.vertexAttrib3fv(Z.location,ve);break;case 4:n.vertexAttrib4fv(Z.location,ve);break;default:n.vertexAttrib1fv(Z.location,ve)}}}}M()}function D(){S();for(let T in i){let O=i[T];for(let k in O){let G=O[k];for(let B in G){let H=G[B];for(let L in H)u(H[L].object),delete H[L];delete G[B]}}delete i[T]}}function C(T){if(i[T.id]===void 0)return;let O=i[T.id];for(let k in O){let G=O[k];for(let B in G){let H=G[B];for(let L in H)u(H[L].object),delete H[L];delete G[B]}}delete i[T.id]}function A(T){for(let O in i){let k=i[O];for(let G in k){let B=k[G];if(B[T.id]===void 0)continue;let H=B[T.id];for(let L in H)u(H[L].object),delete H[L];delete B[T.id]}}}function y(T){for(let O in i){let k=i[O],G=T.isInstancedMesh===!0?T.id:0,B=k[G];if(B!==void 0){for(let H in B){let L=B[H];for(let ee in L)u(L[ee].object),delete L[ee];delete B[H]}delete k[G],Object.keys(k).length===0&&delete i[O]}}}function S(){j(),o=!0,s!==r&&(s=r,l(s.object))}function j(){r.geometry=null,r.program=null,r.wireframe=!1}return{setup:a,reset:S,resetDefaultState:j,dispose:D,releaseStatesOfGeometry:C,releaseStatesOfObject:y,releaseStatesOfProgram:A,initAttributes:_,enableAttribute:m,disableUnusedAttributes:M}}function vL(n,e,t){let i;function r(l){i=l}function s(l,u){n.drawArrays(i,l,u),t.update(u,i,1)}function o(l,u,d){d!==0&&(n.drawArraysInstanced(i,l,u,d),t.update(u,i,d))}function a(l,u,d){if(d===0)return;e.get("WEBGL_multi_draw").multiDrawArraysWEBGL(i,l,0,u,0,d);let h=0;for(let g=0;g<d;g++)h+=u[g];t.update(h,i,1)}function c(l,u,d,f){if(d===0)return;let h=e.get("WEBGL_multi_draw");if(h===null)for(let g=0;g<l.length;g++)o(l[g],u[g],f[g]);else{h.multiDrawArraysInstancedWEBGL(i,l,0,u,0,f,0,d);let g=0;for(let _=0;_<d;_++)g+=u[_]*f[_];t.update(g,i,1)}}this.setMode=r,this.render=s,this.renderInstances=o,this.renderMultiDraw=a,this.renderMultiDrawInstances=c}function yL(n,e,t,i){let r;function s(){if(r!==void 0)return r;if(e.has("EXT_texture_filter_anisotropic")===!0){let A=e.get("EXT_texture_filter_anisotropic");r=n.getParameter(A.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else r=0;return r}function o(A){return!(A!==hi&&i.convert(A)!==n.getParameter(n.IMPLEMENTATION_COLOR_READ_FORMAT))}function a(A){let y=A===Zi&&(e.has("EXT_color_buffer_half_float")||e.has("EXT_color_buffer_float"));return!(A!==Vn&&i.convert(A)!==n.getParameter(n.IMPLEMENTATION_COLOR_READ_TYPE)&&A!==Oi&&!y)}function c(A){if(A==="highp"){if(n.getShaderPrecisionFormat(n.VERTEX_SHADER,n.HIGH_FLOAT).precision>0&&n.getShaderPrecisionFormat(n.FRAGMENT_SHADER,n.HIGH_FLOAT).precision>0)return"highp";A="mediump"}return A==="mediump"&&n.getShaderPrecisionFormat(n.VERTEX_SHADER,n.MEDIUM_FLOAT).precision>0&&n.getShaderPrecisionFormat(n.FRAGMENT_SHADER,n.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let l=t.precision!==void 0?t.precision:"highp",u=c(l);u!==l&&(Le("WebGLRenderer:",l,"not supported, using",u,"instead."),l=u);let d=t.logarithmicDepthBuffer===!0,f=t.reversedDepthBuffer===!0&&e.has("EXT_clip_control"),h=n.getParameter(n.MAX_TEXTURE_IMAGE_UNITS),g=n.getParameter(n.MAX_VERTEX_TEXTURE_IMAGE_UNITS),_=n.getParameter(n.MAX_TEXTURE_SIZE),m=n.getParameter(n.MAX_CUBE_MAP_TEXTURE_SIZE),p=n.getParameter(n.MAX_VERTEX_ATTRIBS),M=n.getParameter(n.MAX_VERTEX_UNIFORM_VECTORS),w=n.getParameter(n.MAX_VARYING_VECTORS),b=n.getParameter(n.MAX_FRAGMENT_UNIFORM_VECTORS),D=n.getParameter(n.MAX_SAMPLES),C=n.getParameter(n.SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:s,getMaxPrecision:c,textureFormatReadable:o,textureTypeReadable:a,precision:l,logarithmicDepthBuffer:d,reversedDepthBuffer:f,maxTextures:h,maxVertexTextures:g,maxTextureSize:_,maxCubemapSize:m,maxAttributes:p,maxVertexUniforms:M,maxVaryings:w,maxFragmentUniforms:b,maxSamples:D,samples:C}}function _L(n){let e=this,t=null,i=0,r=!1,s=!1,o=new Gi,a=new je,c={value:null,needsUpdate:!1};this.uniform=c,this.numPlanes=0,this.numIntersection=0,this.init=function(d,f){let h=d.length!==0||f||i!==0||r;return r=f,i=d.length,h},this.beginShadows=function(){s=!0,u(null)},this.endShadows=function(){s=!1},this.setGlobalState=function(d,f){t=u(d,f,0)},this.setState=function(d,f,h){let g=d.clippingPlanes,_=d.clipIntersection,m=d.clipShadows,p=n.get(d);if(!r||g===null||g.length===0||s&&!m)s?u(null):l();else{let M=s?0:i,w=M*4,b=p.clippingState||null;c.value=b,b=u(g,f,w,h);for(let D=0;D!==w;++D)b[D]=t[D];p.clippingState=b,this.numIntersection=_?this.numPlanes:0,this.numPlanes+=M}};function l(){c.value!==t&&(c.value=t,c.needsUpdate=i>0),e.numPlanes=i,e.numIntersection=0}function u(d,f,h,g){let _=d!==null?d.length:0,m=null;if(_!==0){if(m=c.value,g!==!0||m===null){let p=h+_*4,M=f.matrixWorldInverse;a.getNormalMatrix(M),(m===null||m.length<p)&&(m=new Float32Array(p));for(let w=0,b=h;w!==_;++w,b+=4)o.copy(d[w]).applyMatrix4(M,a),o.normal.toArray(m,b),m[b+3]=o.constant}c.value=m,c.needsUpdate=!0}return e.numPlanes=_,e.numIntersection=0,m}}var ps=4,OE=[.125,.215,.35,.446,.526,.582],fo=20,xL=256,Tl=new Da,LE=new ot,n_=null,i_=0,r_=0,s_=!1,ML=new F,op=class{constructor(e){this._renderer=e,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._sizeLods=[],this._sigmas=[],this._lodMeshes=[],this._backgroundBox=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._blurMaterial=null,this._ggxMaterial=null}fromScene(e,t=0,i=.1,r=100,s={}){let{size:o=256,position:a=ML}=s;n_=this._renderer.getRenderTarget(),i_=this._renderer.getActiveCubeFace(),r_=this._renderer.getActiveMipmapLevel(),s_=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(o);let c=this._allocateTargets();return c.depthBuffer=!0,this._sceneToCubeUV(e,i,r,c,a),t>0&&this._blur(c,0,0,t),this._applyPMREM(c),this._cleanup(c),c}fromEquirectangular(e,t=null){return this._fromTexture(e,t)}fromCubemap(e,t=null){return this._fromTexture(e,t)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=UE(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=kE(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose(),this._backgroundBox!==null&&(this._backgroundBox.geometry.dispose(),this._backgroundBox.material.dispose())}_setSize(e){this._lodMax=Math.floor(Math.log2(e)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._ggxMaterial!==null&&this._ggxMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let e=0;e<this._lodMeshes.length;e++)this._lodMeshes[e].geometry.dispose()}_cleanup(e){this._renderer.setRenderTarget(n_,i_,r_),this._renderer.xr.enabled=s_,e.scissorTest=!1,Pa(e,0,0,e.width,e.height)}_fromTexture(e,t){e.mapping===ds||e.mapping===oo?this._setSize(e.image.length===0?16:e.image[0].width||e.image[0].image.width):this._setSize(e.image.width/4),n_=this._renderer.getRenderTarget(),i_=this._renderer.getActiveCubeFace(),r_=this._renderer.getActiveMipmapLevel(),s_=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;let i=t||this._allocateTargets();return this._textureToCubeUV(e,i),this._applyPMREM(i),this._cleanup(i),i}_allocateTargets(){let e=3*Math.max(this._cubeSize,112),t=4*this._cubeSize,i={magFilter:fn,minFilter:fn,generateMipmaps:!1,type:Zi,format:hi,colorSpace:so,depthBuffer:!1},r=FE(e,t,i);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==e||this._pingPongRenderTarget.height!==t){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=FE(e,t,i);let{_lodMax:s}=this;({lodMeshes:this._lodMeshes,sizeLods:this._sizeLods,sigmas:this._sigmas}=SL(s)),this._blurMaterial=EL(s,e,t),this._ggxMaterial=bL(s,e,t)}return r}_compileMaterial(e){let t=new on(new Kn,e);this._renderer.compile(t,Tl)}_sceneToCubeUV(e,t,i,r,s){let c=new Mn(90,1,t,i),l=[1,-1,1,1,1,1],u=[1,1,1,-1,-1,-1],d=this._renderer,f=d.autoClear,h=d.toneMapping;d.getClearColor(LE),d.toneMapping=Ni,d.autoClear=!1,d.state.buffers.depth.getReversed()&&(d.setRenderTarget(r),d.clearDepth(),d.setRenderTarget(null)),this._backgroundBox===null&&(this._backgroundBox=new on(new wa,new qi({name:"PMREM.Background",side:Nn,depthWrite:!1,depthTest:!1})));let _=this._backgroundBox,m=_.material,p=!1,M=e.background;M?M.isColor&&(m.color.copy(M),e.background=null,p=!0):(m.color.copy(LE),p=!0);for(let w=0;w<6;w++){let b=w%3;b===0?(c.up.set(0,l[w],0),c.position.set(s.x,s.y,s.z),c.lookAt(s.x+u[w],s.y,s.z)):b===1?(c.up.set(0,0,l[w]),c.position.set(s.x,s.y,s.z),c.lookAt(s.x,s.y+u[w],s.z)):(c.up.set(0,l[w],0),c.position.set(s.x,s.y,s.z),c.lookAt(s.x,s.y,s.z+u[w]));let D=this._cubeSize;Pa(r,b*D,w>2?D:0,D,D),d.setRenderTarget(r),p&&d.render(_,c),d.render(e,c)}d.toneMapping=h,d.autoClear=f,e.background=M}_textureToCubeUV(e,t){let i=this._renderer,r=e.mapping===ds||e.mapping===oo;r?(this._cubemapMaterial===null&&(this._cubemapMaterial=UE()),this._cubemapMaterial.uniforms.flipEnvMap.value=e.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=kE());let s=r?this._cubemapMaterial:this._equirectMaterial,o=this._lodMeshes[0];o.material=s;let a=s.uniforms;a.envMap.value=e;let c=this._cubeSize;Pa(t,0,0,3*c,2*c),i.setRenderTarget(t),i.render(o,Tl)}_applyPMREM(e){let t=this._renderer,i=t.autoClear;t.autoClear=!1;let r=this._lodMeshes.length;for(let s=1;s<r;s++)this._applyGGXFilter(e,s-1,s);t.autoClear=i}_applyGGXFilter(e,t,i){let r=this._renderer,s=this._pingPongRenderTarget,o=this._ggxMaterial,a=this._lodMeshes[i];a.material=o;let c=o.uniforms,l=i/(this._lodMeshes.length-1),u=t/(this._lodMeshes.length-1),d=Math.sqrt(l*l-u*u),f=0+l*1.25,h=d*f,{_lodMax:g}=this,_=this._sizeLods[i],m=3*_*(i>g-ps?i-g+ps:0),p=4*(this._cubeSize-_);c.envMap.value=e.texture,c.roughness.value=h,c.mipInt.value=g-t,Pa(s,m,p,3*_,2*_),r.setRenderTarget(s),r.render(a,Tl),c.envMap.value=s.texture,c.roughness.value=0,c.mipInt.value=g-i,Pa(e,m,p,3*_,2*_),r.setRenderTarget(e),r.render(a,Tl)}_blur(e,t,i,r,s){let o=this._pingPongRenderTarget;this._halfBlur(e,o,t,i,r,"latitudinal",s),this._halfBlur(o,e,i,i,r,"longitudinal",s)}_halfBlur(e,t,i,r,s,o,a){let c=this._renderer,l=this._blurMaterial;o!=="latitudinal"&&o!=="longitudinal"&&Ne("blur direction must be either latitudinal or longitudinal!");let u=3,d=this._lodMeshes[r];d.material=l;let f=l.uniforms,h=this._sizeLods[i]-1,g=isFinite(s)?Math.PI/(2*h):2*Math.PI/(2*fo-1),_=s/g,m=isFinite(s)?1+Math.floor(u*_):fo;m>fo&&Le(`sigmaRadians, ${s}, is too large and will clip, as it requested ${m} samples when the maximum is set to ${fo}`);let p=[],M=0;for(let A=0;A<fo;++A){let y=A/_,S=Math.exp(-y*y/2);p.push(S),A===0?M+=S:A<m&&(M+=2*S)}for(let A=0;A<p.length;A++)p[A]=p[A]/M;f.envMap.value=e.texture,f.samples.value=m,f.weights.value=p,f.latitudinal.value=o==="latitudinal",a&&(f.poleAxis.value=a);let{_lodMax:w}=this;f.dTheta.value=g,f.mipInt.value=w-i;let b=this._sizeLods[r],D=3*b*(r>w-ps?r-w+ps:0),C=4*(this._cubeSize-b);Pa(t,D,C,3*b,2*b),c.setRenderTarget(t),c.render(d,Tl)}};function SL(n){let e=[],t=[],i=[],r=n,s=n-ps+1+OE.length;for(let o=0;o<s;o++){let a=Math.pow(2,r);e.push(a);let c=1/a;o>n-ps?c=OE[o-n+ps-1]:o===0&&(c=0),t.push(c);let l=1/(a-2),u=-l,d=1+l,f=[u,u,d,u,d,d,u,u,d,d,u,d],h=6,g=6,_=3,m=2,p=1,M=new Float32Array(_*g*h),w=new Float32Array(m*g*h),b=new Float32Array(p*g*h);for(let C=0;C<h;C++){let A=C%3*2/3-1,y=C>2?0:-1,S=[A,y,0,A+2/3,y,0,A+2/3,y+1,0,A,y,0,A+2/3,y+1,0,A,y+1,0];M.set(S,_*g*C),w.set(f,m*g*C);let j=[C,C,C,C,C,C];b.set(j,p*g*C)}let D=new Kn;D.setAttribute("position",new Zn(M,_)),D.setAttribute("uv",new Zn(w,m)),D.setAttribute("faceIndex",new Zn(b,p)),i.push(new on(D,null)),r>ps&&r--}return{lodMeshes:i,sizeLods:e,sigmas:t}}function FE(n,e,t){let i=new Jn(n,e,t);return i.texture.mapping=xl,i.texture.name="PMREM.cubeUv",i.scissorTest=!0,i}function Pa(n,e,t,i,r){n.viewport.set(e,t,i,r),n.scissor.set(e,t,i,r)}function bL(n,e,t){return new Qn({name:"PMREMGGXConvolution",defines:{GGX_SAMPLES:xL,CUBEUV_TEXEL_WIDTH:1/e,CUBEUV_TEXEL_HEIGHT:1/t,CUBEUV_MAX_MIP:`${n}.0`},uniforms:{envMap:{value:null},roughness:{value:0},mipInt:{value:0}},vertexShader:lp(),fragmentShader:`

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
		`,blending:Yi,depthTest:!1,depthWrite:!1})}function EL(n,e,t){let i=new Float32Array(fo),r=new F(0,1,0);return new Qn({name:"SphericalGaussianBlur",defines:{n:fo,CUBEUV_TEXEL_WIDTH:1/e,CUBEUV_TEXEL_HEIGHT:1/t,CUBEUV_MAX_MIP:`${n}.0`},uniforms:{envMap:{value:null},samples:{value:1},weights:{value:i},latitudinal:{value:!1},dTheta:{value:0},mipInt:{value:0},poleAxis:{value:r}},vertexShader:lp(),fragmentShader:`

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
		`,blending:Yi,depthTest:!1,depthWrite:!1})}function kE(){return new Qn({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:lp(),fragmentShader:`

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
		`,blending:Yi,depthTest:!1,depthWrite:!1})}function UE(){return new Qn({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:lp(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:Yi,depthTest:!1,depthWrite:!1})}function lp(){return`

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
	`}var ap=class extends Jn{constructor(e=1,t={}){super(e,e,t),this.isWebGLCubeRenderTarget=!0;let i={width:e,height:e,depth:1},r=[i,i,i,i,i,i];this.texture=new ll(r),this._setTextureOptions(t),this.texture.isRenderTargetTexture=!0}fromEquirectangularTexture(e,t){this.texture.type=t.type,this.texture.colorSpace=t.colorSpace,this.texture.generateMipmaps=t.generateMipmaps,this.texture.minFilter=t.minFilter,this.texture.magFilter=t.magFilter;let i={uniforms:{tEquirect:{value:null}},vertexShader:`

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
			`},r=new wa(5,5,5),s=new Qn({name:"CubemapFromEquirect",uniforms:co(i.uniforms),vertexShader:i.vertexShader,fragmentShader:i.fragmentShader,side:Nn,blending:Yi});s.uniforms.tEquirect.value=t;let o=new on(r,s),a=t.minFilter;return t.minFilter===fs&&(t.minFilter=fn),new hh(1,10,this).update(e,o),t.minFilter=a,o.geometry.dispose(),o.material.dispose(),this}clear(e,t=!0,i=!0,r=!0){let s=e.getRenderTarget();for(let o=0;o<6;o++)e.setRenderTarget(this,o),e.clear(t,i,r);e.setRenderTarget(s)}};function wL(n){let e=new WeakMap,t=new WeakMap,i=null;function r(f,h=!1){return f==null?null:h?o(f):s(f)}function s(f){if(f&&f.isTexture){let h=f.mapping;if(h===mh||h===gh)if(e.has(f)){let g=e.get(f).texture;return a(g,f.mapping)}else{let g=f.image;if(g&&g.height>0){let _=new ap(g.height);return _.fromEquirectangularTexture(n,f),e.set(f,_),f.addEventListener("dispose",l),a(_.texture,f.mapping)}else return null}}return f}function o(f){if(f&&f.isTexture){let h=f.mapping,g=h===mh||h===gh,_=h===ds||h===oo;if(g||_){let m=t.get(f),p=m!==void 0?m.texture.pmremVersion:0;if(f.isRenderTargetTexture&&f.pmremVersion!==p)return i===null&&(i=new op(n)),m=g?i.fromEquirectangular(f,m):i.fromCubemap(f,m),m.texture.pmremVersion=f.pmremVersion,t.set(f,m),m.texture;if(m!==void 0)return m.texture;{let M=f.image;return g&&M&&M.height>0||_&&M&&c(M)?(i===null&&(i=new op(n)),m=g?i.fromEquirectangular(f):i.fromCubemap(f),m.texture.pmremVersion=f.pmremVersion,t.set(f,m),f.addEventListener("dispose",u),m.texture):null}}}return f}function a(f,h){return h===mh?f.mapping=ds:h===gh&&(f.mapping=oo),f}function c(f){let h=0,g=6;for(let _=0;_<g;_++)f[_]!==void 0&&h++;return h===g}function l(f){let h=f.target;h.removeEventListener("dispose",l);let g=e.get(h);g!==void 0&&(e.delete(h),g.dispose())}function u(f){let h=f.target;h.removeEventListener("dispose",u);let g=t.get(h);g!==void 0&&(t.delete(h),g.dispose())}function d(){e=new WeakMap,t=new WeakMap,i!==null&&(i.dispose(),i=null)}return{get:r,dispose:d}}function CL(n){let e={};function t(i){if(e[i]!==void 0)return e[i];let r=n.getExtension(i);return e[i]=r,r}return{has:function(i){return t(i)!==null},init:function(){t("EXT_color_buffer_float"),t("WEBGL_clip_cull_distance"),t("OES_texture_float_linear"),t("EXT_color_buffer_half_float"),t("WEBGL_multisampled_render_to_texture"),t("WEBGL_render_shared_exponent")},get:function(i){let r=t(i);return r===null&&il("WebGLRenderer: "+i+" extension not supported."),r}}}function TL(n,e,t,i){let r={},s=new WeakMap;function o(d){let f=d.target;f.index!==null&&e.remove(f.index);for(let g in f.attributes)e.remove(f.attributes[g]);f.removeEventListener("dispose",o),delete r[f.id];let h=s.get(f);h&&(e.remove(h),s.delete(f)),i.releaseStatesOfGeometry(f),f.isInstancedBufferGeometry===!0&&delete f._maxInstanceCount,t.memory.geometries--}function a(d,f){return r[f.id]===!0||(f.addEventListener("dispose",o),r[f.id]=!0,t.memory.geometries++),f}function c(d){let f=d.attributes;for(let h in f)e.update(f[h],n.ARRAY_BUFFER)}function l(d){let f=[],h=d.index,g=d.attributes.position,_=0;if(g===void 0)return;if(h!==null){let M=h.array;_=h.version;for(let w=0,b=M.length;w<b;w+=3){let D=M[w+0],C=M[w+1],A=M[w+2];f.push(D,C,C,A,A,D)}}else{let M=g.array;_=g.version;for(let w=0,b=M.length/3-1;w<b;w+=3){let D=w+0,C=w+1,A=w+2;f.push(D,C,C,A,A,D)}}let m=new(g.count>=65535?al:ol)(f,1);m.version=_;let p=s.get(d);p&&e.remove(p),s.set(d,m)}function u(d){let f=s.get(d);if(f){let h=d.index;h!==null&&f.version<h.version&&l(d)}else l(d);return s.get(d)}return{get:a,update:c,getWireframeAttribute:u}}function DL(n,e,t){let i;function r(f){i=f}let s,o;function a(f){s=f.type,o=f.bytesPerElement}function c(f,h){n.drawElements(i,h,s,f*o),t.update(h,i,1)}function l(f,h,g){g!==0&&(n.drawElementsInstanced(i,h,s,f*o,g),t.update(h,i,g))}function u(f,h,g){if(g===0)return;e.get("WEBGL_multi_draw").multiDrawElementsWEBGL(i,h,0,s,f,0,g);let m=0;for(let p=0;p<g;p++)m+=h[p];t.update(m,i,1)}function d(f,h,g,_){if(g===0)return;let m=e.get("WEBGL_multi_draw");if(m===null)for(let p=0;p<f.length;p++)l(f[p]/o,h[p],_[p]);else{m.multiDrawElementsInstancedWEBGL(i,h,0,s,f,0,_,0,g);let p=0;for(let M=0;M<g;M++)p+=h[M]*_[M];t.update(p,i,1)}}this.setMode=r,this.setIndex=a,this.render=c,this.renderInstances=l,this.renderMultiDraw=u,this.renderMultiDrawInstances=d}function IL(n){let e={geometries:0,textures:0},t={frame:0,calls:0,triangles:0,points:0,lines:0};function i(s,o,a){switch(t.calls++,o){case n.TRIANGLES:t.triangles+=a*(s/3);break;case n.LINES:t.lines+=a*(s/2);break;case n.LINE_STRIP:t.lines+=a*(s-1);break;case n.LINE_LOOP:t.lines+=a*s;break;case n.POINTS:t.points+=a*s;break;default:Ne("WebGLInfo: Unknown draw mode:",o);break}}function r(){t.calls=0,t.triangles=0,t.points=0,t.lines=0}return{memory:e,render:t,programs:null,autoReset:!0,reset:r,update:i}}function AL(n,e,t){let i=new WeakMap,r=new Pt;function s(o,a,c){let l=o.morphTargetInfluences,u=a.morphAttributes.position||a.morphAttributes.normal||a.morphAttributes.color,d=u!==void 0?u.length:0,f=i.get(a);if(f===void 0||f.count!==d){let j=function(){y.dispose(),i.delete(a),a.removeEventListener("dispose",j)};var h=j;f!==void 0&&f.texture.dispose();let g=a.morphAttributes.position!==void 0,_=a.morphAttributes.normal!==void 0,m=a.morphAttributes.color!==void 0,p=a.morphAttributes.position||[],M=a.morphAttributes.normal||[],w=a.morphAttributes.color||[],b=0;g===!0&&(b=1),_===!0&&(b=2),m===!0&&(b=3);let D=a.attributes.position.count*b,C=1;D>e.maxTextureSize&&(C=Math.ceil(D/e.maxTextureSize),D=e.maxTextureSize);let A=new Float32Array(D*C*4*d),y=new rl(A,D,C,d);y.type=Oi,y.needsUpdate=!0;let S=b*4;for(let T=0;T<d;T++){let O=p[T],k=M[T],G=w[T],B=D*C*4*T;for(let H=0;H<O.count;H++){let L=H*S;g===!0&&(r.fromBufferAttribute(O,H),A[B+L+0]=r.x,A[B+L+1]=r.y,A[B+L+2]=r.z,A[B+L+3]=0),_===!0&&(r.fromBufferAttribute(k,H),A[B+L+4]=r.x,A[B+L+5]=r.y,A[B+L+6]=r.z,A[B+L+7]=0),m===!0&&(r.fromBufferAttribute(G,H),A[B+L+8]=r.x,A[B+L+9]=r.y,A[B+L+10]=r.z,A[B+L+11]=G.itemSize===4?r.w:1)}}f={count:d,texture:y,size:new it(D,C)},i.set(a,f),a.addEventListener("dispose",j)}if(o.isInstancedMesh===!0&&o.morphTexture!==null)c.getUniforms().setValue(n,"morphTexture",o.morphTexture,t);else{let g=0;for(let m=0;m<l.length;m++)g+=l[m];let _=a.morphTargetsRelative?1:1-g;c.getUniforms().setValue(n,"morphTargetBaseInfluence",_),c.getUniforms().setValue(n,"morphTargetInfluences",l)}c.getUniforms().setValue(n,"morphTargetsTexture",f.texture,t),c.getUniforms().setValue(n,"morphTargetsTextureSize",f.size)}return{update:s}}function RL(n,e,t,i,r){let s=new WeakMap;function o(l){let u=r.render.frame,d=l.geometry,f=e.get(l,d);if(s.get(f)!==u&&(e.update(f),s.set(f,u)),l.isInstancedMesh&&(l.hasEventListener("dispose",c)===!1&&l.addEventListener("dispose",c),s.get(l)!==u&&(t.update(l.instanceMatrix,n.ARRAY_BUFFER),l.instanceColor!==null&&t.update(l.instanceColor,n.ARRAY_BUFFER),s.set(l,u))),l.isSkinnedMesh){let h=l.skeleton;s.get(h)!==u&&(h.update(),s.set(h,u))}return f}function a(){s=new WeakMap}function c(l){let u=l.target;u.removeEventListener("dispose",c),i.releaseStatesOfObject(u),t.remove(u.instanceMatrix),u.instanceColor!==null&&t.remove(u.instanceColor)}return{update:o,dispose:a}}var NL={[Ly]:"LINEAR_TONE_MAPPING",[Fy]:"REINHARD_TONE_MAPPING",[ky]:"CINEON_TONE_MAPPING",[Uy]:"ACES_FILMIC_TONE_MAPPING",[Vy]:"AGX_TONE_MAPPING",[Hy]:"NEUTRAL_TONE_MAPPING",[By]:"CUSTOM_TONE_MAPPING"};function PL(n,e,t,i,r){let s=new Jn(e,t,{type:n,depthBuffer:i,stencilBuffer:r}),o=new Jn(e,t,{type:Zi,depthBuffer:!1,stencilBuffer:!1}),a=new Kn;a.setAttribute("position",new Ht([-1,3,0,-1,-1,0,3,-1,0],3)),a.setAttribute("uv",new Ht([0,2,0,0,2,0],2));let c=new nh({uniforms:{tDiffuse:{value:null}},vertexShader:`
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
			}`,depthTest:!1,depthWrite:!1}),l=new on(a,c),u=new Da(-1,1,1,-1,0,1),d=null,f=null,h=!1,g,_=null,m=[],p=!1;this.setSize=function(M,w){s.setSize(M,w),o.setSize(M,w);for(let b=0;b<m.length;b++){let D=m[b];D.setSize&&D.setSize(M,w)}},this.setEffects=function(M){m=M,p=m.length>0&&m[0].isRenderPass===!0;let w=s.width,b=s.height;for(let D=0;D<m.length;D++){let C=m[D];C.setSize&&C.setSize(w,b)}},this.begin=function(M,w){if(h||M.toneMapping===Ni&&m.length===0)return!1;if(_=w,w!==null){let b=w.width,D=w.height;(s.width!==b||s.height!==D)&&this.setSize(b,D)}return p===!1&&M.setRenderTarget(s),g=M.toneMapping,M.toneMapping=Ni,!0},this.hasRenderPass=function(){return p},this.end=function(M,w){M.toneMapping=g,h=!0;let b=s,D=o;for(let C=0;C<m.length;C++){let A=m[C];if(A.enabled!==!1&&(A.render(M,D,b,w),A.needsSwap!==!1)){let y=b;b=D,D=y}}if(d!==M.outputColorSpace||f!==M.toneMapping){d=M.outputColorSpace,f=M.toneMapping,c.defines={},st.getTransfer(d)===gt&&(c.defines.SRGB_TRANSFER="");let C=NL[f];C&&(c.defines[C]=""),c.needsUpdate=!0}c.uniforms.tDiffuse.value=b.texture,M.setRenderTarget(_),M.render(l,u),_=null,h=!1},this.isCompositing=function(){return h},this.dispose=function(){s.dispose(),o.dispose(),a.dispose(),c.dispose()}}var iw=new Ir,c_=new as(1,1),rw=new rl,sw=new Kf,ow=new ll,BE=[],VE=[],HE=new Float32Array(16),zE=new Float32Array(9),GE=new Float32Array(4);function La(n,e,t){let i=n[0];if(i<=0||i>0)return n;let r=e*t,s=BE[r];if(s===void 0&&(s=new Float32Array(r),BE[r]=s),e!==0){i.toArray(s,0);for(let o=1,a=0;o!==e;++o)a+=t,n[o].toArray(s,a)}return s}function Xt(n,e){if(n.length!==e.length)return!1;for(let t=0,i=n.length;t<i;t++)if(n[t]!==e[t])return!1;return!0}function Yt(n,e){for(let t=0,i=e.length;t<i;t++)n[t]=e[t]}function up(n,e){let t=VE[e];t===void 0&&(t=new Int32Array(e),VE[e]=t);for(let i=0;i!==e;++i)t[i]=n.allocateTextureUnit();return t}function OL(n,e){let t=this.cache;t[0]!==e&&(n.uniform1f(this.addr,e),t[0]=e)}function LL(n,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(n.uniform2f(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(Xt(t,e))return;n.uniform2fv(this.addr,e),Yt(t,e)}}function FL(n,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(n.uniform3f(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else if(e.r!==void 0)(t[0]!==e.r||t[1]!==e.g||t[2]!==e.b)&&(n.uniform3f(this.addr,e.r,e.g,e.b),t[0]=e.r,t[1]=e.g,t[2]=e.b);else{if(Xt(t,e))return;n.uniform3fv(this.addr,e),Yt(t,e)}}function kL(n,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(n.uniform4f(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(Xt(t,e))return;n.uniform4fv(this.addr,e),Yt(t,e)}}function UL(n,e){let t=this.cache,i=e.elements;if(i===void 0){if(Xt(t,e))return;n.uniformMatrix2fv(this.addr,!1,e),Yt(t,e)}else{if(Xt(t,i))return;GE.set(i),n.uniformMatrix2fv(this.addr,!1,GE),Yt(t,i)}}function BL(n,e){let t=this.cache,i=e.elements;if(i===void 0){if(Xt(t,e))return;n.uniformMatrix3fv(this.addr,!1,e),Yt(t,e)}else{if(Xt(t,i))return;zE.set(i),n.uniformMatrix3fv(this.addr,!1,zE),Yt(t,i)}}function VL(n,e){let t=this.cache,i=e.elements;if(i===void 0){if(Xt(t,e))return;n.uniformMatrix4fv(this.addr,!1,e),Yt(t,e)}else{if(Xt(t,i))return;HE.set(i),n.uniformMatrix4fv(this.addr,!1,HE),Yt(t,i)}}function HL(n,e){let t=this.cache;t[0]!==e&&(n.uniform1i(this.addr,e),t[0]=e)}function zL(n,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(n.uniform2i(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(Xt(t,e))return;n.uniform2iv(this.addr,e),Yt(t,e)}}function GL(n,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(n.uniform3i(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(Xt(t,e))return;n.uniform3iv(this.addr,e),Yt(t,e)}}function jL(n,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(n.uniform4i(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(Xt(t,e))return;n.uniform4iv(this.addr,e),Yt(t,e)}}function WL(n,e){let t=this.cache;t[0]!==e&&(n.uniform1ui(this.addr,e),t[0]=e)}function $L(n,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(n.uniform2ui(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(Xt(t,e))return;n.uniform2uiv(this.addr,e),Yt(t,e)}}function qL(n,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(n.uniform3ui(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(Xt(t,e))return;n.uniform3uiv(this.addr,e),Yt(t,e)}}function XL(n,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(n.uniform4ui(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(Xt(t,e))return;n.uniform4uiv(this.addr,e),Yt(t,e)}}function YL(n,e,t){let i=this.cache,r=t.allocateTextureUnit();i[0]!==r&&(n.uniform1i(this.addr,r),i[0]=r);let s;this.type===n.SAMPLER_2D_SHADOW?(c_.compareFunction=t.isReversedDepthBuffer()?ip:np,s=c_):s=iw,t.setTexture2D(e||s,r)}function ZL(n,e,t){let i=this.cache,r=t.allocateTextureUnit();i[0]!==r&&(n.uniform1i(this.addr,r),i[0]=r),t.setTexture3D(e||sw,r)}function JL(n,e,t){let i=this.cache,r=t.allocateTextureUnit();i[0]!==r&&(n.uniform1i(this.addr,r),i[0]=r),t.setTextureCube(e||ow,r)}function KL(n,e,t){let i=this.cache,r=t.allocateTextureUnit();i[0]!==r&&(n.uniform1i(this.addr,r),i[0]=r),t.setTexture2DArray(e||rw,r)}function QL(n){switch(n){case 5126:return OL;case 35664:return LL;case 35665:return FL;case 35666:return kL;case 35674:return UL;case 35675:return BL;case 35676:return VL;case 5124:case 35670:return HL;case 35667:case 35671:return zL;case 35668:case 35672:return GL;case 35669:case 35673:return jL;case 5125:return WL;case 36294:return $L;case 36295:return qL;case 36296:return XL;case 35678:case 36198:case 36298:case 36306:case 35682:return YL;case 35679:case 36299:case 36307:return ZL;case 35680:case 36300:case 36308:case 36293:return JL;case 36289:case 36303:case 36311:case 36292:return KL}}function eF(n,e){n.uniform1fv(this.addr,e)}function tF(n,e){let t=La(e,this.size,2);n.uniform2fv(this.addr,t)}function nF(n,e){let t=La(e,this.size,3);n.uniform3fv(this.addr,t)}function iF(n,e){let t=La(e,this.size,4);n.uniform4fv(this.addr,t)}function rF(n,e){let t=La(e,this.size,4);n.uniformMatrix2fv(this.addr,!1,t)}function sF(n,e){let t=La(e,this.size,9);n.uniformMatrix3fv(this.addr,!1,t)}function oF(n,e){let t=La(e,this.size,16);n.uniformMatrix4fv(this.addr,!1,t)}function aF(n,e){n.uniform1iv(this.addr,e)}function cF(n,e){n.uniform2iv(this.addr,e)}function lF(n,e){n.uniform3iv(this.addr,e)}function uF(n,e){n.uniform4iv(this.addr,e)}function dF(n,e){n.uniform1uiv(this.addr,e)}function fF(n,e){n.uniform2uiv(this.addr,e)}function hF(n,e){n.uniform3uiv(this.addr,e)}function pF(n,e){n.uniform4uiv(this.addr,e)}function mF(n,e,t){let i=this.cache,r=e.length,s=up(t,r);Xt(i,s)||(n.uniform1iv(this.addr,s),Yt(i,s));let o;this.type===n.SAMPLER_2D_SHADOW?o=c_:o=iw;for(let a=0;a!==r;++a)t.setTexture2D(e[a]||o,s[a])}function gF(n,e,t){let i=this.cache,r=e.length,s=up(t,r);Xt(i,s)||(n.uniform1iv(this.addr,s),Yt(i,s));for(let o=0;o!==r;++o)t.setTexture3D(e[o]||sw,s[o])}function vF(n,e,t){let i=this.cache,r=e.length,s=up(t,r);Xt(i,s)||(n.uniform1iv(this.addr,s),Yt(i,s));for(let o=0;o!==r;++o)t.setTextureCube(e[o]||ow,s[o])}function yF(n,e,t){let i=this.cache,r=e.length,s=up(t,r);Xt(i,s)||(n.uniform1iv(this.addr,s),Yt(i,s));for(let o=0;o!==r;++o)t.setTexture2DArray(e[o]||rw,s[o])}function _F(n){switch(n){case 5126:return eF;case 35664:return tF;case 35665:return nF;case 35666:return iF;case 35674:return rF;case 35675:return sF;case 35676:return oF;case 5124:case 35670:return aF;case 35667:case 35671:return cF;case 35668:case 35672:return lF;case 35669:case 35673:return uF;case 5125:return dF;case 36294:return fF;case 36295:return hF;case 36296:return pF;case 35678:case 36198:case 36298:case 36306:case 35682:return mF;case 35679:case 36299:case 36307:return gF;case 35680:case 36300:case 36308:case 36293:return vF;case 36289:case 36303:case 36311:case 36292:return yF}}var l_=class{constructor(e,t,i){this.id=e,this.addr=i,this.cache=[],this.type=t.type,this.setValue=QL(t.type)}},u_=class{constructor(e,t,i){this.id=e,this.addr=i,this.cache=[],this.type=t.type,this.size=t.size,this.setValue=_F(t.type)}},d_=class{constructor(e){this.id=e,this.seq=[],this.map={}}setValue(e,t,i){let r=this.seq;for(let s=0,o=r.length;s!==o;++s){let a=r[s];a.setValue(e,t[a.id],i)}}},o_=/(\w+)(\])?(\[|\.)?/g;function jE(n,e){n.seq.push(e),n.map[e.id]=e}function xF(n,e,t){let i=n.name,r=i.length;for(o_.lastIndex=0;;){let s=o_.exec(i),o=o_.lastIndex,a=s[1],c=s[2]==="]",l=s[3];if(c&&(a=a|0),l===void 0||l==="["&&o+2===r){jE(t,l===void 0?new l_(a,n,e):new u_(a,n,e));break}else{let d=t.map[a];d===void 0&&(d=new d_(a),jE(t,d)),t=d}}}var Oa=class{constructor(e,t){this.seq=[],this.map={};let i=e.getProgramParameter(t,e.ACTIVE_UNIFORMS);for(let o=0;o<i;++o){let a=e.getActiveUniform(t,o),c=e.getUniformLocation(t,a.name);xF(a,c,this)}let r=[],s=[];for(let o of this.seq)o.type===e.SAMPLER_2D_SHADOW||o.type===e.SAMPLER_CUBE_SHADOW||o.type===e.SAMPLER_2D_ARRAY_SHADOW?r.push(o):s.push(o);r.length>0&&(this.seq=r.concat(s))}setValue(e,t,i,r){let s=this.map[t];s!==void 0&&s.setValue(e,i,r)}setOptional(e,t,i){let r=t[i];r!==void 0&&this.setValue(e,i,r)}static upload(e,t,i,r){for(let s=0,o=t.length;s!==o;++s){let a=t[s],c=i[a.id];c.needsUpdate!==!1&&a.setValue(e,c.value,r)}}static seqWithValue(e,t){let i=[];for(let r=0,s=e.length;r!==s;++r){let o=e[r];o.id in t&&i.push(o)}return i}};function WE(n,e,t){let i=n.createShader(e);return n.shaderSource(i,t),n.compileShader(i),i}var MF=37297,SF=0;function bF(n,e){let t=n.split(`
`),i=[],r=Math.max(e-6,0),s=Math.min(e+6,t.length);for(let o=r;o<s;o++){let a=o+1;i.push(`${a===e?">":" "} ${a}: ${t[o]}`)}return i.join(`
`)}var $E=new je;function EF(n){st._getMatrix($E,st.workingColorSpace,n);let e=`mat3( ${$E.elements.map(t=>t.toFixed(4))} )`;switch(st.getTransfer(n)){case tl:return[e,"LinearTransferOETF"];case gt:return[e,"sRGBTransferOETF"];default:return Le("WebGLProgram: Unsupported color space: ",n),[e,"LinearTransferOETF"]}}function qE(n,e,t){let i=n.getShaderParameter(e,n.COMPILE_STATUS),s=(n.getShaderInfoLog(e)||"").trim();if(i&&s==="")return"";let o=/ERROR: 0:(\d+)/.exec(s);if(o){let a=parseInt(o[1]);return t.toUpperCase()+`

`+s+`

`+bF(n.getShaderSource(e),a)}else return s}function wF(n,e){let t=EF(e);return[`vec4 ${n}( vec4 value ) {`,`	return ${t[1]}( vec4( value.rgb * ${t[0]}, value.a ) );`,"}"].join(`
`)}var CF={[Ly]:"Linear",[Fy]:"Reinhard",[ky]:"Cineon",[Uy]:"ACESFilmic",[Vy]:"AgX",[Hy]:"Neutral",[By]:"Custom"};function TF(n,e){let t=CF[e];return t===void 0?(Le("WebGLProgram: Unsupported toneMapping:",e),"vec3 "+n+"( vec3 color ) { return LinearToneMapping( color ); }"):"vec3 "+n+"( vec3 color ) { return "+t+"ToneMapping( color ); }"}var sp=new F;function DF(){st.getLuminanceCoefficients(sp);let n=sp.x.toFixed(4),e=sp.y.toFixed(4),t=sp.z.toFixed(4);return["float luminance( const in vec3 rgb ) {",`	const vec3 weights = vec3( ${n}, ${e}, ${t} );`,"	return dot( weights, rgb );","}"].join(`
`)}function IF(n){return[n.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",n.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(Il).join(`
`)}function AF(n){let e=[];for(let t in n){let i=n[t];i!==!1&&e.push("#define "+t+" "+i)}return e.join(`
`)}function RF(n,e){let t={},i=n.getProgramParameter(e,n.ACTIVE_ATTRIBUTES);for(let r=0;r<i;r++){let s=n.getActiveAttrib(e,r),o=s.name,a=1;s.type===n.FLOAT_MAT2&&(a=2),s.type===n.FLOAT_MAT3&&(a=3),s.type===n.FLOAT_MAT4&&(a=4),t[o]={type:s.type,location:n.getAttribLocation(e,o),locationSize:a}}return t}function Il(n){return n!==""}function XE(n,e){let t=e.numSpotLightShadows+e.numSpotLightMaps-e.numSpotLightShadowsWithMaps;return n.replace(/NUM_DIR_LIGHTS/g,e.numDirLights).replace(/NUM_SPOT_LIGHTS/g,e.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,e.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,t).replace(/NUM_RECT_AREA_LIGHTS/g,e.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,e.numPointLights).replace(/NUM_HEMI_LIGHTS/g,e.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g,e.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,e.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,e.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,e.numPointLightShadows)}function YE(n,e){return n.replace(/NUM_CLIPPING_PLANES/g,e.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,e.numClippingPlanes-e.numClipIntersection)}var NF=/^[ \t]*#include +<([\w\d./]+)>/gm;function f_(n){return n.replace(NF,OF)}var PF=new Map;function OF(n,e){let t=qe[e];if(t===void 0){let i=PF.get(e);if(i!==void 0)t=qe[i],Le('WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',e,i);else throw new Error("Can not resolve #include <"+e+">")}return f_(t)}var LF=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function ZE(n){return n.replace(LF,FF)}function FF(n,e,t,i){let r="";for(let s=parseInt(e);s<parseInt(t);s++)r+=i.replace(/\[\s*i\s*\]/g,"[ "+s+" ]").replace(/UNROLLED_LOOP_INDEX/g,s);return r}function JE(n){let e=`precision ${n.precision} float;
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
#define LOW_PRECISION`),e}var kF={[_l]:"SHADOWMAP_TYPE_PCF",[Aa]:"SHADOWMAP_TYPE_VSM"};function UF(n){return kF[n.shadowMapType]||"SHADOWMAP_TYPE_BASIC"}var BF={[ds]:"ENVMAP_TYPE_CUBE",[oo]:"ENVMAP_TYPE_CUBE",[xl]:"ENVMAP_TYPE_CUBE_UV"};function VF(n){return n.envMap===!1?"ENVMAP_TYPE_CUBE":BF[n.envMapMode]||"ENVMAP_TYPE_CUBE"}var HF={[oo]:"ENVMAP_MODE_REFRACTION"};function zF(n){return n.envMap===!1?"ENVMAP_MODE_REFLECTION":HF[n.envMapMode]||"ENVMAP_MODE_REFLECTION"}var GF={[Oy]:"ENVMAP_BLENDING_MULTIPLY",[vE]:"ENVMAP_BLENDING_MIX",[yE]:"ENVMAP_BLENDING_ADD"};function jF(n){return n.envMap===!1?"ENVMAP_BLENDING_NONE":GF[n.combine]||"ENVMAP_BLENDING_NONE"}function WF(n){let e=n.envMapCubeUVHeight;if(e===null)return null;let t=Math.log2(e)-2,i=1/e;return{texelWidth:1/(3*Math.max(Math.pow(2,t),112)),texelHeight:i,maxMip:t}}function $F(n,e,t,i){let r=n.getContext(),s=t.defines,o=t.vertexShader,a=t.fragmentShader,c=UF(t),l=VF(t),u=zF(t),d=jF(t),f=WF(t),h=IF(t),g=AF(s),_=r.createProgram(),m,p,M=t.glslVersion?"#version "+t.glslVersion+`
`:"";t.isRawShaderMaterial?(m=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,g].filter(Il).join(`
`),m.length>0&&(m+=`
`),p=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,g].filter(Il).join(`
`),p.length>0&&(p+=`
`)):(m=[JE(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,g,t.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",t.batching?"#define USE_BATCHING":"",t.batchingColor?"#define USE_BATCHING_COLOR":"",t.instancing?"#define USE_INSTANCING":"",t.instancingColor?"#define USE_INSTANCING_COLOR":"",t.instancingMorph?"#define USE_INSTANCING_MORPH":"",t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.map?"#define USE_MAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+u:"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.displacementMap?"#define USE_DISPLACEMENTMAP":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.mapUv?"#define MAP_UV "+t.mapUv:"",t.alphaMapUv?"#define ALPHAMAP_UV "+t.alphaMapUv:"",t.lightMapUv?"#define LIGHTMAP_UV "+t.lightMapUv:"",t.aoMapUv?"#define AOMAP_UV "+t.aoMapUv:"",t.emissiveMapUv?"#define EMISSIVEMAP_UV "+t.emissiveMapUv:"",t.bumpMapUv?"#define BUMPMAP_UV "+t.bumpMapUv:"",t.normalMapUv?"#define NORMALMAP_UV "+t.normalMapUv:"",t.displacementMapUv?"#define DISPLACEMENTMAP_UV "+t.displacementMapUv:"",t.metalnessMapUv?"#define METALNESSMAP_UV "+t.metalnessMapUv:"",t.roughnessMapUv?"#define ROUGHNESSMAP_UV "+t.roughnessMapUv:"",t.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+t.anisotropyMapUv:"",t.clearcoatMapUv?"#define CLEARCOATMAP_UV "+t.clearcoatMapUv:"",t.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+t.clearcoatNormalMapUv:"",t.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+t.clearcoatRoughnessMapUv:"",t.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+t.iridescenceMapUv:"",t.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+t.iridescenceThicknessMapUv:"",t.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+t.sheenColorMapUv:"",t.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+t.sheenRoughnessMapUv:"",t.specularMapUv?"#define SPECULARMAP_UV "+t.specularMapUv:"",t.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+t.specularColorMapUv:"",t.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+t.specularIntensityMapUv:"",t.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+t.transmissionMapUv:"",t.thicknessMapUv?"#define THICKNESSMAP_UV "+t.thicknessMapUv:"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.flatShading?"#define FLAT_SHADED":"",t.skinning?"#define USE_SKINNING":"",t.morphTargets?"#define USE_MORPHTARGETS":"",t.morphNormals&&t.flatShading===!1?"#define USE_MORPHNORMALS":"",t.morphColors?"#define USE_MORPHCOLORS":"",t.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+t.morphTextureStride:"",t.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+t.morphTargetsCount:"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+c:"",t.sizeAttenuation?"#define USE_SIZEATTENUATION":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",t.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(Il).join(`
`),p=[JE(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,g,t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",t.map?"#define USE_MAP":"",t.matcap?"#define USE_MATCAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+l:"",t.envMap?"#define "+u:"",t.envMap?"#define "+d:"",f?"#define CUBEUV_TEXEL_WIDTH "+f.texelWidth:"",f?"#define CUBEUV_TEXEL_HEIGHT "+f.texelHeight:"",f?"#define CUBEUV_MAX_MIP "+f.maxMip+".0":"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoat?"#define USE_CLEARCOAT":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.dispersion?"#define USE_DISPERSION":"",t.iridescence?"#define USE_IRIDESCENCE":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaTest?"#define USE_ALPHATEST":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.sheen?"#define USE_SHEEN":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors||t.instancingColor?"#define USE_COLOR":"",t.vertexAlphas||t.batchingColor?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.gradientMap?"#define USE_GRADIENTMAP":"",t.flatShading?"#define FLAT_SHADED":"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+c:"",t.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",t.decodeVideoTextureEmissive?"#define DECODE_VIDEO_TEXTURE_EMISSIVE":"",t.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",t.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",t.toneMapping!==Ni?"#define TONE_MAPPING":"",t.toneMapping!==Ni?qe.tonemapping_pars_fragment:"",t.toneMapping!==Ni?TF("toneMapping",t.toneMapping):"",t.dithering?"#define DITHERING":"",t.opaque?"#define OPAQUE":"",qe.colorspace_pars_fragment,wF("linearToOutputTexel",t.outputColorSpace),DF(),t.useDepthPacking?"#define DEPTH_PACKING "+t.depthPacking:"",`
`].filter(Il).join(`
`)),o=f_(o),o=XE(o,t),o=YE(o,t),a=f_(a),a=XE(a,t),a=YE(a,t),o=ZE(o),a=ZE(a),t.isRawShaderMaterial!==!0&&(M=`#version 300 es
`,m=[h,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+m,p=["#define varying in",t.glslVersion===Zy?"":"layout(location = 0) out highp vec4 pc_fragColor;",t.glslVersion===Zy?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+p);let w=M+m+o,b=M+p+a,D=WE(r,r.VERTEX_SHADER,w),C=WE(r,r.FRAGMENT_SHADER,b);r.attachShader(_,D),r.attachShader(_,C),t.index0AttributeName!==void 0?r.bindAttribLocation(_,0,t.index0AttributeName):t.morphTargets===!0&&r.bindAttribLocation(_,0,"position"),r.linkProgram(_);function A(T){if(n.debug.checkShaderErrors){let O=r.getProgramInfoLog(_)||"",k=r.getShaderInfoLog(D)||"",G=r.getShaderInfoLog(C)||"",B=O.trim(),H=k.trim(),L=G.trim(),ee=!0,Z=!0;if(r.getProgramParameter(_,r.LINK_STATUS)===!1)if(ee=!1,typeof n.debug.onShaderError=="function")n.debug.onShaderError(r,_,D,C);else{let de=qE(r,D,"vertex"),ve=qE(r,C,"fragment");Ne("THREE.WebGLProgram: Shader Error "+r.getError()+" - VALIDATE_STATUS "+r.getProgramParameter(_,r.VALIDATE_STATUS)+`

Material Name: `+T.name+`
Material Type: `+T.type+`

Program Info Log: `+B+`
`+de+`
`+ve)}else B!==""?Le("WebGLProgram: Program Info Log:",B):(H===""||L==="")&&(Z=!1);Z&&(T.diagnostics={runnable:ee,programLog:B,vertexShader:{log:H,prefix:m},fragmentShader:{log:L,prefix:p}})}r.deleteShader(D),r.deleteShader(C),y=new Oa(r,_),S=RF(r,_)}let y;this.getUniforms=function(){return y===void 0&&A(this),y};let S;this.getAttributes=function(){return S===void 0&&A(this),S};let j=t.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return j===!1&&(j=r.getProgramParameter(_,MF)),j},this.destroy=function(){i.releaseStatesOfProgram(this),r.deleteProgram(_),this.program=void 0},this.type=t.shaderType,this.name=t.shaderName,this.id=SF++,this.cacheKey=e,this.usedTimes=1,this.program=_,this.vertexShader=D,this.fragmentShader=C,this}var qF=0,h_=class{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(e){let t=e.vertexShader,i=e.fragmentShader,r=this._getShaderStage(t),s=this._getShaderStage(i),o=this._getShaderCacheForMaterial(e);return o.has(r)===!1&&(o.add(r),r.usedTimes++),o.has(s)===!1&&(o.add(s),s.usedTimes++),this}remove(e){let t=this.materialCache.get(e);for(let i of t)i.usedTimes--,i.usedTimes===0&&this.shaderCache.delete(i.code);return this.materialCache.delete(e),this}getVertexShaderID(e){return this._getShaderStage(e.vertexShader).id}getFragmentShaderID(e){return this._getShaderStage(e.fragmentShader).id}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(e){let t=this.materialCache,i=t.get(e);return i===void 0&&(i=new Set,t.set(e,i)),i}_getShaderStage(e){let t=this.shaderCache,i=t.get(e);return i===void 0&&(i=new p_(e),t.set(e,i)),i}},p_=class{constructor(e){this.id=qF++,this.code=e,this.usedTimes=0}};function XF(n,e,t,i,r,s){let o=new Ma,a=new h_,c=new Set,l=[],u=new Map,d=i.logarithmicDepthBuffer,f=i.precision,h={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distance",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function g(y){return c.add(y),y===0?"uv":`uv${y}`}function _(y,S,j,T,O){let k=T.fog,G=O.geometry,B=y.isMeshStandardMaterial||y.isMeshLambertMaterial||y.isMeshPhongMaterial?T.environment:null,H=y.isMeshStandardMaterial||y.isMeshLambertMaterial&&!y.envMap||y.isMeshPhongMaterial&&!y.envMap,L=e.get(y.envMap||B,H),ee=L&&L.mapping===xl?L.image.height:null,Z=h[y.type];y.precision!==null&&(f=i.getMaxPrecision(y.precision),f!==y.precision&&Le("WebGLProgram.getParameters:",y.precision,"not supported, using",f,"instead."));let de=G.morphAttributes.position||G.morphAttributes.normal||G.morphAttributes.color,ve=de!==void 0?de.length:0,he=0;G.morphAttributes.position!==void 0&&(he=1),G.morphAttributes.normal!==void 0&&(he=2),G.morphAttributes.color!==void 0&&(he=3);let $e,At,Dt,X;if(Z){let yt=Ki[Z];$e=yt.vertexShader,At=yt.fragmentShader}else $e=y.vertexShader,At=y.fragmentShader,a.update(y),Dt=a.getVertexShaderID(y),X=a.getFragmentShaderID(y);let ie=n.getRenderTarget(),oe=n.state.buffers.depth.getReversed(),We=O.isInstancedMesh===!0,Ae=O.isBatchedMesh===!0,Fe=!!y.map,Zt=!!y.matcap,at=!!L,vt=!!y.aoMap,Et=!!y.lightMap,Xe=!!y.bumpMap,Ft=!!y.normalMap,I=!!y.displacementMap,zt=!!y.emissiveMap,ft=!!y.metalnessMap,Ct=!!y.roughnessMap,be=y.anisotropy>0,E=y.clearcoat>0,v=y.dispersion>0,N=y.iridescence>0,q=y.sheen>0,Y=y.transmission>0,$=be&&!!y.anisotropyMap,ye=E&&!!y.clearcoatMap,re=E&&!!y.clearcoatNormalMap,De=E&&!!y.clearcoatRoughnessMap,Pe=N&&!!y.iridescenceMap,J=N&&!!y.iridescenceThicknessMap,te=q&&!!y.sheenColorMap,_e=q&&!!y.sheenRoughnessMap,Me=!!y.specularMap,fe=!!y.specularColorMap,Ye=!!y.specularIntensityMap,R=Y&&!!y.transmissionMap,se=Y&&!!y.thicknessMap,ne=!!y.gradientMap,me=!!y.alphaMap,K=y.alphaTest>0,W=!!y.alphaHash,xe=!!y.extensions,Ue=Ni;y.toneMapped&&(ie===null||ie.isXRRenderTarget===!0)&&(Ue=n.toneMapping);let Tt={shaderID:Z,shaderType:y.type,shaderName:y.name,vertexShader:$e,fragmentShader:At,defines:y.defines,customVertexShaderID:Dt,customFragmentShaderID:X,isRawShaderMaterial:y.isRawShaderMaterial===!0,glslVersion:y.glslVersion,precision:f,batching:Ae,batchingColor:Ae&&O._colorsTexture!==null,instancing:We,instancingColor:We&&O.instanceColor!==null,instancingMorph:We&&O.morphTexture!==null,outputColorSpace:ie===null?n.outputColorSpace:ie.isXRRenderTarget===!0?ie.texture.colorSpace:so,alphaToCoverage:!!y.alphaToCoverage,map:Fe,matcap:Zt,envMap:at,envMapMode:at&&L.mapping,envMapCubeUVHeight:ee,aoMap:vt,lightMap:Et,bumpMap:Xe,normalMap:Ft,displacementMap:I,emissiveMap:zt,normalMapObjectSpace:Ft&&y.normalMapType===ME,normalMapTangentSpace:Ft&&y.normalMapType===Yy,metalnessMap:ft,roughnessMap:Ct,anisotropy:be,anisotropyMap:$,clearcoat:E,clearcoatMap:ye,clearcoatNormalMap:re,clearcoatRoughnessMap:De,dispersion:v,iridescence:N,iridescenceMap:Pe,iridescenceThicknessMap:J,sheen:q,sheenColorMap:te,sheenRoughnessMap:_e,specularMap:Me,specularColorMap:fe,specularIntensityMap:Ye,transmission:Y,transmissionMap:R,thicknessMap:se,gradientMap:ne,opaque:y.transparent===!1&&y.blending===io&&y.alphaToCoverage===!1,alphaMap:me,alphaTest:K,alphaHash:W,combine:y.combine,mapUv:Fe&&g(y.map.channel),aoMapUv:vt&&g(y.aoMap.channel),lightMapUv:Et&&g(y.lightMap.channel),bumpMapUv:Xe&&g(y.bumpMap.channel),normalMapUv:Ft&&g(y.normalMap.channel),displacementMapUv:I&&g(y.displacementMap.channel),emissiveMapUv:zt&&g(y.emissiveMap.channel),metalnessMapUv:ft&&g(y.metalnessMap.channel),roughnessMapUv:Ct&&g(y.roughnessMap.channel),anisotropyMapUv:$&&g(y.anisotropyMap.channel),clearcoatMapUv:ye&&g(y.clearcoatMap.channel),clearcoatNormalMapUv:re&&g(y.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:De&&g(y.clearcoatRoughnessMap.channel),iridescenceMapUv:Pe&&g(y.iridescenceMap.channel),iridescenceThicknessMapUv:J&&g(y.iridescenceThicknessMap.channel),sheenColorMapUv:te&&g(y.sheenColorMap.channel),sheenRoughnessMapUv:_e&&g(y.sheenRoughnessMap.channel),specularMapUv:Me&&g(y.specularMap.channel),specularColorMapUv:fe&&g(y.specularColorMap.channel),specularIntensityMapUv:Ye&&g(y.specularIntensityMap.channel),transmissionMapUv:R&&g(y.transmissionMap.channel),thicknessMapUv:se&&g(y.thicknessMap.channel),alphaMapUv:me&&g(y.alphaMap.channel),vertexTangents:!!G.attributes.tangent&&(Ft||be),vertexColors:y.vertexColors,vertexAlphas:y.vertexColors===!0&&!!G.attributes.color&&G.attributes.color.itemSize===4,pointsUvs:O.isPoints===!0&&!!G.attributes.uv&&(Fe||me),fog:!!k,useFog:y.fog===!0,fogExp2:!!k&&k.isFogExp2,flatShading:y.wireframe===!1&&(y.flatShading===!0||G.attributes.normal===void 0&&Ft===!1&&(y.isMeshLambertMaterial||y.isMeshPhongMaterial||y.isMeshStandardMaterial||y.isMeshPhysicalMaterial)),sizeAttenuation:y.sizeAttenuation===!0,logarithmicDepthBuffer:d,reversedDepthBuffer:oe,skinning:O.isSkinnedMesh===!0,morphTargets:G.morphAttributes.position!==void 0,morphNormals:G.morphAttributes.normal!==void 0,morphColors:G.morphAttributes.color!==void 0,morphTargetsCount:ve,morphTextureStride:he,numDirLights:S.directional.length,numPointLights:S.point.length,numSpotLights:S.spot.length,numSpotLightMaps:S.spotLightMap.length,numRectAreaLights:S.rectArea.length,numHemiLights:S.hemi.length,numDirLightShadows:S.directionalShadowMap.length,numPointLightShadows:S.pointShadowMap.length,numSpotLightShadows:S.spotShadowMap.length,numSpotLightShadowsWithMaps:S.numSpotLightShadowsWithMaps,numLightProbes:S.numLightProbes,numClippingPlanes:s.numPlanes,numClipIntersection:s.numIntersection,dithering:y.dithering,shadowMapEnabled:n.shadowMap.enabled&&j.length>0,shadowMapType:n.shadowMap.type,toneMapping:Ue,decodeVideoTexture:Fe&&y.map.isVideoTexture===!0&&st.getTransfer(y.map.colorSpace)===gt,decodeVideoTextureEmissive:zt&&y.emissiveMap.isVideoTexture===!0&&st.getTransfer(y.emissiveMap.colorSpace)===gt,premultipliedAlpha:y.premultipliedAlpha,doubleSided:y.side===Xi,flipSided:y.side===Nn,useDepthPacking:y.depthPacking>=0,depthPacking:y.depthPacking||0,index0AttributeName:y.index0AttributeName,extensionClipCullDistance:xe&&y.extensions.clipCullDistance===!0&&t.has("WEBGL_clip_cull_distance"),extensionMultiDraw:(xe&&y.extensions.multiDraw===!0||Ae)&&t.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:t.has("KHR_parallel_shader_compile"),customProgramCacheKey:y.customProgramCacheKey()};return Tt.vertexUv1s=c.has(1),Tt.vertexUv2s=c.has(2),Tt.vertexUv3s=c.has(3),c.clear(),Tt}function m(y){let S=[];if(y.shaderID?S.push(y.shaderID):(S.push(y.customVertexShaderID),S.push(y.customFragmentShaderID)),y.defines!==void 0)for(let j in y.defines)S.push(j),S.push(y.defines[j]);return y.isRawShaderMaterial===!1&&(p(S,y),M(S,y),S.push(n.outputColorSpace)),S.push(y.customProgramCacheKey),S.join()}function p(y,S){y.push(S.precision),y.push(S.outputColorSpace),y.push(S.envMapMode),y.push(S.envMapCubeUVHeight),y.push(S.mapUv),y.push(S.alphaMapUv),y.push(S.lightMapUv),y.push(S.aoMapUv),y.push(S.bumpMapUv),y.push(S.normalMapUv),y.push(S.displacementMapUv),y.push(S.emissiveMapUv),y.push(S.metalnessMapUv),y.push(S.roughnessMapUv),y.push(S.anisotropyMapUv),y.push(S.clearcoatMapUv),y.push(S.clearcoatNormalMapUv),y.push(S.clearcoatRoughnessMapUv),y.push(S.iridescenceMapUv),y.push(S.iridescenceThicknessMapUv),y.push(S.sheenColorMapUv),y.push(S.sheenRoughnessMapUv),y.push(S.specularMapUv),y.push(S.specularColorMapUv),y.push(S.specularIntensityMapUv),y.push(S.transmissionMapUv),y.push(S.thicknessMapUv),y.push(S.combine),y.push(S.fogExp2),y.push(S.sizeAttenuation),y.push(S.morphTargetsCount),y.push(S.morphAttributeCount),y.push(S.numDirLights),y.push(S.numPointLights),y.push(S.numSpotLights),y.push(S.numSpotLightMaps),y.push(S.numHemiLights),y.push(S.numRectAreaLights),y.push(S.numDirLightShadows),y.push(S.numPointLightShadows),y.push(S.numSpotLightShadows),y.push(S.numSpotLightShadowsWithMaps),y.push(S.numLightProbes),y.push(S.shadowMapType),y.push(S.toneMapping),y.push(S.numClippingPlanes),y.push(S.numClipIntersection),y.push(S.depthPacking)}function M(y,S){o.disableAll(),S.instancing&&o.enable(0),S.instancingColor&&o.enable(1),S.instancingMorph&&o.enable(2),S.matcap&&o.enable(3),S.envMap&&o.enable(4),S.normalMapObjectSpace&&o.enable(5),S.normalMapTangentSpace&&o.enable(6),S.clearcoat&&o.enable(7),S.iridescence&&o.enable(8),S.alphaTest&&o.enable(9),S.vertexColors&&o.enable(10),S.vertexAlphas&&o.enable(11),S.vertexUv1s&&o.enable(12),S.vertexUv2s&&o.enable(13),S.vertexUv3s&&o.enable(14),S.vertexTangents&&o.enable(15),S.anisotropy&&o.enable(16),S.alphaHash&&o.enable(17),S.batching&&o.enable(18),S.dispersion&&o.enable(19),S.batchingColor&&o.enable(20),S.gradientMap&&o.enable(21),y.push(o.mask),o.disableAll(),S.fog&&o.enable(0),S.useFog&&o.enable(1),S.flatShading&&o.enable(2),S.logarithmicDepthBuffer&&o.enable(3),S.reversedDepthBuffer&&o.enable(4),S.skinning&&o.enable(5),S.morphTargets&&o.enable(6),S.morphNormals&&o.enable(7),S.morphColors&&o.enable(8),S.premultipliedAlpha&&o.enable(9),S.shadowMapEnabled&&o.enable(10),S.doubleSided&&o.enable(11),S.flipSided&&o.enable(12),S.useDepthPacking&&o.enable(13),S.dithering&&o.enable(14),S.transmission&&o.enable(15),S.sheen&&o.enable(16),S.opaque&&o.enable(17),S.pointsUvs&&o.enable(18),S.decodeVideoTexture&&o.enable(19),S.decodeVideoTextureEmissive&&o.enable(20),S.alphaToCoverage&&o.enable(21),y.push(o.mask)}function w(y){let S=h[y.type],j;if(S){let T=Ki[S];j=PE.clone(T.uniforms)}else j=y.uniforms;return j}function b(y,S){let j=u.get(S);return j!==void 0?++j.usedTimes:(j=new $F(n,S,y,r),l.push(j),u.set(S,j)),j}function D(y){if(--y.usedTimes===0){let S=l.indexOf(y);l[S]=l[l.length-1],l.pop(),u.delete(y.cacheKey),y.destroy()}}function C(y){a.remove(y)}function A(){a.dispose()}return{getParameters:_,getProgramCacheKey:m,getUniforms:w,acquireProgram:b,releaseProgram:D,releaseShaderCache:C,programs:l,dispose:A}}function YF(){let n=new WeakMap;function e(o){return n.has(o)}function t(o){let a=n.get(o);return a===void 0&&(a={},n.set(o,a)),a}function i(o){n.delete(o)}function r(o,a,c){n.get(o)[a]=c}function s(){n=new WeakMap}return{has:e,get:t,remove:i,update:r,dispose:s}}function ZF(n,e){return n.groupOrder!==e.groupOrder?n.groupOrder-e.groupOrder:n.renderOrder!==e.renderOrder?n.renderOrder-e.renderOrder:n.material.id!==e.material.id?n.material.id-e.material.id:n.materialVariant!==e.materialVariant?n.materialVariant-e.materialVariant:n.z!==e.z?n.z-e.z:n.id-e.id}function KE(n,e){return n.groupOrder!==e.groupOrder?n.groupOrder-e.groupOrder:n.renderOrder!==e.renderOrder?n.renderOrder-e.renderOrder:n.z!==e.z?e.z-n.z:n.id-e.id}function QE(){let n=[],e=0,t=[],i=[],r=[];function s(){e=0,t.length=0,i.length=0,r.length=0}function o(f){let h=0;return f.isInstancedMesh&&(h+=2),f.isSkinnedMesh&&(h+=1),h}function a(f,h,g,_,m,p){let M=n[e];return M===void 0?(M={id:f.id,object:f,geometry:h,material:g,materialVariant:o(f),groupOrder:_,renderOrder:f.renderOrder,z:m,group:p},n[e]=M):(M.id=f.id,M.object=f,M.geometry=h,M.material=g,M.materialVariant=o(f),M.groupOrder=_,M.renderOrder=f.renderOrder,M.z=m,M.group=p),e++,M}function c(f,h,g,_,m,p){let M=a(f,h,g,_,m,p);g.transmission>0?i.push(M):g.transparent===!0?r.push(M):t.push(M)}function l(f,h,g,_,m,p){let M=a(f,h,g,_,m,p);g.transmission>0?i.unshift(M):g.transparent===!0?r.unshift(M):t.unshift(M)}function u(f,h){t.length>1&&t.sort(f||ZF),i.length>1&&i.sort(h||KE),r.length>1&&r.sort(h||KE)}function d(){for(let f=e,h=n.length;f<h;f++){let g=n[f];if(g.id===null)break;g.id=null,g.object=null,g.geometry=null,g.material=null,g.group=null}}return{opaque:t,transmissive:i,transparent:r,init:s,push:c,unshift:l,finish:d,sort:u}}function JF(){let n=new WeakMap;function e(i,r){let s=n.get(i),o;return s===void 0?(o=new QE,n.set(i,[o])):r>=s.length?(o=new QE,s.push(o)):o=s[r],o}function t(){n=new WeakMap}return{get:e,dispose:t}}function KF(){let n={};return{get:function(e){if(n[e.id]!==void 0)return n[e.id];let t;switch(e.type){case"DirectionalLight":t={direction:new F,color:new ot};break;case"SpotLight":t={position:new F,direction:new F,color:new ot,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":t={position:new F,color:new ot,distance:0,decay:0};break;case"HemisphereLight":t={direction:new F,skyColor:new ot,groundColor:new ot};break;case"RectAreaLight":t={color:new ot,position:new F,halfWidth:new F,halfHeight:new F};break}return n[e.id]=t,t}}}function QF(){let n={};return{get:function(e){if(n[e.id]!==void 0)return n[e.id];let t;switch(e.type){case"DirectionalLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new it};break;case"SpotLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new it};break;case"PointLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new it,shadowCameraNear:1,shadowCameraFar:1e3};break}return n[e.id]=t,t}}}var ek=0;function tk(n,e){return(e.castShadow?2:0)-(n.castShadow?2:0)+(e.map?1:0)-(n.map?1:0)}function nk(n){let e=new KF,t=QF(),i={version:0,hash:{directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let l=0;l<9;l++)i.probe.push(new F);let r=new F,s=new It,o=new It;function a(l){let u=0,d=0,f=0;for(let S=0;S<9;S++)i.probe[S].set(0,0,0);let h=0,g=0,_=0,m=0,p=0,M=0,w=0,b=0,D=0,C=0,A=0;l.sort(tk);for(let S=0,j=l.length;S<j;S++){let T=l[S],O=T.color,k=T.intensity,G=T.distance,B=null;if(T.shadow&&T.shadow.map&&(T.shadow.map.texture.format===ao?B=T.shadow.map.texture:B=T.shadow.map.depthTexture||T.shadow.map.texture),T.isAmbientLight)u+=O.r*k,d+=O.g*k,f+=O.b*k;else if(T.isLightProbe){for(let H=0;H<9;H++)i.probe[H].addScaledVector(T.sh.coefficients[H],k);A++}else if(T.isDirectionalLight){let H=e.get(T);if(H.color.copy(T.color).multiplyScalar(T.intensity),T.castShadow){let L=T.shadow,ee=t.get(T);ee.shadowIntensity=L.intensity,ee.shadowBias=L.bias,ee.shadowNormalBias=L.normalBias,ee.shadowRadius=L.radius,ee.shadowMapSize=L.mapSize,i.directionalShadow[h]=ee,i.directionalShadowMap[h]=B,i.directionalShadowMatrix[h]=T.shadow.matrix,M++}i.directional[h]=H,h++}else if(T.isSpotLight){let H=e.get(T);H.position.setFromMatrixPosition(T.matrixWorld),H.color.copy(O).multiplyScalar(k),H.distance=G,H.coneCos=Math.cos(T.angle),H.penumbraCos=Math.cos(T.angle*(1-T.penumbra)),H.decay=T.decay,i.spot[_]=H;let L=T.shadow;if(T.map&&(i.spotLightMap[D]=T.map,D++,L.updateMatrices(T),T.castShadow&&C++),i.spotLightMatrix[_]=L.matrix,T.castShadow){let ee=t.get(T);ee.shadowIntensity=L.intensity,ee.shadowBias=L.bias,ee.shadowNormalBias=L.normalBias,ee.shadowRadius=L.radius,ee.shadowMapSize=L.mapSize,i.spotShadow[_]=ee,i.spotShadowMap[_]=B,b++}_++}else if(T.isRectAreaLight){let H=e.get(T);H.color.copy(O).multiplyScalar(k),H.halfWidth.set(T.width*.5,0,0),H.halfHeight.set(0,T.height*.5,0),i.rectArea[m]=H,m++}else if(T.isPointLight){let H=e.get(T);if(H.color.copy(T.color).multiplyScalar(T.intensity),H.distance=T.distance,H.decay=T.decay,T.castShadow){let L=T.shadow,ee=t.get(T);ee.shadowIntensity=L.intensity,ee.shadowBias=L.bias,ee.shadowNormalBias=L.normalBias,ee.shadowRadius=L.radius,ee.shadowMapSize=L.mapSize,ee.shadowCameraNear=L.camera.near,ee.shadowCameraFar=L.camera.far,i.pointShadow[g]=ee,i.pointShadowMap[g]=B,i.pointShadowMatrix[g]=T.shadow.matrix,w++}i.point[g]=H,g++}else if(T.isHemisphereLight){let H=e.get(T);H.skyColor.copy(T.color).multiplyScalar(k),H.groundColor.copy(T.groundColor).multiplyScalar(k),i.hemi[p]=H,p++}}m>0&&(n.has("OES_texture_float_linear")===!0?(i.rectAreaLTC1=ce.LTC_FLOAT_1,i.rectAreaLTC2=ce.LTC_FLOAT_2):(i.rectAreaLTC1=ce.LTC_HALF_1,i.rectAreaLTC2=ce.LTC_HALF_2)),i.ambient[0]=u,i.ambient[1]=d,i.ambient[2]=f;let y=i.hash;(y.directionalLength!==h||y.pointLength!==g||y.spotLength!==_||y.rectAreaLength!==m||y.hemiLength!==p||y.numDirectionalShadows!==M||y.numPointShadows!==w||y.numSpotShadows!==b||y.numSpotMaps!==D||y.numLightProbes!==A)&&(i.directional.length=h,i.spot.length=_,i.rectArea.length=m,i.point.length=g,i.hemi.length=p,i.directionalShadow.length=M,i.directionalShadowMap.length=M,i.pointShadow.length=w,i.pointShadowMap.length=w,i.spotShadow.length=b,i.spotShadowMap.length=b,i.directionalShadowMatrix.length=M,i.pointShadowMatrix.length=w,i.spotLightMatrix.length=b+D-C,i.spotLightMap.length=D,i.numSpotLightShadowsWithMaps=C,i.numLightProbes=A,y.directionalLength=h,y.pointLength=g,y.spotLength=_,y.rectAreaLength=m,y.hemiLength=p,y.numDirectionalShadows=M,y.numPointShadows=w,y.numSpotShadows=b,y.numSpotMaps=D,y.numLightProbes=A,i.version=ek++)}function c(l,u){let d=0,f=0,h=0,g=0,_=0,m=u.matrixWorldInverse;for(let p=0,M=l.length;p<M;p++){let w=l[p];if(w.isDirectionalLight){let b=i.directional[d];b.direction.setFromMatrixPosition(w.matrixWorld),r.setFromMatrixPosition(w.target.matrixWorld),b.direction.sub(r),b.direction.transformDirection(m),d++}else if(w.isSpotLight){let b=i.spot[h];b.position.setFromMatrixPosition(w.matrixWorld),b.position.applyMatrix4(m),b.direction.setFromMatrixPosition(w.matrixWorld),r.setFromMatrixPosition(w.target.matrixWorld),b.direction.sub(r),b.direction.transformDirection(m),h++}else if(w.isRectAreaLight){let b=i.rectArea[g];b.position.setFromMatrixPosition(w.matrixWorld),b.position.applyMatrix4(m),o.identity(),s.copy(w.matrixWorld),s.premultiply(m),o.extractRotation(s),b.halfWidth.set(w.width*.5,0,0),b.halfHeight.set(0,w.height*.5,0),b.halfWidth.applyMatrix4(o),b.halfHeight.applyMatrix4(o),g++}else if(w.isPointLight){let b=i.point[f];b.position.setFromMatrixPosition(w.matrixWorld),b.position.applyMatrix4(m),f++}else if(w.isHemisphereLight){let b=i.hemi[_];b.direction.setFromMatrixPosition(w.matrixWorld),b.direction.transformDirection(m),_++}}}return{setup:a,setupView:c,state:i}}function ew(n){let e=new nk(n),t=[],i=[];function r(u){l.camera=u,t.length=0,i.length=0}function s(u){t.push(u)}function o(u){i.push(u)}function a(){e.setup(t)}function c(u){e.setupView(t,u)}let l={lightsArray:t,shadowsArray:i,camera:null,lights:e,transmissionRenderTarget:{}};return{init:r,state:l,setupLights:a,setupLightsView:c,pushLight:s,pushShadow:o}}function ik(n){let e=new WeakMap;function t(r,s=0){let o=e.get(r),a;return o===void 0?(a=new ew(n),e.set(r,[a])):s>=o.length?(a=new ew(n),o.push(a)):a=o[s],a}function i(){e=new WeakMap}return{get:t,dispose:i}}var rk=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,sk=`uniform sampler2D shadow_pass;
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
}`,ok=[new F(1,0,0),new F(-1,0,0),new F(0,1,0),new F(0,-1,0),new F(0,0,1),new F(0,0,-1)],ak=[new F(0,-1,0),new F(0,-1,0),new F(0,0,1),new F(0,0,-1),new F(0,-1,0),new F(0,-1,0)],tw=new It,Dl=new F,a_=new F;function ck(n,e,t){let i=new Ea,r=new it,s=new it,o=new Pt,a=new ih,c=new rh,l={},u=t.maxTextureSize,d={[Cr]:Nn,[Nn]:Cr,[Xi]:Xi},f=new Qn({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new it},radius:{value:4}},vertexShader:rk,fragmentShader:sk}),h=f.clone();h.defines.HORIZONTAL_PASS=1;let g=new Kn;g.setAttribute("position",new Zn(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));let _=new on(g,f),m=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=_l;let p=this.type;this.render=function(C,A,y){if(m.enabled===!1||m.autoUpdate===!1&&m.needsUpdate===!1||C.length===0)return;this.type===Kb&&(Le("WebGLShadowMap: PCFSoftShadowMap has been deprecated. Using PCFShadowMap instead."),this.type=_l);let S=n.getRenderTarget(),j=n.getActiveCubeFace(),T=n.getActiveMipmapLevel(),O=n.state;O.setBlending(Yi),O.buffers.depth.getReversed()===!0?O.buffers.color.setClear(0,0,0,0):O.buffers.color.setClear(1,1,1,1),O.buffers.depth.setTest(!0),O.setScissorTest(!1);let k=p!==this.type;k&&A.traverse(function(G){G.material&&(Array.isArray(G.material)?G.material.forEach(B=>B.needsUpdate=!0):G.material.needsUpdate=!0)});for(let G=0,B=C.length;G<B;G++){let H=C[G],L=H.shadow;if(L===void 0){Le("WebGLShadowMap:",H,"has no shadow.");continue}if(L.autoUpdate===!1&&L.needsUpdate===!1)continue;r.copy(L.mapSize);let ee=L.getFrameExtents();r.multiply(ee),s.copy(L.mapSize),(r.x>u||r.y>u)&&(r.x>u&&(s.x=Math.floor(u/ee.x),r.x=s.x*ee.x,L.mapSize.x=s.x),r.y>u&&(s.y=Math.floor(u/ee.y),r.y=s.y*ee.y,L.mapSize.y=s.y));let Z=n.state.buffers.depth.getReversed();if(L.camera._reversedDepth=Z,L.map===null||k===!0){if(L.map!==null&&(L.map.depthTexture!==null&&(L.map.depthTexture.dispose(),L.map.depthTexture=null),L.map.dispose()),this.type===Aa){if(H.isPointLight){Le("WebGLShadowMap: VSM shadow maps are not supported for PointLights. Use PCF or BasicShadowMap instead.");continue}L.map=new Jn(r.x,r.y,{format:ao,type:Zi,minFilter:fn,magFilter:fn,generateMipmaps:!1}),L.map.texture.name=H.name+".shadowMap",L.map.depthTexture=new as(r.x,r.y,Oi),L.map.depthTexture.name=H.name+".shadowMapDepth",L.map.depthTexture.format=Wi,L.map.depthTexture.compareFunction=null,L.map.depthTexture.minFilter=sn,L.map.depthTexture.magFilter=sn}else H.isPointLight?(L.map=new ap(r.x),L.map.depthTexture=new eh(r.x,Pi)):(L.map=new Jn(r.x,r.y),L.map.depthTexture=new as(r.x,r.y,Pi)),L.map.depthTexture.name=H.name+".shadowMap",L.map.depthTexture.format=Wi,this.type===_l?(L.map.depthTexture.compareFunction=Z?ip:np,L.map.depthTexture.minFilter=fn,L.map.depthTexture.magFilter=fn):(L.map.depthTexture.compareFunction=null,L.map.depthTexture.minFilter=sn,L.map.depthTexture.magFilter=sn);L.camera.updateProjectionMatrix()}let de=L.map.isWebGLCubeRenderTarget?6:1;for(let ve=0;ve<de;ve++){if(L.map.isWebGLCubeRenderTarget)n.setRenderTarget(L.map,ve),n.clear();else{ve===0&&(n.setRenderTarget(L.map),n.clear());let he=L.getViewport(ve);o.set(s.x*he.x,s.y*he.y,s.x*he.z,s.y*he.w),O.viewport(o)}if(H.isPointLight){let he=L.camera,$e=L.matrix,At=H.distance||he.far;At!==he.far&&(he.far=At,he.updateProjectionMatrix()),Dl.setFromMatrixPosition(H.matrixWorld),he.position.copy(Dl),a_.copy(he.position),a_.add(ok[ve]),he.up.copy(ak[ve]),he.lookAt(a_),he.updateMatrixWorld(),$e.makeTranslation(-Dl.x,-Dl.y,-Dl.z),tw.multiplyMatrices(he.projectionMatrix,he.matrixWorldInverse),L._frustum.setFromProjectionMatrix(tw,he.coordinateSystem,he.reversedDepth)}else L.updateMatrices(H);i=L.getFrustum(),b(A,y,L.camera,H,this.type)}L.isPointLightShadow!==!0&&this.type===Aa&&M(L,y),L.needsUpdate=!1}p=this.type,m.needsUpdate=!1,n.setRenderTarget(S,j,T)};function M(C,A){let y=e.update(_);f.defines.VSM_SAMPLES!==C.blurSamples&&(f.defines.VSM_SAMPLES=C.blurSamples,h.defines.VSM_SAMPLES=C.blurSamples,f.needsUpdate=!0,h.needsUpdate=!0),C.mapPass===null&&(C.mapPass=new Jn(r.x,r.y,{format:ao,type:Zi})),f.uniforms.shadow_pass.value=C.map.depthTexture,f.uniforms.resolution.value=C.mapSize,f.uniforms.radius.value=C.radius,n.setRenderTarget(C.mapPass),n.clear(),n.renderBufferDirect(A,null,y,f,_,null),h.uniforms.shadow_pass.value=C.mapPass.texture,h.uniforms.resolution.value=C.mapSize,h.uniforms.radius.value=C.radius,n.setRenderTarget(C.map),n.clear(),n.renderBufferDirect(A,null,y,h,_,null)}function w(C,A,y,S){let j=null,T=y.isPointLight===!0?C.customDistanceMaterial:C.customDepthMaterial;if(T!==void 0)j=T;else if(j=y.isPointLight===!0?c:a,n.localClippingEnabled&&A.clipShadows===!0&&Array.isArray(A.clippingPlanes)&&A.clippingPlanes.length!==0||A.displacementMap&&A.displacementScale!==0||A.alphaMap&&A.alphaTest>0||A.map&&A.alphaTest>0||A.alphaToCoverage===!0){let O=j.uuid,k=A.uuid,G=l[O];G===void 0&&(G={},l[O]=G);let B=G[k];B===void 0&&(B=j.clone(),G[k]=B,A.addEventListener("dispose",D)),j=B}if(j.visible=A.visible,j.wireframe=A.wireframe,S===Aa?j.side=A.shadowSide!==null?A.shadowSide:A.side:j.side=A.shadowSide!==null?A.shadowSide:d[A.side],j.alphaMap=A.alphaMap,j.alphaTest=A.alphaToCoverage===!0?.5:A.alphaTest,j.map=A.map,j.clipShadows=A.clipShadows,j.clippingPlanes=A.clippingPlanes,j.clipIntersection=A.clipIntersection,j.displacementMap=A.displacementMap,j.displacementScale=A.displacementScale,j.displacementBias=A.displacementBias,j.wireframeLinewidth=A.wireframeLinewidth,j.linewidth=A.linewidth,y.isPointLight===!0&&j.isMeshDistanceMaterial===!0){let O=n.properties.get(j);O.light=y}return j}function b(C,A,y,S,j){if(C.visible===!1)return;if(C.layers.test(A.layers)&&(C.isMesh||C.isLine||C.isPoints)&&(C.castShadow||C.receiveShadow&&j===Aa)&&(!C.frustumCulled||i.intersectsObject(C))){C.modelViewMatrix.multiplyMatrices(y.matrixWorldInverse,C.matrixWorld);let k=e.update(C),G=C.material;if(Array.isArray(G)){let B=k.groups;for(let H=0,L=B.length;H<L;H++){let ee=B[H],Z=G[ee.materialIndex];if(Z&&Z.visible){let de=w(C,Z,S,j);C.onBeforeShadow(n,C,A,y,k,de,ee),n.renderBufferDirect(y,null,k,de,C,ee),C.onAfterShadow(n,C,A,y,k,de,ee)}}}else if(G.visible){let B=w(C,G,S,j);C.onBeforeShadow(n,C,A,y,k,B,null),n.renderBufferDirect(y,null,k,B,C,null),C.onAfterShadow(n,C,A,y,k,B,null)}}let O=C.children;for(let k=0,G=O.length;k<G;k++)b(O[k],A,y,S,j)}function D(C){C.target.removeEventListener("dispose",D);for(let y in l){let S=l[y],j=C.target.uuid;j in S&&(S[j].dispose(),delete S[j])}}}function lk(n,e){function t(){let R=!1,se=new Pt,ne=null,me=new Pt(0,0,0,0);return{setMask:function(K){ne!==K&&!R&&(n.colorMask(K,K,K,K),ne=K)},setLocked:function(K){R=K},setClear:function(K,W,xe,Ue,Tt){Tt===!0&&(K*=Ue,W*=Ue,xe*=Ue),se.set(K,W,xe,Ue),me.equals(se)===!1&&(n.clearColor(K,W,xe,Ue),me.copy(se))},reset:function(){R=!1,ne=null,me.set(-1,0,0,0)}}}function i(){let R=!1,se=!1,ne=null,me=null,K=null;return{setReversed:function(W){if(se!==W){let xe=e.get("EXT_clip_control");W?xe.clipControlEXT(xe.LOWER_LEFT_EXT,xe.ZERO_TO_ONE_EXT):xe.clipControlEXT(xe.LOWER_LEFT_EXT,xe.NEGATIVE_ONE_TO_ONE_EXT),se=W;let Ue=K;K=null,this.setClear(Ue)}},getReversed:function(){return se},setTest:function(W){W?ie(n.DEPTH_TEST):oe(n.DEPTH_TEST)},setMask:function(W){ne!==W&&!R&&(n.depthMask(W),ne=W)},setFunc:function(W){if(se&&(W=RE[W]),me!==W){switch(W){case Bf:n.depthFunc(n.NEVER);break;case Vf:n.depthFunc(n.ALWAYS);break;case Hf:n.depthFunc(n.LESS);break;case ro:n.depthFunc(n.LEQUAL);break;case zf:n.depthFunc(n.EQUAL);break;case Gf:n.depthFunc(n.GEQUAL);break;case jf:n.depthFunc(n.GREATER);break;case Wf:n.depthFunc(n.NOTEQUAL);break;default:n.depthFunc(n.LEQUAL)}me=W}},setLocked:function(W){R=W},setClear:function(W){K!==W&&(K=W,se&&(W=1-W),n.clearDepth(W))},reset:function(){R=!1,ne=null,me=null,K=null,se=!1}}}function r(){let R=!1,se=null,ne=null,me=null,K=null,W=null,xe=null,Ue=null,Tt=null;return{setTest:function(yt){R||(yt?ie(n.STENCIL_TEST):oe(n.STENCIL_TEST))},setMask:function(yt){se!==yt&&!R&&(n.stencilMask(yt),se=yt)},setFunc:function(yt,Qi,er){(ne!==yt||me!==Qi||K!==er)&&(n.stencilFunc(yt,Qi,er),ne=yt,me=Qi,K=er)},setOp:function(yt,Qi,er){(W!==yt||xe!==Qi||Ue!==er)&&(n.stencilOp(yt,Qi,er),W=yt,xe=Qi,Ue=er)},setLocked:function(yt){R=yt},setClear:function(yt){Tt!==yt&&(n.clearStencil(yt),Tt=yt)},reset:function(){R=!1,se=null,ne=null,me=null,K=null,W=null,xe=null,Ue=null,Tt=null}}}let s=new t,o=new i,a=new r,c=new WeakMap,l=new WeakMap,u={},d={},f=new WeakMap,h=[],g=null,_=!1,m=null,p=null,M=null,w=null,b=null,D=null,C=null,A=new ot(0,0,0),y=0,S=!1,j=null,T=null,O=null,k=null,G=null,B=n.getParameter(n.MAX_COMBINED_TEXTURE_IMAGE_UNITS),H=!1,L=0,ee=n.getParameter(n.VERSION);ee.indexOf("WebGL")!==-1?(L=parseFloat(/^WebGL (\d)/.exec(ee)[1]),H=L>=1):ee.indexOf("OpenGL ES")!==-1&&(L=parseFloat(/^OpenGL ES (\d)/.exec(ee)[1]),H=L>=2);let Z=null,de={},ve=n.getParameter(n.SCISSOR_BOX),he=n.getParameter(n.VIEWPORT),$e=new Pt().fromArray(ve),At=new Pt().fromArray(he);function Dt(R,se,ne,me){let K=new Uint8Array(4),W=n.createTexture();n.bindTexture(R,W),n.texParameteri(R,n.TEXTURE_MIN_FILTER,n.NEAREST),n.texParameteri(R,n.TEXTURE_MAG_FILTER,n.NEAREST);for(let xe=0;xe<ne;xe++)R===n.TEXTURE_3D||R===n.TEXTURE_2D_ARRAY?n.texImage3D(se,0,n.RGBA,1,1,me,0,n.RGBA,n.UNSIGNED_BYTE,K):n.texImage2D(se+xe,0,n.RGBA,1,1,0,n.RGBA,n.UNSIGNED_BYTE,K);return W}let X={};X[n.TEXTURE_2D]=Dt(n.TEXTURE_2D,n.TEXTURE_2D,1),X[n.TEXTURE_CUBE_MAP]=Dt(n.TEXTURE_CUBE_MAP,n.TEXTURE_CUBE_MAP_POSITIVE_X,6),X[n.TEXTURE_2D_ARRAY]=Dt(n.TEXTURE_2D_ARRAY,n.TEXTURE_2D_ARRAY,1,1),X[n.TEXTURE_3D]=Dt(n.TEXTURE_3D,n.TEXTURE_3D,1,1),s.setClear(0,0,0,1),o.setClear(1),a.setClear(0),ie(n.DEPTH_TEST),o.setFunc(ro),Xe(!1),Ft(Ay),ie(n.CULL_FACE),vt(Yi);function ie(R){u[R]!==!0&&(n.enable(R),u[R]=!0)}function oe(R){u[R]!==!1&&(n.disable(R),u[R]=!1)}function We(R,se){return d[R]!==se?(n.bindFramebuffer(R,se),d[R]=se,R===n.DRAW_FRAMEBUFFER&&(d[n.FRAMEBUFFER]=se),R===n.FRAMEBUFFER&&(d[n.DRAW_FRAMEBUFFER]=se),!0):!1}function Ae(R,se){let ne=h,me=!1;if(R){ne=f.get(se),ne===void 0&&(ne=[],f.set(se,ne));let K=R.textures;if(ne.length!==K.length||ne[0]!==n.COLOR_ATTACHMENT0){for(let W=0,xe=K.length;W<xe;W++)ne[W]=n.COLOR_ATTACHMENT0+W;ne.length=K.length,me=!0}}else ne[0]!==n.BACK&&(ne[0]=n.BACK,me=!0);me&&n.drawBuffers(ne)}function Fe(R){return g!==R?(n.useProgram(R),g=R,!0):!1}let Zt={[is]:n.FUNC_ADD,[eE]:n.FUNC_SUBTRACT,[tE]:n.FUNC_REVERSE_SUBTRACT};Zt[nE]=n.MIN,Zt[iE]=n.MAX;let at={[rE]:n.ZERO,[sE]:n.ONE,[oE]:n.SRC_COLOR,[kf]:n.SRC_ALPHA,[fE]:n.SRC_ALPHA_SATURATE,[uE]:n.DST_COLOR,[cE]:n.DST_ALPHA,[aE]:n.ONE_MINUS_SRC_COLOR,[Uf]:n.ONE_MINUS_SRC_ALPHA,[dE]:n.ONE_MINUS_DST_COLOR,[lE]:n.ONE_MINUS_DST_ALPHA,[hE]:n.CONSTANT_COLOR,[pE]:n.ONE_MINUS_CONSTANT_COLOR,[mE]:n.CONSTANT_ALPHA,[gE]:n.ONE_MINUS_CONSTANT_ALPHA};function vt(R,se,ne,me,K,W,xe,Ue,Tt,yt){if(R===Yi){_===!0&&(oe(n.BLEND),_=!1);return}if(_===!1&&(ie(n.BLEND),_=!0),R!==Qb){if(R!==m||yt!==S){if((p!==is||b!==is)&&(n.blendEquation(n.FUNC_ADD),p=is,b=is),yt)switch(R){case io:n.blendFuncSeparate(n.ONE,n.ONE_MINUS_SRC_ALPHA,n.ONE,n.ONE_MINUS_SRC_ALPHA);break;case Ry:n.blendFunc(n.ONE,n.ONE);break;case Ny:n.blendFuncSeparate(n.ZERO,n.ONE_MINUS_SRC_COLOR,n.ZERO,n.ONE);break;case Py:n.blendFuncSeparate(n.DST_COLOR,n.ONE_MINUS_SRC_ALPHA,n.ZERO,n.ONE);break;default:Ne("WebGLState: Invalid blending: ",R);break}else switch(R){case io:n.blendFuncSeparate(n.SRC_ALPHA,n.ONE_MINUS_SRC_ALPHA,n.ONE,n.ONE_MINUS_SRC_ALPHA);break;case Ry:n.blendFuncSeparate(n.SRC_ALPHA,n.ONE,n.ONE,n.ONE);break;case Ny:Ne("WebGLState: SubtractiveBlending requires material.premultipliedAlpha = true");break;case Py:Ne("WebGLState: MultiplyBlending requires material.premultipliedAlpha = true");break;default:Ne("WebGLState: Invalid blending: ",R);break}M=null,w=null,D=null,C=null,A.set(0,0,0),y=0,m=R,S=yt}return}K=K||se,W=W||ne,xe=xe||me,(se!==p||K!==b)&&(n.blendEquationSeparate(Zt[se],Zt[K]),p=se,b=K),(ne!==M||me!==w||W!==D||xe!==C)&&(n.blendFuncSeparate(at[ne],at[me],at[W],at[xe]),M=ne,w=me,D=W,C=xe),(Ue.equals(A)===!1||Tt!==y)&&(n.blendColor(Ue.r,Ue.g,Ue.b,Tt),A.copy(Ue),y=Tt),m=R,S=!1}function Et(R,se){R.side===Xi?oe(n.CULL_FACE):ie(n.CULL_FACE);let ne=R.side===Nn;se&&(ne=!ne),Xe(ne),R.blending===io&&R.transparent===!1?vt(Yi):vt(R.blending,R.blendEquation,R.blendSrc,R.blendDst,R.blendEquationAlpha,R.blendSrcAlpha,R.blendDstAlpha,R.blendColor,R.blendAlpha,R.premultipliedAlpha),o.setFunc(R.depthFunc),o.setTest(R.depthTest),o.setMask(R.depthWrite),s.setMask(R.colorWrite);let me=R.stencilWrite;a.setTest(me),me&&(a.setMask(R.stencilWriteMask),a.setFunc(R.stencilFunc,R.stencilRef,R.stencilFuncMask),a.setOp(R.stencilFail,R.stencilZFail,R.stencilZPass)),zt(R.polygonOffset,R.polygonOffsetFactor,R.polygonOffsetUnits),R.alphaToCoverage===!0?ie(n.SAMPLE_ALPHA_TO_COVERAGE):oe(n.SAMPLE_ALPHA_TO_COVERAGE)}function Xe(R){j!==R&&(R?n.frontFace(n.CW):n.frontFace(n.CCW),j=R)}function Ft(R){R!==Zb?(ie(n.CULL_FACE),R!==T&&(R===Ay?n.cullFace(n.BACK):R===Jb?n.cullFace(n.FRONT):n.cullFace(n.FRONT_AND_BACK))):oe(n.CULL_FACE),T=R}function I(R){R!==O&&(H&&n.lineWidth(R),O=R)}function zt(R,se,ne){R?(ie(n.POLYGON_OFFSET_FILL),(k!==se||G!==ne)&&(k=se,G=ne,o.getReversed()&&(se=-se),n.polygonOffset(se,ne))):oe(n.POLYGON_OFFSET_FILL)}function ft(R){R?ie(n.SCISSOR_TEST):oe(n.SCISSOR_TEST)}function Ct(R){R===void 0&&(R=n.TEXTURE0+B-1),Z!==R&&(n.activeTexture(R),Z=R)}function be(R,se,ne){ne===void 0&&(Z===null?ne=n.TEXTURE0+B-1:ne=Z);let me=de[ne];me===void 0&&(me={type:void 0,texture:void 0},de[ne]=me),(me.type!==R||me.texture!==se)&&(Z!==ne&&(n.activeTexture(ne),Z=ne),n.bindTexture(R,se||X[R]),me.type=R,me.texture=se)}function E(){let R=de[Z];R!==void 0&&R.type!==void 0&&(n.bindTexture(R.type,null),R.type=void 0,R.texture=void 0)}function v(){try{n.compressedTexImage2D(...arguments)}catch(R){Ne("WebGLState:",R)}}function N(){try{n.compressedTexImage3D(...arguments)}catch(R){Ne("WebGLState:",R)}}function q(){try{n.texSubImage2D(...arguments)}catch(R){Ne("WebGLState:",R)}}function Y(){try{n.texSubImage3D(...arguments)}catch(R){Ne("WebGLState:",R)}}function $(){try{n.compressedTexSubImage2D(...arguments)}catch(R){Ne("WebGLState:",R)}}function ye(){try{n.compressedTexSubImage3D(...arguments)}catch(R){Ne("WebGLState:",R)}}function re(){try{n.texStorage2D(...arguments)}catch(R){Ne("WebGLState:",R)}}function De(){try{n.texStorage3D(...arguments)}catch(R){Ne("WebGLState:",R)}}function Pe(){try{n.texImage2D(...arguments)}catch(R){Ne("WebGLState:",R)}}function J(){try{n.texImage3D(...arguments)}catch(R){Ne("WebGLState:",R)}}function te(R){$e.equals(R)===!1&&(n.scissor(R.x,R.y,R.z,R.w),$e.copy(R))}function _e(R){At.equals(R)===!1&&(n.viewport(R.x,R.y,R.z,R.w),At.copy(R))}function Me(R,se){let ne=l.get(se);ne===void 0&&(ne=new WeakMap,l.set(se,ne));let me=ne.get(R);me===void 0&&(me=n.getUniformBlockIndex(se,R.name),ne.set(R,me))}function fe(R,se){let me=l.get(se).get(R);c.get(se)!==me&&(n.uniformBlockBinding(se,me,R.__bindingPointIndex),c.set(se,me))}function Ye(){n.disable(n.BLEND),n.disable(n.CULL_FACE),n.disable(n.DEPTH_TEST),n.disable(n.POLYGON_OFFSET_FILL),n.disable(n.SCISSOR_TEST),n.disable(n.STENCIL_TEST),n.disable(n.SAMPLE_ALPHA_TO_COVERAGE),n.blendEquation(n.FUNC_ADD),n.blendFunc(n.ONE,n.ZERO),n.blendFuncSeparate(n.ONE,n.ZERO,n.ONE,n.ZERO),n.blendColor(0,0,0,0),n.colorMask(!0,!0,!0,!0),n.clearColor(0,0,0,0),n.depthMask(!0),n.depthFunc(n.LESS),o.setReversed(!1),n.clearDepth(1),n.stencilMask(4294967295),n.stencilFunc(n.ALWAYS,0,4294967295),n.stencilOp(n.KEEP,n.KEEP,n.KEEP),n.clearStencil(0),n.cullFace(n.BACK),n.frontFace(n.CCW),n.polygonOffset(0,0),n.activeTexture(n.TEXTURE0),n.bindFramebuffer(n.FRAMEBUFFER,null),n.bindFramebuffer(n.DRAW_FRAMEBUFFER,null),n.bindFramebuffer(n.READ_FRAMEBUFFER,null),n.useProgram(null),n.lineWidth(1),n.scissor(0,0,n.canvas.width,n.canvas.height),n.viewport(0,0,n.canvas.width,n.canvas.height),u={},Z=null,de={},d={},f=new WeakMap,h=[],g=null,_=!1,m=null,p=null,M=null,w=null,b=null,D=null,C=null,A=new ot(0,0,0),y=0,S=!1,j=null,T=null,O=null,k=null,G=null,$e.set(0,0,n.canvas.width,n.canvas.height),At.set(0,0,n.canvas.width,n.canvas.height),s.reset(),o.reset(),a.reset()}return{buffers:{color:s,depth:o,stencil:a},enable:ie,disable:oe,bindFramebuffer:We,drawBuffers:Ae,useProgram:Fe,setBlending:vt,setMaterial:Et,setFlipSided:Xe,setCullFace:Ft,setLineWidth:I,setPolygonOffset:zt,setScissorTest:ft,activeTexture:Ct,bindTexture:be,unbindTexture:E,compressedTexImage2D:v,compressedTexImage3D:N,texImage2D:Pe,texImage3D:J,updateUBOMapping:Me,uniformBlockBinding:fe,texStorage2D:re,texStorage3D:De,texSubImage2D:q,texSubImage3D:Y,compressedTexSubImage2D:$,compressedTexSubImage3D:ye,scissor:te,viewport:_e,reset:Ye}}function uk(n,e,t,i,r,s,o){let a=e.has("WEBGL_multisampled_render_to_texture")?e.get("WEBGL_multisampled_render_to_texture"):null,c=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),l=new it,u=new WeakMap,d,f=new WeakMap,h=!1;try{h=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function g(E,v){return h?new OffscreenCanvas(E,v):nl("canvas")}function _(E,v,N){let q=1,Y=be(E);if((Y.width>N||Y.height>N)&&(q=N/Math.max(Y.width,Y.height)),q<1)if(typeof HTMLImageElement<"u"&&E instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&E instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&E instanceof ImageBitmap||typeof VideoFrame<"u"&&E instanceof VideoFrame){let $=Math.floor(q*Y.width),ye=Math.floor(q*Y.height);d===void 0&&(d=g($,ye));let re=v?g($,ye):d;return re.width=$,re.height=ye,re.getContext("2d").drawImage(E,0,0,$,ye),Le("WebGLRenderer: Texture has been resized from ("+Y.width+"x"+Y.height+") to ("+$+"x"+ye+")."),re}else return"data"in E&&Le("WebGLRenderer: Image in DataTexture is too big ("+Y.width+"x"+Y.height+")."),E;return E}function m(E){return E.generateMipmaps}function p(E){n.generateMipmap(E)}function M(E){return E.isWebGLCubeRenderTarget?n.TEXTURE_CUBE_MAP:E.isWebGL3DRenderTarget?n.TEXTURE_3D:E.isWebGLArrayRenderTarget||E.isCompressedArrayTexture?n.TEXTURE_2D_ARRAY:n.TEXTURE_2D}function w(E,v,N,q,Y=!1){if(E!==null){if(n[E]!==void 0)return n[E];Le("WebGLRenderer: Attempt to use non-existing WebGL internal format '"+E+"'")}let $=v;if(v===n.RED&&(N===n.FLOAT&&($=n.R32F),N===n.HALF_FLOAT&&($=n.R16F),N===n.UNSIGNED_BYTE&&($=n.R8)),v===n.RED_INTEGER&&(N===n.UNSIGNED_BYTE&&($=n.R8UI),N===n.UNSIGNED_SHORT&&($=n.R16UI),N===n.UNSIGNED_INT&&($=n.R32UI),N===n.BYTE&&($=n.R8I),N===n.SHORT&&($=n.R16I),N===n.INT&&($=n.R32I)),v===n.RG&&(N===n.FLOAT&&($=n.RG32F),N===n.HALF_FLOAT&&($=n.RG16F),N===n.UNSIGNED_BYTE&&($=n.RG8)),v===n.RG_INTEGER&&(N===n.UNSIGNED_BYTE&&($=n.RG8UI),N===n.UNSIGNED_SHORT&&($=n.RG16UI),N===n.UNSIGNED_INT&&($=n.RG32UI),N===n.BYTE&&($=n.RG8I),N===n.SHORT&&($=n.RG16I),N===n.INT&&($=n.RG32I)),v===n.RGB_INTEGER&&(N===n.UNSIGNED_BYTE&&($=n.RGB8UI),N===n.UNSIGNED_SHORT&&($=n.RGB16UI),N===n.UNSIGNED_INT&&($=n.RGB32UI),N===n.BYTE&&($=n.RGB8I),N===n.SHORT&&($=n.RGB16I),N===n.INT&&($=n.RGB32I)),v===n.RGBA_INTEGER&&(N===n.UNSIGNED_BYTE&&($=n.RGBA8UI),N===n.UNSIGNED_SHORT&&($=n.RGBA16UI),N===n.UNSIGNED_INT&&($=n.RGBA32UI),N===n.BYTE&&($=n.RGBA8I),N===n.SHORT&&($=n.RGBA16I),N===n.INT&&($=n.RGBA32I)),v===n.RGB&&(N===n.UNSIGNED_INT_5_9_9_9_REV&&($=n.RGB9_E5),N===n.UNSIGNED_INT_10F_11F_11F_REV&&($=n.R11F_G11F_B10F)),v===n.RGBA){let ye=Y?tl:st.getTransfer(q);N===n.FLOAT&&($=n.RGBA32F),N===n.HALF_FLOAT&&($=n.RGBA16F),N===n.UNSIGNED_BYTE&&($=ye===gt?n.SRGB8_ALPHA8:n.RGBA8),N===n.UNSIGNED_SHORT_4_4_4_4&&($=n.RGBA4),N===n.UNSIGNED_SHORT_5_5_5_1&&($=n.RGB5_A1)}return($===n.R16F||$===n.R32F||$===n.RG16F||$===n.RG32F||$===n.RGBA16F||$===n.RGBA32F)&&e.get("EXT_color_buffer_float"),$}function b(E,v){let N;return E?v===null||v===Pi||v===Na?N=n.DEPTH24_STENCIL8:v===Oi?N=n.DEPTH32F_STENCIL8:v===Ra&&(N=n.DEPTH24_STENCIL8,Le("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")):v===null||v===Pi||v===Na?N=n.DEPTH_COMPONENT24:v===Oi?N=n.DEPTH_COMPONENT32F:v===Ra&&(N=n.DEPTH_COMPONENT16),N}function D(E,v){return m(E)===!0||E.isFramebufferTexture&&E.minFilter!==sn&&E.minFilter!==fn?Math.log2(Math.max(v.width,v.height))+1:E.mipmaps!==void 0&&E.mipmaps.length>0?E.mipmaps.length:E.isCompressedTexture&&Array.isArray(E.image)?v.mipmaps.length:1}function C(E){let v=E.target;v.removeEventListener("dispose",C),y(v),v.isVideoTexture&&u.delete(v)}function A(E){let v=E.target;v.removeEventListener("dispose",A),j(v)}function y(E){let v=i.get(E);if(v.__webglInit===void 0)return;let N=E.source,q=f.get(N);if(q){let Y=q[v.__cacheKey];Y.usedTimes--,Y.usedTimes===0&&S(E),Object.keys(q).length===0&&f.delete(N)}i.remove(E)}function S(E){let v=i.get(E);n.deleteTexture(v.__webglTexture);let N=E.source,q=f.get(N);delete q[v.__cacheKey],o.memory.textures--}function j(E){let v=i.get(E);if(E.depthTexture&&(E.depthTexture.dispose(),i.remove(E.depthTexture)),E.isWebGLCubeRenderTarget)for(let q=0;q<6;q++){if(Array.isArray(v.__webglFramebuffer[q]))for(let Y=0;Y<v.__webglFramebuffer[q].length;Y++)n.deleteFramebuffer(v.__webglFramebuffer[q][Y]);else n.deleteFramebuffer(v.__webglFramebuffer[q]);v.__webglDepthbuffer&&n.deleteRenderbuffer(v.__webglDepthbuffer[q])}else{if(Array.isArray(v.__webglFramebuffer))for(let q=0;q<v.__webglFramebuffer.length;q++)n.deleteFramebuffer(v.__webglFramebuffer[q]);else n.deleteFramebuffer(v.__webglFramebuffer);if(v.__webglDepthbuffer&&n.deleteRenderbuffer(v.__webglDepthbuffer),v.__webglMultisampledFramebuffer&&n.deleteFramebuffer(v.__webglMultisampledFramebuffer),v.__webglColorRenderbuffer)for(let q=0;q<v.__webglColorRenderbuffer.length;q++)v.__webglColorRenderbuffer[q]&&n.deleteRenderbuffer(v.__webglColorRenderbuffer[q]);v.__webglDepthRenderbuffer&&n.deleteRenderbuffer(v.__webglDepthRenderbuffer)}let N=E.textures;for(let q=0,Y=N.length;q<Y;q++){let $=i.get(N[q]);$.__webglTexture&&(n.deleteTexture($.__webglTexture),o.memory.textures--),i.remove(N[q])}i.remove(E)}let T=0;function O(){T=0}function k(){let E=T;return E>=r.maxTextures&&Le("WebGLTextures: Trying to use "+E+" texture units while this GPU supports only "+r.maxTextures),T+=1,E}function G(E){let v=[];return v.push(E.wrapS),v.push(E.wrapT),v.push(E.wrapR||0),v.push(E.magFilter),v.push(E.minFilter),v.push(E.anisotropy),v.push(E.internalFormat),v.push(E.format),v.push(E.type),v.push(E.generateMipmaps),v.push(E.premultiplyAlpha),v.push(E.flipY),v.push(E.unpackAlignment),v.push(E.colorSpace),v.join()}function B(E,v){let N=i.get(E);if(E.isVideoTexture&&ft(E),E.isRenderTargetTexture===!1&&E.isExternalTexture!==!0&&E.version>0&&N.__version!==E.version){let q=E.image;if(q===null)Le("WebGLRenderer: Texture marked for update but no image data found.");else if(q.complete===!1)Le("WebGLRenderer: Texture marked for update but image is incomplete");else{X(N,E,v);return}}else E.isExternalTexture&&(N.__webglTexture=E.sourceTexture?E.sourceTexture:null);t.bindTexture(n.TEXTURE_2D,N.__webglTexture,n.TEXTURE0+v)}function H(E,v){let N=i.get(E);if(E.isRenderTargetTexture===!1&&E.version>0&&N.__version!==E.version){X(N,E,v);return}else E.isExternalTexture&&(N.__webglTexture=E.sourceTexture?E.sourceTexture:null);t.bindTexture(n.TEXTURE_2D_ARRAY,N.__webglTexture,n.TEXTURE0+v)}function L(E,v){let N=i.get(E);if(E.isRenderTargetTexture===!1&&E.version>0&&N.__version!==E.version){X(N,E,v);return}t.bindTexture(n.TEXTURE_3D,N.__webglTexture,n.TEXTURE0+v)}function ee(E,v){let N=i.get(E);if(E.isCubeDepthTexture!==!0&&E.version>0&&N.__version!==E.version){ie(N,E,v);return}t.bindTexture(n.TEXTURE_CUBE_MAP,N.__webglTexture,n.TEXTURE0+v)}let Z={[$f]:n.REPEAT,[ji]:n.CLAMP_TO_EDGE,[qf]:n.MIRRORED_REPEAT},de={[sn]:n.NEAREST,[_E]:n.NEAREST_MIPMAP_NEAREST,[Ml]:n.NEAREST_MIPMAP_LINEAR,[fn]:n.LINEAR,[vh]:n.LINEAR_MIPMAP_NEAREST,[fs]:n.LINEAR_MIPMAP_LINEAR},ve={[SE]:n.NEVER,[TE]:n.ALWAYS,[bE]:n.LESS,[np]:n.LEQUAL,[EE]:n.EQUAL,[ip]:n.GEQUAL,[wE]:n.GREATER,[CE]:n.NOTEQUAL};function he(E,v){if(v.type===Oi&&e.has("OES_texture_float_linear")===!1&&(v.magFilter===fn||v.magFilter===vh||v.magFilter===Ml||v.magFilter===fs||v.minFilter===fn||v.minFilter===vh||v.minFilter===Ml||v.minFilter===fs)&&Le("WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),n.texParameteri(E,n.TEXTURE_WRAP_S,Z[v.wrapS]),n.texParameteri(E,n.TEXTURE_WRAP_T,Z[v.wrapT]),(E===n.TEXTURE_3D||E===n.TEXTURE_2D_ARRAY)&&n.texParameteri(E,n.TEXTURE_WRAP_R,Z[v.wrapR]),n.texParameteri(E,n.TEXTURE_MAG_FILTER,de[v.magFilter]),n.texParameteri(E,n.TEXTURE_MIN_FILTER,de[v.minFilter]),v.compareFunction&&(n.texParameteri(E,n.TEXTURE_COMPARE_MODE,n.COMPARE_REF_TO_TEXTURE),n.texParameteri(E,n.TEXTURE_COMPARE_FUNC,ve[v.compareFunction])),e.has("EXT_texture_filter_anisotropic")===!0){if(v.magFilter===sn||v.minFilter!==Ml&&v.minFilter!==fs||v.type===Oi&&e.has("OES_texture_float_linear")===!1)return;if(v.anisotropy>1||i.get(v).__currentAnisotropy){let N=e.get("EXT_texture_filter_anisotropic");n.texParameterf(E,N.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(v.anisotropy,r.getMaxAnisotropy())),i.get(v).__currentAnisotropy=v.anisotropy}}}function $e(E,v){let N=!1;E.__webglInit===void 0&&(E.__webglInit=!0,v.addEventListener("dispose",C));let q=v.source,Y=f.get(q);Y===void 0&&(Y={},f.set(q,Y));let $=G(v);if($!==E.__cacheKey){Y[$]===void 0&&(Y[$]={texture:n.createTexture(),usedTimes:0},o.memory.textures++,N=!0),Y[$].usedTimes++;let ye=Y[E.__cacheKey];ye!==void 0&&(Y[E.__cacheKey].usedTimes--,ye.usedTimes===0&&S(v)),E.__cacheKey=$,E.__webglTexture=Y[$].texture}return N}function At(E,v,N){return Math.floor(Math.floor(E/N)/v)}function Dt(E,v,N,q){let $=E.updateRanges;if($.length===0)t.texSubImage2D(n.TEXTURE_2D,0,0,0,v.width,v.height,N,q,v.data);else{$.sort((J,te)=>J.start-te.start);let ye=0;for(let J=1;J<$.length;J++){let te=$[ye],_e=$[J],Me=te.start+te.count,fe=At(_e.start,v.width,4),Ye=At(te.start,v.width,4);_e.start<=Me+1&&fe===Ye&&At(_e.start+_e.count-1,v.width,4)===fe?te.count=Math.max(te.count,_e.start+_e.count-te.start):(++ye,$[ye]=_e)}$.length=ye+1;let re=n.getParameter(n.UNPACK_ROW_LENGTH),De=n.getParameter(n.UNPACK_SKIP_PIXELS),Pe=n.getParameter(n.UNPACK_SKIP_ROWS);n.pixelStorei(n.UNPACK_ROW_LENGTH,v.width);for(let J=0,te=$.length;J<te;J++){let _e=$[J],Me=Math.floor(_e.start/4),fe=Math.ceil(_e.count/4),Ye=Me%v.width,R=Math.floor(Me/v.width),se=fe,ne=1;n.pixelStorei(n.UNPACK_SKIP_PIXELS,Ye),n.pixelStorei(n.UNPACK_SKIP_ROWS,R),t.texSubImage2D(n.TEXTURE_2D,0,Ye,R,se,ne,N,q,v.data)}E.clearUpdateRanges(),n.pixelStorei(n.UNPACK_ROW_LENGTH,re),n.pixelStorei(n.UNPACK_SKIP_PIXELS,De),n.pixelStorei(n.UNPACK_SKIP_ROWS,Pe)}}function X(E,v,N){let q=n.TEXTURE_2D;(v.isDataArrayTexture||v.isCompressedArrayTexture)&&(q=n.TEXTURE_2D_ARRAY),v.isData3DTexture&&(q=n.TEXTURE_3D);let Y=$e(E,v),$=v.source;t.bindTexture(q,E.__webglTexture,n.TEXTURE0+N);let ye=i.get($);if($.version!==ye.__version||Y===!0){t.activeTexture(n.TEXTURE0+N);let re=st.getPrimaries(st.workingColorSpace),De=v.colorSpace===Dr?null:st.getPrimaries(v.colorSpace),Pe=v.colorSpace===Dr||re===De?n.NONE:n.BROWSER_DEFAULT_WEBGL;n.pixelStorei(n.UNPACK_FLIP_Y_WEBGL,v.flipY),n.pixelStorei(n.UNPACK_PREMULTIPLY_ALPHA_WEBGL,v.premultiplyAlpha),n.pixelStorei(n.UNPACK_ALIGNMENT,v.unpackAlignment),n.pixelStorei(n.UNPACK_COLORSPACE_CONVERSION_WEBGL,Pe);let J=_(v.image,!1,r.maxTextureSize);J=Ct(v,J);let te=s.convert(v.format,v.colorSpace),_e=s.convert(v.type),Me=w(v.internalFormat,te,_e,v.colorSpace,v.isVideoTexture);he(q,v);let fe,Ye=v.mipmaps,R=v.isVideoTexture!==!0,se=ye.__version===void 0||Y===!0,ne=$.dataReady,me=D(v,J);if(v.isDepthTexture)Me=b(v.format===hs,v.type),se&&(R?t.texStorage2D(n.TEXTURE_2D,1,Me,J.width,J.height):t.texImage2D(n.TEXTURE_2D,0,Me,J.width,J.height,0,te,_e,null));else if(v.isDataTexture)if(Ye.length>0){R&&se&&t.texStorage2D(n.TEXTURE_2D,me,Me,Ye[0].width,Ye[0].height);for(let K=0,W=Ye.length;K<W;K++)fe=Ye[K],R?ne&&t.texSubImage2D(n.TEXTURE_2D,K,0,0,fe.width,fe.height,te,_e,fe.data):t.texImage2D(n.TEXTURE_2D,K,Me,fe.width,fe.height,0,te,_e,fe.data);v.generateMipmaps=!1}else R?(se&&t.texStorage2D(n.TEXTURE_2D,me,Me,J.width,J.height),ne&&Dt(v,J,te,_e)):t.texImage2D(n.TEXTURE_2D,0,Me,J.width,J.height,0,te,_e,J.data);else if(v.isCompressedTexture)if(v.isCompressedArrayTexture){R&&se&&t.texStorage3D(n.TEXTURE_2D_ARRAY,me,Me,Ye[0].width,Ye[0].height,J.depth);for(let K=0,W=Ye.length;K<W;K++)if(fe=Ye[K],v.format!==hi)if(te!==null)if(R){if(ne)if(v.layerUpdates.size>0){let xe=t_(fe.width,fe.height,v.format,v.type);for(let Ue of v.layerUpdates){let Tt=fe.data.subarray(Ue*xe/fe.data.BYTES_PER_ELEMENT,(Ue+1)*xe/fe.data.BYTES_PER_ELEMENT);t.compressedTexSubImage3D(n.TEXTURE_2D_ARRAY,K,0,0,Ue,fe.width,fe.height,1,te,Tt)}v.clearLayerUpdates()}else t.compressedTexSubImage3D(n.TEXTURE_2D_ARRAY,K,0,0,0,fe.width,fe.height,J.depth,te,fe.data)}else t.compressedTexImage3D(n.TEXTURE_2D_ARRAY,K,Me,fe.width,fe.height,J.depth,0,fe.data,0,0);else Le("WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else R?ne&&t.texSubImage3D(n.TEXTURE_2D_ARRAY,K,0,0,0,fe.width,fe.height,J.depth,te,_e,fe.data):t.texImage3D(n.TEXTURE_2D_ARRAY,K,Me,fe.width,fe.height,J.depth,0,te,_e,fe.data)}else{R&&se&&t.texStorage2D(n.TEXTURE_2D,me,Me,Ye[0].width,Ye[0].height);for(let K=0,W=Ye.length;K<W;K++)fe=Ye[K],v.format!==hi?te!==null?R?ne&&t.compressedTexSubImage2D(n.TEXTURE_2D,K,0,0,fe.width,fe.height,te,fe.data):t.compressedTexImage2D(n.TEXTURE_2D,K,Me,fe.width,fe.height,0,fe.data):Le("WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):R?ne&&t.texSubImage2D(n.TEXTURE_2D,K,0,0,fe.width,fe.height,te,_e,fe.data):t.texImage2D(n.TEXTURE_2D,K,Me,fe.width,fe.height,0,te,_e,fe.data)}else if(v.isDataArrayTexture)if(R){if(se&&t.texStorage3D(n.TEXTURE_2D_ARRAY,me,Me,J.width,J.height,J.depth),ne)if(v.layerUpdates.size>0){let K=t_(J.width,J.height,v.format,v.type);for(let W of v.layerUpdates){let xe=J.data.subarray(W*K/J.data.BYTES_PER_ELEMENT,(W+1)*K/J.data.BYTES_PER_ELEMENT);t.texSubImage3D(n.TEXTURE_2D_ARRAY,0,0,0,W,J.width,J.height,1,te,_e,xe)}v.clearLayerUpdates()}else t.texSubImage3D(n.TEXTURE_2D_ARRAY,0,0,0,0,J.width,J.height,J.depth,te,_e,J.data)}else t.texImage3D(n.TEXTURE_2D_ARRAY,0,Me,J.width,J.height,J.depth,0,te,_e,J.data);else if(v.isData3DTexture)R?(se&&t.texStorage3D(n.TEXTURE_3D,me,Me,J.width,J.height,J.depth),ne&&t.texSubImage3D(n.TEXTURE_3D,0,0,0,0,J.width,J.height,J.depth,te,_e,J.data)):t.texImage3D(n.TEXTURE_3D,0,Me,J.width,J.height,J.depth,0,te,_e,J.data);else if(v.isFramebufferTexture){if(se)if(R)t.texStorage2D(n.TEXTURE_2D,me,Me,J.width,J.height);else{let K=J.width,W=J.height;for(let xe=0;xe<me;xe++)t.texImage2D(n.TEXTURE_2D,xe,Me,K,W,0,te,_e,null),K>>=1,W>>=1}}else if(Ye.length>0){if(R&&se){let K=be(Ye[0]);t.texStorage2D(n.TEXTURE_2D,me,Me,K.width,K.height)}for(let K=0,W=Ye.length;K<W;K++)fe=Ye[K],R?ne&&t.texSubImage2D(n.TEXTURE_2D,K,0,0,te,_e,fe):t.texImage2D(n.TEXTURE_2D,K,Me,te,_e,fe);v.generateMipmaps=!1}else if(R){if(se){let K=be(J);t.texStorage2D(n.TEXTURE_2D,me,Me,K.width,K.height)}ne&&t.texSubImage2D(n.TEXTURE_2D,0,0,0,te,_e,J)}else t.texImage2D(n.TEXTURE_2D,0,Me,te,_e,J);m(v)&&p(q),ye.__version=$.version,v.onUpdate&&v.onUpdate(v)}E.__version=v.version}function ie(E,v,N){if(v.image.length!==6)return;let q=$e(E,v),Y=v.source;t.bindTexture(n.TEXTURE_CUBE_MAP,E.__webglTexture,n.TEXTURE0+N);let $=i.get(Y);if(Y.version!==$.__version||q===!0){t.activeTexture(n.TEXTURE0+N);let ye=st.getPrimaries(st.workingColorSpace),re=v.colorSpace===Dr?null:st.getPrimaries(v.colorSpace),De=v.colorSpace===Dr||ye===re?n.NONE:n.BROWSER_DEFAULT_WEBGL;n.pixelStorei(n.UNPACK_FLIP_Y_WEBGL,v.flipY),n.pixelStorei(n.UNPACK_PREMULTIPLY_ALPHA_WEBGL,v.premultiplyAlpha),n.pixelStorei(n.UNPACK_ALIGNMENT,v.unpackAlignment),n.pixelStorei(n.UNPACK_COLORSPACE_CONVERSION_WEBGL,De);let Pe=v.isCompressedTexture||v.image[0].isCompressedTexture,J=v.image[0]&&v.image[0].isDataTexture,te=[];for(let W=0;W<6;W++)!Pe&&!J?te[W]=_(v.image[W],!0,r.maxCubemapSize):te[W]=J?v.image[W].image:v.image[W],te[W]=Ct(v,te[W]);let _e=te[0],Me=s.convert(v.format,v.colorSpace),fe=s.convert(v.type),Ye=w(v.internalFormat,Me,fe,v.colorSpace),R=v.isVideoTexture!==!0,se=$.__version===void 0||q===!0,ne=Y.dataReady,me=D(v,_e);he(n.TEXTURE_CUBE_MAP,v);let K;if(Pe){R&&se&&t.texStorage2D(n.TEXTURE_CUBE_MAP,me,Ye,_e.width,_e.height);for(let W=0;W<6;W++){K=te[W].mipmaps;for(let xe=0;xe<K.length;xe++){let Ue=K[xe];v.format!==hi?Me!==null?R?ne&&t.compressedTexSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+W,xe,0,0,Ue.width,Ue.height,Me,Ue.data):t.compressedTexImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+W,xe,Ye,Ue.width,Ue.height,0,Ue.data):Le("WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):R?ne&&t.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+W,xe,0,0,Ue.width,Ue.height,Me,fe,Ue.data):t.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+W,xe,Ye,Ue.width,Ue.height,0,Me,fe,Ue.data)}}}else{if(K=v.mipmaps,R&&se){K.length>0&&me++;let W=be(te[0]);t.texStorage2D(n.TEXTURE_CUBE_MAP,me,Ye,W.width,W.height)}for(let W=0;W<6;W++)if(J){R?ne&&t.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+W,0,0,0,te[W].width,te[W].height,Me,fe,te[W].data):t.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+W,0,Ye,te[W].width,te[W].height,0,Me,fe,te[W].data);for(let xe=0;xe<K.length;xe++){let Tt=K[xe].image[W].image;R?ne&&t.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+W,xe+1,0,0,Tt.width,Tt.height,Me,fe,Tt.data):t.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+W,xe+1,Ye,Tt.width,Tt.height,0,Me,fe,Tt.data)}}else{R?ne&&t.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+W,0,0,0,Me,fe,te[W]):t.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+W,0,Ye,Me,fe,te[W]);for(let xe=0;xe<K.length;xe++){let Ue=K[xe];R?ne&&t.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+W,xe+1,0,0,Me,fe,Ue.image[W]):t.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+W,xe+1,Ye,Me,fe,Ue.image[W])}}}m(v)&&p(n.TEXTURE_CUBE_MAP),$.__version=Y.version,v.onUpdate&&v.onUpdate(v)}E.__version=v.version}function oe(E,v,N,q,Y,$){let ye=s.convert(N.format,N.colorSpace),re=s.convert(N.type),De=w(N.internalFormat,ye,re,N.colorSpace),Pe=i.get(v),J=i.get(N);if(J.__renderTarget=v,!Pe.__hasExternalTextures){let te=Math.max(1,v.width>>$),_e=Math.max(1,v.height>>$);Y===n.TEXTURE_3D||Y===n.TEXTURE_2D_ARRAY?t.texImage3D(Y,$,De,te,_e,v.depth,0,ye,re,null):t.texImage2D(Y,$,De,te,_e,0,ye,re,null)}t.bindFramebuffer(n.FRAMEBUFFER,E),zt(v)?a.framebufferTexture2DMultisampleEXT(n.FRAMEBUFFER,q,Y,J.__webglTexture,0,I(v)):(Y===n.TEXTURE_2D||Y>=n.TEXTURE_CUBE_MAP_POSITIVE_X&&Y<=n.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&n.framebufferTexture2D(n.FRAMEBUFFER,q,Y,J.__webglTexture,$),t.bindFramebuffer(n.FRAMEBUFFER,null)}function We(E,v,N){if(n.bindRenderbuffer(n.RENDERBUFFER,E),v.depthBuffer){let q=v.depthTexture,Y=q&&q.isDepthTexture?q.type:null,$=b(v.stencilBuffer,Y),ye=v.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT;zt(v)?a.renderbufferStorageMultisampleEXT(n.RENDERBUFFER,I(v),$,v.width,v.height):N?n.renderbufferStorageMultisample(n.RENDERBUFFER,I(v),$,v.width,v.height):n.renderbufferStorage(n.RENDERBUFFER,$,v.width,v.height),n.framebufferRenderbuffer(n.FRAMEBUFFER,ye,n.RENDERBUFFER,E)}else{let q=v.textures;for(let Y=0;Y<q.length;Y++){let $=q[Y],ye=s.convert($.format,$.colorSpace),re=s.convert($.type),De=w($.internalFormat,ye,re,$.colorSpace);zt(v)?a.renderbufferStorageMultisampleEXT(n.RENDERBUFFER,I(v),De,v.width,v.height):N?n.renderbufferStorageMultisample(n.RENDERBUFFER,I(v),De,v.width,v.height):n.renderbufferStorage(n.RENDERBUFFER,De,v.width,v.height)}}n.bindRenderbuffer(n.RENDERBUFFER,null)}function Ae(E,v,N){let q=v.isWebGLCubeRenderTarget===!0;if(t.bindFramebuffer(n.FRAMEBUFFER,E),!(v.depthTexture&&v.depthTexture.isDepthTexture))throw new Error("renderTarget.depthTexture must be an instance of THREE.DepthTexture");let Y=i.get(v.depthTexture);if(Y.__renderTarget=v,(!Y.__webglTexture||v.depthTexture.image.width!==v.width||v.depthTexture.image.height!==v.height)&&(v.depthTexture.image.width=v.width,v.depthTexture.image.height=v.height,v.depthTexture.needsUpdate=!0),q){if(Y.__webglInit===void 0&&(Y.__webglInit=!0,v.depthTexture.addEventListener("dispose",C)),Y.__webglTexture===void 0){Y.__webglTexture=n.createTexture(),t.bindTexture(n.TEXTURE_CUBE_MAP,Y.__webglTexture),he(n.TEXTURE_CUBE_MAP,v.depthTexture);let Pe=s.convert(v.depthTexture.format),J=s.convert(v.depthTexture.type),te;v.depthTexture.format===Wi?te=n.DEPTH_COMPONENT24:v.depthTexture.format===hs&&(te=n.DEPTH24_STENCIL8);for(let _e=0;_e<6;_e++)n.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+_e,0,te,v.width,v.height,0,Pe,J,null)}}else B(v.depthTexture,0);let $=Y.__webglTexture,ye=I(v),re=q?n.TEXTURE_CUBE_MAP_POSITIVE_X+N:n.TEXTURE_2D,De=v.depthTexture.format===hs?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT;if(v.depthTexture.format===Wi)zt(v)?a.framebufferTexture2DMultisampleEXT(n.FRAMEBUFFER,De,re,$,0,ye):n.framebufferTexture2D(n.FRAMEBUFFER,De,re,$,0);else if(v.depthTexture.format===hs)zt(v)?a.framebufferTexture2DMultisampleEXT(n.FRAMEBUFFER,De,re,$,0,ye):n.framebufferTexture2D(n.FRAMEBUFFER,De,re,$,0);else throw new Error("Unknown depthTexture format")}function Fe(E){let v=i.get(E),N=E.isWebGLCubeRenderTarget===!0;if(v.__boundDepthTexture!==E.depthTexture){let q=E.depthTexture;if(v.__depthDisposeCallback&&v.__depthDisposeCallback(),q){let Y=()=>{delete v.__boundDepthTexture,delete v.__depthDisposeCallback,q.removeEventListener("dispose",Y)};q.addEventListener("dispose",Y),v.__depthDisposeCallback=Y}v.__boundDepthTexture=q}if(E.depthTexture&&!v.__autoAllocateDepthBuffer)if(N)for(let q=0;q<6;q++)Ae(v.__webglFramebuffer[q],E,q);else{let q=E.texture.mipmaps;q&&q.length>0?Ae(v.__webglFramebuffer[0],E,0):Ae(v.__webglFramebuffer,E,0)}else if(N){v.__webglDepthbuffer=[];for(let q=0;q<6;q++)if(t.bindFramebuffer(n.FRAMEBUFFER,v.__webglFramebuffer[q]),v.__webglDepthbuffer[q]===void 0)v.__webglDepthbuffer[q]=n.createRenderbuffer(),We(v.__webglDepthbuffer[q],E,!1);else{let Y=E.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT,$=v.__webglDepthbuffer[q];n.bindRenderbuffer(n.RENDERBUFFER,$),n.framebufferRenderbuffer(n.FRAMEBUFFER,Y,n.RENDERBUFFER,$)}}else{let q=E.texture.mipmaps;if(q&&q.length>0?t.bindFramebuffer(n.FRAMEBUFFER,v.__webglFramebuffer[0]):t.bindFramebuffer(n.FRAMEBUFFER,v.__webglFramebuffer),v.__webglDepthbuffer===void 0)v.__webglDepthbuffer=n.createRenderbuffer(),We(v.__webglDepthbuffer,E,!1);else{let Y=E.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT,$=v.__webglDepthbuffer;n.bindRenderbuffer(n.RENDERBUFFER,$),n.framebufferRenderbuffer(n.FRAMEBUFFER,Y,n.RENDERBUFFER,$)}}t.bindFramebuffer(n.FRAMEBUFFER,null)}function Zt(E,v,N){let q=i.get(E);v!==void 0&&oe(q.__webglFramebuffer,E,E.texture,n.COLOR_ATTACHMENT0,n.TEXTURE_2D,0),N!==void 0&&Fe(E)}function at(E){let v=E.texture,N=i.get(E),q=i.get(v);E.addEventListener("dispose",A);let Y=E.textures,$=E.isWebGLCubeRenderTarget===!0,ye=Y.length>1;if(ye||(q.__webglTexture===void 0&&(q.__webglTexture=n.createTexture()),q.__version=v.version,o.memory.textures++),$){N.__webglFramebuffer=[];for(let re=0;re<6;re++)if(v.mipmaps&&v.mipmaps.length>0){N.__webglFramebuffer[re]=[];for(let De=0;De<v.mipmaps.length;De++)N.__webglFramebuffer[re][De]=n.createFramebuffer()}else N.__webglFramebuffer[re]=n.createFramebuffer()}else{if(v.mipmaps&&v.mipmaps.length>0){N.__webglFramebuffer=[];for(let re=0;re<v.mipmaps.length;re++)N.__webglFramebuffer[re]=n.createFramebuffer()}else N.__webglFramebuffer=n.createFramebuffer();if(ye)for(let re=0,De=Y.length;re<De;re++){let Pe=i.get(Y[re]);Pe.__webglTexture===void 0&&(Pe.__webglTexture=n.createTexture(),o.memory.textures++)}if(E.samples>0&&zt(E)===!1){N.__webglMultisampledFramebuffer=n.createFramebuffer(),N.__webglColorRenderbuffer=[],t.bindFramebuffer(n.FRAMEBUFFER,N.__webglMultisampledFramebuffer);for(let re=0;re<Y.length;re++){let De=Y[re];N.__webglColorRenderbuffer[re]=n.createRenderbuffer(),n.bindRenderbuffer(n.RENDERBUFFER,N.__webglColorRenderbuffer[re]);let Pe=s.convert(De.format,De.colorSpace),J=s.convert(De.type),te=w(De.internalFormat,Pe,J,De.colorSpace,E.isXRRenderTarget===!0),_e=I(E);n.renderbufferStorageMultisample(n.RENDERBUFFER,_e,te,E.width,E.height),n.framebufferRenderbuffer(n.FRAMEBUFFER,n.COLOR_ATTACHMENT0+re,n.RENDERBUFFER,N.__webglColorRenderbuffer[re])}n.bindRenderbuffer(n.RENDERBUFFER,null),E.depthBuffer&&(N.__webglDepthRenderbuffer=n.createRenderbuffer(),We(N.__webglDepthRenderbuffer,E,!0)),t.bindFramebuffer(n.FRAMEBUFFER,null)}}if($){t.bindTexture(n.TEXTURE_CUBE_MAP,q.__webglTexture),he(n.TEXTURE_CUBE_MAP,v);for(let re=0;re<6;re++)if(v.mipmaps&&v.mipmaps.length>0)for(let De=0;De<v.mipmaps.length;De++)oe(N.__webglFramebuffer[re][De],E,v,n.COLOR_ATTACHMENT0,n.TEXTURE_CUBE_MAP_POSITIVE_X+re,De);else oe(N.__webglFramebuffer[re],E,v,n.COLOR_ATTACHMENT0,n.TEXTURE_CUBE_MAP_POSITIVE_X+re,0);m(v)&&p(n.TEXTURE_CUBE_MAP),t.unbindTexture()}else if(ye){for(let re=0,De=Y.length;re<De;re++){let Pe=Y[re],J=i.get(Pe),te=n.TEXTURE_2D;(E.isWebGL3DRenderTarget||E.isWebGLArrayRenderTarget)&&(te=E.isWebGL3DRenderTarget?n.TEXTURE_3D:n.TEXTURE_2D_ARRAY),t.bindTexture(te,J.__webglTexture),he(te,Pe),oe(N.__webglFramebuffer,E,Pe,n.COLOR_ATTACHMENT0+re,te,0),m(Pe)&&p(te)}t.unbindTexture()}else{let re=n.TEXTURE_2D;if((E.isWebGL3DRenderTarget||E.isWebGLArrayRenderTarget)&&(re=E.isWebGL3DRenderTarget?n.TEXTURE_3D:n.TEXTURE_2D_ARRAY),t.bindTexture(re,q.__webglTexture),he(re,v),v.mipmaps&&v.mipmaps.length>0)for(let De=0;De<v.mipmaps.length;De++)oe(N.__webglFramebuffer[De],E,v,n.COLOR_ATTACHMENT0,re,De);else oe(N.__webglFramebuffer,E,v,n.COLOR_ATTACHMENT0,re,0);m(v)&&p(re),t.unbindTexture()}E.depthBuffer&&Fe(E)}function vt(E){let v=E.textures;for(let N=0,q=v.length;N<q;N++){let Y=v[N];if(m(Y)){let $=M(E),ye=i.get(Y).__webglTexture;t.bindTexture($,ye),p($),t.unbindTexture()}}}let Et=[],Xe=[];function Ft(E){if(E.samples>0){if(zt(E)===!1){let v=E.textures,N=E.width,q=E.height,Y=n.COLOR_BUFFER_BIT,$=E.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT,ye=i.get(E),re=v.length>1;if(re)for(let Pe=0;Pe<v.length;Pe++)t.bindFramebuffer(n.FRAMEBUFFER,ye.__webglMultisampledFramebuffer),n.framebufferRenderbuffer(n.FRAMEBUFFER,n.COLOR_ATTACHMENT0+Pe,n.RENDERBUFFER,null),t.bindFramebuffer(n.FRAMEBUFFER,ye.__webglFramebuffer),n.framebufferTexture2D(n.DRAW_FRAMEBUFFER,n.COLOR_ATTACHMENT0+Pe,n.TEXTURE_2D,null,0);t.bindFramebuffer(n.READ_FRAMEBUFFER,ye.__webglMultisampledFramebuffer);let De=E.texture.mipmaps;De&&De.length>0?t.bindFramebuffer(n.DRAW_FRAMEBUFFER,ye.__webglFramebuffer[0]):t.bindFramebuffer(n.DRAW_FRAMEBUFFER,ye.__webglFramebuffer);for(let Pe=0;Pe<v.length;Pe++){if(E.resolveDepthBuffer&&(E.depthBuffer&&(Y|=n.DEPTH_BUFFER_BIT),E.stencilBuffer&&E.resolveStencilBuffer&&(Y|=n.STENCIL_BUFFER_BIT)),re){n.framebufferRenderbuffer(n.READ_FRAMEBUFFER,n.COLOR_ATTACHMENT0,n.RENDERBUFFER,ye.__webglColorRenderbuffer[Pe]);let J=i.get(v[Pe]).__webglTexture;n.framebufferTexture2D(n.DRAW_FRAMEBUFFER,n.COLOR_ATTACHMENT0,n.TEXTURE_2D,J,0)}n.blitFramebuffer(0,0,N,q,0,0,N,q,Y,n.NEAREST),c===!0&&(Et.length=0,Xe.length=0,Et.push(n.COLOR_ATTACHMENT0+Pe),E.depthBuffer&&E.resolveDepthBuffer===!1&&(Et.push($),Xe.push($),n.invalidateFramebuffer(n.DRAW_FRAMEBUFFER,Xe)),n.invalidateFramebuffer(n.READ_FRAMEBUFFER,Et))}if(t.bindFramebuffer(n.READ_FRAMEBUFFER,null),t.bindFramebuffer(n.DRAW_FRAMEBUFFER,null),re)for(let Pe=0;Pe<v.length;Pe++){t.bindFramebuffer(n.FRAMEBUFFER,ye.__webglMultisampledFramebuffer),n.framebufferRenderbuffer(n.FRAMEBUFFER,n.COLOR_ATTACHMENT0+Pe,n.RENDERBUFFER,ye.__webglColorRenderbuffer[Pe]);let J=i.get(v[Pe]).__webglTexture;t.bindFramebuffer(n.FRAMEBUFFER,ye.__webglFramebuffer),n.framebufferTexture2D(n.DRAW_FRAMEBUFFER,n.COLOR_ATTACHMENT0+Pe,n.TEXTURE_2D,J,0)}t.bindFramebuffer(n.DRAW_FRAMEBUFFER,ye.__webglMultisampledFramebuffer)}else if(E.depthBuffer&&E.resolveDepthBuffer===!1&&c){let v=E.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT;n.invalidateFramebuffer(n.DRAW_FRAMEBUFFER,[v])}}}function I(E){return Math.min(r.maxSamples,E.samples)}function zt(E){let v=i.get(E);return E.samples>0&&e.has("WEBGL_multisampled_render_to_texture")===!0&&v.__useRenderToTexture!==!1}function ft(E){let v=o.render.frame;u.get(E)!==v&&(u.set(E,v),E.update())}function Ct(E,v){let N=E.colorSpace,q=E.format,Y=E.type;return E.isCompressedTexture===!0||E.isVideoTexture===!0||N!==so&&N!==Dr&&(st.getTransfer(N)===gt?(q!==hi||Y!==Vn)&&Le("WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):Ne("WebGLTextures: Unsupported texture color space:",N)),v}function be(E){return typeof HTMLImageElement<"u"&&E instanceof HTMLImageElement?(l.width=E.naturalWidth||E.width,l.height=E.naturalHeight||E.height):typeof VideoFrame<"u"&&E instanceof VideoFrame?(l.width=E.displayWidth,l.height=E.displayHeight):(l.width=E.width,l.height=E.height),l}this.allocateTextureUnit=k,this.resetTextureUnits=O,this.setTexture2D=B,this.setTexture2DArray=H,this.setTexture3D=L,this.setTextureCube=ee,this.rebindTextures=Zt,this.setupRenderTarget=at,this.updateRenderTargetMipmap=vt,this.updateMultisampleRenderTarget=Ft,this.setupDepthRenderbuffer=Fe,this.setupFrameBufferTexture=oe,this.useMultisampledRTT=zt,this.isReversedDepthBuffer=function(){return t.buffers.depth.getReversed()}}function dk(n,e){function t(i,r=Dr){let s,o=st.getTransfer(r);if(i===Vn)return n.UNSIGNED_BYTE;if(i===_h)return n.UNSIGNED_SHORT_4_4_4_4;if(i===xh)return n.UNSIGNED_SHORT_5_5_5_1;if(i===jy)return n.UNSIGNED_INT_5_9_9_9_REV;if(i===Wy)return n.UNSIGNED_INT_10F_11F_11F_REV;if(i===zy)return n.BYTE;if(i===Gy)return n.SHORT;if(i===Ra)return n.UNSIGNED_SHORT;if(i===yh)return n.INT;if(i===Pi)return n.UNSIGNED_INT;if(i===Oi)return n.FLOAT;if(i===Zi)return n.HALF_FLOAT;if(i===$y)return n.ALPHA;if(i===qy)return n.RGB;if(i===hi)return n.RGBA;if(i===Wi)return n.DEPTH_COMPONENT;if(i===hs)return n.DEPTH_STENCIL;if(i===Xy)return n.RED;if(i===Mh)return n.RED_INTEGER;if(i===ao)return n.RG;if(i===Sh)return n.RG_INTEGER;if(i===bh)return n.RGBA_INTEGER;if(i===Sl||i===bl||i===El||i===wl)if(o===gt)if(s=e.get("WEBGL_compressed_texture_s3tc_srgb"),s!==null){if(i===Sl)return s.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(i===bl)return s.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(i===El)return s.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(i===wl)return s.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(s=e.get("WEBGL_compressed_texture_s3tc"),s!==null){if(i===Sl)return s.COMPRESSED_RGB_S3TC_DXT1_EXT;if(i===bl)return s.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(i===El)return s.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(i===wl)return s.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(i===Eh||i===wh||i===Ch||i===Th)if(s=e.get("WEBGL_compressed_texture_pvrtc"),s!==null){if(i===Eh)return s.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(i===wh)return s.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(i===Ch)return s.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(i===Th)return s.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(i===Dh||i===Ih||i===Ah||i===Rh||i===Nh||i===Ph||i===Oh)if(s=e.get("WEBGL_compressed_texture_etc"),s!==null){if(i===Dh||i===Ih)return o===gt?s.COMPRESSED_SRGB8_ETC2:s.COMPRESSED_RGB8_ETC2;if(i===Ah)return o===gt?s.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:s.COMPRESSED_RGBA8_ETC2_EAC;if(i===Rh)return s.COMPRESSED_R11_EAC;if(i===Nh)return s.COMPRESSED_SIGNED_R11_EAC;if(i===Ph)return s.COMPRESSED_RG11_EAC;if(i===Oh)return s.COMPRESSED_SIGNED_RG11_EAC}else return null;if(i===Lh||i===Fh||i===kh||i===Uh||i===Bh||i===Vh||i===Hh||i===zh||i===Gh||i===jh||i===Wh||i===$h||i===qh||i===Xh)if(s=e.get("WEBGL_compressed_texture_astc"),s!==null){if(i===Lh)return o===gt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:s.COMPRESSED_RGBA_ASTC_4x4_KHR;if(i===Fh)return o===gt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:s.COMPRESSED_RGBA_ASTC_5x4_KHR;if(i===kh)return o===gt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:s.COMPRESSED_RGBA_ASTC_5x5_KHR;if(i===Uh)return o===gt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:s.COMPRESSED_RGBA_ASTC_6x5_KHR;if(i===Bh)return o===gt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:s.COMPRESSED_RGBA_ASTC_6x6_KHR;if(i===Vh)return o===gt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:s.COMPRESSED_RGBA_ASTC_8x5_KHR;if(i===Hh)return o===gt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:s.COMPRESSED_RGBA_ASTC_8x6_KHR;if(i===zh)return o===gt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:s.COMPRESSED_RGBA_ASTC_8x8_KHR;if(i===Gh)return o===gt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:s.COMPRESSED_RGBA_ASTC_10x5_KHR;if(i===jh)return o===gt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:s.COMPRESSED_RGBA_ASTC_10x6_KHR;if(i===Wh)return o===gt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:s.COMPRESSED_RGBA_ASTC_10x8_KHR;if(i===$h)return o===gt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:s.COMPRESSED_RGBA_ASTC_10x10_KHR;if(i===qh)return o===gt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:s.COMPRESSED_RGBA_ASTC_12x10_KHR;if(i===Xh)return o===gt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:s.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(i===Yh||i===Zh||i===Jh)if(s=e.get("EXT_texture_compression_bptc"),s!==null){if(i===Yh)return o===gt?s.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:s.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(i===Zh)return s.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(i===Jh)return s.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(i===Kh||i===Qh||i===ep||i===tp)if(s=e.get("EXT_texture_compression_rgtc"),s!==null){if(i===Kh)return s.COMPRESSED_RED_RGTC1_EXT;if(i===Qh)return s.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(i===ep)return s.COMPRESSED_RED_GREEN_RGTC2_EXT;if(i===tp)return s.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return i===Na?n.UNSIGNED_INT_24_8:n[i]!==void 0?n[i]:null}return{convert:t}}var fk=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,hk=`
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

}`,m_=class{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(e,t){if(this.texture===null){let i=new ul(e.texture);(e.depthNear!==t.depthNear||e.depthFar!==t.depthFar)&&(this.depthNear=e.depthNear,this.depthFar=e.depthFar),this.texture=i}}getMesh(e){if(this.texture!==null&&this.mesh===null){let t=e.cameras[0].viewport,i=new Qn({vertexShader:fk,fragmentShader:hk,uniforms:{depthColor:{value:this.texture},depthWidth:{value:t.z},depthHeight:{value:t.w}}});this.mesh=new on(new fl(20,20),i)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}},g_=class extends Tr{constructor(e,t){super();let i=this,r=null,s=1,o=null,a="local-floor",c=1,l=null,u=null,d=null,f=null,h=null,g=null,_=typeof XRWebGLBinding<"u",m=new m_,p={},M=t.getContextAttributes(),w=null,b=null,D=[],C=[],A=new it,y=null,S=new Mn;S.viewport=new Pt;let j=new Mn;j.viewport=new Pt;let T=[S,j],O=new ph,k=null,G=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(X){let ie=D[X];return ie===void 0&&(ie=new Sa,D[X]=ie),ie.getTargetRaySpace()},this.getControllerGrip=function(X){let ie=D[X];return ie===void 0&&(ie=new Sa,D[X]=ie),ie.getGripSpace()},this.getHand=function(X){let ie=D[X];return ie===void 0&&(ie=new Sa,D[X]=ie),ie.getHandSpace()};function B(X){let ie=C.indexOf(X.inputSource);if(ie===-1)return;let oe=D[ie];oe!==void 0&&(oe.update(X.inputSource,X.frame,l||o),oe.dispatchEvent({type:X.type,data:X.inputSource}))}function H(){r.removeEventListener("select",B),r.removeEventListener("selectstart",B),r.removeEventListener("selectend",B),r.removeEventListener("squeeze",B),r.removeEventListener("squeezestart",B),r.removeEventListener("squeezeend",B),r.removeEventListener("end",H),r.removeEventListener("inputsourceschange",L);for(let X=0;X<D.length;X++){let ie=C[X];ie!==null&&(C[X]=null,D[X].disconnect(ie))}k=null,G=null,m.reset();for(let X in p)delete p[X];e.setRenderTarget(w),h=null,f=null,d=null,r=null,b=null,Dt.stop(),i.isPresenting=!1,e.setPixelRatio(y),e.setSize(A.width,A.height,!1),i.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(X){s=X,i.isPresenting===!0&&Le("WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(X){a=X,i.isPresenting===!0&&Le("WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return l||o},this.setReferenceSpace=function(X){l=X},this.getBaseLayer=function(){return f!==null?f:h},this.getBinding=function(){return d===null&&_&&(d=new XRWebGLBinding(r,t)),d},this.getFrame=function(){return g},this.getSession=function(){return r},this.setSession=async function(X){if(r=X,r!==null){if(w=e.getRenderTarget(),r.addEventListener("select",B),r.addEventListener("selectstart",B),r.addEventListener("selectend",B),r.addEventListener("squeeze",B),r.addEventListener("squeezestart",B),r.addEventListener("squeezeend",B),r.addEventListener("end",H),r.addEventListener("inputsourceschange",L),M.xrCompatible!==!0&&await t.makeXRCompatible(),y=e.getPixelRatio(),e.getSize(A),_&&"createProjectionLayer"in XRWebGLBinding.prototype){let oe=null,We=null,Ae=null;M.depth&&(Ae=M.stencil?t.DEPTH24_STENCIL8:t.DEPTH_COMPONENT24,oe=M.stencil?hs:Wi,We=M.stencil?Na:Pi);let Fe={colorFormat:t.RGBA8,depthFormat:Ae,scaleFactor:s};d=this.getBinding(),f=d.createProjectionLayer(Fe),r.updateRenderState({layers:[f]}),e.setPixelRatio(1),e.setSize(f.textureWidth,f.textureHeight,!1),b=new Jn(f.textureWidth,f.textureHeight,{format:hi,type:Vn,depthTexture:new as(f.textureWidth,f.textureHeight,We,void 0,void 0,void 0,void 0,void 0,void 0,oe),stencilBuffer:M.stencil,colorSpace:e.outputColorSpace,samples:M.antialias?4:0,resolveDepthBuffer:f.ignoreDepthValues===!1,resolveStencilBuffer:f.ignoreDepthValues===!1})}else{let oe={antialias:M.antialias,alpha:!0,depth:M.depth,stencil:M.stencil,framebufferScaleFactor:s};h=new XRWebGLLayer(r,t,oe),r.updateRenderState({baseLayer:h}),e.setPixelRatio(1),e.setSize(h.framebufferWidth,h.framebufferHeight,!1),b=new Jn(h.framebufferWidth,h.framebufferHeight,{format:hi,type:Vn,colorSpace:e.outputColorSpace,stencilBuffer:M.stencil,resolveDepthBuffer:h.ignoreDepthValues===!1,resolveStencilBuffer:h.ignoreDepthValues===!1})}b.isXRRenderTarget=!0,this.setFoveation(c),l=null,o=await r.requestReferenceSpace(a),Dt.setContext(r),Dt.start(),i.isPresenting=!0,i.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(r!==null)return r.environmentBlendMode},this.getDepthTexture=function(){return m.getDepthTexture()};function L(X){for(let ie=0;ie<X.removed.length;ie++){let oe=X.removed[ie],We=C.indexOf(oe);We>=0&&(C[We]=null,D[We].disconnect(oe))}for(let ie=0;ie<X.added.length;ie++){let oe=X.added[ie],We=C.indexOf(oe);if(We===-1){for(let Fe=0;Fe<D.length;Fe++)if(Fe>=C.length){C.push(oe),We=Fe;break}else if(C[Fe]===null){C[Fe]=oe,We=Fe;break}if(We===-1)break}let Ae=D[We];Ae&&Ae.connect(oe)}}let ee=new F,Z=new F;function de(X,ie,oe){ee.setFromMatrixPosition(ie.matrixWorld),Z.setFromMatrixPosition(oe.matrixWorld);let We=ee.distanceTo(Z),Ae=ie.projectionMatrix.elements,Fe=oe.projectionMatrix.elements,Zt=Ae[14]/(Ae[10]-1),at=Ae[14]/(Ae[10]+1),vt=(Ae[9]+1)/Ae[5],Et=(Ae[9]-1)/Ae[5],Xe=(Ae[8]-1)/Ae[0],Ft=(Fe[8]+1)/Fe[0],I=Zt*Xe,zt=Zt*Ft,ft=We/(-Xe+Ft),Ct=ft*-Xe;if(ie.matrixWorld.decompose(X.position,X.quaternion,X.scale),X.translateX(Ct),X.translateZ(ft),X.matrixWorld.compose(X.position,X.quaternion,X.scale),X.matrixWorldInverse.copy(X.matrixWorld).invert(),Ae[10]===-1)X.projectionMatrix.copy(ie.projectionMatrix),X.projectionMatrixInverse.copy(ie.projectionMatrixInverse);else{let be=Zt+ft,E=at+ft,v=I-Ct,N=zt+(We-Ct),q=vt*at/E*be,Y=Et*at/E*be;X.projectionMatrix.makePerspective(v,N,q,Y,be,E),X.projectionMatrixInverse.copy(X.projectionMatrix).invert()}}function ve(X,ie){ie===null?X.matrixWorld.copy(X.matrix):X.matrixWorld.multiplyMatrices(ie.matrixWorld,X.matrix),X.matrixWorldInverse.copy(X.matrixWorld).invert()}this.updateCamera=function(X){if(r===null)return;let ie=X.near,oe=X.far;m.texture!==null&&(m.depthNear>0&&(ie=m.depthNear),m.depthFar>0&&(oe=m.depthFar)),O.near=j.near=S.near=ie,O.far=j.far=S.far=oe,(k!==O.near||G!==O.far)&&(r.updateRenderState({depthNear:O.near,depthFar:O.far}),k=O.near,G=O.far),O.layers.mask=X.layers.mask|6,S.layers.mask=O.layers.mask&-5,j.layers.mask=O.layers.mask&-3;let We=X.parent,Ae=O.cameras;ve(O,We);for(let Fe=0;Fe<Ae.length;Fe++)ve(Ae[Fe],We);Ae.length===2?de(O,S,j):O.projectionMatrix.copy(S.projectionMatrix),he(X,O,We)};function he(X,ie,oe){oe===null?X.matrix.copy(ie.matrixWorld):(X.matrix.copy(oe.matrixWorld),X.matrix.invert(),X.matrix.multiply(ie.matrixWorld)),X.matrix.decompose(X.position,X.quaternion,X.scale),X.updateMatrixWorld(!0),X.projectionMatrix.copy(ie.projectionMatrix),X.projectionMatrixInverse.copy(ie.projectionMatrixInverse),X.isPerspectiveCamera&&(X.fov=Yf*2*Math.atan(1/X.projectionMatrix.elements[5]),X.zoom=1)}this.getCamera=function(){return O},this.getFoveation=function(){if(!(f===null&&h===null))return c},this.setFoveation=function(X){c=X,f!==null&&(f.fixedFoveation=X),h!==null&&h.fixedFoveation!==void 0&&(h.fixedFoveation=X)},this.hasDepthSensing=function(){return m.texture!==null},this.getDepthSensingMesh=function(){return m.getMesh(O)},this.getCameraTexture=function(X){return p[X]};let $e=null;function At(X,ie){if(u=ie.getViewerPose(l||o),g=ie,u!==null){let oe=u.views;h!==null&&(e.setRenderTargetFramebuffer(b,h.framebuffer),e.setRenderTarget(b));let We=!1;oe.length!==O.cameras.length&&(O.cameras.length=0,We=!0);for(let at=0;at<oe.length;at++){let vt=oe[at],Et=null;if(h!==null)Et=h.getViewport(vt);else{let Ft=d.getViewSubImage(f,vt);Et=Ft.viewport,at===0&&(e.setRenderTargetTextures(b,Ft.colorTexture,Ft.depthStencilTexture),e.setRenderTarget(b))}let Xe=T[at];Xe===void 0&&(Xe=new Mn,Xe.layers.enable(at),Xe.viewport=new Pt,T[at]=Xe),Xe.matrix.fromArray(vt.transform.matrix),Xe.matrix.decompose(Xe.position,Xe.quaternion,Xe.scale),Xe.projectionMatrix.fromArray(vt.projectionMatrix),Xe.projectionMatrixInverse.copy(Xe.projectionMatrix).invert(),Xe.viewport.set(Et.x,Et.y,Et.width,Et.height),at===0&&(O.matrix.copy(Xe.matrix),O.matrix.decompose(O.position,O.quaternion,O.scale)),We===!0&&O.cameras.push(Xe)}let Ae=r.enabledFeatures;if(Ae&&Ae.includes("depth-sensing")&&r.depthUsage=="gpu-optimized"&&_){d=i.getBinding();let at=d.getDepthInformation(oe[0]);at&&at.isValid&&at.texture&&m.init(at,r.renderState)}if(Ae&&Ae.includes("camera-access")&&_){e.state.unbindTexture(),d=i.getBinding();for(let at=0;at<oe.length;at++){let vt=oe[at].camera;if(vt){let Et=p[vt];Et||(Et=new ul,p[vt]=Et);let Xe=d.getCameraImage(vt);Et.sourceTexture=Xe}}}}for(let oe=0;oe<D.length;oe++){let We=C[oe],Ae=D[oe];We!==null&&Ae!==void 0&&Ae.update(We,ie,l||o)}$e&&$e(X,ie),ie.detectedPlanes&&i.dispatchEvent({type:"planesdetected",data:ie}),g=null}let Dt=new nw;Dt.setAnimationLoop(At),this.setAnimationLoop=function(X){$e=X},this.dispose=function(){}}},uo=new rs,pk=new It;function mk(n,e){function t(m,p){m.matrixAutoUpdate===!0&&m.updateMatrix(),p.value.copy(m.matrix)}function i(m,p){p.color.getRGB(m.fogColor.value,Ky(n)),p.isFog?(m.fogNear.value=p.near,m.fogFar.value=p.far):p.isFogExp2&&(m.fogDensity.value=p.density)}function r(m,p,M,w,b){p.isMeshBasicMaterial?s(m,p):p.isMeshLambertMaterial?(s(m,p),p.envMap&&(m.envMapIntensity.value=p.envMapIntensity)):p.isMeshToonMaterial?(s(m,p),d(m,p)):p.isMeshPhongMaterial?(s(m,p),u(m,p),p.envMap&&(m.envMapIntensity.value=p.envMapIntensity)):p.isMeshStandardMaterial?(s(m,p),f(m,p),p.isMeshPhysicalMaterial&&h(m,p,b)):p.isMeshMatcapMaterial?(s(m,p),g(m,p)):p.isMeshDepthMaterial?s(m,p):p.isMeshDistanceMaterial?(s(m,p),_(m,p)):p.isMeshNormalMaterial?s(m,p):p.isLineBasicMaterial?(o(m,p),p.isLineDashedMaterial&&a(m,p)):p.isPointsMaterial?c(m,p,M,w):p.isSpriteMaterial?l(m,p):p.isShadowMaterial?(m.color.value.copy(p.color),m.opacity.value=p.opacity):p.isShaderMaterial&&(p.uniformsNeedUpdate=!1)}function s(m,p){m.opacity.value=p.opacity,p.color&&m.diffuse.value.copy(p.color),p.emissive&&m.emissive.value.copy(p.emissive).multiplyScalar(p.emissiveIntensity),p.map&&(m.map.value=p.map,t(p.map,m.mapTransform)),p.alphaMap&&(m.alphaMap.value=p.alphaMap,t(p.alphaMap,m.alphaMapTransform)),p.bumpMap&&(m.bumpMap.value=p.bumpMap,t(p.bumpMap,m.bumpMapTransform),m.bumpScale.value=p.bumpScale,p.side===Nn&&(m.bumpScale.value*=-1)),p.normalMap&&(m.normalMap.value=p.normalMap,t(p.normalMap,m.normalMapTransform),m.normalScale.value.copy(p.normalScale),p.side===Nn&&m.normalScale.value.negate()),p.displacementMap&&(m.displacementMap.value=p.displacementMap,t(p.displacementMap,m.displacementMapTransform),m.displacementScale.value=p.displacementScale,m.displacementBias.value=p.displacementBias),p.emissiveMap&&(m.emissiveMap.value=p.emissiveMap,t(p.emissiveMap,m.emissiveMapTransform)),p.specularMap&&(m.specularMap.value=p.specularMap,t(p.specularMap,m.specularMapTransform)),p.alphaTest>0&&(m.alphaTest.value=p.alphaTest);let M=e.get(p),w=M.envMap,b=M.envMapRotation;w&&(m.envMap.value=w,uo.copy(b),uo.x*=-1,uo.y*=-1,uo.z*=-1,w.isCubeTexture&&w.isRenderTargetTexture===!1&&(uo.y*=-1,uo.z*=-1),m.envMapRotation.value.setFromMatrix4(pk.makeRotationFromEuler(uo)),m.flipEnvMap.value=w.isCubeTexture&&w.isRenderTargetTexture===!1?-1:1,m.reflectivity.value=p.reflectivity,m.ior.value=p.ior,m.refractionRatio.value=p.refractionRatio),p.lightMap&&(m.lightMap.value=p.lightMap,m.lightMapIntensity.value=p.lightMapIntensity,t(p.lightMap,m.lightMapTransform)),p.aoMap&&(m.aoMap.value=p.aoMap,m.aoMapIntensity.value=p.aoMapIntensity,t(p.aoMap,m.aoMapTransform))}function o(m,p){m.diffuse.value.copy(p.color),m.opacity.value=p.opacity,p.map&&(m.map.value=p.map,t(p.map,m.mapTransform))}function a(m,p){m.dashSize.value=p.dashSize,m.totalSize.value=p.dashSize+p.gapSize,m.scale.value=p.scale}function c(m,p,M,w){m.diffuse.value.copy(p.color),m.opacity.value=p.opacity,m.size.value=p.size*M,m.scale.value=w*.5,p.map&&(m.map.value=p.map,t(p.map,m.uvTransform)),p.alphaMap&&(m.alphaMap.value=p.alphaMap,t(p.alphaMap,m.alphaMapTransform)),p.alphaTest>0&&(m.alphaTest.value=p.alphaTest)}function l(m,p){m.diffuse.value.copy(p.color),m.opacity.value=p.opacity,m.rotation.value=p.rotation,p.map&&(m.map.value=p.map,t(p.map,m.mapTransform)),p.alphaMap&&(m.alphaMap.value=p.alphaMap,t(p.alphaMap,m.alphaMapTransform)),p.alphaTest>0&&(m.alphaTest.value=p.alphaTest)}function u(m,p){m.specular.value.copy(p.specular),m.shininess.value=Math.max(p.shininess,1e-4)}function d(m,p){p.gradientMap&&(m.gradientMap.value=p.gradientMap)}function f(m,p){m.metalness.value=p.metalness,p.metalnessMap&&(m.metalnessMap.value=p.metalnessMap,t(p.metalnessMap,m.metalnessMapTransform)),m.roughness.value=p.roughness,p.roughnessMap&&(m.roughnessMap.value=p.roughnessMap,t(p.roughnessMap,m.roughnessMapTransform)),p.envMap&&(m.envMapIntensity.value=p.envMapIntensity)}function h(m,p,M){m.ior.value=p.ior,p.sheen>0&&(m.sheenColor.value.copy(p.sheenColor).multiplyScalar(p.sheen),m.sheenRoughness.value=p.sheenRoughness,p.sheenColorMap&&(m.sheenColorMap.value=p.sheenColorMap,t(p.sheenColorMap,m.sheenColorMapTransform)),p.sheenRoughnessMap&&(m.sheenRoughnessMap.value=p.sheenRoughnessMap,t(p.sheenRoughnessMap,m.sheenRoughnessMapTransform))),p.clearcoat>0&&(m.clearcoat.value=p.clearcoat,m.clearcoatRoughness.value=p.clearcoatRoughness,p.clearcoatMap&&(m.clearcoatMap.value=p.clearcoatMap,t(p.clearcoatMap,m.clearcoatMapTransform)),p.clearcoatRoughnessMap&&(m.clearcoatRoughnessMap.value=p.clearcoatRoughnessMap,t(p.clearcoatRoughnessMap,m.clearcoatRoughnessMapTransform)),p.clearcoatNormalMap&&(m.clearcoatNormalMap.value=p.clearcoatNormalMap,t(p.clearcoatNormalMap,m.clearcoatNormalMapTransform),m.clearcoatNormalScale.value.copy(p.clearcoatNormalScale),p.side===Nn&&m.clearcoatNormalScale.value.negate())),p.dispersion>0&&(m.dispersion.value=p.dispersion),p.iridescence>0&&(m.iridescence.value=p.iridescence,m.iridescenceIOR.value=p.iridescenceIOR,m.iridescenceThicknessMinimum.value=p.iridescenceThicknessRange[0],m.iridescenceThicknessMaximum.value=p.iridescenceThicknessRange[1],p.iridescenceMap&&(m.iridescenceMap.value=p.iridescenceMap,t(p.iridescenceMap,m.iridescenceMapTransform)),p.iridescenceThicknessMap&&(m.iridescenceThicknessMap.value=p.iridescenceThicknessMap,t(p.iridescenceThicknessMap,m.iridescenceThicknessMapTransform))),p.transmission>0&&(m.transmission.value=p.transmission,m.transmissionSamplerMap.value=M.texture,m.transmissionSamplerSize.value.set(M.width,M.height),p.transmissionMap&&(m.transmissionMap.value=p.transmissionMap,t(p.transmissionMap,m.transmissionMapTransform)),m.thickness.value=p.thickness,p.thicknessMap&&(m.thicknessMap.value=p.thicknessMap,t(p.thicknessMap,m.thicknessMapTransform)),m.attenuationDistance.value=p.attenuationDistance,m.attenuationColor.value.copy(p.attenuationColor)),p.anisotropy>0&&(m.anisotropyVector.value.set(p.anisotropy*Math.cos(p.anisotropyRotation),p.anisotropy*Math.sin(p.anisotropyRotation)),p.anisotropyMap&&(m.anisotropyMap.value=p.anisotropyMap,t(p.anisotropyMap,m.anisotropyMapTransform))),m.specularIntensity.value=p.specularIntensity,m.specularColor.value.copy(p.specularColor),p.specularColorMap&&(m.specularColorMap.value=p.specularColorMap,t(p.specularColorMap,m.specularColorMapTransform)),p.specularIntensityMap&&(m.specularIntensityMap.value=p.specularIntensityMap,t(p.specularIntensityMap,m.specularIntensityMapTransform))}function g(m,p){p.matcap&&(m.matcap.value=p.matcap)}function _(m,p){let M=e.get(p).light;m.referencePosition.value.setFromMatrixPosition(M.matrixWorld),m.nearDistance.value=M.shadow.camera.near,m.farDistance.value=M.shadow.camera.far}return{refreshFogUniforms:i,refreshMaterialUniforms:r}}function gk(n,e,t,i){let r={},s={},o=[],a=n.getParameter(n.MAX_UNIFORM_BUFFER_BINDINGS);function c(M,w){let b=w.program;i.uniformBlockBinding(M,b)}function l(M,w){let b=r[M.id];b===void 0&&(g(M),b=u(M),r[M.id]=b,M.addEventListener("dispose",m));let D=w.program;i.updateUBOMapping(M,D);let C=e.render.frame;s[M.id]!==C&&(f(M),s[M.id]=C)}function u(M){let w=d();M.__bindingPointIndex=w;let b=n.createBuffer(),D=M.__size,C=M.usage;return n.bindBuffer(n.UNIFORM_BUFFER,b),n.bufferData(n.UNIFORM_BUFFER,D,C),n.bindBuffer(n.UNIFORM_BUFFER,null),n.bindBufferBase(n.UNIFORM_BUFFER,w,b),b}function d(){for(let M=0;M<a;M++)if(o.indexOf(M)===-1)return o.push(M),M;return Ne("WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function f(M){let w=r[M.id],b=M.uniforms,D=M.__cache;n.bindBuffer(n.UNIFORM_BUFFER,w);for(let C=0,A=b.length;C<A;C++){let y=Array.isArray(b[C])?b[C]:[b[C]];for(let S=0,j=y.length;S<j;S++){let T=y[S];if(h(T,C,S,D)===!0){let O=T.__offset,k=Array.isArray(T.value)?T.value:[T.value],G=0;for(let B=0;B<k.length;B++){let H=k[B],L=_(H);typeof H=="number"||typeof H=="boolean"?(T.__data[0]=H,n.bufferSubData(n.UNIFORM_BUFFER,O+G,T.__data)):H.isMatrix3?(T.__data[0]=H.elements[0],T.__data[1]=H.elements[1],T.__data[2]=H.elements[2],T.__data[3]=0,T.__data[4]=H.elements[3],T.__data[5]=H.elements[4],T.__data[6]=H.elements[5],T.__data[7]=0,T.__data[8]=H.elements[6],T.__data[9]=H.elements[7],T.__data[10]=H.elements[8],T.__data[11]=0):(H.toArray(T.__data,G),G+=L.storage/Float32Array.BYTES_PER_ELEMENT)}n.bufferSubData(n.UNIFORM_BUFFER,O,T.__data)}}}n.bindBuffer(n.UNIFORM_BUFFER,null)}function h(M,w,b,D){let C=M.value,A=w+"_"+b;if(D[A]===void 0)return typeof C=="number"||typeof C=="boolean"?D[A]=C:D[A]=C.clone(),!0;{let y=D[A];if(typeof C=="number"||typeof C=="boolean"){if(y!==C)return D[A]=C,!0}else if(y.equals(C)===!1)return y.copy(C),!0}return!1}function g(M){let w=M.uniforms,b=0,D=16;for(let A=0,y=w.length;A<y;A++){let S=Array.isArray(w[A])?w[A]:[w[A]];for(let j=0,T=S.length;j<T;j++){let O=S[j],k=Array.isArray(O.value)?O.value:[O.value];for(let G=0,B=k.length;G<B;G++){let H=k[G],L=_(H),ee=b%D,Z=ee%L.boundary,de=ee+Z;b+=Z,de!==0&&D-de<L.storage&&(b+=D-de),O.__data=new Float32Array(L.storage/Float32Array.BYTES_PER_ELEMENT),O.__offset=b,b+=L.storage}}}let C=b%D;return C>0&&(b+=D-C),M.__size=b,M.__cache={},this}function _(M){let w={boundary:0,storage:0};return typeof M=="number"||typeof M=="boolean"?(w.boundary=4,w.storage=4):M.isVector2?(w.boundary=8,w.storage=8):M.isVector3||M.isColor?(w.boundary=16,w.storage=12):M.isVector4?(w.boundary=16,w.storage=16):M.isMatrix3?(w.boundary=48,w.storage=48):M.isMatrix4?(w.boundary=64,w.storage=64):M.isTexture?Le("WebGLRenderer: Texture samplers can not be part of an uniforms group."):Le("WebGLRenderer: Unsupported uniform value type.",M),w}function m(M){let w=M.target;w.removeEventListener("dispose",m);let b=o.indexOf(w.__bindingPointIndex);o.splice(b,1),n.deleteBuffer(r[w.id]),delete r[w.id],delete s[w.id]}function p(){for(let M in r)n.deleteBuffer(r[M]);o=[],r={},s={}}return{bind:c,update:l,dispose:p}}var vk=new Uint16Array([12469,15057,12620,14925,13266,14620,13807,14376,14323,13990,14545,13625,14713,13328,14840,12882,14931,12528,14996,12233,15039,11829,15066,11525,15080,11295,15085,10976,15082,10705,15073,10495,13880,14564,13898,14542,13977,14430,14158,14124,14393,13732,14556,13410,14702,12996,14814,12596,14891,12291,14937,11834,14957,11489,14958,11194,14943,10803,14921,10506,14893,10278,14858,9960,14484,14039,14487,14025,14499,13941,14524,13740,14574,13468,14654,13106,14743,12678,14818,12344,14867,11893,14889,11509,14893,11180,14881,10751,14852,10428,14812,10128,14765,9754,14712,9466,14764,13480,14764,13475,14766,13440,14766,13347,14769,13070,14786,12713,14816,12387,14844,11957,14860,11549,14868,11215,14855,10751,14825,10403,14782,10044,14729,9651,14666,9352,14599,9029,14967,12835,14966,12831,14963,12804,14954,12723,14936,12564,14917,12347,14900,11958,14886,11569,14878,11247,14859,10765,14828,10401,14784,10011,14727,9600,14660,9289,14586,8893,14508,8533,15111,12234,15110,12234,15104,12216,15092,12156,15067,12010,15028,11776,14981,11500,14942,11205,14902,10752,14861,10393,14812,9991,14752,9570,14682,9252,14603,8808,14519,8445,14431,8145,15209,11449,15208,11451,15202,11451,15190,11438,15163,11384,15117,11274,15055,10979,14994,10648,14932,10343,14871,9936,14803,9532,14729,9218,14645,8742,14556,8381,14461,8020,14365,7603,15273,10603,15272,10607,15267,10619,15256,10631,15231,10614,15182,10535,15118,10389,15042,10167,14963,9787,14883,9447,14800,9115,14710,8665,14615,8318,14514,7911,14411,7507,14279,7198,15314,9675,15313,9683,15309,9712,15298,9759,15277,9797,15229,9773,15166,9668,15084,9487,14995,9274,14898,8910,14800,8539,14697,8234,14590,7790,14479,7409,14367,7067,14178,6621,15337,8619,15337,8631,15333,8677,15325,8769,15305,8871,15264,8940,15202,8909,15119,8775,15022,8565,14916,8328,14804,8009,14688,7614,14569,7287,14448,6888,14321,6483,14088,6171,15350,7402,15350,7419,15347,7480,15340,7613,15322,7804,15287,7973,15229,8057,15148,8012,15046,7846,14933,7611,14810,7357,14682,7069,14552,6656,14421,6316,14251,5948,14007,5528,15356,5942,15356,5977,15353,6119,15348,6294,15332,6551,15302,6824,15249,7044,15171,7122,15070,7050,14949,6861,14818,6611,14679,6349,14538,6067,14398,5651,14189,5311,13935,4958,15359,4123,15359,4153,15356,4296,15353,4646,15338,5160,15311,5508,15263,5829,15188,6042,15088,6094,14966,6001,14826,5796,14678,5543,14527,5287,14377,4985,14133,4586,13869,4257,15360,1563,15360,1642,15358,2076,15354,2636,15341,3350,15317,4019,15273,4429,15203,4732,15105,4911,14981,4932,14836,4818,14679,4621,14517,4386,14359,4156,14083,3795,13808,3437,15360,122,15360,137,15358,285,15355,636,15344,1274,15322,2177,15281,2765,15215,3223,15120,3451,14995,3569,14846,3567,14681,3466,14511,3305,14344,3121,14037,2800,13753,2467,15360,0,15360,1,15359,21,15355,89,15346,253,15325,479,15287,796,15225,1148,15133,1492,15008,1749,14856,1882,14685,1886,14506,1783,14324,1608,13996,1398,13702,1183]),Ji=null;function yk(){return Ji===null&&(Ji=new Qf(vk,16,16,ao,Zi),Ji.name="DFG_LUT",Ji.minFilter=fn,Ji.magFilter=fn,Ji.wrapS=ji,Ji.wrapT=ji,Ji.generateMipmaps=!1,Ji.needsUpdate=!0),Ji}var cp=class{constructor(e={}){let{canvas:t=DE(),context:i=null,depth:r=!0,stencil:s=!1,alpha:o=!1,antialias:a=!1,premultipliedAlpha:c=!0,preserveDrawingBuffer:l=!1,powerPreference:u="default",failIfMajorPerformanceCaveat:d=!1,reversedDepthBuffer:f=!1,outputBufferType:h=Vn}=e;this.isWebGLRenderer=!0;let g;if(i!==null){if(typeof WebGLRenderingContext<"u"&&i instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");g=i.getContextAttributes().alpha}else g=o;let _=h,m=new Set([bh,Sh,Mh]),p=new Set([Vn,Pi,Ra,Na,_h,xh]),M=new Uint32Array(4),w=new Int32Array(4),b=null,D=null,C=[],A=[],y=null;this.domElement=t,this.debug={checkShaderErrors:!0,onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this.toneMapping=Ni,this.toneMappingExposure=1,this.transmissionResolutionScale=1;let S=this,j=!1;this._outputColorSpace=Yn;let T=0,O=0,k=null,G=-1,B=null,H=new Pt,L=new Pt,ee=null,Z=new ot(0),de=0,ve=t.width,he=t.height,$e=1,At=null,Dt=null,X=new Pt(0,0,ve,he),ie=new Pt(0,0,ve,he),oe=!1,We=new Ea,Ae=!1,Fe=!1,Zt=new It,at=new F,vt=new Pt,Et={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0},Xe=!1;function Ft(){return k===null?$e:1}let I=i;function zt(x,P){return t.getContext(x,P)}try{let x={alpha:!0,depth:r,stencil:s,antialias:a,premultipliedAlpha:c,preserveDrawingBuffer:l,powerPreference:u,failIfMajorPerformanceCaveat:d};if("setAttribute"in t&&t.setAttribute("data-engine",`three.js r${"183"}`),t.addEventListener("webglcontextlost",xe,!1),t.addEventListener("webglcontextrestored",Ue,!1),t.addEventListener("webglcontextcreationerror",Tt,!1),I===null){let P="webgl2";if(I=zt(P,x),I===null)throw zt(P)?new Error("Error creating WebGL context with your selected attributes."):new Error("Error creating WebGL context.")}}catch(x){throw Ne("WebGLRenderer: "+x.message),x}let ft,Ct,be,E,v,N,q,Y,$,ye,re,De,Pe,J,te,_e,Me,fe,Ye,R,se,ne,me;function K(){ft=new CL(I),ft.init(),se=new dk(I,ft),Ct=new yL(I,ft,e,se),be=new lk(I,ft),Ct.reversedDepthBuffer&&f&&be.buffers.depth.setReversed(!0),E=new IL(I),v=new YF,N=new uk(I,ft,be,v,Ct,se,E),q=new wL(S),Y=new ON(I),ne=new gL(I,Y),$=new TL(I,Y,E,ne),ye=new RL(I,$,Y,ne,E),fe=new AL(I,Ct,N),te=new _L(v),re=new XF(S,q,ft,Ct,ne,te),De=new mk(S,v),Pe=new JF,J=new ik(ft),Me=new mL(S,q,be,ye,g,c),_e=new ck(S,ye,Ct),me=new gk(I,E,Ct,be),Ye=new vL(I,ft,E),R=new DL(I,ft,E),E.programs=re.programs,S.capabilities=Ct,S.extensions=ft,S.properties=v,S.renderLists=Pe,S.shadowMap=_e,S.state=be,S.info=E}K(),_!==Vn&&(y=new PL(_,t.width,t.height,r,s));let W=new g_(S,I);this.xr=W,this.getContext=function(){return I},this.getContextAttributes=function(){return I.getContextAttributes()},this.forceContextLoss=function(){let x=ft.get("WEBGL_lose_context");x&&x.loseContext()},this.forceContextRestore=function(){let x=ft.get("WEBGL_lose_context");x&&x.restoreContext()},this.getPixelRatio=function(){return $e},this.setPixelRatio=function(x){x!==void 0&&($e=x,this.setSize(ve,he,!1))},this.getSize=function(x){return x.set(ve,he)},this.setSize=function(x,P,z=!0){if(W.isPresenting){Le("WebGLRenderer: Can't change size while VR device is presenting.");return}ve=x,he=P,t.width=Math.floor(x*$e),t.height=Math.floor(P*$e),z===!0&&(t.style.width=x+"px",t.style.height=P+"px"),y!==null&&y.setSize(t.width,t.height),this.setViewport(0,0,x,P)},this.getDrawingBufferSize=function(x){return x.set(ve*$e,he*$e).floor()},this.setDrawingBufferSize=function(x,P,z){ve=x,he=P,$e=z,t.width=Math.floor(x*z),t.height=Math.floor(P*z),this.setViewport(0,0,x,P)},this.setEffects=function(x){if(_===Vn){console.error("THREE.WebGLRenderer: setEffects() requires outputBufferType set to HalfFloatType or FloatType.");return}if(x){for(let P=0;P<x.length;P++)if(x[P].isOutputPass===!0){console.warn("THREE.WebGLRenderer: OutputPass is not needed in setEffects(). Tone mapping and color space conversion are applied automatically.");break}}y.setEffects(x||[])},this.getCurrentViewport=function(x){return x.copy(H)},this.getViewport=function(x){return x.copy(X)},this.setViewport=function(x,P,z,V){x.isVector4?X.set(x.x,x.y,x.z,x.w):X.set(x,P,z,V),be.viewport(H.copy(X).multiplyScalar($e).round())},this.getScissor=function(x){return x.copy(ie)},this.setScissor=function(x,P,z,V){x.isVector4?ie.set(x.x,x.y,x.z,x.w):ie.set(x,P,z,V),be.scissor(L.copy(ie).multiplyScalar($e).round())},this.getScissorTest=function(){return oe},this.setScissorTest=function(x){be.setScissorTest(oe=x)},this.setOpaqueSort=function(x){At=x},this.setTransparentSort=function(x){Dt=x},this.getClearColor=function(x){return x.copy(Me.getClearColor())},this.setClearColor=function(){Me.setClearColor(...arguments)},this.getClearAlpha=function(){return Me.getClearAlpha()},this.setClearAlpha=function(){Me.setClearAlpha(...arguments)},this.clear=function(x=!0,P=!0,z=!0){let V=0;if(x){let U=!1;if(k!==null){let le=k.texture.format;U=m.has(le)}if(U){let le=k.texture.type,pe=p.has(le),ue=Me.getClearColor(),Se=Me.getClearAlpha(),we=ue.r,ze=ue.g,Ze=ue.b;pe?(M[0]=we,M[1]=ze,M[2]=Ze,M[3]=Se,I.clearBufferuiv(I.COLOR,0,M)):(w[0]=we,w[1]=ze,w[2]=Ze,w[3]=Se,I.clearBufferiv(I.COLOR,0,w))}else V|=I.COLOR_BUFFER_BIT}P&&(V|=I.DEPTH_BUFFER_BIT),z&&(V|=I.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),V!==0&&I.clear(V)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.dispose=function(){t.removeEventListener("webglcontextlost",xe,!1),t.removeEventListener("webglcontextrestored",Ue,!1),t.removeEventListener("webglcontextcreationerror",Tt,!1),Me.dispose(),Pe.dispose(),J.dispose(),v.dispose(),q.dispose(),ye.dispose(),ne.dispose(),me.dispose(),re.dispose(),W.dispose(),W.removeEventListener("sessionstart",__),W.removeEventListener("sessionend",x_),ms.stop()};function xe(x){x.preventDefault(),Jy("WebGLRenderer: Context Lost."),j=!0}function Ue(){Jy("WebGLRenderer: Context Restored."),j=!1;let x=E.autoReset,P=_e.enabled,z=_e.autoUpdate,V=_e.needsUpdate,U=_e.type;K(),E.autoReset=x,_e.enabled=P,_e.autoUpdate=z,_e.needsUpdate=V,_e.type=U}function Tt(x){Ne("WebGLRenderer: A WebGL context could not be created. Reason: ",x.statusMessage)}function yt(x){let P=x.target;P.removeEventListener("dispose",yt),Qi(P)}function Qi(x){er(x),v.remove(x)}function er(x){let P=v.get(x).programs;P!==void 0&&(P.forEach(function(z){re.releaseProgram(z)}),x.isShaderMaterial&&re.releaseShaderCache(x))}this.renderBufferDirect=function(x,P,z,V,U,le){P===null&&(P=Et);let pe=U.isMesh&&U.matrixWorld.determinant()<0,ue=_w(x,P,z,V,U);be.setMaterial(V,pe);let Se=z.index,we=1;if(V.wireframe===!0){if(Se=$.getWireframeAttribute(z),Se===void 0)return;we=2}let ze=z.drawRange,Ze=z.attributes.position,Te=ze.start*we,xt=(ze.start+ze.count)*we;le!==null&&(Te=Math.max(Te,le.start*we),xt=Math.min(xt,(le.start+le.count)*we)),Se!==null?(Te=Math.max(Te,0),xt=Math.min(xt,Se.count)):Ze!=null&&(Te=Math.max(Te,0),xt=Math.min(xt,Ze.count));let kt=xt-Te;if(kt<0||kt===1/0)return;ne.setup(U,V,ue,z,Se);let Ot,Mt=Ye;if(Se!==null&&(Ot=Y.get(Se),Mt=R,Mt.setIndex(Ot)),U.isMesh)V.wireframe===!0?(be.setLineWidth(V.wireframeLinewidth*Ft()),Mt.setMode(I.LINES)):Mt.setMode(I.TRIANGLES);else if(U.isLine){let hn=V.linewidth;hn===void 0&&(hn=1),be.setLineWidth(hn*Ft()),U.isLineSegments?Mt.setMode(I.LINES):U.isLineLoop?Mt.setMode(I.LINE_LOOP):Mt.setMode(I.LINE_STRIP)}else U.isPoints?Mt.setMode(I.POINTS):U.isSprite&&Mt.setMode(I.TRIANGLES);if(U.isBatchedMesh)if(U._multiDrawInstances!==null)il("WebGLRenderer: renderMultiDrawInstances has been deprecated and will be removed in r184. Append to renderMultiDraw arguments and use indirection."),Mt.renderMultiDrawInstances(U._multiDrawStarts,U._multiDrawCounts,U._multiDrawCount,U._multiDrawInstances);else if(ft.get("WEBGL_multi_draw"))Mt.renderMultiDraw(U._multiDrawStarts,U._multiDrawCounts,U._multiDrawCount);else{let hn=U._multiDrawStarts,Ee=U._multiDrawCounts,Hn=U._multiDrawCount,ct=Se?Y.get(Se).bytesPerElement:1,pi=v.get(V).currentProgram.getUniforms();for(let Li=0;Li<Hn;Li++)pi.setValue(I,"_gl_DrawID",Li),Mt.render(hn[Li]/ct,Ee[Li])}else if(U.isInstancedMesh)Mt.renderInstances(Te,kt,U.count);else if(z.isInstancedBufferGeometry){let hn=z._maxInstanceCount!==void 0?z._maxInstanceCount:1/0,Ee=Math.min(z.instanceCount,hn);Mt.renderInstances(Te,kt,Ee)}else Mt.render(Te,kt)};function y_(x,P,z){x.transparent===!0&&x.side===Xi&&x.forceSinglePass===!1?(x.side=Nn,x.needsUpdate=!0,Nl(x,P,z),x.side=Cr,x.needsUpdate=!0,Nl(x,P,z),x.side=Xi):Nl(x,P,z)}this.compile=function(x,P,z=null){z===null&&(z=x),D=J.get(z),D.init(P),A.push(D),z.traverseVisible(function(U){U.isLight&&U.layers.test(P.layers)&&(D.pushLight(U),U.castShadow&&D.pushShadow(U))}),x!==z&&x.traverseVisible(function(U){U.isLight&&U.layers.test(P.layers)&&(D.pushLight(U),U.castShadow&&D.pushShadow(U))}),D.setupLights();let V=new Set;return x.traverse(function(U){if(!(U.isMesh||U.isPoints||U.isLine||U.isSprite))return;let le=U.material;if(le)if(Array.isArray(le))for(let pe=0;pe<le.length;pe++){let ue=le[pe];y_(ue,z,U),V.add(ue)}else y_(le,z,U),V.add(le)}),D=A.pop(),V},this.compileAsync=function(x,P,z=null){let V=this.compile(x,P,z);return new Promise(U=>{function le(){if(V.forEach(function(pe){v.get(pe).currentProgram.isReady()&&V.delete(pe)}),V.size===0){U(x);return}setTimeout(le,10)}ft.get("KHR_parallel_shader_compile")!==null?le():setTimeout(le,10)})};let yp=null;function yw(x){yp&&yp(x)}function __(){ms.stop()}function x_(){ms.start()}let ms=new nw;ms.setAnimationLoop(yw),typeof self<"u"&&ms.setContext(self),this.setAnimationLoop=function(x){yp=x,W.setAnimationLoop(x),x===null?ms.stop():ms.start()},W.addEventListener("sessionstart",__),W.addEventListener("sessionend",x_),this.render=function(x,P){if(P!==void 0&&P.isCamera!==!0){Ne("WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(j===!0)return;let z=W.enabled===!0&&W.isPresenting===!0,V=y!==null&&(k===null||z)&&y.begin(S,k);if(x.matrixWorldAutoUpdate===!0&&x.updateMatrixWorld(),P.parent===null&&P.matrixWorldAutoUpdate===!0&&P.updateMatrixWorld(),W.enabled===!0&&W.isPresenting===!0&&(y===null||y.isCompositing()===!1)&&(W.cameraAutoUpdate===!0&&W.updateCamera(P),P=W.getCamera()),x.isScene===!0&&x.onBeforeRender(S,x,P,k),D=J.get(x,A.length),D.init(P),A.push(D),Zt.multiplyMatrices(P.projectionMatrix,P.matrixWorldInverse),We.setFromProjectionMatrix(Zt,Ri,P.reversedDepth),Fe=this.localClippingEnabled,Ae=te.init(this.clippingPlanes,Fe),b=Pe.get(x,C.length),b.init(),C.push(b),W.enabled===!0&&W.isPresenting===!0){let pe=S.xr.getDepthSensingMesh();pe!==null&&_p(pe,P,-1/0,S.sortObjects)}_p(x,P,0,S.sortObjects),b.finish(),S.sortObjects===!0&&b.sort(At,Dt),Xe=W.enabled===!1||W.isPresenting===!1||W.hasDepthSensing()===!1,Xe&&Me.addToRenderList(b,x),this.info.render.frame++,Ae===!0&&te.beginShadows();let U=D.state.shadowsArray;if(_e.render(U,x,P),Ae===!0&&te.endShadows(),this.info.autoReset===!0&&this.info.reset(),(V&&y.hasRenderPass())===!1){let pe=b.opaque,ue=b.transmissive;if(D.setupLights(),P.isArrayCamera){let Se=P.cameras;if(ue.length>0)for(let we=0,ze=Se.length;we<ze;we++){let Ze=Se[we];S_(pe,ue,x,Ze)}Xe&&Me.render(x);for(let we=0,ze=Se.length;we<ze;we++){let Ze=Se[we];M_(b,x,Ze,Ze.viewport)}}else ue.length>0&&S_(pe,ue,x,P),Xe&&Me.render(x),M_(b,x,P)}k!==null&&O===0&&(N.updateMultisampleRenderTarget(k),N.updateRenderTargetMipmap(k)),V&&y.end(S),x.isScene===!0&&x.onAfterRender(S,x,P),ne.resetDefaultState(),G=-1,B=null,A.pop(),A.length>0?(D=A[A.length-1],Ae===!0&&te.setGlobalState(S.clippingPlanes,D.state.camera)):D=null,C.pop(),C.length>0?b=C[C.length-1]:b=null};function _p(x,P,z,V){if(x.visible===!1)return;if(x.layers.test(P.layers)){if(x.isGroup)z=x.renderOrder;else if(x.isLOD)x.autoUpdate===!0&&x.update(P);else if(x.isLight)D.pushLight(x),x.castShadow&&D.pushShadow(x);else if(x.isSprite){if(!x.frustumCulled||We.intersectsSprite(x)){V&&vt.setFromMatrixPosition(x.matrixWorld).applyMatrix4(Zt);let pe=ye.update(x),ue=x.material;ue.visible&&b.push(x,pe,ue,z,vt.z,null)}}else if((x.isMesh||x.isLine||x.isPoints)&&(!x.frustumCulled||We.intersectsObject(x))){let pe=ye.update(x),ue=x.material;if(V&&(x.boundingSphere!==void 0?(x.boundingSphere===null&&x.computeBoundingSphere(),vt.copy(x.boundingSphere.center)):(pe.boundingSphere===null&&pe.computeBoundingSphere(),vt.copy(pe.boundingSphere.center)),vt.applyMatrix4(x.matrixWorld).applyMatrix4(Zt)),Array.isArray(ue)){let Se=pe.groups;for(let we=0,ze=Se.length;we<ze;we++){let Ze=Se[we],Te=ue[Ze.materialIndex];Te&&Te.visible&&b.push(x,pe,Te,z,vt.z,Ze)}}else ue.visible&&b.push(x,pe,ue,z,vt.z,null)}}let le=x.children;for(let pe=0,ue=le.length;pe<ue;pe++)_p(le[pe],P,z,V)}function M_(x,P,z,V){let{opaque:U,transmissive:le,transparent:pe}=x;D.setupLightsView(z),Ae===!0&&te.setGlobalState(S.clippingPlanes,z),V&&be.viewport(H.copy(V)),U.length>0&&Rl(U,P,z),le.length>0&&Rl(le,P,z),pe.length>0&&Rl(pe,P,z),be.buffers.depth.setTest(!0),be.buffers.depth.setMask(!0),be.buffers.color.setMask(!0),be.setPolygonOffset(!1)}function S_(x,P,z,V){if((z.isScene===!0?z.overrideMaterial:null)!==null)return;if(D.state.transmissionRenderTarget[V.id]===void 0){let Te=ft.has("EXT_color_buffer_half_float")||ft.has("EXT_color_buffer_float");D.state.transmissionRenderTarget[V.id]=new Jn(1,1,{generateMipmaps:!0,type:Te?Zi:Vn,minFilter:fs,samples:Math.max(4,Ct.samples),stencilBuffer:s,resolveDepthBuffer:!1,resolveStencilBuffer:!1,colorSpace:st.workingColorSpace})}let le=D.state.transmissionRenderTarget[V.id],pe=V.viewport||H;le.setSize(pe.z*S.transmissionResolutionScale,pe.w*S.transmissionResolutionScale);let ue=S.getRenderTarget(),Se=S.getActiveCubeFace(),we=S.getActiveMipmapLevel();S.setRenderTarget(le),S.getClearColor(Z),de=S.getClearAlpha(),de<1&&S.setClearColor(16777215,.5),S.clear(),Xe&&Me.render(z);let ze=S.toneMapping;S.toneMapping=Ni;let Ze=V.viewport;if(V.viewport!==void 0&&(V.viewport=void 0),D.setupLightsView(V),Ae===!0&&te.setGlobalState(S.clippingPlanes,V),Rl(x,z,V),N.updateMultisampleRenderTarget(le),N.updateRenderTargetMipmap(le),ft.has("WEBGL_multisampled_render_to_texture")===!1){let Te=!1;for(let xt=0,kt=P.length;xt<kt;xt++){let Ot=P[xt],{object:Mt,geometry:hn,material:Ee,group:Hn}=Ot;if(Ee.side===Xi&&Mt.layers.test(V.layers)){let ct=Ee.side;Ee.side=Nn,Ee.needsUpdate=!0,b_(Mt,z,V,hn,Ee,Hn),Ee.side=ct,Ee.needsUpdate=!0,Te=!0}}Te===!0&&(N.updateMultisampleRenderTarget(le),N.updateRenderTargetMipmap(le))}S.setRenderTarget(ue,Se,we),S.setClearColor(Z,de),Ze!==void 0&&(V.viewport=Ze),S.toneMapping=ze}function Rl(x,P,z){let V=P.isScene===!0?P.overrideMaterial:null;for(let U=0,le=x.length;U<le;U++){let pe=x[U],{object:ue,geometry:Se,group:we}=pe,ze=pe.material;ze.allowOverride===!0&&V!==null&&(ze=V),ue.layers.test(z.layers)&&b_(ue,P,z,Se,ze,we)}}function b_(x,P,z,V,U,le){x.onBeforeRender(S,P,z,V,U,le),x.modelViewMatrix.multiplyMatrices(z.matrixWorldInverse,x.matrixWorld),x.normalMatrix.getNormalMatrix(x.modelViewMatrix),U.onBeforeRender(S,P,z,V,x,le),U.transparent===!0&&U.side===Xi&&U.forceSinglePass===!1?(U.side=Nn,U.needsUpdate=!0,S.renderBufferDirect(z,P,V,U,x,le),U.side=Cr,U.needsUpdate=!0,S.renderBufferDirect(z,P,V,U,x,le),U.side=Xi):S.renderBufferDirect(z,P,V,U,x,le),x.onAfterRender(S,P,z,V,U,le)}function Nl(x,P,z){P.isScene!==!0&&(P=Et);let V=v.get(x),U=D.state.lights,le=D.state.shadowsArray,pe=U.state.version,ue=re.getParameters(x,U.state,le,P,z),Se=re.getProgramCacheKey(ue),we=V.programs;V.environment=x.isMeshStandardMaterial||x.isMeshLambertMaterial||x.isMeshPhongMaterial?P.environment:null,V.fog=P.fog;let ze=x.isMeshStandardMaterial||x.isMeshLambertMaterial&&!x.envMap||x.isMeshPhongMaterial&&!x.envMap;V.envMap=q.get(x.envMap||V.environment,ze),V.envMapRotation=V.environment!==null&&x.envMap===null?P.environmentRotation:x.envMapRotation,we===void 0&&(x.addEventListener("dispose",yt),we=new Map,V.programs=we);let Ze=we.get(Se);if(Ze!==void 0){if(V.currentProgram===Ze&&V.lightsStateVersion===pe)return w_(x,ue),Ze}else ue.uniforms=re.getUniforms(x),x.onBeforeCompile(ue,S),Ze=re.acquireProgram(ue,Se),we.set(Se,Ze),V.uniforms=ue.uniforms;let Te=V.uniforms;return(!x.isShaderMaterial&&!x.isRawShaderMaterial||x.clipping===!0)&&(Te.clippingPlanes=te.uniform),w_(x,ue),V.needsLights=Mw(x),V.lightsStateVersion=pe,V.needsLights&&(Te.ambientLightColor.value=U.state.ambient,Te.lightProbe.value=U.state.probe,Te.directionalLights.value=U.state.directional,Te.directionalLightShadows.value=U.state.directionalShadow,Te.spotLights.value=U.state.spot,Te.spotLightShadows.value=U.state.spotShadow,Te.rectAreaLights.value=U.state.rectArea,Te.ltc_1.value=U.state.rectAreaLTC1,Te.ltc_2.value=U.state.rectAreaLTC2,Te.pointLights.value=U.state.point,Te.pointLightShadows.value=U.state.pointShadow,Te.hemisphereLights.value=U.state.hemi,Te.directionalShadowMatrix.value=U.state.directionalShadowMatrix,Te.spotLightMatrix.value=U.state.spotLightMatrix,Te.spotLightMap.value=U.state.spotLightMap,Te.pointShadowMatrix.value=U.state.pointShadowMatrix),V.currentProgram=Ze,V.uniformsList=null,Ze}function E_(x){if(x.uniformsList===null){let P=x.currentProgram.getUniforms();x.uniformsList=Oa.seqWithValue(P.seq,x.uniforms)}return x.uniformsList}function w_(x,P){let z=v.get(x);z.outputColorSpace=P.outputColorSpace,z.batching=P.batching,z.batchingColor=P.batchingColor,z.instancing=P.instancing,z.instancingColor=P.instancingColor,z.instancingMorph=P.instancingMorph,z.skinning=P.skinning,z.morphTargets=P.morphTargets,z.morphNormals=P.morphNormals,z.morphColors=P.morphColors,z.morphTargetsCount=P.morphTargetsCount,z.numClippingPlanes=P.numClippingPlanes,z.numIntersection=P.numClipIntersection,z.vertexAlphas=P.vertexAlphas,z.vertexTangents=P.vertexTangents,z.toneMapping=P.toneMapping}function _w(x,P,z,V,U){P.isScene!==!0&&(P=Et),N.resetTextureUnits();let le=P.fog,pe=V.isMeshStandardMaterial||V.isMeshLambertMaterial||V.isMeshPhongMaterial?P.environment:null,ue=k===null?S.outputColorSpace:k.isXRRenderTarget===!0?k.texture.colorSpace:so,Se=V.isMeshStandardMaterial||V.isMeshLambertMaterial&&!V.envMap||V.isMeshPhongMaterial&&!V.envMap,we=q.get(V.envMap||pe,Se),ze=V.vertexColors===!0&&!!z.attributes.color&&z.attributes.color.itemSize===4,Ze=!!z.attributes.tangent&&(!!V.normalMap||V.anisotropy>0),Te=!!z.morphAttributes.position,xt=!!z.morphAttributes.normal,kt=!!z.morphAttributes.color,Ot=Ni;V.toneMapped&&(k===null||k.isXRRenderTarget===!0)&&(Ot=S.toneMapping);let Mt=z.morphAttributes.position||z.morphAttributes.normal||z.morphAttributes.color,hn=Mt!==void 0?Mt.length:0,Ee=v.get(V),Hn=D.state.lights;if(Ae===!0&&(Fe===!0||x!==B)){let Jt=x===B&&V.id===G;te.setState(V,x,Jt)}let ct=!1;V.version===Ee.__version?(Ee.needsLights&&Ee.lightsStateVersion!==Hn.state.version||Ee.outputColorSpace!==ue||U.isBatchedMesh&&Ee.batching===!1||!U.isBatchedMesh&&Ee.batching===!0||U.isBatchedMesh&&Ee.batchingColor===!0&&U.colorTexture===null||U.isBatchedMesh&&Ee.batchingColor===!1&&U.colorTexture!==null||U.isInstancedMesh&&Ee.instancing===!1||!U.isInstancedMesh&&Ee.instancing===!0||U.isSkinnedMesh&&Ee.skinning===!1||!U.isSkinnedMesh&&Ee.skinning===!0||U.isInstancedMesh&&Ee.instancingColor===!0&&U.instanceColor===null||U.isInstancedMesh&&Ee.instancingColor===!1&&U.instanceColor!==null||U.isInstancedMesh&&Ee.instancingMorph===!0&&U.morphTexture===null||U.isInstancedMesh&&Ee.instancingMorph===!1&&U.morphTexture!==null||Ee.envMap!==we||V.fog===!0&&Ee.fog!==le||Ee.numClippingPlanes!==void 0&&(Ee.numClippingPlanes!==te.numPlanes||Ee.numIntersection!==te.numIntersection)||Ee.vertexAlphas!==ze||Ee.vertexTangents!==Ze||Ee.morphTargets!==Te||Ee.morphNormals!==xt||Ee.morphColors!==kt||Ee.toneMapping!==Ot||Ee.morphTargetsCount!==hn)&&(ct=!0):(ct=!0,Ee.__version=V.version);let pi=Ee.currentProgram;ct===!0&&(pi=Nl(V,P,U));let Li=!1,gs=!1,ho=!1,wt=pi.getUniforms(),an=Ee.uniforms;if(be.useProgram(pi.program)&&(Li=!0,gs=!0,ho=!0),V.id!==G&&(G=V.id,gs=!0),Li||B!==x){be.buffers.depth.getReversed()&&x.reversedDepth!==!0&&(x._reversedDepth=!0,x.updateProjectionMatrix()),wt.setValue(I,"projectionMatrix",x.projectionMatrix),wt.setValue(I,"viewMatrix",x.matrixWorldInverse);let Rr=wt.map.cameraPosition;Rr!==void 0&&Rr.setValue(I,at.setFromMatrixPosition(x.matrixWorld)),Ct.logarithmicDepthBuffer&&wt.setValue(I,"logDepthBufFC",2/(Math.log(x.far+1)/Math.LN2)),(V.isMeshPhongMaterial||V.isMeshToonMaterial||V.isMeshLambertMaterial||V.isMeshBasicMaterial||V.isMeshStandardMaterial||V.isShaderMaterial)&&wt.setValue(I,"isOrthographic",x.isOrthographicCamera===!0),B!==x&&(B=x,gs=!0,ho=!0)}if(Ee.needsLights&&(Hn.state.directionalShadowMap.length>0&&wt.setValue(I,"directionalShadowMap",Hn.state.directionalShadowMap,N),Hn.state.spotShadowMap.length>0&&wt.setValue(I,"spotShadowMap",Hn.state.spotShadowMap,N),Hn.state.pointShadowMap.length>0&&wt.setValue(I,"pointShadowMap",Hn.state.pointShadowMap,N)),U.isSkinnedMesh){wt.setOptional(I,U,"bindMatrix"),wt.setOptional(I,U,"bindMatrixInverse");let Jt=U.skeleton;Jt&&(Jt.boneTexture===null&&Jt.computeBoneTexture(),wt.setValue(I,"boneTexture",Jt.boneTexture,N))}U.isBatchedMesh&&(wt.setOptional(I,U,"batchingTexture"),wt.setValue(I,"batchingTexture",U._matricesTexture,N),wt.setOptional(I,U,"batchingIdTexture"),wt.setValue(I,"batchingIdTexture",U._indirectTexture,N),wt.setOptional(I,U,"batchingColorTexture"),U._colorsTexture!==null&&wt.setValue(I,"batchingColorTexture",U._colorsTexture,N));let Ar=z.morphAttributes;if((Ar.position!==void 0||Ar.normal!==void 0||Ar.color!==void 0)&&fe.update(U,z,pi),(gs||Ee.receiveShadow!==U.receiveShadow)&&(Ee.receiveShadow=U.receiveShadow,wt.setValue(I,"receiveShadow",U.receiveShadow)),(V.isMeshStandardMaterial||V.isMeshLambertMaterial||V.isMeshPhongMaterial)&&V.envMap===null&&P.environment!==null&&(an.envMapIntensity.value=P.environmentIntensity),an.dfgLUT!==void 0&&(an.dfgLUT.value=yk()),gs&&(wt.setValue(I,"toneMappingExposure",S.toneMappingExposure),Ee.needsLights&&xw(an,ho),le&&V.fog===!0&&De.refreshFogUniforms(an,le),De.refreshMaterialUniforms(an,V,$e,he,D.state.transmissionRenderTarget[x.id]),Oa.upload(I,E_(Ee),an,N)),V.isShaderMaterial&&V.uniformsNeedUpdate===!0&&(Oa.upload(I,E_(Ee),an,N),V.uniformsNeedUpdate=!1),V.isSpriteMaterial&&wt.setValue(I,"center",U.center),wt.setValue(I,"modelViewMatrix",U.modelViewMatrix),wt.setValue(I,"normalMatrix",U.normalMatrix),wt.setValue(I,"modelMatrix",U.matrixWorld),V.isShaderMaterial||V.isRawShaderMaterial){let Jt=V.uniformsGroups;for(let Rr=0,po=Jt.length;Rr<po;Rr++){let C_=Jt[Rr];me.update(C_,pi),me.bind(C_,pi)}}return pi}function xw(x,P){x.ambientLightColor.needsUpdate=P,x.lightProbe.needsUpdate=P,x.directionalLights.needsUpdate=P,x.directionalLightShadows.needsUpdate=P,x.pointLights.needsUpdate=P,x.pointLightShadows.needsUpdate=P,x.spotLights.needsUpdate=P,x.spotLightShadows.needsUpdate=P,x.rectAreaLights.needsUpdate=P,x.hemisphereLights.needsUpdate=P}function Mw(x){return x.isMeshLambertMaterial||x.isMeshToonMaterial||x.isMeshPhongMaterial||x.isMeshStandardMaterial||x.isShadowMaterial||x.isShaderMaterial&&x.lights===!0}this.getActiveCubeFace=function(){return T},this.getActiveMipmapLevel=function(){return O},this.getRenderTarget=function(){return k},this.setRenderTargetTextures=function(x,P,z){let V=v.get(x);V.__autoAllocateDepthBuffer=x.resolveDepthBuffer===!1,V.__autoAllocateDepthBuffer===!1&&(V.__useRenderToTexture=!1),v.get(x.texture).__webglTexture=P,v.get(x.depthTexture).__webglTexture=V.__autoAllocateDepthBuffer?void 0:z,V.__hasExternalTextures=!0},this.setRenderTargetFramebuffer=function(x,P){let z=v.get(x);z.__webglFramebuffer=P,z.__useDefaultFramebuffer=P===void 0};let Sw=I.createFramebuffer();this.setRenderTarget=function(x,P=0,z=0){k=x,T=P,O=z;let V=null,U=!1,le=!1;if(x){let ue=v.get(x);if(ue.__useDefaultFramebuffer!==void 0){be.bindFramebuffer(I.FRAMEBUFFER,ue.__webglFramebuffer),H.copy(x.viewport),L.copy(x.scissor),ee=x.scissorTest,be.viewport(H),be.scissor(L),be.setScissorTest(ee),G=-1;return}else if(ue.__webglFramebuffer===void 0)N.setupRenderTarget(x);else if(ue.__hasExternalTextures)N.rebindTextures(x,v.get(x.texture).__webglTexture,v.get(x.depthTexture).__webglTexture);else if(x.depthBuffer){let ze=x.depthTexture;if(ue.__boundDepthTexture!==ze){if(ze!==null&&v.has(ze)&&(x.width!==ze.image.width||x.height!==ze.image.height))throw new Error("WebGLRenderTarget: Attached DepthTexture is initialized to the incorrect size.");N.setupDepthRenderbuffer(x)}}let Se=x.texture;(Se.isData3DTexture||Se.isDataArrayTexture||Se.isCompressedArrayTexture)&&(le=!0);let we=v.get(x).__webglFramebuffer;x.isWebGLCubeRenderTarget?(Array.isArray(we[P])?V=we[P][z]:V=we[P],U=!0):x.samples>0&&N.useMultisampledRTT(x)===!1?V=v.get(x).__webglMultisampledFramebuffer:Array.isArray(we)?V=we[z]:V=we,H.copy(x.viewport),L.copy(x.scissor),ee=x.scissorTest}else H.copy(X).multiplyScalar($e).floor(),L.copy(ie).multiplyScalar($e).floor(),ee=oe;if(z!==0&&(V=Sw),be.bindFramebuffer(I.FRAMEBUFFER,V)&&be.drawBuffers(x,V),be.viewport(H),be.scissor(L),be.setScissorTest(ee),U){let ue=v.get(x.texture);I.framebufferTexture2D(I.FRAMEBUFFER,I.COLOR_ATTACHMENT0,I.TEXTURE_CUBE_MAP_POSITIVE_X+P,ue.__webglTexture,z)}else if(le){let ue=P;for(let Se=0;Se<x.textures.length;Se++){let we=v.get(x.textures[Se]);I.framebufferTextureLayer(I.FRAMEBUFFER,I.COLOR_ATTACHMENT0+Se,we.__webglTexture,z,ue)}}else if(x!==null&&z!==0){let ue=v.get(x.texture);I.framebufferTexture2D(I.FRAMEBUFFER,I.COLOR_ATTACHMENT0,I.TEXTURE_2D,ue.__webglTexture,z)}G=-1},this.readRenderTargetPixels=function(x,P,z,V,U,le,pe,ue=0){if(!(x&&x.isWebGLRenderTarget)){Ne("WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let Se=v.get(x).__webglFramebuffer;if(x.isWebGLCubeRenderTarget&&pe!==void 0&&(Se=Se[pe]),Se){be.bindFramebuffer(I.FRAMEBUFFER,Se);try{let we=x.textures[ue],ze=we.format,Ze=we.type;if(x.textures.length>1&&I.readBuffer(I.COLOR_ATTACHMENT0+ue),!Ct.textureFormatReadable(ze)){Ne("WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}if(!Ct.textureTypeReadable(Ze)){Ne("WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}P>=0&&P<=x.width-V&&z>=0&&z<=x.height-U&&I.readPixels(P,z,V,U,se.convert(ze),se.convert(Ze),le)}finally{let we=k!==null?v.get(k).__webglFramebuffer:null;be.bindFramebuffer(I.FRAMEBUFFER,we)}}},this.readRenderTargetPixelsAsync=async function(x,P,z,V,U,le,pe,ue=0){if(!(x&&x.isWebGLRenderTarget))throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let Se=v.get(x).__webglFramebuffer;if(x.isWebGLCubeRenderTarget&&pe!==void 0&&(Se=Se[pe]),Se)if(P>=0&&P<=x.width-V&&z>=0&&z<=x.height-U){be.bindFramebuffer(I.FRAMEBUFFER,Se);let we=x.textures[ue],ze=we.format,Ze=we.type;if(x.textures.length>1&&I.readBuffer(I.COLOR_ATTACHMENT0+ue),!Ct.textureFormatReadable(ze))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(!Ct.textureTypeReadable(Ze))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");let Te=I.createBuffer();I.bindBuffer(I.PIXEL_PACK_BUFFER,Te),I.bufferData(I.PIXEL_PACK_BUFFER,le.byteLength,I.STREAM_READ),I.readPixels(P,z,V,U,se.convert(ze),se.convert(Ze),0);let xt=k!==null?v.get(k).__webglFramebuffer:null;be.bindFramebuffer(I.FRAMEBUFFER,xt);let kt=I.fenceSync(I.SYNC_GPU_COMMANDS_COMPLETE,0);return I.flush(),await AE(I,kt,4),I.bindBuffer(I.PIXEL_PACK_BUFFER,Te),I.getBufferSubData(I.PIXEL_PACK_BUFFER,0,le),I.deleteBuffer(Te),I.deleteSync(kt),le}else throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.")},this.copyFramebufferToTexture=function(x,P=null,z=0){let V=Math.pow(2,-z),U=Math.floor(x.image.width*V),le=Math.floor(x.image.height*V),pe=P!==null?P.x:0,ue=P!==null?P.y:0;N.setTexture2D(x,0),I.copyTexSubImage2D(I.TEXTURE_2D,z,0,0,pe,ue,U,le),be.unbindTexture()};let bw=I.createFramebuffer(),Ew=I.createFramebuffer();this.copyTextureToTexture=function(x,P,z=null,V=null,U=0,le=0){let pe,ue,Se,we,ze,Ze,Te,xt,kt,Ot=x.isCompressedTexture?x.mipmaps[le]:x.image;if(z!==null)pe=z.max.x-z.min.x,ue=z.max.y-z.min.y,Se=z.isBox3?z.max.z-z.min.z:1,we=z.min.x,ze=z.min.y,Ze=z.isBox3?z.min.z:0;else{let an=Math.pow(2,-U);pe=Math.floor(Ot.width*an),ue=Math.floor(Ot.height*an),x.isDataArrayTexture?Se=Ot.depth:x.isData3DTexture?Se=Math.floor(Ot.depth*an):Se=1,we=0,ze=0,Ze=0}V!==null?(Te=V.x,xt=V.y,kt=V.z):(Te=0,xt=0,kt=0);let Mt=se.convert(P.format),hn=se.convert(P.type),Ee;P.isData3DTexture?(N.setTexture3D(P,0),Ee=I.TEXTURE_3D):P.isDataArrayTexture||P.isCompressedArrayTexture?(N.setTexture2DArray(P,0),Ee=I.TEXTURE_2D_ARRAY):(N.setTexture2D(P,0),Ee=I.TEXTURE_2D),I.pixelStorei(I.UNPACK_FLIP_Y_WEBGL,P.flipY),I.pixelStorei(I.UNPACK_PREMULTIPLY_ALPHA_WEBGL,P.premultiplyAlpha),I.pixelStorei(I.UNPACK_ALIGNMENT,P.unpackAlignment);let Hn=I.getParameter(I.UNPACK_ROW_LENGTH),ct=I.getParameter(I.UNPACK_IMAGE_HEIGHT),pi=I.getParameter(I.UNPACK_SKIP_PIXELS),Li=I.getParameter(I.UNPACK_SKIP_ROWS),gs=I.getParameter(I.UNPACK_SKIP_IMAGES);I.pixelStorei(I.UNPACK_ROW_LENGTH,Ot.width),I.pixelStorei(I.UNPACK_IMAGE_HEIGHT,Ot.height),I.pixelStorei(I.UNPACK_SKIP_PIXELS,we),I.pixelStorei(I.UNPACK_SKIP_ROWS,ze),I.pixelStorei(I.UNPACK_SKIP_IMAGES,Ze);let ho=x.isDataArrayTexture||x.isData3DTexture,wt=P.isDataArrayTexture||P.isData3DTexture;if(x.isDepthTexture){let an=v.get(x),Ar=v.get(P),Jt=v.get(an.__renderTarget),Rr=v.get(Ar.__renderTarget);be.bindFramebuffer(I.READ_FRAMEBUFFER,Jt.__webglFramebuffer),be.bindFramebuffer(I.DRAW_FRAMEBUFFER,Rr.__webglFramebuffer);for(let po=0;po<Se;po++)ho&&(I.framebufferTextureLayer(I.READ_FRAMEBUFFER,I.COLOR_ATTACHMENT0,v.get(x).__webglTexture,U,Ze+po),I.framebufferTextureLayer(I.DRAW_FRAMEBUFFER,I.COLOR_ATTACHMENT0,v.get(P).__webglTexture,le,kt+po)),I.blitFramebuffer(we,ze,pe,ue,Te,xt,pe,ue,I.DEPTH_BUFFER_BIT,I.NEAREST);be.bindFramebuffer(I.READ_FRAMEBUFFER,null),be.bindFramebuffer(I.DRAW_FRAMEBUFFER,null)}else if(U!==0||x.isRenderTargetTexture||v.has(x)){let an=v.get(x),Ar=v.get(P);be.bindFramebuffer(I.READ_FRAMEBUFFER,bw),be.bindFramebuffer(I.DRAW_FRAMEBUFFER,Ew);for(let Jt=0;Jt<Se;Jt++)ho?I.framebufferTextureLayer(I.READ_FRAMEBUFFER,I.COLOR_ATTACHMENT0,an.__webglTexture,U,Ze+Jt):I.framebufferTexture2D(I.READ_FRAMEBUFFER,I.COLOR_ATTACHMENT0,I.TEXTURE_2D,an.__webglTexture,U),wt?I.framebufferTextureLayer(I.DRAW_FRAMEBUFFER,I.COLOR_ATTACHMENT0,Ar.__webglTexture,le,kt+Jt):I.framebufferTexture2D(I.DRAW_FRAMEBUFFER,I.COLOR_ATTACHMENT0,I.TEXTURE_2D,Ar.__webglTexture,le),U!==0?I.blitFramebuffer(we,ze,pe,ue,Te,xt,pe,ue,I.COLOR_BUFFER_BIT,I.NEAREST):wt?I.copyTexSubImage3D(Ee,le,Te,xt,kt+Jt,we,ze,pe,ue):I.copyTexSubImage2D(Ee,le,Te,xt,we,ze,pe,ue);be.bindFramebuffer(I.READ_FRAMEBUFFER,null),be.bindFramebuffer(I.DRAW_FRAMEBUFFER,null)}else wt?x.isDataTexture||x.isData3DTexture?I.texSubImage3D(Ee,le,Te,xt,kt,pe,ue,Se,Mt,hn,Ot.data):P.isCompressedArrayTexture?I.compressedTexSubImage3D(Ee,le,Te,xt,kt,pe,ue,Se,Mt,Ot.data):I.texSubImage3D(Ee,le,Te,xt,kt,pe,ue,Se,Mt,hn,Ot):x.isDataTexture?I.texSubImage2D(I.TEXTURE_2D,le,Te,xt,pe,ue,Mt,hn,Ot.data):x.isCompressedTexture?I.compressedTexSubImage2D(I.TEXTURE_2D,le,Te,xt,Ot.width,Ot.height,Mt,Ot.data):I.texSubImage2D(I.TEXTURE_2D,le,Te,xt,pe,ue,Mt,hn,Ot);I.pixelStorei(I.UNPACK_ROW_LENGTH,Hn),I.pixelStorei(I.UNPACK_IMAGE_HEIGHT,ct),I.pixelStorei(I.UNPACK_SKIP_PIXELS,pi),I.pixelStorei(I.UNPACK_SKIP_ROWS,Li),I.pixelStorei(I.UNPACK_SKIP_IMAGES,gs),le===0&&P.generateMipmaps&&I.generateMipmap(Ee),be.unbindTexture()},this.initRenderTarget=function(x){v.get(x).__webglFramebuffer===void 0&&N.setupRenderTarget(x)},this.initTexture=function(x){x.isCubeTexture?N.setTextureCube(x,0):x.isData3DTexture?N.setTexture3D(x,0):x.isDataArrayTexture||x.isCompressedArrayTexture?N.setTexture2DArray(x,0):N.setTexture2D(x,0),be.unbindTexture()},this.resetState=function(){T=0,O=0,k=null,be.reset(),ne.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return Ri}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(e){this._outputColorSpace=e;let t=this.getContext();t.drawingBufferColorSpace=st._getDrawingBufferColorSpace(e),t.unpackColorSpace=st._getUnpackColorSpace()}};var dp=class n{fossil;close=new Rt;collect=new Rt;get rarityLabel(){return{common:"Common",rare:"Rare",legendary:"Legendary"}[this.fossil.rarity]}get fossilEmoji(){let e=this.fossil.id.split("_")[0];return{"trex-skull-01":"\u{1F9B4}","triceratops-horn-01":"\u{1F995}","ammonite-01":"\u{1F41A}","mammoth-tusk-01":"\u{1F9A3}","shark-tooth-01":"\u{1F988}"}[e]??"\u{1FAA8}"}static \u0275fac=function(t){return new(t||n)};static \u0275cmp=wi({type:n,selectors:[["app-fossil-card"]],inputs:{fossil:"fossil"},outputs:{close:"close",collect:"collect"},decls:38,vars:11,consts:[[1,"fossil-card"],[1,"card-header"],[1,"rarity-badge"],[1,"close-btn",3,"click"],[1,"fossil-icon"],[1,"fossil-name"],[1,"fossil-species"],[1,"info-grid"],[1,"info-item"],[1,"label"],[1,"value"],[1,"description"],[1,"fun-fact"],[1,"fun-fact-label"],[1,"collect-btn",3,"click"]],template:function(t,i){t&1&&(en(0,"div",0)(1,"div",1)(2,"span",2),Ge(3),tn(),en(4,"button",3),xc("click",function(){return i.close.emit()}),Ge(5,"\u2715"),tn()(),en(6,"div",4),Ge(7),tn(),en(8,"h2",5),Ge(9),tn(),en(10,"p",6)(11,"em"),Ge(12),tn()(),en(13,"div",7)(14,"div",8)(15,"span",9),Ge(16,"Era"),tn(),en(17,"span",10),Ge(18),tn()(),en(19,"div",8)(20,"span",9),Ge(21,"Period"),tn(),en(22,"span",10),Ge(23),tn()(),en(24,"div",8)(25,"span",9),Ge(26,"Discovered"),tn(),en(27,"span",10),Ge(28),tn()()(),en(29,"p",11),Ge(30),tn(),en(31,"div",12)(32,"span",13),Ge(33,"Fun Fact"),tn(),en(34,"p"),Ge(35),tn()(),en(36,"button",14),xc("click",function(){return i.collect.emit(i.fossil)}),Ge(37," Collect Fossil "),tn()()),t&2&&(Kg("rarity-"+i.fossil.rarity),Qe(3),dn(i.rarityLabel),Qe(4),dn(i.fossilEmoji),Qe(2),dn(i.fossil.name),Qe(3),dn(i.fossil.species),Qe(6),dn(i.fossil.era),Qe(5),dn(i.fossil.period),Qe(5),dn(i.fossil.yearDiscovered),Qe(2),dn(i.fossil.description),Qe(5),dn(i.fossil.funFact))},dependencies:[$r],styles:[".fossil-card[_ngcontent-%COMP%]{background:linear-gradient(145deg,#2a1a00,#3d2a00);border:2px solid #8B6914;border-radius:16px;padding:20px;color:#f5e6c8;max-width:360px;width:90vw;box-shadow:0 8px 32px #0009}.rarity-legendary[_ngcontent-%COMP%]{border-color:gold;box-shadow:0 0 20px #ffd7004d}.rarity-rare[_ngcontent-%COMP%]{border-color:#a855f7;box-shadow:0 0 20px #a855f74d}.rarity-common[_ngcontent-%COMP%]{border-color:#6b7280}.card-header[_ngcontent-%COMP%]{display:flex;justify-content:space-between;align-items:center;margin-bottom:12px}.rarity-badge[_ngcontent-%COMP%]{font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:1px;padding:3px 8px;border-radius:4px;background:#ffffff1a}.close-btn[_ngcontent-%COMP%]{background:none;border:none;color:#f5e6c8;font-size:18px;cursor:pointer;padding:4px;line-height:1}.fossil-icon[_ngcontent-%COMP%]{font-size:48px;text-align:center;margin:8px 0}.fossil-name[_ngcontent-%COMP%]{font-size:20px;font-weight:700;text-align:center;margin:0 0 4px}.fossil-species[_ngcontent-%COMP%]{font-size:13px;color:#c8a86b;text-align:center;margin:0 0 16px}.info-grid[_ngcontent-%COMP%]{display:grid;grid-template-columns:repeat(3,1fr);gap:8px;margin-bottom:16px}.info-item[_ngcontent-%COMP%]{text-align:center;background:#0003;border-radius:8px;padding:8px 4px}.label[_ngcontent-%COMP%]{display:block;font-size:10px;text-transform:uppercase;color:#c8a86b;margin-bottom:4px}.value[_ngcontent-%COMP%]{display:block;font-size:13px;font-weight:600}.description[_ngcontent-%COMP%]{font-size:13px;line-height:1.5;color:#e0cca8;margin-bottom:16px}.fun-fact[_ngcontent-%COMP%]{background:#ffd70014;border-left:3px solid #ffd700;padding:10px 12px;border-radius:0 8px 8px 0;margin-bottom:16px}.fun-fact-label[_ngcontent-%COMP%]{font-size:10px;text-transform:uppercase;color:gold;font-weight:700}.fun-fact[_ngcontent-%COMP%]   p[_ngcontent-%COMP%]{font-size:13px;color:#f5e6c8;margin:4px 0 0;line-height:1.4}.collect-btn[_ngcontent-%COMP%]{width:100%;padding:12px;background:linear-gradient(135deg,#8b6914,#c8a020);border:none;border-radius:10px;color:#fff;font-size:16px;font-weight:700;cursor:pointer;letter-spacing:.5px}.collect-btn[_ngcontent-%COMP%]:active{transform:scale(.97)}"]})};function _k(n,e){if(n&1&&(tt(0,"div",13),Un(1,"span",14),Ge(2),mt()),n&2){let t=An();Qe(2),Td(" ",t.nearbyCount," fossil",t.nearbyCount>1?"s":""," nearby \u2014 tap screen to collect! ")}}function xk(n,e){if(n&1){let t=Wo();tt(0,"div",15)(1,"div",16)(2,"p"),Ge(3,"Tap to enter AR mode"),mt(),tt(4,"button",17),jn("click",function(){cr(t);let r=An();return lr(r.startAR.emit())}),Ge(5,"Start AR"),mt()()()}}function Mk(n,e){if(n&1&&Un(0,"div",20),n&2){let t=e.$implicit;Cd("width",t.size,"px")("height",t.size,"px"),qt("ngStyle",t.style)}}function Sk(n,e){if(n&1&&(rc(),Un(0,"circle",32)),n&2){let t=e.$implicit;xd("cx",t.x)("cy",t.y)("r",t.r)}}function bk(n,e){if(n&1&&(tt(0,"div",21)(1,"div",22),Ge(2,"RADAR"),mt(),rc(),tt(3,"svg",23),Un(4,"circle",24)(5,"circle",25)(6,"circle",26)(7,"line",27)(8,"line",28)(9,"polygon",29),Vi(10,Sk,1,3,"circle",30),Un(11,"circle",31),mt()()),n&2){let t=An(2);Qe(10),qt("ngForOf",t.radarDots)("ngForTrackBy",t.trackById)}}function Ek(n,e){if(n&1&&(Md(0),Vi(1,Mk,1,5,"div",18)(2,bk,12,2,"div",19),Sd()),n&2){let t=An();Qe(),qt("ngForOf",t.offScreenFossils)("ngForTrackBy",t.trackById),Qe(),qt("ngIf",t.fossilDirections.length>0)}}var fp=class n{collected=0;total=0;nearbyCount=0;gpsActive=!1;showARPrompt=!1;arActive=!1;fossilDirections=[];startAR=new Rt;openMap=new Rt;openCollection=new Rt;openLearn=new Rt;trackById(e,t){return t.id}get radarDots(){return this.fossilDirections.filter(i=>i.distance<=50).map(i=>{let r=Math.min(i.distance,50),s=r/50*44,o=i.relAngle*Math.PI/180,a=1+(1-r/50)*2.5;return{id:i.id,x:+(s*Math.sin(o)).toFixed(2),y:+(-s*Math.cos(o)).toFixed(2),r:+a.toFixed(2)}})}get offScreenFossils(){return this.fossilDirections.filter(e=>e.distance<=50).map(e=>{let t=e.relAngle>180?e.relAngle-360:e.relAngle;if(Math.abs(t)<=50)return null;let i=Math.round(12+(1-Math.min(e.distance,200)/200)*22),r=e.relAngle*Math.PI/180,s=Math.sin(r),o=-Math.cos(r),a=Math.abs(s),c=Math.abs(o),l;if(a*1.8>c){let u=Math.max(12,Math.min(88,50+o/a*30))+"%";l=s>0?{right:"14px",top:u}:{left:"14px",top:u}}else{let u=Math.max(12,Math.min(88,50+s/c*38))+"%";l=o>0?{bottom:"85px",left:u}:{top:"70px",left:u}}return{id:e.id,size:i,style:l}}).filter(e=>e!==null)}static \u0275fac=function(t){return new(t||n)};static \u0275cmp=wi({type:n,selectors:[["app-hud"]],inputs:{collected:"collected",total:"total",nearbyCount:"nearbyCount",gpsActive:"gpsActive",showARPrompt:"showARPrompt",arActive:"arActive",fossilDirections:"fossilDirections"},outputs:{startAR:"startAR",openMap:"openMap",openCollection:"openCollection",openLearn:"openLearn"},decls:29,vars:9,consts:[[1,"hud"],[1,"top-bar"],[1,"score-badge"],[1,"score-label"],[1,"score-value"],[1,"title"],[1,"gps-badge"],["class","nearby-panel",4,"ngIf"],["class","center-prompt",4,"ngIf"],[4,"ngIf"],[1,"version-stamp"],[1,"bottom-bar"],[1,"icon-btn",3,"click"],[1,"nearby-panel"],[1,"pulse-dot"],[1,"center-prompt"],[1,"prompt-box"],[1,"ar-btn",3,"click"],["class","edge-dot",3,"ngStyle","width","height",4,"ngFor","ngForOf","ngForTrackBy"],["class","radar-wrap",4,"ngIf"],[1,"edge-dot",3,"ngStyle"],[1,"radar-wrap"],[1,"radar-title"],["viewBox","-50 -50 100 100",1,"radar-svg"],["cx","0","cy","0","r","49","fill","rgba(0,0,0,0.6)","stroke","rgba(255,215,0,0.35)","stroke-width","1"],["cx","0","cy","0","r","13","fill","none","stroke","rgba(74,222,128,0.35)","stroke-width","0.8","stroke-dasharray","2,2"],["cx","0","cy","0","r","32","fill","none","stroke","rgba(255,255,255,0.1)","stroke-width","0.5"],["x1","0","y1","-48","x2","0","y2","48","stroke","rgba(255,255,255,0.07)","stroke-width","0.5"],["x1","-48","y1","0","x2","48","y2","0","stroke","rgba(255,255,255,0.07)","stroke-width","0.5"],["points","0,-45 2.5,-37 -2.5,-37","fill","#4ade80","opacity","0.85"],["class","fossil-dot","fill","#ffd700",4,"ngFor","ngForOf","ngForTrackBy"],["cx","0","cy","0","r","2.5","fill","white"],["fill","#ffd700",1,"fossil-dot"]],template:function(t,i){t&1&&(tt(0,"div",0)(1,"div",1)(2,"div",2)(3,"span",3),Ge(4,"Collected"),mt(),tt(5,"span",4),Ge(6),mt()(),tt(7,"div",5),Ge(8,"AR Archaeology"),mt(),tt(9,"div",6),Ge(10),mt()(),Vi(11,_k,3,2,"div",7)(12,xk,6,0,"div",8)(13,Ek,3,3,"ng-container",9),tt(14,"div",10),Ge(15,"v1.2.3"),mt(),tt(16,"div",11)(17,"button",12),jn("click",function(){return i.openMap.emit()}),Ge(18,"\u{1F5FA}\uFE0F"),tt(19,"span"),Ge(20,"Map"),mt()(),tt(21,"button",12),jn("click",function(){return i.openCollection.emit()}),Ge(22,"\u{1F9B4}"),tt(23,"span"),Ge(24,"Collection"),mt()(),tt(25,"button",12),jn("click",function(){return i.openLearn.emit()}),Ge(26,"\u{1F4DA}"),tt(27,"span"),Ge(28,"Learn"),mt()()()()),t&2&&(Qe(6),dn(i.collected),Qe(3),$o("gps-ok",i.gpsActive)("gps-error",!i.gpsActive),Qe(),pr(" ",i.gpsActive?"\u{1F4CD} GPS":"\u26A0\uFE0F No GPS"," "),Qe(),qt("ngIf",i.nearbyCount>0),Qe(),qt("ngIf",i.showARPrompt),Qe(),qt("ngIf",i.arActive))},dependencies:[$r,Fd,Ec,fv],styles:['@charset "UTF-8";.hud[_ngcontent-%COMP%]{position:fixed;inset:0;pointer-events:none;display:flex;flex-direction:column;z-index:20}.top-bar[_ngcontent-%COMP%]{display:flex;justify-content:space-between;align-items:center;padding:12px 16px;background:linear-gradient(180deg,rgba(0,0,0,.7) 0%,transparent 100%);pointer-events:all}.score-badge[_ngcontent-%COMP%], .gps-badge[_ngcontent-%COMP%]{background:#00000080;border-radius:20px;padding:4px 10px;font-size:12px;color:#f5e6c8;font-weight:600}.score-label[_ngcontent-%COMP%]{display:block;font-size:9px;text-transform:uppercase;color:#c8a86b}.score-value[_ngcontent-%COMP%]{display:block;font-size:16px;font-weight:700}.gps-ok[_ngcontent-%COMP%]{color:#4ade80}.gps-error[_ngcontent-%COMP%]{color:#f87171}.title[_ngcontent-%COMP%]{font-size:16px;font-weight:700;color:#f5e6c8;text-shadow:0 1px 4px rgba(0,0,0,.8)}.nearby-panel[_ngcontent-%COMP%]{margin:8px 16px 0;background:#8b6914d9;color:#fff;padding:6px 12px;border-radius:20px;font-size:12px;font-weight:600;display:flex;align-items:center;gap:8px;pointer-events:all;align-self:flex-start}.pulse-dot[_ngcontent-%COMP%]{width:7px;height:7px;border-radius:50%;background:gold;animation:_ngcontent-%COMP%_pulse 1.2s infinite}@keyframes _ngcontent-%COMP%_pulse{0%,to{transform:scale(1);opacity:1}50%{transform:scale(1.4);opacity:.6}}.center-prompt[_ngcontent-%COMP%]{flex:1;display:flex;align-items:center;justify-content:center;pointer-events:all}.prompt-box[_ngcontent-%COMP%]{background:#000000b3;border:1px solid #8B6914;border-radius:12px;padding:20px 28px;text-align:center;color:#f5e6c8}.prompt-box[_ngcontent-%COMP%]   p[_ngcontent-%COMP%]{margin-bottom:12px;font-size:16px}.ar-btn[_ngcontent-%COMP%]{background:linear-gradient(135deg,#8b6914,#c8a020);border:none;color:#fff;font-size:16px;font-weight:700;padding:10px 28px;border-radius:8px;cursor:pointer}.edge-dot[_ngcontent-%COMP%]{position:fixed;border-radius:50%;background:radial-gradient(circle at 35% 35%,#ffe066,#e67e00);box-shadow:0 0 10px #ffc8008c;transform:translate(-50%,-50%);pointer-events:none;animation:_ngcontent-%COMP%_edgePulse 1.8s ease-in-out infinite;transition:top .45s ease,left .45s ease,right .45s ease,bottom .45s ease,width .45s ease,height .45s ease}@keyframes _ngcontent-%COMP%_edgePulse{0%,to{opacity:.85;transform:translate(-50%,-50%) scale(1)}50%{opacity:1;transform:translate(-50%,-50%) scale(1.18)}}.radar-wrap[_ngcontent-%COMP%]{position:fixed;bottom:90px;right:12px;display:flex;flex-direction:column;align-items:center;gap:2px;pointer-events:none}.radar-title[_ngcontent-%COMP%]{font-size:9px;color:#ffd70099;letter-spacing:2px;font-weight:700}.radar-svg[_ngcontent-%COMP%]{width:90px;height:90px}.fossil-dot[_ngcontent-%COMP%]{opacity:.9;transition:cx .4s ease,cy .4s ease,r .35s ease}.bottom-bar[_ngcontent-%COMP%]{position:fixed;bottom:0;left:0;right:0;display:flex;justify-content:space-around;padding:8px 0 20px;background:linear-gradient(0deg,rgba(0,0,0,.8) 0%,transparent 100%);pointer-events:all}.icon-btn[_ngcontent-%COMP%]{background:none;border:none;color:#f5e6c8;font-size:22px;cursor:pointer;display:flex;flex-direction:column;align-items:center;gap:2px}.icon-btn[_ngcontent-%COMP%]   span[_ngcontent-%COMP%]{font-size:10px}.version-stamp[_ngcontent-%COMP%]{position:fixed;bottom:72px;right:8px;font-size:10px;color:#ffffff4d;pointer-events:none;letter-spacing:.5px}']})};function wk(n,e,t=5,i=30){let r=t+Math.random()*(i-t),s=Math.random()*2*Math.PI,o=cw(n),a=cw(e),c=r/6371e3,l=Math.asin(Math.sin(o)*Math.cos(c)+Math.cos(o)*Math.sin(c)*Math.cos(s)),u=a+Math.atan2(Math.sin(s)*Math.sin(c)*Math.cos(o),Math.cos(c)-Math.sin(o)*Math.sin(l));return{lat:lw(l),lng:lw(u)}}function uw(n,e,t,i){return Array.from({length:e},(r,s)=>{let o=n[s%n.length],{lat:a,lng:c}=wk(t,i);return rt(ae({},o),{id:`${o.id}_${Date.now()}_${s}`,lat:a,lng:c,discovered:!1})})}function cw(n){return n*Math.PI/180}function lw(n){return n*180/Math.PI}var dw=[{id:"trex-skull-01",name:"T-Rex Skull Fragment",species:"Tyrannosaurus rex",era:"Mesozoic",period:"Late Cretaceous",yearDiscovered:1902,description:"A fossilized fragment of a Tyrannosaurus rex skull. T-Rex had one of the most powerful bites of any land predator, capable of crushing bone.",funFact:"T-Rex had tiny arms but enormous legs \u2014 it could run up to 12 mph!",lat:0,lng:0,discovered:!1,rarity:"legendary"},{id:"triceratops-horn-01",name:"Triceratops Horn",species:"Triceratops horridus",era:"Mesozoic",period:"Late Cretaceous",yearDiscovered:1889,description:"One of the three distinctive horns from a Triceratops. These horns could grow up to 1 meter long and were used for defense and display.",funFact:"Triceratops lived right at the end of the dinosaur era \u2014 some individuals may have seen the asteroid impact!",lat:0,lng:0,discovered:!1,rarity:"rare"},{id:"ammonite-01",name:"Ammonite Shell",species:"Ammonoidea",era:"Paleozoic/Mesozoic",period:"Devonian to Cretaceous",yearDiscovered:1800,description:"A spiral-shelled cephalopod that lived in ancient seas. Ammonites are excellent index fossils \u2014 their presence tells geologists the exact age of the rock layer.",funFact:"Ammonites survived three mass extinctions but were wiped out in the same event that killed the dinosaurs.",lat:0,lng:0,discovered:!1,rarity:"common"},{id:"mammoth-tusk-01",name:"Woolly Mammoth Tusk",species:"Mammuthus primigenius",era:"Cenozoic",period:"Pleistocene",yearDiscovered:1799,description:"A curved tusk from a woolly mammoth. Mammoths used their tusks to sweep snow away from food and to fight rivals.",funFact:"Woolly mammoths are so well-preserved in permafrost that scientists have recovered intact DNA \u2014 a revival project is underway!",lat:0,lng:0,discovered:!1,rarity:"rare"},{id:"shark-tooth-01",name:"Megalodon Tooth",species:"Otodus megalodon",era:"Cenozoic",period:"Miocene to Pliocene",yearDiscovered:1667,description:"A massive tooth from Megalodon, the largest shark to ever live. A single tooth could be over 18 cm long \u2014 bigger than your hand.",funFact:"Megalodon is estimated to have been 15-20 meters long. A great white shark could fit in its mouth.",lat:0,lng:0,discovered:!1,rarity:"legendary"}];var hp=class n{constructor(e){this.ngZone=e}renderer;scene;camera;xrSession=null;fossilMeshes=new Map;animationId=0;tapHandler;supported=Vt(!1);active=Vt(!1);loading=Vt(!1);error=Vt(null);async checkSupport(){if(!navigator.xr)return this.error.set("WebXR not available in this browser"),!1;let e=await navigator.xr.isSessionSupported("immersive-ar");return this.supported.set(e),e||this.error.set("AR not supported on this device"),e}async init(e){this.renderer=new cp({canvas:e,alpha:!0,antialias:!0}),this.renderer.setPixelRatio(window.devicePixelRatio),this.renderer.setSize(window.innerWidth,window.innerHeight),this.renderer.xr.enabled=!0,this.renderer.xr.setReferenceSpaceType("local"),e.addEventListener("touchend",r=>{if(this.xrSession)return;let s=r.changedTouches[0];if(!s)return;let o=e.getBoundingClientRect(),a=new it((s.clientX-o.left)/o.width*2-1,-((s.clientY-o.top)/o.height)*2+1),c=new Ia;c.setFromCamera(a,this.camera),this.checkFossilHit(c.ray.origin,c.ray.direction)},{passive:!0}),this.scene=new sl,this.camera=new Mn(70,window.innerWidth/window.innerHeight,.01,20);let t=new yl(16777215,1.2);this.scene.add(t);let i=new vl(16765565,1.5);i.position.set(1,2,1),this.scene.add(i)}async startAR(e){if(!navigator.xr){this.error.set("WebXR not available in this browser");return}this.error.set(null),this.loading.set(!0);try{let t={requiredFeatures:[],optionalFeatures:["hit-test","dom-overlay"]};e&&(t.domOverlay={root:e}),this.xrSession=await navigator.xr.requestSession("immersive-ar",t),await this.renderer.xr.setSession(this.xrSession),this.active.set(!0),this.xrSession.addEventListener("select",i=>{let r=i,s=this.renderer.xr.getReferenceSpace();if(!s||!r.frame||!r.inputSource)return;let o=r.frame.getPose(r.inputSource.targetRaySpace,s);if(!o)return;let a=new It().fromArray(o.transform.matrix),c=new F().setFromMatrixPosition(a),l=new fi().setFromRotationMatrix(a),u=new F(0,0,-1).applyQuaternion(l).normalize();this.checkFossilHit(c,u)}),this.xrSession.addEventListener("end",()=>{this.ngZone.run(()=>{this.active.set(!1),this.loading.set(!1),this.xrSession=null})}),this.ngZone.runOutsideAngular(()=>{this.renderer.setAnimationLoop((i,r)=>{this.tick(r)})})}catch(t){let i=t instanceof Error?t.message:String(t);this.error.set(`AR failed: ${i}`),this.xrSession&&(await this.xrSession.end().catch(()=>{}),this.xrSession=null)}finally{this.loading.set(!1)}}async stopAR(){this.xrSession&&await this.xrSession.end(),this.renderer.setAnimationLoop(null)}placeFossil(e,t){if(this.fossilMeshes.has(e))return;let i=new Er,r=new Ca(.08,10,10),s=new hl({color:13150315,roughness:.6,metalness:.2}),o=new on(r,s);i.add(o);let a=new Ta(.13,.008,8,32),c=new qi({color:16766720,transparent:!0,opacity:.7}),l=new on(a,c);l.rotation.x=Math.PI/2,i.add(l);let u=new Ta(.18,.004,8,32),d=new qi({color:16766720,transparent:!0,opacity:.3}),f=new on(u,d);f.rotation.x=Math.PI/2,i.add(f);let h=new dl(.03,.09,6),g=new qi({color:16766720}),_=new on(h,g);_.rotation.z=Math.PI,_.position.y=.24,i.add(_);let m=new Ca(.28,6,6),p=new qi({visible:!1}),M=new on(m,p);i.add(M),i.position.copy(t),this.scene.add(i),this.fossilMeshes.set(e,i)}setTapHandler(e){this.tapHandler=e}removeFossil(e){let t=this.fossilMeshes.get(e);t&&(this.scene.remove(t),this.fossilMeshes.delete(e))}checkFossilHit(e,t){let i=new Ia(e.clone(),t.clone().normalize(),.01,20),r=new Map;this.fossilMeshes.forEach((a,c)=>{a.traverse(l=>r.set(l,c)),r.set(a,c)});let s=Array.from(r.keys()),o=i.intersectObjects(s,!1);if(o.length>0){let a=r.get(o[0].object);a&&this.ngZone.run(()=>this.tapHandler?.(a))}}tick(e){let t=performance.now()/1e3;this.fossilMeshes.forEach(i=>{if(i.children[1]&&(i.children[1].rotation.z+=.015),i.children[2]){i.children[2].rotation.z-=.008;let r=i.children[2].material;r.opacity=.15+Math.abs(Math.sin(t*1.5))*.25}i.children[3]&&(i.children[3].position.y=.24+Math.sin(t*2.5)*.03)}),this.renderer.render(this.scene,this.camera)}static \u0275fac=function(t){return new(t||n)(Re(Bt))};static \u0275prov=Ce({token:n,factory:n.\u0275fac,providedIn:"root"})};var Dk=10,pp=class n{constructor(e){this.ngZone=e}playerPosition=Vt(null);nearbyFossils=Vt([]);error=Vt(null);watchId=null;fossils=[];loadFossils(e){this.fossils=e}startTracking(){if(!navigator.geolocation){this.error.set("Geolocation is not supported by your browser");return}this.watchId=navigator.geolocation.watchPosition(e=>{this.ngZone.run(()=>{let t={lat:e.coords.latitude,lng:e.coords.longitude,accuracy:e.coords.accuracy};this.playerPosition.set(t),this.updateNearby(t),this.error.set(null)})},e=>{this.ngZone.run(()=>{this.error.set(`GPS error: ${e.message}`)})},{enableHighAccuracy:!0,maximumAge:5e3,timeout:1e4})}stopTracking(){this.watchId!==null&&(navigator.geolocation.clearWatch(this.watchId),this.watchId=null)}updateNearby(e){let t=this.fossils.filter(i=>this.haversineMeters(e.lat,e.lng,i.lat,i.lng)<=Dk);this.nearbyFossils.set(t)}distanceTo(e){let t=this.playerPosition();return t?this.haversineMeters(t.lat,t.lng,e.lat,e.lng):1/0}bearingTo(e){let t=this.playerPosition();if(!t)return 0;let i=this.toRad(t.lat),r=this.toRad(e.lat),s=this.toRad(e.lng-t.lng),o=Math.sin(s)*Math.cos(r),a=Math.cos(i)*Math.sin(r)-Math.sin(i)*Math.cos(r)*Math.cos(s);return(Math.atan2(o,a)*180/Math.PI+360)%360}haversineMeters(e,t,i,r){let o=this.toRad(i-e),a=this.toRad(r-t),c=Math.sin(o/2)**2+Math.cos(this.toRad(e))*Math.cos(this.toRad(i))*Math.sin(a/2)**2;return 6371e3*2*Math.atan2(Math.sqrt(c),Math.sqrt(1-c))}toRad(e){return e*Math.PI/180}static \u0275fac=function(t){return new(t||n)(Re(Bt))};static \u0275prov=Ce({token:n,factory:n.\u0275fac,providedIn:"root"})};var fw=1.0668,mp=class n{constructor(e){this.ngZone=e}orientation=Vt(null);permissionDenied=Vt(!1);bound;async requestPermission(){let e=DeviceOrientationEvent;return typeof e.requestPermission=="function"&&await e.requestPermission()!=="granted"?(this.permissionDenied.set(!0),!1):!0}start(){this.bound=e=>{this.ngZone.run(()=>{if(e.alpha==null)return;let t=(e.beta??0)-90;this.orientation.set({heading:e.alpha??0,pitch:t,roll:e.gamma??0})})},window.addEventListener("deviceorientation",this.bound,!0)}stop(){this.bound&&window.removeEventListener("deviceorientation",this.bound,!0)}groundLookDistance(e=fw){let t=this.orientation();if(!t)return 2;let i=Math.abs(t.pitch)*Math.PI/180;return i<.05?10:Math.min(10,Math.max(.3,e/Math.tan(i)))}fossilOffset(e,t,i=fw){let s=this.orientation()?.heading??0,a=(e-s)*Math.PI/180;return{x:t*Math.sin(a),y:-i,z:-t*Math.cos(a)}}static \u0275fac=function(t){return new(t||n)(Re(Bt))};static \u0275prov=Ce({token:n,factory:n.\u0275fac,providedIn:"root"})};var Rk=["arCanvas"],Nk=["arOverlay"];function Pk(n,e){n&1&&(tt(0,"p",17),Ge(1," \u26A0\uFE0F AR not detected \u2014 needs Chrome on Android with ARCore "),mt())}function Ok(n,e){if(n&1&&(tt(0,"p",18),Ge(1),mt()),n&2){let t=An(2);Qe(),dn(t.arService.error())}}function Lk(n,e){if(n&1){let t=Wo();tt(0,"div",9)(1,"div",10)(2,"div",11),Ge(3,"\u{1F9B4}"),mt(),tt(4,"h1"),Ge(5,"ARArcheoGame"),mt(),tt(6,"div",12)(7,"span"),Ge(8),mt()(),tt(9,"div",13),Ge(10),mt(),tt(11,"button",14),jn("click",function(){cr(t);let r=An();return lr(r.onStartAR())}),Ge(12),mt(),Vi(13,Pk,2,0,"p",15)(14,Ok,2,1,"p",16),mt()()}if(n&2){let t=An();Qe(7),$o("ok",!!t.gps.playerPosition())("waiting",!t.gps.playerPosition()),Qe(),pr(" ",t.gps.playerPosition()?"\u{1F4CD} GPS active":"\u23F3 Waiting for GPS..."," "),Qe(2),pr("",t.allFossils().length," fossils hidden nearby"),Qe(),qt("disabled",t.arService.loading()),Qe(),pr(" ",t.arService.loading()?"\u23F3 Starting...":"\u{1F4F7} Start AR"," "),Qe(),qt("ngIf",!t.arService.supported()),Qe(),qt("ngIf",t.arService.error())}}function Fk(n,e){if(n&1){let t=Wo();tt(0,"div",19),jn("click",function(){cr(t);let r=An();return lr(r.selectedFossil.set(null))}),tt(1,"div",20),jn("click",function(r){return r.stopPropagation()}),tt(2,"app-fossil-card",21),jn("close",function(){cr(t);let r=An();return lr(r.selectedFossil.set(null))})("collect",function(r){cr(t);let s=An();return lr(s.onCollect(r))}),mt()()()}if(n&2){let t=An();Qe(2),qt("fossil",t.selectedFossil())}}function kk(n,e){if(n&1&&(tt(0,"div",22),Ge(1),mt()),n&2){let t=An();Qe(),dn(t.gps.error())}}var Uk=10,Bk=100,gp=class n{constructor(e,t,i){this.arService=e;this.gps=t;this.orientation=i;Bu(()=>{let r=this.gps.playerPosition();r&&Ci(()=>this.replenishFossils(r))}),Bu(()=>{let r=this.gps.nearbyFossils();this.syncARMarkers(r)})}canvasRef;overlayRef;fossilTemplates=dw;allFossils=Vt([]);collectedIds=new Set;selectedFossil=Vt(null);showMap=!1;showCollection=!1;showLearn=!1;fossilDirections=Mc(()=>{let e=this.allFossils(),t=this.orientation.orientation()?.heading??0;return this.gps.playerPosition()?e.filter(i=>!this.collectedIds.has(i.id)&&!i.discovered).map(i=>{let s=((this.gps.bearingTo(i)-t)%360+360)%360;return{id:i.id,name:i.name,relAngle:s,distance:Math.round(this.gps.distanceTo(i))}}).sort((i,r)=>i.distance-r.distance):[]});async ngOnInit(){await this.arService.checkSupport(),await this.arService.init(this.canvasRef.nativeElement),this.orientation.start(),this.gps.startTracking(),this.arService.setTapHandler(e=>{if(this.selectedFossil())return;let t=this.allFossils().find(i=>i.id===e&&!this.collectedIds.has(i.id)&&!i.discovered);t&&this.selectedFossil.set(t)})}async onStartAR(){await this.orientation.requestPermission(),await this.arService.startAR(this.overlayRef.nativeElement)}onCollect(e){this.collectedIds.add(e.id),this.arService.removeFossil(e.id),this.selectedFossil.set(null),this.allFossils.update(t=>t.filter(i=>i.id!==e.id)),this.gps.loadFossils(this.allFossils())}replenishFossils(e){let t=this.allFossils(),i=t.filter(o=>this.gps.distanceTo(o)>Bk?(this.arService.removeFossil(o.id),!1):!0),r=Math.max(0,Uk-i.length),s=r>0?uw(this.fossilTemplates,r,e.lat,e.lng):[];if(i.length!==t.length||s.length>0){let o=[...i,...s];this.allFossils.set(o),this.gps.loadFossils(o)}}syncARMarkers(e){e.forEach(i=>{if(this.collectedIds.has(i.id))return;let r=this.gps.distanceTo(i),s=this.gps.bearingTo(i),o=Math.min(3,r*.1),{x:a,y:c,z:l}=this.orientation.fossilOffset(s,o);this.arService.placeFossil(i.id,new F(a,c,l))});let t=new Set(e.map(i=>i.id));this.allFossils().forEach(i=>{!t.has(i.id)&&!this.collectedIds.has(i.id)&&this.arService.removeFossil(i.id)})}ngOnDestroy(){this.gps.stopTracking(),this.orientation.stop(),this.arService.stopAR()}static \u0275fac=function(t){return new(t||n)(In(hp),In(pp),In(mp))};static \u0275cmp=wi({type:n,selectors:[["app-ar-view"]],viewQuery:function(t,i){if(t&1&&bd(Rk,7)(Nk,7),t&2){let r;Ed(r=wd())&&(i.canvasRef=r.first),Ed(r=wd())&&(i.overlayRef=r.first)}},decls:9,vars:10,consts:[["arCanvas",""],["arOverlay",""],[1,"ar-container"],["class","no-ar-bg",4,"ngIf"],[1,"ar-canvas"],[1,"ar-overlay"],[3,"startAR","openMap","openCollection","openLearn","collected","total","nearbyCount","gpsActive","showARPrompt","arActive","fossilDirections"],["class","overlay-backdrop",3,"click",4,"ngIf"],["class","gps-error-toast",4,"ngIf"],[1,"no-ar-bg"],[1,"no-ar-content"],[1,"logo"],[1,"status-row"],[1,"fossil-count"],[1,"start-ar-btn",3,"click","disabled"],["class","hint",4,"ngIf"],["class","hint error",4,"ngIf"],[1,"hint"],[1,"hint","error"],[1,"overlay-backdrop",3,"click"],[1,"overlay-center",3,"click"],[3,"close","collect","fossil"],[1,"gps-error-toast"]],template:function(t,i){t&1&&(tt(0,"div",2),Vi(1,Lk,15,10,"div",3),Un(2,"canvas",4,0),tt(4,"div",5,1)(6,"app-hud",6),jn("startAR",function(){return i.onStartAR()})("openMap",function(){return i.showMap=!0})("openCollection",function(){return i.showCollection=!0})("openLearn",function(){return i.showLearn=!0}),mt(),Vi(7,Fk,3,1,"div",7)(8,kk,2,1,"div",8),mt()()),t&2&&(Qe(),qt("ngIf",!i.arService.active()),Qe(5),qt("collected",i.collectedIds.size)("total",i.fossilTemplates.length)("nearbyCount",i.gps.nearbyFossils().length)("gpsActive",!!i.gps.playerPosition())("showARPrompt",!i.arService.active()&&i.arService.supported())("arActive",i.arService.active())("fossilDirections",i.fossilDirections()),Qe(),qt("ngIf",i.selectedFossil()),Qe(),qt("ngIf",i.gps.error()))},dependencies:[$r,Ec,dp,fp],styles:[".ar-container[_ngcontent-%COMP%]{position:fixed;inset:0;background:#1a0f00}.ar-canvas[_ngcontent-%COMP%]{position:fixed;inset:0;width:100%;height:100%;display:block}.ar-overlay[_ngcontent-%COMP%]{position:fixed;inset:0;pointer-events:none}.no-ar-bg[_ngcontent-%COMP%]{position:fixed;inset:0;z-index:10;background:radial-gradient(ellipse at center,#3d2a00,#1a0f00 70%);display:flex;align-items:center;justify-content:center}.no-ar-content[_ngcontent-%COMP%]{text-align:center;color:#f5e6c8;padding:24px}.logo[_ngcontent-%COMP%]{font-size:64px;margin-bottom:12px}h1[_ngcontent-%COMP%]{font-size:28px;font-weight:800;letter-spacing:1px;margin-bottom:8px;color:gold}.status-row[_ngcontent-%COMP%]{margin-bottom:12px}.status-row[_ngcontent-%COMP%]   .ok[_ngcontent-%COMP%]{color:#4ade80;font-weight:600}.status-row[_ngcontent-%COMP%]   .waiting[_ngcontent-%COMP%]{color:#facc15;font-weight:600}.fossil-count[_ngcontent-%COMP%]{display:inline-block;background:#8b69144d;border:1px solid #8B6914;border-radius:20px;padding:6px 16px;font-size:13px;color:#f5e6c8;margin-bottom:24px}.start-ar-btn[_ngcontent-%COMP%]{display:block;width:200px;margin:0 auto 16px;padding:14px;background:linear-gradient(135deg,#8b6914,#c8a020);border:none;border-radius:12px;color:#fff;font-size:18px;font-weight:700;cursor:pointer;box-shadow:0 4px 20px #8b691480}.start-ar-btn[_ngcontent-%COMP%]:active{transform:scale(.96)}.start-ar-btn[_ngcontent-%COMP%]:disabled{opacity:.6;cursor:not-allowed;transform:none}.hint[_ngcontent-%COMP%]{font-size:12px;color:#facc15;margin-top:8px;padding:0 20px}.hint.error[_ngcontent-%COMP%]{color:#f87171;background:#c8000033;border-radius:8px;padding:8px 16px}.overlay-backdrop[_ngcontent-%COMP%]{position:fixed;inset:0;background:#0009;display:flex;align-items:center;justify-content:center;z-index:100;pointer-events:all}.gps-error-toast[_ngcontent-%COMP%]{position:fixed;top:80px;left:50%;transform:translate(-50%);background:#c85000e6;color:#fff;padding:8px 16px;border-radius:20px;font-size:12px;pointer-events:none}"]})};var hw=[{path:"",component:gp},{path:"**",redirectTo:""}];var v_="Service workers are disabled or not supported by this browser",Fa=class{serviceWorker;worker;registration;events;constructor(e,t){if(this.serviceWorker=e,!e)this.worker=this.events=this.registration=new Ke(i=>i.error(new ge(5601,!1)));else{let i=null,r=new Ut;this.worker=new Ke(l=>(i!==null&&l.next(i),r.subscribe(u=>l.next(u))));let s=()=>{let{controller:l}=e;l!==null&&(i=l,r.next(i))};e.addEventListener("controllerchange",s),s(),this.registration=this.worker.pipe(mn(()=>e.getRegistration().then(l=>{if(!l)throw new ge(5601,!1);return l})));let o=new Ut;this.events=o.asObservable();let a=l=>{let{data:u}=l;u?.type&&o.next(u)};e.addEventListener("message",a),t?.get(hr,null,{optional:!0})?.onDestroy(()=>{e.removeEventListener("controllerchange",s),e.removeEventListener("message",a)})}}postMessage(e,t){return new Promise(i=>{this.worker.pipe(wn(1)).subscribe(r=>{r.postMessage(ae({action:e},t)),i()})})}postMessageWithOperation(e,t,i){let r=this.waitForOperationCompleted(i),s=this.postMessage(e,t);return Promise.all([s,r]).then(([,o])=>o)}generateNonce(){return Math.round(Math.random()*1e7)}eventsOfType(e){let t;return typeof e=="string"?t=i=>i.type===e:t=i=>e.includes(i.type),this.events.pipe(ti(t))}nextEventOfType(e){return this.eventsOfType(e).pipe(wn(1))}waitForOperationCompleted(e){return new Promise((t,i)=>{this.eventsOfType("OPERATION_COMPLETED").pipe(ti(r=>r.nonce===e),wn(1),_t(r=>{if(r.result!==void 0)return r.result;throw new Error(r.error)})).subscribe({next:t,error:i})})}get isEnabled(){return!!this.serviceWorker}},Vk=(()=>{class n{sw;messages;notificationClicks;notificationCloses;pushSubscriptionChanges;subscription;get isEnabled(){return this.sw.isEnabled}pushManager=null;subscriptionChanges=new Ut;constructor(t){if(this.sw=t,!t.isEnabled){this.messages=tr,this.notificationClicks=tr,this.notificationCloses=tr,this.pushSubscriptionChanges=tr,this.subscription=tr;return}this.messages=this.sw.eventsOfType("PUSH").pipe(_t(r=>r.data)),this.notificationClicks=this.sw.eventsOfType("NOTIFICATION_CLICK").pipe(_t(r=>r.data)),this.notificationCloses=this.sw.eventsOfType("NOTIFICATION_CLOSE").pipe(_t(r=>r.data)),this.pushSubscriptionChanges=this.sw.eventsOfType("PUSH_SUBSCRIPTION_CHANGE").pipe(_t(r=>r.data)),this.pushManager=this.sw.registration.pipe(_t(r=>r.pushManager));let i=this.pushManager.pipe(mn(r=>r.getSubscription()));this.subscription=new Ke(r=>{let s=i.subscribe(r),o=this.subscriptionChanges.subscribe(r);return()=>{s.unsubscribe(),o.unsubscribe()}})}requestSubscription(t){if(!this.sw.isEnabled||this.pushManager===null)return Promise.reject(new Error(v_));let i={userVisibleOnly:!0},r=this.decodeBase64(t.serverPublicKey.replace(/_/g,"/").replace(/-/g,"+")),s=new Uint8Array(new ArrayBuffer(r.length));for(let o=0;o<r.length;o++)s[o]=r.charCodeAt(o);return i.applicationServerKey=s,new Promise((o,a)=>{this.pushManager.pipe(mn(c=>c.subscribe(i)),wn(1)).subscribe({next:c=>{this.subscriptionChanges.next(c),o(c)},error:a})})}unsubscribe(){if(!this.sw.isEnabled)return Promise.reject(new Error(v_));let t=i=>{if(i===null)throw new ge(5602,!1);return i.unsubscribe().then(r=>{if(!r)throw new ge(5603,!1);this.subscriptionChanges.next(null)})};return new Promise((i,r)=>{this.subscription.pipe(wn(1),mn(t)).subscribe({next:i,error:r})})}decodeBase64(t){return atob(t)}static \u0275fac=function(i){return new(i||n)(Re(Fa))};static \u0275prov=Ce({token:n,factory:n.\u0275fac})}return n})(),Hk=(()=>{class n{sw;versionUpdates;unrecoverable;get isEnabled(){return this.sw.isEnabled}ongoingCheckForUpdate=null;constructor(t){if(this.sw=t,!t.isEnabled){this.versionUpdates=tr,this.unrecoverable=tr;return}this.versionUpdates=this.sw.eventsOfType(["VERSION_DETECTED","VERSION_INSTALLATION_FAILED","VERSION_READY","NO_NEW_VERSION_DETECTED"]),this.unrecoverable=this.sw.eventsOfType("UNRECOVERABLE_STATE")}checkForUpdate(){if(!this.sw.isEnabled)return Promise.reject(new Error(v_));if(this.ongoingCheckForUpdate)return this.ongoingCheckForUpdate;let t=this.sw.generateNonce();return this.ongoingCheckForUpdate=this.sw.postMessageWithOperation("CHECK_FOR_UPDATES",{nonce:t},t).finally(()=>{this.ongoingCheckForUpdate=null}),this.ongoingCheckForUpdate}activateUpdate(){if(!this.sw.isEnabled)return Promise.reject(new ge(5601,!1));let t=this.sw.generateNonce();return this.sw.postMessageWithOperation("ACTIVATE_UPDATE",{nonce:t},t)}static \u0275fac=function(i){return new(i||n)(Re(Fa))};static \u0275prov=Ce({token:n,factory:n.\u0275fac})}return n})(),mw=new Ie("");function zk(){let n=Q(Al);if(!("serviceWorker"in navigator&&n.enabled!==!1))return;let e=Q(mw),t=Q(Bt),i=Q(hr);t.runOutsideAngular(()=>{let r=navigator.serviceWorker,s=()=>r.controller?.postMessage({action:"INITIALIZE"});r.addEventListener("controllerchange",s),i.onDestroy(()=>{r.removeEventListener("controllerchange",s)})}),t.runOutsideAngular(()=>{let r,{registrationStrategy:s}=n;if(typeof s=="function")r=new Promise(o=>s().subscribe(()=>o()));else{let[o,...a]=(s||"registerWhenStable:30000").split(":");switch(o){case"registerImmediately":r=Promise.resolve();break;case"registerWithDelay":r=pw(+a[0]||0);break;case"registerWhenStable":r=Promise.race([i.whenStable(),pw(+a[0])]);break;default:throw new ge(5600,!1)}}r.then(()=>{i.destroyed||navigator.serviceWorker.register(e,{scope:n.scope,updateViaCache:n.updateViaCache,type:n.type}).catch(o=>console.error(Lr(5604,!1)))})})}function pw(n){return new Promise(e=>setTimeout(e,n))}function Gk(){let n=Q(Al),e=Q(Fn),t=!0;return new Fa(t&&n.enabled!==!1?navigator.serviceWorker:void 0,e)}var Al=class{enabled;updateViaCache;type;scope;registrationStrategy};function gw(n,e={}){return sr([Vk,Hk,{provide:mw,useValue:n},{provide:Al,useValue:e},{provide:Fa,useFactory:Gk},yd(zk)])}var vw={providers:[zm(),Xv(hw),gw("ngsw-worker.js",{enabled:!pS(),registrationStrategy:"registerWhenStable:30000"})]};var vp=class n{static \u0275fac=function(t){return new(t||n)};static \u0275cmp=wi({type:n,selectors:[["app-root"]],decls:1,vars:0,template:function(t,i){t&1&&Un(0,"router-outlet")},dependencies:[Wc],encapsulation:2})};Mv(vp,vw).catch(n=>console.error(n));
