import { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import ListItem from './ListItem';
import Modal from './Modal';

function App() {
  const [todos, setTodos] = useState([]);
  const [id, setId] = useState('');
  const inputRef = useRef();
  const modalRef = useRef();
  function todoHandler() {
    setTodos(function (prev) {
      const todo = {
        id: parseInt(Math.random() * 100),
        value: inputRef.current.value,
        completed: false,
      };
      const newTodos = [...prev, todo];
      localStorage.setItem('todos', JSON.stringify(newTodos));
      return newTodos;
    });
  }
  useEffect(() => {
    let localTodos = localStorage.getItem('todos') || JSON.stringify([]);
    localTodos = JSON.parse(localTodos);
    if (localTodos.length) {
      setTodos(localTodos);
    }
  }, []);

  function onCheckedHandler(id) {
    const updatedTodos = todos.map((todo) => {
      if (todo.id === id) {
        return { ...todo, completed: !todo.completed };
      }
      return todo;
    });
    setTodos(() => {
      localStorage.setItem('todos', JSON.stringify(updatedTodos));
      return updatedTodos;
    });
  }

  function removeTodoHandler() {
    const filteredTodos = todos.filter((todo) => todo.id !== id);
    setTodos(() => {
      localStorage.setItem('todos', JSON.stringify(filteredTodos));
      return filteredTodos;
    });
    modalRef.current.close();
  }

  return (
    <div>
      <h1>Todo App</h1>
      <div>
        <input type='text' placeholder='Create Todos...' ref={inputRef} />
        <button onClick={todoHandler}>Create</button>
      </div>
      <ul>
        {todos.map((t) => {
          return (
            <ListItem
              key={t.id}
              todo={t}
              onCheckedHandler={onCheckedHandler}
              onDeleteHandler={(id) => {
                setId(id);
                modalRef.current.showModal();
              }}
            />
          );
        })}
      </ul>
      {createPortal(
        <Modal
          ref={modalRef}
          onConfirmHandler={removeTodoHandler}
          closeModalHandler={() => modalRef.current.close()} />,
        document.getElementById('modal')
      )}
    </div>
  );
}

export default App;
