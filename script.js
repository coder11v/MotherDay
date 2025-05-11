
// Love messages array
const loveMessages = [
    "Your smile brightens our day 💝",
    "You give the warmest hugs in the world 🤗",
    "Your love makes everything better ❤️",
    "You're the heart of our family 🏠",
    "Your strength inspires us every day 💪",
    "Thank you for always being there 🌟"
];

// Initialize love messages carousel
let currentMessageIndex = 0;
const loveMessageElement = document.getElementById('loveMessage');

function showNextMessage() {
    loveMessageElement.style.opacity = '0';
    setTimeout(() => {
        currentMessageIndex = (currentMessageIndex + 1) % loveMessages.length;
        loveMessageElement.textContent = loveMessages[currentMessageIndex];
        loveMessageElement.style.opacity = '1';
    }, 500);
}

// Start the carousel
loveMessageElement.textContent = loveMessages[0];
setInterval(showNextMessage, 3000);

// Virtual hugs counter
let hugCount = 0;
function sendVirtualHug() {
    hugCount++;
    document.getElementById('hugCount').textContent = hugCount;
    createConfetti();
}

// Reward claiming function
function claimReward(button) {
    if (!button.classList.contains('claimed')) {
        button.classList.add('claimed');
        button.style.backgroundColor = '#e2e8f0';
        button.innerHTML += '<div class="absolute top-0 right-0 bg-green-500 text-white px-2 py-1 rounded-bl-lg text-sm">CLAIMED!</div>';
        button.disabled = true;
        createConfetti();
    }
}

// Share functionality
function generateLink() {
    const fromName = document.getElementById('fromName').value || 'Someone';
    const toName = document.getElementById('toName').value || 'Mama';
    const includeRickroll = document.getElementById('includeRickroll').checked;
    const baseUrl = window.location.origin + window.location.pathname;
    let shareUrl = `${baseUrl}?from=${encodeURIComponent(fromName)}&name=${encodeURIComponent(toName)}`;

    if (includeRickroll) {
        shareUrl += '&rickroll=true';
    }

    document.getElementById('shareLink').value = shareUrl;
    document.getElementById('shareSection').classList.remove('hidden');
}

function copyLink() {
    const shareLink = document.getElementById('shareLink');
    shareLink.select();
    document.execCommand('copy');
    alert('Link copied to clipboard!');
}

function shareWhatsApp() {
    const shareLink = document.getElementById('shareLink').value;
    const whatsappUrl = `https://wa.me/?text=${encodeURIComponent('Check out this Mother's Day card I made for you! 💝

' + shareLink)}`;
    window.open(whatsappUrl, '_blank');
}

function shareEmail() {
    const shareLink = document.getElementById('shareLink').value;
    const subject = "A Special Mother's Day Card for You! 💝";
    const body = `I made this special Mother's Day card just for you!

${shareLink}`;
    window.location.href = `mailto:?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}

// Share modal functions
function openShareModal() {
    // The code updates the default name logic, hides the rewards section if the link is shared, and removes background music.
    document.getElementById('shareModal').style.display = 'flex';
}

function closeShareModal() {
    document.getElementById('shareModal').style.display = 'none';
}

// Get parameters from query string
const urlParams = new URLSearchParams(window.location.search);
const name = urlParams.get('name') || 'Mama';
const isShared = urlParams.toString().length > 0;
const fromName = isShared ? (urlParams.get('from') || 'Someone') : 'VB&J';

// Update all instances of 'Mama' with the recipient's name
document.body.innerHTML = document.body.innerHTML.replace(/Mama/g, name);

// Hide rewards section if link is shared
if (isShared) {
    const rewardsSection = document.querySelector('.reward-btn')?.closest('.mt-8');
    if (rewardsSection) {
        rewardsSection.style.display = 'none';
    }
}

// Make the 'from' name bigger
const signatureFrom = document.getElementById('signatureFrom');
signatureFrom.style.fontSize = '1.25rem';
signatureFrom.style.fontWeight = 'bold';
signatureFrom.style.color = '#db2777';
signatureFrom.textContent = isShared ? ('from ' + fromName + ' with love') : 'Veer and Jiya';

// Rickroll logic
const rickroll = urlParams.get('rickroll') === 'true';
if (rickroll) {
    const modal = document.getElementById('rickroll-modal');
    modal.style.display = 'flex';
    const video = document.getElementById('rickroll-video');
    video.play();
    const closeBtn = document.querySelector('.close-btn');
    closeBtn.style.display = 'none';

    fetch('./data.json')
        .then(response => response.json())
        .then(data => {
            if (data.customMessage) {
                document.getElementById('customMessageDisplay').textContent = data.customMessage;
            }
        })
        .catch(error => console.error('Error loading message:', error));
}

// Confetti
function createConfetti() {
    const colors = ['#db2777', '#ec4899', '#f472b6', '#f9a8d4', '#fbcfe8'];
    const container = document.getElementById('confetti-container');
    container.innerHTML = '';

    for (let i = 0; i < 50; i++) {
        const confetti = document.createElement('div');
        confetti.className = 'confetti';
        confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
        confetti.style.left = Math.random() * 100 + 'vw';
        confetti.style.animationDelay = Math.random() * 3 + 's';
        confetti.style.width = Math.random() * 10 + 5 + 'px';
        confetti.style.height = Math.random() * 10 + 5 + 'px';
        container.appendChild(confetti);

        setTimeout(() => {
            if (confetti.parentNode === container) {
                container.removeChild(confetti);
            }
        }, 3000);
    }
}

// Redeem button
document.getElementById('redeem-btn')?.addEventListener('click', function () {
    createConfetti();
    this.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" /></svg>Redeemed!';
    this.classList.remove('bg-pink-600', 'hover:bg-pink-700');
    this.classList.add('bg-green-600', 'hover:bg-green-700');
});

// Rickroll modal open
const modal = document.getElementById('rickroll-modal');
const surpriseBtn = document.getElementById('surprise-btn');
const closeBtn = document.querySelector('.close-btn');

surpriseBtn?.addEventListener('click', function () {
    modal.style.display = 'flex';
    const video = document.getElementById('rickroll-video');
    video.play();
    closeBtn.style.display = 'none';

    fetch('./data.json')
        .then(response => response.json())
        .then(data => {
            if (data.customMessage) {
                document.getElementById('customMessageDisplay').textContent = data.customMessage;
            }
        })
        .catch(error => console.error('Error loading message:', error));
});

window.addEventListener('click', function (event) {
    if (event.target == modal) {
        // Optional: stop video or reload
    }
});
