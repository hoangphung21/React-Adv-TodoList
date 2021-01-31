import { useState, useEffect } from 'react';
import { firebase } from '../firebase';

const collatedTasksExist = () => { };

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
                ? (unsubcribe = unsubcribe.where('date', '==', moment().format('DD/MM/YYYY')))
                : selectedProject === 'INBOX' || selectedProject === 0
                    ? (unsubcribe = unsubcribe.where('date', '==', ''))
                    : unsubcribe;
    }, []);
}