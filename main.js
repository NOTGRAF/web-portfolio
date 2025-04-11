// Navbar toggle
const burger = document.querySelector('.burger');
const navLinks = document.querySelector('.nav-links');
const navLinksLi = document.querySelectorAll('.nav-links li');

burger.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    burger.classList.toggle('toggle');
});

navLinksLi.forEach(link => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('active');
        burger.classList.remove('toggle');
    });
});

// Smooth scrolling
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        
        window.scrollTo({
            top: targetElement.offsetTop - 80,
            behavior: 'smooth'
        });
    });
});

// Portfolio filtering
const filterBtns = document.querySelectorAll('.filter-btn');
const portfolioItems = document.querySelectorAll('.portfolio-item');

filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        // Remove active class from all buttons
        filterBtns.forEach(btn => btn.classList.remove('active'));
        // Add active class to clicked button
        btn.classList.add('active');
        
        const filter = btn.getAttribute('data-filter');
        
        portfolioItems.forEach(item => {
            if (filter === 'all' || item.getAttribute('data-category') === filter) {
                item.style.display = 'block';
            } else {
                item.style.display = 'none';
            }
        });
    });
});

// Contact form
const messageForm = document.getElementById('messageForm');
if (messageForm) {
    messageForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const message = document.getElementById('message').value;
        
        // Bu yerda formani serverga yuborish logikasi bo'lishi kerak
        console.log({name, email, message});
        
        alert('Xabaringiz yuborildi! Tez orada siz bilan bog\'lanamiz.');
        this.reset();
    });
}

// // Live chat functionality
// const chatBox = document.getElementById('chatBox');
// const chatMessage = document.getElementById('chatMessage');
// const sendChat = document.getElementById('sendChat');

// if (sendChat) {
//     sendChat.addEventListener('click', sendMessage);
//     chatMessage.addEventListener('keypress', function(e) {
//         if (e.key === 'Enter') {
//             sendMessage();
//         }
//     });
// }

// function sendMessage() {
//     const message = chatMessage.value.trim();
//     if (message) {
//         // Bu yerda chat xabarini serverga yuborish logikasi bo'lishi kerak
//         // Vaqtinchalik demo uchun:
//         addMessageToChat('Siz', message, true);
//         chatMessage.value = '';
        
//         // Demo javob
//         setTimeout(() => {
//             addMessageToChat('Admin', 'Xabaringiz uchun rahmat! Tez orada javob beramiz.', false);
//         }, 1000);
//     }
// }



const botToken = '7674599207:AAGHwaxFI2FXXfD0gRqS-SY0JdqdrbsCiCM'; // <-- o'zgartir
const chatId = '6972880244';     // <-- o'zgartir

const sendBtn = document.getElementById('sendChat');
const chatInput = document.getElementById('chatMessage');
const usernameInput = document.getElementById('usernameInput');
const chatBox = document.getElementById('chatBox');

sendBtn.addEventListener('click', () => {
  const username = usernameInput.value.trim() || "Anonim";
  const message = chatInput.value.trim();

  if (message === '') return;

  // 1. Chat oynasiga qo‘shish
  const msgDiv = document.createElement('div');
  msgDiv.textContent = `${username}: ${message}`;
  msgDiv.className = 'user-message';
  chatBox.appendChild(msgDiv);
  chatBox.scrollTop = chatBox.scrollHeight;

  // 2. Telegramga yuborish
  const telegramMessage = `👤 Yangi xabar:\n🧑 Foydalanuvchi telefoni: ${username}\n💬 Xabar: ${message}`;

  fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      chat_id: chatId,
      text: telegramMessage
    })
  })
  .then(response => {
    if (response.ok) {
      console.log("Telegramga yuborildi.");
    } else {
      console.error("Yuborilmadi.");
    }
  })
  .catch(error => console.error('Xatolik:', error));

  // 3. Inputni tozalash
  chatInput.value = '';
});


const phoneInput = document.getElementById('phoneInput');

phoneInput.addEventListener('input', function () {
    this.value = this.value.replace(/\D/g, '').slice(0,9);
});








function addMessageToChat(sender, message, isUser) {
    const messageElement = document.createElement('div');
    messageElement.classList.add('chat-message');
    if (isUser) {
        messageElement.classList.add('user-message');
    } else {
        messageElement.classList.add('admin-message');
    }
    
    messageElement.innerHTML = `
        <strong>${sender}:</strong> ${message}
    `;
    
    chatBox.appendChild(messageElement);
    chatBox.scrollTop = chatBox.scrollHeight;
}

// Sticky navbar on scroll
window.addEventListener('scroll', () => {
    const nav = document.querySelector('nav');
    if (window.scrollY > 50) {
        nav.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
    } else {
        nav.style.boxShadow = 'none';
    }
});

// Animation on scroll
const animateOnScroll = () => {
    const elements = document.querySelectorAll('.skill, .portfolio-item, .contact-info, .contact-form, .live-chat');
    
    elements.forEach(element => {
        const elementPosition = element.getBoundingClientRect().top;
        const screenPosition = window.innerHeight / 1.3;
        
        if (elementPosition < screenPosition) {
            element.style.opacity = '1';
            element.style.transform = 'translateY(0)';
        }
    });
};

// Set initial state for animation
window.addEventListener('load', () => {
    const elements = document.querySelectorAll('.skill, .portfolio-item, .contact-info, .contact-form, .live-chat');
    elements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(20px)';
        element.style.transition = 'all 0.5s ease';
    });
    
    animateOnScroll();
});

window.addEventListener('scroll', animateOnScroll);