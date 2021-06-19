import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { faBug, faQuestionCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { randTextColor } from "../../utilities/randcolor";
import { useAuth } from "../AuthStore/utilities";

export default function SupportBtn() {
    const router = useRouter();
    const [auth] = useAuth();
    const [userData, setUserData] = useState(null);

    useEffect(()=>{
        setUserData(auth?.accessData.user);
    }, [auth]);

    return (
        <div style={{marginRight: ".7rem"}}>
            <button
                type="button"
                className="rounded-full"
            >
                <a 
                    href={`https://cscin.tk/join`} 
                    target="_blank"
                >
                    <div className="flex items-center" style={{marginRight: ".7rem"}}>
                        <div className="mr-4 opacity-75 hover:block hidden">使用說明</div>
                        <FontAwesomeIcon icon={faQuestionCircle} size="2x" className={`transition-all duration-300 ${randTextColor()}`}/>
                    </div>
                </a>
            </button>
           
            <button
                type="button"
                className="rounded-full"
            >
                <a 
                    href={`https://cscin.tk/?action=feedback&name=${encodeURI(userData?.name)}&email=${encodeURI(userData?.email)}&path=${encodeURI(router.asPath)}`} 
                    target="_blank"
                >
                    <div className="flex items-center">
                        <div className="mr-4 opacity-75 hover:block hidden">問題回報</div>
                        <FontAwesomeIcon icon={faBug} size="2x" className={`transition-all duration-300 ${randTextColor()}`}/>
                    </div>
                </a>
            </button>

        </div>
    );
}