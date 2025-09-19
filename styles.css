// Инициализация базы данных в localStorage
function initDatabase() {
    if (!localStorage.getItem('universityBotData')) {
        const initialData = {
            users: [],
            homework: [],
            homework_files: [],
            news: [],
            krs_topics: [],
            news_comments: [],
            settings: {
                theme: 'light'
            }
        };
        localStorage.setItem('universityBotData', JSON.stringify(initialData));
    }
    return JSON.parse(localStorage.getItem('universityBotData'));
}

// Сохранение данных в localStorage
function saveData(data) {
    localStorage.setItem('universityBotData', JSON.stringify(data));
}

// Получение текущих данных
function getData() {
    return JSON.parse(localStorage.getItem('universityBotData'));
}

// Переключение темы
function toggleTheme() {
    const data = getData();
    const newTheme = data.settings.theme === 'light' ? 'dark' : 'light';
    data.settings.theme = newTheme;
    saveData(data);
    
    document.body.classList.toggle('dark-theme', newTheme === 'dark');
    document.getElementById('themeToggle').textContent = newTheme === 'light' ? '🌙' : '☀️';
}

// Проверка, открыто ли в Telegram Mini Apps
function isTelegramWebApp() {
    return window.Telegram && window.Telegram.WebApp;
}

// Инициализация Telegram Web App
function initTelegramWebApp() {
    if (isTelegramWebApp()) {
        const webApp = window.Telegram.WebApp;
        webApp.expand();
        webApp.enableClosingConfirmation();
        
        // Установка цветовой схемы Telegram
        document.documentElement.style.setProperty('--primary-color', webApp.themeParams.button_color || '#007bff');
        
        // Применение темы Telegram
        if (webApp.colorScheme === 'dark') {
            document.body.classList.add('dark-theme');
        }
    }
}

// Отображение секции
function showSection(sectionId) {
    const contentArea = document.getElementById('contentArea');
    const data = getData();
    
    // Очистка области контента
    contentArea.innerHTML = '';
    
    switch(sectionId) {
        case 'homework':
            renderHomeworkSubjects();
            break;
        case 'news':
            renderNews();
            break;
        case 'krs':
            renderKrsSubjects();
            break;
        case 'assistants':
            renderAssistants();
            break;
        case 'addHomework':
            renderAddHomeworkForm();
            break;
        case 'addNews':
            renderAddNewsForm();
            break;
        case 'home':
        default:
            renderHome();
            break;
    }
}

// Рендер главной страницы
function renderHome() {
    const contentArea = document.getElementById('contentArea');
    contentArea.innerHTML = `
        <div class="section">
            <h2 class="section-title">Добро пожаловать!</h2>
            <p>Используйте меню для навигации по функциям бота:</p>
            <ul>
                <li>📚 Домашка - просмотр и добавление домашних заданий</li>
                <li>📢 Новости - просмотр новостей группы</li>
                <li>📅 Темы КТ и СРС - управление темами контрольных работ</li>
                <li>📖 Помощники студента - полезные ресурсы для учебы</li>
            </ul>
        </div>
    `;
}

// Рендер списка предметов для домашних заданий
function renderHomeworkSubjects() {
    const contentArea = document.getElementById('contentArea');
    const subjects = ["Физра", "Математика", "Информатика", "Физика", "Манасоведение", "Русский", "Защита труда", "Английский"];
    
    let subjectHTML = '<div class="section"><h2 class="section-title">Выберите предмет:</h2><div class="subject-grid">';
    
    subjects.forEach(subject => {
        subjectHTML += `<div class="subject-btn" data-subject="${subject}">${subject}</div>`;
    });
    
    subjectHTML += '</div><button class="back-btn" data-section="home">↩️ Назад</button></div>';
    
    contentArea.innerHTML = subjectHTML;
    
    // Добавление обработчиков событий
    document.querySelectorAll('.subject-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            const subject = btn.getAttribute('data-subject');
            renderHomeworkForSubject(subject);
        });
    });
    
    document.querySelector('.back-btn').addEventListener('click', () => {
        showSection('home');
    });
}

// Рендер домашних заданий по предмету
function renderHomeworkForSubject(subject) {
    const contentArea = document.getElementById('contentArea');
    const data = getData();
    
    // Фильтрация домашних заданий по предмету
    const homeworks = data.homework.filter(hw => hw.subject === subject);
    
    let homeworkHTML = `<div class="section"><h2 class="section-title">Домашние задания: ${subject}</h2>`;
    
    if (homeworks.length === 0) {
        homeworkHTML += `<p>По предмету "${subject}" домашнего задания нет.</p>`;
    } else {
        homeworks.forEach(hw => {
            // Получение файлов для этого задания
            const files = data.homework_files.filter(file => file.homework_id === hw.id);
            // Получение имени пользователя
            const user = data.users.find(u => u.user_id === hw.added_by) || {first_name: "Неизвестный", last_name: "пользователь"};
            const userName = `${user.first_name} ${user.last_name || ''}`.trim();
            
            homeworkHTML += `
                <div class="homework-item">
                    <h3>📝 Задание:</h3>
                    <p>${hw.task_text}</p>
                    <p><small>⏰ Добавлено: ${hw.added_at} 👤 ${userName}</small></p>
            `;
            
            if (files.length > 0) {
                homeworkHTML += `<div class="file-list"><h4>📎 Прикрепленные файлы:</h4>`;
                files.forEach(file => {
                    homeworkHTML += `
                        <div class="file-item">
                            <span class="file-icon">📄</span>
                            <span>${file.file_name || 'Файл'} (${file.file_type})</span>
                        </div>
                    `;
                });
                homeworkHTML += `</div>`;
            }
            
            homeworkHTML += `</div>`;
        });
    }
    
    homeworkHTML += `<button class="back-btn" data-section="homework">↩️ Назад к предметам</button></div>`;
    
    contentArea.innerHTML = homeworkHTML;
    
    // Добавление обработчика события для кнопки назад
    document.querySelector('.back-btn').addEventListener('click', () => {
        renderHomeworkSubjects();
    });
}

// Рендер списка новостей
function renderNews() {
    const contentArea = document.getElementById('contentArea');
    const data = getData();
    
    let newsHTML = `<div class="section"><h2 class="section-title">Новости</h2>`;
    
    if (data.news.length === 0) {
        newsHTML += `<p>Пока нет новостей.</p>`;
    } else {
        data.news.forEach(newsItem => {
            // Получение имени пользователя
            const user = data.users.find(u => u.user_id === newsItem.added_by) || {first_name: "Неизвестный", last_name: "пользователь"};
            const userName = `${user.first_name} ${user.last_name || ''}`.trim();
            
            // Получение комментариев для этой новости
            const comments = data.news_comments.filter(comment => comment.news_id === newsItem.id);
            
            newsHTML += `
                <div class="news-item">
                    <h3>📢 ${newsItem.text}</h3>
                    ${newsItem.photo_id ? `<img src="${newsItem.photo_id}" alt="Новость" style="max-width: 100%; border-radius: 8px; margin: 10px 0;">` : ''}
                    <p><small>⏰ ${newsItem.added_at} 👤 ${userName}</small></p>
            `;
            
            if (comments.length > 0) {
                newsHTML += `<div class="comment-section"><h4>💬 Комментарии:</h4>`;
                comments.forEach(comment => {
                    const commentUser = data.users.find(u => u.user_id === comment.user_id) || {first_name: "Неизвестный", last_name: "пользователь"};
                    const commentUserName = `${commentUser.first_name} ${commentUser.last_name || ''}`.trim();
                    
                    newsHTML += `
                        <div class="comment">
                            <div class="comment-author">${commentUserName}</div>
                            <div class="comment-text">${comment.comment_text}</div>
                            <div class="comment-date">${comment.added_at}</div>
                        </div>
                    `;
                });
                newsHTML += `</div>`;
            } else {
                newsHTML += `<p><small>💬 Комментариев пока нет.</small></p>`;
            }
            
            newsHTML += `<button class="btn btn-primary" style="margin-top: 10px;" data-news-id="${newsItem.id}">💬 Добавить комментарий</button>`;
            newsHTML += `</div>`;
        });
    }
    
    newsHTML += `<button class="back-btn" data-section="home">↩️ Назад</button></div>`;
    
    contentArea.innerHTML = newsHTML;
    
    // Добавление обработчиков событий для кнопок комментариев
    document.querySelectorAll('.btn[data-news-id]').forEach(btn => {
        btn.addEventListener('click', () => {
            const newsId = btn.getAttribute('data-news-id');
            showAddCommentModal(newsId);
        });
    });
    
    // Добавление обработчика события для кнопки назад
    document.querySelector('.back-btn').addEventListener('click', () => {
        showSection('home');
    });
}

// Рендер списка предметов для КТ/СРС
function renderKrsSubjects() {
    const contentArea = document.getElementById('contentArea');
    const subjects = ["Физра", "Математика", "Информатика", "Физика", "Манасоведение", "Русский", "Защита труда", "Английский"];
    
    let subjectHTML = '<div class="section"><h2 class="section-title">Выберите предмет:</h2><div class="subject-grid">';
    
    subjects.forEach(subject => {
        subjectHTML += `<div class="subject-btn" data-subject="${subject}">${subject}</div>`;
    });
    
    subjectHTML += '</div><button class="back-btn" data-section="home">↩️ Назад</button></div>';
    
    contentArea.innerHTML = subjectHTML;
    
    // Добавление обработчиков событий
    document.querySelectorAll('.subject-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            const subject = btn.getAttribute('data-subject');
            renderKrsForSubject(subject);
        });
    });
    
    document.querySelector('.back-btn').addEventListener('click', () => {
        showSection('home');
    });
}

// Рендер тем КТ/СРС по предмету
function renderKrsForSubject(subject) {
    const contentArea = document.getElementById('contentArea');
    const data = getData();
    
    // Фильтрация тем по предмету
    const topics = data.krs_topics.filter(topic => topic.subject === subject);
    
    let topicsHTML = `<div class="section"><h2 class="section-title">Темы КТ/СРС: ${subject}</h2>`;
    
    if (topics.length === 0) {
        topicsHTML += `<p>Для "${subject}" тем КТ/СРС нет.</p>`;
    } else {
        topics.forEach(topic => {
            // Получение имени пользователя
            const user = data.users.find(u => u.user_id === topic.added_by) || {first_name: "Неизвестный", last_name: "пользователь"};
            const userName = `${user.first_name} ${user.last_name || ''}`.trim();
            
            topicsHTML += `
                <div class="homework-item">
                    <h3>📝 Тема:</h3>
                    <p>${topic.topic_text}</p>
                    <p><small>⏰ Добавлено: ${topic.added_at} 👤 ${userName}</small></p>
                </div>
            `;
        });
    }
    
    topicsHTML += `<button class="back-btn" data-section="krs">↩️ Назад к предметам</button></div>`;
    
    contentArea.innerHTML = topicsHTML;
    
    // Добавление обработчика события для кнопки назад
    document.querySelector('.back-btn').addEventListener('click', () => {
        renderKrsSubjects();
    });
}

// Рендер помощников студента
function renderAssistants() {
    const contentArea = document.getElementById('contentArea');
    
    const assistantsHTML = `
        <div class="section">
            <h2 class="section-title">Помощники студента</h2>
            <p>📖 ИИ для студентов:</p>
            <div class="homework-item">
                <h3>1. ChatGPT</h3>
                <p>База, делает все, можешь попросить расписать слайды.</p>
                <p><a href="https://chatgpt.com" target="_blank">https://chatgpt.com</a></p>
            </div>
            <div class="homework-item">
                <h3>2. Grok</h3>
                <p>Если чат гпт просит бабки.</p>
                <p><a href="https://grok.com" target="_blank">https://grok.com</a></p>
            </div>
            <div class="homework-item">
                <h3>3. Gamma</h3>
                <p>чтоб прeзетации делать</p>
                <p><a href="https://gamma.app" target="_blank">https://gamma.app</a></p>
            </div>
            <div class="homework-item">
                <h3>4. Эржан</h3>
                <p>Местный помощник</p>
            </div>
            <button class="back-btn" data-section="home">↩️ Назад</button>
        </div>
    `;
    
    contentArea.innerHTML = assistantsHTML;
    
    // Добавление обработчика события для кнопки назад
    document.querySelector('.back-btn').addEventListener('click', () => {
        showSection('home');
    });
}

// Рендер формы добавления домашнего задания
function renderAddHomeworkForm() {
    const contentArea = document.getElementById('contentArea');
    const subjects = ["Физра", "Математика", "Информатика", "Физика", "Манасоведение", "Русский", "Защита труда", "Английский"];
    
    let subjectOptions = '';
    subjects.forEach(subject => {
        subjectOptions += `<option value="${subject}">${subject}</option>`;
    });
    
    const formHTML = `
        <div class="section">
            <h2 class="section-title">Добавить домашнее задание</h2>
            <form id="addHomeworkForm">
                <div class="form-group">
                    <label for="subject">Предмет:</label>
                    <select class="form-input" id="subject" required>
                        <option value="">Выберите предмет</option>
                        ${subjectOptions}
                    </select>
                </div>
                <div class="form-group">
                    <label for="taskText">Текст задания:</label>
                    <textarea class="form-textarea" id="taskText" required></textarea>
                </div>
                <div class="form-group">
                    <label>Прикрепленные файлы:</label>
                    <div id="fileList"></div>
                    <button type="button" class="btn btn-primary" id="addFileBtn">📎 Добавить файл</button>
                </div>
                <button type="submit" class="btn btn-success">✅ Добавить ДЗ</button>
                <button type="button" class="back-btn" data-section="home">↩️ Назад</button>
            </form>
        </div>
    `;
    
    contentArea.innerHTML = formHTML;
    
    // Добавление обработчиков событий
    document.getElementById('addHomeworkForm').addEventListener('submit', (e) => {
        e.preventDefault();
        addHomework();
    });
    
    document.getElementById('addFileBtn').addEventListener('click', () => {
        alert("В реальном приложении здесь будет загрузка файлов");
    });
    
    document.querySelector('.back-btn').addEventListener('click', () => {
        showSection('home');
    });
}

// Рендер формы добавления новости
function renderAddNewsForm() {
    const contentArea = document.getElementById('contentArea');
    
    const formHTML = `
        <div class="section">
            <h2 class="section-title">Добавить новость</h2>
            <form id="addNewsForm">
                <div class="form-group">
                    <label for="newsText">Текст новости:</label>
                    <textarea class="form-textarea" id="newsText" required></textarea>
                </div>
                <div class="form-group">
                    <label>Фото:</label>
                    <button type="button" class="btn btn-primary" id="addPhotoBtn">📷 Добавить фото</button>
                </div>
                <button type="submit" class="btn btn-success">✅ Опубликовать новость</button>
                <button type="button" class="back-btn" data-section="home">↩️ Назад</button>
            </form>
        </div>
    `;
    
    contentArea.innerHTML = formHTML;
    
    // Добавление обработчиков событий
    document.getElementById('addNewsForm').addEventListener('submit', (e) => {
        e.preventDefault();
        addNews();
    });
    
    document.getElementById('addPhotoBtn').addEventListener('click', () => {
        alert("В реальном приложении здесь будет загрузка фото");
    });
    
    document.querySelector('.back-btn').addEventListener('click', () => {
        showSection('home');
    });
}

// Функция добавления домашнего задания
function addHomework() {
    const subject = document.getElementById('subject').value;
    const taskText = document.getElementById('taskText').value;
    
    if (!subject || !taskText) {
        alert("Заполните все поля");
        return;
    }
    
    const data = getData();
    const newId = data.homework.length > 0 ? Math.max(...data.homework.map(hw => hw.id)) + 1 : 1;
    
    // В реальном приложении здесь будет ID текущего пользователя
    const userId = 1;
    
    // Добавление текущего пользователя, если его нет в базе
    if (!data.users.find(u => u.user_id === userId)) {
        data.users.push({
            user_id: userId,
            username: "current_user",
            first_name: "Текущий",
            last_name: "Пользователь",
            registered_at: new Date().toISOString()
        });
    }
    
    // Добавление домашнего задания
    data.homework.push({
        id: newId,
        subject: subject,
        task_text: taskText,
        added_by: userId,
        added_at: new Date().toISOString()
    });
    
    saveData(data);
    alert("Домашнее задание успешно добавлено!");
    showSection('home');
}

// Функция добавления новости
function addNews() {
    const newsText = document.getElementById('newsText').value;
    
    if (!newsText) {
        alert("Введите текст новости");
        return;
    }
    
    const data = getData();
    const newId = data.news.length > 0 ? Math.max(...data.news.map(n => n.id)) + 1 : 1;
    
    // В реальном приложении здесь будет ID текущего пользователя
    const userId = 1;
    
    // Добавление текущего пользователя, если его нет в базе
    if (!data.users.find(u => u.user_id === userId)) {
        data.users.push({
            user_id: userId,
            username: "current_user",
            first_name: "Текущий",
            last_name: "Пользователь",
            registered_at: new Date().toISOString()
        });
    }
    
    // Добавление новости
    data.news.push({
        id: newId,
        text: newsText,
        photo_id: null, // В реальном приложении здесь будет ID фото
        added_by: userId,
        added_at: new Date().toISOString()
    });
    
    saveData(data);
    alert("Новость успешно добавлена!");
    showSection('home');
}

// Показать модальное окно для добавления комментария
function showAddCommentModal(newsId) {
    // В реальном приложении здесь будет создание модального окна
    const commentText = prompt("Введите ваш комментарий:");
    if (commentText) {
        addComment(newsId, commentText);
    }
}

// Функция добавления комментария
function addComment(newsId, commentText) {
    const data = getData();
    const newId = data.news_comments.length > 0 ? Math.max(...data.news_comments.map(c => c.id)) + 1 : 1;
    
    // В реальном приложении здесь будет ID текущего пользователя
    const userId = 1;
    
    // Добавление комментария
    data.news_comments.push({
        id: newId,
        news_id: parseInt(newsId),
        user_id: userId,
        comment_text: commentText,
        added_at: new Date().toISOString()
    });
    
    saveData(data);
    alert("Комментарий успешно добавлен!");
    renderNews(); // Перезагружаем новости для отображения нового комментария
}

// Инициализация приложения
function initApp() {
    // Инициализация базы данных
    initDatabase();
    
    // Инициализация Telegram Web App, если применимо
    initTelegramWebApp();
    
    // Применение темы
    const data = getData();
    document.body.classList.toggle('dark-theme', data.settings.theme === 'dark');
    document.getElementById('themeToggle').textContent = data.settings.theme === 'light' ? '🌙' : '☀️';
    
    // Показ главной страницы
    showSection('home');
    
    // Добавление обработчиков событий для навигации
    document.querySelectorAll('.nav-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            const section = btn.getAttribute('data-section');
            showSection(section);
        });
    });
    
    // Добавление обработчиков событий для навигации в Telegram Mini Apps
    document.querySelectorAll('.tma-nav-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            const section = btn.getAttribute('data-section');
            showSection(section);
        });
    });
    
    // Добавление обработчика события для переключения темы
    document.getElementById('themeToggle').addEventListener('click', toggleTheme);
}

// Запуск приложения после загрузки DOM
document.addEventListener('DOMContentLoaded', initApp);
