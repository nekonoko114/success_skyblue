"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
var swiper = new Swiper(".swiper", _defineProperty(_defineProperty({
  loop: true,
  // ループ有効
  slidesPerView: 5,
  // 一度に表示する枚数
  speed: 6000,
  // ループの時間
  allowTouchMove: false,
  // スワイプ無効
  autoplay: {
    delay: 0 // 途切れなくループ
  }
}, "slidesPerView", 1), "breakpoints", {
  // スライドの表示枚数：500px以上の場合
  500: {
    slidesPerView: 3
  }
}));