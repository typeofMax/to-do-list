const tasks = [
    {
        _id: '5d2ca9e2e03d40b326596aa7',
        completed: true,
        body: 'Овощи, молоко, мясо, масло подсолнечное \r\n',
        title: 'Купить продукты',
    },
    {
        _id: '5d2ca9e29c8a94095c1288e0',
        completed: false,
        body: 'ОФП по видео на YouTube (добавлено в избранное)\r\n',
        title: 'Тренировка',
    },
    {
        _id: '5d2ca9e2e03d40b3232496aa7',
        completed: true,
        body: 'Медитация по приложению Meditopia\r\n',
        title: 'Медитация',
    },
    {
        _id: '5d2ca9e29c8a94095564788e0',
        completed: false,
        body: 'Кодить =))\r\n',
        title: 'Кодить',
    },
];

(function (arrOfTasks = []) {
    const objectOfTasks = arrOfTasks.reduce((acc, tasks) => {
        acc[tasks._id] = tasks;
        return acc;
    }, {});

    const themes = {
        default: {
            '--base-text-color': '#212529',
            '--header-bg': '#007bff',
            '--header-text-color': '#fff',
            '--default-btn-bg': '#007bff',
            '--default-btn-text-color': '#fff',
            '--default-btn-hover-bg': '#0069d9',
            '--default-btn-border-color': '#0069d9',
            '--danger-btn-bg': '#dc3545',
            '--danger-btn-text-color': '#fff',
            '--danger-btn-hover-bg': '#bd2130',
            '--danger-btn-border-color': '#dc3545',
            '--input-border-color': '#ced4da',
            '--input-bg-color': '#fff',
            '--input-text-color': '#495057',
            '--input-focus-bg-color': '#fff',
            '--input-focus-text-color': '#495057',
            '--input-focus-border-color': '#80bdff',
            '--input-focus-box-shadow': '0 0 0 0.2rem rgba(0, 123, 255, 0.25)',
        },
        dark: {
            '--base-text-color': '#212529',
            '--header-bg': '#343a40',
            '--header-text-color': '#fff',
            '--default-btn-bg': '#58616b',
            '--default-btn-text-color': '#fff',
            '--default-btn-hover-bg': '#292d31',
            '--default-btn-border-color': '#343a40',
            '--default-btn-focus-box-shadow':
                '0 0 0 0.2rem rgba(141, 143, 146, 0.25)',
            '--danger-btn-bg': '#b52d3a',
            '--danger-btn-text-color': '#fff',
            '--danger-btn-hover-bg': '#88222c',
            '--danger-btn-border-color': '#88222c',
            '--input-border-color': '#ced4da',
            '--input-bg-color': '#fff',
            '--input-text-color': '#495057',
            '--input-focus-bg-color': '#fff',
            '--input-focus-text-color': '#495057',
            '--input-focus-border-color': '#78818a',
            '--input-focus-box-shadow':
                '0 0 0 0.2rem rgba(141, 143, 146, 0.25)',
        },
        light: {
            '--base-text-color': '#212529',
            '--header-bg': '#fff',
            '--header-text-color': '#212529',
            '--default-btn-bg': '#fff',
            '--default-btn-text-color': '#212529',
            '--default-btn-hover-bg': '#e8e7e7',
            '--default-btn-border-color': '#343a40',
            '--default-btn-focus-box-shadow':
                '0 0 0 0.2rem rgba(141, 143, 146, 0.25)',
            '--danger-btn-bg': '#f1b5bb',
            '--danger-btn-text-color': '#212529',
            '--danger-btn-hover-bg': '#ef808a',
            '--danger-btn-border-color': '#e2818a',
            '--input-border-color': '#ced4da',
            '--input-bg-color': '#fff',
            '--input-text-color': '#495057',
            '--input-focus-bg-color': '#fff',
            '--input-focus-text-color': '#495057',
            '--input-focus-border-color': '#78818a',
            '--input-focus-box-shadow':
                '0 0 0 0.2rem rgba(141, 143, 146, 0.25)',
        },
    };

    let lastSelectedTheme = localStorage.getItem('app_theme') || 'default';

    //Elements UI
    const listContainer = document.querySelector(
        '.tasks-list-section .list-group'
    );

    const form = document.forms.addTask,
        inputTitle = form.elements.title,
        inputBody = form.elements.body;

    const themeSelect = document.getElementById('themeSelect');

    //Events
    setTheme(lastSelectedTheme);
    renderAllTasks(objectOfTasks);
    form.addEventListener('submit', onFormSubmitHandler);
    listContainer.addEventListener('click', onListItemDeleteHandler);
    themeSelect.addEventListener('change', onThemeSelectHandler);

    //Logic
    function renderAllTasks(tasksList) {
        if (!tasksList) {
            console.log('Передайте список задач');
            return;
        }

        const fragment = document.createDocumentFragment();
        Object.values(tasksList).forEach((task) => {
            const li = createLiTemplate(task);
            fragment.appendChild(li);
        });

        listContainer.appendChild(fragment);
        checkTasksList();
    }

    function createLiTemplate({ _id, title, body } = {}) {
        const li = document.createElement('li');
        li.classList.add(
            'list-group-item',
            'd-flex',
            'align-items-center',
            'flex-wrap',
            'mt-2'
        );
        li.setAttribute(['data-task-id'], _id);

        const span = document.createElement('span');
        span.textContent = title;
        span.style.fontWeight = 'bold';

        const deleteBtn = document.createElement('button');
        deleteBtn.textContent = 'Delete';
        deleteBtn.classList.add('btn', 'btn-danger', 'ml-auto', 'delete-btn');

        const article = document.createElement('p');
        article.textContent = body;
        article.classList.add('mt-2', 'w-100');

        li.appendChild(span);
        li.appendChild(deleteBtn);
        li.appendChild(article);

        return li;
    }

    function onFormSubmitHandler(e) {
        e.preventDefault();

        const taskTitle = inputTitle.value,
            taskBody = inputBody.value;

        if (!taskTitle || !taskBody) {
            alert('Пожалуйста заполните поля формы');
            return;
        }

        const task = createNewTask(taskTitle, taskBody),
            listItem = createLiTemplate(task);

        listContainer.insertAdjacentElement('afterbegin', listItem);
        form.reset();

        removeEmptyTaskListMessage();
    }

    function createNewTask(title, body) {
        const newTask = {
            _id: Math.random().toString(36).substring(2),
            completed: false,
            body,
            title,
        };

        objectOfTasks[newTask._id] = newTask;

        return { ...newTask };
    }

    function deleteTask(id) {
        const { title } = objectOfTasks[id];
        const isConfirm = confirm(`Подтвердите удаление задачи: ${title}`);

        if (!isConfirm) {
            return isConfirm;
        }

        delete objectOfTasks[id];

        return isConfirm;
    }

    function deleteTaskFromHTML(confirmed, el) {
        if (!confirmed) {
            return;
        }

        el.remove();
    }

    function onListItemDeleteHandler({ target }) {
        if (target.classList.contains('delete-btn')) {
            const parentElement = target.closest('[data-task-id]');
            const listItemId = parentElement.dataset.taskId;
            const confirmed = deleteTask(listItemId);
            deleteTaskFromHTML(confirmed, parentElement);
            checkTasksList();
        }
    }

    function onThemeSelectHandler() {
        const selectedThem = themeSelect.value;

        const isConfirm = confirm(`Изменить тему на: ${selectedThem} ?`);
        if (!isConfirm) {
            themeSelect.value = lastSelectedTheme;
            return;
        }

        setTheme(selectedThem);
        lastSelectedTheme = selectedThem;
        localStorage.setItem('app_theme', selectedThem);
    }

    function setTheme(themeName) {
        themeSelect.value = themeName;

        const selectedThemeObj = themes[themeName];
        Object.entries(selectedThemeObj).forEach(([key, value]) => {
            document.documentElement.style.setProperty(key, value);
        });
    }

    function checkTasksList() {
        if (!listContainer.children.length) {
            showEmptyTaskListMessage();
        }
    }

    function showEmptyTaskListMessage() {
        listContainer.insertAdjacentHTML(
            'afterbegin',
            `
            <div class="alert alert-primary d-flex align-items-center" role="alert">
                <svg class="bi flex-shrink-0 me-2" width="24" height="24" role="img" aria-label="Info:">
                    <use xlink:href="#info-fill"/>
                </svg>
                <div>
                    Не выполненные задачи отсутствуют
                </div>
            </div>
            `
        );
    }

    function removeEmptyTaskListMessage() {
        const message = document.querySelector('.alert');

        if (message) {
            message.remove();
        }
    }
})(tasks);
