import { useState, useEffect } from 'react';
import moment from 'moment';
import { firebase } from '../firebase';
import { collatedTasksExist } from '../helpers';

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

        unsubcribe = unsubcribe.onSnapshot(snapShot => {
            const newTasks = snapShot.docs.map(task => ({
                id: task.id,
                ...task.data(),
            }));

            setTasks(
                selectedProject === 'NEXT_7'
                    ? newTasks.filter(
                        task =>
                            moment(task.date, 'DD-MM-YYYY').diff(moment(), 'days') <= 7 && task.archived !== true)

                    : newTasks.filter(task => task.archived !== true)
            );
        });
    }, [selectedProject]);
}