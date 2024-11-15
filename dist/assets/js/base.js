"use strict";

// $(function () {
//   /**
//    * header__menu 実装
//    * 背景透過
//    * navメニュー表示
//    */
$(".global").click(function () {
  $(".global span").toggleClass("is-active");
  $(".global__menu > ul").toggleClass("is-active");
  $(".global__bg").toggleClass("is-active");

  // グローバルメニューが開いているかどうかでbodyのスクロールを制御
  if ($(".global__menu > ul").hasClass("is-active")) {
    $("body").addClass("no-scroll");
  } else {
    $("body").removeClass("no-scroll");
  }
});
$(document).ready(function () {
  // スクロールイベントを監視
  $(window).on("scroll", function () {
    $(".service__list").each(function (index) {
      // 要素がスクロールで表示されたら
      if ($(this).offset().top < $(window).scrollTop() + $(window).height()) {
        // アニメーションの遅延を設定
        $(this).css("animation-delay", "".concat(index, "s"));
        // クラスを追加してアニメーションを開始
        $(this).addClass("is-visible");
      }
    });
  });
});
document.addEventListener("DOMContentLoaded", function () {
  // タイピングアニメーション関数
  function typeAnimation(element, callback) {
    var text = element.textContent; // 元のテキストを取得
    element.textContent = ""; // テキストを空にする
    element.style.visibility = "visible"; // 表示を有効化
    element.style.opacity = 1; // 不透明にする

    var i = 0;
    var interval = setInterval(function () {
      if (i < text.length) {
        element.textContent += text.charAt(i); // 1文字ずつ追加
        i++;
      } else {
        clearInterval(interval); // アニメーション終了
        if (callback) callback(); // コールバック関数を実行
      }
    }, 150); // 1文字ごとの間隔
  }

  // Intersection Observerのコールバック関数
  function handleIntersection(entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        var target = entry.target;

        // タイピングアニメーションを実行
        typeAnimation(target);

        // 必要に応じて監視解除（再発火が不要ならコメントアウト）
        observer.unobserve(target);
      }
    });
  }

  // Intersection Observerの設定
  var observer = new IntersectionObserver(handleIntersection, {
    threshold: 0.1 // 10%が表示されたらトリガー
  });

  // .typing-animationクラスの要素を監視対象に追加
  document.querySelectorAll(".typing-animation").forEach(function (element) {
    observer.observe(element);
  });

  // ページ読み込み時の画像とテキストのふんわり表示
  var imgElement = document.querySelector(".fv__img");
  var contentElements = document.querySelectorAll(".fv__content");

  // 画像をフェードイン表示
  setTimeout(function () {
    imgElement.classList.add("is-visible");

    // 画像のフェードイン後にテキストを表示
    setTimeout(function () {
      contentElements.forEach(function (content) {
        content.classList.add("is-visible");
      });
    }, 600); // 画像の表示時間（600ms）後に実行
  }, 300); // サイト読み込み後に少し遅延させて画像を表示
});

//   //navメニューをクリックしたらheader__menuのactiveクラスを解除する処理
//   $('a[href^="#"]').on("click", function () {
//     $(".header__btn").removeClass("active");
//     $(".header__nav").removeClass("active");
//     $(".header__bg").removeClass("active");

//     const href = $(this).attr("href");
//     const target = $(href == "#" || href == "" ? "html" : href);
//     const position = target.offset().top;
//     let speed = 500;
//     $("html , body").animate({ scrollTop: position }, speed, "swing");
//     return false;
//   });

//   //topへ戻るボタン実装
//   const topPage = $(".topPage");
//   topPage.hide();
//   $(window).scroll(function () {
//     if ($(this).scrollTop() > 80) {
//       topPage.fadeIn();
//     } else {
//       topPage.fadeOut();
//     }
//   });
//   topPage.click(function () {
//     $("body , html").animate({ scrollTop: 0 }, 500);
//     return false;
//   });

//   //アコーディオンメニュー実装
//   $(".js-qa").click(function () {
//     $(this).next().slideToggle(200);
//     $(this).find("span").toggleClass("active");
//   });

//   $(window).scroll(function () {
//     let pageHeight = $(document).innerHeight();
//     let windowHeight = $(window).innerHeight();
//     let pageBottom = pageHeight - windowHeight;
//     let ad = $('.ad');
//     ad.hide();
//     if (pageBottom <= $(window).scrollTop()) {
//         ad.fadeOut();
//     } else {
//         ad.fadeIn();
//     }
//   });
// });