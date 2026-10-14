const menuData = [
  { id: 1, name: 'Kopi Susu Gula Aren', category: 'Coffee', price: 18000, img: 'https://i.pinimg.com/736x/f0/49/5b/f0495b2d4ee979ac4068f4c61a57397b.jpg', description: 'Perpaduan espresso, susu creamy, dan manis legit gula aren.' },
  { id: 2, name: 'Americano', category: 'Coffee', price: 15000, img: 'https://images.unsplash.com/photo-1551030173-122aabc4489c?q=80&w=687&auto=format&fit=crop', description: 'Kopi hitam dengan rasa bold dan aroma espresso yang khas.' },
  { id: 3, name: 'Cafe Latte', category: 'Coffee', price: 22000, img: 'https://images.unsplash.com/photo-1502462041640-b3d7e50d0662?q=80&w=1171&auto=format&fit=crop', description: 'Espresso lembut berpadu dengan susu steamed yang creamy.' },
  { id: 4, name: 'Caramel Macchiato', category: 'Coffee', price: 25000, img: 'https://i.pinimg.com/736x/c3/0e/0e/c30e0ecc2b17ff4fa571f5963c70519b.jpg', description: 'Minuman kopi susu dengan sentuhan manis saus karamel.' },
  { id: 5, name: 'Matcha Latte', category: 'Non-Coffee', price: 22000, img: 'https://plus.unsplash.com/premium_photo-1695151556198-6b21eae6215d?q=80&w=783', description: 'Matcha dengan rasa khas yang berpadu dengan susu lembut.' },
  { id: 6, name: 'Taro Latte', category: 'Non-Coffee', price: 20000, img: 'https://i.pinimg.com/736x/ac/a2/0d/aca20d8451b60b70937f98d1c27e4e5f.jpg', description: 'Minuman taro creamy dengan rasa manis yang menenangkan.' },
  { id: 7, name: 'Red Velvet Latte', category: 'Non-Coffee', price: 22000, img: 'https://i.pinimg.com/736x/1c/b0/45/1cb0450d33404c6383a1d44003d42e77.jpg', description: 'Latte red velvet lembut dengan cita rasa manis yang unik.' },
  { id: 8, name: 'Lychee Tea', category: 'Non-Coffee', price: 18000, img: 'https://i.pinimg.com/736x/2c/58/8b/2c588b17c03c59becba4cc8baf7d0ba9.jpg', description: 'Teh segar dengan aroma dan rasa manis buah leci.' },
  { id: 9, name: 'French Fries', category: 'Snack', price: 15000, img: 'https://plus.unsplash.com/premium_photo-1683121324474-83460636b0ed?q=80&w=687', description: 'Kentang goreng renyah yang cocok menemani waktu santai.' },
  { id: 10, name: 'Roti Bakar Coklat', category: 'Snack', price: 16000, img: 'https://i.pinimg.com/1200x/35/57/e2/3557e272e25b7180fd1e20ba4da79c8e.jpg', description: 'Roti bakar hangat dengan isian cokelat manis yang lumer.' },
  { id: 11, name: 'Pisang Goreng Keju', category: 'Snack', price: 15000, img: 'https://i.pinimg.com/1200x/2b/59/b6/2b59b672b0e83a51ea27e78e6cf2649b.jpg', description: 'Pisang goreng renyah dengan taburan keju gurih.' },
  { id: 12, name: 'Dimsum Ayam', category: 'Snack', price: 18000, img: 'https://images.unsplash.com/photo-1604632910793-c0601f361b34?q=80&w=687', description: 'Dimsum ayam lembut dengan isian gurih di setiap gigitan.' }
];

let currentCategory = 'All';
let cart = JSON.parse(localStorage.getItem('kopi_cart')) || {};

function saveCart() {
  localStorage.setItem('kopi_cart', JSON.stringify(cart));
}

function filterCategory(category) {
  currentCategory = category;
  ['All', 'Coffee', 'Non-Coffee', 'Snack'].forEach(cat => {
    const btn = document.getElementById(`btn-${cat}`);
    if (btn) {
      if (cat === category) {
        btn.className = "px-5 py-2 rounded-full font-semibold text-sm bg-[#765640] text-white transition shadow-sm";
      } else {
        btn.className = "px-5 py-2 rounded-full font-semibold text-sm bg-white text-[#765640] border border-[#E9DDCD] hover:bg-[#E9DDCD] transition shadow-sm";
      }
    }
  });
  renderMenuIndex();
}

function renderMenuIndex(filter = '') {
  const container = document.getElementById('menu-container-index');
  if (!container) return;
  
  container.innerHTML = '';
  
  const filteredItems = menuData.filter(item => {
    const matchCategory = currentCategory === 'All' || item.category === currentCategory;
    const matchSearch = item.name.toLowerCase().includes(filter.toLowerCase()) || 
                        item.description.toLowerCase().includes(filter.toLowerCase());
    return matchCategory && matchSearch;
  });

  if (filteredItems.length === 0) {
    container.innerHTML = `<p class="col-span-full text-center text-gray-500 py-8">Menu tidak ditemukan.</p>`;
    return;
  }

  filteredItems.forEach(item => {
    container.innerHTML += `
      <div class="bg-white rounded-2xl p-4 shadow-sm border border-[#E9DDCD] flex flex-col h-full hover-scale">
        <img src="${item.img}" alt="${item.name}" class="w-full h-48 object-cover rounded-xl mb-4" loading="lazy" />
        <div class="flex-grow">
          <span class="text-xs font-bold text-[#765640] bg-[#F8F1E7] px-2.5 py-1 rounded-md uppercase">${item.category}</span>
          <h3 class="font-bold text-[#4A3728] text-lg mt-2 mb-1">${item.name}</h3>
          <p class="text-sm text-[#5F5146] leading-relaxed mb-4">${item.description}</p>
        </div>
        <div class="border-t border-[#E9DDCD] pt-3 flex justify-between items-center mt-auto">
          <span class="text-xs text-[#5F5146] uppercase font-semibold">Harga</span>
          <span class="font-bold text-[#765640] text-lg">Rp ${item.price.toLocaleString('id-ID')}</span>
        </div>
      </div>
    `;
  });
}

function handleSearchIndex() {
  const query = document.getElementById('search-input').value;
  renderMenuIndex(query);
}

function renderMenuPesan() {
  const container = document.getElementById('pesan-menu-container');
  if (!container) return;

  container.innerHTML = '';
  let subtotal = 0;
  let totalCount = 0;

  menuData.forEach(item => {
    const qty = cart[item.id] || 0;
    totalCount += qty;
    subtotal += item.price * qty;

    container.innerHTML += `
      <div class="flex items-center justify-between border-b pb-4 gap-4">
        <div class="flex items-center gap-4">
          <img src="${item.img}" class="w-20 h-20 object-cover rounded-xl" />
          <div>
            <h4 class="font-bold text-[#4A3728] text-lg">${item.name}</h4>
            <p class="text-sm text-[#5F5146]">Rp ${item.price.toLocaleString('id-ID')}</p>
          </div>
        </div>
        <div class="flex items-center gap-3">
          <button onclick="updateCart(${item.id}, -1)" class="w-8 h-8 rounded-full bg-[#F8F1E7] text-[#765640] font-bold border border-[#E9DDCD] hover:bg-[#E9DDCD]">−</button>
          <span class="font-bold text-[#4A3728] w-6 text-center">${qty}</span>
          <button onclick="updateCart(${item.id}, 1)" class="w-8 h-8 rounded-full bg-[#765640] text-white font-bold hover:bg-[#60432F]">+</button>
        </div>
      </div>
    `;
  });

  const countEl = document.getElementById('summary-count');
  const totalEl = document.getElementById('total-price');
  if (countEl) countEl.innerText = `${totalCount} item`;
  if (totalEl) totalEl.innerText = `Rp ${subtotal.toLocaleString('id-ID')}`;
}

function updateCart(itemId, change) {
  cart[itemId] = (cart[itemId] || 0) + change;
  if (cart[itemId] < 0) cart[itemId] = 0;
  saveCart();
  renderMenuPesan();
}

function handleCheckout(e) {
  e.preventDefault();
  const name = document.getElementById('buyer-name').value;
  const note = document.getElementById('buyer-note').value;
  const method = document.getElementById('payment-method').value;
  
  const totalItems = Object.values(cart).reduce((a, b) => a + b, 0);
  if (totalItems === 0) {
    alert('Silakan pilih minimal 1 menu terlebih dahulu!');
    return;
  }

  alert(`Terima kasih, ${name}! Pesanan untuk "${note}" berhasil diproses.\nMetode Pembayaran: ${method}`);
  cart = {};
  saveCart();
  window.location.href = 'index.html';
}
