import React, { useReducer, useState, useEffect } from "react";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/effect-cards";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { EffectCards, Navigation, Pagination } from "swiper";

import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';

import "../css/playerBox.scss";
import Card from "../components/card";
import StatusBox from "./statusBox";

import data from '../data/test-data.json';


ChartJS.register(ArcElement, Tooltip, Legend);

const InitPlayerBox = (props) => {
    const originStatus = props.origin;
    const player = props.target;
    const gameProccess = props.proccess;

    const cardJob = Object.values(data['0']);
    const beginWeapon = Object.values(data['1']);
    const [jobIdx, setJobIdx] = useState(0);
    const [ttStep, setTTStep] = useState(0);

    useEffect(() => {
        props.handle({
            type: "INIT_JOB",
            payload: {
                job: cardJob[jobIdx]
            }
        });
    }, [jobIdx])

    return (
        <div className="content">
            <div className="flexColGrow">
                {/* step 1 */}
                <div className="flexRowGrow" id="ttStep_1">
                    <div className="contentBoxItem">
                        <h1 className="contentBoxTitle">CHỌN NGHỀ NGHIỆP</h1>
                        <div className="flexRowGrow" id="initJobBox">
                            <Swiper
                                effect={"cards"}
                                modules={[EffectCards, Navigation, Pagination]}
                                slidesPerView={1}
                                grabCursor={false}
                                navigation={true}
                                pagination={{
                                    clickable: true,
                                }}
                                onSlideChange={(swiper) => {
                                    setJobIdx(swiper.realIndex)
                                }}
                            >
                                {
                                    cardJob.map((cardDetail, idx) => {
                                        return <SwiperSlide key={idx}><Card CardDetail={cardDetail} cardPreview={true} /></SwiperSlide>
                                    })
                                }
                            </Swiper>
                        </div>
                    </div>
                    <div className="contentBoxItem" id="initStatus">
                        <h1 className="contentBoxTitle">THIẾT LẬP CHỈ SỐ CƠ BẢN</h1>
                        <StatusBox target={player} handle={props.handle} proccess={gameProccess} origin={originStatus} />
                    </div>
                </div>
                {/* step 2 */}
                <div className="contentBoxColumn content" id="ttStep_2">
                    {
                        <Card CardDetail={beginWeapon[0]}/>
                    }
                </div>
            </div>
        </div>
    )
}

export default InitPlayerBox;