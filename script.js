// Базовый URL для API (временно используем тестовые данные)
// В будущем заменить на реальный URL вашего API
const API_BASE_URL = 'https://your-api-domain.com/api';

// Инициализация при загрузке страницы
document.addEventListener('DOMContentLoaded', function() {
    loadCategories();
    loadProducts(); // Загружаем все товары по умолчанию
});

// Загрузка категорий (пока тестовые данные)
async function loadCategories() {
    try {
        // Пока используем тестовые данные
        // В будущем будет: const response = await fetch(`${API_BASE_URL}/catalog/categories`);
        const categories = [
            { id: 'all', name: 'Все категории', guid: 'all' },
            { id: 'fish', name: 'Рыба', guid: 'cat1' },
            { id: 'shrimp', name: 'Креветки и лангустины', guid: 'cat2' },
            { id: 'caviar', name: 'Икра', guid: 'cat3' },
            { id: 'semi-finished', name: 'Полуфабрикаты', guid: 'cat4' },
            { id: 'crab', name: 'Краб', guid: 'cat5' },
            { id: 'seafood', name: 'Морепродукты и деликатесы', guid: 'cat6' },
            { id: 'other', name: 'Прочее', guid: 'cat7' }
        ];

        renderCategories(categories);
    } catch (error) {
        console.error('Ошибка загрузки категорий:', error);
        document.getElementById('categories-menu').innerHTML =
            '<div class="error">Ошибка загрузки категорий</div>';
    }
}

// Загрузка товаров (пока тестовые данные)
async function loadProducts(categoryId = null) {
    try {
        // Пока используем тестовые данные
        // В будущем будет: const response = await fetch(`${API_BASE_URL}/catalog/products?category_id=${categoryId}`);
        const products = [
            {
                id: 'prod1',
                guid: 'prod1',
                name: 'Креветки королевские',
                price: 800,
                unit: 'г',
                description: 'Свежемороженые королевские креветки'
            },
            {
                id: 'prod2',
                guid: 'prod2',
                name: 'Лосось филе',
                price: 600,
                unit: 'г',
                description: 'Свежемороженое филе лосося'
            },
            {
                id: 'prod3',
                guid: 'prod3',
                name: 'Икра красная',
                price: 1200,
                unit: 'г',
                description: 'Красная икра высшего сорта'
            },
            {
                id: 'prod4',
                guid: 'prod4',
                name: 'Краб Камчатский',
                price: 1500,
                unit: 'шт',
                description: 'Свежемороженый краб Камчатский'
            },
            {
                id: 'prod5',
                guid: 'prod5',
                name: 'Мидии в ракушках',
                price: 400,
                unit: 'г',
                description: 'Свежемороженые мидии'
            },
            {
                id: 'prod6',
                guid: 'prod6',
                name: 'Осьминоги',
                price: 700,
                unit: 'г',
                description: 'Свежемороженые осьминоги'
            }
        ];

        renderProducts(products);
    } catch (error) {
        console.error('Ошибка загрузки товаров:', error);
        document.getElementById('products-grid').innerHTML =
            '<div class="error">Ошибка загрузки товаров</div>';
    }
}

// Рендеринг категорий
function renderCategories(categories) {
    const menu = document.getElementById('categories-menu');
    let html = '<div class="menu-item active" data-category="all" onclick="loadProducts()">Все категории</div>';

    categories.forEach(category => {
        if (category.guid !== 'all') {
            html += `<div class="menu-item" data-category="${category.guid}" onclick="selectCategory('${category.guid}', '${category.name}')">${category.name}</div>`;
        }
    });

    menu.innerHTML = html;
}

// Рендеринг товаров
function renderProducts(products) {
    const grid = document.getElementById('products-grid');
    let html = '';

    if (products.length === 0) {
        grid.innerHTML = '<div class="empty">Товары не найдены</div>';
        return;
    }

    products.forEach(product => {
        html += `
            <div class="product-item" data-product="${product.guid}">
                <img src="https://placehold.co/100x100/0066cc/ffffff?text=${encodeURIComponent(product.name.substring(0, 2))}" alt="${product.name}">
                <div class="product-name">${product.name}</div>
                <div class="product-price">${product.price} ₽/${product.unit}</div>
                <div class="product-description">${product.description || ''}</div>
                <div class="product-controls" style="margin-top: 15px;">
                    <button class="btn btn-small" onclick="addToCart('${product.guid}', '${product.name}', ${product.price})">🛒 В корзину</button>
                </div>
            </div>
        `;
    });

    grid.innerHTML = html;
}

// Выбор категории
function selectCategory(categoryGuid, categoryName) {
    // Обновляем активную категорию в меню
    document.querySelectorAll('.menu-item').forEach(item => {
        item.classList.remove('active');
    });
    event.target.classList.add('active');

    // Обновляем заголовок
    document.getElementById('category-title').textContent = categoryName;

    // Загружаем товары категории (пока тестовые)
    loadProducts(categoryGuid);
}

// Добавление в корзину
function addToCart(productGuid, productName, price) {
    // Здесь будет логика добавления в корзину
    // Пока показываем уведомление
    alert(`Товар "${productName}" добавлен в корзину! Цена: ${price} ₽`);

    // В реальности нужно будет:
    // 1. Сохранить товар в localStorage/sessionStorage
    // 2. Отправить сообщение в Telegram бот
    // 3. Обновить счетчик в корзине

    // Пример сохранения в localStorage:
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    const existingItem = cart.find(item => item.guid === productGuid);

    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({
            guid: productGuid,
            name: productName,
            price: price,
            quantity: 1
        });
    }

    localStorage.setItem('cart', JSON.stringify(cart));

    // Отправка сообщения в Telegram (если интеграция есть)
    // sendMessageToTelegram(`Добавлен товар: ${productName}`);
}

// Отправка сообщения в Telegram (заглушка)
function sendMessageToTelegram(message) {
    // Здесь будет интеграция с Telegram Web App
    console.log('Отправка в Telegram:', message);
}