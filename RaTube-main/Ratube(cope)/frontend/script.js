document.addEventListener('DOMContentLoaded', () => {

  // Sidebar
  const menuIcon = document.querySelector(".menu-icon");
  const sidebar = document.querySelector(".sidebar");
  const container = document.querySelector(".container");

  if ( menuIcon ) {
    menuIcon.onclick = function(){
        sidebar.classList.toggle("small-sidebar");
        container.classList.toggle("large-container");

    }
  }

  // Like / dislike buttons
  document.querySelectorAll(".like-action").forEach((action) => {
    action.addEventListener("click", (e) => {
      e.preventDefault();
  
      // IF button is active, deactivate it
      if (action.classList.contains("active")) {
        action.classList.remove("active");
        updateCount(action, -1);
        return;
      }
  
      // If button is not active, activate it
      action.classList.add("active");
      updateCount(action, 1);
  
      // Check if other buttons are active, deactivate
      document.querySelectorAll(".like-action").forEach((otherAction) => {
        if (otherAction !== action && otherAction.classList.contains("active")) {
          otherAction.classList.remove("active");
          updateCount(otherAction, -1);
        }
      });
    });
  });
  
  // Function to update the count of likes/dislikes
  function updateCount(action, value) {
    const countElement = action.querySelector(".count");
    if (countElement) {
      const currentCount = parseInt(countElement.textContent, 10) || 0;
      countElement.textContent = currentCount + value;
    }
  }

  // Add a new comment
  const addCommentButton = document.querySelector(".add-comment .row .comment-send");
  if ( addCommentButton ) {
    addCommentButton.addEventListener("click", (e) => {
      e.preventDefault();
      const commentInput = document.querySelector(".add-comment .comment-text");
      const comment = commentInput.value;
      if ( '' !== comment ) {
        addComment(comment);
        commentInput.value = "";

        const countComments  = document.querySelector(".count-comments .count");
        if ( countComments ) {
          const successModal = document.getElementById("success");
          if ( successModal ) {
            successModal.classList.add("active");
          }
          const currentCount = parseInt(countComments.textContent, 10) || 0;
          countComments.textContent = currentCount + 1;
        }
      } else {
          const errorModal = document.getElementById("failed");
          if ( errorModal ) {
            errorModal.classList.add("active");
          }
        }
    });
  }

  // Close the modal
  document.querySelectorAll(".modal .close").forEach((closeButton) => {
    closeButton.addEventListener("click", () => {
      closeButton.parentElement.parentElement.classList.remove("active");
    });
  });

  // Close the modal on clicking outside of it
  document.querySelectorAll(".modal .overlay").forEach((overlayItem) => {
    overlayItem.addEventListener("click", () => {
      overlayItem.parentElement.classList.remove("active");
    });
  });

  // Function to add a new comment
  function addComment(comment) {
    const commentsList = document.querySelector(".comment-list");
    const commentElement = document.createElement("div");
    commentElement.classList.add("comment-item");
    commentElement.innerHTML = `
          <div class="comment-header">
              <img src="images/Jack.png">
              <div class="author">
                  <p class="name">Jack Jackson</p>
                  <p>just now</p>
              </div>
          </div>
          <div class="comment-body">
              <p>${comment}</p>
          </div>
    `;
    commentsList.appendChild(commentElement);
  }

  //Modal share button
  const openShareModal = document.querySelector(".share");
  if ( openShareModal ) {
    openShareModal.onclick = function(){
      const shareModal = document.getElementById("share-modal");
      if ( shareModal ) {
        shareModal.classList.add("active");
      }
    }
  }

  //serch modal content
  const searchField = document.querySelector(".search-field");
  const suggestionsList = document.querySelector(".suggestions");
  //Data to search
  const data = [
    { name: 'Beautiful beach', url: 'play-video.html' },
    { name: 'USA forever', url: 'play-video2.html' },
    { name: 'Top 5 countries', url: 'play-video3.html' },
    { name: 'The biggest mountain in Georgia', url: 'play-video4.html' },
    { name: 'My team', url: 'play-video5.html' },
    { name: 'Andrey Pushkar vs Denis Cyplenkov', url: 'play-video6.html' },
    { name: 'Assassin*s Creed 2 OST  Jesper Kyd  Ezio*s Family (Track 03)', url: 'play-video7.html' },
    { name: 'John Williams - Duel of the Fates (Star Wars Soundtrack)', url: 'play-video8.html' },
    { name: 'WAKE UP!!!', url: 'play-video9.html' },
    { name: 'Pain is pleasure', url: 'play-video10.html' },
  ];
  function showSuggestions(query) {
    const filteredData = data.filter(item =>
        item.name.toLowerCase().includes(query.toLowerCase())
    );

    // Очищаємо попередні підказки
    suggestionsList.innerHTML = '';

    // Якщо є співпадіння, додаємо їх до списку
    if (filteredData.length > 0) {
        filteredData.forEach(item => {
            const listItem = document.createElement('li');
            listItem.textContent = item.name;
            listItem.dataset.url = item.url;
            suggestionsList.appendChild(listItem);
        });
    } else {
        const noResult = document.createElement('li');
        noResult.textContent = 'No results found';
        noResult.style.color = '#999';
        suggestionsList.appendChild(noResult);
    }
  }

  // Обробка введення в поле
  searchField.addEventListener('input', () => {
    const query = searchField.value.trim();
    if (query.length > 0) {
        showSuggestions(query);
        suggestionsList.classList.add('active');
    } else {
        suggestionsList.innerHTML = '';
        suggestionsList.classList.remove('active');
    }
  });

  // Обробка кліку на підказку
  suggestionsList.addEventListener('click', (event) => {
    if (event.target.tagName === 'LI' && event.target.dataset.url) {
        const url = event.target.dataset.url;
        window.location.href = url; // Редірект на вибрану сторінку
    }
  });

  // Закриваємо підказки при кліку поза пошуковим полем
  document.addEventListener('click', (event) => {
    if (!event.target.closest('.search-container')) {
        suggestionsList.innerHTML = '';
        suggestionsList.classList.remove('active');
    }
  });


  const textInput = document.getElementById('textToCopy');
  if (textInput) {
    textInput.addEventListener('focus', () => {
      textInput.select();
    });

    const copyButton = document.getElementById('copyButton');
    
    copyButton.addEventListener('click', function() {
      textInput.select(); // Виділяємо текст
      textInput.setSelectionRange(0, 99999); // Для мобільних пристроїв

      // Копіюємо текст у буфер обміну
      navigator.clipboard.writeText(textInput.value)
          .then(() => {
            copyButton.classList.add('copied');
            copyButton.textContent = 'Copied!';

            setTimeout(() => {
              copyButton.classList.remove('copied');
              copyButton.textContent = 'Copy';
            }, 2000);
          })
          .catch(err => {
              console.error('Помилка копіювання: ', err);
          });
    });
  }
  // Підписка на подію кліку на кнопку
  const subscribeBtn = document.getElementById("subscribe-btn");

  subscribeBtn.addEventListener("click", () => {
      if (subscribeBtn.classList.contains("active")) {
          subscribeBtn.classList.remove("active");
          subscribeBtn.textContent = "Subscribe";
          updateCount(-1);
      } else {
          subscribeBtn.classList.add("active");
          subscribeBtn.textContent = "Unsubscribe";
          updateCount(1);
      }
      
      
      // Function to update the count of likes/dislikes
      function updateCount(value) {
        const countElement = document.querySelector(".plublisher .num");
        if (countElement) {
          const currentCount = parseInt(countElement.textContent, 10) || 0;
          countElement.textContent = currentCount + value;
        }
      }
  });
});
