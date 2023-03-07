import { useReducer, useEffect } from "react";
import io from "socket.io-client";

const initialState = {
    current_room: "",
    rooms: [],
    messages: [],
    users: [],
    user: ""
};

const reducer = (state, action) => {
    switch (action.type) {
        case "set_room":
            return {
                ...state,
                current_room: action.payload
            };
        case "set_rooms":
            return {
                ...state,
                rooms: action.payload
            };
        case "set_messages":
            return {
                ...state,
                messages: action.payload
            };
        case "set_users":
            return {
                ...state,
                users: action.payload
            };
        case "set_user":
            return {
                ...state,
                user: action.payload
            };
        default:
            return state;
    }
};

const useHnsChat = () => {
    const [state, dispatch] = useReducer(reducer, initialState);

    useEffect(() => {
        const socket = io("https://hns.chat/");
        socket.on("connect", () => {
            console.log("connected");
        });
        socket.on("disconnect", () => {
            console.log("disconnected");
        });
        socket.on("rooms", rooms => {
            dispatch({ type: "set_rooms", payload: rooms });
        });
        socket.on("messages", messages => {
            dispatch({ type: "set_messages", payload: messages });
        });
        socket.on("users", users => {
            dispatch({ type: "set_users", payload: users });
        });
        socket.on("user", user => {
            dispatch({ type: "set_user", payload: user });
        });
        return () => {
            socket.disconnect();
        };
    }, []);

    return [state, dispatch];
};

export default useHnsChat;