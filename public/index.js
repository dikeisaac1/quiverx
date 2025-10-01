console.log("jQuery version:", $.fn.jquery);

$(document).ready(function () {
  $(".filter-btn").on("click", function () {
    $(".filter-btn").removeClass("active bg-primary");
    $(this).addClass("active bg-primary");

    const selected = $(this).data("filter");
    $(".portfolio-div").addClass("hide-card");

    $(`[data-category="${selected}"]`)
      .removeClass("hide-card")
      .addClass("slide-in-Up");
  });

  function animateSkill($skill) {
    const $number = $skill.find(".number");
    const $bar = $skill.find(".progress");
    const target = parseInt($number.data("target"));

    $number.html("0%");
    $bar.css("width", "0%");

    let counter = 0;
    const interval = setInterval(() => {
      if (counter >= target) {
        clearInterval(interval);
      } else {
        counter++;
        $number.html(`${counter}%`);
        $bar.css("width", counter + "%");
      }
    }, 20);
  }

  const barObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          animateSkill($(entry.target));
          barObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.3 }
  );

  $(".skill-grid").each(function () {
    barObserver.observe(this);
  });

  const wrapper = document.querySelector(".w-full.grid");
  if (wrapper) {
    barObserver.observe(wrapper);
  }

  const email = "quivercreatives@gmail.com";
  $("#copy-email-btn").on("click", function () {
    navigator.clipboard
      .writeText(email)
      .then(() => alert("Email copied to clipboard!"))
      .catch((err) => console.error("Failed to copy email: ", err));
  });

  $(".get-in-touch-btn").on("click", function () {
    const subject = "Hello";
    const body = "I'd like to connect with you.";
    const mailtoLink = `mailto:${email}?subject=${encodeURIComponent(
      subject
    )}&body=${encodeURIComponent(body)}`;
    const gmailWebLink = `https://mail.google.com/mail/?view=cm&fs=1&to=${email}&su=${encodeURIComponent(
      subject
    )}&body=${encodeURIComponent(body)}`;

    const isMobile = /Android|iPhone|iPad|iPod/i.test(navigator.userAgent);
    window.location.href = isMobile ? mailtoLink : gmailWebLink;
  });

  $("#subscribe-form").on("submit", function (e) {
    e.preventDefault();

    const email = $("#subscriber-email").val().trim();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const errorMsg = $("#subscribe-error");

    // Reset error
    errorMsg.addClass("hidden").text("");

    // Custom validation
    if (!email) {
      errorMsg.removeClass("hidden").text("Email is required.");
      return;
    } else if (!emailRegex.test(email)) {
      errorMsg
        .removeClass("hidden")
        .text("Please enter a valid email address.");
      return;
    }

    // If valid, send to FormSubmit
    $.ajax({
      url: "https://formsubmit.co/ajax/quivercreatives@gmail.com",
      method: "POST",
      data: { email },
      dataType: "json",
      success: function () {
        alert("✅ Subscription successful!");
        $("#subscribe-form")[0].reset();
      },
      error: function () {
        alert("❌ Something went wrong. Please try again.");
      },
    });
  });
});
