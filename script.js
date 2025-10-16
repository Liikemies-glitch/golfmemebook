// Golf memes data - Oikeat Reddit-meemit!
const golfMemes = [
    {
        image: "images/meme1.webp",
        title: "Golf-totuus #1",
        caption: "Kun aamuharjoituksissa lyöt täydellisesti, mutta itse pelissä..."
    },
    {
        image: "images/meme2.webp",
        title: "Golf-totuus #2",
        caption: "Odotukset vs. Todellisuus kentällä"
    },
    {
        image: "images/meme3.webp",
        title: "Golf-totuus #3",
        caption: "Kun kaveri sanoo 'se oli lähellä'"
    },
    {
        image: "images/meme4.webp",
        title: "Golf-totuus #4",
        caption: "Minun golf-swing päässäni vs. todellisuudessa"
    },
    {
        image: "images/meme5.webp",
        title: "Golf-totuus #5",
        caption: "Kun löydät kadonneen pallosi... 3 reikää myöhemmin"
    },
    {
        image: "images/meme6.webp",
        title: "Golf-totuus #6",
        caption: "Golf-logiikka parhaimmillaan"
    },
    {
        image: "images/meme7.webp",
        title: "Golf-totuus #7",
        caption: "Jokainen golf-kierros ever"
    },
    {
        image: "images/meme8.webp",
        title: "Golf-totuus #8",
        caption: "Kun sanot 'viimeinen kierros tänä vuonna'"
    },
    {
        image: "images/meme9.webp",
        title: "Golf-totuus #9",
        caption: "Golf-matemaattinen yhtälö"
    },
    {
        image: "images/meme10.webp",
        title: "Golf-totuus #10",
        caption: "Kun teet hole-in-one... harjoituskentällä"
    },
    {
        image: "images/meme11.webp",
        title: "Golf-totuus #11",
        caption: "Golf-neuvot vs. Golf-todellisuus"
    },
    {
        image: "images/meme12.webp",
        title: "Golf-totuus #12",
        caption: "Kun bunkkeri on magneettinen"
    },
    {
        image: "images/meme13.webp",
        title: "Golf-totuus #13",
        caption: "Jokaisen golfarin elämäntarina"
    },
    {
        image: "images/meme14.webp",
        title: "Golf-totuus #14",
        caption: "Kun ostat uudet mailat parantaaksesi peliä..."
    },
    {
        image: "images/meme15.webp",
        title: "Golf-totuus #15",
        caption: "Golf-sanasto: 'Mulligan' käännetty suomeksi"
    },
    {
        image: "images/meme16.webp",
        title: "Golf-totuus #16",
        caption: "Kun näytät kaverille 'miten se tehdään'"
    },
    {
        image: "images/meme17.webp",
        title: "Golf-totuus #17",
        caption: "Par 3 -reikä: Challenge accepted!"
    },
    {
        image: "images/meme18.webp",
        title: "Golf-totuus #18",
        caption: "Viimeinen reikä. Kaikki tai ei mitään."
    }
];

// Load memes on page load
document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM loaded, initializing...');
    
    // Test if elements exist
    const memeGrid = document.getElementById('memeGrid');
    const ctaButton = document.getElementById('ctaButton');
    const contactModal = document.getElementById('contactModal');
    
    console.log('Elements found:', { memeGrid, ctaButton, contactModal });
    
    if (memeGrid) {
        loadMemes();
    } else {
        console.error('memeGrid not found!');
    }
    
    if (ctaButton && contactModal) {
        setupModal();
    } else {
        console.error('Modal elements not found!');
    }
    
    setupImageModal();
});

function loadMemes() {
    const memeGrid = document.getElementById('memeGrid');
    
    console.log('Loading memes...', golfMemes.length);
    
    golfMemes.forEach((meme, index) => {
        const memeCard = document.createElement('div');
        memeCard.className = 'meme-card';
        memeCard.innerHTML = `
            <img src="${meme.image}" alt="${meme.title}" class="meme-image" onclick="openImageModal('${meme.image}', '${meme.title}', '${meme.caption}')" onerror="this.src='images/placeholder.jpg'">
            <div class="meme-title">${meme.title}</div>
            <div class="meme-caption">${meme.caption}</div>
            <button class="share-button" onclick="shareMeme(${index})">
                📤 Jaa Slackiin
            </button>
        `;
        memeGrid.appendChild(memeCard);
    });
    
    console.log('Memes loaded!');
}

async function shareMeme(index) {
    const meme = golfMemes[index];
    
    console.log('Starting shareMeme for index:', index);
    console.log('Image URL:', meme.image);
    console.log('navigator.clipboard:', navigator.clipboard);
    console.log('window.ClipboardItem:', window.ClipboardItem);
    
    try {
        // Try to copy image to clipboard first
        if (navigator.clipboard && window.ClipboardItem) {
            console.log('Clipboard API available, fetching image...');
            
            // Try to fetch the image
            let response;
            try {
                response = await fetch(meme.image);
                console.log('Fetch response:', response);
            } catch (fetchError) {
                console.error('Fetch failed (CORS issue):', fetchError);
                throw new Error('Cannot fetch image due to CORS restrictions. Use HTTP server instead of file://');
            }
            
            const blob = await response.blob();
            console.log('Blob created:', blob, 'Type:', blob.type);
            
            const clipboardItem = new ClipboardItem({
                [blob.type]: blob
            });
            console.log('ClipboardItem created:', clipboardItem);
            
            await navigator.clipboard.write([clipboardItem]);
            console.log('Clipboard write successful!');
            showNotification('✅ Meemikuva kopioitu leikepöydälle! Voit nyt liittää sen Slackiin.');
            return;
        } else {
            console.log('Clipboard API not available');
            console.log('navigator.clipboard:', navigator.clipboard);
            console.log('window.ClipboardItem:', window.ClipboardItem);
        }
    } catch (error) {
        console.error('Clipboard API failed:', error);
        console.log('Error details:', error.message, error.stack);
    }
    
    // Fallback: Create a temporary link to download the image
    try {
        console.log('Using fallback method...');
        const link = document.createElement('a');
        link.href = meme.image;
        link.download = `golf-meme-${index + 1}.webp`;
        link.target = '_blank';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        
        showNotification('📥 Meemikuva avattu uudessa välilehdessä! Voit nyt tallentaa sen (oikea klikki → "Tallenna kuva nimellä") ja liittää Slackiin.');
    } catch (error) {
        console.error('Error with fallback:', error);
        showNotification('❌ Virhe kuvan avaamisessa. Kokeile klikata meemikuvasta suoraan.');
    }
}

function showNotification(message) {
    // Create temporary notification
    const notification = document.createElement('div');
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: #4CAF50;
        color: white;
        padding: 15px 25px;
        border-radius: 10px;
        box-shadow: 0 5px 15px rgba(0,0,0,0.3);
        z-index: 2000;
        animation: slideIn 0.3s ease;
    `;
    notification.textContent = message;
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

function setupModal() {
    const modal = document.getElementById('contactModal');
    const ctaButton = document.getElementById('ctaButton');
    const closeBtn = document.getElementById('closeBtn');
    
    console.log('Setting up modal...', { modal, ctaButton, closeBtn });
    
    if (ctaButton) {
        console.log('Adding click listener to CTA button...');
        ctaButton.addEventListener('click', (e) => {
            e.preventDefault();
            console.log('CTA button clicked!');
            modal.classList.add('active');
            document.body.style.overflow = 'hidden';
        });
        
        // Also try onclick as backup
        ctaButton.onclick = function(e) {
            e.preventDefault();
            console.log('CTA button onclick triggered!');
            modal.classList.add('active');
            document.body.style.overflow = 'hidden';
        };
    } else {
        console.error('CTA button not found!');
    }
    
    if (closeBtn) {
        closeBtn.addEventListener('click', () => {
            modal.classList.remove('active');
            document.body.style.overflow = 'auto';
        });
    }
    
    // Close on outside click
    if (modal) {
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.classList.remove('active');
                document.body.style.overflow = 'auto';
            }
        });
    }
    
    // Close on Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal && modal.classList.contains('active')) {
            modal.classList.remove('active');
            document.body.style.overflow = 'auto';
        }
    });
}

// Add CSS animations for notifications
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from {
            transform: translateX(400px);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOut {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(400px);
            opacity: 0;
        }
    }
`;
    document.head.appendChild(style);

// Image Modal Functions
function openImageModal(imageSrc, title, caption) {
    const modal = document.getElementById('imageModal');
    const modalImage = document.getElementById('modalImage');
    const modalTitle = document.getElementById('modalTitle');
    const modalCaption = document.getElementById('modalCaption');
    
    modalImage.src = imageSrc;
    modalTitle.textContent = title;
    modalCaption.textContent = caption;
    
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeImageModal() {
    const modal = document.getElementById('imageModal');
    modal.classList.remove('active');
    document.body.style.overflow = 'auto';
}

function setupImageModal() {
    const modal = document.getElementById('imageModal');
    const closeBtn = document.getElementById('closeImageBtn');
    
    closeBtn.addEventListener('click', closeImageModal);
    
    // Close on outside click
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            closeImageModal();
        }
    });
    
    // Close on Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal.classList.contains('active')) {
            closeImageModal();
        }
    });
}
