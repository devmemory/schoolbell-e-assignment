// 여기에 정답을 작성해주세요
// 1
const target1 = document.getElementById("target-1");

target1.classList.remove("border");

// 2
target1.style.setProperty("left", "250px");

// 3
const target2 = document.getElementsByClassName("target-2")[0];

target2.classList.remove("border");

target2.classList.add("blue");

// 4
target2.style.cssText = "left: 50px; margin-top: -15px;";

// 5
const target3 = document.getElementById("target-3");

const target4 = document.getElementById("target-4");

let opacity = 1;

const time = setInterval(() => {
  target3.style.setProperty("opacity", opacity);
  opacity -= 0.1;

  if (opacity <= 0) {
    target3.style.setProperty("display", "none");
    target4.classList.add("green");

    clearInterval(time)
  }
}, 100);

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
$('#target-3').fadeOut(() => $('#target-4').addClass('green'));
