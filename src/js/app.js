// Carregando Itens 
window.addEventListener('load', () => {
    tarefas = JSON.parse(localStorage.getItem('tarefas')) || [];
    const formTarefas = document.querySelector('.form');


    formTarefas.addEventListener('submit', e => {
        e.preventDefault();

        // Recuperando data
        const data = new Date();
        const dia = String(data.getDate()).padStart(2, '0');
        const mes = String(data.getMonth() + 1).padStart(2, '0');
        const ano = data.getFullYear();
        const dataAtual = `${dia}/${mes}/${ano}`

        const tarefa = {
            conteudo: e.target.elements.conteudo.value,
            done: false,
            criadoEm: dataAtual
        }

        tarefas.push(tarefa);

        localStorage.setItem('tarefa', JSON.stringify(tarefas));

        e.target.reset();

        mostrarTarefas();
    })

    mostrarTarefas();
})

// Exibindo tarefas
function mostrarTarefas() {
    const listaDeTarefa = document.querySelector('#lista-tarefas');
    listaDeTarefa.innerHTML = '';

    tarefas.forEach(tarefa => {
        const item = document.createElement('div');
        item.classList.add('item')

        const label = document.createElement('label');
        const input = document.createElement('input');
        const span = document.createElement('span');
        const conteudo = document.createElement('div');
        const acoes = document.createElement('div');
        const editar = document.createElement('button');
        const deletar = document.createElement('button');

        input.type = 'checkbox';
        input.checked = tarefa.done; //status da tarefa
        span.classList.add('bolha');
        conteudo.classList.add('conteudo');
        acoes.classList.add('acoes')
        editar.classList.add('editar');
        deletar.classList.add('deletar');

        conteudo.innerHTML = `<input type="text" value="${tarefa.conteudo}" readonly required/>`;
        editar.innerHTML = 'Editar';
        deletar.innerHTML = 'Deletar';

        label.appendChild(input);
        label.appendChild(span);
        acoes.appendChild(editar);
        acoes.appendChild(deletar);
        item.appendChild(label);
        item.appendChild(conteudo);
        item.appendChild(acoes);

        listaDeTarefa.appendChild(item);

        //Adicionando estilo em tarefas concluidas
        if (tarefa.done) {
            item.classList.add('concluido');
        }

        input.addEventListener('click', e => {
            tarefa.done = e.target.checked;
            localStorage.setItem('tarefas', JSON.stringify(tarefas))

            //Atualizando status da tarefa no armazenamento
            if (tarefa.done) {
                item.classList.add('concluido');
            } else {
                item.classList.remove('concluido');
            }

            mostrarTarefas();
        })

        editar.addEventListener('click', e => {
            const input = conteudo.querySelector('input');
            input.removeAttribute('readonly');
            input.focus();
            input.addEventListener('blur', e => {
                input.setAttribute('readonly', true);
                tarefa.conteudo = e.target.value;
                localStorage.setItem('tarefas', JSON.stringify(tarefas));
               
                mostrarTarefas()
            })
        })

        deletar.addEventListener('click', e=>{
            tarefas = tarefas.filter(t => t != tarefa);
            localStorage.setItem('tarefas', JSON.stringify(tarefas));
            
            mostrarTarefas()
        })
    });
}