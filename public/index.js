$(document).ready(function () {
  // Filtering section
  $('.filter-btn').on('click', function () {
    $('.filter-btn').removeClass('active bg-primary');
    $(this).addClass('active bg-primary');

    var selected = $(this).data('filter');
    $('.portfolio-div').addClass('hide-card');

    $('[data-category="' + selected + '"]')
      .removeClass('hide-card')
      .addClass('slide-in-Up');
  });

function animateSkillCircles() {
  $('.skill-grid').each(function () {
    const $skill = $(this);
    const $number = $skill.find('.number');
    const $circle = $skill.find('.progress-circle');

    const target = parseInt($number.data('target'));
    const radius = 24;
    const circumference = 2 * Math.PI * radius;

    $circle.css({
      'stroke-dasharray': circumference,
      'stroke-dashoffset': circumference 
    });

    $number.html('0%');

    let counter = 0;
    const interval = setInterval(() => {
      if (counter >= target) {
        clearInterval(interval);
      } else {
        counter++;
        $number.html(`${counter}%`);
        const offset = circumference - (counter / 100) * circumference;
        $circle.css('stroke-dashoffset', offset);
      }
    }, 20);
  });
}


let lastTriggered = 0;
function animateSkillCirclesThrottled() {
  const now = Date.now();
  if (now - lastTriggered > 20000) {
    lastTriggered = now;
    animateSkillCircles();
  }
}

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      animateSkillCirclesThrottled();
    }
  });
}, {
  threshold: 0.5
});

observer.observe(document.querySelector('#skills'));

const email = "dikeisaac2020@gmail.com";

  $('#copy-email-btn').on('click', function() {
    navigator.clipboard.writeText(email).then(() => {
      alert("Email copied to clipboard!");
    }).catch(err => {
      console.error("Failed to copy email: ", err);
    });
  });

$('.get-in-touch-btn').on('click', function () {
  const email = "dikeisaac2020@gmail.com";
  const subject = "Hello";
  const body = "I'd like to connect with you.";

  const mailtoLink = `mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  const gmailWebLink = `https://mail.google.com/mail/?view=cm&fs=1&to=${email}&su=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

  // Simple device check
  const isMobile = /Android|iPhone|iPad|iPod/i.test(navigator.userAgent);

  if (isMobile) {
    window.location.href = mailtoLink;
  } else {
    window.open(gmailWebLink, '_blank');
  }
});


$('#contact-form').on('submit', function (e) {
  e.preventDefault();

  const name = $('input[name="name"]').val().trim();
  const email = $('input[name="email"]').val().trim();
  const message = $('textarea[name="message"]').val().trim();
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  let isValid = true;

  $('.name-auth, .email-auth, .message-auth').hide();

  if (!name) {
    $('.name-auth').show();
    isValid = false;
  }

  if (!email) {
    $('.email-auth').show().text("Email is required");
    isValid = false;
  } else if (!emailRegex.test(email)) {
    $('.email-auth').show().text("Please enter a valid email.");
    isValid = false;
  }

  if (!message) {
    $('.message-auth').show();
    isValid = false;
  }

  if (!isValid) return;

  $.ajax({
    url: "https://formsubmit.co/ajax/dikeisaac2020@gmail.com",
    method: "POST",
    data: { name, email, message },
    dataType: "json",
    success: function () {
      alert("✅ Message sent successfully!");
      $('#contact-form')[0].reset();
    },
    error: function () {
      alert("❌ Something went wrong. Please try again.");
    }
  });
});
});
