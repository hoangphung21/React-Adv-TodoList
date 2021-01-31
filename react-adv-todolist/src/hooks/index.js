import { useState, useEffect } from 'react';
import { firebase } from '../firebase';

const collatedTasks = () => { };

export const useTasks = selectedProject => {
    const [tasks, setTasks] = useState([]);

    useEffect(() => {
        let unsubcribe = firebase
            .firestore()
            .collection('tasks')
            .where('userId', '==', 'hoangfbw');

        unsubcribe = selectedProject && !collatedTasksExist(selectedProject) ?
            (unsubcribe = unsubcribe.where('projectId', '==', selectedProject))
            : selectedProject === 'TODAY'
    }, []);
}