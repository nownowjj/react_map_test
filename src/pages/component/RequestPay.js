import React from "react";
import { useNavigate } from "react-router";

const RequestPay = (data) => {

    const navigate = useNavigate();

    const requestPay = () => {
        if (data.onClick()) return;

        console.log("RequestPay start");

        var IMP = window.IMP; // 생략 가능

        console.log("IMP : ", IMP);

        IMP.init("imp06277388");

        console.log(
            "data.choice_payment_method : ",
            data.choice_payment_method
        );

        IMP.request_pay(
            {
                // param
                pg: data.choice_payment_method,
                //
                // pg: "html5_inicis", // 이니시스(웹표준결제) version 1.1.0부터 지원.
                // pg: "nice", // 나이스페이
                // pg: "jtnet", // 제이티넷
                // pg: "uplus", // LG유플러스
                // pg: "danal", // 다날
                // pg: "payco", // 페이코
                // pg: "syrup", // 시럽페이
                // pg: "paypal", // 페이팔
                // pg: "kcp", // KCP
                cid: getCid(data.choice_payment_method),
                // pay_method: "card",
                // pay_method: "samsung", //삼성페이
                pay_method: "card", //신용카드,
                // pay_method: "trans", //실시간계좌이체, 이니시스 가능
                // pay_method: "vbank", //가상계좌,
                // pay_method: "phone", //휴대폰소액결제
                merchant_uid: "merchant_" + new Date().getTime(),
                name: String(data.choice_thing.name),
                amount: 100, // data.choice_thing.prise,
                buyer_email: sessionStorage.getItem("buyer_email"),
                buyer_name: sessionStorage.getItem("buyer_name"),
                buyer_tel: sessionStorage.getItem("buyer_tel"),
                buyer_addr: sessionStorage.getItem("buyer_addr"),
                buyer_postcode: sessionStorage.getItem("buyer_postcode"),
                m_redirect_url: "localhost:3000/money_payment",
                // 모바일 결제시,
                // 결제가 끝나고 랜딩되는 URL을 지정
                // (카카오페이, 페이코, 다날의 경우는 필요없음. PC와 마찬가지로 callback함수로 결과가 떨어짐)
            },
            // KG이니시스 테스트모드 MID(상점아이디) : INIpayTest
            // KG이니시스 에스크로 테스트모드 MID(상점아이디) : iniescrow2
            (rsp) => {
                // callback
                if (rsp.success) {
                    alert("결제 성공하였습니다.");
                    navigate("/payment_history");
                    
                } else {
                    alert("결제 취소되엇습니다.");
                }
                console.log("rsp : ", rsp);
            }
        );
    };

    const getCid = (method) => {
        if (method === "kakaopay") {
            return "TC0ONETIME";
        }
        return "";
    };
    return <button onClick={() => requestPay()}>{data.value}</button>;
};

export default RequestPay;