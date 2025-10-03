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

  const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("slide-in");
      entry.target.classList.remove("opacity-0");
    }
  });
});

document.querySelectorAll(".slide-target").forEach((el) => observer.observe(el));


function typeEffect(element, parts, speed) {
  let i = 0;
  let j = 0;
  let current = "";
  let timer = setInterval(() => {
    const text = parts[i].text;
    const isSpan = parts[i].span;

    current = text.substring(0, j);

    if (isSpan) {
      element.html(
        parts.slice(0, i).map(p => p.span ? `<span class="${p.span}">${p.text}</span>` : p.text).join("") +
        `<span class="${parts[i].span}">${current}</span>` +
        '<span class="cursor">|</span>'
      );
    } else {
      element.html(
        parts.slice(0, i).map(p => p.span ? `<span class="${p.span}">${p.text}</span>` : p.text).join("") +
        current +
        '<span class="cursor">|</span>'
      );
    }

    j++;
    if (j > text.length) {
      j = 0;
      i++;
      if (i >= parts.length) {
        clearInterval(timer);
        // Final render without cursor
        element.html(
          parts.map(p => p.span ? `<span class="${p.span}">${p.text}</span>` : p.text).join("")
        );
      }
    }
  }, speed);
}

$(document).ready(function () {
  const parts = [
    { text: "Transforming Ideas Into Stunning Visual ", span: null },
    { text: "Experiences", span: "text-blue-600" }
  ];

  typeEffect($("#hero-title"), parts, 60);
});


$(function () {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        $(entry.target).addClass("show");
        observer.unobserve(entry.target); // run once
      }
    });
  }, { threshold: 0.2 });

  $(".scroll-fade").each(function () {
    observer.observe(this);
  });
});

function typingEffect(element, text, speed) {
  let i = 0;
  let timer = setInterval(() => {
    element.html(text.substring(0, i) + '<span class="cursor">|</span>');
    i++;
    if (i > text.length) {
      clearInterval(timer);
      element.html(text); // final text without cursor
    }
  }, speed);
}

  const aboutText = "Founded in 2022, Quiver is a multidisciplinary design collective focused on product design, branding, and interactive experiences. We create thoughtful, purpose-driven work that resonates with users, builds meaningful connections, and delivers results with clarity, precision, and emotional impact.";

  typingEffect($("#about-text"), aboutText, 100);

  const aboutText2 = "We design digital experiences rooted in emotion and clarity. Our process merges art and logic, ensuring every interaction is intentional. Before code, we uncover purpose. With minimalism as our lens, we craft interfaces that are fast, meaningful, and beautiful—built to elevate brands and resonate deeply with their audiences.";

  typingEffect($("#about-text2"), aboutText2, 100);


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
