var zw=Object.defineProperty,Gw=Object.defineProperties;var jw=Object.getOwnPropertyDescriptors;var H0=Object.getOwnPropertySymbols;var Ww=Object.prototype.hasOwnProperty,$w=Object.prototype.propertyIsEnumerable;var z0=(n,e,t)=>e in n?zw(n,e,{enumerable:!0,configurable:!0,writable:!0,value:t}):n[e]=t,ae=(n,e)=>{for(var t in e||={})Ww.call(e,t)&&z0(n,t,e[t]);if(H0)for(var t of H0(e))$w.call(e,t)&&z0(n,t,e[t]);return n},it=(n,e)=>Gw(n,jw(e));var vn=null,Wl=!1,Np=1,qw=null,Tn=Symbol("SIGNAL");function Ge(n){let e=vn;return vn=n,e}function Yl(){return vn}var So={version:0,lastCleanEpoch:0,dirty:!1,producers:void 0,producersTail:void 0,consumers:void 0,consumersTail:void 0,recomputing:!1,consumerAllowSignalWrites:!1,consumerIsAlwaysLive:!1,kind:"unknown",producerMustRecompute:()=>!1,producerRecomputeValue:()=>{},consumerMarkedDirty:()=>{},consumerOnSignalRead:()=>{}};function _s(n){if(Wl)throw new Error("");if(vn===null)return;vn.consumerOnSignalRead(n);let e=vn.producersTail;if(e!==void 0&&e.producer===n)return;let t,i=vn.recomputing;if(i&&(t=e!==void 0?e.nextProducer:vn.producers,t!==void 0&&t.producer===n)){vn.producersTail=t,t.lastReadVersion=n.version;return}let r=n.consumersTail;if(r!==void 0&&r.consumer===vn&&(!i||Yw(r,vn)))return;let o=bs(vn),s={producer:n,consumer:vn,nextProducer:t,prevConsumer:r,lastReadVersion:n.version,nextConsumer:void 0};vn.producersTail=s,e!==void 0?e.nextProducer=s:vn.producers=s,o&&$0(n,s)}function G0(){Np++}function Zl(n){if(!(bs(n)&&!n.dirty)&&!(!n.dirty&&n.lastCleanEpoch===Np)){if(!n.producerMustRecompute(n)&&!Xa(n)){Xl(n);return}n.producerRecomputeValue(n),Xl(n)}}function Pp(n){if(n.consumers===void 0)return;let e=Wl;Wl=!0;try{for(let t=n.consumers;t!==void 0;t=t.nextConsumer){let i=t.consumer;i.dirty||Xw(i)}}finally{Wl=e}}function Op(){return vn?.consumerAllowSignalWrites!==!1}function Xw(n){n.dirty=!0,Pp(n),n.consumerMarkedDirty?.(n)}function Xl(n){n.dirty=!1,n.lastCleanEpoch=Np}function Eo(n){return n&&j0(n),Ge(n)}function j0(n){n.producersTail=void 0,n.recomputing=!0}function xs(n,e){Ge(e),n&&W0(n)}function W0(n){n.recomputing=!1;let e=n.producersTail,t=e!==void 0?e.nextProducer:n.producers;if(t!==void 0){if(bs(n))do t=Lp(t);while(t!==void 0);e!==void 0?e.nextProducer=void 0:n.producers=void 0}}function Xa(n){for(let e=n.producers;e!==void 0;e=e.nextProducer){let t=e.producer,i=e.lastReadVersion;if(i!==t.version||(Zl(t),i!==t.version))return!0}return!1}function wo(n){if(bs(n)){let e=n.producers;for(;e!==void 0;)e=Lp(e)}n.producers=void 0,n.producersTail=void 0,n.consumers=void 0,n.consumersTail=void 0}function $0(n,e){let t=n.consumersTail,i=bs(n);if(t!==void 0?(e.nextConsumer=t.nextConsumer,t.nextConsumer=e):(e.nextConsumer=void 0,n.consumers=e),e.prevConsumer=t,n.consumersTail=e,!i)for(let r=n.producers;r!==void 0;r=r.nextProducer)$0(r.producer,r)}function Lp(n){let e=n.producer,t=n.nextProducer,i=n.nextConsumer,r=n.prevConsumer;if(n.nextConsumer=void 0,n.prevConsumer=void 0,i!==void 0?i.prevConsumer=r:e.consumersTail=r,r!==void 0)r.nextConsumer=i;else if(e.consumers=i,!bs(e)){let o=e.producers;for(;o!==void 0;)o=Lp(o)}return t}function bs(n){return n.consumerIsAlwaysLive||n.consumers!==void 0}function Jl(n){qw?.(n)}function Yw(n,e){let t=e.producersTail;if(t!==void 0){let i=e.producers;do{if(i===n)return!0;if(i===t)break;i=i.nextProducer}while(i!==void 0)}return!1}function Kl(n,e){return Object.is(n,e)}function Ql(n,e){let t=Object.create(Zw);t.computation=n,e!==void 0&&(t.equal=e);let i=()=>{if(Zl(t),_s(t),t.value===qa)throw t.error;return t.value};return i[Tn]=t,Jl(t),i}var $l=Symbol("UNSET"),ql=Symbol("COMPUTING"),qa=Symbol("ERRORED"),Zw=it(ae({},So),{value:$l,dirty:!0,error:null,equal:Kl,kind:"computed",producerMustRecompute(n){return n.value===$l||n.value===ql},producerRecomputeValue(n){if(n.value===ql)throw new Error("");let e=n.value;n.value=ql;let t=Eo(n),i,r=!1;try{i=n.computation(),Ge(null),r=e!==$l&&e!==qa&&i!==qa&&n.equal(e,i)}catch(o){i=qa,n.error=o}finally{xs(n,t)}if(r){n.value=e;return}n.value=i,n.version++}});function Jw(){throw new Error}var q0=Jw;function X0(n){q0(n)}function Fp(n){q0=n}var Kw=null;function kp(n,e){let t=Object.create(eu);t.value=n,e!==void 0&&(t.equal=e);let i=()=>Y0(t);return i[Tn]=t,Jl(t),[i,s=>Ms(t,s),s=>Up(t,s)]}function Y0(n){return _s(n),n.value}function Ms(n,e){Op()||X0(n),n.equal(n.value,e)||(n.value=e,Qw(n))}function Up(n,e){Op()||X0(n),Ms(n,e(n.value))}var eu=it(ae({},So),{equal:Kl,value:void 0,kind:"signal"});function Qw(n){n.version++,G0(),Pp(n),Kw?.(n)}var Bp=it(ae({},So),{consumerIsAlwaysLive:!0,consumerAllowSignalWrites:!0,dirty:!0,kind:"effect"});function Vp(n){if(n.dirty=!1,n.version>0&&!Xa(n))return;n.version++;let e=Eo(n);try{n.cleanup(),n.fn()}finally{xs(n,e)}}function We(n){return typeof n=="function"}function Ss(n){let t=n(i=>{Error.call(i),i.stack=new Error().stack});return t.prototype=Object.create(Error.prototype),t.prototype.constructor=t,t}var tu=Ss(n=>function(t){n(this),this.message=t?`${t.length} errors occurred during unsubscription:
${t.map((i,r)=>`${r+1}) ${i.toString()}`).join(`
  `)}`:"",this.name="UnsubscriptionError",this.errors=t});function Ya(n,e){if(n){let t=n.indexOf(e);0<=t&&n.splice(t,1)}}var fn=class n{constructor(e){this.initialTeardown=e,this.closed=!1,this._parentage=null,this._finalizers=null}unsubscribe(){let e;if(!this.closed){this.closed=!0;let{_parentage:t}=this;if(t)if(this._parentage=null,Array.isArray(t))for(let o of t)o.remove(this);else t.remove(this);let{initialTeardown:i}=this;if(We(i))try{i()}catch(o){e=o instanceof tu?o.errors:[o]}let{_finalizers:r}=this;if(r){this._finalizers=null;for(let o of r)try{Z0(o)}catch(s){e=e??[],s instanceof tu?e=[...e,...s.errors]:e.push(s)}}if(e)throw new tu(e)}}add(e){var t;if(e&&e!==this)if(this.closed)Z0(e);else{if(e instanceof n){if(e.closed||e._hasParent(this))return;e._addParent(this)}(this._finalizers=(t=this._finalizers)!==null&&t!==void 0?t:[]).push(e)}}_hasParent(e){let{_parentage:t}=this;return t===e||Array.isArray(t)&&t.includes(e)}_addParent(e){let{_parentage:t}=this;this._parentage=Array.isArray(t)?(t.push(e),t):t?[t,e]:e}_removeParent(e){let{_parentage:t}=this;t===e?this._parentage=null:Array.isArray(t)&&Ya(t,e)}remove(e){let{_finalizers:t}=this;t&&Ya(t,e),e instanceof n&&e._removeParent(this)}};fn.EMPTY=(()=>{let n=new fn;return n.closed=!0,n})();var Hp=fn.EMPTY;function nu(n){return n instanceof fn||n&&"closed"in n&&We(n.remove)&&We(n.add)&&We(n.unsubscribe)}function Z0(n){We(n)?n():n.unsubscribe()}var bi={onUnhandledError:null,onStoppedNotification:null,Promise:void 0,useDeprecatedSynchronousErrorHandling:!1,useDeprecatedNextContext:!1};var Es={setTimeout(n,e,...t){let{delegate:i}=Es;return i?.setTimeout?i.setTimeout(n,e,...t):setTimeout(n,e,...t)},clearTimeout(n){let{delegate:e}=Es;return(e?.clearTimeout||clearTimeout)(n)},delegate:void 0};function iu(n){Es.setTimeout(()=>{let{onUnhandledError:e}=bi;if(e)e(n);else throw n})}function Co(){}var J0=zp("C",void 0,void 0);function K0(n){return zp("E",void 0,n)}function Q0(n){return zp("N",n,void 0)}function zp(n,e,t){return{kind:n,value:e,error:t}}var To=null;function ws(n){if(bi.useDeprecatedSynchronousErrorHandling){let e=!To;if(e&&(To={errorThrown:!1,error:null}),n(),e){let{errorThrown:t,error:i}=To;if(To=null,t)throw i}}else n()}function e_(n){bi.useDeprecatedSynchronousErrorHandling&&To&&(To.errorThrown=!0,To.error=n)}var Do=class extends fn{constructor(e){super(),this.isStopped=!1,e?(this.destination=e,nu(e)&&e.add(this)):this.destination=nC}static create(e,t,i){return new Cs(e,t,i)}next(e){this.isStopped?jp(Q0(e),this):this._next(e)}error(e){this.isStopped?jp(K0(e),this):(this.isStopped=!0,this._error(e))}complete(){this.isStopped?jp(J0,this):(this.isStopped=!0,this._complete())}unsubscribe(){this.closed||(this.isStopped=!0,super.unsubscribe(),this.destination=null)}_next(e){this.destination.next(e)}_error(e){try{this.destination.error(e)}finally{this.unsubscribe()}}_complete(){try{this.destination.complete()}finally{this.unsubscribe()}}},eC=Function.prototype.bind;function Gp(n,e){return eC.call(n,e)}var Wp=class{constructor(e){this.partialObserver=e}next(e){let{partialObserver:t}=this;if(t.next)try{t.next(e)}catch(i){ru(i)}}error(e){let{partialObserver:t}=this;if(t.error)try{t.error(e)}catch(i){ru(i)}else ru(e)}complete(){let{partialObserver:e}=this;if(e.complete)try{e.complete()}catch(t){ru(t)}}},Cs=class extends Do{constructor(e,t,i){super();let r;if(We(e)||!e)r={next:e??void 0,error:t??void 0,complete:i??void 0};else{let o;this&&bi.useDeprecatedNextContext?(o=Object.create(e),o.unsubscribe=()=>this.unsubscribe(),r={next:e.next&&Gp(e.next,o),error:e.error&&Gp(e.error,o),complete:e.complete&&Gp(e.complete,o)}):r=e}this.destination=new Wp(r)}};function ru(n){bi.useDeprecatedSynchronousErrorHandling?e_(n):iu(n)}function tC(n){throw n}function jp(n,e){let{onStoppedNotification:t}=bi;t&&Es.setTimeout(()=>t(n,e))}var nC={closed:!0,next:Co,error:tC,complete:Co};var Ts=typeof Symbol=="function"&&Symbol.observable||"@@observable";function Mi(n){return n}function $p(...n){return qp(n)}function qp(n){return n.length===0?Mi:n.length===1?n[0]:function(t){return n.reduce((i,r)=>r(i),t)}}var tt=(()=>{class n{constructor(t){t&&(this._subscribe=t)}lift(t){let i=new n;return i.source=this,i.operator=t,i}subscribe(t,i,r){let o=rC(t)?t:new Cs(t,i,r);return ws(()=>{let{operator:s,source:a}=this;o.add(s?s.call(o,a):a?this._subscribe(o):this._trySubscribe(o))}),o}_trySubscribe(t){try{return this._subscribe(t)}catch(i){t.error(i)}}forEach(t,i){return i=t_(i),new i((r,o)=>{let s=new Cs({next:a=>{try{t(a)}catch(c){o(c),s.unsubscribe()}},error:o,complete:r});this.subscribe(s)})}_subscribe(t){var i;return(i=this.source)===null||i===void 0?void 0:i.subscribe(t)}[Ts](){return this}pipe(...t){return qp(t)(this)}toPromise(t){return t=t_(t),new t((i,r)=>{let o;this.subscribe(s=>o=s,s=>r(s),()=>i(o))})}}return n.create=e=>new n(e),n})();function t_(n){var e;return(e=n??bi.Promise)!==null&&e!==void 0?e:Promise}function iC(n){return n&&We(n.next)&&We(n.error)&&We(n.complete)}function rC(n){return n&&n instanceof Do||iC(n)&&nu(n)}function oC(n){return We(n?.lift)}function mt(n){return e=>{if(oC(e))return e.lift(function(t){try{return n(t,this)}catch(i){this.error(i)}});throw new TypeError("Unable to lift unknown Observable type")}}function Ct(n,e,t,i,r){return new Xp(n,e,t,i,r)}var Xp=class extends Do{constructor(e,t,i,r,o,s){super(e),this.onFinalize=o,this.shouldUnsubscribe=s,this._next=t?function(a){try{t(a)}catch(c){e.error(c)}}:super._next,this._error=r?function(a){try{r(a)}catch(c){e.error(c)}finally{this.unsubscribe()}}:super._error,this._complete=i?function(){try{i()}catch(a){e.error(a)}finally{this.unsubscribe()}}:super._complete}unsubscribe(){var e;if(!this.shouldUnsubscribe||this.shouldUnsubscribe()){let{closed:t}=this;super.unsubscribe(),!t&&((e=this.onFinalize)===null||e===void 0||e.call(this))}}};var n_=Ss(n=>function(){n(this),this.name="ObjectUnsubscribedError",this.message="object unsubscribed"});var $t=(()=>{class n extends tt{constructor(){super(),this.closed=!1,this.currentObservers=null,this.observers=[],this.isStopped=!1,this.hasError=!1,this.thrownError=null}lift(t){let i=new ou(this,this);return i.operator=t,i}_throwIfClosed(){if(this.closed)throw new n_}next(t){ws(()=>{if(this._throwIfClosed(),!this.isStopped){this.currentObservers||(this.currentObservers=Array.from(this.observers));for(let i of this.currentObservers)i.next(t)}})}error(t){ws(()=>{if(this._throwIfClosed(),!this.isStopped){this.hasError=this.isStopped=!0,this.thrownError=t;let{observers:i}=this;for(;i.length;)i.shift().error(t)}})}complete(){ws(()=>{if(this._throwIfClosed(),!this.isStopped){this.isStopped=!0;let{observers:t}=this;for(;t.length;)t.shift().complete()}})}unsubscribe(){this.isStopped=this.closed=!0,this.observers=this.currentObservers=null}get observed(){var t;return((t=this.observers)===null||t===void 0?void 0:t.length)>0}_trySubscribe(t){return this._throwIfClosed(),super._trySubscribe(t)}_subscribe(t){return this._throwIfClosed(),this._checkFinalizedStatuses(t),this._innerSubscribe(t)}_innerSubscribe(t){let{hasError:i,isStopped:r,observers:o}=this;return i||r?Hp:(this.currentObservers=null,o.push(t),new fn(()=>{this.currentObservers=null,Ya(o,t)}))}_checkFinalizedStatuses(t){let{hasError:i,thrownError:r,isStopped:o}=this;i?t.error(r):o&&t.complete()}asObservable(){let t=new tt;return t.source=this,t}}return n.create=(e,t)=>new ou(e,t),n})(),ou=class extends $t{constructor(e,t){super(),this.destination=e,this.source=t}next(e){var t,i;(i=(t=this.destination)===null||t===void 0?void 0:t.next)===null||i===void 0||i.call(t,e)}error(e){var t,i;(i=(t=this.destination)===null||t===void 0?void 0:t.error)===null||i===void 0||i.call(t,e)}complete(){var e,t;(t=(e=this.destination)===null||e===void 0?void 0:e.complete)===null||t===void 0||t.call(e)}_subscribe(e){var t,i;return(i=(t=this.source)===null||t===void 0?void 0:t.subscribe(e))!==null&&i!==void 0?i:Hp}};var hn=class extends $t{constructor(e){super(),this._value=e}get value(){return this.getValue()}_subscribe(e){let t=super._subscribe(e);return!t.closed&&e.next(this._value),t}getValue(){let{hasError:e,thrownError:t,_value:i}=this;if(e)throw t;return this._throwIfClosed(),i}next(e){super.next(this._value=e)}};var pn=new tt(n=>n.complete());function i_(n){return n&&We(n.schedule)}function r_(n){return n[n.length-1]}function o_(n){return We(r_(n))?n.pop():void 0}function Or(n){return i_(r_(n))?n.pop():void 0}function a_(n,e,t,i){function r(o){return o instanceof t?o:new t(function(s){s(o)})}return new(t||(t=Promise))(function(o,s){function a(u){try{l(i.next(u))}catch(d){s(d)}}function c(u){try{l(i.throw(u))}catch(d){s(d)}}function l(u){u.done?o(u.value):r(u.value).then(a,c)}l((i=i.apply(n,e||[])).next())})}function s_(n){var e=typeof Symbol=="function"&&Symbol.iterator,t=e&&n[e],i=0;if(t)return t.call(n);if(n&&typeof n.length=="number")return{next:function(){return n&&i>=n.length&&(n=void 0),{value:n&&n[i++],done:!n}}};throw new TypeError(e?"Object is not iterable.":"Symbol.iterator is not defined.")}function Io(n){return this instanceof Io?(this.v=n,this):new Io(n)}function c_(n,e,t){if(!Symbol.asyncIterator)throw new TypeError("Symbol.asyncIterator is not defined.");var i=t.apply(n,e||[]),r,o=[];return r=Object.create((typeof AsyncIterator=="function"?AsyncIterator:Object).prototype),a("next"),a("throw"),a("return",s),r[Symbol.asyncIterator]=function(){return this},r;function s(h){return function(g){return Promise.resolve(g).then(h,d)}}function a(h,g){i[h]&&(r[h]=function(_){return new Promise(function(m,p){o.push([h,_,m,p])>1||c(h,_)})},g&&(r[h]=g(r[h])))}function c(h,g){try{l(i[h](g))}catch(_){f(o[0][3],_)}}function l(h){h.value instanceof Io?Promise.resolve(h.value.v).then(u,d):f(o[0][2],h)}function u(h){c("next",h)}function d(h){c("throw",h)}function f(h,g){h(g),o.shift(),o.length&&c(o[0][0],o[0][1])}}function l_(n){if(!Symbol.asyncIterator)throw new TypeError("Symbol.asyncIterator is not defined.");var e=n[Symbol.asyncIterator],t;return e?e.call(n):(n=typeof s_=="function"?s_(n):n[Symbol.iterator](),t={},i("next"),i("throw"),i("return"),t[Symbol.asyncIterator]=function(){return this},t);function i(o){t[o]=n[o]&&function(s){return new Promise(function(a,c){s=n[o](s),r(a,c,s.done,s.value)})}}function r(o,s,a,c){Promise.resolve(c).then(function(l){o({value:l,done:a})},s)}}var su=n=>n&&typeof n.length=="number"&&typeof n!="function";function au(n){return We(n?.then)}function cu(n){return We(n[Ts])}function lu(n){return Symbol.asyncIterator&&We(n?.[Symbol.asyncIterator])}function uu(n){return new TypeError(`You provided ${n!==null&&typeof n=="object"?"an invalid object":`'${n}'`} where a stream was expected. You can provide an Observable, Promise, ReadableStream, Array, AsyncIterable, or Iterable.`)}function sC(){return typeof Symbol!="function"||!Symbol.iterator?"@@iterator":Symbol.iterator}var du=sC();function fu(n){return We(n?.[du])}function hu(n){return c_(this,arguments,function*(){let t=n.getReader();try{for(;;){let{value:i,done:r}=yield Io(t.read());if(r)return yield Io(void 0);yield yield Io(i)}}finally{t.releaseLock()}})}function pu(n){return We(n?.getReader)}function on(n){if(n instanceof tt)return n;if(n!=null){if(cu(n))return aC(n);if(su(n))return cC(n);if(au(n))return lC(n);if(lu(n))return u_(n);if(fu(n))return uC(n);if(pu(n))return dC(n)}throw uu(n)}function aC(n){return new tt(e=>{let t=n[Ts]();if(We(t.subscribe))return t.subscribe(e);throw new TypeError("Provided object does not correctly implement Symbol.observable")})}function cC(n){return new tt(e=>{for(let t=0;t<n.length&&!e.closed;t++)e.next(n[t]);e.complete()})}function lC(n){return new tt(e=>{n.then(t=>{e.closed||(e.next(t),e.complete())},t=>e.error(t)).then(null,iu)})}function uC(n){return new tt(e=>{for(let t of n)if(e.next(t),e.closed)return;e.complete()})}function u_(n){return new tt(e=>{fC(n,e).catch(t=>e.error(t))})}function dC(n){return u_(hu(n))}function fC(n,e){var t,i,r,o;return a_(this,void 0,void 0,function*(){try{for(t=l_(n);i=yield t.next(),!i.done;){let s=i.value;if(e.next(s),e.closed)return}}catch(s){r={error:s}}finally{try{i&&!i.done&&(o=t.return)&&(yield o.call(t))}finally{if(r)throw r.error}}e.complete()})}function Bn(n,e,t,i=0,r=!1){let o=e.schedule(function(){t(),r?n.add(this.schedule(null,i)):this.unsubscribe()},i);if(n.add(o),!r)return o}function mu(n,e=0){return mt((t,i)=>{t.subscribe(Ct(i,r=>Bn(i,n,()=>i.next(r),e),()=>Bn(i,n,()=>i.complete(),e),r=>Bn(i,n,()=>i.error(r),e)))})}function gu(n,e=0){return mt((t,i)=>{i.add(n.schedule(()=>t.subscribe(i),e))})}function d_(n,e){return on(n).pipe(gu(e),mu(e))}function f_(n,e){return on(n).pipe(gu(e),mu(e))}function h_(n,e){return new tt(t=>{let i=0;return e.schedule(function(){i===n.length?t.complete():(t.next(n[i++]),t.closed||this.schedule())})})}function p_(n,e){return new tt(t=>{let i;return Bn(t,e,()=>{i=n[du](),Bn(t,e,()=>{let r,o;try{({value:r,done:o}=i.next())}catch(s){t.error(s);return}o?t.complete():t.next(r)},0,!0)}),()=>We(i?.return)&&i.return()})}function vu(n,e){if(!n)throw new Error("Iterable cannot be null");return new tt(t=>{Bn(t,e,()=>{let i=n[Symbol.asyncIterator]();Bn(t,e,()=>{i.next().then(r=>{r.done?t.complete():t.next(r.value)})},0,!0)})})}function m_(n,e){return vu(hu(n),e)}function g_(n,e){if(n!=null){if(cu(n))return d_(n,e);if(su(n))return h_(n,e);if(au(n))return f_(n,e);if(lu(n))return vu(n,e);if(fu(n))return p_(n,e);if(pu(n))return m_(n,e)}throw uu(n)}function Xt(n,e){return e?g_(n,e):on(n)}function nt(...n){let e=Or(n);return Xt(n,e)}function Yp(n,e){let t=We(n)?n:()=>n,i=r=>r.error(t());return new tt(e?r=>e.schedule(i,0,r):i)}function yu(n){return!!n&&(n instanceof tt||We(n.lift)&&We(n.subscribe))}var Ao=Ss(n=>function(){n(this),this.name="EmptyError",this.message="no elements in sequence"});function Mt(n,e){return mt((t,i)=>{let r=0;t.subscribe(Ct(i,o=>{i.next(n.call(e,o,r++))}))})}var{isArray:hC}=Array;function pC(n,e){return hC(e)?n(...e):n(e)}function v_(n){return Mt(e=>pC(n,e))}var{isArray:mC}=Array,{getPrototypeOf:gC,prototype:vC,keys:yC}=Object;function y_(n){if(n.length===1){let e=n[0];if(mC(e))return{args:e,keys:null};if(_C(e)){let t=yC(e);return{args:t.map(i=>e[i]),keys:t}}}return{args:n,keys:null}}function _C(n){return n&&typeof n=="object"&&gC(n)===vC}function __(n,e){return n.reduce((t,i,r)=>(t[i]=e[r],t),{})}function Zp(...n){let e=Or(n),t=o_(n),{args:i,keys:r}=y_(n);if(i.length===0)return Xt([],e);let o=new tt(xC(i,e,r?s=>__(r,s):Mi));return t?o.pipe(v_(t)):o}function xC(n,e,t=Mi){return i=>{x_(e,()=>{let{length:r}=n,o=new Array(r),s=r,a=r;for(let c=0;c<r;c++)x_(e,()=>{let l=Xt(n[c],e),u=!1;l.subscribe(Ct(i,d=>{o[c]=d,u||(u=!0,a--),a||i.next(t(o.slice()))},()=>{--s||i.complete()}))},i)},i)}}function x_(n,e,t){n?Bn(t,n,e):e()}function b_(n,e,t,i,r,o,s,a){let c=[],l=0,u=0,d=!1,f=()=>{d&&!c.length&&!l&&e.complete()},h=_=>l<i?g(_):c.push(_),g=_=>{o&&e.next(_),l++;let m=!1;on(t(_,u++)).subscribe(Ct(e,p=>{r?.(p),o?h(p):e.next(p)},()=>{m=!0},void 0,()=>{if(m)try{for(l--;c.length&&l<i;){let p=c.shift();s?Bn(e,s,()=>g(p)):g(p)}f()}catch(p){e.error(p)}}))};return n.subscribe(Ct(e,h,()=>{d=!0,f()})),()=>{a?.()}}function Dn(n,e,t=1/0){return We(e)?Dn((i,r)=>Mt((o,s)=>e(i,o,r,s))(on(n(i,r))),t):(typeof e=="number"&&(t=e),mt((i,r)=>b_(i,r,n,t)))}function M_(n=1/0){return Dn(Mi,n)}function S_(){return M_(1)}function Ds(...n){return S_()(Xt(n,Or(n)))}function Za(n){return new tt(e=>{on(n()).subscribe(e)})}var or=new tt(Co);function ai(n,e){return mt((t,i)=>{let r=0;t.subscribe(Ct(i,o=>n.call(e,o,r++)&&i.next(o)))})}function Ja(n){return mt((e,t)=>{let i=null,r=!1,o;i=e.subscribe(Ct(t,void 0,void 0,s=>{o=on(n(s,Ja(n)(e))),i?(i.unsubscribe(),i=null,o.subscribe(t)):r=!0})),r&&(i.unsubscribe(),i=null,o.subscribe(t))})}function _u(n,e){return We(e)?Dn(n,e,1):Dn(n,1)}function E_(n){return mt((e,t)=>{let i=!1;e.subscribe(Ct(t,r=>{i=!0,t.next(r)},()=>{i||t.next(n),t.complete()}))})}function In(n){return n<=0?()=>pn:mt((e,t)=>{let i=0;e.subscribe(Ct(t,r=>{++i<=n&&(t.next(r),n<=i&&t.complete())}))})}function w_(n=bC){return mt((e,t)=>{let i=!1;e.subscribe(Ct(t,r=>{i=!0,t.next(r)},()=>i?t.complete():t.error(n())))})}function bC(){return new Ao}function Jp(n){return mt((e,t)=>{try{e.subscribe(t)}finally{t.add(n)}})}function sr(n,e){let t=arguments.length>=2;return i=>i.pipe(n?ai((r,o)=>n(r,o,i)):Mi,In(1),t?E_(e):w_(()=>new Ao))}function xu(n){return n<=0?()=>pn:mt((e,t)=>{let i=[];e.subscribe(Ct(t,r=>{i.push(r),n<i.length&&i.shift()},()=>{for(let r of i)t.next(r);t.complete()},void 0,()=>{i=null}))})}function Kp(...n){let e=Or(n);return mt((t,i)=>{(e?Ds(n,t,e):Ds(n,t)).subscribe(i)})}function yn(n,e){return mt((t,i)=>{let r=null,o=0,s=!1,a=()=>s&&!r&&i.complete();t.subscribe(Ct(i,c=>{r?.unsubscribe();let l=0,u=o++;on(n(c,u)).subscribe(r=Ct(i,d=>i.next(e?e(c,d,u,l++):d),()=>{r=null,a()}))},()=>{s=!0,a()}))})}function Ka(n){return mt((e,t)=>{on(n).subscribe(Ct(t,()=>t.complete(),Co)),!t.closed&&e.subscribe(t)})}function ci(n,e,t){let i=We(n)||e||t?{next:n,error:e,complete:t}:n;return i?mt((r,o)=>{var s;(s=i.subscribe)===null||s===void 0||s.call(i);let a=!0;r.subscribe(Ct(o,c=>{var l;(l=i.next)===null||l===void 0||l.call(i,c),o.next(c)},()=>{var c;a=!1,(c=i.complete)===null||c===void 0||c.call(i),o.complete()},c=>{var l;a=!1,(l=i.error)===null||l===void 0||l.call(i,c),o.error(c)},()=>{var c,l;a&&((c=i.unsubscribe)===null||c===void 0||c.call(i)),(l=i.finalize)===null||l===void 0||l.call(i)}))}):Mi}var Qp;function bu(){return Qp}function zi(n){let e=Qp;return Qp=n,e}var C_=Symbol("NotFound");function Is(n){return n===C_||n?.name==="\u0275NotFound"}function T_(n){let e=Ge(null);try{return n()}finally{Ge(e)}}var fm="https://angular.dev/best-practices/security#preventing-cross-site-scripting-xss",_e=class extends Error{code;constructor(e,t){super(kr(e,t)),this.code=e}};function MC(n){return`NG0${Math.abs(n)}`}function kr(n,e){return`${MC(n)}${e?": "+e:""}`}function gt(n){for(let e in n)if(n[e]===gt)return e;throw Error("")}function oc(n){if(typeof n=="string")return n;if(Array.isArray(n))return`[${n.map(oc).join(", ")}]`;if(n==null)return""+n;let e=n.overriddenName||n.name;if(e)return`${e}`;let t=n.toString();if(t==null)return""+t;let i=t.indexOf(`
`);return i>=0?t.slice(0,i):t}function Iu(n,e){return n?e?`${n} ${e}`:n:e||""}var SC=gt({__forward_ref__:gt});function Au(n){return n.__forward_ref__=Au,n}function Vn(n){return hm(n)?n():n}function hm(n){return typeof n=="function"&&n.hasOwnProperty(SC)&&n.__forward_ref__===Au}function Ae(n){return{token:n.token,providedIn:n.providedIn||null,factory:n.factory,value:void 0}}function Fo(n){return{providers:n.providers||[],imports:n.imports||[]}}function sc(n){return EC(n,Ru)}function pm(n){return sc(n)!==null}function EC(n,e){return n.hasOwnProperty(e)&&n[e]||null}function wC(n){let e=n?.[Ru]??null;return e||null}function tm(n){return n&&n.hasOwnProperty(Su)?n[Su]:null}var Ru=gt({\u0275prov:gt}),Su=gt({\u0275inj:gt}),Pe=class{_desc;ngMetadataName="InjectionToken";\u0275prov;constructor(e,t){this._desc=e,this.\u0275prov=void 0,typeof t=="number"?this.__NG_ELEMENT_ID__=t:t!==void 0&&(this.\u0275prov=Ae({token:this,providedIn:t.providedIn||"root",factory:t.factory}))}get multi(){return this}toString(){return`InjectionToken ${this._desc}`}};function mm(n){return n&&!!n.\u0275providers}var gm=gt({\u0275cmp:gt}),vm=gt({\u0275dir:gt}),ym=gt({\u0275pipe:gt}),_m=gt({\u0275mod:gt}),ec=gt({\u0275fac:gt}),ko=gt({__NG_ELEMENT_ID__:gt}),D_=gt({__NG_ENV_ID__:gt});function xm(n){return Nu(n,"@NgModule"),n[_m]||null}function Ur(n){return Nu(n,"@Component"),n[gm]||null}function bm(n){return Nu(n,"@Directive"),n[vm]||null}function N_(n){return Nu(n,"@Pipe"),n[ym]||null}function Nu(n,e){if(n==null)throw new _e(-919,!1)}function ac(n){return typeof n=="string"?n:n==null?"":String(n)}var P_=gt({ngErrorCode:gt}),CC=gt({ngErrorMessage:gt}),TC=gt({ngTokenPath:gt});function Mm(n,e){return O_("",-200,e)}function Pu(n,e){throw new _e(-201,!1)}function O_(n,e,t){let i=new _e(e,n);return i[P_]=e,i[CC]=n,t&&(i[TC]=t),i}function DC(n){return n[P_]}var nm;function L_(){return nm}function Yn(n){let e=nm;return nm=n,e}function Sm(n,e,t){let i=sc(n);if(i&&i.providedIn=="root")return i.value===void 0?i.value=i.factory():i.value;if(t&8)return null;if(e!==void 0)return e;Pu(n,"")}var IC={},Ro=IC,AC="__NG_DI_FLAG__",im=class{injector;constructor(e){this.injector=e}retrieve(e,t){let i=No(t)||0;try{return this.injector.get(e,i&8?null:Ro,i)}catch(r){if(Is(r))return r;throw r}}};function RC(n,e=0){let t=bu();if(t===void 0)throw new _e(-203,!1);if(t===null)return Sm(n,void 0,e);{let i=NC(e),r=t.retrieve(n,i);if(Is(r)){if(i.optional)return null;throw r}return r}}function Le(n,e=0){return(L_()||RC)(Vn(n),e)}function Q(n,e){return Le(n,No(e))}function No(n){return typeof n>"u"||typeof n=="number"?n:0|(n.optional&&8)|(n.host&&1)|(n.self&&2)|(n.skipSelf&&4)}function NC(n){return{optional:!!(n&8),host:!!(n&1),self:!!(n&2),skipSelf:!!(n&4)}}function rm(n){let e=[];for(let t=0;t<n.length;t++){let i=Vn(n[t]);if(Array.isArray(i)){if(i.length===0)throw new _e(900,!1);let r,o=0;for(let s=0;s<i.length;s++){let a=i[s],c=PC(a);typeof c=="number"?c===-1?r=a.token:o|=c:r=a}e.push(Le(r,o))}else e.push(Le(i))}return e}function PC(n){return n[AC]}function Po(n,e){let t=n.hasOwnProperty(ec);return t?n[ec]:null}function F_(n,e,t){if(n.length!==e.length)return!1;for(let i=0;i<n.length;i++){let r=n[i],o=e[i];if(t&&(r=t(r),o=t(o)),o!==r)return!1}return!0}function k_(n){return n.flat(Number.POSITIVE_INFINITY)}function Ou(n,e){n.forEach(t=>Array.isArray(t)?Ou(t,e):e(t))}function Em(n,e,t){e>=n.length?n.push(t):n.splice(e,0,t)}function cc(n,e){return e>=n.length-1?n.pop():n.splice(e,1)[0]}function U_(n,e,t,i){let r=n.length;if(r==e)n.push(t,i);else if(r===1)n.push(i,n[0]),n[0]=t;else{for(r--,n.push(n[r-1],n[r]);r>e;){let o=r-2;n[r]=n[o],r--}n[e]=t,n[e+1]=i}}function Lu(n,e,t){let i=Rs(n,e);return i>=0?n[i|1]=t:(i=~i,U_(n,i,e,t)),i}function Fu(n,e){let t=Rs(n,e);if(t>=0)return n[t|1]}function Rs(n,e){return OC(n,e,1)}function OC(n,e,t){let i=0,r=n.length>>t;for(;r!==i;){let o=i+(r-i>>1),s=n[o<<t];if(e===s)return o<<t;s>e?r=o:i=o+1}return~(r<<t)}var Uo={},Hn=[],Bo=new Pe(""),wm=new Pe("",-1),Cm=new Pe(""),tc=class{get(e,t=Ro){if(t===Ro){let r=O_("",-201);throw r.name="\u0275NotFound",r}return t}};function lr(n){return{\u0275providers:n}}function B_(n){return lr([{provide:Bo,multi:!0,useValue:n}])}function V_(...n){return{\u0275providers:Tm(!0,n),\u0275fromNgModule:!0}}function Tm(n,...e){let t=[],i=new Set,r,o=s=>{t.push(s)};return Ou(e,s=>{let a=s;Eu(a,o,[],i)&&(r||=[],r.push(a))}),r!==void 0&&H_(r,o),t}function H_(n,e){for(let t=0;t<n.length;t++){let{ngModule:i,providers:r}=n[t];Dm(r,o=>{e(o,i)})}}function Eu(n,e,t,i){if(n=Vn(n),!n)return!1;let r=null,o=tm(n),s=!o&&Ur(n);if(!o&&!s){let c=n.ngModule;if(o=tm(c),o)r=c;else return!1}else{if(s&&!s.standalone)return!1;r=n}let a=i.has(r);if(s){if(a)return!1;if(i.add(r),s.dependencies){let c=typeof s.dependencies=="function"?s.dependencies():s.dependencies;for(let l of c)Eu(l,e,t,i)}}else if(o){if(o.imports!=null&&!a){i.add(r);let l;Ou(o.imports,u=>{Eu(u,e,t,i)&&(l||=[],l.push(u))}),l!==void 0&&H_(l,e)}if(!a){let l=Po(r)||(()=>new r);e({provide:r,useFactory:l,deps:Hn},r),e({provide:Cm,useValue:r,multi:!0},r),e({provide:Bo,useValue:()=>Le(r),multi:!0},r)}let c=o.providers;if(c!=null&&!a){let l=n;Dm(c,u=>{e(u,l)})}}else return!1;return r!==n&&n.providers!==void 0}function Dm(n,e){for(let t of n)mm(t)&&(t=t.\u0275providers),Array.isArray(t)?Dm(t,e):e(t)}var LC=gt({provide:String,useValue:gt});function z_(n){return n!==null&&typeof n=="object"&&LC in n}function FC(n){return!!(n&&n.useExisting)}function kC(n){return!!(n&&n.useFactory)}function wu(n){return typeof n=="function"}var lc=new Pe(""),Mu={},I_={},em;function uc(){return em===void 0&&(em=new tc),em}var Jt=class{},Oo=class extends Jt{parent;source;scopes;records=new Map;_ngOnDestroyHooks=new Set;_onDestroyHooks=[];get destroyed(){return this._destroyed}_destroyed=!1;injectorDefTypes;constructor(e,t,i,r){super(),this.parent=t,this.source=i,this.scopes=r,sm(e,s=>this.processProvider(s)),this.records.set(wm,As(void 0,this)),r.has("environment")&&this.records.set(Jt,As(void 0,this));let o=this.records.get(lc);o!=null&&typeof o.value=="string"&&this.scopes.add(o.value),this.injectorDefTypes=new Set(this.get(Cm,Hn,{self:!0}))}retrieve(e,t){let i=No(t)||0;try{return this.get(e,Ro,i)}catch(r){if(Is(r))return r;throw r}}destroy(){Qa(this),this._destroyed=!0;let e=Ge(null);try{for(let i of this._ngOnDestroyHooks)i.ngOnDestroy();let t=this._onDestroyHooks;this._onDestroyHooks=[];for(let i of t)i()}finally{this.records.clear(),this._ngOnDestroyHooks.clear(),this.injectorDefTypes.clear(),Ge(e)}}onDestroy(e){return Qa(this),this._onDestroyHooks.push(e),()=>this.removeOnDestroy(e)}runInContext(e){Qa(this);let t=zi(this),i=Yn(void 0),r;try{return e()}finally{zi(t),Yn(i)}}get(e,t=Ro,i){if(Qa(this),e.hasOwnProperty(D_))return e[D_](this);let r=No(i),o,s=zi(this),a=Yn(void 0);try{if(!(r&4)){let l=this.records.get(e);if(l===void 0){let u=zC(e)&&sc(e);u&&this.injectableDefInScope(u)?l=As(om(e),Mu):l=null,this.records.set(e,l)}if(l!=null)return this.hydrate(e,l,r)}let c=r&2?uc():this.parent;return t=r&8&&t===Ro?null:t,c.get(e,t)}catch(c){let l=DC(c);throw l===-200||l===-201?new _e(l,null):c}finally{Yn(a),zi(s)}}resolveInjectorInitializers(){let e=Ge(null),t=zi(this),i=Yn(void 0),r;try{let o=this.get(Bo,Hn,{self:!0});for(let s of o)s()}finally{zi(t),Yn(i),Ge(e)}}toString(){return"R3Injector[...]"}processProvider(e){e=Vn(e);let t=wu(e)?e:Vn(e&&e.provide),i=BC(e);if(!wu(e)&&e.multi===!0){let r=this.records.get(t);r||(r=As(void 0,Mu,!0),r.factory=()=>rm(r.multi),this.records.set(t,r)),t=e,r.multi.push(e)}this.records.set(t,i)}hydrate(e,t,i){let r=Ge(null);try{if(t.value===I_)throw Mm("");return t.value===Mu&&(t.value=I_,t.value=t.factory(void 0,i)),typeof t.value=="object"&&t.value&&HC(t.value)&&this._ngOnDestroyHooks.add(t.value),t.value}finally{Ge(r)}}injectableDefInScope(e){if(!e.providedIn)return!1;let t=Vn(e.providedIn);return typeof t=="string"?t==="any"||this.scopes.has(t):this.injectorDefTypes.has(t)}removeOnDestroy(e){let t=this._onDestroyHooks.indexOf(e);t!==-1&&this._onDestroyHooks.splice(t,1)}};function om(n){let e=sc(n),t=e!==null?e.factory:Po(n);if(t!==null)return t;if(n instanceof Pe)throw new _e(-204,!1);if(n instanceof Function)return UC(n);throw new _e(-204,!1)}function UC(n){if(n.length>0)throw new _e(-204,!1);let t=wC(n);return t!==null?()=>t.factory(n):()=>new n}function BC(n){if(z_(n))return As(void 0,n.useValue);{let e=G_(n);return As(e,Mu)}}function G_(n,e,t){let i;if(wu(n)){let r=Vn(n);return Po(r)||om(r)}else if(z_(n))i=()=>Vn(n.useValue);else if(kC(n))i=()=>n.useFactory(...rm(n.deps||[]));else if(FC(n))i=(r,o)=>Le(Vn(n.useExisting),o!==void 0&&o&8?8:void 0);else{let r=Vn(n&&(n.useClass||n.provide));if(VC(n))i=()=>new r(...rm(n.deps));else return Po(r)||om(r)}return i}function Qa(n){if(n.destroyed)throw new _e(-205,!1)}function As(n,e,t=!1){return{factory:n,value:e,multi:t?[]:void 0}}function VC(n){return!!n.deps}function HC(n){return n!==null&&typeof n=="object"&&typeof n.ngOnDestroy=="function"}function zC(n){return typeof n=="function"||typeof n=="object"&&n.ngMetadataName==="InjectionToken"}function sm(n,e){for(let t of n)Array.isArray(t)?sm(t,e):t&&mm(t)?sm(t.\u0275providers,e):e(t)}function _n(n,e){let t;n instanceof Oo?(Qa(n),t=n):t=new im(n);let i,r=zi(t),o=Yn(void 0);try{return e()}finally{zi(r),Yn(o)}}function j_(){return L_()!==void 0||bu()!=null}var Si=0,Be=1,He=2,sn=3,li=4,ui=5,dc=6,Ns=7,xn=8,Br=9,Gi=10,Bt=11,Ps=12,Im=13,Vo=14,di=15,Vr=16,Ho=17,ji=18,Hr=19,Am=20,ar=21,ku=22,Lr=23,Zn=24,Uu=25,Os=26,An=27,W_=1;var zr=7,fc=8,zo=9,Rn=10;function ur(n){return Array.isArray(n)&&typeof n[W_]=="object"}function Ei(n){return Array.isArray(n)&&n[W_]===!0}function Rm(n){return(n.flags&4)!==0}function dr(n){return n.componentOffset>-1}function Ls(n){return(n.flags&1)===1}function Go(n){return!!n.template}function Fs(n){return(n[He]&512)!==0}function jo(n){return(n[He]&256)===256}var Nm="svg",$_="math";function fi(n){for(;Array.isArray(n);)n=n[Si];return n}function Pm(n,e){return fi(e[n])}function wi(n,e){return fi(e[n.index])}function Om(n,e){return n.data[e]}function hi(n,e){let t=e[n];return ur(t)?t:t[Si]}function q_(n){return(n[He]&4)===4}function Bu(n){return(n[He]&128)===128}function X_(n){return Ei(n[sn])}function Wo(n,e){return e==null?null:n[e]}function Lm(n){n[Ho]=0}function Fm(n){n[He]&1024||(n[He]|=1024,Bu(n)&&ks(n))}function Y_(n,e){for(;n>0;)e=e[Vo],n--;return e}function hc(n){return!!(n[He]&9216||n[Zn]?.dirty)}function Vu(n){n[Gi].changeDetectionScheduler?.notify(8),n[He]&64&&(n[He]|=1024),hc(n)&&ks(n)}function ks(n){n[Gi].changeDetectionScheduler?.notify(0);let e=Fr(n);for(;e!==null&&!(e[He]&8192||(e[He]|=8192,!Bu(e)));)e=Fr(e)}function km(n,e){if(jo(n))throw new _e(911,!1);n[ar]===null&&(n[ar]=[]),n[ar].push(e)}function Z_(n,e){if(n[ar]===null)return;let t=n[ar].indexOf(e);t!==-1&&n[ar].splice(t,1)}function Fr(n){let e=n[sn];return Ei(e)?e[sn]:e}function Um(n){return n[Ns]??=[]}function Bm(n){return n.cleanup??=[]}function J_(n,e,t,i){let r=Um(e);r.push(t),n.firstCreatePass&&Bm(n).push(i,r.length-1)}var et={lFrame:ux(null),bindingsEnabled:!0,skipHydrationRootTNode:null};var am=!1;function K_(){return et.lFrame.elementDepthCount}function Q_(){et.lFrame.elementDepthCount++}function Vm(){et.lFrame.elementDepthCount--}function Hu(){return et.bindingsEnabled}function ex(){return et.skipHydrationRootTNode!==null}function Hm(n){return et.skipHydrationRootTNode===n}function zm(){et.skipHydrationRootTNode=null}function dt(){return et.lFrame.lView}function Gn(){return et.lFrame.tView}function Nn(n){return et.lFrame.contextLView=n,n[xn]}function Pn(n){return et.lFrame.contextLView=null,n}function On(){let n=Gm();for(;n!==null&&n.type===64;)n=n.parent;return n}function Gm(){return et.lFrame.currentTNode}function tx(){let n=et.lFrame,e=n.currentTNode;return n.isParent?e:e.parent}function Us(n,e){let t=et.lFrame;t.currentTNode=n,t.isParent=e}function jm(){return et.lFrame.isParent}function nx(){et.lFrame.isParent=!1}function Wm(){return am}function nc(n){let e=am;return am=n,e}function ix(){return et.lFrame.bindingIndex}function rx(n){return et.lFrame.bindingIndex=n}function zu(){return et.lFrame.bindingIndex++}function Gu(n){let e=et.lFrame,t=e.bindingIndex;return e.bindingIndex=e.bindingIndex+n,t}function ox(){return et.lFrame.inI18n}function sx(n,e){let t=et.lFrame;t.bindingIndex=t.bindingRootIndex=n,ju(e)}function ax(){return et.lFrame.currentDirectiveIndex}function ju(n){et.lFrame.currentDirectiveIndex=n}function cx(n){let e=et.lFrame.currentDirectiveIndex;return e===-1?null:n[e]}function $m(){return et.lFrame.currentQueryIndex}function Wu(n){et.lFrame.currentQueryIndex=n}function GC(n){let e=n[Be];return e.type===2?e.declTNode:e.type===1?n[ui]:null}function qm(n,e,t){if(t&4){let r=e,o=n;for(;r=r.parent,r===null&&!(t&1);)if(r=GC(o),r===null||(o=o[Vo],r.type&10))break;if(r===null)return!1;e=r,n=o}let i=et.lFrame=lx();return i.currentTNode=e,i.lView=n,!0}function $u(n){let e=lx(),t=n[Be];et.lFrame=e,e.currentTNode=t.firstChild,e.lView=n,e.tView=t,e.contextLView=n,e.bindingIndex=t.bindingStartIndex,e.inI18n=!1}function lx(){let n=et.lFrame,e=n===null?null:n.child;return e===null?ux(n):e}function ux(n){let e={currentTNode:null,isParent:!0,lView:null,tView:null,selectedIndex:-1,contextLView:null,elementDepthCount:0,currentNamespace:null,currentDirectiveIndex:-1,bindingRootIndex:-1,bindingIndex:-1,currentQueryIndex:0,parent:n,child:null,inI18n:!1};return n!==null&&(n.child=e),e}function dx(){let n=et.lFrame;return et.lFrame=n.parent,n.currentTNode=null,n.lView=null,n}var Xm=dx;function qu(){let n=dx();n.isParent=!0,n.tView=null,n.selectedIndex=-1,n.contextLView=null,n.elementDepthCount=0,n.currentDirectiveIndex=-1,n.currentNamespace=null,n.bindingRootIndex=-1,n.bindingIndex=-1,n.currentQueryIndex=0}function fx(n){return(et.lFrame.contextLView=Y_(n,et.lFrame.contextLView))[xn]}function fr(){return et.lFrame.selectedIndex}function Gr(n){et.lFrame.selectedIndex=n}function Ym(){let n=et.lFrame;return Om(n.tView,n.selectedIndex)}function pc(){et.lFrame.currentNamespace=Nm}function hx(){return et.lFrame.currentNamespace}var px=!0;function Xu(){return px}function mc(n){px=n}function cm(n,e=null,t=null,i){let r=Zm(n,e,t,i);return r.resolveInjectorInitializers(),r}function Zm(n,e=null,t=null,i,r=new Set){let o=[t||Hn,V_(n)],s;return new Oo(o,e||uc(),s||null,r)}var zn=class n{static THROW_IF_NOT_FOUND=Ro;static NULL=new tc;static create(e,t){if(Array.isArray(e))return cm({name:""},t,e,"");{let i=e.name??"";return cm({name:i},e.parent,e.providers,i)}}static \u0275prov=Ae({token:n,providedIn:"any",factory:()=>Le(wm)});static __NG_ELEMENT_ID__=-1},Kt=new Pe(""),hr=(()=>{class n{static __NG_ELEMENT_ID__=jC;static __NG_ENV_ID__=t=>t}return n})(),Cu=class extends hr{_lView;constructor(e){super(),this._lView=e}get destroyed(){return jo(this._lView)}onDestroy(e){let t=this._lView;return km(t,e),()=>Z_(t,e)}};function jC(){return new Cu(dt())}var mx=!1,gx=new Pe(""),jr=(()=>{class n{taskId=0;pendingTasks=new Set;destroyed=!1;pendingTask=new hn(!1);debugTaskTracker=Q(gx,{optional:!0});get hasPendingTasks(){return this.destroyed?!1:this.pendingTask.value}get hasPendingTasksObservable(){return this.destroyed?new tt(t=>{t.next(!1),t.complete()}):this.pendingTask}add(){!this.hasPendingTasks&&!this.destroyed&&this.pendingTask.next(!0);let t=this.taskId++;return this.pendingTasks.add(t),this.debugTaskTracker?.add(t),t}has(t){return this.pendingTasks.has(t)}remove(t){this.pendingTasks.delete(t),this.debugTaskTracker?.remove(t),this.pendingTasks.size===0&&this.hasPendingTasks&&this.pendingTask.next(!1)}ngOnDestroy(){this.pendingTasks.clear(),this.hasPendingTasks&&this.pendingTask.next(!1),this.destroyed=!0,this.pendingTask.unsubscribe()}static \u0275prov=Ae({token:n,providedIn:"root",factory:()=>new n})}return n})(),lm=class extends $t{__isAsync;destroyRef=void 0;pendingTasks=void 0;constructor(e=!1){super(),this.__isAsync=e,j_()&&(this.destroyRef=Q(hr,{optional:!0})??void 0,this.pendingTasks=Q(jr,{optional:!0})??void 0)}emit(e){let t=Ge(null);try{super.next(e)}finally{Ge(t)}}subscribe(e,t,i){let r=e,o=t||(()=>null),s=i;if(e&&typeof e=="object"){let c=e;r=c.next?.bind(c),o=c.error?.bind(c),s=c.complete?.bind(c)}this.__isAsync&&(o=this.wrapInTimeout(o),r&&(r=this.wrapInTimeout(r)),s&&(s=this.wrapInTimeout(s)));let a=super.subscribe({next:r,error:o,complete:s});return e instanceof fn&&e.add(a),a}wrapInTimeout(e){return t=>{let i=this.pendingTasks?.add();setTimeout(()=>{try{e(t)}finally{i!==void 0&&this.pendingTasks?.remove(i)}})}}},kt=lm;function Tu(...n){}function Jm(n){let e,t;function i(){n=Tu;try{t!==void 0&&typeof cancelAnimationFrame=="function"&&cancelAnimationFrame(t),e!==void 0&&clearTimeout(e)}catch{}}return e=setTimeout(()=>{n(),i()}),typeof requestAnimationFrame=="function"&&(t=requestAnimationFrame(()=>{n(),i()})),()=>i()}function vx(n){return queueMicrotask(()=>n()),()=>{n=Tu}}var Km="isAngularZone",ic=Km+"_ID",WC=0,Ut=class n{hasPendingMacrotasks=!1;hasPendingMicrotasks=!1;isStable=!0;onUnstable=new kt(!1);onMicrotaskEmpty=new kt(!1);onStable=new kt(!1);onError=new kt(!1);constructor(e){let{enableLongStackTrace:t=!1,shouldCoalesceEventChangeDetection:i=!1,shouldCoalesceRunChangeDetection:r=!1,scheduleInRootZone:o=mx}=e;if(typeof Zone>"u")throw new _e(908,!1);Zone.assertZonePatched();let s=this;s._nesting=0,s._outer=s._inner=Zone.current,Zone.TaskTrackingZoneSpec&&(s._inner=s._inner.fork(new Zone.TaskTrackingZoneSpec)),t&&Zone.longStackTraceZoneSpec&&(s._inner=s._inner.fork(Zone.longStackTraceZoneSpec)),s.shouldCoalesceEventChangeDetection=!r&&i,s.shouldCoalesceRunChangeDetection=r,s.callbackScheduled=!1,s.scheduleInRootZone=o,XC(s)}static isInAngularZone(){return typeof Zone<"u"&&Zone.current.get(Km)===!0}static assertInAngularZone(){if(!n.isInAngularZone())throw new _e(909,!1)}static assertNotInAngularZone(){if(n.isInAngularZone())throw new _e(909,!1)}run(e,t,i){return this._inner.run(e,t,i)}runTask(e,t,i,r){let o=this._inner,s=o.scheduleEventTask("NgZoneEvent: "+r,e,$C,Tu,Tu);try{return o.runTask(s,t,i)}finally{o.cancelTask(s)}}runGuarded(e,t,i){return this._inner.runGuarded(e,t,i)}runOutsideAngular(e){return this._outer.run(e)}},$C={};function Qm(n){if(n._nesting==0&&!n.hasPendingMicrotasks&&!n.isStable)try{n._nesting++,n.onMicrotaskEmpty.emit(null)}finally{if(n._nesting--,!n.hasPendingMicrotasks)try{n.runOutsideAngular(()=>n.onStable.emit(null))}finally{n.isStable=!0}}}function qC(n){if(n.isCheckStableRunning||n.callbackScheduled)return;n.callbackScheduled=!0;function e(){Jm(()=>{n.callbackScheduled=!1,um(n),n.isCheckStableRunning=!0,Qm(n),n.isCheckStableRunning=!1})}n.scheduleInRootZone?Zone.root.run(()=>{e()}):n._outer.run(()=>{e()}),um(n)}function XC(n){let e=()=>{qC(n)},t=WC++;n._inner=n._inner.fork({name:"angular",properties:{[Km]:!0,[ic]:t,[ic+t]:!0},onInvokeTask:(i,r,o,s,a,c)=>{if(YC(c))return i.invokeTask(o,s,a,c);try{return A_(n),i.invokeTask(o,s,a,c)}finally{(n.shouldCoalesceEventChangeDetection&&s.type==="eventTask"||n.shouldCoalesceRunChangeDetection)&&e(),R_(n)}},onInvoke:(i,r,o,s,a,c,l)=>{try{return A_(n),i.invoke(o,s,a,c,l)}finally{n.shouldCoalesceRunChangeDetection&&!n.callbackScheduled&&!ZC(c)&&e(),R_(n)}},onHasTask:(i,r,o,s)=>{i.hasTask(o,s),r===o&&(s.change=="microTask"?(n._hasPendingMicrotasks=s.microTask,um(n),Qm(n)):s.change=="macroTask"&&(n.hasPendingMacrotasks=s.macroTask))},onHandleError:(i,r,o,s)=>(i.handleError(o,s),n.runOutsideAngular(()=>n.onError.emit(s)),!1)})}function um(n){n._hasPendingMicrotasks||(n.shouldCoalesceEventChangeDetection||n.shouldCoalesceRunChangeDetection)&&n.callbackScheduled===!0?n.hasPendingMicrotasks=!0:n.hasPendingMicrotasks=!1}function A_(n){n._nesting++,n.isStable&&(n.isStable=!1,n.onUnstable.emit(null))}function R_(n){n._nesting--,Qm(n)}var rc=class{hasPendingMicrotasks=!1;hasPendingMacrotasks=!1;isStable=!0;onUnstable=new kt;onMicrotaskEmpty=new kt;onStable=new kt;onError=new kt;run(e,t,i){return e.apply(t,i)}runGuarded(e,t,i){return e.apply(t,i)}runOutsideAngular(e){return e()}runTask(e,t,i,r){return e.apply(t,i)}};function YC(n){return yx(n,"__ignore_ng_zone__")}function ZC(n){return yx(n,"__scheduler_tick__")}function yx(n,e){return!Array.isArray(n)||n.length!==1?!1:n[0]?.data?.[e]===!0}var cr=class{_console=console;handleError(e){this._console.error("ERROR",e)}},Ci=new Pe("",{factory:()=>{let n=Q(Ut),e=Q(Jt),t;return i=>{n.runOutsideAngular(()=>{e.destroyed&&!t?setTimeout(()=>{throw i}):(t??=e.get(cr),t.handleError(i))})}}}),_x={provide:Bo,useValue:()=>{let n=Q(cr,{optional:!0})},multi:!0},JC=new Pe("",{factory:()=>{let n=Q(Kt).defaultView;if(!n)return;let e=Q(Ci),t=o=>{e(o.reason),o.preventDefault()},i=o=>{o.error?e(o.error):e(new Error(o.message,{cause:o})),o.preventDefault()},r=()=>{n.addEventListener("unhandledrejection",t),n.addEventListener("error",i)};typeof Zone<"u"?Zone.root.run(r):r(),Q(hr).onDestroy(()=>{n.removeEventListener("error",i),n.removeEventListener("unhandledrejection",t)})}});function eg(){return lr([B_(()=>{Q(JC)})])}function lt(n,e){let[t,i,r]=kp(n,e?.equal),o=t,s=o[Tn];return o.set=i,o.update=r,o.asReadonly=xx.bind(o),o}function xx(){let n=this[Tn];if(n.readonlyFn===void 0){let e=()=>this();e[Tn]=n,n.readonlyFn=e}return n.readonlyFn}var Yu=(()=>{class n{view;node;constructor(t,i){this.view=t,this.node=i}static __NG_ELEMENT_ID__=KC}return n})();function KC(){return new Yu(dt(),On())}var Lo=class{},gc=new Pe("",{factory:()=>!0});var tg=new Pe("");var Zu=(()=>{class n{static \u0275prov=Ae({token:n,providedIn:"root",factory:()=>new dm})}return n})(),dm=class{dirtyEffectCount=0;queues=new Map;add(e){this.enqueue(e),this.schedule(e)}schedule(e){e.dirty&&this.dirtyEffectCount++}remove(e){let t=e.zone,i=this.queues.get(t);i.has(e)&&(i.delete(e),e.dirty&&this.dirtyEffectCount--)}enqueue(e){let t=e.zone;this.queues.has(t)||this.queues.set(t,new Set);let i=this.queues.get(t);i.has(e)||i.add(e)}flush(){for(;this.dirtyEffectCount>0;){let e=!1;for(let[t,i]of this.queues)t===null?e||=this.flushQueue(i):e||=t.run(()=>this.flushQueue(i));e||(this.dirtyEffectCount=0)}}flushQueue(e){let t=!1;for(let i of e)i.dirty&&(this.dirtyEffectCount--,t=!0,i.run());return t}},Du=class{[Tn];constructor(e){this[Tn]=e}destroy(){this[Tn].destroy()}};function vc(n,e){let t=e?.injector??Q(zn),i=e?.manualCleanup!==!0?t.get(hr):null,r,o=t.get(Yu,null,{optional:!0}),s=t.get(Lo);return o!==null?(r=tT(o.view,s,n),i instanceof Cu&&i._lView===o.view&&(i=null)):r=nT(n,t.get(Zu),s),r.injector=t,i!==null&&(r.onDestroyFns=[i.onDestroy(()=>r.destroy())]),new Du(r)}var bx=it(ae({},Bp),{cleanupFns:void 0,zone:null,onDestroyFns:null,run(){let n=nc(!1);try{Vp(this)}finally{nc(n)}},cleanup(){if(!this.cleanupFns?.length)return;let n=Ge(null);try{for(;this.cleanupFns.length;)this.cleanupFns.pop()()}finally{this.cleanupFns=[],Ge(n)}}}),QC=it(ae({},bx),{consumerMarkedDirty(){this.scheduler.schedule(this),this.notifier.notify(12)},destroy(){if(wo(this),this.onDestroyFns!==null)for(let n of this.onDestroyFns)n();this.cleanup(),this.scheduler.remove(this)}}),eT=it(ae({},bx),{consumerMarkedDirty(){this.view[He]|=8192,ks(this.view),this.notifier.notify(13)},destroy(){if(wo(this),this.onDestroyFns!==null)for(let n of this.onDestroyFns)n();this.cleanup(),this.view[Lr]?.delete(this)}});function tT(n,e,t){let i=Object.create(eT);return i.view=n,i.zone=typeof Zone<"u"?Zone.current:null,i.notifier=e,i.fn=Mx(i,t),n[Lr]??=new Set,n[Lr].add(i),i.consumerMarkedDirty(i),i}function nT(n,e,t){let i=Object.create(QC);return i.fn=Mx(i,n),i.scheduler=e,i.notifier=t,i.zone=typeof Zone<"u"?Zone.current:null,i.scheduler.add(i),i.notifier.notify(12),i}function Mx(n,e){return()=>{e(t=>(n.cleanupFns??=[]).push(t))}}function wc(n){return{toString:n}.toString()}function dT(n){return typeof n=="function"}function Jx(n,e,t,i){e!==null?e.applyValueToInputSignal(e,i):n[t]=i}var id=class{previousValue;currentValue;firstChange;constructor(e,t,i){this.previousValue=e,this.currentValue=t,this.firstChange=i}isFirstChange(){return this.firstChange}},gd=(()=>{let n=()=>Kx;return n.ngInherit=!0,n})();function Kx(n){return n.type.prototype.ngOnChanges&&(n.setInput=hT),fT}function fT(){let n=eb(this),e=n?.current;if(e){let t=n.previous;if(t===Uo)n.previous=e;else for(let i in e)t[i]=e[i];n.current=null,this.ngOnChanges(e)}}function hT(n,e,t,i,r){let o=this.declaredInputs[i],s=eb(n)||pT(n,{previous:Uo,current:null}),a=s.current||(s.current={}),c=s.previous,l=c[o];a[o]=new id(l&&l.currentValue,t,c===Uo),Jx(n,e,r,t)}var Qx="__ngSimpleChanges__";function eb(n){return n[Qx]||null}function pT(n,e){return n[Qx]=e}var Sx=[];var Tt=function(n,e=null,t){for(let i=0;i<Sx.length;i++){let r=Sx[i];r(n,e,t)}},ft=(function(n){return n[n.TemplateCreateStart=0]="TemplateCreateStart",n[n.TemplateCreateEnd=1]="TemplateCreateEnd",n[n.TemplateUpdateStart=2]="TemplateUpdateStart",n[n.TemplateUpdateEnd=3]="TemplateUpdateEnd",n[n.LifecycleHookStart=4]="LifecycleHookStart",n[n.LifecycleHookEnd=5]="LifecycleHookEnd",n[n.OutputStart=6]="OutputStart",n[n.OutputEnd=7]="OutputEnd",n[n.BootstrapApplicationStart=8]="BootstrapApplicationStart",n[n.BootstrapApplicationEnd=9]="BootstrapApplicationEnd",n[n.BootstrapComponentStart=10]="BootstrapComponentStart",n[n.BootstrapComponentEnd=11]="BootstrapComponentEnd",n[n.ChangeDetectionStart=12]="ChangeDetectionStart",n[n.ChangeDetectionEnd=13]="ChangeDetectionEnd",n[n.ChangeDetectionSyncStart=14]="ChangeDetectionSyncStart",n[n.ChangeDetectionSyncEnd=15]="ChangeDetectionSyncEnd",n[n.AfterRenderHooksStart=16]="AfterRenderHooksStart",n[n.AfterRenderHooksEnd=17]="AfterRenderHooksEnd",n[n.ComponentStart=18]="ComponentStart",n[n.ComponentEnd=19]="ComponentEnd",n[n.DeferBlockStateStart=20]="DeferBlockStateStart",n[n.DeferBlockStateEnd=21]="DeferBlockStateEnd",n[n.DynamicComponentStart=22]="DynamicComponentStart",n[n.DynamicComponentEnd=23]="DynamicComponentEnd",n[n.HostBindingsUpdateStart=24]="HostBindingsUpdateStart",n[n.HostBindingsUpdateEnd=25]="HostBindingsUpdateEnd",n})(ft||{});function mT(n,e,t){let{ngOnChanges:i,ngOnInit:r,ngDoCheck:o}=e.type.prototype;if(i){let s=Kx(e);(t.preOrderHooks??=[]).push(n,s),(t.preOrderCheckHooks??=[]).push(n,s)}r&&(t.preOrderHooks??=[]).push(0-n,r),o&&((t.preOrderHooks??=[]).push(n,o),(t.preOrderCheckHooks??=[]).push(n,o))}function tb(n,e){for(let t=e.directiveStart,i=e.directiveEnd;t<i;t++){let o=n.data[t].type.prototype,{ngAfterContentInit:s,ngAfterContentChecked:a,ngAfterViewInit:c,ngAfterViewChecked:l,ngOnDestroy:u}=o;s&&(n.contentHooks??=[]).push(-t,s),a&&((n.contentHooks??=[]).push(t,a),(n.contentCheckHooks??=[]).push(t,a)),c&&(n.viewHooks??=[]).push(-t,c),l&&((n.viewHooks??=[]).push(t,l),(n.viewCheckHooks??=[]).push(t,l)),u!=null&&(n.destroyHooks??=[]).push(t,u)}}function Ku(n,e,t){nb(n,e,3,t)}function Qu(n,e,t,i){(n[He]&3)===t&&nb(n,e,t,i)}function ng(n,e){let t=n[He];(t&3)===e&&(t&=16383,t+=1,n[He]=t)}function nb(n,e,t,i){let r=i!==void 0?n[Ho]&65535:0,o=i??-1,s=e.length-1,a=0;for(let c=r;c<s;c++)if(typeof e[c+1]=="number"){if(a=e[c],i!=null&&a>=i)break}else e[c]<0&&(n[Ho]+=65536),(a<o||o==-1)&&(gT(n,t,e,c),n[Ho]=(n[Ho]&4294901760)+c+2),c++}function Ex(n,e){Tt(ft.LifecycleHookStart,n,e);let t=Ge(null);try{e.call(n)}finally{Ge(t),Tt(ft.LifecycleHookEnd,n,e)}}function gT(n,e,t,i){let r=t[i]<0,o=t[i+1],s=r?-t[i]:t[i],a=n[s];r?n[He]>>14<n[Ho]>>16&&(n[He]&3)===e&&(n[He]+=16384,Ex(a,o)):Ex(a,o)}var Vs=-1,bc=class{factory;name;injectImpl;resolving=!1;canSeeViewProviders;multi;componentProviders;index;providerFactory;constructor(e,t,i,r){this.factory=e,this.name=r,this.canSeeViewProviders=t,this.injectImpl=i}};function vT(n){return(n.flags&8)!==0}function yT(n){return(n.flags&16)!==0}function _T(n,e,t){let i=0;for(;i<t.length;){let r=t[i];if(typeof r=="number"){if(r!==0)break;i++;let o=t[i++],s=t[i++],a=t[i++];n.setAttribute(e,s,a,o)}else{let o=r,s=t[++i];bT(o)?n.setProperty(e,o,s):n.setAttribute(e,o,s),i++}}return i}function xT(n){return n===3||n===4||n===6}function bT(n){return n.charCodeAt(0)===64}function vd(n,e){if(!(e===null||e.length===0))if(n===null||n.length===0)n=e.slice();else{let t=-1;for(let i=0;i<e.length;i++){let r=e[i];typeof r=="number"?t=r:t===0||(t===-1||t===2?wx(n,t,r,null,e[++i]):wx(n,t,r,null,null))}}return n}function wx(n,e,t,i,r){let o=0,s=n.length;if(e===-1)s=-1;else for(;o<n.length;){let a=n[o++];if(typeof a=="number"){if(a===e){s=-1;break}else if(a>e){s=o-1;break}}}for(;o<n.length;){let a=n[o];if(typeof a=="number")break;if(a===t){r!==null&&(n[o+1]=r);return}o++,r!==null&&o++}s!==-1&&(n.splice(s,0,e),o=s+1),n.splice(o++,0,t),r!==null&&n.splice(o++,0,r)}function ib(n){return n!==Vs}function rd(n){return n&32767}function MT(n){return n>>16}function od(n,e){let t=MT(n),i=e;for(;t>0;)i=i[Vo],t--;return i}var cg=!0;function Cx(n){let e=cg;return cg=n,e}var ST=256,rb=ST-1,ob=5,ET=0,Wi={};function wT(n,e,t){let i;typeof t=="string"?i=t.charCodeAt(0)||0:t.hasOwnProperty(ko)&&(i=t[ko]),i==null&&(i=t[ko]=ET++);let r=i&rb,o=1<<r;e.data[n+(r>>ob)]|=o}function sb(n,e){let t=ab(n,e);if(t!==-1)return t;let i=e[Be];i.firstCreatePass&&(n.injectorIndex=e.length,ig(i.data,n),ig(e,null),ig(i.blueprint,null));let r=Rg(n,e),o=n.injectorIndex;if(ib(r)){let s=rd(r),a=od(r,e),c=a[Be].data;for(let l=0;l<8;l++)e[o+l]=a[s+l]|c[s+l]}return e[o+8]=r,o}function ig(n,e){n.push(0,0,0,0,0,0,0,0,e)}function ab(n,e){return n.injectorIndex===-1||n.parent&&n.parent.injectorIndex===n.injectorIndex||e[n.injectorIndex+8]===null?-1:n.injectorIndex}function Rg(n,e){if(n.parent&&n.parent.injectorIndex!==-1)return n.parent.injectorIndex;let t=0,i=null,r=e;for(;r!==null;){if(i=fb(r),i===null)return Vs;if(t++,r=r[Vo],i.injectorIndex!==-1)return i.injectorIndex|t<<16}return Vs}function CT(n,e,t){wT(n,e,t)}function cb(n,e,t){if(t&8||n!==void 0)return n;Pu(e,"NodeInjector")}function lb(n,e,t,i){if(t&8&&i===void 0&&(i=null),(t&3)===0){let r=n[Br],o=Yn(void 0);try{return r?r.get(e,i,t&8):Sm(e,i,t&8)}finally{Yn(o)}}return cb(i,e,t)}function ub(n,e,t,i=0,r){if(n!==null){if(e[He]&2048&&!(i&2)){let s=AT(n,e,t,i,Wi);if(s!==Wi)return s}let o=db(n,e,t,i,Wi);if(o!==Wi)return o}return lb(e,t,i,r)}function db(n,e,t,i,r){let o=DT(t);if(typeof o=="function"){if(!qm(e,n,i))return i&1?cb(r,t,i):lb(e,t,i,r);try{let s;if(s=o(i),s==null&&!(i&8))Pu(t);else return s}finally{Xm()}}else if(typeof o=="number"){let s=null,a=ab(n,e),c=Vs,l=i&1?e[di][ui]:null;for((a===-1||i&4)&&(c=a===-1?Rg(n,e):e[a+8],c===Vs||!Dx(i,!1)?a=-1:(s=e[Be],a=rd(c),e=od(c,e)));a!==-1;){let u=e[Be];if(Tx(o,a,u.data)){let d=TT(a,e,t,s,i,l);if(d!==Wi)return d}c=e[a+8],c!==Vs&&Dx(i,e[Be].data[a+8]===l)&&Tx(o,a,e)?(s=u,a=rd(c),e=od(c,e)):a=-1}}return r}function TT(n,e,t,i,r,o){let s=e[Be],a=s.data[n+8],c=i==null?dr(a)&&cg:i!=s&&(a.type&3)!==0,l=r&1&&o===a,u=ed(a,s,t,c,l);return u!==null?sd(e,s,u,a,r):Wi}function ed(n,e,t,i,r){let o=n.providerIndexes,s=e.data,a=o&1048575,c=n.directiveStart,l=n.directiveEnd,u=o>>20,d=i?a:a+u,f=r?a+u:l;for(let h=d;h<f;h++){let g=s[h];if(h<c&&t===g||h>=c&&g.type===t)return h}if(r){let h=s[c];if(h&&Go(h)&&h.type===t)return c}return null}function sd(n,e,t,i,r){let o=n[t],s=e.data;if(o instanceof bc){let a=o;if(a.resolving)throw Mm("");let c=Cx(a.canSeeViewProviders);a.resolving=!0;let l=s[t].type||s[t],u,d=a.injectImpl?Yn(a.injectImpl):null,f=qm(n,i,0);try{o=n[t]=a.factory(void 0,r,s,n,i),e.firstCreatePass&&t>=i.directiveStart&&mT(t,s[t],e)}finally{d!==null&&Yn(d),Cx(c),a.resolving=!1,Xm()}}return o}function DT(n){if(typeof n=="string")return n.charCodeAt(0)||0;let e=n.hasOwnProperty(ko)?n[ko]:void 0;return typeof e=="number"?e>=0?e&rb:IT:e}function Tx(n,e,t){let i=1<<n;return!!(t[e+(n>>ob)]&i)}function Dx(n,e){return!(n&2)&&!(n&1&&e)}var $o=class{_tNode;_lView;constructor(e,t){this._tNode=e,this._lView=t}get(e,t,i){return ub(this._tNode,this._lView,e,No(i),t)}};function IT(){return new $o(On(),dt())}function Cc(n){return wc(()=>{let e=n.prototype.constructor,t=e[ec]||lg(e),i=Object.prototype,r=Object.getPrototypeOf(n.prototype).constructor;for(;r&&r!==i;){let o=r[ec]||lg(r);if(o&&o!==t)return o;r=Object.getPrototypeOf(r)}return o=>new o})}function lg(n){return hm(n)?()=>{let e=lg(Vn(n));return e&&e()}:Po(n)}function AT(n,e,t,i,r){let o=n,s=e;for(;o!==null&&s!==null&&s[He]&2048&&!Fs(s);){let a=db(o,s,t,i|2,Wi);if(a!==Wi)return a;let c=o.parent;if(!c){let l=s[Am];if(l){let u=l.get(t,Wi,i&-5);if(u!==Wi)return u}c=fb(s),s=s[Vo]}o=c}return r}function fb(n){let e=n[Be],t=e.type;return t===2?e.declTNode:t===1?n[ui]:null}function RT(){return Ws(On(),dt())}function Ws(n,e){return new qr(wi(n,e))}var qr=(()=>{class n{nativeElement;constructor(t){this.nativeElement=t}static __NG_ELEMENT_ID__=RT}return n})();function NT(n){return n instanceof qr?n.nativeElement:n}function PT(){return this._results[Symbol.iterator]()}var ad=class{_emitDistinctChangesOnly;dirty=!0;_onDirty=void 0;_results=[];_changesDetected=!1;_changes=void 0;length=0;first=void 0;last=void 0;get changes(){return this._changes??=new $t}constructor(e=!1){this._emitDistinctChangesOnly=e}get(e){return this._results[e]}map(e){return this._results.map(e)}filter(e){return this._results.filter(e)}find(e){return this._results.find(e)}reduce(e,t){return this._results.reduce(e,t)}forEach(e){this._results.forEach(e)}some(e){return this._results.some(e)}toArray(){return this._results.slice()}toString(){return this._results.toString()}reset(e,t){this.dirty=!1;let i=k_(e);(this._changesDetected=!F_(this._results,i,t))&&(this._results=i,this.length=i.length,this.last=i[this.length-1],this.first=i[0])}notifyOnChanges(){this._changes!==void 0&&(this._changesDetected||!this._emitDistinctChangesOnly)&&this._changes.next(this)}onDirty(e){this._onDirty=e}setDirty(){this.dirty=!0,this._onDirty?.()}destroy(){this._changes!==void 0&&(this._changes.complete(),this._changes.unsubscribe())}[Symbol.iterator]=PT};function hb(n){return(n.flags&128)===128}var Ng=(function(n){return n[n.OnPush=0]="OnPush",n[n.Eager=1]="Eager",n[n.Default=1]="Default",n})(Ng||{}),pb=new Map,OT=0;function LT(){return OT++}function FT(n){pb.set(n[Hr],n)}function ug(n){pb.delete(n[Hr])}var Ix="__ngContext__";function Hs(n,e){ur(e)?(n[Ix]=e[Hr],FT(e)):n[Ix]=e}function mb(n){return vb(n[Ps])}function gb(n){return vb(n[li])}function vb(n){for(;n!==null&&!Ei(n);)n=n[li];return n}var kT;function Pg(n){kT=n}var yd=new Pe("",{factory:()=>UT}),UT="ng";var _d=new Pe(""),Tc=new Pe("",{providedIn:"platform",factory:()=>"unknown"});var xd=new Pe("",{factory:()=>Q(Kt).body?.querySelector("[ngCspNonce]")?.getAttribute("ngCspNonce")||null});var yb=!1,_b=new Pe("",{factory:()=>yb});var BT=(n,e,t,i)=>{};function VT(n,e,t,i){BT(n,e,t,i)}function Og(n){return(n.flags&32)===32}var HT=()=>null;function xb(n,e,t=!1){return HT(n,e,t)}function bb(n,e){let t=n.contentQueries;if(t!==null){let i=Ge(null);try{for(let r=0;r<t.length;r+=2){let o=t[r],s=t[r+1];if(s!==-1){let a=n.data[s];Wu(o),a.contentQueries(2,e[s],s)}}}finally{Ge(i)}}}function dg(n,e,t){Wu(0);let i=Ge(null);try{e(n,t)}finally{Ge(i)}}function Lg(n,e,t){if(Rm(e)){let i=Ge(null);try{let r=e.directiveStart,o=e.directiveEnd;for(let s=r;s<o;s++){let a=n.data[s];if(a.contentQueries){let c=t[s];a.contentQueries(1,c,s)}}}finally{Ge(i)}}}var Ii=(function(n){return n[n.Emulated=0]="Emulated",n[n.None=2]="None",n[n.ShadowDom=3]="ShadowDom",n[n.ExperimentalIsolatedShadowDom=4]="ExperimentalIsolatedShadowDom",n})(Ii||{});var fg=class{changingThisBreaksApplicationSecurity;constructor(e){this.changingThisBreaksApplicationSecurity=e}toString(){return`SafeValue must use [property]=binding: ${this.changingThisBreaksApplicationSecurity} (see ${fm})`}};function Fg(n){return n instanceof fg?n.changingThisBreaksApplicationSecurity:n}var zT=/^>|^->|<!--|-->|--!>|<!-$/g,GT=/(<|>)/g,jT="\u200B$1\u200B";function WT(n){return n.replace(zT,e=>e.replace(GT,jT))}function $T(n,e){return n.createText(e)}function qT(n,e,t){n.setValue(e,t)}function XT(n,e){return n.createComment(WT(e))}function Mb(n,e,t){return n.createElement(e,t)}function cd(n,e,t,i,r){n.insertBefore(e,t,i,r)}function Sb(n,e,t){n.appendChild(e,t)}function Ax(n,e,t,i,r){i!==null?cd(n,e,t,i,r):Sb(n,e,t)}function YT(n,e,t,i){n.removeChild(null,e,t,i)}function ZT(n,e,t){n.setAttribute(e,"style",t)}function JT(n,e,t){t===""?n.removeAttribute(e,"class"):n.setAttribute(e,"class",t)}function Eb(n,e,t){let{mergedAttrs:i,classes:r,styles:o}=t;i!==null&&_T(n,e,i),r!==null&&JT(n,e,r),o!==null&&ZT(n,e,o)}function wb(n){return n instanceof Function?n():n}function KT(n,e,t){let i=n.length;for(;;){let r=n.indexOf(e,t);if(r===-1)return r;if(r===0||n.charCodeAt(r-1)<=32){let o=e.length;if(r+o===i||n.charCodeAt(r+o)<=32)return r}t=r+1}}var Cb="ng-template";function QT(n,e,t,i){let r=0;if(i){for(;r<e.length&&typeof e[r]=="string";r+=2)if(e[r]==="class"&&KT(e[r+1].toLowerCase(),t,0)!==-1)return!0}else if(kg(n))return!1;if(r=e.indexOf(1,r),r>-1){let o;for(;++r<e.length&&typeof(o=e[r])=="string";)if(o.toLowerCase()===t)return!0}return!1}function kg(n){return n.type===4&&n.value!==Cb}function eD(n,e,t){let i=n.type===4&&!t?Cb:n.value;return e===i}function tD(n,e,t){let i=4,r=n.attrs,o=r!==null?rD(r):0,s=!1;for(let a=0;a<e.length;a++){let c=e[a];if(typeof c=="number"){if(!s&&!Ti(i)&&!Ti(c))return!1;if(s&&Ti(c))continue;s=!1,i=c|i&1;continue}if(!s)if(i&4){if(i=2|i&1,c!==""&&!eD(n,c,t)||c===""&&e.length===1){if(Ti(i))return!1;s=!0}}else if(i&8){if(r===null||!QT(n,r,c,t)){if(Ti(i))return!1;s=!0}}else{let l=e[++a],u=nD(c,r,kg(n),t);if(u===-1){if(Ti(i))return!1;s=!0;continue}if(l!==""){let d;if(u>o?d="":d=r[u+1].toLowerCase(),i&2&&l!==d){if(Ti(i))return!1;s=!0}}}}return Ti(i)||s}function Ti(n){return(n&1)===0}function nD(n,e,t,i){if(e===null)return-1;let r=0;if(i||!t){let o=!1;for(;r<e.length;){let s=e[r];if(s===n)return r;if(s===3||s===6)o=!0;else if(s===1||s===2){let a=e[++r];for(;typeof a=="string";)a=e[++r];continue}else{if(s===4)break;if(s===0){r+=4;continue}}r+=o?1:2}return-1}else return oD(e,n)}function iD(n,e,t=!1){for(let i=0;i<e.length;i++)if(tD(n,e[i],t))return!0;return!1}function rD(n){for(let e=0;e<n.length;e++){let t=n[e];if(xT(t))return e}return n.length}function oD(n,e){let t=n.indexOf(4);if(t>-1)for(t++;t<n.length;){let i=n[t];if(typeof i=="number")return-1;if(i===e)return t;t++}return-1}function Rx(n,e){return n?":not("+e.trim()+")":e}function sD(n){let e=n[0],t=1,i=2,r="",o=!1;for(;t<n.length;){let s=n[t];if(typeof s=="string")if(i&2){let a=n[++t];r+="["+s+(a.length>0?'="'+a+'"':"")+"]"}else i&8?r+="."+s:i&4&&(r+=" "+s);else r!==""&&!Ti(s)&&(e+=Rx(o,r),r=""),i=s,o=o||!Ti(i);t++}return r!==""&&(e+=Rx(o,r)),e}function aD(n){return n.map(sD).join(",")}function cD(n){let e=[],t=[],i=1,r=2;for(;i<n.length;){let o=n[i];if(typeof o=="string")r===2?o!==""&&e.push(o,n[++i]):r===8&&t.push(o);else{if(!Ti(r))break;r=o}i++}return t.length&&e.push(1,...t),e}var pi={};function Ug(n,e,t,i,r,o,s,a,c,l,u){let d=An+i,f=d+r,h=lD(d,f),g=typeof l=="function"?l():l;return h[Be]={type:n,blueprint:h,template:t,queries:null,viewQuery:a,declTNode:e,data:h.slice().fill(null,d),bindingStartIndex:d,expandoStartIndex:f,hostBindingOpCodes:null,firstCreatePass:!0,firstUpdatePass:!0,staticViewQueries:!1,staticContentQueries:!1,preOrderHooks:null,preOrderCheckHooks:null,contentHooks:null,contentCheckHooks:null,viewHooks:null,viewCheckHooks:null,destroyHooks:null,cleanup:null,contentQueries:null,components:null,directiveRegistry:typeof o=="function"?o():o,pipeRegistry:typeof s=="function"?s():s,firstChild:null,schemas:c,consts:g,incompleteFirstPass:!1,ssrId:u}}function lD(n,e){let t=[];for(let i=0;i<e;i++)t.push(i<n?null:pi);return t}function uD(n){let e=n.tView;return e===null||e.incompleteFirstPass?n.tView=Ug(1,null,n.template,n.decls,n.vars,n.directiveDefs,n.pipeDefs,n.viewQuery,n.schemas,n.consts,n.id):e}function Bg(n,e,t,i,r,o,s,a,c,l,u){let d=e.blueprint.slice();return d[Si]=r,d[He]=i|4|128|8|64|1024,(l!==null||n&&n[He]&2048)&&(d[He]|=2048),Lm(d),d[sn]=d[Vo]=n,d[xn]=t,d[Gi]=s||n&&n[Gi],d[Bt]=a||n&&n[Bt],d[Br]=c||n&&n[Br]||null,d[ui]=o,d[Hr]=LT(),d[dc]=u,d[Am]=l,d[di]=e.type==2?n[di]:d,d}function dD(n,e,t){let i=wi(e,n),r=uD(t),o=n[Gi].rendererFactory,s=Vg(n,Bg(n,r,null,Tb(t),i,e,null,o.createRenderer(i,t),null,null,null));return n[e.index]=s}function Tb(n){let e=16;return n.signals?e=4096:n.onPush&&(e=64),e}function Db(n,e,t,i){if(t===0)return-1;let r=e.length;for(let o=0;o<t;o++)e.push(i),n.blueprint.push(i),n.data.push(null);return r}function Vg(n,e){return n[Ps]?n[Im][li]=e:n[Ps]=e,n[Im]=e,e}function fe(n=1){Ib(Gn(),dt(),fr()+n,!1)}function Ib(n,e,t,i){if(!i)if((e[He]&3)===3){let o=n.preOrderCheckHooks;o!==null&&Ku(e,o,t)}else{let o=n.preOrderHooks;o!==null&&Qu(e,o,0,t)}Gr(t)}var bd=(function(n){return n[n.None=0]="None",n[n.SignalBased=1]="SignalBased",n[n.HasDecoratorInputTransform=2]="HasDecoratorInputTransform",n})(bd||{});function hg(n,e,t,i){let r=Ge(null);try{let[o,s,a]=n.inputs[t],c=null;(s&bd.SignalBased)!==0&&(c=e[o][Tn]),c!==null&&c.transformFn!==void 0?i=c.transformFn(i):a!==null&&(i=a.call(e,i)),n.setInput!==null?n.setInput(e,c,i,t,o):Jx(e,c,o,i)}finally{Ge(r)}}var Ai=(function(n){return n[n.Important=1]="Important",n[n.DashCase=2]="DashCase",n})(Ai||{}),fD;function Hg(n,e){return fD(n,e)}var u4=typeof document<"u"&&typeof document?.documentElement?.getAnimations=="function";var pg=new WeakMap,yc=new WeakSet;function hD(n,e){let t=pg.get(n);if(!t||t.length===0)return;let i=e.parentNode,r=e.previousSibling;for(let o=t.length-1;o>=0;o--){let s=t[o],a=s.parentNode;s===e?(t.splice(o,1),yc.add(s),s.dispatchEvent(new CustomEvent("animationend",{detail:{cancel:!0}}))):(r&&s===r||a&&i&&a!==i)&&(t.splice(o,1),s.dispatchEvent(new CustomEvent("animationend",{detail:{cancel:!0}})),s.parentNode?.removeChild(s))}}function pD(n,e){let t=pg.get(n);t?t.includes(e)||t.push(e):pg.set(n,[e])}var zs=new Set,zg=(function(n){return n[n.CHANGE_DETECTION=0]="CHANGE_DETECTION",n[n.AFTER_NEXT_RENDER=1]="AFTER_NEXT_RENDER",n})(zg||{}),$s=new Pe(""),Nx=new Set;function Gg(n){Nx.has(n)||(Nx.add(n),performance?.mark?.("mark_feature_usage",{detail:{feature:n}}))}var Ab=(()=>{class n{impl=null;execute(){this.impl?.execute()}static \u0275prov=Ae({token:n,providedIn:"root",factory:()=>new n})}return n})();var mD=new Pe("",{factory:()=>({queue:new Set,isScheduled:!1,scheduler:null,injector:Q(Jt)})});function Rb(n,e,t){let i=n.get(mD);if(Array.isArray(e))for(let r of e)i.queue.add(r),t?.detachedLeaveAnimationFns?.push(r);else i.queue.add(e),t?.detachedLeaveAnimationFns?.push(e);i.scheduler&&i.scheduler(n)}function gD(n,e){for(let[t,i]of e)Rb(n,i.animateFns)}function Px(n,e,t,i){let r=n?.[Os]?.enter;e!==null&&r&&r.has(t.index)&&gD(i,r)}function Bs(n,e,t,i,r,o,s,a){if(r!=null){let c,l=!1;Ei(r)?c=r:ur(r)&&(l=!0,r=r[Si]);let u=fi(r);n===0&&i!==null?(Px(a,i,o,t),s==null?Sb(e,i,u):cd(e,i,u,s||null,!0)):n===1&&i!==null?(Px(a,i,o,t),cd(e,i,u,s||null,!0),hD(o,u)):n===2?(a?.[Os]?.leave?.has(o.index)&&pD(o,u),yc.delete(u),Ox(a,o,t,d=>{if(yc.has(u)){yc.delete(u);return}YT(e,u,l,d)})):n===3&&(yc.delete(u),Ox(a,o,t,()=>{e.destroyNode(u)})),c!=null&&ID(e,n,t,c,o,i,s)}}function vD(n,e){Nb(n,e),e[Si]=null,e[ui]=null}function yD(n,e,t,i,r,o){i[Si]=r,i[ui]=e,Md(n,i,t,1,r,o)}function Nb(n,e){e[Gi].changeDetectionScheduler?.notify(9),Md(n,e,e[Bt],2,null,null)}function _D(n){let e=n[Ps];if(!e)return rg(n[Be],n);for(;e;){let t=null;if(ur(e))t=e[Ps];else{let i=e[Rn];i&&(t=i)}if(!t){for(;e&&!e[li]&&e!==n;)ur(e)&&rg(e[Be],e),e=e[sn];e===null&&(e=n),ur(e)&&rg(e[Be],e),t=e&&e[li]}e=t}}function jg(n,e){let t=n[zo],i=t.indexOf(e);t.splice(i,1)}function Pb(n,e){if(jo(e))return;let t=e[Bt];t.destroyNode&&Md(n,e,t,3,null,null),_D(e)}function rg(n,e){if(jo(e))return;let t=Ge(null);try{e[He]&=-129,e[He]|=256,e[Zn]&&wo(e[Zn]),MD(n,e),bD(n,e),e[Be].type===1&&e[Bt].destroy();let i=e[Vr];if(i!==null&&Ei(e[sn])){i!==e[sn]&&jg(i,e);let r=e[ji];r!==null&&r.detachView(n)}ug(e)}finally{Ge(t)}}function Ox(n,e,t,i){let r=n?.[Os];if(r==null||r.leave==null||!r.leave.has(e.index))return i(!1);n&&zs.add(n[Hr]),Rb(t,()=>{if(r.leave&&r.leave.has(e.index)){let s=r.leave.get(e.index),a=[];if(s){for(let c=0;c<s.animateFns.length;c++){let l=s.animateFns[c],{promise:u}=l();a.push(u)}r.detachedLeaveAnimationFns=void 0}r.running=Promise.allSettled(a),xD(n,i)}else n&&zs.delete(n[Hr]),i(!1)},r)}function xD(n,e){let t=n[Os]?.running;if(t){t.then(()=>{n[Os].running=void 0,zs.delete(n[Hr]),e(!0)});return}e(!1)}function bD(n,e){let t=n.cleanup,i=e[Ns];if(t!==null)for(let s=0;s<t.length-1;s+=2)if(typeof t[s]=="string"){let a=t[s+3];a>=0?i[a]():i[-a].unsubscribe(),s+=2}else{let a=i[t[s+1]];t[s].call(a)}i!==null&&(e[Ns]=null);let r=e[ar];if(r!==null){e[ar]=null;for(let s=0;s<r.length;s++){let a=r[s];a()}}let o=e[Lr];if(o!==null){e[Lr]=null;for(let s of o)s.destroy()}}function MD(n,e){let t;if(n!=null&&(t=n.destroyHooks)!=null)for(let i=0;i<t.length;i+=2){let r=e[t[i]];if(!(r instanceof bc)){let o=t[i+1];if(Array.isArray(o))for(let s=0;s<o.length;s+=2){let a=r[o[s]],c=o[s+1];Tt(ft.LifecycleHookStart,a,c);try{c.call(a)}finally{Tt(ft.LifecycleHookEnd,a,c)}}else{Tt(ft.LifecycleHookStart,r,o);try{o.call(r)}finally{Tt(ft.LifecycleHookEnd,r,o)}}}}}function SD(n,e,t){return ED(n,e.parent,t)}function ED(n,e,t){let i=e;for(;i!==null&&i.type&168;)e=i,i=e.parent;if(i===null)return t[Si];if(dr(i)){let{encapsulation:r}=n.data[i.directiveStart+i.componentOffset];if(r===Ii.None||r===Ii.Emulated)return null}return wi(i,t)}function wD(n,e,t){return TD(n,e,t)}function CD(n,e,t){return n.type&40?wi(n,t):null}var TD=CD,Lx;function Wg(n,e,t,i){let r=SD(n,i,e),o=e[Bt],s=i.parent||e[ui],a=wD(s,i,e);if(r!=null)if(Array.isArray(t))for(let c=0;c<t.length;c++)Ax(o,r,t[c],a,!1);else Ax(o,r,t,a,!1);Lx!==void 0&&Lx(o,i,e,t,r)}function _c(n,e){if(e!==null){let t=e.type;if(t&3)return wi(e,n);if(t&4)return mg(-1,n[e.index]);if(t&8){let i=e.child;if(i!==null)return _c(n,i);{let r=n[e.index];return Ei(r)?mg(-1,r):fi(r)}}else{if(t&128)return _c(n,e.next);if(t&32)return Hg(e,n)()||fi(n[e.index]);{let i=Ob(n,e);if(i!==null){if(Array.isArray(i))return i[0];let r=Fr(n[di]);return _c(r,i)}else return _c(n,e.next)}}}return null}function Ob(n,e){if(e!==null){let i=n[di][ui],r=e.projection;return i.projection[r]}return null}function mg(n,e){let t=Rn+n+1;if(t<e.length){let i=e[t],r=i[Be].firstChild;if(r!==null)return _c(i,r)}return e[zr]}function $g(n,e,t,i,r,o,s){for(;t!=null;){let a=i[Br];if(t.type===128){t=t.next;continue}let c=i[t.index],l=t.type;if(s&&e===0&&(c&&Hs(fi(c),i),t.flags|=2),!Og(t))if(l&8)$g(n,e,t.child,i,r,o,!1),Bs(e,n,a,r,c,t,o,i);else if(l&32){let u=Hg(t,i),d;for(;d=u();)Bs(e,n,a,r,d,t,o,i);Bs(e,n,a,r,c,t,o,i)}else l&16?DD(n,e,i,t,r,o):Bs(e,n,a,r,c,t,o,i);t=s?t.projectionNext:t.next}}function Md(n,e,t,i,r,o){$g(t,i,n.firstChild,e,r,o,!1)}function DD(n,e,t,i,r,o){let s=t[di],c=s[ui].projection[i.projection];if(Array.isArray(c))for(let l=0;l<c.length;l++){let u=c[l];Bs(e,n,t[Br],r,u,i,o,t)}else{let l=c,u=s[sn];hb(i)&&(l.flags|=128),$g(n,e,l,u,r,o,!0)}}function ID(n,e,t,i,r,o,s){let a=i[zr],c=fi(i);a!==c&&Bs(e,n,t,o,a,r,s);for(let l=Rn;l<i.length;l++){let u=i[l];Md(u[Be],u,n,e,o,a)}}function AD(n,e,t,i,r){if(e)r?n.addClass(t,i):n.removeClass(t,i);else{let o=i.indexOf("-")===-1?void 0:Ai.DashCase;r==null?n.removeStyle(t,i,o):(typeof r=="string"&&r.endsWith("!important")&&(r=r.slice(0,-10),o|=Ai.Important),n.setStyle(t,i,r,o))}}function Lb(n,e,t,i,r){let o=fr(),s=i&2;try{Gr(-1),s&&e.length>An&&Ib(n,e,An,!1);let a=s?ft.TemplateUpdateStart:ft.TemplateCreateStart;Tt(a,r,t),t(i,r)}finally{Gr(o);let a=s?ft.TemplateUpdateEnd:ft.TemplateCreateEnd;Tt(a,r,t)}}function Sd(n,e,t){UD(n,e,t),(t.flags&64)===64&&BD(n,e,t)}function Ed(n,e,t=wi){let i=e.localNames;if(i!==null){let r=e.index+1;for(let o=0;o<i.length;o+=2){let s=i[o+1],a=s===-1?t(e,n):n[s];n[r++]=a}}}function RD(n,e,t,i){let o=i.get(_b,yb)||t===Ii.ShadowDom||t===Ii.ExperimentalIsolatedShadowDom,s=n.selectRootElement(e,o);return ND(s),s}function ND(n){PD(n)}var PD=()=>null;function OD(n){return n==="class"?"className":n==="for"?"htmlFor":n==="formaction"?"formAction":n==="innerHtml"?"innerHTML":n==="readonly"?"readOnly":n==="tabindex"?"tabIndex":n}function LD(n,e,t,i,r,o){let s=e[Be];if(Zg(n,s,e,t,i)){dr(n)&&kD(e,n.index);return}n.type&3&&(t=OD(t)),FD(n,e,t,i,r,o)}function FD(n,e,t,i,r,o){if(n.type&3){let s=wi(n,e);i=o!=null?o(i,n.value||"",t):i,r.setProperty(s,t,i)}else n.type&12}function kD(n,e){let t=hi(e,n);t[He]&16||(t[He]|=64)}function UD(n,e,t){let i=t.directiveStart,r=t.directiveEnd;dr(t)&&dD(e,t,n.data[i+t.componentOffset]),n.firstCreatePass||sb(t,e);let o=t.initialInputs;for(let s=i;s<r;s++){let a=n.data[s],c=sd(e,n,s,t);if(Hs(c,e),o!==null&&GD(e,s-i,c,a,t,o),Go(a)){let l=hi(t.index,e);l[xn]=sd(e,n,s,t)}}}function BD(n,e,t){let i=t.directiveStart,r=t.directiveEnd,o=t.index,s=ax();try{Gr(o);for(let a=i;a<r;a++){let c=n.data[a],l=e[a];ju(a),(c.hostBindings!==null||c.hostVars!==0||c.hostAttrs!==null)&&VD(c,l)}}finally{Gr(-1),ju(s)}}function VD(n,e){n.hostBindings!==null&&n.hostBindings(1,e)}function qg(n,e){let t=n.directiveRegistry,i=null;if(t)for(let r=0;r<t.length;r++){let o=t[r];iD(e,o.selectors,!1)&&(i??=[],Go(o)?i.unshift(o):i.push(o))}return i}function HD(n,e,t,i,r,o){let s=wi(n,e);zD(e[Bt],s,o,n.value,t,i,r)}function zD(n,e,t,i,r,o,s){if(o==null)n.removeAttribute(e,r,t);else{let a=s==null?ac(o):s(o,i||"",r);n.setAttribute(e,r,a,t)}}function GD(n,e,t,i,r,o){let s=o[e];if(s!==null)for(let a=0;a<s.length;a+=2){let c=s[a],l=s[a+1];hg(i,t,c,l)}}function Xg(n,e,t,i,r){let o=An+t,s=e[Be],a=r(s,e,n,i,t);e[o]=a,Us(n,!0);let c=n.type===2;return c?(Eb(e[Bt],a,n),(K_()===0||Ls(n))&&Hs(a,e),Q_()):Hs(a,e),Xu()&&(!c||!Og(n))&&Wg(s,e,a,n),n}function Yg(n){let e=n;return jm()?nx():(e=e.parent,Us(e,!1)),e}function jD(n,e){let t=n[Br];if(!t)return;let i;try{i=t.get(Ci,null)}catch{i=null}i?.(e)}function Zg(n,e,t,i,r){let o=n.inputs?.[i],s=n.hostDirectiveInputs?.[i],a=!1;if(s)for(let c=0;c<s.length;c+=2){let l=s[c],u=s[c+1],d=e.data[l];hg(d,t[l],u,r),a=!0}if(o)for(let c of o){let l=t[c],u=e.data[c];hg(u,l,i,r),a=!0}return a}function WD(n,e){let t=hi(e,n),i=t[Be];$D(i,t);let r=t[Si];r!==null&&t[dc]===null&&(t[dc]=xb(r,t[Br])),Tt(ft.ComponentStart);try{Jg(i,t,t[xn])}finally{Tt(ft.ComponentEnd,t[xn])}}function $D(n,e){for(let t=e.length;t<n.blueprint.length;t++)e.push(n.blueprint[t])}function Jg(n,e,t){$u(e);try{let i=n.viewQuery;i!==null&&dg(1,i,t);let r=n.template;r!==null&&Lb(n,e,r,1,t),n.firstCreatePass&&(n.firstCreatePass=!1),e[ji]?.finishViewCreation(n),n.staticContentQueries&&bb(n,e),n.staticViewQueries&&dg(2,n.viewQuery,t);let o=n.components;o!==null&&qD(e,o)}catch(i){throw n.firstCreatePass&&(n.incompleteFirstPass=!0,n.firstCreatePass=!1),i}finally{e[He]&=-5,qu()}}function qD(n,e){for(let t=0;t<e.length;t++)WD(n,e[t])}function XD(n,e,t,i){let r=Ge(null);try{let o=e.tView,a=n[He]&4096?4096:16,c=Bg(n,o,t,a,null,e,null,null,i?.injector??null,i?.embeddedViewInjector??null,i?.dehydratedView??null),l=n[e.index];c[Vr]=l;let u=n[ji];return u!==null&&(c[ji]=u.createEmbeddedView(o)),Jg(o,c,t),c}finally{Ge(r)}}function Fx(n,e){return!e||e.firstChild===null||hb(n)}function Mc(n,e,t,i,r=!1){for(;t!==null;){if(t.type===128){t=r?t.projectionNext:t.next;continue}let o=e[t.index];o!==null&&i.push(fi(o)),Ei(o)&&Fb(o,i);let s=t.type;if(s&8)Mc(n,e,t.child,i);else if(s&32){let a=Hg(t,e),c;for(;c=a();)i.push(c)}else if(s&16){let a=Ob(e,t);if(Array.isArray(a))i.push(...a);else{let c=Fr(e[di]);Mc(c[Be],c,a,i,!0)}}t=r?t.projectionNext:t.next}return i}function Fb(n,e){for(let t=Rn;t<n.length;t++){let i=n[t],r=i[Be].firstChild;r!==null&&Mc(i[Be],i,r,e)}n[zr]!==n[Si]&&e.push(n[zr])}function kb(n){if(n[Uu]!==null){for(let e of n[Uu])e.impl.addSequence(e);n[Uu].length=0}}var Ub=[];function YD(n){return n[Zn]??ZD(n)}function ZD(n){let e=Ub.pop()??Object.create(KD);return e.lView=n,e}function JD(n){n.lView[Zn]!==n&&(n.lView=null,Ub.push(n))}var KD=it(ae({},So),{consumerIsAlwaysLive:!0,kind:"template",consumerMarkedDirty:n=>{ks(n.lView)},consumerOnSignalRead(){this.lView[Zn]=this}});function QD(n){let e=n[Zn]??Object.create(eI);return e.lView=n,e}var eI=it(ae({},So),{consumerIsAlwaysLive:!0,kind:"template",consumerMarkedDirty:n=>{let e=Fr(n.lView);for(;e&&!Bb(e[Be]);)e=Fr(e);e&&Fm(e)},consumerOnSignalRead(){this.lView[Zn]=this}});function Bb(n){return n.type!==2}function Vb(n){if(n[Lr]===null)return;let e=!0;for(;e;){let t=!1;for(let i of n[Lr])i.dirty&&(t=!0,i.zone===null||Zone.current===i.zone?i.run():i.zone.run(()=>i.run()));e=t&&!!(n[He]&8192)}}var tI=100;function Hb(n,e=0){let i=n[Gi].rendererFactory,r=!1;r||i.begin?.();try{nI(n,e)}finally{r||i.end?.()}}function nI(n,e){let t=Wm();try{nc(!0),gg(n,e);let i=0;for(;hc(n);){if(i===tI)throw new _e(103,!1);i++,gg(n,1)}}finally{nc(t)}}function iI(n,e,t,i){if(jo(e))return;let r=e[He],o=!1,s=!1;$u(e);let a=!0,c=null,l=null;o||(Bb(n)?(l=YD(e),c=Eo(l)):Yl()===null?(a=!1,l=QD(e),c=Eo(l)):e[Zn]&&(wo(e[Zn]),e[Zn]=null));try{Lm(e),rx(n.bindingStartIndex),t!==null&&Lb(n,e,t,2,i);let u=(r&3)===3;if(!o)if(u){let h=n.preOrderCheckHooks;h!==null&&Ku(e,h,null)}else{let h=n.preOrderHooks;h!==null&&Qu(e,h,0,null),ng(e,0)}if(s||rI(e),Vb(e),zb(e,0),n.contentQueries!==null&&bb(n,e),!o)if(u){let h=n.contentCheckHooks;h!==null&&Ku(e,h)}else{let h=n.contentHooks;h!==null&&Qu(e,h,1),ng(e,1)}sI(n,e);let d=n.components;d!==null&&jb(e,d,0);let f=n.viewQuery;if(f!==null&&dg(2,f,i),!o)if(u){let h=n.viewCheckHooks;h!==null&&Ku(e,h)}else{let h=n.viewHooks;h!==null&&Qu(e,h,2),ng(e,2)}if(n.firstUpdatePass===!0&&(n.firstUpdatePass=!1),e[ku]){for(let h of e[ku])h();e[ku]=null}o||(kb(e),e[He]&=-73)}catch(u){throw o||ks(e),u}finally{l!==null&&(xs(l,c),a&&JD(l)),qu()}}function zb(n,e){for(let t=mb(n);t!==null;t=gb(t))for(let i=Rn;i<t.length;i++){let r=t[i];Gb(r,e)}}function rI(n){for(let e=mb(n);e!==null;e=gb(e)){if(!(e[He]&2))continue;let t=e[zo];for(let i=0;i<t.length;i++){let r=t[i];Fm(r)}}}function oI(n,e,t){Tt(ft.ComponentStart);let i=hi(e,n);try{Gb(i,t)}finally{Tt(ft.ComponentEnd,i[xn])}}function Gb(n,e){Bu(n)&&gg(n,e)}function gg(n,e){let i=n[Be],r=n[He],o=n[Zn],s=!!(e===0&&r&16);if(s||=!!(r&64&&e===0),s||=!!(r&1024),s||=!!(o?.dirty&&Xa(o)),s||=!1,o&&(o.dirty=!1),n[He]&=-9217,s)iI(i,n,i.template,n[xn]);else if(r&8192){let a=Ge(null);try{Vb(n),zb(n,1);let c=i.components;c!==null&&jb(n,c,1),kb(n)}finally{Ge(a)}}}function jb(n,e,t){for(let i=0;i<e.length;i++)oI(n,e[i],t)}function sI(n,e){let t=n.hostBindingOpCodes;if(t!==null)try{for(let i=0;i<t.length;i++){let r=t[i];if(r<0)Gr(~r);else{let o=r,s=t[++i],a=t[++i];sx(s,o);let c=e[o];Tt(ft.HostBindingsUpdateStart,c);try{a(2,c)}finally{Tt(ft.HostBindingsUpdateEnd,c)}}}}finally{Gr(-1)}}function Kg(n,e){let t=Wm()?64:1088;for(n[Gi].changeDetectionScheduler?.notify(e);n;){n[He]|=t;let i=Fr(n);if(Fs(n)&&!i)return n;n=i}return null}function Wb(n,e,t,i){return[n,!0,0,e,null,i,null,t,null,null]}function aI(n,e,t,i=!0){let r=e[Be];if(cI(r,e,n,t),i){let s=mg(t,n),a=e[Bt],c=a.parentNode(n[zr]);c!==null&&yD(r,n[ui],a,e,c,s)}let o=e[dc];o!==null&&o.firstChild!==null&&(o.firstChild=null)}function vg(n,e){if(n.length<=Rn)return;let t=Rn+e,i=n[t];if(i){let r=i[Vr];r!==null&&r!==n&&jg(r,i),e>0&&(n[t-1][li]=i[li]);let o=cc(n,Rn+e);vD(i[Be],i);let s=o[ji];s!==null&&s.detachView(o[Be]),i[sn]=null,i[li]=null,i[He]&=-129}return i}function cI(n,e,t,i){let r=Rn+i,o=t.length;i>0&&(t[r-1][li]=e),i<o-Rn?(e[li]=t[r],Em(t,Rn+i,e)):(t.push(e),e[li]=null),e[sn]=t;let s=e[Vr];s!==null&&t!==s&&$b(s,e);let a=e[ji];a!==null&&a.insertView(n),Vu(e),e[He]|=128}function $b(n,e){let t=n[zo],i=e[sn];if(ur(i))n[He]|=2;else{let r=i[sn][di];e[di]!==r&&(n[He]|=2)}t===null?n[zo]=[e]:t.push(e)}var Wr=class{_lView;_cdRefInjectingView;_appRef=null;_attachedToViewContainer=!1;exhaustive;get rootNodes(){let e=this._lView,t=e[Be];return Mc(t,e,t.firstChild,[])}constructor(e,t){this._lView=e,this._cdRefInjectingView=t}get context(){return this._lView[xn]}set context(e){this._lView[xn]=e}get destroyed(){return jo(this._lView)}destroy(){if(this._appRef)this._appRef.detachView(this);else if(this._attachedToViewContainer){let e=this._lView[sn];if(Ei(e)){let t=e[fc],i=t?t.indexOf(this):-1;i>-1&&(vg(e,i),cc(t,i))}this._attachedToViewContainer=!1}Pb(this._lView[Be],this._lView)}onDestroy(e){km(this._lView,e)}markForCheck(){Kg(this._cdRefInjectingView||this._lView,4)}detach(){this._lView[He]&=-129}reattach(){Vu(this._lView),this._lView[He]|=128}detectChanges(){this._lView[He]|=1024,Hb(this._lView)}checkNoChanges(){}attachToViewContainerRef(){if(this._appRef)throw new _e(902,!1);this._attachedToViewContainer=!0}detachFromAppRef(){this._appRef=null;let e=Fs(this._lView),t=this._lView[Vr];t!==null&&!e&&jg(t,this._lView),Nb(this._lView[Be],this._lView)}attachToAppRef(e){if(this._attachedToViewContainer)throw new _e(902,!1);this._appRef=e;let t=Fs(this._lView),i=this._lView[Vr];i!==null&&!t&&$b(i,this._lView),Vu(this._lView)}};var $r=(()=>{class n{_declarationLView;_declarationTContainer;elementRef;static __NG_ELEMENT_ID__=lI;constructor(t,i,r){this._declarationLView=t,this._declarationTContainer=i,this.elementRef=r}get ssrId(){return this._declarationTContainer.tView?.ssrId||null}createEmbeddedView(t,i){return this.createEmbeddedViewImpl(t,i)}createEmbeddedViewImpl(t,i,r){let o=XD(this._declarationLView,this._declarationTContainer,t,{embeddedViewInjector:i,dehydratedView:r});return new Wr(o)}}return n})();function lI(){return Qg(On(),dt())}function Qg(n,e){return n.type&4?new $r(e,n,Ws(n,e)):null}function wd(n,e,t,i,r){let o=n.data[e];if(o===null)o=uI(n,e,t,i,r),ox()&&(o.flags|=32);else if(o.type&64){o.type=t,o.value=i,o.attrs=r;let s=tx();o.injectorIndex=s===null?-1:s.injectorIndex}return Us(o,!0),o}function uI(n,e,t,i,r){let o=Gm(),s=jm(),a=s?o:o&&o.parent,c=n.data[e]=fI(n,a,t,e,i,r);return dI(n,c,o,s),c}function dI(n,e,t,i){n.firstChild===null&&(n.firstChild=e),t!==null&&(i?t.child==null&&e.parent!==null&&(t.child=e):t.next===null&&(t.next=e,e.prev=t))}function fI(n,e,t,i,r,o){let s=e?e.injectorIndex:-1,a=0;return ex()&&(a|=128),{type:t,index:i,insertBeforeIndex:null,injectorIndex:s,directiveStart:-1,directiveEnd:-1,directiveStylingLast:-1,componentOffset:-1,controlDirectiveIndex:-1,customControlIndex:-1,propertyBindings:null,flags:a,providerIndexes:0,value:r,attrs:o,mergedAttrs:null,localNames:null,initialInputs:null,inputs:null,hostDirectiveInputs:null,outputs:null,hostDirectiveOutputs:null,directiveToIndex:null,tView:null,next:null,prev:null,projectionNext:null,child:null,parent:e,projection:null,styles:null,stylesWithoutHost:null,residualStyles:void 0,classes:null,classesWithoutHost:null,residualClasses:void 0,classBindings:0,styleBindings:0}}var hI=()=>null;function kx(n,e){return hI(n,e)}var qb=class{},Cd=class{},yg=class{resolveComponentFactory(e){throw new _e(917,!1)}},Dc=class{static NULL=new yg},qo=class{},Td=(()=>{class n{destroyNode=null;static __NG_ELEMENT_ID__=()=>pI()}return n})();function pI(){let n=dt(),e=On(),t=hi(e.index,n);return(ur(t)?t:n)[Bt]}var Xb=(()=>{class n{static \u0275prov=Ae({token:n,providedIn:"root",factory:()=>null})}return n})();var td={},_g=class{injector;parentInjector;constructor(e,t){this.injector=e,this.parentInjector=t}get(e,t,i){let r=this.injector.get(e,td,i);return r!==td||t===td?r:this.parentInjector.get(e,t,i)}};function ld(n,e,t){let i=t?n.styles:null,r=t?n.classes:null,o=0;if(e!==null)for(let s=0;s<e.length;s++){let a=e[s];if(typeof a=="number")o=a;else if(o==1)r=Iu(r,a);else if(o==2){let c=a,l=e[++s];i=Iu(i,c+": "+l+";")}}t?n.styles=i:n.stylesWithoutHost=i,t?n.classes=r:n.classesWithoutHost=r}function Qt(n,e=0){let t=dt();if(t===null)return Le(n,e);let i=On();return ub(i,t,Vn(n),e)}function Yb(n,e,t,i,r){let o=i===null?null:{"":-1},s=r(n,t);if(s!==null){let a=s,c=null,l=null;for(let u of s)if(u.resolveHostDirectives!==null){[a,c,l]=u.resolveHostDirectives(s);break}vI(n,e,t,a,o,c,l)}o!==null&&i!==null&&mI(t,i,o)}function mI(n,e,t){let i=n.localNames=[];for(let r=0;r<e.length;r+=2){let o=t[e[r+1]];if(o==null)throw new _e(-301,!1);i.push(e[r],o)}}function gI(n,e,t){e.componentOffset=t,(n.components??=[]).push(e.index)}function vI(n,e,t,i,r,o,s){let a=i.length,c=null;for(let f=0;f<a;f++){let h=i[f];c===null&&Go(h)&&(c=h,gI(n,t,f)),CT(sb(t,e),n,h.type)}SI(t,n.data.length,a),c?.viewProvidersResolver&&c.viewProvidersResolver(c);for(let f=0;f<a;f++){let h=i[f];h.providersResolver&&h.providersResolver(h)}let l=!1,u=!1,d=Db(n,e,a,null);a>0&&(t.directiveToIndex=new Map);for(let f=0;f<a;f++){let h=i[f];if(t.mergedAttrs=vd(t.mergedAttrs,h.hostAttrs),_I(n,t,e,d,h),MI(d,h,r),s!==null&&s.has(h)){let[_,m]=s.get(h);t.directiveToIndex.set(h.type,[d,_+t.directiveStart,m+t.directiveStart])}else(o===null||!o.has(h))&&t.directiveToIndex.set(h.type,d);h.contentQueries!==null&&(t.flags|=4),(h.hostBindings!==null||h.hostAttrs!==null||h.hostVars!==0)&&(t.flags|=64);let g=h.type.prototype;!l&&(g.ngOnChanges||g.ngOnInit||g.ngDoCheck)&&((n.preOrderHooks??=[]).push(t.index),l=!0),!u&&(g.ngOnChanges||g.ngDoCheck)&&((n.preOrderCheckHooks??=[]).push(t.index),u=!0),d++}yI(n,t,o)}function yI(n,e,t){for(let i=e.directiveStart;i<e.directiveEnd;i++){let r=n.data[i];if(t===null||!t.has(r))Ux(0,e,r,i),Ux(1,e,r,i),Vx(e,i,!1);else{let o=t.get(r);Bx(0,e,o,i),Bx(1,e,o,i),Vx(e,i,!0)}}}function Ux(n,e,t,i){let r=n===0?t.inputs:t.outputs;for(let o in r)if(r.hasOwnProperty(o)){let s;n===0?s=e.inputs??={}:s=e.outputs??={},s[o]??=[],s[o].push(i),Zb(e,o)}}function Bx(n,e,t,i){let r=n===0?t.inputs:t.outputs;for(let o in r)if(r.hasOwnProperty(o)){let s=r[o],a;n===0?a=e.hostDirectiveInputs??={}:a=e.hostDirectiveOutputs??={},a[s]??=[],a[s].push(i,o),Zb(e,s)}}function Zb(n,e){e==="class"?n.flags|=8:e==="style"&&(n.flags|=16)}function Vx(n,e,t){let{attrs:i,inputs:r,hostDirectiveInputs:o}=n;if(i===null||!t&&r===null||t&&o===null||kg(n)){n.initialInputs??=[],n.initialInputs.push(null);return}let s=null,a=0;for(;a<i.length;){let c=i[a];if(c===0){a+=4;continue}else if(c===5){a+=2;continue}else if(typeof c=="number")break;if(!t&&r.hasOwnProperty(c)){let l=r[c];for(let u of l)if(u===e){s??=[],s.push(c,i[a+1]);break}}else if(t&&o.hasOwnProperty(c)){let l=o[c];for(let u=0;u<l.length;u+=2)if(l[u]===e){s??=[],s.push(l[u+1],i[a+1]);break}}a+=2}n.initialInputs??=[],n.initialInputs.push(s)}function _I(n,e,t,i,r){n.data[i]=r;let o=r.factory||(r.factory=Po(r.type,!0)),s=new bc(o,Go(r),Qt,null);n.blueprint[i]=s,t[i]=s,xI(n,e,i,Db(n,t,r.hostVars,pi),r)}function xI(n,e,t,i,r){let o=r.hostBindings;if(o){let s=n.hostBindingOpCodes;s===null&&(s=n.hostBindingOpCodes=[]);let a=~e.index;bI(s)!=a&&s.push(a),s.push(t,i,o)}}function bI(n){let e=n.length;for(;e>0;){let t=n[--e];if(typeof t=="number"&&t<0)return t}return 0}function MI(n,e,t){if(t){if(e.exportAs)for(let i=0;i<e.exportAs.length;i++)t[e.exportAs[i]]=n;Go(e)&&(t[""]=n)}}function SI(n,e,t){n.flags|=1,n.directiveStart=e,n.directiveEnd=e+t,n.providerIndexes=e}function ev(n,e,t,i,r,o,s,a){let c=e[Be],l=c.consts,u=Wo(l,s),d=wd(c,n,t,i,u);return o&&Yb(c,e,d,Wo(l,a),r),d.mergedAttrs=vd(d.mergedAttrs,d.attrs),d.attrs!==null&&ld(d,d.attrs,!1),d.mergedAttrs!==null&&ld(d,d.mergedAttrs,!0),c.queries!==null&&c.queries.elementStart(c,d),d}function tv(n,e){tb(n,e),Rm(e)&&n.queries.elementEnd(e)}function EI(n,e,t,i,r,o){let s=e.consts,a=Wo(s,r),c=wd(e,n,t,i,a);if(c.mergedAttrs=vd(c.mergedAttrs,c.attrs),o!=null){let l=Wo(s,o);c.localNames=[];for(let u=0;u<l.length;u+=2)c.localNames.push(l[u],-1)}return c.attrs!==null&&ld(c,c.attrs,!1),c.mergedAttrs!==null&&ld(c,c.mergedAttrs,!0),e.queries!==null&&e.queries.elementStart(e,c),c}function nv(n){return Dd(n)?Array.isArray(n)||!(n instanceof Map)&&Symbol.iterator in n:!1}function Jb(n,e){if(Array.isArray(n))for(let t=0;t<n.length;t++)e(n[t]);else{let t=n[Symbol.iterator](),i;for(;!(i=t.next()).done;)e(i.value)}}function Dd(n){return n!==null&&(typeof n=="function"||typeof n=="object")}function Xo(n,e,t){if(t===pi)return!1;let i=n[e];return Object.is(i,t)?!1:(n[e]=t,!0)}function wI(n,e,t,i){let r=Xo(n,e,t);return Xo(n,e+1,i)||r}function nd(n,e,t){return function i(r){let o=dr(n)?hi(n.index,e):e;Kg(o,5);let s=e[xn],a=Hx(e,s,t,r),c=i.__ngNextListenerFn__;for(;c;)a=Hx(e,s,c,r)&&a,c=c.__ngNextListenerFn__;return a}}function Hx(n,e,t,i){let r=Ge(null);try{return Tt(ft.OutputStart,e,t),t(i)!==!1}catch(o){return jD(n,o),!1}finally{Tt(ft.OutputEnd,e,t),Ge(r)}}function Kb(n,e,t,i,r,o,s,a){let c=Ls(n),l=!1,u=null;if(!i&&c&&(u=TI(e,t,o,n.index)),u!==null){let d=u.__ngLastListenerFn__||u;d.__ngNextListenerFn__=s,u.__ngLastListenerFn__=s,l=!0}else{let d=wi(n,t),f=i?i(d):d;VT(t,f,o,a);let h=r.listen(f,o,a);if(!CI(o)){let g=i?_=>i(fi(_[n.index])):n.index;Qb(g,e,t,o,a,h,!1)}}return l}function CI(n){return n.startsWith("animation")||n.startsWith("transition")}function TI(n,e,t,i){let r=n.cleanup;if(r!=null)for(let o=0;o<r.length-1;o+=2){let s=r[o];if(s===t&&r[o+1]===i){let a=e[Ns],c=r[o+2];return a&&a.length>c?a[c]:null}typeof s=="string"&&(o+=2)}return null}function Qb(n,e,t,i,r,o,s){let a=e.firstCreatePass?Bm(e):null,c=Um(t),l=c.length;c.push(r,o),a&&a.push(i,n,l,(l+1)*(s?-1:1))}function zx(n,e,t,i,r,o){let s=e[t],a=e[Be],l=a.data[t].outputs[i],d=s[l].subscribe(o);Qb(n.index,a,e,r,o,d,!0)}var xg=Symbol("BINDING");function eM(n){return n.debugInfo?.className||n.type.name||null}var ud=class extends Dc{ngModule;constructor(e){super(),this.ngModule=e}resolveComponentFactory(e){let t=Ur(e);return new Gs(t,this.ngModule)}};function DI(n){return Object.keys(n).map(e=>{let[t,i,r]=n[e],o={propName:t,templateName:e,isSignal:(i&bd.SignalBased)!==0};return r&&(o.transform=r),o})}function II(n){return Object.keys(n).map(e=>({propName:n[e],templateName:e}))}function AI(n,e,t){let i=e instanceof Jt?e:e?.injector;return i&&n.getStandaloneInjector!==null&&(i=n.getStandaloneInjector(i)||i),i?new _g(t,i):t}function RI(n){let e=n.get(qo,null);if(e===null)throw new _e(407,!1);let t=n.get(Xb,null),i=n.get(Lo,null),r=n.get($s,null,{optional:!0});return{rendererFactory:e,sanitizer:t,changeDetectionScheduler:i,ngReflect:!1,tracingService:r}}function NI(n,e){let t=tM(n);return Mb(e,t,t==="svg"?Nm:t==="math"?$_:null)}function tM(n){return(n.selectors[0][0]||"div").toLowerCase()}var Gs=class extends Cd{componentDef;ngModule;selector;componentType;ngContentSelectors;isBoundToModule;cachedInputs=null;cachedOutputs=null;get inputs(){return this.cachedInputs??=DI(this.componentDef.inputs),this.cachedInputs}get outputs(){return this.cachedOutputs??=II(this.componentDef.outputs),this.cachedOutputs}constructor(e,t){super(),this.componentDef=e,this.ngModule=t,this.componentType=e.type,this.selector=aD(e.selectors),this.ngContentSelectors=e.ngContentSelectors??[],this.isBoundToModule=!!t}create(e,t,i,r,o,s){Tt(ft.DynamicComponentStart);let a=Ge(null);try{let c=this.componentDef,l=AI(c,r||this.ngModule,e),u=RI(l),d=u.tracingService;return d&&d.componentCreate?d.componentCreate(eM(c),()=>this.createComponentRef(u,l,t,i,o,s)):this.createComponentRef(u,l,t,i,o,s)}finally{Ge(a)}}createComponentRef(e,t,i,r,o,s){let a=this.componentDef,c=PI(r,a,s,o),l=e.rendererFactory.createRenderer(null,a),u=r?RD(l,r,a.encapsulation,t):NI(a,l),d=s?.some(Gx)||o?.some(g=>typeof g!="function"&&g.bindings.some(Gx)),f=Bg(null,c,null,512|Tb(a),null,null,e,l,t,null,xb(u,t,!0));f[An]=u,$u(f);let h=null;try{let g=ev(An,f,2,"#host",()=>c.directiveRegistry,!0,0);Eb(l,u,g),Hs(u,f),Sd(c,f,g),Lg(c,g,f),tv(c,g),i!==void 0&&LI(g,this.ngContentSelectors,i),h=hi(g.index,f),f[xn]=h[xn],Jg(c,f,null)}catch(g){throw h!==null&&ug(h),ug(f),g}finally{Tt(ft.DynamicComponentEnd),qu()}return new dd(this.componentType,f,!!d)}};function PI(n,e,t,i){let r=n?["ng-version","21.2.8"]:cD(e.selectors[0]),o=null,s=null,a=0;if(t)for(let u of t)a+=u[xg].requiredVars,u.create&&(u.targetIdx=0,(o??=[]).push(u)),u.update&&(u.targetIdx=0,(s??=[]).push(u));if(i)for(let u=0;u<i.length;u++){let d=i[u];if(typeof d!="function")for(let f of d.bindings){a+=f[xg].requiredVars;let h=u+1;f.create&&(f.targetIdx=h,(o??=[]).push(f)),f.update&&(f.targetIdx=h,(s??=[]).push(f))}}let c=[e];if(i)for(let u of i){let d=typeof u=="function"?u:u.type,f=bm(d);c.push(f)}return Ug(0,null,OI(o,s),1,a,c,null,null,null,[r],null)}function OI(n,e){return!n&&!e?null:t=>{if(t&1&&n)for(let i of n)i.create();if(t&2&&e)for(let i of e)i.update()}}function Gx(n){let e=n[xg].kind;return e==="input"||e==="twoWay"}var dd=class extends qb{_rootLView;_hasInputBindings;instance;hostView;changeDetectorRef;componentType;location;previousInputValues=null;_tNode;constructor(e,t,i){super(),this._rootLView=t,this._hasInputBindings=i,this._tNode=Om(t[Be],An),this.location=Ws(this._tNode,t),this.instance=hi(this._tNode.index,t)[xn],this.hostView=this.changeDetectorRef=new Wr(t,void 0),this.componentType=e}setInput(e,t){this._hasInputBindings;let i=this._tNode;if(this.previousInputValues??=new Map,this.previousInputValues.has(e)&&Object.is(this.previousInputValues.get(e),t))return;let r=this._rootLView,o=Zg(i,r[Be],r,e,t);this.previousInputValues.set(e,t);let s=hi(i.index,r);Kg(s,1)}get injector(){return new $o(this._tNode,this._rootLView)}destroy(){this.hostView.destroy()}onDestroy(e){this.hostView.onDestroy(e)}};function LI(n,e,t){let i=n.projection=[];for(let r=0;r<e.length;r++){let o=t[r];i.push(o!=null&&o.length?Array.from(o):null)}}var pr=(()=>{class n{static __NG_ELEMENT_ID__=FI}return n})();function FI(){let n=On();return nM(n,dt())}var bg=class n extends pr{_lContainer;_hostTNode;_hostLView;constructor(e,t,i){super(),this._lContainer=e,this._hostTNode=t,this._hostLView=i}get element(){return Ws(this._hostTNode,this._hostLView)}get injector(){return new $o(this._hostTNode,this._hostLView)}get parentInjector(){let e=Rg(this._hostTNode,this._hostLView);if(ib(e)){let t=od(e,this._hostLView),i=rd(e),r=t[Be].data[i+8];return new $o(r,t)}else return new $o(null,this._hostLView)}clear(){for(;this.length>0;)this.remove(this.length-1)}get(e){let t=jx(this._lContainer);return t!==null&&t[e]||null}get length(){return this._lContainer.length-Rn}createEmbeddedView(e,t,i){let r,o;typeof i=="number"?r=i:i!=null&&(r=i.index,o=i.injector);let s=kx(this._lContainer,e.ssrId),a=e.createEmbeddedViewImpl(t||{},o,s);return this.insertImpl(a,r,Fx(this._hostTNode,s)),a}createComponent(e,t,i,r,o,s,a){let c=e&&!dT(e),l;if(c)l=t;else{let m=t||{};l=m.index,i=m.injector,r=m.projectableNodes,o=m.environmentInjector||m.ngModuleRef,s=m.directives,a=m.bindings}let u=c?e:new Gs(Ur(e)),d=i||this.parentInjector;if(!o&&u.ngModule==null){let p=(c?d:this.parentInjector).get(Jt,null);p&&(o=p)}let f=Ur(u.componentType??{}),h=kx(this._lContainer,f?.id??null),g=h?.firstChild??null,_=u.create(d,r,g,o,s,a);return this.insertImpl(_.hostView,l,Fx(this._hostTNode,h)),_}insert(e,t){return this.insertImpl(e,t,!0)}insertImpl(e,t,i){let r=e._lView;if(X_(r)){let a=this.indexOf(e);if(a!==-1)this.detach(a);else{let c=r[sn],l=new n(c,c[ui],c[sn]);l.detach(l.indexOf(e))}}let o=this._adjustIndex(t),s=this._lContainer;return aI(s,r,o,i),e.attachToViewContainerRef(),Em(og(s),o,e),e}move(e,t){return this.insert(e,t)}indexOf(e){let t=jx(this._lContainer);return t!==null?t.indexOf(e):-1}remove(e){let t=this._adjustIndex(e,-1),i=vg(this._lContainer,t);i&&(cc(og(this._lContainer),t),Pb(i[Be],i))}detach(e){let t=this._adjustIndex(e,-1),i=vg(this._lContainer,t);return i&&cc(og(this._lContainer),t)!=null?new Wr(i):null}_adjustIndex(e,t=0){return e??this.length+t}};function jx(n){return n[fc]}function og(n){return n[fc]||(n[fc]=[])}function nM(n,e){let t,i=e[n.index];return Ei(i)?t=i:(t=Wb(i,e,null,n),e[n.index]=t,Vg(e,t)),UI(t,e,n,i),new bg(t,n,e)}function kI(n,e){let t=n[Bt],i=t.createComment(""),r=wi(e,n),o=t.parentNode(r);return cd(t,o,i,t.nextSibling(r),!1),i}var UI=HI,BI=()=>!1;function VI(n,e,t){return BI(n,e,t)}function HI(n,e,t,i){if(n[zr])return;let r;t.type&8?r=fi(i):r=kI(e,t),n[zr]=r}var Mg=class n{queryList;matches=null;constructor(e){this.queryList=e}clone(){return new n(this.queryList)}setDirty(){this.queryList.setDirty()}},Sg=class n{queries;constructor(e=[]){this.queries=e}createEmbeddedView(e){let t=e.queries;if(t!==null){let i=e.contentQueries!==null?e.contentQueries[0]:t.length,r=[];for(let o=0;o<i;o++){let s=t.getByIndex(o),a=this.queries[s.indexInDeclarationView];r.push(a.clone())}return new n(r)}return null}insertView(e){this.dirtyQueriesWithMatches(e)}detachView(e){this.dirtyQueriesWithMatches(e)}finishViewCreation(e){this.dirtyQueriesWithMatches(e)}dirtyQueriesWithMatches(e){for(let t=0;t<this.queries.length;t++)iv(e,t).matches!==null&&this.queries[t].setDirty()}},Eg=class{flags;read;predicate;constructor(e,t,i=null){this.flags=t,this.read=i,typeof e=="string"?this.predicate=YI(e):this.predicate=e}},wg=class n{queries;constructor(e=[]){this.queries=e}elementStart(e,t){for(let i=0;i<this.queries.length;i++)this.queries[i].elementStart(e,t)}elementEnd(e){for(let t=0;t<this.queries.length;t++)this.queries[t].elementEnd(e)}embeddedTView(e){let t=null;for(let i=0;i<this.length;i++){let r=t!==null?t.length:0,o=this.getByIndex(i).embeddedTView(e,r);o&&(o.indexInDeclarationView=i,t!==null?t.push(o):t=[o])}return t!==null?new n(t):null}template(e,t){for(let i=0;i<this.queries.length;i++)this.queries[i].template(e,t)}getByIndex(e){return this.queries[e]}get length(){return this.queries.length}track(e){this.queries.push(e)}},Cg=class n{metadata;matches=null;indexInDeclarationView=-1;crossesNgTemplate=!1;_declarationNodeIndex;_appliesToNextNode=!0;constructor(e,t=-1){this.metadata=e,this._declarationNodeIndex=t}elementStart(e,t){this.isApplyingToNode(t)&&this.matchTNode(e,t)}elementEnd(e){this._declarationNodeIndex===e.index&&(this._appliesToNextNode=!1)}template(e,t){this.elementStart(e,t)}embeddedTView(e,t){return this.isApplyingToNode(e)?(this.crossesNgTemplate=!0,this.addMatch(-e.index,t),new n(this.metadata)):null}isApplyingToNode(e){if(this._appliesToNextNode&&(this.metadata.flags&1)!==1){let t=this._declarationNodeIndex,i=e.parent;for(;i!==null&&i.type&8&&i.index!==t;)i=i.parent;return t===(i!==null?i.index:-1)}return this._appliesToNextNode}matchTNode(e,t){let i=this.metadata.predicate;if(Array.isArray(i))for(let r=0;r<i.length;r++){let o=i[r];this.matchTNodeWithReadOption(e,t,zI(t,o)),this.matchTNodeWithReadOption(e,t,ed(t,e,o,!1,!1))}else i===$r?t.type&4&&this.matchTNodeWithReadOption(e,t,-1):this.matchTNodeWithReadOption(e,t,ed(t,e,i,!1,!1))}matchTNodeWithReadOption(e,t,i){if(i!==null){let r=this.metadata.read;if(r!==null)if(r===qr||r===pr||r===$r&&t.type&4)this.addMatch(t.index,-2);else{let o=ed(t,e,r,!1,!1);o!==null&&this.addMatch(t.index,o)}else this.addMatch(t.index,i)}}addMatch(e,t){this.matches===null?this.matches=[e,t]:this.matches.push(e,t)}};function zI(n,e){let t=n.localNames;if(t!==null){for(let i=0;i<t.length;i+=2)if(t[i]===e)return t[i+1]}return null}function GI(n,e){return n.type&11?Ws(n,e):n.type&4?Qg(n,e):null}function jI(n,e,t,i){return t===-1?GI(e,n):t===-2?WI(n,e,i):sd(n,n[Be],t,e)}function WI(n,e,t){if(t===qr)return Ws(e,n);if(t===$r)return Qg(e,n);if(t===pr)return nM(e,n)}function iM(n,e,t,i){let r=e[ji].queries[i];if(r.matches===null){let o=n.data,s=t.matches,a=[];for(let c=0;s!==null&&c<s.length;c+=2){let l=s[c];if(l<0)a.push(null);else{let u=o[l];a.push(jI(e,u,s[c+1],t.metadata.read))}}r.matches=a}return r.matches}function Tg(n,e,t,i){let r=n.queries.getByIndex(t),o=r.matches;if(o!==null){let s=iM(n,e,r,t);for(let a=0;a<o.length;a+=2){let c=o[a];if(c>0)i.push(s[a/2]);else{let l=o[a+1],u=e[-c];for(let d=Rn;d<u.length;d++){let f=u[d];f[Vr]===f[sn]&&Tg(f[Be],f,l,i)}if(u[zo]!==null){let d=u[zo];for(let f=0;f<d.length;f++){let h=d[f];Tg(h[Be],h,l,i)}}}}}return i}function $I(n,e){return n[ji].queries[e].queryList}function qI(n,e,t){let i=new ad((t&4)===4);return J_(n,e,i,i.destroy),(e[ji]??=new Sg).queries.push(new Mg(i))-1}function XI(n,e,t){let i=Gn();return i.firstCreatePass&&(ZI(i,new Eg(n,e,t),-1),(e&2)===2&&(i.staticViewQueries=!0)),qI(i,dt(),e)}function YI(n){return n.split(",").map(e=>e.trim())}function ZI(n,e,t){n.queries===null&&(n.queries=new wg),n.queries.track(new Cg(e,t))}function iv(n,e){return n.queries.getByIndex(e)}function JI(n,e){let t=n[Be],i=iv(t,e);return i.crossesNgTemplate?Tg(t,n,e,[]):iM(t,n,i,e)}var Yo=class{},Id=class{};var fd=class extends Yo{ngModuleType;_parent;_bootstrapComponents=[];_r3Injector;instance;destroyCbs=[];componentFactoryResolver=new ud(this);constructor(e,t,i,r=!0){super(),this.ngModuleType=e,this._parent=t;let o=xm(e);this._bootstrapComponents=wb(o.bootstrap),this._r3Injector=Zm(e,t,[{provide:Yo,useValue:this},{provide:Dc,useValue:this.componentFactoryResolver},...i],oc(e),new Set(["environment"])),r&&this.resolveInjectorInitializers()}resolveInjectorInitializers(){this._r3Injector.resolveInjectorInitializers(),this.instance=this._r3Injector.get(this.ngModuleType)}get injector(){return this._r3Injector}destroy(){let e=this._r3Injector;!e.destroyed&&e.destroy(),this.destroyCbs.forEach(t=>t()),this.destroyCbs=null}onDestroy(e){this.destroyCbs.push(e)}},hd=class extends Id{moduleType;constructor(e){super(),this.moduleType=e}create(e){return new fd(this.moduleType,e,[])}};var Sc=class extends Yo{injector;componentFactoryResolver=new ud(this);instance=null;constructor(e){super();let t=new Oo([...e.providers,{provide:Yo,useValue:this},{provide:Dc,useValue:this.componentFactoryResolver}],e.parent||uc(),e.debugName,new Set(["environment"]));this.injector=t,e.runEnvironmentInitializers&&t.resolveInjectorInitializers()}destroy(){this.injector.destroy()}onDestroy(e){this.injector.onDestroy(e)}};function Ic(n,e,t=null){return new Sc({providers:n,parent:e,debugName:t,runEnvironmentInitializers:!0}).injector}var KI=(()=>{class n{_injector;cachedInjectors=new Map;constructor(t){this._injector=t}getOrCreateStandaloneInjector(t){if(!t.standalone)return null;if(!this.cachedInjectors.has(t)){let i=Tm(!1,t.type),r=i.length>0?Ic([i],this._injector,""):null;this.cachedInjectors.set(t,r)}return this.cachedInjectors.get(t)}ngOnDestroy(){try{for(let t of this.cachedInjectors.values())t!==null&&t.destroy()}finally{this.cachedInjectors.clear()}}static \u0275prov=Ae({token:n,providedIn:"environment",factory:()=>new n(Le(Jt))})}return n})();function Ri(n){return wc(()=>{let e=rM(n),t=it(ae({},e),{decls:n.decls,vars:n.vars,template:n.template,consts:n.consts||null,ngContentSelectors:n.ngContentSelectors,onPush:n.changeDetection===Ng.OnPush,directiveDefs:null,pipeDefs:null,dependencies:e.standalone&&n.dependencies||null,getStandaloneInjector:e.standalone?r=>r.get(KI).getOrCreateStandaloneInjector(t):null,getExternalStyles:null,signals:n.signals??!1,data:n.data||{},encapsulation:n.encapsulation||Ii.Emulated,styles:n.styles||Hn,_:null,schemas:n.schemas||null,tView:null,id:""});e.standalone&&Gg("NgStandalone"),oM(t);let i=n.dependencies;return t.directiveDefs=Wx(i,QI),t.pipeDefs=Wx(i,N_),t.id=nA(t),t})}function QI(n){return Ur(n)||bm(n)}function qs(n){return wc(()=>({type:n.type,bootstrap:n.bootstrap||Hn,declarations:n.declarations||Hn,imports:n.imports||Hn,exports:n.exports||Hn,transitiveCompileScopes:null,schemas:n.schemas||null,id:n.id||null}))}function eA(n,e){if(n==null)return Uo;let t={};for(let i in n)if(n.hasOwnProperty(i)){let r=n[i],o,s,a,c;Array.isArray(r)?(a=r[0],o=r[1],s=r[2]??o,c=r[3]||null):(o=r,s=r,a=bd.None,c=null),t[o]=[i,a,c],e[o]=s}return t}function tA(n){if(n==null)return Uo;let e={};for(let t in n)n.hasOwnProperty(t)&&(e[n[t]]=t);return e}function Xr(n){return wc(()=>{let e=rM(n);return oM(e),e})}function rM(n){let e={};return{type:n.type,providersResolver:null,viewProvidersResolver:null,factory:null,hostBindings:n.hostBindings||null,hostVars:n.hostVars||0,hostAttrs:n.hostAttrs||null,contentQueries:n.contentQueries||null,declaredInputs:e,inputConfig:n.inputs||Uo,exportAs:n.exportAs||null,standalone:n.standalone??!0,signals:n.signals===!0,selectors:n.selectors||Hn,viewQuery:n.viewQuery||null,features:n.features||null,setInput:null,resolveHostDirectives:null,hostDirectives:null,controlDef:null,inputs:eA(n.inputs,e),outputs:tA(n.outputs),debugInfo:null}}function oM(n){n.features?.forEach(e=>e(n))}function Wx(n,e){return n?()=>{let t=typeof n=="function"?n():n,i=[];for(let r of t){let o=e(r);o!==null&&i.push(o)}return i}:null}function nA(n){let e=0,t=typeof n.consts=="function"?"":n.consts,i=[n.selectors,n.ngContentSelectors,n.hostVars,n.hostAttrs,t,n.vars,n.decls,n.encapsulation,n.standalone,n.signals,n.exportAs,JSON.stringify(n.inputs),JSON.stringify(n.outputs),Object.getOwnPropertyNames(n.type.prototype),!!n.contentQueries,!!n.viewQuery];for(let o of i.join("|"))e=Math.imul(31,e)+o.charCodeAt(0)<<0;return e+=2147483648,"c"+e}function iA(n,e,t,i,r,o,s,a){if(t.firstCreatePass){n.mergedAttrs=vd(n.mergedAttrs,n.attrs);let u=n.tView=Ug(2,n,r,o,s,t.directiveRegistry,t.pipeRegistry,null,t.schemas,t.consts,null);t.queries!==null&&(t.queries.template(t,n),u.queries=t.queries.embeddedTView(n))}a&&(n.flags|=a),Us(n,!1);let c=oA(t,e,n,i);Xu()&&Wg(t,e,c,n),Hs(c,e);let l=Wb(c,e,c,n);e[i+An]=l,Vg(e,l),VI(l,n,e)}function rA(n,e,t,i,r,o,s,a,c,l,u){let d=t+An,f;return e.firstCreatePass?(f=wd(e,d,4,s||null,a||null),Hu()&&Yb(e,n,f,Wo(e.consts,l),qg),tb(e,f)):f=e.data[d],iA(f,n,e,t,i,r,o,c),Ls(f)&&Sd(e,n,f),l!=null&&Ed(n,f,u),f}function jn(n,e,t,i,r,o,s,a){let c=dt(),l=Gn(),u=Wo(l.consts,o);return rA(c,l,n,e,t,i,r,u,void 0,s,a),jn}var oA=sA;function sA(n,e,t,i){return mc(!0),e[Bt].createComment("")}var rv=(()=>{class n{log(t){console.log(t)}warn(t){console.warn(t)}static \u0275fac=function(i){return new(i||n)};static \u0275prov=Ae({token:n,factory:n.\u0275fac,providedIn:"platform"})}return n})();var ov=new Pe("");function Xs(n){return!!n&&typeof n.then=="function"}function sv(n){return!!n&&typeof n.subscribe=="function"}var av=new Pe("");function Ad(n){return lr([{provide:av,multi:!0,useValue:n}])}var cv=(()=>{class n{resolve;reject;initialized=!1;done=!1;donePromise=new Promise((t,i)=>{this.resolve=t,this.reject=i});appInits=Q(av,{optional:!0})??[];injector=Q(zn);constructor(){}runInitializers(){if(this.initialized)return;let t=[];for(let r of this.appInits){let o=_n(this.injector,r);if(Xs(o))t.push(o);else if(sv(o)){let s=new Promise((a,c)=>{o.subscribe({complete:a,error:c})});t.push(s)}}let i=()=>{this.done=!0,this.resolve()};Promise.all(t).then(()=>{i()}).catch(r=>{this.reject(r)}),t.length===0&&i(),this.initialized=!0}static \u0275fac=function(i){return new(i||n)};static \u0275prov=Ae({token:n,factory:n.\u0275fac,providedIn:"root"})}return n})(),Rd=new Pe("");function sM(){Fp(()=>{let n="";throw new _e(600,n)})}function aM(n){return n.isBoundToModule}var aA=10;var mr=(()=>{class n{_runningTick=!1;_destroyed=!1;_destroyListeners=[];_views=[];internalErrorHandler=Q(Ci);afterRenderManager=Q(Ab);zonelessEnabled=Q(gc);rootEffectScheduler=Q(Zu);dirtyFlags=0;tracingSnapshot=null;allTestViews=new Set;autoDetectTestViews=new Set;includeAllTestViews=!1;afterTick=new $t;get allViews(){return[...(this.includeAllTestViews?this.allTestViews:this.autoDetectTestViews).keys(),...this._views]}get destroyed(){return this._destroyed}componentTypes=[];components=[];internalPendingTask=Q(jr);get isStable(){return this.internalPendingTask.hasPendingTasksObservable.pipe(Mt(t=>!t))}constructor(){Q($s,{optional:!0})}whenStable(){let t;return new Promise(i=>{t=this.isStable.subscribe({next:r=>{r&&i()}})}).finally(()=>{t.unsubscribe()})}_injector=Q(Jt);_rendererFactory=null;get injector(){return this._injector}bootstrap(t,i){return this.bootstrapImpl(t,i)}bootstrapImpl(t,i,r=zn.NULL){return this._injector.get(Ut).run(()=>{Tt(ft.BootstrapComponentStart);let s=t instanceof Cd;if(!this._injector.get(cv).done){let g="";throw new _e(405,g)}let c;s?c=t:c=this._injector.get(Dc).resolveComponentFactory(t),this.componentTypes.push(c.componentType);let l=aM(c)?void 0:this._injector.get(Yo),u=i||c.selector,d=c.create(r,[],u,l),f=d.location.nativeElement,h=d.injector.get(ov,null);return h?.registerApplication(f),d.onDestroy(()=>{this.detachView(d.hostView),xc(this.components,d),h?.unregisterApplication(f)}),this._loadComponent(d),Tt(ft.BootstrapComponentEnd,d),d})}tick(){this.zonelessEnabled||(this.dirtyFlags|=1),this._tick()}_tick(){Tt(ft.ChangeDetectionStart),this.tracingSnapshot!==null?this.tracingSnapshot.run(zg.CHANGE_DETECTION,this.tickImpl):this.tickImpl()}tickImpl=()=>{if(this._runningTick)throw Tt(ft.ChangeDetectionEnd),new _e(101,!1);let t=Ge(null);try{this._runningTick=!0,this.synchronize()}finally{this._runningTick=!1,this.tracingSnapshot?.dispose(),this.tracingSnapshot=null,Ge(t),this.afterTick.next(),Tt(ft.ChangeDetectionEnd)}};synchronize(){this._rendererFactory===null&&!this._injector.destroyed&&(this._rendererFactory=this._injector.get(qo,null,{optional:!0}));let t=0;for(;this.dirtyFlags!==0&&t++<aA;){Tt(ft.ChangeDetectionSyncStart);try{this.synchronizeOnce()}finally{Tt(ft.ChangeDetectionSyncEnd)}}}synchronizeOnce(){this.dirtyFlags&16&&(this.dirtyFlags&=-17,this.rootEffectScheduler.flush());let t=!1;if(this.dirtyFlags&7){let i=!!(this.dirtyFlags&1);this.dirtyFlags&=-8,this.dirtyFlags|=8;for(let{_lView:r}of this.allViews){if(!i&&!hc(r))continue;let o=i&&!this.zonelessEnabled?0:1;Hb(r,o),t=!0}if(this.dirtyFlags&=-5,this.syncDirtyFlagsWithViews(),this.dirtyFlags&23)return}t||(this._rendererFactory?.begin?.(),this._rendererFactory?.end?.()),this.dirtyFlags&8&&(this.dirtyFlags&=-9,this.afterRenderManager.execute()),this.syncDirtyFlagsWithViews()}syncDirtyFlagsWithViews(){if(this.allViews.some(({_lView:t})=>hc(t))){this.dirtyFlags|=2;return}else this.dirtyFlags&=-8}attachView(t){let i=t;this._views.push(i),i.attachToAppRef(this)}detachView(t){let i=t;xc(this._views,i),i.detachFromAppRef()}_loadComponent(t){this.attachView(t.hostView);try{this.tick()}catch(r){this.internalErrorHandler(r)}this.components.push(t),this._injector.get(Rd,[]).forEach(r=>r(t))}ngOnDestroy(){if(!this._destroyed)try{this._destroyListeners.forEach(t=>t()),this._views.slice().forEach(t=>t.destroy())}finally{this._destroyed=!0,this._views=[],this._destroyListeners=[]}}onDestroy(t){return this._destroyListeners.push(t),()=>xc(this._destroyListeners,t)}destroy(){if(this._destroyed)throw new _e(406,!1);let t=this._injector;t.destroy&&!t.destroyed&&t.destroy()}get viewCount(){return this._views.length}static \u0275fac=function(i){return new(i||n)};static \u0275prov=Ae({token:n,factory:n.\u0275fac,providedIn:"root"})}return n})();function xc(n,e){let t=n.indexOf(e);t>-1&&n.splice(t,1)}function Nd(n,e,t,i){let r=dt(),o=zu();if(Xo(r,o,e)){let s=Gn(),a=Ym();HD(a,r,n,e,t,i)}return Nd}function St(n,e,t){let i=dt(),r=zu();if(Xo(i,r,e)){let o=Gn(),s=Ym();LD(s,i,n,e,i[Bt],t)}return St}function Dg(n,e,t,i,r){Zg(e,n,t,r?"class":"style",i)}function ve(n,e,t,i){let r=dt(),o=r[Be],s=n+An,a=o.firstCreatePass?ev(s,r,2,e,qg,Hu(),t,i):o.data[s];if(dr(a)){let c=r[Gi].tracingService;if(c&&c.componentCreate){let l=o.data[a.directiveStart+a.componentOffset];return c.componentCreate(eM(l),()=>($x(n,e,r,a,i),ve))}}return $x(n,e,r,a,i),ve}function $x(n,e,t,i,r){if(Xg(i,t,n,e,cM),Ls(i)){let o=t[Be];Sd(o,t,i),Lg(o,i,t)}r!=null&&Ed(t,i)}function De(){let n=Gn(),e=On(),t=Yg(e);return n.firstCreatePass&&tv(n,t),Hm(t)&&zm(),Vm(),t.classesWithoutHost!=null&&vT(t)&&Dg(n,t,dt(),t.classesWithoutHost,!0),t.stylesWithoutHost!=null&&yT(t)&&Dg(n,t,dt(),t.stylesWithoutHost,!1),De}function Wn(n,e,t,i){return ve(n,e,t,i),De(),Wn}function Pt(n,e,t,i){let r=dt(),o=r[Be],s=n+An,a=o.firstCreatePass?EI(s,o,2,e,t,i):o.data[s];return Xg(a,r,n,e,cM),i!=null&&Ed(r,a),Pt}function At(){let n=On(),e=Yg(n);return Hm(e)&&zm(),Vm(),At}function Ac(n,e,t,i){return Pt(n,e,t,i),At(),Ac}var cM=(n,e,t,i,r)=>(mc(!0),Mb(e[Bt],i,hx()));function Pd(n,e,t){let i=dt(),r=i[Be],o=n+An,s=r.firstCreatePass?ev(o,i,8,"ng-container",qg,Hu(),e,t):r.data[o];if(Xg(s,i,n,"ng-container",cA),Ls(s)){let a=i[Be];Sd(a,i,s),Lg(a,s,i)}return t!=null&&Ed(i,s),Pd}function Od(){let n=Gn(),e=On(),t=Yg(e);return n.firstCreatePass&&tv(n,t),Od}var cA=(n,e,t,i,r)=>(mc(!0),XT(e[Bt],""));function Yr(){return dt()}var Rc="en-US";var lA=Rc;function lM(n){typeof n=="string"&&(lA=n.toLowerCase().replace(/_/g,"-"))}function Yt(n,e,t){let i=dt(),r=Gn(),o=On();return uA(r,i,i[Bt],o,n,e,t),Yt}function Ys(n,e,t){let i=dt(),r=Gn(),o=On();return(o.type&3||t)&&Kb(o,r,i,t,i[Bt],n,e,nd(o,i,e)),Ys}function uA(n,e,t,i,r,o,s){let a=!0,c=null;if((i.type&3||s)&&(c??=nd(i,e,o),Kb(i,n,e,s,t,r,o,c)&&(a=!1)),a){let l=i.outputs?.[r],u=i.hostDirectiveOutputs?.[r];if(u&&u.length)for(let d=0;d<u.length;d+=2){let f=u[d],h=u[d+1];c??=nd(i,e,o),zx(i,e,f,h,r,c)}if(l&&l.length)for(let d of l)c??=nd(i,e,o),zx(i,e,d,r,r,c)}}function vt(n=1){return fx(n)}function Zs(n,e,t){return XI(n,e,t),Zs}function Js(n){let e=dt(),t=Gn(),i=$m();Wu(i+1);let r=iv(t,i);if(n.dirty&&q_(e)===((r.metadata.flags&2)===2)){if(r.matches===null)n.reset([]);else{let o=JI(e,i);n.reset(o,NT),n.notifyOnChanges()}return!0}return!1}function Ks(){return $I(dt(),$m())}function Ju(n,e){return n<<17|e<<2}function Zo(n){return n>>17&32767}function dA(n){return(n&2)==2}function fA(n,e){return n&131071|e<<17}function Ig(n){return n|2}function js(n){return(n&131068)>>2}function sg(n,e){return n&-131069|e<<2}function hA(n){return(n&1)===1}function Ag(n){return n|1}function pA(n,e,t,i,r,o){let s=o?e.classBindings:e.styleBindings,a=Zo(s),c=js(s);n[i]=t;let l=!1,u;if(Array.isArray(t)){let d=t;u=d[1],(u===null||Rs(d,u)>0)&&(l=!0)}else u=t;if(r)if(c!==0){let f=Zo(n[a+1]);n[i+1]=Ju(f,a),f!==0&&(n[f+1]=sg(n[f+1],i)),n[a+1]=fA(n[a+1],i)}else n[i+1]=Ju(a,0),a!==0&&(n[a+1]=sg(n[a+1],i)),a=i;else n[i+1]=Ju(c,0),a===0?a=i:n[c+1]=sg(n[c+1],i),c=i;l&&(n[i+1]=Ig(n[i+1])),qx(n,u,i,!0),qx(n,u,i,!1),mA(e,u,n,i,o),s=Ju(a,c),o?e.classBindings=s:e.styleBindings=s}function mA(n,e,t,i,r){let o=r?n.residualClasses:n.residualStyles;o!=null&&typeof e=="string"&&Rs(o,e)>=0&&(t[i+1]=Ag(t[i+1]))}function qx(n,e,t,i){let r=n[t+1],o=e===null,s=i?Zo(r):js(r),a=!1;for(;s!==0&&(a===!1||o);){let c=n[s],l=n[s+1];gA(c,e)&&(a=!0,n[s+1]=i?Ag(l):Ig(l)),s=i?Zo(l):js(l)}a&&(n[t+1]=i?Ig(r):Ag(r))}function gA(n,e){return n===null||e==null||(Array.isArray(n)?n[1]:n)===e?!0:Array.isArray(n)&&typeof e=="string"?Rs(n,e)>=0:!1}var Di={textEnd:0,key:0,keyEnd:0,value:0,valueEnd:0};function vA(n){return n.substring(Di.key,Di.keyEnd)}function yA(n){return _A(n),uM(n,dM(n,0,Di.textEnd))}function uM(n,e){let t=Di.textEnd;return t===e?-1:(e=Di.keyEnd=xA(n,Di.key=e,t),dM(n,e,t))}function _A(n){Di.key=0,Di.keyEnd=0,Di.value=0,Di.valueEnd=0,Di.textEnd=n.length}function dM(n,e,t){for(;e<t&&n.charCodeAt(e)<=32;)e++;return e}function xA(n,e,t){for(;e<t&&n.charCodeAt(e)>32;)e++;return e}function Qs(n,e,t){return fM(n,e,t,!1),Qs}function Jn(n,e){return fM(n,e,null,!0),Jn}function Nc(n){MA(DA,bA,n,!0)}function bA(n,e){for(let t=yA(e);t>=0;t=uM(e,t))Lu(n,vA(e),!0)}function fM(n,e,t,i){let r=dt(),o=Gn(),s=Gu(2);if(o.firstUpdatePass&&pM(o,n,s,i),e!==pi&&Xo(r,s,e)){let a=o.data[fr()];mM(o,a,r,r[Bt],n,r[s+1]=AA(e,t),i,s)}}function MA(n,e,t,i){let r=Gn(),o=Gu(2);r.firstUpdatePass&&pM(r,null,o,i);let s=dt();if(t!==pi&&Xo(s,o,t)){let a=r.data[fr()];if(gM(a,i)&&!hM(r,o)){let c=i?a.classesWithoutHost:a.stylesWithoutHost;c!==null&&(t=Iu(c,t||"")),Dg(r,a,s,t,i)}else IA(r,a,s,s[Bt],s[o+1],s[o+1]=TA(n,e,t),i,o)}}function hM(n,e){return e>=n.expandoStartIndex}function pM(n,e,t,i){let r=n.data;if(r[t+1]===null){let o=r[fr()],s=hM(n,t);gM(o,i)&&e===null&&!s&&(e=!1),e=SA(r,o,e,i),pA(r,o,e,t,s,i)}}function SA(n,e,t,i){let r=cx(n),o=i?e.residualClasses:e.residualStyles;if(r===null)(i?e.classBindings:e.styleBindings)===0&&(t=ag(null,n,e,t,i),t=Ec(t,e.attrs,i),o=null);else{let s=e.directiveStylingLast;if(s===-1||n[s]!==r)if(t=ag(r,n,e,t,i),o===null){let c=EA(n,e,i);c!==void 0&&Array.isArray(c)&&(c=ag(null,n,e,c[1],i),c=Ec(c,e.attrs,i),wA(n,e,i,c))}else o=CA(n,e,i)}return o!==void 0&&(i?e.residualClasses=o:e.residualStyles=o),t}function EA(n,e,t){let i=t?e.classBindings:e.styleBindings;if(js(i)!==0)return n[Zo(i)]}function wA(n,e,t,i){let r=t?e.classBindings:e.styleBindings;n[Zo(r)]=i}function CA(n,e,t){let i,r=e.directiveEnd;for(let o=1+e.directiveStylingLast;o<r;o++){let s=n[o].hostAttrs;i=Ec(i,s,t)}return Ec(i,e.attrs,t)}function ag(n,e,t,i,r){let o=null,s=t.directiveEnd,a=t.directiveStylingLast;for(a===-1?a=t.directiveStart:a++;a<s&&(o=e[a],i=Ec(i,o.hostAttrs,r),o!==n);)a++;return n!==null&&(t.directiveStylingLast=a),i}function Ec(n,e,t){let i=t?1:2,r=-1;if(e!==null)for(let o=0;o<e.length;o++){let s=e[o];typeof s=="number"?r=s:r===i&&(Array.isArray(n)||(n=n===void 0?[]:["",n]),Lu(n,s,t?!0:e[++o]))}return n===void 0?null:n}function TA(n,e,t){if(t==null||t==="")return Hn;let i=[],r=Fg(t);if(Array.isArray(r))for(let o=0;o<r.length;o++)n(i,r[o],!0);else if(r instanceof Set)for(let o of r)n(i,o,!0);else if(typeof r=="object")for(let o in r)r.hasOwnProperty(o)&&n(i,o,r[o]);else typeof r=="string"&&e(i,r);return i}function DA(n,e,t){let i=String(e);i!==""&&!i.includes(" ")&&Lu(n,i,t)}function IA(n,e,t,i,r,o,s,a){r===pi&&(r=Hn);let c=0,l=0,u=0<r.length?r[0]:null,d=0<o.length?o[0]:null;for(;u!==null||d!==null;){let f=c<r.length?r[c+1]:void 0,h=l<o.length?o[l+1]:void 0,g=null,_;u===d?(c+=2,l+=2,f!==h&&(g=d,_=h)):d===null||u!==null&&u<d?(c+=2,g=u):(l+=2,g=d,_=h),g!==null&&mM(n,e,t,i,g,_,s,a),u=c<r.length?r[c]:null,d=l<o.length?o[l]:null}}function mM(n,e,t,i,r,o,s,a){if(!(e.type&3))return;let c=n.data,l=c[a+1],u=hA(l)?Xx(c,e,t,r,js(l),s):void 0;if(!pd(u)){pd(o)||dA(l)&&(o=Xx(c,null,t,r,a,s));let d=Pm(fr(),t);AD(i,s,d,r,o)}}function Xx(n,e,t,i,r,o){let s=e===null,a;for(;r>0;){let c=n[r],l=Array.isArray(c),u=l?c[1]:c,d=u===null,f=t[r+1];f===pi&&(f=d?Hn:void 0);let h=d?Fu(f,i):u===i?f:void 0;if(l&&!pd(h)&&(h=Fu(c,i)),pd(h)&&(a=h,s))return a;let g=n[r+1];r=s?Zo(g):js(g)}if(e!==null){let c=o?e.residualClasses:e.residualStyles;c!=null&&(a=Fu(c,i))}return a}function pd(n){return n!==void 0}function AA(n,e){return n==null||n===""||(typeof e=="string"?n=n+e:typeof n=="object"&&(n=oc(Fg(n)))),n}function gM(n,e){return(n.flags&(e?8:16))!==0}function ce(n,e=""){let t=dt(),i=Gn(),r=n+An,o=i.firstCreatePass?wd(i,r,1,e,null):i.data[r],s=RA(i,t,o,e);t[r]=s,Xu()&&Wg(i,t,s,o),Us(o,!1)}var RA=(n,e,t,i)=>(mc(!0),$T(e[Bt],i));function NA(n,e,t,i=""){return Xo(n,zu(),t)?e+ac(t)+i:pi}function PA(n,e,t,i,r,o=""){let s=ix(),a=wI(n,s,t,r);return Gu(2),a?e+ac(t)+i+ac(r)+o:pi}function yt(n){return Ln("",n),yt}function Ln(n,e,t){let i=dt(),r=NA(i,n,e,t);return r!==pi&&vM(i,fr(),r),Ln}function ea(n,e,t,i,r){let o=dt(),s=PA(o,n,e,t,i,r);return s!==pi&&vM(o,fr(),s),ea}function vM(n,e,t){let i=Pm(e,n);qT(n[Bt],i,t)}var md=class{ngModuleFactory;componentFactories;constructor(e,t){this.ngModuleFactory=e,this.componentFactories=t}},lv=(()=>{class n{compileModuleSync(t){return new hd(t)}compileModuleAsync(t){return Promise.resolve(this.compileModuleSync(t))}compileModuleAndAllComponentsSync(t){let i=this.compileModuleSync(t),r=xm(t),o=wb(r.declarations).reduce((s,a)=>{let c=Ur(a);return c&&s.push(new Gs(c)),s},[]);return new md(i,o)}compileModuleAndAllComponentsAsync(t){return Promise.resolve(this.compileModuleAndAllComponentsSync(t))}clearCache(){}clearCacheFor(t){}getModuleId(t){}static \u0275fac=function(i){return new(i||n)};static \u0275prov=Ae({token:n,factory:n.\u0275fac,providedIn:"root"})}return n})();var yM=(()=>{class n{applicationErrorHandler=Q(Ci);appRef=Q(mr);taskService=Q(jr);ngZone=Q(Ut);zonelessEnabled=Q(gc);tracing=Q($s,{optional:!0});zoneIsDefined=typeof Zone<"u"&&!!Zone.root.run;schedulerTickApplyArgs=[{data:{__scheduler_tick__:!0}}];subscriptions=new fn;angularZoneId=this.zoneIsDefined?this.ngZone._inner?.get(ic):null;scheduleInRootZone=!this.zonelessEnabled&&this.zoneIsDefined&&(Q(tg,{optional:!0})??!1);cancelScheduledCallback=null;useMicrotaskScheduler=!1;runningTick=!1;pendingRenderTaskId=null;constructor(){this.subscriptions.add(this.appRef.afterTick.subscribe(()=>{let t=this.taskService.add();if(!this.runningTick&&(this.cleanup(),!this.zonelessEnabled||this.appRef.includeAllTestViews)){this.taskService.remove(t);return}this.switchToMicrotaskScheduler(),this.taskService.remove(t)})),this.subscriptions.add(this.ngZone.onUnstable.subscribe(()=>{this.runningTick||this.cleanup()}))}switchToMicrotaskScheduler(){this.ngZone.runOutsideAngular(()=>{let t=this.taskService.add();this.useMicrotaskScheduler=!0,queueMicrotask(()=>{this.useMicrotaskScheduler=!1,this.taskService.remove(t)})})}notify(t){if(!this.zonelessEnabled&&t===5)return;switch(t){case 0:{this.appRef.dirtyFlags|=2;break}case 3:case 2:case 4:case 5:case 1:{this.appRef.dirtyFlags|=4;break}case 6:{this.appRef.dirtyFlags|=2;break}case 12:{this.appRef.dirtyFlags|=16;break}case 13:{this.appRef.dirtyFlags|=2;break}case 11:break;default:this.appRef.dirtyFlags|=8}if(this.appRef.tracingSnapshot=this.tracing?.snapshot(this.appRef.tracingSnapshot)??null,!this.shouldScheduleTick())return;let i=this.useMicrotaskScheduler?vx:Jm;this.pendingRenderTaskId=this.taskService.add(),this.scheduleInRootZone?this.cancelScheduledCallback=Zone.root.run(()=>i(()=>this.tick())):this.cancelScheduledCallback=this.ngZone.runOutsideAngular(()=>i(()=>this.tick()))}shouldScheduleTick(){return!(this.appRef.destroyed||this.pendingRenderTaskId!==null||this.runningTick||this.appRef._runningTick||!this.zonelessEnabled&&this.zoneIsDefined&&Zone.current.get(ic+this.angularZoneId))}tick(){if(this.runningTick||this.appRef.destroyed)return;if(this.appRef.dirtyFlags===0){this.cleanup();return}!this.zonelessEnabled&&this.appRef.dirtyFlags&7&&(this.appRef.dirtyFlags|=1);let t=this.taskService.add();try{this.ngZone.run(()=>{this.runningTick=!0,this.appRef._tick()},void 0,this.schedulerTickApplyArgs)}catch(i){this.applicationErrorHandler(i)}finally{this.taskService.remove(t),this.cleanup()}}ngOnDestroy(){this.subscriptions.unsubscribe(),this.cleanup()}cleanup(){if(this.runningTick=!1,this.cancelScheduledCallback?.(),this.cancelScheduledCallback=null,this.pendingRenderTaskId!==null){let t=this.pendingRenderTaskId;this.pendingRenderTaskId=null,this.taskService.remove(t)}}static \u0275fac=function(i){return new(i||n)};static \u0275prov=Ae({token:n,factory:n.\u0275fac,providedIn:"root"})}return n})();function _M(){return[{provide:Lo,useExisting:yM},{provide:Ut,useClass:rc},{provide:gc,useValue:!0}]}function OA(){return typeof $localize<"u"&&$localize.locale||Rc}var Ld=new Pe("",{factory:()=>Q(Ld,{optional:!0,skipSelf:!0})||OA()});function mi(n){return T_(n)}function Zr(n,e){return Ql(n,e?.equal)}var wM=Symbol("InputSignalNode#UNSET"),KA=it(ae({},eu),{transformFn:void 0,applyValueToInputSignal(n,e){Ms(n,e)}});function CM(n,e){let t=Object.create(KA);t.value=n,t.transformFn=e?.transform;function i(){if(_s(t),t.value===wM){let r=null;throw new _e(-950,r)}return t.value}return i[Tn]=t,i}function xM(n,e){return CM(n,e)}function QA(n){return CM(wM,n)}var TM=(xM.required=QA,xM);var uv=new Pe(""),e1=new Pe("");function Pc(n){return!n.moduleRef}function t1(n){let e=Pc(n)?n.r3Injector:n.moduleRef.injector,t=e.get(Ut);return t.run(()=>{Pc(n)?n.r3Injector.resolveInjectorInitializers():n.moduleRef.resolveInjectorInitializers();let i=e.get(Ci),r;if(t.runOutsideAngular(()=>{r=t.onError.subscribe({next:i})}),Pc(n)){let o=()=>e.destroy(),s=n.platformInjector.get(uv);s.add(o),e.onDestroy(()=>{r.unsubscribe(),s.delete(o)})}else{let o=()=>n.moduleRef.destroy(),s=n.platformInjector.get(uv);s.add(o),n.moduleRef.onDestroy(()=>{xc(n.allPlatformModules,n.moduleRef),r.unsubscribe(),s.delete(o)})}return i1(i,t,()=>{let o=e.get(jr),s=o.add(),a=e.get(cv);return a.runInitializers(),a.donePromise.then(()=>{let c=e.get(Ld,Rc);if(lM(c||Rc),!e.get(e1,!0))return Pc(n)?e.get(mr):(n.allPlatformModules.push(n.moduleRef),n.moduleRef);if(Pc(n)){let u=e.get(mr);return n.rootComponent!==void 0&&u.bootstrap(n.rootComponent),u}else return n1?.(n.moduleRef,n.allPlatformModules),n.moduleRef}).finally(()=>{o.remove(s)})})})}var n1;function i1(n,e,t){try{let i=t();return Xs(i)?i.catch(r=>{throw e.runOutsideAngular(()=>n(r)),r}):i}catch(i){throw e.runOutsideAngular(()=>n(i)),i}}var Fd=null;function r1(n=[],e){return zn.create({name:e,providers:[{provide:lc,useValue:"platform"},{provide:uv,useValue:new Set([()=>Fd=null])},...n]})}function o1(n=[]){if(Fd)return Fd;let e=r1(n);return Fd=e,sM(),s1(e),e}function s1(n){let e=n.get(_d,null);_n(n,()=>{e?.forEach(t=>t())})}function DM(){return!1}var a1=1e4;var n$=a1-1e3;var yv=(()=>{class n{static __NG_ELEMENT_ID__=c1}return n})();function c1(n){return l1(On(),dt(),(n&16)===16)}function l1(n,e,t){if(dr(n)&&!t){let i=hi(n.index,e);return new Wr(i,i)}else if(n.type&175){let i=e[di];return new Wr(i,e)}return null}var dv=class{supports(e){return nv(e)}create(e){return new fv(e)}},u1=(n,e)=>e,fv=class{length=0;collection;_linkedRecords=null;_unlinkedRecords=null;_previousItHead=null;_itHead=null;_itTail=null;_additionsHead=null;_additionsTail=null;_movesHead=null;_movesTail=null;_removalsHead=null;_removalsTail=null;_identityChangesHead=null;_identityChangesTail=null;_trackByFn;constructor(e){this._trackByFn=e||u1}forEachItem(e){let t;for(t=this._itHead;t!==null;t=t._next)e(t)}forEachOperation(e){let t=this._itHead,i=this._removalsHead,r=0,o=null;for(;t||i;){let s=!i||t&&t.currentIndex<bM(i,r,o)?t:i,a=bM(s,r,o),c=s.currentIndex;if(s===i)r--,i=i._nextRemoved;else if(t=t._next,s.previousIndex==null)r++;else{o||(o=[]);let l=a-r,u=c-r;if(l!=u){for(let f=0;f<l;f++){let h=f<o.length?o[f]:o[f]=0,g=h+f;u<=g&&g<l&&(o[f]=h+1)}let d=s.previousIndex;o[d]=u-l}}a!==c&&e(s,a,c)}}forEachPreviousItem(e){let t;for(t=this._previousItHead;t!==null;t=t._nextPrevious)e(t)}forEachAddedItem(e){let t;for(t=this._additionsHead;t!==null;t=t._nextAdded)e(t)}forEachMovedItem(e){let t;for(t=this._movesHead;t!==null;t=t._nextMoved)e(t)}forEachRemovedItem(e){let t;for(t=this._removalsHead;t!==null;t=t._nextRemoved)e(t)}forEachIdentityChange(e){let t;for(t=this._identityChangesHead;t!==null;t=t._nextIdentityChange)e(t)}diff(e){if(e==null&&(e=[]),!nv(e))throw new _e(900,!1);return this.check(e)?this:null}onDestroy(){}check(e){this._reset();let t=this._itHead,i=!1,r,o,s;if(Array.isArray(e)){this.length=e.length;for(let a=0;a<this.length;a++)o=e[a],s=this._trackByFn(a,o),t===null||!Object.is(t.trackById,s)?(t=this._mismatch(t,o,s,a),i=!0):(i&&(t=this._verifyReinsertion(t,o,s,a)),Object.is(t.item,o)||this._addIdentityChange(t,o)),t=t._next}else r=0,Jb(e,a=>{s=this._trackByFn(r,a),t===null||!Object.is(t.trackById,s)?(t=this._mismatch(t,a,s,r),i=!0):(i&&(t=this._verifyReinsertion(t,a,s,r)),Object.is(t.item,a)||this._addIdentityChange(t,a)),t=t._next,r++}),this.length=r;return this._truncate(t),this.collection=e,this.isDirty}get isDirty(){return this._additionsHead!==null||this._movesHead!==null||this._removalsHead!==null||this._identityChangesHead!==null}_reset(){if(this.isDirty){let e;for(e=this._previousItHead=this._itHead;e!==null;e=e._next)e._nextPrevious=e._next;for(e=this._additionsHead;e!==null;e=e._nextAdded)e.previousIndex=e.currentIndex;for(this._additionsHead=this._additionsTail=null,e=this._movesHead;e!==null;e=e._nextMoved)e.previousIndex=e.currentIndex;this._movesHead=this._movesTail=null,this._removalsHead=this._removalsTail=null,this._identityChangesHead=this._identityChangesTail=null}}_mismatch(e,t,i,r){let o;return e===null?o=this._itTail:(o=e._prev,this._remove(e)),e=this._unlinkedRecords===null?null:this._unlinkedRecords.get(i,null),e!==null?(Object.is(e.item,t)||this._addIdentityChange(e,t),this._reinsertAfter(e,o,r)):(e=this._linkedRecords===null?null:this._linkedRecords.get(i,r),e!==null?(Object.is(e.item,t)||this._addIdentityChange(e,t),this._moveAfter(e,o,r)):e=this._addAfter(new hv(t,i),o,r)),e}_verifyReinsertion(e,t,i,r){let o=this._unlinkedRecords===null?null:this._unlinkedRecords.get(i,null);return o!==null?e=this._reinsertAfter(o,e._prev,r):e.currentIndex!=r&&(e.currentIndex=r,this._addToMoves(e,r)),e}_truncate(e){for(;e!==null;){let t=e._next;this._addToRemovals(this._unlink(e)),e=t}this._unlinkedRecords!==null&&this._unlinkedRecords.clear(),this._additionsTail!==null&&(this._additionsTail._nextAdded=null),this._movesTail!==null&&(this._movesTail._nextMoved=null),this._itTail!==null&&(this._itTail._next=null),this._removalsTail!==null&&(this._removalsTail._nextRemoved=null),this._identityChangesTail!==null&&(this._identityChangesTail._nextIdentityChange=null)}_reinsertAfter(e,t,i){this._unlinkedRecords!==null&&this._unlinkedRecords.remove(e);let r=e._prevRemoved,o=e._nextRemoved;return r===null?this._removalsHead=o:r._nextRemoved=o,o===null?this._removalsTail=r:o._prevRemoved=r,this._insertAfter(e,t,i),this._addToMoves(e,i),e}_moveAfter(e,t,i){return this._unlink(e),this._insertAfter(e,t,i),this._addToMoves(e,i),e}_addAfter(e,t,i){return this._insertAfter(e,t,i),this._additionsTail===null?this._additionsTail=this._additionsHead=e:this._additionsTail=this._additionsTail._nextAdded=e,e}_insertAfter(e,t,i){let r=t===null?this._itHead:t._next;return e._next=r,e._prev=t,r===null?this._itTail=e:r._prev=e,t===null?this._itHead=e:t._next=e,this._linkedRecords===null&&(this._linkedRecords=new kd),this._linkedRecords.put(e),e.currentIndex=i,e}_remove(e){return this._addToRemovals(this._unlink(e))}_unlink(e){this._linkedRecords!==null&&this._linkedRecords.remove(e);let t=e._prev,i=e._next;return t===null?this._itHead=i:t._next=i,i===null?this._itTail=t:i._prev=t,e}_addToMoves(e,t){return e.previousIndex===t||(this._movesTail===null?this._movesTail=this._movesHead=e:this._movesTail=this._movesTail._nextMoved=e),e}_addToRemovals(e){return this._unlinkedRecords===null&&(this._unlinkedRecords=new kd),this._unlinkedRecords.put(e),e.currentIndex=null,e._nextRemoved=null,this._removalsTail===null?(this._removalsTail=this._removalsHead=e,e._prevRemoved=null):(e._prevRemoved=this._removalsTail,this._removalsTail=this._removalsTail._nextRemoved=e),e}_addIdentityChange(e,t){return e.item=t,this._identityChangesTail===null?this._identityChangesTail=this._identityChangesHead=e:this._identityChangesTail=this._identityChangesTail._nextIdentityChange=e,e}},hv=class{item;trackById;currentIndex=null;previousIndex=null;_nextPrevious=null;_prev=null;_next=null;_prevDup=null;_nextDup=null;_prevRemoved=null;_nextRemoved=null;_nextAdded=null;_nextMoved=null;_nextIdentityChange=null;constructor(e,t){this.item=e,this.trackById=t}},pv=class{_head=null;_tail=null;add(e){this._head===null?(this._head=this._tail=e,e._nextDup=null,e._prevDup=null):(this._tail._nextDup=e,e._prevDup=this._tail,e._nextDup=null,this._tail=e)}get(e,t){let i;for(i=this._head;i!==null;i=i._nextDup)if((t===null||t<=i.currentIndex)&&Object.is(i.trackById,e))return i;return null}remove(e){let t=e._prevDup,i=e._nextDup;return t===null?this._head=i:t._nextDup=i,i===null?this._tail=t:i._prevDup=t,this._head===null}},kd=class{map=new Map;put(e){let t=e.trackById,i=this.map.get(t);i||(i=new pv,this.map.set(t,i)),i.add(e)}get(e,t){let i=e,r=this.map.get(i);return r?r.get(e,t):null}remove(e){let t=e.trackById;return this.map.get(t).remove(e)&&this.map.delete(t),e}get isEmpty(){return this.map.size===0}clear(){this.map.clear()}};function bM(n,e,t){let i=n.previousIndex;if(i===null)return i;let r=0;return t&&i<t.length&&(r=t[i]),i+e+r}var mv=class{supports(e){return e instanceof Map||Dd(e)}create(){return new gv}},gv=class{_records=new Map;_mapHead=null;_appendAfter=null;_previousMapHead=null;_changesHead=null;_changesTail=null;_additionsHead=null;_additionsTail=null;_removalsHead=null;get isDirty(){return this._additionsHead!==null||this._changesHead!==null||this._removalsHead!==null}forEachItem(e){let t;for(t=this._mapHead;t!==null;t=t._next)e(t)}forEachPreviousItem(e){let t;for(t=this._previousMapHead;t!==null;t=t._nextPrevious)e(t)}forEachChangedItem(e){let t;for(t=this._changesHead;t!==null;t=t._nextChanged)e(t)}forEachAddedItem(e){let t;for(t=this._additionsHead;t!==null;t=t._nextAdded)e(t)}forEachRemovedItem(e){let t;for(t=this._removalsHead;t!==null;t=t._nextRemoved)e(t)}diff(e){if(!e)e=new Map;else if(!(e instanceof Map||Dd(e)))throw new _e(900,!1);return this.check(e)?this:null}check(e){this._reset();let t=this._mapHead;if(this._appendAfter=null,this._forEach(e,(i,r)=>{if(t&&t.key===r)this._maybeAddToChanges(t,i),this._appendAfter=t,t=t._next;else{let o=this._getOrCreateRecordForKey(r,i);t=this._insertBeforeOrAppend(t,o)}}),t){t._prev&&(t._prev._next=null),this._removalsHead=t;for(let i=t;i!==null;i=i._nextRemoved)i===this._mapHead&&(this._mapHead=null),this._records.delete(i.key),i._nextRemoved=i._next,i.previousValue=i.currentValue,i.currentValue=null,i._prev=null,i._next=null}return this._changesTail&&(this._changesTail._nextChanged=null),this._additionsTail&&(this._additionsTail._nextAdded=null),this.isDirty}_insertBeforeOrAppend(e,t){if(e){let i=e._prev;return t._next=e,t._prev=i,e._prev=t,i&&(i._next=t),e===this._mapHead&&(this._mapHead=t),this._appendAfter=e,e}return this._appendAfter?(this._appendAfter._next=t,t._prev=this._appendAfter):this._mapHead=t,this._appendAfter=t,null}_getOrCreateRecordForKey(e,t){if(this._records.has(e)){let r=this._records.get(e);this._maybeAddToChanges(r,t);let o=r._prev,s=r._next;return o&&(o._next=s),s&&(s._prev=o),r._next=null,r._prev=null,r}let i=new vv(e);return this._records.set(e,i),i.currentValue=t,this._addToAdditions(i),i}_reset(){if(this.isDirty){let e;for(this._previousMapHead=this._mapHead,e=this._previousMapHead;e!==null;e=e._next)e._nextPrevious=e._next;for(e=this._changesHead;e!==null;e=e._nextChanged)e.previousValue=e.currentValue;for(e=this._additionsHead;e!=null;e=e._nextAdded)e.previousValue=e.currentValue;this._changesHead=this._changesTail=null,this._additionsHead=this._additionsTail=null,this._removalsHead=null}}_maybeAddToChanges(e,t){Object.is(t,e.currentValue)||(e.previousValue=e.currentValue,e.currentValue=t,this._addToChanges(e))}_addToAdditions(e){this._additionsHead===null?this._additionsHead=this._additionsTail=e:(this._additionsTail._nextAdded=e,this._additionsTail=e)}_addToChanges(e){this._changesHead===null?this._changesHead=this._changesTail=e:(this._changesTail._nextChanged=e,this._changesTail=e)}_forEach(e,t){e instanceof Map?e.forEach(t):Object.keys(e).forEach(i=>t(e[i],i))}},vv=class{key;previousValue=null;currentValue=null;_nextPrevious=null;_next=null;_prev=null;_nextAdded=null;_nextRemoved=null;_nextChanged=null;constructor(e){this.key=e}};function MM(){return new _v([new dv])}var _v=(()=>{class n{factories;static \u0275prov=Ae({token:n,providedIn:"root",factory:MM});constructor(t){this.factories=t}static create(t,i){if(i!=null){let r=i.factories.slice();t=t.concat(r)}return new n(t)}static extend(t){return{provide:n,useFactory:()=>{let i=Q(n,{optional:!0,skipSelf:!0});return n.create(t,i||MM())}}}find(t){let i=this.factories.find(r=>r.supports(t));if(i!=null)return i;throw new _e(901,!1)}}return n})();function SM(){return new xv([new mv])}var xv=(()=>{class n{static \u0275prov=Ae({token:n,providedIn:"root",factory:SM});factories;constructor(t){this.factories=t}static create(t,i){if(i){let r=i.factories.slice();t=t.concat(r)}return new n(t)}static extend(t){return{provide:n,useFactory:()=>{let i=Q(n,{optional:!0,skipSelf:!0});return n.create(t,i||SM())}}}find(t){let i=this.factories.find(r=>r.supports(t));if(i)return i;throw new _e(901,!1)}}return n})();function IM(n){let{rootComponent:e,appProviders:t,platformProviders:i,platformRef:r}=n;Tt(ft.BootstrapApplicationStart);try{let o=r?.injector??o1(i),s=[_M(),_x,...t||[]],a=new Sc({providers:s,parent:o,debugName:"",runEnvironmentInitializers:!1});return t1({r3Injector:a.injector,platformInjector:o,rootComponent:e})}catch(o){return Promise.reject(o)}finally{Tt(ft.BootstrapApplicationEnd)}}var AM=null;function gr(){return AM}function bv(n){AM??=n}var Oc=class{},Bd=(()=>{class n{historyGo(t){throw new Error("")}static \u0275fac=function(i){return new(i||n)};static \u0275prov=Ae({token:n,factory:()=>Q(RM),providedIn:"platform"})}return n})();var RM=(()=>{class n extends Bd{_location;_history;_doc=Q(Kt);constructor(){super(),this._location=window.location,this._history=window.history}getBaseHrefFromDOM(){return gr().getBaseHref(this._doc)}onPopState(t){let i=gr().getGlobalEventTarget(this._doc,"window");return i.addEventListener("popstate",t,!1),()=>i.removeEventListener("popstate",t)}onHashChange(t){let i=gr().getGlobalEventTarget(this._doc,"window");return i.addEventListener("hashchange",t,!1),()=>i.removeEventListener("hashchange",t)}get href(){return this._location.href}get protocol(){return this._location.protocol}get hostname(){return this._location.hostname}get port(){return this._location.port}get pathname(){return this._location.pathname}get search(){return this._location.search}get hash(){return this._location.hash}set pathname(t){this._location.pathname=t}pushState(t,i,r){this._history.pushState(t,i,r)}replaceState(t,i,r){this._history.replaceState(t,i,r)}forward(){this._history.forward()}back(){this._history.back()}historyGo(t=0){this._history.go(t)}getState(){return this._history.state}static \u0275fac=function(i){return new(i||n)};static \u0275prov=Ae({token:n,factory:()=>new n,providedIn:"platform"})}return n})();function OM(n,e){return n?e?n.endsWith("/")?e.startsWith("/")?n+e.slice(1):n+e:e.startsWith("/")?n+e:`${n}/${e}`:n:e}function NM(n){let e=n.search(/#|\?|$/);return n[e-1]==="/"?n.slice(0,e-1)+n.slice(e):n}function Jr(n){return n&&n[0]!=="?"?`?${n}`:n}var Vd=(()=>{class n{historyGo(t){throw new Error("")}static \u0275fac=function(i){return new(i||n)};static \u0275prov=Ae({token:n,factory:()=>Q(f1),providedIn:"root"})}return n})(),d1=new Pe(""),f1=(()=>{class n extends Vd{_platformLocation;_baseHref;_removeListenerFns=[];constructor(t,i){super(),this._platformLocation=t,this._baseHref=i??this._platformLocation.getBaseHrefFromDOM()??Q(Kt).location?.origin??""}ngOnDestroy(){for(;this._removeListenerFns.length;)this._removeListenerFns.pop()()}onPopState(t){this._removeListenerFns.push(this._platformLocation.onPopState(t),this._platformLocation.onHashChange(t))}getBaseHref(){return this._baseHref}prepareExternalUrl(t){return OM(this._baseHref,t)}path(t=!1){let i=this._platformLocation.pathname+Jr(this._platformLocation.search),r=this._platformLocation.hash;return r&&t?`${i}${r}`:i}pushState(t,i,r,o){let s=this.prepareExternalUrl(r+Jr(o));this._platformLocation.pushState(t,i,s)}replaceState(t,i,r,o){let s=this.prepareExternalUrl(r+Jr(o));this._platformLocation.replaceState(t,i,s)}forward(){this._platformLocation.forward()}back(){this._platformLocation.back()}getState(){return this._platformLocation.getState()}historyGo(t=0){this._platformLocation.historyGo?.(t)}static \u0275fac=function(i){return new(i||n)(Le(Bd),Le(d1,8))};static \u0275prov=Ae({token:n,factory:n.\u0275fac,providedIn:"root"})}return n})();var ta=(()=>{class n{_subject=new $t;_basePath;_locationStrategy;_urlChangeListeners=[];_urlChangeSubscription=null;constructor(t){this._locationStrategy=t;let i=this._locationStrategy.getBaseHref();this._basePath=m1(NM(PM(i))),this._locationStrategy.onPopState(r=>{this._subject.next({url:this.path(!0),pop:!0,state:r.state,type:r.type})})}ngOnDestroy(){this._urlChangeSubscription?.unsubscribe(),this._urlChangeListeners=[]}path(t=!1){return this.normalize(this._locationStrategy.path(t))}getState(){return this._locationStrategy.getState()}isCurrentPathEqualTo(t,i=""){return this.path()==this.normalize(t+Jr(i))}normalize(t){return n.stripTrailingSlash(p1(this._basePath,PM(t)))}prepareExternalUrl(t){return t&&t[0]!=="/"&&(t="/"+t),this._locationStrategy.prepareExternalUrl(t)}go(t,i="",r=null){this._locationStrategy.pushState(r,"",t,i),this._notifyUrlChangeListeners(this.prepareExternalUrl(t+Jr(i)),r)}replaceState(t,i="",r=null){this._locationStrategy.replaceState(r,"",t,i),this._notifyUrlChangeListeners(this.prepareExternalUrl(t+Jr(i)),r)}forward(){this._locationStrategy.forward()}back(){this._locationStrategy.back()}historyGo(t=0){this._locationStrategy.historyGo?.(t)}onUrlChange(t){return this._urlChangeListeners.push(t),this._urlChangeSubscription??=this.subscribe(i=>{this._notifyUrlChangeListeners(i.url,i.state)}),()=>{let i=this._urlChangeListeners.indexOf(t);this._urlChangeListeners.splice(i,1),this._urlChangeListeners.length===0&&(this._urlChangeSubscription?.unsubscribe(),this._urlChangeSubscription=null)}}_notifyUrlChangeListeners(t="",i){this._urlChangeListeners.forEach(r=>r(t,i))}subscribe(t,i,r){return this._subject.subscribe({next:t,error:i??void 0,complete:r??void 0})}static normalizeQueryParams=Jr;static joinWithSlash=OM;static stripTrailingSlash=NM;static \u0275fac=function(i){return new(i||n)(Le(Vd))};static \u0275prov=Ae({token:n,factory:()=>h1(),providedIn:"root"})}return n})();function h1(){return new ta(Le(Vd))}function p1(n,e){if(!n||!e.startsWith(n))return e;let t=e.substring(n.length);return t===""||["/",";","?","#"].includes(t[0])?t:e}function PM(n){return n.replace(/\/index.html$/,"")}function m1(n){if(new RegExp("^(https?:)?//").test(n)){let[,t]=n.split(/\/\/[^\/]+/);return t}return n}var Mv=/\s+/,LM=[],Sv=(()=>{class n{_ngEl;_renderer;initialClasses=LM;rawClass;stateMap=new Map;constructor(t,i){this._ngEl=t,this._renderer=i}set klass(t){this.initialClasses=t!=null?t.trim().split(Mv):LM}set ngClass(t){this.rawClass=typeof t=="string"?t.trim().split(Mv):t}ngDoCheck(){for(let i of this.initialClasses)this._updateState(i,!0);let t=this.rawClass;if(Array.isArray(t)||t instanceof Set)for(let i of t)this._updateState(i,!0);else if(t!=null)for(let i of Object.keys(t))this._updateState(i,!!t[i]);this._applyStateDiff()}_updateState(t,i){let r=this.stateMap.get(t);r!==void 0?(r.enabled!==i&&(r.changed=!0,r.enabled=i),r.touched=!0):this.stateMap.set(t,{enabled:i,changed:!0,touched:!0})}_applyStateDiff(){for(let t of this.stateMap){let i=t[0],r=t[1];r.changed?(this._toggleClass(i,r.enabled),r.changed=!1):r.touched||(r.enabled&&this._toggleClass(i,!1),this.stateMap.delete(i)),r.touched=!1}}_toggleClass(t,i){t=t.trim(),t.length>0&&t.split(Mv).forEach(r=>{i?this._renderer.addClass(this._ngEl.nativeElement,r):this._renderer.removeClass(this._ngEl.nativeElement,r)})}static \u0275fac=function(i){return new(i||n)(Qt(qr),Qt(Td))};static \u0275dir=Xr({type:n,selectors:[["","ngClass",""]],inputs:{klass:[0,"class","klass"],ngClass:"ngClass"}})}return n})();var Hd=class{$implicit;ngForOf;index;count;constructor(e,t,i,r){this.$implicit=e,this.ngForOf=t,this.index=i,this.count=r}get first(){return this.index===0}get last(){return this.index===this.count-1}get even(){return this.index%2===0}get odd(){return!this.even}},na=(()=>{class n{_viewContainer;_template;_differs;set ngForOf(t){this._ngForOf=t,this._ngForOfDirty=!0}set ngForTrackBy(t){this._trackByFn=t}get ngForTrackBy(){return this._trackByFn}_ngForOf=null;_ngForOfDirty=!0;_differ=null;_trackByFn;constructor(t,i,r){this._viewContainer=t,this._template=i,this._differs=r}set ngForTemplate(t){t&&(this._template=t)}ngDoCheck(){if(this._ngForOfDirty){this._ngForOfDirty=!1;let t=this._ngForOf;!this._differ&&t&&(this._differ=this._differs.find(t).create(this.ngForTrackBy))}if(this._differ){let t=this._differ.diff(this._ngForOf);t&&this._applyChanges(t)}}_applyChanges(t){let i=this._viewContainer;t.forEachOperation((r,o,s)=>{if(r.previousIndex==null)i.createEmbeddedView(this._template,new Hd(r.item,this._ngForOf,-1,-1),s===null?void 0:s);else if(s==null)i.remove(o===null?void 0:o);else if(o!==null){let a=i.get(o);i.move(a,s),FM(a,r)}});for(let r=0,o=i.length;r<o;r++){let a=i.get(r).context;a.index=r,a.count=o,a.ngForOf=this._ngForOf}t.forEachIdentityChange(r=>{let o=i.get(r.currentIndex);FM(o,r)})}static ngTemplateContextGuard(t,i){return!0}static \u0275fac=function(i){return new(i||n)(Qt(pr),Qt($r),Qt(_v))};static \u0275dir=Xr({type:n,selectors:[["","ngFor","","ngForOf",""]],inputs:{ngForOf:"ngForOf",ngForTrackBy:"ngForTrackBy",ngForTemplate:"ngForTemplate"}})}return n})();function FM(n,e){n.context.$implicit=e.item}var Lc=(()=>{class n{_viewContainer;_context=new zd;_thenTemplateRef=null;_elseTemplateRef=null;_thenViewRef=null;_elseViewRef=null;constructor(t,i){this._viewContainer=t,this._thenTemplateRef=i}set ngIf(t){this._context.$implicit=this._context.ngIf=t,this._updateView()}set ngIfThen(t){kM(t,!1),this._thenTemplateRef=t,this._thenViewRef=null,this._updateView()}set ngIfElse(t){kM(t,!1),this._elseTemplateRef=t,this._elseViewRef=null,this._updateView()}_updateView(){this._context.$implicit?this._thenViewRef||(this._viewContainer.clear(),this._elseViewRef=null,this._thenTemplateRef&&(this._thenViewRef=this._viewContainer.createEmbeddedView(this._thenTemplateRef,this._context))):this._elseViewRef||(this._viewContainer.clear(),this._thenViewRef=null,this._elseTemplateRef&&(this._elseViewRef=this._viewContainer.createEmbeddedView(this._elseTemplateRef,this._context)))}static ngIfUseIfTypeGuard;static ngTemplateGuard_ngIf;static ngTemplateContextGuard(t,i){return!0}static \u0275fac=function(i){return new(i||n)(Qt(pr),Qt($r))};static \u0275dir=Xr({type:n,selectors:[["","ngIf",""]],inputs:{ngIf:"ngIf",ngIfThen:"ngIfThen",ngIfElse:"ngIfElse"}})}return n})(),zd=class{$implicit=null;ngIf=null};function kM(n,e){if(n&&!n.createEmbeddedView)throw new _e(2020,!1)}var Ev=(()=>{class n{_ngEl;_differs;_renderer;_ngStyle=null;_differ=null;constructor(t,i,r){this._ngEl=t,this._differs=i,this._renderer=r}set ngStyle(t){this._ngStyle=t,!this._differ&&t&&(this._differ=this._differs.find(t).create())}ngDoCheck(){if(this._differ){let t=this._differ.diff(this._ngStyle);t&&this._applyChanges(t)}}_setStyle(t,i){let[r,o]=t.split("."),s=r.indexOf("-")===-1?void 0:Ai.DashCase;i!=null?this._renderer.setStyle(this._ngEl.nativeElement,r,o?`${i}${o}`:i,s):this._renderer.removeStyle(this._ngEl.nativeElement,r,s)}_applyChanges(t){t.forEachRemovedItem(i=>this._setStyle(i.key,null)),t.forEachAddedItem(i=>this._setStyle(i.key,i.currentValue)),t.forEachChangedItem(i=>this._setStyle(i.key,i.currentValue))}static \u0275fac=function(i){return new(i||n)(Qt(qr),Qt(xv),Qt(Td))};static \u0275dir=Xr({type:n,selectors:[["","ngStyle",""]],inputs:{ngStyle:"ngStyle"}})}return n})();var Kr=(()=>{class n{static \u0275fac=function(i){return new(i||n)};static \u0275mod=qs({type:n});static \u0275inj=Fo({})}return n})();function wv(n,e){e=encodeURIComponent(e);for(let t of n.split(";")){let i=t.indexOf("="),[r,o]=i==-1?[t,""]:[t.slice(0,i),t.slice(i+1)];if(r.trim()===e)return decodeURIComponent(o)}return null}var Fc=class{};var UM="browser";var kc=class{_doc;constructor(e){this._doc=e}manager},Gd=(()=>{class n extends kc{constructor(t){super(t)}supports(t){return!0}addEventListener(t,i,r,o){return t.addEventListener(i,r,o),()=>this.removeEventListener(t,i,r,o)}removeEventListener(t,i,r,o){return t.removeEventListener(i,r,o)}static \u0275fac=function(i){return new(i||n)(Le(Kt))};static \u0275prov=Ae({token:n,factory:n.\u0275fac})}return n})(),$d=new Pe(""),Iv=(()=>{class n{_zone;_plugins;_eventNameToPlugin=new Map;constructor(t,i){this._zone=i,t.forEach(s=>{s.manager=this});let r=t.filter(s=>!(s instanceof Gd));this._plugins=r.slice().reverse();let o=t.find(s=>s instanceof Gd);o&&this._plugins.push(o)}addEventListener(t,i,r,o){return this._findPluginFor(i).addEventListener(t,i,r,o)}getZone(){return this._zone}_findPluginFor(t){let i=this._eventNameToPlugin.get(t);if(i)return i;if(i=this._plugins.find(o=>o.supports(t)),!i)throw new _e(5101,!1);return this._eventNameToPlugin.set(t,i),i}static \u0275fac=function(i){return new(i||n)(Le($d),Le(Ut))};static \u0275prov=Ae({token:n,factory:n.\u0275fac})}return n})(),Cv="ng-app-id";function VM(n){for(let e of n)e.remove()}function HM(n,e){let t=e.createElement("style");return t.textContent=n,t}function g1(n,e,t,i){let r=n.head?.querySelectorAll(`style[${Cv}="${e}"],link[${Cv}="${e}"]`);if(r)for(let o of r)o.removeAttribute(Cv),o instanceof HTMLLinkElement?i.set(o.href.slice(o.href.lastIndexOf("/")+1),{usage:0,elements:[o]}):o.textContent&&t.set(o.textContent,{usage:0,elements:[o]})}function Dv(n,e){let t=e.createElement("link");return t.setAttribute("rel","stylesheet"),t.setAttribute("href",n),t}var Av=(()=>{class n{doc;appId;nonce;inline=new Map;external=new Map;hosts=new Set;constructor(t,i,r,o={}){this.doc=t,this.appId=i,this.nonce=r,g1(t,i,this.inline,this.external),this.hosts.add(t.head)}addStyles(t,i){for(let r of t)this.addUsage(r,this.inline,HM);i?.forEach(r=>this.addUsage(r,this.external,Dv))}removeStyles(t,i){for(let r of t)this.removeUsage(r,this.inline);i?.forEach(r=>this.removeUsage(r,this.external))}addUsage(t,i,r){let o=i.get(t);o?o.usage++:i.set(t,{usage:1,elements:[...this.hosts].map(s=>this.addElement(s,r(t,this.doc)))})}removeUsage(t,i){let r=i.get(t);r&&(r.usage--,r.usage<=0&&(VM(r.elements),i.delete(t)))}ngOnDestroy(){for(let[,{elements:t}]of[...this.inline,...this.external])VM(t);this.hosts.clear()}addHost(t){this.hosts.add(t);for(let[i,{elements:r}]of this.inline)r.push(this.addElement(t,HM(i,this.doc)));for(let[i,{elements:r}]of this.external)r.push(this.addElement(t,Dv(i,this.doc)))}removeHost(t){this.hosts.delete(t)}addElement(t,i){return this.nonce&&i.setAttribute("nonce",this.nonce),t.appendChild(i)}static \u0275fac=function(i){return new(i||n)(Le(Kt),Le(yd),Le(xd,8),Le(Tc))};static \u0275prov=Ae({token:n,factory:n.\u0275fac})}return n})(),Tv={svg:"http://www.w3.org/2000/svg",xhtml:"http://www.w3.org/1999/xhtml",xlink:"http://www.w3.org/1999/xlink",xml:"http://www.w3.org/XML/1998/namespace",xmlns:"http://www.w3.org/2000/xmlns/",math:"http://www.w3.org/1998/Math/MathML"},Rv=/%COMP%/g;var GM="%COMP%",v1=`_nghost-${GM}`,y1=`_ngcontent-${GM}`,_1=!0,x1=new Pe("",{factory:()=>_1});function b1(n){return y1.replace(Rv,n)}function M1(n){return v1.replace(Rv,n)}function jM(n,e){return e.map(t=>t.replace(Rv,n))}var Nv=(()=>{class n{eventManager;sharedStylesHost;appId;removeStylesOnCompDestroy;doc;ngZone;nonce;tracingService;rendererByCompId=new Map;defaultRenderer;constructor(t,i,r,o,s,a,c=null,l=null){this.eventManager=t,this.sharedStylesHost=i,this.appId=r,this.removeStylesOnCompDestroy=o,this.doc=s,this.ngZone=a,this.nonce=c,this.tracingService=l,this.defaultRenderer=new Uc(t,s,a,this.tracingService)}createRenderer(t,i){if(!t||!i)return this.defaultRenderer;let r=this.getOrCreateRenderer(t,i);return r instanceof Wd?r.applyToHost(t):r instanceof Bc&&r.applyStyles(),r}getOrCreateRenderer(t,i){let r=this.rendererByCompId,o=r.get(i.id);if(!o){let s=this.doc,a=this.ngZone,c=this.eventManager,l=this.sharedStylesHost,u=this.removeStylesOnCompDestroy,d=this.tracingService;switch(i.encapsulation){case Ii.Emulated:o=new Wd(c,l,i,this.appId,u,s,a,d);break;case Ii.ShadowDom:return new jd(c,t,i,s,a,this.nonce,d,l);case Ii.ExperimentalIsolatedShadowDom:return new jd(c,t,i,s,a,this.nonce,d);default:o=new Bc(c,l,i,u,s,a,d);break}r.set(i.id,o)}return o}ngOnDestroy(){this.rendererByCompId.clear()}componentReplaced(t){this.rendererByCompId.delete(t)}static \u0275fac=function(i){return new(i||n)(Le(Iv),Le(Av),Le(yd),Le(x1),Le(Kt),Le(Ut),Le(xd),Le($s,8))};static \u0275prov=Ae({token:n,factory:n.\u0275fac})}return n})(),Uc=class{eventManager;doc;ngZone;tracingService;data=Object.create(null);throwOnSyntheticProps=!0;constructor(e,t,i,r){this.eventManager=e,this.doc=t,this.ngZone=i,this.tracingService=r}destroy(){}destroyNode=null;createElement(e,t){return t?this.doc.createElementNS(Tv[t]||t,e):this.doc.createElement(e)}createComment(e){return this.doc.createComment(e)}createText(e){return this.doc.createTextNode(e)}appendChild(e,t){(zM(e)?e.content:e).appendChild(t)}insertBefore(e,t,i){e&&(zM(e)?e.content:e).insertBefore(t,i)}removeChild(e,t){t.remove()}selectRootElement(e,t){let i=typeof e=="string"?this.doc.querySelector(e):e;if(!i)throw new _e(-5104,!1);return t||(i.textContent=""),i}parentNode(e){return e.parentNode}nextSibling(e){return e.nextSibling}setAttribute(e,t,i,r){if(r){t=r+":"+t;let o=Tv[r];o?e.setAttributeNS(o,t,i):e.setAttribute(t,i)}else e.setAttribute(t,i)}removeAttribute(e,t,i){if(i){let r=Tv[i];r?e.removeAttributeNS(r,t):e.removeAttribute(`${i}:${t}`)}else e.removeAttribute(t)}addClass(e,t){e.classList.add(t)}removeClass(e,t){e.classList.remove(t)}setStyle(e,t,i,r){r&(Ai.DashCase|Ai.Important)?e.style.setProperty(t,i,r&Ai.Important?"important":""):e.style[t]=i}removeStyle(e,t,i){i&Ai.DashCase?e.style.removeProperty(t):e.style[t]=""}setProperty(e,t,i){e!=null&&(e[t]=i)}setValue(e,t){e.nodeValue=t}listen(e,t,i,r){if(typeof e=="string"&&(e=gr().getGlobalEventTarget(this.doc,e),!e))throw new _e(5102,!1);let o=this.decoratePreventDefault(i);return this.tracingService?.wrapEventListener&&(o=this.tracingService.wrapEventListener(e,t,o)),this.eventManager.addEventListener(e,t,o,r)}decoratePreventDefault(e){return t=>{if(t==="__ngUnwrap__")return e;e(t)===!1&&t.preventDefault()}}};function zM(n){return n.tagName==="TEMPLATE"&&n.content!==void 0}var jd=class extends Uc{hostEl;sharedStylesHost;shadowRoot;constructor(e,t,i,r,o,s,a,c){super(e,r,o,a),this.hostEl=t,this.sharedStylesHost=c,this.shadowRoot=t.attachShadow({mode:"open"}),this.sharedStylesHost&&this.sharedStylesHost.addHost(this.shadowRoot);let l=i.styles;l=jM(i.id,l);for(let d of l){let f=document.createElement("style");s&&f.setAttribute("nonce",s),f.textContent=d,this.shadowRoot.appendChild(f)}let u=i.getExternalStyles?.();if(u)for(let d of u){let f=Dv(d,r);s&&f.setAttribute("nonce",s),this.shadowRoot.appendChild(f)}}nodeOrShadowRoot(e){return e===this.hostEl?this.shadowRoot:e}appendChild(e,t){return super.appendChild(this.nodeOrShadowRoot(e),t)}insertBefore(e,t,i){return super.insertBefore(this.nodeOrShadowRoot(e),t,i)}removeChild(e,t){return super.removeChild(null,t)}parentNode(e){return this.nodeOrShadowRoot(super.parentNode(this.nodeOrShadowRoot(e)))}destroy(){this.sharedStylesHost&&this.sharedStylesHost.removeHost(this.shadowRoot)}},Bc=class extends Uc{sharedStylesHost;removeStylesOnCompDestroy;styles;styleUrls;constructor(e,t,i,r,o,s,a,c){super(e,o,s,a),this.sharedStylesHost=t,this.removeStylesOnCompDestroy=r;let l=i.styles;this.styles=c?jM(c,l):l,this.styleUrls=i.getExternalStyles?.(c)}applyStyles(){this.sharedStylesHost.addStyles(this.styles,this.styleUrls)}destroy(){this.removeStylesOnCompDestroy&&zs.size===0&&this.sharedStylesHost.removeStyles(this.styles,this.styleUrls)}},Wd=class extends Bc{contentAttr;hostAttr;constructor(e,t,i,r,o,s,a,c){let l=r+"-"+i.id;super(e,t,i,o,s,a,c,l),this.contentAttr=b1(l),this.hostAttr=M1(l)}applyToHost(e){this.applyStyles(),this.setAttribute(e,this.hostAttr,"")}createElement(e,t){let i=super.createElement(e,t);return super.setAttribute(i,this.contentAttr,""),i}};var qd=class n extends Oc{supportsDOMEvents=!0;static makeCurrent(){bv(new n)}onAndCancel(e,t,i,r){return e.addEventListener(t,i,r),()=>{e.removeEventListener(t,i,r)}}dispatchEvent(e,t){e.dispatchEvent(t)}remove(e){e.remove()}createElement(e,t){return t=t||this.getDefaultDocument(),t.createElement(e)}createHtmlDocument(){return document.implementation.createHTMLDocument("fakeTitle")}getDefaultDocument(){return document}isElementNode(e){return e.nodeType===Node.ELEMENT_NODE}isShadowRoot(e){return e instanceof DocumentFragment}getGlobalEventTarget(e,t){return t==="window"?window:t==="document"?e:t==="body"?e.body:null}getBaseHref(e){let t=S1();return t==null?null:E1(t)}resetBaseElement(){Vc=null}getUserAgent(){return window.navigator.userAgent}getCookie(e){return wv(document.cookie,e)}},Vc=null;function S1(){return Vc=Vc||document.head.querySelector("base"),Vc?Vc.getAttribute("href"):null}function E1(n){return new URL(n,document.baseURI).pathname}var w1=(()=>{class n{build(){return new XMLHttpRequest}static \u0275fac=function(i){return new(i||n)};static \u0275prov=Ae({token:n,factory:n.\u0275fac})}return n})(),WM=["alt","control","meta","shift"],C1={"\b":"Backspace","	":"Tab","\x7F":"Delete","\x1B":"Escape",Del:"Delete",Esc:"Escape",Left:"ArrowLeft",Right:"ArrowRight",Up:"ArrowUp",Down:"ArrowDown",Menu:"ContextMenu",Scroll:"ScrollLock",Win:"OS"},T1={alt:n=>n.altKey,control:n=>n.ctrlKey,meta:n=>n.metaKey,shift:n=>n.shiftKey},$M=(()=>{class n extends kc{constructor(t){super(t)}supports(t){return n.parseEventName(t)!=null}addEventListener(t,i,r,o){let s=n.parseEventName(i),a=n.eventCallback(s.fullKey,r,this.manager.getZone());return this.manager.getZone().runOutsideAngular(()=>gr().onAndCancel(t,s.domEventName,a,o))}static parseEventName(t){let i=t.toLowerCase().split("."),r=i.shift();if(i.length===0||!(r==="keydown"||r==="keyup"))return null;let o=n._normalizeKey(i.pop()),s="",a=i.indexOf("code");if(a>-1&&(i.splice(a,1),s="code."),WM.forEach(l=>{let u=i.indexOf(l);u>-1&&(i.splice(u,1),s+=l+".")}),s+=o,i.length!=0||o.length===0)return null;let c={};return c.domEventName=r,c.fullKey=s,c}static matchEventFullKeyCode(t,i){let r=C1[t.key]||t.key,o="";return i.indexOf("code.")>-1&&(r=t.code,o="code."),r==null||!r?!1:(r=r.toLowerCase(),r===" "?r="space":r==="."&&(r="dot"),WM.forEach(s=>{if(s!==r){let a=T1[s];a(t)&&(o+=s+".")}}),o+=r,o===i)}static eventCallback(t,i,r){return o=>{n.matchEventFullKeyCode(o,t)&&r.runGuarded(()=>i(o))}}static _normalizeKey(t){return t==="esc"?"escape":t}static \u0275fac=function(i){return new(i||n)(Le(Kt))};static \u0275prov=Ae({token:n,factory:n.\u0275fac})}return n})();async function Pv(n,e,t){let i=ae({rootComponent:n},D1(e,t));return IM(i)}function D1(n,e){return{platformRef:e?.platformRef,appProviders:[...P1,...n?.providers??[]],platformProviders:N1}}function I1(){qd.makeCurrent()}function A1(){return new cr}function R1(){return Pg(document),document}var N1=[{provide:Tc,useValue:UM},{provide:_d,useValue:I1,multi:!0},{provide:Kt,useFactory:R1}];var P1=[{provide:lc,useValue:"root"},{provide:cr,useFactory:A1},{provide:$d,useClass:Gd,multi:!0},{provide:$d,useClass:$M,multi:!0},Nv,Av,Iv,{provide:qo,useExisting:Nv},{provide:Fc,useClass:w1},[]];var qM=(()=>{class n{_doc;constructor(t){this._doc=t}getTitle(){return this._doc.title}setTitle(t){this._doc.title=t||""}static \u0275fac=function(i){return new(i||n)(Le(Kt))};static \u0275prov=Ae({token:n,factory:n.\u0275fac,providedIn:"root"})}return n})();var je="primary",el=Symbol("RouteTitle"),Uv=class{params;constructor(e){this.params=e||{}}has(e){return Object.prototype.hasOwnProperty.call(this.params,e)}get(e){if(this.has(e)){let t=this.params[e];return Array.isArray(t)?t[0]:t}return null}getAll(e){if(this.has(e)){let t=this.params[e];return Array.isArray(t)?t:[t]}return[]}get keys(){return Object.keys(this.params)}};function Ko(n){return new Uv(n)}function Ov(n,e,t){for(let i=0;i<n.length;i++){let r=n[i],o=e[i];if(r[0]===":")t[r.substring(1)]=o;else if(r!==o.path)return!1}return!0}function tS(n,e,t){let i=t.path.split("/"),r=i.indexOf("**");if(r===-1){if(i.length>n.length||t.pathMatch==="full"&&(e.hasChildren()||i.length<n.length))return null;let c={},l=n.slice(0,i.length);return Ov(i,l,c)?{consumed:l,posParams:c}:null}if(r!==i.lastIndexOf("**"))return null;let o=i.slice(0,r),s=i.slice(r+1);if(o.length+s.length>n.length||t.pathMatch==="full"&&e.hasChildren()&&t.path!=="**")return null;let a={};return!Ov(o,n.slice(0,o.length),a)||!Ov(s,n.slice(n.length-s.length),a)?null:{consumed:n,posParams:a}}function Qd(n){return new Promise((e,t)=>{n.pipe(sr()).subscribe({next:i=>e(i),error:i=>t(i)})})}function L1(n,e){if(n.length!==e.length)return!1;for(let t=0;t<n.length;++t)if(!$i(n[t],e[t]))return!1;return!0}function $i(n,e){let t=n?Bv(n):void 0,i=e?Bv(e):void 0;if(!t||!i||t.length!=i.length)return!1;let r;for(let o=0;o<t.length;o++)if(r=t[o],!nS(n[r],e[r]))return!1;return!0}function Bv(n){return[...Object.keys(n),...Object.getOwnPropertySymbols(n)]}function nS(n,e){if(Array.isArray(n)&&Array.isArray(e)){if(n.length!==e.length)return!1;let t=[...n].sort(),i=[...e].sort();return t.every((r,o)=>i[o]===r)}else return n===e}function F1(n){return n.length>0?n[n.length-1]:null}function ts(n){return yu(n)?n:Xs(n)?Xt(Promise.resolve(n)):nt(n)}function iS(n){return yu(n)?Qd(n):Promise.resolve(n)}var k1={exact:sS,subset:aS},rS={exact:U1,subset:B1,ignored:()=>!0},oS={paths:"exact",fragment:"ignored",matrixParams:"ignored",queryParams:"exact"},Vv={paths:"subset",fragment:"ignored",matrixParams:"ignored",queryParams:"subset"};function XM(n,e,t){return k1[t.paths](n.root,e.root,t.matrixParams)&&rS[t.queryParams](n.queryParams,e.queryParams)&&!(t.fragment==="exact"&&n.fragment!==e.fragment)}function U1(n,e){return $i(n,e)}function sS(n,e,t){if(!Jo(n.segments,e.segments)||!Zd(n.segments,e.segments,t)||n.numberOfChildren!==e.numberOfChildren)return!1;for(let i in e.children)if(!n.children[i]||!sS(n.children[i],e.children[i],t))return!1;return!0}function B1(n,e){return Object.keys(e).length<=Object.keys(n).length&&Object.keys(e).every(t=>nS(n[t],e[t]))}function aS(n,e,t){return cS(n,e,e.segments,t)}function cS(n,e,t,i){if(n.segments.length>t.length){let r=n.segments.slice(0,t.length);return!(!Jo(r,t)||e.hasChildren()||!Zd(r,t,i))}else if(n.segments.length===t.length){if(!Jo(n.segments,t)||!Zd(n.segments,t,i))return!1;for(let r in e.children)if(!n.children[r]||!aS(n.children[r],e.children[r],i))return!1;return!0}else{let r=t.slice(0,n.segments.length),o=t.slice(n.segments.length);return!Jo(n.segments,r)||!Zd(n.segments,r,i)||!n.children[je]?!1:cS(n.children[je],e,o,i)}}function Zd(n,e,t){return e.every((i,r)=>rS[t](n[r].parameters,i.parameters))}var vi=class{root;queryParams;fragment;_queryParamMap;constructor(e=new ht([],{}),t={},i=null){this.root=e,this.queryParams=t,this.fragment=i}get queryParamMap(){return this._queryParamMap??=Ko(this.queryParams),this._queryParamMap}toString(){return z1.serialize(this)}},ht=class{segments;children;parent=null;constructor(e,t){this.segments=e,this.children=t,Object.values(t).forEach(i=>i.parent=this)}hasChildren(){return this.numberOfChildren>0}get numberOfChildren(){return Object.keys(this.children).length}toString(){return Jd(this)}},Qr=class{path;parameters;_parameterMap;constructor(e,t){this.path=e,this.parameters=t}get parameterMap(){return this._parameterMap??=Ko(this.parameters),this._parameterMap}toString(){return uS(this)}};function V1(n,e){return Jo(n,e)&&n.every((t,i)=>$i(t.parameters,e[i].parameters))}function Jo(n,e){return n.length!==e.length?!1:n.every((t,i)=>t.path===e[i].path)}function H1(n,e){let t=[];return Object.entries(n.children).forEach(([i,r])=>{i===je&&(t=t.concat(e(r,i)))}),Object.entries(n.children).forEach(([i,r])=>{i!==je&&(t=t.concat(e(r,i)))}),t}var tl=(()=>{class n{static \u0275fac=function(i){return new(i||n)};static \u0275prov=Ae({token:n,factory:()=>new eo,providedIn:"root"})}return n})(),eo=class{parse(e){let t=new zv(e);return new vi(t.parseRootSegment(),t.parseQueryParams(),t.parseFragment())}serialize(e){let t=`/${Hc(e.root,!0)}`,i=W1(e.queryParams),r=typeof e.fragment=="string"?`#${G1(e.fragment)}`:"";return`${t}${i}${r}`}},z1=new eo;function Jd(n){return n.segments.map(e=>uS(e)).join("/")}function Hc(n,e){if(!n.hasChildren())return Jd(n);if(e){let t=n.children[je]?Hc(n.children[je],!1):"",i=[];return Object.entries(n.children).forEach(([r,o])=>{r!==je&&i.push(`${r}:${Hc(o,!1)}`)}),i.length>0?`${t}(${i.join("//")})`:t}else{let t=H1(n,(i,r)=>r===je?[Hc(n.children[je],!1)]:[`${r}:${Hc(i,!1)}`]);return Object.keys(n.children).length===1&&n.children[je]!=null?`${Jd(n)}/${t[0]}`:`${Jd(n)}/(${t.join("//")})`}}function lS(n){return encodeURIComponent(n).replace(/%40/g,"@").replace(/%3A/gi,":").replace(/%24/g,"$").replace(/%2C/gi,",")}function Xd(n){return lS(n).replace(/%3B/gi,";")}function G1(n){return encodeURI(n)}function Hv(n){return lS(n).replace(/\(/g,"%28").replace(/\)/g,"%29").replace(/%26/gi,"&")}function Kd(n){return decodeURIComponent(n)}function YM(n){return Kd(n.replace(/\+/g,"%20"))}function uS(n){return`${Hv(n.path)}${j1(n.parameters)}`}function j1(n){return Object.entries(n).map(([e,t])=>`;${Hv(e)}=${Hv(t)}`).join("")}function W1(n){let e=Object.entries(n).map(([t,i])=>Array.isArray(i)?i.map(r=>`${Xd(t)}=${Xd(r)}`).join("&"):`${Xd(t)}=${Xd(i)}`).filter(t=>t);return e.length?`?${e.join("&")}`:""}var $1=/^[^\/()?;#]+/;function Lv(n){let e=n.match($1);return e?e[0]:""}var q1=/^[^\/()?;=#]+/;function X1(n){let e=n.match(q1);return e?e[0]:""}var Y1=/^[^=?&#]+/;function Z1(n){let e=n.match(Y1);return e?e[0]:""}var J1=/^[^&#]+/;function K1(n){let e=n.match(J1);return e?e[0]:""}var zv=class{url;remaining;constructor(e){this.url=e,this.remaining=e}parseRootSegment(){return this.consumeOptional("/"),this.remaining===""||this.peekStartsWith("?")||this.peekStartsWith("#")?new ht([],{}):new ht([],this.parseChildren())}parseQueryParams(){let e={};if(this.consumeOptional("?"))do this.parseQueryParam(e);while(this.consumeOptional("&"));return e}parseFragment(){return this.consumeOptional("#")?decodeURIComponent(this.remaining):null}parseChildren(e=0){if(e>50)throw new _e(4010,!1);if(this.remaining==="")return{};this.consumeOptional("/");let t=[];for(this.peekStartsWith("(")||t.push(this.parseSegment());this.peekStartsWith("/")&&!this.peekStartsWith("//")&&!this.peekStartsWith("/(");)this.capture("/"),t.push(this.parseSegment());let i={};this.peekStartsWith("/(")&&(this.capture("/"),i=this.parseParens(!0,e));let r={};return this.peekStartsWith("(")&&(r=this.parseParens(!1,e)),(t.length>0||Object.keys(i).length>0)&&(r[je]=new ht(t,i)),r}parseSegment(){let e=Lv(this.remaining);if(e===""&&this.peekStartsWith(";"))throw new _e(4009,!1);return this.capture(e),new Qr(Kd(e),this.parseMatrixParams())}parseMatrixParams(){let e={};for(;this.consumeOptional(";");)this.parseParam(e);return e}parseParam(e){let t=X1(this.remaining);if(!t)return;this.capture(t);let i="";if(this.consumeOptional("=")){let r=Lv(this.remaining);r&&(i=r,this.capture(i))}e[Kd(t)]=Kd(i)}parseQueryParam(e){let t=Z1(this.remaining);if(!t)return;this.capture(t);let i="";if(this.consumeOptional("=")){let s=K1(this.remaining);s&&(i=s,this.capture(i))}let r=YM(t),o=YM(i);if(e.hasOwnProperty(r)){let s=e[r];Array.isArray(s)||(s=[s],e[r]=s),s.push(o)}else e[r]=o}parseParens(e,t){let i={};for(this.capture("(");!this.consumeOptional(")")&&this.remaining.length>0;){let r=Lv(this.remaining),o=this.remaining[r.length];if(o!=="/"&&o!==")"&&o!==";")throw new _e(4010,!1);let s;r.indexOf(":")>-1?(s=r.slice(0,r.indexOf(":")),this.capture(s),this.capture(":")):e&&(s=je);let a=this.parseChildren(t+1);i[s??je]=Object.keys(a).length===1&&a[je]?a[je]:new ht([],a),this.consumeOptional("//")}return i}peekStartsWith(e){return this.remaining.startsWith(e)}consumeOptional(e){return this.peekStartsWith(e)?(this.remaining=this.remaining.substring(e.length),!0):!1}capture(e){if(!this.consumeOptional(e))throw new _e(4011,!1)}};function dS(n){return n.segments.length>0?new ht([],{[je]:n}):n}function fS(n){let e={};for(let[i,r]of Object.entries(n.children)){let o=fS(r);if(i===je&&o.segments.length===0&&o.hasChildren())for(let[s,a]of Object.entries(o.children))e[s]=a;else(o.segments.length>0||o.hasChildren())&&(e[i]=o)}let t=new ht(n.segments,e);return Q1(t)}function Q1(n){if(n.numberOfChildren===1&&n.children[je]){let e=n.children[je];return new ht(n.segments.concat(e.segments),e.children)}return n}function sa(n){return n instanceof vi}function hS(n,e,t=null,i=null,r=new eo){let o=pS(n);return mS(o,e,t,i,r)}function pS(n){let e;function t(o){let s={};for(let c of o.children){let l=t(c);s[c.outlet]=l}let a=new ht(o.url,s);return o===n&&(e=a),a}let i=t(n.root),r=dS(i);return e??r}function mS(n,e,t,i,r){let o=n;for(;o.parent;)o=o.parent;if(e.length===0)return Fv(o,o,o,t,i,r);let s=eR(e);if(s.toRoot())return Fv(o,o,new ht([],{}),t,i,r);let a=tR(s,o,n),c=a.processChildren?Gc(a.segmentGroup,a.index,s.commands):vS(a.segmentGroup,a.index,s.commands);return Fv(o,a.segmentGroup,c,t,i,r)}function ef(n){return typeof n=="object"&&n!=null&&!n.outlets&&!n.segmentPath}function $c(n){return typeof n=="object"&&n!=null&&n.outlets}function ZM(n,e,t){n||="\u0275";let i=new vi;return i.queryParams={[n]:e},t.parse(t.serialize(i)).queryParams[n]}function Fv(n,e,t,i,r,o){let s={};for(let[l,u]of Object.entries(i??{}))s[l]=Array.isArray(u)?u.map(d=>ZM(l,d,o)):ZM(l,u,o);let a;n===e?a=t:a=gS(n,e,t);let c=dS(fS(a));return new vi(c,s,r)}function gS(n,e,t){let i={};return Object.entries(n.children).forEach(([r,o])=>{o===e?i[r]=t:i[r]=gS(o,e,t)}),new ht(n.segments,i)}var tf=class{isAbsolute;numberOfDoubleDots;commands;constructor(e,t,i){if(this.isAbsolute=e,this.numberOfDoubleDots=t,this.commands=i,e&&i.length>0&&ef(i[0]))throw new _e(4003,!1);let r=i.find($c);if(r&&r!==F1(i))throw new _e(4004,!1)}toRoot(){return this.isAbsolute&&this.commands.length===1&&this.commands[0]=="/"}};function eR(n){if(typeof n[0]=="string"&&n.length===1&&n[0]==="/")return new tf(!0,0,n);let e=0,t=!1,i=n.reduce((r,o,s)=>{if(typeof o=="object"&&o!=null){if(o.outlets){let a={};return Object.entries(o.outlets).forEach(([c,l])=>{a[c]=typeof l=="string"?l.split("/"):l}),[...r,{outlets:a}]}if(o.segmentPath)return[...r,o.segmentPath]}return typeof o!="string"?[...r,o]:s===0?(o.split("/").forEach((a,c)=>{c==0&&a==="."||(c==0&&a===""?t=!0:a===".."?e++:a!=""&&r.push(a))}),r):[...r,o]},[]);return new tf(t,e,i)}var ra=class{segmentGroup;processChildren;index;constructor(e,t,i){this.segmentGroup=e,this.processChildren=t,this.index=i}};function tR(n,e,t){if(n.isAbsolute)return new ra(e,!0,0);if(!t)return new ra(e,!1,NaN);if(t.parent===null)return new ra(t,!0,0);let i=ef(n.commands[0])?0:1,r=t.segments.length-1+i;return nR(t,r,n.numberOfDoubleDots)}function nR(n,e,t){let i=n,r=e,o=t;for(;o>r;){if(o-=r,i=i.parent,!i)throw new _e(4005,!1);r=i.segments.length}return new ra(i,!1,r-o)}function iR(n){return $c(n[0])?n[0].outlets:{[je]:n}}function vS(n,e,t){if(n??=new ht([],{}),n.segments.length===0&&n.hasChildren())return Gc(n,e,t);let i=rR(n,e,t),r=t.slice(i.commandIndex);if(i.match&&i.pathIndex<n.segments.length){let o=new ht(n.segments.slice(0,i.pathIndex),{});return o.children[je]=new ht(n.segments.slice(i.pathIndex),n.children),Gc(o,0,r)}else return i.match&&r.length===0?new ht(n.segments,{}):i.match&&!n.hasChildren()?Gv(n,e,t):i.match?Gc(n,0,r):Gv(n,e,t)}function Gc(n,e,t){if(t.length===0)return new ht(n.segments,{});{let i=iR(t),r={};if(Object.keys(i).some(o=>o!==je)&&n.children[je]&&n.numberOfChildren===1&&n.children[je].segments.length===0){let o=Gc(n.children[je],e,t);return new ht(n.segments,o.children)}return Object.entries(i).forEach(([o,s])=>{typeof s=="string"&&(s=[s]),s!==null&&(r[o]=vS(n.children[o],e,s))}),Object.entries(n.children).forEach(([o,s])=>{i[o]===void 0&&(r[o]=s)}),new ht(n.segments,r)}}function rR(n,e,t){let i=0,r=e,o={match:!1,pathIndex:0,commandIndex:0};for(;r<n.segments.length;){if(i>=t.length)return o;let s=n.segments[r],a=t[i];if($c(a))break;let c=`${a}`,l=i<t.length-1?t[i+1]:null;if(r>0&&c===void 0)break;if(c&&l&&typeof l=="object"&&l.outlets===void 0){if(!KM(c,l,s))return o;i+=2}else{if(!KM(c,{},s))return o;i++}r++}return{match:!0,pathIndex:r,commandIndex:i}}function Gv(n,e,t){let i=n.segments.slice(0,e),r=0;for(;r<t.length;){let o=t[r];if($c(o)){let c=oR(o.outlets);return new ht(i,c)}if(r===0&&ef(t[0])){let c=n.segments[e];i.push(new Qr(c.path,JM(t[0]))),r++;continue}let s=$c(o)?o.outlets[je]:`${o}`,a=r<t.length-1?t[r+1]:null;s&&a&&ef(a)?(i.push(new Qr(s,JM(a))),r+=2):(i.push(new Qr(s,{})),r++)}return new ht(i,{})}function oR(n){let e={};return Object.entries(n).forEach(([t,i])=>{typeof i=="string"&&(i=[i]),i!==null&&(e[t]=Gv(new ht([],{}),0,i))}),e}function JM(n){let e={};return Object.entries(n).forEach(([t,i])=>e[t]=`${i}`),e}function KM(n,e,t){return n==t.path&&$i(e,t.parameters)}var jc="imperative",an=(function(n){return n[n.NavigationStart=0]="NavigationStart",n[n.NavigationEnd=1]="NavigationEnd",n[n.NavigationCancel=2]="NavigationCancel",n[n.NavigationError=3]="NavigationError",n[n.RoutesRecognized=4]="RoutesRecognized",n[n.ResolveStart=5]="ResolveStart",n[n.ResolveEnd=6]="ResolveEnd",n[n.GuardsCheckStart=7]="GuardsCheckStart",n[n.GuardsCheckEnd=8]="GuardsCheckEnd",n[n.RouteConfigLoadStart=9]="RouteConfigLoadStart",n[n.RouteConfigLoadEnd=10]="RouteConfigLoadEnd",n[n.ChildActivationStart=11]="ChildActivationStart",n[n.ChildActivationEnd=12]="ChildActivationEnd",n[n.ActivationStart=13]="ActivationStart",n[n.ActivationEnd=14]="ActivationEnd",n[n.Scroll=15]="Scroll",n[n.NavigationSkipped=16]="NavigationSkipped",n})(an||{}),Qn=class{id;url;constructor(e,t){this.id=e,this.url=t}},Qo=class extends Qn{type=an.NavigationStart;navigationTrigger;restoredState;constructor(e,t,i="imperative",r=null){super(e,t),this.navigationTrigger=i,this.restoredState=r}toString(){return`NavigationStart(id: ${this.id}, url: '${this.url}')`}},yr=class extends Qn{urlAfterRedirects;type=an.NavigationEnd;constructor(e,t,i){super(e,t),this.urlAfterRedirects=i}toString(){return`NavigationEnd(id: ${this.id}, url: '${this.url}', urlAfterRedirects: '${this.urlAfterRedirects}')`}},bn=(function(n){return n[n.Redirect=0]="Redirect",n[n.SupersededByNewNavigation=1]="SupersededByNewNavigation",n[n.NoDataFromResolver=2]="NoDataFromResolver",n[n.GuardRejected=3]="GuardRejected",n[n.Aborted=4]="Aborted",n})(bn||{}),qc=(function(n){return n[n.IgnoredSameUrlNavigation=0]="IgnoredSameUrlNavigation",n[n.IgnoredByUrlHandlingStrategy=1]="IgnoredByUrlHandlingStrategy",n})(qc||{}),gi=class extends Qn{reason;code;type=an.NavigationCancel;constructor(e,t,i,r){super(e,t),this.reason=i,this.code=r}toString(){return`NavigationCancel(id: ${this.id}, url: '${this.url}')`}};function yS(n){return n instanceof gi&&(n.code===bn.Redirect||n.code===bn.SupersededByNewNavigation)}var _r=class extends Qn{reason;code;type=an.NavigationSkipped;constructor(e,t,i,r){super(e,t),this.reason=i,this.code=r}},es=class extends Qn{error;target;type=an.NavigationError;constructor(e,t,i,r){super(e,t),this.error=i,this.target=r}toString(){return`NavigationError(id: ${this.id}, url: '${this.url}', error: ${this.error})`}},Xc=class extends Qn{urlAfterRedirects;state;type=an.RoutesRecognized;constructor(e,t,i,r){super(e,t),this.urlAfterRedirects=i,this.state=r}toString(){return`RoutesRecognized(id: ${this.id}, url: '${this.url}', urlAfterRedirects: '${this.urlAfterRedirects}', state: ${this.state})`}},nf=class extends Qn{urlAfterRedirects;state;type=an.GuardsCheckStart;constructor(e,t,i,r){super(e,t),this.urlAfterRedirects=i,this.state=r}toString(){return`GuardsCheckStart(id: ${this.id}, url: '${this.url}', urlAfterRedirects: '${this.urlAfterRedirects}', state: ${this.state})`}},rf=class extends Qn{urlAfterRedirects;state;shouldActivate;type=an.GuardsCheckEnd;constructor(e,t,i,r,o){super(e,t),this.urlAfterRedirects=i,this.state=r,this.shouldActivate=o}toString(){return`GuardsCheckEnd(id: ${this.id}, url: '${this.url}', urlAfterRedirects: '${this.urlAfterRedirects}', state: ${this.state}, shouldActivate: ${this.shouldActivate})`}},of=class extends Qn{urlAfterRedirects;state;type=an.ResolveStart;constructor(e,t,i,r){super(e,t),this.urlAfterRedirects=i,this.state=r}toString(){return`ResolveStart(id: ${this.id}, url: '${this.url}', urlAfterRedirects: '${this.urlAfterRedirects}', state: ${this.state})`}},sf=class extends Qn{urlAfterRedirects;state;type=an.ResolveEnd;constructor(e,t,i,r){super(e,t),this.urlAfterRedirects=i,this.state=r}toString(){return`ResolveEnd(id: ${this.id}, url: '${this.url}', urlAfterRedirects: '${this.urlAfterRedirects}', state: ${this.state})`}},af=class{route;type=an.RouteConfigLoadStart;constructor(e){this.route=e}toString(){return`RouteConfigLoadStart(path: ${this.route.path})`}},cf=class{route;type=an.RouteConfigLoadEnd;constructor(e){this.route=e}toString(){return`RouteConfigLoadEnd(path: ${this.route.path})`}},lf=class{snapshot;type=an.ChildActivationStart;constructor(e){this.snapshot=e}toString(){return`ChildActivationStart(path: '${this.snapshot.routeConfig&&this.snapshot.routeConfig.path||""}')`}},uf=class{snapshot;type=an.ChildActivationEnd;constructor(e){this.snapshot=e}toString(){return`ChildActivationEnd(path: '${this.snapshot.routeConfig&&this.snapshot.routeConfig.path||""}')`}},df=class{snapshot;type=an.ActivationStart;constructor(e){this.snapshot=e}toString(){return`ActivationStart(path: '${this.snapshot.routeConfig&&this.snapshot.routeConfig.path||""}')`}},ff=class{snapshot;type=an.ActivationEnd;constructor(e){this.snapshot=e}toString(){return`ActivationEnd(path: '${this.snapshot.routeConfig&&this.snapshot.routeConfig.path||""}')`}};var aa=class{},Yc=class{},ca=class{url;navigationBehaviorOptions;constructor(e,t){this.url=e,this.navigationBehaviorOptions=t}};function sR(n){return!(n instanceof aa)&&!(n instanceof ca)&&!(n instanceof Yc)}var hf=class{rootInjector;outlet=null;route=null;children;attachRef=null;get injector(){return this.route?.snapshot._environmentInjector??this.rootInjector}constructor(e){this.rootInjector=e,this.children=new fa(this.rootInjector)}},fa=(()=>{class n{rootInjector;contexts=new Map;constructor(t){this.rootInjector=t}onChildOutletCreated(t,i){let r=this.getOrCreateContext(t);r.outlet=i,this.contexts.set(t,r)}onChildOutletDestroyed(t){let i=this.getContext(t);i&&(i.outlet=null,i.attachRef=null)}onOutletDeactivated(){let t=this.contexts;return this.contexts=new Map,t}onOutletReAttached(t){this.contexts=t}getOrCreateContext(t){let i=this.getContext(t);return i||(i=new hf(this.rootInjector),this.contexts.set(t,i)),i}getContext(t){return this.contexts.get(t)||null}static \u0275fac=function(i){return new(i||n)(Le(Jt))};static \u0275prov=Ae({token:n,factory:n.\u0275fac,providedIn:"root"})}return n})(),pf=class{_root;constructor(e){this._root=e}get root(){return this._root.value}parent(e){let t=this.pathFromRoot(e);return t.length>1?t[t.length-2]:null}children(e){let t=jv(e,this._root);return t?t.children.map(i=>i.value):[]}firstChild(e){let t=jv(e,this._root);return t&&t.children.length>0?t.children[0].value:null}siblings(e){let t=Wv(e,this._root);return t.length<2?[]:t[t.length-2].children.map(r=>r.value).filter(r=>r!==e)}pathFromRoot(e){return Wv(e,this._root).map(t=>t.value)}};function jv(n,e){if(n===e.value)return e;for(let t of e.children){let i=jv(n,t);if(i)return i}return null}function Wv(n,e){if(n===e.value)return[e];for(let t of e.children){let i=Wv(n,t);if(i.length)return i.unshift(e),i}return[]}var Kn=class{value;children;constructor(e,t){this.value=e,this.children=t}toString(){return`TreeNode(${this.value})`}};function ia(n){let e={};return n&&n.children.forEach(t=>e[t.value.outlet]=t),e}var Zc=class extends pf{snapshot;constructor(e,t){super(e),this.snapshot=t,ey(this,e)}toString(){return this.snapshot.toString()}};function _S(n,e){let t=aR(n,e),i=new hn([new Qr("",{})]),r=new hn({}),o=new hn({}),s=new hn({}),a=new hn(""),c=new to(i,r,s,a,o,je,n,t.root);return c.snapshot=t.root,new Zc(new Kn(c,[]),t)}function aR(n,e){let t={},i={},r={},s=new la([],t,r,"",i,je,n,null,{},e);return new Jc("",new Kn(s,[]))}var to=class{urlSubject;paramsSubject;queryParamsSubject;fragmentSubject;dataSubject;outlet;component;snapshot;_futureSnapshot;_routerState;_paramMap;_queryParamMap;title;url;params;queryParams;fragment;data;constructor(e,t,i,r,o,s,a,c){this.urlSubject=e,this.paramsSubject=t,this.queryParamsSubject=i,this.fragmentSubject=r,this.dataSubject=o,this.outlet=s,this.component=a,this._futureSnapshot=c,this.title=this.dataSubject?.pipe(Mt(l=>l[el]))??nt(void 0),this.url=e,this.params=t,this.queryParams=i,this.fragment=r,this.data=o}get routeConfig(){return this._futureSnapshot.routeConfig}get root(){return this._routerState.root}get parent(){return this._routerState.parent(this)}get firstChild(){return this._routerState.firstChild(this)}get children(){return this._routerState.children(this)}get pathFromRoot(){return this._routerState.pathFromRoot(this)}get paramMap(){return this._paramMap??=this.params.pipe(Mt(e=>Ko(e))),this._paramMap}get queryParamMap(){return this._queryParamMap??=this.queryParams.pipe(Mt(e=>Ko(e))),this._queryParamMap}toString(){return this.snapshot?this.snapshot.toString():`Future(${this._futureSnapshot})`}};function Qv(n,e,t="emptyOnly"){let i,{routeConfig:r}=n;return e!==null&&(t==="always"||r?.path===""||!e.component&&!e.routeConfig?.loadComponent)?i={params:ae(ae({},e.params),n.params),data:ae(ae({},e.data),n.data),resolve:ae(ae(ae(ae({},n.data),e.data),r?.data),n._resolvedData)}:i={params:ae({},n.params),data:ae({},n.data),resolve:ae(ae({},n.data),n._resolvedData??{})},r&&bS(r)&&(i.resolve[el]=r.title),i}var la=class{url;params;queryParams;fragment;data;outlet;component;routeConfig;_resolve;_resolvedData;_routerState;_paramMap;_queryParamMap;_environmentInjector;get title(){return this.data?.[el]}constructor(e,t,i,r,o,s,a,c,l,u){this.url=e,this.params=t,this.queryParams=i,this.fragment=r,this.data=o,this.outlet=s,this.component=a,this.routeConfig=c,this._resolve=l,this._environmentInjector=u}get root(){return this._routerState.root}get parent(){return this._routerState.parent(this)}get firstChild(){return this._routerState.firstChild(this)}get children(){return this._routerState.children(this)}get pathFromRoot(){return this._routerState.pathFromRoot(this)}get paramMap(){return this._paramMap??=Ko(this.params),this._paramMap}get queryParamMap(){return this._queryParamMap??=Ko(this.queryParams),this._queryParamMap}toString(){let e=this.url.map(i=>i.toString()).join("/"),t=this.routeConfig?this.routeConfig.path:"";return`Route(url:'${e}', path:'${t}')`}},Jc=class extends pf{url;constructor(e,t){super(t),this.url=e,ey(this,t)}toString(){return xS(this._root)}};function ey(n,e){e.value._routerState=n,e.children.forEach(t=>ey(n,t))}function xS(n){let e=n.children.length>0?` { ${n.children.map(xS).join(", ")} } `:"";return`${n.value}${e}`}function kv(n){if(n.snapshot){let e=n.snapshot,t=n._futureSnapshot;n.snapshot=t,$i(e.queryParams,t.queryParams)||n.queryParamsSubject.next(t.queryParams),e.fragment!==t.fragment&&n.fragmentSubject.next(t.fragment),$i(e.params,t.params)||n.paramsSubject.next(t.params),L1(e.url,t.url)||n.urlSubject.next(t.url),$i(e.data,t.data)||n.dataSubject.next(t.data)}else n.snapshot=n._futureSnapshot,n.dataSubject.next(n._futureSnapshot.data)}function $v(n,e){let t=$i(n.params,e.params)&&V1(n.url,e.url),i=!n.parent!=!e.parent;return t&&!i&&(!n.parent||$v(n.parent,e.parent))}function bS(n){return typeof n.title=="string"||n.title===null}var MS=new Pe(""),nl=(()=>{class n{activated=null;get activatedComponentRef(){return this.activated}_activatedRoute=null;name=je;activateEvents=new kt;deactivateEvents=new kt;attachEvents=new kt;detachEvents=new kt;routerOutletData=TM();parentContexts=Q(fa);location=Q(pr);changeDetector=Q(yv);inputBinder=Q(yf,{optional:!0});supportsBindingToComponentInputs=!0;ngOnChanges(t){if(t.name){let{firstChange:i,previousValue:r}=t.name;if(i)return;this.isTrackedInParentContexts(r)&&(this.deactivate(),this.parentContexts.onChildOutletDestroyed(r)),this.initializeOutletWithName()}}ngOnDestroy(){this.isTrackedInParentContexts(this.name)&&this.parentContexts.onChildOutletDestroyed(this.name),this.inputBinder?.unsubscribeFromRouteData(this)}isTrackedInParentContexts(t){return this.parentContexts.getContext(t)?.outlet===this}ngOnInit(){this.initializeOutletWithName()}initializeOutletWithName(){if(this.parentContexts.onChildOutletCreated(this.name,this),this.activated)return;let t=this.parentContexts.getContext(this.name);t?.route&&(t.attachRef?this.attach(t.attachRef,t.route):this.activateWith(t.route,t.injector))}get isActivated(){return!!this.activated}get component(){if(!this.activated)throw new _e(4012,!1);return this.activated.instance}get activatedRoute(){if(!this.activated)throw new _e(4012,!1);return this._activatedRoute}get activatedRouteData(){return this._activatedRoute?this._activatedRoute.snapshot.data:{}}detach(){if(!this.activated)throw new _e(4012,!1);this.location.detach();let t=this.activated;return this.activated=null,this._activatedRoute=null,this.detachEvents.emit(t.instance),t}attach(t,i){this.activated=t,this._activatedRoute=i,this.location.insert(t.hostView),this.inputBinder?.bindActivatedRouteToOutletComponent(this),this.attachEvents.emit(t.instance)}deactivate(){if(this.activated){let t=this.component;this.activated.destroy(),this.activated=null,this._activatedRoute=null,this.deactivateEvents.emit(t)}}activateWith(t,i){if(this.isActivated)throw new _e(4013,!1);this._activatedRoute=t;let r=this.location,s=t.snapshot.component,a=this.parentContexts.getOrCreateContext(this.name).children,c=new qv(t,a,r.injector,this.routerOutletData);this.activated=r.createComponent(s,{index:r.length,injector:c,environmentInjector:i}),this.changeDetector.markForCheck(),this.inputBinder?.bindActivatedRouteToOutletComponent(this),this.activateEvents.emit(this.activated.instance)}static \u0275fac=function(i){return new(i||n)};static \u0275dir=Xr({type:n,selectors:[["router-outlet"]],inputs:{name:"name",routerOutletData:[1,"routerOutletData"]},outputs:{activateEvents:"activate",deactivateEvents:"deactivate",attachEvents:"attach",detachEvents:"detach"},exportAs:["outlet"],features:[gd]})}return n})(),qv=class{route;childContexts;parent;outletData;constructor(e,t,i,r){this.route=e,this.childContexts=t,this.parent=i,this.outletData=r}get(e,t){return e===to?this.route:e===fa?this.childContexts:e===MS?this.outletData:this.parent.get(e,t)}},yf=new Pe("");var ty=(()=>{class n{static \u0275fac=function(i){return new(i||n)};static \u0275cmp=Ri({type:n,selectors:[["ng-component"]],exportAs:["emptyRouterOutlet"],decls:1,vars:0,template:function(i,r){i&1&&Wn(0,"router-outlet")},dependencies:[nl],encapsulation:2})}return n})();function ny(n){let e=n.children&&n.children.map(ny),t=e?it(ae({},n),{children:e}):ae({},n);return!t.component&&!t.loadComponent&&(e||t.loadChildren)&&t.outlet&&t.outlet!==je&&(t.component=ty),t}function cR(n,e,t){let i=Kc(n,e._root,t?t._root:void 0);return new Zc(i,e)}function Kc(n,e,t){if(t&&n.shouldReuseRoute(e.value,t.value.snapshot)){let i=t.value;i._futureSnapshot=e.value;let r=lR(n,e,t);return new Kn(i,r)}else{if(n.shouldAttach(e.value)){let o=n.retrieve(e.value);if(o!==null){let s=o.route;return s.value._futureSnapshot=e.value,s.children=e.children.map(a=>Kc(n,a)),s}}let i=uR(e.value),r=e.children.map(o=>Kc(n,o));return new Kn(i,r)}}function lR(n,e,t){return e.children.map(i=>{for(let r of t.children)if(n.shouldReuseRoute(i.value,r.value.snapshot))return Kc(n,i,r);return Kc(n,i)})}function uR(n){return new to(new hn(n.url),new hn(n.params),new hn(n.queryParams),new hn(n.fragment),new hn(n.data),n.outlet,n.component,n)}var ua=class{redirectTo;navigationBehaviorOptions;constructor(e,t){this.redirectTo=e,this.navigationBehaviorOptions=t}},SS="ngNavigationCancelingError";function mf(n,e){let{redirectTo:t,navigationBehaviorOptions:i}=sa(e)?{redirectTo:e,navigationBehaviorOptions:void 0}:e,r=ES(!1,bn.Redirect);return r.url=t,r.navigationBehaviorOptions=i,r}function ES(n,e){let t=new Error(`NavigationCancelingError: ${n||""}`);return t[SS]=!0,t.cancellationCode=e,t}function dR(n){return wS(n)&&sa(n.url)}function wS(n){return!!n&&n[SS]}var Xv=class{routeReuseStrategy;futureState;currState;forwardEvent;inputBindingEnabled;constructor(e,t,i,r,o){this.routeReuseStrategy=e,this.futureState=t,this.currState=i,this.forwardEvent=r,this.inputBindingEnabled=o}activate(e){let t=this.futureState._root,i=this.currState?this.currState._root:null;this.deactivateChildRoutes(t,i,e),kv(this.futureState.root),this.activateChildRoutes(t,i,e)}deactivateChildRoutes(e,t,i){let r=ia(t);e.children.forEach(o=>{let s=o.value.outlet;this.deactivateRoutes(o,r[s],i),delete r[s]}),Object.values(r).forEach(o=>{this.deactivateRouteAndItsChildren(o,i)})}deactivateRoutes(e,t,i){let r=e.value,o=t?t.value:null;if(r===o)if(r.component){let s=i.getContext(r.outlet);s&&this.deactivateChildRoutes(e,t,s.children)}else this.deactivateChildRoutes(e,t,i);else o&&this.deactivateRouteAndItsChildren(t,i)}deactivateRouteAndItsChildren(e,t){e.value.component&&this.routeReuseStrategy.shouldDetach(e.value.snapshot)?this.detachAndStoreRouteSubtree(e,t):this.deactivateRouteAndOutlet(e,t)}detachAndStoreRouteSubtree(e,t){let i=t.getContext(e.value.outlet),r=i&&e.value.component?i.children:t,o=ia(e);for(let s of Object.values(o))this.deactivateRouteAndItsChildren(s,r);if(i&&i.outlet){let s=i.outlet.detach(),a=i.children.onOutletDeactivated();this.routeReuseStrategy.store(e.value.snapshot,{componentRef:s,route:e,contexts:a})}}deactivateRouteAndOutlet(e,t){let i=t.getContext(e.value.outlet),r=i&&e.value.component?i.children:t,o=ia(e);for(let s of Object.values(o))this.deactivateRouteAndItsChildren(s,r);i&&(i.outlet&&(i.outlet.deactivate(),i.children.onOutletDeactivated()),i.attachRef=null,i.route=null)}activateChildRoutes(e,t,i){let r=ia(t);e.children.forEach(o=>{this.activateRoutes(o,r[o.value.outlet],i),this.forwardEvent(new ff(o.value.snapshot))}),e.children.length&&this.forwardEvent(new uf(e.value.snapshot))}activateRoutes(e,t,i){let r=e.value,o=t?t.value:null;if(kv(r),r===o)if(r.component){let s=i.getOrCreateContext(r.outlet);this.activateChildRoutes(e,t,s.children)}else this.activateChildRoutes(e,t,i);else if(r.component){let s=i.getOrCreateContext(r.outlet);if(this.routeReuseStrategy.shouldAttach(r.snapshot)){let a=this.routeReuseStrategy.retrieve(r.snapshot);this.routeReuseStrategy.store(r.snapshot,null),s.children.onOutletReAttached(a.contexts),s.attachRef=a.componentRef,s.route=a.route.value,s.outlet&&s.outlet.attach(a.componentRef,a.route.value),kv(a.route.value),this.activateChildRoutes(e,null,s.children)}else s.attachRef=null,s.route=r,s.outlet&&s.outlet.activateWith(r,s.injector),this.activateChildRoutes(e,null,s.children)}else this.activateChildRoutes(e,null,i)}},gf=class{path;route;constructor(e){this.path=e,this.route=this.path[this.path.length-1]}},oa=class{component;route;constructor(e,t){this.component=e,this.route=t}};function fR(n,e,t){let i=n._root,r=e?e._root:null;return zc(i,r,t,[i.value])}function hR(n){let e=n.routeConfig?n.routeConfig.canActivateChild:null;return!e||e.length===0?null:{node:n,guards:e}}function ha(n,e){let t=Symbol(),i=e.get(n,t);return i===t?typeof n=="function"&&!pm(n)?n:e.get(n):i}function zc(n,e,t,i,r={canDeactivateChecks:[],canActivateChecks:[]}){let o=ia(e);return n.children.forEach(s=>{pR(s,o[s.value.outlet],t,i.concat([s.value]),r),delete o[s.value.outlet]}),Object.entries(o).forEach(([s,a])=>Wc(a,t.getContext(s),r)),r}function pR(n,e,t,i,r={canDeactivateChecks:[],canActivateChecks:[]}){let o=n.value,s=e?e.value:null,a=t?t.getContext(n.value.outlet):null;if(s&&o.routeConfig===s.routeConfig){let c=mR(s,o,o.routeConfig.runGuardsAndResolvers);c?r.canActivateChecks.push(new gf(i)):(o.data=s.data,o._resolvedData=s._resolvedData),o.component?zc(n,e,a?a.children:null,i,r):zc(n,e,t,i,r),c&&a&&a.outlet&&a.outlet.isActivated&&r.canDeactivateChecks.push(new oa(a.outlet.component,s))}else s&&Wc(e,a,r),r.canActivateChecks.push(new gf(i)),o.component?zc(n,null,a?a.children:null,i,r):zc(n,null,t,i,r);return r}function mR(n,e,t){if(typeof t=="function")return _n(e._environmentInjector,()=>t(n,e));switch(t){case"pathParamsChange":return!Jo(n.url,e.url);case"pathParamsOrQueryParamsChange":return!Jo(n.url,e.url)||!$i(n.queryParams,e.queryParams);case"always":return!0;case"paramsOrQueryParamsChange":return!$v(n,e)||!$i(n.queryParams,e.queryParams);default:return!$v(n,e)}}function Wc(n,e,t){let i=ia(n),r=n.value;Object.entries(i).forEach(([o,s])=>{r.component?e?Wc(s,e.children.getContext(o),t):Wc(s,null,t):Wc(s,e,t)}),r.component?e&&e.outlet&&e.outlet.isActivated?t.canDeactivateChecks.push(new oa(e.outlet.component,r)):t.canDeactivateChecks.push(new oa(null,r)):t.canDeactivateChecks.push(new oa(null,r))}function il(n){return typeof n=="function"}function gR(n){return typeof n=="boolean"}function vR(n){return n&&il(n.canLoad)}function yR(n){return n&&il(n.canActivate)}function _R(n){return n&&il(n.canActivateChild)}function xR(n){return n&&il(n.canDeactivate)}function bR(n){return n&&il(n.canMatch)}function CS(n){return n instanceof Ao||n?.name==="EmptyError"}var Yd=Symbol("INITIAL_VALUE");function da(){return yn(n=>Zp(n.map(e=>e.pipe(In(1),Kp(Yd)))).pipe(Mt(e=>{for(let t of e)if(t!==!0){if(t===Yd)return Yd;if(t===!1||MR(t))return t}return!0}),ai(e=>e!==Yd),In(1)))}function MR(n){return sa(n)||n instanceof ua}function TS(n){return n.aborted?nt(void 0).pipe(In(1)):new tt(e=>{let t=()=>{e.next(),e.complete()};return n.addEventListener("abort",t),()=>n.removeEventListener("abort",t)})}function DS(n){return Ka(TS(n))}function SR(n){return Dn(e=>{let{targetSnapshot:t,currentSnapshot:i,guards:{canActivateChecks:r,canDeactivateChecks:o}}=e;return o.length===0&&r.length===0?nt(it(ae({},e),{guardsResult:!0})):ER(o,t,i).pipe(Dn(s=>s&&gR(s)?wR(t,r,n):nt(s)),Mt(s=>it(ae({},e),{guardsResult:s})))})}function ER(n,e,t){return Xt(n).pipe(Dn(i=>AR(i.component,i.route,t,e)),sr(i=>i!==!0,!0))}function wR(n,e,t){return Xt(e).pipe(_u(i=>Ds(TR(i.route.parent,t),CR(i.route,t),IR(n,i.path),DR(n,i.route))),sr(i=>i!==!0,!0))}function CR(n,e){return n!==null&&e&&e(new df(n)),nt(!0)}function TR(n,e){return n!==null&&e&&e(new lf(n)),nt(!0)}function DR(n,e){let t=e.routeConfig?e.routeConfig.canActivate:null;if(!t||t.length===0)return nt(!0);let i=t.map(r=>Za(()=>{let o=e._environmentInjector,s=ha(r,o),a=yR(s)?s.canActivate(e,n):_n(o,()=>s(e,n));return ts(a).pipe(sr())}));return nt(i).pipe(da())}function IR(n,e){let t=e[e.length-1],r=e.slice(0,e.length-1).reverse().map(o=>hR(o)).filter(o=>o!==null).map(o=>Za(()=>{let s=o.guards.map(a=>{let c=o.node._environmentInjector,l=ha(a,c),u=_R(l)?l.canActivateChild(t,n):_n(c,()=>l(t,n));return ts(u).pipe(sr())});return nt(s).pipe(da())}));return nt(r).pipe(da())}function AR(n,e,t,i){let r=e&&e.routeConfig?e.routeConfig.canDeactivate:null;if(!r||r.length===0)return nt(!0);let o=r.map(s=>{let a=e._environmentInjector,c=ha(s,a),l=xR(c)?c.canDeactivate(n,e,t,i):_n(a,()=>c(n,e,t,i));return ts(l).pipe(sr())});return nt(o).pipe(da())}function RR(n,e,t,i,r){let o=e.canLoad;if(o===void 0||o.length===0)return nt(!0);let s=o.map(a=>{let c=ha(a,n),l=vR(c)?c.canLoad(e,t):_n(n,()=>c(e,t)),u=ts(l);return r?u.pipe(DS(r)):u});return nt(s).pipe(da(),IS(i))}function IS(n){return $p(ci(e=>{if(typeof e!="boolean")throw mf(n,e)}),Mt(e=>e===!0))}function NR(n,e,t,i,r,o){let s=e.canMatch;if(!s||s.length===0)return nt(!0);let a=s.map(c=>{let l=ha(c,n),u=bR(l)?l.canMatch(e,t,r):_n(n,()=>l(e,t,r));return ts(u).pipe(DS(o))});return nt(a).pipe(da(),IS(i))}var vr=class n extends Error{segmentGroup;constructor(e){super(),this.segmentGroup=e||null,Object.setPrototypeOf(this,n.prototype)}},Qc=class n extends Error{urlTree;constructor(e){super(),this.urlTree=e,Object.setPrototypeOf(this,n.prototype)}};function PR(n){throw new _e(4e3,!1)}function OR(n){throw ES(!1,bn.GuardRejected)}var Yv=class{urlSerializer;urlTree;constructor(e,t){this.urlSerializer=e,this.urlTree=t}async lineralizeSegments(e,t){let i=[],r=t.root;for(;;){if(i=i.concat(r.segments),r.numberOfChildren===0)return i;if(r.numberOfChildren>1||!r.children[je])throw PR(`${e.redirectTo}`);r=r.children[je]}}async applyRedirectCommands(e,t,i,r,o){let s=await LR(t,r,o);if(s instanceof vi)throw new Qc(s);let a=this.applyRedirectCreateUrlTree(s,this.urlSerializer.parse(s),e,i);if(s[0]==="/")throw new Qc(a);return a}applyRedirectCreateUrlTree(e,t,i,r){let o=this.createSegmentGroup(e,t.root,i,r);return new vi(o,this.createQueryParams(t.queryParams,this.urlTree.queryParams),t.fragment)}createQueryParams(e,t){let i={};return Object.entries(e).forEach(([r,o])=>{if(typeof o=="string"&&o[0]===":"){let a=o.substring(1);i[r]=t[a]}else i[r]=o}),i}createSegmentGroup(e,t,i,r){let o=this.createSegments(e,t.segments,i,r),s={};return Object.entries(t.children).forEach(([a,c])=>{s[a]=this.createSegmentGroup(e,c,i,r)}),new ht(o,s)}createSegments(e,t,i,r){return t.map(o=>o.path[0]===":"?this.findPosParam(e,o,r):this.findOrReturn(o,i))}findPosParam(e,t,i){let r=i[t.path.substring(1)];if(!r)throw new _e(4001,!1);return r}findOrReturn(e,t){let i=0;for(let r of t){if(r.path===e.path)return t.splice(i),r;i++}return e}};function LR(n,e,t){if(typeof n=="string")return Promise.resolve(n);let i=n;return Qd(ts(_n(t,()=>i(e))))}function FR(n,e){return n.providers&&!n._injector&&(n._injector=Ic(n.providers,e,`Route: ${n.path}`)),n._injector??e}function Ni(n){return n.outlet||je}function kR(n,e){let t=n.filter(i=>Ni(i)===e);return t.push(...n.filter(i=>Ni(i)!==e)),t}var Zv={matched:!1,consumedSegments:[],remainingSegments:[],parameters:{},positionalParamSegments:{}};function AS(n){return{routeConfig:n.routeConfig,url:n.url,params:n.params,queryParams:n.queryParams,fragment:n.fragment,data:n.data,outlet:n.outlet,title:n.title,paramMap:n.paramMap,queryParamMap:n.queryParamMap}}function UR(n,e,t,i,r,o,s){let a=RS(n,e,t);if(!a.matched)return nt(a);let c=AS(o(a));return i=FR(e,i),NR(i,e,t,r,c,s).pipe(Mt(l=>l===!0?a:ae({},Zv)))}function RS(n,e,t){if(e.path==="")return e.pathMatch==="full"&&(n.hasChildren()||t.length>0)?ae({},Zv):{matched:!0,consumedSegments:[],remainingSegments:t,parameters:{},positionalParamSegments:{}};let r=(e.matcher||tS)(t,n,e);if(!r)return ae({},Zv);let o={};Object.entries(r.posParams??{}).forEach(([a,c])=>{o[a]=c.path});let s=r.consumed.length>0?ae(ae({},o),r.consumed[r.consumed.length-1].parameters):o;return{matched:!0,consumedSegments:r.consumed,remainingSegments:t.slice(r.consumed.length),parameters:s,positionalParamSegments:r.posParams??{}}}function QM(n,e,t,i,r){return t.length>0&&HR(n,t,i,r)?{segmentGroup:new ht(e,VR(i,new ht(t,n.children))),slicedSegments:[]}:t.length===0&&zR(n,t,i)?{segmentGroup:new ht(n.segments,BR(n,t,i,n.children)),slicedSegments:t}:{segmentGroup:new ht(n.segments,n.children),slicedSegments:t}}function BR(n,e,t,i){let r={};for(let o of t)if(_f(n,e,o)&&!i[Ni(o)]){let s=new ht([],{});r[Ni(o)]=s}return ae(ae({},i),r)}function VR(n,e){let t={};t[je]=e;for(let i of n)if(i.path===""&&Ni(i)!==je){let r=new ht([],{});t[Ni(i)]=r}return t}function HR(n,e,t,i){return t.some(r=>!_f(n,e,r)||!(Ni(r)!==je)?!1:!(i!==void 0&&Ni(r)===i))}function zR(n,e,t){return t.some(i=>_f(n,e,i))}function _f(n,e,t){return(n.hasChildren()||e.length>0)&&t.pathMatch==="full"?!1:t.path===""}function GR(n,e,t){return e.length===0&&!n.children[t]}var Jv=class{};async function jR(n,e,t,i,r,o,s="emptyOnly",a){return new Kv(n,e,t,i,r,s,o,a).recognize()}var WR=31,Kv=class{injector;configLoader;rootComponentType;config;urlTree;paramsInheritanceStrategy;urlSerializer;abortSignal;applyRedirects;absoluteRedirectCount=0;allowRedirects=!0;constructor(e,t,i,r,o,s,a,c){this.injector=e,this.configLoader=t,this.rootComponentType=i,this.config=r,this.urlTree=o,this.paramsInheritanceStrategy=s,this.urlSerializer=a,this.abortSignal=c,this.applyRedirects=new Yv(this.urlSerializer,this.urlTree)}noMatchError(e){return new _e(4002,`'${e.segmentGroup}'`)}async recognize(){let e=QM(this.urlTree.root,[],[],this.config).segmentGroup,{children:t,rootSnapshot:i}=await this.match(e),r=new Kn(i,t),o=new Jc("",r),s=hS(i,[],this.urlTree.queryParams,this.urlTree.fragment);return s.queryParams=this.urlTree.queryParams,o.url=this.urlSerializer.serialize(s),{state:o,tree:s}}async match(e){let t=new la([],Object.freeze({}),Object.freeze(ae({},this.urlTree.queryParams)),this.urlTree.fragment,Object.freeze({}),je,this.rootComponentType,null,{},this.injector);try{return{children:await this.processSegmentGroup(this.injector,this.config,e,je,t),rootSnapshot:t}}catch(i){if(i instanceof Qc)return this.urlTree=i.urlTree,this.match(i.urlTree.root);throw i instanceof vr?this.noMatchError(i):i}}async processSegmentGroup(e,t,i,r,o){if(i.segments.length===0&&i.hasChildren())return this.processChildren(e,t,i,o);let s=await this.processSegment(e,t,i,i.segments,r,!0,o);return s instanceof Kn?[s]:[]}async processChildren(e,t,i,r){let o=[];for(let c of Object.keys(i.children))c==="primary"?o.unshift(c):o.push(c);let s=[];for(let c of o){let l=i.children[c],u=kR(t,c),d=await this.processSegmentGroup(e,u,l,c,r);s.push(...d)}let a=NS(s);return $R(a),a}async processSegment(e,t,i,r,o,s,a){for(let c of t)try{return await this.processSegmentAgainstRoute(c._injector??e,t,c,i,r,o,s,a)}catch(l){if(l instanceof vr||CS(l))continue;throw l}if(GR(i,r,o))return new Jv;throw new vr(i)}async processSegmentAgainstRoute(e,t,i,r,o,s,a,c){if(Ni(i)!==s&&(s===je||!_f(r,o,i)))throw new vr(r);if(i.redirectTo===void 0)return this.matchSegmentAgainstRoute(e,r,i,o,s,c);if(this.allowRedirects&&a)return this.expandSegmentAgainstRouteUsingRedirect(e,r,t,i,o,s,c);throw new vr(r)}async expandSegmentAgainstRouteUsingRedirect(e,t,i,r,o,s,a){let{matched:c,parameters:l,consumedSegments:u,positionalParamSegments:d,remainingSegments:f}=RS(t,r,o);if(!c)throw new vr(t);typeof r.redirectTo=="string"&&r.redirectTo[0]==="/"&&(this.absoluteRedirectCount++,this.absoluteRedirectCount>WR&&(this.allowRedirects=!1));let h=this.createSnapshot(e,r,o,l,a);if(this.abortSignal.aborted)throw new Error(this.abortSignal.reason);let g=await this.applyRedirects.applyRedirectCommands(u,r.redirectTo,d,AS(h),e),_=await this.applyRedirects.lineralizeSegments(r,g);return this.processSegment(e,i,t,_.concat(f),s,!1,a)}createSnapshot(e,t,i,r,o){let s=new la(i,r,Object.freeze(ae({},this.urlTree.queryParams)),this.urlTree.fragment,XR(t),Ni(t),t.component??t._loadedComponent??null,t,YR(t),e),a=Qv(s,o,this.paramsInheritanceStrategy);return s.params=Object.freeze(a.params),s.data=Object.freeze(a.data),s}async matchSegmentAgainstRoute(e,t,i,r,o,s){if(this.abortSignal.aborted)throw new Error(this.abortSignal.reason);let a=w=>this.createSnapshot(e,i,w.consumedSegments,w.parameters,s),c=await Qd(UR(t,i,r,e,this.urlSerializer,a,this.abortSignal));if(i.path==="**"&&(t.children={}),!c?.matched)throw new vr(t);e=i._injector??e;let{routes:l}=await this.getChildConfig(e,i,r),u=i._loadedInjector??e,{parameters:d,consumedSegments:f,remainingSegments:h}=c,g=this.createSnapshot(e,i,f,d,s),{segmentGroup:_,slicedSegments:m}=QM(t,f,h,l,o);if(m.length===0&&_.hasChildren()){let w=await this.processChildren(u,l,_,g);return new Kn(g,w)}if(l.length===0&&m.length===0)return new Kn(g,[]);let p=Ni(i)===o,b=await this.processSegment(u,l,_,m,p?je:o,!0,g);return new Kn(g,b instanceof Kn?[b]:[])}async getChildConfig(e,t,i){if(t.children)return{routes:t.children,injector:e};if(t.loadChildren){if(t._loadedRoutes!==void 0){let o=t._loadedNgModuleFactory;return o&&!t._loadedInjector&&(t._loadedInjector=o.create(e).injector),{routes:t._loadedRoutes,injector:t._loadedInjector}}if(this.abortSignal.aborted)throw new Error(this.abortSignal.reason);if(await Qd(RR(e,t,i,this.urlSerializer,this.abortSignal))){let o=await this.configLoader.loadChildren(e,t);return t._loadedRoutes=o.routes,t._loadedInjector=o.injector,t._loadedNgModuleFactory=o.factory,o}throw OR(t)}return{routes:[],injector:e}}};function $R(n){n.sort((e,t)=>e.value.outlet===je?-1:t.value.outlet===je?1:e.value.outlet.localeCompare(t.value.outlet))}function qR(n){let e=n.value.routeConfig;return e&&e.path===""}function NS(n){let e=[],t=new Set;for(let i of n){if(!qR(i)){e.push(i);continue}let r=e.find(o=>i.value.routeConfig===o.value.routeConfig);r!==void 0?(r.children.push(...i.children),t.add(r)):e.push(i)}for(let i of t){let r=NS(i.children);e.push(new Kn(i.value,r))}return e.filter(i=>!t.has(i))}function XR(n){return n.data||{}}function YR(n){return n.resolve||{}}function ZR(n,e,t,i,r,o,s){return Dn(async a=>{let{state:c,tree:l}=await jR(n,e,t,i,a.extractedUrl,r,o,s);return it(ae({},a),{targetSnapshot:c,urlAfterRedirects:l})})}function JR(n){return Dn(e=>{let{targetSnapshot:t,guards:{canActivateChecks:i}}=e;if(!i.length)return nt(e);let r=new Set(i.map(a=>a.route)),o=new Set;for(let a of r)if(!o.has(a))for(let c of PS(a))o.add(c);let s=0;return Xt(o).pipe(_u(a=>r.has(a)?KR(a,t,n):(a.data=Qv(a,a.parent,n).resolve,nt(void 0))),ci(()=>s++),xu(1),Dn(a=>s===o.size?nt(e):pn))})}function PS(n){let e=n.children.map(t=>PS(t)).flat();return[n,...e]}function KR(n,e,t){let i=n.routeConfig,r=n._resolve;return i?.title!==void 0&&!bS(i)&&(r[el]=i.title),Za(()=>(n.data=Qv(n,n.parent,t).resolve,QR(r,n,e).pipe(Mt(o=>(n._resolvedData=o,n.data=ae(ae({},n.data),o),null)))))}function QR(n,e,t){let i=Bv(n);if(i.length===0)return nt({});let r={};return Xt(i).pipe(Dn(o=>eN(n[o],e,t).pipe(sr(),ci(s=>{if(s instanceof ua)throw mf(new eo,s);r[o]=s}))),xu(1),Mt(()=>r),Ja(o=>CS(o)?pn:Yp(o)))}function eN(n,e,t){let i=e._environmentInjector,r=ha(n,i),o=r.resolve?r.resolve(e,t):_n(i,()=>r(e,t));return ts(o)}function eS(n){return yn(e=>{let t=n(e);return t?Xt(t).pipe(Mt(()=>e)):nt(e)})}var iy=(()=>{class n{buildTitle(t){let i,r=t.root;for(;r!==void 0;)i=this.getResolvedTitleForRoute(r)??i,r=r.children.find(o=>o.outlet===je);return i}getResolvedTitleForRoute(t){return t.data[el]}static \u0275fac=function(i){return new(i||n)};static \u0275prov=Ae({token:n,factory:()=>Q(OS),providedIn:"root"})}return n})(),OS=(()=>{class n extends iy{title;constructor(t){super(),this.title=t}updateTitle(t){let i=this.buildTitle(t);i!==void 0&&this.title.setTitle(i)}static \u0275fac=function(i){return new(i||n)(Le(qM))};static \u0275prov=Ae({token:n,factory:n.\u0275fac,providedIn:"root"})}return n})(),rl=new Pe("",{factory:()=>({})}),ol=new Pe(""),LS=(()=>{class n{componentLoaders=new WeakMap;childrenLoaders=new WeakMap;onLoadStartListener;onLoadEndListener;compiler=Q(lv);async loadComponent(t,i){if(this.componentLoaders.get(i))return this.componentLoaders.get(i);if(i._loadedComponent)return Promise.resolve(i._loadedComponent);this.onLoadStartListener&&this.onLoadStartListener(i);let r=(async()=>{try{let o=await iS(_n(t,()=>i.loadComponent())),s=await US(kS(o));return this.onLoadEndListener&&this.onLoadEndListener(i),i._loadedComponent=s,s}finally{this.componentLoaders.delete(i)}})();return this.componentLoaders.set(i,r),r}loadChildren(t,i){if(this.childrenLoaders.get(i))return this.childrenLoaders.get(i);if(i._loadedRoutes)return Promise.resolve({routes:i._loadedRoutes,injector:i._loadedInjector});this.onLoadStartListener&&this.onLoadStartListener(i);let r=(async()=>{try{let o=await FS(i,this.compiler,t,this.onLoadEndListener);return i._loadedRoutes=o.routes,i._loadedInjector=o.injector,i._loadedNgModuleFactory=o.factory,o}finally{this.childrenLoaders.delete(i)}})();return this.childrenLoaders.set(i,r),r}static \u0275fac=function(i){return new(i||n)};static \u0275prov=Ae({token:n,factory:n.\u0275fac,providedIn:"root"})}return n})();async function FS(n,e,t,i){let r=await iS(_n(t,()=>n.loadChildren())),o=await US(kS(r)),s;o instanceof Id||Array.isArray(o)?s=o:s=await e.compileModuleAsync(o),i&&i(n);let a,c,l=!1,u;return Array.isArray(s)?(c=s,l=!0):(a=s.create(t).injector,u=s,c=a.get(ol,[],{optional:!0,self:!0}).flat()),{routes:c.map(ny),injector:a,factory:u}}function tN(n){return n&&typeof n=="object"&&"default"in n}function kS(n){return tN(n)?n.default:n}async function US(n){return n}var xf=(()=>{class n{static \u0275fac=function(i){return new(i||n)};static \u0275prov=Ae({token:n,factory:()=>Q(nN),providedIn:"root"})}return n})(),nN=(()=>{class n{shouldProcessUrl(t){return!0}extract(t){return t}merge(t,i){return t}static \u0275fac=function(i){return new(i||n)};static \u0275prov=Ae({token:n,factory:n.\u0275fac,providedIn:"root"})}return n})(),BS=new Pe("");var iN=()=>{},VS=new Pe(""),HS=(()=>{class n{currentNavigation=lt(null,{equal:()=>!1});currentTransition=null;lastSuccessfulNavigation=lt(null);events=new $t;transitionAbortWithErrorSubject=new $t;configLoader=Q(LS);environmentInjector=Q(Jt);destroyRef=Q(hr);urlSerializer=Q(tl);rootContexts=Q(fa);location=Q(ta);inputBindingEnabled=Q(yf,{optional:!0})!==null;titleStrategy=Q(iy);options=Q(rl,{optional:!0})||{};paramsInheritanceStrategy=this.options.paramsInheritanceStrategy||"emptyOnly";urlHandlingStrategy=Q(xf);createViewTransition=Q(BS,{optional:!0});navigationErrorHandler=Q(VS,{optional:!0});navigationId=0;get hasRequestedNavigation(){return this.navigationId!==0}transitions;afterPreactivation=()=>nt(void 0);rootComponentType=null;destroyed=!1;constructor(){let t=r=>this.events.next(new af(r)),i=r=>this.events.next(new cf(r));this.configLoader.onLoadEndListener=i,this.configLoader.onLoadStartListener=t,this.destroyRef.onDestroy(()=>{this.destroyed=!0})}complete(){this.transitions?.complete()}handleNavigationRequest(t){let i=++this.navigationId;mi(()=>{this.transitions?.next(it(ae({},t),{extractedUrl:this.urlHandlingStrategy.extract(t.rawUrl),targetSnapshot:null,targetRouterState:null,guards:{canActivateChecks:[],canDeactivateChecks:[]},guardsResult:null,id:i,routesRecognizeHandler:{},beforeActivateHandler:{}}))})}setupNavigations(t){return this.transitions=new hn(null),this.transitions.pipe(ai(i=>i!==null),yn(i=>{let r=!1,o=new AbortController,s=()=>!r&&this.currentTransition?.id===i.id;return nt(i).pipe(yn(a=>{if(this.navigationId>i.id)return this.cancelNavigationTransition(i,"",bn.SupersededByNewNavigation),pn;this.currentTransition=i;let c=this.lastSuccessfulNavigation();this.currentNavigation.set({id:a.id,initialUrl:a.rawUrl,extractedUrl:a.extractedUrl,targetBrowserUrl:typeof a.extras.browserUrl=="string"?this.urlSerializer.parse(a.extras.browserUrl):a.extras.browserUrl,trigger:a.source,extras:a.extras,previousNavigation:c?it(ae({},c),{previousNavigation:null}):null,abort:()=>o.abort(),routesRecognizeHandler:a.routesRecognizeHandler,beforeActivateHandler:a.beforeActivateHandler});let l=!t.navigated||this.isUpdatingInternalState()||this.isUpdatedBrowserUrl(),u=a.extras.onSameUrlNavigation??t.onSameUrlNavigation;if(!l&&u!=="reload")return this.events.next(new _r(a.id,this.urlSerializer.serialize(a.rawUrl),"",qc.IgnoredSameUrlNavigation)),a.resolve(!1),pn;if(this.urlHandlingStrategy.shouldProcessUrl(a.rawUrl))return nt(a).pipe(yn(d=>(this.events.next(new Qo(d.id,this.urlSerializer.serialize(d.extractedUrl),d.source,d.restoredState)),d.id!==this.navigationId?pn:Promise.resolve(d))),ZR(this.environmentInjector,this.configLoader,this.rootComponentType,t.config,this.urlSerializer,this.paramsInheritanceStrategy,o.signal),ci(d=>{i.targetSnapshot=d.targetSnapshot,i.urlAfterRedirects=d.urlAfterRedirects,this.currentNavigation.update(f=>(f.finalUrl=d.urlAfterRedirects,f)),this.events.next(new Yc)}),yn(d=>Xt(i.routesRecognizeHandler.deferredHandle??nt(void 0)).pipe(Mt(()=>d))),ci(()=>{let d=new Xc(a.id,this.urlSerializer.serialize(a.extractedUrl),this.urlSerializer.serialize(a.urlAfterRedirects),a.targetSnapshot);this.events.next(d)}));if(l&&this.urlHandlingStrategy.shouldProcessUrl(a.currentRawUrl)){let{id:d,extractedUrl:f,source:h,restoredState:g,extras:_}=a,m=new Qo(d,this.urlSerializer.serialize(f),h,g);this.events.next(m);let p=_S(this.rootComponentType,this.environmentInjector).snapshot;return this.currentTransition=i=it(ae({},a),{targetSnapshot:p,urlAfterRedirects:f,extras:it(ae({},_),{skipLocationChange:!1,replaceUrl:!1})}),this.currentNavigation.update(b=>(b.finalUrl=f,b)),nt(i)}else return this.events.next(new _r(a.id,this.urlSerializer.serialize(a.extractedUrl),"",qc.IgnoredByUrlHandlingStrategy)),a.resolve(!1),pn}),Mt(a=>{let c=new nf(a.id,this.urlSerializer.serialize(a.extractedUrl),this.urlSerializer.serialize(a.urlAfterRedirects),a.targetSnapshot);return this.events.next(c),this.currentTransition=i=it(ae({},a),{guards:fR(a.targetSnapshot,a.currentSnapshot,this.rootContexts)}),i}),SR(a=>this.events.next(a)),yn(a=>{if(i.guardsResult=a.guardsResult,a.guardsResult&&typeof a.guardsResult!="boolean")throw mf(this.urlSerializer,a.guardsResult);let c=new rf(a.id,this.urlSerializer.serialize(a.extractedUrl),this.urlSerializer.serialize(a.urlAfterRedirects),a.targetSnapshot,!!a.guardsResult);if(this.events.next(c),!s())return pn;if(!a.guardsResult)return this.cancelNavigationTransition(a,"",bn.GuardRejected),pn;if(a.guards.canActivateChecks.length===0)return nt(a);let l=new of(a.id,this.urlSerializer.serialize(a.extractedUrl),this.urlSerializer.serialize(a.urlAfterRedirects),a.targetSnapshot);if(this.events.next(l),!s())return pn;let u=!1;return nt(a).pipe(JR(this.paramsInheritanceStrategy),ci({next:()=>{u=!0;let d=new sf(a.id,this.urlSerializer.serialize(a.extractedUrl),this.urlSerializer.serialize(a.urlAfterRedirects),a.targetSnapshot);this.events.next(d)},complete:()=>{u||this.cancelNavigationTransition(a,"",bn.NoDataFromResolver)}}))}),eS(a=>{let c=u=>{let d=[];if(u.routeConfig?._loadedComponent)u.component=u.routeConfig?._loadedComponent;else if(u.routeConfig?.loadComponent){let f=u._environmentInjector;d.push(this.configLoader.loadComponent(f,u.routeConfig).then(h=>{u.component=h}))}for(let f of u.children)d.push(...c(f));return d},l=c(a.targetSnapshot.root);return l.length===0?nt(a):Xt(Promise.all(l).then(()=>a))}),eS(()=>this.afterPreactivation()),yn(()=>{let{currentSnapshot:a,targetSnapshot:c}=i,l=this.createViewTransition?.(this.environmentInjector,a.root,c.root);return l?Xt(l).pipe(Mt(()=>i)):nt(i)}),In(1),yn(a=>{let c=cR(t.routeReuseStrategy,a.targetSnapshot,a.currentRouterState);this.currentTransition=i=a=it(ae({},a),{targetRouterState:c}),this.currentNavigation.update(u=>(u.targetRouterState=c,u)),this.events.next(new aa);let l=i.beforeActivateHandler.deferredHandle;return l?Xt(l.then(()=>a)):nt(a)}),ci(a=>{new Xv(t.routeReuseStrategy,i.targetRouterState,i.currentRouterState,c=>this.events.next(c),this.inputBindingEnabled).activate(this.rootContexts),s()&&(r=!0,this.currentNavigation.update(c=>(c.abort=iN,c)),this.lastSuccessfulNavigation.set(mi(this.currentNavigation)),this.events.next(new yr(a.id,this.urlSerializer.serialize(a.extractedUrl),this.urlSerializer.serialize(a.urlAfterRedirects))),this.titleStrategy?.updateTitle(a.targetRouterState.snapshot),a.resolve(!0))}),Ka(TS(o.signal).pipe(ai(()=>!r&&!i.targetRouterState),ci(()=>{this.cancelNavigationTransition(i,o.signal.reason+"",bn.Aborted)}))),ci({complete:()=>{r=!0}}),Ka(this.transitionAbortWithErrorSubject.pipe(ci(a=>{throw a}))),Jp(()=>{o.abort(),r||this.cancelNavigationTransition(i,"",bn.SupersededByNewNavigation),this.currentTransition?.id===i.id&&(this.currentNavigation.set(null),this.currentTransition=null)}),Ja(a=>{if(r=!0,this.destroyed)return i.resolve(!1),pn;if(wS(a))this.events.next(new gi(i.id,this.urlSerializer.serialize(i.extractedUrl),a.message,a.cancellationCode)),dR(a)?this.events.next(new ca(a.url,a.navigationBehaviorOptions)):i.resolve(!1);else{let c=new es(i.id,this.urlSerializer.serialize(i.extractedUrl),a,i.targetSnapshot??void 0);try{let l=_n(this.environmentInjector,()=>this.navigationErrorHandler?.(c));if(l instanceof ua){let{message:u,cancellationCode:d}=mf(this.urlSerializer,l);this.events.next(new gi(i.id,this.urlSerializer.serialize(i.extractedUrl),u,d)),this.events.next(new ca(l.redirectTo,l.navigationBehaviorOptions))}else throw this.events.next(c),a}catch(l){this.options.resolveNavigationPromiseOnError?i.resolve(!1):i.reject(l)}}return pn}))}))}cancelNavigationTransition(t,i,r){let o=new gi(t.id,this.urlSerializer.serialize(t.extractedUrl),i,r);this.events.next(o),t.resolve(!1)}isUpdatingInternalState(){return this.currentTransition?.extractedUrl.toString()!==this.currentTransition?.currentUrlTree.toString()}isUpdatedBrowserUrl(){let t=this.urlHandlingStrategy.extract(this.urlSerializer.parse(this.location.path(!0))),i=mi(this.currentNavigation),r=i?.targetBrowserUrl??i?.extractedUrl;return t.toString()!==r?.toString()&&!i?.extras.skipLocationChange}static \u0275fac=function(i){return new(i||n)};static \u0275prov=Ae({token:n,factory:n.\u0275fac,providedIn:"root"})}return n})();function rN(n){return n!==jc}var zS=new Pe("");var GS=(()=>{class n{static \u0275fac=function(i){return new(i||n)};static \u0275prov=Ae({token:n,factory:()=>Q(oN),providedIn:"root"})}return n})(),vf=class{shouldDetach(e){return!1}store(e,t){}shouldAttach(e){return!1}retrieve(e){return null}shouldReuseRoute(e,t){return e.routeConfig===t.routeConfig}shouldDestroyInjector(e){return!0}},oN=(()=>{class n extends vf{static \u0275fac=(()=>{let t;return function(r){return(t||(t=Cc(n)))(r||n)}})();static \u0275prov=Ae({token:n,factory:n.\u0275fac,providedIn:"root"})}return n})(),ry=(()=>{class n{urlSerializer=Q(tl);options=Q(rl,{optional:!0})||{};canceledNavigationResolution=this.options.canceledNavigationResolution||"replace";location=Q(ta);urlHandlingStrategy=Q(xf);urlUpdateStrategy=this.options.urlUpdateStrategy||"deferred";currentUrlTree=new vi;getCurrentUrlTree(){return this.currentUrlTree}rawUrlTree=this.currentUrlTree;getRawUrlTree(){return this.rawUrlTree}createBrowserPath({finalUrl:t,initialUrl:i,targetBrowserUrl:r}){let o=t!==void 0?this.urlHandlingStrategy.merge(t,i):i,s=r??o;return s instanceof vi?this.urlSerializer.serialize(s):s}commitTransition({targetRouterState:t,finalUrl:i,initialUrl:r}){i&&t?(this.currentUrlTree=i,this.rawUrlTree=this.urlHandlingStrategy.merge(i,r),this.routerState=t):this.rawUrlTree=r}routerState=_S(null,Q(Jt));getRouterState(){return this.routerState}_stateMemento=this.createStateMemento();get stateMemento(){return this._stateMemento}updateStateMemento(){this._stateMemento=this.createStateMemento()}createStateMemento(){return{rawUrlTree:this.rawUrlTree,currentUrlTree:this.currentUrlTree,routerState:this.routerState}}restoredState(){return this.location.getState()}static \u0275fac=function(i){return new(i||n)};static \u0275prov=Ae({token:n,factory:()=>Q(sN),providedIn:"root"})}return n})(),sN=(()=>{class n extends ry{currentPageId=0;lastSuccessfulId=-1;get browserPageId(){return this.canceledNavigationResolution!=="computed"?this.currentPageId:this.restoredState()?.\u0275routerPageId??this.currentPageId}registerNonRouterCurrentEntryChangeListener(t){return this.location.subscribe(i=>{i.type==="popstate"&&setTimeout(()=>{t(i.url,i.state,"popstate",{replaceUrl:!0})})})}handleRouterEvent(t,i){t instanceof Qo?this.updateStateMemento():t instanceof _r?this.commitTransition(i):t instanceof Xc?this.urlUpdateStrategy==="eager"&&(i.extras.skipLocationChange||this.setBrowserUrl(this.createBrowserPath(i),i)):t instanceof aa?(this.commitTransition(i),this.urlUpdateStrategy==="deferred"&&!i.extras.skipLocationChange&&this.setBrowserUrl(this.createBrowserPath(i),i)):t instanceof gi&&!yS(t)?this.restoreHistory(i):t instanceof es?this.restoreHistory(i,!0):t instanceof yr&&(this.lastSuccessfulId=t.id,this.currentPageId=this.browserPageId)}setBrowserUrl(t,{extras:i,id:r}){let{replaceUrl:o,state:s}=i;if(this.location.isCurrentPathEqualTo(t)||o){let a=this.browserPageId,c=ae(ae({},s),this.generateNgRouterState(r,a));this.location.replaceState(t,"",c)}else{let a=ae(ae({},s),this.generateNgRouterState(r,this.browserPageId+1));this.location.go(t,"",a)}}restoreHistory(t,i=!1){if(this.canceledNavigationResolution==="computed"){let r=this.browserPageId,o=this.currentPageId-r;o!==0?this.location.historyGo(o):this.getCurrentUrlTree()===t.finalUrl&&o===0&&(this.resetInternalState(t),this.resetUrlToCurrentUrlTree())}else this.canceledNavigationResolution==="replace"&&(i&&this.resetInternalState(t),this.resetUrlToCurrentUrlTree())}resetInternalState({finalUrl:t}){this.routerState=this.stateMemento.routerState,this.currentUrlTree=this.stateMemento.currentUrlTree,this.rawUrlTree=this.urlHandlingStrategy.merge(this.currentUrlTree,t??this.rawUrlTree)}resetUrlToCurrentUrlTree(){this.location.replaceState(this.urlSerializer.serialize(this.getRawUrlTree()),"",this.generateNgRouterState(this.lastSuccessfulId,this.currentPageId))}generateNgRouterState(t,i){return this.canceledNavigationResolution==="computed"?{navigationId:t,\u0275routerPageId:i}:{navigationId:t}}static \u0275fac=(()=>{let t;return function(r){return(t||(t=Cc(n)))(r||n)}})();static \u0275prov=Ae({token:n,factory:n.\u0275fac,providedIn:"root"})}return n})();function oy(n,e){n.events.pipe(ai(t=>t instanceof yr||t instanceof gi||t instanceof es||t instanceof _r),Mt(t=>t instanceof yr||t instanceof _r?0:(t instanceof gi?t.code===bn.Redirect||t.code===bn.SupersededByNewNavigation:!1)?2:1),ai(t=>t!==2),In(1)).subscribe(()=>{e()})}var bf=(()=>{class n{get currentUrlTree(){return this.stateManager.getCurrentUrlTree()}get rawUrlTree(){return this.stateManager.getRawUrlTree()}disposed=!1;nonRouterCurrentEntryChangeSubscription;console=Q(rv);stateManager=Q(ry);options=Q(rl,{optional:!0})||{};pendingTasks=Q(jr);urlUpdateStrategy=this.options.urlUpdateStrategy||"deferred";navigationTransitions=Q(HS);urlSerializer=Q(tl);location=Q(ta);urlHandlingStrategy=Q(xf);injector=Q(Jt);_events=new $t;get events(){return this._events}get routerState(){return this.stateManager.getRouterState()}navigated=!1;routeReuseStrategy=Q(GS);injectorCleanup=Q(zS,{optional:!0});onSameUrlNavigation=this.options.onSameUrlNavigation||"ignore";config=Q(ol,{optional:!0})?.flat()??[];componentInputBindingEnabled=!!Q(yf,{optional:!0});currentNavigation=this.navigationTransitions.currentNavigation.asReadonly();constructor(){this.resetConfig(this.config),this.navigationTransitions.setupNavigations(this).subscribe({error:t=>{}}),this.subscribeToNavigationEvents()}eventsSubscription=new fn;subscribeToNavigationEvents(){let t=this.navigationTransitions.events.subscribe(i=>{try{let r=this.navigationTransitions.currentTransition,o=mi(this.navigationTransitions.currentNavigation);if(r!==null&&o!==null){if(this.stateManager.handleRouterEvent(i,o),i instanceof gi&&i.code!==bn.Redirect&&i.code!==bn.SupersededByNewNavigation)this.navigated=!0;else if(i instanceof yr)this.navigated=!0,this.injectorCleanup?.(this.routeReuseStrategy,this.routerState,this.config);else if(i instanceof ca){let s=i.navigationBehaviorOptions,a=this.urlHandlingStrategy.merge(i.url,r.currentRawUrl),c=ae({scroll:r.extras.scroll,browserUrl:r.extras.browserUrl,info:r.extras.info,skipLocationChange:r.extras.skipLocationChange,replaceUrl:r.extras.replaceUrl||this.urlUpdateStrategy==="eager"||rN(r.source)},s);this.scheduleNavigation(a,jc,null,c,{resolve:r.resolve,reject:r.reject,promise:r.promise})}}sR(i)&&this._events.next(i)}catch(r){this.navigationTransitions.transitionAbortWithErrorSubject.next(r)}});this.eventsSubscription.add(t)}resetRootComponentType(t){this.routerState.root.component=t,this.navigationTransitions.rootComponentType=t}initialNavigation(){this.setUpLocationChangeListener(),this.navigationTransitions.hasRequestedNavigation||this.navigateToSyncWithBrowser(this.location.path(!0),jc,this.stateManager.restoredState(),{replaceUrl:!0})}setUpLocationChangeListener(){this.nonRouterCurrentEntryChangeSubscription??=this.stateManager.registerNonRouterCurrentEntryChangeListener((t,i,r,o)=>{this.navigateToSyncWithBrowser(t,r,i,o)})}navigateToSyncWithBrowser(t,i,r,o){let s=r?.navigationId?r:null;if(r){let c=ae({},r);delete c.navigationId,delete c.\u0275routerPageId,Object.keys(c).length!==0&&(o.state=c)}let a=this.parseUrl(t);this.scheduleNavigation(a,i,s,o).catch(c=>{this.disposed||this.injector.get(Ci)(c)})}get url(){return this.serializeUrl(this.currentUrlTree)}getCurrentNavigation(){return mi(this.navigationTransitions.currentNavigation)}get lastSuccessfulNavigation(){return this.navigationTransitions.lastSuccessfulNavigation}resetConfig(t){this.config=t.map(ny),this.navigated=!1}ngOnDestroy(){this.dispose()}dispose(){this._events.unsubscribe(),this.navigationTransitions.complete(),this.nonRouterCurrentEntryChangeSubscription?.unsubscribe(),this.nonRouterCurrentEntryChangeSubscription=void 0,this.disposed=!0,this.eventsSubscription.unsubscribe()}createUrlTree(t,i={}){let{relativeTo:r,queryParams:o,fragment:s,queryParamsHandling:a,preserveFragment:c}=i,l=c?this.currentUrlTree.fragment:s,u=null;switch(a??this.options.defaultQueryParamsHandling){case"merge":u=ae(ae({},this.currentUrlTree.queryParams),o);break;case"preserve":u=this.currentUrlTree.queryParams;break;default:u=o||null}u!==null&&(u=this.removeEmptyProps(u));let d;try{let f=r?r.snapshot:this.routerState.snapshot.root;d=pS(f)}catch{(typeof t[0]!="string"||t[0][0]!=="/")&&(t=[]),d=this.currentUrlTree.root}return mS(d,t,u,l??null,this.urlSerializer)}navigateByUrl(t,i={skipLocationChange:!1}){let r=sa(t)?t:this.parseUrl(t),o=this.urlHandlingStrategy.merge(r,this.rawUrlTree);return this.scheduleNavigation(o,jc,null,i)}navigate(t,i={skipLocationChange:!1}){return aN(t),this.navigateByUrl(this.createUrlTree(t,i),i)}serializeUrl(t){return this.urlSerializer.serialize(t)}parseUrl(t){try{return this.urlSerializer.parse(t)}catch{return this.console.warn(kr(4018,!1)),this.urlSerializer.parse("/")}}isActive(t,i){let r;if(i===!0?r=ae({},oS):i===!1?r=ae({},Vv):r=ae(ae({},Vv),i),sa(t))return XM(this.currentUrlTree,t,r);let o=this.parseUrl(t);return XM(this.currentUrlTree,o,r)}removeEmptyProps(t){return Object.entries(t).reduce((i,[r,o])=>(o!=null&&(i[r]=o),i),{})}scheduleNavigation(t,i,r,o,s){if(this.disposed)return Promise.resolve(!1);let a,c,l;s?(a=s.resolve,c=s.reject,l=s.promise):l=new Promise((d,f)=>{a=d,c=f});let u=this.pendingTasks.add();return oy(this,()=>{queueMicrotask(()=>this.pendingTasks.remove(u))}),this.navigationTransitions.handleNavigationRequest({source:i,restoredState:r,currentUrlTree:this.currentUrlTree,currentRawUrl:this.currentUrlTree,rawUrl:t,extras:o,resolve:a,reject:c,promise:l,currentSnapshot:this.routerState.snapshot,currentRouterState:this.routerState}),l.catch(Promise.reject.bind(Promise))}static \u0275fac=function(i){return new(i||n)};static \u0275prov=Ae({token:n,factory:n.\u0275fac,providedIn:"root"})}return n})();function aN(n){for(let e=0;e<n.length;e++)if(n[e]==null)throw new _e(4008,!1)}var uN=new Pe("");function sy(n,...e){return lr([{provide:ol,multi:!0,useValue:n},[],{provide:to,useFactory:dN},{provide:Rd,multi:!0,useFactory:fN},e.map(t=>t.\u0275providers)])}function dN(){return Q(bf).routerState.root}function fN(){let n=Q(zn);return e=>{let t=n.get(mr);if(e!==t.components[0])return;let i=n.get(bf),r=n.get(hN);n.get(pN)===1&&i.initialNavigation(),n.get(mN,null,{optional:!0})?.setUpPreloading(),n.get(uN,null,{optional:!0})?.init(),i.resetRootComponentType(t.componentTypes[0]),r.closed||(r.next(),r.complete(),r.unsubscribe())}}var hN=new Pe("",{factory:()=>new $t}),pN=new Pe("",{factory:()=>1});var mN=new Pe("");var mE=0,Gy=1,gE=2;var Rl=1,vE=2,Va=3,Tr=0,Un=1,Ki=2,Qi=0,as=1,jy=2,Wy=3,$y=4,yE=5;var lo=100,_E=101,xE=102,bE=103,ME=104,SE=200,EE=201,wE=202,CE=203,Wf=204,$f=205,TE=206,DE=207,IE=208,AE=209,RE=210,NE=211,PE=212,OE=213,LE=214,qf=0,Xf=1,Yf=2,cs=3,Zf=4,Jf=5,Kf=6,Qf=7,qy=0,FE=1,kE=2,Ui=0,Xy=1,Yy=2,Zy=3,Jy=4,Ky=5,Qy=6,e0=7;var Ny=300,vo=301,ds=302,Ch=303,Th=304,Nl=306,eh=1e3,Yi=1001,th=1002,ln=1003,UE=1004;var Pl=1005;var mn=1006,Dh=1007;var yo=1008;var qn=1009,t0=1010,n0=1011,Ha=1012,Ih=1013,Bi=1014,Vi=1015,er=1016,Ah=1017,Rh=1018,za=1020,i0=35902,r0=35899,o0=1021,s0=1022,_i=1023,Zi=1026,_o=1027,a0=1028,Nh=1029,fs=1030,Ph=1031;var Oh=1033,Ol=33776,Ll=33777,Fl=33778,kl=33779,Lh=35840,Fh=35841,kh=35842,Uh=35843,Bh=36196,Vh=37492,Hh=37496,zh=37488,Gh=37489,jh=37490,Wh=37491,$h=37808,qh=37809,Xh=37810,Yh=37811,Zh=37812,Jh=37813,Kh=37814,Qh=37815,ep=37816,tp=37817,np=37818,ip=37819,rp=37820,op=37821,sp=36492,ap=36494,cp=36495,lp=36283,up=36284,dp=36285,fp=36286;var fl=2300,nh=2301,jf=2302,Py=2303,Oy=2400,Ly=2401,Fy=2402;var BE=3200;var c0=0,VE=1,Ar="",ni="srgb",ls="srgb-linear",hl="linear",_t="srgb";var ss=7680;var ky=519,HE=512,zE=513,GE=514,hp=515,jE=516,WE=517,pp=518,$E=519,Uy=35044;var l0="300 es",Fi=2e3,Ta=2001;function vN(n){for(let e=n.length-1;e>=0;--e)if(n[e]>=65535)return!0;return!1}function yN(n){return ArrayBuffer.isView(n)&&!(n instanceof DataView)}function pl(n){return document.createElementNS("http://www.w3.org/1999/xhtml",n)}function qE(){let n=pl("canvas");return n.style.display="block",n}var jS={},Da=null;function u0(...n){let e="THREE."+n.shift();Da?Da("log",e,...n):console.log(e,...n)}function XE(n){let e=n[0];if(typeof e=="string"&&e.startsWith("TSL:")){let t=n[1];t&&t.isStackTrace?n[0]+=" "+t.getLocation():n[1]='Stack trace not available. Enable "THREE.Node.captureStackTrace" to capture stack traces.'}return n}function ke(...n){n=XE(n);let e="THREE."+n.shift();if(Da)Da("warn",e,...n);else{let t=n[0];t&&t.isStackTrace?console.warn(t.getError(e)):console.warn(e,...n)}}function Fe(...n){n=XE(n);let e="THREE."+n.shift();if(Da)Da("error",e,...n);else{let t=n[0];t&&t.isStackTrace?console.error(t.getError(e)):console.error(e,...n)}}function ml(...n){let e=n.join(" ");e in jS||(jS[e]=!0,ke(...n))}function YE(n,e,t){return new Promise(function(i,r){function o(){switch(n.clientWaitSync(e,n.SYNC_FLUSH_COMMANDS_BIT,0)){case n.WAIT_FAILED:r();break;case n.TIMEOUT_EXPIRED:setTimeout(o,t);break;default:i()}}setTimeout(o,t)})}var ZE={[qf]:Xf,[Yf]:Kf,[Zf]:Qf,[cs]:Jf,[Xf]:qf,[Kf]:Yf,[Qf]:Zf,[Jf]:cs},Dr=class{addEventListener(e,t){this._listeners===void 0&&(this._listeners={});let i=this._listeners;i[e]===void 0&&(i[e]=[]),i[e].indexOf(t)===-1&&i[e].push(t)}hasEventListener(e,t){let i=this._listeners;return i===void 0?!1:i[e]!==void 0&&i[e].indexOf(t)!==-1}removeEventListener(e,t){let i=this._listeners;if(i===void 0)return;let r=i[e];if(r!==void 0){let o=r.indexOf(t);o!==-1&&r.splice(o,1)}}dispatchEvent(e){let t=this._listeners;if(t===void 0)return;let i=t[e.type];if(i!==void 0){e.target=this;let r=i.slice(0);for(let o=0,s=r.length;o<s;o++)r[o].call(this,e);e.target=null}}},Mn=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"];var ay=Math.PI/180,ih=180/Math.PI;function Ul(){let n=Math.random()*4294967295|0,e=Math.random()*4294967295|0,t=Math.random()*4294967295|0,i=Math.random()*4294967295|0;return(Mn[n&255]+Mn[n>>8&255]+Mn[n>>16&255]+Mn[n>>24&255]+"-"+Mn[e&255]+Mn[e>>8&255]+"-"+Mn[e>>16&15|64]+Mn[e>>24&255]+"-"+Mn[t&63|128]+Mn[t>>8&255]+"-"+Mn[t>>16&255]+Mn[t>>24&255]+Mn[i&255]+Mn[i>>8&255]+Mn[i>>16&255]+Mn[i>>24&255]).toLowerCase()}function rt(n,e,t){return Math.max(e,Math.min(t,n))}function _N(n,e){return(n%e+e)%e}function cy(n,e,t){return(1-t)*n+t*e}function sl(n,e){switch(e.constructor){case Float32Array:return n;case Uint32Array:return n/4294967295;case Uint16Array:return n/65535;case Uint8Array:return n/255;case Int32Array:return Math.max(n/2147483647,-1);case Int16Array:return Math.max(n/32767,-1);case Int8Array:return Math.max(n/127,-1);default:throw new Error("Invalid component type.")}}function $n(n,e){switch(e.constructor){case Float32Array:return n;case Uint32Array:return Math.round(n*4294967295);case Uint16Array:return Math.round(n*65535);case Uint8Array:return Math.round(n*255);case Int32Array:return Math.round(n*2147483647);case Int16Array:return Math.round(n*32767);case Int8Array:return Math.round(n*127);default:throw new Error("Invalid component type.")}}var ot=class n{constructor(e=0,t=0){n.prototype.isVector2=!0,this.x=e,this.y=t}get width(){return this.x}set width(e){this.x=e}get height(){return this.y}set height(e){this.y=e}set(e,t){return this.x=e,this.y=t,this}setScalar(e){return this.x=e,this.y=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y)}copy(e){return this.x=e.x,this.y=e.y,this}add(e){return this.x+=e.x,this.y+=e.y,this}addScalar(e){return this.x+=e,this.y+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this}subScalar(e){return this.x-=e,this.y-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this}multiply(e){return this.x*=e.x,this.y*=e.y,this}multiplyScalar(e){return this.x*=e,this.y*=e,this}divide(e){return this.x/=e.x,this.y/=e.y,this}divideScalar(e){return this.multiplyScalar(1/e)}applyMatrix3(e){let t=this.x,i=this.y,r=e.elements;return this.x=r[0]*t+r[3]*i+r[6],this.y=r[1]*t+r[4]*i+r[7],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this}clamp(e,t){return this.x=rt(this.x,e.x,t.x),this.y=rt(this.y,e.y,t.y),this}clampScalar(e,t){return this.x=rt(this.x,e,t),this.y=rt(this.y,e,t),this}clampLength(e,t){let i=this.length();return this.divideScalar(i||1).multiplyScalar(rt(i,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(e){return this.x*e.x+this.y*e.y}cross(e){return this.x*e.y-this.y*e.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(e){let t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;let i=this.dot(e)/t;return Math.acos(rt(i,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){let t=this.x-e.x,i=this.y-e.y;return t*t+i*i}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this}lerpVectors(e,t,i){return this.x=e.x+(t.x-e.x)*i,this.y=e.y+(t.y-e.y)*i,this}equals(e){return e.x===this.x&&e.y===this.y}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this}rotateAround(e,t){let i=Math.cos(t),r=Math.sin(t),o=this.x-e.x,s=this.y-e.y;return this.x=o*i-s*r+e.x,this.y=o*r+s*i+e.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}},ii=class{constructor(e=0,t=0,i=0,r=1){this.isQuaternion=!0,this._x=e,this._y=t,this._z=i,this._w=r}static slerpFlat(e,t,i,r,o,s,a){let c=i[r+0],l=i[r+1],u=i[r+2],d=i[r+3],f=o[s+0],h=o[s+1],g=o[s+2],_=o[s+3];if(d!==_||c!==f||l!==h||u!==g){let m=c*f+l*h+u*g+d*_;m<0&&(f=-f,h=-h,g=-g,_=-_,m=-m);let p=1-a;if(m<.9995){let b=Math.acos(m),w=Math.sin(b);p=Math.sin(p*b)/w,a=Math.sin(a*b)/w,c=c*p+f*a,l=l*p+h*a,u=u*p+g*a,d=d*p+_*a}else{c=c*p+f*a,l=l*p+h*a,u=u*p+g*a,d=d*p+_*a;let b=1/Math.sqrt(c*c+l*l+u*u+d*d);c*=b,l*=b,u*=b,d*=b}}e[t]=c,e[t+1]=l,e[t+2]=u,e[t+3]=d}static multiplyQuaternionsFlat(e,t,i,r,o,s){let a=i[r],c=i[r+1],l=i[r+2],u=i[r+3],d=o[s],f=o[s+1],h=o[s+2],g=o[s+3];return e[t]=a*g+u*d+c*h-l*f,e[t+1]=c*g+u*f+l*d-a*h,e[t+2]=l*g+u*h+a*f-c*d,e[t+3]=u*g-a*d-c*f-l*h,e}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get w(){return this._w}set w(e){this._w=e,this._onChangeCallback()}set(e,t,i,r){return this._x=e,this._y=t,this._z=i,this._w=r,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(e){return this._x=e.x,this._y=e.y,this._z=e.z,this._w=e.w,this._onChangeCallback(),this}setFromEuler(e,t=!0){let i=e._x,r=e._y,o=e._z,s=e._order,a=Math.cos,c=Math.sin,l=a(i/2),u=a(r/2),d=a(o/2),f=c(i/2),h=c(r/2),g=c(o/2);switch(s){case"XYZ":this._x=f*u*d+l*h*g,this._y=l*h*d-f*u*g,this._z=l*u*g+f*h*d,this._w=l*u*d-f*h*g;break;case"YXZ":this._x=f*u*d+l*h*g,this._y=l*h*d-f*u*g,this._z=l*u*g-f*h*d,this._w=l*u*d+f*h*g;break;case"ZXY":this._x=f*u*d-l*h*g,this._y=l*h*d+f*u*g,this._z=l*u*g+f*h*d,this._w=l*u*d-f*h*g;break;case"ZYX":this._x=f*u*d-l*h*g,this._y=l*h*d+f*u*g,this._z=l*u*g-f*h*d,this._w=l*u*d+f*h*g;break;case"YZX":this._x=f*u*d+l*h*g,this._y=l*h*d+f*u*g,this._z=l*u*g-f*h*d,this._w=l*u*d-f*h*g;break;case"XZY":this._x=f*u*d-l*h*g,this._y=l*h*d-f*u*g,this._z=l*u*g+f*h*d,this._w=l*u*d+f*h*g;break;default:ke("Quaternion: .setFromEuler() encountered an unknown order: "+s)}return t===!0&&this._onChangeCallback(),this}setFromAxisAngle(e,t){let i=t/2,r=Math.sin(i);return this._x=e.x*r,this._y=e.y*r,this._z=e.z*r,this._w=Math.cos(i),this._onChangeCallback(),this}setFromRotationMatrix(e){let t=e.elements,i=t[0],r=t[4],o=t[8],s=t[1],a=t[5],c=t[9],l=t[2],u=t[6],d=t[10],f=i+a+d;if(f>0){let h=.5/Math.sqrt(f+1);this._w=.25/h,this._x=(u-c)*h,this._y=(o-l)*h,this._z=(s-r)*h}else if(i>a&&i>d){let h=2*Math.sqrt(1+i-a-d);this._w=(u-c)/h,this._x=.25*h,this._y=(r+s)/h,this._z=(o+l)/h}else if(a>d){let h=2*Math.sqrt(1+a-i-d);this._w=(o-l)/h,this._x=(r+s)/h,this._y=.25*h,this._z=(c+u)/h}else{let h=2*Math.sqrt(1+d-i-a);this._w=(s-r)/h,this._x=(o+l)/h,this._y=(c+u)/h,this._z=.25*h}return this._onChangeCallback(),this}setFromUnitVectors(e,t){let i=e.dot(t)+1;return i<1e-8?(i=0,Math.abs(e.x)>Math.abs(e.z)?(this._x=-e.y,this._y=e.x,this._z=0,this._w=i):(this._x=0,this._y=-e.z,this._z=e.y,this._w=i)):(this._x=e.y*t.z-e.z*t.y,this._y=e.z*t.x-e.x*t.z,this._z=e.x*t.y-e.y*t.x,this._w=i),this.normalize()}angleTo(e){return 2*Math.acos(Math.abs(rt(this.dot(e),-1,1)))}rotateTowards(e,t){let i=this.angleTo(e);if(i===0)return this;let r=Math.min(1,t/i);return this.slerp(e,r),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(e){return this._x*e._x+this._y*e._y+this._z*e._z+this._w*e._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let e=this.length();return e===0?(this._x=0,this._y=0,this._z=0,this._w=1):(e=1/e,this._x=this._x*e,this._y=this._y*e,this._z=this._z*e,this._w=this._w*e),this._onChangeCallback(),this}multiply(e){return this.multiplyQuaternions(this,e)}premultiply(e){return this.multiplyQuaternions(e,this)}multiplyQuaternions(e,t){let i=e._x,r=e._y,o=e._z,s=e._w,a=t._x,c=t._y,l=t._z,u=t._w;return this._x=i*u+s*a+r*l-o*c,this._y=r*u+s*c+o*a-i*l,this._z=o*u+s*l+i*c-r*a,this._w=s*u-i*a-r*c-o*l,this._onChangeCallback(),this}slerp(e,t){let i=e._x,r=e._y,o=e._z,s=e._w,a=this.dot(e);a<0&&(i=-i,r=-r,o=-o,s=-s,a=-a);let c=1-t;if(a<.9995){let l=Math.acos(a),u=Math.sin(l);c=Math.sin(c*l)/u,t=Math.sin(t*l)/u,this._x=this._x*c+i*t,this._y=this._y*c+r*t,this._z=this._z*c+o*t,this._w=this._w*c+s*t,this._onChangeCallback()}else this._x=this._x*c+i*t,this._y=this._y*c+r*t,this._z=this._z*c+o*t,this._w=this._w*c+s*t,this.normalize();return this}slerpQuaternions(e,t,i){return this.copy(e).slerp(t,i)}random(){let e=2*Math.PI*Math.random(),t=2*Math.PI*Math.random(),i=Math.random(),r=Math.sqrt(1-i),o=Math.sqrt(i);return this.set(r*Math.sin(e),r*Math.cos(e),o*Math.sin(t),o*Math.cos(t))}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._w===this._w}fromArray(e,t=0){return this._x=e[t],this._y=e[t+1],this._z=e[t+2],this._w=e[t+3],this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._w,e}fromBufferAttribute(e,t){return this._x=e.getX(t),this._y=e.getY(t),this._z=e.getZ(t),this._w=e.getW(t),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}},O=class n{constructor(e=0,t=0,i=0){n.prototype.isVector3=!0,this.x=e,this.y=t,this.z=i}set(e,t,i){return i===void 0&&(i=this.z),this.x=e,this.y=t,this.z=i,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this}multiplyVectors(e,t){return this.x=e.x*t.x,this.y=e.y*t.y,this.z=e.z*t.z,this}applyEuler(e){return this.applyQuaternion(WS.setFromEuler(e))}applyAxisAngle(e,t){return this.applyQuaternion(WS.setFromAxisAngle(e,t))}applyMatrix3(e){let t=this.x,i=this.y,r=this.z,o=e.elements;return this.x=o[0]*t+o[3]*i+o[6]*r,this.y=o[1]*t+o[4]*i+o[7]*r,this.z=o[2]*t+o[5]*i+o[8]*r,this}applyNormalMatrix(e){return this.applyMatrix3(e).normalize()}applyMatrix4(e){let t=this.x,i=this.y,r=this.z,o=e.elements,s=1/(o[3]*t+o[7]*i+o[11]*r+o[15]);return this.x=(o[0]*t+o[4]*i+o[8]*r+o[12])*s,this.y=(o[1]*t+o[5]*i+o[9]*r+o[13])*s,this.z=(o[2]*t+o[6]*i+o[10]*r+o[14])*s,this}applyQuaternion(e){let t=this.x,i=this.y,r=this.z,o=e.x,s=e.y,a=e.z,c=e.w,l=2*(s*r-a*i),u=2*(a*t-o*r),d=2*(o*i-s*t);return this.x=t+c*l+s*d-a*u,this.y=i+c*u+a*l-o*d,this.z=r+c*d+o*u-s*l,this}project(e){return this.applyMatrix4(e.matrixWorldInverse).applyMatrix4(e.projectionMatrix)}unproject(e){return this.applyMatrix4(e.projectionMatrixInverse).applyMatrix4(e.matrixWorld)}transformDirection(e){let t=this.x,i=this.y,r=this.z,o=e.elements;return this.x=o[0]*t+o[4]*i+o[8]*r,this.y=o[1]*t+o[5]*i+o[9]*r,this.z=o[2]*t+o[6]*i+o[10]*r,this.normalize()}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this}divideScalar(e){return this.multiplyScalar(1/e)}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this}clamp(e,t){return this.x=rt(this.x,e.x,t.x),this.y=rt(this.y,e.y,t.y),this.z=rt(this.z,e.z,t.z),this}clampScalar(e,t){return this.x=rt(this.x,e,t),this.y=rt(this.y,e,t),this.z=rt(this.z,e,t),this}clampLength(e,t){let i=this.length();return this.divideScalar(i||1).multiplyScalar(rt(i,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this}lerpVectors(e,t,i){return this.x=e.x+(t.x-e.x)*i,this.y=e.y+(t.y-e.y)*i,this.z=e.z+(t.z-e.z)*i,this}cross(e){return this.crossVectors(this,e)}crossVectors(e,t){let i=e.x,r=e.y,o=e.z,s=t.x,a=t.y,c=t.z;return this.x=r*c-o*a,this.y=o*s-i*c,this.z=i*a-r*s,this}projectOnVector(e){let t=e.lengthSq();if(t===0)return this.set(0,0,0);let i=e.dot(this)/t;return this.copy(e).multiplyScalar(i)}projectOnPlane(e){return ly.copy(this).projectOnVector(e),this.sub(ly)}reflect(e){return this.sub(ly.copy(e).multiplyScalar(2*this.dot(e)))}angleTo(e){let t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;let i=this.dot(e)/t;return Math.acos(rt(i,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){let t=this.x-e.x,i=this.y-e.y,r=this.z-e.z;return t*t+i*i+r*r}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)+Math.abs(this.z-e.z)}setFromSpherical(e){return this.setFromSphericalCoords(e.radius,e.phi,e.theta)}setFromSphericalCoords(e,t,i){let r=Math.sin(t)*e;return this.x=r*Math.sin(i),this.y=Math.cos(t)*e,this.z=r*Math.cos(i),this}setFromCylindrical(e){return this.setFromCylindricalCoords(e.radius,e.theta,e.y)}setFromCylindricalCoords(e,t,i){return this.x=e*Math.sin(t),this.y=i,this.z=e*Math.cos(t),this}setFromMatrixPosition(e){let t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this}setFromMatrixScale(e){let t=this.setFromMatrixColumn(e,0).length(),i=this.setFromMatrixColumn(e,1).length(),r=this.setFromMatrixColumn(e,2).length();return this.x=t,this.y=i,this.z=r,this}setFromMatrixColumn(e,t){return this.fromArray(e.elements,t*4)}setFromMatrix3Column(e,t){return this.fromArray(e.elements,t*3)}setFromEuler(e){return this.x=e._x,this.y=e._y,this.z=e._z,this}setFromColor(e){return this.x=e.r,this.y=e.g,this.z=e.b,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){let e=Math.random()*Math.PI*2,t=Math.random()*2-1,i=Math.sqrt(1-t*t);return this.x=i*Math.cos(e),this.y=t,this.z=i*Math.sin(e),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}},ly=new O,WS=new ii,qe=class n{constructor(e,t,i,r,o,s,a,c,l){n.prototype.isMatrix3=!0,this.elements=[1,0,0,0,1,0,0,0,1],e!==void 0&&this.set(e,t,i,r,o,s,a,c,l)}set(e,t,i,r,o,s,a,c,l){let u=this.elements;return u[0]=e,u[1]=r,u[2]=a,u[3]=t,u[4]=o,u[5]=c,u[6]=i,u[7]=s,u[8]=l,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(e){let t=this.elements,i=e.elements;return t[0]=i[0],t[1]=i[1],t[2]=i[2],t[3]=i[3],t[4]=i[4],t[5]=i[5],t[6]=i[6],t[7]=i[7],t[8]=i[8],this}extractBasis(e,t,i){return e.setFromMatrix3Column(this,0),t.setFromMatrix3Column(this,1),i.setFromMatrix3Column(this,2),this}setFromMatrix4(e){let t=e.elements;return this.set(t[0],t[4],t[8],t[1],t[5],t[9],t[2],t[6],t[10]),this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){let i=e.elements,r=t.elements,o=this.elements,s=i[0],a=i[3],c=i[6],l=i[1],u=i[4],d=i[7],f=i[2],h=i[5],g=i[8],_=r[0],m=r[3],p=r[6],b=r[1],w=r[4],S=r[7],D=r[2],C=r[5],A=r[8];return o[0]=s*_+a*b+c*D,o[3]=s*m+a*w+c*C,o[6]=s*p+a*S+c*A,o[1]=l*_+u*b+d*D,o[4]=l*m+u*w+d*C,o[7]=l*p+u*S+d*A,o[2]=f*_+h*b+g*D,o[5]=f*m+h*w+g*C,o[8]=f*p+h*S+g*A,this}multiplyScalar(e){let t=this.elements;return t[0]*=e,t[3]*=e,t[6]*=e,t[1]*=e,t[4]*=e,t[7]*=e,t[2]*=e,t[5]*=e,t[8]*=e,this}determinant(){let e=this.elements,t=e[0],i=e[1],r=e[2],o=e[3],s=e[4],a=e[5],c=e[6],l=e[7],u=e[8];return t*s*u-t*a*l-i*o*u+i*a*c+r*o*l-r*s*c}invert(){let e=this.elements,t=e[0],i=e[1],r=e[2],o=e[3],s=e[4],a=e[5],c=e[6],l=e[7],u=e[8],d=u*s-a*l,f=a*c-u*o,h=l*o-s*c,g=t*d+i*f+r*h;if(g===0)return this.set(0,0,0,0,0,0,0,0,0);let _=1/g;return e[0]=d*_,e[1]=(r*l-u*i)*_,e[2]=(a*i-r*s)*_,e[3]=f*_,e[4]=(u*t-r*c)*_,e[5]=(r*o-a*t)*_,e[6]=h*_,e[7]=(i*c-l*t)*_,e[8]=(s*t-i*o)*_,this}transpose(){let e,t=this.elements;return e=t[1],t[1]=t[3],t[3]=e,e=t[2],t[2]=t[6],t[6]=e,e=t[5],t[5]=t[7],t[7]=e,this}getNormalMatrix(e){return this.setFromMatrix4(e).invert().transpose()}transposeIntoArray(e){let t=this.elements;return e[0]=t[0],e[1]=t[3],e[2]=t[6],e[3]=t[1],e[4]=t[4],e[5]=t[7],e[6]=t[2],e[7]=t[5],e[8]=t[8],this}setUvTransform(e,t,i,r,o,s,a){let c=Math.cos(o),l=Math.sin(o);return this.set(i*c,i*l,-i*(c*s+l*a)+s+e,-r*l,r*c,-r*(-l*s+c*a)+a+t,0,0,1),this}scale(e,t){return this.premultiply(uy.makeScale(e,t)),this}rotate(e){return this.premultiply(uy.makeRotation(-e)),this}translate(e,t){return this.premultiply(uy.makeTranslation(e,t)),this}makeTranslation(e,t){return e.isVector2?this.set(1,0,e.x,0,1,e.y,0,0,1):this.set(1,0,e,0,1,t,0,0,1),this}makeRotation(e){let t=Math.cos(e),i=Math.sin(e);return this.set(t,-i,0,i,t,0,0,0,1),this}makeScale(e,t){return this.set(e,0,0,0,t,0,0,0,1),this}equals(e){let t=this.elements,i=e.elements;for(let r=0;r<9;r++)if(t[r]!==i[r])return!1;return!0}fromArray(e,t=0){for(let i=0;i<9;i++)this.elements[i]=e[i+t];return this}toArray(e=[],t=0){let i=this.elements;return e[t]=i[0],e[t+1]=i[1],e[t+2]=i[2],e[t+3]=i[3],e[t+4]=i[4],e[t+5]=i[5],e[t+6]=i[6],e[t+7]=i[7],e[t+8]=i[8],e}clone(){return new this.constructor().fromArray(this.elements)}},uy=new qe,$S=new qe().set(.4123908,.3575843,.1804808,.212639,.7151687,.0721923,.0193308,.1191948,.9505322),qS=new qe().set(3.2409699,-1.5373832,-.4986108,-.9692436,1.8759675,.0415551,.0556301,-.203977,1.0569715);function xN(){let n={enabled:!0,workingColorSpace:ls,spaces:{},convert:function(r,o,s){return this.enabled===!1||o===s||!o||!s||(this.spaces[o].transfer===_t&&(r.r=Cr(r.r),r.g=Cr(r.g),r.b=Cr(r.b)),this.spaces[o].primaries!==this.spaces[s].primaries&&(r.applyMatrix3(this.spaces[o].toXYZ),r.applyMatrix3(this.spaces[s].fromXYZ)),this.spaces[s].transfer===_t&&(r.r=Ca(r.r),r.g=Ca(r.g),r.b=Ca(r.b))),r},workingToColorSpace:function(r,o){return this.convert(r,this.workingColorSpace,o)},colorSpaceToWorking:function(r,o){return this.convert(r,o,this.workingColorSpace)},getPrimaries:function(r){return this.spaces[r].primaries},getTransfer:function(r){return r===Ar?hl:this.spaces[r].transfer},getToneMappingMode:function(r){return this.spaces[r].outputColorSpaceConfig.toneMappingMode||"standard"},getLuminanceCoefficients:function(r,o=this.workingColorSpace){return r.fromArray(this.spaces[o].luminanceCoefficients)},define:function(r){Object.assign(this.spaces,r)},_getMatrix:function(r,o,s){return r.copy(this.spaces[o].toXYZ).multiply(this.spaces[s].fromXYZ)},_getDrawingBufferColorSpace:function(r){return this.spaces[r].outputColorSpaceConfig.drawingBufferColorSpace},_getUnpackColorSpace:function(r=this.workingColorSpace){return this.spaces[r].workingColorSpaceConfig.unpackColorSpace},fromWorkingColorSpace:function(r,o){return ml("ColorManagement: .fromWorkingColorSpace() has been renamed to .workingToColorSpace()."),n.workingToColorSpace(r,o)},toWorkingColorSpace:function(r,o){return ml("ColorManagement: .toWorkingColorSpace() has been renamed to .colorSpaceToWorking()."),n.colorSpaceToWorking(r,o)}},e=[.64,.33,.3,.6,.15,.06],t=[.2126,.7152,.0722],i=[.3127,.329];return n.define({[ls]:{primaries:e,whitePoint:i,transfer:hl,toXYZ:$S,fromXYZ:qS,luminanceCoefficients:t,workingColorSpaceConfig:{unpackColorSpace:ni},outputColorSpaceConfig:{drawingBufferColorSpace:ni}},[ni]:{primaries:e,whitePoint:i,transfer:_t,toXYZ:$S,fromXYZ:qS,luminanceCoefficients:t,outputColorSpaceConfig:{drawingBufferColorSpace:ni}}}),n}var at=xN();function Cr(n){return n<.04045?n*.0773993808:Math.pow(n*.9478672986+.0521327014,2.4)}function Ca(n){return n<.0031308?n*12.92:1.055*Math.pow(n,.41666)-.055}var pa,rh=class{static getDataURL(e,t="image/png"){if(/^data:/i.test(e.src)||typeof HTMLCanvasElement>"u")return e.src;let i;if(e instanceof HTMLCanvasElement)i=e;else{pa===void 0&&(pa=pl("canvas")),pa.width=e.width,pa.height=e.height;let r=pa.getContext("2d");e instanceof ImageData?r.putImageData(e,0,0):r.drawImage(e,0,0,e.width,e.height),i=pa}return i.toDataURL(t)}static sRGBToLinear(e){if(typeof HTMLImageElement<"u"&&e instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&e instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&e instanceof ImageBitmap){let t=pl("canvas");t.width=e.width,t.height=e.height;let i=t.getContext("2d");i.drawImage(e,0,0,e.width,e.height);let r=i.getImageData(0,0,e.width,e.height),o=r.data;for(let s=0;s<o.length;s++)o[s]=Cr(o[s]/255)*255;return i.putImageData(r,0,0),t}else if(e.data){let t=e.data.slice(0);for(let i=0;i<t.length;i++)t instanceof Uint8Array||t instanceof Uint8ClampedArray?t[i]=Math.floor(Cr(t[i]/255)*255):t[i]=Cr(t[i]);return{data:t,width:e.width,height:e.height}}else return ke("ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),e}},bN=0,Ia=class{constructor(e=null){this.isSource=!0,Object.defineProperty(this,"id",{value:bN++}),this.uuid=Ul(),this.data=e,this.dataReady=!0,this.version=0}getSize(e){let t=this.data;return typeof HTMLVideoElement<"u"&&t instanceof HTMLVideoElement?e.set(t.videoWidth,t.videoHeight,0):typeof VideoFrame<"u"&&t instanceof VideoFrame?e.set(t.displayHeight,t.displayWidth,0):t!==null?e.set(t.width,t.height,t.depth||0):e.set(0,0,0),e}set needsUpdate(e){e===!0&&this.version++}toJSON(e){let t=e===void 0||typeof e=="string";if(!t&&e.images[this.uuid]!==void 0)return e.images[this.uuid];let i={uuid:this.uuid,url:""},r=this.data;if(r!==null){let o;if(Array.isArray(r)){o=[];for(let s=0,a=r.length;s<a;s++)r[s].isDataTexture?o.push(dy(r[s].image)):o.push(dy(r[s]))}else o=dy(r);i.url=o}return t||(e.images[this.uuid]=i),i}};function dy(n){return typeof HTMLImageElement<"u"&&n instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&n instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&n instanceof ImageBitmap?rh.getDataURL(n):n.data?{data:Array.from(n.data),width:n.width,height:n.height,type:n.data.constructor.name}:(ke("Texture: Unable to serialize Texture."),{})}var MN=0,fy=new O,Rr=(()=>{class n extends Dr{constructor(t=n.DEFAULT_IMAGE,i=n.DEFAULT_MAPPING,r=Yi,o=Yi,s=mn,a=yo,c=_i,l=qn,u=n.DEFAULT_ANISOTROPY,d=Ar){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:MN++}),this.uuid=Ul(),this.name="",this.source=new Ia(t),this.mipmaps=[],this.mapping=i,this.channel=0,this.wrapS=r,this.wrapT=o,this.magFilter=s,this.minFilter=a,this.anisotropy=u,this.format=c,this.internalFormat=null,this.type=l,this.offset=new ot(0,0),this.repeat=new ot(1,1),this.center=new ot(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new qe,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=d,this.userData={},this.updateRanges=[],this.version=0,this.onUpdate=null,this.renderTarget=null,this.isRenderTargetTexture=!1,this.isArrayTexture=!!(t&&t.depth&&t.depth>1),this.pmremVersion=0}get width(){return this.source.getSize(fy).x}get height(){return this.source.getSize(fy).y}get depth(){return this.source.getSize(fy).z}get image(){return this.source.data}set image(t=null){this.source.data=t}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}addUpdateRange(t,i){this.updateRanges.push({start:t,count:i})}clearUpdateRanges(){this.updateRanges.length=0}clone(){return new this.constructor().copy(this)}copy(t){return this.name=t.name,this.source=t.source,this.mipmaps=t.mipmaps.slice(0),this.mapping=t.mapping,this.channel=t.channel,this.wrapS=t.wrapS,this.wrapT=t.wrapT,this.magFilter=t.magFilter,this.minFilter=t.minFilter,this.anisotropy=t.anisotropy,this.format=t.format,this.internalFormat=t.internalFormat,this.type=t.type,this.offset.copy(t.offset),this.repeat.copy(t.repeat),this.center.copy(t.center),this.rotation=t.rotation,this.matrixAutoUpdate=t.matrixAutoUpdate,this.matrix.copy(t.matrix),this.generateMipmaps=t.generateMipmaps,this.premultiplyAlpha=t.premultiplyAlpha,this.flipY=t.flipY,this.unpackAlignment=t.unpackAlignment,this.colorSpace=t.colorSpace,this.renderTarget=t.renderTarget,this.isRenderTargetTexture=t.isRenderTargetTexture,this.isArrayTexture=t.isArrayTexture,this.userData=JSON.parse(JSON.stringify(t.userData)),this.needsUpdate=!0,this}setValues(t){for(let i in t){let r=t[i];if(r===void 0){ke(`Texture.setValues(): parameter '${i}' has value of undefined.`);continue}let o=this[i];if(o===void 0){ke(`Texture.setValues(): property '${i}' does not exist.`);continue}o&&r&&o.isVector2&&r.isVector2||o&&r&&o.isVector3&&r.isVector3||o&&r&&o.isMatrix3&&r.isMatrix3?o.copy(r):this[i]=r}}toJSON(t){let i=t===void 0||typeof t=="string";if(!i&&t.textures[this.uuid]!==void 0)return t.textures[this.uuid];let r={metadata:{version:4.7,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(t).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(r.userData=this.userData),i||(t.textures[this.uuid]=r),r}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(t){if(this.mapping!==Ny)return t;if(t.applyMatrix3(this.matrix),t.x<0||t.x>1)switch(this.wrapS){case eh:t.x=t.x-Math.floor(t.x);break;case Yi:t.x=t.x<0?0:1;break;case th:Math.abs(Math.floor(t.x)%2)===1?t.x=Math.ceil(t.x)-t.x:t.x=t.x-Math.floor(t.x);break}if(t.y<0||t.y>1)switch(this.wrapT){case eh:t.y=t.y-Math.floor(t.y);break;case Yi:t.y=t.y<0?0:1;break;case th:Math.abs(Math.floor(t.y)%2)===1?t.y=Math.ceil(t.y)-t.y:t.y=t.y-Math.floor(t.y);break}return this.flipY&&(t.y=1-t.y),t}set needsUpdate(t){t===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(t){t===!0&&this.pmremVersion++}}return n.DEFAULT_IMAGE=null,n.DEFAULT_MAPPING=Ny,n.DEFAULT_ANISOTROPY=1,n})(),Ht=class n{constructor(e=0,t=0,i=0,r=1){n.prototype.isVector4=!0,this.x=e,this.y=t,this.z=i,this.w=r}get width(){return this.z}set width(e){this.z=e}get height(){return this.w}set height(e){this.w=e}set(e,t,i,r){return this.x=e,this.y=t,this.z=i,this.w=r,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this.w=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setW(e){return this.w=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;case 3:this.w=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this.w=e.w!==void 0?e.w:1,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this.w+=e.w,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this.w+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this.w=e.w+t.w,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this.w+=e.w*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this.w-=e.w,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this.w-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this.w=e.w-t.w,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this.w*=e.w,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this.w*=e,this}applyMatrix4(e){let t=this.x,i=this.y,r=this.z,o=this.w,s=e.elements;return this.x=s[0]*t+s[4]*i+s[8]*r+s[12]*o,this.y=s[1]*t+s[5]*i+s[9]*r+s[13]*o,this.z=s[2]*t+s[6]*i+s[10]*r+s[14]*o,this.w=s[3]*t+s[7]*i+s[11]*r+s[15]*o,this}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this.w/=e.w,this}divideScalar(e){return this.multiplyScalar(1/e)}setAxisAngleFromQuaternion(e){this.w=2*Math.acos(e.w);let t=Math.sqrt(1-e.w*e.w);return t<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=e.x/t,this.y=e.y/t,this.z=e.z/t),this}setAxisAngleFromRotationMatrix(e){let t,i,r,o,c=e.elements,l=c[0],u=c[4],d=c[8],f=c[1],h=c[5],g=c[9],_=c[2],m=c[6],p=c[10];if(Math.abs(u-f)<.01&&Math.abs(d-_)<.01&&Math.abs(g-m)<.01){if(Math.abs(u+f)<.1&&Math.abs(d+_)<.1&&Math.abs(g+m)<.1&&Math.abs(l+h+p-3)<.1)return this.set(1,0,0,0),this;t=Math.PI;let w=(l+1)/2,S=(h+1)/2,D=(p+1)/2,C=(u+f)/4,A=(d+_)/4,y=(g+m)/4;return w>S&&w>D?w<.01?(i=0,r=.707106781,o=.707106781):(i=Math.sqrt(w),r=C/i,o=A/i):S>D?S<.01?(i=.707106781,r=0,o=.707106781):(r=Math.sqrt(S),i=C/r,o=y/r):D<.01?(i=.707106781,r=.707106781,o=0):(o=Math.sqrt(D),i=A/o,r=y/o),this.set(i,r,o,t),this}let b=Math.sqrt((m-g)*(m-g)+(d-_)*(d-_)+(f-u)*(f-u));return Math.abs(b)<.001&&(b=1),this.x=(m-g)/b,this.y=(d-_)/b,this.z=(f-u)/b,this.w=Math.acos((l+h+p-1)/2),this}setFromMatrixPosition(e){let t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this.w=t[15],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this.w=Math.min(this.w,e.w),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this.w=Math.max(this.w,e.w),this}clamp(e,t){return this.x=rt(this.x,e.x,t.x),this.y=rt(this.y,e.y,t.y),this.z=rt(this.z,e.z,t.z),this.w=rt(this.w,e.w,t.w),this}clampScalar(e,t){return this.x=rt(this.x,e,t),this.y=rt(this.y,e,t),this.z=rt(this.z,e,t),this.w=rt(this.w,e,t),this}clampLength(e,t){let i=this.length();return this.divideScalar(i||1).multiplyScalar(rt(i,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z+this.w*e.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this.w+=(e.w-this.w)*t,this}lerpVectors(e,t,i){return this.x=e.x+(t.x-e.x)*i,this.y=e.y+(t.y-e.y)*i,this.z=e.z+(t.z-e.z)*i,this.w=e.w+(t.w-e.w)*i,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z&&e.w===this.w}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this.w=e[t+3],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e[t+3]=this.w,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this.w=e.getW(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}},oh=class extends Dr{constructor(e=1,t=1,i={}){super(),i=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:mn,depthBuffer:!0,stencilBuffer:!1,resolveDepthBuffer:!0,resolveStencilBuffer:!0,depthTexture:null,samples:0,count:1,depth:1,multiview:!1},i),this.isRenderTarget=!0,this.width=e,this.height=t,this.depth=i.depth,this.scissor=new Ht(0,0,e,t),this.scissorTest=!1,this.viewport=new Ht(0,0,e,t),this.textures=[];let r={width:e,height:t,depth:i.depth},o=new Rr(r),s=i.count;for(let a=0;a<s;a++)this.textures[a]=o.clone(),this.textures[a].isRenderTargetTexture=!0,this.textures[a].renderTarget=this;this._setTextureOptions(i),this.depthBuffer=i.depthBuffer,this.stencilBuffer=i.stencilBuffer,this.resolveDepthBuffer=i.resolveDepthBuffer,this.resolveStencilBuffer=i.resolveStencilBuffer,this._depthTexture=null,this.depthTexture=i.depthTexture,this.samples=i.samples,this.multiview=i.multiview}_setTextureOptions(e={}){let t={minFilter:mn,generateMipmaps:!1,flipY:!1,internalFormat:null};e.mapping!==void 0&&(t.mapping=e.mapping),e.wrapS!==void 0&&(t.wrapS=e.wrapS),e.wrapT!==void 0&&(t.wrapT=e.wrapT),e.wrapR!==void 0&&(t.wrapR=e.wrapR),e.magFilter!==void 0&&(t.magFilter=e.magFilter),e.minFilter!==void 0&&(t.minFilter=e.minFilter),e.format!==void 0&&(t.format=e.format),e.type!==void 0&&(t.type=e.type),e.anisotropy!==void 0&&(t.anisotropy=e.anisotropy),e.colorSpace!==void 0&&(t.colorSpace=e.colorSpace),e.flipY!==void 0&&(t.flipY=e.flipY),e.generateMipmaps!==void 0&&(t.generateMipmaps=e.generateMipmaps),e.internalFormat!==void 0&&(t.internalFormat=e.internalFormat);for(let i=0;i<this.textures.length;i++)this.textures[i].setValues(t)}get texture(){return this.textures[0]}set texture(e){this.textures[0]=e}set depthTexture(e){this._depthTexture!==null&&(this._depthTexture.renderTarget=null),e!==null&&(e.renderTarget=this),this._depthTexture=e}get depthTexture(){return this._depthTexture}setSize(e,t,i=1){if(this.width!==e||this.height!==t||this.depth!==i){this.width=e,this.height=t,this.depth=i;for(let r=0,o=this.textures.length;r<o;r++)this.textures[r].image.width=e,this.textures[r].image.height=t,this.textures[r].image.depth=i,this.textures[r].isData3DTexture!==!0&&(this.textures[r].isArrayTexture=this.textures[r].image.depth>1);this.dispose()}this.viewport.set(0,0,e,t),this.scissor.set(0,0,e,t)}clone(){return new this.constructor().copy(this)}copy(e){this.width=e.width,this.height=e.height,this.depth=e.depth,this.scissor.copy(e.scissor),this.scissorTest=e.scissorTest,this.viewport.copy(e.viewport),this.textures.length=0;for(let t=0,i=e.textures.length;t<i;t++){this.textures[t]=e.textures[t].clone(),this.textures[t].isRenderTargetTexture=!0,this.textures[t].renderTarget=this;let r=Object.assign({},e.textures[t].image);this.textures[t].source=new Ia(r)}return this.depthBuffer=e.depthBuffer,this.stencilBuffer=e.stencilBuffer,this.resolveDepthBuffer=e.resolveDepthBuffer,this.resolveStencilBuffer=e.resolveStencilBuffer,e.depthTexture!==null&&(this.depthTexture=e.depthTexture.clone()),this.samples=e.samples,this}dispose(){this.dispatchEvent({type:"dispose"})}},ri=class extends oh{constructor(e=1,t=1,i={}){super(e,t,i),this.isWebGLRenderTarget=!0}},gl=class extends Rr{constructor(e=null,t=1,i=1,r=1){super(null),this.isDataArrayTexture=!0,this.image={data:e,width:t,height:i,depth:r},this.magFilter=ln,this.minFilter=ln,this.wrapR=Yi,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}addLayerUpdate(e){this.layerUpdates.add(e)}clearLayerUpdates(){this.layerUpdates.clear()}};var sh=class extends Rr{constructor(e=null,t=1,i=1,r=1){super(null),this.isData3DTexture=!0,this.image={data:e,width:t,height:i,depth:r},this.magFilter=ln,this.minFilter=ln,this.wrapR=Yi,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}};var Ot=class n{constructor(e,t,i,r,o,s,a,c,l,u,d,f,h,g,_,m){n.prototype.isMatrix4=!0,this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],e!==void 0&&this.set(e,t,i,r,o,s,a,c,l,u,d,f,h,g,_,m)}set(e,t,i,r,o,s,a,c,l,u,d,f,h,g,_,m){let p=this.elements;return p[0]=e,p[4]=t,p[8]=i,p[12]=r,p[1]=o,p[5]=s,p[9]=a,p[13]=c,p[2]=l,p[6]=u,p[10]=d,p[14]=f,p[3]=h,p[7]=g,p[11]=_,p[15]=m,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new n().fromArray(this.elements)}copy(e){let t=this.elements,i=e.elements;return t[0]=i[0],t[1]=i[1],t[2]=i[2],t[3]=i[3],t[4]=i[4],t[5]=i[5],t[6]=i[6],t[7]=i[7],t[8]=i[8],t[9]=i[9],t[10]=i[10],t[11]=i[11],t[12]=i[12],t[13]=i[13],t[14]=i[14],t[15]=i[15],this}copyPosition(e){let t=this.elements,i=e.elements;return t[12]=i[12],t[13]=i[13],t[14]=i[14],this}setFromMatrix3(e){let t=e.elements;return this.set(t[0],t[3],t[6],0,t[1],t[4],t[7],0,t[2],t[5],t[8],0,0,0,0,1),this}extractBasis(e,t,i){return this.determinant()===0?(e.set(1,0,0),t.set(0,1,0),i.set(0,0,1),this):(e.setFromMatrixColumn(this,0),t.setFromMatrixColumn(this,1),i.setFromMatrixColumn(this,2),this)}makeBasis(e,t,i){return this.set(e.x,t.x,i.x,0,e.y,t.y,i.y,0,e.z,t.z,i.z,0,0,0,0,1),this}extractRotation(e){if(e.determinant()===0)return this.identity();let t=this.elements,i=e.elements,r=1/ma.setFromMatrixColumn(e,0).length(),o=1/ma.setFromMatrixColumn(e,1).length(),s=1/ma.setFromMatrixColumn(e,2).length();return t[0]=i[0]*r,t[1]=i[1]*r,t[2]=i[2]*r,t[3]=0,t[4]=i[4]*o,t[5]=i[5]*o,t[6]=i[6]*o,t[7]=0,t[8]=i[8]*s,t[9]=i[9]*s,t[10]=i[10]*s,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromEuler(e){let t=this.elements,i=e.x,r=e.y,o=e.z,s=Math.cos(i),a=Math.sin(i),c=Math.cos(r),l=Math.sin(r),u=Math.cos(o),d=Math.sin(o);if(e.order==="XYZ"){let f=s*u,h=s*d,g=a*u,_=a*d;t[0]=c*u,t[4]=-c*d,t[8]=l,t[1]=h+g*l,t[5]=f-_*l,t[9]=-a*c,t[2]=_-f*l,t[6]=g+h*l,t[10]=s*c}else if(e.order==="YXZ"){let f=c*u,h=c*d,g=l*u,_=l*d;t[0]=f+_*a,t[4]=g*a-h,t[8]=s*l,t[1]=s*d,t[5]=s*u,t[9]=-a,t[2]=h*a-g,t[6]=_+f*a,t[10]=s*c}else if(e.order==="ZXY"){let f=c*u,h=c*d,g=l*u,_=l*d;t[0]=f-_*a,t[4]=-s*d,t[8]=g+h*a,t[1]=h+g*a,t[5]=s*u,t[9]=_-f*a,t[2]=-s*l,t[6]=a,t[10]=s*c}else if(e.order==="ZYX"){let f=s*u,h=s*d,g=a*u,_=a*d;t[0]=c*u,t[4]=g*l-h,t[8]=f*l+_,t[1]=c*d,t[5]=_*l+f,t[9]=h*l-g,t[2]=-l,t[6]=a*c,t[10]=s*c}else if(e.order==="YZX"){let f=s*c,h=s*l,g=a*c,_=a*l;t[0]=c*u,t[4]=_-f*d,t[8]=g*d+h,t[1]=d,t[5]=s*u,t[9]=-a*u,t[2]=-l*u,t[6]=h*d+g,t[10]=f-_*d}else if(e.order==="XZY"){let f=s*c,h=s*l,g=a*c,_=a*l;t[0]=c*u,t[4]=-d,t[8]=l*u,t[1]=f*d+_,t[5]=s*u,t[9]=h*d-g,t[2]=g*d-h,t[6]=a*u,t[10]=_*d+f}return t[3]=0,t[7]=0,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromQuaternion(e){return this.compose(SN,e,EN)}lookAt(e,t,i){let r=this.elements;return ei.subVectors(e,t),ei.lengthSq()===0&&(ei.z=1),ei.normalize(),no.crossVectors(i,ei),no.lengthSq()===0&&(Math.abs(i.z)===1?ei.x+=1e-4:ei.z+=1e-4,ei.normalize(),no.crossVectors(i,ei)),no.normalize(),Mf.crossVectors(ei,no),r[0]=no.x,r[4]=Mf.x,r[8]=ei.x,r[1]=no.y,r[5]=Mf.y,r[9]=ei.y,r[2]=no.z,r[6]=Mf.z,r[10]=ei.z,this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){let i=e.elements,r=t.elements,o=this.elements,s=i[0],a=i[4],c=i[8],l=i[12],u=i[1],d=i[5],f=i[9],h=i[13],g=i[2],_=i[6],m=i[10],p=i[14],b=i[3],w=i[7],S=i[11],D=i[15],C=r[0],A=r[4],y=r[8],M=r[12],j=r[1],T=r[5],L=r[9],k=r[13],G=r[2],B=r[6],H=r[10],F=r[14],ee=r[3],Z=r[7],he=r[11],xe=r[15];return o[0]=s*C+a*j+c*G+l*ee,o[4]=s*A+a*T+c*B+l*Z,o[8]=s*y+a*L+c*H+l*he,o[12]=s*M+a*k+c*F+l*xe,o[1]=u*C+d*j+f*G+h*ee,o[5]=u*A+d*T+f*B+h*Z,o[9]=u*y+d*L+f*H+h*he,o[13]=u*M+d*k+f*F+h*xe,o[2]=g*C+_*j+m*G+p*ee,o[6]=g*A+_*T+m*B+p*Z,o[10]=g*y+_*L+m*H+p*he,o[14]=g*M+_*k+m*F+p*xe,o[3]=b*C+w*j+S*G+D*ee,o[7]=b*A+w*T+S*B+D*Z,o[11]=b*y+w*L+S*H+D*he,o[15]=b*M+w*k+S*F+D*xe,this}multiplyScalar(e){let t=this.elements;return t[0]*=e,t[4]*=e,t[8]*=e,t[12]*=e,t[1]*=e,t[5]*=e,t[9]*=e,t[13]*=e,t[2]*=e,t[6]*=e,t[10]*=e,t[14]*=e,t[3]*=e,t[7]*=e,t[11]*=e,t[15]*=e,this}determinant(){let e=this.elements,t=e[0],i=e[4],r=e[8],o=e[12],s=e[1],a=e[5],c=e[9],l=e[13],u=e[2],d=e[6],f=e[10],h=e[14],g=e[3],_=e[7],m=e[11],p=e[15],b=c*h-l*f,w=a*h-l*d,S=a*f-c*d,D=s*h-l*u,C=s*f-c*u,A=s*d-a*u;return t*(_*b-m*w+p*S)-i*(g*b-m*D+p*C)+r*(g*w-_*D+p*A)-o*(g*S-_*C+m*A)}transpose(){let e=this.elements,t;return t=e[1],e[1]=e[4],e[4]=t,t=e[2],e[2]=e[8],e[8]=t,t=e[6],e[6]=e[9],e[9]=t,t=e[3],e[3]=e[12],e[12]=t,t=e[7],e[7]=e[13],e[13]=t,t=e[11],e[11]=e[14],e[14]=t,this}setPosition(e,t,i){let r=this.elements;return e.isVector3?(r[12]=e.x,r[13]=e.y,r[14]=e.z):(r[12]=e,r[13]=t,r[14]=i),this}invert(){let e=this.elements,t=e[0],i=e[1],r=e[2],o=e[3],s=e[4],a=e[5],c=e[6],l=e[7],u=e[8],d=e[9],f=e[10],h=e[11],g=e[12],_=e[13],m=e[14],p=e[15],b=t*a-i*s,w=t*c-r*s,S=t*l-o*s,D=i*c-r*a,C=i*l-o*a,A=r*l-o*c,y=u*_-d*g,M=u*m-f*g,j=u*p-h*g,T=d*m-f*_,L=d*p-h*_,k=f*p-h*m,G=b*k-w*L+S*T+D*j-C*M+A*y;if(G===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);let B=1/G;return e[0]=(a*k-c*L+l*T)*B,e[1]=(r*L-i*k-o*T)*B,e[2]=(_*A-m*C+p*D)*B,e[3]=(f*C-d*A-h*D)*B,e[4]=(c*j-s*k-l*M)*B,e[5]=(t*k-r*j+o*M)*B,e[6]=(m*S-g*A-p*w)*B,e[7]=(u*A-f*S+h*w)*B,e[8]=(s*L-a*j+l*y)*B,e[9]=(i*j-t*L-o*y)*B,e[10]=(g*C-_*S+p*b)*B,e[11]=(d*S-u*C-h*b)*B,e[12]=(a*M-s*T-c*y)*B,e[13]=(t*T-i*M+r*y)*B,e[14]=(_*w-g*D-m*b)*B,e[15]=(u*D-d*w+f*b)*B,this}scale(e){let t=this.elements,i=e.x,r=e.y,o=e.z;return t[0]*=i,t[4]*=r,t[8]*=o,t[1]*=i,t[5]*=r,t[9]*=o,t[2]*=i,t[6]*=r,t[10]*=o,t[3]*=i,t[7]*=r,t[11]*=o,this}getMaxScaleOnAxis(){let e=this.elements,t=e[0]*e[0]+e[1]*e[1]+e[2]*e[2],i=e[4]*e[4]+e[5]*e[5]+e[6]*e[6],r=e[8]*e[8]+e[9]*e[9]+e[10]*e[10];return Math.sqrt(Math.max(t,i,r))}makeTranslation(e,t,i){return e.isVector3?this.set(1,0,0,e.x,0,1,0,e.y,0,0,1,e.z,0,0,0,1):this.set(1,0,0,e,0,1,0,t,0,0,1,i,0,0,0,1),this}makeRotationX(e){let t=Math.cos(e),i=Math.sin(e);return this.set(1,0,0,0,0,t,-i,0,0,i,t,0,0,0,0,1),this}makeRotationY(e){let t=Math.cos(e),i=Math.sin(e);return this.set(t,0,i,0,0,1,0,0,-i,0,t,0,0,0,0,1),this}makeRotationZ(e){let t=Math.cos(e),i=Math.sin(e);return this.set(t,-i,0,0,i,t,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(e,t){let i=Math.cos(t),r=Math.sin(t),o=1-i,s=e.x,a=e.y,c=e.z,l=o*s,u=o*a;return this.set(l*s+i,l*a-r*c,l*c+r*a,0,l*a+r*c,u*a+i,u*c-r*s,0,l*c-r*a,u*c+r*s,o*c*c+i,0,0,0,0,1),this}makeScale(e,t,i){return this.set(e,0,0,0,0,t,0,0,0,0,i,0,0,0,0,1),this}makeShear(e,t,i,r,o,s){return this.set(1,i,o,0,e,1,s,0,t,r,1,0,0,0,0,1),this}compose(e,t,i){let r=this.elements,o=t._x,s=t._y,a=t._z,c=t._w,l=o+o,u=s+s,d=a+a,f=o*l,h=o*u,g=o*d,_=s*u,m=s*d,p=a*d,b=c*l,w=c*u,S=c*d,D=i.x,C=i.y,A=i.z;return r[0]=(1-(_+p))*D,r[1]=(h+S)*D,r[2]=(g-w)*D,r[3]=0,r[4]=(h-S)*C,r[5]=(1-(f+p))*C,r[6]=(m+b)*C,r[7]=0,r[8]=(g+w)*A,r[9]=(m-b)*A,r[10]=(1-(f+_))*A,r[11]=0,r[12]=e.x,r[13]=e.y,r[14]=e.z,r[15]=1,this}decompose(e,t,i){let r=this.elements;e.x=r[12],e.y=r[13],e.z=r[14];let o=this.determinant();if(o===0)return i.set(1,1,1),t.identity(),this;let s=ma.set(r[0],r[1],r[2]).length(),a=ma.set(r[4],r[5],r[6]).length(),c=ma.set(r[8],r[9],r[10]).length();o<0&&(s=-s),Pi.copy(this);let l=1/s,u=1/a,d=1/c;return Pi.elements[0]*=l,Pi.elements[1]*=l,Pi.elements[2]*=l,Pi.elements[4]*=u,Pi.elements[5]*=u,Pi.elements[6]*=u,Pi.elements[8]*=d,Pi.elements[9]*=d,Pi.elements[10]*=d,t.setFromRotationMatrix(Pi),i.x=s,i.y=a,i.z=c,this}makePerspective(e,t,i,r,o,s,a=Fi,c=!1){let l=this.elements,u=2*o/(t-e),d=2*o/(i-r),f=(t+e)/(t-e),h=(i+r)/(i-r),g,_;if(c)g=o/(s-o),_=s*o/(s-o);else if(a===Fi)g=-(s+o)/(s-o),_=-2*s*o/(s-o);else if(a===Ta)g=-s/(s-o),_=-s*o/(s-o);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+a);return l[0]=u,l[4]=0,l[8]=f,l[12]=0,l[1]=0,l[5]=d,l[9]=h,l[13]=0,l[2]=0,l[6]=0,l[10]=g,l[14]=_,l[3]=0,l[7]=0,l[11]=-1,l[15]=0,this}makeOrthographic(e,t,i,r,o,s,a=Fi,c=!1){let l=this.elements,u=2/(t-e),d=2/(i-r),f=-(t+e)/(t-e),h=-(i+r)/(i-r),g,_;if(c)g=1/(s-o),_=s/(s-o);else if(a===Fi)g=-2/(s-o),_=-(s+o)/(s-o);else if(a===Ta)g=-1/(s-o),_=-o/(s-o);else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+a);return l[0]=u,l[4]=0,l[8]=0,l[12]=f,l[1]=0,l[5]=d,l[9]=0,l[13]=h,l[2]=0,l[6]=0,l[10]=g,l[14]=_,l[3]=0,l[7]=0,l[11]=0,l[15]=1,this}equals(e){let t=this.elements,i=e.elements;for(let r=0;r<16;r++)if(t[r]!==i[r])return!1;return!0}fromArray(e,t=0){for(let i=0;i<16;i++)this.elements[i]=e[i+t];return this}toArray(e=[],t=0){let i=this.elements;return e[t]=i[0],e[t+1]=i[1],e[t+2]=i[2],e[t+3]=i[3],e[t+4]=i[4],e[t+5]=i[5],e[t+6]=i[6],e[t+7]=i[7],e[t+8]=i[8],e[t+9]=i[9],e[t+10]=i[10],e[t+11]=i[11],e[t+12]=i[12],e[t+13]=i[13],e[t+14]=i[14],e[t+15]=i[15],e}},ma=new O,Pi=new Ot,SN=new O(0,0,0),EN=new O(1,1,1),no=new O,Mf=new O,ei=new O,XS=new Ot,YS=new ii,uo=(()=>{class n{constructor(t=0,i=0,r=0,o=n.DEFAULT_ORDER){this.isEuler=!0,this._x=t,this._y=i,this._z=r,this._order=o}get x(){return this._x}set x(t){this._x=t,this._onChangeCallback()}get y(){return this._y}set y(t){this._y=t,this._onChangeCallback()}get z(){return this._z}set z(t){this._z=t,this._onChangeCallback()}get order(){return this._order}set order(t){this._order=t,this._onChangeCallback()}set(t,i,r,o=this._order){return this._x=t,this._y=i,this._z=r,this._order=o,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(t){return this._x=t._x,this._y=t._y,this._z=t._z,this._order=t._order,this._onChangeCallback(),this}setFromRotationMatrix(t,i=this._order,r=!0){let o=t.elements,s=o[0],a=o[4],c=o[8],l=o[1],u=o[5],d=o[9],f=o[2],h=o[6],g=o[10];switch(i){case"XYZ":this._y=Math.asin(rt(c,-1,1)),Math.abs(c)<.9999999?(this._x=Math.atan2(-d,g),this._z=Math.atan2(-a,s)):(this._x=Math.atan2(h,u),this._z=0);break;case"YXZ":this._x=Math.asin(-rt(d,-1,1)),Math.abs(d)<.9999999?(this._y=Math.atan2(c,g),this._z=Math.atan2(l,u)):(this._y=Math.atan2(-f,s),this._z=0);break;case"ZXY":this._x=Math.asin(rt(h,-1,1)),Math.abs(h)<.9999999?(this._y=Math.atan2(-f,g),this._z=Math.atan2(-a,u)):(this._y=0,this._z=Math.atan2(l,s));break;case"ZYX":this._y=Math.asin(-rt(f,-1,1)),Math.abs(f)<.9999999?(this._x=Math.atan2(h,g),this._z=Math.atan2(l,s)):(this._x=0,this._z=Math.atan2(-a,u));break;case"YZX":this._z=Math.asin(rt(l,-1,1)),Math.abs(l)<.9999999?(this._x=Math.atan2(-d,u),this._y=Math.atan2(-f,s)):(this._x=0,this._y=Math.atan2(c,g));break;case"XZY":this._z=Math.asin(-rt(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(h,u),this._y=Math.atan2(c,s)):(this._x=Math.atan2(-d,g),this._y=0);break;default:ke("Euler: .setFromRotationMatrix() encountered an unknown order: "+i)}return this._order=i,r===!0&&this._onChangeCallback(),this}setFromQuaternion(t,i,r){return XS.makeRotationFromQuaternion(t),this.setFromRotationMatrix(XS,i,r)}setFromVector3(t,i=this._order){return this.set(t.x,t.y,t.z,i)}reorder(t){return YS.setFromEuler(this),this.setFromQuaternion(YS,t)}equals(t){return t._x===this._x&&t._y===this._y&&t._z===this._z&&t._order===this._order}fromArray(t){return this._x=t[0],this._y=t[1],this._z=t[2],t[3]!==void 0&&(this._order=t[3]),this._onChangeCallback(),this}toArray(t=[],i=0){return t[i]=this._x,t[i+1]=this._y,t[i+2]=this._z,t[i+3]=this._order,t}_onChange(t){return this._onChangeCallback=t,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}}return n.DEFAULT_ORDER="XYZ",n})(),Aa=class{constructor(){this.mask=1}set(e){this.mask=(1<<e|0)>>>0}enable(e){this.mask|=1<<e|0}enableAll(){this.mask=-1}toggle(e){this.mask^=1<<e|0}disable(e){this.mask&=~(1<<e|0)}disableAll(){this.mask=0}test(e){return(this.mask&e.mask)!==0}isEnabled(e){return(this.mask&(1<<e|0))!==0}},wN=0,ZS=new O,ga=new ii,xr=new Ot,Sf=new O,al=new O,CN=new O,TN=new ii,JS=new O(1,0,0),KS=new O(0,1,0),QS=new O(0,0,1),eE={type:"added"},DN={type:"removed"},va={type:"childadded",child:null},hy={type:"childremoved",child:null},ki=(()=>{class n extends Dr{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:wN++}),this.uuid=Ul(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=n.DEFAULT_UP.clone();let t=new O,i=new uo,r=new ii,o=new O(1,1,1);function s(){r.setFromEuler(i,!1)}function a(){i.setFromQuaternion(r,void 0,!1)}i._onChange(s),r._onChange(a),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:t},rotation:{configurable:!0,enumerable:!0,value:i},quaternion:{configurable:!0,enumerable:!0,value:r},scale:{configurable:!0,enumerable:!0,value:o},modelViewMatrix:{value:new Ot},normalMatrix:{value:new qe}}),this.matrix=new Ot,this.matrixWorld=new Ot,this.matrixAutoUpdate=n.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=n.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new Aa,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.customDepthMaterial=void 0,this.customDistanceMaterial=void 0,this.static=!1,this.userData={},this.pivot=null}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(t){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(t),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(t){return this.quaternion.premultiply(t),this}setRotationFromAxisAngle(t,i){this.quaternion.setFromAxisAngle(t,i)}setRotationFromEuler(t){this.quaternion.setFromEuler(t,!0)}setRotationFromMatrix(t){this.quaternion.setFromRotationMatrix(t)}setRotationFromQuaternion(t){this.quaternion.copy(t)}rotateOnAxis(t,i){return ga.setFromAxisAngle(t,i),this.quaternion.multiply(ga),this}rotateOnWorldAxis(t,i){return ga.setFromAxisAngle(t,i),this.quaternion.premultiply(ga),this}rotateX(t){return this.rotateOnAxis(JS,t)}rotateY(t){return this.rotateOnAxis(KS,t)}rotateZ(t){return this.rotateOnAxis(QS,t)}translateOnAxis(t,i){return ZS.copy(t).applyQuaternion(this.quaternion),this.position.add(ZS.multiplyScalar(i)),this}translateX(t){return this.translateOnAxis(JS,t)}translateY(t){return this.translateOnAxis(KS,t)}translateZ(t){return this.translateOnAxis(QS,t)}localToWorld(t){return this.updateWorldMatrix(!0,!1),t.applyMatrix4(this.matrixWorld)}worldToLocal(t){return this.updateWorldMatrix(!0,!1),t.applyMatrix4(xr.copy(this.matrixWorld).invert())}lookAt(t,i,r){t.isVector3?Sf.copy(t):Sf.set(t,i,r);let o=this.parent;this.updateWorldMatrix(!0,!1),al.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?xr.lookAt(al,Sf,this.up):xr.lookAt(Sf,al,this.up),this.quaternion.setFromRotationMatrix(xr),o&&(xr.extractRotation(o.matrixWorld),ga.setFromRotationMatrix(xr),this.quaternion.premultiply(ga.invert()))}add(t){if(arguments.length>1){for(let i=0;i<arguments.length;i++)this.add(arguments[i]);return this}return t===this?(Fe("Object3D.add: object can't be added as a child of itself.",t),this):(t&&t.isObject3D?(t.removeFromParent(),t.parent=this,this.children.push(t),t.dispatchEvent(eE),va.child=t,this.dispatchEvent(va),va.child=null):Fe("Object3D.add: object not an instance of THREE.Object3D.",t),this)}remove(t){if(arguments.length>1){for(let r=0;r<arguments.length;r++)this.remove(arguments[r]);return this}let i=this.children.indexOf(t);return i!==-1&&(t.parent=null,this.children.splice(i,1),t.dispatchEvent(DN),hy.child=t,this.dispatchEvent(hy),hy.child=null),this}removeFromParent(){let t=this.parent;return t!==null&&t.remove(this),this}clear(){return this.remove(...this.children)}attach(t){return this.updateWorldMatrix(!0,!1),xr.copy(this.matrixWorld).invert(),t.parent!==null&&(t.parent.updateWorldMatrix(!0,!1),xr.multiply(t.parent.matrixWorld)),t.applyMatrix4(xr),t.removeFromParent(),t.parent=this,this.children.push(t),t.updateWorldMatrix(!1,!0),t.dispatchEvent(eE),va.child=t,this.dispatchEvent(va),va.child=null,this}getObjectById(t){return this.getObjectByProperty("id",t)}getObjectByName(t){return this.getObjectByProperty("name",t)}getObjectByProperty(t,i){if(this[t]===i)return this;for(let r=0,o=this.children.length;r<o;r++){let a=this.children[r].getObjectByProperty(t,i);if(a!==void 0)return a}}getObjectsByProperty(t,i,r=[]){this[t]===i&&r.push(this);let o=this.children;for(let s=0,a=o.length;s<a;s++)o[s].getObjectsByProperty(t,i,r);return r}getWorldPosition(t){return this.updateWorldMatrix(!0,!1),t.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(t){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(al,t,CN),t}getWorldScale(t){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(al,TN,t),t}getWorldDirection(t){this.updateWorldMatrix(!0,!1);let i=this.matrixWorld.elements;return t.set(i[8],i[9],i[10]).normalize()}raycast(){}traverse(t){t(this);let i=this.children;for(let r=0,o=i.length;r<o;r++)i[r].traverse(t)}traverseVisible(t){if(this.visible===!1)return;t(this);let i=this.children;for(let r=0,o=i.length;r<o;r++)i[r].traverseVisible(t)}traverseAncestors(t){let i=this.parent;i!==null&&(t(i),i.traverseAncestors(t))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale);let t=this.pivot;if(t!==null){let i=t.x,r=t.y,o=t.z,s=this.matrix.elements;s[12]+=i-s[0]*i-s[4]*r-s[8]*o,s[13]+=r-s[1]*i-s[5]*r-s[9]*o,s[14]+=o-s[2]*i-s[6]*r-s[10]*o}this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(t){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||t)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,t=!0);let i=this.children;for(let r=0,o=i.length;r<o;r++)i[r].updateMatrixWorld(t)}updateWorldMatrix(t,i){let r=this.parent;if(t===!0&&r!==null&&r.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),i===!0){let o=this.children;for(let s=0,a=o.length;s<a;s++)o[s].updateWorldMatrix(!1,!0)}}toJSON(t){let i=t===void 0||typeof t=="string",r={};i&&(t={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},r.metadata={version:4.7,type:"Object",generator:"Object3D.toJSON"});let o={};o.uuid=this.uuid,o.type=this.type,this.name!==""&&(o.name=this.name),this.castShadow===!0&&(o.castShadow=!0),this.receiveShadow===!0&&(o.receiveShadow=!0),this.visible===!1&&(o.visible=!1),this.frustumCulled===!1&&(o.frustumCulled=!1),this.renderOrder!==0&&(o.renderOrder=this.renderOrder),this.static!==!1&&(o.static=this.static),Object.keys(this.userData).length>0&&(o.userData=this.userData),o.layers=this.layers.mask,o.matrix=this.matrix.toArray(),o.up=this.up.toArray(),this.pivot!==null&&(o.pivot=this.pivot.toArray()),this.matrixAutoUpdate===!1&&(o.matrixAutoUpdate=!1),this.morphTargetDictionary!==void 0&&(o.morphTargetDictionary=Object.assign({},this.morphTargetDictionary)),this.morphTargetInfluences!==void 0&&(o.morphTargetInfluences=this.morphTargetInfluences.slice()),this.isInstancedMesh&&(o.type="InstancedMesh",o.count=this.count,o.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(o.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(o.type="BatchedMesh",o.perObjectFrustumCulled=this.perObjectFrustumCulled,o.sortObjects=this.sortObjects,o.drawRanges=this._drawRanges,o.reservedRanges=this._reservedRanges,o.geometryInfo=this._geometryInfo.map(c=>it(ae({},c),{boundingBox:c.boundingBox?c.boundingBox.toJSON():void 0,boundingSphere:c.boundingSphere?c.boundingSphere.toJSON():void 0})),o.instanceInfo=this._instanceInfo.map(c=>ae({},c)),o.availableInstanceIds=this._availableInstanceIds.slice(),o.availableGeometryIds=this._availableGeometryIds.slice(),o.nextIndexStart=this._nextIndexStart,o.nextVertexStart=this._nextVertexStart,o.geometryCount=this._geometryCount,o.maxInstanceCount=this._maxInstanceCount,o.maxVertexCount=this._maxVertexCount,o.maxIndexCount=this._maxIndexCount,o.geometryInitialized=this._geometryInitialized,o.matricesTexture=this._matricesTexture.toJSON(t),o.indirectTexture=this._indirectTexture.toJSON(t),this._colorsTexture!==null&&(o.colorsTexture=this._colorsTexture.toJSON(t)),this.boundingSphere!==null&&(o.boundingSphere=this.boundingSphere.toJSON()),this.boundingBox!==null&&(o.boundingBox=this.boundingBox.toJSON()));function s(c,l){return c[l.uuid]===void 0&&(c[l.uuid]=l.toJSON(t)),l.uuid}if(this.isScene)this.background&&(this.background.isColor?o.background=this.background.toJSON():this.background.isTexture&&(o.background=this.background.toJSON(t).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(o.environment=this.environment.toJSON(t).uuid);else if(this.isMesh||this.isLine||this.isPoints){o.geometry=s(t.geometries,this.geometry);let c=this.geometry.parameters;if(c!==void 0&&c.shapes!==void 0){let l=c.shapes;if(Array.isArray(l))for(let u=0,d=l.length;u<d;u++){let f=l[u];s(t.shapes,f)}else s(t.shapes,l)}}if(this.isSkinnedMesh&&(o.bindMode=this.bindMode,o.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(s(t.skeletons,this.skeleton),o.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){let c=[];for(let l=0,u=this.material.length;l<u;l++)c.push(s(t.materials,this.material[l]));o.material=c}else o.material=s(t.materials,this.material);if(this.children.length>0){o.children=[];for(let c=0;c<this.children.length;c++)o.children.push(this.children[c].toJSON(t).object)}if(this.animations.length>0){o.animations=[];for(let c=0;c<this.animations.length;c++){let l=this.animations[c];o.animations.push(s(t.animations,l))}}if(i){let c=a(t.geometries),l=a(t.materials),u=a(t.textures),d=a(t.images),f=a(t.shapes),h=a(t.skeletons),g=a(t.animations),_=a(t.nodes);c.length>0&&(r.geometries=c),l.length>0&&(r.materials=l),u.length>0&&(r.textures=u),d.length>0&&(r.images=d),f.length>0&&(r.shapes=f),h.length>0&&(r.skeletons=h),g.length>0&&(r.animations=g),_.length>0&&(r.nodes=_)}return r.object=o,r;function a(c){let l=[];for(let u in c){let d=c[u];delete d.metadata,l.push(d)}return l}}clone(t){return new this.constructor().copy(this,t)}copy(t,i=!0){if(this.name=t.name,this.up.copy(t.up),this.position.copy(t.position),this.rotation.order=t.rotation.order,this.quaternion.copy(t.quaternion),this.scale.copy(t.scale),t.pivot!==null&&(this.pivot=t.pivot.clone()),this.matrix.copy(t.matrix),this.matrixWorld.copy(t.matrixWorld),this.matrixAutoUpdate=t.matrixAutoUpdate,this.matrixWorldAutoUpdate=t.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=t.matrixWorldNeedsUpdate,this.layers.mask=t.layers.mask,this.visible=t.visible,this.castShadow=t.castShadow,this.receiveShadow=t.receiveShadow,this.frustumCulled=t.frustumCulled,this.renderOrder=t.renderOrder,this.static=t.static,this.animations=t.animations.slice(),this.userData=JSON.parse(JSON.stringify(t.userData)),i===!0)for(let r=0;r<t.children.length;r++){let o=t.children[r];this.add(o.clone())}return this}}return n.DEFAULT_UP=new O(0,1,0),n.DEFAULT_MATRIX_AUTO_UPDATE=!0,n.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0,n})(),wr=class extends ki{constructor(){super(),this.isGroup=!0,this.type="Group"}},IN={type:"move"},Ra=class{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new wr,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new wr,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new O,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new O),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new wr,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new O,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new O),this._grip}dispatchEvent(e){return this._targetRay!==null&&this._targetRay.dispatchEvent(e),this._grip!==null&&this._grip.dispatchEvent(e),this._hand!==null&&this._hand.dispatchEvent(e),this}connect(e){if(e&&e.hand){let t=this._hand;if(t)for(let i of e.hand.values())this._getHandJoint(t,i)}return this.dispatchEvent({type:"connected",data:e}),this}disconnect(e){return this.dispatchEvent({type:"disconnected",data:e}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(e,t,i){let r=null,o=null,s=null,a=this._targetRay,c=this._grip,l=this._hand;if(e&&t.session.visibilityState!=="visible-blurred"){if(l&&e.hand){s=!0;for(let _ of e.hand.values()){let m=t.getJointPose(_,i),p=this._getHandJoint(l,_);m!==null&&(p.matrix.fromArray(m.transform.matrix),p.matrix.decompose(p.position,p.rotation,p.scale),p.matrixWorldNeedsUpdate=!0,p.jointRadius=m.radius),p.visible=m!==null}let u=l.joints["index-finger-tip"],d=l.joints["thumb-tip"],f=u.position.distanceTo(d.position),h=.02,g=.005;l.inputState.pinching&&f>h+g?(l.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:e.handedness,target:this})):!l.inputState.pinching&&f<=h-g&&(l.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:e.handedness,target:this}))}else c!==null&&e.gripSpace&&(o=t.getPose(e.gripSpace,i),o!==null&&(c.matrix.fromArray(o.transform.matrix),c.matrix.decompose(c.position,c.rotation,c.scale),c.matrixWorldNeedsUpdate=!0,o.linearVelocity?(c.hasLinearVelocity=!0,c.linearVelocity.copy(o.linearVelocity)):c.hasLinearVelocity=!1,o.angularVelocity?(c.hasAngularVelocity=!0,c.angularVelocity.copy(o.angularVelocity)):c.hasAngularVelocity=!1));a!==null&&(r=t.getPose(e.targetRaySpace,i),r===null&&o!==null&&(r=o),r!==null&&(a.matrix.fromArray(r.transform.matrix),a.matrix.decompose(a.position,a.rotation,a.scale),a.matrixWorldNeedsUpdate=!0,r.linearVelocity?(a.hasLinearVelocity=!0,a.linearVelocity.copy(r.linearVelocity)):a.hasLinearVelocity=!1,r.angularVelocity?(a.hasAngularVelocity=!0,a.angularVelocity.copy(r.angularVelocity)):a.hasAngularVelocity=!1,this.dispatchEvent(IN)))}return a!==null&&(a.visible=r!==null),c!==null&&(c.visible=o!==null),l!==null&&(l.visible=s!==null),this}_getHandJoint(e,t){if(e.joints[t.jointName]===void 0){let i=new wr;i.matrixAutoUpdate=!1,i.visible=!1,e.joints[t.jointName]=i,e.add(i)}return e.joints[t.jointName]}},JE={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},io={h:0,s:0,l:0},Ef={h:0,s:0,l:0};function py(n,e,t){return t<0&&(t+=1),t>1&&(t-=1),t<1/6?n+(e-n)*6*t:t<1/2?e:t<2/3?n+(e-n)*6*(2/3-t):n}var st=class{constructor(e,t,i){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(e,t,i)}set(e,t,i){if(t===void 0&&i===void 0){let r=e;r&&r.isColor?this.copy(r):typeof r=="number"?this.setHex(r):typeof r=="string"&&this.setStyle(r)}else this.setRGB(e,t,i);return this}setScalar(e){return this.r=e,this.g=e,this.b=e,this}setHex(e,t=ni){return e=Math.floor(e),this.r=(e>>16&255)/255,this.g=(e>>8&255)/255,this.b=(e&255)/255,at.colorSpaceToWorking(this,t),this}setRGB(e,t,i,r=at.workingColorSpace){return this.r=e,this.g=t,this.b=i,at.colorSpaceToWorking(this,r),this}setHSL(e,t,i,r=at.workingColorSpace){if(e=_N(e,1),t=rt(t,0,1),i=rt(i,0,1),t===0)this.r=this.g=this.b=i;else{let o=i<=.5?i*(1+t):i+t-i*t,s=2*i-o;this.r=py(s,o,e+1/3),this.g=py(s,o,e),this.b=py(s,o,e-1/3)}return at.colorSpaceToWorking(this,r),this}setStyle(e,t=ni){function i(o){o!==void 0&&parseFloat(o)<1&&ke("Color: Alpha component of "+e+" will be ignored.")}let r;if(r=/^(\w+)\(([^\)]*)\)/.exec(e)){let o,s=r[1],a=r[2];switch(s){case"rgb":case"rgba":if(o=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return i(o[4]),this.setRGB(Math.min(255,parseInt(o[1],10))/255,Math.min(255,parseInt(o[2],10))/255,Math.min(255,parseInt(o[3],10))/255,t);if(o=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return i(o[4]),this.setRGB(Math.min(100,parseInt(o[1],10))/100,Math.min(100,parseInt(o[2],10))/100,Math.min(100,parseInt(o[3],10))/100,t);break;case"hsl":case"hsla":if(o=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return i(o[4]),this.setHSL(parseFloat(o[1])/360,parseFloat(o[2])/100,parseFloat(o[3])/100,t);break;default:ke("Color: Unknown color model "+e)}}else if(r=/^\#([A-Fa-f\d]+)$/.exec(e)){let o=r[1],s=o.length;if(s===3)return this.setRGB(parseInt(o.charAt(0),16)/15,parseInt(o.charAt(1),16)/15,parseInt(o.charAt(2),16)/15,t);if(s===6)return this.setHex(parseInt(o,16),t);ke("Color: Invalid hex color "+e)}else if(e&&e.length>0)return this.setColorName(e,t);return this}setColorName(e,t=ni){let i=JE[e.toLowerCase()];return i!==void 0?this.setHex(i,t):ke("Color: Unknown color "+e),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(e){return this.r=e.r,this.g=e.g,this.b=e.b,this}copySRGBToLinear(e){return this.r=Cr(e.r),this.g=Cr(e.g),this.b=Cr(e.b),this}copyLinearToSRGB(e){return this.r=Ca(e.r),this.g=Ca(e.g),this.b=Ca(e.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(e=ni){return at.workingToColorSpace(Sn.copy(this),e),Math.round(rt(Sn.r*255,0,255))*65536+Math.round(rt(Sn.g*255,0,255))*256+Math.round(rt(Sn.b*255,0,255))}getHexString(e=ni){return("000000"+this.getHex(e).toString(16)).slice(-6)}getHSL(e,t=at.workingColorSpace){at.workingToColorSpace(Sn.copy(this),t);let i=Sn.r,r=Sn.g,o=Sn.b,s=Math.max(i,r,o),a=Math.min(i,r,o),c,l,u=(a+s)/2;if(a===s)c=0,l=0;else{let d=s-a;switch(l=u<=.5?d/(s+a):d/(2-s-a),s){case i:c=(r-o)/d+(r<o?6:0);break;case r:c=(o-i)/d+2;break;case o:c=(i-r)/d+4;break}c/=6}return e.h=c,e.s=l,e.l=u,e}getRGB(e,t=at.workingColorSpace){return at.workingToColorSpace(Sn.copy(this),t),e.r=Sn.r,e.g=Sn.g,e.b=Sn.b,e}getStyle(e=ni){at.workingToColorSpace(Sn.copy(this),e);let t=Sn.r,i=Sn.g,r=Sn.b;return e!==ni?`color(${e} ${t.toFixed(3)} ${i.toFixed(3)} ${r.toFixed(3)})`:`rgb(${Math.round(t*255)},${Math.round(i*255)},${Math.round(r*255)})`}offsetHSL(e,t,i){return this.getHSL(io),this.setHSL(io.h+e,io.s+t,io.l+i)}add(e){return this.r+=e.r,this.g+=e.g,this.b+=e.b,this}addColors(e,t){return this.r=e.r+t.r,this.g=e.g+t.g,this.b=e.b+t.b,this}addScalar(e){return this.r+=e,this.g+=e,this.b+=e,this}sub(e){return this.r=Math.max(0,this.r-e.r),this.g=Math.max(0,this.g-e.g),this.b=Math.max(0,this.b-e.b),this}multiply(e){return this.r*=e.r,this.g*=e.g,this.b*=e.b,this}multiplyScalar(e){return this.r*=e,this.g*=e,this.b*=e,this}lerp(e,t){return this.r+=(e.r-this.r)*t,this.g+=(e.g-this.g)*t,this.b+=(e.b-this.b)*t,this}lerpColors(e,t,i){return this.r=e.r+(t.r-e.r)*i,this.g=e.g+(t.g-e.g)*i,this.b=e.b+(t.b-e.b)*i,this}lerpHSL(e,t){this.getHSL(io),e.getHSL(Ef);let i=cy(io.h,Ef.h,t),r=cy(io.s,Ef.s,t),o=cy(io.l,Ef.l,t);return this.setHSL(i,r,o),this}setFromVector3(e){return this.r=e.x,this.g=e.y,this.b=e.z,this}applyMatrix3(e){let t=this.r,i=this.g,r=this.b,o=e.elements;return this.r=o[0]*t+o[3]*i+o[6]*r,this.g=o[1]*t+o[4]*i+o[7]*r,this.b=o[2]*t+o[5]*i+o[8]*r,this}equals(e){return e.r===this.r&&e.g===this.g&&e.b===this.b}fromArray(e,t=0){return this.r=e[t],this.g=e[t+1],this.b=e[t+2],this}toArray(e=[],t=0){return e[t]=this.r,e[t+1]=this.g,e[t+2]=this.b,e}fromBufferAttribute(e,t){return this.r=e.getX(t),this.g=e.getY(t),this.b=e.getZ(t),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}},Sn=new st;st.NAMES=JE;var vl=class extends ki{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new uo,this.environmentIntensity=1,this.environmentRotation=new uo,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(e,t){return super.copy(e,t),e.background!==null&&(this.background=e.background.clone()),e.environment!==null&&(this.environment=e.environment.clone()),e.fog!==null&&(this.fog=e.fog.clone()),this.backgroundBlurriness=e.backgroundBlurriness,this.backgroundIntensity=e.backgroundIntensity,this.backgroundRotation.copy(e.backgroundRotation),this.environmentIntensity=e.environmentIntensity,this.environmentRotation.copy(e.environmentRotation),e.overrideMaterial!==null&&(this.overrideMaterial=e.overrideMaterial.clone()),this.matrixAutoUpdate=e.matrixAutoUpdate,this}toJSON(e){let t=super.toJSON(e);return this.fog!==null&&(t.object.fog=this.fog.toJSON()),this.backgroundBlurriness>0&&(t.object.backgroundBlurriness=this.backgroundBlurriness),this.backgroundIntensity!==1&&(t.object.backgroundIntensity=this.backgroundIntensity),t.object.backgroundRotation=this.backgroundRotation.toArray(),this.environmentIntensity!==1&&(t.object.environmentIntensity=this.environmentIntensity),t.object.environmentRotation=this.environmentRotation.toArray(),t}},Oi=new O,br=new O,my=new O,Mr=new O,ya=new O,_a=new O,tE=new O,gy=new O,vy=new O,yy=new O,_y=new Ht,xy=new Ht,by=new Ht,co=class n{constructor(e=new O,t=new O,i=new O){this.a=e,this.b=t,this.c=i}static getNormal(e,t,i,r){r.subVectors(i,t),Oi.subVectors(e,t),r.cross(Oi);let o=r.lengthSq();return o>0?r.multiplyScalar(1/Math.sqrt(o)):r.set(0,0,0)}static getBarycoord(e,t,i,r,o){Oi.subVectors(r,t),br.subVectors(i,t),my.subVectors(e,t);let s=Oi.dot(Oi),a=Oi.dot(br),c=Oi.dot(my),l=br.dot(br),u=br.dot(my),d=s*l-a*a;if(d===0)return o.set(0,0,0),null;let f=1/d,h=(l*c-a*u)*f,g=(s*u-a*c)*f;return o.set(1-h-g,g,h)}static containsPoint(e,t,i,r){return this.getBarycoord(e,t,i,r,Mr)===null?!1:Mr.x>=0&&Mr.y>=0&&Mr.x+Mr.y<=1}static getInterpolation(e,t,i,r,o,s,a,c){return this.getBarycoord(e,t,i,r,Mr)===null?(c.x=0,c.y=0,"z"in c&&(c.z=0),"w"in c&&(c.w=0),null):(c.setScalar(0),c.addScaledVector(o,Mr.x),c.addScaledVector(s,Mr.y),c.addScaledVector(a,Mr.z),c)}static getInterpolatedAttribute(e,t,i,r,o,s){return _y.setScalar(0),xy.setScalar(0),by.setScalar(0),_y.fromBufferAttribute(e,t),xy.fromBufferAttribute(e,i),by.fromBufferAttribute(e,r),s.setScalar(0),s.addScaledVector(_y,o.x),s.addScaledVector(xy,o.y),s.addScaledVector(by,o.z),s}static isFrontFacing(e,t,i,r){return Oi.subVectors(i,t),br.subVectors(e,t),Oi.cross(br).dot(r)<0}set(e,t,i){return this.a.copy(e),this.b.copy(t),this.c.copy(i),this}setFromPointsAndIndices(e,t,i,r){return this.a.copy(e[t]),this.b.copy(e[i]),this.c.copy(e[r]),this}setFromAttributeAndIndices(e,t,i,r){return this.a.fromBufferAttribute(e,t),this.b.fromBufferAttribute(e,i),this.c.fromBufferAttribute(e,r),this}clone(){return new this.constructor().copy(this)}copy(e){return this.a.copy(e.a),this.b.copy(e.b),this.c.copy(e.c),this}getArea(){return Oi.subVectors(this.c,this.b),br.subVectors(this.a,this.b),Oi.cross(br).length()*.5}getMidpoint(e){return e.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(e){return n.getNormal(this.a,this.b,this.c,e)}getPlane(e){return e.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(e,t){return n.getBarycoord(e,this.a,this.b,this.c,t)}getInterpolation(e,t,i,r,o){return n.getInterpolation(e,this.a,this.b,this.c,t,i,r,o)}containsPoint(e){return n.containsPoint(e,this.a,this.b,this.c)}isFrontFacing(e){return n.isFrontFacing(this.a,this.b,this.c,e)}intersectsBox(e){return e.intersectsTriangle(this)}closestPointToPoint(e,t){let i=this.a,r=this.b,o=this.c,s,a;ya.subVectors(r,i),_a.subVectors(o,i),gy.subVectors(e,i);let c=ya.dot(gy),l=_a.dot(gy);if(c<=0&&l<=0)return t.copy(i);vy.subVectors(e,r);let u=ya.dot(vy),d=_a.dot(vy);if(u>=0&&d<=u)return t.copy(r);let f=c*d-u*l;if(f<=0&&c>=0&&u<=0)return s=c/(c-u),t.copy(i).addScaledVector(ya,s);yy.subVectors(e,o);let h=ya.dot(yy),g=_a.dot(yy);if(g>=0&&h<=g)return t.copy(o);let _=h*l-c*g;if(_<=0&&l>=0&&g<=0)return a=l/(l-g),t.copy(i).addScaledVector(_a,a);let m=u*g-h*d;if(m<=0&&d-u>=0&&h-g>=0)return tE.subVectors(o,r),a=(d-u)/(d-u+(h-g)),t.copy(r).addScaledVector(tE,a);let p=1/(m+_+f);return s=_*p,a=f*p,t.copy(i).addScaledVector(ya,s).addScaledVector(_a,a)}equals(e){return e.a.equals(this.a)&&e.b.equals(this.b)&&e.c.equals(this.c)}},fo=class{constructor(e=new O(1/0,1/0,1/0),t=new O(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=e,this.max=t}set(e,t){return this.min.copy(e),this.max.copy(t),this}setFromArray(e){this.makeEmpty();for(let t=0,i=e.length;t<i;t+=3)this.expandByPoint(Li.fromArray(e,t));return this}setFromBufferAttribute(e){this.makeEmpty();for(let t=0,i=e.count;t<i;t++)this.expandByPoint(Li.fromBufferAttribute(e,t));return this}setFromPoints(e){this.makeEmpty();for(let t=0,i=e.length;t<i;t++)this.expandByPoint(e[t]);return this}setFromCenterAndSize(e,t){let i=Li.copy(t).multiplyScalar(.5);return this.min.copy(e).sub(i),this.max.copy(e).add(i),this}setFromObject(e,t=!1){return this.makeEmpty(),this.expandByObject(e,t)}clone(){return new this.constructor().copy(this)}copy(e){return this.min.copy(e.min),this.max.copy(e.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(e){return this.isEmpty()?e.set(0,0,0):e.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(e){return this.isEmpty()?e.set(0,0,0):e.subVectors(this.max,this.min)}expandByPoint(e){return this.min.min(e),this.max.max(e),this}expandByVector(e){return this.min.sub(e),this.max.add(e),this}expandByScalar(e){return this.min.addScalar(-e),this.max.addScalar(e),this}expandByObject(e,t=!1){e.updateWorldMatrix(!1,!1);let i=e.geometry;if(i!==void 0){let o=i.getAttribute("position");if(t===!0&&o!==void 0&&e.isInstancedMesh!==!0)for(let s=0,a=o.count;s<a;s++)e.isMesh===!0?e.getVertexPosition(s,Li):Li.fromBufferAttribute(o,s),Li.applyMatrix4(e.matrixWorld),this.expandByPoint(Li);else e.boundingBox!==void 0?(e.boundingBox===null&&e.computeBoundingBox(),wf.copy(e.boundingBox)):(i.boundingBox===null&&i.computeBoundingBox(),wf.copy(i.boundingBox)),wf.applyMatrix4(e.matrixWorld),this.union(wf)}let r=e.children;for(let o=0,s=r.length;o<s;o++)this.expandByObject(r[o],t);return this}containsPoint(e){return e.x>=this.min.x&&e.x<=this.max.x&&e.y>=this.min.y&&e.y<=this.max.y&&e.z>=this.min.z&&e.z<=this.max.z}containsBox(e){return this.min.x<=e.min.x&&e.max.x<=this.max.x&&this.min.y<=e.min.y&&e.max.y<=this.max.y&&this.min.z<=e.min.z&&e.max.z<=this.max.z}getParameter(e,t){return t.set((e.x-this.min.x)/(this.max.x-this.min.x),(e.y-this.min.y)/(this.max.y-this.min.y),(e.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(e){return e.max.x>=this.min.x&&e.min.x<=this.max.x&&e.max.y>=this.min.y&&e.min.y<=this.max.y&&e.max.z>=this.min.z&&e.min.z<=this.max.z}intersectsSphere(e){return this.clampPoint(e.center,Li),Li.distanceToSquared(e.center)<=e.radius*e.radius}intersectsPlane(e){let t,i;return e.normal.x>0?(t=e.normal.x*this.min.x,i=e.normal.x*this.max.x):(t=e.normal.x*this.max.x,i=e.normal.x*this.min.x),e.normal.y>0?(t+=e.normal.y*this.min.y,i+=e.normal.y*this.max.y):(t+=e.normal.y*this.max.y,i+=e.normal.y*this.min.y),e.normal.z>0?(t+=e.normal.z*this.min.z,i+=e.normal.z*this.max.z):(t+=e.normal.z*this.max.z,i+=e.normal.z*this.min.z),t<=-e.constant&&i>=-e.constant}intersectsTriangle(e){if(this.isEmpty())return!1;this.getCenter(cl),Cf.subVectors(this.max,cl),xa.subVectors(e.a,cl),ba.subVectors(e.b,cl),Ma.subVectors(e.c,cl),ro.subVectors(ba,xa),oo.subVectors(Ma,ba),ns.subVectors(xa,Ma);let t=[0,-ro.z,ro.y,0,-oo.z,oo.y,0,-ns.z,ns.y,ro.z,0,-ro.x,oo.z,0,-oo.x,ns.z,0,-ns.x,-ro.y,ro.x,0,-oo.y,oo.x,0,-ns.y,ns.x,0];return!My(t,xa,ba,Ma,Cf)||(t=[1,0,0,0,1,0,0,0,1],!My(t,xa,ba,Ma,Cf))?!1:(Tf.crossVectors(ro,oo),t=[Tf.x,Tf.y,Tf.z],My(t,xa,ba,Ma,Cf))}clampPoint(e,t){return t.copy(e).clamp(this.min,this.max)}distanceToPoint(e){return this.clampPoint(e,Li).distanceTo(e)}getBoundingSphere(e){return this.isEmpty()?e.makeEmpty():(this.getCenter(e.center),e.radius=this.getSize(Li).length()*.5),e}intersect(e){return this.min.max(e.min),this.max.min(e.max),this.isEmpty()&&this.makeEmpty(),this}union(e){return this.min.min(e.min),this.max.max(e.max),this}applyMatrix4(e){return this.isEmpty()?this:(Sr[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(e),Sr[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(e),Sr[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(e),Sr[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(e),Sr[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(e),Sr[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(e),Sr[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(e),Sr[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(e),this.setFromPoints(Sr),this)}translate(e){return this.min.add(e),this.max.add(e),this}equals(e){return e.min.equals(this.min)&&e.max.equals(this.max)}toJSON(){return{min:this.min.toArray(),max:this.max.toArray()}}fromJSON(e){return this.min.fromArray(e.min),this.max.fromArray(e.max),this}},Sr=[new O,new O,new O,new O,new O,new O,new O,new O],Li=new O,wf=new fo,xa=new O,ba=new O,Ma=new O,ro=new O,oo=new O,ns=new O,cl=new O,Cf=new O,Tf=new O,is=new O;function My(n,e,t,i,r){for(let o=0,s=n.length-3;o<=s;o+=3){is.fromArray(n,o);let a=r.x*Math.abs(is.x)+r.y*Math.abs(is.y)+r.z*Math.abs(is.z),c=e.dot(is),l=t.dot(is),u=i.dot(is);if(Math.max(-Math.max(c,l,u),Math.min(c,l,u))>a)return!1}return!0}var Zt=new O,Df=new ot,AN=0,kn=class{constructor(e,t,i=!1){if(Array.isArray(e))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,Object.defineProperty(this,"id",{value:AN++}),this.name="",this.array=e,this.itemSize=t,this.count=e!==void 0?e.length/t:0,this.normalized=i,this.usage=Uy,this.updateRanges=[],this.gpuType=Vi,this.version=0}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.name=e.name,this.array=new e.array.constructor(e.array),this.itemSize=e.itemSize,this.count=e.count,this.normalized=e.normalized,this.usage=e.usage,this.gpuType=e.gpuType,this}copyAt(e,t,i){e*=this.itemSize,i*=t.itemSize;for(let r=0,o=this.itemSize;r<o;r++)this.array[e+r]=t.array[i+r];return this}copyArray(e){return this.array.set(e),this}applyMatrix3(e){if(this.itemSize===2)for(let t=0,i=this.count;t<i;t++)Df.fromBufferAttribute(this,t),Df.applyMatrix3(e),this.setXY(t,Df.x,Df.y);else if(this.itemSize===3)for(let t=0,i=this.count;t<i;t++)Zt.fromBufferAttribute(this,t),Zt.applyMatrix3(e),this.setXYZ(t,Zt.x,Zt.y,Zt.z);return this}applyMatrix4(e){for(let t=0,i=this.count;t<i;t++)Zt.fromBufferAttribute(this,t),Zt.applyMatrix4(e),this.setXYZ(t,Zt.x,Zt.y,Zt.z);return this}applyNormalMatrix(e){for(let t=0,i=this.count;t<i;t++)Zt.fromBufferAttribute(this,t),Zt.applyNormalMatrix(e),this.setXYZ(t,Zt.x,Zt.y,Zt.z);return this}transformDirection(e){for(let t=0,i=this.count;t<i;t++)Zt.fromBufferAttribute(this,t),Zt.transformDirection(e),this.setXYZ(t,Zt.x,Zt.y,Zt.z);return this}set(e,t=0){return this.array.set(e,t),this}getComponent(e,t){let i=this.array[e*this.itemSize+t];return this.normalized&&(i=sl(i,this.array)),i}setComponent(e,t,i){return this.normalized&&(i=$n(i,this.array)),this.array[e*this.itemSize+t]=i,this}getX(e){let t=this.array[e*this.itemSize];return this.normalized&&(t=sl(t,this.array)),t}setX(e,t){return this.normalized&&(t=$n(t,this.array)),this.array[e*this.itemSize]=t,this}getY(e){let t=this.array[e*this.itemSize+1];return this.normalized&&(t=sl(t,this.array)),t}setY(e,t){return this.normalized&&(t=$n(t,this.array)),this.array[e*this.itemSize+1]=t,this}getZ(e){let t=this.array[e*this.itemSize+2];return this.normalized&&(t=sl(t,this.array)),t}setZ(e,t){return this.normalized&&(t=$n(t,this.array)),this.array[e*this.itemSize+2]=t,this}getW(e){let t=this.array[e*this.itemSize+3];return this.normalized&&(t=sl(t,this.array)),t}setW(e,t){return this.normalized&&(t=$n(t,this.array)),this.array[e*this.itemSize+3]=t,this}setXY(e,t,i){return e*=this.itemSize,this.normalized&&(t=$n(t,this.array),i=$n(i,this.array)),this.array[e+0]=t,this.array[e+1]=i,this}setXYZ(e,t,i,r){return e*=this.itemSize,this.normalized&&(t=$n(t,this.array),i=$n(i,this.array),r=$n(r,this.array)),this.array[e+0]=t,this.array[e+1]=i,this.array[e+2]=r,this}setXYZW(e,t,i,r,o){return e*=this.itemSize,this.normalized&&(t=$n(t,this.array),i=$n(i,this.array),r=$n(r,this.array),o=$n(o,this.array)),this.array[e+0]=t,this.array[e+1]=i,this.array[e+2]=r,this.array[e+3]=o,this}onUpload(e){return this.onUploadCallback=e,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){let e={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return this.name!==""&&(e.name=this.name),this.usage!==Uy&&(e.usage=this.usage),e}};var yl=class extends kn{constructor(e,t,i){super(new Uint16Array(e),t,i)}};var _l=class extends kn{constructor(e,t,i){super(new Uint32Array(e),t,i)}};var Vt=class extends kn{constructor(e,t,i){super(new Float32Array(e),t,i)}},RN=new fo,ll=new O,Sy=new O,us=class{constructor(e=new O,t=-1){this.isSphere=!0,this.center=e,this.radius=t}set(e,t){return this.center.copy(e),this.radius=t,this}setFromPoints(e,t){let i=this.center;t!==void 0?i.copy(t):RN.setFromPoints(e).getCenter(i);let r=0;for(let o=0,s=e.length;o<s;o++)r=Math.max(r,i.distanceToSquared(e[o]));return this.radius=Math.sqrt(r),this}copy(e){return this.center.copy(e.center),this.radius=e.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(e){return e.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(e){return e.distanceTo(this.center)-this.radius}intersectsSphere(e){let t=this.radius+e.radius;return e.center.distanceToSquared(this.center)<=t*t}intersectsBox(e){return e.intersectsSphere(this)}intersectsPlane(e){return Math.abs(e.distanceToPoint(this.center))<=this.radius}clampPoint(e,t){let i=this.center.distanceToSquared(e);return t.copy(e),i>this.radius*this.radius&&(t.sub(this.center).normalize(),t.multiplyScalar(this.radius).add(this.center)),t}getBoundingBox(e){return this.isEmpty()?(e.makeEmpty(),e):(e.set(this.center,this.center),e.expandByScalar(this.radius),e)}applyMatrix4(e){return this.center.applyMatrix4(e),this.radius=this.radius*e.getMaxScaleOnAxis(),this}translate(e){return this.center.add(e),this}expandByPoint(e){if(this.isEmpty())return this.center.copy(e),this.radius=0,this;ll.subVectors(e,this.center);let t=ll.lengthSq();if(t>this.radius*this.radius){let i=Math.sqrt(t),r=(i-this.radius)*.5;this.center.addScaledVector(ll,r/i),this.radius+=r}return this}union(e){return e.isEmpty()?this:this.isEmpty()?(this.copy(e),this):(this.center.equals(e.center)===!0?this.radius=Math.max(this.radius,e.radius):(Sy.subVectors(e.center,this.center).setLength(e.radius),this.expandByPoint(ll.copy(e.center).add(Sy)),this.expandByPoint(ll.copy(e.center).sub(Sy))),this)}equals(e){return e.center.equals(this.center)&&e.radius===this.radius}clone(){return new this.constructor().copy(this)}toJSON(){return{radius:this.radius,center:this.center.toArray()}}fromJSON(e){return this.radius=e.radius,this.center.fromArray(e.center),this}},NN=0,yi=new Ot,Ey=new ki,Sa=new O,ti=new fo,ul=new fo,cn=new O,wn=class n extends Dr{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:NN++}),this.uuid=Ul(),this.name="",this.type="BufferGeometry",this.index=null,this.indirect=null,this.indirectOffset=0,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={}}getIndex(){return this.index}setIndex(e){return Array.isArray(e)?this.index=new(vN(e)?_l:yl)(e,1):this.index=e,this}setIndirect(e,t=0){return this.indirect=e,this.indirectOffset=t,this}getIndirect(){return this.indirect}getAttribute(e){return this.attributes[e]}setAttribute(e,t){return this.attributes[e]=t,this}deleteAttribute(e){return delete this.attributes[e],this}hasAttribute(e){return this.attributes[e]!==void 0}addGroup(e,t,i=0){this.groups.push({start:e,count:t,materialIndex:i})}clearGroups(){this.groups=[]}setDrawRange(e,t){this.drawRange.start=e,this.drawRange.count=t}applyMatrix4(e){let t=this.attributes.position;t!==void 0&&(t.applyMatrix4(e),t.needsUpdate=!0);let i=this.attributes.normal;if(i!==void 0){let o=new qe().getNormalMatrix(e);i.applyNormalMatrix(o),i.needsUpdate=!0}let r=this.attributes.tangent;return r!==void 0&&(r.transformDirection(e),r.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this}applyQuaternion(e){return yi.makeRotationFromQuaternion(e),this.applyMatrix4(yi),this}rotateX(e){return yi.makeRotationX(e),this.applyMatrix4(yi),this}rotateY(e){return yi.makeRotationY(e),this.applyMatrix4(yi),this}rotateZ(e){return yi.makeRotationZ(e),this.applyMatrix4(yi),this}translate(e,t,i){return yi.makeTranslation(e,t,i),this.applyMatrix4(yi),this}scale(e,t,i){return yi.makeScale(e,t,i),this.applyMatrix4(yi),this}lookAt(e){return Ey.lookAt(e),Ey.updateMatrix(),this.applyMatrix4(Ey.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(Sa).negate(),this.translate(Sa.x,Sa.y,Sa.z),this}setFromPoints(e){let t=this.getAttribute("position");if(t===void 0){let i=[];for(let r=0,o=e.length;r<o;r++){let s=e[r];i.push(s.x,s.y,s.z||0)}this.setAttribute("position",new Vt(i,3))}else{let i=Math.min(e.length,t.count);for(let r=0;r<i;r++){let o=e[r];t.setXYZ(r,o.x,o.y,o.z||0)}e.length>t.count&&ke("BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry."),t.needsUpdate=!0}return this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new fo);let e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){Fe("BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),this.boundingBox.set(new O(-1/0,-1/0,-1/0),new O(1/0,1/0,1/0));return}if(e!==void 0){if(this.boundingBox.setFromBufferAttribute(e),t)for(let i=0,r=t.length;i<r;i++){let o=t[i];ti.setFromBufferAttribute(o),this.morphTargetsRelative?(cn.addVectors(this.boundingBox.min,ti.min),this.boundingBox.expandByPoint(cn),cn.addVectors(this.boundingBox.max,ti.max),this.boundingBox.expandByPoint(cn)):(this.boundingBox.expandByPoint(ti.min),this.boundingBox.expandByPoint(ti.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&Fe('BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new us);let e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){Fe("BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),this.boundingSphere.set(new O,1/0);return}if(e){let i=this.boundingSphere.center;if(ti.setFromBufferAttribute(e),t)for(let o=0,s=t.length;o<s;o++){let a=t[o];ul.setFromBufferAttribute(a),this.morphTargetsRelative?(cn.addVectors(ti.min,ul.min),ti.expandByPoint(cn),cn.addVectors(ti.max,ul.max),ti.expandByPoint(cn)):(ti.expandByPoint(ul.min),ti.expandByPoint(ul.max))}ti.getCenter(i);let r=0;for(let o=0,s=e.count;o<s;o++)cn.fromBufferAttribute(e,o),r=Math.max(r,i.distanceToSquared(cn));if(t)for(let o=0,s=t.length;o<s;o++){let a=t[o],c=this.morphTargetsRelative;for(let l=0,u=a.count;l<u;l++)cn.fromBufferAttribute(a,l),c&&(Sa.fromBufferAttribute(e,l),cn.add(Sa)),r=Math.max(r,i.distanceToSquared(cn))}this.boundingSphere.radius=Math.sqrt(r),isNaN(this.boundingSphere.radius)&&Fe('BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){let e=this.index,t=this.attributes;if(e===null||t.position===void 0||t.normal===void 0||t.uv===void 0){Fe("BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}let i=t.position,r=t.normal,o=t.uv;this.hasAttribute("tangent")===!1&&this.setAttribute("tangent",new kn(new Float32Array(4*i.count),4));let s=this.getAttribute("tangent"),a=[],c=[];for(let y=0;y<i.count;y++)a[y]=new O,c[y]=new O;let l=new O,u=new O,d=new O,f=new ot,h=new ot,g=new ot,_=new O,m=new O;function p(y,M,j){l.fromBufferAttribute(i,y),u.fromBufferAttribute(i,M),d.fromBufferAttribute(i,j),f.fromBufferAttribute(o,y),h.fromBufferAttribute(o,M),g.fromBufferAttribute(o,j),u.sub(l),d.sub(l),h.sub(f),g.sub(f);let T=1/(h.x*g.y-g.x*h.y);isFinite(T)&&(_.copy(u).multiplyScalar(g.y).addScaledVector(d,-h.y).multiplyScalar(T),m.copy(d).multiplyScalar(h.x).addScaledVector(u,-g.x).multiplyScalar(T),a[y].add(_),a[M].add(_),a[j].add(_),c[y].add(m),c[M].add(m),c[j].add(m))}let b=this.groups;b.length===0&&(b=[{start:0,count:e.count}]);for(let y=0,M=b.length;y<M;++y){let j=b[y],T=j.start,L=j.count;for(let k=T,G=T+L;k<G;k+=3)p(e.getX(k+0),e.getX(k+1),e.getX(k+2))}let w=new O,S=new O,D=new O,C=new O;function A(y){D.fromBufferAttribute(r,y),C.copy(D);let M=a[y];w.copy(M),w.sub(D.multiplyScalar(D.dot(M))).normalize(),S.crossVectors(C,M);let T=S.dot(c[y])<0?-1:1;s.setXYZW(y,w.x,w.y,w.z,T)}for(let y=0,M=b.length;y<M;++y){let j=b[y],T=j.start,L=j.count;for(let k=T,G=T+L;k<G;k+=3)A(e.getX(k+0)),A(e.getX(k+1)),A(e.getX(k+2))}}computeVertexNormals(){let e=this.index,t=this.getAttribute("position");if(t!==void 0){let i=this.getAttribute("normal");if(i===void 0)i=new kn(new Float32Array(t.count*3),3),this.setAttribute("normal",i);else for(let f=0,h=i.count;f<h;f++)i.setXYZ(f,0,0,0);let r=new O,o=new O,s=new O,a=new O,c=new O,l=new O,u=new O,d=new O;if(e)for(let f=0,h=e.count;f<h;f+=3){let g=e.getX(f+0),_=e.getX(f+1),m=e.getX(f+2);r.fromBufferAttribute(t,g),o.fromBufferAttribute(t,_),s.fromBufferAttribute(t,m),u.subVectors(s,o),d.subVectors(r,o),u.cross(d),a.fromBufferAttribute(i,g),c.fromBufferAttribute(i,_),l.fromBufferAttribute(i,m),a.add(u),c.add(u),l.add(u),i.setXYZ(g,a.x,a.y,a.z),i.setXYZ(_,c.x,c.y,c.z),i.setXYZ(m,l.x,l.y,l.z)}else for(let f=0,h=t.count;f<h;f+=3)r.fromBufferAttribute(t,f+0),o.fromBufferAttribute(t,f+1),s.fromBufferAttribute(t,f+2),u.subVectors(s,o),d.subVectors(r,o),u.cross(d),i.setXYZ(f+0,u.x,u.y,u.z),i.setXYZ(f+1,u.x,u.y,u.z),i.setXYZ(f+2,u.x,u.y,u.z);this.normalizeNormals(),i.needsUpdate=!0}}normalizeNormals(){let e=this.attributes.normal;for(let t=0,i=e.count;t<i;t++)cn.fromBufferAttribute(e,t),cn.normalize(),e.setXYZ(t,cn.x,cn.y,cn.z)}toNonIndexed(){function e(a,c){let l=a.array,u=a.itemSize,d=a.normalized,f=new l.constructor(c.length*u),h=0,g=0;for(let _=0,m=c.length;_<m;_++){a.isInterleavedBufferAttribute?h=c[_]*a.data.stride+a.offset:h=c[_]*u;for(let p=0;p<u;p++)f[g++]=l[h++]}return new kn(f,u,d)}if(this.index===null)return ke("BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;let t=new n,i=this.index.array,r=this.attributes;for(let a in r){let c=r[a],l=e(c,i);t.setAttribute(a,l)}let o=this.morphAttributes;for(let a in o){let c=[],l=o[a];for(let u=0,d=l.length;u<d;u++){let f=l[u],h=e(f,i);c.push(h)}t.morphAttributes[a]=c}t.morphTargetsRelative=this.morphTargetsRelative;let s=this.groups;for(let a=0,c=s.length;a<c;a++){let l=s[a];t.addGroup(l.start,l.count,l.materialIndex)}return t}toJSON(){let e={metadata:{version:4.7,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(e.uuid=this.uuid,e.type=this.type,this.name!==""&&(e.name=this.name),Object.keys(this.userData).length>0&&(e.userData=this.userData),this.parameters!==void 0){let c=this.parameters;for(let l in c)c[l]!==void 0&&(e[l]=c[l]);return e}e.data={attributes:{}};let t=this.index;t!==null&&(e.data.index={type:t.array.constructor.name,array:Array.prototype.slice.call(t.array)});let i=this.attributes;for(let c in i){let l=i[c];e.data.attributes[c]=l.toJSON(e.data)}let r={},o=!1;for(let c in this.morphAttributes){let l=this.morphAttributes[c],u=[];for(let d=0,f=l.length;d<f;d++){let h=l[d];u.push(h.toJSON(e.data))}u.length>0&&(r[c]=u,o=!0)}o&&(e.data.morphAttributes=r,e.data.morphTargetsRelative=this.morphTargetsRelative);let s=this.groups;s.length>0&&(e.data.groups=JSON.parse(JSON.stringify(s)));let a=this.boundingSphere;return a!==null&&(e.data.boundingSphere=a.toJSON()),e}clone(){return new this.constructor().copy(this)}copy(e){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;let t={};this.name=e.name;let i=e.index;i!==null&&this.setIndex(i.clone());let r=e.attributes;for(let l in r){let u=r[l];this.setAttribute(l,u.clone(t))}let o=e.morphAttributes;for(let l in o){let u=[],d=o[l];for(let f=0,h=d.length;f<h;f++)u.push(d[f].clone(t));this.morphAttributes[l]=u}this.morphTargetsRelative=e.morphTargetsRelative;let s=e.groups;for(let l=0,u=s.length;l<u;l++){let d=s[l];this.addGroup(d.start,d.count,d.materialIndex)}let a=e.boundingBox;a!==null&&(this.boundingBox=a.clone());let c=e.boundingSphere;return c!==null&&(this.boundingSphere=c.clone()),this.drawRange.start=e.drawRange.start,this.drawRange.count=e.drawRange.count,this.userData=e.userData,this}dispose(){this.dispatchEvent({type:"dispose"})}};var PN=0,Ir=class extends Dr{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:PN++}),this.uuid=Ul(),this.name="",this.type="Material",this.blending=as,this.side=Tr,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=Wf,this.blendDst=$f,this.blendEquation=lo,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new st(0,0,0),this.blendAlpha=0,this.depthFunc=cs,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=ky,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=ss,this.stencilZFail=ss,this.stencilZPass=ss,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.allowOverride=!0,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(e){this._alphaTest>0!=e>0&&this.version++,this._alphaTest=e}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(e){if(e!==void 0)for(let t in e){let i=e[t];if(i===void 0){ke(`Material: parameter '${t}' has value of undefined.`);continue}let r=this[t];if(r===void 0){ke(`Material: '${t}' is not a property of THREE.${this.type}.`);continue}r&&r.isColor?r.set(i):r&&r.isVector3&&i&&i.isVector3?r.copy(i):this[t]=i}}toJSON(e){let t=e===void 0||typeof e=="string";t&&(e={textures:{},images:{}});let i={metadata:{version:4.7,type:"Material",generator:"Material.toJSON"}};i.uuid=this.uuid,i.type=this.type,this.name!==""&&(i.name=this.name),this.color&&this.color.isColor&&(i.color=this.color.getHex()),this.roughness!==void 0&&(i.roughness=this.roughness),this.metalness!==void 0&&(i.metalness=this.metalness),this.sheen!==void 0&&(i.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(i.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(i.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(i.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&this.emissiveIntensity!==1&&(i.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(i.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(i.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(i.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(i.shininess=this.shininess),this.clearcoat!==void 0&&(i.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(i.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(i.clearcoatMap=this.clearcoatMap.toJSON(e).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(i.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(e).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(i.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(e).uuid,i.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.sheenColorMap&&this.sheenColorMap.isTexture&&(i.sheenColorMap=this.sheenColorMap.toJSON(e).uuid),this.sheenRoughnessMap&&this.sheenRoughnessMap.isTexture&&(i.sheenRoughnessMap=this.sheenRoughnessMap.toJSON(e).uuid),this.dispersion!==void 0&&(i.dispersion=this.dispersion),this.iridescence!==void 0&&(i.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(i.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(i.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(i.iridescenceMap=this.iridescenceMap.toJSON(e).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(i.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(e).uuid),this.anisotropy!==void 0&&(i.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(i.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(i.anisotropyMap=this.anisotropyMap.toJSON(e).uuid),this.map&&this.map.isTexture&&(i.map=this.map.toJSON(e).uuid),this.matcap&&this.matcap.isTexture&&(i.matcap=this.matcap.toJSON(e).uuid),this.alphaMap&&this.alphaMap.isTexture&&(i.alphaMap=this.alphaMap.toJSON(e).uuid),this.lightMap&&this.lightMap.isTexture&&(i.lightMap=this.lightMap.toJSON(e).uuid,i.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(i.aoMap=this.aoMap.toJSON(e).uuid,i.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(i.bumpMap=this.bumpMap.toJSON(e).uuid,i.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(i.normalMap=this.normalMap.toJSON(e).uuid,i.normalMapType=this.normalMapType,i.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(i.displacementMap=this.displacementMap.toJSON(e).uuid,i.displacementScale=this.displacementScale,i.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(i.roughnessMap=this.roughnessMap.toJSON(e).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(i.metalnessMap=this.metalnessMap.toJSON(e).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(i.emissiveMap=this.emissiveMap.toJSON(e).uuid),this.specularMap&&this.specularMap.isTexture&&(i.specularMap=this.specularMap.toJSON(e).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(i.specularIntensityMap=this.specularIntensityMap.toJSON(e).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(i.specularColorMap=this.specularColorMap.toJSON(e).uuid),this.envMap&&this.envMap.isTexture&&(i.envMap=this.envMap.toJSON(e).uuid,this.combine!==void 0&&(i.combine=this.combine)),this.envMapRotation!==void 0&&(i.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(i.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(i.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(i.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(i.gradientMap=this.gradientMap.toJSON(e).uuid),this.transmission!==void 0&&(i.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(i.transmissionMap=this.transmissionMap.toJSON(e).uuid),this.thickness!==void 0&&(i.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(i.thicknessMap=this.thicknessMap.toJSON(e).uuid),this.attenuationDistance!==void 0&&this.attenuationDistance!==1/0&&(i.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(i.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(i.size=this.size),this.shadowSide!==null&&(i.shadowSide=this.shadowSide),this.sizeAttenuation!==void 0&&(i.sizeAttenuation=this.sizeAttenuation),this.blending!==as&&(i.blending=this.blending),this.side!==Tr&&(i.side=this.side),this.vertexColors===!0&&(i.vertexColors=!0),this.opacity<1&&(i.opacity=this.opacity),this.transparent===!0&&(i.transparent=!0),this.blendSrc!==Wf&&(i.blendSrc=this.blendSrc),this.blendDst!==$f&&(i.blendDst=this.blendDst),this.blendEquation!==lo&&(i.blendEquation=this.blendEquation),this.blendSrcAlpha!==null&&(i.blendSrcAlpha=this.blendSrcAlpha),this.blendDstAlpha!==null&&(i.blendDstAlpha=this.blendDstAlpha),this.blendEquationAlpha!==null&&(i.blendEquationAlpha=this.blendEquationAlpha),this.blendColor&&this.blendColor.isColor&&(i.blendColor=this.blendColor.getHex()),this.blendAlpha!==0&&(i.blendAlpha=this.blendAlpha),this.depthFunc!==cs&&(i.depthFunc=this.depthFunc),this.depthTest===!1&&(i.depthTest=this.depthTest),this.depthWrite===!1&&(i.depthWrite=this.depthWrite),this.colorWrite===!1&&(i.colorWrite=this.colorWrite),this.stencilWriteMask!==255&&(i.stencilWriteMask=this.stencilWriteMask),this.stencilFunc!==ky&&(i.stencilFunc=this.stencilFunc),this.stencilRef!==0&&(i.stencilRef=this.stencilRef),this.stencilFuncMask!==255&&(i.stencilFuncMask=this.stencilFuncMask),this.stencilFail!==ss&&(i.stencilFail=this.stencilFail),this.stencilZFail!==ss&&(i.stencilZFail=this.stencilZFail),this.stencilZPass!==ss&&(i.stencilZPass=this.stencilZPass),this.stencilWrite===!0&&(i.stencilWrite=this.stencilWrite),this.rotation!==void 0&&this.rotation!==0&&(i.rotation=this.rotation),this.polygonOffset===!0&&(i.polygonOffset=!0),this.polygonOffsetFactor!==0&&(i.polygonOffsetFactor=this.polygonOffsetFactor),this.polygonOffsetUnits!==0&&(i.polygonOffsetUnits=this.polygonOffsetUnits),this.linewidth!==void 0&&this.linewidth!==1&&(i.linewidth=this.linewidth),this.dashSize!==void 0&&(i.dashSize=this.dashSize),this.gapSize!==void 0&&(i.gapSize=this.gapSize),this.scale!==void 0&&(i.scale=this.scale),this.dithering===!0&&(i.dithering=!0),this.alphaTest>0&&(i.alphaTest=this.alphaTest),this.alphaHash===!0&&(i.alphaHash=!0),this.alphaToCoverage===!0&&(i.alphaToCoverage=!0),this.premultipliedAlpha===!0&&(i.premultipliedAlpha=!0),this.forceSinglePass===!0&&(i.forceSinglePass=!0),this.allowOverride===!1&&(i.allowOverride=!1),this.wireframe===!0&&(i.wireframe=!0),this.wireframeLinewidth>1&&(i.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!=="round"&&(i.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!=="round"&&(i.wireframeLinejoin=this.wireframeLinejoin),this.flatShading===!0&&(i.flatShading=!0),this.visible===!1&&(i.visible=!1),this.toneMapped===!1&&(i.toneMapped=!1),this.fog===!1&&(i.fog=!1),Object.keys(this.userData).length>0&&(i.userData=this.userData);function r(o){let s=[];for(let a in o){let c=o[a];delete c.metadata,s.push(c)}return s}if(t){let o=r(e.textures),s=r(e.images);o.length>0&&(i.textures=o),s.length>0&&(i.images=s)}return i}clone(){return new this.constructor().copy(this)}copy(e){this.name=e.name,this.blending=e.blending,this.side=e.side,this.vertexColors=e.vertexColors,this.opacity=e.opacity,this.transparent=e.transparent,this.blendSrc=e.blendSrc,this.blendDst=e.blendDst,this.blendEquation=e.blendEquation,this.blendSrcAlpha=e.blendSrcAlpha,this.blendDstAlpha=e.blendDstAlpha,this.blendEquationAlpha=e.blendEquationAlpha,this.blendColor.copy(e.blendColor),this.blendAlpha=e.blendAlpha,this.depthFunc=e.depthFunc,this.depthTest=e.depthTest,this.depthWrite=e.depthWrite,this.stencilWriteMask=e.stencilWriteMask,this.stencilFunc=e.stencilFunc,this.stencilRef=e.stencilRef,this.stencilFuncMask=e.stencilFuncMask,this.stencilFail=e.stencilFail,this.stencilZFail=e.stencilZFail,this.stencilZPass=e.stencilZPass,this.stencilWrite=e.stencilWrite;let t=e.clippingPlanes,i=null;if(t!==null){let r=t.length;i=new Array(r);for(let o=0;o!==r;++o)i[o]=t[o].clone()}return this.clippingPlanes=i,this.clipIntersection=e.clipIntersection,this.clipShadows=e.clipShadows,this.shadowSide=e.shadowSide,this.colorWrite=e.colorWrite,this.precision=e.precision,this.polygonOffset=e.polygonOffset,this.polygonOffsetFactor=e.polygonOffsetFactor,this.polygonOffsetUnits=e.polygonOffsetUnits,this.dithering=e.dithering,this.alphaTest=e.alphaTest,this.alphaHash=e.alphaHash,this.alphaToCoverage=e.alphaToCoverage,this.premultipliedAlpha=e.premultipliedAlpha,this.forceSinglePass=e.forceSinglePass,this.allowOverride=e.allowOverride,this.visible=e.visible,this.toneMapped=e.toneMapped,this.userData=JSON.parse(JSON.stringify(e.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(e){e===!0&&this.version++}};var Er=new O,wy=new O,If=new O,so=new O,Cy=new O,Af=new O,Ty=new O,Na=class{constructor(e=new O,t=new O(0,0,-1)){this.origin=e,this.direction=t}set(e,t){return this.origin.copy(e),this.direction.copy(t),this}copy(e){return this.origin.copy(e.origin),this.direction.copy(e.direction),this}at(e,t){return t.copy(this.origin).addScaledVector(this.direction,e)}lookAt(e){return this.direction.copy(e).sub(this.origin).normalize(),this}recast(e){return this.origin.copy(this.at(e,Er)),this}closestPointToPoint(e,t){t.subVectors(e,this.origin);let i=t.dot(this.direction);return i<0?t.copy(this.origin):t.copy(this.origin).addScaledVector(this.direction,i)}distanceToPoint(e){return Math.sqrt(this.distanceSqToPoint(e))}distanceSqToPoint(e){let t=Er.subVectors(e,this.origin).dot(this.direction);return t<0?this.origin.distanceToSquared(e):(Er.copy(this.origin).addScaledVector(this.direction,t),Er.distanceToSquared(e))}distanceSqToSegment(e,t,i,r){wy.copy(e).add(t).multiplyScalar(.5),If.copy(t).sub(e).normalize(),so.copy(this.origin).sub(wy);let o=e.distanceTo(t)*.5,s=-this.direction.dot(If),a=so.dot(this.direction),c=-so.dot(If),l=so.lengthSq(),u=Math.abs(1-s*s),d,f,h,g;if(u>0)if(d=s*c-a,f=s*a-c,g=o*u,d>=0)if(f>=-g)if(f<=g){let _=1/u;d*=_,f*=_,h=d*(d+s*f+2*a)+f*(s*d+f+2*c)+l}else f=o,d=Math.max(0,-(s*f+a)),h=-d*d+f*(f+2*c)+l;else f=-o,d=Math.max(0,-(s*f+a)),h=-d*d+f*(f+2*c)+l;else f<=-g?(d=Math.max(0,-(-s*o+a)),f=d>0?-o:Math.min(Math.max(-o,-c),o),h=-d*d+f*(f+2*c)+l):f<=g?(d=0,f=Math.min(Math.max(-o,-c),o),h=f*(f+2*c)+l):(d=Math.max(0,-(s*o+a)),f=d>0?o:Math.min(Math.max(-o,-c),o),h=-d*d+f*(f+2*c)+l);else f=s>0?-o:o,d=Math.max(0,-(s*f+a)),h=-d*d+f*(f+2*c)+l;return i&&i.copy(this.origin).addScaledVector(this.direction,d),r&&r.copy(wy).addScaledVector(If,f),h}intersectSphere(e,t){Er.subVectors(e.center,this.origin);let i=Er.dot(this.direction),r=Er.dot(Er)-i*i,o=e.radius*e.radius;if(r>o)return null;let s=Math.sqrt(o-r),a=i-s,c=i+s;return c<0?null:a<0?this.at(c,t):this.at(a,t)}intersectsSphere(e){return e.radius<0?!1:this.distanceSqToPoint(e.center)<=e.radius*e.radius}distanceToPlane(e){let t=e.normal.dot(this.direction);if(t===0)return e.distanceToPoint(this.origin)===0?0:null;let i=-(this.origin.dot(e.normal)+e.constant)/t;return i>=0?i:null}intersectPlane(e,t){let i=this.distanceToPlane(e);return i===null?null:this.at(i,t)}intersectsPlane(e){let t=e.distanceToPoint(this.origin);return t===0||e.normal.dot(this.direction)*t<0}intersectBox(e,t){let i,r,o,s,a,c,l=1/this.direction.x,u=1/this.direction.y,d=1/this.direction.z,f=this.origin;return l>=0?(i=(e.min.x-f.x)*l,r=(e.max.x-f.x)*l):(i=(e.max.x-f.x)*l,r=(e.min.x-f.x)*l),u>=0?(o=(e.min.y-f.y)*u,s=(e.max.y-f.y)*u):(o=(e.max.y-f.y)*u,s=(e.min.y-f.y)*u),i>s||o>r||((o>i||isNaN(i))&&(i=o),(s<r||isNaN(r))&&(r=s),d>=0?(a=(e.min.z-f.z)*d,c=(e.max.z-f.z)*d):(a=(e.max.z-f.z)*d,c=(e.min.z-f.z)*d),i>c||a>r)||((a>i||i!==i)&&(i=a),(c<r||r!==r)&&(r=c),r<0)?null:this.at(i>=0?i:r,t)}intersectsBox(e){return this.intersectBox(e,Er)!==null}intersectTriangle(e,t,i,r,o){Cy.subVectors(t,e),Af.subVectors(i,e),Ty.crossVectors(Cy,Af);let s=this.direction.dot(Ty),a;if(s>0){if(r)return null;a=1}else if(s<0)a=-1,s=-s;else return null;so.subVectors(this.origin,e);let c=a*this.direction.dot(Af.crossVectors(so,Af));if(c<0)return null;let l=a*this.direction.dot(Cy.cross(so));if(l<0||c+l>s)return null;let u=-a*so.dot(Ty);return u<0?null:this.at(u/s,o)}applyMatrix4(e){return this.origin.applyMatrix4(e),this.direction.transformDirection(e),this}equals(e){return e.origin.equals(this.origin)&&e.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}},Ji=class extends Ir{constructor(e){super(),this.isMeshBasicMaterial=!0,this.type="MeshBasicMaterial",this.color=new st(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new uo,this.combine=qy,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.combine=e.combine,this.reflectivity=e.reflectivity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.fog=e.fog,this}},nE=new Ot,rs=new Na,Rf=new us,iE=new O,Nf=new O,Pf=new O,Of=new O,Dy=new O,Lf=new O,rE=new O,Ff=new O,un=class extends ki{constructor(e=new wn,t=new Ji){super(),this.isMesh=!0,this.type="Mesh",this.geometry=e,this.material=t,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.count=1,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),e.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=e.morphTargetInfluences.slice()),e.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},e.morphTargetDictionary)),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}updateMorphTargets(){let t=this.geometry.morphAttributes,i=Object.keys(t);if(i.length>0){let r=t[i[0]];if(r!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let o=0,s=r.length;o<s;o++){let a=r[o].name||String(o);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=o}}}}getVertexPosition(e,t){let i=this.geometry,r=i.attributes.position,o=i.morphAttributes.position,s=i.morphTargetsRelative;t.fromBufferAttribute(r,e);let a=this.morphTargetInfluences;if(o&&a){Lf.set(0,0,0);for(let c=0,l=o.length;c<l;c++){let u=a[c],d=o[c];u!==0&&(Dy.fromBufferAttribute(d,e),s?Lf.addScaledVector(Dy,u):Lf.addScaledVector(Dy.sub(t),u))}t.add(Lf)}return t}raycast(e,t){let i=this.geometry,r=this.material,o=this.matrixWorld;r!==void 0&&(i.boundingSphere===null&&i.computeBoundingSphere(),Rf.copy(i.boundingSphere),Rf.applyMatrix4(o),rs.copy(e.ray).recast(e.near),!(Rf.containsPoint(rs.origin)===!1&&(rs.intersectSphere(Rf,iE)===null||rs.origin.distanceToSquared(iE)>(e.far-e.near)**2))&&(nE.copy(o).invert(),rs.copy(e.ray).applyMatrix4(nE),!(i.boundingBox!==null&&rs.intersectsBox(i.boundingBox)===!1)&&this._computeIntersections(e,t,rs)))}_computeIntersections(e,t,i){let r,o=this.geometry,s=this.material,a=o.index,c=o.attributes.position,l=o.attributes.uv,u=o.attributes.uv1,d=o.attributes.normal,f=o.groups,h=o.drawRange;if(a!==null)if(Array.isArray(s))for(let g=0,_=f.length;g<_;g++){let m=f[g],p=s[m.materialIndex],b=Math.max(m.start,h.start),w=Math.min(a.count,Math.min(m.start+m.count,h.start+h.count));for(let S=b,D=w;S<D;S+=3){let C=a.getX(S),A=a.getX(S+1),y=a.getX(S+2);r=kf(this,p,e,i,l,u,d,C,A,y),r&&(r.faceIndex=Math.floor(S/3),r.face.materialIndex=m.materialIndex,t.push(r))}}else{let g=Math.max(0,h.start),_=Math.min(a.count,h.start+h.count);for(let m=g,p=_;m<p;m+=3){let b=a.getX(m),w=a.getX(m+1),S=a.getX(m+2);r=kf(this,s,e,i,l,u,d,b,w,S),r&&(r.faceIndex=Math.floor(m/3),t.push(r))}}else if(c!==void 0)if(Array.isArray(s))for(let g=0,_=f.length;g<_;g++){let m=f[g],p=s[m.materialIndex],b=Math.max(m.start,h.start),w=Math.min(c.count,Math.min(m.start+m.count,h.start+h.count));for(let S=b,D=w;S<D;S+=3){let C=S,A=S+1,y=S+2;r=kf(this,p,e,i,l,u,d,C,A,y),r&&(r.faceIndex=Math.floor(S/3),r.face.materialIndex=m.materialIndex,t.push(r))}}else{let g=Math.max(0,h.start),_=Math.min(c.count,h.start+h.count);for(let m=g,p=_;m<p;m+=3){let b=m,w=m+1,S=m+2;r=kf(this,s,e,i,l,u,d,b,w,S),r&&(r.faceIndex=Math.floor(m/3),t.push(r))}}}};function ON(n,e,t,i,r,o,s,a){let c;if(e.side===Un?c=i.intersectTriangle(s,o,r,!0,a):c=i.intersectTriangle(r,o,s,e.side===Tr,a),c===null)return null;Ff.copy(a),Ff.applyMatrix4(n.matrixWorld);let l=t.ray.origin.distanceTo(Ff);return l<t.near||l>t.far?null:{distance:l,point:Ff.clone(),object:n}}function kf(n,e,t,i,r,o,s,a,c,l){n.getVertexPosition(a,Nf),n.getVertexPosition(c,Pf),n.getVertexPosition(l,Of);let u=ON(n,e,t,i,Nf,Pf,Of,rE);if(u){let d=new O;co.getBarycoord(rE,Nf,Pf,Of,d),r&&(u.uv=co.getInterpolatedAttribute(r,a,c,l,d,new ot)),o&&(u.uv1=co.getInterpolatedAttribute(o,a,c,l,d,new ot)),s&&(u.normal=co.getInterpolatedAttribute(s,a,c,l,d,new O),u.normal.dot(i.direction)>0&&u.normal.multiplyScalar(-1));let f={a,b:c,c:l,normal:new O,materialIndex:0};co.getNormal(Nf,Pf,Of,f.normal),u.face=f,u.barycoord=d}return u}var ah=class extends Rr{constructor(e=null,t=1,i=1,r,o,s,a,c,l=ln,u=ln,d,f){super(null,s,a,c,l,u,r,o,d,f),this.isDataTexture=!0,this.image={data:e,width:t,height:i},this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}};var Iy=new O,LN=new O,FN=new qe,Xi=class{constructor(e=new O(1,0,0),t=0){this.isPlane=!0,this.normal=e,this.constant=t}set(e,t){return this.normal.copy(e),this.constant=t,this}setComponents(e,t,i,r){return this.normal.set(e,t,i),this.constant=r,this}setFromNormalAndCoplanarPoint(e,t){return this.normal.copy(e),this.constant=-t.dot(this.normal),this}setFromCoplanarPoints(e,t,i){let r=Iy.subVectors(i,t).cross(LN.subVectors(e,t)).normalize();return this.setFromNormalAndCoplanarPoint(r,e),this}copy(e){return this.normal.copy(e.normal),this.constant=e.constant,this}normalize(){let e=1/this.normal.length();return this.normal.multiplyScalar(e),this.constant*=e,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(e){return this.normal.dot(e)+this.constant}distanceToSphere(e){return this.distanceToPoint(e.center)-e.radius}projectPoint(e,t){return t.copy(e).addScaledVector(this.normal,-this.distanceToPoint(e))}intersectLine(e,t){let i=e.delta(Iy),r=this.normal.dot(i);if(r===0)return this.distanceToPoint(e.start)===0?t.copy(e.start):null;let o=-(e.start.dot(this.normal)+this.constant)/r;return o<0||o>1?null:t.copy(e.start).addScaledVector(i,o)}intersectsLine(e){let t=this.distanceToPoint(e.start),i=this.distanceToPoint(e.end);return t<0&&i>0||i<0&&t>0}intersectsBox(e){return e.intersectsPlane(this)}intersectsSphere(e){return e.intersectsPlane(this)}coplanarPoint(e){return e.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(e,t){let i=t||FN.getNormalMatrix(e),r=this.coplanarPoint(Iy).applyMatrix4(e),o=this.normal.applyMatrix3(i).normalize();return this.constant=-r.dot(o),this}translate(e){return this.constant-=e.dot(this.normal),this}equals(e){return e.normal.equals(this.normal)&&e.constant===this.constant}clone(){return new this.constructor().copy(this)}},os=new us,kN=new ot(.5,.5),Uf=new O,Pa=class{constructor(e=new Xi,t=new Xi,i=new Xi,r=new Xi,o=new Xi,s=new Xi){this.planes=[e,t,i,r,o,s]}set(e,t,i,r,o,s){let a=this.planes;return a[0].copy(e),a[1].copy(t),a[2].copy(i),a[3].copy(r),a[4].copy(o),a[5].copy(s),this}copy(e){let t=this.planes;for(let i=0;i<6;i++)t[i].copy(e.planes[i]);return this}setFromProjectionMatrix(e,t=Fi,i=!1){let r=this.planes,o=e.elements,s=o[0],a=o[1],c=o[2],l=o[3],u=o[4],d=o[5],f=o[6],h=o[7],g=o[8],_=o[9],m=o[10],p=o[11],b=o[12],w=o[13],S=o[14],D=o[15];if(r[0].setComponents(l-s,h-u,p-g,D-b).normalize(),r[1].setComponents(l+s,h+u,p+g,D+b).normalize(),r[2].setComponents(l+a,h+d,p+_,D+w).normalize(),r[3].setComponents(l-a,h-d,p-_,D-w).normalize(),i)r[4].setComponents(c,f,m,S).normalize(),r[5].setComponents(l-c,h-f,p-m,D-S).normalize();else if(r[4].setComponents(l-c,h-f,p-m,D-S).normalize(),t===Fi)r[5].setComponents(l+c,h+f,p+m,D+S).normalize();else if(t===Ta)r[5].setComponents(c,f,m,S).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+t);return this}intersectsObject(e){if(e.boundingSphere!==void 0)e.boundingSphere===null&&e.computeBoundingSphere(),os.copy(e.boundingSphere).applyMatrix4(e.matrixWorld);else{let t=e.geometry;t.boundingSphere===null&&t.computeBoundingSphere(),os.copy(t.boundingSphere).applyMatrix4(e.matrixWorld)}return this.intersectsSphere(os)}intersectsSprite(e){os.center.set(0,0,0);let t=kN.distanceTo(e.center);return os.radius=.7071067811865476+t,os.applyMatrix4(e.matrixWorld),this.intersectsSphere(os)}intersectsSphere(e){let t=this.planes,i=e.center,r=-e.radius;for(let o=0;o<6;o++)if(t[o].distanceToPoint(i)<r)return!1;return!0}intersectsBox(e){let t=this.planes;for(let i=0;i<6;i++){let r=t[i];if(Uf.x=r.normal.x>0?e.max.x:e.min.x,Uf.y=r.normal.y>0?e.max.y:e.min.y,Uf.z=r.normal.z>0?e.max.z:e.min.z,r.distanceToPoint(Uf)<0)return!1}return!0}containsPoint(e){let t=this.planes;for(let i=0;i<6;i++)if(t[i].distanceToPoint(e)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}};var Oa=class extends Ir{constructor(e){super(),this.isLineBasicMaterial=!0,this.type="LineBasicMaterial",this.color=new st(16777215),this.map=null,this.linewidth=1,this.linecap="round",this.linejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.linewidth=e.linewidth,this.linecap=e.linecap,this.linejoin=e.linejoin,this.fog=e.fog,this}},ch=new O,lh=new O,oE=new Ot,dl=new Na,Bf=new us,Ay=new O,sE=new O,uh=class extends ki{constructor(e=new wn,t=new Oa){super(),this.isLine=!0,this.type="Line",this.geometry=e,this.material=t,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}computeLineDistances(){let e=this.geometry;if(e.index===null){let t=e.attributes.position,i=[0];for(let r=1,o=t.count;r<o;r++)ch.fromBufferAttribute(t,r-1),lh.fromBufferAttribute(t,r),i[r]=i[r-1],i[r]+=ch.distanceTo(lh);e.setAttribute("lineDistance",new Vt(i,1))}else ke("Line.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}raycast(e,t){let i=this.geometry,r=this.matrixWorld,o=e.params.Line.threshold,s=i.drawRange;if(i.boundingSphere===null&&i.computeBoundingSphere(),Bf.copy(i.boundingSphere),Bf.applyMatrix4(r),Bf.radius+=o,e.ray.intersectsSphere(Bf)===!1)return;oE.copy(r).invert(),dl.copy(e.ray).applyMatrix4(oE);let a=o/((this.scale.x+this.scale.y+this.scale.z)/3),c=a*a,l=this.isLineSegments?2:1,u=i.index,f=i.attributes.position;if(u!==null){let h=Math.max(0,s.start),g=Math.min(u.count,s.start+s.count);for(let _=h,m=g-1;_<m;_+=l){let p=u.getX(_),b=u.getX(_+1),w=Vf(this,e,dl,c,p,b,_);w&&t.push(w)}if(this.isLineLoop){let _=u.getX(g-1),m=u.getX(h),p=Vf(this,e,dl,c,_,m,g-1);p&&t.push(p)}}else{let h=Math.max(0,s.start),g=Math.min(f.count,s.start+s.count);for(let _=h,m=g-1;_<m;_+=l){let p=Vf(this,e,dl,c,_,_+1,_);p&&t.push(p)}if(this.isLineLoop){let _=Vf(this,e,dl,c,g-1,h,g-1);_&&t.push(_)}}}updateMorphTargets(){let t=this.geometry.morphAttributes,i=Object.keys(t);if(i.length>0){let r=t[i[0]];if(r!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let o=0,s=r.length;o<s;o++){let a=r[o].name||String(o);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=o}}}}};function Vf(n,e,t,i,r,o,s){let a=n.geometry.attributes.position;if(ch.fromBufferAttribute(a,r),lh.fromBufferAttribute(a,o),t.distanceSqToSegment(ch,lh,Ay,sE)>i)return;Ay.applyMatrix4(n.matrixWorld);let l=e.ray.origin.distanceTo(Ay);if(!(l<e.near||l>e.far))return{distance:l,point:sE.clone().applyMatrix4(n.matrixWorld),index:s,face:null,faceIndex:null,barycoord:null,object:n}}var aE=new O,cE=new O,xl=class extends uh{constructor(e,t){super(e,t),this.isLineSegments=!0,this.type="LineSegments"}computeLineDistances(){let e=this.geometry;if(e.index===null){let t=e.attributes.position,i=[];for(let r=0,o=t.count;r<o;r+=2)aE.fromBufferAttribute(t,r),cE.fromBufferAttribute(t,r+1),i[r]=r===0?0:i[r-1],i[r+1]=i[r]+aE.distanceTo(cE);e.setAttribute("lineDistance",new Vt(i,1))}else ke("LineSegments.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}};var bl=class extends Rr{constructor(e=[],t=vo,i,r,o,s,a,c,l,u){super(e,t,i,r,o,s,a,c,l,u),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(e){this.image=e}};var ho=class extends Rr{constructor(e,t,i=Bi,r,o,s,a=ln,c=ln,l,u=Zi,d=1){if(u!==Zi&&u!==_o)throw new Error("DepthTexture format must be either THREE.DepthFormat or THREE.DepthStencilFormat");let f={width:e,height:t,depth:d};super(f,r,o,s,a,c,u,i,l),this.isDepthTexture=!0,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(e){return super.copy(e),this.source=new Ia(Object.assign({},e.image)),this.compareFunction=e.compareFunction,this}toJSON(e){let t=super.toJSON(e);return this.compareFunction!==null&&(t.compareFunction=this.compareFunction),t}},dh=class extends ho{constructor(e,t=Bi,i=vo,r,o,s=ln,a=ln,c,l=Zi){let u={width:e,height:e,depth:1},d=[u,u,u,u,u,u];super(e,e,t,i,r,o,s,a,c,l),this.image=d,this.isCubeDepthTexture=!0,this.isCubeTexture=!0}get images(){return this.image}set images(e){this.image=e}},Ml=class extends Rr{constructor(e=null){super(),this.sourceTexture=e,this.isExternalTexture=!0}copy(e){return super.copy(e),this.sourceTexture=e.sourceTexture,this}},La=class n extends wn{constructor(e=1,t=1,i=1,r=1,o=1,s=1){super(),this.type="BoxGeometry",this.parameters={width:e,height:t,depth:i,widthSegments:r,heightSegments:o,depthSegments:s};let a=this;r=Math.floor(r),o=Math.floor(o),s=Math.floor(s);let c=[],l=[],u=[],d=[],f=0,h=0;g("z","y","x",-1,-1,i,t,e,s,o,0),g("z","y","x",1,-1,i,t,-e,s,o,1),g("x","z","y",1,1,e,i,t,r,s,2),g("x","z","y",1,-1,e,i,-t,r,s,3),g("x","y","z",1,-1,e,t,i,r,o,4),g("x","y","z",-1,-1,e,t,-i,r,o,5),this.setIndex(c),this.setAttribute("position",new Vt(l,3)),this.setAttribute("normal",new Vt(u,3)),this.setAttribute("uv",new Vt(d,2));function g(_,m,p,b,w,S,D,C,A,y,M){let j=S/A,T=D/y,L=S/2,k=D/2,G=C/2,B=A+1,H=y+1,F=0,ee=0,Z=new O;for(let he=0;he<H;he++){let xe=he*T-k;for(let me=0;me<B;me++){let Ye=me*j-L;Z[_]=Ye*b,Z[m]=xe*w,Z[p]=G,l.push(Z.x,Z.y,Z.z),Z[_]=0,Z[m]=0,Z[p]=C>0?1:-1,u.push(Z.x,Z.y,Z.z),d.push(me/A),d.push(1-he/y),F+=1}}for(let he=0;he<y;he++)for(let xe=0;xe<A;xe++){let me=f+xe+B*he,Ye=f+xe+B*(he+1),Ft=f+(xe+1)+B*(he+1),Lt=f+(xe+1)+B*he;c.push(me,Ye,Lt),c.push(Ye,Ft,Lt),ee+=6}a.addGroup(h,ee,M),h+=ee,f+=F}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new n(e.width,e.height,e.depth,e.widthSegments,e.heightSegments,e.depthSegments)}};var fh=class n extends wn{constructor(e=1,t=1,i=1,r=32,o=1,s=!1,a=0,c=Math.PI*2){super(),this.type="CylinderGeometry",this.parameters={radiusTop:e,radiusBottom:t,height:i,radialSegments:r,heightSegments:o,openEnded:s,thetaStart:a,thetaLength:c};let l=this;r=Math.floor(r),o=Math.floor(o);let u=[],d=[],f=[],h=[],g=0,_=[],m=i/2,p=0;b(),s===!1&&(e>0&&w(!0),t>0&&w(!1)),this.setIndex(u),this.setAttribute("position",new Vt(d,3)),this.setAttribute("normal",new Vt(f,3)),this.setAttribute("uv",new Vt(h,2));function b(){let S=new O,D=new O,C=0,A=(t-e)/i;for(let y=0;y<=o;y++){let M=[],j=y/o,T=j*(t-e)+e;for(let L=0;L<=r;L++){let k=L/r,G=k*c+a,B=Math.sin(G),H=Math.cos(G);D.x=T*B,D.y=-j*i+m,D.z=T*H,d.push(D.x,D.y,D.z),S.set(B,A,H).normalize(),f.push(S.x,S.y,S.z),h.push(k,1-j),M.push(g++)}_.push(M)}for(let y=0;y<r;y++)for(let M=0;M<o;M++){let j=_[M][y],T=_[M+1][y],L=_[M+1][y+1],k=_[M][y+1];(e>0||M!==0)&&(u.push(j,T,k),C+=3),(t>0||M!==o-1)&&(u.push(T,L,k),C+=3)}l.addGroup(p,C,0),p+=C}function w(S){let D=g,C=new ot,A=new O,y=0,M=S===!0?e:t,j=S===!0?1:-1;for(let L=1;L<=r;L++)d.push(0,m*j,0),f.push(0,j,0),h.push(.5,.5),g++;let T=g;for(let L=0;L<=r;L++){let G=L/r*c+a,B=Math.cos(G),H=Math.sin(G);A.x=M*H,A.y=m*j,A.z=M*B,d.push(A.x,A.y,A.z),f.push(0,j,0),C.x=B*.5+.5,C.y=H*.5*j+.5,h.push(C.x,C.y),g++}for(let L=0;L<r;L++){let k=D+L,G=T+L;S===!0?u.push(G,G+1,k):u.push(G+1,G,k),y+=3}l.addGroup(p,y,S===!0?1:2),p+=y}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new n(e.radiusTop,e.radiusBottom,e.height,e.radialSegments,e.heightSegments,e.openEnded,e.thetaStart,e.thetaLength)}},Sl=class n extends fh{constructor(e=1,t=1,i=32,r=1,o=!1,s=0,a=Math.PI*2){super(0,e,t,i,r,o,s,a),this.type="ConeGeometry",this.parameters={radius:e,height:t,radialSegments:i,heightSegments:r,openEnded:o,thetaStart:s,thetaLength:a}}static fromJSON(e){return new n(e.radius,e.height,e.radialSegments,e.heightSegments,e.openEnded,e.thetaStart,e.thetaLength)}};var El=class n extends wn{constructor(e=1,t=1,i=1,r=1){super(),this.type="PlaneGeometry",this.parameters={width:e,height:t,widthSegments:i,heightSegments:r};let o=e/2,s=t/2,a=Math.floor(i),c=Math.floor(r),l=a+1,u=c+1,d=e/a,f=t/c,h=[],g=[],_=[],m=[];for(let p=0;p<u;p++){let b=p*f-s;for(let w=0;w<l;w++){let S=w*d-o;g.push(S,-b,0),_.push(0,0,1),m.push(w/a),m.push(1-p/c)}}for(let p=0;p<c;p++)for(let b=0;b<a;b++){let w=b+l*p,S=b+l*(p+1),D=b+1+l*(p+1),C=b+1+l*p;h.push(w,S,C),h.push(S,D,C)}this.setIndex(h),this.setAttribute("position",new Vt(g,3)),this.setAttribute("normal",new Vt(_,3)),this.setAttribute("uv",new Vt(m,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new n(e.width,e.height,e.widthSegments,e.heightSegments)}};var Fa=class n extends wn{constructor(e=1,t=32,i=16,r=0,o=Math.PI*2,s=0,a=Math.PI){super(),this.type="SphereGeometry",this.parameters={radius:e,widthSegments:t,heightSegments:i,phiStart:r,phiLength:o,thetaStart:s,thetaLength:a},t=Math.max(3,Math.floor(t)),i=Math.max(2,Math.floor(i));let c=Math.min(s+a,Math.PI),l=0,u=[],d=new O,f=new O,h=[],g=[],_=[],m=[];for(let p=0;p<=i;p++){let b=[],w=p/i,S=0;p===0&&s===0?S=.5/t:p===i&&c===Math.PI&&(S=-.5/t);for(let D=0;D<=t;D++){let C=D/t;d.x=-e*Math.cos(r+C*o)*Math.sin(s+w*a),d.y=e*Math.cos(s+w*a),d.z=e*Math.sin(r+C*o)*Math.sin(s+w*a),g.push(d.x,d.y,d.z),f.copy(d).normalize(),_.push(f.x,f.y,f.z),m.push(C+S,1-w),b.push(l++)}u.push(b)}for(let p=0;p<i;p++)for(let b=0;b<t;b++){let w=u[p][b+1],S=u[p][b],D=u[p+1][b],C=u[p+1][b+1];(p!==0||s>0)&&h.push(w,S,C),(p!==i-1||c<Math.PI)&&h.push(S,D,C)}this.setIndex(h),this.setAttribute("position",new Vt(g,3)),this.setAttribute("normal",new Vt(_,3)),this.setAttribute("uv",new Vt(m,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new n(e.radius,e.widthSegments,e.heightSegments,e.phiStart,e.phiLength,e.thetaStart,e.thetaLength)}};var ka=class n extends wn{constructor(e=1,t=.4,i=12,r=48,o=Math.PI*2,s=0,a=Math.PI*2){super(),this.type="TorusGeometry",this.parameters={radius:e,tube:t,radialSegments:i,tubularSegments:r,arc:o,thetaStart:s,thetaLength:a},i=Math.floor(i),r=Math.floor(r);let c=[],l=[],u=[],d=[],f=new O,h=new O,g=new O;for(let _=0;_<=i;_++){let m=s+_/i*a;for(let p=0;p<=r;p++){let b=p/r*o;h.x=(e+t*Math.cos(m))*Math.cos(b),h.y=(e+t*Math.cos(m))*Math.sin(b),h.z=t*Math.sin(m),l.push(h.x,h.y,h.z),f.x=e*Math.cos(b),f.y=e*Math.sin(b),g.subVectors(h,f).normalize(),u.push(g.x,g.y,g.z),d.push(p/r),d.push(_/i)}}for(let _=1;_<=i;_++)for(let m=1;m<=r;m++){let p=(r+1)*_+m-1,b=(r+1)*(_-1)+m-1,w=(r+1)*(_-1)+m,S=(r+1)*_+m;c.push(p,b,S),c.push(b,w,S)}this.setIndex(c),this.setAttribute("position",new Vt(l,3)),this.setAttribute("normal",new Vt(u,3)),this.setAttribute("uv",new Vt(d,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new n(e.radius,e.tube,e.radialSegments,e.tubularSegments,e.arc)}};function hs(n){let e={};for(let t in n){e[t]={};for(let i in n[t]){let r=n[t][i];r&&(r.isColor||r.isMatrix3||r.isMatrix4||r.isVector2||r.isVector3||r.isVector4||r.isTexture||r.isQuaternion)?r.isRenderTargetTexture?(ke("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),e[t][i]=null):e[t][i]=r.clone():Array.isArray(r)?e[t][i]=r.slice():e[t][i]=r}}return e}function Cn(n){let e={};for(let t=0;t<n.length;t++){let i=hs(n[t]);for(let r in i)e[r]=i[r]}return e}function UN(n){let e=[];for(let t=0;t<n.length;t++)e.push(n[t].clone());return e}function d0(n){let e=n.getRenderTarget();return e===null?n.outputColorSpace:e.isXRRenderTarget===!0?e.texture.colorSpace:at.workingColorSpace}var KE={clone:hs,merge:Cn},BN=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,VN=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`,oi=class extends Ir{constructor(e){super(),this.isShaderMaterial=!0,this.type="ShaderMaterial",this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=BN,this.fragmentShader=VN,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,e!==void 0&&this.setValues(e)}copy(e){return super.copy(e),this.fragmentShader=e.fragmentShader,this.vertexShader=e.vertexShader,this.uniforms=hs(e.uniforms),this.uniformsGroups=UN(e.uniformsGroups),this.defines=Object.assign({},e.defines),this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.fog=e.fog,this.lights=e.lights,this.clipping=e.clipping,this.extensions=Object.assign({},e.extensions),this.glslVersion=e.glslVersion,this.defaultAttributeValues=Object.assign({},e.defaultAttributeValues),this.index0AttributeName=e.index0AttributeName,this.uniformsNeedUpdate=e.uniformsNeedUpdate,this}toJSON(e){let t=super.toJSON(e);t.glslVersion=this.glslVersion,t.uniforms={};for(let r in this.uniforms){let s=this.uniforms[r].value;s&&s.isTexture?t.uniforms[r]={type:"t",value:s.toJSON(e).uuid}:s&&s.isColor?t.uniforms[r]={type:"c",value:s.getHex()}:s&&s.isVector2?t.uniforms[r]={type:"v2",value:s.toArray()}:s&&s.isVector3?t.uniforms[r]={type:"v3",value:s.toArray()}:s&&s.isVector4?t.uniforms[r]={type:"v4",value:s.toArray()}:s&&s.isMatrix3?t.uniforms[r]={type:"m3",value:s.toArray()}:s&&s.isMatrix4?t.uniforms[r]={type:"m4",value:s.toArray()}:t.uniforms[r]={value:s}}Object.keys(this.defines).length>0&&(t.defines=this.defines),t.vertexShader=this.vertexShader,t.fragmentShader=this.fragmentShader,t.lights=this.lights,t.clipping=this.clipping;let i={};for(let r in this.extensions)this.extensions[r]===!0&&(i[r]=!0);return Object.keys(i).length>0&&(t.extensions=i),t}},hh=class extends oi{constructor(e){super(e),this.isRawShaderMaterial=!0,this.type="RawShaderMaterial"}},wl=class extends Ir{constructor(e){super(),this.isMeshStandardMaterial=!0,this.type="MeshStandardMaterial",this.defines={STANDARD:""},this.color=new st(16777215),this.roughness=1,this.metalness=0,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new st(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=c0,this.normalScale=new ot(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.roughnessMap=null,this.metalnessMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new uo,this.envMapIntensity=1,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.defines={STANDARD:""},this.color.copy(e.color),this.roughness=e.roughness,this.metalness=e.metalness,this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.emissive.copy(e.emissive),this.emissiveMap=e.emissiveMap,this.emissiveIntensity=e.emissiveIntensity,this.bumpMap=e.bumpMap,this.bumpScale=e.bumpScale,this.normalMap=e.normalMap,this.normalMapType=e.normalMapType,this.normalScale.copy(e.normalScale),this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.roughnessMap=e.roughnessMap,this.metalnessMap=e.metalnessMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.envMapIntensity=e.envMapIntensity,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.flatShading=e.flatShading,this.fog=e.fog,this}};var ph=class extends Ir{constructor(e){super(),this.isMeshDepthMaterial=!0,this.type="MeshDepthMaterial",this.depthPacking=BE,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(e)}copy(e){return super.copy(e),this.depthPacking=e.depthPacking,this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this}},mh=class extends Ir{constructor(e){super(),this.isMeshDistanceMaterial=!0,this.type="MeshDistanceMaterial",this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(e)}copy(e){return super.copy(e),this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this}};function Hf(n,e){return!n||n.constructor===e?n:typeof e.BYTES_PER_ELEMENT=="number"?new e(n):Array.prototype.slice.call(n)}var po=class{constructor(e,t,i,r){this.parameterPositions=e,this._cachedIndex=0,this.resultBuffer=r!==void 0?r:new t.constructor(i),this.sampleValues=t,this.valueSize=i,this.settings=null,this.DefaultSettings_={}}evaluate(e){let t=this.parameterPositions,i=this._cachedIndex,r=t[i],o=t[i-1];n:{e:{let s;t:{i:if(!(e<r)){for(let a=i+2;;){if(r===void 0){if(e<o)break i;return i=t.length,this._cachedIndex=i,this.copySampleValue_(i-1)}if(i===a)break;if(o=r,r=t[++i],e<r)break e}s=t.length;break t}if(!(e>=o)){let a=t[1];e<a&&(i=2,o=a);for(let c=i-2;;){if(o===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(i===c)break;if(r=o,o=t[--i-1],e>=o)break e}s=i,i=0;break t}break n}for(;i<s;){let a=i+s>>>1;e<t[a]?s=a:i=a+1}if(r=t[i],o=t[i-1],o===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(r===void 0)return i=t.length,this._cachedIndex=i,this.copySampleValue_(i-1)}this._cachedIndex=i,this.intervalChanged_(i,o,r)}return this.interpolate_(i,o,e,r)}getSettings_(){return this.settings||this.DefaultSettings_}copySampleValue_(e){let t=this.resultBuffer,i=this.sampleValues,r=this.valueSize,o=e*r;for(let s=0;s!==r;++s)t[s]=i[o+s];return t}interpolate_(){throw new Error("call to abstract method")}intervalChanged_(){}},gh=class extends po{constructor(e,t,i,r){super(e,t,i,r),this._weightPrev=-0,this._offsetPrev=-0,this._weightNext=-0,this._offsetNext=-0,this.DefaultSettings_={endingStart:Oy,endingEnd:Oy}}intervalChanged_(e,t,i){let r=this.parameterPositions,o=e-2,s=e+1,a=r[o],c=r[s];if(a===void 0)switch(this.getSettings_().endingStart){case Ly:o=e,a=2*t-i;break;case Fy:o=r.length-2,a=t+r[o]-r[o+1];break;default:o=e,a=i}if(c===void 0)switch(this.getSettings_().endingEnd){case Ly:s=e,c=2*i-t;break;case Fy:s=1,c=i+r[1]-r[0];break;default:s=e-1,c=t}let l=(i-t)*.5,u=this.valueSize;this._weightPrev=l/(t-a),this._weightNext=l/(c-i),this._offsetPrev=o*u,this._offsetNext=s*u}interpolate_(e,t,i,r){let o=this.resultBuffer,s=this.sampleValues,a=this.valueSize,c=e*a,l=c-a,u=this._offsetPrev,d=this._offsetNext,f=this._weightPrev,h=this._weightNext,g=(i-t)/(r-t),_=g*g,m=_*g,p=-f*m+2*f*_-f*g,b=(1+f)*m+(-1.5-2*f)*_+(-.5+f)*g+1,w=(-1-h)*m+(1.5+h)*_+.5*g,S=h*m-h*_;for(let D=0;D!==a;++D)o[D]=p*s[u+D]+b*s[l+D]+w*s[c+D]+S*s[d+D];return o}},vh=class extends po{constructor(e,t,i,r){super(e,t,i,r)}interpolate_(e,t,i,r){let o=this.resultBuffer,s=this.sampleValues,a=this.valueSize,c=e*a,l=c-a,u=(i-t)/(r-t),d=1-u;for(let f=0;f!==a;++f)o[f]=s[l+f]*d+s[c+f]*u;return o}},yh=class extends po{constructor(e,t,i,r){super(e,t,i,r)}interpolate_(e){return this.copySampleValue_(e-1)}},_h=class extends po{interpolate_(e,t,i,r){let o=this.resultBuffer,s=this.sampleValues,a=this.valueSize,c=e*a,l=c-a,u=this.settings||this.DefaultSettings_,d=u.inTangents,f=u.outTangents;if(!d||!f){let _=(i-t)/(r-t),m=1-_;for(let p=0;p!==a;++p)o[p]=s[l+p]*m+s[c+p]*_;return o}let h=a*2,g=e-1;for(let _=0;_!==a;++_){let m=s[l+_],p=s[c+_],b=g*h+_*2,w=f[b],S=f[b+1],D=e*h+_*2,C=d[D],A=d[D+1],y=(i-t)/(r-t),M,j,T,L,k;for(let G=0;G<8;G++){M=y*y,j=M*y,T=1-y,L=T*T,k=L*T;let H=k*t+3*L*y*w+3*T*M*C+j*r-i;if(Math.abs(H)<1e-10)break;let F=3*L*(w-t)+6*T*y*(C-w)+3*M*(r-C);if(Math.abs(F)<1e-10)break;y=y-H/F,y=Math.max(0,Math.min(1,y))}o[_]=k*m+3*L*y*S+3*T*M*A+j*p}return o}},si=class{constructor(e,t,i,r){if(e===void 0)throw new Error("THREE.KeyframeTrack: track name is undefined");if(t===void 0||t.length===0)throw new Error("THREE.KeyframeTrack: no keyframes in track named "+e);this.name=e,this.times=Hf(t,this.TimeBufferType),this.values=Hf(i,this.ValueBufferType),this.setInterpolation(r||this.DefaultInterpolation)}static toJSON(e){let t=e.constructor,i;if(t.toJSON!==this.toJSON)i=t.toJSON(e);else{i={name:e.name,times:Hf(e.times,Array),values:Hf(e.values,Array)};let r=e.getInterpolation();r!==e.DefaultInterpolation&&(i.interpolation=r)}return i.type=e.ValueTypeName,i}InterpolantFactoryMethodDiscrete(e){return new yh(this.times,this.values,this.getValueSize(),e)}InterpolantFactoryMethodLinear(e){return new vh(this.times,this.values,this.getValueSize(),e)}InterpolantFactoryMethodSmooth(e){return new gh(this.times,this.values,this.getValueSize(),e)}InterpolantFactoryMethodBezier(e){let t=new _h(this.times,this.values,this.getValueSize(),e);return this.settings&&(t.settings=this.settings),t}setInterpolation(e){let t;switch(e){case fl:t=this.InterpolantFactoryMethodDiscrete;break;case nh:t=this.InterpolantFactoryMethodLinear;break;case jf:t=this.InterpolantFactoryMethodSmooth;break;case Py:t=this.InterpolantFactoryMethodBezier;break}if(t===void 0){let i="unsupported interpolation for "+this.ValueTypeName+" keyframe track named "+this.name;if(this.createInterpolant===void 0)if(e!==this.DefaultInterpolation)this.setInterpolation(this.DefaultInterpolation);else throw new Error(i);return ke("KeyframeTrack:",i),this}return this.createInterpolant=t,this}getInterpolation(){switch(this.createInterpolant){case this.InterpolantFactoryMethodDiscrete:return fl;case this.InterpolantFactoryMethodLinear:return nh;case this.InterpolantFactoryMethodSmooth:return jf;case this.InterpolantFactoryMethodBezier:return Py}}getValueSize(){return this.values.length/this.times.length}shift(e){if(e!==0){let t=this.times;for(let i=0,r=t.length;i!==r;++i)t[i]+=e}return this}scale(e){if(e!==1){let t=this.times;for(let i=0,r=t.length;i!==r;++i)t[i]*=e}return this}trim(e,t){let i=this.times,r=i.length,o=0,s=r-1;for(;o!==r&&i[o]<e;)++o;for(;s!==-1&&i[s]>t;)--s;if(++s,o!==0||s!==r){o>=s&&(s=Math.max(s,1),o=s-1);let a=this.getValueSize();this.times=i.slice(o,s),this.values=this.values.slice(o*a,s*a)}return this}validate(){let e=!0,t=this.getValueSize();t-Math.floor(t)!==0&&(Fe("KeyframeTrack: Invalid value size in track.",this),e=!1);let i=this.times,r=this.values,o=i.length;o===0&&(Fe("KeyframeTrack: Track is empty.",this),e=!1);let s=null;for(let a=0;a!==o;a++){let c=i[a];if(typeof c=="number"&&isNaN(c)){Fe("KeyframeTrack: Time is not a valid number.",this,a,c),e=!1;break}if(s!==null&&s>c){Fe("KeyframeTrack: Out of order keys.",this,a,c,s),e=!1;break}s=c}if(r!==void 0&&yN(r))for(let a=0,c=r.length;a!==c;++a){let l=r[a];if(isNaN(l)){Fe("KeyframeTrack: Value is not a valid number.",this,a,l),e=!1;break}}return e}optimize(){let e=this.times.slice(),t=this.values.slice(),i=this.getValueSize(),r=this.getInterpolation()===jf,o=e.length-1,s=1;for(let a=1;a<o;++a){let c=!1,l=e[a],u=e[a+1];if(l!==u&&(a!==1||l!==e[0]))if(r)c=!0;else{let d=a*i,f=d-i,h=d+i;for(let g=0;g!==i;++g){let _=t[d+g];if(_!==t[f+g]||_!==t[h+g]){c=!0;break}}}if(c){if(a!==s){e[s]=e[a];let d=a*i,f=s*i;for(let h=0;h!==i;++h)t[f+h]=t[d+h]}++s}}if(o>0){e[s]=e[o];for(let a=o*i,c=s*i,l=0;l!==i;++l)t[c+l]=t[a+l];++s}return s!==e.length?(this.times=e.slice(0,s),this.values=t.slice(0,s*i)):(this.times=e,this.values=t),this}clone(){let e=this.times.slice(),t=this.values.slice(),i=this.constructor,r=new i(this.name,e,t);return r.createInterpolant=this.createInterpolant,r}};si.prototype.ValueTypeName="";si.prototype.TimeBufferType=Float32Array;si.prototype.ValueBufferType=Float32Array;si.prototype.DefaultInterpolation=nh;var mo=class extends si{constructor(e,t,i){super(e,t,i)}};mo.prototype.ValueTypeName="bool";mo.prototype.ValueBufferType=Array;mo.prototype.DefaultInterpolation=fl;mo.prototype.InterpolantFactoryMethodLinear=void 0;mo.prototype.InterpolantFactoryMethodSmooth=void 0;var xh=class extends si{constructor(e,t,i,r){super(e,t,i,r)}};xh.prototype.ValueTypeName="color";var bh=class extends si{constructor(e,t,i,r){super(e,t,i,r)}};bh.prototype.ValueTypeName="number";var Mh=class extends po{constructor(e,t,i,r){super(e,t,i,r)}interpolate_(e,t,i,r){let o=this.resultBuffer,s=this.sampleValues,a=this.valueSize,c=(i-t)/(r-t),l=e*a;for(let u=l+a;l!==u;l+=4)ii.slerpFlat(o,0,s,l-a,s,l,c);return o}},Cl=class extends si{constructor(e,t,i,r){super(e,t,i,r)}InterpolantFactoryMethodLinear(e){return new Mh(this.times,this.values,this.getValueSize(),e)}};Cl.prototype.ValueTypeName="quaternion";Cl.prototype.InterpolantFactoryMethodSmooth=void 0;var go=class extends si{constructor(e,t,i){super(e,t,i)}};go.prototype.ValueTypeName="string";go.prototype.ValueBufferType=Array;go.prototype.DefaultInterpolation=fl;go.prototype.InterpolantFactoryMethodLinear=void 0;go.prototype.InterpolantFactoryMethodSmooth=void 0;var Sh=class extends si{constructor(e,t,i,r){super(e,t,i,r)}};Sh.prototype.ValueTypeName="vector";var Tl=class extends ki{constructor(e,t=1){super(),this.isLight=!0,this.type="Light",this.color=new st(e),this.intensity=t}dispose(){this.dispatchEvent({type:"dispose"})}copy(e,t){return super.copy(e,t),this.color.copy(e.color),this.intensity=e.intensity,this}toJSON(e){let t=super.toJSON(e);return t.object.color=this.color.getHex(),t.object.intensity=this.intensity,t}};var Ry=new Ot,lE=new O,uE=new O,By=class{constructor(e){this.camera=e,this.intensity=1,this.bias=0,this.biasNode=null,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new ot(512,512),this.mapType=qn,this.map=null,this.mapPass=null,this.matrix=new Ot,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new Pa,this._frameExtents=new ot(1,1),this._viewportCount=1,this._viewports=[new Ht(0,0,1,1)]}getViewportCount(){return this._viewportCount}getFrustum(){return this._frustum}updateMatrices(e){let t=this.camera,i=this.matrix;lE.setFromMatrixPosition(e.matrixWorld),t.position.copy(lE),uE.setFromMatrixPosition(e.target.matrixWorld),t.lookAt(uE),t.updateMatrixWorld(),Ry.multiplyMatrices(t.projectionMatrix,t.matrixWorldInverse),this._frustum.setFromProjectionMatrix(Ry,t.coordinateSystem,t.reversedDepth),t.coordinateSystem===Ta||t.reversedDepth?i.set(.5,0,0,.5,0,.5,0,.5,0,0,1,0,0,0,0,1):i.set(.5,0,0,.5,0,.5,0,.5,0,0,.5,.5,0,0,0,1),i.multiply(Ry)}getViewport(e){return this._viewports[e]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(e){return this.camera=e.camera.clone(),this.intensity=e.intensity,this.bias=e.bias,this.radius=e.radius,this.autoUpdate=e.autoUpdate,this.needsUpdate=e.needsUpdate,this.normalBias=e.normalBias,this.blurSamples=e.blurSamples,this.mapSize.copy(e.mapSize),this.biasNode=e.biasNode,this}clone(){return new this.constructor().copy(this)}toJSON(){let e={};return this.intensity!==1&&(e.intensity=this.intensity),this.bias!==0&&(e.bias=this.bias),this.normalBias!==0&&(e.normalBias=this.normalBias),this.radius!==1&&(e.radius=this.radius),(this.mapSize.x!==512||this.mapSize.y!==512)&&(e.mapSize=this.mapSize.toArray()),e.camera=this.camera.toJSON(!1).object,delete e.camera.matrix,e}},zf=new O,Gf=new ii,qi=new O,Dl=class extends ki{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new Ot,this.projectionMatrix=new Ot,this.projectionMatrixInverse=new Ot,this.coordinateSystem=Fi,this._reversedDepth=!1}get reversedDepth(){return this._reversedDepth}copy(e,t){return super.copy(e,t),this.matrixWorldInverse.copy(e.matrixWorldInverse),this.projectionMatrix.copy(e.projectionMatrix),this.projectionMatrixInverse.copy(e.projectionMatrixInverse),this.coordinateSystem=e.coordinateSystem,this}getWorldDirection(e){return super.getWorldDirection(e).negate()}updateMatrixWorld(e){super.updateMatrixWorld(e),this.matrixWorld.decompose(zf,Gf,qi),qi.x===1&&qi.y===1&&qi.z===1?this.matrixWorldInverse.copy(this.matrixWorld).invert():this.matrixWorldInverse.compose(zf,Gf,qi.set(1,1,1)).invert()}updateWorldMatrix(e,t){super.updateWorldMatrix(e,t),this.matrixWorld.decompose(zf,Gf,qi),qi.x===1&&qi.y===1&&qi.z===1?this.matrixWorldInverse.copy(this.matrixWorld).invert():this.matrixWorldInverse.compose(zf,Gf,qi.set(1,1,1)).invert()}clone(){return new this.constructor().copy(this)}},ao=new O,dE=new ot,fE=new ot,En=class extends Dl{constructor(e=50,t=1,i=.1,r=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=e,this.zoom=1,this.near=i,this.far=r,this.focus=10,this.aspect=t,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.fov=e.fov,this.zoom=e.zoom,this.near=e.near,this.far=e.far,this.focus=e.focus,this.aspect=e.aspect,this.view=e.view===null?null:Object.assign({},e.view),this.filmGauge=e.filmGauge,this.filmOffset=e.filmOffset,this}setFocalLength(e){let t=.5*this.getFilmHeight()/e;this.fov=ih*2*Math.atan(t),this.updateProjectionMatrix()}getFocalLength(){let e=Math.tan(ay*.5*this.fov);return .5*this.getFilmHeight()/e}getEffectiveFOV(){return ih*2*Math.atan(Math.tan(ay*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(e,t,i){ao.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),t.set(ao.x,ao.y).multiplyScalar(-e/ao.z),ao.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),i.set(ao.x,ao.y).multiplyScalar(-e/ao.z)}getViewSize(e,t){return this.getViewBounds(e,dE,fE),t.subVectors(fE,dE)}setViewOffset(e,t,i,r,o,s){this.aspect=e/t,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=i,this.view.offsetY=r,this.view.width=o,this.view.height=s,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){let e=this.near,t=e*Math.tan(ay*.5*this.fov)/this.zoom,i=2*t,r=this.aspect*i,o=-.5*r,s=this.view;if(this.view!==null&&this.view.enabled){let c=s.fullWidth,l=s.fullHeight;o+=s.offsetX*r/c,t-=s.offsetY*i/l,r*=s.width/c,i*=s.height/l}let a=this.filmOffset;a!==0&&(o+=e*a/this.getFilmWidth()),this.projectionMatrix.makePerspective(o,o+r,t,t-i,e,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){let t=super.toJSON(e);return t.object.fov=this.fov,t.object.zoom=this.zoom,t.object.near=this.near,t.object.far=this.far,t.object.focus=this.focus,t.object.aspect=this.aspect,this.view!==null&&(t.object.view=Object.assign({},this.view)),t.object.filmGauge=this.filmGauge,t.object.filmOffset=this.filmOffset,t}};var Ua=class extends Dl{constructor(e=-1,t=1,i=1,r=-1,o=.1,s=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=e,this.right=t,this.top=i,this.bottom=r,this.near=o,this.far=s,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.left=e.left,this.right=e.right,this.top=e.top,this.bottom=e.bottom,this.near=e.near,this.far=e.far,this.zoom=e.zoom,this.view=e.view===null?null:Object.assign({},e.view),this}setViewOffset(e,t,i,r,o,s){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=i,this.view.offsetY=r,this.view.width=o,this.view.height=s,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){let e=(this.right-this.left)/(2*this.zoom),t=(this.top-this.bottom)/(2*this.zoom),i=(this.right+this.left)/2,r=(this.top+this.bottom)/2,o=i-e,s=i+e,a=r+t,c=r-t;if(this.view!==null&&this.view.enabled){let l=(this.right-this.left)/this.view.fullWidth/this.zoom,u=(this.top-this.bottom)/this.view.fullHeight/this.zoom;o+=l*this.view.offsetX,s=o+l*this.view.width,a-=u*this.view.offsetY,c=a-u*this.view.height}this.projectionMatrix.makeOrthographic(o,s,a,c,this.near,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){let t=super.toJSON(e);return t.object.zoom=this.zoom,t.object.left=this.left,t.object.right=this.right,t.object.top=this.top,t.object.bottom=this.bottom,t.object.near=this.near,t.object.far=this.far,this.view!==null&&(t.object.view=Object.assign({},this.view)),t}},Vy=class extends By{constructor(){super(new Ua(-5,5,5,-5,.5,500)),this.isDirectionalLightShadow=!0}},Il=class extends Tl{constructor(e,t){super(e,t),this.isDirectionalLight=!0,this.type="DirectionalLight",this.position.copy(ki.DEFAULT_UP),this.updateMatrix(),this.target=new ki,this.shadow=new Vy}dispose(){super.dispose(),this.shadow.dispose()}copy(e){return super.copy(e),this.target=e.target.clone(),this.shadow=e.shadow.clone(),this}toJSON(e){let t=super.toJSON(e);return t.object.shadow=this.shadow.toJSON(),t.object.target=this.target.uuid,t}},Al=class extends Tl{constructor(e,t){super(e,t),this.isAmbientLight=!0,this.type="AmbientLight"}};var Ea=-90,wa=1,Eh=class extends ki{constructor(e,t,i){super(),this.type="CubeCamera",this.renderTarget=i,this.coordinateSystem=null,this.activeMipmapLevel=0;let r=new En(Ea,wa,e,t);r.layers=this.layers,this.add(r);let o=new En(Ea,wa,e,t);o.layers=this.layers,this.add(o);let s=new En(Ea,wa,e,t);s.layers=this.layers,this.add(s);let a=new En(Ea,wa,e,t);a.layers=this.layers,this.add(a);let c=new En(Ea,wa,e,t);c.layers=this.layers,this.add(c);let l=new En(Ea,wa,e,t);l.layers=this.layers,this.add(l)}updateCoordinateSystem(){let e=this.coordinateSystem,t=this.children.concat(),[i,r,o,s,a,c]=t;for(let l of t)this.remove(l);if(e===Fi)i.up.set(0,1,0),i.lookAt(1,0,0),r.up.set(0,1,0),r.lookAt(-1,0,0),o.up.set(0,0,-1),o.lookAt(0,1,0),s.up.set(0,0,1),s.lookAt(0,-1,0),a.up.set(0,1,0),a.lookAt(0,0,1),c.up.set(0,1,0),c.lookAt(0,0,-1);else if(e===Ta)i.up.set(0,-1,0),i.lookAt(-1,0,0),r.up.set(0,-1,0),r.lookAt(1,0,0),o.up.set(0,0,1),o.lookAt(0,1,0),s.up.set(0,0,-1),s.lookAt(0,-1,0),a.up.set(0,-1,0),a.lookAt(0,0,1),c.up.set(0,-1,0),c.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+e);for(let l of t)this.add(l),l.updateMatrixWorld()}update(e,t){this.parent===null&&this.updateMatrixWorld();let{renderTarget:i,activeMipmapLevel:r}=this;this.coordinateSystem!==e.coordinateSystem&&(this.coordinateSystem=e.coordinateSystem,this.updateCoordinateSystem());let[o,s,a,c,l,u]=this.children,d=e.getRenderTarget(),f=e.getActiveCubeFace(),h=e.getActiveMipmapLevel(),g=e.xr.enabled;e.xr.enabled=!1;let _=i.texture.generateMipmaps;i.texture.generateMipmaps=!1;let m=!1;e.isWebGLRenderer===!0?m=e.state.buffers.depth.getReversed():m=e.reversedDepthBuffer,e.setRenderTarget(i,0,r),m&&e.autoClear===!1&&e.clearDepth(),e.render(t,o),e.setRenderTarget(i,1,r),m&&e.autoClear===!1&&e.clearDepth(),e.render(t,s),e.setRenderTarget(i,2,r),m&&e.autoClear===!1&&e.clearDepth(),e.render(t,a),e.setRenderTarget(i,3,r),m&&e.autoClear===!1&&e.clearDepth(),e.render(t,c),e.setRenderTarget(i,4,r),m&&e.autoClear===!1&&e.clearDepth(),e.render(t,l),i.texture.generateMipmaps=_,e.setRenderTarget(i,5,r),m&&e.autoClear===!1&&e.clearDepth(),e.render(t,u),e.setRenderTarget(d,f,h),e.xr.enabled=g,i.texture.needsPMREMUpdate=!0}},wh=class extends En{constructor(e=[]){super(),this.isArrayCamera=!0,this.isMultiViewCamera=!1,this.cameras=e}};var f0="\\[\\]\\.:\\/",HN=new RegExp("["+f0+"]","g"),h0="[^"+f0+"]",zN="[^"+f0.replace("\\.","")+"]",GN=/((?:WC+[\/:])*)/.source.replace("WC",h0),jN=/(WCOD+)?/.source.replace("WCOD",zN),WN=/(?:\.(WC+)(?:\[(.+)\])?)?/.source.replace("WC",h0),$N=/\.(WC+)(?:\[(.+)\])?/.source.replace("WC",h0),qN=new RegExp("^"+GN+jN+WN+$N+"$"),XN=["material","materials","bones","map"],Hy=class{constructor(e,t,i){let r=i||Gt.parseTrackName(t);this._targetGroup=e,this._bindings=e.subscribe_(t,r)}getValue(e,t){this.bind();let i=this._targetGroup.nCachedObjects_,r=this._bindings[i];r!==void 0&&r.getValue(e,t)}setValue(e,t){let i=this._bindings;for(let r=this._targetGroup.nCachedObjects_,o=i.length;r!==o;++r)i[r].setValue(e,t)}bind(){let e=this._bindings;for(let t=this._targetGroup.nCachedObjects_,i=e.length;t!==i;++t)e[t].bind()}unbind(){let e=this._bindings;for(let t=this._targetGroup.nCachedObjects_,i=e.length;t!==i;++t)e[t].unbind()}},Gt=(()=>{class n{constructor(t,i,r){this.path=i,this.parsedPath=r||n.parseTrackName(i),this.node=n.findNode(t,this.parsedPath.nodeName),this.rootNode=t,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}static create(t,i,r){return t&&t.isAnimationObjectGroup?new n.Composite(t,i,r):new n(t,i,r)}static sanitizeNodeName(t){return t.replace(/\s/g,"_").replace(HN,"")}static parseTrackName(t){let i=qN.exec(t);if(i===null)throw new Error("PropertyBinding: Cannot parse trackName: "+t);let r={nodeName:i[2],objectName:i[3],objectIndex:i[4],propertyName:i[5],propertyIndex:i[6]},o=r.nodeName&&r.nodeName.lastIndexOf(".");if(o!==void 0&&o!==-1){let s=r.nodeName.substring(o+1);XN.indexOf(s)!==-1&&(r.nodeName=r.nodeName.substring(0,o),r.objectName=s)}if(r.propertyName===null||r.propertyName.length===0)throw new Error("PropertyBinding: can not parse propertyName from trackName: "+t);return r}static findNode(t,i){if(i===void 0||i===""||i==="."||i===-1||i===t.name||i===t.uuid)return t;if(t.skeleton){let r=t.skeleton.getBoneByName(i);if(r!==void 0)return r}if(t.children){let r=function(s){for(let a=0;a<s.length;a++){let c=s[a];if(c.name===i||c.uuid===i)return c;let l=r(c.children);if(l)return l}return null},o=r(t.children);if(o)return o}return null}_getValue_unavailable(){}_setValue_unavailable(){}_getValue_direct(t,i){t[i]=this.targetObject[this.propertyName]}_getValue_array(t,i){let r=this.resolvedProperty;for(let o=0,s=r.length;o!==s;++o)t[i++]=r[o]}_getValue_arrayElement(t,i){t[i]=this.resolvedProperty[this.propertyIndex]}_getValue_toArray(t,i){this.resolvedProperty.toArray(t,i)}_setValue_direct(t,i){this.targetObject[this.propertyName]=t[i]}_setValue_direct_setNeedsUpdate(t,i){this.targetObject[this.propertyName]=t[i],this.targetObject.needsUpdate=!0}_setValue_direct_setMatrixWorldNeedsUpdate(t,i){this.targetObject[this.propertyName]=t[i],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_array(t,i){let r=this.resolvedProperty;for(let o=0,s=r.length;o!==s;++o)r[o]=t[i++]}_setValue_array_setNeedsUpdate(t,i){let r=this.resolvedProperty;for(let o=0,s=r.length;o!==s;++o)r[o]=t[i++];this.targetObject.needsUpdate=!0}_setValue_array_setMatrixWorldNeedsUpdate(t,i){let r=this.resolvedProperty;for(let o=0,s=r.length;o!==s;++o)r[o]=t[i++];this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_arrayElement(t,i){this.resolvedProperty[this.propertyIndex]=t[i]}_setValue_arrayElement_setNeedsUpdate(t,i){this.resolvedProperty[this.propertyIndex]=t[i],this.targetObject.needsUpdate=!0}_setValue_arrayElement_setMatrixWorldNeedsUpdate(t,i){this.resolvedProperty[this.propertyIndex]=t[i],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_fromArray(t,i){this.resolvedProperty.fromArray(t,i)}_setValue_fromArray_setNeedsUpdate(t,i){this.resolvedProperty.fromArray(t,i),this.targetObject.needsUpdate=!0}_setValue_fromArray_setMatrixWorldNeedsUpdate(t,i){this.resolvedProperty.fromArray(t,i),this.targetObject.matrixWorldNeedsUpdate=!0}_getValue_unbound(t,i){this.bind(),this.getValue(t,i)}_setValue_unbound(t,i){this.bind(),this.setValue(t,i)}bind(){let t=this.node,i=this.parsedPath,r=i.objectName,o=i.propertyName,s=i.propertyIndex;if(t||(t=n.findNode(this.rootNode,i.nodeName),this.node=t),this.getValue=this._getValue_unavailable,this.setValue=this._setValue_unavailable,!t){ke("PropertyBinding: No target node found for track: "+this.path+".");return}if(r){let u=i.objectIndex;switch(r){case"materials":if(!t.material){Fe("PropertyBinding: Can not bind to material as node does not have a material.",this);return}if(!t.material.materials){Fe("PropertyBinding: Can not bind to material.materials as node.material does not have a materials array.",this);return}t=t.material.materials;break;case"bones":if(!t.skeleton){Fe("PropertyBinding: Can not bind to bones as node does not have a skeleton.",this);return}t=t.skeleton.bones;for(let d=0;d<t.length;d++)if(t[d].name===u){u=d;break}break;case"map":if("map"in t){t=t.map;break}if(!t.material){Fe("PropertyBinding: Can not bind to material as node does not have a material.",this);return}if(!t.material.map){Fe("PropertyBinding: Can not bind to material.map as node.material does not have a map.",this);return}t=t.material.map;break;default:if(t[r]===void 0){Fe("PropertyBinding: Can not bind to objectName of node undefined.",this);return}t=t[r]}if(u!==void 0){if(t[u]===void 0){Fe("PropertyBinding: Trying to bind to objectIndex of objectName, but is undefined.",this,t);return}t=t[u]}}let a=t[o];if(a===void 0){let u=i.nodeName;Fe("PropertyBinding: Trying to update property for track: "+u+"."+o+" but it wasn't found.",t);return}let c=this.Versioning.None;this.targetObject=t,t.isMaterial===!0?c=this.Versioning.NeedsUpdate:t.isObject3D===!0&&(c=this.Versioning.MatrixWorldNeedsUpdate);let l=this.BindingType.Direct;if(s!==void 0){if(o==="morphTargetInfluences"){if(!t.geometry){Fe("PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.",this);return}if(!t.geometry.morphAttributes){Fe("PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.morphAttributes.",this);return}t.morphTargetDictionary[s]!==void 0&&(s=t.morphTargetDictionary[s])}l=this.BindingType.ArrayElement,this.resolvedProperty=a,this.propertyIndex=s}else a.fromArray!==void 0&&a.toArray!==void 0?(l=this.BindingType.HasFromToArray,this.resolvedProperty=a):Array.isArray(a)?(l=this.BindingType.EntireArray,this.resolvedProperty=a):this.propertyName=o;this.getValue=this.GetterByBindingType[l],this.setValue=this.SetterByBindingTypeAndVersioning[l][c]}unbind(){this.node=null,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}}return n.Composite=Hy,n})();Gt.prototype.BindingType={Direct:0,EntireArray:1,ArrayElement:2,HasFromToArray:3};Gt.prototype.Versioning={None:0,NeedsUpdate:1,MatrixWorldNeedsUpdate:2};Gt.prototype.GetterByBindingType=[Gt.prototype._getValue_direct,Gt.prototype._getValue_array,Gt.prototype._getValue_arrayElement,Gt.prototype._getValue_toArray];Gt.prototype.SetterByBindingTypeAndVersioning=[[Gt.prototype._setValue_direct,Gt.prototype._setValue_direct_setNeedsUpdate,Gt.prototype._setValue_direct_setMatrixWorldNeedsUpdate],[Gt.prototype._setValue_array,Gt.prototype._setValue_array_setNeedsUpdate,Gt.prototype._setValue_array_setMatrixWorldNeedsUpdate],[Gt.prototype._setValue_arrayElement,Gt.prototype._setValue_arrayElement_setNeedsUpdate,Gt.prototype._setValue_arrayElement_setMatrixWorldNeedsUpdate],[Gt.prototype._setValue_fromArray,Gt.prototype._setValue_fromArray_setNeedsUpdate,Gt.prototype._setValue_fromArray_setMatrixWorldNeedsUpdate]];var x7=new Float32Array(1);var hE=new Ot,Ba=class{constructor(e,t,i=0,r=1/0){this.ray=new Na(e,t),this.near=i,this.far=r,this.camera=null,this.layers=new Aa,this.params={Mesh:{},Line:{threshold:1},LOD:{},Points:{threshold:1},Sprite:{}}}set(e,t){this.ray.set(e,t)}setFromCamera(e,t){t.isPerspectiveCamera?(this.ray.origin.setFromMatrixPosition(t.matrixWorld),this.ray.direction.set(e.x,e.y,.5).unproject(t).sub(this.ray.origin).normalize(),this.camera=t):t.isOrthographicCamera?(this.ray.origin.set(e.x,e.y,(t.near+t.far)/(t.near-t.far)).unproject(t),this.ray.direction.set(0,0,-1).transformDirection(t.matrixWorld),this.camera=t):Fe("Raycaster: Unsupported camera type: "+t.type)}setFromXRController(e){return hE.identity().extractRotation(e.matrixWorld),this.ray.origin.setFromMatrixPosition(e.matrixWorld),this.ray.direction.set(0,0,-1).applyMatrix4(hE),this}intersectObject(e,t=!0,i=[]){return zy(e,this,i,t),i.sort(pE),i}intersectObjects(e,t=!0,i=[]){for(let r=0,o=e.length;r<o;r++)zy(e[r],this,i,t);return i.sort(pE),i}};function pE(n,e){return n.distance-e.distance}function zy(n,e,t,i){let r=!0;if(n.layers.test(e.layers)&&n.raycast(e,t)===!1&&(r=!1),r===!0&&i===!0){let o=n.children;for(let s=0,a=o.length;s<a;s++)zy(o[s],e,t,!0)}}function p0(n,e,t,i){let r=YN(i);switch(t){case o0:return n*e;case a0:return n*e/r.components*r.byteLength;case Nh:return n*e/r.components*r.byteLength;case fs:return n*e*2/r.components*r.byteLength;case Ph:return n*e*2/r.components*r.byteLength;case s0:return n*e*3/r.components*r.byteLength;case _i:return n*e*4/r.components*r.byteLength;case Oh:return n*e*4/r.components*r.byteLength;case Ol:case Ll:return Math.floor((n+3)/4)*Math.floor((e+3)/4)*8;case Fl:case kl:return Math.floor((n+3)/4)*Math.floor((e+3)/4)*16;case Fh:case Uh:return Math.max(n,16)*Math.max(e,8)/4;case Lh:case kh:return Math.max(n,8)*Math.max(e,8)/2;case Bh:case Vh:case zh:case Gh:return Math.floor((n+3)/4)*Math.floor((e+3)/4)*8;case Hh:case jh:case Wh:return Math.floor((n+3)/4)*Math.floor((e+3)/4)*16;case $h:return Math.floor((n+3)/4)*Math.floor((e+3)/4)*16;case qh:return Math.floor((n+4)/5)*Math.floor((e+3)/4)*16;case Xh:return Math.floor((n+4)/5)*Math.floor((e+4)/5)*16;case Yh:return Math.floor((n+5)/6)*Math.floor((e+4)/5)*16;case Zh:return Math.floor((n+5)/6)*Math.floor((e+5)/6)*16;case Jh:return Math.floor((n+7)/8)*Math.floor((e+4)/5)*16;case Kh:return Math.floor((n+7)/8)*Math.floor((e+5)/6)*16;case Qh:return Math.floor((n+7)/8)*Math.floor((e+7)/8)*16;case ep:return Math.floor((n+9)/10)*Math.floor((e+4)/5)*16;case tp:return Math.floor((n+9)/10)*Math.floor((e+5)/6)*16;case np:return Math.floor((n+9)/10)*Math.floor((e+7)/8)*16;case ip:return Math.floor((n+9)/10)*Math.floor((e+9)/10)*16;case rp:return Math.floor((n+11)/12)*Math.floor((e+9)/10)*16;case op:return Math.floor((n+11)/12)*Math.floor((e+11)/12)*16;case sp:case ap:case cp:return Math.ceil(n/4)*Math.ceil(e/4)*16;case lp:case up:return Math.ceil(n/4)*Math.ceil(e/4)*8;case dp:case fp:return Math.ceil(n/4)*Math.ceil(e/4)*16}throw new Error(`Unable to determine texture byte length for ${t} format.`)}function YN(n){switch(n){case qn:case t0:return{byteLength:1,components:1};case Ha:case n0:case er:return{byteLength:2,components:1};case Ah:case Rh:return{byteLength:2,components:4};case Bi:case Ih:case Vi:return{byteLength:4,components:1};case i0:case r0:return{byteLength:4,components:3}}throw new Error(`Unknown texture type ${n}.`)}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:"183"}}));typeof window<"u"&&(window.__THREE__?ke("WARNING: Multiple instances of Three.js being imported."):window.__THREE__="183");function bw(){let n=null,e=!1,t=null,i=null;function r(o,s){t(o,s),i=n.requestAnimationFrame(r)}return{start:function(){e!==!0&&t!==null&&(i=n.requestAnimationFrame(r),e=!0)},stop:function(){n.cancelAnimationFrame(i),e=!1},setAnimationLoop:function(o){t=o},setContext:function(o){n=o}}}function JN(n){let e=new WeakMap;function t(a,c){let l=a.array,u=a.usage,d=l.byteLength,f=n.createBuffer();n.bindBuffer(c,f),n.bufferData(c,l,u),a.onUploadCallback();let h;if(l instanceof Float32Array)h=n.FLOAT;else if(typeof Float16Array<"u"&&l instanceof Float16Array)h=n.HALF_FLOAT;else if(l instanceof Uint16Array)a.isFloat16BufferAttribute?h=n.HALF_FLOAT:h=n.UNSIGNED_SHORT;else if(l instanceof Int16Array)h=n.SHORT;else if(l instanceof Uint32Array)h=n.UNSIGNED_INT;else if(l instanceof Int32Array)h=n.INT;else if(l instanceof Int8Array)h=n.BYTE;else if(l instanceof Uint8Array)h=n.UNSIGNED_BYTE;else if(l instanceof Uint8ClampedArray)h=n.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+l);return{buffer:f,type:h,bytesPerElement:l.BYTES_PER_ELEMENT,version:a.version,size:d}}function i(a,c,l){let u=c.array,d=c.updateRanges;if(n.bindBuffer(l,a),d.length===0)n.bufferSubData(l,0,u);else{d.sort((h,g)=>h.start-g.start);let f=0;for(let h=1;h<d.length;h++){let g=d[f],_=d[h];_.start<=g.start+g.count+1?g.count=Math.max(g.count,_.start+_.count-g.start):(++f,d[f]=_)}d.length=f+1;for(let h=0,g=d.length;h<g;h++){let _=d[h];n.bufferSubData(l,_.start*u.BYTES_PER_ELEMENT,u,_.start,_.count)}c.clearUpdateRanges()}c.onUploadCallback()}function r(a){return a.isInterleavedBufferAttribute&&(a=a.data),e.get(a)}function o(a){a.isInterleavedBufferAttribute&&(a=a.data);let c=e.get(a);c&&(n.deleteBuffer(c.buffer),e.delete(a))}function s(a,c){if(a.isInterleavedBufferAttribute&&(a=a.data),a.isGLBufferAttribute){let u=e.get(a);(!u||u.version<a.version)&&e.set(a,{buffer:a.buffer,type:a.type,bytesPerElement:a.elementSize,version:a.version});return}let l=e.get(a);if(l===void 0)e.set(a,t(a,c));else if(l.version<a.version){if(l.size!==a.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");i(l.buffer,a,c),l.version=a.version}}return{get:r,remove:o,update:s}}var KN=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,QN=`#ifdef USE_ALPHAHASH
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
#endif`,eP=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,tP=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,nP=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,iP=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,rP=`#ifdef USE_AOMAP
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
#endif`,oP=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,sP=`#ifdef USE_BATCHING
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
#endif`,aP=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,cP=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,lP=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,uP=`float G_BlinnPhong_Implicit( ) {
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
} // validated`,dP=`#ifdef USE_IRIDESCENCE
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
#endif`,fP=`#ifdef USE_BUMPMAP
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
#endif`,hP=`#if NUM_CLIPPING_PLANES > 0
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
#endif`,pP=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,mP=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,gP=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,vP=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#endif`,yP=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#endif`,_P=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec4 vColor;
#endif`,xP=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
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
#endif`,bP=`#define PI 3.141592653589793
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
} // validated`,MP=`#ifdef ENVMAP_TYPE_CUBE_UV
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
#endif`,SP=`vec3 transformedNormal = objectNormal;
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
#endif`,EP=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,wP=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,CP=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE
		emissiveColor = sRGBTransferEOTF( emissiveColor );
	#endif
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,TP=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,DP="gl_FragColor = linearToOutputTexel( gl_FragColor );",IP=`vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferEOTF( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,AP=`#ifdef USE_ENVMAP
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
#endif`,RP=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform float flipEnvMap;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
#endif`,NP=`#ifdef USE_ENVMAP
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
#endif`,PP=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,OP=`#ifdef USE_ENVMAP
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
#endif`,LP=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,FP=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,kP=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,UP=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,BP=`#ifdef USE_GRADIENTMAP
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
}`,VP=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,HP=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,zP=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,GP=`uniform bool receiveShadow;
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
#endif`,jP=`#ifdef USE_ENVMAP
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
#endif`,WP=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,$P=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,qP=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,XP=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,YP=`PhysicalMaterial material;
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
#endif`,ZP=`uniform sampler2D dfgLUT;
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
}`,JP=`
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
#endif`,KP=`#if defined( RE_IndirectDiffuse )
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
#endif`,QP=`#if defined( RE_IndirectDiffuse )
	#if defined( LAMBERT ) || defined( PHONG )
		irradiance += iblIrradiance;
	#endif
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,eO=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,tO=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,nO=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,iO=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,rO=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,oO=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,sO=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
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
#endif`,aO=`#if defined( USE_POINTS_UV )
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
#endif`,cO=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,lO=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,uO=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,dO=`#if defined( USE_MORPHCOLORS )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,fO=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,hO=`#ifdef USE_MORPHTARGETS
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
#endif`,pO=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,mO=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
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
vec3 nonPerturbedNormal = normal;`,gO=`#ifdef USE_NORMALMAP_OBJECTSPACE
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
#endif`,vO=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,yO=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,_O=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
	#endif
#endif`,xO=`#ifdef USE_NORMALMAP
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
#endif`,bO=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,MO=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,SO=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,EO=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,wO=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,CO=`vec3 packNormalToRGB( const in vec3 normal ) {
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
}`,TO=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,DO=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,IO=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,AO=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,RO=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,NO=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,PO=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,OO=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,LO=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
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
#endif`,FO=`float getShadowMask() {
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
}`,kO=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,UO=`#ifdef USE_SKINNING
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
#endif`,BO=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,VO=`#ifdef USE_SKINNING
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
#endif`,HO=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,zO=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,GO=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,jO=`#ifndef saturate
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
vec3 CustomToneMapping( vec3 color ) { return color; }`,WO=`#ifdef USE_TRANSMISSION
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
#endif`,$O=`#ifdef USE_TRANSMISSION
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
#endif`,qO=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,XO=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,YO=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,ZO=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`,JO=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,KO=`uniform sampler2D t2D;
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
}`,QO=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,eL=`#ifdef ENVMAP_TYPE_CUBE
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
}`,tL=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,nL=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,iL=`#include <common>
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
}`,rL=`#if DEPTH_PACKING == 3200
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
}`,oL=`#define DISTANCE
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
}`,sL=`#define DISTANCE
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
}`,aL=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,cL=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,lL=`uniform float scale;
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
}`,uL=`uniform vec3 diffuse;
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
}`,dL=`#include <common>
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
}`,fL=`uniform vec3 diffuse;
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
}`,hL=`#define LAMBERT
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
}`,pL=`#define LAMBERT
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
}`,mL=`#define MATCAP
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
}`,gL=`#define MATCAP
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
}`,vL=`#define NORMAL
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
}`,yL=`#define NORMAL
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
}`,_L=`#define PHONG
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
}`,xL=`#define PHONG
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
}`,bL=`#define STANDARD
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
}`,ML=`#define STANDARD
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
}`,SL=`#define TOON
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
}`,EL=`#define TOON
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
}`,wL=`uniform float size;
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
}`,CL=`uniform vec3 diffuse;
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
}`,TL=`#include <common>
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
}`,DL=`uniform vec3 color;
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
}`,IL=`uniform float rotation;
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
}`,AL=`uniform vec3 diffuse;
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
}`,Ze={alphahash_fragment:KN,alphahash_pars_fragment:QN,alphamap_fragment:eP,alphamap_pars_fragment:tP,alphatest_fragment:nP,alphatest_pars_fragment:iP,aomap_fragment:rP,aomap_pars_fragment:oP,batching_pars_vertex:sP,batching_vertex:aP,begin_vertex:cP,beginnormal_vertex:lP,bsdfs:uP,iridescence_fragment:dP,bumpmap_pars_fragment:fP,clipping_planes_fragment:hP,clipping_planes_pars_fragment:pP,clipping_planes_pars_vertex:mP,clipping_planes_vertex:gP,color_fragment:vP,color_pars_fragment:yP,color_pars_vertex:_P,color_vertex:xP,common:bP,cube_uv_reflection_fragment:MP,defaultnormal_vertex:SP,displacementmap_pars_vertex:EP,displacementmap_vertex:wP,emissivemap_fragment:CP,emissivemap_pars_fragment:TP,colorspace_fragment:DP,colorspace_pars_fragment:IP,envmap_fragment:AP,envmap_common_pars_fragment:RP,envmap_pars_fragment:NP,envmap_pars_vertex:PP,envmap_physical_pars_fragment:jP,envmap_vertex:OP,fog_vertex:LP,fog_pars_vertex:FP,fog_fragment:kP,fog_pars_fragment:UP,gradientmap_pars_fragment:BP,lightmap_pars_fragment:VP,lights_lambert_fragment:HP,lights_lambert_pars_fragment:zP,lights_pars_begin:GP,lights_toon_fragment:WP,lights_toon_pars_fragment:$P,lights_phong_fragment:qP,lights_phong_pars_fragment:XP,lights_physical_fragment:YP,lights_physical_pars_fragment:ZP,lights_fragment_begin:JP,lights_fragment_maps:KP,lights_fragment_end:QP,logdepthbuf_fragment:eO,logdepthbuf_pars_fragment:tO,logdepthbuf_pars_vertex:nO,logdepthbuf_vertex:iO,map_fragment:rO,map_pars_fragment:oO,map_particle_fragment:sO,map_particle_pars_fragment:aO,metalnessmap_fragment:cO,metalnessmap_pars_fragment:lO,morphinstance_vertex:uO,morphcolor_vertex:dO,morphnormal_vertex:fO,morphtarget_pars_vertex:hO,morphtarget_vertex:pO,normal_fragment_begin:mO,normal_fragment_maps:gO,normal_pars_fragment:vO,normal_pars_vertex:yO,normal_vertex:_O,normalmap_pars_fragment:xO,clearcoat_normal_fragment_begin:bO,clearcoat_normal_fragment_maps:MO,clearcoat_pars_fragment:SO,iridescence_pars_fragment:EO,opaque_fragment:wO,packing:CO,premultiplied_alpha_fragment:TO,project_vertex:DO,dithering_fragment:IO,dithering_pars_fragment:AO,roughnessmap_fragment:RO,roughnessmap_pars_fragment:NO,shadowmap_pars_fragment:PO,shadowmap_pars_vertex:OO,shadowmap_vertex:LO,shadowmask_pars_fragment:FO,skinbase_vertex:kO,skinning_pars_vertex:UO,skinning_vertex:BO,skinnormal_vertex:VO,specularmap_fragment:HO,specularmap_pars_fragment:zO,tonemapping_fragment:GO,tonemapping_pars_fragment:jO,transmission_fragment:WO,transmission_pars_fragment:$O,uv_pars_fragment:qO,uv_pars_vertex:XO,uv_vertex:YO,worldpos_vertex:ZO,background_vert:JO,background_frag:KO,backgroundCube_vert:QO,backgroundCube_frag:eL,cube_vert:tL,cube_frag:nL,depth_vert:iL,depth_frag:rL,distance_vert:oL,distance_frag:sL,equirect_vert:aL,equirect_frag:cL,linedashed_vert:lL,linedashed_frag:uL,meshbasic_vert:dL,meshbasic_frag:fL,meshlambert_vert:hL,meshlambert_frag:pL,meshmatcap_vert:mL,meshmatcap_frag:gL,meshnormal_vert:vL,meshnormal_frag:yL,meshphong_vert:_L,meshphong_frag:xL,meshphysical_vert:bL,meshphysical_frag:ML,meshtoon_vert:SL,meshtoon_frag:EL,points_vert:wL,points_frag:CL,shadow_vert:TL,shadow_frag:DL,sprite_vert:IL,sprite_frag:AL},le={common:{diffuse:{value:new st(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new qe},alphaMap:{value:null},alphaMapTransform:{value:new qe},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new qe}},envmap:{envMap:{value:null},envMapRotation:{value:new qe},flipEnvMap:{value:-1},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98},dfgLUT:{value:null}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new qe}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new qe}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new qe},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new qe},normalScale:{value:new ot(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new qe},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new qe}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new qe}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new qe}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new st(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null}},points:{diffuse:{value:new st(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new qe},alphaTest:{value:0},uvTransform:{value:new qe}},sprite:{diffuse:{value:new st(16777215)},opacity:{value:1},center:{value:new ot(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new qe},alphaMap:{value:null},alphaMapTransform:{value:new qe},alphaTest:{value:0}}},nr={basic:{uniforms:Cn([le.common,le.specularmap,le.envmap,le.aomap,le.lightmap,le.fog]),vertexShader:Ze.meshbasic_vert,fragmentShader:Ze.meshbasic_frag},lambert:{uniforms:Cn([le.common,le.specularmap,le.envmap,le.aomap,le.lightmap,le.emissivemap,le.bumpmap,le.normalmap,le.displacementmap,le.fog,le.lights,{emissive:{value:new st(0)},envMapIntensity:{value:1}}]),vertexShader:Ze.meshlambert_vert,fragmentShader:Ze.meshlambert_frag},phong:{uniforms:Cn([le.common,le.specularmap,le.envmap,le.aomap,le.lightmap,le.emissivemap,le.bumpmap,le.normalmap,le.displacementmap,le.fog,le.lights,{emissive:{value:new st(0)},specular:{value:new st(1118481)},shininess:{value:30},envMapIntensity:{value:1}}]),vertexShader:Ze.meshphong_vert,fragmentShader:Ze.meshphong_frag},standard:{uniforms:Cn([le.common,le.envmap,le.aomap,le.lightmap,le.emissivemap,le.bumpmap,le.normalmap,le.displacementmap,le.roughnessmap,le.metalnessmap,le.fog,le.lights,{emissive:{value:new st(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:Ze.meshphysical_vert,fragmentShader:Ze.meshphysical_frag},toon:{uniforms:Cn([le.common,le.aomap,le.lightmap,le.emissivemap,le.bumpmap,le.normalmap,le.displacementmap,le.gradientmap,le.fog,le.lights,{emissive:{value:new st(0)}}]),vertexShader:Ze.meshtoon_vert,fragmentShader:Ze.meshtoon_frag},matcap:{uniforms:Cn([le.common,le.bumpmap,le.normalmap,le.displacementmap,le.fog,{matcap:{value:null}}]),vertexShader:Ze.meshmatcap_vert,fragmentShader:Ze.meshmatcap_frag},points:{uniforms:Cn([le.points,le.fog]),vertexShader:Ze.points_vert,fragmentShader:Ze.points_frag},dashed:{uniforms:Cn([le.common,le.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:Ze.linedashed_vert,fragmentShader:Ze.linedashed_frag},depth:{uniforms:Cn([le.common,le.displacementmap]),vertexShader:Ze.depth_vert,fragmentShader:Ze.depth_frag},normal:{uniforms:Cn([le.common,le.bumpmap,le.normalmap,le.displacementmap,{opacity:{value:1}}]),vertexShader:Ze.meshnormal_vert,fragmentShader:Ze.meshnormal_frag},sprite:{uniforms:Cn([le.sprite,le.fog]),vertexShader:Ze.sprite_vert,fragmentShader:Ze.sprite_frag},background:{uniforms:{uvTransform:{value:new qe},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:Ze.background_vert,fragmentShader:Ze.background_frag},backgroundCube:{uniforms:{envMap:{value:null},flipEnvMap:{value:-1},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new qe}},vertexShader:Ze.backgroundCube_vert,fragmentShader:Ze.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:Ze.cube_vert,fragmentShader:Ze.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:Ze.equirect_vert,fragmentShader:Ze.equirect_frag},distance:{uniforms:Cn([le.common,le.displacementmap,{referencePosition:{value:new O},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:Ze.distance_vert,fragmentShader:Ze.distance_frag},shadow:{uniforms:Cn([le.lights,le.fog,{color:{value:new st(0)},opacity:{value:1}}]),vertexShader:Ze.shadow_vert,fragmentShader:Ze.shadow_frag}};nr.physical={uniforms:Cn([nr.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new qe},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new qe},clearcoatNormalScale:{value:new ot(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new qe},dispersion:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new qe},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new qe},sheen:{value:0},sheenColor:{value:new st(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new qe},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new qe},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new qe},transmissionSamplerSize:{value:new ot},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new qe},attenuationDistance:{value:0},attenuationColor:{value:new st(0)},specularColor:{value:new st(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new qe},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new qe},anisotropyVector:{value:new ot},anisotropyMap:{value:null},anisotropyMapTransform:{value:new qe}}]),vertexShader:Ze.meshphysical_vert,fragmentShader:Ze.meshphysical_frag};var mp={r:0,b:0,g:0},ps=new uo,RL=new Ot;function NL(n,e,t,i,r,o){let s=new st(0),a=r===!0?0:1,c,l,u=null,d=0,f=null;function h(b){let w=b.isScene===!0?b.background:null;if(w&&w.isTexture){let S=b.backgroundBlurriness>0;w=e.get(w,S)}return w}function g(b){let w=!1,S=h(b);S===null?m(s,a):S&&S.isColor&&(m(S,1),w=!0);let D=n.xr.getEnvironmentBlendMode();D==="additive"?t.buffers.color.setClear(0,0,0,1,o):D==="alpha-blend"&&t.buffers.color.setClear(0,0,0,0,o),(n.autoClear||w)&&(t.buffers.depth.setTest(!0),t.buffers.depth.setMask(!0),t.buffers.color.setMask(!0),n.clear(n.autoClearColor,n.autoClearDepth,n.autoClearStencil))}function _(b,w){let S=h(w);S&&(S.isCubeTexture||S.mapping===Nl)?(l===void 0&&(l=new un(new La(1,1,1),new oi({name:"BackgroundCubeMaterial",uniforms:hs(nr.backgroundCube.uniforms),vertexShader:nr.backgroundCube.vertexShader,fragmentShader:nr.backgroundCube.fragmentShader,side:Un,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),l.geometry.deleteAttribute("normal"),l.geometry.deleteAttribute("uv"),l.onBeforeRender=function(D,C,A){this.matrixWorld.copyPosition(A.matrixWorld)},Object.defineProperty(l.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),i.update(l)),ps.copy(w.backgroundRotation),ps.x*=-1,ps.y*=-1,ps.z*=-1,S.isCubeTexture&&S.isRenderTargetTexture===!1&&(ps.y*=-1,ps.z*=-1),l.material.uniforms.envMap.value=S,l.material.uniforms.flipEnvMap.value=S.isCubeTexture&&S.isRenderTargetTexture===!1?-1:1,l.material.uniforms.backgroundBlurriness.value=w.backgroundBlurriness,l.material.uniforms.backgroundIntensity.value=w.backgroundIntensity,l.material.uniforms.backgroundRotation.value.setFromMatrix4(RL.makeRotationFromEuler(ps)),l.material.toneMapped=at.getTransfer(S.colorSpace)!==_t,(u!==S||d!==S.version||f!==n.toneMapping)&&(l.material.needsUpdate=!0,u=S,d=S.version,f=n.toneMapping),l.layers.enableAll(),b.unshift(l,l.geometry,l.material,0,0,null)):S&&S.isTexture&&(c===void 0&&(c=new un(new El(2,2),new oi({name:"BackgroundMaterial",uniforms:hs(nr.background.uniforms),vertexShader:nr.background.vertexShader,fragmentShader:nr.background.fragmentShader,side:Tr,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),c.geometry.deleteAttribute("normal"),Object.defineProperty(c.material,"map",{get:function(){return this.uniforms.t2D.value}}),i.update(c)),c.material.uniforms.t2D.value=S,c.material.uniforms.backgroundIntensity.value=w.backgroundIntensity,c.material.toneMapped=at.getTransfer(S.colorSpace)!==_t,S.matrixAutoUpdate===!0&&S.updateMatrix(),c.material.uniforms.uvTransform.value.copy(S.matrix),(u!==S||d!==S.version||f!==n.toneMapping)&&(c.material.needsUpdate=!0,u=S,d=S.version,f=n.toneMapping),c.layers.enableAll(),b.unshift(c,c.geometry,c.material,0,0,null))}function m(b,w){b.getRGB(mp,d0(n)),t.buffers.color.setClear(mp.r,mp.g,mp.b,w,o)}function p(){l!==void 0&&(l.geometry.dispose(),l.material.dispose(),l=void 0),c!==void 0&&(c.geometry.dispose(),c.material.dispose(),c=void 0)}return{getClearColor:function(){return s},setClearColor:function(b,w=1){s.set(b),a=w,m(s,a)},getClearAlpha:function(){return a},setClearAlpha:function(b){a=b,m(s,a)},render:g,addToRenderList:_,dispose:p}}function PL(n,e){let t=n.getParameter(n.MAX_VERTEX_ATTRIBS),i={},r=f(null),o=r,s=!1;function a(T,L,k,G,B){let H=!1,F=d(T,G,k,L);o!==F&&(o=F,l(o.object)),H=h(T,G,k,B),H&&g(T,G,k,B),B!==null&&e.update(B,n.ELEMENT_ARRAY_BUFFER),(H||s)&&(s=!1,S(T,L,k,G),B!==null&&n.bindBuffer(n.ELEMENT_ARRAY_BUFFER,e.get(B).buffer))}function c(){return n.createVertexArray()}function l(T){return n.bindVertexArray(T)}function u(T){return n.deleteVertexArray(T)}function d(T,L,k,G){let B=G.wireframe===!0,H=i[L.id];H===void 0&&(H={},i[L.id]=H);let F=T.isInstancedMesh===!0?T.id:0,ee=H[F];ee===void 0&&(ee={},H[F]=ee);let Z=ee[k.id];Z===void 0&&(Z={},ee[k.id]=Z);let he=Z[B];return he===void 0&&(he=f(c()),Z[B]=he),he}function f(T){let L=[],k=[],G=[];for(let B=0;B<t;B++)L[B]=0,k[B]=0,G[B]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:L,enabledAttributes:k,attributeDivisors:G,object:T,attributes:{},index:null}}function h(T,L,k,G){let B=o.attributes,H=L.attributes,F=0,ee=k.getAttributes();for(let Z in ee)if(ee[Z].location>=0){let xe=B[Z],me=H[Z];if(me===void 0&&(Z==="instanceMatrix"&&T.instanceMatrix&&(me=T.instanceMatrix),Z==="instanceColor"&&T.instanceColor&&(me=T.instanceColor)),xe===void 0||xe.attribute!==me||me&&xe.data!==me.data)return!0;F++}return o.attributesNum!==F||o.index!==G}function g(T,L,k,G){let B={},H=L.attributes,F=0,ee=k.getAttributes();for(let Z in ee)if(ee[Z].location>=0){let xe=H[Z];xe===void 0&&(Z==="instanceMatrix"&&T.instanceMatrix&&(xe=T.instanceMatrix),Z==="instanceColor"&&T.instanceColor&&(xe=T.instanceColor));let me={};me.attribute=xe,xe&&xe.data&&(me.data=xe.data),B[Z]=me,F++}o.attributes=B,o.attributesNum=F,o.index=G}function _(){let T=o.newAttributes;for(let L=0,k=T.length;L<k;L++)T[L]=0}function m(T){p(T,0)}function p(T,L){let k=o.newAttributes,G=o.enabledAttributes,B=o.attributeDivisors;k[T]=1,G[T]===0&&(n.enableVertexAttribArray(T),G[T]=1),B[T]!==L&&(n.vertexAttribDivisor(T,L),B[T]=L)}function b(){let T=o.newAttributes,L=o.enabledAttributes;for(let k=0,G=L.length;k<G;k++)L[k]!==T[k]&&(n.disableVertexAttribArray(k),L[k]=0)}function w(T,L,k,G,B,H,F){F===!0?n.vertexAttribIPointer(T,L,k,B,H):n.vertexAttribPointer(T,L,k,G,B,H)}function S(T,L,k,G){_();let B=G.attributes,H=k.getAttributes(),F=L.defaultAttributeValues;for(let ee in H){let Z=H[ee];if(Z.location>=0){let he=B[ee];if(he===void 0&&(ee==="instanceMatrix"&&T.instanceMatrix&&(he=T.instanceMatrix),ee==="instanceColor"&&T.instanceColor&&(he=T.instanceColor)),he!==void 0){let xe=he.normalized,me=he.itemSize,Ye=e.get(he);if(Ye===void 0)continue;let Ft=Ye.buffer,Lt=Ye.type,X=Ye.bytesPerElement,ie=Lt===n.INT||Lt===n.UNSIGNED_INT||he.gpuType===Ih;if(he.isInterleavedBufferAttribute){let se=he.data,Xe=se.stride,Oe=he.offset;if(se.isInstancedInterleavedBuffer){for(let Ve=0;Ve<Z.locationSize;Ve++)p(Z.location+Ve,se.meshPerAttribute);T.isInstancedMesh!==!0&&G._maxInstanceCount===void 0&&(G._maxInstanceCount=se.meshPerAttribute*se.count)}else for(let Ve=0;Ve<Z.locationSize;Ve++)m(Z.location+Ve);n.bindBuffer(n.ARRAY_BUFFER,Ft);for(let Ve=0;Ve<Z.locationSize;Ve++)w(Z.location+Ve,me/Z.locationSize,Lt,xe,Xe*X,(Oe+me/Z.locationSize*Ve)*X,ie)}else{if(he.isInstancedBufferAttribute){for(let se=0;se<Z.locationSize;se++)p(Z.location+se,he.meshPerAttribute);T.isInstancedMesh!==!0&&G._maxInstanceCount===void 0&&(G._maxInstanceCount=he.meshPerAttribute*he.count)}else for(let se=0;se<Z.locationSize;se++)m(Z.location+se);n.bindBuffer(n.ARRAY_BUFFER,Ft);for(let se=0;se<Z.locationSize;se++)w(Z.location+se,me/Z.locationSize,Lt,xe,me*X,me/Z.locationSize*se*X,ie)}}else if(F!==void 0){let xe=F[ee];if(xe!==void 0)switch(xe.length){case 2:n.vertexAttrib2fv(Z.location,xe);break;case 3:n.vertexAttrib3fv(Z.location,xe);break;case 4:n.vertexAttrib4fv(Z.location,xe);break;default:n.vertexAttrib1fv(Z.location,xe)}}}}b()}function D(){M();for(let T in i){let L=i[T];for(let k in L){let G=L[k];for(let B in G){let H=G[B];for(let F in H)u(H[F].object),delete H[F];delete G[B]}}delete i[T]}}function C(T){if(i[T.id]===void 0)return;let L=i[T.id];for(let k in L){let G=L[k];for(let B in G){let H=G[B];for(let F in H)u(H[F].object),delete H[F];delete G[B]}}delete i[T.id]}function A(T){for(let L in i){let k=i[L];for(let G in k){let B=k[G];if(B[T.id]===void 0)continue;let H=B[T.id];for(let F in H)u(H[F].object),delete H[F];delete B[T.id]}}}function y(T){for(let L in i){let k=i[L],G=T.isInstancedMesh===!0?T.id:0,B=k[G];if(B!==void 0){for(let H in B){let F=B[H];for(let ee in F)u(F[ee].object),delete F[ee];delete B[H]}delete k[G],Object.keys(k).length===0&&delete i[L]}}}function M(){j(),s=!0,o!==r&&(o=r,l(o.object))}function j(){r.geometry=null,r.program=null,r.wireframe=!1}return{setup:a,reset:M,resetDefaultState:j,dispose:D,releaseStatesOfGeometry:C,releaseStatesOfObject:y,releaseStatesOfProgram:A,initAttributes:_,enableAttribute:m,disableUnusedAttributes:b}}function OL(n,e,t){let i;function r(l){i=l}function o(l,u){n.drawArrays(i,l,u),t.update(u,i,1)}function s(l,u,d){d!==0&&(n.drawArraysInstanced(i,l,u,d),t.update(u,i,d))}function a(l,u,d){if(d===0)return;e.get("WEBGL_multi_draw").multiDrawArraysWEBGL(i,l,0,u,0,d);let h=0;for(let g=0;g<d;g++)h+=u[g];t.update(h,i,1)}function c(l,u,d,f){if(d===0)return;let h=e.get("WEBGL_multi_draw");if(h===null)for(let g=0;g<l.length;g++)s(l[g],u[g],f[g]);else{h.multiDrawArraysInstancedWEBGL(i,l,0,u,0,f,0,d);let g=0;for(let _=0;_<d;_++)g+=u[_]*f[_];t.update(g,i,1)}}this.setMode=r,this.render=o,this.renderInstances=s,this.renderMultiDraw=a,this.renderMultiDrawInstances=c}function LL(n,e,t,i){let r;function o(){if(r!==void 0)return r;if(e.has("EXT_texture_filter_anisotropic")===!0){let A=e.get("EXT_texture_filter_anisotropic");r=n.getParameter(A.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else r=0;return r}function s(A){return!(A!==_i&&i.convert(A)!==n.getParameter(n.IMPLEMENTATION_COLOR_READ_FORMAT))}function a(A){let y=A===er&&(e.has("EXT_color_buffer_half_float")||e.has("EXT_color_buffer_float"));return!(A!==qn&&i.convert(A)!==n.getParameter(n.IMPLEMENTATION_COLOR_READ_TYPE)&&A!==Vi&&!y)}function c(A){if(A==="highp"){if(n.getShaderPrecisionFormat(n.VERTEX_SHADER,n.HIGH_FLOAT).precision>0&&n.getShaderPrecisionFormat(n.FRAGMENT_SHADER,n.HIGH_FLOAT).precision>0)return"highp";A="mediump"}return A==="mediump"&&n.getShaderPrecisionFormat(n.VERTEX_SHADER,n.MEDIUM_FLOAT).precision>0&&n.getShaderPrecisionFormat(n.FRAGMENT_SHADER,n.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let l=t.precision!==void 0?t.precision:"highp",u=c(l);u!==l&&(ke("WebGLRenderer:",l,"not supported, using",u,"instead."),l=u);let d=t.logarithmicDepthBuffer===!0,f=t.reversedDepthBuffer===!0&&e.has("EXT_clip_control"),h=n.getParameter(n.MAX_TEXTURE_IMAGE_UNITS),g=n.getParameter(n.MAX_VERTEX_TEXTURE_IMAGE_UNITS),_=n.getParameter(n.MAX_TEXTURE_SIZE),m=n.getParameter(n.MAX_CUBE_MAP_TEXTURE_SIZE),p=n.getParameter(n.MAX_VERTEX_ATTRIBS),b=n.getParameter(n.MAX_VERTEX_UNIFORM_VECTORS),w=n.getParameter(n.MAX_VARYING_VECTORS),S=n.getParameter(n.MAX_FRAGMENT_UNIFORM_VECTORS),D=n.getParameter(n.MAX_SAMPLES),C=n.getParameter(n.SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:o,getMaxPrecision:c,textureFormatReadable:s,textureTypeReadable:a,precision:l,logarithmicDepthBuffer:d,reversedDepthBuffer:f,maxTextures:h,maxVertexTextures:g,maxTextureSize:_,maxCubemapSize:m,maxAttributes:p,maxVertexUniforms:b,maxVaryings:w,maxFragmentUniforms:S,maxSamples:D,samples:C}}function FL(n){let e=this,t=null,i=0,r=!1,o=!1,s=new Xi,a=new qe,c={value:null,needsUpdate:!1};this.uniform=c,this.numPlanes=0,this.numIntersection=0,this.init=function(d,f){let h=d.length!==0||f||i!==0||r;return r=f,i=d.length,h},this.beginShadows=function(){o=!0,u(null)},this.endShadows=function(){o=!1},this.setGlobalState=function(d,f){t=u(d,f,0)},this.setState=function(d,f,h){let g=d.clippingPlanes,_=d.clipIntersection,m=d.clipShadows,p=n.get(d);if(!r||g===null||g.length===0||o&&!m)o?u(null):l();else{let b=o?0:i,w=b*4,S=p.clippingState||null;c.value=S,S=u(g,f,w,h);for(let D=0;D!==w;++D)S[D]=t[D];p.clippingState=S,this.numIntersection=_?this.numPlanes:0,this.numPlanes+=b}};function l(){c.value!==t&&(c.value=t,c.needsUpdate=i>0),e.numPlanes=i,e.numIntersection=0}function u(d,f,h,g){let _=d!==null?d.length:0,m=null;if(_!==0){if(m=c.value,g!==!0||m===null){let p=h+_*4,b=f.matrixWorldInverse;a.getNormalMatrix(b),(m===null||m.length<p)&&(m=new Float32Array(p));for(let w=0,S=h;w!==_;++w,S+=4)s.copy(d[w]).applyMatrix4(b,a),s.normal.toArray(m,S),m[S+3]=s.constant}c.value=m,c.needsUpdate=!0}return e.numPlanes=_,e.numIntersection=0,m}}var xo=4,QE=[.125,.215,.35,.446,.526,.582],gs=20,kL=256,Bl=new Ua,ew=new st,m0=null,g0=0,v0=0,y0=!1,UL=new O,vp=class{constructor(e){this._renderer=e,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._sizeLods=[],this._sigmas=[],this._lodMeshes=[],this._backgroundBox=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._blurMaterial=null,this._ggxMaterial=null}fromScene(e,t=0,i=.1,r=100,o={}){let{size:s=256,position:a=UL}=o;m0=this._renderer.getRenderTarget(),g0=this._renderer.getActiveCubeFace(),v0=this._renderer.getActiveMipmapLevel(),y0=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(s);let c=this._allocateTargets();return c.depthBuffer=!0,this._sceneToCubeUV(e,i,r,c,a),t>0&&this._blur(c,0,0,t),this._applyPMREM(c),this._cleanup(c),c}fromEquirectangular(e,t=null){return this._fromTexture(e,t)}fromCubemap(e,t=null){return this._fromTexture(e,t)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=iw(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=nw(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose(),this._backgroundBox!==null&&(this._backgroundBox.geometry.dispose(),this._backgroundBox.material.dispose())}_setSize(e){this._lodMax=Math.floor(Math.log2(e)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._ggxMaterial!==null&&this._ggxMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let e=0;e<this._lodMeshes.length;e++)this._lodMeshes[e].geometry.dispose()}_cleanup(e){this._renderer.setRenderTarget(m0,g0,v0),this._renderer.xr.enabled=y0,e.scissorTest=!1,Ga(e,0,0,e.width,e.height)}_fromTexture(e,t){e.mapping===vo||e.mapping===ds?this._setSize(e.image.length===0?16:e.image[0].width||e.image[0].image.width):this._setSize(e.image.width/4),m0=this._renderer.getRenderTarget(),g0=this._renderer.getActiveCubeFace(),v0=this._renderer.getActiveMipmapLevel(),y0=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;let i=t||this._allocateTargets();return this._textureToCubeUV(e,i),this._applyPMREM(i),this._cleanup(i),i}_allocateTargets(){let e=3*Math.max(this._cubeSize,112),t=4*this._cubeSize,i={magFilter:mn,minFilter:mn,generateMipmaps:!1,type:er,format:_i,colorSpace:ls,depthBuffer:!1},r=tw(e,t,i);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==e||this._pingPongRenderTarget.height!==t){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=tw(e,t,i);let{_lodMax:o}=this;({lodMeshes:this._lodMeshes,sizeLods:this._sizeLods,sigmas:this._sigmas}=BL(o)),this._blurMaterial=HL(o,e,t),this._ggxMaterial=VL(o,e,t)}return r}_compileMaterial(e){let t=new un(new wn,e);this._renderer.compile(t,Bl)}_sceneToCubeUV(e,t,i,r,o){let c=new En(90,1,t,i),l=[1,-1,1,1,1,1],u=[1,1,1,-1,-1,-1],d=this._renderer,f=d.autoClear,h=d.toneMapping;d.getClearColor(ew),d.toneMapping=Ui,d.autoClear=!1,d.state.buffers.depth.getReversed()&&(d.setRenderTarget(r),d.clearDepth(),d.setRenderTarget(null)),this._backgroundBox===null&&(this._backgroundBox=new un(new La,new Ji({name:"PMREM.Background",side:Un,depthWrite:!1,depthTest:!1})));let _=this._backgroundBox,m=_.material,p=!1,b=e.background;b?b.isColor&&(m.color.copy(b),e.background=null,p=!0):(m.color.copy(ew),p=!0);for(let w=0;w<6;w++){let S=w%3;S===0?(c.up.set(0,l[w],0),c.position.set(o.x,o.y,o.z),c.lookAt(o.x+u[w],o.y,o.z)):S===1?(c.up.set(0,0,l[w]),c.position.set(o.x,o.y,o.z),c.lookAt(o.x,o.y+u[w],o.z)):(c.up.set(0,l[w],0),c.position.set(o.x,o.y,o.z),c.lookAt(o.x,o.y,o.z+u[w]));let D=this._cubeSize;Ga(r,S*D,w>2?D:0,D,D),d.setRenderTarget(r),p&&d.render(_,c),d.render(e,c)}d.toneMapping=h,d.autoClear=f,e.background=b}_textureToCubeUV(e,t){let i=this._renderer,r=e.mapping===vo||e.mapping===ds;r?(this._cubemapMaterial===null&&(this._cubemapMaterial=iw()),this._cubemapMaterial.uniforms.flipEnvMap.value=e.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=nw());let o=r?this._cubemapMaterial:this._equirectMaterial,s=this._lodMeshes[0];s.material=o;let a=o.uniforms;a.envMap.value=e;let c=this._cubeSize;Ga(t,0,0,3*c,2*c),i.setRenderTarget(t),i.render(s,Bl)}_applyPMREM(e){let t=this._renderer,i=t.autoClear;t.autoClear=!1;let r=this._lodMeshes.length;for(let o=1;o<r;o++)this._applyGGXFilter(e,o-1,o);t.autoClear=i}_applyGGXFilter(e,t,i){let r=this._renderer,o=this._pingPongRenderTarget,s=this._ggxMaterial,a=this._lodMeshes[i];a.material=s;let c=s.uniforms,l=i/(this._lodMeshes.length-1),u=t/(this._lodMeshes.length-1),d=Math.sqrt(l*l-u*u),f=0+l*1.25,h=d*f,{_lodMax:g}=this,_=this._sizeLods[i],m=3*_*(i>g-xo?i-g+xo:0),p=4*(this._cubeSize-_);c.envMap.value=e.texture,c.roughness.value=h,c.mipInt.value=g-t,Ga(o,m,p,3*_,2*_),r.setRenderTarget(o),r.render(a,Bl),c.envMap.value=o.texture,c.roughness.value=0,c.mipInt.value=g-i,Ga(e,m,p,3*_,2*_),r.setRenderTarget(e),r.render(a,Bl)}_blur(e,t,i,r,o){let s=this._pingPongRenderTarget;this._halfBlur(e,s,t,i,r,"latitudinal",o),this._halfBlur(s,e,i,i,r,"longitudinal",o)}_halfBlur(e,t,i,r,o,s,a){let c=this._renderer,l=this._blurMaterial;s!=="latitudinal"&&s!=="longitudinal"&&Fe("blur direction must be either latitudinal or longitudinal!");let u=3,d=this._lodMeshes[r];d.material=l;let f=l.uniforms,h=this._sizeLods[i]-1,g=isFinite(o)?Math.PI/(2*h):2*Math.PI/(2*gs-1),_=o/g,m=isFinite(o)?1+Math.floor(u*_):gs;m>gs&&ke(`sigmaRadians, ${o}, is too large and will clip, as it requested ${m} samples when the maximum is set to ${gs}`);let p=[],b=0;for(let A=0;A<gs;++A){let y=A/_,M=Math.exp(-y*y/2);p.push(M),A===0?b+=M:A<m&&(b+=2*M)}for(let A=0;A<p.length;A++)p[A]=p[A]/b;f.envMap.value=e.texture,f.samples.value=m,f.weights.value=p,f.latitudinal.value=s==="latitudinal",a&&(f.poleAxis.value=a);let{_lodMax:w}=this;f.dTheta.value=g,f.mipInt.value=w-i;let S=this._sizeLods[r],D=3*S*(r>w-xo?r-w+xo:0),C=4*(this._cubeSize-S);Ga(t,D,C,3*S,2*S),c.setRenderTarget(t),c.render(d,Bl)}};function BL(n){let e=[],t=[],i=[],r=n,o=n-xo+1+QE.length;for(let s=0;s<o;s++){let a=Math.pow(2,r);e.push(a);let c=1/a;s>n-xo?c=QE[s-n+xo-1]:s===0&&(c=0),t.push(c);let l=1/(a-2),u=-l,d=1+l,f=[u,u,d,u,d,d,u,u,d,d,u,d],h=6,g=6,_=3,m=2,p=1,b=new Float32Array(_*g*h),w=new Float32Array(m*g*h),S=new Float32Array(p*g*h);for(let C=0;C<h;C++){let A=C%3*2/3-1,y=C>2?0:-1,M=[A,y,0,A+2/3,y,0,A+2/3,y+1,0,A,y,0,A+2/3,y+1,0,A,y+1,0];b.set(M,_*g*C),w.set(f,m*g*C);let j=[C,C,C,C,C,C];S.set(j,p*g*C)}let D=new wn;D.setAttribute("position",new kn(b,_)),D.setAttribute("uv",new kn(w,m)),D.setAttribute("faceIndex",new kn(S,p)),i.push(new un(D,null)),r>xo&&r--}return{lodMeshes:i,sizeLods:e,sigmas:t}}function tw(n,e,t){let i=new ri(n,e,t);return i.texture.mapping=Nl,i.texture.name="PMREM.cubeUv",i.scissorTest=!0,i}function Ga(n,e,t,i,r){n.viewport.set(e,t,i,r),n.scissor.set(e,t,i,r)}function VL(n,e,t){return new oi({name:"PMREMGGXConvolution",defines:{GGX_SAMPLES:kL,CUBEUV_TEXEL_WIDTH:1/e,CUBEUV_TEXEL_HEIGHT:1/t,CUBEUV_MAX_MIP:`${n}.0`},uniforms:{envMap:{value:null},roughness:{value:0},mipInt:{value:0}},vertexShader:xp(),fragmentShader:`

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
		`,blending:Qi,depthTest:!1,depthWrite:!1})}function HL(n,e,t){let i=new Float32Array(gs),r=new O(0,1,0);return new oi({name:"SphericalGaussianBlur",defines:{n:gs,CUBEUV_TEXEL_WIDTH:1/e,CUBEUV_TEXEL_HEIGHT:1/t,CUBEUV_MAX_MIP:`${n}.0`},uniforms:{envMap:{value:null},samples:{value:1},weights:{value:i},latitudinal:{value:!1},dTheta:{value:0},mipInt:{value:0},poleAxis:{value:r}},vertexShader:xp(),fragmentShader:`

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
		`,blending:Qi,depthTest:!1,depthWrite:!1})}function nw(){return new oi({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:xp(),fragmentShader:`

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
		`,blending:Qi,depthTest:!1,depthWrite:!1})}function iw(){return new oi({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:xp(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:Qi,depthTest:!1,depthWrite:!1})}function xp(){return`

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
	`}var yp=class extends ri{constructor(e=1,t={}){super(e,e,t),this.isWebGLCubeRenderTarget=!0;let i={width:e,height:e,depth:1},r=[i,i,i,i,i,i];this.texture=new bl(r),this._setTextureOptions(t),this.texture.isRenderTargetTexture=!0}fromEquirectangularTexture(e,t){this.texture.type=t.type,this.texture.colorSpace=t.colorSpace,this.texture.generateMipmaps=t.generateMipmaps,this.texture.minFilter=t.minFilter,this.texture.magFilter=t.magFilter;let i={uniforms:{tEquirect:{value:null}},vertexShader:`

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
			`},r=new La(5,5,5),o=new oi({name:"CubemapFromEquirect",uniforms:hs(i.uniforms),vertexShader:i.vertexShader,fragmentShader:i.fragmentShader,side:Un,blending:Qi});o.uniforms.tEquirect.value=t;let s=new un(r,o),a=t.minFilter;return t.minFilter===yo&&(t.minFilter=mn),new Eh(1,10,this).update(e,s),t.minFilter=a,s.geometry.dispose(),s.material.dispose(),this}clear(e,t=!0,i=!0,r=!0){let o=e.getRenderTarget();for(let s=0;s<6;s++)e.setRenderTarget(this,s),e.clear(t,i,r);e.setRenderTarget(o)}};function zL(n){let e=new WeakMap,t=new WeakMap,i=null;function r(f,h=!1){return f==null?null:h?s(f):o(f)}function o(f){if(f&&f.isTexture){let h=f.mapping;if(h===Ch||h===Th)if(e.has(f)){let g=e.get(f).texture;return a(g,f.mapping)}else{let g=f.image;if(g&&g.height>0){let _=new yp(g.height);return _.fromEquirectangularTexture(n,f),e.set(f,_),f.addEventListener("dispose",l),a(_.texture,f.mapping)}else return null}}return f}function s(f){if(f&&f.isTexture){let h=f.mapping,g=h===Ch||h===Th,_=h===vo||h===ds;if(g||_){let m=t.get(f),p=m!==void 0?m.texture.pmremVersion:0;if(f.isRenderTargetTexture&&f.pmremVersion!==p)return i===null&&(i=new vp(n)),m=g?i.fromEquirectangular(f,m):i.fromCubemap(f,m),m.texture.pmremVersion=f.pmremVersion,t.set(f,m),m.texture;if(m!==void 0)return m.texture;{let b=f.image;return g&&b&&b.height>0||_&&b&&c(b)?(i===null&&(i=new vp(n)),m=g?i.fromEquirectangular(f):i.fromCubemap(f),m.texture.pmremVersion=f.pmremVersion,t.set(f,m),f.addEventListener("dispose",u),m.texture):null}}}return f}function a(f,h){return h===Ch?f.mapping=vo:h===Th&&(f.mapping=ds),f}function c(f){let h=0,g=6;for(let _=0;_<g;_++)f[_]!==void 0&&h++;return h===g}function l(f){let h=f.target;h.removeEventListener("dispose",l);let g=e.get(h);g!==void 0&&(e.delete(h),g.dispose())}function u(f){let h=f.target;h.removeEventListener("dispose",u);let g=t.get(h);g!==void 0&&(t.delete(h),g.dispose())}function d(){e=new WeakMap,t=new WeakMap,i!==null&&(i.dispose(),i=null)}return{get:r,dispose:d}}function GL(n){let e={};function t(i){if(e[i]!==void 0)return e[i];let r=n.getExtension(i);return e[i]=r,r}return{has:function(i){return t(i)!==null},init:function(){t("EXT_color_buffer_float"),t("WEBGL_clip_cull_distance"),t("OES_texture_float_linear"),t("EXT_color_buffer_half_float"),t("WEBGL_multisampled_render_to_texture"),t("WEBGL_render_shared_exponent")},get:function(i){let r=t(i);return r===null&&ml("WebGLRenderer: "+i+" extension not supported."),r}}}function jL(n,e,t,i){let r={},o=new WeakMap;function s(d){let f=d.target;f.index!==null&&e.remove(f.index);for(let g in f.attributes)e.remove(f.attributes[g]);f.removeEventListener("dispose",s),delete r[f.id];let h=o.get(f);h&&(e.remove(h),o.delete(f)),i.releaseStatesOfGeometry(f),f.isInstancedBufferGeometry===!0&&delete f._maxInstanceCount,t.memory.geometries--}function a(d,f){return r[f.id]===!0||(f.addEventListener("dispose",s),r[f.id]=!0,t.memory.geometries++),f}function c(d){let f=d.attributes;for(let h in f)e.update(f[h],n.ARRAY_BUFFER)}function l(d){let f=[],h=d.index,g=d.attributes.position,_=0;if(g===void 0)return;if(h!==null){let b=h.array;_=h.version;for(let w=0,S=b.length;w<S;w+=3){let D=b[w+0],C=b[w+1],A=b[w+2];f.push(D,C,C,A,A,D)}}else{let b=g.array;_=g.version;for(let w=0,S=b.length/3-1;w<S;w+=3){let D=w+0,C=w+1,A=w+2;f.push(D,C,C,A,A,D)}}let m=new(g.count>=65535?_l:yl)(f,1);m.version=_;let p=o.get(d);p&&e.remove(p),o.set(d,m)}function u(d){let f=o.get(d);if(f){let h=d.index;h!==null&&f.version<h.version&&l(d)}else l(d);return o.get(d)}return{get:a,update:c,getWireframeAttribute:u}}function WL(n,e,t){let i;function r(f){i=f}let o,s;function a(f){o=f.type,s=f.bytesPerElement}function c(f,h){n.drawElements(i,h,o,f*s),t.update(h,i,1)}function l(f,h,g){g!==0&&(n.drawElementsInstanced(i,h,o,f*s,g),t.update(h,i,g))}function u(f,h,g){if(g===0)return;e.get("WEBGL_multi_draw").multiDrawElementsWEBGL(i,h,0,o,f,0,g);let m=0;for(let p=0;p<g;p++)m+=h[p];t.update(m,i,1)}function d(f,h,g,_){if(g===0)return;let m=e.get("WEBGL_multi_draw");if(m===null)for(let p=0;p<f.length;p++)l(f[p]/s,h[p],_[p]);else{m.multiDrawElementsInstancedWEBGL(i,h,0,o,f,0,_,0,g);let p=0;for(let b=0;b<g;b++)p+=h[b]*_[b];t.update(p,i,1)}}this.setMode=r,this.setIndex=a,this.render=c,this.renderInstances=l,this.renderMultiDraw=u,this.renderMultiDrawInstances=d}function $L(n){let e={geometries:0,textures:0},t={frame:0,calls:0,triangles:0,points:0,lines:0};function i(o,s,a){switch(t.calls++,s){case n.TRIANGLES:t.triangles+=a*(o/3);break;case n.LINES:t.lines+=a*(o/2);break;case n.LINE_STRIP:t.lines+=a*(o-1);break;case n.LINE_LOOP:t.lines+=a*o;break;case n.POINTS:t.points+=a*o;break;default:Fe("WebGLInfo: Unknown draw mode:",s);break}}function r(){t.calls=0,t.triangles=0,t.points=0,t.lines=0}return{memory:e,render:t,programs:null,autoReset:!0,reset:r,update:i}}function qL(n,e,t){let i=new WeakMap,r=new Ht;function o(s,a,c){let l=s.morphTargetInfluences,u=a.morphAttributes.position||a.morphAttributes.normal||a.morphAttributes.color,d=u!==void 0?u.length:0,f=i.get(a);if(f===void 0||f.count!==d){let j=function(){y.dispose(),i.delete(a),a.removeEventListener("dispose",j)};var h=j;f!==void 0&&f.texture.dispose();let g=a.morphAttributes.position!==void 0,_=a.morphAttributes.normal!==void 0,m=a.morphAttributes.color!==void 0,p=a.morphAttributes.position||[],b=a.morphAttributes.normal||[],w=a.morphAttributes.color||[],S=0;g===!0&&(S=1),_===!0&&(S=2),m===!0&&(S=3);let D=a.attributes.position.count*S,C=1;D>e.maxTextureSize&&(C=Math.ceil(D/e.maxTextureSize),D=e.maxTextureSize);let A=new Float32Array(D*C*4*d),y=new gl(A,D,C,d);y.type=Vi,y.needsUpdate=!0;let M=S*4;for(let T=0;T<d;T++){let L=p[T],k=b[T],G=w[T],B=D*C*4*T;for(let H=0;H<L.count;H++){let F=H*M;g===!0&&(r.fromBufferAttribute(L,H),A[B+F+0]=r.x,A[B+F+1]=r.y,A[B+F+2]=r.z,A[B+F+3]=0),_===!0&&(r.fromBufferAttribute(k,H),A[B+F+4]=r.x,A[B+F+5]=r.y,A[B+F+6]=r.z,A[B+F+7]=0),m===!0&&(r.fromBufferAttribute(G,H),A[B+F+8]=r.x,A[B+F+9]=r.y,A[B+F+10]=r.z,A[B+F+11]=G.itemSize===4?r.w:1)}}f={count:d,texture:y,size:new ot(D,C)},i.set(a,f),a.addEventListener("dispose",j)}if(s.isInstancedMesh===!0&&s.morphTexture!==null)c.getUniforms().setValue(n,"morphTexture",s.morphTexture,t);else{let g=0;for(let m=0;m<l.length;m++)g+=l[m];let _=a.morphTargetsRelative?1:1-g;c.getUniforms().setValue(n,"morphTargetBaseInfluence",_),c.getUniforms().setValue(n,"morphTargetInfluences",l)}c.getUniforms().setValue(n,"morphTargetsTexture",f.texture,t),c.getUniforms().setValue(n,"morphTargetsTextureSize",f.size)}return{update:o}}function XL(n,e,t,i,r){let o=new WeakMap;function s(l){let u=r.render.frame,d=l.geometry,f=e.get(l,d);if(o.get(f)!==u&&(e.update(f),o.set(f,u)),l.isInstancedMesh&&(l.hasEventListener("dispose",c)===!1&&l.addEventListener("dispose",c),o.get(l)!==u&&(t.update(l.instanceMatrix,n.ARRAY_BUFFER),l.instanceColor!==null&&t.update(l.instanceColor,n.ARRAY_BUFFER),o.set(l,u))),l.isSkinnedMesh){let h=l.skeleton;o.get(h)!==u&&(h.update(),o.set(h,u))}return f}function a(){o=new WeakMap}function c(l){let u=l.target;u.removeEventListener("dispose",c),i.releaseStatesOfObject(u),t.remove(u.instanceMatrix),u.instanceColor!==null&&t.remove(u.instanceColor)}return{update:s,dispose:a}}var YL={[Xy]:"LINEAR_TONE_MAPPING",[Yy]:"REINHARD_TONE_MAPPING",[Zy]:"CINEON_TONE_MAPPING",[Jy]:"ACES_FILMIC_TONE_MAPPING",[Qy]:"AGX_TONE_MAPPING",[e0]:"NEUTRAL_TONE_MAPPING",[Ky]:"CUSTOM_TONE_MAPPING"};function ZL(n,e,t,i,r){let o=new ri(e,t,{type:n,depthBuffer:i,stencilBuffer:r}),s=new ri(e,t,{type:er,depthBuffer:!1,stencilBuffer:!1}),a=new wn;a.setAttribute("position",new Vt([-1,3,0,-1,-1,0,3,-1,0],3)),a.setAttribute("uv",new Vt([0,2,0,0,2,0],2));let c=new hh({uniforms:{tDiffuse:{value:null}},vertexShader:`
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
			}`,depthTest:!1,depthWrite:!1}),l=new un(a,c),u=new Ua(-1,1,1,-1,0,1),d=null,f=null,h=!1,g,_=null,m=[],p=!1;this.setSize=function(b,w){o.setSize(b,w),s.setSize(b,w);for(let S=0;S<m.length;S++){let D=m[S];D.setSize&&D.setSize(b,w)}},this.setEffects=function(b){m=b,p=m.length>0&&m[0].isRenderPass===!0;let w=o.width,S=o.height;for(let D=0;D<m.length;D++){let C=m[D];C.setSize&&C.setSize(w,S)}},this.begin=function(b,w){if(h||b.toneMapping===Ui&&m.length===0)return!1;if(_=w,w!==null){let S=w.width,D=w.height;(o.width!==S||o.height!==D)&&this.setSize(S,D)}return p===!1&&b.setRenderTarget(o),g=b.toneMapping,b.toneMapping=Ui,!0},this.hasRenderPass=function(){return p},this.end=function(b,w){b.toneMapping=g,h=!0;let S=o,D=s;for(let C=0;C<m.length;C++){let A=m[C];if(A.enabled!==!1&&(A.render(b,D,S,w),A.needsSwap!==!1)){let y=S;S=D,D=y}}if(d!==b.outputColorSpace||f!==b.toneMapping){d=b.outputColorSpace,f=b.toneMapping,c.defines={},at.getTransfer(d)===_t&&(c.defines.SRGB_TRANSFER="");let C=YL[f];C&&(c.defines[C]=""),c.needsUpdate=!0}c.uniforms.tDiffuse.value=S.texture,b.setRenderTarget(_),b.render(l,u),_=null,h=!1},this.isCompositing=function(){return h},this.dispose=function(){o.dispose(),s.dispose(),a.dispose(),c.dispose()}}var Mw=new Rr,b0=new ho(1,1),Sw=new gl,Ew=new sh,ww=new bl,rw=[],ow=[],sw=new Float32Array(16),aw=new Float32Array(9),cw=new Float32Array(4);function Wa(n,e,t){let i=n[0];if(i<=0||i>0)return n;let r=e*t,o=rw[r];if(o===void 0&&(o=new Float32Array(r),rw[r]=o),e!==0){i.toArray(o,0);for(let s=1,a=0;s!==e;++s)a+=t,n[s].toArray(o,a)}return o}function en(n,e){if(n.length!==e.length)return!1;for(let t=0,i=n.length;t<i;t++)if(n[t]!==e[t])return!1;return!0}function tn(n,e){for(let t=0,i=e.length;t<i;t++)n[t]=e[t]}function bp(n,e){let t=ow[e];t===void 0&&(t=new Int32Array(e),ow[e]=t);for(let i=0;i!==e;++i)t[i]=n.allocateTextureUnit();return t}function JL(n,e){let t=this.cache;t[0]!==e&&(n.uniform1f(this.addr,e),t[0]=e)}function KL(n,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(n.uniform2f(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(en(t,e))return;n.uniform2fv(this.addr,e),tn(t,e)}}function QL(n,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(n.uniform3f(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else if(e.r!==void 0)(t[0]!==e.r||t[1]!==e.g||t[2]!==e.b)&&(n.uniform3f(this.addr,e.r,e.g,e.b),t[0]=e.r,t[1]=e.g,t[2]=e.b);else{if(en(t,e))return;n.uniform3fv(this.addr,e),tn(t,e)}}function eF(n,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(n.uniform4f(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(en(t,e))return;n.uniform4fv(this.addr,e),tn(t,e)}}function tF(n,e){let t=this.cache,i=e.elements;if(i===void 0){if(en(t,e))return;n.uniformMatrix2fv(this.addr,!1,e),tn(t,e)}else{if(en(t,i))return;cw.set(i),n.uniformMatrix2fv(this.addr,!1,cw),tn(t,i)}}function nF(n,e){let t=this.cache,i=e.elements;if(i===void 0){if(en(t,e))return;n.uniformMatrix3fv(this.addr,!1,e),tn(t,e)}else{if(en(t,i))return;aw.set(i),n.uniformMatrix3fv(this.addr,!1,aw),tn(t,i)}}function iF(n,e){let t=this.cache,i=e.elements;if(i===void 0){if(en(t,e))return;n.uniformMatrix4fv(this.addr,!1,e),tn(t,e)}else{if(en(t,i))return;sw.set(i),n.uniformMatrix4fv(this.addr,!1,sw),tn(t,i)}}function rF(n,e){let t=this.cache;t[0]!==e&&(n.uniform1i(this.addr,e),t[0]=e)}function oF(n,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(n.uniform2i(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(en(t,e))return;n.uniform2iv(this.addr,e),tn(t,e)}}function sF(n,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(n.uniform3i(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(en(t,e))return;n.uniform3iv(this.addr,e),tn(t,e)}}function aF(n,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(n.uniform4i(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(en(t,e))return;n.uniform4iv(this.addr,e),tn(t,e)}}function cF(n,e){let t=this.cache;t[0]!==e&&(n.uniform1ui(this.addr,e),t[0]=e)}function lF(n,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(n.uniform2ui(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(en(t,e))return;n.uniform2uiv(this.addr,e),tn(t,e)}}function uF(n,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(n.uniform3ui(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(en(t,e))return;n.uniform3uiv(this.addr,e),tn(t,e)}}function dF(n,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(n.uniform4ui(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(en(t,e))return;n.uniform4uiv(this.addr,e),tn(t,e)}}function fF(n,e,t){let i=this.cache,r=t.allocateTextureUnit();i[0]!==r&&(n.uniform1i(this.addr,r),i[0]=r);let o;this.type===n.SAMPLER_2D_SHADOW?(b0.compareFunction=t.isReversedDepthBuffer()?pp:hp,o=b0):o=Mw,t.setTexture2D(e||o,r)}function hF(n,e,t){let i=this.cache,r=t.allocateTextureUnit();i[0]!==r&&(n.uniform1i(this.addr,r),i[0]=r),t.setTexture3D(e||Ew,r)}function pF(n,e,t){let i=this.cache,r=t.allocateTextureUnit();i[0]!==r&&(n.uniform1i(this.addr,r),i[0]=r),t.setTextureCube(e||ww,r)}function mF(n,e,t){let i=this.cache,r=t.allocateTextureUnit();i[0]!==r&&(n.uniform1i(this.addr,r),i[0]=r),t.setTexture2DArray(e||Sw,r)}function gF(n){switch(n){case 5126:return JL;case 35664:return KL;case 35665:return QL;case 35666:return eF;case 35674:return tF;case 35675:return nF;case 35676:return iF;case 5124:case 35670:return rF;case 35667:case 35671:return oF;case 35668:case 35672:return sF;case 35669:case 35673:return aF;case 5125:return cF;case 36294:return lF;case 36295:return uF;case 36296:return dF;case 35678:case 36198:case 36298:case 36306:case 35682:return fF;case 35679:case 36299:case 36307:return hF;case 35680:case 36300:case 36308:case 36293:return pF;case 36289:case 36303:case 36311:case 36292:return mF}}function vF(n,e){n.uniform1fv(this.addr,e)}function yF(n,e){let t=Wa(e,this.size,2);n.uniform2fv(this.addr,t)}function _F(n,e){let t=Wa(e,this.size,3);n.uniform3fv(this.addr,t)}function xF(n,e){let t=Wa(e,this.size,4);n.uniform4fv(this.addr,t)}function bF(n,e){let t=Wa(e,this.size,4);n.uniformMatrix2fv(this.addr,!1,t)}function MF(n,e){let t=Wa(e,this.size,9);n.uniformMatrix3fv(this.addr,!1,t)}function SF(n,e){let t=Wa(e,this.size,16);n.uniformMatrix4fv(this.addr,!1,t)}function EF(n,e){n.uniform1iv(this.addr,e)}function wF(n,e){n.uniform2iv(this.addr,e)}function CF(n,e){n.uniform3iv(this.addr,e)}function TF(n,e){n.uniform4iv(this.addr,e)}function DF(n,e){n.uniform1uiv(this.addr,e)}function IF(n,e){n.uniform2uiv(this.addr,e)}function AF(n,e){n.uniform3uiv(this.addr,e)}function RF(n,e){n.uniform4uiv(this.addr,e)}function NF(n,e,t){let i=this.cache,r=e.length,o=bp(t,r);en(i,o)||(n.uniform1iv(this.addr,o),tn(i,o));let s;this.type===n.SAMPLER_2D_SHADOW?s=b0:s=Mw;for(let a=0;a!==r;++a)t.setTexture2D(e[a]||s,o[a])}function PF(n,e,t){let i=this.cache,r=e.length,o=bp(t,r);en(i,o)||(n.uniform1iv(this.addr,o),tn(i,o));for(let s=0;s!==r;++s)t.setTexture3D(e[s]||Ew,o[s])}function OF(n,e,t){let i=this.cache,r=e.length,o=bp(t,r);en(i,o)||(n.uniform1iv(this.addr,o),tn(i,o));for(let s=0;s!==r;++s)t.setTextureCube(e[s]||ww,o[s])}function LF(n,e,t){let i=this.cache,r=e.length,o=bp(t,r);en(i,o)||(n.uniform1iv(this.addr,o),tn(i,o));for(let s=0;s!==r;++s)t.setTexture2DArray(e[s]||Sw,o[s])}function FF(n){switch(n){case 5126:return vF;case 35664:return yF;case 35665:return _F;case 35666:return xF;case 35674:return bF;case 35675:return MF;case 35676:return SF;case 5124:case 35670:return EF;case 35667:case 35671:return wF;case 35668:case 35672:return CF;case 35669:case 35673:return TF;case 5125:return DF;case 36294:return IF;case 36295:return AF;case 36296:return RF;case 35678:case 36198:case 36298:case 36306:case 35682:return NF;case 35679:case 36299:case 36307:return PF;case 35680:case 36300:case 36308:case 36293:return OF;case 36289:case 36303:case 36311:case 36292:return LF}}var M0=class{constructor(e,t,i){this.id=e,this.addr=i,this.cache=[],this.type=t.type,this.setValue=gF(t.type)}},S0=class{constructor(e,t,i){this.id=e,this.addr=i,this.cache=[],this.type=t.type,this.size=t.size,this.setValue=FF(t.type)}},E0=class{constructor(e){this.id=e,this.seq=[],this.map={}}setValue(e,t,i){let r=this.seq;for(let o=0,s=r.length;o!==s;++o){let a=r[o];a.setValue(e,t[a.id],i)}}},_0=/(\w+)(\])?(\[|\.)?/g;function lw(n,e){n.seq.push(e),n.map[e.id]=e}function kF(n,e,t){let i=n.name,r=i.length;for(_0.lastIndex=0;;){let o=_0.exec(i),s=_0.lastIndex,a=o[1],c=o[2]==="]",l=o[3];if(c&&(a=a|0),l===void 0||l==="["&&s+2===r){lw(t,l===void 0?new M0(a,n,e):new S0(a,n,e));break}else{let d=t.map[a];d===void 0&&(d=new E0(a),lw(t,d)),t=d}}}var ja=class{constructor(e,t){this.seq=[],this.map={};let i=e.getProgramParameter(t,e.ACTIVE_UNIFORMS);for(let s=0;s<i;++s){let a=e.getActiveUniform(t,s),c=e.getUniformLocation(t,a.name);kF(a,c,this)}let r=[],o=[];for(let s of this.seq)s.type===e.SAMPLER_2D_SHADOW||s.type===e.SAMPLER_CUBE_SHADOW||s.type===e.SAMPLER_2D_ARRAY_SHADOW?r.push(s):o.push(s);r.length>0&&(this.seq=r.concat(o))}setValue(e,t,i,r){let o=this.map[t];o!==void 0&&o.setValue(e,i,r)}setOptional(e,t,i){let r=t[i];r!==void 0&&this.setValue(e,i,r)}static upload(e,t,i,r){for(let o=0,s=t.length;o!==s;++o){let a=t[o],c=i[a.id];c.needsUpdate!==!1&&a.setValue(e,c.value,r)}}static seqWithValue(e,t){let i=[];for(let r=0,o=e.length;r!==o;++r){let s=e[r];s.id in t&&i.push(s)}return i}};function uw(n,e,t){let i=n.createShader(e);return n.shaderSource(i,t),n.compileShader(i),i}var UF=37297,BF=0;function VF(n,e){let t=n.split(`
`),i=[],r=Math.max(e-6,0),o=Math.min(e+6,t.length);for(let s=r;s<o;s++){let a=s+1;i.push(`${a===e?">":" "} ${a}: ${t[s]}`)}return i.join(`
`)}var dw=new qe;function HF(n){at._getMatrix(dw,at.workingColorSpace,n);let e=`mat3( ${dw.elements.map(t=>t.toFixed(4))} )`;switch(at.getTransfer(n)){case hl:return[e,"LinearTransferOETF"];case _t:return[e,"sRGBTransferOETF"];default:return ke("WebGLProgram: Unsupported color space: ",n),[e,"LinearTransferOETF"]}}function fw(n,e,t){let i=n.getShaderParameter(e,n.COMPILE_STATUS),o=(n.getShaderInfoLog(e)||"").trim();if(i&&o==="")return"";let s=/ERROR: 0:(\d+)/.exec(o);if(s){let a=parseInt(s[1]);return t.toUpperCase()+`

`+o+`

`+VF(n.getShaderSource(e),a)}else return o}function zF(n,e){let t=HF(e);return[`vec4 ${n}( vec4 value ) {`,`	return ${t[1]}( vec4( value.rgb * ${t[0]}, value.a ) );`,"}"].join(`
`)}var GF={[Xy]:"Linear",[Yy]:"Reinhard",[Zy]:"Cineon",[Jy]:"ACESFilmic",[Qy]:"AgX",[e0]:"Neutral",[Ky]:"Custom"};function jF(n,e){let t=GF[e];return t===void 0?(ke("WebGLProgram: Unsupported toneMapping:",e),"vec3 "+n+"( vec3 color ) { return LinearToneMapping( color ); }"):"vec3 "+n+"( vec3 color ) { return "+t+"ToneMapping( color ); }"}var gp=new O;function WF(){at.getLuminanceCoefficients(gp);let n=gp.x.toFixed(4),e=gp.y.toFixed(4),t=gp.z.toFixed(4);return["float luminance( const in vec3 rgb ) {",`	const vec3 weights = vec3( ${n}, ${e}, ${t} );`,"	return dot( weights, rgb );","}"].join(`
`)}function $F(n){return[n.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",n.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(Hl).join(`
`)}function qF(n){let e=[];for(let t in n){let i=n[t];i!==!1&&e.push("#define "+t+" "+i)}return e.join(`
`)}function XF(n,e){let t={},i=n.getProgramParameter(e,n.ACTIVE_ATTRIBUTES);for(let r=0;r<i;r++){let o=n.getActiveAttrib(e,r),s=o.name,a=1;o.type===n.FLOAT_MAT2&&(a=2),o.type===n.FLOAT_MAT3&&(a=3),o.type===n.FLOAT_MAT4&&(a=4),t[s]={type:o.type,location:n.getAttribLocation(e,s),locationSize:a}}return t}function Hl(n){return n!==""}function hw(n,e){let t=e.numSpotLightShadows+e.numSpotLightMaps-e.numSpotLightShadowsWithMaps;return n.replace(/NUM_DIR_LIGHTS/g,e.numDirLights).replace(/NUM_SPOT_LIGHTS/g,e.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,e.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,t).replace(/NUM_RECT_AREA_LIGHTS/g,e.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,e.numPointLights).replace(/NUM_HEMI_LIGHTS/g,e.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g,e.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,e.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,e.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,e.numPointLightShadows)}function pw(n,e){return n.replace(/NUM_CLIPPING_PLANES/g,e.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,e.numClippingPlanes-e.numClipIntersection)}var YF=/^[ \t]*#include +<([\w\d./]+)>/gm;function w0(n){return n.replace(YF,JF)}var ZF=new Map;function JF(n,e){let t=Ze[e];if(t===void 0){let i=ZF.get(e);if(i!==void 0)t=Ze[i],ke('WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',e,i);else throw new Error("Can not resolve #include <"+e+">")}return w0(t)}var KF=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function mw(n){return n.replace(KF,QF)}function QF(n,e,t,i){let r="";for(let o=parseInt(e);o<parseInt(t);o++)r+=i.replace(/\[\s*i\s*\]/g,"[ "+o+" ]").replace(/UNROLLED_LOOP_INDEX/g,o);return r}function gw(n){let e=`precision ${n.precision} float;
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
#define LOW_PRECISION`),e}var e2={[Rl]:"SHADOWMAP_TYPE_PCF",[Va]:"SHADOWMAP_TYPE_VSM"};function t2(n){return e2[n.shadowMapType]||"SHADOWMAP_TYPE_BASIC"}var n2={[vo]:"ENVMAP_TYPE_CUBE",[ds]:"ENVMAP_TYPE_CUBE",[Nl]:"ENVMAP_TYPE_CUBE_UV"};function i2(n){return n.envMap===!1?"ENVMAP_TYPE_CUBE":n2[n.envMapMode]||"ENVMAP_TYPE_CUBE"}var r2={[ds]:"ENVMAP_MODE_REFRACTION"};function o2(n){return n.envMap===!1?"ENVMAP_MODE_REFLECTION":r2[n.envMapMode]||"ENVMAP_MODE_REFLECTION"}var s2={[qy]:"ENVMAP_BLENDING_MULTIPLY",[FE]:"ENVMAP_BLENDING_MIX",[kE]:"ENVMAP_BLENDING_ADD"};function a2(n){return n.envMap===!1?"ENVMAP_BLENDING_NONE":s2[n.combine]||"ENVMAP_BLENDING_NONE"}function c2(n){let e=n.envMapCubeUVHeight;if(e===null)return null;let t=Math.log2(e)-2,i=1/e;return{texelWidth:1/(3*Math.max(Math.pow(2,t),112)),texelHeight:i,maxMip:t}}function l2(n,e,t,i){let r=n.getContext(),o=t.defines,s=t.vertexShader,a=t.fragmentShader,c=t2(t),l=i2(t),u=o2(t),d=a2(t),f=c2(t),h=$F(t),g=qF(o),_=r.createProgram(),m,p,b=t.glslVersion?"#version "+t.glslVersion+`
`:"";t.isRawShaderMaterial?(m=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,g].filter(Hl).join(`
`),m.length>0&&(m+=`
`),p=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,g].filter(Hl).join(`
`),p.length>0&&(p+=`
`)):(m=[gw(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,g,t.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",t.batching?"#define USE_BATCHING":"",t.batchingColor?"#define USE_BATCHING_COLOR":"",t.instancing?"#define USE_INSTANCING":"",t.instancingColor?"#define USE_INSTANCING_COLOR":"",t.instancingMorph?"#define USE_INSTANCING_MORPH":"",t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.map?"#define USE_MAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+u:"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.displacementMap?"#define USE_DISPLACEMENTMAP":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.mapUv?"#define MAP_UV "+t.mapUv:"",t.alphaMapUv?"#define ALPHAMAP_UV "+t.alphaMapUv:"",t.lightMapUv?"#define LIGHTMAP_UV "+t.lightMapUv:"",t.aoMapUv?"#define AOMAP_UV "+t.aoMapUv:"",t.emissiveMapUv?"#define EMISSIVEMAP_UV "+t.emissiveMapUv:"",t.bumpMapUv?"#define BUMPMAP_UV "+t.bumpMapUv:"",t.normalMapUv?"#define NORMALMAP_UV "+t.normalMapUv:"",t.displacementMapUv?"#define DISPLACEMENTMAP_UV "+t.displacementMapUv:"",t.metalnessMapUv?"#define METALNESSMAP_UV "+t.metalnessMapUv:"",t.roughnessMapUv?"#define ROUGHNESSMAP_UV "+t.roughnessMapUv:"",t.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+t.anisotropyMapUv:"",t.clearcoatMapUv?"#define CLEARCOATMAP_UV "+t.clearcoatMapUv:"",t.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+t.clearcoatNormalMapUv:"",t.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+t.clearcoatRoughnessMapUv:"",t.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+t.iridescenceMapUv:"",t.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+t.iridescenceThicknessMapUv:"",t.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+t.sheenColorMapUv:"",t.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+t.sheenRoughnessMapUv:"",t.specularMapUv?"#define SPECULARMAP_UV "+t.specularMapUv:"",t.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+t.specularColorMapUv:"",t.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+t.specularIntensityMapUv:"",t.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+t.transmissionMapUv:"",t.thicknessMapUv?"#define THICKNESSMAP_UV "+t.thicknessMapUv:"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.flatShading?"#define FLAT_SHADED":"",t.skinning?"#define USE_SKINNING":"",t.morphTargets?"#define USE_MORPHTARGETS":"",t.morphNormals&&t.flatShading===!1?"#define USE_MORPHNORMALS":"",t.morphColors?"#define USE_MORPHCOLORS":"",t.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+t.morphTextureStride:"",t.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+t.morphTargetsCount:"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+c:"",t.sizeAttenuation?"#define USE_SIZEATTENUATION":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",t.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(Hl).join(`
`),p=[gw(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,g,t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",t.map?"#define USE_MAP":"",t.matcap?"#define USE_MATCAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+l:"",t.envMap?"#define "+u:"",t.envMap?"#define "+d:"",f?"#define CUBEUV_TEXEL_WIDTH "+f.texelWidth:"",f?"#define CUBEUV_TEXEL_HEIGHT "+f.texelHeight:"",f?"#define CUBEUV_MAX_MIP "+f.maxMip+".0":"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoat?"#define USE_CLEARCOAT":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.dispersion?"#define USE_DISPERSION":"",t.iridescence?"#define USE_IRIDESCENCE":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaTest?"#define USE_ALPHATEST":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.sheen?"#define USE_SHEEN":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors||t.instancingColor?"#define USE_COLOR":"",t.vertexAlphas||t.batchingColor?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.gradientMap?"#define USE_GRADIENTMAP":"",t.flatShading?"#define FLAT_SHADED":"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+c:"",t.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",t.decodeVideoTextureEmissive?"#define DECODE_VIDEO_TEXTURE_EMISSIVE":"",t.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",t.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",t.toneMapping!==Ui?"#define TONE_MAPPING":"",t.toneMapping!==Ui?Ze.tonemapping_pars_fragment:"",t.toneMapping!==Ui?jF("toneMapping",t.toneMapping):"",t.dithering?"#define DITHERING":"",t.opaque?"#define OPAQUE":"",Ze.colorspace_pars_fragment,zF("linearToOutputTexel",t.outputColorSpace),WF(),t.useDepthPacking?"#define DEPTH_PACKING "+t.depthPacking:"",`
`].filter(Hl).join(`
`)),s=w0(s),s=hw(s,t),s=pw(s,t),a=w0(a),a=hw(a,t),a=pw(a,t),s=mw(s),a=mw(a),t.isRawShaderMaterial!==!0&&(b=`#version 300 es
`,m=[h,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+m,p=["#define varying in",t.glslVersion===l0?"":"layout(location = 0) out highp vec4 pc_fragColor;",t.glslVersion===l0?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+p);let w=b+m+s,S=b+p+a,D=uw(r,r.VERTEX_SHADER,w),C=uw(r,r.FRAGMENT_SHADER,S);r.attachShader(_,D),r.attachShader(_,C),t.index0AttributeName!==void 0?r.bindAttribLocation(_,0,t.index0AttributeName):t.morphTargets===!0&&r.bindAttribLocation(_,0,"position"),r.linkProgram(_);function A(T){if(n.debug.checkShaderErrors){let L=r.getProgramInfoLog(_)||"",k=r.getShaderInfoLog(D)||"",G=r.getShaderInfoLog(C)||"",B=L.trim(),H=k.trim(),F=G.trim(),ee=!0,Z=!0;if(r.getProgramParameter(_,r.LINK_STATUS)===!1)if(ee=!1,typeof n.debug.onShaderError=="function")n.debug.onShaderError(r,_,D,C);else{let he=fw(r,D,"vertex"),xe=fw(r,C,"fragment");Fe("THREE.WebGLProgram: Shader Error "+r.getError()+" - VALIDATE_STATUS "+r.getProgramParameter(_,r.VALIDATE_STATUS)+`

Material Name: `+T.name+`
Material Type: `+T.type+`

Program Info Log: `+B+`
`+he+`
`+xe)}else B!==""?ke("WebGLProgram: Program Info Log:",B):(H===""||F==="")&&(Z=!1);Z&&(T.diagnostics={runnable:ee,programLog:B,vertexShader:{log:H,prefix:m},fragmentShader:{log:F,prefix:p}})}r.deleteShader(D),r.deleteShader(C),y=new ja(r,_),M=XF(r,_)}let y;this.getUniforms=function(){return y===void 0&&A(this),y};let M;this.getAttributes=function(){return M===void 0&&A(this),M};let j=t.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return j===!1&&(j=r.getProgramParameter(_,UF)),j},this.destroy=function(){i.releaseStatesOfProgram(this),r.deleteProgram(_),this.program=void 0},this.type=t.shaderType,this.name=t.shaderName,this.id=BF++,this.cacheKey=e,this.usedTimes=1,this.program=_,this.vertexShader=D,this.fragmentShader=C,this}var u2=0,C0=class{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(e){let t=e.vertexShader,i=e.fragmentShader,r=this._getShaderStage(t),o=this._getShaderStage(i),s=this._getShaderCacheForMaterial(e);return s.has(r)===!1&&(s.add(r),r.usedTimes++),s.has(o)===!1&&(s.add(o),o.usedTimes++),this}remove(e){let t=this.materialCache.get(e);for(let i of t)i.usedTimes--,i.usedTimes===0&&this.shaderCache.delete(i.code);return this.materialCache.delete(e),this}getVertexShaderID(e){return this._getShaderStage(e.vertexShader).id}getFragmentShaderID(e){return this._getShaderStage(e.fragmentShader).id}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(e){let t=this.materialCache,i=t.get(e);return i===void 0&&(i=new Set,t.set(e,i)),i}_getShaderStage(e){let t=this.shaderCache,i=t.get(e);return i===void 0&&(i=new T0(e),t.set(e,i)),i}},T0=class{constructor(e){this.id=u2++,this.code=e,this.usedTimes=0}};function d2(n,e,t,i,r,o){let s=new Aa,a=new C0,c=new Set,l=[],u=new Map,d=i.logarithmicDepthBuffer,f=i.precision,h={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distance",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function g(y){return c.add(y),y===0?"uv":`uv${y}`}function _(y,M,j,T,L){let k=T.fog,G=L.geometry,B=y.isMeshStandardMaterial||y.isMeshLambertMaterial||y.isMeshPhongMaterial?T.environment:null,H=y.isMeshStandardMaterial||y.isMeshLambertMaterial&&!y.envMap||y.isMeshPhongMaterial&&!y.envMap,F=e.get(y.envMap||B,H),ee=F&&F.mapping===Nl?F.image.height:null,Z=h[y.type];y.precision!==null&&(f=i.getMaxPrecision(y.precision),f!==y.precision&&ke("WebGLProgram.getParameters:",y.precision,"not supported, using",f,"instead."));let he=G.morphAttributes.position||G.morphAttributes.normal||G.morphAttributes.color,xe=he!==void 0?he.length:0,me=0;G.morphAttributes.position!==void 0&&(me=1),G.morphAttributes.normal!==void 0&&(me=2),G.morphAttributes.color!==void 0&&(me=3);let Ye,Ft,Lt,X;if(Z){let bt=nr[Z];Ye=bt.vertexShader,Ft=bt.fragmentShader}else Ye=y.vertexShader,Ft=y.fragmentShader,a.update(y),Lt=a.getVertexShaderID(y),X=a.getFragmentShaderID(y);let ie=n.getRenderTarget(),se=n.state.buffers.depth.getReversed(),Xe=L.isInstancedMesh===!0,Oe=L.isBatchedMesh===!0,Ve=!!y.map,nn=!!y.matcap,ct=!!F,xt=!!y.aoMap,Dt=!!y.lightMap,Je=!!y.bumpMap,jt=!!y.normalMap,I=!!y.displacementMap,qt=!!y.emissiveMap,pt=!!y.metalnessMap,Rt=!!y.roughnessMap,Ce=y.anisotropy>0,E=y.clearcoat>0,v=y.dispersion>0,N=y.iridescence>0,q=y.sheen>0,Y=y.transmission>0,$=Ce&&!!y.anisotropyMap,be=E&&!!y.clearcoatMap,re=E&&!!y.clearcoatNormalMap,Ne=E&&!!y.clearcoatRoughnessMap,Ue=N&&!!y.iridescenceMap,J=N&&!!y.iridescenceThicknessMap,te=q&&!!y.sheenColorMap,Me=q&&!!y.sheenRoughnessMap,Ee=!!y.specularMap,pe=!!y.specularColorMap,Ke=!!y.specularIntensityMap,R=Y&&!!y.transmissionMap,oe=Y&&!!y.thicknessMap,ne=!!y.gradientMap,ye=!!y.alphaMap,K=y.alphaTest>0,W=!!y.alphaHash,Se=!!y.extensions,ze=Ui;y.toneMapped&&(ie===null||ie.isXRRenderTarget===!0)&&(ze=n.toneMapping);let Nt={shaderID:Z,shaderType:y.type,shaderName:y.name,vertexShader:Ye,fragmentShader:Ft,defines:y.defines,customVertexShaderID:Lt,customFragmentShaderID:X,isRawShaderMaterial:y.isRawShaderMaterial===!0,glslVersion:y.glslVersion,precision:f,batching:Oe,batchingColor:Oe&&L._colorsTexture!==null,instancing:Xe,instancingColor:Xe&&L.instanceColor!==null,instancingMorph:Xe&&L.morphTexture!==null,outputColorSpace:ie===null?n.outputColorSpace:ie.isXRRenderTarget===!0?ie.texture.colorSpace:ls,alphaToCoverage:!!y.alphaToCoverage,map:Ve,matcap:nn,envMap:ct,envMapMode:ct&&F.mapping,envMapCubeUVHeight:ee,aoMap:xt,lightMap:Dt,bumpMap:Je,normalMap:jt,displacementMap:I,emissiveMap:qt,normalMapObjectSpace:jt&&y.normalMapType===VE,normalMapTangentSpace:jt&&y.normalMapType===c0,metalnessMap:pt,roughnessMap:Rt,anisotropy:Ce,anisotropyMap:$,clearcoat:E,clearcoatMap:be,clearcoatNormalMap:re,clearcoatRoughnessMap:Ne,dispersion:v,iridescence:N,iridescenceMap:Ue,iridescenceThicknessMap:J,sheen:q,sheenColorMap:te,sheenRoughnessMap:Me,specularMap:Ee,specularColorMap:pe,specularIntensityMap:Ke,transmission:Y,transmissionMap:R,thicknessMap:oe,gradientMap:ne,opaque:y.transparent===!1&&y.blending===as&&y.alphaToCoverage===!1,alphaMap:ye,alphaTest:K,alphaHash:W,combine:y.combine,mapUv:Ve&&g(y.map.channel),aoMapUv:xt&&g(y.aoMap.channel),lightMapUv:Dt&&g(y.lightMap.channel),bumpMapUv:Je&&g(y.bumpMap.channel),normalMapUv:jt&&g(y.normalMap.channel),displacementMapUv:I&&g(y.displacementMap.channel),emissiveMapUv:qt&&g(y.emissiveMap.channel),metalnessMapUv:pt&&g(y.metalnessMap.channel),roughnessMapUv:Rt&&g(y.roughnessMap.channel),anisotropyMapUv:$&&g(y.anisotropyMap.channel),clearcoatMapUv:be&&g(y.clearcoatMap.channel),clearcoatNormalMapUv:re&&g(y.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:Ne&&g(y.clearcoatRoughnessMap.channel),iridescenceMapUv:Ue&&g(y.iridescenceMap.channel),iridescenceThicknessMapUv:J&&g(y.iridescenceThicknessMap.channel),sheenColorMapUv:te&&g(y.sheenColorMap.channel),sheenRoughnessMapUv:Me&&g(y.sheenRoughnessMap.channel),specularMapUv:Ee&&g(y.specularMap.channel),specularColorMapUv:pe&&g(y.specularColorMap.channel),specularIntensityMapUv:Ke&&g(y.specularIntensityMap.channel),transmissionMapUv:R&&g(y.transmissionMap.channel),thicknessMapUv:oe&&g(y.thicknessMap.channel),alphaMapUv:ye&&g(y.alphaMap.channel),vertexTangents:!!G.attributes.tangent&&(jt||Ce),vertexColors:y.vertexColors,vertexAlphas:y.vertexColors===!0&&!!G.attributes.color&&G.attributes.color.itemSize===4,pointsUvs:L.isPoints===!0&&!!G.attributes.uv&&(Ve||ye),fog:!!k,useFog:y.fog===!0,fogExp2:!!k&&k.isFogExp2,flatShading:y.wireframe===!1&&(y.flatShading===!0||G.attributes.normal===void 0&&jt===!1&&(y.isMeshLambertMaterial||y.isMeshPhongMaterial||y.isMeshStandardMaterial||y.isMeshPhysicalMaterial)),sizeAttenuation:y.sizeAttenuation===!0,logarithmicDepthBuffer:d,reversedDepthBuffer:se,skinning:L.isSkinnedMesh===!0,morphTargets:G.morphAttributes.position!==void 0,morphNormals:G.morphAttributes.normal!==void 0,morphColors:G.morphAttributes.color!==void 0,morphTargetsCount:xe,morphTextureStride:me,numDirLights:M.directional.length,numPointLights:M.point.length,numSpotLights:M.spot.length,numSpotLightMaps:M.spotLightMap.length,numRectAreaLights:M.rectArea.length,numHemiLights:M.hemi.length,numDirLightShadows:M.directionalShadowMap.length,numPointLightShadows:M.pointShadowMap.length,numSpotLightShadows:M.spotShadowMap.length,numSpotLightShadowsWithMaps:M.numSpotLightShadowsWithMaps,numLightProbes:M.numLightProbes,numClippingPlanes:o.numPlanes,numClipIntersection:o.numIntersection,dithering:y.dithering,shadowMapEnabled:n.shadowMap.enabled&&j.length>0,shadowMapType:n.shadowMap.type,toneMapping:ze,decodeVideoTexture:Ve&&y.map.isVideoTexture===!0&&at.getTransfer(y.map.colorSpace)===_t,decodeVideoTextureEmissive:qt&&y.emissiveMap.isVideoTexture===!0&&at.getTransfer(y.emissiveMap.colorSpace)===_t,premultipliedAlpha:y.premultipliedAlpha,doubleSided:y.side===Ki,flipSided:y.side===Un,useDepthPacking:y.depthPacking>=0,depthPacking:y.depthPacking||0,index0AttributeName:y.index0AttributeName,extensionClipCullDistance:Se&&y.extensions.clipCullDistance===!0&&t.has("WEBGL_clip_cull_distance"),extensionMultiDraw:(Se&&y.extensions.multiDraw===!0||Oe)&&t.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:t.has("KHR_parallel_shader_compile"),customProgramCacheKey:y.customProgramCacheKey()};return Nt.vertexUv1s=c.has(1),Nt.vertexUv2s=c.has(2),Nt.vertexUv3s=c.has(3),c.clear(),Nt}function m(y){let M=[];if(y.shaderID?M.push(y.shaderID):(M.push(y.customVertexShaderID),M.push(y.customFragmentShaderID)),y.defines!==void 0)for(let j in y.defines)M.push(j),M.push(y.defines[j]);return y.isRawShaderMaterial===!1&&(p(M,y),b(M,y),M.push(n.outputColorSpace)),M.push(y.customProgramCacheKey),M.join()}function p(y,M){y.push(M.precision),y.push(M.outputColorSpace),y.push(M.envMapMode),y.push(M.envMapCubeUVHeight),y.push(M.mapUv),y.push(M.alphaMapUv),y.push(M.lightMapUv),y.push(M.aoMapUv),y.push(M.bumpMapUv),y.push(M.normalMapUv),y.push(M.displacementMapUv),y.push(M.emissiveMapUv),y.push(M.metalnessMapUv),y.push(M.roughnessMapUv),y.push(M.anisotropyMapUv),y.push(M.clearcoatMapUv),y.push(M.clearcoatNormalMapUv),y.push(M.clearcoatRoughnessMapUv),y.push(M.iridescenceMapUv),y.push(M.iridescenceThicknessMapUv),y.push(M.sheenColorMapUv),y.push(M.sheenRoughnessMapUv),y.push(M.specularMapUv),y.push(M.specularColorMapUv),y.push(M.specularIntensityMapUv),y.push(M.transmissionMapUv),y.push(M.thicknessMapUv),y.push(M.combine),y.push(M.fogExp2),y.push(M.sizeAttenuation),y.push(M.morphTargetsCount),y.push(M.morphAttributeCount),y.push(M.numDirLights),y.push(M.numPointLights),y.push(M.numSpotLights),y.push(M.numSpotLightMaps),y.push(M.numHemiLights),y.push(M.numRectAreaLights),y.push(M.numDirLightShadows),y.push(M.numPointLightShadows),y.push(M.numSpotLightShadows),y.push(M.numSpotLightShadowsWithMaps),y.push(M.numLightProbes),y.push(M.shadowMapType),y.push(M.toneMapping),y.push(M.numClippingPlanes),y.push(M.numClipIntersection),y.push(M.depthPacking)}function b(y,M){s.disableAll(),M.instancing&&s.enable(0),M.instancingColor&&s.enable(1),M.instancingMorph&&s.enable(2),M.matcap&&s.enable(3),M.envMap&&s.enable(4),M.normalMapObjectSpace&&s.enable(5),M.normalMapTangentSpace&&s.enable(6),M.clearcoat&&s.enable(7),M.iridescence&&s.enable(8),M.alphaTest&&s.enable(9),M.vertexColors&&s.enable(10),M.vertexAlphas&&s.enable(11),M.vertexUv1s&&s.enable(12),M.vertexUv2s&&s.enable(13),M.vertexUv3s&&s.enable(14),M.vertexTangents&&s.enable(15),M.anisotropy&&s.enable(16),M.alphaHash&&s.enable(17),M.batching&&s.enable(18),M.dispersion&&s.enable(19),M.batchingColor&&s.enable(20),M.gradientMap&&s.enable(21),y.push(s.mask),s.disableAll(),M.fog&&s.enable(0),M.useFog&&s.enable(1),M.flatShading&&s.enable(2),M.logarithmicDepthBuffer&&s.enable(3),M.reversedDepthBuffer&&s.enable(4),M.skinning&&s.enable(5),M.morphTargets&&s.enable(6),M.morphNormals&&s.enable(7),M.morphColors&&s.enable(8),M.premultipliedAlpha&&s.enable(9),M.shadowMapEnabled&&s.enable(10),M.doubleSided&&s.enable(11),M.flipSided&&s.enable(12),M.useDepthPacking&&s.enable(13),M.dithering&&s.enable(14),M.transmission&&s.enable(15),M.sheen&&s.enable(16),M.opaque&&s.enable(17),M.pointsUvs&&s.enable(18),M.decodeVideoTexture&&s.enable(19),M.decodeVideoTextureEmissive&&s.enable(20),M.alphaToCoverage&&s.enable(21),y.push(s.mask)}function w(y){let M=h[y.type],j;if(M){let T=nr[M];j=KE.clone(T.uniforms)}else j=y.uniforms;return j}function S(y,M){let j=u.get(M);return j!==void 0?++j.usedTimes:(j=new l2(n,M,y,r),l.push(j),u.set(M,j)),j}function D(y){if(--y.usedTimes===0){let M=l.indexOf(y);l[M]=l[l.length-1],l.pop(),u.delete(y.cacheKey),y.destroy()}}function C(y){a.remove(y)}function A(){a.dispose()}return{getParameters:_,getProgramCacheKey:m,getUniforms:w,acquireProgram:S,releaseProgram:D,releaseShaderCache:C,programs:l,dispose:A}}function f2(){let n=new WeakMap;function e(s){return n.has(s)}function t(s){let a=n.get(s);return a===void 0&&(a={},n.set(s,a)),a}function i(s){n.delete(s)}function r(s,a,c){n.get(s)[a]=c}function o(){n=new WeakMap}return{has:e,get:t,remove:i,update:r,dispose:o}}function h2(n,e){return n.groupOrder!==e.groupOrder?n.groupOrder-e.groupOrder:n.renderOrder!==e.renderOrder?n.renderOrder-e.renderOrder:n.material.id!==e.material.id?n.material.id-e.material.id:n.materialVariant!==e.materialVariant?n.materialVariant-e.materialVariant:n.z!==e.z?n.z-e.z:n.id-e.id}function vw(n,e){return n.groupOrder!==e.groupOrder?n.groupOrder-e.groupOrder:n.renderOrder!==e.renderOrder?n.renderOrder-e.renderOrder:n.z!==e.z?e.z-n.z:n.id-e.id}function yw(){let n=[],e=0,t=[],i=[],r=[];function o(){e=0,t.length=0,i.length=0,r.length=0}function s(f){let h=0;return f.isInstancedMesh&&(h+=2),f.isSkinnedMesh&&(h+=1),h}function a(f,h,g,_,m,p){let b=n[e];return b===void 0?(b={id:f.id,object:f,geometry:h,material:g,materialVariant:s(f),groupOrder:_,renderOrder:f.renderOrder,z:m,group:p},n[e]=b):(b.id=f.id,b.object=f,b.geometry=h,b.material=g,b.materialVariant=s(f),b.groupOrder=_,b.renderOrder=f.renderOrder,b.z=m,b.group=p),e++,b}function c(f,h,g,_,m,p){let b=a(f,h,g,_,m,p);g.transmission>0?i.push(b):g.transparent===!0?r.push(b):t.push(b)}function l(f,h,g,_,m,p){let b=a(f,h,g,_,m,p);g.transmission>0?i.unshift(b):g.transparent===!0?r.unshift(b):t.unshift(b)}function u(f,h){t.length>1&&t.sort(f||h2),i.length>1&&i.sort(h||vw),r.length>1&&r.sort(h||vw)}function d(){for(let f=e,h=n.length;f<h;f++){let g=n[f];if(g.id===null)break;g.id=null,g.object=null,g.geometry=null,g.material=null,g.group=null}}return{opaque:t,transmissive:i,transparent:r,init:o,push:c,unshift:l,finish:d,sort:u}}function p2(){let n=new WeakMap;function e(i,r){let o=n.get(i),s;return o===void 0?(s=new yw,n.set(i,[s])):r>=o.length?(s=new yw,o.push(s)):s=o[r],s}function t(){n=new WeakMap}return{get:e,dispose:t}}function m2(){let n={};return{get:function(e){if(n[e.id]!==void 0)return n[e.id];let t;switch(e.type){case"DirectionalLight":t={direction:new O,color:new st};break;case"SpotLight":t={position:new O,direction:new O,color:new st,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":t={position:new O,color:new st,distance:0,decay:0};break;case"HemisphereLight":t={direction:new O,skyColor:new st,groundColor:new st};break;case"RectAreaLight":t={color:new st,position:new O,halfWidth:new O,halfHeight:new O};break}return n[e.id]=t,t}}}function g2(){let n={};return{get:function(e){if(n[e.id]!==void 0)return n[e.id];let t;switch(e.type){case"DirectionalLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new ot};break;case"SpotLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new ot};break;case"PointLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new ot,shadowCameraNear:1,shadowCameraFar:1e3};break}return n[e.id]=t,t}}}var v2=0;function y2(n,e){return(e.castShadow?2:0)-(n.castShadow?2:0)+(e.map?1:0)-(n.map?1:0)}function _2(n){let e=new m2,t=g2(),i={version:0,hash:{directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let l=0;l<9;l++)i.probe.push(new O);let r=new O,o=new Ot,s=new Ot;function a(l){let u=0,d=0,f=0;for(let M=0;M<9;M++)i.probe[M].set(0,0,0);let h=0,g=0,_=0,m=0,p=0,b=0,w=0,S=0,D=0,C=0,A=0;l.sort(y2);for(let M=0,j=l.length;M<j;M++){let T=l[M],L=T.color,k=T.intensity,G=T.distance,B=null;if(T.shadow&&T.shadow.map&&(T.shadow.map.texture.format===fs?B=T.shadow.map.texture:B=T.shadow.map.depthTexture||T.shadow.map.texture),T.isAmbientLight)u+=L.r*k,d+=L.g*k,f+=L.b*k;else if(T.isLightProbe){for(let H=0;H<9;H++)i.probe[H].addScaledVector(T.sh.coefficients[H],k);A++}else if(T.isDirectionalLight){let H=e.get(T);if(H.color.copy(T.color).multiplyScalar(T.intensity),T.castShadow){let F=T.shadow,ee=t.get(T);ee.shadowIntensity=F.intensity,ee.shadowBias=F.bias,ee.shadowNormalBias=F.normalBias,ee.shadowRadius=F.radius,ee.shadowMapSize=F.mapSize,i.directionalShadow[h]=ee,i.directionalShadowMap[h]=B,i.directionalShadowMatrix[h]=T.shadow.matrix,b++}i.directional[h]=H,h++}else if(T.isSpotLight){let H=e.get(T);H.position.setFromMatrixPosition(T.matrixWorld),H.color.copy(L).multiplyScalar(k),H.distance=G,H.coneCos=Math.cos(T.angle),H.penumbraCos=Math.cos(T.angle*(1-T.penumbra)),H.decay=T.decay,i.spot[_]=H;let F=T.shadow;if(T.map&&(i.spotLightMap[D]=T.map,D++,F.updateMatrices(T),T.castShadow&&C++),i.spotLightMatrix[_]=F.matrix,T.castShadow){let ee=t.get(T);ee.shadowIntensity=F.intensity,ee.shadowBias=F.bias,ee.shadowNormalBias=F.normalBias,ee.shadowRadius=F.radius,ee.shadowMapSize=F.mapSize,i.spotShadow[_]=ee,i.spotShadowMap[_]=B,S++}_++}else if(T.isRectAreaLight){let H=e.get(T);H.color.copy(L).multiplyScalar(k),H.halfWidth.set(T.width*.5,0,0),H.halfHeight.set(0,T.height*.5,0),i.rectArea[m]=H,m++}else if(T.isPointLight){let H=e.get(T);if(H.color.copy(T.color).multiplyScalar(T.intensity),H.distance=T.distance,H.decay=T.decay,T.castShadow){let F=T.shadow,ee=t.get(T);ee.shadowIntensity=F.intensity,ee.shadowBias=F.bias,ee.shadowNormalBias=F.normalBias,ee.shadowRadius=F.radius,ee.shadowMapSize=F.mapSize,ee.shadowCameraNear=F.camera.near,ee.shadowCameraFar=F.camera.far,i.pointShadow[g]=ee,i.pointShadowMap[g]=B,i.pointShadowMatrix[g]=T.shadow.matrix,w++}i.point[g]=H,g++}else if(T.isHemisphereLight){let H=e.get(T);H.skyColor.copy(T.color).multiplyScalar(k),H.groundColor.copy(T.groundColor).multiplyScalar(k),i.hemi[p]=H,p++}}m>0&&(n.has("OES_texture_float_linear")===!0?(i.rectAreaLTC1=le.LTC_FLOAT_1,i.rectAreaLTC2=le.LTC_FLOAT_2):(i.rectAreaLTC1=le.LTC_HALF_1,i.rectAreaLTC2=le.LTC_HALF_2)),i.ambient[0]=u,i.ambient[1]=d,i.ambient[2]=f;let y=i.hash;(y.directionalLength!==h||y.pointLength!==g||y.spotLength!==_||y.rectAreaLength!==m||y.hemiLength!==p||y.numDirectionalShadows!==b||y.numPointShadows!==w||y.numSpotShadows!==S||y.numSpotMaps!==D||y.numLightProbes!==A)&&(i.directional.length=h,i.spot.length=_,i.rectArea.length=m,i.point.length=g,i.hemi.length=p,i.directionalShadow.length=b,i.directionalShadowMap.length=b,i.pointShadow.length=w,i.pointShadowMap.length=w,i.spotShadow.length=S,i.spotShadowMap.length=S,i.directionalShadowMatrix.length=b,i.pointShadowMatrix.length=w,i.spotLightMatrix.length=S+D-C,i.spotLightMap.length=D,i.numSpotLightShadowsWithMaps=C,i.numLightProbes=A,y.directionalLength=h,y.pointLength=g,y.spotLength=_,y.rectAreaLength=m,y.hemiLength=p,y.numDirectionalShadows=b,y.numPointShadows=w,y.numSpotShadows=S,y.numSpotMaps=D,y.numLightProbes=A,i.version=v2++)}function c(l,u){let d=0,f=0,h=0,g=0,_=0,m=u.matrixWorldInverse;for(let p=0,b=l.length;p<b;p++){let w=l[p];if(w.isDirectionalLight){let S=i.directional[d];S.direction.setFromMatrixPosition(w.matrixWorld),r.setFromMatrixPosition(w.target.matrixWorld),S.direction.sub(r),S.direction.transformDirection(m),d++}else if(w.isSpotLight){let S=i.spot[h];S.position.setFromMatrixPosition(w.matrixWorld),S.position.applyMatrix4(m),S.direction.setFromMatrixPosition(w.matrixWorld),r.setFromMatrixPosition(w.target.matrixWorld),S.direction.sub(r),S.direction.transformDirection(m),h++}else if(w.isRectAreaLight){let S=i.rectArea[g];S.position.setFromMatrixPosition(w.matrixWorld),S.position.applyMatrix4(m),s.identity(),o.copy(w.matrixWorld),o.premultiply(m),s.extractRotation(o),S.halfWidth.set(w.width*.5,0,0),S.halfHeight.set(0,w.height*.5,0),S.halfWidth.applyMatrix4(s),S.halfHeight.applyMatrix4(s),g++}else if(w.isPointLight){let S=i.point[f];S.position.setFromMatrixPosition(w.matrixWorld),S.position.applyMatrix4(m),f++}else if(w.isHemisphereLight){let S=i.hemi[_];S.direction.setFromMatrixPosition(w.matrixWorld),S.direction.transformDirection(m),_++}}}return{setup:a,setupView:c,state:i}}function _w(n){let e=new _2(n),t=[],i=[];function r(u){l.camera=u,t.length=0,i.length=0}function o(u){t.push(u)}function s(u){i.push(u)}function a(){e.setup(t)}function c(u){e.setupView(t,u)}let l={lightsArray:t,shadowsArray:i,camera:null,lights:e,transmissionRenderTarget:{}};return{init:r,state:l,setupLights:a,setupLightsView:c,pushLight:o,pushShadow:s}}function x2(n){let e=new WeakMap;function t(r,o=0){let s=e.get(r),a;return s===void 0?(a=new _w(n),e.set(r,[a])):o>=s.length?(a=new _w(n),s.push(a)):a=s[o],a}function i(){e=new WeakMap}return{get:t,dispose:i}}var b2=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,M2=`uniform sampler2D shadow_pass;
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
}`,S2=[new O(1,0,0),new O(-1,0,0),new O(0,1,0),new O(0,-1,0),new O(0,0,1),new O(0,0,-1)],E2=[new O(0,-1,0),new O(0,-1,0),new O(0,0,1),new O(0,0,-1),new O(0,-1,0),new O(0,-1,0)],xw=new Ot,Vl=new O,x0=new O;function w2(n,e,t){let i=new Pa,r=new ot,o=new ot,s=new Ht,a=new ph,c=new mh,l={},u=t.maxTextureSize,d={[Tr]:Un,[Un]:Tr,[Ki]:Ki},f=new oi({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new ot},radius:{value:4}},vertexShader:b2,fragmentShader:M2}),h=f.clone();h.defines.HORIZONTAL_PASS=1;let g=new wn;g.setAttribute("position",new kn(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));let _=new un(g,f),m=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=Rl;let p=this.type;this.render=function(C,A,y){if(m.enabled===!1||m.autoUpdate===!1&&m.needsUpdate===!1||C.length===0)return;this.type===vE&&(ke("WebGLShadowMap: PCFSoftShadowMap has been deprecated. Using PCFShadowMap instead."),this.type=Rl);let M=n.getRenderTarget(),j=n.getActiveCubeFace(),T=n.getActiveMipmapLevel(),L=n.state;L.setBlending(Qi),L.buffers.depth.getReversed()===!0?L.buffers.color.setClear(0,0,0,0):L.buffers.color.setClear(1,1,1,1),L.buffers.depth.setTest(!0),L.setScissorTest(!1);let k=p!==this.type;k&&A.traverse(function(G){G.material&&(Array.isArray(G.material)?G.material.forEach(B=>B.needsUpdate=!0):G.material.needsUpdate=!0)});for(let G=0,B=C.length;G<B;G++){let H=C[G],F=H.shadow;if(F===void 0){ke("WebGLShadowMap:",H,"has no shadow.");continue}if(F.autoUpdate===!1&&F.needsUpdate===!1)continue;r.copy(F.mapSize);let ee=F.getFrameExtents();r.multiply(ee),o.copy(F.mapSize),(r.x>u||r.y>u)&&(r.x>u&&(o.x=Math.floor(u/ee.x),r.x=o.x*ee.x,F.mapSize.x=o.x),r.y>u&&(o.y=Math.floor(u/ee.y),r.y=o.y*ee.y,F.mapSize.y=o.y));let Z=n.state.buffers.depth.getReversed();if(F.camera._reversedDepth=Z,F.map===null||k===!0){if(F.map!==null&&(F.map.depthTexture!==null&&(F.map.depthTexture.dispose(),F.map.depthTexture=null),F.map.dispose()),this.type===Va){if(H.isPointLight){ke("WebGLShadowMap: VSM shadow maps are not supported for PointLights. Use PCF or BasicShadowMap instead.");continue}F.map=new ri(r.x,r.y,{format:fs,type:er,minFilter:mn,magFilter:mn,generateMipmaps:!1}),F.map.texture.name=H.name+".shadowMap",F.map.depthTexture=new ho(r.x,r.y,Vi),F.map.depthTexture.name=H.name+".shadowMapDepth",F.map.depthTexture.format=Zi,F.map.depthTexture.compareFunction=null,F.map.depthTexture.minFilter=ln,F.map.depthTexture.magFilter=ln}else H.isPointLight?(F.map=new yp(r.x),F.map.depthTexture=new dh(r.x,Bi)):(F.map=new ri(r.x,r.y),F.map.depthTexture=new ho(r.x,r.y,Bi)),F.map.depthTexture.name=H.name+".shadowMap",F.map.depthTexture.format=Zi,this.type===Rl?(F.map.depthTexture.compareFunction=Z?pp:hp,F.map.depthTexture.minFilter=mn,F.map.depthTexture.magFilter=mn):(F.map.depthTexture.compareFunction=null,F.map.depthTexture.minFilter=ln,F.map.depthTexture.magFilter=ln);F.camera.updateProjectionMatrix()}let he=F.map.isWebGLCubeRenderTarget?6:1;for(let xe=0;xe<he;xe++){if(F.map.isWebGLCubeRenderTarget)n.setRenderTarget(F.map,xe),n.clear();else{xe===0&&(n.setRenderTarget(F.map),n.clear());let me=F.getViewport(xe);s.set(o.x*me.x,o.y*me.y,o.x*me.z,o.y*me.w),L.viewport(s)}if(H.isPointLight){let me=F.camera,Ye=F.matrix,Ft=H.distance||me.far;Ft!==me.far&&(me.far=Ft,me.updateProjectionMatrix()),Vl.setFromMatrixPosition(H.matrixWorld),me.position.copy(Vl),x0.copy(me.position),x0.add(S2[xe]),me.up.copy(E2[xe]),me.lookAt(x0),me.updateMatrixWorld(),Ye.makeTranslation(-Vl.x,-Vl.y,-Vl.z),xw.multiplyMatrices(me.projectionMatrix,me.matrixWorldInverse),F._frustum.setFromProjectionMatrix(xw,me.coordinateSystem,me.reversedDepth)}else F.updateMatrices(H);i=F.getFrustum(),S(A,y,F.camera,H,this.type)}F.isPointLightShadow!==!0&&this.type===Va&&b(F,y),F.needsUpdate=!1}p=this.type,m.needsUpdate=!1,n.setRenderTarget(M,j,T)};function b(C,A){let y=e.update(_);f.defines.VSM_SAMPLES!==C.blurSamples&&(f.defines.VSM_SAMPLES=C.blurSamples,h.defines.VSM_SAMPLES=C.blurSamples,f.needsUpdate=!0,h.needsUpdate=!0),C.mapPass===null&&(C.mapPass=new ri(r.x,r.y,{format:fs,type:er})),f.uniforms.shadow_pass.value=C.map.depthTexture,f.uniforms.resolution.value=C.mapSize,f.uniforms.radius.value=C.radius,n.setRenderTarget(C.mapPass),n.clear(),n.renderBufferDirect(A,null,y,f,_,null),h.uniforms.shadow_pass.value=C.mapPass.texture,h.uniforms.resolution.value=C.mapSize,h.uniforms.radius.value=C.radius,n.setRenderTarget(C.map),n.clear(),n.renderBufferDirect(A,null,y,h,_,null)}function w(C,A,y,M){let j=null,T=y.isPointLight===!0?C.customDistanceMaterial:C.customDepthMaterial;if(T!==void 0)j=T;else if(j=y.isPointLight===!0?c:a,n.localClippingEnabled&&A.clipShadows===!0&&Array.isArray(A.clippingPlanes)&&A.clippingPlanes.length!==0||A.displacementMap&&A.displacementScale!==0||A.alphaMap&&A.alphaTest>0||A.map&&A.alphaTest>0||A.alphaToCoverage===!0){let L=j.uuid,k=A.uuid,G=l[L];G===void 0&&(G={},l[L]=G);let B=G[k];B===void 0&&(B=j.clone(),G[k]=B,A.addEventListener("dispose",D)),j=B}if(j.visible=A.visible,j.wireframe=A.wireframe,M===Va?j.side=A.shadowSide!==null?A.shadowSide:A.side:j.side=A.shadowSide!==null?A.shadowSide:d[A.side],j.alphaMap=A.alphaMap,j.alphaTest=A.alphaToCoverage===!0?.5:A.alphaTest,j.map=A.map,j.clipShadows=A.clipShadows,j.clippingPlanes=A.clippingPlanes,j.clipIntersection=A.clipIntersection,j.displacementMap=A.displacementMap,j.displacementScale=A.displacementScale,j.displacementBias=A.displacementBias,j.wireframeLinewidth=A.wireframeLinewidth,j.linewidth=A.linewidth,y.isPointLight===!0&&j.isMeshDistanceMaterial===!0){let L=n.properties.get(j);L.light=y}return j}function S(C,A,y,M,j){if(C.visible===!1)return;if(C.layers.test(A.layers)&&(C.isMesh||C.isLine||C.isPoints)&&(C.castShadow||C.receiveShadow&&j===Va)&&(!C.frustumCulled||i.intersectsObject(C))){C.modelViewMatrix.multiplyMatrices(y.matrixWorldInverse,C.matrixWorld);let k=e.update(C),G=C.material;if(Array.isArray(G)){let B=k.groups;for(let H=0,F=B.length;H<F;H++){let ee=B[H],Z=G[ee.materialIndex];if(Z&&Z.visible){let he=w(C,Z,M,j);C.onBeforeShadow(n,C,A,y,k,he,ee),n.renderBufferDirect(y,null,k,he,C,ee),C.onAfterShadow(n,C,A,y,k,he,ee)}}}else if(G.visible){let B=w(C,G,M,j);C.onBeforeShadow(n,C,A,y,k,B,null),n.renderBufferDirect(y,null,k,B,C,null),C.onAfterShadow(n,C,A,y,k,B,null)}}let L=C.children;for(let k=0,G=L.length;k<G;k++)S(L[k],A,y,M,j)}function D(C){C.target.removeEventListener("dispose",D);for(let y in l){let M=l[y],j=C.target.uuid;j in M&&(M[j].dispose(),delete M[j])}}}function C2(n,e){function t(){let R=!1,oe=new Ht,ne=null,ye=new Ht(0,0,0,0);return{setMask:function(K){ne!==K&&!R&&(n.colorMask(K,K,K,K),ne=K)},setLocked:function(K){R=K},setClear:function(K,W,Se,ze,Nt){Nt===!0&&(K*=ze,W*=ze,Se*=ze),oe.set(K,W,Se,ze),ye.equals(oe)===!1&&(n.clearColor(K,W,Se,ze),ye.copy(oe))},reset:function(){R=!1,ne=null,ye.set(-1,0,0,0)}}}function i(){let R=!1,oe=!1,ne=null,ye=null,K=null;return{setReversed:function(W){if(oe!==W){let Se=e.get("EXT_clip_control");W?Se.clipControlEXT(Se.LOWER_LEFT_EXT,Se.ZERO_TO_ONE_EXT):Se.clipControlEXT(Se.LOWER_LEFT_EXT,Se.NEGATIVE_ONE_TO_ONE_EXT),oe=W;let ze=K;K=null,this.setClear(ze)}},getReversed:function(){return oe},setTest:function(W){W?ie(n.DEPTH_TEST):se(n.DEPTH_TEST)},setMask:function(W){ne!==W&&!R&&(n.depthMask(W),ne=W)},setFunc:function(W){if(oe&&(W=ZE[W]),ye!==W){switch(W){case qf:n.depthFunc(n.NEVER);break;case Xf:n.depthFunc(n.ALWAYS);break;case Yf:n.depthFunc(n.LESS);break;case cs:n.depthFunc(n.LEQUAL);break;case Zf:n.depthFunc(n.EQUAL);break;case Jf:n.depthFunc(n.GEQUAL);break;case Kf:n.depthFunc(n.GREATER);break;case Qf:n.depthFunc(n.NOTEQUAL);break;default:n.depthFunc(n.LEQUAL)}ye=W}},setLocked:function(W){R=W},setClear:function(W){K!==W&&(K=W,oe&&(W=1-W),n.clearDepth(W))},reset:function(){R=!1,ne=null,ye=null,K=null,oe=!1}}}function r(){let R=!1,oe=null,ne=null,ye=null,K=null,W=null,Se=null,ze=null,Nt=null;return{setTest:function(bt){R||(bt?ie(n.STENCIL_TEST):se(n.STENCIL_TEST))},setMask:function(bt){oe!==bt&&!R&&(n.stencilMask(bt),oe=bt)},setFunc:function(bt,ir,rr){(ne!==bt||ye!==ir||K!==rr)&&(n.stencilFunc(bt,ir,rr),ne=bt,ye=ir,K=rr)},setOp:function(bt,ir,rr){(W!==bt||Se!==ir||ze!==rr)&&(n.stencilOp(bt,ir,rr),W=bt,Se=ir,ze=rr)},setLocked:function(bt){R=bt},setClear:function(bt){Nt!==bt&&(n.clearStencil(bt),Nt=bt)},reset:function(){R=!1,oe=null,ne=null,ye=null,K=null,W=null,Se=null,ze=null,Nt=null}}}let o=new t,s=new i,a=new r,c=new WeakMap,l=new WeakMap,u={},d={},f=new WeakMap,h=[],g=null,_=!1,m=null,p=null,b=null,w=null,S=null,D=null,C=null,A=new st(0,0,0),y=0,M=!1,j=null,T=null,L=null,k=null,G=null,B=n.getParameter(n.MAX_COMBINED_TEXTURE_IMAGE_UNITS),H=!1,F=0,ee=n.getParameter(n.VERSION);ee.indexOf("WebGL")!==-1?(F=parseFloat(/^WebGL (\d)/.exec(ee)[1]),H=F>=1):ee.indexOf("OpenGL ES")!==-1&&(F=parseFloat(/^OpenGL ES (\d)/.exec(ee)[1]),H=F>=2);let Z=null,he={},xe=n.getParameter(n.SCISSOR_BOX),me=n.getParameter(n.VIEWPORT),Ye=new Ht().fromArray(xe),Ft=new Ht().fromArray(me);function Lt(R,oe,ne,ye){let K=new Uint8Array(4),W=n.createTexture();n.bindTexture(R,W),n.texParameteri(R,n.TEXTURE_MIN_FILTER,n.NEAREST),n.texParameteri(R,n.TEXTURE_MAG_FILTER,n.NEAREST);for(let Se=0;Se<ne;Se++)R===n.TEXTURE_3D||R===n.TEXTURE_2D_ARRAY?n.texImage3D(oe,0,n.RGBA,1,1,ye,0,n.RGBA,n.UNSIGNED_BYTE,K):n.texImage2D(oe+Se,0,n.RGBA,1,1,0,n.RGBA,n.UNSIGNED_BYTE,K);return W}let X={};X[n.TEXTURE_2D]=Lt(n.TEXTURE_2D,n.TEXTURE_2D,1),X[n.TEXTURE_CUBE_MAP]=Lt(n.TEXTURE_CUBE_MAP,n.TEXTURE_CUBE_MAP_POSITIVE_X,6),X[n.TEXTURE_2D_ARRAY]=Lt(n.TEXTURE_2D_ARRAY,n.TEXTURE_2D_ARRAY,1,1),X[n.TEXTURE_3D]=Lt(n.TEXTURE_3D,n.TEXTURE_3D,1,1),o.setClear(0,0,0,1),s.setClear(1),a.setClear(0),ie(n.DEPTH_TEST),s.setFunc(cs),Je(!1),jt(Gy),ie(n.CULL_FACE),xt(Qi);function ie(R){u[R]!==!0&&(n.enable(R),u[R]=!0)}function se(R){u[R]!==!1&&(n.disable(R),u[R]=!1)}function Xe(R,oe){return d[R]!==oe?(n.bindFramebuffer(R,oe),d[R]=oe,R===n.DRAW_FRAMEBUFFER&&(d[n.FRAMEBUFFER]=oe),R===n.FRAMEBUFFER&&(d[n.DRAW_FRAMEBUFFER]=oe),!0):!1}function Oe(R,oe){let ne=h,ye=!1;if(R){ne=f.get(oe),ne===void 0&&(ne=[],f.set(oe,ne));let K=R.textures;if(ne.length!==K.length||ne[0]!==n.COLOR_ATTACHMENT0){for(let W=0,Se=K.length;W<Se;W++)ne[W]=n.COLOR_ATTACHMENT0+W;ne.length=K.length,ye=!0}}else ne[0]!==n.BACK&&(ne[0]=n.BACK,ye=!0);ye&&n.drawBuffers(ne)}function Ve(R){return g!==R?(n.useProgram(R),g=R,!0):!1}let nn={[lo]:n.FUNC_ADD,[_E]:n.FUNC_SUBTRACT,[xE]:n.FUNC_REVERSE_SUBTRACT};nn[bE]=n.MIN,nn[ME]=n.MAX;let ct={[SE]:n.ZERO,[EE]:n.ONE,[wE]:n.SRC_COLOR,[Wf]:n.SRC_ALPHA,[RE]:n.SRC_ALPHA_SATURATE,[IE]:n.DST_COLOR,[TE]:n.DST_ALPHA,[CE]:n.ONE_MINUS_SRC_COLOR,[$f]:n.ONE_MINUS_SRC_ALPHA,[AE]:n.ONE_MINUS_DST_COLOR,[DE]:n.ONE_MINUS_DST_ALPHA,[NE]:n.CONSTANT_COLOR,[PE]:n.ONE_MINUS_CONSTANT_COLOR,[OE]:n.CONSTANT_ALPHA,[LE]:n.ONE_MINUS_CONSTANT_ALPHA};function xt(R,oe,ne,ye,K,W,Se,ze,Nt,bt){if(R===Qi){_===!0&&(se(n.BLEND),_=!1);return}if(_===!1&&(ie(n.BLEND),_=!0),R!==yE){if(R!==m||bt!==M){if((p!==lo||S!==lo)&&(n.blendEquation(n.FUNC_ADD),p=lo,S=lo),bt)switch(R){case as:n.blendFuncSeparate(n.ONE,n.ONE_MINUS_SRC_ALPHA,n.ONE,n.ONE_MINUS_SRC_ALPHA);break;case jy:n.blendFunc(n.ONE,n.ONE);break;case Wy:n.blendFuncSeparate(n.ZERO,n.ONE_MINUS_SRC_COLOR,n.ZERO,n.ONE);break;case $y:n.blendFuncSeparate(n.DST_COLOR,n.ONE_MINUS_SRC_ALPHA,n.ZERO,n.ONE);break;default:Fe("WebGLState: Invalid blending: ",R);break}else switch(R){case as:n.blendFuncSeparate(n.SRC_ALPHA,n.ONE_MINUS_SRC_ALPHA,n.ONE,n.ONE_MINUS_SRC_ALPHA);break;case jy:n.blendFuncSeparate(n.SRC_ALPHA,n.ONE,n.ONE,n.ONE);break;case Wy:Fe("WebGLState: SubtractiveBlending requires material.premultipliedAlpha = true");break;case $y:Fe("WebGLState: MultiplyBlending requires material.premultipliedAlpha = true");break;default:Fe("WebGLState: Invalid blending: ",R);break}b=null,w=null,D=null,C=null,A.set(0,0,0),y=0,m=R,M=bt}return}K=K||oe,W=W||ne,Se=Se||ye,(oe!==p||K!==S)&&(n.blendEquationSeparate(nn[oe],nn[K]),p=oe,S=K),(ne!==b||ye!==w||W!==D||Se!==C)&&(n.blendFuncSeparate(ct[ne],ct[ye],ct[W],ct[Se]),b=ne,w=ye,D=W,C=Se),(ze.equals(A)===!1||Nt!==y)&&(n.blendColor(ze.r,ze.g,ze.b,Nt),A.copy(ze),y=Nt),m=R,M=!1}function Dt(R,oe){R.side===Ki?se(n.CULL_FACE):ie(n.CULL_FACE);let ne=R.side===Un;oe&&(ne=!ne),Je(ne),R.blending===as&&R.transparent===!1?xt(Qi):xt(R.blending,R.blendEquation,R.blendSrc,R.blendDst,R.blendEquationAlpha,R.blendSrcAlpha,R.blendDstAlpha,R.blendColor,R.blendAlpha,R.premultipliedAlpha),s.setFunc(R.depthFunc),s.setTest(R.depthTest),s.setMask(R.depthWrite),o.setMask(R.colorWrite);let ye=R.stencilWrite;a.setTest(ye),ye&&(a.setMask(R.stencilWriteMask),a.setFunc(R.stencilFunc,R.stencilRef,R.stencilFuncMask),a.setOp(R.stencilFail,R.stencilZFail,R.stencilZPass)),qt(R.polygonOffset,R.polygonOffsetFactor,R.polygonOffsetUnits),R.alphaToCoverage===!0?ie(n.SAMPLE_ALPHA_TO_COVERAGE):se(n.SAMPLE_ALPHA_TO_COVERAGE)}function Je(R){j!==R&&(R?n.frontFace(n.CW):n.frontFace(n.CCW),j=R)}function jt(R){R!==mE?(ie(n.CULL_FACE),R!==T&&(R===Gy?n.cullFace(n.BACK):R===gE?n.cullFace(n.FRONT):n.cullFace(n.FRONT_AND_BACK))):se(n.CULL_FACE),T=R}function I(R){R!==L&&(H&&n.lineWidth(R),L=R)}function qt(R,oe,ne){R?(ie(n.POLYGON_OFFSET_FILL),(k!==oe||G!==ne)&&(k=oe,G=ne,s.getReversed()&&(oe=-oe),n.polygonOffset(oe,ne))):se(n.POLYGON_OFFSET_FILL)}function pt(R){R?ie(n.SCISSOR_TEST):se(n.SCISSOR_TEST)}function Rt(R){R===void 0&&(R=n.TEXTURE0+B-1),Z!==R&&(n.activeTexture(R),Z=R)}function Ce(R,oe,ne){ne===void 0&&(Z===null?ne=n.TEXTURE0+B-1:ne=Z);let ye=he[ne];ye===void 0&&(ye={type:void 0,texture:void 0},he[ne]=ye),(ye.type!==R||ye.texture!==oe)&&(Z!==ne&&(n.activeTexture(ne),Z=ne),n.bindTexture(R,oe||X[R]),ye.type=R,ye.texture=oe)}function E(){let R=he[Z];R!==void 0&&R.type!==void 0&&(n.bindTexture(R.type,null),R.type=void 0,R.texture=void 0)}function v(){try{n.compressedTexImage2D(...arguments)}catch(R){Fe("WebGLState:",R)}}function N(){try{n.compressedTexImage3D(...arguments)}catch(R){Fe("WebGLState:",R)}}function q(){try{n.texSubImage2D(...arguments)}catch(R){Fe("WebGLState:",R)}}function Y(){try{n.texSubImage3D(...arguments)}catch(R){Fe("WebGLState:",R)}}function $(){try{n.compressedTexSubImage2D(...arguments)}catch(R){Fe("WebGLState:",R)}}function be(){try{n.compressedTexSubImage3D(...arguments)}catch(R){Fe("WebGLState:",R)}}function re(){try{n.texStorage2D(...arguments)}catch(R){Fe("WebGLState:",R)}}function Ne(){try{n.texStorage3D(...arguments)}catch(R){Fe("WebGLState:",R)}}function Ue(){try{n.texImage2D(...arguments)}catch(R){Fe("WebGLState:",R)}}function J(){try{n.texImage3D(...arguments)}catch(R){Fe("WebGLState:",R)}}function te(R){Ye.equals(R)===!1&&(n.scissor(R.x,R.y,R.z,R.w),Ye.copy(R))}function Me(R){Ft.equals(R)===!1&&(n.viewport(R.x,R.y,R.z,R.w),Ft.copy(R))}function Ee(R,oe){let ne=l.get(oe);ne===void 0&&(ne=new WeakMap,l.set(oe,ne));let ye=ne.get(R);ye===void 0&&(ye=n.getUniformBlockIndex(oe,R.name),ne.set(R,ye))}function pe(R,oe){let ye=l.get(oe).get(R);c.get(oe)!==ye&&(n.uniformBlockBinding(oe,ye,R.__bindingPointIndex),c.set(oe,ye))}function Ke(){n.disable(n.BLEND),n.disable(n.CULL_FACE),n.disable(n.DEPTH_TEST),n.disable(n.POLYGON_OFFSET_FILL),n.disable(n.SCISSOR_TEST),n.disable(n.STENCIL_TEST),n.disable(n.SAMPLE_ALPHA_TO_COVERAGE),n.blendEquation(n.FUNC_ADD),n.blendFunc(n.ONE,n.ZERO),n.blendFuncSeparate(n.ONE,n.ZERO,n.ONE,n.ZERO),n.blendColor(0,0,0,0),n.colorMask(!0,!0,!0,!0),n.clearColor(0,0,0,0),n.depthMask(!0),n.depthFunc(n.LESS),s.setReversed(!1),n.clearDepth(1),n.stencilMask(4294967295),n.stencilFunc(n.ALWAYS,0,4294967295),n.stencilOp(n.KEEP,n.KEEP,n.KEEP),n.clearStencil(0),n.cullFace(n.BACK),n.frontFace(n.CCW),n.polygonOffset(0,0),n.activeTexture(n.TEXTURE0),n.bindFramebuffer(n.FRAMEBUFFER,null),n.bindFramebuffer(n.DRAW_FRAMEBUFFER,null),n.bindFramebuffer(n.READ_FRAMEBUFFER,null),n.useProgram(null),n.lineWidth(1),n.scissor(0,0,n.canvas.width,n.canvas.height),n.viewport(0,0,n.canvas.width,n.canvas.height),u={},Z=null,he={},d={},f=new WeakMap,h=[],g=null,_=!1,m=null,p=null,b=null,w=null,S=null,D=null,C=null,A=new st(0,0,0),y=0,M=!1,j=null,T=null,L=null,k=null,G=null,Ye.set(0,0,n.canvas.width,n.canvas.height),Ft.set(0,0,n.canvas.width,n.canvas.height),o.reset(),s.reset(),a.reset()}return{buffers:{color:o,depth:s,stencil:a},enable:ie,disable:se,bindFramebuffer:Xe,drawBuffers:Oe,useProgram:Ve,setBlending:xt,setMaterial:Dt,setFlipSided:Je,setCullFace:jt,setLineWidth:I,setPolygonOffset:qt,setScissorTest:pt,activeTexture:Rt,bindTexture:Ce,unbindTexture:E,compressedTexImage2D:v,compressedTexImage3D:N,texImage2D:Ue,texImage3D:J,updateUBOMapping:Ee,uniformBlockBinding:pe,texStorage2D:re,texStorage3D:Ne,texSubImage2D:q,texSubImage3D:Y,compressedTexSubImage2D:$,compressedTexSubImage3D:be,scissor:te,viewport:Me,reset:Ke}}function T2(n,e,t,i,r,o,s){let a=e.has("WEBGL_multisampled_render_to_texture")?e.get("WEBGL_multisampled_render_to_texture"):null,c=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),l=new ot,u=new WeakMap,d,f=new WeakMap,h=!1;try{h=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function g(E,v){return h?new OffscreenCanvas(E,v):pl("canvas")}function _(E,v,N){let q=1,Y=Ce(E);if((Y.width>N||Y.height>N)&&(q=N/Math.max(Y.width,Y.height)),q<1)if(typeof HTMLImageElement<"u"&&E instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&E instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&E instanceof ImageBitmap||typeof VideoFrame<"u"&&E instanceof VideoFrame){let $=Math.floor(q*Y.width),be=Math.floor(q*Y.height);d===void 0&&(d=g($,be));let re=v?g($,be):d;return re.width=$,re.height=be,re.getContext("2d").drawImage(E,0,0,$,be),ke("WebGLRenderer: Texture has been resized from ("+Y.width+"x"+Y.height+") to ("+$+"x"+be+")."),re}else return"data"in E&&ke("WebGLRenderer: Image in DataTexture is too big ("+Y.width+"x"+Y.height+")."),E;return E}function m(E){return E.generateMipmaps}function p(E){n.generateMipmap(E)}function b(E){return E.isWebGLCubeRenderTarget?n.TEXTURE_CUBE_MAP:E.isWebGL3DRenderTarget?n.TEXTURE_3D:E.isWebGLArrayRenderTarget||E.isCompressedArrayTexture?n.TEXTURE_2D_ARRAY:n.TEXTURE_2D}function w(E,v,N,q,Y=!1){if(E!==null){if(n[E]!==void 0)return n[E];ke("WebGLRenderer: Attempt to use non-existing WebGL internal format '"+E+"'")}let $=v;if(v===n.RED&&(N===n.FLOAT&&($=n.R32F),N===n.HALF_FLOAT&&($=n.R16F),N===n.UNSIGNED_BYTE&&($=n.R8)),v===n.RED_INTEGER&&(N===n.UNSIGNED_BYTE&&($=n.R8UI),N===n.UNSIGNED_SHORT&&($=n.R16UI),N===n.UNSIGNED_INT&&($=n.R32UI),N===n.BYTE&&($=n.R8I),N===n.SHORT&&($=n.R16I),N===n.INT&&($=n.R32I)),v===n.RG&&(N===n.FLOAT&&($=n.RG32F),N===n.HALF_FLOAT&&($=n.RG16F),N===n.UNSIGNED_BYTE&&($=n.RG8)),v===n.RG_INTEGER&&(N===n.UNSIGNED_BYTE&&($=n.RG8UI),N===n.UNSIGNED_SHORT&&($=n.RG16UI),N===n.UNSIGNED_INT&&($=n.RG32UI),N===n.BYTE&&($=n.RG8I),N===n.SHORT&&($=n.RG16I),N===n.INT&&($=n.RG32I)),v===n.RGB_INTEGER&&(N===n.UNSIGNED_BYTE&&($=n.RGB8UI),N===n.UNSIGNED_SHORT&&($=n.RGB16UI),N===n.UNSIGNED_INT&&($=n.RGB32UI),N===n.BYTE&&($=n.RGB8I),N===n.SHORT&&($=n.RGB16I),N===n.INT&&($=n.RGB32I)),v===n.RGBA_INTEGER&&(N===n.UNSIGNED_BYTE&&($=n.RGBA8UI),N===n.UNSIGNED_SHORT&&($=n.RGBA16UI),N===n.UNSIGNED_INT&&($=n.RGBA32UI),N===n.BYTE&&($=n.RGBA8I),N===n.SHORT&&($=n.RGBA16I),N===n.INT&&($=n.RGBA32I)),v===n.RGB&&(N===n.UNSIGNED_INT_5_9_9_9_REV&&($=n.RGB9_E5),N===n.UNSIGNED_INT_10F_11F_11F_REV&&($=n.R11F_G11F_B10F)),v===n.RGBA){let be=Y?hl:at.getTransfer(q);N===n.FLOAT&&($=n.RGBA32F),N===n.HALF_FLOAT&&($=n.RGBA16F),N===n.UNSIGNED_BYTE&&($=be===_t?n.SRGB8_ALPHA8:n.RGBA8),N===n.UNSIGNED_SHORT_4_4_4_4&&($=n.RGBA4),N===n.UNSIGNED_SHORT_5_5_5_1&&($=n.RGB5_A1)}return($===n.R16F||$===n.R32F||$===n.RG16F||$===n.RG32F||$===n.RGBA16F||$===n.RGBA32F)&&e.get("EXT_color_buffer_float"),$}function S(E,v){let N;return E?v===null||v===Bi||v===za?N=n.DEPTH24_STENCIL8:v===Vi?N=n.DEPTH32F_STENCIL8:v===Ha&&(N=n.DEPTH24_STENCIL8,ke("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")):v===null||v===Bi||v===za?N=n.DEPTH_COMPONENT24:v===Vi?N=n.DEPTH_COMPONENT32F:v===Ha&&(N=n.DEPTH_COMPONENT16),N}function D(E,v){return m(E)===!0||E.isFramebufferTexture&&E.minFilter!==ln&&E.minFilter!==mn?Math.log2(Math.max(v.width,v.height))+1:E.mipmaps!==void 0&&E.mipmaps.length>0?E.mipmaps.length:E.isCompressedTexture&&Array.isArray(E.image)?v.mipmaps.length:1}function C(E){let v=E.target;v.removeEventListener("dispose",C),y(v),v.isVideoTexture&&u.delete(v)}function A(E){let v=E.target;v.removeEventListener("dispose",A),j(v)}function y(E){let v=i.get(E);if(v.__webglInit===void 0)return;let N=E.source,q=f.get(N);if(q){let Y=q[v.__cacheKey];Y.usedTimes--,Y.usedTimes===0&&M(E),Object.keys(q).length===0&&f.delete(N)}i.remove(E)}function M(E){let v=i.get(E);n.deleteTexture(v.__webglTexture);let N=E.source,q=f.get(N);delete q[v.__cacheKey],s.memory.textures--}function j(E){let v=i.get(E);if(E.depthTexture&&(E.depthTexture.dispose(),i.remove(E.depthTexture)),E.isWebGLCubeRenderTarget)for(let q=0;q<6;q++){if(Array.isArray(v.__webglFramebuffer[q]))for(let Y=0;Y<v.__webglFramebuffer[q].length;Y++)n.deleteFramebuffer(v.__webglFramebuffer[q][Y]);else n.deleteFramebuffer(v.__webglFramebuffer[q]);v.__webglDepthbuffer&&n.deleteRenderbuffer(v.__webglDepthbuffer[q])}else{if(Array.isArray(v.__webglFramebuffer))for(let q=0;q<v.__webglFramebuffer.length;q++)n.deleteFramebuffer(v.__webglFramebuffer[q]);else n.deleteFramebuffer(v.__webglFramebuffer);if(v.__webglDepthbuffer&&n.deleteRenderbuffer(v.__webglDepthbuffer),v.__webglMultisampledFramebuffer&&n.deleteFramebuffer(v.__webglMultisampledFramebuffer),v.__webglColorRenderbuffer)for(let q=0;q<v.__webglColorRenderbuffer.length;q++)v.__webglColorRenderbuffer[q]&&n.deleteRenderbuffer(v.__webglColorRenderbuffer[q]);v.__webglDepthRenderbuffer&&n.deleteRenderbuffer(v.__webglDepthRenderbuffer)}let N=E.textures;for(let q=0,Y=N.length;q<Y;q++){let $=i.get(N[q]);$.__webglTexture&&(n.deleteTexture($.__webglTexture),s.memory.textures--),i.remove(N[q])}i.remove(E)}let T=0;function L(){T=0}function k(){let E=T;return E>=r.maxTextures&&ke("WebGLTextures: Trying to use "+E+" texture units while this GPU supports only "+r.maxTextures),T+=1,E}function G(E){let v=[];return v.push(E.wrapS),v.push(E.wrapT),v.push(E.wrapR||0),v.push(E.magFilter),v.push(E.minFilter),v.push(E.anisotropy),v.push(E.internalFormat),v.push(E.format),v.push(E.type),v.push(E.generateMipmaps),v.push(E.premultiplyAlpha),v.push(E.flipY),v.push(E.unpackAlignment),v.push(E.colorSpace),v.join()}function B(E,v){let N=i.get(E);if(E.isVideoTexture&&pt(E),E.isRenderTargetTexture===!1&&E.isExternalTexture!==!0&&E.version>0&&N.__version!==E.version){let q=E.image;if(q===null)ke("WebGLRenderer: Texture marked for update but no image data found.");else if(q.complete===!1)ke("WebGLRenderer: Texture marked for update but image is incomplete");else{X(N,E,v);return}}else E.isExternalTexture&&(N.__webglTexture=E.sourceTexture?E.sourceTexture:null);t.bindTexture(n.TEXTURE_2D,N.__webglTexture,n.TEXTURE0+v)}function H(E,v){let N=i.get(E);if(E.isRenderTargetTexture===!1&&E.version>0&&N.__version!==E.version){X(N,E,v);return}else E.isExternalTexture&&(N.__webglTexture=E.sourceTexture?E.sourceTexture:null);t.bindTexture(n.TEXTURE_2D_ARRAY,N.__webglTexture,n.TEXTURE0+v)}function F(E,v){let N=i.get(E);if(E.isRenderTargetTexture===!1&&E.version>0&&N.__version!==E.version){X(N,E,v);return}t.bindTexture(n.TEXTURE_3D,N.__webglTexture,n.TEXTURE0+v)}function ee(E,v){let N=i.get(E);if(E.isCubeDepthTexture!==!0&&E.version>0&&N.__version!==E.version){ie(N,E,v);return}t.bindTexture(n.TEXTURE_CUBE_MAP,N.__webglTexture,n.TEXTURE0+v)}let Z={[eh]:n.REPEAT,[Yi]:n.CLAMP_TO_EDGE,[th]:n.MIRRORED_REPEAT},he={[ln]:n.NEAREST,[UE]:n.NEAREST_MIPMAP_NEAREST,[Pl]:n.NEAREST_MIPMAP_LINEAR,[mn]:n.LINEAR,[Dh]:n.LINEAR_MIPMAP_NEAREST,[yo]:n.LINEAR_MIPMAP_LINEAR},xe={[HE]:n.NEVER,[$E]:n.ALWAYS,[zE]:n.LESS,[hp]:n.LEQUAL,[GE]:n.EQUAL,[pp]:n.GEQUAL,[jE]:n.GREATER,[WE]:n.NOTEQUAL};function me(E,v){if(v.type===Vi&&e.has("OES_texture_float_linear")===!1&&(v.magFilter===mn||v.magFilter===Dh||v.magFilter===Pl||v.magFilter===yo||v.minFilter===mn||v.minFilter===Dh||v.minFilter===Pl||v.minFilter===yo)&&ke("WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),n.texParameteri(E,n.TEXTURE_WRAP_S,Z[v.wrapS]),n.texParameteri(E,n.TEXTURE_WRAP_T,Z[v.wrapT]),(E===n.TEXTURE_3D||E===n.TEXTURE_2D_ARRAY)&&n.texParameteri(E,n.TEXTURE_WRAP_R,Z[v.wrapR]),n.texParameteri(E,n.TEXTURE_MAG_FILTER,he[v.magFilter]),n.texParameteri(E,n.TEXTURE_MIN_FILTER,he[v.minFilter]),v.compareFunction&&(n.texParameteri(E,n.TEXTURE_COMPARE_MODE,n.COMPARE_REF_TO_TEXTURE),n.texParameteri(E,n.TEXTURE_COMPARE_FUNC,xe[v.compareFunction])),e.has("EXT_texture_filter_anisotropic")===!0){if(v.magFilter===ln||v.minFilter!==Pl&&v.minFilter!==yo||v.type===Vi&&e.has("OES_texture_float_linear")===!1)return;if(v.anisotropy>1||i.get(v).__currentAnisotropy){let N=e.get("EXT_texture_filter_anisotropic");n.texParameterf(E,N.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(v.anisotropy,r.getMaxAnisotropy())),i.get(v).__currentAnisotropy=v.anisotropy}}}function Ye(E,v){let N=!1;E.__webglInit===void 0&&(E.__webglInit=!0,v.addEventListener("dispose",C));let q=v.source,Y=f.get(q);Y===void 0&&(Y={},f.set(q,Y));let $=G(v);if($!==E.__cacheKey){Y[$]===void 0&&(Y[$]={texture:n.createTexture(),usedTimes:0},s.memory.textures++,N=!0),Y[$].usedTimes++;let be=Y[E.__cacheKey];be!==void 0&&(Y[E.__cacheKey].usedTimes--,be.usedTimes===0&&M(v)),E.__cacheKey=$,E.__webglTexture=Y[$].texture}return N}function Ft(E,v,N){return Math.floor(Math.floor(E/N)/v)}function Lt(E,v,N,q){let $=E.updateRanges;if($.length===0)t.texSubImage2D(n.TEXTURE_2D,0,0,0,v.width,v.height,N,q,v.data);else{$.sort((J,te)=>J.start-te.start);let be=0;for(let J=1;J<$.length;J++){let te=$[be],Me=$[J],Ee=te.start+te.count,pe=Ft(Me.start,v.width,4),Ke=Ft(te.start,v.width,4);Me.start<=Ee+1&&pe===Ke&&Ft(Me.start+Me.count-1,v.width,4)===pe?te.count=Math.max(te.count,Me.start+Me.count-te.start):(++be,$[be]=Me)}$.length=be+1;let re=n.getParameter(n.UNPACK_ROW_LENGTH),Ne=n.getParameter(n.UNPACK_SKIP_PIXELS),Ue=n.getParameter(n.UNPACK_SKIP_ROWS);n.pixelStorei(n.UNPACK_ROW_LENGTH,v.width);for(let J=0,te=$.length;J<te;J++){let Me=$[J],Ee=Math.floor(Me.start/4),pe=Math.ceil(Me.count/4),Ke=Ee%v.width,R=Math.floor(Ee/v.width),oe=pe,ne=1;n.pixelStorei(n.UNPACK_SKIP_PIXELS,Ke),n.pixelStorei(n.UNPACK_SKIP_ROWS,R),t.texSubImage2D(n.TEXTURE_2D,0,Ke,R,oe,ne,N,q,v.data)}E.clearUpdateRanges(),n.pixelStorei(n.UNPACK_ROW_LENGTH,re),n.pixelStorei(n.UNPACK_SKIP_PIXELS,Ne),n.pixelStorei(n.UNPACK_SKIP_ROWS,Ue)}}function X(E,v,N){let q=n.TEXTURE_2D;(v.isDataArrayTexture||v.isCompressedArrayTexture)&&(q=n.TEXTURE_2D_ARRAY),v.isData3DTexture&&(q=n.TEXTURE_3D);let Y=Ye(E,v),$=v.source;t.bindTexture(q,E.__webglTexture,n.TEXTURE0+N);let be=i.get($);if($.version!==be.__version||Y===!0){t.activeTexture(n.TEXTURE0+N);let re=at.getPrimaries(at.workingColorSpace),Ne=v.colorSpace===Ar?null:at.getPrimaries(v.colorSpace),Ue=v.colorSpace===Ar||re===Ne?n.NONE:n.BROWSER_DEFAULT_WEBGL;n.pixelStorei(n.UNPACK_FLIP_Y_WEBGL,v.flipY),n.pixelStorei(n.UNPACK_PREMULTIPLY_ALPHA_WEBGL,v.premultiplyAlpha),n.pixelStorei(n.UNPACK_ALIGNMENT,v.unpackAlignment),n.pixelStorei(n.UNPACK_COLORSPACE_CONVERSION_WEBGL,Ue);let J=_(v.image,!1,r.maxTextureSize);J=Rt(v,J);let te=o.convert(v.format,v.colorSpace),Me=o.convert(v.type),Ee=w(v.internalFormat,te,Me,v.colorSpace,v.isVideoTexture);me(q,v);let pe,Ke=v.mipmaps,R=v.isVideoTexture!==!0,oe=be.__version===void 0||Y===!0,ne=$.dataReady,ye=D(v,J);if(v.isDepthTexture)Ee=S(v.format===_o,v.type),oe&&(R?t.texStorage2D(n.TEXTURE_2D,1,Ee,J.width,J.height):t.texImage2D(n.TEXTURE_2D,0,Ee,J.width,J.height,0,te,Me,null));else if(v.isDataTexture)if(Ke.length>0){R&&oe&&t.texStorage2D(n.TEXTURE_2D,ye,Ee,Ke[0].width,Ke[0].height);for(let K=0,W=Ke.length;K<W;K++)pe=Ke[K],R?ne&&t.texSubImage2D(n.TEXTURE_2D,K,0,0,pe.width,pe.height,te,Me,pe.data):t.texImage2D(n.TEXTURE_2D,K,Ee,pe.width,pe.height,0,te,Me,pe.data);v.generateMipmaps=!1}else R?(oe&&t.texStorage2D(n.TEXTURE_2D,ye,Ee,J.width,J.height),ne&&Lt(v,J,te,Me)):t.texImage2D(n.TEXTURE_2D,0,Ee,J.width,J.height,0,te,Me,J.data);else if(v.isCompressedTexture)if(v.isCompressedArrayTexture){R&&oe&&t.texStorage3D(n.TEXTURE_2D_ARRAY,ye,Ee,Ke[0].width,Ke[0].height,J.depth);for(let K=0,W=Ke.length;K<W;K++)if(pe=Ke[K],v.format!==_i)if(te!==null)if(R){if(ne)if(v.layerUpdates.size>0){let Se=p0(pe.width,pe.height,v.format,v.type);for(let ze of v.layerUpdates){let Nt=pe.data.subarray(ze*Se/pe.data.BYTES_PER_ELEMENT,(ze+1)*Se/pe.data.BYTES_PER_ELEMENT);t.compressedTexSubImage3D(n.TEXTURE_2D_ARRAY,K,0,0,ze,pe.width,pe.height,1,te,Nt)}v.clearLayerUpdates()}else t.compressedTexSubImage3D(n.TEXTURE_2D_ARRAY,K,0,0,0,pe.width,pe.height,J.depth,te,pe.data)}else t.compressedTexImage3D(n.TEXTURE_2D_ARRAY,K,Ee,pe.width,pe.height,J.depth,0,pe.data,0,0);else ke("WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else R?ne&&t.texSubImage3D(n.TEXTURE_2D_ARRAY,K,0,0,0,pe.width,pe.height,J.depth,te,Me,pe.data):t.texImage3D(n.TEXTURE_2D_ARRAY,K,Ee,pe.width,pe.height,J.depth,0,te,Me,pe.data)}else{R&&oe&&t.texStorage2D(n.TEXTURE_2D,ye,Ee,Ke[0].width,Ke[0].height);for(let K=0,W=Ke.length;K<W;K++)pe=Ke[K],v.format!==_i?te!==null?R?ne&&t.compressedTexSubImage2D(n.TEXTURE_2D,K,0,0,pe.width,pe.height,te,pe.data):t.compressedTexImage2D(n.TEXTURE_2D,K,Ee,pe.width,pe.height,0,pe.data):ke("WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):R?ne&&t.texSubImage2D(n.TEXTURE_2D,K,0,0,pe.width,pe.height,te,Me,pe.data):t.texImage2D(n.TEXTURE_2D,K,Ee,pe.width,pe.height,0,te,Me,pe.data)}else if(v.isDataArrayTexture)if(R){if(oe&&t.texStorage3D(n.TEXTURE_2D_ARRAY,ye,Ee,J.width,J.height,J.depth),ne)if(v.layerUpdates.size>0){let K=p0(J.width,J.height,v.format,v.type);for(let W of v.layerUpdates){let Se=J.data.subarray(W*K/J.data.BYTES_PER_ELEMENT,(W+1)*K/J.data.BYTES_PER_ELEMENT);t.texSubImage3D(n.TEXTURE_2D_ARRAY,0,0,0,W,J.width,J.height,1,te,Me,Se)}v.clearLayerUpdates()}else t.texSubImage3D(n.TEXTURE_2D_ARRAY,0,0,0,0,J.width,J.height,J.depth,te,Me,J.data)}else t.texImage3D(n.TEXTURE_2D_ARRAY,0,Ee,J.width,J.height,J.depth,0,te,Me,J.data);else if(v.isData3DTexture)R?(oe&&t.texStorage3D(n.TEXTURE_3D,ye,Ee,J.width,J.height,J.depth),ne&&t.texSubImage3D(n.TEXTURE_3D,0,0,0,0,J.width,J.height,J.depth,te,Me,J.data)):t.texImage3D(n.TEXTURE_3D,0,Ee,J.width,J.height,J.depth,0,te,Me,J.data);else if(v.isFramebufferTexture){if(oe)if(R)t.texStorage2D(n.TEXTURE_2D,ye,Ee,J.width,J.height);else{let K=J.width,W=J.height;for(let Se=0;Se<ye;Se++)t.texImage2D(n.TEXTURE_2D,Se,Ee,K,W,0,te,Me,null),K>>=1,W>>=1}}else if(Ke.length>0){if(R&&oe){let K=Ce(Ke[0]);t.texStorage2D(n.TEXTURE_2D,ye,Ee,K.width,K.height)}for(let K=0,W=Ke.length;K<W;K++)pe=Ke[K],R?ne&&t.texSubImage2D(n.TEXTURE_2D,K,0,0,te,Me,pe):t.texImage2D(n.TEXTURE_2D,K,Ee,te,Me,pe);v.generateMipmaps=!1}else if(R){if(oe){let K=Ce(J);t.texStorage2D(n.TEXTURE_2D,ye,Ee,K.width,K.height)}ne&&t.texSubImage2D(n.TEXTURE_2D,0,0,0,te,Me,J)}else t.texImage2D(n.TEXTURE_2D,0,Ee,te,Me,J);m(v)&&p(q),be.__version=$.version,v.onUpdate&&v.onUpdate(v)}E.__version=v.version}function ie(E,v,N){if(v.image.length!==6)return;let q=Ye(E,v),Y=v.source;t.bindTexture(n.TEXTURE_CUBE_MAP,E.__webglTexture,n.TEXTURE0+N);let $=i.get(Y);if(Y.version!==$.__version||q===!0){t.activeTexture(n.TEXTURE0+N);let be=at.getPrimaries(at.workingColorSpace),re=v.colorSpace===Ar?null:at.getPrimaries(v.colorSpace),Ne=v.colorSpace===Ar||be===re?n.NONE:n.BROWSER_DEFAULT_WEBGL;n.pixelStorei(n.UNPACK_FLIP_Y_WEBGL,v.flipY),n.pixelStorei(n.UNPACK_PREMULTIPLY_ALPHA_WEBGL,v.premultiplyAlpha),n.pixelStorei(n.UNPACK_ALIGNMENT,v.unpackAlignment),n.pixelStorei(n.UNPACK_COLORSPACE_CONVERSION_WEBGL,Ne);let Ue=v.isCompressedTexture||v.image[0].isCompressedTexture,J=v.image[0]&&v.image[0].isDataTexture,te=[];for(let W=0;W<6;W++)!Ue&&!J?te[W]=_(v.image[W],!0,r.maxCubemapSize):te[W]=J?v.image[W].image:v.image[W],te[W]=Rt(v,te[W]);let Me=te[0],Ee=o.convert(v.format,v.colorSpace),pe=o.convert(v.type),Ke=w(v.internalFormat,Ee,pe,v.colorSpace),R=v.isVideoTexture!==!0,oe=$.__version===void 0||q===!0,ne=Y.dataReady,ye=D(v,Me);me(n.TEXTURE_CUBE_MAP,v);let K;if(Ue){R&&oe&&t.texStorage2D(n.TEXTURE_CUBE_MAP,ye,Ke,Me.width,Me.height);for(let W=0;W<6;W++){K=te[W].mipmaps;for(let Se=0;Se<K.length;Se++){let ze=K[Se];v.format!==_i?Ee!==null?R?ne&&t.compressedTexSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+W,Se,0,0,ze.width,ze.height,Ee,ze.data):t.compressedTexImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+W,Se,Ke,ze.width,ze.height,0,ze.data):ke("WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):R?ne&&t.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+W,Se,0,0,ze.width,ze.height,Ee,pe,ze.data):t.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+W,Se,Ke,ze.width,ze.height,0,Ee,pe,ze.data)}}}else{if(K=v.mipmaps,R&&oe){K.length>0&&ye++;let W=Ce(te[0]);t.texStorage2D(n.TEXTURE_CUBE_MAP,ye,Ke,W.width,W.height)}for(let W=0;W<6;W++)if(J){R?ne&&t.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+W,0,0,0,te[W].width,te[W].height,Ee,pe,te[W].data):t.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+W,0,Ke,te[W].width,te[W].height,0,Ee,pe,te[W].data);for(let Se=0;Se<K.length;Se++){let Nt=K[Se].image[W].image;R?ne&&t.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+W,Se+1,0,0,Nt.width,Nt.height,Ee,pe,Nt.data):t.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+W,Se+1,Ke,Nt.width,Nt.height,0,Ee,pe,Nt.data)}}else{R?ne&&t.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+W,0,0,0,Ee,pe,te[W]):t.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+W,0,Ke,Ee,pe,te[W]);for(let Se=0;Se<K.length;Se++){let ze=K[Se];R?ne&&t.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+W,Se+1,0,0,Ee,pe,ze.image[W]):t.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+W,Se+1,Ke,Ee,pe,ze.image[W])}}}m(v)&&p(n.TEXTURE_CUBE_MAP),$.__version=Y.version,v.onUpdate&&v.onUpdate(v)}E.__version=v.version}function se(E,v,N,q,Y,$){let be=o.convert(N.format,N.colorSpace),re=o.convert(N.type),Ne=w(N.internalFormat,be,re,N.colorSpace),Ue=i.get(v),J=i.get(N);if(J.__renderTarget=v,!Ue.__hasExternalTextures){let te=Math.max(1,v.width>>$),Me=Math.max(1,v.height>>$);Y===n.TEXTURE_3D||Y===n.TEXTURE_2D_ARRAY?t.texImage3D(Y,$,Ne,te,Me,v.depth,0,be,re,null):t.texImage2D(Y,$,Ne,te,Me,0,be,re,null)}t.bindFramebuffer(n.FRAMEBUFFER,E),qt(v)?a.framebufferTexture2DMultisampleEXT(n.FRAMEBUFFER,q,Y,J.__webglTexture,0,I(v)):(Y===n.TEXTURE_2D||Y>=n.TEXTURE_CUBE_MAP_POSITIVE_X&&Y<=n.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&n.framebufferTexture2D(n.FRAMEBUFFER,q,Y,J.__webglTexture,$),t.bindFramebuffer(n.FRAMEBUFFER,null)}function Xe(E,v,N){if(n.bindRenderbuffer(n.RENDERBUFFER,E),v.depthBuffer){let q=v.depthTexture,Y=q&&q.isDepthTexture?q.type:null,$=S(v.stencilBuffer,Y),be=v.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT;qt(v)?a.renderbufferStorageMultisampleEXT(n.RENDERBUFFER,I(v),$,v.width,v.height):N?n.renderbufferStorageMultisample(n.RENDERBUFFER,I(v),$,v.width,v.height):n.renderbufferStorage(n.RENDERBUFFER,$,v.width,v.height),n.framebufferRenderbuffer(n.FRAMEBUFFER,be,n.RENDERBUFFER,E)}else{let q=v.textures;for(let Y=0;Y<q.length;Y++){let $=q[Y],be=o.convert($.format,$.colorSpace),re=o.convert($.type),Ne=w($.internalFormat,be,re,$.colorSpace);qt(v)?a.renderbufferStorageMultisampleEXT(n.RENDERBUFFER,I(v),Ne,v.width,v.height):N?n.renderbufferStorageMultisample(n.RENDERBUFFER,I(v),Ne,v.width,v.height):n.renderbufferStorage(n.RENDERBUFFER,Ne,v.width,v.height)}}n.bindRenderbuffer(n.RENDERBUFFER,null)}function Oe(E,v,N){let q=v.isWebGLCubeRenderTarget===!0;if(t.bindFramebuffer(n.FRAMEBUFFER,E),!(v.depthTexture&&v.depthTexture.isDepthTexture))throw new Error("renderTarget.depthTexture must be an instance of THREE.DepthTexture");let Y=i.get(v.depthTexture);if(Y.__renderTarget=v,(!Y.__webglTexture||v.depthTexture.image.width!==v.width||v.depthTexture.image.height!==v.height)&&(v.depthTexture.image.width=v.width,v.depthTexture.image.height=v.height,v.depthTexture.needsUpdate=!0),q){if(Y.__webglInit===void 0&&(Y.__webglInit=!0,v.depthTexture.addEventListener("dispose",C)),Y.__webglTexture===void 0){Y.__webglTexture=n.createTexture(),t.bindTexture(n.TEXTURE_CUBE_MAP,Y.__webglTexture),me(n.TEXTURE_CUBE_MAP,v.depthTexture);let Ue=o.convert(v.depthTexture.format),J=o.convert(v.depthTexture.type),te;v.depthTexture.format===Zi?te=n.DEPTH_COMPONENT24:v.depthTexture.format===_o&&(te=n.DEPTH24_STENCIL8);for(let Me=0;Me<6;Me++)n.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+Me,0,te,v.width,v.height,0,Ue,J,null)}}else B(v.depthTexture,0);let $=Y.__webglTexture,be=I(v),re=q?n.TEXTURE_CUBE_MAP_POSITIVE_X+N:n.TEXTURE_2D,Ne=v.depthTexture.format===_o?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT;if(v.depthTexture.format===Zi)qt(v)?a.framebufferTexture2DMultisampleEXT(n.FRAMEBUFFER,Ne,re,$,0,be):n.framebufferTexture2D(n.FRAMEBUFFER,Ne,re,$,0);else if(v.depthTexture.format===_o)qt(v)?a.framebufferTexture2DMultisampleEXT(n.FRAMEBUFFER,Ne,re,$,0,be):n.framebufferTexture2D(n.FRAMEBUFFER,Ne,re,$,0);else throw new Error("Unknown depthTexture format")}function Ve(E){let v=i.get(E),N=E.isWebGLCubeRenderTarget===!0;if(v.__boundDepthTexture!==E.depthTexture){let q=E.depthTexture;if(v.__depthDisposeCallback&&v.__depthDisposeCallback(),q){let Y=()=>{delete v.__boundDepthTexture,delete v.__depthDisposeCallback,q.removeEventListener("dispose",Y)};q.addEventListener("dispose",Y),v.__depthDisposeCallback=Y}v.__boundDepthTexture=q}if(E.depthTexture&&!v.__autoAllocateDepthBuffer)if(N)for(let q=0;q<6;q++)Oe(v.__webglFramebuffer[q],E,q);else{let q=E.texture.mipmaps;q&&q.length>0?Oe(v.__webglFramebuffer[0],E,0):Oe(v.__webglFramebuffer,E,0)}else if(N){v.__webglDepthbuffer=[];for(let q=0;q<6;q++)if(t.bindFramebuffer(n.FRAMEBUFFER,v.__webglFramebuffer[q]),v.__webglDepthbuffer[q]===void 0)v.__webglDepthbuffer[q]=n.createRenderbuffer(),Xe(v.__webglDepthbuffer[q],E,!1);else{let Y=E.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT,$=v.__webglDepthbuffer[q];n.bindRenderbuffer(n.RENDERBUFFER,$),n.framebufferRenderbuffer(n.FRAMEBUFFER,Y,n.RENDERBUFFER,$)}}else{let q=E.texture.mipmaps;if(q&&q.length>0?t.bindFramebuffer(n.FRAMEBUFFER,v.__webglFramebuffer[0]):t.bindFramebuffer(n.FRAMEBUFFER,v.__webglFramebuffer),v.__webglDepthbuffer===void 0)v.__webglDepthbuffer=n.createRenderbuffer(),Xe(v.__webglDepthbuffer,E,!1);else{let Y=E.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT,$=v.__webglDepthbuffer;n.bindRenderbuffer(n.RENDERBUFFER,$),n.framebufferRenderbuffer(n.FRAMEBUFFER,Y,n.RENDERBUFFER,$)}}t.bindFramebuffer(n.FRAMEBUFFER,null)}function nn(E,v,N){let q=i.get(E);v!==void 0&&se(q.__webglFramebuffer,E,E.texture,n.COLOR_ATTACHMENT0,n.TEXTURE_2D,0),N!==void 0&&Ve(E)}function ct(E){let v=E.texture,N=i.get(E),q=i.get(v);E.addEventListener("dispose",A);let Y=E.textures,$=E.isWebGLCubeRenderTarget===!0,be=Y.length>1;if(be||(q.__webglTexture===void 0&&(q.__webglTexture=n.createTexture()),q.__version=v.version,s.memory.textures++),$){N.__webglFramebuffer=[];for(let re=0;re<6;re++)if(v.mipmaps&&v.mipmaps.length>0){N.__webglFramebuffer[re]=[];for(let Ne=0;Ne<v.mipmaps.length;Ne++)N.__webglFramebuffer[re][Ne]=n.createFramebuffer()}else N.__webglFramebuffer[re]=n.createFramebuffer()}else{if(v.mipmaps&&v.mipmaps.length>0){N.__webglFramebuffer=[];for(let re=0;re<v.mipmaps.length;re++)N.__webglFramebuffer[re]=n.createFramebuffer()}else N.__webglFramebuffer=n.createFramebuffer();if(be)for(let re=0,Ne=Y.length;re<Ne;re++){let Ue=i.get(Y[re]);Ue.__webglTexture===void 0&&(Ue.__webglTexture=n.createTexture(),s.memory.textures++)}if(E.samples>0&&qt(E)===!1){N.__webglMultisampledFramebuffer=n.createFramebuffer(),N.__webglColorRenderbuffer=[],t.bindFramebuffer(n.FRAMEBUFFER,N.__webglMultisampledFramebuffer);for(let re=0;re<Y.length;re++){let Ne=Y[re];N.__webglColorRenderbuffer[re]=n.createRenderbuffer(),n.bindRenderbuffer(n.RENDERBUFFER,N.__webglColorRenderbuffer[re]);let Ue=o.convert(Ne.format,Ne.colorSpace),J=o.convert(Ne.type),te=w(Ne.internalFormat,Ue,J,Ne.colorSpace,E.isXRRenderTarget===!0),Me=I(E);n.renderbufferStorageMultisample(n.RENDERBUFFER,Me,te,E.width,E.height),n.framebufferRenderbuffer(n.FRAMEBUFFER,n.COLOR_ATTACHMENT0+re,n.RENDERBUFFER,N.__webglColorRenderbuffer[re])}n.bindRenderbuffer(n.RENDERBUFFER,null),E.depthBuffer&&(N.__webglDepthRenderbuffer=n.createRenderbuffer(),Xe(N.__webglDepthRenderbuffer,E,!0)),t.bindFramebuffer(n.FRAMEBUFFER,null)}}if($){t.bindTexture(n.TEXTURE_CUBE_MAP,q.__webglTexture),me(n.TEXTURE_CUBE_MAP,v);for(let re=0;re<6;re++)if(v.mipmaps&&v.mipmaps.length>0)for(let Ne=0;Ne<v.mipmaps.length;Ne++)se(N.__webglFramebuffer[re][Ne],E,v,n.COLOR_ATTACHMENT0,n.TEXTURE_CUBE_MAP_POSITIVE_X+re,Ne);else se(N.__webglFramebuffer[re],E,v,n.COLOR_ATTACHMENT0,n.TEXTURE_CUBE_MAP_POSITIVE_X+re,0);m(v)&&p(n.TEXTURE_CUBE_MAP),t.unbindTexture()}else if(be){for(let re=0,Ne=Y.length;re<Ne;re++){let Ue=Y[re],J=i.get(Ue),te=n.TEXTURE_2D;(E.isWebGL3DRenderTarget||E.isWebGLArrayRenderTarget)&&(te=E.isWebGL3DRenderTarget?n.TEXTURE_3D:n.TEXTURE_2D_ARRAY),t.bindTexture(te,J.__webglTexture),me(te,Ue),se(N.__webglFramebuffer,E,Ue,n.COLOR_ATTACHMENT0+re,te,0),m(Ue)&&p(te)}t.unbindTexture()}else{let re=n.TEXTURE_2D;if((E.isWebGL3DRenderTarget||E.isWebGLArrayRenderTarget)&&(re=E.isWebGL3DRenderTarget?n.TEXTURE_3D:n.TEXTURE_2D_ARRAY),t.bindTexture(re,q.__webglTexture),me(re,v),v.mipmaps&&v.mipmaps.length>0)for(let Ne=0;Ne<v.mipmaps.length;Ne++)se(N.__webglFramebuffer[Ne],E,v,n.COLOR_ATTACHMENT0,re,Ne);else se(N.__webglFramebuffer,E,v,n.COLOR_ATTACHMENT0,re,0);m(v)&&p(re),t.unbindTexture()}E.depthBuffer&&Ve(E)}function xt(E){let v=E.textures;for(let N=0,q=v.length;N<q;N++){let Y=v[N];if(m(Y)){let $=b(E),be=i.get(Y).__webglTexture;t.bindTexture($,be),p($),t.unbindTexture()}}}let Dt=[],Je=[];function jt(E){if(E.samples>0){if(qt(E)===!1){let v=E.textures,N=E.width,q=E.height,Y=n.COLOR_BUFFER_BIT,$=E.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT,be=i.get(E),re=v.length>1;if(re)for(let Ue=0;Ue<v.length;Ue++)t.bindFramebuffer(n.FRAMEBUFFER,be.__webglMultisampledFramebuffer),n.framebufferRenderbuffer(n.FRAMEBUFFER,n.COLOR_ATTACHMENT0+Ue,n.RENDERBUFFER,null),t.bindFramebuffer(n.FRAMEBUFFER,be.__webglFramebuffer),n.framebufferTexture2D(n.DRAW_FRAMEBUFFER,n.COLOR_ATTACHMENT0+Ue,n.TEXTURE_2D,null,0);t.bindFramebuffer(n.READ_FRAMEBUFFER,be.__webglMultisampledFramebuffer);let Ne=E.texture.mipmaps;Ne&&Ne.length>0?t.bindFramebuffer(n.DRAW_FRAMEBUFFER,be.__webglFramebuffer[0]):t.bindFramebuffer(n.DRAW_FRAMEBUFFER,be.__webglFramebuffer);for(let Ue=0;Ue<v.length;Ue++){if(E.resolveDepthBuffer&&(E.depthBuffer&&(Y|=n.DEPTH_BUFFER_BIT),E.stencilBuffer&&E.resolveStencilBuffer&&(Y|=n.STENCIL_BUFFER_BIT)),re){n.framebufferRenderbuffer(n.READ_FRAMEBUFFER,n.COLOR_ATTACHMENT0,n.RENDERBUFFER,be.__webglColorRenderbuffer[Ue]);let J=i.get(v[Ue]).__webglTexture;n.framebufferTexture2D(n.DRAW_FRAMEBUFFER,n.COLOR_ATTACHMENT0,n.TEXTURE_2D,J,0)}n.blitFramebuffer(0,0,N,q,0,0,N,q,Y,n.NEAREST),c===!0&&(Dt.length=0,Je.length=0,Dt.push(n.COLOR_ATTACHMENT0+Ue),E.depthBuffer&&E.resolveDepthBuffer===!1&&(Dt.push($),Je.push($),n.invalidateFramebuffer(n.DRAW_FRAMEBUFFER,Je)),n.invalidateFramebuffer(n.READ_FRAMEBUFFER,Dt))}if(t.bindFramebuffer(n.READ_FRAMEBUFFER,null),t.bindFramebuffer(n.DRAW_FRAMEBUFFER,null),re)for(let Ue=0;Ue<v.length;Ue++){t.bindFramebuffer(n.FRAMEBUFFER,be.__webglMultisampledFramebuffer),n.framebufferRenderbuffer(n.FRAMEBUFFER,n.COLOR_ATTACHMENT0+Ue,n.RENDERBUFFER,be.__webglColorRenderbuffer[Ue]);let J=i.get(v[Ue]).__webglTexture;t.bindFramebuffer(n.FRAMEBUFFER,be.__webglFramebuffer),n.framebufferTexture2D(n.DRAW_FRAMEBUFFER,n.COLOR_ATTACHMENT0+Ue,n.TEXTURE_2D,J,0)}t.bindFramebuffer(n.DRAW_FRAMEBUFFER,be.__webglMultisampledFramebuffer)}else if(E.depthBuffer&&E.resolveDepthBuffer===!1&&c){let v=E.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT;n.invalidateFramebuffer(n.DRAW_FRAMEBUFFER,[v])}}}function I(E){return Math.min(r.maxSamples,E.samples)}function qt(E){let v=i.get(E);return E.samples>0&&e.has("WEBGL_multisampled_render_to_texture")===!0&&v.__useRenderToTexture!==!1}function pt(E){let v=s.render.frame;u.get(E)!==v&&(u.set(E,v),E.update())}function Rt(E,v){let N=E.colorSpace,q=E.format,Y=E.type;return E.isCompressedTexture===!0||E.isVideoTexture===!0||N!==ls&&N!==Ar&&(at.getTransfer(N)===_t?(q!==_i||Y!==qn)&&ke("WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):Fe("WebGLTextures: Unsupported texture color space:",N)),v}function Ce(E){return typeof HTMLImageElement<"u"&&E instanceof HTMLImageElement?(l.width=E.naturalWidth||E.width,l.height=E.naturalHeight||E.height):typeof VideoFrame<"u"&&E instanceof VideoFrame?(l.width=E.displayWidth,l.height=E.displayHeight):(l.width=E.width,l.height=E.height),l}this.allocateTextureUnit=k,this.resetTextureUnits=L,this.setTexture2D=B,this.setTexture2DArray=H,this.setTexture3D=F,this.setTextureCube=ee,this.rebindTextures=nn,this.setupRenderTarget=ct,this.updateRenderTargetMipmap=xt,this.updateMultisampleRenderTarget=jt,this.setupDepthRenderbuffer=Ve,this.setupFrameBufferTexture=se,this.useMultisampledRTT=qt,this.isReversedDepthBuffer=function(){return t.buffers.depth.getReversed()}}function D2(n,e){function t(i,r=Ar){let o,s=at.getTransfer(r);if(i===qn)return n.UNSIGNED_BYTE;if(i===Ah)return n.UNSIGNED_SHORT_4_4_4_4;if(i===Rh)return n.UNSIGNED_SHORT_5_5_5_1;if(i===i0)return n.UNSIGNED_INT_5_9_9_9_REV;if(i===r0)return n.UNSIGNED_INT_10F_11F_11F_REV;if(i===t0)return n.BYTE;if(i===n0)return n.SHORT;if(i===Ha)return n.UNSIGNED_SHORT;if(i===Ih)return n.INT;if(i===Bi)return n.UNSIGNED_INT;if(i===Vi)return n.FLOAT;if(i===er)return n.HALF_FLOAT;if(i===o0)return n.ALPHA;if(i===s0)return n.RGB;if(i===_i)return n.RGBA;if(i===Zi)return n.DEPTH_COMPONENT;if(i===_o)return n.DEPTH_STENCIL;if(i===a0)return n.RED;if(i===Nh)return n.RED_INTEGER;if(i===fs)return n.RG;if(i===Ph)return n.RG_INTEGER;if(i===Oh)return n.RGBA_INTEGER;if(i===Ol||i===Ll||i===Fl||i===kl)if(s===_t)if(o=e.get("WEBGL_compressed_texture_s3tc_srgb"),o!==null){if(i===Ol)return o.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(i===Ll)return o.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(i===Fl)return o.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(i===kl)return o.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(o=e.get("WEBGL_compressed_texture_s3tc"),o!==null){if(i===Ol)return o.COMPRESSED_RGB_S3TC_DXT1_EXT;if(i===Ll)return o.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(i===Fl)return o.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(i===kl)return o.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(i===Lh||i===Fh||i===kh||i===Uh)if(o=e.get("WEBGL_compressed_texture_pvrtc"),o!==null){if(i===Lh)return o.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(i===Fh)return o.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(i===kh)return o.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(i===Uh)return o.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(i===Bh||i===Vh||i===Hh||i===zh||i===Gh||i===jh||i===Wh)if(o=e.get("WEBGL_compressed_texture_etc"),o!==null){if(i===Bh||i===Vh)return s===_t?o.COMPRESSED_SRGB8_ETC2:o.COMPRESSED_RGB8_ETC2;if(i===Hh)return s===_t?o.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:o.COMPRESSED_RGBA8_ETC2_EAC;if(i===zh)return o.COMPRESSED_R11_EAC;if(i===Gh)return o.COMPRESSED_SIGNED_R11_EAC;if(i===jh)return o.COMPRESSED_RG11_EAC;if(i===Wh)return o.COMPRESSED_SIGNED_RG11_EAC}else return null;if(i===$h||i===qh||i===Xh||i===Yh||i===Zh||i===Jh||i===Kh||i===Qh||i===ep||i===tp||i===np||i===ip||i===rp||i===op)if(o=e.get("WEBGL_compressed_texture_astc"),o!==null){if(i===$h)return s===_t?o.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:o.COMPRESSED_RGBA_ASTC_4x4_KHR;if(i===qh)return s===_t?o.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:o.COMPRESSED_RGBA_ASTC_5x4_KHR;if(i===Xh)return s===_t?o.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:o.COMPRESSED_RGBA_ASTC_5x5_KHR;if(i===Yh)return s===_t?o.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:o.COMPRESSED_RGBA_ASTC_6x5_KHR;if(i===Zh)return s===_t?o.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:o.COMPRESSED_RGBA_ASTC_6x6_KHR;if(i===Jh)return s===_t?o.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:o.COMPRESSED_RGBA_ASTC_8x5_KHR;if(i===Kh)return s===_t?o.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:o.COMPRESSED_RGBA_ASTC_8x6_KHR;if(i===Qh)return s===_t?o.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:o.COMPRESSED_RGBA_ASTC_8x8_KHR;if(i===ep)return s===_t?o.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:o.COMPRESSED_RGBA_ASTC_10x5_KHR;if(i===tp)return s===_t?o.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:o.COMPRESSED_RGBA_ASTC_10x6_KHR;if(i===np)return s===_t?o.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:o.COMPRESSED_RGBA_ASTC_10x8_KHR;if(i===ip)return s===_t?o.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:o.COMPRESSED_RGBA_ASTC_10x10_KHR;if(i===rp)return s===_t?o.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:o.COMPRESSED_RGBA_ASTC_12x10_KHR;if(i===op)return s===_t?o.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:o.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(i===sp||i===ap||i===cp)if(o=e.get("EXT_texture_compression_bptc"),o!==null){if(i===sp)return s===_t?o.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:o.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(i===ap)return o.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(i===cp)return o.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(i===lp||i===up||i===dp||i===fp)if(o=e.get("EXT_texture_compression_rgtc"),o!==null){if(i===lp)return o.COMPRESSED_RED_RGTC1_EXT;if(i===up)return o.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(i===dp)return o.COMPRESSED_RED_GREEN_RGTC2_EXT;if(i===fp)return o.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return i===za?n.UNSIGNED_INT_24_8:n[i]!==void 0?n[i]:null}return{convert:t}}var I2=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,A2=`
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

}`,D0=class{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(e,t){if(this.texture===null){let i=new Ml(e.texture);(e.depthNear!==t.depthNear||e.depthFar!==t.depthFar)&&(this.depthNear=e.depthNear,this.depthFar=e.depthFar),this.texture=i}}getMesh(e){if(this.texture!==null&&this.mesh===null){let t=e.cameras[0].viewport,i=new oi({vertexShader:I2,fragmentShader:A2,uniforms:{depthColor:{value:this.texture},depthWidth:{value:t.z},depthHeight:{value:t.w}}});this.mesh=new un(new El(20,20),i)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}},I0=class extends Dr{constructor(e,t){super();let i=this,r=null,o=1,s=null,a="local-floor",c=1,l=null,u=null,d=null,f=null,h=null,g=null,_=typeof XRWebGLBinding<"u",m=new D0,p={},b=t.getContextAttributes(),w=null,S=null,D=[],C=[],A=new ot,y=null,M=new En;M.viewport=new Ht;let j=new En;j.viewport=new Ht;let T=[M,j],L=new wh,k=null,G=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(X){let ie=D[X];return ie===void 0&&(ie=new Ra,D[X]=ie),ie.getTargetRaySpace()},this.getControllerGrip=function(X){let ie=D[X];return ie===void 0&&(ie=new Ra,D[X]=ie),ie.getGripSpace()},this.getHand=function(X){let ie=D[X];return ie===void 0&&(ie=new Ra,D[X]=ie),ie.getHandSpace()};function B(X){let ie=C.indexOf(X.inputSource);if(ie===-1)return;let se=D[ie];se!==void 0&&(se.update(X.inputSource,X.frame,l||s),se.dispatchEvent({type:X.type,data:X.inputSource}))}function H(){r.removeEventListener("select",B),r.removeEventListener("selectstart",B),r.removeEventListener("selectend",B),r.removeEventListener("squeeze",B),r.removeEventListener("squeezestart",B),r.removeEventListener("squeezeend",B),r.removeEventListener("end",H),r.removeEventListener("inputsourceschange",F);for(let X=0;X<D.length;X++){let ie=C[X];ie!==null&&(C[X]=null,D[X].disconnect(ie))}k=null,G=null,m.reset();for(let X in p)delete p[X];e.setRenderTarget(w),h=null,f=null,d=null,r=null,S=null,Lt.stop(),i.isPresenting=!1,e.setPixelRatio(y),e.setSize(A.width,A.height,!1),i.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(X){o=X,i.isPresenting===!0&&ke("WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(X){a=X,i.isPresenting===!0&&ke("WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return l||s},this.setReferenceSpace=function(X){l=X},this.getBaseLayer=function(){return f!==null?f:h},this.getBinding=function(){return d===null&&_&&(d=new XRWebGLBinding(r,t)),d},this.getFrame=function(){return g},this.getSession=function(){return r},this.setSession=async function(X){if(r=X,r!==null){if(w=e.getRenderTarget(),r.addEventListener("select",B),r.addEventListener("selectstart",B),r.addEventListener("selectend",B),r.addEventListener("squeeze",B),r.addEventListener("squeezestart",B),r.addEventListener("squeezeend",B),r.addEventListener("end",H),r.addEventListener("inputsourceschange",F),b.xrCompatible!==!0&&await t.makeXRCompatible(),y=e.getPixelRatio(),e.getSize(A),_&&"createProjectionLayer"in XRWebGLBinding.prototype){let se=null,Xe=null,Oe=null;b.depth&&(Oe=b.stencil?t.DEPTH24_STENCIL8:t.DEPTH_COMPONENT24,se=b.stencil?_o:Zi,Xe=b.stencil?za:Bi);let Ve={colorFormat:t.RGBA8,depthFormat:Oe,scaleFactor:o};d=this.getBinding(),f=d.createProjectionLayer(Ve),r.updateRenderState({layers:[f]}),e.setPixelRatio(1),e.setSize(f.textureWidth,f.textureHeight,!1),S=new ri(f.textureWidth,f.textureHeight,{format:_i,type:qn,depthTexture:new ho(f.textureWidth,f.textureHeight,Xe,void 0,void 0,void 0,void 0,void 0,void 0,se),stencilBuffer:b.stencil,colorSpace:e.outputColorSpace,samples:b.antialias?4:0,resolveDepthBuffer:f.ignoreDepthValues===!1,resolveStencilBuffer:f.ignoreDepthValues===!1})}else{let se={antialias:b.antialias,alpha:!0,depth:b.depth,stencil:b.stencil,framebufferScaleFactor:o};h=new XRWebGLLayer(r,t,se),r.updateRenderState({baseLayer:h}),e.setPixelRatio(1),e.setSize(h.framebufferWidth,h.framebufferHeight,!1),S=new ri(h.framebufferWidth,h.framebufferHeight,{format:_i,type:qn,colorSpace:e.outputColorSpace,stencilBuffer:b.stencil,resolveDepthBuffer:h.ignoreDepthValues===!1,resolveStencilBuffer:h.ignoreDepthValues===!1})}S.isXRRenderTarget=!0,this.setFoveation(c),l=null,s=await r.requestReferenceSpace(a),Lt.setContext(r),Lt.start(),i.isPresenting=!0,i.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(r!==null)return r.environmentBlendMode},this.getDepthTexture=function(){return m.getDepthTexture()};function F(X){for(let ie=0;ie<X.removed.length;ie++){let se=X.removed[ie],Xe=C.indexOf(se);Xe>=0&&(C[Xe]=null,D[Xe].disconnect(se))}for(let ie=0;ie<X.added.length;ie++){let se=X.added[ie],Xe=C.indexOf(se);if(Xe===-1){for(let Ve=0;Ve<D.length;Ve++)if(Ve>=C.length){C.push(se),Xe=Ve;break}else if(C[Ve]===null){C[Ve]=se,Xe=Ve;break}if(Xe===-1)break}let Oe=D[Xe];Oe&&Oe.connect(se)}}let ee=new O,Z=new O;function he(X,ie,se){ee.setFromMatrixPosition(ie.matrixWorld),Z.setFromMatrixPosition(se.matrixWorld);let Xe=ee.distanceTo(Z),Oe=ie.projectionMatrix.elements,Ve=se.projectionMatrix.elements,nn=Oe[14]/(Oe[10]-1),ct=Oe[14]/(Oe[10]+1),xt=(Oe[9]+1)/Oe[5],Dt=(Oe[9]-1)/Oe[5],Je=(Oe[8]-1)/Oe[0],jt=(Ve[8]+1)/Ve[0],I=nn*Je,qt=nn*jt,pt=Xe/(-Je+jt),Rt=pt*-Je;if(ie.matrixWorld.decompose(X.position,X.quaternion,X.scale),X.translateX(Rt),X.translateZ(pt),X.matrixWorld.compose(X.position,X.quaternion,X.scale),X.matrixWorldInverse.copy(X.matrixWorld).invert(),Oe[10]===-1)X.projectionMatrix.copy(ie.projectionMatrix),X.projectionMatrixInverse.copy(ie.projectionMatrixInverse);else{let Ce=nn+pt,E=ct+pt,v=I-Rt,N=qt+(Xe-Rt),q=xt*ct/E*Ce,Y=Dt*ct/E*Ce;X.projectionMatrix.makePerspective(v,N,q,Y,Ce,E),X.projectionMatrixInverse.copy(X.projectionMatrix).invert()}}function xe(X,ie){ie===null?X.matrixWorld.copy(X.matrix):X.matrixWorld.multiplyMatrices(ie.matrixWorld,X.matrix),X.matrixWorldInverse.copy(X.matrixWorld).invert()}this.updateCamera=function(X){if(r===null)return;let ie=X.near,se=X.far;m.texture!==null&&(m.depthNear>0&&(ie=m.depthNear),m.depthFar>0&&(se=m.depthFar)),L.near=j.near=M.near=ie,L.far=j.far=M.far=se,(k!==L.near||G!==L.far)&&(r.updateRenderState({depthNear:L.near,depthFar:L.far}),k=L.near,G=L.far),L.layers.mask=X.layers.mask|6,M.layers.mask=L.layers.mask&-5,j.layers.mask=L.layers.mask&-3;let Xe=X.parent,Oe=L.cameras;xe(L,Xe);for(let Ve=0;Ve<Oe.length;Ve++)xe(Oe[Ve],Xe);Oe.length===2?he(L,M,j):L.projectionMatrix.copy(M.projectionMatrix),me(X,L,Xe)};function me(X,ie,se){se===null?X.matrix.copy(ie.matrixWorld):(X.matrix.copy(se.matrixWorld),X.matrix.invert(),X.matrix.multiply(ie.matrixWorld)),X.matrix.decompose(X.position,X.quaternion,X.scale),X.updateMatrixWorld(!0),X.projectionMatrix.copy(ie.projectionMatrix),X.projectionMatrixInverse.copy(ie.projectionMatrixInverse),X.isPerspectiveCamera&&(X.fov=ih*2*Math.atan(1/X.projectionMatrix.elements[5]),X.zoom=1)}this.getCamera=function(){return L},this.getFoveation=function(){if(!(f===null&&h===null))return c},this.setFoveation=function(X){c=X,f!==null&&(f.fixedFoveation=X),h!==null&&h.fixedFoveation!==void 0&&(h.fixedFoveation=X)},this.hasDepthSensing=function(){return m.texture!==null},this.getDepthSensingMesh=function(){return m.getMesh(L)},this.getCameraTexture=function(X){return p[X]};let Ye=null;function Ft(X,ie){if(u=ie.getViewerPose(l||s),g=ie,u!==null){let se=u.views;h!==null&&(e.setRenderTargetFramebuffer(S,h.framebuffer),e.setRenderTarget(S));let Xe=!1;se.length!==L.cameras.length&&(L.cameras.length=0,Xe=!0);for(let ct=0;ct<se.length;ct++){let xt=se[ct],Dt=null;if(h!==null)Dt=h.getViewport(xt);else{let jt=d.getViewSubImage(f,xt);Dt=jt.viewport,ct===0&&(e.setRenderTargetTextures(S,jt.colorTexture,jt.depthStencilTexture),e.setRenderTarget(S))}let Je=T[ct];Je===void 0&&(Je=new En,Je.layers.enable(ct),Je.viewport=new Ht,T[ct]=Je),Je.matrix.fromArray(xt.transform.matrix),Je.matrix.decompose(Je.position,Je.quaternion,Je.scale),Je.projectionMatrix.fromArray(xt.projectionMatrix),Je.projectionMatrixInverse.copy(Je.projectionMatrix).invert(),Je.viewport.set(Dt.x,Dt.y,Dt.width,Dt.height),ct===0&&(L.matrix.copy(Je.matrix),L.matrix.decompose(L.position,L.quaternion,L.scale)),Xe===!0&&L.cameras.push(Je)}let Oe=r.enabledFeatures;if(Oe&&Oe.includes("depth-sensing")&&r.depthUsage=="gpu-optimized"&&_){d=i.getBinding();let ct=d.getDepthInformation(se[0]);ct&&ct.isValid&&ct.texture&&m.init(ct,r.renderState)}if(Oe&&Oe.includes("camera-access")&&_){e.state.unbindTexture(),d=i.getBinding();for(let ct=0;ct<se.length;ct++){let xt=se[ct].camera;if(xt){let Dt=p[xt];Dt||(Dt=new Ml,p[xt]=Dt);let Je=d.getCameraImage(xt);Dt.sourceTexture=Je}}}}for(let se=0;se<D.length;se++){let Xe=C[se],Oe=D[se];Xe!==null&&Oe!==void 0&&Oe.update(Xe,ie,l||s)}Ye&&Ye(X,ie),ie.detectedPlanes&&i.dispatchEvent({type:"planesdetected",data:ie}),g=null}let Lt=new bw;Lt.setAnimationLoop(Ft),this.setAnimationLoop=function(X){Ye=X},this.dispose=function(){}}},ms=new uo,R2=new Ot;function N2(n,e){function t(m,p){m.matrixAutoUpdate===!0&&m.updateMatrix(),p.value.copy(m.matrix)}function i(m,p){p.color.getRGB(m.fogColor.value,d0(n)),p.isFog?(m.fogNear.value=p.near,m.fogFar.value=p.far):p.isFogExp2&&(m.fogDensity.value=p.density)}function r(m,p,b,w,S){p.isMeshBasicMaterial?o(m,p):p.isMeshLambertMaterial?(o(m,p),p.envMap&&(m.envMapIntensity.value=p.envMapIntensity)):p.isMeshToonMaterial?(o(m,p),d(m,p)):p.isMeshPhongMaterial?(o(m,p),u(m,p),p.envMap&&(m.envMapIntensity.value=p.envMapIntensity)):p.isMeshStandardMaterial?(o(m,p),f(m,p),p.isMeshPhysicalMaterial&&h(m,p,S)):p.isMeshMatcapMaterial?(o(m,p),g(m,p)):p.isMeshDepthMaterial?o(m,p):p.isMeshDistanceMaterial?(o(m,p),_(m,p)):p.isMeshNormalMaterial?o(m,p):p.isLineBasicMaterial?(s(m,p),p.isLineDashedMaterial&&a(m,p)):p.isPointsMaterial?c(m,p,b,w):p.isSpriteMaterial?l(m,p):p.isShadowMaterial?(m.color.value.copy(p.color),m.opacity.value=p.opacity):p.isShaderMaterial&&(p.uniformsNeedUpdate=!1)}function o(m,p){m.opacity.value=p.opacity,p.color&&m.diffuse.value.copy(p.color),p.emissive&&m.emissive.value.copy(p.emissive).multiplyScalar(p.emissiveIntensity),p.map&&(m.map.value=p.map,t(p.map,m.mapTransform)),p.alphaMap&&(m.alphaMap.value=p.alphaMap,t(p.alphaMap,m.alphaMapTransform)),p.bumpMap&&(m.bumpMap.value=p.bumpMap,t(p.bumpMap,m.bumpMapTransform),m.bumpScale.value=p.bumpScale,p.side===Un&&(m.bumpScale.value*=-1)),p.normalMap&&(m.normalMap.value=p.normalMap,t(p.normalMap,m.normalMapTransform),m.normalScale.value.copy(p.normalScale),p.side===Un&&m.normalScale.value.negate()),p.displacementMap&&(m.displacementMap.value=p.displacementMap,t(p.displacementMap,m.displacementMapTransform),m.displacementScale.value=p.displacementScale,m.displacementBias.value=p.displacementBias),p.emissiveMap&&(m.emissiveMap.value=p.emissiveMap,t(p.emissiveMap,m.emissiveMapTransform)),p.specularMap&&(m.specularMap.value=p.specularMap,t(p.specularMap,m.specularMapTransform)),p.alphaTest>0&&(m.alphaTest.value=p.alphaTest);let b=e.get(p),w=b.envMap,S=b.envMapRotation;w&&(m.envMap.value=w,ms.copy(S),ms.x*=-1,ms.y*=-1,ms.z*=-1,w.isCubeTexture&&w.isRenderTargetTexture===!1&&(ms.y*=-1,ms.z*=-1),m.envMapRotation.value.setFromMatrix4(R2.makeRotationFromEuler(ms)),m.flipEnvMap.value=w.isCubeTexture&&w.isRenderTargetTexture===!1?-1:1,m.reflectivity.value=p.reflectivity,m.ior.value=p.ior,m.refractionRatio.value=p.refractionRatio),p.lightMap&&(m.lightMap.value=p.lightMap,m.lightMapIntensity.value=p.lightMapIntensity,t(p.lightMap,m.lightMapTransform)),p.aoMap&&(m.aoMap.value=p.aoMap,m.aoMapIntensity.value=p.aoMapIntensity,t(p.aoMap,m.aoMapTransform))}function s(m,p){m.diffuse.value.copy(p.color),m.opacity.value=p.opacity,p.map&&(m.map.value=p.map,t(p.map,m.mapTransform))}function a(m,p){m.dashSize.value=p.dashSize,m.totalSize.value=p.dashSize+p.gapSize,m.scale.value=p.scale}function c(m,p,b,w){m.diffuse.value.copy(p.color),m.opacity.value=p.opacity,m.size.value=p.size*b,m.scale.value=w*.5,p.map&&(m.map.value=p.map,t(p.map,m.uvTransform)),p.alphaMap&&(m.alphaMap.value=p.alphaMap,t(p.alphaMap,m.alphaMapTransform)),p.alphaTest>0&&(m.alphaTest.value=p.alphaTest)}function l(m,p){m.diffuse.value.copy(p.color),m.opacity.value=p.opacity,m.rotation.value=p.rotation,p.map&&(m.map.value=p.map,t(p.map,m.mapTransform)),p.alphaMap&&(m.alphaMap.value=p.alphaMap,t(p.alphaMap,m.alphaMapTransform)),p.alphaTest>0&&(m.alphaTest.value=p.alphaTest)}function u(m,p){m.specular.value.copy(p.specular),m.shininess.value=Math.max(p.shininess,1e-4)}function d(m,p){p.gradientMap&&(m.gradientMap.value=p.gradientMap)}function f(m,p){m.metalness.value=p.metalness,p.metalnessMap&&(m.metalnessMap.value=p.metalnessMap,t(p.metalnessMap,m.metalnessMapTransform)),m.roughness.value=p.roughness,p.roughnessMap&&(m.roughnessMap.value=p.roughnessMap,t(p.roughnessMap,m.roughnessMapTransform)),p.envMap&&(m.envMapIntensity.value=p.envMapIntensity)}function h(m,p,b){m.ior.value=p.ior,p.sheen>0&&(m.sheenColor.value.copy(p.sheenColor).multiplyScalar(p.sheen),m.sheenRoughness.value=p.sheenRoughness,p.sheenColorMap&&(m.sheenColorMap.value=p.sheenColorMap,t(p.sheenColorMap,m.sheenColorMapTransform)),p.sheenRoughnessMap&&(m.sheenRoughnessMap.value=p.sheenRoughnessMap,t(p.sheenRoughnessMap,m.sheenRoughnessMapTransform))),p.clearcoat>0&&(m.clearcoat.value=p.clearcoat,m.clearcoatRoughness.value=p.clearcoatRoughness,p.clearcoatMap&&(m.clearcoatMap.value=p.clearcoatMap,t(p.clearcoatMap,m.clearcoatMapTransform)),p.clearcoatRoughnessMap&&(m.clearcoatRoughnessMap.value=p.clearcoatRoughnessMap,t(p.clearcoatRoughnessMap,m.clearcoatRoughnessMapTransform)),p.clearcoatNormalMap&&(m.clearcoatNormalMap.value=p.clearcoatNormalMap,t(p.clearcoatNormalMap,m.clearcoatNormalMapTransform),m.clearcoatNormalScale.value.copy(p.clearcoatNormalScale),p.side===Un&&m.clearcoatNormalScale.value.negate())),p.dispersion>0&&(m.dispersion.value=p.dispersion),p.iridescence>0&&(m.iridescence.value=p.iridescence,m.iridescenceIOR.value=p.iridescenceIOR,m.iridescenceThicknessMinimum.value=p.iridescenceThicknessRange[0],m.iridescenceThicknessMaximum.value=p.iridescenceThicknessRange[1],p.iridescenceMap&&(m.iridescenceMap.value=p.iridescenceMap,t(p.iridescenceMap,m.iridescenceMapTransform)),p.iridescenceThicknessMap&&(m.iridescenceThicknessMap.value=p.iridescenceThicknessMap,t(p.iridescenceThicknessMap,m.iridescenceThicknessMapTransform))),p.transmission>0&&(m.transmission.value=p.transmission,m.transmissionSamplerMap.value=b.texture,m.transmissionSamplerSize.value.set(b.width,b.height),p.transmissionMap&&(m.transmissionMap.value=p.transmissionMap,t(p.transmissionMap,m.transmissionMapTransform)),m.thickness.value=p.thickness,p.thicknessMap&&(m.thicknessMap.value=p.thicknessMap,t(p.thicknessMap,m.thicknessMapTransform)),m.attenuationDistance.value=p.attenuationDistance,m.attenuationColor.value.copy(p.attenuationColor)),p.anisotropy>0&&(m.anisotropyVector.value.set(p.anisotropy*Math.cos(p.anisotropyRotation),p.anisotropy*Math.sin(p.anisotropyRotation)),p.anisotropyMap&&(m.anisotropyMap.value=p.anisotropyMap,t(p.anisotropyMap,m.anisotropyMapTransform))),m.specularIntensity.value=p.specularIntensity,m.specularColor.value.copy(p.specularColor),p.specularColorMap&&(m.specularColorMap.value=p.specularColorMap,t(p.specularColorMap,m.specularColorMapTransform)),p.specularIntensityMap&&(m.specularIntensityMap.value=p.specularIntensityMap,t(p.specularIntensityMap,m.specularIntensityMapTransform))}function g(m,p){p.matcap&&(m.matcap.value=p.matcap)}function _(m,p){let b=e.get(p).light;m.referencePosition.value.setFromMatrixPosition(b.matrixWorld),m.nearDistance.value=b.shadow.camera.near,m.farDistance.value=b.shadow.camera.far}return{refreshFogUniforms:i,refreshMaterialUniforms:r}}function P2(n,e,t,i){let r={},o={},s=[],a=n.getParameter(n.MAX_UNIFORM_BUFFER_BINDINGS);function c(b,w){let S=w.program;i.uniformBlockBinding(b,S)}function l(b,w){let S=r[b.id];S===void 0&&(g(b),S=u(b),r[b.id]=S,b.addEventListener("dispose",m));let D=w.program;i.updateUBOMapping(b,D);let C=e.render.frame;o[b.id]!==C&&(f(b),o[b.id]=C)}function u(b){let w=d();b.__bindingPointIndex=w;let S=n.createBuffer(),D=b.__size,C=b.usage;return n.bindBuffer(n.UNIFORM_BUFFER,S),n.bufferData(n.UNIFORM_BUFFER,D,C),n.bindBuffer(n.UNIFORM_BUFFER,null),n.bindBufferBase(n.UNIFORM_BUFFER,w,S),S}function d(){for(let b=0;b<a;b++)if(s.indexOf(b)===-1)return s.push(b),b;return Fe("WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function f(b){let w=r[b.id],S=b.uniforms,D=b.__cache;n.bindBuffer(n.UNIFORM_BUFFER,w);for(let C=0,A=S.length;C<A;C++){let y=Array.isArray(S[C])?S[C]:[S[C]];for(let M=0,j=y.length;M<j;M++){let T=y[M];if(h(T,C,M,D)===!0){let L=T.__offset,k=Array.isArray(T.value)?T.value:[T.value],G=0;for(let B=0;B<k.length;B++){let H=k[B],F=_(H);typeof H=="number"||typeof H=="boolean"?(T.__data[0]=H,n.bufferSubData(n.UNIFORM_BUFFER,L+G,T.__data)):H.isMatrix3?(T.__data[0]=H.elements[0],T.__data[1]=H.elements[1],T.__data[2]=H.elements[2],T.__data[3]=0,T.__data[4]=H.elements[3],T.__data[5]=H.elements[4],T.__data[6]=H.elements[5],T.__data[7]=0,T.__data[8]=H.elements[6],T.__data[9]=H.elements[7],T.__data[10]=H.elements[8],T.__data[11]=0):(H.toArray(T.__data,G),G+=F.storage/Float32Array.BYTES_PER_ELEMENT)}n.bufferSubData(n.UNIFORM_BUFFER,L,T.__data)}}}n.bindBuffer(n.UNIFORM_BUFFER,null)}function h(b,w,S,D){let C=b.value,A=w+"_"+S;if(D[A]===void 0)return typeof C=="number"||typeof C=="boolean"?D[A]=C:D[A]=C.clone(),!0;{let y=D[A];if(typeof C=="number"||typeof C=="boolean"){if(y!==C)return D[A]=C,!0}else if(y.equals(C)===!1)return y.copy(C),!0}return!1}function g(b){let w=b.uniforms,S=0,D=16;for(let A=0,y=w.length;A<y;A++){let M=Array.isArray(w[A])?w[A]:[w[A]];for(let j=0,T=M.length;j<T;j++){let L=M[j],k=Array.isArray(L.value)?L.value:[L.value];for(let G=0,B=k.length;G<B;G++){let H=k[G],F=_(H),ee=S%D,Z=ee%F.boundary,he=ee+Z;S+=Z,he!==0&&D-he<F.storage&&(S+=D-he),L.__data=new Float32Array(F.storage/Float32Array.BYTES_PER_ELEMENT),L.__offset=S,S+=F.storage}}}let C=S%D;return C>0&&(S+=D-C),b.__size=S,b.__cache={},this}function _(b){let w={boundary:0,storage:0};return typeof b=="number"||typeof b=="boolean"?(w.boundary=4,w.storage=4):b.isVector2?(w.boundary=8,w.storage=8):b.isVector3||b.isColor?(w.boundary=16,w.storage=12):b.isVector4?(w.boundary=16,w.storage=16):b.isMatrix3?(w.boundary=48,w.storage=48):b.isMatrix4?(w.boundary=64,w.storage=64):b.isTexture?ke("WebGLRenderer: Texture samplers can not be part of an uniforms group."):ke("WebGLRenderer: Unsupported uniform value type.",b),w}function m(b){let w=b.target;w.removeEventListener("dispose",m);let S=s.indexOf(w.__bindingPointIndex);s.splice(S,1),n.deleteBuffer(r[w.id]),delete r[w.id],delete o[w.id]}function p(){for(let b in r)n.deleteBuffer(r[b]);s=[],r={},o={}}return{bind:c,update:l,dispose:p}}var O2=new Uint16Array([12469,15057,12620,14925,13266,14620,13807,14376,14323,13990,14545,13625,14713,13328,14840,12882,14931,12528,14996,12233,15039,11829,15066,11525,15080,11295,15085,10976,15082,10705,15073,10495,13880,14564,13898,14542,13977,14430,14158,14124,14393,13732,14556,13410,14702,12996,14814,12596,14891,12291,14937,11834,14957,11489,14958,11194,14943,10803,14921,10506,14893,10278,14858,9960,14484,14039,14487,14025,14499,13941,14524,13740,14574,13468,14654,13106,14743,12678,14818,12344,14867,11893,14889,11509,14893,11180,14881,10751,14852,10428,14812,10128,14765,9754,14712,9466,14764,13480,14764,13475,14766,13440,14766,13347,14769,13070,14786,12713,14816,12387,14844,11957,14860,11549,14868,11215,14855,10751,14825,10403,14782,10044,14729,9651,14666,9352,14599,9029,14967,12835,14966,12831,14963,12804,14954,12723,14936,12564,14917,12347,14900,11958,14886,11569,14878,11247,14859,10765,14828,10401,14784,10011,14727,9600,14660,9289,14586,8893,14508,8533,15111,12234,15110,12234,15104,12216,15092,12156,15067,12010,15028,11776,14981,11500,14942,11205,14902,10752,14861,10393,14812,9991,14752,9570,14682,9252,14603,8808,14519,8445,14431,8145,15209,11449,15208,11451,15202,11451,15190,11438,15163,11384,15117,11274,15055,10979,14994,10648,14932,10343,14871,9936,14803,9532,14729,9218,14645,8742,14556,8381,14461,8020,14365,7603,15273,10603,15272,10607,15267,10619,15256,10631,15231,10614,15182,10535,15118,10389,15042,10167,14963,9787,14883,9447,14800,9115,14710,8665,14615,8318,14514,7911,14411,7507,14279,7198,15314,9675,15313,9683,15309,9712,15298,9759,15277,9797,15229,9773,15166,9668,15084,9487,14995,9274,14898,8910,14800,8539,14697,8234,14590,7790,14479,7409,14367,7067,14178,6621,15337,8619,15337,8631,15333,8677,15325,8769,15305,8871,15264,8940,15202,8909,15119,8775,15022,8565,14916,8328,14804,8009,14688,7614,14569,7287,14448,6888,14321,6483,14088,6171,15350,7402,15350,7419,15347,7480,15340,7613,15322,7804,15287,7973,15229,8057,15148,8012,15046,7846,14933,7611,14810,7357,14682,7069,14552,6656,14421,6316,14251,5948,14007,5528,15356,5942,15356,5977,15353,6119,15348,6294,15332,6551,15302,6824,15249,7044,15171,7122,15070,7050,14949,6861,14818,6611,14679,6349,14538,6067,14398,5651,14189,5311,13935,4958,15359,4123,15359,4153,15356,4296,15353,4646,15338,5160,15311,5508,15263,5829,15188,6042,15088,6094,14966,6001,14826,5796,14678,5543,14527,5287,14377,4985,14133,4586,13869,4257,15360,1563,15360,1642,15358,2076,15354,2636,15341,3350,15317,4019,15273,4429,15203,4732,15105,4911,14981,4932,14836,4818,14679,4621,14517,4386,14359,4156,14083,3795,13808,3437,15360,122,15360,137,15358,285,15355,636,15344,1274,15322,2177,15281,2765,15215,3223,15120,3451,14995,3569,14846,3567,14681,3466,14511,3305,14344,3121,14037,2800,13753,2467,15360,0,15360,1,15359,21,15355,89,15346,253,15325,479,15287,796,15225,1148,15133,1492,15008,1749,14856,1882,14685,1886,14506,1783,14324,1608,13996,1398,13702,1183]),tr=null;function L2(){return tr===null&&(tr=new ah(O2,16,16,fs,er),tr.name="DFG_LUT",tr.minFilter=mn,tr.magFilter=mn,tr.wrapS=Yi,tr.wrapT=Yi,tr.generateMipmaps=!1,tr.needsUpdate=!0),tr}var _p=class{constructor(e={}){let{canvas:t=qE(),context:i=null,depth:r=!0,stencil:o=!1,alpha:s=!1,antialias:a=!1,premultipliedAlpha:c=!0,preserveDrawingBuffer:l=!1,powerPreference:u="default",failIfMajorPerformanceCaveat:d=!1,reversedDepthBuffer:f=!1,outputBufferType:h=qn}=e;this.isWebGLRenderer=!0;let g;if(i!==null){if(typeof WebGLRenderingContext<"u"&&i instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");g=i.getContextAttributes().alpha}else g=s;let _=h,m=new Set([Oh,Ph,Nh]),p=new Set([qn,Bi,Ha,za,Ah,Rh]),b=new Uint32Array(4),w=new Int32Array(4),S=null,D=null,C=[],A=[],y=null;this.domElement=t,this.debug={checkShaderErrors:!0,onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this.toneMapping=Ui,this.toneMappingExposure=1,this.transmissionResolutionScale=1;let M=this,j=!1;this._outputColorSpace=ni;let T=0,L=0,k=null,G=-1,B=null,H=new Ht,F=new Ht,ee=null,Z=new st(0),he=0,xe=t.width,me=t.height,Ye=1,Ft=null,Lt=null,X=new Ht(0,0,xe,me),ie=new Ht(0,0,xe,me),se=!1,Xe=new Pa,Oe=!1,Ve=!1,nn=new Ot,ct=new O,xt=new Ht,Dt={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0},Je=!1;function jt(){return k===null?Ye:1}let I=i;function qt(x,P){return t.getContext(x,P)}try{let x={alpha:!0,depth:r,stencil:o,antialias:a,premultipliedAlpha:c,preserveDrawingBuffer:l,powerPreference:u,failIfMajorPerformanceCaveat:d};if("setAttribute"in t&&t.setAttribute("data-engine",`three.js r${"183"}`),t.addEventListener("webglcontextlost",Se,!1),t.addEventListener("webglcontextrestored",ze,!1),t.addEventListener("webglcontextcreationerror",Nt,!1),I===null){let P="webgl2";if(I=qt(P,x),I===null)throw qt(P)?new Error("Error creating WebGL context with your selected attributes."):new Error("Error creating WebGL context.")}}catch(x){throw Fe("WebGLRenderer: "+x.message),x}let pt,Rt,Ce,E,v,N,q,Y,$,be,re,Ne,Ue,J,te,Me,Ee,pe,Ke,R,oe,ne,ye;function K(){pt=new GL(I),pt.init(),oe=new D2(I,pt),Rt=new LL(I,pt,e,oe),Ce=new C2(I,pt),Rt.reversedDepthBuffer&&f&&Ce.buffers.depth.setReversed(!0),E=new $L(I),v=new f2,N=new T2(I,pt,Ce,v,Rt,oe,E),q=new zL(M),Y=new JN(I),ne=new PL(I,Y),$=new jL(I,Y,E,ne),be=new XL(I,$,Y,ne,E),pe=new qL(I,Rt,N),te=new FL(v),re=new d2(M,q,pt,Rt,ne,te),Ne=new N2(M,v),Ue=new p2,J=new x2(pt),Ee=new NL(M,q,Ce,be,g,c),Me=new w2(M,be,Rt),ye=new P2(I,E,Rt,Ce),Ke=new OL(I,pt,E),R=new WL(I,pt,E),E.programs=re.programs,M.capabilities=Rt,M.extensions=pt,M.properties=v,M.renderLists=Ue,M.shadowMap=Me,M.state=Ce,M.info=E}K(),_!==qn&&(y=new ZL(_,t.width,t.height,r,o));let W=new I0(M,I);this.xr=W,this.getContext=function(){return I},this.getContextAttributes=function(){return I.getContextAttributes()},this.forceContextLoss=function(){let x=pt.get("WEBGL_lose_context");x&&x.loseContext()},this.forceContextRestore=function(){let x=pt.get("WEBGL_lose_context");x&&x.restoreContext()},this.getPixelRatio=function(){return Ye},this.setPixelRatio=function(x){x!==void 0&&(Ye=x,this.setSize(xe,me,!1))},this.getSize=function(x){return x.set(xe,me)},this.setSize=function(x,P,z=!0){if(W.isPresenting){ke("WebGLRenderer: Can't change size while VR device is presenting.");return}xe=x,me=P,t.width=Math.floor(x*Ye),t.height=Math.floor(P*Ye),z===!0&&(t.style.width=x+"px",t.style.height=P+"px"),y!==null&&y.setSize(t.width,t.height),this.setViewport(0,0,x,P)},this.getDrawingBufferSize=function(x){return x.set(xe*Ye,me*Ye).floor()},this.setDrawingBufferSize=function(x,P,z){xe=x,me=P,Ye=z,t.width=Math.floor(x*z),t.height=Math.floor(P*z),this.setViewport(0,0,x,P)},this.setEffects=function(x){if(_===qn){console.error("THREE.WebGLRenderer: setEffects() requires outputBufferType set to HalfFloatType or FloatType.");return}if(x){for(let P=0;P<x.length;P++)if(x[P].isOutputPass===!0){console.warn("THREE.WebGLRenderer: OutputPass is not needed in setEffects(). Tone mapping and color space conversion are applied automatically.");break}}y.setEffects(x||[])},this.getCurrentViewport=function(x){return x.copy(H)},this.getViewport=function(x){return x.copy(X)},this.setViewport=function(x,P,z,V){x.isVector4?X.set(x.x,x.y,x.z,x.w):X.set(x,P,z,V),Ce.viewport(H.copy(X).multiplyScalar(Ye).round())},this.getScissor=function(x){return x.copy(ie)},this.setScissor=function(x,P,z,V){x.isVector4?ie.set(x.x,x.y,x.z,x.w):ie.set(x,P,z,V),Ce.scissor(F.copy(ie).multiplyScalar(Ye).round())},this.getScissorTest=function(){return se},this.setScissorTest=function(x){Ce.setScissorTest(se=x)},this.setOpaqueSort=function(x){Ft=x},this.setTransparentSort=function(x){Lt=x},this.getClearColor=function(x){return x.copy(Ee.getClearColor())},this.setClearColor=function(){Ee.setClearColor(...arguments)},this.getClearAlpha=function(){return Ee.getClearAlpha()},this.setClearAlpha=function(){Ee.setClearAlpha(...arguments)},this.clear=function(x=!0,P=!0,z=!0){let V=0;if(x){let U=!1;if(k!==null){let ue=k.texture.format;U=m.has(ue)}if(U){let ue=k.texture.type,ge=p.has(ue),de=Ee.getClearColor(),we=Ee.getClearAlpha(),Ie=de.r,$e=de.g,Qe=de.b;ge?(b[0]=Ie,b[1]=$e,b[2]=Qe,b[3]=we,I.clearBufferuiv(I.COLOR,0,b)):(w[0]=Ie,w[1]=$e,w[2]=Qe,w[3]=we,I.clearBufferiv(I.COLOR,0,w))}else V|=I.COLOR_BUFFER_BIT}P&&(V|=I.DEPTH_BUFFER_BIT),z&&(V|=I.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),V!==0&&I.clear(V)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.dispose=function(){t.removeEventListener("webglcontextlost",Se,!1),t.removeEventListener("webglcontextrestored",ze,!1),t.removeEventListener("webglcontextcreationerror",Nt,!1),Ee.dispose(),Ue.dispose(),J.dispose(),v.dispose(),q.dispose(),be.dispose(),ne.dispose(),ye.dispose(),re.dispose(),W.dispose(),W.removeEventListener("sessionstart",P0),W.removeEventListener("sessionend",O0),bo.stop()};function Se(x){x.preventDefault(),u0("WebGLRenderer: Context Lost."),j=!0}function ze(){u0("WebGLRenderer: Context Restored."),j=!1;let x=E.autoReset,P=Me.enabled,z=Me.autoUpdate,V=Me.needsUpdate,U=Me.type;K(),E.autoReset=x,Me.enabled=P,Me.autoUpdate=z,Me.needsUpdate=V,Me.type=U}function Nt(x){Fe("WebGLRenderer: A WebGL context could not be created. Reason: ",x.statusMessage)}function bt(x){let P=x.target;P.removeEventListener("dispose",bt),ir(P)}function ir(x){rr(x),v.remove(x)}function rr(x){let P=v.get(x).programs;P!==void 0&&(P.forEach(function(z){re.releaseProgram(z)}),x.isShaderMaterial&&re.releaseShaderCache(x))}this.renderBufferDirect=function(x,P,z,V,U,ue){P===null&&(P=Dt);let ge=U.isMesh&&U.matrixWorld.determinant()<0,de=Fw(x,P,z,V,U);Ce.setMaterial(V,ge);let we=z.index,Ie=1;if(V.wireframe===!0){if(we=$.getWireframeAttribute(z),we===void 0)return;Ie=2}let $e=z.drawRange,Qe=z.attributes.position,Re=$e.start*Ie,Et=($e.start+$e.count)*Ie;ue!==null&&(Re=Math.max(Re,ue.start*Ie),Et=Math.min(Et,(ue.start+ue.count)*Ie)),we!==null?(Re=Math.max(Re,0),Et=Math.min(Et,we.count)):Qe!=null&&(Re=Math.max(Re,0),Et=Math.min(Et,Qe.count));let Wt=Et-Re;if(Wt<0||Wt===1/0)return;ne.setup(U,V,de,z,we);let zt,wt=Ke;if(we!==null&&(zt=Y.get(we),wt=R,wt.setIndex(zt)),U.isMesh)V.wireframe===!0?(Ce.setLineWidth(V.wireframeLinewidth*jt()),wt.setMode(I.LINES)):wt.setMode(I.TRIANGLES);else if(U.isLine){let gn=V.linewidth;gn===void 0&&(gn=1),Ce.setLineWidth(gn*jt()),U.isLineSegments?wt.setMode(I.LINES):U.isLineLoop?wt.setMode(I.LINE_LOOP):wt.setMode(I.LINE_STRIP)}else U.isPoints?wt.setMode(I.POINTS):U.isSprite&&wt.setMode(I.TRIANGLES);if(U.isBatchedMesh)if(U._multiDrawInstances!==null)ml("WebGLRenderer: renderMultiDrawInstances has been deprecated and will be removed in r184. Append to renderMultiDraw arguments and use indirection."),wt.renderMultiDrawInstances(U._multiDrawStarts,U._multiDrawCounts,U._multiDrawCount,U._multiDrawInstances);else if(pt.get("WEBGL_multi_draw"))wt.renderMultiDraw(U._multiDrawStarts,U._multiDrawCounts,U._multiDrawCount);else{let gn=U._multiDrawStarts,Te=U._multiDrawCounts,Xn=U._multiDrawCount,ut=we?Y.get(we).bytesPerElement:1,xi=v.get(V).currentProgram.getUniforms();for(let Hi=0;Hi<Xn;Hi++)xi.setValue(I,"_gl_DrawID",Hi),wt.render(gn[Hi]/ut,Te[Hi])}else if(U.isInstancedMesh)wt.renderInstances(Re,Wt,U.count);else if(z.isInstancedBufferGeometry){let gn=z._maxInstanceCount!==void 0?z._maxInstanceCount:1/0,Te=Math.min(z.instanceCount,gn);wt.renderInstances(Re,Wt,Te)}else wt.render(Re,Wt)};function N0(x,P,z){x.transparent===!0&&x.side===Ki&&x.forceSinglePass===!1?(x.side=Un,x.needsUpdate=!0,jl(x,P,z),x.side=Tr,x.needsUpdate=!0,jl(x,P,z),x.side=Ki):jl(x,P,z)}this.compile=function(x,P,z=null){z===null&&(z=x),D=J.get(z),D.init(P),A.push(D),z.traverseVisible(function(U){U.isLight&&U.layers.test(P.layers)&&(D.pushLight(U),U.castShadow&&D.pushShadow(U))}),x!==z&&x.traverseVisible(function(U){U.isLight&&U.layers.test(P.layers)&&(D.pushLight(U),U.castShadow&&D.pushShadow(U))}),D.setupLights();let V=new Set;return x.traverse(function(U){if(!(U.isMesh||U.isPoints||U.isLine||U.isSprite))return;let ue=U.material;if(ue)if(Array.isArray(ue))for(let ge=0;ge<ue.length;ge++){let de=ue[ge];N0(de,z,U),V.add(de)}else N0(ue,z,U),V.add(ue)}),D=A.pop(),V},this.compileAsync=function(x,P,z=null){let V=this.compile(x,P,z);return new Promise(U=>{function ue(){if(V.forEach(function(ge){v.get(ge).currentProgram.isReady()&&V.delete(ge)}),V.size===0){U(x);return}setTimeout(ue,10)}pt.get("KHR_parallel_shader_compile")!==null?ue():setTimeout(ue,10)})};let Ap=null;function Lw(x){Ap&&Ap(x)}function P0(){bo.stop()}function O0(){bo.start()}let bo=new bw;bo.setAnimationLoop(Lw),typeof self<"u"&&bo.setContext(self),this.setAnimationLoop=function(x){Ap=x,W.setAnimationLoop(x),x===null?bo.stop():bo.start()},W.addEventListener("sessionstart",P0),W.addEventListener("sessionend",O0),this.render=function(x,P){if(P!==void 0&&P.isCamera!==!0){Fe("WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(j===!0)return;let z=W.enabled===!0&&W.isPresenting===!0,V=y!==null&&(k===null||z)&&y.begin(M,k);if(x.matrixWorldAutoUpdate===!0&&x.updateMatrixWorld(),P.parent===null&&P.matrixWorldAutoUpdate===!0&&P.updateMatrixWorld(),W.enabled===!0&&W.isPresenting===!0&&(y===null||y.isCompositing()===!1)&&(W.cameraAutoUpdate===!0&&W.updateCamera(P),P=W.getCamera()),x.isScene===!0&&x.onBeforeRender(M,x,P,k),D=J.get(x,A.length),D.init(P),A.push(D),nn.multiplyMatrices(P.projectionMatrix,P.matrixWorldInverse),Xe.setFromProjectionMatrix(nn,Fi,P.reversedDepth),Ve=this.localClippingEnabled,Oe=te.init(this.clippingPlanes,Ve),S=Ue.get(x,C.length),S.init(),C.push(S),W.enabled===!0&&W.isPresenting===!0){let ge=M.xr.getDepthSensingMesh();ge!==null&&Rp(ge,P,-1/0,M.sortObjects)}Rp(x,P,0,M.sortObjects),S.finish(),M.sortObjects===!0&&S.sort(Ft,Lt),Je=W.enabled===!1||W.isPresenting===!1||W.hasDepthSensing()===!1,Je&&Ee.addToRenderList(S,x),this.info.render.frame++,Oe===!0&&te.beginShadows();let U=D.state.shadowsArray;if(Me.render(U,x,P),Oe===!0&&te.endShadows(),this.info.autoReset===!0&&this.info.reset(),(V&&y.hasRenderPass())===!1){let ge=S.opaque,de=S.transmissive;if(D.setupLights(),P.isArrayCamera){let we=P.cameras;if(de.length>0)for(let Ie=0,$e=we.length;Ie<$e;Ie++){let Qe=we[Ie];F0(ge,de,x,Qe)}Je&&Ee.render(x);for(let Ie=0,$e=we.length;Ie<$e;Ie++){let Qe=we[Ie];L0(S,x,Qe,Qe.viewport)}}else de.length>0&&F0(ge,de,x,P),Je&&Ee.render(x),L0(S,x,P)}k!==null&&L===0&&(N.updateMultisampleRenderTarget(k),N.updateRenderTargetMipmap(k)),V&&y.end(M),x.isScene===!0&&x.onAfterRender(M,x,P),ne.resetDefaultState(),G=-1,B=null,A.pop(),A.length>0?(D=A[A.length-1],Oe===!0&&te.setGlobalState(M.clippingPlanes,D.state.camera)):D=null,C.pop(),C.length>0?S=C[C.length-1]:S=null};function Rp(x,P,z,V){if(x.visible===!1)return;if(x.layers.test(P.layers)){if(x.isGroup)z=x.renderOrder;else if(x.isLOD)x.autoUpdate===!0&&x.update(P);else if(x.isLight)D.pushLight(x),x.castShadow&&D.pushShadow(x);else if(x.isSprite){if(!x.frustumCulled||Xe.intersectsSprite(x)){V&&xt.setFromMatrixPosition(x.matrixWorld).applyMatrix4(nn);let ge=be.update(x),de=x.material;de.visible&&S.push(x,ge,de,z,xt.z,null)}}else if((x.isMesh||x.isLine||x.isPoints)&&(!x.frustumCulled||Xe.intersectsObject(x))){let ge=be.update(x),de=x.material;if(V&&(x.boundingSphere!==void 0?(x.boundingSphere===null&&x.computeBoundingSphere(),xt.copy(x.boundingSphere.center)):(ge.boundingSphere===null&&ge.computeBoundingSphere(),xt.copy(ge.boundingSphere.center)),xt.applyMatrix4(x.matrixWorld).applyMatrix4(nn)),Array.isArray(de)){let we=ge.groups;for(let Ie=0,$e=we.length;Ie<$e;Ie++){let Qe=we[Ie],Re=de[Qe.materialIndex];Re&&Re.visible&&S.push(x,ge,Re,z,xt.z,Qe)}}else de.visible&&S.push(x,ge,de,z,xt.z,null)}}let ue=x.children;for(let ge=0,de=ue.length;ge<de;ge++)Rp(ue[ge],P,z,V)}function L0(x,P,z,V){let{opaque:U,transmissive:ue,transparent:ge}=x;D.setupLightsView(z),Oe===!0&&te.setGlobalState(M.clippingPlanes,z),V&&Ce.viewport(H.copy(V)),U.length>0&&Gl(U,P,z),ue.length>0&&Gl(ue,P,z),ge.length>0&&Gl(ge,P,z),Ce.buffers.depth.setTest(!0),Ce.buffers.depth.setMask(!0),Ce.buffers.color.setMask(!0),Ce.setPolygonOffset(!1)}function F0(x,P,z,V){if((z.isScene===!0?z.overrideMaterial:null)!==null)return;if(D.state.transmissionRenderTarget[V.id]===void 0){let Re=pt.has("EXT_color_buffer_half_float")||pt.has("EXT_color_buffer_float");D.state.transmissionRenderTarget[V.id]=new ri(1,1,{generateMipmaps:!0,type:Re?er:qn,minFilter:yo,samples:Math.max(4,Rt.samples),stencilBuffer:o,resolveDepthBuffer:!1,resolveStencilBuffer:!1,colorSpace:at.workingColorSpace})}let ue=D.state.transmissionRenderTarget[V.id],ge=V.viewport||H;ue.setSize(ge.z*M.transmissionResolutionScale,ge.w*M.transmissionResolutionScale);let de=M.getRenderTarget(),we=M.getActiveCubeFace(),Ie=M.getActiveMipmapLevel();M.setRenderTarget(ue),M.getClearColor(Z),he=M.getClearAlpha(),he<1&&M.setClearColor(16777215,.5),M.clear(),Je&&Ee.render(z);let $e=M.toneMapping;M.toneMapping=Ui;let Qe=V.viewport;if(V.viewport!==void 0&&(V.viewport=void 0),D.setupLightsView(V),Oe===!0&&te.setGlobalState(M.clippingPlanes,V),Gl(x,z,V),N.updateMultisampleRenderTarget(ue),N.updateRenderTargetMipmap(ue),pt.has("WEBGL_multisampled_render_to_texture")===!1){let Re=!1;for(let Et=0,Wt=P.length;Et<Wt;Et++){let zt=P[Et],{object:wt,geometry:gn,material:Te,group:Xn}=zt;if(Te.side===Ki&&wt.layers.test(V.layers)){let ut=Te.side;Te.side=Un,Te.needsUpdate=!0,k0(wt,z,V,gn,Te,Xn),Te.side=ut,Te.needsUpdate=!0,Re=!0}}Re===!0&&(N.updateMultisampleRenderTarget(ue),N.updateRenderTargetMipmap(ue))}M.setRenderTarget(de,we,Ie),M.setClearColor(Z,he),Qe!==void 0&&(V.viewport=Qe),M.toneMapping=$e}function Gl(x,P,z){let V=P.isScene===!0?P.overrideMaterial:null;for(let U=0,ue=x.length;U<ue;U++){let ge=x[U],{object:de,geometry:we,group:Ie}=ge,$e=ge.material;$e.allowOverride===!0&&V!==null&&($e=V),de.layers.test(z.layers)&&k0(de,P,z,we,$e,Ie)}}function k0(x,P,z,V,U,ue){x.onBeforeRender(M,P,z,V,U,ue),x.modelViewMatrix.multiplyMatrices(z.matrixWorldInverse,x.matrixWorld),x.normalMatrix.getNormalMatrix(x.modelViewMatrix),U.onBeforeRender(M,P,z,V,x,ue),U.transparent===!0&&U.side===Ki&&U.forceSinglePass===!1?(U.side=Un,U.needsUpdate=!0,M.renderBufferDirect(z,P,V,U,x,ue),U.side=Tr,U.needsUpdate=!0,M.renderBufferDirect(z,P,V,U,x,ue),U.side=Ki):M.renderBufferDirect(z,P,V,U,x,ue),x.onAfterRender(M,P,z,V,U,ue)}function jl(x,P,z){P.isScene!==!0&&(P=Dt);let V=v.get(x),U=D.state.lights,ue=D.state.shadowsArray,ge=U.state.version,de=re.getParameters(x,U.state,ue,P,z),we=re.getProgramCacheKey(de),Ie=V.programs;V.environment=x.isMeshStandardMaterial||x.isMeshLambertMaterial||x.isMeshPhongMaterial?P.environment:null,V.fog=P.fog;let $e=x.isMeshStandardMaterial||x.isMeshLambertMaterial&&!x.envMap||x.isMeshPhongMaterial&&!x.envMap;V.envMap=q.get(x.envMap||V.environment,$e),V.envMapRotation=V.environment!==null&&x.envMap===null?P.environmentRotation:x.envMapRotation,Ie===void 0&&(x.addEventListener("dispose",bt),Ie=new Map,V.programs=Ie);let Qe=Ie.get(we);if(Qe!==void 0){if(V.currentProgram===Qe&&V.lightsStateVersion===ge)return B0(x,de),Qe}else de.uniforms=re.getUniforms(x),x.onBeforeCompile(de,M),Qe=re.acquireProgram(de,we),Ie.set(we,Qe),V.uniforms=de.uniforms;let Re=V.uniforms;return(!x.isShaderMaterial&&!x.isRawShaderMaterial||x.clipping===!0)&&(Re.clippingPlanes=te.uniform),B0(x,de),V.needsLights=Uw(x),V.lightsStateVersion=ge,V.needsLights&&(Re.ambientLightColor.value=U.state.ambient,Re.lightProbe.value=U.state.probe,Re.directionalLights.value=U.state.directional,Re.directionalLightShadows.value=U.state.directionalShadow,Re.spotLights.value=U.state.spot,Re.spotLightShadows.value=U.state.spotShadow,Re.rectAreaLights.value=U.state.rectArea,Re.ltc_1.value=U.state.rectAreaLTC1,Re.ltc_2.value=U.state.rectAreaLTC2,Re.pointLights.value=U.state.point,Re.pointLightShadows.value=U.state.pointShadow,Re.hemisphereLights.value=U.state.hemi,Re.directionalShadowMatrix.value=U.state.directionalShadowMatrix,Re.spotLightMatrix.value=U.state.spotLightMatrix,Re.spotLightMap.value=U.state.spotLightMap,Re.pointShadowMatrix.value=U.state.pointShadowMatrix),V.currentProgram=Qe,V.uniformsList=null,Qe}function U0(x){if(x.uniformsList===null){let P=x.currentProgram.getUniforms();x.uniformsList=ja.seqWithValue(P.seq,x.uniforms)}return x.uniformsList}function B0(x,P){let z=v.get(x);z.outputColorSpace=P.outputColorSpace,z.batching=P.batching,z.batchingColor=P.batchingColor,z.instancing=P.instancing,z.instancingColor=P.instancingColor,z.instancingMorph=P.instancingMorph,z.skinning=P.skinning,z.morphTargets=P.morphTargets,z.morphNormals=P.morphNormals,z.morphColors=P.morphColors,z.morphTargetsCount=P.morphTargetsCount,z.numClippingPlanes=P.numClippingPlanes,z.numIntersection=P.numClipIntersection,z.vertexAlphas=P.vertexAlphas,z.vertexTangents=P.vertexTangents,z.toneMapping=P.toneMapping}function Fw(x,P,z,V,U){P.isScene!==!0&&(P=Dt),N.resetTextureUnits();let ue=P.fog,ge=V.isMeshStandardMaterial||V.isMeshLambertMaterial||V.isMeshPhongMaterial?P.environment:null,de=k===null?M.outputColorSpace:k.isXRRenderTarget===!0?k.texture.colorSpace:ls,we=V.isMeshStandardMaterial||V.isMeshLambertMaterial&&!V.envMap||V.isMeshPhongMaterial&&!V.envMap,Ie=q.get(V.envMap||ge,we),$e=V.vertexColors===!0&&!!z.attributes.color&&z.attributes.color.itemSize===4,Qe=!!z.attributes.tangent&&(!!V.normalMap||V.anisotropy>0),Re=!!z.morphAttributes.position,Et=!!z.morphAttributes.normal,Wt=!!z.morphAttributes.color,zt=Ui;V.toneMapped&&(k===null||k.isXRRenderTarget===!0)&&(zt=M.toneMapping);let wt=z.morphAttributes.position||z.morphAttributes.normal||z.morphAttributes.color,gn=wt!==void 0?wt.length:0,Te=v.get(V),Xn=D.state.lights;if(Oe===!0&&(Ve===!0||x!==B)){let rn=x===B&&V.id===G;te.setState(V,x,rn)}let ut=!1;V.version===Te.__version?(Te.needsLights&&Te.lightsStateVersion!==Xn.state.version||Te.outputColorSpace!==de||U.isBatchedMesh&&Te.batching===!1||!U.isBatchedMesh&&Te.batching===!0||U.isBatchedMesh&&Te.batchingColor===!0&&U.colorTexture===null||U.isBatchedMesh&&Te.batchingColor===!1&&U.colorTexture!==null||U.isInstancedMesh&&Te.instancing===!1||!U.isInstancedMesh&&Te.instancing===!0||U.isSkinnedMesh&&Te.skinning===!1||!U.isSkinnedMesh&&Te.skinning===!0||U.isInstancedMesh&&Te.instancingColor===!0&&U.instanceColor===null||U.isInstancedMesh&&Te.instancingColor===!1&&U.instanceColor!==null||U.isInstancedMesh&&Te.instancingMorph===!0&&U.morphTexture===null||U.isInstancedMesh&&Te.instancingMorph===!1&&U.morphTexture!==null||Te.envMap!==Ie||V.fog===!0&&Te.fog!==ue||Te.numClippingPlanes!==void 0&&(Te.numClippingPlanes!==te.numPlanes||Te.numIntersection!==te.numIntersection)||Te.vertexAlphas!==$e||Te.vertexTangents!==Qe||Te.morphTargets!==Re||Te.morphNormals!==Et||Te.morphColors!==Wt||Te.toneMapping!==zt||Te.morphTargetsCount!==gn)&&(ut=!0):(ut=!0,Te.__version=V.version);let xi=Te.currentProgram;ut===!0&&(xi=jl(V,P,U));let Hi=!1,Mo=!1,vs=!1,It=xi.getUniforms(),dn=Te.uniforms;if(Ce.useProgram(xi.program)&&(Hi=!0,Mo=!0,vs=!0),V.id!==G&&(G=V.id,Mo=!0),Hi||B!==x){Ce.buffers.depth.getReversed()&&x.reversedDepth!==!0&&(x._reversedDepth=!0,x.updateProjectionMatrix()),It.setValue(I,"projectionMatrix",x.projectionMatrix),It.setValue(I,"viewMatrix",x.matrixWorldInverse);let Pr=It.map.cameraPosition;Pr!==void 0&&Pr.setValue(I,ct.setFromMatrixPosition(x.matrixWorld)),Rt.logarithmicDepthBuffer&&It.setValue(I,"logDepthBufFC",2/(Math.log(x.far+1)/Math.LN2)),(V.isMeshPhongMaterial||V.isMeshToonMaterial||V.isMeshLambertMaterial||V.isMeshBasicMaterial||V.isMeshStandardMaterial||V.isShaderMaterial)&&It.setValue(I,"isOrthographic",x.isOrthographicCamera===!0),B!==x&&(B=x,Mo=!0,vs=!0)}if(Te.needsLights&&(Xn.state.directionalShadowMap.length>0&&It.setValue(I,"directionalShadowMap",Xn.state.directionalShadowMap,N),Xn.state.spotShadowMap.length>0&&It.setValue(I,"spotShadowMap",Xn.state.spotShadowMap,N),Xn.state.pointShadowMap.length>0&&It.setValue(I,"pointShadowMap",Xn.state.pointShadowMap,N)),U.isSkinnedMesh){It.setOptional(I,U,"bindMatrix"),It.setOptional(I,U,"bindMatrixInverse");let rn=U.skeleton;rn&&(rn.boneTexture===null&&rn.computeBoneTexture(),It.setValue(I,"boneTexture",rn.boneTexture,N))}U.isBatchedMesh&&(It.setOptional(I,U,"batchingTexture"),It.setValue(I,"batchingTexture",U._matricesTexture,N),It.setOptional(I,U,"batchingIdTexture"),It.setValue(I,"batchingIdTexture",U._indirectTexture,N),It.setOptional(I,U,"batchingColorTexture"),U._colorsTexture!==null&&It.setValue(I,"batchingColorTexture",U._colorsTexture,N));let Nr=z.morphAttributes;if((Nr.position!==void 0||Nr.normal!==void 0||Nr.color!==void 0)&&pe.update(U,z,xi),(Mo||Te.receiveShadow!==U.receiveShadow)&&(Te.receiveShadow=U.receiveShadow,It.setValue(I,"receiveShadow",U.receiveShadow)),(V.isMeshStandardMaterial||V.isMeshLambertMaterial||V.isMeshPhongMaterial)&&V.envMap===null&&P.environment!==null&&(dn.envMapIntensity.value=P.environmentIntensity),dn.dfgLUT!==void 0&&(dn.dfgLUT.value=L2()),Mo&&(It.setValue(I,"toneMappingExposure",M.toneMappingExposure),Te.needsLights&&kw(dn,vs),ue&&V.fog===!0&&Ne.refreshFogUniforms(dn,ue),Ne.refreshMaterialUniforms(dn,V,Ye,me,D.state.transmissionRenderTarget[x.id]),ja.upload(I,U0(Te),dn,N)),V.isShaderMaterial&&V.uniformsNeedUpdate===!0&&(ja.upload(I,U0(Te),dn,N),V.uniformsNeedUpdate=!1),V.isSpriteMaterial&&It.setValue(I,"center",U.center),It.setValue(I,"modelViewMatrix",U.modelViewMatrix),It.setValue(I,"normalMatrix",U.normalMatrix),It.setValue(I,"modelMatrix",U.matrixWorld),V.isShaderMaterial||V.isRawShaderMaterial){let rn=V.uniformsGroups;for(let Pr=0,ys=rn.length;Pr<ys;Pr++){let V0=rn[Pr];ye.update(V0,xi),ye.bind(V0,xi)}}return xi}function kw(x,P){x.ambientLightColor.needsUpdate=P,x.lightProbe.needsUpdate=P,x.directionalLights.needsUpdate=P,x.directionalLightShadows.needsUpdate=P,x.pointLights.needsUpdate=P,x.pointLightShadows.needsUpdate=P,x.spotLights.needsUpdate=P,x.spotLightShadows.needsUpdate=P,x.rectAreaLights.needsUpdate=P,x.hemisphereLights.needsUpdate=P}function Uw(x){return x.isMeshLambertMaterial||x.isMeshToonMaterial||x.isMeshPhongMaterial||x.isMeshStandardMaterial||x.isShadowMaterial||x.isShaderMaterial&&x.lights===!0}this.getActiveCubeFace=function(){return T},this.getActiveMipmapLevel=function(){return L},this.getRenderTarget=function(){return k},this.setRenderTargetTextures=function(x,P,z){let V=v.get(x);V.__autoAllocateDepthBuffer=x.resolveDepthBuffer===!1,V.__autoAllocateDepthBuffer===!1&&(V.__useRenderToTexture=!1),v.get(x.texture).__webglTexture=P,v.get(x.depthTexture).__webglTexture=V.__autoAllocateDepthBuffer?void 0:z,V.__hasExternalTextures=!0},this.setRenderTargetFramebuffer=function(x,P){let z=v.get(x);z.__webglFramebuffer=P,z.__useDefaultFramebuffer=P===void 0};let Bw=I.createFramebuffer();this.setRenderTarget=function(x,P=0,z=0){k=x,T=P,L=z;let V=null,U=!1,ue=!1;if(x){let de=v.get(x);if(de.__useDefaultFramebuffer!==void 0){Ce.bindFramebuffer(I.FRAMEBUFFER,de.__webglFramebuffer),H.copy(x.viewport),F.copy(x.scissor),ee=x.scissorTest,Ce.viewport(H),Ce.scissor(F),Ce.setScissorTest(ee),G=-1;return}else if(de.__webglFramebuffer===void 0)N.setupRenderTarget(x);else if(de.__hasExternalTextures)N.rebindTextures(x,v.get(x.texture).__webglTexture,v.get(x.depthTexture).__webglTexture);else if(x.depthBuffer){let $e=x.depthTexture;if(de.__boundDepthTexture!==$e){if($e!==null&&v.has($e)&&(x.width!==$e.image.width||x.height!==$e.image.height))throw new Error("WebGLRenderTarget: Attached DepthTexture is initialized to the incorrect size.");N.setupDepthRenderbuffer(x)}}let we=x.texture;(we.isData3DTexture||we.isDataArrayTexture||we.isCompressedArrayTexture)&&(ue=!0);let Ie=v.get(x).__webglFramebuffer;x.isWebGLCubeRenderTarget?(Array.isArray(Ie[P])?V=Ie[P][z]:V=Ie[P],U=!0):x.samples>0&&N.useMultisampledRTT(x)===!1?V=v.get(x).__webglMultisampledFramebuffer:Array.isArray(Ie)?V=Ie[z]:V=Ie,H.copy(x.viewport),F.copy(x.scissor),ee=x.scissorTest}else H.copy(X).multiplyScalar(Ye).floor(),F.copy(ie).multiplyScalar(Ye).floor(),ee=se;if(z!==0&&(V=Bw),Ce.bindFramebuffer(I.FRAMEBUFFER,V)&&Ce.drawBuffers(x,V),Ce.viewport(H),Ce.scissor(F),Ce.setScissorTest(ee),U){let de=v.get(x.texture);I.framebufferTexture2D(I.FRAMEBUFFER,I.COLOR_ATTACHMENT0,I.TEXTURE_CUBE_MAP_POSITIVE_X+P,de.__webglTexture,z)}else if(ue){let de=P;for(let we=0;we<x.textures.length;we++){let Ie=v.get(x.textures[we]);I.framebufferTextureLayer(I.FRAMEBUFFER,I.COLOR_ATTACHMENT0+we,Ie.__webglTexture,z,de)}}else if(x!==null&&z!==0){let de=v.get(x.texture);I.framebufferTexture2D(I.FRAMEBUFFER,I.COLOR_ATTACHMENT0,I.TEXTURE_2D,de.__webglTexture,z)}G=-1},this.readRenderTargetPixels=function(x,P,z,V,U,ue,ge,de=0){if(!(x&&x.isWebGLRenderTarget)){Fe("WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let we=v.get(x).__webglFramebuffer;if(x.isWebGLCubeRenderTarget&&ge!==void 0&&(we=we[ge]),we){Ce.bindFramebuffer(I.FRAMEBUFFER,we);try{let Ie=x.textures[de],$e=Ie.format,Qe=Ie.type;if(x.textures.length>1&&I.readBuffer(I.COLOR_ATTACHMENT0+de),!Rt.textureFormatReadable($e)){Fe("WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}if(!Rt.textureTypeReadable(Qe)){Fe("WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}P>=0&&P<=x.width-V&&z>=0&&z<=x.height-U&&I.readPixels(P,z,V,U,oe.convert($e),oe.convert(Qe),ue)}finally{let Ie=k!==null?v.get(k).__webglFramebuffer:null;Ce.bindFramebuffer(I.FRAMEBUFFER,Ie)}}},this.readRenderTargetPixelsAsync=async function(x,P,z,V,U,ue,ge,de=0){if(!(x&&x.isWebGLRenderTarget))throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let we=v.get(x).__webglFramebuffer;if(x.isWebGLCubeRenderTarget&&ge!==void 0&&(we=we[ge]),we)if(P>=0&&P<=x.width-V&&z>=0&&z<=x.height-U){Ce.bindFramebuffer(I.FRAMEBUFFER,we);let Ie=x.textures[de],$e=Ie.format,Qe=Ie.type;if(x.textures.length>1&&I.readBuffer(I.COLOR_ATTACHMENT0+de),!Rt.textureFormatReadable($e))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(!Rt.textureTypeReadable(Qe))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");let Re=I.createBuffer();I.bindBuffer(I.PIXEL_PACK_BUFFER,Re),I.bufferData(I.PIXEL_PACK_BUFFER,ue.byteLength,I.STREAM_READ),I.readPixels(P,z,V,U,oe.convert($e),oe.convert(Qe),0);let Et=k!==null?v.get(k).__webglFramebuffer:null;Ce.bindFramebuffer(I.FRAMEBUFFER,Et);let Wt=I.fenceSync(I.SYNC_GPU_COMMANDS_COMPLETE,0);return I.flush(),await YE(I,Wt,4),I.bindBuffer(I.PIXEL_PACK_BUFFER,Re),I.getBufferSubData(I.PIXEL_PACK_BUFFER,0,ue),I.deleteBuffer(Re),I.deleteSync(Wt),ue}else throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.")},this.copyFramebufferToTexture=function(x,P=null,z=0){let V=Math.pow(2,-z),U=Math.floor(x.image.width*V),ue=Math.floor(x.image.height*V),ge=P!==null?P.x:0,de=P!==null?P.y:0;N.setTexture2D(x,0),I.copyTexSubImage2D(I.TEXTURE_2D,z,0,0,ge,de,U,ue),Ce.unbindTexture()};let Vw=I.createFramebuffer(),Hw=I.createFramebuffer();this.copyTextureToTexture=function(x,P,z=null,V=null,U=0,ue=0){let ge,de,we,Ie,$e,Qe,Re,Et,Wt,zt=x.isCompressedTexture?x.mipmaps[ue]:x.image;if(z!==null)ge=z.max.x-z.min.x,de=z.max.y-z.min.y,we=z.isBox3?z.max.z-z.min.z:1,Ie=z.min.x,$e=z.min.y,Qe=z.isBox3?z.min.z:0;else{let dn=Math.pow(2,-U);ge=Math.floor(zt.width*dn),de=Math.floor(zt.height*dn),x.isDataArrayTexture?we=zt.depth:x.isData3DTexture?we=Math.floor(zt.depth*dn):we=1,Ie=0,$e=0,Qe=0}V!==null?(Re=V.x,Et=V.y,Wt=V.z):(Re=0,Et=0,Wt=0);let wt=oe.convert(P.format),gn=oe.convert(P.type),Te;P.isData3DTexture?(N.setTexture3D(P,0),Te=I.TEXTURE_3D):P.isDataArrayTexture||P.isCompressedArrayTexture?(N.setTexture2DArray(P,0),Te=I.TEXTURE_2D_ARRAY):(N.setTexture2D(P,0),Te=I.TEXTURE_2D),I.pixelStorei(I.UNPACK_FLIP_Y_WEBGL,P.flipY),I.pixelStorei(I.UNPACK_PREMULTIPLY_ALPHA_WEBGL,P.premultiplyAlpha),I.pixelStorei(I.UNPACK_ALIGNMENT,P.unpackAlignment);let Xn=I.getParameter(I.UNPACK_ROW_LENGTH),ut=I.getParameter(I.UNPACK_IMAGE_HEIGHT),xi=I.getParameter(I.UNPACK_SKIP_PIXELS),Hi=I.getParameter(I.UNPACK_SKIP_ROWS),Mo=I.getParameter(I.UNPACK_SKIP_IMAGES);I.pixelStorei(I.UNPACK_ROW_LENGTH,zt.width),I.pixelStorei(I.UNPACK_IMAGE_HEIGHT,zt.height),I.pixelStorei(I.UNPACK_SKIP_PIXELS,Ie),I.pixelStorei(I.UNPACK_SKIP_ROWS,$e),I.pixelStorei(I.UNPACK_SKIP_IMAGES,Qe);let vs=x.isDataArrayTexture||x.isData3DTexture,It=P.isDataArrayTexture||P.isData3DTexture;if(x.isDepthTexture){let dn=v.get(x),Nr=v.get(P),rn=v.get(dn.__renderTarget),Pr=v.get(Nr.__renderTarget);Ce.bindFramebuffer(I.READ_FRAMEBUFFER,rn.__webglFramebuffer),Ce.bindFramebuffer(I.DRAW_FRAMEBUFFER,Pr.__webglFramebuffer);for(let ys=0;ys<we;ys++)vs&&(I.framebufferTextureLayer(I.READ_FRAMEBUFFER,I.COLOR_ATTACHMENT0,v.get(x).__webglTexture,U,Qe+ys),I.framebufferTextureLayer(I.DRAW_FRAMEBUFFER,I.COLOR_ATTACHMENT0,v.get(P).__webglTexture,ue,Wt+ys)),I.blitFramebuffer(Ie,$e,ge,de,Re,Et,ge,de,I.DEPTH_BUFFER_BIT,I.NEAREST);Ce.bindFramebuffer(I.READ_FRAMEBUFFER,null),Ce.bindFramebuffer(I.DRAW_FRAMEBUFFER,null)}else if(U!==0||x.isRenderTargetTexture||v.has(x)){let dn=v.get(x),Nr=v.get(P);Ce.bindFramebuffer(I.READ_FRAMEBUFFER,Vw),Ce.bindFramebuffer(I.DRAW_FRAMEBUFFER,Hw);for(let rn=0;rn<we;rn++)vs?I.framebufferTextureLayer(I.READ_FRAMEBUFFER,I.COLOR_ATTACHMENT0,dn.__webglTexture,U,Qe+rn):I.framebufferTexture2D(I.READ_FRAMEBUFFER,I.COLOR_ATTACHMENT0,I.TEXTURE_2D,dn.__webglTexture,U),It?I.framebufferTextureLayer(I.DRAW_FRAMEBUFFER,I.COLOR_ATTACHMENT0,Nr.__webglTexture,ue,Wt+rn):I.framebufferTexture2D(I.DRAW_FRAMEBUFFER,I.COLOR_ATTACHMENT0,I.TEXTURE_2D,Nr.__webglTexture,ue),U!==0?I.blitFramebuffer(Ie,$e,ge,de,Re,Et,ge,de,I.COLOR_BUFFER_BIT,I.NEAREST):It?I.copyTexSubImage3D(Te,ue,Re,Et,Wt+rn,Ie,$e,ge,de):I.copyTexSubImage2D(Te,ue,Re,Et,Ie,$e,ge,de);Ce.bindFramebuffer(I.READ_FRAMEBUFFER,null),Ce.bindFramebuffer(I.DRAW_FRAMEBUFFER,null)}else It?x.isDataTexture||x.isData3DTexture?I.texSubImage3D(Te,ue,Re,Et,Wt,ge,de,we,wt,gn,zt.data):P.isCompressedArrayTexture?I.compressedTexSubImage3D(Te,ue,Re,Et,Wt,ge,de,we,wt,zt.data):I.texSubImage3D(Te,ue,Re,Et,Wt,ge,de,we,wt,gn,zt):x.isDataTexture?I.texSubImage2D(I.TEXTURE_2D,ue,Re,Et,ge,de,wt,gn,zt.data):x.isCompressedTexture?I.compressedTexSubImage2D(I.TEXTURE_2D,ue,Re,Et,zt.width,zt.height,wt,zt.data):I.texSubImage2D(I.TEXTURE_2D,ue,Re,Et,ge,de,wt,gn,zt);I.pixelStorei(I.UNPACK_ROW_LENGTH,Xn),I.pixelStorei(I.UNPACK_IMAGE_HEIGHT,ut),I.pixelStorei(I.UNPACK_SKIP_PIXELS,xi),I.pixelStorei(I.UNPACK_SKIP_ROWS,Hi),I.pixelStorei(I.UNPACK_SKIP_IMAGES,Mo),ue===0&&P.generateMipmaps&&I.generateMipmap(Te),Ce.unbindTexture()},this.initRenderTarget=function(x){v.get(x).__webglFramebuffer===void 0&&N.setupRenderTarget(x)},this.initTexture=function(x){x.isCubeTexture?N.setTextureCube(x,0):x.isData3DTexture?N.setTexture3D(x,0):x.isDataArrayTexture||x.isCompressedArrayTexture?N.setTexture2DArray(x,0):N.setTexture2D(x,0),Ce.unbindTexture()},this.resetState=function(){T=0,L=0,k=null,Ce.reset(),ne.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return Fi}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(e){this._outputColorSpace=e;let t=this.getContext();t.drawingBufferColorSpace=at._getDrawingBufferColorSpace(e),t.unpackColorSpace=at._getUnpackColorSpace()}};var F2=["brushCanvas"],Mp=class n{constructor(e){this.ngZone=e}fossil;close=new kt;collect=new kt;brushCanvasRef;phase="brushing";brushProgress=0;ctx;isDrawing=!1;strokeCount=0;initTimeout=0;onDownBound;onMoveBound;onUpBound;onLeaveBound;ngAfterViewInit(){this.initTimeout=window.setTimeout(()=>this.initCanvas(),60)}ngOnDestroy(){clearTimeout(this.initTimeout);let e=this.brushCanvasRef?.nativeElement;e&&(this.onDownBound&&e.removeEventListener("pointerdown",this.onDownBound),this.onMoveBound&&e.removeEventListener("pointermove",this.onMoveBound),this.onUpBound&&e.removeEventListener("pointerup",this.onUpBound),this.onLeaveBound&&e.removeEventListener("pointerleave",this.onLeaveBound))}initCanvas(){let e=this.brushCanvasRef.nativeElement;e.width=e.offsetWidth||320,e.height=e.offsetHeight||180,this.ctx=e.getContext("2d"),this.drawSediment(),this.onDownBound=t=>this.onDown(t),this.onMoveBound=t=>this.onMove(t),this.onUpBound=()=>{this.isDrawing=!1},this.onLeaveBound=()=>{this.isDrawing=!1},this.ngZone.runOutsideAngular(()=>{e.addEventListener("pointerdown",this.onDownBound,{passive:!1}),e.addEventListener("pointermove",this.onMoveBound,{passive:!1}),e.addEventListener("pointerup",this.onUpBound),e.addEventListener("pointerleave",this.onLeaveBound)})}drawSediment(){let{width:e,height:t}=this.ctx.canvas,i=this.ctx.createLinearGradient(0,0,0,t);i.addColorStop(0,"#b07830"),i.addColorStop(.5,"#8B5e14"),i.addColorStop(1,"#5c3a08"),this.ctx.fillStyle=i,this.ctx.fillRect(0,0,e,t);for(let r=0;r<220;r++){let o=130+Math.random()*70|0,s=65+Math.random()*55|0,a=8+Math.random()*35|0,c=(.2+Math.random()*.5).toFixed(2);this.ctx.fillStyle=`rgba(${o},${s},${a},${c})`,this.ctx.beginPath(),this.ctx.arc(Math.random()*e,Math.random()*t,2+Math.random()*14,0,Math.PI*2),this.ctx.fill()}this.ctx.strokeStyle="rgba(35,15,0,0.4)";for(let r=0;r<14;r++)this.ctx.lineWidth=.5+Math.random()*1.5,this.ctx.beginPath(),this.ctx.moveTo(Math.random()*e,Math.random()*t),this.ctx.bezierCurveTo(Math.random()*e,Math.random()*t,Math.random()*e,Math.random()*t,Math.random()*e,Math.random()*t),this.ctx.stroke()}onDown(e){this.isDrawing=!0,e.target.setPointerCapture(e.pointerId),this.brush(e)}onMove(e){this.isDrawing&&this.brush(e)}brush(e){let t=this.brushCanvasRef.nativeElement,i=t.getBoundingClientRect(),r=(e.clientX-i.left)*(t.width/i.width),o=(e.clientY-i.top)*(t.height/i.height),s=34,a=this.ctx.createRadialGradient(r,o,0,r,o,s);a.addColorStop(0,"rgba(0,0,0,1)"),a.addColorStop(.5,"rgba(0,0,0,0.85)"),a.addColorStop(1,"rgba(0,0,0,0)"),this.ctx.globalCompositeOperation="destination-out",this.ctx.fillStyle=a,this.ctx.beginPath(),this.ctx.arc(r,o,s,0,Math.PI*2),this.ctx.fill(),++this.strokeCount%8===0&&this.checkProgress()}checkProgress(){let{width:e,height:t}=this.ctx.canvas,i=this.ctx.getImageData(0,0,e,t).data,r=0,o=Math.floor(i.length/16);for(let a=3;a<i.length;a+=16)i[a]<128&&r++;let s=Math.min(100,Math.round(r/o*100));this.ngZone.run(()=>{this.brushProgress=s,s>=65&&(this.phase="revealed")})}get rarityLabel(){return{common:"Common",rare:"Rare",legendary:"Legendary",chroma:"\u27E1 CHROMA \u27E1"}[this.fossil.rarity]??this.fossil.rarity}get fossilEmoji(){let e=this.fossil.id.split("_")[0];return{"flint-handaxe-01":"\u{1FA93}","bone-needle-01":"\u{1FAA1}","clay-pot-shard-01":"\u{1F3FA}","bronze-fibula-01":"\u{1F4CC}","roman-coin-01":"\u{1FA99}","obsidian-arrowhead-01":"\u{1F3F9}","golden-torc-01":"\u{1F4FF}","clay-tablet-01":"\u{1F4DC}","iron-dagger-01":"\u{1F5E1}\uFE0F","human-femur-01":"\u{1F9B4}","wooden-post-01":"\u{1FAB5}","ivory-necklace-01":"\u{1F49B}","iridescent-prism-01":"\u{1F308}"}[e]??"\u{1FAA8}"}static \u0275fac=function(t){return new(t||n)(Qt(Ut))};static \u0275cmp=Ri({type:n,selectors:[["app-fossil-card"]],viewQuery:function(t,i){if(t&1&&Zs(F2,5),t&2){let r;Js(r=Ks())&&(i.brushCanvasRef=r.first)}},inputs:{fossil:"fossil"},outputs:{close:"close",collect:"collect"},decls:58,vars:20,consts:[["brushCanvas",""],[1,"fossil-card"],[1,"brush-phase"],[1,"card-header"],[1,"rarity-badge"],[1,"close-btn",3,"click"],[1,"sediment-preview"],[1,"preview-emoji"],[1,"preview-name"],[1,"preview-sub"],[1,"brush-canvas"],[1,"brush-progress-wrap"],[1,"brush-progress-bar"],[1,"brush-hint"],[1,"reveal-phase"],[1,"fossil-icon"],[1,"fossil-name"],[1,"fossil-species"],[1,"info-grid"],[1,"info-item"],[1,"label"],[1,"value"],[1,"description"],[1,"fun-fact"],[1,"fun-fact-label"],[1,"collect-btn",3,"click"]],template:function(t,i){t&1&&(Pt(0,"div",1)(1,"div",2)(2,"div",3)(3,"span",4),ce(4),At(),Pt(5,"button",5),Ys("click",function(){return i.close.emit()}),ce(6,"\u2715"),At()(),Pt(7,"div",6)(8,"div",7),ce(9),At(),Pt(10,"p",8),ce(11),At(),Pt(12,"p",9),ce(13,"Brush to reveal"),At(),Ac(14,"canvas",10,0),At(),Pt(16,"div",11),Ac(17,"div",12),At(),Pt(18,"p",13),ce(19,"Swipe to brush away the sediment"),At()(),Pt(20,"div",14)(21,"div",3)(22,"span",4),ce(23),At(),Pt(24,"button",5),Ys("click",function(){return i.close.emit()}),ce(25,"\u2715"),At()(),Pt(26,"div",15),ce(27),At(),Pt(28,"h2",16),ce(29),At(),Pt(30,"p",17)(31,"em"),ce(32),At()(),Pt(33,"div",18)(34,"div",19)(35,"span",20),ce(36,"Era"),At(),Pt(37,"span",21),ce(38),At()(),Pt(39,"div",19)(40,"span",20),ce(41,"Period"),At(),Pt(42,"span",21),ce(43),At()(),Pt(44,"div",19)(45,"span",20),ce(46,"Discovered"),At(),Pt(47,"span",21),ce(48),At()()(),Pt(49,"p",22),ce(50),At(),Pt(51,"div",23)(52,"span",24),ce(53,"Fun Fact"),At(),Pt(54,"p"),ce(55),At()(),Pt(56,"button",25),Ys("click",function(){return i.collect.emit(i.fossil)}),ce(57," Collect Fossil "),At()()()),t&2&&(Nc("rarity-"+i.fossil.rarity),fe(),Jn("hidden-phase",i.phase!=="brushing"),fe(3),yt(i.rarityLabel),fe(5),yt(i.fossilEmoji),fe(2),yt(i.fossil.name),fe(6),Qs("width",i.brushProgress,"%"),fe(3),Jn("hidden-phase",i.phase!=="revealed"),fe(3),yt(i.rarityLabel),fe(4),yt(i.fossilEmoji),fe(2),yt(i.fossil.name),fe(3),yt(i.fossil.species),fe(6),yt(i.fossil.era),fe(5),yt(i.fossil.period),fe(5),yt(i.fossil.yearDiscovered),fe(2),yt(i.fossil.description),fe(5),yt(i.fossil.funFact))},dependencies:[Kr],styles:['@charset "UTF-8";.fossil-card[_ngcontent-%COMP%]{background:linear-gradient(145deg,#2a1a00,#3d2a00);border:2px solid #8B6914;border-radius:16px;overflow:hidden;color:#f5e6c8;max-width:360px;width:90vw;box-shadow:0 8px 32px #0009}.hidden-phase[_ngcontent-%COMP%]{display:none!important}.brush-phase[_ngcontent-%COMP%]{padding:16px 20px 20px}.sediment-preview[_ngcontent-%COMP%]{position:relative;height:180px;border-radius:12px;overflow:hidden;display:flex;flex-direction:column;align-items:center;justify-content:center;background:radial-gradient(ellipse at center,#5c3d11,#3d2200 70%)}.preview-emoji[_ngcontent-%COMP%]{font-size:64px;filter:brightness(.55) sepia(.4);-webkit-user-select:none;user-select:none}.preview-name[_ngcontent-%COMP%]{font-size:16px;font-weight:700;color:#c8a86b;margin:6px 0 2px}.preview-sub[_ngcontent-%COMP%]{font-size:11px;color:#c8a86b80}.brush-canvas[_ngcontent-%COMP%]{position:absolute;inset:0;width:100%;height:100%;cursor:crosshair;touch-action:none}.brush-progress-wrap[_ngcontent-%COMP%]{margin-top:10px;height:5px;background:#0006;border-radius:20px;overflow:hidden}.brush-progress-bar[_ngcontent-%COMP%]{height:100%;background:linear-gradient(90deg,#8b6914,gold);border-radius:20px;transition:width .15s ease}.brush-hint[_ngcontent-%COMP%]{text-align:center;font-size:11px;color:#c8a86b99;margin:8px 0 0}.reveal-phase[_ngcontent-%COMP%]{padding:20px;animation:_ngcontent-%COMP%_fadeReveal .4s ease}@keyframes _ngcontent-%COMP%_fadeReveal{0%{opacity:0;transform:scale(.97)}to{opacity:1;transform:scale(1)}}.card-header[_ngcontent-%COMP%]{display:flex;justify-content:space-between;align-items:center;margin-bottom:12px}.rarity-badge[_ngcontent-%COMP%]{font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:1px;padding:3px 8px;border-radius:4px;background:#ffffff1a}.close-btn[_ngcontent-%COMP%]{background:none;border:none;color:#f5e6c8;font-size:18px;cursor:pointer;padding:4px;line-height:1}.rarity-legendary[_ngcontent-%COMP%]{border-color:gold;box-shadow:0 0 20px #ffd7004d}.rarity-rare[_ngcontent-%COMP%]{border-color:#a855f7;box-shadow:0 0 20px #a855f74d}.rarity-common[_ngcontent-%COMP%]{border-color:#6b7280}.rarity-chroma[_ngcontent-%COMP%]{border:2px solid transparent;background:linear-gradient(145deg,#2a1a00,#3d2a00) padding-box,conic-gradient(from 0deg,#ff0040,#ff8000,#ffe000,#00e060,#00c0ff,#6040ff,#ff00d0,#ff0040) border-box;box-shadow:0 0 35px #ffffff8c,0 0 70px #ff00c873;animation:_ngcontent-%COMP%_chromaSpin 6s linear infinite}@keyframes _ngcontent-%COMP%_chromaSpin{to{filter:hue-rotate(360deg)}}.fossil-icon[_ngcontent-%COMP%]{font-size:48px;text-align:center;margin:8px 0}.fossil-name[_ngcontent-%COMP%]{font-size:20px;font-weight:700;text-align:center;margin:0 0 4px}.fossil-species[_ngcontent-%COMP%]{font-size:13px;color:#c8a86b;text-align:center;margin:0 0 16px}.info-grid[_ngcontent-%COMP%]{display:grid;grid-template-columns:repeat(3,1fr);gap:8px;margin-bottom:16px}.info-item[_ngcontent-%COMP%]{text-align:center;background:#0003;border-radius:8px;padding:8px 4px}.label[_ngcontent-%COMP%]{display:block;font-size:10px;text-transform:uppercase;color:#c8a86b;margin-bottom:4px}.value[_ngcontent-%COMP%]{display:block;font-size:13px;font-weight:600}.description[_ngcontent-%COMP%]{font-size:13px;line-height:1.5;color:#e0cca8;margin-bottom:16px}.fun-fact[_ngcontent-%COMP%]{background:#ffd70014;border-left:3px solid #ffd700;padding:10px 12px;border-radius:0 8px 8px 0;margin-bottom:16px}.fun-fact-label[_ngcontent-%COMP%]{font-size:10px;text-transform:uppercase;color:gold;font-weight:700}.fun-fact[_ngcontent-%COMP%]   p[_ngcontent-%COMP%]{font-size:13px;color:#f5e6c8;margin:4px 0 0;line-height:1.4}.collect-btn[_ngcontent-%COMP%]{width:100%;padding:12px;background:linear-gradient(135deg,#8b6914,#c8a020);border:none;border-radius:10px;color:#fff;font-size:16px;font-weight:700;cursor:pointer;letter-spacing:.5px}.collect-btn[_ngcontent-%COMP%]:active{transform:scale(.97)}']})};function k2(n,e){if(n&1&&(ve(0,"div",15),Wn(1,"span",16),ce(2),De()),n&2){let t=vt();fe(2),ea(" ",t.nearbyCount," fossil",t.nearbyCount>1?"s":""," nearby \u2014 tap screen to collect! ")}}function U2(n,e){if(n&1){let t=Yr();ve(0,"div",17)(1,"div",18)(2,"p"),ce(3,"Tap to enter AR mode"),De(),ve(4,"button",19),Yt("click",function(){Nn(t);let r=vt();return Pn(r.startAR.emit())}),ce(5,"Start AR"),De()()()}}function B2(n,e){if(n&1&&Wn(0,"div",22),n&2){let t=e.$implicit;Qs("width",t.size,"px")("height",t.size,"px"),St("ngStyle",t.style)}}function V2(n,e){if(n&1&&(pc(),Wn(0,"circle",34)),n&2){let t=e.$implicit;Nd("cx",t.x)("cy",t.y)("r",t.r)}}function H2(n,e){if(n&1&&(ve(0,"div",23)(1,"div",24),ce(2,"RADAR"),De(),pc(),ve(3,"svg",25),Wn(4,"circle",26)(5,"circle",27)(6,"circle",28)(7,"line",29)(8,"line",30)(9,"polygon",31),jn(10,V2,1,3,"circle",32),Wn(11,"circle",33),De()()),n&2){let t=vt(2);fe(10),St("ngForOf",t.radarDots)("ngForTrackBy",t.trackById)}}function z2(n,e){if(n&1&&(Pd(0),jn(1,B2,1,5,"div",20)(2,H2,12,2,"div",21),Od()),n&2){let t=vt();fe(),St("ngForOf",t.offScreenFossils)("ngForTrackBy",t.trackById),fe(),St("ngIf",t.fossilDirections.length>0)}}var Sp=class n{collected=0;total=0;score=0;nearbyCount=0;gpsActive=!1;showARPrompt=!1;arActive=!1;fossilDirections=[];startAR=new kt;openMap=new kt;openCollection=new kt;openLearn=new kt;static LEVELS=[[5e3,"Scholar","scholar"],[2500,"Master","master"],[1e3,"Expert","expert"],[400,"Specialist","specialist"],[150,"Explorer","explorer"],[50,"Apprentice","apprentice"],[0,"Novice","novice"]];get levelName(){return this.levelEntry[1]}get levelKey(){return this.levelEntry[2]}get levelEntry(){return n.LEVELS.find(([e])=>this.score>=e)??n.LEVELS.at(-1)}trackById(e,t){return t.id}get radarDots(){return this.fossilDirections.filter(i=>i.distance<=30).slice(0,10).map(i=>{let r=Math.min(i.distance,30),o=r/30*44,s=i.relAngle*Math.PI/180,a=1+(1-r/30)*2.5;return{id:i.id,x:+(o*Math.sin(s)).toFixed(2),y:+(-o*Math.cos(s)).toFixed(2),r:+a.toFixed(2)}})}get offScreenFossils(){return this.fossilDirections.filter(e=>e.distance<=30).map(e=>{let t=e.relAngle>180?e.relAngle-360:e.relAngle;if(Math.abs(t)<=50)return null;let i=Math.round(12+(1-Math.min(e.distance,30)/30)*22),r=e.relAngle*Math.PI/180,o=Math.sin(r),s=-Math.cos(r),a=Math.abs(o),c=Math.abs(s),l;if(a*1.8>c){let u=Math.max(12,Math.min(88,50+s/a*30))+"%";l=o>0?{right:"14px",top:u}:{left:"14px",top:u}}else{let u=Math.max(12,Math.min(88,50+o/c*38))+"%";l=s>0?{bottom:"85px",left:u}:{top:"70px",left:u}}return{id:e.id,size:i,style:l}}).filter(e=>e!==null)}static \u0275fac=function(t){return new(t||n)};static \u0275cmp=Ri({type:n,selectors:[["app-hud"]],inputs:{collected:"collected",total:"total",score:"score",nearbyCount:"nearbyCount",gpsActive:"gpsActive",showARPrompt:"showARPrompt",arActive:"arActive",fossilDirections:"fossilDirections"},outputs:{startAR:"startAR",openMap:"openMap",openCollection:"openCollection",openLearn:"openLearn"},decls:32,vars:11,consts:[[1,"hud"],[1,"top-bar"],[1,"score-badge"],[1,"score-label"],[1,"score-value"],[1,"level-badge",3,"ngClass"],[1,"level-label"],[1,"level-value"],[1,"gps-badge"],["class","nearby-panel",4,"ngIf"],["class","center-prompt",4,"ngIf"],[4,"ngIf"],[1,"version-stamp"],[1,"bottom-bar"],[1,"icon-btn",3,"click"],[1,"nearby-panel"],[1,"pulse-dot"],[1,"center-prompt"],[1,"prompt-box"],[1,"ar-btn",3,"click"],["class","edge-dot",3,"ngStyle","width","height",4,"ngFor","ngForOf","ngForTrackBy"],["class","radar-wrap",4,"ngIf"],[1,"edge-dot",3,"ngStyle"],[1,"radar-wrap"],[1,"radar-title"],["viewBox","-50 -50 100 100",1,"radar-svg"],["cx","0","cy","0","r","49","fill","rgba(0,0,0,0.6)","stroke","rgba(255,215,0,0.35)","stroke-width","1"],["cx","0","cy","0","r","22","fill","none","stroke","rgba(74,222,128,0.3)","stroke-width","0.8","stroke-dasharray","2,2"],["cx","0","cy","0","r","44","fill","none","stroke","rgba(255,255,255,0.1)","stroke-width","0.5"],["x1","0","y1","-48","x2","0","y2","48","stroke","rgba(255,255,255,0.07)","stroke-width","0.5"],["x1","-48","y1","0","x2","48","y2","0","stroke","rgba(255,255,255,0.07)","stroke-width","0.5"],["points","0,-45 2.5,-37 -2.5,-37","fill","#4ade80","opacity","0.85"],["class","fossil-dot","fill","#ffd700",4,"ngFor","ngForOf","ngForTrackBy"],["cx","0","cy","0","r","2.5","fill","white"],["fill","#ffd700",1,"fossil-dot"]],template:function(t,i){t&1&&(ve(0,"div",0)(1,"div",1)(2,"div",2)(3,"span",3),ce(4,"Score"),De(),ve(5,"span",4),ce(6),De()(),ve(7,"div",5)(8,"span",6),ce(9,"Level"),De(),ve(10,"span",7),ce(11),De()(),ve(12,"div",8),ce(13),De()(),jn(14,k2,3,2,"div",9)(15,U2,6,0,"div",10)(16,z2,3,3,"ng-container",11),ve(17,"div",12),ce(18,"v3.3.3"),De(),ve(19,"div",13)(20,"button",14),Yt("click",function(){return i.openMap.emit()}),ce(21,"\u{1F5FA}\uFE0F"),ve(22,"span"),ce(23,"Map"),De()(),ve(24,"button",14),Yt("click",function(){return i.openCollection.emit()}),ce(25,"\u{1F9B4}"),ve(26,"span"),ce(27,"Collection"),De()(),ve(28,"button",14),Yt("click",function(){return i.openLearn.emit()}),ce(29,"\u{1F4DA}"),ve(30,"span"),ce(31,"Learn"),De()()()()),t&2&&(fe(6),yt(i.score),fe(),St("ngClass","level-"+i.levelKey),fe(4),yt(i.levelName),fe(),Jn("gps-ok",i.gpsActive)("gps-error",!i.gpsActive),fe(),Ln(" ",i.gpsActive?"\u{1F4CD} GPS":"\u26A0\uFE0F No GPS"," "),fe(),St("ngIf",i.nearbyCount>0),fe(),St("ngIf",i.showARPrompt),fe(),St("ngIf",i.arActive))},dependencies:[Kr,Sv,na,Lc,Ev],styles:['@charset "UTF-8";.hud[_ngcontent-%COMP%]{position:fixed;inset:0;pointer-events:none;display:flex;flex-direction:column;z-index:20}.top-bar[_ngcontent-%COMP%]{display:flex;justify-content:space-between;align-items:center;padding:12px 16px;background:linear-gradient(180deg,rgba(0,0,0,.7) 0%,transparent 100%);pointer-events:all}.score-badge[_ngcontent-%COMP%], .gps-badge[_ngcontent-%COMP%], .level-badge[_ngcontent-%COMP%]{background:#00000080;border-radius:20px;padding:4px 10px;font-size:12px;color:#f5e6c8;font-weight:600}.score-label[_ngcontent-%COMP%], .level-label[_ngcontent-%COMP%]{display:block;font-size:9px;text-transform:uppercase;color:#c8a86b}.score-value[_ngcontent-%COMP%]{display:block;font-size:16px;font-weight:700}.level-value[_ngcontent-%COMP%]{display:block;font-size:13px;font-weight:700}.level-novice[_ngcontent-%COMP%]   .level-value[_ngcontent-%COMP%]{color:#9ca3af}.level-apprentice[_ngcontent-%COMP%]   .level-value[_ngcontent-%COMP%]{color:#a3e635}.level-explorer[_ngcontent-%COMP%]   .level-value[_ngcontent-%COMP%]{color:#4ade80}.level-specialist[_ngcontent-%COMP%]   .level-value[_ngcontent-%COMP%]{color:#38bdf8}.level-expert[_ngcontent-%COMP%]   .level-value[_ngcontent-%COMP%]{color:#a855f7}.level-master[_ngcontent-%COMP%]   .level-value[_ngcontent-%COMP%]{color:gold}.level-scholar[_ngcontent-%COMP%]   .level-value[_ngcontent-%COMP%]{color:#f43f5e;text-shadow:0 0 6px rgba(244,63,94,.6)}.gps-ok[_ngcontent-%COMP%]{color:#4ade80}.gps-error[_ngcontent-%COMP%]{color:#f87171}.nearby-panel[_ngcontent-%COMP%]{margin:8px 16px 0;background:#8b6914d9;color:#fff;padding:6px 12px;border-radius:20px;font-size:12px;font-weight:600;display:flex;align-items:center;gap:8px;pointer-events:all;align-self:flex-start}.pulse-dot[_ngcontent-%COMP%]{width:7px;height:7px;border-radius:50%;background:gold;animation:_ngcontent-%COMP%_pulse 1.2s infinite}@keyframes _ngcontent-%COMP%_pulse{0%,to{transform:scale(1);opacity:1}50%{transform:scale(1.4);opacity:.6}}.center-prompt[_ngcontent-%COMP%]{flex:1;display:flex;align-items:center;justify-content:center;pointer-events:all}.prompt-box[_ngcontent-%COMP%]{background:#000000b3;border:1px solid #8B6914;border-radius:12px;padding:20px 28px;text-align:center;color:#f5e6c8}.prompt-box[_ngcontent-%COMP%]   p[_ngcontent-%COMP%]{margin-bottom:12px;font-size:16px}.ar-btn[_ngcontent-%COMP%]{background:linear-gradient(135deg,#8b6914,#c8a020);border:none;color:#fff;font-size:16px;font-weight:700;padding:10px 28px;border-radius:8px;cursor:pointer}.edge-dot[_ngcontent-%COMP%]{position:fixed;border-radius:50%;background:radial-gradient(circle at 35% 35%,#ffe066,#e67e00);box-shadow:0 0 10px #ffc8008c;transform:translate(-50%,-50%);pointer-events:none;animation:_ngcontent-%COMP%_edgePulse 1.8s ease-in-out infinite;transition:top .45s ease,left .45s ease,right .45s ease,bottom .45s ease,width .45s ease,height .45s ease}@keyframes _ngcontent-%COMP%_edgePulse{0%,to{opacity:.85;transform:translate(-50%,-50%) scale(1)}50%{opacity:1;transform:translate(-50%,-50%) scale(1.18)}}.radar-wrap[_ngcontent-%COMP%]{position:fixed;bottom:90px;right:12px;display:flex;flex-direction:column;align-items:center;gap:2px;pointer-events:none}.radar-title[_ngcontent-%COMP%]{font-size:9px;color:#ffd70099;letter-spacing:2px;font-weight:700}.radar-svg[_ngcontent-%COMP%]{width:90px;height:90px}.fossil-dot[_ngcontent-%COMP%]{opacity:.9;transition:cx .4s ease,cy .4s ease,r .35s ease}.bottom-bar[_ngcontent-%COMP%]{position:fixed;bottom:0;left:0;right:0;display:flex;justify-content:space-around;padding:8px 0 20px;background:linear-gradient(0deg,rgba(0,0,0,.8) 0%,transparent 100%);pointer-events:all}.icon-btn[_ngcontent-%COMP%]{background:none;border:none;color:#f5e6c8;font-size:22px;cursor:pointer;display:flex;flex-direction:column;align-items:center;gap:2px}.icon-btn[_ngcontent-%COMP%]   span[_ngcontent-%COMP%]{font-size:10px}.version-stamp[_ngcontent-%COMP%]{position:fixed;bottom:72px;right:8px;font-size:10px;color:#ffffff4d;pointer-events:none;letter-spacing:.5px}']})};var Ep=1.0668,wp=class n{constructor(e){this.ngZone=e}orientation=lt(null);permissionDenied=lt(!1);headingReference=lt(null);bound;boundEvent="deviceorientation";captureHeadingReference(){let e=this.orientation();return e?(this.headingReference.set(e.heading),!0):!1}clearHeadingReference(){this.headingReference.set(null)}async requestPermission(){let e=DeviceOrientationEvent;return typeof e.requestPermission=="function"&&await e.requestPermission()!=="granted"?(this.permissionDenied.set(!0),!1):!0}start(){this.bound=e=>{this.ngZone.run(()=>{if(e.alpha==null)return;let t=(e.beta??0)-90,i=e.webkitCompassHeading,r=typeof i=="number"?i:(360-(e.alpha??0))%360;this.orientation.set({heading:r,pitch:t,roll:e.gamma??0})})},"ondeviceorientationabsolute"in window?this.boundEvent="deviceorientationabsolute":this.boundEvent="deviceorientation",window.addEventListener(this.boundEvent,this.bound,!0)}stop(){this.bound&&window.removeEventListener(this.boundEvent,this.bound,!0)}groundLookDistance(e=Ep){let t=this.orientation();if(!t)return 2;let i=Math.abs(t.pitch)*Math.PI/180;return i<.05?10:Math.min(10,Math.max(.3,e/Math.tan(i)))}fossilOffset(e,t,i=Ep){let r=this.headingReference()??this.orientation()?.heading??0,o=(e-r)*Math.PI/180;return{x:t*Math.sin(o),y:-i,z:-t*Math.cos(o)}}static \u0275fac=function(t){return new(t||n)(Le(Ut))};static \u0275prov=Ae({token:n,factory:n.\u0275fac,providedIn:"root"})};var Tw=[{id:"flint-handaxe-01",name:"Flint Hand Axe",species:"Lower Palaeolithic",era:"Stone Age",period:"500,000\u2013300,000 BCE",yearDiscovered:1859,description:"A teardrop-shaped tool knapped from flint by early humans. Hand axes were the Swiss Army knife of the Stone Age \u2014 used for butchering, digging and scraping.",funFact:"Acheulean hand axes appear almost unchanged across 1.5 million years of human history, making them the longest-used tool ever.",lat:0,lng:0,discovered:!1,rarity:"common"},{id:"bone-needle-01",name:"Bone Needle",species:"Upper Palaeolithic",era:"Stone Age",period:"40,000\u201310,000 BCE",yearDiscovered:1916,description:"A delicate sewing needle carved from animal bone with a tiny drilled eye. Its discovery proved that early humans wore tailored clothing \u2014 essential for surviving ice age winters.",funFact:"Bone needles this fine required sophisticated tools to make. Whoever crafted this was as skilled as any modern craftsperson.",lat:0,lng:0,discovered:!1,rarity:"common"},{id:"clay-pot-shard-01",name:"Neolithic Pot Shard",species:"Neolithic Culture",era:"Stone Age",period:"7,000\u20133,000 BCE",yearDiscovered:1932,description:"A fragment of hand-coiled pottery decorated with finger-pressed patterns. The invention of pottery changed everything \u2014 food could now be stored, boiled and fermented.",funFact:"Archaeologists can identify a settlement's age, trade routes and diet just from broken pot sherds like this one.",lat:0,lng:0,discovered:!1,rarity:"common"},{id:"bronze-fibula-01",name:"Bronze Fibula",species:"Celtic Iron Age",era:"Iron Age",period:"600\u2013100 BCE",yearDiscovered:1887,description:"An ornate bronze safety pin used to fasten cloaks and tunics. Fibulae were status symbols \u2014 the more elaborate the design, the higher the wearer's rank in Celtic society.",funFact:"Fibulae are one of the most common Iron Age finds, yet no two are exactly alike \u2014 each was individually handcrafted.",lat:0,lng:0,discovered:!1,rarity:"common"},{id:"roman-coin-01",name:"Roman Denarius",species:"Roman Empire",era:"Classical",period:"1st\u20133rd Century AD",yearDiscovered:1973,description:"A silver coin stamped with the profile of a Roman emperor. Denarii were the standard pay for a Roman soldier \u2014 one coin per day for a legionary on campaign.",funFact:"Roman coins have been found as far as India and China, evidence of a trade network stretching across three continents.",lat:0,lng:0,discovered:!1,rarity:"common"},{id:"obsidian-arrowhead-01",name:"Obsidian Arrowhead",species:"Mesolithic Hunter",era:"Stone Age",period:"15,000\u20135,000 BCE",yearDiscovered:1901,description:"A razor-sharp projectile point knapped from volcanic obsidian glass. Obsidian fractures so cleanly that ancient arrowheads can be sharper than modern surgical steel.",funFact:"By tracing obsidian to its volcanic source, archaeologists can map prehistoric trade routes across hundreds of kilometres.",lat:0,lng:0,discovered:!1,rarity:"rare"},{id:"viking-brooch-01",name:"Viking Silver Brooch",species:"Norse Culture",era:"Viking Age",period:"800\u20131100 AD",yearDiscovered:1904,description:"A heavy silver brooch in the Borre style, used to pin a cloak at the shoulder. Viking brooches often doubled as portable wealth \u2014 if you needed silver, you simply cut a piece off.",funFact:"Many Viking brooches were made from melted-down foreign coins, blending Arabic, Byzantine and Anglo-Saxon silver into Norse art.",lat:0,lng:0,discovered:!1,rarity:"epic"},{id:"egyptian-scarab-01",name:"Egyptian Scarab Seal",species:"Ancient Egyptian",era:"Bronze Age",period:"2000\u20131000 BCE",yearDiscovered:1881,description:"A carved stone amulet in the shape of a dung beetle, with hieroglyphs on the flat side used as a personal seal. Scarabs were believed to channel the sun god Khepri's power of rebirth.",funFact:"Scarabs were so popular they were exported across the ancient Mediterranean \u2014 Egyptian scarabs have been found in Greek, Phoenician and Sardinian tombs.",lat:0,lng:0,discovered:!1,rarity:"epic"},{id:"golden-torc-01",name:"Golden Torc",species:"Celtic Nobility",era:"Iron Age",period:"300\u2013100 BCE",yearDiscovered:1950,description:"A twisted gold neck ring worn by Celtic warriors and chieftains. Torcs were among the most prized possessions in the Celtic world \u2014 symbols of divine favour and battlefield courage.",funFact:"The Snettisham Great Torc, found in Norfolk, contains nearly 1 kg of twisted gold and electrum alloy.",lat:0,lng:0,discovered:!1,rarity:"legendary"},{id:"clay-tablet-01",name:"Cuneiform Tablet",species:"Mesopotamian Civilisation",era:"Bronze Age",period:"3,000\u2013500 BCE",yearDiscovered:1843,description:"A small clay tablet impressed with wedge-shaped cuneiform script \u2014 one of humanity's earliest writing systems. Most tablets recorded grain inventories, debts and trade contracts.",funFact:"One cuneiform tablet from 1750 BCE is the world's oldest customer complaint \u2014 a merchant furiously writing about bad copper ingots.",lat:0,lng:0,discovered:!1,rarity:"rare"},{id:"iron-dagger-01",name:"Iron Dagger",species:"Early Iron Age",era:"Iron Age",period:"800\u2013400 BCE",yearDiscovered:1965,description:"A short double-edged iron blade with a bone handle. The spread of iron-working around 1200 BCE transformed warfare \u2014 iron weapons were stronger and far cheaper to produce than bronze.",funFact:"The oldest iron ever worked by humans came from meteorites \u2014 early smiths called iron the 'metal of heaven'.",lat:0,lng:0,discovered:!1,rarity:"rare"},{id:"human-femur-01",name:"Human Femur",species:"Homo sapiens",era:"Various",period:"c. 10,000 BCE",yearDiscovered:1988,description:"A well-preserved human thigh bone from an ancient burial site. Forensic analysis can reveal the individual's age, sex, diet, diseases and even the kind of work they did in life.",funFact:"Cut marks on ancient human bones often reveal burial rituals \u2014 some cultures defleshed bones as a sacred act of respect.",lat:0,lng:0,discovered:!1,rarity:"rare"},{id:"wooden-post-01",name:"Charred Wooden Post",species:"Bronze Age Settlement",era:"Bronze Age",period:"2,500\u2013800 BCE",yearDiscovered:2001,description:"A charred structural post from a prehistoric roundhouse or palisade. Charring actually preserves wood by preventing rot \u2014 some posts have survived 4,000 years underground.",funFact:"Dendrochronology (tree-ring dating) on preserved posts can pinpoint the exact year a tree was felled \u2014 sometimes down to the season.",lat:0,lng:0,discovered:!1,rarity:"common"},{id:"ivory-necklace-01",name:"Ivory Bead Necklace",species:"Upper Palaeolithic",era:"Stone Age",period:"35,000\u201325,000 BCE",yearDiscovered:1939,description:"Dozens of tiny beads carved from mammoth ivory, originally strung as a necklace. Personal ornaments this old prove that symbolic thinking and identity existed long before writing.",funFact:"Shell beads found in Morocco date to 130,000 BCE \u2014 making jewellery one of the oldest human behaviours ever recorded.",lat:0,lng:0,discovered:!1,rarity:"legendary"},{id:"iridescent-prism-01",name:"Iridescent Prism",species:"Geological Anomaly",era:"Unknown",period:"Undatable",yearDiscovered:2024,description:"A flawless crystal that splits sunlight into colours that have no name. Every spectrometer that examines it produces a different reading. No one knows where it came from or how it formed.",funFact:"Reportedly, no two photographs of an Iridescent Prism ever look the same \u2014 even taken seconds apart, in the same light.",lat:0,lng:0,discovered:!1,rarity:"chroma"}];var Cp=class n{constructor(e){this.ngZone=e}renderer;scene;camera;xrSession=null;fossilMeshes=new Map;animationId=0;tapHandler;groundY=null;hitTestSource=null;supported=lt(!1);active=lt(!1);loading=lt(!1);error=lt(null);cameraPosition=lt({x:0,z:0});markersVisible=lt(!0);groundYSignal=lt(null);hitCount=lt(0);rejectedCount=lt(0);lastReject=lt("");debugHits=0;debugRej=0;debugLast="";debugLastFlush=0;async checkSupport(){if(!navigator.xr)return this.error.set("WebXR not available in this browser"),!1;let e=await navigator.xr.isSessionSupported("immersive-ar");return this.supported.set(e),e||this.error.set("AR not supported on this device"),e}async init(e){this.renderer=new _p({canvas:e,alpha:!0,antialias:!0}),this.renderer.setPixelRatio(window.devicePixelRatio),this.renderer.setSize(window.innerWidth,window.innerHeight),this.renderer.xr.enabled=!0,this.renderer.xr.setReferenceSpaceType("local"),e.addEventListener("touchend",r=>{if(this.xrSession)return;let o=r.changedTouches[0];if(!o)return;let s=e.getBoundingClientRect(),a=new ot((o.clientX-s.left)/s.width*2-1,-((o.clientY-s.top)/s.height)*2+1),c=new Ba;c.setFromCamera(a,this.camera),this.checkFossilHit(c.ray.origin,c.ray.direction)},{passive:!0}),this.scene=new vl,this.camera=new En(70,window.innerWidth/window.innerHeight,.01,50);let t=new Al(16777215,1.2);this.scene.add(t);let i=new Il(16765565,1.5);i.position.set(1,2,1),this.scene.add(i)}async startAR(e){if(!navigator.xr){this.error.set("WebXR not available in this browser");return}this.error.set(null),this.loading.set(!0);try{let t={requiredFeatures:["hit-test"],optionalFeatures:["dom-overlay"]};e&&(t.domOverlay={root:e}),this.xrSession=await navigator.xr.requestSession("immersive-ar",t),await this.renderer.xr.setSession(this.xrSession),this.active.set(!0);let i=this.xrSession;try{let r=await i.requestReferenceSpace("viewer"),o=window.XRRay,s=new o({origin:{x:0,y:0,z:0,w:1},direction:{x:0,y:-1,z:0,w:0}});this.hitTestSource=await i.requestHitTestSource({space:r,offsetRay:s})}catch{this.hitTestSource=null}this.xrSession.addEventListener("select",r=>{let o=r,s=this.renderer.xr.getReferenceSpace();if(!s||!o.frame||!o.inputSource)return;let a=o.frame.getPose(o.inputSource.targetRaySpace,s);if(!a)return;let c=new Ot().fromArray(a.transform.matrix),l=new O().setFromMatrixPosition(c),u=new ii().setFromRotationMatrix(c),d=new O(0,0,-1).applyQuaternion(u).normalize();this.checkFossilHit(l,d)}),this.xrSession.addEventListener("end",()=>{this.ngZone.run(()=>{this.active.set(!1),this.loading.set(!1),this.xrSession=null,this.hitTestSource=null,this.groundY=null,this.debugHits=0,this.debugRej=0,this.debugLast="",this.groundYSignal.set(null),this.hitCount.set(0),this.rejectedCount.set(0),this.lastReject.set("")})}),this.ngZone.runOutsideAngular(()=>{this.renderer.setAnimationLoop((r,o)=>{this.tick(o)})})}catch(t){let i=t instanceof Error?t.message:String(t);this.error.set(`AR failed: ${i}`),this.xrSession&&(await this.xrSession.end().catch(()=>{}),this.xrSession=null)}finally{this.loading.set(!1)}}async stopAR(){this.xrSession&&await this.xrSession.end(),this.renderer&&this.renderer.setAnimationLoop(null)}placeFossil(e,t){if(this.fossilMeshes.has(e))return;let i=new wr,r=new Fa(.08,10,10),o=new wl({color:13150315,roughness:.6,metalness:.2}),s=new un(r,o);i.add(s);let a=new ka(.13,.008,8,32),c=new Ji({color:16766720,transparent:!0,opacity:.7}),l=new un(a,c);l.rotation.x=Math.PI/2,i.add(l);let u=new ka(.18,.004,8,32),d=new Ji({color:16766720,transparent:!0,opacity:.3}),f=new un(u,d);f.rotation.x=Math.PI/2,i.add(f);let h=new Sl(.03,.09,6),g=new Ji({color:16766720}),_=new un(h,g);_.rotation.z=Math.PI,_.position.y=.24,i.add(_);let m=new Fa(.28,6,6),p=new Ji({visible:!1}),b=new un(m,p);i.add(b);let w=this.groundY??0;i.position.set(t.x,w,t.z),i.visible=this.markersVisible(),this.scene.add(i),this.fossilMeshes.set(e,i)}setMarkersVisible(e){this.markersVisible.set(e),this.fossilMeshes.forEach(t=>{t.visible=e})}xrDistanceTo(e){let t=this.fossilMeshes.get(e);return t?this.camera.position.distanceTo(t.position):1/0}setTapHandler(e){this.tapHandler=e}gridMesh=null;placeGrid(e){if(this.gridMesh&&(this.scene.remove(this.gridMesh),this.gridMesh.geometry.dispose(),this.gridMesh.material.dispose()),e.length===0){this.gridMesh=null;return}let t=this.camera.position.x,i=this.camera.position.z,r=new Float32Array(e.length*6);e.forEach((a,c)=>{r[c*6+0]=t+a.x1,r[c*6+1]=0,r[c*6+2]=i+a.z1,r[c*6+3]=t+a.x2,r[c*6+4]=0,r[c*6+5]=i+a.z2});let o=new wn;o.setAttribute("position",new kn(r,3));let s=new Oa({color:16766720,transparent:!0,opacity:.55});this.gridMesh=new xl(o,s),this.gridMesh.position.y=(this.groundY??0)+.02,this.scene.add(this.gridMesh)}clearGrid(){this.placeGrid([])}removeFossil(e){let t=this.fossilMeshes.get(e);t&&(this.scene.remove(t),t.traverse(i=>{let r=i;r.geometry&&r.geometry.dispose();let o=r.material;Array.isArray(o)?o.forEach(s=>s.dispose()):o&&o.dispose()}),this.fossilMeshes.delete(e))}checkFossilHit(e,t){let i=new Ba(e.clone(),t.clone().normalize(),.01,50),r=new Map;this.fossilMeshes.forEach((a,c)=>{a.traverse(l=>r.set(l,c)),r.set(a,c)});let o=Array.from(r.keys()),s=i.intersectObjects(o,!1);if(s.length>0){let a=r.get(s[0].object);a&&this.ngZone.run(()=>this.tapHandler?.(a))}}flushDebug(e){let t=performance.now();if(!e&&t-this.debugLastFlush<250)return;this.debugLastFlush=t;let i=this.groundY,r=this.debugHits,o=this.debugRej,s=this.debugLast,a=this.camera.position.x,c=this.camera.position.z;this.ngZone.run(()=>{this.cameraPosition.set({x:a,z:c}),this.groundYSignal.set(i),this.hitCount.set(r),this.rejectedCount.set(o),this.lastReject.set(s)})}tick(e){let t=performance.now()/1e3;if(this.renderer.xr.isPresenting){let r=this.renderer.xr.getCamera();this.camera.position.setFromMatrixPosition(r.matrixWorld)}if(e&&this.hitTestSource){let r=this.renderer.xr.getReferenceSpace();if(r){let o=e.getHitTestResults(this.hitTestSource);if(o.length>0){let s=o[0].getPose(r);if(s){let a=s.transform.orientation,c=new O(0,1,0).applyQuaternion(new ii(a.x,a.y,a.z,a.w)),l=s.transform.position.y,u=this.camera.position.y,d=c.y>.85,f=l>u-2.5&&l<u+.5;if(d&&f){let h=this.groundY===null;this.groundY=h?l:this.groundY*.8+l*.2,this.debugHits++,h&&this.flushDebug(!0)}else this.debugRej++,this.debugLast=d?`range(\u0394=${(l-u).toFixed(2)}m)`:`slope(n.y=${c.y.toFixed(2)})`}}}this.flushDebug(!1)}this.flushDebug(!1);let i=this.groundY??0;this.fossilMeshes.forEach(r=>{let o=r;o.position.y=i;let s=o.position.x-this.camera.position.x,a=o.position.z-this.camera.position.z,c=Math.sqrt(s*s+a*a);if(o.scale.setScalar(Math.max(1,c/5)),r.children[1]&&(r.children[1].rotation.z+=.015),r.children[2]){r.children[2].rotation.z-=.008;let l=r.children[2].material;l.opacity=.15+Math.abs(Math.sin(t*1.5))*.25}r.children[3]&&(r.children[3].position.y=.24+Math.sin(t*2.5)*.03)}),this.gridMesh&&(this.gridMesh.position.y=i+.02),this.renderer.render(this.scene,this.camera)}static \u0275fac=function(t){return new(t||n)(Le(Ut))};static \u0275prov=Ae({token:n,factory:n.\u0275fac,providedIn:"root"})};var $2=40,Tp=class n{constructor(e){this.ngZone=e}playerPosition=lt(null);nearbyFossils=lt([]);error=lt(null);watchId=null;fossils=[];loadFossils(e){this.fossils=e;let t=this.playerPosition();t&&this.updateNearby(t)}startTracking(){if(!navigator.geolocation){this.error.set("Geolocation is not supported by your browser");return}this.watchId=navigator.geolocation.watchPosition(e=>{this.ngZone.run(()=>{let t={lat:e.coords.latitude,lng:e.coords.longitude,accuracy:e.coords.accuracy};this.playerPosition.set(t),this.updateNearby(t),this.error.set(null)})},e=>{this.ngZone.run(()=>{this.error.set(`GPS error: ${e.message}`)})},{enableHighAccuracy:!0,maximumAge:0,timeout:1e4})}stopTracking(){this.watchId!==null&&(navigator.geolocation.clearWatch(this.watchId),this.watchId=null)}updateNearby(e){let t=this.fossils.filter(i=>this.haversineMeters(e.lat,e.lng,i.lat,i.lng)<=$2);this.nearbyFossils.set(t)}distanceTo(e){let t=this.playerPosition();return t?this.haversineMeters(t.lat,t.lng,e.lat,e.lng):1/0}bearingTo(e){let t=this.playerPosition();if(!t)return 0;let i=this.toRad(t.lat),r=this.toRad(e.lat),o=this.toRad(e.lng-t.lng),s=Math.sin(o)*Math.cos(r),a=Math.cos(i)*Math.sin(r)-Math.sin(i)*Math.cos(r)*Math.cos(o);return(Math.atan2(s,a)*180/Math.PI+360)%360}haversineMeters(e,t,i,r){let s=this.toRad(i-e),a=this.toRad(r-t),c=Math.sin(s/2)**2+Math.cos(this.toRad(e))*Math.cos(this.toRad(i))*Math.sin(a/2)**2;return 6371e3*2*Math.atan2(Math.sqrt(c),Math.sqrt(1-c))}toRad(e){return e*Math.PI/180}static \u0275fac=function(t){return new(t||n)(Le(Ut))};static \u0275prov=Ae({token:n,factory:n.\u0275fac,providedIn:"root"})};var X2=["arCanvas"],Y2=["arOverlay"];function Z2(n,e){n&1&&(ve(0,"p",20),ce(1," \u26A0\uFE0F AR not detected \u2014 needs Chrome on Android with ARCore "),De())}function J2(n,e){if(n&1&&(ve(0,"p",21),ce(1),De()),n&2){let t=vt(2);fe(),yt(t.arService.error())}}function K2(n,e){if(n&1){let t=Yr();ve(0,"div",12)(1,"div",13)(2,"div",14),ce(3,"\u{1F9B4}"),De(),ve(4,"h1"),ce(5,"ARArcheoGame"),De(),ve(6,"div",15)(7,"span"),ce(8),De()(),ve(9,"div",16),ce(10),De(),ve(11,"button",17),Yt("click",function(){Nn(t);let r=vt();return Pn(r.onStartAR())}),ce(12),De(),jn(13,Z2,2,0,"p",18)(14,J2,2,1,"p",19),De()()}if(n&2){let t=vt();fe(7),Jn("ok",!!t.gps.playerPosition())("waiting",!t.gps.playerPosition()),fe(),Ln(" ",t.gps.playerPosition()?"\u{1F4CD} GPS active":"\u23F3 Waiting for GPS..."," "),fe(2),Ln("",t.allFossils().length," fossils hidden nearby"),fe(),St("disabled",t.arService.loading()||!t.gps.playerPosition()),fe(),Ln(" ",t.arService.loading()?"\u23F3 Starting...":t.gps.playerPosition()?"\u{1F4F7} Start AR":"\u23F3 Waiting for GPS..."," "),fe(),St("ngIf",!t.arService.supported()),fe(),St("ngIf",t.arService.error())}}function Q2(n,e){if(n&1){let t=Yr();ve(0,"div",22),Yt("click",function(){Nn(t);let r=vt();return Pn(r.selectedFossil.set(null))}),ve(1,"div",23),Yt("click",function(r){return r.stopPropagation()}),ve(2,"app-fossil-card",24),Yt("close",function(){Nn(t);let r=vt();return Pn(r.selectedFossil.set(null))})("collect",function(r){Nn(t);let o=vt();return Pn(o.onCollect(r))}),De()()()}if(n&2){let t=vt();fe(2),St("fossil",t.selectedFossil())}}function ek(n,e){if(n&1&&(ve(0,"div",25),ce(1),De()),n&2){let t=vt();fe(),yt(t.gps.error())}}function tk(n,e){if(n&1&&(ve(0,"div",26),ce(1),De()),n&2){let t=vt();fe(),yt(t.tooFarToast())}}function nk(n,e){n&1&&(ve(0,"p",35),ce(1," No fossils yet \u2014 go find some! "),De())}function ik(n,e){if(n&1&&(ve(0,"span",42),ce(1),De()),n&2){let t=vt().$implicit;fe(),Ln("\xD7",t.count)}}function rk(n,e){if(n&1&&(ve(0,"div",36)(1,"span",37),ce(2),De(),ve(3,"div",38)(4,"div",39),ce(5),De(),ve(6,"div",40),ce(7),De()(),jn(8,ik,2,1,"span",41),De()),n&2){let t=e.$implicit,i=vt(2);Nc("rarity-"+t.rarity),fe(2),yt(t.emoji),fe(3),yt(t.name),fe(2),ea("",t.rarity," \xB7 ",i.pointsFor(t.rarity)," pt"),fe(),St("ngIf",t.count>1)}}function ok(n,e){if(n&1){let t=Yr();ve(0,"div",22),Yt("click",function(){Nn(t);let r=vt();return Pn(r.showCollection.set(!1))}),ve(1,"div",27),Yt("click",function(r){return r.stopPropagation()}),ve(2,"div",28)(3,"div")(4,"div",29),ce(5,"Your Collection"),De(),ve(6,"div",30),ce(7,"Score: "),ve(8,"strong"),ce(9),De()()(),ve(10,"button",31),Yt("click",function(){Nn(t);let r=vt();return Pn(r.showCollection.set(!1))}),ce(11,"\u2715"),De()(),ve(12,"div",32),jn(13,nk,2,0,"p",33)(14,rk,9,7,"div",34),De()()()}if(n&2){let t=vt();fe(9),yt(t.score()),fe(4),St("ngIf",t.collectionGrouped.length===0),fe(),St("ngForOf",t.collectionGrouped)}}function sk(n,e){if(n&1&&(ve(0,"span"),ce(1),De()),n&2){let t=vt().ngIf,i=vt();fe(),yt(i.confettiEmoji(t.rarity))}}function ak(n,e){if(n&1&&(ve(0,"div",43)(1,"div",44),jn(2,sk,2,1,"span",45),De(),ve(3,"div",46)(4,"div",47),ce(5),De(),ve(6,"div",48),ce(7),De(),ve(8,"div",49),ce(9),De()()()),n&2){let t=e.ngIf,i=vt();Jn("celebration-chroma",t.rarity==="chroma")("celebration-epic",t.rarity==="epic"),fe(2),St("ngForOf",i.confettiPieces),fe(3),Ln(" ",t.rarity==="chroma"?"\u27E1 CHROMA \u27E1":t.rarity==="legendary"?"LEGENDARY!":"EPIC!"," "),fe(2),yt(t.name),fe(2),Ln("+",i.pointsFor(t.rarity)," points")}}function ck(n,e){if(n&1&&(ve(0,"div",51)(1,"span",52),ce(2,"last:"),De(),ve(3,"span",53),ce(4),De()()),n&2){let t=vt(2);fe(4),yt(t.arService.lastReject())}}function lk(n,e){if(n&1){let t=Yr();ve(0,"div",50)(1,"div",51)(2,"span",52),ce(3,"Floor:"),De(),ve(4,"span",53),ce(5),De()(),ve(6,"div",51)(7,"span",52),ce(8,"hits:"),De(),ve(9,"span",53),ce(10),De(),ve(11,"span",52),ce(12,"rej:"),De(),ve(13,"span",53),ce(14),De()(),jn(15,ck,5,1,"div",54),ve(16,"button",55),Yt("click",function(){Nn(t);let r=vt();return Pn(r.toggleGrid())}),ce(17),De(),ve(18,"button",55),Yt("click",function(){Nn(t);let r=vt();return Pn(r.toggleMarkers())}),ce(19),De(),ve(20,"div",56)(21,"button",57),Yt("click",function(){Nn(t);let r=vt();return Pn(r.debugCollect("legendary"))}),ce(22,"+Legendary"),De(),ve(23,"button",58),Yt("click",function(){Nn(t);let r=vt();return Pn(r.debugCollect("chroma"))}),ce(24,"+Chroma"),De()()()}if(n&2){let t=vt();fe(4),Jn("ok",t.arService.groundYSignal()!==null)("waiting",t.arService.groundYSignal()===null),fe(),Ln(" ",t.arService.groundYSignal()===null?"searching\u2026":"y="+t.arService.groundYSignal().toFixed(2)+"m"," "),fe(5),yt(t.arService.hitCount()),fe(4),yt(t.arService.rejectedCount()),fe(),St("ngIf",t.arService.lastReject()),fe(),Jn("on",t.showGrid()),fe(),Ln(" Grid: ",t.showGrid()?"ON":"OFF"," "),fe(),Jn("on",t.arService.markersVisible()),fe(),Ln(" Markers: ",t.arService.markersVisible()?"ON":"OFF"," ")}}var A0=10,uk=1,dk=1,Dw=40,fk={chroma:1e-4,legendary:.01,epic:.05,rare:.2,common:.7399},Iw={common:5,rare:20,epic:50,legendary:200,chroma:1e3},Dp=class n{constructor(e,t,i){this.arService=e;this.gps=t;this.orientation=i;vc(()=>{let r=this.precisePosition();r&&mi(()=>this.replenishFossils(r))}),vc(()=>{let r=this.preciseNearby();this.syncARMarkers(r)}),vc(()=>{let r=this.precisePosition(),o=this.arService.active(),s=this.showGrid();!r||!o||!s||mi(()=>this.refreshGridOverlay(r))})}canvasRef;overlayRef;fossilTemplates=Tw;allFossils=lt([]);collectedIds=new Set;collectedFossils=lt([]);score=Zr(()=>this.collectedFossils().reduce((e,t)=>e+(Iw[t.rarity]??0),0));selectedFossil=lt(null);celebrating=lt(null);celebrateTimeout=0;showMap=!1;showCollection=lt(!1);showLearn=!1;spawnCounter=0;originPos=null;placedFossilIds=new Set;cellStates=new Map;lastGridKey="";tooFarToast=lt(null);tooFarTimeout=0;captureTimeout=0;captureOriginTimeout=0;showGrid=lt(!0);toggleGrid(){let e=!this.showGrid();if(this.showGrid.set(e),!e)this.arService.clearGrid(),this.lastGridKey="";else{let t=this.gps.playerPosition();t&&this.refreshGridOverlay(t)}}toggleMarkers(){this.arService.setMarkersVisible(!this.arService.markersVisible())}fossilDirections=Zr(()=>{let e=this.allFossils(),t=this.precisePosition(),i=this.orientation.orientation()?.heading??0;return t?e.filter(r=>!this.collectedIds.has(r.id)&&!r.discovered).map(r=>{let o=(r.lat-t.lat)*111e3,s=(r.lng-t.lng)*111e3*Math.cos(t.lat*Math.PI/180),a=Math.sqrt(o*o+s*s),l=(((Math.atan2(s,o)*180/Math.PI+360)%360-i)%360+360)%360;return{id:r.id,name:r.name,relAngle:l,distance:Math.round(a)}}).sort((r,o)=>r.distance-o.distance):[]});precisePosition=Zr(()=>{let e=this.originPos;if(!e||!this.arService.active())return this.gps.playerPosition();let t=this.arService.cameraPosition(),r=(this.orientation.headingReference()??this.orientation.orientation()?.heading??0)*Math.PI/180,o=t.x*Math.cos(r)-t.z*Math.sin(r),s=-(t.x*Math.sin(r)+t.z*Math.cos(r)),a=Math.cos(e.lat*Math.PI/180);return{lat:e.lat+s/111e3,lng:e.lng+o/(111e3*a),accuracy:.1}});preciseNearby=Zr(()=>{let e=this.precisePosition();return e?this.allFossils().filter(t=>{let i=(t.lat-e.lat)*111e3,r=(t.lng-e.lng)*111e3*Math.cos(e.lat*Math.PI/180);return i*i+r*r<=Dw*Dw}):[]});refreshGridOverlay(e){let t=A0/111e3,i=Math.floor(e.lat/t),r=Math.floor(e.lng/t),o=`${i}:${r}`;if(o===this.lastGridKey)return;this.lastGridKey=o;let s=2,a=this.orientation.headingReference()??this.orientation.orientation()?.heading??0,c=[],l=(u,d)=>{let f=(u-e.lat)*111e3,h=(d-e.lng)*111e3*Math.cos(e.lat*Math.PI/180),g=a*Math.PI/180,_=h*Math.cos(g)-f*Math.sin(g),m=-(h*Math.sin(g)+f*Math.cos(g));return{x:_,z:m}};for(let u=-s;u<=s;u++)for(let d=-s;d<=s;d++){let f=(i+u)*t,h=(i+u+1)*t,g=(r+d)*t,_=(r+d+1)*t,m=l(f,g),p=l(h,g),b=l(h,_),w=l(f,_);c.push({x1:m.x,z1:m.z,x2:p.x,z2:p.z}),c.push({x1:p.x,z1:p.z,x2:b.x,z2:b.z}),c.push({x1:b.x,z1:b.z,x2:w.x,z2:w.z}),c.push({x1:w.x,z1:w.z,x2:m.x,z2:m.z})}this.arService.placeGrid(c)}async ngOnInit(){await this.arService.checkSupport(),await this.arService.init(this.canvasRef.nativeElement),this.orientation.start(),this.gps.startTracking(),this.arService.setTapHandler(e=>{if(this.selectedFossil())return;let t=this.allFossils().find(r=>r.id===e&&!this.collectedIds.has(r.id)&&!r.discovered);if(!t)return;let i=this.arService.xrDistanceTo(e);if(i>dk){this.tooFarToast.set(`Walk closer \u2014 ${Math.round(i)} m away`),clearTimeout(this.tooFarTimeout),this.tooFarTimeout=window.setTimeout(()=>this.tooFarToast.set(null),1800);return}this.selectedFossil.set(t)})}async onStartAR(){if(await this.orientation.requestPermission(),await this.arService.startAR(this.overlayRef.nativeElement),!this.orientation.captureHeadingReference()){let t=Date.now(),i=()=>{this.orientation.captureHeadingReference()||Date.now()-t>3e3||(this.captureTimeout=window.setTimeout(i,100))};i()}let e=()=>{this.placedFossilIds.clear(),this.lastGridKey="",this.allFossils().forEach(i=>this.arService.removeFossil(i.id));let t=this.gps.playerPosition();t&&(this.replenishFossils(t),this.syncARMarkers(this.gps.nearbyFossils()))};if(this.originPos=this.gps.playerPosition(),this.originPos)e();else{let t=Date.now(),i=()=>{let r=this.gps.playerPosition();if(r){this.originPos=r,e();return}Date.now()-t>3e3||(this.captureOriginTimeout=window.setTimeout(i,100))};i()}}onCollect(e){this.collectedIds.add(e.id),this.collectedFossils.update(i=>[...i,e]);let t=this.cellStates.get(this.cellKey(e.lat,e.lng));if(t&&t.collected.add(e.id),this.arService.removeFossil(e.id),this.selectedFossil.set(null),this.allFossils.update(i=>i.filter(r=>r.id!==e.id)),this.gps.loadFossils(this.allFossils()),e.rarity==="epic"||e.rarity==="legendary"||e.rarity==="chroma"){this.celebrating.set(e),clearTimeout(this.celebrateTimeout);let i=e.rarity==="chroma"?4500:e.rarity==="legendary"?2800:2e3;this.celebrateTimeout=window.setTimeout(()=>this.celebrating.set(null),i)}}get collectionGrouped(){let e=new Map;for(let i of this.collectedFossils()){let r=i.id.split("_")[0],o=e.get(r);o?o.count++:e.set(r,{baseId:r,name:i.name,rarity:i.rarity,count:1,emoji:this.emojiFor(r)})}let t={chroma:0,legendary:1,epic:2,rare:3,common:4};return[...e.values()].sort((i,r)=>(t[i.rarity]??9)-(t[r.rarity]??9))}pointsFor(e){return Iw[e]??0}debugCollect(e){let t=this.fossilTemplates.find(i=>i.rarity===e);t&&(this.spawnCounter++,this.onCollect(it(ae({},t),{id:`debug_${t.id}_${this.spawnCounter}`,lat:0,lng:0,discovered:!1})))}confettiPieces=Array.from({length:24},(e,t)=>t);confettiEmoji(e){return e==="chroma"?"\u{1F308}":e==="epic"?"\u{1F525}":"\u2728"}emojiFor(e){return{"flint-handaxe-01":"\u{1FA93}","bone-needle-01":"\u{1FAA1}","clay-pot-shard-01":"\u{1F3FA}","bronze-fibula-01":"\u{1F4CC}","roman-coin-01":"\u{1FA99}","obsidian-arrowhead-01":"\u{1F3F9}","golden-torc-01":"\u{1F4FF}","clay-tablet-01":"\u{1F4DC}","iron-dagger-01":"\u{1F5E1}\uFE0F","human-femur-01":"\u{1F9B4}","wooden-post-01":"\u{1FAB5}","ivory-necklace-01":"\u{1F49B}","viking-brooch-01":"\u2694\uFE0F","egyptian-scarab-01":"\u{1FAB2}","iridescent-prism-01":"\u{1F308}"}[e]??"\u{1FAA8}"}replenishFossils(e){let t=A0/111e3,i=Math.floor(e.lat/t),r=Math.floor(e.lng/t),o=uk,s=[];for(let c=-o;c<=o;c++)for(let l=-o;l<=o;l++){let u=`${i+c}:${r+l}`,d=this.cellStates.get(u);d||(d=this.rollCell(i+c,r+l,t),this.cellStates.set(u,d)),d.fossils.forEach(f=>{d.collected.has(f.id)||s.push(f)})}let a=new Set(s.map(c=>c.id));this.allFossils().forEach(c=>{a.has(c.id)||this.arService.removeFossil(c.id)}),this.allFossils.set(s),this.gps.loadFossils(s)}rollCell(e,t,i){let r=Math.random(),o=r<.25?0:r<.75?1:2,s=[];for(let a=0;a<o;a++)s.push(this.spawnInCell(e,t,i));return{fossils:s,collected:new Set}}spawnInCell(e,t,i){let r=(e+.2+Math.random()*.6)*i,o=(t+.2+Math.random()*.6)*i,s=this.pickRarity(),a=this.fossilTemplates.filter(l=>l.rarity===s),c=a.length?a[Math.floor(Math.random()*a.length)]:this.fossilTemplates[0];return this.spawnCounter++,it(ae({},c),{id:`${c.id}_${Date.now()}_${this.spawnCounter}`,lat:r,lng:o,discovered:!1})}pickRarity(){let e=Math.random(),t=0;for(let[i,r]of Object.entries(fk))if(t+=r,e<t)return i;return"common"}cellKey(e,t){let i=A0/111e3;return`${Math.floor(e/i)}:${Math.floor(t/i)}`}syncARMarkers(e){let t=this.originPos;if(!t)return;let r=(this.orientation.headingReference()??this.orientation.orientation()?.heading??0)*Math.PI/180,o=Math.cos(t.lat*Math.PI/180);e.forEach(a=>{if(this.collectedIds.has(a.id)||this.placedFossilIds.has(a.id))return;let c=(a.lat-t.lat)*111e3,l=(a.lng-t.lng)*111e3*o,u=l*Math.cos(r)-c*Math.sin(r),d=-(l*Math.sin(r)+c*Math.cos(r)),f=-Ep;this.arService.placeFossil(a.id,new O(u,f,d)),this.placedFossilIds.add(a.id)});let s=new Set(e.map(a=>a.id));this.allFossils().forEach(a=>{!s.has(a.id)&&!this.collectedIds.has(a.id)&&(this.arService.removeFossil(a.id),this.placedFossilIds.delete(a.id))})}ngOnDestroy(){clearTimeout(this.captureTimeout),clearTimeout(this.captureOriginTimeout),clearTimeout(this.tooFarTimeout),clearTimeout(this.celebrateTimeout),this.gps.stopTracking(),this.orientation.stop(),this.orientation.clearHeadingReference(),this.originPos=null,this.placedFossilIds.clear(),this.arService.stopAR()}static \u0275fac=function(t){return new(t||n)(Qt(Cp),Qt(Tp),Qt(wp))};static \u0275cmp=Ri({type:n,selectors:[["app-ar-view"]],viewQuery:function(t,i){if(t&1&&Zs(X2,7)(Y2,7),t&2){let r;Js(r=Ks())&&(i.canvasRef=r.first),Js(r=Ks())&&(i.overlayRef=r.first)}},decls:13,vars:15,consts:[["arCanvas",""],["arOverlay",""],[1,"ar-container"],["class","no-ar-bg",4,"ngIf"],[1,"ar-canvas"],[1,"ar-overlay"],[3,"startAR","openMap","openCollection","openLearn","collected","total","score","nearbyCount","gpsActive","showARPrompt","arActive","fossilDirections"],["class","overlay-backdrop",3,"click",4,"ngIf"],["class","gps-error-toast",4,"ngIf"],["class","too-far-toast",4,"ngIf"],["class","celebration",3,"celebration-chroma","celebration-epic",4,"ngIf"],["class","floor-debug",4,"ngIf"],[1,"no-ar-bg"],[1,"no-ar-content"],[1,"logo"],[1,"status-row"],[1,"fossil-count"],[1,"start-ar-btn",3,"click","disabled"],["class","hint",4,"ngIf"],["class","hint error",4,"ngIf"],[1,"hint"],[1,"hint","error"],[1,"overlay-backdrop",3,"click"],[1,"overlay-center",3,"click"],[3,"close","collect","fossil"],[1,"gps-error-toast"],[1,"too-far-toast"],[1,"collection-panel",3,"click"],[1,"collection-header"],[1,"collection-title"],[1,"collection-score"],[1,"close-btn",3,"click"],[1,"collection-body"],["class","collection-empty",4,"ngIf"],["class","collection-item",3,"class",4,"ngFor","ngForOf"],[1,"collection-empty"],[1,"collection-item"],[1,"collection-emoji"],[1,"collection-meta"],[1,"collection-name"],[1,"collection-rarity"],["class","collection-count",4,"ngIf"],[1,"collection-count"],[1,"celebration"],[1,"celebration-confetti"],[4,"ngFor","ngForOf"],[1,"celebration-text"],[1,"celebration-banner"],[1,"celebration-name"],[1,"celebration-points"],[1,"floor-debug"],[1,"floor-debug-row"],[1,"floor-debug-label"],[1,"floor-debug-value"],["class","floor-debug-row",4,"ngIf"],[1,"grid-toggle",3,"click"],[1,"debug-row"],[1,"debug-btn","legendary",3,"click"],[1,"debug-btn","chroma",3,"click"]],template:function(t,i){t&1&&(ve(0,"div",2),jn(1,K2,15,10,"div",3),Wn(2,"canvas",4,0),ve(4,"div",5,1)(6,"app-hud",6),Yt("startAR",function(){return i.onStartAR()})("openMap",function(){return i.showMap=!0})("openCollection",function(){return i.showCollection.set(!0)})("openLearn",function(){return i.showLearn=!0}),De(),jn(7,Q2,3,1,"div",7)(8,ek,2,1,"div",8)(9,tk,2,1,"div",9)(10,ok,15,3,"div",7)(11,ak,10,8,"div",10)(12,lk,25,14,"div",11),De()()),t&2&&(fe(),St("ngIf",!i.arService.active()),fe(5),St("collected",i.collectedIds.size)("total",i.fossilTemplates.length)("score",i.score())("nearbyCount",i.gps.nearbyFossils().length)("gpsActive",!!i.gps.playerPosition())("showARPrompt",!i.arService.active()&&i.arService.supported())("arActive",i.arService.active())("fossilDirections",i.fossilDirections()),fe(),St("ngIf",i.selectedFossil()),fe(),St("ngIf",i.gps.error()),fe(),St("ngIf",i.tooFarToast()),fe(),St("ngIf",i.showCollection()),fe(),St("ngIf",i.celebrating()),fe(),St("ngIf",i.arService.active()))},dependencies:[Kr,na,Lc,Mp,Sp],styles:[".ar-container[_ngcontent-%COMP%]{position:fixed;inset:0;background:#1a0f00}.ar-canvas[_ngcontent-%COMP%]{position:fixed;inset:0;width:100%;height:100%;display:block}.ar-overlay[_ngcontent-%COMP%]{position:fixed;inset:0;pointer-events:none}.no-ar-bg[_ngcontent-%COMP%]{position:fixed;inset:0;z-index:10;background:radial-gradient(ellipse at center,#3d2a00,#1a0f00 70%);display:flex;align-items:center;justify-content:center}.no-ar-content[_ngcontent-%COMP%]{text-align:center;color:#f5e6c8;padding:24px}.logo[_ngcontent-%COMP%]{font-size:64px;margin-bottom:12px}h1[_ngcontent-%COMP%]{font-size:28px;font-weight:800;letter-spacing:1px;margin-bottom:8px;color:gold}.status-row[_ngcontent-%COMP%]{margin-bottom:12px}.status-row[_ngcontent-%COMP%]   .ok[_ngcontent-%COMP%]{color:#4ade80;font-weight:600}.status-row[_ngcontent-%COMP%]   .waiting[_ngcontent-%COMP%]{color:#facc15;font-weight:600}.fossil-count[_ngcontent-%COMP%]{display:inline-block;background:#8b69144d;border:1px solid #8B6914;border-radius:20px;padding:6px 16px;font-size:13px;color:#f5e6c8;margin-bottom:24px}.start-ar-btn[_ngcontent-%COMP%]{display:block;width:200px;margin:0 auto 16px;padding:14px;background:linear-gradient(135deg,#8b6914,#c8a020);border:none;border-radius:12px;color:#fff;font-size:18px;font-weight:700;cursor:pointer;box-shadow:0 4px 20px #8b691480}.start-ar-btn[_ngcontent-%COMP%]:active{transform:scale(.96)}.start-ar-btn[_ngcontent-%COMP%]:disabled{opacity:.6;cursor:not-allowed;transform:none}.hint[_ngcontent-%COMP%]{font-size:12px;color:#facc15;margin-top:8px;padding:0 20px}.hint.error[_ngcontent-%COMP%]{color:#f87171;background:#c8000033;border-radius:8px;padding:8px 16px}.overlay-backdrop[_ngcontent-%COMP%]{position:fixed;inset:0;background:#0009;display:flex;align-items:center;justify-content:center;z-index:100;pointer-events:all}.gps-error-toast[_ngcontent-%COMP%]{position:fixed;top:80px;left:50%;transform:translate(-50%);background:#c85000e6;color:#fff;padding:8px 16px;border-radius:20px;font-size:12px;pointer-events:none}.too-far-toast[_ngcontent-%COMP%]{position:fixed;top:50%;left:50%;transform:translate(-50%,-50%);background:#000000d9;border:1px solid #ffd700;color:gold;padding:12px 20px;border-radius:24px;font-size:14px;font-weight:700;pointer-events:none;z-index:50;animation:_ngcontent-%COMP%_toastIn .18s ease-out}@keyframes _ngcontent-%COMP%_toastIn{0%{opacity:0;transform:translate(-50%,-45%)}to{opacity:1;transform:translate(-50%,-50%)}}.collection-panel[_ngcontent-%COMP%]{background:linear-gradient(145deg,#2a1a00,#3d2a00);border:2px solid #8B6914;border-radius:16px;color:#f5e6c8;max-width:380px;width:92vw;max-height:80vh;display:flex;flex-direction:column;box-shadow:0 8px 32px #0009}.collection-header[_ngcontent-%COMP%]{display:flex;justify-content:space-between;align-items:flex-start;padding:14px 18px;border-bottom:1px solid rgba(139,105,20,.4)}.collection-title[_ngcontent-%COMP%]{font-size:18px;font-weight:700;color:gold}.collection-score[_ngcontent-%COMP%]{font-size:13px;color:#c8a86b;margin-top:2px}.collection-score[_ngcontent-%COMP%]   strong[_ngcontent-%COMP%]{color:gold;font-size:16px;margin-left:4px}.collection-body[_ngcontent-%COMP%]{padding:12px 14px 18px;overflow-y:auto}.collection-empty[_ngcontent-%COMP%]{text-align:center;color:#c8a86b99;padding:24px 0}.collection-item[_ngcontent-%COMP%]{display:flex;align-items:center;gap:12px;padding:8px 12px;margin-bottom:6px;border-radius:10px;background:#00000040;border-left:3px solid #6b7280}.collection-item.rarity-rare[_ngcontent-%COMP%]{border-left-color:#a855f7}.collection-item.rarity-epic[_ngcontent-%COMP%]{border-left-color:#f43f5e;background:#f43f5e1a}.collection-item.rarity-legendary[_ngcontent-%COMP%]{border-left-color:gold;background:#ffd7001a}.collection-item.rarity-chroma[_ngcontent-%COMP%]{border-left:3px solid transparent;background:#0006 padding-box,linear-gradient(90deg,#ff0040,#ffe000,#00e060,#00c0ff,#ff00d0) border-box;animation:_ngcontent-%COMP%_chromaSpin 6s linear infinite}.collection-emoji[_ngcontent-%COMP%]{font-size:26px}.collection-meta[_ngcontent-%COMP%]{flex:1}.collection-name[_ngcontent-%COMP%]{font-size:14px;font-weight:600}.collection-rarity[_ngcontent-%COMP%]{font-size:11px;color:#c8a86b;text-transform:capitalize}.collection-count[_ngcontent-%COMP%]{font-size:13px;font-weight:700;color:gold;background:#ffd70026;padding:3px 8px;border-radius:10px}.close-btn[_ngcontent-%COMP%]{background:none;border:none;color:#f5e6c8;font-size:18px;cursor:pointer;padding:4px;line-height:1}@keyframes _ngcontent-%COMP%_chromaSpin{to{filter:hue-rotate(360deg)}}.celebration[_ngcontent-%COMP%]{position:fixed;inset:0;z-index:200;pointer-events:none;overflow:hidden;background:radial-gradient(circle at center,rgba(255,215,0,.25),transparent 60%);animation:_ngcontent-%COMP%_celebFade 2.6s ease-out forwards}.celebration.celebration-epic[_ngcontent-%COMP%]{background:radial-gradient(circle at center,rgba(244,63,94,.3),transparent 60%);animation:_ngcontent-%COMP%_celebFadeEpic 2s ease-out forwards}.celebration.celebration-chroma[_ngcontent-%COMP%]{background:radial-gradient(circle at center,rgba(255,0,150,.35),rgba(0,200,255,.25),transparent 70%);animation:_ngcontent-%COMP%_celebFadeChroma 4.4s ease-out forwards}@keyframes _ngcontent-%COMP%_celebFade{0%,70%{opacity:1}to{opacity:0}}@keyframes _ngcontent-%COMP%_celebFadeEpic{0%,60%{opacity:1}to{opacity:0}}@keyframes _ngcontent-%COMP%_celebFadeChroma{0%,80%{opacity:1}to{opacity:0}}.celebration-confetti[_ngcontent-%COMP%]{position:absolute;inset:0}.celebration-confetti[_ngcontent-%COMP%]   span[_ngcontent-%COMP%]{position:absolute;top:50%;left:50%;font-size:28px;opacity:0;animation:_ngcontent-%COMP%_confettiFly 1.6s ease-out forwards}.celebration-confetti[_ngcontent-%COMP%]   span[_ngcontent-%COMP%]:nth-child(1){--a: 0deg;animation-delay:0s}.celebration-confetti[_ngcontent-%COMP%]   span[_ngcontent-%COMP%]:nth-child(2){--a: 15deg;animation-delay:.02s}.celebration-confetti[_ngcontent-%COMP%]   span[_ngcontent-%COMP%]:nth-child(3){--a: 30deg;animation-delay:.04s}.celebration-confetti[_ngcontent-%COMP%]   span[_ngcontent-%COMP%]:nth-child(4){--a: 45deg;animation-delay:.06s}.celebration-confetti[_ngcontent-%COMP%]   span[_ngcontent-%COMP%]:nth-child(5){--a: 60deg;animation-delay:.08s}.celebration-confetti[_ngcontent-%COMP%]   span[_ngcontent-%COMP%]:nth-child(6){--a: 75deg;animation-delay:.1s}.celebration-confetti[_ngcontent-%COMP%]   span[_ngcontent-%COMP%]:nth-child(7){--a: 90deg;animation-delay:.12s}.celebration-confetti[_ngcontent-%COMP%]   span[_ngcontent-%COMP%]:nth-child(8){--a: 105deg;animation-delay:.14s}.celebration-confetti[_ngcontent-%COMP%]   span[_ngcontent-%COMP%]:nth-child(9){--a: 120deg;animation-delay:.16s}.celebration-confetti[_ngcontent-%COMP%]   span[_ngcontent-%COMP%]:nth-child(10){--a: 135deg;animation-delay:.18s}.celebration-confetti[_ngcontent-%COMP%]   span[_ngcontent-%COMP%]:nth-child(11){--a: 150deg;animation-delay:.2s}.celebration-confetti[_ngcontent-%COMP%]   span[_ngcontent-%COMP%]:nth-child(12){--a: 165deg;animation-delay:.22s}.celebration-confetti[_ngcontent-%COMP%]   span[_ngcontent-%COMP%]:nth-child(13){--a: 180deg;animation-delay:.24s}.celebration-confetti[_ngcontent-%COMP%]   span[_ngcontent-%COMP%]:nth-child(14){--a: 195deg;animation-delay:.26s}.celebration-confetti[_ngcontent-%COMP%]   span[_ngcontent-%COMP%]:nth-child(15){--a: 210deg;animation-delay:.28s}.celebration-confetti[_ngcontent-%COMP%]   span[_ngcontent-%COMP%]:nth-child(16){--a: 225deg;animation-delay:.3s}.celebration-confetti[_ngcontent-%COMP%]   span[_ngcontent-%COMP%]:nth-child(17){--a: 240deg;animation-delay:.32s}.celebration-confetti[_ngcontent-%COMP%]   span[_ngcontent-%COMP%]:nth-child(18){--a: 255deg;animation-delay:.34s}.celebration-confetti[_ngcontent-%COMP%]   span[_ngcontent-%COMP%]:nth-child(19){--a: 270deg;animation-delay:.36s}.celebration-confetti[_ngcontent-%COMP%]   span[_ngcontent-%COMP%]:nth-child(20){--a: 285deg;animation-delay:.38s}.celebration-confetti[_ngcontent-%COMP%]   span[_ngcontent-%COMP%]:nth-child(21){--a: 300deg;animation-delay:.4s}.celebration-confetti[_ngcontent-%COMP%]   span[_ngcontent-%COMP%]:nth-child(22){--a: 315deg;animation-delay:.42s}.celebration-confetti[_ngcontent-%COMP%]   span[_ngcontent-%COMP%]:nth-child(23){--a: 330deg;animation-delay:.44s}.celebration-confetti[_ngcontent-%COMP%]   span[_ngcontent-%COMP%]:nth-child(24){--a: 345deg;animation-delay:.46s}@keyframes _ngcontent-%COMP%_confettiFly{0%{opacity:0;transform:translate(-50%,-50%) rotate(var(--a)) translateY(0) rotate(0)}15%{opacity:1}to{opacity:0;transform:translate(-50%,-50%) rotate(var(--a)) translateY(-260px) rotate(720deg)}}.celebration-text[_ngcontent-%COMP%]{position:absolute;top:38%;left:50%;transform:translate(-50%,-50%);text-align:center;color:#fff;text-shadow:0 0 18px rgba(255,215,0,.8),0 2px 8px rgba(0,0,0,.7);animation:_ngcontent-%COMP%_celebPop .6s cubic-bezier(.2,1.6,.4,1) forwards}.celebration-banner[_ngcontent-%COMP%]{font-size:38px;font-weight:900;letter-spacing:4px;color:gold}.celebration.celebration-epic[_ngcontent-%COMP%]   .celebration-banner[_ngcontent-%COMP%]{color:#f43f5e}.celebration.celebration-chroma[_ngcontent-%COMP%]   .celebration-banner[_ngcontent-%COMP%]{background:linear-gradient(90deg,#ff0040,#ffe000,#00e060,#00c0ff,#ff00d0);-webkit-background-clip:text;background-clip:text;color:transparent;animation:_ngcontent-%COMP%_chromaSpin 1.6s linear infinite}.celebration-name[_ngcontent-%COMP%]{font-size:18px;margin-top:6px;font-weight:700}.celebration-points[_ngcontent-%COMP%]{font-size:16px;margin-top:4px;color:#ffe066;font-weight:700}@keyframes _ngcontent-%COMP%_celebPop{0%{opacity:0;transform:translate(-50%,-50%) scale(.4)}to{opacity:1;transform:translate(-50%,-50%) scale(1)}}.floor-debug[_ngcontent-%COMP%]{position:fixed;top:58px;left:12px;background:#0009;color:#f5e6c8;border:1px solid rgba(255,215,0,.3);border-radius:8px;padding:6px 10px;font-size:11px;font-family:monospace;line-height:1.4;pointer-events:none;z-index:30}.floor-debug-row[_ngcontent-%COMP%]{display:flex;gap:6px}.floor-debug-label[_ngcontent-%COMP%]{color:#c8a86bb3}.floor-debug-value[_ngcontent-%COMP%]{color:#f5e6c8}.floor-debug-value.ok[_ngcontent-%COMP%]{color:#4ade80;font-weight:600}.floor-debug-value.waiting[_ngcontent-%COMP%]{color:#facc15}.grid-toggle[_ngcontent-%COMP%]{margin-top:4px;padding:3px 8px;background:#00000080;border:1px solid rgba(255,215,0,.4);color:#f5e6c8;font-family:monospace;font-size:11px;border-radius:4px;cursor:pointer;pointer-events:all}.grid-toggle.on[_ngcontent-%COMP%]{background:#ffd70040;color:gold}.debug-row[_ngcontent-%COMP%]{display:flex;gap:4px;margin-top:4px}.debug-btn[_ngcontent-%COMP%]{flex:1;padding:3px 6px;border:none;border-radius:4px;font-family:monospace;font-size:10px;font-weight:700;cursor:pointer;pointer-events:all;color:#000}.debug-btn.legendary[_ngcontent-%COMP%]{background:gold}.debug-btn.chroma[_ngcontent-%COMP%]{background:linear-gradient(90deg,#ff0040,#ffe000,#00e060,#00c0ff,#ff00d0);color:#fff;text-shadow:0 1px 2px rgba(0,0,0,.5)}"]})};var Aw=[{path:"",component:Dp},{path:"**",redirectTo:""}];var R0="Service workers are disabled or not supported by this browser",$a=class{serviceWorker;worker;registration;events;constructor(e,t){if(this.serviceWorker=e,!e)this.worker=this.events=this.registration=new tt(i=>i.error(new _e(5601,!1)));else{let i=null,r=new $t;this.worker=new tt(l=>(i!==null&&l.next(i),r.subscribe(u=>l.next(u))));let o=()=>{let{controller:l}=e;l!==null&&(i=l,r.next(i))};e.addEventListener("controllerchange",o),o(),this.registration=this.worker.pipe(yn(()=>e.getRegistration().then(l=>{if(!l)throw new _e(5601,!1);return l})));let s=new $t;this.events=s.asObservable();let a=l=>{let{data:u}=l;u?.type&&s.next(u)};e.addEventListener("message",a),t?.get(mr,null,{optional:!0})?.onDestroy(()=>{e.removeEventListener("controllerchange",o),e.removeEventListener("message",a)})}}postMessage(e,t){return new Promise(i=>{this.worker.pipe(In(1)).subscribe(r=>{r.postMessage(ae({action:e},t)),i()})})}postMessageWithOperation(e,t,i){let r=this.waitForOperationCompleted(i),o=this.postMessage(e,t);return Promise.all([o,r]).then(([,s])=>s)}generateNonce(){return Math.round(Math.random()*1e7)}eventsOfType(e){let t;return typeof e=="string"?t=i=>i.type===e:t=i=>e.includes(i.type),this.events.pipe(ai(t))}nextEventOfType(e){return this.eventsOfType(e).pipe(In(1))}waitForOperationCompleted(e){return new Promise((t,i)=>{this.eventsOfType("OPERATION_COMPLETED").pipe(ai(r=>r.nonce===e),In(1),Mt(r=>{if(r.result!==void 0)return r.result;throw new Error(r.error)})).subscribe({next:t,error:i})})}get isEnabled(){return!!this.serviceWorker}},hk=(()=>{class n{sw;messages;notificationClicks;notificationCloses;pushSubscriptionChanges;subscription;get isEnabled(){return this.sw.isEnabled}pushManager=null;subscriptionChanges=new $t;constructor(t){if(this.sw=t,!t.isEnabled){this.messages=or,this.notificationClicks=or,this.notificationCloses=or,this.pushSubscriptionChanges=or,this.subscription=or;return}this.messages=this.sw.eventsOfType("PUSH").pipe(Mt(r=>r.data)),this.notificationClicks=this.sw.eventsOfType("NOTIFICATION_CLICK").pipe(Mt(r=>r.data)),this.notificationCloses=this.sw.eventsOfType("NOTIFICATION_CLOSE").pipe(Mt(r=>r.data)),this.pushSubscriptionChanges=this.sw.eventsOfType("PUSH_SUBSCRIPTION_CHANGE").pipe(Mt(r=>r.data)),this.pushManager=this.sw.registration.pipe(Mt(r=>r.pushManager));let i=this.pushManager.pipe(yn(r=>r.getSubscription()));this.subscription=new tt(r=>{let o=i.subscribe(r),s=this.subscriptionChanges.subscribe(r);return()=>{o.unsubscribe(),s.unsubscribe()}})}requestSubscription(t){if(!this.sw.isEnabled||this.pushManager===null)return Promise.reject(new Error(R0));let i={userVisibleOnly:!0},r=this.decodeBase64(t.serverPublicKey.replace(/_/g,"/").replace(/-/g,"+")),o=new Uint8Array(new ArrayBuffer(r.length));for(let s=0;s<r.length;s++)o[s]=r.charCodeAt(s);return i.applicationServerKey=o,new Promise((s,a)=>{this.pushManager.pipe(yn(c=>c.subscribe(i)),In(1)).subscribe({next:c=>{this.subscriptionChanges.next(c),s(c)},error:a})})}unsubscribe(){if(!this.sw.isEnabled)return Promise.reject(new Error(R0));let t=i=>{if(i===null)throw new _e(5602,!1);return i.unsubscribe().then(r=>{if(!r)throw new _e(5603,!1);this.subscriptionChanges.next(null)})};return new Promise((i,r)=>{this.subscription.pipe(In(1),yn(t)).subscribe({next:i,error:r})})}decodeBase64(t){return atob(t)}static \u0275fac=function(i){return new(i||n)(Le($a))};static \u0275prov=Ae({token:n,factory:n.\u0275fac})}return n})(),pk=(()=>{class n{sw;versionUpdates;unrecoverable;get isEnabled(){return this.sw.isEnabled}ongoingCheckForUpdate=null;constructor(t){if(this.sw=t,!t.isEnabled){this.versionUpdates=or,this.unrecoverable=or;return}this.versionUpdates=this.sw.eventsOfType(["VERSION_DETECTED","VERSION_INSTALLATION_FAILED","VERSION_READY","NO_NEW_VERSION_DETECTED"]),this.unrecoverable=this.sw.eventsOfType("UNRECOVERABLE_STATE")}checkForUpdate(){if(!this.sw.isEnabled)return Promise.reject(new Error(R0));if(this.ongoingCheckForUpdate)return this.ongoingCheckForUpdate;let t=this.sw.generateNonce();return this.ongoingCheckForUpdate=this.sw.postMessageWithOperation("CHECK_FOR_UPDATES",{nonce:t},t).finally(()=>{this.ongoingCheckForUpdate=null}),this.ongoingCheckForUpdate}activateUpdate(){if(!this.sw.isEnabled)return Promise.reject(new _e(5601,!1));let t=this.sw.generateNonce();return this.sw.postMessageWithOperation("ACTIVATE_UPDATE",{nonce:t},t)}static \u0275fac=function(i){return new(i||n)(Le($a))};static \u0275prov=Ae({token:n,factory:n.\u0275fac})}return n})(),Nw=new Pe("");function mk(){let n=Q(zl);if(!("serviceWorker"in navigator&&n.enabled!==!1))return;let e=Q(Nw),t=Q(Ut),i=Q(mr);t.runOutsideAngular(()=>{let r=navigator.serviceWorker,o=()=>r.controller?.postMessage({action:"INITIALIZE"});r.addEventListener("controllerchange",o),i.onDestroy(()=>{r.removeEventListener("controllerchange",o)})}),t.runOutsideAngular(()=>{let r,{registrationStrategy:o}=n;if(typeof o=="function")r=new Promise(s=>o().subscribe(()=>s()));else{let[s,...a]=(o||"registerWhenStable:30000").split(":");switch(s){case"registerImmediately":r=Promise.resolve();break;case"registerWithDelay":r=Rw(+a[0]||0);break;case"registerWhenStable":r=Promise.race([i.whenStable(),Rw(+a[0])]);break;default:throw new _e(5600,!1)}}r.then(()=>{i.destroyed||navigator.serviceWorker.register(e,{scope:n.scope,updateViaCache:n.updateViaCache,type:n.type}).catch(s=>console.error(kr(5604,!1)))})})}function Rw(n){return new Promise(e=>setTimeout(e,n))}function gk(){let n=Q(zl),e=Q(zn),t=!0;return new $a(t&&n.enabled!==!1?navigator.serviceWorker:void 0,e)}var zl=class{enabled;updateViaCache;type;scope;registrationStrategy};function Pw(n,e={}){return lr([hk,pk,{provide:Nw,useValue:n},{provide:zl,useValue:e},{provide:$a,useFactory:gk},Ad(mk)])}var Ow={providers:[eg(),sy(Aw),Pw("ngsw-worker.js",{enabled:!DM(),registrationStrategy:"registerWhenStable:30000"})]};var Ip=class n{static \u0275fac=function(t){return new(t||n)};static \u0275cmp=Ri({type:n,selectors:[["app-root"]],decls:1,vars:0,template:function(t,i){t&1&&Wn(0,"router-outlet")},dependencies:[nl],encapsulation:2})};Pv(Ip,Ow).catch(n=>console.error(n));
