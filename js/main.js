const tasks = [
    {
        _id: '5d2ca9e2e03d40b326596aa7',
        completed: true,
        body: 'Occaecat non ea quis occaecat ad culpa amet deserunt incididunt elit fugiat pariatur. Exercitation commodo culpa in veniam proident laboris in. Excepteur cupidatat eiusmod dolor consectetur exercitation nulla aliqua veniam fugiat irure mollit. Eu dolor dolor excepteur pariatur aute do do ut pariatur consequat reprehenderit deserunt.\r\n',
        title: 'Eu ea incididunt sunt consectetur fugiat non.',
    },
    {
        _id: '5d2ca9e29c8a94095c1288e0',
        completed: false,
        body: 'Aliquip cupidatat ex adipisicing veniam do tempor. Lorem nulla adipisicing et esse cupidatat qui deserunt in fugiat duis est qui. Est adipisicing ipsum qui cupidatat exercitation. Cupidatat aliqua deserunt id deserunt excepteur nostrud culpa eu voluptate excepteur. Cillum officia proident anim aliquip. Dolore veniam qui reprehenderit voluptate non id anim.\r\n',
        title: 'Deserunt laborum id consectetur pariatur veniam occaecat occaecat tempor voluptate pariatur nulla reprehenderit ipsum.',
    },
    {
        _id: '5d2ca9e2e03d40b3232496aa7',
        completed: true,
        body: 'Occaecat non ea quis occaecat ad culpa amet deserunt incididunt elit fugiat pariatur. Exercitation commodo culpa in veniam proident laboris in. Excepteur cupidatat eiusmod dolor consectetur exercitation nulla aliqua veniam fugiat irure mollit. Eu dolor dolor excepteur pariatur aute do do ut pariatur consequat reprehenderit deserunt.\r\n',
        title: 'Eu ea incididunt sunt consectetur fugiat non.',
    },
    {
        _id: '5d2ca9e29c8a94095564788e0',
        completed: false,
        body: 'Aliquip cupidatat ex adipisicing veniam do tempor. Lorem nulla adipisicing et esse cupidatat qui deserunt in fugiat duis est qui. Est adipisicing ipsum qui cupidatat exercitation. Cupidatat aliqua deserunt id deserunt excepteur nostrud culpa eu voluptate excepteur. Cillum officia proident anim aliquip. Dolore veniam qui reprehenderit voluptate non id anim.\r\n',
        title: 'Deserunt laborum id consectetur pariatur veniam occaecat occaecat tempor voluptate pariatur nulla reprehenderit ipsum.',
    },
];

(function (arrOfTasks) {
    const objectOfTasks = arrOfTasks.reduce((acc, tasks) => {
        acc[tasks._id] = tasks;
        return acc;
    }, {});
    console.log(objectOfTasks);
    //Elements UI
    const listContainer = document.querySelector(
        '.tasks-list-section .list-group'
    );
    const form = document.forms.addTask,
        inputTitle = form.elements.title,
        inputBody = form.elements.body;

    //Events
    renderAllTasks(objectOfTasks);
    form.addEventListener('submit', onFormSubmitHandler);

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

        listContainer.insertAdjacentElement('beforebegin', listItem);
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
})(tasks);
