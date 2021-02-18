import React, { useEffect, useState } from "react";

const Infuser = () => {
    const [counter, setCounter] = useState(1);
    const [user, setUser] = useState([]);
    const [userTask, setUserTask] = useState([]);

    useEffect(() => {
        const getData = async () => {
            const info = await fetch(
                `https://jsonplaceholder.typicode.com/users/${counter}`
            );
            const data = await info.json();
            console.log("usuario", data);
            setUser(data);
        };
        getData();

        const getTask = async () => {
            const infoT = await fetch(
                `https://jsonplaceholder.typicode.com/users/${counter}/todos`
            );
            const dataT = await infoT.json();
            console.log("tareas", dataT);
            setUserTask(dataT);
        };
        getTask();
    }, [counter]);

    const handlePrevUser = () => {
        if (counter > 1) {
            setCounter(counter - 1);
        }
    };

    const handleNextUser = () => {
        if (counter < 10) {
            setCounter(counter + 1);
        }
    };

    const handleAddTask = () => {
        const addTask = document.querySelector('#task').value;
        setUserTask((prevTask) => {
            return [...prevTask, {userId: counter, id: setUserTask.length, title: addTask, completed: false}];
        });
        console.log("tareas", setUserTask);
        document.querySelector('#task').value = "";
    };

    const handleCompleteTask = (index) => {
        setUserTask((prevState) => {
            const taskComplete = [...prevState];
            taskComplete[index].completed = true;
            return taskComplete;
        })
    };

    const handleRemoveTask = (index) => {
        setUserTask((prevTask) => {
            return prevTask.filter((task, i) => i !== index);
        });
    };

    return (
        <div>
            <div>
                {<button onClick={handlePrevUser} disabled = {counter <= 1}>Anterior usuario</button>}
                <button onClick={handleNextUser} disabled = {counter >= 10}>Siguiente usuario</button>
            </div>
            <div>
                <h1>Información del usuario</h1>
                <ul>
                    <li><strong>Nombre: </strong>{user.name}</li>
                    <li><strong>Usuario: </strong>{user.username}</li>
                    <li><strong>Email: </strong>{user.email}</li>
                    <li><strong>Web: </strong>{user.website}</li>
                    <li><strong>Teléfono: </strong>{user.phone}</li>
                </ul>
            </div>
            <div>
                <label>Tarea</label>
                <input type="text" id="task" />
                <button onClick={ handleAddTask }>Agregar tarea</button>
            </div>
            <h1>Lista de tareas ({userTask.length} en total)</h1>
            <table>
                <thead>
                    <th>Nombre</th>
                    <th>Estado</th>
                    <th>Eliminar</th>
                </thead>
                <tbody>
                    {userTask.map((job, index) => (
                        <tr key={index}>
                            <td>{job.title}</td>
                            <td className={ job.completed ? 'tarea-completed' : 'tarea-pendiente' }>
                                {
                                    job.completed ? 'Completada' : <button onClick={ () => handleCompleteTask(index)}>Marcar como completada</button>
                                }
                            </td>
                            <td><button onClick={ () => handleRemoveTask(index)}>Eliminar</button></td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default Infuser;

