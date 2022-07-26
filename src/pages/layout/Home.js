import React, { useState } from "react";
import { Link } from "react-router-dom";
import Map from "../component/Map";
import RequestPay from "../component/RequestPay";

// 초기 주소
const merchant = { coordinate: { lat: 37.500708, lng: 127.061584 } };

// 가맹점 좌표 더미
const merchant_map = {
    1000: {
        coordinate: { lat: 37.500708, lng: 127.035254 },
        things: [
            { id: 0, name: "차가운아메리카노", prise: "4500" },
            { id: 1, name: "뜨거운아메리카노", prise: "5000" },
            { id: 2, name: "모카라떼", prise: "5500" },
            { id: 3, name: "카페라떼", prise: "5500" },
            { id: 4, name: "녹차", prise: "6000" },
        ],
    }, 
    // 스타벅스 역삼점

    1001: {
        coordinate: { lat: 37.507813, lng: 127.061052 },
        things: [
            { id: 0, name: "녹차", prise: "6000" },
            { id: 1, name: "카페라떼", prise: "4500" },
            { id: 2, name: "뜨거운아메리카노", prise: "5000" },
            { id: 3, name: "아이스아메리카노", prise: "5500" },
        ],
    },
     // 투썸 삼성역점

    1002: {
        coordinate: { lat: 37.509981, lng: 127.061584 },
        things: [
            { id: 0, name: "아이스아메리카노", prise: "4000" },
            { id: 1, name: "뜨거운아메리카노", prise: "4500" },
            { id: 2, name: "녹차", prise: "6500" },
            { id: 3, name: "카페라떼", prise: "6000" },
            { id: 4, name: "자몽에이드", prise: "6000" },
            { id: 5, name: "모카라떼", prise: "5000" },
        ],
    }, 
    // 스타벅스 스타필드코엑스몰R점
};

// 결제 방식
const payment_method = [
    { id: "html5_inicis", name: "KG이니시스" },
    { id: "tosspay", name: "[간편결제] 토스" },
    { id: "kakaopay", name: "[간편결제] 카카오페이" },
    { id: "payco", name: "[간편결제] 페이코" },
];


const Home = (data) => {
    // const [change_map_center,setChangeMapCenter] = useState("");
    const [choice_merchant_info, setChoiceMerchantInfo] = useState("");
    const [choice_thing, setChoiceThing] = useState("");
    const [choice_payment_method, setChoicePaymentMethod] = useState("");
    const paymentTry = () => {
        return !valueCheck();
    };
    // 가맹점 선택
    const merchantChange = (value) => {
        console.log("Home.js =================== start")
        console.log("merchantChange START");
        console.log('=====');
        console.log("value : ", value);
        if (value) {
            
            // console.log(merchant_map[value].coordinate);
            // console.log(merchant);
            // setChangeMapCenter(merchant_map[value]);
            // 기존에 존재하는 좌표를 바꾼 값으로 변경 해야함
            console.log("ddddddddd");
            setChoiceMerchantInfo(merchant_map[value]);
            
            console.log("if true일때");
            console.log("Home.js =================== end")
            // setIsPick(true);
        } else {
            console.log("if false일때");
            setChoiceMerchantInfo("");
            setChoiceThing("");
            setChoicePaymentMethod("");
            // setIsPick(false);
        }
    };
    // 구매물품 선택
    const thingChoice = (value) => {
        console.log("thingChoice");
        console.log("value : ", value);
        if (value) {
            setChoiceThing(findThing(value));
        } else {
            setChoiceThing("");
        }
    };
    // 물품 찾기
    const findThing = (value) => {
        return choice_merchant_info.things.find((e) => e.id === Number(value));
    };
    //결제수단
    const paymentMethodChange = (value) => {
        console.log("paymentMethodChange");
        console.log("value : ", value);
        if (value) {
            setChoicePaymentMethod(value);
        } else {
            setChoicePaymentMethod("");
        }
    };
    //값 검증
    const valueCheck = () => {
        if (!choice_merchant_info) {
            console.log("가맹점을 선택해 주세요.");
            return false;
        }
        if (!choice_thing) {
            console.log("구매 물품을 선택해 주세요.");
            return false;
        }
        if (!choice_payment_method) {
            console.log("결제수단을 선택해 주세요.");
            return false;
        }
        return true;
    };
    return (
        <div>
            <Link to="/login">로그인 하기</Link>
            <Map map_coordinate={merchant.coordinate}></Map>
            {/* <Map map_coordinate={change_map_center.coordinate}></Map> */}

            {/* 첫번째 옵션 */}
            {/* 이용할 장소*/}
            <select
                style={{ width: 160, flexGrow: 2 }}
                onChange={(e) => merchantChange(e.target.value)}
            >
                <option value="">선택</option>
                <option value="1000">스타벅스 역삼점</option>
                <option value="1001">투썸 삼성점</option>
                <option value="1002">스타벅스 코엑스점</option>
            </select>
            
            {/* 두번째 옵션 */}
            {/* 결제 할 것 */}
            <select
                style={{ width: 160, flexGrow: 2 }}
                onChange={(e) => thingChoice(e.target.value)}
            >
                <option value="">선택</option>
                {choice_merchant_info &&
                    choice_merchant_info.things.map((e) => (
                        <option key={e.id} value={e.id}>
                            {e.name}
                        </option>
                    ))}
            </select>

            {/* 세번째 옵션 */}
            {/* 결제 방식 */}
            <select
                style={{ width: 160, flexGrow: 2 }}
                value={choice_payment_method}
                onChange={(e) => paymentMethodChange(e.target.value)}
            >
                <option value="">선택</option>
                {payment_method.map((e) => (
                    <option key={e.id} value={e.id}>
                        {e.name}
                    </option>
                ))}
            </select>
            <RequestPay
                value="결제하기"
                choice_merchant_info={choice_merchant_info}
                choice_thing={choice_thing}
                choice_payment_method={choice_payment_method}
                onClick={() => paymentTry()}
            />
        </div>
    );
};
export default Home;