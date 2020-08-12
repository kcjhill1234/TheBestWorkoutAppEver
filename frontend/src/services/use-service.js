import React, { createContext, useContext } from 'react';
import axios from 'axios';
import { useAuth } from './use-auth';
import WorkoutService from './workouts.service';
import ExerciseService from './exercise.service';
import MessageService from './message.service';


const serviceContext = createContext();

export function ProvideService({ children }) {
    const service = useProvideService()
    return <serviceContext.Provider value={service}>{children}</serviceContext.Provider>
}

export const useService = () => {
    return useContext(serviceContext);
}

function useProvideService(){
    const {user} = useAuth();
    const client = axios.create({
        headers: {
            'x-access-token': user?.accessToken
        }
    })

    const workoutService = new WorkoutService(client)
    const exerciseService = new ExerciseService(client)
    const messageService = new MessageService()

    return {
        workoutService,
        exerciseService,
        messageService
    }
}