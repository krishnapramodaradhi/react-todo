function ListItem(props) {
  return (
    <li className={props.todo.completed ? 'completed': ''}>
      <input
        type='checkbox'
        defaultChecked={props.todo.completed}
        onChange={props.onCheckedHandler.bind(null, props.todo.id)}
      />
      <label>{props.todo.value}</label>
      <span className='delete-icon' onClick={props.onDeleteHandler.bind(null, props.todo.id)}>X</span>
    </li>
  );
}

export default ListItem;
