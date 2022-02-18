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

(function (arrOfTasks) {
    const objectOfTasks = arrOfTasks.reduce((acc, tasks) => {
        acc[tasks._id] = tasks;
        return acc;
    }, {});

    //Elements UI
    const listContainer = document.querySelector(
        '.tasks-list-section .list-group'
    );
    const form = document.forms.addTask,
        inputTitle = form.elements.title,
        inputBody = form.elements.body;
    console.log(listContainer);
    //Events
    renderAllTasks(objectOfTasks);
    form.addEventListener('submit', onFormSubmitHandler);
    listContainer.addEventListener('click', onListItemDeleteHandler);

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
        if (!confirmed) return;
        el.remove();
    }

    function onListItemDeleteHandler({ target }) {
        if (target.classList.contains('delete-btn')) {
            const parentElement = target.closest('[data-task-id]');
            const listItemId = parentElement.dataset.taskId;
            const confirmed = deleteTask(listItemId);
            deleteTaskFromHTML(confirmed, parentElement);
        }
    }
})(tasks);
