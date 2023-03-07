import { useState, useRef, useReducer, useEffect } from "react";
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

const Pagehnschat = () => {
    const [state, dispatch] = useReducer(reducer, initialState);

    const input = useRef("");

    const submitHandler = e => {
        e.preventDefault();
        // submit chat message to socket
    
    };
    
    // useEffect(() => {
    //     const socket = io("135.148.148.182");
    //     socket.on("connect", () => {
    //         console.log("connected");
    //     });
    //     socket.on("disconnect", () => {
    //         console.log("disconnected");
    //     });
    //     socket.on("rooms", rooms => {
    //         dispatch({ type: "set_rooms", payload: rooms });
    //     });
    //     socket.on("messages", messages => {
    //         dispatch({ type: "set_messages", payload: messages });
    //     });
    //     socket.on("users", users => {
    //         dispatch({ type: "set_users", payload: users });
    //     });
    //     socket.on("user", user => {
    //         dispatch({ type: "set_user", payload: user });
    //     });
    // }
    // , []);
    
    useEffect(() => {
        if (state.current_room === "") {
            dispatch({ type: "set_room", payload: "general" });
        };
    }, [state.current_room]);
    
    return (
        <>
            <div className="container">
                <div className="row">
                    <div className="col-12">
                        <h1>hns.chat</h1>
                        <p>Chat with other Handshake users.</p>
                    </div>
                </div>
                <div className="row">
                    <div className="col-12">
                        <form

                            className="form"
                            autoComplete="off"
                            onSubmit={submitHandler}
                        >
                            <input

                                type="text"
                                ref={input}
                            />
                            <button type="submit">Send</button>
                        </form>
                    </div>
                </div>
                <div className="row">
                    <div className="col-12">
                        <div className="messages">
                            {state.messages.map((message, index) => (
                                <div key={index} className="message">
                                    <div className="message__user">
                                        {message.user}
                                    </div>
                                    <div className="message__text">
                                        {message.text}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Pagehnschat;

