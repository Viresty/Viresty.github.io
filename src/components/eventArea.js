import React, { useReducer, useState, useEffect } from "react";

import Card from "../components/card";

const EventArea = (props) => {

    const backgroundEffect = (
        <div className='backgroundEffect' style={{height: "130%", width: "130%"}}>
            <svg xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
                viewBox="-1 -1 68 102" xmlSpace="preserve">
                <path d="M 33 0 L 66 50 L 33 100 L 0 50 L 33 0 L 35 3 Z"/>
                <path d="M 4 8 L 62 8 L 62 91 L 4 91 L 4 8 L 5 8 Z"/>
            </svg>
        </div>
    );

    const event = {...props.events};

    return (
        <div className="contentArea">
            <div id="eventArea">
                {
                    Object.keys(event).map((key, idx) => {
                        return (
                            <div className="eventCard"
                            onClick={() => {
                                console.log(props);
                                props.setGameProccess(event[key].detail.nextProccess);
                                props.initRound(event[key]);
                              }}
                            >
                                <Card key={idx}
                                CardDetail={event[key]}
                                backgroundEffect={backgroundEffect}
                                cAOS={'flip-left'} />
                            </div>
                        )
                    })
                }
            </div>
            <h2>HÃY CHỌN MỘT LỐI ĐI</h2>
        </div>
    )
}

export default EventArea;