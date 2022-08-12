import React, { useReducer, useState, useEffect } from "react";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/effect-cards";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { EffectCards, Navigation, Pagination } from "swiper";

import "../css/playerBox.scss";
import Card from "../components/card";
import StatusBox from "./statusBox";

import data from '../data/test-data.json'

const InitPlayerBox = (props) => {

    const originStatus = props.origin;
    const player = props.target;
    const gameProccess = props.proccess;

    const cardJob = Object.values(data['0']);
    const beginWeapon = Object.values(data['1']);
    const [jobIdx, setJobIdx] = useState(0);
    const [ttStep, setTTStep] = useState(0);

    const nextStep = () => {

    }

    useEffect(() => {
        props.handle({
            type: "INIT_JOB",
            payload: {
                job: cardJob[jobIdx]
            }
        });
    }, [jobIdx])

    return (
        <div className="notificationArea" id="initPlayerBox">
            <div className='blocker'></div>
            <div className="notificationBox">
                <h1 className="notificationTitle">INIT PLAYER</h1>
                <div className="contentBox" style={{height: "45em"}}>
                    <div className="contentBoxColumn" id="ttStep_1">
                        {/* step 1 */}
                        <div className="contentBoxRow">
                            <div className="contentBoxItem">
                                <h1 className="contentBoxTitle">Chọn nghề nghiệp</h1>
                                <div className="contentBoxRow" id="initJobBox">
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
                            <div className="contentBoxItem">
                                <h1 className="contentBoxTitle">Thiết lập chỉ số cơ bản</h1>
                                <StatusBox target={player} handle={props.handle} proccess={gameProccess} origin={originStatus} />
                            </div>
                        </div>
                        {/* step 2 */}
                        <div className="contentBoxColumn hidden" id="ttStep_2">
                            {
                                <Card CardDetail={beginWeapon[0]}/>
                            }
                        </div>
                        <div className="contentBoxRow" style={{flexGrow: "0"}}>
                            <button className="big-button" style={{marginRight: "5em"}}>QUAY LẠI</button>
                            <button className="big-button" style={{marginRight: "5em"}}>TIẾP TỤC</button>
                            <button className="big-button"
                                onClick={() => {
                                    document.getElementById("initPlayerBox").classList.add("hidden");
                                }}>ĐÓNG</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default InitPlayerBox;