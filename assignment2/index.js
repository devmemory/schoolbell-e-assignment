// 여기에 정답을 작성해주세요
function $(selector) {
  const element = document.querySelector(selector);

  function removeClass(name) {
    element.classList.remove(name);

    return this;
  }

  function css(arg1, arg2) {
    if (arg2 === undefined) {
      element.style.cssText = JSON.stringify(arg1).replaceAll(",", ";");
    } else {
      element.style.setProperty(arg1, arg2);
    }
  }

  function addClass(name) {
    element.classList.add(name);
  }

  function fadeOut(callback) {
    let opacity = 1;

    const time = setInterval(() => {
      element.style.setProperty("opacity", opacity);
      opacity -= 0.1;

      if (opacity <= 0) {
        element.style.setProperty("display", "none");
        callback();

        clearInterval(time);
      }
    }, 100);
  }

  return { removeClass, css, addClass, fadeOut };
}

// 아래 코드는 수정하지 않습니다

// 1
$("#target-1").removeClass("border");

// 2
$("#target-1").css("left", "250px");

// 3
$(".target-2").removeClass("border").addClass("blue");

// 4
$(".target-2").css({ left: 50, "margin-top": "-15px" });

// 5
$("#target-3").fadeOut(() => $("#target-4").addClass("green"));
